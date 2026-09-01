/**
 * pages/servicio-2.js
 * Version: v19.6.16-fixed-handshake-config
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
  SALON_LOCATION_LABEL: "Marian Madrid"
});

function _isGuid(value) {
  const clean = String(value || "").trim();
  return clean && _looksLikeGuid(clean) ? clean : "";
}

function _isSlug(value) {
  const clean = _safeSlugOrId(value || "");
  return clean && !_isGuid(clean) ? clean : "";
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
  const text = String(message || "Unknown error");

  console.error("[servicio-2] Error:", text);

  try {
    const banner =
      $w("#errorBanner") ||
      $w("#errorBox") ||
      $w("#textError") ||
      $w("#errorText");

    if (banner && "text" in banner) {
      banner.text = `Error: ${text}`;

      if (typeof banner.show === "function") {
        banner.show();
      }
    }
  } catch (error) {
    console.warn(
      "[servicio-2] Error component unavailable",
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
        .map((addon) =>
          _safeTrim(addon?.addonId || addon)
        )
        .filter((addonId) => allowedIds.has(addonId))
    )
  );

  return requestedIds.slice(
    0,
    BOOKINGS_ADDON_CONFIG.MAX_PER_BOOKING
  );
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
    URLS.CALENDARIO_2 ||
    "/booking-calendar/calendario-2";

  const addonParam =
    addonIds.length > 0
      ? `&addonIds=${encodeURIComponent(addonIds.join(","))}`
      : "";

  wixLocation.to(
    `${base}?slugUrl=${encodeURIComponent(canonicalSlugUrl)}` +
      `&serviceId=${encodeURIComponent(canonicalGuid)}` +
      addonParam +
      "&referral=service2"
  );
}

function _goToServices() {
  wixLocation.to(URLS.SERVICIOS || "/reserva-online");
}

function _buildContext(data, traceId) {
  const metadata =
    data.metadata && typeof data.metadata === "object"
      ? data.metadata
      : {};

  const tituloServicio =
    _safeTrim(
      metadata.tituloServicio ||
        metadata.titulo ||
        "Servicio"
    ) || "Servicio";

  const precio = Number(
    metadata.precio ??
      metadata.pricing?.base ??
      0
  );

  const duracionTotal = Number(
    metadata.duracionTotal ??
      metadata.timing?.estimatedTotal ??
      metadata.timing?.totalDuration ??
      30
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

  const recomendacionProductoRef = _safeTrim(
    metadata.recomendacionProductoRef
  );

  const recomendacionProductoRef2 = _safeTrim(
    metadata.recomendacionProductoRef2
  );

  return {
    ...data,
    traceId,
    serviceId: _isGuid(data.serviceId),
    slugUrl: _isSlug(data.slugUrl),
    slug: _isSlug(data.slugUrl),
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
      recomendacionProductoRef,
      recomendacionProductoRef2,
      addons,
      addonsPrecio: addons.map((addon) =>
        Number(addon?.precio || 0)
      ),
      imageUrl,

      pricing: {
        base: precio,
        currency:
          metadata.pricing?.currency ||
          MONEY.DISPLAY_CURRENCY
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

      if (type === _normType(MESSAGE_TYPES.BOOK)) {
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

      if (type === _normType(MESSAGE_TYPES.NAV)) {
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
});
