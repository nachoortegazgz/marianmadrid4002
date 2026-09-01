/*
=============================================================================
MODULE: pages/ONLY STAFF.mvf3f.js
VERSION: marianmadrid4003 (v21.1.1-LTS-remediated-standalone-page)
RESPONSIBILITY: Canonical Velo page controller for staff operations (#htmlOnlyStaff).
STANDARDS: G10 ASCII Strict (0 non-ASCII characters).
=============================================================================
*/

import wixMembersFrontend from "wix-members-frontend";
import wixLocation from "wix-location";
import { checkStaffCollaboratorAccess } from "backend/security.web";
import {
    getMyStaffContext,
    getStaffOptionsForAdmin,
    registrarFichaje,
    getEstadoJornada,
    getHistorialFichajes,
    calcularHorasTrabajadas,
    registrarAjusteHorario,
} from "backend/horario.web";
import {
    registerManualTransaction,
    getCashierState,
    registerZClosing,
    registerXCount,
} from "backend/cajas.web";
import {
    getInventoryDashboard,
    registerInternalInventoryUse,
    registerInventoryReceipt,
    getInventoryReconciliationQueue,
    markInventoryReconciliationApplied,
} from "backend/inventario.web";
import {
    MONEY,
    SDK_CONFIG,
    makeTraceId,
    _safeTrim,
} from "public/mmUtils";

const WIDGET_ID = "#htmlOnlyStaff";
const CLOCK_TYPES = Object.freeze(["ENTRADA", "SALIDA", "PAUSA_INICIO", "PAUSA_FIN"]);
const CASHIER_METHODS = Object.freeze(["EFECTIVO", "TARJETA", "BIZUM"]);

$w.onReady(async function () {
    const traceId = makeTraceId("only-staff");
    const widget = $w(WIDGET_ID);
    if (!widget || typeof widget.postMessage !== "function") return;

    let targetOrigin = null;

    function post(type, payload, messageId) {
        const msg = { type, payload: { ...(payload || {}), traceId } };
        if (messageId) msg.messageId = messageId;
        try {
            widget.postMessage(msg, targetOrigin || "*");
        } catch (_) {}
    }

    const member = await wixMembersFrontend.currentMember.getMember().catch(() => null);
    if (!member) {
        await wixMembersFrontend.authentication.promptLogin();
        return;
    }

    const [accessRes, staffContextRes] = await Promise.all([
        checkStaffCollaboratorAccess(traceId).catch(() => null),
        getMyStaffContext({ traceId }).catch(() => null),
    ]);
    const access = accessRes?.status === "SUCCESS" ? accessRes.data : null;
    const staffContext = staffContextRes?.status === "SUCCESS" ? staffContextRes.data : null;

    if (!access || !staffContext?.resourceId) {
        wixLocation.to("/reserva-online");
        return;
    }

    const employeeResourceId = staffContext.resourceId;
    const staffOptionsRes = access.isAdmin ?
        await getStaffOptionsForAdmin({ traceId }).catch(() => null) :
        null;
    const staffOptions = staffOptionsRes?.status === "SUCCESS" && Array.isArray(staffOptionsRes.data) ?
        staffOptionsRes.data :
        [];

    const sendContext = async () => {
        const [stateRes, cashierRes, inventoryRes, inventoryQueueRes] = await Promise.all([
            getEstadoJornada(employeeResourceId, { traceId }).catch(() => null),
            access.isAdmin || access.isCajero ?
                getCashierState({ traceId }).catch(() => null) :
                Promise.resolve(null),
            getInventoryDashboard().catch(() => null),
            access.isAdmin || access.isCajero ?
                getInventoryReconciliationQueue().catch(() => null) :
                Promise.resolve(null),
        ]);

        post("MM_CONTEXT", {
            employeeResourceId,
            employeeName: staffContext.displayName || "EMPLEADO",
            memberName: staffContext.displayName || "EMPLEADO",
            isAdmin: access.isAdmin === true,
            isCajero: access.isCajero === true,
            isMarianManager: access.isMarianManager === true,
            roleLabel: access.isAdmin ? "ADMINISTRACION" : (access.isCajero ? "CAJA" : "EQUIPO"),
            timeZone: SDK_CONFIG?.TZ || "Europe/Madrid",
            currencyCode: MONEY?.DISPLAY_CURRENCY || "EUR",
            access,
            staffOptions,
            estadoInicial: stateRes?.status === "SUCCESS" ? stateRes.data : null,
            cashierState: cashierRes?.status === "SUCCESS" ? cashierRes.data : null,
            inventory: inventoryRes?.status === "SUCCESS" ? inventoryRes.data : null,
            inventoryQueue: inventoryQueueRes?.status === "SUCCESS" ? (inventoryQueueRes.data?.items || []) : [],
            today: new Date().toLocaleDateString("sv-SE", { timeZone: SDK_CONFIG?.TZ || "Europe/Madrid" }),
        });
    };

    widget.onMessage(async (event) => {
        const msg = event?.data || {};
        const type = String(msg.type || "").trim().toUpperCase();
        const payload = msg.payload || {};
        const messageId = msg.messageId || null;

        if (event.origin && event.origin !== "null") targetOrigin = event.origin;

        if (type === "MM_READY") {
            await sendContext();
            return;
        }

        try {
            switch (type) {
                case "CLOCK": {
                    const tipoFichaje = _safeTrim(payload.tipoFichaje).toUpperCase();
                    if (!CLOCK_TYPES.includes(tipoFichaje)) {
                        post("CLOCK_RES", { status: "ERROR", error: { code: "INVALID_INPUT", message: "Tipo de fichaje no valido" } }, messageId);
                        return;
                    }
                    const res = await registrarFichaje({ resourceId: employeeResourceId, tipoFichaje, traceId });
                    post("CLOCK_RES", res, messageId);
                    break;
                }
                case "GET_STATE": {
                    const res = await getEstadoJornada(employeeResourceId, { traceId });
                    post("GET_STATE_RES", res, messageId);
                    break;
                }
                case "GET_HISTORY": {
                    const res = await getHistorialFichajes(employeeResourceId, payload.startDateYMD, payload.endDateYMD, { traceId });
                    post("GET_HISTORY_RES", res, messageId);
                    break;
                }
                case "HOURS_CALC": {
                    const res = await calcularHorasTrabajadas(employeeResourceId, payload.startDateYMD, payload.endDateYMD, { traceId });
                    post("HOURS_CALC_RES", res, messageId);
                    break;
                }
                case "ADJUSTMENT": {
                    if (!access.isAdmin) {
                        post("ADJUSTMENT_RES", { status: "ERROR", error: { code: "ADMIN_REQUIRED", message: "Permisos de administrador requeridos" } }, messageId);
                        return;
                    }
                    const res = await registrarAjusteHorario({ resourceId: _safeTrim(payload.employeeId), motivoAjuste: _safeTrim(payload.motivoAjuste), traceId });
                    post("ADJUSTMENT_RES", res, messageId);
                    break;
                }
                case "TPV_TX": {
                    if (!access.isAdmin && !access.isCajero) {
                        post("TPV_TX_RES", { status: "ERROR", error: { code: "CASHIER_REQUIRED", message: "Permisos de caja requeridos" } }, messageId);
                        return;
                    }
                    const res = await registerManualTransaction({
                        amount: Number(payload.amount),
                        paymentMethod: _safeTrim(payload.paymentMethod).toUpperCase(),
                        tipoMovimiento: _safeTrim(payload.transactionKind).toUpperCase() === "PROPINA" ? "PROPINA" : "",
                        concept: _safeTrim(payload.concept),
                        resourceId: employeeResourceId,
                        traceId,
                    });
                    post("TPV_TX_RES", res, messageId);
                    break;
                }
                case "CASHIER_STATE": {
                    if (!access.isAdmin && !access.isCajero) {
                        post("CASHIER_STATE_RES", { status: "ERROR", error: { code: "CASHIER_REQUIRED", message: "Permisos de caja requeridos" } }, messageId);
                        return;
                    }
                    const res = await getCashierState({ traceId, diaKey: payload.diaKey || null });
                    post("CASHIER_STATE_RES", res, messageId);
                    break;
                }
                case "X_COUNT": {
                    if (!access.isAdmin && !access.isCajero) {
                        post("X_COUNT_RES", { status: "ERROR", error: { code: "CASHIER_REQUIRED", message: "Permisos de caja requeridos" } }, messageId);
                        return;
                    }
                    const res = await registerXCount(payload.diaKey, { metalicoCaja: Number(payload.metalicoCaja), traceId });
                    post("X_COUNT_RES", res, messageId);
                    break;
                }
                case "Z_CLOSING": {
                    if (!access.isAdmin) {
                        post("Z_CLOSING_RES", { status: "ERROR", error: { code: "ADMIN_REQUIRED", message: "Permisos de administrador requeridos" } }, messageId);
                        return;
                    }
                    const res = await registerZClosing(payload.diaKey, { traceId });
                    post("Z_CLOSING_RES", res, messageId);
                    break;
                }
                case "INVENTORY_DASH": {
                    const res = await getInventoryDashboard();
                    post("INVENTORY_DASH_RES", res, messageId);
                    break;
                }
                case "INVENTORY_USE": {
                    const res = await registerInternalInventoryUse({ lines: [{ sku: _safeTrim(payload.sku), quantity: Number(payload.quantity), note: _safeTrim(payload.note) }] });
                    post("INVENTORY_USE_RES", res, messageId);
                    break;
                }
                case "INVENTORY_RECEIPT": {
                    if (!access.isAdmin && !access.isCajero) {
                        post("INVENTORY_RECEIPT_RES", { status: "ERROR", error: { code: "CASHIER_REQUIRED", message: "Permisos de caja requeridos" } }, messageId);
                        return;
                    }
                    const res = await registerInventoryReceipt({ lines: [{ sku: _safeTrim(payload.sku), quantity: Number(payload.quantity), note: _safeTrim(payload.note) }] });
                    post("INVENTORY_RECEIPT_RES", res, messageId);
                    break;
                }
                case "INVENTORY_QUEUE": {
                    if (!access.isAdmin && !access.isCajero) {
                        post("INVENTORY_QUEUE_RES", { status: "ERROR", error: { code: "CASHIER_REQUIRED", message: "Permisos de caja requeridos" } }, messageId);
                        return;
                    }
                    const res = await getInventoryReconciliationQueue();
                    post("INVENTORY_QUEUE_RES", res, messageId);
                    break;
                }
                case "INVENTORY_APPLY": {
                    if (!access.isAdmin && !access.isCajero) {
                        post("INVENTORY_APPLY_RES", { status: "ERROR", error: { code: "CASHIER_REQUIRED", message: "Permisos de caja requeridos" } }, messageId);
                        return;
                    }
                    const res = await markInventoryReconciliationApplied(_safeTrim(payload.reconciliationId), _safeTrim(payload.note));
                    post("INVENTORY_APPLY_RES", res, messageId);
                    break;
                }
                case "MM_NAV":
                case "NAV": {
                    const target = _safeTrim(payload.target).toUpperCase();
                    if (target === "SERVICIOS" || target === "BACK") {
                        wixLocation.to("/reserva-online");
                    }
                    break;
                }
                default:
                    post("ONLY_STAFF_ERROR", { status: "ERROR", error: { code: "UNKNOWN_ACTION", message: "Accion no reconocida" } }, messageId);
            }
        } catch (err) {
            post(`${type}_RES`, { status: "ERROR", data: null, error: { code: "ACTION_FAILED", message: err?.message || String(err) } }, messageId);
        }
    });
});