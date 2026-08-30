declare module "interfaces-ecommerce-v1-discounts-provider" {
  type BusinessError<T = unknown> = {
      __tag: 'BusinessError';
      httpCode: string;
      errorDescription: string;
      applicationCode: string;
      messageSchema: string;
      data: T;
  };
  
  interface GetEligibleDiscountsRequest {
      /** Line items */
      lineItems?: LineItem[];
      /** Persistent ID that correlates between the various eCommerce elements: cart, checkout, and order. */
      purchaseFlowId?: string | null;
      /** Number of coupons is limited to 1 due to limitations in Checkout. */
      couponCodes?: string[];
  }
  interface LineItem {
      /** Line item ID. */
      _id?: string;
      /** Line item quantity. */
      quantity?: number | null;
      /** Catalog and item reference info. Learn more about [integrating Wix Stores products with Wix eCommerce](https://dev.wix.com/api/rest/wix-stores/catalog/ecommerce-integration). */
      catalogReference?: CatalogReference;
      /** Line item price. */
      price?: string;
  }
  /** Used for grouping line items. Sent when an item is added to a cart, checkout, or order. */
  interface CatalogReference {
      /** ID of the item within the catalog it belongs to. */
      catalogItemId?: string;
      /**
       * ID of the app providing the catalog.
       *
       * You can get your app's ID from its page in the [Wix Dev Center](https://dev.wix.com/apps).
       *
       * For items from Wix catalogs, the following values always apply:
       * + Wix Stores: `"215238eb-22a5-4c36-9e7b-e7c08025e04e"`
       * + Wix Bookings: `"13d21c63-b5ec-5912-8397-c3a5ddb27a97"`
       * + Wix Restaurants: `"9a5d83fd-8570-482e-81ab-cfa88942ee60"`
       */
      appId?: string;
      /**
       * Additional item details in key:value pairs. Use this optional field to provide more specificity with item selection. The `options` field values differ depending on which catalog is providing the items.
       *
       * For products and variants from a Wix Stores catalog, learn more about [eCommerce integration](https://dev.wix.com/docs/rest/business-solutions/stores/catalog/e-commerce-integration).
       */
      options?: Record<string, any> | null;
  }
  interface GetEligibleDiscountsResponse {
      /** List of discounts to apply */
      discounts?: Discount[];
  }
  /** Discount */
  interface Discount extends DiscountDiscountTypeOneOf, DiscountDiscountScopesOneOf {
      /** Global discounts */
      globalDiscounts?: BaseDiscounts;
      /** Shipping discounts */
      shippingDiscounts?: BaseDiscounts;
      /** line items discounts */
      lineItemsDiscounts?: LineItemsDiscounts;
      /** Coupon options */
      couponOptions?: CouponOptions;
      /** Target type */
      targetType?: TargetType;
      /** Name */
      name?: DiscountName;
      /** external id used by the implementor */
      externalId?: string | null;
      /** Source */
      source?: DiscountSource;
  }
  /** @oneof */
  interface DiscountDiscountTypeOneOf {
      /** Global discounts */
      globalDiscounts?: BaseDiscounts;
      /** Shipping discounts */
      shippingDiscounts?: BaseDiscounts;
      /** line items discounts */
      lineItemsDiscounts?: LineItemsDiscounts;
  }
  /** @oneof */
  interface DiscountDiscountScopesOneOf {
      /** Coupon options */
      couponOptions?: CouponOptions;
  }
  enum TargetType {
      UNKNOWN_TARGET = "UNKNOWN_TARGET",
      GLOBAL = "GLOBAL",
      SHIPPING = "SHIPPING",
      LINE_ITEMS = "LINE_ITEMS"
  }
  interface DiscountName {
      /** Original discount rule name (in site's default language). */
      original?: string;
      /**
       * Translated discount rule name according to buyer language.
       *
       * Default: `original`
       */
      translated?: string | null;
  }
  interface BaseDiscounts {
      /** The rate of the discount. */
      rate?: DiscountRate;
  }
  interface DiscountRate extends DiscountRateRateOneOf {
      /** Global discounts */
      fixedAmountValue?: string;
      /** Shipping discounts */
      percentageValue?: string;
      /** Type of calculation */
      type?: Type;
  }
  /** @oneof */
  interface DiscountRateRateOneOf {
      /** Global discounts */
      fixedAmountValue?: string;
      /** Shipping discounts */
      percentageValue?: string;
  }
  enum Type {
      UNKNOWN_RATE = "UNKNOWN_RATE",
      FIXED_AMOUNT = "FIXED_AMOUNT",
      PERCENTAGE = "PERCENTAGE"
  }
  interface LineItemsDiscounts {
      /** Line items */
      lineItems?: LineItemRate[];
  }
  interface LineItemRate {
      /** The rate of the discount. */
      rate?: DiscountRate;
      /** id of the line item. */
      _id?: string;
  }
  enum DiscountSource {
      UNKNOWN_SOURCE = "UNKNOWN_SOURCE",
      COUPON = "COUPON",
      AUTOMATIC = "AUTOMATIC",
      CUSTOM = "CUSTOM"
  }
  interface CouponOptions {
      /** Coupon code, only relevant when source is coupon. */
      code?: string | null;
  }
  interface DiscountsSPIConfig {
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
  interface GetEligibleDiscountsOptions {
      /** Line items */
      lineItems?: LineItem[];
      /** Persistent ID that correlates between the various eCommerce elements: cart, checkout, and order. */
      purchaseFlowId?: string | null;
      /** Number of coupons is limited to 1 due to limitations in Checkout. */
      couponCodes?: string[];
  }
  
  export { BaseDiscounts, BusinessError, CatalogReference, Context, CouponOptions, Discount, DiscountDiscountScopesOneOf, DiscountDiscountTypeOneOf, DiscountName, DiscountRate, DiscountRateRateOneOf, DiscountSource, DiscountsSPIConfig, GetEligibleDiscountsOptions, GetEligibleDiscountsRequest, GetEligibleDiscountsResponse, IdentificationData, IdentificationDataIdOneOf, IdentityType, LineItem, LineItemRate, LineItemsDiscounts, TargetType, Type };
}
