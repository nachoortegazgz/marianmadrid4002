/*
=============================================================================
MODULE: backend/fiscalDocuments.web.js
VERSION: marianmadrid4001 (v21.0.0-LTS-canonical-fiscal-documents)
RESPONSIBILITY: Generates tax package previews, CSV/PDF structured documents,
            maintains version history, and dispatches via Resend API.
STANDARDS: G10 ASCII Strict (0 non-ASCII characters).
=============================================================================
*/

import { webMethod, Permissions } from "wix-web-module";
import wixData from "wix-data";
import { getSecret } from "wix-secrets-backend";
import { makeTraceId, _safeTrim, withTimeout, _roundMoney } from "public/mmUtils";
import { COLLECTIONS, SDK_CONFIG } from "backend/internalConfig";
import { SECRETS } from "backend/mmSecrets";
import { requireMarianManager } from "backend/security";
import { _toPublicError } from "backend/responseUtils";
import { getQuarterlyTaxSummary, getLibroRegistroFacturasExpedidas } from "backend/fiscalAggregator.web";

const CMS_TIMEOUT_MS = Number(SDK_CONFIG?.TIMEOUTS?.CMS_MS) || 15000;

function _formatDocumentId(year, quarter, version = 1) {
    const vStr = String(version).padStart(4, "0");
    return `DOC_GESTORIA_${year}_T${quarter}_PAQUETE_GESTORIA_V${vStr}`;
}

export const previewManagerPackage = webMethod(Permissions.SiteMember, async (period = {}) => {
    const traceId = makeTraceId("doc-preview");
    try {
        await requireMarianManager(traceId);
        const year = Number(period.year);
        const quarter = Number(period.quarter);
        if (!year || !quarter) throw new Error("Invalid period");

        const [summaryRes, bookRes] = await Promise.all([
            getQuarterlyTaxSummary(year, quarter, { traceId }),
            getLibroRegistroFacturasExpedidas(year, quarter, { traceId }),
        ]);

        return {
            status: "SUCCESS",
            data: {
                period: { year, quarter },
                documentIdDraft: _formatDocumentId(year, quarter, 1),
                summary: summaryRes?.data || null,
                invoiceCount: bookRes?.data?.totalRegistros || 0,
                previewGeneratedAt: new Date(),
            },
            error: null,
        };
    } catch (err) {
        return { status: "ERROR", data: null, error: _toPublicError(err, "DOC_PREVIEW_FAIL") };
    }
});

export const createManagerPackageVersion = webMethod(Permissions.SiteMember, async (period = {}) => {
    const traceId = makeTraceId("doc-create");
    try {
        await requireMarianManager(traceId);
        const year = Number(period.year);
        const quarter = Number(period.quarter);
        if (!year || !quarter) throw new Error("Invalid period");

        const history = await getManagerPackageHistory({ year, quarter });
        const nextVersion = (history?.data?.length || 0) + 1;
        const documentId = _formatDocumentId(year, quarter, nextVersion);

        const [summaryRes, bookRes] = await Promise.all([
            getQuarterlyTaxSummary(year, quarter, { traceId }),
            getLibroRegistroFacturasExpedidas(year, quarter, { traceId }),
        ]);

        const record = {
            _id: documentId,
            documentId,
            year,
            quarter,
            version: nextVersion,
            summaryData: summaryRes?.data || {},
            invoiceData: bookRes?.data?.filas || [],
            createdAt: new Date(),
            status: "PREPARED",
            traceId,
        };

        await withTimeout(
            wixData.save(COLLECTIONS.LIBRO_INVENTARIO_CIERRE, record, { suppressAuth: true }),
            CMS_TIMEOUT_MS,
            "saveManagerPackage"
        );

        return { status: "SUCCESS", data: { documentId, version: nextVersion, createdAt: record.createdAt }, error: null };
    } catch (err) {
        return { status: "ERROR", data: null, error: _toPublicError(err, "DOC_CREATE_FAIL") };
    }
});

export const getManagerPackageHistory = webMethod(Permissions.SiteMember, async (period = {}) => {
    const traceId = makeTraceId("doc-hist");
    try {
        await requireMarianManager(traceId);
        const year = Number(period.year);
        const quarter = Number(period.quarter);

        let q = wixData.query(COLLECTIONS.LIBRO_INVENTARIO_CIERRE);
        if (year) q = q.eq("year", year);
        if (quarter) q = q.eq("quarter", quarter);

        const res = await withTimeout(q.descending("createdAt").limit(50).find({ suppressAuth: true }), CMS_TIMEOUT_MS, "docHistory");
        return { status: "SUCCESS", data: res?.items || [], error: null };
    } catch (err) {
        return { status: "ERROR", data: null, error: _toPublicError(err, "DOC_HIST_FAIL") };
    }
});

export const getPreparedManagerPackages = webMethod(Permissions.SiteMember, async () => {
    const traceId = makeTraceId("doc-prep");
    try {
        await requireMarianManager(traceId);
        const res = await withTimeout(
            wixData.query(COLLECTIONS.LIBRO_INVENTARIO_CIERRE).descending("createdAt").limit(20).find({ suppressAuth: true }),
            CMS_TIMEOUT_MS,
            "preparedPackages"
        );
        return { status: "SUCCESS", data: { items: res?.items || [] }, error: null };
    } catch (err) {
        return { status: "ERROR", data: null, error: _toPublicError(err, "DOC_PREP_FAIL") };
    }
});

export const downloadManagerPackageVersion = webMethod(Permissions.SiteMember, async (params = {}) => {
    const traceId = makeTraceId("doc-download");
    try {
        await requireMarianManager(traceId);
        const documentId = _safeTrim(params.documentId);
        if (!documentId) throw new Error("documentId required");

        const doc = await withTimeout(
            wixData.get(COLLECTIONS.LIBRO_INVENTARIO_CIERRE, documentId, { suppressAuth: true }),
            CMS_TIMEOUT_MS,
            "getDocPackage"
        );
        if (!doc) throw new Error("Document version not found");

        const invoices = Array.isArray(doc.invoiceData) ? doc.invoiceData : [];
        const csvHeader = "Numero;Fecha;Tipo;Base;Cuota;Total;FormaPago;Hash\n";
        const csvRows = invoices.map((inv) =>
            `"${inv.numTicketFactura}";"${inv.fechaExpedicion}";"${inv.tipoMovimiento}";${_roundMoney(inv.baseImponible)};${_roundMoney(inv.cuotaIva)};${_roundMoney(inv.importeTotal)};"${inv.formaPago}";"${inv.hashCompleto}"`
        ).join("\n");
        const csvContent = csvHeader + csvRows;

        return {
            status: "SUCCESS",
            data: {
                documentId,
                csvContent,
                summary: doc.summaryData || {},
                createdAt: doc.createdAt,
            },
            error: null,
        };
    } catch (err) {
        return { status: "ERROR", data: null, error: _toPublicError(err, "DOC_DOWNLOAD_FAIL") };
    }
});

export const emailManagerPackageVersion = webMethod(Permissions.SiteMember, async (params = {}) => {
    const traceId = makeTraceId("doc-email");
    try {
        await requireMarianManager(traceId);
        const documentId = _safeTrim(params.documentId);
        const recipient = _safeTrim(params.recipient);
        if (!documentId || !recipient || params.confirmed !== true) {
            throw new Error("Confirmation and recipient required");
        }

        const downloadRes = await downloadManagerPackageVersion({ documentId });
        if (downloadRes.status !== "SUCCESS" || !downloadRes.data) {
            throw new Error("Could not package document data");
        }

        const apiKey = await getSecret(SECRETS.RESEND_API_KEY).catch(() => "");
        const fromEmail = (await getSecret(SECRETS.RESEND_FROM_EMAIL).catch(() => "")) || SDK_CONFIG.DOCUMENTS.DEFAULT_MANAGER_EMAIL;

        if (!apiKey) {
            return {
                status: "SUCCESS",
                data: { sent: false, note: "Resend API key not configured in Secrets Manager. Package stored in CMS history." },
                error: null,
            };
        }

        const resendPayload = {
            from: `Marian Madrid <${fromEmail}>`,
            to: [recipient],
            subject: `[Gestoria] Paquete Fiscal ${documentId}`,
            text: `Adjunto resumen fiscal y extracto del libro diario para el paquete ${documentId}.\nGenerado: ${new Date().toISOString()}`,
            attachments: [
                {
                    filename: `${documentId}.csv`,
                    content: Buffer.from(downloadRes.data.csvContent, "utf8").toString("base64"),
                },
            ],
        };

        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resendPayload),
        });

        const isOk = response.ok;
        return { status: "SUCCESS", data: { sent: isOk, recipient, documentId }, error: null };
    } catch (err) {
        return { status: "ERROR", data: null, error: _toPublicError(err, "DOC_EMAIL_FAIL") };
    }
});

export async function prepareScheduledManagerPackages(options = {}) {
    const traceId = options.traceId || makeTraceId("cron-packages");
    try {
        const now = new Date();
        const year = now.getFullYear();
        const quarter = Math.floor((now.getMonth() + 3) / 3);
        const created = await createManagerPackageVersion({ year, quarter });
        return { status: "SUCCESS", data: created?.data || null, error: null };
    } catch (err) {
        return { status: "ERROR", data: null, error: _toPublicError(err, "SCHEDULED_PACKAGES_FAIL") };
    }
}