declare module "wix-gift-cards-backend" {
  interface GiftCardProduct extends GiftCardProductExpirationDateOneOf {
      /** Fixed expiration date. */
      fixedExpirationDate?: Date;
      /** Relative expiration date from date of purchase. */
      relativeExpirationDate?: RelativeExpirationDate;
      /**
       * Gift card product unique ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the GiftCardProduct is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the product.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the product was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time the product was last updated.
       * @readonly
       */
      _updatedDate?: Date;
      /** Gift card product name. */
      name?: string;
      /** Gift card product description. */
      description?: string | null;
      /**
       * Gift card product image.
       * + Pass at least media ID, width, and height. You should be able to get these values when you upload an image to Wix media manager.
       * + Given a full image URL of https://static.wixstatic.com/media/5cc69183e7954e2c9760fa2383870992.jpg, `media.id` would be "5cc69183e7954e2c9760fa2383870992.jpg".
       * + We only support images coming from Wix media manager, if you want to use an image from another source you must first upload it to Wix media manager.
       */
      image?: string;
      /** Gift card product expiration type */
      expirationType?: ExpirationType;
      /** Array of preset product variants. */
      presetVariants?: PresetVariant[];
      /** Gift card product custom variants */
      customVariant?: CustomVariant;
      /**
       * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the Wix Dev Center before they can be accessed with API calls.
       * Enabling users to save custom data related to the gift card product.
       */
      extendedFields?: ExtendedFields;
  }
  /** @oneof */
  interface GiftCardProductExpirationDateOneOf {
      /** Fixed expiration date. */
      fixedExpirationDate?: Date;
      /** Relative expiration date from date of purchase. */
      relativeExpirationDate?: RelativeExpirationDate;
  }
  enum ExpirationType {
      UNKNOWN_EXPIRATION_TYPE = "UNKNOWN_EXPIRATION_TYPE",
      NONE = "NONE",
      FIXED = "FIXED",
      RELATIVE = "RELATIVE"
  }
  interface RelativeExpirationDate {
      /** Value until expiration. */
      value?: number;
      /** Time period until expiration */
      period?: TimePeriod;
  }
  enum TimePeriod {
      UNKNOWN_TIME_PERIOD = "UNKNOWN_TIME_PERIOD",
      DAYS = "DAYS",
      WEEKS = "WEEKS",
      MONTHS = "MONTHS",
      YEARS = "YEARS"
  }
  interface PresetVariant {
      /**
       * Gift card product variant unique ID.
       * @readonly
       */
      _id?: string | null;
      /** Gift card product variant price. */
      price?: MultiCurrencyPrice;
      /** Gift card product variant actual value. */
      value?: MultiCurrencyPrice;
      /**
       * Gift card product variant image.
       * + Pass at least media ID, width, and height. You should be able to get these values when you upload an image to Wix media manager.
       * + Given a full image URL of https://static.wixstatic.com/media/5cc69183e7954e2c9760fa2383870992.jpg, `media.id` would be "5cc69183e7954e2c9760fa2383870992.jpg".
       * + We only support images coming from Wix media manager, if you want to use an image from another source you must first upload it to Wix media manager.
       */
      image?: string;
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
  interface CustomVariant {
      /** Gift card product variant min value. */
      minValue?: MultiCurrencyPrice;
      /** Gift card product variant max value. */
      maxValue?: MultiCurrencyPrice;
      /**
       * Gift card product variant image.
       * + Pass at least media ID, width, and height. You should be able to get these values when you upload an image to Wix media manager.
       * + Given a full image URL of https://static.wixstatic.com/media/5cc69183e7954e2c9760fa2383870992.jpg, `media.id` would be "5cc69183e7954e2c9760fa2383870992.jpg".
       * + We only support images coming from Wix media manager, if you want to use an image from another source you must first upload it to Wix media manager.
       */
      image?: string;
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
  interface CreateGiftCardProductRequest {
      /** Gift card product to be created. */
      giftCardProduct: GiftCardProduct;
  }
  interface CreateGiftCardProductResponse {
      /** The created gift card product. */
      giftCardProduct?: GiftCardProduct;
  }
  interface GetGiftCardProductRequest {
      /** ID of the gift card product to retrieve. */
      giftCardProductId: string;
  }
  interface GetGiftCardProductResponse {
      /** The requested gift card product. */
      giftCardProduct?: GiftCardProduct;
  }
  interface UpdateGiftCardProductRequest {
      /** Gift card product to be updated, may be partial. */
      giftCardProduct: GiftCardProduct;
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateGiftCardProductResponse {
      /** Updated gift card product. */
      giftCardProduct?: GiftCardProduct;
  }
  interface DeleteGiftCardProductRequest {
      /** Id of the gift card product to delete. */
      giftCardProductId: string;
  }
  interface DeleteGiftCardProductResponse {
  }
  interface QueryGiftCardProductsRequest {
      /** WQL expression. */
      query?: CursorQuery;
  }
  interface CursorQuery extends CursorQueryPagingMethodOneOf {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
      /**
       * Filter object in the following format:
       * `"filter" : {
       * "fieldName1": "value1",
       * "fieldName2":{"$operator":"value2"}
       * }`
       * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
       */
      filter?: Record<string, any> | null;
      /**
       * Sort object in the following format:
       * `[{"fieldName":"sortField1","order":"ASC"},{"fieldName":"sortField2","order":"DESC"}]`
       */
      sort?: Sorting[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf {
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
  interface CursorPaging {
      /** Maximum number of items to return in the results. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       * Pass the relevant cursor token from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface QueryGiftCardProductsResponse {
      /** List of gift card products. */
      giftCardProducts?: GiftCardProduct[];
      /** Paging metadata */
      pagingMetadata?: CursorPagingMetadata;
  }
  interface CursorPagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors;
      /**
       * Whether there are more pages to retrieve following the current page.
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
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
      dateDeleted?: Date;
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
  interface IsInWixGiftCardsAppPopulationRequest {
  }
  interface IsInWixGiftCardsAppPopulationResponse {
      /** true if site is in the new Wix Gift Cards App population. */
      shouldUseNewGiftCardServices?: boolean;
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
      deletedDate?: Date;
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
   * Creates a new gift card product.
   * @param giftCardProduct - Gift card product to be created.
   * @internal
   * @documentationMaturity preview
   * @requiredField giftCardProduct
   * @requiredField giftCardProduct.name
   * @requiredField giftCardProduct.presetVariants.price
   * @requiredField giftCardProduct.presetVariants.price.amount
   * @permissionId GIFT_CARDS.GIFT_CARD_PRODUCT_CREATE
   * @adminMethod
   * @returns The created gift card product.
   */
  function createGiftCardProduct(giftCardProduct: GiftCardProduct): Promise<GiftCardProduct>;
  /**
   * Retrieves a gift card product.
   * @param giftCardProductId - ID of the gift card product to retrieve.
   * @internal
   * @documentationMaturity preview
   * @requiredField giftCardProductId
   * @permissionId GIFT_CARDS.GIFT_CARD_PRODUCT_READ
   * @returns The requested gift card product.
   */
  function getGiftCardProduct(giftCardProductId: string): Promise<GiftCardProduct>;
  /**
   * Updates a gift card product.
   * Supports partial update.
   * Pass the latest `revision` for a successful update.
   * Each time the category is updated, `revision` increments by 1.
   * @param _id - Gift card product unique ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField giftCardProduct
   * @requiredField giftCardProduct.presetVariants.price
   * @requiredField giftCardProduct.presetVariants.price.amount
   * @requiredField giftCardProduct.revision
   * @permissionId GIFT_CARDS.GIFT_CARD_PRODUCT_UPDATE
   * @adminMethod
   * @returns Updated gift card product.
   */
  function updateGiftCardProduct(_id: string | null, giftCardProduct: UpdateGiftCardProduct, options?: UpdateGiftCardProductOptions): Promise<GiftCardProduct>;
  interface UpdateGiftCardProduct {
      /** Fixed expiration date. */
      fixedExpirationDate?: Date;
      /** Relative expiration date from date of purchase. */
      relativeExpirationDate?: RelativeExpirationDate;
      /**
       * Gift card product unique ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the GiftCardProduct is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the product.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the product was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time the product was last updated.
       * @readonly
       */
      _updatedDate?: Date;
      /** Gift card product name. */
      name?: string;
      /** Gift card product description. */
      description?: string | null;
      /**
       * Gift card product image.
       * + Pass at least media ID, width, and height. You should be able to get these values when you upload an image to Wix media manager.
       * + Given a full image URL of https://static.wixstatic.com/media/5cc69183e7954e2c9760fa2383870992.jpg, `media.id` would be "5cc69183e7954e2c9760fa2383870992.jpg".
       * + We only support images coming from Wix media manager, if you want to use an image from another source you must first upload it to Wix media manager.
       */
      image?: string;
      /** Gift card product expiration type */
      expirationType?: ExpirationType;
      /** Array of preset product variants. */
      presetVariants?: PresetVariant[];
      /** Gift card product custom variants */
      customVariant?: CustomVariant;
      /**
       * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the Wix Dev Center before they can be accessed with API calls.
       * Enabling users to save custom data related to the gift card product.
       */
      extendedFields?: ExtendedFields;
  }
  interface UpdateGiftCardProductOptions {
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Deletes a gift card product.
   * @param giftCardProductId - Id of the gift card product to delete.
   * @internal
   * @documentationMaturity preview
   * @requiredField giftCardProductId
   * @permissionId GIFT_CARDS.GIFT_CARD_PRODUCT_DELETE
   * @adminMethod
   */
  function deleteGiftCardProduct(giftCardProductId: string): Promise<void>;
  /**
   * Retrieves a list of gift card products, given the provided [paging, filtering, and sorting][1].
   *
   * Up to 1,000 gift card products can be returned per request.
   *
   * To learn how to query gift card products, see [API Query Language][2].
   *
   * [1]: https://dev.wix.com/api/rest/getting-started/sorting-and-paging
   * [2]: https://dev.wix.com/api/rest/getting-started/api-query-language
   * @internal
   * @documentationMaturity preview
   * @permissionId GIFT_CARDS.GIFT_CARD_PRODUCT_READ
   */
  function queryGiftCardProducts(): GiftCardProductsQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface GiftCardProductsQueryResult extends QueryCursorResult {
      items: GiftCardProduct[];
      query: GiftCardProductsQueryBuilder;
      next: () => Promise<GiftCardProductsQueryResult>;
      prev: () => Promise<GiftCardProductsQueryResult>;
  }
  interface GiftCardProductsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'fixedExpirationDate' | '_id' | '_createdDate' | '_updatedDate' | 'name' | 'presetVariants.id' | 'presetVariants.price', value: any) => GiftCardProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: 'fixedExpirationDate' | '_id' | '_createdDate' | '_updatedDate' | 'name' | 'presetVariants.id' | 'presetVariants.price', value: any) => GiftCardProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: 'fixedExpirationDate' | '_createdDate' | '_updatedDate', value: any) => GiftCardProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: 'fixedExpirationDate' | '_createdDate' | '_updatedDate', value: any) => GiftCardProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: 'fixedExpirationDate' | '_createdDate' | '_updatedDate', value: any) => GiftCardProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: 'fixedExpirationDate' | '_createdDate' | '_updatedDate', value: any) => GiftCardProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'name' | 'presetVariants.id', value: string) => GiftCardProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: 'fixedExpirationDate' | '_id' | '_createdDate' | '_updatedDate' | 'name' | 'presetVariants.id' | 'presetVariants.price', value: any[]) => GiftCardProductsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'fixedExpirationDate' | '_id' | '_createdDate' | '_updatedDate' | 'name' | 'presetVariants.id' | 'presetVariants.price', value: any) => GiftCardProductsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'fixedExpirationDate' | '_id' | '_createdDate' | '_updatedDate' | 'name' | 'presetVariants.id' | 'presetVariants.price', value: boolean) => GiftCardProductsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'fixedExpirationDate' | '_createdDate' | '_updatedDate' | 'name' | 'presetVariants.price'>) => GiftCardProductsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'fixedExpirationDate' | '_createdDate' | '_updatedDate' | 'name' | 'presetVariants.price'>) => GiftCardProductsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => GiftCardProductsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => GiftCardProductsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<GiftCardProductsQueryResult>;
  }
  /**
   * Whether the meta site from the call's context is in the new Wix Gift Cards App population.
   * @public
   * @documentationMaturity preview
   * @permissionId GIFT_CARDS.GIFT_CARD_PRODUCT_READ
   */
  function isInWixGiftCardsAppPopulation(): Promise<IsInWixGiftCardsAppPopulationResponse>;
  
  type giftCardsV1GiftCardProduct_universal_d_GiftCardProduct = GiftCardProduct;
  type giftCardsV1GiftCardProduct_universal_d_GiftCardProductExpirationDateOneOf = GiftCardProductExpirationDateOneOf;
  type giftCardsV1GiftCardProduct_universal_d_ExpirationType = ExpirationType;
  const giftCardsV1GiftCardProduct_universal_d_ExpirationType: typeof ExpirationType;
  type giftCardsV1GiftCardProduct_universal_d_RelativeExpirationDate = RelativeExpirationDate;
  type giftCardsV1GiftCardProduct_universal_d_TimePeriod = TimePeriod;
  const giftCardsV1GiftCardProduct_universal_d_TimePeriod: typeof TimePeriod;
  type giftCardsV1GiftCardProduct_universal_d_PresetVariant = PresetVariant;
  type giftCardsV1GiftCardProduct_universal_d_MultiCurrencyPrice = MultiCurrencyPrice;
  type giftCardsV1GiftCardProduct_universal_d_CustomVariant = CustomVariant;
  type giftCardsV1GiftCardProduct_universal_d_ExtendedFields = ExtendedFields;
  type giftCardsV1GiftCardProduct_universal_d_CreateGiftCardProductRequest = CreateGiftCardProductRequest;
  type giftCardsV1GiftCardProduct_universal_d_CreateGiftCardProductResponse = CreateGiftCardProductResponse;
  type giftCardsV1GiftCardProduct_universal_d_GetGiftCardProductRequest = GetGiftCardProductRequest;
  type giftCardsV1GiftCardProduct_universal_d_GetGiftCardProductResponse = GetGiftCardProductResponse;
  type giftCardsV1GiftCardProduct_universal_d_UpdateGiftCardProductRequest = UpdateGiftCardProductRequest;
  type giftCardsV1GiftCardProduct_universal_d_UpdateGiftCardProductResponse = UpdateGiftCardProductResponse;
  type giftCardsV1GiftCardProduct_universal_d_DeleteGiftCardProductRequest = DeleteGiftCardProductRequest;
  type giftCardsV1GiftCardProduct_universal_d_DeleteGiftCardProductResponse = DeleteGiftCardProductResponse;
  type giftCardsV1GiftCardProduct_universal_d_QueryGiftCardProductsRequest = QueryGiftCardProductsRequest;
  type giftCardsV1GiftCardProduct_universal_d_CursorQuery = CursorQuery;
  type giftCardsV1GiftCardProduct_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type giftCardsV1GiftCardProduct_universal_d_Sorting = Sorting;
  type giftCardsV1GiftCardProduct_universal_d_SortOrder = SortOrder;
  const giftCardsV1GiftCardProduct_universal_d_SortOrder: typeof SortOrder;
  type giftCardsV1GiftCardProduct_universal_d_CursorPaging = CursorPaging;
  type giftCardsV1GiftCardProduct_universal_d_QueryGiftCardProductsResponse = QueryGiftCardProductsResponse;
  type giftCardsV1GiftCardProduct_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type giftCardsV1GiftCardProduct_universal_d_Cursors = Cursors;
  type giftCardsV1GiftCardProduct_universal_d_MetaSiteSpecialEvent = MetaSiteSpecialEvent;
  type giftCardsV1GiftCardProduct_universal_d_MetaSiteSpecialEventPayloadOneOf = MetaSiteSpecialEventPayloadOneOf;
  type giftCardsV1GiftCardProduct_universal_d_Asset = Asset;
  type giftCardsV1GiftCardProduct_universal_d_State = State;
  const giftCardsV1GiftCardProduct_universal_d_State: typeof State;
  type giftCardsV1GiftCardProduct_universal_d_SiteCreated = SiteCreated;
  type giftCardsV1GiftCardProduct_universal_d_SiteCreatedContext = SiteCreatedContext;
  const giftCardsV1GiftCardProduct_universal_d_SiteCreatedContext: typeof SiteCreatedContext;
  type giftCardsV1GiftCardProduct_universal_d_Namespace = Namespace;
  const giftCardsV1GiftCardProduct_universal_d_Namespace: typeof Namespace;
  type giftCardsV1GiftCardProduct_universal_d_SiteTransferred = SiteTransferred;
  type giftCardsV1GiftCardProduct_universal_d_SiteDeleted = SiteDeleted;
  type giftCardsV1GiftCardProduct_universal_d_DeleteContext = DeleteContext;
  type giftCardsV1GiftCardProduct_universal_d_DeleteStatus = DeleteStatus;
  const giftCardsV1GiftCardProduct_universal_d_DeleteStatus: typeof DeleteStatus;
  type giftCardsV1GiftCardProduct_universal_d_SiteUndeleted = SiteUndeleted;
  type giftCardsV1GiftCardProduct_universal_d_SitePublished = SitePublished;
  type giftCardsV1GiftCardProduct_universal_d_SiteUnpublished = SiteUnpublished;
  type giftCardsV1GiftCardProduct_universal_d_SiteMarkedAsTemplate = SiteMarkedAsTemplate;
  type giftCardsV1GiftCardProduct_universal_d_SiteMarkedAsWixSite = SiteMarkedAsWixSite;
  type giftCardsV1GiftCardProduct_universal_d_ServiceProvisioned = ServiceProvisioned;
  type giftCardsV1GiftCardProduct_universal_d_ServiceRemoved = ServiceRemoved;
  type giftCardsV1GiftCardProduct_universal_d_SiteRenamed = SiteRenamed;
  type giftCardsV1GiftCardProduct_universal_d_SiteHardDeleted = SiteHardDeleted;
  type giftCardsV1GiftCardProduct_universal_d_NamespaceChanged = NamespaceChanged;
  type giftCardsV1GiftCardProduct_universal_d_StudioAssigned = StudioAssigned;
  type giftCardsV1GiftCardProduct_universal_d_StudioUnassigned = StudioUnassigned;
  type giftCardsV1GiftCardProduct_universal_d_Empty = Empty;
  type giftCardsV1GiftCardProduct_universal_d_IsInWixGiftCardsAppPopulationRequest = IsInWixGiftCardsAppPopulationRequest;
  type giftCardsV1GiftCardProduct_universal_d_IsInWixGiftCardsAppPopulationResponse = IsInWixGiftCardsAppPopulationResponse;
  type giftCardsV1GiftCardProduct_universal_d_DomainEvent = DomainEvent;
  type giftCardsV1GiftCardProduct_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type giftCardsV1GiftCardProduct_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type giftCardsV1GiftCardProduct_universal_d_RestoreInfo = RestoreInfo;
  type giftCardsV1GiftCardProduct_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type giftCardsV1GiftCardProduct_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type giftCardsV1GiftCardProduct_universal_d_ActionEvent = ActionEvent;
  type giftCardsV1GiftCardProduct_universal_d_MessageEnvelope = MessageEnvelope;
  type giftCardsV1GiftCardProduct_universal_d_IdentificationData = IdentificationData;
  type giftCardsV1GiftCardProduct_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type giftCardsV1GiftCardProduct_universal_d_WebhookIdentityType = WebhookIdentityType;
  const giftCardsV1GiftCardProduct_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const giftCardsV1GiftCardProduct_universal_d_createGiftCardProduct: typeof createGiftCardProduct;
  const giftCardsV1GiftCardProduct_universal_d_getGiftCardProduct: typeof getGiftCardProduct;
  const giftCardsV1GiftCardProduct_universal_d_updateGiftCardProduct: typeof updateGiftCardProduct;
  type giftCardsV1GiftCardProduct_universal_d_UpdateGiftCardProduct = UpdateGiftCardProduct;
  type giftCardsV1GiftCardProduct_universal_d_UpdateGiftCardProductOptions = UpdateGiftCardProductOptions;
  const giftCardsV1GiftCardProduct_universal_d_deleteGiftCardProduct: typeof deleteGiftCardProduct;
  const giftCardsV1GiftCardProduct_universal_d_queryGiftCardProducts: typeof queryGiftCardProducts;
  type giftCardsV1GiftCardProduct_universal_d_GiftCardProductsQueryResult = GiftCardProductsQueryResult;
  type giftCardsV1GiftCardProduct_universal_d_GiftCardProductsQueryBuilder = GiftCardProductsQueryBuilder;
  const giftCardsV1GiftCardProduct_universal_d_isInWixGiftCardsAppPopulation: typeof isInWixGiftCardsAppPopulation;
  namespace giftCardsV1GiftCardProduct_universal_d {
    export {
      giftCardsV1GiftCardProduct_universal_d_GiftCardProduct as GiftCardProduct,
      giftCardsV1GiftCardProduct_universal_d_GiftCardProductExpirationDateOneOf as GiftCardProductExpirationDateOneOf,
      giftCardsV1GiftCardProduct_universal_d_ExpirationType as ExpirationType,
      giftCardsV1GiftCardProduct_universal_d_RelativeExpirationDate as RelativeExpirationDate,
      giftCardsV1GiftCardProduct_universal_d_TimePeriod as TimePeriod,
      giftCardsV1GiftCardProduct_universal_d_PresetVariant as PresetVariant,
      giftCardsV1GiftCardProduct_universal_d_MultiCurrencyPrice as MultiCurrencyPrice,
      giftCardsV1GiftCardProduct_universal_d_CustomVariant as CustomVariant,
      giftCardsV1GiftCardProduct_universal_d_ExtendedFields as ExtendedFields,
      giftCardsV1GiftCardProduct_universal_d_CreateGiftCardProductRequest as CreateGiftCardProductRequest,
      giftCardsV1GiftCardProduct_universal_d_CreateGiftCardProductResponse as CreateGiftCardProductResponse,
      giftCardsV1GiftCardProduct_universal_d_GetGiftCardProductRequest as GetGiftCardProductRequest,
      giftCardsV1GiftCardProduct_universal_d_GetGiftCardProductResponse as GetGiftCardProductResponse,
      giftCardsV1GiftCardProduct_universal_d_UpdateGiftCardProductRequest as UpdateGiftCardProductRequest,
      giftCardsV1GiftCardProduct_universal_d_UpdateGiftCardProductResponse as UpdateGiftCardProductResponse,
      giftCardsV1GiftCardProduct_universal_d_DeleteGiftCardProductRequest as DeleteGiftCardProductRequest,
      giftCardsV1GiftCardProduct_universal_d_DeleteGiftCardProductResponse as DeleteGiftCardProductResponse,
      giftCardsV1GiftCardProduct_universal_d_QueryGiftCardProductsRequest as QueryGiftCardProductsRequest,
      giftCardsV1GiftCardProduct_universal_d_CursorQuery as CursorQuery,
      giftCardsV1GiftCardProduct_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      giftCardsV1GiftCardProduct_universal_d_Sorting as Sorting,
      giftCardsV1GiftCardProduct_universal_d_SortOrder as SortOrder,
      giftCardsV1GiftCardProduct_universal_d_CursorPaging as CursorPaging,
      giftCardsV1GiftCardProduct_universal_d_QueryGiftCardProductsResponse as QueryGiftCardProductsResponse,
      giftCardsV1GiftCardProduct_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      giftCardsV1GiftCardProduct_universal_d_Cursors as Cursors,
      giftCardsV1GiftCardProduct_universal_d_MetaSiteSpecialEvent as MetaSiteSpecialEvent,
      giftCardsV1GiftCardProduct_universal_d_MetaSiteSpecialEventPayloadOneOf as MetaSiteSpecialEventPayloadOneOf,
      giftCardsV1GiftCardProduct_universal_d_Asset as Asset,
      giftCardsV1GiftCardProduct_universal_d_State as State,
      giftCardsV1GiftCardProduct_universal_d_SiteCreated as SiteCreated,
      giftCardsV1GiftCardProduct_universal_d_SiteCreatedContext as SiteCreatedContext,
      giftCardsV1GiftCardProduct_universal_d_Namespace as Namespace,
      giftCardsV1GiftCardProduct_universal_d_SiteTransferred as SiteTransferred,
      giftCardsV1GiftCardProduct_universal_d_SiteDeleted as SiteDeleted,
      giftCardsV1GiftCardProduct_universal_d_DeleteContext as DeleteContext,
      giftCardsV1GiftCardProduct_universal_d_DeleteStatus as DeleteStatus,
      giftCardsV1GiftCardProduct_universal_d_SiteUndeleted as SiteUndeleted,
      giftCardsV1GiftCardProduct_universal_d_SitePublished as SitePublished,
      giftCardsV1GiftCardProduct_universal_d_SiteUnpublished as SiteUnpublished,
      giftCardsV1GiftCardProduct_universal_d_SiteMarkedAsTemplate as SiteMarkedAsTemplate,
      giftCardsV1GiftCardProduct_universal_d_SiteMarkedAsWixSite as SiteMarkedAsWixSite,
      giftCardsV1GiftCardProduct_universal_d_ServiceProvisioned as ServiceProvisioned,
      giftCardsV1GiftCardProduct_universal_d_ServiceRemoved as ServiceRemoved,
      giftCardsV1GiftCardProduct_universal_d_SiteRenamed as SiteRenamed,
      giftCardsV1GiftCardProduct_universal_d_SiteHardDeleted as SiteHardDeleted,
      giftCardsV1GiftCardProduct_universal_d_NamespaceChanged as NamespaceChanged,
      giftCardsV1GiftCardProduct_universal_d_StudioAssigned as StudioAssigned,
      giftCardsV1GiftCardProduct_universal_d_StudioUnassigned as StudioUnassigned,
      giftCardsV1GiftCardProduct_universal_d_Empty as Empty,
      giftCardsV1GiftCardProduct_universal_d_IsInWixGiftCardsAppPopulationRequest as IsInWixGiftCardsAppPopulationRequest,
      giftCardsV1GiftCardProduct_universal_d_IsInWixGiftCardsAppPopulationResponse as IsInWixGiftCardsAppPopulationResponse,
      giftCardsV1GiftCardProduct_universal_d_DomainEvent as DomainEvent,
      giftCardsV1GiftCardProduct_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      giftCardsV1GiftCardProduct_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      giftCardsV1GiftCardProduct_universal_d_RestoreInfo as RestoreInfo,
      giftCardsV1GiftCardProduct_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      giftCardsV1GiftCardProduct_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      giftCardsV1GiftCardProduct_universal_d_ActionEvent as ActionEvent,
      giftCardsV1GiftCardProduct_universal_d_MessageEnvelope as MessageEnvelope,
      giftCardsV1GiftCardProduct_universal_d_IdentificationData as IdentificationData,
      giftCardsV1GiftCardProduct_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      giftCardsV1GiftCardProduct_universal_d_WebhookIdentityType as WebhookIdentityType,
      giftCardsV1GiftCardProduct_universal_d_createGiftCardProduct as createGiftCardProduct,
      giftCardsV1GiftCardProduct_universal_d_getGiftCardProduct as getGiftCardProduct,
      giftCardsV1GiftCardProduct_universal_d_updateGiftCardProduct as updateGiftCardProduct,
      giftCardsV1GiftCardProduct_universal_d_UpdateGiftCardProduct as UpdateGiftCardProduct,
      giftCardsV1GiftCardProduct_universal_d_UpdateGiftCardProductOptions as UpdateGiftCardProductOptions,
      giftCardsV1GiftCardProduct_universal_d_deleteGiftCardProduct as deleteGiftCardProduct,
      giftCardsV1GiftCardProduct_universal_d_queryGiftCardProducts as queryGiftCardProducts,
      giftCardsV1GiftCardProduct_universal_d_GiftCardProductsQueryResult as GiftCardProductsQueryResult,
      giftCardsV1GiftCardProduct_universal_d_GiftCardProductsQueryBuilder as GiftCardProductsQueryBuilder,
      giftCardsV1GiftCardProduct_universal_d_isInWixGiftCardsAppPopulation as isInWixGiftCardsAppPopulation,
    };
  }
  
  export { giftCardsV1GiftCardProduct_universal_d as giftVoucherProducts };
}
