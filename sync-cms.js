const fs = require('fs');
const path = require('path');

const files = {
    'src/backend/internalConfig.js': `/*
=============================================================================
MODULE: backend/internalConfig.js
VERSION: marianmadrid4001 (v20.1.2-canonical-unified-ssot)
RESPONSIBILITY: Single Source of Truth for all backend configuration:
            collection IDs, app IDs, SDK settings, concurrency limits,
            cache TTLs, enums, and feature flags.
STANDARDS: G10 ASCII Strict (0 non-ASCII characters).
=============================================================================
*/
export const COLLECTIONS = Object.freeze({
    // Catalogo Comercial y Personal (Nombre Visible === ID Tecnico)
    SERVICIOS_RESERVA: "SERVICIOS_RESERVA",
    SERVICIOS_CITA: "SERVICIOS_RESERVA",
    ADDONS_CATALOGO: "ADDONS_CATALOGO",
    EXTRAS_CATALOGO: "ADDONS_CATALOGO",
    SERVICIOS_OPCIONES_ADDON: "ADDONS_CATALOGO",
    MAPA_STAFF: "MAPA_STAFF",
    CATEGORIAS_SERVICIO: "CATEGORIAS_SERVICIO",
    LOCALIZACIONES_SALON: "LOCALIZACIONES_SALON",

    // Inventario y Productos
    INVENTARIO_PRODUCTO: "INVENTARIO_PRODUCTO",
    INVENTARIO_PRODUCTOS: "INVENTARIO_PRODUCTO",
    PRODUCTOS_VENTA: "PRODUCTOS_VENTA",
    MOVIMIENTO_INVENTARIO: "movimientoInventario",
    CONCILIACION_STOCK_WIX: "ConciliacionStockWix",
    PROVEEDORES_INVENTARIO: "ProveedoresInventario",

    // Motor de Reservas y Concurrencia
    DUAL_CACHE: "DualSlotCache",
    DAYS_CACHE: "AvailabilityDaysCache",
    SLOTS_CACHE: "AvailabilitySlotsCache",
    CITAS: "CitasF2",
    TRANSACTIONS: "BookingTransactions",
    LOCKS: "MM_LOCKS",
    COMPENSATIONS: "PendingCompensations",

    // Caja, TPV y Facturacion
    MOVIMIENTOS_CAJA: "movimientoCaja",
    CAJA_ACTUAL: "cajaActual",
    HISTORICO_CIERRES_Z: "HISTORICOCIERRESZ",
    CONTEOS_X: "RESUMENCONTEO_X",
    CONTADORES_FISCALES: "SecuenciaTickets",

    // Personal y Control Horario
    REGISTRO_HORARIO: "REGISTROHORARIO",

    // Logs, Auditoria y Sincronizacion
    AUDIT_LOG: "MMAUDIT_LOG",
    SYNC_LOG: "m365SyncLog",
    BOOKINGS_SERVICE_SYNC_QUEUE: "BookingsServiceSyncQueue",
    M365_GRAPH_SYNC_QUEUE: "M365GraphSyncQueue",

    // Fiscalidad AEAT / Veri*Factu y Contabilidad
    CONFIGURACION_FISCAL: "CONFIGURACIONFISCAL",
    EVENTOS_SISTEMA_FACTURACION: "EVENTOSSISTEMAFACTURACION",
    LIBRO_IVA_FACTURAS_EXPEDIDAS: "LIBROIVAFACTURASEXPEDIDAS",
    LIBRO_IVA_FACTURAS_RECIBIDAS: "LIBROIVAFACTURASRECIBIDAS",
    LIBRO_IVA_BIENES_INVERSION: "LIBROIVABIENESINVERSION",
    LIBRO_IVA_INTRACOMUNITARIO: "LIBROIVAINTRACOMUNITARIO",
    LIBRO_INVENTARIO_CIERRE: "LIBROINVENTARIOCIERRE",
    ASIENTOS_CONTABLES: "ASIENTOSCONTABLES",
    LINEAS_ASIENTO_CONTABLE: "LINEASASIENTOCONTABLE",
    PLAN_CUENTAS_CONTABLES: "PLANCUENTASCONTABLES",
    MAYOR_CONTABLE_SALDOS: "MAYORCONTABLESALDOS",
});

export const APP_IDS = Object.freeze({
    BOOKINGS: "13d21c63-b5ec-5912-8397-c3a5ddb27a97",
    STORES: "1380b703-ce81-ff05-f115-39571d94eab3",
    EVENTS: "140603ad-af8d-84fb-9004-ee174e35054d",
    FORMS_PAYMENTS: "14ce1214-b278-a7e4-1373-00cebd1bef7c",
    INVOICES: "13ee94c1-b635-8505-3391-97919052c16f",
    MEMBERS_AREA: "14cc59bc-f0b7-15b8-e1c7-89ce41d0e0c9",
    GIFT_CARDS: "d80111c5-a0f4-47a8-b63a-65b54d774a27",
});

export const SDK_CONFIG = Object.freeze({
    TZ: "Europe/Madrid",
    LOCATION_ID: "7a12abfd-bf30-4847-bcdf-00dc573d4802",
    LOCATION_TYPES: Object.freeze({
        TIME_SLOTS: "BUSINESS",
        BOOKINGS_WRITER: "OWNER_BUSINESS",
    }),
    TIMEOUTS: Object.freeze({
        API_MS: 15000,
        CMS_MS: 15000,
        WATCHDOG_MS: 30000,
        WEBHOOK_MS: 30000,
    }),
    CACHE: Object.freeze({
        SERVICES_TTL_MS: 600000,
        SLOTS_CACHE_TTL_MS: 120000,
        DUAL_CACHE_TTL_MS: 900000,
        STAFF_TTL_MS: 300000,
        MAX_ENTRIES: 100,
        DAYS_CACHE_VERSION: 1,
    }),
    SECURITY: Object.freeze({
        SECRET_CACHE_TTL_MS: 300000,
        RATE_LIMIT_CACHE_CLEANUP_TTL_MS: 60000,
        RATE_LIMIT_CACHE_MAX_ENTRIES: 5000,
    }),
    RATE_LIMIT: Object.freeze({
        MAX_REQUESTS: 20,
        WINDOW_MS: 5000,
        BOOKING_MAX_REQUESTS: 5,
        BOOKING_WINDOW_MS: 10000,
        AVAILABILITY_WINDOW_MS: 5000,
        AVAILABILITY_REQUESTER_MAX_REQUESTS: 12,
        AVAILABILITY_GLOBAL_MAX_REQUESTS: 120,
    }),
    JOBS: Object.freeze({
        TIMEOUT_MS: 30000,
        AUDIT_RETENTION_DAYS: 90,
        DELETE_BATCH_SIZE: 100,
        DELETE_MAX_PAGES: 10,
        DUAL_CACHE_CLEANUP_LIMIT: 100,
        FISCAL_RECOVERY_BATCH_SIZE: 25,
        HEALTH_CHECK_QUERY_LIMIT: 100,
        FISCAL_DAILY_MAX_PAGES: 10,
        BOOKINGS_SERVICE_SYNC_MAX_ATTEMPTS: 5,
        BOOKINGS_SERVICE_SYNC_BATCH_SIZE: 20,
        BOOKINGS_SERVICE_SYNC_BACKOFF_MS: 300000,
        M365_GRAPH_SYNC_BATCH_SIZE: 20,
        M365_GRAPH_SYNC_MAX_ATTEMPTS: 3,
        M365_GRAPH_SYNC_BACKOFF_MS: 300000,
    }),
    EVENTS: Object.freeze({
        RETRY_ATTEMPTS: 3,
        RETRY_BASE_BACKOFF_MS: 1000,
    }),
    EXTERNAL_HTTP: Object.freeze({
        RATE_LIMIT_MAX_REQUESTS: 20,
        RATE_LIMIT_WINDOW_MS: 5000,
        HMAC_MAX_CLOCK_SKEW_SECONDS: 60,
        CORS_ALLOWED_ORIGINS: ["https://www.marianmadrid.es", "https://marianmadrid.es"],
    }),
    M365: Object.freeze({ ENABLED: false }),
    ACCOUNTING: Object.freeze({ ENABLED: false }),
    DOCUMENTS: Object.freeze({
        DEFAULT_MANAGER_EMAIL: "gestion@marianmadrid.es",
        MAX_EMAIL_ATTACHMENT_BYTES: 3145728,
        MAX_EMAIL_SEND_ATTEMPTS: 3,
    }),
});

export const RATE_LIMIT = SDK_CONFIG.RATE_LIMIT;
export const CACHE = SDK_CONFIG.CACHE;
export const TIMEOUTS = SDK_CONFIG.TIMEOUTS;
export const JOBS = SDK_CONFIG.JOBS;

export const CONCURRENCY = Object.freeze({
    MUTEX_TTL_MS: 120000,
    HEARTBEAT_MS: 15000,
    TRANSACTION_POLL_BASE_MS: 250,
    TRANSACTION_MAX_WAIT_MS: 3000,
    LOCK_CLEANUP_GRACE_MS: 60000,
    MAX_COMPENSATION_RETRIES: 3,
    LEDGER_MUTEX_TTL_MS: 45000,
});

export const SLOT_SEARCH = Object.freeze({
    DIAS_LIMITE: 14,
    TOLERANCE_MINUTES: 10,
});

export const API = Object.freeze({
    STAFF_RESOURCE_TYPE_ID: "1cd44cf8-756f-41c3-bd90-3e2ffcaf1155",
    MARIAN_MANAGEMENT_RESOURCE_ID: "e556070a-6d6a-402e-8422-11133033ea76",
});

export const STAFF_ACCESS = Object.freeze({
    ALLOWED_ROLES: ["ADMIN", "GESTION", "ESTILISTA"],
    MARIAN_RESOURCE_ID: "e556070a-6d6a-402e-8422-11133033ea76",
});

export const TIPO_FICHAJE = Object.freeze({
    ENTRADA: "ENTRADA",
    SALIDA: "SALIDA",
    PAUSA_INICIO: "PAUSA_INICIO",
    PAUSA_FIN: "PAUSA_FIN",
    AJUSTE: "AJUSTE",
});

export const TIPO_MOVIMIENTO = Object.freeze({
    VENTA_EFECTIVO: "VENTA_EFECTIVO",
    VENTA_TARJETA: "VENTA_TARJETA",
    VENTA_BIZUM: "VENTA_BIZUM",
    VENTA_ONLINE: "VENTA_ONLINE",
    REEMBOLSO: "REEMBOLSO",
    AJUSTE: "AJUSTE",
    PROPINA: "PROPINA",
});

export const FORMA_PAGO = Object.freeze({
    EFECTIVO: "EFECTIVO",
    TARJETA: "TARJETA",
    BIZUM: "BIZUM",
    ONLINE: "ONLINE",
});

export const IVA_RATES = Object.freeze({ GENERAL: 0.21 });
export const CAJA_STATUS = Object.freeze({ OPEN: "ABIERTA", CLOSED: "CERRADA" });
export const SINGLETONS = Object.freeze({ CAJA: "CAJA_PRINCIPAL" });

export const CITA_FIELDS = Object.freeze({
    STATUS: "status",
    STATUS_PAGO: "statusPago",
});

export const ESTADO_CITA = Object.freeze({
    CONFIRMED: "CONFIRMED",
    PENDING_PAYMENT: "PENDING_PAYMENT",
    CANCELED: "CANCELED",
    REFUNDED: "REFUNDED",
});

export const ESTADO_PAGO = Object.freeze({
    UNPAID: "UNPAID",
    PENDING_PAYMENT: "PENDING_PAYMENT",
    PENDING_LEDGER: "PENDING_LEDGER",
    PAID: "PAID",
    REFUNDED: "REFUNDED",
    PARTIALLY_REFUNDED: "PARTIALLY_REFUNDED",
});

export const COLLAB_ROLES = Object.freeze({
    ADMIN: "ADMIN",
    GESTION: "GESTION",
    ESTILISTA: "ESTILISTA",
});

export const JWT = Object.freeze({
    ALGORITHM: "HS256",
    EXPIRATION_MS: 1800000,
});

export const SERVICE_CATALOG = Object.freeze({
    CURRENCY: "EUR",
    STATES: ["ACTIVO", "INACTIVO", "BORRADOR"],
    CATEGORIES: ["PELUQUERIA", "ESTETICA", "UNAS", "COMBINADO", "PRODUCTO"],
    MAX_TITLE_LENGTH: 160,
    MAX_SUMMARY_LENGTH: 120,
    MAX_DESCRIPTION_LENGTH: 6000,
    MAX_DURATION_MINUTES: 1440,
});
`,

    'src/backend/data.js': `/*
=============================================================================
MODULE: backend/data.js
VERSION: marianmadrid4001 (v20.1.2-canonical-unified-hooks)
RESPONSIBILITY: CMS data hooks for canonical dates, immutable fiscal records,
            and immutable labor records aligned with SERVICIOS_RESERVA,
            MAPA_STAFF, and dropdown relational definitions.
STANDARDS: G10 ASCII Strict (0 non-ASCII characters).
=============================================================================
*/
import wixData from "wix-data";
import { getMadridLocalStringNoZ } from "public/mmUtils";
import {
    COLLECTIONS,
    SINGLETONS,
    TIPO_FICHAJE,
    CITA_FIELDS,
    ESTADO_CITA,
    SERVICE_CATALOG,
} from "backend/internalConfig";
import { clearStaffCache, findStaff } from "backend/staff";
import { enqueueBookingsServiceSync } from "backend/bookingsServiceSync";

const CAJA_ACTUAL_ID = SINGLETONS.CAJA;
const DUAL_CACHE_COL = COLLECTIONS.DUAL_CACHE;
const DAYS_CACHE_COL = COLLECTIONS.DAYS_CACHE;
const SLOTS_CACHE_COL = COLLECTIONS.SLOTS_CACHE;
const SHA256_HEX_RE = /^[0-9a-f]{64}$/i;
const GUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function _toDate(value) {
    if (!value) return null;
    const date = value instanceof Date ? value : new Date(value);
    return isNaN(date.getTime()) ? null : date;
}

function _normalizeDateField(item, field, fallback) {
    const date = _toDate(item[field]);
    item[field] = date || fallback;
}

const SERVICE_STATES = new Set(SERVICE_CATALOG.STATES);

function _normalizeCatalogReference(value) {
    const candidate = value && typeof value === "object" ? (value.nombreCategoria || value._id || value.id) : value;
    return String(candidate || "").trim().toUpperCase();
}

function _normalizeBoundedText(item, field, maxLength) {
    if (item[field] === undefined || item[field] === null) return;
    const normalized = String(item[field]).trim();
    if (normalized.length > maxLength) {
        throw new Error(\`SERVICE_VALIDATION: \${field} exceeds the permitted length.\`);
    }
    item[field] = normalized;
}

function _readDuration(item, field) {
    const raw = item[field];
    if (raw === undefined || raw === null || raw === "") return 0;
    const value = Number(raw);
    if (!Number.isFinite(value) || value < 0 || value > SERVICE_CATALOG.MAX_DURATION_MINUTES) {
        throw new Error(\`SERVICE_VALIDATION: \${field} must be between 0 and \${SERVICE_CATALOG.MAX_DURATION_MINUTES}.\`);
    }
    return value;
}

function _validateServiceCatalog(item, context) {
    if (!item || typeof item !== "object" || context?.suppressHooks === true) return item;

    _normalizeBoundedText(item, "tituloServicio", SERVICE_CATALOG.MAX_TITLE_LENGTH);
    _normalizeBoundedText(item, "resumenCorto", SERVICE_CATALOG.MAX_SUMMARY_LENGTH);
    _normalizeBoundedText(item, "descripcionLarga", SERVICE_CATALOG.MAX_DESCRIPTION_LENGTH);

    const estado = _normalizeCatalogReference(item.estado);
    if (estado) {
        if (!SERVICE_STATES.has(estado)) {
            throw new Error("SERVICE_VALIDATION: estado must be selected from the approved catalog.");
        }
        item.estado = estado;
    }

    const categoria = _normalizeCatalogReference(item.nombreCategoria || item.categoria);
    if (categoria) {
        item.nombreCategoria = categoria;
    }

    const moneda = _normalizeCatalogReference(item.moneda || item.monedaCatalogo);
    if (moneda && moneda !== SERVICE_CATALOG.CURRENCY) {
        throw new Error("SERVICE_VALIDATION: only EUR is supported by this catalog.");
    }

    if (item.precio !== undefined && item.precio !== null && item.precio !== "") {
        const precio = Number(item.precio);
        if (!Number.isFinite(precio) || precio < 0) {
            throw new Error("SERVICE_VALIDATION: precio must be a non-negative number.");
        }
        item.precio = precio;
    }

    const f1 = _readDuration(item, "tiempoFaseUno") || _readDuration(item, "tiempoFase1");
    const gap = _readDuration(item, "tiempoExposicion");
    const f2 = _readDuration(item, "tiempoFaseDos") || _readDuration(item, "tiempoFase2");
    item.tiempoFaseUno = f1;
    item.tiempoExposicion = gap;
    item.tiempoFaseDos = f2;

    const total = f1 + gap + f2;
    if (total > SERVICE_CATALOG.MAX_DURATION_MINUTES) {
        throw new Error("SERVICE_VALIDATION: total duration is invalid.");
    }
    item.duracionTotal = Math.round(total * 100) / 100;
    return item;
}

export function SERVICIOS_RESERVA_beforeInsert(item, context) {
    return _validateServiceCatalog(item, context);
}

export function SERVICIOS_RESERVA_beforeUpdate(item, context) {
    return _validateServiceCatalog(item, context);
}

export function Import2_beforeInsert(item, context) {
    return _validateServiceCatalog(item, context);
}

export function Import2_beforeUpdate(item, context) {
    return _validateServiceCatalog(item, context);
}

async function _removeCollectionItemsByServiceId(collectionId, fields, serviceId) {
    const cleanServiceId = String(serviceId || "").trim();
    if (!GUID_RE.test(cleanServiceId)) return;

    const matches = await Promise.allSettled(
        fields.map((field) => wixData.query(collectionId).eq(field, cleanServiceId).limit(1000).find({ suppressAuth: true }))
    );
    const ids = new Set(
        matches
            .filter((result) => result.status === "fulfilled")
            .flatMap((result) => result.value?.items || [])
            .map((item) => item?._id)
            .filter(Boolean)
    );
    await Promise.allSettled(
        [...ids].map((itemId) => wixData.remove(collectionId, itemId, { suppressAuth: true }))
    );
}

async function _invalidateServiceCaches(serviceId) {
    await Promise.allSettled([
        _removeCollectionItemsByServiceId(DUAL_CACHE_COL, ["serviceId", "phaseOneServiceId", "idServicioFaseUno"], serviceId),
        _removeCollectionItemsByServiceId(DAYS_CACHE_COL, ["serviceId", "phaseOneServiceId", "idServicioFaseUno"], serviceId),
        _removeCollectionItemsByServiceId(SLOTS_CACHE_COL, ["phaseOneServiceId", "idServicioFaseUno"], serviceId),
    ]);
}

async function _enqueueBookingsServiceSyncSafely(item) {
    if (item?.bookingsSyncEnabled !== true) return null;
    try {
        return await enqueueBookingsServiceSync(item);
    } catch (_) {
        return null;
    }
}

export async function SERVICIOS_RESERVA_afterInsert(item, context) {
    if (!item || context?.suppressHooks === true) return item;
    await _enqueueBookingsServiceSyncSafely(item);
    return item;
}

export async function SERVICIOS_RESERVA_afterUpdate(item, context) {
    if (!item || context?.suppressHooks === true) return item;
    const s1 = item.idServicio || item.serviceId;
    const s2 = item.idServicioFaseDos || item.linkFases;
    await _invalidateServiceCaches(s1);
    if (s2) await _invalidateServiceCaches(s2);
    await _enqueueBookingsServiceSyncSafely(item);
    return item;
}

export async function Import2_afterInsert(item, context) {
    return SERVICIOS_RESERVA_afterInsert(item, context);
}

export async function Import2_afterUpdate(item, context) {
    return SERVICIOS_RESERVA_afterUpdate(item, context);
}

function _validateMapaStaff(item, context) {
    if (!item || typeof item !== "object" || context?.suppressHooks === true) return item;
    const resourceId = String(item.resourceId || "").trim();
    if (!GUID_RE.test(resourceId)) throw new Error("STAFF_VALIDATION: resourceId must be a valid Bookings resource GUID.");
    item.resourceId = resourceId;

    _normalizeBoundedText(item, "nombreVisible", 80);
    if (!item.nombreVisible) throw new Error("STAFF_VALIDATION: nombreVisible is required.");
    _normalizeBoundedText(item, "idMiembroStaff", 120);
    _normalizeBoundedText(item, "email", 254);
    _normalizeBoundedText(item, "scheduleId", 120);
    _normalizeBoundedText(item, "rol", 60);
    if (item.email) item.email = item.email.toLowerCase();
    if (!item.idMiembroStaff && !item.email) throw new Error("STAFF_VALIDATION: idMiembroStaff or email is required.");
    if (item.activo !== undefined && typeof item.activo !== "boolean") {
        throw new Error("STAFF_VALIDATION: activo must be boolean.");
    }
    item.activo = item.activo !== false;
    item.updatedAt = new Date();
    return item;
}

export function MAPA_STAFF_beforeInsert(item, context) {
    return _validateMapaStaff(item, context);
}

export function MAPA_STAFF_beforeUpdate(item, context) {
    return _validateMapaStaff(item, context);
}

export function MAPA_STAFF_afterInsert(item) {
    clearStaffCache();
    return item;
}

export function MAPA_STAFF_afterUpdate(item) {
    clearStaffCache();
    return item;
}

export function MAPA_STAFF_afterRemove(itemId) {
    clearStaffCache();
    return itemId;
}

export function CitasF2_beforeInsert(item, context) {
    if (!item || typeof item !== "object" || context?.suppressHooks === true) return item;

    const bookingId = String(item.bookingId || "").trim();
    if (!bookingId) throw new Error("CITAS_VIOLATION: Missing bookingId.");
    item.bookingId = bookingId;

    const now = new Date();
    _normalizeDateField(item, "startDate", null);
    _normalizeDateField(item, "endDate", null);
    _normalizeDateField(item, "fechaCreacion", now);
    _normalizeDateField(item, "fechaActualizacion", now);

    if (!item.fechaYmdMadrid && item.startDate) {
        item.fechaYmdMadrid = getMadridLocalStringNoZ(item.startDate).slice(0, 10);
    }

    item[CITA_FIELDS.STATUS] = String(item[CITA_FIELDS.STATUS] || ESTADO_CITA.CONFIRMED).toUpperCase();
    item[CITA_FIELDS.STATUS_PAGO] = String(item[CITA_FIELDS.STATUS_PAGO] || "UNPAID").toUpperCase();
    return item;
}

export function movimientoCaja_beforeInsert(item, context) {
    if (!item || typeof item !== "object") return item;

    if (!SHA256_HEX_RE.test(String(item.hashCadena || "").trim())) {
        throw new Error("FISCAL_VIOLATION: Missing or invalid hashCadena format.");
    }
    if (!SHA256_HEX_RE.test(String(item.prevHash || "").trim())) {
        throw new Error("FISCAL_VIOLATION: Missing or invalid prevHash format.");
    }

    const signatureParts = String(item.firmaDigital || "").trim().split("|");
    if (signatureParts.length !== 2 || !SHA256_HEX_RE.test(signatureParts[0]) || !SHA256_HEX_RE.test(signatureParts[1])) {
        throw new Error("FISCAL_VIOLATION: Invalid firmaDigital format.");
    }
    if (!String(item.numTicketFactura || item.numeroTicket || "").trim()) {
        throw new Error("FISCAL_VIOLATION: Missing numTicketFactura.");
    }

    _normalizeDateField(item, "fechaCreacion", new Date());
    return item;
}

export function movimientoCaja_beforeUpdate(_item) {
    throw new Error("FISCAL_VIOLATION: Direct updates to movimientoCaja are forbidden.");
}

export function movimientoCaja_beforeRemove(_itemId) {
    throw new Error("FISCAL_VIOLATION: Direct removals from movimientoCaja are forbidden.");
}

export async function REGISTROHORARIO_beforeInsert(item, context) {
    if (!item || typeof item !== "object") return item;

    const staff = await findStaff(item.resourceId);
    if (!staff) {
        throw new Error("INVALID_EMPLOYEE: Employee resourceId is not registered in MAPA_STAFF.");
    }

    const tipoFichaje = String(item.tipoFichaje || "").toUpperCase();
    if (!Object.values(TIPO_FICHAJE).includes(tipoFichaje)) {
        throw new Error(\`INVALID_CLOCK_TYPE: Tipo de fichaje invalido "\${tipoFichaje}".\`);
    }
    if (tipoFichaje === TIPO_FICHAJE.AJUSTE && !String(item.motivoAjuste || "").trim()) {
        throw new Error("INVALID_CLOCK_ADJUSTMENT: motivoAjuste is required for manual adjustments.");
    }

    const now = new Date();
    const fechaHora = _toDate(item.fechaHora) || now;
    if (fechaHora.getTime() > now.getTime() + 60000) {
        throw new Error("INVALID_TIMESTAMP: Future timestamps are forbidden.");
    }

    const madrid = getMadridLocalStringNoZ(fechaHora);
    item.resourceId = staff.resourceId;
    item.resourceName = staff.displayName || staff.nombreVisible;
    item.tipoFichaje = tipoFichaje;
    item.fechaHora = fechaHora;
    item.fechaCreacion = now;
    item.diaKey = madrid.slice(0, 10);
    item.mesKey = madrid.slice(0, 7);
    item.hora = madrid.slice(11, 19);
    return item;
}

export function REGISTROHORARIO_beforeUpdate(_item) {
    throw new Error("LABOR_LOG_VIOLATION: Direct updates to REGISTROHORARIO are forbidden.");
}

export function REGISTROHORARIO_beforeRemove(_itemId) {
    throw new Error("LABOR_LOG_VIOLATION: Direct removals from REGISTROHORARIO are forbidden.");
}

export function HISTORICOCIERRESZ_beforeUpdate(_item) {
    throw new Error("FISCAL_VIOLATION: Direct updates to HISTORICOCIERRESZ are forbidden.");
}

export function HISTORICOCIERRESZ_beforeRemove(_itemId) {
    throw new Error("FISCAL_VIOLATION: Direct removals from HISTORICOCIERRESZ are forbidden.");
}

export function cajaActual_beforeInsert(item) {
    if (item && typeof item === "object") item._id = CAJA_ACTUAL_ID;
    return item;
}

export function cajaActual_beforeUpdate(item) {
    if (item && typeof item === "object") item._id = CAJA_ACTUAL_ID;
    return item;
}

export function cajaActual_beforeRemove(_itemId) {
    throw new Error("SINGLETON_PROTECTED: Direct deletion of cajaActual is forbidden.");
}
`,
};

console.log('Iniciando sincronizacion con el Dossier CMS...');
let count = 0;

for (const [relPath, content] of Object.entries(files)) {
    const fullPath = path.join(__dirname, relPath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`[OK] Actualizado: ${relPath}`);
    count++;
}

console.log(`\nSincronizacion completada: ${count} archivos alineados.`);
