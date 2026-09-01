/*
=============================================================================
MODULE: backend/securityEngine.js
VERSION: marianmadrid4004 (v21.1.2-LTS-remediated-jti-anti-replay)
RESPONSIBILITY: Cryptographic engine: HMAC-SHA256, timing-safe comparison,
            SHA-256 hashing, hash chains, and JWT HS256 tokens with JTI replay prevention.
STANDARDS: G10 ASCII Strict (0 non-ASCII characters).
=============================================================================
*/

import { createHmac, createHash, timingSafeEqual as cryptoTimingSafeEqual } from "crypto";
import { getSecret } from "wix-secrets-backend";
import wixData from "wix-data";
import { SECRETS } from "backend/mmSecrets";
import { JWT, COLLECTIONS } from "backend/internalConfig";

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
    const jti = `jti_${traceId}_${now}_${createHash("sha256").update(`${traceId}:${now}:${Math.random()}`).digest("hex").slice(0, 12)}`;
    const body = {
        ...payload,
        iss: "marianmadrid.es",
        aud: "marianmadrid-staff",
        iat: Math.floor(now / 1000),
        exp: Math.floor(expiresAt / 1000),
        jti,
    };
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedBody = base64UrlEncode(JSON.stringify(body));
    const signature = signJWT(secretKey, `${encodedHeader}.${encodedBody}`);
    return `${encodedHeader}.${encodedBody}.${signature}`;
}

export async function verificarToken(token, traceId, options = {}) {
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
        if (body.iss && body.iss !== "marianmadrid.es") {
            return { valid: false, error: "TOKEN_ISSUER_INVALID" };
        }
        if (body.aud && body.aud !== "marianmadrid-staff") {
            return { valid: false, error: "TOKEN_AUDIENCE_INVALID" };
        }

        if (options.singleUse === true && body.jti) {
            const jtiLockId = `lk_jwt_${createHash("sha256").update(body.jti).digest("hex")}`;
            const remainingTtlMs = Math.max(1000, ((body.exp || (nowSec + 1800)) - nowSec + 30) * 1000);
            try {
                await wixData.insert(
                    COLLECTIONS.LOCKS,
                    {
                        _id: jtiLockId,
                        slotKey: body.jti,
                        traceId: String(traceId || "jwt_verifier"),
                        expiresAt: new Date(Date.now() + remainingTtlMs),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    { suppressAuth: true }
                );
            } catch (lockErr) {
                const msg = String(lockErr?.message || "");
                if (msg.includes("WDE0123") || msg.includes("WD_ITEM_ALREADY_EXISTS") || msg.includes("Duplicated")) {
                    return { valid: false, error: "TOKEN_ALREADY_CONSUMED_OR_REPLAYED" };
                }
                return { valid: false, error: "TOKEN_JTI_VERIFICATION_FAILED" };
            }
        }

        return { valid: true, payload: body };
    } catch (_) {
        return { valid: false, error: "TOKEN_PAYLOAD_INVALID" };
    }
}