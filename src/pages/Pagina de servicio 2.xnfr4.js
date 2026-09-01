/**
 * =============================================================================
 * MODULE: pages/servicio-2.js
 * VERSION: v21.0.2-canonical-service-widget-image-fallback
 * RESPONSIBILITY: Resolve Import2 service and connect the custom widget to
 * canonical calendar and services routes.
 * STANDARDS: G10 ASCII Strict.
 * HISTORIAL:
 * - v21.0.2-canonical-service-widget-image-fallback:
 *   Removes unsafe UI dependency, adds local configuration, validates context,
 *   preserves canonical serviceId and slugUrl, and sends a default image.
 * - v19.6.15-canonical-duration-context:
 *   Preserves canonical duracionTotal.
 * - v19.6.14-canonical-widget-service-context:
 *   Emits serviceId only.
 * - v19.6.10-widget-migration-context:
 *   Sends canonical service context to the HTML widget.
 * - v19.6.7-ready-only-context:
 *   Uses the widget READY handshake.
 * - v19.4.6:
 *   Validates local add-on IDs before navigation.
 * - v19.4.4:
 *   Resolves Import2 by slugUrl first and serviceId second.
 * - v19.4.2:
 *   Adds service image fallback.
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
  DEFAULT_DURATION_MINUTES: 30,
  DEFAULT_LOCATION: "Marian Madrid",
  DEFAULT_CURRENCY: "EUR",
  DEFAULT_SERVICE_IMAGE_URL:
    "data:image/svg+xml;charset=UTF-8," +
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'>" +
    "<rect width='1200' height='800' fill='%23e9e2d9'/>" +
    "<circle cx='930' cy='170' r='210' fill='%23d8bea0'/>" +
    "<rect x='105' y='180' width='530' height='450' rx='30' fill='%23f7f3ee'/>" +
    "<text x='160' y='420' fill='%23342b24' font-family='Georgia' font-size='68'>MARIAN</text>" +
    "<text x='160' y='500' fill='%23342b24' font-family='Georgia' font-size='68'>MADRID</text>" +
    "</svg>"
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

  const serviceId = _isGuid(data.serviceId);
  const slugUrl = _isSlug(data.slugUrl);

  if (!serviceId || !slugUrl) {
    throw new Error("Invalid canonical service context");
  }

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
    CONFIG.DEFAULT_LOCATION;

  const currency =
    _safeTrim(
      metadata.pricing?.currency ||
      MONEY?.DISPLAY_CURRENCY ||
      CONFIG.DEFAULT_CURRENCY
    ) || CONFIG.DEFAULT_CURRENCY;

  return {
    ...data,
    traceId,
    serviceId,
    slugUrl,
    slug: slugUrl,
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

        if (
          type === _normType(MESSAGE_TYPES.BOOK)
        ) {
          const addonIds =
            _sanitizeRequestedAddonIds(
              payload.addons,
              resolvedService
            );

          _goToCalendar(
            resolvedService?.slugUrl,
            resolvedService?.serviceId,
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
              resolvedService?.slugUrl,
              resolvedService?.serviceId
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
```

El widget HTML debe conservar:

```js
applyImage(metadata.imageUrl, title);

La imagen predeterminada se utiliza cuando `metadata.imageUrl` está vacío o no existe.
