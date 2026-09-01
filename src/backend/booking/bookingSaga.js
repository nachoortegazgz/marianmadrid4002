/*
 * =============================================================================
 * FILE: backend/booking/bookingSaga.js
 * VERSION: v18.9.2-fix-scope
 * RESPONSIBILITY: Transactional Saga Orchestrator Engine for simple and dual
 *                 booking transactions.
 * REFACTORED (FIX SCOPE LINTER):
 *  - FIX DEPLOYMENT LINTER: Declared 'let sagaSteps = []' at function top-level
 *    scope to eliminate 'no-undef' ESLint/Babel deployment errors in Velo.
 *  - Ajuste 1: Prioritized metaCita.primaryServiceId / unsafePayload.primaryServiceId
 *              over slotF1.serviceId in primaryServiceIdRaw resolution.
 *  - Ajuste 2: Conditional execution in CreateBookings step:
 *              if (isDual) { Promise.all([createF1(), createF2()]) } else { createF1() }.
 *  - Fix 1: _resolveStablePairToken uses phaseOneServiceId directly instead of slotF1.serviceId.
 *  - Fix 2: slotF1ForLocks / slotF2ForLocks no longer inject serviceId into slot object.
 *  - Fix 3: Phase objects store serviceId at phase level (p.serviceId).
 *  - Fix 4: _forceStaffInPristineSlot called with 3 arguments (slot, resourceId, durationMinutes).
 *  - Fix 5: createBookingElevated receives serviceId at top-level payload.
 *  - D3/D4: Imports internal functions (_resolvePrimaryServiceIdInternal,
 *           _getServiceBySlugOrIdInternal, _resolveStaffForSlotInternal) from backend/reservas.web.
 *  - Vector E: Acquires physical mutex locks (_lockSlotKeyOrFail) BEFORE
 *              transaction idempotency initialization (_initTransaction).
 *  - Vector A: Wrapped all NoSQL wixData calls in withTimeout.
 *  - G10 Strict: Pure ASCII compliance (0 non-ASCII characters).
 * STANDARDS: G10 ASCII Strict (0 non-ASCII characters).
 * =============================================================================
 */

import wixData from 'wix-data';
import {
  COLLECTIONS,
  APP_IDS,
  SDK_CONFIG,
  MONEY,
  STAFF,
  STAFF_DEFAULT_NAME,
  CONCURRENCY,
  makeTraceId,
  _safeTrim,
  _safeEmail,
  _safePhone,
  _looksLikeGuid,
  _normalizeLocalIsoStr,
  getUtcDateFromMadridLocal,
  getMadridLocalStringNoZ,
  _executeWithRetry,
  withTimeout,
  findStaff,
  _isValidEmail,
  _unwrapServiceId
} from 'public/mmUtils';
import {
  createBookingElevated,
  cancelBookingElevated,
  createCheckoutElevated,
  getCheckoutUrlElevated,
  confirmOrDeclineBookingElevated,
  _forceStaffInPristineSlot,
  _lockSlotKeyOrFail,
  _unlockSlotKey,
  _renewLock,
  _persistBooking,
  _normalizeAddons,
  _sumAddons,
  _handleError,
  createBookingError,
  logger,
  _getDualPairFromCache,
  _buildLockKeys,
  _initTransaction,
  _completeTransaction,
  _failTransaction
} from 'backend/booking/bookingCore';
import { hashSHA256 } from 'backend/securityEngine';

// D3/D4: INTERNAL FUNCTIONS IMPORTED (NOT WEB METHODS)
import {
  _getServiceBySlugOrIdInternal,
  _resolveStaffForSlotInternal,
  _resolvePrimaryServiceIdInternal,
  _invalidateCachesInternal
} from 'backend/reservas.web';

const log = logger;

const CITAS_COLLECTION = COLLECTIONS?.CITAS || 'CitasF2';
const COMPENSATIONS_COLLECTION = COLLECTIONS?.COMPENSATIONS || 'PendingCompensations';
const API_TIMEOUT_MS = SDK_CONFIG?.TIMEOUTS?.API_MS || 15000;

const HEARTBEAT_MS = CONCURRENCY?.HEARTBEAT_MS || 15000;
const LOCK_TTL_MS = Number(CONCURRENCY?.MUTEX_TTL_MS) || 120000;

/**
 * Resolves a stable pairToken.
 * FIX 1: Uses phaseOneServiceId directly instead of slotF1.serviceId.
 */
function _resolveStablePairToken({ metaCita, unsafePayload, email, phaseOneServiceId, slotF1, slotF2, resourceId }) {
  const fromMetaPair = _safeTrim(metaCita?.pairToken);
  const fromMetaUi = _safeTrim(metaCita?.uiPairToken);
  const fromPayload = _safeTrim(unsafePayload?.uiPairToken || unsafePayload?.pairToken);

  if (fromMetaPair || fromMetaUi || fromPayload) {
    return fromMetaPair || fromMetaUi || fromPayload;
  }

  const emailHash = hashSHA256(email || '').substring(0, 8);
  const f1Start = _safeTrim(slotF1?.localStartDate || slotF1?.startDate || '');
  const f2Start = slotF2 ? _safeTrim(slotF2.localStartDate || slotF2.startDate || '') : '';

  const srvId = _safeTrim(phaseOneServiceId || '');
  const resId = _safeTrim(resourceId || slotF1?.resourceId || '');

  const hashInput = f2Start ? `${srvId}_${resId}_${f1Start}_${f2Start}` : `${srvId}_${resId}_${f1Start}`;
  return `pt_${hashSHA256(hashInput).substring(0, 16)}_${emailHash}`;
}

function _extractCheckoutId(checkoutSession) {
  return (
    checkoutSession?.checkout?._id ||
    checkoutSession?.checkout?.id ||
    checkoutSession?._id ||
    checkoutSession?.id ||
    null
  );
}

async function _bestEffortUnlockAll(lockKeys, lockOwnerId) {
  for (const key of lockKeys) {
    await _unlockSlotKey(key, lockOwnerId).catch(() => {});
  }
}

class SagaStep {
  constructor(name, executeFn, compensateFn = null) {
    this.name = name;
    this.executeFn = executeFn;
    this.compensateFn = compensateFn;
  }
}

export class BookingSagaOrchestrator {
  constructor(traceId) {
    this.traceId = traceId || makeTraceId('saga');
    this.executedSteps = [];
  }

  async execute(steps) {
    for (const step of steps) {
      try {
        const stepResult = await step.executeFn();
        if (stepResult && stepResult.ok === false) {
          throw createBookingError(
            stepResult.code || 'SAGA_STEP_FAILED',
            stepResult.message || `Fallo en el paso de la saga: ${step.name}`
          );
        }
        this.executedSteps.push(step);
      } catch (error) {
        log.error(`[SagaOrchestrator] Step '${step.name}' failed. Initiating rollback...`, {
          error: error?.message,
          traceId: this.traceId
        });
        await this._rollback();
        throw error;
      }
    }
  }

  async _rollback() {
    const reversedSteps = [...this.executedSteps].reverse();
    for (const step of reversedSteps) {
      if (typeof step.compensateFn === 'function') {
        try {
          log.info(`[SagaOrchestrator] Executing compensation for step: '${step.name}'`, { traceId: this.traceId });
          await step.compensateFn();
        } catch (compError) {
          log.error(`[SagaOrchestrator] Compensation for step '${step.name}' failed`, {
            error: compError?.message,
            traceId: this.traceId
          });
        }
      }
    }
  }
}

export async function executeBookingSaga(unsafePayload) {
  const traceId = unsafePayload?.traceId || makeTraceId('saga-book');
  let pairToken = null;
  let heartbeatInterval = null;
  let lockKeys = [];
  let lockOwnerId = null;
  let sagaSteps = []; // DECLARADA EN FUNCTION SCOPE PARA ELIMINAR no-undef LINTER ERROR

  try {
    if (!unsafePayload || typeof unsafePayload !== 'object') {
      throw createBookingError('INVALID_PAYLOAD', 'Payload transaccional no valido.');
    }
    if (!unsafePayload.cliente || typeof unsafePayload.cliente !== 'object') {
      throw createBookingError('INVALID_PAYLOAD', 'Informacion del cliente obligatoria.');
    }
    if (!unsafePayload.metaCita || typeof unsafePayload.metaCita !== 'object') {
      throw createBookingError('INVALID_PAYLOAD', 'Metadatos de la cita obligatorios.');
    }

    const email = _safeEmail(unsafePayload.cliente.email);
    if (!email || email.length === 0 || !_isValidEmail(email)) {
      throw createBookingError('INVALID_EMAIL', 'Correo electronico no valido.');
    }

    const { slotF1, slotF2, cliente, metaCita } = unsafePayload;
    if (!slotF1) throw createBookingError('INVALID_PAYLOAD', 'La primera fase (slotF1) es obligatoria.');

    // I-06: STRICT FLAT PROPERTY ACCESS (No nested V1 objects)
    const slotResourceId = slotF1.resourceId || null;
    const rawResourceId = metaCita.resourceId || null;

    // AJUSTE 1: PRIORITIZE metaCita.primaryServiceId AND unsafePayload.primaryServiceId
    const primaryServiceIdRaw = _safeTrim(
      metaCita?.primaryServiceId ||
      unsafePayload?.primaryServiceId ||
      slotF1?.serviceId
    );

    // D3/D4: CALL INTERNAL RESOLUTION DIRECTLY
    const phaseOneServiceId = await _resolvePrimaryServiceIdInternal(primaryServiceIdRaw);
    if (!phaseOneServiceId || STAFF?.IDS?.includes(phaseOneServiceId)) {
      return { status: 'ERROR', error: { code: 'SERVICE_NOT_FOUND', message: 'Identificador del servicio principal no valido.' } };
    }

    const f1LocalStart = _normalizeLocalIsoStr(slotF1.localStartDate);
    if (!f1LocalStart) throw createBookingError('INVALID_DATES', 'La hora de inicio de la Fase 1 es obligatoria.');

    const isDualRequested = !!slotF2;

    const rawFilter = metaCita?.resourceFilterId ?? unsafePayload?.resourceFilterId ?? null;
    const isAnyResourceRequested = !rawFilter ||
      String(rawFilter).trim() === '' ||
      String(rawFilter).toLowerCase() === 'all' ||
      String(rawFilter).toLowerCase() === 'any';

    const assignedResource =
      (rawResourceId && findStaff(rawResourceId) ? String(findStaff(rawResourceId).resourceId) : null) ||
      (_looksLikeGuid(rawResourceId) ? rawResourceId : null) ||
      (_looksLikeGuid(slotResourceId) ? slotResourceId : null);

    if (!isAnyResourceRequested && !assignedResource) {
      return {
        status: 'ERROR',
        error: { code: 'RESOURCE_NOT_AVAILABLE', message: 'No se pudo resolver la profesional solicitada.' }
      };
    }

    const resourceIdForResolve = isAnyResourceRequested ? null : assignedResource;

    // D3/D4: CALL INTERNAL CATALOG LOOKUP DIRECTLY
    const svc = await _getServiceBySlugOrIdInternal(phaseOneServiceId, traceId);
    if (!svc || svc.status !== 'SUCCESS' || !svc.data) {
      return { status: 'ERROR', error: { code: 'SERVICE_NOT_FOUND', message: 'No se pudo cargar el servicio desde el catalogo.' } };
    }

    const serviceData = svc.data;

    if (isDualRequested && !serviceData.permitirCombinar) {
      return { status: 'ERROR', error: { code: 'DUAL_NOT_ALLOWED', message: 'Este servicio no permite combinacion en dos fases.' } };
    }

    const tiempoFase1Ms = (Number(serviceData.tiempoFase1) || 0) * 60 * 1000;
    const exposureMs = (Number(serviceData.tiempoExposicion) || 0) * 60 * 1000;
    const tiempoFase2Ms = (Number(serviceData.tiempoFase2) || 0) * 60 * 1000;

    const f1StartUtc = getUtcDateFromMadridLocal(f1LocalStart);
    if (!f1StartUtc) throw createBookingError('INVALID_DATES', 'Error al convertir la fecha local de la Fase 1.');

    // PRIORITIZE VALIDATED SLOT END DATE
    const f1LocalEndSSOT = _normalizeLocalIsoStr(slotF1.localEndDate) ||
      getMadridLocalStringNoZ(new Date(f1StartUtc.getTime() + tiempoFase1Ms));

    const isDual = !!(
      isDualRequested &&
      serviceData.permitirCombinar &&
      serviceData.secondaryServiceGuid
    );

    let phaseTwoServiceId = null;
    let f2LocalStart = null;
    let f2LocalEnd = null;

    if (isDual) {
      const secondaryCandidate = serviceData.secondaryServiceGuid || metaCita?.secondaryServiceId || null;
      phaseTwoServiceId = await _resolvePrimaryServiceIdInternal(secondaryCandidate);
      if (!phaseTwoServiceId || STAFF?.IDS?.includes(phaseTwoServiceId)) {
        return { status: 'ERROR', error: { code: 'SERVICE_NOT_FOUND', message: 'Identificador de la segunda fase no valido.' } };
      }

      f2LocalStart = _normalizeLocalIsoStr(slotF2?.localStartDate);
      f2LocalEnd = _normalizeLocalIsoStr(slotF2?.localEndDate);

      if (!f2LocalStart || !f2LocalEnd) {
        const f2StartUtcSSOT = new Date(f1StartUtc.getTime() + tiempoFase1Ms + exposureMs);
        const f2EndUtcSSOT = new Date(f2StartUtcSSOT.getTime() + tiempoFase2Ms);
        f2LocalStart = getMadridLocalStringNoZ(f2StartUtcSSOT);
        f2LocalEnd = getMadridLocalStringNoZ(f2EndUtcSSOT);
      }

      if (!f2LocalStart || !f2LocalEnd) {
        return { status: 'ERROR', error: { code: 'INVALID_F2_TIMING', message: 'Tiempos de la segunda fase no validos.' } };
      }
    }

    // D3/D4: CALL INTERNAL STAFF RESOLUTION DIRECTLY
    const resourceValidation = await _resolveStaffForSlotInternal(
      String(phaseOneServiceId),
      f1LocalStart,
      f1LocalEndSSOT,
      f2LocalStart,
      f2LocalEnd,
      resourceIdForResolve
    );

    if (resourceValidation?.status !== 'SUCCESS' || !resourceValidation?.data?.slotF1) {
      return {
        status: 'ERROR',
        error: {
          code: 'SLOT_UNAVAILABLE',
          message: resourceValidation?.error?.message || 'El horario seleccionado ya no esta disponible. Por favor, elige otro horario.'
        }
      };
    }

    const resolvedId = resourceValidation?.data?.resourceId ?? null;
    const finalResourceId = isAnyResourceRequested ? resolvedId : resolvedId || assignedResource || null;

    if (!finalResourceId) {
      return { status: 'ERROR', error: { code: 'SLOT_UNAVAILABLE', message: 'No se pudo asignar una profesional para este horario.' } };
    }

    const resourceObj = findStaff(finalResourceId);
    const finalResourceName =
      resourceObj?.displayName ||
      resourceObj?.name ||
      resourceValidation?.data?.resourceName ||
      STAFF?.RESOURCE_TO_DISPLAY?.[finalResourceId] ||
      STAFF_DEFAULT_NAME;

    if (isDual && !resourceValidation?.data?.slotF2) {
      return { status: 'ERROR', error: { code: 'SLOT_UNAVAILABLE', message: 'La segunda fase no esta disponible. Por favor, elige otro horario.' } };
    }

    // FIX 2: DO NOT INJECT serviceId INTO SLOT OBJECTS
    const slotF1ForLocks = { ...resourceValidation.data.slotF1 };
    const slotF2ForLocks = isDual && resourceValidation.data.slotF2 ? { ...resourceValidation.data.slotF2 } : null;

    // FIX 1: PASS phaseOneServiceId TO _resolveStablePairToken
    const stableToken = _resolveStablePairToken({
      metaCita,
      unsafePayload,
      email,
      phaseOneServiceId,
      slotF1,
      slotF2: isDual ? slotF2 : null,
      resourceId: finalResourceId
    });

    pairToken = stableToken;
    metaCita.uiPairToken = stableToken;
    metaCita.pairToken = stableToken;

    // FIX 3: ATTACH serviceId TO PHASE METADATA OBJECT (NOT INSIDE SLOT)
    const phases = [{
      key: 'F1',
      serviceId: String(phaseOneServiceId),
      rawSlot: slotF1ForLocks,
      validatedSlot: slotF1ForLocks,
      localStart: f1LocalStart,
      localEnd: f1LocalEndSSOT,
      tipo: isDual ? 'dual_fase1' : 'simple',
      isDual
    },
    ...(isDual && slotF2ForLocks ? [{
      key: 'F2',
      serviceId: String(phaseTwoServiceId),
      rawSlot: slotF2ForLocks,
      validatedSlot: slotF2ForLocks,
      localStart: f2LocalStart,
      localEnd: f2LocalEnd,
      tipo: 'dual_fase2',
      isDual: true
    }] : [])
    ];

    // =====================================================================
    // VECTOR E: MUTEX LOCKS ACQUIRED BEFORE TRANSACTION IDEMPOTENCY INIT
    // =====================================================================
    const lockResourceKey = finalResourceId ? String(finalResourceId) : 'ANY_RESOURCE';
    lockKeys = _buildLockKeys(phases, lockResourceKey);
    lockOwnerId = stableToken;

    for (const key of lockKeys) {
      const lockResult = await _lockSlotKeyOrFail(key, lockOwnerId, LOCK_TTL_MS);
      if (!lockResult?.ok) {
        return {
          status: 'ERROR',
          error: { code: 'TOKEN_BUSY', message: lockResult?.message || 'El horario esta ocupado.' }
        };
      }
    }

    // START LOCK RENEWAL HEARTBEAT IMMEDIATELY AFTER MUTEX LOCK ACQUISITION
    heartbeatInterval = setInterval(() => {
      lockKeys.forEach((key) => _renewLock(key, lockOwnerId, LOCK_TTL_MS).catch(() => {}));
    }, HEARTBEAT_MS);

    // INITIALIZE TRANSACTION IDEMPOTENCY RECORD
    const payloadHash = hashSHA256(
      JSON.stringify({
        slotF1: { serviceId: String(phaseOneServiceId), start: f1LocalStart, end: f1LocalEndSSOT },
        slotF2: isDual ? { serviceId: String(phaseTwoServiceId), start: f2LocalStart, end: f2LocalEnd } : null,
        pairToken: stableToken
      })
    );

    const txResult = await _initTransaction(stableToken, payloadHash, traceId);
    if (!txResult.success) {
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
      }
      await _bestEffortUnlockAll(lockKeys, lockOwnerId);
      return {
        status: 'ERROR',
        error: {
          code: 'TRANSACTION_BUSY',
          message: 'Ya hay una reserva en proceso para este horario. Por favor, espera unos segundos.'
        }
      };
    }

    if (!txResult.isNew) {
      if (txResult.existing && txResult.existing.status === 'COMPLETED') {
        if (heartbeatInterval) {
          clearInterval(heartbeatInterval);
          heartbeatInterval = null;
        }
        await _bestEffortUnlockAll(lockKeys, lockOwnerId);
        return { status: 'SUCCESS', data: txResult.existing.result, idempotent: true, error: null };
      }
      if (txResult.reclaimed) {
        log.info('Transaccion huerfana reclamada en bookingSaga', { pairToken: stableToken, traceId });
      } else if (txResult.timeout) {
        if (heartbeatInterval) {
          clearInterval(heartbeatInterval);
          heartbeatInterval = null;
        }
        await _bestEffortUnlockAll(lockKeys, lockOwnerId);
        return {
          status: 'PROCESSING',
          data: { retryAfter: 2, message: 'La reserva esta siendo procesada. Reintentando en 2 segundos.' },
          error: null
        };
      }
    }

    const saga = new BookingSagaOrchestrator(traceId);
    const createdBookings = [];
    let checkoutSession = null;
    let checkoutUrl = null;

    // VECTOR A: Watchdog en NoSQL query
    const existingCita = await withTimeout(
      wixData
        .query(CITAS_COLLECTION)
        .eq('pairToken', stableToken)
        .limit(1)
        .find({ suppressAuth: true }),
      API_TIMEOUT_MS,
      'queryExistingCitaByPairToken'
    ).then((res) => res?.items?.[0] || null).catch(() => null);

    if (existingCita) {
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
      }
      await _bestEffortUnlockAll(lockKeys, lockOwnerId);

      const meta = existingCita.meta || {};
      if (meta.estadoPago === 'PENDING_PAYMENT' && meta.checkoutId) {
        const urlRes = await _executeWithRetry(
          () => withTimeout(getCheckoutUrlElevated(meta.checkoutId), API_TIMEOUT_MS, 'getCheckoutUrl'),
          3,
          500
        );
        const resultData = {
          bookingIdF1: existingCita.bookingId,
          bookingIdF2: meta.bookingIdF2 || null,
          isCombined: meta.esCombinado || false,
          checkoutUrl: urlRes?.checkoutUrl || null,
          requiresPayment: true,
          idempotent: true
        };
        await _completeTransaction(stableToken, resultData);
        return { status: 'SUCCESS', data: resultData, error: null };
      }

      const resultData = {
        bookingIdF1: existingCita.bookingId,
        bookingIdF2: meta.bookingIdF2 || null,
        isCombined: meta.esCombinado || false,
        requiresPayment: false,
        idempotent: true
      };
      await _completeTransaction(stableToken, resultData);
      return { status: 'SUCCESS', data: resultData, error: null };
    }

    const rawName = cliente.nombre || cliente.firstName || 'Cliente';
    const nameParts = String(rawName).trim().split(/\s+/);
    const contactDetails = {
      firstName: nameParts[0] || 'Cliente',
      lastName: nameParts.slice(1).join(' ') || '',
      email,
      phone: _safePhone(cliente.telefono || cliente.phone)
    };

    const addonsNorm = _normalizeAddons(metaCita?.addons || []);
    const addonsTotal = _sumAddons(addonsNorm);
    const serviceName = metaCita?.servicioNombre || serviceData?.metadata?.titulo || 'Servicio';
    const basePrice = Number(metaCita?.precioBase || serviceData?.metadata?.pricing?.base || 0);
    const totalBilled = basePrice + addonsTotal;
    const madridDateYMD = f1LocalStart.slice(0, 10);

    for (const p of phases) {
      const durationMinutes = p.key === 'F2'
        ? Number(serviceData.tiempoFase2) || 30
        : Number(serviceData.tiempoFase1) || 30;

      // FIX 4: CALL _forceStaffInPristineSlot WITH 3 PARAMETERS MATCHING v18.9.1-clean
      p.pristineSlot = _forceStaffInPristineSlot(p.validatedSlot, finalResourceId, durationMinutes);
      if (!p.pristineSlot) {
        throw createBookingError('INVALID_SLOT', `Formato de slot invalido para el motor V2 (${p.key})`);
      }

      if (!p.pristineSlot.scheduleId) {
        const resourceObj2 = findStaff(finalResourceId);
        if (resourceObj2?.scheduleId) p.pristineSlot.scheduleId = resourceObj2.scheduleId;
      }
    }

    // DECLARACION DE PASOS DE SAGA SOBRE LA VARIABLE SAGA STEPS EN AMBITO DE FUNCION
    sagaSteps = [
      new SagaStep(
        'LockSlots',
        async () => {
          // Locks already acquired before _initTransaction per Vector E
          return { ok: true };
        },
        async () => {
          if (heartbeatInterval) {
            clearInterval(heartbeatInterval);
            heartbeatInterval = null;
          }
          await _bestEffortUnlockAll(lockKeys, lockOwnerId);
        }
      )
    ];

    sagaSteps.push(
      new SagaStep(
        'CreateBookings',
        async () => {
          const createF1 = async () => {
            const p = phases.find(ph => ph.key === 'F1');
            if (!p) return;

            const res = await _executeWithRetry(
              () => withTimeout(
                createBookingElevated({
                  serviceId: String(phaseOneServiceId),
                  bookedEntity: { slot: p.pristineSlot },
                  contactDetails,
                  totalParticipants: 1,
                  options: { flowControlSettings: { skipAvailabilityValidation: false, skipBusinessConfirmation: false } }
                }),
                API_TIMEOUT_MS,
                'createBooking_F1'
              ),
              5,
              500
            );

            const bId = res?.booking?._id || res?._id;
            const rev = Number(res?.booking?.revision || res?.revision || 1);
            if (!bId) throw new Error('Falta bookingId para la Fase 1');
            createdBookings.push({ bookingId: bId, revision: rev, phase: p });
          };

          const createF2 = async () => {
            const p = phases.find(ph => ph.key === 'F2');
            if (!p) return;

            await new Promise((r) => setTimeout(r, 400 + Math.floor(Math.random() * 600)));

            const res = await _executeWithRetry(
              () => withTimeout(
                createBookingElevated({
                  serviceId: String(phaseTwoServiceId),
                  bookedEntity: { slot: p.pristineSlot },
                  contactDetails,
                  totalParticipants: 1,
                  options: { flowControlSettings: { skipAvailabilityValidation: false, skipBusinessConfirmation: false } }
                }),
                API_TIMEOUT_MS,
                'createBooking_F2'
              ),
              5,
              500
            );

            const bId = res?.booking?._id || res?._id;
            const rev = Number(res?.booking?.revision || res?.revision || 1);
            if (!bId) throw new Error('Falta bookingId para la Fase 2');
            createdBookings.push({ bookingId: bId, revision: rev, phase: p });
          };

          // AJUSTE 2: EXECUTE PROMISE.ALL ONLY IF DUAL, OTHERWISE SINGLE CALL DIRECT
          if (isDual) {
            await Promise.all([createF1(), createF2()]);
          } else {
            await createF1();
          }

          return { ok: true };
        },
        async () => {
          for (const b of createdBookings) {
            await cancelBookingElevated(b.bookingId, {
              revision: b.revision,
              flowControlSettings: { ignoreCancellationPolicy: true }
            }).catch(() => {
              withTimeout(
                wixData.insert(
                  COMPENSATIONS_COLLECTION,
                  { bookingId: b.bookingId, phase: b.phase.key, status: 'PENDING', attempts: 0, traceId },
                  { suppressAuth: true }
                ),
                API_TIMEOUT_MS,
                'insertCompensationPending'
              ).catch(() => {});
            });
          }
        }
      )
    );

    const isOnlinePayment = metaCita?.metodoPago === 'ONLINE';
    const needsCheckout = !!isOnlinePayment;

    const f1Booking = createdBookings.find((b) => b.phase?.key === 'F1');
    if (!f1Booking && createdBookings.length > 0) {
      throw createBookingError('BOOKING_CREATION_FAILED', 'Fallo al verificar la reserva de la Fase 1.');
    }

    const f2Booking = createdBookings.find((b) => b.phase?.key === 'F2');

    if (needsCheckout) {
      sagaSteps.push(
        new SagaStep('CreateCheckout', async () => {
          const lineItems = createdBookings.map((b) => ({
            quantity: 1,
            catalogReference: { appId: APP_IDS.BOOKINGS, catalogItemId: String(b.bookingId) }
          }));

          checkoutSession = await _executeWithRetry(
            () => withTimeout(createCheckoutElevated({ lineItems, channelType: 'WEB' }), API_TIMEOUT_MS, 'createCheckout'),
            3,
            500
          );

          const checkoutId = _extractCheckoutId(checkoutSession);
          if (!checkoutId) throw new Error('CHECKOUT_ID_MISSING');

          const urlRes = await _executeWithRetry(
            () => withTimeout(getCheckoutUrlElevated(checkoutId), API_TIMEOUT_MS, 'getCheckoutUrl'),
            3,
            500
          );

          checkoutUrl = urlRes?.checkoutUrl || null;
          return { ok: true };
        })
      );
    } else {
      sagaSteps.push(
        new SagaStep('ConfirmPresencial', async () => {
          for (const b of createdBookings) {
            await _executeWithRetry(
              () => withTimeout(
                confirmOrDeclineBookingElevated(b.bookingId, { paymentStatus: 'NOT_PAID', revision: b.revision }),
                API_TIMEOUT_MS,
                `confirm_${b.phase.key}`
              ),
              3,
              500
            );
          }
          return { ok: true };
        })
      );
    }

    await saga.execute(sagaSteps);

    const paymentPlan = {
      isOnline: needsCheckout,
      metodoPago: needsCheckout ? 'ONLINE' : 'PRESENCIAL',
      estadoPago: needsCheckout ? 'PENDING_PAYMENT' : 'CONFIRMED_UNPAID',
      checkoutId: _extractCheckoutId(checkoutSession)
    };

    const baseMeta = {
      pairToken: stableToken,
      addons: addonsNorm,
      addonsTotal,
      resourceId: finalResourceId || null,
      resourceFilterId: rawFilter || null,
      resourceFilterName: isAnyResourceRequested ? 'PROFESIONAL SEGUN HORARIO' : finalResourceName,
      primaryServiceId: phaseOneServiceId,
      secondaryServiceId: phaseTwoServiceId || null,
      traceId,
      esCombinado: isDual,
      fechaYmdMadrid: madridDateYMD,
      servicioNombre: serviceName,
      uiPairToken: stableToken,
      bookingIdF2: isDual ? f2Booking?.bookingId || null : null,
      ...(paymentPlan.checkoutId ? { checkoutId: paymentPlan.checkoutId } : {})
    };

    const persistPromises = createdBookings.map((b) => {
      const phase = b.phase;
      const startUtc = getUtcDateFromMadridLocal(phase.localStart);
      const endUtc = getUtcDateFromMadridLocal(phase.localEnd);
      if (!startUtc || !endUtc) throw createBookingError('INVALID_DATES', `Fechas no validas para guardar (${phase.key})`);

      const persistedServiceId = phase.key === 'F2' ? phaseTwoServiceId : phaseOneServiceId;

      return _persistBooking({
        bookingId: b.bookingId,
        revision: b.revision,
        serviceId: persistedServiceId,
        scheduleId: phase.pristineSlot?.scheduleId || '',
        resourceId: finalResourceId,
        startDate: startUtc,
        endDate: endUtc,
        contactDetails,
        tipo: phase.tipo,
        meta: {
          ...baseMeta,
          estadoPago: paymentPlan.estadoPago,
          metodoPago: paymentPlan.metodoPago,
          precioAuditado: totalBilled
        }
      }, traceId);
    });

    await Promise.all(persistPromises);

    const f1StartUtcFinal = getUtcDateFromMadridLocal(phases[0].localStart);
    const f2StartUtcFinal = isDual && phases[1]?.localStart ? getUtcDateFromMadridLocal(phases[1].localStart) : null;

    const resultData = {
      requiresPayment: needsCheckout,
      checkoutUrl,
      bookingIdF1: f1Booking?.bookingId || null,
      bookingIdF2: f2Booking?.bookingId || null,
      isCombined: isDual,
      confirmation: !needsCheckout ? {
        cliente: contactDetails.firstName,
        servicio: serviceName,
        fecha: madridDateYMD,
        hora: f1StartUtcFinal ? (getMadridLocalStringNoZ(f1StartUtcFinal).split('T')[1] || '').slice(0, 5) : null,
        horaF2: isDual && f2StartUtcFinal ? (getMadridLocalStringNoZ(f2StartUtcFinal).split('T')[1] || '').slice(0, 5) : null,
        estilista: finalResourceName,
        total: totalBilled,
        moneda: MONEY?.DISPLAY_CURRENCY || 'EUR'
      } : null
    };

    await _completeTransaction(stableToken, resultData);

    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }
    await _bestEffortUnlockAll(lockKeys, lockOwnerId);

    try {
      await _invalidateCachesInternal(String(phaseOneServiceId), madridDateYMD, finalResourceId, traceId);
    } catch (e) {
      log.warn('invalidateCachesInternal failed (best-effort)', { traceId, message: e?.message });
    }

    return { status: 'SUCCESS', data: resultData, error: null };
  } catch (error) {
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }
    if (lockKeys.length > 0 && lockOwnerId) {
      await _bestEffortUnlockAll(lockKeys, lockOwnerId);
    }
    if (pairToken) {
      await _failTransaction(pairToken, error?.message || String(error)).catch(() => {});
    }
    return _handleError(error, 'executeBookingSaga', traceId, log);
  } finally {
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }
  }
}
