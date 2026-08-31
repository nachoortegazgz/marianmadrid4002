/*
=============================================================================
MODULE: backend/inventario.web.js
VERSION: marianmadrid4001 (v21.0.0-LTS-canonical-inventory-mutex-locked)
RESPONSIBILITY: Internal inventory management, salon professional consumption,
            supplier receipt, Stores/POS reconciliation queue, and dashboard.
            Operates on stockDisponible and alertaStockBajo with distributed mutex locking.
STANDARDS: G10 ASCII Strict (0 non-ASCII characters).
=============================================================================
*/

import { webMethod, Permissions } from "wix-web-module";
import wixData from "wix-data";
import { currentMember } from "wix-members-backend";
import {
    makeTraceId,
    _safeTrim,
    _normalizeIdPart,
    withTimeout,
    _executeWithRetry,
} from "public/mmUtils";
import {
    COLLECTIONS,
    SDK_CONFIG,
    APP_IDS,
} from "backend/internalConfig";
import {
    BookingError,
    ERROR_CODES,
    logger,
    _lockSlotKeyOrFail,
    _unlockSlotKey,
} from "backend/booking/bookingCore";
import { requireCajero, isStaffCollaborator } from "backend/security";
import { _toPublicError } from "backend/responseUtils";

const log = logger;
const PRODUCTOS_COL = COLLECTIONS.INVENTARIO_PRODUCTO;
const MOVIMIENTO_COL = COLLECTIONS.MOVIMIENTO_INVENTARIO;
const CONCILIACION_COL = COLLECTIONS.CONCILIACION_STOCK_WIX;
const CMS_TIMEOUT_MS = Number(SDK_CONFIG?.TIMEOUTS?.CMS_MS) || 15000;
const INVENTORY_MUTEX_TTL_MS = 30000;

function _toInvError(err, fallbackCode = "INVENTORY_ERROR", fallbackMessage = "Error de inventario") {
    return _toPublicError(err, fallbackCode, fallbackMessage);
}

export const getInventoryDashboard = webMethod(Permissions.SiteMember, async () => {
    const traceId = makeTraceId("inv-dash");
    try {
        const isCollab = await isStaffCollaborator(traceId);
        if (!isCollab) throw new BookingError(ERROR_CODES.ACCESS_DENIED, "Requiere permisos de personal.", { traceId });

        const [productsRes, queueRes] = await Promise.all([
            withTimeout(
                wixData.query(PRODUCTOS_COL).eq("activo", true).limit(100).find({ suppressAuth: true, consistentRead: true }),
                CMS_TIMEOUT_MS,
                "queryInventarioProductos"
            ),
            withTimeout(
                wixData.query(CONCILIACION_COL).eq("status", "PENDING").limit(100).find({ suppressAuth: true, consistentRead: true }),
                CMS_TIMEOUT_MS,
                "queryConciliacionStockWix"
            ),
        ]);

        const items = productsRes?.items || [];
        const pendingQueue = queueRes?.items || [];

        const lowStock = items.filter((p) => {
            const stock = Number(p.stockDisponible ?? p.stockExpected ?? 0);
            const low = Number(p.alertaStockBajo ?? p.lowStockAlert ?? 0);
            return low > 0 && stock <= low;
        }).map((p) => ({
            sku: p.sku,
            productName: p.nombreProducto || p.productName || p.sku,
            stockExpected: Number(p.stockDisponible ?? p.stockExpected ?? 0),
            lowStockAlert: Number(p.alertaStockBajo ?? p.lowStockAlert ?? 0),
        }));

        return {
            status: "SUCCESS",
            data: {
                totalProducts: items.length,
                lowStockCount: lowStock.length,
                pendingReconciliationCount: pendingQueue.length,
                products: items,
                lowStock,
                pendingQueue,
            },
            error: null,
        };
    } catch (error) {
        return { status: "ERROR", data: null, error: _toInvError(error, "INVENTORY_DASH_FAIL") };
    }
});

export const registerInternalInventoryUse = webMethod(Permissions.SiteMember, async (payload = {}) => {
    const traceId = makeTraceId("inv-use");
    try {
        const isCollab = await isStaffCollaborator(traceId);
        if (!isCollab) throw new BookingError(ERROR_CODES.ACCESS_DENIED, "Requiere permisos de personal.", { traceId });

        const member = await currentMember.getMember({ fieldsets: ["FULL"] }).catch(() => null);
        const lines = Array.isArray(payload.lines) ? payload.lines : [];
        if (!lines.length) throw new BookingError(ERROR_CODES.INVALID_PAYLOAD, "No inventory lines provided", { traceId });

        const results = [];
        const now = new Date();

        for (const line of lines) {
            const sku = _safeTrim(line.sku);
            const quantity = Math.abs(Number(line.quantity) || 0);
            if (!sku || quantity <= 0) continue;

            const lockKey = `inv_sku_${_normalizeIdPart(sku, 60)}`;
            const lockOwnerId = `${traceId}:${_normalizeIdPart(sku, 60)}`;

            const lockResult = await _lockSlotKeyOrFail(lockKey, lockOwnerId, INVENTORY_MUTEX_TTL_MS);
            if (!lockResult?.ok) {
                throw new BookingError(
                    ERROR_CODES.TOKEN_BUSY,
                    `El inventario para el SKU ${sku} esta bloqueado por otra operacion en curso. Reintente en unos segundos.`,
                    { traceId, sku }
                );
            }

            try {
                const updateResult = await _executeWithRetry(async () => {
                    const productRes = await withTimeout(
                        wixData.query(PRODUCTOS_COL)
                            .eq("sku", sku)
                            .limit(1)
                            .find({ suppressAuth: true, consistentRead: true }),
                        CMS_TIMEOUT_MS,
                        "queryProductBySkuConsistent"
                    );
                    const product = productRes?.items?.[0];
                    if (!product) return null;

                    const currentStock = Number(product.stockDisponible ?? product.stockExpected ?? 0);
                    const newStock = Math.max(0, currentStock - quantity);
                    const movementToken = `USE_${sku}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

                    const mov = {
                        _id: movementToken,
                        movementToken,
                        sku,
                        nombreProducto: product.nombreProducto || product.productName || sku,
                        quantity: -quantity,
                        quantityDelta: -quantity,
                        stockBefore: currentStock,
                        stockAfter: newStock,
                        stockDisponible: newStock,
                        stockExpected: newStock,
                        movementType: "CONSUMO_PROFESIONAL",
                        reason: _safeTrim(line.note || line.reason) || "Consumo en salon",
                        referenceId: _safeTrim(line.referenceId) || null,
                        actorEmail: member?.loginEmail || "system",
                        actorMemberId: member?._id || "system",
                        requiresWixReconciliation: true,
                        nativeCommercialMovement: false,
                        productId: product.productId || product.wixProductId || null,
                        variantId: product.variantId || product.wixVariantId || null,
                        traceId,
                        createdAt: now,
                    };

                    await withTimeout(wixData.insert(MOVIMIENTO_COL, mov, { suppressAuth: true }), CMS_TIMEOUT_MS, "insertMovInv");

                    const { _createdDate, _updatedDate, _owner, ...safeProduct } = product;
                    await withTimeout(
                        wixData.update(PRODUCTOS_COL, {
                            ...safeProduct,
                            stockDisponible: newStock,
                            stockExpected: newStock,
                            fechaUltimoMovimientoInventario: now,
                            idUltimoMovimientoInventario: movementToken,
                            lastInventoryMovementId: movementToken,
                            lastInventoryMovementAt: now,
                            updatedAt: now,
                        }, { suppressAuth: true }),
                        CMS_TIMEOUT_MS,
                        "updateStockExpected"
                    );

                    const queueItem = {
                        _id: `RECON_${movementToken}`,
                        movementToken,
                        movementId: movementToken,
                        sku,
                        nombreProducto: product.nombreProducto || product.productName || sku,
                        quantityDelta: -quantity,
                        status: "PENDING",
                        productId: product.productId || product.wixProductId || null,
                        variantId: product.variantId || product.wixVariantId || null,
                        reason: _safeTrim(line.note || line.reason) || "Consumo en salon",
                        source: "ONLY_STAFF_USE",
                        referenceId: _safeTrim(line.referenceId) || null,
                        traceId,
                        createdAt: now,
                        updatedAt: now,
                    };

                    await withTimeout(wixData.insert(CONCILIACION_COL, queueItem, { suppressAuth: true }), CMS_TIMEOUT_MS, "insertConciliacion");
                    return { sku, quantityDelta: -quantity, newStockDisponible: newStock };
                }, 3, 300);

                if (updateResult) results.push(updateResult);
            } finally {
                await _unlockSlotKey(lockKey, lockOwnerId).catch((unlockErr) => {
                    log.warn("Inventory use lock release failed", { traceId, sku, error: unlockErr?.message });
                });
            }
        }

        return { status: "SUCCESS", data: { results }, error: null };
    } catch (error) {
        return { status: "ERROR", data: null, error: _toInvError(error, "INVENTORY_USE_FAIL") };
    }
});

export const registerInventoryReceipt = webMethod(Permissions.SiteMember, async (payload = {}) => {
    const traceId = makeTraceId("inv-recv");
    try {
        await requireCajero(traceId);
        const member = await currentMember.getMember({ fieldsets: ["FULL"] }).catch(() => null);
        const lines = Array.isArray(payload.lines) ? payload.lines : [];
        if (!lines.length) throw new BookingError(ERROR_CODES.INVALID_PAYLOAD, "No inventory lines provided", { traceId });

        const results = [];
        const now = new Date();

        for (const line of lines) {
            const sku = _safeTrim(line.sku);
            const quantity = Math.abs(Number(line.quantity) || 0);
            if (!sku || quantity <= 0) continue;

            const lockKey = `inv_sku_${_normalizeIdPart(sku, 60)}`;
            const lockOwnerId = `${traceId}:${_normalizeIdPart(sku, 60)}`;

            const lockResult = await _lockSlotKeyOrFail(lockKey, lockOwnerId, INVENTORY_MUTEX_TTL_MS);
            if (!lockResult?.ok) {
                throw new BookingError(
                    ERROR_CODES.TOKEN_BUSY,
                    `El inventario para el SKU ${sku} esta bloqueado por otra operacion en curso. Reintente en unos segundos.`,
                    { traceId, sku }
                );
            }

            try {
                const updateResult = await _executeWithRetry(async () => {
                    const productRes = await withTimeout(
                        wixData.query(PRODUCTOS_COL)
                            .eq("sku", sku)
                            .limit(1)
                            .find({ suppressAuth: true, consistentRead: true }),
                        CMS_TIMEOUT_MS,
                        "queryProductBySkuRecvConsistent"
                    );
                    const product = productRes?.items?.[0];
                    if (!product) return null;

                    const currentStock = Number(product.stockDisponible ?? product.stockExpected ?? 0);
                    const newStock = currentStock + quantity;
                    const movementToken = `RECV_${sku}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

                    const mov = {
                        _id: movementToken,
                        movementToken,
                        sku,
                        nombreProducto: product.nombreProducto || product.productName || sku,
                        quantity,
                        quantityDelta: quantity,
                        stockBefore: currentStock,
                        stockAfter: newStock,
                        stockDisponible: newStock,
                        stockExpected: newStock,
                        movementType: "RECEPCION_PROVEEDOR",
                        reason: _safeTrim(line.note || line.reason) || "Recepcion de mercancia",
                        referenceId: _safeTrim(line.referenceId) || null,
                        actorEmail: member?.loginEmail || "system",
                        actorMemberId: member?._id || "system",
                        requiresWixReconciliation: true,
                        nativeCommercialMovement: false,
                        productId: product.productId || product.wixProductId || null,
                        variantId: product.variantId || product.wixVariantId || null,
                        traceId,
                        createdAt: now,
                    };

                    await withTimeout(wixData.insert(MOVIMIENTO_COL, mov, { suppressAuth: true }), CMS_TIMEOUT_MS, "insertMovInvRecv");

                    const { _createdDate, _updatedDate, _owner, ...safeProduct } = product;
                    await withTimeout(
                        wixData.update(PRODUCTOS_COL, {
                            ...safeProduct,
                            stockDisponible: newStock,
                            stockExpected: newStock,
                            fechaUltimoMovimientoInventario: now,
                            idUltimoMovimientoInventario: movementToken,
                            lastInventoryMovementId: movementToken,
                            lastInventoryMovementAt: now,
                            updatedAt: now,
                        }, { suppressAuth: true }),
                        CMS_TIMEOUT_MS,
                        "updateStockExpectedRecv"
                    );

                    const queueItem = {
                        _id: `RECON_${movementToken}`,
                        movementToken,
                        movementId: movementToken,
                        sku,
                        nombreProducto: product.nombreProducto || product.productName || sku,
                        quantityDelta: quantity,
                        status: "PENDING",
                        productId: product.productId || product.wixProductId || null,
                        variantId: product.variantId || product.wixVariantId || null,
                        reason: _safeTrim(line.note || line.reason) || "Recepcion de mercancia",
                        source: "SUPPLIER_RECEIPT",
                        referenceId: _safeTrim(line.referenceId) || null,
                        traceId,
                        createdAt: now,
                        updatedAt: now,
                    };

                    await withTimeout(wixData.insert(CONCILIACION_COL, queueItem, { suppressAuth: true }), CMS_TIMEOUT_MS, "insertConciliacionRecv");
                    return { sku, quantityDelta: quantity, newStockDisponible: newStock };
                }, 3, 300);

                if (updateResult) results.push(updateResult);
            } finally {
                await _unlockSlotKey(lockKey, lockOwnerId).catch((unlockErr) => {
                    log.warn("Inventory receipt lock release failed", { traceId, sku, error: unlockErr?.message });
                });
            }
        }

        return { status: "SUCCESS", data: { results }, error: null };
    } catch (error) {
        return { status: "ERROR", data: null, error: _toInvError(error, "INVENTORY_RECEIPT_FAIL") };
    }
});

export const getInventoryReconciliationQueue = webMethod(Permissions.SiteMember, async () => {
    const traceId = makeTraceId("inv-queue");
    try {
        await requireCajero(traceId);
        const res = await withTimeout(
            wixData.query(CONCILIACION_COL).eq("status", "PENDING").ascending("createdAt").limit(100).find({ suppressAuth: true, consistentRead: true }),
            CMS_TIMEOUT_MS,
            "getReconciliationQueue"
        );
        return { status: "SUCCESS", data: { items: res?.items || [] }, error: null };
    } catch (error) {
        return { status: "ERROR", data: null, error: _toInvError(error, "INVENTORY_QUEUE_FAIL") };
    }
});

export const markInventoryReconciliationApplied = webMethod(Permissions.SiteMember, async (reconciliationId, note) => {
    const traceId = makeTraceId("inv-apply");
    try {
        await requireCajero(traceId);
        const cleanId = _safeTrim(reconciliationId);
        if (!cleanId) throw new BookingError(ERROR_CODES.INVALID_PAYLOAD, "reconciliationId required", { traceId });

        const item = await withTimeout(wixData.get(CONCILIACION_COL, cleanId, { suppressAuth: true, consistentRead: true }), CMS_TIMEOUT_MS, "getReconciliationItem");
        if (!item) throw new BookingError(ERROR_CODES.INVALID_PAYLOAD, "Reconciliation item not found", { traceId });

        const { _createdDate, _updatedDate, _owner, ...safeItem } = item;
        const updated = await withTimeout(
            wixData.update(CONCILIACION_COL, {
                ...safeItem,
                status: "APPLIED",
                appliedAt: new Date(),
                appliedByNote: _safeTrim(note) || "Reconciliation applied in Wix",
                updatedAt: new Date(),
            }, { suppressAuth: true }),
            CMS_TIMEOUT_MS,
            "updateReconciliationApplied"
        );

        return { status: "SUCCESS", data: updated, error: null };
    } catch (error) {
        return { status: "ERROR", data: null, error: _toInvError(error, "INVENTORY_APPLY_FAIL") };
    }
});

function _restockedQuantityByOrderLine(order, restockInfo) {
    const restockType = String(restockInfo?.type || "").toUpperCase();
    const orderLines = Array.isArray(order?.lineItems) ? order.lineItems : [];
    if (restockType === "ALL_ITEMS") {
        return orderLines.map((item, index) => ({ item, quantity: Number(item?.quantity) || 0, lineKey: String(item?._id || item?.id || item?.lineItemId || index) }));
    }
    if (restockType !== "SOME_ITEMS") return [];

    const quantities = new Map(
        (Array.isArray(restockInfo?.items) ? restockInfo.items : [])
            .map((item) => [String(item?.lineItemId || "").trim(), Number(item?.quantity) || 0])
            .filter(([lineItemId, quantity]) => lineItemId && quantity > 0)
    );
    return orderLines.map((item, index) => {
        const lineKey = String(item?._id || item?.id || item?.lineItemId || index);
        return { item, quantity: quantities.get(lineKey) || 0, lineKey };
    }).filter((entry) => entry.quantity > 0);
}

export async function recordOnlineInventoryRefundInternal(order, refund, restockInfo, traceId) {
    const orderId = order?._id || order?.id || "unknown";
    const refundId = _safeTrim(refund?._id || refund?.id || refund?.refundId);
    if (orderId === "unknown" || !refundId) return { status: "SKIPPED", reason: "MISSING_ORDER_OR_REFUND_ID" };

    const restocked = _restockedQuantityByOrderLine(order, restockInfo);
    if (!restocked.length) return { status: "SKIPPED", reason: "NO_CONFIRMED_RESTOCK" };

    const now = new Date();
    const results = [];
    for (const entry of restocked) {
        const sku = _safeTrim(entry.item?.sku);
        const quantity = Number(entry.quantity) || 0;
        if (!sku || quantity <= 0) continue;

        const movementToken = `ECOMM_REFUND_${orderId}_${refundId}_${entry.lineKey}_${sku}`;
        const existing = await wixData.get(MOVIMIENTO_COL, movementToken, { suppressAuth: true, consistentRead: true }).catch(() => null);
        if (existing) {
            results.push({ sku, quantity, idempotent: true });
            continue;
        }

        const movement = {
            _id: movementToken,
            movementToken,
            sku,
            nombreProducto: entry.item?.name || sku,
            quantity,
            quantityDelta: quantity,
            movementType: "DEVOLUCION_ONLINE_REABASTECIDA",
            reason: `Wix order refund restocked ${orderId}`,
            referenceId: refundId,
            orderId,
            refundId,
            requiresWixReconciliation: false,
            nativeCommercialMovement: true,
            productId: entry.item?.productId || null,
            variantId: entry.item?.variantId || null,
            traceId,
            createdAt: now,
        };
        await wixData.insert(MOVIMIENTO_COL, movement, { suppressAuth: true });
        results.push({ sku, quantity, idempotent: false });
    }
    return { status: "SUCCESS", data: { results, restockType: String(restockInfo?.type || "").toUpperCase() } };
}

export async function recordOnlineInventoryOrderInternal(order, traceId) {
    const orderId = order?._id || order?.id || "unknown";
    const lineItems = Array.isArray(order?.lineItems) ? order.lineItems : [];
    const now = new Date();

    for (const item of lineItems) {
        const sku = _safeTrim(item?.sku);
        const qty = Number(item?.quantity) || 1;
        if (!sku) continue;

        const movementToken = `ECOMM_${orderId}_${sku}`;
        const existing = await wixData.get(MOVIMIENTO_COL, movementToken, { suppressAuth: true, consistentRead: true }).catch(() => null);
        if (existing) continue;

        const mov = {
            _id: movementToken,
            movementToken,
            sku,
            nombreProducto: item?.name || sku,
            quantity: -qty,
            quantityDelta: -qty,
            movementType: "VENTA_ONLINE",
            reason: `Wix Stores Order ${orderId}`,
            referenceId: orderId,
            orderId,
            requiresWixReconciliation: false,
            nativeCommercialMovement: true,
            productId: item?.productId || null,
            traceId,
            createdAt: now,
        };

        await wixData.insert(MOVIMIENTO_COL, mov, { suppressAuth: true }).catch(() => null);
    }
}
