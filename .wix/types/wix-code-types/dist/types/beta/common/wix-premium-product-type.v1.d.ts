declare module "wix-premium-product-type.v1" {
  /** Business proposition that holds all related products. Products maybe organized in families. */
  interface ProductType {
      /**
       * ID of the product type.
       * @readonly
       */
      _id?: string | null;
      /**
       * Name of the product type. Only visible to customers in case the product type name isn't
       * provided in the [Display Attributes](https://dev.wix.com/docs/rest/internal-only/premium/premium-display-manager/introduction).
       *
       * Max: 50 characters
       */
      name?: string | null;
      /**
       * Information about the product type
       * [settings](https://bo.wix.com/wix-docs/rest/premium/premium-product-catalog-v2/settings/product-settings-object).
       * Includes which billing cycles and
       * payment options are supported, how products can be canceled,
       * and in which situations customers get notified.
       * Used as deafult for all product families and products belonging to the type,
       * unless you specify `settingsOverride` for them. You may check the product's
       * `computedSettings` to see which settings are ultimately used.
       */
      settings?: ProductSettings;
      /**
       * Revision number, which increments by 1 each time the product type is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the product type.
       *
       * Ignored when creating a product type.
       */
      revision?: string | null;
      /**
       * Date and time the product type was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the product type was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  /**
   * The `productSettings` object contains information about which billing cycles
   * and payment methods are supported, as well as the cancelation policy and
   * customer notifications. You may, but you don't have to create settings for a
   * product. If you don't, the settings are inherited from the product family (or
   * the type if the family has no settings either). If you create settings
   * for a product, they override the settings of the type and family.
   */
  interface ProductSettings extends ProductSettingsCancellationPolicyOptionsOneOf, ProductSettingsNotificationsConfigurationOptionsOneOf, ProductSettingsSupportedPaymentConfigurationOptionsOneOf, ProductSettingsCompatibleCyclesConfigurationOptionsOneOf, ProductSettingsFreeTrialConfigurationOptionsOneOf {
      /**
       * Information about the subscription's refund policy. Available only when
       * `cancellationPolicy` is set to `OFFICIAL_MONEY_BACK_POLICY`.
       */
      officialMoneyBackPolicyOptions?: OfficialMoneyBackPolicy;
      /**
       * Events for which the customer receives notifications.
       * Available only when `notificationsConfiguration` is set to
       * `NOTIFICATION_SETTINGS`.
       */
      notificationSettingsOptions?: NotificationSettings;
      /**
       * Information about the payment methods the customer can use. Available only
       * when `supported_payment_configuration` is set to `SUPPORTED_PAYMENT_TYPES`.
       * Specified payment methods may not be available to the customer if they
       * aren't supported for the given currency and country code.
       */
      supportedPaymentTypesOptions?: RestrictingPaymentFilter;
      /**
       * Information about the billing cycles the customer can choose. Available only
       * when `compatible_cycles_configuration` is set to `COMPATIBLE_CYCLES`.
       */
      compatibleCyclesOptions?: CompatibleCycles;
      /**
       * Configuration of the free trial policy for the product. Available only
       * when `freeTrialConfiguration` is set to `FREE_TRIAL`.
       */
      freeTrialOptions?: FreeTrialOptions;
      /**
       * Cancelation policy for the product, product family, or product type.
       *
       * - `INHERIT_CANCELLATION_POLICY`: The customer may cancel a subscription according to the family's or type's cancelation policy.
       * - `NO_MONEY_BACK`: The customer can't cancel a subscription to receive a refund. They may choose to not renew the subscription effective for the next billing cycle.
       * - `OFFICIAL_MONEY_BACK_POLICY`: The customer may cancel a subscription to receive a full refund during the `officialMoneyBackPolicyOptions.trialDays`.
       */
      cancellationPolicy?: CancellationPolicy;
      /**
       * Events for which the customer receives notifications.
       * Notifications are sent using the [Ping API](https://dev.wix.com/docs/rest/api-reference/wix-notifications/notifications/introduction).
       *
       * + `INHERIT_NOTIFICATION_POLICY`: The customer receives notifications according to the family's or type's notification settings.
       * + `NO_NOTIFICATIONS`: The customer doesn't receive any notifications.
       * + `NOTIFICATION_SETTINGS`: The customer receives notifications for the events specified in the `notification_settings_options`.
       */
      notificationsConfiguration?: NotificationsConfiguration;
      /**
       * Information about which payment methods are supported. Payment methods are
       * automatically filtered based on the currency and the country code.
       *
       * + `INHERIT_SUPPORTED_PAYMENT_CONFIGURATION`: The customer can use any payment method specified in the family's or type's payment settings.
       * + `SUPPORTED_PAYMENT_TYPES`: The customer can use any payment method specified in the `supportedPaymentConfiguration`.
       * + `ALL_TYPES`: The customer can pay with any payment method.
       */
      supportedPaymentConfiguration?: SupportedPaymentConfiguration;
      /**
       * Information about which billing cycles are supported.
       *
       * + `INHERIT_COMPATIBLE_CYCLES_CONFIGURATION`: The customer can choose any billing cycle specified in the family's or type's settings.
       * + `COMPATIBLE_CYCLES`: The customer can choose any billing cycle specified in the `compatible_cycles_options`.
       * + `ALL_CYCLES`: The customer can choose any billing cycle.
       *
       * Default: `INHERIT_COMPATIBLE_CYCLES_CONFIGURATION`
       */
      compatibleCyclesConfiguration?: CompatibleCyclesConfiguration;
      /**
       * Information about what customers may do with the product instance.
       *
       * Default: The settings of the family or type apply.
       */
      allowedActions?: SubscriptionActions;
      /**
       * Information about whether the product is associated with a Wix account or a
       * Wix site, and whether multiple instances of the same product can be assigned
       * to the same account or site.
       */
      contextCapabilities?: ContextCapabilities;
      /**
       * Information about whether customers may change the billing cycle at the end
       * of the current cycle.
       *
       * Default: The settings of the family or type apply.
       */
      allowedSubscriptionChanges?: SubscriptionChanges;
      /**
       * Configuration of the free trial policy for the product.
       * + `INHERIT_FREE_TRIAL_CONFIGURATION`: The customer may use a free trial according to the family's or type's free trial settings.
       * + `NO_FREE_TRIAL`: The customer can't use a free trial.
       * + `FREE_TRIAL`: The customer may use a free trial according to the `free_trial_options`.
       */
      freeTrialConfiguration?: FreeTrialConfiguration;
      /** dealer placements */
      placements?: Placements;
      /** purchase prerequisites */
      purchasePrerequisites?: PurchasePrerequisites;
  }
  /** @oneof */
  interface ProductSettingsCancellationPolicyOptionsOneOf {
      /**
       * Information about the subscription's refund policy. Available only when
       * `cancellationPolicy` is set to `OFFICIAL_MONEY_BACK_POLICY`.
       */
      officialMoneyBackPolicyOptions?: OfficialMoneyBackPolicy;
  }
  /** @oneof */
  interface ProductSettingsNotificationsConfigurationOptionsOneOf {
      /**
       * Events for which the customer receives notifications.
       * Available only when `notificationsConfiguration` is set to
       * `NOTIFICATION_SETTINGS`.
       */
      notificationSettingsOptions?: NotificationSettings;
  }
  /** @oneof */
  interface ProductSettingsSupportedPaymentConfigurationOptionsOneOf {
      /**
       * Information about the payment methods the customer can use. Available only
       * when `supported_payment_configuration` is set to `SUPPORTED_PAYMENT_TYPES`.
       * Specified payment methods may not be available to the customer if they
       * aren't supported for the given currency and country code.
       */
      supportedPaymentTypesOptions?: RestrictingPaymentFilter;
  }
  /** @oneof */
  interface ProductSettingsCompatibleCyclesConfigurationOptionsOneOf {
      /**
       * Information about the billing cycles the customer can choose. Available only
       * when `compatible_cycles_configuration` is set to `COMPATIBLE_CYCLES`.
       */
      compatibleCyclesOptions?: CompatibleCycles;
  }
  /** @oneof */
  interface ProductSettingsFreeTrialConfigurationOptionsOneOf {
      /**
       * Configuration of the free trial policy for the product. Available only
       * when `freeTrialConfiguration` is set to `FREE_TRIAL`.
       */
      freeTrialOptions?: FreeTrialOptions;
  }
  enum CancellationPolicy {
      INHERIT_CANCELLATION_POLICY = "INHERIT_CANCELLATION_POLICY",
      NO_MONEY_BACK = "NO_MONEY_BACK",
      OFFICIAL_MONEY_BACK_POLICY = "OFFICIAL_MONEY_BACK_POLICY"
  }
  /** User may cancel the subscription during the trial period defined below and get *full refund* for the purchase. */
  interface OfficialMoneyBackPolicy {
      /**
       * Number of days during which the customer may cancel the subscription and
       * receive a full refund.
       */
      trialDays?: number;
  }
  enum NotificationsConfiguration {
      INHERIT_NOTIFICATION_CONFIGURATION = "INHERIT_NOTIFICATION_CONFIGURATION",
      NO_NOTIFICATIONS = "NO_NOTIFICATIONS",
      NOTIFICATION_SETTINGS = "NOTIFICATION_SETTINGS"
  }
  interface NotificationSettings {
      /**
       * Information about the
       * [Ping messages](https://dev.wix.com/docs/rest/internal-only/premium/premium-product-catalog-v2/ping-notifications)
       * that are sent to the customer, including for which events they're sent.
       * Learn more about [how to set up your templates](https://dev.wix.com/docs/rest/internal-only/premium/premium-product-catalog-v2/ping-notifications)
       * in coordination with Email Marketing.
       */
      templateSettings?: NotificationTemplateSettings[];
  }
  interface NotificationTemplateSettings {
      /**
       * Event that triggers sending the notification. Learn more about the
       * [supported notification types](https://dev.wix.com/docs/rest/internal-only/premium/premium-product-catalog-v2/ping-notifications#supported-notification-types-and-parameters).
       */
      notificationType?: NotificationTypes;
      /**
       * Name of your
       * [Ping template](https://dev.wix.com/docs/rest/api-reference/wix-notifications/notifications/creating-a-notification-template)
       * used for this notification type.
       *
       * Min: 2 characters
       * Max: 50 characters (Ping template service DB limitation)
       */
      pingTemplateId?: string;
      /** List of events that resolve the original notification. */
      resolvedBy?: NotificationResolver[];
      /**
       * List of scheduled notifications. Scheduled notifications aren't sent
       * outside the specified schedule. If an event happens during the forbidden
       * time period, the message is sent at the bigging of the next allowed period.
       * For example, this prevents that customers receive notifications in the
       * middle of the night or on the weekend.
       */
      scheduledNotifications?: ScheduledNotification[];
  }
  enum NotificationTypes {
      /** TODO add validation */
      UNKNOWN = "UNKNOWN",
      /**
       * Notification when a subscription is created.
       * See `InitialPurchaseParams` for list of available parameters
       */
      CREATED = "CREATED",
      /**
       * Notification when a subscription is about to be renewed
       * Only applicable for subscriptions with auto-recurring _enabled_.
       * Number of days before actual renewal to trigger this notification is configured in SBS.
       * See `NearRenewalParams` for list of available parameters
       */
      ABOUT_TO_BE_RENEWED = "ABOUT_TO_BE_RENEWED",
      /**
       * Notification when a subscription is about to be expired.
       * Only applicable for subscriptions with auto-recurring _disabled_.
       * Number of days before actual renewal to trigger this notification is configured in SBS.
       * See `NearExpirationParams` for list of available parameters
       */
      ABOUT_TO_EXPIRE = "ABOUT_TO_EXPIRE",
      /**
       * Notification when a *recurring* charge has succeeded.
       * This event means that the subscription has been extended for an additional cycle.
       * See `RecurringChargeSuccessParams` for list of available parameters
       */
      RECURRING_SUCCESS = "RECURRING_SUCCESS",
      /**
       * Notification when the auto-recurring is disabled
       * See `AutoRenewOffParams` for list of available parameters
       */
      AUTO_RENEW_TURNED_OFF = "AUTO_RENEW_TURNED_OFF",
      /**
       * Notification when a subscription is cancelled by the user.
       * See `CancelImmediateByUserParams` for list of available parameters
       */
      CANCELLED_BY_USER = "CANCELLED_BY_USER",
      /**
       * Notification when the subscription is cancelled due to payment problems
       * See `CancelDueToPaymentProblemsParams` for list of available parameters
       */
      CANCELLED_PAYMENT_PROBLEMS = "CANCELLED_PAYMENT_PROBLEMS",
      /**
       * Notification when there is no active billing account for the subscription
       * See `NoActiveBillingAccountParams` for list of available parameters
       */
      NO_ACTIVE_BILLING_ACCOUNT = "NO_ACTIVE_BILLING_ACCOUNT",
      /**
       * Notification when a *recurring* charge has failed (there are several attempts before giving up and cancelling the subscription).
       * See `ChargeFailureParams` for list of available parameters
       */
      CHARGE_FAILURE = "CHARGE_FAILURE",
      /**
       * Notification when there has been a charge back
       * See `ChargebackParams` for list of available parameters
       */
      CHARGEBACK = "CHARGEBACK",
      /**
       * Notification for manual recurring reminder.
       * Only applicable for subscriptions that have manual payment methods
       * See `ManualRecurringReminderParams` for list of available parameters
       */
      MANUAL_RECURRING_REMINDER = "MANUAL_RECURRING_REMINDER",
      /**
       * Notification when waiting for offline payment.
       * Only applicable for SEPA payment methods when invoice status is "PAYMENT_IN_PROGRESS"
       * See `OfflinePaymentParams` for list of available parameters
       */
      OFFLINE_PAYMENT = "OFFLINE_PAYMENT",
      /**
       * Notification when switching the contract of a subscription
       * See `SwitchContractParams` for list of available parameters
       */
      SWITCH_CONTRACT = "SWITCH_CONTRACT",
      /**
       * Notification when SBS service was transferred to a different owner
       * See `TransferServiceParams` for list of available parameters
       */
      TRANSFER_SERVICE = "TRANSFER_SERVICE",
      /**
       * Notification when Ping alert has been dismissed by the user: used to resolve existing
       * Ping notifications for a subscription
       */
      ALERT_DISMISSED = "ALERT_DISMISSED",
      /** Notification when a pending change was requested for a subscription */
      PENDING_CHANGE_REQUESTED = "PENDING_CHANGE_REQUESTED",
      /**
       * Notification when a pending change was applied,
       * sent on a recurring success after the subscription had a pending change (which was applied)
       */
      PENDING_CHANGE_APPLIED = "PENDING_CHANGE_APPLIED",
      /**
       * Notification on near renewal when there is a pending change,
       * sent on near renewal when there is a pending change (which will be applied)
       */
      PENDING_CHANGE_NEAR_RENEWAL = "PENDING_CHANGE_NEAR_RENEWAL",
      /**
       * Notification when the auto-recurring is enabled
       * See `AutoRenewOnParams` for list of available parameters
       */
      AUTO_RENEW_TURNED_ON = "AUTO_RENEW_TURNED_ON",
      /**
       * Notification when doing a price increase
       * See `PriceIncreaseParams` for list of available parameters
       */
      PRICE_INCREASE = "PRICE_INCREASE",
      /**
       * Notification when subscription expired (cancelled and autorenew is off)
       * See `SubscriptionExpirationParams` for list of available parameters
       */
      SUBSCRIPTION_EXPIRATION = "SUBSCRIPTION_EXPIRATION"
  }
  interface NotificationResolver {
      /**
       * The events that resolve the original notification. See
       * [supported notification types](https://dev.wix.com/docs/rest/internal-only/premium/premium-product-catalog-v2/ping-notifications#supported-notification-types-and-parameters)
       * for more information about the trigger event and which Ping parameters
       * you can use in your emails for each type.
       */
      notificationType?: NotificationTypes;
  }
  interface ScheduledNotification {
      /**
       * Name of your
       * [Ping template](https://dev.wix.com/docs/rest/api-reference/wix-notifications/notifications/creating-a-notification-template)
       * used for this scheduled notification.
       *
       * Min: 2 characters
       * Max: 50 characters (Ping template service DB limitation)
       */
      scheduledPingTemplateId?: string;
      /**
       * Information about the time periods during which notifications can be sent to
       * the customer. The times are based on the time zone that belongs to the
       * corresponding subscription's
       * [billing adress](https://dev.wix.com/docs/rest/internal-only/premium/subscriptions-by-billing-by-wix/subscription-object).
       */
      schedule?: TimeRangeSchedule;
  }
  interface TimeRangeSchedule {
      /**
       * Day of the week that starts the supported time frame. For example, `MONDAY`
       * if you want to sent notifications to customers from Monday to Friday, but
       * not on Saturday or Sunday.
       */
      startOfWeek?: ScheduledDay;
      /**
       * Day of the week that ends the supported time frame. For example, `FRIDAY`
       * if you want to sent notifications to customers from Monday to Friday, but
       * not on Saturday or Sunday.
       */
      endOfWeek?: ScheduledDay;
      /**
       * Earliest time the event's message is sent to the customer. For example,
       * `7` if you don't want to send emails to customers before 7 AM. If an event
       * that triggers a customer notification happens before 7 AM, the notification
       * is sent at 7 AM on the next supported day.
       *
       * Min: `0`
       * Max: `23`
       */
      workingHoursStart?: number;
      /**
       * Latest time the event's message is sent to the customer. For example,
       * `21` if you don't want to send emails to customers after 9 PM. If an event
       * that triggers a customer notification happens after 9 PM, the notification
       * is sent when the next supported time period begins.
       *
       * Min: `0`
       * Max: `23`
       */
      workingHoursEnd?: number;
  }
  enum ScheduledDay {
      UNKNOWN = "UNKNOWN",
      SUNDAY = "SUNDAY",
      MONDAY = "MONDAY",
      TUESDAY = "TUESDAY",
      WEDNESDAY = "WEDNESDAY",
      THURSDAY = "THURSDAY",
      FRIDAY = "FRIDAY",
      SATURDAY = "SATURDAY"
  }
  enum SupportedPaymentConfiguration {
      INHERIT_SUPPORTED_PAYMENT_CONFIGURATION = "INHERIT_SUPPORTED_PAYMENT_CONFIGURATION",
      SUPPORTED_PAYMENT_TYPES = "SUPPORTED_PAYMENT_TYPES",
      ALL_TYPES = "ALL_TYPES"
  }
  interface RestrictingPaymentFilter {
      /** List of all supported payment methods. */
      paymentFilters?: PaymentFilters;
  }
  interface PaymentFilters {
      /** please add to list the payment types only if you want to limit the options of payments in checkout. */
      paymentType?: PaymentType[];
  }
  enum PaymentType {
      /** fallback value */
      UNKNOWN = "UNKNOWN",
      /** allow recurring payments */
      RECURRING = "RECURRING",
      /** real time answer of transaction */
      REAL_TIME = "REAL_TIME"
  }
  enum CompatibleCyclesConfiguration {
      INHERIT_COMPATIBLE_CYCLES_CONFIGURATION = "INHERIT_COMPATIBLE_CYCLES_CONFIGURATION",
      COMPATIBLE_CYCLES = "COMPATIBLE_CYCLES",
      ALL_CYCLES = "ALL_CYCLES"
  }
  interface CompatibleCycles {
      /** List of all supported billing cycles. */
      cycles?: Cycle[];
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
  interface SubscriptionActions {
      /**
       * Whether the customer can transfer the subscription to another account.
       * If set to `true`, `allowDisconnectFromContext` must be set to `true`
       * as well.
       *
       * Default: `false`
       */
      allowTransferToAnotherAccount?: boolean | null;
      /**
       * Whether the customer can disconnect the subscription from the Wix account or
       * site. If set to `true`, `allowConnectToAnotherContext` must be set to `true`
       * as well.
       *
       * Default: `false`
       */
      allowDisconnectFromContext?: boolean | null;
      /**
       * Whether the customer can set the subscription's renewal status to `false`.
       * Applies only when the subscription's payment method is set to `recurring`.
       *
       * Default: `false`
       */
      disallowAutoRenewOff?: boolean | null;
      /**
       * Whether the customer can connect the subscription to another Wix account or
       * site. Must be `true` when `allow_disconnect_from_context` is set to `true`.
       *
       * Default: `false`
       */
      allowConnectToAnotherContext?: boolean | null;
  }
  interface ContextCapabilities {
      /**
       * Whether you can assign multiple subscriptions for the same product to
       * a single Wix account or site.
       *
       * Default: `false`
       */
      allowMultiples?: boolean | null;
      /**
       * Information about the owner of the subscription.
       *
       * + `ACCOUNT`: The subscription for the product belongs to a Wix account. Accounts can never hold more than a single subscription for each product.
       * + `SITE`: The subscription for the product belongs to a Wix site. There may be multiple susbcriptions for the same product assigned to the same site, depending on the product's `contextCapabilities.allowMultiples`. When a product instance is unassigned from a site but not assigned to another site, it's floating and still belongs to the Wix account holding the original site.
       */
      primaryContext?: Context;
  }
  enum Context {
      UNKNOWN = "UNKNOWN",
      ACCOUNT = "ACCOUNT",
      SITE = "SITE"
  }
  interface SubscriptionChanges {
      /**
       * Whether the customer can change the billing cycle of the subscription at the
       * end of the current cycle.
       */
      allowChangeCycleEop?: boolean | null;
  }
  enum FreeTrialConfiguration {
      INHERIT_FREE_TRIAL_CONFIGURATION = "INHERIT_FREE_TRIAL_CONFIGURATION",
      NO_FREE_TRIAL = "NO_FREE_TRIAL",
      FREE_TRIAL = "FREE_TRIAL"
  }
  interface FreeTrialOptions {
      /** Number of days during which the customer may use the product for free. */
      duration?: Interval;
  }
  interface Placements {
      /** offering placement id setting of the product type */
      offeringPlacementId?: string;
      /** sale placement id setting of the product type */
      salePlacementId?: string | null;
      /** list of discount placement ids of the product type */
      discountPlacementIds?: string[];
  }
  interface PurchasePrerequisites {
      /**
       * purchase allowed only if the customer owns the domain of the product scope
       * purchase will also allowed if the domain bought in the same purchase
       */
      hasDomain?: boolean | null;
  }
  interface CreateProductTypeRequest {
      /** Product type to create. */
      productType: ProductType;
  }
  interface CreateProductTypeResponse {
      /** Created product type. */
      productType?: ProductType;
  }
  interface GetProductTypeRequest {
      /** ID of the product type to retrieve. */
      productTypeId: string;
  }
  interface GetProductTypeResponse {
      /** Retrieved product type. */
      productType?: ProductType;
  }
  interface UpdateProductTypeRequest {
      /** Product type to update. */
      productType: ProductType;
      /**
       * Fields to update. Fields not specified here remain as they are.
       * @internal
       */
      mask?: string[];
  }
  interface UpdateProductTypeResponse {
      /** Updated product type. */
      productType?: ProductType;
  }
  interface QueryProductTypeRequest {
      /** Information about filters, paging, and sorting. */
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
  interface QueryProductTypeResponse {
      /** Retrieved product types. */
      productTypes?: ProductType[];
      /** Pagination metadata. */
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
  interface Cursors {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface DeleteProductTypeRequest {
      /** ID of the product type to delete. */
      productTypeId: string;
      /** Revision of the product type to delete. */
      revision?: string;
  }
  interface DeleteProductTypeResponse {
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
   * Creates a product type.
   *
   *
   * You must create the product type first, before you can create products or
   * product families.
   *
   * The `settings` are used as defaults for all contained products and families.
   * They can be overridden with the relevant `settingsOverride` objects.
   * @param productType - Product type to create.
   * @internal
   * @documentationMaturity preview
   * @requiredField productType
   * @requiredField productType.name
   * @requiredField productType.settings
   * @permissionId PREMIUM.PRODUCT_CATALOG_CREATE_PRODUCT_TYPE
   * @adminMethod
   */
  function createProductType(productType: ProductType): Promise<CreateProductTypeResponse>;
  /**
   * Retrieves a product type.
   * @param productTypeId - ID of the product type to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField productTypeId
   * @permissionId PREMIUM.PRODUCT_CATALOG_READ_PRODUCT_TYPE
   * @adminMethod
   */
  function getProductType(productTypeId: string): Promise<GetProductTypeResponse>;
  /**
   * Partially updates a product type.
   *
   *
   * Only the field specified in `mask.paths` array are updated, the other fields
   * remain as they are.
   *
   *
   * Updating the `settings` for a type triggers a recalculation of all relevant
   * product settings.
   * @param _id - ID of the product type.
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField productType
   * @requiredField productType.revision
   * @requiredField productType.settings
   * @permissionId PREMIUM.PRODUCT_CATALOG_UPDATE_PRODUCT_TYPE
   * @adminMethod
   */
  function updateProductType(_id: string | null, productType: UpdateProductType, options?: UpdateProductTypeOptions): Promise<UpdateProductTypeResponse>;
  interface UpdateProductType {
      /**
       * ID of the product type.
       * @readonly
       */
      _id?: string | null;
      /**
       * Name of the product type. Only visible to customers in case the product type name isn't
       * provided in the [Display Attributes](https://dev.wix.com/docs/rest/internal-only/premium/premium-display-manager/introduction).
       *
       * Max: 50 characters
       */
      name?: string | null;
      /**
       * Information about the product type
       * [settings](https://bo.wix.com/wix-docs/rest/premium/premium-product-catalog-v2/settings/product-settings-object).
       * Includes which billing cycles and
       * payment options are supported, how products can be canceled,
       * and in which situations customers get notified.
       * Used as deafult for all product families and products belonging to the type,
       * unless you specify `settingsOverride` for them. You may check the product's
       * `computedSettings` to see which settings are ultimately used.
       */
      settings?: ProductSettings;
      /**
       * Revision number, which increments by 1 each time the product type is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the product type.
       *
       * Ignored when creating a product type.
       */
      revision?: string | null;
      /**
       * Date and time the product type was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the product type was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  interface UpdateProductTypeOptions {
      /**
       * Fields to update. Fields not specified here remain as they are.
       * @internal
       */
      mask?: string[];
  }
  /**
   * Retrieves a list of product types, given the provided paging, filtering, and sorting.
   *
   *
   * Query Product Type runs with these defaults, which you can override:
   *
   * - `id` is sorted in `ASC` order
   * - `cursorPaging.limit` is `200`
   *
   * You can check the overview about all
   * [supported filters](https://bo.wix.com/wix-docs/rest/premium/premium-product-catalog-v2/supported-filters#premium_premium-product-catalog-v2_supported-filters_query-product-type---supported-filters)
   * for more information.
   *
   * To learn about working with _Query_ endpoints, see
   * [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language),
   * [Sorting and Paging](https://dev.wix.com/api/rest/getting-started/pagination),
   * and [Field Projection](https://dev.wix.com/api/rest/getting-started/field-projection).
   * @public
   * @documentationMaturity preview
   * @permissionId PREMIUM.PRODUCT_CATALOG_QUERY_PRODUCT_TYPE
   * @adminMethod
   */
  function queryProductType(options?: QueryProductTypeOptions): Promise<QueryProductTypeResponse>;
  interface QueryProductTypeOptions {
      /** Information about filters, paging, and sorting. */
      query?: QueryV2;
  }
  /**
   * Deletes a product type.
   *
   *
   * Currently, there is no validation that prevents deleting a product type that
   * includes `PUBLISHED` products. Contact the
   * [Premium team](mailto:tald@wix.com)
   * in case you inadvertently delete a type with active products.
   *
   * If you pass an outdated `revision` the product type isn't deleted.
   * @param productTypeId - ID of the product type to delete.
   * @internal
   * @documentationMaturity preview
   * @requiredField productTypeId
   * @permissionId PREMIUM.PRODUCT_CATALOG_DELETE_PRODUCT_TYPE
   * @adminMethod
   */
  function deleteProductType(productTypeId: string, options?: DeleteProductTypeOptions): Promise<void>;
  interface DeleteProductTypeOptions {
      /** Revision of the product type to delete. */
      revision?: string;
  }
  
  type premiumProductCatalogV2ProductType_universal_d_ProductType = ProductType;
  type premiumProductCatalogV2ProductType_universal_d_ProductSettings = ProductSettings;
  type premiumProductCatalogV2ProductType_universal_d_ProductSettingsCancellationPolicyOptionsOneOf = ProductSettingsCancellationPolicyOptionsOneOf;
  type premiumProductCatalogV2ProductType_universal_d_ProductSettingsNotificationsConfigurationOptionsOneOf = ProductSettingsNotificationsConfigurationOptionsOneOf;
  type premiumProductCatalogV2ProductType_universal_d_ProductSettingsSupportedPaymentConfigurationOptionsOneOf = ProductSettingsSupportedPaymentConfigurationOptionsOneOf;
  type premiumProductCatalogV2ProductType_universal_d_ProductSettingsCompatibleCyclesConfigurationOptionsOneOf = ProductSettingsCompatibleCyclesConfigurationOptionsOneOf;
  type premiumProductCatalogV2ProductType_universal_d_ProductSettingsFreeTrialConfigurationOptionsOneOf = ProductSettingsFreeTrialConfigurationOptionsOneOf;
  type premiumProductCatalogV2ProductType_universal_d_CancellationPolicy = CancellationPolicy;
  const premiumProductCatalogV2ProductType_universal_d_CancellationPolicy: typeof CancellationPolicy;
  type premiumProductCatalogV2ProductType_universal_d_OfficialMoneyBackPolicy = OfficialMoneyBackPolicy;
  type premiumProductCatalogV2ProductType_universal_d_NotificationsConfiguration = NotificationsConfiguration;
  const premiumProductCatalogV2ProductType_universal_d_NotificationsConfiguration: typeof NotificationsConfiguration;
  type premiumProductCatalogV2ProductType_universal_d_NotificationSettings = NotificationSettings;
  type premiumProductCatalogV2ProductType_universal_d_NotificationTemplateSettings = NotificationTemplateSettings;
  type premiumProductCatalogV2ProductType_universal_d_NotificationTypes = NotificationTypes;
  const premiumProductCatalogV2ProductType_universal_d_NotificationTypes: typeof NotificationTypes;
  type premiumProductCatalogV2ProductType_universal_d_NotificationResolver = NotificationResolver;
  type premiumProductCatalogV2ProductType_universal_d_ScheduledNotification = ScheduledNotification;
  type premiumProductCatalogV2ProductType_universal_d_TimeRangeSchedule = TimeRangeSchedule;
  type premiumProductCatalogV2ProductType_universal_d_ScheduledDay = ScheduledDay;
  const premiumProductCatalogV2ProductType_universal_d_ScheduledDay: typeof ScheduledDay;
  type premiumProductCatalogV2ProductType_universal_d_SupportedPaymentConfiguration = SupportedPaymentConfiguration;
  const premiumProductCatalogV2ProductType_universal_d_SupportedPaymentConfiguration: typeof SupportedPaymentConfiguration;
  type premiumProductCatalogV2ProductType_universal_d_RestrictingPaymentFilter = RestrictingPaymentFilter;
  type premiumProductCatalogV2ProductType_universal_d_PaymentFilters = PaymentFilters;
  type premiumProductCatalogV2ProductType_universal_d_PaymentType = PaymentType;
  const premiumProductCatalogV2ProductType_universal_d_PaymentType: typeof PaymentType;
  type premiumProductCatalogV2ProductType_universal_d_CompatibleCyclesConfiguration = CompatibleCyclesConfiguration;
  const premiumProductCatalogV2ProductType_universal_d_CompatibleCyclesConfiguration: typeof CompatibleCyclesConfiguration;
  type premiumProductCatalogV2ProductType_universal_d_CompatibleCycles = CompatibleCycles;
  type premiumProductCatalogV2ProductType_universal_d_Cycle = Cycle;
  type premiumProductCatalogV2ProductType_universal_d_CycleCycleSelectorOneOf = CycleCycleSelectorOneOf;
  type premiumProductCatalogV2ProductType_universal_d_Interval = Interval;
  type premiumProductCatalogV2ProductType_universal_d_IntervalUnit = IntervalUnit;
  const premiumProductCatalogV2ProductType_universal_d_IntervalUnit: typeof IntervalUnit;
  type premiumProductCatalogV2ProductType_universal_d_OneTime = OneTime;
  type premiumProductCatalogV2ProductType_universal_d_SubscriptionActions = SubscriptionActions;
  type premiumProductCatalogV2ProductType_universal_d_ContextCapabilities = ContextCapabilities;
  type premiumProductCatalogV2ProductType_universal_d_Context = Context;
  const premiumProductCatalogV2ProductType_universal_d_Context: typeof Context;
  type premiumProductCatalogV2ProductType_universal_d_SubscriptionChanges = SubscriptionChanges;
  type premiumProductCatalogV2ProductType_universal_d_FreeTrialConfiguration = FreeTrialConfiguration;
  const premiumProductCatalogV2ProductType_universal_d_FreeTrialConfiguration: typeof FreeTrialConfiguration;
  type premiumProductCatalogV2ProductType_universal_d_FreeTrialOptions = FreeTrialOptions;
  type premiumProductCatalogV2ProductType_universal_d_Placements = Placements;
  type premiumProductCatalogV2ProductType_universal_d_PurchasePrerequisites = PurchasePrerequisites;
  type premiumProductCatalogV2ProductType_universal_d_CreateProductTypeRequest = CreateProductTypeRequest;
  type premiumProductCatalogV2ProductType_universal_d_CreateProductTypeResponse = CreateProductTypeResponse;
  type premiumProductCatalogV2ProductType_universal_d_GetProductTypeRequest = GetProductTypeRequest;
  type premiumProductCatalogV2ProductType_universal_d_GetProductTypeResponse = GetProductTypeResponse;
  type premiumProductCatalogV2ProductType_universal_d_UpdateProductTypeRequest = UpdateProductTypeRequest;
  type premiumProductCatalogV2ProductType_universal_d_UpdateProductTypeResponse = UpdateProductTypeResponse;
  type premiumProductCatalogV2ProductType_universal_d_QueryProductTypeRequest = QueryProductTypeRequest;
  type premiumProductCatalogV2ProductType_universal_d_QueryV2 = QueryV2;
  type premiumProductCatalogV2ProductType_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
  type premiumProductCatalogV2ProductType_universal_d_Sorting = Sorting;
  type premiumProductCatalogV2ProductType_universal_d_SortOrder = SortOrder;
  const premiumProductCatalogV2ProductType_universal_d_SortOrder: typeof SortOrder;
  type premiumProductCatalogV2ProductType_universal_d_Paging = Paging;
  type premiumProductCatalogV2ProductType_universal_d_CursorPaging = CursorPaging;
  type premiumProductCatalogV2ProductType_universal_d_QueryProductTypeResponse = QueryProductTypeResponse;
  type premiumProductCatalogV2ProductType_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type premiumProductCatalogV2ProductType_universal_d_Cursors = Cursors;
  type premiumProductCatalogV2ProductType_universal_d_DeleteProductTypeRequest = DeleteProductTypeRequest;
  type premiumProductCatalogV2ProductType_universal_d_DeleteProductTypeResponse = DeleteProductTypeResponse;
  type premiumProductCatalogV2ProductType_universal_d_DomainEvent = DomainEvent;
  type premiumProductCatalogV2ProductType_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type premiumProductCatalogV2ProductType_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type premiumProductCatalogV2ProductType_universal_d_RestoreInfo = RestoreInfo;
  type premiumProductCatalogV2ProductType_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type premiumProductCatalogV2ProductType_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type premiumProductCatalogV2ProductType_universal_d_ActionEvent = ActionEvent;
  type premiumProductCatalogV2ProductType_universal_d_MessageEnvelope = MessageEnvelope;
  type premiumProductCatalogV2ProductType_universal_d_IdentificationData = IdentificationData;
  type premiumProductCatalogV2ProductType_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type premiumProductCatalogV2ProductType_universal_d_WebhookIdentityType = WebhookIdentityType;
  const premiumProductCatalogV2ProductType_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const premiumProductCatalogV2ProductType_universal_d_createProductType: typeof createProductType;
  const premiumProductCatalogV2ProductType_universal_d_getProductType: typeof getProductType;
  const premiumProductCatalogV2ProductType_universal_d_updateProductType: typeof updateProductType;
  type premiumProductCatalogV2ProductType_universal_d_UpdateProductType = UpdateProductType;
  type premiumProductCatalogV2ProductType_universal_d_UpdateProductTypeOptions = UpdateProductTypeOptions;
  const premiumProductCatalogV2ProductType_universal_d_queryProductType: typeof queryProductType;
  type premiumProductCatalogV2ProductType_universal_d_QueryProductTypeOptions = QueryProductTypeOptions;
  const premiumProductCatalogV2ProductType_universal_d_deleteProductType: typeof deleteProductType;
  type premiumProductCatalogV2ProductType_universal_d_DeleteProductTypeOptions = DeleteProductTypeOptions;
  namespace premiumProductCatalogV2ProductType_universal_d {
    export {
      premiumProductCatalogV2ProductType_universal_d_ProductType as ProductType,
      premiumProductCatalogV2ProductType_universal_d_ProductSettings as ProductSettings,
      premiumProductCatalogV2ProductType_universal_d_ProductSettingsCancellationPolicyOptionsOneOf as ProductSettingsCancellationPolicyOptionsOneOf,
      premiumProductCatalogV2ProductType_universal_d_ProductSettingsNotificationsConfigurationOptionsOneOf as ProductSettingsNotificationsConfigurationOptionsOneOf,
      premiumProductCatalogV2ProductType_universal_d_ProductSettingsSupportedPaymentConfigurationOptionsOneOf as ProductSettingsSupportedPaymentConfigurationOptionsOneOf,
      premiumProductCatalogV2ProductType_universal_d_ProductSettingsCompatibleCyclesConfigurationOptionsOneOf as ProductSettingsCompatibleCyclesConfigurationOptionsOneOf,
      premiumProductCatalogV2ProductType_universal_d_ProductSettingsFreeTrialConfigurationOptionsOneOf as ProductSettingsFreeTrialConfigurationOptionsOneOf,
      premiumProductCatalogV2ProductType_universal_d_CancellationPolicy as CancellationPolicy,
      premiumProductCatalogV2ProductType_universal_d_OfficialMoneyBackPolicy as OfficialMoneyBackPolicy,
      premiumProductCatalogV2ProductType_universal_d_NotificationsConfiguration as NotificationsConfiguration,
      premiumProductCatalogV2ProductType_universal_d_NotificationSettings as NotificationSettings,
      premiumProductCatalogV2ProductType_universal_d_NotificationTemplateSettings as NotificationTemplateSettings,
      premiumProductCatalogV2ProductType_universal_d_NotificationTypes as NotificationTypes,
      premiumProductCatalogV2ProductType_universal_d_NotificationResolver as NotificationResolver,
      premiumProductCatalogV2ProductType_universal_d_ScheduledNotification as ScheduledNotification,
      premiumProductCatalogV2ProductType_universal_d_TimeRangeSchedule as TimeRangeSchedule,
      premiumProductCatalogV2ProductType_universal_d_ScheduledDay as ScheduledDay,
      premiumProductCatalogV2ProductType_universal_d_SupportedPaymentConfiguration as SupportedPaymentConfiguration,
      premiumProductCatalogV2ProductType_universal_d_RestrictingPaymentFilter as RestrictingPaymentFilter,
      premiumProductCatalogV2ProductType_universal_d_PaymentFilters as PaymentFilters,
      premiumProductCatalogV2ProductType_universal_d_PaymentType as PaymentType,
      premiumProductCatalogV2ProductType_universal_d_CompatibleCyclesConfiguration as CompatibleCyclesConfiguration,
      premiumProductCatalogV2ProductType_universal_d_CompatibleCycles as CompatibleCycles,
      premiumProductCatalogV2ProductType_universal_d_Cycle as Cycle,
      premiumProductCatalogV2ProductType_universal_d_CycleCycleSelectorOneOf as CycleCycleSelectorOneOf,
      premiumProductCatalogV2ProductType_universal_d_Interval as Interval,
      premiumProductCatalogV2ProductType_universal_d_IntervalUnit as IntervalUnit,
      premiumProductCatalogV2ProductType_universal_d_OneTime as OneTime,
      premiumProductCatalogV2ProductType_universal_d_SubscriptionActions as SubscriptionActions,
      premiumProductCatalogV2ProductType_universal_d_ContextCapabilities as ContextCapabilities,
      premiumProductCatalogV2ProductType_universal_d_Context as Context,
      premiumProductCatalogV2ProductType_universal_d_SubscriptionChanges as SubscriptionChanges,
      premiumProductCatalogV2ProductType_universal_d_FreeTrialConfiguration as FreeTrialConfiguration,
      premiumProductCatalogV2ProductType_universal_d_FreeTrialOptions as FreeTrialOptions,
      premiumProductCatalogV2ProductType_universal_d_Placements as Placements,
      premiumProductCatalogV2ProductType_universal_d_PurchasePrerequisites as PurchasePrerequisites,
      premiumProductCatalogV2ProductType_universal_d_CreateProductTypeRequest as CreateProductTypeRequest,
      premiumProductCatalogV2ProductType_universal_d_CreateProductTypeResponse as CreateProductTypeResponse,
      premiumProductCatalogV2ProductType_universal_d_GetProductTypeRequest as GetProductTypeRequest,
      premiumProductCatalogV2ProductType_universal_d_GetProductTypeResponse as GetProductTypeResponse,
      premiumProductCatalogV2ProductType_universal_d_UpdateProductTypeRequest as UpdateProductTypeRequest,
      premiumProductCatalogV2ProductType_universal_d_UpdateProductTypeResponse as UpdateProductTypeResponse,
      premiumProductCatalogV2ProductType_universal_d_QueryProductTypeRequest as QueryProductTypeRequest,
      premiumProductCatalogV2ProductType_universal_d_QueryV2 as QueryV2,
      premiumProductCatalogV2ProductType_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf,
      premiumProductCatalogV2ProductType_universal_d_Sorting as Sorting,
      premiumProductCatalogV2ProductType_universal_d_SortOrder as SortOrder,
      premiumProductCatalogV2ProductType_universal_d_Paging as Paging,
      premiumProductCatalogV2ProductType_universal_d_CursorPaging as CursorPaging,
      premiumProductCatalogV2ProductType_universal_d_QueryProductTypeResponse as QueryProductTypeResponse,
      premiumProductCatalogV2ProductType_universal_d_PagingMetadataV2 as PagingMetadataV2,
      premiumProductCatalogV2ProductType_universal_d_Cursors as Cursors,
      premiumProductCatalogV2ProductType_universal_d_DeleteProductTypeRequest as DeleteProductTypeRequest,
      premiumProductCatalogV2ProductType_universal_d_DeleteProductTypeResponse as DeleteProductTypeResponse,
      premiumProductCatalogV2ProductType_universal_d_DomainEvent as DomainEvent,
      premiumProductCatalogV2ProductType_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      premiumProductCatalogV2ProductType_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      premiumProductCatalogV2ProductType_universal_d_RestoreInfo as RestoreInfo,
      premiumProductCatalogV2ProductType_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      premiumProductCatalogV2ProductType_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      premiumProductCatalogV2ProductType_universal_d_ActionEvent as ActionEvent,
      premiumProductCatalogV2ProductType_universal_d_MessageEnvelope as MessageEnvelope,
      premiumProductCatalogV2ProductType_universal_d_IdentificationData as IdentificationData,
      premiumProductCatalogV2ProductType_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      premiumProductCatalogV2ProductType_universal_d_WebhookIdentityType as WebhookIdentityType,
      premiumProductCatalogV2ProductType_universal_d_createProductType as createProductType,
      premiumProductCatalogV2ProductType_universal_d_getProductType as getProductType,
      premiumProductCatalogV2ProductType_universal_d_updateProductType as updateProductType,
      premiumProductCatalogV2ProductType_universal_d_UpdateProductType as UpdateProductType,
      premiumProductCatalogV2ProductType_universal_d_UpdateProductTypeOptions as UpdateProductTypeOptions,
      premiumProductCatalogV2ProductType_universal_d_queryProductType as queryProductType,
      premiumProductCatalogV2ProductType_universal_d_QueryProductTypeOptions as QueryProductTypeOptions,
      premiumProductCatalogV2ProductType_universal_d_deleteProductType as deleteProductType,
      premiumProductCatalogV2ProductType_universal_d_DeleteProductTypeOptions as DeleteProductTypeOptions,
    };
  }
  
  export { premiumProductCatalogV2ProductType_universal_d as premiumProductCatalog };
}
