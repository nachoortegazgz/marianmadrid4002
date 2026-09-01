/*
=============================================================================
MODULE: backend/crons.js
VERSION: marianmadrid4004 (v21.1.2-LTS-remediated-joblocks-safepurge)
RESPONSIBILITY: Scheduled background jobs with distributed execution mutex locks,
            safe multi-page purging with failed item accounting, RAM cache eviction,
            automated Z-Closing, and health monitoring.
STANDARDS: G10 ASCII Strict (0 non-ASCII characters).
=============================================================================
*/

import wixData from "wix-data";
import { getSecret } from "wix-secrets-backend";
import { elevate } from "wix-auth";
import { extendedBookings } from "@wix/bookings";
import {
    makeTraceId,
    withTimeout,
    _addDaysYMD,
    _normalizeIdPart,
} from "public/mmUtils";
import {
    COLLECTIONS,
    CONCURRENCY,
    SDK_CONFIG,
} from "backend/internalConfig";
import {
    _lockSlotKeyOrFail,
    _unlockSlotKey,
    cancelBookingElevated,
    logger,
} from "backend/booking/bookingCore";
import { _cleanExpiredDualSlotsInternal, purgeExpiredRamCaches } from "backend/reservas.web";
import { _verifyIntegrityInternal, _registerZClosingInternal, processPendingFiscalRecoveries } from "backend/cajas.web";
import { SECRETS } from "backend/mmSecrets";
import { processBookingsServiceSyncQueue } from "backend/bookingsServiceSync";
import { prepareScheduledManagerPackages } from "backend/fiscalDocuments.web";

const log = logger;
const JOB_TIMEOUT_MS = SDK_CONFIG.JOBS.TIMEOUT_MS;
const AUDIT_RETENTION_DAYS = SDK_CONFIG.JOBS.AUDIT_RETENTION_DAYS;
const DELETE_BATCH_SIZE = SDK_CONFIG.JOBS.DELETE_BATCH_SIZE;
const DELETE_MAX_PAGES = SDK_CONFIG.JOBS.DELETE_MAX_PAGES;
const DUAL_CACHE_CLEANUP_LIMIT = SDK_CONFIG.JOBS.DUAL_CACHE_CLEANUP_LIMIT;
const FISCAL_RECOVERY_BATCH_SIZE = SDK_CONFIG.JOBS.FISCAL_RECOVERY_BATCH_SIZE;
const COMPENSATION_BATCH_SIZE = Math.max(1, Math.min(FISCAL_RECOVERY_BATCH_SIZE, 100));
const MAX_COMPENSATION_RETRIES = Number(CONCURRENCY.MAX_COMPENSATION_RETRIES) || 3;
const COMPENSATION_LOCK_TTL_MS = Number(CONCURRENCY.MUTEX_TTL_MS) || 120000;
const COMPLETED_COMPENSATION_RETENTION_DAYS = 30;
const CRON_JOB_MUTEX_TTL_MS = 60000;
const queryExtendedBookingsElevated = elevate(extendedBookings.queryExtendedBookings);

async function _withJobMutex(jobName, traceId, ttlMs, executeFn) {
    const safeJobName = _normalizeIdPart(jobName, 40);
    const lockKey = `cron_job_${safeJobName}`;
    const lockOwner = `${traceId}:${safeJobName}`;
    const lock = await _lockSlotKeyOrFail(lockKey, lockOwner, ttlMs || CRON_JOB_MUTEX_TTL_MS);
    if (!lock?.ok) {
        log.warn(`[CRON] Job ${safeJobName} skipped: already running on another instance`, { traceId });
        return { status: "SKIPPED", data: { reason: "CONCURRENT_JOB_RUNNING" }, error: null };
    }
    try {
        return await executeFn();
    } finally {
        await _unlockSlotKey(lockKey, lockOwner).catch(() => {});
    }
}

async function _removeByQuery(collectionName, queryBuilder, traceId, label) {
    let totalRemoved = 0;
    let totalFailed = 0;
    const failedIds = [];
    let hasMore = true;
    let pageCount = 0;
    const maxPages = DELETE_MAX_PAGES;

    try {
        const orderedQuery = queryBuilder.ascending("_id");
        while (hasMore && pageCount < maxPages) {
            pageCount++;
            const res = await withTimeout(
                orderedQuery.limit(DELETE_BATCH_SIZE).find({ suppressAuth: true, consistentRead: true }),
                JOB_TIMEOUT_MS,
                `${label}-find`
            );
            const items = res?.items || [];
            if (!items.length) break;

            let iterationRemoved = 0;
            for (const item of items) {
                try {
                    await withTimeout(
                        wixData.remove(collectionName, item._id, { suppressAuth: true }),
                        JOB_TIMEOUT_MS,
                        `${label}-remove`
                    );
                    totalRemoved++;
                    iterationRemoved++;
                } catch (removeErr) {
                    totalFailed++;
                    if (failedIds.length < 50) failedIds.push(item._id);
                    log.warn(`[CRON] ${label} remove item failed: ${item._id}`, { error: removeErr?.message, traceId });
                }
            }

            if (iterationRemoved === 0) {
                log.error(`[CRON] ${label} loop guard abort: 0 items deleted in page ${pageCount}`, { pageCount, traceId, totalFailed });
                break;
            }

            hasMore = items.length === DELETE_BATCH_SIZE;
        }

        const remainingPossible = hasMore && pageCount >= maxPages;
        return {
            status: totalFailed > 0 ? "PARTIAL" : "SUCCESS",
            data: {
                count: totalRemoved,
                removed: totalRemoved,
                failed: totalFailed,
                failedIds,
                pages: pageCount,
                remainingPossible,
            },
            error: null,
        };
    } catch (error) {
        log.error(`[CRON] ${label} failed`, { error: error?.message || String(error), traceId });
        return { status: "ERROR", data: null, error: { code: "CRON_FAIL", message: error?.message || String(error) } };
    }
}

function _safeCompensationItem(item, patch) {
    const { _createdDate, _updatedDate, _owner, ...safeItem } = item || {};
    return { ...safeItem, ...patch };
}

async function _getBookingForCompensation(bookingId) {
    const result = await withTimeout(
        queryExtendedBookingsElevated({
            filter: { id: String(bookingId) },
            cursorPaging: { limit: 1 },
        }),
        JOB_TIMEOUT_MS,
        "cron-queryExtendedBooking"
    );
    const items = Array.isArray(result?.extendedBookings) ? result.extendedBookings : result?.items;
    return Array.isArray(items) ? items[0]?.booking || null : null;
}

async function _updateBookingCompensation(item, patch) {
    return withTimeout(
        wixData.update(
            COLLECTIONS.COMPENSATIONS,
            _safeCompensationItem(item, patch),
            { suppressAuth: true }
        ),
        JOB_TIMEOUT_MS,
        "cron-updateBookingCompensation"
    );
}

async function _processBookingCompensation(item, traceId) {
    const bookingId = String(item?.bookingId || "").trim();
    const attempts = Number(item?.attempts || 0) + 1;
    const now = new Date();
    const lockKey = `compensation:${String(item?._id || bookingId)}`;
    const lockOwnerId = `${traceId}:${String(item?._id || bookingId)}`;

    if (!bookingId) {
        await _updateBookingCompensation(item, {
            status: "FAILED",
            attempts,
            error: "COMPENSATION_BOOKING_ID_MISSING",
            fechaFallo: now,
            fechaProcesado: now,
        });
        return { completed: 0, failed: 1, skipped: 0 };
    }

    const lock = await _lockSlotKeyOrFail(lockKey, lockOwnerId, COMPENSATION_LOCK_TTL_MS);
    if (!lock?.ok) return { completed: 0, failed: 0, skipped: 1 };

    try {
        const booking = await _getBookingForCompensation(bookingId);
        if (!booking) throw new Error("COMPENSATION_BOOKING_NOT_FOUND");

        if (String(booking.status || "").toUpperCase() !== "CANCELED") {
            const revision = String(booking.revision || "").trim();
            if (!revision) throw new Error("COMPENSATION_BOOKING_REVISION_MISSING");
            await withTimeout(
                cancelBookingElevated(bookingId, {
                    revision,
                    flowControlSettings: { ignoreCancellationPolicy: true },
                }),
                JOB_TIMEOUT_MS,
                "cron-cancelCompensationBooking"
            );
        }

        await _updateBookingCompensation(item, {
            status: "COMPLETED",
            attempts,
            error: "",
            fechaProcesado: now,
        });
        return { completed: 1, failed: 0, skipped: 0 };
    } catch (error) {
        const terminal = attempts >= MAX_COMPENSATION_RETRIES;
        const message = String(error?.message || "COMPENSATION_CANCEL_FAILED");
        await _updateBookingCompensation(item, {
            status: terminal ? "FAILED" : "PENDING",
            attempts,
            error: message,
            ...(terminal ? { fechaFallo: now } : {}),
        });
        log.error("[CRON] Booking compensation attempt failed", {
            bookingId: _normalizeIdPart(bookingId, 20),
            traceId,
            attempts,
            terminal,
            message,
        });
        return { completed: 0, failed: terminal ? 1 : 0, skipped: terminal ? 0 : 1 };
    } finally {
        await _unlockSlotKey(lockKey, lockOwnerId).catch((error) => {
            log.error("[CRON] Booking compensation unlock failed", {
                bookingId: _normalizeIdPart(bookingId, 20),
                traceId,
                message: error?.message,
            });
        });
    }
}

export async function runPendingCompensationsJob() {
    const traceId = makeTraceId("cron-compensations");
    return await _withJobMutex("runPendingCompensationsJob", traceId, JOB_TIMEOUT_MS, async () => {
        try {
            const pending = await withTimeout(
                wixData.query(COLLECTIONS.COMPENSATIONS)
                    .eq("status", "PENDING")
                    .ascending("createdAt")
                    .limit(COMPENSATION_BATCH_SIZE)
                    .find({ suppressAuth: true, consistentRead: true }),
                JOB_TIMEOUT_MS,
                "cron-pendingCompensations"
            );

            const bookingResult = { completed: 0, failed: 0, skipped: 0 };
            const bookingItems = (pending?.items || []).filter((item) => !item?.kind && item?.bookingId);
            for (const item of bookingItems) {
                const result = await _processBookingCompensation(item, traceId);
                bookingResult.completed += result.completed;
                bookingResult.failed += result.failed;
                bookingResult.skipped += result.skipped;
            }

            const fiscalResult = await processPendingFiscalRecoveries({
                traceId,
                limit: FISCAL_RECOVERY_BATCH_SIZE,
            });

            return {
                status: fiscalResult?.status === "SUCCESS" ? "SUCCESS" : "PARTIAL",
                data: {
                    scanned: pending?.items?.length || 0,
                    bookingCompensations: bookingResult,
                    fiscalRecoveries: fiscalResult?.data || null,
                },
                error: fiscalResult?.status === "SUCCESS" ? null : fiscalResult?.error || null,
            };
        } catch (error) {
            log.error("[CRON] Pending compensations job failed", {
                traceId,
                message: error?.message || String(error),
            });
            return {
                status: "ERROR",
                data: null,
                error: { code: "PENDING_COMPENSATIONS_CRON_FAIL", message: error?.message || String(error) },
            };
        }
    });
}

export async function cleanExpiredLocks() {
    const traceId = makeTraceId("cron-locks");
    try {
        const cleanupThreshold = new Date(Date.now() - Number(CONCURRENCY.LOCK_CLEANUP_GRACE_MS));
        return await _removeByQuery(
            COLLECTIONS.LOCKS,
            wixData.query(COLLECTIONS.LOCKS).lt("expiresAt", cleanupThreshold),
            traceId,
            "cron-cleanLocks"
        );
    } catch (error) {
        log.error("[CRON] Failed to clean expired locks", { error: error?.message || String(error), traceId });
        return { status: "ERROR", data: null, error: { code: "CRON_FAIL", message: error?.message || String(error) } };
    }
}

export async function cleanupExpiredDualCache() {
    const traceId = makeTraceId("cron-dual");
    try {
        return await _cleanExpiredDualSlotsInternal({ limit: DUAL_CACHE_CLEANUP_LIMIT, traceId });
    } catch (error) {
        log.error("[CRON] Failed to clean expired dual slots", { error: error?.message || String(error), traceId });
        return { status: "ERROR", data: null, error: { code: "CRON_FAIL", message: error?.message || String(error) } };
    }
}

export async function cleanExpiredDaysCache() {
    const traceId = makeTraceId("cron-dayscache");
    try {
        const nowObj = new Date();
        return await _removeByQuery(
            COLLECTIONS.DAYS_CACHE,
            wixData.query(COLLECTIONS.DAYS_CACHE).lt("expiresAt", nowObj),
            traceId,
            "cron-cleanDaysCache"
        );
    } catch (error) {
        log.error("[CRON] Failed to clean expired days cache", { error: error?.message || String(error), traceId });
        return { status: "ERROR", data: null, error: { code: "CRON_FAIL", message: error?.message || String(error) } };
    }
}

export async function cleanExpiredSlotsCache() {
    const traceId = makeTraceId("cron-slotscache");
    try {
        const nowObj = new Date();
        return await _removeByQuery(
            COLLECTIONS.SLOTS_CACHE,
            wixData.query(COLLECTIONS.SLOTS_CACHE).lt("expiresAt", nowObj),
            traceId,
            "cron-cleanSlotsCache"
        );
    } catch (error) {
        log.error("[CRON] Failed to clean expired slots cache", { error: error?.message || String(error), traceId });
        return { status: "ERROR", data: null, error: { code: "CRON_FAIL", message: error?.message || String(error) } };
    }
}

export async function cleanExpiredBookingTransactions() {
    const traceId = makeTraceId("cron-clean-transactions");
    try {
        const now = new Date();
        return await _removeByQuery(
            COLLECTIONS.TRANSACTIONS,
            wixData.query(COLLECTIONS.TRANSACTIONS).lt("expiresAt", now),
            traceId,
            "cron-cleanTransactions"
        );
    } catch (error) {
        log.error("[CRON] Failed to clean expired booking transactions", { error: error?.message || String(error), traceId });
        return { status: "ERROR", data: null, error: { code: "CRON_FAIL", message: error?.message || String(error) } };
    }
}

export async function cleanOldCompletedCompensations() {
    const traceId = makeTraceId("cron-clean-compensations");
    try {
        const cutoff = new Date(Date.now() - COMPLETED_COMPENSATION_RETENTION_DAYS * 24 * 60 * 60 * 1000);
        return await _removeByQuery(
            COLLECTIONS.COMPENSATIONS,
            wixData.query(COLLECTIONS.COMPENSATIONS).eq("status", "COMPLETED").lt("updatedAt", cutoff),
            traceId,
            "cron-cleanOldCompletedCompensations"
        );
    } catch (error) {
        log.error("[CRON] Failed to clean old completed compensations", { error: error?.message || String(error), traceId });
        return { status: "ERROR", data: null, error: { code: "CRON_FAIL", message: error?.message || String(error) } };
    }
}

export async function purgeRamCachesJob() {
    const traceId = makeTraceId("cron-ram-purge");
    try {
        purgeExpiredRamCaches();
        return { status: "SUCCESS", data: { purged: true }, error: null };
    } catch (error) {
        log.error("[CRON] RAM caches purge job failed", { traceId, error: error?.message || String(error) });
        return { status: "ERROR", data: null, error: { code: "CRON_RAM_PURGE_FAIL", message: error?.message || String(error) } };
    }
}

export async function processFiscalRecoveryQueue() {
    const traceId = makeTraceId("cron-fiscal-recovery");
    return await _withJobMutex("processFiscalRecoveryQueue", traceId, JOB_TIMEOUT_MS, async () => {
        try {
            return await processPendingFiscalRecoveries({ traceId, limit: FISCAL_RECOVERY_BATCH_SIZE });
        } catch (error) {
            log.error("[CRON] Fiscal recovery queue failed", { error: error?.message || String(error), traceId });
            return { status: "ERROR", data: null, error: { code: "FISCAL_RECOVERY_CRON_FAIL", message: error?.message || String(error) } };
        }
    });
}

export async function processBookingsServiceSyncJob() {
    const traceId = makeTraceId("cron-bookings-service-sync");
    return await _withJobMutex("processBookingsServiceSyncJob", traceId, JOB_TIMEOUT_MS, async () => {
        try {
            return await processBookingsServiceSyncQueue({ traceId });
        } catch (_) {
            log.error("[CRON] Bookings service sync job failed", { traceId, errorCode: "BOOKINGS_SERVICE_SYNC_JOB_FAILED" });
            return { status: "ERROR", data: null, error: { code: "BOOKINGS_SERVICE_SYNC_JOB_FAILED", message: "Bookings service synchronization failed." } };
        }
    });
}

export async function prepareManagerPackagesJob() {
    const traceId = makeTraceId("cron-manager-packages");
    return await _withJobMutex("prepareManagerPackagesJob", traceId, JOB_TIMEOUT_MS, async () => {
        try {
            return await withTimeout(
                prepareScheduledManagerPackages({ traceId }),
                JOB_TIMEOUT_MS,
                "cron-prepareManagerPackages"
            );
        } catch (error) {
            log.error("[CRON] Scheduled manager-package preparation failed", {
                traceId,
                message: error?.message || String(error),
            });
            return {
                status: "ERROR",
                data: null,
                error: { code: "MANAGER_PACKAGE_CRON_FAIL", message: "Document preparation failed." },
            };
        }
    });
}

export async function verifyNightlyZClosing() {
    const traceId = makeTraceId("cron-zclosing");
    return await _withJobMutex("verifyNightlyZClosing", traceId, JOB_TIMEOUT_MS, async () => {
        try {
            const tz = SDK_CONFIG?.TZ || "Europe/Madrid";
            const nowMadridYmd = new Date().toLocaleDateString("sv-SE", { timeZone: tz });
            const diaKey = _addDaysYMD(nowMadridYmd, -1);

            if (!diaKey) {
                throw new Error("No se pudo calcular la fecha previa para el cierre Z nocturno.");
            }

            const existing = await withTimeout(
                wixData.query(COLLECTIONS.HISTORICO_CIERRES_Z).eq("diaKey", diaKey).limit(1).find({ suppressAuth: true, consistentRead: true }),
                JOB_TIMEOUT_MS,
                "cron-checkZClosing"
            );

            if (existing.items?.length > 0) {
                return { status: "SUCCESS", data: { idempotent: true, diaKey }, error: null };
            }

            const integrity = await _verifyIntegrityInternal(diaKey, { traceId });
            if (!integrity || !integrity.integrityOk) {
                log.error("[CRON] Integrity violation, Z-Closing aborted", { diaKey, inconsistenciesCount: integrity?.inconsistencies?.length, traceId });
                return { status: "ERROR", data: null, error: { code: "INTEGRITY_VIOLATION", message: "Integrity violation" } };
            }

            return await _registerZClosingInternal(diaKey, { traceId, autoCron: true });
        } catch (error) {
            log.error("[CRON] Auto Z-Closing error", { error: error?.message || String(error), traceId });
            return { status: "ERROR", data: null, error: { code: "CRON_FAIL", message: error?.message || String(error) } };
        }
    });
}

export async function cleanAuditLogs() {
    const traceId = makeTraceId("cron-audit");
    try {
        const cutoff = new Date(Date.now() - AUDIT_RETENTION_DAYS * 24 * 60 * 60 * 1000);
        return await _removeByQuery(
            COLLECTIONS.AUDIT_LOG,
            wixData.query(COLLECTIONS.AUDIT_LOG).lt("fechaLog", cutoff),
            traceId,
            "cron-cleanAudit"
        );
    } catch (error) {
        log.error("[CRON] Failed to clean audit logs", { error: error?.message || String(error), traceId });
        return { status: "ERROR", data: null, error: { code: "CRON_FAIL", message: error?.message || String(error) } };
    }
}

export async function systemHealthCheck() {
    const traceId = makeTraceId("cron-health");
    let overallStatus = "OK";
    const details = {};

    try {
        const citaRes = await withTimeout(
            wixData.query(COLLECTIONS.CITAS).limit(1).find({ suppressAuth: true, consistentRead: true }),
            JOB_TIMEOUT_MS,
            "cron-healthCheck-citas"
        ).catch(() => null);
        details.citasAccessible = !!citaRes;
        if (!citaRes) overallStatus = "DEGRADED";

        const cajaRes = await withTimeout(
            wixData.get(COLLECTIONS.CAJA_ACTUAL, "CAJA_PRINCIPAL", { suppressAuth: true, consistentRead: true }),
            JOB_TIMEOUT_MS,
            "cron-healthCheck-caja"
        ).catch(() => null);
        details.cajaAccessible = !!cajaRes;
        if (!cajaRes) overallStatus = "DEGRADED";

        const fiscalKey = await getSecret(SECRETS.FISCAL_KEY).catch(() => null);
        details.fiscalKeyConfigured = Boolean(fiscalKey);
        if (!fiscalKey) overallStatus = "CRITICAL";

        const tz = SDK_CONFIG?.TZ || "Europe/Madrid";
        const todayMadrid = new Date().toLocaleDateString("sv-SE", { timeZone: tz });
        const yesterdayMadrid = _addDaysYMD(todayMadrid, -1);
        const zClosing = await withTimeout(
            wixData.query(COLLECTIONS.HISTORICO_CIERRES_Z)
                .eq("diaKey", yesterdayMadrid)
                .limit(1)
                .find({ suppressAuth: true, consistentRead: true }),
            JOB_TIMEOUT_MS,
            "cron-healthCheck-zclosing"
        ).catch(() => null);
        details.yesterdayZClosingExists = (zClosing?.items?.length || 0) > 0;

        const healthReport = {
            status: overallStatus,
            timestamp: new Date().toISOString(),
            timezone: tz,
            traceId,
            details,
        };

        if (overallStatus !== "OK") {
            log.warn("[CRON] System health check reported non-optimal state", healthReport);
        }

        return { status: "SUCCESS", data: healthReport, error: null };
    } catch (error) {
        log.error("[CRON] System health check failed execution", { traceId, error: error?.message || String(error) });
        return { status: "ERROR", data: null, error: { code: "HEALTH_CHECK_FAIL", message: error?.message || String(error) } };
    }
}