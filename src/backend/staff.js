import wixData from "wix-data";
import { COLLECTIONS, SDK_CONFIG } from "backend/internalConfig";
import { _safeTrim, withTimeout, _looksLikeGuid } from "public/mmUtils";
import { logger } from "backend/booking/bookingCore";
const log = logger;
const STAFF_COL = COLLECTIONS.MAPA_STAFF;
const STAFF_CACHE_TTL_MS = Number(SDK_CONFIG?.CACHE?.STAFF_TTL_MS) || 300000;
const CMS_TIMEOUT_MS = Number(SDK_CONFIG?.TIMEOUTS?.CMS_MS) || 15000;
let staffById = new Map();
let staffByEmail = new Map();
let staffCacheLoadedAt = 0;
export function clearStaffCache() {
    staffById.clear();
    staffByEmail.clear();
    staffCacheLoadedAt = 0;
}
async function _loadAllStaff() {
    const now = Date.now();
    if (staffById.size > 0 && now - staffCacheLoadedAt < STAFF_CACHE_TTL_MS) {
        return Array.from(staffById.values());
    }
    try {
        const res = await withTimeout(
            wixData.query(STAFF_COL).eq("activo", true).limit(100).find({ suppressAuth: true }),
            CMS_TIMEOUT_MS,
            "loadAllStaff"
        );
        const items = res?.items || [];
        staffById.clear();
        staffByEmail.clear();
        for (const item of items) {
            const resourceId = _safeTrim(item.resourceId);
            const email = _safeTrim(item.email).toLowerCase();
            const memberId = _safeTrim(item.memberId || item.idMiembroStaff);
            const staffObj = {
                resourceId,
                displayName: _safeTrim(item.nombreVisible || item.displayName || "ESTILISTA"),
                email,
                memberId,
                rol: _safeTrim(item.rol || "ESTILISTA"),
                activo: item.activo !== false,
            };
            if (resourceId) staffById.set(resourceId, staffObj);
            if (memberId) staffById.set(memberId, staffObj);
            if (email) staffByEmail.set(email, staffObj);
        }
        staffCacheLoadedAt = now;
        return Array.from(staffById.values());
    } catch (err) {
        log.error("Failed to load staff cache", { error: err?.message });
        return [];
    }
}
export async function findStaff(identifier) {
    const clean = _safeTrim(identifier);
    if (!clean) return null;
    await _loadAllStaff();
    const lower = clean.toLowerCase();
    if (staffByEmail.has(lower)) return staffByEmail.get(lower);
    if (staffById.has(clean)) return staffById.get(clean);
    for (const staff of staffById.values()) {
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
        displayName: _safeTrim(s.displayName),
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
