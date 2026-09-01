/*
=============================================================================
MODULE: backend/marianAssistant.web.js
VERSION: marianmadrid4002 (v21.1.0-LTS-remediated)
RESPONSIBILITY: Marian-only AI assistant with token bounding, context length
            limits, strict prompt validation, and timeout protection.
STANDARDS: G10 ASCII Strict (0 non-ASCII characters).
=============================================================================
*/

import { webMethod, Permissions } from "wix-web-module";
import { getSecret } from "wix-secrets-backend";
import { SECRETS } from "backend/mmSecrets";
import { makeTraceId, _safeTrim, withTimeout } from "public/mmUtils";
import { requireMarianManager } from "backend/security";
import { _toPublicError } from "backend/responseUtils";
import { logger } from "backend/booking/bookingCore";

const log = logger;
const SYSTEM_PROMPT = "Eres el asistente personal de Marian, propietaria de Marian Madrid Peluqueria y Estetica en Zaragoza. Ayudas con: caja, inventario, agenda, fiscalidad de apoyo, y gestion operativa. NUNCA ejecutas operaciones economicas directamente. Solo orientas y preparas informacion. Respondes en espanol, de forma clara y concisa. No das consejo fiscal, laboral ni legal definitivo; recomiendas consultar con la gestoria.";