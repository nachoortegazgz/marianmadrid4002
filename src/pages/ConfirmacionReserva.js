/**
 * =============================================================================
 * MODULE: lightboxes/ConfirmacionReserva.js
 * VERSION: marianmadrid4001 (v21.0.0-LTS-canonical-confirmation-lightbox-html2)
 * RESPONSIBILITY: Authoritative booking confirmation lightbox controller for
 *                 custom HTML widget (#html2). Exclusively consumes
 *                 wixWindowFrontend.getLightboxContext() (0 query params fallback).
 * STANDARDS: G10 ASCII Strict (0 non-ASCII characters).
 * =============================================================================
 */

import wixWindowFrontend from "wix-window-frontend";
import wixLocation from "wix-location";
import { URLS, MONEY, _safeTrim, _roundMoney, makeTraceId, MESSAGE_TYPES } from "public/mmUtils";
import { createWidgetBridge } from "public/widgetBridge";

const WIDGET_ID = "#html2";

$w.onReady(async function () {
    const traceId = makeTraceId("lightbox-conf");
    const widget = $w(WIDGET_ID);

    if (!widget || typeof widget.postMessage !== "function") {
        console.error("[ConfirmacionReserva] Widget #html2 not found or incompatible.");
        return;
    }

    // HALLAZGO 003: Authoritative context resolution (Zero query-string fallback)
    const context = wixWindowFrontend.getLightboxContext();

    createWidgetBridge(widget, {
        slug: "confirmacion-reserva",
        traceId,
        requiresServiceId: false,
        onContextReady: async () => {
            if (!context || typeof context !== "object") {
                return {
                    status: "FALLBACK",
                    traceId,
                    servicio: "Reserva Confirmada",
                    tituloServicio: "Reserva Confirmada",
                    fecha: "",
                    hora: "",
                    horaF2: "",
                    isCombined: false,
                    estilista: "Profesional segun horario",
                    extras: "Ninguno",
                    total: 0,
                    moneda: MONEY.DISPLAY_CURRENCY,
                    bookingIdF1: "",
                    bookingIdF2: "",
                };
            }

            return {
                status: "SUCCESS",
                traceId: _safeTrim(context.traceId || traceId),
                bookingIdF1: _safeTrim(context.bookingIdF1 || ""),
                bookingIdF2: _safeTrim(context.bookingIdF2 || ""),
                isCombined: Boolean(context.isCombined),
                servicio: _safeTrim(context.servicio || context.tituloServicio || "Servicio Marian Madrid"),
                tituloServicio: _safeTrim(context.tituloServicio || context.servicio || "Servicio Marian Madrid"),
                fecha: _safeTrim(context.fecha || ""),
                hora: _safeTrim(context.hora || ""),
                horaF2: _safeTrim(context.horaF2 || ""),
                estilista: _safeTrim(context.estilista || "Profesional segun horario"),
                resourceFilterId: _safeTrim(context.resourceFilterId || ""),
                extras: _safeTrim(context.extras || "Ninguno"),
                duracion: Number(context.duracion || context.duracionTotal || 0),
                total: _roundMoney(context.total || 0),
                moneda: _safeTrim(context.moneda || MONEY.DISPLAY_CURRENCY),
            };
        },
        onWidgetMessage: async (message, post) => {
            const type = String(message?.type || "").trim().toUpperCase();
            const payload = message?.payload || {};

            if (type === String(MESSAGE_TYPES.NAV).toUpperCase()) {
                const target = String(payload?.target || "").trim().toUpperCase();
                if (target === "SERVICIOS" || target === "BACK") {
                    wixWindowFrontend.lightbox.close();
                    wixLocation.to(URLS.SERVICIOS || "/reserva-online");
                    return;
                }
                if (target === "CLOSE") {
                    wixWindowFrontend.lightbox.close();
                    return;
                }
            }

            if (type === "PRINT") {
                if (typeof wixWindowFrontend.print === "function") {
                    wixWindowFrontend.print();
                }
            }
        },
        onError: (err) => {
            console.error("[ConfirmacionReserva] Error in bridge:", err?.message || String(err));
        },
    });
});
