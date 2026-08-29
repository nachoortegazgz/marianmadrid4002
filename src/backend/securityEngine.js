import { createHmac, createHash, timingSafeEqual as cryptoTimingSafeEqual } from "crypto";
import { getSecret } from "wix-secrets-backend";
import { SECRETS } from "backend/mmSecrets";
import { JWT } from "backend/internalConfig";
export function hmacSha256Hex(secretKey, payload) {
    return createHmac("sha256", String(secretKey))
        .update(String(payload), "utf8")
        .digest("hex");
}
export function timingSafeEqual(a, b) {
    const strA = String(a || "");
    const strB = String(b || "");
    if (strA.length !== strB.length) {
        const dummy = Buffer.alloc(strA.length, 0);
        cryptoTimingSafeEqual(Buffer.from(strA, "utf8"), dummy);
        return false;
    }
    return cryptoTimingSafeEqual(Buffer.from(strA, "utf8"), Buffer.from(strB, "utf8"));
}
export function verifyHMAC(secretKey, payload, signature) {
    const expected = hmacSha256Hex(secretKey, payload);
    return timingSafeEqual(expected, signature);
}
export function hashSHA256(data) {
    return createHash("sha256").update(String(data), "utf8").digest("hex");
}
export function hashChain(previousHash, currentData) {
    return hashSHA256(`${String(previousHash)}|${String(currentData)}`);
}
function base64UrlEncode(str) {
    return Buffer.from(String(str), "utf8")
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}
function base64UrlDecode(str) {
    if (typeof str !== "string") return "";
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4;
    const padded = pad ? base64 + "=".repeat(4 - pad) : base64;
    try {
        return Buffer.from(padded, "base64").toString("utf8");
    } catch (_) {
        return "";
    }
}
function signJWT(secretKey, data) {
    return createHmac("sha256", secretKey)
        .update(String(data), "utf8")
        .digest("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}
export async function generarToken(payload, traceId) {
    const secretKey = await getSecret(SECRETS.AUTH_JWT_KEY).catch(() => null);
    if (!secretKey) throw new Error(`JWT_KEY_MISSING: ${traceId}`);
    const now = Date.now();
    const expiresAt = now + (JWT.EXPIRATION_MS || 1800000);
    const header = { alg: JWT.ALGORITHM, typ: "JWT" };
    const body = {
        ...payload,
        iat: Math.floor(now / 1000),
        exp: Math.floor(expiresAt / 1000),
        jti: `${traceId}-${now}`,
    };
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedBody = base64UrlEncode(JSON.stringify(body));
    const signature = signJWT(secretKey, `${encodedHeader}.${encodedBody}`);
    return `${encodedHeader}.${encodedBody}.${signature}`;
}
export async function verificarToken(token, _traceId) {
    if (!token || typeof token !== "string") return { valid: false, error: "TOKEN_MISSING" };
    const parts = token.split(".");
    if (parts.length !== 3) return { valid: false, error: "TOKEN_MALFORMED" };
    const secretKey = await getSecret(SECRETS.AUTH_JWT_KEY).catch(() => null);
    if (!secretKey) return { valid: false, error: "JWT_KEY_MISSING" };
    const expectedSignature = signJWT(secretKey, `${parts[0]}.${parts[1]}`);
    if (!timingSafeEqual(expectedSignature, parts[2])) {
        return { valid: false, error: "TOKEN_SIGNATURE_INVALID" };
    }
    try {
        const body = JSON.parse(base64UrlDecode(parts[1]));
        const nowSec = Math.floor(Date.now() / 1000);
        if (body.exp && body.exp < nowSec) {
            return { valid: false, error: "TOKEN_EXPIRED" };
        }
        return { valid: true, payload: body };
    } catch (_) {
        return { valid: false, error: "TOKEN_PAYLOAD_INVALID" };
    }
}
