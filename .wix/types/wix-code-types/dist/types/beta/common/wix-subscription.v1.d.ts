declare module "wix-subscription.v1" {
  interface Subscription {
      /**
       * Subscription's unique id. Automatically generated and read-only.
       * @readonly
       */
      _id?: string | null;
      /**
       * Date when subscription was created
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date when subscription was updated
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Revision of subscription. Increments upon changes
       * @readonly
       */
      revision?: string | null;
      /** Subscription name: minLength is 1, maxLength is 150 */
      name?: string;
      /** Subscription description. Optional. */
      description?: string | null;
      /**
       * If start_date is set in the future: custom_billing_schedule.cycles_to_pay_on_creation should be set to 1
       * in order to pay on creation for first cycle, Subscription will be then activated in the future.
       * Future start_date is not supported for `SEND_INVOICE` CollectionMethod
       * If start_date is set in past, it means subscription was already started.
       */
      startDate?: Date | null;
      /**
       * Represents when the subscription will end, relevant for subscriptions with a termed period.
       * If not provided, will be calculated based on billing schedule. Should be empty for evergreen subscription.
       * Note: A 13-hour tolerance is applied when validating the end date to handle for time zone differences and minor discrepancies.
       */
      endDate?: Date | null;
      /** Business origin subscription is coming from. In site-level subscription it will be vertical app_id and entity_id */
      origin?: BusinessOrigin;
      /** Customer information like id and identity type (member or contact) */
      customer?: Customer;
      /**
       * Status of subscription
       * @readonly
       */
      status?: SubscriptionStatusEnumSubscriptionStatus;
      /** Billing details parameters including schedule, currency, etc. */
      billingSettings?: BillingSettings;
      /**
       * Includes many attributes about billing status of the subscription
       * @readonly
       */
      billingStatus?: BillingStatus;
      /** Shipping address associated with subscription. At the moment used only for payments. Optional. */
      shippingAddress?: FullAddressDetails;
      /** Restrictions on possible subscription actions. If not provided, default policies are all restrictions enabled. */
      policies?: SubscriptionPolicies;
      /**
       * Information related to either paused subscription or scheduled for future pause
       * @readonly
       */
      pauseInfo?: PauseInfo;
      /**
       * Information related to cancellation for already canceled subscription or scheduled for cancel
       * @readonly
       */
      cancellationInfo?: CancellationInfo;
      /**
       * Pending update for the next billing cycle
       * @readonly
       */
      pendingUpdateData?: SubscriptionUpdateData;
      /**
       * Indicator whether subscription is managed by BASS or external system, like SAPI, for example.
       * @internal
       * @readonly
       */
      bassManaged?: boolean;
      /**
       * Key / Value store to keep up to 10 additional values related to the subscription.
       * Key max length = 50, Value max length = 200. Value can not be empty.
       * Should not include any sensitive or PII information.
       */
      metadata?: Record<string, string>;
      /**
       * Pending update for a specific date
       * @readonly
       */
      specificDatePendingUpdateData?: SpecificDateSubscriptionUpdateData;
      /**
       * ChangesCounter of subscription. Increments upon every change to the domain
       * @readonly
       */
      changesCounter?: string | null;
      /** Billing order id. Optional. */
      orderId?: string | null;
      /** items, minSize is 1, maxSize is 100 */
      items?: Item[];
  }
  interface BusinessOrigin {
      appId?: string | null;
      entityId?: string | null;
  }
  interface Customer extends CustomerIdOneOf {
      /**
       * Visitor ID of the customer. Available when the customer is an anonymous
       * site visitor.
       */
      visitorId?: string;
      /**
       * Contact ID of the customer. Available when the customer is a
       * [contact](https://dev.wix.com/docs/rest/api-reference/people-communications/contacts/contacts/contact-v-4#contact-object).
       */
      contactId?: string;
      /**
       * Member ID of the customer. Available when the customer is a
       * [member](https://dev.wix.com/docs/rest/api-reference/people-communications/members/members#member-object).
       */
      memberId?: string;
      /** Wix account ID */
      accountId?: string;
  }
  /** @oneof */
  interface CustomerIdOneOf {
      /**
       * Visitor ID of the customer. Available when the customer is an anonymous
       * site visitor.
       */
      visitorId?: string;
      /**
       * Contact ID of the customer. Available when the customer is a
       * [contact](https://dev.wix.com/docs/rest/api-reference/people-communications/contacts/contacts/contact-v-4#contact-object).
       */
      contactId?: string;
      /**
       * Member ID of the customer. Available when the customer is a
       * [member](https://dev.wix.com/docs/rest/api-reference/people-communications/members/members#member-object).
       */
      memberId?: string;
      /** Wix account ID */
      accountId?: string;
  }
  enum SubscriptionStatusEnumSubscriptionStatus {
      UNKNOWN = "UNKNOWN",
      /** Subscription created in this status, but hasn't been paid for yet. Filtered out from subscriptions querying. */
      DRAFT = "DRAFT",
      /** Subscription that will be active in future. */
      PENDING = "PENDING",
      /** Subscription is active */
      ACTIVE = "ACTIVE",
      /** Subscription is paused */
      PAUSED = "PAUSED",
      /** Subscription was ended */
      ENDED = "ENDED",
      /** Subscription was canceled or auto-renew off. Ended before its time. */
      CANCELED = "CANCELED"
  }
  interface BillingSettings {
      /** Currency of all subscription items prices. Three letter ISO currency code. https://en.wikipedia.org/wiki/ISO_4217 */
      currency?: string;
      /** customer payment source to make recurring payments with */
      paymentMethod?: PaymentMethod;
      /** Instructs how payments will be collected. */
      collectionMethod?: CollectionMethod;
      /**
       * Duration of cycle. For example, 1 MONTH, 2 WEEKS, 7 DAYS, 1 YEAR etc.
       * Shortest supported cycle duration is 7 days.
       */
      cycleDuration?: Duration;
      /** Number of billing cycles. If not set subscription auto-renewed until cycle-auto-renew will be disabled. */
      totalCycles?: number | null;
      /** If set to false, subscription will be canceled at the next billing cycle. */
      cycleAutoRenew?: boolean;
      /** Billing Schedule to be defined in order to override default billing schedule */
      customBillingSchedule?: CustomBillingSchedule;
      /** Definition of trial period */
      freeTrialDuration?: Duration;
      /**
       * Shipping costs collected each cycle
       * @deprecated
       * @replacedBy shipping_charges
       * @targetRemovalDate 2024-10-31
       */
      shippingFee?: string | null;
      /** Billing address associated with subscription to be used for payments. */
      billingAddress?: FullAddressDetails;
      taxSettings?: TaxSettings;
      /**
       * Fees that are only added to an invoice when a specific condition is met.
       * For example, a setup fee that only applies to the very first invoice of a
       * subscription.
       *
       * Max: 5 additional fees
       */
      additionalFees?: AdditionalFee[];
      /** Shipping fee charges */
      shippingCharges?: ShippingCharges;
      /** General discount that applied to all items in the subscription */
      discounts?: Discount[];
      /**
       * Details about the external collection service.
       * Only set when the collection_method is EXTERNAL.
       */
      externalCollectionDetails?: ExternalCollectionDetails;
  }
  interface PaymentMethod {
      /** reference to payment source id stored in payments system */
      _id?: string;
  }
  enum CollectionMethod {
      UNKNOWN = "UNKNOWN",
      /** Subscriber automatically charged */
      AUTO_CHARGE = "AUTO_CHARGE",
      /** Payments manually collected and managed by owner */
      OFFLINE = "OFFLINE",
      /** Payment will be collected somehow. Billing only issues invoice per cycle. */
      SEND_INVOICE = "SEND_INVOICE",
      /** Payment will be collected externally */
      EXTERNAL = "EXTERNAL"
  }
  interface Duration {
      /** Duration unit: DAY, WEEK, MONTH, YEAR */
      unit?: DurationUnit;
      /** Amount of units. For example,  1 MONTH, 1 YEAR, 2 WEEKS, etc. Optional. Default is 1. */
      count?: number | null;
  }
  enum DurationUnit {
      UNKNOWN = "UNKNOWN",
      DAY = "DAY",
      WEEK = "WEEK",
      MONTH = "MONTH",
      YEAR = "YEAR"
  }
  interface CustomBillingSchedule {
      /**
       * Amount of cycles to be paid on Subscription creation, currently only cycles_to_pay_on_creation equals to 1 is supported
       * When used with Subscription.start_date, Subscription cycles will be paid on creation but Subscription will be activated in the future
       */
      cyclesToPayOnCreation?: number | null;
  }
  interface FullAddressDetails {
      /** Details about the person associated with the address. */
      contactDetails?: FullAddressContactDetails;
      /** Information about the address. */
      address?: Address;
  }
  interface FullAddressContactDetails {
      /** First name of the contact. */
      firstName?: string | null;
      /** Last name of the contact. */
      lastName?: string | null;
      /** Phone number of the contact. */
      phone?: string | null;
      /** Company associated with the contact. */
      company?: string | null;
      /** Email address of the contact. */
      email?: string | null;
  }
  interface Address extends AddressStreetOneOf {
      /** Street name and number. */
      streetAddress?: StreetAddress;
      /** Main address line, usually street and number as free text. */
      addressLine1?: string | null;
      /**
       * 2-letter country code in
       * [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
       * format.
       */
      country?: string | null;
      /**
       * Subdivision. Usually a state, region, prefecture, or province code,
       * according to [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2).
       */
      subdivision?: string | null;
      /** City name. */
      city?: string | null;
      /** Zip/postal code. */
      postalCode?: string | null;
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
  }
  interface TaxSettings {
      /** If true then taxes are included in given prices */
      inclusive?: boolean;
  }
  interface AdditionalFee {
      /**
       * Name of the conditional fee.
       *
       * Max: 500 characters
       */
      name?: string;
      /**
       * Amount of the conditional fee.
       *
       * Min: `0.01`
       */
      amount?: string;
      /**
       * When the fee is added to the invoice.
       *
       * + `UNKNOWN_FEE_TRIGGER`: There is no information about when the fee is added to an invoice.
       * + `FIRST_PAYMENT`: The fee is only added to the very first invoice of a subscription.
       */
      trigger?: AdditionalFeeTrigger;
      /** Information about the tax of the conditional fee. */
      tax?: Tax;
  }
  enum AdditionalFeeTrigger {
      UNKNOWN = "UNKNOWN",
      /** Charge upon subscription first payment */
      FIRST_PAYMENT = "FIRST_PAYMENT"
  }
  interface Tax extends TaxValueOneOf {
      /**
       * Tax amount for the invoice's line item. Available when the tax is an
       * amount and not a precentage.
       *
       * Min: `0.01`
       */
      amount?: string;
      /**
       * Tax amount for the invoice's line item price and application fee.
       * Can't be combined with `invoiceItems.priceDetails.discount`.
       * Available when the tax is a precentage and not an amount.
       *
       * Min: `0.01`
       * Max: `100`
       */
      percentage?: string;
      /** Dynamic tax calculation */
      dynamic?: DynamicTax;
  }
  /** @oneof */
  interface TaxValueOneOf {
      /**
       * Tax amount for the invoice's line item. Available when the tax is an
       * amount and not a precentage.
       *
       * Min: `0.01`
       */
      amount?: string;
      /**
       * Tax amount for the invoice's line item price and application fee.
       * Can't be combined with `invoiceItems.priceDetails.discount`.
       * Available when the tax is a precentage and not an amount.
       *
       * Min: `0.01`
       * Max: `100`
       */
      percentage?: string;
      /** Dynamic tax calculation */
      dynamic?: DynamicTax;
  }
  interface DynamicTax {
      /** Tax group ID used to calculate tax, default will be used if not available */
      taxGroupId?: string | null;
      /** Taxable address used to calculate tax */
      taxableAddressType?: TaxableAddressType;
  }
  enum TaxableAddressType {
      UNKNOWN = "UNKNOWN",
      /** Tax will be calculated using a single address */
      BUSINESS = "BUSINESS",
      /** Tax will be calculated using multiple address (from BUSINESS to BILLING) */
      BILLING = "BILLING",
      /** Tax will be calculated using multiple address (from BUSINESS to SHIPPING) */
      SHIPPING = "SHIPPING"
  }
  interface ShippingCharges {
      /**
       * Amount of the shipping fee in `0.00` format.
       *
       * Min: `0.01`
       */
      amount?: string;
      /** Tax of the shipping fee */
      tax?: Tax;
      discounts?: Discount[];
  }
  interface Discount extends DiscountValueOneOf {
      /**
       * Discount amount.
       * Available when the discount is an amount.
       *
       * Min: `0.01`
       */
      amount?: string;
      /**
       * Discount percentage.
       * Available when the discount is a parcentage value.
       *
       * Min: `0.01`
       * Max: `100`
       */
      percentage?: string;
      cycles?: DiscountCycles;
      /** Discount origin is coming from. Contains app_id and entity_id */
      origin?: DiscountOrigin;
  }
  /** @oneof */
  interface DiscountValueOneOf {
      /**
       * Discount amount.
       * Available when the discount is an amount.
       *
       * Min: `0.01`
       */
      amount?: string;
      /**
       * Discount percentage.
       * Available when the discount is a parcentage value.
       *
       * Min: `0.01`
       * Max: `100`
       */
      percentage?: string;
  }
  interface DiscountCycles {
      /** The cycle from which the discount will start. Minimum cycle number is 1 */
      cycleFrom?: number;
      /** Number of cycles to be applied on them discount. In order to apply a discount on all cycles until the end of the subscription, this field should be empty. */
      numberOfCycles?: number | null;
  }
  interface DiscountOrigin {
      appId?: string;
      entityId?: string;
  }
  interface ExternalCollectionDetails {
      /** The name of the external collector. */
      collectorName?: string;
  }
  interface BillingStatus {
      /**
       * Current cycle of subscription billing schedule. When billing schedule starts cycles start from 1
       * and incremented each next billing cycle.
       * In case billing schedule not started (free trial, pay later start later) then current_cycle will remain 0
       */
      currentCycle?: number;
      /** how many cycled are remaining, For auto-renew subscriptions is not set. */
      remainingCycles?: number | null;
      /** Date when charge will be for next billing cycle */
      nextBillingDate?: Date | null;
      /** Previous Date charged for previous billing cycle */
      previousBillingDate?: Date | null;
      /** last payment details */
      latestPaymentData?: PaymentData;
      /** Free trial data */
      freeTrialData?: FreeTrialData;
      /**
       * Update billing date operation data
       * @internal
       */
      updateBillingDateData?: UpdateBillingDateData;
      /**
       * Grace period information during grace period after payment failure
       * @readonly
       */
      gracePeriodData?: GracePeriodData;
  }
  /** TODO: fill docs */
  interface PaymentData {
      invoiceId?: string;
      paymentStatus?: PaymentStatus;
      totals?: Totals;
      initialFailedPaymentDate?: Date | null;
  }
  enum PaymentStatus {
      /** Payment status unknown */
      UNKNOWN = "UNKNOWN",
      /** Payment has not been paid */
      UNPAID = "UNPAID",
      /** Payment has been paid // TODO: p13n review: we are not sending event when in SEND_INVOICE mode cycle was paid. should we and which event? */
      PAID = "PAID",
      /** Payment failed */
      FAILED = "FAILED"
  }
  interface Totals {
      /**
       * Total price of the subscription that the customer must pay per billing
       * cycle. Calculated as: `subtotal + tax + shippingFee + applicationFee + extraCharge - discount - credit`
       * @readonly
       */
      totalPrice?: string;
      /**
       * Subtotal of all line items that belong to the subscription.
       * Calculated as: `sum_{i=1}^{n} (itemPrice[i] * quantity[i])`
       * @readonly
       */
      subtotal?: string;
      /**
       * Total tax.
       * @readonly
       */
      tax?: string | null;
      /**
       * Total discount.
       * @readonly
       */
      discount?: string | null;
      /**
       * Total application fee.
       * @readonly
       */
      applicationFee?: string | null;
      /**
       * Total shipping fee.
       * @readonly
       */
      shippingFee?: string | null;
      /**
       * Total charges.
       * @readonly
       */
      extraCharge?: string | null;
      /**
       * Total credits.
       * @readonly
       */
      credit?: string | null;
      /**
       * The tax amount of the proration.
       * @readonly
       */
      prorationTax?: string | null;
  }
  interface FreeTrialData {
      /**
       * Date when free trial starts
       * @readonly
       */
      startDate?: Date | null;
      /**
       * Date when free trial ends
       * @readonly
       */
      endDate?: Date | null;
  }
  interface UpdateBillingDateData {
      /**
       * Date until the subscription is paid for.
       * Different from `nextBillingDate` only when the next billing date is updated without immediately issuing a new invoice.
       */
      paidUntil?: Date | null;
      /** Information about how to adjust the item's payment due to the update of the billing date */
      proration?: Proration;
  }
  interface Proration extends ProrationTypeOneOf {
      /**
       * BASS automatically calculates the proration amount based on the number
       * of days added to or removed from the current billing cycle. BASS uses
       * this formula to calculate the charge or credit amount:
       * `(Subscription total for the current billing cycle) * (number of days added to or removed from the current billing cycle) / (total number of days for the current billing cycle before the adjustment)`.
       * For example, the customer has paid 100 UDS for the current
       * billing cycle that last 31 days, and you want to extend the cycle by 8
       * days. Then, BASS calculates the proration amount like this:
       * `100 USD * 8 days / 31 days`, which equals `25.81 USD`.
       */
      timeBased?: TimeBasedProration;
      /** Proration amount that's based on your custom calculation. */
      custom?: CustomProration;
  }
  /** @oneof */
  interface ProrationTypeOneOf {
      /**
       * BASS automatically calculates the proration amount based on the number
       * of days added to or removed from the current billing cycle. BASS uses
       * this formula to calculate the charge or credit amount:
       * `(Subscription total for the current billing cycle) * (number of days added to or removed from the current billing cycle) / (total number of days for the current billing cycle before the adjustment)`.
       * For example, the customer has paid 100 UDS for the current
       * billing cycle that last 31 days, and you want to extend the cycle by 8
       * days. Then, BASS calculates the proration amount like this:
       * `100 USD * 8 days / 31 days`, which equals `25.81 USD`.
       */
      timeBased?: TimeBasedProration;
      /** Proration amount that's based on your custom calculation. */
      custom?: CustomProration;
  }
  interface TimeBasedProration {
  }
  interface CustomProration extends CustomProrationAmountOneOf {
      /**
       * Proration charge amount that's based on your custom calculation.
       * Increases the total that the customer must pay with the next invoice.
       *
       * Min: `0.01`
       */
      charge?: string;
      /**
       * Proration credit amount that's based on your custom calculation.
       * Lowers the total that the customer must pay with the next invoice.
       *
       * Min: `0.01`
       */
      credit?: string;
  }
  /** @oneof */
  interface CustomProrationAmountOneOf {
      /**
       * Proration charge amount that's based on your custom calculation.
       * Increases the total that the customer must pay with the next invoice.
       *
       * Min: `0.01`
       */
      charge?: string;
      /**
       * Proration credit amount that's based on your custom calculation.
       * Lowers the total that the customer must pay with the next invoice.
       *
       * Min: `0.01`
       */
      credit?: string;
  }
  interface GracePeriodData {
      /**
       * Grace period start date
       * @readonly
       */
      startDate?: Date | null;
      /**
       * Grace period end date
       * @readonly
       */
      endDate?: Date | null;
      /** Automatic retry data during grade period, if have any. Optional. */
      automaticRetryData?: AutomaticRetryData;
  }
  interface AutomaticRetryData {
      enabled?: boolean;
  }
  interface SubscriptionPolicies {
      /** Subscription can be canceled by the customer who bought it */
      customerCanCancel?: boolean;
      /** Subscription end date can be updated by business */
      businessCanExtend?: boolean;
      /** Subscription can be canceled not only immediately, but also at end of billing cycle by turning off auto-renew */
      allowEndOfCycleCancellation?: boolean;
  }
  interface PauseInfo {
      pausePolicy?: PausePolicy;
      pauseAt?: PauseAt;
      startDate?: Date | null;
      startCycle?: number | null;
      resumeAt?: ResumeAt;
      resumeDate?: Date | null;
      resumeCycle?: number | null;
  }
  enum PausePolicy {
      NONE = "NONE",
      /** Pause the payment and the service. When resuming, the subscription end date is extended by the number of cycles postponed, and if the pause happened in a middle of a cycle, the payment date is postponed by the amount of days that already paid. */
      SERVICE_AND_PAYMENTS = "SERVICE_AND_PAYMENTS",
      /** Pause the service and continue the billing. When resuming, extend the service by the time that was paused */
      SERVICE_ONLY = "SERVICE_ONLY"
  }
  enum PauseAt {
      /** Cancel scheduled pause */
      NONE = "NONE",
      /** Pause the subscription now */
      IMMEDIATELY = "IMMEDIATELY",
      /** Pause the subscription at the next billing date */
      NEXT_BILLING_DATE = "NEXT_BILLING_DATE",
      /** A specific date must be defined in Schedule.specific_date */
      SPECIFIC_DATE = "SPECIFIC_DATE",
      /** The number of cycles must be defined in Schedule.number_of_cycles */
      NUMBER_OF_CYCLES_FROM_TODAY = "NUMBER_OF_CYCLES_FROM_TODAY"
  }
  enum ResumeAt {
      /** Cancel scheduled resume */
      NONE = "NONE",
      /** Resume the subscription now */
      IMMEDIATELY = "IMMEDIATELY",
      /** Resume the subscription at the next billing date */
      NEXT_BILLING_DATE = "NEXT_BILLING_DATE",
      /** A specific date must be defined in Schedule.specific_date */
      SPECIFIC_DATE = "SPECIFIC_DATE"
  }
  interface CancellationInfo {
      /** Subscription cancel date. Can contain a future or past date */
      cancellationDate?: Date | null;
      /** Initiator for cancellation */
      initiator?: HistoryActionInitiator;
      /** Reason for cancellation. Optional. */
      reason?: string | null;
  }
  enum HistoryActionInitiator {
      UNDEFINED = "UNDEFINED",
      BUSINESS = "BUSINESS",
      CUSTOMER = "CUSTOMER",
      SYSTEM = "SYSTEM",
      PAYMENT_FAILURE = "PAYMENT_FAILURE"
  }
  interface SubscriptionUpdateData {
      itemsToUpdate?: ItemChange[];
      itemsToAdd?: Item[];
      itemsToDelete?: string[] | null;
      /** @readonly */
      numberOfRequests?: number;
  }
  interface ItemChange {
      /** Item ID */
      _id?: string;
      pricingModel?: PricingModel;
      quantity?: number | null;
      tax?: Tax;
  }
  interface PricingModel extends PricingModelModelOneOf {
      /** Details about the fixed item price. */
      fixedPrice?: FixedPrice;
  }
  /** @oneof */
  interface PricingModelModelOneOf {
      /** Details about the fixed item price. */
      fixedPrice?: FixedPrice;
  }
  interface FixedPrice {
      /**
       * Fixed item price with a period as a decimal separator. For example, `3.99`.
       * Price doesn't include tax, discounts, or application fee.
       *
       * Min: `0.01`
       */
      itemPrice?: string;
  }
  interface Item {
      /**
       * Unique identifier of subscription item. Automatically generated and read-only.
       * @readonly
       */
      _id?: string | null;
      /** Name of the item. Typically product name. */
      name?: string;
      /** Description of the item. */
      description?: string | null;
      /** References to external product catalog data known to client. */
      catalogReference?: CatalogReference;
      /** Category of item. Whether it is digital or physical one. */
      category?: ItemCategory;
      /** Amount of products */
      quantity?: number;
      /** Pricing model of the item. Whether fixed price or dynamic price models. */
      pricingModel?: PricingModel;
      /** Tax, positive value, optional */
      tax?: Tax;
      /** Discounts applied on item price */
      discounts?: Discount[];
      /** Application specific fee, positive value, optional (if application_fee == 0, don't include it to request). Only positive values. */
      applicationFee?: ApplicationFee;
      /**
       * External reference identifier for mapping item in consumer's system.
       * This allows the consumer to correlate the item in their system with the item in this API.
       */
      externalId?: string | null;
      /**
       * Key / Value store to keep up to 10 additional values related to the subscription item.
       * Key max length = 50, Value max length = 200. Value can not be empty.
       * Should not include any sensitive or PII information.
       */
      metadata?: Record<string, string>;
  }
  interface CatalogReference {
      /** Product ID from the external catalog. */
      catalogItemId?: string;
      /**
       * ID of the app that the product catalog belongs to.
       * When omitted, BASS assumes that the product belongs to the subscription's
       * `origin.appId`.
       *
       * Min: 1 character
       * Max: 50 characters
       */
      appId?: string | null;
  }
  enum ItemCategory {
      UNKNOWN = "UNKNOWN",
      PHYSICAL = "PHYSICAL",
      DIGITAL = "DIGITAL"
  }
  interface ApplicationFee extends ApplicationFeeValueOneOf {
      /** Amount of the application fee in `0.00` format. */
      amount?: string;
      /**
       * Discounts for the application fee.
       *
       * Max: 5 discounts
       */
      discounts?: Discount[];
  }
  /** @oneof */
  interface ApplicationFeeValueOneOf {
      /** Amount of the application fee in `0.00` format. */
      amount?: string;
  }
  interface SpecificDateSubscriptionUpdateData {
      updateData?: SubscriptionUpdateData;
      executionDate?: Date | null;
  }
  interface ListSubscriptionHistoryRequest {
      subscriptionId: string;
      /** Determines the type of view for the history: either a comprehensive backoffice view or a user-centric view. */
      mode?: HistoryViewMode;
      /** Cursor for efficient paging. If paging through results, pass this field from the previous search response to continue to the next page. */
      cursor?: CursorPaging;
  }
  enum HistoryViewMode {
      UNKNOWN = "UNKNOWN",
      /** Comprehensive view including all history events. */
      BACKOFFICE = "BACKOFFICE",
      /** User-centric view of the history. */
      USER = "USER"
  }
  interface CursorPaging {
      /** Maximum number of items to return in the results. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * Pass the relevant cursor token from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface ListSubscriptionHistoryResponse {
      /** List of history entries for the subscription. */
      historyEntries?: SubscriptionHistoryEntry[];
      /** Paging metadata. A `next` cursor is returned if there are more results. */
      pagingMetadata?: PagingMetadataV2;
  }
  interface SubscriptionHistoryEntry {
      entryId?: string;
      /** TODO: add max length? it is not defined in domainevents, so should we? */
      slug?: string;
      entryTime?: Date | null;
      event?: SubscriptionEvent;
  }
  interface SubscriptionEvent extends SubscriptionEventPayloadOneOf {
      created?: SubscriptionCreated;
      updated?: SubscriptionUpdated;
      deleted?: SubscriptionDeleted;
      activated?: SubscriptionActivated;
      ended?: SubscriptionEnded;
      canceled?: SubscriptionCanceled;
      paused?: SubscriptionPaused;
      resumed?: SubscriptionResumed;
      pauseRequested?: PauseSubscriptionRequested;
      resumeRequested?: ResumeSubscriptionRequested;
      scheduledPauseCanceled?: ScheduledPauseCanceled;
      scheduledResumeCanceled?: ScheduledResumeCanceled;
      billingCycleStarted?: SubscriptionBillingCycleStarted;
      autoRenewalTurnedOn?: SubscriptionAutoRenewalTurnedOn;
      autoRenewalTurnedOff?: SubscriptionAutoRenewalTurnedOff;
      cycleReadyToPay?: SubscriptionCycleReadyToPay;
      extended?: SubscriptionExtended;
      initialPurchaseCompleted?: SubscriptionInitialPurchaseCompleted;
      latestInvoiceMarkedAsPaid?: LatestInvoiceMarkedAsPaid;
      revived?: SubscriptionRevived;
      billingDateUpdated?: SubscriptionBillingDateUpdated;
      futureUpdatesRequested?: FutureUpdatesRequested;
      updatesApplied?: UpdatesApplied;
      resetPendingUpdates?: ResetPendingUpdates;
      gracePeriodStarted?: GracePeriodStarted;
      gracePeriodEnded?: GracePeriodEnded;
      paymentMethodUpdated?: PaymentMethodUpdated;
      collectionMethodUpdated?: SubscriptionCollectionMethodUpdated;
      freeTrailStarted?: FreeTrailStarted;
      freeTrailEnded?: FreeTrailEnded;
      subscriptionBoAction?: SubscriptionBackOfficeAction;
      unknown?: UnknownSubscriptionEvent;
  }
  /** @oneof */
  interface SubscriptionEventPayloadOneOf {
      created?: SubscriptionCreated;
      updated?: SubscriptionUpdated;
      deleted?: SubscriptionDeleted;
      activated?: SubscriptionActivated;
      ended?: SubscriptionEnded;
      canceled?: SubscriptionCanceled;
      paused?: SubscriptionPaused;
      resumed?: SubscriptionResumed;
      pauseRequested?: PauseSubscriptionRequested;
      resumeRequested?: ResumeSubscriptionRequested;
      scheduledPauseCanceled?: ScheduledPauseCanceled;
      scheduledResumeCanceled?: ScheduledResumeCanceled;
      billingCycleStarted?: SubscriptionBillingCycleStarted;
      autoRenewalTurnedOn?: SubscriptionAutoRenewalTurnedOn;
      autoRenewalTurnedOff?: SubscriptionAutoRenewalTurnedOff;
      cycleReadyToPay?: SubscriptionCycleReadyToPay;
      extended?: SubscriptionExtended;
      initialPurchaseCompleted?: SubscriptionInitialPurchaseCompleted;
      latestInvoiceMarkedAsPaid?: LatestInvoiceMarkedAsPaid;
      revived?: SubscriptionRevived;
      billingDateUpdated?: SubscriptionBillingDateUpdated;
      futureUpdatesRequested?: FutureUpdatesRequested;
      updatesApplied?: UpdatesApplied;
      resetPendingUpdates?: ResetPendingUpdates;
      gracePeriodStarted?: GracePeriodStarted;
      gracePeriodEnded?: GracePeriodEnded;
      paymentMethodUpdated?: PaymentMethodUpdated;
      collectionMethodUpdated?: SubscriptionCollectionMethodUpdated;
      freeTrailStarted?: FreeTrailStarted;
      freeTrailEnded?: FreeTrailEnded;
      subscriptionBoAction?: SubscriptionBackOfficeAction;
      unknown?: UnknownSubscriptionEvent;
  }
  interface SubscriptionCreated {
      subscription?: Subscription;
  }
  interface SubscriptionUpdated {
      current?: Subscription;
      previous?: Subscription;
      diff?: SubscriptionDiff;
  }
  interface SubscriptionDiff {
      added?: string | null;
      changed?: string | null;
      deleted?: string | null;
  }
  interface SubscriptionDeleted {
      subscriptionId?: string;
  }
  /**
   * Sent each time a subscription status has been set to Active
   * Active shows that a subscription is live and operational.
   * For example:
   * * For subscription with free trial, free trial start date is also the activation date.
   * * For a subscription with future start date, the start date is also the activation date.
   * * When a subscription is resumed from a pause status, the resume date is also the activation date.
   */
  interface SubscriptionActivated {
      subscription?: Subscription;
  }
  /**
   * Sent each time a subscription status has been set to Ended
   * Ended shows that a subscription reached its end date and ended its life cycle as a result of the agreement.
   * This is different from a Canceled subscription which ends the subscription before a designated end date.
   * Therefore, Ended and Canceled are mutually exclusive.
   */
  interface SubscriptionEnded {
      subscription?: Subscription;
  }
  /**
   * Sent each time a subscription status has been set to Canceled
   * Canceled shows that a subscription was canceled and ended its life cycle as a result of some intervention
   * For example:
   * * A user decided to cancel a subscription before the original end date
   * * A subscription is canceled due to bad payment
   */
  interface SubscriptionCanceled {
      subscription?: Subscription;
      actionDetails?: ActionDetails;
  }
  interface ActionDetails {
      initiator?: HistoryActionInitiator;
      reason?: string | null;
  }
  interface SubscriptionPaused {
      subscription?: Subscription;
      pausePolicy?: PausePolicy;
      actionDetails?: ActionDetails;
  }
  interface SubscriptionResumed {
      subscription?: Subscription;
      actionDetails?: ActionDetails;
  }
  interface PauseSubscriptionRequested {
      subscription?: Subscription;
      pauseAt?: PauseAt;
      pausePolicy?: PausePolicy;
      actionDetails?: ActionDetails;
  }
  interface ResumeSubscriptionRequested {
      subscription?: Subscription;
      resumeAt?: ResumeAt;
      actionDetails?: ActionDetails;
  }
  interface ScheduledPauseCanceled {
      subscription?: Subscription;
      actionDetails?: ActionDetails;
  }
  interface ScheduledResumeCanceled {
      subscription?: Subscription;
      actionDetails?: ActionDetails;
  }
  interface SubscriptionBillingCycleStarted {
      subscription?: Subscription;
      /** Wix Pay transaction id, optional. Exists if event was triggered by a payment. */
      paymentTransactionId?: string | null;
  }
  interface SubscriptionAutoRenewalTurnedOn {
      subscription?: Subscription;
      actionDetails?: ActionDetails;
  }
  interface SubscriptionAutoRenewalTurnedOff {
      subscription?: Subscription;
      actionDetails?: ActionDetails;
  }
  interface SubscriptionCycleReadyToPay {
      subscription?: Subscription;
  }
  interface SubscriptionExtended extends SubscriptionExtendedExtendPolicyOneOf {
      extensionPeriod?: Duration;
      extensionBillingCycles?: number;
      subscription?: Subscription;
      actionDetails?: ActionDetails;
  }
  /** @oneof */
  interface SubscriptionExtendedExtendPolicyOneOf {
      extensionPeriod?: Duration;
      extensionBillingCycles?: number;
  }
  interface SubscriptionInitialPurchaseCompleted {
      subscription?: Subscription;
      actionDetails?: ActionDetails;
      paymentTransactionId?: string | null;
  }
  interface LatestInvoiceMarkedAsPaid {
      subscription?: Subscription;
  }
  interface SubscriptionRevived {
      subscription?: Subscription;
  }
  interface SubscriptionBillingDateUpdated {
      subscription?: Subscription;
      billingDate?: Date | null;
      proration?: Proration;
  }
  interface FutureUpdatesRequested {
      subscription?: Subscription;
      requestedUpdateData?: SubscriptionUpdateData;
  }
  interface UpdatesApplied {
      subscription?: Subscription;
      updateAction?: UpdateAction;
      appliedUpdateData?: SubscriptionUpdateData;
  }
  enum UpdateAction {
      NONE = "NONE",
      /** Update subscription immediately, please note proration for updates changing price are not yet supported */
      IMMEDIATELY = "IMMEDIATELY",
      /** Request updates that will take affect only at the start of the next billing cycle. */
      NEXT_BILLING_CYCLE = "NEXT_BILLING_CYCLE",
      /** Reset all pending updates */
      RESET_PENDING_UPDATES = "RESET_PENDING_UPDATES",
      /** Request updates that will take affect only at a specific date. */
      SPECIFIC_DATE = "SPECIFIC_DATE"
  }
  interface ResetPendingUpdates {
      subscription?: Subscription;
  }
  interface GracePeriodStarted {
      subscription?: Subscription;
  }
  interface GracePeriodEnded {
      subscription?: Subscription;
      /** Indication for the payment settlement method. */
      paymentSettlementMethod?: PaymentSettlementMethod;
  }
  enum PaymentSettlementMethod {
      UNKNOWN = "UNKNOWN",
      /** System-defined payment settlement. */
      SYSTEM = "SYSTEM",
      /** Manually mark the payment as paid. */
      MARK_AS_PAID = "MARK_AS_PAID",
      /** Require the customer to pay immediately, by insert a new payment method. */
      CUSTOMER_PAY_NOW = "CUSTOMER_PAY_NOW"
  }
  interface PaymentMethodUpdated {
      subscription?: Subscription;
      initiator?: HistoryActionInitiator;
      paymentMode?: PaymentMode;
  }
  enum PaymentMode {
      NONE = "NONE",
      /** The latest invoice of the subscription will be charged. */
      CHARGE = "CHARGE",
      /** An authorization invoice with zero amount will be created. */
      AUTHORIZATION = "AUTHORIZATION"
  }
  interface SubscriptionCollectionMethodUpdated {
      subscription?: Subscription;
      newCollectionMethod?: CollectionMethod;
      previousCollectionMethod?: CollectionMethod;
  }
  interface FreeTrailStarted {
      subscription?: Subscription;
  }
  interface FreeTrailEnded {
      subscription?: Subscription;
  }
  interface SubscriptionBackOfficeAction {
      subscription?: Subscription;
      /** The backoffice method name */
      name?: string;
      /** json as string format, to store the flatted request object */
      params?: string;
  }
  /** Defines unknown events restored from the logs */
  interface UnknownSubscriptionEvent {
      subscriptionAsString?: string | null;
  }
  interface PagingMetadataV2 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
      total?: number | null;
      /** Flag that indicates the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
      cursors?: Cursors;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface Cursors {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface GetSubscriptionRequest {
      _id: string;
  }
  interface GetSubscriptionResponse {
      subscription?: Subscription;
  }
  interface CustomerCancelSubscriptionRequest {
      _id: string;
      /** Optional action reason message */
      reason?: string | null;
  }
  interface CustomerCancelSubscriptionResponse {
      subscription?: Subscription;
  }
  interface CustomerTurnOnAutoRenewalRequest {
      _id: string;
      /** Optional action reason message */
      reason?: string | null;
  }
  interface CustomerTurnOnAutoRenewalResponse {
      subscription?: Subscription;
  }
  interface CustomerTurnOffAutoRenewalRequest {
      _id: string;
      /** Optional action reason message */
      reason?: string | null;
  }
  interface CustomerTurnOffAutoRenewalResponse {
      subscription?: Subscription;
  }
  interface CustomerExtendSubscriptionRequest {
      /** The ID of the subscription to be extended */
      _id: string;
      /** Optional action reason message */
      reason?: string | null;
      /** For termed - Subscription end date will be updated with the extension period and number of cycles will be added */
      billingCyclesToAdd: number | null;
  }
  interface CustomerExtendSubscriptionResponse {
      /** The now extended subscription */
      subscription?: Subscription;
  }
  interface QuerySubscriptionsRequest {
      query?: QueryV2;
  }
  interface QueryV2 extends QueryV2PagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
      /**
       * Filter object.
       *
       * Learn more about the [filter section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-filter-section).
       */
      filter?: Record<string, any> | null;
      /**
       * Sort object.
       *
       * Learn more about the [sort section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-sort-section).
       */
      sort?: Sorting[];
      /** Array of projected fields. A list of specific field names to return. If `fieldsets` are also specified, the union of `fieldsets` and `fields` is returned. */
      fields?: string[];
      /** Array of named, predefined sets of projected fields. A array of predefined named sets of fields to be returned. Specifying multiple `fieldsets` will return the union of fields from all sets. If `fields` are also specified, the union of `fieldsets` and `fields` is returned. */
      fieldsets?: string[];
  }
  /** @oneof */
  interface QueryV2PagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
  }
  interface Sorting {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder;
      /**
       * When `field_name` is a property of repeated field that is marked as `MATCH_ITEMS` and sort should be done by
       * a specific element from a collection, filter can/should be provided to ensure correct sort value is picked.
       *
       * If multiple filters are provided, they are combined with AND operator.
       *
       * Example:
       * Given we have document like {"id": "1", "nestedField": [{"price": 10, "region": "EU"}, {"price": 20, "region": "US"}]}
       * and `nestedField` is marked as `MATCH_ITEMS`, to ensure that sorting is done by correct region, filter should be
       * { fieldName: "nestedField.price", "select_items_by": [{"nestedField.region": "US"}] }
       * @internal
       */
      selectItemsBy?: Record<string, any>[] | null;
  }
  enum SortOrder {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface Paging {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface QuerySubscriptionsResponse {
      subscriptions?: Subscription[];
      metadata?: PagingMetadataV2;
  }
  interface CountSubscriptionsRequest {
      /** Filters to specify which subscriptions are counted. */
      filter?: CountSubscriptionFilter;
  }
  interface CountSubscriptionFilter extends CountSubscriptionFilterStatusOneOf {
      /** List of statuses to filter the counted subscriptions by. */
      statuses?: SubscriptionStatus;
      /**
       * Predefined status combination to filter the counted subscriptions by.
       * + `ALL`: Includes these subscription statuses: `"DRAFT"`, `"PENDING"`, `"ACTIVE"`, `"PAUSED"`, `"ENDED"`, and `"CANCELED"`.
       * + `LIVE`: Includes these subscription statuses: `"PENDING"`, `"ACTIVE"`, and `"PAUSED"`.
       */
      statusGroup?: SubscriptionStatusGroup;
      /**
       * Customer ID to filter the counted subscriptions by. You can pass a
       * [member ID](https://bo.wix.com/wix-docs/rest/members/members/member-object),
       * [contact ID](https://bo.wix.com/wix-docs/rest/crm/contacts/contacts-v4/contact-object),
       * or the ID of an anonymous site visitor as `customerId`. When providing a
       * `customerId` you must also specify a `paymentMethodId`.
       */
      customerId?: string | null;
      /**
       * ID of the payment method to filter the counted subscriptions by.
       * You must provide a `paymentMethodId` when passing a `customerId`.
       */
      paymentMethodId?: string | null;
  }
  /** @oneof */
  interface CountSubscriptionFilterStatusOneOf {
      /** List of statuses to filter the counted subscriptions by. */
      statuses?: SubscriptionStatus;
      /**
       * Predefined status combination to filter the counted subscriptions by.
       * + `ALL`: Includes these subscription statuses: `"DRAFT"`, `"PENDING"`, `"ACTIVE"`, `"PAUSED"`, `"ENDED"`, and `"CANCELED"`.
       * + `LIVE`: Includes these subscription statuses: `"PENDING"`, `"ACTIVE"`, and `"PAUSED"`.
       */
      statusGroup?: SubscriptionStatusGroup;
  }
  interface SubscriptionStatus {
      /**
       * Statuses to filter the counted subscriptions by.
       *
       * Max: 6 statuses
       */
      statuses?: SubscriptionStatusEnumSubscriptionStatus[];
  }
  enum SubscriptionStatusGroup {
      UNKNOWN_STATUS_GROUP = "UNKNOWN_STATUS_GROUP",
      ALL = "ALL",
      /** Union of ACTIVE, PAUSED and PENDING */
      LIVE = "LIVE"
  }
  interface CountSubscriptionsResponse {
      /**
       * List of statuses and the corresponding number of subscriptions that match
       * the filters.
       */
      countByStatus?: CountByStatus[];
      /** Total number of subscriptions that match the filters. */
      total?: number;
  }
  interface CountByStatus {
      /** Subscription status. */
      status?: SubscriptionStatusEnumSubscriptionStatus;
      /** Number of subscriptions with the status that match the filters. */
      count?: number;
  }
  interface UpdateSubscriptionPaymentMethodRequest {
      /** Subscription ID */
      _id: string;
      paymentMethodId: string;
  }
  interface UpdateSubscriptionPaymentMethodResponse {
      subscription?: Subscription;
  }
  interface CustomerAllowedActionsRequest {
      _id: string;
  }
  interface CustomerAllowedActionsResponse {
      actions?: Action[];
  }
  interface Action {
      actionType?: ActionType;
      pausePolicies?: PausePolicy[];
      pauseAt?: PauseAt[];
      resumeAt?: ResumeAt[];
      extendPolicies?: ExtendPolicyType[];
  }
  enum ActionType {
      NONE = "NONE",
      CREATION = "CREATION",
      CANCEL = "CANCEL",
      CYCLE_AUTO_RENEW_ON = "CYCLE_AUTO_RENEW_ON",
      CYCLE_AUTO_RENEW_OFF = "CYCLE_AUTO_RENEW_OFF",
      PAUSE = "PAUSE",
      RESUME = "RESUME",
      MARK_AS_PAID = "MARK_AS_PAID",
      EXTEND = "EXTEND",
      UPDATE = "UPDATE",
      UPDATE_START_DATE = "UPDATE_START_DATE",
      UPM = "UPM",
      UPDATE_BILLING_DATE = "UPDATE_BILLING_DATE",
      UPDATE_COLLECTION_METHOD = "UPDATE_COLLECTION_METHOD"
  }
  enum ExtendPolicyType {
      PERIOD = "PERIOD",
      BILLING_CYCLE = "BILLING_CYCLE"
  }
  interface CustomerListUpcomingChargesRequest {
      /** Subscription id upcoming charge to be previewed for */
      _id: string;
  }
  interface CustomerListUpcomingChargesResponse {
      /** Subscription upcoming charge. Will be empty if no more billing scheduled. */
      upcomingCharge?: SubscriptionCharge;
  }
  interface SubscriptionCharge {
      /** cycle of future charge */
      cycle?: number;
      /** date of the charge */
      billingDate?: Date | null;
      /** breakdown of charge */
      totals?: Totals;
      /** List of items in the invoice */
      invoiceItems?: InvoiceItem[];
      /** Discount details for the invoice */
      discount?: InvoiceDiscount;
  }
  interface InvoiceItem extends InvoiceItemPaymentTypeOneOf {
      /** Information about a line item that's purchased on a recurring basis. */
      recurring?: Recurring;
      /**
       * Empty object that's available when the line item is purchased a single
       * time, not on a recurring basis.
       */
      oneTime?: OneTime;
      /** ID of the invoice line item. */
      _id?: string;
      /**
       * ID of the [subscription](https://bo.wix.com/wix-docs/rest/premium/premium-subscriptions-manager/subscription-object)
       * that belongs to the invoice line item.
       */
      subscriptionId?: string | null;
      /**
       * Name of the invoice line item.
       * Typically the product name.
       *
       * Max: 200 characters
       */
      name?: string;
      /**
       * Description of the invoice line item.
       *
       * Max: 500 characters
       */
      description?: string | null;
      /** Information about the product from the external product catalog. */
      catalogReference?: CatalogReference;
      /**
       * Product category.
       *
       * + `"UNKNOWN"`: There is no information about the product category.
       * + `"PHYSICAL"`: A physical product that's shipped to the shipping address.
       * + `"DIGITAL"`: A digital product that doesn't require shipping.
       */
      category?: ItemCategory;
      /** Quantity of the invoice line item. */
      quantity?: number;
      /** Information about the invoice line item's price. */
      priceDetails?: PriceDetails;
      /** Information about the invoice line item's totals */
      totals?: Totals;
      /**
       * Information about the invoice line item's tax data
       * @readonly
       */
      taxData?: ItemTaxData;
  }
  /** @oneof */
  interface InvoiceItemPaymentTypeOneOf {
      /** Information about a line item that's purchased on a recurring basis. */
      recurring?: Recurring;
      /**
       * Empty object that's available when the line item is purchased a single
       * time, not on a recurring basis.
       */
      oneTime?: OneTime;
  }
  interface Recurring {
      /**
       * Number of cycles. Describes how many times a customer purchases the line item
       * on a recurring basis.
       */
      cycleNumber?: number;
  }
  interface OneTime {
  }
  interface PriceDetails {
      /**
       * Price of the invoice line item in `0.00` format.
       * A minus sign (-) indicates that the amount is negative.
       */
      price?: string;
      /** Information about the invoice line item's tax. */
      tax?: Tax;
      /** Discount that's applied to a specicific invoice line item. */
      discount?: InvoiceDiscount;
      /**
       * Application fee. Set by the origin app, and not by BASS. Wix receives the
       * full `applicationFee`, while the merchant doesn't receive any portion of it.
       */
      applicationFeeDetails?: InvoiceApplicationFee;
  }
  interface InvoiceDiscount extends InvoiceDiscountValueOneOf {
      /**
       * Discount amount.
       * Available when the discount is an amount.
       *
       * Min: `0.01`
       */
      amount?: string;
      /**
       * Discount percentage.
       * Available when the discount is a percentage value.
       *
       * Min: `0.01`
       * Max: `100`
       */
      percentage?: string;
      /** Indicates the source of the discount. . Contains app_id and entity_id */
      origin?: DiscountOrigin;
  }
  /** @oneof */
  interface InvoiceDiscountValueOneOf {
      /**
       * Discount amount.
       * Available when the discount is an amount.
       *
       * Min: `0.01`
       */
      amount?: string;
      /**
       * Discount percentage.
       * Available when the discount is a percentage value.
       *
       * Min: `0.01`
       * Max: `100`
       */
      percentage?: string;
  }
  interface InvoiceApplicationFee extends InvoiceApplicationFeeValueOneOf {
      /**
       * Application fee amount. Set by the origin app, and not by BASS. Wix
       * receives the full `applicationFee`, while the merchant doesn't receive
       * any portion of it.
       */
      amount?: string;
      /** Information about the discount for the invoice line item's application fee. */
      discount?: InvoiceDiscount;
  }
  /** @oneof */
  interface InvoiceApplicationFeeValueOneOf {
      /**
       * Application fee amount. Set by the origin app, and not by BASS. Wix
       * receives the full `applicationFee`, while the merchant doesn't receive
       * any portion of it.
       */
      amount?: string;
  }
  interface ItemTaxData {
      /** Aggregated tax from tax_breakdowns */
      lineItemTaxSummary?: LineItemTaxSummary;
      /** A detailed description of all the tax authorities applied on this item. */
      taxBreakdowns?: TaxBreakdown[];
  }
  interface LineItemTaxSummary {
      /** Calculated from external tax summary */
      aggregatedTaxAmount?: string;
      /** Aggregated from tax_breakdowns */
      aggregatedTaxRate?: string;
      /** Total taxable amount for this line item. */
      taxableAmount?: string;
      /** Aggregated from tax_breakdowns after applying exemptions */
      finalTaxAmount?: string | null;
  }
  interface TaxBreakdown {
      taxType?: string;
      taxRate?: string;
      taxAmount?: string | null;
      taxableAmount?: string | null;
      nonTaxableAmount?: string | null;
      /** Name of the tax that was calculated. For example, "NY State Sales Tax", "Quebec GST", etc. */
      taxName?: string | null;
      /** Jurisdiction that taxes were calculated for. */
      jurisdiction?: string | null;
      /** Type of jurisdiction that taxes were calculated for. */
      jurisdictionType?: string;
  }
  interface InitiatePaymentMethodSetupRequest {
      _id: string;
      paymentMode?: PaymentMode;
      paymentSettings?: PaymentSettings;
  }
  interface PaymentSettings {
      /** Allowed payment providers for Subscriptions, for example to limit subscriptions to be created only with "Wix Payments" provider. */
      allowedProviderIds?: string[];
      /** payment order method, define how the order was applied */
      orderMethod?: OrderMethod;
      /** Wix Pay callback url(s) to return buyer to a third party system */
      redirectUrls?: RedirectUrls;
      paymentMethodId?: string | null;
      /**
       * Specifies an alternative origin for processing the payment.
       * When set, the payment order will be created with the specified origin
       * instead of the default origin.
       */
      paymentOrigin?: PaymentOrigin;
  }
  enum OrderMethod {
      UNKNOWN = "UNKNOWN",
      MOTO = "MOTO",
      NOT_MOTO = "NOT_MOTO"
  }
  interface RedirectUrls {
      /** URL to redirect buyer in case of approved (successful) transaction (required) */
      successUrl?: string;
      /** URL to redirect buyer in case of failed/rejected transaction (required) */
      errorUrl?: string;
      /** URL to redirect buyer in case of buyer canceled the transaction (optional, default: `{error_url}`) */
      cancelUrl?: string;
      /**
       * URL to redirect buyer in case of pending transaction (that might take some time to process) (optional, default:
       * `{success_url}`)
       */
      pendingUrl?: string;
  }
  interface PaymentOrigin {
      /** ID of the app for which the Payment will create the order on. For example, Paypal. */
      appId?: string;
      /** Id of the entity that order will be created on */
      instanceId?: string;
  }
  interface InitiatePaymentMethodSetupResponse {
      paymentOrderId?: string;
  }
  interface DomainEvent extends DomainEventBodyOneOf {
      createdEvent?: EntityCreatedEvent;
      updatedEvent?: EntityUpdatedEvent;
      deletedEvent?: EntityDeletedEvent;
      actionEvent?: ActionEvent;
      /**
       * Unique event ID.
       * Allows clients to ignore duplicate webhooks.
       */
      _id?: string;
      /**
       * Assumes actions are also always typed to an entity_type
       * Example: wix.stores.catalog.product, wix.bookings.session, wix.payments.transaction
       */
      entityFqdn?: string;
      /**
       * This is top level to ease client code dispatching of messages (switch on entity_fqdn+slug)
       * This is although the created/updated/deleted notion is duplication of the oneof types
       * Example: created/updated/deleted/started/completed/email_opened
       */
      slug?: string;
      /** ID of the entity associated with the event. */
      entityId?: string;
      /** Event timestamp in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format and UTC time. For example: 2020-04-26T13:57:50.699Z */
      eventTime?: Date | null;
      /**
       * Whether the event was triggered as a result of a privacy regulation application
       * (for example, GDPR).
       */
      triggeredByAnonymizeRequest?: boolean | null;
      /** If present, indicates the action that triggered the event. */
      originatedFrom?: string | null;
      /**
       * A sequence number defining the order of updates to the underlying entity.
       * For example, given that some entity was updated at 16:00 and than again at 16:01,
       * it is guaranteed that the sequence number of the second update is strictly higher than the first.
       * As the consumer, you can use this value to ensure that you handle messages in the correct order.
       * To do so, you will need to persist this number on your end, and compare the sequence number from the
       * message against the one you have stored. Given that the stored number is higher, you should ignore the message.
       */
      entityEventSequence?: string | null;
  }
  /** @oneof */
  interface DomainEventBodyOneOf {
      createdEvent?: EntityCreatedEvent;
      updatedEvent?: EntityUpdatedEvent;
      deletedEvent?: EntityDeletedEvent;
      actionEvent?: ActionEvent;
  }
  interface EntityCreatedEvent {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent {
      /**
       * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
       * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
       * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
       */
      currentEntityAsJson?: string;
      /**
       * This field is currently part of the of the EntityUpdatedEvent msg, but scala/node libraries which implements the domain events standard
       * wont populate it / have any reference to it in the API.
       * The main reason for it is that fetching the old entity from the DB will have a performance hit on an update operation so unless truly needed,
       * the developer should send only the new (current) entity.
       * An additional reason is not wanting to send this additional entity over the wire (kafka) since in some cases it can be really big
       * Developers that must reflect the old entity will have to implement their own domain event sender mechanism which will follow the DomainEvent proto message.
       * @internal
       * @deprecated
       */
      previousEntityAsJson?: string | null;
      /**
       * WIP - This property will hold both names and values of the updated fields of the entity.
       * For more details please see [adr](https://docs.google.com/document/d/1PdqsOM20Ph2HAkmx8zvUnzzk3Sekp3BR9h34wSvsRnI/edit#heading=h.phlw87mh2imx) or [issue](https://github.com/wix-private/nile-tracker/issues/363)
       * @internal
       */
      modifiedFields?: Record<string, any>;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface EntityDeletedEvent {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface ActionEvent {
      bodyAsJson?: string;
  }
  interface MessageEnvelope {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData;
      /** Stringify payload. */
      data?: string;
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
      identityType?: WebhookIdentityType;
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
  enum WebhookIdentityType {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  interface SetIsMigratedEvent {
      subscriptionId?: string;
  }
  interface SubscriptionDelayedSyncEvent {
      subscriptionId?: string;
  }
  interface InvoiceAction extends InvoiceActionActionTypeOneOf {
      payRecurring?: PayRecurringInvoice;
  }
  /** @oneof */
  interface InvoiceActionActionTypeOneOf {
      payRecurring?: PayRecurringInvoice;
  }
  interface PayRecurringInvoice {
      invoiceId?: string;
  }
  interface CreateSubscriptionRequest {
      subscription: Subscription;
      /** Optional settings for the payments. Should be empty for free subscriptions. */
      paymentSettings?: PaymentSettings;
      /** Optional unique identifier for this request in order to prevent subscription duplications */
      idempotencyKey?: string | null;
      /** Optional origin override for setting identity of subscription creator instead of extracting from context */
      originOverride?: OriginOverride;
  }
  interface OriginOverride {
      appId?: string;
      instanceId?: string;
  }
  interface CreateSubscriptionResponse {
      subscription?: Subscription;
      /** Payments order that should be paid (or authorize card) in order to activate subscription. Empty for free subscriptions. */
      paymentOrderId?: string | null;
  }
  interface UpdateSubscriptionRequest {
      /** Revision is validated if Subscription.revision is set */
      subscription?: Subscription;
      /**
       * Supported field: start_date
       * Can be updated only if Subscription is in Draft state
       * @internal
       */
      fieldMask: string[];
  }
  interface UpdateSubscriptionResponse {
      subscription?: Subscription;
  }
  interface UpdateSubscriptionStartDateRequest {
      /** Subscription ID */
      _id: string;
      /**
       * Can be updated only if Subscription is in Draft state
       * By setting start_date in the future, end_date will be recalculated for termed Subscriptions
       * cycles_to_pay_on_creation will be set to 1 if no free trial is set
       */
      startDate: Date | null;
  }
  interface UpdateSubscriptionStartDateResponse {
      subscription?: Subscription;
  }
  interface UpdateSubscriptionPoliciesRequest {
      /** Subscription ID */
      _id: string;
      cancellableByCustomer?: boolean | null;
  }
  interface UpdateSubscriptionPoliciesResponse {
      /** Updated policies of the subscription */
      policies?: SubscriptionPolicies;
  }
  interface UpdateSubscriptionBillingDateRequest {
      /** ID of the subscription to update the billing date for. */
      _id: string;
      /** New billing date in `YYYY-MM-DDThh:mm:ss:sssZ` format. */
      billingDate: Date | null;
      /**
       * Information about how BASS adjusts the total of the next invoice. Extending
       * the current billing cycle results in a higher payment, while shortening it
       * leads to a lower payment. BASS offers automatic calculation of the proration
       * amount based on the number of days added to or removed from the current billing
       * cycle. Alternatively, you can use your own custom method to calculate the
       * proration amount. The custom proration amount can't exceed the total of the
       * current billing cycle.
       */
      proration?: Proration;
  }
  interface UpdateSubscriptionBillingDateResponse {
      /** Updated subscription. */
      subscription?: Subscription;
  }
  interface UpdateSubscriptionOriginRequest {
      /** ID of the subscription to update origin. */
      _id: string;
      /** Origin entity ID of the subscription to update. */
      entityId: string;
  }
  interface UpdateSubscriptionOriginResponse {
      /** Updated subscription. */
      subscription?: Subscription;
  }
  interface ReviseSubscriptionRequest {
      /** Subscription ID */
      _id: string;
      /** 0 for no revision, maxSize is 100 */
      items?: Item[];
  }
  interface ReviseSubscriptionResponse {
      subscription?: Subscription;
  }
  interface UpdateSubscriptionItemsRequest {
      /** Subscription ID */
      _id: string;
      /** Update action. For RESET_PENDING_UPDATES, nothing but the subscription ID should be defined in the request. */
      updateAction?: UpdateAction;
      /** Updates execution date. Relevant only for UpdateAction.SPECIFIC_DATE. Only specific date is supported. */
      scheduleAdditionalInfo?: ScheduleAdditionalInfo;
      /** Existing items to update */
      itemsToUpdate?: ItemChange[];
      /** Items to add */
      itemsToAdd?: Item[];
      /** Existing items to delete */
      itemsToDelete?: string[] | null;
  }
  interface ScheduleAdditionalInfo extends ScheduleAdditionalInfoParamOneOf {
      /**
       * Future date when the update becomes effective in `YYYY-MM-DDThh:mm:ss.sssZ`
       * format. The use of this field may be restricted in various BASS endpoints.
       * For example, in _Bulk Update Subscription Items_ it's only available in
       * combination with `{"updateAction": "SPECIFIC_DATE"}`, in _Resume Subscription_
       * only in combination with `{"resumeAt": "SPECIFIC_DATE"}`, and in
       * _Pause Subscription_ only in combination with `{"pauseAt": "SPECIFIC_DATE"}`.
       */
      specificDate?: Date | null;
      /**
       * When the update becomes effective, as number of billing cycles from now.
       * The use of this field may be restricted in various BASS endpoints.
       * For example, in _Pause Subscription_ it's only available in
       * combination with `{"pauseAt": "NUMBER_OF_CYCLES_FROM_TODAY"}`.
       * __Note__: Currently not supported in _Bulk Update Subscription Items by Filter_.
       */
      numberOfCycles?: number;
  }
  /** @oneof */
  interface ScheduleAdditionalInfoParamOneOf {
      /**
       * Future date when the update becomes effective in `YYYY-MM-DDThh:mm:ss.sssZ`
       * format. The use of this field may be restricted in various BASS endpoints.
       * For example, in _Bulk Update Subscription Items_ it's only available in
       * combination with `{"updateAction": "SPECIFIC_DATE"}`, in _Resume Subscription_
       * only in combination with `{"resumeAt": "SPECIFIC_DATE"}`, and in
       * _Pause Subscription_ only in combination with `{"pauseAt": "SPECIFIC_DATE"}`.
       */
      specificDate?: Date | null;
      /**
       * When the update becomes effective, as number of billing cycles from now.
       * The use of this field may be restricted in various BASS endpoints.
       * For example, in _Pause Subscription_ it's only available in
       * combination with `{"pauseAt": "NUMBER_OF_CYCLES_FROM_TODAY"}`.
       * __Note__: Currently not supported in _Bulk Update Subscription Items by Filter_.
       */
      numberOfCycles?: number;
  }
  interface UpdateSubscriptionItemsResponse {
      subscription?: Subscription;
  }
  interface BulkUpdateSubscriptionItemsByFilterRequest {
      /**
       * Filter to identify the subscriptions for which items are updated. For
       * supported fields see
       * [Search and Query: Bulk Update Subscription Items By Filter](https://bo.wix.com/wix-docs/rest/drafts/subscriptions-by-billing-by-wix/search-and-query#drafts_subscriptions-by-billing-by-wix_search-and-query_bulk-update-subscription-items-by-filter).
       * Sending an empty subscription filter results in a validation error.
       * In case you pass `{"updateAction": "RESET_PENDING_UPDATES"}`, use only the
       * `subscriptionId` field inside this filter. Passing any other filter results
       * in a failed validation error.
       */
      subscriptionFilter: Record<string, any> | null;
      /**
       * Filter to specify which subscription items are updated. Make sure to use
       * the catalog item ID and not the item's unique ID. All subscription items
       * with matching `items.catalogReference.catalogItemId` are updated.
       *
       * Max: `100` reference catalog item IDs
       */
      catalogReferenceIds: string[] | null;
      /**
       * Information about the update timing and update type.
       *
       * + `"IMMEDIATELY"`: The updates become effective immediately.
       * + `"NEXT_BILLING_CYCLE"`: The updates are scheduled for the beginning of the next billing cycle.
       * + `"SPECIFIC_DATE"`: The updates are scheduled for the date specified in `scheduleAdditionalInfo.specificDate`.
       * + `"RESET_PENDING_UPDATES"`: All currently scheduled updates for the specified supcriptions are canceled. Use only the `subscriptionId` field inside `subscriptionFilter`, all other filters result in failed validation errors.
       */
      updateAction?: UpdateAction;
      /**
       * Additional information for updates. Currently, only supported for
       * `{"updateAction": "SPECIFIC_DATE"}`.
       */
      scheduleAdditionalInfo?: ScheduleAdditionalInfo;
      /**
       * Update details for the susbcription items that match the filtering.
       * Currently, you can update only the item price, quantity, and tax. Note
       * that all item properties are updated to the same values. In case you want set
       * different values for individual items, you must call
       * _Bulk Update Subscription Items By Filter_ multiple times, once per unique update.
       */
      bulkItemUpdateData?: BulkItemChange;
      /** __Not implemented yet__. Items to add to the subscriptions matching the filtering. */
      itemsToAdd?: Item[];
  }
  interface BulkItemChange {
      /** Information about the new item price. */
      pricingModel?: PricingModel;
      /**
       * New item quantity.
       *
       * Min: `1`
       */
      quantity?: number | null;
      /** Information about the new item tax. */
      tax?: Tax;
  }
  interface BulkUpdateSubscriptionItemsByFilterResponse {
      /**
       * ID of your bulk job. You can use
       * [this Async Infra call](https://pbo.wix.com/fire-console/?artifact=com.wixpress.asyncinfra.async-job-service&service=wix.infra.asyncjobs.v1.AsyncJobService&method=ListAsyncJobItems&body=eyJqb2JfaWQiOiIifQ%3D%3D)
       * to retrieve information about the job status.
       */
      jobId?: string;
  }
  interface DeleteSubscriptionRequest {
      _id: string;
      revision?: string;
  }
  interface DeleteSubscriptionResponse {
  }
  interface CancelSubscriptionRequest {
      _id: string;
      actionContext: ActionContext;
  }
  interface ActionContext {
      initiator?: ActionInitiator;
      /** Optional action reason message */
      reason?: string | null;
  }
  enum ActionInitiator {
      UNDEFINED = "UNDEFINED",
      BUSINESS = "BUSINESS",
      CUSTOMER = "CUSTOMER",
      SYSTEM = "SYSTEM"
  }
  interface CancelSubscriptionResponse {
      subscription?: Subscription;
  }
  interface PauseSubscriptionRequest {
      _id: string;
      pausePolicy?: PausePolicy;
      pauseAt?: PauseAt;
      /** contains additional scheduling information for certain pause_at options (for example: SPECIFIC_DATE & NUMBER_OF_CYCLES_FROM_TODAY) */
      pauseAtSchedule?: ScheduleAdditionalInfo;
      /** contains additional scheduling information for certain auto_resume_at either specific date */
      autoResumeAtSchedule?: ScheduleAdditionalInfo;
      actionContext: ActionContext;
  }
  interface PauseSubscriptionResponse {
      subscription?: Subscription;
  }
  interface ResumeSubscriptionRequest {
      _id: string;
      resumeAt?: ResumeAt;
      /** contains additional scheduling information for certain resume_at options (for example: SPECIFIC_DATE) */
      resumeAtSchedule?: ScheduleAdditionalInfo;
      actionContext: ActionContext;
  }
  interface ResumeSubscriptionResponse {
      subscription?: Subscription;
  }
  interface SearchSubscriptionsRequest extends SearchSubscriptionsRequestPagingMethodOneOf {
      /** Limit number of results and enable to skip rows. The default limit is 25. */
      paging?: Paging;
      /** A Cursor option for efficient paging. Pass this field from the previous search response to continue to the next page. */
      cursor?: CursorPaging;
      /** A filter object */
      filter?: any;
      /** A Sorting option by field name and order. */
      sorting?: SortingClauses;
  }
  /** @oneof */
  interface SearchSubscriptionsRequestPagingMethodOneOf {
      /** Limit number of results and enable to skip rows. The default limit is 25. */
      paging?: Paging;
      /** A Cursor option for efficient paging. Pass this field from the previous search response to continue to the next page. */
      cursor?: CursorPaging;
  }
  interface SortingClauses {
      sorting?: Sorting[];
  }
  interface SearchSubscriptionsResponse {
      subscriptions?: Subscription[];
      cursor?: CursorPaging;
  }
  interface TurnOnSubscriptionAutoRenewalRequest {
      _id: string;
      actionContext: ActionContext;
  }
  interface TurnOnSubscriptionAutoRenewalResponse {
      subscription?: Subscription;
  }
  interface TurnOffSubscriptionAutoRenewalRequest {
      _id: string;
      actionContext: ActionContext;
  }
  interface TurnOffSubscriptionAutoRenewalResponse {
      subscription?: Subscription;
  }
  interface MarkLatestInvoiceAsPaidRequest {
      /** The ID of the offline subscription to mark as paid its latest invoice */
      subscriptionId: string;
  }
  interface MarkLatestInvoiceAsPaidResponse {
      subscription?: Subscription;
  }
  interface GetSubscriptionsStatsRequest {
  }
  interface GetSubscriptionsStatsResponse {
      amountByStatuses?: AmountByStatus[];
      total?: number;
  }
  interface AmountByStatus {
      status?: SubscriptionStatusEnumSubscriptionStatus;
      amount?: number;
  }
  interface ExtendSubscriptionRequest extends ExtendSubscriptionRequestExtendPolicyOneOf {
      /** User won't be charged for additional period added on top of subscription end date. */
      extensionPeriod?: Duration;
      /** user will be charged for billing cycles added */
      extensionBillingCycles?: number;
      /** The ID of the subscription to be extended */
      _id: string;
      actionContext: ActionContext;
  }
  /** @oneof */
  interface ExtendSubscriptionRequestExtendPolicyOneOf {
      /** User won't be charged for additional period added on top of subscription end date. */
      extensionPeriod?: Duration;
      /** user will be charged for billing cycles added */
      extensionBillingCycles?: number;
  }
  interface ExtendSubscriptionResponse {
      /** The now extended subscription */
      subscription?: Subscription;
  }
  interface AllowedActionsRequest {
      _id: string;
      /** List of additional fields to be included in the response. */
      fields?: RequestedFields[];
  }
  enum RequestedFields {
      UNKNOWN_REQUESTED_FIELD = "UNKNOWN_REQUESTED_FIELD",
      /** Include unsupported action list, including the reasons for the lack of support */
      UNSUPPORTED_ACTION = "UNSUPPORTED_ACTION"
  }
  interface AllowedActionsResponse {
      /** List of actions that are allowed. */
      actions?: Action[];
      /** List of actions that are not supported, included only if requested. Provides reasons for each unsupported action. */
      unsupportedActions?: UnsupportedAction[];
  }
  interface UnsupportedAction {
      actionType?: ActionType;
      /** Provides detailed reasons for the unsupported action. Each `UnsupportedReason` includes a code and a message explaining why the action is not allowed. */
      reasons?: UnsupportedReason[];
  }
  interface UnsupportedReason {
      code?: string;
      description?: string | null;
  }
  interface ListUpcomingChargesRequest {
      /** Subscription id charges to be previewed for */
      subscriptionId: string;
      /** Period of time to provide charged for. If not provided,then only next charge will be returned. */
      customDuration?: Duration;
      /**
       * Date of the next billing cycle so that the upcoming charges will be calculated accordingly.
       * If not provided, the upcoming charges will be calculated according to the existing next billing date.
       */
      nextBillingDate?: Date | null;
  }
  interface ListUpcomingChargesResponse {
      upcomingCharges?: SubscriptionCharge[];
  }
  interface PreviewSubscriptionChargesRequest extends PreviewSubscriptionChargesRequestSubscriptionOneOf {
      /** Information about a non-existing subscription. */
      subscriptionInfo?: SubscriptionInfo;
  }
  /** @oneof */
  interface PreviewSubscriptionChargesRequestSubscriptionOneOf {
      /** Information about a non-existing subscription. */
      subscriptionInfo?: SubscriptionInfo;
  }
  /** Subscription information to use for calculating the preview of charges for a subscription. */
  interface SubscriptionInfo {
      billingSettings?: BillingSettings;
      items?: Item[];
      startDate?: Date | null;
  }
  interface PreviewSubscriptionChargesResponse {
      /** Charges for subscription. */
      charges?: Charge[];
  }
  /** Represents a charge applicable to a subscription. */
  interface Charge {
      /** The cycle number from which the charge starts. */
      cycleFrom?: number;
      /** The number of cycles for which the charge is applicable. */
      cycleCount?: number | null;
      /** The breakdown of the charge */
      totals?: Totals;
      /** The billing date from which the charge starts */
      cycleBillingDate?: Date | null;
  }
  interface PreviewSubscriptionsChargesRequest {
      /** Information required to calculate the preview charges for the subscriptions, including an identifier. */
      subscriptionsBillingDetails?: SubscriptionBillingDetails[];
      /**
       * Specifies the number of upcoming billing charges to preview for all subscriptions in the order.
       * For instance, if a subscription costs $10 for the first 3 cycles, $12 for cycles 4 through 7,
       * $15 for cycles 8 through 10, and $20 for cycle 11 onwards:
       * - Sending "1" will calculate and return charges for cycles 4 through 7 since it's the first charge in the future.
       * - Sending "2" will provide a response with charges for cycles 4 through 7 and cycles 8 through 10.
       * - Sending "3" or more will include totals for cycles 4 through 7, cycles 8 through 10, and from cycle 11 onwards.
       * If no value is provided, the response will include charges for all upcoming cycles, including the existing one,
       * in this case, charges for cycle 1 through 3.
       * If there is a single charge for a subscription, meaning that subscription price remains consistent across all cycles,
       * then even if future_charges_count is set, it will be ignored and the only charge this subscription has will be returned.
       */
      numberOfNextRecurringCharges?: number | null;
  }
  interface SubscriptionBillingDetails {
      /** External identifier of the subscription */
      externalId?: string | null;
      /** Billing details parameters including schedule, currency, etc. */
      billingSettings?: BillingSettings;
      /** Items, minSize is 1, maxSize is 100 */
      items?: Item[];
      /** Subscription start date, now if not set */
      startDate?: Date | null;
      /** Shipping address associated with subscription. At the moment used only for payments. Optional. */
      shippingAddress?: FullAddressDetails;
  }
  interface PreviewSubscriptionsChargesResponse {
      /** Charges for the subscriptions, including an identifier. */
      subscriptionsCharges?: SubscriptionCharges[];
  }
  interface SubscriptionCharges {
      /** External identifier of the subscription */
      externalId?: string | null;
      /** Charges for subscription. */
      charges?: Charge[];
  }
  interface CreateSubscriptionForOrderRequest {
      /** Subscription needs to be created */
      subscription?: Subscription;
      /** Optional unique identifier for this request in order to prevent subscription duplications */
      idempotencyKey?: string | null;
  }
  interface CreateSubscriptionForOrderResponse {
      /** Created subscription */
      subscription?: Subscription;
      /** Non-persistent invoice */
      invoice?: Invoice;
  }
  /** An invoice includes information about the subscription and the customer. */
  interface Invoice {
      /**
       * Invoice ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Date and time the invoice was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the invoice was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Revision number, which increments by 1 each time the invoice is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the invoice.
       *
       * Ignored when creating a invoice.
       * @readonly
       */
      revision?: string | null;
      /**
       * Source of the invoice.
       * @internal
       */
      source?: string | null;
      /** Information about the invoice origin. */
      origin?: BusinessOriginData;
      /**
       * Invoice status.
       *
       * + `"UNKNOWN"`: There is no information about the invoice status.
       * + `"OPEN"`: BASS has created the invoice but hasn't initiated the payment process.
       * + `"PAID"`: The customer has successfully paid for the invoice.
       * + `"ATTEMPT_FAILED"`: The payment process has started and there has been at least one unsuccessful payment attempt.
       * + `"FAILED"`: The payment process has failed and there are no more retries.
       * + `"CANCELED"`: The payment process has been stopped because the related subscription has been canceled.
       * @readonly
       */
      status?: InvoiceStatus;
      /**
       * 3-letter currency code of the invoice in
       * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
       */
      currency?: string;
      /** Information about the customer. */
      customer?: Customer;
      /**
       * Whether the payment is processed through Wix and whether the customer must provide some input.
       *
       * + `"UNKNOWN"`: There is no information about the collection method.
       * + `"AUTO_CHARGE"`: The customer pays automatically through Wix.
       * + `"SEND_INVOICE"`: The customer pays through Wix, but some manual input is required.
       * + `"OFFLINE"`: The customer pays outside of Wix.
       */
      collectionMethod?: CollectionMethodEnumCollectionMethod;
      /**
       * ID of the
       * [payment method](https://bo.wix.com/wix-docs/rest/wix-cashier/settings/payment-method-type/payment-method-type-object).
       * Not available for the first payment of a subscription and all offline
       * payments.
       */
      paymentMethodId?: string | null;
      /**
       * Cashier [Order ID](https://dev.wix.com/docs/rest/payments/wix-cashier/pay/order#order-object)
       * for the corresponding payment.
       * @readonly
       */
      paymentOrderId?: string | null;
      /** Information about a discount. Available only for invoices that include a discount. */
      discount?: InvoiceDiscount;
      /** Billing address. */
      billingAddress?: FullAddressDetails;
      /** Shipping address. Available only for `"PHYSICAL"` line items. */
      shippingAddress?: FullAddressDetails;
      /** Shipping fee in `0.00` format. */
      shippingFee?: string | null;
      /**
       * Information about the invoice's totals.
       * @readonly
       */
      totals?: Totals;
      /** Line items belonging to the invoice. */
      invoiceItems?: InvoiceItem[];
      /**
       * Whether the invoice is used to validate payment details.
       *
       * + `true`: BASS uses the invoice to test payment details. Relevant for free trials. Ensures that Wix can collect the payment of the first billing cycle.
       * + `false`: Standard invoice.
       */
      isAuthorization?: boolean | null;
      /** Whether the invoice's `totals.totalPrice` includes tax. */
      isTaxInclusive?: boolean | null;
      /**
       * Information about the invoice creation process.
       *
       * + `"UNKNOWN"`: There is no information about how BASS created the invoice.
       * + `"SYSTEM"`: BASS automatically created the invoice.
       * + `"MANUAL"`: A BASS system admin manually created the invoice.
       * @internal
       */
      creationMode?: CreationMode;
      /** Details of the latest payment attempt. */
      latestPaymentAttempt?: LatestPaymentAttempt;
      /** List of charges and credits that adjust the invoice's `totals.totalPrice`. */
      adjustments?: PriceAdjustment[];
      /**
       * Invoice Number.
       * @readonly
       */
      invoiceNumber?: string | null;
      /**
       * Shipping charges for the invoice.
       * Supports only one discount without cycles.
       * Discounts with cycles (repeated discounts across different billing cycles) are not supported for shipping
       */
      shippingCharges?: InvoiceShippingCharges;
      /** Information about the invoice tax */
      taxData?: TaxData;
      /** Business address. */
      businessAddress?: Address;
      /** ID of the billing order that created this invoice. */
      orderId?: string | null;
  }
  interface BusinessOriginData {
      /**
       * ID of the app for which BASS has created the invoice. For example,
       * `"1380b703-ce81-ff05-f115-39571d94dfcd"` for the Wix eCommerce app.
       */
      appId?: string;
      /**
       * [Instance ID](https://dev.wix.com/api/rest/app-management/apps/app-instance/get-app-instance)
       * of the app for which BASS has created the invoice.
       */
      instanceId?: string;
      /**
       * ID of the entity that triggered the invoice creation. For example, the ID of a
       * [pricing plan](https://dev.wix.com/docs/rest/payments/pricing-plans/pricing-plans/plan#plan-object).
       */
      entityId?: string;
  }
  enum InvoiceStatus {
      UNKNOWN = "UNKNOWN",
      OPEN = "OPEN",
      PAID = "PAID",
      FAILED = "FAILED",
      ATTEMPT_FAILED = "ATTEMPT_FAILED",
      CANCELED = "CANCELED"
  }
  enum CollectionMethodEnumCollectionMethod {
      UNKNOWN = "UNKNOWN",
      AUTO_CHARGE = "AUTO_CHARGE",
      OFFLINE = "OFFLINE",
      SEND_INVOICE = "SEND_INVOICE"
  }
  enum CreationMode {
      UNKNOWN = "UNKNOWN",
      SYSTEM = "SYSTEM",
      MANUAL = "MANUAL"
  }
  interface LatestPaymentAttempt {
      /**
       * ID of the latest payment attempt.
       * @readonly
       */
      paymentAttemptId?: string;
      /**
       * Date and time of the latest payment attempt in `YYYY-MM-DDThh:mm.sssZ` format.
       * @readonly
       */
      dateAttempt?: Date | null;
      /** Number of the latest payment attempt. */
      attemptNumber?: number;
      /**
       * Status of the latest payment attempt.
       *
       * + `"UNKNOWN"`: There is no information about the status of the latest payment attempt.
       * + `"SCHEDULED"`:  The latest payment attempt is scheduled but hasn't started yet.
       * + `"IN_PROGRESS"`: The latest payment attempt is in progress.
       * + `"PAID"`: The latest payment attempt resulted in a successful payment.
       * + `"DECLINED"`: The latest payment attempt has been declined.
       * + `"TECHNICAL_FAILURE"`: The latest payment attempt couldn't be process due to a technical failure.
       * + `"CANCELED"`: The latest payment attempt has been canceled by BASS.
       * @readonly
       */
      status?: PaymentAttemptStatus;
      /**
       * Whether BASS tries to collect the payment another time. Available only when
       * `latestPaymentAttempt.status` is set to `"DECLINED"`.
       */
      retryable?: boolean;
  }
  enum PaymentAttemptStatus {
      UNKNOWN = "UNKNOWN",
      SCHEDULED = "SCHEDULED",
      IN_PROGRESS = "IN_PROGRESS",
      PAID = "PAID",
      DECLINED = "DECLINED",
      TECHNICAL_FAILURE = "TECHNICAL_FAILURE",
      CANCELED = "CANCELED",
      PENDING = "PENDING"
  }
  interface PriceAdjustment extends PriceAdjustmentAdjustmentTypeOneOf {
      /** Adjustment that increases the price. */
      charge?: PriceAdjustmentValue;
      /** Adjustment that lowers the price. */
      credit?: PriceAdjustmentValue;
  }
  /** @oneof */
  interface PriceAdjustmentAdjustmentTypeOneOf {
      /** Adjustment that increases the price. */
      charge?: PriceAdjustmentValue;
      /** Adjustment that lowers the price. */
      credit?: PriceAdjustmentValue;
  }
  interface PriceAdjustmentValue extends PriceAdjustmentValueAdjustmentValueTypeOneOf {
      /**
       * Absolute amount that adjusts the price.
       *
       * Min: `0.01`
       */
      amount?: string;
      /**
       * Relative factor that adjusts the price. For example, setting
       * `multiplier` to:
       * - `0.50` results in a price adjustment of 50% of the original value.
       * - `0.75` results in a price adjustment of 75% of the original value.
       * - `1.00` results in a price adjustment of 100% of the original value.
       *
       * Min: `0.01`
       * Max: `1.00`
       */
      multiplier?: string;
  }
  /** @oneof */
  interface PriceAdjustmentValueAdjustmentValueTypeOneOf {
      /**
       * Absolute amount that adjusts the price.
       *
       * Min: `0.01`
       */
      amount?: string;
      /**
       * Relative factor that adjusts the price. For example, setting
       * `multiplier` to:
       * - `0.50` results in a price adjustment of 50% of the original value.
       * - `0.75` results in a price adjustment of 75% of the original value.
       * - `1.00` results in a price adjustment of 100% of the original value.
       *
       * Min: `0.01`
       * Max: `1.00`
       */
      multiplier?: string;
  }
  interface InvoiceShippingCharges {
      /**
       * Amount of the shipping fee in `0.00` format.
       *
       * Min: `0.01`
       */
      amount?: string;
      /** Tax of the shipping fee */
      tax?: Tax;
      /** Information about the shipping charges tax data */
      taxData?: ItemTaxData;
      discount?: Discount;
  }
  /** Tax data from all items */
  interface TaxData {
      /** Aggregated tax data from all items */
      taxSummary?: TaxSummary;
  }
  interface TaxSummary {
      /** Aggregated from tax_breakdowns with exemptions excluded from amount */
      aggregatedTaxAmount?: string;
      /** Array of each tax applied, grouped by `"jurisdiction"`, `"jurisdiction_type"`, `"tax_type"`, `"tax_name"` and `"tax_rate"`. */
      aggregatedTaxBreakdowns?: AggregatedTaxBreakdown[];
  }
  interface AggregatedTaxBreakdown {
      /** Name of the tax that was calculated. */
      taxName?: string;
      /** Type of tax that was calculated. */
      taxType?: string;
      /** Jurisdiction that taxes were calculated for. */
      jurisdiction?: string;
      /** Type of jurisdiction that taxes were calculated for. */
      jurisdictionType?: string;
      /** Tax rate used for this jurisdiction, as a decimal. For example, 10% tax is `"0.1000"` and 200% tax is `"2.0000"`. */
      rate?: string;
      /** Total amount of this tax for this jurisdiction. */
      aggregatedTaxAmount?: string;
      /**
       * Total taxable amount of this tax
       * @internal
       */
      aggregatedTaxableAmount?: string;
  }
  interface Task {
      key?: TaskKey;
      executeAt?: Date | null;
      payload?: string | null;
  }
  interface TaskKey {
      appId?: string;
      instanceId?: string;
      subjectId?: string | null;
  }
  interface TaskAction extends TaskActionActionOneOf {
      complete?: Complete;
      cancel?: Cancel;
      reschedule?: Reschedule;
  }
  /** @oneof */
  interface TaskActionActionOneOf {
      complete?: Complete;
      cancel?: Cancel;
      reschedule?: Reschedule;
  }
  interface Complete {
  }
  interface Cancel {
  }
  interface Reschedule {
      executeAt?: Date | null;
      payload?: string | null;
  }
  interface Empty {
  }
  interface V1SubscriptionEvent extends V1SubscriptionEventEventOneOf {
      /** A subscriptions was created */
      created?: V1SubscriptionCreated;
      /** Subscription is considered active and will be visible to site owners and members */
      activated?: V1SubscriptionActivated;
      /**
       * Subscription was canceled either by cancellation request with requested expiration date NOW or by payment provider.
       * If cancelled by payment provider subscription will be valid until the date calculated depending on how many cycles it was already paid for.
       */
      canceled?: V1SubscriptionCanceled;
      /** Subscription was updated. Currently the only possible change is valid_until date */
      updated?: V1SubscriptionUpdated;
      /** Subscription cycle has started. Currently the cycle starts when a payment is received. */
      cycleTriggered?: SubscriptionCycleTriggered;
      /** Offline subscription was marked as paid */
      markedAsPaid?: SubscriptionMarkedAsPaid;
      /**
       * Subscription cancellation for the future date was requested.
       * Subscription will stay in pending cancellation status until the date calculated depending on free trial and the next payment date.
       */
      cancellationRequested?: SubscriptionCancellationRequested;
      /** Subscription and it's payment schedule (for recurring) was suspended */
      suspended?: SubscriptionSuspended;
      /** Previously suspended subscription and it's payment schedule (for recurring) was resumed */
      resumed?: V1SubscriptionResumed;
      /** Subscription expired according to valid_until expiration date. */
      expired?: SubscriptionExpired;
      /** Subscription initial purchase completed */
      initialPurchaseCompleted?: V1SubscriptionInitialPurchaseCompleted;
  }
  /** @oneof */
  interface V1SubscriptionEventEventOneOf {
      /** A subscriptions was created */
      created?: V1SubscriptionCreated;
      /** Subscription is considered active and will be visible to site owners and members */
      activated?: V1SubscriptionActivated;
      /**
       * Subscription was canceled either by cancellation request with requested expiration date NOW or by payment provider.
       * If cancelled by payment provider subscription will be valid until the date calculated depending on how many cycles it was already paid for.
       */
      canceled?: V1SubscriptionCanceled;
      /** Subscription was updated. Currently the only possible change is valid_until date */
      updated?: V1SubscriptionUpdated;
      /** Subscription cycle has started. Currently the cycle starts when a payment is received. */
      cycleTriggered?: SubscriptionCycleTriggered;
      /** Offline subscription was marked as paid */
      markedAsPaid?: SubscriptionMarkedAsPaid;
      /**
       * Subscription cancellation for the future date was requested.
       * Subscription will stay in pending cancellation status until the date calculated depending on free trial and the next payment date.
       */
      cancellationRequested?: SubscriptionCancellationRequested;
      /** Subscription and it's payment schedule (for recurring) was suspended */
      suspended?: SubscriptionSuspended;
      /** Previously suspended subscription and it's payment schedule (for recurring) was resumed */
      resumed?: V1SubscriptionResumed;
      /** Subscription expired according to valid_until expiration date. */
      expired?: SubscriptionExpired;
      /** Subscription initial purchase completed */
      initialPurchaseCompleted?: V1SubscriptionInitialPurchaseCompleted;
  }
  interface V1SubscriptionCreated {
      subscription?: V1Subscription;
  }
  interface V1Subscription {
      /**
       * ID of the subscription
       * @readonly
       */
      _id?: string;
      /** ID of the app which created the subscription */
      wixAppId?: string;
      /** Instance ID of the Subscriptions app */
      tenantId?: string;
      /** ID of entity in app (e.g. a cart in stores/order in paid plans) */
      originEntityId?: string;
      /** Site member or a contact who bought the subscription */
      subscriber?: Subscriber;
      /** Wix Pay order ID, is empty for free subscriptions */
      wixPayOrderId?: string | null;
      /** Subscription name (e.g. a product or subscription package name) */
      name?: string;
      /** Optional additional subscription description */
      description?: string;
      /** Amount to be paid for a single scheduled payment */
      price?: Money;
      /** True if the subscription is recurring, false for a single payment subscription */
      recurring?: boolean;
      /** Online (paid by subscriber using wix pay) or offline (need to manually mark as paid) */
      subscriptionType?: SubscriptionType;
      /** Active, expired, canceled, etc. */
      subscriptionStatus?: V1SubscriptionStatusEnumSubscriptionStatus;
      /** Subscription start date (may differ from creation date) */
      validFrom?: Date | null;
      /** Subscription expiration date */
      validUntil?: Date | null;
      /** Status of last payment associated with this subscription */
      lastPaymentStatus?: PaymentStatusEnumPaymentStatus;
      /** Payment schedule in the wix pay format. Exists for recurring subscriptions only. */
      billingProfile?: V2Subscription;
      /** Owner, member, etc. - present if subscription is canceled */
      cancellationInitiator?: CancellationInitiator;
      /** Optional, present if subscription is canceled */
      cancellationReason?: string | null;
      /** Can be used for arbitrary app-specific map<string, string> data */
      externalData?: Record<string, string>;
      /** Date when subscription was created (not related to payment dates) */
      dateCreated?: Date | null;
      /** Restrictions on possible subscription actions. Default policy has all restrictions enabled. */
      policy?: SubscriptionPolicy;
      /** List of subscription suspension periods */
      suspensions?: Suspension[];
      /** Initial subscription expiration date that was calculated on the subscription purchase plus duration of suspensions */
      validUntilDateWithSuspensions?: Date | null;
      /** Duration of single payment subscription (instead of billing_profile) */
      singlePaymentDuration?: V1Duration;
      originInstanceId?: string | null;
  }
  interface Subscriber {
      /** Member or contact ID */
      _id?: string;
      /** Member or contact */
      identityType?: IdentityType;
  }
  enum IdentityType {
      /** Identity type undefined */
      UNDEFINED = "UNDEFINED",
      /** Subscription is associated with a member ID */
      MEMBER = "MEMBER",
      /** Subscriptions is associated with a contact ID */
      CONTACT = "CONTACT"
  }
  /** Price of a payment. Includes amount and currency. */
  interface Money {
      /** Monetary amount i.e. 3.99. */
      amount?: string;
      /** Currency in ISO 4217 format i.e. USD. */
      currency?: string;
  }
  enum SubscriptionType {
      UNDEFINED = "UNDEFINED",
      /** Payments made by the subscriber */
      ONLINE = "ONLINE",
      /** Payments managed manually by the site owner */
      OFFLINE = "OFFLINE"
  }
  enum V1SubscriptionStatusEnumSubscriptionStatus {
      /** Subscription status undefined */
      UNDEFINED = "UNDEFINED",
      /** Subscription created, but hasn't been paid for yet. This status if filtered out in ListSubscriptions response by default. */
      DRAFT = "DRAFT",
      /** Subscription has been paid for, but the start date is in the future */
      PENDING = "PENDING",
      /** Subscription is active */
      ACTIVE = "ACTIVE",
      /** Subscription has expired */
      EXPIRED = "EXPIRED",
      /** Subscription has been canceled */
      CANCELED = "CANCELED",
      /** Subscription has been set to be canceled at a future date */
      PENDING_CANCELLATION = "PENDING_CANCELLATION",
      /** Subscription is suspended */
      SUSPENDED = "SUSPENDED"
  }
  enum PaymentStatusEnumPaymentStatus {
      /** Payment status undefined */
      UNDEFINED = "UNDEFINED",
      /** Payment has been paid */
      PAID = "PAID",
      /** Payment has been refunded */
      REFUNDED = "REFUNDED",
      /** Recurring payment has failed */
      FAILED = "FAILED",
      /** Payment has not been paid */
      UNPAID = "UNPAID",
      /** Billing has been initialized, but actual charge is yet to be made. Can happen for free trial and PayPal */
      PENDING = "PENDING"
  }
  /**
   * Recurring payment is described by `frequency` (day, week, month) and `interval`.
   *
   * For example, to create a recurring payment every 14 days, just set `interval` to 14 and frequency to `DAY`.
   *
   * In some cases there should be a trial period for the order, after which payments start to occur.
   * Trial period is also defined as `frequency` and `interval` pair.
   *
   * So one can define a monthly 'subscription' with a 14 days trial period.
   */
  interface V2Subscription {
      /** frequency of recurring payment (required) */
      frequency?: SubscriptionFrequency;
      /** interval of recurring payment (required) */
      interval?: number;
      /** trial period for recurring payment (optional) */
      trial?: SubscriptionTrialPeriod;
      /**
       * how many billing cycles should be done before subscription finishes
       * (optional, 0 by default means endless subscription)
       */
      billingCycles?: number;
      /**
       * date in the future or in the past when the first billing cycle begins
       * (the first off-session payment is performed when it ends)
       */
      firstCycleStartDate?: Date | null;
  }
  /** Frequency unit of recurring payment */
  enum SubscriptionFrequency {
      UNDEFINED = "UNDEFINED",
      DAY = "DAY",
      WEEK = "WEEK",
      MONTH = "MONTH",
      YEAR = "YEAR"
  }
  /** Trial period of subscription */
  interface SubscriptionTrialPeriod {
      /** trial period in units (required) */
      period?: number;
      /** units in which trial period is described (optional, default DAY) */
      unit?: SubscriptionFrequency;
  }
  enum CancellationInitiator {
      /** Cancellation initiator undefined */
      UNDEFINED = "UNDEFINED",
      /** Subscription was canceled by site owner (default if canceled by user or service identity) */
      OWNER = "OWNER",
      /** Subscription was canceled by member (default if canceled by member identity) */
      MEMBER = "MEMBER",
      /** Subscription was canceled because of payment failure */
      PAYMENT_FAILURE = "PAYMENT_FAILURE",
      /** Subscription was canceled because of payment setup failure */
      SETUP_FAILURE = "SETUP_FAILURE"
  }
  interface SubscriptionPolicy {
      /** Subscription expiration date can be updated */
      expiryDateChangeable?: boolean;
      /** Subscription can be cancelled by the member who bought it (when memberId == subscriberId) */
      cancellableByMember?: boolean;
      /** Subscription expiration date on cancellation can be set to next payment date */
      cancellableAtNextPaymentCycle?: boolean;
  }
  interface Suspension {
      status?: Status;
      /** Beginning of the suspended period */
      startsAt?: Date | null;
      /** End of the suspended period */
      endsAt?: Date | null;
  }
  enum Status {
      UNDEFINED = "UNDEFINED",
      ACTIVE = "ACTIVE",
      ENDED = "ENDED"
  }
  /** A duration expressed in amount of time units. */
  interface V1Duration {
      /** Amount of the unit */
      amount?: number;
      /** Day, Week, Month, Year. */
      unit?: SubscriptionFrequency;
  }
  interface V1SubscriptionActivated {
      subscription?: V1Subscription;
  }
  interface V1SubscriptionCanceled {
      subscription?: V1Subscription;
  }
  interface V1SubscriptionUpdated {
      subscription?: V1Subscription;
  }
  interface SubscriptionCycleTriggered {
      subscription?: V1Subscription;
      billingCycle?: number;
      /** Wix Pay transaction id, optional. Exists if event was triggered by a payment. */
      transactionId?: string | null;
  }
  interface SubscriptionMarkedAsPaid {
      subscription?: V1Subscription;
      /** A number indicating which payment (cycle) was marked as paid. For recurring subscriptions only. */
      billingCycle?: number | null;
  }
  interface SubscriptionCancellationRequested {
      subscription?: V1Subscription;
  }
  interface SubscriptionSuspended {
      subscription?: V1Subscription;
  }
  interface V1SubscriptionResumed {
      subscription?: V1Subscription;
  }
  interface SubscriptionExpired {
      subscription?: V1Subscription;
  }
  interface V1SubscriptionInitialPurchaseCompleted {
      subscription?: V1Subscription;
  }
  interface CreateSubscriptionInStateRequest extends CreateSubscriptionInStateRequestModeOneOf {
      activeSubscription?: CreateSubscriptionRequest;
  }
  /** @oneof */
  interface CreateSubscriptionInStateRequestModeOneOf {
      activeSubscription?: CreateSubscriptionRequest;
  }
  interface CreateSubscriptionInStateResponse {
      subscriptionId?: string;
  }
  interface PayCycleRequest {
      subscriptionId: string;
      paymentTestMode?: PaymentTestMode;
      tenantId: string;
  }
  enum PaymentTestMode {
      REGULAR = "REGULAR",
      FAIL_TECHNICAL = "FAIL_TECHNICAL",
      FAIL_DECLINE = "FAIL_DECLINE",
      FAIL_RETRYABLE_DECLINE = "FAIL_RETRYABLE_DECLINE"
  }
  interface PayCycleResponse {
      invoiceId?: string;
      paymentOrderId?: string | null;
      subscription?: Subscription;
  }
  interface GetFullSubscriptionDataRequest {
      _id?: string;
  }
  interface GetFullSubscriptionDataResponse {
      subscription?: Subscription;
      internalSubscriptionData?: InternalSubscriptionData;
  }
  interface InternalSubscriptionData {
      originInstanceId?: string;
      source?: string | null;
      billingType?: string;
      isOneTime?: boolean;
      migrationDetails?: MigrationDetails;
      pausePaidDuration?: string | null;
      authorizationPaymentData?: PaymentData;
      currentCyclePausePeriods?: PausePeriod[];
  }
  interface MigrationDetails {
      /** system (application) where the Subscription has been created */
      originSystem?: string;
      /** date when the Subscription started to be managed in BASS */
      shiftManagementDate?: Date | null;
  }
  interface PausePeriod {
      startDate?: Date | null;
      endDate?: Date | null;
  }
  interface GetSubscriptionAndInternalDataRequest {
      subscriptionId?: string;
      tenantId?: string;
  }
  interface GetSubscriptionAndInternalDataResponse {
      subscription?: Subscription;
      internalSubscriptionData?: InternalSubscriptionData;
  }
  interface SearchSubscriptionRequest {
      _id?: string;
      tenantId?: string;
  }
  interface SearchSubscriptionResponse {
      subscription?: Subscription;
  }
  interface UpdatePausePaidDurationRequest {
      subscriptionId?: string;
      pausePaidDurationSeconds?: string;
      tenantId?: string;
  }
  interface UpdatePausePaidDurationResponse {
  }
  interface UpdateStatusRequest {
      subscriptionId?: string;
      tenantId?: string;
      status?: SubscriptionStatusEnumSubscriptionStatus;
  }
  interface UpdateStatusResponse {
      subscription?: Subscription;
  }
  interface UpdatePaymentStatusRequest {
      subscriptionId?: string;
      tenantId?: string;
      paymentStatus?: PaymentStatus;
  }
  interface UpdatePaymentStatusResponse {
      subscription?: Subscription;
  }
  interface ReviveSubscriptionRequest {
      tenantId?: string;
      subscriptionId?: string;
      revivePolicy?: RevivePolicy;
      isTestRun?: boolean;
  }
  enum RevivePolicy {
      SIMPLE = "SIMPLE",
      RESUME = "RESUME"
  }
  interface ReviveSubscriptionResponse {
      subscription?: Subscription;
  }
  interface ConvertSapiRequest {
      subscriptionId?: string;
  }
  interface ConvertSapiResponse {
      subscription?: Subscription;
  }
  interface GetSubscriptionInvoicesRequest {
      _id?: string;
  }
  interface GetSubscriptionInvoicesResponse {
      invoices?: SubscriptionInvoice[];
  }
  interface SubscriptionInvoice {
      _id?: string;
      subscriptionCycle?: number;
      _createdDate?: Date | null;
  }
  interface FinishFreeTrialNowRequest {
      subscriptionId?: string;
      tenantId?: string;
  }
  interface FinishFreeTrialNowResponse {
      subscription?: Subscription;
  }
  interface SendTimeCapsuleTaskCanceledBIRequest {
      tenantId?: string;
      subscriptionId?: string;
      taskType?: string;
  }
  interface ScheduleTimeCapsuleTaskRequest {
      subscriptionId?: string;
      taskType?: string;
      executionTime?: Date | null;
      tenantId?: string;
  }
  interface CancelTimeCapsuleTaskRequest {
      tenantId?: string;
      subscriptionId?: string;
      taskType?: string;
  }
  interface UpdateFullSubscriptionRequest {
      tenantId?: string;
      subscription?: Subscription;
  }
  interface UpdateFullSubscriptionResponse {
      subscription?: Subscription;
  }
  interface UpdateSubscriptionInvoiceCycleRequest {
      subscriptionId?: string;
      tenantId?: string;
      invoiceId?: string;
      subscriptionCycle?: number;
  }
  interface UpdateSubscriptionInvoiceCycleResponse {
      subscriptionInvoice?: SubscriptionInvoice;
  }
  interface AddPausePeriodRequest {
      tenantId?: string;
      subscriptionId?: string;
      pauseStartDate?: Date | null;
      pauseEndDate?: Date | null;
  }
  interface AddPausePeriodResponse {
      subscription?: Subscription;
  }
  interface RunTimeCapsuleTaskNowRequest {
      tenantId: string;
      subscriptionId: string;
      taskType: string;
  }
  interface CreateRecurringInvoiceBORequest {
      subscriptionId?: string;
      tenantId?: string;
      cycleNumber?: number;
  }
  interface CreateRecurringInvoiceBOResponse {
      invoiceId?: string;
  }
  interface SetShiftingDataRequest {
      subscriptionId?: string;
      tenantId?: string;
      isBassManaged?: boolean;
      shiftManagementDate?: Date | null;
  }
  interface SetShiftingDataResponse {
      subscription?: Subscription;
  }
  interface FixSubscriptionInvoicesRequest extends FixSubscriptionInvoicesRequestModeOneOf {
      attachInvoice?: AttachInvoice;
      detachInvoice?: DetachInvoice;
      tenantId?: string;
      subscriptionId?: string;
  }
  /** @oneof */
  interface FixSubscriptionInvoicesRequestModeOneOf {
      attachInvoice?: AttachInvoice;
      detachInvoice?: DetachInvoice;
  }
  interface AttachInvoice {
      invoiceId?: string;
  }
  interface DetachInvoice {
      invoiceId?: string;
  }
  interface FixSubscriptionInvoicesResponse {
      invoices?: SubscriptionInvoice[];
  }
  interface RestoreDraftSubscriptionRequest {
      tenantId?: string;
      subscriptionId?: string;
  }
  interface RestoreDraftSubscriptionResponse {
      subscription?: Subscription;
  }
  interface DeleteDraftSubscriptionRequest {
      tenantId?: string;
      subscriptionId?: string;
  }
  interface DeleteDraftSubscriptionResponse {
      subscription?: Subscription;
  }
  interface DeleteSubscriptionBORequest {
      tenantId?: string;
      subscriptionId?: string;
  }
  interface DeleteSubscriptionBOResponse {
      subscription?: Subscription;
  }
  interface CancelSubscriptionBORequest {
      tenantId?: string;
      subscriptionId?: string;
      initiator?: ActionInitiator;
      reason?: string | null;
  }
  interface CancelSubscriptionBOResponse {
      subscription?: Subscription;
  }
  interface UpdatePaymentMethodBORequest {
      tenantId?: string;
      subscriptionId?: string;
      paymentMethodId?: string;
  }
  interface UpdatePaymentMethodBOResponse {
      subscription?: Subscription;
  }
  interface SendSubscriptionActionEventBORequest extends SendSubscriptionActionEventBORequestEventOneOf {
      billingCycleStarted?: SubscriptionBillingCycleStarted;
      tenantId?: string;
      subscriptionId?: string;
  }
  /** @oneof */
  interface SendSubscriptionActionEventBORequestEventOneOf {
      billingCycleStarted?: SubscriptionBillingCycleStarted;
  }
  interface SendSubscriptionActionEventResponse {
  }
  interface HandleSubscriptionAfterInvoiceMarkedAsPaidRequest {
      tenantId?: string;
      subscriptionId?: string;
      transactionId?: string;
  }
  /** @public
   * @documentationMaturity preview
   * @requiredField subscriptionId
   * @permissionId subscriptions.view
   * @adminMethod
   */
  function listSubscriptionHistory(subscriptionId: string, options?: ListSubscriptionHistoryOptions): Promise<ListSubscriptionHistoryResponse>;
  interface ListSubscriptionHistoryOptions {
      /** Determines the type of view for the history: either a comprehensive backoffice view or a user-centric view. */
      mode?: HistoryViewMode;
      /** Cursor for efficient paging. If paging through results, pass this field from the previous search response to continue to the next page. */
      cursor?: CursorPaging;
  }
  /**
   * Identity must be a site member and customer subscription belongs to
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @adminMethod
   */
  function customerGetSubscription(_id: string): Promise<GetSubscriptionResponse>;
  /**
   * Identity must be a site member and customer subscription belongs to
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @adminMethod
   */
  function customerCancelSubscription(_id: string, options?: CustomerCancelSubscriptionOptions): Promise<CustomerCancelSubscriptionResponse>;
  interface CustomerCancelSubscriptionOptions {
      /** Optional action reason message */
      reason?: string | null;
  }
  /**
   * Identity must be a site member and customer subscription belongs to
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @adminMethod
   */
  function customerTurnOnSubscriptionAutoRenewal(_id: string, options?: CustomerTurnOnSubscriptionAutoRenewalOptions): Promise<CustomerTurnOnAutoRenewalResponse>;
  interface CustomerTurnOnSubscriptionAutoRenewalOptions {
      /** Optional action reason message */
      reason?: string | null;
  }
  /**
   * Identity must be a site member and customer subscription belongs to
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @adminMethod
   */
  function customerTurnOffSubscriptionAutoRenewal(_id: string, options?: CustomerTurnOffSubscriptionAutoRenewalOptions): Promise<CustomerTurnOffAutoRenewalResponse>;
  interface CustomerTurnOffSubscriptionAutoRenewalOptions {
      /** Optional action reason message */
      reason?: string | null;
  }
  /** @param _id - The ID of the subscription to be extended
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField options.billingCyclesToAdd
   * @adminMethod
   */
  function customerExtendSubscription(_id: string, options?: CustomerExtendSubscriptionOptions): Promise<CustomerExtendSubscriptionResponse>;
  interface CustomerExtendSubscriptionOptions {
      /** Optional action reason message */
      reason?: string | null;
      /** For termed - Subscription end date will be updated with the extension period and number of cycles will be added */
      billingCyclesToAdd: number | null;
  }
  /**
   * identity must be a site member
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function customerQuerySubscriptions(options?: CustomerQuerySubscriptionsOptions): Promise<QuerySubscriptionsResponse>;
  interface CustomerQuerySubscriptionsOptions {
      query?: QueryV2;
  }
  /**
   * identity must be a site member
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function customerCountSubscriptions(options?: CustomerCountSubscriptionsOptions): Promise<CountSubscriptionsResponse>;
  interface CustomerCountSubscriptionsOptions {
      /** Filters to specify which subscriptions are counted. */
      filter?: CountSubscriptionFilter;
  }
  /**
   * Update subscription's payment method.
   * Supported only for recurring subscriptions or one time subscriptions during free trial.
   * @param _id - Subscription ID
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField paymentMethodId
   * @adminMethod
   */
  function customerUpdateSubscriptionPaymentMethod(_id: string, paymentMethodId: string): Promise<UpdateSubscriptionPaymentMethodResponse>;
  /** @public
   * @documentationMaturity preview
   * @requiredField _id
   * @adminMethod
   */
  function customerAllowedActions(_id: string): Promise<CustomerAllowedActionsResponse>;
  /**
   * List future subscriptions charges.
   * @param _id - Subscription id upcoming charge to be previewed for
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @adminMethod
   */
  function customerListUpcomingCharges(_id: string): Promise<CustomerListUpcomingChargesResponse>;
  /**
   * Creates auto-charge order that can be paid by customer
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @adminMethod
   */
  function customerInitiatePaymentMethodSetup(_id: string, options?: CustomerInitiatePaymentMethodSetupOptions): Promise<InitiatePaymentMethodSetupResponse>;
  interface CustomerInitiatePaymentMethodSetupOptions {
      paymentMode?: PaymentMode;
      paymentSettings?: PaymentSettings;
  }
  /**
   * Creates a subscription and returns payment order id to pay for non-free subscription.
   * Only Service identity is allowed in order to create subscription. Mandatory origin fields are filled based on it.
   * So the calls should be server-signed.
   * @internal
   * @documentationMaturity preview
   * @requiredField options.originOverride.appId
   * @requiredField options.originOverride.instanceId
   * @requiredField subscription
   * @requiredField subscription.customer
   * @requiredField subscription.items
   * @requiredField subscription.items.name
   * @requiredField subscription.items.pricingModel
   * @requiredField subscription.origin
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function createSubscription(subscription: Subscription, options?: CreateSubscriptionOptions): Promise<CreateSubscriptionResponse>;
  interface CreateSubscriptionOptions {
      /** Optional settings for the payments. Should be empty for free subscriptions. */
      paymentSettings?: PaymentSettings;
      /** Optional unique identifier for this request in order to prevent subscription duplications */
      idempotencyKey?: string | null;
      /** Optional origin override for setting identity of subscription creator instead of extracting from context */
      originOverride?: OriginOverride;
  }
  /**
   * Returns a single subscription by its id
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId subscriptions.view
   * @adminMethod
   */
  function getSubscription(_id: string): Promise<GetSubscriptionResponse>;
  /**
   * Updates subscription. Supported only for customer and billingSettings.paymentMethod fields
   * @param _id - Subscription's unique id. Automatically generated and read-only.
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function updateSubscription(_id: string | null, options?: UpdateSubscriptionOptions): Promise<UpdateSubscriptionResponse>;
  interface UpdateSubscriptionOptions {
      subscription: {
          /**
           * Subscription's unique id. Automatically generated and read-only.
           * @readonly
           */
          _id?: string | null;
          /**
           * Date when subscription was created
           * @readonly
           */
          _createdDate?: Date | null;
          /**
           * Date when subscription was updated
           * @readonly
           */
          _updatedDate?: Date | null;
          /**
           * Revision of subscription. Increments upon changes
           * @readonly
           */
          revision?: string | null;
          /** Subscription name: minLength is 1, maxLength is 150 */
          name?: string;
          /** Subscription description. Optional. */
          description?: string | null;
          /**
           * If start_date is set in the future: custom_billing_schedule.cycles_to_pay_on_creation should be set to 1
           * in order to pay on creation for first cycle, Subscription will be then activated in the future.
           * Future start_date is not supported for `SEND_INVOICE` CollectionMethod
           * If start_date is set in past, it means subscription was already started.
           */
          startDate?: Date | null;
          /**
           * Represents when the subscription will end, relevant for subscriptions with a termed period.
           * If not provided, will be calculated based on billing schedule. Should be empty for evergreen subscription.
           * Note: A 13-hour tolerance is applied when validating the end date to handle for time zone differences and minor discrepancies.
           */
          endDate?: Date | null;
          /** Business origin subscription is coming from. In site-level subscription it will be vertical app_id and entity_id */
          origin?: BusinessOrigin;
          /** Customer information like id and identity type (member or contact) */
          customer?: Customer;
          /**
           * Status of subscription
           * @readonly
           */
          status?: SubscriptionStatusEnumSubscriptionStatus;
          /** Billing details parameters including schedule, currency, etc. */
          billingSettings?: BillingSettings;
          /**
           * Includes many attributes about billing status of the subscription
           * @readonly
           */
          billingStatus?: BillingStatus;
          /** Shipping address associated with subscription. At the moment used only for payments. Optional. */
          shippingAddress?: FullAddressDetails;
          /** Restrictions on possible subscription actions. If not provided, default policies are all restrictions enabled. */
          policies?: SubscriptionPolicies;
          /**
           * Information related to either paused subscription or scheduled for future pause
           * @readonly
           */
          pauseInfo?: PauseInfo;
          /**
           * Information related to cancellation for already canceled subscription or scheduled for cancel
           * @readonly
           */
          cancellationInfo?: CancellationInfo;
          /**
           * Pending update for the next billing cycle
           * @readonly
           */
          pendingUpdateData?: SubscriptionUpdateData;
          /**
           * Indicator whether subscription is managed by BASS or external system, like SAPI, for example.
           * @internal
           * @readonly
           */
          bassManaged?: boolean;
          /**
           * Key / Value store to keep up to 10 additional values related to the subscription.
           * Key max length = 50, Value max length = 200. Value can not be empty.
           * Should not include any sensitive or PII information.
           */
          metadata?: Record<string, string>;
          /**
           * Pending update for a specific date
           * @readonly
           */
          specificDatePendingUpdateData?: SpecificDateSubscriptionUpdateData;
          /**
           * ChangesCounter of subscription. Increments upon every change to the domain
           * @readonly
           */
          changesCounter?: string | null;
          /** Billing order id. Optional. */
          orderId?: string | null;
          /** items, minSize is 1, maxSize is 100 */
          items?: Item[];
      };
      /**
       * Supported field: start_date
       * Can be updated only if Subscription is in Draft state
       * @internal
       */
      fieldMask: string[];
  }
  /** @param _id - Subscription ID
   * @param startDate - Can be updated only if Subscription is in Draft state
   * By setting start_date in the future, end_date will be recalculated for termed Subscriptions
   * cycles_to_pay_on_creation will be set to 1 if no free trial is set
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField startDate
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function updateSubscriptionStartDate(_id: string, startDate: Date | null): Promise<UpdateSubscriptionStartDateResponse>;
  /**
   * Update subscription's payment method.
   * Supported only for recurring subscriptions or one time subscriptions during free trial.
   * @param _id - Subscription ID
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField paymentMethodId
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function updateSubscriptionPaymentMethod(_id: string, paymentMethodId: string): Promise<UpdateSubscriptionPaymentMethodResponse>;
  /**
   * Updates subscription's policies
   * @param _id - Subscription ID
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function updateSubscriptionPolicies(_id: string, options?: UpdateSubscriptionPoliciesOptions): Promise<UpdateSubscriptionPoliciesResponse>;
  interface UpdateSubscriptionPoliciesOptions {
      cancellableByCustomer?: boolean | null;
  }
  /**
   * Updates the next billing date for a subscription.
   *
   *
   * Updating the billing date may add a proration charge or credit to the next
   * invoice. The customer must pay more in case you extend the current billing
   * cycle. They pay less in case you shorten the current billing cycle. You can
   * choose whether BASS automatically calculates the proration amount based on
   * the number of days added to or removed from the current billing cycle.
   * Alternatively, you can pass a proration amount based on your own custom
   * calculation. The custom proration amount can't exceed the total of the
   * current billing cycle.
   * @param _id - ID of the subscription to update the billing date for.
   * @param billingDate - New billing date in `YYYY-MM-DDThh:mm:ss:sssZ` format.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField billingDate
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function updateSubscriptionBillingDate(_id: string, billingDate: Date | null, options?: UpdateSubscriptionBillingDateOptions): Promise<UpdateSubscriptionBillingDateResponse>;
  interface UpdateSubscriptionBillingDateOptions {
      /**
       * Information about how BASS adjusts the total of the next invoice. Extending
       * the current billing cycle results in a higher payment, while shortening it
       * leads to a lower payment. BASS offers automatic calculation of the proration
       * amount based on the number of days added to or removed from the current billing
       * cycle. Alternatively, you can use your own custom method to calculate the
       * proration amount. The custom proration amount can't exceed the total of the
       * current billing cycle.
       */
      proration?: Proration;
  }
  /**
   * Update subscription's origin.
   * @param _id - ID of the subscription to update origin.
   * @param entityId - Origin entity ID of the subscription to update.
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField entityId
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function updateSubscriptionOrigin(_id: string, entityId: string): Promise<UpdateSubscriptionOriginResponse>;
  /**
   * Revises a draft subscription
   * @param _id - Subscription ID
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function reviseSubscription(_id: string, options?: ReviseSubscriptionOptions): Promise<ReviseSubscriptionResponse>;
  interface ReviseSubscriptionOptions {
      /** 0 for no revision, maxSize is 100 */
      items?: Item[];
  }
  /**
   * Updates subscription items
   * @param _id - Subscription ID
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function updateSubscriptionItems(_id: string, options?: UpdateSubscriptionItemsOptions): Promise<UpdateSubscriptionItemsResponse>;
  interface UpdateSubscriptionItemsOptions {
      /** Update action. For RESET_PENDING_UPDATES, nothing but the subscription ID should be defined in the request. */
      updateAction?: UpdateAction;
      /** Updates execution date. Relevant only for UpdateAction.SPECIFIC_DATE. Only specific date is supported. */
      scheduleAdditionalInfo?: ScheduleAdditionalInfo;
      /** Existing items to update */
      itemsToUpdate?: ItemChange[];
      /** Items to add */
      itemsToAdd?: Item[];
      /** Existing items to delete */
      itemsToDelete?: string[] | null;
  }
  /**
   * Bulk updates subscription items, given the provided filtering.
   *
   *
   * Use `subscriptionFilter` to select which subscriptions are updated and
   * `catalogReferenceIds` to specify which items from these subscriptions are
   * updated. Note that the `catalogReferenceIds` filter is based on the catalog
   * item ID and not each item's unique ID. The call fails in case you send an
   * empty `subscriptionFilter`.
   *
   * For field support in `subscriptionFilter` see
   * [Search and Query: Bulk Update Subscription Items By Filter](https://bo.wix.com/wix-docs/rest/drafts/subscriptions-by-billing-by-wix/search-and-query#drafts_subscriptions-by-billing-by-wix_search-and-query_bulk-update-subscription-items-by-filter).
   * To learn about working with filters in general, see
   * [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language).
   *
   * The `updateAction` field let's you update subscription items immediately,
   * at the beginning of the next billing cycle, or on a future date of your
   * choice. Alternatively, you can cancel all currently scheduled updates for the
   * specified subscriptions by passing `{"updateAction": "RESET_PENDING_UPDATES"}`.
   * Then, use only the `subscriptionId` field inside `subscriptionFilter` since
   * passing any other subscription filter results in a failed validation error.
   *
   * You can update the item price, quantity, and tax. To do so, pass the
   * relevant data inside the `bulkItemUpdateData` object. All item fields are
   * updated to the same values. In case you want to set different values for
   * individual items, you must call _Bulk Update Subscription Items By Filter_
   * multiple times, once per unique update.
   *
   * Note that you can't use the `itemsToAdd` object yet, since it results
   * in a validation failure at the moment.
   *
   * In case you schedule updates for a future point in time, the changes are
   * reflected in the subscription's `pendingUpdateData.itemsToUpdate` array.
   * They will be reflected in the subscription's relevant item once they become
   * effective. At the same time, they will also be removed from
   * `pendingUpdateData.itemsToUpdate`.
   *
   * You can retrieve information about the status of the bulk job from
   * [Async Infra](https://pbo.wix.com/fire-console/?artifact=com.wixpress.asyncinfra.async-job-service&service=wix.infra.asyncjobs.v1.AsyncJobService&method=ListAsyncJobItems&body=eyJqb2JfaWQiOiIifQ%3D%3D).
   * @param subscriptionFilter - Filter to identify the subscriptions for which items are updated. For
   * supported fields see
   * [Search and Query: Bulk Update Subscription Items By Filter](https://bo.wix.com/wix-docs/rest/drafts/subscriptions-by-billing-by-wix/search-and-query#drafts_subscriptions-by-billing-by-wix_search-and-query_bulk-update-subscription-items-by-filter).
   * Sending an empty subscription filter results in a validation error.
   * In case you pass `{"updateAction": "RESET_PENDING_UPDATES"}`, use only the
   * `subscriptionId` field inside this filter. Passing any other filter results
   * in a failed validation error.
   * @internal
   * @documentationMaturity preview
   * @requiredField options.catalogReferenceIds
   * @requiredField subscriptionFilter
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function bulkUpdateSubscriptionItemsByFilter(subscriptionFilter: Record<string, any> | null, options?: BulkUpdateSubscriptionItemsByFilterOptions): Promise<BulkUpdateSubscriptionItemsByFilterResponse>;
  interface BulkUpdateSubscriptionItemsByFilterOptions {
      /**
       * Filter to specify which subscription items are updated. Make sure to use
       * the catalog item ID and not the item's unique ID. All subscription items
       * with matching `items.catalogReference.catalogItemId` are updated.
       *
       * Max: `100` reference catalog item IDs
       */
      catalogReferenceIds: string[] | null;
      /**
       * Information about the update timing and update type.
       *
       * + `"IMMEDIATELY"`: The updates become effective immediately.
       * + `"NEXT_BILLING_CYCLE"`: The updates are scheduled for the beginning of the next billing cycle.
       * + `"SPECIFIC_DATE"`: The updates are scheduled for the date specified in `scheduleAdditionalInfo.specificDate`.
       * + `"RESET_PENDING_UPDATES"`: All currently scheduled updates for the specified supcriptions are canceled. Use only the `subscriptionId` field inside `subscriptionFilter`, all other filters result in failed validation errors.
       */
      updateAction?: UpdateAction;
      /**
       * Additional information for updates. Currently, only supported for
       * `{"updateAction": "SPECIFIC_DATE"}`.
       */
      scheduleAdditionalInfo?: ScheduleAdditionalInfo;
      /**
       * Update details for the susbcription items that match the filtering.
       * Currently, you can update only the item price, quantity, and tax. Note
       * that all item properties are updated to the same values. In case you want set
       * different values for individual items, you must call
       * _Bulk Update Subscription Items By Filter_ multiple times, once per unique update.
       */
      bulkItemUpdateData?: BulkItemChange;
      /** __Not implemented yet__. Items to add to the subscriptions matching the filtering. */
      itemsToAdd?: Item[];
  }
  /**
   * Deletes subscription
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function deleteSubscription(_id: string, options?: DeleteSubscriptionOptions): Promise<void>;
  interface DeleteSubscriptionOptions {
      revision?: string;
  }
  /**
   * Cancels subscription immediately. Can be canceled by member if subscription policy allows it
   * Only PENDING, ACTIVE or PAUSED subscriptions can be canceled
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField actionContext
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function cancelSubscription(_id: string, actionContext: ActionContext): Promise<CancelSubscriptionResponse>;
  /**
   * Pauses subscription now or in future. Possible to pause also payments schedule.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField options.actionContext
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function pauseSubscription(_id: string, options?: PauseSubscriptionOptions): Promise<PauseSubscriptionResponse>;
  interface PauseSubscriptionOptions {
      pausePolicy?: PausePolicy;
      pauseAt?: PauseAt;
      /** contains additional scheduling information for certain pause_at options (for example: SPECIFIC_DATE & NUMBER_OF_CYCLES_FROM_TODAY) */
      pauseAtSchedule?: ScheduleAdditionalInfo;
      /** contains additional scheduling information for certain auto_resume_at either specific date */
      autoResumeAtSchedule?: ScheduleAdditionalInfo;
      actionContext: ActionContext;
  }
  /**
   * Resumes paused subscription now or in future.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField options.actionContext
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function resumeSubscription(_id: string, options?: ResumeSubscriptionOptions): Promise<ResumeSubscriptionResponse>;
  interface ResumeSubscriptionOptions {
      resumeAt?: ResumeAt;
      /** contains additional scheduling information for certain resume_at options (for example: SPECIFIC_DATE) */
      resumeAtSchedule?: ScheduleAdditionalInfo;
      actionContext: ActionContext;
  }
  /**
   * Lists subscriptions based on specified filters.
   * By default non-draft subscriptions returned.
   * @public
   * @documentationMaturity preview
   * @requiredField query
   * @permissionId subscriptions.view
   * @adminMethod
   */
  function querySubscriptions(query: QueryV2): Promise<QuerySubscriptionsResponse>;
  /** @public
   * @documentationMaturity preview
   * @permissionId subscriptions.view
   * @adminMethod
   */
  function searchSubscriptions(options?: SearchSubscriptionsOptions): Promise<SearchSubscriptionsResponse>;
  interface SearchSubscriptionsOptions extends SearchSubscriptionsRequestPagingMethodOneOf {
      /** A filter object */
      filter?: any;
      /** Limit number of results and enable to skip rows. The default limit is 25. */
      paging?: Paging;
      /** A Cursor option for efficient paging. Pass this field from the previous search response to continue to the next page. */
      cursor?: CursorPaging;
      /** A Sorting option by field name and order. */
      sorting?: SortingClauses;
  }
  /**
   * Counts subscriptions given the provided filters. Returns the total number
   * of subscriptions matching the filters and a count per status.
   *
   *
   * You can either pass a list of statuses or a `statusGroup`, which is a
   * pre-defined combination of statuses.
   *
   * If you don't provide any filters, all subscription statuses with the
   * exception of `"DRAFT"` are counted.
   *
   * You may also specify a `customerId` as filter. Then, only subscriptions for
   * this customer are counted. When providing a `customerId`, you must also
   * specify a `paymentMethodId`.
   * @public
   * @documentationMaturity preview
   * @permissionId subscriptions.view
   * @adminMethod
   */
  function countSubscriptions(options?: CountSubscriptionsOptions): Promise<CountSubscriptionsResponse>;
  interface CountSubscriptionsOptions {
      /** Filters to specify which subscriptions are counted. */
      filter?: CountSubscriptionFilter;
  }
  /**
   * Turn on auto-renew subscription in case auto-renew was turned off. The operation changes back cycle_auto_renew
   * to true, which will ensure subscription billing will continue. Also cancellation info holding information about
   * auto renew off will be cleared.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField actionContext
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function turnOnSubscriptionAutoRenewal(_id: string, actionContext: ActionContext): Promise<TurnOnSubscriptionAutoRenewalResponse>;
  /**
   * Turn off auto-renew of subscription. At next billing date subscription will be canceled.
   * Billing settings flag cycle_auto_renew is set to false and information about this operation stored
   * in cancellation info for future usage in cancellation.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField actionContext
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function turnOffSubscriptionAutoRenewal(_id: string, actionContext: ActionContext): Promise<TurnOffSubscriptionAutoRenewalResponse>;
  /**
   * Marks the last invoice as paid used for the following scenarios:
   * * Offline subscriptions.
   * * Online subscriptions during grace period. The operation will convert invoice to offline, remove grace period
   * and will send BillingCycleStarted event after invoice closing.
   * * Online one time payment subscription with total price of zero during purchase flow.
   * Activated event will be sent after invoice closing and subscription will be activated.
   * @param subscriptionId - The ID of the offline subscription to mark as paid its latest invoice
   * @public
   * @documentationMaturity preview
   * @requiredField subscriptionId
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function markLatestInvoiceAsPaid(subscriptionId: string): Promise<MarkLatestInvoiceAsPaidResponse>;
  /**
   * Returns number of subscriptions in each state.
   * @public
   * @documentationMaturity preview
   * @permissionId subscriptions.view
   * @adminMethod
   */
  function getSubscriptionsStats(): Promise<GetSubscriptionsStatsResponse>;
  /**
   * Extends subscription by moving end date with or without billing cycles addition.
   * @param _id - The ID of the subscription to be extended
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField actionContext
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function extendSubscription(_id: string, actionContext: ActionContext, options?: ExtendSubscriptionOptions): Promise<ExtendSubscriptionResponse>;
  interface ExtendSubscriptionOptions extends ExtendSubscriptionRequestExtendPolicyOneOf {
      /** User won't be charged for additional period added on top of subscription end date. */
      extensionPeriod?: Duration;
      /** user will be charged for billing cycles added */
      extensionBillingCycles?: number;
  }
  /** @public
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function allowedActions(_id: string, options?: AllowedActionsOptions): Promise<AllowedActionsResponse>;
  interface AllowedActionsOptions {
      /** List of additional fields to be included in the response. */
      fields?: RequestedFields[];
  }
  /**
   * List future subscriptions charges
   * @param subscriptionId - Subscription id charges to be previewed for
   * @public
   * @documentationMaturity preview
   * @requiredField subscriptionId
   * @permissionId subscriptions.view
   * @adminMethod
   */
  function listUpcomingCharges(subscriptionId: string, options?: ListUpcomingChargesOptions): Promise<ListUpcomingChargesResponse>;
  interface ListUpcomingChargesOptions {
      /** Period of time to provide charged for. If not provided,then only next charge will be returned. */
      customDuration?: Duration;
      /**
       * Date of the next billing cycle so that the upcoming charges will be calculated accordingly.
       * If not provided, the upcoming charges will be calculated according to the existing next billing date.
       */
      nextBillingDate?: Date | null;
  }
  /**
   * Retrieves the preview of subscription charges.
   * Returns all the charges applicable to a subscription based on the provided subscription information.
   * @public
   * @documentationMaturity preview
   * @requiredField options
   * @requiredField options.subscriptionInfo
   * @requiredField options.subscriptionInfo.billingSettings
   * @requiredField options.subscriptionInfo.items
   * @requiredField options.subscriptionInfo.items.pricingModel
   * @permissionId subscriptions.view
   * @adminMethod
   * @deprecated
   * @replacedBy com.wixpress.billing.subscriptions.api.v1.SubscriptionsService.PreviewSubscriptionsCharges
   * @targetRemovalDate 2025-06-30
   */
  function previewSubscriptionCharges(options: PreviewSubscriptionChargesOptions): Promise<PreviewSubscriptionChargesResponse>;
  interface PreviewSubscriptionChargesOptions extends PreviewSubscriptionChargesRequestSubscriptionOneOf {
      /** Information about a non-existing subscription. */
      subscriptionInfo?: SubscriptionInfo;
  }
  /**
   * Retrieves the preview of subscription charges for a bulk of subscriptions.
   * Returns all the charges applicable to all subscriptions, based on the provided subscriptions information.
   * @public
   * @documentationMaturity preview
   * @requiredField options.subscriptionsBillingDetails.billingSettings
   * @requiredField options.subscriptionsBillingDetails.externalId
   * @requiredField options.subscriptionsBillingDetails.items
   * @requiredField options.subscriptionsBillingDetails.items.pricingModel
   * @permissionId subscriptions.view
   * @adminMethod
   */
  function previewSubscriptionsCharges(options?: PreviewSubscriptionsChargesOptions): Promise<PreviewSubscriptionsChargesResponse>;
  interface PreviewSubscriptionsChargesOptions {
      /** Information required to calculate the preview charges for the subscriptions, including an identifier. */
      subscriptionsBillingDetails?: SubscriptionBillingDetails[];
      /**
       * Specifies the number of upcoming billing charges to preview for all subscriptions in the order.
       * For instance, if a subscription costs $10 for the first 3 cycles, $12 for cycles 4 through 7,
       * $15 for cycles 8 through 10, and $20 for cycle 11 onwards:
       * - Sending "1" will calculate and return charges for cycles 4 through 7 since it's the first charge in the future.
       * - Sending "2" will provide a response with charges for cycles 4 through 7 and cycles 8 through 10.
       * - Sending "3" or more will include totals for cycles 4 through 7, cycles 8 through 10, and from cycle 11 onwards.
       * If no value is provided, the response will include charges for all upcoming cycles, including the existing one,
       * in this case, charges for cycle 1 through 3.
       * If there is a single charge for a subscription, meaning that subscription price remains consistent across all cycles,
       * then even if future_charges_count is set, it will be ignored and the only charge this subscription has will be returned.
       */
      numberOfNextRecurringCharges?: number | null;
  }
  /**
   * Creates authorization invoice with Moto settings in order to create
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId subscriptions.manage
   * @adminMethod
   */
  function initiatePaymentMethodSetup(_id: string, options?: InitiatePaymentMethodSetupOptions): Promise<InitiatePaymentMethodSetupResponse>;
  interface InitiatePaymentMethodSetupOptions {
      paymentMode?: PaymentMode;
      paymentSettings?: PaymentSettings;
  }
  /**
   * This used only for automation and permitted tenants (QA & testing)
   * @public
   * @documentationMaturity preview
   * @requiredField options.tenantId
   * @requiredField subscriptionId
   * @adminMethod
   */
  function payCycle(subscriptionId: string, options?: PayCycleOptions): Promise<PayCycleResponse>;
  interface PayCycleOptions {
      paymentTestMode?: PaymentTestMode;
      tenantId: string;
  }
  /**
   * This used only for automation and TestApp subscriptions only
   * @internal
   * @documentationMaturity preview
   * @requiredField options
   * @requiredField options.taskType
   * @requiredField subscriptionId
   * @requiredField tenantId
   * @permissionId BILLING.SUBSCRIPTION_BACK_OFFICE_UPDATE
   * @adminMethod
   */
  function runTimeCapsuleTaskNow(subscriptionId: string, tenantId: string, options: RunTimeCapsuleTaskNowOptions): Promise<void>;
  interface RunTimeCapsuleTaskNowOptions {
      taskType: string;
  }
  
  type billingV1Subscription_universal_d_Subscription = Subscription;
  type billingV1Subscription_universal_d_BusinessOrigin = BusinessOrigin;
  type billingV1Subscription_universal_d_Customer = Customer;
  type billingV1Subscription_universal_d_CustomerIdOneOf = CustomerIdOneOf;
  type billingV1Subscription_universal_d_SubscriptionStatusEnumSubscriptionStatus = SubscriptionStatusEnumSubscriptionStatus;
  const billingV1Subscription_universal_d_SubscriptionStatusEnumSubscriptionStatus: typeof SubscriptionStatusEnumSubscriptionStatus;
  type billingV1Subscription_universal_d_BillingSettings = BillingSettings;
  type billingV1Subscription_universal_d_PaymentMethod = PaymentMethod;
  type billingV1Subscription_universal_d_CollectionMethod = CollectionMethod;
  const billingV1Subscription_universal_d_CollectionMethod: typeof CollectionMethod;
  type billingV1Subscription_universal_d_Duration = Duration;
  type billingV1Subscription_universal_d_DurationUnit = DurationUnit;
  const billingV1Subscription_universal_d_DurationUnit: typeof DurationUnit;
  type billingV1Subscription_universal_d_CustomBillingSchedule = CustomBillingSchedule;
  type billingV1Subscription_universal_d_FullAddressDetails = FullAddressDetails;
  type billingV1Subscription_universal_d_FullAddressContactDetails = FullAddressContactDetails;
  type billingV1Subscription_universal_d_Address = Address;
  type billingV1Subscription_universal_d_AddressStreetOneOf = AddressStreetOneOf;
  type billingV1Subscription_universal_d_StreetAddress = StreetAddress;
  type billingV1Subscription_universal_d_TaxSettings = TaxSettings;
  type billingV1Subscription_universal_d_AdditionalFee = AdditionalFee;
  type billingV1Subscription_universal_d_AdditionalFeeTrigger = AdditionalFeeTrigger;
  const billingV1Subscription_universal_d_AdditionalFeeTrigger: typeof AdditionalFeeTrigger;
  type billingV1Subscription_universal_d_Tax = Tax;
  type billingV1Subscription_universal_d_TaxValueOneOf = TaxValueOneOf;
  type billingV1Subscription_universal_d_DynamicTax = DynamicTax;
  type billingV1Subscription_universal_d_TaxableAddressType = TaxableAddressType;
  const billingV1Subscription_universal_d_TaxableAddressType: typeof TaxableAddressType;
  type billingV1Subscription_universal_d_ShippingCharges = ShippingCharges;
  type billingV1Subscription_universal_d_Discount = Discount;
  type billingV1Subscription_universal_d_DiscountValueOneOf = DiscountValueOneOf;
  type billingV1Subscription_universal_d_DiscountCycles = DiscountCycles;
  type billingV1Subscription_universal_d_DiscountOrigin = DiscountOrigin;
  type billingV1Subscription_universal_d_ExternalCollectionDetails = ExternalCollectionDetails;
  type billingV1Subscription_universal_d_BillingStatus = BillingStatus;
  type billingV1Subscription_universal_d_PaymentData = PaymentData;
  type billingV1Subscription_universal_d_PaymentStatus = PaymentStatus;
  const billingV1Subscription_universal_d_PaymentStatus: typeof PaymentStatus;
  type billingV1Subscription_universal_d_Totals = Totals;
  type billingV1Subscription_universal_d_FreeTrialData = FreeTrialData;
  type billingV1Subscription_universal_d_UpdateBillingDateData = UpdateBillingDateData;
  type billingV1Subscription_universal_d_Proration = Proration;
  type billingV1Subscription_universal_d_ProrationTypeOneOf = ProrationTypeOneOf;
  type billingV1Subscription_universal_d_TimeBasedProration = TimeBasedProration;
  type billingV1Subscription_universal_d_CustomProration = CustomProration;
  type billingV1Subscription_universal_d_CustomProrationAmountOneOf = CustomProrationAmountOneOf;
  type billingV1Subscription_universal_d_GracePeriodData = GracePeriodData;
  type billingV1Subscription_universal_d_AutomaticRetryData = AutomaticRetryData;
  type billingV1Subscription_universal_d_SubscriptionPolicies = SubscriptionPolicies;
  type billingV1Subscription_universal_d_PauseInfo = PauseInfo;
  type billingV1Subscription_universal_d_PausePolicy = PausePolicy;
  const billingV1Subscription_universal_d_PausePolicy: typeof PausePolicy;
  type billingV1Subscription_universal_d_PauseAt = PauseAt;
  const billingV1Subscription_universal_d_PauseAt: typeof PauseAt;
  type billingV1Subscription_universal_d_ResumeAt = ResumeAt;
  const billingV1Subscription_universal_d_ResumeAt: typeof ResumeAt;
  type billingV1Subscription_universal_d_CancellationInfo = CancellationInfo;
  type billingV1Subscription_universal_d_HistoryActionInitiator = HistoryActionInitiator;
  const billingV1Subscription_universal_d_HistoryActionInitiator: typeof HistoryActionInitiator;
  type billingV1Subscription_universal_d_SubscriptionUpdateData = SubscriptionUpdateData;
  type billingV1Subscription_universal_d_ItemChange = ItemChange;
  type billingV1Subscription_universal_d_PricingModel = PricingModel;
  type billingV1Subscription_universal_d_PricingModelModelOneOf = PricingModelModelOneOf;
  type billingV1Subscription_universal_d_FixedPrice = FixedPrice;
  type billingV1Subscription_universal_d_Item = Item;
  type billingV1Subscription_universal_d_CatalogReference = CatalogReference;
  type billingV1Subscription_universal_d_ItemCategory = ItemCategory;
  const billingV1Subscription_universal_d_ItemCategory: typeof ItemCategory;
  type billingV1Subscription_universal_d_ApplicationFee = ApplicationFee;
  type billingV1Subscription_universal_d_ApplicationFeeValueOneOf = ApplicationFeeValueOneOf;
  type billingV1Subscription_universal_d_SpecificDateSubscriptionUpdateData = SpecificDateSubscriptionUpdateData;
  type billingV1Subscription_universal_d_ListSubscriptionHistoryRequest = ListSubscriptionHistoryRequest;
  type billingV1Subscription_universal_d_HistoryViewMode = HistoryViewMode;
  const billingV1Subscription_universal_d_HistoryViewMode: typeof HistoryViewMode;
  type billingV1Subscription_universal_d_CursorPaging = CursorPaging;
  type billingV1Subscription_universal_d_ListSubscriptionHistoryResponse = ListSubscriptionHistoryResponse;
  type billingV1Subscription_universal_d_SubscriptionHistoryEntry = SubscriptionHistoryEntry;
  type billingV1Subscription_universal_d_SubscriptionEvent = SubscriptionEvent;
  type billingV1Subscription_universal_d_SubscriptionEventPayloadOneOf = SubscriptionEventPayloadOneOf;
  type billingV1Subscription_universal_d_SubscriptionCreated = SubscriptionCreated;
  type billingV1Subscription_universal_d_SubscriptionUpdated = SubscriptionUpdated;
  type billingV1Subscription_universal_d_SubscriptionDiff = SubscriptionDiff;
  type billingV1Subscription_universal_d_SubscriptionDeleted = SubscriptionDeleted;
  type billingV1Subscription_universal_d_SubscriptionActivated = SubscriptionActivated;
  type billingV1Subscription_universal_d_SubscriptionEnded = SubscriptionEnded;
  type billingV1Subscription_universal_d_SubscriptionCanceled = SubscriptionCanceled;
  type billingV1Subscription_universal_d_ActionDetails = ActionDetails;
  type billingV1Subscription_universal_d_SubscriptionPaused = SubscriptionPaused;
  type billingV1Subscription_universal_d_SubscriptionResumed = SubscriptionResumed;
  type billingV1Subscription_universal_d_PauseSubscriptionRequested = PauseSubscriptionRequested;
  type billingV1Subscription_universal_d_ResumeSubscriptionRequested = ResumeSubscriptionRequested;
  type billingV1Subscription_universal_d_ScheduledPauseCanceled = ScheduledPauseCanceled;
  type billingV1Subscription_universal_d_ScheduledResumeCanceled = ScheduledResumeCanceled;
  type billingV1Subscription_universal_d_SubscriptionBillingCycleStarted = SubscriptionBillingCycleStarted;
  type billingV1Subscription_universal_d_SubscriptionAutoRenewalTurnedOn = SubscriptionAutoRenewalTurnedOn;
  type billingV1Subscription_universal_d_SubscriptionAutoRenewalTurnedOff = SubscriptionAutoRenewalTurnedOff;
  type billingV1Subscription_universal_d_SubscriptionCycleReadyToPay = SubscriptionCycleReadyToPay;
  type billingV1Subscription_universal_d_SubscriptionExtended = SubscriptionExtended;
  type billingV1Subscription_universal_d_SubscriptionExtendedExtendPolicyOneOf = SubscriptionExtendedExtendPolicyOneOf;
  type billingV1Subscription_universal_d_SubscriptionInitialPurchaseCompleted = SubscriptionInitialPurchaseCompleted;
  type billingV1Subscription_universal_d_LatestInvoiceMarkedAsPaid = LatestInvoiceMarkedAsPaid;
  type billingV1Subscription_universal_d_SubscriptionRevived = SubscriptionRevived;
  type billingV1Subscription_universal_d_SubscriptionBillingDateUpdated = SubscriptionBillingDateUpdated;
  type billingV1Subscription_universal_d_FutureUpdatesRequested = FutureUpdatesRequested;
  type billingV1Subscription_universal_d_UpdatesApplied = UpdatesApplied;
  type billingV1Subscription_universal_d_UpdateAction = UpdateAction;
  const billingV1Subscription_universal_d_UpdateAction: typeof UpdateAction;
  type billingV1Subscription_universal_d_ResetPendingUpdates = ResetPendingUpdates;
  type billingV1Subscription_universal_d_GracePeriodStarted = GracePeriodStarted;
  type billingV1Subscription_universal_d_GracePeriodEnded = GracePeriodEnded;
  type billingV1Subscription_universal_d_PaymentSettlementMethod = PaymentSettlementMethod;
  const billingV1Subscription_universal_d_PaymentSettlementMethod: typeof PaymentSettlementMethod;
  type billingV1Subscription_universal_d_PaymentMethodUpdated = PaymentMethodUpdated;
  type billingV1Subscription_universal_d_PaymentMode = PaymentMode;
  const billingV1Subscription_universal_d_PaymentMode: typeof PaymentMode;
  type billingV1Subscription_universal_d_SubscriptionCollectionMethodUpdated = SubscriptionCollectionMethodUpdated;
  type billingV1Subscription_universal_d_FreeTrailStarted = FreeTrailStarted;
  type billingV1Subscription_universal_d_FreeTrailEnded = FreeTrailEnded;
  type billingV1Subscription_universal_d_SubscriptionBackOfficeAction = SubscriptionBackOfficeAction;
  type billingV1Subscription_universal_d_UnknownSubscriptionEvent = UnknownSubscriptionEvent;
  type billingV1Subscription_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type billingV1Subscription_universal_d_Cursors = Cursors;
  type billingV1Subscription_universal_d_GetSubscriptionRequest = GetSubscriptionRequest;
  type billingV1Subscription_universal_d_GetSubscriptionResponse = GetSubscriptionResponse;
  type billingV1Subscription_universal_d_CustomerCancelSubscriptionRequest = CustomerCancelSubscriptionRequest;
  type billingV1Subscription_universal_d_CustomerCancelSubscriptionResponse = CustomerCancelSubscriptionResponse;
  type billingV1Subscription_universal_d_CustomerTurnOnAutoRenewalRequest = CustomerTurnOnAutoRenewalRequest;
  type billingV1Subscription_universal_d_CustomerTurnOnAutoRenewalResponse = CustomerTurnOnAutoRenewalResponse;
  type billingV1Subscription_universal_d_CustomerTurnOffAutoRenewalRequest = CustomerTurnOffAutoRenewalRequest;
  type billingV1Subscription_universal_d_CustomerTurnOffAutoRenewalResponse = CustomerTurnOffAutoRenewalResponse;
  type billingV1Subscription_universal_d_CustomerExtendSubscriptionRequest = CustomerExtendSubscriptionRequest;
  type billingV1Subscription_universal_d_CustomerExtendSubscriptionResponse = CustomerExtendSubscriptionResponse;
  type billingV1Subscription_universal_d_QuerySubscriptionsRequest = QuerySubscriptionsRequest;
  type billingV1Subscription_universal_d_QueryV2 = QueryV2;
  type billingV1Subscription_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
  type billingV1Subscription_universal_d_Sorting = Sorting;
  type billingV1Subscription_universal_d_SortOrder = SortOrder;
  const billingV1Subscription_universal_d_SortOrder: typeof SortOrder;
  type billingV1Subscription_universal_d_Paging = Paging;
  type billingV1Subscription_universal_d_QuerySubscriptionsResponse = QuerySubscriptionsResponse;
  type billingV1Subscription_universal_d_CountSubscriptionsRequest = CountSubscriptionsRequest;
  type billingV1Subscription_universal_d_CountSubscriptionFilter = CountSubscriptionFilter;
  type billingV1Subscription_universal_d_CountSubscriptionFilterStatusOneOf = CountSubscriptionFilterStatusOneOf;
  type billingV1Subscription_universal_d_SubscriptionStatus = SubscriptionStatus;
  type billingV1Subscription_universal_d_SubscriptionStatusGroup = SubscriptionStatusGroup;
  const billingV1Subscription_universal_d_SubscriptionStatusGroup: typeof SubscriptionStatusGroup;
  type billingV1Subscription_universal_d_CountSubscriptionsResponse = CountSubscriptionsResponse;
  type billingV1Subscription_universal_d_CountByStatus = CountByStatus;
  type billingV1Subscription_universal_d_UpdateSubscriptionPaymentMethodRequest = UpdateSubscriptionPaymentMethodRequest;
  type billingV1Subscription_universal_d_UpdateSubscriptionPaymentMethodResponse = UpdateSubscriptionPaymentMethodResponse;
  type billingV1Subscription_universal_d_CustomerAllowedActionsRequest = CustomerAllowedActionsRequest;
  type billingV1Subscription_universal_d_CustomerAllowedActionsResponse = CustomerAllowedActionsResponse;
  type billingV1Subscription_universal_d_Action = Action;
  type billingV1Subscription_universal_d_ActionType = ActionType;
  const billingV1Subscription_universal_d_ActionType: typeof ActionType;
  type billingV1Subscription_universal_d_ExtendPolicyType = ExtendPolicyType;
  const billingV1Subscription_universal_d_ExtendPolicyType: typeof ExtendPolicyType;
  type billingV1Subscription_universal_d_CustomerListUpcomingChargesRequest = CustomerListUpcomingChargesRequest;
  type billingV1Subscription_universal_d_CustomerListUpcomingChargesResponse = CustomerListUpcomingChargesResponse;
  type billingV1Subscription_universal_d_SubscriptionCharge = SubscriptionCharge;
  type billingV1Subscription_universal_d_InvoiceItem = InvoiceItem;
  type billingV1Subscription_universal_d_InvoiceItemPaymentTypeOneOf = InvoiceItemPaymentTypeOneOf;
  type billingV1Subscription_universal_d_Recurring = Recurring;
  type billingV1Subscription_universal_d_OneTime = OneTime;
  type billingV1Subscription_universal_d_PriceDetails = PriceDetails;
  type billingV1Subscription_universal_d_InvoiceDiscount = InvoiceDiscount;
  type billingV1Subscription_universal_d_InvoiceDiscountValueOneOf = InvoiceDiscountValueOneOf;
  type billingV1Subscription_universal_d_InvoiceApplicationFee = InvoiceApplicationFee;
  type billingV1Subscription_universal_d_InvoiceApplicationFeeValueOneOf = InvoiceApplicationFeeValueOneOf;
  type billingV1Subscription_universal_d_ItemTaxData = ItemTaxData;
  type billingV1Subscription_universal_d_LineItemTaxSummary = LineItemTaxSummary;
  type billingV1Subscription_universal_d_TaxBreakdown = TaxBreakdown;
  type billingV1Subscription_universal_d_InitiatePaymentMethodSetupRequest = InitiatePaymentMethodSetupRequest;
  type billingV1Subscription_universal_d_PaymentSettings = PaymentSettings;
  type billingV1Subscription_universal_d_OrderMethod = OrderMethod;
  const billingV1Subscription_universal_d_OrderMethod: typeof OrderMethod;
  type billingV1Subscription_universal_d_RedirectUrls = RedirectUrls;
  type billingV1Subscription_universal_d_PaymentOrigin = PaymentOrigin;
  type billingV1Subscription_universal_d_InitiatePaymentMethodSetupResponse = InitiatePaymentMethodSetupResponse;
  type billingV1Subscription_universal_d_DomainEvent = DomainEvent;
  type billingV1Subscription_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type billingV1Subscription_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type billingV1Subscription_universal_d_RestoreInfo = RestoreInfo;
  type billingV1Subscription_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type billingV1Subscription_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type billingV1Subscription_universal_d_ActionEvent = ActionEvent;
  type billingV1Subscription_universal_d_MessageEnvelope = MessageEnvelope;
  type billingV1Subscription_universal_d_IdentificationData = IdentificationData;
  type billingV1Subscription_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type billingV1Subscription_universal_d_WebhookIdentityType = WebhookIdentityType;
  const billingV1Subscription_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  type billingV1Subscription_universal_d_SetIsMigratedEvent = SetIsMigratedEvent;
  type billingV1Subscription_universal_d_SubscriptionDelayedSyncEvent = SubscriptionDelayedSyncEvent;
  type billingV1Subscription_universal_d_InvoiceAction = InvoiceAction;
  type billingV1Subscription_universal_d_InvoiceActionActionTypeOneOf = InvoiceActionActionTypeOneOf;
  type billingV1Subscription_universal_d_PayRecurringInvoice = PayRecurringInvoice;
  type billingV1Subscription_universal_d_CreateSubscriptionRequest = CreateSubscriptionRequest;
  type billingV1Subscription_universal_d_OriginOverride = OriginOverride;
  type billingV1Subscription_universal_d_CreateSubscriptionResponse = CreateSubscriptionResponse;
  type billingV1Subscription_universal_d_UpdateSubscriptionRequest = UpdateSubscriptionRequest;
  type billingV1Subscription_universal_d_UpdateSubscriptionResponse = UpdateSubscriptionResponse;
  type billingV1Subscription_universal_d_UpdateSubscriptionStartDateRequest = UpdateSubscriptionStartDateRequest;
  type billingV1Subscription_universal_d_UpdateSubscriptionStartDateResponse = UpdateSubscriptionStartDateResponse;
  type billingV1Subscription_universal_d_UpdateSubscriptionPoliciesRequest = UpdateSubscriptionPoliciesRequest;
  type billingV1Subscription_universal_d_UpdateSubscriptionPoliciesResponse = UpdateSubscriptionPoliciesResponse;
  type billingV1Subscription_universal_d_UpdateSubscriptionBillingDateRequest = UpdateSubscriptionBillingDateRequest;
  type billingV1Subscription_universal_d_UpdateSubscriptionBillingDateResponse = UpdateSubscriptionBillingDateResponse;
  type billingV1Subscription_universal_d_UpdateSubscriptionOriginRequest = UpdateSubscriptionOriginRequest;
  type billingV1Subscription_universal_d_UpdateSubscriptionOriginResponse = UpdateSubscriptionOriginResponse;
  type billingV1Subscription_universal_d_ReviseSubscriptionRequest = ReviseSubscriptionRequest;
  type billingV1Subscription_universal_d_ReviseSubscriptionResponse = ReviseSubscriptionResponse;
  type billingV1Subscription_universal_d_UpdateSubscriptionItemsRequest = UpdateSubscriptionItemsRequest;
  type billingV1Subscription_universal_d_ScheduleAdditionalInfo = ScheduleAdditionalInfo;
  type billingV1Subscription_universal_d_ScheduleAdditionalInfoParamOneOf = ScheduleAdditionalInfoParamOneOf;
  type billingV1Subscription_universal_d_UpdateSubscriptionItemsResponse = UpdateSubscriptionItemsResponse;
  type billingV1Subscription_universal_d_BulkUpdateSubscriptionItemsByFilterRequest = BulkUpdateSubscriptionItemsByFilterRequest;
  type billingV1Subscription_universal_d_BulkItemChange = BulkItemChange;
  type billingV1Subscription_universal_d_BulkUpdateSubscriptionItemsByFilterResponse = BulkUpdateSubscriptionItemsByFilterResponse;
  type billingV1Subscription_universal_d_DeleteSubscriptionRequest = DeleteSubscriptionRequest;
  type billingV1Subscription_universal_d_DeleteSubscriptionResponse = DeleteSubscriptionResponse;
  type billingV1Subscription_universal_d_CancelSubscriptionRequest = CancelSubscriptionRequest;
  type billingV1Subscription_universal_d_ActionContext = ActionContext;
  type billingV1Subscription_universal_d_ActionInitiator = ActionInitiator;
  const billingV1Subscription_universal_d_ActionInitiator: typeof ActionInitiator;
  type billingV1Subscription_universal_d_CancelSubscriptionResponse = CancelSubscriptionResponse;
  type billingV1Subscription_universal_d_PauseSubscriptionRequest = PauseSubscriptionRequest;
  type billingV1Subscription_universal_d_PauseSubscriptionResponse = PauseSubscriptionResponse;
  type billingV1Subscription_universal_d_ResumeSubscriptionRequest = ResumeSubscriptionRequest;
  type billingV1Subscription_universal_d_ResumeSubscriptionResponse = ResumeSubscriptionResponse;
  type billingV1Subscription_universal_d_SearchSubscriptionsRequest = SearchSubscriptionsRequest;
  type billingV1Subscription_universal_d_SearchSubscriptionsRequestPagingMethodOneOf = SearchSubscriptionsRequestPagingMethodOneOf;
  type billingV1Subscription_universal_d_SortingClauses = SortingClauses;
  type billingV1Subscription_universal_d_SearchSubscriptionsResponse = SearchSubscriptionsResponse;
  type billingV1Subscription_universal_d_TurnOnSubscriptionAutoRenewalRequest = TurnOnSubscriptionAutoRenewalRequest;
  type billingV1Subscription_universal_d_TurnOnSubscriptionAutoRenewalResponse = TurnOnSubscriptionAutoRenewalResponse;
  type billingV1Subscription_universal_d_TurnOffSubscriptionAutoRenewalRequest = TurnOffSubscriptionAutoRenewalRequest;
  type billingV1Subscription_universal_d_TurnOffSubscriptionAutoRenewalResponse = TurnOffSubscriptionAutoRenewalResponse;
  type billingV1Subscription_universal_d_MarkLatestInvoiceAsPaidRequest = MarkLatestInvoiceAsPaidRequest;
  type billingV1Subscription_universal_d_MarkLatestInvoiceAsPaidResponse = MarkLatestInvoiceAsPaidResponse;
  type billingV1Subscription_universal_d_GetSubscriptionsStatsRequest = GetSubscriptionsStatsRequest;
  type billingV1Subscription_universal_d_GetSubscriptionsStatsResponse = GetSubscriptionsStatsResponse;
  type billingV1Subscription_universal_d_AmountByStatus = AmountByStatus;
  type billingV1Subscription_universal_d_ExtendSubscriptionRequest = ExtendSubscriptionRequest;
  type billingV1Subscription_universal_d_ExtendSubscriptionRequestExtendPolicyOneOf = ExtendSubscriptionRequestExtendPolicyOneOf;
  type billingV1Subscription_universal_d_ExtendSubscriptionResponse = ExtendSubscriptionResponse;
  type billingV1Subscription_universal_d_AllowedActionsRequest = AllowedActionsRequest;
  type billingV1Subscription_universal_d_RequestedFields = RequestedFields;
  const billingV1Subscription_universal_d_RequestedFields: typeof RequestedFields;
  type billingV1Subscription_universal_d_AllowedActionsResponse = AllowedActionsResponse;
  type billingV1Subscription_universal_d_UnsupportedAction = UnsupportedAction;
  type billingV1Subscription_universal_d_UnsupportedReason = UnsupportedReason;
  type billingV1Subscription_universal_d_ListUpcomingChargesRequest = ListUpcomingChargesRequest;
  type billingV1Subscription_universal_d_ListUpcomingChargesResponse = ListUpcomingChargesResponse;
  type billingV1Subscription_universal_d_PreviewSubscriptionChargesRequest = PreviewSubscriptionChargesRequest;
  type billingV1Subscription_universal_d_PreviewSubscriptionChargesRequestSubscriptionOneOf = PreviewSubscriptionChargesRequestSubscriptionOneOf;
  type billingV1Subscription_universal_d_SubscriptionInfo = SubscriptionInfo;
  type billingV1Subscription_universal_d_PreviewSubscriptionChargesResponse = PreviewSubscriptionChargesResponse;
  type billingV1Subscription_universal_d_Charge = Charge;
  type billingV1Subscription_universal_d_PreviewSubscriptionsChargesRequest = PreviewSubscriptionsChargesRequest;
  type billingV1Subscription_universal_d_SubscriptionBillingDetails = SubscriptionBillingDetails;
  type billingV1Subscription_universal_d_PreviewSubscriptionsChargesResponse = PreviewSubscriptionsChargesResponse;
  type billingV1Subscription_universal_d_SubscriptionCharges = SubscriptionCharges;
  type billingV1Subscription_universal_d_CreateSubscriptionForOrderRequest = CreateSubscriptionForOrderRequest;
  type billingV1Subscription_universal_d_CreateSubscriptionForOrderResponse = CreateSubscriptionForOrderResponse;
  type billingV1Subscription_universal_d_Invoice = Invoice;
  type billingV1Subscription_universal_d_BusinessOriginData = BusinessOriginData;
  type billingV1Subscription_universal_d_InvoiceStatus = InvoiceStatus;
  const billingV1Subscription_universal_d_InvoiceStatus: typeof InvoiceStatus;
  type billingV1Subscription_universal_d_CollectionMethodEnumCollectionMethod = CollectionMethodEnumCollectionMethod;
  const billingV1Subscription_universal_d_CollectionMethodEnumCollectionMethod: typeof CollectionMethodEnumCollectionMethod;
  type billingV1Subscription_universal_d_CreationMode = CreationMode;
  const billingV1Subscription_universal_d_CreationMode: typeof CreationMode;
  type billingV1Subscription_universal_d_LatestPaymentAttempt = LatestPaymentAttempt;
  type billingV1Subscription_universal_d_PaymentAttemptStatus = PaymentAttemptStatus;
  const billingV1Subscription_universal_d_PaymentAttemptStatus: typeof PaymentAttemptStatus;
  type billingV1Subscription_universal_d_PriceAdjustment = PriceAdjustment;
  type billingV1Subscription_universal_d_PriceAdjustmentAdjustmentTypeOneOf = PriceAdjustmentAdjustmentTypeOneOf;
  type billingV1Subscription_universal_d_PriceAdjustmentValue = PriceAdjustmentValue;
  type billingV1Subscription_universal_d_PriceAdjustmentValueAdjustmentValueTypeOneOf = PriceAdjustmentValueAdjustmentValueTypeOneOf;
  type billingV1Subscription_universal_d_InvoiceShippingCharges = InvoiceShippingCharges;
  type billingV1Subscription_universal_d_TaxData = TaxData;
  type billingV1Subscription_universal_d_TaxSummary = TaxSummary;
  type billingV1Subscription_universal_d_AggregatedTaxBreakdown = AggregatedTaxBreakdown;
  type billingV1Subscription_universal_d_Task = Task;
  type billingV1Subscription_universal_d_TaskKey = TaskKey;
  type billingV1Subscription_universal_d_TaskAction = TaskAction;
  type billingV1Subscription_universal_d_TaskActionActionOneOf = TaskActionActionOneOf;
  type billingV1Subscription_universal_d_Complete = Complete;
  type billingV1Subscription_universal_d_Cancel = Cancel;
  type billingV1Subscription_universal_d_Reschedule = Reschedule;
  type billingV1Subscription_universal_d_Empty = Empty;
  type billingV1Subscription_universal_d_V1SubscriptionEvent = V1SubscriptionEvent;
  type billingV1Subscription_universal_d_V1SubscriptionEventEventOneOf = V1SubscriptionEventEventOneOf;
  type billingV1Subscription_universal_d_V1SubscriptionCreated = V1SubscriptionCreated;
  type billingV1Subscription_universal_d_V1Subscription = V1Subscription;
  type billingV1Subscription_universal_d_Subscriber = Subscriber;
  type billingV1Subscription_universal_d_IdentityType = IdentityType;
  const billingV1Subscription_universal_d_IdentityType: typeof IdentityType;
  type billingV1Subscription_universal_d_Money = Money;
  type billingV1Subscription_universal_d_SubscriptionType = SubscriptionType;
  const billingV1Subscription_universal_d_SubscriptionType: typeof SubscriptionType;
  type billingV1Subscription_universal_d_V1SubscriptionStatusEnumSubscriptionStatus = V1SubscriptionStatusEnumSubscriptionStatus;
  const billingV1Subscription_universal_d_V1SubscriptionStatusEnumSubscriptionStatus: typeof V1SubscriptionStatusEnumSubscriptionStatus;
  type billingV1Subscription_universal_d_PaymentStatusEnumPaymentStatus = PaymentStatusEnumPaymentStatus;
  const billingV1Subscription_universal_d_PaymentStatusEnumPaymentStatus: typeof PaymentStatusEnumPaymentStatus;
  type billingV1Subscription_universal_d_V2Subscription = V2Subscription;
  type billingV1Subscription_universal_d_SubscriptionFrequency = SubscriptionFrequency;
  const billingV1Subscription_universal_d_SubscriptionFrequency: typeof SubscriptionFrequency;
  type billingV1Subscription_universal_d_SubscriptionTrialPeriod = SubscriptionTrialPeriod;
  type billingV1Subscription_universal_d_CancellationInitiator = CancellationInitiator;
  const billingV1Subscription_universal_d_CancellationInitiator: typeof CancellationInitiator;
  type billingV1Subscription_universal_d_SubscriptionPolicy = SubscriptionPolicy;
  type billingV1Subscription_universal_d_Suspension = Suspension;
  type billingV1Subscription_universal_d_Status = Status;
  const billingV1Subscription_universal_d_Status: typeof Status;
  type billingV1Subscription_universal_d_V1Duration = V1Duration;
  type billingV1Subscription_universal_d_V1SubscriptionActivated = V1SubscriptionActivated;
  type billingV1Subscription_universal_d_V1SubscriptionCanceled = V1SubscriptionCanceled;
  type billingV1Subscription_universal_d_V1SubscriptionUpdated = V1SubscriptionUpdated;
  type billingV1Subscription_universal_d_SubscriptionCycleTriggered = SubscriptionCycleTriggered;
  type billingV1Subscription_universal_d_SubscriptionMarkedAsPaid = SubscriptionMarkedAsPaid;
  type billingV1Subscription_universal_d_SubscriptionCancellationRequested = SubscriptionCancellationRequested;
  type billingV1Subscription_universal_d_SubscriptionSuspended = SubscriptionSuspended;
  type billingV1Subscription_universal_d_V1SubscriptionResumed = V1SubscriptionResumed;
  type billingV1Subscription_universal_d_SubscriptionExpired = SubscriptionExpired;
  type billingV1Subscription_universal_d_V1SubscriptionInitialPurchaseCompleted = V1SubscriptionInitialPurchaseCompleted;
  type billingV1Subscription_universal_d_CreateSubscriptionInStateRequest = CreateSubscriptionInStateRequest;
  type billingV1Subscription_universal_d_CreateSubscriptionInStateRequestModeOneOf = CreateSubscriptionInStateRequestModeOneOf;
  type billingV1Subscription_universal_d_CreateSubscriptionInStateResponse = CreateSubscriptionInStateResponse;
  type billingV1Subscription_universal_d_PayCycleRequest = PayCycleRequest;
  type billingV1Subscription_universal_d_PaymentTestMode = PaymentTestMode;
  const billingV1Subscription_universal_d_PaymentTestMode: typeof PaymentTestMode;
  type billingV1Subscription_universal_d_PayCycleResponse = PayCycleResponse;
  type billingV1Subscription_universal_d_GetFullSubscriptionDataRequest = GetFullSubscriptionDataRequest;
  type billingV1Subscription_universal_d_GetFullSubscriptionDataResponse = GetFullSubscriptionDataResponse;
  type billingV1Subscription_universal_d_InternalSubscriptionData = InternalSubscriptionData;
  type billingV1Subscription_universal_d_MigrationDetails = MigrationDetails;
  type billingV1Subscription_universal_d_PausePeriod = PausePeriod;
  type billingV1Subscription_universal_d_GetSubscriptionAndInternalDataRequest = GetSubscriptionAndInternalDataRequest;
  type billingV1Subscription_universal_d_GetSubscriptionAndInternalDataResponse = GetSubscriptionAndInternalDataResponse;
  type billingV1Subscription_universal_d_SearchSubscriptionRequest = SearchSubscriptionRequest;
  type billingV1Subscription_universal_d_SearchSubscriptionResponse = SearchSubscriptionResponse;
  type billingV1Subscription_universal_d_UpdatePausePaidDurationRequest = UpdatePausePaidDurationRequest;
  type billingV1Subscription_universal_d_UpdatePausePaidDurationResponse = UpdatePausePaidDurationResponse;
  type billingV1Subscription_universal_d_UpdateStatusRequest = UpdateStatusRequest;
  type billingV1Subscription_universal_d_UpdateStatusResponse = UpdateStatusResponse;
  type billingV1Subscription_universal_d_UpdatePaymentStatusRequest = UpdatePaymentStatusRequest;
  type billingV1Subscription_universal_d_UpdatePaymentStatusResponse = UpdatePaymentStatusResponse;
  type billingV1Subscription_universal_d_ReviveSubscriptionRequest = ReviveSubscriptionRequest;
  type billingV1Subscription_universal_d_RevivePolicy = RevivePolicy;
  const billingV1Subscription_universal_d_RevivePolicy: typeof RevivePolicy;
  type billingV1Subscription_universal_d_ReviveSubscriptionResponse = ReviveSubscriptionResponse;
  type billingV1Subscription_universal_d_ConvertSapiRequest = ConvertSapiRequest;
  type billingV1Subscription_universal_d_ConvertSapiResponse = ConvertSapiResponse;
  type billingV1Subscription_universal_d_GetSubscriptionInvoicesRequest = GetSubscriptionInvoicesRequest;
  type billingV1Subscription_universal_d_GetSubscriptionInvoicesResponse = GetSubscriptionInvoicesResponse;
  type billingV1Subscription_universal_d_SubscriptionInvoice = SubscriptionInvoice;
  type billingV1Subscription_universal_d_FinishFreeTrialNowRequest = FinishFreeTrialNowRequest;
  type billingV1Subscription_universal_d_FinishFreeTrialNowResponse = FinishFreeTrialNowResponse;
  type billingV1Subscription_universal_d_SendTimeCapsuleTaskCanceledBIRequest = SendTimeCapsuleTaskCanceledBIRequest;
  type billingV1Subscription_universal_d_ScheduleTimeCapsuleTaskRequest = ScheduleTimeCapsuleTaskRequest;
  type billingV1Subscription_universal_d_CancelTimeCapsuleTaskRequest = CancelTimeCapsuleTaskRequest;
  type billingV1Subscription_universal_d_UpdateFullSubscriptionRequest = UpdateFullSubscriptionRequest;
  type billingV1Subscription_universal_d_UpdateFullSubscriptionResponse = UpdateFullSubscriptionResponse;
  type billingV1Subscription_universal_d_UpdateSubscriptionInvoiceCycleRequest = UpdateSubscriptionInvoiceCycleRequest;
  type billingV1Subscription_universal_d_UpdateSubscriptionInvoiceCycleResponse = UpdateSubscriptionInvoiceCycleResponse;
  type billingV1Subscription_universal_d_AddPausePeriodRequest = AddPausePeriodRequest;
  type billingV1Subscription_universal_d_AddPausePeriodResponse = AddPausePeriodResponse;
  type billingV1Subscription_universal_d_RunTimeCapsuleTaskNowRequest = RunTimeCapsuleTaskNowRequest;
  type billingV1Subscription_universal_d_CreateRecurringInvoiceBORequest = CreateRecurringInvoiceBORequest;
  type billingV1Subscription_universal_d_CreateRecurringInvoiceBOResponse = CreateRecurringInvoiceBOResponse;
  type billingV1Subscription_universal_d_SetShiftingDataRequest = SetShiftingDataRequest;
  type billingV1Subscription_universal_d_SetShiftingDataResponse = SetShiftingDataResponse;
  type billingV1Subscription_universal_d_FixSubscriptionInvoicesRequest = FixSubscriptionInvoicesRequest;
  type billingV1Subscription_universal_d_FixSubscriptionInvoicesRequestModeOneOf = FixSubscriptionInvoicesRequestModeOneOf;
  type billingV1Subscription_universal_d_AttachInvoice = AttachInvoice;
  type billingV1Subscription_universal_d_DetachInvoice = DetachInvoice;
  type billingV1Subscription_universal_d_FixSubscriptionInvoicesResponse = FixSubscriptionInvoicesResponse;
  type billingV1Subscription_universal_d_RestoreDraftSubscriptionRequest = RestoreDraftSubscriptionRequest;
  type billingV1Subscription_universal_d_RestoreDraftSubscriptionResponse = RestoreDraftSubscriptionResponse;
  type billingV1Subscription_universal_d_DeleteDraftSubscriptionRequest = DeleteDraftSubscriptionRequest;
  type billingV1Subscription_universal_d_DeleteDraftSubscriptionResponse = DeleteDraftSubscriptionResponse;
  type billingV1Subscription_universal_d_DeleteSubscriptionBORequest = DeleteSubscriptionBORequest;
  type billingV1Subscription_universal_d_DeleteSubscriptionBOResponse = DeleteSubscriptionBOResponse;
  type billingV1Subscription_universal_d_CancelSubscriptionBORequest = CancelSubscriptionBORequest;
  type billingV1Subscription_universal_d_CancelSubscriptionBOResponse = CancelSubscriptionBOResponse;
  type billingV1Subscription_universal_d_UpdatePaymentMethodBORequest = UpdatePaymentMethodBORequest;
  type billingV1Subscription_universal_d_UpdatePaymentMethodBOResponse = UpdatePaymentMethodBOResponse;
  type billingV1Subscription_universal_d_SendSubscriptionActionEventBORequest = SendSubscriptionActionEventBORequest;
  type billingV1Subscription_universal_d_SendSubscriptionActionEventBORequestEventOneOf = SendSubscriptionActionEventBORequestEventOneOf;
  type billingV1Subscription_universal_d_SendSubscriptionActionEventResponse = SendSubscriptionActionEventResponse;
  type billingV1Subscription_universal_d_HandleSubscriptionAfterInvoiceMarkedAsPaidRequest = HandleSubscriptionAfterInvoiceMarkedAsPaidRequest;
  const billingV1Subscription_universal_d_listSubscriptionHistory: typeof listSubscriptionHistory;
  type billingV1Subscription_universal_d_ListSubscriptionHistoryOptions = ListSubscriptionHistoryOptions;
  const billingV1Subscription_universal_d_customerGetSubscription: typeof customerGetSubscription;
  const billingV1Subscription_universal_d_customerCancelSubscription: typeof customerCancelSubscription;
  type billingV1Subscription_universal_d_CustomerCancelSubscriptionOptions = CustomerCancelSubscriptionOptions;
  const billingV1Subscription_universal_d_customerTurnOnSubscriptionAutoRenewal: typeof customerTurnOnSubscriptionAutoRenewal;
  type billingV1Subscription_universal_d_CustomerTurnOnSubscriptionAutoRenewalOptions = CustomerTurnOnSubscriptionAutoRenewalOptions;
  const billingV1Subscription_universal_d_customerTurnOffSubscriptionAutoRenewal: typeof customerTurnOffSubscriptionAutoRenewal;
  type billingV1Subscription_universal_d_CustomerTurnOffSubscriptionAutoRenewalOptions = CustomerTurnOffSubscriptionAutoRenewalOptions;
  const billingV1Subscription_universal_d_customerExtendSubscription: typeof customerExtendSubscription;
  type billingV1Subscription_universal_d_CustomerExtendSubscriptionOptions = CustomerExtendSubscriptionOptions;
  const billingV1Subscription_universal_d_customerQuerySubscriptions: typeof customerQuerySubscriptions;
  type billingV1Subscription_universal_d_CustomerQuerySubscriptionsOptions = CustomerQuerySubscriptionsOptions;
  const billingV1Subscription_universal_d_customerCountSubscriptions: typeof customerCountSubscriptions;
  type billingV1Subscription_universal_d_CustomerCountSubscriptionsOptions = CustomerCountSubscriptionsOptions;
  const billingV1Subscription_universal_d_customerUpdateSubscriptionPaymentMethod: typeof customerUpdateSubscriptionPaymentMethod;
  const billingV1Subscription_universal_d_customerAllowedActions: typeof customerAllowedActions;
  const billingV1Subscription_universal_d_customerListUpcomingCharges: typeof customerListUpcomingCharges;
  const billingV1Subscription_universal_d_customerInitiatePaymentMethodSetup: typeof customerInitiatePaymentMethodSetup;
  type billingV1Subscription_universal_d_CustomerInitiatePaymentMethodSetupOptions = CustomerInitiatePaymentMethodSetupOptions;
  const billingV1Subscription_universal_d_createSubscription: typeof createSubscription;
  type billingV1Subscription_universal_d_CreateSubscriptionOptions = CreateSubscriptionOptions;
  const billingV1Subscription_universal_d_getSubscription: typeof getSubscription;
  const billingV1Subscription_universal_d_updateSubscription: typeof updateSubscription;
  type billingV1Subscription_universal_d_UpdateSubscriptionOptions = UpdateSubscriptionOptions;
  const billingV1Subscription_universal_d_updateSubscriptionStartDate: typeof updateSubscriptionStartDate;
  const billingV1Subscription_universal_d_updateSubscriptionPaymentMethod: typeof updateSubscriptionPaymentMethod;
  const billingV1Subscription_universal_d_updateSubscriptionPolicies: typeof updateSubscriptionPolicies;
  type billingV1Subscription_universal_d_UpdateSubscriptionPoliciesOptions = UpdateSubscriptionPoliciesOptions;
  const billingV1Subscription_universal_d_updateSubscriptionBillingDate: typeof updateSubscriptionBillingDate;
  type billingV1Subscription_universal_d_UpdateSubscriptionBillingDateOptions = UpdateSubscriptionBillingDateOptions;
  const billingV1Subscription_universal_d_updateSubscriptionOrigin: typeof updateSubscriptionOrigin;
  const billingV1Subscription_universal_d_reviseSubscription: typeof reviseSubscription;
  type billingV1Subscription_universal_d_ReviseSubscriptionOptions = ReviseSubscriptionOptions;
  const billingV1Subscription_universal_d_updateSubscriptionItems: typeof updateSubscriptionItems;
  type billingV1Subscription_universal_d_UpdateSubscriptionItemsOptions = UpdateSubscriptionItemsOptions;
  const billingV1Subscription_universal_d_bulkUpdateSubscriptionItemsByFilter: typeof bulkUpdateSubscriptionItemsByFilter;
  type billingV1Subscription_universal_d_BulkUpdateSubscriptionItemsByFilterOptions = BulkUpdateSubscriptionItemsByFilterOptions;
  const billingV1Subscription_universal_d_deleteSubscription: typeof deleteSubscription;
  type billingV1Subscription_universal_d_DeleteSubscriptionOptions = DeleteSubscriptionOptions;
  const billingV1Subscription_universal_d_cancelSubscription: typeof cancelSubscription;
  const billingV1Subscription_universal_d_pauseSubscription: typeof pauseSubscription;
  type billingV1Subscription_universal_d_PauseSubscriptionOptions = PauseSubscriptionOptions;
  const billingV1Subscription_universal_d_resumeSubscription: typeof resumeSubscription;
  type billingV1Subscription_universal_d_ResumeSubscriptionOptions = ResumeSubscriptionOptions;
  const billingV1Subscription_universal_d_querySubscriptions: typeof querySubscriptions;
  const billingV1Subscription_universal_d_searchSubscriptions: typeof searchSubscriptions;
  type billingV1Subscription_universal_d_SearchSubscriptionsOptions = SearchSubscriptionsOptions;
  const billingV1Subscription_universal_d_countSubscriptions: typeof countSubscriptions;
  type billingV1Subscription_universal_d_CountSubscriptionsOptions = CountSubscriptionsOptions;
  const billingV1Subscription_universal_d_turnOnSubscriptionAutoRenewal: typeof turnOnSubscriptionAutoRenewal;
  const billingV1Subscription_universal_d_turnOffSubscriptionAutoRenewal: typeof turnOffSubscriptionAutoRenewal;
  const billingV1Subscription_universal_d_markLatestInvoiceAsPaid: typeof markLatestInvoiceAsPaid;
  const billingV1Subscription_universal_d_getSubscriptionsStats: typeof getSubscriptionsStats;
  const billingV1Subscription_universal_d_extendSubscription: typeof extendSubscription;
  type billingV1Subscription_universal_d_ExtendSubscriptionOptions = ExtendSubscriptionOptions;
  const billingV1Subscription_universal_d_allowedActions: typeof allowedActions;
  type billingV1Subscription_universal_d_AllowedActionsOptions = AllowedActionsOptions;
  const billingV1Subscription_universal_d_listUpcomingCharges: typeof listUpcomingCharges;
  type billingV1Subscription_universal_d_ListUpcomingChargesOptions = ListUpcomingChargesOptions;
  const billingV1Subscription_universal_d_previewSubscriptionCharges: typeof previewSubscriptionCharges;
  type billingV1Subscription_universal_d_PreviewSubscriptionChargesOptions = PreviewSubscriptionChargesOptions;
  const billingV1Subscription_universal_d_previewSubscriptionsCharges: typeof previewSubscriptionsCharges;
  type billingV1Subscription_universal_d_PreviewSubscriptionsChargesOptions = PreviewSubscriptionsChargesOptions;
  const billingV1Subscription_universal_d_initiatePaymentMethodSetup: typeof initiatePaymentMethodSetup;
  type billingV1Subscription_universal_d_InitiatePaymentMethodSetupOptions = InitiatePaymentMethodSetupOptions;
  const billingV1Subscription_universal_d_payCycle: typeof payCycle;
  type billingV1Subscription_universal_d_PayCycleOptions = PayCycleOptions;
  const billingV1Subscription_universal_d_runTimeCapsuleTaskNow: typeof runTimeCapsuleTaskNow;
  type billingV1Subscription_universal_d_RunTimeCapsuleTaskNowOptions = RunTimeCapsuleTaskNowOptions;
  namespace billingV1Subscription_universal_d {
    export {
      billingV1Subscription_universal_d_Subscription as Subscription,
      billingV1Subscription_universal_d_BusinessOrigin as BusinessOrigin,
      billingV1Subscription_universal_d_Customer as Customer,
      billingV1Subscription_universal_d_CustomerIdOneOf as CustomerIdOneOf,
      billingV1Subscription_universal_d_SubscriptionStatusEnumSubscriptionStatus as SubscriptionStatusEnumSubscriptionStatus,
      billingV1Subscription_universal_d_BillingSettings as BillingSettings,
      billingV1Subscription_universal_d_PaymentMethod as PaymentMethod,
      billingV1Subscription_universal_d_CollectionMethod as CollectionMethod,
      billingV1Subscription_universal_d_Duration as Duration,
      billingV1Subscription_universal_d_DurationUnit as DurationUnit,
      billingV1Subscription_universal_d_CustomBillingSchedule as CustomBillingSchedule,
      billingV1Subscription_universal_d_FullAddressDetails as FullAddressDetails,
      billingV1Subscription_universal_d_FullAddressContactDetails as FullAddressContactDetails,
      billingV1Subscription_universal_d_Address as Address,
      billingV1Subscription_universal_d_AddressStreetOneOf as AddressStreetOneOf,
      billingV1Subscription_universal_d_StreetAddress as StreetAddress,
      billingV1Subscription_universal_d_TaxSettings as TaxSettings,
      billingV1Subscription_universal_d_AdditionalFee as AdditionalFee,
      billingV1Subscription_universal_d_AdditionalFeeTrigger as AdditionalFeeTrigger,
      billingV1Subscription_universal_d_Tax as Tax,
      billingV1Subscription_universal_d_TaxValueOneOf as TaxValueOneOf,
      billingV1Subscription_universal_d_DynamicTax as DynamicTax,
      billingV1Subscription_universal_d_TaxableAddressType as TaxableAddressType,
      billingV1Subscription_universal_d_ShippingCharges as ShippingCharges,
      billingV1Subscription_universal_d_Discount as Discount,
      billingV1Subscription_universal_d_DiscountValueOneOf as DiscountValueOneOf,
      billingV1Subscription_universal_d_DiscountCycles as DiscountCycles,
      billingV1Subscription_universal_d_DiscountOrigin as DiscountOrigin,
      billingV1Subscription_universal_d_ExternalCollectionDetails as ExternalCollectionDetails,
      billingV1Subscription_universal_d_BillingStatus as BillingStatus,
      billingV1Subscription_universal_d_PaymentData as PaymentData,
      billingV1Subscription_universal_d_PaymentStatus as PaymentStatus,
      billingV1Subscription_universal_d_Totals as Totals,
      billingV1Subscription_universal_d_FreeTrialData as FreeTrialData,
      billingV1Subscription_universal_d_UpdateBillingDateData as UpdateBillingDateData,
      billingV1Subscription_universal_d_Proration as Proration,
      billingV1Subscription_universal_d_ProrationTypeOneOf as ProrationTypeOneOf,
      billingV1Subscription_universal_d_TimeBasedProration as TimeBasedProration,
      billingV1Subscription_universal_d_CustomProration as CustomProration,
      billingV1Subscription_universal_d_CustomProrationAmountOneOf as CustomProrationAmountOneOf,
      billingV1Subscription_universal_d_GracePeriodData as GracePeriodData,
      billingV1Subscription_universal_d_AutomaticRetryData as AutomaticRetryData,
      billingV1Subscription_universal_d_SubscriptionPolicies as SubscriptionPolicies,
      billingV1Subscription_universal_d_PauseInfo as PauseInfo,
      billingV1Subscription_universal_d_PausePolicy as PausePolicy,
      billingV1Subscription_universal_d_PauseAt as PauseAt,
      billingV1Subscription_universal_d_ResumeAt as ResumeAt,
      billingV1Subscription_universal_d_CancellationInfo as CancellationInfo,
      billingV1Subscription_universal_d_HistoryActionInitiator as HistoryActionInitiator,
      billingV1Subscription_universal_d_SubscriptionUpdateData as SubscriptionUpdateData,
      billingV1Subscription_universal_d_ItemChange as ItemChange,
      billingV1Subscription_universal_d_PricingModel as PricingModel,
      billingV1Subscription_universal_d_PricingModelModelOneOf as PricingModelModelOneOf,
      billingV1Subscription_universal_d_FixedPrice as FixedPrice,
      billingV1Subscription_universal_d_Item as Item,
      billingV1Subscription_universal_d_CatalogReference as CatalogReference,
      billingV1Subscription_universal_d_ItemCategory as ItemCategory,
      billingV1Subscription_universal_d_ApplicationFee as ApplicationFee,
      billingV1Subscription_universal_d_ApplicationFeeValueOneOf as ApplicationFeeValueOneOf,
      billingV1Subscription_universal_d_SpecificDateSubscriptionUpdateData as SpecificDateSubscriptionUpdateData,
      billingV1Subscription_universal_d_ListSubscriptionHistoryRequest as ListSubscriptionHistoryRequest,
      billingV1Subscription_universal_d_HistoryViewMode as HistoryViewMode,
      billingV1Subscription_universal_d_CursorPaging as CursorPaging,
      billingV1Subscription_universal_d_ListSubscriptionHistoryResponse as ListSubscriptionHistoryResponse,
      billingV1Subscription_universal_d_SubscriptionHistoryEntry as SubscriptionHistoryEntry,
      billingV1Subscription_universal_d_SubscriptionEvent as SubscriptionEvent,
      billingV1Subscription_universal_d_SubscriptionEventPayloadOneOf as SubscriptionEventPayloadOneOf,
      billingV1Subscription_universal_d_SubscriptionCreated as SubscriptionCreated,
      billingV1Subscription_universal_d_SubscriptionUpdated as SubscriptionUpdated,
      billingV1Subscription_universal_d_SubscriptionDiff as SubscriptionDiff,
      billingV1Subscription_universal_d_SubscriptionDeleted as SubscriptionDeleted,
      billingV1Subscription_universal_d_SubscriptionActivated as SubscriptionActivated,
      billingV1Subscription_universal_d_SubscriptionEnded as SubscriptionEnded,
      billingV1Subscription_universal_d_SubscriptionCanceled as SubscriptionCanceled,
      billingV1Subscription_universal_d_ActionDetails as ActionDetails,
      billingV1Subscription_universal_d_SubscriptionPaused as SubscriptionPaused,
      billingV1Subscription_universal_d_SubscriptionResumed as SubscriptionResumed,
      billingV1Subscription_universal_d_PauseSubscriptionRequested as PauseSubscriptionRequested,
      billingV1Subscription_universal_d_ResumeSubscriptionRequested as ResumeSubscriptionRequested,
      billingV1Subscription_universal_d_ScheduledPauseCanceled as ScheduledPauseCanceled,
      billingV1Subscription_universal_d_ScheduledResumeCanceled as ScheduledResumeCanceled,
      billingV1Subscription_universal_d_SubscriptionBillingCycleStarted as SubscriptionBillingCycleStarted,
      billingV1Subscription_universal_d_SubscriptionAutoRenewalTurnedOn as SubscriptionAutoRenewalTurnedOn,
      billingV1Subscription_universal_d_SubscriptionAutoRenewalTurnedOff as SubscriptionAutoRenewalTurnedOff,
      billingV1Subscription_universal_d_SubscriptionCycleReadyToPay as SubscriptionCycleReadyToPay,
      billingV1Subscription_universal_d_SubscriptionExtended as SubscriptionExtended,
      billingV1Subscription_universal_d_SubscriptionExtendedExtendPolicyOneOf as SubscriptionExtendedExtendPolicyOneOf,
      billingV1Subscription_universal_d_SubscriptionInitialPurchaseCompleted as SubscriptionInitialPurchaseCompleted,
      billingV1Subscription_universal_d_LatestInvoiceMarkedAsPaid as LatestInvoiceMarkedAsPaid,
      billingV1Subscription_universal_d_SubscriptionRevived as SubscriptionRevived,
      billingV1Subscription_universal_d_SubscriptionBillingDateUpdated as SubscriptionBillingDateUpdated,
      billingV1Subscription_universal_d_FutureUpdatesRequested as FutureUpdatesRequested,
      billingV1Subscription_universal_d_UpdatesApplied as UpdatesApplied,
      billingV1Subscription_universal_d_UpdateAction as UpdateAction,
      billingV1Subscription_universal_d_ResetPendingUpdates as ResetPendingUpdates,
      billingV1Subscription_universal_d_GracePeriodStarted as GracePeriodStarted,
      billingV1Subscription_universal_d_GracePeriodEnded as GracePeriodEnded,
      billingV1Subscription_universal_d_PaymentSettlementMethod as PaymentSettlementMethod,
      billingV1Subscription_universal_d_PaymentMethodUpdated as PaymentMethodUpdated,
      billingV1Subscription_universal_d_PaymentMode as PaymentMode,
      billingV1Subscription_universal_d_SubscriptionCollectionMethodUpdated as SubscriptionCollectionMethodUpdated,
      billingV1Subscription_universal_d_FreeTrailStarted as FreeTrailStarted,
      billingV1Subscription_universal_d_FreeTrailEnded as FreeTrailEnded,
      billingV1Subscription_universal_d_SubscriptionBackOfficeAction as SubscriptionBackOfficeAction,
      billingV1Subscription_universal_d_UnknownSubscriptionEvent as UnknownSubscriptionEvent,
      billingV1Subscription_universal_d_PagingMetadataV2 as PagingMetadataV2,
      billingV1Subscription_universal_d_Cursors as Cursors,
      billingV1Subscription_universal_d_GetSubscriptionRequest as GetSubscriptionRequest,
      billingV1Subscription_universal_d_GetSubscriptionResponse as GetSubscriptionResponse,
      billingV1Subscription_universal_d_CustomerCancelSubscriptionRequest as CustomerCancelSubscriptionRequest,
      billingV1Subscription_universal_d_CustomerCancelSubscriptionResponse as CustomerCancelSubscriptionResponse,
      billingV1Subscription_universal_d_CustomerTurnOnAutoRenewalRequest as CustomerTurnOnAutoRenewalRequest,
      billingV1Subscription_universal_d_CustomerTurnOnAutoRenewalResponse as CustomerTurnOnAutoRenewalResponse,
      billingV1Subscription_universal_d_CustomerTurnOffAutoRenewalRequest as CustomerTurnOffAutoRenewalRequest,
      billingV1Subscription_universal_d_CustomerTurnOffAutoRenewalResponse as CustomerTurnOffAutoRenewalResponse,
      billingV1Subscription_universal_d_CustomerExtendSubscriptionRequest as CustomerExtendSubscriptionRequest,
      billingV1Subscription_universal_d_CustomerExtendSubscriptionResponse as CustomerExtendSubscriptionResponse,
      billingV1Subscription_universal_d_QuerySubscriptionsRequest as QuerySubscriptionsRequest,
      billingV1Subscription_universal_d_QueryV2 as QueryV2,
      billingV1Subscription_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf,
      billingV1Subscription_universal_d_Sorting as Sorting,
      billingV1Subscription_universal_d_SortOrder as SortOrder,
      billingV1Subscription_universal_d_Paging as Paging,
      billingV1Subscription_universal_d_QuerySubscriptionsResponse as QuerySubscriptionsResponse,
      billingV1Subscription_universal_d_CountSubscriptionsRequest as CountSubscriptionsRequest,
      billingV1Subscription_universal_d_CountSubscriptionFilter as CountSubscriptionFilter,
      billingV1Subscription_universal_d_CountSubscriptionFilterStatusOneOf as CountSubscriptionFilterStatusOneOf,
      billingV1Subscription_universal_d_SubscriptionStatus as SubscriptionStatus,
      billingV1Subscription_universal_d_SubscriptionStatusGroup as SubscriptionStatusGroup,
      billingV1Subscription_universal_d_CountSubscriptionsResponse as CountSubscriptionsResponse,
      billingV1Subscription_universal_d_CountByStatus as CountByStatus,
      billingV1Subscription_universal_d_UpdateSubscriptionPaymentMethodRequest as UpdateSubscriptionPaymentMethodRequest,
      billingV1Subscription_universal_d_UpdateSubscriptionPaymentMethodResponse as UpdateSubscriptionPaymentMethodResponse,
      billingV1Subscription_universal_d_CustomerAllowedActionsRequest as CustomerAllowedActionsRequest,
      billingV1Subscription_universal_d_CustomerAllowedActionsResponse as CustomerAllowedActionsResponse,
      billingV1Subscription_universal_d_Action as Action,
      billingV1Subscription_universal_d_ActionType as ActionType,
      billingV1Subscription_universal_d_ExtendPolicyType as ExtendPolicyType,
      billingV1Subscription_universal_d_CustomerListUpcomingChargesRequest as CustomerListUpcomingChargesRequest,
      billingV1Subscription_universal_d_CustomerListUpcomingChargesResponse as CustomerListUpcomingChargesResponse,
      billingV1Subscription_universal_d_SubscriptionCharge as SubscriptionCharge,
      billingV1Subscription_universal_d_InvoiceItem as InvoiceItem,
      billingV1Subscription_universal_d_InvoiceItemPaymentTypeOneOf as InvoiceItemPaymentTypeOneOf,
      billingV1Subscription_universal_d_Recurring as Recurring,
      billingV1Subscription_universal_d_OneTime as OneTime,
      billingV1Subscription_universal_d_PriceDetails as PriceDetails,
      billingV1Subscription_universal_d_InvoiceDiscount as InvoiceDiscount,
      billingV1Subscription_universal_d_InvoiceDiscountValueOneOf as InvoiceDiscountValueOneOf,
      billingV1Subscription_universal_d_InvoiceApplicationFee as InvoiceApplicationFee,
      billingV1Subscription_universal_d_InvoiceApplicationFeeValueOneOf as InvoiceApplicationFeeValueOneOf,
      billingV1Subscription_universal_d_ItemTaxData as ItemTaxData,
      billingV1Subscription_universal_d_LineItemTaxSummary as LineItemTaxSummary,
      billingV1Subscription_universal_d_TaxBreakdown as TaxBreakdown,
      billingV1Subscription_universal_d_InitiatePaymentMethodSetupRequest as InitiatePaymentMethodSetupRequest,
      billingV1Subscription_universal_d_PaymentSettings as PaymentSettings,
      billingV1Subscription_universal_d_OrderMethod as OrderMethod,
      billingV1Subscription_universal_d_RedirectUrls as RedirectUrls,
      billingV1Subscription_universal_d_PaymentOrigin as PaymentOrigin,
      billingV1Subscription_universal_d_InitiatePaymentMethodSetupResponse as InitiatePaymentMethodSetupResponse,
      billingV1Subscription_universal_d_DomainEvent as DomainEvent,
      billingV1Subscription_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      billingV1Subscription_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      billingV1Subscription_universal_d_RestoreInfo as RestoreInfo,
      billingV1Subscription_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      billingV1Subscription_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      billingV1Subscription_universal_d_ActionEvent as ActionEvent,
      billingV1Subscription_universal_d_MessageEnvelope as MessageEnvelope,
      billingV1Subscription_universal_d_IdentificationData as IdentificationData,
      billingV1Subscription_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      billingV1Subscription_universal_d_WebhookIdentityType as WebhookIdentityType,
      billingV1Subscription_universal_d_SetIsMigratedEvent as SetIsMigratedEvent,
      billingV1Subscription_universal_d_SubscriptionDelayedSyncEvent as SubscriptionDelayedSyncEvent,
      billingV1Subscription_universal_d_InvoiceAction as InvoiceAction,
      billingV1Subscription_universal_d_InvoiceActionActionTypeOneOf as InvoiceActionActionTypeOneOf,
      billingV1Subscription_universal_d_PayRecurringInvoice as PayRecurringInvoice,
      billingV1Subscription_universal_d_CreateSubscriptionRequest as CreateSubscriptionRequest,
      billingV1Subscription_universal_d_OriginOverride as OriginOverride,
      billingV1Subscription_universal_d_CreateSubscriptionResponse as CreateSubscriptionResponse,
      billingV1Subscription_universal_d_UpdateSubscriptionRequest as UpdateSubscriptionRequest,
      billingV1Subscription_universal_d_UpdateSubscriptionResponse as UpdateSubscriptionResponse,
      billingV1Subscription_universal_d_UpdateSubscriptionStartDateRequest as UpdateSubscriptionStartDateRequest,
      billingV1Subscription_universal_d_UpdateSubscriptionStartDateResponse as UpdateSubscriptionStartDateResponse,
      billingV1Subscription_universal_d_UpdateSubscriptionPoliciesRequest as UpdateSubscriptionPoliciesRequest,
      billingV1Subscription_universal_d_UpdateSubscriptionPoliciesResponse as UpdateSubscriptionPoliciesResponse,
      billingV1Subscription_universal_d_UpdateSubscriptionBillingDateRequest as UpdateSubscriptionBillingDateRequest,
      billingV1Subscription_universal_d_UpdateSubscriptionBillingDateResponse as UpdateSubscriptionBillingDateResponse,
      billingV1Subscription_universal_d_UpdateSubscriptionOriginRequest as UpdateSubscriptionOriginRequest,
      billingV1Subscription_universal_d_UpdateSubscriptionOriginResponse as UpdateSubscriptionOriginResponse,
      billingV1Subscription_universal_d_ReviseSubscriptionRequest as ReviseSubscriptionRequest,
      billingV1Subscription_universal_d_ReviseSubscriptionResponse as ReviseSubscriptionResponse,
      billingV1Subscription_universal_d_UpdateSubscriptionItemsRequest as UpdateSubscriptionItemsRequest,
      billingV1Subscription_universal_d_ScheduleAdditionalInfo as ScheduleAdditionalInfo,
      billingV1Subscription_universal_d_ScheduleAdditionalInfoParamOneOf as ScheduleAdditionalInfoParamOneOf,
      billingV1Subscription_universal_d_UpdateSubscriptionItemsResponse as UpdateSubscriptionItemsResponse,
      billingV1Subscription_universal_d_BulkUpdateSubscriptionItemsByFilterRequest as BulkUpdateSubscriptionItemsByFilterRequest,
      billingV1Subscription_universal_d_BulkItemChange as BulkItemChange,
      billingV1Subscription_universal_d_BulkUpdateSubscriptionItemsByFilterResponse as BulkUpdateSubscriptionItemsByFilterResponse,
      billingV1Subscription_universal_d_DeleteSubscriptionRequest as DeleteSubscriptionRequest,
      billingV1Subscription_universal_d_DeleteSubscriptionResponse as DeleteSubscriptionResponse,
      billingV1Subscription_universal_d_CancelSubscriptionRequest as CancelSubscriptionRequest,
      billingV1Subscription_universal_d_ActionContext as ActionContext,
      billingV1Subscription_universal_d_ActionInitiator as ActionInitiator,
      billingV1Subscription_universal_d_CancelSubscriptionResponse as CancelSubscriptionResponse,
      billingV1Subscription_universal_d_PauseSubscriptionRequest as PauseSubscriptionRequest,
      billingV1Subscription_universal_d_PauseSubscriptionResponse as PauseSubscriptionResponse,
      billingV1Subscription_universal_d_ResumeSubscriptionRequest as ResumeSubscriptionRequest,
      billingV1Subscription_universal_d_ResumeSubscriptionResponse as ResumeSubscriptionResponse,
      billingV1Subscription_universal_d_SearchSubscriptionsRequest as SearchSubscriptionsRequest,
      billingV1Subscription_universal_d_SearchSubscriptionsRequestPagingMethodOneOf as SearchSubscriptionsRequestPagingMethodOneOf,
      billingV1Subscription_universal_d_SortingClauses as SortingClauses,
      billingV1Subscription_universal_d_SearchSubscriptionsResponse as SearchSubscriptionsResponse,
      billingV1Subscription_universal_d_TurnOnSubscriptionAutoRenewalRequest as TurnOnSubscriptionAutoRenewalRequest,
      billingV1Subscription_universal_d_TurnOnSubscriptionAutoRenewalResponse as TurnOnSubscriptionAutoRenewalResponse,
      billingV1Subscription_universal_d_TurnOffSubscriptionAutoRenewalRequest as TurnOffSubscriptionAutoRenewalRequest,
      billingV1Subscription_universal_d_TurnOffSubscriptionAutoRenewalResponse as TurnOffSubscriptionAutoRenewalResponse,
      billingV1Subscription_universal_d_MarkLatestInvoiceAsPaidRequest as MarkLatestInvoiceAsPaidRequest,
      billingV1Subscription_universal_d_MarkLatestInvoiceAsPaidResponse as MarkLatestInvoiceAsPaidResponse,
      billingV1Subscription_universal_d_GetSubscriptionsStatsRequest as GetSubscriptionsStatsRequest,
      billingV1Subscription_universal_d_GetSubscriptionsStatsResponse as GetSubscriptionsStatsResponse,
      billingV1Subscription_universal_d_AmountByStatus as AmountByStatus,
      billingV1Subscription_universal_d_ExtendSubscriptionRequest as ExtendSubscriptionRequest,
      billingV1Subscription_universal_d_ExtendSubscriptionRequestExtendPolicyOneOf as ExtendSubscriptionRequestExtendPolicyOneOf,
      billingV1Subscription_universal_d_ExtendSubscriptionResponse as ExtendSubscriptionResponse,
      billingV1Subscription_universal_d_AllowedActionsRequest as AllowedActionsRequest,
      billingV1Subscription_universal_d_RequestedFields as RequestedFields,
      billingV1Subscription_universal_d_AllowedActionsResponse as AllowedActionsResponse,
      billingV1Subscription_universal_d_UnsupportedAction as UnsupportedAction,
      billingV1Subscription_universal_d_UnsupportedReason as UnsupportedReason,
      billingV1Subscription_universal_d_ListUpcomingChargesRequest as ListUpcomingChargesRequest,
      billingV1Subscription_universal_d_ListUpcomingChargesResponse as ListUpcomingChargesResponse,
      billingV1Subscription_universal_d_PreviewSubscriptionChargesRequest as PreviewSubscriptionChargesRequest,
      billingV1Subscription_universal_d_PreviewSubscriptionChargesRequestSubscriptionOneOf as PreviewSubscriptionChargesRequestSubscriptionOneOf,
      billingV1Subscription_universal_d_SubscriptionInfo as SubscriptionInfo,
      billingV1Subscription_universal_d_PreviewSubscriptionChargesResponse as PreviewSubscriptionChargesResponse,
      billingV1Subscription_universal_d_Charge as Charge,
      billingV1Subscription_universal_d_PreviewSubscriptionsChargesRequest as PreviewSubscriptionsChargesRequest,
      billingV1Subscription_universal_d_SubscriptionBillingDetails as SubscriptionBillingDetails,
      billingV1Subscription_universal_d_PreviewSubscriptionsChargesResponse as PreviewSubscriptionsChargesResponse,
      billingV1Subscription_universal_d_SubscriptionCharges as SubscriptionCharges,
      billingV1Subscription_universal_d_CreateSubscriptionForOrderRequest as CreateSubscriptionForOrderRequest,
      billingV1Subscription_universal_d_CreateSubscriptionForOrderResponse as CreateSubscriptionForOrderResponse,
      billingV1Subscription_universal_d_Invoice as Invoice,
      billingV1Subscription_universal_d_BusinessOriginData as BusinessOriginData,
      billingV1Subscription_universal_d_InvoiceStatus as InvoiceStatus,
      billingV1Subscription_universal_d_CollectionMethodEnumCollectionMethod as CollectionMethodEnumCollectionMethod,
      billingV1Subscription_universal_d_CreationMode as CreationMode,
      billingV1Subscription_universal_d_LatestPaymentAttempt as LatestPaymentAttempt,
      billingV1Subscription_universal_d_PaymentAttemptStatus as PaymentAttemptStatus,
      billingV1Subscription_universal_d_PriceAdjustment as PriceAdjustment,
      billingV1Subscription_universal_d_PriceAdjustmentAdjustmentTypeOneOf as PriceAdjustmentAdjustmentTypeOneOf,
      billingV1Subscription_universal_d_PriceAdjustmentValue as PriceAdjustmentValue,
      billingV1Subscription_universal_d_PriceAdjustmentValueAdjustmentValueTypeOneOf as PriceAdjustmentValueAdjustmentValueTypeOneOf,
      billingV1Subscription_universal_d_InvoiceShippingCharges as InvoiceShippingCharges,
      billingV1Subscription_universal_d_TaxData as TaxData,
      billingV1Subscription_universal_d_TaxSummary as TaxSummary,
      billingV1Subscription_universal_d_AggregatedTaxBreakdown as AggregatedTaxBreakdown,
      billingV1Subscription_universal_d_Task as Task,
      billingV1Subscription_universal_d_TaskKey as TaskKey,
      billingV1Subscription_universal_d_TaskAction as TaskAction,
      billingV1Subscription_universal_d_TaskActionActionOneOf as TaskActionActionOneOf,
      billingV1Subscription_universal_d_Complete as Complete,
      billingV1Subscription_universal_d_Cancel as Cancel,
      billingV1Subscription_universal_d_Reschedule as Reschedule,
      billingV1Subscription_universal_d_Empty as Empty,
      billingV1Subscription_universal_d_V1SubscriptionEvent as V1SubscriptionEvent,
      billingV1Subscription_universal_d_V1SubscriptionEventEventOneOf as V1SubscriptionEventEventOneOf,
      billingV1Subscription_universal_d_V1SubscriptionCreated as V1SubscriptionCreated,
      billingV1Subscription_universal_d_V1Subscription as V1Subscription,
      billingV1Subscription_universal_d_Subscriber as Subscriber,
      billingV1Subscription_universal_d_IdentityType as IdentityType,
      billingV1Subscription_universal_d_Money as Money,
      billingV1Subscription_universal_d_SubscriptionType as SubscriptionType,
      billingV1Subscription_universal_d_V1SubscriptionStatusEnumSubscriptionStatus as V1SubscriptionStatusEnumSubscriptionStatus,
      billingV1Subscription_universal_d_PaymentStatusEnumPaymentStatus as PaymentStatusEnumPaymentStatus,
      billingV1Subscription_universal_d_V2Subscription as V2Subscription,
      billingV1Subscription_universal_d_SubscriptionFrequency as SubscriptionFrequency,
      billingV1Subscription_universal_d_SubscriptionTrialPeriod as SubscriptionTrialPeriod,
      billingV1Subscription_universal_d_CancellationInitiator as CancellationInitiator,
      billingV1Subscription_universal_d_SubscriptionPolicy as SubscriptionPolicy,
      billingV1Subscription_universal_d_Suspension as Suspension,
      billingV1Subscription_universal_d_Status as Status,
      billingV1Subscription_universal_d_V1Duration as V1Duration,
      billingV1Subscription_universal_d_V1SubscriptionActivated as V1SubscriptionActivated,
      billingV1Subscription_universal_d_V1SubscriptionCanceled as V1SubscriptionCanceled,
      billingV1Subscription_universal_d_V1SubscriptionUpdated as V1SubscriptionUpdated,
      billingV1Subscription_universal_d_SubscriptionCycleTriggered as SubscriptionCycleTriggered,
      billingV1Subscription_universal_d_SubscriptionMarkedAsPaid as SubscriptionMarkedAsPaid,
      billingV1Subscription_universal_d_SubscriptionCancellationRequested as SubscriptionCancellationRequested,
      billingV1Subscription_universal_d_SubscriptionSuspended as SubscriptionSuspended,
      billingV1Subscription_universal_d_V1SubscriptionResumed as V1SubscriptionResumed,
      billingV1Subscription_universal_d_SubscriptionExpired as SubscriptionExpired,
      billingV1Subscription_universal_d_V1SubscriptionInitialPurchaseCompleted as V1SubscriptionInitialPurchaseCompleted,
      billingV1Subscription_universal_d_CreateSubscriptionInStateRequest as CreateSubscriptionInStateRequest,
      billingV1Subscription_universal_d_CreateSubscriptionInStateRequestModeOneOf as CreateSubscriptionInStateRequestModeOneOf,
      billingV1Subscription_universal_d_CreateSubscriptionInStateResponse as CreateSubscriptionInStateResponse,
      billingV1Subscription_universal_d_PayCycleRequest as PayCycleRequest,
      billingV1Subscription_universal_d_PaymentTestMode as PaymentTestMode,
      billingV1Subscription_universal_d_PayCycleResponse as PayCycleResponse,
      billingV1Subscription_universal_d_GetFullSubscriptionDataRequest as GetFullSubscriptionDataRequest,
      billingV1Subscription_universal_d_GetFullSubscriptionDataResponse as GetFullSubscriptionDataResponse,
      billingV1Subscription_universal_d_InternalSubscriptionData as InternalSubscriptionData,
      billingV1Subscription_universal_d_MigrationDetails as MigrationDetails,
      billingV1Subscription_universal_d_PausePeriod as PausePeriod,
      billingV1Subscription_universal_d_GetSubscriptionAndInternalDataRequest as GetSubscriptionAndInternalDataRequest,
      billingV1Subscription_universal_d_GetSubscriptionAndInternalDataResponse as GetSubscriptionAndInternalDataResponse,
      billingV1Subscription_universal_d_SearchSubscriptionRequest as SearchSubscriptionRequest,
      billingV1Subscription_universal_d_SearchSubscriptionResponse as SearchSubscriptionResponse,
      billingV1Subscription_universal_d_UpdatePausePaidDurationRequest as UpdatePausePaidDurationRequest,
      billingV1Subscription_universal_d_UpdatePausePaidDurationResponse as UpdatePausePaidDurationResponse,
      billingV1Subscription_universal_d_UpdateStatusRequest as UpdateStatusRequest,
      billingV1Subscription_universal_d_UpdateStatusResponse as UpdateStatusResponse,
      billingV1Subscription_universal_d_UpdatePaymentStatusRequest as UpdatePaymentStatusRequest,
      billingV1Subscription_universal_d_UpdatePaymentStatusResponse as UpdatePaymentStatusResponse,
      billingV1Subscription_universal_d_ReviveSubscriptionRequest as ReviveSubscriptionRequest,
      billingV1Subscription_universal_d_RevivePolicy as RevivePolicy,
      billingV1Subscription_universal_d_ReviveSubscriptionResponse as ReviveSubscriptionResponse,
      billingV1Subscription_universal_d_ConvertSapiRequest as ConvertSapiRequest,
      billingV1Subscription_universal_d_ConvertSapiResponse as ConvertSapiResponse,
      billingV1Subscription_universal_d_GetSubscriptionInvoicesRequest as GetSubscriptionInvoicesRequest,
      billingV1Subscription_universal_d_GetSubscriptionInvoicesResponse as GetSubscriptionInvoicesResponse,
      billingV1Subscription_universal_d_SubscriptionInvoice as SubscriptionInvoice,
      billingV1Subscription_universal_d_FinishFreeTrialNowRequest as FinishFreeTrialNowRequest,
      billingV1Subscription_universal_d_FinishFreeTrialNowResponse as FinishFreeTrialNowResponse,
      billingV1Subscription_universal_d_SendTimeCapsuleTaskCanceledBIRequest as SendTimeCapsuleTaskCanceledBIRequest,
      billingV1Subscription_universal_d_ScheduleTimeCapsuleTaskRequest as ScheduleTimeCapsuleTaskRequest,
      billingV1Subscription_universal_d_CancelTimeCapsuleTaskRequest as CancelTimeCapsuleTaskRequest,
      billingV1Subscription_universal_d_UpdateFullSubscriptionRequest as UpdateFullSubscriptionRequest,
      billingV1Subscription_universal_d_UpdateFullSubscriptionResponse as UpdateFullSubscriptionResponse,
      billingV1Subscription_universal_d_UpdateSubscriptionInvoiceCycleRequest as UpdateSubscriptionInvoiceCycleRequest,
      billingV1Subscription_universal_d_UpdateSubscriptionInvoiceCycleResponse as UpdateSubscriptionInvoiceCycleResponse,
      billingV1Subscription_universal_d_AddPausePeriodRequest as AddPausePeriodRequest,
      billingV1Subscription_universal_d_AddPausePeriodResponse as AddPausePeriodResponse,
      billingV1Subscription_universal_d_RunTimeCapsuleTaskNowRequest as RunTimeCapsuleTaskNowRequest,
      billingV1Subscription_universal_d_CreateRecurringInvoiceBORequest as CreateRecurringInvoiceBORequest,
      billingV1Subscription_universal_d_CreateRecurringInvoiceBOResponse as CreateRecurringInvoiceBOResponse,
      billingV1Subscription_universal_d_SetShiftingDataRequest as SetShiftingDataRequest,
      billingV1Subscription_universal_d_SetShiftingDataResponse as SetShiftingDataResponse,
      billingV1Subscription_universal_d_FixSubscriptionInvoicesRequest as FixSubscriptionInvoicesRequest,
      billingV1Subscription_universal_d_FixSubscriptionInvoicesRequestModeOneOf as FixSubscriptionInvoicesRequestModeOneOf,
      billingV1Subscription_universal_d_AttachInvoice as AttachInvoice,
      billingV1Subscription_universal_d_DetachInvoice as DetachInvoice,
      billingV1Subscription_universal_d_FixSubscriptionInvoicesResponse as FixSubscriptionInvoicesResponse,
      billingV1Subscription_universal_d_RestoreDraftSubscriptionRequest as RestoreDraftSubscriptionRequest,
      billingV1Subscription_universal_d_RestoreDraftSubscriptionResponse as RestoreDraftSubscriptionResponse,
      billingV1Subscription_universal_d_DeleteDraftSubscriptionRequest as DeleteDraftSubscriptionRequest,
      billingV1Subscription_universal_d_DeleteDraftSubscriptionResponse as DeleteDraftSubscriptionResponse,
      billingV1Subscription_universal_d_DeleteSubscriptionBORequest as DeleteSubscriptionBORequest,
      billingV1Subscription_universal_d_DeleteSubscriptionBOResponse as DeleteSubscriptionBOResponse,
      billingV1Subscription_universal_d_CancelSubscriptionBORequest as CancelSubscriptionBORequest,
      billingV1Subscription_universal_d_CancelSubscriptionBOResponse as CancelSubscriptionBOResponse,
      billingV1Subscription_universal_d_UpdatePaymentMethodBORequest as UpdatePaymentMethodBORequest,
      billingV1Subscription_universal_d_UpdatePaymentMethodBOResponse as UpdatePaymentMethodBOResponse,
      billingV1Subscription_universal_d_SendSubscriptionActionEventBORequest as SendSubscriptionActionEventBORequest,
      billingV1Subscription_universal_d_SendSubscriptionActionEventBORequestEventOneOf as SendSubscriptionActionEventBORequestEventOneOf,
      billingV1Subscription_universal_d_SendSubscriptionActionEventResponse as SendSubscriptionActionEventResponse,
      billingV1Subscription_universal_d_HandleSubscriptionAfterInvoiceMarkedAsPaidRequest as HandleSubscriptionAfterInvoiceMarkedAsPaidRequest,
      billingV1Subscription_universal_d_listSubscriptionHistory as listSubscriptionHistory,
      billingV1Subscription_universal_d_ListSubscriptionHistoryOptions as ListSubscriptionHistoryOptions,
      billingV1Subscription_universal_d_customerGetSubscription as customerGetSubscription,
      billingV1Subscription_universal_d_customerCancelSubscription as customerCancelSubscription,
      billingV1Subscription_universal_d_CustomerCancelSubscriptionOptions as CustomerCancelSubscriptionOptions,
      billingV1Subscription_universal_d_customerTurnOnSubscriptionAutoRenewal as customerTurnOnSubscriptionAutoRenewal,
      billingV1Subscription_universal_d_CustomerTurnOnSubscriptionAutoRenewalOptions as CustomerTurnOnSubscriptionAutoRenewalOptions,
      billingV1Subscription_universal_d_customerTurnOffSubscriptionAutoRenewal as customerTurnOffSubscriptionAutoRenewal,
      billingV1Subscription_universal_d_CustomerTurnOffSubscriptionAutoRenewalOptions as CustomerTurnOffSubscriptionAutoRenewalOptions,
      billingV1Subscription_universal_d_customerExtendSubscription as customerExtendSubscription,
      billingV1Subscription_universal_d_CustomerExtendSubscriptionOptions as CustomerExtendSubscriptionOptions,
      billingV1Subscription_universal_d_customerQuerySubscriptions as customerQuerySubscriptions,
      billingV1Subscription_universal_d_CustomerQuerySubscriptionsOptions as CustomerQuerySubscriptionsOptions,
      billingV1Subscription_universal_d_customerCountSubscriptions as customerCountSubscriptions,
      billingV1Subscription_universal_d_CustomerCountSubscriptionsOptions as CustomerCountSubscriptionsOptions,
      billingV1Subscription_universal_d_customerUpdateSubscriptionPaymentMethod as customerUpdateSubscriptionPaymentMethod,
      billingV1Subscription_universal_d_customerAllowedActions as customerAllowedActions,
      billingV1Subscription_universal_d_customerListUpcomingCharges as customerListUpcomingCharges,
      billingV1Subscription_universal_d_customerInitiatePaymentMethodSetup as customerInitiatePaymentMethodSetup,
      billingV1Subscription_universal_d_CustomerInitiatePaymentMethodSetupOptions as CustomerInitiatePaymentMethodSetupOptions,
      billingV1Subscription_universal_d_createSubscription as createSubscription,
      billingV1Subscription_universal_d_CreateSubscriptionOptions as CreateSubscriptionOptions,
      billingV1Subscription_universal_d_getSubscription as getSubscription,
      billingV1Subscription_universal_d_updateSubscription as updateSubscription,
      billingV1Subscription_universal_d_UpdateSubscriptionOptions as UpdateSubscriptionOptions,
      billingV1Subscription_universal_d_updateSubscriptionStartDate as updateSubscriptionStartDate,
      billingV1Subscription_universal_d_updateSubscriptionPaymentMethod as updateSubscriptionPaymentMethod,
      billingV1Subscription_universal_d_updateSubscriptionPolicies as updateSubscriptionPolicies,
      billingV1Subscription_universal_d_UpdateSubscriptionPoliciesOptions as UpdateSubscriptionPoliciesOptions,
      billingV1Subscription_universal_d_updateSubscriptionBillingDate as updateSubscriptionBillingDate,
      billingV1Subscription_universal_d_UpdateSubscriptionBillingDateOptions as UpdateSubscriptionBillingDateOptions,
      billingV1Subscription_universal_d_updateSubscriptionOrigin as updateSubscriptionOrigin,
      billingV1Subscription_universal_d_reviseSubscription as reviseSubscription,
      billingV1Subscription_universal_d_ReviseSubscriptionOptions as ReviseSubscriptionOptions,
      billingV1Subscription_universal_d_updateSubscriptionItems as updateSubscriptionItems,
      billingV1Subscription_universal_d_UpdateSubscriptionItemsOptions as UpdateSubscriptionItemsOptions,
      billingV1Subscription_universal_d_bulkUpdateSubscriptionItemsByFilter as bulkUpdateSubscriptionItemsByFilter,
      billingV1Subscription_universal_d_BulkUpdateSubscriptionItemsByFilterOptions as BulkUpdateSubscriptionItemsByFilterOptions,
      billingV1Subscription_universal_d_deleteSubscription as deleteSubscription,
      billingV1Subscription_universal_d_DeleteSubscriptionOptions as DeleteSubscriptionOptions,
      billingV1Subscription_universal_d_cancelSubscription as cancelSubscription,
      billingV1Subscription_universal_d_pauseSubscription as pauseSubscription,
      billingV1Subscription_universal_d_PauseSubscriptionOptions as PauseSubscriptionOptions,
      billingV1Subscription_universal_d_resumeSubscription as resumeSubscription,
      billingV1Subscription_universal_d_ResumeSubscriptionOptions as ResumeSubscriptionOptions,
      billingV1Subscription_universal_d_querySubscriptions as querySubscriptions,
      billingV1Subscription_universal_d_searchSubscriptions as searchSubscriptions,
      billingV1Subscription_universal_d_SearchSubscriptionsOptions as SearchSubscriptionsOptions,
      billingV1Subscription_universal_d_countSubscriptions as countSubscriptions,
      billingV1Subscription_universal_d_CountSubscriptionsOptions as CountSubscriptionsOptions,
      billingV1Subscription_universal_d_turnOnSubscriptionAutoRenewal as turnOnSubscriptionAutoRenewal,
      billingV1Subscription_universal_d_turnOffSubscriptionAutoRenewal as turnOffSubscriptionAutoRenewal,
      billingV1Subscription_universal_d_markLatestInvoiceAsPaid as markLatestInvoiceAsPaid,
      billingV1Subscription_universal_d_getSubscriptionsStats as getSubscriptionsStats,
      billingV1Subscription_universal_d_extendSubscription as extendSubscription,
      billingV1Subscription_universal_d_ExtendSubscriptionOptions as ExtendSubscriptionOptions,
      billingV1Subscription_universal_d_allowedActions as allowedActions,
      billingV1Subscription_universal_d_AllowedActionsOptions as AllowedActionsOptions,
      billingV1Subscription_universal_d_listUpcomingCharges as listUpcomingCharges,
      billingV1Subscription_universal_d_ListUpcomingChargesOptions as ListUpcomingChargesOptions,
      billingV1Subscription_universal_d_previewSubscriptionCharges as previewSubscriptionCharges,
      billingV1Subscription_universal_d_PreviewSubscriptionChargesOptions as PreviewSubscriptionChargesOptions,
      billingV1Subscription_universal_d_previewSubscriptionsCharges as previewSubscriptionsCharges,
      billingV1Subscription_universal_d_PreviewSubscriptionsChargesOptions as PreviewSubscriptionsChargesOptions,
      billingV1Subscription_universal_d_initiatePaymentMethodSetup as initiatePaymentMethodSetup,
      billingV1Subscription_universal_d_InitiatePaymentMethodSetupOptions as InitiatePaymentMethodSetupOptions,
      billingV1Subscription_universal_d_payCycle as payCycle,
      billingV1Subscription_universal_d_PayCycleOptions as PayCycleOptions,
      billingV1Subscription_universal_d_runTimeCapsuleTaskNow as runTimeCapsuleTaskNow,
      billingV1Subscription_universal_d_RunTimeCapsuleTaskNowOptions as RunTimeCapsuleTaskNowOptions,
    };
  }
  
  export { billingV1Subscription_universal_d as subscriptions };
}
