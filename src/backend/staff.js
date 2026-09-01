/*
=============================================================================
MODULE: backend/staff.js
VERSION: marianmadrid4002 (v21.1.0-LTS-remediated)
RESPONSIBILITY: Staff resolution from MAPA_STAFF collection with pagination
                and duplicate-free internal registry.
STANDARDS: G10 ASCII Strict (0 non-ASCII characters).
=============================================================================
*/

import wixData from "wix-data";
import { COLLECTIONS, SDK_CONFIG } from "backend/internalConfig";
import { _safeTrim, withTimeout, _looksLikeGuid } from "public/mmUtils";

const log = {
    error: (msg, data) => console.error("[staff] ERROR:", msg, data),
    warn: (msg, data) => console.warn("[staff] WARN:", msg, data),
    info: (msg, data) => console.info("[staff] INFO:", msg, data),
};

const STAFF_COL = COLLECTIONS.MAPA_STAFF;
const STAFF_CACHE_TTL_MS = Number(SDK_CONFIG?.CACHE?.STAFF_TTL_MS) || 300000;
const CMS_TIMEOUT_MS = Number(SDK_CONFIG?.TIMEOUTS?.CMS_MS) || 15000;

let staffByPrimaryId = new Map();
let staffByLookupKey = new Map();
let staffCacheLoadedAt = 0;

export function clearStaffCache() {
    staffByPrimaryId.clear();
    staffByLookupKey.clear();
    staffCacheLoadedAt = 0;
}

async function _loadAllStaff() {
    const now = Date.now();
    if (staffByPrimaryId.size > 0 && now - staffCacheLoadedAt < STAFF_CACHE_TTL_MS) {
        return Array.from(staffByPrimaryId.values());
    }
    try {
        let allItems = [];
        let query = wixData.query(STAFF_COL).eq("activo", true).limit(100);
        let res = await withTimeout(
            query.find({ suppressAuth: true }),
            CMS_TIMEOUT_MS,
            "loadAllStaff_p1"
        );
        allItems = allItems.concat(res?.items || []);

        while (res && res.hasNext()) {
            res = await withTimeout(
                res.next({ suppressAuth: true }),
                CMS_TIMEOUT_MS,
                "loadAllStaff_next"
            );
            allItems = allItems.concat(res?.items || []);
        }

        staffByPrimaryId.clear();
        staffByLookupKey.clear();

        for (const item of allItems) {
            const resourceId = _safeTrim(item.resourceId);
            const email = _safeTrim(item.email).toLowerCase();
            const memberId = _safeTrim(item.idMiembroStaff || item.memberId);
            const staffObj = {
                resourceId,
                displayName: _safeTrim(item.nombreVisible || item.displayName || "ESTILISTA"),
                nombreVisible: _safeTrim(item.nombreVisible || item.displayName || "ESTILISTA"),
                email,
                memberId,
                idMiembroStaff: memberId,
                scheduleId: _safeTrim(item.scheduleId || item.idHorario),
                rol: _safeTrim(item.rol || "ESTILISTA"),
                activo: item.activo !== false,
            };

            if (resourceId) {
                staffByPrimaryId.set(resourceId, staffObj);
                staffByLookupKey.set(resourceId, staffObj);
            }
            if (memberId) {
                staffByLookupKey.set(memberId, staffObj);
            }
            if (email) {
                staffByLookupKey.set(email, staffObj);
            }
        }
        staffCacheLoadedAt = now;
        return Array.from(staffByPrimaryId.values());
    } catch (err) {
        log.error("Failed to load staff cache", { error: err?.message });
        return Array.from(staffByPrimaryId.values());
    }
}

export async function findStaff(identifier) {
    const clean = _safeTrim(identifier);
    if (!clean) return null;
    await _loadAllStaff();
    const lower = clean.toLowerCase();
    if (staffByLookupKey.has(lower)) return staffByLookupKey.get(lower);
    if (staffByLookupKey.has(clean)) return staffByLookupKey.get(clean);
    for (const staff of staffByPrimaryId.values()) {
        if (staff.resourceId === clean || staff.memberId === clean || staff.email === lower) {
            return staff;
        }
    }
    return null;
}

export async function getAllStaff() {
    const list = await _loadAllStaff();
    return list.map((s) => ({
        resourceId: _safeTrim(s.resourceId),
        displayName: _safeTrim(s.nombreVisible || s.displayName),
        nombreVisible: _safeTrim(s.nombreVisible || s.displayName),
        rol: _safeTrim(s.rol),
        activo: s.activo !== false,
    }));
}

export async function resolveStaffResourceIds(personalDisponible) {
    const items = Array.isArray(personalDisponible) ? personalDisponible : [];
    const resourceIds = [];
    for (const entry of items) {
        const candidate = typeof entry === "object" && entry !== null ? (entry.resourceId || entry.id || entry._id) : entry;
        const clean = _safeTrim(candidate);
        if (_looksLikeGuid(clean)) {
            resourceIds.push(clean);
        } else {
            const found = await findStaff(clean);
            if (found?.resourceId) resourceIds.push(found.resourceId);
        }
    }
    return Array.from(new Set(resourceIds)).sort();
}