declare module "wix-packages.v1" {
  /**
   * A package is group of instances of Wix services that a reseller offers to a
   * customer as part of a single transaction.
   */
  interface Package {
      /**
       * Package ID.
       * @readonly
       */
      _id?: string;
      /**
       * Wix account ID. See
       * [Account Level APIs](https://dev.wix.com/docs/rest/account-level/about-account-level-apis)
       * for more details.
       * @readonly
       */
      accountId?: string;
      /**
       * External reference. For example, an external subscription ID.
       * This field isn't validated by Wix.
       *
       * Max: 100 characters
       */
      externalId?: string | null;
      /**
       * Product instances that are included in the package.
       *
       * Min: 1 product instance
       * Max: 1000 product instances
       */
      productInstances?: ProductInstance[];
      /**
       * Date and time the package was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the package was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * ID of the parent Wix account. Equal to the account ID if there is no parent account.
       * @internal
       */
      parentAccountId?: string | null;
  }
  /**
   * A product instance is a specific instance of a Wix service that a reseller
   * offers to one of their customers.
   */
  interface ProductInstance extends ProductInstanceContractDetailsOneOf {
      /** Billing information for the contract between the reseller and Wix. */
      billingInfo?: ProductInstanceCycle;
      /**
       * ID of the instance of the resold Wix service. **Note:** Differs from the
       * `catalogProductId`. Allows you to identify different instances of the same
       * product in a package.
       * @readonly
       */
      instanceId?: string;
      /**
       * ID of the Wix site that the product instance is assigned to.
       * See the [Query Sites API](https://dev.wix.com/api/rest/account-level-apis/sites/query-sites)
       * for more information.
       */
      siteId?: string | null;
      /**
       * Product ID, as defined in the Wix Premium Product Catalog.
       * Contact the [Wix B2B sales team](mailto:bizdev@wix.com)
       * for more details about available Wix services.
       */
      catalogProductId?: string;
      /**
       * Status of the product instance.
       * @readonly
       */
      status?: Status;
      /**
       * Failure object. Only present for status `FAILED`. Describes why the product instance `FAILED`.
       * @readonly
       */
      failure?: FailureReason;
      /**
       * Date and time the product instance was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the product instance was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Two-letter country code in
       * [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
       * format. Specifies where customers can claim vouchers that may come with the
       * product. Contact the [Wix B2B sales team](mailto:bizdev@wix.com) to get more
       * information about vouchers and supported locations.
       */
      countryCode?: string | null;
      /**
       * Date and time the product instance expires in `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * Used only for instances that don't auto renew at the end of the current billing cycle.
       * @readonly
       */
      expirationDate?: Date | null;
      /**
       * Discount code indicating that the reseller provisioned the product instance
       * during a sale. Wix doesn't guarantee that a discount code reduces the
       * price between Wix and the reseller, even when it's valid. Contact the
       * [Wix B2B sales team](mailto:bizdev@wix.com) for more information.
       *
       * Max: 25 characters
       */
      discountCode?: string | null;
      /**
       * ID of a different product instance that you can use to offer your customers
       * time-limited free access to an additional product or service. For example,
       * Wix offers a 1-year free domain registration to all customers who purchase a
       * Premium plan. The referenced product instance must have either status `"PENDING"` or
       * `"ACTIVE"`. You can use each product instance only a single time as reference
       * instance.
       */
      referenceProductInstanceId?: string | null;
  }
  /** @oneof */
  interface ProductInstanceContractDetailsOneOf {
      /** Billing information for the contract between the reseller and Wix. */
      billingInfo?: ProductInstanceCycle;
  }
  enum FailureReasonFailureReason {
      UNKNOWN = "UNKNOWN",
      /** The product instance couldn't be created because the Resellers API timed out. */
      DELIVERY_TIMEOUT = "DELIVERY_TIMEOUT",
      /** The product instance couldn't be created because an external process failed. */
      EXTERNAL_FAILURE = "EXTERNAL_FAILURE"
  }
  enum IntervalIntervalUnit {
      /** unknown interval unit */
      UNKNOWN = "UNKNOWN",
      /** Day */
      DAY = "DAY",
      /** Week */
      WEEK = "WEEK",
      /** Month */
      MONTH = "MONTH",
      /** Year */
      YEAR = "YEAR"
  }
  enum CycleDescriptorType {
      /** The payment type hasn't been set. */
      UNKNOWN = "UNKNOWN",
      /** The reseller pays Wix in a single payment. */
      ONE_TIME = "ONE_TIME",
      /** The reseller pays Wix on a recurring schedule. */
      RECURRING = "RECURRING"
  }
  interface CycleInterval {
      /** Unit of the billing cycle. */
      unit?: IntervalIntervalUnit;
      /** Count of units that make up the billing cycle. */
      count?: number;
  }
  enum Status {
      /** The product instance isn't yet available to the customer. */
      PENDING = "PENDING",
      /** The customer can use the product instance. */
      ENABLED = "ENABLED",
      /** The product instance isn't any longer available to the customer. */
      CANCELED = "CANCELED",
      /** The product instance couldn't be delivered successfully and has never been available to the customer. */
      FAILED = "FAILED",
      /** The product instance isn't yet available to the customer, because an external provider or the customer must take an action. */
      AWAITING_ACTION = "AWAITING_ACTION"
  }
  interface FailureReason {
      /** Failure code. */
      code?: FailureReasonFailureReason;
      /** Failure message. */
      message?: string;
  }
  interface ProductInstanceCycle {
      /** Payment type. */
      type?: CycleDescriptorType;
      /** Duration of the billing cycle. Available only for `RECURRING` payments. */
      cycleDuration?: CycleInterval;
  }
  interface MigrateSubscriptionToPackagesRequest {
      /** Created package. */
      productInstance?: ProductInstance;
      /** Existing subscriptionId to migrate */
      subscriptionId?: string | null;
      /** User id of the migration - only for Immigrator */
      userId?: string | null;
  }
  interface MigrateSubscriptionToPackagesResponse {
      package?: Package;
  }
  interface FixBrokenMigrationRequest {
      /** Subscription id of the broken subscription */
      subscriptionId?: string;
      /** SBS service id that points to the broken subscription */
      sbsServiceId?: string;
      /** Owner of the broken subscription */
      userId?: string;
  }
  interface FixBrokenMigrationResponse {
  }
  interface CreatePackageRequest {
      /** Idempotency key. */
      idempotencyKey?: string | null;
      /** External reference. For example, an external subscription ID. **Note:** This field is not validated by Wix. */
      externalId?: string | null;
      /** Wix services that are resold. */
      products: ProductInstance[];
  }
  interface CreatePackageResponse {
      /** Idempotency key. */
      idempotencyKey?: string | null;
      /** Created package. */
      package?: Package;
  }
  interface CancelPackageRequest {
      /** Idempotency key. */
      idempotencyKey?: string | null;
      /** ID of the package to cancel. */
      _id: string;
  }
  interface CancelPackageResponse {
      /** Idempotency key. */
      idempotencyKey?: string | null;
      /** Canceled package. */
      package?: Package;
  }
  interface PackageCanceled {
      /** Canceled package. */
      package?: Package;
  }
  interface GetPackageRequest {
      /** Package ID. */
      _id: string;
  }
  interface GetPackageResponse {
      /** Retrieved package. */
      package?: Package;
  }
  interface QueryPackagesRequest {
      /** Query options. See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language) for more details. */
      query: QueryV2;
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
  interface QueryPackagesResponse {
      /** Paging metadata. */
      metadata?: PagingMetadataV2;
      /**
       * Retrieved packages.
       *
       * Max: 1000 packages
       */
      packages?: Package[];
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
  interface AssignProductInstanceToSiteRequest {
      /** Idempotency key. */
      idempotencyKey?: string | null;
      /** ID of the product instance to assign to a site. */
      instanceId: string;
      /** ID of the site to which the product instance is assigned. */
      siteId: string;
  }
  interface AssignProductInstanceToSiteResponse {
      /** Idempotency key. */
      idempotencyKey?: string | null;
      /** Updated package that includes the assigned product instance. */
      package?: Package;
  }
  interface AssignedProductInstanceToSite {
      /** Updated package. */
      package?: Package;
      /**
       * ID of the product instance that was assigned to the site.
       * @readonly
       */
      productInstanceId?: string;
      /**
       * ID of the site the product instance was assigned to.
       * @readonly
       */
      siteId?: string;
  }
  interface UnassignProductInstanceFromSiteRequest {
      /** Idempotency key. */
      idempotencyKey?: string | null;
      /** ID of the product instance to unassign from a site. */
      instanceId: string;
  }
  interface UnassignProductInstanceFromSiteResponse {
      /** Idempotency key. */
      idempotencyKey?: string | null;
      /** Updated package that includes the unassigned product instance. */
      package?: Package;
  }
  interface UnassignedProductInstanceFromSite {
      /** Updated package. */
      package?: Package;
      /**
       * ID of the product instance that was unassigned from the site.
       * @readonly
       */
      productInstanceId?: string;
      /**
       * MetasiteId of the site the product instance was unassigned from.
       * @readonly
       */
      metaSiteId?: string;
  }
  interface CancelProductInstanceRequest {
      /** Idempotency key. */
      idempotencyKey?: string | null;
      /** ID of the product instance to cancel. */
      instanceId: string;
  }
  interface CancelProductInstanceResponse {
      /** Idempotency key. */
      idempotencyKey?: string | null;
      /** Updated package that includes the previously included the canceled product instance. */
      package?: Package;
  }
  interface ProductInstanceCanceled {
      /** Updated package. */
      package?: Package;
      /**
       * ID of the product instance that was canceled.
       * @readonly
       */
      productInstanceId?: string;
  }
  interface AdjustProductInstanceSpecificationsRequest {
      /** Idempotency key. */
      idempotencyKey?: string | null;
      /** ID of the product instance to adjust. */
      instanceId: string;
      /**
       * ID of the product to replace the original instance. Required in case you don't
       * provide a new `billingInfo` object.
       */
      catalogProductId?: string | null;
      /**
       * Information about the billing cycle. Required in case you don't provide a new
       * `catalogProductId`. The new billing cycle must be supported for the service.
       * Contact the [Wix B2B sales team](mailto:bizdev@wix.com) for
       * information about a service's supported billing cycles. If
       * you adjust the billing cycle for a product instance with `RECURRING`
       * payments, you must also provide `billingInfo.cycleDuration.unit`.
       */
      billingInfo?: ProductInstanceCycle;
      /**
       * Discount code indicating that the reseller provisioned the product instance
       * during a sale. In case you pass a code that isn't valid, the call succeeds and
       * no discount is applied to the product instance. Wix doesn't guarantee that a
       * discount code reduces the price between Wix and the reseller, even when it's
       * valid. You can't add a discount code after you've created the
       * product instance. Contact the [Wix B2B sales team](mailto:bizdev@wix.com) for
       * more information about supported codes.
       *
       * Max: 25 characters
       */
      discountCode?: string | null;
  }
  interface AdjustProductInstanceSpecificationsResponse {
      /** Idempotency key. */
      idempotencyKey?: string | null;
      /** Updated package that includes the adjusted product instance. */
      package?: Package;
  }
  interface AdjustedProductInstanceSpecifications {
      /** Updated package. */
      package?: Package;
      /**
       * ID of the product instance to adjust.
       * @readonly
       */
      productInstanceId?: string;
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
  interface Empty {
  }
  interface ProductInstanceUpdated {
      /** Updated package. */
      package?: Package;
      /**
       * ID of the product instance that was adjusted.
       * @readonly
       */
      productInstanceId?: string;
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
  interface FailureReportRequest {
      /** ID of the product instance that failed. */
      instanceId?: string;
      /** Failure reason. */
      reason?: FailureReason;
  }
  interface ProductInstanceFailed {
      /** Updated package. */
      package?: Package;
      /**
       * ID of the product instance that `FAILED`.
       * @readonly
       */
      productInstanceId?: string;
      /** Failure reason. */
      reason?: FailureReason;
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
  interface UpdateProductInstanceRequest {
      /** ID of the product instance to update. */
      instanceId?: string;
      status?: Status;
      countryCode?: string | null;
      /** Which field to update, currently only status and countryCode are supported. */
      fieldToUpdate?: FieldToUpdate;
  }
  enum FieldToUpdate {
      STATUS = "STATUS",
      COUNTRY_CODE = "COUNTRY_CODE"
  }
  interface UpdateProductInstanceResponse {
      /** Updated Product Instance */
      productInstance?: ProductInstance;
  }
  interface UpdatePackageExternalIdRequest {
      /** ID of the package to update. */
      packageId: string;
      /** External ID that will be assigned to the package. */
      externalId: string;
  }
  interface UpdatePackageExternalIdResponse {
      /** Updated package. */
      updatedPackage?: Package;
  }
  interface CountPackagesRequest {
      /** Filter on what packages to count */
      filter?: Record<string, any> | null;
  }
  interface CountPackagesResponse {
      /** Number of packages */
      count?: number;
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
   * Creates a new package.
   *
   * Deprecated: This method is deprecated and will be removed by 2024-12-31.
   * Use com.wixpress.premium.reseller.packages.v1.Packages.CreatePackageV2 instead.
   *
   * HTTP Request:
   * POST /v1/packages
   *
   * Permissions:
   * Requires the "premium.reseller-package.manage" permission with MANUAL type.
   *
   * Event:
   * A PRIVATE callback will be triggered when the package is successfully created.
   *
   * Required Fields:
   * - CreatePackageRequest.products
   *
   * Maturity: BETA
   * Exposure: PUBLIC
   * @public
   * @documentationMaturity preview
   * @requiredField options.products
   * @permissionId premium.reseller-package.manage
   * @adminMethod
   * @deprecated
   * @replacedBy com.wixpress.premium.reseller.packages.v1.Packages.CreatePackageV2
   * @targetRemovalDate 2024-12-31
   */
  function createPackage(options?: CreatePackageOptions): Promise<CreatePackageResponse>;
  interface CreatePackageOptions {
      /** Idempotency key. */
      idempotencyKey?: string | null;
      /** External reference. For example, an external subscription ID. **Note:** This field is not validated by Wix. */
      externalId?: string | null;
      /** Wix services that are resold. */
      products: ProductInstance[];
  }
  /**
   * Creates a package of product instances.
   *
   *
   * You must pass the relevant Wix account ID in the header of the call. In
   * the DIY flow, we recommend to pass the customer's sub-account ID instead
   * of your main reseller account ID.
   *
   * You may also pass a Wix site ID for each product in the body of the call.
   * If you omit the site ID, a floating product instance is created.
   *
   * When Wix customers purchase a specific paid service or product, Wix may offer
   * them time-limited free access to a different product. For example, customers
   * get a voucher for a free 1-year domain registration when purchasing any Wix
   * Premium plan. If you want to offer your customers the same benefit, create a
   * package containing the original product first. Then, create a second package
   * with the additional product. In the second Create Package call, pass the
   * instance ID of the original product as `referenceProductInstanceId`. This way,
   * Wix doesn't charge you for the additional product. Make sure that the status
   * of the referenced product is either `"PENDING"` or `"ACTIVE"`. Note that you
   * can use each product instance only a single time as reference instance.
   *
   * You need to pass a `countryCode` to specify where customers can claim
   * vouchers that may come with a product. Contact the
   * [Wix B2B sales team](mailto:bizdev@wix.com) to get information about
   * vouchers and supported locations.
   *
   * > **Important**: This call requires an account level API key and cannot be
   * > authenticated with the standard authorization header.
   * @public
   * @documentationMaturity preview
   * @requiredField options.products
   * @requiredField options.products.countryCode
   * @permissionId premium.reseller-package.manage
   * @adminMethod
   */
  function createPackageV2(options?: CreatePackageV2Options): Promise<CreatePackageResponse>;
  interface CreatePackageV2Options {
      /** Idempotency key. */
      idempotencyKey?: string | null;
      /** External reference. For example, an external subscription ID. **Note:** This field is not validated by Wix. */
      externalId?: string | null;
      /** Wix services that are resold. */
      products: ProductInstance[];
  }
  /**
   * Cancels all product instances included in the package and the customer
   * immediately loses access to the canceled functionality.
   *
   *
   * You must pass the ID of the Wix account that the package belongs to in the
   * header of the call. The call fails, if the package and Wix account don't
   * match.
   *
   * If a canceled product instance is a requirement for another Wix service, that
   * functionality is also no longer available to the customer. For example, if
   * you cancel a Premium plan, a previously connected domain is automatically
   * disconnected from the site.
   *
   * > **Important**: This call requires an account level API key and cannot be
   * > authenticated with the standard authorization header.
   * @param _id - ID of the package to cancel.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId premium.reseller-package.manage
   * @adminMethod
   */
  function cancelPackage(_id: string, options?: CancelPackageOptions): Promise<CancelPackageResponse>;
  interface CancelPackageOptions {
      /** Idempotency key. */
      idempotencyKey?: string | null;
  }
  /**
   * Retrieves a package.
   *
   *
   * You must pass the ID of the Wix account that the package belongs to in the
   * header of the call. The call fails, if the package and Wix account don't
   * match.
   *
   * > **Important**: This call requires an account level API key and cannot be
   * > authenticated with the standard authorization header.
   * @param _id - Package ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId premium.reseller-package.read
   * @adminMethod
   * @returns Retrieved package.
   */
  function getPackage(_id: string): Promise<Package>;
  /**
   * Retrieves a list of packages, given the provided paging, filtering, and sorting.
   *
   *
   * You must pass the ID of the Wix account that the packages belong to in the
   * header of the call. The call returns packages that belong to the parent
   * account, regardless if you pass the ID of a parent or sub-account. In case
   * you want to retrieve only packages that belong to a sub-account, you must
   * pass the sub-account ID as `filter` in the `query` object like this:
   *
   * ```json
   * {
   * "query": {
   * "filter": {
   * "accountId": {
   * "$eq": "<SUB_ACCOUNT_ID>"
   * }
   * }
   * }
   * }
   * ```
   *
   * Query Packages runs with these defaults, which you can override:
   *
   * - `createdDate` is sorted in `DESC` order
   * - `cursorPaging.limit` is `100`
   *
   * By default `pagingMetadata.cursors` are returned, unless you specifically pass
   * `query.paging`.
   *
   * The maximum for `cursorPaging.limit` is `100`.
   *
   * If you pass a cursor token that you have received in a previous Query Package response,
   * passing additional sort or filter information results in an invalid cursor
   * error. Since the received cursor token already holds all the needed information
   * for sort and filter. Changing the sort and filter properties during the span of
   * a cursor query isn't supported. But you can provide a different limit.
   *
   * For field support for filters and sorting,
   * see [Query Packages: Supported Filters and Sorting](https://dev.wix.com/api/rest/account-level-apis/resellers/supported-filters).
   *
   * To learn about working with _Query_ endpoints, see
   * [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language),
   * [Sorting and Paging](https://dev.wix.com/api/rest/getting-started/pagination),
   * and [Field Projection](https://dev.wix.com/api/rest/getting-started/field-projection).
   *
   * > **Important**: This call requires an account level API key and cannot be
   * > authenticated with the standard authorization header.
   * @public
   * @documentationMaturity preview
   * @permissionId premium.reseller-package.read
   * @adminMethod
   */
  function queryPackages(): PackagesQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface PackagesQueryResult extends QueryCursorResult {
      items: Package[];
      query: PackagesQueryBuilder;
      next: () => Promise<PackagesQueryResult>;
      prev: () => Promise<PackagesQueryResult>;
  }
  interface PackagesQueryBuilder {
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => PackagesQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => PackagesQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<PackagesQueryResult>;
  }
  /**
   * Assigns a product instance to a site.
   *
   *  You must pass the ID of the Wix account that the product instance belongs to in the header of the call.
   *
   *  The customer immediately gains access to features included in the assigned service. It's up to the reseller to decide whether assigning a product instance affects the customer’s payment.
   *
   *  It's possible to assign a product instance that's already assigned to a site, to a different site without [unassigning](/packages/unassign-product-instance-from-site) it first. But if the call fails in such a situation, the product instance may either remain assigned to the original site or become unassigned. You can confirm the instance's status by [retrieving the relevant package](/packages/get-package).
   *
   * > **Important:** This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @public
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.instanceId
   * @requiredField identifiers.siteId
   * @permissionId premium.reseller-package.manage
   * @adminMethod
   */
  function assignProductInstanceToSite(identifiers: AssignProductInstanceToSiteIdentifiers, options?: AssignProductInstanceToSiteOptions): Promise<AssignProductInstanceToSiteResponse>;
  interface AssignProductInstanceToSiteIdentifiers {
      /** ID of the product instance to assign to a site. */
      instanceId: string;
      /** ID of the site to which the product instance is assigned. */
      siteId: string;
  }
  interface AssignProductInstanceToSiteOptions {
      /** Idempotency key. */
      idempotencyKey?: string | null;
  }
  /**
   * Unassigns a product instance from a site.
   *
   *  You must pass the ID of the Wix account that the product instance belongs to in the header of the call.
   *
   *  The product instance becomes floating and the customer immediately looses access to features included in the unassigned service. It's up to the reseller to decide whether unassigning a product instance affects the customer’s payment.
   *
   *  If an unassigned product instance is a requirement for another service, that service may not be available to the customer any longer. For example, if you unassign a `Combo Plan` plan from a site, a previously connected domain is disconnected.
   *
   *  You can assign floating product instances to sites using the [Assign Product Instance to Site](/packages/assign-product-instance-to-site) method.
   *
   * > **Important:** This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param instanceId - ID of the product instance to unassign from a site.
   * @public
   * @documentationMaturity preview
   * @requiredField instanceId
   * @permissionId premium.reseller-package.manage
   * @adminMethod
   */
  function unassignProductInstanceFromSite(instanceId: string, options?: UnassignProductInstanceFromSiteOptions): Promise<UnassignProductInstanceFromSiteResponse>;
  interface UnassignProductInstanceFromSiteOptions {
      /** Idempotency key. */
      idempotencyKey?: string | null;
  }
  /**
   * Cancels a product instance.
   *
   *
   * You must pass the ID of the Wix account that the product instance belongs
   * to in the header of the call. The call fails, if the product instance and
   * Wix account don't match.
   *
   * The customer immediately loses access to features included in the
   * canceled service. It's up to the reseller to decide whether the adjustment
   * affects the customer’s payment.
   *
   * If a canceled service is a requirement for another service, that service
   * may not be available to the customer any longer. For example, if you cancel
   * a `Combo Plan` plan, a previously connected domain is disconnected
   * from the site.
   *
   *
   * > **Important**: This call requires an account level API key and cannot be
   * > authenticated with the standard authorization header.
   * @param instanceId - ID of the product instance to cancel.
   * @public
   * @documentationMaturity preview
   * @requiredField instanceId
   * @permissionId premium.reseller-package.manage
   * @adminMethod
   */
  function cancelProductInstance(instanceId: string, options?: CancelProductInstanceOptions): Promise<CancelProductInstanceResponse>;
  interface CancelProductInstanceOptions {
      /** Idempotency key. */
      idempotencyKey?: string | null;
  }
  /**
   * Upgrades or downgrades a product instance. For example, you can upgrade a
   * customer's `Business Unlimited Premium` plan to `Business VIP` using this
   * endpoint.
   *
   *
   * You must pass the ID of the Wix account that the product instance belongs
   * to in the header of the call. The call fails, if the product instance and
   * Wix account don't match.
   *
   * The customer has immediate access to new features, while losing access to
   * features not included in the new service. It's up to the reseller to
   * decide whether the adjustment affects the customer’s payment.
   *
   * You can only exchange a product instance with a service of the same type.
   * Contact the [Wix B2B sales team](mailto:bizdev@wix.com) for details about
   * which services belong to the same type.
   *
   * You must provide either a new `catalogProductId` or a new `billingInfo`
   * object. The new billing cycle must be supported for the product. Contact the
   * [Wix B2B sales team](mailto:bizdev@wix.com) for information
   * about which billing cycles are supported for each product. If you adjust the
   * billing cycle for a product instance with `RECURRING` payments, you must
   * also provide `billingInfo.cycleDuration.unit`.
   *
   * If a removed feature is a requirement for another service, that service
   * may not be available to the customer any longer. For example, if you downgrade a
   * `Business Unlimited` plan to `Business Basic`, the site owners won’t be
   * able to use `Pro eCommerce Features` any longer.
   *
   * > **Important**: This call requires an account level API key and cannot be
   * > authenticated with the standard authorization header.
   * @param instanceId - ID of the product instance to adjust.
   * @public
   * @documentationMaturity preview
   * @requiredField instanceId
   * @permissionId premium.reseller-package.manage
   * @adminMethod
   */
  function adjustProductInstanceSpecifications(instanceId: string, options?: AdjustProductInstanceSpecificationsOptions): Promise<AdjustProductInstanceSpecificationsResponse>;
  interface AdjustProductInstanceSpecificationsOptions {
      /** Idempotency key. */
      idempotencyKey?: string | null;
      /**
       * ID of the product to replace the original instance. Required in case you don't
       * provide a new `billingInfo` object.
       */
      catalogProductId?: string | null;
      /**
       * Information about the billing cycle. Required in case you don't provide a new
       * `catalogProductId`. The new billing cycle must be supported for the service.
       * Contact the [Wix B2B sales team](mailto:bizdev@wix.com) for
       * information about a service's supported billing cycles. If
       * you adjust the billing cycle for a product instance with `RECURRING`
       * payments, you must also provide `billingInfo.cycleDuration.unit`.
       */
      billingInfo?: ProductInstanceCycle;
      /**
       * Discount code indicating that the reseller provisioned the product instance
       * during a sale. In case you pass a code that isn't valid, the call succeeds and
       * no discount is applied to the product instance. Wix doesn't guarantee that a
       * discount code reduces the price between Wix and the reseller, even when it's
       * valid. You can't add a discount code after you've created the
       * product instance. Contact the [Wix B2B sales team](mailto:bizdev@wix.com) for
       * more information about supported codes.
       *
       * Max: 25 characters
       */
      discountCode?: string | null;
  }
  /**
   * Updates a package's external ID field.
   * @public
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.externalId
   * @requiredField identifiers.packageId
   * @permissionId PREMIUM.PACKAGE_UPDATE_EXTERNAL_ID
   * @adminMethod
   */
  function updatePackageExternalId(identifiers: UpdatePackageExternalIdIdentifiers): Promise<UpdatePackageExternalIdResponse>;
  interface UpdatePackageExternalIdIdentifiers {
      /** ID of the package to update. */
      packageId: string;
      /** External ID that will be assigned to the package. */
      externalId: string;
  }
  /** @internal
   * @documentationMaturity preview
   * @permissionId premium.reseller-package.read
   * @adminMethod
   */
  function countPackages(options?: CountPackagesOptions): Promise<CountPackagesResponse>;
  interface CountPackagesOptions {
      /** Filter on what packages to count */
      filter?: Record<string, any> | null;
  }
  
  type premiumResellerV1Packages_universal_d_Package = Package;
  type premiumResellerV1Packages_universal_d_ProductInstance = ProductInstance;
  type premiumResellerV1Packages_universal_d_ProductInstanceContractDetailsOneOf = ProductInstanceContractDetailsOneOf;
  type premiumResellerV1Packages_universal_d_FailureReasonFailureReason = FailureReasonFailureReason;
  const premiumResellerV1Packages_universal_d_FailureReasonFailureReason: typeof FailureReasonFailureReason;
  type premiumResellerV1Packages_universal_d_IntervalIntervalUnit = IntervalIntervalUnit;
  const premiumResellerV1Packages_universal_d_IntervalIntervalUnit: typeof IntervalIntervalUnit;
  type premiumResellerV1Packages_universal_d_CycleDescriptorType = CycleDescriptorType;
  const premiumResellerV1Packages_universal_d_CycleDescriptorType: typeof CycleDescriptorType;
  type premiumResellerV1Packages_universal_d_CycleInterval = CycleInterval;
  type premiumResellerV1Packages_universal_d_Status = Status;
  const premiumResellerV1Packages_universal_d_Status: typeof Status;
  type premiumResellerV1Packages_universal_d_FailureReason = FailureReason;
  type premiumResellerV1Packages_universal_d_ProductInstanceCycle = ProductInstanceCycle;
  type premiumResellerV1Packages_universal_d_MigrateSubscriptionToPackagesRequest = MigrateSubscriptionToPackagesRequest;
  type premiumResellerV1Packages_universal_d_MigrateSubscriptionToPackagesResponse = MigrateSubscriptionToPackagesResponse;
  type premiumResellerV1Packages_universal_d_FixBrokenMigrationRequest = FixBrokenMigrationRequest;
  type premiumResellerV1Packages_universal_d_FixBrokenMigrationResponse = FixBrokenMigrationResponse;
  type premiumResellerV1Packages_universal_d_CreatePackageRequest = CreatePackageRequest;
  type premiumResellerV1Packages_universal_d_CreatePackageResponse = CreatePackageResponse;
  type premiumResellerV1Packages_universal_d_CancelPackageRequest = CancelPackageRequest;
  type premiumResellerV1Packages_universal_d_CancelPackageResponse = CancelPackageResponse;
  type premiumResellerV1Packages_universal_d_PackageCanceled = PackageCanceled;
  type premiumResellerV1Packages_universal_d_GetPackageRequest = GetPackageRequest;
  type premiumResellerV1Packages_universal_d_GetPackageResponse = GetPackageResponse;
  type premiumResellerV1Packages_universal_d_QueryPackagesRequest = QueryPackagesRequest;
  type premiumResellerV1Packages_universal_d_QueryV2 = QueryV2;
  type premiumResellerV1Packages_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
  type premiumResellerV1Packages_universal_d_Sorting = Sorting;
  type premiumResellerV1Packages_universal_d_SortOrder = SortOrder;
  const premiumResellerV1Packages_universal_d_SortOrder: typeof SortOrder;
  type premiumResellerV1Packages_universal_d_Paging = Paging;
  type premiumResellerV1Packages_universal_d_CursorPaging = CursorPaging;
  type premiumResellerV1Packages_universal_d_QueryPackagesResponse = QueryPackagesResponse;
  type premiumResellerV1Packages_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type premiumResellerV1Packages_universal_d_Cursors = Cursors;
  type premiumResellerV1Packages_universal_d_AssignProductInstanceToSiteRequest = AssignProductInstanceToSiteRequest;
  type premiumResellerV1Packages_universal_d_AssignProductInstanceToSiteResponse = AssignProductInstanceToSiteResponse;
  type premiumResellerV1Packages_universal_d_AssignedProductInstanceToSite = AssignedProductInstanceToSite;
  type premiumResellerV1Packages_universal_d_UnassignProductInstanceFromSiteRequest = UnassignProductInstanceFromSiteRequest;
  type premiumResellerV1Packages_universal_d_UnassignProductInstanceFromSiteResponse = UnassignProductInstanceFromSiteResponse;
  type premiumResellerV1Packages_universal_d_UnassignedProductInstanceFromSite = UnassignedProductInstanceFromSite;
  type premiumResellerV1Packages_universal_d_CancelProductInstanceRequest = CancelProductInstanceRequest;
  type premiumResellerV1Packages_universal_d_CancelProductInstanceResponse = CancelProductInstanceResponse;
  type premiumResellerV1Packages_universal_d_ProductInstanceCanceled = ProductInstanceCanceled;
  type premiumResellerV1Packages_universal_d_AdjustProductInstanceSpecificationsRequest = AdjustProductInstanceSpecificationsRequest;
  type premiumResellerV1Packages_universal_d_AdjustProductInstanceSpecificationsResponse = AdjustProductInstanceSpecificationsResponse;
  type premiumResellerV1Packages_universal_d_AdjustedProductInstanceSpecifications = AdjustedProductInstanceSpecifications;
  type premiumResellerV1Packages_universal_d_SubscriptionEvent = SubscriptionEvent;
  type premiumResellerV1Packages_universal_d_SubscriptionEventEventOneOf = SubscriptionEventEventOneOf;
  type premiumResellerV1Packages_universal_d_SubscriptionCreated = SubscriptionCreated;
  type premiumResellerV1Packages_universal_d_Subscription = Subscription;
  type premiumResellerV1Packages_universal_d_BillingReference = BillingReference;
  type premiumResellerV1Packages_universal_d_ProviderName = ProviderName;
  const premiumResellerV1Packages_universal_d_ProviderName: typeof ProviderName;
  type premiumResellerV1Packages_universal_d_Cycle = Cycle;
  type premiumResellerV1Packages_universal_d_CycleCycleSelectorOneOf = CycleCycleSelectorOneOf;
  type premiumResellerV1Packages_universal_d_Interval = Interval;
  type premiumResellerV1Packages_universal_d_IntervalUnit = IntervalUnit;
  const premiumResellerV1Packages_universal_d_IntervalUnit: typeof IntervalUnit;
  type premiumResellerV1Packages_universal_d_OneTime = OneTime;
  type premiumResellerV1Packages_universal_d_SubscriptionStatus = SubscriptionStatus;
  const premiumResellerV1Packages_universal_d_SubscriptionStatus: typeof SubscriptionStatus;
  type premiumResellerV1Packages_universal_d_ReactivationData = ReactivationData;
  type premiumResellerV1Packages_universal_d_ReactivationReasonEnum = ReactivationReasonEnum;
  const premiumResellerV1Packages_universal_d_ReactivationReasonEnum: typeof ReactivationReasonEnum;
  type premiumResellerV1Packages_universal_d_SubscriptionAssigned = SubscriptionAssigned;
  type premiumResellerV1Packages_universal_d_SubscriptionCancelled = SubscriptionCancelled;
  type premiumResellerV1Packages_universal_d_CancellationDetails = CancellationDetails;
  type premiumResellerV1Packages_universal_d_Initiator = Initiator;
  const premiumResellerV1Packages_universal_d_Initiator: typeof Initiator;
  type premiumResellerV1Packages_universal_d_SubscriptionAutoRenewTurnedOn = SubscriptionAutoRenewTurnedOn;
  type premiumResellerV1Packages_universal_d_SubscriptionAutoRenewTurnedOff = SubscriptionAutoRenewTurnedOff;
  type premiumResellerV1Packages_universal_d_SubscriptionUnassigned = SubscriptionUnassigned;
  type premiumResellerV1Packages_universal_d_UnassignReason = UnassignReason;
  const premiumResellerV1Packages_universal_d_UnassignReason: typeof UnassignReason;
  type premiumResellerV1Packages_universal_d_SubscriptionTransferred = SubscriptionTransferred;
  type premiumResellerV1Packages_universal_d_RecurringChargeSucceeded = RecurringChargeSucceeded;
  type premiumResellerV1Packages_universal_d_ContractSwitched = ContractSwitched;
  type premiumResellerV1Packages_universal_d_ContractSwitchType = ContractSwitchType;
  const premiumResellerV1Packages_universal_d_ContractSwitchType: typeof ContractSwitchType;
  type premiumResellerV1Packages_universal_d_ContractSwitchReason = ContractSwitchReason;
  const premiumResellerV1Packages_universal_d_ContractSwitchReason: typeof ContractSwitchReason;
  type premiumResellerV1Packages_universal_d_ProductPriceIncreaseData = ProductPriceIncreaseData;
  type premiumResellerV1Packages_universal_d_PriceIncreaseTrigger = PriceIncreaseTrigger;
  const premiumResellerV1Packages_universal_d_PriceIncreaseTrigger: typeof PriceIncreaseTrigger;
  type premiumResellerV1Packages_universal_d_ProductAdjustment = ProductAdjustment;
  const premiumResellerV1Packages_universal_d_ProductAdjustment: typeof ProductAdjustment;
  type premiumResellerV1Packages_universal_d_SubscriptionNearEndOfPeriod = SubscriptionNearEndOfPeriod;
  type premiumResellerV1Packages_universal_d_SubscriptionPendingChange = SubscriptionPendingChange;
  type premiumResellerV1Packages_universal_d_Empty = Empty;
  type premiumResellerV1Packages_universal_d_ProductInstanceUpdated = ProductInstanceUpdated;
  type premiumResellerV1Packages_universal_d_DomainEvent = DomainEvent;
  type premiumResellerV1Packages_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type premiumResellerV1Packages_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type premiumResellerV1Packages_universal_d_RestoreInfo = RestoreInfo;
  type premiumResellerV1Packages_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type premiumResellerV1Packages_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type premiumResellerV1Packages_universal_d_ActionEvent = ActionEvent;
  type premiumResellerV1Packages_universal_d_FailureReportRequest = FailureReportRequest;
  type premiumResellerV1Packages_universal_d_ProductInstanceFailed = ProductInstanceFailed;
  type premiumResellerV1Packages_universal_d_Task = Task;
  type premiumResellerV1Packages_universal_d_TaskKey = TaskKey;
  type premiumResellerV1Packages_universal_d_TaskAction = TaskAction;
  type premiumResellerV1Packages_universal_d_TaskActionActionOneOf = TaskActionActionOneOf;
  type premiumResellerV1Packages_universal_d_Complete = Complete;
  type premiumResellerV1Packages_universal_d_Cancel = Cancel;
  type premiumResellerV1Packages_universal_d_Reschedule = Reschedule;
  type premiumResellerV1Packages_universal_d_UpdateProductInstanceRequest = UpdateProductInstanceRequest;
  type premiumResellerV1Packages_universal_d_FieldToUpdate = FieldToUpdate;
  const premiumResellerV1Packages_universal_d_FieldToUpdate: typeof FieldToUpdate;
  type premiumResellerV1Packages_universal_d_UpdateProductInstanceResponse = UpdateProductInstanceResponse;
  type premiumResellerV1Packages_universal_d_UpdatePackageExternalIdRequest = UpdatePackageExternalIdRequest;
  type premiumResellerV1Packages_universal_d_UpdatePackageExternalIdResponse = UpdatePackageExternalIdResponse;
  type premiumResellerV1Packages_universal_d_CountPackagesRequest = CountPackagesRequest;
  type premiumResellerV1Packages_universal_d_CountPackagesResponse = CountPackagesResponse;
  type premiumResellerV1Packages_universal_d_MessageEnvelope = MessageEnvelope;
  type premiumResellerV1Packages_universal_d_IdentificationData = IdentificationData;
  type premiumResellerV1Packages_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type premiumResellerV1Packages_universal_d_WebhookIdentityType = WebhookIdentityType;
  const premiumResellerV1Packages_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const premiumResellerV1Packages_universal_d_createPackage: typeof createPackage;
  type premiumResellerV1Packages_universal_d_CreatePackageOptions = CreatePackageOptions;
  const premiumResellerV1Packages_universal_d_createPackageV2: typeof createPackageV2;
  type premiumResellerV1Packages_universal_d_CreatePackageV2Options = CreatePackageV2Options;
  const premiumResellerV1Packages_universal_d_cancelPackage: typeof cancelPackage;
  type premiumResellerV1Packages_universal_d_CancelPackageOptions = CancelPackageOptions;
  const premiumResellerV1Packages_universal_d_getPackage: typeof getPackage;
  const premiumResellerV1Packages_universal_d_queryPackages: typeof queryPackages;
  type premiumResellerV1Packages_universal_d_PackagesQueryResult = PackagesQueryResult;
  type premiumResellerV1Packages_universal_d_PackagesQueryBuilder = PackagesQueryBuilder;
  const premiumResellerV1Packages_universal_d_assignProductInstanceToSite: typeof assignProductInstanceToSite;
  type premiumResellerV1Packages_universal_d_AssignProductInstanceToSiteIdentifiers = AssignProductInstanceToSiteIdentifiers;
  type premiumResellerV1Packages_universal_d_AssignProductInstanceToSiteOptions = AssignProductInstanceToSiteOptions;
  const premiumResellerV1Packages_universal_d_unassignProductInstanceFromSite: typeof unassignProductInstanceFromSite;
  type premiumResellerV1Packages_universal_d_UnassignProductInstanceFromSiteOptions = UnassignProductInstanceFromSiteOptions;
  const premiumResellerV1Packages_universal_d_cancelProductInstance: typeof cancelProductInstance;
  type premiumResellerV1Packages_universal_d_CancelProductInstanceOptions = CancelProductInstanceOptions;
  const premiumResellerV1Packages_universal_d_adjustProductInstanceSpecifications: typeof adjustProductInstanceSpecifications;
  type premiumResellerV1Packages_universal_d_AdjustProductInstanceSpecificationsOptions = AdjustProductInstanceSpecificationsOptions;
  const premiumResellerV1Packages_universal_d_updatePackageExternalId: typeof updatePackageExternalId;
  type premiumResellerV1Packages_universal_d_UpdatePackageExternalIdIdentifiers = UpdatePackageExternalIdIdentifiers;
  const premiumResellerV1Packages_universal_d_countPackages: typeof countPackages;
  type premiumResellerV1Packages_universal_d_CountPackagesOptions = CountPackagesOptions;
  namespace premiumResellerV1Packages_universal_d {
    export {
      premiumResellerV1Packages_universal_d_Package as Package,
      premiumResellerV1Packages_universal_d_ProductInstance as ProductInstance,
      premiumResellerV1Packages_universal_d_ProductInstanceContractDetailsOneOf as ProductInstanceContractDetailsOneOf,
      premiumResellerV1Packages_universal_d_FailureReasonFailureReason as FailureReasonFailureReason,
      premiumResellerV1Packages_universal_d_IntervalIntervalUnit as IntervalIntervalUnit,
      premiumResellerV1Packages_universal_d_CycleDescriptorType as CycleDescriptorType,
      premiumResellerV1Packages_universal_d_CycleInterval as CycleInterval,
      premiumResellerV1Packages_universal_d_Status as Status,
      premiumResellerV1Packages_universal_d_FailureReason as FailureReason,
      premiumResellerV1Packages_universal_d_ProductInstanceCycle as ProductInstanceCycle,
      premiumResellerV1Packages_universal_d_MigrateSubscriptionToPackagesRequest as MigrateSubscriptionToPackagesRequest,
      premiumResellerV1Packages_universal_d_MigrateSubscriptionToPackagesResponse as MigrateSubscriptionToPackagesResponse,
      premiumResellerV1Packages_universal_d_FixBrokenMigrationRequest as FixBrokenMigrationRequest,
      premiumResellerV1Packages_universal_d_FixBrokenMigrationResponse as FixBrokenMigrationResponse,
      premiumResellerV1Packages_universal_d_CreatePackageRequest as CreatePackageRequest,
      premiumResellerV1Packages_universal_d_CreatePackageResponse as CreatePackageResponse,
      premiumResellerV1Packages_universal_d_CancelPackageRequest as CancelPackageRequest,
      premiumResellerV1Packages_universal_d_CancelPackageResponse as CancelPackageResponse,
      premiumResellerV1Packages_universal_d_PackageCanceled as PackageCanceled,
      premiumResellerV1Packages_universal_d_GetPackageRequest as GetPackageRequest,
      premiumResellerV1Packages_universal_d_GetPackageResponse as GetPackageResponse,
      premiumResellerV1Packages_universal_d_QueryPackagesRequest as QueryPackagesRequest,
      premiumResellerV1Packages_universal_d_QueryV2 as QueryV2,
      premiumResellerV1Packages_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf,
      premiumResellerV1Packages_universal_d_Sorting as Sorting,
      premiumResellerV1Packages_universal_d_SortOrder as SortOrder,
      premiumResellerV1Packages_universal_d_Paging as Paging,
      premiumResellerV1Packages_universal_d_CursorPaging as CursorPaging,
      premiumResellerV1Packages_universal_d_QueryPackagesResponse as QueryPackagesResponse,
      premiumResellerV1Packages_universal_d_PagingMetadataV2 as PagingMetadataV2,
      premiumResellerV1Packages_universal_d_Cursors as Cursors,
      premiumResellerV1Packages_universal_d_AssignProductInstanceToSiteRequest as AssignProductInstanceToSiteRequest,
      premiumResellerV1Packages_universal_d_AssignProductInstanceToSiteResponse as AssignProductInstanceToSiteResponse,
      premiumResellerV1Packages_universal_d_AssignedProductInstanceToSite as AssignedProductInstanceToSite,
      premiumResellerV1Packages_universal_d_UnassignProductInstanceFromSiteRequest as UnassignProductInstanceFromSiteRequest,
      premiumResellerV1Packages_universal_d_UnassignProductInstanceFromSiteResponse as UnassignProductInstanceFromSiteResponse,
      premiumResellerV1Packages_universal_d_UnassignedProductInstanceFromSite as UnassignedProductInstanceFromSite,
      premiumResellerV1Packages_universal_d_CancelProductInstanceRequest as CancelProductInstanceRequest,
      premiumResellerV1Packages_universal_d_CancelProductInstanceResponse as CancelProductInstanceResponse,
      premiumResellerV1Packages_universal_d_ProductInstanceCanceled as ProductInstanceCanceled,
      premiumResellerV1Packages_universal_d_AdjustProductInstanceSpecificationsRequest as AdjustProductInstanceSpecificationsRequest,
      premiumResellerV1Packages_universal_d_AdjustProductInstanceSpecificationsResponse as AdjustProductInstanceSpecificationsResponse,
      premiumResellerV1Packages_universal_d_AdjustedProductInstanceSpecifications as AdjustedProductInstanceSpecifications,
      premiumResellerV1Packages_universal_d_SubscriptionEvent as SubscriptionEvent,
      premiumResellerV1Packages_universal_d_SubscriptionEventEventOneOf as SubscriptionEventEventOneOf,
      premiumResellerV1Packages_universal_d_SubscriptionCreated as SubscriptionCreated,
      premiumResellerV1Packages_universal_d_Subscription as Subscription,
      premiumResellerV1Packages_universal_d_BillingReference as BillingReference,
      premiumResellerV1Packages_universal_d_ProviderName as ProviderName,
      premiumResellerV1Packages_universal_d_Cycle as Cycle,
      premiumResellerV1Packages_universal_d_CycleCycleSelectorOneOf as CycleCycleSelectorOneOf,
      premiumResellerV1Packages_universal_d_Interval as Interval,
      premiumResellerV1Packages_universal_d_IntervalUnit as IntervalUnit,
      premiumResellerV1Packages_universal_d_OneTime as OneTime,
      premiumResellerV1Packages_universal_d_SubscriptionStatus as SubscriptionStatus,
      premiumResellerV1Packages_universal_d_ReactivationData as ReactivationData,
      premiumResellerV1Packages_universal_d_ReactivationReasonEnum as ReactivationReasonEnum,
      premiumResellerV1Packages_universal_d_SubscriptionAssigned as SubscriptionAssigned,
      premiumResellerV1Packages_universal_d_SubscriptionCancelled as SubscriptionCancelled,
      premiumResellerV1Packages_universal_d_CancellationDetails as CancellationDetails,
      premiumResellerV1Packages_universal_d_Initiator as Initiator,
      premiumResellerV1Packages_universal_d_SubscriptionAutoRenewTurnedOn as SubscriptionAutoRenewTurnedOn,
      premiumResellerV1Packages_universal_d_SubscriptionAutoRenewTurnedOff as SubscriptionAutoRenewTurnedOff,
      premiumResellerV1Packages_universal_d_SubscriptionUnassigned as SubscriptionUnassigned,
      premiumResellerV1Packages_universal_d_UnassignReason as UnassignReason,
      premiumResellerV1Packages_universal_d_SubscriptionTransferred as SubscriptionTransferred,
      premiumResellerV1Packages_universal_d_RecurringChargeSucceeded as RecurringChargeSucceeded,
      premiumResellerV1Packages_universal_d_ContractSwitched as ContractSwitched,
      premiumResellerV1Packages_universal_d_ContractSwitchType as ContractSwitchType,
      premiumResellerV1Packages_universal_d_ContractSwitchReason as ContractSwitchReason,
      premiumResellerV1Packages_universal_d_ProductPriceIncreaseData as ProductPriceIncreaseData,
      premiumResellerV1Packages_universal_d_PriceIncreaseTrigger as PriceIncreaseTrigger,
      premiumResellerV1Packages_universal_d_ProductAdjustment as ProductAdjustment,
      premiumResellerV1Packages_universal_d_SubscriptionNearEndOfPeriod as SubscriptionNearEndOfPeriod,
      premiumResellerV1Packages_universal_d_SubscriptionPendingChange as SubscriptionPendingChange,
      premiumResellerV1Packages_universal_d_Empty as Empty,
      premiumResellerV1Packages_universal_d_ProductInstanceUpdated as ProductInstanceUpdated,
      premiumResellerV1Packages_universal_d_DomainEvent as DomainEvent,
      premiumResellerV1Packages_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      premiumResellerV1Packages_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      premiumResellerV1Packages_universal_d_RestoreInfo as RestoreInfo,
      premiumResellerV1Packages_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      premiumResellerV1Packages_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      premiumResellerV1Packages_universal_d_ActionEvent as ActionEvent,
      premiumResellerV1Packages_universal_d_FailureReportRequest as FailureReportRequest,
      premiumResellerV1Packages_universal_d_ProductInstanceFailed as ProductInstanceFailed,
      premiumResellerV1Packages_universal_d_Task as Task,
      premiumResellerV1Packages_universal_d_TaskKey as TaskKey,
      premiumResellerV1Packages_universal_d_TaskAction as TaskAction,
      premiumResellerV1Packages_universal_d_TaskActionActionOneOf as TaskActionActionOneOf,
      premiumResellerV1Packages_universal_d_Complete as Complete,
      premiumResellerV1Packages_universal_d_Cancel as Cancel,
      premiumResellerV1Packages_universal_d_Reschedule as Reschedule,
      premiumResellerV1Packages_universal_d_UpdateProductInstanceRequest as UpdateProductInstanceRequest,
      premiumResellerV1Packages_universal_d_FieldToUpdate as FieldToUpdate,
      premiumResellerV1Packages_universal_d_UpdateProductInstanceResponse as UpdateProductInstanceResponse,
      premiumResellerV1Packages_universal_d_UpdatePackageExternalIdRequest as UpdatePackageExternalIdRequest,
      premiumResellerV1Packages_universal_d_UpdatePackageExternalIdResponse as UpdatePackageExternalIdResponse,
      premiumResellerV1Packages_universal_d_CountPackagesRequest as CountPackagesRequest,
      premiumResellerV1Packages_universal_d_CountPackagesResponse as CountPackagesResponse,
      premiumResellerV1Packages_universal_d_MessageEnvelope as MessageEnvelope,
      premiumResellerV1Packages_universal_d_IdentificationData as IdentificationData,
      premiumResellerV1Packages_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      premiumResellerV1Packages_universal_d_WebhookIdentityType as WebhookIdentityType,
      premiumResellerV1Packages_universal_d_createPackage as createPackage,
      premiumResellerV1Packages_universal_d_CreatePackageOptions as CreatePackageOptions,
      premiumResellerV1Packages_universal_d_createPackageV2 as createPackageV2,
      premiumResellerV1Packages_universal_d_CreatePackageV2Options as CreatePackageV2Options,
      premiumResellerV1Packages_universal_d_cancelPackage as cancelPackage,
      premiumResellerV1Packages_universal_d_CancelPackageOptions as CancelPackageOptions,
      premiumResellerV1Packages_universal_d_getPackage as getPackage,
      premiumResellerV1Packages_universal_d_queryPackages as queryPackages,
      premiumResellerV1Packages_universal_d_PackagesQueryResult as PackagesQueryResult,
      premiumResellerV1Packages_universal_d_PackagesQueryBuilder as PackagesQueryBuilder,
      premiumResellerV1Packages_universal_d_assignProductInstanceToSite as assignProductInstanceToSite,
      premiumResellerV1Packages_universal_d_AssignProductInstanceToSiteIdentifiers as AssignProductInstanceToSiteIdentifiers,
      premiumResellerV1Packages_universal_d_AssignProductInstanceToSiteOptions as AssignProductInstanceToSiteOptions,
      premiumResellerV1Packages_universal_d_unassignProductInstanceFromSite as unassignProductInstanceFromSite,
      premiumResellerV1Packages_universal_d_UnassignProductInstanceFromSiteOptions as UnassignProductInstanceFromSiteOptions,
      premiumResellerV1Packages_universal_d_cancelProductInstance as cancelProductInstance,
      premiumResellerV1Packages_universal_d_CancelProductInstanceOptions as CancelProductInstanceOptions,
      premiumResellerV1Packages_universal_d_adjustProductInstanceSpecifications as adjustProductInstanceSpecifications,
      premiumResellerV1Packages_universal_d_AdjustProductInstanceSpecificationsOptions as AdjustProductInstanceSpecificationsOptions,
      premiumResellerV1Packages_universal_d_updatePackageExternalId as updatePackageExternalId,
      premiumResellerV1Packages_universal_d_UpdatePackageExternalIdIdentifiers as UpdatePackageExternalIdIdentifiers,
      premiumResellerV1Packages_universal_d_countPackages as countPackages,
      premiumResellerV1Packages_universal_d_CountPackagesOptions as CountPackagesOptions,
    };
  }
  
  export { premiumResellerV1Packages_universal_d as packages };
}
