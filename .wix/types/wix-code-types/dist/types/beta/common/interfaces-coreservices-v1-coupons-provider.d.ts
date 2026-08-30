declare module "interfaces-coreservices-v1-coupons-provider" {
  type BusinessError<T = unknown> = {
      __tag: 'BusinessError';
      httpCode: string;
      errorDescription: string;
      applicationCode: string;
      messageSchema: string;
      data: T;
  };
  
  interface CouponsProvider {
  }
  interface CalculateCartRequest {
      /** The id of the cart */
      cardId?: string;
      /** The number of items in th cart */
      numberOfItems?: number;
      /** just a field */
      someonesName?: string;
      /** the time of the cart */
      someTime?: Date | null;
      complexMessage?: ComplexMessage;
  }
  interface ComplexMessage {
      a?: string;
      b?: string;
      anAddress?: Address;
      anImage?: string;
      deepMessage?: DeepMessage;
  }
  /** Physical address */
  interface Address extends AddressStreetOneOf {
      /** Street name and number. */
      streetAddress?: StreetAddress;
      /** Main address line, usually street and number as free text. */
      addressLine1?: string | null;
      /** Country code. */
      country?: string | null;
      /** Subdivision shorthand. Usually, a short code (2 or 3 letters) that represents a state, region, prefecture, or province. e.g. NY */
      subdivision?: string | null;
      /** City name. */
      city?: string | null;
      /** Zip/postal code. */
      postalCode?: string | null;
      /** Free text providing more detailed address info. Usually contains Apt, Suite, and Floor. */
      addressLine2?: string | null;
      /**
       * A string containing the full address of this location.
       * @internal
       */
      formatted?: string | null;
      /**
       * Coordinates of the physical address.
       * @internal
       */
      location?: AddressLocation;
  }
  /** @oneof */
  interface AddressStreetOneOf {
      /** Street name and number. */
      streetAddress?: StreetAddress;
      /** Main address line, usually street and number as free text. */
      addressLine?: string | null;
  }
  interface StreetAddress {
      /** Street number. */
      number?: string;
      /** Street name. */
      name?: string;
      /**
       * Apartment number.
       * @internal
       */
      apt?: string;
      /**
       * Optional address line 1
       * @internal
       */
      formattedAddressLine?: string | null;
  }
  interface AddressLocation {
      /** Address latitude. */
      latitude?: number | null;
      /** Address longitude. */
      longitude?: number | null;
  }
  interface Subdivision {
      /** Short subdivision code. */
      code?: string;
      /** Subdivision full name. */
      name?: string;
      /**
       * Subdivision level
       * @internal
       */
      type?: SubdivisionType;
      /**
       * Free text description of subdivision type.
       * @internal
       */
      typeInfo?: string | null;
      /**
       * Standard organizations details (e.g. ISO).
       * @internal
       */
      standardDetails?: StandardDetails;
  }
  enum SubdivisionType {
      UNKNOWN_SUBDIVISION_TYPE = "UNKNOWN_SUBDIVISION_TYPE",
      /** State */
      ADMINISTRATIVE_AREA_LEVEL_1 = "ADMINISTRATIVE_AREA_LEVEL_1",
      /** County */
      ADMINISTRATIVE_AREA_LEVEL_2 = "ADMINISTRATIVE_AREA_LEVEL_2",
      /** City/town */
      ADMINISTRATIVE_AREA_LEVEL_3 = "ADMINISTRATIVE_AREA_LEVEL_3",
      /** Neighborhood/quarter */
      ADMINISTRATIVE_AREA_LEVEL_4 = "ADMINISTRATIVE_AREA_LEVEL_4",
      /** Street/block */
      ADMINISTRATIVE_AREA_LEVEL_5 = "ADMINISTRATIVE_AREA_LEVEL_5",
      /** ADMINISTRATIVE_AREA_LEVEL_0. Indicates the national political entity, and is typically the highest order type returned by the Geocoder. */
      COUNTRY = "COUNTRY"
  }
  /** Subdivision Concordance values */
  interface StandardDetails {
      /** subdivision iso-3166-2 code according to [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2). e.g. US-NY, GB-SCT, NO-30 */
      iso31662?: string | null;
  }
  interface DeepMessage {
      a?: string;
  }
  interface CalculateCartResponse {
      /** The id of the cart */
      cardId?: string;
      /** The number of items in th cart */
      numberOfItems?: number;
      /** just a field */
      someonesName?: string;
      /** the time of the cart */
      someTime?: Date | null;
      complexMessage?: ComplexMessage;
  }
  interface TypeNotSupportedError {
      /** The received type that is not supported by the service */
      type?: string;
  }
  interface ReserveCouponRequest {
  }
  interface ReserveCouponResponse {
  }
  interface RedeemCouponRequest {
  }
  interface RedeemCouponResponse {
  }
  interface ExtendCouponRequest {
  }
  interface ExtendCouponResponse {
  }
  interface CouponsProviderConfig {
      /** specific field related to this SPI */
      supportedCouponTypes?: string[];
      /** feature toggle initialized with default value = false. should be true if implemented by spi provider */
      toggleExtendCouponEnabled?: boolean;
  }
  /**
   * this message is not directly used by any service,
   * it exists to describe the expected parameters that SHOULD be provided to invoked Velo methods as part of open-platform.
   * e.g. SPIs, event-handlers, etc..
   * NOTE: this context object MUST be provided as the last argument in each Velo method signature.
   *
   * Example:
   * ```typescript
   * export function wixStores_onOrderCanceled({ event, metadata }: OrderCanceledEvent) {
   * ...
   * }
   * ```
   */
  interface Context {
      /** A unique identifier of the request. You may print this ID to your logs to help with future debugging and easier correlation with Wix's logs. */
      requestId?: string | null;
      /** [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) 3-letter currency code. */
      currency?: string | null;
      /** An object that describes the identity that triggered this request. */
      identity?: IdentificationData;
      /** A string representing a language and region in the format of `"xx-XX"`. First 2 letters represent the language code according to ISO 639-1. This is followed by a dash "-", and then a by 2 capital letters representing the region according to ISO 3166-2. For example, `"en-US"`. */
      languages?: string[];
      /** The service provider app's instance ID. */
      instanceId?: string | null;
      /**
       * Extension ID in Dev Center.
       * @internal
       */
      appExtensionId?: string | null;
      /**
       * Extension type in Dev Center.
       * @internal
       */
      appExtensionType?: string | null;
      /**
       * Invoked function.
       * @internal
       */
      functionName?: string | null;
  }
  enum IdentityType {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  interface IdentificationData extends IdentificationDataIdOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: IdentityType;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  interface CalculateCartOptions {
      /** The id of the cart */
      cardId?: string;
      /** The number of items in th cart */
      numberOfItems?: number;
      /** just a field */
      someonesName?: string;
      /** the time of the cart */
      someTime?: Date | null;
      complexMessage?: ComplexMessage;
  }
  
  function couponNotSupportedError(data: TypeNotSupportedError): BusinessError<TypeNotSupportedError>;
  
  const calculateCartSpiErrors_d_couponNotSupportedError: typeof couponNotSupportedError;
  namespace calculateCartSpiErrors_d {
    export {
      calculateCartSpiErrors_d_couponNotSupportedError as couponNotSupportedError,
    };
  }
  
  namespace spiErrorHelpers_d {
    export {
      calculateCartSpiErrors_d as calculateCart,
    };
  }
  
  export { Address, AddressLocation, AddressStreetOneOf, BusinessError, CalculateCartOptions, CalculateCartRequest, CalculateCartResponse, ComplexMessage, Context, CouponsProvider, CouponsProviderConfig, DeepMessage, ExtendCouponRequest, ExtendCouponResponse, IdentificationData, IdentificationDataIdOneOf, IdentityType, RedeemCouponRequest, RedeemCouponResponse, ReserveCouponRequest, ReserveCouponResponse, StandardDetails, StreetAddress, Subdivision, SubdivisionType, TypeNotSupportedError, spiErrorHelpers_d as errorHelpers };
}
