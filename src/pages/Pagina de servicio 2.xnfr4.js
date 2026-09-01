/**
 * =============================================================================
 * MODULE: pages/servicio-2.js
 * VERSION: v21.0.2-canonical-service-widget
 * RESPONSIBILITY: Resolve a service from Import2 and connect the custom widget
 * to the canonical calendar and services routes.
 * STANDARDS: G10 ASCII Strict.
 * HISTORIAL:
 * - v21.0.2-fixed-ui-config-and-error-flow:
 *   Removes the unsafe UI.HANDSHAKE_TIMEOUT_MS dependency, adds local runtime
 *   configuration, protects async initialization, validates service data, and
 *   preserves the canonical serviceId and slugUrl contract.
 * - v19.6.15-canonical-duration-context:
 *   Preserves canonical duracionTotal with nullish fallbacks only.
 * - v19.6.14-canonical-widget-service-context:
 *   Emits serviceId only and removes the primaryServiceGuid alias.
 * - v19.6.10-widget-migration-context:
 *   Mirrors canonical serviceId to the active HTML widget context.
 * - v19.6.7-ready-only-context:
 *   Relies on the bridge READY handshake before context delivery.
 * - v19.6.2-serviceid-linkfases-contract:
 *   Uses serviceId and derives F2 only from Import2.linkFases.
 * - v19.4.9:
 *   Normalizes the Service 2 presentation contract to Import2 camelCase fields.
 * - v19.4.6:
 *   Carries only Import2-validated local add-on IDs to the calendar context.
 * - v19.4.4:
 *   Resolves Import2 by slugUrl first and serviceId second.
 * - v19.4.4:
 *   Validates BOOK and NAV targets before navigation.
 * - v19.4.4:
 *   Removes public service aliases and requires serviceId.
 * - v19.4.2:
 *   Uses the verified service image fallback.
 * =============================================================================
 */

import wixLocation from "wix-location";
import wixWindowFrontend from "wix-window-frontend";
import { getServiceBySlugOrId } from "backend/reservas.web";

import {
  MESSAGE_TYPES,
  URLS,
  MONEY,
  makeTraceId,
  _normType,
  _safeSlugOrId,
  _safeTrim,
  BOOKINGS_ADDON_CONFIG,
  withTimeout,
  _executeWithRetry,
  _looksLikeGuid
} from "public/mmUtils";

import { createWidgetBridge } from "public/widgetBridge";

const CONFIG = Object.freeze({
  HANDSHAKE_TIMEOUT_MS: 10000,
  CONTEXT_TIMEOUT_MS: 60000,
  FRONTEND_API_TIMEOUT_MS: 10000,
  FRONTEND_RETRY_ATTEMPTS: 2,
  FRONTEND_RETRY_BASE_BACKOFF_MS: 300,
  DEFAULT_SERVICE_IMAGE_URL: "",
  SALON_LOCATION_LABEL: "Marian Madrid",
  DEFAULT_DURATION_MINUTES: 30
});

function _isGuid(value) {
  const clean = String(value || "").trim();
  return clean && _looksLikeGuid(clean) ? clean : "";
}

function _isSlug(value) {
  const clean = _safeSlugOrId(value || "");
  return clean && !_isGuid(clean) ? clean : "";
}

function _safeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

async function _resolveServiceLookup() {
  const query = wixLocation.query || {};
  let appService = {};

  try {
    const pageData = await wixWindowFrontend.getAppPageData();
    appService = pageData?.service || {};
  } catch (error) {
    console.warn(
      "[servicio-2] getAppPageData unavailable",
      error?.message || String(error)
    );
  }

  const slugCandidates = [
    query.slugUrl,
    query.slug,
    query.serviceKey,
    appService?.supportedSlugs?.[0]?.name,
    appService?.slugUrl,
    appService?.slug
  ];

  for (const candidate of slugCandidates) {
    const slugUrl = _isSlug(candidate);

    if (slugUrl) {
      return {
        kind: "SLUG",
        value: slugUrl
      };
    }
  }

  const guidCandidates = [
    query.serviceId,
    appService?.id,
    appService?._id
  ];

  for (const candidate of guidCandidates) {
    const serviceId = _isGuid(candidate);

    if (serviceId) {
      return {
        kind: "GUID",
        value: serviceId
      };
    }
  }

  const path = wixLocation.path || [];
  const pathCandidate = _isSlug(path[path.length - 1] || "");

  const excluded = [
    "servicios",
    "service",
    "servicio",
    "servicio-2",
    "pagina-de-servicio-2"
  ];

  if (pathCandidate && !excluded.includes(pathCandidate)) {
    return {
      kind: "SLUG",
      value: pathCandidate
    };
  }

  return null;
}

async function _fetchServiceFromBackend(lookup) {
  if (!lookup?.value) {
    throw new Error("Service lookup is required");
  }

  const result = await _executeWithRetry(
    () =>
      withTimeout(
        getServiceBySlugOrId(lookup.value),
        CONFIG.FRONTEND_API_TIMEOUT_MS,
        `getServiceBySlugOrId:${lookup.kind}`
      ),
    CONFIG.FRONTEND_RETRY_ATTEMPTS,
    CONFIG.FRONTEND_RETRY_BASE_BACKOFF_MS
  );

  if (!result || result.status !== "SUCCESS" || !result.data) {
    throw new Error(
      result?.error?.message || "Service not found in Import2"
    );
  }

  const serviceId = _isGuid(result.data.serviceId);
  const slugUrl = _isSlug(result.data.slugUrl);

  if (!serviceId || !slugUrl) {
    throw new Error(
      "Import2 service is missing serviceId or slugUrl"
    );
  }

  return {
    ...result.data,
    serviceId,
    slugUrl
  };
}

function _showError(message) {
  const safeMessage = String(message || "Unknown error");

  console.error("[servicio-2] Error:", safeMessage);

  try {
    const banner = $w("#errorBanner");

    if (banner && "text" in banner) {
      banner.text = `Error: ${safeMessage}`;

      if (typeof banner.show === "function") {
        banner.show();
      }
    }
  } catch (error) {
    console.warn(
      "[servicio-2] error banner unavailable",
      error?.message || String(error)
    );
  }
}

function _sanitizeRequestedAddonIds(rawAddons, resolvedService) {
  const catalog = Array.isArray(
    resolvedService?.metadata?.addons
  )
    ? resolvedService.metadata.addons
    : [];

  const allowedIds = new Set(
    catalog
      .map((addon) => _safeTrim(addon?.addonId))
      .filter(Boolean)
  );

  const requestedIds = Array.from(
    new Set(
      (Array.isArray(rawAddons) ? rawAddons : [])
        .map((addon) => {
          if (typeof addon === "object") {
            return _safeTrim(addon?.addonId);
          }

          return _safeTrim(addon);
        })
        .filter((addonId) => allowedIds.has(addonId))
    )
  );

  const maxAddons = _safeNumber(
    BOOKINGS_ADDON_CONFIG?.MAX_PER_BOOKING,
    10
  );

  return requestedIds.slice(0, maxAddons);
}

function _goToCalendar(slugUrl, serviceId, addonIds = []) {
  const canonicalSlugUrl = _isSlug(slugUrl);
  const canonicalGuid = _isGuid(serviceId);

  if (!canonicalSlugUrl || !canonicalGuid) {
    _showError(
      "No se pudo identificar el servicio para continuar la reserva."
    );
    return;
  }

  const base =
    URLS?.CALENDARIO_2 ||
    "/booking-calendar/calendario-2";

  const params = new URLSearchParams({
    slugUrl: canonicalSlugUrl,
    serviceId: canonicalGuid,
    referral: "service2"
  });

  if (addonIds.length > 0) {
    params.set("addonIds", addonIds.join(","));
  }

  wixLocation.to(`${base}?${params.toString()}`);
}

function _goToServices() {
  wixLocation.to(
    URLS?.SERVICIOS || "/reserva-online"
  );
}

function _buildContext(data, traceId) {
  const metadata =
    data?.metadata &&
    typeof data.metadata === "object" &&
    !Array.isArray(data.metadata)
      ? data.metadata
      : {};

  const tituloServicio =
    _safeTrim(
      metadata.tituloServicio ||
      metadata.titulo ||
      "Servicio"
    ) || "Servicio";

  const precio = _safeNumber(
    metadata.precio ??
    metadata.pricing?.base,
    0
  );

  const duracionTotal = _safeNumber(
    metadata.duracionTotal ??
    metadata.timing?.estimatedTotal ??
    metadata.timing?.totalDuration,
    CONFIG.DEFAULT_DURATION_MINUTES
  );

  const addons = Array.isArray(metadata.addons)
    ? metadata.addons
    : [];

  const imageUrl =
    _safeTrim(metadata.imageUrl) ||
    CONFIG.DEFAULT_SERVICE_IMAGE_URL;

  const localizacion =
    _safeTrim(metadata.localizacion) ||
    CONFIG.SALON_LOCATION_LABEL;

  const currency =
    _safeTrim(
      metadata.pricing?.currency ||
      MONEY?.DISPLAY_CURRENCY ||
      "EUR"
    ) || "EUR";

  const canonicalServiceId = _isGuid(data.serviceId);
  const canonicalSlugUrl = _isSlug(data.slugUrl);

  if (!canonicalServiceId || !canonicalSlugUrl) {
    throw new Error(
      "Invalid canonical service context"
    );
  }

  return {
    ...data,
    traceId,
    serviceId: canonicalServiceId,
    slugUrl: canonicalSlugUrl,
    slug: canonicalSlugUrl,
    permitirCombinar: Boolean(data.permitirCombinar),

    metadata: {
      ...metadata,
      titulo: tituloServicio,
      tituloServicio,
      precio,
      duracionTotal,
      localizacion,
      resumenCorto:
        _safeTrim(metadata.resumenCorto) ||
        "Marian Madrid",
      descripcionLarga:
        _safeTrim(metadata.descripcionLarga) ||
        "Detalles no disponibles.",
      recomendacionProductoRef:
        _safeTrim(metadata.recomendacionProductoRef),
      recomendacionProductoRef2:
        _safeTrim(metadata.recomendacionProductoRef2),
      addons,
      addonsPrecio: addons.map((addon) =>
        _safeNumber(addon?.precio, 0)
      ),
      imageUrl,

      pricing: {
        base: precio,
        currency
      },

      timing: {
        estimatedTotal: duracionTotal,
        totalDuration: duracionTotal
      }
    },

    staffOptions: Array.isArray(data.staffOptions)
      ? data.staffOptions
      : [],

    staffDisponible: Array.isArray(data.staffDisponible)
      ? data.staffDisponible
      : []
  };
}

$w.onReady(async function () {
  const traceId = makeTraceId("servicio");
  const widget = $w("#htmlWidgetCustomService");

  if (!widget || typeof widget.postMessage !== "function") {
    _showError("HTML widget not found or incompatible.");
    return;
  }

  try {
    const lookup = await _resolveServiceLookup();

    if (!lookup) {
      _showError(
        "No se pudo localizar slugUrl ni serviceId del servicio."
      );
      return;
    }

    let resolvedService = null;

    createWidgetBridge(widget, {
      slug: lookup.value,
      traceId,
      handshakeTimeoutMs: CONFIG.HANDSHAKE_TIMEOUT_MS,
      contextTimeoutMs: CONFIG.CONTEXT_TIMEOUT_MS,

      onContextReady: async () => {
        resolvedService =
          await _fetchServiceFromBackend(lookup);

        return _buildContext(
          resolvedService,
          traceId
        );
      },

      onWidgetMessage: async (message) => {
        const type = _normType(message?.type);
        const payload = message?.payload || {};

        const currentSlugUrl =
          resolvedService?.slugUrl || "";

        const currentServiceId =
          resolvedService?.serviceId || "";

        if (
          type === _normType(MESSAGE_TYPES.BOOK)
        ) {
          const addonIds =
            _sanitizeRequestedAddonIds(
              payload.addons,
              resolvedService
            );

          _goToCalendar(
            currentSlugUrl,
            currentServiceId,
            addonIds
          );

          return;
        }

        if (
          type === _normType(MESSAGE_TYPES.NAV)
        ) {
          const target = String(
            payload.target || ""
          )
            .trim()
            .toUpperCase();

          if (
            target === "SERVICIOS" ||
            target === "BACK"
          ) {
            _goToServices();
            return;
          }

          if (
            target === "CALENDARIO2" ||
            target.includes("CALENDAR")
          ) {
            _goToCalendar(
              currentSlugUrl,
              currentServiceId
            );
            return;
          }

          _goToServices();
        }
      },

      onError: (error) => {
        _showError(
          error?.message || String(error)
        );
      }
    });
  } catch (error) {
    _showError(
      error?.message ||
      "No se pudo cargar el servicio."
    );
  }
});
