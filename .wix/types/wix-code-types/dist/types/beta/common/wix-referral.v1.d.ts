declare module "wix-referral.v1" {
  interface ReferralProgram {
      /** Referral program name. */
      name?: string | null;
      /** @readonly */
      status?: ProgramStatus;
      /**
       * Revision number, which increments by 1 each time the program is updated.
       * To prevent conflicting changes, the current `revision` must be passed when updating the program.
       */
      revision?: string | null;
      /**
       * Date and time the program was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the program was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Reward configuration for the referred friend.
       * Specifies the reward given to a new customer who was referred to the business.
       */
      referredFriendReward?: Reward$2;
      /**
       * Reward configuration for the referring customer.
       * Specifies the reward given to an existing customer who referred a new customer to the business.
       */
      referringCustomerReward?: Reward$2;
      /** List of actions that complete a referral. For an action to be considered successful, the referred friend must place and pay for an item. */
      successfulReferralActions?: Action[];
      /** Configures email notifications for the referral program. */
      emails?: Emails;
      /**
       * Indicates which premium features are available for the current account.
       * @readonly
       */
      premiumFeatures?: PremiumFeatures;
  }
  /** Status of the referral program. */
  enum ProgramStatus {
      /** Unknown program status. */
      UNKNOWN = "UNKNOWN",
      /** Referral program is in a draft state and is being modified. It is not yet active. */
      DRAFT = "DRAFT",
      /** Referral program is active. */
      ACTIVE = "ACTIVE",
      /** Referral program is paused. */
      PAUSED = "PAUSED"
  }
  interface Reward$2 extends RewardOptionsOneOf$1 {
      /** Options for coupon reward type. */
      couponOptions?: Coupon$2;
      /** Options for the Loyalty points reward type. */
      loyaltyPointsOptions?: LoyaltyPoints$2;
      /** Type of the reward. */
      type?: Type$1;
  }
  /** @oneof */
  interface RewardOptionsOneOf$1 {
      /** Options for coupon reward type. */
      couponOptions?: Coupon$2;
      /** Options for the Loyalty points reward type. */
      loyaltyPointsOptions?: LoyaltyPoints$2;
  }
  enum Type$1 {
      /** Unknown reward type. */
      UNKNOWN = "UNKNOWN",
      /** Coupon reward type. */
      COUPON = "COUPON",
      /** Loyalty points reward type. */
      LOYALTY_POINTS = "LOYALTY_POINTS",
      /** No reward type. */
      NOTHING = "NOTHING"
  }
  interface Coupon$2 extends CouponDiscountTypeOptionsOneOf$2, CouponScopeOrMinSubtotalOneOf$2 {
      /** Options for fixed amount discount. */
      fixedAmountOptions?: FixedAmountDiscount$2;
      /** Options for percentage discounts. */
      percentageOptions?: PercentageDiscount$2;
      /** Limit the coupon to carts with a subtotal above this number. */
      minimumSubtotal?: number;
      /** Specifies the type of line items this coupon will apply to. See [valid scope values](https://dev.wix.com/api/rest/coupons/coupons/valid-scope-values). */
      scope?: CouponScope$2;
      /** Coupon name. */
      name?: string;
      /** Coupon discount type. */
      discountType?: DiscountType$2;
      /**
       * Whether the coupon is limited to one item.
       * If `true` and a customer pays for multiple items, the discount applies to only the lowest priced item.
       * Coupons with a bookings `scope.namespace` are always limited to one item.
       */
      limitedToOneItem?: boolean | null;
      /** Whether the coupon applies to subscription products. */
      appliesToSubscriptions?: boolean | null;
      /**
       * Specifies the amount of discounted cycles for a subscription item.
       *
       * - Can only be set when `scope.namespace = pricingPlans`.
       * - If `discountedCycleCount` is empty, the coupon applies to all available cycles.
       * - `discountedCycleCount` is ignored if `appliesToSubscriptions = true`.
       *
       * Max: `999`
       */
      discountedCycleCount?: number | null;
  }
  /** @oneof */
  interface CouponDiscountTypeOptionsOneOf$2 {
      /** Options for fixed amount discount. */
      fixedAmountOptions?: FixedAmountDiscount$2;
      /** Options for percentage discounts. */
      percentageOptions?: PercentageDiscount$2;
  }
  /** @oneof */
  interface CouponScopeOrMinSubtotalOneOf$2 {
      /** Limit the coupon to carts with a subtotal above this number. */
      minimumSubtotal?: number;
      /** Specifies the type of line items this coupon will apply to. See [valid scope values](https://dev.wix.com/api/rest/coupons/coupons/valid-scope-values). */
      scope?: CouponScope$2;
  }
  enum DiscountType$2 {
      /** Unknown discount type. */
      UNKNOWN = "UNKNOWN",
      /** Discount as a fixed amount. */
      FIXED_AMOUNT = "FIXED_AMOUNT",
      /** Discount as a percentage. */
      PERCENTAGE = "PERCENTAGE",
      /** Free shipping. If `true`, the coupon applies to all items in all `namespaces`. */
      FREE_SHIPPING = "FREE_SHIPPING"
  }
  interface FixedAmountDiscount$2 {
      /** Amount of the discount as a fixed value. */
      amount?: number;
  }
  interface PercentageDiscount$2 {
      /** Percentage of discount. */
      percentage?: number;
  }
  interface CouponScope$2 {
      /** Scope namespace (Wix Stores, Wix Bookings, Wix Events, Wix Pricing Plans) */
      namespace?: string;
      /** Coupon scope's applied group, for example, Event or ticket in Wix Events. */
      group?: Group$2;
  }
  interface Group$2 {
      /** Name of the group. */
      name?: string;
      /** Entity ID of the group. */
      entityId?: string | null;
  }
  interface LoyaltyPoints$2 {
      /** Number of loyalty points to give. */
      amount?: number;
  }
  enum Action {
      /** Unknown action. */
      UNKNOWN = "UNKNOWN",
      /** Referred friend ordered and paid for an order in a store. */
      STORE_ORDER_PLACED = "STORE_ORDER_PLACED",
      /** Referred friend ordered and paid for a plan. */
      PLAN_ORDERED = "PLAN_ORDERED",
      /** Referred friend ordered and paid for a ticket. */
      TICKET_ORDERED = "TICKET_ORDERED",
      /** Referred friend booked and paid for a session. */
      SESSION_BOOKED = "SESSION_BOOKED",
      /** Referred friend placed and paid for a restaurant order. */
      RESTAURANT_ORDER_PLACED = "RESTAURANT_ORDER_PLACED",
      /** Referred friend joined an online program. */
      ONLINE_PROGRAM_JOINED = "ONLINE_PROGRAM_JOINED"
  }
  interface Emails {
      /** Configures email invitations to encourage customers to refer their friends. Select the apps for which this feature is enabled. */
      encourageToReferFriends?: App[];
      /**
       * Whether to send email notifications to referring customers when they receive a referral reward.
       * If true, referring customers will be notified by email when their referred friend completes a qualifying action (for example, placing an order).
       */
      notifyCustomersAboutReward?: boolean;
  }
  enum App {
      /** Unknown app. */
      UNKNOWN = "UNKNOWN",
      /** Send an email to customers who've placed an order with stores. */
      STORES = "STORES",
      /** Send an email to customers who've placed an order with pricing plans. */
      PRICING_PLANS = "PRICING_PLANS",
      /** Send an email to customers who've placed an order with events. */
      EVENTS = "EVENTS",
      /** Send an email to customers who've placed an order with bookings. */
      BOOKINGS = "BOOKINGS",
      /** Send an email to customers who've placed an order with restaurants. */
      RESTAURANTS = "RESTAURANTS"
  }
  interface PremiumFeatures {
      /**
       * Whether the site owner has access to the referral program feature.
       * @readonly
       */
      referralProgram?: boolean;
  }
  interface GetReferralProgramRequest {
  }
  interface GetReferralProgramResponse {
      /** Retrieved referral program. */
      referralProgram?: ReferralProgram;
  }
  interface BulkGetReferralProgramRequest {
  }
  interface BulkGetReferralProgramResponse {
      /** Retrieved referral programs. */
      programInSites?: ProgramInSite[];
  }
  interface ProgramInSite {
      /** Metasite ID. */
      metaSiteId?: string;
      /** Retrieved referral program. */
      referralProgram?: ReferralProgram;
  }
  interface UpdateReferralProgramRequest {
      /** Referral program to update. Include the latest `revision` for a successful update. */
      referralProgram: ReferralProgram;
      /**
       * Fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface UpdateReferralProgramResponse {
      /** Updated referral program. */
      referralProgram?: ReferralProgram;
  }
  interface ActivateReferralProgramRequest {
  }
  interface ActivateReferralProgramResponse {
      /** Activated referral program. */
      referralProgram?: ReferralProgram;
  }
  interface PauseReferralProgramRequest {
  }
  interface PauseReferralProgramResponse {
      /** Paused referral program. */
      referralProgram?: ReferralProgram;
  }
  interface GetAISocialMediaPostsSuggestionsRequest {
      /** Topic to generate social media post suggestions for. For example, fitness, education, technology. */
      topic?: string;
  }
  interface GetAISocialMediaPostsSuggestionsResponse {
      /** Generated social media post suggestions. */
      suggestions?: AISocialMediaPostSuggestion[];
      /** Referral URL to refer friends. */
      referFriendsPageUrl?: string | null;
  }
  interface AISocialMediaPostSuggestion {
      /** Suggested post content. */
      postContent?: string;
      /** Suggested hashtags. */
      hashtags?: string[];
  }
  interface GenerateAISocialMediaPostsSuggestionsRequest {
      /** Topic to generate social media post suggestions for. For example, fitness, education, technology. */
      topic?: string;
  }
  interface GenerateAISocialMediaPostsSuggestionsResponse {
      /** Generated social media post suggestions. */
      suggestions?: AISocialMediaPostSuggestion[];
      /** Referral URL to refer friends. */
      referFriendsPageUrl?: string | null;
  }
  interface GetReferralProgramPremiumFeaturesRequest {
  }
  interface GetReferralProgramPremiumFeaturesResponse {
      /**
       * Whether the site has the referral program feature enabled.
       * @readonly
       */
      referralProgram?: boolean;
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
  interface Empty$3 {
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
      CODUX = "CODUX",
      /** Bobb - AI Design Creator. */
      MEDIA_DESIGN_CREATOR = "MEDIA_DESIGN_CREATOR"
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
  interface HtmlSitePublished {
      /** Application instance ID */
      appInstanceId?: string;
      /** Application type */
      appType?: string;
      /** Revision */
      revision?: string;
      /** MSID */
      metaSiteId?: string | null;
      /** optional branch id if publish is done from branch */
      branchId?: string | null;
      /** The site's last transactionId */
      lastTransactionId?: string | null;
      /** A list of the site's pages */
      pages?: Page[];
      /** Site's publish date */
      publishDate?: string;
  }
  interface Page {
      /** Page's Id */
      _id?: string;
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
   * Retrieves the referral program.
   * @public
   * @documentationMaturity preview
   * @permissionId REFERRALS.READ_PROGRAM
   */
  function getReferralProgram(): Promise<GetReferralProgramResponse>;
  /**
   * Retrieves multiple referral programs for all metasites that the caller is the member of.
   *
   * Must be called with a [user identity](https://dev.wix.com/docs/build-apps/develop-your-app/access/about-identities#identity-types).
   * @internal
   * @documentationMaturity preview
   * @permissionId REFERRALS.PROGRAM_BULK_READ
   * @adminMethod
   */
  function bulkGetReferralProgram(): Promise<BulkGetReferralProgramResponse>;
  /**
   * Updates a referral program. Supports partial updates.
   *
   * Revision number, which increments by 1 each time the referral program is updated.
   * To prevent conflicting changes, the current revision must be passed when updating the referral program.
   * @param referralProgram - Referral program to update. Include the latest `revision` for a successful update.
   * @public
   * @documentationMaturity preview
   * @requiredField referralProgram
   * @requiredField referralProgram.revision
   * @permissionId REFERRALS.MANAGE_PROGRAM
   * @adminMethod
   */
  function updateReferralProgram(referralProgram: ReferralProgram, options?: UpdateReferralProgramOptions): Promise<UpdateReferralProgramResponse>;
  interface UpdateReferralProgramOptions {
      /**
       * Fields to update.
       * @internal
       */
      mask?: string[];
  }
  /**
   * Activates the referral program, changing its status to `ACTIVE`.
   * @public
   * @documentationMaturity preview
   * @permissionId REFERRALS.MANAGE_PROGRAM
   * @adminMethod
   */
  function activateReferralProgram(): Promise<ActivateReferralProgramResponse>;
  /**
   * Pauses the referral program, changing its status to `PAUSED`.
   * @public
   * @documentationMaturity preview
   * @permissionId REFERRALS.MANAGE_PROGRAM
   * @adminMethod
   */
  function pauseReferralProgram(): Promise<PauseReferralProgramResponse>;
  /**
   * Retrieves pre-generated AI social media post suggestions for promoting the referral program.
   *
   * This method returns a list of AI-generated social media post suggestions that site owners or members can use to promote the referral program. You can display these suggestions in your app's UI, allowing users to easily copy and share them on their preferred social media platforms.
   *
   * >**Note**: This method retrieves existing suggestions. To generate new ones,
   * use the [Generate AI Social Media Posts Suggestions](https://dev.wix.com/docs/velo/api-reference/wix-marketing-v2/referral-program/programs/generate-ai-social-media-posts-suggestions) method.
   * @public
   * @documentationMaturity preview
   * @permissionId REFERRALS.MANAGE_PROGRAM
   * @adminMethod
   */
  function getAiSocialMediaPostsSuggestions(options?: GetAiSocialMediaPostsSuggestionsOptions): Promise<GetAISocialMediaPostsSuggestionsResponse>;
  interface GetAiSocialMediaPostsSuggestionsOptions {
      /** Topic to generate social media post suggestions for. For example, fitness, education, technology. */
      topic?: string;
  }
  /**
   * Creates new AI-generated social media post suggestions for promoting the referral program.
   *
   * This method generates new AI-powered social media post suggestions for promoting the referral program. Use it to refresh content or create alternatives to existing suggestions.
   *
   * >**Note**: This method generates new suggestions each time it's called. To retrieve existing suggestions without generating new ones, use the [Get AI Social Media Posts Suggestions](https://dev.wix.com/docs/velo/api-reference/wix-marketing-v2/referral-program/programs/get-ai-social-media-posts-suggestions) method.
   * @public
   * @documentationMaturity preview
   * @permissionId REFERRALS.MANAGE_PROGRAM
   * @adminMethod
   */
  function generateAiSocialMediaPostsSuggestions(options?: GenerateAiSocialMediaPostsSuggestionsOptions): Promise<GenerateAISocialMediaPostsSuggestionsResponse>;
  interface GenerateAiSocialMediaPostsSuggestionsOptions {
      /** Topic to generate social media post suggestions for. For example, fitness, education, technology. */
      topic?: string;
  }
  /**
   * Retrieves information about the enabled premium features for the referral program.
   * @public
   * @documentationMaturity preview
   * @permissionId REFERRALS.READ_PROGRAM
   */
  function getReferralProgramPremiumFeatures(): Promise<GetReferralProgramPremiumFeaturesResponse>;
  
  type loyaltyReferralV1Program_universal_d_ReferralProgram = ReferralProgram;
  type loyaltyReferralV1Program_universal_d_ProgramStatus = ProgramStatus;
  const loyaltyReferralV1Program_universal_d_ProgramStatus: typeof ProgramStatus;
  type loyaltyReferralV1Program_universal_d_Action = Action;
  const loyaltyReferralV1Program_universal_d_Action: typeof Action;
  type loyaltyReferralV1Program_universal_d_Emails = Emails;
  type loyaltyReferralV1Program_universal_d_App = App;
  const loyaltyReferralV1Program_universal_d_App: typeof App;
  type loyaltyReferralV1Program_universal_d_PremiumFeatures = PremiumFeatures;
  type loyaltyReferralV1Program_universal_d_GetReferralProgramRequest = GetReferralProgramRequest;
  type loyaltyReferralV1Program_universal_d_GetReferralProgramResponse = GetReferralProgramResponse;
  type loyaltyReferralV1Program_universal_d_BulkGetReferralProgramRequest = BulkGetReferralProgramRequest;
  type loyaltyReferralV1Program_universal_d_BulkGetReferralProgramResponse = BulkGetReferralProgramResponse;
  type loyaltyReferralV1Program_universal_d_ProgramInSite = ProgramInSite;
  type loyaltyReferralV1Program_universal_d_UpdateReferralProgramRequest = UpdateReferralProgramRequest;
  type loyaltyReferralV1Program_universal_d_UpdateReferralProgramResponse = UpdateReferralProgramResponse;
  type loyaltyReferralV1Program_universal_d_ActivateReferralProgramRequest = ActivateReferralProgramRequest;
  type loyaltyReferralV1Program_universal_d_ActivateReferralProgramResponse = ActivateReferralProgramResponse;
  type loyaltyReferralV1Program_universal_d_PauseReferralProgramRequest = PauseReferralProgramRequest;
  type loyaltyReferralV1Program_universal_d_PauseReferralProgramResponse = PauseReferralProgramResponse;
  type loyaltyReferralV1Program_universal_d_GetAISocialMediaPostsSuggestionsRequest = GetAISocialMediaPostsSuggestionsRequest;
  type loyaltyReferralV1Program_universal_d_GetAISocialMediaPostsSuggestionsResponse = GetAISocialMediaPostsSuggestionsResponse;
  type loyaltyReferralV1Program_universal_d_AISocialMediaPostSuggestion = AISocialMediaPostSuggestion;
  type loyaltyReferralV1Program_universal_d_GenerateAISocialMediaPostsSuggestionsRequest = GenerateAISocialMediaPostsSuggestionsRequest;
  type loyaltyReferralV1Program_universal_d_GenerateAISocialMediaPostsSuggestionsResponse = GenerateAISocialMediaPostsSuggestionsResponse;
  type loyaltyReferralV1Program_universal_d_GetReferralProgramPremiumFeaturesRequest = GetReferralProgramPremiumFeaturesRequest;
  type loyaltyReferralV1Program_universal_d_GetReferralProgramPremiumFeaturesResponse = GetReferralProgramPremiumFeaturesResponse;
  type loyaltyReferralV1Program_universal_d_MetaSiteSpecialEvent = MetaSiteSpecialEvent;
  type loyaltyReferralV1Program_universal_d_MetaSiteSpecialEventPayloadOneOf = MetaSiteSpecialEventPayloadOneOf;
  type loyaltyReferralV1Program_universal_d_Asset = Asset;
  type loyaltyReferralV1Program_universal_d_State = State;
  const loyaltyReferralV1Program_universal_d_State: typeof State;
  type loyaltyReferralV1Program_universal_d_SiteCreated = SiteCreated;
  type loyaltyReferralV1Program_universal_d_SiteCreatedContext = SiteCreatedContext;
  const loyaltyReferralV1Program_universal_d_SiteCreatedContext: typeof SiteCreatedContext;
  type loyaltyReferralV1Program_universal_d_Namespace = Namespace;
  const loyaltyReferralV1Program_universal_d_Namespace: typeof Namespace;
  type loyaltyReferralV1Program_universal_d_SiteTransferred = SiteTransferred;
  type loyaltyReferralV1Program_universal_d_SiteDeleted = SiteDeleted;
  type loyaltyReferralV1Program_universal_d_DeleteContext = DeleteContext;
  type loyaltyReferralV1Program_universal_d_DeleteStatus = DeleteStatus;
  const loyaltyReferralV1Program_universal_d_DeleteStatus: typeof DeleteStatus;
  type loyaltyReferralV1Program_universal_d_SiteUndeleted = SiteUndeleted;
  type loyaltyReferralV1Program_universal_d_SitePublished = SitePublished;
  type loyaltyReferralV1Program_universal_d_SiteUnpublished = SiteUnpublished;
  type loyaltyReferralV1Program_universal_d_SiteMarkedAsTemplate = SiteMarkedAsTemplate;
  type loyaltyReferralV1Program_universal_d_SiteMarkedAsWixSite = SiteMarkedAsWixSite;
  type loyaltyReferralV1Program_universal_d_ServiceProvisioned = ServiceProvisioned;
  type loyaltyReferralV1Program_universal_d_ServiceRemoved = ServiceRemoved;
  type loyaltyReferralV1Program_universal_d_SiteRenamed = SiteRenamed;
  type loyaltyReferralV1Program_universal_d_SiteHardDeleted = SiteHardDeleted;
  type loyaltyReferralV1Program_universal_d_NamespaceChanged = NamespaceChanged;
  type loyaltyReferralV1Program_universal_d_StudioAssigned = StudioAssigned;
  type loyaltyReferralV1Program_universal_d_StudioUnassigned = StudioUnassigned;
  type loyaltyReferralV1Program_universal_d_HtmlSitePublished = HtmlSitePublished;
  type loyaltyReferralV1Program_universal_d_Page = Page;
  type loyaltyReferralV1Program_universal_d_SubscriptionEvent = SubscriptionEvent;
  type loyaltyReferralV1Program_universal_d_SubscriptionEventEventOneOf = SubscriptionEventEventOneOf;
  type loyaltyReferralV1Program_universal_d_SubscriptionCreated = SubscriptionCreated;
  type loyaltyReferralV1Program_universal_d_Subscription = Subscription;
  type loyaltyReferralV1Program_universal_d_BillingReference = BillingReference;
  type loyaltyReferralV1Program_universal_d_ProviderName = ProviderName;
  const loyaltyReferralV1Program_universal_d_ProviderName: typeof ProviderName;
  type loyaltyReferralV1Program_universal_d_Cycle = Cycle;
  type loyaltyReferralV1Program_universal_d_CycleCycleSelectorOneOf = CycleCycleSelectorOneOf;
  type loyaltyReferralV1Program_universal_d_Interval = Interval;
  type loyaltyReferralV1Program_universal_d_IntervalUnit = IntervalUnit;
  const loyaltyReferralV1Program_universal_d_IntervalUnit: typeof IntervalUnit;
  type loyaltyReferralV1Program_universal_d_OneTime = OneTime;
  type loyaltyReferralV1Program_universal_d_SubscriptionStatus = SubscriptionStatus;
  const loyaltyReferralV1Program_universal_d_SubscriptionStatus: typeof SubscriptionStatus;
  type loyaltyReferralV1Program_universal_d_ReactivationData = ReactivationData;
  type loyaltyReferralV1Program_universal_d_ReactivationReasonEnum = ReactivationReasonEnum;
  const loyaltyReferralV1Program_universal_d_ReactivationReasonEnum: typeof ReactivationReasonEnum;
  type loyaltyReferralV1Program_universal_d_SubscriptionAssigned = SubscriptionAssigned;
  type loyaltyReferralV1Program_universal_d_SubscriptionCancelled = SubscriptionCancelled;
  type loyaltyReferralV1Program_universal_d_CancellationDetails = CancellationDetails;
  type loyaltyReferralV1Program_universal_d_Initiator = Initiator;
  const loyaltyReferralV1Program_universal_d_Initiator: typeof Initiator;
  type loyaltyReferralV1Program_universal_d_SubscriptionAutoRenewTurnedOn = SubscriptionAutoRenewTurnedOn;
  type loyaltyReferralV1Program_universal_d_SubscriptionAutoRenewTurnedOff = SubscriptionAutoRenewTurnedOff;
  type loyaltyReferralV1Program_universal_d_SubscriptionUnassigned = SubscriptionUnassigned;
  type loyaltyReferralV1Program_universal_d_UnassignReason = UnassignReason;
  const loyaltyReferralV1Program_universal_d_UnassignReason: typeof UnassignReason;
  type loyaltyReferralV1Program_universal_d_SubscriptionTransferred = SubscriptionTransferred;
  type loyaltyReferralV1Program_universal_d_RecurringChargeSucceeded = RecurringChargeSucceeded;
  type loyaltyReferralV1Program_universal_d_ContractSwitched = ContractSwitched;
  type loyaltyReferralV1Program_universal_d_ContractSwitchType = ContractSwitchType;
  const loyaltyReferralV1Program_universal_d_ContractSwitchType: typeof ContractSwitchType;
  type loyaltyReferralV1Program_universal_d_ContractSwitchReason = ContractSwitchReason;
  const loyaltyReferralV1Program_universal_d_ContractSwitchReason: typeof ContractSwitchReason;
  type loyaltyReferralV1Program_universal_d_ProductPriceIncreaseData = ProductPriceIncreaseData;
  type loyaltyReferralV1Program_universal_d_PriceIncreaseTrigger = PriceIncreaseTrigger;
  const loyaltyReferralV1Program_universal_d_PriceIncreaseTrigger: typeof PriceIncreaseTrigger;
  type loyaltyReferralV1Program_universal_d_ProductAdjustment = ProductAdjustment;
  const loyaltyReferralV1Program_universal_d_ProductAdjustment: typeof ProductAdjustment;
  type loyaltyReferralV1Program_universal_d_SubscriptionNearEndOfPeriod = SubscriptionNearEndOfPeriod;
  type loyaltyReferralV1Program_universal_d_SubscriptionPendingChange = SubscriptionPendingChange;
  const loyaltyReferralV1Program_universal_d_getReferralProgram: typeof getReferralProgram;
  const loyaltyReferralV1Program_universal_d_bulkGetReferralProgram: typeof bulkGetReferralProgram;
  const loyaltyReferralV1Program_universal_d_updateReferralProgram: typeof updateReferralProgram;
  type loyaltyReferralV1Program_universal_d_UpdateReferralProgramOptions = UpdateReferralProgramOptions;
  const loyaltyReferralV1Program_universal_d_activateReferralProgram: typeof activateReferralProgram;
  const loyaltyReferralV1Program_universal_d_pauseReferralProgram: typeof pauseReferralProgram;
  const loyaltyReferralV1Program_universal_d_getAiSocialMediaPostsSuggestions: typeof getAiSocialMediaPostsSuggestions;
  type loyaltyReferralV1Program_universal_d_GetAiSocialMediaPostsSuggestionsOptions = GetAiSocialMediaPostsSuggestionsOptions;
  const loyaltyReferralV1Program_universal_d_generateAiSocialMediaPostsSuggestions: typeof generateAiSocialMediaPostsSuggestions;
  type loyaltyReferralV1Program_universal_d_GenerateAiSocialMediaPostsSuggestionsOptions = GenerateAiSocialMediaPostsSuggestionsOptions;
  const loyaltyReferralV1Program_universal_d_getReferralProgramPremiumFeatures: typeof getReferralProgramPremiumFeatures;
  namespace loyaltyReferralV1Program_universal_d {
    export {
      loyaltyReferralV1Program_universal_d_ReferralProgram as ReferralProgram,
      loyaltyReferralV1Program_universal_d_ProgramStatus as ProgramStatus,
      Reward$2 as Reward,
      RewardOptionsOneOf$1 as RewardOptionsOneOf,
      Type$1 as Type,
      Coupon$2 as Coupon,
      CouponDiscountTypeOptionsOneOf$2 as CouponDiscountTypeOptionsOneOf,
      CouponScopeOrMinSubtotalOneOf$2 as CouponScopeOrMinSubtotalOneOf,
      DiscountType$2 as DiscountType,
      FixedAmountDiscount$2 as FixedAmountDiscount,
      PercentageDiscount$2 as PercentageDiscount,
      CouponScope$2 as CouponScope,
      Group$2 as Group,
      LoyaltyPoints$2 as LoyaltyPoints,
      loyaltyReferralV1Program_universal_d_Action as Action,
      loyaltyReferralV1Program_universal_d_Emails as Emails,
      loyaltyReferralV1Program_universal_d_App as App,
      loyaltyReferralV1Program_universal_d_PremiumFeatures as PremiumFeatures,
      loyaltyReferralV1Program_universal_d_GetReferralProgramRequest as GetReferralProgramRequest,
      loyaltyReferralV1Program_universal_d_GetReferralProgramResponse as GetReferralProgramResponse,
      loyaltyReferralV1Program_universal_d_BulkGetReferralProgramRequest as BulkGetReferralProgramRequest,
      loyaltyReferralV1Program_universal_d_BulkGetReferralProgramResponse as BulkGetReferralProgramResponse,
      loyaltyReferralV1Program_universal_d_ProgramInSite as ProgramInSite,
      loyaltyReferralV1Program_universal_d_UpdateReferralProgramRequest as UpdateReferralProgramRequest,
      loyaltyReferralV1Program_universal_d_UpdateReferralProgramResponse as UpdateReferralProgramResponse,
      loyaltyReferralV1Program_universal_d_ActivateReferralProgramRequest as ActivateReferralProgramRequest,
      loyaltyReferralV1Program_universal_d_ActivateReferralProgramResponse as ActivateReferralProgramResponse,
      loyaltyReferralV1Program_universal_d_PauseReferralProgramRequest as PauseReferralProgramRequest,
      loyaltyReferralV1Program_universal_d_PauseReferralProgramResponse as PauseReferralProgramResponse,
      loyaltyReferralV1Program_universal_d_GetAISocialMediaPostsSuggestionsRequest as GetAISocialMediaPostsSuggestionsRequest,
      loyaltyReferralV1Program_universal_d_GetAISocialMediaPostsSuggestionsResponse as GetAISocialMediaPostsSuggestionsResponse,
      loyaltyReferralV1Program_universal_d_AISocialMediaPostSuggestion as AISocialMediaPostSuggestion,
      loyaltyReferralV1Program_universal_d_GenerateAISocialMediaPostsSuggestionsRequest as GenerateAISocialMediaPostsSuggestionsRequest,
      loyaltyReferralV1Program_universal_d_GenerateAISocialMediaPostsSuggestionsResponse as GenerateAISocialMediaPostsSuggestionsResponse,
      loyaltyReferralV1Program_universal_d_GetReferralProgramPremiumFeaturesRequest as GetReferralProgramPremiumFeaturesRequest,
      loyaltyReferralV1Program_universal_d_GetReferralProgramPremiumFeaturesResponse as GetReferralProgramPremiumFeaturesResponse,
      DomainEvent$4 as DomainEvent,
      DomainEventBodyOneOf$4 as DomainEventBodyOneOf,
      EntityCreatedEvent$4 as EntityCreatedEvent,
      RestoreInfo$4 as RestoreInfo,
      EntityUpdatedEvent$4 as EntityUpdatedEvent,
      EntityDeletedEvent$4 as EntityDeletedEvent,
      ActionEvent$4 as ActionEvent,
      Empty$3 as Empty,
      loyaltyReferralV1Program_universal_d_MetaSiteSpecialEvent as MetaSiteSpecialEvent,
      loyaltyReferralV1Program_universal_d_MetaSiteSpecialEventPayloadOneOf as MetaSiteSpecialEventPayloadOneOf,
      loyaltyReferralV1Program_universal_d_Asset as Asset,
      loyaltyReferralV1Program_universal_d_State as State,
      loyaltyReferralV1Program_universal_d_SiteCreated as SiteCreated,
      loyaltyReferralV1Program_universal_d_SiteCreatedContext as SiteCreatedContext,
      loyaltyReferralV1Program_universal_d_Namespace as Namespace,
      loyaltyReferralV1Program_universal_d_SiteTransferred as SiteTransferred,
      loyaltyReferralV1Program_universal_d_SiteDeleted as SiteDeleted,
      loyaltyReferralV1Program_universal_d_DeleteContext as DeleteContext,
      loyaltyReferralV1Program_universal_d_DeleteStatus as DeleteStatus,
      loyaltyReferralV1Program_universal_d_SiteUndeleted as SiteUndeleted,
      loyaltyReferralV1Program_universal_d_SitePublished as SitePublished,
      loyaltyReferralV1Program_universal_d_SiteUnpublished as SiteUnpublished,
      loyaltyReferralV1Program_universal_d_SiteMarkedAsTemplate as SiteMarkedAsTemplate,
      loyaltyReferralV1Program_universal_d_SiteMarkedAsWixSite as SiteMarkedAsWixSite,
      loyaltyReferralV1Program_universal_d_ServiceProvisioned as ServiceProvisioned,
      loyaltyReferralV1Program_universal_d_ServiceRemoved as ServiceRemoved,
      loyaltyReferralV1Program_universal_d_SiteRenamed as SiteRenamed,
      loyaltyReferralV1Program_universal_d_SiteHardDeleted as SiteHardDeleted,
      loyaltyReferralV1Program_universal_d_NamespaceChanged as NamespaceChanged,
      loyaltyReferralV1Program_universal_d_StudioAssigned as StudioAssigned,
      loyaltyReferralV1Program_universal_d_StudioUnassigned as StudioUnassigned,
      loyaltyReferralV1Program_universal_d_HtmlSitePublished as HtmlSitePublished,
      loyaltyReferralV1Program_universal_d_Page as Page,
      loyaltyReferralV1Program_universal_d_SubscriptionEvent as SubscriptionEvent,
      loyaltyReferralV1Program_universal_d_SubscriptionEventEventOneOf as SubscriptionEventEventOneOf,
      loyaltyReferralV1Program_universal_d_SubscriptionCreated as SubscriptionCreated,
      loyaltyReferralV1Program_universal_d_Subscription as Subscription,
      loyaltyReferralV1Program_universal_d_BillingReference as BillingReference,
      loyaltyReferralV1Program_universal_d_ProviderName as ProviderName,
      loyaltyReferralV1Program_universal_d_Cycle as Cycle,
      loyaltyReferralV1Program_universal_d_CycleCycleSelectorOneOf as CycleCycleSelectorOneOf,
      loyaltyReferralV1Program_universal_d_Interval as Interval,
      loyaltyReferralV1Program_universal_d_IntervalUnit as IntervalUnit,
      loyaltyReferralV1Program_universal_d_OneTime as OneTime,
      loyaltyReferralV1Program_universal_d_SubscriptionStatus as SubscriptionStatus,
      loyaltyReferralV1Program_universal_d_ReactivationData as ReactivationData,
      loyaltyReferralV1Program_universal_d_ReactivationReasonEnum as ReactivationReasonEnum,
      loyaltyReferralV1Program_universal_d_SubscriptionAssigned as SubscriptionAssigned,
      loyaltyReferralV1Program_universal_d_SubscriptionCancelled as SubscriptionCancelled,
      loyaltyReferralV1Program_universal_d_CancellationDetails as CancellationDetails,
      loyaltyReferralV1Program_universal_d_Initiator as Initiator,
      loyaltyReferralV1Program_universal_d_SubscriptionAutoRenewTurnedOn as SubscriptionAutoRenewTurnedOn,
      loyaltyReferralV1Program_universal_d_SubscriptionAutoRenewTurnedOff as SubscriptionAutoRenewTurnedOff,
      loyaltyReferralV1Program_universal_d_SubscriptionUnassigned as SubscriptionUnassigned,
      loyaltyReferralV1Program_universal_d_UnassignReason as UnassignReason,
      loyaltyReferralV1Program_universal_d_SubscriptionTransferred as SubscriptionTransferred,
      loyaltyReferralV1Program_universal_d_RecurringChargeSucceeded as RecurringChargeSucceeded,
      loyaltyReferralV1Program_universal_d_ContractSwitched as ContractSwitched,
      loyaltyReferralV1Program_universal_d_ContractSwitchType as ContractSwitchType,
      loyaltyReferralV1Program_universal_d_ContractSwitchReason as ContractSwitchReason,
      loyaltyReferralV1Program_universal_d_ProductPriceIncreaseData as ProductPriceIncreaseData,
      loyaltyReferralV1Program_universal_d_PriceIncreaseTrigger as PriceIncreaseTrigger,
      loyaltyReferralV1Program_universal_d_ProductAdjustment as ProductAdjustment,
      loyaltyReferralV1Program_universal_d_SubscriptionNearEndOfPeriod as SubscriptionNearEndOfPeriod,
      loyaltyReferralV1Program_universal_d_SubscriptionPendingChange as SubscriptionPendingChange,
      MessageEnvelope$4 as MessageEnvelope,
      IdentificationData$4 as IdentificationData,
      IdentificationDataIdOneOf$4 as IdentificationDataIdOneOf,
      WebhookIdentityType$4 as WebhookIdentityType,
      loyaltyReferralV1Program_universal_d_getReferralProgram as getReferralProgram,
      loyaltyReferralV1Program_universal_d_bulkGetReferralProgram as bulkGetReferralProgram,
      loyaltyReferralV1Program_universal_d_updateReferralProgram as updateReferralProgram,
      loyaltyReferralV1Program_universal_d_UpdateReferralProgramOptions as UpdateReferralProgramOptions,
      loyaltyReferralV1Program_universal_d_activateReferralProgram as activateReferralProgram,
      loyaltyReferralV1Program_universal_d_pauseReferralProgram as pauseReferralProgram,
      loyaltyReferralV1Program_universal_d_getAiSocialMediaPostsSuggestions as getAiSocialMediaPostsSuggestions,
      loyaltyReferralV1Program_universal_d_GetAiSocialMediaPostsSuggestionsOptions as GetAiSocialMediaPostsSuggestionsOptions,
      loyaltyReferralV1Program_universal_d_generateAiSocialMediaPostsSuggestions as generateAiSocialMediaPostsSuggestions,
      loyaltyReferralV1Program_universal_d_GenerateAiSocialMediaPostsSuggestionsOptions as GenerateAiSocialMediaPostsSuggestionsOptions,
      loyaltyReferralV1Program_universal_d_getReferralProgramPremiumFeatures as getReferralProgramPremiumFeatures,
    };
  }
  
  interface ReferralEvent extends ReferralEventEventTypeOneOf {
      /** Event triggered when a referred friend signs up. */
      referredFriendSignupEvent?: ReferredFriendSignupEvent;
      /** Event triggered when a referral is successful. For example, customer places and pays for an order. */
      successfulReferralEvent?: V1SuccessfulReferralEvent;
      /** Event triggered when an action is performed. For example, placing an order. */
      actionEvent?: V1ActionEvent;
      /** Event triggered when a reward is given. */
      rewardEvent?: RewardEvent;
      /**
       * Referral event ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the referral event is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the referral event.
       */
      revision?: string | null;
      /**
       * Date and time the referral event was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the referral event was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  /** @oneof */
  interface ReferralEventEventTypeOneOf {
      /** Event triggered when a referred friend signs up. */
      referredFriendSignupEvent?: ReferredFriendSignupEvent;
      /** Event triggered when a referral is successful. For example, customer places and pays for an order. */
      successfulReferralEvent?: V1SuccessfulReferralEvent;
      /** Event triggered when an action is performed. For example, placing an order. */
      actionEvent?: V1ActionEvent;
      /** Event triggered when a reward is given. */
      rewardEvent?: RewardEvent;
  }
  interface ReferredFriendSignupEvent {
      /** ID of the referred friend */
      referredFriendId?: string;
  }
  interface V1SuccessfulReferralEvent {
      /** ID of the referred friend */
      referredFriendId?: string;
      /** ID of the referring customer */
      referringCustomerId?: string;
  }
  interface V1ActionEvent {
      /** ID of the referred friend */
      referredFriendId?: string;
      /** ID of the referring customer */
      referringCustomerId?: string;
      /** Trigger for the action */
      trigger?: V1Trigger;
      /** Amount associated with the action. */
      amount?: string | null;
      /** Currency of the amount. */
      currency?: string | null;
      /** ID of the associated order. */
      orderId?: string | null;
  }
  interface V1Trigger {
      /** ID of the app that triggered the event */
      appId?: string;
      /** Type of activity that triggered the event */
      activityType?: string;
  }
  interface RewardEvent extends RewardEventReceiverOneOf {
      /**
       * ID of the rewarded referring customer.
       * @readonly
       */
      rewardedReferringCustomerId?: string;
      /**
       * ID of the rewarded referred friend.
       * @readonly
       */
      rewardedReferredFriendId?: string;
      /** ID of the referral reward. */
      referralRewardId?: string;
      /** Type of reward. */
      rewardType?: Reward$1;
  }
  /** @oneof */
  interface RewardEventReceiverOneOf {
      /**
       * ID of the rewarded referring customer.
       * @readonly
       */
      rewardedReferringCustomerId?: string;
      /**
       * ID of the rewarded referred friend.
       * @readonly
       */
      rewardedReferredFriendId?: string;
  }
  enum Reward$1 {
      /** Unknown reward. This field is not used. */
      UNKNOWN = "UNKNOWN",
      /** Reward is a coupon */
      COUPON = "COUPON",
      /** Reward is loyalty points. */
      LOYALTY_POINTS = "LOYALTY_POINTS",
      /** No reward. */
      NOTHING = "NOTHING"
  }
  interface CreateReferralEventRequest {
      /** Referral event to create */
      referralEvent: ReferralEvent;
  }
  interface CreateReferralEventResponse {
      /** Created referral event */
      referralEvent?: ReferralEvent;
  }
  interface GetReferralEventRequest {
      /** ID of the referral event to retrieve. */
      referralEventId: string;
  }
  interface GetReferralEventResponse {
      /** Retrieved referral event. */
      referralEvent?: ReferralEvent;
  }
  interface QueryReferralEventRequest {
      /** Query to filter referral events */
      query: CursorQuery$3;
  }
  interface CursorQuery$3 extends CursorQueryPagingMethodOneOf$3 {
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
      sort?: Sorting$3[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$3 {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$3;
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
  interface QueryReferralEventResponse {
      /** List of referral events. */
      referralEvents?: ReferralEvent[];
      /** Metadata for the paginated results. */
      metadata?: CursorPagingMetadata$3;
  }
  interface CursorPagingMetadata$3 {
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
  interface GetReferralStatisticsRequest {
  }
  interface GetReferralStatisticsResponse {
      /** Total number of sign-ups completed by referred friends. */
      totalSignUpsCompleted?: number;
      /** Total number of actions completed by referred friends. */
      totalActionsCompleted?: number;
      /** Total amount of purchases made by referred friends. */
      totalAmountGenerated?: string;
  }
  interface QueryReferringCustomerTotalsRequest {
      /** Query to filter referring customer totals. */
      query?: CursorQuery$3;
      /** List of contact IDs to filter referring customer totals. */
      contactIds?: string[];
  }
  interface QueryReferringCustomerTotalsResponse {
      referringCustomerTotals?: ReferringCustomerTotal[];
      /** Paging metadata */
      metadata?: CursorPagingMetadata$3;
  }
  interface ReferringCustomerTotal {
      /**
       * ID of the referring customer.
       * @readonly
       */
      referringCustomerId?: string;
      /**
       * Contact ID.
       * @readonly
       */
      contactId?: string;
      /**
       * Date and time of the last successful referral.
       * @readonly
       */
      lastSuccessfulReferral?: Date | null;
      /**
       * Total number of successful referrals made by this customer.
       * @readonly
       */
      totalSuccessfulReferrals?: number;
      /**
       * Total amount of revenue generated by friends referred by this customer.
       * @readonly
       */
      totalAmountGenerated?: string;
      /**
       * Date and time of the last friend action.
       * @readonly
       */
      lastFriendAction?: Date | null;
      /**
       * Number of friends who have completed actions.
       * @readonly
       */
      totalFriendsWithActions?: number;
  }
  interface QueryReferredFriendActionsRequest {
      /** Query to filter referred friend actions. */
      query?: CursorQuery$3;
      /** List of contact IDs to filter referred friend actions. */
      contactIds?: string[];
  }
  interface QueryReferredFriendActionsResponse {
      /** List of referred friend actions matching the query. */
      referredFriendActions?: ReferredFriendAction[];
      /** Paging metadata */
      metadata?: CursorPagingMetadata$3;
  }
  interface ReferredFriendAction extends ReferredFriendActionRewardTypeOptionsOneOf {
      /** Coupon reward type options. */
      coupon?: V1Coupon$1;
      /** Loyalty points reward type options. */
      loyaltyPoints?: LoyaltyPoints$1;
      /**
       * Referred friend ID.
       * @readonly
       */
      referredFriendId?: string;
      /**
       * Contact ID.
       * @readonly
       */
      contactId?: string;
      /**
       * Trigger for the first action.
       * @readonly
       */
      trigger?: V1Trigger;
      /**
       * Date and time of the first action.
       * @readonly
       */
      actionDate?: Date | null;
      /** Type of issued reward. */
      rewardType?: Reward$1;
      /** Number of actions completed. */
      totalActions?: number;
      /**
       * Total amount spent by this referred friend.
       * @readonly
       */
      totalAmountSpent?: string;
      /**
       * Date and time of friend signup.
       * @readonly
       */
      signupDate?: Date | null;
  }
  /** @oneof */
  interface ReferredFriendActionRewardTypeOptionsOneOf {
      /** Coupon reward type options. */
      coupon?: V1Coupon$1;
      /** Loyalty points reward type options. */
      loyaltyPoints?: LoyaltyPoints$1;
  }
  interface V1Coupon$1 {
      /**
       * Coupon ID. Example: `8934b045-7052-4a90-be2b-832c70afc9da`.
       * @readonly
       */
      _id?: string;
      /**
       * The code that customers can use to apply the coupon. Example: `6RFD2A3HSPXW`.
       * @readonly
       */
      code?: string;
      /**
       * Current status of the coupon.
       * @readonly
       */
      status?: Status$2;
      /**
       * Detailed specifications of the coupon.
       * @readonly
       */
      couponSpecification?: Coupon$1;
  }
  enum Status$2 {
      /** Coupon status is unknown or not specified. */
      UNKNOWN = "UNKNOWN",
      /** Coupon is active and can be applied to purchases. */
      ACTIVE = "ACTIVE",
      /** Coupon was applied and can't be used again. */
      APPLIED = "APPLIED",
      /** Coupon was deleted and is no longer valid. */
      DELETED = "DELETED"
  }
  interface Coupon$1 extends CouponDiscountTypeOptionsOneOf$1, CouponScopeOrMinSubtotalOneOf$1 {
      /** Options for fixed amount discount. */
      fixedAmountOptions?: FixedAmountDiscount$1;
      /** Options for percentage discounts. */
      percentageOptions?: PercentageDiscount$1;
      /** Limit the coupon to carts with a subtotal above this number. */
      minimumSubtotal?: number;
      /** Specifies the type of line items this coupon will apply to. See [valid scope values](https://dev.wix.com/api/rest/coupons/coupons/valid-scope-values). */
      scope?: CouponScope$1;
      /** Coupon name. */
      name?: string;
      /** Coupon discount type. */
      discountType?: DiscountType$1;
      /**
       * Whether the coupon is limited to one item.
       * If `true` and a customer pays for multiple items, the discount applies to only the lowest priced item.
       * Coupons with a bookings `scope.namespace` are always limited to one item.
       */
      limitedToOneItem?: boolean | null;
      /** Whether the coupon applies to subscription products. */
      appliesToSubscriptions?: boolean | null;
      /**
       * Specifies the amount of discounted cycles for a subscription item.
       *
       * - Can only be set when `scope.namespace = pricingPlans`.
       * - If `discountedCycleCount` is empty, the coupon applies to all available cycles.
       * - `discountedCycleCount` is ignored if `appliesToSubscriptions = true`.
       *
       * Max: `999`
       */
      discountedCycleCount?: number | null;
  }
  /** @oneof */
  interface CouponDiscountTypeOptionsOneOf$1 {
      /** Options for fixed amount discount. */
      fixedAmountOptions?: FixedAmountDiscount$1;
      /** Options for percentage discounts. */
      percentageOptions?: PercentageDiscount$1;
  }
  /** @oneof */
  interface CouponScopeOrMinSubtotalOneOf$1 {
      /** Limit the coupon to carts with a subtotal above this number. */
      minimumSubtotal?: number;
      /** Specifies the type of line items this coupon will apply to. See [valid scope values](https://dev.wix.com/api/rest/coupons/coupons/valid-scope-values). */
      scope?: CouponScope$1;
  }
  enum DiscountType$1 {
      /** Unknown discount type. */
      UNKNOWN = "UNKNOWN",
      /** Discount as a fixed amount. */
      FIXED_AMOUNT = "FIXED_AMOUNT",
      /** Discount as a percentage. */
      PERCENTAGE = "PERCENTAGE",
      /** Free shipping. If `true`, the coupon applies to all items in all `namespaces`. */
      FREE_SHIPPING = "FREE_SHIPPING"
  }
  interface FixedAmountDiscount$1 {
      /** Amount of the discount as a fixed value. */
      amount?: number;
  }
  interface PercentageDiscount$1 {
      /** Percentage of discount. */
      percentage?: number;
  }
  interface CouponScope$1 {
      /** Scope namespace (Wix Stores, Wix Bookings, Wix Events, Wix Pricing Plans) */
      namespace?: string;
      /** Coupon scope's applied group, for example, Event or ticket in Wix Events. */
      group?: Group$1;
  }
  interface Group$1 {
      /** Name of the group. */
      name?: string;
      /** Entity ID of the group. */
      entityId?: string | null;
  }
  interface LoyaltyPoints$1 {
      /**
       * Loyalty transaction ID.
       * @readonly
       */
      transactionId?: string;
      /**
       * The number of loyalty points awarded.
       * @readonly
       */
      amount?: number;
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
  interface Empty$2 {
  }
  interface SuccessfulReferralEvent$2 {
      /** Details of the referred friend who completed their referral. */
      referredFriendDetails?: ReferredFriendDetails$2;
  }
  interface ReferredFriendDetails$2 {
      /**
       * ID of the referred friend.
       * @readonly
       */
      referredFriendId?: string;
      /**
       * Contact ID of the referred friend.
       * @readonly
       */
      contactId?: string;
      /**
       * ID of the customer who referred this friend.
       * @readonly
       */
      referringCustomerId?: string;
  }
  interface ReferredFriendActionEvent {
      /** Details of the referred friend. */
      referredFriendDetails?: ReferredFriendDetails$2;
      /** Details of the trigger. */
      trigger?: Trigger;
      /** Amount of the referral reward. */
      amount?: string | null;
      /** Currency of the referral reward. */
      currency?: string | null;
      /** ID of the order associated with the referral. */
      orderId?: string | null;
  }
  interface Trigger {
      /** ID of the app associated with the referral activity. */
      appId?: string;
      /** Type of referral activity. */
      activityType?: string;
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
   * Creates a referral event.
   * @param referralEvent - Referral event to create
   * @internal
   * @documentationMaturity preview
   * @requiredField referralEvent
   * @permissionId REFERRALS.MANAGE_REFERRAL_EVENTS
   * @adminMethod
   */
  function createReferralEvent(referralEvent: ReferralEvent): Promise<CreateReferralEventResponse>;
  /**
   * Retrieves a referral event by ID.
   * @param referralEventId - ID of the referral event to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField referralEventId
   * @permissionId REFERRALS.READ_REFERRAL_EVENTS
   * @adminMethod
   * @returns Retrieved referral event.
   */
  function getReferralEvent(referralEventId: string): Promise<ReferralEvent>;
  /**
   * Retrieves a list of referral events, given the provided paging, filtering, and sorting.
   *
   * To learn about working with Query endpoints, see
   * [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language),
   * [Sorting and Paging](https://dev.wix.com/api/rest/getting-started/pagination),
   * and [Field Projection](https://dev.wix.com/api/rest/getting-started/field-projection).
   * @public
   * @documentationMaturity preview
   * @permissionId REFERRALS.READ_REFERRAL_EVENTS
   * @adminMethod
   */
  function queryReferralEvent(): ReferralEventsQueryBuilder;
  interface QueryCursorResult$3 {
      cursors: Cursors$3;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ReferralEventsQueryResult extends QueryCursorResult$3 {
      items: ReferralEvent[];
      query: ReferralEventsQueryBuilder;
      next: () => Promise<ReferralEventsQueryResult>;
      prev: () => Promise<ReferralEventsQueryResult>;
  }
  interface ReferralEventsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'referredFriendSignupEvent' | 'successfulReferralEvent' | 'actionEvent' | 'rewardEvent' | '_createdDate' | '_updatedDate', value: any) => ReferralEventsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: 'referredFriendSignupEvent' | 'successfulReferralEvent' | 'actionEvent' | 'rewardEvent' | '_createdDate' | '_updatedDate', value: any) => ReferralEventsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferralEventsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferralEventsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferralEventsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferralEventsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: 'referredFriendSignupEvent' | 'successfulReferralEvent' | 'actionEvent' | 'rewardEvent' | '_createdDate' | '_updatedDate', value: any[]) => ReferralEventsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'referredFriendSignupEvent' | 'successfulReferralEvent' | 'actionEvent' | 'rewardEvent' | '_createdDate' | '_updatedDate', value: any) => ReferralEventsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'referredFriendSignupEvent' | 'successfulReferralEvent' | 'actionEvent' | 'rewardEvent' | '_createdDate' | '_updatedDate', value: boolean) => ReferralEventsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'referredFriendSignupEvent' | 'successfulReferralEvent' | 'actionEvent' | 'rewardEvent' | '_createdDate' | '_updatedDate'>) => ReferralEventsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'referredFriendSignupEvent' | 'successfulReferralEvent' | 'actionEvent' | 'rewardEvent' | '_createdDate' | '_updatedDate'>) => ReferralEventsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ReferralEventsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ReferralEventsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ReferralEventsQueryResult>;
  }
  /**
   * Retrieves referral statistics.
   * @public
   * @documentationMaturity preview
   * @permissionId REFERRALS.READ_REFERRAL_STATISTICS
   * @adminMethod
   */
  function getReferralStatistics(): Promise<GetReferralStatisticsResponse>;
  /**
   * Retrieves a list of referring customer totals, given the provided paging, filtering, and sorting.
   *
   * To learn about working with Query endpoints, see
   * [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language),
   * [Sorting and Paging](https://dev.wix.com/api/rest/getting-started/pagination),
   * and [Field Projection](https://dev.wix.com/api/rest/getting-started/field-projection).
   * @public
   * @documentationMaturity preview
   * @permissionId REFERRALS.READ_REFERRAL_STATISTICS
   * @adminMethod
   */
  function queryReferringCustomerTotals(options?: QueryReferringCustomerTotalsOptions): Promise<QueryReferringCustomerTotalsResponse>;
  interface QueryReferringCustomerTotalsOptions {
      /** Query to filter referring customer totals. */
      query?: CursorQuery$3;
      /** List of contact IDs to filter referring customer totals. */
      contactIds?: string[];
  }
  /**
   * Retrieves a list of referred friend actions, given the provided paging, filtering, and sorting.
   *
   * To learn about working with Query endpoints, see
   * [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language),
   * [Sorting and Paging](https://dev.wix.com/api/rest/getting-started/pagination),
   * and [Field Projection](https://dev.wix.com/api/rest/getting-started/field-projection).
   * @public
   * @documentationMaturity preview
   * @permissionId REFERRALS.READ_REFERRAL_STATISTICS
   * @adminMethod
   */
  function queryReferredFriendActions(options?: QueryReferredFriendActionsOptions): Promise<QueryReferredFriendActionsResponse>;
  interface QueryReferredFriendActionsOptions {
      /** Query to filter referred friend actions. */
      query?: CursorQuery$3;
      /** List of contact IDs to filter referred friend actions. */
      contactIds?: string[];
  }
  
  type loyaltyReferralV1ReferralEvent_universal_d_ReferralEvent = ReferralEvent;
  type loyaltyReferralV1ReferralEvent_universal_d_ReferralEventEventTypeOneOf = ReferralEventEventTypeOneOf;
  type loyaltyReferralV1ReferralEvent_universal_d_ReferredFriendSignupEvent = ReferredFriendSignupEvent;
  type loyaltyReferralV1ReferralEvent_universal_d_V1SuccessfulReferralEvent = V1SuccessfulReferralEvent;
  type loyaltyReferralV1ReferralEvent_universal_d_V1ActionEvent = V1ActionEvent;
  type loyaltyReferralV1ReferralEvent_universal_d_V1Trigger = V1Trigger;
  type loyaltyReferralV1ReferralEvent_universal_d_RewardEvent = RewardEvent;
  type loyaltyReferralV1ReferralEvent_universal_d_RewardEventReceiverOneOf = RewardEventReceiverOneOf;
  type loyaltyReferralV1ReferralEvent_universal_d_CreateReferralEventRequest = CreateReferralEventRequest;
  type loyaltyReferralV1ReferralEvent_universal_d_CreateReferralEventResponse = CreateReferralEventResponse;
  type loyaltyReferralV1ReferralEvent_universal_d_GetReferralEventRequest = GetReferralEventRequest;
  type loyaltyReferralV1ReferralEvent_universal_d_GetReferralEventResponse = GetReferralEventResponse;
  type loyaltyReferralV1ReferralEvent_universal_d_QueryReferralEventRequest = QueryReferralEventRequest;
  type loyaltyReferralV1ReferralEvent_universal_d_QueryReferralEventResponse = QueryReferralEventResponse;
  type loyaltyReferralV1ReferralEvent_universal_d_GetReferralStatisticsRequest = GetReferralStatisticsRequest;
  type loyaltyReferralV1ReferralEvent_universal_d_GetReferralStatisticsResponse = GetReferralStatisticsResponse;
  type loyaltyReferralV1ReferralEvent_universal_d_QueryReferringCustomerTotalsRequest = QueryReferringCustomerTotalsRequest;
  type loyaltyReferralV1ReferralEvent_universal_d_QueryReferringCustomerTotalsResponse = QueryReferringCustomerTotalsResponse;
  type loyaltyReferralV1ReferralEvent_universal_d_ReferringCustomerTotal = ReferringCustomerTotal;
  type loyaltyReferralV1ReferralEvent_universal_d_QueryReferredFriendActionsRequest = QueryReferredFriendActionsRequest;
  type loyaltyReferralV1ReferralEvent_universal_d_QueryReferredFriendActionsResponse = QueryReferredFriendActionsResponse;
  type loyaltyReferralV1ReferralEvent_universal_d_ReferredFriendAction = ReferredFriendAction;
  type loyaltyReferralV1ReferralEvent_universal_d_ReferredFriendActionRewardTypeOptionsOneOf = ReferredFriendActionRewardTypeOptionsOneOf;
  type loyaltyReferralV1ReferralEvent_universal_d_ReferredFriendActionEvent = ReferredFriendActionEvent;
  type loyaltyReferralV1ReferralEvent_universal_d_Trigger = Trigger;
  const loyaltyReferralV1ReferralEvent_universal_d_createReferralEvent: typeof createReferralEvent;
  const loyaltyReferralV1ReferralEvent_universal_d_getReferralEvent: typeof getReferralEvent;
  const loyaltyReferralV1ReferralEvent_universal_d_queryReferralEvent: typeof queryReferralEvent;
  type loyaltyReferralV1ReferralEvent_universal_d_ReferralEventsQueryResult = ReferralEventsQueryResult;
  type loyaltyReferralV1ReferralEvent_universal_d_ReferralEventsQueryBuilder = ReferralEventsQueryBuilder;
  const loyaltyReferralV1ReferralEvent_universal_d_getReferralStatistics: typeof getReferralStatistics;
  const loyaltyReferralV1ReferralEvent_universal_d_queryReferringCustomerTotals: typeof queryReferringCustomerTotals;
  type loyaltyReferralV1ReferralEvent_universal_d_QueryReferringCustomerTotalsOptions = QueryReferringCustomerTotalsOptions;
  const loyaltyReferralV1ReferralEvent_universal_d_queryReferredFriendActions: typeof queryReferredFriendActions;
  type loyaltyReferralV1ReferralEvent_universal_d_QueryReferredFriendActionsOptions = QueryReferredFriendActionsOptions;
  namespace loyaltyReferralV1ReferralEvent_universal_d {
    export {
      loyaltyReferralV1ReferralEvent_universal_d_ReferralEvent as ReferralEvent,
      loyaltyReferralV1ReferralEvent_universal_d_ReferralEventEventTypeOneOf as ReferralEventEventTypeOneOf,
      loyaltyReferralV1ReferralEvent_universal_d_ReferredFriendSignupEvent as ReferredFriendSignupEvent,
      loyaltyReferralV1ReferralEvent_universal_d_V1SuccessfulReferralEvent as V1SuccessfulReferralEvent,
      loyaltyReferralV1ReferralEvent_universal_d_V1ActionEvent as V1ActionEvent,
      loyaltyReferralV1ReferralEvent_universal_d_V1Trigger as V1Trigger,
      loyaltyReferralV1ReferralEvent_universal_d_RewardEvent as RewardEvent,
      loyaltyReferralV1ReferralEvent_universal_d_RewardEventReceiverOneOf as RewardEventReceiverOneOf,
      Reward$1 as Reward,
      loyaltyReferralV1ReferralEvent_universal_d_CreateReferralEventRequest as CreateReferralEventRequest,
      loyaltyReferralV1ReferralEvent_universal_d_CreateReferralEventResponse as CreateReferralEventResponse,
      loyaltyReferralV1ReferralEvent_universal_d_GetReferralEventRequest as GetReferralEventRequest,
      loyaltyReferralV1ReferralEvent_universal_d_GetReferralEventResponse as GetReferralEventResponse,
      loyaltyReferralV1ReferralEvent_universal_d_QueryReferralEventRequest as QueryReferralEventRequest,
      CursorQuery$3 as CursorQuery,
      CursorQueryPagingMethodOneOf$3 as CursorQueryPagingMethodOneOf,
      Sorting$3 as Sorting,
      SortOrder$3 as SortOrder,
      CursorPaging$3 as CursorPaging,
      loyaltyReferralV1ReferralEvent_universal_d_QueryReferralEventResponse as QueryReferralEventResponse,
      CursorPagingMetadata$3 as CursorPagingMetadata,
      Cursors$3 as Cursors,
      loyaltyReferralV1ReferralEvent_universal_d_GetReferralStatisticsRequest as GetReferralStatisticsRequest,
      loyaltyReferralV1ReferralEvent_universal_d_GetReferralStatisticsResponse as GetReferralStatisticsResponse,
      loyaltyReferralV1ReferralEvent_universal_d_QueryReferringCustomerTotalsRequest as QueryReferringCustomerTotalsRequest,
      loyaltyReferralV1ReferralEvent_universal_d_QueryReferringCustomerTotalsResponse as QueryReferringCustomerTotalsResponse,
      loyaltyReferralV1ReferralEvent_universal_d_ReferringCustomerTotal as ReferringCustomerTotal,
      loyaltyReferralV1ReferralEvent_universal_d_QueryReferredFriendActionsRequest as QueryReferredFriendActionsRequest,
      loyaltyReferralV1ReferralEvent_universal_d_QueryReferredFriendActionsResponse as QueryReferredFriendActionsResponse,
      loyaltyReferralV1ReferralEvent_universal_d_ReferredFriendAction as ReferredFriendAction,
      loyaltyReferralV1ReferralEvent_universal_d_ReferredFriendActionRewardTypeOptionsOneOf as ReferredFriendActionRewardTypeOptionsOneOf,
      V1Coupon$1 as V1Coupon,
      Status$2 as Status,
      Coupon$1 as Coupon,
      CouponDiscountTypeOptionsOneOf$1 as CouponDiscountTypeOptionsOneOf,
      CouponScopeOrMinSubtotalOneOf$1 as CouponScopeOrMinSubtotalOneOf,
      DiscountType$1 as DiscountType,
      FixedAmountDiscount$1 as FixedAmountDiscount,
      PercentageDiscount$1 as PercentageDiscount,
      CouponScope$1 as CouponScope,
      Group$1 as Group,
      LoyaltyPoints$1 as LoyaltyPoints,
      DomainEvent$3 as DomainEvent,
      DomainEventBodyOneOf$3 as DomainEventBodyOneOf,
      EntityCreatedEvent$3 as EntityCreatedEvent,
      RestoreInfo$3 as RestoreInfo,
      EntityUpdatedEvent$3 as EntityUpdatedEvent,
      EntityDeletedEvent$3 as EntityDeletedEvent,
      ActionEvent$3 as ActionEvent,
      Empty$2 as Empty,
      SuccessfulReferralEvent$2 as SuccessfulReferralEvent,
      ReferredFriendDetails$2 as ReferredFriendDetails,
      loyaltyReferralV1ReferralEvent_universal_d_ReferredFriendActionEvent as ReferredFriendActionEvent,
      loyaltyReferralV1ReferralEvent_universal_d_Trigger as Trigger,
      MessageEnvelope$3 as MessageEnvelope,
      IdentificationData$3 as IdentificationData,
      IdentificationDataIdOneOf$3 as IdentificationDataIdOneOf,
      WebhookIdentityType$3 as WebhookIdentityType,
      loyaltyReferralV1ReferralEvent_universal_d_createReferralEvent as createReferralEvent,
      loyaltyReferralV1ReferralEvent_universal_d_getReferralEvent as getReferralEvent,
      loyaltyReferralV1ReferralEvent_universal_d_queryReferralEvent as queryReferralEvent,
      loyaltyReferralV1ReferralEvent_universal_d_ReferralEventsQueryResult as ReferralEventsQueryResult,
      loyaltyReferralV1ReferralEvent_universal_d_ReferralEventsQueryBuilder as ReferralEventsQueryBuilder,
      loyaltyReferralV1ReferralEvent_universal_d_getReferralStatistics as getReferralStatistics,
      loyaltyReferralV1ReferralEvent_universal_d_queryReferringCustomerTotals as queryReferringCustomerTotals,
      loyaltyReferralV1ReferralEvent_universal_d_QueryReferringCustomerTotalsOptions as QueryReferringCustomerTotalsOptions,
      loyaltyReferralV1ReferralEvent_universal_d_queryReferredFriendActions as queryReferredFriendActions,
      loyaltyReferralV1ReferralEvent_universal_d_QueryReferredFriendActionsOptions as QueryReferredFriendActionsOptions,
    };
  }
  
  interface ReferralReward extends ReferralRewardReceiverOneOf, ReferralRewardRewardTypeOptionsOneOf {
      /**
       * ID of the referring customer who received the reward.
       * @readonly
       */
      rewardedReferringCustomerId?: string;
      /**
       * ID of the referred friend who received the reward.
       * @readonly
       */
      rewardedReferredFriendId?: string;
      /** Details of a coupon reward. Present when `reward_type` is `COUPON`. */
      coupon?: V1Coupon;
      /** Details of a loyalty points reward. Present when `reward_type` is `LOYALTY_POINTS`. */
      loyaltyPoints?: V1LoyaltyPoints;
      /**
       * Referral reward ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the referral reward is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the referral reward.
       */
      revision?: string | null;
      /**
       * Date and time the referral reward was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the referral reward was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Type of reward given. */
      rewardType?: RewardTypeType;
  }
  /** @oneof */
  interface ReferralRewardReceiverOneOf {
      /**
       * ID of the referring customer who received the reward.
       * @readonly
       */
      rewardedReferringCustomerId?: string;
      /**
       * ID of the referred friend who received the reward.
       * @readonly
       */
      rewardedReferredFriendId?: string;
  }
  /** @oneof */
  interface ReferralRewardRewardTypeOptionsOneOf {
      /** Details of a coupon reward. Present when `reward_type` is `COUPON`. */
      coupon?: V1Coupon;
      /** Details of a loyalty points reward. Present when `reward_type` is `LOYALTY_POINTS`. */
      loyaltyPoints?: V1LoyaltyPoints;
  }
  enum RewardTypeType {
      /** Unknown reward type. */
      UNKNOWN = "UNKNOWN",
      /** Loyalty coupon is given. */
      COUPON = "COUPON",
      /** Loyalty points are awarded. */
      LOYALTY_POINTS = "LOYALTY_POINTS",
      /** No reward is given. */
      NOTHING = "NOTHING"
  }
  interface V1Coupon {
      /**
       * Coupon ID. Example: `8934b045-7052-4a90-be2b-832c70afc9da`.
       * @readonly
       */
      _id?: string;
      /**
       * The code that customers can use to apply the coupon. Example: `6RFD2A3HSPXW`.
       * @readonly
       */
      code?: string;
      /**
       * Current status of the coupon.
       * @readonly
       */
      status?: Status$1;
      /**
       * Detailed specifications of the coupon.
       * @readonly
       */
      couponSpecification?: Coupon;
  }
  enum Status$1 {
      /** Coupon status is unknown or not specified. */
      UNKNOWN = "UNKNOWN",
      /** Coupon is active and can be applied to purchases. */
      ACTIVE = "ACTIVE",
      /** Coupon was applied and can't be used again. */
      APPLIED = "APPLIED",
      /** Coupon was deleted and is no longer valid. */
      DELETED = "DELETED"
  }
  interface Coupon extends CouponDiscountTypeOptionsOneOf, CouponScopeOrMinSubtotalOneOf {
      /** Options for fixed amount discount. */
      fixedAmountOptions?: FixedAmountDiscount;
      /** Options for percentage discounts. */
      percentageOptions?: PercentageDiscount;
      /** Limit the coupon to carts with a subtotal above this number. */
      minimumSubtotal?: number;
      /** Specifies the type of line items this coupon will apply to. See [valid scope values](https://dev.wix.com/api/rest/coupons/coupons/valid-scope-values). */
      scope?: CouponScope;
      /** Coupon name. */
      name?: string;
      /** Coupon discount type. */
      discountType?: DiscountType;
      /**
       * Whether the coupon is limited to one item.
       * If `true` and a customer pays for multiple items, the discount applies to only the lowest priced item.
       * Coupons with a bookings `scope.namespace` are always limited to one item.
       */
      limitedToOneItem?: boolean | null;
      /** Whether the coupon applies to subscription products. */
      appliesToSubscriptions?: boolean | null;
      /**
       * Specifies the amount of discounted cycles for a subscription item.
       *
       * - Can only be set when `scope.namespace = pricingPlans`.
       * - If `discountedCycleCount` is empty, the coupon applies to all available cycles.
       * - `discountedCycleCount` is ignored if `appliesToSubscriptions = true`.
       *
       * Max: `999`
       */
      discountedCycleCount?: number | null;
  }
  /** @oneof */
  interface CouponDiscountTypeOptionsOneOf {
      /** Options for fixed amount discount. */
      fixedAmountOptions?: FixedAmountDiscount;
      /** Options for percentage discounts. */
      percentageOptions?: PercentageDiscount;
  }
  /** @oneof */
  interface CouponScopeOrMinSubtotalOneOf {
      /** Limit the coupon to carts with a subtotal above this number. */
      minimumSubtotal?: number;
      /** Specifies the type of line items this coupon will apply to. See [valid scope values](https://dev.wix.com/api/rest/coupons/coupons/valid-scope-values). */
      scope?: CouponScope;
  }
  enum DiscountType {
      /** Unknown discount type. */
      UNKNOWN = "UNKNOWN",
      /** Discount as a fixed amount. */
      FIXED_AMOUNT = "FIXED_AMOUNT",
      /** Discount as a percentage. */
      PERCENTAGE = "PERCENTAGE",
      /** Free shipping. If `true`, the coupon applies to all items in all `namespaces`. */
      FREE_SHIPPING = "FREE_SHIPPING"
  }
  interface FixedAmountDiscount {
      /** Amount of the discount as a fixed value. */
      amount?: number;
  }
  interface PercentageDiscount {
      /** Percentage of discount. */
      percentage?: number;
  }
  interface CouponScope {
      /** Scope namespace (Wix Stores, Wix Bookings, Wix Events, Wix Pricing Plans) */
      namespace?: string;
      /** Coupon scope's applied group, for example, Event or ticket in Wix Events. */
      group?: Group;
  }
  interface Group {
      /** Name of the group. */
      name?: string;
      /** Entity ID of the group. */
      entityId?: string | null;
  }
  interface V1LoyaltyPoints {
      /**
       * Loyalty transaction ID.
       * @readonly
       */
      transactionId?: string;
      /**
       * The number of loyalty points awarded.
       * @readonly
       */
      amount?: number;
  }
  interface GetReferralRewardRequest {
      /** Referral reward ID. */
      _id: string;
  }
  interface GetReferralRewardResponse {
      /** Retrieved referral reward. */
      referralReward?: ReferralReward;
  }
  interface QueryReferralRewardsRequest {
      /** Query to filter referral rewards. */
      query: CursorQuery$2;
      /** Contact ID to filter rewards by. Use `"me"` for current identity's rewards. */
      contactId?: string | null;
  }
  interface CursorQuery$2 extends CursorQueryPagingMethodOneOf$2 {
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
      sort?: Sorting$2[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$2 {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$2;
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
  interface QueryReferralRewardsResponse {
      /** Retrieved referral rewards. */
      referralRewards?: ReferralReward[];
      /** Metadata for paging. */
      metadata?: CursorPagingMetadata$2;
  }
  interface CursorPagingMetadata$2 {
      /** Number of items returned in current page. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors$2;
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
  interface Cursors$2 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface ValidateReferralRewardRequest {
      /** Reward to validate. */
      reward?: Reward;
  }
  interface Reward extends RewardOptionsOneOf {
      /** Options for coupon reward type. */
      couponOptions?: Coupon;
      /** Options for the Loyalty points reward type. */
      loyaltyPointsOptions?: LoyaltyPoints;
      /** Type of the reward. */
      type?: Type;
  }
  /** @oneof */
  interface RewardOptionsOneOf {
      /** Options for coupon reward type. */
      couponOptions?: Coupon;
      /** Options for the Loyalty points reward type. */
      loyaltyPointsOptions?: LoyaltyPoints;
  }
  enum Type {
      /** Unknown reward type. */
      UNKNOWN = "UNKNOWN",
      /** Coupon reward type. */
      COUPON = "COUPON",
      /** Loyalty points reward type. */
      LOYALTY_POINTS = "LOYALTY_POINTS",
      /** No reward type. */
      NOTHING = "NOTHING"
  }
  interface LoyaltyPoints {
      /** Number of loyalty points to give. */
      amount?: number;
  }
  interface ValidateReferralRewardResponse {
  }
  interface BulkGetReferralRewardsRequest {
  }
  interface BulkGetReferralRewardsResponse {
      /** Rewards grouped by site. */
      rewardsInSite?: RewardsInSite[];
  }
  interface RewardsInSite {
      /** Metasite ID. */
      metaSiteId?: string;
      /** List of rewards for the site. */
      rewards?: ReferralReward[];
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
  interface Empty$1 {
  }
  interface SuccessfulReferralEvent$1 {
      /** Details of the referred friend who completed their referral. */
      referredFriendDetails?: ReferredFriendDetails$1;
  }
  interface ReferredFriendDetails$1 {
      /**
       * ID of the referred friend.
       * @readonly
       */
      referredFriendId?: string;
      /**
       * Contact ID of the referred friend.
       * @readonly
       */
      contactId?: string;
      /**
       * ID of the customer who referred this friend.
       * @readonly
       */
      referringCustomerId?: string;
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
   * Retrieves a referral reward.
   * @param _id - Referral reward ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId REFERRALS.READ_REWARDS
   * @adminMethod
   * @returns Retrieved referral reward.
   */
  function getReferralReward(_id: string): Promise<ReferralReward>;
  /**
   * Creates a query to retrieve a list of referral rewards.
   *
   * The `queryReferralRewards()` function builds a query to retrieve a list of events and returns a `ReferralRewardsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is typically used to run the query using the `find()` function.
   *
   * You can refine the query by chaining `ReferralRewardsQueryBuilder` functions onto the query. `ReferralRewardsQueryBuilder` functions enable you to sort, filter, and control the results `queryReferralRewards()` returns.
   *
   * `queryReferralRewards()` runs with these `ReferralRewardsQueryBuilder` defaults, which you can override:
   *
   * - `limit(50)`
   * - `descending("_createdDate")`
   *
   * The functions that are chained to `queryReferralRewards()` are applied in the order they're called. For example, if you apply ascending('rewardedReferredFriendId') and then descending('rewardType'), the results are sorted first by the referred friend ID, and then, if there are multiple results with the same ID, the items are sorted by reward type.
   * @public
   * @documentationMaturity preview
   * @permissionId REFERRALS.READ_REWARDS
   * @adminMethod
   */
  function queryReferralRewards(options?: QueryReferralRewardsOptions): ReferralRewardsQueryBuilder;
  interface QueryReferralRewardsOptions {
      /** Contact ID to filter rewards by. Use `"me"` for current identity's rewards. */
      contactId?: string | null | undefined;
  }
  interface QueryCursorResult$2 {
      cursors: Cursors$2;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ReferralRewardsQueryResult extends QueryCursorResult$2 {
      items: ReferralReward[];
      query: ReferralRewardsQueryBuilder;
      next: () => Promise<ReferralRewardsQueryResult>;
      prev: () => Promise<ReferralRewardsQueryResult>;
  }
  interface ReferralRewardsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'rewardedReferringCustomerId' | 'rewardedReferredFriendId' | '_createdDate' | '_updatedDate' | 'rewardType', value: any) => ReferralRewardsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: 'rewardedReferringCustomerId' | 'rewardedReferredFriendId' | '_createdDate' | '_updatedDate' | 'rewardType', value: any) => ReferralRewardsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferralRewardsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferralRewardsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferralRewardsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferralRewardsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: 'rewardedReferringCustomerId' | 'rewardedReferredFriendId', value: string) => ReferralRewardsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: 'rewardedReferringCustomerId' | 'rewardedReferredFriendId' | '_createdDate' | '_updatedDate' | 'rewardType', value: any[]) => ReferralRewardsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'rewardedReferringCustomerId' | 'rewardedReferredFriendId' | '_createdDate' | '_updatedDate' | 'rewardType', value: any) => ReferralRewardsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'rewardedReferringCustomerId' | 'rewardedReferredFriendId' | '_createdDate' | '_updatedDate' | 'rewardType', value: boolean) => ReferralRewardsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'rewardedReferringCustomerId' | 'rewardedReferredFriendId' | '_createdDate' | '_updatedDate' | 'rewardType'>) => ReferralRewardsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'rewardedReferringCustomerId' | 'rewardedReferredFriendId' | '_createdDate' | '_updatedDate' | 'rewardType'>) => ReferralRewardsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ReferralRewardsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ReferralRewardsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ReferralRewardsQueryResult>;
  }
  /**
   * Retrieves rewards from all metasites that the caller is the member of.
   *
   * This method must be called with a [user identity](https://dev.wix.com/docs/build-apps/develop-your-app/access/about-identities#wix-users).
   * @internal
   * @documentationMaturity preview
   * @permissionId REFERRALS.REWARD_BULK_READ
   * @adminMethod
   */
  function bulkGetReferralRewards(): Promise<BulkGetReferralRewardsResponse>;
  
  type loyaltyReferralV1ReferralReward_universal_d_ReferralReward = ReferralReward;
  type loyaltyReferralV1ReferralReward_universal_d_ReferralRewardReceiverOneOf = ReferralRewardReceiverOneOf;
  type loyaltyReferralV1ReferralReward_universal_d_ReferralRewardRewardTypeOptionsOneOf = ReferralRewardRewardTypeOptionsOneOf;
  type loyaltyReferralV1ReferralReward_universal_d_RewardTypeType = RewardTypeType;
  const loyaltyReferralV1ReferralReward_universal_d_RewardTypeType: typeof RewardTypeType;
  type loyaltyReferralV1ReferralReward_universal_d_V1Coupon = V1Coupon;
  type loyaltyReferralV1ReferralReward_universal_d_Coupon = Coupon;
  type loyaltyReferralV1ReferralReward_universal_d_CouponDiscountTypeOptionsOneOf = CouponDiscountTypeOptionsOneOf;
  type loyaltyReferralV1ReferralReward_universal_d_CouponScopeOrMinSubtotalOneOf = CouponScopeOrMinSubtotalOneOf;
  type loyaltyReferralV1ReferralReward_universal_d_DiscountType = DiscountType;
  const loyaltyReferralV1ReferralReward_universal_d_DiscountType: typeof DiscountType;
  type loyaltyReferralV1ReferralReward_universal_d_FixedAmountDiscount = FixedAmountDiscount;
  type loyaltyReferralV1ReferralReward_universal_d_PercentageDiscount = PercentageDiscount;
  type loyaltyReferralV1ReferralReward_universal_d_CouponScope = CouponScope;
  type loyaltyReferralV1ReferralReward_universal_d_Group = Group;
  type loyaltyReferralV1ReferralReward_universal_d_V1LoyaltyPoints = V1LoyaltyPoints;
  type loyaltyReferralV1ReferralReward_universal_d_GetReferralRewardRequest = GetReferralRewardRequest;
  type loyaltyReferralV1ReferralReward_universal_d_GetReferralRewardResponse = GetReferralRewardResponse;
  type loyaltyReferralV1ReferralReward_universal_d_QueryReferralRewardsRequest = QueryReferralRewardsRequest;
  type loyaltyReferralV1ReferralReward_universal_d_QueryReferralRewardsResponse = QueryReferralRewardsResponse;
  type loyaltyReferralV1ReferralReward_universal_d_ValidateReferralRewardRequest = ValidateReferralRewardRequest;
  type loyaltyReferralV1ReferralReward_universal_d_Reward = Reward;
  type loyaltyReferralV1ReferralReward_universal_d_RewardOptionsOneOf = RewardOptionsOneOf;
  type loyaltyReferralV1ReferralReward_universal_d_Type = Type;
  const loyaltyReferralV1ReferralReward_universal_d_Type: typeof Type;
  type loyaltyReferralV1ReferralReward_universal_d_LoyaltyPoints = LoyaltyPoints;
  type loyaltyReferralV1ReferralReward_universal_d_ValidateReferralRewardResponse = ValidateReferralRewardResponse;
  type loyaltyReferralV1ReferralReward_universal_d_BulkGetReferralRewardsRequest = BulkGetReferralRewardsRequest;
  type loyaltyReferralV1ReferralReward_universal_d_BulkGetReferralRewardsResponse = BulkGetReferralRewardsResponse;
  type loyaltyReferralV1ReferralReward_universal_d_RewardsInSite = RewardsInSite;
  const loyaltyReferralV1ReferralReward_universal_d_getReferralReward: typeof getReferralReward;
  const loyaltyReferralV1ReferralReward_universal_d_queryReferralRewards: typeof queryReferralRewards;
  type loyaltyReferralV1ReferralReward_universal_d_QueryReferralRewardsOptions = QueryReferralRewardsOptions;
  type loyaltyReferralV1ReferralReward_universal_d_ReferralRewardsQueryResult = ReferralRewardsQueryResult;
  type loyaltyReferralV1ReferralReward_universal_d_ReferralRewardsQueryBuilder = ReferralRewardsQueryBuilder;
  const loyaltyReferralV1ReferralReward_universal_d_bulkGetReferralRewards: typeof bulkGetReferralRewards;
  namespace loyaltyReferralV1ReferralReward_universal_d {
    export {
      loyaltyReferralV1ReferralReward_universal_d_ReferralReward as ReferralReward,
      loyaltyReferralV1ReferralReward_universal_d_ReferralRewardReceiverOneOf as ReferralRewardReceiverOneOf,
      loyaltyReferralV1ReferralReward_universal_d_ReferralRewardRewardTypeOptionsOneOf as ReferralRewardRewardTypeOptionsOneOf,
      loyaltyReferralV1ReferralReward_universal_d_RewardTypeType as RewardTypeType,
      loyaltyReferralV1ReferralReward_universal_d_V1Coupon as V1Coupon,
      Status$1 as Status,
      loyaltyReferralV1ReferralReward_universal_d_Coupon as Coupon,
      loyaltyReferralV1ReferralReward_universal_d_CouponDiscountTypeOptionsOneOf as CouponDiscountTypeOptionsOneOf,
      loyaltyReferralV1ReferralReward_universal_d_CouponScopeOrMinSubtotalOneOf as CouponScopeOrMinSubtotalOneOf,
      loyaltyReferralV1ReferralReward_universal_d_DiscountType as DiscountType,
      loyaltyReferralV1ReferralReward_universal_d_FixedAmountDiscount as FixedAmountDiscount,
      loyaltyReferralV1ReferralReward_universal_d_PercentageDiscount as PercentageDiscount,
      loyaltyReferralV1ReferralReward_universal_d_CouponScope as CouponScope,
      loyaltyReferralV1ReferralReward_universal_d_Group as Group,
      loyaltyReferralV1ReferralReward_universal_d_V1LoyaltyPoints as V1LoyaltyPoints,
      loyaltyReferralV1ReferralReward_universal_d_GetReferralRewardRequest as GetReferralRewardRequest,
      loyaltyReferralV1ReferralReward_universal_d_GetReferralRewardResponse as GetReferralRewardResponse,
      loyaltyReferralV1ReferralReward_universal_d_QueryReferralRewardsRequest as QueryReferralRewardsRequest,
      CursorQuery$2 as CursorQuery,
      CursorQueryPagingMethodOneOf$2 as CursorQueryPagingMethodOneOf,
      Sorting$2 as Sorting,
      SortOrder$2 as SortOrder,
      CursorPaging$2 as CursorPaging,
      loyaltyReferralV1ReferralReward_universal_d_QueryReferralRewardsResponse as QueryReferralRewardsResponse,
      CursorPagingMetadata$2 as CursorPagingMetadata,
      Cursors$2 as Cursors,
      loyaltyReferralV1ReferralReward_universal_d_ValidateReferralRewardRequest as ValidateReferralRewardRequest,
      loyaltyReferralV1ReferralReward_universal_d_Reward as Reward,
      loyaltyReferralV1ReferralReward_universal_d_RewardOptionsOneOf as RewardOptionsOneOf,
      loyaltyReferralV1ReferralReward_universal_d_Type as Type,
      loyaltyReferralV1ReferralReward_universal_d_LoyaltyPoints as LoyaltyPoints,
      loyaltyReferralV1ReferralReward_universal_d_ValidateReferralRewardResponse as ValidateReferralRewardResponse,
      loyaltyReferralV1ReferralReward_universal_d_BulkGetReferralRewardsRequest as BulkGetReferralRewardsRequest,
      loyaltyReferralV1ReferralReward_universal_d_BulkGetReferralRewardsResponse as BulkGetReferralRewardsResponse,
      loyaltyReferralV1ReferralReward_universal_d_RewardsInSite as RewardsInSite,
      DomainEvent$2 as DomainEvent,
      DomainEventBodyOneOf$2 as DomainEventBodyOneOf,
      EntityCreatedEvent$2 as EntityCreatedEvent,
      RestoreInfo$2 as RestoreInfo,
      EntityUpdatedEvent$2 as EntityUpdatedEvent,
      EntityDeletedEvent$2 as EntityDeletedEvent,
      ActionEvent$2 as ActionEvent,
      Empty$1 as Empty,
      SuccessfulReferralEvent$1 as SuccessfulReferralEvent,
      ReferredFriendDetails$1 as ReferredFriendDetails,
      MessageEnvelope$2 as MessageEnvelope,
      IdentificationData$2 as IdentificationData,
      IdentificationDataIdOneOf$2 as IdentificationDataIdOneOf,
      WebhookIdentityType$2 as WebhookIdentityType,
      loyaltyReferralV1ReferralReward_universal_d_getReferralReward as getReferralReward,
      loyaltyReferralV1ReferralReward_universal_d_queryReferralRewards as queryReferralRewards,
      loyaltyReferralV1ReferralReward_universal_d_QueryReferralRewardsOptions as QueryReferralRewardsOptions,
      loyaltyReferralV1ReferralReward_universal_d_ReferralRewardsQueryResult as ReferralRewardsQueryResult,
      loyaltyReferralV1ReferralReward_universal_d_ReferralRewardsQueryBuilder as ReferralRewardsQueryBuilder,
      loyaltyReferralV1ReferralReward_universal_d_bulkGetReferralRewards as bulkGetReferralRewards,
    };
  }
  
  interface ReferredFriend {
      /**
       * ID of the referred friend.
       * @readonly
       */
      _id?: string;
      /**
       * Contact ID of the referred friend.
       * @readonly
       */
      contactId?: string;
      /**
       * ID of the customer who referred this friend.
       * @readonly
       */
      referringCustomerId?: string;
      /** Status of the referred friend. */
      status?: Status;
      /**
       * Revision number, which increments by 1 each time the referred friend is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the referred friend.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the referred friend was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the referred friend was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  enum Status {
      /** Unknown status. */
      UNKNOWN = "UNKNOWN",
      /** Initial status when the referred friend joins the site as a member. */
      SIGN_UP_COMPLETED = "SIGN_UP_COMPLETED",
      /** Status after the referred friend completes a specific action, such as making a purchase. */
      ACTIONS_COMPLETED = "ACTIONS_COMPLETED"
  }
  interface CreateReferredFriendRequest {
      /** Referral code for the referred friend. */
      referralCode?: string | null;
  }
  interface CreateReferredFriendResponse {
      /** Created referred friend. */
      referredFriend?: ReferredFriend;
  }
  interface GetReferredFriendRequest {
      /** ID of the referred friend to retrieve. */
      referredFriendId: string;
  }
  interface GetReferredFriendResponse {
      /** Retrieved referred friend. */
      referredFriend?: ReferredFriend;
  }
  interface GetReferredFriendByContactIdRequest {
      /** Contact ID or "me" to get the current identity's contact. */
      contactId: string;
  }
  interface GetReferredFriendByContactIdResponse {
      /** Retrieved referred friend. */
      referredFriend?: ReferredFriend;
  }
  interface UpdateReferredFriendRequest {
      /** Referred friend to be updated. May be partial. */
      referredFriend: ReferredFriend;
      /**
       * List of fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface UpdateReferredFriendResponse {
      /** Updated referred friend. */
      referredFriend?: ReferredFriend;
  }
  interface DeleteReferredFriendRequest {
      /** ID of the referred friend to delete. */
      referredFriendId: string;
      /**
       * Revision number, which increments by 1 each time the referred friend is updated.
       * To prevent conflicting changes, the current revision must be passed when deleting the referred friend.
       */
      revision?: string;
  }
  interface DeleteReferredFriendResponse {
  }
  interface QueryReferredFriendRequest {
      /** Query options. */
      query: CursorQuery$1;
  }
  interface CursorQuery$1 extends CursorQueryPagingMethodOneOf$1 {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$1;
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
      cursorPaging?: CursorPaging$1;
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
  interface QueryReferredFriendResponse {
      /** Retrieved referred friends. */
      referredFriends?: ReferredFriend[];
      /** Cursor paging metadata. */
      metadata?: CursorPagingMetadata$1;
  }
  interface CursorPagingMetadata$1 {
      /** Number of items returned in current page. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors$1;
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
  interface Cursors$1 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
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
  interface Empty {
  }
  interface SuccessfulReferralEvent {
      /** Details of the referred friend who completed their referral. */
      referredFriendDetails?: ReferredFriendDetails;
  }
  interface ReferredFriendDetails {
      /**
       * ID of the referred friend.
       * @readonly
       */
      referredFriendId?: string;
      /**
       * Contact ID of the referred friend.
       * @readonly
       */
      contactId?: string;
      /**
       * ID of the customer who referred this friend.
       * @readonly
       */
      referringCustomerId?: string;
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
   * Creates a new referred friend or returns an existing entity if it already exists.
   *
   * This method must be called with a [member identity](https://dev.wix.com/docs/build-apps/develop-your-app/access/about-identities#site-members).
   *
   * A referral code must be provided either in the request or via scope.
   *
   * The member must be eligible to become a referred friend.
   * @public
   * @documentationMaturity preview
   * @permissionId REFERRALS.CREATE_OWN_REFERRED_FRIEND
   */
  function createReferredFriend(options?: CreateReferredFriendOptions): Promise<CreateReferredFriendResponse>;
  interface CreateReferredFriendOptions {
      /** Referral code for the referred friend. */
      referralCode?: string | null;
  }
  /**
   * Retrieves a referred friend by ID.
   * @param referredFriendId - ID of the referred friend to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField referredFriendId
   * @permissionId REFERRALS.READ_REFERRED_FRIENDS
   * @adminMethod
   * @returns Retrieved referred friend.
   */
  function getReferredFriend(referredFriendId: string): Promise<ReferredFriend>;
  /**
   * Retrieves a referred friend by contact ID.
   *
   * You can use `me` instead of a specific contact ID to get the referred friend for the current identity's contact.
   * @param contactId - Contact ID or "me" to get the current identity's contact.
   * @public
   * @documentationMaturity preview
   * @requiredField contactId
   * @permissionId REFERRALS.READ_REFERRED_FRIENDS
   * @adminMethod
   */
  function getReferredFriendByContactId(contactId: string): Promise<GetReferredFriendByContactIdResponse>;
  /**
   * Updates a referred friend. Supports partial updates.
   *
   * You must pass the latest `revision` for a successful update.
   * @param _id - ID of the referred friend.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField referredFriend
   * @requiredField referredFriend.revision
   * @permissionId REFERRALS.MANAGE_REFERRED_FRIENDS
   * @adminMethod
   * @returns Updated referred friend.
   */
  function updateReferredFriend(_id: string, referredFriend: UpdateReferredFriend, options?: UpdateReferredFriendOptions): Promise<ReferredFriend>;
  interface UpdateReferredFriend {
      /**
       * ID of the referred friend.
       * @readonly
       */
      _id?: string;
      /**
       * Contact ID of the referred friend.
       * @readonly
       */
      contactId?: string;
      /**
       * ID of the customer who referred this friend.
       * @readonly
       */
      referringCustomerId?: string;
      /** Status of the referred friend. */
      status?: Status;
      /**
       * Revision number, which increments by 1 each time the referred friend is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the referred friend.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the referred friend was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the referred friend was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  interface UpdateReferredFriendOptions {
      /**
       * List of fields to update.
       * @internal
       */
      mask?: string[];
  }
  /**
   * Deletes a referred friend.
   * @param referredFriendId - ID of the referred friend to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField referredFriendId
   * @permissionId REFERRALS.MANAGE_REFERRED_FRIENDS
   * @adminMethod
   */
  function deleteReferredFriend(referredFriendId: string, options?: DeleteReferredFriendOptions): Promise<void>;
  interface DeleteReferredFriendOptions {
      /**
       * Revision number, which increments by 1 each time the referred friend is updated.
       * To prevent conflicting changes, the current revision must be passed when deleting the referred friend.
       */
      revision?: string;
  }
  /**
   * Creates a query to retrieve a list of referred friends.
   *
   * The `queryReferredFriend()` function builds a query to retrieve a list of events and returns a `ReferredFriendsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is typically used to run the query using the `find()` function.
   *
   * You can refine the query by chaining `ReferredFriendsQueryBuilder` functions onto the query. `ReferredFriendsQueryBuilder` functions enable you to sort, filter, and control the results `queryReferredFriend()` returns.
   *
   * `queryReferredFriend()` runs with these `ReferredFriendQueryBuilder` defaults, which you can override:
   *
   * - `limit(50)`
   * - `descending("_createdDate")`
   *
   * The functions that are chained to `queryReferredFriend()` are applied in the order they're called. For example, if you apply ascending('status') and then descending('referringCustomerId'), the results are sorted first by the status, and then, if there are multiple results with the same status, the items are sorted by referring customer ID.
   * @public
   * @documentationMaturity preview
   * @permissionId REFERRALS.READ_REFERRED_FRIENDS
   * @adminMethod
   */
  function queryReferredFriend(): ReferredFriendsQueryBuilder;
  interface QueryCursorResult$1 {
      cursors: Cursors$1;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ReferredFriendsQueryResult extends QueryCursorResult$1 {
      items: ReferredFriend[];
      query: ReferredFriendsQueryBuilder;
      next: () => Promise<ReferredFriendsQueryResult>;
      prev: () => Promise<ReferredFriendsQueryResult>;
  }
  interface ReferredFriendsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'referringCustomerId' | 'status' | '_createdDate' | '_updatedDate', value: any) => ReferredFriendsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: 'referringCustomerId' | 'status' | '_createdDate' | '_updatedDate', value: any) => ReferredFriendsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferredFriendsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferredFriendsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferredFriendsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferredFriendsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: 'referringCustomerId', value: string) => ReferredFriendsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: 'referringCustomerId' | 'status' | '_createdDate' | '_updatedDate', value: any[]) => ReferredFriendsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'referringCustomerId' | 'status' | '_createdDate' | '_updatedDate', value: any) => ReferredFriendsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'referringCustomerId' | 'status' | '_createdDate' | '_updatedDate', value: boolean) => ReferredFriendsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'referringCustomerId' | 'status' | '_createdDate' | '_updatedDate'>) => ReferredFriendsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'referringCustomerId' | 'status' | '_createdDate' | '_updatedDate'>) => ReferredFriendsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ReferredFriendsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ReferredFriendsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ReferredFriendsQueryResult>;
  }
  
  type loyaltyReferralV1ReferredFriend_universal_d_ReferredFriend = ReferredFriend;
  type loyaltyReferralV1ReferredFriend_universal_d_Status = Status;
  const loyaltyReferralV1ReferredFriend_universal_d_Status: typeof Status;
  type loyaltyReferralV1ReferredFriend_universal_d_CreateReferredFriendRequest = CreateReferredFriendRequest;
  type loyaltyReferralV1ReferredFriend_universal_d_CreateReferredFriendResponse = CreateReferredFriendResponse;
  type loyaltyReferralV1ReferredFriend_universal_d_GetReferredFriendRequest = GetReferredFriendRequest;
  type loyaltyReferralV1ReferredFriend_universal_d_GetReferredFriendResponse = GetReferredFriendResponse;
  type loyaltyReferralV1ReferredFriend_universal_d_GetReferredFriendByContactIdRequest = GetReferredFriendByContactIdRequest;
  type loyaltyReferralV1ReferredFriend_universal_d_GetReferredFriendByContactIdResponse = GetReferredFriendByContactIdResponse;
  type loyaltyReferralV1ReferredFriend_universal_d_UpdateReferredFriendRequest = UpdateReferredFriendRequest;
  type loyaltyReferralV1ReferredFriend_universal_d_UpdateReferredFriendResponse = UpdateReferredFriendResponse;
  type loyaltyReferralV1ReferredFriend_universal_d_DeleteReferredFriendRequest = DeleteReferredFriendRequest;
  type loyaltyReferralV1ReferredFriend_universal_d_DeleteReferredFriendResponse = DeleteReferredFriendResponse;
  type loyaltyReferralV1ReferredFriend_universal_d_QueryReferredFriendRequest = QueryReferredFriendRequest;
  type loyaltyReferralV1ReferredFriend_universal_d_QueryReferredFriendResponse = QueryReferredFriendResponse;
  type loyaltyReferralV1ReferredFriend_universal_d_Empty = Empty;
  type loyaltyReferralV1ReferredFriend_universal_d_SuccessfulReferralEvent = SuccessfulReferralEvent;
  type loyaltyReferralV1ReferredFriend_universal_d_ReferredFriendDetails = ReferredFriendDetails;
  const loyaltyReferralV1ReferredFriend_universal_d_createReferredFriend: typeof createReferredFriend;
  type loyaltyReferralV1ReferredFriend_universal_d_CreateReferredFriendOptions = CreateReferredFriendOptions;
  const loyaltyReferralV1ReferredFriend_universal_d_getReferredFriend: typeof getReferredFriend;
  const loyaltyReferralV1ReferredFriend_universal_d_getReferredFriendByContactId: typeof getReferredFriendByContactId;
  const loyaltyReferralV1ReferredFriend_universal_d_updateReferredFriend: typeof updateReferredFriend;
  type loyaltyReferralV1ReferredFriend_universal_d_UpdateReferredFriend = UpdateReferredFriend;
  type loyaltyReferralV1ReferredFriend_universal_d_UpdateReferredFriendOptions = UpdateReferredFriendOptions;
  const loyaltyReferralV1ReferredFriend_universal_d_deleteReferredFriend: typeof deleteReferredFriend;
  type loyaltyReferralV1ReferredFriend_universal_d_DeleteReferredFriendOptions = DeleteReferredFriendOptions;
  const loyaltyReferralV1ReferredFriend_universal_d_queryReferredFriend: typeof queryReferredFriend;
  type loyaltyReferralV1ReferredFriend_universal_d_ReferredFriendsQueryResult = ReferredFriendsQueryResult;
  type loyaltyReferralV1ReferredFriend_universal_d_ReferredFriendsQueryBuilder = ReferredFriendsQueryBuilder;
  namespace loyaltyReferralV1ReferredFriend_universal_d {
    export {
      loyaltyReferralV1ReferredFriend_universal_d_ReferredFriend as ReferredFriend,
      loyaltyReferralV1ReferredFriend_universal_d_Status as Status,
      loyaltyReferralV1ReferredFriend_universal_d_CreateReferredFriendRequest as CreateReferredFriendRequest,
      loyaltyReferralV1ReferredFriend_universal_d_CreateReferredFriendResponse as CreateReferredFriendResponse,
      loyaltyReferralV1ReferredFriend_universal_d_GetReferredFriendRequest as GetReferredFriendRequest,
      loyaltyReferralV1ReferredFriend_universal_d_GetReferredFriendResponse as GetReferredFriendResponse,
      loyaltyReferralV1ReferredFriend_universal_d_GetReferredFriendByContactIdRequest as GetReferredFriendByContactIdRequest,
      loyaltyReferralV1ReferredFriend_universal_d_GetReferredFriendByContactIdResponse as GetReferredFriendByContactIdResponse,
      loyaltyReferralV1ReferredFriend_universal_d_UpdateReferredFriendRequest as UpdateReferredFriendRequest,
      loyaltyReferralV1ReferredFriend_universal_d_UpdateReferredFriendResponse as UpdateReferredFriendResponse,
      loyaltyReferralV1ReferredFriend_universal_d_DeleteReferredFriendRequest as DeleteReferredFriendRequest,
      loyaltyReferralV1ReferredFriend_universal_d_DeleteReferredFriendResponse as DeleteReferredFriendResponse,
      loyaltyReferralV1ReferredFriend_universal_d_QueryReferredFriendRequest as QueryReferredFriendRequest,
      CursorQuery$1 as CursorQuery,
      CursorQueryPagingMethodOneOf$1 as CursorQueryPagingMethodOneOf,
      Sorting$1 as Sorting,
      SortOrder$1 as SortOrder,
      CursorPaging$1 as CursorPaging,
      loyaltyReferralV1ReferredFriend_universal_d_QueryReferredFriendResponse as QueryReferredFriendResponse,
      CursorPagingMetadata$1 as CursorPagingMetadata,
      Cursors$1 as Cursors,
      DomainEvent$1 as DomainEvent,
      DomainEventBodyOneOf$1 as DomainEventBodyOneOf,
      EntityCreatedEvent$1 as EntityCreatedEvent,
      RestoreInfo$1 as RestoreInfo,
      EntityUpdatedEvent$1 as EntityUpdatedEvent,
      EntityDeletedEvent$1 as EntityDeletedEvent,
      ActionEvent$1 as ActionEvent,
      loyaltyReferralV1ReferredFriend_universal_d_Empty as Empty,
      loyaltyReferralV1ReferredFriend_universal_d_SuccessfulReferralEvent as SuccessfulReferralEvent,
      loyaltyReferralV1ReferredFriend_universal_d_ReferredFriendDetails as ReferredFriendDetails,
      MessageEnvelope$1 as MessageEnvelope,
      IdentificationData$1 as IdentificationData,
      IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf,
      WebhookIdentityType$1 as WebhookIdentityType,
      loyaltyReferralV1ReferredFriend_universal_d_createReferredFriend as createReferredFriend,
      loyaltyReferralV1ReferredFriend_universal_d_CreateReferredFriendOptions as CreateReferredFriendOptions,
      loyaltyReferralV1ReferredFriend_universal_d_getReferredFriend as getReferredFriend,
      loyaltyReferralV1ReferredFriend_universal_d_getReferredFriendByContactId as getReferredFriendByContactId,
      loyaltyReferralV1ReferredFriend_universal_d_updateReferredFriend as updateReferredFriend,
      loyaltyReferralV1ReferredFriend_universal_d_UpdateReferredFriend as UpdateReferredFriend,
      loyaltyReferralV1ReferredFriend_universal_d_UpdateReferredFriendOptions as UpdateReferredFriendOptions,
      loyaltyReferralV1ReferredFriend_universal_d_deleteReferredFriend as deleteReferredFriend,
      loyaltyReferralV1ReferredFriend_universal_d_DeleteReferredFriendOptions as DeleteReferredFriendOptions,
      loyaltyReferralV1ReferredFriend_universal_d_queryReferredFriend as queryReferredFriend,
      loyaltyReferralV1ReferredFriend_universal_d_ReferredFriendsQueryResult as ReferredFriendsQueryResult,
      loyaltyReferralV1ReferredFriend_universal_d_ReferredFriendsQueryBuilder as ReferredFriendsQueryBuilder,
    };
  }
  
  interface ReferringCustomer {
      /**
       * ID of the referring customer.
       * @readonly
       */
      _id?: string;
      /**
       * Contact ID associated with the referring customer.
       * @readonly
       */
      contactId?: string;
      /**
       * Unique code for the referral. For example, `GxpxwAoMqxH8`.
       * @readonly
       */
      referralCode?: string;
      /**
       * Revision number, which increments by 1 each time the referring customer is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the referring customer.
       */
      revision?: string | null;
      /**
       * Date and time the referring customer was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the referring customer was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  interface GenerateReferringCustomerForContactRequest {
      /** Contact ID or `"me"` to generate the current identity's referring customer. */
      contactId: string;
  }
  interface GenerateReferringCustomerForContactResponse {
      /** Created referring customer. */
      referringCustomer?: ReferringCustomer;
  }
  interface GetReferringCustomerRequest {
      /** ID of the referring customer to retrieve. */
      referringCustomerId: string;
  }
  interface GetReferringCustomerResponse {
      /** Retrieved referring customer. */
      referringCustomer?: ReferringCustomer;
  }
  interface GetReferringCustomerByReferralCodeRequest {
      /** Referral code of the referring customer to retrieve. */
      referralCode: string;
  }
  interface GetReferringCustomerByReferralCodeResponse {
      /** Retrieved referring customer. */
      referringCustomer?: ReferringCustomer;
  }
  interface QueryReferringCustomersRequest {
      /** Query options. */
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
  interface QueryReferringCustomersResponse {
      /** List of retrieved referring customers. */
      referringCustomers?: ReferringCustomer[];
      /** Paging metadata. */
      metadata?: CursorPagingMetadata;
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
  interface DeleteReferringCustomerRequest {
      /** ID of the referring customer to delete. */
      referringCustomerId: string;
      /** Revision number of the referring customer. */
      revision?: string;
  }
  interface DeleteReferringCustomerResponse {
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
   * Creates a new referring customer or returns an existing one for the provided contact ID.
   *
   * You can use `me` instead of a specific contact ID to generate a referring customer for the current identity's contact.
   *
   * See the [About Identities](https://dev.wix.com/docs/build-apps/develop-your-app/access/about-identities) article to learn more about identies.
   * @param contactId - Contact ID or `"me"` to generate the current identity's referring customer.
   * @public
   * @documentationMaturity preview
   * @requiredField contactId
   * @permissionId REFERRALS.MANAGE_REFERRING_CUSTOMERS
   * @adminMethod
   */
  function generateReferringCustomerForContact(contactId: string): Promise<GenerateReferringCustomerForContactResponse>;
  /**
   * Retrieves a referring customer by ID.
   * @param referringCustomerId - ID of the referring customer to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField referringCustomerId
   * @permissionId REFERRALS.MANAGE_REFERRING_CUSTOMERS
   * @adminMethod
   * @returns Retrieved referring customer.
   */
  function getReferringCustomer(referringCustomerId: string): Promise<ReferringCustomer>;
  /**
   * Retrieves a referring customer by referral code.
   * @param referralCode - Referral code of the referring customer to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField referralCode
   * @permissionId REFERRALS.MANAGE_REFERRING_CUSTOMERS
   * @adminMethod
   */
  function getReferringCustomerByReferralCode(referralCode: string): Promise<GetReferringCustomerByReferralCodeResponse>;
  /**
   * Creates a query to retrieve a list of referring customers.
   *
   * The `queryReferringCustomers()` function builds a query to retrieve a list of events and returns a `ReferringCustomersQueryBuilder` object.
   *
   * The returned object contains the query definition, which is typically used to run the query using the `find()` function.
   *
   * You can refine the query by chaining `ReferringCustomersQueryBuilder` functions onto the query. `ReferringCustomersQueryBuilder` functions enable you to sort, filter, and control the results `queryReferringCustomers()` returns.
   *
   * `queryReferringCustomers()` runs with these `ReferringCustomersQueryBuilder` defaults, which you can override:
   *
   * - `limit(50)`
   * - `descending("_createdDate")`
   * The functions that are chained to `queryReferringCustomers()` are applied in the order they're called. For example, if you apply ascending('referralCode') and then descending('contactID'), the results are sorted first by the referral code, and then, if there are multiple results with the same referral code, the items are sorted by contact ID.
   * @public
   * @documentationMaturity preview
   * @permissionId REFERRALS.MANAGE_REFERRING_CUSTOMERS
   * @adminMethod
   */
  function queryReferringCustomers(): ReferringCustomersQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ReferringCustomersQueryResult extends QueryCursorResult {
      items: ReferringCustomer[];
      query: ReferringCustomersQueryBuilder;
      next: () => Promise<ReferringCustomersQueryResult>;
      prev: () => Promise<ReferringCustomersQueryResult>;
  }
  interface ReferringCustomersQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'contactId' | 'referralCode' | '_createdDate' | '_updatedDate', value: any) => ReferringCustomersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: 'contactId' | 'referralCode' | '_createdDate' | '_updatedDate', value: any) => ReferringCustomersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferringCustomersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferringCustomersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferringCustomersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferringCustomersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: 'contactId' | 'referralCode', value: string) => ReferringCustomersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: 'contactId' | 'referralCode' | '_createdDate' | '_updatedDate', value: any[]) => ReferringCustomersQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'contactId' | 'referralCode' | '_createdDate' | '_updatedDate', value: any) => ReferringCustomersQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'contactId' | 'referralCode' | '_createdDate' | '_updatedDate', value: boolean) => ReferringCustomersQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'contactId' | 'referralCode' | '_createdDate' | '_updatedDate'>) => ReferringCustomersQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'contactId' | 'referralCode' | '_createdDate' | '_updatedDate'>) => ReferringCustomersQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ReferringCustomersQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ReferringCustomersQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ReferringCustomersQueryResult>;
  }
  /**
   * Deletes a referring customer by ID.
   *
   * You must provide the latest `revision` to prevent conflicting changes.
   * @param referringCustomerId - ID of the referring customer to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField referringCustomerId
   * @permissionId REFERRALS.MANAGE_REFERRING_CUSTOMERS
   * @adminMethod
   */
  function deleteReferringCustomer(referringCustomerId: string, options?: DeleteReferringCustomerOptions): Promise<void>;
  interface DeleteReferringCustomerOptions {
      /** Revision number of the referring customer. */
      revision?: string;
  }
  
  type loyaltyReferralV1ReferringCustomer_universal_d_ReferringCustomer = ReferringCustomer;
  type loyaltyReferralV1ReferringCustomer_universal_d_GenerateReferringCustomerForContactRequest = GenerateReferringCustomerForContactRequest;
  type loyaltyReferralV1ReferringCustomer_universal_d_GenerateReferringCustomerForContactResponse = GenerateReferringCustomerForContactResponse;
  type loyaltyReferralV1ReferringCustomer_universal_d_GetReferringCustomerRequest = GetReferringCustomerRequest;
  type loyaltyReferralV1ReferringCustomer_universal_d_GetReferringCustomerResponse = GetReferringCustomerResponse;
  type loyaltyReferralV1ReferringCustomer_universal_d_GetReferringCustomerByReferralCodeRequest = GetReferringCustomerByReferralCodeRequest;
  type loyaltyReferralV1ReferringCustomer_universal_d_GetReferringCustomerByReferralCodeResponse = GetReferringCustomerByReferralCodeResponse;
  type loyaltyReferralV1ReferringCustomer_universal_d_QueryReferringCustomersRequest = QueryReferringCustomersRequest;
  type loyaltyReferralV1ReferringCustomer_universal_d_CursorQuery = CursorQuery;
  type loyaltyReferralV1ReferringCustomer_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type loyaltyReferralV1ReferringCustomer_universal_d_Sorting = Sorting;
  type loyaltyReferralV1ReferringCustomer_universal_d_SortOrder = SortOrder;
  const loyaltyReferralV1ReferringCustomer_universal_d_SortOrder: typeof SortOrder;
  type loyaltyReferralV1ReferringCustomer_universal_d_CursorPaging = CursorPaging;
  type loyaltyReferralV1ReferringCustomer_universal_d_QueryReferringCustomersResponse = QueryReferringCustomersResponse;
  type loyaltyReferralV1ReferringCustomer_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type loyaltyReferralV1ReferringCustomer_universal_d_Cursors = Cursors;
  type loyaltyReferralV1ReferringCustomer_universal_d_DeleteReferringCustomerRequest = DeleteReferringCustomerRequest;
  type loyaltyReferralV1ReferringCustomer_universal_d_DeleteReferringCustomerResponse = DeleteReferringCustomerResponse;
  type loyaltyReferralV1ReferringCustomer_universal_d_DomainEvent = DomainEvent;
  type loyaltyReferralV1ReferringCustomer_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type loyaltyReferralV1ReferringCustomer_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type loyaltyReferralV1ReferringCustomer_universal_d_RestoreInfo = RestoreInfo;
  type loyaltyReferralV1ReferringCustomer_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type loyaltyReferralV1ReferringCustomer_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type loyaltyReferralV1ReferringCustomer_universal_d_ActionEvent = ActionEvent;
  type loyaltyReferralV1ReferringCustomer_universal_d_MessageEnvelope = MessageEnvelope;
  type loyaltyReferralV1ReferringCustomer_universal_d_IdentificationData = IdentificationData;
  type loyaltyReferralV1ReferringCustomer_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type loyaltyReferralV1ReferringCustomer_universal_d_WebhookIdentityType = WebhookIdentityType;
  const loyaltyReferralV1ReferringCustomer_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const loyaltyReferralV1ReferringCustomer_universal_d_generateReferringCustomerForContact: typeof generateReferringCustomerForContact;
  const loyaltyReferralV1ReferringCustomer_universal_d_getReferringCustomer: typeof getReferringCustomer;
  const loyaltyReferralV1ReferringCustomer_universal_d_getReferringCustomerByReferralCode: typeof getReferringCustomerByReferralCode;
  const loyaltyReferralV1ReferringCustomer_universal_d_queryReferringCustomers: typeof queryReferringCustomers;
  type loyaltyReferralV1ReferringCustomer_universal_d_ReferringCustomersQueryResult = ReferringCustomersQueryResult;
  type loyaltyReferralV1ReferringCustomer_universal_d_ReferringCustomersQueryBuilder = ReferringCustomersQueryBuilder;
  const loyaltyReferralV1ReferringCustomer_universal_d_deleteReferringCustomer: typeof deleteReferringCustomer;
  type loyaltyReferralV1ReferringCustomer_universal_d_DeleteReferringCustomerOptions = DeleteReferringCustomerOptions;
  namespace loyaltyReferralV1ReferringCustomer_universal_d {
    export {
      loyaltyReferralV1ReferringCustomer_universal_d_ReferringCustomer as ReferringCustomer,
      loyaltyReferralV1ReferringCustomer_universal_d_GenerateReferringCustomerForContactRequest as GenerateReferringCustomerForContactRequest,
      loyaltyReferralV1ReferringCustomer_universal_d_GenerateReferringCustomerForContactResponse as GenerateReferringCustomerForContactResponse,
      loyaltyReferralV1ReferringCustomer_universal_d_GetReferringCustomerRequest as GetReferringCustomerRequest,
      loyaltyReferralV1ReferringCustomer_universal_d_GetReferringCustomerResponse as GetReferringCustomerResponse,
      loyaltyReferralV1ReferringCustomer_universal_d_GetReferringCustomerByReferralCodeRequest as GetReferringCustomerByReferralCodeRequest,
      loyaltyReferralV1ReferringCustomer_universal_d_GetReferringCustomerByReferralCodeResponse as GetReferringCustomerByReferralCodeResponse,
      loyaltyReferralV1ReferringCustomer_universal_d_QueryReferringCustomersRequest as QueryReferringCustomersRequest,
      loyaltyReferralV1ReferringCustomer_universal_d_CursorQuery as CursorQuery,
      loyaltyReferralV1ReferringCustomer_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      loyaltyReferralV1ReferringCustomer_universal_d_Sorting as Sorting,
      loyaltyReferralV1ReferringCustomer_universal_d_SortOrder as SortOrder,
      loyaltyReferralV1ReferringCustomer_universal_d_CursorPaging as CursorPaging,
      loyaltyReferralV1ReferringCustomer_universal_d_QueryReferringCustomersResponse as QueryReferringCustomersResponse,
      loyaltyReferralV1ReferringCustomer_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      loyaltyReferralV1ReferringCustomer_universal_d_Cursors as Cursors,
      loyaltyReferralV1ReferringCustomer_universal_d_DeleteReferringCustomerRequest as DeleteReferringCustomerRequest,
      loyaltyReferralV1ReferringCustomer_universal_d_DeleteReferringCustomerResponse as DeleteReferringCustomerResponse,
      loyaltyReferralV1ReferringCustomer_universal_d_DomainEvent as DomainEvent,
      loyaltyReferralV1ReferringCustomer_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      loyaltyReferralV1ReferringCustomer_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      loyaltyReferralV1ReferringCustomer_universal_d_RestoreInfo as RestoreInfo,
      loyaltyReferralV1ReferringCustomer_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      loyaltyReferralV1ReferringCustomer_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      loyaltyReferralV1ReferringCustomer_universal_d_ActionEvent as ActionEvent,
      loyaltyReferralV1ReferringCustomer_universal_d_MessageEnvelope as MessageEnvelope,
      loyaltyReferralV1ReferringCustomer_universal_d_IdentificationData as IdentificationData,
      loyaltyReferralV1ReferringCustomer_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      loyaltyReferralV1ReferringCustomer_universal_d_WebhookIdentityType as WebhookIdentityType,
      loyaltyReferralV1ReferringCustomer_universal_d_generateReferringCustomerForContact as generateReferringCustomerForContact,
      loyaltyReferralV1ReferringCustomer_universal_d_getReferringCustomer as getReferringCustomer,
      loyaltyReferralV1ReferringCustomer_universal_d_getReferringCustomerByReferralCode as getReferringCustomerByReferralCode,
      loyaltyReferralV1ReferringCustomer_universal_d_queryReferringCustomers as queryReferringCustomers,
      loyaltyReferralV1ReferringCustomer_universal_d_ReferringCustomersQueryResult as ReferringCustomersQueryResult,
      loyaltyReferralV1ReferringCustomer_universal_d_ReferringCustomersQueryBuilder as ReferringCustomersQueryBuilder,
      loyaltyReferralV1ReferringCustomer_universal_d_deleteReferringCustomer as deleteReferringCustomer,
      loyaltyReferralV1ReferringCustomer_universal_d_DeleteReferringCustomerOptions as DeleteReferringCustomerOptions,
    };
  }
  
  export { loyaltyReferralV1ReferringCustomer_universal_d as customers, loyaltyReferralV1ReferredFriend_universal_d as friends, loyaltyReferralV1Program_universal_d as programs, loyaltyReferralV1ReferralReward_universal_d as rewards, loyaltyReferralV1ReferralEvent_universal_d as tracker };
}
