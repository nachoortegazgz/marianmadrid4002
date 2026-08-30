declare module "wix-pricing-plans.v2" {
    /**
     * An order object includes all of the details related to the purchase of a Pricing Plan.
     * You can manage existing orders, create offline orders, and preview orders not yet purchased.
     *
     * Orders are based on pricing models based on the payment and duration cycles for each plan.
     * Learn more about pricing models ([REST](https://dev.wix.com/api/rest/wix-pricing-plans/pricing-plans/introduction#wix-pricing-plans_pricing-plans_introduction_pricing-models)|[SDK](https://dev.wix.com/docs/sdk/backend-modules/pricing-plans/introduction#pricing-models)).
     */
    interface Order {
        /**
         * Order ID.
         * @readonly
         */
        _id?: string;
        /**
         * ID of the plan purchased with the order, from the Plans API.
         * @readonly
         */
        planId?: string;
        /**
         * ID of the related Wix subscription.
         *
         * Every pricing plan order corresponds to a Wix subscription, including orders for single payment plans. Learn more in
         * a [Pricing Plans overview](https://support.wix.com/en/article/pricing-plans-an-overview#create-plans-to-suit-your-business).
         * @readonly
         */
        subscriptionId?: string;
        /**
         * Wix Pay order ID.
         *
         * Provided by Wix whether the order is created online or offline. The field is omitted when the order is free.
         * @readonly
         */
        wixPayOrderId?: string | null;
        /**
         * The buyer's IDs. Includes `memberId` and `contactId`.
         *
         * Currently, Pricing Plan purchases are limited to members only. `contactId` is returned,
         * but a buyer will not be able to purchase a plan without a `memberId`.
         * @readonly
         */
        buyer?: Buyer;
        /**
         * Order pricing model, price, and payment schedule.
         *
         * Learn more about pricing models ([REST](https://dev.wix.com/api/rest/wix-pricing-plans/pricing-plans/introduction#wix-pricing-plans_pricing-plans_introduction_pricing-models) | [SDK](https://dev.wix.com/docs/sdk/backend-modules/pricing-plans/introduction#pricing-models)).
         * @readonly
         */
        pricing?: PricingDetails;
        /**
         * How the order was processed.
         * @readonly
         */
        type?: OrderType;
        /**
         * Status of the order.
         * @readonly
         */
        status?: OrderStatus;
        /**
         * Whether the order will be canceled at the next payment date.
         *
         * If `true`, the order status will be `CANCELED` and the next payment won't be charged. Omitted for single payment orders.
         * @readonly
         */
        autoRenewCanceled?: boolean | null;
        /**
         * Details about the cancellation of an order.
         *
         * Only present if the status is `CANCELED`.
         * @readonly
         */
        cancellation?: Cancellation;
        /**
         * Status of the last payment for the order.
         * Updated automatically for online orders. Updated manually by the Wix user for offline orders.
         * @readonly
         */
        lastPaymentStatus?: PaymentStatus;
        /**
         * Start date and time for the ordered plan.
         * @readonly
         */
        startDate?: Date | null;
        /**
         * Current end date and time for the ordered plan.
         *
         * `endDate` may be updated over the course of an order.
         * If the order is paused, it will have a later `endDate` once it is resumed.
         * `endDate` may also be postponed.
         *
         * Omitted if the order is valid until canceled and still `ACTIVE`.
         * @readonly
         */
        endDate?: Date | null;
        /**
         * List of periods during which the order is paused.
         * @readonly
         */
        pausePeriods?: PausePeriod[];
        /**
         * Free trial period for the order, in days.
         *
         * Only available for recurring plans.
         * @readonly
         */
        freeTrialDays?: number | null;
        /**
         * Earliest end date and time that the plan for the order can expire.
         *
         * Calculated by using the original end date plus any pause periods. Omitted if the order is active until canceled. Reserved for future use.
         * @readonly
         */
        earliestEndDate?: Date | null;
        /**
         * Current payment cycle for the order.
         *
         * `currentCycle` will be omitted if the order's status is `CANCELED` or `ENDED`, or if the `startDate` hasn't passed yet.
         * @readonly
         */
        currentCycle?: CurrentCycle;
        /**
         * Plan name at the time of purchase.
         * @readonly
         */
        planName?: string;
        /**
         * Plan description at the time of purchase
         * @readonly
         */
        planDescription?: string;
        /**
         * Plan price as it was at the moment of order creation.
         * @readonly
         */
        planPrice?: string;
        /**
         * Date and time the order was created.
         * @readonly
         */
        _createdDate?: Date | null;
        /**
         * Date and time the order was updated.
         * @readonly
         */
        _updatedDate?: Date | null;
        /**
         * Information about the form submitted during the plan's checkout.
         * @readonly
         */
        formData?: FormData;
    }
    interface Buyer {
        /**
         * Member ID for a Wix site member, from the Members API.
         * @readonly
         */
        memberId?: string;
        /**
         * Contact ID for a Wix site contact, from the Contacts API.
         * @readonly
         */
        contactId?: string;
    }
    interface PriceDetails extends PriceDetailsPricingModelOneOf {
        /** Order has recurring payments. */
        subscription?: Recurrence$1;
        /** One-time payment. Order is valid for a specified duration. */
        singlePaymentForDuration?: Duration$1;
        /** One-time payment. Order is valid until it is canceled. */
        singlePaymentUnlimited?: boolean | null;
        /** Price of the order excluding tax, specified as a monetary amount. for example, `"9.99"`. */
        subtotal?: string;
        /** Total discount applied. */
        discount?: string;
        /** Tax applied. */
        tax?: Tax;
        /**
         * Price after tax and discount is applied, specified as a monetary amount. For example, `"13.98"`.
         *
         * If no tax is applied, the amount is the same as `subtotal`.
         */
        total?: string;
        /** Plan price as it was at the moment of order creation. */
        planPrice?: string;
        /** Currency code. Must be valid ISO 4217 currency code (e.g., USD). */
        currency?: string;
        /** Free trial period for the order in days. Only available for recurring plans. */
        freeTrialDays?: number | null;
        /** Coupon applied to the order. Empty means no coupon was applied. */
        coupon?: Coupon;
    }
    /** @oneof */
    interface PriceDetailsPricingModelOneOf {
        /** Order has recurring payments. */
        subscription?: Recurrence$1;
        /** One-time payment. Order is valid for a specified duration. */
        singlePaymentForDuration?: Duration$1;
        /** One-time payment. Order is valid until it is canceled. */
        singlePaymentUnlimited?: boolean | null;
    }
    interface Tax {
        /** Name of the tax. For example, VAT. */
        name?: string;
        /** Whether tax is included in the original price. When `false`, tax is added at checkout. */
        includedInPrice?: boolean;
        /** Tax rate percentage, as a number between 0 and 100. For example, a 7% tax rate is `"7.00"`. */
        rate?: string;
        /** Total tax, specified as a monetary amount. For example, `"3.99"`. */
        amount?: string;
    }
    /** An object specifying how often and for how long payments recur (may be forever). */
    interface Recurrence$1 {
        /**
         * Number of payment cycles the subscription is valid for.
         * `0` for unlimited plans or for plans that are valid until canceled.
         */
        cycleDuration?: Duration$1;
        /**
         * Length of a payment cycle. For example, 1 month to have monthly payments.
         * Multiply `cycleDuration`'s `count` by `cycleCount` to get the subscription duration.
         * Currently, only a value of `1` is supported.
         */
        cycleCount?: number | null;
    }
    /** A duration expressed in number of time units. */
    interface Duration$1 {
        /** Number of days, months, weeks, or years in a single payment cycle. Currently limited to support only `1`. */
        count?: number | null;
        /** Unit of time for the cycle duration. */
        unit?: PeriodUnit$1;
    }
    enum PeriodUnit$1 {
        /** Not defined. */
        UNDEFINED = "UNDEFINED",
        /** Time unit is a day. */
        DAY = "DAY",
        /** Time unit is a week. */
        WEEK = "WEEK",
        /** Time unit is a month. */
        MONTH = "MONTH",
        /** Time unit is a year. */
        YEAR = "YEAR"
    }
    interface Coupon {
        /** Code of the applied coupon. */
        code?: string;
        /** Total discount of the coupon, as a monetary amount. */
        amount?: string;
        /**
         * Coupon ID.
         * @readonly
         */
        _id?: string;
    }
    interface PricingDetails extends PricingDetailsPricingModelOneOf {
        /** Pricing model for an order with recurring payment cycles. */
        subscription?: Recurrence$1;
        /** Pricing model for an order with a one-time payment and the order is valid for a specific amount of time. */
        singlePaymentForDuration?: Duration$1;
        /** Pricing model for an order with a one-time payment and the order is valid until canceled. */
        singlePaymentUnlimited?: boolean | null;
        /**
         * Pricing details for all pricing models.
         * @readonly
         */
        prices?: SpannedPrice[];
    }
    /** @oneof */
    interface PricingDetailsPricingModelOneOf {
        /** Pricing model for an order with recurring payment cycles. */
        subscription?: Recurrence$1;
        /** Pricing model for an order with a one-time payment and the order is valid for a specific amount of time. */
        singlePaymentForDuration?: Duration$1;
        /** Pricing model for an order with a one-time payment and the order is valid until canceled. */
        singlePaymentUnlimited?: boolean | null;
    }
    interface SpannedPrice {
        /**
         * Cycle duration to apply `price` for.
         *
         * Use with all pricing models.
         * Can apply the same price to multiple payment cycles.
         */
        duration?: PriceDuration;
        /** Order price. */
        price?: Price;
    }
    interface PriceDuration {
        /**
         * Price starts to apply with this cycle.
         *
         * `1` is the first payment cycle for all pricing models.
         */
        cycleFrom?: number;
        /**
         * Amount of cycles to apply price for.
         *
         * For `subscription` pricing models with a finite number of cycles, the `numberOfCycles` is the same as `pricing.subscription.cycleCount`.
         *
         * For `subscription` pricing models that are unlimited or until-canceled, the `numberOfCycles` is not returned.
         *
         * For `singlePaymentForDuration` and `singlePaymentUnlimited` pricing models, the `numberOfCycles` is `1`.
         */
        numberOfCycles?: number | null;
    }
    interface Price {
        /** Price of the order excluding tax, specified as a monetary amount. For example, `"9.99"`. */
        subtotal?: string;
        /** Coupon applied to the order, from the Coupons API. */
        coupon?: Coupon;
        /** Total discount applied to the order. */
        discount?: string;
        /**
         * Tax applied to the order.
         *
         * Tax is only applied if the site [has it configured](https://support.wix.com/en/article/pricing-plans-setting-up-tax-collection).
         */
        tax?: Tax;
        /**
         * Price after tax and discount is applied. Specified as a monetary amount, for example, `"13.98"`.
         *
         * If no tax is applied, the amount is the same as `subtotal`.
         */
        total?: string;
        /**
         * Three-letter currency code in
         * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
         */
        currency?: string;
        /** Price change after billing date was change and price was adjusted. Could be positive and negative values. */
        proration?: string;
    }
    interface Fee$1 {
        /** Fee name */
        name?: string;
        /** Amount of fee to be charged */
        amount?: string;
    }
    enum OrderType {
        /** Undefined order type. */
        UNDEFINED = "UNDEFINED",
        /** The buyer purchased the plan using the site. */
        ONLINE = "ONLINE",
        /** The buyer made a manual, offline purchase without using the site. */
        OFFLINE = "OFFLINE",
        /** The buyer made a purchase through an external payment provider. */
        EXTERNAL = "EXTERNAL"
    }
    enum OrderMethod {
        /** Unknown order method. */
        UNKNOWN = "UNKNOWN",
        /** Mail Order / Telephone Order transaction. */
        MOTO = "MOTO",
        /** Point of Sale transaction. */
        POS = "POS"
    }
    enum OrderStatus {
        /** Undefined order status. */
        UNDEFINED = "UNDEFINED",
        /** Order has been initiated but payment hasn't been processed yet. The plan isn't yet available for use to the buyer. */
        DRAFT = "DRAFT",
        /** Order has been purchased and its start date is set in the future. */
        PENDING = "PENDING",
        /** Order has been processed. The plan is available for use. */
        ACTIVE = "ACTIVE",
        /** Order, and use of the plan, is paused. The order, and use of the plan, can be resumed. */
        PAUSED = "PAUSED",
        /** Order has completed its duration and is no longer available for use. */
        ENDED = "ENDED",
        /** Order has been canceled. */
        CANCELED = "CANCELED"
    }
    interface Cancellation {
        /** Date and time the cancellation was requested. */
        requestedDate?: Date | null;
        /** Reason for the cancellation. */
        cause?: CancellationCause;
        /** When the cancellation takes effect. Set when cancelling the order. */
        effectiveAt?: CancellationEffectiveAt;
    }
    enum CancellationCause {
        /** Undefined cancellation cause. */
        UNDEFINED = "UNDEFINED",
        /** Wix user canceled the order. */
        OWNER_ACTION = "OWNER_ACTION",
        /** Buyer initiated the cancellation. */
        MEMBER_ACTION = "MEMBER_ACTION",
        /** Payment transaction failed. */
        PAYMENT_FAILURE = "PAYMENT_FAILURE",
        /** Buyer's payment details weren't set up correctly. */
        PAYMENT_SETUP_FAILURE = "PAYMENT_SETUP_FAILURE",
        /** Reason for the cancellation is unknown. */
        UNKNOWN = "UNKNOWN"
    }
    enum CancellationEffectiveAt {
        /** Undefined cancellation time. */
        UNDEFINED = "UNDEFINED",
        /** Cancellation occurs immediately and the buyer can no longer use the plan. */
        IMMEDIATELY = "IMMEDIATELY",
        /** Cancellation occurs at the next payment date and time. Buyer can continue to use the plan until that date and time. */
        NEXT_PAYMENT_DATE = "NEXT_PAYMENT_DATE"
    }
    enum PaymentStatus {
        /** Undefined payment status. */
        UNDEFINED = "UNDEFINED",
        /** Payment has been paid. */
        PAID = "PAID",
        /** Payment has been refunded. */
        REFUNDED = "REFUNDED",
        /** Payment transaction didn't complete. */
        FAILED = "FAILED",
        /** Payment has not been paid. */
        UNPAID = "UNPAID",
        /** Billing has been initialized, but actual charge is yet to be made. This can happen for free trials and payments made with PayPal. */
        PENDING = "PENDING",
        /** No payment was necessary. For example, for free plans or free trials. */
        NOT_APPLICABLE = "NOT_APPLICABLE"
    }
    interface PausePeriod {
        /** Status of the pause period. */
        status?: Status;
        /** Start date and time of the pause period. */
        pauseDate?: Date | null;
        /**
         * End date and time of the pause period.
         *
         * Omitted while the pause period remains `ACTIVE`.
         */
        resumeDate?: Date | null;
    }
    enum Status {
        /** Undefined status. */
        UNDEFINED = "UNDEFINED",
        /** Status while the order is paused. */
        ACTIVE = "ACTIVE",
        /** Status when the order is resumed. */
        ENDED = "ENDED"
    }
    /**
     * Current cycle will be empty when order is cancelled, expired or order start date is in the future
     * Current cycle start and end dates take into account free trial days and suspensions
     */
    interface CurrentCycle {
        /**
         * Index of the current payment cycle in the order.
         *
         * `0` when order is in a free trial period. In all other cases, the index starts with `1`.
         */
        index?: number;
        /** Start date and time for the current payment cycle. */
        startedDate?: Date | null;
        /** End date and time for the current payment cycle. */
        endedDate?: Date | null;
    }
    /** Order cycle start and end dates take into account free trial days and suspensions */
    interface OrderCycle {
        /**
         * Index of this cycle in the order.
         *
         * `0` when order is in a free trial period. In all other cases, the index starts with `1`.
         */
        index?: number;
        /** Start date and time for this order cycle. */
        startedDate?: Date | null;
        /** End date and time for this order cycle. */
        endedDate?: Date | null;
    }
    interface FormData {
        /** ID of the order form ([REST](https://dev.wix.com/docs/rest/api-reference/wix-forms/form-submissions/introduction)|[SDK](https://dev.wix.com/docs/sdk/backend-modules/forms/submissions/introduction)) associated with the plan at checkout. */
        formId?: string | null;
        /** ID of a submission to the plan's order form at checkout. Every time a visitor completes the checkout process for a plan, a new submission is created. */
        submissionId?: string | null;
        /**
         * Data submitted to the plan's order form at checkout.
         * @readonly
         */
        submissionData?: Record<string, any>;
    }
    interface DomainEvent$1 extends DomainEventBodyOneOf$1 {
        createdEvent?: EntityCreatedEvent$1;
        updatedEvent?: EntityUpdatedEvent$1;
        deletedEvent?: EntityDeletedEvent$1;
        actionEvent?: ActionEvent$1;
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
    interface DomainEventBodyOneOf$1 {
        createdEvent?: EntityCreatedEvent$1;
        updatedEvent?: EntityUpdatedEvent$1;
        deletedEvent?: EntityDeletedEvent$1;
        actionEvent?: ActionEvent$1;
    }
    interface EntityCreatedEvent$1 {
        entityAsJson?: string;
        /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
        restoreInfo?: RestoreInfo$1;
    }
    interface RestoreInfo$1 {
        deletedDate?: Date | null;
    }
    interface EntityUpdatedEvent$1 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$1 {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent$1 {
        bodyAsJson?: string;
    }
    interface Empty {
    }
    interface MemberGetOrderRequest {
        /** Order ID. */
        _id: string;
        /**
         * Predefined set of fields to return.
         *
         * Default: If `fieldSet` is omitted, no order form submission data is returned.
         */
        fieldSet?: Set;
    }
    enum Set {
        /** Same behavior as `BASIC`.` */
        UNKNOWN_SET = "UNKNOWN_SET",
        /** Doesn't return any order form submission data. */
        BASIC = "BASIC",
        /** Returns all order form submission data. */
        FULL = "FULL"
    }
    interface MemberGetOrderResponse {
        /** Requested order. */
        order?: Order;
    }
    interface MemberListOrdersRequest {
        /** Filter by plan IDs. */
        planIds?: string[];
        /** Filter for orders where auto renewal was canceled. */
        autoRenewCanceled?: boolean | null;
        /** Filter by order status. */
        orderStatuses?: OrderStatus[];
        /** Filter by payment status. */
        paymentStatuses?: PaymentStatus[];
        /** Limit the number of pricing plans returned. Default limit is 50. */
        limit?: number | null;
        /** Number of entries to offset. */
        offset?: number | null;
        /** Sorting direction (defaults to ASC) and field to sort by. */
        sorting?: Sorting$1;
        /**
         * Predefined set of fields to return.
         *
         * Default: If `fieldSet` is omitted, no order form submission data is returned.
         */
        fieldSet?: Set;
    }
    interface Sorting$1 {
        /** Name of the field to sort by. */
        fieldName?: string;
        /** Sort order. */
        order?: SortOrder$1;
    }
    enum SortOrder$1 {
        ASC = "ASC",
        DESC = "DESC"
    }
    interface MemberListOrdersResponse {
        /** Requested orders. */
        orders?: Order[];
        /** Object containing paging-related data (number of orders returned, offset). */
        pagingMetadata?: PagingMetadataV2$1;
    }
    interface PagingMetadataV2$1 {
        /** Number of items returned in the response. */
        count?: number | null;
        /** Offset that was requested. */
        offset?: number | null;
        /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
        total?: number | null;
        /** Flag that indicates the server failed to calculate the `total` field. */
        tooManyToCount?: boolean | null;
        /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
        cursors?: Cursors$1;
    }
    interface Cursors$1 {
        /** Cursor string pointing to the next page in the list of results. */
        next?: string | null;
        /** Cursor pointing to the previous page in the list of results. */
        prev?: string | null;
    }
    /**
     * TODO: Write orders filter and sort docs page
     * Retrieves a list of up to 1,000 orders, based on the provided paging, sorting, and filtering.
     */
    interface QueryOrdersRequest {
        /** Query filter. */
        query?: QueryV2$1;
    }
    interface QueryV2$1 extends QueryV2PagingMethodOneOf {
        /** Paging options to limit and skip the number of items. */
        paging?: Paging$1;
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
        sort?: Sorting$1[];
        /** Array of projected fields. A list of specific field names to return. If `fieldsets` are also specified, the union of `fieldsets` and `fields` is returned. */
        fields?: string[];
        /** Array of named, predefined sets of projected fields. A array of predefined named sets of fields to be returned. Specifying multiple `fieldsets` will return the union of fields from all sets. If `fields` are also specified, the union of `fieldsets` and `fields` is returned. */
        fieldsets?: string[];
    }
    /** @oneof */
    interface QueryV2PagingMethodOneOf {
        /** Paging options to limit and skip the number of items. */
        paging?: Paging$1;
        /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
        cursorPaging?: CursorPaging;
    }
    interface Paging$1 {
        /** Number of items to load. */
        limit?: number | null;
        /** Number of items to skip in the current sort order. */
        offset?: number | null;
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
    interface QueryOrdersResponse {
        /** Order data. */
        plans?: Order[];
        /** Paging-related data (number of orders returned, offset). */
        pagingMetadata?: PagingMetadataV2$1;
    }
    interface RequestCancellationRequest {
        /** Order ID. */
        _id: string;
        /** Required. Whether to cancel the order effective immediately or at the next payment date. One-time orders can only be canceled immediately. */
        effectiveAt: CancellationEffectiveAt;
    }
    interface RequestCancellationResponse {
    }
    /**
     * Emitted when an order is canceled immediately or when cycle ends for an order with canceled auto renewal
     *
     * To determine the specific reason of the cancellation check `order.cancellation.cause` field.
     */
    interface OrderCanceled {
        /** Canceled order. */
        order?: Order;
    }
    interface MessageEnvelope$1 {
        /** App instance ID. */
        instanceId?: string | null;
        /** Event type. */
        eventType?: string;
        /** The identification type and identity data. */
        identity?: IdentificationData$1;
        /** Stringify payload. */
        data?: string;
    }
    interface IdentificationData$1 extends IdentificationDataIdOneOf$1 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
        /** @readonly */
        identityType?: WebhookIdentityType$1;
    }
    /** @oneof */
    interface IdentificationDataIdOneOf$1 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
    }
    enum WebhookIdentityType$1 {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    interface CreateOnlineOrderRequest {
        /** Plan ID. */
        planId: string;
        /**
         * Start date and time for the plan of the online order in a `YYYY-MM-DDThh:mm[:ss][.sss]Z` format.
         *
         * Default: Current date and time.
         */
        startDate?: Date | null;
        /** Coupon code to apply. */
        couponCode?: string | null;
        /** Provided if checkout is initiated on buyer's behalf. */
        onBehalf?: OnBehalf;
        /** Submission ID of the form submitted with this order. */
        submissionId?: string | null;
    }
    interface OnBehalf {
        /** Member ID. */
        memberId?: string;
        /** Method by which checkout is initiated. */
        orderMethod?: OrderMethod;
    }
    interface CreateOnlineOrderResponse {
        /** Created online order. */
        order?: Order;
    }
    interface CouponsError {
        /** Coupon code. */
        couponCode?: string;
        /** Plan ID. */
        planId?: string;
    }
    interface CreateGuestOnlineOrderRequest {
        /** Plan ID. */
        planId: string;
        /**
         * Start date for the ordered plan.
         *
         * Default: Current date
         */
        startDate?: Date | null;
        /** Coupon code to apply. */
        couponCode?: string | null;
        /** Captcha data to prove you are not a robot */
        captcha: Captcha;
        /** Visitor info */
        guest: Guest;
        /** Form submission id that was submitted together with the order */
        submissionId?: string | null;
    }
    interface Captcha {
        /** Token from captcha */
        token?: string;
    }
    interface Guest {
        /** Email for checkout */
        email?: string;
    }
    interface CreateGuestOnlineOrderResponse {
        /** Order. */
        order?: Order;
    }
    interface CreateOfflineOrderRequest {
        /** ID of the plan being ordered, from the Plans API. */
        planId: string;
        /** ID of the member ordering the plan, from the Members API. */
        memberId: string;
        /**
         * Start date and time for the ordered plan in a `YYYY-MM-DDThh:mm[:ss][.sss]Z` format.
         *
         * Default: Current date and time.
         */
        startDate?: Date | null;
        /**
         * Whether the order is paid.
         *
         * Default: `false`
         */
        paid?: boolean | null;
        /** Coupon code to apply, from the Coupons API. */
        couponCode?: string | null;
        /** Form submission ID that was submitted with the order. */
        submissionId?: string | null;
    }
    interface CreateOfflineOrderResponse {
        /** Order. */
        order?: Order;
    }
    interface CreateExternalOrderRequest {
        /** Plan ID. */
        planId: string;
        /** Form submission id that was submitted together with the order */
        submissionId?: string | null;
    }
    interface CreateExternalOrderResponse {
        /** Created order */
        order?: Order;
    }
    interface GetOnlineOrderPreviewRequest {
        /** Plan ID. */
        planId: string;
        /**
         * Start date and time for the plan of the order preview in a `YYYY-MM-DDThh:mm[:ss][.sss]Z` format.
         *
         * Default: Current date and time.
         */
        startDate?: Date | null;
        /** Coupon code to apply. */
        couponCode?: string | null;
    }
    interface GetOnlineOrderPreviewResponse {
        /** Order preview. This field is undefined if the member has already reached the purchase limit for the order's plan. */
        order?: Order;
        /** Whether the member has already reached purchase limit for the order's plan. */
        purchaseLimitExceeded?: boolean;
    }
    interface GetGuestOnlineOrderPreviewRequest {
        /** Plan ID. */
        planId: string;
        /**
         * Start date for the ordered plan.
         *
         * Default: Current date
         */
        startDate?: Date | null;
        /** Coupon code to apply. */
        couponCode?: string | null;
        /** Email for checkout */
        email: string;
    }
    interface GetGuestOnlineOrderPreviewResponse {
        /** Will be missing if limit is exceeded */
        order?: Order;
        /**
         * Whether the purchase limit has already been reached for this plan by this email.
         * Always false for plans without purchase limits.
         */
        purchaseLimitExceeded?: boolean;
    }
    interface GetOfflineOrderPreviewRequest {
        /** ID of the plan of the previewed order, from the Plans API. */
        planId: string;
        /** Member ID of the buyer the previewed order is for, from the Members API. */
        memberId: string;
        /**
         * Start date and time for plan of the previewed order in a `YYYY-MM-DDThh:mm[:ss][.sss]Z` format.
         *
         * Default: Current date and time.
         */
        startDate?: Date | null;
        /** Coupon code to apply, from the Coupons API. */
        couponCode?: string | null;
    }
    interface GetOfflineOrderPreviewResponse {
        /** The previewed order, as if the plan had been ordered. */
        order?: Order;
        /**
         * Whether this previewed order would exceed the permitted amount of purchases available
         * for this plan for this buyer.
         *
         * Always `false` for plans that do not have purchase limits.
         */
        purchaseLimitExceeded?: boolean;
    }
    interface GetPricePreviewRequest {
        /** ID of plan to preview. */
        planId: string;
        /** Coupon code to apply, from the Coupons API. */
        couponCode?: string | null;
    }
    interface GetPricePreviewResponse {
        /** Pricing details. */
        prices?: SpannedPrice[];
    }
    interface ChangeStartDateRequest {
        /** Draft order ID. */
        orderId: string;
        /** New valid from date (timestamp). */
        startDate: Date | null;
    }
    interface ChangeStartDateResponse {
        /** Updated draft order. */
        order?: Order;
    }
    interface OrderStartDateChanged {
        /** Order whose `startDate` changed. */
        order?: Order;
    }
    interface ApplyCouponRequest {
        /** Draft order ID. */
        orderId: string;
        /** Coupon code to apply. */
        couponCode: string;
    }
    interface ApplyCouponResponse {
        /** Order with applied coupon and recalculated tax. */
        order?: Order;
    }
    interface SetSubmissionRequest {
        /** Order ID. */
        orderId: string;
        /** Submission ID. */
        submissionId: string;
    }
    interface SetSubmissionResponse {
        /** Order with submission id */
        order?: Order;
    }
    interface OrderPurchased {
        /** Order that was paid for. If a free or an offline order, the order that was created. */
        order?: Order;
    }
    interface OrderStarted {
        /** Order that reached its `startDate`. */
        order?: Order;
    }
    /**
     * Triggered at the start of a new payment cycle for an existing order.
     *
     * This webhook does not trigger at the initial start of an offline order.
     */
    interface OrderCycleStarted {
        /** Order whose new cycle started. */
        order?: Order;
        /** Number of the payment cycle will be 0 when the order is in the free trial period. In other cases, the cycle number starts from 1. */
        cycleNumber?: number;
    }
    /** Emitted when a recurring order is canceled for the next payment cycle */
    interface OrderAutoRenewCanceled {
        /** Order that is canceled, effective at the end of the current payment cycle. */
        order?: Order;
    }
    interface OrderEnded {
        /** Order that ended. */
        order?: Order;
    }
    interface GetOrderRequest {
        /** Order ID. */
        _id: string;
        /**
         * Predefined set of fields to return.
         *
         * Default: If `fieldSet` is omitted, no order form submission data is returned.
         */
        fieldSet?: Set;
    }
    interface GetOrderResponse {
        /** Order. */
        order?: Order;
    }
    interface ListOrdersRequest {
        /** Filter by a buyer's member ID, from the Members API. */
        buyerIds?: string[];
        /** Filter by plan IDs, from the Plans API. */
        planIds?: string[];
        /** Filter by whether or not the auto-renewal of recurring orders was canceled. */
        autoRenewCanceled?: boolean | null;
        /** Filter by order status. */
        orderStatuses?: OrderStatus[];
        /** Filter by payment status. */
        paymentStatuses?: PaymentStatus[];
        /**
         * Number of orders to return. See Sorting and Paging for more information.
         *
         * Max: `50`
         */
        limit?: number | null;
        /** Number of orders to skip in the current sort order. */
        offset?: number | null;
        /**
         * Sort order.
         *
         * Use `ASC` for ascending order or `DESC` for descending order.
         *
         * Default: `DESC`.
         */
        sorting?: Sorting$1;
        /**
         * Predefined set of fields to return.
         *
         * Default: If `fieldSet` is omitted, no order form submission data is returned.
         */
        fieldSet?: Set;
    }
    interface ListOrdersResponse {
        /** List of orders. */
        orders?: Order[];
        /** Object containing paging-related data (number of orders returned, offset). */
        pagingMetadata?: PagingMetadataV2$1;
    }
    interface OrdersQueryOrdersRequest {
        /** Query filter. */
        query?: QueryV2$1;
    }
    interface OrdersQueryOrdersResponse {
        /** Retrieved orders. */
        plans?: Order[];
        /** Paging-related data (number of orders returned, offset). */
        pagingMetadata?: PagingMetadataV2$1;
    }
    interface GetOrdersStatsRequest {
    }
    interface GetOrdersStatsResponse {
        /** Total number of orders. */
        totalOrderCount?: number;
        /** Number of active orders. */
        activeOrderCount?: number;
    }
    interface GetAvailableOrderActionsRequest {
        /** Order ID. */
        _id: string;
    }
    interface GetAvailableOrderActionsResponse {
        /** Whether the order can be suspended. */
        suspendable?: boolean;
        /** If the order cannot be suspended, a reason is returned here. */
        notSuspendableReason?: ReasonNotSuspendable;
        /** Whether the order can be canceled by the buyer. */
        cancelableByBuyer?: boolean;
    }
    enum ReasonNotSuspendable {
        /** Undefined reason. */
        UNDEFINED = "UNDEFINED",
        /** Saved in the database but is awaiting payment. Non-active orders can't be suspended. */
        PENDING = "PENDING",
        /** Trial orders can't be suspended. */
        TRIAL = "TRIAL",
        /** Canceled orders can't be suspended. */
        CANCELED = "CANCELED",
        /** Ended orders can't be suspended. */
        ENDED = "ENDED",
        /** Paid for orders with future start dates can't be suspended. */
        NOT_STARTED = "NOT_STARTED",
        /** Order is already suspended. */
        ALREADY_SUSPENDED = "ALREADY_SUSPENDED",
        /** Orders based on recurring payments using older stripe versions can't be suspended. */
        OLD_STRIPE = "OLD_STRIPE"
    }
    interface PostponeEndDateRequest {
        /** Order ID. */
        _id: string;
        /**
         * New end date and time.
         *
         * Must be later than the current end date and time.
         */
        endDate: Date | null;
    }
    interface PostponeEndDateResponse {
    }
    interface OrderEndDatePostponed {
        /** Order whose `endDate` was postponed. */
        order?: Order;
    }
    interface CancelOrderRequest {
        /** Order ID. */
        _id: string;
        /** __Required.__ When the order will be canceled. One-time orders can only be canceled `IMMEDIATELY`. */
        effectiveAt: CancellationEffectiveAt;
    }
    interface CancelOrderResponse {
    }
    interface MarkAsPaidRequest {
        /** Order ID. */
        _id: string;
    }
    interface MarkAsPaidResponse {
    }
    interface OrderMarkedAsPaid {
        /** Order that was marked as paid. */
        order?: Order;
    }
    interface PauseOrderRequest {
        /** Order ID. */
        _id: string;
    }
    interface PauseOrderResponse {
    }
    interface OrderPaused {
        /** Paused order. */
        order?: Order;
    }
    interface BulkPauseOrderRequest {
        /** List of Order IDs. */
        ids: string[];
        /** Set to true to return Order entity in response. */
        returnFullEntity?: boolean;
    }
    interface BulkPauseOrderResponse {
        /** Orders that were paused. */
        results?: BulkOrderResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata$1;
    }
    interface BulkOrderResult {
        /** Item metadata */
        itemMetadata?: ItemMetadata$1;
        /** The order. */
        order?: Order;
    }
    interface ItemMetadata$1 {
        /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
        _id?: string | null;
        /** Index of the item within the request array. Allows for correlation between request and response items. */
        originalIndex?: number;
        /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
        success?: boolean;
        /** Details about the error in case of failure. */
        error?: ApplicationError$1;
    }
    interface ApplicationError$1 {
        /** Error code. */
        code?: string;
        /** Description of the error. */
        description?: string;
        /** Data related to the error. */
        data?: Record<string, any> | null;
    }
    interface BulkActionMetadata$1 {
        /** Number of items that were successfully processed. */
        totalSuccesses?: number;
        /** Number of items that couldn't be processed. */
        totalFailures?: number;
        /** Number of failures without details because detailed failure threshold was exceeded. */
        undetailedFailures?: number;
    }
    interface ResumeOrderRequest {
        /** Order ID. */
        _id: string;
    }
    interface ResumeOrderResponse {
    }
    interface OrderResumed {
        /** Resumed order. */
        order?: Order;
    }
    interface BulkResumeOrderRequest {
        /** List of Order IDs. */
        ids: string[];
        /** Set to true to return Order entity in response. */
        returnFullEntity?: boolean;
    }
    interface BulkResumeOrderResponse {
        /** Orders that were resumed. */
        results?: BulkOrderResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata$1;
    }
    /**
     * Retrieves an order for the currently logged-in member by ID.
     * @param _id - Order ID.
     * @public
     * @requiredField _id
     * @param options - Options for getting a logged-in member's order.
     * @permissionId PRICING_PLANS.READ_OWN_ORDERS
     * @applicableIdentity MEMBER
     * @returns Requested order.
     * @fqn com.wixpress.membership.v2.orders.member.MemberOrdersService.GetOrder
     */
    function memberGetOrder(_id: string, options?: MemberGetOrderOptions): Promise<Order>;
    interface MemberGetOrderOptions {
        /**
         * Predefined set of fields to return.
         *
         * Default: If `fieldSet` is omitted, no order form submission data is returned.
         */
        fieldSet?: Set;
    }
    /**
     * Retrieves a list of up to 100 pricing plan orders for currently logged-in member.
     * @public
     * @param options - Filtering, sorting, and pagination options.
     * @permissionId PRICING_PLANS.READ_OWN_ORDERS
     * @applicableIdentity MEMBER
     * @fqn com.wixpress.membership.v2.orders.member.MemberOrdersService.ListOrders
     */
    function memberListOrders(options?: MemberListOrdersOptions): Promise<MemberListOrdersResponse>;
    interface MemberListOrdersOptions {
        /** Filter by plan IDs. */
        planIds?: string[];
        /** Filter for orders where auto renewal was canceled. */
        autoRenewCanceled?: boolean | null;
        /** Filter by order status. */
        orderStatuses?: OrderStatus[];
        /** Filter by payment status. */
        paymentStatuses?: PaymentStatus[];
        /** Limit the number of pricing plans returned. Default limit is 50. */
        limit?: number | null;
        /** Number of entries to offset. */
        offset?: number | null;
        /** Sorting direction (defaults to ASC) and field to sort by. */
        sorting?: Sorting$1;
        /**
         * Predefined set of fields to return.
         *
         * Default: If `fieldSet` is omitted, no order form submission data is returned.
         */
        fieldSet?: Set;
    }
    interface QueryCursorResult {
        cursors: Cursors$1;
        hasNext: () => boolean;
        hasPrev: () => boolean;
        length: number;
        pageSize: number;
    }
    interface PlansQueryResult$1 extends QueryCursorResult {
        items: Order[];
        query: PlansQueryBuilder$1;
        next: () => Promise<PlansQueryResult$1>;
        prev: () => Promise<PlansQueryResult$1>;
    }
    interface PlansQueryBuilder$1 {
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        eq: (propertyName: "_id" | "planId" | "subscriptionId" | "wixPayOrderId" | "buyer" | "buyer.memberId" | "buyer.contactId" | "priceDetails" | "priceDetails.subscription" | "priceDetails.subscription.cycleDuration" | "priceDetails.subscription.cycleDuration.count" | "priceDetails.subscription.cycleDuration.unit" | "priceDetails.subscription.cycleCount" | "priceDetails.singlePaymentForDuration" | "priceDetails.singlePaymentForDuration.count" | "priceDetails.singlePaymentForDuration.unit" | "priceDetails.singlePaymentUnlimited" | "priceDetails.subtotal" | "priceDetails.discount" | "priceDetails.tax" | "priceDetails.tax.name" | "priceDetails.tax.includedInPrice" | "priceDetails.tax.rate" | "priceDetails.tax.amount" | "priceDetails.total" | "priceDetails.planPrice" | "priceDetails.currency" | "priceDetails.freeTrialDays" | "priceDetails.coupon" | "priceDetails.coupon.code" | "priceDetails.coupon.amount" | "priceDetails.coupon.id" | "pricing" | "pricing.subscription" | "pricing.subscription.cycleDuration" | "pricing.subscription.cycleCount" | "pricing.singlePaymentForDuration" | "pricing.singlePaymentForDuration.count" | "pricing.singlePaymentForDuration.unit" | "pricing.singlePaymentUnlimited" | "pricing.prices.duration" | "pricing.prices.duration.cycleFrom" | "pricing.prices.duration.numberOfCycles" | "pricing.prices.price" | "pricing.prices.price.subtotal" | "pricing.prices.price.coupon" | "pricing.prices.price.coupon.code" | "pricing.prices.price.coupon.amount" | "pricing.prices.price.coupon.id" | "pricing.prices.price.discount" | "pricing.prices.price.tax" | "pricing.prices.price.tax.name" | "pricing.prices.price.tax.includedInPrice" | "pricing.prices.price.tax.rate" | "pricing.prices.price.tax.amount" | "pricing.prices.price.total" | "pricing.prices.price.currency" | "pricing.prices.price.fees.name" | "pricing.prices.price.fees.amount" | "pricing.prices.price.proration" | "type" | "status" | "autoRenewCanceled" | "cancellation" | "cancellation.requestedDate" | "cancellation.cause" | "cancellation.effectiveAt" | "lastPaymentStatus" | "startDate" | "endDate" | "pausePeriods.status" | "pausePeriods.pauseDate" | "pausePeriods.resumeDate" | "freeTrialDays" | "earliestEndDate" | "currentCycle" | "currentCycle.index" | "currentCycle.startedDate" | "currentCycle.endedDate" | "cycles.index" | "cycles.startedDate" | "cycles.endedDate" | "planName" | "planDescription" | "planPrice" | "_createdDate" | "_updatedDate" | "formData" | "formData.formId" | "formData.submissionId", value: any) => PlansQueryBuilder$1;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        ne: (propertyName: "_id" | "planId" | "subscriptionId" | "wixPayOrderId" | "buyer" | "buyer.memberId" | "buyer.contactId" | "priceDetails" | "priceDetails.subscription" | "priceDetails.subscription.cycleDuration" | "priceDetails.subscription.cycleDuration.count" | "priceDetails.subscription.cycleDuration.unit" | "priceDetails.subscription.cycleCount" | "priceDetails.singlePaymentForDuration" | "priceDetails.singlePaymentForDuration.count" | "priceDetails.singlePaymentForDuration.unit" | "priceDetails.singlePaymentUnlimited" | "priceDetails.subtotal" | "priceDetails.discount" | "priceDetails.tax" | "priceDetails.tax.name" | "priceDetails.tax.includedInPrice" | "priceDetails.tax.rate" | "priceDetails.tax.amount" | "priceDetails.total" | "priceDetails.planPrice" | "priceDetails.currency" | "priceDetails.freeTrialDays" | "priceDetails.coupon" | "priceDetails.coupon.code" | "priceDetails.coupon.amount" | "priceDetails.coupon.id" | "pricing" | "pricing.subscription" | "pricing.subscription.cycleDuration" | "pricing.subscription.cycleCount" | "pricing.singlePaymentForDuration" | "pricing.singlePaymentForDuration.count" | "pricing.singlePaymentForDuration.unit" | "pricing.singlePaymentUnlimited" | "pricing.prices.duration" | "pricing.prices.duration.cycleFrom" | "pricing.prices.duration.numberOfCycles" | "pricing.prices.price" | "pricing.prices.price.subtotal" | "pricing.prices.price.coupon" | "pricing.prices.price.coupon.code" | "pricing.prices.price.coupon.amount" | "pricing.prices.price.coupon.id" | "pricing.prices.price.discount" | "pricing.prices.price.tax" | "pricing.prices.price.tax.name" | "pricing.prices.price.tax.includedInPrice" | "pricing.prices.price.tax.rate" | "pricing.prices.price.tax.amount" | "pricing.prices.price.total" | "pricing.prices.price.currency" | "pricing.prices.price.fees.name" | "pricing.prices.price.fees.amount" | "pricing.prices.price.proration" | "type" | "status" | "autoRenewCanceled" | "cancellation" | "cancellation.requestedDate" | "cancellation.cause" | "cancellation.effectiveAt" | "lastPaymentStatus" | "startDate" | "endDate" | "pausePeriods.status" | "pausePeriods.pauseDate" | "pausePeriods.resumeDate" | "freeTrialDays" | "earliestEndDate" | "currentCycle" | "currentCycle.index" | "currentCycle.startedDate" | "currentCycle.endedDate" | "cycles.index" | "cycles.startedDate" | "cycles.endedDate" | "planName" | "planDescription" | "planPrice" | "_createdDate" | "_updatedDate" | "formData" | "formData.formId" | "formData.submissionId", value: any) => PlansQueryBuilder$1;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        ge: (propertyName: "priceDetails.subscription.cycleDuration.count" | "priceDetails.subscription.cycleCount" | "priceDetails.singlePaymentForDuration.count" | "priceDetails.freeTrialDays" | "pricing.subscription.cycleCount" | "pricing.singlePaymentForDuration.count" | "pricing.prices.duration.cycleFrom" | "pricing.prices.duration.numberOfCycles" | "cancellation.requestedDate" | "startDate" | "endDate" | "pausePeriods.pauseDate" | "pausePeriods.resumeDate" | "freeTrialDays" | "earliestEndDate" | "currentCycle.index" | "currentCycle.startedDate" | "currentCycle.endedDate" | "cycles.index" | "cycles.startedDate" | "cycles.endedDate" | "_createdDate" | "_updatedDate", value: any) => PlansQueryBuilder$1;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        gt: (propertyName: "priceDetails.subscription.cycleDuration.count" | "priceDetails.subscription.cycleCount" | "priceDetails.singlePaymentForDuration.count" | "priceDetails.freeTrialDays" | "pricing.subscription.cycleCount" | "pricing.singlePaymentForDuration.count" | "pricing.prices.duration.cycleFrom" | "pricing.prices.duration.numberOfCycles" | "cancellation.requestedDate" | "startDate" | "endDate" | "pausePeriods.pauseDate" | "pausePeriods.resumeDate" | "freeTrialDays" | "earliestEndDate" | "currentCycle.index" | "currentCycle.startedDate" | "currentCycle.endedDate" | "cycles.index" | "cycles.startedDate" | "cycles.endedDate" | "_createdDate" | "_updatedDate", value: any) => PlansQueryBuilder$1;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        le: (propertyName: "priceDetails.subscription.cycleDuration.count" | "priceDetails.subscription.cycleCount" | "priceDetails.singlePaymentForDuration.count" | "priceDetails.freeTrialDays" | "pricing.subscription.cycleCount" | "pricing.singlePaymentForDuration.count" | "pricing.prices.duration.cycleFrom" | "pricing.prices.duration.numberOfCycles" | "cancellation.requestedDate" | "startDate" | "endDate" | "pausePeriods.pauseDate" | "pausePeriods.resumeDate" | "freeTrialDays" | "earliestEndDate" | "currentCycle.index" | "currentCycle.startedDate" | "currentCycle.endedDate" | "cycles.index" | "cycles.startedDate" | "cycles.endedDate" | "_createdDate" | "_updatedDate", value: any) => PlansQueryBuilder$1;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        lt: (propertyName: "priceDetails.subscription.cycleDuration.count" | "priceDetails.subscription.cycleCount" | "priceDetails.singlePaymentForDuration.count" | "priceDetails.freeTrialDays" | "pricing.subscription.cycleCount" | "pricing.singlePaymentForDuration.count" | "pricing.prices.duration.cycleFrom" | "pricing.prices.duration.numberOfCycles" | "cancellation.requestedDate" | "startDate" | "endDate" | "pausePeriods.pauseDate" | "pausePeriods.resumeDate" | "freeTrialDays" | "earliestEndDate" | "currentCycle.index" | "currentCycle.startedDate" | "currentCycle.endedDate" | "cycles.index" | "cycles.startedDate" | "cycles.endedDate" | "_createdDate" | "_updatedDate", value: any) => PlansQueryBuilder$1;
        /** @param propertyName - Property whose value is compared with `string`.
         * @param string - String to compare against. Case-insensitive.
         * @documentationMaturity preview
         */
        startsWith: (propertyName: "_id" | "planId" | "subscriptionId" | "wixPayOrderId" | "buyer.memberId" | "buyer.contactId" | "priceDetails.subtotal" | "priceDetails.discount" | "priceDetails.tax.name" | "priceDetails.tax.rate" | "priceDetails.tax.amount" | "priceDetails.total" | "priceDetails.planPrice" | "priceDetails.currency" | "priceDetails.coupon.code" | "priceDetails.coupon.amount" | "priceDetails.coupon.id" | "pricing.prices.price.subtotal" | "pricing.prices.price.coupon.code" | "pricing.prices.price.coupon.amount" | "pricing.prices.price.coupon.id" | "pricing.prices.price.discount" | "pricing.prices.price.tax.name" | "pricing.prices.price.tax.rate" | "pricing.prices.price.tax.amount" | "pricing.prices.price.total" | "pricing.prices.price.currency" | "pricing.prices.price.fees.name" | "pricing.prices.price.fees.amount" | "pricing.prices.price.proration" | "planName" | "planDescription" | "planPrice" | "formData.formId" | "formData.submissionId", value: string) => PlansQueryBuilder$1;
        /** @param propertyName - Property whose value is compared with `values`.
         * @param values - List of values to compare against.
         * @documentationMaturity preview
         */
        hasSome: (propertyName: "_id" | "planId" | "subscriptionId" | "wixPayOrderId" | "buyer" | "buyer.memberId" | "buyer.contactId" | "priceDetails" | "priceDetails.subscription" | "priceDetails.subscription.cycleDuration" | "priceDetails.subscription.cycleDuration.count" | "priceDetails.subscription.cycleDuration.unit" | "priceDetails.subscription.cycleCount" | "priceDetails.singlePaymentForDuration" | "priceDetails.singlePaymentForDuration.count" | "priceDetails.singlePaymentForDuration.unit" | "priceDetails.singlePaymentUnlimited" | "priceDetails.subtotal" | "priceDetails.discount" | "priceDetails.tax" | "priceDetails.tax.name" | "priceDetails.tax.includedInPrice" | "priceDetails.tax.rate" | "priceDetails.tax.amount" | "priceDetails.total" | "priceDetails.planPrice" | "priceDetails.currency" | "priceDetails.freeTrialDays" | "priceDetails.coupon" | "priceDetails.coupon.code" | "priceDetails.coupon.amount" | "priceDetails.coupon.id" | "pricing" | "pricing.subscription" | "pricing.subscription.cycleDuration" | "pricing.subscription.cycleCount" | "pricing.singlePaymentForDuration" | "pricing.singlePaymentForDuration.count" | "pricing.singlePaymentForDuration.unit" | "pricing.singlePaymentUnlimited" | "pricing.prices.duration" | "pricing.prices.duration.cycleFrom" | "pricing.prices.duration.numberOfCycles" | "pricing.prices.price" | "pricing.prices.price.subtotal" | "pricing.prices.price.coupon" | "pricing.prices.price.coupon.code" | "pricing.prices.price.coupon.amount" | "pricing.prices.price.coupon.id" | "pricing.prices.price.discount" | "pricing.prices.price.tax" | "pricing.prices.price.tax.name" | "pricing.prices.price.tax.includedInPrice" | "pricing.prices.price.tax.rate" | "pricing.prices.price.tax.amount" | "pricing.prices.price.total" | "pricing.prices.price.currency" | "pricing.prices.price.fees.name" | "pricing.prices.price.fees.amount" | "pricing.prices.price.proration" | "type" | "status" | "autoRenewCanceled" | "cancellation" | "cancellation.requestedDate" | "cancellation.cause" | "cancellation.effectiveAt" | "lastPaymentStatus" | "startDate" | "endDate" | "pausePeriods.status" | "pausePeriods.pauseDate" | "pausePeriods.resumeDate" | "freeTrialDays" | "earliestEndDate" | "currentCycle" | "currentCycle.index" | "currentCycle.startedDate" | "currentCycle.endedDate" | "cycles.index" | "cycles.startedDate" | "cycles.endedDate" | "planName" | "planDescription" | "planPrice" | "_createdDate" | "_updatedDate" | "formData" | "formData.formId" | "formData.submissionId", value: any[]) => PlansQueryBuilder$1;
        /** @documentationMaturity preview */
        in: (propertyName: "_id" | "planId" | "subscriptionId" | "wixPayOrderId" | "buyer" | "buyer.memberId" | "buyer.contactId" | "priceDetails" | "priceDetails.subscription" | "priceDetails.subscription.cycleDuration" | "priceDetails.subscription.cycleDuration.count" | "priceDetails.subscription.cycleDuration.unit" | "priceDetails.subscription.cycleCount" | "priceDetails.singlePaymentForDuration" | "priceDetails.singlePaymentForDuration.count" | "priceDetails.singlePaymentForDuration.unit" | "priceDetails.singlePaymentUnlimited" | "priceDetails.subtotal" | "priceDetails.discount" | "priceDetails.tax" | "priceDetails.tax.name" | "priceDetails.tax.includedInPrice" | "priceDetails.tax.rate" | "priceDetails.tax.amount" | "priceDetails.total" | "priceDetails.planPrice" | "priceDetails.currency" | "priceDetails.freeTrialDays" | "priceDetails.coupon" | "priceDetails.coupon.code" | "priceDetails.coupon.amount" | "priceDetails.coupon.id" | "pricing" | "pricing.subscription" | "pricing.subscription.cycleDuration" | "pricing.subscription.cycleCount" | "pricing.singlePaymentForDuration" | "pricing.singlePaymentForDuration.count" | "pricing.singlePaymentForDuration.unit" | "pricing.singlePaymentUnlimited" | "pricing.prices.duration" | "pricing.prices.duration.cycleFrom" | "pricing.prices.duration.numberOfCycles" | "pricing.prices.price" | "pricing.prices.price.subtotal" | "pricing.prices.price.coupon" | "pricing.prices.price.coupon.code" | "pricing.prices.price.coupon.amount" | "pricing.prices.price.coupon.id" | "pricing.prices.price.discount" | "pricing.prices.price.tax" | "pricing.prices.price.tax.name" | "pricing.prices.price.tax.includedInPrice" | "pricing.prices.price.tax.rate" | "pricing.prices.price.tax.amount" | "pricing.prices.price.total" | "pricing.prices.price.currency" | "pricing.prices.price.fees.name" | "pricing.prices.price.fees.amount" | "pricing.prices.price.proration" | "type" | "status" | "autoRenewCanceled" | "cancellation" | "cancellation.requestedDate" | "cancellation.cause" | "cancellation.effectiveAt" | "lastPaymentStatus" | "startDate" | "endDate" | "pausePeriods.status" | "pausePeriods.pauseDate" | "pausePeriods.resumeDate" | "freeTrialDays" | "earliestEndDate" | "currentCycle" | "currentCycle.index" | "currentCycle.startedDate" | "currentCycle.endedDate" | "cycles.index" | "cycles.startedDate" | "cycles.endedDate" | "planName" | "planDescription" | "planPrice" | "_createdDate" | "_updatedDate" | "formData" | "formData.formId" | "formData.submissionId", value: any) => PlansQueryBuilder$1;
        /** @documentationMaturity preview */
        exists: (propertyName: "_id" | "planId" | "subscriptionId" | "wixPayOrderId" | "buyer" | "buyer.memberId" | "buyer.contactId" | "priceDetails" | "priceDetails.subscription" | "priceDetails.subscription.cycleDuration" | "priceDetails.subscription.cycleDuration.count" | "priceDetails.subscription.cycleDuration.unit" | "priceDetails.subscription.cycleCount" | "priceDetails.singlePaymentForDuration" | "priceDetails.singlePaymentForDuration.count" | "priceDetails.singlePaymentForDuration.unit" | "priceDetails.singlePaymentUnlimited" | "priceDetails.subtotal" | "priceDetails.discount" | "priceDetails.tax" | "priceDetails.tax.name" | "priceDetails.tax.includedInPrice" | "priceDetails.tax.rate" | "priceDetails.tax.amount" | "priceDetails.total" | "priceDetails.planPrice" | "priceDetails.currency" | "priceDetails.freeTrialDays" | "priceDetails.coupon" | "priceDetails.coupon.code" | "priceDetails.coupon.amount" | "priceDetails.coupon.id" | "pricing" | "pricing.subscription" | "pricing.subscription.cycleDuration" | "pricing.subscription.cycleCount" | "pricing.singlePaymentForDuration" | "pricing.singlePaymentForDuration.count" | "pricing.singlePaymentForDuration.unit" | "pricing.singlePaymentUnlimited" | "pricing.prices.duration" | "pricing.prices.duration.cycleFrom" | "pricing.prices.duration.numberOfCycles" | "pricing.prices.price" | "pricing.prices.price.subtotal" | "pricing.prices.price.coupon" | "pricing.prices.price.coupon.code" | "pricing.prices.price.coupon.amount" | "pricing.prices.price.coupon.id" | "pricing.prices.price.discount" | "pricing.prices.price.tax" | "pricing.prices.price.tax.name" | "pricing.prices.price.tax.includedInPrice" | "pricing.prices.price.tax.rate" | "pricing.prices.price.tax.amount" | "pricing.prices.price.total" | "pricing.prices.price.currency" | "pricing.prices.price.fees.name" | "pricing.prices.price.fees.amount" | "pricing.prices.price.proration" | "type" | "status" | "autoRenewCanceled" | "cancellation" | "cancellation.requestedDate" | "cancellation.cause" | "cancellation.effectiveAt" | "lastPaymentStatus" | "startDate" | "endDate" | "pausePeriods.status" | "pausePeriods.pauseDate" | "pausePeriods.resumeDate" | "freeTrialDays" | "earliestEndDate" | "currentCycle" | "currentCycle.index" | "currentCycle.startedDate" | "currentCycle.endedDate" | "cycles.index" | "cycles.startedDate" | "cycles.endedDate" | "planName" | "planDescription" | "planPrice" | "_createdDate" | "_updatedDate" | "formData" | "formData.formId" | "formData.submissionId", value: boolean) => PlansQueryBuilder$1;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
         * @documentationMaturity preview
         */
        ascending: (...propertyNames: Array<"_id" | "planId" | "subscriptionId" | "wixPayOrderId" | "buyer" | "buyer.memberId" | "buyer.contactId" | "priceDetails" | "priceDetails.subscription" | "priceDetails.subscription.cycleDuration" | "priceDetails.subscription.cycleDuration.count" | "priceDetails.subscription.cycleDuration.unit" | "priceDetails.subscription.cycleCount" | "priceDetails.singlePaymentForDuration" | "priceDetails.singlePaymentForDuration.count" | "priceDetails.singlePaymentForDuration.unit" | "priceDetails.singlePaymentUnlimited" | "priceDetails.subtotal" | "priceDetails.discount" | "priceDetails.tax" | "priceDetails.tax.name" | "priceDetails.tax.includedInPrice" | "priceDetails.tax.rate" | "priceDetails.tax.amount" | "priceDetails.total" | "priceDetails.planPrice" | "priceDetails.currency" | "priceDetails.freeTrialDays" | "priceDetails.coupon" | "priceDetails.coupon.code" | "priceDetails.coupon.amount" | "priceDetails.coupon.id" | "pricing" | "pricing.subscription" | "pricing.subscription.cycleDuration" | "pricing.subscription.cycleCount" | "pricing.singlePaymentForDuration" | "pricing.singlePaymentForDuration.count" | "pricing.singlePaymentForDuration.unit" | "pricing.singlePaymentUnlimited" | "pricing.prices" | "pricing.prices.duration" | "pricing.prices.duration.cycleFrom" | "pricing.prices.duration.numberOfCycles" | "pricing.prices.price" | "pricing.prices.price.subtotal" | "pricing.prices.price.coupon" | "pricing.prices.price.coupon.code" | "pricing.prices.price.coupon.amount" | "pricing.prices.price.coupon.id" | "pricing.prices.price.discount" | "pricing.prices.price.tax" | "pricing.prices.price.tax.name" | "pricing.prices.price.tax.includedInPrice" | "pricing.prices.price.tax.rate" | "pricing.prices.price.tax.amount" | "pricing.prices.price.total" | "pricing.prices.price.currency" | "pricing.prices.price.fees.name" | "pricing.prices.price.fees.amount" | "pricing.prices.price.proration" | "type" | "orderMethod" | "status" | "autoRenewCanceled" | "cancellation" | "cancellation.requestedDate" | "cancellation.cause" | "cancellation.effectiveAt" | "lastPaymentStatus" | "startDate" | "endDate" | "pausePeriods" | "pausePeriods.status" | "pausePeriods.pauseDate" | "pausePeriods.resumeDate" | "freeTrialDays" | "earliestEndDate" | "currentCycle" | "currentCycle.index" | "currentCycle.startedDate" | "currentCycle.endedDate" | "cycles.index" | "cycles.startedDate" | "cycles.endedDate" | "planName" | "planDescription" | "planPrice" | "_createdDate" | "_updatedDate" | "formData" | "formData.formId" | "formData.submissionId" | "formData.submissionData" | "statusNew">) => PlansQueryBuilder$1;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
         * @documentationMaturity preview
         */
        descending: (...propertyNames: Array<"_id" | "planId" | "subscriptionId" | "wixPayOrderId" | "buyer" | "buyer.memberId" | "buyer.contactId" | "priceDetails" | "priceDetails.subscription" | "priceDetails.subscription.cycleDuration" | "priceDetails.subscription.cycleDuration.count" | "priceDetails.subscription.cycleDuration.unit" | "priceDetails.subscription.cycleCount" | "priceDetails.singlePaymentForDuration" | "priceDetails.singlePaymentForDuration.count" | "priceDetails.singlePaymentForDuration.unit" | "priceDetails.singlePaymentUnlimited" | "priceDetails.subtotal" | "priceDetails.discount" | "priceDetails.tax" | "priceDetails.tax.name" | "priceDetails.tax.includedInPrice" | "priceDetails.tax.rate" | "priceDetails.tax.amount" | "priceDetails.total" | "priceDetails.planPrice" | "priceDetails.currency" | "priceDetails.freeTrialDays" | "priceDetails.coupon" | "priceDetails.coupon.code" | "priceDetails.coupon.amount" | "priceDetails.coupon.id" | "pricing" | "pricing.subscription" | "pricing.subscription.cycleDuration" | "pricing.subscription.cycleCount" | "pricing.singlePaymentForDuration" | "pricing.singlePaymentForDuration.count" | "pricing.singlePaymentForDuration.unit" | "pricing.singlePaymentUnlimited" | "pricing.prices" | "pricing.prices.duration" | "pricing.prices.duration.cycleFrom" | "pricing.prices.duration.numberOfCycles" | "pricing.prices.price" | "pricing.prices.price.subtotal" | "pricing.prices.price.coupon" | "pricing.prices.price.coupon.code" | "pricing.prices.price.coupon.amount" | "pricing.prices.price.coupon.id" | "pricing.prices.price.discount" | "pricing.prices.price.tax" | "pricing.prices.price.tax.name" | "pricing.prices.price.tax.includedInPrice" | "pricing.prices.price.tax.rate" | "pricing.prices.price.tax.amount" | "pricing.prices.price.total" | "pricing.prices.price.currency" | "pricing.prices.price.fees.name" | "pricing.prices.price.fees.amount" | "pricing.prices.price.proration" | "type" | "orderMethod" | "status" | "autoRenewCanceled" | "cancellation" | "cancellation.requestedDate" | "cancellation.cause" | "cancellation.effectiveAt" | "lastPaymentStatus" | "startDate" | "endDate" | "pausePeriods" | "pausePeriods.status" | "pausePeriods.pauseDate" | "pausePeriods.resumeDate" | "freeTrialDays" | "earliestEndDate" | "currentCycle" | "currentCycle.index" | "currentCycle.startedDate" | "currentCycle.endedDate" | "cycles.index" | "cycles.startedDate" | "cycles.endedDate" | "planName" | "planDescription" | "planPrice" | "_createdDate" | "_updatedDate" | "formData" | "formData.formId" | "formData.submissionId" | "formData.submissionData" | "statusNew">) => PlansQueryBuilder$1;
        /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
         * @documentationMaturity preview
         */
        limit: (limit: number) => PlansQueryBuilder$1;
        /** @param cursor - A pointer to specific record
         * @documentationMaturity preview
         */
        skipTo: (cursor: string) => PlansQueryBuilder$1;
        /** @documentationMaturity preview */
        find: () => Promise<PlansQueryResult$1>;
    }
    /**
     * Cancels an order. Recurring orders can be canceled either immediately or at the next payment date. One time orders can only be canceled immediately.
     *
     * There may be some operations that continue to be processed before the status of the order is changed to `"CANCELED"`. For example, payments might need to be refunded before the order is fully canceled.
     *
     * Canceling during the free trial period: When a buyer cancels their order during the free trial period, the buyer's subscription expires at the end of the free trial period and they won't be billed. The buyer may continue using the benefits until the end of the free trial period.
     *
     * >**Note:**
     * >This method requires [visitor or member authentication](https://dev.wix.com/docs/rest/articles/getting-started/access-types-and-permissions).
     * @param _id - Order ID.
     * @param effectiveAt - Required. Whether to cancel the order effective immediately or at the next payment date. One-time orders can only be canceled immediately.
     * @public
     * @requiredField _id
     * @requiredField effectiveAt
     * @param options - Options for requesting a cancellation.
     * @permissionId PRICING_PLANS.MANAGE_OWN_ORDERS
     * @applicableIdentity MEMBER
     * @fqn com.wixpress.membership.v2.orders.member.MemberOrdersService.RequestCancellation
     */
    function requestCancellation(_id: string, effectiveAt: CancellationEffectiveAt): Promise<void>;
    /**
     * Creates an online order for a site member.
     *
     * If this method is called by a site member ([SDK](https://dev.wix.com/docs/sdk/articles/get-started/about-identities#site-member) | [REST](https://dev.wix.com/docs/rest/articles/getting-started/about-identities#site-member)), the plan is automatically ordered on behalf of that site member. Otherwise, you must specify `onBehalf.memberId` in your call.
     *
     * When an online order is created, but payment hasn't been processed, its status is set to `DRAFT`. After the payment has been processed, if the start date is in the future the order's status is set to `PENDING`. Otherwise, it's set to `ACTIVE`.
     * @param planId - Plan ID.
     * @public
     * @requiredField options.onBehalf.memberId
     * @requiredField planId
     * @adminMethod
     * @fqn com.wixpress.membership.v2.orders.CheckoutService.CreateOnlineOrder
     */
    function createOnlineOrder(planId: string, options?: CreateOnlineOrderOptions): Promise<CreateOnlineOrderResponse>;
    interface CreateOnlineOrderOptions {
        /**
         * Start date and time for the plan of the online order in a `YYYY-MM-DDThh:mm[:ss][.sss]Z` format.
         *
         * Default: Current date and time.
         */
        startDate?: Date | null;
        /** Coupon code to apply. */
        couponCode?: string | null;
        /** Provided if checkout is initiated on buyer's behalf. */
        onBehalf?: OnBehalf;
        /** Submission ID of the form submitted with this order. */
        submissionId?: string | null;
    }
    interface CreateGuestOnlineOrderOptions {
        /**
         * Start date for the ordered plan.
         *
         * Default: Current date
         */
        startDate?: Date | null;
        /** Coupon code to apply. */
        couponCode?: string | null;
        /** Captcha data to prove you are not a robot */
        captcha: Captcha;
        /** Visitor info */
        guest: Guest;
        /** Form submission id that was submitted together with the order */
        submissionId?: string | null;
    }
    /**
     * Creates an order for a buyer who purchased the plan with an offline transaction.
     *
     * An offline order is handled off of the Wix site and is marked as `type`: `offline`. If a pricing plan
     * has a limit on the amount of purchases per buyer, that limit is ignored for offline orders.
     * Tax is only applied if the site [has it configured](https://support.wix.com/en/article/pricing-plans-setting-up-tax-collection).
     *
     * When creating a free offline order:
     * The order's status is set to `"PENDING"` if the start date is in the future. Otherwise, the status is set to `"ACTIVE"`.
     * The order's last payment status is set to `"NOT_APPLICABLE"`. "
     *
     * When creating a non-free offline order:
     * The order's status is set to `"PENDING"` if the start date is in the future. Otherwise, the status is set to `"ACTIVE"`.
     * The order's last payment status is set to `"UNPAID"` or `"PAID"` based on the data passed in the `paid` boolean in the request.
     *
     * Payment for an offline order can be set in 1 of 2 ways:
     * + During order creation, set `paid`: `true`.
     * + After creation, call Mark As Paid.
     * @param planId - ID of the plan being ordered, from the Plans API.
     * @param memberId - ID of the member ordering the plan, from the Members API.
     * @public
     * @requiredField memberId
     * @requiredField planId
     * @param options - Options for creating an offline order.
     * @permissionId PRICING_PLANS.REGISTER_OFFLINE_ORDERS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.membership.v2.orders.CheckoutService.CreateOfflineOrder
     */
    function createOfflineOrder(planId: string, memberId: string, options?: CreateOfflineOrderOptions): Promise<CreateOfflineOrderResponse>;
    interface CreateOfflineOrderOptions {
        /**
         * Start date and time for the ordered plan in a `YYYY-MM-DDThh:mm[:ss][.sss]Z` format.
         *
         * Default: Current date and time.
         */
        startDate?: Date | null;
        /**
         * Whether the order is paid.
         *
         * Default: `false`
         */
        paid?: boolean | null;
        /** Coupon code to apply, from the Coupons API. */
        couponCode?: string | null;
        /** Form submission ID that was submitted with the order. */
        submissionId?: string | null;
    }
    interface CreateExternalOrderOptions {
        /** Form submission id that was submitted together with the order */
        submissionId?: string | null;
    }
    /**
     * Returns an `order` object that represents a potential online order for a site member.
     *
     * You can use this method to show a site member a preview of an online order before [creating](https://dev.wix.com/docs/rest/business-solutions/pricing-plans/pricing-plans/orders/create-online-order) it.
     *
     * This method must be called using the site member identity ([SDK](https://dev.wix.com/docs/sdk/articles/get-started/about-identities#site-member) | [REST](https://dev.wix.com/docs/rest/articles/getting-started/about-identities#site-member)). Therefore, [Wix apps](https://dev.wix.com/docs/build-apps) can't currently call this method using REST.
     * @param planId - Plan ID.
     * @public
     * @requiredField planId
     * @permissionId PRICING_PLANS.PURCHASE_PLANS
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Manage Portfolio
     * @permissionScopeId SCOPE.PORTFOLIO.MANAGE-PORTFOLIO
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @fqn com.wixpress.membership.v2.orders.CheckoutService.GetOnlineOrderPreview
     */
    function getOnlineOrderPreview(planId: string, options?: GetOnlineOrderPreviewOptions): Promise<GetOnlineOrderPreviewResponse>;
    interface GetOnlineOrderPreviewOptions {
        /**
         * Start date and time for the plan of the order preview in a `YYYY-MM-DDThh:mm[:ss][.sss]Z` format.
         *
         * Default: Current date and time.
         */
        startDate?: Date | null;
        /** Coupon code to apply. */
        couponCode?: string | null;
    }
    interface GetGuestOnlineOrderPreviewOptions {
        /**
         * Start date for the ordered plan.
         *
         * Default: Current date
         */
        startDate?: Date | null;
        /** Coupon code to apply. */
        couponCode?: string | null;
        /** Email for checkout */
        email: string;
    }
    /**
     * Performs a dry run of a purchase and provides an order preview.
     *
     * The preview uses the same logic as purchasing a plan, but the preview is not saved. Because an order is not actually
     * created, the preview order's `orderId` and `subscriptionId` are displayed as a string of multiple zero characters
     * (`000000-0000`). Tax is only calculated if the site [has it configured](https://support.wix.com/en/article/pricing-plans-setting-up-tax-collection).
     * <br>
     * If a pricing plan has a limit on the amount of purchases per buyer, that limit is not considered for generating the preview.
     * But, if that limit has been reached and this order would then exceed the amount of purchases permitted for this buyer, then
     * `purchaseLimitExceeded` will return as `true`.
     *
     * To get a general price preview for a plan that's not buyer-specific, call Get Price Preview.
     * @param memberId - Member ID of the buyer the previewed order is for, from the Members API.
     * @public
     * @requiredField memberId
     * @requiredField planId
     * @param options - Options for previewing the offline order.
     * @param planId - ID of the plan of the previewed order.
     * @permissionId PRICING_PLANS.MANAGE_ORDERS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.membership.v2.orders.CheckoutService.GetOfflineOrderPreview
     */
    function getOfflineOrderPreview(planId: string, memberId: string, options?: GetOfflineOrderPreviewOptions): Promise<GetOfflineOrderPreviewResponse>;
    interface GetOfflineOrderPreviewOptions {
        /**
         * Start date and time for plan of the previewed order in a `YYYY-MM-DDThh:mm[:ss][.sss]Z` format.
         *
         * Default: Current date and time.
         */
        startDate?: Date | null;
        /** Coupon code to apply, from the Coupons API. */
        couponCode?: string | null;
    }
    /**
     * Retrieves a plan's pricing.
     *
     * The price preview uses the same logic as purchasing a plan, but the preview is not saved. Tax is only applied if
     * the site [has it configured](https://support.wix.com/en/article/pricing-plans-setting-up-tax-collection). The price is returned
     * in the pricing model format used for orders. Learn more about pricing models ([REST](https://dev.wix.com/api/rest/wix-pricing-plans/pricing-plans/introduction#wix-pricing-plans_pricing-plans_introduction_pricing-models)|[SDK](https://dev.wix.com/docs/sdk/backend-modules/pricing-plans/introduction#pricing-models)).
     *
     * Buyers do not have to be logged in to preview the price, and as such, the details returned are not buyer-specific. To
     * generate a preview of a purchase for a specific buyer, call Get Offline Order Preview.
     * @param planId - ID of plan to preview.
     * @public
     * @requiredField planId
     * @param options - Options for getting a price preview.
     * @permissionId PRICING_PLANS.READ_PUBLIC_PLANS
     * @permissionScope Read Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-PLANS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-ORDERS
     * @permissionScope Manage Portfolio
     * @permissionScopeId SCOPE.PORTFOLIO.MANAGE-PORTFOLIO
     * @permissionScope Manage Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-PLANS
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @fqn com.wixpress.membership.v2.orders.CheckoutService.GetPricePreview
     */
    function getPricePreview(planId: string, options?: GetPricePreviewOptions): Promise<GetPricePreviewResponse>;
    interface GetPricePreviewOptions {
        /** Coupon code to apply, from the Coupons API. */
        couponCode?: string | null;
    }
    /**
     * Retrieves an order by ID.
     * @param _id - Order ID.
     * @public
     * @requiredField _id
     * @param options - Options to use when getting an order.
     * @permissionId PRICING_PLANS.READ_ORDERS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.membership.v2.orders.OrderManagementService.GetOrder
     */
    function managementGetOrder(_id: string, options?: ManagementGetOrderOptions): Promise<GetOrderResponse>;
    interface ManagementGetOrderOptions {
        /**
         * Predefined set of fields to return.
         *
         * Default: If `fieldSet` is omitted, no order form submission data is returned.
         */
        fieldSet?: Set;
    }
    /**
     * Retrieves a list of up to 50 pricing plan orders and details, given the specified sorting and filtering.
     *
     * By default, this endpoint will retrieve all orders and return them sorted by `createdDate` in `DESC`, descending order.
     * `sort.fieldName` supports `endDate` and `createdDate` fields and defaults to `ASC`, ascending order.
     * @public
     * @param options - Filtering, sorting, and pagination options.
     * @permissionId PRICING_PLANS.READ_ORDERS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.membership.v2.orders.OrderManagementService.ListOrders
     */
    function managementListOrders(options?: ManagementListOrdersOptions): Promise<ListOrdersResponse>;
    interface ManagementListOrdersOptions {
        /** Filter by a buyer's member ID, from the Members API. */
        buyerIds?: string[];
        /** Filter by plan IDs, from the Plans API. */
        planIds?: string[];
        /** Filter by whether or not the auto-renewal of recurring orders was canceled. */
        autoRenewCanceled?: boolean | null;
        /** Filter by order status. */
        orderStatuses?: OrderStatus[];
        /** Filter by payment status. */
        paymentStatuses?: PaymentStatus[];
        /**
         * Number of orders to return. See Sorting and Paging for more information.
         *
         * Max: `50`
         */
        limit?: number | null;
        /** Number of orders to skip in the current sort order. */
        offset?: number | null;
        /**
         * Sort order.
         *
         * Use `ASC` for ascending order or `DESC` for descending order.
         *
         * Default: `DESC`.
         */
        sorting?: Sorting$1;
        /**
         * Predefined set of fields to return.
         *
         * Default: If `fieldSet` is omitted, no order form submission data is returned.
         */
        fieldSet?: Set;
    }
    interface ManagementQueryOrdersOptions {
        /** Query filter. */
        query?: QueryV2$1;
    }
    /**
     * Extends the duration of a pricing plan order by postponing the order's `endDate`. Postponing the end date of an order does not impact payments.
     *
     * New `endDate` must be later than the order's current `endDate`. Can't postpone orders that are unlimited.
     * Can't postpone an order with `status`: `PAUSED`.
     * @param _id - Order ID.
     * @param endDate - New end date and time.
     *
     * Must be later than the current end date and time.
     * @public
     * @requiredField _id
     * @requiredField endDate
     * @param options - Options for postponing the end date of an order.
     * @permissionId PRICING_PLANS.MANAGE_ORDERS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.membership.v2.orders.OrderManagementService.PostponeEndDate
     */
    function postponeEndDate(_id: string, endDate: Date | null): Promise<void>;
    /**
     * Cancels an existing order.
     *
     * For orders with recurring payments, a cancellation can be set to occur either `IMMEDIATELY` or at the `NEXT_PAYMENT_DATE`.
     * For orders with one-time payments, a cancellation can only be set for `IMMEDIATELY`.
     *
     * #### Canceling during the free trial period.
     *
     * When a buyer cancels their order during the free trial period, the buyer's subscription expires at the end
     * of the free trial period and they will not be billed. The buyer may continue using the benefits until the end
     * of the free trial period.
     *
     * When a Wix user cancels an ordered plan during the free trial period, they choose whether to apply the cancellation
     * `IMMEDIATELY` or at the `NEXT_PAYMENT_DATE`. Canceling `IMMEDIATELY` will end the subscription for the buyer
     * immediately, even during the free trial period and the buyer won't be billed. Canceling at the
     * `NEXT_PAYMENT_DATE` allows the buyer to continue using the benefits of the subscription until the end of the free trial period.
     * Then, the subscription ends and the buyer is not billed.
     * @param _id - Order ID.
     * @param effectiveAt - __Required.__ When the order will be canceled. One-time orders can only be canceled `IMMEDIATELY`.
     * @public
     * @requiredField _id
     * @requiredField effectiveAt
     * @param options - Options for canceling orders.
     * @permissionId PRICING_PLANS.MANAGE_ORDERS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.membership.v2.orders.OrderManagementService.CancelOrder
     */
    function cancelOrder(_id: string, effectiveAt: CancellationEffectiveAt): Promise<void>;
    /**
     * Marks an offline order as paid.
     * > __Note__: Marking separate payment cycles as paid is not yet supported. The entire order will be marked as paid. Subsequent offline payments do trigger events and emails, but are not registered as additional offline payments.
     *
     * Marking an offline order as paid causes the following changes:
     * - The order's `lastPaymentStatus` changes to `"PAID"`.
     * - The order's status changes to either `"PENDING"` or `"ACTIVE"`, depending on the order's `startDate`.
     *
     * An error occurs if you attempt to:
     * - Mark an already-paid, offline order as paid. You cannot mark an offline order as paid twice.
     * - Mark an online order as paid. The Mark as Paid method is supported for offline orders only.
     * @param _id - Order ID.
     * @public
     * @requiredField _id
     * @permissionId PRICING_PLANS.MANAGE_ORDERS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.membership.v2.orders.OrderManagementService.MarkAsPaid
     */
    function markAsPaid(_id: string): Promise<void>;
    /**
     * Pauses an order. Calling this method changes the order status to `"PAUSED"` and updates the `pausePeriods` array.
     *
     * Only orders with `status`: `ACTIVE` can be paused.
     * For orders with recurring payments, it also pauses the payment schedule. Buyers are not charged when an order is paused.
     * Pausing an order affects the end date of the order by adding the time the order is paused to the `endDate`.
     * The `endDate` and the `earliestEndDate` for the order are adjusted to include the pause period when the order is resumed.
     *
     * To resume a paused order, call Resume Order.
     * @param _id - Order ID.
     * @public
     * @requiredField _id
     * @permissionId PRICING_PLANS.MANAGE_ORDERS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.membership.v2.orders.OrderManagementService.PauseOrder
     */
    function pauseOrder(_id: string): Promise<void>;
    interface BulkPauseOrderOptions {
        /** Set to true to return Order entity in response. */
        returnFullEntity?: boolean;
    }
    /**
     * Resumes a paused order. For orders with recurring payments, it also restarts the payment schedule.
     *
     * Resuming an order causes the following changes:
     * - The order status changes to `"ACTIVE"`.
     * - The `pausePeriods` array is updated.
     * - The `endDate` for the order is adjusted to include the pause period.
     * - For orders with recurring payments, the payment schedule is restarted.
     * - The `earliestEndDate` is adjusted to include the pause period. (This property is reserved for future use).
     *
     * To pause an order, call Pause Order.
     * @param _id - Order ID.
     * @public
     * @requiredField _id
     * @permissionId PRICING_PLANS.MANAGE_ORDERS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.membership.v2.orders.OrderManagementService.ResumeOrder
     */
    function resumeOrder(_id: string): Promise<void>;
    interface BulkResumeOrderOptions {
        /** Set to true to return Order entity in response. */
        returnFullEntity?: boolean;
    }
    type pricingPlansV2OrderOrders_universal_d_Order = Order;
    type pricingPlansV2OrderOrders_universal_d_Buyer = Buyer;
    type pricingPlansV2OrderOrders_universal_d_PriceDetails = PriceDetails;
    type pricingPlansV2OrderOrders_universal_d_PriceDetailsPricingModelOneOf = PriceDetailsPricingModelOneOf;
    type pricingPlansV2OrderOrders_universal_d_Tax = Tax;
    type pricingPlansV2OrderOrders_universal_d_Coupon = Coupon;
    type pricingPlansV2OrderOrders_universal_d_PricingDetails = PricingDetails;
    type pricingPlansV2OrderOrders_universal_d_PricingDetailsPricingModelOneOf = PricingDetailsPricingModelOneOf;
    type pricingPlansV2OrderOrders_universal_d_SpannedPrice = SpannedPrice;
    type pricingPlansV2OrderOrders_universal_d_PriceDuration = PriceDuration;
    type pricingPlansV2OrderOrders_universal_d_Price = Price;
    type pricingPlansV2OrderOrders_universal_d_OrderType = OrderType;
    const pricingPlansV2OrderOrders_universal_d_OrderType: typeof OrderType;
    type pricingPlansV2OrderOrders_universal_d_OrderMethod = OrderMethod;
    const pricingPlansV2OrderOrders_universal_d_OrderMethod: typeof OrderMethod;
    type pricingPlansV2OrderOrders_universal_d_OrderStatus = OrderStatus;
    const pricingPlansV2OrderOrders_universal_d_OrderStatus: typeof OrderStatus;
    type pricingPlansV2OrderOrders_universal_d_Cancellation = Cancellation;
    type pricingPlansV2OrderOrders_universal_d_CancellationCause = CancellationCause;
    const pricingPlansV2OrderOrders_universal_d_CancellationCause: typeof CancellationCause;
    type pricingPlansV2OrderOrders_universal_d_CancellationEffectiveAt = CancellationEffectiveAt;
    const pricingPlansV2OrderOrders_universal_d_CancellationEffectiveAt: typeof CancellationEffectiveAt;
    type pricingPlansV2OrderOrders_universal_d_PaymentStatus = PaymentStatus;
    const pricingPlansV2OrderOrders_universal_d_PaymentStatus: typeof PaymentStatus;
    type pricingPlansV2OrderOrders_universal_d_PausePeriod = PausePeriod;
    type pricingPlansV2OrderOrders_universal_d_Status = Status;
    const pricingPlansV2OrderOrders_universal_d_Status: typeof Status;
    type pricingPlansV2OrderOrders_universal_d_CurrentCycle = CurrentCycle;
    type pricingPlansV2OrderOrders_universal_d_OrderCycle = OrderCycle;
    type pricingPlansV2OrderOrders_universal_d_FormData = FormData;
    type pricingPlansV2OrderOrders_universal_d_Empty = Empty;
    type pricingPlansV2OrderOrders_universal_d_MemberGetOrderRequest = MemberGetOrderRequest;
    type pricingPlansV2OrderOrders_universal_d_Set = Set;
    const pricingPlansV2OrderOrders_universal_d_Set: typeof Set;
    type pricingPlansV2OrderOrders_universal_d_MemberGetOrderResponse = MemberGetOrderResponse;
    type pricingPlansV2OrderOrders_universal_d_MemberListOrdersRequest = MemberListOrdersRequest;
    type pricingPlansV2OrderOrders_universal_d_MemberListOrdersResponse = MemberListOrdersResponse;
    type pricingPlansV2OrderOrders_universal_d_QueryOrdersRequest = QueryOrdersRequest;
    type pricingPlansV2OrderOrders_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
    type pricingPlansV2OrderOrders_universal_d_CursorPaging = CursorPaging;
    type pricingPlansV2OrderOrders_universal_d_QueryOrdersResponse = QueryOrdersResponse;
    type pricingPlansV2OrderOrders_universal_d_RequestCancellationRequest = RequestCancellationRequest;
    type pricingPlansV2OrderOrders_universal_d_RequestCancellationResponse = RequestCancellationResponse;
    type pricingPlansV2OrderOrders_universal_d_OrderCanceled = OrderCanceled;
    type pricingPlansV2OrderOrders_universal_d_CreateOnlineOrderRequest = CreateOnlineOrderRequest;
    type pricingPlansV2OrderOrders_universal_d_OnBehalf = OnBehalf;
    type pricingPlansV2OrderOrders_universal_d_CreateOnlineOrderResponse = CreateOnlineOrderResponse;
    type pricingPlansV2OrderOrders_universal_d_CouponsError = CouponsError;
    type pricingPlansV2OrderOrders_universal_d_CreateGuestOnlineOrderRequest = CreateGuestOnlineOrderRequest;
    type pricingPlansV2OrderOrders_universal_d_Captcha = Captcha;
    type pricingPlansV2OrderOrders_universal_d_Guest = Guest;
    type pricingPlansV2OrderOrders_universal_d_CreateGuestOnlineOrderResponse = CreateGuestOnlineOrderResponse;
    type pricingPlansV2OrderOrders_universal_d_CreateOfflineOrderRequest = CreateOfflineOrderRequest;
    type pricingPlansV2OrderOrders_universal_d_CreateOfflineOrderResponse = CreateOfflineOrderResponse;
    type pricingPlansV2OrderOrders_universal_d_CreateExternalOrderRequest = CreateExternalOrderRequest;
    type pricingPlansV2OrderOrders_universal_d_CreateExternalOrderResponse = CreateExternalOrderResponse;
    type pricingPlansV2OrderOrders_universal_d_GetOnlineOrderPreviewRequest = GetOnlineOrderPreviewRequest;
    type pricingPlansV2OrderOrders_universal_d_GetOnlineOrderPreviewResponse = GetOnlineOrderPreviewResponse;
    type pricingPlansV2OrderOrders_universal_d_GetGuestOnlineOrderPreviewRequest = GetGuestOnlineOrderPreviewRequest;
    type pricingPlansV2OrderOrders_universal_d_GetGuestOnlineOrderPreviewResponse = GetGuestOnlineOrderPreviewResponse;
    type pricingPlansV2OrderOrders_universal_d_GetOfflineOrderPreviewRequest = GetOfflineOrderPreviewRequest;
    type pricingPlansV2OrderOrders_universal_d_GetOfflineOrderPreviewResponse = GetOfflineOrderPreviewResponse;
    type pricingPlansV2OrderOrders_universal_d_GetPricePreviewRequest = GetPricePreviewRequest;
    type pricingPlansV2OrderOrders_universal_d_GetPricePreviewResponse = GetPricePreviewResponse;
    type pricingPlansV2OrderOrders_universal_d_ChangeStartDateRequest = ChangeStartDateRequest;
    type pricingPlansV2OrderOrders_universal_d_ChangeStartDateResponse = ChangeStartDateResponse;
    type pricingPlansV2OrderOrders_universal_d_OrderStartDateChanged = OrderStartDateChanged;
    type pricingPlansV2OrderOrders_universal_d_ApplyCouponRequest = ApplyCouponRequest;
    type pricingPlansV2OrderOrders_universal_d_ApplyCouponResponse = ApplyCouponResponse;
    type pricingPlansV2OrderOrders_universal_d_SetSubmissionRequest = SetSubmissionRequest;
    type pricingPlansV2OrderOrders_universal_d_SetSubmissionResponse = SetSubmissionResponse;
    type pricingPlansV2OrderOrders_universal_d_OrderPurchased = OrderPurchased;
    type pricingPlansV2OrderOrders_universal_d_OrderStarted = OrderStarted;
    type pricingPlansV2OrderOrders_universal_d_OrderCycleStarted = OrderCycleStarted;
    type pricingPlansV2OrderOrders_universal_d_OrderAutoRenewCanceled = OrderAutoRenewCanceled;
    type pricingPlansV2OrderOrders_universal_d_OrderEnded = OrderEnded;
    type pricingPlansV2OrderOrders_universal_d_GetOrderRequest = GetOrderRequest;
    type pricingPlansV2OrderOrders_universal_d_GetOrderResponse = GetOrderResponse;
    type pricingPlansV2OrderOrders_universal_d_ListOrdersRequest = ListOrdersRequest;
    type pricingPlansV2OrderOrders_universal_d_ListOrdersResponse = ListOrdersResponse;
    type pricingPlansV2OrderOrders_universal_d_OrdersQueryOrdersRequest = OrdersQueryOrdersRequest;
    type pricingPlansV2OrderOrders_universal_d_OrdersQueryOrdersResponse = OrdersQueryOrdersResponse;
    type pricingPlansV2OrderOrders_universal_d_GetOrdersStatsRequest = GetOrdersStatsRequest;
    type pricingPlansV2OrderOrders_universal_d_GetOrdersStatsResponse = GetOrdersStatsResponse;
    type pricingPlansV2OrderOrders_universal_d_GetAvailableOrderActionsRequest = GetAvailableOrderActionsRequest;
    type pricingPlansV2OrderOrders_universal_d_GetAvailableOrderActionsResponse = GetAvailableOrderActionsResponse;
    type pricingPlansV2OrderOrders_universal_d_ReasonNotSuspendable = ReasonNotSuspendable;
    const pricingPlansV2OrderOrders_universal_d_ReasonNotSuspendable: typeof ReasonNotSuspendable;
    type pricingPlansV2OrderOrders_universal_d_PostponeEndDateRequest = PostponeEndDateRequest;
    type pricingPlansV2OrderOrders_universal_d_PostponeEndDateResponse = PostponeEndDateResponse;
    type pricingPlansV2OrderOrders_universal_d_OrderEndDatePostponed = OrderEndDatePostponed;
    type pricingPlansV2OrderOrders_universal_d_CancelOrderRequest = CancelOrderRequest;
    type pricingPlansV2OrderOrders_universal_d_CancelOrderResponse = CancelOrderResponse;
    type pricingPlansV2OrderOrders_universal_d_MarkAsPaidRequest = MarkAsPaidRequest;
    type pricingPlansV2OrderOrders_universal_d_MarkAsPaidResponse = MarkAsPaidResponse;
    type pricingPlansV2OrderOrders_universal_d_OrderMarkedAsPaid = OrderMarkedAsPaid;
    type pricingPlansV2OrderOrders_universal_d_PauseOrderRequest = PauseOrderRequest;
    type pricingPlansV2OrderOrders_universal_d_PauseOrderResponse = PauseOrderResponse;
    type pricingPlansV2OrderOrders_universal_d_OrderPaused = OrderPaused;
    type pricingPlansV2OrderOrders_universal_d_BulkPauseOrderRequest = BulkPauseOrderRequest;
    type pricingPlansV2OrderOrders_universal_d_BulkPauseOrderResponse = BulkPauseOrderResponse;
    type pricingPlansV2OrderOrders_universal_d_BulkOrderResult = BulkOrderResult;
    type pricingPlansV2OrderOrders_universal_d_ResumeOrderRequest = ResumeOrderRequest;
    type pricingPlansV2OrderOrders_universal_d_ResumeOrderResponse = ResumeOrderResponse;
    type pricingPlansV2OrderOrders_universal_d_OrderResumed = OrderResumed;
    type pricingPlansV2OrderOrders_universal_d_BulkResumeOrderRequest = BulkResumeOrderRequest;
    type pricingPlansV2OrderOrders_universal_d_BulkResumeOrderResponse = BulkResumeOrderResponse;
    const pricingPlansV2OrderOrders_universal_d_memberGetOrder: typeof memberGetOrder;
    type pricingPlansV2OrderOrders_universal_d_MemberGetOrderOptions = MemberGetOrderOptions;
    const pricingPlansV2OrderOrders_universal_d_memberListOrders: typeof memberListOrders;
    type pricingPlansV2OrderOrders_universal_d_MemberListOrdersOptions = MemberListOrdersOptions;
    const pricingPlansV2OrderOrders_universal_d_requestCancellation: typeof requestCancellation;
    const pricingPlansV2OrderOrders_universal_d_createOnlineOrder: typeof createOnlineOrder;
    type pricingPlansV2OrderOrders_universal_d_CreateOnlineOrderOptions = CreateOnlineOrderOptions;
    type pricingPlansV2OrderOrders_universal_d_CreateGuestOnlineOrderOptions = CreateGuestOnlineOrderOptions;
    const pricingPlansV2OrderOrders_universal_d_createOfflineOrder: typeof createOfflineOrder;
    type pricingPlansV2OrderOrders_universal_d_CreateOfflineOrderOptions = CreateOfflineOrderOptions;
    type pricingPlansV2OrderOrders_universal_d_CreateExternalOrderOptions = CreateExternalOrderOptions;
    const pricingPlansV2OrderOrders_universal_d_getOnlineOrderPreview: typeof getOnlineOrderPreview;
    type pricingPlansV2OrderOrders_universal_d_GetOnlineOrderPreviewOptions = GetOnlineOrderPreviewOptions;
    type pricingPlansV2OrderOrders_universal_d_GetGuestOnlineOrderPreviewOptions = GetGuestOnlineOrderPreviewOptions;
    const pricingPlansV2OrderOrders_universal_d_getOfflineOrderPreview: typeof getOfflineOrderPreview;
    type pricingPlansV2OrderOrders_universal_d_GetOfflineOrderPreviewOptions = GetOfflineOrderPreviewOptions;
    const pricingPlansV2OrderOrders_universal_d_getPricePreview: typeof getPricePreview;
    type pricingPlansV2OrderOrders_universal_d_GetPricePreviewOptions = GetPricePreviewOptions;
    const pricingPlansV2OrderOrders_universal_d_managementGetOrder: typeof managementGetOrder;
    type pricingPlansV2OrderOrders_universal_d_ManagementGetOrderOptions = ManagementGetOrderOptions;
    const pricingPlansV2OrderOrders_universal_d_managementListOrders: typeof managementListOrders;
    type pricingPlansV2OrderOrders_universal_d_ManagementListOrdersOptions = ManagementListOrdersOptions;
    type pricingPlansV2OrderOrders_universal_d_ManagementQueryOrdersOptions = ManagementQueryOrdersOptions;
    const pricingPlansV2OrderOrders_universal_d_postponeEndDate: typeof postponeEndDate;
    const pricingPlansV2OrderOrders_universal_d_cancelOrder: typeof cancelOrder;
    const pricingPlansV2OrderOrders_universal_d_markAsPaid: typeof markAsPaid;
    const pricingPlansV2OrderOrders_universal_d_pauseOrder: typeof pauseOrder;
    type pricingPlansV2OrderOrders_universal_d_BulkPauseOrderOptions = BulkPauseOrderOptions;
    const pricingPlansV2OrderOrders_universal_d_resumeOrder: typeof resumeOrder;
    type pricingPlansV2OrderOrders_universal_d_BulkResumeOrderOptions = BulkResumeOrderOptions;
    namespace pricingPlansV2OrderOrders_universal_d {
        export { pricingPlansV2OrderOrders_universal_d_Order as Order, pricingPlansV2OrderOrders_universal_d_Buyer as Buyer, pricingPlansV2OrderOrders_universal_d_PriceDetails as PriceDetails, pricingPlansV2OrderOrders_universal_d_PriceDetailsPricingModelOneOf as PriceDetailsPricingModelOneOf, pricingPlansV2OrderOrders_universal_d_Tax as Tax, Recurrence$1 as Recurrence, Duration$1 as Duration, PeriodUnit$1 as PeriodUnit, pricingPlansV2OrderOrders_universal_d_Coupon as Coupon, pricingPlansV2OrderOrders_universal_d_PricingDetails as PricingDetails, pricingPlansV2OrderOrders_universal_d_PricingDetailsPricingModelOneOf as PricingDetailsPricingModelOneOf, pricingPlansV2OrderOrders_universal_d_SpannedPrice as SpannedPrice, pricingPlansV2OrderOrders_universal_d_PriceDuration as PriceDuration, pricingPlansV2OrderOrders_universal_d_Price as Price, Fee$1 as Fee, pricingPlansV2OrderOrders_universal_d_OrderType as OrderType, pricingPlansV2OrderOrders_universal_d_OrderMethod as OrderMethod, pricingPlansV2OrderOrders_universal_d_OrderStatus as OrderStatus, pricingPlansV2OrderOrders_universal_d_Cancellation as Cancellation, pricingPlansV2OrderOrders_universal_d_CancellationCause as CancellationCause, pricingPlansV2OrderOrders_universal_d_CancellationEffectiveAt as CancellationEffectiveAt, pricingPlansV2OrderOrders_universal_d_PaymentStatus as PaymentStatus, pricingPlansV2OrderOrders_universal_d_PausePeriod as PausePeriod, pricingPlansV2OrderOrders_universal_d_Status as Status, pricingPlansV2OrderOrders_universal_d_CurrentCycle as CurrentCycle, pricingPlansV2OrderOrders_universal_d_OrderCycle as OrderCycle, pricingPlansV2OrderOrders_universal_d_FormData as FormData, DomainEvent$1 as DomainEvent, DomainEventBodyOneOf$1 as DomainEventBodyOneOf, EntityCreatedEvent$1 as EntityCreatedEvent, RestoreInfo$1 as RestoreInfo, EntityUpdatedEvent$1 as EntityUpdatedEvent, EntityDeletedEvent$1 as EntityDeletedEvent, ActionEvent$1 as ActionEvent, pricingPlansV2OrderOrders_universal_d_Empty as Empty, pricingPlansV2OrderOrders_universal_d_MemberGetOrderRequest as MemberGetOrderRequest, pricingPlansV2OrderOrders_universal_d_Set as Set, pricingPlansV2OrderOrders_universal_d_MemberGetOrderResponse as MemberGetOrderResponse, pricingPlansV2OrderOrders_universal_d_MemberListOrdersRequest as MemberListOrdersRequest, Sorting$1 as Sorting, SortOrder$1 as SortOrder, pricingPlansV2OrderOrders_universal_d_MemberListOrdersResponse as MemberListOrdersResponse, PagingMetadataV2$1 as PagingMetadataV2, Cursors$1 as Cursors, pricingPlansV2OrderOrders_universal_d_QueryOrdersRequest as QueryOrdersRequest, QueryV2$1 as QueryV2, pricingPlansV2OrderOrders_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf, Paging$1 as Paging, pricingPlansV2OrderOrders_universal_d_CursorPaging as CursorPaging, pricingPlansV2OrderOrders_universal_d_QueryOrdersResponse as QueryOrdersResponse, pricingPlansV2OrderOrders_universal_d_RequestCancellationRequest as RequestCancellationRequest, pricingPlansV2OrderOrders_universal_d_RequestCancellationResponse as RequestCancellationResponse, pricingPlansV2OrderOrders_universal_d_OrderCanceled as OrderCanceled, MessageEnvelope$1 as MessageEnvelope, IdentificationData$1 as IdentificationData, IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf, WebhookIdentityType$1 as WebhookIdentityType, pricingPlansV2OrderOrders_universal_d_CreateOnlineOrderRequest as CreateOnlineOrderRequest, pricingPlansV2OrderOrders_universal_d_OnBehalf as OnBehalf, pricingPlansV2OrderOrders_universal_d_CreateOnlineOrderResponse as CreateOnlineOrderResponse, pricingPlansV2OrderOrders_universal_d_CouponsError as CouponsError, pricingPlansV2OrderOrders_universal_d_CreateGuestOnlineOrderRequest as CreateGuestOnlineOrderRequest, pricingPlansV2OrderOrders_universal_d_Captcha as Captcha, pricingPlansV2OrderOrders_universal_d_Guest as Guest, pricingPlansV2OrderOrders_universal_d_CreateGuestOnlineOrderResponse as CreateGuestOnlineOrderResponse, pricingPlansV2OrderOrders_universal_d_CreateOfflineOrderRequest as CreateOfflineOrderRequest, pricingPlansV2OrderOrders_universal_d_CreateOfflineOrderResponse as CreateOfflineOrderResponse, pricingPlansV2OrderOrders_universal_d_CreateExternalOrderRequest as CreateExternalOrderRequest, pricingPlansV2OrderOrders_universal_d_CreateExternalOrderResponse as CreateExternalOrderResponse, pricingPlansV2OrderOrders_universal_d_GetOnlineOrderPreviewRequest as GetOnlineOrderPreviewRequest, pricingPlansV2OrderOrders_universal_d_GetOnlineOrderPreviewResponse as GetOnlineOrderPreviewResponse, pricingPlansV2OrderOrders_universal_d_GetGuestOnlineOrderPreviewRequest as GetGuestOnlineOrderPreviewRequest, pricingPlansV2OrderOrders_universal_d_GetGuestOnlineOrderPreviewResponse as GetGuestOnlineOrderPreviewResponse, pricingPlansV2OrderOrders_universal_d_GetOfflineOrderPreviewRequest as GetOfflineOrderPreviewRequest, pricingPlansV2OrderOrders_universal_d_GetOfflineOrderPreviewResponse as GetOfflineOrderPreviewResponse, pricingPlansV2OrderOrders_universal_d_GetPricePreviewRequest as GetPricePreviewRequest, pricingPlansV2OrderOrders_universal_d_GetPricePreviewResponse as GetPricePreviewResponse, pricingPlansV2OrderOrders_universal_d_ChangeStartDateRequest as ChangeStartDateRequest, pricingPlansV2OrderOrders_universal_d_ChangeStartDateResponse as ChangeStartDateResponse, pricingPlansV2OrderOrders_universal_d_OrderStartDateChanged as OrderStartDateChanged, pricingPlansV2OrderOrders_universal_d_ApplyCouponRequest as ApplyCouponRequest, pricingPlansV2OrderOrders_universal_d_ApplyCouponResponse as ApplyCouponResponse, pricingPlansV2OrderOrders_universal_d_SetSubmissionRequest as SetSubmissionRequest, pricingPlansV2OrderOrders_universal_d_SetSubmissionResponse as SetSubmissionResponse, pricingPlansV2OrderOrders_universal_d_OrderPurchased as OrderPurchased, pricingPlansV2OrderOrders_universal_d_OrderStarted as OrderStarted, pricingPlansV2OrderOrders_universal_d_OrderCycleStarted as OrderCycleStarted, pricingPlansV2OrderOrders_universal_d_OrderAutoRenewCanceled as OrderAutoRenewCanceled, pricingPlansV2OrderOrders_universal_d_OrderEnded as OrderEnded, pricingPlansV2OrderOrders_universal_d_GetOrderRequest as GetOrderRequest, pricingPlansV2OrderOrders_universal_d_GetOrderResponse as GetOrderResponse, pricingPlansV2OrderOrders_universal_d_ListOrdersRequest as ListOrdersRequest, pricingPlansV2OrderOrders_universal_d_ListOrdersResponse as ListOrdersResponse, pricingPlansV2OrderOrders_universal_d_OrdersQueryOrdersRequest as OrdersQueryOrdersRequest, pricingPlansV2OrderOrders_universal_d_OrdersQueryOrdersResponse as OrdersQueryOrdersResponse, pricingPlansV2OrderOrders_universal_d_GetOrdersStatsRequest as GetOrdersStatsRequest, pricingPlansV2OrderOrders_universal_d_GetOrdersStatsResponse as GetOrdersStatsResponse, pricingPlansV2OrderOrders_universal_d_GetAvailableOrderActionsRequest as GetAvailableOrderActionsRequest, pricingPlansV2OrderOrders_universal_d_GetAvailableOrderActionsResponse as GetAvailableOrderActionsResponse, pricingPlansV2OrderOrders_universal_d_ReasonNotSuspendable as ReasonNotSuspendable, pricingPlansV2OrderOrders_universal_d_PostponeEndDateRequest as PostponeEndDateRequest, pricingPlansV2OrderOrders_universal_d_PostponeEndDateResponse as PostponeEndDateResponse, pricingPlansV2OrderOrders_universal_d_OrderEndDatePostponed as OrderEndDatePostponed, pricingPlansV2OrderOrders_universal_d_CancelOrderRequest as CancelOrderRequest, pricingPlansV2OrderOrders_universal_d_CancelOrderResponse as CancelOrderResponse, pricingPlansV2OrderOrders_universal_d_MarkAsPaidRequest as MarkAsPaidRequest, pricingPlansV2OrderOrders_universal_d_MarkAsPaidResponse as MarkAsPaidResponse, pricingPlansV2OrderOrders_universal_d_OrderMarkedAsPaid as OrderMarkedAsPaid, pricingPlansV2OrderOrders_universal_d_PauseOrderRequest as PauseOrderRequest, pricingPlansV2OrderOrders_universal_d_PauseOrderResponse as PauseOrderResponse, pricingPlansV2OrderOrders_universal_d_OrderPaused as OrderPaused, pricingPlansV2OrderOrders_universal_d_BulkPauseOrderRequest as BulkPauseOrderRequest, pricingPlansV2OrderOrders_universal_d_BulkPauseOrderResponse as BulkPauseOrderResponse, pricingPlansV2OrderOrders_universal_d_BulkOrderResult as BulkOrderResult, ItemMetadata$1 as ItemMetadata, ApplicationError$1 as ApplicationError, BulkActionMetadata$1 as BulkActionMetadata, pricingPlansV2OrderOrders_universal_d_ResumeOrderRequest as ResumeOrderRequest, pricingPlansV2OrderOrders_universal_d_ResumeOrderResponse as ResumeOrderResponse, pricingPlansV2OrderOrders_universal_d_OrderResumed as OrderResumed, pricingPlansV2OrderOrders_universal_d_BulkResumeOrderRequest as BulkResumeOrderRequest, pricingPlansV2OrderOrders_universal_d_BulkResumeOrderResponse as BulkResumeOrderResponse, pricingPlansV2OrderOrders_universal_d_memberGetOrder as memberGetOrder, pricingPlansV2OrderOrders_universal_d_MemberGetOrderOptions as MemberGetOrderOptions, pricingPlansV2OrderOrders_universal_d_memberListOrders as memberListOrders, pricingPlansV2OrderOrders_universal_d_MemberListOrdersOptions as MemberListOrdersOptions, PlansQueryResult$1 as PlansQueryResult, PlansQueryBuilder$1 as PlansQueryBuilder, pricingPlansV2OrderOrders_universal_d_requestCancellation as requestCancellation, pricingPlansV2OrderOrders_universal_d_createOnlineOrder as createOnlineOrder, pricingPlansV2OrderOrders_universal_d_CreateOnlineOrderOptions as CreateOnlineOrderOptions, pricingPlansV2OrderOrders_universal_d_CreateGuestOnlineOrderOptions as CreateGuestOnlineOrderOptions, pricingPlansV2OrderOrders_universal_d_createOfflineOrder as createOfflineOrder, pricingPlansV2OrderOrders_universal_d_CreateOfflineOrderOptions as CreateOfflineOrderOptions, pricingPlansV2OrderOrders_universal_d_CreateExternalOrderOptions as CreateExternalOrderOptions, pricingPlansV2OrderOrders_universal_d_getOnlineOrderPreview as getOnlineOrderPreview, pricingPlansV2OrderOrders_universal_d_GetOnlineOrderPreviewOptions as GetOnlineOrderPreviewOptions, pricingPlansV2OrderOrders_universal_d_GetGuestOnlineOrderPreviewOptions as GetGuestOnlineOrderPreviewOptions, pricingPlansV2OrderOrders_universal_d_getOfflineOrderPreview as getOfflineOrderPreview, pricingPlansV2OrderOrders_universal_d_GetOfflineOrderPreviewOptions as GetOfflineOrderPreviewOptions, pricingPlansV2OrderOrders_universal_d_getPricePreview as getPricePreview, pricingPlansV2OrderOrders_universal_d_GetPricePreviewOptions as GetPricePreviewOptions, pricingPlansV2OrderOrders_universal_d_managementGetOrder as managementGetOrder, pricingPlansV2OrderOrders_universal_d_ManagementGetOrderOptions as ManagementGetOrderOptions, pricingPlansV2OrderOrders_universal_d_managementListOrders as managementListOrders, pricingPlansV2OrderOrders_universal_d_ManagementListOrdersOptions as ManagementListOrdersOptions, pricingPlansV2OrderOrders_universal_d_ManagementQueryOrdersOptions as ManagementQueryOrdersOptions, pricingPlansV2OrderOrders_universal_d_postponeEndDate as postponeEndDate, pricingPlansV2OrderOrders_universal_d_cancelOrder as cancelOrder, pricingPlansV2OrderOrders_universal_d_markAsPaid as markAsPaid, pricingPlansV2OrderOrders_universal_d_pauseOrder as pauseOrder, pricingPlansV2OrderOrders_universal_d_BulkPauseOrderOptions as BulkPauseOrderOptions, pricingPlansV2OrderOrders_universal_d_resumeOrder as resumeOrder, pricingPlansV2OrderOrders_universal_d_BulkResumeOrderOptions as BulkResumeOrderOptions, };
    }
    /** Information about the pricing plan. */
    interface Plan {
        /**
         * Plan ID.
         * @readonly
         */
        _id?: string;
        /** Plan name. */
        name?: string | null;
        /** Plan description. */
        description?: string | null;
        /**
         * List of text strings that promote what is included with this plan.
         *
         * For example, "Plenty of parking" or "Free gift on your birthday".
         */
        perks?: StringList;
        /** Plan price, payment schedule, and expiration. */
        pricing?: Pricing;
        /** Whether the plan is public (visible to site visitors and members). */
        public?: boolean | null;
        /**
         * Whether the plan is archived. Archived plans are not visible and can't be purchased anymore, but existing purchases remain in effect.
         * @readonly
         */
        archived?: boolean;
        /**
         * Whether the plan is marked as primary. If `true`, the plan is highlighted on the site with a custom ribbon.
         *
         * Default: `false`.
         * @readonly
         */
        primary?: boolean;
        /**
         * Whether the plan has any orders (including pending and unpaid orders).
         * @readonly
         */
        hasOrders?: boolean;
        /**
         * Date plan was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date plan was last updated.
         * @readonly
         */
        _updatedDate?: Date;
        /**
         * URL-friendly version of plan name. Unique across all plans in the same site.
         * @readonly
         */
        slug?: string | null;
        /**
         * Number of times the same buyer can purchase the plan. Currently limited to support:
         * - Empty value or a value of `0`, meaning no limitation.
         * - Value of `1`, meaning limited to one purchase per buyer.
         */
        maxPurchasesPerBuyer?: number | null;
        /**
         * Whether the buyer can start the plan at a later date.
         *
         * Default: `false`.
         *
         */
        allowFutureStartDate?: boolean | null;
        /**
         * Whether the buyer is allowed to cancel their plan. If `false`, calling the [`requestCancellation()`](https://www.wix.com/velo/reference/wix-pricing-plans-v2/orders/requestcancellation) function returns an error.
         *
         * Default: `true`.
         *
         */
        buyerCanCancel?: boolean | null;
        /** Any terms and conditions that apply to the plan. This information will be displayed during checkout. */
        termsAndConditions?: string | null;
        /** ID of the form associated with the plan at checkout. */
        formId?: string | null;
    }
    /** This wrapper type exist in order to distinguish an empty string list from no list at all in update requests. */
    interface StringList {
        values?: string[];
    }
    /** Plan pricing information. Includes the price of the plan and payment details. */
    interface Pricing extends PricingPricingModelOneOf {
        /**
         * Pricing model indicating that the plan has recurring payments.
         *
         * Note: This type of subscription is not a "Wix subscription," which encompasses various types of subscriptions, such as Wix Stores subscriptions, Wix invoice subscriptions, and *all* pricing plan models.
         */
        subscription?: Recurrence;
        /** Pricing model indicating a single payment per cycle and the length of the cycle. The cycle is the duration of the plan, not a payment cycle. */
        singlePaymentForDuration?: Duration;
        /** Pricing model indicating the plan is paid in one single payment. The plan is valid until canceled.   */
        singlePaymentUnlimited?: boolean | null;
        /** Amount for a single payment. For subscriptions, this is the amount to pay each payment cycle and it is required. For plans that are not recurring plans, it is the single payment amount for the whole subscription.  */
        price?: Money;
        /** Free trial period for the plan in days. Available only for recurring plans, meaning plans whose pricing model is `subscription`. Set to `0` to remove the free trial.  */
        freeTrialDays?: number | null;
    }
    /** @oneof */
    interface PricingPricingModelOneOf {
        /** Plan has recurring payments. */
        subscription?: Recurrence;
        /** One time payment, plan is valid for the specified duration. */
        singlePaymentForDuration?: Duration;
        /** One time payment, plan is valid until it is canceled. */
        singlePaymentUnlimited?: boolean | null;
    }
    /** An object specifying how often and for how long payments recur (may be forever). */
    interface Recurrence {
        /** Length of one payment cycle. For example, 1 month to have monthly payments. Multiply `cycleDuration`'s `count` by `cycleCount` to get the subscription duration. Currently, only a value of `1` is supported.  */
        cycleDuration?: Duration;
        /**
         * Amount of payment cycles the subscription is valid for.
         *
         * `0` for unlimited plans or for plans that are valid until canceled.
         */
        cycleCount?: number | null;
    }
    /** A duration expressed in number of time units. */
    interface Duration {
        /** Number of days days, months, weeks, or years in a single payment cycle. Currently limited to support only `1`.  */
        count?: number | null;
        /** Unit of time for the cycle duration. */
        unit?: PeriodUnit;
    }
    enum PeriodUnit {
        UNDEFINED = "UNDEFINED",
        DAY = "DAY",
        WEEK = "WEEK",
        MONTH = "MONTH",
        YEAR = "YEAR"
    }
    interface Money {
        /** Monetary amount. Decimal string with a period as a decimal separator. For example, `'3.99'`. Cannot be a negative value.   */
        value?: string;
        /**
         * Currency code. Three-letter currency code in
         * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. For example, `'USD'`.
         */
        currency?: string;
    }
    interface FeeConfig {
        /** Fee configuration. */
        fee?: Fee;
        /** The time this fee will be charged */
        appliedAt?: AppliedAt;
    }
    interface Fee {
        /** Fee name */
        name?: string;
        /** Amount of fee to be charged */
        amount?: string;
    }
    enum AppliedAt {
        UNKNOWN_CHARGE_EVENT = "UNKNOWN_CHARGE_EVENT",
        /** Will charge the fee on first payment. If order has a free trial meaning it will charge after the free trial. */
        FIRST_PAYMENT = "FIRST_PAYMENT"
    }
    interface ListPublicPlansRequest {
        /**
         * Number of pricing plans to list.
         *
         * Default: `75`.
         */
        limit?: number | null;
        /**
         * Number of pricing plans to skip.
         *
         * Default: `0`.
         */
        offset?: number | null;
        /** IDs of public plans to list. If non-existent IDs are specified, they are ignored and don't cause errors. If no IDs are specified, all public are listed according to the [order](#arrangeplans) displayed in the Dashboard. You can pass a maximum of 100 IDs.  */
        planIds?: string[];
    }
    interface ListPublicPlansResponse {
        /** List of public pricing plans. */
        plans?: PublicPlan[];
        /** Details on the paged set of public pricing plans returned.  */
        pagingMetadata?: PagingMetadataV2;
    }
    /** Public plan entity containing information about the pricing plan. Can be read by any site member or visitor. */
    interface PublicPlan {
        /** Plan ID. */
        _id?: string;
        /** Plan name. */
        name?: string | null;
        /** Plan description. */
        description?: string | null;
        /** What is included with this plan (e.g., 1 weekly entrance to a specific class). */
        perks?: StringList;
        /** Plan price, payment schedule, and expiration. */
        pricing?: Pricing;
        /** Whether the plan is marked as primary. */
        primary?: boolean;
        /** Date plan was created. */
        _createdDate?: Date;
        /** Date plan was last updated. */
        _updatedDate?: Date;
        /** URL-friendly version of plan name. Unique across all plans in the same site. */
        slug?: string | null;
        /** Number of times the same buyer can purchase the plan. An empty value or a value of zero means no limitation. */
        maxPurchasesPerBuyer?: number | null;
        /** Whether the buyer can start the plan at a later date. Defaults to false. */
        allowFutureStartDate?: boolean | null;
        /** Whether the buyer is allowed to cancel their plan. Defaults to false. */
        buyerCanCancel?: boolean | null;
        /** Any terms and conditions that apply to the plan. This information will be displayed during checkout. */
        termsAndConditions?: string | null;
        /** ID of the form associated with the plan at checkout. */
        formId?: string | null;
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
    }
    interface Cursors {
        /** Cursor string pointing to the next page in the list of results. */
        next?: string | null;
        /** Cursor pointing to the previous page in the list of results. */
        prev?: string | null;
    }
    interface QueryPublicPlansRequest {
        /** Query */
        query?: QueryV2;
    }
    interface QueryV2 {
        /** A filter object. See [supported fields and operators](https://dev.wix.com/api/rest/wix-pricing-plans/pricing-plans/plans/filter-and-sort#wix-pricing-plans_pricing-plans_plans_filter-and-sort_query-public-plans) */
        filter?: Record<string, any> | null;
        /** Sort object in the form [{"fieldName":"sortField1"},{"fieldName":"sortField2","direction":"DESC"}] */
        sort?: Sorting[];
        /** Pointer to page of results using offset. Can not be used together with 'cursorPaging' */
        paging?: Paging;
    }
    interface Sorting {
        /** Name of the field to sort by. */
        fieldName?: string;
        /** Sort order. */
        order?: SortOrder;
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
    interface QueryPublicPlansResponse {
        /** List of public pricing plans that match the specified query. */
        plans?: PublicPlan[];
        /** Object containing paging-related data (number of plans returned, offset). */
        pagingMetadata?: PagingMetadataV2;
    }
    interface GetPlanRequest {
        /** Plan ID. */
        _id: string;
    }
    interface GetPlanResponse {
        /** Pricing plan info.  */
        plan?: Plan;
    }
    interface ListPlansRequest {
        /**
         * Archived filter.
         *
         * Default: `ACTIVE` (not archived).
         */
        archived?: ArchivedFilter;
        /**
         * Visibility filter.
         *
         * Default: `PUBLIC_AND_HIDDEN` (meaning, both public and hidden plans are listed).
         *
         */
        public?: PublicFilter;
        /**
         * Number of pricing plans to list.
         *
         * Default: `75`.
         */
        limit?: number | null;
        /**
         * Number of pricing plans to skip.
         *
         * Default: `0`.
         */
        offset?: number | null;
        /** IDs of plans to list. If non-existent IDs are specified, they are ignored and don't cause errors. If no IDs are specified, all public and hidden plans (based on `options`) are listed according to the [order](#arrangeplans) displayed in the Dashboard. You can pass a maximum of 100 IDs.  */
        planIds?: string[];
    }
    enum ArchivedFilter {
        /** Returns all plans that are active. */
        ACTIVE = "ACTIVE",
        /** Returns all plans that are archived. */
        ARCHIVED = "ARCHIVED",
        /** Returns all plans that are active and archived. */
        ARCHIVED_AND_ACTIVE = "ARCHIVED_AND_ACTIVE"
    }
    enum PublicFilter {
        /** Returns all public and hidden plans. */
        PUBLIC_AND_HIDDEN = "PUBLIC_AND_HIDDEN",
        /** Returns only public plans. */
        PUBLIC = "PUBLIC",
        /** Returns only hidden plans. */
        HIDDEN = "HIDDEN"
    }
    interface ListPlansResponse {
        /** List of all public and hidden pricing plans. */
        plans?: Plan[];
        /** Details on the paged set of pricing plans returned.  */
        pagingMetadata?: PagingMetadataV2;
    }
    interface GetPlanStatsRequest {
    }
    interface GetPlanStatsResponse {
        /** Total number of plans created, including active plans (both public and hidden) and archived plans. */
        totalPlans?: number;
    }
    interface CreatePlanRequest {
        /** Information for the plan being created. */
        plan: Plan;
    }
    interface CreatePlanResponse {
        /** Plan info.  */
        plan?: Plan;
    }
    interface UpdatePlanRequest {
        /** Plan info to update. */
        plan: Plan;
    }
    interface UpdatePlanResponse {
        /** Updated plan info. */
        plan?: Plan;
    }
    interface BuyerCanCancelUpdated {
        /** Pricing plan. */
        plan?: Plan;
    }
    interface SetPlanVisibilityRequest {
        /** The ID of the plan to either display or hide on the site page.  */
        _id: string;
        /** Whether to set the plan as visible. */
        visible: boolean;
    }
    interface SetPlanVisibilityResponse {
        /** Plan info.  */
        plan?: Plan;
    }
    interface MakePlanPrimaryRequest {
        /** ID of the pricing plan to set as the primary plan. */
        _id: string;
    }
    interface MakePlanPrimaryResponse {
        /** Primary plan info. */
        plan?: Plan;
    }
    interface ClearPrimaryRequest {
    }
    interface ClearPrimaryResponse {
    }
    interface ArchivePlanRequest {
        _id: string;
    }
    interface ArchivePlanResponse {
        /** Archived plan info.  */
        plan?: Plan;
    }
    interface PlanArchived {
        /** Pricing plan. */
        plan?: Plan;
    }
    interface BulkArchivePlanRequest {
        /** List of Plan IDs. */
        ids: string[];
        /** Set to true to return Plan entity in response. */
        returnFullEntity?: boolean;
    }
    interface BulkArchivePlanResponse {
        /** Plans to be archived. */
        results?: BulkPlanResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata;
    }
    interface BulkPlanResult {
        /** Item metadata. */
        itemMetadata?: ItemMetadata;
        /** Pricing plan. */
        plan?: Plan;
    }
    interface ItemMetadata {
        /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
        _id?: string | null;
        /** Index of the item within the request array. Allows for correlation between request and response items. */
        originalIndex?: number;
        /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
        success?: boolean;
        /** Details about the error in case of failure. */
        error?: ApplicationError;
    }
    interface ApplicationError {
        /** Error code. */
        code?: string;
        /** Description of the error. */
        description?: string;
        /** Data related to the error. */
        data?: Record<string, any> | null;
    }
    interface BulkActionMetadata {
        /** Number of items that were successfully processed. */
        totalSuccesses?: number;
        /** Number of items that couldn't be processed. */
        totalFailures?: number;
        /** Number of failures without details because detailed failure threshold was exceeded. */
        undetailedFailures?: number;
    }
    interface ArrangePlansRequest {
        /** IDs of all non-archived plans in the order you want them arranged. */
        ids: string[];
    }
    interface ArrangePlansResponse {
    }
    interface CountPlansRequest {
        /** The filter. */
        filter?: Record<string, any> | null;
        /** If true, will count only visible plans (visible and not archived). If no value is given all site's plans will be counted. */
        visibility?: boolean | null;
    }
    interface CountPlansResponse {
        /** Number of plans in the response. */
        count?: number;
    }
    interface GetPlansPremiumStatusRequest {
    }
    interface GetPlansPremiumStatusResponse {
        /** True if site has non-free, non-template plans. */
        hasPaidPlans?: boolean;
        /** True if site has plans that were created before Pricing Plans became a premium app. */
        hasOldPlans?: boolean;
    }
    interface QueryPlansRequest {
        /** Query */
        query?: QueryV2;
    }
    interface QueryPlansResponse {
        /** List of pricing plans that match the specified query. */
        plans?: Plan[];
        /** Object containing paging-related data (number of plans returned, offset). */
        pagingMetadata?: PagingMetadataV2;
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
        eventTime?: Date;
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
        /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
        restoreInfo?: RestoreInfo;
    }
    interface RestoreInfo {
        deletedDate?: Date;
    }
    interface EntityUpdatedEvent {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
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
    /**
     * Retrieves a list of public pricing plans.
     *
     *
     * The `listPublicPlans()` function returns a Promise that resolves to a list of up to 100 public pricing plans. Public plans are visible plans that site visitors can see on the site and purchase.
     * @public
     * @param options - Options for filtering and paging the list of public plans.
     * @permissionId PRICING_PLANS.READ_PUBLIC_PLANS
     * @permissionScope Read Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-PLANS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-ORDERS
     * @permissionScope Manage Portfolio
     * @permissionScopeId SCOPE.PORTFOLIO.MANAGE-PORTFOLIO
     * @permissionScope Manage Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-PLANS
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Fulfilled - List of public pricing plans.
     */
    function listPublicPlans(options?: ListPublicPlansOptions): Promise<ListPublicPlansResponse>;
    interface ListPublicPlansOptions {
        /**
         * Number of pricing plans to list.
         *
         * Default: `75`.
         */
        limit?: number | null;
        /**
         * Number of pricing plans to skip.
         *
         * Default: `0`.
         */
        offset?: number | null;
        /** IDs of public plans to list. If non-existent IDs are specified, they are ignored and don't cause errors. If no IDs are specified, all public are listed according to the [order](#arrangeplans) displayed in the Dashboard. You can pass a maximum of 100 IDs.  */
        planIds?: string[];
    }
    /**
     * Creates a query to retrieve a list of public pricing plans.
     *
     *
     * The `queryPublicPlans()` function builds a query to retrieve a list of up to 1,000 public plans and returns a [`PublicPlansQueryBuilder`](#plansquerybuilder) object.
     *
     * The returned object contains the query definition which is typically used to run the query using the [`find()`](#plansquerybuilder/find) function.
     *
     * You can refine the query by chaining `PublicPlansQueryBuilder` functions onto the query. `PublicPlansQueryBuilder` functions enable you to sort, filter, and control the results that `queryPublicPlans()` returns.
     *
     * `queryPublicPlans()` runs with the following `PublicPlansQueryBuilder` defaults that you can override:
     * - [`skip`](#plansquerybuilder/skip): `0`
     * - [`limit`](#plansquerybuilder/limit): `50`
     *
     * The functions that are chained to `queryPublicPlans()` are applied in the order they are called. For example, if you sort on the `_createdDate` property in ascending order and then on the `_id` property in ascending order, the results are sorted first by the created date of the items and then, if there are multiple results with the same date, the items are sorted by `_id` in ascending order, per created date value.
     *
     * The following `PublicPlansQueryBuilder` functions are supported for the `queryPublicPlans()` function. For a full description of the Plans object, see the object returned for the [`items`](#plansqueryresult/items) property in [`PublicPlansQueryResult`](#plansqueryresult).
     * @public
     * @permissionScope Read Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-PLANS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-ORDERS
     * @permissionScope Manage Portfolio
     * @permissionScopeId SCOPE.PORTFOLIO.MANAGE-PORTFOLIO
     * @permissionScope Manage Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-PLANS
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @permissionId PRICING_PLANS.READ_PUBLIC_PLANS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     */
    function queryPublicPlans(): PlansQueryBuilder;
    interface QueryOffsetResult {
        currentPage: number | undefined;
        totalPages: number | undefined;
        totalCount: number | undefined;
        hasNext: () => boolean;
        hasPrev: () => boolean;
        length: number;
        pageSize: number;
    }
    interface PlansQueryResult extends QueryOffsetResult {
        items: PublicPlan[];
        query: PlansQueryBuilder;
        next: () => Promise<PlansQueryResult>;
        prev: () => Promise<PlansQueryResult>;
    }
    interface PlansQueryBuilder {
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        eq: (propertyName: "_id" | "primary" | "_createdDate" | "_updatedDate" | "slug", value: any) => PlansQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        ne: (propertyName: "_id" | "primary" | "_createdDate" | "_updatedDate" | "slug", value: any) => PlansQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        ge: (propertyName: "_createdDate" | "_updatedDate", value: any) => PlansQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        gt: (propertyName: "_createdDate" | "_updatedDate", value: any) => PlansQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        le: (propertyName: "_createdDate" | "_updatedDate", value: any) => PlansQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        lt: (propertyName: "_createdDate" | "_updatedDate", value: any) => PlansQueryBuilder;
        /** @param propertyName - Property whose value is compared with `string`.
         * @param string - String to compare against. Case-insensitive.
         */
        startsWith: (propertyName: "_id" | "slug", value: string) => PlansQueryBuilder;
        /** @param propertyName - Property whose value is compared with `values`.
         * @param values - List of values to compare against.
         */
        hasSome: (propertyName: "_id" | "primary" | "_createdDate" | "_updatedDate" | "slug", value: any[]) => PlansQueryBuilder;
        in: (propertyName: "_id" | "primary" | "_createdDate" | "_updatedDate" | "slug", value: any) => PlansQueryBuilder;
        exists: (propertyName: "_id" | "primary" | "_createdDate" | "_updatedDate" | "slug", value: boolean) => PlansQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
        ascending: (...propertyNames: Array<"_id" | "primary" | "_createdDate" | "_updatedDate" | "slug">) => PlansQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
        descending: (...propertyNames: Array<"_id" | "primary" | "_createdDate" | "_updatedDate" | "slug">) => PlansQueryBuilder;
        /** @param limit - Number of items to return, which is also the `pageSize` of the results object. */
        limit: (limit: number) => PlansQueryBuilder;
        /** @param skip - Number of items to skip in the query results before returning the results. */
        skip: (skip: number) => PlansQueryBuilder;
        find: () => Promise<PlansQueryResult>;
    }
    /**
     * Retrieves a pricing plan by the specified ID.
     *
     * The `getPlan()` function returns a Promise that resolves to a plan whose ID matched the specified ID.
     * @param _id - Plan ID.
     * @public
     * @requiredField _id
     * @permissionId PRICING_PLANS.READ_PLANS
     * @permissionScope Read Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-PLANS
     * @permissionScope Manage Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-PLANS
     * @applicableIdentity APP
     * @adminMethod
     * @returns Fulfilled - The retrieved plan's information.
     */
    function getPlan(_id: string): Promise<Plan>;
    /**
     * Retrieves a list of pricing plans.
     *
     * The `listPlans()` function returns a Promise that resolves to a list of up to 100 pricing plans. This includes public, hidden, and archived plans.
     * @public
     * @documentationMaturity preview
     * @param options - Options for filtering and paging the list of plans.
     * @permissionId PRICING_PLANS.READ_PLANS
     * @permissionScope Read Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-PLANS
     * @permissionScope Manage Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-PLANS
     * @applicableIdentity APP
     * @adminMethod
     * @returns Fulfilled - List of plans that match the given criteria.
     */
    function listPlans(options?: ListPlansOptions): Promise<ListPlansResponse>;
    interface ListPlansOptions {
        /**
         * Archived filter.
         *
         * Default: `ACTIVE` (not archived).
         */
        archived?: ArchivedFilter;
        /**
         * Visibility filter.
         *
         * Default: `PUBLIC_AND_HIDDEN` (meaning, both public and hidden plans are listed).
         *
         */
        public?: PublicFilter;
        /**
         * Number of pricing plans to list.
         *
         * Default: `75`.
         */
        limit?: number | null;
        /**
         * Number of pricing plans to skip.
         *
         * Default: `0`.
         */
        offset?: number | null;
        /** IDs of plans to list. If non-existent IDs are specified, they are ignored and don't cause errors. If no IDs are specified, all public and hidden plans (based on `options`) are listed according to the [order](#arrangeplans) displayed in the Dashboard. You can pass a maximum of 100 IDs.  */
        planIds?: string[];
    }
    /**
     * Retrieves statistics about the pricing plans.
     *
     *
     * The `getPlanStats()` function returns a Promise that resolves to statistics about the plan on the site.
     *
     * Currently this function provides only the total number of pricing plans, including archived plans.
     * @public
     * @permissionId PRICING_PLANS.READ_PLANS
     * @permissionScope Read Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-PLANS
     * @permissionScope Manage Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-PLANS
     * @applicableIdentity APP
     * @adminMethod
     * @returns Fulfilled - Overall statistics about the pricing plans.
     */
    function getPlanStats(): Promise<GetPlanStatsResponse>;
    /**
     * Creates a pricing plan.
     *
     *
     * The `createPlan()` function returns a Promise that resolves to a newly-created pricing plan after is has successfully been created.
     *
     * The passed `plan` object must contain a [pricing model](https://www.wix.com/velo/reference/wix-pricing-plans-v2/plans/pricing-models). A pricing model can be one of the following:
     * - **A subscription**: A subscription with recurring payment and how often the plan occurs. Subscriptions can have free trial days.
     * - **A plan that does not renew**: A single payment for a specific duration that doesn't renew.
     * - **An unlimited plan**: A single payment for an unlimited amount of time (until canceled).
     *
     * Pricing plans created by this function are available to the site owner in the Pricing Plans section in the Dashboard.
     * @public
     * @requiredField plan
     * @requiredField plan.name
     * @requiredField plan.pricing
     * @requiredField plan.pricing.singlePaymentForDuration.count
     * @requiredField plan.pricing.subscription.cycleCount
     * @requiredField plan.pricing.subscription.cycleDuration
     * @requiredField plan.pricing.subscription.cycleDuration.count
     * @param plan - Information for the plan being created.
     * @permissionId PRICING_PLANS.MANAGE_PLANS
     * @permissionScope Manage Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-PLANS
     * @applicableIdentity APP
     * @adminMethod
     * @returns Fulfilled - The created plan.
     *
     * Rejected - Error message.
     */
    function createPlan(plan: Plan): Promise<Plan>;
    /**
     * Updates a pricing plan.
     *
     *
     * The `updatePlan()` function returns a Promise that resolves to an updated plan.
     *
     * Updating a plan does not impact existing purchases made for the plan. All purchases keep the details of the original plan that was active at the time of the purchase.
     * @public
     * @requiredField _id
     * @requiredField plan
     * @param _id - ID of the plan to update.
     * @param options - Options for updating the plan.
     * @permissionId PRICING_PLANS.MANAGE_PLANS
     * @permissionScope Manage Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-PLANS
     * @applicableIdentity APP
     * @adminMethod
     * @returns Fulfilled - The updated plan.
     *
     * Rejected - Error message.
     */
    function updatePlan(_id: string, plan: UpdatePlan, options?: UpdatePlanOptions): Promise<Plan>;
    interface UpdatePlan {
        /**
         * Plan ID.
         * @readonly
         */
        _id?: string;
        /** Plan name. */
        name?: string | null;
        /** Plan description. */
        description?: string | null;
        /**
         * List of text strings that promote what is included with this plan.
         *
         * For example, "Plenty of parking" or "Free gift on your birthday".
         */
        perks?: StringList;
        /** Plan price, payment schedule, and expiration. */
        pricing?: Pricing;
        /** Whether the plan is public (visible to site visitors and members). */
        public?: boolean | null;
        /**
         * Whether the plan is archived. Archived plans are not visible and can't be purchased anymore, but existing purchases remain in effect.
         * @readonly
         */
        archived?: boolean;
        /**
         * Whether the plan is marked as primary. If `true`, the plan is highlighted on the site with a custom ribbon.
         *
         * Default: `false`.
         * @readonly
         */
        primary?: boolean;
        /**
         * Whether the plan has any orders (including pending and unpaid orders).
         * @readonly
         */
        hasOrders?: boolean;
        /**
         * Date plan was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date plan was last updated.
         * @readonly
         */
        _updatedDate?: Date;
        /**
         * URL-friendly version of plan name. Unique across all plans in the same site.
         * @readonly
         */
        slug?: string | null;
        /**
         * Number of times the same buyer can purchase the plan. Currently limited to support:
         * - Empty value or a value of `0`, meaning no limitation.
         * - Value of `1`, meaning limited to one purchase per buyer.
         */
        maxPurchasesPerBuyer?: number | null;
        /**
         * Whether the buyer can start the plan at a later date.
         *
         * Default: `false`.
         *
         */
        allowFutureStartDate?: boolean | null;
        /**
         * Whether the buyer is allowed to cancel their plan. If `false`, calling the [`requestCancellation()`](https://www.wix.com/velo/reference/wix-pricing-plans-v2/orders/requestcancellation) function returns an error.
         *
         * Default: `true`.
         *
         */
        buyerCanCancel?: boolean | null;
        /** Any terms and conditions that apply to the plan. This information will be displayed during checkout. */
        termsAndConditions?: string | null;
        /** ID of the form associated with the plan at checkout. */
        formId?: string | null;
    }
    interface UpdatePlanOptions {
    }
    /**
     * Sets visibility for non-archived pricing plans.
     *
     * The `setPlanVisibility()` functions returns a Promise that resolves to a pricing plan when its visibility has successfully been set.
     *
     * By default, pricing plans are public, meaning they are visible. [Plans can be hidden](https://support.wix.com/en/article/pricing-plans-removing-a-plan-from-your-site#hiding-plans) so that site members and visitors cannot see or choose them.
     *
     * As opposed to archiving, setting visibility can be reversed. This means that a public plan can be hidden, and a hidden plan can be made public (visible).
     *
     * >**Note:** An archived plan always remains archived and cannot be made active again. When archiving a plan, its `public` property is automatically set to `false` so that it is hidden.
     *
     * Changing a plan's visibility does not impact existing orders for the plan. All orders for hidden plans are still active and keep their terms and payment options.
     * @param visible - Whether to set the plan as visible.
     * @public
     * @requiredField _id
     * @requiredField visible
     * @param _id - The ID of the plan to either display or hide on the site page.
     * @param options - Plan visibility options.
     * @permissionId PRICING_PLANS.MANAGE_PLANS
     * @permissionScope Manage Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-PLANS
     * @applicableIdentity APP
     * @adminMethod
     * @returns Fulfilled - The plan's information.
     *
     * Rejected - Error message.
     */
    function setPlanVisibility(_id: string, visible: boolean): Promise<SetPlanVisibilityResponse>;
    /**
     * Marks a pricing plan as the primary pricing plan.
     *
     *
     * The `makePlanPrimary()` function returns a Promise that resolves to the now primary pricing plan.
     *
     * Only a single plan can be marked as a primary plan at any given time. If there is an existing plan marked as primary, calling `makePlanPrimary()` causes the existing primary plan to lose its primary status.
     *
     * When viewing pricing plans on the site, the primary plan is highlighted with a customizable ribbon.
     * @public
     * @requiredField _id
     * @param _id - ID of the pricing plan to set as the primary plan.
     * @permissionId PRICING_PLANS.MANAGE_PLANS
     * @permissionScope Manage Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-PLANS
     * @applicableIdentity APP
     * @adminMethod
     * @returns Fulfilled - The primary plan.
     */
    function makePlanPrimary(_id: string): Promise<MakePlanPrimaryResponse>;
    /**
     * Sets all pricing plans to no longer be primary.
     *
     * The `clearPrimary()` function returns a Promise that is resolved when there are no pricing plans marked as `primary`.
     *
     * After clearing the primary plan, when viewing pricing plans on the site, no plan is highlighted with a customizable ribbon.
     * @public
     * @permissionId PRICING_PLANS.MANAGE_PLANS
     * @permissionScope Manage Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-PLANS
     * @applicableIdentity APP
     * @adminMethod
     */
    function clearPrimary(): Promise<void>;
    /**
     * Archives a single plan.
     *
     *
     * The `archivePlan()` function returns a Promise that resolves to the newly-archived plan.
     *
     * When a plan is archived, the plan
     * - Is no longer available for display or selection by visitors. This is because the plan's `public` property is automatically set to `false`.
     * - Cannot be purchased.
     * - Cannot be "un-archived", meaning the plan cannot be made active again.
     *
     * Plan archiving does not impact existing purchases made for the plan. All purchases for the plan are still active and keep their payment options and terms.
     *
     * Site owners can see archived plans in the Dashboard under **Pricing Plans -> Archived Plans**.
     *
     * >**Note:** An attempt to archive an already-archived plan throws an error.
     * @public
     * @requiredField _id
     * @param _id - ID of the active plan to archive.
     * @permissionId PRICING_PLANS.MANAGE_PLANS
     * @permissionScope Manage Pricing Plans
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-PLANS
     * @applicableIdentity APP
     * @adminMethod
     * @returns Fulfilled - The archived plan.
     *
     * Rejected - Error message.
     */
    function archivePlan(_id: string): Promise<ArchivePlanResponse>;
    interface BulkArchivePlanOptions {
        /** Set to true to return Plan entity in response. */
        returnFullEntity?: boolean;
    }
    interface CountPlansOptions {
        /** The filter. */
        filter?: Record<string, any> | null;
        /** If true, will count only visible plans (visible and not archived). If no value is given all site's plans will be counted. */
        visibility?: boolean | null;
    }
    interface QueryPlansOptions {
        /** Query */
        query?: QueryV2;
    }
    type pricingPlansV2PlanPlans_universal_d_Plan = Plan;
    type pricingPlansV2PlanPlans_universal_d_StringList = StringList;
    type pricingPlansV2PlanPlans_universal_d_Pricing = Pricing;
    type pricingPlansV2PlanPlans_universal_d_PricingPricingModelOneOf = PricingPricingModelOneOf;
    type pricingPlansV2PlanPlans_universal_d_Recurrence = Recurrence;
    type pricingPlansV2PlanPlans_universal_d_Duration = Duration;
    type pricingPlansV2PlanPlans_universal_d_PeriodUnit = PeriodUnit;
    const pricingPlansV2PlanPlans_universal_d_PeriodUnit: typeof PeriodUnit;
    type pricingPlansV2PlanPlans_universal_d_Money = Money;
    type pricingPlansV2PlanPlans_universal_d_FeeConfig = FeeConfig;
    type pricingPlansV2PlanPlans_universal_d_Fee = Fee;
    type pricingPlansV2PlanPlans_universal_d_AppliedAt = AppliedAt;
    const pricingPlansV2PlanPlans_universal_d_AppliedAt: typeof AppliedAt;
    type pricingPlansV2PlanPlans_universal_d_ListPublicPlansRequest = ListPublicPlansRequest;
    type pricingPlansV2PlanPlans_universal_d_ListPublicPlansResponse = ListPublicPlansResponse;
    type pricingPlansV2PlanPlans_universal_d_PublicPlan = PublicPlan;
    type pricingPlansV2PlanPlans_universal_d_PagingMetadataV2 = PagingMetadataV2;
    type pricingPlansV2PlanPlans_universal_d_Cursors = Cursors;
    type pricingPlansV2PlanPlans_universal_d_QueryPublicPlansRequest = QueryPublicPlansRequest;
    type pricingPlansV2PlanPlans_universal_d_QueryV2 = QueryV2;
    type pricingPlansV2PlanPlans_universal_d_Sorting = Sorting;
    type pricingPlansV2PlanPlans_universal_d_SortOrder = SortOrder;
    const pricingPlansV2PlanPlans_universal_d_SortOrder: typeof SortOrder;
    type pricingPlansV2PlanPlans_universal_d_Paging = Paging;
    type pricingPlansV2PlanPlans_universal_d_QueryPublicPlansResponse = QueryPublicPlansResponse;
    type pricingPlansV2PlanPlans_universal_d_GetPlanRequest = GetPlanRequest;
    type pricingPlansV2PlanPlans_universal_d_GetPlanResponse = GetPlanResponse;
    type pricingPlansV2PlanPlans_universal_d_ListPlansRequest = ListPlansRequest;
    type pricingPlansV2PlanPlans_universal_d_ArchivedFilter = ArchivedFilter;
    const pricingPlansV2PlanPlans_universal_d_ArchivedFilter: typeof ArchivedFilter;
    type pricingPlansV2PlanPlans_universal_d_PublicFilter = PublicFilter;
    const pricingPlansV2PlanPlans_universal_d_PublicFilter: typeof PublicFilter;
    type pricingPlansV2PlanPlans_universal_d_ListPlansResponse = ListPlansResponse;
    type pricingPlansV2PlanPlans_universal_d_GetPlanStatsRequest = GetPlanStatsRequest;
    type pricingPlansV2PlanPlans_universal_d_GetPlanStatsResponse = GetPlanStatsResponse;
    type pricingPlansV2PlanPlans_universal_d_CreatePlanRequest = CreatePlanRequest;
    type pricingPlansV2PlanPlans_universal_d_CreatePlanResponse = CreatePlanResponse;
    type pricingPlansV2PlanPlans_universal_d_UpdatePlanRequest = UpdatePlanRequest;
    type pricingPlansV2PlanPlans_universal_d_UpdatePlanResponse = UpdatePlanResponse;
    type pricingPlansV2PlanPlans_universal_d_BuyerCanCancelUpdated = BuyerCanCancelUpdated;
    type pricingPlansV2PlanPlans_universal_d_SetPlanVisibilityRequest = SetPlanVisibilityRequest;
    type pricingPlansV2PlanPlans_universal_d_SetPlanVisibilityResponse = SetPlanVisibilityResponse;
    type pricingPlansV2PlanPlans_universal_d_MakePlanPrimaryRequest = MakePlanPrimaryRequest;
    type pricingPlansV2PlanPlans_universal_d_MakePlanPrimaryResponse = MakePlanPrimaryResponse;
    type pricingPlansV2PlanPlans_universal_d_ClearPrimaryRequest = ClearPrimaryRequest;
    type pricingPlansV2PlanPlans_universal_d_ClearPrimaryResponse = ClearPrimaryResponse;
    type pricingPlansV2PlanPlans_universal_d_ArchivePlanRequest = ArchivePlanRequest;
    type pricingPlansV2PlanPlans_universal_d_ArchivePlanResponse = ArchivePlanResponse;
    type pricingPlansV2PlanPlans_universal_d_PlanArchived = PlanArchived;
    type pricingPlansV2PlanPlans_universal_d_BulkArchivePlanRequest = BulkArchivePlanRequest;
    type pricingPlansV2PlanPlans_universal_d_BulkArchivePlanResponse = BulkArchivePlanResponse;
    type pricingPlansV2PlanPlans_universal_d_BulkPlanResult = BulkPlanResult;
    type pricingPlansV2PlanPlans_universal_d_ItemMetadata = ItemMetadata;
    type pricingPlansV2PlanPlans_universal_d_ApplicationError = ApplicationError;
    type pricingPlansV2PlanPlans_universal_d_BulkActionMetadata = BulkActionMetadata;
    type pricingPlansV2PlanPlans_universal_d_ArrangePlansRequest = ArrangePlansRequest;
    type pricingPlansV2PlanPlans_universal_d_ArrangePlansResponse = ArrangePlansResponse;
    type pricingPlansV2PlanPlans_universal_d_CountPlansRequest = CountPlansRequest;
    type pricingPlansV2PlanPlans_universal_d_CountPlansResponse = CountPlansResponse;
    type pricingPlansV2PlanPlans_universal_d_GetPlansPremiumStatusRequest = GetPlansPremiumStatusRequest;
    type pricingPlansV2PlanPlans_universal_d_GetPlansPremiumStatusResponse = GetPlansPremiumStatusResponse;
    type pricingPlansV2PlanPlans_universal_d_QueryPlansRequest = QueryPlansRequest;
    type pricingPlansV2PlanPlans_universal_d_QueryPlansResponse = QueryPlansResponse;
    type pricingPlansV2PlanPlans_universal_d_DomainEvent = DomainEvent;
    type pricingPlansV2PlanPlans_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
    type pricingPlansV2PlanPlans_universal_d_EntityCreatedEvent = EntityCreatedEvent;
    type pricingPlansV2PlanPlans_universal_d_RestoreInfo = RestoreInfo;
    type pricingPlansV2PlanPlans_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
    type pricingPlansV2PlanPlans_universal_d_EntityDeletedEvent = EntityDeletedEvent;
    type pricingPlansV2PlanPlans_universal_d_ActionEvent = ActionEvent;
    type pricingPlansV2PlanPlans_universal_d_MessageEnvelope = MessageEnvelope;
    type pricingPlansV2PlanPlans_universal_d_IdentificationData = IdentificationData;
    type pricingPlansV2PlanPlans_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
    type pricingPlansV2PlanPlans_universal_d_WebhookIdentityType = WebhookIdentityType;
    const pricingPlansV2PlanPlans_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
    const pricingPlansV2PlanPlans_universal_d_listPublicPlans: typeof listPublicPlans;
    type pricingPlansV2PlanPlans_universal_d_ListPublicPlansOptions = ListPublicPlansOptions;
    const pricingPlansV2PlanPlans_universal_d_queryPublicPlans: typeof queryPublicPlans;
    type pricingPlansV2PlanPlans_universal_d_PlansQueryResult = PlansQueryResult;
    type pricingPlansV2PlanPlans_universal_d_PlansQueryBuilder = PlansQueryBuilder;
    const pricingPlansV2PlanPlans_universal_d_getPlan: typeof getPlan;
    const pricingPlansV2PlanPlans_universal_d_listPlans: typeof listPlans;
    type pricingPlansV2PlanPlans_universal_d_ListPlansOptions = ListPlansOptions;
    const pricingPlansV2PlanPlans_universal_d_getPlanStats: typeof getPlanStats;
    const pricingPlansV2PlanPlans_universal_d_createPlan: typeof createPlan;
    const pricingPlansV2PlanPlans_universal_d_updatePlan: typeof updatePlan;
    type pricingPlansV2PlanPlans_universal_d_UpdatePlan = UpdatePlan;
    type pricingPlansV2PlanPlans_universal_d_UpdatePlanOptions = UpdatePlanOptions;
    const pricingPlansV2PlanPlans_universal_d_setPlanVisibility: typeof setPlanVisibility;
    const pricingPlansV2PlanPlans_universal_d_makePlanPrimary: typeof makePlanPrimary;
    const pricingPlansV2PlanPlans_universal_d_clearPrimary: typeof clearPrimary;
    const pricingPlansV2PlanPlans_universal_d_archivePlan: typeof archivePlan;
    type pricingPlansV2PlanPlans_universal_d_BulkArchivePlanOptions = BulkArchivePlanOptions;
    type pricingPlansV2PlanPlans_universal_d_CountPlansOptions = CountPlansOptions;
    type pricingPlansV2PlanPlans_universal_d_QueryPlansOptions = QueryPlansOptions;
    namespace pricingPlansV2PlanPlans_universal_d {
        export { pricingPlansV2PlanPlans_universal_d_Plan as Plan, pricingPlansV2PlanPlans_universal_d_StringList as StringList, pricingPlansV2PlanPlans_universal_d_Pricing as Pricing, pricingPlansV2PlanPlans_universal_d_PricingPricingModelOneOf as PricingPricingModelOneOf, pricingPlansV2PlanPlans_universal_d_Recurrence as Recurrence, pricingPlansV2PlanPlans_universal_d_Duration as Duration, pricingPlansV2PlanPlans_universal_d_PeriodUnit as PeriodUnit, pricingPlansV2PlanPlans_universal_d_Money as Money, pricingPlansV2PlanPlans_universal_d_FeeConfig as FeeConfig, pricingPlansV2PlanPlans_universal_d_Fee as Fee, pricingPlansV2PlanPlans_universal_d_AppliedAt as AppliedAt, pricingPlansV2PlanPlans_universal_d_ListPublicPlansRequest as ListPublicPlansRequest, pricingPlansV2PlanPlans_universal_d_ListPublicPlansResponse as ListPublicPlansResponse, pricingPlansV2PlanPlans_universal_d_PublicPlan as PublicPlan, pricingPlansV2PlanPlans_universal_d_PagingMetadataV2 as PagingMetadataV2, pricingPlansV2PlanPlans_universal_d_Cursors as Cursors, pricingPlansV2PlanPlans_universal_d_QueryPublicPlansRequest as QueryPublicPlansRequest, pricingPlansV2PlanPlans_universal_d_QueryV2 as QueryV2, pricingPlansV2PlanPlans_universal_d_Sorting as Sorting, pricingPlansV2PlanPlans_universal_d_SortOrder as SortOrder, pricingPlansV2PlanPlans_universal_d_Paging as Paging, pricingPlansV2PlanPlans_universal_d_QueryPublicPlansResponse as QueryPublicPlansResponse, pricingPlansV2PlanPlans_universal_d_GetPlanRequest as GetPlanRequest, pricingPlansV2PlanPlans_universal_d_GetPlanResponse as GetPlanResponse, pricingPlansV2PlanPlans_universal_d_ListPlansRequest as ListPlansRequest, pricingPlansV2PlanPlans_universal_d_ArchivedFilter as ArchivedFilter, pricingPlansV2PlanPlans_universal_d_PublicFilter as PublicFilter, pricingPlansV2PlanPlans_universal_d_ListPlansResponse as ListPlansResponse, pricingPlansV2PlanPlans_universal_d_GetPlanStatsRequest as GetPlanStatsRequest, pricingPlansV2PlanPlans_universal_d_GetPlanStatsResponse as GetPlanStatsResponse, pricingPlansV2PlanPlans_universal_d_CreatePlanRequest as CreatePlanRequest, pricingPlansV2PlanPlans_universal_d_CreatePlanResponse as CreatePlanResponse, pricingPlansV2PlanPlans_universal_d_UpdatePlanRequest as UpdatePlanRequest, pricingPlansV2PlanPlans_universal_d_UpdatePlanResponse as UpdatePlanResponse, pricingPlansV2PlanPlans_universal_d_BuyerCanCancelUpdated as BuyerCanCancelUpdated, pricingPlansV2PlanPlans_universal_d_SetPlanVisibilityRequest as SetPlanVisibilityRequest, pricingPlansV2PlanPlans_universal_d_SetPlanVisibilityResponse as SetPlanVisibilityResponse, pricingPlansV2PlanPlans_universal_d_MakePlanPrimaryRequest as MakePlanPrimaryRequest, pricingPlansV2PlanPlans_universal_d_MakePlanPrimaryResponse as MakePlanPrimaryResponse, pricingPlansV2PlanPlans_universal_d_ClearPrimaryRequest as ClearPrimaryRequest, pricingPlansV2PlanPlans_universal_d_ClearPrimaryResponse as ClearPrimaryResponse, pricingPlansV2PlanPlans_universal_d_ArchivePlanRequest as ArchivePlanRequest, pricingPlansV2PlanPlans_universal_d_ArchivePlanResponse as ArchivePlanResponse, pricingPlansV2PlanPlans_universal_d_PlanArchived as PlanArchived, pricingPlansV2PlanPlans_universal_d_BulkArchivePlanRequest as BulkArchivePlanRequest, pricingPlansV2PlanPlans_universal_d_BulkArchivePlanResponse as BulkArchivePlanResponse, pricingPlansV2PlanPlans_universal_d_BulkPlanResult as BulkPlanResult, pricingPlansV2PlanPlans_universal_d_ItemMetadata as ItemMetadata, pricingPlansV2PlanPlans_universal_d_ApplicationError as ApplicationError, pricingPlansV2PlanPlans_universal_d_BulkActionMetadata as BulkActionMetadata, pricingPlansV2PlanPlans_universal_d_ArrangePlansRequest as ArrangePlansRequest, pricingPlansV2PlanPlans_universal_d_ArrangePlansResponse as ArrangePlansResponse, pricingPlansV2PlanPlans_universal_d_CountPlansRequest as CountPlansRequest, pricingPlansV2PlanPlans_universal_d_CountPlansResponse as CountPlansResponse, pricingPlansV2PlanPlans_universal_d_GetPlansPremiumStatusRequest as GetPlansPremiumStatusRequest, pricingPlansV2PlanPlans_universal_d_GetPlansPremiumStatusResponse as GetPlansPremiumStatusResponse, pricingPlansV2PlanPlans_universal_d_QueryPlansRequest as QueryPlansRequest, pricingPlansV2PlanPlans_universal_d_QueryPlansResponse as QueryPlansResponse, pricingPlansV2PlanPlans_universal_d_DomainEvent as DomainEvent, pricingPlansV2PlanPlans_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf, pricingPlansV2PlanPlans_universal_d_EntityCreatedEvent as EntityCreatedEvent, pricingPlansV2PlanPlans_universal_d_RestoreInfo as RestoreInfo, pricingPlansV2PlanPlans_universal_d_EntityUpdatedEvent as EntityUpdatedEvent, pricingPlansV2PlanPlans_universal_d_EntityDeletedEvent as EntityDeletedEvent, pricingPlansV2PlanPlans_universal_d_ActionEvent as ActionEvent, pricingPlansV2PlanPlans_universal_d_MessageEnvelope as MessageEnvelope, pricingPlansV2PlanPlans_universal_d_IdentificationData as IdentificationData, pricingPlansV2PlanPlans_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf, pricingPlansV2PlanPlans_universal_d_WebhookIdentityType as WebhookIdentityType, pricingPlansV2PlanPlans_universal_d_listPublicPlans as listPublicPlans, pricingPlansV2PlanPlans_universal_d_ListPublicPlansOptions as ListPublicPlansOptions, pricingPlansV2PlanPlans_universal_d_queryPublicPlans as queryPublicPlans, pricingPlansV2PlanPlans_universal_d_PlansQueryResult as PlansQueryResult, pricingPlansV2PlanPlans_universal_d_PlansQueryBuilder as PlansQueryBuilder, pricingPlansV2PlanPlans_universal_d_getPlan as getPlan, pricingPlansV2PlanPlans_universal_d_listPlans as listPlans, pricingPlansV2PlanPlans_universal_d_ListPlansOptions as ListPlansOptions, pricingPlansV2PlanPlans_universal_d_getPlanStats as getPlanStats, pricingPlansV2PlanPlans_universal_d_createPlan as createPlan, pricingPlansV2PlanPlans_universal_d_updatePlan as updatePlan, pricingPlansV2PlanPlans_universal_d_UpdatePlan as UpdatePlan, pricingPlansV2PlanPlans_universal_d_UpdatePlanOptions as UpdatePlanOptions, pricingPlansV2PlanPlans_universal_d_setPlanVisibility as setPlanVisibility, pricingPlansV2PlanPlans_universal_d_makePlanPrimary as makePlanPrimary, pricingPlansV2PlanPlans_universal_d_clearPrimary as clearPrimary, pricingPlansV2PlanPlans_universal_d_archivePlan as archivePlan, pricingPlansV2PlanPlans_universal_d_BulkArchivePlanOptions as BulkArchivePlanOptions, pricingPlansV2PlanPlans_universal_d_CountPlansOptions as CountPlansOptions, pricingPlansV2PlanPlans_universal_d_QueryPlansOptions as QueryPlansOptions, };
    }
    export { pricingPlansV2OrderOrders_universal_d as orders, pricingPlansV2PlanPlans_universal_d as plans };
}
