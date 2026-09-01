/*
=============================================================================
MODULE: pages/ADMINISTRACION.gn7mx.js
VERSION: marianmadrid4003 (v21.1.1-LTS-remediated-standalone-page)
RESPONSIBILITY: Canonical Velo page controller for Marian Administration (#htmlAdmin).
STANDARDS: G10 ASCII Strict (0 non-ASCII characters).
=============================================================================
*/

import wixMembersFrontend from "wix-members-frontend";
import wixLocation from "wix-location";

import { checkStaffCollaboratorAccess } from "backend/security.web";
import {
    getCashierState,
    registerManualTransaction,
    registerXCount,
    registerZClosing,
} from "backend/cajas.web";
import {
    getInventoryDashboard,
    getInventoryReconciliationQueue,
} from "backend/inventario.web";
import {
    getQuarterlyTaxSummary,
    getLibroRegistroFacturasExpedidas,
} from "backend/fiscalAggregator.web";
import {
    previewManagerPackage,
    createManagerPackageVersion,
    getManagerPackageHistory,
    getPreparedManagerPackages,
    downloadManagerPackageVersion,
    emailManagerPackageVersion,
} from "backend/fiscalDocuments.web";
import { askMarianAssistant } from "backend/marianAssistant.web";
import { makeTraceId } from "public/mmUtils";

const WIDGET_ID = "#htmlAdmin";

$w.onReady(async function () {
    const traceId = makeTraceId("admin-page");
    const widget = $w(WIDGET_ID) || $w("#htmlAdministracion");
    if (!widget || typeof widget.postMessage !== "function") return;

    let targetOrigin = null;

    function post(type, payload) {
        const msg = { type, payload: { ...(payload || {}), traceId } };
        try {
            widget.postMessage(msg, targetOrigin || "*");
        } catch (_) {}
    }

    const member = await wixMembersFrontend.currentMember.getMember().catch(() => null);
    if (!member) {
        await wixMembersFrontend.authentication.promptLogin();
        return;
    }

    const accessRes = await checkStaffCollaboratorAccess(traceId).catch(() => null);
    const access = accessRes?.status === "SUCCESS" ? accessRes.data : null;

    if (!access || !access.isMarianManager) {
        post("MM_CONTEXT", { isMarianManager: false });
        return;
    }

    const sendContext = async () => {
        const [cashierRes, invRes, queueRes] = await Promise.all([
            getCashierState({ traceId }).catch(() => null),
            getInventoryDashboard().catch(() => null),
            getInventoryReconciliationQueue().catch(() => null),
        ]);

        post("MM_CONTEXT", {
            isMarianManager: true,
            isAdmin: access.isAdmin === true,
            isCajero: access.isCajero === true,
            memberName: member.profile?.nickname || member.contactDetails?.firstName || "Marian",
            timeZone: "Europe/Madrid",
            currencyCode: "EUR",
            today: new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Madrid" }),
            cashierState: cashierRes?.status === "SUCCESS" ? cashierRes.data : null,
            inventory: invRes?.status === "SUCCESS" ? invRes.data : null,
            inventoryQueue: queueRes?.status === "SUCCESS" ? (queueRes.data?.items || []) : [],
        });
    };

    widget.onMessage(async (event) => {
        const msg = event?.data || {};
        const type = String(msg.type || "").trim().toUpperCase();
        const payload = msg.payload || {};

        if (event.origin && event.origin !== "null") targetOrigin = event.origin;

        if (type === "MM_READY") {
            await sendContext();
            return;
        }

        try {
            switch (type) {
                case "CASHIER_STATE": {
                    const res = await getCashierState({ traceId, diaKey: payload.diaKey || null });
                    post("CASHIER_STATE_RES", res);
                    break;
                }
                case "INVENTORY_DASH": {
                    const res = await getInventoryDashboard();
                    post("INVENTORY_DASH_RES", res);
                    break;
                }
                case "INVENTORY_QUEUE": {
                    const res = await getInventoryReconciliationQueue();
                    post("INVENTORY_QUEUE_RES", res);
                    break;
                }
                case "TPV_TX": {
                    const res = await registerManualTransaction({ ...payload, traceId });
                    post("TPV_TX_RES", res);
                    break;
                }
                case "X_COUNT": {
                    const res = await registerXCount(payload.diaKey, { ...payload, traceId });
                    post("X_COUNT_RES", res);
                    break;
                }
                case "Z_CLOSING": {
                    const res = await registerZClosing(payload.diaKey, { traceId });
                    post("Z_CLOSING_RES", res);
                    break;
                }
                case "FISCAL_SUMMARY": {
                    const res = await getQuarterlyTaxSummary(payload.year, payload.quarter, { traceId });
                    post("FISCAL_SUMMARY_RES", res);
                    break;
                }
                case "FISCAL_BOOK": {
                    const res = await getLibroRegistroFacturasExpedidas(payload.year, payload.quarter, { traceId });
                    post("FISCAL_BOOK_RES", res);
                    break;
                }
                case "DOCUMENT_PREVIEW": {
                    const res = await previewManagerPackage(payload);
                    post("DOCUMENT_PREVIEW_RES", res);
                    break;
                }
                case "DOCUMENT_CREATE": {
                    const res = await createManagerPackageVersion(payload);
                    post("DOCUMENT_CREATE_RES", res);
                    break;
                }
                case "DOCUMENT_HISTORY": {
                    const res = await getManagerPackageHistory(payload);
                    post("DOCUMENT_HISTORY_RES", res);
                    break;
                }
                case "DOCUMENT_PREPARED": {
                    const res = await getPreparedManagerPackages();
                    post("DOCUMENT_PREPARED_RES", res);
                    break;
                }
                case "DOCUMENT_DOWNLOAD": {
                    const res = await downloadManagerPackageVersion(payload);
                    post("DOCUMENT_DOWNLOAD_RES", res);
                    break;
                }
                case "DOCUMENT_EMAIL": {
                    const res = await emailManagerPackageVersion(payload);
                    post("DOCUMENT_EMAIL_RES", res);
                    break;
                }
                case "AI_CHAT": {
                    const res = await askMarianAssistant({ ...payload, traceId });
                    post("AI_CHAT_RES", res);
                    break;
                }
                default:
                    post("ADMIN_ERROR", { status: "ERROR", error: { code: "UNKNOWN_ACTION", message: "Accion no reconocida" } });
            }
        } catch (err) {
            post(`${type}_RES`, { status: "ERROR", data: null, error: { code: "ACTION_FAILED", message: err?.message || String(err) } });
        }
    });
});