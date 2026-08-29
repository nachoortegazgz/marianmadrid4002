/*
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
