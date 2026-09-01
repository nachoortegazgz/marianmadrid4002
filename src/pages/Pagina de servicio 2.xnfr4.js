/**
 * =============================================================================
 * MODULE: pages/servicio-2.js
 * VERSION: v21.1.1-stable-service-page
 * STANDARDS: G10 ASCII Strict.
 * =============================================================================
 */

import wixLocation from "wix-location";
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
  DEFAULT_TITLE: "Servicio",
  DEFAULT_SUMMARY: "Marian Madrid",
  DEFAULT_DESCRIPTION: "Detalles no disponibles.",
  DEFAULT_IMAGE_URL:
    "wix:image://v1/ab7708_374e5f7adb2f47f3944f3355da129b80~mv2.jpg/hair-salon-hd.jpg.jfif.jpg#originWidth=2048&originHeight=1143"
});

function isGuid(value) {
  const clean = String(value || "").trim();

  return clean && _looksLikeGuid(clean)
    ? clean
    : "";
}

function isSlug(value) {
  const clean = _safeSlugOrId(value || "");

  return clean && !isGuid(clean)
    ? clean
    : "";
}

function safeNumber(value, fallback = 0) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}

function safePositiveNumber(value, fallback = 0) {
  const number = safeNumber(value, fallback);

  return number >= 0
    ? number
    : fallback;
}

function safeMetadata(value) {
  return value &&
    typeof value === "object" &&
    !Array.isArray(value)
    ? value
    : {};
}

function showError(message) {
  const safeMessage = String(
    message || "No se pudo cargar el servicio."
  );

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
      "[servicio-2] Error banner unavailable:",
      error?.message || String(error)
    );
  }
}

async function resolveServiceLookup() {
  const query = wixLocation.query || {};

  const slugCandidates = [
    query.slugUrl,
    query.slug,
    query.serviceKey
  ];

  for (const candidate of slugCandidates) {
    const slugUrl = isSlug(candidate);

    if (slugUrl) {
      return {
        kind: "SLUG",
        value: slugUrl
      };
    }
  }

  const guidCandidates = [
    query.serviceId
  ];

  for (const candidate of guidCandidates) {
    const serviceId = isGuid(candidate);

    if (serviceId) {
      return {
        kind: "GUID",
        value: serviceId
      };
    }
  }

  const path = Array.isArray(wixLocation.path)
    ? wixLocation.path
    : [];

  const excludedPaths = new Set([
    "servicios",
    "service",
    "servicio",
    "servicio-2",
    "pagina-de-servicio-2"
  ]);

  const pathCandidate = isSlug(
    path[path.length - 1] || ""
  );

  if (
    pathCandidate &&
    !excludedPaths.has(pathCandidate)
  ) {
    return {
      kind: "SLUG",
      value: pathCandidate
    };
  }

  return null;
}

async function fetchServiceFromBackend(lookup) {
  if (!lookup?.value) {
    throw new Error(
      "Service lookup is required"
    );
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

  if (
    !result ||
    result.status !== "SUCCESS" ||
    !result.data
  ) {
    throw new Error(
      result?.error?.message ||
      "Service not found"
    );
  }

  const serviceId = isGuid(
    result.data.serviceId
  );

  const slugUrl = isSlug(
    result.data.slugUrl
  );

  if (!serviceId || !slugUrl) {
    throw new Error(
      "Service is missing serviceId or slugUrl"
    );
  }

  return {
    ...result.data,
    serviceId,
    slugUrl
  };
}

function buildContext(data, traceId) {
  const metadata = safeMetadata(
    data?.metadata
  );

  const serviceId = isGuid(
    data?.serviceId
  );

  const slugUrl = isSlug(
    data?.slugUrl
  );

  if (!serviceId || !slugUrl) {
    throw new Error(
      "Invalid canonical service context"
    );
  }

  const title =
    _safeTrim(
      metadata.tituloServicio ||
      metadata.titulo
    ) || CONFIG.DEFAULT_TITLE;

  const price = safePositiveNumber(
    metadata.precio ??
    metadata.pricing?.base,
    0
  );

  const duration = safePositiveNumber(
    metadata.duracionTotal ??
    metadata.timing?.estimatedTotal ??
    metadata.timing?.totalDuration,
    CONFIG.DEFAULT_DURATION_MINUTES
  );

  const location =
    _safeTrim(metadata.localizacion) ||
    CONFIG.DEFAULT_LOCATION;

  const currency =
    _safeTrim(
      metadata.pricing?.currency ||
      MONEY?.DISPLAY_CURRENCY ||
      CONFIG.DEFAULT_CURRENCY
    ) || CONFIG.DEFAULT_CURRENCY;

  const addons = Array.isArray(
    metadata.addons
  )
    ? metadata.addons
    : [];

  return {
    ...data,
    traceId,
    serviceId,
    slugUrl,
    slug: slugUrl,
    permitirCombinar: Boolean(
      data.permitirCombinar
    ),
    metadata: {
      ...metadata,
      titulo: title,
      tituloServicio: title,
      precio: price,
      duracionTotal: duration,
      localizacion: location,
      resumenCorto:
        _safeTrim(metadata.resumenCorto) ||
        CONFIG.DEFAULT_SUMMARY,
      descripcionLarga:
        _safeTrim(metadata.descripcionLarga) ||
        CONFIG.DEFAULT_DESCRIPTION,
      imageUrl:
        _safeTrim(metadata.imageUrl) ||
        CONFIG.DEFAULT_IMAGE_URL,
      addons,
      addonsPrecio: addons.map((addon) =>
        safePositiveNumber(
          addon?.precio,
          0
        )
      ),
      pricing: {
        base: price,
        currency
      },
      timing: {
        estimatedTotal: duration,
        totalDuration: duration
      }
    },
    staffOptions: Array.isArray(
      data.staffOptions
    )
      ? data.staffOptions
      : [],
    staffDisponible: Array.isArray(
      data.staffDisponible
    )
      ? data.staffDisponible
      : []
  };
}

function sanitizeAddonIds(rawAddons, service) {
  const metadata = safeMetadata(
    service?.metadata
  );

  const catalog = Array.isArray(
    metadata.addons
  )
    ? metadata.addons
    : [];

  const allowedIds = new Set(
    catalog
      .map((addon) =>
        _safeTrim(addon?.addonId)
      )
      .filter(Boolean)
  );

  const requested = Array.isArray(
    rawAddons
  )
    ? rawAddons
    : [];

  const validIds = Array.from(
    new Set(
      requested
        .map((addon) => {
          if (
            addon &&
            typeof addon === "object"
          ) {
            return _safeTrim(
              addon.addonId
            );
          }

          return _safeTrim(addon);
        })
        .filter((addonId) =>
          allowedIds.has(addonId)
        )
    )
  );

  const maxAddons = safePositiveNumber(
    BOOKINGS_ADDON_CONFIG?.MAX_PER_BOOKING,
    10
  );

  return validIds.slice(0, maxAddons);
}

function goToCalendar(service, addonIds = []) {
  const slugUrl = isSlug(
    service?.slugUrl
  );

  const serviceId = isGuid(
    service?.serviceId
  );

  if (!slugUrl || !serviceId) {
    showError(
      "No se pudo identificar el servicio para continuar."
    );
    return;
  }

  const base =
    URLS?.CALENDARIO_2 ||
    "/booking-calendar/calendario-2";

  const query = [
    `slugUrl=${encodeURIComponent(slugUrl)}`,
    `serviceId=${encodeURIComponent(serviceId)}`,
    "referral=servicio-2"
  ];

  if (addonIds.length > 0) {
    query.push(
      `addonIds=${encodeURIComponent(
        addonIds.join(",")
      )}`
    );
  }

  wixLocation.to(
    `${base}?${query.join("&")}`
  );
}

function goToServices() {
  wixLocation.to(
    URLS?.SERVICIOS ||
    "/reserva-online"
  );
}

$w.onReady(async () => {
  const traceId = makeTraceId(
    "servicio"
  );

  const widget = $w(
    "#htmlWidgetCustomService"
  );

  if (
    !widget ||
    typeof widget.postMessage !== "function"
  ) {
    showError(
      "HTML widget not found or incompatible."
    );
    return;
  }

  try {
    const lookup =
      await resolveServiceLookup();

    if (!lookup) {
      showError(
        "No se pudo localizar el servicio."
      );
      return;
    }

    let resolvedService = null;

    createWidgetBridge(widget, {
      slug: lookup.value,
      traceId,
      handshakeTimeoutMs:
        CONFIG.HANDSHAKE_TIMEOUT_MS,
      contextTimeoutMs:
        CONFIG.CONTEXT_TIMEOUT_MS,

      onContextReady: async () => {
        resolvedService =
          await fetchServiceFromBackend(
            lookup
          );

        return buildContext(
          resolvedService,
          traceId
        );
      },

      onWidgetMessage: async (message) => {
        const type = _normType(
          message?.type
        );

        const payload =
          message?.payload || {};

        if (!resolvedService) {
          showError(
            "El servicio todavía está cargando."
          );
          return;
        }

        if (
          type === _normType(
            MESSAGE_TYPES.BOOK
          )
        ) {
          const addonIds =
            sanitizeAddonIds(
              payload.addons,
              resolvedService
            );

          goToCalendar(
            resolvedService,
            addonIds
          );

          return;
        }

        if (
          type === _normType(
            MESSAGE_TYPES.NAV
          )
        ) {
          const target = String(
            payload.target || ""
          )
            .trim()
            .toUpperCase();

          if (
            target === "CALENDARIO2" ||
            target.includes("CALENDAR")
          ) {
            goToCalendar(
              resolvedService
            );
            return;
          }

          goToServices();
        }
      },

      onError: (error) => {
        showError(
          error?.message ||
          "No se pudo cargar el servicio."
        );
      }
    });
  } catch (error) {
    showError(
      error?.message ||
      "No se pudo cargar el servicio."
    );
  }
});

La imagen queda configurada como fallback cuando `metadata.imageUrl` está vacío.
