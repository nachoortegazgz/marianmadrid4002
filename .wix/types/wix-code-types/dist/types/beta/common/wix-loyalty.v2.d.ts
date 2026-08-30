declare module "wix-loyalty.v2" {
  /** A loyalty checkout discount represents a discount applied to a checkout using loyalty rewards, coupons, or referral rewards. */
  interface LoyaltyCheckoutDiscount extends LoyaltyCheckoutDiscountDiscountOneOf {
      /** ID of the loyalty reward used for this discount. */
      rewardId?: string;
      /** ID of the loyalty coupon used for this discount. */
      loyaltyCouponId?: string;
      /** ID of the referral reward used for this discount. */
      referralRewardId?: string;
      /**
       * Loyalty checkout discount ID.
       * @readonly
       */
      _id?: string;
      /** ID of the checkout this discount is applied to. */
      checkoutId?: string;
      /**
       * Current status of the discount.
       * @readonly
       */
      status?: DiscountStatus;
      /**
       * The type of discount applied.
       * @readonly
       */
      discountType?: DiscountType;
  }
  /** @oneof */
  interface LoyaltyCheckoutDiscountDiscountOneOf {
      /** ID of the loyalty reward used for this discount. */
      rewardId?: string;
      /** ID of the loyalty coupon used for this discount. */
      loyaltyCouponId?: string;
      /** ID of the referral reward used for this discount. */
      referralRewardId?: string;
  }
  enum DiscountStatus {
      /** Status is unknown or not specified. */
      UNKNOWN = "UNKNOWN",
      /** Discount has been applied to the checkout. */
      APPLIED = "APPLIED",
      /** Discount application is in progress. */
      IN_PROGRESS = "IN_PROGRESS",
      /** Discount has been successfully completed. */
      COMPLETED = "COMPLETED",
      /** Discount has been refunded. */
      REFUNDED = "REFUNDED",
      /** Attempt to refund the discount failed. */
      FAILED_TO_REFUND = "FAILED_TO_REFUND",
      /** Discount was refunded due to a timeout. */
      REFUNDED_DUE_TO_TIMEOUT = "REFUNDED_DUE_TO_TIMEOUT",
      /** Discount was refunded due to manual removal. */
      REFUNDED_DUE_TO_MANUAL_DISCOUNT_REMOVAL = "REFUNDED_DUE_TO_MANUAL_DISCOUNT_REMOVAL",
      /** Discount is scheduled for refund. */
      SCHEDULED_FOR_REFUND = "SCHEDULED_FOR_REFUND",
      /** Discount was not used. */
      UNUSED = "UNUSED"
  }
  enum DiscountType {
      /** Discount type is unknown or not specified. */
      UNKNOWN = "UNKNOWN",
      /** A discount from a flexible reward. */
      DISCOUNT_AMOUNT = "DISCOUNT_AMOUNT",
      /** A discount from a redeemed loyalty program coupon. */
      LOYALTY_COUPON = "LOYALTY_COUPON",
      /** A discount from a coupon reward that has not yet been redeemed. */
      COUPON_REWARD = "COUPON_REWARD",
      /** A discount from a referral reward. */
      REFERRAL_REWARD = "REFERRAL_REWARD"
  }
  /** Request to apply a discount to a checkout. */
  interface ApplyDiscountToCheckoutRequest extends ApplyDiscountToCheckoutRequestDiscountOneOf {
      /** Unredeemed loyalty reward discount. */
      reward?: Reward$1;
      /** Loyalty coupon discount. */
      loyaltyCoupon?: LoyaltyCoupon$1;
      /** Referral reward discount. */
      referralReward?: ReferralReward;
      /** ID of the checkout to apply the discount to. */
      checkoutId: string;
  }
  /** @oneof */
  interface ApplyDiscountToCheckoutRequestDiscountOneOf {
      /** Unredeemed loyalty reward discount. */
      reward?: Reward$1;
      /** Loyalty coupon discount. */
      loyaltyCoupon?: LoyaltyCoupon$1;
      /** Referral reward discount. */
      referralReward?: ReferralReward;
  }
  interface Reward$1 {
      /** ID of the loyalty reward to be used for this discount. */
      _id?: string;
      /**
       * Number of points to spend for this reward.
       * For example, if the reward is 10 points = $1, then 35 points would give a $3.50 discount.
       *
       * >**Note:** Only relevant when using a flexible type reward. Depending on how your loyalty program is set up, there may be a minimum number of points you must spend.
       */
      pointsToSpend?: number | null;
      /**
       * Revision of the reward object. Incremented by 1 each time the reward object is updated.
       * Pass the latest revision when updating to prevent conflicting changes.
       */
      revision?: string;
  }
  interface LoyaltyCoupon$1 {
      /** ID of the loyalty coupon to be used for this discount. */
      _id?: string;
      /**
       * Revision of the coupon object. Incremented by 1 each time the coupon object is updated.
       * Pass the latest revision when updating to prevent conflicting changes.
       */
      revision?: string;
  }
  interface ReferralReward {
      /** Referral reward discount ID. */
      _id?: string;
      /**
       * Revision of the referral object. Incremented by 1 each time the referral object is updated.
       * Pass the latest revision when updating to prevent conflicting changes.
       */
      revision?: string;
  }
  /** Response after applying a discount to a checkout. */
  interface ApplyDiscountToCheckoutResponse {
      /** The applied loyalty checkout discount. */
      discount?: LoyaltyCheckoutDiscount;
  }
  interface DiscountRefundedDueToManualDiscountRemoval {
      /** Loyalty checkout discount refunded due to manual removal. */
      discount?: LoyaltyCheckoutDiscount;
  }
  interface DiscountRefundedDueToTimeout {
      /** Loyalty checkout discount refunded due to timeout. */
      discount?: LoyaltyCheckoutDiscount;
  }
  interface DiscountScheduledForRefund {
      /** Loyalty checkout discount scheduled for refund. */
      discount?: LoyaltyCheckoutDiscount;
  }
  interface QueryLoyaltyCheckoutDiscountsRequest {
      /**
       * Filter object.
       * See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language) for more information.
       */
      query: CursorQuery$5;
  }
  interface CursorQuery$5 extends CursorQueryPagingMethodOneOf$5 {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$6;
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
      sort?: Sorting$5[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$5 {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$6;
  }
  interface Sorting$5 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$5;
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
  enum SortOrder$5 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$6 {
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
  /** Response from querying loyalty checkout discounts. */
  interface QueryLoyaltyCheckoutDiscountsResponse {
      /** List of loyalty checkout discounts matching the query. */
      loyaltyCheckoutDiscounts?: LoyaltyCheckoutDiscount[];
      /** Paging metadata for the response. */
      pagingMetadata?: CursorPagingMetadata$4;
  }
  interface CursorPagingMetadata$4 {
      /** Number of items returned in current page. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors$6;
      /**
       * Whether there are more pages to retrieve following the current page.
       *
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
      /**
       * Total number of items matching the filter.
       * Available only on the first page of *Search* results, not included in *Query* or *List* results.
       * If the Search results span multiple pages, the value of `total` will exceed the number of items returned on the first page.
       * @internal
       */
      total?: number | null;
  }
  interface Cursors$6 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface DomainEvent$9 extends DomainEventBodyOneOf$9 {
      createdEvent?: EntityCreatedEvent$9;
      updatedEvent?: EntityUpdatedEvent$9;
      deletedEvent?: EntityDeletedEvent$9;
      actionEvent?: ActionEvent$9;
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
  interface DomainEventBodyOneOf$9 {
      createdEvent?: EntityCreatedEvent$9;
      updatedEvent?: EntityUpdatedEvent$9;
      deletedEvent?: EntityDeletedEvent$9;
      actionEvent?: ActionEvent$9;
  }
  interface EntityCreatedEvent$9 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$9;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$9 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$9 {
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
  interface EntityDeletedEvent$9 {
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
  interface ActionEvent$9 {
      bodyAsJson?: string;
  }
  interface Empty$9 {
  }
  interface MessageEnvelope$9 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$9;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$9 extends IdentificationDataIdOneOf$9 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$9;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$9 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$9 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Applies a discount to a checkout.
   *
   * You can apply one of the following discounts, which are exchanged for loyalty points: `reward`, `loyaltyCoupon`, or `referralReward`.
   * @param checkoutId - ID of the checkout to apply the discount to.
   * @public
   * @requiredField checkoutId
   * @permissionId LOYALTY.REDEEM_OWN_COUPON
   * @returns Response after applying a discount to a checkout.
   */
  function applyDiscountToCheckout(checkoutId: string, options?: ApplyDiscountToCheckoutOptions): Promise<ApplyDiscountToCheckoutResponse>;
  interface ApplyDiscountToCheckoutOptions extends ApplyDiscountToCheckoutRequestDiscountOneOf {
      /** Unredeemed loyalty reward discount. */
      reward?: Reward$1;
      /** Loyalty coupon discount. */
      loyaltyCoupon?: LoyaltyCoupon$1;
      /** Referral reward discount. */
      referralReward?: ReferralReward;
  }
  /**
   * Creates a query to retrieve a list of checkout discounts.
   *
   * The `queryLoyaltyCheckoutDiscount()` function builds a query to retrieve a list of checkout discounts and returns a `LoyaltyCheckoutDiscountQueryBuilder` object.
   *
   * The returned object contains the query definition, which is typically used to run the query using the `find()` function.
   *
   * You can refine the query by chaining `LoyaltyCheckoutDiscountQueryBuilder` functions onto the query. `LoyaltyCheckoutDiscountQueryBuilder` functions enable you to sort, filter, and control the results `queryLoyaltyCheckoutDiscount()` returns.
   *
   * `queryLoyaltyCheckoutDiscount()` runs with these `LoyaltyCheckoutDiscountQueryBuilder` defaults, which you can override:
   *
   * - `limit(50)`
   * - `descending("_createdDate")`
   *
   * The functions that are chained to `queryLoyaltyCheckoutDiscount()` are applied in the order they're called. For example, if you apply ascending('status') and then descending('checkoutId'), the results are sorted first by the status, and then, if there are multiple results with the same status, the items are sorted by checkout ID.
   * @public
   * @permissionId LOYALTY.QUERY_CHECKOUT_DISCOUNTS
   */
  function queryLoyaltyCheckoutDiscounts(): LoyaltyCheckoutDiscountsQueryBuilder;
  interface QueryCursorResult$4 {
      cursors: Cursors$6;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface LoyaltyCheckoutDiscountsQueryResult extends QueryCursorResult$4 {
      items: LoyaltyCheckoutDiscount[];
      query: LoyaltyCheckoutDiscountsQueryBuilder;
      next: () => Promise<LoyaltyCheckoutDiscountsQueryResult>;
      prev: () => Promise<LoyaltyCheckoutDiscountsQueryResult>;
  }
  interface LoyaltyCheckoutDiscountsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      eq: (propertyName: 'checkoutId' | 'status', value: any) => LoyaltyCheckoutDiscountsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      ne: (propertyName: 'checkoutId' | 'status', value: any) => LoyaltyCheckoutDiscountsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       */
      startsWith: (propertyName: 'checkoutId', value: string) => LoyaltyCheckoutDiscountsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       */
      hasSome: (propertyName: 'checkoutId' | 'status', value: any[]) => LoyaltyCheckoutDiscountsQueryBuilder;
      in: (propertyName: 'checkoutId' | 'status', value: any) => LoyaltyCheckoutDiscountsQueryBuilder;
      exists: (propertyName: 'checkoutId' | 'status', value: boolean) => LoyaltyCheckoutDiscountsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
      ascending: (...propertyNames: Array<'checkoutId' | 'status'>) => LoyaltyCheckoutDiscountsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
      descending: (...propertyNames: Array<'checkoutId' | 'status'>) => LoyaltyCheckoutDiscountsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object. */
      limit: (limit: number) => LoyaltyCheckoutDiscountsQueryBuilder;
      /** @param cursor - A pointer to specific record */
      skipTo: (cursor: string) => LoyaltyCheckoutDiscountsQueryBuilder;
      find: () => Promise<LoyaltyCheckoutDiscountsQueryResult>;
  }
  
  type loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_LoyaltyCheckoutDiscount = LoyaltyCheckoutDiscount;
  type loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_LoyaltyCheckoutDiscountDiscountOneOf = LoyaltyCheckoutDiscountDiscountOneOf;
  type loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_DiscountStatus = DiscountStatus;
  const loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_DiscountStatus: typeof DiscountStatus;
  type loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_DiscountType = DiscountType;
  const loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_DiscountType: typeof DiscountType;
  type loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_ApplyDiscountToCheckoutRequest = ApplyDiscountToCheckoutRequest;
  type loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_ApplyDiscountToCheckoutRequestDiscountOneOf = ApplyDiscountToCheckoutRequestDiscountOneOf;
  type loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_ReferralReward = ReferralReward;
  type loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_ApplyDiscountToCheckoutResponse = ApplyDiscountToCheckoutResponse;
  type loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_DiscountRefundedDueToManualDiscountRemoval = DiscountRefundedDueToManualDiscountRemoval;
  type loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_DiscountRefundedDueToTimeout = DiscountRefundedDueToTimeout;
  type loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_DiscountScheduledForRefund = DiscountScheduledForRefund;
  type loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_QueryLoyaltyCheckoutDiscountsRequest = QueryLoyaltyCheckoutDiscountsRequest;
  type loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_QueryLoyaltyCheckoutDiscountsResponse = QueryLoyaltyCheckoutDiscountsResponse;
  const loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_applyDiscountToCheckout: typeof applyDiscountToCheckout;
  type loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_ApplyDiscountToCheckoutOptions = ApplyDiscountToCheckoutOptions;
  const loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_queryLoyaltyCheckoutDiscounts: typeof queryLoyaltyCheckoutDiscounts;
  type loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_LoyaltyCheckoutDiscountsQueryResult = LoyaltyCheckoutDiscountsQueryResult;
  type loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_LoyaltyCheckoutDiscountsQueryBuilder = LoyaltyCheckoutDiscountsQueryBuilder;
  namespace loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d {
    export {
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_LoyaltyCheckoutDiscount as LoyaltyCheckoutDiscount,
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_LoyaltyCheckoutDiscountDiscountOneOf as LoyaltyCheckoutDiscountDiscountOneOf,
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_DiscountStatus as DiscountStatus,
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_DiscountType as DiscountType,
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_ApplyDiscountToCheckoutRequest as ApplyDiscountToCheckoutRequest,
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_ApplyDiscountToCheckoutRequestDiscountOneOf as ApplyDiscountToCheckoutRequestDiscountOneOf,
      Reward$1 as Reward,
      LoyaltyCoupon$1 as LoyaltyCoupon,
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_ReferralReward as ReferralReward,
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_ApplyDiscountToCheckoutResponse as ApplyDiscountToCheckoutResponse,
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_DiscountRefundedDueToManualDiscountRemoval as DiscountRefundedDueToManualDiscountRemoval,
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_DiscountRefundedDueToTimeout as DiscountRefundedDueToTimeout,
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_DiscountScheduledForRefund as DiscountScheduledForRefund,
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_QueryLoyaltyCheckoutDiscountsRequest as QueryLoyaltyCheckoutDiscountsRequest,
      CursorQuery$5 as CursorQuery,
      CursorQueryPagingMethodOneOf$5 as CursorQueryPagingMethodOneOf,
      Sorting$5 as Sorting,
      SortOrder$5 as SortOrder,
      CursorPaging$6 as CursorPaging,
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_QueryLoyaltyCheckoutDiscountsResponse as QueryLoyaltyCheckoutDiscountsResponse,
      CursorPagingMetadata$4 as CursorPagingMetadata,
      Cursors$6 as Cursors,
      DomainEvent$9 as DomainEvent,
      DomainEventBodyOneOf$9 as DomainEventBodyOneOf,
      EntityCreatedEvent$9 as EntityCreatedEvent,
      RestoreInfo$9 as RestoreInfo,
      EntityUpdatedEvent$9 as EntityUpdatedEvent,
      EntityDeletedEvent$9 as EntityDeletedEvent,
      ActionEvent$9 as ActionEvent,
      Empty$9 as Empty,
      MessageEnvelope$9 as MessageEnvelope,
      IdentificationData$9 as IdentificationData,
      IdentificationDataIdOneOf$9 as IdentificationDataIdOneOf,
      WebhookIdentityType$9 as WebhookIdentityType,
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_applyDiscountToCheckout as applyDiscountToCheckout,
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_ApplyDiscountToCheckoutOptions as ApplyDiscountToCheckoutOptions,
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_queryLoyaltyCheckoutDiscounts as queryLoyaltyCheckoutDiscounts,
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_LoyaltyCheckoutDiscountsQueryResult as LoyaltyCheckoutDiscountsQueryResult,
      loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d_LoyaltyCheckoutDiscountsQueryBuilder as LoyaltyCheckoutDiscountsQueryBuilder,
    };
  }
  
  /**
   * An Import object is a batch import of loyalty points for existing customers.
   * You can use Loyalty Imports to import loyalty points from 3rd-party providers or update existing customer point balances.
   * This object tracks the entire import process from file upload to data processing.
   */
  interface LoyaltyImport {
      /**
       * The ID of the import.
       * @readonly
       */
      _id?: string | null;
      /**
       * ID of the asynchronous import job associated with this import.
       * @readonly
       */
      asyncImportJobId?: string | null;
      /**
       * Revision number, which increments by 1 each time the Loyalty Import is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the Loyalty Import.
       *
       * Ignored when creating a Loyalty Import.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the Loyalty Import was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the Loyalty Import was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Current status of the import process.
       * @readonly
       */
      status?: ImportStatus;
      /** Metadata of the uploaded file containing loyalty points data. */
      fileMetadata?: FileMetadata;
      /** Results of parsing the uploaded file, including the number of rows parsed and any parse errors. */
      parseResult?: ParseResult;
      /** Results of the import process, including success and failure counts. */
      importResult?: ImportResult;
  }
  enum ImportStatus {
      /** Status is unknown or not specified. */
      UNKNOWN = "UNKNOWN",
      /** The import has been initiated but processing has not yet begun. */
      INITIATED = "INITIATED",
      /** The system is currently parsing the import file. */
      PARSING = "PARSING",
      /** The import file has been successfully parsed and is ready for importing. */
      PARSED = "PARSED",
      /** The system is currently importing the parsed data. */
      IMPORTING = "IMPORTING",
      /** The import process is complete. This status indicates the process finished, but doesn't guarantee all data imported successfully. */
      IMPORTED = "IMPORTED",
      /** The import process has failed. */
      FAILED = "FAILED"
  }
  interface FileMetadata {
      /**
       * Size of the uploaded file in bytes. Max: `10 MB`.
       * @readonly
       */
      size?: number | null;
      /**
       * Name of the uploaded file.
       * @readonly
       */
      name?: string | null;
      /** URL of the uploaded file. */
      url?: string;
      /** Column headings from the first row of the uploaded CSV file. */
      header?: FileHeader;
      /**
       * Mapping between loyalty data fields and the corresponding columns in the uploaded file.
       *
       * Must include mappings for both `EMAIL` and `POINTS` to be valid.
       */
      headerMappingInfo?: HeaderMappingInfo;
      /** Up to 5 sample rows from the import file, providing a preview of the data to be imported. */
      sampleDataRows?: SampleDataRow[];
  }
  interface FileHeader {
      /** Column headings from the first row of the uploaded file. */
      values?: string[];
  }
  interface HeaderMappingInfo {
      /**
       * Mappings between required loyalty data fields and file columns.
       * Must contain exactly 2 mappings: one for `EMAIL` and one for `POINTS`.
       */
      headerMappings?: HeaderMapping[];
  }
  interface HeaderMapping {
      /** The required loyalty data field that this mapping corresponds to. Must be either `EMAIL` or `POINTS`. */
      columnName?: ColumnName;
      /**
       * The zero-based index of the column in the uploaded file that contains the data for this loyalty field.
       * For example, if the email addresses are in the second column of the CSV file, this value would be 1.
       */
      columnIndex?: number;
  }
  enum ColumnName {
      /** Column containing the customer's email address. */
      EMAIL = "EMAIL",
      /** Column containing the customer's loyalty point balance to be imported or updated. */
      POINTS = "POINTS"
  }
  interface SampleDataRow {
      /**
       * Values in one sample data row. Each value corresponds to a column in the CSV file.
       * The number of values matches the number of columns in the file.
       */
      values?: string[];
  }
  interface ParseResult {
      /**
       * Number of rows parsed from the uploaded import file.
       * @readonly
       */
      parsedRowCount?: number | null;
      /**
       * Reason code explaining why parsing failed, if applicable.
       * @readonly
       */
      parseErrorReason?: string | null;
  }
  interface ImportResult {
      /** Whether an error file detailing import failures is available for download. The file includes row-by-row import status, error reasons, and original data. */
      errorFileExists?: boolean;
      /**
       * Number of rows successfully imported.
       * @readonly
       */
      successCount?: number | null;
      /**
       * Number of rows that failed to import due to errors.
       * @readonly
       */
      failureCount?: number | null;
  }
  interface CreateLoyaltyImportRequest {
      /** URL of the file to import. */
      fileUrl: string | null;
      /** Name of the file to import. */
      fileName?: string | null;
      /** Size of the file to import, in bytes. */
      fileSize?: number | null;
  }
  interface CreateLoyaltyImportResponse {
      /** Created loyalty import. */
      loyaltyImport?: LoyaltyImport;
  }
  interface GetLoyaltyImportRequest {
      /** Loyalty import ID. */
      loyaltyImportId: string;
  }
  interface GetLoyaltyImportResponse {
      /** Retrieved loyalty import. */
      loyaltyImport?: LoyaltyImport;
  }
  interface GetErrorFileDownloadUrlRequest {
      /** Loyalty import ID. */
      loyaltyImportId: string;
  }
  interface GetErrorFileDownloadUrlResponse {
      /** URL for downloading the error file. */
      url?: string | null;
  }
  interface ExecuteLoyaltyImportRequest {
      /** Loyalty import ID. */
      loyaltyImportId: string;
      /** Header mapping information for the import file. */
      headerMappingInfo?: HeaderMappingInfo;
  }
  interface ExecuteLoyaltyImportResponse {
      /** Executed loyalty import. */
      loyaltyImport?: LoyaltyImport;
  }
  interface CreateLoyaltyImportFileUrlRequest {
  }
  interface CreateLoyaltyImportFileUrlResponse {
      /** Path where the file will be stored. */
      filePath?: string | null;
      /** URL for uploading the loyalty import file. */
      uploadUrl?: string | null;
  }
  interface QueryLoyaltyImportsRequest {
      /**
       * Filter object.
       * See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language)
       * for more information.
       *
       * For a detailed list of supported filters, see
       * [Supported Filters](https://dev.wix.com/api/rest/wix-loyalty-program/loyalty-imports/supported-filters).
       */
      query: CursorQuery$4;
  }
  interface CursorQuery$4 extends CursorQueryPagingMethodOneOf$4 {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$5;
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
      sort?: Sorting$4[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$4 {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$5;
  }
  interface Sorting$4 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$4;
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
  enum SortOrder$4 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$5 {
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
  interface QueryLoyaltyImportsResponse {
      /** List of loyalty imports matching the query. */
      loyaltyImports?: LoyaltyImport[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata$3;
  }
  interface CursorPagingMetadata$3 {
      /** Number of items returned in current page. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors$5;
      /**
       * Whether there are more pages to retrieve following the current page.
       *
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
      /**
       * Total number of items matching the filter.
       * Available only on the first page of *Search* results, not included in *Query* or *List* results.
       * If the Search results span multiple pages, the value of `total` will exceed the number of items returned on the first page.
       * @internal
       */
      total?: number | null;
  }
  interface Cursors$5 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface DeleteLoyaltyImportRequest {
      /** Loyalty import ID. */
      loyaltyImportId: string;
      /**
       * Revision number, which increments by 1 each time the loyalty import is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the loyalty import.
       */
      revision?: string;
  }
  interface DeleteLoyaltyImportResponse {
  }
  interface DomainEvent$8 extends DomainEventBodyOneOf$8 {
      createdEvent?: EntityCreatedEvent$8;
      updatedEvent?: EntityUpdatedEvent$8;
      deletedEvent?: EntityDeletedEvent$8;
      actionEvent?: ActionEvent$8;
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
  interface DomainEventBodyOneOf$8 {
      createdEvent?: EntityCreatedEvent$8;
      updatedEvent?: EntityUpdatedEvent$8;
      deletedEvent?: EntityDeletedEvent$8;
      actionEvent?: ActionEvent$8;
  }
  interface EntityCreatedEvent$8 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$8;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$8 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$8 {
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
  interface EntityDeletedEvent$8 {
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
  interface ActionEvent$8 {
      bodyAsJson?: string;
  }
  interface Empty$8 {
  }
  interface ImportFinished {
      /** Completed loyalty import. */
      loyaltyImport?: LoyaltyImport;
  }
  interface MessageEnvelope$8 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$8;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$8 extends IdentificationDataIdOneOf$8 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$8;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$8 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$8 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Creates an import object based on an uploaded file.
   *
   * Call this method after uploading your file to the URL obtained from `createLoyaltyImportFileUrl()`.
   * @param fileUrl - URL of the file to import.
   * @public
   * @requiredField fileUrl
   * @permissionId LOYALTY.MANAGE_IMPORTS
   * @adminMethod
   */
  function createLoyaltyImport(fileUrl: string | null, options?: CreateLoyaltyImportOptions): Promise<CreateLoyaltyImportResponse>;
  interface CreateLoyaltyImportOptions {
      /** Name of the file to import. */
      fileName?: string | null;
      /** Size of the file to import, in bytes. */
      fileSize?: number | null;
  }
  /**
   * Retrieves a loyalty import.
   * @param loyaltyImportId - Loyalty import ID.
   * @public
   * @requiredField loyaltyImportId
   * @permissionId LOYALTY.MANAGE_IMPORTS
   * @adminMethod
   * @returns Retrieved loyalty import.
   */
  function getLoyaltyImport(loyaltyImportId: string): Promise<LoyaltyImport>;
  /**
   * Retrieves the download URL for the error file of a failed loyalty import.
   *
   * If an import fails, the `importResult.errorFileExists` field in the `LoyaltyImport` object is set to `true`.
   *
   * Use this method to get the URL of the error file, which contains details about which items couldn't be imported and why.
   * @param loyaltyImportId - Loyalty import ID.
   * @public
   * @requiredField loyaltyImportId
   * @permissionId LOYALTY.MANAGE_IMPORTS
   * @adminMethod
   */
  function getErrorFileDownloadUrl(loyaltyImportId: string): Promise<GetErrorFileDownloadUrlResponse>;
  /**
   * Starts the actual import process for a loyalty import.
   *
   * Call this method after the loyalty import object reaches the `PARSED` status.
   * @param loyaltyImportId - Loyalty import ID.
   * @public
   * @requiredField loyaltyImportId
   * @permissionId LOYALTY.MANAGE_IMPORTS
   * @adminMethod
   */
  function executeLoyaltyImport(loyaltyImportId: string, options?: ExecuteLoyaltyImportOptions): Promise<ExecuteLoyaltyImportResponse>;
  interface ExecuteLoyaltyImportOptions {
      /** Header mapping information for the import file. */
      headerMappingInfo?: HeaderMappingInfo;
  }
  /**
   * Creates a URL for uploading a loyalty import file.
   *
   * This method is the first step in the loyalty import process. It returns a file path and an upload URL, which you'll use in subsequent steps of the import process.
   * @public
   * @permissionId LOYALTY.MANAGE_IMPORTS
   * @adminMethod
   */
  function createLoyaltyImportFileUrl(): Promise<CreateLoyaltyImportFileUrlResponse>;
  /**
   * Creates a query to retrieve a list of loyalty imports.
   *
   * The `queryLoyaltyImports()` function builds a query to retrieve a list of imports and returns a `LoyaltyImportsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is typically used to run the query using the `find()` function.
   *
   * You can refine the query by chaining `LoyaltyImportsQueryBuilder` functions onto the query. `LoyaltyImportsQueryBuilder` functions enable you to sort, filter, and control the results `queryLoyaltyImports()` returns.
   *
   * `queryLoyaltyImports()` runs with these `LoyaltyImportsQueryBuilder` defaults, which you can override:
   *
   * - `limit(50)`
   * - `descending("_createdDate")`
   *
   * The functions that are chained to `queryLoyaltyImports()` are applied in the order they're called. For example, if you apply ascending('status') and then descending('_createdDate'), the results are sorted first by the status, and then, if there are multiple results with the same status, the items are sorted by the created date.
   * @public
   * @permissionId LOYALTY.MANAGE_IMPORTS
   * @adminMethod
   */
  function queryLoyaltyImports(): LoyaltyImportsQueryBuilder;
  interface QueryCursorResult$3 {
      cursors: Cursors$5;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface LoyaltyImportsQueryResult extends QueryCursorResult$3 {
      items: LoyaltyImport[];
      query: LoyaltyImportsQueryBuilder;
      next: () => Promise<LoyaltyImportsQueryResult>;
      prev: () => Promise<LoyaltyImportsQueryResult>;
  }
  interface LoyaltyImportsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      eq: (propertyName: '_createdDate' | '_updatedDate' | 'status', value: any) => LoyaltyImportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      ne: (propertyName: '_createdDate' | '_updatedDate' | 'status', value: any) => LoyaltyImportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => LoyaltyImportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => LoyaltyImportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => LoyaltyImportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => LoyaltyImportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       */
      hasSome: (propertyName: '_createdDate' | '_updatedDate' | 'status', value: any[]) => LoyaltyImportsQueryBuilder;
      in: (propertyName: '_createdDate' | '_updatedDate' | 'status', value: any) => LoyaltyImportsQueryBuilder;
      exists: (propertyName: '_createdDate' | '_updatedDate' | 'status', value: boolean) => LoyaltyImportsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
      ascending: (...propertyNames: Array<'_createdDate' | '_updatedDate' | 'status'>) => LoyaltyImportsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
      descending: (...propertyNames: Array<'_createdDate' | '_updatedDate' | 'status'>) => LoyaltyImportsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object. */
      limit: (limit: number) => LoyaltyImportsQueryBuilder;
      /** @param cursor - A pointer to specific record */
      skipTo: (cursor: string) => LoyaltyImportsQueryBuilder;
      find: () => Promise<LoyaltyImportsQueryResult>;
  }
  /**
   * Deletes a loyalty import.
   * @param loyaltyImportId - Loyalty import ID.
   * @internal
   * @requiredField loyaltyImportId
   * @permissionId LOYALTY.MANAGE_IMPORTS
   * @adminMethod
   */
  function deleteLoyaltyImport(loyaltyImportId: string, options?: DeleteLoyaltyImportOptions): Promise<void>;
  interface DeleteLoyaltyImportOptions {
      /**
       * Revision number, which increments by 1 each time the loyalty import is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the loyalty import.
       */
      revision?: string;
  }
  
  type loyaltyImportsV1LoyaltyImport_universal_d_LoyaltyImport = LoyaltyImport;
  type loyaltyImportsV1LoyaltyImport_universal_d_ImportStatus = ImportStatus;
  const loyaltyImportsV1LoyaltyImport_universal_d_ImportStatus: typeof ImportStatus;
  type loyaltyImportsV1LoyaltyImport_universal_d_FileMetadata = FileMetadata;
  type loyaltyImportsV1LoyaltyImport_universal_d_FileHeader = FileHeader;
  type loyaltyImportsV1LoyaltyImport_universal_d_HeaderMappingInfo = HeaderMappingInfo;
  type loyaltyImportsV1LoyaltyImport_universal_d_HeaderMapping = HeaderMapping;
  type loyaltyImportsV1LoyaltyImport_universal_d_ColumnName = ColumnName;
  const loyaltyImportsV1LoyaltyImport_universal_d_ColumnName: typeof ColumnName;
  type loyaltyImportsV1LoyaltyImport_universal_d_SampleDataRow = SampleDataRow;
  type loyaltyImportsV1LoyaltyImport_universal_d_ParseResult = ParseResult;
  type loyaltyImportsV1LoyaltyImport_universal_d_ImportResult = ImportResult;
  type loyaltyImportsV1LoyaltyImport_universal_d_CreateLoyaltyImportRequest = CreateLoyaltyImportRequest;
  type loyaltyImportsV1LoyaltyImport_universal_d_CreateLoyaltyImportResponse = CreateLoyaltyImportResponse;
  type loyaltyImportsV1LoyaltyImport_universal_d_GetLoyaltyImportRequest = GetLoyaltyImportRequest;
  type loyaltyImportsV1LoyaltyImport_universal_d_GetLoyaltyImportResponse = GetLoyaltyImportResponse;
  type loyaltyImportsV1LoyaltyImport_universal_d_GetErrorFileDownloadUrlRequest = GetErrorFileDownloadUrlRequest;
  type loyaltyImportsV1LoyaltyImport_universal_d_GetErrorFileDownloadUrlResponse = GetErrorFileDownloadUrlResponse;
  type loyaltyImportsV1LoyaltyImport_universal_d_ExecuteLoyaltyImportRequest = ExecuteLoyaltyImportRequest;
  type loyaltyImportsV1LoyaltyImport_universal_d_ExecuteLoyaltyImportResponse = ExecuteLoyaltyImportResponse;
  type loyaltyImportsV1LoyaltyImport_universal_d_CreateLoyaltyImportFileUrlRequest = CreateLoyaltyImportFileUrlRequest;
  type loyaltyImportsV1LoyaltyImport_universal_d_CreateLoyaltyImportFileUrlResponse = CreateLoyaltyImportFileUrlResponse;
  type loyaltyImportsV1LoyaltyImport_universal_d_QueryLoyaltyImportsRequest = QueryLoyaltyImportsRequest;
  type loyaltyImportsV1LoyaltyImport_universal_d_QueryLoyaltyImportsResponse = QueryLoyaltyImportsResponse;
  type loyaltyImportsV1LoyaltyImport_universal_d_DeleteLoyaltyImportRequest = DeleteLoyaltyImportRequest;
  type loyaltyImportsV1LoyaltyImport_universal_d_DeleteLoyaltyImportResponse = DeleteLoyaltyImportResponse;
  type loyaltyImportsV1LoyaltyImport_universal_d_ImportFinished = ImportFinished;
  const loyaltyImportsV1LoyaltyImport_universal_d_createLoyaltyImport: typeof createLoyaltyImport;
  type loyaltyImportsV1LoyaltyImport_universal_d_CreateLoyaltyImportOptions = CreateLoyaltyImportOptions;
  const loyaltyImportsV1LoyaltyImport_universal_d_getLoyaltyImport: typeof getLoyaltyImport;
  const loyaltyImportsV1LoyaltyImport_universal_d_getErrorFileDownloadUrl: typeof getErrorFileDownloadUrl;
  const loyaltyImportsV1LoyaltyImport_universal_d_executeLoyaltyImport: typeof executeLoyaltyImport;
  type loyaltyImportsV1LoyaltyImport_universal_d_ExecuteLoyaltyImportOptions = ExecuteLoyaltyImportOptions;
  const loyaltyImportsV1LoyaltyImport_universal_d_createLoyaltyImportFileUrl: typeof createLoyaltyImportFileUrl;
  const loyaltyImportsV1LoyaltyImport_universal_d_queryLoyaltyImports: typeof queryLoyaltyImports;
  type loyaltyImportsV1LoyaltyImport_universal_d_LoyaltyImportsQueryResult = LoyaltyImportsQueryResult;
  type loyaltyImportsV1LoyaltyImport_universal_d_LoyaltyImportsQueryBuilder = LoyaltyImportsQueryBuilder;
  const loyaltyImportsV1LoyaltyImport_universal_d_deleteLoyaltyImport: typeof deleteLoyaltyImport;
  type loyaltyImportsV1LoyaltyImport_universal_d_DeleteLoyaltyImportOptions = DeleteLoyaltyImportOptions;
  namespace loyaltyImportsV1LoyaltyImport_universal_d {
    export {
      loyaltyImportsV1LoyaltyImport_universal_d_LoyaltyImport as LoyaltyImport,
      loyaltyImportsV1LoyaltyImport_universal_d_ImportStatus as ImportStatus,
      loyaltyImportsV1LoyaltyImport_universal_d_FileMetadata as FileMetadata,
      loyaltyImportsV1LoyaltyImport_universal_d_FileHeader as FileHeader,
      loyaltyImportsV1LoyaltyImport_universal_d_HeaderMappingInfo as HeaderMappingInfo,
      loyaltyImportsV1LoyaltyImport_universal_d_HeaderMapping as HeaderMapping,
      loyaltyImportsV1LoyaltyImport_universal_d_ColumnName as ColumnName,
      loyaltyImportsV1LoyaltyImport_universal_d_SampleDataRow as SampleDataRow,
      loyaltyImportsV1LoyaltyImport_universal_d_ParseResult as ParseResult,
      loyaltyImportsV1LoyaltyImport_universal_d_ImportResult as ImportResult,
      loyaltyImportsV1LoyaltyImport_universal_d_CreateLoyaltyImportRequest as CreateLoyaltyImportRequest,
      loyaltyImportsV1LoyaltyImport_universal_d_CreateLoyaltyImportResponse as CreateLoyaltyImportResponse,
      loyaltyImportsV1LoyaltyImport_universal_d_GetLoyaltyImportRequest as GetLoyaltyImportRequest,
      loyaltyImportsV1LoyaltyImport_universal_d_GetLoyaltyImportResponse as GetLoyaltyImportResponse,
      loyaltyImportsV1LoyaltyImport_universal_d_GetErrorFileDownloadUrlRequest as GetErrorFileDownloadUrlRequest,
      loyaltyImportsV1LoyaltyImport_universal_d_GetErrorFileDownloadUrlResponse as GetErrorFileDownloadUrlResponse,
      loyaltyImportsV1LoyaltyImport_universal_d_ExecuteLoyaltyImportRequest as ExecuteLoyaltyImportRequest,
      loyaltyImportsV1LoyaltyImport_universal_d_ExecuteLoyaltyImportResponse as ExecuteLoyaltyImportResponse,
      loyaltyImportsV1LoyaltyImport_universal_d_CreateLoyaltyImportFileUrlRequest as CreateLoyaltyImportFileUrlRequest,
      loyaltyImportsV1LoyaltyImport_universal_d_CreateLoyaltyImportFileUrlResponse as CreateLoyaltyImportFileUrlResponse,
      loyaltyImportsV1LoyaltyImport_universal_d_QueryLoyaltyImportsRequest as QueryLoyaltyImportsRequest,
      CursorQuery$4 as CursorQuery,
      CursorQueryPagingMethodOneOf$4 as CursorQueryPagingMethodOneOf,
      Sorting$4 as Sorting,
      SortOrder$4 as SortOrder,
      CursorPaging$5 as CursorPaging,
      loyaltyImportsV1LoyaltyImport_universal_d_QueryLoyaltyImportsResponse as QueryLoyaltyImportsResponse,
      CursorPagingMetadata$3 as CursorPagingMetadata,
      Cursors$5 as Cursors,
      loyaltyImportsV1LoyaltyImport_universal_d_DeleteLoyaltyImportRequest as DeleteLoyaltyImportRequest,
      loyaltyImportsV1LoyaltyImport_universal_d_DeleteLoyaltyImportResponse as DeleteLoyaltyImportResponse,
      DomainEvent$8 as DomainEvent,
      DomainEventBodyOneOf$8 as DomainEventBodyOneOf,
      EntityCreatedEvent$8 as EntityCreatedEvent,
      RestoreInfo$8 as RestoreInfo,
      EntityUpdatedEvent$8 as EntityUpdatedEvent,
      EntityDeletedEvent$8 as EntityDeletedEvent,
      ActionEvent$8 as ActionEvent,
      Empty$8 as Empty,
      loyaltyImportsV1LoyaltyImport_universal_d_ImportFinished as ImportFinished,
      MessageEnvelope$8 as MessageEnvelope,
      IdentificationData$8 as IdentificationData,
      IdentificationDataIdOneOf$8 as IdentificationDataIdOneOf,
      WebhookIdentityType$8 as WebhookIdentityType,
      loyaltyImportsV1LoyaltyImport_universal_d_createLoyaltyImport as createLoyaltyImport,
      loyaltyImportsV1LoyaltyImport_universal_d_CreateLoyaltyImportOptions as CreateLoyaltyImportOptions,
      loyaltyImportsV1LoyaltyImport_universal_d_getLoyaltyImport as getLoyaltyImport,
      loyaltyImportsV1LoyaltyImport_universal_d_getErrorFileDownloadUrl as getErrorFileDownloadUrl,
      loyaltyImportsV1LoyaltyImport_universal_d_executeLoyaltyImport as executeLoyaltyImport,
      loyaltyImportsV1LoyaltyImport_universal_d_ExecuteLoyaltyImportOptions as ExecuteLoyaltyImportOptions,
      loyaltyImportsV1LoyaltyImport_universal_d_createLoyaltyImportFileUrl as createLoyaltyImportFileUrl,
      loyaltyImportsV1LoyaltyImport_universal_d_queryLoyaltyImports as queryLoyaltyImports,
      loyaltyImportsV1LoyaltyImport_universal_d_LoyaltyImportsQueryResult as LoyaltyImportsQueryResult,
      loyaltyImportsV1LoyaltyImport_universal_d_LoyaltyImportsQueryBuilder as LoyaltyImportsQueryBuilder,
      loyaltyImportsV1LoyaltyImport_universal_d_deleteLoyaltyImport as deleteLoyaltyImport,
      loyaltyImportsV1LoyaltyImport_universal_d_DeleteLoyaltyImportOptions as DeleteLoyaltyImportOptions,
    };
  }
  
  interface FollowedChannel {
      /**
       * Followed social media channel ID.
       * @readonly
       */
      _id?: string;
      /**
       * ID of the account that has followed a social media channel.
       * @readonly
       */
      accountId?: string;
      /** Followed social media channel type. */
      channel?: Type$3;
      /**
       * Date when an entity for following a social media channel was created.
       * @readonly
       */
      _createdDate?: Date | null;
  }
  enum Type$3 {
      /** Unknown social media channel type. */
      UNKNOWN_CHANNEL = "UNKNOWN_CHANNEL",
      /** Facebook social media channel. */
      FACEBOOK = "FACEBOOK",
      /** Instagram social media channel. */
      INSTAGRAM = "INSTAGRAM",
      /** LinkedIn social media channel. */
      LINKEDIN = "LINKEDIN",
      /** X social media channel. */
      X = "X",
      /** TikTok social media channel. */
      TIKTOK = "TIKTOK"
  }
  interface CreateFollowedChannelRequest {
      /** Followed social media channel details. */
      followedChannel: FollowedChannel;
  }
  interface CreateFollowedChannelResponse {
      /** Followed social media channel details. */
      followedChannel?: FollowedChannel;
  }
  interface ListFollowedChannelsRequest {
  }
  interface ListFollowedChannelsResponse {
      /** List of followed social media channels. */
      followedChannels?: FollowedChannel[];
  }
  interface DomainEvent$7 extends DomainEventBodyOneOf$7 {
      createdEvent?: EntityCreatedEvent$7;
      updatedEvent?: EntityUpdatedEvent$7;
      deletedEvent?: EntityDeletedEvent$7;
      actionEvent?: ActionEvent$7;
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
  interface DomainEventBodyOneOf$7 {
      createdEvent?: EntityCreatedEvent$7;
      updatedEvent?: EntityUpdatedEvent$7;
      deletedEvent?: EntityDeletedEvent$7;
      actionEvent?: ActionEvent$7;
  }
  interface EntityCreatedEvent$7 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$7;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$7 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$7 {
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
  interface EntityDeletedEvent$7 {
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
  interface ActionEvent$7 {
      bodyAsJson?: string;
  }
  interface Empty$7 {
  }
  interface MessageEnvelope$7 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$7;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$7 extends IdentificationDataIdOneOf$7 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$7;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$7 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$7 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Creates an entity for the specified account ID when the account follows a social media channel.
   *
   * Members can only follow enabled channels. A site owner has to enable channels in the dashboard.
   *
   * >**Note:**
   * >This method requires [visitor or member authentication](https://dev.wix.com/docs/build-apps/develop-your-app/access/about-identities).
   * @param followedChannel - Followed social media channel details.
   * @public
   * @documentationMaturity preview
   * @requiredField followedChannel
   * @requiredField followedChannel.channel
   * @permissionId LOYALTY.FOLLOWED_CHANNEL_CREATE
   * @returns Followed social media channel details.
   */
  function createFollowedChannel(followedChannel: FollowedChannel): Promise<FollowedChannel>;
  /**
   * Retrieves a list of social media channels followed by the account. The list is ordered by creation date.
   *
   * >**Note:**
   * >This method requires [visitor or member authentication](https://dev.wix.com/docs/build-apps/develop-your-app/access/about-identities).
   * @public
   * @documentationMaturity preview
   * @permissionId LOYALTY.FOLLOWED_CHANNEL_READ
   */
  function listFollowedChannels(): Promise<ListFollowedChannelsResponse>;
  
  type loyaltySocialmediaV1FollowedChannel_universal_d_FollowedChannel = FollowedChannel;
  type loyaltySocialmediaV1FollowedChannel_universal_d_CreateFollowedChannelRequest = CreateFollowedChannelRequest;
  type loyaltySocialmediaV1FollowedChannel_universal_d_CreateFollowedChannelResponse = CreateFollowedChannelResponse;
  type loyaltySocialmediaV1FollowedChannel_universal_d_ListFollowedChannelsRequest = ListFollowedChannelsRequest;
  type loyaltySocialmediaV1FollowedChannel_universal_d_ListFollowedChannelsResponse = ListFollowedChannelsResponse;
  const loyaltySocialmediaV1FollowedChannel_universal_d_createFollowedChannel: typeof createFollowedChannel;
  const loyaltySocialmediaV1FollowedChannel_universal_d_listFollowedChannels: typeof listFollowedChannels;
  namespace loyaltySocialmediaV1FollowedChannel_universal_d {
    export {
      loyaltySocialmediaV1FollowedChannel_universal_d_FollowedChannel as FollowedChannel,
      Type$3 as Type,
      loyaltySocialmediaV1FollowedChannel_universal_d_CreateFollowedChannelRequest as CreateFollowedChannelRequest,
      loyaltySocialmediaV1FollowedChannel_universal_d_CreateFollowedChannelResponse as CreateFollowedChannelResponse,
      loyaltySocialmediaV1FollowedChannel_universal_d_ListFollowedChannelsRequest as ListFollowedChannelsRequest,
      loyaltySocialmediaV1FollowedChannel_universal_d_ListFollowedChannelsResponse as ListFollowedChannelsResponse,
      DomainEvent$7 as DomainEvent,
      DomainEventBodyOneOf$7 as DomainEventBodyOneOf,
      EntityCreatedEvent$7 as EntityCreatedEvent,
      RestoreInfo$7 as RestoreInfo,
      EntityUpdatedEvent$7 as EntityUpdatedEvent,
      EntityDeletedEvent$7 as EntityDeletedEvent,
      ActionEvent$7 as ActionEvent,
      Empty$7 as Empty,
      MessageEnvelope$7 as MessageEnvelope,
      IdentificationData$7 as IdentificationData,
      IdentificationDataIdOneOf$7 as IdentificationDataIdOneOf,
      WebhookIdentityType$7 as WebhookIdentityType,
      loyaltySocialmediaV1FollowedChannel_universal_d_createFollowedChannel as createFollowedChannel,
      loyaltySocialmediaV1FollowedChannel_universal_d_listFollowedChannels as listFollowedChannels,
    };
  }
  
  /** Loyalty transaction. */
  interface LoyaltyTransaction extends LoyaltyTransactionTransactionTypeInfoOneOf {
      /** Information on points earned. */
      earnInfo?: EarnInfo;
      /** Information on points redeemed. */
      redeemInfo?: RedeemInfo;
      /** Information on points adjusted. */
      adjustInfo?: AdjustInfo;
      /** Information on points refunded. */
      refundInfo?: RefundInfo;
      /** Information on points expired. */
      expireInfo?: ExpireInfo;
      /** Transaction ID. */
      _id?: string | null;
      /** Account ID. */
      accountId?: string;
      /**
       * Date and time the transaction was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * The number of points earned, adjusted, redeemed, or expired in the transaction.
       *
       * + `EARN`: Number of points earned by the customer taking an action. Example: `20`
       * + `REDEEM`: The number of points redeemed by the customer for a reward. Example: `-50`
       * + `ADJUST`: The number of points refunded for a previously redeemed reward. Examples: `20`, `-30`
       * + `REFUND`: The number of points refunded for a previously redeemed reward. Example: `60`
       * + `EXPIRE`: The number of points that expired due to customer inactivity for a configured period. Example: `-70`
       */
      amount?: number;
      /** Transaction types. */
      transactionType?: TransactionType;
      /** Transaction description. */
      description?: string;
      /** Unique identifier, generated by the client. Used to recognize repeated attempts of the same request. Only present when manually adding points using the [Earn Points](https://dev.wix.com/docs/rest/crm/loyalty-program/accounts/earn-points) endpoint. */
      idempotencyKey?: string;
  }
  /** @oneof */
  interface LoyaltyTransactionTransactionTypeInfoOneOf {
      /** Information on points earned. */
      earnInfo?: EarnInfo;
      /** Information on points redeemed. */
      redeemInfo?: RedeemInfo;
      /** Information on points adjusted. */
      adjustInfo?: AdjustInfo;
      /** Information on points refunded. */
      refundInfo?: RefundInfo;
      /** Information on points expired. */
      expireInfo?: ExpireInfo;
  }
  enum TransactionType {
      /** Unknown transaction type. */
      UNKNOWN = "UNKNOWN",
      /** Number of points earned by the customer taking an action. See [Earn points](https://dev.wix.com/docs/rest/crm/loyalty-program/accounts/earn-points) for more information. */
      EARN = "EARN",
      /** Number of points redeemed by the customer for a reward. */
      REDEEM = "REDEEM",
      /** Number of points refunded for a previously redeemed reward. See [Adjust Points](https://dev.wix.com/docs/rest/crm/loyalty-program/accounts/adjust-points) for more information. */
      ADJUST = "ADJUST",
      /** Number of points refunded for a previously redeemed reward. */
      REFUND = "REFUND",
      /** Number of points that expired due to customer inactivity for a configured period. */
      EXPIRE = "EXPIRE"
  }
  interface EarnInfo extends EarnInfoActivityDetailsOneOf {
      /**
       * Followed social media details.
       * @internal
       */
      followedSocialMedia?: FollowedSocialMedia$1;
      /**
       * ID of the the app responsible for providing the earning points data.
       * @readonly
       */
      appId?: string;
      /** Activity type. */
      activityType?: string;
      /** Order ID. */
      orderId?: string | null;
  }
  /** @oneof */
  interface EarnInfoActivityDetailsOneOf {
      /**
       * Followed social media details.
       * @internal
       */
      followedSocialMedia?: FollowedSocialMedia$1;
  }
  interface FollowedSocialMedia$1 {
      /**
       * Social media channel.
       * Example: `FACEBOOK`, `INSTAGRAM`.
       */
      channel?: string;
  }
  interface RedeemInfo {
      /**
       * ID of the reward that was redeemed.
       * @readonly
       */
      rewardId?: string;
      /**
       * Type of reward that was redeemed.
       * @readonly
       */
      rewardType?: string | null;
      /**
       * ID of the specific item that was redeemed in this transaction.
       *
       * Each reward that is redeemed has a unique `referenceEntityId`.
       * @readonly
       */
      referenceEntityId?: string | null;
  }
  interface AdjustInfo {
      /**
       * App ID of application that initiated this points adjust.
       * @readonly
       */
      appId?: string;
      /** Amount before adjust. */
      amountBefore?: number;
      /** Amount after adjust. */
      amountAfter?: number;
  }
  interface RefundInfo {
      /**
       * ID of the app responsible for providing the refund points data.
       * @readonly
       */
      appId?: string;
      /**
       * ID of the transaction that was refunded.
       * @readonly
       */
      refundedTransactionId?: string | null;
  }
  interface ExpireInfo {
      /** Amount before expiration. */
      amountBefore?: number;
      /** Amount after expiration. */
      amountAfter?: number;
  }
  interface CreateLoyaltyTransactionRequest {
      /** LoyaltyTransaction to be created. */
      loyaltyTransaction: LoyaltyTransaction;
  }
  interface CreateLoyaltyTransactionResponse {
      /** The created LoyaltyTransaction. */
      loyaltyTransaction?: LoyaltyTransaction;
  }
  interface BulkCreateLoyaltyTransactionsRequest {
      /** Transactions to create. */
      loyaltyTransactions?: LoyaltyTransaction[];
      /** Determines if entities must be returned in response. */
      returnEntity?: boolean;
  }
  interface BulkCreateLoyaltyTransactionsResponse {
      /** Results of bulk creation. */
      results?: BulkLoyaltyTransactionResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$4;
  }
  interface ItemMetadata$4 {
      /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError$4;
  }
  interface ApplicationError$4 {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  interface BulkLoyaltyTransactionResult {
      /** Individual loyalty transaction metadata. */
      itemMetadata?: ItemMetadata$4;
      /** Only exists if `returnEntity` was set to true in the request. */
      item?: LoyaltyTransaction;
  }
  interface BulkActionMetadata$4 {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface GetLoyaltyTransactionRequest {
      /** ID of the loyalty transaction to be retrieved. */
      loyaltyTransactionId: string;
  }
  interface GetLoyaltyTransactionResponse {
      /** Requested `Loyalty Transaction` object. */
      loyaltyTransaction?: LoyaltyTransaction;
  }
  interface QueryLoyaltyTransactionsRequest {
      /** Loyalty transaction query parameters. */
      query?: CursorQuery$3;
  }
  interface CursorQuery$3 extends CursorQueryPagingMethodOneOf$3 {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$4;
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
      sort?: Sorting$3[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$3 {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$4;
  }
  interface Sorting$3 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$3;
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
  enum SortOrder$3 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$4 {
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
  interface QueryLoyaltyTransactionsResponse {
      /** List of loyalty transactions. */
      loyaltyTransactions?: LoyaltyTransaction[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata$2;
  }
  interface CursorPagingMetadata$2 {
      /** Number of items returned in current page. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors$4;
      /**
       * Whether there are more pages to retrieve following the current page.
       *
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
      /**
       * Total number of items matching the filter.
       * Available only on the first page of *Search* results, not included in *Query* or *List* results.
       * If the Search results span multiple pages, the value of `total` will exceed the number of items returned on the first page.
       * @internal
       */
      total?: number | null;
  }
  interface Cursors$4 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface DomainEvent$6 extends DomainEventBodyOneOf$6 {
      createdEvent?: EntityCreatedEvent$6;
      updatedEvent?: EntityUpdatedEvent$6;
      deletedEvent?: EntityDeletedEvent$6;
      actionEvent?: ActionEvent$6;
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
  interface DomainEventBodyOneOf$6 {
      createdEvent?: EntityCreatedEvent$6;
      updatedEvent?: EntityUpdatedEvent$6;
      deletedEvent?: EntityDeletedEvent$6;
      actionEvent?: ActionEvent$6;
  }
  interface EntityCreatedEvent$6 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$6;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$6 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$6 {
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
  interface EntityDeletedEvent$6 {
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
  interface ActionEvent$6 {
      bodyAsJson?: string;
  }
  interface Empty$6 {
  }
  interface GetTransactionSumRequest {
      /** Filter loyalty transactions to sum */
      filter?: Record<string, any> | null;
  }
  interface GetTransactionSumResponse {
      /** Total amount of all filtered loyalty transactions */
      totalAmount?: number;
  }
  interface MessageEnvelope$6 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$6;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$6 extends IdentificationDataIdOneOf$6 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$6;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$6 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$6 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Creates a LoyaltyTransaction.
   * @param loyaltyTransaction - LoyaltyTransaction to be created.
   * @internal
   * @documentationMaturity preview
   * @requiredField loyaltyTransaction
   * @permissionId LOYALTY.MANAGE_TRANSACTIONS
   * @adminMethod
   * @returns The created LoyaltyTransaction.
   */
  function createLoyaltyTransaction(loyaltyTransaction: LoyaltyTransaction): Promise<LoyaltyTransaction>;
  /**
   * Creates up to 100 loyalty transactions.
   * @internal
   * @documentationMaturity preview
   * @permissionId LOYALTY.MANAGE_TRANSACTIONS
   * @adminMethod
   */
  function bulkCreateLoyaltyTransactions(options?: BulkCreateLoyaltyTransactionsOptions): Promise<BulkCreateLoyaltyTransactionsResponse>;
  interface BulkCreateLoyaltyTransactionsOptions {
      /** Transactions to create. */
      loyaltyTransactions?: LoyaltyTransaction[];
      /** Determines if entities must be returned in response. */
      returnEntity?: boolean;
  }
  /**
   * Retrieves a transaction.
   * @param loyaltyTransactionId - ID of the loyalty transaction to be retrieved.
   * @public
   * @documentationMaturity preview
   * @requiredField loyaltyTransactionId
   * @permissionId LOYALTY.READ_TRANSACTIONS
   * @adminMethod
   * @returns Requested `Loyalty Transaction` object.
   */
  function getLoyaltyTransaction(loyaltyTransactionId: string): Promise<LoyaltyTransaction>;
  /**
   * Retrieves a list of loyalty transactions, given the provided [paging, filtering, and sorting][1].
   *
   * Supported fields for filtering and sorting:
   * `id`, `accountId`, `idempotencyKey`, `transactionType`, `amount`, `description`
   *
   * To learn how to query Loyalty Transactions, see [API Query Language][2].
   *
   * [1]: https://dev.wix.com/api/rest/getting-started/sorting-and-paging
   * [2]: https://dev.wix.com/api/rest/getting-started/api-query-language
   * @public
   * @documentationMaturity preview
   * @permissionId LOYALTY.READ_TRANSACTIONS
   * @adminMethod
   */
  function queryLoyaltyTransactions(): LoyaltyTransactionsQueryBuilder;
  interface QueryCursorResult$2 {
      cursors: Cursors$4;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface LoyaltyTransactionsQueryResult extends QueryCursorResult$2 {
      items: LoyaltyTransaction[];
      query: LoyaltyTransactionsQueryBuilder;
      next: () => Promise<LoyaltyTransactionsQueryResult>;
      prev: () => Promise<LoyaltyTransactionsQueryResult>;
  }
  interface LoyaltyTransactionsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | 'accountId' | 'amount' | 'transactionType' | 'description' | 'idempotencyKey', value: any) => LoyaltyTransactionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | 'accountId' | 'amount' | 'transactionType' | 'description' | 'idempotencyKey', value: any) => LoyaltyTransactionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: 'amount', value: any) => LoyaltyTransactionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: 'amount', value: any) => LoyaltyTransactionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: 'amount', value: any) => LoyaltyTransactionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: 'amount', value: any) => LoyaltyTransactionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'accountId' | 'description' | 'idempotencyKey', value: string) => LoyaltyTransactionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | 'accountId' | 'amount' | 'transactionType' | 'description' | 'idempotencyKey', value: any[]) => LoyaltyTransactionsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'accountId' | 'amount' | 'transactionType' | 'description' | 'idempotencyKey', value: any) => LoyaltyTransactionsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | 'accountId' | 'amount' | 'transactionType' | 'description' | 'idempotencyKey', value: boolean) => LoyaltyTransactionsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | 'accountId' | 'amount' | 'transactionType' | 'description' | 'idempotencyKey'>) => LoyaltyTransactionsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | 'accountId' | 'amount' | 'transactionType' | 'description' | 'idempotencyKey'>) => LoyaltyTransactionsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => LoyaltyTransactionsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => LoyaltyTransactionsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<LoyaltyTransactionsQueryResult>;
  }
  /**
   * Returns total amount sum of filtered transactions
   * @internal
   * @documentationMaturity preview
   * @permissionId LOYALTY.READ_TRANSACTIONS
   * @adminMethod
   */
  function getTransactionSum(options?: GetTransactionSumOptions): Promise<GetTransactionSumResponse>;
  interface GetTransactionSumOptions {
      /** Filter loyalty transactions to sum */
      filter?: Record<string, any> | null;
  }
  
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_LoyaltyTransaction = LoyaltyTransaction;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_LoyaltyTransactionTransactionTypeInfoOneOf = LoyaltyTransactionTransactionTypeInfoOneOf;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_TransactionType = TransactionType;
  const loyaltyTransactionV1LoyaltyTransaction_universal_d_TransactionType: typeof TransactionType;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_EarnInfo = EarnInfo;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_EarnInfoActivityDetailsOneOf = EarnInfoActivityDetailsOneOf;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_RedeemInfo = RedeemInfo;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_AdjustInfo = AdjustInfo;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_RefundInfo = RefundInfo;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_ExpireInfo = ExpireInfo;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_CreateLoyaltyTransactionRequest = CreateLoyaltyTransactionRequest;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_CreateLoyaltyTransactionResponse = CreateLoyaltyTransactionResponse;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_BulkCreateLoyaltyTransactionsRequest = BulkCreateLoyaltyTransactionsRequest;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_BulkCreateLoyaltyTransactionsResponse = BulkCreateLoyaltyTransactionsResponse;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_BulkLoyaltyTransactionResult = BulkLoyaltyTransactionResult;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_GetLoyaltyTransactionRequest = GetLoyaltyTransactionRequest;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_GetLoyaltyTransactionResponse = GetLoyaltyTransactionResponse;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_QueryLoyaltyTransactionsRequest = QueryLoyaltyTransactionsRequest;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_QueryLoyaltyTransactionsResponse = QueryLoyaltyTransactionsResponse;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_GetTransactionSumRequest = GetTransactionSumRequest;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_GetTransactionSumResponse = GetTransactionSumResponse;
  const loyaltyTransactionV1LoyaltyTransaction_universal_d_createLoyaltyTransaction: typeof createLoyaltyTransaction;
  const loyaltyTransactionV1LoyaltyTransaction_universal_d_bulkCreateLoyaltyTransactions: typeof bulkCreateLoyaltyTransactions;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_BulkCreateLoyaltyTransactionsOptions = BulkCreateLoyaltyTransactionsOptions;
  const loyaltyTransactionV1LoyaltyTransaction_universal_d_getLoyaltyTransaction: typeof getLoyaltyTransaction;
  const loyaltyTransactionV1LoyaltyTransaction_universal_d_queryLoyaltyTransactions: typeof queryLoyaltyTransactions;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_LoyaltyTransactionsQueryResult = LoyaltyTransactionsQueryResult;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_LoyaltyTransactionsQueryBuilder = LoyaltyTransactionsQueryBuilder;
  const loyaltyTransactionV1LoyaltyTransaction_universal_d_getTransactionSum: typeof getTransactionSum;
  type loyaltyTransactionV1LoyaltyTransaction_universal_d_GetTransactionSumOptions = GetTransactionSumOptions;
  namespace loyaltyTransactionV1LoyaltyTransaction_universal_d {
    export {
      loyaltyTransactionV1LoyaltyTransaction_universal_d_LoyaltyTransaction as LoyaltyTransaction,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_LoyaltyTransactionTransactionTypeInfoOneOf as LoyaltyTransactionTransactionTypeInfoOneOf,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_TransactionType as TransactionType,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_EarnInfo as EarnInfo,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_EarnInfoActivityDetailsOneOf as EarnInfoActivityDetailsOneOf,
      FollowedSocialMedia$1 as FollowedSocialMedia,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_RedeemInfo as RedeemInfo,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_AdjustInfo as AdjustInfo,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_RefundInfo as RefundInfo,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_ExpireInfo as ExpireInfo,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_CreateLoyaltyTransactionRequest as CreateLoyaltyTransactionRequest,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_CreateLoyaltyTransactionResponse as CreateLoyaltyTransactionResponse,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_BulkCreateLoyaltyTransactionsRequest as BulkCreateLoyaltyTransactionsRequest,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_BulkCreateLoyaltyTransactionsResponse as BulkCreateLoyaltyTransactionsResponse,
      ItemMetadata$4 as ItemMetadata,
      ApplicationError$4 as ApplicationError,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_BulkLoyaltyTransactionResult as BulkLoyaltyTransactionResult,
      BulkActionMetadata$4 as BulkActionMetadata,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_GetLoyaltyTransactionRequest as GetLoyaltyTransactionRequest,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_GetLoyaltyTransactionResponse as GetLoyaltyTransactionResponse,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_QueryLoyaltyTransactionsRequest as QueryLoyaltyTransactionsRequest,
      CursorQuery$3 as CursorQuery,
      CursorQueryPagingMethodOneOf$3 as CursorQueryPagingMethodOneOf,
      Sorting$3 as Sorting,
      SortOrder$3 as SortOrder,
      CursorPaging$4 as CursorPaging,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_QueryLoyaltyTransactionsResponse as QueryLoyaltyTransactionsResponse,
      CursorPagingMetadata$2 as CursorPagingMetadata,
      Cursors$4 as Cursors,
      DomainEvent$6 as DomainEvent,
      DomainEventBodyOneOf$6 as DomainEventBodyOneOf,
      EntityCreatedEvent$6 as EntityCreatedEvent,
      RestoreInfo$6 as RestoreInfo,
      EntityUpdatedEvent$6 as EntityUpdatedEvent,
      EntityDeletedEvent$6 as EntityDeletedEvent,
      ActionEvent$6 as ActionEvent,
      Empty$6 as Empty,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_GetTransactionSumRequest as GetTransactionSumRequest,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_GetTransactionSumResponse as GetTransactionSumResponse,
      MessageEnvelope$6 as MessageEnvelope,
      IdentificationData$6 as IdentificationData,
      IdentificationDataIdOneOf$6 as IdentificationDataIdOneOf,
      WebhookIdentityType$6 as WebhookIdentityType,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_createLoyaltyTransaction as createLoyaltyTransaction,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_bulkCreateLoyaltyTransactions as bulkCreateLoyaltyTransactions,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_BulkCreateLoyaltyTransactionsOptions as BulkCreateLoyaltyTransactionsOptions,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_getLoyaltyTransaction as getLoyaltyTransaction,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_queryLoyaltyTransactions as queryLoyaltyTransactions,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_LoyaltyTransactionsQueryResult as LoyaltyTransactionsQueryResult,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_LoyaltyTransactionsQueryBuilder as LoyaltyTransactionsQueryBuilder,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_getTransactionSum as getTransactionSum,
      loyaltyTransactionV1LoyaltyTransaction_universal_d_GetTransactionSumOptions as GetTransactionSumOptions,
    };
  }
  
  /**
   * A loyalty account stores a customer's loyalty points balance. A site's customers can earn points to their account
   * and redeem those points for rewards.
   */
  interface LoyaltyAccount {
      /**
       * Account ID.
       * @readonly
       */
      _id?: string;
      /**
       * Account owner's contact ID. See the [Contacts API](wix-crm-backend/contacts) to learn more.
       * @readonly
       */
      contactId?: string;
      /**
       * Account owner's member ID. See the [Members API](wix-members-backend/introduction) to learn more.
       * @readonly
       */
      memberId?: string | null;
      /**
       * Information about the account totals.
       * @readonly
       */
      points?: Points;
      /**
       * Whether the account has a reward available. `true` if the amount of points in `points.balance` are enough to redeem for a reward.
       * @readonly
       */
      rewardAvailable?: boolean;
      /**
       * Date and time the account was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the account was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Account's last activity date and time.
       * @readonly
       */
      lastActivityDate?: Date | null;
      /**
       * Revision number, which increments by 1 each time the loyalty account is updated.
       *
       * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty account.
       *
       * Ignored when creating an account.
       */
      revision?: string;
      /**
       * Tier information.
       * @readonly
       */
      tier?: Tier$1;
      /**
       * Contact information.
       * @readonly
       */
      contact?: Contact;
      /**
       * Points expiration information
       * @readonly
       */
      pointsExpiration?: PointsExpiration$1;
  }
  interface Points {
      /**
       * Current point balance.
       *
       * Equal to the sum of `earned` and `adjusted` points, minus `redeemed` points.
       * @readonly
       */
      balance?: number;
      /**
       * Total earned points.
       * @readonly
       */
      earned?: number;
      /**
       * Total adjusted points.
       * @readonly
       */
      adjusted?: number;
      /**
       * Total redeemed points.
       * @readonly
       */
      redeemed?: number;
      /**
       * Total expired points.
       * @readonly
       */
      expired?: number;
  }
  /**
   * Tier information.
   *
   * The Tiers API is currently unavailable, but the program may be activated and managed from a site's
   * [loyalty dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Floyalty-accounts/wizard/).
   */
  interface Tier$1 {
      /**
       * Tier ID.
       *
       * This field will not be returned if the account belongs to the base tier.
       * @readonly
       */
      _id?: string | null;
      /**
       * Date and time the tier information was last recalculated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Reserved for internal use.
       * @internal
       * @readonly
       */
      recalculationDate?: Date | null;
      /**
       * Points earned and adjusted over the tier's current rolling window.
       * @readonly
       */
      points?: number;
  }
  /** Loyalty account's contact information */
  interface Contact {
      /**
       * Contact ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Contact's first and last name.
       * @readonly
       */
      name?: string | null;
      /**
       * Contact's profile picture.
       * @readonly
       */
      picture?: Image;
      /**
       * Contact's email addresses.
       * @readonly
       */
      email?: string | null;
      /**
       * Contact's first and last name. If no name is provided, uses contact's email.
       * @readonly
       */
      displayName?: string | null;
  }
  interface Image {
      /** WixMedia image ID. */
      _id?: string;
      /** Image URL. */
      url?: string;
      /**
       * Original image height.
       * @readonly
       */
      height?: number;
      /**
       * Original image width.
       * @readonly
       */
      width?: number;
  }
  interface PointsExpiration$1 {
      /**
       * Date at which points are expiring.
       * @readonly
       */
      expirationDate?: Date | null;
      /**
       * Amount of points that are going to expire at that date.
       * @readonly
       */
      expiringPointsAmount?: number;
  }
  interface RewardAvailabilityUpdated {
      /** True if rewards is available. */
      rewardAvailable?: boolean;
      /** Source of this change. */
      updateTrigger?: UpdateTrigger;
  }
  enum UpdateTrigger {
      /** Undefined trigger. */
      UNDEFINED = "UNDEFINED",
      /** Reward was updated. */
      REWARD_UPDATED = "REWARD_UPDATED",
      /** Balance was updated. */
      BALANCE_UPDATED = "BALANCE_UPDATED",
      /** Tiers were recalculated. */
      TIERS_RECALCULATED = "TIERS_RECALCULATED"
  }
  interface CreateAccountRequest {
      /**
       * Contact ID for a Wix site contact. See the [Contacts API](wix-crm-backend/contacts) to learn more.
       *
       */
      contactId: string;
  }
  interface CreateAccountResponse {
      /** Created loyalty account. */
      account?: LoyaltyAccount;
  }
  interface EarnPointsRequest extends EarnPointsRequestActivityDetailsOneOf {
      /** Followed social media details. */
      followedSocialMedia?: FollowedSocialMedia;
      /** Loyalty account ID. */
      accountId: string;
      /**
       * Amount of points to earn. Must be a positive, whole number.
       *
       * Min: `1`
       *
       * Max: `9999999`
       */
      amount?: number;
      /**
       * Description of how the points were earned.
       *
       * Max: 100 characters
       */
      description?: string;
      /**
       * ID of the app that initiated the transaction.
       *
       * If points were earned manually, then the `appId` is the Loyalty app's
       * `wixAppId` of `553c79f3-5625-4f38-b14b-ef7c0d1e87df`. If points were earned in an automatic event,
       * then the `appId` is from that automation's `sourceAppId`.
       */
      appId: string;
      /**
       * Unique string identifier generated by the app. Wix uses this identifier to recognize subsequent retries of the same request.
       *
       * Please use `GUID` format.
       */
      idempotencyKey: string;
      /**
       * Activity type.
       *
       * If points were earned through automation it should be set to trigger key.
       */
      activityType?: string | null;
      /** Order id which was source of this transaction. */
      orderId?: string | null;
  }
  /** @oneof */
  interface EarnPointsRequestActivityDetailsOneOf {
      /** Followed social media details. */
      followedSocialMedia?: FollowedSocialMedia;
  }
  interface FollowedSocialMedia {
      /**
       * Social media channel.
       * Example: `FACEBOOK`, `INSTAGRAM`.
       */
      channel?: string;
  }
  interface EarnPointsResponse {
      /** Updated loyalty account. */
      account?: LoyaltyAccount;
      /**
       * Transaction ID associated with the points earned.
       * @readonly
       */
      transactionId?: string;
  }
  interface PointsUpdated {
      /** Updated account. */
      account?: LoyaltyAccount;
  }
  interface FirstTransaction {
      /** Updated account. */
      account?: LoyaltyAccount;
  }
  interface AdjustPointsRequest extends AdjustPointsRequestTypeOneOf {
      /**
       * Sets the account's point balance to this amount. Must be a positive, whole number or zero.
       *
       * The net difference between this new balance and the previous balance will be reflected in the `adjusted` field of the customer's account.
       *
       * Min: `0`
       *
       * Max: `999999999`
       */
      balance?: number;
      /**
       * Adjusts the account's point balance by this amount. Must be a whole number with a maximum of 7 digits.
       * The amount can be negative, but cannot be `0`.
       *
       * Min: `-9999999`
       *
       * Max: `9999999`
       */
      amount?: number;
      /**
       * Adjusts the account's point balance by this amount. Also account's "redeemed points" is reduced by this amount.
       * Must be a whole number with a maximum of 7 digits.
       * The amount can be negative, but cannot be `0`.
       *
       * Min: `-9999999`
       *
       * Max: `9999999`
       * @internal
       */
      refund?: number;
      /** Loyalty account ID. */
      accountId: string;
      /** Description to explain the reason for the points adjustment. */
      description?: string | null;
      /**
       * Each time the loyalty account is updated, `revision` increments by 1.
       *
       * The current `revision` must be passed when adjusting points in the loyalty account. This
       * ensures you're working with the latest version of the loyalty account and prevents unintended overwrites.
       */
      revision?: string;
  }
  /** @oneof */
  interface AdjustPointsRequestTypeOneOf {
      /**
       * Sets the account's point balance to this amount. Must be a positive, whole number or zero.
       *
       * The net difference between this new balance and the previous balance will be reflected in the `adjusted` field of the customer's account.
       *
       * Min: `0`
       *
       * Max: `999999999`
       */
      balance?: number;
      /**
       * Adjusts the account's point balance by this amount. Must be a whole number with a maximum of 7 digits.
       * The amount can be negative, but cannot be `0`.
       *
       * Min: `-9999999`
       *
       * Max: `9999999`
       */
      amount?: number;
      /**
       * Adjusts the account's point balance by this amount. Also account's "redeemed points" is reduced by this amount.
       * Must be a whole number with a maximum of 7 digits.
       * The amount can be negative, but cannot be `0`.
       *
       * Min: `-9999999`
       *
       * Max: `9999999`
       * @internal
       */
      refund?: number;
  }
  interface AdjustPointsResponse {
      /** Adjusted loyalty account. */
      account?: LoyaltyAccount;
      /**
       * Transaction ID associated with the points adjustment.
       * @readonly
       */
      transactionId?: string;
  }
  interface RedeemPointsRequest {
      /** Loyalty account ID. */
      accountId: string;
      /** Reward ID. See [Rewards API](https://dev.wix.com/api/rest/loyalty/rewards/rewards-object) for more details. */
      rewardId: string;
      /** Number of times the given reward will be redeemed. Must be a positive whole number. */
      count?: number;
      /**
       * Revision number, which increments by 1 each time points are redeemed.
       * To prevent conflicting changes, the existing `revision` must be used when redeeming points.
       */
      revision?: string;
      /** Id of the entity that is being redeemed (e.g. orderId for order discount, couponId for coupon reward). */
      referenceEntityId?: string | null;
  }
  interface RedeemPointsResponse {
      /** Loyalty account. */
      account?: LoyaltyAccount;
      /**
       * Transaction ID associated with the redemption.
       * @readonly
       */
      transactionId?: string;
  }
  interface RedeemDeterminedAmountOfPointsRequest {
      /** Loyalty account ID. */
      accountId: string;
      /** Reward ID. See [Rewards API](https://dev.wix.com/api/rest/loyalty/rewards/rewards-object) for more details. */
      rewardId: string;
      /** Number of points to be redeemed off the account. */
      points?: number;
      /**
       * Revision number, which increments by 1 each time points are redeemed.
       * To prevent conflicting changes, the existing `revision` must be used when redeeming points.
       */
      revision?: string;
      /** Id of the entity that is being redeemed (e.g. orderId for order discount, couponId for coupon reward). */
      referenceEntityId?: string | null;
  }
  interface RedeemDeterminedAmountOfPointsResponse {
      /** Loyalty account. */
      account?: LoyaltyAccount;
      /**
       * Transaction ID associated with the redemption.
       * @readonly
       */
      transactionId?: string;
  }
  interface RefundTransactionRequest {
      /**
       * Transaction ID associated with the refund.
       * @readonly
       */
      transactionId: string;
  }
  interface RefundTransactionResponse {
  }
  interface GetAccountRequest {
      /** ID of the account to retrieve. */
      _id: string;
  }
  interface GetAccountResponse {
      /** Retrieved loyalty account. */
      account?: LoyaltyAccount;
  }
  interface QueryLoyaltyAccountsRequest {
      /**
       * Filter object.
       * See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language) for more information.
       */
      query: CursorQuery$2;
  }
  interface CursorQuery$2 extends CursorQueryPagingMethodOneOf$2 {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$3;
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
      sort?: Sorting$2[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$2 {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$3;
  }
  interface Sorting$2 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$2;
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
  enum SortOrder$2 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$3 {
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
  interface QueryLoyaltyAccountsResponse {
      /** Loyalty accounts. */
      loyaltyAccounts?: LoyaltyAccount[];
      /** Paging metadata */
      pagingMetadata?: CursorPagingMetadata$1;
  }
  interface CursorPagingMetadata$1 {
      /** Number of items returned in current page. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors$3;
      /**
       * Whether there are more pages to retrieve following the current page.
       *
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
      /**
       * Total number of items matching the filter.
       * Available only on the first page of *Search* results, not included in *Query* or *List* results.
       * If the Search results span multiple pages, the value of `total` will exceed the number of items returned on the first page.
       * @internal
       */
      total?: number | null;
  }
  interface Cursors$3 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface ListUserAccountsRequest {
      /** Number of items to load. Minimum `1`, maximum `50`. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface ListUserAccountsResponse {
      /** Loyalty accounts. */
      accounts?: LoyaltyAccountForMetaSite[];
  }
  interface LoyaltyAccountForMetaSite {
      /** Loyalty account. */
      account?: LoyaltyAccount;
      /** Metasite ID. */
      metaSiteId?: string;
  }
  interface GetProgramTotalsRequest {
  }
  interface GetProgramTotalsResponse {
      /** Point totals for the entire program. */
      points?: Points;
      /** Tier total for the entire program. */
      tierTotals?: TierTotal[];
  }
  interface TierTotal {
      /**
       * Tier ID. If no Tier ID provided, the ID is null. See [Base tier](https://dev.wix.com/docs/rest/crm/loyalty-program/tiers/introduction)for more information.
       * @readonly
       */
      _id?: string | null;
      /** Total number of loyalty account that belong to a particular Tier. */
      numberOfAccounts?: number;
  }
  interface GetCurrentMemberAccountRequest {
  }
  interface GetCurrentMemberAccountResponse {
      /** Loyalty account. */
      account?: LoyaltyAccount;
  }
  interface GetMyAccountRequest {
  }
  interface GetMyAccountResponse {
      /** Loyalty account. */
      account?: LoyaltyAccount;
  }
  interface GetAccountBySecondaryIdRequest extends GetAccountBySecondaryIdRequestIdOneOf {
      /** Account owner's contact ID. See the [Contacts API](wix-crm-backend/contacts) to learn more. */
      contactId?: string;
      /** Account owner's member ID. See the [Members API](wix-members-backend/introduction) to learn more. */
      memberId?: string;
  }
  /** @oneof */
  interface GetAccountBySecondaryIdRequestIdOneOf {
      /** Account owner's contact ID. See the [Contacts API](wix-crm-backend/contacts) to learn more. */
      contactId?: string;
      /** Account owner's member ID/ See the [Members API](wix-members-backend/introduction) to learn more. */
      memberId?: string;
  }
  interface GetAccountBySecondaryIdResponse {
      /** Retrieved loyalty account. */
      account?: LoyaltyAccount;
  }
  /** Options to use when retrieving a list of loyalty accounts. */
  interface ListAccountsRequest {
      /** List of contact IDs. See the [Contacts API](wix-crm-backend/contacts) to learn more. */
      contactIds?: string[];
      /** Pagination options. */
      cursorPaging?: CursorPaging$3;
  }
  interface ListAccountsResponse {
      /** Retrieved loyalty accounts. */
      accounts?: LoyaltyAccount[];
      /** Details on the paged set of results returned. */
      pagingMetadata?: PagingMetadataV2$3;
  }
  interface PagingMetadataV2$3 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
      total?: number | null;
      /** Flag that indicates the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
      cursors?: Cursors$3;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  /** Options to use when search for loyalty accounts. */
  interface SearchAccountsRequest {
      /** Search options. */
      search?: CursorSearch;
  }
  interface CursorSearch extends CursorSearchPagingMethodOneOf {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$3;
      /**
       * Filter object.
       *
       * Learn more about the [filter section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-filter-section).
       */
      filter?: Record<string, any> | null;
      /**
       * List of sort objects.
       *
       * Learn more about the [sort section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-sort-section).
       */
      sort?: Sorting$2[];
      /** Aggregations are a way to explore large amounts of data by displaying summaries about various partitions of the data and later allowing to narrow the navigation to a specific partition. */
      aggregations?: Aggregation[];
      /** Free text to match in searchable fields. */
      search?: SearchDetails;
      /**
       * UTC offset or IANA time zone. Valid values are
       * ISO 8601 UTC offsets, such as +02:00 or -06:00,
       * and IANA time zone IDs, such as Europe/Rome.
       *
       * Affects all filters and aggregations returned values.
       * You may override this behavior in a specific filter by providing
       * timestamps including time zone. For example, `"2023-12-20T10:52:34.795Z"`.
       */
      timeZone?: string | null;
  }
  /** @oneof */
  interface CursorSearchPagingMethodOneOf {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$3;
  }
  interface Aggregation extends AggregationKindOneOf {
      /** Value aggregation. */
      value?: ValueAggregation;
      /** Range aggregation. */
      range?: RangeAggregation;
      /** Scalar aggregation. */
      scalar?: ScalarAggregation;
      /** Date histogram aggregation. */
      dateHistogram?: DateHistogramAggregation;
      /** Nested aggregation. */
      nested?: NestedAggregation;
      /** User-defined name of aggregation, should be unique, will appear in aggregation results. */
      name?: string | null;
      /** Type of aggregation, client must provide matching aggregation field below. */
      type?: AggregationType;
      /** Field to aggregate by, use dot notation to specify json path. */
      fieldPath?: string;
      /**
       * Deprecated. Use `nested` instead.
       * @deprecated Deprecated. Use `nested` instead.
       * @replacedBy kind.nested
       * @targetRemovalDate 2024-03-30
       */
      groupBy?: GroupByAggregation;
  }
  /** @oneof */
  interface AggregationKindOneOf {
      /** Value aggregation. */
      value?: ValueAggregation;
      /** Range aggregation. */
      range?: RangeAggregation;
      /** Scalar aggregation. */
      scalar?: ScalarAggregation;
      /** Date histogram aggregation. */
      dateHistogram?: DateHistogramAggregation;
      /** Nested aggregation. */
      nested?: NestedAggregation;
  }
  interface RangeBucket {
      /** Inclusive lower bound of the range. Required if `to` is not provided. */
      from?: number | null;
      /** Exclusive upper bound of the range. Required if `from` is not provided. */
      to?: number | null;
  }
  enum SortType {
      /** Sort by number of matches. */
      COUNT = "COUNT",
      /** Sort by value of the field alphabetically. */
      VALUE = "VALUE"
  }
  enum SortDirection {
      /** Sort in descending order. */
      DESC = "DESC",
      /** Sort in ascending order. */
      ASC = "ASC"
  }
  enum MissingValues {
      /** Exclude missing values from the aggregation results. */
      EXCLUDE = "EXCLUDE",
      /** Include missing values in the aggregation results. */
      INCLUDE = "INCLUDE"
  }
  interface IncludeMissingValuesOptions {
      /** Specify custom bucket name. Defaults are [string -> "N/A"], [int -> "0"], [bool -> "false"] ... */
      addToBucket?: string;
  }
  enum ScalarType {
      UNKNOWN_SCALAR_TYPE = "UNKNOWN_SCALAR_TYPE",
      /** Count of distinct values. */
      COUNT_DISTINCT = "COUNT_DISTINCT",
      /** Minimum value. */
      MIN = "MIN",
      /** Maximum value. */
      MAX = "MAX",
      /** Sum of values. */
      SUM = "SUM",
      /** Average of values. */
      AVG = "AVG"
  }
  interface ValueAggregation extends ValueAggregationOptionsOneOf {
      /** Options for including missing values. */
      includeOptions?: IncludeMissingValuesOptions;
      /** Whether to sort by number of matches or value of the field. */
      sortType?: SortType;
      /** Whether to sort in ascending or descending order. */
      sortDirection?: SortDirection;
      /** How many aggregations to return. Can be between 1 and 250. 10 is the default. */
      limit?: number | null;
      /** Whether to include or exclude missing values from the aggregation results. Default: `EXCLUDE`. */
      missingValues?: MissingValues;
  }
  /** @oneof */
  interface ValueAggregationOptionsOneOf {
      /** Options for including missing values. */
      includeOptions?: IncludeMissingValuesOptions;
  }
  enum NestedAggregationType {
      UNKNOWN_AGGREGATION_TYPE = "UNKNOWN_AGGREGATION_TYPE",
      /** An aggregation where result buckets are dynamically built - one per unique value. */
      VALUE = "VALUE",
      /** An aggregation, where user can define set of ranges - each representing a bucket. */
      RANGE = "RANGE",
      /** A single-value metric aggregation. For example, min, max, sum, avg. */
      SCALAR = "SCALAR",
      /** An aggregation, where result buckets are dynamically built - one per time interval (hour, day, week, etc.). */
      DATE_HISTOGRAM = "DATE_HISTOGRAM"
  }
  interface RangeAggregation {
      /** List of range buckets, where during aggregation each entity will be placed in the first bucket its value falls into, based on the provided range bounds. */
      buckets?: RangeBucket[];
  }
  interface ScalarAggregation {
      /** Define the operator for the scalar aggregation. */
      type?: ScalarType;
  }
  interface DateHistogramAggregation {
      /** Interval for date histogram aggregation. */
      interval?: DateHistogramAggregationInterval;
  }
  enum DateHistogramAggregationInterval {
      UNKNOWN_INTERVAL = "UNKNOWN_INTERVAL",
      /** Yearly interval */
      YEAR = "YEAR",
      /** Monthly interval */
      MONTH = "MONTH",
      /** Weekly interval */
      WEEK = "WEEK",
      /** Daily interval */
      DAY = "DAY",
      /** Hourly interval */
      HOUR = "HOUR",
      /** Minute interval */
      MINUTE = "MINUTE",
      /** Second interval */
      SECOND = "SECOND"
  }
  interface NestedAggregationItem extends NestedAggregationItemKindOneOf {
      /** Value aggregation. */
      value?: ValueAggregation;
      /** Range aggregation. */
      range?: RangeAggregation;
      /** Scalar aggregation. */
      scalar?: ScalarAggregation;
      /** Date histogram aggregation. */
      dateHistogram?: DateHistogramAggregation;
      /** User-defined name of aggregation, should be unique, will appear in aggregation results. */
      name?: string | null;
      /** Type of aggregation, client must provide matching aggregation field below. */
      type?: NestedAggregationType;
      /** Field to aggregate by, use dot notation to specify json path. */
      fieldPath?: string;
  }
  /** @oneof */
  interface NestedAggregationItemKindOneOf {
      /** Value aggregation. */
      value?: ValueAggregation;
      /** Range aggregation. */
      range?: RangeAggregation;
      /** Scalar aggregation. */
      scalar?: ScalarAggregation;
      /** Date histogram aggregation. */
      dateHistogram?: DateHistogramAggregation;
  }
  enum AggregationType {
      UNKNOWN_AGGREGATION_TYPE = "UNKNOWN_AGGREGATION_TYPE",
      /** An aggregation where result buckets are dynamically built - one per unique value. */
      VALUE = "VALUE",
      /** An aggregation, where user can define set of ranges - each representing a bucket. */
      RANGE = "RANGE",
      /** A single-value metric aggregation. For example, min, max, sum, avg. */
      SCALAR = "SCALAR",
      /** An aggregation, where result buckets are dynamically built - one per time interval (hour, day, week, etc.) */
      DATE_HISTOGRAM = "DATE_HISTOGRAM",
      /** Multi-level aggregation, where each next aggregation is nested within previous one. */
      NESTED = "NESTED"
  }
  /** Nested aggregation expressed through a list of aggregation where each next aggregation is nested within previous one. */
  interface NestedAggregation {
      /** Flattened list of aggregations, where each next aggregation is nested within previous one. */
      nestedAggregations?: NestedAggregationItem[];
  }
  interface GroupByAggregation extends GroupByAggregationKindOneOf {
      /** Value aggregation configuration. */
      value?: ValueAggregation;
      /** User-defined name of aggregation, should be unique, will appear in aggregation results. */
      name?: string | null;
      /** Field to aggregate by. */
      fieldPath?: string;
  }
  /** @oneof */
  interface GroupByAggregationKindOneOf {
      /** Value aggregation configuration. */
      value?: ValueAggregation;
  }
  interface SearchDetails {
      /** Defines how separate search terms in `expression` are combined. */
      mode?: Mode;
      /** Search term or expression. */
      expression?: string | null;
      /** Fields to search in. If empty - will search in all searchable fields. Use dot notation to specify json path. */
      fields?: string[];
      /** Whether to use auto fuzzy search (allowing typos by a managed proximity algorithm). */
      fuzzy?: boolean;
  }
  enum Mode {
      /** Any of the search terms must be present. */
      OR = "OR",
      /** All search terms must be present. */
      AND = "AND"
  }
  /** Accounts found through provided search capabilities, along with paging and aggregation data of the results. */
  interface SearchAccountsResponse {
      /** Found accounts. */
      accounts?: LoyaltyAccount[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata$1;
      /** Aggregation data */
      aggregationData?: AggregationData;
  }
  interface AggregationData {
      /** key = aggregation name (as derived from search request). */
      results?: AggregationResults[];
  }
  interface ValueAggregationResult {
      /** Value of the field. */
      value?: string;
      /** Count of entities with this value. */
      count?: number;
  }
  interface RangeAggregationResult {
      /** Inclusive lower bound of the range. */
      from?: number | null;
      /** Exclusive upper bound of the range. */
      to?: number | null;
      /** Count of entities in this range. */
      count?: number;
  }
  interface NestedAggregationResults extends NestedAggregationResultsResultOneOf {
      /** Value aggregation results. */
      values?: ValueResults;
      /** Range aggregation results. */
      ranges?: RangeResults;
      /** Scalar aggregation results. */
      scalar?: ScalarResult;
      /** User-defined name of aggregation, matches the one provided in request. */
      name?: string;
      /** Type of aggregation that matches result. */
      type?: AggregationType;
      /** Field to aggregate by, matches the one provided in request. */
      fieldPath?: string;
  }
  /** @oneof */
  interface NestedAggregationResultsResultOneOf {
      /** Value aggregation results. */
      values?: ValueResults;
      /** Range aggregation results. */
      ranges?: RangeResults;
      /** Scalar aggregation results. */
      scalar?: ScalarResult;
  }
  interface ValueResults {
      /** List of value aggregations. */
      results?: ValueAggregationResult[];
  }
  interface RangeResults {
      /** List of ranges returned in same order as requested. */
      results?: RangeAggregationResult[];
  }
  interface ScalarResult {
      /** Type of scalar aggregation. */
      type?: ScalarType;
      /** Value of the scalar aggregation. */
      value?: number;
  }
  interface NestedValueAggregationResult {
      /** Value of the field. */
      value?: string;
      /** Nested aggregations. */
      nestedResults?: NestedAggregationResults;
  }
  interface ValueResult {
      /** Value of the field. */
      value?: string;
      /** Count of entities with this value. */
      count?: number | null;
  }
  interface RangeResult {
      /** Inclusive lower bound of the range. */
      from?: number | null;
      /** Exclusive upper bound of the range. */
      to?: number | null;
      /** Count of entities in this range. */
      count?: number | null;
  }
  interface NestedResultsScalarResult {
      /** Value of the scalar aggregation. */
      value?: number;
  }
  interface NestedResultValue extends NestedResultValueResultOneOf {
      /** Value aggregation result. */
      value?: ValueResult;
      /** Range aggregation result. */
      range?: RangeResult;
      /** Scalar aggregation result. */
      scalar?: NestedResultsScalarResult;
      /** Date histogram aggregation result. */
      dateHistogram?: ValueResult;
  }
  /** @oneof */
  interface NestedResultValueResultOneOf {
      /** Value aggregation result. */
      value?: ValueResult;
      /** Range aggregation result. */
      range?: RangeResult;
      /** Scalar aggregation result. */
      scalar?: NestedResultsScalarResult;
      /** Date histogram aggregation result. */
      dateHistogram?: ValueResult;
  }
  interface Results {
      /** List of nested aggregations. */
      results?: Record<string, NestedResultValue>;
  }
  interface DateHistogramResult {
      /** Date in ISO 8601 format. */
      value?: string;
      /** Count of documents in the bucket. */
      count?: number;
  }
  interface GroupByValueResults {
      /** List of value aggregations. */
      results?: NestedValueAggregationResult[];
  }
  interface DateHistogramResults {
      /** List of date histogram aggregations. */
      results?: DateHistogramResult[];
  }
  /**
   * Results of `NESTED` aggregation type in a flattened form.
   * Aggregations in resulting array are keyed by requested aggregation `name`.
   */
  interface NestedResults {
      /** List of nested aggregations. */
      results?: Results[];
  }
  interface AggregationResults extends AggregationResultsResultOneOf {
      /** Value aggregation results. */
      values?: ValueResults;
      /** Range aggregation results. */
      ranges?: RangeResults;
      /** Scalar aggregation results. */
      scalar?: ScalarResult;
      /** Group by value aggregation results. */
      groupedByValue?: GroupByValueResults;
      /** Date histogram aggregation results. */
      dateHistogram?: DateHistogramResults;
      /** Nested aggregation results. */
      nested?: NestedResults;
      /** User-defined name of aggregation as derived from search request. */
      name?: string;
      /** Type of aggregation that must match provided kind as derived from search request. */
      type?: AggregationType;
      /** Field to aggregate by as derived from search request. */
      fieldPath?: string;
  }
  /** @oneof */
  interface AggregationResultsResultOneOf {
      /** Value aggregation results. */
      values?: ValueResults;
      /** Range aggregation results. */
      ranges?: RangeResults;
      /** Scalar aggregation results. */
      scalar?: ScalarResult;
      /** Group by value aggregation results. */
      groupedByValue?: GroupByValueResults;
      /** Date histogram aggregation results. */
      dateHistogram?: DateHistogramResults;
      /** Nested aggregation results. */
      nested?: NestedResults;
  }
  interface ExportAccountsRequest {
      query?: QueryV2$1;
  }
  interface QueryV2$1 extends QueryV2PagingMethodOneOf$1 {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$1;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$3;
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
      sort?: Sorting$2[];
      /** Array of projected fields. A list of specific field names to return. If `fieldsets` are also specified, the union of `fieldsets` and `fields` is returned. */
      fields?: string[];
      /** Array of named, predefined sets of projected fields. A array of predefined named sets of fields to be returned. Specifying multiple `fieldsets` will return the union of fields from all sets. If `fields` are also specified, the union of `fieldsets` and `fields` is returned. */
      fieldsets?: string[];
  }
  /** @oneof */
  interface QueryV2PagingMethodOneOf$1 {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$1;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$3;
  }
  interface Paging$1 {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface ExportAccountsResponse {
      accounts?: LoyaltyAccount[];
      pagingMetadata?: CursorPagingMetadata$1;
  }
  /** Options to use when looking up count of loyalty accounts. */
  interface CountAccountsRequest {
      /** Filter object. */
      filter?: Record<string, any> | null;
      /** Free text to match in searchable fields. */
      search?: SearchDetails;
  }
  /** Count of accounts found for given search query */
  interface CountAccountsResponse {
      count?: number;
  }
  interface BulkAdjustPointsRequest extends BulkAdjustPointsRequestTypeOneOf {
      balance?: number;
      amount?: number;
      search?: CursorSearch;
  }
  /** @oneof */
  interface BulkAdjustPointsRequestTypeOneOf {
      balance?: number;
      amount?: number;
  }
  interface BulkAdjustPointsResponse {
      /** @readonly */
      asyncJobId?: string | null;
  }
  interface DomainEvent$5 extends DomainEventBodyOneOf$5 {
      createdEvent?: EntityCreatedEvent$5;
      updatedEvent?: EntityUpdatedEvent$5;
      deletedEvent?: EntityDeletedEvent$5;
      actionEvent?: ActionEvent$5;
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
  interface DomainEventBodyOneOf$5 {
      createdEvent?: EntityCreatedEvent$5;
      updatedEvent?: EntityUpdatedEvent$5;
      deletedEvent?: EntityDeletedEvent$5;
      actionEvent?: ActionEvent$5;
  }
  interface EntityCreatedEvent$5 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$5;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$5 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$5 {
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
       * WIP - This property will hold both names and previous values of the updated fields of the entity.
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
  interface EntityDeletedEvent$5 {
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
  interface ActionEvent$5 {
      bodyAsJson?: string;
  }
  interface Empty$5 {
  }
  interface TiersRollingUpdate$1 {
  }
  interface TiersProgramSettingsChanged$1 {
      /** Settings for the tiers program. */
      programSettings?: TiersProgramSettings$1;
  }
  /** There can be single TiersSettings per site and it's global (i.e. applies to all program's tiers) */
  interface TiersProgramSettings$1 extends TiersProgramSettingsPeriodOneOf$1 {
      /**
       * *Required.**
       * Period of time used to calculate loyalty points for tier assignment.
       *
       * The loyalty points accumulated during this period determine if the account meets a tier's required point threshold.
       */
      rollingWindow?: RollingWindow$1;
      /** Tiers program status. */
      status?: Status$4;
      /**
       * Revision number, which increments by 1 each time the loyalty tiers settings are updated.
       *
       * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty tiers settings.
       */
      revision?: string | null;
      /**
       * Date and time the loyalty tiers program was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the loyalty tiers program was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Information about the base loyalty tier.
       *
       * The base tier is the default tier for any account that is unassigned for not meeting
       * the required points threshold of any other tier.
       */
      baseTierDefinition?: TierDefinition$1;
  }
  /** @oneof */
  interface TiersProgramSettingsPeriodOneOf$1 {
      /**
       * *Required.**
       * Period of time used to calculate loyalty points for tier assignment.
       *
       * The loyalty points accumulated during this period determine if the account meets a tier's required point threshold.
       */
      rollingWindow?: RollingWindow$1;
  }
  enum Status$4 {
      /** Unknown status. */
      UNKNOWN = "UNKNOWN",
      /** Tiers are disabled. */
      DISABLED = "DISABLED",
      /** Tiers are enabled but not yet active. */
      DRAFT = "DRAFT",
      /** Tiers are active. */
      ACTIVE = "ACTIVE",
      /** Tiers are paused. */
      PAUSED = "PAUSED"
  }
  /** Information about the tier. */
  interface TierDefinition$1 {
      /** Details about the tier icon. */
      icon?: string;
      /** Tier name. */
      name?: string | null;
      /** Tier description. */
      description?: string | null;
  }
  interface FocalPoint$2 {
      /** X-coordinate of the focal point. */
      x?: number;
      /** Y-coordinate of the focal point. */
      y?: number;
      /** crop by height */
      height?: number | null;
      /** crop by width */
      width?: number | null;
  }
  /**
   * *Required.** Period of time used to calculate loyalty points for tier assignment.
   *
   * The loyalty points accumulated during this period determine if the account meets a tier's required point threshold.
   */
  interface RollingWindow$1 {
      /**
       * Number of months to use for the rolling window period.
       *
       * Min: `12`
       *
       * Max: `36`
       */
      durationInMonths?: number;
  }
  interface SubscriptionEvent extends SubscriptionEventEventOneOf {
      /** Triggered when a subscription is created. */
      created?: SubscriptionCreated;
      /**
       * Triggered when a subscription is assigned to a Wix site, including the initial
       * assignment of a floating subscription or a re-assignement from a different site.
       */
      assigned?: SubscriptionAssigned;
      /** Triggered when a subscription is canceled. */
      cancelled?: SubscriptionCancelled;
      /** Triggered when the subscription's auto renew is turned on. */
      autoRenewTurnedOn?: SubscriptionAutoRenewTurnedOn;
      /** Triggered when the subscription's auto renew is turned off. */
      autoRenewTurnedOff?: SubscriptionAutoRenewTurnedOff;
      /**
       * Triggered when a subscription is unassigned from a Wix site and becomes
       * floating.
       */
      unassigned?: SubscriptionUnassigned;
      /**
       * Triggered when a subscription is transferred from one Wix account to another.
       * A transfer includes cancelling the original subscription and creating a new
       * subscription for the target account. The event returns both the original
       * and the new subscription.
       */
      transferred?: SubscriptionTransferred;
      /** Triggered when a recurring charge succeeds for a subscription. */
      recurringChargeSucceeded?: RecurringChargeSucceeded;
      /**
       * Triggered when a subscription was updated including when its product has been
       * up- or downgraded or the billing cycle is changed.
       */
      contractSwitched?: ContractSwitched;
      /**
       * Triggered when a subscription gets close to the end of its billing cycle.
       * The exact number of days is defined in the billing system.
       */
      nearEndOfPeriod?: SubscriptionNearEndOfPeriod;
      /**
       * Triggered when a subscription is updated and the change doesn't happen
       * immediately but at the end of the current billing cycle.
       */
      pendingChange?: SubscriptionPendingChange;
      /** ID of the subscription's event. */
      eventId?: string | null;
      /**
       * Date and time of the event in
       * [UTC datetime](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      eventDate?: Date | null;
  }
  /** @oneof */
  interface SubscriptionEventEventOneOf {
      /** Triggered when a subscription is created. */
      created?: SubscriptionCreated;
      /**
       * Triggered when a subscription is assigned to a Wix site, including the initial
       * assignment of a floating subscription or a re-assignement from a different site.
       */
      assigned?: SubscriptionAssigned;
      /** Triggered when a subscription is canceled. */
      cancelled?: SubscriptionCancelled;
      /** Triggered when the subscription's auto renew is turned on. */
      autoRenewTurnedOn?: SubscriptionAutoRenewTurnedOn;
      /** Triggered when the subscription's auto renew is turned off. */
      autoRenewTurnedOff?: SubscriptionAutoRenewTurnedOff;
      /**
       * Triggered when a subscription is unassigned from a Wix site and becomes
       * floating.
       */
      unassigned?: SubscriptionUnassigned;
      /**
       * Triggered when a subscription is transferred from one Wix account to another.
       * A transfer includes cancelling the original subscription and creating a new
       * subscription for the target account. The event returns both the original
       * and the new subscription.
       */
      transferred?: SubscriptionTransferred;
      /** Triggered when a recurring charge succeeds for a subscription. */
      recurringChargeSucceeded?: RecurringChargeSucceeded;
      /**
       * Triggered when a subscription was updated including when its product has been
       * up- or downgraded or the billing cycle is changed.
       */
      contractSwitched?: ContractSwitched;
      /**
       * Triggered when a subscription gets close to the end of its billing cycle.
       * The exact number of days is defined in the billing system.
       */
      nearEndOfPeriod?: SubscriptionNearEndOfPeriod;
      /**
       * Triggered when a subscription is updated and the change doesn't happen
       * immediately but at the end of the current billing cycle.
       */
      pendingChange?: SubscriptionPendingChange;
  }
  /** Triggered when a subscription is created. */
  interface SubscriptionCreated {
      /** Created subscription. */
      subscription?: Subscription;
      /** Metadata for the `created` event. */
      metadata?: Record<string, string>;
      /**
       * Subscription reactivation data.
       * A subscription can be reactivated for example if it was incorrectly canceled because of fraud and then reactivated
       * by the billing system
       */
      reactivationData?: ReactivationData;
  }
  /**
   * A subscription holds information about a Premium product that a Wix account
   * owner has purchased including details about the billing.
   */
  interface Subscription {
      /** ID of the subscription. */
      _id?: string;
      /** ID of the Wix account that purchased the subscription. */
      userId?: string;
      /**
       * ID of the [product](https://bo.wix.com/wix-docs/rest/premium/premium-product-catalog-v2/products/product-object)
       * for which the subscription was purchased.
       */
      productId?: string;
      /**
       * Date and time the subscription was created in
       * [UTC datetime](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      createdAt?: Date | null;
      /**
       * Date and time the subscription was last updated in
       * [UTC datetime](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      updatedAt?: Date | null;
      /**
       * ID of the metasite that the subscription is assigned to.
       * Available only when the subscription is assigned to a Wix site.
       * Subscriptions for account level products can't be assigned to a Wix site.
       */
      metaSiteId?: string | null;
      /** Information about the system that manages the subscription's billing. */
      billingReference?: BillingReference;
      /** Information about the billing cycle of the subscription. */
      cycle?: Cycle;
      /**
       * Subscription status.
       *
       * + `UNKNOWN`: Default status.
       * + `AUTO_RENEW_ON`: Subscription is active and automatically renews at the end of the current billing cycle.
       * + `AUTO_RENEW_OFF`: Subscription is active but expires at the end of the current billing cycle.
       * + `MANUAL_RECURRING`: Subscription is active and renews at the end of the current billing cycle, in case the customer takes an action related to the payment.
       * + `CANCELLED`: Subscription isn't active because it has been canceled.
       * + `TRANSFERRED`: Subscription isn't active because it has been transferred to a different account. A different active subscription was created for the target account.
       */
      status?: SubscriptionStatus;
      /**
       * Date and time the subscription was last transferred from one Wix account to
       * another in
       * [UTC datetime](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      transferredAt?: Date | null;
      /**
       * ID of the [product type](https://bo.wix.com/wix-docs/rest/premium/premium-product-catalog-v2/product-types/product-type-object)
       * that the product, for which the subscription was purchased, belongs to.
       */
      productTypeId?: string;
      /** Version number, which increments by 1 each time the subscription is updated. */
      version?: number;
      /**
       * Whether the subscription is active. Includes the statuses
       * `"AUTO_RENEW_ON"`, `"AUTO_RENEW_OFF"`, and `"MANUAL_RECURRING"`.
       */
      active?: boolean;
      /**
       * Date and time the subscription was originally created in
       * [UTC datetime](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * Differs from `createdAt` in case the subscription was originally created for a different Wix account and has been transferred.
       */
      originalCreationDate?: Date | null;
      /** Custom metadata about the subscription. */
      metadata?: Record<string, string>;
      /**
       * 2-letter country code in
       * [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
       * format.
       */
      countryCode?: string | null;
  }
  interface BillingReference {
      /**
       * Name of the billing system that manages the subscription.
       *
       * + `"UNKNOWN"`: Default value.
       * + `"SBS"`: [Wix Billing](https://github.com/wix-p/premium-billing/tree/master/sbs).
       * + `"LICENSER"`:
       * + `"BASS"`: [Billing and Subscriptions System](https://dev.wix.com/docs/rest/internal-only/premium/subscriptions-by-billing-by-wix/introduction).
       * + `"RESELLER"`: [External Reseller](https://dev.wix.com/api/rest/account-level-apis/resellers/introduction).
       */
      providerName?: ProviderName;
      /** Current provider reference ID. */
      providerReferenceId?: string | null;
      /** Previous provider reference IDs. Used for when a subscription is extended, specifically for domains. */
      previousProviderReferenceIds?: string[];
  }
  enum ProviderName {
      UNKNOWN = "UNKNOWN",
      SBS = "SBS",
      LICENSER = "LICENSER",
      BASS = "BASS",
      RESELLER = "RESELLER",
      RECURRING_INVOICES = "RECURRING_INVOICES"
  }
  interface Cycle extends CycleCycleSelectorOneOf {
      /** repetitive interval */
      interval?: Interval;
      /** one time */
      oneTime?: OneTime;
  }
  /** @oneof */
  interface CycleCycleSelectorOneOf {
      /** repetitive interval */
      interval?: Interval;
      /** one time */
      oneTime?: OneTime;
  }
  interface Interval {
      /** interval unit of measure */
      unit?: IntervalUnit;
      /** number of interval */
      count?: number;
  }
  enum IntervalUnit {
      /** unknown interval unit */
      UNKNOWN = "UNKNOWN",
      /** day */
      DAY = "DAY",
      /** week */
      WEEK = "WEEK",
      /** month */
      MONTH = "MONTH",
      /** year */
      YEAR = "YEAR"
  }
  interface OneTime {
  }
  enum SubscriptionStatus {
      UNKNOWN = "UNKNOWN",
      AUTO_RENEW_ON = "AUTO_RENEW_ON",
      AUTO_RENEW_OFF = "AUTO_RENEW_OFF",
      MANUAL_RECURRING = "MANUAL_RECURRING",
      CANCELLED = "CANCELLED",
      TRANSFERRED = "TRANSFERRED"
  }
  /** Triggered when a subscription is reactivated. */
  interface ReactivationData {
      reactivationReason?: ReactivationReasonEnum;
      /**
       * In the event of reactivation after chargeback dispute, the subscription may be extended according to the
       * number of days it was inactive during the time of resolving the dispute
       */
      newEndOfPeriod?: Date | null;
      /** The original end date, before the inactive period. */
      oldEndOfPeriod?: Date | null;
      /** The difference in days between the new new_end_of_period and old_end_of_period */
      differenceInDays?: number | null;
  }
  /** Reason for subscription reactivation */
  enum ReactivationReasonEnum {
      UNKNOWN = "UNKNOWN",
      /**
       * Subscription was reactivated due to billing status change from CANCELED to ACTIVE, for example if it was incorrectly
       * canceled because of suspicion of fraud
       */
      BILLING_STATUS_CHANGE = "BILLING_STATUS_CHANGE",
      /** Subscription was reactivated after a chargeback dispute */
      REACTIVATED_AFTER_CHARGEBACK = "REACTIVATED_AFTER_CHARGEBACK"
  }
  /**
   * Triggered when a subscription is assigned to a Wix site, including the initial
   * assignment of a floating subscription or a re-assignement from a different site.
   */
  interface SubscriptionAssigned {
      /** Assigned subscription. */
      subscription?: Subscription;
      /** ID of the metasite that the subscription has been assigned to before the update. */
      previousMetaSiteId?: string | null;
  }
  /** Triggered when a subscription is canceled. */
  interface SubscriptionCancelled {
      /** Canceled subscription. */
      subscription?: Subscription;
      /** Details about the cancellation including who canceled the subscription and why. */
      cancellationDetails?: CancellationDetails;
      /**
       * Whether the subscription is canceled immediately or expires at the end of the current billing cycle.
       *
       * Default: `false`
       */
      immediateCancel?: boolean;
      /** Whether the subscription was canceled during the free trial period. */
      canceledInFreeTrial?: boolean;
  }
  /** Information about the cancellation flow including who canceled the subscription and why it was canceled. */
  interface CancellationDetails {
      /**
       * Cancellation code.
       *
       * Values supported for cancellations on behalf of the billing system: `-1`, `-2`, `-3`, `-4`, `-5`, `-6`, `-7`, `-8`.
       * For cancellations on behalf of the site owner or the service provider `cancellationCode`
       * is taken from the request of
       * [Cancel Immediately Offline](https://bo.wix.com/wix-docs/rest/premium/premium-subscriptions-manager/cancel-immediately-offline).
       *
       * + `-1`: The subscription has been cancelled by the billing system but none of the listed cancellation reasons applies.
       * + `-2`: There were payment problems.
       * + `-3`: There was a chargeback.
       * + `-4`: Customer support has canceled the subscription and issued a refund.
       * + `-5`: The site owner has changed their existing subscription.
       * + `-6`: The subscription has been transferred to a different Wix account.
       * + `-7`: The subscription has been canceled because the site owner hasn't manually authenticated the recurring payment during the subscription's grace period. For example, site owners must manually confirm recurring payments within 40 days when paying with boleto.
       * + `-8`: The Wix account that the subscription belonged to has been deleted.
       */
      cancellationCode?: number | null;
      /**
       * Cancellation reason. For cancellations on behalf of the site owner or the service provider `cancellationReason`
       * is taken from the request of
       * [Cancel Immediately Offline](https://bo.wix.com/wix-docs/rest/premium/premium-subscriptions-manager/cancel-immediately-offline).
       * For cancellations on behalf of the billing system `cancellationReason` is `null` or an empty string.
       */
      cancellationReason?: string | null;
      /**
       * Initiator of the cancellation. For `"USER_REQUESTED"` and `"APP_MANAGED"`,
       * `cancellationCode` and `cancellationReason` are taken from the request of
       * [Cancel Immediately](https://bo.wix.com/wix-docs/rest/premium/premium-subscriptions-manager/cancel-immediately)
       * or [Cancel Immediately Offline](https://bo.wix.com/wix-docs/rest/premium/premium-subscriptions-manager/cancel-immediately-offline).
       * For `"PASSIVE"`, cancellations `cancellationCode` is automatically calculated and `cancellationReason`
       * is `null` or an empty string.
       *
       * + `"UNKNOWN`: Default value.
       * + `"USER_REQUESTED"`:  The Wix account owner has canceled the subscription.
       * + `"APP_MANAGED"`: The service provider has canceled the subscription.
       * + `"PASSIVE"`: The billing system has canceled the subscription. For example, in case of payment failure or fraud.
       */
      initiator?: Initiator;
  }
  enum Initiator {
      UNKNOWN = "UNKNOWN",
      USER_REQUESTED = "USER_REQUESTED",
      APP_MANAGED = "APP_MANAGED",
      PASSIVE = "PASSIVE"
  }
  /** Triggered when the subscription's auto renew is turned on. */
  interface SubscriptionAutoRenewTurnedOn {
      /** Subscription for which auto renew is turned on. */
      subscription?: Subscription;
      /**
       * Supported values: `USER`, `APP`.
       *
       * Information about who turned auto renew on.
       * + `"USER"`: The site owner who purchased the subscription has turned auto renew on.
       * + `"APP"`: The service provider has turned auto renew on.
       */
      initiator?: string | null;
  }
  /** Triggered when the subscription's auto renew is turned off. */
  interface SubscriptionAutoRenewTurnedOff {
      /** Subscription for which auto renew is turned off. */
      subscription?: Subscription;
      /** Details about the cancellation including who canceled the subscription and why. */
      cancellationDetails?: CancellationDetails;
      /**
       * Whether the subscription is immediately canceled or expires at the end of the current billing cycle.
       *
       * Default: `false`
       */
      immediateCancel?: boolean;
  }
  /**
   * Triggered when a subscription is unassigned from a Wix site and becomes
   * floating.
   */
  interface SubscriptionUnassigned {
      /** Unassigned subscription. */
      subscription?: Subscription;
      /** ID of the metasite that the subscription has been assigned to before the event. */
      previousMetaSiteId?: string;
      /**
       * Reason why the subscription is unassigned.
       *
       * + `"UNKNOWN"`: Default value.
       * + `"USER_REQUESTED"`: The Wix account owner has unassigned the subscription.
       * + `"REPLACED_BY_ANOTHER_SUBSCRIPTION"`: A different subscription that replaces this subscription is assigned to the site.
       */
      unassignReason?: UnassignReason;
  }
  enum UnassignReason {
      UNKNOWN = "UNKNOWN",
      USER_REQUESTED = "USER_REQUESTED",
      REPLACED_BY_ANOTHER_SUBSCRIPTION = "REPLACED_BY_ANOTHER_SUBSCRIPTION"
  }
  /**
   * Triggered when a subscription is transferred from one Wix account to another.
   * A transfer includes cancelling the original subscription and creating a new
   * subscription for the target account. The event returns both the original
   * and the new subscription.
   */
  interface SubscriptionTransferred {
      /** Original subscription that was canceled for the transfer. */
      originSubscription?: Subscription;
      /** Newly created subscription for the target account. */
      targetSubscription?: Subscription;
  }
  /** Triggered when a recurring charge succeeds for a subscription. */
  interface RecurringChargeSucceeded {
      /** Subscription for which the recurring charge has succeeded. */
      subscription?: Subscription;
      /** Indication that there was a successful charge at the end of the free trial period */
      freeTrialPeriodEnd?: boolean;
  }
  /**
   * Triggered when a subscription was updated including when its product has been
   * up- or downgraded or the billing cycle is changed.
   */
  interface ContractSwitched {
      /** Updated subscription. */
      subscription?: Subscription;
      /** Billing cycle before the update. */
      previousCycle?: Cycle;
      /** ID of the product belonging to the subscription before the update. */
      previousProductId?: string;
      /** ID of the product type that the subscription's original product belonged to before the update. */
      previousProductTypeId?: string;
      /**
       * Update type. __Note__: Doesn't include information about a product adjustment.
       * For that purpose, see `productAdjustment`.
       *
       * + `"NOT_APPLICABLE"`: Default value.
       * + `"ADDITIONAL_QUANTITY"`: An increased usage quota is added to the subscription. For example, a second mailbox is added to a subscription that previously included a single mailbox.
       * + `"CREDIT_UNUSED_PERIOD"`: The subscription is upgraded and the new price is less than the regular price. The new price applies to every billing cycle, not just the first cycle.
       * + `"REFUND_PRICE_DIFF"`: Not implemented.
       * + `"ADJUST_PERIOD_END"`: Not implemented.
       * + `"DOWNGRADE_GRACE_PERIOD"`: For downgrades during the grace period. In this situation, the site owner hasn’t paid yet and must immediately pay for the downgraded subscription.
       * + `"FULL_AMOUNT_PERIOD"`: For upgrades in which the site owner retains unused benefits. For example, site owners upgrading a Facebook Ads subscription retain their unused FB Ads credit. The unused credit is added to the new credit.
       * + `"END_OF_PERIOD"`: The subscription's billing current cycle is extended because of a downgrade.
       * + `"PENDING_CHANGES"`: The subscription's billing is updated, but the change doesn't apply immediately. Instead, the update becomes effective at the end of current billing cycle.
       * + `"DOWNGRADE_RENEWAL"`: The subscription is downgraded because of a declined payment. This prevents subscriptions from churning.
       */
      contractSwitchType?: ContractSwitchType;
      /**
       * ID of the metasite the subscription has been assigned to previously.
       * Available only in case the subscription is assigned to a different site.
       */
      previousMetaSiteId?: string | null;
      /**
       * Update reason.
       *
       * + `"PRICE_INCREASE"`: The subscription's price has been increased.
       * + `"EXTERNAL_PROVIDER_TRIGGER"`: Any reason other than a price increase.
       */
      contractSwitchReason?: ContractSwitchReason;
      /** Information about the price update. Available only for updates with a price increase. */
      productPriceIncreaseData?: ProductPriceIncreaseData;
      /**
       * Information about a product adjustment. For example, a downgrade.
       * __Note__: This isn't the same as `contractSwitchType`.
       *
       * + `NOT_APPLICABLE`: There is no information about whether the product has been up- or downgraded.
       * + `DOWNGRADE`: The product has been downgraded.
       */
      productAdjustment?: ProductAdjustment;
  }
  /** Copied from SBS */
  enum ContractSwitchType {
      NOT_APPLICABLE = "NOT_APPLICABLE",
      ADDITIONAL_QUANTITY = "ADDITIONAL_QUANTITY",
      CREDIT_UNUSED_PERIOD = "CREDIT_UNUSED_PERIOD",
      REFUND_PRICE_DIFF = "REFUND_PRICE_DIFF",
      ADJUST_PERIOD_END = "ADJUST_PERIOD_END",
      DOWNGRADE_GRACE_PERIOD = "DOWNGRADE_GRACE_PERIOD",
      FULL_AMOUNT_PERIOD = "FULL_AMOUNT_PERIOD",
      END_OF_PERIOD = "END_OF_PERIOD",
      PENDING_CHANGES = "PENDING_CHANGES",
      DOWNGRADE_RENEWAL = "DOWNGRADE_RENEWAL"
  }
  enum ContractSwitchReason {
      EXTERNAL_PROVIDER_TRIGGER = "EXTERNAL_PROVIDER_TRIGGER",
      PRICE_INCREASE = "PRICE_INCREASE"
  }
  /** Triggered when a subscription's price is increased. */
  interface ProductPriceIncreaseData {
      /** Price of the subscription before the update. */
      previousPrice?: string | null;
      /** A value that is used in order to select the correct email template to send the user regarding the price increase. */
      emailTemplateSelector?: string | null;
      /** Used to differentiate between migration segments. Does not have to be unique per segment. */
      segmentName?: string | null;
      /** Used to determine how the price increase was triggered. */
      priceIncreaseTrigger?: PriceIncreaseTrigger;
  }
  /** Reason for Price Increase Trigger */
  enum PriceIncreaseTrigger {
      NEAR_RENEWAL = "NEAR_RENEWAL",
      RECURRING_SUCCESS = "RECURRING_SUCCESS",
      MANUAL = "MANUAL"
  }
  /** Triggered when a subscription's product is adusted. */
  enum ProductAdjustment {
      /** flag to show that the ContractSwitchedEvent is not applicable / needed */
      NOT_APPLICABLE = "NOT_APPLICABLE",
      /** flag to show that the ContractSwitchedEvent is a Downgrade */
      DOWNGRADE = "DOWNGRADE"
  }
  /**
   * Triggered when a subscription gets close to the end of its billing cycle.
   * The exact number of days is defined in the billing system.
   */
  interface SubscriptionNearEndOfPeriod {
      /** Subscription that got close to the end of its billing cycle. */
      subscription?: Subscription;
      /** Whether the subscription is within the free trial period. */
      inFreeTrial?: boolean;
  }
  /**
   * Triggered when a subscription is updated and the change doesn't happen
   * immediately but at the end of the current billing cycle.
   */
  interface SubscriptionPendingChange {
      /** Subscription for which a pending update is triggered. */
      subscription?: Subscription;
  }
  interface ContactSyncRequest {
      contactIds?: string[];
      contactId?: string | null;
  }
  interface BulkUpsertAccountsRequest {
      /** List of contactIds + points to either insert as new loyalty accounts, or update if contacts already exist as loyalty accounts */
      accounts: AccountToUpsert[];
      /**
       * If true, the upserted accounts are returned in response
       * @deprecated If true, the upserted accounts are returned in response
       * @targetRemovalDate 2024-02-01
       */
      returnAccounts?: boolean;
      /** Description of the action */
      description?: string | null;
  }
  interface AccountToUpsert {
      contactId?: string;
      pointsBalance?: number;
  }
  interface BulkUpsertAccountsResponse {
      /** Loyalty accounts that were created or updated */
      result?: BulkAccountResult[];
      /** Numbers of successes and failures */
      metadata?: BulkActionMetadata$3;
  }
  interface BulkAccountResult {
      /** The created/updated account is returned if specified so in request message. */
      account?: LoyaltyAccount;
      /** LoyaltyAccount metadata. */
      metadata?: ItemMetadata$3;
  }
  interface ItemMetadata$3 {
      /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError$3;
  }
  interface ApplicationError$3 {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  interface BulkActionMetadata$3 {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface SetMissingMemberIdRequest {
      /** ID of the account to retrieve. */
      accountId: string;
  }
  interface SetMissingMemberIdResponse {
      /** Loyalty account. */
      account?: LoyaltyAccount;
  }
  interface MessageEnvelope$5 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$5;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$5 extends IdentificationDataIdOneOf$5 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$5;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$5 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$5 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Creates a loyalty account for one of a site's contacts.
   *
   * The `createAccount()` function returns a Promise that resolves to the new loyalty account when it is created.
   *
   * To create a new loyalty account, the customer must first be a site contact with a contact ID. The site must also have an active loyalty program before loyalty accounts can be created.
   *
   * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can create a loyalty account. <!--You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.-->
   * @public
   * @requiredField contactId
   * @param contactId - Contact ID for a Wix site contact. See the [Contacts API](wix-crm-backend/contacts) to learn more.
   * @permissionId LOYALTY.MANAGE_ACCOUNTS
   * @adminMethod
   */
  function createAccount(contactId: string): Promise<CreateAccountResponse>;
  /**
   * Adds points to a loyalty account.
   *
   * The `earnPoints()` function returns a Promise that resolves to the updated loyalty account.
   *
   * Only a positive amount can be added using the `earnPoints()` function, to manually adjust an account's balance for a negative amount, use [`adjustPoints()`](wix-loyalty-v2/accounts/adjustpoints).
   *
   * The `earnPoints()` function allows customers to manually earn points to their loyalty accounts. To use this function you must include an `appId` and an `idempotencyKey`. Any string can be set as the `appId` or `idempotencyKey`. In contrast to when an account earns points through an action taken on your site, the `appId` automatically sets to the source app that generates the points. The transaction `type` is `"EARN"` for points earned this way.
   *
   * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can earn loyalty points. <!--You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.-->
   * @param accountId - Loyalty account ID.
   * @public
   * @requiredField accountId
   * @requiredField options.appId
   * @requiredField options.idempotencyKey
   * @param options - Earn points info.
   * @permissionId LOYALTY.MANAGE_ACCOUNTS
   * @adminMethod
   */
  function earnPoints(accountId: string, options?: EarnPointsOptions): Promise<EarnPointsResponse>;
  interface EarnPointsOptions extends EarnPointsRequestActivityDetailsOneOf {
      /**
       * Amount of points to earn. Must be a positive, whole number.
       *
       * Min: `1`
       *
       * Max: `9999999`
       */
      amount?: number;
      /**
       * Description of how the points were earned.
       *
       * Max: 100 characters
       */
      description?: string;
      /**
       * ID of the app that initiated the transaction.
       *
       * If points were earned manually, then the `appId` is the Loyalty app's
       * `wixAppId` of `553c79f3-5625-4f38-b14b-ef7c0d1e87df`. If points were earned in an automatic event,
       * then the `appId` is from that automation's `sourceAppId`.
       */
      appId: string;
      /**
       * Unique string identifier generated by the app. Wix uses this identifier to recognize subsequent retries of the same request.
       *
       * Please use `GUID` format.
       */
      idempotencyKey: string;
      /**
       * Activity type.
       *
       * If points were earned through automation it should be set to trigger key.
       */
      activityType?: string | null;
      /** Order id which was source of this transaction. */
      orderId?: string | null;
      /** Followed social media details. */
      followedSocialMedia?: FollowedSocialMedia;
  }
  /**
   * Adjusts the point balance of a loyalty account.
   *
   * The `adjustPoints()` function returns a Promise that resolves to the updated loyalty account.
   *
   * To adjust the points balance of an account you must include an `accountId`, a `revision` number, and the adjustment to make. You can also leave a description to explain the reason for the points adjustment.
   *
   * There are two ways to adjust the points of a loyalty account:
   * - `balance` allows you to set the total points balance to this new amount. The transaction `type` will return as `"ADJUST"`.
   * - `amount` allows you to alter the points balance by this amount. This amount can be a positive number to increase the points balance or a negative number to decrease the balance. The transaction type will return as `"GIVE"`.
   *
   * An account may not be adjusted to a negative balance. If you pass values in both the `balance` and the `amount` parameters then the `balance` adjustment takes effect and the `amount` adjustment is ignored.
   *
   * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can manually adjust points in a loyalty account. <!--You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.-->
   * @param accountId - Loyalty account ID.
   * @public
   * @requiredField accountId
   * @param options - Options to use when adjusting points.
   * @permissionId LOYALTY.MANAGE_ACCOUNTS
   * @adminMethod
   */
  function adjustPoints(accountId: string, options?: AdjustPointsOptions): Promise<AdjustPointsResponse>;
  interface AdjustPointsOptions extends AdjustPointsRequestTypeOneOf {
      /** Description to explain the reason for the points adjustment. */
      description?: string | null;
      /**
       * Sets the account's point balance to this amount. Must be a positive, whole number or zero.
       *
       * The net difference between this new balance and the previous balance will be reflected in the `adjusted` field of the customer's account.
       *
       * Min: `0`
       *
       * Max: `999999999`
       */
      balance?: number;
      /**
       * Adjusts the account's point balance by this amount. Must be a whole number with a maximum of 7 digits.
       * The amount can be negative, but cannot be `0`.
       *
       * Min: `-9999999`
       *
       * Max: `9999999`
       */
      amount?: number;
      /**
       * Adjusts the account's point balance by this amount. Also account's "redeemed points" is reduced by this amount.
       * Must be a whole number with a maximum of 7 digits.
       * The amount can be negative, but cannot be `0`.
       *
       * Min: `-9999999`
       *
       * Max: `9999999`
       * @internal
       */
      refund?: number;
      /**
       * Each time the loyalty account is updated, `revision` increments by 1.
       *
       * The current `revision` must be passed when adjusting points in the loyalty account. This
       * ensures you're working with the latest version of the loyalty account and prevents unintended overwrites.
       */
      revision?: string;
  }
  /**
   * Redeems points from a loyalty account, given the provided reward.
   * @param accountId - Loyalty account ID.
   * @param rewardId - Reward ID. See [Rewards API](https://dev.wix.com/api/rest/loyalty/rewards/rewards-object) for more details.
   * @internal
   * @documentationMaturity preview
   * @requiredField accountId
   * @requiredField rewardId
   * @permissionId LOYALTY.MANAGE_ACCOUNTS
   * @adminMethod
   */
  function redeemPoints(accountId: string, rewardId: string, options?: RedeemPointsOptions): Promise<RedeemPointsResponse>;
  interface RedeemPointsOptions {
      /** Number of times the given reward will be redeemed. Must be a positive whole number. */
      count?: number;
      /**
       * Revision number, which increments by 1 each time points are redeemed.
       * To prevent conflicting changes, the existing `revision` must be used when redeeming points.
       */
      revision?: string;
      /** Id of the entity that is being redeemed (e.g. orderId for order discount, couponId for coupon reward). */
      referenceEntityId?: string | null;
  }
  /**
   * Redeems given amount of points from a loyalty account, given the provided reward.
   * @param accountId - Loyalty account ID.
   * @param rewardId - Reward ID. See [Rewards API](https://dev.wix.com/api/rest/loyalty/rewards/rewards-object) for more details.
   * @internal
   * @documentationMaturity preview
   * @requiredField accountId
   * @requiredField rewardId
   * @permissionId LOYALTY.MANAGE_ACCOUNTS
   * @adminMethod
   */
  function redeemDeterminedAmountOfPoints(accountId: string, rewardId: string, options?: RedeemDeterminedAmountOfPointsOptions): Promise<RedeemDeterminedAmountOfPointsResponse>;
  interface RedeemDeterminedAmountOfPointsOptions {
      /** Number of points to be redeemed off the account. */
      points?: number;
      /**
       * Revision number, which increments by 1 each time points are redeemed.
       * To prevent conflicting changes, the existing `revision` must be used when redeeming points.
       */
      revision?: string;
      /** Id of the entity that is being redeemed (e.g. orderId for order discount, couponId for coupon reward). */
      referenceEntityId?: string | null;
  }
  /**
   * Refunds a redeem transaction by deleting the loyalty coupon and adjusting the points balance.
   * @param transactionId - Transaction ID associated with the refund.
   * @internal
   * @documentationMaturity preview
   * @requiredField transactionId
   * @permissionId LOYALTY.TRANSACTION_REFUND
   * @adminMethod
   */
  function refundTransaction(transactionId: string): Promise<void>;
  /**
   * Retrieves an account using the loyalty account ID.
   *
   * The `getAccount()` function returns a Promise that resolves to the specified loyalty account when it is retrieved.
   *
   * You can also get an account using a secondary ID, such as a contact ID or a member ID with the [`getAccountBySecondaryId()`](wix-loyalty-v2/accounts/getaccountbysecondaryid) function.
   *
   * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can retrieve a loyalty account. <!--You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.-->
   * @param _id - ID of the account to retrieve.
   * @public
   * @requiredField _id
   * @permissionId LOYALTY.READ_ACCOUNTS
   * @adminMethod
   * @returns Retrieved loyalty account.
   */
  function getAccount(_id: string): Promise<LoyaltyAccount>;
  /**
   * Creates a query to retrieve a list of accounts.
   *
   * The `queryLoyaltyAccounts()` function builds a query to retrieve a list of events and returns a `LoyaltyAccountsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is typically used to run the query using the `find()` function.
   *
   * You can refine the query by chaining `LoyaltyAccountsQueryBuilder` functions onto the query. `LoyaltyAccountsQueryBuilder` functions enable you to sort, filter, and control the results `queryLoyaltyAccounts()` returns.
   *
   * `queryLoyaltyAccounts()` runs with these `LoyaltyAccountsQueryBuilder` defaults, which you can override:
   *
   * - skip(0)
   * - limit(50)
   * - descending("_createdDate")
   *
   * The functions that are chained to `queryLoyaltyAccounts()` are applied in the order they're called. For example, if you apply ascending('points.balance') and then descending('points.earned'), the results are sorted first by the balance, and then, if there are multiple results with the same balance, the items are sorted by earned points.
   * @public
   * @documentationMaturity preview
   * @permissionId LOYALTY.READ_ACCOUNTS
   * @adminMethod
   */
  function queryLoyaltyAccounts(): LoyaltyAccountsQueryBuilder;
  interface QueryCursorResult$1 {
      cursors: Cursors$3;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface LoyaltyAccountsQueryResult extends QueryCursorResult$1 {
      items: LoyaltyAccount[];
      query: LoyaltyAccountsQueryBuilder;
      next: () => Promise<LoyaltyAccountsQueryResult>;
      prev: () => Promise<LoyaltyAccountsQueryResult>;
  }
  interface LoyaltyAccountsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | 'contactId' | 'memberId' | 'points.balance' | 'points.earned' | 'points.adjusted' | 'points.redeemed' | 'points.expired' | '_createdDate' | 'lastActivityDate' | 'tier.id' | 'contact.id' | 'pointsExpiration.expirationDate' | 'pointsExpiration.expiringPointsAmount', value: any) => LoyaltyAccountsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | 'contactId' | 'memberId' | 'points.balance' | 'points.earned' | 'points.adjusted' | 'points.redeemed' | 'points.expired' | '_createdDate' | 'lastActivityDate' | 'tier.id' | 'contact.id' | 'pointsExpiration.expirationDate' | 'pointsExpiration.expiringPointsAmount', value: any) => LoyaltyAccountsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: 'points.balance' | 'points.earned' | 'points.adjusted' | 'points.redeemed' | 'points.expired' | '_createdDate' | 'lastActivityDate' | 'pointsExpiration.expirationDate' | 'pointsExpiration.expiringPointsAmount', value: any) => LoyaltyAccountsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: 'points.balance' | 'points.earned' | 'points.adjusted' | 'points.redeemed' | 'points.expired' | '_createdDate' | 'lastActivityDate' | 'pointsExpiration.expirationDate' | 'pointsExpiration.expiringPointsAmount', value: any) => LoyaltyAccountsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: 'points.balance' | 'points.earned' | 'points.adjusted' | 'points.redeemed' | 'points.expired' | '_createdDate' | 'lastActivityDate' | 'pointsExpiration.expirationDate' | 'pointsExpiration.expiringPointsAmount', value: any) => LoyaltyAccountsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: 'points.balance' | 'points.earned' | 'points.adjusted' | 'points.redeemed' | 'points.expired' | '_createdDate' | 'lastActivityDate' | 'pointsExpiration.expirationDate' | 'pointsExpiration.expiringPointsAmount', value: any) => LoyaltyAccountsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'contactId' | 'memberId' | 'tier.id' | 'contact.id', value: string) => LoyaltyAccountsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | 'contactId' | 'memberId' | 'points.balance' | 'points.earned' | 'points.adjusted' | 'points.redeemed' | 'points.expired' | '_createdDate' | 'lastActivityDate' | 'tier.id' | 'contact.id' | 'pointsExpiration.expirationDate' | 'pointsExpiration.expiringPointsAmount', value: any[]) => LoyaltyAccountsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'contactId' | 'memberId' | 'points.balance' | 'points.earned' | 'points.adjusted' | 'points.redeemed' | 'points.expired' | '_createdDate' | 'lastActivityDate' | 'tier.id' | 'contact.id' | 'pointsExpiration.expirationDate' | 'pointsExpiration.expiringPointsAmount', value: any) => LoyaltyAccountsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | 'contactId' | 'memberId' | 'points.balance' | 'points.earned' | 'points.adjusted' | 'points.redeemed' | 'points.expired' | '_createdDate' | 'lastActivityDate' | 'tier.id' | 'contact.id' | 'pointsExpiration.expirationDate' | 'pointsExpiration.expiringPointsAmount', value: boolean) => LoyaltyAccountsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | 'contactId' | 'memberId' | 'points.balance' | 'points.earned' | 'points.adjusted' | 'points.redeemed' | 'points.expired' | '_createdDate' | 'lastActivityDate' | 'tier.id' | 'contact.id' | 'pointsExpiration.expirationDate' | 'pointsExpiration.expiringPointsAmount'>) => LoyaltyAccountsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | 'contactId' | 'memberId' | 'points.balance' | 'points.earned' | 'points.adjusted' | 'points.redeemed' | 'points.expired' | '_createdDate' | 'lastActivityDate' | 'tier.id' | 'contact.id' | 'pointsExpiration.expirationDate' | 'pointsExpiration.expiringPointsAmount'>) => LoyaltyAccountsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => LoyaltyAccountsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => LoyaltyAccountsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<LoyaltyAccountsQueryResult>;
  }
  /**
   * Lists all accounts for Wix user.
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function listUserAccounts(options?: ListUserAccountsOptions): Promise<ListUserAccountsResponse>;
  interface ListUserAccountsOptions {
      /** Number of items to load. Minimum `1`, maximum `50`. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  /**
   * Retrieves the total amount of points earned, redeemed, and adjusted for the entire loyalty program.
   *
   * The `getProgramTotals()` function returns a Promise that resolves to the combined total points for all loyalty accounts in the program.
   *
   * The `balance` is the current total of points outstanding, while the `earned`, `adjusted`, and `redeemed` amounts are the all-time accumulated amounts. The totals include the amounts for all loyalty accounts.
   *
   * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can retrieve the loyalty program totals. <!--You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.-->
   * @public
   * @permissionId LOYALTY.READ_ACCOUNTS
   * @adminMethod
   */
  function getProgramTotals(): Promise<GetProgramTotalsResponse>;
  /**
   * Retrieves the currently logged-in member's account.
   * @public
   * @permissionId LOYALTY.READ_OWN_ACCOUNT
   */
  function getCurrentMemberAccount(): Promise<GetCurrentMemberAccountResponse>;
  /**
   * Retrieves the current visitors' loyalty account if it exists
   * @internal
   * @documentationMaturity preview
   * @permissionId LOYALTY.READ_OWN_ACCOUNT
   * @deprecated
   * @targetRemovalDate 2024-11-07
   */
  function getMyAccount(): Promise<GetMyAccountResponse>;
  /**
   * Retrieves the loyalty account of the specified site contact or member.
   *
   * The `getAccountBySecondaryId()` function returns a Promise that resolves to the specified loyalty account when it is retrieved.
   *
   * This function gets a loyalty account using either a customer's contact ID or member ID. You can also get an account using the loyalty account ID with the [`getAccount()`](wix-loyalty-v2/accounts/getaccount) function.
   *
   * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can retrieve a loyalty account. <!--You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.-->
   * @public
   * @param options - ID of the customer to retrieve loyalty account for.
   * @permissionId LOYALTY.READ_ACCOUNTS
   * @adminMethod
   */
  function getAccountBySecondaryId(options?: GetAccountBySecondaryIdOptions): Promise<GetAccountBySecondaryIdResponse>;
  interface GetAccountBySecondaryIdOptions extends GetAccountBySecondaryIdRequestIdOneOf {
      /** Account owner's contact ID. See the [Contacts API](wix-crm-backend/contacts) to learn more. */
      contactId?: string;
      /** Account owner's member ID. See the [Members API](wix-members-backend/introduction) to learn more. */
      memberId?: string;
  }
  /**
   * > **Deprecation Notice**
   * >
   * > **This method has been replaced with [Query Loyalty Accounts](https://dev.wix.com/docs/sdk/backend-modules/loyalty/accounts/query-loyalty-accounts) and will be removed on June 30, 2025. If your app uses this method, we recommend updating your code as soon as possible.**
   *
   * Retrieves a list of loyalty accounts, given the provided filters.
   *
   * The `listAccounts()` function returns a Promise that resolves to a list of loyalty accounts.
   *
   * You can retrieve selected loyalty accounts with an array of `contactIds` or retrieve a list of all of a site's loyalty accounts
   *     with an empty request parameter. Use the `cursorPaging` parameters to limit how many items load at a time.
   *
   * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can retrieve loyalty accounts. <!--You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.-->
   * @public
   * @param options - Options to use when retrieving a list of loyalty accounts.
   * @permissionId LOYALTY.READ_ACCOUNTS
   * @adminMethod
   * @deprecated
   * @replacedBy QueryLoyaltyAccounts
   * @targetRemovalDate 2025-06-01
   */
  function listAccounts(options?: ListAccountsOptions): Promise<ListAccountsResponse>;
  interface ListAccountsOptions {
      /** List of contact IDs. See the [Contacts API](wix-crm-backend/contacts) to learn more. */
      contactIds?: string[];
      /** Pagination options. */
      cursorPaging?: CursorPaging$3;
  }
  /**
   * Retrieves a list of accounts, given the provided filters and search capabilities.
   * Search is executed on the account's name and email values.
   * @public
   * @permissionId LOYALTY.READ_ACCOUNTS
   * @adminMethod
   * @returns Accounts found through provided search capabilities, along with paging and aggregation data of the results.
   */
  function searchAccounts(options?: SearchAccountsOptions): Promise<SearchAccountsResponse>;
  interface SearchAccountsOptions {
      /** Search options. */
      search?: CursorSearch;
  }
  /**
   * Endpoint that proxies request with QueryV2 payload to SearchAccounts endpoint with CursorSearch in the payload
   * If search results are expected, they should be passed in the filter as the following fields:
   * "_search_mode": "OR" or "AND"
   * "_search_expression": Any string value
   * @internal
   * @documentationMaturity preview
   * @permissionId LOYALTY.READ_ACCOUNTS
   * @adminMethod
   */
  function exportAccounts(options?: ExportAccountsOptions): Promise<ExportAccountsResponse>;
  interface ExportAccountsOptions {
      query?: QueryV2$1;
  }
  /**
   * Retrieves the count of found accounts, given the provided filters and search capabilities.
   *
   * This endpoint can help find the total count of accounts when used alongside [Search Accounts](https://dev.wix.com/docs/rest/crm/loyalty-program/accounts/search-accounts).
   * @public
   * @permissionId LOYALTY.READ_ACCOUNTS
   * @adminMethod
   * @returns Count of accounts found for given search query
   */
  function countAccounts(options?: CountAccountsOptions): Promise<CountAccountsResponse>;
  interface CountAccountsOptions {
      /** Filter object. */
      filter?: Record<string, any> | null;
      /** Free text to match in searchable fields. */
      search?: SearchDetails;
  }
  /**
   * Updates points balance of multiple accounts.
   * Depending on the BulkAdjustPointsRequest.type:
   * amount - provided amount of points is appended to the accounts balance
   * balance - accounts balance is set to the provided amount
   *
   * Returns id of the asyncInfra job that takes care of the points adjustment.
   * @public
   * @documentationMaturity preview
   * @permissionId LOYALTY.MANAGE_ACCOUNTS
   * @adminMethod
   */
  function bulkAdjustPoints(options?: BulkAdjustPointsOptions): Promise<BulkAdjustPointsResponse>;
  interface BulkAdjustPointsOptions extends BulkAdjustPointsRequestTypeOneOf {
      search?: CursorSearch;
      balance?: number;
      amount?: number;
  }
  /**
   * Creates loyalty accounts for given contactIds with given points, or updates loyalty accounts if they already exist
   * @param accounts - List of contactIds + points to either insert as new loyalty accounts, or update if contacts already exist as loyalty accounts
   * @internal
   * @documentationMaturity preview
   * @requiredField accounts
   * @permissionId LOYALTY.MANAGE_ACCOUNTS
   * @adminMethod
   */
  function bulkUpsertAccounts(accounts: AccountToUpsert[], options?: BulkUpsertAccountsOptions): Promise<BulkUpsertAccountsResponse>;
  interface BulkUpsertAccountsOptions {
      /**
       * If true, the upserted accounts are returned in response
       * @deprecated If true, the upserted accounts are returned in response
       * @targetRemovalDate 2024-02-01
       */
      returnAccounts?: boolean;
      /** Description of the action */
      description?: string | null;
  }
  /**
   * Updates account's member id if it is not already set but member exists
   * @param accountId - ID of the account to retrieve.
   * @internal
   * @documentationMaturity preview
   * @requiredField accountId
   * @permissionId LOYALTY.MANAGE_ACCOUNTS
   * @adminMethod
   */
  function setMissingMemberId(accountId: string): Promise<SetMissingMemberIdResponse>;
  
  type loyaltyV1Account_universal_d_LoyaltyAccount = LoyaltyAccount;
  type loyaltyV1Account_universal_d_Points = Points;
  type loyaltyV1Account_universal_d_Contact = Contact;
  type loyaltyV1Account_universal_d_Image = Image;
  type loyaltyV1Account_universal_d_RewardAvailabilityUpdated = RewardAvailabilityUpdated;
  type loyaltyV1Account_universal_d_UpdateTrigger = UpdateTrigger;
  const loyaltyV1Account_universal_d_UpdateTrigger: typeof UpdateTrigger;
  type loyaltyV1Account_universal_d_CreateAccountRequest = CreateAccountRequest;
  type loyaltyV1Account_universal_d_CreateAccountResponse = CreateAccountResponse;
  type loyaltyV1Account_universal_d_EarnPointsRequest = EarnPointsRequest;
  type loyaltyV1Account_universal_d_EarnPointsRequestActivityDetailsOneOf = EarnPointsRequestActivityDetailsOneOf;
  type loyaltyV1Account_universal_d_FollowedSocialMedia = FollowedSocialMedia;
  type loyaltyV1Account_universal_d_EarnPointsResponse = EarnPointsResponse;
  type loyaltyV1Account_universal_d_PointsUpdated = PointsUpdated;
  type loyaltyV1Account_universal_d_FirstTransaction = FirstTransaction;
  type loyaltyV1Account_universal_d_AdjustPointsRequest = AdjustPointsRequest;
  type loyaltyV1Account_universal_d_AdjustPointsRequestTypeOneOf = AdjustPointsRequestTypeOneOf;
  type loyaltyV1Account_universal_d_AdjustPointsResponse = AdjustPointsResponse;
  type loyaltyV1Account_universal_d_RedeemPointsRequest = RedeemPointsRequest;
  type loyaltyV1Account_universal_d_RedeemPointsResponse = RedeemPointsResponse;
  type loyaltyV1Account_universal_d_RedeemDeterminedAmountOfPointsRequest = RedeemDeterminedAmountOfPointsRequest;
  type loyaltyV1Account_universal_d_RedeemDeterminedAmountOfPointsResponse = RedeemDeterminedAmountOfPointsResponse;
  type loyaltyV1Account_universal_d_RefundTransactionRequest = RefundTransactionRequest;
  type loyaltyV1Account_universal_d_RefundTransactionResponse = RefundTransactionResponse;
  type loyaltyV1Account_universal_d_GetAccountRequest = GetAccountRequest;
  type loyaltyV1Account_universal_d_GetAccountResponse = GetAccountResponse;
  type loyaltyV1Account_universal_d_QueryLoyaltyAccountsRequest = QueryLoyaltyAccountsRequest;
  type loyaltyV1Account_universal_d_QueryLoyaltyAccountsResponse = QueryLoyaltyAccountsResponse;
  type loyaltyV1Account_universal_d_ListUserAccountsRequest = ListUserAccountsRequest;
  type loyaltyV1Account_universal_d_ListUserAccountsResponse = ListUserAccountsResponse;
  type loyaltyV1Account_universal_d_LoyaltyAccountForMetaSite = LoyaltyAccountForMetaSite;
  type loyaltyV1Account_universal_d_GetProgramTotalsRequest = GetProgramTotalsRequest;
  type loyaltyV1Account_universal_d_GetProgramTotalsResponse = GetProgramTotalsResponse;
  type loyaltyV1Account_universal_d_TierTotal = TierTotal;
  type loyaltyV1Account_universal_d_GetCurrentMemberAccountRequest = GetCurrentMemberAccountRequest;
  type loyaltyV1Account_universal_d_GetCurrentMemberAccountResponse = GetCurrentMemberAccountResponse;
  type loyaltyV1Account_universal_d_GetMyAccountRequest = GetMyAccountRequest;
  type loyaltyV1Account_universal_d_GetMyAccountResponse = GetMyAccountResponse;
  type loyaltyV1Account_universal_d_GetAccountBySecondaryIdRequest = GetAccountBySecondaryIdRequest;
  type loyaltyV1Account_universal_d_GetAccountBySecondaryIdRequestIdOneOf = GetAccountBySecondaryIdRequestIdOneOf;
  type loyaltyV1Account_universal_d_GetAccountBySecondaryIdResponse = GetAccountBySecondaryIdResponse;
  type loyaltyV1Account_universal_d_ListAccountsRequest = ListAccountsRequest;
  type loyaltyV1Account_universal_d_ListAccountsResponse = ListAccountsResponse;
  type loyaltyV1Account_universal_d_SearchAccountsRequest = SearchAccountsRequest;
  type loyaltyV1Account_universal_d_CursorSearch = CursorSearch;
  type loyaltyV1Account_universal_d_CursorSearchPagingMethodOneOf = CursorSearchPagingMethodOneOf;
  type loyaltyV1Account_universal_d_Aggregation = Aggregation;
  type loyaltyV1Account_universal_d_AggregationKindOneOf = AggregationKindOneOf;
  type loyaltyV1Account_universal_d_RangeBucket = RangeBucket;
  type loyaltyV1Account_universal_d_SortType = SortType;
  const loyaltyV1Account_universal_d_SortType: typeof SortType;
  type loyaltyV1Account_universal_d_SortDirection = SortDirection;
  const loyaltyV1Account_universal_d_SortDirection: typeof SortDirection;
  type loyaltyV1Account_universal_d_MissingValues = MissingValues;
  const loyaltyV1Account_universal_d_MissingValues: typeof MissingValues;
  type loyaltyV1Account_universal_d_IncludeMissingValuesOptions = IncludeMissingValuesOptions;
  type loyaltyV1Account_universal_d_ScalarType = ScalarType;
  const loyaltyV1Account_universal_d_ScalarType: typeof ScalarType;
  type loyaltyV1Account_universal_d_ValueAggregation = ValueAggregation;
  type loyaltyV1Account_universal_d_ValueAggregationOptionsOneOf = ValueAggregationOptionsOneOf;
  type loyaltyV1Account_universal_d_NestedAggregationType = NestedAggregationType;
  const loyaltyV1Account_universal_d_NestedAggregationType: typeof NestedAggregationType;
  type loyaltyV1Account_universal_d_RangeAggregation = RangeAggregation;
  type loyaltyV1Account_universal_d_ScalarAggregation = ScalarAggregation;
  type loyaltyV1Account_universal_d_DateHistogramAggregation = DateHistogramAggregation;
  type loyaltyV1Account_universal_d_DateHistogramAggregationInterval = DateHistogramAggregationInterval;
  const loyaltyV1Account_universal_d_DateHistogramAggregationInterval: typeof DateHistogramAggregationInterval;
  type loyaltyV1Account_universal_d_NestedAggregationItem = NestedAggregationItem;
  type loyaltyV1Account_universal_d_NestedAggregationItemKindOneOf = NestedAggregationItemKindOneOf;
  type loyaltyV1Account_universal_d_AggregationType = AggregationType;
  const loyaltyV1Account_universal_d_AggregationType: typeof AggregationType;
  type loyaltyV1Account_universal_d_NestedAggregation = NestedAggregation;
  type loyaltyV1Account_universal_d_GroupByAggregation = GroupByAggregation;
  type loyaltyV1Account_universal_d_GroupByAggregationKindOneOf = GroupByAggregationKindOneOf;
  type loyaltyV1Account_universal_d_SearchDetails = SearchDetails;
  type loyaltyV1Account_universal_d_Mode = Mode;
  const loyaltyV1Account_universal_d_Mode: typeof Mode;
  type loyaltyV1Account_universal_d_SearchAccountsResponse = SearchAccountsResponse;
  type loyaltyV1Account_universal_d_AggregationData = AggregationData;
  type loyaltyV1Account_universal_d_ValueAggregationResult = ValueAggregationResult;
  type loyaltyV1Account_universal_d_RangeAggregationResult = RangeAggregationResult;
  type loyaltyV1Account_universal_d_NestedAggregationResults = NestedAggregationResults;
  type loyaltyV1Account_universal_d_NestedAggregationResultsResultOneOf = NestedAggregationResultsResultOneOf;
  type loyaltyV1Account_universal_d_ValueResults = ValueResults;
  type loyaltyV1Account_universal_d_RangeResults = RangeResults;
  type loyaltyV1Account_universal_d_ScalarResult = ScalarResult;
  type loyaltyV1Account_universal_d_NestedValueAggregationResult = NestedValueAggregationResult;
  type loyaltyV1Account_universal_d_ValueResult = ValueResult;
  type loyaltyV1Account_universal_d_RangeResult = RangeResult;
  type loyaltyV1Account_universal_d_NestedResultsScalarResult = NestedResultsScalarResult;
  type loyaltyV1Account_universal_d_NestedResultValue = NestedResultValue;
  type loyaltyV1Account_universal_d_NestedResultValueResultOneOf = NestedResultValueResultOneOf;
  type loyaltyV1Account_universal_d_Results = Results;
  type loyaltyV1Account_universal_d_DateHistogramResult = DateHistogramResult;
  type loyaltyV1Account_universal_d_GroupByValueResults = GroupByValueResults;
  type loyaltyV1Account_universal_d_DateHistogramResults = DateHistogramResults;
  type loyaltyV1Account_universal_d_NestedResults = NestedResults;
  type loyaltyV1Account_universal_d_AggregationResults = AggregationResults;
  type loyaltyV1Account_universal_d_AggregationResultsResultOneOf = AggregationResultsResultOneOf;
  type loyaltyV1Account_universal_d_ExportAccountsRequest = ExportAccountsRequest;
  type loyaltyV1Account_universal_d_ExportAccountsResponse = ExportAccountsResponse;
  type loyaltyV1Account_universal_d_CountAccountsRequest = CountAccountsRequest;
  type loyaltyV1Account_universal_d_CountAccountsResponse = CountAccountsResponse;
  type loyaltyV1Account_universal_d_BulkAdjustPointsRequest = BulkAdjustPointsRequest;
  type loyaltyV1Account_universal_d_BulkAdjustPointsRequestTypeOneOf = BulkAdjustPointsRequestTypeOneOf;
  type loyaltyV1Account_universal_d_BulkAdjustPointsResponse = BulkAdjustPointsResponse;
  type loyaltyV1Account_universal_d_SubscriptionEvent = SubscriptionEvent;
  type loyaltyV1Account_universal_d_SubscriptionEventEventOneOf = SubscriptionEventEventOneOf;
  type loyaltyV1Account_universal_d_SubscriptionCreated = SubscriptionCreated;
  type loyaltyV1Account_universal_d_Subscription = Subscription;
  type loyaltyV1Account_universal_d_BillingReference = BillingReference;
  type loyaltyV1Account_universal_d_ProviderName = ProviderName;
  const loyaltyV1Account_universal_d_ProviderName: typeof ProviderName;
  type loyaltyV1Account_universal_d_Cycle = Cycle;
  type loyaltyV1Account_universal_d_CycleCycleSelectorOneOf = CycleCycleSelectorOneOf;
  type loyaltyV1Account_universal_d_Interval = Interval;
  type loyaltyV1Account_universal_d_IntervalUnit = IntervalUnit;
  const loyaltyV1Account_universal_d_IntervalUnit: typeof IntervalUnit;
  type loyaltyV1Account_universal_d_OneTime = OneTime;
  type loyaltyV1Account_universal_d_SubscriptionStatus = SubscriptionStatus;
  const loyaltyV1Account_universal_d_SubscriptionStatus: typeof SubscriptionStatus;
  type loyaltyV1Account_universal_d_ReactivationData = ReactivationData;
  type loyaltyV1Account_universal_d_ReactivationReasonEnum = ReactivationReasonEnum;
  const loyaltyV1Account_universal_d_ReactivationReasonEnum: typeof ReactivationReasonEnum;
  type loyaltyV1Account_universal_d_SubscriptionAssigned = SubscriptionAssigned;
  type loyaltyV1Account_universal_d_SubscriptionCancelled = SubscriptionCancelled;
  type loyaltyV1Account_universal_d_CancellationDetails = CancellationDetails;
  type loyaltyV1Account_universal_d_Initiator = Initiator;
  const loyaltyV1Account_universal_d_Initiator: typeof Initiator;
  type loyaltyV1Account_universal_d_SubscriptionAutoRenewTurnedOn = SubscriptionAutoRenewTurnedOn;
  type loyaltyV1Account_universal_d_SubscriptionAutoRenewTurnedOff = SubscriptionAutoRenewTurnedOff;
  type loyaltyV1Account_universal_d_SubscriptionUnassigned = SubscriptionUnassigned;
  type loyaltyV1Account_universal_d_UnassignReason = UnassignReason;
  const loyaltyV1Account_universal_d_UnassignReason: typeof UnassignReason;
  type loyaltyV1Account_universal_d_SubscriptionTransferred = SubscriptionTransferred;
  type loyaltyV1Account_universal_d_RecurringChargeSucceeded = RecurringChargeSucceeded;
  type loyaltyV1Account_universal_d_ContractSwitched = ContractSwitched;
  type loyaltyV1Account_universal_d_ContractSwitchType = ContractSwitchType;
  const loyaltyV1Account_universal_d_ContractSwitchType: typeof ContractSwitchType;
  type loyaltyV1Account_universal_d_ContractSwitchReason = ContractSwitchReason;
  const loyaltyV1Account_universal_d_ContractSwitchReason: typeof ContractSwitchReason;
  type loyaltyV1Account_universal_d_ProductPriceIncreaseData = ProductPriceIncreaseData;
  type loyaltyV1Account_universal_d_PriceIncreaseTrigger = PriceIncreaseTrigger;
  const loyaltyV1Account_universal_d_PriceIncreaseTrigger: typeof PriceIncreaseTrigger;
  type loyaltyV1Account_universal_d_ProductAdjustment = ProductAdjustment;
  const loyaltyV1Account_universal_d_ProductAdjustment: typeof ProductAdjustment;
  type loyaltyV1Account_universal_d_SubscriptionNearEndOfPeriod = SubscriptionNearEndOfPeriod;
  type loyaltyV1Account_universal_d_SubscriptionPendingChange = SubscriptionPendingChange;
  type loyaltyV1Account_universal_d_ContactSyncRequest = ContactSyncRequest;
  type loyaltyV1Account_universal_d_BulkUpsertAccountsRequest = BulkUpsertAccountsRequest;
  type loyaltyV1Account_universal_d_AccountToUpsert = AccountToUpsert;
  type loyaltyV1Account_universal_d_BulkUpsertAccountsResponse = BulkUpsertAccountsResponse;
  type loyaltyV1Account_universal_d_BulkAccountResult = BulkAccountResult;
  type loyaltyV1Account_universal_d_SetMissingMemberIdRequest = SetMissingMemberIdRequest;
  type loyaltyV1Account_universal_d_SetMissingMemberIdResponse = SetMissingMemberIdResponse;
  const loyaltyV1Account_universal_d_createAccount: typeof createAccount;
  const loyaltyV1Account_universal_d_earnPoints: typeof earnPoints;
  type loyaltyV1Account_universal_d_EarnPointsOptions = EarnPointsOptions;
  const loyaltyV1Account_universal_d_adjustPoints: typeof adjustPoints;
  type loyaltyV1Account_universal_d_AdjustPointsOptions = AdjustPointsOptions;
  const loyaltyV1Account_universal_d_redeemPoints: typeof redeemPoints;
  type loyaltyV1Account_universal_d_RedeemPointsOptions = RedeemPointsOptions;
  const loyaltyV1Account_universal_d_redeemDeterminedAmountOfPoints: typeof redeemDeterminedAmountOfPoints;
  type loyaltyV1Account_universal_d_RedeemDeterminedAmountOfPointsOptions = RedeemDeterminedAmountOfPointsOptions;
  const loyaltyV1Account_universal_d_refundTransaction: typeof refundTransaction;
  const loyaltyV1Account_universal_d_getAccount: typeof getAccount;
  const loyaltyV1Account_universal_d_queryLoyaltyAccounts: typeof queryLoyaltyAccounts;
  type loyaltyV1Account_universal_d_LoyaltyAccountsQueryResult = LoyaltyAccountsQueryResult;
  type loyaltyV1Account_universal_d_LoyaltyAccountsQueryBuilder = LoyaltyAccountsQueryBuilder;
  const loyaltyV1Account_universal_d_listUserAccounts: typeof listUserAccounts;
  type loyaltyV1Account_universal_d_ListUserAccountsOptions = ListUserAccountsOptions;
  const loyaltyV1Account_universal_d_getProgramTotals: typeof getProgramTotals;
  const loyaltyV1Account_universal_d_getCurrentMemberAccount: typeof getCurrentMemberAccount;
  const loyaltyV1Account_universal_d_getMyAccount: typeof getMyAccount;
  const loyaltyV1Account_universal_d_getAccountBySecondaryId: typeof getAccountBySecondaryId;
  type loyaltyV1Account_universal_d_GetAccountBySecondaryIdOptions = GetAccountBySecondaryIdOptions;
  const loyaltyV1Account_universal_d_listAccounts: typeof listAccounts;
  type loyaltyV1Account_universal_d_ListAccountsOptions = ListAccountsOptions;
  const loyaltyV1Account_universal_d_searchAccounts: typeof searchAccounts;
  type loyaltyV1Account_universal_d_SearchAccountsOptions = SearchAccountsOptions;
  const loyaltyV1Account_universal_d_exportAccounts: typeof exportAccounts;
  type loyaltyV1Account_universal_d_ExportAccountsOptions = ExportAccountsOptions;
  const loyaltyV1Account_universal_d_countAccounts: typeof countAccounts;
  type loyaltyV1Account_universal_d_CountAccountsOptions = CountAccountsOptions;
  const loyaltyV1Account_universal_d_bulkAdjustPoints: typeof bulkAdjustPoints;
  type loyaltyV1Account_universal_d_BulkAdjustPointsOptions = BulkAdjustPointsOptions;
  const loyaltyV1Account_universal_d_bulkUpsertAccounts: typeof bulkUpsertAccounts;
  type loyaltyV1Account_universal_d_BulkUpsertAccountsOptions = BulkUpsertAccountsOptions;
  const loyaltyV1Account_universal_d_setMissingMemberId: typeof setMissingMemberId;
  namespace loyaltyV1Account_universal_d {
    export {
      loyaltyV1Account_universal_d_LoyaltyAccount as LoyaltyAccount,
      loyaltyV1Account_universal_d_Points as Points,
      Tier$1 as Tier,
      loyaltyV1Account_universal_d_Contact as Contact,
      loyaltyV1Account_universal_d_Image as Image,
      PointsExpiration$1 as PointsExpiration,
      loyaltyV1Account_universal_d_RewardAvailabilityUpdated as RewardAvailabilityUpdated,
      loyaltyV1Account_universal_d_UpdateTrigger as UpdateTrigger,
      loyaltyV1Account_universal_d_CreateAccountRequest as CreateAccountRequest,
      loyaltyV1Account_universal_d_CreateAccountResponse as CreateAccountResponse,
      loyaltyV1Account_universal_d_EarnPointsRequest as EarnPointsRequest,
      loyaltyV1Account_universal_d_EarnPointsRequestActivityDetailsOneOf as EarnPointsRequestActivityDetailsOneOf,
      loyaltyV1Account_universal_d_FollowedSocialMedia as FollowedSocialMedia,
      loyaltyV1Account_universal_d_EarnPointsResponse as EarnPointsResponse,
      loyaltyV1Account_universal_d_PointsUpdated as PointsUpdated,
      loyaltyV1Account_universal_d_FirstTransaction as FirstTransaction,
      loyaltyV1Account_universal_d_AdjustPointsRequest as AdjustPointsRequest,
      loyaltyV1Account_universal_d_AdjustPointsRequestTypeOneOf as AdjustPointsRequestTypeOneOf,
      loyaltyV1Account_universal_d_AdjustPointsResponse as AdjustPointsResponse,
      loyaltyV1Account_universal_d_RedeemPointsRequest as RedeemPointsRequest,
      loyaltyV1Account_universal_d_RedeemPointsResponse as RedeemPointsResponse,
      loyaltyV1Account_universal_d_RedeemDeterminedAmountOfPointsRequest as RedeemDeterminedAmountOfPointsRequest,
      loyaltyV1Account_universal_d_RedeemDeterminedAmountOfPointsResponse as RedeemDeterminedAmountOfPointsResponse,
      loyaltyV1Account_universal_d_RefundTransactionRequest as RefundTransactionRequest,
      loyaltyV1Account_universal_d_RefundTransactionResponse as RefundTransactionResponse,
      loyaltyV1Account_universal_d_GetAccountRequest as GetAccountRequest,
      loyaltyV1Account_universal_d_GetAccountResponse as GetAccountResponse,
      loyaltyV1Account_universal_d_QueryLoyaltyAccountsRequest as QueryLoyaltyAccountsRequest,
      CursorQuery$2 as CursorQuery,
      CursorQueryPagingMethodOneOf$2 as CursorQueryPagingMethodOneOf,
      Sorting$2 as Sorting,
      SortOrder$2 as SortOrder,
      CursorPaging$3 as CursorPaging,
      loyaltyV1Account_universal_d_QueryLoyaltyAccountsResponse as QueryLoyaltyAccountsResponse,
      CursorPagingMetadata$1 as CursorPagingMetadata,
      Cursors$3 as Cursors,
      loyaltyV1Account_universal_d_ListUserAccountsRequest as ListUserAccountsRequest,
      loyaltyV1Account_universal_d_ListUserAccountsResponse as ListUserAccountsResponse,
      loyaltyV1Account_universal_d_LoyaltyAccountForMetaSite as LoyaltyAccountForMetaSite,
      loyaltyV1Account_universal_d_GetProgramTotalsRequest as GetProgramTotalsRequest,
      loyaltyV1Account_universal_d_GetProgramTotalsResponse as GetProgramTotalsResponse,
      loyaltyV1Account_universal_d_TierTotal as TierTotal,
      loyaltyV1Account_universal_d_GetCurrentMemberAccountRequest as GetCurrentMemberAccountRequest,
      loyaltyV1Account_universal_d_GetCurrentMemberAccountResponse as GetCurrentMemberAccountResponse,
      loyaltyV1Account_universal_d_GetMyAccountRequest as GetMyAccountRequest,
      loyaltyV1Account_universal_d_GetMyAccountResponse as GetMyAccountResponse,
      loyaltyV1Account_universal_d_GetAccountBySecondaryIdRequest as GetAccountBySecondaryIdRequest,
      loyaltyV1Account_universal_d_GetAccountBySecondaryIdRequestIdOneOf as GetAccountBySecondaryIdRequestIdOneOf,
      loyaltyV1Account_universal_d_GetAccountBySecondaryIdResponse as GetAccountBySecondaryIdResponse,
      loyaltyV1Account_universal_d_ListAccountsRequest as ListAccountsRequest,
      loyaltyV1Account_universal_d_ListAccountsResponse as ListAccountsResponse,
      PagingMetadataV2$3 as PagingMetadataV2,
      loyaltyV1Account_universal_d_SearchAccountsRequest as SearchAccountsRequest,
      loyaltyV1Account_universal_d_CursorSearch as CursorSearch,
      loyaltyV1Account_universal_d_CursorSearchPagingMethodOneOf as CursorSearchPagingMethodOneOf,
      loyaltyV1Account_universal_d_Aggregation as Aggregation,
      loyaltyV1Account_universal_d_AggregationKindOneOf as AggregationKindOneOf,
      loyaltyV1Account_universal_d_RangeBucket as RangeBucket,
      loyaltyV1Account_universal_d_SortType as SortType,
      loyaltyV1Account_universal_d_SortDirection as SortDirection,
      loyaltyV1Account_universal_d_MissingValues as MissingValues,
      loyaltyV1Account_universal_d_IncludeMissingValuesOptions as IncludeMissingValuesOptions,
      loyaltyV1Account_universal_d_ScalarType as ScalarType,
      loyaltyV1Account_universal_d_ValueAggregation as ValueAggregation,
      loyaltyV1Account_universal_d_ValueAggregationOptionsOneOf as ValueAggregationOptionsOneOf,
      loyaltyV1Account_universal_d_NestedAggregationType as NestedAggregationType,
      loyaltyV1Account_universal_d_RangeAggregation as RangeAggregation,
      loyaltyV1Account_universal_d_ScalarAggregation as ScalarAggregation,
      loyaltyV1Account_universal_d_DateHistogramAggregation as DateHistogramAggregation,
      loyaltyV1Account_universal_d_DateHistogramAggregationInterval as DateHistogramAggregationInterval,
      loyaltyV1Account_universal_d_NestedAggregationItem as NestedAggregationItem,
      loyaltyV1Account_universal_d_NestedAggregationItemKindOneOf as NestedAggregationItemKindOneOf,
      loyaltyV1Account_universal_d_AggregationType as AggregationType,
      loyaltyV1Account_universal_d_NestedAggregation as NestedAggregation,
      loyaltyV1Account_universal_d_GroupByAggregation as GroupByAggregation,
      loyaltyV1Account_universal_d_GroupByAggregationKindOneOf as GroupByAggregationKindOneOf,
      loyaltyV1Account_universal_d_SearchDetails as SearchDetails,
      loyaltyV1Account_universal_d_Mode as Mode,
      loyaltyV1Account_universal_d_SearchAccountsResponse as SearchAccountsResponse,
      loyaltyV1Account_universal_d_AggregationData as AggregationData,
      loyaltyV1Account_universal_d_ValueAggregationResult as ValueAggregationResult,
      loyaltyV1Account_universal_d_RangeAggregationResult as RangeAggregationResult,
      loyaltyV1Account_universal_d_NestedAggregationResults as NestedAggregationResults,
      loyaltyV1Account_universal_d_NestedAggregationResultsResultOneOf as NestedAggregationResultsResultOneOf,
      loyaltyV1Account_universal_d_ValueResults as ValueResults,
      loyaltyV1Account_universal_d_RangeResults as RangeResults,
      loyaltyV1Account_universal_d_ScalarResult as ScalarResult,
      loyaltyV1Account_universal_d_NestedValueAggregationResult as NestedValueAggregationResult,
      loyaltyV1Account_universal_d_ValueResult as ValueResult,
      loyaltyV1Account_universal_d_RangeResult as RangeResult,
      loyaltyV1Account_universal_d_NestedResultsScalarResult as NestedResultsScalarResult,
      loyaltyV1Account_universal_d_NestedResultValue as NestedResultValue,
      loyaltyV1Account_universal_d_NestedResultValueResultOneOf as NestedResultValueResultOneOf,
      loyaltyV1Account_universal_d_Results as Results,
      loyaltyV1Account_universal_d_DateHistogramResult as DateHistogramResult,
      loyaltyV1Account_universal_d_GroupByValueResults as GroupByValueResults,
      loyaltyV1Account_universal_d_DateHistogramResults as DateHistogramResults,
      loyaltyV1Account_universal_d_NestedResults as NestedResults,
      loyaltyV1Account_universal_d_AggregationResults as AggregationResults,
      loyaltyV1Account_universal_d_AggregationResultsResultOneOf as AggregationResultsResultOneOf,
      loyaltyV1Account_universal_d_ExportAccountsRequest as ExportAccountsRequest,
      QueryV2$1 as QueryV2,
      QueryV2PagingMethodOneOf$1 as QueryV2PagingMethodOneOf,
      Paging$1 as Paging,
      loyaltyV1Account_universal_d_ExportAccountsResponse as ExportAccountsResponse,
      loyaltyV1Account_universal_d_CountAccountsRequest as CountAccountsRequest,
      loyaltyV1Account_universal_d_CountAccountsResponse as CountAccountsResponse,
      loyaltyV1Account_universal_d_BulkAdjustPointsRequest as BulkAdjustPointsRequest,
      loyaltyV1Account_universal_d_BulkAdjustPointsRequestTypeOneOf as BulkAdjustPointsRequestTypeOneOf,
      loyaltyV1Account_universal_d_BulkAdjustPointsResponse as BulkAdjustPointsResponse,
      DomainEvent$5 as DomainEvent,
      DomainEventBodyOneOf$5 as DomainEventBodyOneOf,
      EntityCreatedEvent$5 as EntityCreatedEvent,
      RestoreInfo$5 as RestoreInfo,
      EntityUpdatedEvent$5 as EntityUpdatedEvent,
      EntityDeletedEvent$5 as EntityDeletedEvent,
      ActionEvent$5 as ActionEvent,
      Empty$5 as Empty,
      TiersRollingUpdate$1 as TiersRollingUpdate,
      TiersProgramSettingsChanged$1 as TiersProgramSettingsChanged,
      TiersProgramSettings$1 as TiersProgramSettings,
      TiersProgramSettingsPeriodOneOf$1 as TiersProgramSettingsPeriodOneOf,
      Status$4 as Status,
      TierDefinition$1 as TierDefinition,
      FocalPoint$2 as FocalPoint,
      RollingWindow$1 as RollingWindow,
      loyaltyV1Account_universal_d_SubscriptionEvent as SubscriptionEvent,
      loyaltyV1Account_universal_d_SubscriptionEventEventOneOf as SubscriptionEventEventOneOf,
      loyaltyV1Account_universal_d_SubscriptionCreated as SubscriptionCreated,
      loyaltyV1Account_universal_d_Subscription as Subscription,
      loyaltyV1Account_universal_d_BillingReference as BillingReference,
      loyaltyV1Account_universal_d_ProviderName as ProviderName,
      loyaltyV1Account_universal_d_Cycle as Cycle,
      loyaltyV1Account_universal_d_CycleCycleSelectorOneOf as CycleCycleSelectorOneOf,
      loyaltyV1Account_universal_d_Interval as Interval,
      loyaltyV1Account_universal_d_IntervalUnit as IntervalUnit,
      loyaltyV1Account_universal_d_OneTime as OneTime,
      loyaltyV1Account_universal_d_SubscriptionStatus as SubscriptionStatus,
      loyaltyV1Account_universal_d_ReactivationData as ReactivationData,
      loyaltyV1Account_universal_d_ReactivationReasonEnum as ReactivationReasonEnum,
      loyaltyV1Account_universal_d_SubscriptionAssigned as SubscriptionAssigned,
      loyaltyV1Account_universal_d_SubscriptionCancelled as SubscriptionCancelled,
      loyaltyV1Account_universal_d_CancellationDetails as CancellationDetails,
      loyaltyV1Account_universal_d_Initiator as Initiator,
      loyaltyV1Account_universal_d_SubscriptionAutoRenewTurnedOn as SubscriptionAutoRenewTurnedOn,
      loyaltyV1Account_universal_d_SubscriptionAutoRenewTurnedOff as SubscriptionAutoRenewTurnedOff,
      loyaltyV1Account_universal_d_SubscriptionUnassigned as SubscriptionUnassigned,
      loyaltyV1Account_universal_d_UnassignReason as UnassignReason,
      loyaltyV1Account_universal_d_SubscriptionTransferred as SubscriptionTransferred,
      loyaltyV1Account_universal_d_RecurringChargeSucceeded as RecurringChargeSucceeded,
      loyaltyV1Account_universal_d_ContractSwitched as ContractSwitched,
      loyaltyV1Account_universal_d_ContractSwitchType as ContractSwitchType,
      loyaltyV1Account_universal_d_ContractSwitchReason as ContractSwitchReason,
      loyaltyV1Account_universal_d_ProductPriceIncreaseData as ProductPriceIncreaseData,
      loyaltyV1Account_universal_d_PriceIncreaseTrigger as PriceIncreaseTrigger,
      loyaltyV1Account_universal_d_ProductAdjustment as ProductAdjustment,
      loyaltyV1Account_universal_d_SubscriptionNearEndOfPeriod as SubscriptionNearEndOfPeriod,
      loyaltyV1Account_universal_d_SubscriptionPendingChange as SubscriptionPendingChange,
      loyaltyV1Account_universal_d_ContactSyncRequest as ContactSyncRequest,
      loyaltyV1Account_universal_d_BulkUpsertAccountsRequest as BulkUpsertAccountsRequest,
      loyaltyV1Account_universal_d_AccountToUpsert as AccountToUpsert,
      loyaltyV1Account_universal_d_BulkUpsertAccountsResponse as BulkUpsertAccountsResponse,
      loyaltyV1Account_universal_d_BulkAccountResult as BulkAccountResult,
      ItemMetadata$3 as ItemMetadata,
      ApplicationError$3 as ApplicationError,
      BulkActionMetadata$3 as BulkActionMetadata,
      loyaltyV1Account_universal_d_SetMissingMemberIdRequest as SetMissingMemberIdRequest,
      loyaltyV1Account_universal_d_SetMissingMemberIdResponse as SetMissingMemberIdResponse,
      MessageEnvelope$5 as MessageEnvelope,
      IdentificationData$5 as IdentificationData,
      IdentificationDataIdOneOf$5 as IdentificationDataIdOneOf,
      WebhookIdentityType$5 as WebhookIdentityType,
      loyaltyV1Account_universal_d_createAccount as createAccount,
      loyaltyV1Account_universal_d_earnPoints as earnPoints,
      loyaltyV1Account_universal_d_EarnPointsOptions as EarnPointsOptions,
      loyaltyV1Account_universal_d_adjustPoints as adjustPoints,
      loyaltyV1Account_universal_d_AdjustPointsOptions as AdjustPointsOptions,
      loyaltyV1Account_universal_d_redeemPoints as redeemPoints,
      loyaltyV1Account_universal_d_RedeemPointsOptions as RedeemPointsOptions,
      loyaltyV1Account_universal_d_redeemDeterminedAmountOfPoints as redeemDeterminedAmountOfPoints,
      loyaltyV1Account_universal_d_RedeemDeterminedAmountOfPointsOptions as RedeemDeterminedAmountOfPointsOptions,
      loyaltyV1Account_universal_d_refundTransaction as refundTransaction,
      loyaltyV1Account_universal_d_getAccount as getAccount,
      loyaltyV1Account_universal_d_queryLoyaltyAccounts as queryLoyaltyAccounts,
      loyaltyV1Account_universal_d_LoyaltyAccountsQueryResult as LoyaltyAccountsQueryResult,
      loyaltyV1Account_universal_d_LoyaltyAccountsQueryBuilder as LoyaltyAccountsQueryBuilder,
      loyaltyV1Account_universal_d_listUserAccounts as listUserAccounts,
      loyaltyV1Account_universal_d_ListUserAccountsOptions as ListUserAccountsOptions,
      loyaltyV1Account_universal_d_getProgramTotals as getProgramTotals,
      loyaltyV1Account_universal_d_getCurrentMemberAccount as getCurrentMemberAccount,
      loyaltyV1Account_universal_d_getMyAccount as getMyAccount,
      loyaltyV1Account_universal_d_getAccountBySecondaryId as getAccountBySecondaryId,
      loyaltyV1Account_universal_d_GetAccountBySecondaryIdOptions as GetAccountBySecondaryIdOptions,
      loyaltyV1Account_universal_d_listAccounts as listAccounts,
      loyaltyV1Account_universal_d_ListAccountsOptions as ListAccountsOptions,
      loyaltyV1Account_universal_d_searchAccounts as searchAccounts,
      loyaltyV1Account_universal_d_SearchAccountsOptions as SearchAccountsOptions,
      loyaltyV1Account_universal_d_exportAccounts as exportAccounts,
      loyaltyV1Account_universal_d_ExportAccountsOptions as ExportAccountsOptions,
      loyaltyV1Account_universal_d_countAccounts as countAccounts,
      loyaltyV1Account_universal_d_CountAccountsOptions as CountAccountsOptions,
      loyaltyV1Account_universal_d_bulkAdjustPoints as bulkAdjustPoints,
      loyaltyV1Account_universal_d_BulkAdjustPointsOptions as BulkAdjustPointsOptions,
      loyaltyV1Account_universal_d_bulkUpsertAccounts as bulkUpsertAccounts,
      loyaltyV1Account_universal_d_BulkUpsertAccountsOptions as BulkUpsertAccountsOptions,
      loyaltyV1Account_universal_d_setMissingMemberId as setMissingMemberId,
    };
  }
  
  /**
   * A loyalty coupon is created when a customer redeems their loyalty points for a reward. Creating a loyalty coupon
   * also creates a corresponding "reference" coupon with the [Coupons API](https://dev.wix.com/api/rest/coupons/about-wix-coupons).
   */
  interface LoyaltyCoupon {
      /**
       * Loyalty coupon ID.
       * @readonly
       */
      _id?: string;
      /**
       * [Loyalty account ID](https://dev.wix.com/docs/rest/crm/loyalty-program/accounts/account-object) of the customer that redeemed points for a coupon.
       * @readonly
       */
      accountId?: string;
      /**
       * [Member ID](https://dev.wix.com/api/rest/members/members/member-object) of the customer that redeemed points for a coupon.
       * @readonly
       * @deprecated [Member ID](https://dev.wix.com/api/rest/members/members/member-object) of the customer that redeemed points for a coupon.
       * @replacedBy member_id
       * @targetRemovalDate 2024-06-01
       */
      memberIdDeprecated?: string;
      /**
       * [Member ID](https://dev.wix.com/docs/rest/crm/members-contacts/members/members/member-object) of the customer that redeemed points for a coupon.
       * @readonly
       */
      memberId?: string | null;
      /**
       * Transaction ID for the transaction that created a coupon.
       * @readonly
       */
      transactionId?: string | null;
      /**
       * Reference coupon information for the corresponding [coupon](https://dev.wix.com/api/rest/coupons/about-wix-coupons)
       * that is created along with the loyalty coupon.
       * @readonly
       */
      couponReference?: CouponReference;
      /**
       * Loyalty coupon status.
       *
       * This status relates to the corresponding coupon that is created
       * at the same time as the loyalty coupon and is included in `couponReference`.
       * @readonly
       */
      status?: Status$3;
      /**
       * Name of reward that was redeemed to create this coupon.
       * @readonly
       */
      rewardName?: string;
      /**
       * Revision number, which increments by 1 each time the loyalty coupon is updated.
       *
       * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty coupon.
       */
      revision?: string | null;
      /**
       * Date and time the loyalty coupon was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the loyalty coupon was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  interface CouponReference {
      /**
       * Coupon ID.
       * @readonly
       */
      couponId?: string;
      /**
       * Coupon code.
       *
       * Unique code entered by a customer to apply the coupon.
       * @readonly
       */
      code?: string;
      /**
       * Name of coupon.
       * @readonly
       */
      name?: string | null;
      /**
       * The information to use when creating the coupon.
       * @readonly
       */
      specification?: Specification;
      /**
       * Whether the referenced coupon was deleted.
       * @readonly
       */
      deleted?: boolean | null;
  }
  interface Specification extends SpecificationTypeDetailsOneOf, SpecificationScopeOrMinSubtotalOneOf {
      /** Fixed price discount. */
      moneyOffAmount?: number;
      /** Discount as a percentage. */
      percentOffRate?: number;
      /** Free shipping. If true, the coupon applies to all items in all `namespaces` in the site. */
      freeShipping?: boolean;
      /** Specific sale price. Currently only supported for coupons with a `stores` `namespace`. */
      fixedPriceAmount?: number;
      /**
       * Free products when making a purchase. `buyXGetY` is an object that specifies `x` and `y` in the
       * following scenario: if a visitor purchases x number of products, they receive y number of products for free. C
       * urrently only supported for coupons with a `stores` `namespace`.
       */
      buyXGetY?: BuyXGetY;
      /**
       * Scope of the coupon. When no scope is defined, the coupon applies to all
       * items in all `namespaces` in the site.
       */
      scope?: Scope;
      /** The coupon is only applicable when the order subtotal is over this amount. */
      minimumSubtotal?: number | null;
      /** Name of coupon. */
      name?: string | null;
      type?: Type$2;
      /**
       * Whether the coupon is limited to 1 discount per order. If true and a customer pays for multiple items
       * that the coupon applies to, only the lowest priced item is discounted.
       * Coupons with a `bookings` `namespace` are always limited to 1 item.
       */
      limitedToOneItem?: boolean | null;
      /** Whether the coupon also applies to subscriptions. */
      appliesToSubscriptions?: boolean | null;
      /**
       * Specifies the amount of cycles to apply the discount to for a subscription item.
       *
       * Can only be set when `appliesToSubscriptions` is `TRUE` and `specification.scope.namespace` is `pricingPlans`.
       * If `discountedCycleCount` is empty, the coupon applies to all available cycles.
       *
       * Min: `1`
       *
       * Max: `999`
       */
      discountedCycleCount?: number | null;
  }
  /** @oneof */
  interface SpecificationTypeDetailsOneOf {
      /** Fixed price discount. */
      moneyOffAmount?: number;
      /** Discount as a percentage. */
      percentOffRate?: number;
      /** Free shipping. If true, the coupon applies to all items in all `namespaces` in the site. */
      freeShipping?: boolean;
      /** Specific sale price. Currently only supported for coupons with a `stores` `namespace`. */
      fixedPriceAmount?: number;
      /**
       * Free products when making a purchase. `buyXGetY` is an object that specifies `x` and `y` in the
       * following scenario: if a visitor purchases x number of products, they receive y number of products for free. C
       * urrently only supported for coupons with a `stores` `namespace`.
       */
      buyXGetY?: BuyXGetY;
  }
  /** @oneof */
  interface SpecificationScopeOrMinSubtotalOneOf {
      /**
       * Scope of the coupon. When no scope is defined, the coupon applies to all
       * items in all `namespaces` in the site.
       */
      scope?: Scope;
      /** The coupon is only applicable when the order subtotal is over this amount. */
      minimumSubtotal?: number | null;
  }
  enum Type$2 {
      UNKNOWN = "UNKNOWN",
      MONEY_OFF_AMOUNT = "MONEY_OFF_AMOUNT",
      PERCENT_OFF_RATE = "PERCENT_OFF_RATE",
      FREE_SHIPPING = "FREE_SHIPPING",
      FIXED_PRICE_AMOUNT = "FIXED_PRICE_AMOUNT",
      BUY_X_GET_Y = "BUY_X_GET_Y"
  }
  interface BuyXGetY {
      /** Number of purchased items required to receive free items. */
      x?: number;
      /** Number of items received for free if required number of items were purchased. */
      y?: number;
  }
  interface Scope {
      /**
       * Group within a `namespace` for which the coupon is applicable.
       *
       * If no group is specified, the coupon applies to all items in the namespace.
       * `group` is required in some namespaces. See [Scope Values](https://dev.wix.com/api/rest/coupons/coupons/valid-scope-values)
       * for a list of currently supported groups for each namespace.
       */
      name?: string | null;
      /**
       * ID of the specific entity in the group for which the coupon is applicable.
       *
       * If no `entityId` is specified, the coupon applies to all entities in the group. In some cases when a group is specified,
       * an `entityId` is required. See [Scope Values](https://dev.wix.com/api/rest/coupons/coupons/valid-scope-values)
       * for a list of currently supported entities for each namespace and group.
       */
      entityId?: string | null;
      /**
       * Wix application for which the coupon is applicable.
       *
       * One of the following:
       * + `"stores"`
       * + `"bookings"`
       * + `"events"`
       * + `"pricingPlans"`
       */
      namespace?: string;
  }
  enum Status$3 {
      /** Unknown status. */
      UNKNOWN = "UNKNOWN",
      /** The reference coupon was created but the loyalty points have not been redeemed yet. */
      PENDING = "PENDING",
      /** The reference coupon is active and available to the customer. */
      ACTIVE = "ACTIVE",
      /** The reference coupon was applied and is no longer available for use. */
      APPLIED = "APPLIED",
      /** The reference coupon was created but something went wrong when redeeming points from the loyalty account. */
      FAILED = "FAILED",
      /** The reference coupon was deleted. */
      ARCHIVED = "ARCHIVED"
  }
  interface RedeemPointsForCouponRequest {
      /** ID of the [loyalty reward](https://dev.wix.com/docs/rest/crm/loyalty-program/rewards/reward-object) to redeem. */
      rewardId: string;
      /** ID of the [loyalty account](https://dev.wix.com/docs/rest/crm/loyalty-program/accounts/account-object) of the customer redeeming points. */
      loyaltyAccountId: string;
  }
  interface RedeemPointsForCouponResponse {
      /** Created loyalty coupon. */
      coupon?: LoyaltyCoupon;
  }
  interface RedeemCurrentMemberPointsForCouponRequest {
      /** ID of the [loyalty reward](https://dev.wix.com/docs/rest/crm/loyalty-program/rewards/reward-object) to redeem. */
      rewardId: string;
  }
  interface RedeemCurrentMemberPointsForCouponResponse {
      /** Created loyalty coupon. */
      coupon?: LoyaltyCoupon;
      /**
       * Transaction id of the coupon redemption
       * @internal
       */
      transactionId?: string;
  }
  interface RedeemMemberPointsForDiscountAmountCouponRequest {
      /** ID of the [loyalty reward](https://dev.wix.com/api/rest/wix-loyalty-program/rewards) to redeem. */
      rewardId: string;
      /** Loyalty account id. */
      loyaltyAccountId: string;
      /** Number of points to redeem. */
      pointsToRedeem: number;
      /** Coupon specification. */
      specification: Specification;
  }
  interface RedeemMemberPointsForDiscountAmountCouponResponse {
      /** Created loyalty coupon. */
      coupon?: LoyaltyCoupon;
      /** Transaction id of the coupon redemption */
      transactionId?: string;
  }
  interface GetLoyaltyCouponRequest {
      /** ID of the loyalty coupon to retrieve. */
      loyaltyCouponId: string;
  }
  interface GetLoyaltyCouponResponse {
      /** Retrieved loyalty coupon. */
      loyaltyCoupon?: LoyaltyCoupon;
  }
  interface BulkGetLoyaltyCouponRequest {
      /** Query to filter loyalty coupons. */
      query?: CursorQuery$1;
  }
  interface CursorQuery$1 extends CursorQueryPagingMethodOneOf$1 {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$2;
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
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$1 {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$2;
  }
  interface Sorting$1 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$1;
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
  enum SortOrder$1 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$2 {
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
  interface BulkGetLoyaltyCouponResponse {
      /** Retrieved loyalty coupons. */
      couponsInSite?: CouponsInSite[];
  }
  interface CouponsInSite {
      /** Metasite id */
      metaSiteId?: string;
      /** Retrieved loyalty coupons. */
      loyaltyCoupons?: LoyaltyCoupon[];
  }
  interface GetCurrentMemberCouponsRequest {
  }
  interface GetCurrentMemberCouponsResponse {
      /** Retrieved loyalty coupons. */
      loyaltyCoupons?: LoyaltyCoupon[];
  }
  interface QueryLoyaltyCouponRequest {
      /** Query options. */
      query: QueryV2;
  }
  interface QueryV2 extends QueryV2PagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$2;
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
      paging?: Paging;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$2;
  }
  interface Paging {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface QueryLoyaltyCouponResponse {
      /** Retrieved loyalty coupons. */
      loyaltyCoupons?: LoyaltyCoupon[];
      /** Metadata. */
      metadata?: PagingMetadataV2$2;
  }
  interface PagingMetadataV2$2 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
      total?: number | null;
      /** Flag that indicates the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
      cursors?: Cursors$2;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface Cursors$2 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface DeleteLoyaltyCouponRequest {
      /** ID of the loyalty coupon to delete. */
      _id: string;
      /**
       * Revision number, which increments by 1 each time the loyalty coupon is updated.
       *
       * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty coupon.
       */
      revision?: string;
  }
  interface DeleteLoyaltyCouponResponse {
  }
  interface DomainEvent$4 extends DomainEventBodyOneOf$4 {
      createdEvent?: EntityCreatedEvent$4;
      updatedEvent?: EntityUpdatedEvent$4;
      deletedEvent?: EntityDeletedEvent$4;
      actionEvent?: ActionEvent$4;
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
  interface DomainEventBodyOneOf$4 {
      createdEvent?: EntityCreatedEvent$4;
      updatedEvent?: EntityUpdatedEvent$4;
      deletedEvent?: EntityDeletedEvent$4;
      actionEvent?: ActionEvent$4;
  }
  interface EntityCreatedEvent$4 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$4;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$4 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$4 {
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
  interface EntityDeletedEvent$4 {
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
  interface ActionEvent$4 {
      bodyAsJson?: string;
  }
  interface Empty$4 {
  }
  interface MessageEnvelope$4 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$4;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$4 extends IdentificationDataIdOneOf$4 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$4;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$4 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$4 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Redeems a customer's loyalty points for a loyalty reward and creates a loyalty coupon.
   *
   * Creating a loyalty coupon also creates a corresponding "reference" coupon with the [Coupons API](https://dev.wix.com/api/rest/coupons/about-wix-coupons).
   * The customer receives the reference coupon, which they can apply to their order. The loyalty coupon and its corresponding reference coupon
   * are linked and the loyalty coupon's `status` reflects the current state of the reference coupon.
   *
   * Check which loyalty rewards a site has available with [List Rewards](https://dev.wix.com/docs/rest/crm/loyalty-program/rewards/list-rewards).
   * @param rewardId - ID of the [loyalty reward](https://dev.wix.com/docs/rest/crm/loyalty-program/rewards/reward-object) to redeem.
   * @public
   * @requiredField options
   * @requiredField options.loyaltyAccountId
   * @requiredField rewardId
   * @permissionId LOYALTY.REDEEM_COUPON
   * @adminMethod
   */
  function redeemPointsForCoupon(rewardId: string, options: RedeemPointsForCouponOptions): Promise<RedeemPointsForCouponResponse>;
  interface RedeemPointsForCouponOptions {
      /** ID of the [loyalty account](https://dev.wix.com/docs/rest/crm/loyalty-program/accounts/account-object) of the customer redeeming points. */
      loyaltyAccountId: string;
  }
  /**
   * Redeems a current customer's loyalty points for a loyalty reward and creates a loyalty coupon.
   *
   * Creating a loyalty coupon also creates a corresponding "reference" coupon with the [Coupons API](https://dev.wix.com/api/rest/coupons/about-wix-coupons).
   * The customer receives the reference coupon, which they can apply to their order. The loyalty coupon and its corresponding reference coupon
   * are linked and the loyalty coupon's `status` reflects the current state of the reference coupon.
   *
   * Check which loyalty rewards a site has available with [List Rewards](https://dev.wix.com/docs/rest/crm/loyalty-program/rewards/list-rewards).
   *
   * >**Note:**
   * >This endpoint requires [visitor or member authentication](https://dev.wix.com/docs/rest/articles/getting-started/access-types-and-permissions).
   * @param rewardId - ID of the [loyalty reward](https://dev.wix.com/docs/rest/crm/loyalty-program/rewards/reward-object) to redeem.
   * @public
   * @requiredField rewardId
   * @permissionId LOYALTY.REDEEM_OWN_COUPON
   */
  function redeemCurrentMemberPointsForCoupon(rewardId: string): Promise<RedeemCurrentMemberPointsForCouponResponse>;
  /**
   * Redeems a current customer's loyalty points for a loyalty reward and creates a loyalty coupon.
   *
   * Creating a loyalty coupon also creates a corresponding "reference" coupon with the [Coupons API](https://dev.wix.com/api/rest/coupons/about-wix-coupons).
   * The customer receives the reference coupon, which they can apply to their order. The loyalty coupon and its corresponding reference coupon
   * are linked and the loyalty coupon's `status` reflects the current state of the reference coupon.
   *
   * Check which loyalty rewards a site has available with [List Rewards](https://dev.wix.com/api/rest/wix-loyalty-program/rewards/list-rewards).
   * @param rewardId - ID of the [loyalty reward](https://dev.wix.com/api/rest/wix-loyalty-program/rewards) to redeem.
   * @internal
   * @requiredField options
   * @requiredField options.loyaltyAccountId
   * @requiredField options.pointsToRedeem
   * @requiredField options.specification
   * @requiredField rewardId
   * @permissionId LOYALTY.REDEEM_COUPON
   * @adminMethod
   */
  function redeemMemberPointsForDiscountAmountCoupon(rewardId: string, options: RedeemMemberPointsForDiscountAmountCouponOptions): Promise<RedeemMemberPointsForDiscountAmountCouponResponse>;
  interface RedeemMemberPointsForDiscountAmountCouponOptions {
      /** Loyalty account id. */
      loyaltyAccountId: string;
      /** Number of points to redeem. */
      pointsToRedeem: number;
      /** Coupon specification. */
      specification: Specification;
  }
  /**
   * Retrieves a loyalty coupon.
   * @param loyaltyCouponId - ID of the loyalty coupon to retrieve.
   * @public
   * @requiredField loyaltyCouponId
   * @permissionId LOYALTY.READ_COUPONS
   * @adminMethod
   * @returns Retrieved loyalty coupon.
   */
  function getLoyaltyCoupon(loyaltyCouponId: string): Promise<LoyaltyCoupon>;
  /**
   * Retrieves a sequence of loyalty coupons
   * @public
   * @documentationMaturity preview
   * @permissionId LOYALTY.REWARD_BULK_READ
   * @adminMethod
   */
  function bulkGetLoyaltyCoupon(options?: BulkGetLoyaltyCouponOptions): Promise<BulkGetLoyaltyCouponResponse>;
  interface BulkGetLoyaltyCouponOptions {
      /** Query to filter loyalty coupons. */
      query?: CursorQuery$1;
  }
  /**
   * Retrieves the loyalty coupons for the currently logged-in member.
   *
   * >**Note:**
   * >This endpoint requires [visitor or member authentication](https://dev.wix.com/docs/rest/articles/getting-started/access-types-and-permissions).
   * @public
   * @permissionId LOYALTY.READ_OWN_COUPONS
   */
  function getCurrentMemberCoupons(): Promise<GetCurrentMemberCouponsResponse>;
  /**
   * Retrieves a list of loyalty coupons, given the provided paging, filtering, and sorting.
   * @public
   * @permissionId LOYALTY.READ_COUPONS
   * @adminMethod
   */
  function queryLoyaltyCoupons(): LoyaltyCouponsQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors$2;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface LoyaltyCouponsQueryResult extends QueryCursorResult {
      items: LoyaltyCoupon[];
      query: LoyaltyCouponsQueryBuilder;
      next: () => Promise<LoyaltyCouponsQueryResult>;
      prev: () => Promise<LoyaltyCouponsQueryResult>;
  }
  interface LoyaltyCouponsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      eq: (propertyName: 'accountId' | 'memberId' | 'transactionId' | 'couponReference' | 'status' | 'rewardName' | '_createdDate' | '_updatedDate', value: any) => LoyaltyCouponsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      ne: (propertyName: 'accountId' | 'memberId' | 'transactionId' | 'couponReference' | 'status' | 'rewardName' | '_createdDate' | '_updatedDate', value: any) => LoyaltyCouponsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => LoyaltyCouponsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => LoyaltyCouponsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => LoyaltyCouponsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => LoyaltyCouponsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       */
      startsWith: (propertyName: 'accountId' | 'memberId' | 'transactionId' | 'rewardName', value: string) => LoyaltyCouponsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       */
      hasSome: (propertyName: 'accountId' | 'memberId' | 'transactionId' | 'couponReference' | 'status' | 'rewardName' | '_createdDate' | '_updatedDate', value: any[]) => LoyaltyCouponsQueryBuilder;
      in: (propertyName: 'accountId' | 'memberId' | 'transactionId' | 'couponReference' | 'status' | 'rewardName' | '_createdDate' | '_updatedDate', value: any) => LoyaltyCouponsQueryBuilder;
      exists: (propertyName: 'accountId' | 'memberId' | 'transactionId' | 'couponReference' | 'status' | 'rewardName' | '_createdDate' | '_updatedDate', value: boolean) => LoyaltyCouponsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
      ascending: (...propertyNames: Array<'accountId' | 'memberId' | 'transactionId' | 'couponReference' | 'status' | 'rewardName' | '_createdDate' | '_updatedDate'>) => LoyaltyCouponsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
      descending: (...propertyNames: Array<'accountId' | 'memberId' | 'transactionId' | 'couponReference' | 'status' | 'rewardName' | '_createdDate' | '_updatedDate'>) => LoyaltyCouponsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object. */
      limit: (limit: number) => LoyaltyCouponsQueryBuilder;
      /** @param cursor - A pointer to specific record */
      skipTo: (cursor: string) => LoyaltyCouponsQueryBuilder;
      find: () => Promise<LoyaltyCouponsQueryResult>;
  }
  /**
   * Deletes a loyalty coupon.
   *
   * The deletion of a loyalty coupon does not impact the functionality of the corresponding coupon itself.
   * @param _id - ID of the loyalty coupon to delete.
   * @param revision - Revision number, which increments by 1 each time the loyalty coupon is updated.
   *
   * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty coupon.
   * @public
   * @requiredField _id
   * @requiredField revision
   * @permissionId LOYALTY.MANAGE_COUPONS
   * @adminMethod
   */
  function deleteLoyaltyCoupon(_id: string, revision: string): Promise<void>;
  
  type loyaltyV1Coupon_universal_d_LoyaltyCoupon = LoyaltyCoupon;
  type loyaltyV1Coupon_universal_d_CouponReference = CouponReference;
  type loyaltyV1Coupon_universal_d_Specification = Specification;
  type loyaltyV1Coupon_universal_d_SpecificationTypeDetailsOneOf = SpecificationTypeDetailsOneOf;
  type loyaltyV1Coupon_universal_d_SpecificationScopeOrMinSubtotalOneOf = SpecificationScopeOrMinSubtotalOneOf;
  type loyaltyV1Coupon_universal_d_BuyXGetY = BuyXGetY;
  type loyaltyV1Coupon_universal_d_Scope = Scope;
  type loyaltyV1Coupon_universal_d_RedeemPointsForCouponRequest = RedeemPointsForCouponRequest;
  type loyaltyV1Coupon_universal_d_RedeemPointsForCouponResponse = RedeemPointsForCouponResponse;
  type loyaltyV1Coupon_universal_d_RedeemCurrentMemberPointsForCouponRequest = RedeemCurrentMemberPointsForCouponRequest;
  type loyaltyV1Coupon_universal_d_RedeemCurrentMemberPointsForCouponResponse = RedeemCurrentMemberPointsForCouponResponse;
  type loyaltyV1Coupon_universal_d_RedeemMemberPointsForDiscountAmountCouponRequest = RedeemMemberPointsForDiscountAmountCouponRequest;
  type loyaltyV1Coupon_universal_d_RedeemMemberPointsForDiscountAmountCouponResponse = RedeemMemberPointsForDiscountAmountCouponResponse;
  type loyaltyV1Coupon_universal_d_GetLoyaltyCouponRequest = GetLoyaltyCouponRequest;
  type loyaltyV1Coupon_universal_d_GetLoyaltyCouponResponse = GetLoyaltyCouponResponse;
  type loyaltyV1Coupon_universal_d_BulkGetLoyaltyCouponRequest = BulkGetLoyaltyCouponRequest;
  type loyaltyV1Coupon_universal_d_BulkGetLoyaltyCouponResponse = BulkGetLoyaltyCouponResponse;
  type loyaltyV1Coupon_universal_d_CouponsInSite = CouponsInSite;
  type loyaltyV1Coupon_universal_d_GetCurrentMemberCouponsRequest = GetCurrentMemberCouponsRequest;
  type loyaltyV1Coupon_universal_d_GetCurrentMemberCouponsResponse = GetCurrentMemberCouponsResponse;
  type loyaltyV1Coupon_universal_d_QueryLoyaltyCouponRequest = QueryLoyaltyCouponRequest;
  type loyaltyV1Coupon_universal_d_QueryV2 = QueryV2;
  type loyaltyV1Coupon_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
  type loyaltyV1Coupon_universal_d_Paging = Paging;
  type loyaltyV1Coupon_universal_d_QueryLoyaltyCouponResponse = QueryLoyaltyCouponResponse;
  type loyaltyV1Coupon_universal_d_DeleteLoyaltyCouponRequest = DeleteLoyaltyCouponRequest;
  type loyaltyV1Coupon_universal_d_DeleteLoyaltyCouponResponse = DeleteLoyaltyCouponResponse;
  const loyaltyV1Coupon_universal_d_redeemPointsForCoupon: typeof redeemPointsForCoupon;
  type loyaltyV1Coupon_universal_d_RedeemPointsForCouponOptions = RedeemPointsForCouponOptions;
  const loyaltyV1Coupon_universal_d_redeemCurrentMemberPointsForCoupon: typeof redeemCurrentMemberPointsForCoupon;
  const loyaltyV1Coupon_universal_d_redeemMemberPointsForDiscountAmountCoupon: typeof redeemMemberPointsForDiscountAmountCoupon;
  type loyaltyV1Coupon_universal_d_RedeemMemberPointsForDiscountAmountCouponOptions = RedeemMemberPointsForDiscountAmountCouponOptions;
  const loyaltyV1Coupon_universal_d_getLoyaltyCoupon: typeof getLoyaltyCoupon;
  const loyaltyV1Coupon_universal_d_bulkGetLoyaltyCoupon: typeof bulkGetLoyaltyCoupon;
  type loyaltyV1Coupon_universal_d_BulkGetLoyaltyCouponOptions = BulkGetLoyaltyCouponOptions;
  const loyaltyV1Coupon_universal_d_getCurrentMemberCoupons: typeof getCurrentMemberCoupons;
  const loyaltyV1Coupon_universal_d_queryLoyaltyCoupons: typeof queryLoyaltyCoupons;
  type loyaltyV1Coupon_universal_d_LoyaltyCouponsQueryResult = LoyaltyCouponsQueryResult;
  type loyaltyV1Coupon_universal_d_LoyaltyCouponsQueryBuilder = LoyaltyCouponsQueryBuilder;
  const loyaltyV1Coupon_universal_d_deleteLoyaltyCoupon: typeof deleteLoyaltyCoupon;
  namespace loyaltyV1Coupon_universal_d {
    export {
      loyaltyV1Coupon_universal_d_LoyaltyCoupon as LoyaltyCoupon,
      loyaltyV1Coupon_universal_d_CouponReference as CouponReference,
      loyaltyV1Coupon_universal_d_Specification as Specification,
      loyaltyV1Coupon_universal_d_SpecificationTypeDetailsOneOf as SpecificationTypeDetailsOneOf,
      loyaltyV1Coupon_universal_d_SpecificationScopeOrMinSubtotalOneOf as SpecificationScopeOrMinSubtotalOneOf,
      Type$2 as Type,
      loyaltyV1Coupon_universal_d_BuyXGetY as BuyXGetY,
      loyaltyV1Coupon_universal_d_Scope as Scope,
      Status$3 as Status,
      loyaltyV1Coupon_universal_d_RedeemPointsForCouponRequest as RedeemPointsForCouponRequest,
      loyaltyV1Coupon_universal_d_RedeemPointsForCouponResponse as RedeemPointsForCouponResponse,
      loyaltyV1Coupon_universal_d_RedeemCurrentMemberPointsForCouponRequest as RedeemCurrentMemberPointsForCouponRequest,
      loyaltyV1Coupon_universal_d_RedeemCurrentMemberPointsForCouponResponse as RedeemCurrentMemberPointsForCouponResponse,
      loyaltyV1Coupon_universal_d_RedeemMemberPointsForDiscountAmountCouponRequest as RedeemMemberPointsForDiscountAmountCouponRequest,
      loyaltyV1Coupon_universal_d_RedeemMemberPointsForDiscountAmountCouponResponse as RedeemMemberPointsForDiscountAmountCouponResponse,
      loyaltyV1Coupon_universal_d_GetLoyaltyCouponRequest as GetLoyaltyCouponRequest,
      loyaltyV1Coupon_universal_d_GetLoyaltyCouponResponse as GetLoyaltyCouponResponse,
      loyaltyV1Coupon_universal_d_BulkGetLoyaltyCouponRequest as BulkGetLoyaltyCouponRequest,
      CursorQuery$1 as CursorQuery,
      CursorQueryPagingMethodOneOf$1 as CursorQueryPagingMethodOneOf,
      Sorting$1 as Sorting,
      SortOrder$1 as SortOrder,
      CursorPaging$2 as CursorPaging,
      loyaltyV1Coupon_universal_d_BulkGetLoyaltyCouponResponse as BulkGetLoyaltyCouponResponse,
      loyaltyV1Coupon_universal_d_CouponsInSite as CouponsInSite,
      loyaltyV1Coupon_universal_d_GetCurrentMemberCouponsRequest as GetCurrentMemberCouponsRequest,
      loyaltyV1Coupon_universal_d_GetCurrentMemberCouponsResponse as GetCurrentMemberCouponsResponse,
      loyaltyV1Coupon_universal_d_QueryLoyaltyCouponRequest as QueryLoyaltyCouponRequest,
      loyaltyV1Coupon_universal_d_QueryV2 as QueryV2,
      loyaltyV1Coupon_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf,
      loyaltyV1Coupon_universal_d_Paging as Paging,
      loyaltyV1Coupon_universal_d_QueryLoyaltyCouponResponse as QueryLoyaltyCouponResponse,
      PagingMetadataV2$2 as PagingMetadataV2,
      Cursors$2 as Cursors,
      loyaltyV1Coupon_universal_d_DeleteLoyaltyCouponRequest as DeleteLoyaltyCouponRequest,
      loyaltyV1Coupon_universal_d_DeleteLoyaltyCouponResponse as DeleteLoyaltyCouponResponse,
      DomainEvent$4 as DomainEvent,
      DomainEventBodyOneOf$4 as DomainEventBodyOneOf,
      EntityCreatedEvent$4 as EntityCreatedEvent,
      RestoreInfo$4 as RestoreInfo,
      EntityUpdatedEvent$4 as EntityUpdatedEvent,
      EntityDeletedEvent$4 as EntityDeletedEvent,
      ActionEvent$4 as ActionEvent,
      Empty$4 as Empty,
      MessageEnvelope$4 as MessageEnvelope,
      IdentificationData$4 as IdentificationData,
      IdentificationDataIdOneOf$4 as IdentificationDataIdOneOf,
      WebhookIdentityType$4 as WebhookIdentityType,
      loyaltyV1Coupon_universal_d_redeemPointsForCoupon as redeemPointsForCoupon,
      loyaltyV1Coupon_universal_d_RedeemPointsForCouponOptions as RedeemPointsForCouponOptions,
      loyaltyV1Coupon_universal_d_redeemCurrentMemberPointsForCoupon as redeemCurrentMemberPointsForCoupon,
      loyaltyV1Coupon_universal_d_redeemMemberPointsForDiscountAmountCoupon as redeemMemberPointsForDiscountAmountCoupon,
      loyaltyV1Coupon_universal_d_RedeemMemberPointsForDiscountAmountCouponOptions as RedeemMemberPointsForDiscountAmountCouponOptions,
      loyaltyV1Coupon_universal_d_getLoyaltyCoupon as getLoyaltyCoupon,
      loyaltyV1Coupon_universal_d_bulkGetLoyaltyCoupon as bulkGetLoyaltyCoupon,
      loyaltyV1Coupon_universal_d_BulkGetLoyaltyCouponOptions as BulkGetLoyaltyCouponOptions,
      loyaltyV1Coupon_universal_d_getCurrentMemberCoupons as getCurrentMemberCoupons,
      loyaltyV1Coupon_universal_d_queryLoyaltyCoupons as queryLoyaltyCoupons,
      loyaltyV1Coupon_universal_d_LoyaltyCouponsQueryResult as LoyaltyCouponsQueryResult,
      loyaltyV1Coupon_universal_d_LoyaltyCouponsQueryBuilder as LoyaltyCouponsQueryBuilder,
      loyaltyV1Coupon_universal_d_deleteLoyaltyCoupon as deleteLoyaltyCoupon,
    };
  }
  
  /**
   * A loyalty earning rule defines how customers earn points in a loyalty program.
   * You can create rules for different activities, such as making purchases.
   */
  interface LoyaltyEarningRule extends LoyaltyEarningRuleTypeOneOf {
      /** Fixed amount of points awarded for each qualifying activity. */
      fixedAmount?: FixedAmount;
      /** Points awarded based on a conversion rate formula: `(amount spent) / (money_amount * points)`. */
      conversionRate?: ConversionRate;
      /**
       * Loyalty earning rule ID.
       * @readonly
       */
      _id?: string | null;
      /** ID of the app managing the earning rule. Can be a loyalty app ID or a Wix automations app ID. */
      sourceAppId?: string;
      /** ID of the app that triggers point assignment. Examples: Wix Stores, Wix Bookings, Wix Events. */
      triggerAppId?: string;
      /** Type of activity that triggers point assignment. For example, `wix-restaurants/orderSubmitted` or `birthday`. */
      triggerActivityType?: string;
      /** Name of the earning rule. */
      title?: string;
      /** Current status of the earning rule. */
      status?: Status$2;
      /**
       * Revision number, incremented by 1 each time the earning rule is updated.
       * Pass the latest revision when updating to prevent conflicting changes.
       */
      revision?: string | null;
      /**
       * Date and time the earning rule was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the earning rule was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Additional metadata about the earning rule.
       * @readonly
       */
      metadata?: Metadata;
  }
  /** @oneof */
  interface LoyaltyEarningRuleTypeOneOf {
      /** Fixed amount of points awarded for each qualifying activity. */
      fixedAmount?: FixedAmount;
      /** Points awarded based on a conversion rate formula: `(amount spent) / (money_amount * points)`. */
      conversionRate?: ConversionRate;
  }
  /** Fixed amount type of earning rule. */
  interface FixedAmount {
      /**
       * Deprecated. Use `configs` instead.
       * @deprecated Deprecated. Use `configs` instead.
       * @replacedBy configs
       * @targetRemovalDate 2022-09-01
       */
      points?: number;
      /** Fixed amount configurations for each tier. */
      configs?: FixedAmountConfig[];
  }
  interface FixedAmountConfig {
      /**
       * Tier ID. If empty, the [base tier](https://dev.wix.com/docs/rest/crm/loyalty-program/tiers/introduction#terminology) is used.
       * @readonly
       */
      tierId?: string | null;
      /** Number of points to award. */
      points?: number;
  }
  /**
   * Conversion rate type of earning rule.
   * Customers earn points based on the amount spent.
   * For example, for every $10 spent, a customer might earn 1 point.
   */
  interface ConversionRate {
      /**
       * Deprecated. Use `configs` instead.
       * @deprecated Deprecated. Use `configs` instead.
       * @replacedBy configs
       * @targetRemovalDate 2022-09-01
       */
      moneyAmount?: number;
      /**
       * Deprecated. Use `configs` instead.
       * @deprecated Deprecated. Use `configs` instead.
       * @replacedBy configs
       * @targetRemovalDate 2022-09-01
       */
      points?: number;
      /**
       * Conversion rate configurations for each tier.
       *
       * Points are awarded proportionally to the amount spent.
       *
       * Formula: `(amount spent) / (money_amount * points)`.
       */
      configs?: ConversionRateConfig[];
      /**
       * Specifies which field in the Wix automations [trigger payload](https://dev.wix.com/docs/rest/business-management/automations/introduction#how-do-automations-work) to use for calculating points in conversion rate rules.
       * For example, if set to "priceSummary.totalAmount", the rule uses the total order amount to calculate loyalty points to be awarded.
       * This field is only applicable for automated earning rules.
       */
      field?: string | null;
  }
  interface ConversionRateConfig {
      /**
       * Tier ID. If empty, the [base tier](https://dev.wix.com/docs/rest/crm/loyalty-program/tiers/introduction) is used.
       * @readonly
       */
      tierId?: string | null;
      /**
       * The amount of money used as a reference for point calculation.
       * Points are awarded proportionally to the amount spent.
       *
       * For example, if set to 10, 1 point is awarded for every 10 units of currency spent (assuming `points` is set to 1).
       *
       * Formula for points is: `(amount spent) / (money_amount * points)`.
       */
      moneyAmount?: number;
      /**
       * Points given for the specified `money_amount`.
       * Works in conjunction with `money_amount` to define the earning rule.
       *
       * For example: If `money_amount` is 20 and `points` is 10:
       * - Spending 10 units of currency earns 5 points
       * - Spending 20 units of currency earns 10 points
       * - Spending 30 units of currency earns 15 points
       */
      points?: number;
  }
  enum Status$2 {
      /** Status is unknown or not specified. */
      UNKNOWN = "UNKNOWN",
      /** Earning rule is active and can assign points. */
      ACTIVE = "ACTIVE",
      /** Earning rule is paused and can't assign points. */
      PAUSED = "PAUSED"
  }
  interface Metadata {
      /** Whether the earning rule can be deleted. */
      canBeDeleted?: boolean;
      /**
       * Information about the type of custom earning rule.
       * @internal
       */
      ruleTypeTag?: LoyaltyEarningRuleTypeTag;
  }
  interface LoyaltyEarningRuleTypeTag {
      /** Type of custom earning rule. */
      ruleType?: LoyaltyEarningRuleTypeTagType;
  }
  enum LoyaltyEarningRuleTypeTagType {
      /** Type is unknown or not specified. */
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      /** Earning rule for a customer's birthday. */
      BIRTHDAY = "BIRTHDAY"
  }
  interface EarningRuleDisabled {
  }
  interface CreateLoyaltyEarningRuleRequest {
      /** Earning rule to create. */
      earningRule: LoyaltyEarningRule;
  }
  interface CreateLoyaltyEarningRuleResponse {
      /** Created earning rule. */
      earningRule?: LoyaltyEarningRule;
  }
  interface BulkCreateLoyaltyEarningRulesRequest {
      /** Earning rules to create. */
      earningRules: LoyaltyEarningRule[];
  }
  interface BulkCreateLoyaltyEarningRulesResponse {
      /** Created earning rules. */
      results?: BulkLoyaltyEarningRuleResult[];
      /** Additional metadata for the created earning rules. */
      bulkActionMetadata?: BulkActionMetadata$2;
  }
  interface BulkLoyaltyEarningRuleResult {
      /** Additional metadata for the created earning rules. */
      itemMetadata?: ItemMetadata$2;
      /** Created earning rule. */
      item?: LoyaltyEarningRule;
  }
  interface ItemMetadata$2 {
      /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError$2;
  }
  interface ApplicationError$2 {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  interface BulkActionMetadata$2 {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface CreateCustomLoyaltyEarningRuleRequest {
      /** Type of the custom earning rule. */
      type: Type$1;
      /** Custom earning rule to create. */
      earningRule?: CustomLoyaltyEarningRule;
  }
  enum Type$1 {
      /** Unknown type. */
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      /** Earning rule for social media. */
      SOCIAL_MEDIA = "SOCIAL_MEDIA",
      /** Earning rule for birthdays. */
      BIRTHDAY = "BIRTHDAY"
  }
  /** Used in CreateCustomLoyaltyEarningRuleRequest */
  interface CustomLoyaltyEarningRule extends CustomLoyaltyEarningRuleTypeOneOf {
      /** Fixed amount of points awarded for each qualifying activity. */
      fixedAmount?: FixedAmount;
      /** Points awarded based on a conversion rate formula: `(amount spent) / (money_amount * points)`. */
      conversionRate?: ConversionRate;
      /** Name of the earning rule. */
      title?: string;
  }
  /** @oneof */
  interface CustomLoyaltyEarningRuleTypeOneOf {
      /** Fixed amount of points awarded for each qualifying activity. */
      fixedAmount?: FixedAmount;
      /** Points awarded based on a conversion rate formula: `(amount spent) / (money_amount * points)`. */
      conversionRate?: ConversionRate;
  }
  interface CreateCustomLoyaltyEarningRuleResponse {
      /** Created earning rule. */
      earningRule?: LoyaltyEarningRule;
  }
  interface GetLoyaltyEarningRuleRequest {
      /** ID of the earning rule to retrieve. */
      _id: string;
  }
  interface GetLoyaltyEarningRuleResponse {
      /** Retrieved earning rule. */
      earningRule?: LoyaltyEarningRule;
  }
  interface GetAutomationEarningRuleRequest {
      /** ID of the earning rule to retrieve. */
      _id: string;
  }
  interface GetAutomationEarningRuleResponse {
      /** Retrieved earning rule. */
      earningRule?: LoyaltyEarningRule;
  }
  interface UpdateLoyaltyEarningRuleRequest {
      /** Earning rule to update. */
      earningRule: LoyaltyEarningRule;
  }
  interface UpdateLoyaltyEarningRuleResponse {
      /** The updated earning rule. */
      earningRule?: LoyaltyEarningRule;
  }
  interface DeleteLoyaltyEarningRuleRequest {
      /** ID of the earning rule to delete. */
      _id: string;
      /**
       * Revision of the earning rule. Incremented by 1 each time the earning rule is updated.
       * Pass the latest revision when updating to prevent conflicting changes.
       */
      revision?: string;
  }
  interface DeleteLoyaltyEarningRuleResponse {
  }
  interface DeleteAutomationEarningRuleRequest {
      /** ID of the earning rule to delete. */
      _id: string;
  }
  interface DeleteAutomationEarningRuleResponse {
  }
  interface ListEarningRulesRequest {
      /** App ID that triggers the point assignment. For example, `9a5d83fd-8570-482e-81ab-cfa88942ee60`. */
      triggerAppId?: string | null;
      /** Type of activity that triggers the point assignment. For example, `restaurants-order-is-pending`. */
      triggerActivityType?: string | null;
  }
  interface ListEarningRulesResponse {
      /** Retrieved earning rules. */
      earningRules?: LoyaltyEarningRule[];
  }
  interface ListEarningRulesInTierRequest {
      /** ID of the tier for which the earning rules will be returned. */
      tierId?: string | null;
      /** Pagination options. */
      paging?: CursorPaging$1;
  }
  interface CursorPaging$1 {
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
  interface ListEarningRulesInTierResponse {
      /** Retrieved earning rules. */
      earningRules?: LoyaltyEarningRule[];
      /** Details on the paged set of results returned. */
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
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface Cursors$1 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface DomainEvent$3 extends DomainEventBodyOneOf$3 {
      createdEvent?: EntityCreatedEvent$3;
      updatedEvent?: EntityUpdatedEvent$3;
      deletedEvent?: EntityDeletedEvent$3;
      actionEvent?: ActionEvent$3;
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
  interface DomainEventBodyOneOf$3 {
      createdEvent?: EntityCreatedEvent$3;
      updatedEvent?: EntityUpdatedEvent$3;
      deletedEvent?: EntityDeletedEvent$3;
      actionEvent?: ActionEvent$3;
  }
  interface EntityCreatedEvent$3 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$3;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$3 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$3 {
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
       * WIP - This property will hold both names and previous values of the updated fields of the entity.
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
  interface EntityDeletedEvent$3 {
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
  interface ActionEvent$3 {
      bodyAsJson?: string;
  }
  interface Empty$3 {
  }
  interface MessageEnvelope$3 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$3;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$3 extends IdentificationDataIdOneOf$3 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$3;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$3 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$3 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Creates a non-automated earning rule.
   *
   * >**Note**: You can only create non-automated earning rules from a supported list.
   * For the supported list of services, see the introduction.
   * @param earningRule - Earning rule to create.
   * @public
   * @requiredField earningRule
   * @requiredField earningRule.sourceAppId
   * @requiredField earningRule.status
   * @requiredField earningRule.title
   * @requiredField earningRule.triggerActivityType
   * @requiredField earningRule.triggerAppId
   * @permissionId LOYALTY.MANAGE_EARNING_RULES
   * @adminMethod
   * @returns Created earning rule.
   */
  function createLoyaltyEarningRule(earningRule: LoyaltyEarningRule): Promise<LoyaltyEarningRule>;
  /**
   * Creates multiple non-automated earning rules.
   *
   * >**Note**: You can only create non-automated earning rules from a supported list.
   * For the supported list of services, see the introduction.
   * @param earningRules - Earning rules to create.
   * @public
   * @requiredField earningRules
   * @requiredField earningRules.sourceAppId
   * @requiredField earningRules.status
   * @requiredField earningRules.title
   * @requiredField earningRules.triggerActivityType
   * @requiredField earningRules.triggerAppId
   * @permissionId LOYALTY.MANAGE_EARNING_RULES
   * @adminMethod
   */
  function bulkCreateLoyaltyEarningRules(earningRules: LoyaltyEarningRule[]): Promise<BulkCreateLoyaltyEarningRulesResponse>;
  /**
   * Creates a custom automated earning rule.
   *
   * Currently, only social media earning rule is supported.
   * @param type - Type of the custom earning rule.
   * @public
   * @documentationMaturity preview
   * @requiredField type
   * @permissionId LOYALTY.MANAGE_EARNING_RULES
   * @adminMethod
   */
  function createCustomLoyaltyEarningRule(type: Type$1, options?: CreateCustomLoyaltyEarningRuleOptions): Promise<CreateCustomLoyaltyEarningRuleResponse>;
  interface CreateCustomLoyaltyEarningRuleOptions {
      /** Custom earning rule to create. */
      earningRule?: CustomLoyaltyEarningRule;
  }
  /**
   * Retrieves a specified non-automated earning rule.
   * @param _id - ID of the earning rule to retrieve.
   * @public
   * @requiredField _id
   * @permissionId LOYALTY.READ_EARNING_RULES
   * @returns Retrieved earning rule.
   */
  function getLoyaltyEarningRule(_id: string): Promise<LoyaltyEarningRule>;
  /**
   * Retrieves an automated earning rule.
   *
   * Currently, only legacy automated earning rules are supported.
   *
   * To get both automated and non-automated earning rules, use [List Earning Rules](https://dev.wix.com/docs/rest/crm/loyalty-program/earning-rules/list-earning-rules).
   * @param _id - ID of the earning rule to retrieve.
   * @public
   * @requiredField _id
   * @permissionId LOYALTY.READ_EARNING_RULES
   * @deprecated
   * @targetRemovalDate 2024-09-01
   */
  function getAutomationEarningRule(_id: string): Promise<GetAutomationEarningRuleResponse>;
  /**
   * Updates an earning rule.
   *
   * Supports partial updates.
   *
   * Revision number, which increments by 1 each time the earning rule is updated. To prevent conflicting changes,
   * the current revision must be passed when updating the earning rule.
   * @param _id - Loyalty earning rule ID.
   * @public
   * @requiredField _id
   * @requiredField earningRule
   * @permissionId LOYALTY.MANAGE_EARNING_RULES
   * @adminMethod
   */
  function updateLoyaltyEarningRule(_id: string | null, earningRule: UpdateLoyaltyEarningRule): Promise<UpdateLoyaltyEarningRuleResponse>;
  interface UpdateLoyaltyEarningRule {
      /** Fixed amount of points awarded for each qualifying activity. */
      fixedAmount?: FixedAmount;
      /** Points awarded based on a conversion rate formula: `(amount spent) / (money_amount * points)`. */
      conversionRate?: ConversionRate;
      /**
       * Loyalty earning rule ID.
       * @readonly
       */
      _id?: string | null;
      /** ID of the app managing the earning rule. Can be a loyalty app ID or a Wix automations app ID. */
      sourceAppId?: string;
      /** ID of the app that triggers point assignment. Examples: Wix Stores, Wix Bookings, Wix Events. */
      triggerAppId?: string;
      /** Type of activity that triggers point assignment. For example, `wix-restaurants/orderSubmitted` or `birthday`. */
      triggerActivityType?: string;
      /** Name of the earning rule. */
      title?: string;
      /** Current status of the earning rule. */
      status?: Status$2;
      /**
       * Revision number, incremented by 1 each time the earning rule is updated.
       * Pass the latest revision when updating to prevent conflicting changes.
       */
      revision?: string | null;
      /**
       * Date and time the earning rule was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the earning rule was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Additional metadata about the earning rule.
       * @readonly
       */
      metadata?: Metadata;
  }
  /**
   * Deletes a non-automated earning rule.
   * @param _id - ID of the earning rule to delete.
   * @public
   * @requiredField _id
   * @permissionId LOYALTY.MANAGE_EARNING_RULES
   * @adminMethod
   */
  function deleteLoyaltyEarningRule(_id: string, options?: DeleteLoyaltyEarningRuleOptions): Promise<void>;
  interface DeleteLoyaltyEarningRuleOptions {
      /**
       * Revision of the earning rule. Incremented by 1 each time the earning rule is updated.
       * Pass the latest revision when updating to prevent conflicting changes.
       */
      revision?: string;
  }
  /**
   * Deletes a custom automated earning rule.
   *
   * > **Note:** Pre-installed automated rules can only be paused, not deleted.
   * @param _id - ID of the earning rule to delete.
   * @public
   * @requiredField _id
   * @permissionId LOYALTY.MANAGE_EARNING_RULES
   * @adminMethod
   */
  function deleteAutomationEarningRule(_id: string): Promise<void>;
  /**
   * Retrieves a list of earning rules.
   *
   * Returns both automated and non-automated earning rules.
   *
   * You can filter the results by `triggerAppId` or `triggerActivityType`.
   * @public
   * @permissionId LOYALTY.READ_EARNING_RULES
   */
  function listEarningRules(options?: ListEarningRulesOptions): Promise<ListEarningRulesResponse>;
  interface ListEarningRulesOptions {
      /** App ID that triggers the point assignment. For example, `9a5d83fd-8570-482e-81ab-cfa88942ee60`. */
      triggerAppId?: string | null;
      /** Type of activity that triggers the point assignment. For example, `restaurants-order-is-pending`. */
      triggerActivityType?: string | null;
  }
  /** @internal
   * @permissionId LOYALTY.READ_EARNING_RULES
   */
  function listEarningRulesInTier(options?: ListEarningRulesInTierOptions): Promise<ListEarningRulesInTierResponse>;
  interface ListEarningRulesInTierOptions {
      /** ID of the tier for which the earning rules will be returned. */
      tierId?: string | null;
      /** Pagination options. */
      paging?: CursorPaging$1;
  }
  
  type loyaltyV1LoyaltyEarningRule_universal_d_LoyaltyEarningRule = LoyaltyEarningRule;
  type loyaltyV1LoyaltyEarningRule_universal_d_LoyaltyEarningRuleTypeOneOf = LoyaltyEarningRuleTypeOneOf;
  type loyaltyV1LoyaltyEarningRule_universal_d_FixedAmount = FixedAmount;
  type loyaltyV1LoyaltyEarningRule_universal_d_FixedAmountConfig = FixedAmountConfig;
  type loyaltyV1LoyaltyEarningRule_universal_d_ConversionRate = ConversionRate;
  type loyaltyV1LoyaltyEarningRule_universal_d_ConversionRateConfig = ConversionRateConfig;
  type loyaltyV1LoyaltyEarningRule_universal_d_Metadata = Metadata;
  type loyaltyV1LoyaltyEarningRule_universal_d_LoyaltyEarningRuleTypeTag = LoyaltyEarningRuleTypeTag;
  type loyaltyV1LoyaltyEarningRule_universal_d_LoyaltyEarningRuleTypeTagType = LoyaltyEarningRuleTypeTagType;
  const loyaltyV1LoyaltyEarningRule_universal_d_LoyaltyEarningRuleTypeTagType: typeof LoyaltyEarningRuleTypeTagType;
  type loyaltyV1LoyaltyEarningRule_universal_d_EarningRuleDisabled = EarningRuleDisabled;
  type loyaltyV1LoyaltyEarningRule_universal_d_CreateLoyaltyEarningRuleRequest = CreateLoyaltyEarningRuleRequest;
  type loyaltyV1LoyaltyEarningRule_universal_d_CreateLoyaltyEarningRuleResponse = CreateLoyaltyEarningRuleResponse;
  type loyaltyV1LoyaltyEarningRule_universal_d_BulkCreateLoyaltyEarningRulesRequest = BulkCreateLoyaltyEarningRulesRequest;
  type loyaltyV1LoyaltyEarningRule_universal_d_BulkCreateLoyaltyEarningRulesResponse = BulkCreateLoyaltyEarningRulesResponse;
  type loyaltyV1LoyaltyEarningRule_universal_d_BulkLoyaltyEarningRuleResult = BulkLoyaltyEarningRuleResult;
  type loyaltyV1LoyaltyEarningRule_universal_d_CreateCustomLoyaltyEarningRuleRequest = CreateCustomLoyaltyEarningRuleRequest;
  type loyaltyV1LoyaltyEarningRule_universal_d_CustomLoyaltyEarningRule = CustomLoyaltyEarningRule;
  type loyaltyV1LoyaltyEarningRule_universal_d_CustomLoyaltyEarningRuleTypeOneOf = CustomLoyaltyEarningRuleTypeOneOf;
  type loyaltyV1LoyaltyEarningRule_universal_d_CreateCustomLoyaltyEarningRuleResponse = CreateCustomLoyaltyEarningRuleResponse;
  type loyaltyV1LoyaltyEarningRule_universal_d_GetLoyaltyEarningRuleRequest = GetLoyaltyEarningRuleRequest;
  type loyaltyV1LoyaltyEarningRule_universal_d_GetLoyaltyEarningRuleResponse = GetLoyaltyEarningRuleResponse;
  type loyaltyV1LoyaltyEarningRule_universal_d_GetAutomationEarningRuleRequest = GetAutomationEarningRuleRequest;
  type loyaltyV1LoyaltyEarningRule_universal_d_GetAutomationEarningRuleResponse = GetAutomationEarningRuleResponse;
  type loyaltyV1LoyaltyEarningRule_universal_d_UpdateLoyaltyEarningRuleRequest = UpdateLoyaltyEarningRuleRequest;
  type loyaltyV1LoyaltyEarningRule_universal_d_UpdateLoyaltyEarningRuleResponse = UpdateLoyaltyEarningRuleResponse;
  type loyaltyV1LoyaltyEarningRule_universal_d_DeleteLoyaltyEarningRuleRequest = DeleteLoyaltyEarningRuleRequest;
  type loyaltyV1LoyaltyEarningRule_universal_d_DeleteLoyaltyEarningRuleResponse = DeleteLoyaltyEarningRuleResponse;
  type loyaltyV1LoyaltyEarningRule_universal_d_DeleteAutomationEarningRuleRequest = DeleteAutomationEarningRuleRequest;
  type loyaltyV1LoyaltyEarningRule_universal_d_DeleteAutomationEarningRuleResponse = DeleteAutomationEarningRuleResponse;
  type loyaltyV1LoyaltyEarningRule_universal_d_ListEarningRulesRequest = ListEarningRulesRequest;
  type loyaltyV1LoyaltyEarningRule_universal_d_ListEarningRulesResponse = ListEarningRulesResponse;
  type loyaltyV1LoyaltyEarningRule_universal_d_ListEarningRulesInTierRequest = ListEarningRulesInTierRequest;
  type loyaltyV1LoyaltyEarningRule_universal_d_ListEarningRulesInTierResponse = ListEarningRulesInTierResponse;
  const loyaltyV1LoyaltyEarningRule_universal_d_createLoyaltyEarningRule: typeof createLoyaltyEarningRule;
  const loyaltyV1LoyaltyEarningRule_universal_d_bulkCreateLoyaltyEarningRules: typeof bulkCreateLoyaltyEarningRules;
  const loyaltyV1LoyaltyEarningRule_universal_d_createCustomLoyaltyEarningRule: typeof createCustomLoyaltyEarningRule;
  type loyaltyV1LoyaltyEarningRule_universal_d_CreateCustomLoyaltyEarningRuleOptions = CreateCustomLoyaltyEarningRuleOptions;
  const loyaltyV1LoyaltyEarningRule_universal_d_getLoyaltyEarningRule: typeof getLoyaltyEarningRule;
  const loyaltyV1LoyaltyEarningRule_universal_d_getAutomationEarningRule: typeof getAutomationEarningRule;
  const loyaltyV1LoyaltyEarningRule_universal_d_updateLoyaltyEarningRule: typeof updateLoyaltyEarningRule;
  type loyaltyV1LoyaltyEarningRule_universal_d_UpdateLoyaltyEarningRule = UpdateLoyaltyEarningRule;
  const loyaltyV1LoyaltyEarningRule_universal_d_deleteLoyaltyEarningRule: typeof deleteLoyaltyEarningRule;
  type loyaltyV1LoyaltyEarningRule_universal_d_DeleteLoyaltyEarningRuleOptions = DeleteLoyaltyEarningRuleOptions;
  const loyaltyV1LoyaltyEarningRule_universal_d_deleteAutomationEarningRule: typeof deleteAutomationEarningRule;
  const loyaltyV1LoyaltyEarningRule_universal_d_listEarningRules: typeof listEarningRules;
  type loyaltyV1LoyaltyEarningRule_universal_d_ListEarningRulesOptions = ListEarningRulesOptions;
  const loyaltyV1LoyaltyEarningRule_universal_d_listEarningRulesInTier: typeof listEarningRulesInTier;
  type loyaltyV1LoyaltyEarningRule_universal_d_ListEarningRulesInTierOptions = ListEarningRulesInTierOptions;
  namespace loyaltyV1LoyaltyEarningRule_universal_d {
    export {
      loyaltyV1LoyaltyEarningRule_universal_d_LoyaltyEarningRule as LoyaltyEarningRule,
      loyaltyV1LoyaltyEarningRule_universal_d_LoyaltyEarningRuleTypeOneOf as LoyaltyEarningRuleTypeOneOf,
      loyaltyV1LoyaltyEarningRule_universal_d_FixedAmount as FixedAmount,
      loyaltyV1LoyaltyEarningRule_universal_d_FixedAmountConfig as FixedAmountConfig,
      loyaltyV1LoyaltyEarningRule_universal_d_ConversionRate as ConversionRate,
      loyaltyV1LoyaltyEarningRule_universal_d_ConversionRateConfig as ConversionRateConfig,
      Status$2 as Status,
      loyaltyV1LoyaltyEarningRule_universal_d_Metadata as Metadata,
      loyaltyV1LoyaltyEarningRule_universal_d_LoyaltyEarningRuleTypeTag as LoyaltyEarningRuleTypeTag,
      loyaltyV1LoyaltyEarningRule_universal_d_LoyaltyEarningRuleTypeTagType as LoyaltyEarningRuleTypeTagType,
      loyaltyV1LoyaltyEarningRule_universal_d_EarningRuleDisabled as EarningRuleDisabled,
      loyaltyV1LoyaltyEarningRule_universal_d_CreateLoyaltyEarningRuleRequest as CreateLoyaltyEarningRuleRequest,
      loyaltyV1LoyaltyEarningRule_universal_d_CreateLoyaltyEarningRuleResponse as CreateLoyaltyEarningRuleResponse,
      loyaltyV1LoyaltyEarningRule_universal_d_BulkCreateLoyaltyEarningRulesRequest as BulkCreateLoyaltyEarningRulesRequest,
      loyaltyV1LoyaltyEarningRule_universal_d_BulkCreateLoyaltyEarningRulesResponse as BulkCreateLoyaltyEarningRulesResponse,
      loyaltyV1LoyaltyEarningRule_universal_d_BulkLoyaltyEarningRuleResult as BulkLoyaltyEarningRuleResult,
      ItemMetadata$2 as ItemMetadata,
      ApplicationError$2 as ApplicationError,
      BulkActionMetadata$2 as BulkActionMetadata,
      loyaltyV1LoyaltyEarningRule_universal_d_CreateCustomLoyaltyEarningRuleRequest as CreateCustomLoyaltyEarningRuleRequest,
      Type$1 as Type,
      loyaltyV1LoyaltyEarningRule_universal_d_CustomLoyaltyEarningRule as CustomLoyaltyEarningRule,
      loyaltyV1LoyaltyEarningRule_universal_d_CustomLoyaltyEarningRuleTypeOneOf as CustomLoyaltyEarningRuleTypeOneOf,
      loyaltyV1LoyaltyEarningRule_universal_d_CreateCustomLoyaltyEarningRuleResponse as CreateCustomLoyaltyEarningRuleResponse,
      loyaltyV1LoyaltyEarningRule_universal_d_GetLoyaltyEarningRuleRequest as GetLoyaltyEarningRuleRequest,
      loyaltyV1LoyaltyEarningRule_universal_d_GetLoyaltyEarningRuleResponse as GetLoyaltyEarningRuleResponse,
      loyaltyV1LoyaltyEarningRule_universal_d_GetAutomationEarningRuleRequest as GetAutomationEarningRuleRequest,
      loyaltyV1LoyaltyEarningRule_universal_d_GetAutomationEarningRuleResponse as GetAutomationEarningRuleResponse,
      loyaltyV1LoyaltyEarningRule_universal_d_UpdateLoyaltyEarningRuleRequest as UpdateLoyaltyEarningRuleRequest,
      loyaltyV1LoyaltyEarningRule_universal_d_UpdateLoyaltyEarningRuleResponse as UpdateLoyaltyEarningRuleResponse,
      loyaltyV1LoyaltyEarningRule_universal_d_DeleteLoyaltyEarningRuleRequest as DeleteLoyaltyEarningRuleRequest,
      loyaltyV1LoyaltyEarningRule_universal_d_DeleteLoyaltyEarningRuleResponse as DeleteLoyaltyEarningRuleResponse,
      loyaltyV1LoyaltyEarningRule_universal_d_DeleteAutomationEarningRuleRequest as DeleteAutomationEarningRuleRequest,
      loyaltyV1LoyaltyEarningRule_universal_d_DeleteAutomationEarningRuleResponse as DeleteAutomationEarningRuleResponse,
      loyaltyV1LoyaltyEarningRule_universal_d_ListEarningRulesRequest as ListEarningRulesRequest,
      loyaltyV1LoyaltyEarningRule_universal_d_ListEarningRulesResponse as ListEarningRulesResponse,
      loyaltyV1LoyaltyEarningRule_universal_d_ListEarningRulesInTierRequest as ListEarningRulesInTierRequest,
      CursorPaging$1 as CursorPaging,
      loyaltyV1LoyaltyEarningRule_universal_d_ListEarningRulesInTierResponse as ListEarningRulesInTierResponse,
      PagingMetadataV2$1 as PagingMetadataV2,
      Cursors$1 as Cursors,
      DomainEvent$3 as DomainEvent,
      DomainEventBodyOneOf$3 as DomainEventBodyOneOf,
      EntityCreatedEvent$3 as EntityCreatedEvent,
      RestoreInfo$3 as RestoreInfo,
      EntityUpdatedEvent$3 as EntityUpdatedEvent,
      EntityDeletedEvent$3 as EntityDeletedEvent,
      ActionEvent$3 as ActionEvent,
      Empty$3 as Empty,
      MessageEnvelope$3 as MessageEnvelope,
      IdentificationData$3 as IdentificationData,
      IdentificationDataIdOneOf$3 as IdentificationDataIdOneOf,
      WebhookIdentityType$3 as WebhookIdentityType,
      loyaltyV1LoyaltyEarningRule_universal_d_createLoyaltyEarningRule as createLoyaltyEarningRule,
      loyaltyV1LoyaltyEarningRule_universal_d_bulkCreateLoyaltyEarningRules as bulkCreateLoyaltyEarningRules,
      loyaltyV1LoyaltyEarningRule_universal_d_createCustomLoyaltyEarningRule as createCustomLoyaltyEarningRule,
      loyaltyV1LoyaltyEarningRule_universal_d_CreateCustomLoyaltyEarningRuleOptions as CreateCustomLoyaltyEarningRuleOptions,
      loyaltyV1LoyaltyEarningRule_universal_d_getLoyaltyEarningRule as getLoyaltyEarningRule,
      loyaltyV1LoyaltyEarningRule_universal_d_getAutomationEarningRule as getAutomationEarningRule,
      loyaltyV1LoyaltyEarningRule_universal_d_updateLoyaltyEarningRule as updateLoyaltyEarningRule,
      loyaltyV1LoyaltyEarningRule_universal_d_UpdateLoyaltyEarningRule as UpdateLoyaltyEarningRule,
      loyaltyV1LoyaltyEarningRule_universal_d_deleteLoyaltyEarningRule as deleteLoyaltyEarningRule,
      loyaltyV1LoyaltyEarningRule_universal_d_DeleteLoyaltyEarningRuleOptions as DeleteLoyaltyEarningRuleOptions,
      loyaltyV1LoyaltyEarningRule_universal_d_deleteAutomationEarningRule as deleteAutomationEarningRule,
      loyaltyV1LoyaltyEarningRule_universal_d_listEarningRules as listEarningRules,
      loyaltyV1LoyaltyEarningRule_universal_d_ListEarningRulesOptions as ListEarningRulesOptions,
      loyaltyV1LoyaltyEarningRule_universal_d_listEarningRulesInTier as listEarningRulesInTier,
      loyaltyV1LoyaltyEarningRule_universal_d_ListEarningRulesInTierOptions as ListEarningRulesInTierOptions,
    };
  }
  
  /**
   * A loyalty program allows sites to maintain customer reward accounts. Site owners can create a
   * loyalty program to increase customer retention. Read more about the loyalty program in
   * [this overview](https://support.wix.com/en/article/wix-loyalty-program-an-overview).
   */
  interface LoyaltyProgram {
      /** Program name. */
      name?: string | null;
      /** Information about the program's collectible entity. */
      pointDefinition?: PointDefinition;
      /**
       * Program status. Customers can only earn or redeem points while the program is `ACTIVE`.
       *
       * Default: `"DRAFT"`
       * @readonly
       */
      status?: ProgramStatus;
      /**
       * Date and time the program was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the program was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Points expiration configuration */
      pointsExpiration?: PointsExpiration;
      /**
       * Information about available premium features
       * @readonly
       */
      premiumFeatures?: PremiumFeatures;
      /**
       * Social media settings
       * @internal
       */
      socialMediaSettings?: SocialMediaSettings;
  }
  interface PointDefinition {
      /**
       * Display name for the program's collectible unit.
       *
       * It's recommended to use a plural, for example `Stars`.
       *
       * In contrast to a custom name, the default `"Points"` name is translated and adjusted to singular based on circumstances.
       *
       * Default: `Points`.
       *
       * Max: `20` characters.
       */
      customName?: string | null;
      /** Image URL. See [Image]($w/image/introduction) for more information on URL formats for images. */
      icon?: string;
  }
  interface FocalPoint$1 {
      /** X-coordinate of the focal point. */
      x?: number;
      /** Y-coordinate of the focal point. */
      y?: number;
      /** crop by height */
      height?: number | null;
      /** crop by width */
      width?: number | null;
  }
  enum ProgramStatus {
      /** Unknown program status. */
      UNKNOWN = "UNKNOWN",
      /** Program was created but is not enabled yet. */
      DRAFT = "DRAFT",
      /** Program is active. */
      ACTIVE = "ACTIVE",
      /** Program was manually disabled by the user. This action can be reverted, meaning the user can set it to be active again. */
      PAUSED = "PAUSED"
  }
  interface PointsExpiration {
      /**
       * Status of points expiration feature
       * @readonly
       */
      status?: Status$1;
      /** Expire points after set months of inactivity */
      monthsOfInactivity?: number;
      /** Percentage of points expiring */
      expiringPointsPercentage?: number;
  }
  enum Status$1 {
      /** Unknown points expiration status. */
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      /** Points expiration feature is disabled. */
      DISABLED = "DISABLED",
      /** Points expiration feature is enabled. */
      ENABLED = "ENABLED"
  }
  interface PremiumFeatures {
      /**
       * Set to true if user has loyalty program premium feature
       * @readonly
       */
      loyaltyProgram?: boolean;
      /**
       * Set to true if user has tiers premium feature
       * @readonly
       */
      tiers?: boolean;
      /**
       * Set to true if user has points expiration premium feature
       * @readonly
       */
      pointsExpiration?: boolean;
  }
  interface SocialMediaSettings {
      /** List of social media channels */
      channels?: SocialMediaChannel[];
  }
  interface SocialMediaChannel {
      /** Social media channel type */
      type?: Type;
      /** Enable or disable social media channel */
      enabled?: boolean;
      /** Social media channel ID. For example, Instagram username. */
      _id?: string;
      /**
       * Social media channel URL
       * @readonly
       */
      url?: string | null;
  }
  enum Type {
      /** Unknown social media channel type. */
      UNKNOWN_CHANNEL = "UNKNOWN_CHANNEL",
      /** Facebook social media channel. */
      FACEBOOK = "FACEBOOK",
      /** Instagram social media channel. */
      INSTAGRAM = "INSTAGRAM",
      /** LinkedIn social media channel. */
      LINKEDIN = "LINKEDIN",
      /** X social media channel. */
      X = "X",
      /** TikTok social media channel. */
      TIKTOK = "TIKTOK"
  }
  interface GetLoyaltyProgramRequest {
  }
  interface GetLoyaltyProgramResponse {
      /** Retrieved loyalty program. */
      loyaltyProgram?: LoyaltyProgram;
  }
  interface BulkGetLoyaltyProgramRequest {
  }
  interface BulkGetLoyaltyProgramResponse {
      /** Retrieved loyalty programs. */
      programInSites?: ProgramInSite[];
  }
  interface ProgramInSite {
      /** Metasite ID. */
      metaSiteId?: string;
      /** Loyalty program. */
      loyaltyProgram?: LoyaltyProgram;
  }
  interface UpdateLoyaltyProgramRequest {
      /** Loyalty program fields to update. */
      loyaltyProgram: LoyaltyProgram;
  }
  interface UpdateLoyaltyProgramResponse {
      /** Updated loyalty program. */
      loyaltyProgram?: LoyaltyProgram;
  }
  interface PointsExpirationConfigurationChanged {
      /** Loyalty program. */
      loyaltyProgram?: LoyaltyProgram;
      /** Points expiration configuration changes */
      pointsExpirationChanges?: PointsExpirationChanges;
  }
  interface PointsExpirationChanges {
      monthsOfInactivity?: number | null;
      expiringPointsPercentage?: number | null;
  }
  interface ActivateLoyaltyProgramRequest {
  }
  interface ActivateLoyaltyProgramResponse {
      /** Activated loyalty program. */
      loyaltyProgram?: LoyaltyProgram;
  }
  interface LoyaltyProgramActivated {
      /** Activated loyalty program. */
      loyaltyProgram?: LoyaltyProgram;
  }
  interface PauseLoyaltyProgramRequest {
  }
  interface PauseLoyaltyProgramResponse {
      /** Paused loyalty program. */
      loyaltyProgram?: LoyaltyProgram;
  }
  interface GetLoyaltyProgramDescriptionRequest {
      /** List of description fields to retrieve. Supported values: `description`, `updatedDate`. */
      fields?: string[];
  }
  interface GetLoyaltyProgramDescriptionResponse {
      /** Retrieved loyalty program description. */
      description?: string | null;
      /** Date and time of the latest description update. */
      _updatedDate?: Date | null;
  }
  interface UpdateLoyaltyProgramDescriptionRequest {
      /** Loyalty program description to update. */
      description?: string;
  }
  interface UpdateLoyaltyProgramDescriptionResponse {
  }
  interface LoyaltyProgramDescriptionUpdated {
  }
  interface GetLoyaltyProgramPremiumFeaturesRequest {
  }
  interface GetLoyaltyProgramPremiumFeaturesResponse {
      /**
       * Set to true if user has loyalty program premium feature
       * @readonly
       */
      loyaltyProgram?: boolean;
      /**
       * Set to true if user has tiers premium feature
       * @readonly
       */
      tiers?: boolean;
      /**
       * Set to true if user has points expiration premium feature
       * @readonly
       */
      pointsExpiration?: boolean;
  }
  interface EnablePointsExpirationRequest {
  }
  interface EnablePointsExpirationResponse {
      /** Loyalty program with enabled points expiration feature. */
      loyaltyProgram?: LoyaltyProgram;
  }
  interface PointsExpirationEnabled {
      /** Loyalty program. */
      loyaltyProgram?: LoyaltyProgram;
  }
  interface DisablePointsExpirationRequest {
  }
  interface DisablePointsExpirationResponse {
      /** Loyalty program with disabled points expiration feature. */
      loyaltyProgram?: LoyaltyProgram;
  }
  interface PointsExpirationDisabled {
      /** Loyalty program. */
      loyaltyProgram?: LoyaltyProgram;
  }
  interface MetaSiteSpecialEvent$1 extends MetaSiteSpecialEventPayloadOneOf$1 {
      /** Emitted on a meta site creation. */
      siteCreated?: SiteCreated$1;
      /** Emitted on a meta site transfer completion. */
      siteTransferred?: SiteTransferred$1;
      /** Emitted on a meta site deletion. */
      siteDeleted?: SiteDeleted$1;
      /** Emitted on a meta site restoration. */
      siteUndeleted?: SiteUndeleted$1;
      /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
      sitePublished?: SitePublished$1;
      /** Emitted on a meta site unpublish. */
      siteUnpublished?: SiteUnpublished$1;
      /** Emitted when meta site is marked as template. */
      siteMarkedAsTemplate?: SiteMarkedAsTemplate$1;
      /** Emitted when meta site is marked as a WixSite. */
      siteMarkedAsWixSite?: SiteMarkedAsWixSite$1;
      /** Emitted when an application is provisioned (installed). */
      serviceProvisioned?: ServiceProvisioned$1;
      /** Emitted when an application is removed (uninstalled). */
      serviceRemoved?: ServiceRemoved$1;
      /** Emitted when meta site name (URL slug) is changed. */
      siteRenamedPayload?: SiteRenamed$1;
      /** Emitted when meta site was permanently deleted. */
      hardDeleted?: SiteHardDeleted$1;
      /** Emitted on a namespace change. */
      namespaceChanged?: NamespaceChanged$1;
      /** Emitted when Studio is attached. */
      studioAssigned?: StudioAssigned$1;
      /** Emitted when Studio is detached. */
      studioUnassigned?: StudioUnassigned$1;
      /** A meta site id. */
      metaSiteId?: string;
      /** A meta site version. Monotonically increasing. */
      version?: string;
      /** A timestamp of the event. */
      timestamp?: string;
      /**
       * TODO(meta-site): Change validation once validations are disabled for consumers
       * More context: https://wix.slack.com/archives/C0UHEBPFT/p1720957844413149 and https://wix.slack.com/archives/CFWKX325T/p1728892152855659
       */
      assets?: Asset$1[];
  }
  /** @oneof */
  interface MetaSiteSpecialEventPayloadOneOf$1 {
      /** Emitted on a meta site creation. */
      siteCreated?: SiteCreated$1;
      /** Emitted on a meta site transfer completion. */
      siteTransferred?: SiteTransferred$1;
      /** Emitted on a meta site deletion. */
      siteDeleted?: SiteDeleted$1;
      /** Emitted on a meta site restoration. */
      siteUndeleted?: SiteUndeleted$1;
      /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
      sitePublished?: SitePublished$1;
      /** Emitted on a meta site unpublish. */
      siteUnpublished?: SiteUnpublished$1;
      /** Emitted when meta site is marked as template. */
      siteMarkedAsTemplate?: SiteMarkedAsTemplate$1;
      /** Emitted when meta site is marked as a WixSite. */
      siteMarkedAsWixSite?: SiteMarkedAsWixSite$1;
      /** Emitted when an application is provisioned (installed). */
      serviceProvisioned?: ServiceProvisioned$1;
      /** Emitted when an application is removed (uninstalled). */
      serviceRemoved?: ServiceRemoved$1;
      /** Emitted when meta site name (URL slug) is changed. */
      siteRenamedPayload?: SiteRenamed$1;
      /** Emitted when meta site was permanently deleted. */
      hardDeleted?: SiteHardDeleted$1;
      /** Emitted on a namespace change. */
      namespaceChanged?: NamespaceChanged$1;
      /** Emitted when Studio is attached. */
      studioAssigned?: StudioAssigned$1;
      /** Emitted when Studio is detached. */
      studioUnassigned?: StudioUnassigned$1;
  }
  interface Asset$1 {
      /** An application definition id (app_id in dev-center). For legacy reasons may be UUID or a string (from Java Enum). */
      appDefId?: string;
      /** An instance id. For legacy reasons may be UUID or a string. */
      instanceId?: string;
      /** An application state. */
      state?: State$1;
  }
  enum State$1 {
      UNKNOWN = "UNKNOWN",
      ENABLED = "ENABLED",
      DISABLED = "DISABLED",
      PENDING = "PENDING",
      DEMO = "DEMO"
  }
  interface SiteCreated$1 {
      /** A template identifier (empty if not created from a template). */
      originTemplateId?: string;
      /** An account id of the owner. */
      ownerId?: string;
      /** A context in which meta site was created. */
      context?: SiteCreatedContext$1;
      /**
       * A meta site id from which this site was created.
       *
       * In case of a creation from a template it's a template id.
       * In case of a site duplication ("Save As" in dashboard or duplicate in UM) it's an id of a source site.
       */
      originMetaSiteId?: string | null;
      /** A meta site name (URL slug). */
      siteName?: string;
      /** A namespace. */
      namespace?: Namespace$1;
  }
  enum SiteCreatedContext$1 {
      /** A valid option, we don't expose all reasons why site might be created. */
      OTHER = "OTHER",
      /** A meta site was created from template. */
      FROM_TEMPLATE = "FROM_TEMPLATE",
      /** A meta site was created by copying of the transfferred meta site. */
      DUPLICATE_BY_SITE_TRANSFER = "DUPLICATE_BY_SITE_TRANSFER",
      /** A copy of existing meta site. */
      DUPLICATE = "DUPLICATE",
      /** A meta site was created as a transfferred site (copy of the original), old flow, should die soon. */
      OLD_SITE_TRANSFER = "OLD_SITE_TRANSFER",
      /** deprecated A meta site was created for Flash editor. */
      FLASH = "FLASH"
  }
  enum Namespace$1 {
      UNKNOWN_NAMESPACE = "UNKNOWN_NAMESPACE",
      /** Default namespace for UGC sites. MetaSites with this namespace will be shown in a user's site list by default. */
      WIX = "WIX",
      /** ShoutOut stand alone product. These are siteless (no actual Wix site, no HtmlWeb). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      SHOUT_OUT = "SHOUT_OUT",
      /** MetaSites created by the Albums product, they appear as part of the Albums app. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      ALBUMS = "ALBUMS",
      /** Part of the WixStores migration flow, a user tries to migrate and gets this site to view and if the user likes it then stores removes this namespace and deletes the old site with the old stores. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      WIX_STORES_TEST_DRIVE = "WIX_STORES_TEST_DRIVE",
      /** Hotels standalone (siteless). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      HOTELS = "HOTELS",
      /** Clubs siteless MetaSites, a club without a wix website. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      CLUBS = "CLUBS",
      /** A partially created ADI website. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      ONBOARDING_DRAFT = "ONBOARDING_DRAFT",
      /** AppBuilder for AppStudio / shmite (c). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      DEV_SITE = "DEV_SITE",
      /** LogoMaker websites offered to the user after logo purchase. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      LOGOS = "LOGOS",
      /** VideoMaker websites offered to the user after video purchase. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      VIDEO_MAKER = "VIDEO_MAKER",
      /** MetaSites with this namespace will *not* be shown in a user's site list by default. */
      PARTNER_DASHBOARD = "PARTNER_DASHBOARD",
      /** MetaSites with this namespace will *not* be shown in a user's site list by default. */
      DEV_CENTER_COMPANY = "DEV_CENTER_COMPANY",
      /**
       * A draft created by HTML editor on open. Upon "first save" it will be moved to be of WIX domain.
       *
       * Meta site with this namespace will *not* be shown in a user's site list by default.
       */
      HTML_DRAFT = "HTML_DRAFT",
      /**
       * the user-journey for Fitness users who want to start from managing their business instead of designing their website.
       * Will be accessible from Site List and will not have a website app.
       * Once the user attaches a site, the site will become a regular wixsite.
       */
      SITELESS_BUSINESS = "SITELESS_BUSINESS",
      /** Belongs to "strategic products" company. Supports new product in the creator's economy space. */
      CREATOR_ECONOMY = "CREATOR_ECONOMY",
      /** It is to be used in the Business First efforts. */
      DASHBOARD_FIRST = "DASHBOARD_FIRST",
      /** Bookings business flow with no site. */
      ANYWHERE = "ANYWHERE",
      /** Namespace for Headless Backoffice with no editor */
      HEADLESS = "HEADLESS",
      /**
       * Namespace for master site that will exist in parent account that will be referenced by subaccounts
       * The site will be used for account level CSM feature for enterprise
       */
      ACCOUNT_MASTER_CMS = "ACCOUNT_MASTER_CMS",
      /** Rise.ai Siteless account management for Gift Cards and Store Credit. */
      RISE = "RISE",
      /**
       * As part of the branded app new funnel, users now can create a meta site that will be branded app first.
       * There's a blank site behind the scene but it's blank).
       * The Mobile company will be the owner of this namespace.
       */
      BRANDED_FIRST = "BRANDED_FIRST",
      /** Nownia.com Siteless account management for Ai Scheduling Assistant. */
      NOWNIA = "NOWNIA",
      /**
       * UGC Templates are templates that are created by users for personal use and to sale to other users.
       * The Partners company owns this namespace.
       */
      UGC_TEMPLATE = "UGC_TEMPLATE",
      /** Codux Headless Sites */
      CODUX = "CODUX",
      /** Bobb - AI Design Creator. */
      MEDIA_DESIGN_CREATOR = "MEDIA_DESIGN_CREATOR"
  }
  /** Site transferred to another user. */
  interface SiteTransferred$1 {
      /** A previous owner id (user that transfers meta site). */
      oldOwnerId?: string;
      /** A new owner id (user that accepts meta site). */
      newOwnerId?: string;
  }
  /** Soft deletion of the meta site. Could be restored. */
  interface SiteDeleted$1 {
      /** A deletion context. */
      deleteContext?: DeleteContext$1;
  }
  interface DeleteContext$1 {
      /** When the meta site was deleted. */
      dateDeleted?: Date | null;
      /** A status. */
      deleteStatus?: DeleteStatus$1;
      /** A reason (flow). */
      deleteOrigin?: string;
      /** A service that deleted it. */
      initiatorId?: string | null;
  }
  enum DeleteStatus$1 {
      UNKNOWN = "UNKNOWN",
      TRASH = "TRASH",
      DELETED = "DELETED",
      PENDING_PURGE = "PENDING_PURGE"
  }
  /** Restoration of the meta site. */
  interface SiteUndeleted$1 {
  }
  /** First publish of a meta site. Or subsequent publish after unpublish. */
  interface SitePublished$1 {
  }
  interface SiteUnpublished$1 {
      /** A list of URLs previously associated with the meta site. */
      urls?: string[];
  }
  interface SiteMarkedAsTemplate$1 {
  }
  interface SiteMarkedAsWixSite$1 {
  }
  /**
   * Represents a service provisioned a site.
   *
   * Note on `origin_instance_id`:
   * There is no guarantee that you will be able to find a meta site using `origin_instance_id`.
   * This is because of the following scenario:
   *
   * Imagine you have a template where a third-party application (TPA) includes some stub data,
   * such as a product catalog. When you create a site from this template, you inherit this
   * default product catalog. However, if the template's product catalog is modified,
   * your site will retain the catalog as it was at the time of site creation. This ensures that
   * your site remains consistent with what you initially received and does not include any
   * changes made to the original template afterward.
   * To ensure this, the TPA on the template gets a new instance_id.
   */
  interface ServiceProvisioned$1 {
      /** Either UUID or EmbeddedServiceType. */
      appDefId?: string;
      /** Not only UUID. Something here could be something weird. */
      instanceId?: string;
      /** An instance id from which this instance is originated. */
      originInstanceId?: string;
      /** A version. */
      version?: string | null;
      /** The origin meta site id */
      originMetaSiteId?: string | null;
  }
  interface ServiceRemoved$1 {
      /** Either UUID or EmbeddedServiceType. */
      appDefId?: string;
      /** Not only UUID. Something here could be something weird. */
      instanceId?: string;
      /** A version. */
      version?: string | null;
  }
  /** Rename of the site. Meaning, free public url has been changed as well. */
  interface SiteRenamed$1 {
      /** A new meta site name (URL slug). */
      newSiteName?: string;
      /** A previous meta site name (URL slug). */
      oldSiteName?: string;
  }
  /**
   * Hard deletion of the meta site.
   *
   * Could not be restored. Therefore it's desirable to cleanup data.
   */
  interface SiteHardDeleted$1 {
      /** A deletion context. */
      deleteContext?: DeleteContext$1;
  }
  interface NamespaceChanged$1 {
      /** A previous namespace. */
      oldNamespace?: Namespace$1;
      /** A new namespace. */
      newNamespace?: Namespace$1;
  }
  /** Assigned Studio editor */
  interface StudioAssigned$1 {
  }
  /** Unassigned Studio editor */
  interface StudioUnassigned$1 {
  }
  interface Empty$2 {
  }
  interface FeatureEvent extends FeatureEventEventOneOf {
      /**
       * Information about an event that makes a feature eligible to the user.
       * Triggered for example, for new features or when a feature is reassigned
       * to an account or a site.
       */
      enabled?: FeatureEnabled;
      /**
       * Information about an event that disables a feature for the user.
       * Triggered for example, when a feature is unassigned from a site,
       * reassigned to a different site, or the user switched to a different contract.
       */
      disabled?: FeatureDisabled;
      /**
       * Information about an event that updates a feature. An `updated` event
       * is triggered for example by the
       * [Report Quota Usage](https://bo.wix.com/wix-docs/rest/premium/premium-features-manager/report-quota-usage)
       * and [Reset Usage Counter](https://bo.wix.com/wix-docs/rest/premium/premium-features-manager/reset-usage-counter)
       * endpoints.
       */
      updated?: FeatureUpdated;
      /**
       * Information about an event that cancels a feature for the user.
       * Triggered for example, when a feature is canceled, transferred to
       * another account, or the user switched to a different contract.
       */
      cancelled?: FeatureCancelled;
      /**
       * Timestamp of the event in
       * [UTC time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time).
       */
      timestamp?: Date | null;
  }
  /** @oneof */
  interface FeatureEventEventOneOf {
      /**
       * Information about an event that makes a feature eligible to the user.
       * Triggered for example, for new features or when a feature is reassigned
       * to an account or a site.
       */
      enabled?: FeatureEnabled;
      /**
       * Information about an event that disables a feature for the user.
       * Triggered for example, when a feature is unassigned from a site,
       * reassigned to a different site, or the user switched to a different contract.
       */
      disabled?: FeatureDisabled;
      /**
       * Information about an event that updates a feature. An `updated` event
       * is triggered for example by the
       * [Report Quota Usage](https://bo.wix.com/wix-docs/rest/premium/premium-features-manager/report-quota-usage)
       * and [Reset Usage Counter](https://bo.wix.com/wix-docs/rest/premium/premium-features-manager/reset-usage-counter)
       * endpoints.
       */
      updated?: FeatureUpdated;
      /**
       * Information about an event that cancels a feature for the user.
       * Triggered for example, when a feature is canceled, transferred to
       * another account, or the user switched to a different contract.
       */
      cancelled?: FeatureCancelled;
  }
  /** Feature created or enabled after disabled state */
  interface FeatureEnabled extends FeatureEnabledReasonOneOf {
      /** Information about a transfer from another account. */
      transferredFromAnotherAccount?: TransferredFromAnotherAccountReason;
      /** Information about a transfer from another site. */
      reassignedFromSite?: ReassignedFromSiteReason;
      /** Information about a feature that hadn't been assigned to site. */
      assignedFromFloating?: AssignedFromFloatingReason;
      /** Information about the new feature. */
      newFeature?: NewFeatureReason;
      /** Information about the contract switch. */
      contractSwitched?: ContractSwitchedReason;
      /** Information about the manually created features. */
      manualFeatureCreation?: ManualFeatureCreationReason;
      /** Information about a feature that was migrated from legacy. */
      migratedFromLegacy?: MigratedFromLegacyReason;
      /** Enabled feature. */
      feature?: Feature;
      /**
       * Information about a transfer from another account.
       * __Deprecated__. Use `reason.transferred_from_another_account` instead.
       */
      transferredFromAccount?: string | null;
      /**
       * Information about a transfer from another site.
       * __Deprecated__. Use `reason.reassigned_from_site` instead.
       */
      reassignedFromMetasite?: string | null;
  }
  /** @oneof */
  interface FeatureEnabledReasonOneOf {
      /** Information about a transfer from another account. */
      transferredFromAnotherAccount?: TransferredFromAnotherAccountReason;
      /** Information about a transfer from another site. */
      reassignedFromSite?: ReassignedFromSiteReason;
      /** Information about a feature that hadn't been assigned to site. */
      assignedFromFloating?: AssignedFromFloatingReason;
      /** Information about the new feature. */
      newFeature?: NewFeatureReason;
      /** Information about the contract switch. */
      contractSwitched?: ContractSwitchedReason;
      /** Information about the manually created features. */
      manualFeatureCreation?: ManualFeatureCreationReason;
      /** Information about a feature that was migrated from legacy. */
      migratedFromLegacy?: MigratedFromLegacyReason;
  }
  interface Feature extends FeatureQuantityInfoOneOf {
      /**
       * Deprecated. Use `enabled` instead.
       * @deprecated
       */
      booleanFeature?: BooleanFeature;
      /**
       * Deprecated. Use `quotaInfo` instead.
       * @deprecated
       */
      quotaFeature?: QuotaFeature;
      /**
       * ID of the feature. __Note:__ Isn't unique. For example, all features that
       * are available to free Wix accounts or site in some capacity have
       * `{"id": "DEFAULT"}`. Use `uniqueName` as unique identifier for a feature.
       * @readonly
       */
      _id?: string;
      /**
       * Unique name of the feature. Only lower case letters, numbers, and dashes
       * `-` are supported. Used in the endpoints of the
       * [Features Manager API](https://bo.wix.com/wix-docs/rest/premium/premium-features-manager/introduction)
       * to specify the feature. Not visible to customers. We recommend to start
       * the unique name with a prefix describing your organization or Wix company.
       * For example, `bookings` or `crm`.
       *
       * Min: 2 characters
       * Max: 50 characters
       */
      uniqueName?: string;
      /**
       * Information about whether the feature belongs to a Wix account or site.
       * Account features have `context.userId`. Site features have `context.metaSiteId` in case
       * they're assigned to a specific site. Site features that aren't assigned to
       * a specific site have neither ID.
       */
      context?: FeatureContext;
      /**
       * Deprecated.
       * @readonly
       * @deprecated
       */
      createdAt?: Date | null;
      /**
       * Deprecated.
       * @readonly
       * @deprecated
       */
      updatedAt?: Date | null;
      /**
       * Information about how often customers can use the feature during a specific
       * period. Available only for quota features.
       */
      quotaInfo?: QuotaInfo;
      /**
       * Whether the customer is currently allowed to use the feature.
       * `true` means that the customer can use the feature. This means a boolean
       * feature is active or a quota feature has remaining usage.
       * `false` means that the customer can't use the feature.
       * This means a boolean feature isn't active or a quota feature doesn't
       * have remaining usage.
       */
      enabled?: boolean;
      /**
       * ID of the [subscription](https://bo.wix.com/wix-docs/rest/premium/premium-subscriptions-manager/subscription-object)
       * to which the feature instance belongs.
       */
      subscriptionId?: string | null;
      /**
       * Metadata of the feature. Wix Premium uses the metadata object to indicate
       * that customers who purchase a product with the feature also get
       * access to an additional product. For these bundled products `metadata`
       * looks like this: `{"tpa": "{"appDefId": "sample-app-def-id-1234567890", "vendorProductId": "sample-productId"}}"`.
       * But you can use the `metadata` property for other purposes, too.
       */
      metadata?: Record<string, string>;
  }
  /** @oneof */
  interface FeatureQuantityInfoOneOf {
      /**
       * Deprecated. Use `enabled` instead.
       * @deprecated
       */
      booleanFeature?: BooleanFeature;
      /**
       * Deprecated. Use `quotaInfo` instead.
       * @deprecated
       */
      quotaFeature?: QuotaFeature;
  }
  /**
   * Context this feature is currently connected to.
   * Note: Do not confuse with feature scope which is configured in the product catalog
   * and defines in which context the product can be used
   */
  interface FeatureContext {
      /**
       * ID of the Wix account that the feature instance belongs to.
       * Available for both site and account level feature instances.
       */
      userId?: string;
      /**
       * ID of the meta site that the feature instance is assigned to.
       * Only available for site level feature instances that are assigned to a Wix
       * site. Not available for account level and unassigned site level feature
       * instances.
       */
      metaSiteId?: string | null;
  }
  /**
   * A feature that can be either "enabled" or "disabled". The default/freemium setting is always OFF, and the premium setting is always ON (meaning, unlimited usage without tracking).
   * A boolean feature is similar to a quantitive feature with a default limit of 0 and UNLIMITED premium limit (although a bit simplified).
   */
  interface BooleanFeature {
  }
  /** A feature with a periodic usage limitation. The default limit is defined in the Feature Spec, the Premium limits are defined in the respective ProductFeature. */
  interface QuotaFeature {
      /** Default (or Freemium) quota limitation. if left undefined the free feature has unlimited amount. */
      limit?: string | null;
      /** Periodic time-frame to reset the usage counter. You may use NO_PERIOD if counter shouldn't be reset. */
      period?: FeaturePeriod;
      /** Usage measurement units (seconds? MBs? unitless?). Usage reported will be counted in multiples of this basic unit. */
      units?: string | null;
  }
  /** Determines the reset cycle of the feature usage. */
  enum FeaturePeriod {
      NO_PERIOD = "NO_PERIOD",
      MILLISECOND = "MILLISECOND",
      SECOND = "SECOND",
      MINUTE = "MINUTE",
      HOUR = "HOUR",
      DAY = "DAY",
      WEEK = "WEEK",
      MONTH = "MONTH",
      YEAR = "YEAR"
  }
  interface QuotaInfo {
      /**
       * How often the customer is allowed to use the feature during the specified
       * period. `null` means that the customer has unlimited access to the feature.
       */
      limit?: string | null;
      /**
       * Time frame for the usage limitation. `NO_PERIOD` means that `remainingUsage`
       * isn't automatically reset to the feature's `limit` after a specific period.
       * You may still manually call
       * [Reset Usage Counter](https://bo.wix.com/wix-docs/rest/premium/premium-features-manager/reset-usage-counter).
       */
      period?: FeaturePeriod;
      /**
       * How often the customer has used the feature during the current
       * period.
       */
      currentUsage?: string;
      /**
       * How often the customer can still use the feature during the current
       * period. `null` means that the customer has unlimited access to the feature.
       */
      remainingUsage?: string | null;
  }
  /** Subscription transferred from another account, features on the current account were enabled. */
  interface TransferredFromAnotherAccountReason {
      /** Information about a transfer from another account. */
      transferredFromAccount?: string;
  }
  /** Subscription moved from one site to another in the same account, features enabled on the target site */
  interface ReassignedFromSiteReason {
      /** Information about a transfer from another site. */
      reassignedFromMetasite?: string;
  }
  /** Subscription was floating and assigned to site, features enabled on the target site */
  interface AssignedFromFloatingReason {
  }
  /** New subscription created and features created as enabled */
  interface NewFeatureReason {
  }
  /** Subscription was upgraded or downgraded, as a result new features enabled, missing features disabled , quantities are updated */
  interface ContractSwitchedReason {
  }
  /** a call to CreateFeature in features-writer, creates feature that is not attached to subscription */
  interface ManualFeatureCreationReason {
  }
  /** Subscription created due to migration from old premium model */
  interface MigratedFromLegacyReason {
  }
  /** Feature disabled and can be enabled in the future */
  interface FeatureDisabled extends FeatureDisabledReasonOneOf {
      /** Information about a feature that's no longer assigned to a site. */
      unassingedToFloating?: UnAssingedToFloatingReason;
      /**
       * Information about a feature that's been replaced by a feature from a
       * different subscription.
       */
      replacedByAnotherSubscription?: ReplacedByAnotherSubscriptionReason;
      /**
       * Information about a feature that's been reassigned to a different
       * site.
       */
      reassignedToAnotherSite?: ReassignedToAnotherSiteReason;
      /**
       * Disabled feature. Includes information about the feature's new state,
       * possibly its new context.
       */
      feature?: Feature;
      /** ID of the meta site for which the feature has been disabled. */
      metaSiteId?: string | null;
  }
  /** @oneof */
  interface FeatureDisabledReasonOneOf {
      /** Information about a feature that's no longer assigned to a site. */
      unassingedToFloating?: UnAssingedToFloatingReason;
      /**
       * Information about a feature that's been replaced by a feature from a
       * different subscription.
       */
      replacedByAnotherSubscription?: ReplacedByAnotherSubscriptionReason;
      /**
       * Information about a feature that's been reassigned to a different
       * site.
       */
      reassignedToAnotherSite?: ReassignedToAnotherSiteReason;
  }
  /** Subscription was unassigned from the site and moved into floating state */
  interface UnAssingedToFloatingReason {
  }
  /** Another subscription was assigned to the site, causing existing features on this site to be disabled */
  interface ReplacedByAnotherSubscriptionReason {
  }
  /** Subscription was assigned to another site, causing  features on the origin  site to be disabled. */
  interface ReassignedToAnotherSiteReason {
      /** Information about a transfer to the site. */
      reassignedToMetasite?: string;
  }
  /** Feature updated, for example Quota was increased due to upgrade */
  interface FeatureUpdated extends FeatureUpdatedPreviousQuantityInfoOneOf, FeatureUpdatedReasonOneOf {
      /** Information about a feature that doesn't have a usage quota. */
      booleanFeature?: BooleanFeature;
      /** Information about a feature that has a usage quota. */
      quotaFeature?: QuotaFeature;
      /** Information about the contract switch. */
      contractSwitched?: ContractSwitchedReason;
      /**
       * Updated feature. Includes information about the feature's new state and
       * possibly its new context.
       */
      feature?: Feature;
  }
  /** @oneof */
  interface FeatureUpdatedPreviousQuantityInfoOneOf {
      /** Information about a feature that doesn't have a usage quota. */
      booleanFeature?: BooleanFeature;
      /** Information about a feature that has a usage quota. */
      quotaFeature?: QuotaFeature;
  }
  /** @oneof */
  interface FeatureUpdatedReasonOneOf {
      /** Information about the contract switch. */
      contractSwitched?: ContractSwitchedReason;
  }
  /** Feature was permanently cancelled */
  interface FeatureCancelled extends FeatureCancelledReasonOneOf {
      /** Information about a transfer to the account. */
      transferredToAnotherAccount?: TransferredToAnotherAccountReason;
      /** Information about the contract switch. */
      contractSwitched?: ContractSwitchedReason;
      /** Information about the feature cancellation. */
      cancelRequest?: CancelRequestedReason;
      /** Canceled feature. */
      feature?: Feature;
      /**
       * Information about a transfer to the account.
       * __Deprecated__. Use `reason.transferred_to_account` instead.
       */
      transferredToAccount?: string | null;
  }
  /** @oneof */
  interface FeatureCancelledReasonOneOf {
      /** Information about a transfer to the account. */
      transferredToAnotherAccount?: TransferredToAnotherAccountReason;
      /** Information about the contract switch. */
      contractSwitched?: ContractSwitchedReason;
      /** Information about the feature cancellation. */
      cancelRequest?: CancelRequestedReason;
  }
  /** Subscription was transferred to another account, features in the origin account were cancelled */
  interface TransferredToAnotherAccountReason {
      /** Information about a transfer to the account. */
      transferredToAccount?: string;
  }
  /** Cancellation was requested from the subscription manager api, might be a result of billing event, or direct call */
  interface CancelRequestedReason {
  }
  interface DomainEvent$2 extends DomainEventBodyOneOf$2 {
      createdEvent?: EntityCreatedEvent$2;
      updatedEvent?: EntityUpdatedEvent$2;
      deletedEvent?: EntityDeletedEvent$2;
      actionEvent?: ActionEvent$2;
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
  interface DomainEventBodyOneOf$2 {
      createdEvent?: EntityCreatedEvent$2;
      updatedEvent?: EntityUpdatedEvent$2;
      deletedEvent?: EntityDeletedEvent$2;
      actionEvent?: ActionEvent$2;
  }
  interface EntityCreatedEvent$2 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$2;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$2 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$2 {
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
       * WIP - This property will hold both names and previous values of the updated fields of the entity.
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
  interface EntityDeletedEvent$2 {
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
  interface ActionEvent$2 {
      bodyAsJson?: string;
  }
  interface MessageEnvelope$2 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$2;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$2 extends IdentificationDataIdOneOf$2 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$2;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$2 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$2 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Retrieves the site's loyalty program.
   *
   * The `getLoyaltyProgram()` function returns a Promise that resolves to the site's loyalty program.
   * @public
   * @permissionId LOYALTY.READ_PROGRAM
   */
  function getLoyaltyProgram(): Promise<GetLoyaltyProgramResponse>;
  /**
   * Retrieves loyalty programs for all metasites that the caller is a member of.
   *
   * Must be called with user identity.
   * @public
   * @documentationMaturity preview
   * @permissionId LOYALTY.PROGRAM_BULK_READ
   * @adminMethod
   */
  function bulkGetLoyaltyProgram(): Promise<BulkGetLoyaltyProgramResponse>;
  /**
   * Updates the site's loyalty program.
   *
   * The `updateLoyaltyProgram()` function returns a Promise that resolves when the loyalty program is updated.
   *
   * With the `updateLoyaltyProgram()` function you can update the name of the loyalty program and the details of the collectible points unit. To activate the loyalty program use the [`activateLoyaltyProgram()`](wix-loyalty-v2/programs/activateloyaltyprogram) function.
   *
   * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can update a loyalty program. You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.
   * @param loyaltyProgram - Loyalty program fields to update.
   * @public
   * @requiredField loyaltyProgram
   * @permissionId LOYALTY.MANAGE_PROGRAM
   * @adminMethod
   */
  function updateLoyaltyProgram(loyaltyProgram: LoyaltyProgram): Promise<UpdateLoyaltyProgramResponse>;
  /**
   * Activates a loyalty program.
   *
   * The `activateLoyaltyProgram()` function returns a Promise that resolves when the status of the loyalty program is successfully changed to `"ACTIVE"`.
   *
   * Before you begin, a Wix Loyalty Program must first be installed through your [dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Floyalty-accounts/wizard/) or through the [Wix App Market](https://www.wix.com/app-market/loyalty). Initially when a loyalty program is installed, the status is set to `"DRAFT"`. You can change the program's status to `"ACTIVE"` with this function or through your [dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Floyalty-accounts/wizard/). A site's customers can only earn or redeem points while the program status is `"ACTIVE"`.
   *
   * This function updates only the status of a loyalty program, to make other updates to the program, use the [`updateLoyaltyProgram()`](wix-loyalty-v2/programs/updateloyaltyprogram) function.
   *
   * To temporarily pause your loyalty program you must follow three steps:
   * 1. Remove all [`earnPoints()`](wix-loyalty-v2/accounts/earnpoints) functions and switch off all the "Earn Points" and "Rewards" toggles in the [Loyalty Program dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Open%20Loyalty%20Program&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https://www.wix.com/dashboard/{{metaSiteId}}/loyalty-accounts/).
   * 1. Hide the loyalty page from your site.
   * 1. Delete the My Rewards page from the Member pages.
   * See [Pausing Your Loyalty Program](https://support.wix.com/en/article/wix-loyalty-program-pausing-your-loyalty-program) for more information.
   *
   * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can activate a loyalty program. You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.
   * @public
   * @permissionId LOYALTY.MANAGE_PROGRAM
   * @adminMethod
   */
  function activateLoyaltyProgram(): Promise<ActivateLoyaltyProgramResponse>;
  /**
   * Changes the program status to `PAUSED`.
   * @public
   * @permissionId LOYALTY.MANAGE_PROGRAM
   * @adminMethod
   */
  function pauseLoyaltyProgram(): Promise<PauseLoyaltyProgramResponse>;
  /**
   * Retrieves the program description.
   * @internal
   * @documentationMaturity preview
   * @permissionId LOYALTY.READ_PROGRAM
   * @returns The `getLoyaltyProgram()` function returns a Promise that resolves to the site's loyalty program.
   */
  function getLoyaltyProgramDescription(options?: GetLoyaltyProgramDescriptionOptions): Promise<GetLoyaltyProgramDescriptionResponse>;
  interface GetLoyaltyProgramDescriptionOptions {
      /** List of description fields to retrieve. Supported values: `description`, `updatedDate`. */
      fields?: string[];
  }
  /**
   * Updates the program description.
   * @internal
   * @documentationMaturity preview
   * @permissionId LOYALTY.MANAGE_PROGRAM
   * @adminMethod
   */
  function updateLoyaltyProgramDescription(options?: UpdateLoyaltyProgramDescriptionOptions): Promise<void>;
  interface UpdateLoyaltyProgramDescriptionOptions {
      /** Loyalty program description to update. */
      description?: string;
  }
  /**
   * Get information about available premium features
   * @public
   * @documentationMaturity preview
   * @permissionId LOYALTY.READ_PROGRAM
   */
  function getLoyaltyProgramPremiumFeatures(): Promise<GetLoyaltyProgramPremiumFeaturesResponse>;
  /**
   * Updates the `pointsExpiration` status to `ENABLED`.
   * @public
   * @permissionId LOYALTY.MANAGE_PROGRAM
   * @adminMethod
   */
  function enablePointsExpiration(): Promise<EnablePointsExpirationResponse>;
  /**
   * Updates the `pointsExpiration` status to `DISABLED`.
   * @public
   * @permissionId LOYALTY.MANAGE_PROGRAM
   * @adminMethod
   */
  function disablePointsExpiration(): Promise<DisablePointsExpirationResponse>;
  
  type loyaltyV1Program_universal_d_LoyaltyProgram = LoyaltyProgram;
  type loyaltyV1Program_universal_d_PointDefinition = PointDefinition;
  type loyaltyV1Program_universal_d_ProgramStatus = ProgramStatus;
  const loyaltyV1Program_universal_d_ProgramStatus: typeof ProgramStatus;
  type loyaltyV1Program_universal_d_PointsExpiration = PointsExpiration;
  type loyaltyV1Program_universal_d_PremiumFeatures = PremiumFeatures;
  type loyaltyV1Program_universal_d_SocialMediaSettings = SocialMediaSettings;
  type loyaltyV1Program_universal_d_SocialMediaChannel = SocialMediaChannel;
  type loyaltyV1Program_universal_d_Type = Type;
  const loyaltyV1Program_universal_d_Type: typeof Type;
  type loyaltyV1Program_universal_d_GetLoyaltyProgramRequest = GetLoyaltyProgramRequest;
  type loyaltyV1Program_universal_d_GetLoyaltyProgramResponse = GetLoyaltyProgramResponse;
  type loyaltyV1Program_universal_d_BulkGetLoyaltyProgramRequest = BulkGetLoyaltyProgramRequest;
  type loyaltyV1Program_universal_d_BulkGetLoyaltyProgramResponse = BulkGetLoyaltyProgramResponse;
  type loyaltyV1Program_universal_d_ProgramInSite = ProgramInSite;
  type loyaltyV1Program_universal_d_UpdateLoyaltyProgramRequest = UpdateLoyaltyProgramRequest;
  type loyaltyV1Program_universal_d_UpdateLoyaltyProgramResponse = UpdateLoyaltyProgramResponse;
  type loyaltyV1Program_universal_d_PointsExpirationConfigurationChanged = PointsExpirationConfigurationChanged;
  type loyaltyV1Program_universal_d_PointsExpirationChanges = PointsExpirationChanges;
  type loyaltyV1Program_universal_d_ActivateLoyaltyProgramRequest = ActivateLoyaltyProgramRequest;
  type loyaltyV1Program_universal_d_ActivateLoyaltyProgramResponse = ActivateLoyaltyProgramResponse;
  type loyaltyV1Program_universal_d_LoyaltyProgramActivated = LoyaltyProgramActivated;
  type loyaltyV1Program_universal_d_PauseLoyaltyProgramRequest = PauseLoyaltyProgramRequest;
  type loyaltyV1Program_universal_d_PauseLoyaltyProgramResponse = PauseLoyaltyProgramResponse;
  type loyaltyV1Program_universal_d_GetLoyaltyProgramDescriptionRequest = GetLoyaltyProgramDescriptionRequest;
  type loyaltyV1Program_universal_d_GetLoyaltyProgramDescriptionResponse = GetLoyaltyProgramDescriptionResponse;
  type loyaltyV1Program_universal_d_UpdateLoyaltyProgramDescriptionRequest = UpdateLoyaltyProgramDescriptionRequest;
  type loyaltyV1Program_universal_d_UpdateLoyaltyProgramDescriptionResponse = UpdateLoyaltyProgramDescriptionResponse;
  type loyaltyV1Program_universal_d_LoyaltyProgramDescriptionUpdated = LoyaltyProgramDescriptionUpdated;
  type loyaltyV1Program_universal_d_GetLoyaltyProgramPremiumFeaturesRequest = GetLoyaltyProgramPremiumFeaturesRequest;
  type loyaltyV1Program_universal_d_GetLoyaltyProgramPremiumFeaturesResponse = GetLoyaltyProgramPremiumFeaturesResponse;
  type loyaltyV1Program_universal_d_EnablePointsExpirationRequest = EnablePointsExpirationRequest;
  type loyaltyV1Program_universal_d_EnablePointsExpirationResponse = EnablePointsExpirationResponse;
  type loyaltyV1Program_universal_d_PointsExpirationEnabled = PointsExpirationEnabled;
  type loyaltyV1Program_universal_d_DisablePointsExpirationRequest = DisablePointsExpirationRequest;
  type loyaltyV1Program_universal_d_DisablePointsExpirationResponse = DisablePointsExpirationResponse;
  type loyaltyV1Program_universal_d_PointsExpirationDisabled = PointsExpirationDisabled;
  type loyaltyV1Program_universal_d_FeatureEvent = FeatureEvent;
  type loyaltyV1Program_universal_d_FeatureEventEventOneOf = FeatureEventEventOneOf;
  type loyaltyV1Program_universal_d_FeatureEnabled = FeatureEnabled;
  type loyaltyV1Program_universal_d_FeatureEnabledReasonOneOf = FeatureEnabledReasonOneOf;
  type loyaltyV1Program_universal_d_Feature = Feature;
  type loyaltyV1Program_universal_d_FeatureQuantityInfoOneOf = FeatureQuantityInfoOneOf;
  type loyaltyV1Program_universal_d_FeatureContext = FeatureContext;
  type loyaltyV1Program_universal_d_BooleanFeature = BooleanFeature;
  type loyaltyV1Program_universal_d_QuotaFeature = QuotaFeature;
  type loyaltyV1Program_universal_d_FeaturePeriod = FeaturePeriod;
  const loyaltyV1Program_universal_d_FeaturePeriod: typeof FeaturePeriod;
  type loyaltyV1Program_universal_d_QuotaInfo = QuotaInfo;
  type loyaltyV1Program_universal_d_TransferredFromAnotherAccountReason = TransferredFromAnotherAccountReason;
  type loyaltyV1Program_universal_d_ReassignedFromSiteReason = ReassignedFromSiteReason;
  type loyaltyV1Program_universal_d_AssignedFromFloatingReason = AssignedFromFloatingReason;
  type loyaltyV1Program_universal_d_NewFeatureReason = NewFeatureReason;
  type loyaltyV1Program_universal_d_ContractSwitchedReason = ContractSwitchedReason;
  type loyaltyV1Program_universal_d_ManualFeatureCreationReason = ManualFeatureCreationReason;
  type loyaltyV1Program_universal_d_MigratedFromLegacyReason = MigratedFromLegacyReason;
  type loyaltyV1Program_universal_d_FeatureDisabled = FeatureDisabled;
  type loyaltyV1Program_universal_d_FeatureDisabledReasonOneOf = FeatureDisabledReasonOneOf;
  type loyaltyV1Program_universal_d_UnAssingedToFloatingReason = UnAssingedToFloatingReason;
  type loyaltyV1Program_universal_d_ReplacedByAnotherSubscriptionReason = ReplacedByAnotherSubscriptionReason;
  type loyaltyV1Program_universal_d_ReassignedToAnotherSiteReason = ReassignedToAnotherSiteReason;
  type loyaltyV1Program_universal_d_FeatureUpdated = FeatureUpdated;
  type loyaltyV1Program_universal_d_FeatureUpdatedPreviousQuantityInfoOneOf = FeatureUpdatedPreviousQuantityInfoOneOf;
  type loyaltyV1Program_universal_d_FeatureUpdatedReasonOneOf = FeatureUpdatedReasonOneOf;
  type loyaltyV1Program_universal_d_FeatureCancelled = FeatureCancelled;
  type loyaltyV1Program_universal_d_FeatureCancelledReasonOneOf = FeatureCancelledReasonOneOf;
  type loyaltyV1Program_universal_d_TransferredToAnotherAccountReason = TransferredToAnotherAccountReason;
  type loyaltyV1Program_universal_d_CancelRequestedReason = CancelRequestedReason;
  const loyaltyV1Program_universal_d_getLoyaltyProgram: typeof getLoyaltyProgram;
  const loyaltyV1Program_universal_d_bulkGetLoyaltyProgram: typeof bulkGetLoyaltyProgram;
  const loyaltyV1Program_universal_d_updateLoyaltyProgram: typeof updateLoyaltyProgram;
  const loyaltyV1Program_universal_d_activateLoyaltyProgram: typeof activateLoyaltyProgram;
  const loyaltyV1Program_universal_d_pauseLoyaltyProgram: typeof pauseLoyaltyProgram;
  const loyaltyV1Program_universal_d_getLoyaltyProgramDescription: typeof getLoyaltyProgramDescription;
  type loyaltyV1Program_universal_d_GetLoyaltyProgramDescriptionOptions = GetLoyaltyProgramDescriptionOptions;
  const loyaltyV1Program_universal_d_updateLoyaltyProgramDescription: typeof updateLoyaltyProgramDescription;
  type loyaltyV1Program_universal_d_UpdateLoyaltyProgramDescriptionOptions = UpdateLoyaltyProgramDescriptionOptions;
  const loyaltyV1Program_universal_d_getLoyaltyProgramPremiumFeatures: typeof getLoyaltyProgramPremiumFeatures;
  const loyaltyV1Program_universal_d_enablePointsExpiration: typeof enablePointsExpiration;
  const loyaltyV1Program_universal_d_disablePointsExpiration: typeof disablePointsExpiration;
  namespace loyaltyV1Program_universal_d {
    export {
      loyaltyV1Program_universal_d_LoyaltyProgram as LoyaltyProgram,
      loyaltyV1Program_universal_d_PointDefinition as PointDefinition,
      FocalPoint$1 as FocalPoint,
      loyaltyV1Program_universal_d_ProgramStatus as ProgramStatus,
      loyaltyV1Program_universal_d_PointsExpiration as PointsExpiration,
      Status$1 as Status,
      loyaltyV1Program_universal_d_PremiumFeatures as PremiumFeatures,
      loyaltyV1Program_universal_d_SocialMediaSettings as SocialMediaSettings,
      loyaltyV1Program_universal_d_SocialMediaChannel as SocialMediaChannel,
      loyaltyV1Program_universal_d_Type as Type,
      loyaltyV1Program_universal_d_GetLoyaltyProgramRequest as GetLoyaltyProgramRequest,
      loyaltyV1Program_universal_d_GetLoyaltyProgramResponse as GetLoyaltyProgramResponse,
      loyaltyV1Program_universal_d_BulkGetLoyaltyProgramRequest as BulkGetLoyaltyProgramRequest,
      loyaltyV1Program_universal_d_BulkGetLoyaltyProgramResponse as BulkGetLoyaltyProgramResponse,
      loyaltyV1Program_universal_d_ProgramInSite as ProgramInSite,
      loyaltyV1Program_universal_d_UpdateLoyaltyProgramRequest as UpdateLoyaltyProgramRequest,
      loyaltyV1Program_universal_d_UpdateLoyaltyProgramResponse as UpdateLoyaltyProgramResponse,
      loyaltyV1Program_universal_d_PointsExpirationConfigurationChanged as PointsExpirationConfigurationChanged,
      loyaltyV1Program_universal_d_PointsExpirationChanges as PointsExpirationChanges,
      loyaltyV1Program_universal_d_ActivateLoyaltyProgramRequest as ActivateLoyaltyProgramRequest,
      loyaltyV1Program_universal_d_ActivateLoyaltyProgramResponse as ActivateLoyaltyProgramResponse,
      loyaltyV1Program_universal_d_LoyaltyProgramActivated as LoyaltyProgramActivated,
      loyaltyV1Program_universal_d_PauseLoyaltyProgramRequest as PauseLoyaltyProgramRequest,
      loyaltyV1Program_universal_d_PauseLoyaltyProgramResponse as PauseLoyaltyProgramResponse,
      loyaltyV1Program_universal_d_GetLoyaltyProgramDescriptionRequest as GetLoyaltyProgramDescriptionRequest,
      loyaltyV1Program_universal_d_GetLoyaltyProgramDescriptionResponse as GetLoyaltyProgramDescriptionResponse,
      loyaltyV1Program_universal_d_UpdateLoyaltyProgramDescriptionRequest as UpdateLoyaltyProgramDescriptionRequest,
      loyaltyV1Program_universal_d_UpdateLoyaltyProgramDescriptionResponse as UpdateLoyaltyProgramDescriptionResponse,
      loyaltyV1Program_universal_d_LoyaltyProgramDescriptionUpdated as LoyaltyProgramDescriptionUpdated,
      loyaltyV1Program_universal_d_GetLoyaltyProgramPremiumFeaturesRequest as GetLoyaltyProgramPremiumFeaturesRequest,
      loyaltyV1Program_universal_d_GetLoyaltyProgramPremiumFeaturesResponse as GetLoyaltyProgramPremiumFeaturesResponse,
      loyaltyV1Program_universal_d_EnablePointsExpirationRequest as EnablePointsExpirationRequest,
      loyaltyV1Program_universal_d_EnablePointsExpirationResponse as EnablePointsExpirationResponse,
      loyaltyV1Program_universal_d_PointsExpirationEnabled as PointsExpirationEnabled,
      loyaltyV1Program_universal_d_DisablePointsExpirationRequest as DisablePointsExpirationRequest,
      loyaltyV1Program_universal_d_DisablePointsExpirationResponse as DisablePointsExpirationResponse,
      loyaltyV1Program_universal_d_PointsExpirationDisabled as PointsExpirationDisabled,
      MetaSiteSpecialEvent$1 as MetaSiteSpecialEvent,
      MetaSiteSpecialEventPayloadOneOf$1 as MetaSiteSpecialEventPayloadOneOf,
      Asset$1 as Asset,
      State$1 as State,
      SiteCreated$1 as SiteCreated,
      SiteCreatedContext$1 as SiteCreatedContext,
      Namespace$1 as Namespace,
      SiteTransferred$1 as SiteTransferred,
      SiteDeleted$1 as SiteDeleted,
      DeleteContext$1 as DeleteContext,
      DeleteStatus$1 as DeleteStatus,
      SiteUndeleted$1 as SiteUndeleted,
      SitePublished$1 as SitePublished,
      SiteUnpublished$1 as SiteUnpublished,
      SiteMarkedAsTemplate$1 as SiteMarkedAsTemplate,
      SiteMarkedAsWixSite$1 as SiteMarkedAsWixSite,
      ServiceProvisioned$1 as ServiceProvisioned,
      ServiceRemoved$1 as ServiceRemoved,
      SiteRenamed$1 as SiteRenamed,
      SiteHardDeleted$1 as SiteHardDeleted,
      NamespaceChanged$1 as NamespaceChanged,
      StudioAssigned$1 as StudioAssigned,
      StudioUnassigned$1 as StudioUnassigned,
      Empty$2 as Empty,
      loyaltyV1Program_universal_d_FeatureEvent as FeatureEvent,
      loyaltyV1Program_universal_d_FeatureEventEventOneOf as FeatureEventEventOneOf,
      loyaltyV1Program_universal_d_FeatureEnabled as FeatureEnabled,
      loyaltyV1Program_universal_d_FeatureEnabledReasonOneOf as FeatureEnabledReasonOneOf,
      loyaltyV1Program_universal_d_Feature as Feature,
      loyaltyV1Program_universal_d_FeatureQuantityInfoOneOf as FeatureQuantityInfoOneOf,
      loyaltyV1Program_universal_d_FeatureContext as FeatureContext,
      loyaltyV1Program_universal_d_BooleanFeature as BooleanFeature,
      loyaltyV1Program_universal_d_QuotaFeature as QuotaFeature,
      loyaltyV1Program_universal_d_FeaturePeriod as FeaturePeriod,
      loyaltyV1Program_universal_d_QuotaInfo as QuotaInfo,
      loyaltyV1Program_universal_d_TransferredFromAnotherAccountReason as TransferredFromAnotherAccountReason,
      loyaltyV1Program_universal_d_ReassignedFromSiteReason as ReassignedFromSiteReason,
      loyaltyV1Program_universal_d_AssignedFromFloatingReason as AssignedFromFloatingReason,
      loyaltyV1Program_universal_d_NewFeatureReason as NewFeatureReason,
      loyaltyV1Program_universal_d_ContractSwitchedReason as ContractSwitchedReason,
      loyaltyV1Program_universal_d_ManualFeatureCreationReason as ManualFeatureCreationReason,
      loyaltyV1Program_universal_d_MigratedFromLegacyReason as MigratedFromLegacyReason,
      loyaltyV1Program_universal_d_FeatureDisabled as FeatureDisabled,
      loyaltyV1Program_universal_d_FeatureDisabledReasonOneOf as FeatureDisabledReasonOneOf,
      loyaltyV1Program_universal_d_UnAssingedToFloatingReason as UnAssingedToFloatingReason,
      loyaltyV1Program_universal_d_ReplacedByAnotherSubscriptionReason as ReplacedByAnotherSubscriptionReason,
      loyaltyV1Program_universal_d_ReassignedToAnotherSiteReason as ReassignedToAnotherSiteReason,
      loyaltyV1Program_universal_d_FeatureUpdated as FeatureUpdated,
      loyaltyV1Program_universal_d_FeatureUpdatedPreviousQuantityInfoOneOf as FeatureUpdatedPreviousQuantityInfoOneOf,
      loyaltyV1Program_universal_d_FeatureUpdatedReasonOneOf as FeatureUpdatedReasonOneOf,
      loyaltyV1Program_universal_d_FeatureCancelled as FeatureCancelled,
      loyaltyV1Program_universal_d_FeatureCancelledReasonOneOf as FeatureCancelledReasonOneOf,
      loyaltyV1Program_universal_d_TransferredToAnotherAccountReason as TransferredToAnotherAccountReason,
      loyaltyV1Program_universal_d_CancelRequestedReason as CancelRequestedReason,
      DomainEvent$2 as DomainEvent,
      DomainEventBodyOneOf$2 as DomainEventBodyOneOf,
      EntityCreatedEvent$2 as EntityCreatedEvent,
      RestoreInfo$2 as RestoreInfo,
      EntityUpdatedEvent$2 as EntityUpdatedEvent,
      EntityDeletedEvent$2 as EntityDeletedEvent,
      ActionEvent$2 as ActionEvent,
      MessageEnvelope$2 as MessageEnvelope,
      IdentificationData$2 as IdentificationData,
      IdentificationDataIdOneOf$2 as IdentificationDataIdOneOf,
      WebhookIdentityType$2 as WebhookIdentityType,
      loyaltyV1Program_universal_d_getLoyaltyProgram as getLoyaltyProgram,
      loyaltyV1Program_universal_d_bulkGetLoyaltyProgram as bulkGetLoyaltyProgram,
      loyaltyV1Program_universal_d_updateLoyaltyProgram as updateLoyaltyProgram,
      loyaltyV1Program_universal_d_activateLoyaltyProgram as activateLoyaltyProgram,
      loyaltyV1Program_universal_d_pauseLoyaltyProgram as pauseLoyaltyProgram,
      loyaltyV1Program_universal_d_getLoyaltyProgramDescription as getLoyaltyProgramDescription,
      loyaltyV1Program_universal_d_GetLoyaltyProgramDescriptionOptions as GetLoyaltyProgramDescriptionOptions,
      loyaltyV1Program_universal_d_updateLoyaltyProgramDescription as updateLoyaltyProgramDescription,
      loyaltyV1Program_universal_d_UpdateLoyaltyProgramDescriptionOptions as UpdateLoyaltyProgramDescriptionOptions,
      loyaltyV1Program_universal_d_getLoyaltyProgramPremiumFeatures as getLoyaltyProgramPremiumFeatures,
      loyaltyV1Program_universal_d_enablePointsExpiration as enablePointsExpiration,
      loyaltyV1Program_universal_d_disablePointsExpiration as disablePointsExpiration,
    };
  }
  
  /**
   * A loyalty reward is an object a customer can redeem with loyalty points.
   * Redeeming a reward then creates a loyalty coupon that the customer can use.
   */
  interface Reward extends RewardTypeDetailsOneOf {
      /** Discount details. */
      discountAmount?: DiscountAmount;
      /** Coupon details. */
      couponReward?: CouponReward;
      /**
       * Details of a flexible reward implemented in SPI.
       * @internal
       */
      spiDiscountAmount?: SpiDiscountAmount;
      /**
       * Reward ID.
       * @readonly
       */
      _id?: string | null;
      /** Reward name. */
      name?: string;
      /**
       * Amount of points required to receive the reward.
       * @internal
       * @deprecated Amount of points required to receive the reward.
       * @replacedBy type_details
       * @targetRemovalDate 2024-06-01
       */
      requiredPoints?: number;
      /** Whether the reward is active. Default: `FALSE` */
      active?: boolean;
      /** Reward type. */
      type?: RewardType;
      /**
       * Revision number, which increments by 1 each time the loyalty reward is updated.
       *
       * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty reward.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the reward was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the reward was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  /** @oneof */
  interface RewardTypeDetailsOneOf {
      /** Discount details. */
      discountAmount?: DiscountAmount;
      /** Coupon details. */
      couponReward?: CouponReward;
      /**
       * Details of a flexible reward implemented in SPI.
       * @internal
       */
      spiDiscountAmount?: SpiDiscountAmount;
  }
  /** Available reward types. */
  enum RewardType {
      /** Undefined reward type. */
      UNDEFINED = "UNDEFINED",
      /** Discount reward. Special flexible reward type used in checkout. */
      DISCOUNT_AMOUNT = "DISCOUNT_AMOUNT",
      /** Coupon reward. [Learn more about coupons.](https://support.wix.com/en/article/using-coupons-as-loyalty-rewards) */
      COUPON_REWARD = "COUPON_REWARD",
      /** For internal use. */
      SPI_DISCOUNT_AMOUNT = "SPI_DISCOUNT_AMOUNT"
  }
  interface DiscountAmount {
      /**
       * Discount amount. Must be a positive value.
       * @internal
       * @deprecated Discount amount. Must be a positive value.
       * @replacedBy configs_by_tier
       * @targetRemovalDate 2024-06-01
       */
      amount?: string;
      /** Discount details for each tier. */
      configsByTier?: DiscountAmountConfig[];
  }
  interface DiscountAmountConfig {
      /** Discount amount. Must be a positive value. */
      amount?: string;
      /** Tier ID, or empty if config applies to the base tier. */
      tierId?: string | null;
      /** Amount of points required to redeem the reward. */
      costInPoints?: number;
  }
  interface CouponReward extends CouponRewardDiscountTypeOneOf, CouponRewardScopeOrMinSubtotalOneOf {
      /** Discount as a fixed amount. */
      fixedAmount?: FixedAmountDiscount;
      /** Discount as a percentage. */
      percentage?: PercentageDiscount;
      /** Free shipping. */
      freeShipping?: FreeShippingDiscount;
      /** Limit the coupon to carts with a subtotal greater than this number. */
      minimumSubtotal?: number;
      /**
       * Specifies the type of line items this coupon will apply to.
       *
       * For more information, see the Coupons API.
       */
      scope?: CouponScope;
      /** Whether the coupon is limited to one item. */
      limitedToOneItem?: boolean | null;
      /**
       * Whether the coupon applies to subscription products.
       *
       * If set to `true`, the discount will apply to all billing cycles.
       */
      appliesToSubscriptions?: boolean | null;
      /** Reserved for internal use. */
      discountedCycleCount?: number | null;
  }
  /** @oneof */
  interface CouponRewardDiscountTypeOneOf {
      /** Discount as a fixed amount. */
      fixedAmount?: FixedAmountDiscount;
      /** Discount as a percentage. */
      percentage?: PercentageDiscount;
      /** Free shipping. */
      freeShipping?: FreeShippingDiscount;
  }
  /** @oneof */
  interface CouponRewardScopeOrMinSubtotalOneOf {
      /** Limit the coupon to carts with a subtotal greater than this number. */
      minimumSubtotal?: number;
      /**
       * Specifies the type of line items this coupon will apply to.
       *
       * For more information, see the Coupons API.
       */
      scope?: CouponScope;
  }
  interface FixedAmountDiscount {
      /** Discount details for each tier. */
      configsByTier?: FixedAmountDiscountConfig[];
  }
  interface FixedAmountDiscountConfig {
      /** Tier ID, or empty if config applies to the base tier. */
      tierId?: string | null;
      /** Amount of points required to redeem the reward. */
      costInPoints?: number;
      /** Discount amount. */
      amount?: number;
  }
  interface PercentageDiscount {
      /** Discount details for each tier. */
      configsByTier?: PercentageDiscountConfig[];
  }
  interface PercentageDiscountConfig {
      /** Tier ID, or empty if config applies to the base tier. */
      tierId?: string | null;
      /** Amount of points required to redeem the reward. */
      costInPoints?: number;
      /** Percentage discount. */
      percentage?: number;
  }
  interface FreeShippingDiscount {
      /** Discount details for each tier. */
      configsByTier?: FreeShippingDiscountConfig[];
  }
  interface FreeShippingDiscountConfig {
      /** Tier ID, or empty if config applies to the base tier. */
      tierId?: string | null;
      /** Amount of points required to redeem the reward. */
      costInPoints?: number;
  }
  interface CouponScope {
      /**
       * Scope namespace.
       *
       * See the Coupons API for valid namespaces.
       */
      namespace?: string;
      /**
       * Coupon scope's applied group.
       *
       * See the Coupons API for valid groups.
       */
      group?: Group;
  }
  interface Group {
      /**
       * Name of coupon scope's group.
       *
       * See the Coupons API for valid groups.
       */
      name?: string;
      /** Entity ID, if the coupon scope is limited to just one item. */
      entityId?: string | null;
  }
  interface SpiDiscountAmount {
      /** Discount details for each tier. */
      configsByTier?: DiscountAmountConfig[];
      /** Description of the SPI discount amount reward. Taken from user input in the SPI config. */
      description?: string;
  }
  interface RewardDisabled {
  }
  interface CreateRewardRequest {
      /** Reward to create. */
      reward: Reward;
  }
  interface CreateRewardResponse {
      /** Created reward. */
      reward?: Reward;
  }
  interface BulkCreateRewardsRequest {
      /** Rewards to create. */
      rewards: Reward[];
  }
  interface BulkCreateRewardsResponse {
      /** Created rewards. */
      results?: BulkRewardResult[];
      /** Total successes and failures of the bulk create rewards action. */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  interface BulkRewardResult {
      /** Item metadata. */
      itemMetadata?: ItemMetadata$1;
      /** Created reward. */
      item?: Reward;
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
  interface GetRewardRequest {
      /** ID of the reward to retrieve. */
      _id: string;
  }
  interface GetRewardResponse {
      /** Retrieved reward. */
      reward?: Reward;
  }
  interface BulkGetRewardsRequest {
  }
  interface BulkGetRewardsResponse {
      /** Found rewards per site. */
      rewardsInSite?: RewardsInSite[];
  }
  interface RewardsInSite {
      /** Metasite id. */
      metaSiteId?: string;
      /** Rewards. */
      rewards?: Reward[];
  }
  interface QueryRewardsRequest {
      /** Query parameters. */
      query: CursorQuery;
  }
  interface CursorQuery extends CursorQueryPagingMethodOneOf {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
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
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
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
  interface QueryRewardsResponse {
      /** Retrieved loyalty rewards. */
      rewards?: Reward[];
      /** Details on the paged set of results returned. */
      pagingMetadata?: CursorPagingMetadata;
  }
  interface CursorPagingMetadata {
      /** Number of items returned in current page. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors;
      /**
       * Whether there are more pages to retrieve following the current page.
       *
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
      /**
       * Total number of items matching the filter.
       * Available only on the first page of *Search* results, not included in *Query* or *List* results.
       * If the Search results span multiple pages, the value of `total` will exceed the number of items returned on the first page.
       * @internal
       */
      total?: number | null;
  }
  interface Cursors {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface UpdateRewardRequest {
      /** Reward information to update. */
      reward: Reward;
  }
  interface UpdateRewardResponse {
      /** Updated reward. */
      reward?: Reward;
  }
  interface DeleteRewardRequest {
      /** ID of the reward to delete. */
      _id: string;
      /**
       * Revision number, which increments by 1 each time the reward is updated.
       *
       * To prevent conflicting changes, the current `revision` must be passed when deleting the reward.
       */
      revision?: string;
  }
  interface DeleteRewardResponse {
  }
  interface ListRewardsRequest {
      /** Pagination options. */
      cursorPaging?: CursorPaging;
      /**
       * Whether rewards are being listed for "redemption" purposes, i.e. from checkout-exchange.
       * If value is true - existing SPI implementors will be called to fetch Custom Rewards for current user.
       * @internal
       */
      redemptionContext?: boolean | null;
  }
  interface ListRewardsResponse {
      /** Retrieved loyalty rewards. */
      rewards?: Reward[];
      /** Details on the paged set of results returned. */
      pagingMetadata?: PagingMetadataV2;
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
  interface ListRewardsInTierRequest {
      /**
       * Tier id.
       * @readonly
       */
      tierId?: string | null;
      /** Pagination options. */
      cursorPaging?: CursorPaging;
  }
  interface ListRewardsInTierResponse {
      /** Retrieved loyalty rewards. */
      rewards?: Reward[];
      /** Details on the paged set of results returned. */
      pagingMetadata?: PagingMetadataV2;
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
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$1;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
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
  interface EntityDeletedEvent$1 {
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
  interface ActionEvent$1 {
      bodyAsJson?: string;
  }
  interface Empty$1 {
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
  /**
   * Creates a reward that can be redeemed with loyalty points.
   *
   * When a customer redeems a reward, a loyalty coupon is created
   * based on the specifications detailed in either the `discountAmount` or `couponReward` fields. This coupon can
   * then be used by the customer to receive the discount. Note that while the Rewards API uses coupon scopes and specifications,
   * no coupon is actually created until a reward is redeemed with points.
   * See the Coupons API for more information about coupons.
   *
   * A reward's `active` status defaults to `false`. To make the reward available to customers,
   * either set the `active` field to `true` during creation or call [`updateReward()`](#updatereward)
   * to change the status.
   *
   * To customize a reward for each loyalty tier, use the `configsByTier` parameter.
   * This allows you to specify the amount of the earned discount, the cost in loyalty points
   * to redeem the reward, and the tier to which this configuration applies. Each tier requires its own
   * `configsByTier` configuration. To create a reward that is available to loyalty accounts in the base tier,
   * leave the `tierId` field empty. See the Loyalty Tiers API for more information on tiers.
   * @param reward - Reward to create.
   * @public
   * @requiredField reward
   * @requiredField reward.name
   * @permissionId LOYALTY.MANAGE_REWARDS
   * @adminMethod
   * @returns Created reward.
   */
  function createReward(reward: Reward): Promise<Reward>;
  /**
   * Creates multiple rewards.
   * @param rewards - Rewards to create.
   * @public
   * @requiredField rewards
   * @requiredField rewards.name
   * @permissionId LOYALTY.MANAGE_REWARDS
   * @adminMethod
   */
  function bulkCreateRewards(rewards: Reward[]): Promise<BulkCreateRewardsResponse>;
  /**
   * Retrieves a reward.
   * @param _id - ID of the reward to retrieve.
   * @public
   * @requiredField _id
   * @permissionId LOYALTY.READ_REWARDS
   * @returns Retrieved reward.
   */
  function getReward(_id: string): Promise<Reward>;
  /**
   * Retrieves rewards from all metasites that the caller is the member of.
   *
   * Must be called with user identity.
   * @public
   * @documentationMaturity preview
   * @permissionId LOYALTY.REWARD_BULK_READ
   * @adminMethod
   */
  function bulkGetRewards(): Promise<BulkGetRewardsResponse>;
  /**
   * Retrieves a list of rewards, given the provided paging, filtering, and sorting.
   *
   * Query Rewards runs with these defaults, which you can override: `cursorPaging.limit` is `50`.
   *
   * To learn about working with _Query_ endpoints, see [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language),[Sorting and Paging](https://dev.wix.com/api/rest/getting-started/pagination),and [Field Projection](https://dev.wix.com/api/rest/getting-started/field-projection).
   * @param query - Query parameters.
   * @public
   * @requiredField query
   * @permissionId LOYALTY.READ_REWARDS
   */
  function queryRewards(query: CursorQuery): Promise<QueryRewardsResponse>;
  /**
   * Updates a loyalty reward.
   *
   * Use this endpoint to update details of a reward, such as the name, whether or not a reward is active,
   * or the amount of points it costs to redeem. Also use this endpoint to add new tiers that are eligible to redeem a reward.
   *
   * You may not change the `type` of a reward. That is set upon creation and cannot be updated.
   * @param _id - Reward ID.
   * @public
   * @requiredField _id
   * @requiredField reward
   * @requiredField reward.name
   * @requiredField reward.revision
   * @param reward - Reward info to update.
   * @permissionId LOYALTY.MANAGE_REWARDS
   * @adminMethod
   */
  function updateReward(_id: string | null, reward: UpdateReward): Promise<UpdateRewardResponse>;
  interface UpdateReward {
      /** Discount details. */
      discountAmount?: DiscountAmount;
      /** Coupon details. */
      couponReward?: CouponReward;
      /**
       * Details of a flexible reward implemented in SPI.
       * @internal
       */
      spiDiscountAmount?: SpiDiscountAmount;
      /**
       * Reward ID.
       * @readonly
       */
      _id?: string | null;
      /** Reward name. */
      name?: string;
      /**
       * Amount of points required to receive the reward.
       * @internal
       * @deprecated Amount of points required to receive the reward.
       * @replacedBy type_details
       * @targetRemovalDate 2024-06-01
       */
      requiredPoints?: number;
      /** Whether the reward is active. Default: `FALSE` */
      active?: boolean;
      /** Reward type. */
      type?: RewardType;
      /**
       * Revision number, which increments by 1 each time the loyalty reward is updated.
       *
       * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty reward.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the reward was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the reward was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  /**
   * Deletes a reward.
   * @param _id - ID of the reward to delete.
   * @param revision - Revision number, which increments by 1 each time the reward is updated.
   *
   * To prevent conflicting changes, the current `revision` must be passed when deleting the reward.
   * @public
   * @requiredField _id
   * @requiredField revision
   * @permissionId LOYALTY.MANAGE_REWARDS
   * @adminMethod
   */
  function deleteReward(_id: string, revision: string): Promise<void>;
  /**
   * Retrieves a list of rewards.
   *
   * The list includes rewards that are currently nonredeemable due to insufficient points held by any customers.
   * @public
   * @param options - List options.
   * @permissionId LOYALTY.READ_REWARDS
   */
  function listRewards(options?: ListRewardsOptions): Promise<ListRewardsResponse>;
  interface ListRewardsOptions {
      /** Pagination options. */
      cursorPaging?: CursorPaging;
      /**
       * Whether rewards are being listed for "redemption" purposes, i.e. from checkout-exchange.
       * If value is true - existing SPI implementors will be called to fetch Custom Rewards for current user.
       * @internal
       */
      redemptionContext?: boolean | null;
  }
  /**
   * Retrieves a list of rewards in a given tier.
   *
   * Filters out rewards that don't have configuration in a given tier.
   * @internal
   * @documentationMaturity preview
   * @permissionId LOYALTY.READ_REWARDS
   */
  function listRewardsInTier(options?: ListRewardsInTierOptions): Promise<ListRewardsInTierResponse>;
  interface ListRewardsInTierOptions {
      /**
       * Tier id.
       * @readonly
       */
      tierId?: string | null;
      /** Pagination options. */
      cursorPaging?: CursorPaging;
  }
  
  type loyaltyV1Reward_universal_d_Reward = Reward;
  type loyaltyV1Reward_universal_d_RewardTypeDetailsOneOf = RewardTypeDetailsOneOf;
  type loyaltyV1Reward_universal_d_RewardType = RewardType;
  const loyaltyV1Reward_universal_d_RewardType: typeof RewardType;
  type loyaltyV1Reward_universal_d_DiscountAmount = DiscountAmount;
  type loyaltyV1Reward_universal_d_DiscountAmountConfig = DiscountAmountConfig;
  type loyaltyV1Reward_universal_d_CouponReward = CouponReward;
  type loyaltyV1Reward_universal_d_CouponRewardDiscountTypeOneOf = CouponRewardDiscountTypeOneOf;
  type loyaltyV1Reward_universal_d_CouponRewardScopeOrMinSubtotalOneOf = CouponRewardScopeOrMinSubtotalOneOf;
  type loyaltyV1Reward_universal_d_FixedAmountDiscount = FixedAmountDiscount;
  type loyaltyV1Reward_universal_d_FixedAmountDiscountConfig = FixedAmountDiscountConfig;
  type loyaltyV1Reward_universal_d_PercentageDiscount = PercentageDiscount;
  type loyaltyV1Reward_universal_d_PercentageDiscountConfig = PercentageDiscountConfig;
  type loyaltyV1Reward_universal_d_FreeShippingDiscount = FreeShippingDiscount;
  type loyaltyV1Reward_universal_d_FreeShippingDiscountConfig = FreeShippingDiscountConfig;
  type loyaltyV1Reward_universal_d_CouponScope = CouponScope;
  type loyaltyV1Reward_universal_d_Group = Group;
  type loyaltyV1Reward_universal_d_SpiDiscountAmount = SpiDiscountAmount;
  type loyaltyV1Reward_universal_d_RewardDisabled = RewardDisabled;
  type loyaltyV1Reward_universal_d_CreateRewardRequest = CreateRewardRequest;
  type loyaltyV1Reward_universal_d_CreateRewardResponse = CreateRewardResponse;
  type loyaltyV1Reward_universal_d_BulkCreateRewardsRequest = BulkCreateRewardsRequest;
  type loyaltyV1Reward_universal_d_BulkCreateRewardsResponse = BulkCreateRewardsResponse;
  type loyaltyV1Reward_universal_d_BulkRewardResult = BulkRewardResult;
  type loyaltyV1Reward_universal_d_GetRewardRequest = GetRewardRequest;
  type loyaltyV1Reward_universal_d_GetRewardResponse = GetRewardResponse;
  type loyaltyV1Reward_universal_d_BulkGetRewardsRequest = BulkGetRewardsRequest;
  type loyaltyV1Reward_universal_d_BulkGetRewardsResponse = BulkGetRewardsResponse;
  type loyaltyV1Reward_universal_d_RewardsInSite = RewardsInSite;
  type loyaltyV1Reward_universal_d_QueryRewardsRequest = QueryRewardsRequest;
  type loyaltyV1Reward_universal_d_CursorQuery = CursorQuery;
  type loyaltyV1Reward_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type loyaltyV1Reward_universal_d_Sorting = Sorting;
  type loyaltyV1Reward_universal_d_SortOrder = SortOrder;
  const loyaltyV1Reward_universal_d_SortOrder: typeof SortOrder;
  type loyaltyV1Reward_universal_d_CursorPaging = CursorPaging;
  type loyaltyV1Reward_universal_d_QueryRewardsResponse = QueryRewardsResponse;
  type loyaltyV1Reward_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type loyaltyV1Reward_universal_d_Cursors = Cursors;
  type loyaltyV1Reward_universal_d_UpdateRewardRequest = UpdateRewardRequest;
  type loyaltyV1Reward_universal_d_UpdateRewardResponse = UpdateRewardResponse;
  type loyaltyV1Reward_universal_d_DeleteRewardRequest = DeleteRewardRequest;
  type loyaltyV1Reward_universal_d_DeleteRewardResponse = DeleteRewardResponse;
  type loyaltyV1Reward_universal_d_ListRewardsRequest = ListRewardsRequest;
  type loyaltyV1Reward_universal_d_ListRewardsResponse = ListRewardsResponse;
  type loyaltyV1Reward_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type loyaltyV1Reward_universal_d_ListRewardsInTierRequest = ListRewardsInTierRequest;
  type loyaltyV1Reward_universal_d_ListRewardsInTierResponse = ListRewardsInTierResponse;
  const loyaltyV1Reward_universal_d_createReward: typeof createReward;
  const loyaltyV1Reward_universal_d_bulkCreateRewards: typeof bulkCreateRewards;
  const loyaltyV1Reward_universal_d_getReward: typeof getReward;
  const loyaltyV1Reward_universal_d_bulkGetRewards: typeof bulkGetRewards;
  const loyaltyV1Reward_universal_d_queryRewards: typeof queryRewards;
  const loyaltyV1Reward_universal_d_updateReward: typeof updateReward;
  type loyaltyV1Reward_universal_d_UpdateReward = UpdateReward;
  const loyaltyV1Reward_universal_d_deleteReward: typeof deleteReward;
  const loyaltyV1Reward_universal_d_listRewards: typeof listRewards;
  type loyaltyV1Reward_universal_d_ListRewardsOptions = ListRewardsOptions;
  const loyaltyV1Reward_universal_d_listRewardsInTier: typeof listRewardsInTier;
  type loyaltyV1Reward_universal_d_ListRewardsInTierOptions = ListRewardsInTierOptions;
  namespace loyaltyV1Reward_universal_d {
    export {
      loyaltyV1Reward_universal_d_Reward as Reward,
      loyaltyV1Reward_universal_d_RewardTypeDetailsOneOf as RewardTypeDetailsOneOf,
      loyaltyV1Reward_universal_d_RewardType as RewardType,
      loyaltyV1Reward_universal_d_DiscountAmount as DiscountAmount,
      loyaltyV1Reward_universal_d_DiscountAmountConfig as DiscountAmountConfig,
      loyaltyV1Reward_universal_d_CouponReward as CouponReward,
      loyaltyV1Reward_universal_d_CouponRewardDiscountTypeOneOf as CouponRewardDiscountTypeOneOf,
      loyaltyV1Reward_universal_d_CouponRewardScopeOrMinSubtotalOneOf as CouponRewardScopeOrMinSubtotalOneOf,
      loyaltyV1Reward_universal_d_FixedAmountDiscount as FixedAmountDiscount,
      loyaltyV1Reward_universal_d_FixedAmountDiscountConfig as FixedAmountDiscountConfig,
      loyaltyV1Reward_universal_d_PercentageDiscount as PercentageDiscount,
      loyaltyV1Reward_universal_d_PercentageDiscountConfig as PercentageDiscountConfig,
      loyaltyV1Reward_universal_d_FreeShippingDiscount as FreeShippingDiscount,
      loyaltyV1Reward_universal_d_FreeShippingDiscountConfig as FreeShippingDiscountConfig,
      loyaltyV1Reward_universal_d_CouponScope as CouponScope,
      loyaltyV1Reward_universal_d_Group as Group,
      loyaltyV1Reward_universal_d_SpiDiscountAmount as SpiDiscountAmount,
      loyaltyV1Reward_universal_d_RewardDisabled as RewardDisabled,
      loyaltyV1Reward_universal_d_CreateRewardRequest as CreateRewardRequest,
      loyaltyV1Reward_universal_d_CreateRewardResponse as CreateRewardResponse,
      loyaltyV1Reward_universal_d_BulkCreateRewardsRequest as BulkCreateRewardsRequest,
      loyaltyV1Reward_universal_d_BulkCreateRewardsResponse as BulkCreateRewardsResponse,
      loyaltyV1Reward_universal_d_BulkRewardResult as BulkRewardResult,
      ItemMetadata$1 as ItemMetadata,
      ApplicationError$1 as ApplicationError,
      BulkActionMetadata$1 as BulkActionMetadata,
      loyaltyV1Reward_universal_d_GetRewardRequest as GetRewardRequest,
      loyaltyV1Reward_universal_d_GetRewardResponse as GetRewardResponse,
      loyaltyV1Reward_universal_d_BulkGetRewardsRequest as BulkGetRewardsRequest,
      loyaltyV1Reward_universal_d_BulkGetRewardsResponse as BulkGetRewardsResponse,
      loyaltyV1Reward_universal_d_RewardsInSite as RewardsInSite,
      loyaltyV1Reward_universal_d_QueryRewardsRequest as QueryRewardsRequest,
      loyaltyV1Reward_universal_d_CursorQuery as CursorQuery,
      loyaltyV1Reward_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      loyaltyV1Reward_universal_d_Sorting as Sorting,
      loyaltyV1Reward_universal_d_SortOrder as SortOrder,
      loyaltyV1Reward_universal_d_CursorPaging as CursorPaging,
      loyaltyV1Reward_universal_d_QueryRewardsResponse as QueryRewardsResponse,
      loyaltyV1Reward_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      loyaltyV1Reward_universal_d_Cursors as Cursors,
      loyaltyV1Reward_universal_d_UpdateRewardRequest as UpdateRewardRequest,
      loyaltyV1Reward_universal_d_UpdateRewardResponse as UpdateRewardResponse,
      loyaltyV1Reward_universal_d_DeleteRewardRequest as DeleteRewardRequest,
      loyaltyV1Reward_universal_d_DeleteRewardResponse as DeleteRewardResponse,
      loyaltyV1Reward_universal_d_ListRewardsRequest as ListRewardsRequest,
      loyaltyV1Reward_universal_d_ListRewardsResponse as ListRewardsResponse,
      loyaltyV1Reward_universal_d_PagingMetadataV2 as PagingMetadataV2,
      loyaltyV1Reward_universal_d_ListRewardsInTierRequest as ListRewardsInTierRequest,
      loyaltyV1Reward_universal_d_ListRewardsInTierResponse as ListRewardsInTierResponse,
      DomainEvent$1 as DomainEvent,
      DomainEventBodyOneOf$1 as DomainEventBodyOneOf,
      EntityCreatedEvent$1 as EntityCreatedEvent,
      RestoreInfo$1 as RestoreInfo,
      EntityUpdatedEvent$1 as EntityUpdatedEvent,
      EntityDeletedEvent$1 as EntityDeletedEvent,
      ActionEvent$1 as ActionEvent,
      Empty$1 as Empty,
      MessageEnvelope$1 as MessageEnvelope,
      IdentificationData$1 as IdentificationData,
      IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf,
      WebhookIdentityType$1 as WebhookIdentityType,
      loyaltyV1Reward_universal_d_createReward as createReward,
      loyaltyV1Reward_universal_d_bulkCreateRewards as bulkCreateRewards,
      loyaltyV1Reward_universal_d_getReward as getReward,
      loyaltyV1Reward_universal_d_bulkGetRewards as bulkGetRewards,
      loyaltyV1Reward_universal_d_queryRewards as queryRewards,
      loyaltyV1Reward_universal_d_updateReward as updateReward,
      loyaltyV1Reward_universal_d_UpdateReward as UpdateReward,
      loyaltyV1Reward_universal_d_deleteReward as deleteReward,
      loyaltyV1Reward_universal_d_listRewards as listRewards,
      loyaltyV1Reward_universal_d_ListRewardsOptions as ListRewardsOptions,
      loyaltyV1Reward_universal_d_listRewardsInTier as listRewardsInTier,
      loyaltyV1Reward_universal_d_ListRewardsInTierOptions as ListRewardsInTierOptions,
    };
  }
  
  /**
   * A tier is a loyalty level that customers are assigned to based on the amount of points they earn.
   * Read more about loyalty tiers [here](https://support.wix.com/en/article/about-tiers).
   */
  interface Tier {
      /**
       * Tier ID.
       * @readonly
       */
      _id?: string | null;
      /** Information about the tier. */
      tierDefinition?: TierDefinition;
      /** The amount of points required to be in this tier. */
      requiredPoints?: number;
      /**
       * Revision number, which increments by 1 each time the loyalty tier is updated.
       *
       * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty tier.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the tier was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the tier was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  /** Information about the tier. */
  interface TierDefinition {
      /** Details about the tier icon. */
      icon?: string;
      /** Tier name. */
      name?: string | null;
      /** Tier description. */
      description?: string | null;
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
  interface TiersProgramSettingsChanged {
      /** Settings for the tiers program. */
      programSettings?: TiersProgramSettings;
  }
  /** There can be single TiersSettings per site and it's global (i.e. applies to all program's tiers) */
  interface TiersProgramSettings extends TiersProgramSettingsPeriodOneOf {
      /**
       * *Required.**
       * Period of time used to calculate loyalty points for tier assignment.
       *
       * The loyalty points accumulated during this period determine if the account meets a tier's required point threshold.
       */
      rollingWindow?: RollingWindow;
      /** Tiers program status. */
      status?: Status;
      /**
       * Revision number, which increments by 1 each time the loyalty tiers settings are updated.
       *
       * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty tiers settings.
       */
      revision?: string | null;
      /**
       * Date and time the loyalty tiers program was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the loyalty tiers program was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Information about the base loyalty tier.
       *
       * The base tier is the default tier for any account that is unassigned for not meeting
       * the required points threshold of any other tier.
       */
      baseTierDefinition?: TierDefinition;
  }
  /** @oneof */
  interface TiersProgramSettingsPeriodOneOf {
      /**
       * *Required.**
       * Period of time used to calculate loyalty points for tier assignment.
       *
       * The loyalty points accumulated during this period determine if the account meets a tier's required point threshold.
       */
      rollingWindow?: RollingWindow;
  }
  enum Status {
      /** Unknown status. */
      UNKNOWN = "UNKNOWN",
      /** Tiers are disabled. */
      DISABLED = "DISABLED",
      /** Tiers are enabled but not yet active. */
      DRAFT = "DRAFT",
      /** Tiers are active. */
      ACTIVE = "ACTIVE",
      /** Tiers are paused. */
      PAUSED = "PAUSED"
  }
  /**
   * *Required.** Period of time used to calculate loyalty points for tier assignment.
   *
   * The loyalty points accumulated during this period determine if the account meets a tier's required point threshold.
   */
  interface RollingWindow {
      /**
       * Number of months to use for the rolling window period.
       *
       * Min: `12`
       *
       * Max: `36`
       */
      durationInMonths?: number;
  }
  interface TiersRollingUpdate {
  }
  interface CreateTierRequest {
      /** Tier to create. */
      tier: Tier;
  }
  interface CreateTierResponse {
      /** Created loyalty tier. */
      tier?: Tier;
  }
  interface BulkCreateTiersRequest {
      /** Tiers to create. */
      tiers?: Tier[];
  }
  interface BulkCreateTiersResponse {
      /** Created tiers. */
      results?: BulkTierResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  /** Retrieved tiers. */
  interface BulkTierResult {
      /** Individual tier metadata. */
      itemMetadata?: ItemMetadata;
      /** Individual tier information. */
      item?: Tier;
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
  interface GetTierRequest {
      /** ID of the tier to retrieve. */
      tierId: string;
  }
  interface GetTierResponse {
      /** Retrieved loyalty tier. */
      tier?: Tier;
  }
  interface UpdateTierRequest {
      /** Tier details to update. */
      tier: Tier;
  }
  interface UpdateTierResponse {
      /** Updated loyalty tier. */
      tier?: Tier;
  }
  interface TierRequiredPointsChanged {
      /** Tier. */
      tier?: Tier;
  }
  interface DeleteTierRequest {
      /** ID of the tier to delete. */
      tierId: string;
      /** Current `revision` of the tier to delete. */
      revision?: string;
  }
  interface DeleteTierResponse {
  }
  interface ListTiersRequest {
  }
  interface ListTiersResponse {
      /** Retrieved loyalty tiers. */
      tiers?: Tier[];
  }
  interface CreateTiersProgramSettingsRequest {
      /** Tiers program settings. */
      programSettings: TiersProgramSettings;
  }
  interface CreateTiersProgramSettingsResponse {
      /** Created tiers program settings. */
      programSettings?: TiersProgramSettings;
  }
  interface GetTiersProgramRequest {
  }
  interface GetTiersProgramResponse {
      /** Tiers. */
      tiers?: Tier[];
      /** Tiers program settings. */
      programSettings?: TiersProgramSettings;
  }
  interface GetTiersProgramSettingsRequest {
  }
  interface GetTiersProgramSettingsResponse {
      /** Tiers program settings. */
      programSettings?: TiersProgramSettings;
  }
  interface UpdateTiersProgramSettingsRequest {
      /** Settings for the tiers program. */
      programSettings: TiersProgramSettings;
  }
  interface UpdateTiersProgramSettingsResponse {
      /** Updated program settings. */
      programSettings?: TiersProgramSettings;
  }
  interface RecalculateAllTiersRequest {
  }
  interface RecalculateAllTiersResponse {
  }
  interface MetaSiteSpecialEvent extends MetaSiteSpecialEventPayloadOneOf {
      /** Emitted on a meta site creation. */
      siteCreated?: SiteCreated;
      /** Emitted on a meta site transfer completion. */
      siteTransferred?: SiteTransferred;
      /** Emitted on a meta site deletion. */
      siteDeleted?: SiteDeleted;
      /** Emitted on a meta site restoration. */
      siteUndeleted?: SiteUndeleted;
      /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
      sitePublished?: SitePublished;
      /** Emitted on a meta site unpublish. */
      siteUnpublished?: SiteUnpublished;
      /** Emitted when meta site is marked as template. */
      siteMarkedAsTemplate?: SiteMarkedAsTemplate;
      /** Emitted when meta site is marked as a WixSite. */
      siteMarkedAsWixSite?: SiteMarkedAsWixSite;
      /** Emitted when an application is provisioned (installed). */
      serviceProvisioned?: ServiceProvisioned;
      /** Emitted when an application is removed (uninstalled). */
      serviceRemoved?: ServiceRemoved;
      /** Emitted when meta site name (URL slug) is changed. */
      siteRenamedPayload?: SiteRenamed;
      /** Emitted when meta site was permanently deleted. */
      hardDeleted?: SiteHardDeleted;
      /** Emitted on a namespace change. */
      namespaceChanged?: NamespaceChanged;
      /** Emitted when Studio is attached. */
      studioAssigned?: StudioAssigned;
      /** Emitted when Studio is detached. */
      studioUnassigned?: StudioUnassigned;
      /** A meta site id. */
      metaSiteId?: string;
      /** A meta site version. Monotonically increasing. */
      version?: string;
      /** A timestamp of the event. */
      timestamp?: string;
      /**
       * TODO(meta-site): Change validation once validations are disabled for consumers
       * More context: https://wix.slack.com/archives/C0UHEBPFT/p1720957844413149 and https://wix.slack.com/archives/CFWKX325T/p1728892152855659
       */
      assets?: Asset[];
  }
  /** @oneof */
  interface MetaSiteSpecialEventPayloadOneOf {
      /** Emitted on a meta site creation. */
      siteCreated?: SiteCreated;
      /** Emitted on a meta site transfer completion. */
      siteTransferred?: SiteTransferred;
      /** Emitted on a meta site deletion. */
      siteDeleted?: SiteDeleted;
      /** Emitted on a meta site restoration. */
      siteUndeleted?: SiteUndeleted;
      /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
      sitePublished?: SitePublished;
      /** Emitted on a meta site unpublish. */
      siteUnpublished?: SiteUnpublished;
      /** Emitted when meta site is marked as template. */
      siteMarkedAsTemplate?: SiteMarkedAsTemplate;
      /** Emitted when meta site is marked as a WixSite. */
      siteMarkedAsWixSite?: SiteMarkedAsWixSite;
      /** Emitted when an application is provisioned (installed). */
      serviceProvisioned?: ServiceProvisioned;
      /** Emitted when an application is removed (uninstalled). */
      serviceRemoved?: ServiceRemoved;
      /** Emitted when meta site name (URL slug) is changed. */
      siteRenamedPayload?: SiteRenamed;
      /** Emitted when meta site was permanently deleted. */
      hardDeleted?: SiteHardDeleted;
      /** Emitted on a namespace change. */
      namespaceChanged?: NamespaceChanged;
      /** Emitted when Studio is attached. */
      studioAssigned?: StudioAssigned;
      /** Emitted when Studio is detached. */
      studioUnassigned?: StudioUnassigned;
  }
  interface Asset {
      /** An application definition id (app_id in dev-center). For legacy reasons may be UUID or a string (from Java Enum). */
      appDefId?: string;
      /** An instance id. For legacy reasons may be UUID or a string. */
      instanceId?: string;
      /** An application state. */
      state?: State;
  }
  enum State {
      UNKNOWN = "UNKNOWN",
      ENABLED = "ENABLED",
      DISABLED = "DISABLED",
      PENDING = "PENDING",
      DEMO = "DEMO"
  }
  interface SiteCreated {
      /** A template identifier (empty if not created from a template). */
      originTemplateId?: string;
      /** An account id of the owner. */
      ownerId?: string;
      /** A context in which meta site was created. */
      context?: SiteCreatedContext;
      /**
       * A meta site id from which this site was created.
       *
       * In case of a creation from a template it's a template id.
       * In case of a site duplication ("Save As" in dashboard or duplicate in UM) it's an id of a source site.
       */
      originMetaSiteId?: string | null;
      /** A meta site name (URL slug). */
      siteName?: string;
      /** A namespace. */
      namespace?: Namespace;
  }
  enum SiteCreatedContext {
      /** A valid option, we don't expose all reasons why site might be created. */
      OTHER = "OTHER",
      /** A meta site was created from template. */
      FROM_TEMPLATE = "FROM_TEMPLATE",
      /** A meta site was created by copying of the transfferred meta site. */
      DUPLICATE_BY_SITE_TRANSFER = "DUPLICATE_BY_SITE_TRANSFER",
      /** A copy of existing meta site. */
      DUPLICATE = "DUPLICATE",
      /** A meta site was created as a transfferred site (copy of the original), old flow, should die soon. */
      OLD_SITE_TRANSFER = "OLD_SITE_TRANSFER",
      /** deprecated A meta site was created for Flash editor. */
      FLASH = "FLASH"
  }
  enum Namespace {
      UNKNOWN_NAMESPACE = "UNKNOWN_NAMESPACE",
      /** Default namespace for UGC sites. MetaSites with this namespace will be shown in a user's site list by default. */
      WIX = "WIX",
      /** ShoutOut stand alone product. These are siteless (no actual Wix site, no HtmlWeb). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      SHOUT_OUT = "SHOUT_OUT",
      /** MetaSites created by the Albums product, they appear as part of the Albums app. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      ALBUMS = "ALBUMS",
      /** Part of the WixStores migration flow, a user tries to migrate and gets this site to view and if the user likes it then stores removes this namespace and deletes the old site with the old stores. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      WIX_STORES_TEST_DRIVE = "WIX_STORES_TEST_DRIVE",
      /** Hotels standalone (siteless). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      HOTELS = "HOTELS",
      /** Clubs siteless MetaSites, a club without a wix website. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      CLUBS = "CLUBS",
      /** A partially created ADI website. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      ONBOARDING_DRAFT = "ONBOARDING_DRAFT",
      /** AppBuilder for AppStudio / shmite (c). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      DEV_SITE = "DEV_SITE",
      /** LogoMaker websites offered to the user after logo purchase. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      LOGOS = "LOGOS",
      /** VideoMaker websites offered to the user after video purchase. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      VIDEO_MAKER = "VIDEO_MAKER",
      /** MetaSites with this namespace will *not* be shown in a user's site list by default. */
      PARTNER_DASHBOARD = "PARTNER_DASHBOARD",
      /** MetaSites with this namespace will *not* be shown in a user's site list by default. */
      DEV_CENTER_COMPANY = "DEV_CENTER_COMPANY",
      /**
       * A draft created by HTML editor on open. Upon "first save" it will be moved to be of WIX domain.
       *
       * Meta site with this namespace will *not* be shown in a user's site list by default.
       */
      HTML_DRAFT = "HTML_DRAFT",
      /**
       * the user-journey for Fitness users who want to start from managing their business instead of designing their website.
       * Will be accessible from Site List and will not have a website app.
       * Once the user attaches a site, the site will become a regular wixsite.
       */
      SITELESS_BUSINESS = "SITELESS_BUSINESS",
      /** Belongs to "strategic products" company. Supports new product in the creator's economy space. */
      CREATOR_ECONOMY = "CREATOR_ECONOMY",
      /** It is to be used in the Business First efforts. */
      DASHBOARD_FIRST = "DASHBOARD_FIRST",
      /** Bookings business flow with no site. */
      ANYWHERE = "ANYWHERE",
      /** Namespace for Headless Backoffice with no editor */
      HEADLESS = "HEADLESS",
      /**
       * Namespace for master site that will exist in parent account that will be referenced by subaccounts
       * The site will be used for account level CSM feature for enterprise
       */
      ACCOUNT_MASTER_CMS = "ACCOUNT_MASTER_CMS",
      /** Rise.ai Siteless account management for Gift Cards and Store Credit. */
      RISE = "RISE",
      /**
       * As part of the branded app new funnel, users now can create a meta site that will be branded app first.
       * There's a blank site behind the scene but it's blank).
       * The Mobile company will be the owner of this namespace.
       */
      BRANDED_FIRST = "BRANDED_FIRST",
      /** Nownia.com Siteless account management for Ai Scheduling Assistant. */
      NOWNIA = "NOWNIA",
      /**
       * UGC Templates are templates that are created by users for personal use and to sale to other users.
       * The Partners company owns this namespace.
       */
      UGC_TEMPLATE = "UGC_TEMPLATE",
      /** Codux Headless Sites */
      CODUX = "CODUX"
  }
  /** Site transferred to another user. */
  interface SiteTransferred {
      /** A previous owner id (user that transfers meta site). */
      oldOwnerId?: string;
      /** A new owner id (user that accepts meta site). */
      newOwnerId?: string;
  }
  /** Soft deletion of the meta site. Could be restored. */
  interface SiteDeleted {
      /** A deletion context. */
      deleteContext?: DeleteContext;
  }
  interface DeleteContext {
      /** When the meta site was deleted. */
      dateDeleted?: Date | null;
      /** A status. */
      deleteStatus?: DeleteStatus;
      /** A reason (flow). */
      deleteOrigin?: string;
      /** A service that deleted it. */
      initiatorId?: string | null;
  }
  enum DeleteStatus {
      UNKNOWN = "UNKNOWN",
      TRASH = "TRASH",
      DELETED = "DELETED",
      PENDING_PURGE = "PENDING_PURGE"
  }
  /** Restoration of the meta site. */
  interface SiteUndeleted {
  }
  /** First publish of a meta site. Or subsequent publish after unpublish. */
  interface SitePublished {
  }
  interface SiteUnpublished {
      /** A list of URLs previously associated with the meta site. */
      urls?: string[];
  }
  interface SiteMarkedAsTemplate {
  }
  interface SiteMarkedAsWixSite {
  }
  interface ServiceProvisioned {
      /** Either UUID or EmbeddedServiceType. */
      appDefId?: string;
      /** Not only UUID. Something here could be something weird. */
      instanceId?: string;
      /** An instance id from which this instance is originated. */
      originInstanceId?: string;
      /** A version. */
      version?: string | null;
      /** The origin meta site id */
      originMetaSiteId?: string | null;
  }
  interface ServiceRemoved {
      /** Either UUID or EmbeddedServiceType. */
      appDefId?: string;
      /** Not only UUID. Something here could be something weird. */
      instanceId?: string;
      /** A version. */
      version?: string | null;
  }
  /** Rename of the site. Meaning, free public url has been changed as well. */
  interface SiteRenamed {
      /** A new meta site name (URL slug). */
      newSiteName?: string;
      /** A previous meta site name (URL slug). */
      oldSiteName?: string;
  }
  /**
   * Hard deletion of the meta site.
   *
   * Could not be restored. Therefore it's desirable to cleanup data.
   */
  interface SiteHardDeleted {
      /** A deletion context. */
      deleteContext?: DeleteContext;
  }
  interface NamespaceChanged {
      /** A previous namespace. */
      oldNamespace?: Namespace;
      /** A new namespace. */
      newNamespace?: Namespace;
  }
  /** Assigned Studio editor */
  interface StudioAssigned {
  }
  /** Unassigned Studio editor */
  interface StudioUnassigned {
  }
  interface Empty {
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
  /**
   * Creates a tier.
   *
   * The name for a tier and the amount of required points to qualify for a tier can only exist for a single tier.
   * Attempts to create a tier with a `tierDefinition.name` or `requiredPoints` that already exists will return an error.
   *
   * To create up to 20 tiers at once, use [`bulkCreateTiers()`](#bulkcreatetiers).
   *
   * >**Note:** You must have a [Business VIP Premium plan](https://support.wix.com/en/article/business-vip-premium-plan-overview) or a [Scale Premium plan](https://support.wix.com/en/article/editor-x-scale-premium-plan-overview) to add tiers.
   * @param tier - Tier to create.
   * @public
   * @requiredField tier
   * @permissionId LOYALTY.MANAGE_TIERS
   * @adminMethod
   * @returns Created loyalty tier.
   */
  function createTier(tier: Tier): Promise<Tier>;
  /**
   * Creates up to 20 tiers.
   *
   * The name for a tier and the amount of required points to qualify for a tier can only exist for a single tier.
   * Attempts to create a tier with a `tierDefinition.name` or `requiredPoints` that already exists will return an error.
   *
   * To create a single tier, use [`createTier()`](#createtier).
   *
   * >**Note:** You must have a [Business VIP Premium plan](https://support.wix.com/en/article/business-vip-premium-plan-overview) or a [Scale Premium plan](https://support.wix.com/en/article/editor-x-scale-premium-plan-overview) to add tiers.
   * @param tiers - Tiers to create.
   * @public
   * @requiredField tiers
   * @permissionId LOYALTY.MANAGE_TIERS
   * @adminMethod
   */
  function bulkCreateTiers(tiers: Tier[]): Promise<BulkCreateTiersResponse>;
  /**
   * Retrieves a loyalty tier.
   *
   * To retrieve a list of all of a site's tiers, use [`listTiers()`](#listtiers).
   * @param tierId - ID of the tier to retrieve.
   * @public
   * @requiredField tierId
   * @permissionId LOYALTY.READ_TIERS
   * @returns Retrieved loyalty tier.
   */
  function getTier(tierId: string): Promise<Tier>;
  /**
   * Updates a loyalty tier.
   *
   * Use this endpoint to update tier-specific settings, such as the name and the required points
   * threshold of an individual loyalty tier. To update global settings that apply to all of a site's loyalty tiers,
   * use [`updateTiersProgramSettings()`](#updatetiersprogramsettings).
   * @param _id - Tier ID.
   * @public
   * @requiredField _id
   * @requiredField tier
   * @requiredField tier.revision
   * @param tier - Tier info to update.
   * @permissionId LOYALTY.MANAGE_TIERS
   * @adminMethod
   * @returns Updated loyalty tier.
   */
  function updateTier(_id: string | null, tier: UpdateTier): Promise<Tier>;
  interface UpdateTier {
      /**
       * Tier ID.
       * @readonly
       */
      _id?: string | null;
      /** Information about the tier. */
      tierDefinition?: TierDefinition;
      /** The amount of points required to be in this tier. */
      requiredPoints?: number;
      /**
       * Revision number, which increments by 1 each time the loyalty tier is updated.
       *
       * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty tier.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the tier was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the tier was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  /**
   * Deletes a loyalty tier.
   * @param tierId - ID of the tier to delete.
   * @param revision - Current `revision` of the tier to delete.
   * @public
   * @requiredField revision
   * @requiredField tierId
   * @permissionId LOYALTY.MANAGE_TIERS
   * @adminMethod
   */
  function deleteTier(tierId: string, revision: string): Promise<void>;
  /**
   * Retrieves a list of a site's tiers.
   *
   * To retrieve a specific tier, use [`getTier()`](#gettier).
   * @public
   * @permissionId LOYALTY.READ_TIERS
   */
  function listTiers(): Promise<ListTiersResponse>;
  /**
   * Create tiers program settings.
   *
   * Tiers program settings apply globally to all tiers in the program.
   * @param programSettings - Tiers program settings.
   * @public
   * @requiredField programSettings
   * @permissionId LOYALTY.MANAGE_TIERS
   * @adminMethod
   */
  function createTiersProgramSettings(programSettings: TiersProgramSettings): Promise<CreateTiersProgramSettingsResponse>;
  /**
   * Returns `Tiers` and `ProgramSettings` in a single response.
   *
   * If `TiersProgramSettings` doesn't exist, default `TiersProgramSettings` are created.
   * @public
   * @permissionId LOYALTY.READ_TIERS
   */
  function getTiersProgram(): Promise<GetTiersProgramResponse>;
  /**
   * Retrieves the settings for the tiers program.
   *
   * Tiers program settings apply globally to all tiers in the program.
   * @public
   * @permissionId LOYALTY.READ_TIERS
   */
  function getTiersProgramSettings(): Promise<GetTiersProgramSettingsResponse>;
  /**
   * Updates the global settings of a loyalty tier program.
   *
   * Use this endpoint to update settings that apply to all of a site's loyalty tiers.
   * To update tier-specific settings for an individual tier, use
   * [`updateTier()`](#updatetier).
   *
   * By default, the `status` of a tiers program is set to `"DISABLED"` and must be manually updated to `"ACTIVE"` using
   * this endpoint or through a site owner's [dashboard](https://manage.wix.com/account/site-selector/?actionUrl=https%3A%2F%2Fwww.wix.com%2Fdashboard%2F%7BmetaSiteId%7D%2Floyalty-accounts%2Fmanage%3Ftab%3Dpoints-and-rewards&title=Select+a+Site&primaryButtonText=Select+Site).
   *
   * >**Note:** The `status`, `revision`, and `rollingWindow` parameters must be passed to update the tiers program settings. The `baseTierDefinition` fields are not required, however, if you don't pass them they will reset to their default values of empty fields.
   * @param programSettings - Settings for the tiers program.
   * @public
   * @requiredField programSettings
   * @requiredField programSettings.revision
   * @requiredField programSettings.status
   * @permissionId LOYALTY.MANAGE_TIERS
   * @adminMethod
   */
  function updateTiersProgramSettings(programSettings: TiersProgramSettings): Promise<UpdateTiersProgramSettingsResponse>;
  
  type loyaltyV1Tier_universal_d_Tier = Tier;
  type loyaltyV1Tier_universal_d_TierDefinition = TierDefinition;
  type loyaltyV1Tier_universal_d_FocalPoint = FocalPoint;
  type loyaltyV1Tier_universal_d_TiersProgramSettingsChanged = TiersProgramSettingsChanged;
  type loyaltyV1Tier_universal_d_TiersProgramSettings = TiersProgramSettings;
  type loyaltyV1Tier_universal_d_TiersProgramSettingsPeriodOneOf = TiersProgramSettingsPeriodOneOf;
  type loyaltyV1Tier_universal_d_Status = Status;
  const loyaltyV1Tier_universal_d_Status: typeof Status;
  type loyaltyV1Tier_universal_d_RollingWindow = RollingWindow;
  type loyaltyV1Tier_universal_d_TiersRollingUpdate = TiersRollingUpdate;
  type loyaltyV1Tier_universal_d_CreateTierRequest = CreateTierRequest;
  type loyaltyV1Tier_universal_d_CreateTierResponse = CreateTierResponse;
  type loyaltyV1Tier_universal_d_BulkCreateTiersRequest = BulkCreateTiersRequest;
  type loyaltyV1Tier_universal_d_BulkCreateTiersResponse = BulkCreateTiersResponse;
  type loyaltyV1Tier_universal_d_BulkTierResult = BulkTierResult;
  type loyaltyV1Tier_universal_d_ItemMetadata = ItemMetadata;
  type loyaltyV1Tier_universal_d_ApplicationError = ApplicationError;
  type loyaltyV1Tier_universal_d_BulkActionMetadata = BulkActionMetadata;
  type loyaltyV1Tier_universal_d_GetTierRequest = GetTierRequest;
  type loyaltyV1Tier_universal_d_GetTierResponse = GetTierResponse;
  type loyaltyV1Tier_universal_d_UpdateTierRequest = UpdateTierRequest;
  type loyaltyV1Tier_universal_d_UpdateTierResponse = UpdateTierResponse;
  type loyaltyV1Tier_universal_d_TierRequiredPointsChanged = TierRequiredPointsChanged;
  type loyaltyV1Tier_universal_d_DeleteTierRequest = DeleteTierRequest;
  type loyaltyV1Tier_universal_d_DeleteTierResponse = DeleteTierResponse;
  type loyaltyV1Tier_universal_d_ListTiersRequest = ListTiersRequest;
  type loyaltyV1Tier_universal_d_ListTiersResponse = ListTiersResponse;
  type loyaltyV1Tier_universal_d_CreateTiersProgramSettingsRequest = CreateTiersProgramSettingsRequest;
  type loyaltyV1Tier_universal_d_CreateTiersProgramSettingsResponse = CreateTiersProgramSettingsResponse;
  type loyaltyV1Tier_universal_d_GetTiersProgramRequest = GetTiersProgramRequest;
  type loyaltyV1Tier_universal_d_GetTiersProgramResponse = GetTiersProgramResponse;
  type loyaltyV1Tier_universal_d_GetTiersProgramSettingsRequest = GetTiersProgramSettingsRequest;
  type loyaltyV1Tier_universal_d_GetTiersProgramSettingsResponse = GetTiersProgramSettingsResponse;
  type loyaltyV1Tier_universal_d_UpdateTiersProgramSettingsRequest = UpdateTiersProgramSettingsRequest;
  type loyaltyV1Tier_universal_d_UpdateTiersProgramSettingsResponse = UpdateTiersProgramSettingsResponse;
  type loyaltyV1Tier_universal_d_RecalculateAllTiersRequest = RecalculateAllTiersRequest;
  type loyaltyV1Tier_universal_d_RecalculateAllTiersResponse = RecalculateAllTiersResponse;
  type loyaltyV1Tier_universal_d_MetaSiteSpecialEvent = MetaSiteSpecialEvent;
  type loyaltyV1Tier_universal_d_MetaSiteSpecialEventPayloadOneOf = MetaSiteSpecialEventPayloadOneOf;
  type loyaltyV1Tier_universal_d_Asset = Asset;
  type loyaltyV1Tier_universal_d_State = State;
  const loyaltyV1Tier_universal_d_State: typeof State;
  type loyaltyV1Tier_universal_d_SiteCreated = SiteCreated;
  type loyaltyV1Tier_universal_d_SiteCreatedContext = SiteCreatedContext;
  const loyaltyV1Tier_universal_d_SiteCreatedContext: typeof SiteCreatedContext;
  type loyaltyV1Tier_universal_d_Namespace = Namespace;
  const loyaltyV1Tier_universal_d_Namespace: typeof Namespace;
  type loyaltyV1Tier_universal_d_SiteTransferred = SiteTransferred;
  type loyaltyV1Tier_universal_d_SiteDeleted = SiteDeleted;
  type loyaltyV1Tier_universal_d_DeleteContext = DeleteContext;
  type loyaltyV1Tier_universal_d_DeleteStatus = DeleteStatus;
  const loyaltyV1Tier_universal_d_DeleteStatus: typeof DeleteStatus;
  type loyaltyV1Tier_universal_d_SiteUndeleted = SiteUndeleted;
  type loyaltyV1Tier_universal_d_SitePublished = SitePublished;
  type loyaltyV1Tier_universal_d_SiteUnpublished = SiteUnpublished;
  type loyaltyV1Tier_universal_d_SiteMarkedAsTemplate = SiteMarkedAsTemplate;
  type loyaltyV1Tier_universal_d_SiteMarkedAsWixSite = SiteMarkedAsWixSite;
  type loyaltyV1Tier_universal_d_ServiceProvisioned = ServiceProvisioned;
  type loyaltyV1Tier_universal_d_ServiceRemoved = ServiceRemoved;
  type loyaltyV1Tier_universal_d_SiteRenamed = SiteRenamed;
  type loyaltyV1Tier_universal_d_SiteHardDeleted = SiteHardDeleted;
  type loyaltyV1Tier_universal_d_NamespaceChanged = NamespaceChanged;
  type loyaltyV1Tier_universal_d_StudioAssigned = StudioAssigned;
  type loyaltyV1Tier_universal_d_StudioUnassigned = StudioUnassigned;
  type loyaltyV1Tier_universal_d_Empty = Empty;
  type loyaltyV1Tier_universal_d_DomainEvent = DomainEvent;
  type loyaltyV1Tier_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type loyaltyV1Tier_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type loyaltyV1Tier_universal_d_RestoreInfo = RestoreInfo;
  type loyaltyV1Tier_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type loyaltyV1Tier_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type loyaltyV1Tier_universal_d_ActionEvent = ActionEvent;
  type loyaltyV1Tier_universal_d_MessageEnvelope = MessageEnvelope;
  type loyaltyV1Tier_universal_d_IdentificationData = IdentificationData;
  type loyaltyV1Tier_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type loyaltyV1Tier_universal_d_WebhookIdentityType = WebhookIdentityType;
  const loyaltyV1Tier_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const loyaltyV1Tier_universal_d_createTier: typeof createTier;
  const loyaltyV1Tier_universal_d_bulkCreateTiers: typeof bulkCreateTiers;
  const loyaltyV1Tier_universal_d_getTier: typeof getTier;
  const loyaltyV1Tier_universal_d_updateTier: typeof updateTier;
  type loyaltyV1Tier_universal_d_UpdateTier = UpdateTier;
  const loyaltyV1Tier_universal_d_deleteTier: typeof deleteTier;
  const loyaltyV1Tier_universal_d_listTiers: typeof listTiers;
  const loyaltyV1Tier_universal_d_createTiersProgramSettings: typeof createTiersProgramSettings;
  const loyaltyV1Tier_universal_d_getTiersProgram: typeof getTiersProgram;
  const loyaltyV1Tier_universal_d_getTiersProgramSettings: typeof getTiersProgramSettings;
  const loyaltyV1Tier_universal_d_updateTiersProgramSettings: typeof updateTiersProgramSettings;
  namespace loyaltyV1Tier_universal_d {
    export {
      loyaltyV1Tier_universal_d_Tier as Tier,
      loyaltyV1Tier_universal_d_TierDefinition as TierDefinition,
      loyaltyV1Tier_universal_d_FocalPoint as FocalPoint,
      loyaltyV1Tier_universal_d_TiersProgramSettingsChanged as TiersProgramSettingsChanged,
      loyaltyV1Tier_universal_d_TiersProgramSettings as TiersProgramSettings,
      loyaltyV1Tier_universal_d_TiersProgramSettingsPeriodOneOf as TiersProgramSettingsPeriodOneOf,
      loyaltyV1Tier_universal_d_Status as Status,
      loyaltyV1Tier_universal_d_RollingWindow as RollingWindow,
      loyaltyV1Tier_universal_d_TiersRollingUpdate as TiersRollingUpdate,
      loyaltyV1Tier_universal_d_CreateTierRequest as CreateTierRequest,
      loyaltyV1Tier_universal_d_CreateTierResponse as CreateTierResponse,
      loyaltyV1Tier_universal_d_BulkCreateTiersRequest as BulkCreateTiersRequest,
      loyaltyV1Tier_universal_d_BulkCreateTiersResponse as BulkCreateTiersResponse,
      loyaltyV1Tier_universal_d_BulkTierResult as BulkTierResult,
      loyaltyV1Tier_universal_d_ItemMetadata as ItemMetadata,
      loyaltyV1Tier_universal_d_ApplicationError as ApplicationError,
      loyaltyV1Tier_universal_d_BulkActionMetadata as BulkActionMetadata,
      loyaltyV1Tier_universal_d_GetTierRequest as GetTierRequest,
      loyaltyV1Tier_universal_d_GetTierResponse as GetTierResponse,
      loyaltyV1Tier_universal_d_UpdateTierRequest as UpdateTierRequest,
      loyaltyV1Tier_universal_d_UpdateTierResponse as UpdateTierResponse,
      loyaltyV1Tier_universal_d_TierRequiredPointsChanged as TierRequiredPointsChanged,
      loyaltyV1Tier_universal_d_DeleteTierRequest as DeleteTierRequest,
      loyaltyV1Tier_universal_d_DeleteTierResponse as DeleteTierResponse,
      loyaltyV1Tier_universal_d_ListTiersRequest as ListTiersRequest,
      loyaltyV1Tier_universal_d_ListTiersResponse as ListTiersResponse,
      loyaltyV1Tier_universal_d_CreateTiersProgramSettingsRequest as CreateTiersProgramSettingsRequest,
      loyaltyV1Tier_universal_d_CreateTiersProgramSettingsResponse as CreateTiersProgramSettingsResponse,
      loyaltyV1Tier_universal_d_GetTiersProgramRequest as GetTiersProgramRequest,
      loyaltyV1Tier_universal_d_GetTiersProgramResponse as GetTiersProgramResponse,
      loyaltyV1Tier_universal_d_GetTiersProgramSettingsRequest as GetTiersProgramSettingsRequest,
      loyaltyV1Tier_universal_d_GetTiersProgramSettingsResponse as GetTiersProgramSettingsResponse,
      loyaltyV1Tier_universal_d_UpdateTiersProgramSettingsRequest as UpdateTiersProgramSettingsRequest,
      loyaltyV1Tier_universal_d_UpdateTiersProgramSettingsResponse as UpdateTiersProgramSettingsResponse,
      loyaltyV1Tier_universal_d_RecalculateAllTiersRequest as RecalculateAllTiersRequest,
      loyaltyV1Tier_universal_d_RecalculateAllTiersResponse as RecalculateAllTiersResponse,
      loyaltyV1Tier_universal_d_MetaSiteSpecialEvent as MetaSiteSpecialEvent,
      loyaltyV1Tier_universal_d_MetaSiteSpecialEventPayloadOneOf as MetaSiteSpecialEventPayloadOneOf,
      loyaltyV1Tier_universal_d_Asset as Asset,
      loyaltyV1Tier_universal_d_State as State,
      loyaltyV1Tier_universal_d_SiteCreated as SiteCreated,
      loyaltyV1Tier_universal_d_SiteCreatedContext as SiteCreatedContext,
      loyaltyV1Tier_universal_d_Namespace as Namespace,
      loyaltyV1Tier_universal_d_SiteTransferred as SiteTransferred,
      loyaltyV1Tier_universal_d_SiteDeleted as SiteDeleted,
      loyaltyV1Tier_universal_d_DeleteContext as DeleteContext,
      loyaltyV1Tier_universal_d_DeleteStatus as DeleteStatus,
      loyaltyV1Tier_universal_d_SiteUndeleted as SiteUndeleted,
      loyaltyV1Tier_universal_d_SitePublished as SitePublished,
      loyaltyV1Tier_universal_d_SiteUnpublished as SiteUnpublished,
      loyaltyV1Tier_universal_d_SiteMarkedAsTemplate as SiteMarkedAsTemplate,
      loyaltyV1Tier_universal_d_SiteMarkedAsWixSite as SiteMarkedAsWixSite,
      loyaltyV1Tier_universal_d_ServiceProvisioned as ServiceProvisioned,
      loyaltyV1Tier_universal_d_ServiceRemoved as ServiceRemoved,
      loyaltyV1Tier_universal_d_SiteRenamed as SiteRenamed,
      loyaltyV1Tier_universal_d_SiteHardDeleted as SiteHardDeleted,
      loyaltyV1Tier_universal_d_NamespaceChanged as NamespaceChanged,
      loyaltyV1Tier_universal_d_StudioAssigned as StudioAssigned,
      loyaltyV1Tier_universal_d_StudioUnassigned as StudioUnassigned,
      loyaltyV1Tier_universal_d_Empty as Empty,
      loyaltyV1Tier_universal_d_DomainEvent as DomainEvent,
      loyaltyV1Tier_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      loyaltyV1Tier_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      loyaltyV1Tier_universal_d_RestoreInfo as RestoreInfo,
      loyaltyV1Tier_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      loyaltyV1Tier_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      loyaltyV1Tier_universal_d_ActionEvent as ActionEvent,
      loyaltyV1Tier_universal_d_MessageEnvelope as MessageEnvelope,
      loyaltyV1Tier_universal_d_IdentificationData as IdentificationData,
      loyaltyV1Tier_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      loyaltyV1Tier_universal_d_WebhookIdentityType as WebhookIdentityType,
      loyaltyV1Tier_universal_d_createTier as createTier,
      loyaltyV1Tier_universal_d_bulkCreateTiers as bulkCreateTiers,
      loyaltyV1Tier_universal_d_getTier as getTier,
      loyaltyV1Tier_universal_d_updateTier as updateTier,
      loyaltyV1Tier_universal_d_UpdateTier as UpdateTier,
      loyaltyV1Tier_universal_d_deleteTier as deleteTier,
      loyaltyV1Tier_universal_d_listTiers as listTiers,
      loyaltyV1Tier_universal_d_createTiersProgramSettings as createTiersProgramSettings,
      loyaltyV1Tier_universal_d_getTiersProgram as getTiersProgram,
      loyaltyV1Tier_universal_d_getTiersProgramSettings as getTiersProgramSettings,
      loyaltyV1Tier_universal_d_updateTiersProgramSettings as updateTiersProgramSettings,
    };
  }
  
  export { loyaltyV1Account_universal_d as accounts, loyaltyCheckoutexchangeV1LoyaltyCheckoutDiscount_universal_d as checkoutExchange, loyaltyV1Coupon_universal_d as coupons, loyaltyV1LoyaltyEarningRule_universal_d as earningRules, loyaltyImportsV1LoyaltyImport_universal_d as imports, loyaltyV1Program_universal_d as programs, loyaltyV1Reward_universal_d as rewards, loyaltySocialmediaV1FollowedChannel_universal_d as socialMedia, loyaltyV1Tier_universal_d as tiers, loyaltyTransactionV1LoyaltyTransaction_universal_d as transactions };
}
