declare module "interfaces-ecommerce-v1-payment-settings-provider" {
  type BusinessError<T = unknown> = {
      __tag: 'BusinessError';
      httpCode: string;
      errorDescription: string;
      applicationCode: string;
      messageSchema: string;
      data: T;
  };
  
  interface GetPaymentSettingsRequest {
      /** Order. */
      order?: Order;
  }
  interface Order {
      /**
       * Order ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Order number displayed in the site owner's dashboard (auto-generated).
       * @readonly
       */
      number?: string;
      /**
       * Date and time the order was created in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the order was last updated in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Order line items.
       * @readonly
       */
      lineItems?: OrderLineItem[];
      /** Buyer information. */
      buyerInfo?: V1BuyerInfo;
      /** Order payment status. */
      paymentStatus?: PaymentStatus;
      /**
       * Order fulfillment status.
       * @readonly
       */
      fulfillmentStatus?: FulfillmentStatus;
      /**
       * Language for communication with the buyer. Defaults to the site language.
       * For a site that supports multiple languages, this is the language the buyer selected.
       */
      buyerLanguage?: string | null;
      /** Weight measurement unit - defaults to site's weight unit. */
      weightUnit?: WeightUnit;
      /** Currency used for the pricing of this order in [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) format. */
      currency?: string | null;
      /** Whether tax is included in line item prices. */
      taxIncludedInPrices?: boolean;
      /**
       * Site language in which original values are shown.
       * @readonly
       */
      siteLanguage?: string | null;
      /**
       * Order price summary.
       * @readonly
       */
      priceSummary?: PriceSummary;
      /** Billing address and contact details. */
      billingInfo?: ApiAddressWithContact;
      /** Shipping info and selected shipping option details. */
      shippingInfo?: V1ShippingInformation;
      /** [Buyer note](https://support.wix.com/en/article/wix-stores-viewing-buyer-notes) left by the customer. */
      buyerNote?: string | null;
      /** Order status. */
      status?: OrderStatus;
      /** Whether order is archived. */
      archived?: boolean | null;
      /**
       * Tax summary.
       * Deprecated. Use `taxInfo` instead.
       * This field will be removed on September 30, 2024.
       * @deprecated Tax summary.
       * Deprecated. Use `taxInfo` instead.
       * This field will be removed on September 30, 2024.
       * @replacedBy tax_info
       * @targetRemovalDate 2024-09-30
       */
      taxSummary?: TaxSummary;
      /** Tax information. */
      taxInfo?: OrderTaxInfo;
      /** Applied discounts. */
      appliedDiscounts?: AppliedDiscount[];
      /**
       * Order activities.
       * @readonly
       */
      activities?: Activity[];
      /** Order attribution source. */
      attributionSource?: AttributionSource;
      /**
       * ID of the order's initiator.
       * @readonly
       */
      createdBy?: V1CreatedBy;
      /** Information about the sales channel that submitted this order. */
      channelInfo?: ChannelInfo;
      /** Whether a human has seen the order. Set when an order is clicked on in the dashboard. */
      seenByAHuman?: boolean | null;
      /** Checkout ID. */
      checkoutId?: string | null;
      /** Custom fields. */
      customFields?: CustomField[];
      /**
       * Cart ID - required by TYP OOI for legacy orders.
       * @internal
       */
      cartId?: string | null;
      /**
       * Private API flag that allows using read-only "id" during order creation.
       * @internal
       */
      isInternalOrderCreate?: boolean;
      /**
       * Pay now price summary. Part of price_summary that must be payed at checkout
       * @internal
       * @readonly
       */
      payNow?: PriceSummary;
      /**
       * Balance summary.
       * @readonly
       */
      balanceSummary?: BalanceSummary;
      /** Additional fees applied to the order. */
      additionalFees?: AdditionalFee[];
      /**
       * Custom string status values aggregated from every fulfillment entity associated with current order
       * @internal
       * @readonly
       */
      fulfillmentStatusesAggregate?: FulfillmentStatusesAggregate;
      /**
       * Custom field data for the order object.
       *
       * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the app dashboard before they can be accessed with API calls.
       */
      extendedFields?: ExtendedFields;
      /** Persistent ID that correlates between the various eCommerce elements: cart, checkout, and order. */
      purchaseFlowId?: string | null;
      /**
       * Order recipient address and contact details.
       *
       * This field may differ from the address in `shippingInfo.logistics` when:
       * + The chosen shipping option is pickup point or store pickup.
       * + No shipping option is selected.
       */
      recipientInfo?: ApiAddressWithContact;
      /**
       * Tag ids collections associated with current entity. private_tags requires separate permissions to be accessible and modifiable.
       * @internal
       */
      tags?: Tags;
      /**
       * Date and time the order was originally purchased in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format.
       * Used for migration from external systems.
       */
      purchasedDate?: Date | null;
      /**
       * Order Location
       * @internal
       */
      businessLocation?: Location;
  }
  interface OrderLineItem {
      /** Line item ID. */
      _id?: string;
      /**
       * Item name.
       * + Stores - `product.name`
       * + Bookings - `service.info.name`
       * + Events - `ticket.name`
       */
      productName?: ProductName;
      /**
       * References to the line item's origin catalog.
       * This field may be empty in the case of a custom line item.
       */
      catalogReference?: CatalogReference;
      /** Line item quantity. */
      quantity?: number;
      /**
       * Total discount for this line item's entire quantity.
       * @readonly
       */
      totalDiscount?: Price;
      /** Line item description lines. Used for display purposes for the cart, checkout and order. */
      descriptionLines?: DescriptionLine[];
      /** Line item image. */
      image?: string;
      /** Physical properties of the item. When relevant, contains information such as SKU and item weight. */
      physicalProperties?: PhysicalProperties;
      /** Item type. Either a preset type or custom. */
      itemType?: ItemType;
      /**
       * Fulfiller ID. Field is empty when the line item is self-fulfilled.
       * To get fulfillment information, pass the order ID to [List Fulfillments For Single Order](https://dev.wix.com/docs/rest/api-reference/wix-e-commerce/order-fulfillments/list-fulfillments-for-single-order).
       */
      fulfillerId?: string | null;
      /** Number of items that were refunded. */
      refundQuantity?: number | null;
      /** Number of items restocked. */
      restockQuantity?: number | null;
      /** Line item price after line item discounts for display purposes. */
      price?: Price;
      /**
       * Line item price before line item discounts for display purposes. Defaults to `price` when not provided.
       * @readonly
       */
      priceBeforeDiscounts?: Price;
      /**
       * Total price after discounts, and before tax.
       * @readonly
       */
      totalPriceBeforeTax?: Price;
      /**
       * Total price after all discounts and tax.
       * @readonly
       */
      totalPriceAfterTax?: Price;
      /**
       * Type of selected payment option for current item. Defaults to `FULL_PAYMENT_ONLINE`.
       * + `FULL_PAYMENT_ONLINE` - The entire payment for this item happens as part of the checkout.
       * + `FULL_PAYMENT_OFFLINE` - The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods.
       * + `MEMBERSHIP` - Payment for this item is done by charging a membership. When this option is used, `lineItem.price.amount` is 0.
       * + `DEPOSIT_ONLINE` - Partial payment for the given item to be paid upfront during the checkout. Eligible for catalog items with type `DEPOSIT_ONLINE` only.
       */
      paymentOption?: PaymentOptionType;
      /**
       * Deprecated. Use `taxInfo` instead.
       * This field will be removed on September 30, 2024.
       * Tax details for this line item.
       * @deprecated Deprecated. Use `taxInfo` instead.
       * This field will be removed on September 30, 2024.
       * Tax details for this line item.
       * @replacedBy tax_info
       * @targetRemovalDate 2024-09-30
       */
      taxDetails?: ItemTaxFullDetails;
      /** Represents all the relevant tax details for a specific line item. */
      taxInfo?: LineItemTaxInfo;
      /** Digital file identifier, relevant only for items with type DIGITAL. */
      digitalFile?: DigitalFile;
      /** Subscription info. */
      subscriptionInfo?: SubscriptionInfo;
      /** Additional description for the price. For example, when price is 0 but additional details about the actual price are needed - "Starts at $67". */
      priceDescription?: PriceDescription;
      /**
       * Item's price amount to be charged during checkout. Relevant for items with a `paymentOption` value of `"DEPOSIT_ONLINE"`.
       * @readonly
       */
      depositAmount?: Price;
      /**
       * The Item's Delivery Profile Id
       * @internal
       */
      deliveryProfileId?: string | null;
      /** @internal */
      shippingGroupId?: string | null;
      /**
       * Source locations for this line item. The location's total quantity must not exceed the line item quantity.
       * @internal
       */
      locations?: LocationAndQuantity[];
      /**
       * Total price **after** catalog discounts and line item discounts.
       * @internal
       */
      lineItemPrice?: Price;
      /**
       * Whether the line item is a custom line item. Custom line items don't trigger the Catalog service plugin.
       * @internal
       * @readonly
       */
      customLineItem?: boolean | null;
      /**
       * In cases where `catalogReference.catalogItemId` is NOT the actual catalog item ID, this field will return the true item's ID.
       * + For example, for Wix Bookings, `catalogReference.catalogItemId` is the booking ID. Therefore this value is set to the service ID.
       * + In most cases, this field has the same value as `catalogReference.catalogItemId`.
       * @internal
       * @readonly
       */
      rootCatalogItemId?: string | null;
      /**
       * Address used for tax calculation.
       * @internal
       */
      taxableAddress?: TaxableAddress;
      /**
       * ID of the app managing the inventory.
       * @internal
       */
      inventoryAppId?: string | null;
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
       * Custom extended fields for the line item object.
       *
       * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the app dashboard before they can be accessed with API calls.
       * @internal
       */
      extendedFields?: ExtendedFields;
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
  interface Price {
      /** Amount. */
      amount?: string;
      /**
       * Amount formatted with currency symbol.
       * @readonly
       */
      formattedAmount?: string;
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
  interface FocalPoint {
      /** X-coordinate of the focal point. */
      x?: number;
      /** Y-coordinate of the focal point. */
      y?: number;
      /** crop by height */
      height?: number | null;
      /** crop by width */
      width?: number | null;
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
  interface ItemTaxFullDetails {
      /** Taxable amount of this line item. */
      taxableAmount?: Price;
      /**
       * ID of the item's tax group, if specified.
       * @internal
       */
      taxGroupId?: string | null;
      /** Tax rate percentage, as a decimal numeral between 0 and 1. For example, `"0.13"`. */
      taxRate?: string;
      /** The calculated tax, based on the `taxableAmount` and `taxRate`. */
      totalTax?: Price;
  }
  interface LineItemTaxInfo {
      /** Calculated tax, based on `taxable_amount` and `tax_rate`. */
      taxAmount?: Price;
      /** Amount for which tax is calculated. */
      taxableAmount?: Price;
      /** Tax rate %, as a decimal point. */
      taxRate?: string | null;
      /**
       * Tax group ID.
       * Learn more about [Tax Groups](https://dev.wix.com/docs/rest/business-management/payments/tax/tax-groups/introduction).
       */
      taxGroupId?: string | null;
      /** Indicates whether the price already includes tax. */
      taxIncludedInPrice?: boolean;
      /** Tax information for a line item. */
      taxBreakdown?: LineItemTaxBreakdown[];
  }
  /**
   * TaxBreakdown represents tax information for a line item.
   * It holds the tax amount and the tax rate for each tax authority that apply on the line item.
   */
  interface LineItemTaxBreakdown {
      /** Jurisdiction that taxes were calculated for. For example, "New York", or "Quebec". */
      jurisdiction?: string | null;
      /** Tax rate used for this jurisdiction, as a decimal. For example, 10% tax is 0.1000. */
      rate?: string | null;
      /** Amount of tax calculated for this line item. */
      taxAmount?: Price;
      /** The type of tax that was calculated. Depends on the jurisdiction's tax laws. For example, "Sales Tax", "Income Tax", "Value Added Tax", etc. */
      taxType?: string | null;
      /**
       * The name of the tax against which this tax amount was calculated. For example, "NY State Sales Tax", "Quebec GST", etc.
       * This name should be explicit enough to allow the merchant to understand what tax was calculated.
       */
      taxName?: string | null;
      /** Type of jurisdiction that taxes were calculated for. */
      jurisdictionType?: JurisdictionType;
      /** Non-taxable amount of the line item price. */
      nonTaxableAmount?: Price;
      /** Taxable amount of the line item price. */
      taxableAmount?: Price;
  }
  /** JurisdictionType represents the type of the jurisdiction in which this tax detail applies (e.g. Country,State,County,City,Special). */
  enum JurisdictionType {
      UNDEFINED = "UNDEFINED",
      COUNTRY = "COUNTRY",
      STATE = "STATE",
      COUNTY = "COUNTY",
      CITY = "CITY",
      SPECIAL = "SPECIAL"
  }
  interface DigitalFile {
      /** ID of the secure file in media. */
      fileId?: string;
      /** Link will exist after the digital links have been generated on the order. */
      link?: string | null;
      /**
       * Link expiration time and date.
       * @readonly
       */
      expirationDate?: Date | null;
  }
  interface SubscriptionInfo {
      /** Subscription ID. */
      _id?: string | null;
      /** Subscription cycle. For example, if this order is for the 3rd cycle of a subscription, value will be `3`. */
      cycleNumber?: number;
      /** Subscription option title. For example, `"Monthly coffee Subscription"`. */
      subscriptionOptionTitle?: string;
      /** Subscription option description. For example, `"1kg of selected coffee, once a month"`. */
      subscriptionOptionDescription?: string | null;
      /** Subscription detailed information. */
      subscriptionSettings?: SubscriptionSettings;
  }
  interface SubscriptionSettings {
      /** Frequency of recurring payment. */
      frequency?: SubscriptionFrequency;
      /** Interval of recurring payment. */
      interval?: number | null;
      /** Whether subscription is renewed automatically at the end of each period. */
      autoRenewal?: boolean;
      /** Number of billing cycles before subscription ends. Ignored if `autoRenewal: true`. */
      billingCycles?: number | null;
      /**
       * Whether to allow the customer to cancel the subscription.
       * @internal
       */
      enableCustomerCancellation?: boolean;
  }
  /** Frequency unit of recurring payment */
  enum SubscriptionFrequency {
      UNDEFINED = "UNDEFINED",
      DAY = "DAY",
      WEEK = "WEEK",
      MONTH = "MONTH",
      YEAR = "YEAR"
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
  interface LocationAndQuantity {
      /** Location id in the associated owner app. */
      _id?: string;
      /** Location owner app, if not provided then the site business info locations will be used. */
      appId?: string | null;
      /** Quantity for specific location. */
      quantity?: number;
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
  /** Buyer Info */
  interface V1BuyerInfo extends V1BuyerInfoIdOneOf {
      /** Visitor ID (if site visitor is not a member). */
      visitorId?: string;
      /** Member ID (if site visitor is a site member). */
      memberId?: string;
      /** Contact ID. Auto-created if one does not yet exist. For more information, see [Contacts API](https://dev.wix.com/api/rest/contacts/contacts/introduction). */
      contactId?: string | null;
      /** Buyer email address. */
      email?: string | null;
  }
  /** @oneof */
  interface V1BuyerInfoIdOneOf {
      /** Visitor ID (if site visitor is not a member). */
      visitorId?: string;
      /** Member ID (if site visitor is a site member). */
      memberId?: string;
  }
  enum PaymentStatus {
      UNSPECIFIED = "UNSPECIFIED",
      /**
       * `NOT_PAID` can apply to an order made online, but not yet paid. In such cases `order.status` will be `INITIALIZED`.
       * This status also applies when an offline order needs to be manually marked as paid. In such cases `order.status` will be `APPROVED`.
       */
      NOT_PAID = "NOT_PAID",
      /** All required payments associated with this order are paid. */
      PAID = "PAID",
      /** Order partially refunded, but the refunded amount is less than the order's total price. See `order.balanceSummary` for more details. */
      PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
      /** Order fully refunded. Refund amount equals total price. See `order.balanceSummary` for more details. */
      FULLY_REFUNDED = "FULLY_REFUNDED",
      /**
       * All payments pending.
       *
       * This can happen with two-step payments, when a payment requires manual review, or when a payment is in progress and will be concluded shortly.
       * Learn more about [pending orders](https://support.wix.com/en/article/pending-orders).
       */
      PENDING = "PENDING",
      /** At least one payment received and approved, but it covers less than the order's total price. See `order.balanceSummary` for more details. */
      PARTIALLY_PAID = "PARTIALLY_PAID",
      /**
       * Payment received, but not yet confirmed by the payment provider.
       *
       * In most cases, when a payment provider is holding payment it's because setup hasn't been successfully completed by the merchant/site owner.
       * To solve this, the merchant/site owner should log in to the payment provider's dashboard and make sure their account is set up correctly, or contact their support for further assistance.
       * @documentationMaturity preview
       */
      PENDING_MERCHANT = "PENDING_MERCHANT",
      /**
       * One or more payments canceled.
       * @documentationMaturity preview
       */
      CANCELED = "CANCELED",
      /**
       * One or more payments declined.
       * @documentationMaturity preview
       */
      DECLINED = "DECLINED"
  }
  enum FulfillmentStatus {
      /** None of the order items are fulfilled or the order was manually marked as unfulfilled. */
      NOT_FULFILLED = "NOT_FULFILLED",
      /**
       * All of the order items are fulfilled or the order was manually marked as fulfilled.
       * Orders without shipping info are fulfilled automatically.
       */
      FULFILLED = "FULFILLED",
      /** Some, but not all, of the order items are fulfilled. */
      PARTIALLY_FULFILLED = "PARTIALLY_FULFILLED"
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
      /** Subtotal of all the line items, before discounts and before tax. */
      subtotal?: Price;
      /** Total shipping price, before discounts and before tax. */
      shipping?: Price;
      /** Total tax on this order. */
      tax?: Price;
      /** Total calculated discount value. */
      discount?: Price;
      /**
       * Deprecated - use `total` instead.
       * @internal
       * @deprecated
       */
      totalPrice?: Price;
      /** Order’s total price after discounts and tax. */
      total?: Price;
      /**
       * Order's total price including gift card.
       * @internal
       * @deprecated
       */
      totalWithGiftCard?: Price;
      /**
       * Order's total price after without gift card.
       * @internal
       * @deprecated
       */
      totalWithoutGiftCard?: Price;
      /** Total price of additional fees before tax. */
      totalAdditionalFees?: Price;
  }
  /** Billing Info and shipping details */
  interface ApiAddressWithContact {
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
      /**
       * Country's full name.
       * @readonly
       */
      countryFullname?: string | null;
      /**
       * Subdivision full-name.
       * @readonly
       */
      subdivisionFullname?: string | null;
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
  interface V1ShippingInformation {
      /** App Def Id of external provider which was a source of shipping info */
      carrierId?: string | null;
      /** Unique code (or ID) of selected shipping option. For example, `"usps_std_overnight"`. */
      code?: string | null;
      /**
       * Shipping option title.
       * For example, `"USPS Standard Overnight Delivery"`, `"Standard"` or `"First-Class Package International"`.
       */
      title?: string;
      /** Shipping logistics. */
      logistics?: DeliveryLogistics;
      /** Shipping costs. */
      cost?: ShippingPrice;
      /** Shipping region. */
      region?: ShippingRegion;
  }
  interface DeliveryLogistics extends DeliveryLogisticsAddressOneOf {
      /** Shipping address and contact details. */
      shippingDestination?: ApiAddressWithContact;
      /** Pickup details. */
      pickupDetails?: PickupDetails;
      /** Expected delivery time in free text. For example, `"3-5 business days"`. */
      deliveryTime?: string | null;
      /** Instructions for carrier. For example, `"Please knock on the door. If unanswered, please call contact number. Thanks."`. */
      instructions?: string | null;
      /**
       * Deprecated - Latest expected delivery date and time in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format.
       * @deprecated
       */
      deliverByDate?: Date | null;
      /** Expected delivery time. */
      deliveryTimeSlot?: DeliveryTimeSlot;
  }
  /** @oneof */
  interface DeliveryLogisticsAddressOneOf {
      /** Shipping address and contact details. */
      shippingDestination?: ApiAddressWithContact;
      /** Pickup details. */
      pickupDetails?: PickupDetails;
  }
  interface PickupDetails {
      /** Pickup address. */
      address?: PickupAddress;
      /** Pickup method */
      pickupMethod?: PickupMethod;
  }
  /** Physical address */
  interface PickupAddress {
      /** Two-letter country code in [ISO-3166 alpha-2](https://www.iso.org/obp/ui/#search/code/) format. */
      country?: string | null;
      /** Code for a subdivision (such as state, prefecture, or province) in [ISO 3166-2](https://www.iso.org/standard/72483.html) format. */
      subdivision?: string | null;
      /** City name. */
      city?: string | null;
      /** Postal or zip code. */
      postalCode?: string | null;
      /** Street address object, with number, name, and apartment number in separate fields. */
      streetAddress?: StreetAddress;
      /** Main address line (usually street name and number). */
      addressLine1?: string | null;
      /** Free text providing more detailed address info. Usually contains apt, suite, floor. */
      addressLine2?: string | null;
      /**
       * Country's full name.
       * @readonly
       */
      countryFullname?: string | null;
      /**
       * Subdivision full-name.
       * @readonly
       */
      subdivisionFullname?: string | null;
      /** @internal */
      location?: AddressLocation;
  }
  enum PickupMethod {
      UNKNOWN_METHOD = "UNKNOWN_METHOD",
      STORE_PICKUP = "STORE_PICKUP",
      PICKUP_POINT = "PICKUP_POINT"
  }
  interface DeliveryTimeSlot {
      /** Delivery slot starting time. */
      from?: Date | null;
      /** Delivery slot ending time. */
      to?: Date | null;
  }
  interface ShippingPrice {
      /** Shipping price for display purposes. */
      price?: Price;
      /**
       * Total price of shipping after discounts (when relevant), and before tax.
       * @readonly
       */
      totalPriceBeforeTax?: Price;
      /**
       * Shipping price after all discounts (if any exist), and after tax.
       * @readonly
       */
      totalPriceAfterTax?: Price;
      /** Tax details. */
      taxDetails?: ItemTaxFullDetails;
      /**
       * Shipping discount before tax.
       * @readonly
       */
      discount?: Price;
  }
  interface ShippingRegion {
      /** Name of shipping region. For example, `"Metropolitan London"`, or `"Outer Melbourne suburbs"`. */
      name?: string | null;
  }
  enum OrderStatus {
      /** Order created, but not yet approved or canceled. */
      INITIALIZED = "INITIALIZED",
      /**
       * Order approved.
       *
       * This happens when either an online payment is received **or** when `order.priceSummary.total = 0` (a zero-total order).
       * Offline orders (cash payment) are automatically approved.
       */
      APPROVED = "APPROVED",
      /** Order canceled by the user. */
      CANCELED = "CANCELED",
      /**
       * Order pending.
       * @documentationMaturity preview
       */
      PENDING = "PENDING",
      /**
       * Order rejected.
       *
       * This happens when pending payments fail.
       * @documentationMaturity preview
       */
      REJECTED = "REJECTED"
  }
  interface TaxSummary {
      /**
       * Total tax.
       * @readonly
       */
      totalTax?: Price;
      /**
       * manual tax rate
       * @internal
       * @readonly
       */
      manualTaxRate?: string | null;
  }
  interface OrderTaxInfo {
      /** Calculated tax, added from line items. */
      totalTax?: Price;
      /** The summary of the tax breakdown for all the line items. It will hold for each tax name, the aggregated tax amount paid for it and the tax rate. */
      taxBreakdown?: OrderTaxBreakdown[];
      /**
       * Manual tax rate
       * @internal
       * @readonly
       */
      manualTaxRate?: string | null;
      /**
       * Whether the order is exempt from tax calculations.
       *
       * Default: `false`
       * @readonly
       */
      taxExempt?: boolean | null;
  }
  /**
   * The summary of the tax breakdown for all the line items. It will hold for each tax name, the aggregated tax amount paid for it and the tax rate.
   * Tax breakdown is the tax amount split to the tax authorities that applied on the line item.
   */
  interface OrderTaxBreakdown {
      /** The name of the tax against which this tax amount was calculated. */
      taxName?: string;
      /** The type of tax that was calculated. Depends on the company's nexus settings as well as the jurisdiction's tax laws. */
      taxType?: string;
      /** The name of the jurisdiction in which this tax detail applies. */
      jurisdiction?: string;
      /** The type of the jurisdiction in which this tax detail applies (e.g. Country,State,County,City,Special). */
      jurisdictionType?: JurisdictionType;
      /** The rate at which this tax detail was calculated. */
      rate?: string;
      /** The sum of all the tax from line items that calculated by the tax identifiers. */
      aggregatedTaxAmount?: Price;
      /**
       * The sum of all the taxable amount from line items for tax identifiers.
       * @internal
       */
      aggregatedTaxableAmount?: Price;
  }
  interface AppliedDiscount extends AppliedDiscountDiscountSourceOneOf {
      /** Applied coupon info. */
      coupon?: Coupon;
      /** Merchant discount. */
      merchantDiscount?: MerchantDiscount;
      /** Automatic Discount */
      discountRule?: DiscountRule;
      /**
       * Discount type.
       * * `"GLOBAL"` - discount applies to entire order.
       * * `"SPECIFIC-ITEMS"` - discount applies to specific items.
       * * `"SHIPPING"` - discount applies to shipping. For example, free shipping.
       */
      discountType?: DiscountType;
      /**
       * IDs of line items discount applies to.
       * Deprecated. Use `line_item_discounts` instead.
       * @deprecated IDs of line items discount applies to.
       * Deprecated. Use `line_item_discounts` instead.
       * @replacedBy line_item_discounts
       * @targetRemovalDate 2024-10-30
       */
      lineItemIds?: string[];
      /** Discount id. */
      _id?: string | null;
      /**
       * Line items the discount applies to.
       * @internal
       */
      lineItemDiscounts?: LineItemDiscount[];
  }
  /** @oneof */
  interface AppliedDiscountDiscountSourceOneOf {
      /** Applied coupon info. */
      coupon?: Coupon;
      /** Merchant discount. */
      merchantDiscount?: MerchantDiscount;
      /** Automatic Discount */
      discountRule?: DiscountRule;
  }
  enum DiscountType {
      GLOBAL = "GLOBAL",
      SPECIFIC_ITEMS = "SPECIFIC_ITEMS",
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
      /** Coupon value. */
      amount?: Price;
  }
  interface MerchantDiscount extends MerchantDiscountMerchantDiscountReasonOneOf {
      /**
       * Pre-defined discount reason (optional).
       * * `"ITEMS_EXCHANGE"` - exchange balance acquired as a result of items exchange.
       */
      discountReason?: DiscountReason;
      /** Discount description as free text (optional). */
      description?: string | null;
      /** Discount amount. */
      amount?: Price;
      /**
       * Discount percentage.
       * @internal
       */
      percentage?: string | null;
  }
  /** @oneof */
  interface MerchantDiscountMerchantDiscountReasonOneOf {
      /**
       * Pre-defined discount reason (optional).
       * * `"ITEMS_EXCHANGE"` - exchange balance acquired as a result of items exchange.
       */
      discountReason?: DiscountReason;
      /** Discount description as free text (optional). */
      description?: string | null;
  }
  enum DiscountReason {
      UNSPECIFIED = "UNSPECIFIED",
      EXCHANGED_ITEMS = "EXCHANGED_ITEMS"
  }
  interface DiscountRule {
      /** Discount rule ID */
      _id?: string;
      /** Discount rule name */
      name?: DiscountRuleName;
      /** Discount value. */
      amount?: Price;
  }
  interface DiscountRuleName {
      /** Original discount rule name (in site's default language). */
      original?: string;
      /** Translated discount rule name according to buyer language. Defaults to `original` when not provided. */
      translated?: string | null;
  }
  interface LineItemDiscount {
      /** ID of line item the discount applies to. */
      _id?: string;
      /** Total discount for this line item. */
      totalDiscount?: Price;
  }
  interface Activity extends ActivityContentOneOf {
      /** Custom activity details (optional). `activity.type` must be `CUSTOM_ACTIVITY`. */
      customActivity?: CustomActivity;
      /** Merchant comment details (optional). `activity.type` must be `MERCHANT_COMMENT`. */
      merchantComment?: MerchantComment;
      /** Additional info about order refunded activity (optional). `activity.type` must be `ORDER_REFUNDED`. */
      orderRefunded?: OrderRefunded;
      /**
       * Details of the original order for this exchange order. `activity.type` must be `ORDER_CREATED_FROM_EXCHANGE`.
       * @internal
       */
      orderCreatedFromExchange?: OrderCreatedFromExchange;
      /**
       * Details of an order that was created as a result of an exchange of items in this order. `activity.type` must be `NEW_EXCHANGE_ORDER_CREATED`.
       * @internal
       */
      newExchangeOrderCreated?: NewExchangeOrderCreated;
      /**
       * Details of changes made by the Draft Orders API.
       * @internal
       */
      draftOrderChangesApplied?: DraftOrderChangesApplied;
      /**
       * Details of the payment method saved for order
       * @internal
       */
      savedPaymentMethod?: SavedPaymentMethod;
      /**
       * Details of an authorized payment created.
       * @internal
       */
      authorizedPaymentCreated?: AuthorizedPaymentCreated;
      /**
       * Details of an authorized payment captured.
       * @internal
       */
      authorizedPaymentCaptured?: AuthorizedPaymentCaptured;
      /**
       * Details of an authorized payment voided.
       * @internal
       */
      authorizedPaymentVoided?: AuthorizedPaymentVoided;
      /**
       * Details of an initiated refund process.
       *
       * > **Note:** A single `refund_initiated` activity can result in multiple `payment_refunded` or `payment_refund_failed` activities.
       * > In these cases, the `refund_id` will be identical across the activities.
       * @internal
       */
      refundInitiated?: RefundInitiated;
      /**
       * Details of a refunded payment.
       *
       * > **Note:** A single `refund_initiated` activity can result in multiple `payment_refunded` or `payment_refund_failed` activities.
       * > In these cases, the `refund_id` will be identical across the activities.
       * @internal
       */
      paymentRefunded?: PaymentRefunded;
      /**
       * Details of a failed payment refund.
       *
       * > **Note:** A single `refund_initiated` activity can result in multiple `payment_refunded` or `payment_refund_failed` activities.
       * > In these cases, the `refund_id` will be identical across the activities.
       * @internal
       */
      paymentRefundFailed?: PaymentRefundFailed;
      /**
       * Details of refund to store credit.
       * @internal
       */
      refundedAsStoreCredit?: RefundedAsStoreCredit;
      /**
       * Details of a pending payment
       * @internal
       */
      paymentPending?: PaymentPending;
      /**
       * Details of a canceled payment
       * @internal
       */
      paymentCanceled?: PaymentCanceled;
      /**
       * Details of a declined payment
       * @internal
       */
      paymentDeclined?: PaymentDeclined;
      /**
       * Activity ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Activity author's email.
       * @readonly
       */
      authorEmail?: string | null;
      /**
       * Activity creation date and time.
       * @readonly
       */
      _createdDate?: Date | null;
      /** Activity type. */
      type?: ActivityType;
  }
  /** @oneof */
  interface ActivityContentOneOf {
      /** Custom activity details (optional). `activity.type` must be `CUSTOM_ACTIVITY`. */
      customActivity?: CustomActivity;
      /** Merchant comment details (optional). `activity.type` must be `MERCHANT_COMMENT`. */
      merchantComment?: MerchantComment;
      /** Additional info about order refunded activity (optional). `activity.type` must be `ORDER_REFUNDED`. */
      orderRefunded?: OrderRefunded;
      /**
       * Details of the original order for this exchange order. `activity.type` must be `ORDER_CREATED_FROM_EXCHANGE`.
       * @internal
       */
      orderCreatedFromExchange?: OrderCreatedFromExchange;
      /**
       * Details of an order that was created as a result of an exchange of items in this order. `activity.type` must be `NEW_EXCHANGE_ORDER_CREATED`.
       * @internal
       */
      newExchangeOrderCreated?: NewExchangeOrderCreated;
      /**
       * Details of changes made by the Draft Orders API.
       * @internal
       */
      draftOrderChangesApplied?: DraftOrderChangesApplied;
      /**
       * Details of the payment method saved for order
       * @internal
       */
      savedPaymentMethod?: SavedPaymentMethod;
      /**
       * Details of an authorized payment created.
       * @internal
       */
      authorizedPaymentCreated?: AuthorizedPaymentCreated;
      /**
       * Details of an authorized payment captured.
       * @internal
       */
      authorizedPaymentCaptured?: AuthorizedPaymentCaptured;
      /**
       * Details of an authorized payment voided.
       * @internal
       */
      authorizedPaymentVoided?: AuthorizedPaymentVoided;
      /**
       * Details of an initiated refund process.
       *
       * > **Note:** A single `refund_initiated` activity can result in multiple `payment_refunded` or `payment_refund_failed` activities.
       * > In these cases, the `refund_id` will be identical across the activities.
       * @internal
       */
      refundInitiated?: RefundInitiated;
      /**
       * Details of a refunded payment.
       *
       * > **Note:** A single `refund_initiated` activity can result in multiple `payment_refunded` or `payment_refund_failed` activities.
       * > In these cases, the `refund_id` will be identical across the activities.
       * @internal
       */
      paymentRefunded?: PaymentRefunded;
      /**
       * Details of a failed payment refund.
       *
       * > **Note:** A single `refund_initiated` activity can result in multiple `payment_refunded` or `payment_refund_failed` activities.
       * > In these cases, the `refund_id` will be identical across the activities.
       * @internal
       */
      paymentRefundFailed?: PaymentRefundFailed;
      /**
       * Details of refund to store credit.
       * @internal
       */
      refundedAsStoreCredit?: RefundedAsStoreCredit;
      /**
       * Details of a pending payment
       * @internal
       */
      paymentPending?: PaymentPending;
      /**
       * Details of a canceled payment
       * @internal
       */
      paymentCanceled?: PaymentCanceled;
      /**
       * Details of a declined payment
       * @internal
       */
      paymentDeclined?: PaymentDeclined;
  }
  interface CustomActivity {
      /** ID of the app that created the custom activity. */
      appId?: string;
      /** Custom activity type. For example, `"Ticket number set"`. */
      type?: string;
      /** Additional data in key-value form. For example, `{ "Ticket number": "123456" }`. */
      additionalData?: Record<string, string>;
  }
  /** Store owner added a comment */
  interface MerchantComment {
      /** Merchant comment message. */
      message?: string;
  }
  interface OrderRefunded {
      /** Whether order was refunded manually. For example, via payment provider or using cash. */
      manual?: boolean;
      /** Refund amount. */
      amount?: Price;
      /** Reason for refund. */
      reason?: string;
  }
  interface OrderCreatedFromExchange {
      /** ID of the original order for which the exchange happened. */
      originalOrderId?: string;
  }
  interface NewExchangeOrderCreated {
      /** ID of the new order created as a result of an exchange of items. */
      exchangeOrderId?: string;
      /** IDs of the items that were exchanged. */
      lineItems?: LineItemExchangeData[];
  }
  interface LineItemExchangeData {
      /** ID of the exchanged line item. */
      lineItemId?: string;
      /** Line item quantity being exchanged. */
      quantity?: number;
  }
  interface DraftOrderChangesApplied {
      /** Draft order id. */
      draftOrderId?: string;
      /** Reason for edit, given by user (optional). */
      reason?: string | null;
      /** Changes applied to order. */
      changes?: OrderChange[];
  }
  interface OrderChange extends OrderChangeValueOneOf {
      lineItemChanged?: LineItemChanges;
      lineItemAdded?: ManagedLineItem;
      lineItemRemoved?: ManagedLineItem;
      discountAdded?: ManagedDiscount;
      discountRemoved?: ManagedDiscount;
      additionalFeeAdded?: ManagedAdditionalFee;
      additionalFeeRemoved?: ManagedAdditionalFee;
      totalPriceChanged?: TotalPriceChange;
      shippingInformationChanged?: ShippingInformationChange;
  }
  /** @oneof */
  interface OrderChangeValueOneOf {
      lineItemChanged?: LineItemChanges;
      lineItemAdded?: ManagedLineItem;
      lineItemRemoved?: ManagedLineItem;
      discountAdded?: ManagedDiscount;
      discountRemoved?: ManagedDiscount;
      additionalFeeAdded?: ManagedAdditionalFee;
      additionalFeeRemoved?: ManagedAdditionalFee;
      totalPriceChanged?: TotalPriceChange;
      shippingInformationChanged?: ShippingInformationChange;
  }
  interface LineItemChanges {
      /** Line item ID. */
      _id?: string;
      /** Item name. */
      name?: ProductName;
      /** Item quantity change. */
      quantity?: LineItemQuantityChange;
      /** Item price change. */
      price?: LineItemPriceChange;
  }
  interface LineItemQuantityChange {
      /** Item quantity before update. */
      originalQuantity?: number;
      /** Item quantity after update. */
      newQuantity?: number;
      /** Difference between original and new quantity. Absolute value. */
      diff?: number;
      /** Type of quantity change: increase or decrease. */
      deltaType?: LineItemQuantityChangeType;
  }
  enum LineItemQuantityChangeType {
      /** Quantity increased. */
      QUANTITY_INCREASED = "QUANTITY_INCREASED",
      /** Quantity decreased. */
      QUANTITY_DECREASED = "QUANTITY_DECREASED"
  }
  interface LineItemPriceChange {
      /** Item price before update. */
      originalPrice?: Price;
      /** Item price after update. */
      newPrice?: Price;
  }
  interface ManagedLineItem {
      /** Line item ID. */
      _id?: string;
      /** Item name. */
      name?: ProductName;
      /** Added or removed item quantity. */
      quantity?: number;
  }
  interface ManagedDiscount {
      /** Discount id. */
      _id?: string;
      /** Discount name: coupon name / discount rule name / merchant discount description. */
      name?: TranslatedValue;
      /** Line items discount applies to. */
      affectedLineItems?: LineItemAmount[];
      /** Discount amount. */
      totalAmount?: Price;
  }
  interface TranslatedValue {
      /** Value in site default language. */
      original?: string;
      /** Translated value. */
      translated?: string | null;
  }
  interface LineItemAmount {
      /** Order line item id */
      _id?: string;
      /** Item name. */
      name?: ProductName;
      /** Amount associated with this item. (Discount amount for item / additional fee amount for item) */
      amount?: Price;
  }
  interface ManagedAdditionalFee {
      /** Additional fee id. */
      _id?: string;
      /** Additional fee name. */
      name?: TranslatedValue;
      /** Line items additional fee applies to. */
      affectedLineItems?: LineItemAmount[];
      /** Additional fee amount. */
      totalAmount?: Price;
  }
  interface TotalPriceChange {
      /** Order’s total price after discounts and tax. Before update */
      originalTotal?: Price;
      /** Order’s total price after discounts and tax. After update */
      newTotal?: Price;
  }
  interface ShippingInformationChange {
      /** Order’s Shipping Information. Before update */
      originalShippingInfo?: ShippingInformation;
      /** Order’s Shipping Information. After update */
      newShippingInfo?: ShippingInformation;
  }
  interface ShippingInformation {
      /** Order’s shipping price. */
      total?: Price;
      /** Order’s shipping title. */
      shippingTitle?: string;
  }
  /** Payment method is saved for order */
  interface SavedPaymentMethod {
      /** Payment method name */
      name?: string;
      /** Payment method description */
      description?: string | null;
  }
  interface AuthorizedPaymentCreated {
      /** Payment ID of payment associated with this activity */
      paymentId?: string;
      /** Payment amount */
      amount?: Price;
      /** The last 4 digits of the card number. */
      lastFourDigits?: string | null;
      /** Card issuer's brand. */
      brand?: string | null;
  }
  interface AuthorizedPaymentCaptured {
      /** Payment ID of payment associated with this activity */
      paymentId?: string;
      /** Payment amount */
      amount?: Price;
      /** The last 4 digits of the card number. */
      lastFourDigits?: string | null;
      /** Card issuer's brand. */
      brand?: string | null;
  }
  interface AuthorizedPaymentVoided {
      /** Payment ID of payment associated with this activity */
      paymentId?: string;
      /** Payment amount */
      amount?: Price;
      /** The last 4 digits of the card number. */
      lastFourDigits?: string | null;
      /** Card issuer's brand. */
      brand?: string | null;
  }
  interface RefundInitiated {
      /** Refund ID. */
      refundId?: string;
      /** Refund amount. */
      amount?: Price;
      /** Details about the payments being refunded. */
      payments?: RefundedPayment[];
      /** Reason for refund. */
      reason?: string | null;
  }
  interface RefundedPayment extends RefundedPaymentKindOneOf {
      /** Regular payment refund. */
      regular?: RegularPaymentRefund;
      /** Gift card payment refund. */
      giftCard?: GiftCardPaymentRefund;
      /** Membership payment refund. */
      membership?: MembershipPaymentRefund;
      /** Payment ID. */
      paymentId?: string;
      /** Whether refund was made externally and manually on the payment provider's side. */
      externalRefund?: boolean;
  }
  /** @oneof */
  interface RefundedPaymentKindOneOf {
      /** Regular payment refund. */
      regular?: RegularPaymentRefund;
      /** Gift card payment refund. */
      giftCard?: GiftCardPaymentRefund;
      /** Membership payment refund. */
      membership?: MembershipPaymentRefund;
  }
  interface RegularPaymentRefund {
      /** Refund amount */
      amount?: Price;
      /** The last 4 digits of the card number. */
      lastFourDigits?: string | null;
      /** Card issuer's brand. */
      brand?: string | null;
  }
  interface GiftCardPaymentRefund {
      /** Gift card payment ID */
      giftCardPaymentId?: string | null;
      /** Refund amount */
      amount?: Price;
  }
  interface MembershipPaymentRefund {
      /** Membership ID */
      membershipId?: string | null;
  }
  interface PaymentRefunded {
      /** Refund ID. */
      refundId?: string;
      /** Details about the refunded payment. */
      payment?: RefundedPayment;
  }
  interface PaymentRefundFailed {
      /** Refund ID. */
      refundId?: string;
      /** Details about the failed payment refund. */
      payment?: RefundedPayment;
  }
  interface RefundedAsStoreCredit {
      /** Refund amount */
      amount?: Price;
      /** Reason for refund */
      reason?: string | null;
  }
  interface PaymentPending extends PaymentPendingPaymentDetailsOneOf {
      /** Regular payment. */
      regular?: RegularPayment;
      /** Payment ID of payment associated with this activity */
      paymentId?: string;
  }
  /** @oneof */
  interface PaymentPendingPaymentDetailsOneOf {
      /** Regular payment. */
      regular?: RegularPayment;
  }
  interface RegularPayment extends RegularPaymentPaymentMethodDetailsOneOf {
      /** Whether regular card used */
      creditCardDetails?: CreditCardDetails;
      /** Payment amount */
      amount?: Price;
  }
  /** @oneof */
  interface RegularPaymentPaymentMethodDetailsOneOf {
      /** Whether regular card used */
      creditCardDetails?: CreditCardDetails;
  }
  interface CreditCardDetails {
      /** The last 4 digits of the card number. */
      lastFourDigits?: string | null;
      /** Card issuer's brand. */
      brand?: string | null;
  }
  interface PaymentCanceled extends PaymentCanceledPaymentDetailsOneOf {
      /** Regular payment. */
      regular?: RegularPayment;
      /** Payment ID of payment associated with this activity */
      paymentId?: string;
  }
  /** @oneof */
  interface PaymentCanceledPaymentDetailsOneOf {
      /** Regular payment. */
      regular?: RegularPayment;
  }
  interface PaymentDeclined extends PaymentDeclinedPaymentDetailsOneOf {
      /** Regular payment. */
      regular?: RegularPayment;
      /** Payment ID of payment associated with this activity */
      paymentId?: string;
  }
  /** @oneof */
  interface PaymentDeclinedPaymentDetailsOneOf {
      /** Regular payment. */
      regular?: RegularPayment;
  }
  enum ActivityType {
      ORDER_REFUNDED = "ORDER_REFUNDED",
      ORDER_PLACED = "ORDER_PLACED",
      ORDER_PAID = "ORDER_PAID",
      ORDER_FULFILLED = "ORDER_FULFILLED",
      ORDER_NOT_FULFILLED = "ORDER_NOT_FULFILLED",
      ORDER_CANCELED = "ORDER_CANCELED",
      DOWNLOAD_LINK_SENT = "DOWNLOAD_LINK_SENT",
      TRACKING_NUMBER_ADDED = "TRACKING_NUMBER_ADDED",
      TRACKING_NUMBER_EDITED = "TRACKING_NUMBER_EDITED",
      TRACKING_LINK_ADDED = "TRACKING_LINK_ADDED",
      SHIPPING_CONFIRMATION_EMAIL_SENT = "SHIPPING_CONFIRMATION_EMAIL_SENT",
      INVOICE_ADDED = "INVOICE_ADDED",
      INVOICE_REMOVED = "INVOICE_REMOVED",
      INVOICE_SENT = "INVOICE_SENT",
      FULFILLER_EMAIL_SENT = "FULFILLER_EMAIL_SENT",
      SHIPPING_ADDRESS_EDITED = "SHIPPING_ADDRESS_EDITED",
      EMAIL_EDITED = "EMAIL_EDITED",
      PICKUP_READY_EMAIL_SENT = "PICKUP_READY_EMAIL_SENT",
      CUSTOM_ACTIVITY = "CUSTOM_ACTIVITY",
      MERCHANT_COMMENT = "MERCHANT_COMMENT",
      ORDER_CREATED_FROM_EXCHANGE = "ORDER_CREATED_FROM_EXCHANGE",
      NEW_EXCHANGE_ORDER_CREATED = "NEW_EXCHANGE_ORDER_CREATED",
      ORDER_PARTIALLY_PAID = "ORDER_PARTIALLY_PAID",
      DRAFT_ORDER_CHANGES_APPLIED = "DRAFT_ORDER_CHANGES_APPLIED",
      SAVED_PAYMENT_METHOD = "SAVED_PAYMENT_METHOD",
      AUTHORIZED_PAYMENT_CREATED = "AUTHORIZED_PAYMENT_CREATED",
      AUTHORIZED_PAYMENT_CAPTURED = "AUTHORIZED_PAYMENT_CAPTURED",
      AUTHORIZED_PAYMENT_VOIDED = "AUTHORIZED_PAYMENT_VOIDED",
      REFUND_INITIATED = "REFUND_INITIATED",
      PAYMENT_REFUNDED = "PAYMENT_REFUNDED",
      PAYMENT_REFUND_FAILED = "PAYMENT_REFUND_FAILED",
      REFUNDED_AS_STORE_CREDIT = "REFUNDED_AS_STORE_CREDIT",
      /** @documentationMaturity preview */
      PAYMENT_PENDING = "PAYMENT_PENDING",
      /** @documentationMaturity preview */
      PAYMENT_CANCELED = "PAYMENT_CANCELED",
      /** @documentationMaturity preview */
      PAYMENT_DECLINED = "PAYMENT_DECLINED",
      /** @documentationMaturity preview */
      ORDER_PENDING = "ORDER_PENDING",
      /** @documentationMaturity preview */
      ORDER_REJECTED = "ORDER_REJECTED"
  }
  enum AttributionSource {
      UNSPECIFIED = "UNSPECIFIED",
      FACEBOOK_ADS = "FACEBOOK_ADS"
  }
  interface V1CreatedBy extends V1CreatedByStringOneOf {
      /**
       * User ID - when the order was created by a Wix user on behalf of a buyer.
       * For example, via POS (point of service).
       */
      userId?: string;
      /** Member ID - when the order was created by a **logged in** site visitor. */
      memberId?: string;
      /** Visitor ID - when the order was created by a site visitor that was **not** logged in. */
      visitorId?: string;
      /** App ID - when the order was created by an external application. */
      appId?: string;
  }
  /** @oneof */
  interface V1CreatedByStringOneOf {
      /**
       * User ID - when the order was created by a Wix user on behalf of a buyer.
       * For example, via POS (point of service).
       */
      userId?: string;
      /** Member ID - when the order was created by a **logged in** site visitor. */
      memberId?: string;
      /** Visitor ID - when the order was created by a site visitor that was **not** logged in. */
      visitorId?: string;
      /** App ID - when the order was created by an external application. */
      appId?: string;
  }
  interface ChannelInfo {
      /** Sales channel that submitted the order. */
      type?: ChannelType;
      /** Reference to an order ID from an external system. */
      externalOrderId?: string | null;
      /** URL to the order in the external system. */
      externalOrderUrl?: string | null;
  }
  enum ChannelType {
      /** Unspecified sales channel. This value is not supported. */
      UNSPECIFIED = "UNSPECIFIED",
      /** A web client. */
      WEB = "WEB",
      /** [Point of sale solutions](https://support.wix.com/en/wix-mobile-pos-2196395). */
      POS = "POS",
      /** [eBay shop](https://support.wix.com/en/article/wix-stores-connecting-and-setting-up-an-ebay-shop). */
      EBAY = "EBAY",
      /** [Amazon shop](https://support.wix.com/en/article/wix-stores-connecting-and-setting-up-an-amazon-shop). */
      AMAZON = "AMAZON",
      /** Other sales platform. */
      OTHER_PLATFORM = "OTHER_PLATFORM",
      /** [Wix Owner app](https://support.wix.com/article/wix-owner-app-an-overview). */
      WIX_APP_STORE = "WIX_APP_STORE",
      /** Wix Invoices app in [your dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Finvoices/settings/general-settings) */
      WIX_INVOICES = "WIX_INVOICES",
      /** Wix merchant backoffice. */
      BACKOFFICE_MERCHANT = "BACKOFFICE_MERCHANT",
      /** Wish sales channel. */
      WISH = "WISH",
      /** [ClassPass sales channel](https://support.wix.com/en/article/wix-bookings-letting-clients-book-your-services-with-classpass). */
      CLASS_PASS = "CLASS_PASS",
      /** Global-E sales channel. */
      GLOBAL_E = "GLOBAL_E",
      /** [Facebook shop](https://support.wix.com/en/article/wix-stores-changes-to-facebook-shops). */
      FACEBOOK = "FACEBOOK",
      /** [Etsy sales channel](https://support.wix.com/en/article/wix-stores-request-adding-etsy-as-a-sales-channel). */
      ETSY = "ETSY",
      /** [TikTok sales channel](https://support.wix.com/en/article/wix-stores-request-adding-tiktok-as-a-sales-channel). */
      TIKTOK = "TIKTOK",
      /** [Faire marketplace integration](https://support.wix.com/en/article/wix-stores-creating-a-faire-store-using-the-faire-integration-app). */
      FAIRE_COM = "FAIRE_COM"
  }
  interface CustomField {
      /** Custom field value. */
      value?: any;
      /** Custom field title. */
      title?: string;
      /** Translated custom field title. */
      translatedTitle?: string | null;
  }
  interface BalanceSummary {
      /**
       * Current amount left to pay.
       * @readonly
       */
      balance?: Balance;
      /**
       * Sum of all approved and successful payments.
       *
       * The value includes payments that have subsequently been fully or partially refunded.
       * @readonly
       */
      paid?: Price;
      /**
       * Sum of all successfully refunded payments.
       * @readonly
       */
      refunded?: Price;
      /**
       * Sum of all authorized payments.
       * @readonly
       */
      authorized?: Price;
      /**
       * Sum of all pending refund transactions.
       * @internal
       * @readonly
       */
      pendingRefund?: Price;
      /**
       * Sum of all pending transactions.
       * @readonly
       */
      pending?: Price;
  }
  /**
   * Order balance. Reflects amount left to be paid on order and is calculated dynamically. Can be negative per balance definition.
   * `amount` field depends on order payment status:
   * + UNSPECIFIED, NOT_PAID: price_summary.total_price
   * + PARTIALLY_PAID : price_summary.total_price - pay_now.total_price
   * + PENDING, REFUNDED, PARTIALLY_REFUNDED, PAID : 0
   */
  interface Balance {
      /**
       * Balance amount.
       *
       * A negative `amount` represents the amount to be refunded. This can happen due to overcharging or the order being modified after a payment has been made.
       * @readonly
       */
      amount?: string;
      /**
       * Amount formatted with currency symbol.
       * @readonly
       */
      formattedAmount?: string;
  }
  interface AdditionalFee {
      /** Additional fee's unique code for future processing. */
      code?: string | null;
      /** Name of additional fee. */
      name?: string;
      /** Additional fee's price. */
      price?: Price;
      /** Tax details. */
      taxDetails?: ItemTaxFullDetails;
      /** SPI implementer's `appId`. */
      providerAppId?: string | null;
      /** Additional fee's price before tax. */
      priceBeforeTax?: Price;
      /** Additional fee's price after tax. */
      priceAfterTax?: Price;
      /** Additional fee's id. */
      _id?: string;
      /**
       * Optional - Line items associated with this additional fee.
       * If no `lineItemIds` are provided, the fee will be associated with the whole cart/checkout/order.
       */
      lineItemIds?: string[];
  }
  interface FulfillmentStatusesAggregate {
      /** Unique string values based on Fulfillment entities statuses */
      statuses?: string[] | null;
  }
  /**
   * Common object for tags.
   * Should be use as in this example:
   * message Foo {
   * string id = 1;
   * ...
   * Tags tags = 5
   * }
   *
   * example of taggable entity
   * {
   * id: "123"
   * tags: {
   * tags: {
   * tag_ids:["11","22"]
   * },
   * private_tags: {
   * tag_ids: ["33", "44"]
   * }
   * }
   * }
   */
  interface Tags {
      /** Tags that require an additional permission in order to access them, normally not given to site members or visitors. */
      privateTags?: TagList;
      /** Tags that are exposed to anyone who has access to the labeled entity itself, including site members and visitors. */
      tags?: TagList;
  }
  interface TagList {
      /** List of tag IDs */
      tagIds?: string[];
  }
  interface Location {
      /**
       * Location ID.
       * Learn more about the [Wix Locations API](https://dev.wix.com/docs/rest/business-management/locations/introduction).
       */
      _id?: string;
      /**
       * Location name.
       * @readonly
       */
      name?: string;
  }
  interface GetPaymentSettingsResponse {
      /** Retrieved payment settings. */
      paymentSettings?: PaymentSettings;
  }
  interface PaymentSettings {
      /**
       * Whether to apply [3D Secure](https://support.wix.com/en/article/about-3d-secure-3ds-payments-with-third-party-payment-providers) during the payment process.
       *
       * > __Note:__
       * > + Not all payment providers offer this feature in their Wix integration.
       * > + If the service plugin call fails, the value set in the [extension configuration](https://dev.wix.com/docs/rest/api-reference/wix-e-commerce/payment-settings-integration-spi/introduction#configuration) for `fallbackValueForRequires3dSecure` will be used.
       */
      requires3dSecure?: boolean | null;
  }
  interface GetPaymentSettingsForCheckoutRequest {
      /** Checkout. */
      checkout?: Checkout;
  }
  interface Checkout {
      /**
       * Checkout ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Line items.
       *
       * Max: 300 items
       * @readonly
       */
      lineItems?: LineItem[];
      /** Billing information. */
      billingInfo?: AddressWithContact;
      /** Shipping information. */
      shippingInfo?: ShippingInfo;
      /** [Buyer note](https://support.wix.com/en/article/wix-stores-viewing-buyer-notes) left by the customer. */
      buyerNote?: string | null;
      /** Buyer information. */
      buyerInfo?: BuyerInfo;
      /**
       * All converted prices are displayed in this currency in three-letter [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
       * @readonly
       */
      conversionCurrency?: string;
      /**
       * Calculated price summary for the checkout.
       * @readonly
       */
      priceSummary?: V1PriceSummary;
      /**
       * Errors when calculating totals.
       * @readonly
       */
      calculationErrors?: CalculationErrors;
      /**
       * Applied gift card details.
       *
       * >**Note:** Gift cards are supported through the Wix UI, though the service plugin is not currently available. Learn more about [Wix Gift Cards](https://support.wix.com/en/article/wix-stores-setting-up-wix-gift-cards).
       * @readonly
       */
      giftCard?: GiftCard;
      /**
       * Applied discounts.
       * @readonly
       */
      appliedDiscounts?: V1AppliedDiscount[];
      /** Custom fields. */
      customFields?: CustomField[];
      /**
       * Weight measurement unit - defaults to site's weight unit.
       * @readonly
       */
      weightUnit?: WeightUnit;
      /**
       * Tax summary.
       * @readonly
       */
      taxSummary?: V1TaxSummary;
      /**
       * The currency used when submitting the order.
       * @readonly
       */
      currency?: string;
      /**
       * Sales channel that submitted the order.
       * @readonly
       */
      channelType?: ChannelType;
      /**
       * Site language in which original values are shown.
       * @readonly
       */
      siteLanguage?: string;
      /**
       * Language for communication with the buyer. Defaults to the site language.
       * For a site that supports multiple languages, this is the language the buyer selected.
       * @readonly
       */
      buyerLanguage?: string;
      /**
       * Whether an order was successfully created from this checkout.
       * For an order to be successful, it must be successfully paid for (unless the total is 0).
       * @readonly
       */
      completed?: boolean;
      /**
       * Whether tax is included in line item prices.
       * @readonly
       */
      taxIncludedInPrice?: boolean;
      /**
       * ID of the checkout's initiator.
       * @readonly
       */
      createdBy?: CreatedBy;
      /**
       * Date and time the checkout was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the checkout was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Minimal amount to pay in order to place the order.
       * @readonly
       */
      payNow?: V1PriceSummary;
      /**
       * Remaining amount for the order to be fully paid.
       * @readonly
       */
      payLater?: V1PriceSummary;
      /** Memberships to apply when creating the order. */
      membershipOptions?: MembershipOptions;
      /** Additional Fees. */
      additionalFees?: V1AdditionalFee[];
      /** Cart ID that this checkout was created from. Empty if this checkout wasn't created from a cart. */
      cartId?: string | null;
      /**
       * Information about the currency conversion that took place if at all. Empty if no conversion took place.
       * @internal
       */
      conversionInfo?: ConversionInfo;
      /**
       * The pay now total amount after gift card reduction
       * @internal
       * @readonly
       */
      payNowTotalAfterGiftCard?: MultiCurrencyPrice;
      /**
       * __Deprecated.__ Use `purchaseFlowId` instead.
       * @internal
       * @deprecated
       */
      ecomId?: string | null;
      /**
       * List of validation violations raised by the [Validations service plugin](https://dev.wix.com/api/rest/wix-ecommerce/validations-integration-spi/introduction).
       * @readonly
       */
      violations?: Violation[];
      /**
       * The total payment amount after gift card reduction
       * @internal
       * @readonly
       */
      totalAfterGiftCard?: MultiCurrencyPrice;
      /**
       * Custom field data for the checkout object.
       *
       * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the app dashboard before they can be accessed with API calls.
       */
      extendedFields?: ExtendedFields;
      /**
       * Persistent ID that correlates between the various eCommerce elements: cart, checkout, and order.
       * @readonly
       */
      purchaseFlowId?: string | null;
      /**
       * Additional settings for customization of the checkout process.
       *
       * > **Notes:**
       * > * Custom settings can only be set when [creating a checkout](https://dev.wix.com/docs/rest/api-reference/wix-e-commerce/checkout/create-checkout).
       * > * To access and manage custom checkout page content, your app must have the permission scope named "Manage eCommerce - Admin Permissions". Learn more about [permission scopes](https://dev.wix.com/docs/build-apps/develop-your-app/access/authorization/about-permissions).
       */
      customSettings?: CustomSettings;
      /**
       * Reference IDs for the app and component providing custom checkout page content.
       *
       * To access and manage custom checkout page content, your app must have the permission scope named "Manage eCommerce - Admin Permissions".
       * Learn more about [permission scopes](https://dev.wix.com/docs/build-apps/develop-your-app/access/authorization/about-permissions).
       */
      customContentReference?: CustomContentReference;
      /**
       * References to an external app and resource associated with this checkout.
       * Used for integration and tracking across different platforms.
       * @internal
       */
      externalReference?: ExternalReference;
      /**
       * Order ID.
       *
       * This field is empty until the checkout completes and becomes an order.
       * @internal
       * @readonly
       */
      orderId?: string | null;
      /**
       * Payment for subscriptions after free trial period.
       * @internal
       * @readonly
       */
      payAfterFreeTrial?: V1PriceSummary;
  }
  interface LineItem {
      /**
       * Line item ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Item quantity.
       *
       * Min: `"1"`
       * Max: `"100000"`
       */
      quantity?: number;
      /** Catalog and item reference. Includes IDs for the item and the catalog it came from, as well as further optional info. Optional for custom line items, which don't trigger the Catalog service plugin. */
      catalogReference?: CatalogReference;
      /**
       * Item name.
       * + Stores - `product.name`
       * + Bookings - `service.info.name`
       * + Events - `ticket.name`
       * @readonly
       */
      productName?: ProductName;
      /**
       * URL to the item's page on the site.
       * @readonly
       */
      url?: string;
      /**
       * Item price **after** catalog-defined discount and line item discounts.
       * @readonly
       */
      price?: MultiCurrencyPrice;
      /**
       * Total line item price **after** catalog-defined discount and line item discounts.
       * @readonly
       */
      lineItemPrice?: MultiCurrencyPrice;
      /**
       * Item price **before** catalog-defined discount. Defaults to `price` when not provided.
       * @readonly
       */
      fullPrice?: MultiCurrencyPrice;
      /**
       * Item price **before** line item discounts and **after** catalog-defined discount. Defaults to `price` when not provided.
       * @readonly
       */
      priceBeforeDiscounts?: MultiCurrencyPrice;
      /**
       * Total price after all discounts and tax.
       * @readonly
       */
      totalPriceAfterTax?: MultiCurrencyPrice;
      /**
       * Total price after discounts, and before tax.
       * @readonly
       */
      totalPriceBeforeTax?: MultiCurrencyPrice;
      /**
       * Tax details for this line item.
       * @readonly
       */
      taxDetails?: V1ItemTaxFullDetails;
      /**
       * Discount for this line item's entire quantity.
       * @readonly
       */
      discount?: MultiCurrencyPrice;
      /**
       * Line item description lines. Used for display purposes for the cart, checkout and order.
       * @readonly
       */
      descriptionLines?: DescriptionLine[];
      /**
       * Line item image details.
       * @readonly
       */
      media?: string;
      /**
       * Item availability details.
       * @readonly
       */
      availability?: ItemAvailabilityInfo;
      /**
       * Physical properties of the item. When relevant, contains information such as SKU, item weight, and shippability.
       * @readonly
       */
      physicalProperties?: PhysicalProperties;
      /**
       * Coupon scopes - which app and items a coupon applies to.
       * This field is internal to Wix, and should be used by Bookings, Stores and Events as used by the current [Coupons API](https://bo.wix.com/wix-docs/rest/stores/coupons/valid-scope-values).
       * @internal
       * @readonly
       */
      couponScopes?: Scope[];
      /**
       * Item type. Either a preset type or custom.
       * @readonly
       */
      itemType?: ItemType;
      /**
       * Subscription option information.
       * @readonly
       */
      subscriptionOptionInfo?: SubscriptionOptionInfo;
      /**
       * Fulfiller ID for this item. Field is empty when the item is self-fulfilled.
       * @internal
       * @readonly
       */
      fulfillerId?: string | null;
      /**
       * Shipping group ID.
       * @internal
       * @readonly
       */
      shippingGroupId?: string | null;
      /**
       * Digital file identifier, relevant only for items with type DIGITAL.
       * @internal
       * @readonly
       */
      digitalFile?: SecuredMedia;
      /**
       * Type of selected payment option for current item. Defaults to `FULL_PAYMENT_ONLINE`.
       * + `FULL_PAYMENT_ONLINE`: The entire payment for this item happens as part of the checkout.
       * + `FULL_PAYMENT_OFFLINE`: The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods.
       * + `MEMBERSHIP`: Payment for this item is done by charging a membership. When this option is used, `lineItem.price.amount` is `0`.
       * + `DEPOSIT_ONLINE`: Partial payment to be paid upfront during the checkout. Initial amount to be paid for each line item is defined by `lineItem.deposit`.
       * + `MEMBERSHIP_OFFLINE`: Payment for this item can only be performed by using a membership and must be manually redeemed in the dashboard by the site owner. When this option is used, `lineItem.price.amount` is `0`.
       * @readonly
       */
      paymentOption?: PaymentOptionType;
      /**
       * Service properties. When relevant, this contains information such as date and number of participants.
       * @readonly
       */
      serviceProperties?: ServiceProperties;
      /**
       * In cases where `catalogReference.catalogItemId` is NOT the actual catalog item ID, this field will return the true item's ID.
       * + For example, for Wix Bookings, `catalogReference.catalogItemId` is the booking ID. Therefore this value is set to the service ID.
       * + In most cases, this field has the same value as `catalogReference.catalogItemId`.
       * + Used in membership validation.
       * @readonly
       */
      rootCatalogItemId?: string | null;
      /**
       * Additional description for the price. For example, when price is 0 but additional details about the actual price are needed - "Starts at $67".
       * @readonly
       */
      priceDescription?: PriceDescription;
      /**
       * Partial payment to be paid upfront during the checkout. Eligible for catalog items with `lineItem.paymentOption` type `DEPOSIT_ONLINE` only.
       * @readonly
       */
      depositAmount?: MultiCurrencyPrice;
      /**
       * Delivery Profile Id for the product
       * @internal
       * @readonly
       */
      deliveryProfileId?: string | null;
      /**
       * Whether the line item is a custom line item. Custom line items don't trigger the Catalog service plugin.
       * @readonly
       */
      customLineItem?: boolean;
      /**
       * Item payment policy that requires customer consent to complete purchase. The payment policy will be displayed on the checkout page.
       * @readonly
       */
      consentRequiredPaymentPolicy?: string | null;
      /**
       * Overriding values for catalog item properties.
       *
       * To override catalog fields, your app must have the permission scope named "Manage eCommerce - Admin Permissions".
       * Learn more about [permission scopes](https://dev.wix.com/docs/build-apps/develop-your-app/access/authorization/about-permissions).
       */
      catalogOverrideFields?: CatalogOverrideFields;
      /**
       * Whether the price is not yet defined, and will be updated after the order is created.
       * @internal
       * @readonly
       */
      priceUndetermined?: boolean;
      /**
       * Whether the line item quantity is fixed and cannot be changed.
       * @internal
       * @readonly
       */
      fixedQuantity?: boolean;
      /**
       * Whether to save the payment method on the order.
       *
       * Default: `false`
       * @readonly
       */
      savePaymentMethod?: boolean;
      /**
       * Address to be used for tax calculation.
       * @internal
       */
      taxableAddress?: TaxableAddress;
      /**
       * Custom extended fields for the line item object.
       *
       * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the app dashboard before they can be accessed with API calls.
       * @internal
       */
      extendedFields?: ExtendedFields;
      /**
       * Policies to be displayed to the customer on the checkout page.
       * @internal
       * @readonly
       */
      policies?: Policy[];
      /**
       * ID of the app managing the inventory.
       * @internal
       */
      inventoryAppId?: string | null;
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
  interface V1ItemTaxFullDetails {
      /** Amount for which tax is calculated. */
      taxableAmount?: MultiCurrencyPrice;
      /**
       * Tax group ID, if specified.
       * @internal
       */
      taxGroupId?: string | null;
      /** Tax rate %, as a decimal point between 0 and 1. */
      taxRate?: string;
      /** Calculated tax, based on `taxable_amount` and `tax_rate`. */
      totalTax?: MultiCurrencyPrice;
      /**
       * If breakdown exists, the sum of rates in the breakdown must equal `tax_rate`. Deprecated - use 'tax_breakdown' instead.
       * @readonly
       * @deprecated
       */
      rateBreakdown?: TaxRateBreakdown[];
      /**
       * The amount of this line item that was exempt.
       * @internal
       */
      exemptAmount?: MultiCurrencyPrice;
      /**
       * True for items we have a tax applied on them
       * @internal
       */
      isItemTaxable?: boolean | null;
      /**
       * True if the lineAmount include tax in it.
       * @internal
       */
      isTaxIncluded?: boolean | null;
      /**
       * The calculator that calculated this line tax
       * @internal
       */
      calculatorName?: string | null;
      /**
       * tax information for a line item.
       * @internal
       * @readonly
       */
      taxBreakdown?: TaxBreakdown[];
  }
  interface TaxRateBreakdown {
      /** Name of tax against which the calculation was performed. */
      name?: string;
      /** Rate at which this tax detail was calculated. */
      rate?: string;
      /** Amount of tax for this tax detail. */
      tax?: MultiCurrencyPrice;
      /**
       * The type of tax that was calculated
       * @internal
       */
      taxType?: string | null;
      /**
       * The name of the jurisdiction in which this tax detail applies
       * @internal
       */
      jurisdiction?: string | null;
      /**
       * The type of the jurisdiction in which this tax detail applies(Country,State,County,City,Special).
       * @internal
       */
      jurisdictionType?: string | null;
      /**
       * The amount of this line item that was exempt from this authority.
       * @internal
       */
      exemptAmount?: MultiCurrencyPrice;
      /**
       * ids of the used exemptions from the TaxEstimate exemptions array.
       * @internal
       */
      exemptionIds?: number[];
      /**
       * The taxable amount of this tax detail
       * @internal
       */
      taxableAmount?: MultiCurrencyPrice;
      /**
       * The Taxes/Fee component. True if the fee is applied.
       * @internal
       */
      isFee?: boolean | null;
  }
  /**
   * TaxBreakdown represents tax information for a line item.
   * It holds the tax amount and the tax rate for each tax authority that apply on the line item.
   */
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
      jurisdictionType?: V1JurisdictionType;
  }
  /** JurisdictionType represents the type of the jurisdiction in which this tax detail applies (e.g. Country,State,County,City,Special). */
  enum V1JurisdictionType {
      UNDEFINED = "UNDEFINED",
      COUNTRY = "COUNTRY",
      STATE = "STATE",
      COUNTY = "COUNTY",
      CITY = "CITY",
      SPECIAL = "SPECIAL"
  }
  interface ItemAvailabilityInfo {
      /** Item availability status. */
      status?: ItemAvailabilityStatus;
      /** Quantity available. */
      quantityAvailable?: number | null;
  }
  enum ItemAvailabilityStatus {
      AVAILABLE = "AVAILABLE",
      /** Item does not exist */
      NOT_FOUND = "NOT_FOUND",
      /** Item not in stock */
      NOT_AVAILABLE = "NOT_AVAILABLE",
      /** Available quantity is less than requested */
      PARTIALLY_AVAILABLE = "PARTIALLY_AVAILABLE"
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
      subscriptionSettings?: V1SubscriptionSettings;
      /** Subscription option title. */
      title?: Title;
      /** Subscription option description. */
      description?: Description;
  }
  interface V1SubscriptionSettings {
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
  interface ServiceProperties {
      /**
       * Date and time the service is to be provided, in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format.
       * For example, the start time of a class.
       */
      scheduledDate?: Date | null;
      /** The number of people participating in the service. For example, the number of people attending a class or the number of people per hotel room. */
      numberOfParticipants?: number | null;
  }
  interface CatalogOverrideFields {
      /** Item name. */
      productName?: ProductName;
      /** Item price **after** discounts. */
      price?: string | null;
      /** Item price **before** discounts. */
      fullPrice?: string | null;
      /** Item description lines. Used when displaying the line item to customers. */
      descriptionLines?: DescriptionLine[];
      /** Physical properties of the item. */
      physicalProperties?: PhysicalProperties;
      /** Item image. */
      image?: string;
      /** Payment method selected for the item. */
      paymentOption?: PaymentOption;
      /** Only eligible for catalog items with `lineItem.paymentOption.value` type of `DEPOSIT_ONLINE`. */
      depositAmount?: string | null;
      /**
       * Whether to save the payment method on the order.
       *
       * Default: `false`
       */
      savePaymentMethod?: boolean | null;
  }
  interface PaymentOption {
      /**
       * + `FULL_PAYMENT_ONLINE`: The entire payment for this item happens as part of the checkout.
       * + `FULL_PAYMENT_OFFLINE`: The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods.
       * + `MEMBERSHIP`: Payment for this item is done by charging a membership. When selected, `price` is `0`.
       * + `DEPOSIT_ONLINE`: Partial payment to be paid upfront during the checkout. Initial amount to be paid for each line item is specified in `depositAmount`.
       * + `MEMBERSHIP_OFFLINE`: Payment for this item can only be done by charging a membership and must be manually redeemed in the dashboard by the site admin. When selected, `price` is `0`.
       */
      value?: PaymentOptionType;
  }
  interface Policy {
      /** Policy title - should be translated */
      title?: string | null;
      /** Policy content - should be translated */
      content?: string;
  }
  /** Billing Info and shipping details */
  interface AddressWithContact {
      /** Address. */
      address?: Address;
      /** Contact details. */
      contactDetails?: FullAddressContactDetails;
      /**
       * Reference to address service.
       * @internal
       */
      addressesServiceId?: string | null;
  }
  interface ShippingInfo {
      /** Shipping address and contact details. */
      shippingDestination?: AddressWithContact;
      /** Selected option out of the options allowed for the `region`. */
      selectedCarrierServiceOption?: SelectedCarrierServiceOption;
      /**
       * Shipping region. Based on the address provided.
       * @readonly
       */
      region?: V1ShippingRegion;
      /**
       * All carrier options for this shipping rule.
       * @readonly
       */
      carrierServiceOptions?: CarrierServiceOption[];
  }
  interface SelectedCarrierServiceOption {
      /** Unique identifier of selected option. For example, "usps_std_overnight". */
      code?: string;
      /**
       * Title of the option, such as USPS Standard Overnight Delivery (in the requested locale).
       * For example, "Standard" or "First-Class Package International".
       * @readonly
       */
      title?: string;
      /**
       * Delivery logistics.
       * @readonly
       */
      logistics?: V1DeliveryLogistics;
      /**
       * Shipping costs.
       * @readonly
       */
      cost?: SelectedCarrierServiceOptionPrices;
      /**
       * Were we able to find the requested shipping option, or otherwise we fallback to the default one (the first)
       * @readonly
       */
      requestedShippingOption?: boolean;
      /** Other charges */
      otherCharges?: SelectedCarrierServiceOptionOtherCharge[];
      /** This carrier's unique ID */
      carrierId?: string | null;
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
  interface V1DeliveryLogistics {
      /** Expected delivery time, in free text. For example, "3-5 business days". */
      deliveryTime?: string | null;
      /** Instructions for caller, e.g for pickup: "Please deliver during opening hours, and please don't park in disabled parking spot". */
      instructions?: string | null;
      /** Pickup details. */
      pickupDetails?: V1PickupDetails;
      /**
       * Expected delivery time slot (from and to time stamps representation)
       * @internal
       */
      deliveryTimeSlot?: V1DeliveryTimeSlot;
  }
  interface V1PickupDetails {
      /** Pickup address. */
      address?: Address;
      /**
       * Whether the pickup address is that of a business - this may effect tax calculation.
       * @deprecated
       */
      businessLocation?: boolean;
      /** Pickup method */
      pickupMethod?: PickupDetailsPickupMethod;
  }
  enum PickupDetailsPickupMethod {
      UNKNOWN_METHOD = "UNKNOWN_METHOD",
      STORE_PICKUP = "STORE_PICKUP",
      PICKUP_POINT = "PICKUP_POINT"
  }
  interface V1DeliveryTimeSlot {
      /** starting time of the delivery time slot */
      from?: Date | null;
      /** ending time of the delivery time slot */
      to?: Date | null;
  }
  interface SelectedCarrierServiceOptionPrices {
      /** Total shipping price, after discount and after tax. */
      totalPriceAfterTax?: MultiCurrencyPrice;
      /** Total price of shipping after discounts (when relevant), and before tax. */
      totalPriceBeforeTax?: MultiCurrencyPrice;
      /** Tax details. */
      taxDetails?: V1ItemTaxFullDetails;
      /** Shipping discount before tax. */
      totalDiscount?: MultiCurrencyPrice;
      /** Shipping price before discount and before tax. */
      price?: MultiCurrencyPrice;
  }
  interface SelectedCarrierServiceOptionOtherCharge {
      /** Type of additional cost. */
      type?: ChargeType;
      /** Details of the charge, such as 'Full Coverage Insurance of up to 80% of value of shipment'. */
      details?: string | null;
      /** Price of added charge. */
      cost?: SelectedCarrierServiceOptionPrices;
  }
  enum ChargeType {
      HANDLING_FEE = "HANDLING_FEE",
      INSURANCE = "INSURANCE"
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
  interface V1ShippingRegion {
      /**
       * Shipping region ID.
       * @readonly
       */
      _id?: string;
      /** Shipping region name. */
      name?: string;
  }
  interface CarrierServiceOption {
      /** Carrier ID. */
      carrierId?: string;
      /** Shipping options offered by this carrier for this request. */
      shippingOptions?: ShippingOption[];
  }
  interface ShippingOption {
      /**
       * Unique code of provided shipping option like "usps_std_overnight".
       * For legacy calculators this would be the UUID of the option.
       */
      code?: string;
      /**
       * Title of the option, such as USPS Standard Overnight Delivery (in the requested locale).
       * For example, "Standard" or "First-Class Package International".
       */
      title?: string;
      /** Delivery logistics. */
      logistics?: V1DeliveryLogistics;
      /** Sipping price information. */
      cost?: V1ShippingPrice;
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
  interface V1ShippingPrice {
      /** Shipping price. */
      price?: MultiCurrencyPrice;
      /** Other costs such as insurance, handling & packaging for fragile items, etc. */
      otherCharges?: OtherCharge[];
  }
  interface OtherCharge {
      /** Type of additional cost. */
      type?: ChargeType;
      /** Price of added cost. */
      price?: MultiCurrencyPrice;
  }
  interface BuyerInfo extends BuyerInfoIdOneOf {
      /**
       * Visitor ID (if site visitor is **not** a member).
       * @readonly
       */
      visitorId?: string;
      /**
       * Member ID (if site visitor is a site member).
       * @readonly
       */
      memberId?: string;
      /**
       * + If `true`, the checkout doesn't have an owner yet and anyone can access it. The first to access it will be the new owner.
       * + If `false`, the value in `checkout.createdBy` is the owner.
       * @internal
       */
      openAccess?: boolean;
      /**
       * Contact ID. Auto-created if one does not yet exist. For more information, see [Contacts API](https://dev.wix.com/api/rest/contacts/contacts/introduction).
       * @readonly
       */
      contactId?: string | null;
      /** Buyer email address. */
      email?: string | null;
  }
  /** @oneof */
  interface BuyerInfoIdOneOf {
      /**
       * Visitor ID (if site visitor is **not** a member).
       * @readonly
       */
      visitorId?: string;
      /**
       * Member ID (if site visitor is a site member).
       * @readonly
       */
      memberId?: string;
      /**
       * + If `true`, the checkout doesn't have an owner yet and anyone can access it. The first to access it will be the new owner.
       * + If `false`, the value in `checkout.createdBy` is the owner.
       * @internal
       */
      openAccess?: boolean;
  }
  interface V1PriceSummary {
      /** Subtotal of all line items, before discounts and before tax. */
      subtotal?: MultiCurrencyPrice;
      /** Total shipping price, before discounts and before tax. */
      shipping?: MultiCurrencyPrice;
      /** Total tax. */
      tax?: MultiCurrencyPrice;
      /** Total calculated discount value. */
      discount?: MultiCurrencyPrice;
      /** Total price after discounts, gift cards, and tax. */
      total?: MultiCurrencyPrice;
      /** Total additional fees price before tax. */
      additionalFees?: MultiCurrencyPrice;
  }
  interface CalculationErrors extends CalculationErrorsShippingCalculationErrorOneOf {
      /** General shipping calculation error. */
      generalShippingCalculationError?: Details;
      /** Carrier errors. */
      carrierErrors?: CarrierErrors;
      /** Tax calculation error. */
      taxCalculationError?: Details;
      /** Coupon calculation error. */
      couponCalculationError?: Details;
      /** Gift card calculation error. */
      giftCardCalculationError?: Details;
      /** Order validation errors. */
      orderValidationErrors?: ApplicationError[];
      /**
       * Membership payment methods calculation errors
       * For example, will indicate that a line item that must be paid with membership payment doesn't have one or selected memberships are invalid
       */
      membershipError?: Details;
      /** Discount Rule calculation error. */
      discountsCalculationError?: Details;
  }
  /** @oneof */
  interface CalculationErrorsShippingCalculationErrorOneOf {
      /** General shipping calculation error. */
      generalShippingCalculationError?: Details;
      /** Carrier errors. */
      carrierErrors?: CarrierErrors;
  }
  interface Details extends DetailsKindOneOf {
      applicationError?: ApplicationError;
      validationError?: ValidationError;
      systemError?: SystemError;
      /**
       * deprecated in API's - to enable migration from rendering arbitrary tracing to rest response
       * @deprecated
       */
      tracing?: Record<string, string>;
  }
  /** @oneof */
  interface DetailsKindOneOf {
      applicationError?: ApplicationError;
      validationError?: ValidationError;
      systemError?: SystemError;
  }
  interface ApplicationError {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  /**
   * example result:
   * {
   * "fieldViolations": [
   * {
   * "field": "fieldA",
   * "description": "invalid music note. supported notes: [do,re,mi,fa,sol,la,ti]",
   * "violatedRule": "OTHER",
   * "ruleName": "INVALID_NOTE",
   * "data": {
   * "value": "FI"
   * }
   * },
   * {
   * "field": "fieldB",
   * "description": "field value out of range. supported range: [0-20]",
   * "violatedRule": "MAX",
   * "data": {
   * "threshold": 20
   * }
   * },
   * {
   * "field": "fieldC",
   * "description": "invalid phone number. provide a valid phone number of size: [7-12], supported characters: [0-9, +, -, (, )]",
   * "violatedRule": "FORMAT",
   * "data": {
   * "type": "PHONE"
   * }
   * }
   * ]
   * }
   */
  interface ValidationError {
      fieldViolations?: FieldViolation[];
  }
  enum RuleType {
      VALIDATION = "VALIDATION",
      OTHER = "OTHER",
      MAX = "MAX",
      MIN = "MIN",
      MAX_LENGTH = "MAX_LENGTH",
      MIN_LENGTH = "MIN_LENGTH",
      MAX_SIZE = "MAX_SIZE",
      MIN_SIZE = "MIN_SIZE",
      FORMAT = "FORMAT",
      DECIMAL_LTE = "DECIMAL_LTE",
      DECIMAL_GTE = "DECIMAL_GTE",
      DECIMAL_LT = "DECIMAL_LT",
      DECIMAL_GT = "DECIMAL_GT",
      DECIMAL_MAX_SCALE = "DECIMAL_MAX_SCALE",
      INVALID_ENUM_VALUE = "INVALID_ENUM_VALUE",
      REQUIRED_FIELD = "REQUIRED_FIELD",
      FIELD_NOT_ALLOWED = "FIELD_NOT_ALLOWED",
      ONE_OF_ALIGNMENT = "ONE_OF_ALIGNMENT",
      EXACT_LENGTH = "EXACT_LENGTH",
      EXACT_SIZE = "EXACT_SIZE"
  }
  interface FieldViolation {
      field?: string;
      description?: string;
      violatedRule?: RuleType;
      /** applicable when violated_rule=OTHER */
      ruleName?: string | null;
      data?: Record<string, any> | null;
  }
  interface SystemError {
      /** Error code. */
      errorCode?: string | null;
  }
  interface CarrierErrors {
      /** Carrier errors. */
      errors?: CarrierError[];
  }
  interface CarrierError {
      /** Carrier ID. */
      carrierId?: string;
      /** Error details. */
      error?: Details;
  }
  interface GiftCard {
      /**
       * Gift Card ID.
       * @deprecated
       */
      _id?: string;
      /** Gift card obfuscated code. */
      obfuscatedCode?: string;
      /** Gift card value. */
      amount?: MultiCurrencyPrice;
      /** App ID of the gift card provider. */
      appId?: string;
      /**
       * External ID in the gift card provider's system.
       * Used for integration and tracking across different platforms.
       */
      externalId?: string | null;
  }
  interface V1AppliedDiscount extends V1AppliedDiscountDiscountSourceOneOf {
      /** Coupon details. */
      coupon?: V1Coupon;
      /** Merchant discount. */
      merchantDiscount?: V1MerchantDiscount;
      /** Discount rule */
      discountRule?: V1DiscountRule;
      /** Discount type. */
      discountType?: AppliedDiscountDiscountType;
      /**
       * IDs of line items the discount applies to.
       * @deprecated IDs of line items the discount applies to.
       * @replacedBy line_items_discounts
       * @targetRemovalDate 2024-06-01
       */
      lineItemIds?: string[];
      /**
       * Discount ID.
       * @internal
       */
      _id?: string | null;
      /**
       * Line items the discount applies to.
       * @internal
       */
      lineItemDiscounts?: V1LineItemDiscount[];
      /**
       * Number of subscription cycle this discount applies to
       * default None - all billing cycle
       * @internal
       */
      subscriptionCycles?: number | null;
  }
  /** @oneof */
  interface V1AppliedDiscountDiscountSourceOneOf {
      /** Coupon details. */
      coupon?: V1Coupon;
      /** Merchant discount. */
      merchantDiscount?: V1MerchantDiscount;
      /** Discount rule */
      discountRule?: V1DiscountRule;
  }
  enum AppliedDiscountDiscountType {
      GLOBAL = "GLOBAL",
      SPECIFIC_ITEMS = "SPECIFIC_ITEMS",
      SHIPPING = "SHIPPING"
  }
  /** Coupon */
  interface V1Coupon {
      /** Coupon ID. */
      _id?: string;
      /** Coupon code. */
      code?: string;
      /** Coupon value. */
      amount?: MultiCurrencyPrice;
      /** Coupon name. */
      name?: string;
      /**
       * Coupon type: We want it to be an enum and not a string but currently we have no time to do it so we leave it as is to be aligned with cart summary.
       * @internal
       * @deprecated
       */
      couponType?: string;
  }
  interface V1MerchantDiscount {
      /** Discount value. */
      amount?: MultiCurrencyPrice;
      /** Discount Percentage. Will be calculated from items price before other discounts. */
      percentage?: number | null;
  }
  interface V1DiscountRule {
      /** Discount rule ID */
      _id?: string;
      /** Discount rule name */
      name?: V1DiscountRuleName;
      /** Discount value. */
      amount?: MultiCurrencyPrice;
  }
  interface V1DiscountRuleName {
      /** Original discount rule name (in site's default language). */
      original?: string;
      /** Translated discount rule name according to buyer language. Defaults to `original` when not provided. */
      translated?: string | null;
  }
  interface V1LineItemDiscount {
      /** ID of line item the discount applies to. */
      _id?: string;
      /** Discount value. */
      totalDiscountAmount?: MultiCurrencyPrice;
  }
  interface V1TaxSummary {
      /**
       * Amount for which tax is calculated, added from line items.
       * @readonly
       */
      taxableAmount?: MultiCurrencyPrice;
      /**
       * Calculated tax, added from line items.
       * @readonly
       */
      totalTax?: MultiCurrencyPrice;
      /**
       * Manual tax rate
       * @internal
       * @readonly
       * @deprecated
       */
      manualTaxRate?: string;
      /**
       * Tax calculator that was active when the order was created.
       * @deprecated
       */
      calculationDetails?: TaxCalculationDetails;
      /**
       * Tax estimation id in tax service
       * @internal
       * @readonly
       */
      taxEstimationId?: string | null;
      /**
       * Average Tax Rate
       * @internal
       * @readonly
       */
      averageTaxRate?: string | null;
      /**
       * The amount of this estimate that was exempt (for all line items).
       * @internal
       * @readonly
       */
      totalExempt?: MultiCurrencyPrice;
      /**
       * The summary of the tax breakdown for all the line items. It will hold for each tax name, the aggregated tax amount paid for it and the tax rate.
       * @internal
       * @readonly
       */
      aggregatedTaxBreakdown?: AggregatedTaxBreakdown[];
  }
  interface TaxCalculationDetails extends TaxCalculationDetailsCalculationDetailsOneOf {
      /** Reason the manual calculation was used. */
      manualRateReason?: ManualCalculationReason;
      /** Details of the fallback rate calculation. */
      autoTaxFallbackDetails?: AutoTaxFallbackCalculationDetails;
      /** Rate calculation type. */
      rateType?: RateType;
  }
  /** @oneof */
  interface TaxCalculationDetailsCalculationDetailsOneOf {
      /** Reason the manual calculation was used. */
      manualRateReason?: ManualCalculationReason;
      /** Details of the fallback rate calculation. */
      autoTaxFallbackDetails?: AutoTaxFallbackCalculationDetails;
  }
  enum RateType {
      /** no tax being collected for this request due to location of purchase */
      NO_TAX_COLLECTED = "NO_TAX_COLLECTED",
      /** manual rate used for calculation */
      MANUAL_RATE = "MANUAL_RATE",
      /** autotax rate used for calculation */
      AUTO_RATE = "AUTO_RATE",
      /** fallback rate used for calculation */
      FALLBACK_RATE = "FALLBACK_RATE"
  }
  enum ManualCalculationReason {
      /** user set calculator in Business Manager to be Manual */
      GLOBAL_SETTING_TO_MANUAL = "GLOBAL_SETTING_TO_MANUAL",
      /** specific region is on manual even though Global setting is Auto-tax */
      REGION_SETTING_TO_MANUAL = "REGION_SETTING_TO_MANUAL"
  }
  interface AutoTaxFallbackCalculationDetails {
      /** reason for fallback */
      fallbackReason?: FallbackReason;
      /** invalid request (i.e. address), timeout, internal error, license error, and others will be encoded here */
      error?: ApplicationError;
  }
  enum FallbackReason {
      /** auto-tax failed to be calculated */
      AUTO_TAX_FAILED = "AUTO_TAX_FAILED",
      /** auto-tax was temporarily deactivated on a system-level */
      AUTO_TAX_DEACTIVATED = "AUTO_TAX_DEACTIVATED"
  }
  /**
   * The summary of the tax breakdown for all the line items. It will hold for each tax name, the aggregated tax amount paid for it and the tax rate.
   * Tax breakdown is the tax amount split to the tax authorities that applied on the line item.
   */
  interface AggregatedTaxBreakdown {
      /** The name of the tax against which this tax amount was calculated. */
      taxName?: string;
      /** The type of tax that was calculated. Depends on the company's nexus settings as well as the jurisdiction's tax laws. */
      taxType?: string;
      /** The name of the jurisdiction in which this tax detail applies. */
      jurisdiction?: string;
      /** The type of the jurisdiction in which this tax detail applies (e.g. Country,State,County,City,Special). */
      jurisdictionTypeEnum?: V1JurisdictionType;
      /** The rate at which this tax detail was calculated, e.g 0.1000 signifies 10% tax and 2.000 signifies 200% tax. (Decimal value) */
      rate?: string;
      /** The sum of all the tax from line items that calculated by the tax identifiers. */
      aggregatedTaxAmount?: MultiCurrencyPrice;
      /**
       * The sum of all the taxable amount from line items for tax identifiers.
       * @internal
       */
      aggregatedTaxableAmount?: MultiCurrencyPrice;
  }
  interface CreatedBy extends CreatedByIdOneOf {
      /**
       * User ID - when the order was created by a Wix user on behalf of a buyer.
       * For example, via POS (point of service).
       */
      userId?: string;
      /** Member ID - when the order was created by a **logged in** site visitor. */
      memberId?: string;
      /** Visitor ID - when the order was created by a site visitor that was **not** logged in. */
      visitorId?: string;
      /** App ID - when the order was created by an external application or Wix service. */
      appId?: string;
  }
  /** @oneof */
  interface CreatedByIdOneOf {
      /**
       * User ID - when the order was created by a Wix user on behalf of a buyer.
       * For example, via POS (point of service).
       */
      userId?: string;
      /** Member ID - when the order was created by a **logged in** site visitor. */
      memberId?: string;
      /** Visitor ID - when the order was created by a site visitor that was **not** logged in. */
      visitorId?: string;
      /** App ID - when the order was created by an external application or Wix service. */
      appId?: string;
  }
  /** Reserved for internal use. */
  interface MembershipOptions {
      /**
       * Reserved for internal use.
       * @readonly
       */
      eligibleMemberships?: Membership[];
      /**
       * Reserved for internal use.
       * @readonly
       */
      invalidMemberships?: InvalidMembership[];
      /** Selected membership to apply to this checkout. */
      selectedMemberships?: SelectedMemberships;
  }
  interface Membership {
      /** Membership ID. */
      _id?: string;
      /** ID of the application providing this payment option. */
      appId?: string;
      /** The name of this membership. */
      name?: MembershipName;
      /** Line item IDs which are "paid" for by this membership. */
      lineItemIds?: string[];
      /** Optional - For a membership that has limited credits, information about credit usage. */
      credits?: MembershipPaymentCredits;
      /** Optional - TMembership expiry date. */
      expirationDate?: Date | null;
      /** Additional data about this membership. */
      additionalData?: Record<string, any> | null;
  }
  interface MembershipName {
      /** Membership name. */
      original?: string;
      /** Translated membership name. Defaults to `original` when not provided. */
      translated?: string | null;
  }
  interface MembershipPaymentCredits {
      /** Membership's total amount of credits. */
      total?: number;
      /** Membership's remaining amount of credits. */
      remaining?: number;
  }
  interface InvalidMembership {
      /** Membership details. */
      membership?: Membership;
      /** Reason why this membership is invalid and cannot be used. */
      reason?: string;
  }
  interface SelectedMemberships {
      /** Selected memberships. */
      memberships?: SelectedMembership[];
  }
  interface SelectedMembership {
      /** Membership ID. */
      _id?: string;
      /** ID of the app providing this payment option. */
      appId?: string;
      /** IDs of the line items this membership applies to. */
      lineItemIds?: string[];
  }
  interface V1AdditionalFee {
      /** Additional fee's unique code (or ID) for future processing. */
      code?: string | null;
      /** Translated additional fee's name. */
      name?: string;
      /** Additional fee's price. */
      price?: MultiCurrencyPrice;
      /** Tax details. */
      taxDetails?: V1ItemTaxFullDetails;
      /** Provider's app id. */
      providerAppId?: string | null;
      /** Additional fee's price before tax. */
      priceBeforeTax?: MultiCurrencyPrice;
      /** Additional fee's price after tax. */
      priceAfterTax?: MultiCurrencyPrice;
      /**
       * Optional - Line items associated with this additional fee.
       * If no `lineItemIds` are provided, the fee will be associated with the whole cart/checkout/order.
       */
      lineItemIds?: string[];
      /**
       * Number of subscription cycle this fee applies to
       * default None - all billing cycle
       * @internal
       */
      subscriptionCycles?: number | null;
  }
  interface ConversionInfo {
      /**
       * The site currency.
       * @readonly
       */
      siteCurrency?: string;
      /**
       * The rate used when converting from the site currency to the checkout currency.
       * @readonly
       */
      conversionRate?: string;
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
  interface CustomSettings {
      /**
       * Whether to restrict the option to add or remove a gift card on the checkout page.
       *
       * Default: `false`
       */
      lockGiftCard?: boolean;
      /**
       * Whether to restrict the option to add or remove a coupon code on the checkout page.
       *
       * Default: `false`
       */
      lockCouponCode?: boolean;
      /**
       * Whether to disable policy agreement checkout in the checkout page
       *
       * Default: `false`
       */
      disabledPolicyAgreementCheckbox?: boolean;
      /**
       * Whether to disable manual payment option for this checkout.
       *
       * Default: `false`
       */
      disabledManualPayment?: boolean;
  }
  interface CustomContentReference {
      /**
       * ID of the app providing the content.
       *
       * You can get your app's ID from its page in the [app dashboard](https://dev.wix.com/dc3/my-apps/).
       */
      appId?: string;
      /**
       * ID of the component within the app it belongs to.
       *
       * You can get your component's ID from its page in the [app dashboard](https://dev.wix.com/dc3/my-apps/).
       */
      componentId?: string;
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
  interface GetPaymentSettingsForCheckoutResponse {
      /** Blocked payment options. */
      blockedPaymentOptions?: V1PaymentOption[];
  }
  enum V1PaymentOption {
      UNKNOWN_PAYMENT_OPTION = "UNKNOWN_PAYMENT_OPTION",
      MANUAL = "MANUAL"
  }
  interface PaymentSettingsSPIConfig {
      /**
       * The value to set for `paymentSettings.requires3dSecure` if the service plugin call fails.
       *
       * Default: `false`
       */
      fallbackValueForRequires3dSecure?: boolean;
      /**
       * `true` if SPI implementer provides payments settings for checkout
       *
       * Default: `false`
       */
      providePaymentsSettingsForCheckout?: boolean;
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
  interface GetPaymentSettingsOptions {
      /** Order. */
      order?: Order;
  }
  interface GetPaymentSettingsForCheckoutOptions {
      /** Checkout. */
      checkout?: Checkout;
  }
  
  export { Activity, ActivityContentOneOf, ActivityType, AdditionalFee, Address, AddressLocation, AddressWithContact, AggregatedTaxBreakdown, ApiAddressWithContact, ApplicableLineItems, ApplicationError, AppliedDiscount, AppliedDiscountDiscountSourceOneOf, AppliedDiscountDiscountType, AttributionSource, AuthorizedPaymentCaptured, AuthorizedPaymentCreated, AuthorizedPaymentVoided, AutoTaxFallbackCalculationDetails, Balance, BalanceSummary, BusinessError, BuyerInfo, BuyerInfoIdOneOf, CalculationErrors, CalculationErrorsShippingCalculationErrorOneOf, Carrier, CarrierError, CarrierErrors, CarrierServiceOption, CatalogOverrideFields, CatalogReference, ChannelInfo, ChannelType, ChargeType, Checkout, Color, Context, ConversionInfo, Coupon, CreatedBy, CreatedByIdOneOf, CreditCardDetails, CustomActivity, CustomContentReference, CustomField, CustomSettings, DeliveryAllocation, DeliveryLogistics, DeliveryLogisticsAddressOneOf, DeliveryTimeSlot, Description, DescriptionLine, DescriptionLineDescriptionLineValueOneOf, DescriptionLineName, DescriptionLineType, DescriptionLineValueOneOf, Details, DetailsKindOneOf, DigitalFile, DiscountReason, DiscountRule, DiscountRuleName, DiscountType, DraftOrderChangesApplied, ExtendedFields, ExternalReference, FallbackReason, FieldViolation, FileType, FocalPoint, FreeTrialPeriod, FulfillmentStatus, FulfillmentStatusesAggregate, FullAddressContactDetails, GetPaymentSettingsForCheckoutOptions, GetPaymentSettingsForCheckoutRequest, GetPaymentSettingsForCheckoutResponse, GetPaymentSettingsOptions, GetPaymentSettingsRequest, GetPaymentSettingsResponse, GiftCard, GiftCardPaymentRefund, Group, IdentificationData, IdentificationDataIdOneOf, IdentityType, InvalidMembership, ItemAvailabilityInfo, ItemAvailabilityStatus, ItemTaxFullDetails, ItemType, ItemTypeItemType, ItemTypeItemTypeDataOneOf, JurisdictionType, LineItem, LineItemAmount, LineItemChanges, LineItemDiscount, LineItemExchangeData, LineItemPriceChange, LineItemQuantityChange, LineItemQuantityChangeType, LineItemTaxBreakdown, LineItemTaxInfo, Location, LocationAndQuantity, ManagedAdditionalFee, ManagedDiscount, ManagedLineItem, ManualCalculationReason, Membership, MembershipName, MembershipOptions, MembershipPaymentCredits, MembershipPaymentRefund, MerchantComment, MerchantDiscount, MerchantDiscountMerchantDiscountReasonOneOf, MultiCurrencyPrice, NameInLineItem, NameInOther, NewExchangeOrderCreated, Order, OrderChange, OrderChangeValueOneOf, OrderCreatedFromExchange, OrderLineItem, OrderRefunded, OrderStatus, OrderTaxBreakdown, OrderTaxInfo, Other, OtherCharge, PaymentCanceled, PaymentCanceledPaymentDetailsOneOf, PaymentDeclined, PaymentDeclinedPaymentDetailsOneOf, PaymentOption, PaymentOptionType, PaymentPending, PaymentPendingPaymentDetailsOneOf, PaymentRefundFailed, PaymentRefunded, PaymentSettings, PaymentSettingsSPIConfig, PaymentStatus, PhysicalProperties, PickupAddress, PickupDetails, PickupDetailsPickupMethod, PickupMethod, PlainTextValue, Policy, Price, PriceDescription, PriceSummary, ProductName, RateType, RefundInitiated, RefundedAsStoreCredit, RefundedPayment, RefundedPaymentKindOneOf, Region, RegularPayment, RegularPaymentPaymentMethodDetailsOneOf, RegularPaymentRefund, RuleType, SavedPaymentMethod, Scope, SecuredMedia, SelectedCarrierServiceOption, SelectedCarrierServiceOptionOtherCharge, SelectedCarrierServiceOptionPrices, SelectedMembership, SelectedMemberships, ServiceProperties, Severity, ShippingInfo, ShippingInformation, ShippingInformationChange, ShippingOption, ShippingPrice, ShippingRegion, StreetAddress, SubscriptionFrequency, SubscriptionInfo, SubscriptionOptionInfo, SubscriptionSettings, SuggestedFix, SystemError, TagList, Tags, Target, TargetLineItem, TargetTargetTypeOneOf, TaxBreakdown, TaxCalculationDetails, TaxCalculationDetailsCalculationDetailsOneOf, TaxRateBreakdown, TaxSummary, TaxableAddress, TaxableAddressTaxableAddressDataOneOf, TaxableAddressType, Title, TotalPriceChange, TranslatedValue, V1AdditionalFee, V1AppliedDiscount, V1AppliedDiscountDiscountSourceOneOf, V1BuyerInfo, V1BuyerInfoIdOneOf, V1Coupon, V1CreatedBy, V1CreatedByStringOneOf, V1DeliveryLogistics, V1DeliveryTimeSlot, V1DiscountRule, V1DiscountRuleName, V1ItemTaxFullDetails, V1JurisdictionType, V1LineItemDiscount, V1MerchantDiscount, V1PaymentOption, V1PickupDetails, V1PriceSummary, V1ShippingInformation, V1ShippingPrice, V1ShippingRegion, V1SubscriptionSettings, V1TaxSummary, ValidationError, VatId, VatType, Violation, WeightUnit };
}
