/*
=============================================================================
MODULE: backend/reservas.web.js
VERSION: marianmadrid4004 (v21.1.1-LTS-remediated-full-hardening)
RESPONSIBILITY: Availability engine, dual slots with gap, dual pairing with
            same staff, workload-balanced staff allocation with full pagination,
            indexed O(k) cache invalidation, and active RAM cache purge.
STANDARDS: G10 ASCII Strict (0 non-ASCII characters).
=============================================================================
*/

import { webMethod, Permissions } from "wix-web-module";
import wixData from "wix-data";
import { availabilityTimeSlots } from "@wix/bookings";

import {
    BOOKINGS_ADDON_CONFIG,
    STAFF_DEFAULT_NAME,
    makeTraceId,
    _safeTrim,
    _safeSlugOrId,
    _looksLikeGuid,
    _normalizeLocalIsoStr,
    getUtcDateFromMadridLocal,
    getMadridLocalStringNoZ,
    _executeWithRetry,
    _hashKey,
    _generateUUID,
    _normalizeSlotShape,
    withTimeout,
    _extractRelationalId,
} from "public/mmUtils";
import {
    COLLECTIONS,
    SDK_CONFIG,
    RATE_LIMIT,
    SLOT_SEARCH,
    API,
    SERVICE_CATALOG,
} from "backend/internalConfig";

import { logger } from "backend/booking/bookingCore";
import { _toPublicError } from "backend/responseUtils";
import { findStaff, getAllStaff } from "backend/staff";
import { requireAdmin, rateLimiter } from "backend/security";

const log = logger;

const SERVICIOS_COL = COLLECTIONS.SERVICIOS_RESERVA;
const EXTRAS_CATALOGO_COL = COLLECTIONS.ADDONS_CATALOGO;
const DUAL_CACHE_COL = COLLECTIONS.DUAL_CACHE;
const DAYS_CACHE_COL = COLLECTIONS.DAYS_CACHE;
const CITAS_COL = COLLECTIONS.CITAS;

const WATCHDOG_TIMEOUT_MS = SDK_CONFIG.TIMEOUTS.WATCHDOG_MS;

const SERVICE_CACHE_TTL_MS = SDK_CONFIG.CACHE.SERVICES_TTL_MS;
const SLOTS_CACHE_TTL_MS = SDK_CONFIG.CACHE.SLOTS_CACHE_TTL_MS;
const DUAL_CACHE_TTL_MS = SDK_CONFIG.CACHE.DUAL_CACHE_TTL_MS;

const STAFF_RESOURCE_TYPE_ID = API.STAFF_RESOURCE_TYPE_ID;
const DIAS_LIMITE = SLOT_SEARCH.DIAS_LIMITE;

const CACHE_MAX_SIZE = SDK_CONFIG.CACHE.MAX_ENTRIES;
const DAYS_CACHE_VERSION = SDK_CONFIG.CACHE.DAYS_CACHE_VERSION;

function _newTimeSlotsLocation() {
    return {
        id: SDK_CONFIG.LOCATION_ID,
        locationType: SDK_CONFIG.LOCATION_TYPES.TIME_SLOTS,
    };
}

const availabilityCache = new Map();
const availabilityKeysByService = new Map();
const inflightRequests = new Map();
const serviceCatalogRAM = new Map();
const serviceAddonOptionsRAM = new Map();

const STAFF_CACHE_TTL_MS = SDK_CONFIG.CACHE.STAFF_TTL_MS;
const STAFF_DISPLAY_CACHE_MAX_ENTRIES = SDK_CONFIG.CACHE.MAX_ENTRIES;
const staffDisplayCache = new Map();

function _setAvailabilityCache(serviceId, cacheKey, data) {
    const sId = String(serviceId || "");
    _cacheSetBounded(availabilityCache, cacheKey, { data, timestamp: Date.now() }, CACHE_MAX_SIZE);
    if (sId) {
        if (!availabilityKeysByService.has(sId)) {
            availabilityKeysByService.set(sId, new Set());
        }
        availabilityKeysByService.get(sId).add(cacheKey);
    }
}

function _invalidateAvailabilityCacheByService(serviceId) {
    const sId = String(serviceId || "");
    if (!sId) return;
    const keys = availabilityKeysByService.get(sId);
    if (keys) {
        for (const k of keys) {
            availabilityCache.delete(k);
        }
        availabilityKeysByService.delete(sId);
    }
}

async function _getStaffDisplayName(resourceId) {
    const resourceIdClean = _safeTrim(resourceId);
    if (!resourceIdClean || !_looksLikeGuid(resourceIdClean)) return "";

    const cached = staffDisplayCache.get(resourceIdClean);
    if (cached && Date.now() - cached.ts < STAFF_CACHE_TTL_MS) return cached.name || "";

    const staff = await findStaff(resourceIdClean).catch(() => null);
    const name = _safeTrim(staff?.displayName || staff?.nombreVisible || staff?.name || "");

    _cacheSetBounded(staffDisplayCache, resourceIdClean, { name, ts: Date.now() }, STAFF_DISPLAY_CACHE_MAX_ENTRIES);
    return name;
}

function _cacheSetBounded(map, key, value, maxSize) {
    if (map.has(key)) map.delete(key);
    map.set(key, value);
    if (map.size <= maxSize) return;
    const firstKey = map.keys().next().value;
    if (firstKey) map.delete(firstKey);
}

function _rateLimitOrThrow(surface, key, traceId) {
    const rl = rateLimiter({ surface, key });
    if (!rl.allowed) {
        const e = new Error("RATE_LIMITED");
        e.code = "RATE_LIMITED";
        e.meta = { retryAfter: rl.retryAfter, surface, traceId };
        throw e;
    }
}

function _availabilityRequesterKey(requesterId, resourceKey) {
    const cleanRequester = _safeTrim(requesterId).replace(/[^a-zA-Z0-9:_-]/g, "").slice(0, 96);
    return cleanRequester.length >= 12 ? `requester:${cleanRequester}` : `resource:${resourceKey}`;
}

function _rateLimitPublicAvailability(surface, requesterId, resourceKey, traceId) {
    const windowMs = Number(RATE_LIMIT?.AVAILABILITY_WINDOW_MS) || 5000;
    const requesterLimit = Number(RATE_LIMIT?.AVAILABILITY_REQUESTER_MAX_REQUESTS) || 12;
    const globalLimit = Number(RATE_LIMIT?.AVAILABILITY_GLOBAL_MAX_REQUESTS) || 120;
    const global = rateLimiter({ surface: `${surface}:global`, key: "all" }, globalLimit, windowMs);
    if (!global.allowed) {
        const error = new Error("RATE_LIMITED");
        error.code = "RATE_LIMITED";
        error.meta = { retryAfter: global.retryAfter, surface, traceId };
        throw error;
    }

    const requester = rateLimiter({ surface: `${surface}:requester`, key: _availabilityRequesterKey(requesterId, resourceKey) },
        requesterLimit,
        windowMs
    );
    if (!requester.allowed) {
        const error = new Error("RATE_LIMITED");
        error.code = "RATE_LIMITED";
        error.meta = { retryAfter: requester.retryAfter, surface, traceId };
        throw error;
    }
}

function _attachServiceId(slot, forcedServiceId, traceId, ctx) {
    const s = _normalizeSlotShape(slot);
    if (!s) return null;

    const serviceId = _safeTrim(forcedServiceId);
    if (!serviceId || !_looksLikeGuid(serviceId)) {
        log.error("_attachServiceId: invalid serviceId", { traceId, ctx, serviceId });
        return null;
    }

    return {
        ...s,
        serviceId,
        ...(s.slot && typeof s.slot === "object" ? { slot: { ...s.slot, serviceId } } : {}),
    };
}

function _isValidMadridYmd(value) {
    const ymd = _safeTrim(value);
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
    if (!match) return false;

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

    return date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day;
}

function _addDaysYMDLocal(ymd, days) {
    if (!_isValidMadridYmd(ymd)) return "";
    const parts = String(ymd).split("-").map(Number);
    const dt = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 12, 0, 0));
    dt.setUTCDate(dt.getUTCDate() + Number(days || 0));
    return dt.toLocaleDateString("sv-SE", { timeZone: SDK_CONFIG.TZ });
}

function _filterDaysByLimit(daysArray) {
    if (!Array.isArray(daysArray) || daysArray.length === 0) return [];
    const tz = SDK_CONFIG.TZ;
    const now = new Date();
    const todayStr = now.toLocaleDateString("sv-SE", { timeZone: tz });
    const tomorrowStr = _addDaysYMDLocal(todayStr, 1);
    const maxDateStr = _addDaysYMDLocal(todayStr, DIAS_LIMITE);
    if (!tomorrowStr || !maxDateStr) return [];
    return daysArray.filter((date) => date >= tomorrowStr && date <= maxDateStr);
}

function _normalizeResourceIds(resourceId, traceId) {
    if (!resourceId) return [];

    const normalized = _safeTrim(resourceId);
    if (!normalized || ["all", "any"].includes(normalized.toLowerCase())) return [];
    if (_looksLikeGuid(normalized)) return [normalized];

    log.warn("_normalizeResourceIds: non-guid identifier not supported; treating as ANY", { resourceId: normalized, traceId });
    return [];
}

function _getResourceIdsFromSlot(slot) {
    const s = _normalizeSlotShape(slot);
    if (!s || typeof s !== "object") return [];

    let groups = [];
    if (Array.isArray(s.availableResources)) groups = s.availableResources;
    else if (s.slot && typeof s.slot === "object" && Array.isArray(s.slot.availableResources)) groups = s.slot.availableResources;
    else if (s.resourceId) return _looksLikeGuid(String(s.resourceId)) ? [String(s.resourceId)] : [];
    else if (s.resource?.id) return _looksLikeGuid(String(s.resource.id)) ? [String(s.resource.id)] : [];

    const staffGroup = groups.find((g) => String(g.resourceTypeId) === String(STAFF_RESOURCE_TYPE_ID));
    if (!staffGroup) return [];

    return Array.from(new Set(
        (staffGroup.resources || [])
        .map((resource) => _safeTrim(resource?.id || resource?._id))
        .filter((resourceId) => _looksLikeGuid(resourceId))
    ));
}

function _minutesBetweenUtcDates(a, b) {
    if (!(a instanceof Date) || !(b instanceof Date)) return 0;
    const ms = b.getTime() - a.getTime();
    if (!Number.isFinite(ms) || ms <= 0) return 0;
    return Math.round(ms / 60000);
}

function _readCatalogReferenceId(value) {
    const candidate = value && typeof value === "object" ? (value.nombreCategoria || value._id || value.id) : value;
    return _safeTrim(candidate).toUpperCase();
}

function _formatEditorialAddonItem(option) {
    if (!option || typeof option !== "object") return null;
    const addonId = _safeTrim(option.idAddonBookings || option.bookingsAddonId || option.idAddon || option._id);
    const groupId = _safeTrim(option.idGrupoAddonBookings || option.bookingsAddonGroupId || option.grupoInterno);
    if (!_looksLikeGuid(addonId) || option.activo === false) return null;

    const precioAddon = Number(option.precioAddon ?? option.precio ?? 0);
    const safePrecio = Number.isFinite(precioAddon) && precioAddon >= 0 ? precioAddon : 0;
    const cantidadMaximaAddon = Number(option.cantidadMaximaAddon);
    return {
        addonId,
        nombre: _safeTrim(option.tituloAddon || option.nombre) || "Complemento",
        precio: safePrecio,
        bookingsAddonId: addonId,
        bookingsAddonGroupId: groupId || "GROUP_GENERAL",
        cantidadMaximaAddon: Number.isInteger(cantidadMaximaAddon) && cantidadMaximaAddon > 0 ? cantidadMaximaAddon : 1,
        activo: option.activo !== false,
    };
}

async function _resolveEditorialAddons(rawOptions, traceId) {
    const refs = Array.isArray(rawOptions) ? rawOptions : [];
    if (!refs.length) return [];

    const resolved = [];
    const missingIds = [];
    const now = Date.now();

    for (const optionRef of refs) {
        const optionId = _extractRelationalId(optionRef);
        if (!optionId) continue;

        const cached = serviceAddonOptionsRAM.get(optionId);
        if (cached && now - cached.timestamp < SERVICE_CACHE_TTL_MS) {
            if (cached.data && cached.data.activo !== false) resolved.push(cached.data);
            continue;
        }

        const hasNativeBinding = optionRef && typeof optionRef === "object" &&
            (_safeTrim(optionRef.idAddonBookings) || _safeTrim(optionRef.bookingsAddonId));
        if (hasNativeBinding) {
            const formatted = _formatEditorialAddonItem(optionRef);
            if (formatted) {
                _cacheSetBounded(serviceAddonOptionsRAM, optionId, { data: formatted, timestamp: now }, CACHE_MAX_SIZE);
                resolved.push(formatted);
            }
            continue;
        }

        missingIds.push(optionId);
    }

    if (missingIds.length > 0) {
        const uniqueMissing = Array.from(new Set(missingIds));
        try {
            const batchRes = await withTimeout(
                wixData.query(EXTRAS_CATALOGO_COL).hasSome("_id", uniqueMissing).limit(100).find({ suppressAuth: true }),
                WATCHDOG_TIMEOUT_MS,
                "resolveEditorialAddons:batch"
            );

            const itemsMap = new Map((batchRes?.items || []).map((it) => [String(it._id), it]));

            for (const optionId of uniqueMissing) {
                const item = itemsMap.get(optionId);
                const formatted = item ? _formatEditorialAddonItem(item) : null;
                _cacheSetBounded(serviceAddonOptionsRAM, optionId, { data: formatted, timestamp: now }, CACHE_MAX_SIZE);
                if (formatted && formatted.activo !== false) resolved.push(formatted);
                else log.warn("Editorial addon option is not active or natively bookable", { optionId, traceId });
            }
        } catch (err) {
            log.error("Batch query for addons failed", { traceId, message: err?.message });
        }
    }

    const deduplicatedMap = new Map();
    for (const addon of resolved) {
        if (addon && addon.addonId && !deduplicatedMap.has(addon.addonId)) {
            deduplicatedMap.set(addon.addonId, addon);
        }
    }
    return Array.from(deduplicatedMap.values());
}

function _resolveAddonContext(service, requestedAddonIds) {
    const requestedIds = Array.from(new Set(
        (Array.isArray(requestedAddonIds) ? requestedAddonIds : [])
        .map((id) => _safeTrim(id))
        .filter(Boolean)
    ));

    if (requestedIds.length > BOOKINGS_ADDON_CONFIG.MAX_PER_BOOKING) {
        throw new Error("ADDON_LIMIT_EXCEEDED");
    }

    const catalog = Array.isArray(service?.metadata?.addons) ? service.metadata.addons : [];
    const catalogById = new Map(
        catalog
            .filter((addon) => addon && addon.activo !== false)
            .map((addon) => [_safeTrim(addon?.addonId), addon])
            .filter(([addonId]) => Boolean(addonId))
    );
    const unknownAddonId = requestedIds.find((addonId) => !catalogById.has(addonId));
    if (unknownAddonId) throw new Error("ADDON_INVALID");

    const selectedAddons = requestedIds.map((addonId) => catalogById.get(addonId));
    const nativeAddonIds = [];

    for (const addon of selectedAddons) {
        const nativeId = _safeTrim(addon?.bookingsAddonId);
        if (!nativeId) continue;
        if (!_looksLikeGuid(nativeId)) throw new Error("NATIVE_ADDON_INVALID");
        nativeAddonIds.push(nativeId);
    }

    return {
        selectedAddons,
        nativeAddonIds: Array.from(new Set(nativeAddonIds)).sort(),
    };
}

function _isValidSlug(value) {
    const clean = _safeSlugOrId(value || "");
    return Boolean(clean && !_looksLikeGuid(clean));
}

async function _mapServiceToUX(service, traceId) {
    const serviceId = _extractRelationalId(service.idServicio || service.serviceId);
    if (!_looksLikeGuid(serviceId)) {
        throw new Error("Service catalog invalid: serviceId missing or not a GUID");
    }

    const rawOculto = service.oculto;
    const estado = _readCatalogReferenceId(service.estado);
    if (estado && estado !== "ACTIVO") {
        throw new Error("Service is not available for public booking.");
    }
    const categoria = _readCatalogReferenceId(service.nombreCategoria || service.categoria);
    const monedaCatalogo = _readCatalogReferenceId(service.moneda || service.monedaCatalogo);
    const moneda = monedaCatalogo || SERVICE_CATALOG.CURRENCY;
    const isHiddenF2 = rawOculto === true;
    const rawPermitir = service.permitirCombinar;
    const permitirCombinar = !isHiddenF2 && rawPermitir === true;
    const linkFases = _extractRelationalId(service.idServicioFaseDos || service.linkFases);

    if (permitirCombinar && !_looksLikeGuid(linkFases)) {
        throw new Error("Service catalog invalid: linkFases missing or not a GUID for dual service");
    }

    const tiempoFase1 = Math.max(0, Number(service.tiempoFaseUno || service.tiempoFase1) || 0);
    const tiempoExposicion = Math.max(0, Number(service.tiempoExposicion) || 0);
    const tiempoFase2 = Math.max(0, Number(service.tiempoFaseDos || service.tiempoFase2) || 0);
    const duracionTotal = Math.max(0, Number(service.duracionTotal) || 0);

    const tituloServicio = _safeTrim(service.tituloServicio) || "Servicio";
    const precio = Math.max(0, Number(service.precio) || 0);
    const slugUrl = _safeTrim(service.slugUrl) || null;
    const imageUrl = _safeTrim(service.imagenPrincipal || service.imageUrl) || "";
    const localizacion = _safeTrim(service.nombreLocalizacion || service.localizacion) || null;
    const resumenCorto = _safeTrim(service.resumenCorto) || null;
    const descripcionLarga = _safeTrim(service.descripcionLarga) || null;

    const estimatedTotal =
        duracionTotal ||
        (permitirCombinar ? tiempoFase1 + tiempoExposicion + tiempoFase2 : tiempoFase1) ||
        30;

    let candidateResourceIds = [];
    try {
        const parsed = typeof service.personalDisponible === "string" ? JSON.parse(service.personalDisponible) : service.personalDisponible;
        if (parsed && Array.isArray(parsed.staffIds)) {
            candidateResourceIds = parsed.staffIds;
        } else if (Array.isArray(service.personalDisponible)) {
            candidateResourceIds = service.personalDisponible;
        }
    } catch (_) {}

    const staffDisponible = Array.from(
        new Set(
            candidateResourceIds
                .map((candidate) => (typeof candidate === "object" && candidate !== null ? candidate.resourceId || candidate.id || candidate._id : candidate))
                .map((id) => _safeTrim(id))
                .filter((id) => _looksLikeGuid(id))
        )
    );

    const allStaff = await getAllStaff().catch(() => []);
    const staffOptions = (staffDisponible.length > 0 ? allStaff.filter((s) => staffDisponible.includes(s.resourceId)) : allStaff)
        .filter((s) => s.activo !== false)
        .map((s) => ({
            id: s.resourceId,
            value: s.resourceId,
            name: s.displayName || s.nombreVisible || STAFF_DEFAULT_NAME,
            label: s.displayName || s.nombreVisible || STAFF_DEFAULT_NAME,
        }));

    const rawAddonRefs = service.opcionesAddons || service.addonsOptions || service.addonOptions || service.addons || [];
    const addons = await _resolveEditorialAddons(rawAddonRefs, traceId);

    return {
        slugUrl,
        serviceId,
        linkFases: permitirCombinar ? linkFases : null,
        permitirCombinar,
        tiempoFase1,
        tiempoExposicion,
        tiempoFase2,
        duracionTotal: estimatedTotal,
        staffDisponible,
        staffOptions,
        metadata: {
            titulo: tituloServicio,
            tituloServicio,
            precio,
            moneda,
            categoria: SERVICE_CATALOG.CATEGORIES.includes(categoria) ? categoria : null,
            duracionTotal: estimatedTotal,
            localizacion,
            resumenCorto,
            descripcionLarga,
            recomendacionProductoRef: _safeTrim(service.recomendacionProductoRef) || null,
            recomendacionProductoRef2: _safeTrim(service.recomendacionProductoRef2) || null,
            addons,
            addonsPrecio: addons.map((addon) => Math.max(0, Number(addon?.precio || 0))),
            imageUrl,
            pricing: { base: precio, currency: moneda },
            timing: { estimatedTotal, totalDuration: estimatedTotal },
        },
    };
}

function _toPublicService(service) {
    if (!service || typeof service !== "object") return null;
    const { linkFases, ...publicService } = service;
    return publicService;
}

async function _getServiceBySlugOrIdInternal(slugOrId, externalTraceId = null) {
    const traceId = externalTraceId || makeTraceId("service");

    const rawCandidate = typeof slugOrId === "object" && slugOrId !== null ?
        (slugOrId.idServicio || slugOrId.serviceId || slugOrId.slugUrl || slugOrId.slug || slugOrId.id || "") :
        slugOrId;
    const raw = _safeTrim(rawCandidate);
    const isGuid = _looksLikeGuid(raw);
    const clean = isGuid ? raw : _safeSlugOrId(raw);

    if (!clean) {
        return { status: "ERROR", data: null, error: { code: "SLUG_MISSING", message: "Slug o ID de servicio requerido." } };
    }

    const cached = serviceCatalogRAM.get(clean);
    if (cached && Date.now() - cached.timestamp < SERVICE_CACHE_TTL_MS) {
        return { status: "SUCCESS", data: cached.data, error: null };
    }

    try {
        let service = null;

        if (isGuid) {
            const result = await withTimeout(
                wixData.query(SERVICIOS_COL).limit(1).eq("idServicio", clean).find({ suppressAuth: true }),
                WATCHDOG_TIMEOUT_MS,
                "getServiceBySlugOrId:idServicio"
            );
            service = result?.items?.[0] || null;
            if (!service) {
                const alt = await withTimeout(
                    wixData.query(SERVICIOS_COL).limit(1).eq("serviceId", clean).find({ suppressAuth: true }),
                    WATCHDOG_TIMEOUT_MS,
                    "getServiceBySlugOrId:serviceId"
                );
                service = alt?.items?.[0] || null;
            }
        } else {
            const result = await withTimeout(
                wixData.query(SERVICIOS_COL).limit(1).eq("slugUrl", clean).find({ suppressAuth: true }),
                WATCHDOG_TIMEOUT_MS,
                "getServiceBySlugOrId:slugUrl"
            );
            service = result?.items?.[0] || null;
        }

        if (!service) {
            log.error("Service not found in SERVICIOS_RESERVA", { key: clean, traceId });
            return { status: "ERROR", data: null, error: { code: "SERVICE_NOT_FOUND", message: `Servicio no encontrado.` } };
        }

        const mapped = await _mapServiceToUX(service, traceId);

        _cacheSetBounded(serviceCatalogRAM, clean, { data: mapped, timestamp: Date.now() }, CACHE_MAX_SIZE);
        if (mapped.serviceId) _cacheSetBounded(serviceCatalogRAM, mapped.serviceId, { data: mapped, timestamp: Date.now() }, CACHE_MAX_SIZE);
        if (mapped.slugUrl) _cacheSetBounded(serviceCatalogRAM, mapped.slugUrl, { data: mapped, timestamp: Date.now() }, CACHE_MAX_SIZE);

        return { status: "SUCCESS", data: mapped, error: null };
    } catch (e) {
        log.error("Error in getServiceBySlugOrId", { error: e?.message, traceId });
        return { status: "ERROR", data: null, error: { code: "DATABASE_ERROR", message: "No se pudo consultar el servicio." } };
    }
}

async function _resolveServiceIdInternal(serviceIdReq) {
    const raw = _safeTrim(serviceIdReq);
    if (!raw) return null;
    if (_looksLikeGuid(raw)) return raw;

    const normalized = _safeSlugOrId(raw);
    if (!normalized) return null;

    const res = await _getServiceBySlugOrIdInternal(normalized);
    if (res?.status === "SUCCESS" && res?.data?.serviceId) {
        const sid = _safeTrim(res.data.serviceId);
        if (sid && _looksLikeGuid(sid)) return sid;
    }

    return null;
}

export async function revalidateExactAvailabilitySlot({ serviceId, localStartDate, localEndDate, resourceId, nativeAddonIds = [], traceId }) {
    const activeTraceId = traceId || makeTraceId("exact-slot");
    const resolvedServiceId = await _resolveServiceIdInternal(serviceId);
    const start = _normalizeLocalIsoStr(localStartDate);
    const end = _normalizeLocalIsoStr(localEndDate);
    const requiredResourceId = _safeTrim(resourceId);

    if (!resolvedServiceId || !start || !end) {
        return { status: "ERROR", data: null, error: { code: "INVALID_SLOT_RECHECK", message: "Datos de slot invalidos para revalidacion." } };
    }

    try {
        const normalizedNativeAddonIds = Array.from(new Set(
            (Array.isArray(nativeAddonIds) ? nativeAddonIds : [])
            .map((id) => _safeTrim(id))
            .filter((id) => _looksLikeGuid(id))
        )).sort();
        let rawSlot = null;

        if (normalizedNativeAddonIds.length > 0) {
            const listPayload = {
                serviceId: String(resolvedServiceId),
                fromLocalDate: start,
                toLocalDate: end,
                timeZone: SDK_CONFIG.TZ,
                bookable: true,
                locations: [_newTimeSlotsLocation()],
                includeResourceTypeIds: [STAFF_RESOURCE_TYPE_ID],
                customerChoices: { addOnIds: normalizedNativeAddonIds },
            };

            if (requiredResourceId) {
                listPayload.resourceTypes = [{
                    resourceTypeId: STAFF_RESOURCE_TYPE_ID,
                    resourceIds: [requiredResourceId],
                }];
            }

            const listed = await _executeWithRetry(
                () => withTimeout(
                    availabilityTimeSlots.listAvailabilityTimeSlots(listPayload),
                    WATCHDOG_TIMEOUT_MS,
                    "listAvailabilityTimeSlots:addonRecheck"
                ),
                2,
                300
            );

            rawSlot = (Array.isArray(listed?.timeSlots) ? listed.timeSlots : []).find((slot) =>
                _normalizeLocalIsoStr(slot?.localStartDate || slot?.startDate) === start &&
                _normalizeLocalIsoStr(slot?.localEndDate || slot?.endDate) === end &&
                slot?.bookable === true
            ) || null;
        } else {
            const getPayload = {
                serviceId: String(resolvedServiceId),
                localStartDate: start,
                localEndDate: end,
                location: _newTimeSlotsLocation(),
                timeZone: SDK_CONFIG.TZ,
            };

            if (requiredResourceId) {
                getPayload.resourceTypes = [{
                    resourceTypeId: STAFF_RESOURCE_TYPE_ID,
                    resourceIds: [requiredResourceId],
                }];
            }

            const result = await _executeWithRetry(
                () => withTimeout(
                    availabilityTimeSlots.getAvailabilityTimeSlot(getPayload),
                    WATCHDOG_TIMEOUT_MS,
                    "getAvailabilityTimeSlot"
                ),
                2,
                300
            );
            rawSlot = result?.timeSlot || null;
        }
        const normalized = _attachServiceId(rawSlot, resolvedServiceId, activeTraceId, "revalidateExactAvailabilitySlot");
        const availableResourceIds = _getResourceIdsFromSlot(normalized);

        if (!normalized || normalized.bookable !== true) {
            return { status: "ERROR", data: null, error: { code: "SLOT_UNAVAILABLE", message: "El horario seleccionado ya no esta disponible." } };
        }

        if (requiredResourceId && !availableResourceIds.includes(requiredResourceId)) {
            return { status: "ERROR", data: null, error: { code: "STAFF_UNAVAILABLE", message: "La profesional seleccionada no esta disponible para este horario." } };
        }

        return {
            status: "SUCCESS",
            data: {
                slot: {
                    ...normalized,
                    localStartDate: start,
                    localEndDate: end,
                },
                resourceId: requiredResourceId || (availableResourceIds.length === 1 ? availableResourceIds[0] : null),
                candidateResourceIds: availableResourceIds,
            },
            error: null,
        };
    } catch (error) {
        const httpStatus = Number(error?.httpStatus || error?.statusCode || error?.response?.status || 0) || null;
        const wixErrorCode = _safeTrim(error?.code || error?.details?.applicationError?.code) || "UNKNOWN";

        log.warn("Exact slot recheck failed", {
            traceId: activeTraceId,
            wixErrorCode,
            httpStatus,
            message: error?.message || String(error),
            serviceId: String(resolvedServiceId),
            localStartDate: start,
            localEndDate: end,
        });

        return {
            status: "ERROR",
            data: null,
            error: {
                code: "SLOT_UNAVAILABLE",
                message: "No se pudo revalidar el horario seleccionado.",
                traceId: activeTraceId,
            },
        };
    }
}

async function _listTimeSlotsV2({ serviceId, fromLocalDate, toLocalDate, resourceIds, nativeAddonIds = [] }, options = {}) {
    const { skipCache = false, timeSlotsPerDay } = options;

    const traceId = makeTraceId("slots");
    const fromKey = _normalizeLocalIsoStr(fromLocalDate);
    const toKey = _normalizeLocalIsoStr(toLocalDate);
    if (!fromKey || !toKey) return [];

    const resolvedServiceId = await _resolveServiceIdInternal(serviceId);
    if (!resolvedServiceId) return [];

    const normalizedResourceIds = Array.isArray(resourceIds) ? resourceIds.map(String).filter(Boolean) : [];
    const normalizedNativeAddonIds = Array.from(new Set(
        (Array.isArray(nativeAddonIds) ? nativeAddonIds : [])
        .map((id) => _safeTrim(id))
        .filter((id) => _looksLikeGuid(id))
    )).sort();
    const resourceKey = normalizedResourceIds.slice().sort().join(",");
    const addonKey = normalizedNativeAddonIds.join(",");

    const cacheKey = `${String(resolvedServiceId)}__${resourceKey}__${addonKey}__${fromKey}__${toKey}__ts:${timeSlotsPerDay || 0}`;

    if (!skipCache) {
        const cached = availabilityCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < SLOTS_CACHE_TTL_MS) return cached.data;

        const inflight = inflightRequests.get(cacheKey);
        if (inflight) return inflight;
    }

    const p = (async () => {
        try {
            const resourceTypes = normalizedResourceIds.length ? [{ resourceTypeId: STAFF_RESOURCE_TYPE_ID, resourceIds: normalizedResourceIds }] : [];

            const payload = {
                serviceId: String(resolvedServiceId),
                fromLocalDate: String(fromKey),
                toLocalDate: String(toKey),
                timeZone: SDK_CONFIG.TZ,
                bookable: true,
                locations: [_newTimeSlotsLocation()],
                includeResourceTypeIds: [STAFF_RESOURCE_TYPE_ID],
            };

            if (resourceTypes.length) payload.resourceTypes = resourceTypes;
            if (normalizedNativeAddonIds.length > 0) payload.customerChoices = { addOnIds: normalizedNativeAddonIds };
            if (Number.isFinite(timeSlotsPerDay) && Number(timeSlotsPerDay) > 0) payload.timeSlotsPerDay = Number(timeSlotsPerDay);

            const data = await _executeWithRetry(
                () =>
                withTimeout(
                    availabilityTimeSlots.listAvailabilityTimeSlots(payload),
                    WATCHDOG_TIMEOUT_MS,
                    "listAvailabilityTimeSlots"
                ),
                3,
                500
            );

            const rawSlots = Array.isArray(data?.timeSlots) ? data.timeSlots : [];

            const slots = rawSlots
                .map((s) => {
                    if (!s) return null;
                    const start = s.localStartDate || s.startDate || "";
                    const end = s.localEndDate || s.endDate || "";
                    const fixed = _attachServiceId(s, resolvedServiceId, traceId, "_listTimeSlotsV2");
                    if (!fixed) return null;
                    return { ...fixed, localStartDate: String(start), localEndDate: String(end) };
                })
                .filter((s) => s && s.localStartDate);

            if (!skipCache) _setAvailabilityCache(resolvedServiceId, cacheKey, slots);
            return slots;
        } catch (e) {
            log.error("_listTimeSlotsV2 failed", { traceId, message: e?.message });
            return [];
        }
    })();

    if (!skipCache) {
        inflightRequests.set(cacheKey, p);
        try {
            return await p;
        } finally {
            inflightRequests.delete(cacheKey);
        }
    }

    return await p;
}

async function _getBookedMinutesByResourceForDay(dateYMD, resourceIds, _traceId) {
    const ymd = String(dateYMD || "").slice(0, 10);
    const ids = Array.isArray(resourceIds) ? resourceIds.map(String).filter(Boolean) : [];
    if (!ymd || ids.length === 0) return {};

    const q = wixData
        .query(CITAS_COL)
        .eq("fechaYmdMadrid", ymd)
        .in("status", ["CONFIRMED", "PENDING_PAYMENT"])
        .in("resourceId", ids)
        .limit(1000);

    let allItems = [];
    let res = await withTimeout(q.find({ suppressAuth: true }), WATCHDOG_TIMEOUT_MS, "balance:queryCitas_p1").catch(() => null);
    allItems = allItems.concat(res?.items || []);

    let page = 2;
    const maxPages = 100;
    while (res && res.hasNext() && page <= maxPages) {
        res = await withTimeout(res.next(), WATCHDOG_TIMEOUT_MS, `balance:queryCitas_p${page}`).catch(() => null);
        allItems = allItems.concat(res?.items || []);
        page++;
    }

    const items = allItems;
    const minutes = {};
    ids.forEach((rid) => (minutes[rid] = 0));

    for (const it of items) {
        const rid = String(it?.resourceId || "").trim();
        if (!rid || minutes[rid] === undefined) continue;

        const start = it?.startDate ? new Date(it.startDate) : null;
        const end = it?.endDate ? new Date(it.endDate) : null;
        if (!(start instanceof Date) || isNaN(start.getTime())) continue;
        if (!(end instanceof Date) || isNaN(end.getTime())) continue;

        minutes[rid] += _minutesBetweenUtcDates(start, end);
    }

    return minutes;
}

async function _rankResourcesByLoad(candidateResourceIds, dateYMD, traceId) {
    const ids = Array.from(new Set(
        (Array.isArray(candidateResourceIds) ? candidateResourceIds : [])
            .map((id) => _safeTrim(id))
            .filter((id) => _looksLikeGuid(id))
    ));
    if (ids.length <= 1) return ids;

    const minutesMap = await _getBookedMinutesByResourceForDay(dateYMD, ids, traceId).catch(() => ({}));

    const allStaffList = await getAllStaff().catch(() => []);
    const staffMap = new Map(allStaffList.map((s) => [s.resourceId, s.displayName || s.nombreVisible]));

    const names = {};
    for (const rid of ids) {
        names[rid] = staffMap.get(rid) || (await _getStaffDisplayName(rid).catch(() => "")) || "";
    }

    return ids.sort((a, b) => {
        const ma = Number(minutesMap[a] || 0);
        const mb = Number(minutesMap[b] || 0);
        if (ma !== mb) return ma - mb;
        const na = String(names[a] || a);
        const nb = String(names[b] || b);
        return na.localeCompare(nb);
    });
}

export function purgeExpiredRamCaches() {
    const now = Date.now();
    for (const [k, v] of availabilityCache.entries()) {
        if (now - v.timestamp > SLOTS_CACHE_TTL_MS) availabilityCache.delete(k);
    }
    for (const [sId, keySet] of availabilityKeysByService.entries()) {
        for (const k of keySet) {
            if (!availabilityCache.has(k)) keySet.delete(k);
        }
        if (keySet.size === 0) availabilityKeysByService.delete(sId);
    }
    for (const [k, v] of serviceCatalogRAM.entries()) {
        if (now - v.timestamp > SERVICE_CACHE_TTL_MS) serviceCatalogRAM.delete(k);
    }
    for (const [k, v] of serviceAddonOptionsRAM.entries()) {
        if (now - v.timestamp > SERVICE_CACHE_TTL_MS) serviceAddonOptionsRAM.delete(k);
    }
    for (const [k, v] of staffDisplayCache.entries()) {
        if (now - v.ts > STAFF_CACHE_TTL_MS) staffDisplayCache.delete(k);
    }
}

async function _pickLeastLoadedResource(candidateResourceIds, dateYMD, traceId) {
    const ranked = await _rankResourcesByLoad(candidateResourceIds, dateYMD, traceId);
    return ranked[0] || null;
}

async function _findNextSlotForServiceInternal(serviceId, fromLocalDateTime, requiredResourceId, traceId, sameDayOnly = false) {
    const resolvedServiceId = await _resolveServiceIdInternal(serviceId);
    if (!resolvedServiceId) return { status: "ERROR", data: null, error: { code: "SERVICE_NOT_FOUND", message: "Service ID not found" } };

    const fromLocal = _normalizeLocalIsoStr(fromLocalDateTime);
    if (!fromLocal) return { status: "ERROR", data: null, error: { code: "INVALID_DATES", message: "fromLocalDateTime invalid" } };

    const startYMD = fromLocal.slice(0, 10);

    const mustHaveStaff = _looksLikeGuid(requiredResourceId);
    const resourceIds = mustHaveStaff ? _normalizeResourceIds(requiredResourceId, traceId) : [];

    const maxDayOffset = sameDayOnly ? 0 : DIAS_LIMITE;
    for (let i = 0; i <= maxDayOffset; i++) {
        const ymd = _addDaysYMDLocal(startYMD, i);
        const dayFrom = i === 0 ? fromLocal : `${ymd}T00:00:00`;
        const dayTo = `${ymd}T23:59:59`;

        const slots = await _listTimeSlotsV2({ serviceId: resolvedServiceId, fromLocalDate: dayFrom, toLocalDate: dayTo, resourceIds }, { skipCache: true });

        const normFrom = _normalizeLocalIsoStr(dayFrom);

        const candidates = (slots || [])
            .filter((s) => _normalizeLocalIsoStr(s.localStartDate) >= normFrom)
            .sort((a, b) => String(a.localStartDate).localeCompare(String(b.localStartDate)));

        if (!candidates.length) continue;

        if (mustHaveStaff) {
            const required = String(requiredResourceId);
            const match = candidates.find((s) => _getResourceIdsFromSlot(s).includes(required));
            if (match) return { status: "SUCCESS", data: { slot: match, dayYMD: ymd }, error: null };
            continue;
        }

        return { status: "SUCCESS", data: { slot: candidates[0], dayYMD: ymd }, error: null };
    }

    return { status: "ERROR", data: null, error: { code: "SLOT_UNAVAILABLE", message: "No available slot found in search window." } };
}

export async function _cleanExpiredDualSlotsInternal({ limit = 100, traceId = null } = {}) {
    const safeLimit = Math.max(1, Math.min(Number(limit) || 100, 100));
    const now = new Date();
    let removed = 0;
    let pageCount = 0;
    const maxPages = 100;

    let res = await withTimeout(
        wixData.query(DUAL_CACHE_COL).lt("expiresAt", now).limit(safeLimit).find({ suppressAuth: true }),
        WATCHDOG_TIMEOUT_MS,
        "cleanExpiredDualSlotsQuery_p1"
    );

    while (res && res.items && res.items.length > 0 && pageCount < maxPages) {
        pageCount++;
        for (const item of res.items) {
            await withTimeout(
                wixData.remove(DUAL_CACHE_COL, item._id, { suppressAuth: true }),
                WATCHDOG_TIMEOUT_MS,
                "cleanExpiredDualSlotsRemove"
            ).catch(() => null);
            removed += 1;
        }

        if (res.hasNext()) {
            res = await withTimeout(
                res.next(),
                WATCHDOG_TIMEOUT_MS,
                `cleanExpiredDualSlotsQuery_p${pageCount + 1}`
            ).catch(() => null);
        } else {
            break;
        }
    }

    log.info("Expired dual cache entries cleaned", { removed, pageCount, traceId });
    return { status: "SUCCESS", data: { removed, pages: pageCount }, error: null };
}

export async function _getCertifiedDualSlotsInternal(serviceId, resourceId, dateYMD, requestedAddonIds = []) {
    const traceId = makeTraceId("dual");

    if (!serviceId || !_isValidMadridYmd(dateYMD)) {
        return { status: "ERROR", data: null, error: { code: "INVALID_PARAMS", message: "serviceId and valid Madrid dateYMD are required" } };
    }

    const resolvedServiceId = await _resolveServiceIdInternal(serviceId);
    if (!resolvedServiceId) {
        return { status: "ERROR", data: null, error: { code: "SERVICE_NOT_FOUND", message: "Service ID not found" } };
    }

    const serviceRes = await _getServiceBySlugOrIdInternal(resolvedServiceId, traceId);
    if (!serviceRes || serviceRes.status !== "SUCCESS" || !serviceRes.data) {
        return { status: "ERROR", data: null, error: { code: "SERVICE_NOT_FOUND", message: "Service catalog missing" } };
    }

    const service = serviceRes.data;
    const addonContext = _resolveAddonContext(service, requestedAddonIds);

    const linkedServiceId = service.linkFases || null;
    const isDual = service.permitirCombinar && !!linkedServiceId;

    const resourceIdsFilter = _normalizeResourceIds(resourceId, traceId);
    const rankedCandidateCache = new Map();

    async function _rankCandidates(candidateResourceIds) {
        const normalized = Array.from(new Set(
            (candidateResourceIds || [])
                .map((id) => _safeTrim(id))
                .filter((id) => _looksLikeGuid(id))
        ));
        const key = normalized.slice().sort().join("|");
        if (!key) return [];
        if (rankedCandidateCache.has(key)) return rankedCandidateCache.get(key);
        const ranked = await _rankResourcesByLoad(normalized, dateYMD, traceId);
        rankedCandidateCache.set(key, ranked);
        return ranked;
    }

    const fromLocalDate = `${dateYMD}T00:00:00`;
    const toLocalDate = `${dateYMD}T23:59:59`;

    const slotsF1 = await _listTimeSlotsV2({
        serviceId: resolvedServiceId,
        fromLocalDate,
        toLocalDate,
        resourceIds: resourceIdsFilter,
        nativeAddonIds: addonContext.nativeAddonIds,
    }, { skipCache: true });

    if (!isDual) {
        const out = [];
        for (const s1 of slotsF1 || []) {
            const candidateResourceIds = _getResourceIdsFromSlot(s1);

            const rankedCandidates = await _rankCandidates(candidateResourceIds);
            const chosen = rankedCandidates[0] || null;
            const pairToken = _generateUUID();
            const forcedSlot = _attachServiceId({ ...s1 }, resolvedServiceId, traceId, "single");
            if (!forcedSlot) continue;

            out.push({
                fase1: { slotRef: forcedSlot, resourceId: chosen || null },
                fase2: null,
                uiPairToken: pairToken,
                pairToken,
                candidateResourceIds,
                serviceId: resolvedServiceId,
                dateYMD,
            });
        }
        return { status: "SUCCESS", data: out, error: null };
    }

    const exposureMs = Math.max(0, Number(service.tiempoExposicion || 0)) * 60 * 1000;

    const pairs = [];

    for (const s1 of slotsF1 || []) {
        const s1EndLocal = _normalizeLocalIsoStr(s1.localEndDate);
        if (!s1EndLocal) continue;

        const s1EndUtc = getUtcDateFromMadridLocal(s1EndLocal);
        if (!s1EndUtc) continue;

        const earliestF2Utc = new Date(s1EndUtc.getTime() + exposureMs);
        const earliestF2Local = getMadridLocalStringNoZ(earliestF2Utc);
        if (earliestF2Local.slice(0, 10) !== dateYMD) continue;

        const candidateResourceIds = _getResourceIdsFromSlot(s1);

        if (!candidateResourceIds.length) continue;

        const rankedCandidates = await _rankCandidates(candidateResourceIds);
        let chosenResourceId = null;
        let s2 = null;

        for (const candidateResourceId of rankedCandidates) {
            const nextF2 = await _findNextSlotForServiceInternal(
                linkedServiceId,
                earliestF2Local,
                candidateResourceId,
                traceId,
                true
            );
            if (nextF2?.status !== "SUCCESS" || !nextF2?.data?.slot || nextF2.data.dayYMD !== dateYMD) continue;

            const candidateF2 = nextF2.data.slot;
            const s2Staff = _getResourceIdsFromSlot(candidateF2);
            if (s2Staff.length > 0 && !s2Staff.includes(String(candidateResourceId))) continue;

            chosenResourceId = candidateResourceId;
            s2 = candidateF2;
            break;
        }

        if (!chosenResourceId || !s2) continue;

        const pairToken = _generateUUID();

        const forcedF1 = _attachServiceId({ ...s1 }, resolvedServiceId, traceId, "dual:F1");
        const forcedF2 = _attachServiceId({ ...s2 }, linkedServiceId, traceId, "dual:F2");
        if (!forcedF1 || !forcedF2) continue;

        pairs.push({
            fase1: { slotRef: forcedF1, resourceId: chosenResourceId },
            fase2: { slotRef: forcedF2, resourceId: chosenResourceId },
            uiPairToken: pairToken,
            pairToken,
            candidateResourceIds,
            serviceId: resolvedServiceId,
            dateYMD,
            earliestF2Local,
        });
    }

    if (pairs.length > 0) {
        const cachePromises = pairs.map((slotPair) => {
            const pairToken = slotPair.uiPairToken;
            const expiresAt = new Date(Date.now() + DUAL_CACHE_TTL_MS);

            const record = {
                _id: pairToken,
                pairToken,
                serviceId: String(slotPair.serviceId),
                slotF1: slotPair.fase1?.slotRef || null,
                slotF2: slotPair.fase2?.slotRef || null,
                resourceId: slotPair.fase1?.resourceId || null,
                candidateResourceIds: slotPair.candidateResourceIds || [],
                phaseOneServiceId: String(slotPair.serviceId),
                phaseTwoServiceId: String(linkedServiceId),
                dateYMD: String(dateYMD),
                expiresAt,
                createdAt: new Date(),
                status: "ACTIVE",
            };

            return wixData.save(DUAL_CACHE_COL, record, { suppressAuth: true }).catch(() => null);
        });

        await Promise.allSettled(cachePromises);
    }

    return { status: "SUCCESS", data: pairs, error: null };
}

export async function _invalidateCachesInternal(serviceId, dateYMD, resourceId, traceId = null) {
    const tId = traceId || makeTraceId("invalidate");

    const resolvedServiceId = (await _resolveServiceIdInternal(serviceId)) || _safeTrim(serviceId);
    const ymd = _safeTrim(dateYMD);
    if (!resolvedServiceId || !_isValidMadridYmd(ymd)) return { ok: true, traceId: tId, skipped: true };

    _invalidateAvailabilityCacheByService(resolvedServiceId);

    const svcRes = await _getServiceBySlugOrIdInternal(resolvedServiceId, tId).catch(() => null);
    const linkedServiceId = svcRes?.data?.permitirCombinar ? _extractRelationalId(svcRes.data.linkFases) : null;
    if (linkedServiceId) {
        _invalidateAvailabilityCacheByService(linkedServiceId);
    }

    const yearMonth = String(ymd).slice(0, 7);
    const resourceIds = _normalizeResourceIds(resourceId, tId).sort().join(",");
    const daysCacheId = `${DAYS_CACHE_VERSION}__${String(resolvedServiceId)}__${_hashKey(resourceIds)}__${String(yearMonth)}`;

    try {
        await withTimeout(
            wixData.remove(DAYS_CACHE_COL, daysCacheId, { suppressAuth: true }),
            WATCHDOG_TIMEOUT_MS,
            "invalidateDaysCache"
        );
    } catch (e) {
        const msg = String(e?.message || "");
        if (!msg.includes("WDE0073") && !msg.includes("does not exist") && !msg.includes("WD_ITEM_DOES_NOT_EXIST")) {
            throw e;
        }
    }

    if (linkedServiceId) {
        const linkedDaysCacheId = `${DAYS_CACHE_VERSION}__${String(linkedServiceId)}__${_hashKey(resourceIds)}__${String(yearMonth)}`;
        try {
            await withTimeout(
                wixData.remove(DAYS_CACHE_COL, linkedDaysCacheId, { suppressAuth: true }),
                WATCHDOG_TIMEOUT_MS,
                "invalidateLinkedDaysCache"
            );
        } catch (e) {
            const msg = String(e?.message || "");
            if (!msg.includes("WDE0073") && !msg.includes("does not exist") && !msg.includes("WD_ITEM_DOES_NOT_EXIST")) {
                throw e;
            }
        }
    }

    try {
        let res = await withTimeout(
            wixData.query(DUAL_CACHE_COL)
                .eq("dateYMD", String(ymd))
                .and(
                    wixData.query(DUAL_CACHE_COL)
                        .eq("phaseOneServiceId", String(resolvedServiceId))
                        .or(wixData.query(DUAL_CACHE_COL).eq("serviceId", String(resolvedServiceId)))
                )
                .limit(100)
                .find({ suppressAuth: true }),
            WATCHDOG_TIMEOUT_MS,
            "invalidateDualCacheQuery"
        );

        let itemsToRemove = res?.items || [];
        let p = 2;
        while (res && res.hasNext() && p <= 10) {
            res = await withTimeout(res.next(), WATCHDOG_TIMEOUT_MS, `invalidateDualCacheQuery_p${p}`);
            itemsToRemove = itemsToRemove.concat(res?.items || []);
            p++;
        }

        await Promise.allSettled(
            itemsToRemove.map((it) => wixData.remove(DUAL_CACHE_COL, it._id, { suppressAuth: true }).catch(() => null))
        );
    } catch (e) {
        log.warn("_invalidateCachesInternal: dual cache cleanup failed (best-effort)", { traceId: tId, message: e?.message });
    }

    return { ok: true, traceId: tId };
}

export const invalidateCachesInternal = webMethod(Permissions.Admin, async (serviceId, dateYMD, resourceId) => {
    const traceId = makeTraceId("wm-invalidate-internal");
    try {
        _rateLimitOrThrow("reservas.invalidateCachesInternal", "admin", traceId);
        await requireAdmin(traceId);
        const res = await _invalidateCachesInternal(serviceId, dateYMD, resourceId, traceId);
        return { status: "SUCCESS", data: res, error: null };
    } catch (err) {
        return { status: "ERROR", data: null, error: _toPublicError(err, "INVALIDATE_FAILED") };
    }
});

export async function getServiceForBookingInternal(serviceId, traceId = null) {
    return await _getServiceBySlugOrIdInternal(serviceId, traceId || makeTraceId("service-internal"));
}

export const getServiceBySlugOrId = webMethod(Permissions.Anyone, async (slugOrId) => {
    const traceId = makeTraceId("wm-svc");
    try {
        _rateLimitOrThrow("reservas.getServiceBySlugOrId", _safeTrim(slugOrId) || "anon", traceId);
        const result = await _getServiceBySlugOrIdInternal(slugOrId, traceId);
        return result?.status === "SUCCESS" ? { status: "SUCCESS", data: _toPublicService(result.data), error: null } :
            result;
    } catch (err) {
        return { status: "ERROR", data: null, error: _toPublicError(err, "SERVICE_LOOKUP_FAILED") };
    }
});

export const resolveServiceId = webMethod(Permissions.Anyone, async (serviceIdReq) => {
    const traceId = makeTraceId("wm-svc-resolve");
    try {
        _rateLimitOrThrow("reservas.resolveServiceId", _safeTrim(serviceIdReq) || "anon", traceId);
        const resolved = await _resolveServiceIdInternal(serviceIdReq);
        if (!resolved) {
            return { status: "ERROR", data: null, error: { code: "SERVICE_NOT_FOUND", message: "Identificador de servicio no encontrado." } };
        }
        return { status: "SUCCESS", data: String(resolved), error: null };
    } catch (err) {
        return { status: "ERROR", data: null, error: _toPublicError(err, "SERVICE_RESOLVE_FAILED") };
    }
});

export const getAvailableDays = webMethod(Permissions.Anyone, async (serviceId, resourceId, year, month, addonIds = [], requesterId = "") => {
    const traceId = makeTraceId("wm-days");
    try {
        _rateLimitPublicAvailability(
            "reservas.getAvailableDays",
            requesterId,
            `${_safeTrim(serviceId)}|${String(year)}|${String(month)}`,
            traceId
        );

        const resolved = await _resolveServiceIdInternal(serviceId);
        if (!resolved) return { status: "ERROR", data: null, error: { code: "SERVICE_NOT_FOUND", message: "Servicio no encontrado." } };

        const svcRes = await _getServiceBySlugOrIdInternal(resolved, traceId);
        const service = svcRes?.data;
        if (!service) return { status: "ERROR", data: null, error: { code: "SERVICE_CONFIG_MISSING", message: "Configuracion de servicio no disponible." } };
        const addonContext = _resolveAddonContext(service, addonIds);
        const resourceIds = _normalizeResourceIds(resourceId, traceId);

        const y = Number(year);
        const m = Number(month);
        if (!Number.isInteger(y) || !Number.isInteger(m) || m < 1 || m > 12) {
            return { status: "ERROR", data: null, error: { code: "INVALID_PARAMS", message: "Invalid year/month" } };
        }

        const yearMonth = `${String(y).padStart(4, "0")}-${String(m).padStart(2, "0")}`;

        const tz = SDK_CONFIG.TZ;
        const now = new Date();
        const todayStr = now.toLocaleDateString("sv-SE", { timeZone: tz });

        const tomorrowStr = _addDaysYMDLocal(todayStr, 1);
        const maxDateStr = _addDaysYMDLocal(todayStr, DIAS_LIMITE);

        const firstDay = `${yearMonth}-01`;
        const lastDayNum = new Date(Date.UTC(y, m, 0)).getUTCDate();
        const lastDay = `${yearMonth}-${String(lastDayNum).padStart(2, "0")}`;

        const fromLocal = tomorrowStr > firstDay ? tomorrowStr : firstDay;
        const toLocal = maxDateStr < lastDay ? maxDateStr : lastDay;

        if (fromLocal > toLocal) return { status: "SUCCESS", data: [], error: null };

        const slots = await _listTimeSlotsV2({
            serviceId: resolved,
            fromLocalDate: `${fromLocal}T00:00:00`,
            toLocalDate: `${toLocal}T23:59:59`,
            resourceIds,
            nativeAddonIds: addonContext.nativeAddonIds,
        }, { skipCache: true, timeSlotsPerDay: 1 });

        const dateSet = new Set();
        slots.forEach((s) => {
            if (s.localStartDate) dateSet.add(String(s.localStartDate).slice(0, 10));
        });

        return { status: "SUCCESS", data: _filterDaysByLimit(Array.from(dateSet).sort()), error: null };
    } catch (err) {
        return { status: "ERROR", data: null, error: _toPublicError(err, "DAYS_QUERY_FAILED") };
    }
});

export const getCertifiedDualSlots = webMethod(Permissions.Anyone, async (serviceId, resourceId, dateYMD, addonIds = [], requesterId = "") => {
    const traceId = makeTraceId("wm-dual");
    try {
        _rateLimitPublicAvailability(
            "reservas.getCertifiedDualSlots",
            requesterId,
            `${_safeTrim(serviceId)}|${_safeTrim(dateYMD)}`,
            traceId
        );
        return await _getCertifiedDualSlotsInternal(serviceId, resourceId, dateYMD, addonIds);
    } catch (err) {
        return { status: "ERROR", data: null, error: _toPublicError(err, "DUAL_SLOTS_FAILED") };
    }
});

export const resolveStaffForSlot = webMethod(Permissions.Anyone, async (serviceId, start1, rId, addonIds = [], dualContext = null) => {
    const traceId = makeTraceId("wm-staff");
    try {
        _rateLimitOrThrow("reservas.resolveStaffForSlot", `${_safeTrim(serviceId)}|${_safeTrim(start1)}`, traceId);

        const resolvedServiceId = await _resolveServiceIdInternal(serviceId);
        if (!resolvedServiceId) return { status: "ERROR", data: null, error: { code: "SERVICE_NOT_FOUND", message: "Servicio no encontrado." } };

        const svcRes = await _getServiceBySlugOrIdInternal(resolvedServiceId, traceId);
        const serviceCfg = svcRes?.data;
        if (!serviceCfg) return { status: "ERROR", data: null, error: { code: "SERVICE_CONFIG_MISSING", message: "Servicio no disponible en el catalogo." } };

        const addonContext = _resolveAddonContext(serviceCfg, addonIds);
        const dateYMD = String(start1).slice(0, 10);
        const isAnyStaff = !rId || ["all", "any"].includes(String(rId).trim().toLowerCase());

        const slotsF1 = await _listTimeSlotsV2({
            serviceId: resolvedServiceId,
            fromLocalDate: `${dateYMD}T00:00:00`,
            toLocalDate: `${dateYMD}T23:59:59`,
            resourceIds: isAnyStaff ? [] : _normalizeResourceIds(rId, traceId),
            nativeAddonIds: addonContext.nativeAddonIds,
        }, { skipCache: true });

        const slotF1Raw = (slotsF1 || []).find(
            (s) => _normalizeLocalIsoStr(s.localStartDate) === _normalizeLocalIsoStr(start1)
        );
        if (!slotF1Raw) return { status: "ERROR", data: null, error: { code: "SLOT_UNAVAILABLE", message: "El horario de la primera fase ya no esta disponible." } };

        const slotF1 = _attachServiceId(slotF1Raw, resolvedServiceId, traceId, "resolveStaff:F1Norm");
        let candidateResourceIds = _getResourceIdsFromSlot(slotF1);

        const linkedServiceId = serviceCfg.permitirCombinar ? _extractRelationalId(serviceCfg.linkFases) : "";
        let slotF2 = null;
        if (linkedServiceId) {
            if (!dualContext?.start2) {
                return { status: "ERROR", data: null, error: { code: "F2_SLOT_REQUIRED", message: "El servicio dual requiere el slot certificado de la segunda fase." } };
            }
            const requestedF2Start = _normalizeLocalIsoStr(dualContext.start2);
            if (!requestedF2Start || requestedF2Start.slice(0, 10) !== dateYMD) {
                return { status: "ERROR", data: null, error: { code: "F2_DIFFERENT_DAY", message: "La segunda fase debe realizarse en la misma jornada que la primera." } };
            }
            const nextF2 = await _findNextSlotForServiceInternal(
                linkedServiceId,
                requestedF2Start,
                isAnyStaff ? null : _safeTrim(rId),
                traceId,
                true
            );
            if (
                nextF2?.status !== "SUCCESS" ||
                !nextF2?.data?.slot ||
                nextF2.data.dayYMD !== dateYMD ||
                _normalizeLocalIsoStr(nextF2.data.slot.localStartDate) !== requestedF2Start
            ) {
                return { status: "ERROR", data: null, error: { code: "F2_UNAVAILABLE", message: "El horario de la segunda fase ya no esta disponible." } };
            }
            slotF2 = nextF2.data.slot;
            const candidatesF2 = _getResourceIdsFromSlot(slotF2);
            candidateResourceIds = candidateResourceIds.filter(id => candidatesF2.includes(id));
        } else if (dualContext?.start2) {
            return { status: "ERROR", data: null, error: { code: "UNEXPECTED_F2_CONTEXT", message: "Un servicio simple no puede incluir contexto de segunda fase." } };
        }

        if (!candidateResourceIds.length) {
            return { status: "ERROR", data: null, error: { code: "STAFF_NOT_AVAILABLE", message: "No hay personal disponible para este horario combinado." } };
        }

        const requestedResourceId = isAnyStaff ? "" : _safeTrim(rId);
        if (requestedResourceId && !candidateResourceIds.includes(requestedResourceId)) {
            return { status: "ERROR", data: null, error: { code: "STAFF_NOT_AVAILABLE", message: "La profesional seleccionada no esta disponible para este horario combinado." } };
        }

        const finalResourceId = isAnyStaff ?
            await _pickLeastLoadedResource(candidateResourceIds, dateYMD, traceId) :
            requestedResourceId;

        if (!finalResourceId) return { status: "ERROR", data: null, error: { code: "STAFF_NOT_AVAILABLE", message: "No se pudo asignar una profesional para este horario." } };

        const finalResourceName = (await _getStaffDisplayName(finalResourceId)) || STAFF_DEFAULT_NAME;

        return {
            status: "SUCCESS",
            data: {
                slotF1: _attachServiceId(slotF1, resolvedServiceId, traceId, "resolveStaff:F1"),
                slotF2: slotF2 ? _attachServiceId(slotF2, linkedServiceId, traceId, "resolveStaff:F2") : null,
                resourceId: finalResourceId,
                resourceName: finalResourceName,
                dayYMD: dateYMD,
            },
            error: null,
        };
    } catch (err) {
        return { status: "ERROR", data: null, error: _toPublicError(err, "STAFF_RESOLVE_FAILED") };
    }
});
