/*
=============================================================================
MODULE: public/mmUtils.js
VERSION: marianmadrid4001 (v21.0.0-LTS-canonical-shared-utils-unified)
RESPONSIBILITY: Universal shared utility library for Frontend and Backend.
STANDARDS: G10 ASCII Strict (0 non-ASCII characters).
=============================================================================
*/

export const STAFF_DEFAULT_NAME = "Cualquier Profesional";

export const MONEY = Object.freeze({
    DISPLAY_CURRENCY: "EUR",
    DECIMAL_SEPARATOR: ",",
    THOUSANDS_SEPARATOR: ".",
});

export const BOOKINGS_ADDON_CONFIG = Object.freeze({
    MAX_PER_BOOKING: 5,
});

export const URLS = Object.freeze({
    SERVICIOS: "/reserva-online",
    CALENDARIO_2: "/booking-calendar/calendario-2",
    DETALLE_SERVICIO: "/servicio-2",
    PRIVACY_POLICY: "/politica-de-privacidad",
});

export const UI = Object.freeze({
    SALON_LOCATION_LABEL: "Marian Madrid Peluqueria y Estetica",
    DEFAULT_SERVICE_IMAGE_URL: "https://static.wixstatic.com/media/ab7708_374e5f7adb2f47f3944f3355da129b80~mv2.jpg",
    FRONTEND_API_TIMEOUT_MS: 15000,
    FRONTEND_RETRY_ATTEMPTS: 3,
    FRONTEND_RETRY_BASE_BACKOFF_MS: 500,
    HANDSHAKE_TIMEOUT_MS: 15000,
    CONTEXT_TIMEOUT_MS: 20000,
});

export const MESSAGE_TYPES = Object.freeze({
    READY: "MM_READY",
    CONTEXT: "MM_CONTEXT",
    AVAIL: "MM_AVAIL",
    SELECT: "MM_SELECT",
    BOOK: "MM_BOOK",
    NAV: "MM_NAV",
});

export const SDK_CONFIG = Object.freeze({
    TZ: "Europe/Madrid",
});

export function _safeTrim(value) {
    if (value === null || value === undefined) return "";
    return String(value).trim();
}

export function _safeEmail(value) {
    return _safeTrim(value).toLowerCase();
}

export function _isValidEmail(email) {
    const clean = _safeEmail(email);
    if (!clean || clean.length > 254) return false;
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return re.test(clean);
}

export function _maskEmail(email) {
    const clean = _safeEmail(email);
    if (!clean.includes("@")) return "masked_user";
    const [name, domain] = clean.split("@");
    const maskedName = name.length > 2 ? `${name[0]}***${name[name.length - 1]}` : `${name[0]}***`;
    return `${maskedName}@${domain}`;
}

export function _safePhone(value) {
    const clean = _safeTrim(value);
    if (!clean) return "";
    return clean.replace(/[^\d+]/g, "");
}

export function _looksLikeGuid(value) {
    const clean = _safeTrim(value);
    if (clean.length !== 36) return false;
    const re = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return re.test(clean);
}

export function _safeSlugOrId(value) {
    const clean = _safeTrim(value);
    return clean.toLowerCase().replace(/[^a-z0-9-_]/g, "");
}

export function _roundMoney(value) {
    const num = Number(value || 0);
    if (!Number.isFinite(num)) return 0;
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function _sumAddons(addons) {
    if (!Array.isArray(addons)) return 0;
    const total = addons.reduce((acc, a) => acc + Number(a?.precio || a?.price || 0), 0);
    return _roundMoney(total);
}

export function _cleanText(value, maxLength = 500) {
    return _safeTrim(value).slice(0, maxLength);
}

export function _normType(type) {
    return String(type || "").trim().toUpperCase();
}

export function _readPositiveAmount(value) {
    const num = Number(value);
    return Number.isFinite(num) && num > 0 ? _roundMoney(num) : 0;
}

export function _readDate(value) {
    const clean = _safeTrim(value);
    return /^\d{4}-\d{2}-\d{2}$/.test(clean) ? clean : "";
}

export function _stableSerialize(obj) {
    if (obj === null || typeof obj !== "object") {
        return JSON.stringify(obj);
    }
    if (Array.isArray(obj)) {
        return `[${obj.map(_stableSerialize).join(",")}]`;
    }
    const sortedKeys = Object.keys(obj).sort();
    const parts = sortedKeys.map((k) => `${JSON.stringify(k)}:${_stableSerialize(obj[k])}`);
    return `{${parts.join(",")}}`;
}

export function _normalizeIdPart(value, maxLen = 80) {
    const clean = _safeTrim(value).replace(/[^a-zA-Z0-9_-]/g, "_");
    return clean.slice(0, maxLen);
}

export function _toDateSafe(value) {
    if (!value) return null;
    if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
}

export function getUtcDateFromMadridLocal(localIsoStr) {
    const clean = _safeTrim(localIsoStr);
    if (!clean) return null;
    if (clean.endsWith("Z")) {
        const d = new Date(clean);
        return isNaN(d.getTime()) ? null : d;
    }
    const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/.exec(clean);
    if (!match) return null;

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const hour = Number(match[4]);
    const min = Number(match[5]);
    const sec = Number(match[6] || 0);

    const assumedUtc = new Date(Date.UTC(year, month - 1, day, hour, min, sec));
    const invDate = new Date(assumedUtc.toLocaleString("en-US", { timeZone: "Europe/Madrid" }));
    const diff = assumedUtc.getTime() - invDate.getTime();
    return new Date(assumedUtc.getTime() + diff);
}

export function getMadridLocalStringNoZ(date) {
    const d = _toDateSafe(date);
    if (!d) return "";
    const pad = (n) => String(n).padStart(2, "0");
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Madrid",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).formatToParts(d);

    const map = {};
    parts.forEach((p) => { map[p.type] = p.value; });
    const hour = map.hour === "24" ? "00" : map.hour;
    return `${map.year}-${map.month}-${map.day}T${pad(hour)}:${map.minute}:${map.second}`;
}

export function _normalizeLocalIsoStr(value) {
    if (!value) return "";
    if (value instanceof Date) return getMadridLocalStringNoZ(value);
    const raw = String(value).trim();
    if (raw.endsWith("Z")) {
        const utcDate = new Date(raw);
        return isNaN(utcDate.getTime()) ? "" : getMadridLocalStringNoZ(utcDate);
    }
    return raw.split(".")[0];
}

export function _addDaysYMD(ymd, days) {
    const clean = _safeTrim(ymd);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(clean)) return "";
    const [y, m, d] = clean.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
    dt.setUTCDate(dt.getUTCDate() + Number(days || 0));
    return dt.toLocaleDateString("sv-SE", { timeZone: "Europe/Madrid" });
}

export function _minutesBetweenUtcDates(d1, d2) {
    const a = _toDateSafe(d1);
    const b = _toDateSafe(d2);
    if (!a || !b) return 0;
    const ms = b.getTime() - a.getTime();
    if (ms <= 0) return 0;
    return Math.round(ms / 60000);
}

export function _maskIp(ip) {
    const clean = _safeTrim(ip);
    if (!clean) return "ANON_IP";
    if (clean.includes(".")) {
        const parts = clean.split(".");
        if (parts.length === 4) return `${parts[0]}.${parts[1]}.***.***`;
    }
    return clean.slice(0, 8) + "***";
}

export function makeTraceId(prefix = "tr") {
    const p = _normalizeIdPart(prefix, 10);
    const ts = Date.now().toString(36);
    const rnd = Math.random().toString(36).slice(2, 8);
    return `${p}-${ts}-${rnd}`;
}

export function _generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function _hashKey(str) {
    let hash = 0;
    const clean = String(str || "");
    for (let i = 0; i < clean.length; i++) {
        hash = ((hash << 5) - hash) + clean.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash).toString(16);
}

export function _normalizeSlotShape(slot) {
    if (!slot || typeof slot !== "object") return null;
    if (slot.slot && typeof slot.slot === "object") {
        return { ...slot.slot, ...slot };
    }
    return slot;
}

export function _extractRelationalId(value) {
    if (!value) return "";
    if (typeof value === "object") {
        return _safeTrim(value.idServicio || value.resourceId || value.idAddon || value.idCategoria || value._id || value.id || "");
    }
    return _safeTrim(value);
}

export async function withTimeout(promise, ms, label = "operation") {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
            const err = new Error(`TIMEOUT: ${label} exceeded ${ms}ms`);
            err.code = "TIMEOUT";
            reject(err);
        }, ms);
    });
    try {
        return await Promise.race([promise, timeoutPromise]);
    } finally {
        clearTimeout(timeoutId);
    }
}

export async function _executeWithRetry(fn, retries = 3, delayMs = 500) {
    let lastError;
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (attempt === retries) break;
            const jitter = Math.floor(Math.random() * 200);
            await new Promise((r) => setTimeout(r, delayMs * Math.pow(2, attempt - 1) + jitter));
        }
    }
    throw lastError;
}

export function _cloneDeep(obj) {
    if (obj === null || typeof obj !== "object") return obj;
    return JSON.parse(JSON.stringify(obj));
}
