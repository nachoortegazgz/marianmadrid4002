import { webMethod, Permissions } from "wix-web-module";
import { getSecret } from "wix-secrets-backend";
import { SECRETS } from "backend/mmSecrets";
import { makeTraceId, _safeTrim } from "public/mmUtils";
import { requireMarianManager } from "backend/security";
import { _toPublicError } from "backend/responseUtils";
import { logger } from "backend/booking/bookingCore";
const log = logger;
const SYSTEM_PROMPT = "Eres el asistente personal de Marian, propietaria de Marian Madrid Peluqueria y Estetica en Zaragoza. Ayudas con: caja, inventario, agenda, fiscalidad de apoyo, y gestion operativa. NUNCA ejecutas operaciones economicas directamente. Solo orientas y preparas informacion. Respondes en espanol, de forma clara y concisa. No das consejo fiscal, laboral ni legal definitivo; recomiendas consultar con la gestoria.";
export const askMarianAssistant = webMethod(Permissions.SiteMember, async (payload = {}) => {
    const traceId = payload.traceId || makeTraceId("assistant");
    try {
        await requireMarianManager(traceId);
        const message = _safeTrim(payload.message);
        const history = Array.isArray(payload.history) ? payload.history.slice(-8) : [];
        if (!message) throw new Error("Message required");
        const apiKey = await getSecret(SECRETS.MARIAN_ASSISTANT_OPENAI_KEY).catch(() => null);
        if (!apiKey) {
            return {
                status: "SUCCESS",
                data: {
                    message: "El asistente IA no esta configurado todavia. Contacta con el administrador para activarlo.",
                    actions: [],
                },
                error: null,
            };
        }
        const messages = [
            { role: "system", content: SYSTEM_PROMPT },
            ...history.map((h) => ({ role: h.role || "user", content: _safeTrim(h.content) })),
            { role: "user", content: message },
        ];
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages,
                max_tokens: 500,
                temperature: 0.4,
            }),
        });
        if (!response.ok) {
            log.error("OpenAI API error", { status: response.status, traceId });
            return {
                status: "SUCCESS",
                data: { message: "No se pudo conectar con el asistente IA. Intentalo mas tarde.", actions: [] },
                error: null,
            };
        }
        const data = await response.json();
        const assistantMessage = data?.choices?.[0]?.message?.content || "No se pudo generar una respuesta.";
        const actions = [];
        const lowerMsg = message.toLowerCase();
        if (lowerMsg.includes("caja")) actions.push("REFRESH_CASHIER");
        if (lowerMsg.includes("inventario")) actions.push("REFRESH_INVENTORY");
        if (lowerMsg.includes("fiscal") || lowerMsg.includes("iva")) actions.push("OPEN_FISCAL");
        return {
            status: "SUCCESS",
            data: { message: assistantMessage, actions },
            error: null,
        };
    } catch (err) {
        return { status: "ERROR", data: null, error: _toPublicError(err, "ASSISTANT_FAIL") };
    }
});
