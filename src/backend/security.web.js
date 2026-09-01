/*
=============================================================================
MODULE: backend/security.web.js
VERSION: marianmadrid4003 (v21.1.1-LTS-remediated-security-web)
RESPONSIBILITY: Web Module facade for security checks exposed to frontend.
STANDARDS: G10 ASCII Strict (0 non-ASCII characters).
=============================================================================
*/

import { webMethod, Permissions } from "wix-web-module";
import { isAdmin, isCajero, isMarianManager, isStaffCollaborator, requireAdmin, requireMarianManager } from "backend/security";
import { makeTraceId } from "public/mmUtils";
import { _toPublicError } from "backend/responseUtils";

export const checkStaffCollaboratorAccess = webMethod(Permissions.SiteMember, async (traceId) => {
    const activeTraceId = traceId || makeTraceId("security-check");
    try {
        const [staffOk, adminOk, cajeroOk, marianOk] = await Promise.all([
            isStaffCollaborator(activeTraceId),
            isAdmin(activeTraceId),
            isCajero(activeTraceId),
            isMarianManager(activeTraceId),
        ]);
        return {
            status: "SUCCESS",
            data: {
                isStaffCollaborator: staffOk,
                isAdmin: adminOk,
                isCajero: cajeroOk,
                isMarianManager: marianOk,
            },
            error: null,
        };
    } catch (err) {
        return { status: "ERROR", data: null, error: _toPublicError(err, "SECURITY_CHECK_FAIL") };
    }
});

export { requireAdmin, requireMarianManager };