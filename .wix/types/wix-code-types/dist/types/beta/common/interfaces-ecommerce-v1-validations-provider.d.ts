declare module "interfaces-ecommerce-v1-validations-provider" {
  type BusinessError<T = unknown> = {
      __tag: 'BusinessError';
      httpCode: string;
      errorDescription: string;
      applicationCode: string;
      messageSchema: string;
      data: T;
  };
  
  interface GetValidationViolationsRequest {
      /** Information about the source of the request. */
      sourceInfo?: SourceInfo;
      /** Information to validate. */
      validationInfo?: ValidationInfo;
      /**
       * Custom field data to validate.
       * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the [app dashboard](https://dev.wix.com/dc3/my-apps/) before they can be accessed with API calls.
       * @internal
       */
      extendedFields?: ExtendedFields;
  }
  interface SourceInfo {
      /** Source of the request. */
      source?: Source;
      /**
       * __Deprecated.__ Use `purchaseFlowId` instead.
       * @internal
       * @deprecated
       */
      ecomId?: string | null;
      /** Persistent ID that correlates between the various eCommerce elements: cart, checkout, and order. */
      purchaseFlowId?: string | null;
      /** The stage at which the service plugin is called. */
      stage?: Stage;
  }
  enum Source {
      /** Context cannot be recognized */
      OTHER = "OTHER",
      /** Called from Ecom's Cart service */
      CART = "CART",
      /** Called from Ecom's Checkout service */
      CHECKOUT = "CHECKOUT"
  }
  interface Stage extends StageStagesOneOf {
      /** Supported values: */
      checkoutStage?: CheckoutStage;
  }
  /** @oneof */
  interface StageStagesOneOf {
      /** Supported values: */
      checkoutStage?: CheckoutStage;
  }
  enum CheckoutStage {
      /** Not implemented. */
      UNKNOWN_CHECKOUT_STAGE = "UNKNOWN_CHECKOUT_STAGE",
      /** Used during the initialization of the checkout (Create Checkout). */
      INITIALIZATION = "INITIALIZATION",
      /** Used during the checkout process, such as updating or retrieving the checkout. */
      IN_PROGRESS = "IN_PROGRESS",
      /** Used during the creation of an order from the checkout. */
      ORDER_CREATION = "ORDER_CREATION"
  }
  /** ValidationsData is the main entity of ValidationsSPI, which contains all the data required for validations */
  interface ValidationInfo {
      /** Buyer details. */
      buyerDetails?: BuyerDetails;
      /** Line items. Max: 300 line items */
      lineItems?: LineItem[];
      /**
       * Applied gift card details.
       *
       * >**Note:** Gift cards are supported through the Wix UI, though the service plugin is not currently available. Learn more about [Wix Gift Cards](https://support.wix.com/en/article/wix-stores-setting-up-wix-gift-cards).
       */
      giftCard?: GiftCard;
      /**
       * Weight measurement unit.
       * Default: Site's weight unit
       */
      weightUnit?: WeightUnit;
      /** Price summary. */
      priceSummary?: PriceSummary;
      /** Billing information. */
      billingInfo?: AddressWithContact;
      /** Shipping address and contact details. */
      shippingAddress?: AddressWithContact;
      /** Shipping information. */
      shippingInfo?: ShippingInfo;
      /** Custom fields. */
      customFields?: CustomFields;
      /** Applied discounts. */
      appliedDiscounts?: AppliedDiscount[];
      /**
       * References to an external app and resource associated with this checkout.
       * Used for integration and tracking across different platforms.
       * @internal
       */
      externalReference?: ExternalReference;
  }
  interface BuyerDetails {
      /** Buyer's email address. */
      email?: string | null;
      /** Contact ID if one exists. */
      contactId?: string | null;
  }
  interface LineItem {
      /** Line item ID. */
      _id?: string | null;
      /**
       * Item quantity.
       * Min: `0`
       * Max: `100000`
       */
      quantity?: number;
      /** Catalog and item reference. Includes IDs for the item and the catalog it came from, as well as further optional info. */
      catalogReference?: CatalogReference;
      /**
       * Product name. For example,
       * + Stores: `product.name`
       * + Bookings: `service.info.name`
       * + Events: `ticket.name`
       */
      productName?: ProductName;
      /** Price of the item **after** catalog-defined discount and line item discounts. */
      price?: MultiCurrencyPrice;
      /** Physical properties of the item. When relevant, contains information such as SKU, item weight, and shippability. */
      physicalProperties?: PhysicalProperties;
      /** Item type. */
      itemType?: ItemType;
      /** [Subscription option](https://dev.wix.com/api/rest/wix-stores/subscription-options/introduction) information. A subscription is a product that is sold on a recurring basis. */
      subscriptionOptionInfo?: SubscriptionOptionInfo;
      /** Price breakdown for this line item. */
      pricesBreakdown?: LineItemPricesData;
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
  interface MultiCurrencyPrice {
      /** Amount. */
      amount?: string;
      /**
       * Converted amount.
       * @readonly
       */
      convertedAmount?: string;
      /**
       * Amount formatted with currency symbol.
       * @readonly
       */
      formattedAmount?: string;
      /**
       * Converted amount formatted with currency symbol.
       * @readonly
       */
      formattedConvertedAmount?: string;
  }
  interface PhysicalProperties {
      /** Line item weight. Measurement unit matches the weight unit specified in `weightUnit` in the request. */
      weight?: number | null;
      /** Stock-keeping unit. Learn more about [SKUs](https://www.wix.com/encyclopedia/definition/stock-keeping-unit-sku). */
      sku?: string | null;
      /** Whether this line item is shippable. */
      shippable?: boolean;
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
  interface LineItemPricesData {
      /** Total price after discounts and after tax. */
      totalPriceAfterTax?: MultiCurrencyPrice;
      /** Total price after discounts, and before tax. */
      totalPriceBeforeTax?: MultiCurrencyPrice;
      /** Tax details. */
      taxDetails?: ItemTaxFullDetails;
      /** Total discount for all line items. */
      totalDiscount?: MultiCurrencyPrice;
      /** Catalog price after catalog discount and automatic discounts. */
      price?: MultiCurrencyPrice;
      /** Item price **before** line item discounts and **after** catalog-defined discount. Defaults to `price` when not provided. */
      priceBeforeDiscounts?: MultiCurrencyPrice;
      /** Total price **after** catalog-defined discount and line item discounts. */
      lineItemPrice?: MultiCurrencyPrice;
      /** Item price **before** line item discounts and **before** catalog-defined discount. Defaults to `price` when not provided. */
      fullPrice?: MultiCurrencyPrice;
  }
  interface ItemTaxFullDetails {
      /** The portion of the total amount of this estimate that was taxable. */
      taxableAmount?: MultiCurrencyPrice;
      /** Calculated tax, based on `taxable_amount`. */
      totalTax?: MultiCurrencyPrice;
      /** Indicates whether the price already includes tax. */
      isTaxIncluded?: boolean | null;
      /** A detailed description of all the tax authorities applied on this item. */
      taxBreakdown?: TaxBreakdown[];
  }
  interface TaxBreakdown {
      /** The name of the jurisdiction to which this tax detail applies. For example, "New York" or "Quebec". */
      jurisdiction?: string | null;
      /** The amount of this line item price that was considered nontaxable. (Decimal value) */
      nonTaxableAmount?: MultiCurrencyPrice;
      /** The rate at which this tax detail was calculated, e.g 0.1000 signifies 10% tax and 2.0000 signifies 200% tax. (Decimal value) */
      rate?: string | null;
      /** The amount of tax estimated for this line item. (Decimal value) */
      taxAmount?: MultiCurrencyPrice;
      /** The taxable amount of this line item. */
      taxableAmount?: MultiCurrencyPrice;
      /** The type of tax that was calculated. Depends on the jurisdiction's tax laws. For example, "Sales Tax", "Income Tax", "Value Added Tax", etc. */
      taxType?: string | null;
      /**
       * The name of the tax against which this tax amount was calculated. For example, "NY State Sales Tax", "Quebec GST", etc.
       * This name should be explicit enough to allow the merchant to understand what tax was calculated.
       */
      taxName?: string | null;
      /** The type of the jurisdiction in which this tax detail applies. */
      jurisdictionType?: JurisdictionType;
  }
  /** JurisdictionType represents the type of the jurisdiction in which this tax detail applies (e.g. Country,State,County,City,Special). */
  enum JurisdictionType {
      /** Undefined jurisdiction type. */
      UNDEFINED = "UNDEFINED",
      /** Country jurisdiction. */
      COUNTRY = "COUNTRY",
      /** State jurisdiction. */
      STATE = "STATE",
      /** County jurisdiction. */
      COUNTY = "COUNTY",
      /** City jurisdiction. */
      CITY = "CITY",
      /** Special jurisdiction. */
      SPECIAL = "SPECIAL"
  }
  interface GiftCard {
      /**
       * Gift card ID.
       * @deprecated
       */
      _id?: string;
      /** Gift card obfuscated code. */
      obfuscatedCode?: string;
      /** Gift card value. */
      amount?: MultiCurrencyPrice;
      /** App ID of the gift card provider. */
      appId?: string;
  }
  enum WeightUnit {
      /** Weight unit can't be classified, due to an error */
      UNSPECIFIED_WEIGHT_UNIT = "UNSPECIFIED_WEIGHT_UNIT",
      /** Kilograms */
      KG = "KG",
      /** Pounds */
      LB = "LB"
  }
  interface PriceSummary {
      /** Subtotal of all line items, before discounts and before tax. */
      subtotal?: MultiCurrencyPrice;
      /** Total shipping price, before discounts and before tax. */
      shipping?: MultiCurrencyPrice;
      /** Total tax. */
      tax?: MultiCurrencyPrice;
      /** Total calculated discount value. */
      discount?: MultiCurrencyPrice;
      /** Total price **after** discounts, gift cards, and tax. */
      total?: MultiCurrencyPrice;
      /** Total additional fees price **before** tax. */
      additionalFees?: MultiCurrencyPrice;
  }
  /** Billing Info and shipping details */
  interface AddressWithContact {
      /** Address. */
      address?: Address;
      /** Contact details. */
      contactDetails?: FullAddressContactDetails;
  }
  /** Physical address */
  interface Address {
      /** Two-letter country code in [ISO-3166 alpha-2](https://www.iso.org/obp/ui/#search/code/) format. */
      country?: string | null;
      /** Code for a subdivision (such as state, prefecture, or province) in [ISO 3166-2](https://www.iso.org/standard/72483.html) format. */
      subdivision?: string | null;
      /** City name. */
      city?: string | null;
      /** Postal or zip code. */
      postalCode?: string | null;
      /** Street address. */
      streetAddress?: StreetAddress;
      /** Main address line (usually street name and number). */
      addressLine1?: string | null;
      /** Free text providing more detailed address info. Usually contains apt, suite, floor. */
      addressLine2?: string | null;
      /** @internal */
      location?: AddressLocation;
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
  /** Full contact details for an address */
  interface FullAddressContactDetails {
      /** First name. */
      firstName?: string | null;
      /** Last name. */
      lastName?: string | null;
      /** Phone number. */
      phone?: string | null;
      /** Company name. */
      company?: string | null;
      /** Tax information (for Brazil only). If ID is provided, `vatId.type` must also be set, `UNSPECIFIED` is not allowed. */
      vatId?: VatId;
  }
  interface VatId {
      /** Customer's tax ID. */
      _id?: string;
      /**
       * Tax type.
       *
       * Supported values:
       * + `CPF`: for individual tax payers
       * + `CNPJ`: for corporations
       */
      type?: VatType;
  }
  /** tax info types */
  enum VatType {
      UNSPECIFIED = "UNSPECIFIED",
      /** CPF - for individual tax payers. */
      CPF = "CPF",
      /** CNPJ - for corporations */
      CNPJ = "CNPJ"
  }
  interface ShippingInfo {
      /** Selected option out of the options allowed for the `region`. */
      selectedCarrierServiceOption?: SelectedCarrierServiceOption;
  }
  interface SelectedCarrierServiceOption {
      /** Unique identifier of selected option. For example, `usps_std_overnight`. */
      code?: string;
      /**
       * Title of the option, such as USPS Standard Overnight Delivery (in the requested locale).
       * For example, "Standard" or "First-Class Package International".
       */
      title?: string;
      /** Shipping costs. */
      cost?: SelectedCarrierServiceOptionPrices;
      /**
       * Delivery solution allocations to different delivery carriers and delivery regions
       * @internal
       */
      deliveryAllocations?: DeliveryAllocation[];
      /**
       * If the delivery solution is a partial and doesn't apply to all items.
       * @internal
       */
      partial?: boolean | null;
  }
  interface SelectedCarrierServiceOptionPrices {
      /** Total shipping price, after discount and after tax. */
      totalPriceAfterTax?: MultiCurrencyPrice;
      /** Total price of shipping after discounts (when relevant), and before tax. */
      totalPriceBeforeTax?: MultiCurrencyPrice;
      /** Tax details. */
      taxDetails?: ItemTaxFullDetails;
      /** Shipping discount before tax. */
      totalDiscount?: MultiCurrencyPrice;
      /** Shipping price before discount and before tax. */
      price?: MultiCurrencyPrice;
  }
  interface DeliveryAllocation {
      /** The delivery option's carrier details, could be multiple if the delivery option is a combination of multiple carriers */
      deliveryCarrier?: Carrier;
      /** The delivery region that are relevant for this delivery solution. */
      deliveryRegion?: Region;
      /** Populated if the delivery solution is a partially supplied by this carrier. */
      applicableLineItems?: ApplicableLineItems;
  }
  interface Carrier {
      /** The carrier app id */
      appId?: string | null;
      /** Unique code that acts as an ID for a shipping rate. For example, `"usps_std_overnight"`. */
      code?: string;
  }
  interface Region {
      /** The delivery region id. */
      _id?: string | null;
      /** The delivery region name. */
      name?: string | null;
  }
  interface ApplicableLineItems {
      /** Line items that the delivery solution is for. */
      lineItemIds?: string[];
  }
  interface CustomFields {
      /** List of custom fields */
      fields?: CustomField[];
  }
  interface CustomField {
      /** Custom field value. */
      value?: any;
      /** Custom field title. */
      title?: string;
      /** Translated custom field title. */
      translatedTitle?: string | null;
  }
  interface AppliedDiscount extends AppliedDiscountDiscountSourceOneOf {
      /** Coupon details. */
      coupon?: Coupon;
      /** Merchant discount. */
      merchantDiscount?: MerchantDiscount;
      /** Discount rule. */
      discountRule?: DiscountRule;
      /** Discount type. */
      discountType?: DiscountType;
      /** IDs of the line items the discount applies to. */
      lineItemIds?: string[];
  }
  /** @oneof */
  interface AppliedDiscountDiscountSourceOneOf {
      /** Coupon details. */
      coupon?: Coupon;
      /** Merchant discount. */
      merchantDiscount?: MerchantDiscount;
      /** Discount rule. */
      discountRule?: DiscountRule;
  }
  enum DiscountType {
      /** Global discount. */
      GLOBAL = "GLOBAL",
      /** Discount for specific items. */
      SPECIFIC_ITEMS = "SPECIFIC_ITEMS",
      /** Shipping discount. */
      SHIPPING = "SHIPPING"
  }
  /** Coupon */
  interface Coupon {
      /** Coupon ID. */
      _id?: string;
      /** Coupon code. */
      code?: string;
      /** Coupon name. */
      name?: string;
      amount?: string;
  }
  interface MerchantDiscount {
      amount?: string;
  }
  interface DiscountRule {
      /** Discount rule ID. */
      _id?: string;
      /** Discount rule name. */
      name?: DiscountRuleName;
      amount?: string;
  }
  interface DiscountRuleName {
      /** Original discount rule name (in site's default language). */
      original?: string;
      /** Translated discount rule name according to buyer language. Defaults to `original` when not provided. */
      translated?: string | null;
  }
  interface ExternalReference {
      /**
       * ID of the app associated with the purchase flow.
       * For example, the Wix Pay Links app ID.
       */
      appId?: string;
      /**
       * Reference to an external resource ID. Used to link the purchase flow to a specific entity in an external system.
       * For example, a Wix Pay Link ID.
       */
      resourceId?: string | null;
  }
  interface ExtendedFields {
      /**
       * Extended field data. Each key corresponds to the namespace of the app that created the extended fields.
       * The value of each key is structured according to the schema defined when the extended fields were configured.
       *
       * You can only access fields for which you have the appropriate permissions.
       *
       * Learn more about [extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields).
       */
      namespaces?: Record<string, Record<string, any>>;
  }
  interface GetValidationViolationsResponse {
      /** List of validation violations. */
      violations?: Violation[];
  }
  interface Violation {
      /** Severity of the violation. The violations are shown on the cart and checkout pages. A warning is displayed as yellow, and allows a site visitor to proceed with caution. An error is displayed as red, and doesn't allow a site visitor to proceed with the eCommerce flow. */
      severity?: Severity;
      /** Target location on a checkout or cart page where the violation will be displayed. */
      target?: Target;
      /** Violation description. Can include rich text. Only HTTP or HTTPS links in the following format are allowed: `<a href="https://www.wix.com">Click me</a>`. */
      description?: string | null;
  }
  enum Severity {
      /** The user is allowed to move forward in the flow. */
      WARNING = "WARNING",
      /**
       * The user is blocked from moving forward in the flow.
       * For example, if callerContext is CART - moving to checkout is blocked. if callerContext is CHECKOUT, placing an order is blocked.
       */
      ERROR = "ERROR"
  }
  interface Target extends TargetTargetTypeOneOf {
      /** General (other) violation. */
      other?: Other;
      /** Specific line item violation. */
      lineItem?: TargetLineItem;
  }
  /** @oneof */
  interface TargetTargetTypeOneOf {
      /** General (other) violation. */
      other?: Other;
      /** Specific line item violation. */
      lineItem?: TargetLineItem;
  }
  /** Available locations on the webpage */
  enum NameInOther {
      /** Default location, in case no specific location is specified. */
      OTHER_DEFAULT = "OTHER_DEFAULT",
      /** Delivery section. */
      DELIVERY = "DELIVERY"
  }
  /** Available locations on the line item */
  enum NameInLineItem {
      /** Default location, in case no specific location is specified. */
      LINE_ITEM_DEFAULT = "LINE_ITEM_DEFAULT"
  }
  enum SuggestedFix {
      /** No suggested fix is specified. The user should refer to the violation description to resolve the issue. */
      UNKNOWN_SUGGESTED_FIX = "UNKNOWN_SUGGESTED_FIX",
      /** The line item should be removed from the cart or checkout to resolve the violation. */
      REMOVE_LINE_ITEM = "REMOVE_LINE_ITEM"
  }
  /** General (other) violation. */
  interface Other {
      /** Location on a checkout or a cart page where a general (other) violation will be displayed. */
      name?: NameInOther;
  }
  /** Specific line item violation. */
  interface TargetLineItem {
      /** Location on a checkout or a cart page where the specific line item violation will be displayed. */
      name?: NameInLineItem;
      /** ID of the line item containing the violation. */
      _id?: string | null;
      /**
       * Suggested fix for resolving the line item violation.
       * @internal
       */
      suggestedFix?: SuggestedFix;
  }
  interface ValidationsSPIConfig {
      /** Whether to validate the cart page in addition to the checkout page. Default: `false` */
      validateInCart?: boolean;
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
  interface GetValidationViolationsOptions {
      /** Information about the source of the request. */
      sourceInfo?: SourceInfo;
      /** Information to validate. */
      validationInfo?: ValidationInfo;
      /**
       * Custom field data to validate.
       * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the [app dashboard](https://dev.wix.com/dc3/my-apps/) before they can be accessed with API calls.
       * @internal
       */
      extendedFields?: ExtendedFields;
  }
  
  export { Address, AddressLocation, AddressWithContact, ApplicableLineItems, AppliedDiscount, AppliedDiscountDiscountSourceOneOf, BusinessError, BuyerDetails, Carrier, CatalogReference, CheckoutStage, Context, Coupon, CustomField, CustomFields, DeliveryAllocation, Description, DiscountRule, DiscountRuleName, DiscountType, ExtendedFields, ExternalReference, FreeTrialPeriod, FullAddressContactDetails, GetValidationViolationsOptions, GetValidationViolationsRequest, GetValidationViolationsResponse, GiftCard, IdentificationData, IdentificationDataIdOneOf, IdentityType, ItemTaxFullDetails, ItemType, ItemTypeItemType, ItemTypeItemTypeDataOneOf, JurisdictionType, LineItem, LineItemPricesData, MerchantDiscount, MultiCurrencyPrice, NameInLineItem, NameInOther, Other, PhysicalProperties, PriceSummary, ProductName, Region, SelectedCarrierServiceOption, SelectedCarrierServiceOptionPrices, Severity, ShippingInfo, Source, SourceInfo, Stage, StageStagesOneOf, StreetAddress, SubscriptionFrequency, SubscriptionOptionInfo, SubscriptionSettings, SuggestedFix, Target, TargetLineItem, TargetTargetTypeOneOf, TaxBreakdown, Title, ValidationInfo, ValidationsSPIConfig, VatId, VatType, Violation, WeightUnit };
}
