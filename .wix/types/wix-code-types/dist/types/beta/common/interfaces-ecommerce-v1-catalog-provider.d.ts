declare module "interfaces-ecommerce-v1-catalog-provider" {
  type BusinessError<T = unknown> = {
      __tag: 'BusinessError';
      httpCode: string;
      errorDescription: string;
      applicationCode: string;
      messageSchema: string;
      data: T;
  };
  
  interface GetCatalogItemsRequest {
      /** Catalog reference details for the items to retrieve, including quantity of each item. */
      catalogReferences?: CatalogReferenceAndQuantity[];
      /**
       * Weight measurement unit.
       *
       * By default, Wix sends the weight unit specified in the site's settings.
       */
      weightUnit?: WeightUnit;
      /**
       * Currency to return item prices in, in [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format. For example, `USD` or `EUR`.
       *
       * By default, Wix sends the currency specified in the site's settings.
       */
      currency?: string;
      /**
       * The business location ID associated with the requested items.
       * Learn more about the [Locations API](https://dev.wix.com/docs/rest/business-management/locations/introduction).
       * @internal
       */
      businessLocationId?: string | null;
      /**
       * Buyer information.
       * @internal
       */
      buyerInfo?: BuyerInfo;
  }
  interface CatalogReferenceAndQuantity {
      /** Catalog and item reference info. Holds IDs for the item and the catalog it belongs to, as well as further optional details. This is identical in the request and response. */
      catalogReference?: CatalogReference;
      /** Item quantity. */
      quantity?: number;
  }
  /** Used for grouping line items. Sent when an item is added to a cart, checkout, or order. */
  interface CatalogReference {
      /** ID of the item within the catalog it belongs to. */
      catalogItemId?: string;
      /**
       * ID of the app providing the catalog.
       *
       * You can get your app's ID from its page in the [app dashboard](https://dev.wix.com/dc3/my-apps/).
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
  enum WeightUnit {
      /** Weight unit can't be classified, due to an error */
      UNSPECIFIED_WEIGHT_UNIT = "UNSPECIFIED_WEIGHT_UNIT",
      /** Kilograms */
      KG = "KG",
      /** Pounds */
      LB = "LB"
  }
  /** Buyer Info */
  interface BuyerInfo extends BuyerInfoIdOneOf {
      /**
       * Visitor ID - if the buyer is **not** a site member.
       * @readonly
       */
      visitorId?: string;
      /**
       * Member ID - if the buyer is a site member.
       * @readonly
       */
      memberId?: string;
      /**
       * User ID - if the buyer (or cart owner) is a Wix user.
       * @readonly
       */
      userId?: string;
      /** Contact ID. For more information, see [Contacts API](https://dev.wix.com/api/rest/contacts/contacts/introduction). */
      contactId?: string | null;
      /** Buyer email address. */
      email?: string | null;
  }
  /** @oneof */
  interface BuyerInfoIdOneOf {
      /**
       * Visitor ID - if the buyer is **not** a site member.
       * @readonly
       */
      visitorId?: string;
      /**
       * Member ID - if the buyer is a site member.
       * @readonly
       */
      memberId?: string;
      /**
       * User ID - if the buyer (or cart owner) is a Wix user.
       * @readonly
       */
      userId?: string;
  }
  interface GetCatalogItemsResponse {
      /**
       * Details for each item, including catalog reference details and item data. Any items that don't exist in the catalog are excluded.
       * If none of the requested items exist in the catalog, this array must be empty.
       */
      catalogItems?: Item[];
  }
  interface Item {
      /** Catalog and item reference info. Holds IDs for the item and the catalog it belongs to, as well as further optional details. This is identical in the request and response. */
      catalogReference?: CatalogReference;
      /** Item data. Contains full details about the item. */
      data?: ItemData;
  }
  interface ItemData {
      /** __Required.__ Item name. */
      productName?: ProductName;
      /**
       * URL for the item's page on the site.
       *
       * This is used to link back to the relevant item page from the cart page. If not provided, the site URL is used.
       */
      url?: string;
      /** __Required.__ Item type. Either one of the preset types or a custom type. */
      itemType?: ItemType;
      /** __Required.__ Item price with discounts applied. If a catalog-defined discount applies, the discount is reflected in this price. */
      price?: string;
      /**
       * Item price **before** applying any catalog-defined discount.
       *
       * Default: Value of `price` field, if no catalog-defined discount applies.
       */
      fullPrice?: string | null;
      /** The tax group ID associated with this item. Learn more about the [Tax Groups Service Plugin](https://dev.wix.com/docs/rest/business-management/payments/tax/tax-groups-integration-service-plugin/introduction). */
      taxGroupId?: string | null;
      /**
       * Line item description lines. Used for displaying the item in a cart, checkout or order. For example, if you want `Size: Large` to appear under the item name, create a description line with `"name": {"original": "Size"}` and  `"plainText": {"original": "Large"}`.
       *
       * Default: No description line.
       */
      descriptionLines?: DescriptionLine[];
      /**
       * Line item image details. Supports images from the [Wix Media Manager](https://support.wix.com/en/article/wix-media-accessing-the-media-manager) only.
       *
       * To use an image from another source, first upload it to the Media Manager.
       * You can retrieve the ID, width and height of an image from the Wix Media Manager.
       */
      media?: string;
      /**
       * Quantity of the item available for purchase. Only return if the catalog manages inventory.
       * If not returned, a buyer can increase the quantity of this item to add to the cart or checkout without limit.
       */
      quantityAvailable?: number | null;
      /** Physical properties of the item. Only return for physical items. When applicable, contains information such as SKU and item weight. */
      physicalProperties?: PhysicalProperties;
      /**
       * Coupon scopes. These specify which app and items a coupon applies to.
       * Should be used by Bookings, Stores, and Events in line with the current [Coupons API](https://bo.wix.com/wix-docs/rest/stores/coupons/valid-scope-values).
       * @internal
       */
      couponScopes?: Scope[];
      /** Subscription option info. */
      subscriptionOptionInfo?: SubscriptionOptionInfo;
      /**
       * ID of the fulfiller for this item. This field is internal and only used by Stores.
       * @internal
       */
      fulfillerId?: string | null;
      /**
       * Digital file details. Required if `itemType.preset` is `DIGITAL`.
       * @internal
       */
      digitalFile?: SecuredMedia;
      /**
       * Shipping group ID. This field is internal and only used by Stores.
       * @internal
       * @readonly
       */
      shippingGroupId?: string | null;
      /**
       * Payment method selected for the item.
       *
       * + `FULL_PAYMENT_ONLINE`: The entire payment for this item happens as part of the checkout.
       * + `FULL_PAYMENT_OFFLINE`: The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods.
       * + `MEMBERSHIP`: Payment for this item is done by charging a membership. When selected, `price` is `0`.
       * + `DEPOSIT_ONLINE`: Partial payment to be paid upfront during the checkout. Initial amount to be paid for each line item is specified in `depositAmount`.
       * + `MEMBERSHIP_OFFLINE`: Payment for this item can only be done by charging a membership and must be manually redeemed in the dashboard by the site admin. When selected, `price` is `0`.
       *
       * Default: `FULL_PAYMENT_ONLINE`.
       */
      paymentOption?: PaymentOptionType;
      /** Service properties. When applicable, this contains information such as time and number of participants. */
      serviceProperties?: ServiceProperties;
      /**
       * Additional ID for the item in the catalog.
       * This field provides an additional identifier for the item if your flow requires another ID as well as `catalogReference.catalogItemId`.
       * Can be used for membership validation.
       *
       * Default: Same as `catalogReference.catalogItemId`.
       */
      rootCatalogItemId?: string | null;
      /**
       * Additional description for the price. Return when additional information about the price is needed.
       *
       * For example, when `price` is `"0"` but additional details about the actual price are needed, such as `"Starts at $67"`.
       */
      priceDescription?: PriceDescription;
      /**
       * Partial payment to be paid upfront during the checkout. Return when `paymentOption` is `DEPOSIT_ONLINE`.
       *
       * Default: If `paymentOption` is `DEPOSIT_ONLINE` but `depositAmount` is not provided, the item is treated as if `paymentOption` is `FULL_PAYMENT_ONLINE`.
       */
      depositAmount?: string | null;
      /**
       * Delivery profile ID for the product.
       * @internal
       */
      deliveryProfileId?: string | null;
      /** Item payment policy that requires customer consent to complete purchase. The payment policy will be displayed on the checkout page. */
      consentRequiredPaymentPolicy?: string | null;
      /**
       * Whether the price is not yet defined, and will be updated after the order is created.
       *
       * Default: `false`
       * @internal
       */
      priceUndetermined?: boolean;
      /**
       * Whether the line item quantity is fixed and cannot be changed.
       *
       * Default: `false`
       * @internal
       */
      fixedQuantity?: boolean;
      /**
       * Whether to save the payment method on the order.
       *
       * Default: `false`
       */
      savePaymentMethod?: boolean;
      /**
       * Address to be used for tax calculation.
       * @internal
       */
      taxableAddress?: TaxableAddress;
      /**
       * ID of the app managing the inventory.
       * @internal
       */
      inventoryAppId?: string | null;
      /**
       * Policies to be displayed to the customer on the checkout page.
       * @internal
       */
      policies?: Policy[];
      /**
       * Additional Fees to be added to this item calculation.
       * @internal
       */
      additionalFees?: AdditionalFee[];
  }
  interface ProductName {
      /**
       * __Required.__ Item name in the site's default language as defined in the [request envelope](https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/backend-extensions/add-self-hosted-service-plugin-extensions#request-envelope).
       *
       * Min: 1 character.
       * Max: 200 characters.
       */
      original?: string;
      /**
       * Item name translated into the buyer's language.
       *
       * Min: 1 character.
       * Max: 400 characters.
       * Default: Same as `original`.
       */
      translated?: string | null;
  }
  interface ItemType extends ItemTypeItemTypeDataOneOf {
      /** Preset item type. */
      preset?: ItemTypeItemType;
      /** Custom item type. When none of the preset types are suitable, specifies the custom type. */
      custom?: string;
  }
  /** @oneof */
  interface ItemTypeItemTypeDataOneOf {
      /** Preset item type. */
      preset?: ItemTypeItemType;
      /** Custom item type. When none of the preset types are suitable, specifies the custom type. */
      custom?: string;
  }
  enum ItemTypeItemType {
      UNRECOGNISED = "UNRECOGNISED",
      PHYSICAL = "PHYSICAL",
      DIGITAL = "DIGITAL",
      GIFT_CARD = "GIFT_CARD",
      SERVICE = "SERVICE"
  }
  interface DescriptionLine extends DescriptionLineValueOneOf, DescriptionLineDescriptionLineValueOneOf {
      /** Description line plain text value. */
      plainText?: PlainTextValue;
      /** Description line color value. */
      colorInfo?: Color;
      /**
       * Description line plain text value.
       * @internal
       * @deprecated
       */
      plainTextValue?: PlainTextValue;
      /**
       * Description line color.
       * @internal
       * @deprecated
       */
      color?: string;
      /** Description line name. */
      name?: DescriptionLineName;
      /**
       * Description line type.
       * @internal
       * @deprecated
       */
      lineType?: DescriptionLineType;
  }
  /** @oneof */
  interface DescriptionLineValueOneOf {
      /** Description line plain text value. */
      plainText?: PlainTextValue;
      /** Description line color value. */
      colorInfo?: Color;
  }
  /** @oneof */
  interface DescriptionLineDescriptionLineValueOneOf {
      /**
       * Description line plain text value.
       * @internal
       * @deprecated
       */
      plainTextValue?: PlainTextValue;
      /**
       * Description line color.
       * @internal
       * @deprecated
       */
      color?: string;
  }
  interface DescriptionLineName {
      /** Description line name in the site's default language as defined in the [request envelope](https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/backend-extensions/add-self-hosted-service-plugin-extensions#request-envelope). */
      original?: string;
      /**
       * Description line name translated into the buyer's language.
       *
       * Default: Same as `original`.
       */
      translated?: string | null;
  }
  interface PlainTextValue {
      /** Description line plain text value in the site's default language as defined in the [request envelope](https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/backend-extensions/add-self-hosted-service-plugin-extensions#request-envelope). */
      original?: string;
      /**
       * Description line plain text value translated into the buyer's language.
       *
       * Default: Same as `original`.
       */
      translated?: string | null;
  }
  interface Color {
      /** Description line color name in the site's default language as defined in the [request envelope](https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/backend-extensions/add-self-hosted-service-plugin-extensions#request-envelope). */
      original?: string;
      /**
       * Description line color name translated into the buyer's language.
       *
       * Default: Same as `original`.
       */
      translated?: string | null;
      /** HEX or RGB color code for display. */
      code?: string | null;
  }
  enum DescriptionLineType {
      /** Unrecognized type. */
      UNRECOGNISED = "UNRECOGNISED",
      /** Plain text type. */
      PLAIN_TEXT = "PLAIN_TEXT",
      /** Color type. */
      COLOR = "COLOR"
  }
  interface PhysicalProperties {
      /** Line item weight. Measurement unit matches the weight unit specified in `weightUnit` in the request. */
      weight?: number | null;
      /** Stock-keeping unit. Learn more about [SKUs](https://www.wix.com/encyclopedia/definition/stock-keeping-unit-sku). */
      sku?: string | null;
      /** Whether this line item is shippable. */
      shippable?: boolean;
  }
  interface Scope {
      /** Scope namespace (Wix Stores, Wix Bookings, Wix Events, Wix Pricing Plans) */
      namespace?: string;
      /** Coupon scope's applied group (e.g., event or ticket in Wix Events) */
      group?: Group;
  }
  interface Group {
      /** Coupon scope's group (e.g., product or collection in Wix Stores). See [valid scope values](https://dev.wix.com/api/rest/coupons/coupons/valid-scope-values). */
      name?: string;
      /** Item ID (when the coupon scope is limited to just one item). */
      entityId?: string | null;
  }
  interface SubscriptionOptionInfo {
      /** Subscription option settings. */
      subscriptionSettings?: SubscriptionSettings;
      /** Subscription option title. */
      title?: Title;
      /** Subscription option description. */
      description?: Description;
  }
  interface SubscriptionSettings {
      /** Frequency of recurring payment. */
      frequency?: SubscriptionFrequency;
      /**
       * Interval of recurring payment.
       *
       * Default: `1`.
       * If SubscriptionFrequency is Day the minimum interval is 7
       */
      interval?: number | null;
      /** Whether subscription is renewed automatically at the end of each period. */
      autoRenewal?: boolean;
      /** Number of billing cycles before subscription ends. Ignored if `autoRenewal` is `true`. */
      billingCycles?: number | null;
      /**
       * Whether to allow the customer to cancel the subscription..
       * @internal
       */
      enableCustomerCancellation?: boolean;
      /**
       * Period until first cycle starts. If applied payNow will be 0
       * If None => no free trial
       * @internal
       */
      freeTrialPeriod?: FreeTrialPeriod;
      /**
       * The date the subscription will start. The subscription will be charged either now or according to freeTrialDays.
       * @internal
       */
      startDate?: Date | null;
      /**
       * Whether to generate an order each billing cycle. An order will always be generated for the first billing cycle.
       * Default None => will behave like true
       * @internal
       */
      generateOrderEachBillingCycle?: boolean | null;
  }
  /** Frequency unit of recurring payment */
  enum SubscriptionFrequency {
      UNDEFINED = "UNDEFINED",
      DAY = "DAY",
      WEEK = "WEEK",
      MONTH = "MONTH",
      YEAR = "YEAR"
  }
  interface FreeTrialPeriod {
      /** Frequency of priod. Values: DAY, WEEK, MONTH, YEAR */
      frequency?: SubscriptionFrequency;
      /** interval of period */
      interval?: number;
  }
  interface Title {
      /** Subscription option name in the site's default language as defined in the [request envelope](https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/backend-extensions/add-self-hosted-service-plugin-extensions#request-envelope). */
      original?: string;
      /**
       * Subscription option name translated into the buyer's language.
       *
       * Default: Same as `original`.
       */
      translated?: string | null;
  }
  interface Description {
      /** Subscription option description. */
      original?: string;
      /** Translated subscription option description. */
      translated?: string | null;
  }
  interface SecuredMedia {
      /** Media ID in Wix Media Manager. */
      _id?: string;
      /** Original filename. */
      fileName?: string;
      /** File type. */
      fileType?: FileType;
  }
  enum FileType {
      UNSPECIFIED = "UNSPECIFIED",
      SECURE_PICTURE = "SECURE_PICTURE",
      SECURE_VIDEO = "SECURE_VIDEO",
      SECURE_DOCUMENT = "SECURE_DOCUMENT",
      SECURE_MUSIC = "SECURE_MUSIC",
      SECURE_ARCHIVE = "SECURE_ARCHIVE"
  }
  /** Type of selected payment option for catalog item */
  enum PaymentOptionType {
      /** The entire payment for this item happens as part of the checkout. */
      FULL_PAYMENT_ONLINE = "FULL_PAYMENT_ONLINE",
      /** The entire payment for this item happens after checkout. For example, when using cash, check, or other offline payment methods. */
      FULL_PAYMENT_OFFLINE = "FULL_PAYMENT_OFFLINE",
      /** Payment for this item is done by charging a membership. When selected, `price` is `0`. */
      MEMBERSHIP = "MEMBERSHIP",
      /** Partial payment to be paid upfront during checkout. The initial amount to be paid for each line item is specified in `depositAmount`. */
      DEPOSIT_ONLINE = "DEPOSIT_ONLINE",
      /** Payment for this item can only be done by charging a membership and must be manually redeemed in the dashboard by the site admin. When selected, `price` is `0`. */
      MEMBERSHIP_OFFLINE = "MEMBERSHIP_OFFLINE"
  }
  interface ServiceProperties {
      /**
       * Date and time the service is to be provided, in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format.
       * For example, the start time of a class.
       */
      scheduledDate?: Date | null;
      /** The number of people participating in the service. For example, the number of people attending a class or the number of people per hotel room. */
      numberOfParticipants?: number | null;
  }
  interface PriceDescription {
      /** __Required.__ Price description in the site's default language as defined in the [request envelope](https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/backend-extensions/add-self-hosted-service-plugin-extensions#request-envelope). */
      original?: string;
      /**
       * Price description translated into the buyer's language.
       *
       * Default: Same as `original`.
       */
      translated?: string | null;
  }
  interface TaxableAddress extends TaxableAddressTaxableAddressDataOneOf {
      /** taxable address type. if this field is selected, the address is automatically resolved, and the tax is calculated accordingly. */
      addressType?: TaxableAddressType;
  }
  /** @oneof */
  interface TaxableAddressTaxableAddressDataOneOf {
      /** taxable address type. if this field is selected, the address is automatically resolved, and the tax is calculated accordingly. */
      addressType?: TaxableAddressType;
  }
  enum TaxableAddressType {
      UNKNOWN_TAXABLE_ADDRESS = "UNKNOWN_TAXABLE_ADDRESS",
      BUSINESS = "BUSINESS",
      BILLING = "BILLING",
      SHIPPING = "SHIPPING"
  }
  interface Policy {
      /** Policy title - should be translated */
      title?: string | null;
      /** Policy content - should be translated */
      content?: string;
  }
  interface AdditionalFee {
      /** Additional fee's unique code or ID. */
      code?: string | null;
      /**
       * Additional fee's name.
       *
       * Max: 50 characters
       */
      name?: string;
      /** Total additional fees. This `price` does not include any taxes that may apply to these additional fees. */
      price?: string;
      /**
       * Tax details.
       *
       * > **Note:** Tax is not calculated in the returned `price` even when `taxDetails.taxable` is `true`.
       */
      taxDetails?: TaxDetails;
      /**
       * Number of subscription cycle this fee applies to
       * default None - all billing cycle
       * @internal
       */
      subscriptionCycles?: number | null;
  }
  /** Tax details. */
  interface TaxDetails {
      /** Whether additional fee is taxable. */
      taxable?: boolean;
      /** Reserved for internal use. */
      taxGroupId?: string | null;
  }
  interface QueryCatalogItemsRequest {
      /** A list of itemIDs to filter by. If exists, the result will only include the items with the IDs passed. */
      catalogItemIds?: string[] | null;
      /** An item name to filter by. If exists, the result will only include items with name that starts with this string. */
      catalogItemName?: string | null;
      /** Paging options to limit and skip a number of items. */
      paging?: Paging;
      /**
       * Optional, if exist add filter by numericId gt last_numeric_id
       * https://dev.wix.com/api/rest/wix-stores/pagination#wix-stores_pagination_pagination
       */
      lastNumericId?: string | null;
  }
  interface Paging {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface QueryCatalogItemsResponse {
      /** Catalog info and item data. */
      catalogItems?: BasicItem[];
      /** Paging metadata. */
      metadata?: PagingMetadata;
  }
  interface BasicItem {
      /** The ID of the the item. */
      _id?: string;
      /** The name of the item. */
      name?: string;
      /**
       * Item price range - the minimum and maximum prices of all the item's variants.
       * @internal
       * @readonly
       */
      priceRange?: NumericPropertyRange;
      /** Item Media items. */
      image?: string[];
      /** The current status of the inventory */
      inStock?: boolean;
      /** current version of an item. Each time the item is modified, its `revision` changes */
      revision?: string | null;
      /**
       * True if the item has any subscription plan defined
       * @internal
       */
      isSubscription?: boolean;
      /**
       * Unique numeric ID
       * @readonly
       */
      numericId?: string | null;
  }
  interface NumericPropertyRange {
      /** Minimum value. */
      minValue?: number;
      /** Maximum value. */
      maxValue?: number;
  }
  interface PagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. */
      total?: number | null;
      /** Flag that indicates the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface CatalogSPIConfig {
      /** Configuration details for discounts applied to all items in the catalog. */
      allItemsDiscount?: AllItemsDiscountConfig;
      /** Configuration details for discounts applied to specific items in the catalog. */
      specificItemsDiscount?: SpecificItemsDiscountConfig;
  }
  /** Configuration for all items discount functionality in the catalog. */
  interface AllItemsDiscountConfig {
      /**
       * Whether the discount is enabled.
       *
       * Default: `false`.
       */
      enabled?: boolean;
      /**
       * Translation key for text to display to the site owner.
       * __Deprecated.__ Use `name` instead.
       * @internal
       * @deprecated Translation key for text to display to the site owner.
       * __Deprecated.__ Use `name` instead.
       * @replacedBy name
       * @targetRemovalDate 2024-05-01
       */
      translationKey?: string;
      /**
       * Translatable name for "all items discount" in the catalog.
       * For example, for restaurant menus, this could be "All dishes".
       */
      name?: string | null;
  }
  /** Configuration for discount functionality in the catalog. */
  interface SpecificItemsDiscountConfig {
      /**
       * Whether the discount is enabled.
       *
       * Default: `false`.
       */
      enabled?: boolean;
      /**
       * Translation key for text to display to the site owner. deprecated use name instead .
       * For example, for restaurant menus, this could be "Specific dishes".
       * @internal
       * @deprecated Translation key for text to display to the site owner. deprecated use name instead .
       * For example, for restaurant menus, this could be "Specific dishes".
       * @replacedBy name
       * @targetRemovalDate 2024-05-01
       */
      translationKey?: string;
      /** Translatable name for "all items discount" in the catalog. */
      name?: string | null;
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
  interface GetCatalogItemsOptions {
      /** Catalog reference details for the items to retrieve, including quantity of each item. */
      catalogReferences?: CatalogReferenceAndQuantity[];
      /**
       * Weight measurement unit.
       *
       * By default, Wix sends the weight unit specified in the site's settings.
       */
      weightUnit?: WeightUnit;
      /**
       * Currency to return item prices in, in [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format. For example, `USD` or `EUR`.
       *
       * By default, Wix sends the currency specified in the site's settings.
       */
      currency?: string;
      /**
       * The business location ID associated with the requested items.
       * Learn more about the [Locations API](https://dev.wix.com/docs/rest/business-management/locations/introduction).
       * @internal
       */
      businessLocationId?: string | null;
      /**
       * Buyer information.
       * @internal
       */
      buyerInfo?: BuyerInfo;
  }
  
  export { AdditionalFee, AllItemsDiscountConfig, BasicItem, BusinessError, BuyerInfo, BuyerInfoIdOneOf, CatalogReference, CatalogReferenceAndQuantity, CatalogSPIConfig, Color, Context, Description, DescriptionLine, DescriptionLineDescriptionLineValueOneOf, DescriptionLineName, DescriptionLineType, DescriptionLineValueOneOf, FileType, FreeTrialPeriod, GetCatalogItemsOptions, GetCatalogItemsRequest, GetCatalogItemsResponse, Group, IdentificationData, IdentificationDataIdOneOf, IdentityType, Item, ItemData, ItemType, ItemTypeItemType, ItemTypeItemTypeDataOneOf, NumericPropertyRange, Paging, PagingMetadata, PaymentOptionType, PhysicalProperties, PlainTextValue, Policy, PriceDescription, ProductName, QueryCatalogItemsRequest, QueryCatalogItemsResponse, Scope, SecuredMedia, ServiceProperties, SpecificItemsDiscountConfig, SubscriptionFrequency, SubscriptionOptionInfo, SubscriptionSettings, TaxDetails, TaxableAddress, TaxableAddressTaxableAddressDataOneOf, TaxableAddressType, Title, WeightUnit };
}
