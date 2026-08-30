declare module "wix-app-management.v2" {
  interface AppPlans {
      /** App ID, as defined in the [app dashboard](https://dev.wix.com/apps/my-apps?viewId=active-apps-view). */
      _id?: string;
      /**
       * List of the app's pricing plans.
       *
       * Min: `0` plans
       * Max: `50` plans
       */
      plans?: Plan[];
  }
  enum SaleType {
      /** Default value, can be used when no specific sale is associated. */
      SALE_TYPE_UNSPECIFIED = "SALE_TYPE_UNSPECIFIED",
      CYBER_MONDAY = "CYBER_MONDAY",
      NOVEMBER_SALE = "NOVEMBER_SALE",
      BLACK_FRIDAY = "BLACK_FRIDAY",
      DEVELOPER_SALE = "DEVELOPER_SALE"
  }
  enum DiscountType {
      DISCOUNT_TYPE_UNSPECIFIED = "DISCOUNT_TYPE_UNSPECIFIED",
      /** Discount is a fixed amount in USD. */
      FIXED_AMOUNT = "FIXED_AMOUNT",
      /** Discount is a percentage of the total price. */
      PERCENTAGE = "PERCENTAGE"
  }
  enum SourceType {
      /** Default value, can be used when no specific source is associated. */
      SOURCE_TYPE_UNSPECIFIED = "SOURCE_TYPE_UNSPECIFIED",
      /** Discount is due to Wix/Developer Sale */
      SALE = "SALE",
      /** Discount is due to App Benefit */
      APP_BENEFIT = "APP_BENEFIT"
  }
  interface SaleSource {
      saleId?: string | null;
      saleType?: SaleType;
  }
  interface Cycle {
      /**
       * Type of the billing cycle.
       *
       * + `"UNKNOWN_UNIT"`:  There is no information about the billing cycle.
       * + `"ONE_TIME"`:  The customer pays for unlimited usage of the app with a single payment.
       * + `"RECURRING"`: The customer pays for a subscription to the app on a recurring schedule.
       */
      cycleType?: CycleType;
      /** Duration of the billing cycle. Available only for `{"cycleType": "RECURRING"}`. */
      cycleDuration?: Duration;
  }
  enum DurationUnit {
      /** unknown interval unit */
      UNKNOWN_UNIT = "UNKNOWN_UNIT",
      /** month */
      MONTH = "MONTH",
      /** year */
      YEAR = "YEAR"
  }
  enum CycleType {
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      ONE_TIME = "ONE_TIME",
      RECURRING = "RECURRING"
  }
  interface Duration {
      /** Unit of the billing cycle. */
      unit?: DurationUnit;
      /** Count of units that make up the billing cycle. */
      count?: number;
  }
  interface UsageBasedDetails {
      /**
       * Smallest possible amount that your app charges customers in usage-based
       * pricing. For example, the price of a single SMS message if your
       * app charges customers for sending text messages. Always in
       * [USD](https://en.wikipedia.org/wiki/United_States_dollar).
       *
       * Min: `0.00`
       * Max: 1024 characters
       */
      minimumChargeIncrement?: string | null;
      /**
       * Recurring, monthly base fee in usage-based pricing that your app
       * charges customers regardless of how much they use your app.
       *
       * Min: `0.00`
       * Max: 1024 characters
       */
      monthlyBaseFee?: string | null;
      /**
       * Description of the usage-based pricing plan, as defined in the [app dashboard](https://dev.wix.com/apps/my-apps?viewId=active-apps-view).
       *
       * Max: 1024 characters
       */
      customChargeDescription?: string | null;
  }
  interface Discount extends DiscountSourceDataOneOf {
      /** Sale type */
      saleOptions?: SaleSource;
      type?: DiscountType;
      /** Discount amount */
      amount?: string;
      /**
       * if a discount is applied to a specific sale
       * @deprecated if a discount is applied to a specific sale
       * @targetRemovalDate 2025-01-14
       */
      saleId?: string | null;
      /**
       * Price without taxes. For yearly plans, Wix calculates and returns the
       * average price per month. You can get the full price by multiplying the
       * returned price with 12.
       * Min: `0.00`
       * Max: 1024 characters
       */
      priceBeforeTax?: string;
      /**
       * Total price including taxes.
       * Min: `0.00`
       * Max: 1024 characters
       */
      totalPrice?: string;
      /**
       * @deprecated
       * @targetRemovalDate 2025-01-14
       */
      saleType?: SaleType;
      sourceType?: SourceType;
  }
  /** @oneof */
  interface DiscountSourceDataOneOf {
      /** Sale type */
      saleOptions?: SaleSource;
  }
  enum BillingSource {
      UNKNOWN = "UNKNOWN",
      /** plan billing and charges is managed by Wix */
      WIX = "WIX",
      /** plan billing and charges is managed by the app */
      EXTERNAL = "EXTERNAL"
  }
  interface Price {
      /**
       * Price without taxes. For yearly plans, Wix calculates and returns the
       * average price per month. You can get the full price by multiplying the
       * returned price by 12.
       *
       * Min: `0.00`
       * Max: 1024 characters
       */
      priceBeforeTax?: string;
      /**
       * Total price including taxes.
       *
       * Min: `0.00`
       * Max: 1024 characters
       */
      totalPrice?: string;
      /** Information about the plan's recurring billing cycle or single payment. */
      billingCycle?: Cycle;
      /**
       * Details about the plan's usage-based pricing.
       * Available only for plans with
       * [usage-based pricing](https://dev.wix.com/docs/build-apps/build-your-app/pricing-plans/usage-based-pricing).
       */
      usageBaseOptions?: UsageBasedDetails;
      discount?: Discount;
      billingSource?: BillingSource;
      /** Can be shown instead of plan price - used for dynamic plans */
      customPaymentTitle?: string | null;
  }
  interface Plan {
      /**
       * ID of the app plan.
       * @readonly
       */
      _id?: string;
      /**
       * ID of your app's pricing plan, as displayed in the [app dashboard](https://dev.wix.com/apps/my-apps?viewId=active-apps-view).
       * Identical to `vendorProductId` in the
       * [Paid Plan Purchased webhook](https://dev.wix.com/docs/rest/api-reference/app-management/apps/app-instance/paid-plan-purchased).
       */
      vendorId?: string;
      /** Name of your app's pricing plan, as defined by you in the [app dashboard](https://dev.wix.com/apps/my-apps?viewId=active-apps-view). */
      name?: string;
      /**
       * List of your plan's benefits, as defined by you in the [app dashboard](https://dev.wix.com/apps/my-apps?viewId=active-apps-view).
       * Currently, the benefits are available only in English.
       *
       * Min: `0` benefits
       * Max: `4` benefits
       * Max per benefit: 1024 characters
       */
      benefits?: string[];
      /**
       * List of the plan's prices. Available only when the plan's prices are managed
       * by Wix and not externally.
       *
       * Min: `0` prices
       * Max: `10` prices
       */
      prices?: Price[];
  }
  interface ListAppPlansByAppIdRequest {
      /**
       * List of app IDs to retrieve plans for.
       *
       * Min: 1 app ID
       * Max: 100 app IDs
       */
      appIds: string[];
  }
  interface ListAppPlansByAppIdResponse {
      /**
       * Tax settings. Wix calculates the tax settings based on the country code that
       * you pass in the call's header. If you don't pass a country code in the header,
       * Wix calculates the tax settings based on the caller's IP address. Note that the
       * tax settings may not resolve properly if you call through a VPN.
       */
      taxSettings?: TaxSettings;
      /**
       * 3-letter currency code in [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)
       * format. Wix calculates the currency based on the country code that
       * you pass in the call's header. If you don't pass a country code in the header,
       * Wix calculates the currency based on the caller's IP address. Note that the
       * currency may not resolve properly if you call through a VPN.
       */
      currency?: string;
      /**
       * Currency symbol in decimal HTML entity format. For example, `&#36;` for $
       * (United States Dollar). Wix calculates the currency symbol based on the
       * country code that you pass in the call's header. If you don't pass a country
       * code in the header, Wix calculates the tax settings based on the caller's IP
       * address. Note that the currency symbol may not resolve properly if you call
       * through a VPN.
       */
      currencySymbol?: string;
      /**
       * Retrieved app plans.
       *
       * Min: 0 plans
       * Max: 50 plans
       */
      appPlans?: AppPlans[];
  }
  interface TaxSettings {
      /**
       * Whether you must display the total price including taxes in the given
       * country.
       */
      showPriceWithTax?: boolean;
      /**
       * Tax rate for the given country as percentage. Returned as `0` when
       * `{"showPriceWithTax": false}`.
       */
      percentage?: string | null;
      /**
       * Type of tax required in the given country.
       *
       * + `"NOT_APPLICABLE"`: The country doesn't require that you display the total price including taxes, or Wix failed to calculate the country based on the call's IP address.
       * + `"VAT"`: The given country requires that you display the total price including [value-added tax (VAT)](https://en.wikipedia.org/wiki/Value-added_tax).
       * + `"GST"`: The given country requires that you display the total price including [generation-skipping transfer tax (GST)](https://en.wikipedia.org/wiki/Generation-skipping_transfer_tax).
       */
      taxType?: TaxType;
  }
  enum TaxType {
      NOT_APPLICABLE = "NOT_APPLICABLE",
      VAT = "VAT",
      GST = "GST"
  }
  /**
   * Retrieves plans for the given apps.
   *
   *
   * Also returns tax settings and currency details. Wix calculates this information
   * based on the 2-letter country code in [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
   * format that you pass in the call's header. If you don't pass a country code in
   * the header, Wix calculates the tax settings and currency details based on the
   * call's IP address. Note that the tax settings and currency details may not resolve
   * properly if you call through a VPN.
   *
   * Prices for plans that are managed outside of Wix aren't returned.
   *
   * Consumers must pay for yearly and multi-yearly plans of your app every month.
   * For these plans this endpoint returns the price that the consumer must pay every
   * month and not the total price for the entire year.
   *
   * <blockquote class="important">
   *
   * __Important:__
   * The App Plans API doesn't follow any tenancy model. You don't need any
   * permissions to call `List App Plans by App ID`.
   *
   * </blockquote>
   * @param appIds - List of app IDs to retrieve plans for.
   *
   * Min: 1 app ID
   * Max: 100 app IDs
   * @public
   * @documentationMaturity preview
   * @requiredField appIds
   * @adminMethod
   */
  function listAppPlansByAppId(appIds: string[]): Promise<ListAppPlansByAppIdResponse>;
  
  type appmarketV1AppPlans_universal_d_AppPlans = AppPlans;
  type appmarketV1AppPlans_universal_d_SaleType = SaleType;
  const appmarketV1AppPlans_universal_d_SaleType: typeof SaleType;
  type appmarketV1AppPlans_universal_d_DiscountType = DiscountType;
  const appmarketV1AppPlans_universal_d_DiscountType: typeof DiscountType;
  type appmarketV1AppPlans_universal_d_SourceType = SourceType;
  const appmarketV1AppPlans_universal_d_SourceType: typeof SourceType;
  type appmarketV1AppPlans_universal_d_SaleSource = SaleSource;
  type appmarketV1AppPlans_universal_d_Cycle = Cycle;
  type appmarketV1AppPlans_universal_d_DurationUnit = DurationUnit;
  const appmarketV1AppPlans_universal_d_DurationUnit: typeof DurationUnit;
  type appmarketV1AppPlans_universal_d_CycleType = CycleType;
  const appmarketV1AppPlans_universal_d_CycleType: typeof CycleType;
  type appmarketV1AppPlans_universal_d_Duration = Duration;
  type appmarketV1AppPlans_universal_d_UsageBasedDetails = UsageBasedDetails;
  type appmarketV1AppPlans_universal_d_Discount = Discount;
  type appmarketV1AppPlans_universal_d_DiscountSourceDataOneOf = DiscountSourceDataOneOf;
  type appmarketV1AppPlans_universal_d_BillingSource = BillingSource;
  const appmarketV1AppPlans_universal_d_BillingSource: typeof BillingSource;
  type appmarketV1AppPlans_universal_d_Price = Price;
  type appmarketV1AppPlans_universal_d_Plan = Plan;
  type appmarketV1AppPlans_universal_d_ListAppPlansByAppIdRequest = ListAppPlansByAppIdRequest;
  type appmarketV1AppPlans_universal_d_ListAppPlansByAppIdResponse = ListAppPlansByAppIdResponse;
  type appmarketV1AppPlans_universal_d_TaxSettings = TaxSettings;
  type appmarketV1AppPlans_universal_d_TaxType = TaxType;
  const appmarketV1AppPlans_universal_d_TaxType: typeof TaxType;
  const appmarketV1AppPlans_universal_d_listAppPlansByAppId: typeof listAppPlansByAppId;
  namespace appmarketV1AppPlans_universal_d {
    export {
      appmarketV1AppPlans_universal_d_AppPlans as AppPlans,
      appmarketV1AppPlans_universal_d_SaleType as SaleType,
      appmarketV1AppPlans_universal_d_DiscountType as DiscountType,
      appmarketV1AppPlans_universal_d_SourceType as SourceType,
      appmarketV1AppPlans_universal_d_SaleSource as SaleSource,
      appmarketV1AppPlans_universal_d_Cycle as Cycle,
      appmarketV1AppPlans_universal_d_DurationUnit as DurationUnit,
      appmarketV1AppPlans_universal_d_CycleType as CycleType,
      appmarketV1AppPlans_universal_d_Duration as Duration,
      appmarketV1AppPlans_universal_d_UsageBasedDetails as UsageBasedDetails,
      appmarketV1AppPlans_universal_d_Discount as Discount,
      appmarketV1AppPlans_universal_d_DiscountSourceDataOneOf as DiscountSourceDataOneOf,
      appmarketV1AppPlans_universal_d_BillingSource as BillingSource,
      appmarketV1AppPlans_universal_d_Price as Price,
      appmarketV1AppPlans_universal_d_Plan as Plan,
      appmarketV1AppPlans_universal_d_ListAppPlansByAppIdRequest as ListAppPlansByAppIdRequest,
      appmarketV1AppPlans_universal_d_ListAppPlansByAppIdResponse as ListAppPlansByAppIdResponse,
      appmarketV1AppPlans_universal_d_TaxSettings as TaxSettings,
      appmarketV1AppPlans_universal_d_TaxType as TaxType,
      appmarketV1AppPlans_universal_d_listAppPlansByAppId as listAppPlansByAppId,
    };
  }
  
  /**
   * An app instance is a specific occurrence of your app on a particular Wix site.
   * When a site owner installs your app, a unique instance is generated for that
   * specific site. Use the `instanceId` to keep track of the individual data
   * associated with each app instance.
   */
  interface AppInstance {
      /**
       * ID of the app instance. You can use it to keep track of the individual
       * data that's associated with the specific occurence of your app that's
       * installed on a Wix site.
       */
      instanceId?: string;
      /**
       * App name, as set by you in the Customs Apps page during the app creation
       * process.
       */
      appName?: string;
      /** Version of your app that's installed on the Wix site, as set by you during the app creation process. */
      appVersion?: string | null;
      /**
       * Whether the site owners have installed a free or paid version of your app
       * on their site.
       */
      isFree?: boolean;
      /**
       * Billing information for the app instance. Available only in case
       * `{"isFree": false}`.
       */
      billing?: BillingInfo;
      /**
       * List of [permissions](https://dev.wix.com/docs/build-apps/developer-tools/developers-center/example-app-walkthrough/build-an-app#4-add-permissions)
       * that the site owners have granted your app. You set the list of permissions that
       * your app requires from the site owners in your app's Permissions page during the
       * app creation process.
       */
      permissions?: string[];
      /** Plans available to this app instance. */
      availablePlans?: AvailablePlan[];
      /**
       * ID of the Wix site from which the instance of your app has been cloned.
       * Available only in case `{"copiedFromTemplate": true}`.
       * All visual settings of the Wix site and app data are duplicated during the
       * cloning process. Wix also notifies you in case there is any additional
       * external functionality for the original site.
       */
      originInstanceId?: string | null;
      /**
       * __Deprecated__. This parameter will be removed on March 30, 2023. Use
       * `copiedFromTemplate` instead.
       * @deprecated
       */
      isOriginSiteTemplate?: boolean;
      /** Whether the app instance was created when another Wix site was cloned. */
      copiedFromTemplate?: boolean;
      /** Whether the app instance includes a free trial that hasn't started yet. */
      freeTrialAvailable?: boolean;
  }
  interface BillingInfo {
      /** Name of the package that the site owner has paid for. */
      packageName?: string;
      /**
       * Interval of the billing cycle. `"ONE_TIME"` means that site owners have
       * purchased unlimited access to the app with a single, upfront payment.
       */
      billingCycle?: PaymentCycle$1;
      /**
       * Date and time the site owners have purchased the app's paid plan in
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      timeStamp?: string;
      /**
       * Date and time the app's current billing cycle ends in
       * `YYYY-MM-DDThh:mm:ss.sssZ` format. Available only for yearly and
       * multi-yearly plans.
       */
      expirationDate?: string | null;
      /**
       * Whether the app's subscription automatically renews at the end of the
       * current billing cycle.
       */
      autoRenewing?: boolean | null;
      /** ID of the invoice for the current billing cycle. */
      invoiceId?: string | null;
      /**
       * Information about any discounts applied to the app instance's current billing cycle.
       * If the site owners applied a developer coupon or Wix Voucher
       * when installing the paid version of your app, this field holds the coupon's
       * name or `“Wix discount coupon”`. Site owners may receive a Wix Voucher when
       * upgrading their Wix subscription. If there is no discount for the
       * current billing cycle, the field is an empty string.
       */
      source?: string | null;
      /** Information about the free trial applied, if relevant. */
      freeTrialInfo?: FreeTrialInfo;
  }
  enum PaymentCycle$1 {
      NO_CYCLE = "NO_CYCLE",
      MONTHLY = "MONTHLY",
      YEARLY = "YEARLY",
      ONE_TIME = "ONE_TIME",
      TWO_YEARS = "TWO_YEARS",
      THREE_YEARS = "THREE_YEARS",
      FOUR_YEARS = "FOUR_YEARS",
      FIVE_YEARS = "FIVE_YEARS"
  }
  interface FreeTrialInfo {
      /**
       * Current free trial status.
       * @readonly
       */
      status?: FreeTrialStatus;
      /**
       * When the free trial has ended. Populated only once the free trial is over.
       * @readonly
       */
      endDate?: Date | null;
  }
  enum FreeTrialStatus {
      /** Unknown trial status. */
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      /** The free trial is currently in progress. */
      IN_PROGRESS = "IN_PROGRESS",
      /** The free trial has ended. */
      ENDED = "ENDED",
      /** No free trial was applied, as none was available. */
      NOT_AVAILABLE = "NOT_AVAILABLE"
  }
  interface AvailablePlan {
      /** Package name of the available plan. */
      packageName?: string;
      /** Source of the available plan. Can be a bundle or 3rd-party app. */
      source?: string;
  }
  interface AppInstalled {
      /** Unique identifier of the app within the website. */
      appId?: string;
      /** Instance ID of the app in the original website (relevant only when this site was [duplicated from another site](https://support.wix.com/en/article/duplicating-your-site-1472847)). */
      originInstanceId?: string | null;
  }
  interface AppRemoved {
      /** Unique identifier of the app within the website. */
      appId?: string;
  }
  interface PaidPlanPurchased {
      /** Date and time of purchase. */
      operationTimeStamp?: Date | null;
      /** Purchased app plan. */
      vendorProductId?: string;
      /** Selected payment cycle. */
      cycle?: PaymentCycle$1;
      /** Plan expiration date. */
      expiresOn?: Date | null;
      /** Coupon applied to purchase (if relevant). */
      couponName?: string | null;
      /** Invoice ID. */
      invoiceId?: string | null;
  }
  interface PaidPlanChanged {
      /** Date and time of change. */
      operationTimeStamp?: Date | null;
      /** Newly purchased app plan. */
      vendorProductId?: string;
      /** Newly selected payment cycle. */
      cycle?: PaymentCycle$1;
      /** Previous app plan. */
      previousVendorProductId?: string | null;
      /** Previous payment cycle. */
      previousCycle?: PaymentCycle$1;
      /** Coupon applied to purchase (if relevant). */
      couponName?: string | null;
      /** Invoice ID. */
      invoiceId?: string | null;
  }
  interface PaidPlanAutoRenewalCancelled {
      /** Date and time of auto-renewal cancellation. */
      operationTimeStamp?: Date | null;
      /** Current app plan. */
      vendorProductId?: string;
      /** Current payment cycle. */
      cycle?: PaymentCycle$1;
      /** Supported values: `UNKNOWN_CANCELLATION_TYPE_ERROR_STATE`, `USER_CANCEL`, `FAILED_PAYMENT`, `TRANSFER_CANCELLATION_REASON`. Reason provided by app for cancellation (if relevant). */
      cancelReason?: string | null;
      /** Reason provided by site owner for cancellation (if relevant). */
      userReason?: string | null;
      /** Cancellation type. */
      subscriptionCancellationType?: string | null;
  }
  interface GetAppInstanceRequest {
  }
  interface GetAppInstanceResponse {
      /** Retrieved app instance. */
      instance?: AppInstance;
      /** Information about the corresponding Wix site. */
      site?: SiteInfo;
  }
  interface SiteInfo {
      /** Display name of the site. */
      siteDisplayName?: string | null;
      /**
       * 2-letter language code of the site's locale in
       * [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format.
       */
      locale?: string;
      /**
       * 3-letter currency code for the site's billing in
       * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
       */
      paymentCurrency?: string;
      /** Information about the site's supported languages. */
      multilingual?: Multilingual;
      /** URL of the site. Available only in case the site has been published. */
      url?: string | null;
      /** Description of the site. */
      description?: string | null;
      /** Wix apps that are installed on the site. */
      installedWixApps?: string[];
      /**
       * > **Deprecation Notice:** This parameter will be removed on June 30, 2022. Use `ownerInfo` instead.
       * @deprecated
       */
      ownerEmail?: string | null;
      /**
       * Information about the site owner. Available only when calling
       * _Get App Instance_ with the __Read Site Owner Email__ permission scope.
       */
      ownerInfo?: OwnerInfo;
      /** Site ID. */
      siteId?: string;
  }
  interface Multilingual {
      /** Whether the site supports more than a single language. */
      isMultiLingual?: boolean;
      /** List of supported languages. Returned only when `{"isMultiLingual": true}`. */
      supportedLanguages?: SupportedLanguage[];
  }
  interface SupportedLanguage {
      /** Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. */
      languageCode?: string;
      /** Locale. */
      locale?: Locale;
      /** Whether the supported language is the primary language for the site. */
      isPrimary?: boolean;
      /** Language icon. */
      countryCode?: string;
      /** How the language will be resolved. For internal use. */
      resolutionMethod?: ResolutionMethod;
  }
  interface Locale {
      /** Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. */
      languageCode?: string;
      /** Two-letter country code in [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) format. */
      country?: string;
  }
  enum ResolutionMethod {
      QUERY_PARAM = "QUERY_PARAM",
      SUBDOMAIN = "SUBDOMAIN",
      SUBDIRECTORY = "SUBDIRECTORY"
  }
  interface OwnerInfo {
      /** Site owner's email address. Identical to the site owner's login email. */
      email?: string;
      /**
       * Supported values: `VERIFIED_OPT_IN`, `VERIFIED_OPT_OUT`,
       * `NOT_VERIFIED_OPT_IN`, `NOT_VERIFIED_OPT_OUT`.
       *
       * Whether the site owner has verified their email and whether they have chosen
       * to receive email notifications from Wix.
       */
      emailStatus?: string;
  }
  interface GetAppInstanceByInstanceIdRequest {
      /** ID of the app instance to retrieve. */
      instanceId: string;
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
   * Retrieves data about the instance of your app that's installed on a Wix site and data about the site itself.
   *
   * Call this function when you need information about a specific instance of your app and the site it’s installed on. For example, you may need to know whether the user has installed a free or paid version of your app, or to check what other Wix apps are installed on the site.
   *
   * You must authenticate as a [Wix App](https://dev.wix.com/docs/build-apps/develop-your-app/access/about-identities#wix-apps). If you are calling this function from a [dashboard extension](https://dev.wix.com/docs/build-apps/develop-your-app/extensions/dashboard-extensions/about-dashboard-extensions) in the [CLI](https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/wix-cli/about-the-wix-cli-for-apps), Wix App authentication is passed automatically. Otherwise, you need to call the function with [elevated permissions](https://dev.wix.com/docs/sdk/articles/working-with-the-sdk/about-elevated-permissions).
   *
   * If you want `site.ownerInfo` to be included in the response, you must have the __Read Site Owner Email__ permission scope in addition to __WIX_DEVELOPERS.MANAGE_APP_INSTANCE__.
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_DEVELOPERS.MANAGE_APP_INSTANCE
   * @adminMethod
   */
  function getAppInstance(): Promise<GetAppInstanceResponse>;
  /** @param instanceId - ID of the app instance to retrieve.
   * @internal
   * @documentationMaturity preview
   * @requiredField instanceId
   * @permissionId app-market.manage-app
   * @adminMethod
   */
  function getAppInstanceByInstanceId(instanceId: string): Promise<GetAppInstanceResponse>;
  
  type devcenterAppInstanceV1AppInstance_universal_d_AppInstance = AppInstance;
  type devcenterAppInstanceV1AppInstance_universal_d_BillingInfo = BillingInfo;
  type devcenterAppInstanceV1AppInstance_universal_d_FreeTrialInfo = FreeTrialInfo;
  type devcenterAppInstanceV1AppInstance_universal_d_FreeTrialStatus = FreeTrialStatus;
  const devcenterAppInstanceV1AppInstance_universal_d_FreeTrialStatus: typeof FreeTrialStatus;
  type devcenterAppInstanceV1AppInstance_universal_d_AvailablePlan = AvailablePlan;
  type devcenterAppInstanceV1AppInstance_universal_d_AppInstalled = AppInstalled;
  type devcenterAppInstanceV1AppInstance_universal_d_AppRemoved = AppRemoved;
  type devcenterAppInstanceV1AppInstance_universal_d_PaidPlanPurchased = PaidPlanPurchased;
  type devcenterAppInstanceV1AppInstance_universal_d_PaidPlanChanged = PaidPlanChanged;
  type devcenterAppInstanceV1AppInstance_universal_d_PaidPlanAutoRenewalCancelled = PaidPlanAutoRenewalCancelled;
  type devcenterAppInstanceV1AppInstance_universal_d_GetAppInstanceRequest = GetAppInstanceRequest;
  type devcenterAppInstanceV1AppInstance_universal_d_GetAppInstanceResponse = GetAppInstanceResponse;
  type devcenterAppInstanceV1AppInstance_universal_d_SiteInfo = SiteInfo;
  type devcenterAppInstanceV1AppInstance_universal_d_Multilingual = Multilingual;
  type devcenterAppInstanceV1AppInstance_universal_d_SupportedLanguage = SupportedLanguage;
  type devcenterAppInstanceV1AppInstance_universal_d_Locale = Locale;
  type devcenterAppInstanceV1AppInstance_universal_d_ResolutionMethod = ResolutionMethod;
  const devcenterAppInstanceV1AppInstance_universal_d_ResolutionMethod: typeof ResolutionMethod;
  type devcenterAppInstanceV1AppInstance_universal_d_OwnerInfo = OwnerInfo;
  type devcenterAppInstanceV1AppInstance_universal_d_GetAppInstanceByInstanceIdRequest = GetAppInstanceByInstanceIdRequest;
  const devcenterAppInstanceV1AppInstance_universal_d_getAppInstance: typeof getAppInstance;
  const devcenterAppInstanceV1AppInstance_universal_d_getAppInstanceByInstanceId: typeof getAppInstanceByInstanceId;
  namespace devcenterAppInstanceV1AppInstance_universal_d {
    export {
      devcenterAppInstanceV1AppInstance_universal_d_AppInstance as AppInstance,
      devcenterAppInstanceV1AppInstance_universal_d_BillingInfo as BillingInfo,
      PaymentCycle$1 as PaymentCycle,
      devcenterAppInstanceV1AppInstance_universal_d_FreeTrialInfo as FreeTrialInfo,
      devcenterAppInstanceV1AppInstance_universal_d_FreeTrialStatus as FreeTrialStatus,
      devcenterAppInstanceV1AppInstance_universal_d_AvailablePlan as AvailablePlan,
      devcenterAppInstanceV1AppInstance_universal_d_AppInstalled as AppInstalled,
      devcenterAppInstanceV1AppInstance_universal_d_AppRemoved as AppRemoved,
      devcenterAppInstanceV1AppInstance_universal_d_PaidPlanPurchased as PaidPlanPurchased,
      devcenterAppInstanceV1AppInstance_universal_d_PaidPlanChanged as PaidPlanChanged,
      devcenterAppInstanceV1AppInstance_universal_d_PaidPlanAutoRenewalCancelled as PaidPlanAutoRenewalCancelled,
      devcenterAppInstanceV1AppInstance_universal_d_GetAppInstanceRequest as GetAppInstanceRequest,
      devcenterAppInstanceV1AppInstance_universal_d_GetAppInstanceResponse as GetAppInstanceResponse,
      devcenterAppInstanceV1AppInstance_universal_d_SiteInfo as SiteInfo,
      devcenterAppInstanceV1AppInstance_universal_d_Multilingual as Multilingual,
      devcenterAppInstanceV1AppInstance_universal_d_SupportedLanguage as SupportedLanguage,
      devcenterAppInstanceV1AppInstance_universal_d_Locale as Locale,
      devcenterAppInstanceV1AppInstance_universal_d_ResolutionMethod as ResolutionMethod,
      devcenterAppInstanceV1AppInstance_universal_d_OwnerInfo as OwnerInfo,
      devcenterAppInstanceV1AppInstance_universal_d_GetAppInstanceByInstanceIdRequest as GetAppInstanceByInstanceIdRequest,
      MessageEnvelope$1 as MessageEnvelope,
      IdentificationData$1 as IdentificationData,
      IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf,
      WebhookIdentityType$1 as WebhookIdentityType,
      devcenterAppInstanceV1AppInstance_universal_d_getAppInstance as getAppInstance,
      devcenterAppInstanceV1AppInstance_universal_d_getAppInstanceByInstanceId as getAppInstanceByInstanceId,
    };
  }
  
  interface SendBIEventResponse {
  }
  interface SendBIEventRequest {
      /** Name of the event that's triggered in your app. */
      eventName?: EventName;
      /**
       * Name of your app's custom event that was triggered. Required when `{"eventName": "CUSTOM"}`.
       *
       * Min: 2 characters
       */
      customEventName?: string | null;
      /**
       * Supported values include: `"cycle_name"`, `"currency"`, `"sum"`, `"reason"`, `"app_plan_id"`.
       * You may also submit data with keys that aren't listed here.
       *
       * Additional data about your app's event.
       *
       * + `"cycle_name"`: Supported values: `"monthly"`, `"yearly"`, `"2 years"`, `"one time"`.
       * + `"currency"`: 3-letter currency code in [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
       * + `"sum"`: Amount of money. Required for `{"eventName": "CHARGE"}` and `{"eventName": "FUNDS_RETURNED"}`.
       * + `"reason"`: Information about why the event was triggered in your app.
       * + `"app_plan_id"`: ID of the your app's plan as displayed in your app's dashboard. Note that it's the same value as `vendorProductId` in the [Paid Plan Purchased webhook](https://dev.wix.com/docs/rest/api-reference/app-management/apps/app-instance/paid-plan-purchased).
       */
      eventData?: Record<string, string>;
  }
  enum EventName {
      /** Unknown event name. */
      UNKNOWN = "UNKNOWN",
      /** A site owner or contributor loads your app's dashboard. */
      APP_DASHBOARD_LOADED = "APP_DASHBOARD_LOADED",
      /** The site owner completes all required configurations for your app in your app's dashboard. */
      APP_FINISHED_CONFIGURATION = "APP_FINISHED_CONFIGURATION",
      /** The site owner upgrades your app's paid plan. An upgrade means that they have finished the checkout flow on the app's side but not necessarily on Wix's side. */
      APP_UPGRADED = "APP_UPGRADED",
      /** A site owner, contributor, or visitor triggers your app's primary action. For example, a site visitor writes a product review using your product review app. */
      PRIMARY_ACTION_PERFORMED = "PRIMARY_ACTION_PERFORMED",
      /** Any event that's not listed here. Make sure to also send `customEventName`. */
      CUSTOM = "CUSTOM",
      /** You charge money from the site owner. For example, when the site owner purchases or renews a subscription for your app. Make sure to also send `eventData` and a key of `sum`. */
      CHARGE = "CHARGE",
      /** Trigger this event when you send money back to a site owner (for example, refunds or chargebacks). Make sure to also send the charge amount inside `eventData`. For example, `{"eventData": {"sum": "5.99"}}`. */
      FUNDS_RETURNED = "FUNDS_RETURNED",
      /** __Deprecation Notice:__ This enum value will be removed on March 30, 2023. Use `"APP_SETUP_FINISHED"` instead. */
      APP_FINISH_BUSINESS_SETUP = "APP_FINISH_BUSINESS_SETUP",
      /** Your app’s internal code implementation is changed and might affect user flows or cause a regression. */
      APP_DEPLOYED = "APP_DEPLOYED",
      /** The site owner completes your app's required business setup. */
      APP_SETUP_FINISHED = "APP_SETUP_FINISHED"
  }
  /**
   * Submit a BI event to Wix.
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_DEVELOPERS.SEND_BI_EVENTS
   * @adminMethod
   */
  function sendBiEvent(options?: SendBiEventOptions): Promise<void>;
  interface SendBiEventOptions {
      /** Name of the event that's triggered in your app. */
      eventName?: EventName;
      /**
       * Name of your app's custom event that was triggered. Required when `{"eventName": "CUSTOM"}`.
       *
       * Min: 2 characters
       */
      customEventName?: string | null;
      /**
       * Supported values include: `"cycle_name"`, `"currency"`, `"sum"`, `"reason"`, `"app_plan_id"`.
       * You may also submit data with keys that aren't listed here.
       *
       * Additional data about your app's event.
       *
       * + `"cycle_name"`: Supported values: `"monthly"`, `"yearly"`, `"2 years"`, `"one time"`.
       * + `"currency"`: 3-letter currency code in [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
       * + `"sum"`: Amount of money. Required for `{"eventName": "CHARGE"}` and `{"eventName": "FUNDS_RETURNED"}`.
       * + `"reason"`: Information about why the event was triggered in your app.
       * + `"app_plan_id"`: ID of the your app's plan as displayed in your app's dashboard. Note that it's the same value as `vendorProductId` in the [Paid Plan Purchased webhook](https://dev.wix.com/docs/rest/api-reference/app-management/apps/app-instance/paid-plan-purchased).
       */
      eventData?: Record<string, string>;
  }
  
  type devcenterBiEventsV1SendBiEventResponse_universal_d_SendBIEventResponse = SendBIEventResponse;
  type devcenterBiEventsV1SendBiEventResponse_universal_d_SendBIEventRequest = SendBIEventRequest;
  type devcenterBiEventsV1SendBiEventResponse_universal_d_EventName = EventName;
  const devcenterBiEventsV1SendBiEventResponse_universal_d_EventName: typeof EventName;
  const devcenterBiEventsV1SendBiEventResponse_universal_d_sendBiEvent: typeof sendBiEvent;
  type devcenterBiEventsV1SendBiEventResponse_universal_d_SendBiEventOptions = SendBiEventOptions;
  namespace devcenterBiEventsV1SendBiEventResponse_universal_d {
    export {
      devcenterBiEventsV1SendBiEventResponse_universal_d_SendBIEventResponse as SendBIEventResponse,
      devcenterBiEventsV1SendBiEventResponse_universal_d_SendBIEventRequest as SendBIEventRequest,
      devcenterBiEventsV1SendBiEventResponse_universal_d_EventName as EventName,
      devcenterBiEventsV1SendBiEventResponse_universal_d_sendBiEvent as sendBiEvent,
      devcenterBiEventsV1SendBiEventResponse_universal_d_SendBiEventOptions as SendBiEventOptions,
    };
  }
  
  interface PurchasedItem {
      /** ID of your app's paid plan. */
      productId?: string;
      /** Price of your app's paid plan. For example, `9.95`. */
      price?: string;
      /**
       * 3-letter currency code in
       * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
       */
      currency?: string;
      /** Information about the billing cycle for your app's paid plan. */
      billingCycle?: PaymentCycle;
      /**
       * Date and time the site onwers have purchased your app's paid plan in
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      dateCreated?: Date | null;
  }
  enum PaymentCycle {
      NO_CYCLE = "NO_CYCLE",
      MONTHLY = "MONTHLY",
      YEARLY = "YEARLY",
      ONE_TIME = "ONE_TIME",
      TWO_YEARS = "TWO_YEARS",
      THREE_YEARS = "THREE_YEARS",
      FOUR_YEARS = "FOUR_YEARS",
      FIVE_YEARS = "FIVE_YEARS"
  }
  interface InvoiceStatusUpdate {
      /** Invoice payment status. */
      status?: InvoiceStatus;
      /** Wix Premium invoice ID. */
      invoiceId?: string;
      /** App instance ID - a unique ID assigned to each app in each site. */
      instanceId?: string | null;
      /** Whether the invoice is for a single payment or for multiple, recurring payments. */
      recurring?: boolean;
  }
  enum InvoiceStatus {
      UNKNOWN_INVOICE_STATUS = "UNKNOWN_INVOICE_STATUS",
      PAYMENT_FAILED = "PAYMENT_FAILED",
      PAID = "PAID",
      REFUNDED = "REFUNDED",
      VOIDED = "VOIDED",
      CHARGEDBACK = "CHARGEDBACK"
  }
  interface GetUrlRequest {
      /**
       * ID of your app's paid plan to retrieve the Wix checkout URL for. Check your app's dashboard
       * for a list of your app's supported product IDs.
       */
      productId: string;
      /**
       * URL for the Wix checkout page. Redirect site owners to this URL after
       * they've successfully purchased a paid plan for your app.
       */
      successUrl?: string | null;
      /**
       * Whether the checkout is for testing purposes only. Testing is mainly
       * relevant for in-app purchase flows. When `true`, Wix charges the site
       * owners an amount of `0.00`.
       */
      testCheckout?: boolean;
      /** Information about the paid plan's billing cycle. */
      billingCycle?: PaymentCycle;
      /**
       * 2-letter country code in
       * [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
       * format.
       *
       * Default: `"US"`
       */
      countryCode?: string | null;
      /**
       * 2-letter language code in
       * [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format.
       *
       * Default: `"EN"`
       */
      languageCode?: string | null;
      /**
       * Price and currency Wix uses to charge the site owners. Overrides the
       * default values you've set in the app's pricing plan. Only supported in combination with `{"billingCycle": "ONE_TIME"}`.
       * Otherwise the call fails with a validation error.
       * @internal
       */
      chargeOverride?: ChargeOverride;
      /** Coupon code for the paid plan. Available only in case there is a discount. */
      couponCode?: string | null;
  }
  interface ChargeOverride {
      /**
       * Override price. In case you omit the override price, Wix charges site
       * owners the app's default price that's configured in the Pricing page of your app's dashboard.
       */
      price?: number;
      /**
       * Override 3-letter currency code in
       * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
       */
      currency?: string;
  }
  interface GetUrlResponse {
      /** URL for the Wix checkout page. */
      checkoutUrl?: string;
      /**
       * Token for the Wix checkout page. The token holds all data about the order
       * you're creating a checkout for.  It is [signed](),
       * so you can verify that it comes from Wix.
       */
      token?: string | null;
  }
  interface GetPurchaseHistoryRequest {
  }
  interface GetPurchaseHistoryResponse {
      /** Retrieved purchases the site owners have completed for you app. */
      purchases?: PurchasedItem[];
  }
  interface GetSitePaymentMethodsStatusRequest {
  }
  interface GetSitePaymentMethodsStatusResponse {
      /**
       * Whether the site owners have enabled at least a single online payment method.
       * Online payment methods include Wix Payments, Stripe, PayPal, and credit
       * cards.
       */
      onlineProviderEnabled?: boolean;
      /** Whether the site owners accept offline payments. */
      offlineProviderEnabled?: boolean;
      /**
       * Whether the site owners have enabled the
       * [Wix Point of Sale](https://www.wix.com/pos).
       * This allows their customers to make electronic payments in person.
       */
      wixPosProviderEnabled?: boolean;
      /**
       * Whether the site owners have enabled at least one 3rd-party point-of-sale
       * provider. This allows their customers to make electronic payments in person.
       */
      thirdPartyPosProviderEnabled?: boolean;
  }
  interface GetMeteredBillingChargesRequest {
      /**
       * 3-letter currency code in
       * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
       */
      currency?: string | null;
      /**
       * Start of the period you want to retrieve the custom charges for in
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      startDate?: Date | null;
      /**
       * End of the period you want to retrieve the custom charges for in
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      endDate?: Date | null;
  }
  interface GetMeteredBillingChargesResponse {
      /** List of retrieved custom charges. */
      charges?: Charge[];
  }
  interface Charge {
      /** ID of the custom charge. The ID consists of 64 characters. */
      _id?: string | null;
      /** Description of the custom charge. */
      description?: string;
      /**
       * Charge amount.
       *
       * Min: `0.50`
       */
      amount?: string;
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
   * Retrieves the URL for a Wix checkout page for the specified paid plan of your app.
   *
   *
   * This call succeeds only in case you have previously
   * [set up an external pricing page in your app's dashboard](https://dev.wix.com/docs/build-apps/build-your-app/pricing-plans/set-up-an-external-pricing-page).
   *
   * The returned checkout URL is valid for 48 hours.
   *
   * This API allows your app to manage your pricing page outside of Wix while
   * still using the standard Wix checkout flow.
   * @param productId - ID of your app's paid plan to retrieve the Wix checkout URL for. Check your app's dashboard
   * for a list of your app's supported product IDs.
   * @public
   * @documentationMaturity preview
   * @requiredField productId
   * @permissionId WIX_DEVELOPERS.CREATE_CHECKOUT
   * @adminMethod
   */
  function getUrl(productId: string, options?: GetUrlOptions): Promise<GetUrlResponse>;
  interface GetUrlOptions {
      /**
       * URL for the Wix checkout page. Redirect site owners to this URL after
       * they've successfully purchased a paid plan for your app.
       */
      successUrl?: string | null;
      /**
       * Whether the checkout is for testing purposes only. Testing is mainly
       * relevant for in-app purchase flows. When `true`, Wix charges the site
       * owners an amount of `0.00`.
       */
      testCheckout?: boolean;
      /** Information about the paid plan's billing cycle. */
      billingCycle?: PaymentCycle;
      /**
       * 2-letter country code in
       * [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
       * format.
       *
       * Default: `"US"`
       */
      countryCode?: string | null;
      /**
       * 2-letter language code in
       * [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format.
       *
       * Default: `"EN"`
       */
      languageCode?: string | null;
      /**
       * Price and currency Wix uses to charge the site owners. Overrides the
       * default values you've set in the app's pricing plan. Only supported in combination with `{"billingCycle": "ONE_TIME"}`.
       * Otherwise the call fails with a validation error.
       * @internal
       */
      chargeOverride?: ChargeOverride;
      /** Coupon code for the paid plan. Available only in case there is a discount. */
      couponCode?: string | null;
  }
  /**
   * Retrieves a list of the site owner's past purchases for your app.
   *
   *
   * You don't have to explicitly pass an identifier for the Wix site as part of
   * the request, since this information is taken automatically from the context.
   *
   * The response doesn't include any details about cancellations.
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_DEVELOPERS.APP_PURCHASE_HISTORY
   * @adminMethod
   */
  function getPurchaseHistory(): Promise<GetPurchaseHistoryResponse>;
  /**
   * Retrieves information about the site's enabled payment methods.
   *
   *
   * Checks whether online, offline, Wix POS, and external POS payments are
   * enabled.
   * @internal
   * @documentationMaturity preview
   * @permissionId DEV_CENTER.SITE_PAYMENT_METHOD
   * @adminMethod
   */
  function getSitePaymentMethodsStatus(): Promise<GetSitePaymentMethodsStatusResponse>;
  /**
   * Triggers Wix to call the
   * [List Custom Charges SPI](https://dev.wix.com/docs/rest/internal-only/premium/custom-charges-spi/custom-charges-provider-v1/list-charges).
   *
   *
   * Wix doesn't use the response from _List Charges_ SPI to actually create an
   * invoice that's sent to the customer. Instead, calling _Get Metered Billing Charges_
   * allows you confirm that your integration with the Custom Charges SPI is
   * working as intended.
   * @internal
   * @documentationMaturity preview
   * @permissionId WIX_DEVELOPERS.METERED_BILLING_CHARGES_READ
   * @adminMethod
   */
  function getMeteredBillingCharges(options?: GetMeteredBillingChargesOptions): Promise<GetMeteredBillingChargesResponse>;
  interface GetMeteredBillingChargesOptions {
      /**
       * 3-letter currency code in
       * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
       */
      currency?: string | null;
      /**
       * Start of the period you want to retrieve the custom charges for in
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      startDate?: Date | null;
      /**
       * End of the period you want to retrieve the custom charges for in
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      endDate?: Date | null;
  }
  
  type devcenterCheckoutV1PurchasedItem_universal_d_PurchasedItem = PurchasedItem;
  type devcenterCheckoutV1PurchasedItem_universal_d_PaymentCycle = PaymentCycle;
  const devcenterCheckoutV1PurchasedItem_universal_d_PaymentCycle: typeof PaymentCycle;
  type devcenterCheckoutV1PurchasedItem_universal_d_InvoiceStatusUpdate = InvoiceStatusUpdate;
  type devcenterCheckoutV1PurchasedItem_universal_d_InvoiceStatus = InvoiceStatus;
  const devcenterCheckoutV1PurchasedItem_universal_d_InvoiceStatus: typeof InvoiceStatus;
  type devcenterCheckoutV1PurchasedItem_universal_d_GetUrlRequest = GetUrlRequest;
  type devcenterCheckoutV1PurchasedItem_universal_d_ChargeOverride = ChargeOverride;
  type devcenterCheckoutV1PurchasedItem_universal_d_GetUrlResponse = GetUrlResponse;
  type devcenterCheckoutV1PurchasedItem_universal_d_GetPurchaseHistoryRequest = GetPurchaseHistoryRequest;
  type devcenterCheckoutV1PurchasedItem_universal_d_GetPurchaseHistoryResponse = GetPurchaseHistoryResponse;
  type devcenterCheckoutV1PurchasedItem_universal_d_GetSitePaymentMethodsStatusRequest = GetSitePaymentMethodsStatusRequest;
  type devcenterCheckoutV1PurchasedItem_universal_d_GetSitePaymentMethodsStatusResponse = GetSitePaymentMethodsStatusResponse;
  type devcenterCheckoutV1PurchasedItem_universal_d_GetMeteredBillingChargesRequest = GetMeteredBillingChargesRequest;
  type devcenterCheckoutV1PurchasedItem_universal_d_GetMeteredBillingChargesResponse = GetMeteredBillingChargesResponse;
  type devcenterCheckoutV1PurchasedItem_universal_d_Charge = Charge;
  type devcenterCheckoutV1PurchasedItem_universal_d_MessageEnvelope = MessageEnvelope;
  type devcenterCheckoutV1PurchasedItem_universal_d_IdentificationData = IdentificationData;
  type devcenterCheckoutV1PurchasedItem_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type devcenterCheckoutV1PurchasedItem_universal_d_WebhookIdentityType = WebhookIdentityType;
  const devcenterCheckoutV1PurchasedItem_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const devcenterCheckoutV1PurchasedItem_universal_d_getUrl: typeof getUrl;
  type devcenterCheckoutV1PurchasedItem_universal_d_GetUrlOptions = GetUrlOptions;
  const devcenterCheckoutV1PurchasedItem_universal_d_getPurchaseHistory: typeof getPurchaseHistory;
  const devcenterCheckoutV1PurchasedItem_universal_d_getSitePaymentMethodsStatus: typeof getSitePaymentMethodsStatus;
  const devcenterCheckoutV1PurchasedItem_universal_d_getMeteredBillingCharges: typeof getMeteredBillingCharges;
  type devcenterCheckoutV1PurchasedItem_universal_d_GetMeteredBillingChargesOptions = GetMeteredBillingChargesOptions;
  namespace devcenterCheckoutV1PurchasedItem_universal_d {
    export {
      devcenterCheckoutV1PurchasedItem_universal_d_PurchasedItem as PurchasedItem,
      devcenterCheckoutV1PurchasedItem_universal_d_PaymentCycle as PaymentCycle,
      devcenterCheckoutV1PurchasedItem_universal_d_InvoiceStatusUpdate as InvoiceStatusUpdate,
      devcenterCheckoutV1PurchasedItem_universal_d_InvoiceStatus as InvoiceStatus,
      devcenterCheckoutV1PurchasedItem_universal_d_GetUrlRequest as GetUrlRequest,
      devcenterCheckoutV1PurchasedItem_universal_d_ChargeOverride as ChargeOverride,
      devcenterCheckoutV1PurchasedItem_universal_d_GetUrlResponse as GetUrlResponse,
      devcenterCheckoutV1PurchasedItem_universal_d_GetPurchaseHistoryRequest as GetPurchaseHistoryRequest,
      devcenterCheckoutV1PurchasedItem_universal_d_GetPurchaseHistoryResponse as GetPurchaseHistoryResponse,
      devcenterCheckoutV1PurchasedItem_universal_d_GetSitePaymentMethodsStatusRequest as GetSitePaymentMethodsStatusRequest,
      devcenterCheckoutV1PurchasedItem_universal_d_GetSitePaymentMethodsStatusResponse as GetSitePaymentMethodsStatusResponse,
      devcenterCheckoutV1PurchasedItem_universal_d_GetMeteredBillingChargesRequest as GetMeteredBillingChargesRequest,
      devcenterCheckoutV1PurchasedItem_universal_d_GetMeteredBillingChargesResponse as GetMeteredBillingChargesResponse,
      devcenterCheckoutV1PurchasedItem_universal_d_Charge as Charge,
      devcenterCheckoutV1PurchasedItem_universal_d_MessageEnvelope as MessageEnvelope,
      devcenterCheckoutV1PurchasedItem_universal_d_IdentificationData as IdentificationData,
      devcenterCheckoutV1PurchasedItem_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      devcenterCheckoutV1PurchasedItem_universal_d_WebhookIdentityType as WebhookIdentityType,
      devcenterCheckoutV1PurchasedItem_universal_d_getUrl as getUrl,
      devcenterCheckoutV1PurchasedItem_universal_d_GetUrlOptions as GetUrlOptions,
      devcenterCheckoutV1PurchasedItem_universal_d_getPurchaseHistory as getPurchaseHistory,
      devcenterCheckoutV1PurchasedItem_universal_d_getSitePaymentMethodsStatus as getSitePaymentMethodsStatus,
      devcenterCheckoutV1PurchasedItem_universal_d_getMeteredBillingCharges as getMeteredBillingCharges,
      devcenterCheckoutV1PurchasedItem_universal_d_GetMeteredBillingChargesOptions as GetMeteredBillingChargesOptions,
    };
  }
  
  /** Embedded script data */
  interface ScriptProperties {
      /** Script parameters */
      parameters?: Record<string, string>;
      /** Whether script is disabled or not, defaults to false (not disabled) */
      disabled?: boolean;
  }
  interface EmbedScriptRequest {
      /** Details of the script to embed. */
      properties: ScriptProperties;
      /** ID of the corresponding embedded script component. */
      componentId?: string | null;
  }
  interface EmbedScriptResponse {
      /** Details of the embedded script. */
      properties?: ScriptProperties;
  }
  interface GetEmbeddedScriptRequest {
      /** Component ID of the embedded script to retrieve. */
      componentId?: string | null;
  }
  interface GetEmbeddedScriptResponse {
      /** Details of the retrieved embedded script. */
      properties?: ScriptProperties;
  }
  interface EmbedScriptByInstanceIdRequest {
      instanceId: string;
      /** Parameters to embed */
      properties: ScriptProperties;
      componentId?: string | null;
  }
  interface GetEmbeddedScriptByInstanceIdRequest {
      instanceId: string;
      componentId?: string | null;
  }
  /**
   * Inserts custom script tags into a site.
   *
   *
   * Your app must have an existing
   * [embedded script component](https://dev.wix.com/docs/build-apps/develop-your-app/extensions/site-extensions/embedded-scripts/about-embedded-scripts),
   * with exactly matching parameter names.
   * @param properties - Details of the script to embed.
   * @public
   * @documentationMaturity preview
   * @requiredField properties
   * @permissionId APPS.MANAGE_EMBEDDED_SCRIPT
   * @adminMethod
   */
  function embedScript(properties: ScriptProperties, options?: EmbedScriptOptions): Promise<EmbedScriptResponse>;
  interface EmbedScriptOptions {
      /** ID of the corresponding embedded script component. */
      componentId?: string | null;
  }
  /**
   * Retrieves information about your app's existing embedded script.
   *
   *
   * The call fails with `404` error in case your app doesn't include an
   * embedded script on the site.
   * @public
   * @documentationMaturity preview
   * @permissionId APPS.MANAGE_EMBEDDED_SCRIPT
   * @adminMethod
   * @returns Details of the retrieved embedded script.
   */
  function getEmbeddedScript(options?: GetEmbeddedScriptOptions): Promise<ScriptProperties>;
  interface GetEmbeddedScriptOptions {
      /** Component ID of the embedded script to retrieve. */
      componentId?: string | null;
  }
  /** @param properties - Parameters to embed
   * @internal
   * @documentationMaturity preview
   * @requiredField instanceId
   * @requiredField properties
   * @permissionId my-account.manage-html-embeds
   * @adminMethod
   */
  function embedScriptByInstanceId(instanceId: string, properties: ScriptProperties, options?: EmbedScriptByInstanceIdOptions): Promise<EmbedScriptResponse>;
  interface EmbedScriptByInstanceIdOptions {
      componentId?: string | null;
  }
  /**
   * Retrieves this app's existing embedded script parameters
   * @internal
   * @documentationMaturity preview
   * @requiredField instanceId
   * @permissionId my-account.manage-html-embeds
   * @adminMethod
   */
  function getEmbeddedScriptByInstanceId(instanceId: string, options?: GetEmbeddedScriptByInstanceIdOptions): Promise<GetEmbeddedScriptResponse>;
  interface GetEmbeddedScriptByInstanceIdOptions {
      componentId?: string | null;
  }
  
  type devcenterScriptsV1ScriptProperties_universal_d_ScriptProperties = ScriptProperties;
  type devcenterScriptsV1ScriptProperties_universal_d_EmbedScriptRequest = EmbedScriptRequest;
  type devcenterScriptsV1ScriptProperties_universal_d_EmbedScriptResponse = EmbedScriptResponse;
  type devcenterScriptsV1ScriptProperties_universal_d_GetEmbeddedScriptRequest = GetEmbeddedScriptRequest;
  type devcenterScriptsV1ScriptProperties_universal_d_GetEmbeddedScriptResponse = GetEmbeddedScriptResponse;
  type devcenterScriptsV1ScriptProperties_universal_d_EmbedScriptByInstanceIdRequest = EmbedScriptByInstanceIdRequest;
  type devcenterScriptsV1ScriptProperties_universal_d_GetEmbeddedScriptByInstanceIdRequest = GetEmbeddedScriptByInstanceIdRequest;
  const devcenterScriptsV1ScriptProperties_universal_d_embedScript: typeof embedScript;
  type devcenterScriptsV1ScriptProperties_universal_d_EmbedScriptOptions = EmbedScriptOptions;
  const devcenterScriptsV1ScriptProperties_universal_d_getEmbeddedScript: typeof getEmbeddedScript;
  type devcenterScriptsV1ScriptProperties_universal_d_GetEmbeddedScriptOptions = GetEmbeddedScriptOptions;
  const devcenterScriptsV1ScriptProperties_universal_d_embedScriptByInstanceId: typeof embedScriptByInstanceId;
  type devcenterScriptsV1ScriptProperties_universal_d_EmbedScriptByInstanceIdOptions = EmbedScriptByInstanceIdOptions;
  const devcenterScriptsV1ScriptProperties_universal_d_getEmbeddedScriptByInstanceId: typeof getEmbeddedScriptByInstanceId;
  type devcenterScriptsV1ScriptProperties_universal_d_GetEmbeddedScriptByInstanceIdOptions = GetEmbeddedScriptByInstanceIdOptions;
  namespace devcenterScriptsV1ScriptProperties_universal_d {
    export {
      devcenterScriptsV1ScriptProperties_universal_d_ScriptProperties as ScriptProperties,
      devcenterScriptsV1ScriptProperties_universal_d_EmbedScriptRequest as EmbedScriptRequest,
      devcenterScriptsV1ScriptProperties_universal_d_EmbedScriptResponse as EmbedScriptResponse,
      devcenterScriptsV1ScriptProperties_universal_d_GetEmbeddedScriptRequest as GetEmbeddedScriptRequest,
      devcenterScriptsV1ScriptProperties_universal_d_GetEmbeddedScriptResponse as GetEmbeddedScriptResponse,
      devcenterScriptsV1ScriptProperties_universal_d_EmbedScriptByInstanceIdRequest as EmbedScriptByInstanceIdRequest,
      devcenterScriptsV1ScriptProperties_universal_d_GetEmbeddedScriptByInstanceIdRequest as GetEmbeddedScriptByInstanceIdRequest,
      devcenterScriptsV1ScriptProperties_universal_d_embedScript as embedScript,
      devcenterScriptsV1ScriptProperties_universal_d_EmbedScriptOptions as EmbedScriptOptions,
      devcenterScriptsV1ScriptProperties_universal_d_getEmbeddedScript as getEmbeddedScript,
      devcenterScriptsV1ScriptProperties_universal_d_GetEmbeddedScriptOptions as GetEmbeddedScriptOptions,
      devcenterScriptsV1ScriptProperties_universal_d_embedScriptByInstanceId as embedScriptByInstanceId,
      devcenterScriptsV1ScriptProperties_universal_d_EmbedScriptByInstanceIdOptions as EmbedScriptByInstanceIdOptions,
      devcenterScriptsV1ScriptProperties_universal_d_getEmbeddedScriptByInstanceId as getEmbeddedScriptByInstanceId,
      devcenterScriptsV1ScriptProperties_universal_d_GetEmbeddedScriptByInstanceIdOptions as GetEmbeddedScriptByInstanceIdOptions,
    };
  }
  
  export { devcenterAppInstanceV1AppInstance_universal_d as appInstances, appmarketV1AppPlans_universal_d as appPlans, devcenterBiEventsV1SendBiEventResponse_universal_d as biEvents, devcenterCheckoutV1PurchasedItem_universal_d as billing, devcenterScriptsV1ScriptProperties_universal_d as embeddedScripts };
}
