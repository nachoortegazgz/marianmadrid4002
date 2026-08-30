declare module "wix-stores.v3" {
  /**
   * A Provision is a record that contains the version of the catalog a store was installed on.
   * Only one Provision entity can exist per tenant. Retrieving a provision is managed completely by
   * callScope, no api parameters are needed.
   *
   * Services should only use this service if they are part of the install flow.
   */
  interface Provision$1 {
      /**
       * Provision ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the Provision is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the Provision.
       * Ignored when creating a Provision.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the Provision was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time the Provision was last updated.
       * @readonly
       */
      _updatedDate?: Date;
      /** Version of the catalog this store was provisioned on. DO NOT USE unless part of the install flow */
      catalogVersion?: Version$1;
  }
  enum Version$1 {
      UNKNOWN_VERSION = "UNKNOWN_VERSION",
      V1_CATALOG = "V1_CATALOG",
      V3_CATALOG = "V3_CATALOG"
  }
  interface DefaultDeliveryProfileSetup$1 {
      /** metasite id of site */
      metaSiteId?: string | null;
  }
  interface GetCatalogVersionRequest$1 {
  }
  interface GetCatalogVersionResponse$1 {
      /** The version of the Stores Catalog installed on a site. */
      catalogVersion?: Version$1;
  }
  interface GetProvisionRequest {
      /** Store this store was cloned from. If store was not cloned, leave empty */
      originalInstanceId?: string | null;
  }
  interface GetProvisionResponse {
      /** The requested Provision. */
      provision?: Provision$1;
  }
  interface InstallBassAppDependencyRequest$1 {
  }
  interface InstallBassAppDependencyResponse$1 {
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
      /** A list of "assets" (applications). The same as MetaSiteContext. */
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
      state?: State$2;
  }
  enum State$2 {
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
      BRANDED_FIRST = "BRANDED_FIRST"
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
      dateDeleted?: Date;
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
  interface ServiceProvisioned$1 {
      /** Either UUID or EmbeddedServiceType. */
      appDefId?: string;
      /** Not only UUID. Something here could be something weird. */
      instanceId?: string;
      /** An instance id from which this instance is originated. */
      originInstanceId?: string;
      /** A version. */
      version?: string | null;
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
  interface Empty$8 {
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
   * Retrieves the version of Stores Catalog installed on a site.
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function getCatalogVersion$1(): Promise<GetCatalogVersionResponse$1>;
  
  type storesCatalogV1Provision_universal_d_GetProvisionRequest = GetProvisionRequest;
  type storesCatalogV1Provision_universal_d_GetProvisionResponse = GetProvisionResponse;
  namespace storesCatalogV1Provision_universal_d {
    export {
      Provision$1 as Provision,
      Version$1 as Version,
      DefaultDeliveryProfileSetup$1 as DefaultDeliveryProfileSetup,
      GetCatalogVersionRequest$1 as GetCatalogVersionRequest,
      GetCatalogVersionResponse$1 as GetCatalogVersionResponse,
      storesCatalogV1Provision_universal_d_GetProvisionRequest as GetProvisionRequest,
      storesCatalogV1Provision_universal_d_GetProvisionResponse as GetProvisionResponse,
      InstallBassAppDependencyRequest$1 as InstallBassAppDependencyRequest,
      InstallBassAppDependencyResponse$1 as InstallBassAppDependencyResponse,
      MetaSiteSpecialEvent$1 as MetaSiteSpecialEvent,
      MetaSiteSpecialEventPayloadOneOf$1 as MetaSiteSpecialEventPayloadOneOf,
      Asset$1 as Asset,
      State$2 as State,
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
      Empty$8 as Empty,
      MessageEnvelope$8 as MessageEnvelope,
      IdentificationData$8 as IdentificationData,
      IdentificationDataIdOneOf$8 as IdentificationDataIdOneOf,
      WebhookIdentityType$8 as WebhookIdentityType,
      getCatalogVersion$1 as getCatalogVersion,
    };
  }
  
  /**
   * A brand is a visible property of a product.
   * Adding brands to your products can help improve site and product visibility on search engines.
   */
  interface Brand$1 {
      /**
       * Brand ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the brand is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the brand.
       *
       * Ignored when creating a brand.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the brand was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the brand was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Brand name.
       * >**Note:** `name` must be unique.
       */
      name?: string;
      /**
       * Number of products this brand is assigned to.
       * > **Note:** Returned only when you pass `"ASSIGNED_PRODUCTS_COUNT"` to the `fields` array in Brand API requests.
       * @readonly
       */
      assignedProductsCount?: number | null;
  }
  interface InvalidateCache$6 extends InvalidateCacheGetByOneOf$6 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$6;
      /** Invalidate by page id */
      page?: Page$6;
      /** Invalidate by URI path */
      uri?: URI$6;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$6;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf$6 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$6;
      /** Invalidate by page id */
      page?: Page$6;
      /** Invalidate by URI path */
      uri?: URI$6;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$6;
  }
  interface App$6 {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page$6 {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI$6 {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File$6 {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface CreateBrandRequest {
      /** Brand to create. */
      brand: Brand$1;
  }
  interface CreateBrandResponse {
      /** Created brand. */
      brand?: Brand$1;
  }
  interface GetBrandRequest {
      /** Brand ID. */
      brandId: string;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$4[];
  }
  enum RequestedFields$4 {
      UNKNOWN_REQUESTED_FIELD = "UNKNOWN_REQUESTED_FIELD",
      ASSIGNED_PRODUCTS_COUNT = "ASSIGNED_PRODUCTS_COUNT"
  }
  interface GetBrandResponse {
      /** Brand. */
      brand?: Brand$1;
  }
  interface UpdateBrandRequest {
      /** Brand to update. */
      brand: Brand$1;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$4[];
  }
  interface UpdateBrandResponse {
      /** Updated brand. */
      brand?: Brand$1;
  }
  interface DeleteBrandRequest {
      /** Brand ID. */
      brandId: string;
  }
  interface DeleteBrandResponse {
  }
  interface QueryBrandsRequest {
      /** Query options. */
      query?: CursorQuery$5;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$4[];
  }
  interface CursorQuery$5 extends CursorQueryPagingMethodOneOf$5 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$6;
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
      sort?: Sorting$6[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$5 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$6;
  }
  interface Sorting$6 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$6;
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
  enum SortOrder$6 {
      /** Ascending order. */
      ASC = "ASC",
      /** Descending order. */
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
  interface QueryBrandsResponse {
      /** List of brands. */
      brands?: Brand$1[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata$6;
  }
  interface CursorPagingMetadata$6 {
      /** Number of items returned in the response. */
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
  }
  interface Cursors$6 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface BulkCreateBrandsRequest {
      /** Brands to create. */
      brands: Brand$1[];
      /**
       * Whether to return the full created brand entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
  }
  interface BulkCreateBrandsResponse {
      /** Brands created by bulk action. */
      results?: BulkBrandsResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$5;
  }
  interface BulkBrandsResult {
      /** Bulk action metadata for brand. */
      itemMetadata?: ItemMetadata$5;
      /**
       * Full brand entity.
       *
       * Returned only if `returnEntity: true` is passed in the request.
       */
      item?: Brand$1;
  }
  interface ItemMetadata$5 {
      /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError$5;
  }
  interface ApplicationError$5 {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  interface BulkActionMetadata$5 {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface BulkUpdateBrandsRequest {
      /** List of brands to update. */
      brands: MaskedBrand[];
      /**
       * Whether to return the full updated brand entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$4[];
  }
  interface MaskedBrand {
      /** Brand to update. */
      brand?: Brand$1;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  interface BulkUpdateBrandsResponse {
      /** Brands updated by bulk action. */
      results?: BulkBrandsResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$5;
  }
  interface GetOrCreateBrandRequest {
      /** Brand name to retrieve or create. */
      brandName: string;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$4[];
  }
  interface GetOrCreateBrandResponse {
      /** Brand. */
      brand?: Brand$1;
  }
  interface BulkGetOrCreateBrandsRequest {
      /** Brand names to retrieve or create. */
      brandNames: string[];
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$4[];
  }
  interface BulkGetOrCreateBrandsResponse {
      /** Brands retrieved or created by bulk action. */
      results?: BulkBrandsResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$5;
  }
  interface BulkDeleteBrandsRequest {
      /** IDs of brands to delete. */
      brandIds: string[];
  }
  interface BulkDeleteBrandsResponse {
      /** Brands deleted by bulk action. */
      results?: BulkDeleteBrandsResponseBulkBrandsResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$5;
  }
  interface BulkDeleteBrandsResponseBulkBrandsResult {
      /** Bulk action metadata for brand. */
      itemMetadata?: ItemMetadata$5;
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
   * Creates a brand.
   *
   * To assign the brand to a product, include the `brand.id` or `brand.name`
   * when [creating](https://dev.wix.com/docs/rest/business-solutions/stores/catalog-v3/products-v3/create-product) or
   * [updating](https://dev.wix.com/docs/rest/business-solutions/stores/catalog-v3/products-v3/update-product) a product.
   * @param brand - Brand to create.
   * @public
   * @documentationMaturity preview
   * @requiredField brand
   * @requiredField brand.name
   * @permissionId WIX_STORES.BRAND_CREATE
   * @adminMethod
   * @returns Created brand.
   */
  function createBrand(brand: Brand$1): Promise<Brand$1>;
  /**
   * Retrieves a brand.
   * @param brandId - Brand ID.
   * @public
   * @documentationMaturity preview
   * @requiredField brandId
   * @permissionId WIX_STORES.BRAND_READ
   * @returns Brand.
   */
  function getBrand(brandId: string, options?: GetBrandOptions): Promise<Brand$1>;
  interface GetBrandOptions {
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$4[];
  }
  /**
   * Updates a brand.
   *
   * Each time the brand is updated, `revision` increments by 1.
   * The current `revision` must be passed when updating the brand.
   * This ensures you're working with the latest brand and prevents unintended overwrites.
   * @param _id - Brand ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField brand
   * @requiredField brand.revision
   * @permissionId WIX_STORES.BRAND_UPDATE
   * @adminMethod
   * @returns Updated brand.
   */
  function updateBrand(_id: string | null, brand: UpdateBrand, options?: UpdateBrandOptions): Promise<Brand$1>;
  interface UpdateBrand {
      /**
       * Brand ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the brand is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the brand.
       *
       * Ignored when creating a brand.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the brand was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the brand was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Brand name.
       * >**Note:** `name` must be unique.
       */
      name?: string;
      /**
       * Number of products this brand is assigned to.
       * > **Note:** Returned only when you pass `"ASSIGNED_PRODUCTS_COUNT"` to the `fields` array in Brand API requests.
       * @readonly
       */
      assignedProductsCount?: number | null;
  }
  interface UpdateBrandOptions {
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$4[];
  }
  /**
   * Deletes a brand.
   *
   * > **Note:** Deleting a brand will also remove it from all products it is assigned to.
   * @param brandId - Brand ID.
   * @public
   * @documentationMaturity preview
   * @requiredField brandId
   * @permissionId WIX_STORES.BRAND_DELETE
   * @adminMethod
   */
  function deleteBrand(brandId: string): Promise<void>;
  /**
   * Retrieves a list of up to 100 brands, given the provided filtering, sorting, and cursor paging.
   * Pass supported values to the `fields` array in the request to include those fields in the response.
   *
   *
   * Query Brands runs with these defaults, which you can override:
   *
   * - `createdDate` is sorted in `DESC` order
   * - `cursorPaging.limit` is `100`
   *
   * For field support for filters and sorting,
   * see [Brands: Supported Filters and Sorting](https://dev.wix.com/docs/rest/business-solutions/stores/catalog-v3/brands-v3/supported-filters-and-sorting).
   *
   * To learn about working with _Query_ endpoints, see
   * [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language),
   * and [Sorting and Paging](https://dev.wix.com/docs/rest/articles/getting-started/sorting-and-paging).
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_STORES.BRAND_READ
   */
  function queryBrands(options?: QueryBrandsOptions): BrandsQueryBuilder;
  interface QueryBrandsOptions {
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$4[] | undefined;
  }
  interface QueryCursorResult$6 {
      cursors: Cursors$6;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface BrandsQueryResult extends QueryCursorResult$6 {
      items: Brand$1[];
      query: BrandsQueryBuilder;
      next: () => Promise<BrandsQueryResult>;
      prev: () => Promise<BrandsQueryResult>;
  }
  interface BrandsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name', value: any) => BrandsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name', value: any) => BrandsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => BrandsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => BrandsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => BrandsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => BrandsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'name', value: string) => BrandsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name', value: any[]) => BrandsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name', value: any) => BrandsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name', value: boolean) => BrandsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_createdDate' | '_updatedDate' | 'name'>) => BrandsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_createdDate' | '_updatedDate' | 'name'>) => BrandsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => BrandsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => BrandsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<BrandsQueryResult>;
  }
  /**
   * Creates multiple brands.
   * @param brands - Brands to create.
   * @public
   * @documentationMaturity preview
   * @requiredField brands
   * @requiredField brands.name
   * @permissionId WIX_STORES.BRAND_CREATE
   * @adminMethod
   */
  function bulkCreateBrands(brands: Brand$1[], options?: BulkCreateBrandsOptions): Promise<BulkCreateBrandsResponse>;
  interface BulkCreateBrandsOptions {
      /**
       * Whether to return the full created brand entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
  }
  /**
   * Updates multiple brands.
   *
   * Each time a brand is updated, `revision` increments by 1.
   * The current `revision` must be passed when updating a brand.
   * This ensures you're working with the latest brand and prevents unintended overwrites.
   * @param brands - List of brands to update.
   * @public
   * @documentationMaturity preview
   * @requiredField brands
   * @requiredField brands.brand._id
   * @requiredField brands.brand.revision
   * @permissionId WIX_STORES.BRAND_UPDATE
   * @adminMethod
   */
  function bulkUpdateBrands(brands: MaskedBrand[], options?: BulkUpdateBrandsOptions): Promise<BulkUpdateBrandsResponse>;
  interface BulkUpdateBrandsOptions {
      /**
       * Whether to return the full updated brand entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$4[];
  }
  /**
   * Retrieves a brand by name, or creates a brand if one with the passed `brandName` doesn't exist.
   * @param brandName - Brand name to retrieve or create.
   * @public
   * @documentationMaturity preview
   * @requiredField brandName
   * @permissionId WIX_STORES.BRAND_GET_OR_CREATE
   * @adminMethod
   */
  function getOrCreateBrand(brandName: string, options?: GetOrCreateBrandOptions): Promise<GetOrCreateBrandResponse>;
  interface GetOrCreateBrandOptions {
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$4[];
  }
  /**
   * Retrieves multiple brands by name, or creates multiple brands if those with the passed `ribbonNames` don't exist.
   * @param brandNames - Brand names to retrieve or create.
   * @public
   * @documentationMaturity preview
   * @requiredField brandNames
   * @permissionId WIX_STORES.BRAND_GET_OR_CREATE
   * @adminMethod
   */
  function bulkGetOrCreateBrands(brandNames: string[], options?: BulkGetOrCreateBrandsOptions): Promise<BulkGetOrCreateBrandsResponse>;
  interface BulkGetOrCreateBrandsOptions {
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$4[];
  }
  /**
   * Deletes multiple brands.
   * @param brandIds - IDs of brands to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField brandIds
   * @permissionId WIX_STORES.BRAND_DELETE
   * @adminMethod
   */
  function bulkDeleteBrands(brandIds: string[]): Promise<BulkDeleteBrandsResponse>;
  
  type storesCatalogV3Brand_universal_d_CreateBrandRequest = CreateBrandRequest;
  type storesCatalogV3Brand_universal_d_CreateBrandResponse = CreateBrandResponse;
  type storesCatalogV3Brand_universal_d_GetBrandRequest = GetBrandRequest;
  type storesCatalogV3Brand_universal_d_GetBrandResponse = GetBrandResponse;
  type storesCatalogV3Brand_universal_d_UpdateBrandRequest = UpdateBrandRequest;
  type storesCatalogV3Brand_universal_d_UpdateBrandResponse = UpdateBrandResponse;
  type storesCatalogV3Brand_universal_d_DeleteBrandRequest = DeleteBrandRequest;
  type storesCatalogV3Brand_universal_d_DeleteBrandResponse = DeleteBrandResponse;
  type storesCatalogV3Brand_universal_d_QueryBrandsRequest = QueryBrandsRequest;
  type storesCatalogV3Brand_universal_d_QueryBrandsResponse = QueryBrandsResponse;
  type storesCatalogV3Brand_universal_d_BulkCreateBrandsRequest = BulkCreateBrandsRequest;
  type storesCatalogV3Brand_universal_d_BulkCreateBrandsResponse = BulkCreateBrandsResponse;
  type storesCatalogV3Brand_universal_d_BulkBrandsResult = BulkBrandsResult;
  type storesCatalogV3Brand_universal_d_BulkUpdateBrandsRequest = BulkUpdateBrandsRequest;
  type storesCatalogV3Brand_universal_d_MaskedBrand = MaskedBrand;
  type storesCatalogV3Brand_universal_d_BulkUpdateBrandsResponse = BulkUpdateBrandsResponse;
  type storesCatalogV3Brand_universal_d_GetOrCreateBrandRequest = GetOrCreateBrandRequest;
  type storesCatalogV3Brand_universal_d_GetOrCreateBrandResponse = GetOrCreateBrandResponse;
  type storesCatalogV3Brand_universal_d_BulkGetOrCreateBrandsRequest = BulkGetOrCreateBrandsRequest;
  type storesCatalogV3Brand_universal_d_BulkGetOrCreateBrandsResponse = BulkGetOrCreateBrandsResponse;
  type storesCatalogV3Brand_universal_d_BulkDeleteBrandsRequest = BulkDeleteBrandsRequest;
  type storesCatalogV3Brand_universal_d_BulkDeleteBrandsResponse = BulkDeleteBrandsResponse;
  type storesCatalogV3Brand_universal_d_BulkDeleteBrandsResponseBulkBrandsResult = BulkDeleteBrandsResponseBulkBrandsResult;
  const storesCatalogV3Brand_universal_d_createBrand: typeof createBrand;
  const storesCatalogV3Brand_universal_d_getBrand: typeof getBrand;
  type storesCatalogV3Brand_universal_d_GetBrandOptions = GetBrandOptions;
  const storesCatalogV3Brand_universal_d_updateBrand: typeof updateBrand;
  type storesCatalogV3Brand_universal_d_UpdateBrand = UpdateBrand;
  type storesCatalogV3Brand_universal_d_UpdateBrandOptions = UpdateBrandOptions;
  const storesCatalogV3Brand_universal_d_deleteBrand: typeof deleteBrand;
  const storesCatalogV3Brand_universal_d_queryBrands: typeof queryBrands;
  type storesCatalogV3Brand_universal_d_QueryBrandsOptions = QueryBrandsOptions;
  type storesCatalogV3Brand_universal_d_BrandsQueryResult = BrandsQueryResult;
  type storesCatalogV3Brand_universal_d_BrandsQueryBuilder = BrandsQueryBuilder;
  const storesCatalogV3Brand_universal_d_bulkCreateBrands: typeof bulkCreateBrands;
  type storesCatalogV3Brand_universal_d_BulkCreateBrandsOptions = BulkCreateBrandsOptions;
  const storesCatalogV3Brand_universal_d_bulkUpdateBrands: typeof bulkUpdateBrands;
  type storesCatalogV3Brand_universal_d_BulkUpdateBrandsOptions = BulkUpdateBrandsOptions;
  const storesCatalogV3Brand_universal_d_getOrCreateBrand: typeof getOrCreateBrand;
  type storesCatalogV3Brand_universal_d_GetOrCreateBrandOptions = GetOrCreateBrandOptions;
  const storesCatalogV3Brand_universal_d_bulkGetOrCreateBrands: typeof bulkGetOrCreateBrands;
  type storesCatalogV3Brand_universal_d_BulkGetOrCreateBrandsOptions = BulkGetOrCreateBrandsOptions;
  const storesCatalogV3Brand_universal_d_bulkDeleteBrands: typeof bulkDeleteBrands;
  namespace storesCatalogV3Brand_universal_d {
    export {
      Brand$1 as Brand,
      InvalidateCache$6 as InvalidateCache,
      InvalidateCacheGetByOneOf$6 as InvalidateCacheGetByOneOf,
      App$6 as App,
      Page$6 as Page,
      URI$6 as URI,
      File$6 as File,
      storesCatalogV3Brand_universal_d_CreateBrandRequest as CreateBrandRequest,
      storesCatalogV3Brand_universal_d_CreateBrandResponse as CreateBrandResponse,
      storesCatalogV3Brand_universal_d_GetBrandRequest as GetBrandRequest,
      RequestedFields$4 as RequestedFields,
      storesCatalogV3Brand_universal_d_GetBrandResponse as GetBrandResponse,
      storesCatalogV3Brand_universal_d_UpdateBrandRequest as UpdateBrandRequest,
      storesCatalogV3Brand_universal_d_UpdateBrandResponse as UpdateBrandResponse,
      storesCatalogV3Brand_universal_d_DeleteBrandRequest as DeleteBrandRequest,
      storesCatalogV3Brand_universal_d_DeleteBrandResponse as DeleteBrandResponse,
      storesCatalogV3Brand_universal_d_QueryBrandsRequest as QueryBrandsRequest,
      CursorQuery$5 as CursorQuery,
      CursorQueryPagingMethodOneOf$5 as CursorQueryPagingMethodOneOf,
      Sorting$6 as Sorting,
      SortOrder$6 as SortOrder,
      CursorPaging$6 as CursorPaging,
      storesCatalogV3Brand_universal_d_QueryBrandsResponse as QueryBrandsResponse,
      CursorPagingMetadata$6 as CursorPagingMetadata,
      Cursors$6 as Cursors,
      storesCatalogV3Brand_universal_d_BulkCreateBrandsRequest as BulkCreateBrandsRequest,
      storesCatalogV3Brand_universal_d_BulkCreateBrandsResponse as BulkCreateBrandsResponse,
      storesCatalogV3Brand_universal_d_BulkBrandsResult as BulkBrandsResult,
      ItemMetadata$5 as ItemMetadata,
      ApplicationError$5 as ApplicationError,
      BulkActionMetadata$5 as BulkActionMetadata,
      storesCatalogV3Brand_universal_d_BulkUpdateBrandsRequest as BulkUpdateBrandsRequest,
      storesCatalogV3Brand_universal_d_MaskedBrand as MaskedBrand,
      storesCatalogV3Brand_universal_d_BulkUpdateBrandsResponse as BulkUpdateBrandsResponse,
      storesCatalogV3Brand_universal_d_GetOrCreateBrandRequest as GetOrCreateBrandRequest,
      storesCatalogV3Brand_universal_d_GetOrCreateBrandResponse as GetOrCreateBrandResponse,
      storesCatalogV3Brand_universal_d_BulkGetOrCreateBrandsRequest as BulkGetOrCreateBrandsRequest,
      storesCatalogV3Brand_universal_d_BulkGetOrCreateBrandsResponse as BulkGetOrCreateBrandsResponse,
      storesCatalogV3Brand_universal_d_BulkDeleteBrandsRequest as BulkDeleteBrandsRequest,
      storesCatalogV3Brand_universal_d_BulkDeleteBrandsResponse as BulkDeleteBrandsResponse,
      storesCatalogV3Brand_universal_d_BulkDeleteBrandsResponseBulkBrandsResult as BulkDeleteBrandsResponseBulkBrandsResult,
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
      storesCatalogV3Brand_universal_d_createBrand as createBrand,
      storesCatalogV3Brand_universal_d_getBrand as getBrand,
      storesCatalogV3Brand_universal_d_GetBrandOptions as GetBrandOptions,
      storesCatalogV3Brand_universal_d_updateBrand as updateBrand,
      storesCatalogV3Brand_universal_d_UpdateBrand as UpdateBrand,
      storesCatalogV3Brand_universal_d_UpdateBrandOptions as UpdateBrandOptions,
      storesCatalogV3Brand_universal_d_deleteBrand as deleteBrand,
      storesCatalogV3Brand_universal_d_queryBrands as queryBrands,
      storesCatalogV3Brand_universal_d_QueryBrandsOptions as QueryBrandsOptions,
      storesCatalogV3Brand_universal_d_BrandsQueryResult as BrandsQueryResult,
      storesCatalogV3Brand_universal_d_BrandsQueryBuilder as BrandsQueryBuilder,
      storesCatalogV3Brand_universal_d_bulkCreateBrands as bulkCreateBrands,
      storesCatalogV3Brand_universal_d_BulkCreateBrandsOptions as BulkCreateBrandsOptions,
      storesCatalogV3Brand_universal_d_bulkUpdateBrands as bulkUpdateBrands,
      storesCatalogV3Brand_universal_d_BulkUpdateBrandsOptions as BulkUpdateBrandsOptions,
      storesCatalogV3Brand_universal_d_getOrCreateBrand as getOrCreateBrand,
      storesCatalogV3Brand_universal_d_GetOrCreateBrandOptions as GetOrCreateBrandOptions,
      storesCatalogV3Brand_universal_d_bulkGetOrCreateBrands as bulkGetOrCreateBrands,
      storesCatalogV3Brand_universal_d_BulkGetOrCreateBrandsOptions as BulkGetOrCreateBrandsOptions,
      storesCatalogV3Brand_universal_d_bulkDeleteBrands as bulkDeleteBrands,
    };
  }
  
  /**
   * Customizations include options and modifiers which can later be applied to products.
   * Options are designed to add variations to a product, where modifiers add a customizable change to the product but without creating another variant.
   */
  interface Customization extends CustomizationCustomizationSettingsOneOf {
      /**
       * Free text input settings.
       *
       * > **Note:** To be passed along with `customizationRenderType: FREE_TEXT`.
       */
      freeTextInput?: FreeTextSettings$1;
      /**
       * Choices settings.
       *
       * > **Note:** Must be passed along with `customizationRenderType` of `SWATCH_CHOICES` and `TEXT_CHOICES`.
       */
      choicesSettings?: ChoicesSettings$1;
      /**
       * Customization ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the customization is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the customization.
       *
       * Ignored when creating a customization.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the customization was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the customization was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * A read-only key generated based on choice name. Used for eCommerce integration.
       * @internal
       * @readonly
       */
      key?: string | null;
      /** Customization name for options (for example, `"color"`, `"size"`) and modifiers (for example, `"greeting card"`). */
      name?: string;
      /** Customization type. */
      customizationType?: CustomizationType;
      /**
       * Customization render type.
       *
       * Defines how the customization will be displayed in the storefront.
       */
      customizationRenderType?: CustomizationRenderType;
      /**
       * Number of products this customization is assigned to.
       * > **Note:** Returned only when you pass `"ASSIGNED_PRODUCTS_COUNT"` to the `fields` array in Customizations API requests.
       * @readonly
       */
      assignedProductsCount?: number | null;
  }
  /** @oneof */
  interface CustomizationCustomizationSettingsOneOf {
      /**
       * Free text input settings.
       *
       * > **Note:** To be passed along with `customizationRenderType: FREE_TEXT`.
       */
      freeTextInput?: FreeTextSettings$1;
      /**
       * Choices settings.
       *
       * > **Note:** Must be passed along with `customizationRenderType` of `SWATCH_CHOICES` and `TEXT_CHOICES`.
       */
      choicesSettings?: ChoicesSettings$1;
  }
  enum CustomizationType {
      UNKNOWN_CUSTOMIZATION_TYPE = "UNKNOWN_CUSTOMIZATION_TYPE",
      PRODUCT_OPTION = "PRODUCT_OPTION",
      MODIFIER = "MODIFIER"
  }
  enum CustomizationRenderType {
      UNKNOWN_CUSTOMIZATION_RENDER_TYPE = "UNKNOWN_CUSTOMIZATION_RENDER_TYPE",
      FREE_TEXT = "FREE_TEXT",
      TEXT_CHOICES = "TEXT_CHOICES",
      SWATCH_CHOICES = "SWATCH_CHOICES"
  }
  interface FreeTextSettings$1 {
      /** Minimum text character length. */
      minCharCount?: number;
      /** Maximum text character length. */
      maxCharCount?: number;
      /** Default amount added to a product's price when this choice is assigned to a modifier. */
      defaultAddedPrice?: string | null;
      /** Title to display to customer for their free-text input. */
      title?: string;
      /**
       * A read-only key generated based on choice name. Used for eCommerce integration.
       * @internal
       * @readonly
       */
      key?: string | null;
  }
  interface ChoicesSettings$1 {
      /** List of choices. */
      choices?: Choice[];
  }
  interface Choice extends ChoiceValueOneOf {
      /** Color code in HEX format, [as described by MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color). */
      colorCode?: string;
      /**
       * Multiple colors - HEX (#RRGGBB) color code
       * @internal
       */
      colorCodes?: MultipleColors$1;
      /**
       * Image
       * @internal
       */
      image?: string;
      /**
       * Choice ID.
       * @readonly
       */
      _id?: string;
      /**
       * Choice type.
       *
       * > **Notes:**
       * > + For `customizationRenderType: SWATCH_CHOICES`, the supported `choiceType` values are: `ONE_COLOR`, `MULTIPLE_COLORS`, or `IMAGE`.
       * > + For a `customizationRenderType` of `TEXT_CHOICES` and `FREE_TEXT`, the supported `choiceType` value is: `CHOICE_TEXT`.
       */
      choiceType?: ChoiceType$1;
      /**
       * A read-only key generated based on choice name. Used for eCommerce integration.
       * @readonly
       */
      key?: string | null;
      /** Choice name. */
      name?: string;
      /** Default amount added to a product's price when this customization is assigned to a modifier. */
      defaultAddedPrice?: string | null;
      /**
       * Number of products this choice is assigned to .
       * @readonly
       */
      assignedProductsCount?: number;
  }
  /** @oneof */
  interface ChoiceValueOneOf {
      /** Color code in HEX format, [as described by MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color). */
      colorCode?: string;
      /**
       * Multiple colors - HEX (#RRGGBB) color code
       * @internal
       */
      colorCodes?: MultipleColors$1;
      /**
       * Image
       * @internal
       */
      image?: string;
  }
  enum ChoiceType$1 {
      UNKNOWN_CHOICE_TYPE = "UNKNOWN_CHOICE_TYPE",
      /** For a `customizationRenderType` of `TEXT_CHOICES` and `FREE_TEXT`. */
      CHOICE_TEXT = "CHOICE_TEXT",
      /** For `customizationRenderType: SWATCH_CHOICES`. */
      ONE_COLOR = "ONE_COLOR",
      /** For `customizationRenderType: SWATCH_CHOICES`. */
      MULTIPLE_COLORS = "MULTIPLE_COLORS",
      /** For `customizationRenderType: SWATCH_CHOICES`. */
      IMAGE = "IMAGE"
  }
  interface MultipleColors$1 {
      /** A list of color codes. */
      colorCodes?: string[];
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
  interface InvalidateCache$5 extends InvalidateCacheGetByOneOf$5 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$5;
      /** Invalidate by page id */
      page?: Page$5;
      /** Invalidate by URI path */
      uri?: URI$5;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$5;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf$5 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$5;
      /** Invalidate by page id */
      page?: Page$5;
      /** Invalidate by URI path */
      uri?: URI$5;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$5;
  }
  interface App$5 {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page$5 {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI$5 {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File$5 {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface CreateCustomizationRequest {
      /** Customization to create. */
      customization: Customization;
  }
  interface CreateCustomizationResponse {
      /** Created customization. */
      customization?: Customization;
  }
  interface GetCustomizationRequest {
      /** Customization ID. */
      customizationId: string;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$3[];
  }
  enum RequestedFields$3 {
      /** Unknown requested field. */
      UNKNOWN_REQUESTED_FIELD = "UNKNOWN_REQUESTED_FIELD",
      /** Assigned products count. */
      ASSIGNED_PRODUCTS_COUNT = "ASSIGNED_PRODUCTS_COUNT"
  }
  interface GetCustomizationResponse {
      /** Customization. */
      customization?: Customization;
  }
  interface UpdateCustomizationRequest {
      /** Customization to update. */
      customization: Customization;
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$3[];
  }
  interface UpdateCustomizationResponse {
      /** Updated customization. */
      customization?: Customization;
  }
  interface DeleteCustomizationRequest {
      /** Customization ID. */
      customizationId: string;
  }
  interface DeleteCustomizationResponse {
  }
  interface QueryCustomizationsRequest {
      /** Query options. */
      query?: CursorQuery$4;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$3[];
  }
  interface CursorQuery$4 extends CursorQueryPagingMethodOneOf$4 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$5;
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
      sort?: Sorting$5[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$4 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$5;
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
      /** Ascending order. */
      ASC = "ASC",
      /** Descending order. */
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
  interface QueryCustomizationsResponse {
      /** List of customizations. */
      customizations?: Customization[];
      /** Details on the paged set of results returned. */
      pagingMetadata?: CursorPagingMetadata$5;
  }
  interface CursorPagingMetadata$5 {
      /** Number of items returned in the response. */
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
  }
  interface Cursors$5 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface BulkCreateCustomizationsRequest {
      /** Customizations to create. */
      customizations: Customization[];
      /**
       * Whether to return the full customization entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
  }
  interface BulkCreateCustomizationsResponse {
      /** Customizations created by bulk action. */
      results?: BulkCustomizationResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$4;
  }
  interface BulkCustomizationResult {
      /** Bulk action metadata for customization. */
      itemMetadata?: ItemMetadata$4;
      /**
       * Full customization entity.
       *
       * Returned only if `returnEntity: true` is passed in the request.
       */
      customization?: Customization;
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
  interface BulkActionMetadata$4 {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface CustomizationIdsWrapper {
      /**
       * list of all the customization ids that are invalid
       * e.g list of failed choices ids
       */
      customizationIds?: string[];
  }
  interface AddCustomizationChoicesRequest {
      /** Customization ID. */
      customizationId: string;
      /** Choices to add. */
      choices: Choice[];
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$3[];
  }
  interface AddCustomizationChoicesResponse {
      /** Updated customization. */
      customization?: Customization;
  }
  interface SetCustomizationChoicesRequest {
      /** Customization ID. */
      customizationId: string;
      /** Choices to set. */
      choices: Choice[];
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$3[];
  }
  interface SetCustomizationChoicesResponse {
      /** Updated customization. */
      customization?: Customization;
  }
  interface RemoveCustomizationChoicesRequest {
      /** Customization ID. */
      customizationId: string;
      /** IDs of choices to remove. */
      choiceIds: string[];
      /** Customization revision. */
      revision?: string;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$3[];
  }
  interface RemoveCustomizationChoicesResponse {
      /** Updated customization. */
      customization?: Customization;
  }
  interface BulkAddCustomizationChoicesRequest {
      /** List of customization IDs and choices. */
      customizationsChoices: CustomizationChoices[];
      /**
       * Whether to return the full customization entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$3[];
  }
  interface CustomizationChoices {
      /** Customization ID. */
      customizationId?: string;
      /** Choices to add. */
      choices?: Choice[];
  }
  interface BulkAddCustomizationChoicesResponse {
      /** Customizations updated by bulk action. */
      results?: BulkCustomizationResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$4;
  }
  interface BulkUpdateCustomizationsRequest {
      /** List of customizations to update. */
      customizations: MaskedCustomization[];
      /**
       * Whether to return the full customization entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$3[];
  }
  interface MaskedCustomization {
      /** Customization to update. */
      customization?: Customization;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  interface BulkUpdateCustomizationsResponse {
      /** Customizations updated by bulk action. */
      results?: BulkCustomizationResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$4;
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
   * Creates a customization.
   * @param customization - Customization to create.
   * @public
   * @documentationMaturity preview
   * @requiredField customization
   * @requiredField customization.choicesSettings.choices
   * @requiredField customization.customizationRenderType
   * @requiredField customization.customizationType
   * @requiredField customization.freeTextInput.title
   * @requiredField customization.name
   * @permissionId WIX_STORES.CUSTOMIZATION_CREATE
   * @adminMethod
   * @returns Created customization.
   */
  function createCustomization(customization: Customization): Promise<Customization>;
  /**
   * Retrieves a customization.
   * @param customizationId - Customization ID.
   * @public
   * @documentationMaturity preview
   * @requiredField customizationId
   * @permissionId WIX_STORES.CUSTOMIZATION_READ
   * @returns Customization.
   */
  function getCustomization(customizationId: string, options?: GetCustomizationOptions): Promise<Customization>;
  interface GetCustomizationOptions {
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$3[];
  }
  /**
   * Updates a customization.
   *
   * Each time the customization is updated, `revision` increments by 1.
   * The current `revision` must be passed when updating the customization.
   * This ensures you're working with the latest customization and prevents unintended overwrites.
   * @param _id - Customization ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField customization
   * @requiredField customization.revision
   * @permissionId WIX_STORES.CUSTOMIZATION_UPDATE
   * @adminMethod
   * @returns Updated customization.
   */
  function updateCustomization(_id: string | null, customization: UpdateCustomization, options?: UpdateCustomizationOptions): Promise<Customization>;
  interface UpdateCustomization {
      /**
       * Free text input settings.
       *
       * > **Note:** To be passed along with `customizationRenderType: FREE_TEXT`.
       */
      freeTextInput?: FreeTextSettings$1;
      /**
       * Choices settings.
       *
       * > **Note:** Must be passed along with `customizationRenderType` of `SWATCH_CHOICES` and `TEXT_CHOICES`.
       */
      choicesSettings?: ChoicesSettings$1;
      /**
       * Customization ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the customization is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the customization.
       *
       * Ignored when creating a customization.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the customization was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the customization was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * A read-only key generated based on choice name. Used for eCommerce integration.
       * @internal
       * @readonly
       */
      key?: string | null;
      /** Customization name for options (for example, `"color"`, `"size"`) and modifiers (for example, `"greeting card"`). */
      name?: string;
      /** Customization type. */
      customizationType?: CustomizationType;
      /**
       * Customization render type.
       *
       * Defines how the customization will be displayed in the storefront.
       */
      customizationRenderType?: CustomizationRenderType;
      /**
       * Number of products this customization is assigned to.
       * > **Note:** Returned only when you pass `"ASSIGNED_PRODUCTS_COUNT"` to the `fields` array in Customizations API requests.
       * @readonly
       */
      assignedProductsCount?: number | null;
  }
  interface UpdateCustomizationOptions {
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$3[];
  }
  /**
   * Deletes a customization.
   *
   * > **Note:** A customization cannot be deleted if it is assigned to one or more products.
   * @param customizationId - Customization ID.
   * @public
   * @documentationMaturity preview
   * @requiredField customizationId
   * @permissionId WIX_STORES.CUSTOMIZATION_DELETE
   * @adminMethod
   */
  function deleteCustomization(customizationId: string): Promise<void>;
  /**
   * Retrieves a list of up to 100 customizations, given the provided filtering, sorting, and cursor paging.
   * Pass supported values to the `fields` array in the request to include those fields in the response.
   *
   *
   * Query Customizations runs with these defaults, which you can override:
   *
   * - `createdDate` is sorted in `DESC` order
   * - `cursorPaging.limit` is `100`
   *
   * For field support for filters and sorting,
   * see [Customizations: Supported Filters and Sorting](https://dev.wix.com/docs/rest/business-solutions/stores/catalog-v3/customizations-v3/supported-filters-and-sorting).
   *
   * To learn about working with _Query_ endpoints, see
   * [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language),
   * and [Sorting and Paging](https://dev.wix.com/docs/rest/articles/getting-started/sorting-and-paging).
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_STORES.CUSTOMIZATION_READ
   */
  function queryCustomizations(options?: QueryCustomizationsOptions): CustomizationsQueryBuilder;
  interface QueryCustomizationsOptions {
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$3[] | undefined;
  }
  interface QueryCursorResult$5 {
      cursors: Cursors$5;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface CustomizationsQueryResult extends QueryCursorResult$5 {
      items: Customization[];
      query: CustomizationsQueryBuilder;
      next: () => Promise<CustomizationsQueryResult>;
      prev: () => Promise<CustomizationsQueryResult>;
  }
  interface CustomizationsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name' | 'customizationType' | 'customizationRenderType', value: any) => CustomizationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name' | 'customizationType' | 'customizationRenderType', value: any) => CustomizationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => CustomizationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => CustomizationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => CustomizationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => CustomizationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'name', value: string) => CustomizationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name' | 'customizationType' | 'customizationRenderType', value: any[]) => CustomizationsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name' | 'customizationType' | 'customizationRenderType', value: any) => CustomizationsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name' | 'customizationType' | 'customizationRenderType', value: boolean) => CustomizationsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | '_createdDate' | '_updatedDate' | 'name'>) => CustomizationsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | '_createdDate' | '_updatedDate' | 'name'>) => CustomizationsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => CustomizationsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => CustomizationsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<CustomizationsQueryResult>;
  }
  /**
   * Creates multiple brands.
   * @param customizations - Customizations to create.
   * @public
   * @documentationMaturity preview
   * @requiredField customizations
   * @permissionId WIX_STORES.CUSTOMIZATION_CREATE
   * @adminMethod
   */
  function bulkCreateCustomizations(customizations: Customization[], options?: BulkCreateCustomizationsOptions): Promise<BulkCreateCustomizationsResponse>;
  interface BulkCreateCustomizationsOptions {
      /**
       * Whether to return the full customization entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
  }
  /**
   * Adds choices to a customization.
   * @param customizationId - Customization ID.
   * @param choices - Choices to add.
   * @public
   * @documentationMaturity preview
   * @requiredField choices
   * @requiredField customizationId
   * @permissionId WIX_STORES.CUSTOMIZATION_UPDATE
   * @adminMethod
   */
  function addCustomizationChoices(customizationId: string, choices: Choice[], options?: AddCustomizationChoicesOptions): Promise<AddCustomizationChoicesResponse>;
  interface AddCustomizationChoicesOptions {
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$3[];
  }
  /**
   * Sets a customization's choices. Any and all existing choices will be overridden.
   *
   * > **Note:** A choice cannot be overridden if it is assigned to one or more products.
   * @param customizationId - Customization ID.
   * @param choices - Choices to set.
   * @public
   * @documentationMaturity preview
   * @requiredField choices
   * @requiredField customizationId
   * @permissionId WIX_STORES.CUSTOMIZATION_UPDATE
   * @adminMethod
   */
  function setCustomizationChoices(customizationId: string, choices: Choice[], options?: SetCustomizationChoicesOptions): Promise<SetCustomizationChoicesResponse>;
  interface SetCustomizationChoicesOptions {
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$3[];
  }
  /**
   * Removes choices from a customization.
   *
   * +> **Note:** A choice cannot be removed if it is assigned to one or more products.
   * @param customizationId - Customization ID.
   * @param choiceIds - IDs of choices to remove.
   * @public
   * @documentationMaturity preview
   * @requiredField choiceIds
   * @requiredField customizationId
   * @permissionId WIX_STORES.CUSTOMIZATION_UPDATE
   * @adminMethod
   */
  function removeCustomizationChoices(customizationId: string, choiceIds: string[], options?: RemoveCustomizationChoicesOptions): Promise<RemoveCustomizationChoicesResponse>;
  interface RemoveCustomizationChoicesOptions {
      /** Customization revision. */
      revision?: string;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$3[];
  }
  /**
   * Adds choices to multiple customizations.
   * @param customizationsChoices - List of customization IDs and choices.
   * @public
   * @documentationMaturity preview
   * @requiredField customizationsChoices
   * @requiredField customizationsChoices.choices
   * @requiredField customizationsChoices.customizationId
   * @permissionId WIX_STORES.CUSTOMIZATION_UPDATE
   * @adminMethod
   */
  function bulkAddCustomizationChoices(customizationsChoices: CustomizationChoices[], options?: BulkAddCustomizationChoicesOptions): Promise<BulkAddCustomizationChoicesResponse>;
  interface BulkAddCustomizationChoicesOptions {
      /**
       * Whether to return the full customization entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$3[];
  }
  /**
   * Updates multiple customizations.
   *
   * Each time the customization is updated, `revision` increments by 1.
   * The current `revision` must be passed when updating the customization.
   * This ensures you're working with the latest customization and prevents unintended overwrites.
   * @param customizations - List of customizations to update.
   * @public
   * @documentationMaturity preview
   * @requiredField customizations
   * @requiredField customizations.customization._id
   * @requiredField customizations.customization.name
   * @requiredField customizations.customization.revision
   * @permissionId WIX_STORES.CUSTOMIZATION_UPDATE
   * @adminMethod
   */
  function bulkUpdateCustomizations(customizations: MaskedCustomization[], options?: BulkUpdateCustomizationsOptions): Promise<BulkUpdateCustomizationsResponse>;
  interface BulkUpdateCustomizationsOptions {
      /**
       * Whether to return the full customization entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$3[];
  }
  
  type storesCatalogV3Customization_universal_d_Customization = Customization;
  type storesCatalogV3Customization_universal_d_CustomizationCustomizationSettingsOneOf = CustomizationCustomizationSettingsOneOf;
  type storesCatalogV3Customization_universal_d_CustomizationType = CustomizationType;
  const storesCatalogV3Customization_universal_d_CustomizationType: typeof CustomizationType;
  type storesCatalogV3Customization_universal_d_CustomizationRenderType = CustomizationRenderType;
  const storesCatalogV3Customization_universal_d_CustomizationRenderType: typeof CustomizationRenderType;
  type storesCatalogV3Customization_universal_d_Choice = Choice;
  type storesCatalogV3Customization_universal_d_ChoiceValueOneOf = ChoiceValueOneOf;
  type storesCatalogV3Customization_universal_d_FocalPoint = FocalPoint;
  type storesCatalogV3Customization_universal_d_CreateCustomizationRequest = CreateCustomizationRequest;
  type storesCatalogV3Customization_universal_d_CreateCustomizationResponse = CreateCustomizationResponse;
  type storesCatalogV3Customization_universal_d_GetCustomizationRequest = GetCustomizationRequest;
  type storesCatalogV3Customization_universal_d_GetCustomizationResponse = GetCustomizationResponse;
  type storesCatalogV3Customization_universal_d_UpdateCustomizationRequest = UpdateCustomizationRequest;
  type storesCatalogV3Customization_universal_d_UpdateCustomizationResponse = UpdateCustomizationResponse;
  type storesCatalogV3Customization_universal_d_DeleteCustomizationRequest = DeleteCustomizationRequest;
  type storesCatalogV3Customization_universal_d_DeleteCustomizationResponse = DeleteCustomizationResponse;
  type storesCatalogV3Customization_universal_d_QueryCustomizationsRequest = QueryCustomizationsRequest;
  type storesCatalogV3Customization_universal_d_QueryCustomizationsResponse = QueryCustomizationsResponse;
  type storesCatalogV3Customization_universal_d_BulkCreateCustomizationsRequest = BulkCreateCustomizationsRequest;
  type storesCatalogV3Customization_universal_d_BulkCreateCustomizationsResponse = BulkCreateCustomizationsResponse;
  type storesCatalogV3Customization_universal_d_BulkCustomizationResult = BulkCustomizationResult;
  type storesCatalogV3Customization_universal_d_CustomizationIdsWrapper = CustomizationIdsWrapper;
  type storesCatalogV3Customization_universal_d_AddCustomizationChoicesRequest = AddCustomizationChoicesRequest;
  type storesCatalogV3Customization_universal_d_AddCustomizationChoicesResponse = AddCustomizationChoicesResponse;
  type storesCatalogV3Customization_universal_d_SetCustomizationChoicesRequest = SetCustomizationChoicesRequest;
  type storesCatalogV3Customization_universal_d_SetCustomizationChoicesResponse = SetCustomizationChoicesResponse;
  type storesCatalogV3Customization_universal_d_RemoveCustomizationChoicesRequest = RemoveCustomizationChoicesRequest;
  type storesCatalogV3Customization_universal_d_RemoveCustomizationChoicesResponse = RemoveCustomizationChoicesResponse;
  type storesCatalogV3Customization_universal_d_BulkAddCustomizationChoicesRequest = BulkAddCustomizationChoicesRequest;
  type storesCatalogV3Customization_universal_d_CustomizationChoices = CustomizationChoices;
  type storesCatalogV3Customization_universal_d_BulkAddCustomizationChoicesResponse = BulkAddCustomizationChoicesResponse;
  type storesCatalogV3Customization_universal_d_BulkUpdateCustomizationsRequest = BulkUpdateCustomizationsRequest;
  type storesCatalogV3Customization_universal_d_MaskedCustomization = MaskedCustomization;
  type storesCatalogV3Customization_universal_d_BulkUpdateCustomizationsResponse = BulkUpdateCustomizationsResponse;
  const storesCatalogV3Customization_universal_d_createCustomization: typeof createCustomization;
  const storesCatalogV3Customization_universal_d_getCustomization: typeof getCustomization;
  type storesCatalogV3Customization_universal_d_GetCustomizationOptions = GetCustomizationOptions;
  const storesCatalogV3Customization_universal_d_updateCustomization: typeof updateCustomization;
  type storesCatalogV3Customization_universal_d_UpdateCustomization = UpdateCustomization;
  type storesCatalogV3Customization_universal_d_UpdateCustomizationOptions = UpdateCustomizationOptions;
  const storesCatalogV3Customization_universal_d_deleteCustomization: typeof deleteCustomization;
  const storesCatalogV3Customization_universal_d_queryCustomizations: typeof queryCustomizations;
  type storesCatalogV3Customization_universal_d_QueryCustomizationsOptions = QueryCustomizationsOptions;
  type storesCatalogV3Customization_universal_d_CustomizationsQueryResult = CustomizationsQueryResult;
  type storesCatalogV3Customization_universal_d_CustomizationsQueryBuilder = CustomizationsQueryBuilder;
  const storesCatalogV3Customization_universal_d_bulkCreateCustomizations: typeof bulkCreateCustomizations;
  type storesCatalogV3Customization_universal_d_BulkCreateCustomizationsOptions = BulkCreateCustomizationsOptions;
  const storesCatalogV3Customization_universal_d_addCustomizationChoices: typeof addCustomizationChoices;
  type storesCatalogV3Customization_universal_d_AddCustomizationChoicesOptions = AddCustomizationChoicesOptions;
  const storesCatalogV3Customization_universal_d_setCustomizationChoices: typeof setCustomizationChoices;
  type storesCatalogV3Customization_universal_d_SetCustomizationChoicesOptions = SetCustomizationChoicesOptions;
  const storesCatalogV3Customization_universal_d_removeCustomizationChoices: typeof removeCustomizationChoices;
  type storesCatalogV3Customization_universal_d_RemoveCustomizationChoicesOptions = RemoveCustomizationChoicesOptions;
  const storesCatalogV3Customization_universal_d_bulkAddCustomizationChoices: typeof bulkAddCustomizationChoices;
  type storesCatalogV3Customization_universal_d_BulkAddCustomizationChoicesOptions = BulkAddCustomizationChoicesOptions;
  const storesCatalogV3Customization_universal_d_bulkUpdateCustomizations: typeof bulkUpdateCustomizations;
  type storesCatalogV3Customization_universal_d_BulkUpdateCustomizationsOptions = BulkUpdateCustomizationsOptions;
  namespace storesCatalogV3Customization_universal_d {
    export {
      storesCatalogV3Customization_universal_d_Customization as Customization,
      storesCatalogV3Customization_universal_d_CustomizationCustomizationSettingsOneOf as CustomizationCustomizationSettingsOneOf,
      storesCatalogV3Customization_universal_d_CustomizationType as CustomizationType,
      storesCatalogV3Customization_universal_d_CustomizationRenderType as CustomizationRenderType,
      FreeTextSettings$1 as FreeTextSettings,
      ChoicesSettings$1 as ChoicesSettings,
      storesCatalogV3Customization_universal_d_Choice as Choice,
      storesCatalogV3Customization_universal_d_ChoiceValueOneOf as ChoiceValueOneOf,
      ChoiceType$1 as ChoiceType,
      MultipleColors$1 as MultipleColors,
      storesCatalogV3Customization_universal_d_FocalPoint as FocalPoint,
      InvalidateCache$5 as InvalidateCache,
      InvalidateCacheGetByOneOf$5 as InvalidateCacheGetByOneOf,
      App$5 as App,
      Page$5 as Page,
      URI$5 as URI,
      File$5 as File,
      storesCatalogV3Customization_universal_d_CreateCustomizationRequest as CreateCustomizationRequest,
      storesCatalogV3Customization_universal_d_CreateCustomizationResponse as CreateCustomizationResponse,
      storesCatalogV3Customization_universal_d_GetCustomizationRequest as GetCustomizationRequest,
      RequestedFields$3 as RequestedFields,
      storesCatalogV3Customization_universal_d_GetCustomizationResponse as GetCustomizationResponse,
      storesCatalogV3Customization_universal_d_UpdateCustomizationRequest as UpdateCustomizationRequest,
      storesCatalogV3Customization_universal_d_UpdateCustomizationResponse as UpdateCustomizationResponse,
      storesCatalogV3Customization_universal_d_DeleteCustomizationRequest as DeleteCustomizationRequest,
      storesCatalogV3Customization_universal_d_DeleteCustomizationResponse as DeleteCustomizationResponse,
      storesCatalogV3Customization_universal_d_QueryCustomizationsRequest as QueryCustomizationsRequest,
      CursorQuery$4 as CursorQuery,
      CursorQueryPagingMethodOneOf$4 as CursorQueryPagingMethodOneOf,
      Sorting$5 as Sorting,
      SortOrder$5 as SortOrder,
      CursorPaging$5 as CursorPaging,
      storesCatalogV3Customization_universal_d_QueryCustomizationsResponse as QueryCustomizationsResponse,
      CursorPagingMetadata$5 as CursorPagingMetadata,
      Cursors$5 as Cursors,
      storesCatalogV3Customization_universal_d_BulkCreateCustomizationsRequest as BulkCreateCustomizationsRequest,
      storesCatalogV3Customization_universal_d_BulkCreateCustomizationsResponse as BulkCreateCustomizationsResponse,
      storesCatalogV3Customization_universal_d_BulkCustomizationResult as BulkCustomizationResult,
      ItemMetadata$4 as ItemMetadata,
      ApplicationError$4 as ApplicationError,
      BulkActionMetadata$4 as BulkActionMetadata,
      storesCatalogV3Customization_universal_d_CustomizationIdsWrapper as CustomizationIdsWrapper,
      storesCatalogV3Customization_universal_d_AddCustomizationChoicesRequest as AddCustomizationChoicesRequest,
      storesCatalogV3Customization_universal_d_AddCustomizationChoicesResponse as AddCustomizationChoicesResponse,
      storesCatalogV3Customization_universal_d_SetCustomizationChoicesRequest as SetCustomizationChoicesRequest,
      storesCatalogV3Customization_universal_d_SetCustomizationChoicesResponse as SetCustomizationChoicesResponse,
      storesCatalogV3Customization_universal_d_RemoveCustomizationChoicesRequest as RemoveCustomizationChoicesRequest,
      storesCatalogV3Customization_universal_d_RemoveCustomizationChoicesResponse as RemoveCustomizationChoicesResponse,
      storesCatalogV3Customization_universal_d_BulkAddCustomizationChoicesRequest as BulkAddCustomizationChoicesRequest,
      storesCatalogV3Customization_universal_d_CustomizationChoices as CustomizationChoices,
      storesCatalogV3Customization_universal_d_BulkAddCustomizationChoicesResponse as BulkAddCustomizationChoicesResponse,
      storesCatalogV3Customization_universal_d_BulkUpdateCustomizationsRequest as BulkUpdateCustomizationsRequest,
      storesCatalogV3Customization_universal_d_MaskedCustomization as MaskedCustomization,
      storesCatalogV3Customization_universal_d_BulkUpdateCustomizationsResponse as BulkUpdateCustomizationsResponse,
      DomainEvent$6 as DomainEvent,
      DomainEventBodyOneOf$6 as DomainEventBodyOneOf,
      EntityCreatedEvent$6 as EntityCreatedEvent,
      RestoreInfo$6 as RestoreInfo,
      EntityUpdatedEvent$6 as EntityUpdatedEvent,
      EntityDeletedEvent$6 as EntityDeletedEvent,
      ActionEvent$6 as ActionEvent,
      Empty$6 as Empty,
      MessageEnvelope$6 as MessageEnvelope,
      IdentificationData$6 as IdentificationData,
      IdentificationDataIdOneOf$6 as IdentificationDataIdOneOf,
      WebhookIdentityType$6 as WebhookIdentityType,
      storesCatalogV3Customization_universal_d_createCustomization as createCustomization,
      storesCatalogV3Customization_universal_d_getCustomization as getCustomization,
      storesCatalogV3Customization_universal_d_GetCustomizationOptions as GetCustomizationOptions,
      storesCatalogV3Customization_universal_d_updateCustomization as updateCustomization,
      storesCatalogV3Customization_universal_d_UpdateCustomization as UpdateCustomization,
      storesCatalogV3Customization_universal_d_UpdateCustomizationOptions as UpdateCustomizationOptions,
      storesCatalogV3Customization_universal_d_deleteCustomization as deleteCustomization,
      storesCatalogV3Customization_universal_d_queryCustomizations as queryCustomizations,
      storesCatalogV3Customization_universal_d_QueryCustomizationsOptions as QueryCustomizationsOptions,
      storesCatalogV3Customization_universal_d_CustomizationsQueryResult as CustomizationsQueryResult,
      storesCatalogV3Customization_universal_d_CustomizationsQueryBuilder as CustomizationsQueryBuilder,
      storesCatalogV3Customization_universal_d_bulkCreateCustomizations as bulkCreateCustomizations,
      storesCatalogV3Customization_universal_d_BulkCreateCustomizationsOptions as BulkCreateCustomizationsOptions,
      storesCatalogV3Customization_universal_d_addCustomizationChoices as addCustomizationChoices,
      storesCatalogV3Customization_universal_d_AddCustomizationChoicesOptions as AddCustomizationChoicesOptions,
      storesCatalogV3Customization_universal_d_setCustomizationChoices as setCustomizationChoices,
      storesCatalogV3Customization_universal_d_SetCustomizationChoicesOptions as SetCustomizationChoicesOptions,
      storesCatalogV3Customization_universal_d_removeCustomizationChoices as removeCustomizationChoices,
      storesCatalogV3Customization_universal_d_RemoveCustomizationChoicesOptions as RemoveCustomizationChoicesOptions,
      storesCatalogV3Customization_universal_d_bulkAddCustomizationChoices as bulkAddCustomizationChoices,
      storesCatalogV3Customization_universal_d_BulkAddCustomizationChoicesOptions as BulkAddCustomizationChoicesOptions,
      storesCatalogV3Customization_universal_d_bulkUpdateCustomizations as bulkUpdateCustomizations,
      storesCatalogV3Customization_universal_d_BulkUpdateCustomizationsOptions as BulkUpdateCustomizationsOptions,
    };
  }
  
  /**
   * An info section is a visible property of a product
   * Add info sections to a product to provide all the explanations your customers need.
   */
  interface InfoSection$1 {
      /**
       * Info section ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the info section is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the info section.
       *
       * Ignored when creating an info section.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the info section was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the info section was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Unique name. Used as an identifier. */
      uniqueName?: string;
      /** Info section title. */
      title?: string;
      /**
       * Info section description using rich content.
       *
       * <widget src="https://apps.wix.com/_serverless/ricos-playground-services/goto/api-component" plugins="indent.emoji.divider.codeBlock.file.gallery.giphy.image.table.link.textHighlight.textColor" exampleid="7dc9240e-d548-417a-abcf-0291b68b4303">
       * <a href="https://dev.wix.com/docs/ricos/api-reference/ricos-document">See Ricos document reference</a>
       * </widget>
       */
      description?: RichContent$1;
      /**
       * Info section description in HTML.
       *
       * When provided on create/update, this string must be a valid HTML. It will then be converted to rich content.
       * `plainDescription` is ignored when value is also passed to the `description` field.
       */
      plainDescription?: string | null;
      /**
       * Number of products this info section is assigned to.
       * > **Note:** Returned only when you pass `"ASSIGNED_PRODUCTS_COUNT"` to the `fields` array in Info Sections API requests.
       * @readonly
       */
      assignedProductsCount?: number | null;
  }
  interface RichContent$1 {
      /** Node objects representing a rich content document. */
      nodes?: Node$1[];
      /** Object metadata. */
      metadata?: Metadata$1;
      /** Global styling for header, paragraph, block quote, and code block nodes in the object. */
      documentStyle?: DocumentStyle$1;
  }
  interface Node$1 extends NodeDataOneOf$1 {
      /** Data for a button node. */
      buttonData?: ButtonData$1;
      /** Data for a code block node. */
      codeBlockData?: CodeBlockData$1;
      /** Data for a divider node. */
      dividerData?: DividerData$1;
      /** Data for a file node. */
      fileData?: FileData$1;
      /** Data for a gallery node. */
      galleryData?: GalleryData$1;
      /** Data for a GIF node. */
      gifData?: GIFData$1;
      /** Data for a heading node. */
      headingData?: HeadingData$1;
      /** Data for an embedded HTML node. */
      htmlData?: HTMLData$1;
      /** Data for an image node. */
      imageData?: ImageData$1;
      /** Data for a link preview node. */
      linkPreviewData?: LinkPreviewData$1;
      /** @deprecated */
      mapData?: MapData$1;
      /** Data for a paragraph node. */
      paragraphData?: ParagraphData$1;
      /** Data for a poll node. */
      pollData?: PollData$1;
      /** Data for a text node. Used to apply decorations to text. */
      textData?: TextData$1;
      /** Data for an app embed node. */
      appEmbedData?: AppEmbedData$1;
      /** Data for a video node. */
      videoData?: VideoData$1;
      /** Data for an oEmbed node. */
      embedData?: EmbedData$1;
      /** Data for a collapsible list node. */
      collapsibleListData?: CollapsibleListData$1;
      /** Data for a table node. */
      tableData?: TableData$1;
      /** Data for a table cell node. */
      tableCellData?: TableCellData$1;
      /** Data for a custom external node. */
      externalData?: Record<string, any> | null;
      /** Data for an audio node. */
      audioData?: AudioData$1;
      /** Data for an ordered list node. */
      orderedListData?: OrderedListData$1;
      /** Data for a bulleted list node. */
      bulletedListData?: BulletedListData$1;
      /** Data for a block quote node. */
      blockquoteData?: BlockquoteData$1;
      /** Data for a caption node. */
      captionData?: CaptionData$1;
      /** Node type. Use `APP_EMBED` for nodes that embed content from other Wix apps. Use `EMBED` to embed content in [oEmbed](https://oembed.com/) format. */
      type?: NodeType$1;
      /** Node ID. */
      _id?: string;
      /** A list of child nodes. */
      nodes?: Node$1[];
      /** Padding and background color styling for the node. */
      style?: NodeStyle$1;
  }
  /** @oneof */
  interface NodeDataOneOf$1 {
      /** Data for a button node. */
      buttonData?: ButtonData$1;
      /** Data for a code block node. */
      codeBlockData?: CodeBlockData$1;
      /** Data for a divider node. */
      dividerData?: DividerData$1;
      /** Data for a file node. */
      fileData?: FileData$1;
      /** Data for a gallery node. */
      galleryData?: GalleryData$1;
      /** Data for a GIF node. */
      gifData?: GIFData$1;
      /** Data for a heading node. */
      headingData?: HeadingData$1;
      /** Data for an embedded HTML node. */
      htmlData?: HTMLData$1;
      /** Data for an image node. */
      imageData?: ImageData$1;
      /** Data for a link preview node. */
      linkPreviewData?: LinkPreviewData$1;
      /** @deprecated */
      mapData?: MapData$1;
      /** Data for a paragraph node. */
      paragraphData?: ParagraphData$1;
      /** Data for a poll node. */
      pollData?: PollData$1;
      /** Data for a text node. Used to apply decorations to text. */
      textData?: TextData$1;
      /** Data for an app embed node. */
      appEmbedData?: AppEmbedData$1;
      /** Data for a video node. */
      videoData?: VideoData$1;
      /** Data for an oEmbed node. */
      embedData?: EmbedData$1;
      /** Data for a collapsible list node. */
      collapsibleListData?: CollapsibleListData$1;
      /** Data for a table node. */
      tableData?: TableData$1;
      /** Data for a table cell node. */
      tableCellData?: TableCellData$1;
      /** Data for a custom external node. */
      externalData?: Record<string, any> | null;
      /** Data for an audio node. */
      audioData?: AudioData$1;
      /** Data for an ordered list node. */
      orderedListData?: OrderedListData$1;
      /** Data for a bulleted list node. */
      bulletedListData?: BulletedListData$1;
      /** Data for a block quote node. */
      blockquoteData?: BlockquoteData$1;
      /** Data for a caption node. */
      captionData?: CaptionData$1;
  }
  enum NodeType$1 {
      PARAGRAPH = "PARAGRAPH",
      TEXT = "TEXT",
      HEADING = "HEADING",
      BULLETED_LIST = "BULLETED_LIST",
      ORDERED_LIST = "ORDERED_LIST",
      LIST_ITEM = "LIST_ITEM",
      BLOCKQUOTE = "BLOCKQUOTE",
      CODE_BLOCK = "CODE_BLOCK",
      VIDEO = "VIDEO",
      DIVIDER = "DIVIDER",
      FILE = "FILE",
      GALLERY = "GALLERY",
      GIF = "GIF",
      HTML = "HTML",
      IMAGE = "IMAGE",
      LINK_PREVIEW = "LINK_PREVIEW",
      /** @deprecated */
      MAP = "MAP",
      POLL = "POLL",
      APP_EMBED = "APP_EMBED",
      BUTTON = "BUTTON",
      COLLAPSIBLE_LIST = "COLLAPSIBLE_LIST",
      TABLE = "TABLE",
      EMBED = "EMBED",
      COLLAPSIBLE_ITEM = "COLLAPSIBLE_ITEM",
      COLLAPSIBLE_ITEM_TITLE = "COLLAPSIBLE_ITEM_TITLE",
      COLLAPSIBLE_ITEM_BODY = "COLLAPSIBLE_ITEM_BODY",
      TABLE_CELL = "TABLE_CELL",
      TABLE_ROW = "TABLE_ROW",
      EXTERNAL = "EXTERNAL",
      AUDIO = "AUDIO",
      CAPTION = "CAPTION"
  }
  interface NodeStyle$1 {
      /** The top padding value in pixels. */
      paddingTop?: string | null;
      /** The bottom padding value in pixels. */
      paddingBottom?: string | null;
      /** The background color as a hexadecimal value. */
      backgroundColor?: string | null;
  }
  interface ButtonData$1 {
      /** Styling for the button's container. */
      containerData?: PluginContainerData$1;
      /** The button type. */
      type?: Type$1;
      /** Styling for the button. */
      styles?: Styles$1;
      /** The text to display on the button. */
      text?: string | null;
      /** Button link details. */
      link?: Link$1;
  }
  interface Border$1 {
      /** Border width in pixels. */
      width?: number | null;
      /** Border radius in pixels. */
      radius?: number | null;
  }
  interface Colors$1 {
      /** The text color as a hexadecimal value. */
      text?: string | null;
      /** The border color as a hexadecimal value. */
      border?: string | null;
      /** The background color as a hexadecimal value. */
      background?: string | null;
  }
  interface PluginContainerData$1 {
      /** The width of the node when it's displayed. */
      width?: PluginContainerDataWidth$1;
      /** The node's alignment within its container. */
      alignment?: PluginContainerDataAlignment$1;
      /** Spoiler cover settings for the node. */
      spoiler?: Spoiler$1;
      /** The height of the node when it's displayed. */
      height?: Height$1;
      /** Sets whether text should wrap around this node when it's displayed. If `textWrap` is `false`, the node takes up the width of its container. Defaults to `true` for all node types except 'DIVIVDER' where it defaults to `false`. */
      textWrap?: boolean | null;
  }
  enum WidthType$1 {
      /** Width matches the content width */
      CONTENT = "CONTENT",
      /** Small Width */
      SMALL = "SMALL",
      /** Width will match the original asset width */
      ORIGINAL = "ORIGINAL",
      /** coast-to-coast display */
      FULL_WIDTH = "FULL_WIDTH"
  }
  interface PluginContainerDataWidth$1 extends PluginContainerDataWidthDataOneOf$1 {
      /**
       * One of the following predefined width options:
       * `CONTENT`: The width of the container matches the content width.
       * `SMALL`: A small width.
       * `ORIGINAL`: For `imageData` containers only. The width of the container matches the original image width.
       * `FULL_WIDTH`: For `imageData` containers only. The image container takes up the full width of the screen.
       */
      size?: WidthType$1;
      /** A custom width value in pixels. */
      custom?: string | null;
  }
  /** @oneof */
  interface PluginContainerDataWidthDataOneOf$1 {
      /**
       * One of the following predefined width options:
       * `CONTENT`: The width of the container matches the content width.
       * `SMALL`: A small width.
       * `ORIGINAL`: For `imageData` containers only. The width of the container matches the original image width.
       * `FULL_WIDTH`: For `imageData` containers only. The image container takes up the full width of the screen.
       */
      size?: WidthType$1;
      /** A custom width value in pixels. */
      custom?: string | null;
  }
  enum PluginContainerDataAlignment$1 {
      /** Center Alignment */
      CENTER = "CENTER",
      /** Left Alignment */
      LEFT = "LEFT",
      /** Right Alignment */
      RIGHT = "RIGHT"
  }
  interface Spoiler$1 {
      /** Sets whether the spoiler cover is enabled for this node. Defaults to `false`. */
      enabled?: boolean | null;
      /** The description displayed on top of the spoiler cover. */
      description?: string | null;
      /** The text for the button used to remove the spoiler cover. */
      buttonText?: string | null;
  }
  interface Height$1 {
      /** A custom height value in pixels. */
      custom?: string | null;
  }
  enum Type$1 {
      /** Regular link button */
      LINK = "LINK",
      /** Triggers custom action that is defined in plugin configuration by the consumer */
      ACTION = "ACTION"
  }
  interface Styles$1 {
      /** Border attributes. */
      border?: Border$1;
      /** Color attributes. */
      colors?: Colors$1;
  }
  interface Link$1 extends LinkDataOneOf$1 {
      /** The absolute URL for the linked document. */
      url?: string;
      /** The target node's ID. Used for linking to another node in this object. */
      anchor?: string;
      /**
       * he HTML `target` attribute value for the link. This property defines where the linked document opens as follows:
       * `SELF` - Default. Opens the linked document in the same frame as the link.
       * `BLANK` - Opens the linked document in a new browser tab or window.
       * `PARENT` - Opens the linked document in the link's parent frame.
       * `TOP` - Opens the linked document in the full body of the link's browser tab or window.
       */
      target?: Target$1;
      /** The HTML `rel` attribute value for the link. This object specifies the relationship between the current document and the linked document. */
      rel?: Rel$1;
      /** A serialized object used for a custom or external link panel. */
      customData?: string | null;
  }
  /** @oneof */
  interface LinkDataOneOf$1 {
      /** The absolute URL for the linked document. */
      url?: string;
      /** The target node's ID. Used for linking to another node in this object. */
      anchor?: string;
  }
  enum Target$1 {
      /** Opens the linked document in the same frame as it was clicked (this is default) */
      SELF = "SELF",
      /** Opens the linked document in a new window or tab */
      BLANK = "BLANK",
      /** Opens the linked document in the parent frame */
      PARENT = "PARENT",
      /** Opens the linked document in the full body of the window */
      TOP = "TOP"
  }
  interface Rel$1 {
      /** Indicates to search engine crawlers not to follow the link. Defaults to `false`. */
      nofollow?: boolean | null;
      /** Indicates to search engine crawlers that the link is a paid placement such as sponsored content or an advertisement. Defaults to `false`. */
      sponsored?: boolean | null;
      /** Indicates that this link is user-generated content and isn't necessarily trusted or endorsed by the page’s author. For example, a link in a fourm post. Defaults to `false`. */
      ugc?: boolean | null;
      /** Indicates that this link protect referral information from being passed to the target website. */
      noreferrer?: boolean | null;
  }
  interface CodeBlockData$1 {
      /** Styling for the code block's text. */
      textStyle?: TextStyle$1;
  }
  interface TextStyle$1 {
      /** Text alignment. Defaults to `AUTO`. */
      textAlignment?: TextAlignment$1;
      /** A CSS `line-height` value for the text expressed as a ratio relative to the font size. For example, if the font size is 20px, a `lineHeight` value of `'1.5'`` results in a line height of 30px. */
      lineHeight?: string | null;
  }
  enum TextAlignment$1 {
      /** browser default, eqivalent to `initial` */
      AUTO = "AUTO",
      /** Left align */
      LEFT = "LEFT",
      /** Right align */
      RIGHT = "RIGHT",
      /** Center align */
      CENTER = "CENTER",
      /** Text is spaced to line up its left and right edges to the left and right edges of the line box, except for the last line */
      JUSTIFY = "JUSTIFY"
  }
  interface DividerData$1 {
      /** Styling for the divider's container. */
      containerData?: PluginContainerData$1;
      /** Divider line style. */
      lineStyle?: LineStyle$1;
      /** Divider width. */
      width?: Width$1;
      /** Divider alignment. */
      alignment?: Alignment$1;
  }
  enum LineStyle$1 {
      /** Single Line */
      SINGLE = "SINGLE",
      /** Double Line */
      DOUBLE = "DOUBLE",
      /** Dashed Line */
      DASHED = "DASHED",
      /** Dotted Line */
      DOTTED = "DOTTED"
  }
  enum Width$1 {
      /** Large line */
      LARGE = "LARGE",
      /** Medium line */
      MEDIUM = "MEDIUM",
      /** Small line */
      SMALL = "SMALL"
  }
  enum Alignment$1 {
      /** Center alignment */
      CENTER = "CENTER",
      /** Left alignment */
      LEFT = "LEFT",
      /** Right alignment */
      RIGHT = "RIGHT"
  }
  interface FileData$1 {
      /** Styling for the file's container. */
      containerData?: PluginContainerData$1;
      /** The source for the file's data. */
      src?: FileSource$1;
      /** File name. */
      name?: string | null;
      /** File type. */
      type?: string | null;
      /**
       * Use `sizeInKb` instead.
       * @deprecated
       */
      size?: number | null;
      /** Settings for PDF files. */
      pdfSettings?: PDFSettings$1;
      /** File MIME type. */
      mimeType?: string | null;
      /** File path. */
      path?: string | null;
      /** File size in KB. */
      sizeInKb?: string | null;
  }
  enum ViewMode$1 {
      /** No PDF view */
      NONE = "NONE",
      /** Full PDF view */
      FULL = "FULL",
      /** Mini PDF view */
      MINI = "MINI"
  }
  interface FileSource$1 extends FileSourceDataOneOf$1 {
      /** The absolute URL for the file's source. */
      url?: string | null;
      /**
       * Custom ID. Use `id` instead.
       * @deprecated
       */
      custom?: string | null;
      /** An ID that's resolved to a URL by a resolver function. */
      _id?: string | null;
      /** Indicates whether the file's source is private. Defaults to `false`. */
      private?: boolean | null;
  }
  /** @oneof */
  interface FileSourceDataOneOf$1 {
      /** The absolute URL for the file's source. */
      url?: string | null;
      /**
       * Custom ID. Use `id` instead.
       * @deprecated
       */
      custom?: string | null;
      /** An ID that's resolved to a URL by a resolver function. */
      _id?: string | null;
  }
  interface PDFSettings$1 {
      /**
       * PDF view mode. One of the following:
       * `NONE` : The PDF isn't displayed.
       * `FULL` : A full page view of the PDF is displayed.
       * `MINI` : A mini view of the PDF is displayed.
       */
      viewMode?: ViewMode$1;
      /** Sets whether the PDF download button is disabled. Defaults to `false`. */
      disableDownload?: boolean | null;
      /** Sets whether the PDF print button is disabled. Defaults to `false`. */
      disablePrint?: boolean | null;
  }
  interface GalleryData$1 {
      /** Styling for the gallery's container. */
      containerData?: PluginContainerData$1;
      /** The items in the gallery. */
      items?: Item$1[];
      /** Options for defining the gallery's appearance. */
      options?: GalleryOptions$1;
      /** Sets whether the gallery's expand button is disabled. Defaults to `false`. */
      disableExpand?: boolean | null;
      /** Sets whether the gallery's download button is disabled. Defaults to `false`. */
      disableDownload?: boolean | null;
  }
  interface Media$1 {
      /** The source for the media's data. */
      src?: FileSource$1;
      /** Media width in pixels. */
      width?: number | null;
      /** Media height in pixels. */
      height?: number | null;
      /** Media duration in seconds. Only relevant for audio and video files. */
      duration?: number | null;
  }
  interface Image$1 {
      /** Image file details. */
      media?: Media$1;
      /** Link details for images that are links. */
      link?: Link$1;
  }
  interface Video$1 {
      /** Video file details. */
      media?: Media$1;
      /** Video thumbnail file details. */
      thumbnail?: Media$1;
  }
  interface Item$1 extends ItemDataOneOf$1 {
      /** An image item. */
      image?: Image$1;
      /** A video item. */
      video?: Video$1;
      /** Item title. */
      title?: string | null;
      /** Item's alternative text. */
      altText?: string | null;
  }
  /** @oneof */
  interface ItemDataOneOf$1 {
      /** An image item. */
      image?: Image$1;
      /** A video item. */
      video?: Video$1;
  }
  interface GalleryOptions$1 {
      /** Gallery layout. */
      layout?: Layout$1;
      /** Styling for gallery items. */
      item?: ItemStyle$1;
      /** Styling for gallery thumbnail images. */
      thumbnails?: Thumbnails$1;
  }
  enum LayoutType$1 {
      /** Collage type */
      COLLAGE = "COLLAGE",
      /** Masonry type */
      MASONRY = "MASONRY",
      /** Grid type */
      GRID = "GRID",
      /** Thumbnail type */
      THUMBNAIL = "THUMBNAIL",
      /** Slider type */
      SLIDER = "SLIDER",
      /** Slideshow type */
      SLIDESHOW = "SLIDESHOW",
      /** Panorama type */
      PANORAMA = "PANORAMA",
      /** Column type */
      COLUMN = "COLUMN",
      /** Magic type */
      MAGIC = "MAGIC",
      /** Fullsize images type */
      FULLSIZE = "FULLSIZE"
  }
  enum Orientation$1 {
      /** Rows Orientation */
      ROWS = "ROWS",
      /** Columns Orientation */
      COLUMNS = "COLUMNS"
  }
  enum Crop$1 {
      /** Crop to fill */
      FILL = "FILL",
      /** Crop to fit */
      FIT = "FIT"
  }
  enum ThumbnailsAlignment$1 {
      /** Top alignment */
      TOP = "TOP",
      /** Right alignment */
      RIGHT = "RIGHT",
      /** Bottom alignment */
      BOTTOM = "BOTTOM",
      /** Left alignment */
      LEFT = "LEFT",
      /** No thumbnail */
      NONE = "NONE"
  }
  interface Layout$1 {
      /** Gallery layout type. */
      type?: LayoutType$1;
      /** Sets whether horizontal scroll is enabled. Defaults to `true` unless the layout `type` is set to `GRID` or `COLLAGE`. */
      horizontalScroll?: boolean | null;
      /** Gallery orientation. */
      orientation?: Orientation$1;
      /** The number of columns to display on full size screens. */
      numberOfColumns?: number | null;
      /** The number of columns to display on mobile screens. */
      mobileNumberOfColumns?: number | null;
  }
  interface ItemStyle$1 {
      /** Desirable dimension for each item in pixels (behvaior changes according to gallery type) */
      targetSize?: number | null;
      /** Item ratio */
      ratio?: number | null;
      /** Sets how item images are cropped. */
      crop?: Crop$1;
      /** The spacing between items in pixels. */
      spacing?: number | null;
  }
  interface Thumbnails$1 {
      /** Thumbnail alignment. */
      placement?: ThumbnailsAlignment$1;
      /** Spacing between thumbnails in pixels. */
      spacing?: number | null;
  }
  interface GIFData$1 {
      /** Styling for the GIF's container. */
      containerData?: PluginContainerData$1;
      /** The source of the full size GIF. */
      original?: GIF$1;
      /** The source of the downsized GIF. */
      downsized?: GIF$1;
      /** Height in pixels. */
      height?: number;
      /** Width in pixels. */
      width?: number;
  }
  interface GIF$1 {
      /** GIF format URL. */
      gif?: string | null;
      /** MP4 format URL. */
      mp4?: string | null;
      /** Thumbnail URL. */
      still?: string | null;
  }
  interface HeadingData$1 {
      /** Heading level from 1-6. */
      level?: number;
      /** Styling for the heading text. */
      textStyle?: TextStyle$1;
      /** Indentation level from 1-4. */
      indentation?: number | null;
  }
  interface HTMLData$1 extends HTMLDataDataOneOf$1 {
      /** The URL for the HTML code for the node. */
      url?: string;
      /** The HTML code for the node. */
      html?: string;
      /**
       * Whether this is an AdSense element. Use `source` instead.
       * @deprecated
       */
      isAdsense?: boolean | null;
      /** Styling for the HTML node's container. */
      containerData?: PluginContainerData$1;
      /** The type of HTML code. */
      source?: Source$1;
  }
  /** @oneof */
  interface HTMLDataDataOneOf$1 {
      /** The URL for the HTML code for the node. */
      url?: string;
      /** The HTML code for the node. */
      html?: string;
      /**
       * Whether this is an AdSense element. Use `source` instead.
       * @deprecated
       */
      isAdsense?: boolean | null;
  }
  enum Source$1 {
      HTML = "HTML",
      ADSENSE = "ADSENSE"
  }
  interface ImageData$1 {
      /** Styling for the image's container. */
      containerData?: PluginContainerData$1;
      /** Image file details. */
      image?: Media$1;
      /** Link details for images that are links. */
      link?: Link$1;
      /** Sets whether the image expands to full screen when clicked. Defaults to `false`. */
      disableExpand?: boolean | null;
      /** Image's alternative text. */
      altText?: string | null;
      /**
       * Deprecated: use Caption node instead.
       * @deprecated
       */
      caption?: string | null;
      /** Sets whether the image's download button is disabled. Defaults to `false`. */
      disableDownload?: boolean | null;
  }
  interface LinkPreviewData$1 {
      /** Styling for the link preview's container. */
      containerData?: PluginContainerData$1;
      /** Link details. */
      link?: Link$1;
      /** Preview title. */
      title?: string | null;
      /** Preview thumbnail URL. */
      thumbnailUrl?: string | null;
      /** Preview description. */
      description?: string | null;
      /** The preview content as HTML. */
      html?: string | null;
  }
  interface MapData$1 {
      /** Styling for the map's container. */
      containerData?: PluginContainerData$1;
      /** Map settings. */
      mapSettings?: MapSettings$1;
  }
  interface MapSettings$1 {
      /** The address to display on the map. */
      address?: string | null;
      /** Sets whether the map is draggable. */
      draggable?: boolean | null;
      /** Sets whether the location marker is visible. */
      marker?: boolean | null;
      /** Sets whether street view control is enabled. */
      streetViewControl?: boolean | null;
      /** Sets whether zoom control is enabled. */
      zoomControl?: boolean | null;
      /** Location latitude. */
      lat?: number | null;
      /** Location longitude. */
      lng?: number | null;
      /** Location name. */
      locationName?: string | null;
      /** Sets whether view mode control is enabled. */
      viewModeControl?: boolean | null;
      /** Initial zoom value. */
      initialZoom?: number | null;
      /** Map type. `HYBRID` is a combination of the `ROADMAP` and `SATELLITE` map types. */
      mapType?: MapType$1;
  }
  enum MapType$1 {
      /** Roadmap map type */
      ROADMAP = "ROADMAP",
      /** Satellite map type */
      SATELITE = "SATELITE",
      /** Hybrid map type */
      HYBRID = "HYBRID",
      /** Terrain map type */
      TERRAIN = "TERRAIN"
  }
  interface ParagraphData$1 {
      /** Styling for the paragraph text. */
      textStyle?: TextStyle$1;
      /** Indentation level from 1-4. */
      indentation?: number | null;
      /** Paragraph level */
      level?: number | null;
  }
  interface PollData$1 {
      /** Styling for the poll's container. */
      containerData?: PluginContainerData$1;
      /** Poll data. */
      poll?: Poll$1;
      /** Layout settings for the poll and voting options. */
      layout?: PollDataLayout$1;
      /** Styling for the poll and voting options. */
      design?: Design$1;
  }
  enum ViewRole$1 {
      /** Only Poll creator can view the results */
      CREATOR = "CREATOR",
      /** Anyone who voted can see the results */
      VOTERS = "VOTERS",
      /** Anyone can see the results, even if one didn't vote */
      EVERYONE = "EVERYONE"
  }
  enum VoteRole$1 {
      /** Logged in member */
      SITE_MEMBERS = "SITE_MEMBERS",
      /** Anyone */
      ALL = "ALL"
  }
  interface Permissions$1 {
      /** Sets who can view the poll results. */
      view?: ViewRole$1;
      /** Sets who can vote. */
      vote?: VoteRole$1;
      /** Sets whether one voter can vote multiple times. Defaults to `false`. */
      allowMultipleVotes?: boolean | null;
  }
  interface Option$1 {
      /** Option ID. */
      _id?: string | null;
      /** Option title. */
      title?: string | null;
      /** The image displayed with the option. */
      image?: Media$1;
  }
  interface Settings$1 {
      /** Permissions settings for voting. */
      permissions?: Permissions$1;
      /** Sets whether voters are displayed in the vote results. Defaults to `true`. */
      showVoters?: boolean | null;
      /** Sets whether the vote count is displayed. Defaults to `true`. */
      showVotesCount?: boolean | null;
  }
  enum PollLayoutType$1 {
      /** List */
      LIST = "LIST",
      /** Grid */
      GRID = "GRID"
  }
  enum PollLayoutDirection$1 {
      /** Left-to-right */
      LTR = "LTR",
      /** Right-to-left */
      RTL = "RTL"
  }
  interface PollLayout$1 {
      /** The layout for displaying the voting options. */
      type?: PollLayoutType$1;
      /** The direction of the text displayed in the voting options. Text can be displayed either right-to-left or left-to-right. */
      direction?: PollLayoutDirection$1;
      /** Sets whether to display the main poll image. Defaults to `false`. */
      enableImage?: boolean | null;
  }
  interface OptionLayout$1 {
      /** Sets whether to display option images. Defaults to `false`. */
      enableImage?: boolean | null;
  }
  enum BackgroundType$1 {
      /** Color background type */
      COLOR = "COLOR",
      /** Image background type */
      IMAGE = "IMAGE",
      /** Gradiant background type */
      GRADIENT = "GRADIENT"
  }
  interface Gradient$1 {
      /** The gradient angle in degrees. */
      angle?: number | null;
      /** The start color as a hexademical value. */
      startColor?: string | null;
      /** The end color as a hexademical value. */
      lastColor?: string | null;
  }
  interface Background$1 extends BackgroundBackgroundOneOf$1 {
      /** The background color as a hexademical value. */
      color?: string | null;
      /** An image to use for the background. */
      image?: Media$1;
      /** Details for a gradient background. */
      gradient?: Gradient$1;
      /** Background type. For each option, include the relevant details. */
      type?: BackgroundType$1;
  }
  /** @oneof */
  interface BackgroundBackgroundOneOf$1 {
      /** The background color as a hexademical value. */
      color?: string | null;
      /** An image to use for the background. */
      image?: Media$1;
      /** Details for a gradient background. */
      gradient?: Gradient$1;
  }
  interface PollDesign$1 {
      /** Background styling. */
      background?: Background$1;
      /** Border radius in pixels. */
      borderRadius?: number | null;
  }
  interface OptionDesign$1 {
      /** Border radius in pixels. */
      borderRadius?: number | null;
  }
  interface Poll$1 {
      /** Poll ID. */
      _id?: string | null;
      /** Poll title. */
      title?: string | null;
      /** Poll creator ID. */
      creatorId?: string | null;
      /** Main poll image. */
      image?: Media$1;
      /** Voting options. */
      options?: Option$1[];
      /** The poll's permissions and display settings. */
      settings?: Settings$1;
  }
  interface PollDataLayout$1 {
      /** Poll layout settings. */
      poll?: PollLayout$1;
      /** Voting otpions layout settings. */
      options?: OptionLayout$1;
  }
  interface Design$1 {
      /** Styling for the poll. */
      poll?: PollDesign$1;
      /** Styling for voting options. */
      options?: OptionDesign$1;
  }
  interface TextData$1 {
      /** The text to apply decorations to. */
      text?: string;
      /** The decorations to apply. */
      decorations?: Decoration$1[];
  }
  /** Adds appearence changes to text */
  interface Decoration$1 extends DecorationDataOneOf$1 {
      /** Data for an anchor link decoration. */
      anchorData?: AnchorData$1;
      /** Data for a color decoration. */
      colorData?: ColorData$1;
      /** Data for an external link decoration. */
      linkData?: LinkData$1;
      /** Data for a mention decoration. */
      mentionData?: MentionData$1;
      /** Data for a font size decoration. */
      fontSizeData?: FontSizeData$1;
      /** Font weight for a bold decoration. */
      fontWeightValue?: number | null;
      /** Data for an italic decoration. Defaults to `true`. */
      italicData?: boolean | null;
      /** Data for an underline decoration. Defaults to `true`. */
      underlineData?: boolean | null;
      /** Data for a spoiler decoration. */
      spoilerData?: SpoilerData$1;
      /** The type of decoration to apply. */
      type?: DecorationType$1;
  }
  /** @oneof */
  interface DecorationDataOneOf$1 {
      /** Data for an anchor link decoration. */
      anchorData?: AnchorData$1;
      /** Data for a color decoration. */
      colorData?: ColorData$1;
      /** Data for an external link decoration. */
      linkData?: LinkData$1;
      /** Data for a mention decoration. */
      mentionData?: MentionData$1;
      /** Data for a font size decoration. */
      fontSizeData?: FontSizeData$1;
      /** Font weight for a bold decoration. */
      fontWeightValue?: number | null;
      /** Data for an italic decoration. Defaults to `true`. */
      italicData?: boolean | null;
      /** Data for an underline decoration. Defaults to `true`. */
      underlineData?: boolean | null;
      /** Data for a spoiler decoration. */
      spoilerData?: SpoilerData$1;
  }
  enum DecorationType$1 {
      BOLD = "BOLD",
      ITALIC = "ITALIC",
      UNDERLINE = "UNDERLINE",
      SPOILER = "SPOILER",
      ANCHOR = "ANCHOR",
      MENTION = "MENTION",
      LINK = "LINK",
      COLOR = "COLOR",
      FONT_SIZE = "FONT_SIZE",
      EXTERNAL = "EXTERNAL"
  }
  interface AnchorData$1 {
      /** The target node's ID. */
      anchor?: string;
  }
  interface ColorData$1 {
      /** The text's background color as a hexadecimal value. */
      background?: string | null;
      /** The text's foreground color as a hexadecimal value. */
      foreground?: string | null;
  }
  interface LinkData$1 {
      /** Link details. */
      link?: Link$1;
  }
  interface MentionData$1 {
      /** The mentioned user's name. */
      name?: string;
      /** The version of the user's name that appears after the `@` character in the mention. */
      slug?: string;
      /** Mentioned user's ID. */
      _id?: string | null;
  }
  interface FontSizeData$1 {
      /** The units used for the font size. */
      unit?: FontType$1;
      /** Font size value. */
      value?: number | null;
  }
  enum FontType$1 {
      PX = "PX",
      EM = "EM"
  }
  interface SpoilerData$1 {
      /** Spoiler ID. */
      _id?: string | null;
  }
  interface AppEmbedData$1 extends AppEmbedDataAppDataOneOf$1 {
      /** Data for embedded Wix Bookings content. */
      bookingData?: BookingData$1;
      /** Data for embedded Wix Events content. */
      eventData?: EventData$1;
      /** The type of Wix App content being embedded. */
      type?: AppType$1;
      /** The ID of the embedded content. */
      itemId?: string | null;
      /** The name of the embedded content. */
      name?: string | null;
      /**
       * Deprecated: Use `image` instead.
       * @deprecated
       */
      imageSrc?: string | null;
      /** The URL for the embedded content. */
      url?: string | null;
      /** An image for the embedded content. */
      image?: Media$1;
  }
  /** @oneof */
  interface AppEmbedDataAppDataOneOf$1 {
      /** Data for embedded Wix Bookings content. */
      bookingData?: BookingData$1;
      /** Data for embedded Wix Events content. */
      eventData?: EventData$1;
  }
  enum AppType$1 {
      PRODUCT = "PRODUCT",
      EVENT = "EVENT",
      BOOKING = "BOOKING"
  }
  interface BookingData$1 {
      /** Booking duration in minutes. */
      durations?: string | null;
  }
  interface EventData$1 {
      /** Event schedule. */
      scheduling?: string | null;
      /** Event location. */
      location?: string | null;
  }
  interface VideoData$1 {
      /** Styling for the video's container. */
      containerData?: PluginContainerData$1;
      /** Video details. */
      video?: Media$1;
      /** Video thumbnail details. */
      thumbnail?: Media$1;
      /** Sets whether the video's download button is disabled. Defaults to `false`. */
      disableDownload?: boolean | null;
      /** Video title. */
      title?: string | null;
      /** Video options. */
      options?: PlaybackOptions$1;
  }
  interface PlaybackOptions$1 {
      /** Sets whether the media will automatically start playing. */
      autoPlay?: boolean | null;
      /** Sets whether media's will be looped. */
      playInLoop?: boolean | null;
      /** Sets whether media's controls will be shown. */
      showControls?: boolean | null;
  }
  interface EmbedData$1 {
      /** Styling for the oEmbed node's container. */
      containerData?: PluginContainerData$1;
      /** An [oEmbed](https://www.oembed.com) object. */
      oembed?: Oembed$1;
      /** Origin asset source. */
      src?: string | null;
  }
  interface Oembed$1 {
      /** The resource type. */
      type?: string | null;
      /** The width of the resource specified in the `url` property in pixels. */
      width?: number | null;
      /** The height of the resource specified in the `url` property in pixels. */
      height?: number | null;
      /** Resource title. */
      title?: string | null;
      /** The source URL for the resource. */
      url?: string | null;
      /** HTML for embedding a video player. The HTML should have no padding or margins. */
      html?: string | null;
      /** The name of the author or owner of the resource. */
      authorName?: string | null;
      /** The URL for the author or owner of the resource. */
      authorUrl?: string | null;
      /** The name of the resource provider. */
      providerName?: string | null;
      /** The URL for the resource provider. */
      providerUrl?: string | null;
      /** The URL for a thumbnail image for the resource. If this property is defined, `thumbnailWidth` and `thumbnailHeight` must also be defined. */
      thumbnailUrl?: string | null;
      /** The width of the resource's thumbnail image. If this property is defined, `thumbnailUrl` and `thumbnailHeight` must also be defined. */
      thumbnailWidth?: string | null;
      /** The height of the resource's thumbnail image. If this property is defined, `thumbnailUrl` and `thumbnailWidth`must also be defined. */
      thumbnailHeight?: string | null;
      /** The URL for an embedded viedo. */
      videoUrl?: string | null;
      /** The oEmbed version number.  This value must be `1.0`. */
      version?: string | null;
  }
  interface CollapsibleListData$1 {
      /** Styling for the collapsible list's container. */
      containerData?: PluginContainerData$1;
      /** If `true`, only one item can be expanded at a time. Defaults to `false`. */
      expandOnlyOne?: boolean | null;
      /** Sets which items are expanded when the page loads. */
      initialExpandedItems?: InitialExpandedItems$1;
      /** The direction of the text in the list. Either left-to-right or right-to-left. */
      direction?: Direction$1;
      /** If `true`, The collapsible item will appear in search results as an FAQ. */
      isQapageData?: boolean | null;
  }
  enum InitialExpandedItems$1 {
      /** First item will be expended initally */
      FIRST = "FIRST",
      /** All items will expended initally */
      ALL = "ALL",
      /** All items collapsed initally */
      NONE = "NONE"
  }
  enum Direction$1 {
      /** Left-to-right */
      LTR = "LTR",
      /** Right-to-left */
      RTL = "RTL"
  }
  interface TableData$1 {
      /** Styling for the table's container. */
      containerData?: PluginContainerData$1;
      /** The table's dimensions. */
      dimensions?: Dimensions$1;
      /**
       * Deprecated: Use `rowHeader` and `columnHeader` instead.
       * @deprecated
       */
      header?: boolean | null;
      /** Sets whether the table's first row is a header. Defaults to `false`. */
      rowHeader?: boolean | null;
      /** Sets whether the table's first column is a header. Defaults to `false`. */
      columnHeader?: boolean | null;
  }
  interface Dimensions$1 {
      /** An array representing relative width of each column in relation to the other columns. */
      colsWidthRatio?: number[];
      /** An array representing the height of each row in pixels. */
      rowsHeight?: number[];
      /** An array representing the minimum width of each column in pixels. */
      colsMinWidth?: number[];
  }
  interface TableCellData$1 {
      /** Styling for the cell's background color and text alignment. */
      cellStyle?: CellStyle$1;
      /** The cell's border colors. */
      borderColors?: BorderColors$1;
  }
  enum VerticalAlignment$1 {
      /** Top alignment */
      TOP = "TOP",
      /** Middle alignment */
      MIDDLE = "MIDDLE",
      /** Bottom alignment */
      BOTTOM = "BOTTOM"
  }
  interface CellStyle$1 {
      /** Vertical alignment for the cell's text. */
      verticalAlignment?: VerticalAlignment$1;
      /** Cell background color as a hexadecimal value. */
      backgroundColor?: string | null;
  }
  interface BorderColors$1 {
      /** Left border color as a hexadecimal value. */
      left?: string | null;
      /** Right border color as a hexadecimal value. */
      right?: string | null;
      /** Top border color as a hexadecimal value. */
      top?: string | null;
      /** Bottom border color as a hexadecimal value. */
      bottom?: string | null;
  }
  /**
   * `NullValue` is a singleton enumeration to represent the null value for the
   * `Value` type union.
   *
   * The JSON representation for `NullValue` is JSON `null`.
   */
  enum NullValue$1 {
      /** Null value. */
      NULL_VALUE = "NULL_VALUE"
  }
  /**
   * `ListValue` is a wrapper around a repeated field of values.
   *
   * The JSON representation for `ListValue` is JSON array.
   */
  interface ListValue$1 {
      /** Repeated field of dynamically typed values. */
      values?: any[];
  }
  interface AudioData$1 {
      /** Styling for the audio node's container. */
      containerData?: PluginContainerData$1;
      /** Audio file details. */
      audio?: Media$1;
      /** Sets whether the audio node's download button is disabled. Defaults to `false`. */
      disableDownload?: boolean | null;
      /** Cover image. */
      coverImage?: Media$1;
      /** Track name. */
      name?: string | null;
      /** Author name. */
      authorName?: string | null;
      /** An HTML version of the audio node. */
      html?: string | null;
  }
  interface OrderedListData$1 {
      /** Indentation level from 0-4. */
      indentation?: number;
      /** Offset level from 0-4. */
      offset?: number | null;
      /** List start number. */
      start?: number | null;
  }
  interface BulletedListData$1 {
      /** Indentation level from 0-4. */
      indentation?: number;
      /** Offset level from 0-4. */
      offset?: number | null;
  }
  interface BlockquoteData$1 {
      /** Indentation level from 1-4. */
      indentation?: number;
  }
  interface CaptionData$1 {
      textStyle?: TextStyle$1;
  }
  interface Metadata$1 {
      /** Schema version. */
      version?: number;
      /**
       * When the object was created.
       * @readonly
       * @deprecated
       */
      createdTimestamp?: Date | null;
      /**
       * When the object was most recently updated.
       * @deprecated
       */
      updatedTimestamp?: Date | null;
      /** Object ID. */
      _id?: string | null;
  }
  interface DocumentStyle$1 {
      /** Styling for H1 nodes. */
      headerOne?: TextNodeStyle$1;
      /** Styling for H2 nodes. */
      headerTwo?: TextNodeStyle$1;
      /** Styling for H3 nodes. */
      headerThree?: TextNodeStyle$1;
      /** Styling for H4 nodes. */
      headerFour?: TextNodeStyle$1;
      /** Styling for H5 nodes. */
      headerFive?: TextNodeStyle$1;
      /** Styling for H6 nodes. */
      headerSix?: TextNodeStyle$1;
      /** Styling for paragraph nodes. */
      paragraph?: TextNodeStyle$1;
      /** Styling for block quote nodes. */
      blockquote?: TextNodeStyle$1;
      /** Styling for code block nodes. */
      codeBlock?: TextNodeStyle$1;
  }
  interface TextNodeStyle$1 {
      /** The decorations to apply to the node. */
      decorations?: Decoration$1[];
      /** Padding and background color for the node. */
      nodeStyle?: NodeStyle$1;
      /** Line height for text in the node. */
      lineHeight?: string | null;
  }
  interface InvalidateCache$4 extends InvalidateCacheGetByOneOf$4 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$4;
      /** Invalidate by page id */
      page?: Page$4;
      /** Invalidate by URI path */
      uri?: URI$4;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$4;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf$4 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$4;
      /** Invalidate by page id */
      page?: Page$4;
      /** Invalidate by URI path */
      uri?: URI$4;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$4;
  }
  interface App$4 {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page$4 {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI$4 {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File$4 {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface CreateInfoSectionRequest {
      /** Info section to create. */
      infoSection: InfoSection$1;
  }
  interface CreateInfoSectionResponse {
      /** Created info section. */
      infoSection?: InfoSection$1;
  }
  interface GetInfoSectionRequest {
      /** Info section ID. */
      infoSectionId: string;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$2[];
  }
  enum RequestedFields$2 {
      UNKNOWN_REQUESTED_FIELD = "UNKNOWN_REQUESTED_FIELD",
      ASSIGNED_PRODUCTS_COUNT = "ASSIGNED_PRODUCTS_COUNT"
  }
  interface GetInfoSectionResponse {
      /** Info section. */
      infoSection?: InfoSection$1;
  }
  interface GetOrCreateInfoSectionRequest {
      /** Info section to retrieve or create. */
      infoSection?: InfoSectionForGetOrCreate;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$2[];
  }
  interface InfoSectionForGetOrCreate {
      /**
       * Info section ID.
       * Pass an ID to retrieve an existing info section.
       */
      _id?: string | null;
      /**
       * Info section unique name.
       *
       * > **Note:**
       * > + Pass the `uniqueName` of an existing info section to return it.
       * > + If no such info section exists - pass `uniqueName` and `title` to create an info section.
       */
      uniqueName?: string | null;
      /**
       * Info section title.
       *
       * Required when passing `uniqueName` to create a new info section.
       */
      title?: string | null;
      /**
       * Info section description using rich content.
       *
       * Learn more about [Working with Rich Content](https://dev.wix.com/docs/go-headless/tutorials-templates/other-tutorials/working-with-rich-content).
       */
      description?: RichContent$1;
      /**
       * Info section description in HTML.
       *
       * When provided on create/update, this string must be a valid HTML. It will then be converted to rich content.
       * `plainDescription` is ignored when value is also passed to the `description` field.
       */
      plainDescription?: string | null;
  }
  interface GetOrCreateInfoSectionResponse {
      /** Info section. */
      infoSection?: InfoSection$1;
  }
  interface BulkGetOrCreateInfoSectionsRequest {
      /** Info sections to retrieve or create. */
      infoSections?: InfoSectionForGetOrCreate[];
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$2[];
  }
  interface BulkGetOrCreateInfoSectionsResponse {
      /** Info sections retrieved or created by bulk action. */
      results?: BulkInfoSectionItemResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$3;
  }
  interface BulkInfoSectionItemResult {
      /** Bulk action metadata for inventory item. */
      itemMetadata?: ItemMetadata$3;
      /**
       * Full inventory item entity.
       *
       * Returned only if `returnEntity: true` is passed in the request.
       */
      item?: InfoSection$1;
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
  interface UpdateInfoSectionRequest {
      /** Info section to update. */
      infoSection: InfoSection$1;
      /**
       * Explicit list of fields to update
       * @internal
       */
      fieldMask?: string[];
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$2[];
  }
  interface UpdateInfoSectionResponse {
      /** Updated info section. */
      infoSection?: InfoSection$1;
  }
  interface DeleteInfoSectionRequest {
      /** Info section ID */
      infoSectionId: string;
  }
  interface DeleteInfoSectionResponse {
  }
  interface QueryInfoSectionsRequest {
      /** Query options. */
      query?: CursorQuery$3;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$2[];
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
      sort?: Sorting$4[];
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
  interface QueryInfoSectionsResponse {
      /** List of info sections. */
      infoSections?: InfoSection$1[];
      /** Details on the paged set of results returned. */
      pagingMetadata?: CursorPagingMetadata$4;
  }
  interface CursorPagingMetadata$4 {
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
  interface BulkCreateInfoSectionsRequest {
      /** Info sections to create. */
      infoSections: InfoSection$1[];
      /**
       * Whether to return the full created info section entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
  }
  interface BulkCreateInfoSectionsResponse {
      /** Info sections created by bulk action. */
      results?: BulkInfoSectionItemResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$3;
  }
  interface BulkUpdateInfoSectionsRequest {
      /** List of info sections to update. */
      infoSections: MaskedInfoSection[];
      /**
       * Whether to return the full updated info sections entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$2[];
  }
  interface MaskedInfoSection {
      /** Info section to update. */
      infoSection?: InfoSection$1;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  interface BulkUpdateInfoSectionsResponse {
      /** Info sections updated by bulk action. */
      results?: BulkInfoSectionItemResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$3;
  }
  interface BulkDeleteInfoSectionsRequest {
      /** IDs of info sections to delete. */
      infoSectionIds: string[];
  }
  interface BulkDeleteInfoSectionsResponse {
      /** Info sections deleted by bulk action */
      results?: BulkInfoSectionResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$3;
  }
  interface BulkInfoSectionResult {
      /** Bulk action metadata for info section. */
      itemMetadata?: ItemMetadata$3;
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
   * Creates an info section.
   *
   * To assign the info section to a product, include the `infoSection.id` or `infoSection.uniqueName`
   * when [creating](https://dev.wix.com/docs/rest/business-solutions/stores/catalog-v3/products-v3/create-product) or
   * [updating](https://dev.wix.com/docs/rest/business-solutions/stores/catalog-v3/products-v3/update-product) a product.
   * @param infoSection - Info section to create.
   * @public
   * @documentationMaturity preview
   * @requiredField infoSection
   * @requiredField infoSection.title
   * @requiredField infoSection.uniqueName
   * @permissionId WIX_STORES.INFO_SECTION_CREATE
   * @adminMethod
   * @returns Created info section.
   */
  function createInfoSection(infoSection: InfoSection$1): Promise<InfoSection$1>;
  /**
   * Retrieves an info section.
   * @param infoSectionId - Info section ID.
   * @public
   * @documentationMaturity preview
   * @requiredField infoSectionId
   * @permissionId WIX_STORES.INFO_SECTION_READ
   * @returns Info section.
   */
  function getInfoSection(infoSectionId: string, options?: GetInfoSectionOptions): Promise<InfoSection$1>;
  interface GetInfoSectionOptions {
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$2[];
  }
  /**
   * Retrieves an info section by ID or `uniqueName`, or creates an info section if one with the passed `uniqueName` doesn't exist.
   *
   * > **Note:** If an info section with the passed `uniqueName` doesn't exist, the `uniqueName` and `title` fields are required to create a new info section.
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_STORES.INFO_SECTION_GET_OR_CREATE
   * @adminMethod
   */
  function getOrCreateInfoSection(options?: GetOrCreateInfoSectionOptions): Promise<GetOrCreateInfoSectionResponse>;
  interface GetOrCreateInfoSectionOptions {
      /** Info section to retrieve or create. */
      infoSection?: InfoSectionForGetOrCreate;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$2[];
  }
  /**
   * Retrieves multiple info sections by ID or `uniqueName`, or creates multiple info sections if those with the passed `uniqueName` don't exist.
   *
   * > **Note:** If an info section with the passed `uniqueName` doesn't exist, the `uniqueName` and `title` fields are required to create a new info section.
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_STORES.INFO_SECTION_GET_OR_CREATE
   * @adminMethod
   */
  function bulkGetOrCreateInfoSections(options?: BulkGetOrCreateInfoSectionsOptions): Promise<BulkGetOrCreateInfoSectionsResponse>;
  interface BulkGetOrCreateInfoSectionsOptions {
      /** Info sections to retrieve or create. */
      infoSections?: InfoSectionForGetOrCreate[];
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$2[];
  }
  /**
   * Updates an info section.
   *
   *
   * Each time the info section is updated, `revision` increments by 1.
   * The current `revision` must be passed when updating the info section.
   * This ensures you're working with the latest info section and prevents unintended overwrites.
   * @param _id - Info section ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField infoSection
   * @requiredField infoSection.revision
   * @permissionId WIX_STORES.INFO_SECTION_UPDATE
   * @adminMethod
   * @returns Updated info section.
   */
  function updateInfoSection(_id: string | null, infoSection: UpdateInfoSection, options?: UpdateInfoSectionOptions): Promise<InfoSection$1>;
  interface UpdateInfoSection {
      /**
       * Info section ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the info section is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the info section.
       *
       * Ignored when creating an info section.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the info section was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the info section was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Unique name. Used as an identifier. */
      uniqueName?: string;
      /** Info section title. */
      title?: string;
      /**
       * Info section description using rich content.
       *
       * <widget src="https://apps.wix.com/_serverless/ricos-playground-services/goto/api-component" plugins="indent.emoji.divider.codeBlock.file.gallery.giphy.image.table.link.textHighlight.textColor" exampleid="7dc9240e-d548-417a-abcf-0291b68b4303">
       * <a href="https://dev.wix.com/docs/ricos/api-reference/ricos-document">See Ricos document reference</a>
       * </widget>
       */
      description?: RichContent$1;
      /**
       * Info section description in HTML.
       *
       * When provided on create/update, this string must be a valid HTML. It will then be converted to rich content.
       * `plainDescription` is ignored when value is also passed to the `description` field.
       */
      plainDescription?: string | null;
      /**
       * Number of products this info section is assigned to.
       * > **Note:** Returned only when you pass `"ASSIGNED_PRODUCTS_COUNT"` to the `fields` array in Info Sections API requests.
       * @readonly
       */
      assignedProductsCount?: number | null;
  }
  interface UpdateInfoSectionOptions {
      /**
       * Explicit list of fields to update
       * @internal
       */
      fieldMask?: string[];
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$2[];
  }
  /**
   * Deletes an info section.
   *
   * > **Note:** Deleting an info section will also remove it from all products it is assigned to.
   * @param infoSectionId - Info section ID
   * @public
   * @documentationMaturity preview
   * @requiredField infoSectionId
   * @permissionId WIX_STORES.INFO_SECTION_DELETE
   * @adminMethod
   */
  function deleteInfoSection(infoSectionId: string): Promise<void>;
  /**
   * Retrieves a list of up to 100 info sections, given the provided filtering, sorting, and cursor paging.
   * Pass supported values to the `fields` array in the request to include those fields in the response.
   *
   *
   * Query Info Sections runs with these defaults, which you can override:
   *
   * - `createdDate` is sorted in `DESC` order
   * - `cursorPaging.limit` is `100`
   *
   * For field support for filters and sorting,
   * see [Info Sections: Supported Filters and Sorting](https://dev.wix.com/docs/rest/business-solutions/stores/catalog-v3/info-sections-v3/supported-filters-and-sorting).
   *
   * To learn about working with _Query_ endpoints, see
   * [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language),
   * and [Sorting and Paging](https://dev.wix.com/docs/rest/articles/getting-started/sorting-and-paging).
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_STORES.INFO_SECTION_READ
   */
  function queryInfoSections(options?: QueryInfoSectionsOptions): InfoSectionsQueryBuilder;
  interface QueryInfoSectionsOptions {
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$2[] | undefined;
  }
  interface QueryCursorResult$4 {
      cursors: Cursors$4;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface InfoSectionsQueryResult extends QueryCursorResult$4 {
      items: InfoSection$1[];
      query: InfoSectionsQueryBuilder;
      next: () => Promise<InfoSectionsQueryResult>;
      prev: () => Promise<InfoSectionsQueryResult>;
  }
  interface InfoSectionsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'uniqueName' | 'title', value: any) => InfoSectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'uniqueName' | 'title', value: any) => InfoSectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => InfoSectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => InfoSectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => InfoSectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => InfoSectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'uniqueName' | 'title', value: string) => InfoSectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'uniqueName' | 'title', value: any[]) => InfoSectionsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'uniqueName' | 'title', value: any) => InfoSectionsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'uniqueName' | 'title', value: boolean) => InfoSectionsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_createdDate' | '_updatedDate' | 'uniqueName' | 'title'>) => InfoSectionsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_createdDate' | '_updatedDate' | 'uniqueName' | 'title'>) => InfoSectionsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => InfoSectionsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => InfoSectionsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<InfoSectionsQueryResult>;
  }
  /**
   * Creates multiple info sections.
   * @param infoSections - Info sections to create.
   * @public
   * @documentationMaturity preview
   * @requiredField infoSections
   * @requiredField infoSections.title
   * @requiredField infoSections.uniqueName
   * @permissionId WIX_STORES.INFO_SECTION_CREATE
   * @adminMethod
   */
  function bulkCreateInfoSections(infoSections: InfoSection$1[], options?: BulkCreateInfoSectionsOptions): Promise<BulkCreateInfoSectionsResponse>;
  interface BulkCreateInfoSectionsOptions {
      /**
       * Whether to return the full created info section entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
  }
  /**
   * Updates multiple info sections.
   *
   * Each time an info section is updated, `revision` increments by 1.
   * The current `revision` must be passed when updating an info section.
   * This ensures you're working with the latest info section and prevents unintended overwrites.
   * @param infoSections - List of info sections to update.
   * @public
   * @documentationMaturity preview
   * @requiredField infoSections
   * @requiredField infoSections.infoSection._id
   * @requiredField infoSections.infoSection.revision
   * @permissionId WIX_STORES.INFO_SECTION_UPDATE
   * @adminMethod
   */
  function bulkUpdateInfoSections(infoSections: MaskedInfoSection[], options?: BulkUpdateInfoSectionsOptions): Promise<BulkUpdateInfoSectionsResponse>;
  interface BulkUpdateInfoSectionsOptions {
      /**
       * Whether to return the full updated info sections entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields$2[];
  }
  /**
   * Deletes multiple info sections.
   * @param infoSectionIds - IDs of info sections to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField infoSectionIds
   * @permissionId WIX_STORES.INFO_SECTION_DELETE
   * @adminMethod
   */
  function bulkDeleteInfoSections(infoSectionIds: string[]): Promise<BulkDeleteInfoSectionsResponse>;
  
  type storesCatalogV3InfoSection_universal_d_CreateInfoSectionRequest = CreateInfoSectionRequest;
  type storesCatalogV3InfoSection_universal_d_CreateInfoSectionResponse = CreateInfoSectionResponse;
  type storesCatalogV3InfoSection_universal_d_GetInfoSectionRequest = GetInfoSectionRequest;
  type storesCatalogV3InfoSection_universal_d_GetInfoSectionResponse = GetInfoSectionResponse;
  type storesCatalogV3InfoSection_universal_d_GetOrCreateInfoSectionRequest = GetOrCreateInfoSectionRequest;
  type storesCatalogV3InfoSection_universal_d_InfoSectionForGetOrCreate = InfoSectionForGetOrCreate;
  type storesCatalogV3InfoSection_universal_d_GetOrCreateInfoSectionResponse = GetOrCreateInfoSectionResponse;
  type storesCatalogV3InfoSection_universal_d_BulkGetOrCreateInfoSectionsRequest = BulkGetOrCreateInfoSectionsRequest;
  type storesCatalogV3InfoSection_universal_d_BulkGetOrCreateInfoSectionsResponse = BulkGetOrCreateInfoSectionsResponse;
  type storesCatalogV3InfoSection_universal_d_BulkInfoSectionItemResult = BulkInfoSectionItemResult;
  type storesCatalogV3InfoSection_universal_d_UpdateInfoSectionRequest = UpdateInfoSectionRequest;
  type storesCatalogV3InfoSection_universal_d_UpdateInfoSectionResponse = UpdateInfoSectionResponse;
  type storesCatalogV3InfoSection_universal_d_DeleteInfoSectionRequest = DeleteInfoSectionRequest;
  type storesCatalogV3InfoSection_universal_d_DeleteInfoSectionResponse = DeleteInfoSectionResponse;
  type storesCatalogV3InfoSection_universal_d_QueryInfoSectionsRequest = QueryInfoSectionsRequest;
  type storesCatalogV3InfoSection_universal_d_QueryInfoSectionsResponse = QueryInfoSectionsResponse;
  type storesCatalogV3InfoSection_universal_d_BulkCreateInfoSectionsRequest = BulkCreateInfoSectionsRequest;
  type storesCatalogV3InfoSection_universal_d_BulkCreateInfoSectionsResponse = BulkCreateInfoSectionsResponse;
  type storesCatalogV3InfoSection_universal_d_BulkUpdateInfoSectionsRequest = BulkUpdateInfoSectionsRequest;
  type storesCatalogV3InfoSection_universal_d_MaskedInfoSection = MaskedInfoSection;
  type storesCatalogV3InfoSection_universal_d_BulkUpdateInfoSectionsResponse = BulkUpdateInfoSectionsResponse;
  type storesCatalogV3InfoSection_universal_d_BulkDeleteInfoSectionsRequest = BulkDeleteInfoSectionsRequest;
  type storesCatalogV3InfoSection_universal_d_BulkDeleteInfoSectionsResponse = BulkDeleteInfoSectionsResponse;
  type storesCatalogV3InfoSection_universal_d_BulkInfoSectionResult = BulkInfoSectionResult;
  const storesCatalogV3InfoSection_universal_d_createInfoSection: typeof createInfoSection;
  const storesCatalogV3InfoSection_universal_d_getInfoSection: typeof getInfoSection;
  type storesCatalogV3InfoSection_universal_d_GetInfoSectionOptions = GetInfoSectionOptions;
  const storesCatalogV3InfoSection_universal_d_getOrCreateInfoSection: typeof getOrCreateInfoSection;
  type storesCatalogV3InfoSection_universal_d_GetOrCreateInfoSectionOptions = GetOrCreateInfoSectionOptions;
  const storesCatalogV3InfoSection_universal_d_bulkGetOrCreateInfoSections: typeof bulkGetOrCreateInfoSections;
  type storesCatalogV3InfoSection_universal_d_BulkGetOrCreateInfoSectionsOptions = BulkGetOrCreateInfoSectionsOptions;
  const storesCatalogV3InfoSection_universal_d_updateInfoSection: typeof updateInfoSection;
  type storesCatalogV3InfoSection_universal_d_UpdateInfoSection = UpdateInfoSection;
  type storesCatalogV3InfoSection_universal_d_UpdateInfoSectionOptions = UpdateInfoSectionOptions;
  const storesCatalogV3InfoSection_universal_d_deleteInfoSection: typeof deleteInfoSection;
  const storesCatalogV3InfoSection_universal_d_queryInfoSections: typeof queryInfoSections;
  type storesCatalogV3InfoSection_universal_d_QueryInfoSectionsOptions = QueryInfoSectionsOptions;
  type storesCatalogV3InfoSection_universal_d_InfoSectionsQueryResult = InfoSectionsQueryResult;
  type storesCatalogV3InfoSection_universal_d_InfoSectionsQueryBuilder = InfoSectionsQueryBuilder;
  const storesCatalogV3InfoSection_universal_d_bulkCreateInfoSections: typeof bulkCreateInfoSections;
  type storesCatalogV3InfoSection_universal_d_BulkCreateInfoSectionsOptions = BulkCreateInfoSectionsOptions;
  const storesCatalogV3InfoSection_universal_d_bulkUpdateInfoSections: typeof bulkUpdateInfoSections;
  type storesCatalogV3InfoSection_universal_d_BulkUpdateInfoSectionsOptions = BulkUpdateInfoSectionsOptions;
  const storesCatalogV3InfoSection_universal_d_bulkDeleteInfoSections: typeof bulkDeleteInfoSections;
  namespace storesCatalogV3InfoSection_universal_d {
    export {
      InfoSection$1 as InfoSection,
      RichContent$1 as RichContent,
      Node$1 as Node,
      NodeDataOneOf$1 as NodeDataOneOf,
      NodeType$1 as NodeType,
      NodeStyle$1 as NodeStyle,
      ButtonData$1 as ButtonData,
      Border$1 as Border,
      Colors$1 as Colors,
      PluginContainerData$1 as PluginContainerData,
      WidthType$1 as WidthType,
      PluginContainerDataWidth$1 as PluginContainerDataWidth,
      PluginContainerDataWidthDataOneOf$1 as PluginContainerDataWidthDataOneOf,
      PluginContainerDataAlignment$1 as PluginContainerDataAlignment,
      Spoiler$1 as Spoiler,
      Height$1 as Height,
      Type$1 as Type,
      Styles$1 as Styles,
      Link$1 as Link,
      LinkDataOneOf$1 as LinkDataOneOf,
      Target$1 as Target,
      Rel$1 as Rel,
      CodeBlockData$1 as CodeBlockData,
      TextStyle$1 as TextStyle,
      TextAlignment$1 as TextAlignment,
      DividerData$1 as DividerData,
      LineStyle$1 as LineStyle,
      Width$1 as Width,
      Alignment$1 as Alignment,
      FileData$1 as FileData,
      ViewMode$1 as ViewMode,
      FileSource$1 as FileSource,
      FileSourceDataOneOf$1 as FileSourceDataOneOf,
      PDFSettings$1 as PDFSettings,
      GalleryData$1 as GalleryData,
      Media$1 as Media,
      Image$1 as Image,
      Video$1 as Video,
      Item$1 as Item,
      ItemDataOneOf$1 as ItemDataOneOf,
      GalleryOptions$1 as GalleryOptions,
      LayoutType$1 as LayoutType,
      Orientation$1 as Orientation,
      Crop$1 as Crop,
      ThumbnailsAlignment$1 as ThumbnailsAlignment,
      Layout$1 as Layout,
      ItemStyle$1 as ItemStyle,
      Thumbnails$1 as Thumbnails,
      GIFData$1 as GIFData,
      GIF$1 as GIF,
      HeadingData$1 as HeadingData,
      HTMLData$1 as HTMLData,
      HTMLDataDataOneOf$1 as HTMLDataDataOneOf,
      Source$1 as Source,
      ImageData$1 as ImageData,
      LinkPreviewData$1 as LinkPreviewData,
      MapData$1 as MapData,
      MapSettings$1 as MapSettings,
      MapType$1 as MapType,
      ParagraphData$1 as ParagraphData,
      PollData$1 as PollData,
      ViewRole$1 as ViewRole,
      VoteRole$1 as VoteRole,
      Permissions$1 as Permissions,
      Option$1 as Option,
      Settings$1 as Settings,
      PollLayoutType$1 as PollLayoutType,
      PollLayoutDirection$1 as PollLayoutDirection,
      PollLayout$1 as PollLayout,
      OptionLayout$1 as OptionLayout,
      BackgroundType$1 as BackgroundType,
      Gradient$1 as Gradient,
      Background$1 as Background,
      BackgroundBackgroundOneOf$1 as BackgroundBackgroundOneOf,
      PollDesign$1 as PollDesign,
      OptionDesign$1 as OptionDesign,
      Poll$1 as Poll,
      PollDataLayout$1 as PollDataLayout,
      Design$1 as Design,
      TextData$1 as TextData,
      Decoration$1 as Decoration,
      DecorationDataOneOf$1 as DecorationDataOneOf,
      DecorationType$1 as DecorationType,
      AnchorData$1 as AnchorData,
      ColorData$1 as ColorData,
      LinkData$1 as LinkData,
      MentionData$1 as MentionData,
      FontSizeData$1 as FontSizeData,
      FontType$1 as FontType,
      SpoilerData$1 as SpoilerData,
      AppEmbedData$1 as AppEmbedData,
      AppEmbedDataAppDataOneOf$1 as AppEmbedDataAppDataOneOf,
      AppType$1 as AppType,
      BookingData$1 as BookingData,
      EventData$1 as EventData,
      VideoData$1 as VideoData,
      PlaybackOptions$1 as PlaybackOptions,
      EmbedData$1 as EmbedData,
      Oembed$1 as Oembed,
      CollapsibleListData$1 as CollapsibleListData,
      InitialExpandedItems$1 as InitialExpandedItems,
      Direction$1 as Direction,
      TableData$1 as TableData,
      Dimensions$1 as Dimensions,
      TableCellData$1 as TableCellData,
      VerticalAlignment$1 as VerticalAlignment,
      CellStyle$1 as CellStyle,
      BorderColors$1 as BorderColors,
      NullValue$1 as NullValue,
      ListValue$1 as ListValue,
      AudioData$1 as AudioData,
      OrderedListData$1 as OrderedListData,
      BulletedListData$1 as BulletedListData,
      BlockquoteData$1 as BlockquoteData,
      CaptionData$1 as CaptionData,
      Metadata$1 as Metadata,
      DocumentStyle$1 as DocumentStyle,
      TextNodeStyle$1 as TextNodeStyle,
      InvalidateCache$4 as InvalidateCache,
      InvalidateCacheGetByOneOf$4 as InvalidateCacheGetByOneOf,
      App$4 as App,
      Page$4 as Page,
      URI$4 as URI,
      File$4 as File,
      storesCatalogV3InfoSection_universal_d_CreateInfoSectionRequest as CreateInfoSectionRequest,
      storesCatalogV3InfoSection_universal_d_CreateInfoSectionResponse as CreateInfoSectionResponse,
      storesCatalogV3InfoSection_universal_d_GetInfoSectionRequest as GetInfoSectionRequest,
      RequestedFields$2 as RequestedFields,
      storesCatalogV3InfoSection_universal_d_GetInfoSectionResponse as GetInfoSectionResponse,
      storesCatalogV3InfoSection_universal_d_GetOrCreateInfoSectionRequest as GetOrCreateInfoSectionRequest,
      storesCatalogV3InfoSection_universal_d_InfoSectionForGetOrCreate as InfoSectionForGetOrCreate,
      storesCatalogV3InfoSection_universal_d_GetOrCreateInfoSectionResponse as GetOrCreateInfoSectionResponse,
      storesCatalogV3InfoSection_universal_d_BulkGetOrCreateInfoSectionsRequest as BulkGetOrCreateInfoSectionsRequest,
      storesCatalogV3InfoSection_universal_d_BulkGetOrCreateInfoSectionsResponse as BulkGetOrCreateInfoSectionsResponse,
      storesCatalogV3InfoSection_universal_d_BulkInfoSectionItemResult as BulkInfoSectionItemResult,
      ItemMetadata$3 as ItemMetadata,
      ApplicationError$3 as ApplicationError,
      BulkActionMetadata$3 as BulkActionMetadata,
      storesCatalogV3InfoSection_universal_d_UpdateInfoSectionRequest as UpdateInfoSectionRequest,
      storesCatalogV3InfoSection_universal_d_UpdateInfoSectionResponse as UpdateInfoSectionResponse,
      storesCatalogV3InfoSection_universal_d_DeleteInfoSectionRequest as DeleteInfoSectionRequest,
      storesCatalogV3InfoSection_universal_d_DeleteInfoSectionResponse as DeleteInfoSectionResponse,
      storesCatalogV3InfoSection_universal_d_QueryInfoSectionsRequest as QueryInfoSectionsRequest,
      CursorQuery$3 as CursorQuery,
      CursorQueryPagingMethodOneOf$3 as CursorQueryPagingMethodOneOf,
      Sorting$4 as Sorting,
      SortOrder$4 as SortOrder,
      CursorPaging$4 as CursorPaging,
      storesCatalogV3InfoSection_universal_d_QueryInfoSectionsResponse as QueryInfoSectionsResponse,
      CursorPagingMetadata$4 as CursorPagingMetadata,
      Cursors$4 as Cursors,
      storesCatalogV3InfoSection_universal_d_BulkCreateInfoSectionsRequest as BulkCreateInfoSectionsRequest,
      storesCatalogV3InfoSection_universal_d_BulkCreateInfoSectionsResponse as BulkCreateInfoSectionsResponse,
      storesCatalogV3InfoSection_universal_d_BulkUpdateInfoSectionsRequest as BulkUpdateInfoSectionsRequest,
      storesCatalogV3InfoSection_universal_d_MaskedInfoSection as MaskedInfoSection,
      storesCatalogV3InfoSection_universal_d_BulkUpdateInfoSectionsResponse as BulkUpdateInfoSectionsResponse,
      storesCatalogV3InfoSection_universal_d_BulkDeleteInfoSectionsRequest as BulkDeleteInfoSectionsRequest,
      storesCatalogV3InfoSection_universal_d_BulkDeleteInfoSectionsResponse as BulkDeleteInfoSectionsResponse,
      storesCatalogV3InfoSection_universal_d_BulkInfoSectionResult as BulkInfoSectionResult,
      DomainEvent$5 as DomainEvent,
      DomainEventBodyOneOf$5 as DomainEventBodyOneOf,
      EntityCreatedEvent$5 as EntityCreatedEvent,
      RestoreInfo$5 as RestoreInfo,
      EntityUpdatedEvent$5 as EntityUpdatedEvent,
      EntityDeletedEvent$5 as EntityDeletedEvent,
      ActionEvent$5 as ActionEvent,
      Empty$5 as Empty,
      MessageEnvelope$5 as MessageEnvelope,
      IdentificationData$5 as IdentificationData,
      IdentificationDataIdOneOf$5 as IdentificationDataIdOneOf,
      WebhookIdentityType$5 as WebhookIdentityType,
      storesCatalogV3InfoSection_universal_d_createInfoSection as createInfoSection,
      storesCatalogV3InfoSection_universal_d_getInfoSection as getInfoSection,
      storesCatalogV3InfoSection_universal_d_GetInfoSectionOptions as GetInfoSectionOptions,
      storesCatalogV3InfoSection_universal_d_getOrCreateInfoSection as getOrCreateInfoSection,
      storesCatalogV3InfoSection_universal_d_GetOrCreateInfoSectionOptions as GetOrCreateInfoSectionOptions,
      storesCatalogV3InfoSection_universal_d_bulkGetOrCreateInfoSections as bulkGetOrCreateInfoSections,
      storesCatalogV3InfoSection_universal_d_BulkGetOrCreateInfoSectionsOptions as BulkGetOrCreateInfoSectionsOptions,
      storesCatalogV3InfoSection_universal_d_updateInfoSection as updateInfoSection,
      storesCatalogV3InfoSection_universal_d_UpdateInfoSection as UpdateInfoSection,
      storesCatalogV3InfoSection_universal_d_UpdateInfoSectionOptions as UpdateInfoSectionOptions,
      storesCatalogV3InfoSection_universal_d_deleteInfoSection as deleteInfoSection,
      storesCatalogV3InfoSection_universal_d_queryInfoSections as queryInfoSections,
      storesCatalogV3InfoSection_universal_d_QueryInfoSectionsOptions as QueryInfoSectionsOptions,
      storesCatalogV3InfoSection_universal_d_InfoSectionsQueryResult as InfoSectionsQueryResult,
      storesCatalogV3InfoSection_universal_d_InfoSectionsQueryBuilder as InfoSectionsQueryBuilder,
      storesCatalogV3InfoSection_universal_d_bulkCreateInfoSections as bulkCreateInfoSections,
      storesCatalogV3InfoSection_universal_d_BulkCreateInfoSectionsOptions as BulkCreateInfoSectionsOptions,
      storesCatalogV3InfoSection_universal_d_bulkUpdateInfoSections as bulkUpdateInfoSections,
      storesCatalogV3InfoSection_universal_d_BulkUpdateInfoSectionsOptions as BulkUpdateInfoSectionsOptions,
      storesCatalogV3InfoSection_universal_d_bulkDeleteInfoSections as bulkDeleteInfoSections,
    };
  }
  
  /** Inventory Item. */
  interface InventoryItem$1 extends InventoryItemTrackingMethodOneOf$1 {
      /**
       * Tracking method - in stock.
       *
       * When set to `true`, the item is available for sale without a quantity limit.
       */
      inStock?: boolean;
      /**
       * Tracking method - quantity left in inventory.
       *
       * Quantity can be negative when decrementing inventory for an order that has already been paid.
       */
      quantity?: number;
      /**
       * Inventory item ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the inventory item is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the inventory item.
       *
       * Ignored when creating an inventory item.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the inventory item was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the inventory item was created.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Variant ID. */
      variantId?: string;
      /** Stores location ID. */
      locationId?: string | null;
      /** Product ID. */
      productId?: string;
      /**
       * Whether the quantity is being tracked.
       * @readonly
       */
      trackQuantity?: boolean;
      /**
       * Inventory item availability status.
       *
       * Supported values:
       * + OUT_OF_STOCK: Product is out of stock.
       * + IN_STOCK: Product is in stock. See `quantity` field for exact amount in stock.
       * + PREORDER: Product is only available for preorder. See `preorderInfo` field for more info.
       * @readonly
       */
      availabilityStatus?: AvailabilityStatus$1;
      /** Item preorder info. */
      preorderInfo?: PreorderInfo$1;
      /**
       * Product.
       * @readonly
       */
      product?: Product$1;
      /**
       * Custom field data for the inventory item object.
       *
       * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the app dashboard before they can be accessed with API calls.
       */
      extendedFields?: ExtendedFields$1;
  }
  /** @oneof */
  interface InventoryItemTrackingMethodOneOf$1 {
      /**
       * Tracking method - in stock.
       *
       * When set to `true`, the item is available for sale without a quantity limit.
       */
      inStock?: boolean;
      /**
       * Tracking method - quantity left in inventory.
       *
       * Quantity can be negative when decrementing inventory for an order that has already been paid.
       */
      quantity?: number;
  }
  enum AvailabilityStatus$1 {
      UNKNOWN_AVAILABILITY_STATUS = "UNKNOWN_AVAILABILITY_STATUS",
      /** Product is out of stock. */
      OUT_OF_STOCK = "OUT_OF_STOCK",
      /** Product is in stock. See `quantity` field for exact amount in stock. */
      IN_STOCK = "IN_STOCK",
      /** Product is only available for preorder. See `preorderInfo` field for more info. */
      PREORDER = "PREORDER"
  }
  interface PreorderInfo$1 {
      /**
       * Whether preorder is enabled for the product.
       *
       * Default: `false`
       */
      enabled?: boolean | null;
      /** A message the customer will see when the item is out of stock and preorder is enabled. */
      message?: string | null;
      /**
       * Number of products that can be preordered after stock reaches zero.
       * Supported only for inventory items with `trackQuantity = true`.
       *
       * Default: `100000`
       */
      limit?: number | null;
      /**
       * Number of times the product was preordered.
       *
       * Supported only for inventory items with `trackQuantity = true`.
       * @readonly
       */
      counter?: number | null;
      /**
       * Quantity of products that can be preordered.
       *
       * Supported only for inventory items with `trackQuantity = true`.
       * @readonly
       */
      quantity?: number | null;
  }
  interface Product$1 {
      /** Product name. */
      name?: string | null;
      /** List of category IDs that this product is included in directly. */
      directCategoryIds?: string[];
      /** Variant name. */
      variantName?: string | null;
      /** Variant SKU (stock keeping unit). */
      variantSku?: string | null;
      /** Variant visible. */
      variantVisible?: boolean | null;
  }
  interface ExtendedFields$1 {
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
  interface InvalidateCache$3 extends InvalidateCacheGetByOneOf$3 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$3;
      /** Invalidate by page id */
      page?: Page$3;
      /** Invalidate by URI path */
      uri?: URI$3;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$3;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf$3 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$3;
      /** Invalidate by page id */
      page?: Page$3;
      /** Invalidate by URI path */
      uri?: URI$3;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$3;
  }
  interface App$3 {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page$3 {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI$3 {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File$3 {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface BulkInventoryItemAction$1 {
      /** Inventory items. */
      inventoryItems?: InventoryItem$1[];
  }
  interface CreateInventoryItemRequest {
      /** Inventory item to create. */
      inventoryItem: InventoryItem$1;
  }
  interface CreateInventoryItemResponse {
      /** Created inventory item. */
      inventoryItem?: InventoryItem$1;
  }
  interface BulkCreateInventoryItemsRequest {
      /** Inventory items to create. */
      inventoryItems: InventoryItem$1[];
      /**
       * Whether to return the full inventory item entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
  }
  interface BulkCreateInventoryItemsResponse {
      /** Inventory items created by bulk action. */
      results?: BulkInventoryItemResult$1[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$2;
  }
  interface BulkInventoryItemResult$1 {
      /** Bulk action metadata for inventory item. */
      itemMetadata?: ItemMetadata$2;
      /**
       * Full inventory item entity.
       *
       * Returned only if `returnEntity: true` is passed in the request.
       */
      item?: InventoryItem$1;
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
  interface GetInventoryItemRequest {
      /** Inventory item ID. */
      inventoryItemId: string;
  }
  interface GetInventoryItemResponse {
      /** Inventory item. */
      inventoryItem?: InventoryItem$1;
  }
  interface UpdateInventoryItemRequest {
      /** Inventory item to update. */
      inventoryItem: InventoryItem$1;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
      /** Reason for update. */
      reason?: ReasonType;
  }
  /** The reason for the inventory change. */
  enum ReasonType {
      UNKNOWN = "UNKNOWN",
      ORDER = "ORDER",
      MANUAL = "MANUAL",
      REVERT_INVENTORY_CHANGE = "REVERT_INVENTORY_CHANGE"
  }
  interface UpdateInventoryItemResponse {
      /** Updated inventory item. */
      inventoryItem?: InventoryItem$1;
  }
  /** Report when Inventory item stock status changed from in stock to out of stock and the opposite. */
  interface InventoryItemStockStatusUpdatedEvent {
      /** Inventory item new status. */
      inStock?: boolean;
  }
  interface InventoryItemUpdatedWithReason {
      /** Updated inventory item. */
      currentEntity?: InventoryItem$1;
      /** Reason for the update. */
      reason?: ReasonType;
      /**
       * ID of the app that updated this inventory item.
       *
       * When Wix Stores updates an inventory item, value will always be: `"215238eb-22a5-4c36-9e7b-e7c08025e04e"`.
       */
      appId?: string;
      /**
       * WIP - This property will hold both names and values of the updated fields of the entity.
       * For more details please see [adr](https://docs.google.com/document/d/1PdqsOM20Ph2HAkmx8zvUnzzk3Sekp3BR9h34wSvsRnI/edit#heading=h.phlw87mh2imx) or [issue](https://github.com/wix-private/nile-tracker/issues/363)
       * @internal
       */
      modifiedFields?: Record<string, any>;
  }
  interface BulkUpdateInventoryItemsRequest {
      /** Inventory items to update. */
      inventoryItems: MaskedInventoryItem[];
      /**
       * Whether to return the full inventory item entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Reason for update. */
      reason?: ReasonType;
  }
  interface MaskedInventoryItem {
      /** Inventory item to update. */
      inventoryItem?: InventoryItem$1;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  interface BulkUpdateInventoryItemsResponse {
      /** Inventory items updated by bulk action. */
      results?: BulkInventoryItemResult$1[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$2;
  }
  interface BulkUpdateInventoryItemsByFilterRequest {
      /** Filter object. */
      filter: Record<string, any> | null;
      /** Inventory item to update. */
      inventoryItem: InventoryItem$1;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
      /** Free text to match in searchable fields. */
      search?: SearchDetails$1;
  }
  interface SearchDetails$1 {
      /** Defines how separate search terms in `expression` are combined. */
      mode?: Mode$1;
      /** Search term or expression. */
      expression?: string | null;
      /** Fields to search in. If empty - will search in all searchable fields. Use dot notation to specify json path. */
      fields?: string[];
      /** Whether to use auto fuzzy search (allowing typos by a managed proximity algorithm). */
      fuzzy?: boolean;
  }
  enum Mode$1 {
      /** Any of the search terms must be present. */
      OR = "OR",
      /** All search terms must be present. */
      AND = "AND"
  }
  interface BulkUpdateInventoryItemsByFilterResponse {
      /**
       * Job ID.
       *
       * Pass this ID to [Get Async Job](https://dev.wix.com/docs/rest/business-management/async-job/introduction) to retrieve job details and metadata.
       */
      jobId?: string;
  }
  interface DeleteInventoryItemRequest {
      /** Inventory item ID. */
      inventoryItemId: string;
  }
  interface DeleteInventoryItemResponse {
  }
  interface BulkDeleteInventoryItemsRequest {
      /** IDs of inventory items to delete. */
      inventoryItemIds: string[];
  }
  interface BulkDeleteInventoryItemsResponse {
      /** Inventory items deleted by bulk action. */
      results?: BulkDeleteInventoryItemsResponseBulkInventoryItemResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$2;
  }
  interface BulkDeleteInventoryItemsResponseBulkInventoryItemResult {
      /** Bulk action metadata for inventory item. */
      itemMetadata?: ItemMetadata$2;
  }
  interface QueryInventoryItemsRequest {
      /** Query options. */
      query?: QueryV2;
  }
  interface QueryV2 extends QueryV2PagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
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
      sort?: Sorting$3[];
  }
  /** @oneof */
  interface QueryV2PagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
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
  interface Paging {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
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
  interface QueryInventoryItemsResponse {
      /** List of inventory items. */
      inventoryItems?: InventoryItem$1[];
      /** Paging metadata. */
      pagingMetadata?: PlatformPagingMetadataV2;
  }
  interface PlatformPagingMetadataV2 {
      /** The number of items returned in this response. */
      count?: number | null;
      /**
       * The offset which was requested. Returned if offset paging was used.
       * @internal
       */
      offset?: number | null;
      /**
       * The total number of items that match the query. Returned if offset paging was used.
       * @internal
       */
      total?: number | null;
      /** Cursors to navigate through result pages. Returned if cursor paging was used. */
      cursors?: Cursors$3;
  }
  interface Cursors$3 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface SearchInventoryItemsRequest {
      /** Search options. */
      search?: CursorSearch$1;
  }
  interface CursorSearch$1 extends CursorSearchPagingMethodOneOf$1 {
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
      sort?: Sorting$3[];
      /** Aggregations are a way to explore large amounts of data by displaying summaries about various partitions of the data and later allowing to narrow the navigation to a specific partition. */
      aggregations?: Aggregation$1[];
      /** Free text to match in searchable fields. */
      search?: SearchDetails$1;
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
  interface CursorSearchPagingMethodOneOf$1 {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$3;
  }
  interface Aggregation$1 extends AggregationKindOneOf$1 {
      /** Value aggregation. */
      value?: ValueAggregation$1;
      /** Range aggregation. */
      range?: RangeAggregation$1;
      /** Scalar aggregation. */
      scalar?: ScalarAggregation$1;
      /** Date histogram aggregation. */
      dateHistogram?: DateHistogramAggregation$1;
      /** Nested aggregation. */
      nested?: NestedAggregation$1;
      /** User-defined name of aggregation, should be unique, will appear in aggregation results. */
      name?: string | null;
      /** Type of aggregation, client must provide matching aggregation field below. */
      type?: AggregationType$1;
      /** Field to aggregate by, use dot notation to specify json path. */
      fieldPath?: string;
      /**
       * Deprecated. Use `nested` instead.
       * @deprecated Deprecated. Use `nested` instead.
       * @replacedBy kind.nested
       * @targetRemovalDate 2024-03-30
       */
      groupBy?: GroupByAggregation$1;
  }
  /** @oneof */
  interface AggregationKindOneOf$1 {
      /** Value aggregation. */
      value?: ValueAggregation$1;
      /** Range aggregation. */
      range?: RangeAggregation$1;
      /** Scalar aggregation. */
      scalar?: ScalarAggregation$1;
      /** Date histogram aggregation. */
      dateHistogram?: DateHistogramAggregation$1;
      /** Nested aggregation. */
      nested?: NestedAggregation$1;
  }
  interface RangeBucket$1 {
      /** Inclusive lower bound of the range. Required if `to` is not provided. */
      from?: number | null;
      /** Exclusive upper bound of the range. Required if `from` is not provided. */
      to?: number | null;
  }
  enum SortType$1 {
      /** Sort by number of matches. */
      COUNT = "COUNT",
      /** Sort by value of the field alphabetically. */
      VALUE = "VALUE"
  }
  enum SortDirection$1 {
      /** Sort in descending order. */
      DESC = "DESC",
      /** Sort in ascending order. */
      ASC = "ASC"
  }
  enum MissingValues$1 {
      /** Exclude missing values from the aggregation results. */
      EXCLUDE = "EXCLUDE",
      /** Include missing values in the aggregation results. */
      INCLUDE = "INCLUDE"
  }
  interface IncludeMissingValuesOptions$1 {
      /** Specify custom bucket name. Defaults are [string -> "N/A"], [int -> "0"], [bool -> "false"] ... */
      addToBucket?: string;
  }
  enum ScalarType$1 {
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
  interface ValueAggregation$1 extends ValueAggregationOptionsOneOf$1 {
      /** Options for including missing values. */
      includeOptions?: IncludeMissingValuesOptions$1;
      /** Whether to sort by number of matches or value of the field. */
      sortType?: SortType$1;
      /** Whether to sort in ascending or descending order. */
      sortDirection?: SortDirection$1;
      /** How many aggregations to return. Can be between 1 and 250. 10 is the default. */
      limit?: number | null;
      /** Whether to include or exclude missing values from the aggregation results. Default: `EXCLUDE`. */
      missingValues?: MissingValues$1;
  }
  /** @oneof */
  interface ValueAggregationOptionsOneOf$1 {
      /** Options for including missing values. */
      includeOptions?: IncludeMissingValuesOptions$1;
  }
  enum NestedAggregationType$1 {
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
  interface RangeAggregation$1 {
      /** List of range buckets, where during aggregation each entity will be placed in the first bucket its value falls into, based on the provided range bounds. */
      buckets?: RangeBucket$1[];
  }
  interface ScalarAggregation$1 {
      /** Define the operator for the scalar aggregation. */
      type?: ScalarType$1;
  }
  interface DateHistogramAggregation$1 {
      /** Interval for date histogram aggregation. */
      interval?: Interval$1;
  }
  enum Interval$1 {
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
  interface NestedAggregationItem$1 extends NestedAggregationItemKindOneOf$1 {
      /** Value aggregation. */
      value?: ValueAggregation$1;
      /** Range aggregation. */
      range?: RangeAggregation$1;
      /** Scalar aggregation. */
      scalar?: ScalarAggregation$1;
      /** Date histogram aggregation. */
      dateHistogram?: DateHistogramAggregation$1;
      /** User-defined name of aggregation, should be unique, will appear in aggregation results. */
      name?: string | null;
      /** Type of aggregation, client must provide matching aggregation field below. */
      type?: NestedAggregationType$1;
      /** Field to aggregate by, use dot notation to specify json path. */
      fieldPath?: string;
  }
  /** @oneof */
  interface NestedAggregationItemKindOneOf$1 {
      /** Value aggregation. */
      value?: ValueAggregation$1;
      /** Range aggregation. */
      range?: RangeAggregation$1;
      /** Scalar aggregation. */
      scalar?: ScalarAggregation$1;
      /** Date histogram aggregation. */
      dateHistogram?: DateHistogramAggregation$1;
  }
  enum AggregationType$1 {
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
  interface NestedAggregation$1 {
      /** Flattened list of aggregations, where each next aggregation is nested within previous one. */
      nestedAggregations?: NestedAggregationItem$1[];
  }
  interface GroupByAggregation$1 extends GroupByAggregationKindOneOf$1 {
      /** Value aggregation configuration. */
      value?: ValueAggregation$1;
      /** User-defined name of aggregation, should be unique, will appear in aggregation results. */
      name?: string | null;
      /** Field to aggregate by. */
      fieldPath?: string;
  }
  /** @oneof */
  interface GroupByAggregationKindOneOf$1 {
      /** Value aggregation configuration. */
      value?: ValueAggregation$1;
  }
  interface SearchInventoryItemsResponse {
      /** List of inventory items. */
      inventoryItems?: InventoryItem$1[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata$3;
      /** Aggregation data. */
      aggregationData?: AggregationData$1;
  }
  interface CursorPagingMetadata$3 {
      /** Number of items returned in current page. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: CommonCursors$1;
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
  interface CommonCursors$1 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface AggregationData$1 {
      /** key = aggregation name (as derived from search request). */
      results?: AggregationResults$1[];
  }
  interface ValueAggregationResult$1 {
      /** Value of the field. */
      value?: string;
      /** Count of entities with this value. */
      count?: number;
  }
  interface RangeAggregationResult$1 {
      /** Inclusive lower bound of the range. */
      from?: number | null;
      /** Exclusive upper bound of the range. */
      to?: number | null;
      /** Count of entities in this range. */
      count?: number;
  }
  interface NestedAggregationResults$1 extends NestedAggregationResultsResultOneOf$1 {
      /** Value aggregation results. */
      values?: ValueResults$1;
      /** Range aggregation results. */
      ranges?: RangeResults$1;
      /** Scalar aggregation results. */
      scalar?: AggregationResultsScalarResult$1;
      /** User-defined name of aggregation, matches the one provided in request. */
      name?: string;
      /** Type of aggregation that matches result. */
      type?: AggregationType$1;
      /** Field to aggregate by, matches the one provided in request. */
      fieldPath?: string;
  }
  /** @oneof */
  interface NestedAggregationResultsResultOneOf$1 {
      /** Value aggregation results. */
      values?: ValueResults$1;
      /** Range aggregation results. */
      ranges?: RangeResults$1;
      /** Scalar aggregation results. */
      scalar?: AggregationResultsScalarResult$1;
  }
  interface ValueResults$1 {
      /** List of value aggregations. */
      results?: ValueAggregationResult$1[];
  }
  interface RangeResults$1 {
      /** List of ranges returned in same order as requested. */
      results?: RangeAggregationResult$1[];
  }
  interface AggregationResultsScalarResult$1 {
      /** Type of scalar aggregation. */
      type?: ScalarType$1;
      /** Value of the scalar aggregation. */
      value?: number;
  }
  interface NestedValueAggregationResult$1 {
      /** Value of the field. */
      value?: string;
      /** Nested aggregations. */
      nestedResults?: NestedAggregationResults$1;
  }
  interface ValueResult$1 {
      /** Value of the field. */
      value?: string;
      /** Count of entities with this value. */
      count?: number | null;
  }
  interface RangeResult$1 {
      /** Inclusive lower bound of the range. */
      from?: number | null;
      /** Exclusive upper bound of the range. */
      to?: number | null;
      /** Count of entities in this range. */
      count?: number | null;
  }
  interface ScalarResult$1 {
      /** Value of the scalar aggregation. */
      value?: number;
  }
  interface NestedResultValue$1 extends NestedResultValueResultOneOf$1 {
      /** Value aggregation result. */
      value?: ValueResult$1;
      /** Range aggregation result. */
      range?: RangeResult$1;
      /** Scalar aggregation result. */
      scalar?: ScalarResult$1;
      /** Date histogram aggregation result. */
      dateHistogram?: ValueResult$1;
  }
  /** @oneof */
  interface NestedResultValueResultOneOf$1 {
      /** Value aggregation result. */
      value?: ValueResult$1;
      /** Range aggregation result. */
      range?: RangeResult$1;
      /** Scalar aggregation result. */
      scalar?: ScalarResult$1;
      /** Date histogram aggregation result. */
      dateHistogram?: ValueResult$1;
  }
  interface Results$1 {
      /** List of nested aggregations. */
      results?: Record<string, NestedResultValue$1>;
  }
  interface DateHistogramResult$1 {
      /** Date in ISO 8601 format. */
      value?: string;
      /** Count of documents in the bucket. */
      count?: number;
  }
  interface GroupByValueResults$1 {
      /** List of value aggregations. */
      results?: NestedValueAggregationResult$1[];
  }
  interface DateHistogramResults$1 {
      /** List of date histogram aggregations. */
      results?: DateHistogramResult$1[];
  }
  /**
   * Results of `NESTED` aggregation type in a flattened form.
   * Aggregations in resulting array are keyed by requested aggregation `name`.
   */
  interface NestedResults$1 {
      /** List of nested aggregations. */
      results?: Results$1[];
  }
  interface AggregationResults$1 extends AggregationResultsResultOneOf$1 {
      /** Value aggregation results. */
      values?: ValueResults$1;
      /** Range aggregation results. */
      ranges?: RangeResults$1;
      /** Scalar aggregation results. */
      scalar?: AggregationResultsScalarResult$1;
      /** Group by value aggregation results. */
      groupedByValue?: GroupByValueResults$1;
      /** Date histogram aggregation results. */
      dateHistogram?: DateHistogramResults$1;
      /** Nested aggregation results. */
      nested?: NestedResults$1;
      /** User-defined name of aggregation as derived from search request. */
      name?: string;
      /** Type of aggregation that must match provided kind as derived from search request. */
      type?: AggregationType$1;
      /** Field to aggregate by as derived from search request. */
      fieldPath?: string;
  }
  /** @oneof */
  interface AggregationResultsResultOneOf$1 {
      /** Value aggregation results. */
      values?: ValueResults$1;
      /** Range aggregation results. */
      ranges?: RangeResults$1;
      /** Scalar aggregation results. */
      scalar?: AggregationResultsScalarResult$1;
      /** Group by value aggregation results. */
      groupedByValue?: GroupByValueResults$1;
      /** Date histogram aggregation results. */
      dateHistogram?: DateHistogramResults$1;
      /** Nested aggregation results. */
      nested?: NestedResults$1;
  }
  interface SearchInventoryItemsWithOffsetRequest {
      /** WQL expression. */
      search?: OffsetSearch;
  }
  interface OffsetSearch extends OffsetSearchPagingMethodOneOf {
      /** Pointer to page of results using offset. Can't be used together with 'cursor_paging'. */
      paging?: Paging;
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
      /** Projection on the result object - list of specific field names to return. If fieldsets are also specified, return the union of fieldsets and fields. */
      fields?: string[];
      /** Projection on the result object - list of named projections. For example, "basic" will return ID and name fields. Specifying multiple fieldsets will return the union of fields from all. Specifying fieldsets and fields will also return the union of fields. */
      fieldsets?: string[];
      /** Aggregations | Faceted search: refers to a way to explore large amounts of data by displaying summaries about various partitions of the data and later allowing to narrow the navigation to a specific partition. */
      aggregations?: Aggregation$1[];
      /** Free text to match in searchable fields. */
      search?: SearchDetails$1;
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
  interface OffsetSearchPagingMethodOneOf {
      /** Pointer to page of results using offset. Can't be used together with 'cursor_paging'. */
      paging?: Paging;
  }
  interface SearchInventoryItemsWithOffsetResponse {
      /** InventoryItems which satisfy the provided query. */
      inventoryItems?: InventoryItem$1[];
      /** Paging metadata. Contains cursor which can be used in next query. */
      pagingMetadata?: PagingMetadata$1;
  }
  interface PagingMetadata$1 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. */
      total?: number | null;
      /** Flag that indicates the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface BulkDecrementInventoryItemsRequest {
      /** Inventory item IDs and decrement data. */
      decrementData: DecrementDataById[];
      /**
       * Whether to allow negative inventory following this decrement action.
       *
       * Default: `false` (negative inventory is not allowed)
       */
      restrictInventory?: boolean | null;
      /**
       * Whether to return the full inventory item entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Reason for decrement inventory action. */
      reason?: ReasonType;
  }
  interface DecrementDataById {
      /** Inventory item ID. */
      inventoryItemId?: string;
      /** Amount to decrement by. */
      decrementBy?: number;
      /**
       * Whether the request to decrement the inventory item's quantity was made as part of a purchase that includes preorder items.
       *
       * + If `true` and the item is available for preorder in the default location, negative inventory quantity is allowed.
       * + If `false` and the item is not available for preorder, negative inventory is not allowed.
       */
      preorderRequest?: boolean;
  }
  interface BulkDecrementInventoryItemsResponse {
      /** Inventory items updated by bulk action. */
      results?: BulkInventoryItemResult$1[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$2;
  }
  interface BulkIncrementInventoryItemsRequest {
      /** Inventory item IDs and increment data. */
      incrementData: IncrementDataById[];
      /**
       * Whether to return the full inventory item entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Reason for increment inventory action. */
      reason?: ReasonType;
  }
  interface IncrementDataById {
      /** Inventory item ID. */
      inventoryItemId?: string;
      /** Amount to increment by. */
      incrementBy?: number;
  }
  interface BulkIncrementInventoryItemsResponse {
      /** Inventory items updated by bulk action. */
      results?: BulkInventoryItemResult$1[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$2;
  }
  interface BulkDecrementInventoryItemsByVariantAndLocationRequest {
      /** Variant and location IDs, as well as decrement data. */
      decrementData: DecrementDataByVariantAndLocation[];
      /**
       * Whether to allow negative inventory following this decrement action.
       *
       * Default: `false` (negative inventory is not allowed)
       */
      restrictInventory?: boolean | null;
      /**
       * Whether to return the full inventory item entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Reason for decrement inventory action. */
      reason?: ReasonType;
  }
  interface DecrementDataByVariantAndLocation {
      /** Variant ID. */
      variantId?: string;
      /** Location ID. */
      locationId?: string | null;
      /** Amount to decrement by. */
      decrementBy?: number;
      /**
       * Whether the request to decrement the inventory item's quantity was made as part of a purchase that includes preorder items.
       *
       * + If `true` and the item is available for preorder in the default location, negative inventory quantity is allowed.
       * + If `false` and the item is not available for preorder, negative inventory is not allowed.
       */
      preorderRequest?: boolean;
  }
  interface BulkDecrementInventoryItemsByVariantAndLocationResponse {
      /** Inventory items updated by bulk action. */
      results?: BulkInventoryItemResult$1[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$2;
  }
  interface BulkIncrementInventoryItemsByVariantAndLocationRequest {
      /** Variant and location IDs, as well as increment data. */
      incrementData: IncrementDataByVariantAndLocation[];
      /**
       * Whether to return the full inventory item entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Reason for increment inventory action. */
      reason?: ReasonType;
  }
  interface IncrementDataByVariantAndLocation {
      /** Variant ID. */
      variantId?: string;
      /** Location ID. */
      locationId?: string | null;
      /** Amount to increment by. */
      incrementBy?: number;
  }
  interface BulkIncrementInventoryItemsByVariantAndLocationResponse {
      /** Inventory items updated by bulk action. */
      results?: BulkInventoryItemResult$1[];
      /** Bulk action metadata details as: totalSuccess and totalFailure. */
      bulkActionMetadata?: BulkActionMetadata$2;
  }
  interface BulkSetInventoryItemsForProductsInLocationRequest {
      /** Location ID to set inventory items to. */
      locationId: string | null;
      /**
       * List of inventory items per product. All existing inventory items for given product in given location_id will be replaced by ones provided in this request.
       * >**Note:** you can provide up to 1000 inventory items in total. For example you can provide 100 products with 10 inventory items in each or 1 product with 1000 inventory items or something in between.
       */
      productInventoryItems: ProductInventoryItems[];
      /**
       * Whether to return the full inventory item entity in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
  }
  interface ProductInventoryItems {
      /** The ID of the product to set inventory items to. */
      productId?: string;
      /** List of inventory items to be created (if no ID provided) or updated (if existing ID provided). */
      inventoryItems?: InventoryItem$1[];
  }
  interface BulkSetInventoryItemsForProductsInLocationResponse {
      /** Created inventory items by bulk action. */
      results?: BulkInventoryItemResult$1[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$2;
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
   * Creates an inventory item.
   * The combination of `variantId` and `locationId` is unique.
   * @param inventoryItem - Inventory item to create.
   * @public
   * @documentationMaturity preview
   * @requiredField inventoryItem
   * @requiredField inventoryItem.productId
   * @requiredField inventoryItem.variantId
   * @permissionId WIX_STORES.INVENTORY_CREATE
   * @adminMethod
   * @returns Created inventory item.
   */
  function createInventoryItem(inventoryItem: InventoryItem$1): Promise<InventoryItem$1>;
  /**
   * Creates multiple inventory items.
   * @param inventoryItems - Inventory items to create.
   * @public
   * @documentationMaturity preview
   * @requiredField inventoryItems
   * @requiredField inventoryItems.productId
   * @requiredField inventoryItems.variantId
   * @permissionId WIX_STORES.INVENTORY_CREATE
   * @adminMethod
   */
  function bulkCreateInventoryItems(inventoryItems: InventoryItem$1[], options?: BulkCreateInventoryItemsOptions): Promise<BulkCreateInventoryItemsResponse>;
  interface BulkCreateInventoryItemsOptions {
      /**
       * Whether to return the full inventory item entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
  }
  /**
   * Retrieves an inventory item.
   * @param inventoryItemId - Inventory item ID.
   * @public
   * @documentationMaturity preview
   * @requiredField inventoryItemId
   * @permissionId WIX_STORES.INVENTORY_READ
   * @returns Inventory item.
   */
  function getInventoryItem(inventoryItemId: string): Promise<InventoryItem$1>;
  /**
   * Updates an inventory item.
   *
   *
   * Each time the inventory item is updated, `revision` increments by 1.
   * The current `revision` must be passed when updating the inventory item.
   * This ensures you're working with the latest inventory item and prevents unintended overwrites.
   * @param _id - Inventory item ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField inventoryItem
   * @requiredField inventoryItem.revision
   * @permissionId WIX_STORES.INVENTORY_UPDATE
   * @adminMethod
   * @returns Updated inventory item.
   */
  function updateInventoryItem(_id: string | null, inventoryItem: UpdateInventoryItem, options?: UpdateInventoryItemOptions): Promise<InventoryItem$1>;
  interface UpdateInventoryItem {
      /**
       * Tracking method - in stock.
       *
       * When set to `true`, the item is available for sale without a quantity limit.
       */
      inStock?: boolean;
      /**
       * Tracking method - quantity left in inventory.
       *
       * Quantity can be negative when decrementing inventory for an order that has already been paid.
       */
      quantity?: number;
      /**
       * Inventory item ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the inventory item is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the inventory item.
       *
       * Ignored when creating an inventory item.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the inventory item was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the inventory item was created.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Variant ID. */
      variantId?: string;
      /** Stores location ID. */
      locationId?: string | null;
      /** Product ID. */
      productId?: string;
      /**
       * Whether the quantity is being tracked.
       * @readonly
       */
      trackQuantity?: boolean;
      /**
       * Inventory item availability status.
       *
       * Supported values:
       * + OUT_OF_STOCK: Product is out of stock.
       * + IN_STOCK: Product is in stock. See `quantity` field for exact amount in stock.
       * + PREORDER: Product is only available for preorder. See `preorderInfo` field for more info.
       * @readonly
       */
      availabilityStatus?: AvailabilityStatus$1;
      /** Item preorder info. */
      preorderInfo?: PreorderInfo$1;
      /**
       * Product.
       * @readonly
       */
      product?: Product$1;
      /**
       * Custom field data for the inventory item object.
       *
       * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the app dashboard before they can be accessed with API calls.
       */
      extendedFields?: ExtendedFields$1;
  }
  interface UpdateInventoryItemOptions {
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
      /** Reason for update. */
      reason?: ReasonType;
  }
  /**
   * Updates multiple inventory items.
   *
   * Each time an inventory item is updated, `revision` increments by 1.
   * The current `revision` must be passed when updating an inventory item.
   * This ensures you're working with the latest inventory item and prevents unintended overwrites.
   * @param inventoryItems - Inventory items to update.
   * @public
   * @documentationMaturity preview
   * @requiredField inventoryItems
   * @requiredField inventoryItems.inventoryItem._id
   * @requiredField inventoryItems.inventoryItem.revision
   * @permissionId WIX_STORES.INVENTORY_UPDATE
   * @adminMethod
   */
  function bulkUpdateInventoryItems(inventoryItems: MaskedInventoryItem[], options?: BulkUpdateInventoryItemsOptions): Promise<BulkUpdateInventoryItemsResponse>;
  interface BulkUpdateInventoryItemsOptions {
      /**
       * Whether to return the full inventory item entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Reason for update. */
      reason?: ReasonType;
  }
  /**
   * Updates multiple inventory items, given the provided filter.
   *
   * Each time an inventory item is updated, `revision` increments by 1.
   * The current `revision` must be passed when updating an inventory item.
   * This ensures you're working with the latest inventory item and prevents unintended overwrites.
   * @param filter - Filter object.
   * @public
   * @documentationMaturity preview
   * @requiredField filter
   * @requiredField options.inventoryItem
   * @permissionId WIX_STORES.INVENTORY_UPDATE
   * @adminMethod
   */
  function bulkUpdateInventoryItemsByFilter(filter: Record<string, any> | null, options?: BulkUpdateInventoryItemsByFilterOptions): Promise<BulkUpdateInventoryItemsByFilterResponse>;
  interface BulkUpdateInventoryItemsByFilterOptions {
      /** Inventory item to update. */
      inventoryItem: InventoryItem$1;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
      /** Free text to match in searchable fields. */
      search?: SearchDetails$1;
  }
  /**
   * Deletes an inventory item.
   * @param inventoryItemId - Inventory item ID.
   * @public
   * @documentationMaturity preview
   * @requiredField inventoryItemId
   * @permissionId WIX_STORES.INVENTORY_DELETE
   * @adminMethod
   */
  function deleteInventoryItem(inventoryItemId: string): Promise<void>;
  /**
   * Deletes multiple inventory items.
   * @param inventoryItemIds - IDs of inventory items to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField inventoryItemIds
   * @permissionId WIX_STORES.INVENTORY_DELETE
   * @adminMethod
   */
  function bulkDeleteInventoryItems(inventoryItemIds: string[]): Promise<BulkDeleteInventoryItemsResponse>;
  /**
   * Retrieves a list of up to 1,000 inventory items, given the provided filtering, sorting, and cursor paging.
   *
   * For field support for filters and sorting,
   * see [Inventory Items: Supported Filters and Sorting](https://dev.wix.com/docs/rest/business-solutions/stores/catalog-v3/inventory-items-v3/supported-filters-and-sorting).
   *
   * To learn about working with _Query_ endpoints, see
   * [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language),
   * and [Sorting and Paging](https://dev.wix.com/docs/rest/articles/getting-started/sorting-and-paging).
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_STORES.INVENTORY_READ
   */
  function queryInventoryItems(): InventoryItemsQueryBuilder;
  interface QueryCursorResult$3 {
      cursors: CommonCursors$1;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface InventoryItemsQueryResult extends QueryCursorResult$3 {
      items: InventoryItem$1[];
      query: InventoryItemsQueryBuilder;
      next: () => Promise<InventoryItemsQueryResult>;
      prev: () => Promise<InventoryItemsQueryResult>;
  }
  interface InventoryItemsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'inStock' | 'quantity' | '_id' | '_createdDate' | '_updatedDate' | 'variantId' | 'locationId' | 'productId' | 'trackQuantity' | 'availabilityStatus' | 'preorderInfo.enabled' | 'product.name' | 'product.directCategoryIds' | 'product.variantName' | 'product.variantSku', value: any) => InventoryItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: 'inStock' | 'quantity' | '_id' | '_createdDate' | '_updatedDate' | 'variantId' | 'locationId' | 'productId' | 'trackQuantity' | 'availabilityStatus' | 'preorderInfo.enabled' | 'product.name' | 'product.directCategoryIds' | 'product.variantName' | 'product.variantSku', value: any) => InventoryItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: 'quantity' | '_createdDate' | '_updatedDate', value: any) => InventoryItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: 'quantity' | '_createdDate' | '_updatedDate', value: any) => InventoryItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: 'quantity' | '_createdDate' | '_updatedDate', value: any) => InventoryItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: 'quantity' | '_createdDate' | '_updatedDate', value: any) => InventoryItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'variantId' | 'locationId' | 'productId' | 'product.name' | 'product.variantName' | 'product.variantSku', value: string) => InventoryItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: 'inStock' | 'quantity' | '_id' | '_createdDate' | '_updatedDate' | 'variantId' | 'locationId' | 'productId' | 'trackQuantity' | 'availabilityStatus' | 'preorderInfo.enabled' | 'product.name' | 'product.directCategoryIds' | 'product.variantName' | 'product.variantSku', value: any[]) => InventoryItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasAll: (propertyName: 'product.directCategoryIds', value: any[]) => InventoryItemsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'inStock' | 'quantity' | '_id' | '_createdDate' | '_updatedDate' | 'variantId' | 'locationId' | 'productId' | 'trackQuantity' | 'availabilityStatus' | 'preorderInfo.enabled' | 'product.name' | 'product.directCategoryIds' | 'product.variantName' | 'product.variantSku', value: any) => InventoryItemsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'inStock' | 'quantity' | '_id' | '_createdDate' | '_updatedDate' | 'variantId' | 'locationId' | 'productId' | 'trackQuantity' | 'availabilityStatus' | 'preorderInfo.enabled' | 'product.name' | 'product.directCategoryIds' | 'product.variantName' | 'product.variantSku', value: boolean) => InventoryItemsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'inStock' | 'quantity' | '_createdDate' | '_updatedDate' | 'productId' | 'trackQuantity' | 'availabilityStatus' | 'preorderInfo.enabled' | 'product.name' | 'product.directCategoryIds' | 'product.variantName' | 'product.variantSku'>) => InventoryItemsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'inStock' | 'quantity' | '_createdDate' | '_updatedDate' | 'productId' | 'trackQuantity' | 'availabilityStatus' | 'preorderInfo.enabled' | 'product.name' | 'product.directCategoryIds' | 'product.variantName' | 'product.variantSku'>) => InventoryItemsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => InventoryItemsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => InventoryItemsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<InventoryItemsQueryResult>;
  }
  /**
   * Retrieves a list of inventory items, given the provided filtering, sorting, and cursor paging.
   *
   *
   * Search Inventory Items runs with these defaults, which you can override:
   *
   * - `createdDate` is sorted in `DESC` order
   * - `cursorPaging.limit` is `100`
   *
   * For field support for filters and sorting,
   * see [Inventory Items: Supported Filters and Sorting](https://dev.wix.com/docs/rest/business-solutions/stores/catalog-v3/inventory-items-v3/supported-filters-and-sorting).
   *
   * To learn about working with _Search_ endpoints, see
   * [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language),
   * and [Sorting and Paging](https://dev.wix.com/docs/rest/articles/getting-started/sorting-and-paging).
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_STORES.INVENTORY_READ
   */
  function searchInventoryItems(options?: SearchInventoryItemsOptions): Promise<SearchInventoryItemsResponse>;
  interface SearchInventoryItemsOptions {
      /** Search options. */
      search?: CursorSearch$1;
  }
  /**
   * Decrements quantities of multiple inventory items.
   *
   * > **Notes:**:
   * > + `trackQuantity` must be `true` to allow for decrementing the quantity.
   * > + If you pass `restrictInventory: true` and the `decrementData.decrementBy` amount is greater than the current quantity in stock, the request will fail with an `INSUFFICIENT_INVENTORY` error.
   * > + Pass `restrictInventory: false` to allow for negative quantities.
   * > + If you pass `preorderRequest: true` and the item is available for preorder, the item's `preorderCounter` will increase and the item's quantity will stay the same.
   * @param decrementData - Inventory item IDs and decrement data.
   * @public
   * @documentationMaturity preview
   * @requiredField decrementData
   * @requiredField decrementData.decrementBy
   * @requiredField decrementData.inventoryItemId
   * @permissionId WIX_STORES.INVENTORY_UPDATE
   * @adminMethod
   */
  function bulkDecrementInventoryItems(decrementData: DecrementDataById[], options?: BulkDecrementInventoryItemsOptions): Promise<BulkDecrementInventoryItemsResponse>;
  interface BulkDecrementInventoryItemsOptions {
      /**
       * Whether to allow negative inventory following this decrement action.
       *
       * Default: `false` (negative inventory is not allowed)
       */
      restrictInventory?: boolean | null;
      /**
       * Whether to return the full inventory item entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Reason for decrement inventory action. */
      reason?: ReasonType;
  }
  /**
   * Increments quantities of multiple inventory items.
   *
   * > **Note:** `trackQuantity` must be `true` to allow for incrementing the quantity.
   * @param incrementData - Inventory item IDs and increment data.
   * @public
   * @documentationMaturity preview
   * @requiredField incrementData
   * @requiredField incrementData.incrementBy
   * @requiredField incrementData.inventoryItemId
   * @permissionId WIX_STORES.INVENTORY_UPDATE
   * @adminMethod
   */
  function bulkIncrementInventoryItems(incrementData: IncrementDataById[], options?: BulkIncrementInventoryItemsOptions): Promise<BulkIncrementInventoryItemsResponse>;
  interface BulkIncrementInventoryItemsOptions {
      /**
       * Whether to return the full inventory item entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Reason for increment inventory action. */
      reason?: ReasonType;
  }
  /**
   * Decrements quantities of multiple inventory items by variant and location.
   *
   * > **Notes:**:
   * > + `trackQuantity` must be `true` to allow for decrementing the quantity.
   * > + If you pass `restrictInventory: true` and the `decrementData.decrementBy` amount is greater than the current quantity in stock, the request will fail with an `INSUFFICIENT_INVENTORY` error.
   * > + Pass `restrictInventory: false` to allow for negative quantities.
   * > + If you pass `preorderRequest: true` and the item is available for preorder, the item's `preorderCounter` will increase and the item's quantity will stay the same.
   * @param decrementData - Variant and location IDs, as well as decrement data.
   * @public
   * @documentationMaturity preview
   * @requiredField decrementData
   * @requiredField decrementData.decrementBy
   * @requiredField decrementData.variantId
   * @permissionId WIX_STORES.INVENTORY_UPDATE
   * @adminMethod
   */
  function bulkDecrementInventoryItemsByVariantAndLocation(decrementData: DecrementDataByVariantAndLocation[], options?: BulkDecrementInventoryItemsByVariantAndLocationOptions): Promise<BulkDecrementInventoryItemsByVariantAndLocationResponse>;
  interface BulkDecrementInventoryItemsByVariantAndLocationOptions {
      /**
       * Whether to allow negative inventory following this decrement action.
       *
       * Default: `false` (negative inventory is not allowed)
       */
      restrictInventory?: boolean | null;
      /**
       * Whether to return the full inventory item entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Reason for decrement inventory action. */
      reason?: ReasonType;
  }
  /**
   * Increments quantities of multiple inventory items by variant and location.
   *
   * > **Note:** `trackQuantity` must be `true` to allow for incrementing the quantity.
   * @param incrementData - Variant and location IDs, as well as increment data.
   * @public
   * @documentationMaturity preview
   * @requiredField incrementData
   * @requiredField incrementData.incrementBy
   * @requiredField incrementData.variantId
   * @permissionId WIX_STORES.INVENTORY_UPDATE
   * @adminMethod
   */
  function bulkIncrementInventoryItemsByVariantAndLocation(incrementData: IncrementDataByVariantAndLocation[], options?: BulkIncrementInventoryItemsByVariantAndLocationOptions): Promise<BulkIncrementInventoryItemsByVariantAndLocationResponse>;
  interface BulkIncrementInventoryItemsByVariantAndLocationOptions {
      /**
       * Whether to return the full inventory item entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Reason for increment inventory action. */
      reason?: ReasonType;
  }
  /**
   * Sets inventory items on specific products.
   * If `location_id` is not provided, then the default location will be updated.
   * If existing `id` provided for a inventory item in request, then this inventory item updated with new values provided in the request.
   * If `id` is not provided for inventory item, then a new inventory item will be created.
   * If there were any inventory items related to given product in given location and they are not provided by ids in request, then these inventory items will be removed.
   * After calling this endpoint the product in given location will have all and only inventory items provided in BulkSetInventoryItemsForProductsInLocationRequest.
   * All inventory items in the provided request must have the same product_id as provided in the request param.
   * All inventory items in the provided request must have the same location_id as provided in the request param.
   * @param locationId - Location ID to set inventory items to.
   * @param productInventoryItems - List of inventory items per product. All existing inventory items for given product in given location_id will be replaced by ones provided in this request.
   * >**Note:** you can provide up to 1000 inventory items in total. For example you can provide 100 products with 10 inventory items in each or 1 product with 1000 inventory items or something in between.
   * @internal
   * @documentationMaturity preview
   * @requiredField locationId
   * @requiredField productInventoryItems
   * @requiredField productInventoryItems.inventoryItems
   * @requiredField productInventoryItems.inventoryItems.locationId
   * @requiredField productInventoryItems.inventoryItems.productId
   * @requiredField productInventoryItems.inventoryItems.variantId
   * @requiredField productInventoryItems.productId
   * @permissionId WIX_STORES.INVENTORY_UPDATE
   * @adminMethod
   */
  function bulkSetInventoryItemsForProductsInLocation(locationId: string | null, productInventoryItems: ProductInventoryItems[], options?: BulkSetInventoryItemsForProductsInLocationOptions): Promise<BulkSetInventoryItemsForProductsInLocationResponse>;
  interface BulkSetInventoryItemsForProductsInLocationOptions {
      /**
       * Whether to return the full inventory item entity in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
  }
  
  type storesCatalogV3InventoryItem_universal_d_CreateInventoryItemRequest = CreateInventoryItemRequest;
  type storesCatalogV3InventoryItem_universal_d_CreateInventoryItemResponse = CreateInventoryItemResponse;
  type storesCatalogV3InventoryItem_universal_d_BulkCreateInventoryItemsRequest = BulkCreateInventoryItemsRequest;
  type storesCatalogV3InventoryItem_universal_d_BulkCreateInventoryItemsResponse = BulkCreateInventoryItemsResponse;
  type storesCatalogV3InventoryItem_universal_d_GetInventoryItemRequest = GetInventoryItemRequest;
  type storesCatalogV3InventoryItem_universal_d_GetInventoryItemResponse = GetInventoryItemResponse;
  type storesCatalogV3InventoryItem_universal_d_UpdateInventoryItemRequest = UpdateInventoryItemRequest;
  type storesCatalogV3InventoryItem_universal_d_ReasonType = ReasonType;
  const storesCatalogV3InventoryItem_universal_d_ReasonType: typeof ReasonType;
  type storesCatalogV3InventoryItem_universal_d_UpdateInventoryItemResponse = UpdateInventoryItemResponse;
  type storesCatalogV3InventoryItem_universal_d_InventoryItemStockStatusUpdatedEvent = InventoryItemStockStatusUpdatedEvent;
  type storesCatalogV3InventoryItem_universal_d_InventoryItemUpdatedWithReason = InventoryItemUpdatedWithReason;
  type storesCatalogV3InventoryItem_universal_d_BulkUpdateInventoryItemsRequest = BulkUpdateInventoryItemsRequest;
  type storesCatalogV3InventoryItem_universal_d_MaskedInventoryItem = MaskedInventoryItem;
  type storesCatalogV3InventoryItem_universal_d_BulkUpdateInventoryItemsResponse = BulkUpdateInventoryItemsResponse;
  type storesCatalogV3InventoryItem_universal_d_BulkUpdateInventoryItemsByFilterRequest = BulkUpdateInventoryItemsByFilterRequest;
  type storesCatalogV3InventoryItem_universal_d_BulkUpdateInventoryItemsByFilterResponse = BulkUpdateInventoryItemsByFilterResponse;
  type storesCatalogV3InventoryItem_universal_d_DeleteInventoryItemRequest = DeleteInventoryItemRequest;
  type storesCatalogV3InventoryItem_universal_d_DeleteInventoryItemResponse = DeleteInventoryItemResponse;
  type storesCatalogV3InventoryItem_universal_d_BulkDeleteInventoryItemsRequest = BulkDeleteInventoryItemsRequest;
  type storesCatalogV3InventoryItem_universal_d_BulkDeleteInventoryItemsResponse = BulkDeleteInventoryItemsResponse;
  type storesCatalogV3InventoryItem_universal_d_BulkDeleteInventoryItemsResponseBulkInventoryItemResult = BulkDeleteInventoryItemsResponseBulkInventoryItemResult;
  type storesCatalogV3InventoryItem_universal_d_QueryInventoryItemsRequest = QueryInventoryItemsRequest;
  type storesCatalogV3InventoryItem_universal_d_QueryV2 = QueryV2;
  type storesCatalogV3InventoryItem_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
  type storesCatalogV3InventoryItem_universal_d_Paging = Paging;
  type storesCatalogV3InventoryItem_universal_d_QueryInventoryItemsResponse = QueryInventoryItemsResponse;
  type storesCatalogV3InventoryItem_universal_d_PlatformPagingMetadataV2 = PlatformPagingMetadataV2;
  type storesCatalogV3InventoryItem_universal_d_SearchInventoryItemsRequest = SearchInventoryItemsRequest;
  type storesCatalogV3InventoryItem_universal_d_SearchInventoryItemsResponse = SearchInventoryItemsResponse;
  type storesCatalogV3InventoryItem_universal_d_SearchInventoryItemsWithOffsetRequest = SearchInventoryItemsWithOffsetRequest;
  type storesCatalogV3InventoryItem_universal_d_OffsetSearch = OffsetSearch;
  type storesCatalogV3InventoryItem_universal_d_OffsetSearchPagingMethodOneOf = OffsetSearchPagingMethodOneOf;
  type storesCatalogV3InventoryItem_universal_d_SearchInventoryItemsWithOffsetResponse = SearchInventoryItemsWithOffsetResponse;
  type storesCatalogV3InventoryItem_universal_d_BulkDecrementInventoryItemsRequest = BulkDecrementInventoryItemsRequest;
  type storesCatalogV3InventoryItem_universal_d_DecrementDataById = DecrementDataById;
  type storesCatalogV3InventoryItem_universal_d_BulkDecrementInventoryItemsResponse = BulkDecrementInventoryItemsResponse;
  type storesCatalogV3InventoryItem_universal_d_BulkIncrementInventoryItemsRequest = BulkIncrementInventoryItemsRequest;
  type storesCatalogV3InventoryItem_universal_d_IncrementDataById = IncrementDataById;
  type storesCatalogV3InventoryItem_universal_d_BulkIncrementInventoryItemsResponse = BulkIncrementInventoryItemsResponse;
  type storesCatalogV3InventoryItem_universal_d_BulkDecrementInventoryItemsByVariantAndLocationRequest = BulkDecrementInventoryItemsByVariantAndLocationRequest;
  type storesCatalogV3InventoryItem_universal_d_DecrementDataByVariantAndLocation = DecrementDataByVariantAndLocation;
  type storesCatalogV3InventoryItem_universal_d_BulkDecrementInventoryItemsByVariantAndLocationResponse = BulkDecrementInventoryItemsByVariantAndLocationResponse;
  type storesCatalogV3InventoryItem_universal_d_BulkIncrementInventoryItemsByVariantAndLocationRequest = BulkIncrementInventoryItemsByVariantAndLocationRequest;
  type storesCatalogV3InventoryItem_universal_d_IncrementDataByVariantAndLocation = IncrementDataByVariantAndLocation;
  type storesCatalogV3InventoryItem_universal_d_BulkIncrementInventoryItemsByVariantAndLocationResponse = BulkIncrementInventoryItemsByVariantAndLocationResponse;
  type storesCatalogV3InventoryItem_universal_d_BulkSetInventoryItemsForProductsInLocationRequest = BulkSetInventoryItemsForProductsInLocationRequest;
  type storesCatalogV3InventoryItem_universal_d_ProductInventoryItems = ProductInventoryItems;
  type storesCatalogV3InventoryItem_universal_d_BulkSetInventoryItemsForProductsInLocationResponse = BulkSetInventoryItemsForProductsInLocationResponse;
  const storesCatalogV3InventoryItem_universal_d_createInventoryItem: typeof createInventoryItem;
  const storesCatalogV3InventoryItem_universal_d_bulkCreateInventoryItems: typeof bulkCreateInventoryItems;
  type storesCatalogV3InventoryItem_universal_d_BulkCreateInventoryItemsOptions = BulkCreateInventoryItemsOptions;
  const storesCatalogV3InventoryItem_universal_d_getInventoryItem: typeof getInventoryItem;
  const storesCatalogV3InventoryItem_universal_d_updateInventoryItem: typeof updateInventoryItem;
  type storesCatalogV3InventoryItem_universal_d_UpdateInventoryItem = UpdateInventoryItem;
  type storesCatalogV3InventoryItem_universal_d_UpdateInventoryItemOptions = UpdateInventoryItemOptions;
  const storesCatalogV3InventoryItem_universal_d_bulkUpdateInventoryItems: typeof bulkUpdateInventoryItems;
  type storesCatalogV3InventoryItem_universal_d_BulkUpdateInventoryItemsOptions = BulkUpdateInventoryItemsOptions;
  const storesCatalogV3InventoryItem_universal_d_bulkUpdateInventoryItemsByFilter: typeof bulkUpdateInventoryItemsByFilter;
  type storesCatalogV3InventoryItem_universal_d_BulkUpdateInventoryItemsByFilterOptions = BulkUpdateInventoryItemsByFilterOptions;
  const storesCatalogV3InventoryItem_universal_d_deleteInventoryItem: typeof deleteInventoryItem;
  const storesCatalogV3InventoryItem_universal_d_bulkDeleteInventoryItems: typeof bulkDeleteInventoryItems;
  const storesCatalogV3InventoryItem_universal_d_queryInventoryItems: typeof queryInventoryItems;
  type storesCatalogV3InventoryItem_universal_d_InventoryItemsQueryResult = InventoryItemsQueryResult;
  type storesCatalogV3InventoryItem_universal_d_InventoryItemsQueryBuilder = InventoryItemsQueryBuilder;
  const storesCatalogV3InventoryItem_universal_d_searchInventoryItems: typeof searchInventoryItems;
  type storesCatalogV3InventoryItem_universal_d_SearchInventoryItemsOptions = SearchInventoryItemsOptions;
  const storesCatalogV3InventoryItem_universal_d_bulkDecrementInventoryItems: typeof bulkDecrementInventoryItems;
  type storesCatalogV3InventoryItem_universal_d_BulkDecrementInventoryItemsOptions = BulkDecrementInventoryItemsOptions;
  const storesCatalogV3InventoryItem_universal_d_bulkIncrementInventoryItems: typeof bulkIncrementInventoryItems;
  type storesCatalogV3InventoryItem_universal_d_BulkIncrementInventoryItemsOptions = BulkIncrementInventoryItemsOptions;
  const storesCatalogV3InventoryItem_universal_d_bulkDecrementInventoryItemsByVariantAndLocation: typeof bulkDecrementInventoryItemsByVariantAndLocation;
  type storesCatalogV3InventoryItem_universal_d_BulkDecrementInventoryItemsByVariantAndLocationOptions = BulkDecrementInventoryItemsByVariantAndLocationOptions;
  const storesCatalogV3InventoryItem_universal_d_bulkIncrementInventoryItemsByVariantAndLocation: typeof bulkIncrementInventoryItemsByVariantAndLocation;
  type storesCatalogV3InventoryItem_universal_d_BulkIncrementInventoryItemsByVariantAndLocationOptions = BulkIncrementInventoryItemsByVariantAndLocationOptions;
  const storesCatalogV3InventoryItem_universal_d_bulkSetInventoryItemsForProductsInLocation: typeof bulkSetInventoryItemsForProductsInLocation;
  type storesCatalogV3InventoryItem_universal_d_BulkSetInventoryItemsForProductsInLocationOptions = BulkSetInventoryItemsForProductsInLocationOptions;
  namespace storesCatalogV3InventoryItem_universal_d {
    export {
      InventoryItem$1 as InventoryItem,
      InventoryItemTrackingMethodOneOf$1 as InventoryItemTrackingMethodOneOf,
      AvailabilityStatus$1 as AvailabilityStatus,
      PreorderInfo$1 as PreorderInfo,
      Product$1 as Product,
      ExtendedFields$1 as ExtendedFields,
      InvalidateCache$3 as InvalidateCache,
      InvalidateCacheGetByOneOf$3 as InvalidateCacheGetByOneOf,
      App$3 as App,
      Page$3 as Page,
      URI$3 as URI,
      File$3 as File,
      BulkInventoryItemAction$1 as BulkInventoryItemAction,
      storesCatalogV3InventoryItem_universal_d_CreateInventoryItemRequest as CreateInventoryItemRequest,
      storesCatalogV3InventoryItem_universal_d_CreateInventoryItemResponse as CreateInventoryItemResponse,
      storesCatalogV3InventoryItem_universal_d_BulkCreateInventoryItemsRequest as BulkCreateInventoryItemsRequest,
      storesCatalogV3InventoryItem_universal_d_BulkCreateInventoryItemsResponse as BulkCreateInventoryItemsResponse,
      BulkInventoryItemResult$1 as BulkInventoryItemResult,
      ItemMetadata$2 as ItemMetadata,
      ApplicationError$2 as ApplicationError,
      BulkActionMetadata$2 as BulkActionMetadata,
      storesCatalogV3InventoryItem_universal_d_GetInventoryItemRequest as GetInventoryItemRequest,
      storesCatalogV3InventoryItem_universal_d_GetInventoryItemResponse as GetInventoryItemResponse,
      storesCatalogV3InventoryItem_universal_d_UpdateInventoryItemRequest as UpdateInventoryItemRequest,
      storesCatalogV3InventoryItem_universal_d_ReasonType as ReasonType,
      storesCatalogV3InventoryItem_universal_d_UpdateInventoryItemResponse as UpdateInventoryItemResponse,
      storesCatalogV3InventoryItem_universal_d_InventoryItemStockStatusUpdatedEvent as InventoryItemStockStatusUpdatedEvent,
      storesCatalogV3InventoryItem_universal_d_InventoryItemUpdatedWithReason as InventoryItemUpdatedWithReason,
      storesCatalogV3InventoryItem_universal_d_BulkUpdateInventoryItemsRequest as BulkUpdateInventoryItemsRequest,
      storesCatalogV3InventoryItem_universal_d_MaskedInventoryItem as MaskedInventoryItem,
      storesCatalogV3InventoryItem_universal_d_BulkUpdateInventoryItemsResponse as BulkUpdateInventoryItemsResponse,
      storesCatalogV3InventoryItem_universal_d_BulkUpdateInventoryItemsByFilterRequest as BulkUpdateInventoryItemsByFilterRequest,
      SearchDetails$1 as SearchDetails,
      Mode$1 as Mode,
      storesCatalogV3InventoryItem_universal_d_BulkUpdateInventoryItemsByFilterResponse as BulkUpdateInventoryItemsByFilterResponse,
      storesCatalogV3InventoryItem_universal_d_DeleteInventoryItemRequest as DeleteInventoryItemRequest,
      storesCatalogV3InventoryItem_universal_d_DeleteInventoryItemResponse as DeleteInventoryItemResponse,
      storesCatalogV3InventoryItem_universal_d_BulkDeleteInventoryItemsRequest as BulkDeleteInventoryItemsRequest,
      storesCatalogV3InventoryItem_universal_d_BulkDeleteInventoryItemsResponse as BulkDeleteInventoryItemsResponse,
      storesCatalogV3InventoryItem_universal_d_BulkDeleteInventoryItemsResponseBulkInventoryItemResult as BulkDeleteInventoryItemsResponseBulkInventoryItemResult,
      storesCatalogV3InventoryItem_universal_d_QueryInventoryItemsRequest as QueryInventoryItemsRequest,
      storesCatalogV3InventoryItem_universal_d_QueryV2 as QueryV2,
      storesCatalogV3InventoryItem_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf,
      Sorting$3 as Sorting,
      SortOrder$3 as SortOrder,
      storesCatalogV3InventoryItem_universal_d_Paging as Paging,
      CursorPaging$3 as CursorPaging,
      storesCatalogV3InventoryItem_universal_d_QueryInventoryItemsResponse as QueryInventoryItemsResponse,
      storesCatalogV3InventoryItem_universal_d_PlatformPagingMetadataV2 as PlatformPagingMetadataV2,
      Cursors$3 as Cursors,
      storesCatalogV3InventoryItem_universal_d_SearchInventoryItemsRequest as SearchInventoryItemsRequest,
      CursorSearch$1 as CursorSearch,
      CursorSearchPagingMethodOneOf$1 as CursorSearchPagingMethodOneOf,
      Aggregation$1 as Aggregation,
      AggregationKindOneOf$1 as AggregationKindOneOf,
      RangeBucket$1 as RangeBucket,
      SortType$1 as SortType,
      SortDirection$1 as SortDirection,
      MissingValues$1 as MissingValues,
      IncludeMissingValuesOptions$1 as IncludeMissingValuesOptions,
      ScalarType$1 as ScalarType,
      ValueAggregation$1 as ValueAggregation,
      ValueAggregationOptionsOneOf$1 as ValueAggregationOptionsOneOf,
      NestedAggregationType$1 as NestedAggregationType,
      RangeAggregation$1 as RangeAggregation,
      ScalarAggregation$1 as ScalarAggregation,
      DateHistogramAggregation$1 as DateHistogramAggregation,
      Interval$1 as Interval,
      NestedAggregationItem$1 as NestedAggregationItem,
      NestedAggregationItemKindOneOf$1 as NestedAggregationItemKindOneOf,
      AggregationType$1 as AggregationType,
      NestedAggregation$1 as NestedAggregation,
      GroupByAggregation$1 as GroupByAggregation,
      GroupByAggregationKindOneOf$1 as GroupByAggregationKindOneOf,
      storesCatalogV3InventoryItem_universal_d_SearchInventoryItemsResponse as SearchInventoryItemsResponse,
      CursorPagingMetadata$3 as CursorPagingMetadata,
      CommonCursors$1 as CommonCursors,
      AggregationData$1 as AggregationData,
      ValueAggregationResult$1 as ValueAggregationResult,
      RangeAggregationResult$1 as RangeAggregationResult,
      NestedAggregationResults$1 as NestedAggregationResults,
      NestedAggregationResultsResultOneOf$1 as NestedAggregationResultsResultOneOf,
      ValueResults$1 as ValueResults,
      RangeResults$1 as RangeResults,
      AggregationResultsScalarResult$1 as AggregationResultsScalarResult,
      NestedValueAggregationResult$1 as NestedValueAggregationResult,
      ValueResult$1 as ValueResult,
      RangeResult$1 as RangeResult,
      ScalarResult$1 as ScalarResult,
      NestedResultValue$1 as NestedResultValue,
      NestedResultValueResultOneOf$1 as NestedResultValueResultOneOf,
      Results$1 as Results,
      DateHistogramResult$1 as DateHistogramResult,
      GroupByValueResults$1 as GroupByValueResults,
      DateHistogramResults$1 as DateHistogramResults,
      NestedResults$1 as NestedResults,
      AggregationResults$1 as AggregationResults,
      AggregationResultsResultOneOf$1 as AggregationResultsResultOneOf,
      storesCatalogV3InventoryItem_universal_d_SearchInventoryItemsWithOffsetRequest as SearchInventoryItemsWithOffsetRequest,
      storesCatalogV3InventoryItem_universal_d_OffsetSearch as OffsetSearch,
      storesCatalogV3InventoryItem_universal_d_OffsetSearchPagingMethodOneOf as OffsetSearchPagingMethodOneOf,
      storesCatalogV3InventoryItem_universal_d_SearchInventoryItemsWithOffsetResponse as SearchInventoryItemsWithOffsetResponse,
      PagingMetadata$1 as PagingMetadata,
      storesCatalogV3InventoryItem_universal_d_BulkDecrementInventoryItemsRequest as BulkDecrementInventoryItemsRequest,
      storesCatalogV3InventoryItem_universal_d_DecrementDataById as DecrementDataById,
      storesCatalogV3InventoryItem_universal_d_BulkDecrementInventoryItemsResponse as BulkDecrementInventoryItemsResponse,
      storesCatalogV3InventoryItem_universal_d_BulkIncrementInventoryItemsRequest as BulkIncrementInventoryItemsRequest,
      storesCatalogV3InventoryItem_universal_d_IncrementDataById as IncrementDataById,
      storesCatalogV3InventoryItem_universal_d_BulkIncrementInventoryItemsResponse as BulkIncrementInventoryItemsResponse,
      storesCatalogV3InventoryItem_universal_d_BulkDecrementInventoryItemsByVariantAndLocationRequest as BulkDecrementInventoryItemsByVariantAndLocationRequest,
      storesCatalogV3InventoryItem_universal_d_DecrementDataByVariantAndLocation as DecrementDataByVariantAndLocation,
      storesCatalogV3InventoryItem_universal_d_BulkDecrementInventoryItemsByVariantAndLocationResponse as BulkDecrementInventoryItemsByVariantAndLocationResponse,
      storesCatalogV3InventoryItem_universal_d_BulkIncrementInventoryItemsByVariantAndLocationRequest as BulkIncrementInventoryItemsByVariantAndLocationRequest,
      storesCatalogV3InventoryItem_universal_d_IncrementDataByVariantAndLocation as IncrementDataByVariantAndLocation,
      storesCatalogV3InventoryItem_universal_d_BulkIncrementInventoryItemsByVariantAndLocationResponse as BulkIncrementInventoryItemsByVariantAndLocationResponse,
      storesCatalogV3InventoryItem_universal_d_BulkSetInventoryItemsForProductsInLocationRequest as BulkSetInventoryItemsForProductsInLocationRequest,
      storesCatalogV3InventoryItem_universal_d_ProductInventoryItems as ProductInventoryItems,
      storesCatalogV3InventoryItem_universal_d_BulkSetInventoryItemsForProductsInLocationResponse as BulkSetInventoryItemsForProductsInLocationResponse,
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
      storesCatalogV3InventoryItem_universal_d_createInventoryItem as createInventoryItem,
      storesCatalogV3InventoryItem_universal_d_bulkCreateInventoryItems as bulkCreateInventoryItems,
      storesCatalogV3InventoryItem_universal_d_BulkCreateInventoryItemsOptions as BulkCreateInventoryItemsOptions,
      storesCatalogV3InventoryItem_universal_d_getInventoryItem as getInventoryItem,
      storesCatalogV3InventoryItem_universal_d_updateInventoryItem as updateInventoryItem,
      storesCatalogV3InventoryItem_universal_d_UpdateInventoryItem as UpdateInventoryItem,
      storesCatalogV3InventoryItem_universal_d_UpdateInventoryItemOptions as UpdateInventoryItemOptions,
      storesCatalogV3InventoryItem_universal_d_bulkUpdateInventoryItems as bulkUpdateInventoryItems,
      storesCatalogV3InventoryItem_universal_d_BulkUpdateInventoryItemsOptions as BulkUpdateInventoryItemsOptions,
      storesCatalogV3InventoryItem_universal_d_bulkUpdateInventoryItemsByFilter as bulkUpdateInventoryItemsByFilter,
      storesCatalogV3InventoryItem_universal_d_BulkUpdateInventoryItemsByFilterOptions as BulkUpdateInventoryItemsByFilterOptions,
      storesCatalogV3InventoryItem_universal_d_deleteInventoryItem as deleteInventoryItem,
      storesCatalogV3InventoryItem_universal_d_bulkDeleteInventoryItems as bulkDeleteInventoryItems,
      storesCatalogV3InventoryItem_universal_d_queryInventoryItems as queryInventoryItems,
      storesCatalogV3InventoryItem_universal_d_InventoryItemsQueryResult as InventoryItemsQueryResult,
      storesCatalogV3InventoryItem_universal_d_InventoryItemsQueryBuilder as InventoryItemsQueryBuilder,
      storesCatalogV3InventoryItem_universal_d_searchInventoryItems as searchInventoryItems,
      storesCatalogV3InventoryItem_universal_d_SearchInventoryItemsOptions as SearchInventoryItemsOptions,
      storesCatalogV3InventoryItem_universal_d_bulkDecrementInventoryItems as bulkDecrementInventoryItems,
      storesCatalogV3InventoryItem_universal_d_BulkDecrementInventoryItemsOptions as BulkDecrementInventoryItemsOptions,
      storesCatalogV3InventoryItem_universal_d_bulkIncrementInventoryItems as bulkIncrementInventoryItems,
      storesCatalogV3InventoryItem_universal_d_BulkIncrementInventoryItemsOptions as BulkIncrementInventoryItemsOptions,
      storesCatalogV3InventoryItem_universal_d_bulkDecrementInventoryItemsByVariantAndLocation as bulkDecrementInventoryItemsByVariantAndLocation,
      storesCatalogV3InventoryItem_universal_d_BulkDecrementInventoryItemsByVariantAndLocationOptions as BulkDecrementInventoryItemsByVariantAndLocationOptions,
      storesCatalogV3InventoryItem_universal_d_bulkIncrementInventoryItemsByVariantAndLocation as bulkIncrementInventoryItemsByVariantAndLocation,
      storesCatalogV3InventoryItem_universal_d_BulkIncrementInventoryItemsByVariantAndLocationOptions as BulkIncrementInventoryItemsByVariantAndLocationOptions,
      storesCatalogV3InventoryItem_universal_d_bulkSetInventoryItemsForProductsInLocation as bulkSetInventoryItemsForProductsInLocation,
      storesCatalogV3InventoryItem_universal_d_BulkSetInventoryItemsForProductsInLocationOptions as BulkSetInventoryItemsForProductsInLocationOptions,
    };
  }
  
  interface V3Product extends V3ProductTypedPropertiesOneOf {
      /**
       * Physical properties.
       *
       * Required when `productType: PHYSICAL`.
       */
      physicalProperties?: PhysicalProperties;
      /**
       * Product ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the product is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the product.
       *
       * Ignored when creating a product.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the product was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the product was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Unique numeric identifier for the product. Much more efficient for filter and sort than the `id`.
       * @internal
       * @readonly
       */
      numericId?: string;
      /** Product name. Translatable. */
      name?: string | null;
      /**
       * Product slug.
       *
       * If not provided, the slug is autogenerated based on the product name.
       */
      slug?: string | null;
      /**
       * URL to the site's product page.
       *
       * > **Note:** Returned only when you pass `"URL"` to the `fields` array in Products API requests.
       * @readonly
       */
      url?: string;
      /**
       * Product description using rich content.
       * > **Note:** Returned only when you pass `"DESCRIPTION"` to the `fields` array in Products API requests.
       *
       * <widget src="https://apps.wix.com/_serverless/ricos-playground-services/goto/api-component" plugins="indent.emoji.divider.codeBlock.file.gallery.giphy.image.table.link.textHighlight.textColor" exampleid="7dc9240e-d548-417a-abcf-0291b68b4303">
       * <a href="https://dev.wix.com/docs/ricos/api-reference/ricos-document">See Ricos document reference</a>
       * </widget>
       */
      description?: RichContent;
      /**
       * Product description in HTML.
       *
       * + When provided on create/update, this string must be a valid HTML. It will then be converted to rich content.
       * + `plainDescription` is ignored when value is also passed to the `description` field.
       * > **Note:** Returned only when you pass `"PLAIN_DESCRIPTION"` to the `fields` array in Products API requests.
       */
      plainDescription?: string | null;
      /**
       * Whether the product is visible to site visitors on the site.
       *
       * Default: `true`
       */
      visible?: boolean | null;
      /**
       * Whether the product is visible in POS (point of sale).
       *
       * Default: `true`
       * > **Note:** Always `false` for `productType: DIGITAL`.
       */
      visibleInPos?: boolean | null;
      /** Product media items. */
      media?: Media;
      /** Product SEO data. */
      seoData?: SeoSchema;
      /** Tax group ID. */
      taxGroupId?: string | null;
      /**
       * Product options. Allows the customer to customize the product. For example, selecting color, size, and more.
       *
       * Always generates variants: every variant must have exactly one choice related to each option.
       * Since options and variants tightly coupled and rely on each other they usually should be provided together in all operations.
       */
      options?: ConnectedOption[];
      /**
       * Product modifiers.
       *
       * Allows the customer to customize product, e.g. select Color, Size and so on similarly to `options` but with one main difference - `modifiers` never generate any variants.
       */
      modifiers?: ConnectedModifier[];
      /**
       * Product brand.
       *
       * + Pass `brand.name` to add a new brand while creating a product.
       * + Pass an existing brand's `id` to assign that brand to the product.
       */
      brand?: Brand;
      /**
       * Product info section.
       *
       * + Pass `infoSection.uniqueName`, `infoSection.title`, and `infoSection.description` to add a new info section while creating a product.
       * + Pass an existing info section's `id` or `uniqueName` to assign that info section to the product.
       */
      infoSections?: InfoSection[];
      /**
       * Product ribbon.
       *
       * + Pass `ribbon.name` to add a new ribbon while creating a product.
       * + Pass an existing ribbon's `id` or `name` to assign that ribbon to the product.
       */
      ribbon?: Ribbon$1;
      /**
       * List of categories that directly contain this product.
       *
       * Updated automatically when a product is added/removed from a category, when an item is moved within a category, or when a category is deleted.
       * > **Note:** Returned only when you pass `"DIRECT_CATEGORIES_INFO"` to the `fields` array in Products API requests.
       * @readonly
       */
      directCategoriesInfo?: ProductCategoriesInfo;
      /**
       * List of categories that directly contain this product, as well as their parent categories.
       * > **Note:** Returned only when you pass `"ALL_CATEGORIES_INFO"` to the `fields` array in Products API requests.
       * @readonly
       */
      allCategoriesInfo?: ProductCategoriesInfo;
      /** Main category ID. */
      mainCategoryId?: string | null;
      /**
       * internal util field to enable nile-search-related by shared categories
       * @internal
       * @readonly
       */
      directCategoryIdsInfo?: ProductCategoryIdsInfo;
      /**
       * Product base price range - minimum and maximum prices of all product variants.
       * @readonly
       * @deprecated Product base price range - minimum and maximum prices of all product variants.
       * @replacedBy compare_at_price_range
       * @targetRemovalDate 2024-12-31
       */
      basePriceRange?: PriceRange;
      /**
       * Product sale price range - minimum and maximum sale prices of all product variants.
       * @readonly
       * @deprecated Product sale price range - minimum and maximum sale prices of all product variants.
       * @replacedBy actual_price_range
       * @targetRemovalDate 2024-12-31
       */
      salePriceRange?: PriceRange;
      /**
       * Product cost range - minimum and maximum costs of all product variants.
       *
       * > **Note:** Returned only when the following conditions are met:
       * > + You pass `"MERCHANT_DATA"` to the `fields` array in Products API requests.
       * > + Your app has the required `SCOPE.STORES.PRODUCT_READ_ADMIN` permission scope.
       * @readonly
       */
      costRange?: PriceRange;
      /**
       * Product inventory info.
       * @readonly
       */
      inventory?: Inventory;
      /**
       * Product type.
       *
       * When passing `productType: PHYSICAL`, you must also pass `physicalProperties`.
       */
      productType?: ProductType;
      /**
       * A unique human-friendly identifier for the product.
       * Unlike the product ID, the handle can be set by the user to ensure consistency across multiple platforms.
       * In case handle wasn't given, the handle will be automatically generated.
       */
      handle?: string | null;
      /**
       * Currency used for the pricing of this product, in [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) format.
       *
       * Defaults to the currency defined in the site settings, unless specified in `x-wix-currency` header.
       * > **Note:** Returned only when you pass `"CURRENCY"` to the `fields` array in Products API requests.
       * @readonly
       */
      currency?: string | null;
      /**
       * Breadcrumbs of the `mainCategoryId`. Used to navigate to parent categories.
       * > **Note:** Returned only when you pass `"BREADCRUMBS_INFO"` to the `fields` array in Products API requests.
       * @readonly
       */
      breadcrumbsInfo?: BreadcrumbsInfo;
      /**
       * Product actual price range - minimum and maximum prices of all product variants.
       * @readonly
       */
      actualPriceRange?: PriceRange;
      /**
       * Product compare at price range - minimum and maximum compare at price prices of all product variants.
       * @readonly
       */
      compareAtPriceRange?: PriceRange;
      /** Product variants. */
      variantsInfo?: VariantsInfo;
      /**
       * Custom extended fields for the product object.
       *
       * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the app dashboard before they can be accessed with API calls.
       */
      extendedFields?: ExtendedFields;
      /**
       * SEO
       * @internal
       * @readonly
       */
      seoTitle?: string | null;
      /**
       * SEO description extracted from `seo_data` for backward compatibility.
       * @internal
       * @readonly
       */
      seoDescription?: string | null;
      /** Product subscriptions. */
      subscriptionDetails?: SubscriptionDetails;
      /**
       * internal util field to improve nile-search performance
       * @internal
       * @readonly
       */
      flattenOptions?: string[];
      /**
       * internal util field to improve nile-search performance
       * @internal
       * @readonly
       */
      flattenModifiers?: string[];
      /**
       * The total number of variants for the product.
       * @readonly
       */
      variantSummary?: VariantSummary;
      /**
       * Price info of the variant with minimum base price.
       * @internal
       * @readonly
       */
      minVariantPriceInfo?: MinVariantPriceInfo;
  }
  /** @oneof */
  interface V3ProductTypedPropertiesOneOf {
      /**
       * Physical properties.
       *
       * Required when `productType: PHYSICAL`.
       */
      physicalProperties?: PhysicalProperties;
  }
  interface RichContent {
      /** Node objects representing a rich content document. */
      nodes?: Node[];
      /** Object metadata. */
      metadata?: Metadata;
      /** Global styling for header, paragraph, block quote, and code block nodes in the object. */
      documentStyle?: DocumentStyle;
  }
  interface Node extends NodeDataOneOf {
      /** Data for a button node. */
      buttonData?: ButtonData;
      /** Data for a code block node. */
      codeBlockData?: CodeBlockData;
      /** Data for a divider node. */
      dividerData?: DividerData;
      /** Data for a file node. */
      fileData?: FileData;
      /** Data for a gallery node. */
      galleryData?: GalleryData;
      /** Data for a GIF node. */
      gifData?: GIFData;
      /** Data for a heading node. */
      headingData?: HeadingData;
      /** Data for an embedded HTML node. */
      htmlData?: HTMLData;
      /** Data for an image node. */
      imageData?: ImageData;
      /** Data for a link preview node. */
      linkPreviewData?: LinkPreviewData;
      /** @deprecated */
      mapData?: MapData;
      /** Data for a paragraph node. */
      paragraphData?: ParagraphData;
      /** Data for a poll node. */
      pollData?: PollData;
      /** Data for a text node. Used to apply decorations to text. */
      textData?: TextData;
      /** Data for an app embed node. */
      appEmbedData?: AppEmbedData;
      /** Data for a video node. */
      videoData?: VideoData;
      /** Data for an oEmbed node. */
      embedData?: EmbedData;
      /** Data for a collapsible list node. */
      collapsibleListData?: CollapsibleListData;
      /** Data for a table node. */
      tableData?: TableData;
      /** Data for a table cell node. */
      tableCellData?: TableCellData;
      /** Data for a custom external node. */
      externalData?: Record<string, any> | null;
      /** Data for an audio node. */
      audioData?: AudioData;
      /** Data for an ordered list node. */
      orderedListData?: OrderedListData;
      /** Data for a bulleted list node. */
      bulletedListData?: BulletedListData;
      /** Data for a block quote node. */
      blockquoteData?: BlockquoteData;
      /** Data for a caption node. */
      captionData?: CaptionData;
      /** Node type. Use `APP_EMBED` for nodes that embed content from other Wix apps. Use `EMBED` to embed content in [oEmbed](https://oembed.com/) format. */
      type?: NodeType;
      /** Node ID. */
      _id?: string;
      /** A list of child nodes. */
      nodes?: Node[];
      /** Padding and background color styling for the node. */
      style?: NodeStyle;
  }
  /** @oneof */
  interface NodeDataOneOf {
      /** Data for a button node. */
      buttonData?: ButtonData;
      /** Data for a code block node. */
      codeBlockData?: CodeBlockData;
      /** Data for a divider node. */
      dividerData?: DividerData;
      /** Data for a file node. */
      fileData?: FileData;
      /** Data for a gallery node. */
      galleryData?: GalleryData;
      /** Data for a GIF node. */
      gifData?: GIFData;
      /** Data for a heading node. */
      headingData?: HeadingData;
      /** Data for an embedded HTML node. */
      htmlData?: HTMLData;
      /** Data for an image node. */
      imageData?: ImageData;
      /** Data for a link preview node. */
      linkPreviewData?: LinkPreviewData;
      /** @deprecated */
      mapData?: MapData;
      /** Data for a paragraph node. */
      paragraphData?: ParagraphData;
      /** Data for a poll node. */
      pollData?: PollData;
      /** Data for a text node. Used to apply decorations to text. */
      textData?: TextData;
      /** Data for an app embed node. */
      appEmbedData?: AppEmbedData;
      /** Data for a video node. */
      videoData?: VideoData;
      /** Data for an oEmbed node. */
      embedData?: EmbedData;
      /** Data for a collapsible list node. */
      collapsibleListData?: CollapsibleListData;
      /** Data for a table node. */
      tableData?: TableData;
      /** Data for a table cell node. */
      tableCellData?: TableCellData;
      /** Data for a custom external node. */
      externalData?: Record<string, any> | null;
      /** Data for an audio node. */
      audioData?: AudioData;
      /** Data for an ordered list node. */
      orderedListData?: OrderedListData;
      /** Data for a bulleted list node. */
      bulletedListData?: BulletedListData;
      /** Data for a block quote node. */
      blockquoteData?: BlockquoteData;
      /** Data for a caption node. */
      captionData?: CaptionData;
  }
  enum NodeType {
      PARAGRAPH = "PARAGRAPH",
      TEXT = "TEXT",
      HEADING = "HEADING",
      BULLETED_LIST = "BULLETED_LIST",
      ORDERED_LIST = "ORDERED_LIST",
      LIST_ITEM = "LIST_ITEM",
      BLOCKQUOTE = "BLOCKQUOTE",
      CODE_BLOCK = "CODE_BLOCK",
      VIDEO = "VIDEO",
      DIVIDER = "DIVIDER",
      FILE = "FILE",
      GALLERY = "GALLERY",
      GIF = "GIF",
      HTML = "HTML",
      IMAGE = "IMAGE",
      LINK_PREVIEW = "LINK_PREVIEW",
      /** @deprecated */
      MAP = "MAP",
      POLL = "POLL",
      APP_EMBED = "APP_EMBED",
      BUTTON = "BUTTON",
      COLLAPSIBLE_LIST = "COLLAPSIBLE_LIST",
      TABLE = "TABLE",
      EMBED = "EMBED",
      COLLAPSIBLE_ITEM = "COLLAPSIBLE_ITEM",
      COLLAPSIBLE_ITEM_TITLE = "COLLAPSIBLE_ITEM_TITLE",
      COLLAPSIBLE_ITEM_BODY = "COLLAPSIBLE_ITEM_BODY",
      TABLE_CELL = "TABLE_CELL",
      TABLE_ROW = "TABLE_ROW",
      EXTERNAL = "EXTERNAL",
      AUDIO = "AUDIO",
      CAPTION = "CAPTION"
  }
  interface NodeStyle {
      /** The top padding value in pixels. */
      paddingTop?: string | null;
      /** The bottom padding value in pixels. */
      paddingBottom?: string | null;
      /** The background color as a hexadecimal value. */
      backgroundColor?: string | null;
  }
  interface ButtonData {
      /** Styling for the button's container. */
      containerData?: PluginContainerData;
      /** The button type. */
      type?: Type;
      /** Styling for the button. */
      styles?: Styles;
      /** The text to display on the button. */
      text?: string | null;
      /** Button link details. */
      link?: Link;
  }
  interface Border {
      /** Border width in pixels. */
      width?: number | null;
      /** Border radius in pixels. */
      radius?: number | null;
  }
  interface Colors {
      /** The text color as a hexadecimal value. */
      text?: string | null;
      /** The border color as a hexadecimal value. */
      border?: string | null;
      /** The background color as a hexadecimal value. */
      background?: string | null;
  }
  interface PluginContainerData {
      /** The width of the node when it's displayed. */
      width?: PluginContainerDataWidth;
      /** The node's alignment within its container. */
      alignment?: PluginContainerDataAlignment;
      /** Spoiler cover settings for the node. */
      spoiler?: Spoiler;
      /** The height of the node when it's displayed. */
      height?: Height;
      /** Sets whether text should wrap around this node when it's displayed. If `textWrap` is `false`, the node takes up the width of its container. Defaults to `true` for all node types except 'DIVIVDER' where it defaults to `false`. */
      textWrap?: boolean | null;
  }
  enum WidthType {
      /** Width matches the content width */
      CONTENT = "CONTENT",
      /** Small Width */
      SMALL = "SMALL",
      /** Width will match the original asset width */
      ORIGINAL = "ORIGINAL",
      /** coast-to-coast display */
      FULL_WIDTH = "FULL_WIDTH"
  }
  interface PluginContainerDataWidth extends PluginContainerDataWidthDataOneOf {
      /**
       * One of the following predefined width options:
       * `CONTENT`: The width of the container matches the content width.
       * `SMALL`: A small width.
       * `ORIGINAL`: For `imageData` containers only. The width of the container matches the original image width.
       * `FULL_WIDTH`: For `imageData` containers only. The image container takes up the full width of the screen.
       */
      size?: WidthType;
      /** A custom width value in pixels. */
      custom?: string | null;
  }
  /** @oneof */
  interface PluginContainerDataWidthDataOneOf {
      /**
       * One of the following predefined width options:
       * `CONTENT`: The width of the container matches the content width.
       * `SMALL`: A small width.
       * `ORIGINAL`: For `imageData` containers only. The width of the container matches the original image width.
       * `FULL_WIDTH`: For `imageData` containers only. The image container takes up the full width of the screen.
       */
      size?: WidthType;
      /** A custom width value in pixels. */
      custom?: string | null;
  }
  enum PluginContainerDataAlignment {
      /** Center Alignment */
      CENTER = "CENTER",
      /** Left Alignment */
      LEFT = "LEFT",
      /** Right Alignment */
      RIGHT = "RIGHT"
  }
  interface Spoiler {
      /** Sets whether the spoiler cover is enabled for this node. Defaults to `false`. */
      enabled?: boolean | null;
      /** The description displayed on top of the spoiler cover. */
      description?: string | null;
      /** The text for the button used to remove the spoiler cover. */
      buttonText?: string | null;
  }
  interface Height {
      /** A custom height value in pixels. */
      custom?: string | null;
  }
  enum Type {
      /** Regular link button */
      LINK = "LINK",
      /** Triggers custom action that is defined in plugin configuration by the consumer */
      ACTION = "ACTION"
  }
  interface Styles {
      /** Border attributes. */
      border?: Border;
      /** Color attributes. */
      colors?: Colors;
  }
  interface Link extends LinkDataOneOf {
      /** The absolute URL for the linked document. */
      url?: string;
      /** The target node's ID. Used for linking to another node in this object. */
      anchor?: string;
      /**
       * he HTML `target` attribute value for the link. This property defines where the linked document opens as follows:
       * `SELF` - Default. Opens the linked document in the same frame as the link.
       * `BLANK` - Opens the linked document in a new browser tab or window.
       * `PARENT` - Opens the linked document in the link's parent frame.
       * `TOP` - Opens the linked document in the full body of the link's browser tab or window.
       */
      target?: Target;
      /** The HTML `rel` attribute value for the link. This object specifies the relationship between the current document and the linked document. */
      rel?: Rel;
      /** A serialized object used for a custom or external link panel. */
      customData?: string | null;
  }
  /** @oneof */
  interface LinkDataOneOf {
      /** The absolute URL for the linked document. */
      url?: string;
      /** The target node's ID. Used for linking to another node in this object. */
      anchor?: string;
  }
  enum Target {
      /** Opens the linked document in the same frame as it was clicked (this is default) */
      SELF = "SELF",
      /** Opens the linked document in a new window or tab */
      BLANK = "BLANK",
      /** Opens the linked document in the parent frame */
      PARENT = "PARENT",
      /** Opens the linked document in the full body of the window */
      TOP = "TOP"
  }
  interface Rel {
      /** Indicates to search engine crawlers not to follow the link. Defaults to `false`. */
      nofollow?: boolean | null;
      /** Indicates to search engine crawlers that the link is a paid placement such as sponsored content or an advertisement. Defaults to `false`. */
      sponsored?: boolean | null;
      /** Indicates that this link is user-generated content and isn't necessarily trusted or endorsed by the page’s author. For example, a link in a fourm post. Defaults to `false`. */
      ugc?: boolean | null;
      /** Indicates that this link protect referral information from being passed to the target website. */
      noreferrer?: boolean | null;
  }
  interface CodeBlockData {
      /** Styling for the code block's text. */
      textStyle?: TextStyle;
  }
  interface TextStyle {
      /** Text alignment. Defaults to `AUTO`. */
      textAlignment?: TextAlignment;
      /** A CSS `line-height` value for the text expressed as a ratio relative to the font size. For example, if the font size is 20px, a `lineHeight` value of `'1.5'`` results in a line height of 30px. */
      lineHeight?: string | null;
  }
  enum TextAlignment {
      /** browser default, eqivalent to `initial` */
      AUTO = "AUTO",
      /** Left align */
      LEFT = "LEFT",
      /** Right align */
      RIGHT = "RIGHT",
      /** Center align */
      CENTER = "CENTER",
      /** Text is spaced to line up its left and right edges to the left and right edges of the line box, except for the last line */
      JUSTIFY = "JUSTIFY"
  }
  interface DividerData {
      /** Styling for the divider's container. */
      containerData?: PluginContainerData;
      /** Divider line style. */
      lineStyle?: LineStyle;
      /** Divider width. */
      width?: Width;
      /** Divider alignment. */
      alignment?: Alignment;
  }
  enum LineStyle {
      /** Single Line */
      SINGLE = "SINGLE",
      /** Double Line */
      DOUBLE = "DOUBLE",
      /** Dashed Line */
      DASHED = "DASHED",
      /** Dotted Line */
      DOTTED = "DOTTED"
  }
  enum Width {
      /** Large line */
      LARGE = "LARGE",
      /** Medium line */
      MEDIUM = "MEDIUM",
      /** Small line */
      SMALL = "SMALL"
  }
  enum Alignment {
      /** Center alignment */
      CENTER = "CENTER",
      /** Left alignment */
      LEFT = "LEFT",
      /** Right alignment */
      RIGHT = "RIGHT"
  }
  interface FileData {
      /** Styling for the file's container. */
      containerData?: PluginContainerData;
      /** The source for the file's data. */
      src?: FileSource;
      /** File name. */
      name?: string | null;
      /** File type. */
      type?: string | null;
      /**
       * Use `sizeInKb` instead.
       * @deprecated
       */
      size?: number | null;
      /** Settings for PDF files. */
      pdfSettings?: PDFSettings;
      /** File MIME type. */
      mimeType?: string | null;
      /** File path. */
      path?: string | null;
      /** File size in KB. */
      sizeInKb?: string | null;
  }
  enum ViewMode {
      /** No PDF view */
      NONE = "NONE",
      /** Full PDF view */
      FULL = "FULL",
      /** Mini PDF view */
      MINI = "MINI"
  }
  interface FileSource extends FileSourceDataOneOf {
      /** The absolute URL for the file's source. */
      url?: string | null;
      /**
       * Custom ID. Use `id` instead.
       * @deprecated
       */
      custom?: string | null;
      /** An ID that's resolved to a URL by a resolver function. */
      _id?: string | null;
      /** Indicates whether the file's source is private. Defaults to `false`. */
      private?: boolean | null;
  }
  /** @oneof */
  interface FileSourceDataOneOf {
      /** The absolute URL for the file's source. */
      url?: string | null;
      /**
       * Custom ID. Use `id` instead.
       * @deprecated
       */
      custom?: string | null;
      /** An ID that's resolved to a URL by a resolver function. */
      _id?: string | null;
  }
  interface PDFSettings {
      /**
       * PDF view mode. One of the following:
       * `NONE` : The PDF isn't displayed.
       * `FULL` : A full page view of the PDF is displayed.
       * `MINI` : A mini view of the PDF is displayed.
       */
      viewMode?: ViewMode;
      /** Sets whether the PDF download button is disabled. Defaults to `false`. */
      disableDownload?: boolean | null;
      /** Sets whether the PDF print button is disabled. Defaults to `false`. */
      disablePrint?: boolean | null;
  }
  interface GalleryData {
      /** Styling for the gallery's container. */
      containerData?: PluginContainerData;
      /** The items in the gallery. */
      items?: Item[];
      /** Options for defining the gallery's appearance. */
      options?: GalleryOptions;
      /** Sets whether the gallery's expand button is disabled. Defaults to `false`. */
      disableExpand?: boolean | null;
      /** Sets whether the gallery's download button is disabled. Defaults to `false`. */
      disableDownload?: boolean | null;
  }
  interface V1Media {
      /** The source for the media's data. */
      src?: FileSource;
      /** Media width in pixels. */
      width?: number | null;
      /** Media height in pixels. */
      height?: number | null;
      /** Media duration in seconds. Only relevant for audio and video files. */
      duration?: number | null;
  }
  interface Image {
      /** Image file details. */
      media?: V1Media;
      /** Link details for images that are links. */
      link?: Link;
  }
  interface Video {
      /** Video file details. */
      media?: V1Media;
      /** Video thumbnail file details. */
      thumbnail?: V1Media;
  }
  interface Item extends ItemDataOneOf {
      /** An image item. */
      image?: Image;
      /** A video item. */
      video?: Video;
      /** Item title. */
      title?: string | null;
      /** Item's alternative text. */
      altText?: string | null;
  }
  /** @oneof */
  interface ItemDataOneOf {
      /** An image item. */
      image?: Image;
      /** A video item. */
      video?: Video;
  }
  interface GalleryOptions {
      /** Gallery layout. */
      layout?: Layout;
      /** Styling for gallery items. */
      item?: ItemStyle;
      /** Styling for gallery thumbnail images. */
      thumbnails?: Thumbnails;
  }
  enum LayoutType {
      /** Collage type */
      COLLAGE = "COLLAGE",
      /** Masonry type */
      MASONRY = "MASONRY",
      /** Grid type */
      GRID = "GRID",
      /** Thumbnail type */
      THUMBNAIL = "THUMBNAIL",
      /** Slider type */
      SLIDER = "SLIDER",
      /** Slideshow type */
      SLIDESHOW = "SLIDESHOW",
      /** Panorama type */
      PANORAMA = "PANORAMA",
      /** Column type */
      COLUMN = "COLUMN",
      /** Magic type */
      MAGIC = "MAGIC",
      /** Fullsize images type */
      FULLSIZE = "FULLSIZE"
  }
  enum Orientation {
      /** Rows Orientation */
      ROWS = "ROWS",
      /** Columns Orientation */
      COLUMNS = "COLUMNS"
  }
  enum Crop {
      /** Crop to fill */
      FILL = "FILL",
      /** Crop to fit */
      FIT = "FIT"
  }
  enum ThumbnailsAlignment {
      /** Top alignment */
      TOP = "TOP",
      /** Right alignment */
      RIGHT = "RIGHT",
      /** Bottom alignment */
      BOTTOM = "BOTTOM",
      /** Left alignment */
      LEFT = "LEFT",
      /** No thumbnail */
      NONE = "NONE"
  }
  interface Layout {
      /** Gallery layout type. */
      type?: LayoutType;
      /** Sets whether horizontal scroll is enabled. Defaults to `true` unless the layout `type` is set to `GRID` or `COLLAGE`. */
      horizontalScroll?: boolean | null;
      /** Gallery orientation. */
      orientation?: Orientation;
      /** The number of columns to display on full size screens. */
      numberOfColumns?: number | null;
      /** The number of columns to display on mobile screens. */
      mobileNumberOfColumns?: number | null;
  }
  interface ItemStyle {
      /** Desirable dimension for each item in pixels (behvaior changes according to gallery type) */
      targetSize?: number | null;
      /** Item ratio */
      ratio?: number | null;
      /** Sets how item images are cropped. */
      crop?: Crop;
      /** The spacing between items in pixels. */
      spacing?: number | null;
  }
  interface Thumbnails {
      /** Thumbnail alignment. */
      placement?: ThumbnailsAlignment;
      /** Spacing between thumbnails in pixels. */
      spacing?: number | null;
  }
  interface GIFData {
      /** Styling for the GIF's container. */
      containerData?: PluginContainerData;
      /** The source of the full size GIF. */
      original?: GIF;
      /** The source of the downsized GIF. */
      downsized?: GIF;
      /** Height in pixels. */
      height?: number;
      /** Width in pixels. */
      width?: number;
  }
  interface GIF {
      /** GIF format URL. */
      gif?: string | null;
      /** MP4 format URL. */
      mp4?: string | null;
      /** Thumbnail URL. */
      still?: string | null;
  }
  interface HeadingData {
      /** Heading level from 1-6. */
      level?: number;
      /** Styling for the heading text. */
      textStyle?: TextStyle;
      /** Indentation level from 1-4. */
      indentation?: number | null;
  }
  interface HTMLData extends HTMLDataDataOneOf {
      /** The URL for the HTML code for the node. */
      url?: string;
      /** The HTML code for the node. */
      html?: string;
      /**
       * Whether this is an AdSense element. Use `source` instead.
       * @deprecated
       */
      isAdsense?: boolean | null;
      /** Styling for the HTML node's container. */
      containerData?: PluginContainerData;
      /** The type of HTML code. */
      source?: Source;
  }
  /** @oneof */
  interface HTMLDataDataOneOf {
      /** The URL for the HTML code for the node. */
      url?: string;
      /** The HTML code for the node. */
      html?: string;
      /**
       * Whether this is an AdSense element. Use `source` instead.
       * @deprecated
       */
      isAdsense?: boolean | null;
  }
  enum Source {
      HTML = "HTML",
      ADSENSE = "ADSENSE"
  }
  interface ImageData {
      /** Styling for the image's container. */
      containerData?: PluginContainerData;
      /** Image file details. */
      image?: V1Media;
      /** Link details for images that are links. */
      link?: Link;
      /** Sets whether the image expands to full screen when clicked. Defaults to `false`. */
      disableExpand?: boolean | null;
      /** Image's alternative text. */
      altText?: string | null;
      /**
       * Deprecated: use Caption node instead.
       * @deprecated
       */
      caption?: string | null;
      /** Sets whether the image's download button is disabled. Defaults to `false`. */
      disableDownload?: boolean | null;
  }
  interface LinkPreviewData {
      /** Styling for the link preview's container. */
      containerData?: PluginContainerData;
      /** Link details. */
      link?: Link;
      /** Preview title. */
      title?: string | null;
      /** Preview thumbnail URL. */
      thumbnailUrl?: string | null;
      /** Preview description. */
      description?: string | null;
      /** The preview content as HTML. */
      html?: string | null;
  }
  interface MapData {
      /** Styling for the map's container. */
      containerData?: PluginContainerData;
      /** Map settings. */
      mapSettings?: MapSettings;
  }
  interface MapSettings {
      /** The address to display on the map. */
      address?: string | null;
      /** Sets whether the map is draggable. */
      draggable?: boolean | null;
      /** Sets whether the location marker is visible. */
      marker?: boolean | null;
      /** Sets whether street view control is enabled. */
      streetViewControl?: boolean | null;
      /** Sets whether zoom control is enabled. */
      zoomControl?: boolean | null;
      /** Location latitude. */
      lat?: number | null;
      /** Location longitude. */
      lng?: number | null;
      /** Location name. */
      locationName?: string | null;
      /** Sets whether view mode control is enabled. */
      viewModeControl?: boolean | null;
      /** Initial zoom value. */
      initialZoom?: number | null;
      /** Map type. `HYBRID` is a combination of the `ROADMAP` and `SATELLITE` map types. */
      mapType?: MapType;
  }
  enum MapType {
      /** Roadmap map type */
      ROADMAP = "ROADMAP",
      /** Satellite map type */
      SATELITE = "SATELITE",
      /** Hybrid map type */
      HYBRID = "HYBRID",
      /** Terrain map type */
      TERRAIN = "TERRAIN"
  }
  interface ParagraphData {
      /** Styling for the paragraph text. */
      textStyle?: TextStyle;
      /** Indentation level from 1-4. */
      indentation?: number | null;
      /** Paragraph level */
      level?: number | null;
  }
  interface PollData {
      /** Styling for the poll's container. */
      containerData?: PluginContainerData;
      /** Poll data. */
      poll?: Poll;
      /** Layout settings for the poll and voting options. */
      layout?: PollDataLayout;
      /** Styling for the poll and voting options. */
      design?: Design;
  }
  enum ViewRole {
      /** Only Poll creator can view the results */
      CREATOR = "CREATOR",
      /** Anyone who voted can see the results */
      VOTERS = "VOTERS",
      /** Anyone can see the results, even if one didn't vote */
      EVERYONE = "EVERYONE"
  }
  enum VoteRole {
      /** Logged in member */
      SITE_MEMBERS = "SITE_MEMBERS",
      /** Anyone */
      ALL = "ALL"
  }
  interface Permissions {
      /** Sets who can view the poll results. */
      view?: ViewRole;
      /** Sets who can vote. */
      vote?: VoteRole;
      /** Sets whether one voter can vote multiple times. Defaults to `false`. */
      allowMultipleVotes?: boolean | null;
  }
  interface Option {
      /** Option ID. */
      _id?: string | null;
      /** Option title. */
      title?: string | null;
      /** The image displayed with the option. */
      image?: V1Media;
  }
  interface PollSettings {
      /** Permissions settings for voting. */
      permissions?: Permissions;
      /** Sets whether voters are displayed in the vote results. Defaults to `true`. */
      showVoters?: boolean | null;
      /** Sets whether the vote count is displayed. Defaults to `true`. */
      showVotesCount?: boolean | null;
  }
  enum PollLayoutType {
      /** List */
      LIST = "LIST",
      /** Grid */
      GRID = "GRID"
  }
  enum PollLayoutDirection {
      /** Left-to-right */
      LTR = "LTR",
      /** Right-to-left */
      RTL = "RTL"
  }
  interface PollLayout {
      /** The layout for displaying the voting options. */
      type?: PollLayoutType;
      /** The direction of the text displayed in the voting options. Text can be displayed either right-to-left or left-to-right. */
      direction?: PollLayoutDirection;
      /** Sets whether to display the main poll image. Defaults to `false`. */
      enableImage?: boolean | null;
  }
  interface OptionLayout {
      /** Sets whether to display option images. Defaults to `false`. */
      enableImage?: boolean | null;
  }
  enum BackgroundType {
      /** Color background type */
      COLOR = "COLOR",
      /** Image background type */
      IMAGE = "IMAGE",
      /** Gradiant background type */
      GRADIENT = "GRADIENT"
  }
  interface Gradient {
      /** The gradient angle in degrees. */
      angle?: number | null;
      /** The start color as a hexademical value. */
      startColor?: string | null;
      /** The end color as a hexademical value. */
      lastColor?: string | null;
  }
  interface Background extends BackgroundBackgroundOneOf {
      /** The background color as a hexademical value. */
      color?: string | null;
      /** An image to use for the background. */
      image?: V1Media;
      /** Details for a gradient background. */
      gradient?: Gradient;
      /** Background type. For each option, include the relevant details. */
      type?: BackgroundType;
  }
  /** @oneof */
  interface BackgroundBackgroundOneOf {
      /** The background color as a hexademical value. */
      color?: string | null;
      /** An image to use for the background. */
      image?: V1Media;
      /** Details for a gradient background. */
      gradient?: Gradient;
  }
  interface PollDesign {
      /** Background styling. */
      background?: Background;
      /** Border radius in pixels. */
      borderRadius?: number | null;
  }
  interface OptionDesign {
      /** Border radius in pixels. */
      borderRadius?: number | null;
  }
  interface Poll {
      /** Poll ID. */
      _id?: string | null;
      /** Poll title. */
      title?: string | null;
      /** Poll creator ID. */
      creatorId?: string | null;
      /** Main poll image. */
      image?: V1Media;
      /** Voting options. */
      options?: Option[];
      /** The poll's permissions and display settings. */
      settings?: PollSettings;
  }
  interface PollDataLayout {
      /** Poll layout settings. */
      poll?: PollLayout;
      /** Voting otpions layout settings. */
      options?: OptionLayout;
  }
  interface Design {
      /** Styling for the poll. */
      poll?: PollDesign;
      /** Styling for voting options. */
      options?: OptionDesign;
  }
  interface TextData {
      /** The text to apply decorations to. */
      text?: string;
      /** The decorations to apply. */
      decorations?: Decoration[];
  }
  /** Adds appearence changes to text */
  interface Decoration extends DecorationDataOneOf {
      /** Data for an anchor link decoration. */
      anchorData?: AnchorData;
      /** Data for a color decoration. */
      colorData?: ColorData;
      /** Data for an external link decoration. */
      linkData?: LinkData;
      /** Data for a mention decoration. */
      mentionData?: MentionData;
      /** Data for a font size decoration. */
      fontSizeData?: FontSizeData;
      /** Font weight for a bold decoration. */
      fontWeightValue?: number | null;
      /** Data for an italic decoration. Defaults to `true`. */
      italicData?: boolean | null;
      /** Data for an underline decoration. Defaults to `true`. */
      underlineData?: boolean | null;
      /** Data for a spoiler decoration. */
      spoilerData?: SpoilerData;
      /** The type of decoration to apply. */
      type?: DecorationType;
  }
  /** @oneof */
  interface DecorationDataOneOf {
      /** Data for an anchor link decoration. */
      anchorData?: AnchorData;
      /** Data for a color decoration. */
      colorData?: ColorData;
      /** Data for an external link decoration. */
      linkData?: LinkData;
      /** Data for a mention decoration. */
      mentionData?: MentionData;
      /** Data for a font size decoration. */
      fontSizeData?: FontSizeData;
      /** Font weight for a bold decoration. */
      fontWeightValue?: number | null;
      /** Data for an italic decoration. Defaults to `true`. */
      italicData?: boolean | null;
      /** Data for an underline decoration. Defaults to `true`. */
      underlineData?: boolean | null;
      /** Data for a spoiler decoration. */
      spoilerData?: SpoilerData;
  }
  enum DecorationType {
      BOLD = "BOLD",
      ITALIC = "ITALIC",
      UNDERLINE = "UNDERLINE",
      SPOILER = "SPOILER",
      ANCHOR = "ANCHOR",
      MENTION = "MENTION",
      LINK = "LINK",
      COLOR = "COLOR",
      FONT_SIZE = "FONT_SIZE",
      EXTERNAL = "EXTERNAL"
  }
  interface AnchorData {
      /** The target node's ID. */
      anchor?: string;
  }
  interface ColorData {
      /** The text's background color as a hexadecimal value. */
      background?: string | null;
      /** The text's foreground color as a hexadecimal value. */
      foreground?: string | null;
  }
  interface LinkData {
      /** Link details. */
      link?: Link;
  }
  interface MentionData {
      /** The mentioned user's name. */
      name?: string;
      /** The version of the user's name that appears after the `@` character in the mention. */
      slug?: string;
      /** Mentioned user's ID. */
      _id?: string | null;
  }
  interface FontSizeData {
      /** The units used for the font size. */
      unit?: FontType;
      /** Font size value. */
      value?: number | null;
  }
  enum FontType {
      PX = "PX",
      EM = "EM"
  }
  interface SpoilerData {
      /** Spoiler ID. */
      _id?: string | null;
  }
  interface AppEmbedData extends AppEmbedDataAppDataOneOf {
      /** Data for embedded Wix Bookings content. */
      bookingData?: BookingData;
      /** Data for embedded Wix Events content. */
      eventData?: EventData;
      /** The type of Wix App content being embedded. */
      type?: AppType;
      /** The ID of the embedded content. */
      itemId?: string | null;
      /** The name of the embedded content. */
      name?: string | null;
      /**
       * Deprecated: Use `image` instead.
       * @deprecated
       */
      imageSrc?: string | null;
      /** The URL for the embedded content. */
      url?: string | null;
      /** An image for the embedded content. */
      image?: V1Media;
  }
  /** @oneof */
  interface AppEmbedDataAppDataOneOf {
      /** Data for embedded Wix Bookings content. */
      bookingData?: BookingData;
      /** Data for embedded Wix Events content. */
      eventData?: EventData;
  }
  enum AppType {
      PRODUCT = "PRODUCT",
      EVENT = "EVENT",
      BOOKING = "BOOKING"
  }
  interface BookingData {
      /** Booking duration in minutes. */
      durations?: string | null;
  }
  interface EventData {
      /** Event schedule. */
      scheduling?: string | null;
      /** Event location. */
      location?: string | null;
  }
  interface VideoData {
      /** Styling for the video's container. */
      containerData?: PluginContainerData;
      /** Video details. */
      video?: V1Media;
      /** Video thumbnail details. */
      thumbnail?: V1Media;
      /** Sets whether the video's download button is disabled. Defaults to `false`. */
      disableDownload?: boolean | null;
      /** Video title. */
      title?: string | null;
      /** Video options. */
      options?: PlaybackOptions;
  }
  interface PlaybackOptions {
      /** Sets whether the media will automatically start playing. */
      autoPlay?: boolean | null;
      /** Sets whether media's will be looped. */
      playInLoop?: boolean | null;
      /** Sets whether media's controls will be shown. */
      showControls?: boolean | null;
  }
  interface EmbedData {
      /** Styling for the oEmbed node's container. */
      containerData?: PluginContainerData;
      /** An [oEmbed](https://www.oembed.com) object. */
      oembed?: Oembed;
      /** Origin asset source. */
      src?: string | null;
  }
  interface Oembed {
      /** The resource type. */
      type?: string | null;
      /** The width of the resource specified in the `url` property in pixels. */
      width?: number | null;
      /** The height of the resource specified in the `url` property in pixels. */
      height?: number | null;
      /** Resource title. */
      title?: string | null;
      /** The source URL for the resource. */
      url?: string | null;
      /** HTML for embedding a video player. The HTML should have no padding or margins. */
      html?: string | null;
      /** The name of the author or owner of the resource. */
      authorName?: string | null;
      /** The URL for the author or owner of the resource. */
      authorUrl?: string | null;
      /** The name of the resource provider. */
      providerName?: string | null;
      /** The URL for the resource provider. */
      providerUrl?: string | null;
      /** The URL for a thumbnail image for the resource. If this property is defined, `thumbnailWidth` and `thumbnailHeight` must also be defined. */
      thumbnailUrl?: string | null;
      /** The width of the resource's thumbnail image. If this property is defined, `thumbnailUrl` and `thumbnailHeight` must also be defined. */
      thumbnailWidth?: string | null;
      /** The height of the resource's thumbnail image. If this property is defined, `thumbnailUrl` and `thumbnailWidth`must also be defined. */
      thumbnailHeight?: string | null;
      /** The URL for an embedded viedo. */
      videoUrl?: string | null;
      /** The oEmbed version number.  This value must be `1.0`. */
      version?: string | null;
  }
  interface CollapsibleListData {
      /** Styling for the collapsible list's container. */
      containerData?: PluginContainerData;
      /** If `true`, only one item can be expanded at a time. Defaults to `false`. */
      expandOnlyOne?: boolean | null;
      /** Sets which items are expanded when the page loads. */
      initialExpandedItems?: InitialExpandedItems;
      /** The direction of the text in the list. Either left-to-right or right-to-left. */
      direction?: Direction;
      /** If `true`, The collapsible item will appear in search results as an FAQ. */
      isQapageData?: boolean | null;
  }
  enum InitialExpandedItems {
      /** First item will be expended initally */
      FIRST = "FIRST",
      /** All items will expended initally */
      ALL = "ALL",
      /** All items collapsed initally */
      NONE = "NONE"
  }
  enum Direction {
      /** Left-to-right */
      LTR = "LTR",
      /** Right-to-left */
      RTL = "RTL"
  }
  interface TableData {
      /** Styling for the table's container. */
      containerData?: PluginContainerData;
      /** The table's dimensions. */
      dimensions?: Dimensions;
      /**
       * Deprecated: Use `rowHeader` and `columnHeader` instead.
       * @deprecated
       */
      header?: boolean | null;
      /** Sets whether the table's first row is a header. Defaults to `false`. */
      rowHeader?: boolean | null;
      /** Sets whether the table's first column is a header. Defaults to `false`. */
      columnHeader?: boolean | null;
  }
  interface Dimensions {
      /** An array representing relative width of each column in relation to the other columns. */
      colsWidthRatio?: number[];
      /** An array representing the height of each row in pixels. */
      rowsHeight?: number[];
      /** An array representing the minimum width of each column in pixels. */
      colsMinWidth?: number[];
  }
  interface TableCellData {
      /** Styling for the cell's background color and text alignment. */
      cellStyle?: CellStyle;
      /** The cell's border colors. */
      borderColors?: BorderColors;
  }
  enum VerticalAlignment {
      /** Top alignment */
      TOP = "TOP",
      /** Middle alignment */
      MIDDLE = "MIDDLE",
      /** Bottom alignment */
      BOTTOM = "BOTTOM"
  }
  interface CellStyle {
      /** Vertical alignment for the cell's text. */
      verticalAlignment?: VerticalAlignment;
      /** Cell background color as a hexadecimal value. */
      backgroundColor?: string | null;
  }
  interface BorderColors {
      /** Left border color as a hexadecimal value. */
      left?: string | null;
      /** Right border color as a hexadecimal value. */
      right?: string | null;
      /** Top border color as a hexadecimal value. */
      top?: string | null;
      /** Bottom border color as a hexadecimal value. */
      bottom?: string | null;
  }
  /**
   * `NullValue` is a singleton enumeration to represent the null value for the
   * `Value` type union.
   *
   * The JSON representation for `NullValue` is JSON `null`.
   */
  enum NullValue {
      /** Null value. */
      NULL_VALUE = "NULL_VALUE"
  }
  /**
   * `ListValue` is a wrapper around a repeated field of values.
   *
   * The JSON representation for `ListValue` is JSON array.
   */
  interface ListValue {
      /** Repeated field of dynamically typed values. */
      values?: any[];
  }
  interface AudioData {
      /** Styling for the audio node's container. */
      containerData?: PluginContainerData;
      /** Audio file details. */
      audio?: V1Media;
      /** Sets whether the audio node's download button is disabled. Defaults to `false`. */
      disableDownload?: boolean | null;
      /** Cover image. */
      coverImage?: V1Media;
      /** Track name. */
      name?: string | null;
      /** Author name. */
      authorName?: string | null;
      /** An HTML version of the audio node. */
      html?: string | null;
  }
  interface OrderedListData {
      /** Indentation level from 0-4. */
      indentation?: number;
      /** Offset level from 0-4. */
      offset?: number | null;
      /** List start number. */
      start?: number | null;
  }
  interface BulletedListData {
      /** Indentation level from 0-4. */
      indentation?: number;
      /** Offset level from 0-4. */
      offset?: number | null;
  }
  interface BlockquoteData {
      /** Indentation level from 1-4. */
      indentation?: number;
  }
  interface CaptionData {
      textStyle?: TextStyle;
  }
  interface Metadata {
      /** Schema version. */
      version?: number;
      /**
       * When the object was created.
       * @readonly
       * @deprecated
       */
      createdTimestamp?: Date | null;
      /**
       * When the object was most recently updated.
       * @deprecated
       */
      updatedTimestamp?: Date | null;
      /** Object ID. */
      _id?: string | null;
  }
  interface DocumentStyle {
      /** Styling for H1 nodes. */
      headerOne?: TextNodeStyle;
      /** Styling for H2 nodes. */
      headerTwo?: TextNodeStyle;
      /** Styling for H3 nodes. */
      headerThree?: TextNodeStyle;
      /** Styling for H4 nodes. */
      headerFour?: TextNodeStyle;
      /** Styling for H5 nodes. */
      headerFive?: TextNodeStyle;
      /** Styling for H6 nodes. */
      headerSix?: TextNodeStyle;
      /** Styling for paragraph nodes. */
      paragraph?: TextNodeStyle;
      /** Styling for block quote nodes. */
      blockquote?: TextNodeStyle;
      /** Styling for code block nodes. */
      codeBlock?: TextNodeStyle;
  }
  interface TextNodeStyle {
      /** The decorations to apply to the node. */
      decorations?: Decoration[];
      /** Padding and background color for the node. */
      nodeStyle?: NodeStyle;
      /** Line height for text in the node. */
      lineHeight?: string | null;
  }
  interface Media {
      /**
       * Main media (image, video, etc.) associated with this product.
       * @readonly
       */
      main?: ProductMedia;
      /**
       * All media items.
       * > **Note:** Returned only when you pass `"MEDIA_ITEMS_INFO"` to the `fields` array in Products API requests.
       */
      itemsInfo?: MediaItemsInfo;
  }
  interface ProductMedia extends ProductMediaSetByOneOf, ProductMediaMediaOneOf {
      /** ID of existing media from Wix Media Manager. */
      _id?: string;
      /** Media URL. */
      url?: string;
      /**
       * Product image.
       * @readonly
       */
      image?: string;
      /**
       * Product video.
       * @readonly
       */
      video?: string;
      /** Image alt text. */
      altText?: string | null;
      /**
       * Media display name.
       * Allows to override the default media name. Can be passed only when `setBy: url`.
       */
      displayName?: string | null;
      /**
       * Media type.
       * @readonly
       */
      mediaType?: MediaType;
      /**
       * Media thumbnail.
       * > **Note:** Returned only when you pass `"THUMBNAIL"` to the `fields` array in Products API requests.
       */
      thumbnail?: Thumbnail;
      /**
       * ID used to upload media to Wix Media Manager.
       * @readonly
       */
      uploadId?: string;
  }
  /** @oneof */
  interface ProductMediaSetByOneOf {
      /** ID of existing media from Wix Media Manager. */
      _id?: string;
      /** Media URL. */
      url?: string;
  }
  /** @oneof */
  interface ProductMediaMediaOneOf {
      /**
       * Product image.
       * @readonly
       */
      image?: string;
      /**
       * Product video.
       * @readonly
       */
      video?: string;
  }
  interface VideoResolution {
      /** Video URL. */
      url?: string;
      /** Video height. */
      height?: number;
      /** Video width. */
      width?: number;
      /**
       * Deprecated. Use the `posters` property in the parent entity instead.
       * @internal
       * @deprecated Deprecated. Use the `posters` property in the parent entity instead.
       */
      poster?: string;
      /** Video format for example, mp4, hls. */
      format?: string;
      /**
       * Deprecated. Use the `urlExpirationDate` property in the parent entity instead.
       * @internal
       * @deprecated Deprecated. Use the `urlExpirationDate` property in the parent entity instead.
       * @replacedBy VideoV2.url_expiration_date
       */
      urlExpirationDate?: Date | null;
      /**
       * Deprecated. Use the `sizeInBytes` property in the parent entity instead. Size cannot be provided per resolution.
       * @internal
       * @deprecated Deprecated. Use the `sizeInBytes` property in the parent entity instead. Size cannot be provided per resolution.
       * @replacedBy VideoV2.size_in_bytes
       */
      sizeInBytes?: string | null;
      /**
       * Video quality. For example: 480p, 720p.
       * @internal
       */
      quality?: string | null;
      /**
       * Video filename.
       * @internal
       */
      filename?: string | null;
      /**
       * Video duration in seconds.
       * @internal
       * @readonly
       * @deprecated Video duration in seconds.
       * @replacedBy duration_in_milliseconds
       */
      durationInSeconds?: number | null;
      /**
       * Video duration in milliseconds.
       * @internal
       * @readonly
       */
      durationInMilliseconds?: number | null;
      /**
       * When true, this is a protected asset, and calling the URL will return a 403 error.
       * In order to access private assets, make a request to:
       * `GenerateFileDownloadUrl` with the WixMedia id and specify the asset_key in the request
       * @internal
       * @readonly
       */
      private?: boolean | null;
      /**
       * Key to identify the video resolution's relationship to the original media in WixMedia.
       * Can be used to request a download for the specific video resolution.
       * For example: 480p.mp4, 720p.mp4, 1080p.mp4, trailer-720p.mp4, clip-720p.mp4
       * @internal
       * @readonly
       */
      assetKey?: string | null;
  }
  enum MediaType {
      UNKNOWN_MEDIA_TYPE = "UNKNOWN_MEDIA_TYPE",
      /** Image media type. */
      IMAGE = "IMAGE",
      /** Video media type. */
      VIDEO = "VIDEO"
  }
  interface Thumbnail {
      /** Thumbnail url. */
      url?: string;
      /** Thumbnail height. */
      height?: number;
      /** Thumbnail width. */
      width?: number;
      /** Thumbnail alt text. */
      altText?: string | null;
  }
  interface MediaItemsInfo {
      /** All media items (images, videos etc) associated with this product. */
      items?: ProductMedia[];
  }
  /**
   * The SEO schema object contains data about different types of meta tags. It makes sure that the information about your page is presented properly to search engines.
   * The search engines use this information for ranking purposes, or to display snippets in the search results.
   * This data will override other sources of tags (for example patterns) and will be included in the <head> section of the HTML document, while not being displayed on the page itself.
   */
  interface SeoSchema {
      /** SEO tag information. */
      tags?: Tag[];
      /** SEO general settings. */
      settings?: Settings;
  }
  interface Keyword {
      /** Keyword value. */
      term?: string;
      /** Whether the keyword is the main focus keyword. */
      isMain?: boolean;
      /** The source that added the keyword terms to the SEO settings. */
      origin?: string | null;
  }
  interface Tag {
      /**
       * SEO tag type.
       *
       *
       * Supported values: `title`, `meta`, `script`, `link`.
       */
      type?: string;
      /**
       * A `{"key": "value"}` pair object where each SEO tag property (`"name"`, `"content"`, `"rel"`, `"href"`) contains a value.
       * For example: `{"name": "description", "content": "the description itself"}`.
       */
      props?: Record<string, any> | null;
      /** SEO tag meta data. For example, `{"height": 300, "width": 240}`. */
      meta?: Record<string, any> | null;
      /** SEO tag inner content. For example, `<title> inner content </title>`. */
      children?: string;
      /** Whether the tag is a custom tag. */
      custom?: boolean;
      /** Whether the tag is disabled. */
      disabled?: boolean;
  }
  interface Settings {
      /**
       * Whether the Auto Redirect feature, which creates `301 redirects` on a slug change, is enabled.
       *
       *
       * Default: `false` (Auto Redirect is enabled.)
       */
      preventAutoRedirect?: boolean;
      /** User-selected keyword terms for a specific page. */
      keywords?: Keyword[];
  }
  interface ConnectedOption extends ConnectedOptionOptionSettingsOneOf {
      /** Choices settings. */
      choicesSettings?: ChoicesSettings;
      /** ID of a customization with `customizationType: PRODUCT_OPTION`. */
      _id?: string | null;
      /** Option name. */
      name?: string | null;
      /** Option render type. */
      optionRenderType?: ProductOptionRenderType;
      /**
       * Option key based the option name. Used internally by Stores web client in CatalogSPI endpoints for checkout flow when option name cannot be used because it can be translated.
       * @internal
       * @readonly
       */
      key?: string;
  }
  /** @oneof */
  interface ConnectedOptionOptionSettingsOneOf {
      /** Choices settings. */
      choicesSettings?: ChoicesSettings;
  }
  enum ProductOptionRenderType {
      /** Not implemented. */
      UNKNOWN_OPTION_RENDER_TYPE = "UNKNOWN_OPTION_RENDER_TYPE",
      /** Text choices. */
      TEXT_CHOICES = "TEXT_CHOICES",
      /** Swatch choices. */
      SWATCH_CHOICES = "SWATCH_CHOICES"
  }
  interface ChoicesSettings {
      /** List of available choices for the option. */
      choices?: ConnectedOptionChoice[];
  }
  interface ConnectedOptionChoice extends ConnectedOptionChoiceValueOneOf {
      /** Color code in HEX format, [as described by MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color). */
      colorCode?: string;
      /**
       * Multiple colors  - HEX (#RRGGBB) color code
       * @internal
       */
      colorCodes?: MultipleColors;
      /**
       * Image
       * @internal
       */
      image?: string;
      /** The id of the choice. */
      choiceId?: string | null;
      /**
       * Product media overrides. When not empty only these images will be shown when such choices selected by customer. Otherwise all images of product.
       * When several choices from different options selected only media filter present in `media_overrides` of ALL choices will be shown.
       * For example if Color:red has images 1,2,3 and Material:Silk has images 2,3,5 then only images 2,3 will be shown when both of them selected.
       */
      linkedMedia?: ProductMedia[];
      /** The type of this choice. */
      choiceType?: ChoiceType;
      /**
       * A key based the choice name. Used internally by Stores web client in CatalogSPI endpoints for checkout flow when name cannot be used because it can be translated.
       * @internal
       * @readonly
       */
      key?: string;
      /** Choice name. */
      name?: string | null;
      /**
       * A flag that indicates if at least one variant with this choice is in stock in the default store's location.
       * For example, a product with 'Color' and 'Size' options with variants: [Blue, Small] which is out of stock and [Red Large] which is in stock. For choice 'Blue' ths flag will be 'false' and for 'Red' the flag will be true
       * @readonly
       */
      inStock?: boolean;
      /**
       * Whether at least one variant with this choice is visible.
       *
       * Default: `false`
       * @readonly
       */
      visible?: boolean;
  }
  /** @oneof */
  interface ConnectedOptionChoiceValueOneOf {
      /** Color code in HEX format, [as described by MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color). */
      colorCode?: string;
      /**
       * Multiple colors  - HEX (#RRGGBB) color code
       * @internal
       */
      colorCodes?: MultipleColors;
      /**
       * Image
       * @internal
       */
      image?: string;
  }
  enum ChoiceType {
      UNKNOWN_CHOICE_TYPE = "UNKNOWN_CHOICE_TYPE",
      /** Text choice. */
      CHOICE_TEXT = "CHOICE_TEXT",
      /** Single color choice. */
      ONE_COLOR = "ONE_COLOR",
      /** Multiple colors choice. */
      MULTIPLE_COLORS = "MULTIPLE_COLORS",
      /** Image choice. */
      IMAGE = "IMAGE"
  }
  interface MultipleColors {
      /** List of color codes. */
      colorCodes?: string[];
  }
  interface ConnectedModifier extends ConnectedModifierModifierSettingsOneOf {
      /** Free text modifier settings. */
      freeTextSettings?: FreeTextSettings;
      /** Choice settings. */
      choicesSettings?: ModifierChoicesSettings;
      /** ID of a customization with `customizationType: MODIFIER`. */
      _id?: string | null;
      /** Modifier title. */
      name?: string | null;
      /** Modifier render type. */
      modifierRenderType?: ModifierRenderType;
      /** Whether customer input is required for this modifier. */
      mandatory?: boolean;
      /**
       * Modifier key based on name. Used internally by Stores web client in CatalogSPI endpoints for checkout flow when name cannot be used because it can be translated.
       * @internal
       * @readonly
       */
      key?: string;
  }
  /** @oneof */
  interface ConnectedModifierModifierSettingsOneOf {
      /** Free text modifier settings. */
      freeTextSettings?: FreeTextSettings;
      /** Choice settings. */
      choicesSettings?: ModifierChoicesSettings;
  }
  enum ModifierRenderType {
      /** Not implemented. */
      UNKNOWN_MODIFIER_RENDER_TYPE = "UNKNOWN_MODIFIER_RENDER_TYPE",
      /** Free text. */
      FREE_TEXT = "FREE_TEXT",
      /** Text choices. */
      TEXT_CHOICES = "TEXT_CHOICES",
      /** Swatch choices. */
      SWATCH_CHOICES = "SWATCH_CHOICES"
  }
  interface FreeTextSettings {
      /** Minimum number of characters. */
      minCharCount?: number;
      /** Maximum number of characters. */
      maxCharCount?: number;
      /** Default amount to be added to the product's price. */
      defaultAddedPrice?: string | null;
      /** Title of the text to be input by the customer. */
      title?: string;
      /**
       * A read-only key auto-generated based on the title that will be used for CatalogSPI endpoints (GetCatalogItems), to support cart and checkout flows
       * @internal
       * @readonly
       */
      key?: string;
  }
  interface ModifierChoicesSettings {
      /** List of modifier choices. */
      choices?: ConnectedModifierChoice[];
  }
  interface ConnectedModifierChoice extends ConnectedModifierChoiceValueOneOf {
      /** Color code in HEX format, [as described by MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color). */
      colorCode?: string;
      /**
       * Multiple colors  - HEX (#RRGGBB) color code
       * @internal
       */
      colorCodes?: MultipleColors;
      /**
       * Image
       * @internal
       */
      image?: string;
      /** Choice ID. */
      choiceId?: string | null;
      /** Product media. */
      linkedMedia?: ProductMedia[];
      /** Choice type. */
      choiceType?: ChoiceType;
      /**
       * Modifier key. Used for eCommerce integration.
       * @readonly
       */
      key?: string;
      /** Choice name. */
      name?: string | null;
      /** Added price. */
      addedPrice?: string | null;
  }
  /** @oneof */
  interface ConnectedModifierChoiceValueOneOf {
      /** Color code in HEX format, [as described by MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color). */
      colorCode?: string;
      /**
       * Multiple colors  - HEX (#RRGGBB) color code
       * @internal
       */
      colorCodes?: MultipleColors;
      /**
       * Image
       * @internal
       */
      image?: string;
  }
  interface Brand {
      /** Brand ID. */
      _id?: string | null;
      /** Brand name. */
      name?: string | null;
  }
  interface InfoSection {
      /** Info section ID. */
      _id?: string | null;
      /**
       * Info section unique name.
       * > **Note:** Returned only when you pass `"INFO_SECTION"` to the `fields` array in Products API requests.
       */
      uniqueName?: string | null;
      /**
       * Info section title.
       * > **Note:** Returned only when you pass `"INFO_SECTION"` to the `fields` array in Products API requests.
       * @readonly
       */
      title?: string | null;
      /**
       * Info section description using rich content.
       * > **Note:** Returned only when you pass `"INFO_SECTION_DESCRIPTION"` to the `fields` array in Products API requests.
       *
       * <widget src="https://apps.wix.com/_serverless/ricos-playground-services/goto/api-component" plugins="indent.emoji.divider.codeBlock.file.gallery.giphy.image.table.link.textHighlight.textColor" exampleid="7dc9240e-d548-417a-abcf-0291b68b4303">
       * <a href="https://dev.wix.com/docs/ricos/api-reference/ricos-document">See Ricos document reference</a>
       * </widget>
       * @readonly
       */
      description?: RichContent;
      /**
       * Info section description in HTML.
       *
       * When provided on create/update, this string must be a valid HTML. It will then be converted to rich content.
       * `plainDescription` is ignored when value is also passed to the `description` field.
       * > **Note:** Returned only when you pass `"INFO_SECTION_PLAIN_DESCRIPTION"` to the `fields` array in Products API requests.
       */
      plainDescription?: string | null;
  }
  interface Ribbon$1 {
      /** Ribbon ID. */
      _id?: string | null;
      /** Ribbon name. */
      name?: string | null;
  }
  interface ProductCategoriesInfo {
      /**
       * A list of categories related to product.
       * @readonly
       */
      categories?: ProductCategory[];
  }
  interface ProductCategory {
      /** Category ID. */
      _id?: string;
      /** Index location of the product within the category, which can be utilized for sorting products in a specific category. For detailed instructions on how to set this up, refer to the [Add and arrange products in category](https://dev.wix.com/docs/rest/business-solutions/stores/catalog-v3/products-v3/sample-use-cases-and-flows#add-and-arrange-products-in-category) sample flow. */
      index?: number | null;
  }
  interface ProductCategoryIdsInfo {
      /**
       * A list of category ids related to product.
       * @readonly
       */
      categoryIds?: string[];
  }
  interface PriceRange {
      /** Minimum value. */
      minValue?: FixedMonetaryAmount;
      /** Maximum value. */
      maxValue?: FixedMonetaryAmount;
  }
  interface FixedMonetaryAmount {
      /** Monetary amount. For example, `"3.99"`, or `"-4.99"` for a negative amount. */
      amount?: string;
      /**
       * Formatted monetary amount. For example, `"$3.99"`.
       * > **Note:** Returned only when you pass `"CURRENCY"` to the `fields` array in Products API requests.
       * @readonly
       */
      formattedAmount?: string | null;
  }
  interface Inventory {
      /**
       * Current availability status.
       * @readonly
       */
      availabilityStatus?: InventoryAvailabilityStatus;
      /**
       * Current preorder status.
       * @readonly
       */
      preorderStatus?: PreorderStatus;
      /**
       * Preorder availability status.
       * @readonly
       */
      preorderAvailability?: ProductPreorderAvailability;
  }
  enum InventoryAvailabilityStatus {
      UNKNOWN_AVAILABILITY_STATUS = "UNKNOWN_AVAILABILITY_STATUS",
      /** All variants are in stock and available for purchase. */
      IN_STOCK = "IN_STOCK",
      /** All variants are out of stock. */
      OUT_OF_STOCK = "OUT_OF_STOCK",
      /** Some variants are out of stock and some are in stock and available for purchase. */
      PARTIALLY_OUT_OF_STOCK = "PARTIALLY_OUT_OF_STOCK"
  }
  enum PreorderStatus {
      UNKNOWN_PREORDER_STATUS = "UNKNOWN_PREORDER_STATUS",
      /** All variants are enabled for preorder. */
      ENABLED = "ENABLED",
      /** All variants are disabled for preorder. */
      DISABLED = "DISABLED",
      /** Some variants are disabled and some are enabled for preorder. */
      PARTIALLY_ENABLED = "PARTIALLY_ENABLED"
  }
  enum ProductPreorderAvailability {
      UNKNOWN_PREORDER_AVAILABILITY_STATUS = "UNKNOWN_PREORDER_AVAILABILITY_STATUS",
      /** All the product variants are available for preorder. */
      ALL_VARIANTS = "ALL_VARIANTS",
      /** None of the product variants are available for preorder. */
      NO_VARIANTS = "NO_VARIANTS",
      /** Some of the product variants are available for preorder. */
      SOME_VARIANTS = "SOME_VARIANTS"
  }
  enum ProductType {
      /** Not implemented. */
      UNKNOWN_PRODUCT_TYPE = "UNKNOWN_PRODUCT_TYPE",
      /** Physical product. */
      PHYSICAL = "PHYSICAL",
      /** Digital product. */
      DIGITAL = "DIGITAL"
  }
  interface PhysicalProperties {
      /** Price per unit settings. */
      pricePerUnit?: PricePerUnitSettings;
      /** Fulfiller ID. */
      fulfillerId?: string | null;
      /**
       * Shipping group ID.
       * @internal
       */
      shippingGroupId?: string | null;
      /**
       * Product shipping weight range - minimum and maximum weights of all the variants.
       * @readonly
       */
      shippingWeightRange?: WeightRange;
      /**
       * Product price per unit range. The minimum and maximum price per unit of all the variants.
       * @readonly
       */
      pricePerUnitRange?: PricePerUnitRange;
      /**
       * Weight measurement unit.
       * > **Note:** Returned only when you pass `"WEIGHT_MEASUREMENT_UNIT_INFO"` to the `fields` array in Products API requests.
       * @readonly
       */
      weightMeasurementUnitInfo?: WeightMeasurementUnitInfo;
      /**
       * Delivery Profile ID.
       * @internal
       */
      deliveryProfileId?: string | null;
  }
  interface PricePerUnitSettings {
      /**
       * Quantity.
       * For example, to define price per per 100 grams, set this field to `100`.
       */
      quantity?: number;
      /**
       * Measurement unit.
       * For example, to define price per 100 grams, set this field to "G".
       */
      measurementUnit?: MeasurementUnit;
  }
  enum MeasurementUnit {
      UNSPECIFIED = "UNSPECIFIED",
      ML = "ML",
      CL = "CL",
      L = "L",
      CBM = "CBM",
      MG = "MG",
      G = "G",
      KG = "KG",
      MM = "MM",
      CM = "CM",
      M = "M",
      SQM = "SQM",
      OZ = "OZ",
      LB = "LB",
      FLOZ = "FLOZ",
      PT = "PT",
      QT = "QT",
      GAL = "GAL",
      IN = "IN",
      FT = "FT",
      YD = "YD",
      SQFT = "SQFT"
  }
  interface WeightRange {
      /** Minimum weight across all variants associated with this product. */
      minValue?: number;
      /** Maximum weight across all variants associated with this product. */
      maxValue?: number;
  }
  interface PricePerUnitRange {
      /** Minimum price per unit across all variants. */
      minValue?: PricePerUnitRangePricePerUnit;
      /** Maximum price per unit across all variants. */
      maxValue?: PricePerUnitRangePricePerUnit;
  }
  interface PricePerUnitRangePricePerUnit {
      /**
       * Calculated value of price per unit. Takes into account pricePerUnit settings of product and variants and sale price of variants.
       * For example if discounted price is 2$, product's price per unit setting is 1 Kg, variant price per unit setting is 0.5 Kg then this value is 4$ (means variant weight is 0.5 Kg and it costs 2$ but we want to show price per 1 Kg so we show 4$).
       * @readonly
       */
      value?: string;
      /**
       * Price per unit info in the format of variant specific data / product setting, for example €4.00 / 1 Kg.
       * > **Note:** This field is returned by the API only when you pass `fields: "CURRENCY"` in a request.
       * @readonly
       */
      description?: string | null;
  }
  interface WeightMeasurementUnitInfo {
      /**
       * Weight measurement unit.
       * @readonly
       */
      weightMeasurementUnit?: WeightUnit;
  }
  enum WeightUnit {
      /** Weight unit can't be classified, due to an error */
      UNSPECIFIED_WEIGHT_UNIT = "UNSPECIFIED_WEIGHT_UNIT",
      /** Kilograms */
      KG = "KG",
      /** Pounds */
      LB = "LB"
  }
  interface BreadcrumbsInfo {
      /**
       * Breadcrumbs.
       * @readonly
       */
      breadcrumbs?: BreadCrumb[];
  }
  interface BreadCrumb {
      /** Category ID. */
      categoryId?: string;
      /** Category name. */
      categoryName?: string;
      /** Category slug. */
      categorySlug?: string;
  }
  interface VariantsInfo {
      /** List of related variants. */
      variants?: Variant[];
  }
  interface Variant extends VariantTypedPropertiesOneOf {
      /** Physical properties. Must be passed when `productType: PHYSICAL` */
      physicalProperties?: VariantPhysicalProperties;
      /** Digital properties. Must be passed when `productType: DIGITAL` */
      digitalProperties?: VariantDigitalProperties;
      /** Variant ID. */
      _id?: string | null;
      /**
       * Whether the variant is visible to site visitors.
       *
       * Default: `true`
       */
      visible?: boolean | null;
      /** Variant SKU (stock keeping unit). */
      sku?: string | null;
      /** Variant barcode. */
      barcode?: string | null;
      /**
       * List of choices.
       * In case this list is empty, this is the default variant of an unmanaged product.
       */
      choices?: OptionChoice[];
      /** Variant price. */
      price?: PriceInfo;
      /**
       * Variant revenue details.
       *
       * > **Note:** Returned only when the following conditions are met:
       * > + You pass `"MERCHANT_DATA"` to the `fields` array in Products API requests.
       * > + Your app has the required `SCOPE.STORES.PRODUCT_READ_ADMIN` permission scope.
       */
      revenueDetails?: RevenueDetails;
      /**
       * Variant media.
       * @readonly
       */
      media?: ProductMedia;
      /**
       * Subscription prices calculated by applying subscription discount to the variant `price.actual_price`.
       * > **Note:** Returned only when you pass `"SUBSCRIPTION_PRICES_INFO"` to the `fields` array in Products API requests.
       * @readonly
       */
      subscriptionPricesInfo?: SubscriptionPricesInfo;
      /**
       * Variant inventory status.
       * @readonly
       */
      inventoryStatus?: InventoryStatus;
  }
  /** @oneof */
  interface VariantTypedPropertiesOneOf {
      /** Physical properties. Must be passed when `productType: PHYSICAL` */
      physicalProperties?: VariantPhysicalProperties;
      /** Digital properties. Must be passed when `productType: DIGITAL` */
      digitalProperties?: VariantDigitalProperties;
  }
  interface OptionChoice {
      /** Option and choice IDs. */
      optionChoiceIds?: OptionChoiceIds;
      /**
       * Option and choice names.
       * > **Note:** Returned only when you pass `"VARIANT_OPTION_CHOICE_NAMES"` to the `fields` array in Products API requests.
       */
      optionChoiceNames?: OptionChoiceNames;
  }
  interface OptionChoiceIds {
      /** Option ID. */
      optionId?: string;
      /** Choice ID. */
      choiceId?: string;
  }
  interface OptionChoiceNames {
      /** Option name. */
      optionName?: string;
      /** Choice name. */
      choiceName?: string;
      /** Render type. */
      renderType?: ProductOptionRenderType;
  }
  interface PriceInfo {
      /**
       * Variant price. Must be greater or equal to 0.
       * @deprecated Variant price. Must be greater or equal to 0.
       * @replacedBy compare_at_price
       * @targetRemovalDate 2024-12-31
       */
      basePrice?: FixedMonetaryAmount;
      /**
       * Variant sale price. If not provided, sale price will be equal to `basePrice`. When provided, value must be greater or equal to 0, and less than or equal to `basePrice`.
       * @deprecated Variant sale price. If not provided, sale price will be equal to `basePrice`. When provided, value must be greater or equal to 0, and less than or equal to `basePrice`.
       * @replacedBy actual_price
       * @targetRemovalDate 2024-12-31
       */
      salePrice?: FixedMonetaryAmount;
      /** Variant price. Must be greater or equal to 0. */
      actualPrice?: FixedMonetaryAmount;
      /** The compare-at-price represents the original price of a product before any discount. It is optional and should only be set if a discount applies. When set, it must be higher than the current price to reflect accurate savings. */
      compareAtPrice?: FixedMonetaryAmount;
  }
  interface RevenueDetails {
      /** Item cost. */
      cost?: FixedMonetaryAmount;
      /**
       * Profit. Calculated by reducing `cost` from `discountedPrice`.
       * @readonly
       */
      profit?: FixedMonetaryAmount;
      /**
       * Profit Margin. Calculated by dividing `profit` by `discountedPrice`.
       * The result is rounded to 4 decimal places.
       * @readonly
       */
      profitMargin?: number;
  }
  interface VariantPhysicalProperties {
      /** Variant shipping weight. */
      weight?: number | null;
      /**
       * Price per unit info, in order to show price per unit on the product page.
       * For example if one sells cheese and defines 100g here then we know that buying this variant buyer receives 100g of cheese.
       * But on product page price will be displayed for units defined on product level. See `pricePerUnit.value` to understand how it's calculated.
       */
      pricePerUnit?: PricePerUnit;
  }
  interface PricePerUnit {
      /**
       * Price per unit data for this variant.
       * `measurementUnit` value must correspond to the measurement unit set on the product.
       */
      settings?: PricePerUnitSettings;
      /**
       * Calculated value of price per unit. Takes into account `pricePerUnit` settings of parent product, of this variant, and discounted price of variant.
       * For example if discounted price is 2$, product's price per unit setting is 1 Kg, variant price per unit setting is 0.5 Kg then this value is 4$ (means variant weight is 0.5 Kg and it costs 2$ but we want to show price per 1 Kg so we show 4$).
       * @readonly
       */
      value?: string;
      /**
       * Price per unit description.
       * > **Note:** Returned only when you pass `"CURRENCY"` to the `fields` array in Products API requests.
       * @readonly
       */
      description?: string | null;
  }
  interface VariantDigitalProperties {
      /** Digital file which will be downloaded by customer after successful purchase. */
      digitalFile?: SecuredMedia;
  }
  interface SecuredMedia {
      /** Media ID in media manager. */
      _id?: string;
      /**
       * Original file name.
       * @readonly
       */
      fileName?: string;
      /**
       * Original file size.
       * @readonly
       */
      fileSize?: string | null;
      /**
       * File type.
       * @readonly
       */
      fileType?: FileType;
  }
  enum FileType {
      /** Unspecified file type. */
      UNSPECIFIED = "UNSPECIFIED",
      /** Secure picture file. */
      SECURE_PICTURE = "SECURE_PICTURE",
      /** Secure video file. */
      SECURE_VIDEO = "SECURE_VIDEO",
      /** Secure document file. */
      SECURE_DOCUMENT = "SECURE_DOCUMENT",
      /** Secure music file. */
      SECURE_MUSIC = "SECURE_MUSIC",
      /** Secure archive file. */
      SECURE_ARCHIVE = "SECURE_ARCHIVE"
  }
  interface SubscriptionPricesInfo {
      /** Subscription prices. */
      subscriptionPrices?: SubscriptionPrice[];
  }
  interface SubscriptionPrice {
      /**
       * Subscription ID.
       * @readonly
       */
      subscriptionId?: string;
      /**
       * Subscription price calculated by applying subscription discount to the variant `price.actual_price`
       * @readonly
       */
      price?: FixedMonetaryAmount;
      /**
       * Price per unit info.
       * @readonly
       */
      pricePerUnit?: SubscriptionPricePerUnit;
  }
  interface SubscriptionPricePerUnit {
      /**
       * Calculated value of price per unit. Takes into account `pricePerUnit` settings of parent product, `pricePerUnit` settings of this variant, and the variant subscription price.
       * @readonly
       */
      value?: string;
      /**
       * Price per unit description.
       * > **Note:** Returned only when you pass `"CURRENCY"` to the `fields` array in Products API requests.
       * @readonly
       */
      description?: string | null;
  }
  interface InventoryStatus {
      /** Whether the variant is in stock. */
      inStock?: boolean;
      /** Whether preorder is enabled for this variant. */
      preorderEnabled?: boolean;
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
  interface SubscriptionDetails {
      /** Subscriptions. */
      subscriptions?: Subscription[];
      /**
       * Whether to allow one-time purchases in addition to subscription-based purchases.
       *
       * Default: `false`
       */
      allowOneTimePurchases?: boolean | null;
  }
  interface Subscription extends SubscriptionCyclesOneOf {
      /** Whether subscription is renewed automatically at the end of each period. Cannot be `false`, instead set `billingCycles`. */
      autoRenewal?: boolean;
      /** Number of billing cycles before subscription ends. */
      billingCycles?: number;
      /** Subscription ID. */
      _id?: string | null;
      /** Subscription title. */
      title?: string;
      /** Subscription description. */
      description?: string | null;
      /**
       * Whether the subscription is visible to site visitors.
       *
       * Default: `true`
       */
      visible?: boolean | null;
      /**
       * Frequency of recurring payment.
       * For example, if `frequency: MONTH` and `billingCycles: 6`; payment will be made monthly for 6 months.
       */
      frequency?: SubscriptionFrequency;
      /** Interval of recurring payment. Default: `1`. For example, if `frequency: MONTH`, `billingCycles: 3` and `interval: 2`; payment will be made every 2 months for a total of 6 months. */
      interval?: number | null;
      /**
       * Discount info (optional).
       * For example, a $20 discount would be `amount: 20`, `type: AMOUNT`.
       */
      discount?: SubscriptionDiscount;
  }
  /** @oneof */
  interface SubscriptionCyclesOneOf {
      /** Whether subscription is renewed automatically at the end of each period. Cannot be `false`, instead set `billingCycles`. */
      autoRenewal?: boolean;
      /** Number of billing cycles before subscription ends. */
      billingCycles?: number;
  }
  /** Frequency unit of recurring payment */
  enum SubscriptionFrequency {
      UNDEFINED = "UNDEFINED",
      DAY = "DAY",
      WEEK = "WEEK",
      MONTH = "MONTH",
      YEAR = "YEAR"
  }
  interface SubscriptionDiscount extends SubscriptionDiscountDiscountOneOf {
      /** Amount to discount from the variant discounted_price. */
      amountOff?: string;
      /** Percentage to discount from variant discounted_price. */
      percentOff?: number;
      /** Discount type. */
      type?: DiscountType;
  }
  /** @oneof */
  interface SubscriptionDiscountDiscountOneOf {
      /** Amount to discount from the variant discounted_price. */
      amountOff?: string;
      /** Percentage to discount from variant discounted_price. */
      percentOff?: number;
  }
  enum DiscountType {
      UNKNOWN_DISCOUNT = "UNKNOWN_DISCOUNT",
      /** Discount by a specific amount. */
      AMOUNT = "AMOUNT",
      /** Discount by a percentage. */
      PERCENT = "PERCENT"
  }
  interface VariantSummary {
      /**
       * The total number of variants for the product.
       * @readonly
       */
      variantCount?: number;
  }
  interface MinVariantPriceInfo {
      /**
       * Variant price. Must be greater or equal to 0.
       * @readonly
       * @deprecated Variant price. Must be greater or equal to 0.
       * @replacedBy compare_at_price
       * @targetRemovalDate 2024-12-31
       */
      basePrice?: FixedMonetaryAmount;
      /**
       * Variant sale price. If not provided, sale price will be equal to `basePrice`. When provided, value must be greater or equal to 0, and less than or equal to `basePrice`.
       * @readonly
       * @deprecated Variant sale price. If not provided, sale price will be equal to `basePrice`. When provided, value must be greater or equal to 0, and less than or equal to `basePrice`.
       * @replacedBy actual_price
       * @targetRemovalDate 2024-12-31
       */
      salePrice?: FixedMonetaryAmount;
      /**
       * Subscription price calculated by applying subscription discount to the variant `price.actualPrice`
       * @readonly
       */
      minSubscriptionPrice?: FixedMonetaryAmount;
      /**
       * Subscription price per unit calculated value of price per unit.
       * Takes into account `pricePerUnit` settings of parent product, `pricePerUnit` settings of this variant, and the variant subscription price.
       * @readonly
       */
      minSubscriptionPricePerUnit?: string | null;
      /**
       * Variant price per unit.
       * @readonly
       */
      pricePerUnitData?: PricePerUnit;
      /**
       * Variant SKU (stock keeping unit).
       * @readonly
       */
      sku?: string | null;
      /**
       * Variant shipping weight.
       * @readonly
       */
      weight?: number | null;
      /**
       * Variant revenue details.
       *
       * > **Note:** Returned only when the following conditions are met:
       * > + You pass `"MERCHANT_DATA"` to the `fields` array in Products API requests.
       * > + Your app has the required `SCOPE.STORES.PRODUCT_READ_ADMIN` permission scope.
       * @readonly
       */
      revenueDetails?: RevenueDetails;
      /** Variant price. Must be greater or equal to 0. */
      actualPrice?: FixedMonetaryAmount;
      /** The compare-at-price represents the original price of a product before any discount. It is optional and should only be set if a discount applies. When set, it must be higher than the current price to reflect accurate savings. */
      compareAtPrice?: FixedMonetaryAmount;
  }
  interface UpdateDocumentsEvent extends UpdateDocumentsEventOperationOneOf {
      /** insert/update documents */
      update?: DocumentUpdateOperation;
      /** delete by document ids */
      deleteByIds?: DeleteByIdsOperation;
      /** delete documents matching filter */
      deleteByFilter?: DeleteByFilterOperation;
      /** update documents matching filter */
      updateByFilter?: UpdateByFilterOperation;
      /** update only existing documents */
      updateExisting?: UpdateExistingOperation;
      /** application which owns documents */
      appDefId?: string | null;
      /** type of the documents */
      documentType?: string | null;
      /** language of the documents */
      language?: string | null;
      /** site documents belong to */
      msId?: string | null;
  }
  /** @oneof */
  interface UpdateDocumentsEventOperationOneOf {
      /** insert/update documents */
      update?: DocumentUpdateOperation;
      /** delete by document ids */
      deleteByIds?: DeleteByIdsOperation;
      /** delete documents matching filter */
      deleteByFilter?: DeleteByFilterOperation;
      /** update documents matching filter */
      updateByFilter?: UpdateByFilterOperation;
      /** update only existing documents */
      updateExisting?: UpdateExistingOperation;
  }
  interface DocumentUpdateOperation {
      /** documents to index or update */
      documents?: IndexDocument[];
  }
  interface IndexDocument {
      /** data bag with non-searchable fields (url, image) */
      payload?: DocumentPayload;
      /** what type of users should documents be visible to */
      exposure?: Enum;
      /** document with mandatory fields (id, title, description) and with fields specific to the type of the document */
      document?: Record<string, any> | null;
      /** what member groups is the document exposed to. Used only with GROUP_PROTECTED exposure */
      permittedMemberGroups?: string[];
      /** if true SEO is disabled for this document */
      seoHidden?: boolean | null;
      /** if true the page is a lightbox popup */
      isPopup?: boolean | null;
  }
  interface DocumentPayload {
      /** url of the page representing the document */
      url?: string | null;
      /** image which represents the document */
      documentImage?: DocumentImage;
  }
  interface DocumentImage {
      /** the name of the image */
      name?: string;
      /** the width of the image */
      width?: number;
      /** the height of the image */
      height?: number;
  }
  enum Enum {
      /** Default value. Means that permission not set */
      UNKNOWN = "UNKNOWN",
      /** Protected exposure. Exposed to members and owners */
      PROTECTED = "PROTECTED",
      /** Private exposure. Exposed to owners */
      PRIVATE = "PRIVATE",
      /** Public exposure. Visible to everyone */
      PUBLIC = "PUBLIC",
      /** Used for partial updates, to state that exposure is not changing */
      UNCHANGED = "UNCHANGED",
      /** Protected to members of permitted groups and owners */
      GROUP_PROTECTED = "GROUP_PROTECTED"
  }
  interface DeleteByIdsOperation {
      /** ids of the documents to delete */
      documentIds?: string[];
  }
  interface DeleteByFilterOperation {
      /** documents matching this filter wil be deleted. only filterable documents defined in document_type can be used for filtering */
      filter?: Record<string, any> | null;
  }
  interface UpdateByFilterOperation {
      /** documents matching this filter will be updated */
      filter?: Record<string, any> | null;
      /** partial document to apply */
      document?: IndexDocument;
  }
  interface UpdateExistingOperation {
      /** documents to update */
      documents?: IndexDocument[];
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
  interface SearchIndexingNotification {
      /** new state of indexing for the site specified in ms_id */
      indexState?: State$1;
      /** type of the document the notification is targeted for. Applies to all types if not provided */
      documentType?: string | null;
      /** languaInternalDocumentUpdateByFilterOperationge the notification is targeted for. Applies to all languages if not provided */
      language?: string | null;
      /** site for which notification is targeted */
      msId?: string | null;
  }
  enum State$1 {
      /** default state */
      Unknown = "Unknown",
      /** metasite does not require site search indexing */
      Off = "Off",
      /** metasite requires site search indexing */
      On = "On"
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
  interface CreateProductRequest {
      /**
       * Product to create.
       *
       * At least 1 variant must be provided and each variant must have relevant item in `choices` field for every item in `options`.
       * If `options` is empty one default variant must be provided with empty `choices` list.
       */
      product: V3Product;
      /** Fields to include in the response. */
      fields?: SingleEntityOpsRequestedFields[];
  }
  enum SingleEntityOpsRequestedFields {
      /** Not implemented. */
      UNKNOWN_REQUESTED_FIELD = "UNKNOWN_REQUESTED_FIELD",
      URL = "URL",
      CURRENCY = "CURRENCY",
      INFO_SECTION = "INFO_SECTION",
      /** You can request merchant data only if you have the `SCOPE.STORES.PRODUCT_READ_ADMIN` permission scope. */
      MERCHANT_DATA = "MERCHANT_DATA",
      PLAIN_DESCRIPTION = "PLAIN_DESCRIPTION",
      INFO_SECTION_PLAIN_DESCRIPTION = "INFO_SECTION_PLAIN_DESCRIPTION",
      SUBSCRIPTION_PRICES_INFO = "SUBSCRIPTION_PRICES_INFO",
      BREADCRUMBS_INFO = "BREADCRUMBS_INFO",
      WEIGHT_MEASUREMENT_UNIT_INFO = "WEIGHT_MEASUREMENT_UNIT_INFO",
      VARIANT_OPTION_CHOICE_NAMES = "VARIANT_OPTION_CHOICE_NAMES",
      MEDIA_ITEMS_INFO = "MEDIA_ITEMS_INFO",
      DESCRIPTION = "DESCRIPTION",
      DIRECT_CATEGORIES_INFO = "DIRECT_CATEGORIES_INFO",
      ALL_CATEGORIES_INFO = "ALL_CATEGORIES_INFO",
      MIN_VARIANT_PRICE_INFO = "MIN_VARIANT_PRICE_INFO",
      INFO_SECTION_DESCRIPTION = "INFO_SECTION_DESCRIPTION",
      THUMBNAIL = "THUMBNAIL",
      DIRECT_CATEGORY_IDS = "DIRECT_CATEGORY_IDS"
  }
  interface CreateProductResponse {
      /** Created product. */
      product?: V3Product;
  }
  interface VariantsNotAlignedWithProduct {
      /** Variants not aligned with product */
      variants?: VariantNotAlignedWithProduct[];
  }
  interface VariantNotAlignedWithProduct {
      /** variant id */
      variantId?: string;
      /** what's wrong with this specific variant */
      errorDescription?: string;
  }
  interface CreateProductWithInventoryRequest {
      /**
       * Product to create with inventory.
       *
       * At least one variant must be provided and each variant must have relevant item in `choices` field for every item in `options`.
       * If `options` is empty one default variant must be provided with empty `choices` list.
       */
      product: ProductWithInventory;
      /**
       * Whether to return inventory entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Fields to include in the response. */
      fields?: SingleEntityOpsRequestedFields[];
  }
  interface ProductWithInventory extends ProductWithInventoryTypedPropertiesOneOf {
      /**
       * Physical properties.
       *
       * Required when `productType: PHYSICAL`.
       */
      physicalProperties?: PhysicalProperties;
      /**
       * Product ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the product is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the product.
       *
       * Ignored when creating a product with inventory.
       * @readonly
       */
      revision?: string | null;
      /** Product name. */
      name?: string | null;
      /**
       * Product slug.
       *
       * If not provided, the slug is autogenerated based on the product name.
       */
      slug?: string | null;
      /**
       * Product description using rich content.
       *
       * Learn more about [Working with Rich Content](https://dev.wix.com/docs/go-headless/tutorials-templates/other-tutorials/working-with-rich-content).
       * @internal
       */
      description?: RichContent;
      /**
       * Product description in HTML.
       *
       * + When provided on create/update, this string must be a valid HTML. It will then be converted to rich content.
       * + `plainDescription` is ignored when value is also passed to the `description` field.
       * > **Note:** Returned only when you pass `"PLAIN_DESCRIPTION"` to the `fields` array in Products API requests.
       */
      plainDescription?: string | null;
      /**
       * Whether the product is visible to site visitors on the site.
       *
       * Default: `true`
       */
      visible?: boolean | null;
      /**
       * Whether the product is visible in POS (point of sale).
       *
       * Default: `true`
       * > **Note:** Always `false` for `productType: DIGITAL`.
       */
      visibleInPos?: boolean | null;
      /** Product media items. */
      media?: Media;
      /** Product SEO data. */
      seoData?: SeoSchema;
      /** Tax group ID. */
      taxGroupId?: string | null;
      /**
       * Product options. Allows buyer to customize product, e.g. select Color, Size and so on.
       * Always generates variants: every variant must have exactly one choice related to each option.
       * Since options and variants tightly coupled and rely on each other they usually should be provided together in all operations.
       * For existing options and choices provide ids only, all other data (e.g. names, title, types and so on) will be resolved for you by ids.
       * If you don't have ids it's ok to omit them but provide all other data instead. For existing options ids will be resolved, not existing options will be created.
       * *None*: you cannot change name of existing option via this endpoint but you can do it by calling CustomizationService
       */
      options?: ConnectedOption[];
      /**
       * Product Modifiers. Allows buyer to customize product, e.g. select Color, Size and so on similarly to `options` but with one main difference - `modifiers` never generate any variants.
       * For existing modifiers and choices provide ids only, all other data (e.g. names, title, types and so on) will be resolved for you by ids.
       * If you don't have ids it's ok to omit them but provide all other data instead. For existing modifiers ids will be resolved, not existing modifiers will be created.
       * *None*: you cannot change name of existing modifier via this endpoint by passing id and changed name, if you pass id name will be ignored. If you want to update existing modifier name do it by calling CustomizationService
       */
      modifiers?: ConnectedModifier[];
      /**
       * Product brand.
       *
       * + Pass `brand.name` to add a new brand while creating a product.
       * + Pass an existing brand's `id` to assign that brand to the product.
       */
      brand?: Brand;
      /**
       * Product info section.
       *
       * + Pass `infoSection.uniqueName`, `infoSection.title`, and `infoSection.description` to add a new info section while creating a product.
       * + Pass an existing info section's `id` or `uniqueName` to assign that info section to the product.
       */
      infoSections?: InfoSection[];
      /**
       * Product ribbon.
       *
       * + Pass `ribbon.name` to add a new ribbon while creating a product.
       * + Pass an existing ribbon's `id` or `name` to assign that ribbon to the product.
       */
      ribbon?: Ribbon$1;
      /** Main category ID. */
      mainCategoryId?: string | null;
      /**
       * Product type.
       *
       * When passing `productType: PHYSICAL`, you must also pass `physicalProperties`.
       */
      productType?: ProductType;
      /**
       * A unique human-friendly identifier for the product.
       * Unlike the product ID, the handle can be set by the user to ensure consistency across multiple platforms.
       * In case handle wasn't given, the handle will be automatically generated.
       */
      handle?: string | null;
      /** Product variants. */
      variantsInfo?: V3VariantsInfo;
      /** Subscription details. */
      subscriptionDetails?: SubscriptionDetails;
      /**
       * Custom extended fields for the product object.
       *
       * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the [app dashboard](https://dev.wix.com/dc3/my-apps/) before they can be accessed with API calls.
       */
      extendedFields?: ExtendedFields;
  }
  /** @oneof */
  interface ProductWithInventoryTypedPropertiesOneOf {
      /**
       * Physical properties.
       *
       * Required when `productType: PHYSICAL`.
       */
      physicalProperties?: PhysicalProperties;
  }
  interface V3VariantsInfo {
      /**
       * List of related variants.
       * Partial update of variants is not supported so on update you must pass all data for all of them.
       * If you want to update existing variant you must provide `id`, otherwise new variant with different id will be created which might break some integrations that rely on variant ids.
       */
      variants?: VariantWithInventory[];
  }
  interface VariantWithInventory extends VariantWithInventoryTypedPropertiesOneOf {
      /** Physical properties. Must be passed when `productType: PHYSICAL` */
      physicalProperties?: VariantPhysicalProperties;
      /** Digital properties. Must be passed when `productType: DIGITAL` */
      digitalProperties?: VariantDigitalProperties;
      /** Variant ID. */
      _id?: string | null;
      /**
       * Whether the variant is visible to site visitors.
       *
       * Default: `true`
       */
      visible?: boolean | null;
      /** Variant SKU (stock keeping unit). */
      sku?: string | null;
      /** Variant barcode. */
      barcode?: string | null;
      /** Variant price. */
      price?: PriceInfo;
      /**
       * Variant revenue details.
       *
       * > **Note:** Returned only when the following conditions are met:
       * > + You pass `"MERCHANT_DATA"` to the `fields` array in Products API requests.
       * > + Your app has the required `SCOPE.STORES.PRODUCT_READ_ADMIN` permission scope.
       */
      revenueDetails?: RevenueDetails;
      /** Inventory item of the variant on the default location. */
      inventoryItem?: InventoryItemComposite;
      /** List of choices. */
      choices?: OptionChoiceReferences[];
  }
  /** @oneof */
  interface VariantWithInventoryTypedPropertiesOneOf {
      /** Physical properties. Must be passed when `productType: PHYSICAL` */
      physicalProperties?: VariantPhysicalProperties;
      /** Digital properties. Must be passed when `productType: DIGITAL` */
      digitalProperties?: VariantDigitalProperties;
  }
  interface InventoryItemComposite extends InventoryItemCompositeTrackingMethodOneOf {
      /**
       * Tracking method - in stock.
       *
       * When set to `true`, the item is available for sale without a quantity limit.
       */
      inStock?: boolean;
      /**
       * Tracking method - quantity left in inventory.
       *
       * Quantity can be negative when decrementing inventory for an order that has already been paid.
       */
      quantity?: number;
      /**
       * Inventory item ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Inventory item revision.
       * @readonly
       */
      revision?: string | null;
      /** Item preorder info. */
      preorderInfo?: PreorderInfo;
  }
  /** @oneof */
  interface InventoryItemCompositeTrackingMethodOneOf {
      /**
       * Tracking method - in stock.
       *
       * When set to `true`, the item is available for sale without a quantity limit.
       */
      inStock?: boolean;
      /**
       * Tracking method - quantity left in inventory.
       *
       * Quantity can be negative when decrementing inventory for an order that has already been paid.
       */
      quantity?: number;
  }
  interface PreorderInfo {
      /**
       * Whether preorder is enabled for the product.
       *
       * Default: `false`
       */
      enabled?: boolean | null;
      /** A message the customer will see when the item is out of stock and preorder is enabled. */
      message?: string | null;
      /**
       * Number of products that can be preordered after stock reaches zero.
       * Supported only for inventory items with `trackQuantity = true`.
       *
       * Default: `100000`
       */
      limit?: number | null;
      /**
       * Number of times the product was preordered.
       *
       * Supported only for inventory items with `trackQuantity = true`.
       * @readonly
       */
      counter?: number | null;
      /**
       * Quantity of products that can be preordered.
       *
       * Supported only for inventory items with `trackQuantity = true`.
       * @readonly
       */
      quantity?: number | null;
  }
  interface OptionChoiceReferences {
      /** Option and choice IDs. */
      optionChoiceIds?: V3OptionChoiceIds;
      /** Option and choice names. */
      optionChoiceNames?: V3OptionChoiceNames;
  }
  interface V3OptionChoiceIds {
      /** Option ID. */
      optionId?: string;
      /** Choice ID. */
      choiceId?: string;
  }
  interface V3OptionChoiceNames {
      /** Option name. */
      optionName?: string;
      /** Choice name. */
      choiceName?: string;
      /** Render type. */
      renderType?: ProductOptionRenderType;
  }
  interface CreateProductWithInventoryResponse {
      /** Created product. */
      product?: V3Product;
      /** Inventories created by bulk action. */
      inventoryResults?: BulkInventoryItemResults;
  }
  interface BulkInventoryItemResults {
      /** Inventories modified by bulk action. */
      results?: BulkInventoryItemResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: CommonBulkActionMetadata;
      /** Error details in case of failed action. */
      error?: ApplicationError$1;
  }
  interface BulkInventoryItemResult {
      /** Bulk action metadata for inventory item. */
      itemMetadata?: CommonItemMetadata;
      /**
       * Full inventory item entity.
       *
       * Returned only if `returnEntity: true` is passed in the request.
       */
      item?: InventoryItem;
  }
  interface CommonItemMetadata {
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
  /** Inventory Item. */
  interface InventoryItem extends InventoryItemTrackingMethodOneOf {
      /**
       * Tracking method - in stock.
       *
       * When set to `true`, the item is available for sale without a quantity limit.
       */
      inStock?: boolean;
      /**
       * Tracking method - quantity left in inventory.
       *
       * Quantity can be negative when decrementing inventory for an order that has already been paid.
       */
      quantity?: number;
      /**
       * Inventory item ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the inventory item is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the inventory item.
       *
       * Ignored when creating an inventory item.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the inventory item was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the inventory item was created.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Variant ID. */
      variantId?: string;
      /** Stores location ID. */
      locationId?: string | null;
      /** Product ID. */
      productId?: string;
      /**
       * Whether the quantity is being tracked.
       * @readonly
       */
      trackQuantity?: boolean;
      /**
       * Inventory item availability status.
       *
       * Supported values:
       * + OUT_OF_STOCK: Product is out of stock.
       * + IN_STOCK: Product is in stock. See `quantity` field for exact amount in stock.
       * + PREORDER: Product is only available for preorder. See `preorderInfo` field for more info.
       * @readonly
       */
      availabilityStatus?: AvailabilityStatus;
      /** Item preorder info. */
      preorderInfo?: PreorderInfo;
      /**
       * Product.
       * @readonly
       */
      product?: Product;
      /**
       * Custom field data for the inventory item object.
       *
       * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the app dashboard before they can be accessed with API calls.
       */
      extendedFields?: ExtendedFields;
  }
  /** @oneof */
  interface InventoryItemTrackingMethodOneOf {
      /**
       * Tracking method - in stock.
       *
       * When set to `true`, the item is available for sale without a quantity limit.
       */
      inStock?: boolean;
      /**
       * Tracking method - quantity left in inventory.
       *
       * Quantity can be negative when decrementing inventory for an order that has already been paid.
       */
      quantity?: number;
  }
  enum AvailabilityStatus {
      UNKNOWN_AVAILABILITY_STATUS = "UNKNOWN_AVAILABILITY_STATUS",
      /** Product is out of stock. */
      OUT_OF_STOCK = "OUT_OF_STOCK",
      /** Product is in stock. See `quantity` field for exact amount in stock. */
      IN_STOCK = "IN_STOCK",
      /** Product is only available for preorder. See `preorderInfo` field for more info. */
      PREORDER = "PREORDER"
  }
  interface Product {
      /** Product name. */
      name?: string | null;
      /** List of category IDs that this product is included in directly. */
      directCategoryIds?: string[];
      /** Variant name. */
      variantName?: string | null;
      /** Variant SKU (stock keeping unit). */
      variantSku?: string | null;
      /** Variant visible. */
      variantVisible?: boolean | null;
  }
  interface CommonBulkActionMetadata {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface UpdateProductRequest {
      /** Product to update. */
      product: V3Product;
      /**
       * Explicit list of fields to update in product
       * @internal
       */
      fieldMask?: string[];
      /** Fields to include in the response. */
      fields?: SingleEntityOpsRequestedFields[];
  }
  interface UpdateProductResponse {
      /** Updated product. */
      product?: V3Product;
  }
  interface UnsupportedFieldMasks {
      /** Field masks provided in request but not supported */
      fieldMasks?: string[];
  }
  interface UpdateProductWithInventoryRequest {
      /** Product to update. */
      product: ProductWithInventory;
      /**
       * Explicit list of fields to update in product
       * @internal
       */
      fieldMask?: string[];
      /**
       * Whether to return the full inventory entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Fields to include in the response. */
      fields?: SingleEntityOpsRequestedFields[];
  }
  interface UpdateProductWithInventoryResponse {
      /** Updated product. */
      product?: V3Product;
      /** Inventories updated by bulk action. */
      inventoryResults?: BulkInventoryItemResults;
  }
  interface BulkCreateProductsRequest {
      /** List of products to create. */
      products: V3Product[];
      /**
       * Whether to return the full product entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Fields to include in the response. */
      fields?: RequestedFields$1[];
  }
  enum RequestedFields$1 {
      /** Not implemented. */
      UNKNOWN_REQUESTED_FIELD = "UNKNOWN_REQUESTED_FIELD",
      URL = "URL",
      CURRENCY = "CURRENCY",
      INFO_SECTION = "INFO_SECTION",
      /** You can request merchant data only if you have the `SCOPE.STORES.PRODUCT_READ_ADMIN` permission scope. */
      MERCHANT_DATA = "MERCHANT_DATA",
      PLAIN_DESCRIPTION = "PLAIN_DESCRIPTION",
      INFO_SECTION_PLAIN_DESCRIPTION = "INFO_SECTION_PLAIN_DESCRIPTION",
      SUBSCRIPTION_PRICES_INFO = "SUBSCRIPTION_PRICES_INFO",
      BREADCRUMBS_INFO = "BREADCRUMBS_INFO",
      WEIGHT_MEASUREMENT_UNIT_INFO = "WEIGHT_MEASUREMENT_UNIT_INFO",
      VARIANT_OPTION_CHOICE_NAMES = "VARIANT_OPTION_CHOICE_NAMES",
      MEDIA_ITEMS_INFO = "MEDIA_ITEMS_INFO",
      DESCRIPTION = "DESCRIPTION",
      DIRECT_CATEGORIES_INFO = "DIRECT_CATEGORIES_INFO",
      ALL_CATEGORIES_INFO = "ALL_CATEGORIES_INFO",
      MIN_VARIANT_PRICE_INFO = "MIN_VARIANT_PRICE_INFO",
      INFO_SECTION_DESCRIPTION = "INFO_SECTION_DESCRIPTION",
      THUMBNAIL = "THUMBNAIL",
      DIRECT_CATEGORY_IDS = "DIRECT_CATEGORY_IDS"
  }
  interface BulkCreateProductsResponse {
      /** Products created by bulk action. */
      results?: CatalogV3BulkProductResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: CommonBulkActionMetadata;
  }
  interface CatalogV3BulkProductResult {
      /** Information about successful action or error for failure. */
      itemMetadata?: WixCommonItemMetadata;
      /**
       * Full product entity.
       *
       * Returned only if `returnEntity: true` is passed in the request.
       */
      item?: V3Product;
  }
  interface WixCommonItemMetadata {
      /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError$1;
  }
  interface InvalidDigitalFileIds {
      /** ids of digital files which caused errors. */
      ids?: string[];
  }
  interface BulkCreateProductsWithInventoryRequest {
      /** List of products to create with inventory. */
      products: ProductWithInventory[];
      /**
       * Whether to return the full product entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Fields to include in the response. */
      fields?: RequestedFields$1[];
  }
  interface BulkCreateProductsWithInventoryResponse {
      /** Products created by bulk action. */
      productResults?: BulkProductResults;
      /** Inventories created by bulk action. */
      inventoryResults?: BulkInventoryItemResults;
  }
  interface BulkProductResults {
      /** Products modified by bulk action. */
      results?: CatalogV3BulkProductResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: CommonBulkActionMetadata;
  }
  interface BulkUpdateProductsRequest {
      /** List of products to update. */
      products: V3MaskedProduct[];
      /**
       * Whether to return the full product entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Fields to include in the response. */
      fields?: RequestedFields$1[];
  }
  interface V3MaskedProduct {
      /** Product to update. */
      product?: V3Product;
      /**
       * Explicit list of fields to update in product
       * @internal
       */
      fieldMask?: string[];
  }
  interface BulkUpdateProductsResponse {
      /** Products updated by bulk action. */
      results?: CatalogV3BulkProductResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: CommonBulkActionMetadata;
  }
  interface BulkUpdateProductsWithInventoryRequest {
      /** List of products to update. */
      products: MaskedProductWithInventory[];
      /**
       * Whether to return the full product entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Fields to include in the response. */
      fields?: RequestedFields$1[];
  }
  interface MaskedProductWithInventory {
      /** Product to update. */
      product?: ProductWithInventory;
      /**
       * Explicit list of fields to update in product
       * @internal
       */
      fieldMask?: string[];
  }
  interface BulkUpdateProductsWithInventoryResponse {
      /** Products updated by bulk action. */
      productResults?: BulkProductResults;
      /** Inventories updated by bulk action. */
      inventoryResults?: BulkInventoryItemResults;
  }
  interface V3BulkUpdateProductsByFilterRequest {
      /** Filter object. */
      filter?: Record<string, any> | null;
      /** Product to update. */
      product: V3Product;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
  }
  interface WixCommonSearchDetails {
      /** Defines how separate search terms in `expression` are combined */
      mode?: CommonSearchDetailsMode;
      /** Search term or expression */
      expression?: string | null;
      /** Fields to search in. If empty - will search in all searchable fields. Use dot notation to specify json path */
      fields?: string[];
      /** Flag if should use auto fuzzy search (allowing typos by a managed proximity algorithm) */
      fuzzy?: boolean;
  }
  enum CommonSearchDetailsMode {
      /** Any of the search terms must be present */
      OR = "OR",
      /** All search terms must be present */
      AND = "AND"
  }
  interface V3BulkUpdateProductsByFilterResponse {
      /**
       * Job ID.
       *
       * Pass this ID to [Get Async Job](https://dev.wix.com/docs/rest/business-management/async-job/introduction) to retrieve job details and metadata..
       */
      jobId?: string;
  }
  interface V3UpdateExtendedFieldsRequest {
      /** Product ID. */
      productId: string;
      /** App namespace. */
      namespace: string;
      /** Data to update. */
      namespaceData: Record<string, any> | null;
      /** Fields to include in the response. */
      fields?: SingleEntityOpsRequestedFields[];
  }
  interface V3UpdateExtendedFieldsResponse {
      /** Updated product. */
      product?: V3Product;
  }
  interface V3DeleteProductRequest {
      /** Product ID. */
      productId: string;
  }
  interface V3DeleteProductResponse {
  }
  interface V3BulkDeleteProductsRequest {
      /** IDs of products to delete. */
      productIds: string[];
  }
  interface V3BulkDeleteProductsResponse {
      /** Products deleted by bulk action. */
      results?: BulkDeleteProductsResponseBulkProductResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: CommonBulkActionMetadata;
  }
  interface BulkDeleteProductsResponseBulkProductResult {
      /** Bulk action metadata for products. */
      itemMetadata?: WixCommonItemMetadata;
  }
  interface V3BulkDeleteProductsByFilterRequest {
      /** Filter object. */
      filter: Record<string, any> | null;
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
  }
  interface V3BulkDeleteProductsByFilterResponse {
      /**
       * Job ID.
       *
       * Pass this ID to [Get Async Job](https://dev.wix.com/docs/rest/business-management/async-job/introduction) to retrieve job details and metadata..
       */
      jobId?: string;
  }
  interface V3GetProductRequest {
      /** Product ID. */
      productId: string;
      /** Fields to include in the response. */
      fields?: SingleEntityOpsRequestedFields[];
      /**
       * Indicates if the read should be done consistent or not. Default is false
       * @internal
       */
      consistent?: boolean | null;
  }
  interface V3GetProductResponse {
      /** Product. */
      product?: V3Product;
  }
  interface V3GetProductBySlugRequest {
      /** Product slug. */
      slug: string;
      /** Fields to include in the response. */
      fields?: SingleEntityOpsRequestedFields[];
  }
  interface V3GetProductBySlugResponse {
      /** Product. */
      product?: V3Product;
  }
  interface V3SearchProductsRequest {
      /** Search options. */
      search?: CommonCursorSearch;
      /** Fields to include in the response. */
      fields?: RequestedFields$1[];
  }
  interface CommonCursorSearch extends CommonCursorSearchPagingMethodOneOf {
      /**
       * Cursor pointing to page of results.
       * When requesting 'cursor_paging.cursor', no `filter`, `sort` or `search` can be provided.
       */
      cursorPaging?: CommonCursorPaging;
      /** A filter object. Learn more about [API query language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language). */
      filter?: Record<string, any> | null;
      /** Sort object in the form [{"fieldName":"sortField1"},{"fieldName":"sortField2","direction":"DESC"}] */
      sort?: WixCommonSorting[];
      /** Aggregations | Faceted search: refers to a way to explore large amounts of data by displaying summaries about various partitions of the data and later allowing to narrow the navigation to a specific partition. */
      aggregations?: WixCommonAggregation[];
      /** Free text to match in searchable fields */
      search?: WixCommonSearchDetails;
      /**
       * UTC offset or IANA time zone. Valid values are
       * ISO 8601 UTC offsets, such as +02:00 or -06:00,
       * and IANA time zone IDs, such as Europe/Rome
       *
       * Affects all filters and aggregations returned values.
       * You may override this behavior in a specific filter by providing
       * timestamps including time zone. e.g. `"2023-12-20T10:52:34.795Z"`
       */
      timeZone?: string | null;
  }
  /** @oneof */
  interface CommonCursorSearchPagingMethodOneOf {
      /**
       * Cursor pointing to page of results.
       * When requesting 'cursor_paging.cursor', no `filter`, `sort` or `search` can be provided.
       */
      cursorPaging?: CommonCursorPaging;
  }
  interface WixCommonSorting {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: WixCommonSortOrder;
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
       */
      selectItemsBy?: Record<string, any>[] | null;
  }
  enum WixCommonSortOrder {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface WixCommonAggregation extends WixCommonAggregationKindOneOf {
      /** Value aggregation */
      value?: CommonAggregationValueAggregation;
      /** Range aggregation */
      range?: CommonAggregationRangeAggregation;
      /** Scalar aggregation */
      scalar?: CommonAggregationScalarAggregation;
      /** Date histogram aggregation */
      dateHistogram?: CommonAggregationDateHistogramAggregation;
      /** Nested aggregation */
      nested?: CommonAggregationNestedAggregation;
      /** User-defined name of aggregation, should be unique, will appear in aggregation results */
      name?: string | null;
      /** Type of aggregation, client must provide matching aggregation field below */
      type?: WixCommonAggregationType;
      /** Field to aggregate by, use dot notation to specify json path */
      fieldPath?: string;
  }
  /** @oneof */
  interface WixCommonAggregationKindOneOf {
      /** Value aggregation */
      value?: CommonAggregationValueAggregation;
      /** Range aggregation */
      range?: CommonAggregationRangeAggregation;
      /** Scalar aggregation */
      scalar?: CommonAggregationScalarAggregation;
      /** Date histogram aggregation */
      dateHistogram?: CommonAggregationDateHistogramAggregation;
      /** Nested aggregation */
      nested?: CommonAggregationNestedAggregation;
  }
  interface AggregationRangeAggregationRangeBucket {
      /** Inclusive lower bound of the range. Required if to is not given */
      from?: number | null;
      /** Exclusive upper bound of the range. Required if from is not given */
      to?: number | null;
  }
  enum AggregationValueAggregationSortType {
      /** Should sort by number of matches */
      COUNT = "COUNT",
      /** Should sort by value of the field alphabetically */
      VALUE = "VALUE"
  }
  enum AggregationValueAggregationSortDirection {
      /** Should sort in descending order */
      DESC = "DESC",
      /** Should sort in ascending order */
      ASC = "ASC"
  }
  enum AggregationValueAggregationMissingValues {
      /** Should missing values be excluded from the aggregation results */
      EXCLUDE = "EXCLUDE",
      /** Should missing values be included in the aggregation results */
      INCLUDE = "INCLUDE"
  }
  interface AggregationValueAggregationIncludeMissingValuesOptions {
      /** Can specify custom bucket name. Defaults are [string -> "N/A"], [int -> "0"], [bool -> "false"] ... */
      addToBucket?: string;
  }
  enum WixCommonScalarType {
      UNKNOWN_SCALAR_TYPE = "UNKNOWN_SCALAR_TYPE",
      /** Count of distinct values */
      COUNT_DISTINCT = "COUNT_DISTINCT",
      /** Minimum value */
      MIN = "MIN",
      /** Maximum value */
      MAX = "MAX",
      /** Sum of values */
      SUM = "SUM",
      /** Average of values */
      AVG = "AVG"
  }
  interface CommonAggregationValueAggregation extends CommonAggregationValueAggregationOptionsOneOf {
      /** Options for including missing values */
      includeOptions?: AggregationValueAggregationIncludeMissingValuesOptions;
      /** Should sort by number of matches or value of the field */
      sortType?: AggregationValueAggregationSortType;
      /** Should sort in ascending or descending order */
      sortDirection?: AggregationValueAggregationSortDirection;
      /** How many aggregations would you like to return? Can be between 1 and 250. 10 is the default. */
      limit?: number | null;
      /** Should missing values be included or excluded from the aggregation results. Default is EXCLUDE */
      missingValues?: AggregationValueAggregationMissingValues;
  }
  /** @oneof */
  interface CommonAggregationValueAggregationOptionsOneOf {
      /** Options for including missing values */
      includeOptions?: AggregationValueAggregationIncludeMissingValuesOptions;
  }
  enum AggregationNestedAggregationNestedAggregationType {
      UNKNOWN_AGGREGATION_TYPE = "UNKNOWN_AGGREGATION_TYPE",
      /** An aggregation where result buckets are dynamically built - one per unique value */
      VALUE = "VALUE",
      /** An aggregation, where user can define set of ranges - each representing a bucket */
      RANGE = "RANGE",
      /** A single-value metric aggregation - e.g. min, max, sum, avg */
      SCALAR = "SCALAR",
      /** An aggregation, where result buckets are dynamically built - one per time interval (hour, day, week, etc.) */
      DATE_HISTOGRAM = "DATE_HISTOGRAM"
  }
  interface CommonAggregationRangeAggregation {
      /** List of range buckets, where during aggregation each entity will be placed in the first bucket where its value falls into based on provided range bounds */
      buckets?: AggregationRangeAggregationRangeBucket[];
  }
  interface CommonAggregationScalarAggregation {
      /** Define the operator for the scalar aggregation */
      type?: WixCommonScalarType;
  }
  interface CommonAggregationDateHistogramAggregation {
      /** Interval for date histogram aggregation */
      interval?: AggregationDateHistogramAggregationInterval;
  }
  enum AggregationDateHistogramAggregationInterval {
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
  interface AggregationNestedAggregationNestedAggregationItem extends AggregationNestedAggregationNestedAggregationItemKindOneOf {
      /** Value aggregation */
      value?: CommonAggregationValueAggregation;
      /** Range aggregation */
      range?: CommonAggregationRangeAggregation;
      /** Scalar aggregation */
      scalar?: CommonAggregationScalarAggregation;
      /** Date histogram aggregation */
      dateHistogram?: CommonAggregationDateHistogramAggregation;
      /** User-defined name of aggregation, should be unique, will appear in aggregation results */
      name?: string | null;
      /** Type of aggregation, client must provide matching aggregation field below */
      type?: AggregationNestedAggregationNestedAggregationType;
      /** Field to aggregate by, use dont notation to specify json path */
      fieldPath?: string;
  }
  /** @oneof */
  interface AggregationNestedAggregationNestedAggregationItemKindOneOf {
      /** Value aggregation */
      value?: CommonAggregationValueAggregation;
      /** Range aggregation */
      range?: CommonAggregationRangeAggregation;
      /** Scalar aggregation */
      scalar?: CommonAggregationScalarAggregation;
      /** Date histogram aggregation */
      dateHistogram?: CommonAggregationDateHistogramAggregation;
  }
  enum WixCommonAggregationType {
      UNKNOWN_AGGREGATION_TYPE = "UNKNOWN_AGGREGATION_TYPE",
      /** An aggregation where result buckets are dynamically built - one per unique value */
      VALUE = "VALUE",
      /** An aggregation, where user can define set of ranges - each representing a bucket */
      RANGE = "RANGE",
      /** A single-value metric aggregation - e.g. min, max, sum, avg */
      SCALAR = "SCALAR",
      /** An aggregation, where result buckets are dynamically built - one per time interval (hour, day, week, etc.) */
      DATE_HISTOGRAM = "DATE_HISTOGRAM",
      /** Multi-level aggregation, where each next aggregation is nested within previous one */
      NESTED = "NESTED"
  }
  /** Nested aggregation expressed through a list of aggregation where each next aggregation is nested within previous one */
  interface CommonAggregationNestedAggregation {
      /** Flattened list of aggregations, where each next aggregation is nested within previous one */
      nestedAggregations?: AggregationNestedAggregationNestedAggregationItem[];
  }
  interface CommonCursorPaging {
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
  interface V3SearchProductsResponse {
      /** List of products. */
      products?: V3Product[];
      /** Paging metadata. */
      pagingMetadata?: CommonCursorPagingMetadata;
      /** Aggregation data. */
      aggregationData?: CommonAggregationData;
  }
  interface CommonCursorPagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: CommonCursors;
      /**
       * Whether there are more pages to retrieve following the current page.
       *
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
  }
  interface CommonCursors {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface CommonAggregationData {
      /** key = aggregation name (as derived from search request) */
      results?: AggregationDataAggregationResults[];
  }
  interface ValueResultsValueAggregationResult {
      /** Value of the field */
      value?: string;
      /** Count of entities with this value */
      count?: number;
  }
  interface RangeResultsRangeAggregationResult {
      /** Inclusive lower bound of the range */
      from?: number | null;
      /** Exclusive upper bound of the range */
      to?: number | null;
      /** Count of entities in this range */
      count?: number;
  }
  interface AggregationResultsNestedAggregationResults extends AggregationResultsNestedAggregationResultsResultOneOf {
      /** Value aggregation results */
      values?: AggregationResultsValueResults;
      /** Range aggregation results */
      ranges?: AggregationResultsRangeResults;
      /** Scalar aggregation results */
      scalar?: AggregationDataAggregationResultsScalarResult;
      /** User-defined name of aggregation, matches the one provided in request */
      name?: string;
      /** Type of aggregation that matches result */
      type?: WixCommonAggregationType;
      /** Field to aggregate by, matches the one provided in request */
      fieldPath?: string;
  }
  /** @oneof */
  interface AggregationResultsNestedAggregationResultsResultOneOf {
      /** Value aggregation results */
      values?: AggregationResultsValueResults;
      /** Range aggregation results */
      ranges?: AggregationResultsRangeResults;
      /** Scalar aggregation results */
      scalar?: AggregationDataAggregationResultsScalarResult;
  }
  interface AggregationResultsValueResults {
      /** List of value aggregations */
      results?: ValueResultsValueAggregationResult[];
  }
  interface AggregationResultsRangeResults {
      /** List of ranges returned in same order as requested */
      results?: RangeResultsRangeAggregationResult[];
  }
  interface AggregationDataAggregationResultsScalarResult {
      /** Type of scalar aggregation */
      type?: WixCommonScalarType;
      /** Value of the scalar aggregation */
      value?: number;
  }
  interface GroupByValueResultsNestedValueAggregationResult {
      /** Value of the field */
      value?: string;
      /** Nested aggregations */
      nestedResults?: AggregationResultsNestedAggregationResults;
  }
  interface NestedResultsValueResult {
      /** Value of the field */
      value?: string;
      /** Count of entities with this value */
      count?: number | null;
  }
  interface NestedResultsRangeResult {
      /** Inclusive lower bound of the range */
      from?: number | null;
      /** Exclusive upper bound of the range */
      to?: number | null;
      /** Count of entities in this range */
      count?: number | null;
  }
  interface NestedResultsScalarResult {
      /** Value of the scalar aggregation */
      value?: number;
  }
  interface NestedResultsNestedResultValue extends NestedResultsNestedResultValueResultOneOf {
      /** Value aggregation result */
      value?: NestedResultsValueResult;
      /** Range aggregation result */
      range?: NestedResultsRangeResult;
      /** Scalar aggregation result */
      scalar?: NestedResultsScalarResult;
      /** Date histogram aggregation result */
      dateHistogram?: NestedResultsValueResult;
  }
  /** @oneof */
  interface NestedResultsNestedResultValueResultOneOf {
      /** Value aggregation result */
      value?: NestedResultsValueResult;
      /** Range aggregation result */
      range?: NestedResultsRangeResult;
      /** Scalar aggregation result */
      scalar?: NestedResultsScalarResult;
      /** Date histogram aggregation result */
      dateHistogram?: NestedResultsValueResult;
  }
  interface NestedResultsResults {
      /** List of nested aggregations */
      results?: Record<string, NestedResultsNestedResultValue>;
  }
  interface DateHistogramResultsDateHistogramResult {
      /** Date in ISO 8601 format */
      value?: string;
      /** Count of documents in the bucket */
      count?: number;
  }
  interface AggregationResultsGroupByValueResults {
      /** List of value aggregations */
      results?: GroupByValueResultsNestedValueAggregationResult[];
  }
  interface AggregationResultsDateHistogramResults {
      /** List of date histogram aggregations */
      results?: DateHistogramResultsDateHistogramResult[];
  }
  /**
   * Results of `NESTED` aggregation type in a flattened form
   * aggregations in resulting array are keyed by requested aggregation `name`.
   */
  interface AggregationResultsNestedResults {
      /** List of nested aggregations */
      results?: NestedResultsResults[];
  }
  interface AggregationDataAggregationResults extends AggregationDataAggregationResultsResultOneOf {
      /** Value aggregation results */
      values?: AggregationResultsValueResults;
      /** Range aggregation results */
      ranges?: AggregationResultsRangeResults;
      /** Scalar aggregation results */
      scalar?: AggregationDataAggregationResultsScalarResult;
      /** Group by value aggregation results */
      groupedByValue?: AggregationResultsGroupByValueResults;
      /** Date histogram aggregation results */
      dateHistogram?: AggregationResultsDateHistogramResults;
      /** Nested aggregation results */
      nested?: AggregationResultsNestedResults;
      /** User-defined name of aggregation as derived from search request */
      name?: string;
      /** Type of aggregation that must match provided kind as derived from search request */
      type?: WixCommonAggregationType;
      /** Field to aggregate by as derived from search request */
      fieldPath?: string;
  }
  /** @oneof */
  interface AggregationDataAggregationResultsResultOneOf {
      /** Value aggregation results */
      values?: AggregationResultsValueResults;
      /** Range aggregation results */
      ranges?: AggregationResultsRangeResults;
      /** Scalar aggregation results */
      scalar?: AggregationDataAggregationResultsScalarResult;
      /** Group by value aggregation results */
      groupedByValue?: AggregationResultsGroupByValueResults;
      /** Date histogram aggregation results */
      dateHistogram?: AggregationResultsDateHistogramResults;
      /** Nested aggregation results */
      nested?: AggregationResultsNestedResults;
  }
  interface V3QueryProductsRequest {
      /** Query options. */
      query?: CommonCursorQuery;
      /** Fields to include in the response. */
      fields?: RequestedFields$1[];
  }
  interface CommonCursorQuery extends CommonCursorQueryPagingMethodOneOf {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CommonCursorPaging;
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
      sort?: WixCommonSorting[];
  }
  /** @oneof */
  interface CommonCursorQueryPagingMethodOneOf {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CommonCursorPaging;
  }
  interface V3QueryProductsResponse {
      /** List of products. */
      products?: V3Product[];
      /** Paging metadata. */
      pagingMetadata?: CommonCursorPagingMetadata;
  }
  interface V3CountProductsRequest {
      /** Filter object. */
      filter?: Record<string, any> | null;
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
      /**
       * Whether to return non-visible products (`visible:false`). Your app must have the required `SCOPE.STORES.PRODUCT_READ_ADMIN` permission scope.
       *
       * Default: `false`
       */
      returnNonVisibleProducts?: boolean;
  }
  interface V3CountProductsResponse {
      /** Total number of products. */
      count?: number;
  }
  interface BulkUpdateProductVariantsByFilterRequest {
      /** Filter object. */
      filter: Record<string, any> | null;
      /** Variant to update. */
      variant: Variant;
      /**
       * Explicit list of variant fields to update.
       * @internal
       */
      fieldMask?: string[];
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
  }
  interface BulkUpdateProductVariantsByFilterResponse {
      /**
       * Job ID.
       *
       * Pass this ID to [Get Async Job](https://dev.wix.com/docs/rest/business-management/async-job/introduction) to retrieve job details and metadata..
       */
      jobId?: string;
  }
  interface BulkAdjustProductVariantsByFilterRequest {
      /** Filter object. */
      filter: Record<string, any> | null;
      /**
       * Base price adjustment.
       * @deprecated Base price adjustment.
       * @replacedBy compare_at_price
       * @targetRemovalDate 2024-12-31
       */
      basePrice?: V3AdjustValue;
      /**
       * Sale price adjustment.
       * @deprecated Sale price adjustment.
       * @replacedBy actual_price
       * @targetRemovalDate 2024-12-31
       */
      salePrice?: V3AdjustValue;
      /** Cost adjustment. */
      cost?: V3AdjustValue;
      /**
       * Set variant sale price from base price by applying provided discount to it.
       * For example variant base price 100$, variant sale price 95$, requested `salePriceFromBasePrice.percentage` is 10, then old sale price ignored and new sale price set to 90 (100$ - 10%).
       * @deprecated Set variant sale price from base price by applying provided discount to it.
       * For example variant base price 100$, variant sale price 95$, requested `salePriceFromBasePrice.percentage` is 10, then old sale price ignored and new sale price set to 90 (100$ - 10%).
       * @replacedBy actual_price_from_compare_at_price
       * @targetRemovalDate 2024-12-31
       */
      salePriceFromBasePrice?: V3UnsignedAdjustValue;
      /**
       * Rounding strategy of new calculated prices.
       *
       * + `NO_ROUNDING`: Calculated prices will be saved without rounding to keep max possible precision.
       * + `CURRENCY_PRECISION`: Calculated prices will be rounded according to the currency's precision requirements. For example. `$3.5555` will be saved as `$3.56`; `¥3.5555` will be saved as `¥4`.
       * + `NEAREST_WHOLE_NUMBER`: Calculated prices will be rounded to the nearest whole number.
       */
      rounding?: BulkAdjustProductVariantsByFilterRequestRoundingStrategy;
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
      /** Actual price adjustment. */
      actualPrice?: V3AdjustValue;
      /** Compare at price adjustment. */
      compareAtPrice?: V3AdjustValue;
      /**
       * Set variant actual_price from compare_at_price by applying provided discount to it.
       * if compare-at-price doesn't exist, actual_price will be set to compare_at_price and the discount will be calculated from it.
       * For example variant compare at price 100$, variant actual price is 95$, requested `salePriceFromBasePrice.percentage` is 10, then old actual price ignored and new actual price set to 90 (100$ - 10%).
       */
      compareAtPriceDiscount?: V3UnsignedAdjustValue;
  }
  interface V3AdjustValue extends V3AdjustValueAdjustValueOneOf {
      /** A decimal value to increase or reduce from the original value, can be negative. */
      amount?: string;
      /** The percentage value to increase or reduce from the current value, can be negative. */
      percentage?: number;
  }
  /** @oneof */
  interface V3AdjustValueAdjustValueOneOf {
      /** A decimal value to increase or reduce from the original value, can be negative. */
      amount?: string;
      /** The percentage value to increase or reduce from the current value, can be negative. */
      percentage?: number;
  }
  interface V3UnsignedAdjustValue extends V3UnsignedAdjustValueAdjustValueOneOf {
      /** A decimal value to reduce from the original value. */
      amount?: string;
      /** The percentage value to reduce from the original value. */
      percentage?: number;
  }
  /** @oneof */
  interface V3UnsignedAdjustValueAdjustValueOneOf {
      /** A decimal value to reduce from the original value. */
      amount?: string;
      /** The percentage value to reduce from the original value. */
      percentage?: number;
  }
  enum BulkAdjustProductVariantsByFilterRequestRoundingStrategy {
      UNKNOWN_ROUNDING_STRATEGY = "UNKNOWN_ROUNDING_STRATEGY",
      /**
       * Calculated prices will be saved without rounding to keep max possible precision. It's still good idea to round numbers before displaying them.
       * Example: input $3.5555 -> saved value $3.5555
       */
      NO_ROUNDING = "NO_ROUNDING",
      /**
       * Calculated prices will be rounded according to currency precision.
       * Example: input $3.5555 -> saved value $3.56, input ¥3.5555 -> saved value ¥4
       */
      CURRENCY_PRECISION = "CURRENCY_PRECISION",
      /**
       * Calculated prices will be rounded to nearest whole number.
       * Example: input $3.5555 -> saved value $4
       */
      NEAREST_WHOLE_NUMBER = "NEAREST_WHOLE_NUMBER"
  }
  interface BulkAdjustProductVariantsByFilterResponse {
      /**
       * Job ID.
       *
       * Pass this ID to [Get Async Job](https://dev.wix.com/docs/rest/business-management/async-job/introduction) to retrieve job details and metadata..
       */
      jobId?: string;
  }
  interface V3BulkAddInfoSectionsToProductsByFilterRequest {
      /** Filter object. */
      filter: Record<string, any> | null;
      /** IDs of the info sections to add. */
      infoSectionIds: string[];
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
  }
  interface V3BulkAddInfoSectionsToProductsByFilterResponse {
      /**
       * Job ID.
       *
       * Pass this ID to [Get Async Job](https://dev.wix.com/docs/rest/business-management/async-job/introduction) to retrieve job details and metadata..
       */
      jobId?: string;
  }
  interface V3BulkAddInfoSectionsToProductsRequest {
      /** List of product IDs and revisions. */
      products: V3ProductIdWithRevision[];
      /** List of IDs of info sections to add. */
      infoSectionIds: string[];
      /**
       * Whether to return the full updated product entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Fields to include in the response. */
      fields?: RequestedFields$1[];
  }
  interface V3ProductIdWithRevision {
      /** Product ID. */
      productId?: string;
      /**
       * Revision number, which increments by 1 each time the product is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the product.
       */
      revision?: string;
  }
  interface V3BulkAddInfoSectionsToProductsResponse {
      /** Products updated by bulk action. */
      results?: CatalogV3BulkProductResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: CommonBulkActionMetadata;
  }
  interface V3BulkRemoveInfoSectionsFromProductsByFilterRequest {
      /** Filter object. */
      filter: Record<string, any> | null;
      /** IDs of info sections to remove. */
      infoSectionIds: string[];
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
  }
  interface V3BulkRemoveInfoSectionsFromProductsByFilterResponse {
      /**
       * Job ID.
       *
       * Pass this ID to [Get Async Job](https://dev.wix.com/docs/rest/business-management/async-job/introduction) to retrieve job details and metadata..
       */
      jobId?: string;
  }
  interface V3BulkRemoveInfoSectionsFromProductsRequest {
      /** List of product IDs and revisions. */
      products: V3ProductIdWithRevision[];
      /** List of IDs of info sections to remove. */
      infoSectionIds: string[];
      /**
       * Whether to return the full updated product entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Fields to include in the response. */
      fields?: RequestedFields$1[];
  }
  interface V3BulkRemoveInfoSectionsFromProductsResponse {
      /** Products updated by bulk action. */
      results?: CatalogV3BulkProductResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: CommonBulkActionMetadata;
  }
  interface BulkAddProductsToCategoriesByFilterRequest {
      /** Filter object. */
      filter?: Record<string, any> | null;
      /** IDs of the categories to which products will be added. */
      categoryIds: string[];
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
  }
  interface BulkAddProductsToCategoriesByFilterResponse {
      /**
       * Job ID.
       *
       * Pass this ID to [Get Async Job](https://dev.wix.com/docs/rest/business-management/async-job/introduction) to retrieve job details and metadata..
       */
      jobId?: string;
  }
  interface BulkRemoveProductsFromCategoriesByFilterRequest {
      /** Filter object. */
      filter?: Record<string, any> | null;
      /** IDs of the categories from which products will be removed. */
      categoryIds: string[];
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
  }
  interface BulkRemoveProductsFromCategoriesByFilterResponse {
      /**
       * Job ID.
       *
       * Pass this ID to [Get Async Job](https://dev.wix.com/docs/rest/business-management/async-job/introduction) to retrieve job details and metadata..
       */
      jobId?: string;
  }
  interface InvalidateCache$2 extends InvalidateCacheGetByOneOf$2 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$2;
      /** Invalidate by page id */
      page?: Page$2;
      /** Invalidate by URI path */
      uri?: URI$2;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$2;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf$2 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$2;
      /** Invalidate by page id */
      page?: Page$2;
      /** Invalidate by URI path */
      uri?: URI$2;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$2;
  }
  interface App$2 {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page$2 {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI$2 {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File$2 {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface DoNotCallCreateProductRequest {
      /** Product to be created */
      product?: V3Product;
      /** A list of requested fields to be included in the response. */
      fields?: SingleEntityOpsRequestedFields[];
  }
  interface DoNotCallCreateProductResponse {
      /** The created Product */
      product?: V3Product;
  }
  interface GetProductRequest {
      /** Id of the Product to retrieve */
      productId?: string;
      /** A list of requested fields to be included in the response. */
      fields?: SingleEntityOpsRequestedFields[];
      /**
       * Indicates if the read should be done consistent or not. Default is false
       * @internal
       */
      consistent?: boolean | null;
  }
  interface GetProductResponse {
      /** The retrieved Product */
      product?: V3Product;
  }
  interface GetProductBySlugRequest {
      /** Product slug. A permanent, friendly URL name unique per store. */
      slug?: string;
      /** A list of requested fields to be included in the response. */
      fields?: SingleEntityOpsRequestedFields[];
  }
  interface GetProductBySlugResponse {
      /** The retrieved Product */
      product?: V3Product;
  }
  interface DoNotCallUpdateProductRequest {
      /** Product to be updated, may be partial */
      product?: V3Product;
      /**
       * Explicit list of fields to update
       * @internal
       */
      fieldMask?: string[];
      /** A list of requested fields to be included in the response. */
      fields?: SingleEntityOpsRequestedFields[];
  }
  interface DoNotCallUpdateProductResponse {
      /** The updated Product */
      product?: V3Product;
  }
  interface VariantsRemoved {
      /** Removed variants ids. */
      variantIds?: string[];
  }
  interface DeleteProductRequest {
      /** Id of the Product to delete */
      productId?: string;
  }
  interface DeleteProductResponse {
  }
  interface SearchProductsRequest {
      /**
       * WQL expression. Please pay attention that unlike other arrays when you want to filter by `inventory` or `variants` instead of standard array operators you must use `$matchItems` (for usage see examples).
       * It means that product will be returned only if one or more items satisfy all filters specified in $matchItems.
       * For example, if you have 2 variants: one visible with price 10 and another one not visible with price 20, when inside $matchItems you specify `visible:true` and `price > 15` nothing will be returned because there are no variants which satisfy both conditions.
       * You still can use `$isEmpty` and `$exists` operators for fields listed above.
       * See examples to understand supported capabilities.
       * This endpoint does not return variants-info, even though it is part of the entity, as including it would result in overly large response objects.
       * If you need variants-info, you can retrieve it for a specific product using the getProduct endpoint.
       */
      search?: CursorSearch;
      /** A list of requested fields to be included in the response. */
      fields?: RequestedFields$1[];
  }
  interface CursorSearch extends CursorSearchPagingMethodOneOf {
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
       * List of sort objects.
       *
       * Learn more about the [sort section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-sort-section).
       */
      sort?: Sorting$2[];
      /** Aggregations | Faceted search: refers to a way to explore large amounts of data by displaying summaries about various partitions of the data and later allowing to narrow the navigation to a specific partition. */
      aggregations?: Aggregation[];
      /** Free text to match in searchable fields. */
      search?: SearchDetails;
      /**
       * UTC offset or IANA time zone. Valid values are
       * ISO 8601 UTC offsets, such as +02:00 or -06:00,
       * and IANA time zone IDs, such as Europe/Rome
       *
       * Affects all filters and aggregations returned values.
       * You may override this behavior in a specific filter by providing
       * timestamps including time zone. e.g. `"2023-12-20T10:52:34.795Z"`
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
      /** Ascending order. */
      ASC = "ASC",
      /** Descending order. */
      DESC = "DESC"
  }
  interface Aggregation extends AggregationKindOneOf {
      /** Value aggregation */
      value?: ValueAggregation;
      /** Range aggregation */
      range?: RangeAggregation;
      /** Scalar aggregation */
      scalar?: ScalarAggregation;
      /** Date histogram aggregation */
      dateHistogram?: DateHistogramAggregation;
      /** Nested aggregation */
      nested?: NestedAggregation;
      /** User-defined name of aggregation, should be unique, will appear in aggregation results */
      name?: string | null;
      /** Type of aggregation, client must provide matching aggregation field below */
      type?: AggregationType;
      /** Field to aggregate by, use dot notation to specify json path */
      fieldPath?: string;
  }
  /** @oneof */
  interface AggregationKindOneOf {
      /** Value aggregation */
      value?: ValueAggregation;
      /** Range aggregation */
      range?: RangeAggregation;
      /** Scalar aggregation */
      scalar?: ScalarAggregation;
      /** Date histogram aggregation */
      dateHistogram?: DateHistogramAggregation;
      /** Nested aggregation */
      nested?: NestedAggregation;
  }
  interface RangeBucket {
      /** Inclusive lower bound of the range. Required if to is not given */
      from?: number | null;
      /** Exclusive upper bound of the range. Required if from is not given */
      to?: number | null;
  }
  enum SortType {
      /** Should sort by number of matches. */
      COUNT = "COUNT",
      /** Should sort by value of the field alphabetically. */
      VALUE = "VALUE"
  }
  enum SortDirection {
      /** Should sort by descending order. */
      DESC = "DESC",
      /** Should sort by ascending order. */
      ASC = "ASC"
  }
  enum MissingValues {
      /** Exclude missing values from the aggregation results. */
      EXCLUDE = "EXCLUDE",
      /** Include missing values from the aggregation results. */
      INCLUDE = "INCLUDE"
  }
  interface IncludeMissingValuesOptions {
      /** Can specify custom bucket name. Defaults are [string -> "N/A"], [int -> "0"], [bool -> "false"] ... */
      addToBucket?: string;
  }
  enum ScalarType {
      /** Undefined scalar type. */
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
      /** Options for including missing values */
      includeOptions?: IncludeMissingValuesOptions;
      /** Should sort by number of matches or value of the field */
      sortType?: SortType;
      /** Should sort in ascending or descending order */
      sortDirection?: SortDirection;
      /** How many aggregations would you like to return? Can be between 1 and 250. 10 is the default. */
      limit?: number | null;
      /** Should missing values be included or excluded from the aggregation results. Default is EXCLUDE */
      missingValues?: MissingValues;
  }
  /** @oneof */
  interface ValueAggregationOptionsOneOf {
      /** Options for including missing values */
      includeOptions?: IncludeMissingValuesOptions;
  }
  enum NestedAggregationType {
      /** Undefined nested aggregation type. */
      UNKNOWN_AGGREGATION_TYPE = "UNKNOWN_AGGREGATION_TYPE",
      /** An aggregation where result buckets are dynamically built - one per unique value. */
      VALUE = "VALUE",
      /** An aggregation where user can define set of ranges - each representing a bucket. */
      RANGE = "RANGE",
      /** A single-value metric aggregation. For example: min, max, sum, avg. */
      SCALAR = "SCALAR",
      /** An aggregation where result buckets are dynamically built - one per time interval (hour, day, week, etc.) */
      DATE_HISTOGRAM = "DATE_HISTOGRAM"
  }
  interface RangeAggregation {
      /** List of range buckets, where during aggregation each entity will be placed in the first bucket where its value falls into based on provided range bounds */
      buckets?: RangeBucket[];
  }
  interface ScalarAggregation {
      /** Define the operator for the scalar aggregation */
      type?: ScalarType;
  }
  interface DateHistogramAggregation {
      /** Interval for date histogram aggregation */
      interval?: Interval;
  }
  enum Interval {
      /** Undefined interval type. */
      UNKNOWN_INTERVAL = "UNKNOWN_INTERVAL",
      /** Yearly interval. */
      YEAR = "YEAR",
      /** Monthly interval. */
      MONTH = "MONTH",
      /** Weekly interval. */
      WEEK = "WEEK",
      /** Daily interval. */
      DAY = "DAY",
      /** Hourly interval. */
      HOUR = "HOUR",
      /** Minute interval. */
      MINUTE = "MINUTE",
      /** Second interval. */
      SECOND = "SECOND"
  }
  interface NestedAggregationItem extends NestedAggregationItemKindOneOf {
      /** Value aggregation */
      value?: ValueAggregation;
      /** Range aggregation */
      range?: RangeAggregation;
      /** Scalar aggregation */
      scalar?: ScalarAggregation;
      /** Date histogram aggregation */
      dateHistogram?: DateHistogramAggregation;
      /** User-defined name of aggregation, should be unique, will appear in aggregation results */
      name?: string | null;
      /** Type of aggregation, client must provide matching aggregation field below */
      type?: NestedAggregationType;
      /** Field to aggregate by, use dont notation to specify json path */
      fieldPath?: string;
  }
  /** @oneof */
  interface NestedAggregationItemKindOneOf {
      /** Value aggregation */
      value?: ValueAggregation;
      /** Range aggregation */
      range?: RangeAggregation;
      /** Scalar aggregation */
      scalar?: ScalarAggregation;
      /** Date histogram aggregation */
      dateHistogram?: DateHistogramAggregation;
  }
  enum AggregationType {
      /** Undefined aggregation type. */
      UNKNOWN_AGGREGATION_TYPE = "UNKNOWN_AGGREGATION_TYPE",
      /** An aggregation where result buckets are dynamically built - one per unique value. */
      VALUE = "VALUE",
      /** An aggregation where a user can define set of ranges - each representing a bucket. */
      RANGE = "RANGE",
      /** A single-value metric aggregation. For example: min, max, sum, avg. */
      SCALAR = "SCALAR",
      /** An aggregation where result buckets are dynamically built - one per time interval (hour, day, week, etc.) */
      DATE_HISTOGRAM = "DATE_HISTOGRAM",
      /** A Multi-level aggregation where each next aggregation is nested within previous one. */
      NESTED = "NESTED"
  }
  /** Nested aggregation expressed through a list of aggregation where each next aggregation is nested within previous one */
  interface NestedAggregation {
      /** Flattened list of aggregations, where each next aggregation is nested within previous one */
      nestedAggregations?: NestedAggregationItem[];
  }
  interface SearchDetails {
      /** Defines how separate search terms in `expression` are combined. */
      mode?: Mode;
      /** Search term or expression */
      expression?: string | null;
      /** Fields to search in. If empty - will search in all searchable fields. Use dot notation to specify json path */
      fields?: string[];
      /** Flag if should use auto fuzzy search (allowing typos by a managed proximity algorithm) */
      fuzzy?: boolean;
  }
  enum Mode {
      /** Any of the search terms must be present. */
      OR = "OR",
      /** All search terms must be present. */
      AND = "AND"
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
  interface SearchProductsResponse {
      /** Products which satisfy the provided query. */
      products?: V3Product[];
      /** Paging metadata. Contains cursor which can be used in next query. */
      pagingMetadata?: CursorPagingMetadata$2;
      /** Aggregation data. */
      aggregationData?: AggregationData;
  }
  interface CursorPagingMetadata$2 {
      /** Number of items returned in the response. */
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
  }
  interface Cursors$2 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface AggregationData {
      /** key = aggregation name (as derived from search request) */
      results?: AggregationResults[];
  }
  interface ValueAggregationResult {
      /** Value of the field */
      value?: string;
      /** Count of entities with this value */
      count?: number;
  }
  interface RangeAggregationResult {
      /** Inclusive lower bound of the range */
      from?: number | null;
      /** Exclusive upper bound of the range */
      to?: number | null;
      /** Count of entities in this range */
      count?: number;
  }
  interface NestedAggregationResults extends NestedAggregationResultsResultOneOf {
      /** Value aggregation results */
      values?: ValueResults;
      /** Range aggregation results */
      ranges?: RangeResults;
      /** Scalar aggregation results */
      scalar?: AggregationResultsScalarResult;
      /** User-defined name of aggregation, matches the one provided in request */
      name?: string;
      /** Type of aggregation that matches result */
      type?: AggregationType;
      /** Field to aggregate by, matches the one provided in request */
      fieldPath?: string;
  }
  /** @oneof */
  interface NestedAggregationResultsResultOneOf {
      /** Value aggregation results */
      values?: ValueResults;
      /** Range aggregation results */
      ranges?: RangeResults;
      /** Scalar aggregation results */
      scalar?: AggregationResultsScalarResult;
  }
  interface ValueResults {
      /** List of value aggregations */
      results?: ValueAggregationResult[];
  }
  interface RangeResults {
      /** List of ranges returned in same order as requested */
      results?: RangeAggregationResult[];
  }
  interface AggregationResultsScalarResult {
      /** Type of scalar aggregation */
      type?: ScalarType;
      /** Value of the scalar aggregation */
      value?: number;
  }
  interface NestedValueAggregationResult {
      /** Value of the field */
      value?: string;
      /** Nested aggregations */
      nestedResults?: NestedAggregationResults;
  }
  interface ValueResult {
      /** Value of the field */
      value?: string;
      /** Count of entities with this value */
      count?: number | null;
  }
  interface RangeResult {
      /** Inclusive lower bound of the range */
      from?: number | null;
      /** Exclusive upper bound of the range */
      to?: number | null;
      /** Count of entities in this range */
      count?: number | null;
  }
  interface ScalarResult {
      /** Value of the scalar aggregation */
      value?: number;
  }
  interface NestedResultValue extends NestedResultValueResultOneOf {
      /** Value aggregation result */
      value?: ValueResult;
      /** Range aggregation result */
      range?: RangeResult;
      /** Scalar aggregation result */
      scalar?: ScalarResult;
      /** Date histogram aggregation result */
      dateHistogram?: ValueResult;
  }
  /** @oneof */
  interface NestedResultValueResultOneOf {
      /** Value aggregation result */
      value?: ValueResult;
      /** Range aggregation result */
      range?: RangeResult;
      /** Scalar aggregation result */
      scalar?: ScalarResult;
      /** Date histogram aggregation result */
      dateHistogram?: ValueResult;
  }
  interface Results {
      /** List of nested aggregations */
      results?: Record<string, NestedResultValue>;
  }
  interface DateHistogramResult {
      /** Date in ISO 8601 format */
      value?: string;
      /** Count of documents in the bucket */
      count?: number;
  }
  interface GroupByValueResults {
      /** List of value aggregations */
      results?: NestedValueAggregationResult[];
  }
  interface DateHistogramResults {
      /** List of date histogram aggregations */
      results?: DateHistogramResult[];
  }
  /**
   * Results of `NESTED` aggregation type in a flattened form
   * aggregations in resulting array are keyed by requested aggregation `name`.
   */
  interface NestedResults {
      /** List of nested aggregations */
      results?: Results[];
  }
  interface AggregationResults extends AggregationResultsResultOneOf {
      /** Value aggregation results */
      values?: ValueResults;
      /** Range aggregation results */
      ranges?: RangeResults;
      /** Scalar aggregation results */
      scalar?: AggregationResultsScalarResult;
      /** Group by value aggregation results */
      groupedByValue?: GroupByValueResults;
      /** Date histogram aggregation results */
      dateHistogram?: DateHistogramResults;
      /** Nested aggregation results */
      nested?: NestedResults;
      /** User-defined name of aggregation as derived from search request */
      name?: string;
      /** Type of aggregation that must match provided kind as derived from search request */
      type?: AggregationType;
      /** Field to aggregate by as derived from search request */
      fieldPath?: string;
  }
  /** @oneof */
  interface AggregationResultsResultOneOf {
      /** Value aggregation results */
      values?: ValueResults;
      /** Range aggregation results */
      ranges?: RangeResults;
      /** Scalar aggregation results */
      scalar?: AggregationResultsScalarResult;
      /** Group by value aggregation results */
      groupedByValue?: GroupByValueResults;
      /** Date histogram aggregation results */
      dateHistogram?: DateHistogramResults;
      /** Nested aggregation results */
      nested?: NestedResults;
  }
  interface SearchRelatedProductsRequest {
      /** Search parameters. */
      searchRelated?: SearchRelated;
  }
  interface SearchRelated {
      /** A list of entity IDs to search related entities for */
      relatedToIds?: string[];
      /** Search details */
      search?: SearchRelatedDetails;
      /** A filter object. Learn more about [API query language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language). */
      filter?: Record<string, any> | null;
      /** Sort object in the form [{"fieldName":"sortField1"},{"fieldName":"sortField2","direction":"DESC"}] */
      sort?: Sorting$2[];
      /** Number of related documents to return */
      limit?: number | null;
  }
  interface SearchRelatedDetails {
      /** Search term or expression */
      expression?: string | null;
      /** Fields to search in. If empty - will search in all searchable fields. Use dot notation to specify json path */
      fields?: string[];
  }
  interface SearchRelatedProductsResponse {
      /** The IDs of related Products that satisfy the request. */
      productIds?: string[];
  }
  interface EventuallyConsistentQueryProductsRequest {
      /**
       * WQL expression. Please pay attention that unlike other arrays when you want to filter by `inventory`, `options` or `variants` instead of standard array operators you must use `$matchItems` (for usage see examples).
       * It means that product will be returned only if one or more items satisfy all filters specified in $matchItems.
       * For example, if you have 2 variants: one visible with price 10 and another one not visible with price 20, when inside $matchItems you specify `visible:true` and `price > 15` nothing will be returned because there are no variants which satisfy both conditions.
       * You still can use `$isEmpty` and `$exists` operators for fields listed above.
       * See examples to understand supported capabilities.
       */
      query?: CursorQuery$2;
      /** A list of requested fields to be included in the response. */
      fields?: RequestedFields$1[];
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
  interface EventuallyConsistentQueryProductsResponse {
      /** Products which satisfy the provided query. */
      products?: V3Product[];
      /** Paging metadata. Contains cursor which can be used in next query. */
      pagingMetadata?: CursorPagingMetadata$2;
  }
  interface QueryProductsRequest {
      /** WQL expression */
      query?: CursorQuery$2;
      /** A list of requested fields to be included in the response. */
      fields?: RequestedFields$1[];
  }
  interface QueryProductsResponse {
      /** The retrieved Products */
      products?: V3Product[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata$2;
  }
  interface DeprecatedSearchProductsWithOffsetRequest {
      /** Filter and sort with limit/offset based paging */
      search?: PlatformOffsetSearch;
      /** A list of requested fields to be included in the response. */
      fields?: RequestedFields$1[];
  }
  interface PlatformOffsetSearch extends PlatformOffsetSearchPagingMethodOneOf {
      /** Pointer to page of results using offset. Can not be used together with 'cursor_paging' */
      paging?: PlatformPaging;
      /** A filter object. Learn more about [API query language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language). */
      filter?: Record<string, any> | null;
      /** Sort object in the form [{"fieldName":"sortField1"},{"fieldName":"sortField2","direction":"DESC"}] */
      sort?: CommonSorting[];
      /** Aggregations | Faceted search: refers to a way to explore large amounts of data by displaying summaries about various partitions of the data and later allowing to narrow the navigation to a specific partition. */
      aggregations?: CommonAggregation[];
      /** free text to match in searchable fields */
      search?: CommonSearchDetails;
  }
  /** @oneof */
  interface PlatformOffsetSearchPagingMethodOneOf {
      /** Pointer to page of results using offset. Can not be used together with 'cursor_paging' */
      paging?: PlatformPaging;
  }
  interface CommonSorting {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: CommonSortOrder;
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
  enum CommonSortOrder {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CommonAggregation extends CommonAggregationKindOneOf {
      /** Value aggregation. */
      value?: AggregationValueAggregation;
      /** Range aggregation. */
      range?: AggregationRangeAggregation;
      /** Scalar aggregation. */
      scalar?: AggregationScalarAggregation;
      /** Date histogram aggregation. */
      dateHistogram?: AggregationDateHistogramAggregation;
      /** Nested aggregation. */
      nested?: AggregationNestedAggregation;
      /** User-defined name of aggregation, should be unique, will appear in aggregation results. */
      name?: string | null;
      /** Type of aggregation, client must provide matching aggregation field below. */
      type?: CommonAggregationType;
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
  interface CommonAggregationKindOneOf {
      /** Value aggregation. */
      value?: AggregationValueAggregation;
      /** Range aggregation. */
      range?: AggregationRangeAggregation;
      /** Scalar aggregation. */
      scalar?: AggregationScalarAggregation;
      /** Date histogram aggregation. */
      dateHistogram?: AggregationDateHistogramAggregation;
      /** Nested aggregation. */
      nested?: AggregationNestedAggregation;
  }
  interface RangeAggregationRangeBucket {
      /** Inclusive lower bound of the range. Required if `to` is not provided. */
      from?: number | null;
      /** Exclusive upper bound of the range. Required if `from` is not provided. */
      to?: number | null;
  }
  enum ValueAggregationSortType {
      /** Sort by number of matches. */
      COUNT = "COUNT",
      /** Sort by value of the field alphabetically. */
      VALUE = "VALUE"
  }
  enum ValueAggregationSortDirection {
      /** Sort in descending order. */
      DESC = "DESC",
      /** Sort in ascending order. */
      ASC = "ASC"
  }
  enum ValueAggregationMissingValues {
      /** Exclude missing values from the aggregation results. */
      EXCLUDE = "EXCLUDE",
      /** Include missing values in the aggregation results. */
      INCLUDE = "INCLUDE"
  }
  interface ValueAggregationIncludeMissingValuesOptions {
      /** Specify custom bucket name. Defaults are [string -> "N/A"], [int -> "0"], [bool -> "false"] ... */
      addToBucket?: string;
  }
  enum CommonScalarType {
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
  interface AggregationValueAggregation extends AggregationValueAggregationOptionsOneOf {
      /** Options for including missing values. */
      includeOptions?: ValueAggregationIncludeMissingValuesOptions;
      /** Whether to sort by number of matches or value of the field. */
      sortType?: ValueAggregationSortType;
      /** Whether to sort in ascending or descending order. */
      sortDirection?: ValueAggregationSortDirection;
      /** How many aggregations to return. Can be between 1 and 250. 10 is the default. */
      limit?: number | null;
      /** Whether to include or exclude missing values from the aggregation results. Default: `EXCLUDE`. */
      missingValues?: ValueAggregationMissingValues;
  }
  /** @oneof */
  interface AggregationValueAggregationOptionsOneOf {
      /** Options for including missing values. */
      includeOptions?: ValueAggregationIncludeMissingValuesOptions;
  }
  enum NestedAggregationNestedAggregationType {
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
  interface AggregationRangeAggregation {
      /** List of range buckets, where during aggregation each entity will be placed in the first bucket its value falls into, based on the provided range bounds. */
      buckets?: RangeAggregationRangeBucket[];
  }
  interface AggregationScalarAggregation {
      /** Define the operator for the scalar aggregation. */
      type?: CommonScalarType;
  }
  interface AggregationDateHistogramAggregation {
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
  interface NestedAggregationNestedAggregationItem extends NestedAggregationNestedAggregationItemKindOneOf {
      /** Value aggregation. */
      value?: AggregationValueAggregation;
      /** Range aggregation. */
      range?: AggregationRangeAggregation;
      /** Scalar aggregation. */
      scalar?: AggregationScalarAggregation;
      /** Date histogram aggregation. */
      dateHistogram?: AggregationDateHistogramAggregation;
      /** User-defined name of aggregation, should be unique, will appear in aggregation results. */
      name?: string | null;
      /** Type of aggregation, client must provide matching aggregation field below. */
      type?: NestedAggregationNestedAggregationType;
      /** Field to aggregate by, use dot notation to specify json path. */
      fieldPath?: string;
  }
  /** @oneof */
  interface NestedAggregationNestedAggregationItemKindOneOf {
      /** Value aggregation. */
      value?: AggregationValueAggregation;
      /** Range aggregation. */
      range?: AggregationRangeAggregation;
      /** Scalar aggregation. */
      scalar?: AggregationScalarAggregation;
      /** Date histogram aggregation. */
      dateHistogram?: AggregationDateHistogramAggregation;
  }
  enum CommonAggregationType {
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
  interface AggregationNestedAggregation {
      /** Flattened list of aggregations, where each next aggregation is nested within previous one. */
      nestedAggregations?: NestedAggregationNestedAggregationItem[];
  }
  interface GroupByAggregation extends GroupByAggregationKindOneOf {
      /** Value aggregation configuration. */
      value?: AggregationValueAggregation;
      /** User-defined name of aggregation, should be unique, will appear in aggregation results. */
      name?: string | null;
      /** Field to aggregate by. */
      fieldPath?: string;
  }
  /** @oneof */
  interface GroupByAggregationKindOneOf {
      /** Value aggregation configuration. */
      value?: AggregationValueAggregation;
  }
  interface CommonSearchDetails {
      /** Defines how separate search terms in `expression` are combined. */
      mode?: SearchDetailsMode;
      /** Search term or expression. */
      expression?: string | null;
      /** Fields to search in. If empty - will search in all searchable fields. Use dot notation to specify json path. */
      fields?: string[];
      /** Whether to use auto fuzzy search (allowing typos by a managed proximity algorithm). */
      fuzzy?: boolean;
  }
  enum SearchDetailsMode {
      /** Any of the search terms must be present. */
      OR = "OR",
      /** All search terms must be present. */
      AND = "AND"
  }
  interface PlatformPaging {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface DeprecatedSearchProductsWithOffsetResponse {
      /** Products which satisfy the provided query. */
      products?: V3Product[];
      /** Paging metadata. */
      pagingMetadata?: PagingMetadata;
      /** Aggregation data. */
      aggregationData?: AggregationData;
  }
  interface PagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. */
      total?: number | null;
      /** Flag that indicates the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface RetrieveVariantsRequest {
      /** Ids of the product and variants to retrieve */
      productVariantIds?: ProductVariantIds[];
      /**
       * Pointer to the next page in the list of results.
       * Pass the relevant cursor token from the `pagingMetadata` in the previous call's response.
       * Not relevant for the first request.
       */
      cursorPaging?: VariantsCursorPaging;
      /** Fields to include in the response. */
      fields?: VariantsOpsRequestedFields[];
  }
  interface ProductVariantIds {
      /** Product id of the requested variants. */
      productId?: string;
      /** A list of variant ids. */
      variantIds?: string[];
  }
  interface VariantsCursorPaging {
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
  enum VariantsOpsRequestedFields {
      /** Not implemented. */
      UNKNOWN_REQUESTED_FIELD = "UNKNOWN_REQUESTED_FIELD",
      CURRENCY = "CURRENCY",
      /** You can request merchant data only if you have the `SCOPE.STORES.PRODUCT_READ_ADMIN` permission scope. */
      MERCHANT_DATA = "MERCHANT_DATA",
      SUBSCRIPTION_PRICES_INFO = "SUBSCRIPTION_PRICES_INFO",
      VARIANT_OPTION_CHOICE_NAMES = "VARIANT_OPTION_CHOICE_NAMES",
      THUMBNAIL = "THUMBNAIL"
  }
  interface RetrieveVariantsResponse {
      /** The retrieved Products and Variants */
      productVariants?: ProductVariants[];
      /** Paging metadata. Contains cursor which can be used in next query. */
      pagingMetadata?: CursorPagingMetadata$2;
  }
  interface ProductVariants {
      /** Product id of the requested variants. */
      productId?: string;
      /** A list of variants. */
      variants?: Variant[];
  }
  interface CountProductsRequest {
      /**
       * A filter object. Learn more about [API query language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language).
       * To understand supported filters and limitations see `SearchProducts` method.
       */
      filter?: Record<string, any> | null;
      /** free text to match in searchable fields */
      search?: SearchDetails;
  }
  interface CountProductsResponse {
      /** The amount of products which apply to the request */
      count?: number;
  }
  interface DoNotCallBulkCreateProductsRequest {
      /** List of products to be created. */
      products?: V3Product[];
      /** Whether to return the full product entity in the response. */
      returnEntity?: boolean;
      /** A list of requested fields to be included in the response. Relevant only if `return_entity` true. */
      fields?: RequestedFields$1[];
  }
  interface DoNotCallBulkCreateProductsResponse {
      /** Products created by bulk action. */
      results?: V3BulkProductResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  interface V3BulkProductResult {
      /** Bulk action metadata for product. */
      itemMetadata?: ItemMetadata$1;
      /**
       * Full product entity.
       *
       * Returned only if `returnEntity: true` is passed in the request.
       */
      item?: V3Product;
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
  interface BulkActionMetadata$1 {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface DoNotCallBulkUpdateProductsRequest {
      /** List of products to be updated. */
      products?: MaskedProduct[];
      /** Whether to return the full product entity in the response. */
      returnEntity?: boolean;
      /** A list of requested fields to be included in the response. Relevant only if `return_entity` true. */
      fields?: RequestedFields$1[];
  }
  interface MaskedProduct {
      /** product to be updated, may be partial. */
      product?: V3Product;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  interface DoNotCallBulkUpdateProductsResponse {
      /** Products updated by bulk action. */
      results?: V3BulkProductResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  interface BulkUpdateProductsByFilterRequest {
      /**
       * Filter object in the following format:
       * `"filter" : {
       * "name": "value1",
       * "categoryIds":{"$in":["categoryId1", "categoryId2"]}
       * }`
       * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
       */
      filter?: Record<string, any> | null;
      /** Product with new field values. */
      product?: V3Product;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
      /** Free text to match in searchable fields */
      search?: SearchDetails;
  }
  interface BulkUpdateProductsByFilterResponse {
      /**
       * Job ID.
       *
       * Pass this ID to [Get Async Job](https://dev.wix.com/docs/rest/business-management/async-job/introduction) to retrieve job details and metadata..
       */
      jobId?: string;
  }
  interface BulkDeleteProductsRequest {
      /** IDs of products to be deleted. */
      productIds?: string[];
  }
  interface BulkDeleteProductsResponse {
      /** Products deleted by bulk action. */
      results?: BulkProductResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  interface BulkProductResult {
      /** Information about successful action or error for failure. */
      itemMetadata?: ItemMetadata$1;
  }
  interface BulkDeleteProductsByFilterRequest {
      /**
       * Filter object in the following format:
       * `"filter" : {
       * "actualPriceRange.minValue": {"$lte": 5.99}
       * }`
       * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
       */
      filter?: Record<string, any> | null;
      /** Free text to match in searchable fields */
      search?: SearchDetails;
  }
  interface BulkDeleteProductsByFilterResponse {
      /**
       * Job ID.
       *
       * Pass this ID to [Get Async Job](https://dev.wix.com/docs/rest/business-management/async-job/introduction) to retrieve job details and metadata..
       */
      jobId?: string;
  }
  interface UpdateExtendedFieldsRequest {
      /** ID of the entity to update. */
      productId?: string;
      /** Identifier for the app whose extended fields are being updated. */
      namespace?: string;
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData?: Record<string, any> | null;
      /** A list of requested fields to be included in the response. */
      fields?: SingleEntityOpsRequestedFields[];
  }
  interface UpdateExtendedFieldsResponse {
      /** The updated Product */
      product?: V3Product;
  }
  interface BulkAddInfoSectionsToProductsByFilterRequest {
      /**
       * Filter object in the following format:
       * `"filter" : {
       * "actualPriceRange.minValue": {"$lte": 5.99}
       * }`
       * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
       */
      filter?: Record<string, any> | null;
      /** Info sections to be added */
      infoSectionIds?: string[];
      /** Free text to match in searchable fields */
      search?: SearchDetails;
  }
  interface BulkAddInfoSectionsToProductsByFilterResponse {
      /**
       * Job ID.
       *
       * Pass this ID to [Get Async Job](https://dev.wix.com/docs/rest/business-management/async-job/introduction) to retrieve job details and metadata..
       */
      jobId?: string;
  }
  interface FulfillerDeleted {
      _id?: string;
  }
  interface BulkAddInfoSectionsToProductsRequest {
      /** Products to be updated with id and revision. */
      products?: ProductIdWithRevision[];
      /**
       * Products to be updated with id and revision.
       * Info section to be added
       */
      infoSectionIds?: string[];
      /** Whether to return all updated product entities in the response. Default: false */
      returnEntity?: boolean;
      /** A list of requested fields to be included in the response. */
      fields?: RequestedFields$1[];
  }
  interface ProductIdWithRevision {
      /** ID of product. */
      productId?: string;
      /** The revision of the Product */
      revision?: string;
  }
  interface BulkAddInfoSectionsToProductsResponse {
      /** Products updated by bulk action. */
      results?: V3BulkProductResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  interface BulkRemoveInfoSectionsFromProductsByFilterRequest {
      /**
       * Filter object in the following format:
       * `"filter" : {
       * "name": "value1",
       * "categoryIds":{"$in":["categoryId1", "categoryId2"]}
       * }`
       * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
       */
      filter?: Record<string, any> | null;
      /** Info sections to be removed */
      infoSectionIds?: string[];
      /** Free text to match in searchable fields */
      search?: SearchDetails;
  }
  interface BulkRemoveInfoSectionsFromProductsByFilterResponse {
      /**
       * Job ID.
       *
       * Pass this ID to [Get Async Job](https://dev.wix.com/docs/rest/business-management/async-job/introduction) to retrieve job details and metadata..
       */
      jobId?: string;
  }
  interface BulkRemoveInfoSectionsFromProductsRequest {
      /** Products to be updated with id and revision. */
      products?: ProductIdWithRevision[];
      /** Info section to be removed. */
      infoSectionIds?: string[];
      /** Whether to return all updated product entities in the response. Default: false */
      returnEntity?: boolean;
      /** A list of requested fields to be included in the response. */
      fields?: RequestedFields$1[];
  }
  interface BulkRemoveInfoSectionsFromProductsResponse {
      /** Products updated by bulk action. */
      results?: V3BulkProductResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  interface BulkUpdateVariantsByFilterRequest {
      /** Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains` */
      filter?: Record<string, any> | null;
      /** Variant with new field values. */
      variant?: Variant;
      /**
       * Explicit list of variant fields to update.
       * @internal
       */
      fieldMask?: string[];
      /** Free text to match in searchable fields */
      search?: SearchDetails;
  }
  interface BulkUpdateVariantsByFilterResponse {
      /**
       * Job ID.
       *
       * Pass this ID to [Get Async Job](https://dev.wix.com/docs/rest/business-management/async-job/introduction) to retrieve job details and metadata..
       */
      jobId?: string;
  }
  interface V3BulkAdjustProductVariantsByFilterRequest {
      /** Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$contains` */
      filter?: Record<string, any> | null;
      /** The amount or percentage to change the variants price by */
      basePrice?: AdjustValue;
      /** The amount or percentage to change the variants sale price by */
      salePrice?: AdjustValue;
      /** The amount or percentage to change the variants cost by */
      cost?: AdjustValue;
      /**
       * Set variant sale price from base price by applying provided discount to it.
       * For example variant base price 100$, variant sale price 95$, requested `sale_price_from_base_price.percentage` is 10, then old sale price ignored and new sale price set to 90 (100$ - 10%)
       */
      salePriceFromBasePrice?: UnsignedAdjustValue;
      /** Defines rounding strategy of new calculated prices. Default: CURRENCY_PRECISION. */
      rounding?: RoundingStrategy;
      /** Free text to match in searchable fields */
      search?: SearchDetails;
      /** Actual price adjustment. */
      actualPrice?: AdjustValue;
      /** Compare at price adjustment. */
      compareAtPrice?: AdjustValue;
      /**
       * Set variant actual_price from compare_at_price by applying provided discount to it.
       * if compare-at-price doesn't exist, actual_price will be set to compare_at_price and the discount will be calculated from it.
       * For example variant compare at price 100$, variant actual price is 95$, requested `salePriceFromBasePrice.percentage` is 10, then old actual price ignored and new actual price set to 90 (100$ - 10%).
       */
      compareAtPriceDiscount?: UnsignedAdjustValue;
  }
  interface AdjustValue extends AdjustValueAdjustValueOneOf {
      /** A decimal value to increase or reduce from the original value, can be negative. */
      amount?: string;
      /** The percentage value to increase or reduce from the current value, can be negative. */
      percentage?: number;
  }
  /** @oneof */
  interface AdjustValueAdjustValueOneOf {
      /** A decimal value to increase or reduce from the original value, can be negative. */
      amount?: string;
      /** The percentage value to increase or reduce from the current value, can be negative. */
      percentage?: number;
  }
  interface UnsignedAdjustValue extends UnsignedAdjustValueAdjustValueOneOf {
      /** A decimal value to reduce from the original value. */
      amount?: string;
      /** The percentage value to reduce from the original value. */
      percentage?: number;
  }
  /** @oneof */
  interface UnsignedAdjustValueAdjustValueOneOf {
      /** A decimal value to reduce from the original value. */
      amount?: string;
      /** The percentage value to reduce from the original value. */
      percentage?: number;
  }
  enum RoundingStrategy {
      /** Undefined rounding strategy. */
      UNKNOWN_ROUNDING_STRATEGY = "UNKNOWN_ROUNDING_STRATEGY",
      /**
       * Calculated prices are saved without rounding to keep the maximum possible precision. It's a good idea to round numbers before displaying them.
       * For example, input $3.5555 -> saved value $3.5555
       */
      NO_ROUNDING = "NO_ROUNDING",
      /**
       * Calculated prices are rounded according to currency precision.
       * For example:, input $3.5555 -> saved value $3.56, input ¥3.5555 -> saved value ¥4
       */
      CURRENCY_PRECISION = "CURRENCY_PRECISION",
      /**
       * Calculated prices are rounded to nearest whole number.
       * For example, input $3.5555 -> saved value $4
       */
      NEAREST_WHOLE_NUMBER = "NEAREST_WHOLE_NUMBER"
  }
  interface V3BulkAdjustProductVariantsByFilterResponse {
      /**
       * Job ID.
       *
       * Pass this ID to [Get Async Job](https://dev.wix.com/docs/rest/business-management/async-job/introduction) to retrieve job details and metadata..
       */
      jobId?: string;
  }
  interface BulkInventoryItemAction {
      /** Inventory items. */
      inventoryItems?: InventoryItem[];
  }
  /**
   * Creates a new product.
   *
   * This endpoint also allows to add a ribbon, brand, info sections, options, and modifiers.
   * @param product - Product to create.
   *
   * At least 1 variant must be provided and each variant must have relevant item in `choices` field for every item in `options`.
   * If `options` is empty one default variant must be provided with empty `choices` list.
   * @public
   * @documentationMaturity preview
   * @requiredField product
   * @requiredField product.media.itemsInfo.items
   * @requiredField product.modifiers
   * @requiredField product.modifiers.choicesSettings.choices
   * @requiredField product.name
   * @requiredField product.options.choicesSettings.choices
   * @requiredField product.physicalProperties.pricePerUnit.measurementUnit
   * @requiredField product.productType
   * @requiredField product.subscriptionDetails.subscriptions
   * @requiredField product.subscriptionDetails.subscriptions.discount
   * @requiredField product.subscriptionDetails.subscriptions.discount.type
   * @requiredField product.subscriptionDetails.subscriptions.frequency
   * @requiredField product.subscriptionDetails.subscriptions.title
   * @requiredField product.variantsInfo
   * @requiredField product.variantsInfo.variants
   * @requiredField product.variantsInfo.variants.digitalProperties.digitalFile
   * @requiredField product.variantsInfo.variants.digitalProperties.digitalFile._id
   * @requiredField product.variantsInfo.variants.physicalProperties.pricePerUnit.settings.measurementUnit
   * @requiredField product.variantsInfo.variants.price
   * @requiredField product.variantsInfo.variants.price.basePrice
   * @permissionId WIX_STORES.PRODUCT_CREATE
   * @adminMethod
   * @returns Created product.
   */
  function createProduct(product: V3Product, options?: CreateProductOptions): Promise<V3Product>;
  interface CreateProductOptions {
      /** Fields to include in the response. */
      fields?: SingleEntityOpsRequestedFields[];
  }
  /**
   * Creates a new product, and can create the product's inventory in the variants' default locations.
   *
   * This endpoint also allows to add a ribbon, brand, info sections, options, and modifiers.
   * @param product - Product to create with inventory.
   *
   * At least one variant must be provided and each variant must have relevant item in `choices` field for every item in `options`.
   * If `options` is empty one default variant must be provided with empty `choices` list.
   * @public
   * @documentationMaturity preview
   * @requiredField product
   * @requiredField product.media.itemsInfo.items
   * @requiredField product.modifiers.choicesSettings.choices
   * @requiredField product.name
   * @requiredField product.options.choicesSettings.choices
   * @requiredField product.physicalProperties.pricePerUnit.measurementUnit
   * @requiredField product.productType
   * @requiredField product.subscriptionDetails.subscriptions
   * @requiredField product.subscriptionDetails.subscriptions.discount
   * @requiredField product.subscriptionDetails.subscriptions.discount.type
   * @requiredField product.subscriptionDetails.subscriptions.frequency
   * @requiredField product.subscriptionDetails.subscriptions.title
   * @requiredField product.variantsInfo
   * @requiredField product.variantsInfo.variants.digitalProperties.digitalFile
   * @requiredField product.variantsInfo.variants.digitalProperties.digitalFile._id
   * @requiredField product.variantsInfo.variants.physicalProperties.pricePerUnit.settings.measurementUnit
   * @requiredField product.variantsInfo.variants.price
   * @requiredField product.variantsInfo.variants.price.basePrice
   * @permissionId WIX_STORES.PRODUCT_CREATE
   * @adminMethod
   */
  function createProductWithInventory(product: ProductWithInventory, options?: CreateProductWithInventoryOptions): Promise<CreateProductWithInventoryResponse>;
  interface CreateProductWithInventoryOptions {
      /**
       * Whether to return inventory entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Fields to include in the response. */
      fields?: SingleEntityOpsRequestedFields[];
  }
  /**
   * Updates a product.
   *
   * Each time the product is updated, `revision` increments by 1.
   * The current `revision` must be passed when updating the product.
   * This ensures you're working with the latest product and prevents unintended overwrites.
   *
   * >**Notes:**
   * > + If `variantsInfo.variants` are passed, they will replace all existing variants.
   * > + To update existing `variantsInfo.variants`, make sure to provide `variantsInfo.variants.id`. If no ID is passed, the variant will be created with a new ID.
   * @param _id - Product ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField product
   * @requiredField product.media.itemsInfo.items
   * @requiredField product.modifiers.choicesSettings.choices
   * @requiredField product.options.choicesSettings.choices
   * @requiredField product.physicalProperties.pricePerUnit.measurementUnit
   * @requiredField product.revision
   * @requiredField product.subscriptionDetails.subscriptions
   * @requiredField product.subscriptionDetails.subscriptions.discount
   * @requiredField product.subscriptionDetails.subscriptions.discount.type
   * @requiredField product.subscriptionDetails.subscriptions.frequency
   * @requiredField product.subscriptionDetails.subscriptions.title
   * @requiredField product.variantsInfo.variants.digitalProperties.digitalFile
   * @requiredField product.variantsInfo.variants.digitalProperties.digitalFile._id
   * @requiredField product.variantsInfo.variants.physicalProperties.pricePerUnit.settings.measurementUnit
   * @requiredField product.variantsInfo.variants.price
   * @requiredField product.variantsInfo.variants.price.basePrice
   * @permissionId WIX_STORES.PRODUCT_UPDATE
   * @adminMethod
   * @returns Updated product.
   */
  function updateProduct(_id: string | null, product: UpdateProduct, options?: UpdateProductOptions): Promise<V3Product>;
  interface UpdateProduct {
      /**
       * Physical properties.
       *
       * Required when `productType: PHYSICAL`.
       */
      physicalProperties?: PhysicalProperties;
      /**
       * Product ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the product is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the product.
       *
       * Ignored when creating a product.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the product was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the product was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Unique numeric identifier for the product. Much more efficient for filter and sort than the `id`.
       * @internal
       * @readonly
       */
      numericId?: string;
      /** Product name. Translatable. */
      name?: string | null;
      /**
       * Product slug.
       *
       * If not provided, the slug is autogenerated based on the product name.
       */
      slug?: string | null;
      /**
       * URL to the site's product page.
       *
       * > **Note:** Returned only when you pass `"URL"` to the `fields` array in Products API requests.
       * @readonly
       */
      url?: string;
      /**
       * Product description using rich content.
       * > **Note:** Returned only when you pass `"DESCRIPTION"` to the `fields` array in Products API requests.
       *
       * <widget src="https://apps.wix.com/_serverless/ricos-playground-services/goto/api-component" plugins="indent.emoji.divider.codeBlock.file.gallery.giphy.image.table.link.textHighlight.textColor" exampleid="7dc9240e-d548-417a-abcf-0291b68b4303">
       * <a href="https://dev.wix.com/docs/ricos/api-reference/ricos-document">See Ricos document reference</a>
       * </widget>
       */
      description?: RichContent;
      /**
       * Product description in HTML.
       *
       * + When provided on create/update, this string must be a valid HTML. It will then be converted to rich content.
       * + `plainDescription` is ignored when value is also passed to the `description` field.
       * > **Note:** Returned only when you pass `"PLAIN_DESCRIPTION"` to the `fields` array in Products API requests.
       */
      plainDescription?: string | null;
      /**
       * Whether the product is visible to site visitors on the site.
       *
       * Default: `true`
       */
      visible?: boolean | null;
      /**
       * Whether the product is visible in POS (point of sale).
       *
       * Default: `true`
       * > **Note:** Always `false` for `productType: DIGITAL`.
       */
      visibleInPos?: boolean | null;
      /** Product media items. */
      media?: Media;
      /** Product SEO data. */
      seoData?: SeoSchema;
      /** Tax group ID. */
      taxGroupId?: string | null;
      /**
       * Product options. Allows the customer to customize the product. For example, selecting color, size, and more.
       *
       * Always generates variants: every variant must have exactly one choice related to each option.
       * Since options and variants tightly coupled and rely on each other they usually should be provided together in all operations.
       */
      options?: ConnectedOption[];
      /**
       * Product modifiers.
       *
       * Allows the customer to customize product, e.g. select Color, Size and so on similarly to `options` but with one main difference - `modifiers` never generate any variants.
       */
      modifiers?: ConnectedModifier[];
      /**
       * Product brand.
       *
       * + Pass `brand.name` to add a new brand while creating a product.
       * + Pass an existing brand's `id` to assign that brand to the product.
       */
      brand?: Brand;
      /**
       * Product info section.
       *
       * + Pass `infoSection.uniqueName`, `infoSection.title`, and `infoSection.description` to add a new info section while creating a product.
       * + Pass an existing info section's `id` or `uniqueName` to assign that info section to the product.
       */
      infoSections?: InfoSection[];
      /**
       * Product ribbon.
       *
       * + Pass `ribbon.name` to add a new ribbon while creating a product.
       * + Pass an existing ribbon's `id` or `name` to assign that ribbon to the product.
       */
      ribbon?: Ribbon$1;
      /**
       * List of categories that directly contain this product.
       *
       * Updated automatically when a product is added/removed from a category, when an item is moved within a category, or when a category is deleted.
       * > **Note:** Returned only when you pass `"DIRECT_CATEGORIES_INFO"` to the `fields` array in Products API requests.
       * @readonly
       */
      directCategoriesInfo?: ProductCategoriesInfo;
      /**
       * List of categories that directly contain this product, as well as their parent categories.
       * > **Note:** Returned only when you pass `"ALL_CATEGORIES_INFO"` to the `fields` array in Products API requests.
       * @readonly
       */
      allCategoriesInfo?: ProductCategoriesInfo;
      /** Main category ID. */
      mainCategoryId?: string | null;
      /**
       * internal util field to enable nile-search-related by shared categories
       * @internal
       * @readonly
       */
      directCategoryIdsInfo?: ProductCategoryIdsInfo;
      /**
       * Product base price range - minimum and maximum prices of all product variants.
       * @readonly
       * @deprecated Product base price range - minimum and maximum prices of all product variants.
       * @replacedBy compare_at_price_range
       * @targetRemovalDate 2024-12-31
       */
      basePriceRange?: PriceRange;
      /**
       * Product sale price range - minimum and maximum sale prices of all product variants.
       * @readonly
       * @deprecated Product sale price range - minimum and maximum sale prices of all product variants.
       * @replacedBy actual_price_range
       * @targetRemovalDate 2024-12-31
       */
      salePriceRange?: PriceRange;
      /**
       * Product cost range - minimum and maximum costs of all product variants.
       *
       * > **Note:** Returned only when the following conditions are met:
       * > + You pass `"MERCHANT_DATA"` to the `fields` array in Products API requests.
       * > + Your app has the required `SCOPE.STORES.PRODUCT_READ_ADMIN` permission scope.
       * @readonly
       */
      costRange?: PriceRange;
      /**
       * Product inventory info.
       * @readonly
       */
      inventory?: Inventory;
      /**
       * Product type.
       *
       * When passing `productType: PHYSICAL`, you must also pass `physicalProperties`.
       */
      productType?: ProductType;
      /**
       * A unique human-friendly identifier for the product.
       * Unlike the product ID, the handle can be set by the user to ensure consistency across multiple platforms.
       * In case handle wasn't given, the handle will be automatically generated.
       */
      handle?: string | null;
      /**
       * Currency used for the pricing of this product, in [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) format.
       *
       * Defaults to the currency defined in the site settings, unless specified in `x-wix-currency` header.
       * > **Note:** Returned only when you pass `"CURRENCY"` to the `fields` array in Products API requests.
       * @readonly
       */
      currency?: string | null;
      /**
       * Breadcrumbs of the `mainCategoryId`. Used to navigate to parent categories.
       * > **Note:** Returned only when you pass `"BREADCRUMBS_INFO"` to the `fields` array in Products API requests.
       * @readonly
       */
      breadcrumbsInfo?: BreadcrumbsInfo;
      /**
       * Product actual price range - minimum and maximum prices of all product variants.
       * @readonly
       */
      actualPriceRange?: PriceRange;
      /**
       * Product compare at price range - minimum and maximum compare at price prices of all product variants.
       * @readonly
       */
      compareAtPriceRange?: PriceRange;
      /** Product variants. */
      variantsInfo?: VariantsInfo;
      /**
       * Custom extended fields for the product object.
       *
       * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the app dashboard before they can be accessed with API calls.
       */
      extendedFields?: ExtendedFields;
      /**
       * SEO
       * @internal
       * @readonly
       */
      seoTitle?: string | null;
      /**
       * SEO description extracted from `seo_data` for backward compatibility.
       * @internal
       * @readonly
       */
      seoDescription?: string | null;
      /** Product subscriptions. */
      subscriptionDetails?: SubscriptionDetails;
      /**
       * internal util field to improve nile-search performance
       * @internal
       * @readonly
       */
      flattenOptions?: string[];
      /**
       * internal util field to improve nile-search performance
       * @internal
       * @readonly
       */
      flattenModifiers?: string[];
      /**
       * The total number of variants for the product.
       * @readonly
       */
      variantSummary?: VariantSummary;
      /**
       * Price info of the variant with minimum base price.
       * @internal
       * @readonly
       */
      minVariantPriceInfo?: MinVariantPriceInfo;
  }
  interface UpdateProductOptions {
      /**
       * Explicit list of fields to update in product
       * @internal
       */
      fieldMask?: string[];
      /** Fields to include in the response. */
      fields?: SingleEntityOpsRequestedFields[];
  }
  /**
   * Updates a new product, and can update the product's inventory.
   *
   * Each time the product is updated, `revision` increments by 1.
   * The current `revision` must be passed when updating the product.
   * This ensures you're working with the latest product and prevents unintended overwrites.
   *
   * >**Notes:**
   * > + Passing `variantsInfo.variants` will replace all existing variants.
   * > + To update existing `variantsInfo.variants`, pass `variantsInfo.variants.id`. If no ID is passed, the variant will be created with a new ID.
   * @param _id - Product ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField product
   * @requiredField product.media.itemsInfo.items
   * @requiredField product.modifiers.choicesSettings.choices
   * @requiredField product.options.choicesSettings.choices
   * @requiredField product.physicalProperties.pricePerUnit.measurementUnit
   * @requiredField product.revision
   * @requiredField product.subscriptionDetails.subscriptions
   * @requiredField product.subscriptionDetails.subscriptions.discount
   * @requiredField product.subscriptionDetails.subscriptions.discount.type
   * @requiredField product.subscriptionDetails.subscriptions.frequency
   * @requiredField product.subscriptionDetails.subscriptions.title
   * @requiredField product.variantsInfo.variants.digitalProperties.digitalFile
   * @requiredField product.variantsInfo.variants.digitalProperties.digitalFile._id
   * @requiredField product.variantsInfo.variants.physicalProperties.pricePerUnit.settings.measurementUnit
   * @requiredField product.variantsInfo.variants.price
   * @requiredField product.variantsInfo.variants.price.basePrice
   * @permissionId WIX_STORES.PRODUCT_UPDATE
   * @adminMethod
   */
  function updateProductWithInventory(_id: string | null, product: UpdateProductWithInventoryProduct, options?: UpdateProductWithInventoryOptions): Promise<UpdateProductWithInventoryResponse>;
  interface UpdateProductWithInventoryProduct {
      /**
       * Physical properties.
       *
       * Required when `productType: PHYSICAL`.
       */
      physicalProperties?: PhysicalProperties;
      /**
       * Product ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the product is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the product.
       *
       * Ignored when creating a product with inventory.
       * @readonly
       */
      revision?: string | null;
      /** Product name. */
      name?: string | null;
      /**
       * Product slug.
       *
       * If not provided, the slug is autogenerated based on the product name.
       */
      slug?: string | null;
      /**
       * Product description using rich content.
       *
       * Learn more about [Working with Rich Content](https://dev.wix.com/docs/go-headless/tutorials-templates/other-tutorials/working-with-rich-content).
       * @internal
       */
      description?: RichContent;
      /**
       * Product description in HTML.
       *
       * + When provided on create/update, this string must be a valid HTML. It will then be converted to rich content.
       * + `plainDescription` is ignored when value is also passed to the `description` field.
       * > **Note:** Returned only when you pass `"PLAIN_DESCRIPTION"` to the `fields` array in Products API requests.
       */
      plainDescription?: string | null;
      /**
       * Whether the product is visible to site visitors on the site.
       *
       * Default: `true`
       */
      visible?: boolean | null;
      /**
       * Whether the product is visible in POS (point of sale).
       *
       * Default: `true`
       * > **Note:** Always `false` for `productType: DIGITAL`.
       */
      visibleInPos?: boolean | null;
      /** Product media items. */
      media?: Media;
      /** Product SEO data. */
      seoData?: SeoSchema;
      /** Tax group ID. */
      taxGroupId?: string | null;
      /**
       * Product options. Allows buyer to customize product, e.g. select Color, Size and so on.
       * Always generates variants: every variant must have exactly one choice related to each option.
       * Since options and variants tightly coupled and rely on each other they usually should be provided together in all operations.
       * For existing options and choices provide ids only, all other data (e.g. names, title, types and so on) will be resolved for you by ids.
       * If you don't have ids it's ok to omit them but provide all other data instead. For existing options ids will be resolved, not existing options will be created.
       * *None*: you cannot change name of existing option via this endpoint but you can do it by calling CustomizationService
       */
      options?: ConnectedOption[];
      /**
       * Product Modifiers. Allows buyer to customize product, e.g. select Color, Size and so on similarly to `options` but with one main difference - `modifiers` never generate any variants.
       * For existing modifiers and choices provide ids only, all other data (e.g. names, title, types and so on) will be resolved for you by ids.
       * If you don't have ids it's ok to omit them but provide all other data instead. For existing modifiers ids will be resolved, not existing modifiers will be created.
       * *None*: you cannot change name of existing modifier via this endpoint by passing id and changed name, if you pass id name will be ignored. If you want to update existing modifier name do it by calling CustomizationService
       */
      modifiers?: ConnectedModifier[];
      /**
       * Product brand.
       *
       * + Pass `brand.name` to add a new brand while creating a product.
       * + Pass an existing brand's `id` to assign that brand to the product.
       */
      brand?: Brand;
      /**
       * Product info section.
       *
       * + Pass `infoSection.uniqueName`, `infoSection.title`, and `infoSection.description` to add a new info section while creating a product.
       * + Pass an existing info section's `id` or `uniqueName` to assign that info section to the product.
       */
      infoSections?: InfoSection[];
      /**
       * Product ribbon.
       *
       * + Pass `ribbon.name` to add a new ribbon while creating a product.
       * + Pass an existing ribbon's `id` or `name` to assign that ribbon to the product.
       */
      ribbon?: Ribbon$1;
      /** Main category ID. */
      mainCategoryId?: string | null;
      /**
       * Product type.
       *
       * When passing `productType: PHYSICAL`, you must also pass `physicalProperties`.
       */
      productType?: ProductType;
      /**
       * A unique human-friendly identifier for the product.
       * Unlike the product ID, the handle can be set by the user to ensure consistency across multiple platforms.
       * In case handle wasn't given, the handle will be automatically generated.
       */
      handle?: string | null;
      /** Product variants. */
      variantsInfo?: V3VariantsInfo;
      /** Subscription details. */
      subscriptionDetails?: SubscriptionDetails;
      /**
       * Custom extended fields for the product object.
       *
       * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the [app dashboard](https://dev.wix.com/dc3/my-apps/) before they can be accessed with API calls.
       */
      extendedFields?: ExtendedFields;
  }
  interface UpdateProductWithInventoryOptions {
      /**
       * Explicit list of fields to update in product
       * @internal
       */
      fieldMask?: string[];
      /**
       * Whether to return the full inventory entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Fields to include in the response. */
      fields?: SingleEntityOpsRequestedFields[];
  }
  /**
   * Creates up to 100 products.
   *
   * >**Note:**
   * > The following limits apply to the total number of creatable entities in a single request.
   * > For example, you can create 10 products with up to 10 options for each product (10 x 10 = 100), or one product with 100 options.
   * > Alternatively, you can create 100 products with up to 10 variants in each (100 x 10 = 1000), or one product with 1000 variants.
   * > + `options`: 100
   * > + `modifiers`: 100
   * > + `infoSections`: 100
   * > + `variantsInfo.variants`: 1000
   * @param products - List of products to create.
   * @public
   * @documentationMaturity preview
   * @requiredField products
   * @requiredField products.media.itemsInfo.items
   * @requiredField products.modifiers.choicesSettings.choices
   * @requiredField products.name
   * @requiredField products.options.choicesSettings.choices
   * @requiredField products.physicalProperties.pricePerUnit.measurementUnit
   * @requiredField products.productType
   * @requiredField products.subscriptionDetails.subscriptions
   * @requiredField products.subscriptionDetails.subscriptions.discount
   * @requiredField products.subscriptionDetails.subscriptions.discount.type
   * @requiredField products.subscriptionDetails.subscriptions.frequency
   * @requiredField products.subscriptionDetails.subscriptions.title
   * @requiredField products.variantsInfo
   * @requiredField products.variantsInfo.variants
   * @requiredField products.variantsInfo.variants.digitalProperties.digitalFile
   * @requiredField products.variantsInfo.variants.digitalProperties.digitalFile._id
   * @requiredField products.variantsInfo.variants.physicalProperties.pricePerUnit.settings.measurementUnit
   * @requiredField products.variantsInfo.variants.price
   * @requiredField products.variantsInfo.variants.price.basePrice
   * @permissionId WIX_STORES.PRODUCT_CREATE
   * @adminMethod
   */
  function bulkCreateProducts(products: V3Product[], options?: BulkCreateProductsOptions): Promise<BulkCreateProductsResponse>;
  interface BulkCreateProductsOptions {
      /**
       * Whether to return the full product entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Fields to include in the response. */
      fields?: RequestedFields$1[];
  }
  /**
   * Creates up to 100 products, and can create the products' inventories in the variants' default locations.
   *
   * >**Note:**
   * > The following limits apply to the total number of creatable entities in a single request.
   * > For example, you can create 10 products with up to 10 options for each product (10 x 10 = 100), or one product with 100 options.
   * > Alternatively, you can create 100 products with up to 10 variants in each (100 x 10 = 1000), or one product with 1000 variants.
   * > + `options`: 100
   * > + `modifiers`: 100
   * > + `infoSections`: 100
   * > + `variantsInfo.variants`: 1000
   * @param products - List of products to create with inventory.
   * @public
   * @documentationMaturity preview
   * @requiredField products
   * @requiredField products.media.itemsInfo.items
   * @requiredField products.modifiers.choicesSettings.choices
   * @requiredField products.name
   * @requiredField products.options.choicesSettings.choices
   * @requiredField products.physicalProperties.pricePerUnit.measurementUnit
   * @requiredField products.productType
   * @requiredField products.subscriptionDetails.subscriptions
   * @requiredField products.subscriptionDetails.subscriptions.discount
   * @requiredField products.subscriptionDetails.subscriptions.discount.type
   * @requiredField products.subscriptionDetails.subscriptions.frequency
   * @requiredField products.subscriptionDetails.subscriptions.title
   * @requiredField products.variantsInfo
   * @requiredField products.variantsInfo.variants.digitalProperties.digitalFile
   * @requiredField products.variantsInfo.variants.digitalProperties.digitalFile._id
   * @requiredField products.variantsInfo.variants.physicalProperties.pricePerUnit.settings.measurementUnit
   * @requiredField products.variantsInfo.variants.price
   * @requiredField products.variantsInfo.variants.price.basePrice
   * @permissionId WIX_STORES.PRODUCT_CREATE
   * @permissionId WIX_STORES.INVENTORY_CREATE
   * @adminMethod
   */
  function bulkCreateProductsWithInventory(products: ProductWithInventory[], options?: BulkCreateProductsWithInventoryOptions): Promise<BulkCreateProductsWithInventoryResponse>;
  interface BulkCreateProductsWithInventoryOptions {
      /**
       * Whether to return the full product entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Fields to include in the response. */
      fields?: RequestedFields$1[];
  }
  /**
   * Updates up to 100 products.
   *
   * >**Note:**
   * > The following limits apply to the total number of updatable entities in a single request.
   * > For example, you can update 10 products with up to 10 options for each product (10 x 10 = 100), or one product with 100 options.
   * > Alternatively, you can update 100 products with up to 10 variants in each (100 x 10 = 1000), or one product with 1000 variants.
   * > + `options`: 100
   * > + `modifiers`: 100
   * > + `infoSections`: 100
   * > + `variantsInfo.variants`: 1000
   * @param products - List of products to update.
   * @public
   * @documentationMaturity preview
   * @requiredField products
   * @requiredField products.product
   * @requiredField products.product._id
   * @requiredField products.product.media.itemsInfo.items
   * @requiredField products.product.modifiers.choicesSettings.choices
   * @requiredField products.product.options.choicesSettings.choices
   * @requiredField products.product.physicalProperties.pricePerUnit.measurementUnit
   * @requiredField products.product.revision
   * @requiredField products.product.subscriptionDetails.subscriptions
   * @requiredField products.product.subscriptionDetails.subscriptions.discount
   * @requiredField products.product.subscriptionDetails.subscriptions.discount.type
   * @requiredField products.product.subscriptionDetails.subscriptions.frequency
   * @requiredField products.product.subscriptionDetails.subscriptions.title
   * @requiredField products.product.variantsInfo.variants.digitalProperties.digitalFile
   * @requiredField products.product.variantsInfo.variants.digitalProperties.digitalFile._id
   * @requiredField products.product.variantsInfo.variants.physicalProperties.pricePerUnit.settings.measurementUnit
   * @requiredField products.product.variantsInfo.variants.price
   * @requiredField products.product.variantsInfo.variants.price.basePrice
   * @permissionId WIX_STORES.PRODUCT_UPDATE
   * @adminMethod
   */
  function bulkUpdateProducts(products: V3MaskedProduct[], options?: BulkUpdateProductsOptions): Promise<BulkUpdateProductsResponse>;
  interface BulkUpdateProductsOptions {
      /**
       * Whether to return the full product entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Fields to include in the response. */
      fields?: RequestedFields$1[];
  }
  /**
   * Updates up to 100 products, and can update the products' inventories in the variants' default locations.
   *
   * >**Note:**
   * > The following limits apply to the total number of updatable entities in a single request.
   * > For example, you can update 10 products with up to 10 options for each product (10 x 10 = 100), or one product with 100 options.
   * > Alternatively, you can update 100 products with up to 10 variants in each (100 x 10 = 1000), or one product with 1000 variants.
   * > + `options`: 100
   * > + `modifiers`: 100
   * > + `infoSections`: 100
   * > + `variantsInfo.variants`: 1000
   * @param products - List of products to update.
   * @public
   * @documentationMaturity preview
   * @requiredField products
   * @requiredField products.product
   * @requiredField products.product._id
   * @requiredField products.product.media.itemsInfo.items
   * @requiredField products.product.modifiers.choicesSettings.choices
   * @requiredField products.product.options.choicesSettings.choices
   * @requiredField products.product.physicalProperties.pricePerUnit.measurementUnit
   * @requiredField products.product.revision
   * @requiredField products.product.subscriptionDetails.subscriptions
   * @requiredField products.product.subscriptionDetails.subscriptions.discount
   * @requiredField products.product.subscriptionDetails.subscriptions.discount.type
   * @requiredField products.product.subscriptionDetails.subscriptions.frequency
   * @requiredField products.product.subscriptionDetails.subscriptions.title
   * @requiredField products.product.variantsInfo.variants.digitalProperties.digitalFile
   * @requiredField products.product.variantsInfo.variants.digitalProperties.digitalFile._id
   * @requiredField products.product.variantsInfo.variants.physicalProperties.pricePerUnit.settings.measurementUnit
   * @requiredField products.product.variantsInfo.variants.price
   * @requiredField products.product.variantsInfo.variants.price.basePrice
   * @permissionId WIX_STORES.PRODUCT_UPDATE
   * @permissionId WIX_STORES.INVENTORY_UPDATE
   * @adminMethod
   */
  function bulkUpdateProductsWithInventory(products: MaskedProductWithInventory[], options?: BulkUpdateProductsWithInventoryOptions): Promise<BulkUpdateProductsWithInventoryResponse>;
  interface BulkUpdateProductsWithInventoryOptions {
      /**
       * Whether to return the full product entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Fields to include in the response. */
      fields?: RequestedFields$1[];
  }
  /**
   * Updates multiple products, given the provided filter.
   *
   * To update `infoSections`, `brand` or `ribbon` fields, you must also pass their existing `id`.
   *
   * > **Note:**
   * > The following fields cannot be updated with this endpoint:
   * > + `slug`
   * > + `options`
   * > + `modifiers`
   * > + `variantsInfo`
   * >
   * > To update these fields, use [Bulk Update Products](https://dev.wix.com/docs/rest/business-solutions/stores/catalog-v3/products-v3/bulk-update-products).
   * @public
   * @documentationMaturity preview
   * @requiredField options.product
   * @requiredField options.product.media.itemsInfo.items
   * @requiredField options.product.subscriptionDetails.subscriptions
   * @requiredField options.product.subscriptionDetails.subscriptions.discount
   * @requiredField options.product.subscriptionDetails.subscriptions.discount.type
   * @requiredField options.product.subscriptionDetails.subscriptions.frequency
   * @requiredField options.product.subscriptionDetails.subscriptions.title
   * @permissionId WIX_STORES.PRODUCT_UPDATE
   * @adminMethod
   */
  function bulkUpdateProductsByFilter(options?: BulkUpdateProductsByFilterOptions): Promise<V3BulkUpdateProductsByFilterResponse>;
  interface BulkUpdateProductsByFilterOptions {
      /** Filter object. */
      filter?: Record<string, any> | null;
      /** Product to update. */
      product: V3Product;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
  }
  /**
   * Updates a product's extended fields.
   *
   * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must first be configured in the app dashboard.
   * @param productId - Product ID.
   * @param namespace - App namespace.
   * @public
   * @documentationMaturity preview
   * @requiredField namespace
   * @requiredField options.namespaceData
   * @requiredField productId
   * @permissionId WIX_STORES.PRODUCT_UPDATE
   * @adminMethod
   */
  function updateExtendedFields(productId: string, namespace: string, options?: UpdateExtendedFieldsOptions): Promise<V3UpdateExtendedFieldsResponse>;
  interface UpdateExtendedFieldsOptions {
      /** Data to update. */
      namespaceData: Record<string, any> | null;
      /** Fields to include in the response. */
      fields?: SingleEntityOpsRequestedFields[];
  }
  /**
   * Deletes a product and all its variants.
   * @param productId - Product ID.
   * @public
   * @documentationMaturity preview
   * @requiredField productId
   * @permissionId WIX_STORES.PRODUCT_DELETE
   * @adminMethod
   */
  function deleteProduct(productId: string): Promise<void>;
  /**
   * Deletes multiple products.
   * @param productIds - IDs of products to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField productIds
   * @permissionId WIX_STORES.PRODUCT_DELETE
   * @adminMethod
   */
  function bulkDeleteProducts(productIds: string[]): Promise<V3BulkDeleteProductsResponse>;
  /**
   * Delete multiple products, given the provided filter.
   * @param filter - Filter object.
   * @public
   * @documentationMaturity preview
   * @requiredField filter
   * @permissionId WIX_STORES.PRODUCT_DELETE
   * @adminMethod
   */
  function bulkDeleteProductsByFilter(filter: Record<string, any> | null, options?: BulkDeleteProductsByFilterOptions): Promise<V3BulkDeleteProductsByFilterResponse>;
  interface BulkDeleteProductsByFilterOptions {
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
  }
  /**
   * Retrieves a product.
   *
   * > **Note:**
   * > To retrieve a non-visible product (`visible: false`), your app must have the required `SCOPE.STORES.PRODUCT_READ_ADMIN` permission scope.
   * @param productId - Product ID.
   * @public
   * @documentationMaturity preview
   * @requiredField productId
   * @permissionId WIX_STORES.PRODUCT_READ
   * @permissionId WIX_STORES.PRODUCT_READ_NON_VISIBLE
   * @returns Product.
   */
  function getProduct(productId: string, options?: GetProductOptions): Promise<V3Product>;
  interface GetProductOptions {
      /** Fields to include in the response. */
      fields?: SingleEntityOpsRequestedFields[];
      /**
       * Indicates if the read should be done consistent or not. Default is false
       * @internal
       */
      consistent?: boolean | null;
  }
  /**
   * Retrieves a product by slug.
   *
   * > **Note:**
   * > To retrieve a non-visible product (`visible: false`), your app must have the required `SCOPE.STORES.PRODUCT_READ_ADMIN` permission scope.
   * @param slug - Product slug.
   * @public
   * @documentationMaturity preview
   * @requiredField slug
   * @permissionId WIX_STORES.PRODUCT_READ
   * @permissionId WIX_STORES.PRODUCT_READ_NON_VISIBLE
   */
  function getProductBySlug(slug: string, options?: GetProductBySlugOptions): Promise<V3GetProductBySlugResponse>;
  interface GetProductBySlugOptions {
      /** Fields to include in the response. */
      fields?: SingleEntityOpsRequestedFields[];
  }
  /**
   * Retrieves a list of up to 100 products, given the provided filtering, search expression, sorting, and cursor paging.
   * Pass supported values to the `fields` array in the request to include those fields in the response.
   *
   * To learn about working with _Search_ endpoints, see
   * [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language),
   * and [Sorting and Paging](https://dev.wix.com/docs/rest/articles/getting-started/sorting-and-paging).
   *
   * > **Notes:**
   * + This method does not return `variantsInfo`. To retrieve product variants, use the Get Product method.
   * + To retrieve a non-visible product (`visible: false`), your app must have the required `SCOPE.STORES.PRODUCT_READ_ADMIN` permission scope.
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_STORES.PRODUCT_READ
   * @permissionId WIX_STORES.PRODUCT_READ_NON_VISIBLE
   */
  function searchProducts(options?: SearchProductsOptions): Promise<V3SearchProductsResponse>;
  interface SearchProductsOptions {
      /** Search options. */
      search?: CommonCursorSearch;
      /** Fields to include in the response. */
      fields?: RequestedFields$1[];
  }
  /**
   * Retrieves a list of up to 100 products, given the provided filtering, sorting, and cursor paging.
   * Pass supported values to the `fields` array in the request to include those fields in the response.
   *
   * To learn about working with _Query_ endpoints, see
   * [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language),
   * and [Sorting and Paging](https://dev.wix.com/docs/rest/articles/getting-started/sorting-and-paging).
   *
   * > **Notes:**
   * + This method does not return `variantsInfo`. To retrieve product variants, use the Get Product method.
   * + To retrieve a non-visible product (`visible: false`), your app must have the required `SCOPE.STORES.PRODUCT_READ_ADMIN` permission scope.
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_STORES.PRODUCT_READ
   * @permissionId WIX_STORES.PRODUCT_READ_NON_VISIBLE
   */
  function queryProducts(options?: QueryProductsOptions): ProductsQueryBuilder;
  interface QueryProductsOptions {
      /** A list of requested fields to be included in the response. */
      fields?: RequestedFields$1[] | undefined;
  }
  interface QueryCursorResult$2 {
      cursors: CommonCursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ProductsQueryResult extends QueryCursorResult$2 {
      items: V3Product[];
      query: ProductsQueryBuilder;
      next: () => Promise<ProductsQueryResult>;
      prev: () => Promise<ProductsQueryResult>;
  }
  interface ProductsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'slug' | 'visible' | 'options.id' | 'handle', value: any) => ProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'slug' | 'visible' | 'options.id' | 'handle', value: any) => ProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => ProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => ProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'slug' | 'options.id' | 'handle', value: string) => ProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'slug' | 'visible' | 'options.id' | 'handle', value: any[]) => ProductsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'slug' | 'visible' | 'options.id' | 'handle', value: any) => ProductsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'slug' | 'visible' | 'options.id' | 'handle', value: boolean) => ProductsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_createdDate' | '_updatedDate' | 'visible'>) => ProductsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_createdDate' | '_updatedDate' | 'visible'>) => ProductsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ProductsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ProductsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ProductsQueryResult>;
  }
  /**
   * Counts the number of products that match the provided filtering.
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_STORES.PRODUCT_READ
   * @permissionId WIX_STORES.PRODUCT_READ_NON_VISIBLE
   */
  function countProducts(options?: CountProductsOptions): Promise<V3CountProductsResponse>;
  interface CountProductsOptions {
      /** Filter object. */
      filter?: Record<string, any> | null;
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
      /**
       * Whether to return non-visible products (`visible:false`). Your app must have the required `SCOPE.STORES.PRODUCT_READ_ADMIN` permission scope.
       *
       * Default: `false`
       */
      returnNonVisibleProducts?: boolean;
  }
  /**
   * Updates a variant of multiple products, given the provided filter and search expression.
   *
   *
   * Only the following variant fields can be updated:
   * + `visible`
   * + `price`
   * + `revenueDetails.cost`
   * + `physicalOptions`
   * @param filter - Filter object.
   * @public
   * @documentationMaturity preview
   * @requiredField filter
   * @requiredField options.variant
   * @permissionId WIX_STORES.PRODUCT_UPDATE
   * @adminMethod
   */
  function bulkUpdateProductVariantsByFilter(filter: Record<string, any> | null, options?: BulkUpdateProductVariantsByFilterOptions): Promise<BulkUpdateProductVariantsByFilterResponse>;
  interface BulkUpdateProductVariantsByFilterOptions {
      /** Variant to update. */
      variant: Variant;
      /**
       * Explicit list of variant fields to update.
       * @internal
       */
      fieldMask?: string[];
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
  }
  /**
   * Adjusts the price and cost of multiple variants, given the provided filter and search expression.
   *
   *
   * Only the following variant fields can be increased/decreased by amount or percentage:
   * + `basePrice`
   * + `salePrice`
   * + `cost`
   * + `salePriceFromBasePrice`
   * @param filter - Filter object.
   * @public
   * @documentationMaturity preview
   * @requiredField filter
   * @permissionId WIX_STORES.PRODUCT_UPDATE
   * @adminMethod
   */
  function bulkAdjustProductVariantsByFilter(filter: Record<string, any> | null, options?: BulkAdjustProductVariantsByFilterOptions): Promise<BulkAdjustProductVariantsByFilterResponse>;
  interface BulkAdjustProductVariantsByFilterOptions {
      /**
       * Base price adjustment.
       * @deprecated Base price adjustment.
       * @replacedBy compare_at_price
       * @targetRemovalDate 2024-12-31
       */
      basePrice?: V3AdjustValue;
      /**
       * Sale price adjustment.
       * @deprecated Sale price adjustment.
       * @replacedBy actual_price
       * @targetRemovalDate 2024-12-31
       */
      salePrice?: V3AdjustValue;
      /** Cost adjustment. */
      cost?: V3AdjustValue;
      /**
       * Set variant sale price from base price by applying provided discount to it.
       * For example variant base price 100$, variant sale price 95$, requested `salePriceFromBasePrice.percentage` is 10, then old sale price ignored and new sale price set to 90 (100$ - 10%).
       * @deprecated Set variant sale price from base price by applying provided discount to it.
       * For example variant base price 100$, variant sale price 95$, requested `salePriceFromBasePrice.percentage` is 10, then old sale price ignored and new sale price set to 90 (100$ - 10%).
       * @replacedBy actual_price_from_compare_at_price
       * @targetRemovalDate 2024-12-31
       */
      salePriceFromBasePrice?: V3UnsignedAdjustValue;
      /**
       * Rounding strategy of new calculated prices.
       *
       * + `NO_ROUNDING`: Calculated prices will be saved without rounding to keep max possible precision.
       * + `CURRENCY_PRECISION`: Calculated prices will be rounded according to the currency's precision requirements. For example. `$3.5555` will be saved as `$3.56`; `¥3.5555` will be saved as `¥4`.
       * + `NEAREST_WHOLE_NUMBER`: Calculated prices will be rounded to the nearest whole number.
       */
      rounding?: BulkAdjustProductVariantsByFilterRequestRoundingStrategy;
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
      /** Actual price adjustment. */
      actualPrice?: V3AdjustValue;
      /** Compare at price adjustment. */
      compareAtPrice?: V3AdjustValue;
      /**
       * Set variant actual_price from compare_at_price by applying provided discount to it.
       * if compare-at-price doesn't exist, actual_price will be set to compare_at_price and the discount will be calculated from it.
       * For example variant compare at price 100$, variant actual price is 95$, requested `salePriceFromBasePrice.percentage` is 10, then old actual price ignored and new actual price set to 90 (100$ - 10%).
       */
      compareAtPriceDiscount?: V3UnsignedAdjustValue;
  }
  /**
   * Adds info sections to multiple products, given the provided filter and search expression.
   * @param filter - Filter object.
   * @public
   * @documentationMaturity preview
   * @requiredField filter
   * @requiredField options.infoSectionIds
   * @permissionId WIX_STORES.PRODUCT_UPDATE
   * @adminMethod
   */
  function bulkAddInfoSectionsToProductsByFilter(filter: Record<string, any> | null, options?: BulkAddInfoSectionsToProductsByFilterOptions): Promise<V3BulkAddInfoSectionsToProductsByFilterResponse>;
  interface BulkAddInfoSectionsToProductsByFilterOptions {
      /** IDs of the info sections to add. */
      infoSectionIds: string[];
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
  }
  /**
   * Adds info sections to multiple products.
   * @param products - List of product IDs and revisions.
   * @public
   * @documentationMaturity preview
   * @requiredField options.infoSectionIds
   * @requiredField products
   * @permissionId WIX_STORES.PRODUCT_UPDATE
   * @adminMethod
   */
  function bulkAddInfoSectionsToProducts(products: V3ProductIdWithRevision[], options?: BulkAddInfoSectionsToProductsOptions): Promise<V3BulkAddInfoSectionsToProductsResponse>;
  interface BulkAddInfoSectionsToProductsOptions {
      /** List of IDs of info sections to add. */
      infoSectionIds: string[];
      /**
       * Whether to return the full updated product entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Fields to include in the response. */
      fields?: RequestedFields$1[];
  }
  /**
   * Removes info sections from multiple products, given the provided filter and search expression.
   * @param filter - Filter object.
   * @public
   * @documentationMaturity preview
   * @requiredField filter
   * @requiredField options.infoSectionIds
   * @permissionId WIX_STORES.PRODUCT_UPDATE
   * @adminMethod
   */
  function bulkRemoveInfoSectionsFromProductsByFilter(filter: Record<string, any> | null, options?: BulkRemoveInfoSectionsFromProductsByFilterOptions): Promise<V3BulkRemoveInfoSectionsFromProductsByFilterResponse>;
  interface BulkRemoveInfoSectionsFromProductsByFilterOptions {
      /** IDs of info sections to remove. */
      infoSectionIds: string[];
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
  }
  /**
   * Removes info sections from multiple products.
   * @param products - List of product IDs and revisions.
   * @public
   * @documentationMaturity preview
   * @requiredField options.infoSectionIds
   * @requiredField products
   * @permissionId WIX_STORES.PRODUCT_UPDATE
   * @adminMethod
   */
  function bulkRemoveInfoSectionsFromProducts(products: V3ProductIdWithRevision[], options?: BulkRemoveInfoSectionsFromProductsOptions): Promise<V3BulkRemoveInfoSectionsFromProductsResponse>;
  interface BulkRemoveInfoSectionsFromProductsOptions {
      /** List of IDs of info sections to remove. */
      infoSectionIds: string[];
      /**
       * Whether to return the full updated product entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** Fields to include in the response. */
      fields?: RequestedFields$1[];
  }
  /**
   * Adds multiple products, given the provided filter and search expression, to up to 5 categories.
   *
   * Learn more about the [Categories API](https://dev.wix.com/docs/rest/business-management/categories/introduction).
   * @public
   * @documentationMaturity preview
   * @requiredField options.categoryIds
   * @permissionId CATEGORIES.CATEGORY_ADD_ITEM
   * @adminMethod
   */
  function bulkAddProductsToCategoriesByFilter(options?: BulkAddProductsToCategoriesByFilterOptions): Promise<BulkAddProductsToCategoriesByFilterResponse>;
  interface BulkAddProductsToCategoriesByFilterOptions {
      /** Filter object. */
      filter?: Record<string, any> | null;
      /** IDs of the categories to which products will be added. */
      categoryIds: string[];
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
  }
  /**
   * Removes multiple products, given the provided filter and search expression, from up to 5 categories.
   *
   * Learn more about the [Categories API](https://dev.wix.com/docs/rest/business-management/categories/introduction).
   * @public
   * @documentationMaturity preview
   * @requiredField options.categoryIds
   * @permissionId CATEGORIES.CATEGORY_REMOVE_ITEM
   * @adminMethod
   */
  function bulkRemoveProductsFromCategoriesByFilter(options?: BulkRemoveProductsFromCategoriesByFilterOptions): Promise<BulkRemoveProductsFromCategoriesByFilterResponse>;
  interface BulkRemoveProductsFromCategoriesByFilterOptions {
      /** Filter object. */
      filter?: Record<string, any> | null;
      /** IDs of the categories from which products will be removed. */
      categoryIds: string[];
      /** Free text to match in searchable fields. */
      search?: WixCommonSearchDetails;
  }
  
  type storesCatalogV3ProductProductsV3_universal_d_V3Product = V3Product;
  type storesCatalogV3ProductProductsV3_universal_d_V3ProductTypedPropertiesOneOf = V3ProductTypedPropertiesOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_RichContent = RichContent;
  type storesCatalogV3ProductProductsV3_universal_d_Node = Node;
  type storesCatalogV3ProductProductsV3_universal_d_NodeDataOneOf = NodeDataOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_NodeType = NodeType;
  const storesCatalogV3ProductProductsV3_universal_d_NodeType: typeof NodeType;
  type storesCatalogV3ProductProductsV3_universal_d_NodeStyle = NodeStyle;
  type storesCatalogV3ProductProductsV3_universal_d_ButtonData = ButtonData;
  type storesCatalogV3ProductProductsV3_universal_d_Border = Border;
  type storesCatalogV3ProductProductsV3_universal_d_Colors = Colors;
  type storesCatalogV3ProductProductsV3_universal_d_PluginContainerData = PluginContainerData;
  type storesCatalogV3ProductProductsV3_universal_d_WidthType = WidthType;
  const storesCatalogV3ProductProductsV3_universal_d_WidthType: typeof WidthType;
  type storesCatalogV3ProductProductsV3_universal_d_PluginContainerDataWidth = PluginContainerDataWidth;
  type storesCatalogV3ProductProductsV3_universal_d_PluginContainerDataWidthDataOneOf = PluginContainerDataWidthDataOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_PluginContainerDataAlignment = PluginContainerDataAlignment;
  const storesCatalogV3ProductProductsV3_universal_d_PluginContainerDataAlignment: typeof PluginContainerDataAlignment;
  type storesCatalogV3ProductProductsV3_universal_d_Spoiler = Spoiler;
  type storesCatalogV3ProductProductsV3_universal_d_Height = Height;
  type storesCatalogV3ProductProductsV3_universal_d_Type = Type;
  const storesCatalogV3ProductProductsV3_universal_d_Type: typeof Type;
  type storesCatalogV3ProductProductsV3_universal_d_Styles = Styles;
  type storesCatalogV3ProductProductsV3_universal_d_Link = Link;
  type storesCatalogV3ProductProductsV3_universal_d_LinkDataOneOf = LinkDataOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_Target = Target;
  const storesCatalogV3ProductProductsV3_universal_d_Target: typeof Target;
  type storesCatalogV3ProductProductsV3_universal_d_Rel = Rel;
  type storesCatalogV3ProductProductsV3_universal_d_CodeBlockData = CodeBlockData;
  type storesCatalogV3ProductProductsV3_universal_d_TextStyle = TextStyle;
  type storesCatalogV3ProductProductsV3_universal_d_TextAlignment = TextAlignment;
  const storesCatalogV3ProductProductsV3_universal_d_TextAlignment: typeof TextAlignment;
  type storesCatalogV3ProductProductsV3_universal_d_DividerData = DividerData;
  type storesCatalogV3ProductProductsV3_universal_d_LineStyle = LineStyle;
  const storesCatalogV3ProductProductsV3_universal_d_LineStyle: typeof LineStyle;
  type storesCatalogV3ProductProductsV3_universal_d_Width = Width;
  const storesCatalogV3ProductProductsV3_universal_d_Width: typeof Width;
  type storesCatalogV3ProductProductsV3_universal_d_Alignment = Alignment;
  const storesCatalogV3ProductProductsV3_universal_d_Alignment: typeof Alignment;
  type storesCatalogV3ProductProductsV3_universal_d_FileData = FileData;
  type storesCatalogV3ProductProductsV3_universal_d_ViewMode = ViewMode;
  const storesCatalogV3ProductProductsV3_universal_d_ViewMode: typeof ViewMode;
  type storesCatalogV3ProductProductsV3_universal_d_FileSource = FileSource;
  type storesCatalogV3ProductProductsV3_universal_d_FileSourceDataOneOf = FileSourceDataOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_PDFSettings = PDFSettings;
  type storesCatalogV3ProductProductsV3_universal_d_GalleryData = GalleryData;
  type storesCatalogV3ProductProductsV3_universal_d_V1Media = V1Media;
  type storesCatalogV3ProductProductsV3_universal_d_Image = Image;
  type storesCatalogV3ProductProductsV3_universal_d_Video = Video;
  type storesCatalogV3ProductProductsV3_universal_d_Item = Item;
  type storesCatalogV3ProductProductsV3_universal_d_ItemDataOneOf = ItemDataOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_GalleryOptions = GalleryOptions;
  type storesCatalogV3ProductProductsV3_universal_d_LayoutType = LayoutType;
  const storesCatalogV3ProductProductsV3_universal_d_LayoutType: typeof LayoutType;
  type storesCatalogV3ProductProductsV3_universal_d_Orientation = Orientation;
  const storesCatalogV3ProductProductsV3_universal_d_Orientation: typeof Orientation;
  type storesCatalogV3ProductProductsV3_universal_d_Crop = Crop;
  const storesCatalogV3ProductProductsV3_universal_d_Crop: typeof Crop;
  type storesCatalogV3ProductProductsV3_universal_d_ThumbnailsAlignment = ThumbnailsAlignment;
  const storesCatalogV3ProductProductsV3_universal_d_ThumbnailsAlignment: typeof ThumbnailsAlignment;
  type storesCatalogV3ProductProductsV3_universal_d_Layout = Layout;
  type storesCatalogV3ProductProductsV3_universal_d_ItemStyle = ItemStyle;
  type storesCatalogV3ProductProductsV3_universal_d_Thumbnails = Thumbnails;
  type storesCatalogV3ProductProductsV3_universal_d_GIFData = GIFData;
  type storesCatalogV3ProductProductsV3_universal_d_GIF = GIF;
  type storesCatalogV3ProductProductsV3_universal_d_HeadingData = HeadingData;
  type storesCatalogV3ProductProductsV3_universal_d_HTMLData = HTMLData;
  type storesCatalogV3ProductProductsV3_universal_d_HTMLDataDataOneOf = HTMLDataDataOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_Source = Source;
  const storesCatalogV3ProductProductsV3_universal_d_Source: typeof Source;
  type storesCatalogV3ProductProductsV3_universal_d_ImageData = ImageData;
  type storesCatalogV3ProductProductsV3_universal_d_LinkPreviewData = LinkPreviewData;
  type storesCatalogV3ProductProductsV3_universal_d_MapData = MapData;
  type storesCatalogV3ProductProductsV3_universal_d_MapSettings = MapSettings;
  type storesCatalogV3ProductProductsV3_universal_d_MapType = MapType;
  const storesCatalogV3ProductProductsV3_universal_d_MapType: typeof MapType;
  type storesCatalogV3ProductProductsV3_universal_d_ParagraphData = ParagraphData;
  type storesCatalogV3ProductProductsV3_universal_d_PollData = PollData;
  type storesCatalogV3ProductProductsV3_universal_d_ViewRole = ViewRole;
  const storesCatalogV3ProductProductsV3_universal_d_ViewRole: typeof ViewRole;
  type storesCatalogV3ProductProductsV3_universal_d_VoteRole = VoteRole;
  const storesCatalogV3ProductProductsV3_universal_d_VoteRole: typeof VoteRole;
  type storesCatalogV3ProductProductsV3_universal_d_Permissions = Permissions;
  type storesCatalogV3ProductProductsV3_universal_d_Option = Option;
  type storesCatalogV3ProductProductsV3_universal_d_PollSettings = PollSettings;
  type storesCatalogV3ProductProductsV3_universal_d_PollLayoutType = PollLayoutType;
  const storesCatalogV3ProductProductsV3_universal_d_PollLayoutType: typeof PollLayoutType;
  type storesCatalogV3ProductProductsV3_universal_d_PollLayoutDirection = PollLayoutDirection;
  const storesCatalogV3ProductProductsV3_universal_d_PollLayoutDirection: typeof PollLayoutDirection;
  type storesCatalogV3ProductProductsV3_universal_d_PollLayout = PollLayout;
  type storesCatalogV3ProductProductsV3_universal_d_OptionLayout = OptionLayout;
  type storesCatalogV3ProductProductsV3_universal_d_BackgroundType = BackgroundType;
  const storesCatalogV3ProductProductsV3_universal_d_BackgroundType: typeof BackgroundType;
  type storesCatalogV3ProductProductsV3_universal_d_Gradient = Gradient;
  type storesCatalogV3ProductProductsV3_universal_d_Background = Background;
  type storesCatalogV3ProductProductsV3_universal_d_BackgroundBackgroundOneOf = BackgroundBackgroundOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_PollDesign = PollDesign;
  type storesCatalogV3ProductProductsV3_universal_d_OptionDesign = OptionDesign;
  type storesCatalogV3ProductProductsV3_universal_d_Poll = Poll;
  type storesCatalogV3ProductProductsV3_universal_d_PollDataLayout = PollDataLayout;
  type storesCatalogV3ProductProductsV3_universal_d_Design = Design;
  type storesCatalogV3ProductProductsV3_universal_d_TextData = TextData;
  type storesCatalogV3ProductProductsV3_universal_d_Decoration = Decoration;
  type storesCatalogV3ProductProductsV3_universal_d_DecorationDataOneOf = DecorationDataOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_DecorationType = DecorationType;
  const storesCatalogV3ProductProductsV3_universal_d_DecorationType: typeof DecorationType;
  type storesCatalogV3ProductProductsV3_universal_d_AnchorData = AnchorData;
  type storesCatalogV3ProductProductsV3_universal_d_ColorData = ColorData;
  type storesCatalogV3ProductProductsV3_universal_d_LinkData = LinkData;
  type storesCatalogV3ProductProductsV3_universal_d_MentionData = MentionData;
  type storesCatalogV3ProductProductsV3_universal_d_FontSizeData = FontSizeData;
  type storesCatalogV3ProductProductsV3_universal_d_FontType = FontType;
  const storesCatalogV3ProductProductsV3_universal_d_FontType: typeof FontType;
  type storesCatalogV3ProductProductsV3_universal_d_SpoilerData = SpoilerData;
  type storesCatalogV3ProductProductsV3_universal_d_AppEmbedData = AppEmbedData;
  type storesCatalogV3ProductProductsV3_universal_d_AppEmbedDataAppDataOneOf = AppEmbedDataAppDataOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_AppType = AppType;
  const storesCatalogV3ProductProductsV3_universal_d_AppType: typeof AppType;
  type storesCatalogV3ProductProductsV3_universal_d_BookingData = BookingData;
  type storesCatalogV3ProductProductsV3_universal_d_EventData = EventData;
  type storesCatalogV3ProductProductsV3_universal_d_VideoData = VideoData;
  type storesCatalogV3ProductProductsV3_universal_d_PlaybackOptions = PlaybackOptions;
  type storesCatalogV3ProductProductsV3_universal_d_EmbedData = EmbedData;
  type storesCatalogV3ProductProductsV3_universal_d_Oembed = Oembed;
  type storesCatalogV3ProductProductsV3_universal_d_CollapsibleListData = CollapsibleListData;
  type storesCatalogV3ProductProductsV3_universal_d_InitialExpandedItems = InitialExpandedItems;
  const storesCatalogV3ProductProductsV3_universal_d_InitialExpandedItems: typeof InitialExpandedItems;
  type storesCatalogV3ProductProductsV3_universal_d_Direction = Direction;
  const storesCatalogV3ProductProductsV3_universal_d_Direction: typeof Direction;
  type storesCatalogV3ProductProductsV3_universal_d_TableData = TableData;
  type storesCatalogV3ProductProductsV3_universal_d_Dimensions = Dimensions;
  type storesCatalogV3ProductProductsV3_universal_d_TableCellData = TableCellData;
  type storesCatalogV3ProductProductsV3_universal_d_VerticalAlignment = VerticalAlignment;
  const storesCatalogV3ProductProductsV3_universal_d_VerticalAlignment: typeof VerticalAlignment;
  type storesCatalogV3ProductProductsV3_universal_d_CellStyle = CellStyle;
  type storesCatalogV3ProductProductsV3_universal_d_BorderColors = BorderColors;
  type storesCatalogV3ProductProductsV3_universal_d_NullValue = NullValue;
  const storesCatalogV3ProductProductsV3_universal_d_NullValue: typeof NullValue;
  type storesCatalogV3ProductProductsV3_universal_d_ListValue = ListValue;
  type storesCatalogV3ProductProductsV3_universal_d_AudioData = AudioData;
  type storesCatalogV3ProductProductsV3_universal_d_OrderedListData = OrderedListData;
  type storesCatalogV3ProductProductsV3_universal_d_BulletedListData = BulletedListData;
  type storesCatalogV3ProductProductsV3_universal_d_BlockquoteData = BlockquoteData;
  type storesCatalogV3ProductProductsV3_universal_d_CaptionData = CaptionData;
  type storesCatalogV3ProductProductsV3_universal_d_Metadata = Metadata;
  type storesCatalogV3ProductProductsV3_universal_d_DocumentStyle = DocumentStyle;
  type storesCatalogV3ProductProductsV3_universal_d_TextNodeStyle = TextNodeStyle;
  type storesCatalogV3ProductProductsV3_universal_d_Media = Media;
  type storesCatalogV3ProductProductsV3_universal_d_ProductMedia = ProductMedia;
  type storesCatalogV3ProductProductsV3_universal_d_ProductMediaSetByOneOf = ProductMediaSetByOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_ProductMediaMediaOneOf = ProductMediaMediaOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_VideoResolution = VideoResolution;
  type storesCatalogV3ProductProductsV3_universal_d_MediaType = MediaType;
  const storesCatalogV3ProductProductsV3_universal_d_MediaType: typeof MediaType;
  type storesCatalogV3ProductProductsV3_universal_d_Thumbnail = Thumbnail;
  type storesCatalogV3ProductProductsV3_universal_d_MediaItemsInfo = MediaItemsInfo;
  type storesCatalogV3ProductProductsV3_universal_d_SeoSchema = SeoSchema;
  type storesCatalogV3ProductProductsV3_universal_d_Keyword = Keyword;
  type storesCatalogV3ProductProductsV3_universal_d_Tag = Tag;
  type storesCatalogV3ProductProductsV3_universal_d_Settings = Settings;
  type storesCatalogV3ProductProductsV3_universal_d_ConnectedOption = ConnectedOption;
  type storesCatalogV3ProductProductsV3_universal_d_ConnectedOptionOptionSettingsOneOf = ConnectedOptionOptionSettingsOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_ProductOptionRenderType = ProductOptionRenderType;
  const storesCatalogV3ProductProductsV3_universal_d_ProductOptionRenderType: typeof ProductOptionRenderType;
  type storesCatalogV3ProductProductsV3_universal_d_ChoicesSettings = ChoicesSettings;
  type storesCatalogV3ProductProductsV3_universal_d_ConnectedOptionChoice = ConnectedOptionChoice;
  type storesCatalogV3ProductProductsV3_universal_d_ConnectedOptionChoiceValueOneOf = ConnectedOptionChoiceValueOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_ChoiceType = ChoiceType;
  const storesCatalogV3ProductProductsV3_universal_d_ChoiceType: typeof ChoiceType;
  type storesCatalogV3ProductProductsV3_universal_d_MultipleColors = MultipleColors;
  type storesCatalogV3ProductProductsV3_universal_d_ConnectedModifier = ConnectedModifier;
  type storesCatalogV3ProductProductsV3_universal_d_ConnectedModifierModifierSettingsOneOf = ConnectedModifierModifierSettingsOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_ModifierRenderType = ModifierRenderType;
  const storesCatalogV3ProductProductsV3_universal_d_ModifierRenderType: typeof ModifierRenderType;
  type storesCatalogV3ProductProductsV3_universal_d_FreeTextSettings = FreeTextSettings;
  type storesCatalogV3ProductProductsV3_universal_d_ModifierChoicesSettings = ModifierChoicesSettings;
  type storesCatalogV3ProductProductsV3_universal_d_ConnectedModifierChoice = ConnectedModifierChoice;
  type storesCatalogV3ProductProductsV3_universal_d_ConnectedModifierChoiceValueOneOf = ConnectedModifierChoiceValueOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_Brand = Brand;
  type storesCatalogV3ProductProductsV3_universal_d_InfoSection = InfoSection;
  type storesCatalogV3ProductProductsV3_universal_d_ProductCategoriesInfo = ProductCategoriesInfo;
  type storesCatalogV3ProductProductsV3_universal_d_ProductCategory = ProductCategory;
  type storesCatalogV3ProductProductsV3_universal_d_ProductCategoryIdsInfo = ProductCategoryIdsInfo;
  type storesCatalogV3ProductProductsV3_universal_d_PriceRange = PriceRange;
  type storesCatalogV3ProductProductsV3_universal_d_FixedMonetaryAmount = FixedMonetaryAmount;
  type storesCatalogV3ProductProductsV3_universal_d_Inventory = Inventory;
  type storesCatalogV3ProductProductsV3_universal_d_InventoryAvailabilityStatus = InventoryAvailabilityStatus;
  const storesCatalogV3ProductProductsV3_universal_d_InventoryAvailabilityStatus: typeof InventoryAvailabilityStatus;
  type storesCatalogV3ProductProductsV3_universal_d_PreorderStatus = PreorderStatus;
  const storesCatalogV3ProductProductsV3_universal_d_PreorderStatus: typeof PreorderStatus;
  type storesCatalogV3ProductProductsV3_universal_d_ProductPreorderAvailability = ProductPreorderAvailability;
  const storesCatalogV3ProductProductsV3_universal_d_ProductPreorderAvailability: typeof ProductPreorderAvailability;
  type storesCatalogV3ProductProductsV3_universal_d_ProductType = ProductType;
  const storesCatalogV3ProductProductsV3_universal_d_ProductType: typeof ProductType;
  type storesCatalogV3ProductProductsV3_universal_d_PhysicalProperties = PhysicalProperties;
  type storesCatalogV3ProductProductsV3_universal_d_PricePerUnitSettings = PricePerUnitSettings;
  type storesCatalogV3ProductProductsV3_universal_d_MeasurementUnit = MeasurementUnit;
  const storesCatalogV3ProductProductsV3_universal_d_MeasurementUnit: typeof MeasurementUnit;
  type storesCatalogV3ProductProductsV3_universal_d_WeightRange = WeightRange;
  type storesCatalogV3ProductProductsV3_universal_d_PricePerUnitRange = PricePerUnitRange;
  type storesCatalogV3ProductProductsV3_universal_d_PricePerUnitRangePricePerUnit = PricePerUnitRangePricePerUnit;
  type storesCatalogV3ProductProductsV3_universal_d_WeightMeasurementUnitInfo = WeightMeasurementUnitInfo;
  type storesCatalogV3ProductProductsV3_universal_d_WeightUnit = WeightUnit;
  const storesCatalogV3ProductProductsV3_universal_d_WeightUnit: typeof WeightUnit;
  type storesCatalogV3ProductProductsV3_universal_d_BreadcrumbsInfo = BreadcrumbsInfo;
  type storesCatalogV3ProductProductsV3_universal_d_BreadCrumb = BreadCrumb;
  type storesCatalogV3ProductProductsV3_universal_d_VariantsInfo = VariantsInfo;
  type storesCatalogV3ProductProductsV3_universal_d_Variant = Variant;
  type storesCatalogV3ProductProductsV3_universal_d_VariantTypedPropertiesOneOf = VariantTypedPropertiesOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_OptionChoice = OptionChoice;
  type storesCatalogV3ProductProductsV3_universal_d_OptionChoiceIds = OptionChoiceIds;
  type storesCatalogV3ProductProductsV3_universal_d_OptionChoiceNames = OptionChoiceNames;
  type storesCatalogV3ProductProductsV3_universal_d_PriceInfo = PriceInfo;
  type storesCatalogV3ProductProductsV3_universal_d_RevenueDetails = RevenueDetails;
  type storesCatalogV3ProductProductsV3_universal_d_VariantPhysicalProperties = VariantPhysicalProperties;
  type storesCatalogV3ProductProductsV3_universal_d_PricePerUnit = PricePerUnit;
  type storesCatalogV3ProductProductsV3_universal_d_VariantDigitalProperties = VariantDigitalProperties;
  type storesCatalogV3ProductProductsV3_universal_d_SecuredMedia = SecuredMedia;
  type storesCatalogV3ProductProductsV3_universal_d_FileType = FileType;
  const storesCatalogV3ProductProductsV3_universal_d_FileType: typeof FileType;
  type storesCatalogV3ProductProductsV3_universal_d_SubscriptionPricesInfo = SubscriptionPricesInfo;
  type storesCatalogV3ProductProductsV3_universal_d_SubscriptionPrice = SubscriptionPrice;
  type storesCatalogV3ProductProductsV3_universal_d_SubscriptionPricePerUnit = SubscriptionPricePerUnit;
  type storesCatalogV3ProductProductsV3_universal_d_InventoryStatus = InventoryStatus;
  type storesCatalogV3ProductProductsV3_universal_d_ExtendedFields = ExtendedFields;
  type storesCatalogV3ProductProductsV3_universal_d_SubscriptionDetails = SubscriptionDetails;
  type storesCatalogV3ProductProductsV3_universal_d_Subscription = Subscription;
  type storesCatalogV3ProductProductsV3_universal_d_SubscriptionCyclesOneOf = SubscriptionCyclesOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_SubscriptionFrequency = SubscriptionFrequency;
  const storesCatalogV3ProductProductsV3_universal_d_SubscriptionFrequency: typeof SubscriptionFrequency;
  type storesCatalogV3ProductProductsV3_universal_d_SubscriptionDiscount = SubscriptionDiscount;
  type storesCatalogV3ProductProductsV3_universal_d_SubscriptionDiscountDiscountOneOf = SubscriptionDiscountDiscountOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_DiscountType = DiscountType;
  const storesCatalogV3ProductProductsV3_universal_d_DiscountType: typeof DiscountType;
  type storesCatalogV3ProductProductsV3_universal_d_VariantSummary = VariantSummary;
  type storesCatalogV3ProductProductsV3_universal_d_MinVariantPriceInfo = MinVariantPriceInfo;
  type storesCatalogV3ProductProductsV3_universal_d_UpdateDocumentsEvent = UpdateDocumentsEvent;
  type storesCatalogV3ProductProductsV3_universal_d_UpdateDocumentsEventOperationOneOf = UpdateDocumentsEventOperationOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_DocumentUpdateOperation = DocumentUpdateOperation;
  type storesCatalogV3ProductProductsV3_universal_d_IndexDocument = IndexDocument;
  type storesCatalogV3ProductProductsV3_universal_d_DocumentPayload = DocumentPayload;
  type storesCatalogV3ProductProductsV3_universal_d_DocumentImage = DocumentImage;
  type storesCatalogV3ProductProductsV3_universal_d_Enum = Enum;
  const storesCatalogV3ProductProductsV3_universal_d_Enum: typeof Enum;
  type storesCatalogV3ProductProductsV3_universal_d_DeleteByIdsOperation = DeleteByIdsOperation;
  type storesCatalogV3ProductProductsV3_universal_d_DeleteByFilterOperation = DeleteByFilterOperation;
  type storesCatalogV3ProductProductsV3_universal_d_UpdateByFilterOperation = UpdateByFilterOperation;
  type storesCatalogV3ProductProductsV3_universal_d_UpdateExistingOperation = UpdateExistingOperation;
  type storesCatalogV3ProductProductsV3_universal_d_SearchIndexingNotification = SearchIndexingNotification;
  type storesCatalogV3ProductProductsV3_universal_d_CreateProductRequest = CreateProductRequest;
  type storesCatalogV3ProductProductsV3_universal_d_SingleEntityOpsRequestedFields = SingleEntityOpsRequestedFields;
  const storesCatalogV3ProductProductsV3_universal_d_SingleEntityOpsRequestedFields: typeof SingleEntityOpsRequestedFields;
  type storesCatalogV3ProductProductsV3_universal_d_CreateProductResponse = CreateProductResponse;
  type storesCatalogV3ProductProductsV3_universal_d_VariantsNotAlignedWithProduct = VariantsNotAlignedWithProduct;
  type storesCatalogV3ProductProductsV3_universal_d_VariantNotAlignedWithProduct = VariantNotAlignedWithProduct;
  type storesCatalogV3ProductProductsV3_universal_d_CreateProductWithInventoryRequest = CreateProductWithInventoryRequest;
  type storesCatalogV3ProductProductsV3_universal_d_ProductWithInventory = ProductWithInventory;
  type storesCatalogV3ProductProductsV3_universal_d_ProductWithInventoryTypedPropertiesOneOf = ProductWithInventoryTypedPropertiesOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_V3VariantsInfo = V3VariantsInfo;
  type storesCatalogV3ProductProductsV3_universal_d_VariantWithInventory = VariantWithInventory;
  type storesCatalogV3ProductProductsV3_universal_d_VariantWithInventoryTypedPropertiesOneOf = VariantWithInventoryTypedPropertiesOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_InventoryItemComposite = InventoryItemComposite;
  type storesCatalogV3ProductProductsV3_universal_d_InventoryItemCompositeTrackingMethodOneOf = InventoryItemCompositeTrackingMethodOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_PreorderInfo = PreorderInfo;
  type storesCatalogV3ProductProductsV3_universal_d_OptionChoiceReferences = OptionChoiceReferences;
  type storesCatalogV3ProductProductsV3_universal_d_V3OptionChoiceIds = V3OptionChoiceIds;
  type storesCatalogV3ProductProductsV3_universal_d_V3OptionChoiceNames = V3OptionChoiceNames;
  type storesCatalogV3ProductProductsV3_universal_d_CreateProductWithInventoryResponse = CreateProductWithInventoryResponse;
  type storesCatalogV3ProductProductsV3_universal_d_BulkInventoryItemResults = BulkInventoryItemResults;
  type storesCatalogV3ProductProductsV3_universal_d_BulkInventoryItemResult = BulkInventoryItemResult;
  type storesCatalogV3ProductProductsV3_universal_d_CommonItemMetadata = CommonItemMetadata;
  type storesCatalogV3ProductProductsV3_universal_d_InventoryItem = InventoryItem;
  type storesCatalogV3ProductProductsV3_universal_d_InventoryItemTrackingMethodOneOf = InventoryItemTrackingMethodOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_AvailabilityStatus = AvailabilityStatus;
  const storesCatalogV3ProductProductsV3_universal_d_AvailabilityStatus: typeof AvailabilityStatus;
  type storesCatalogV3ProductProductsV3_universal_d_Product = Product;
  type storesCatalogV3ProductProductsV3_universal_d_CommonBulkActionMetadata = CommonBulkActionMetadata;
  type storesCatalogV3ProductProductsV3_universal_d_UpdateProductRequest = UpdateProductRequest;
  type storesCatalogV3ProductProductsV3_universal_d_UpdateProductResponse = UpdateProductResponse;
  type storesCatalogV3ProductProductsV3_universal_d_UnsupportedFieldMasks = UnsupportedFieldMasks;
  type storesCatalogV3ProductProductsV3_universal_d_UpdateProductWithInventoryRequest = UpdateProductWithInventoryRequest;
  type storesCatalogV3ProductProductsV3_universal_d_UpdateProductWithInventoryResponse = UpdateProductWithInventoryResponse;
  type storesCatalogV3ProductProductsV3_universal_d_BulkCreateProductsRequest = BulkCreateProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_BulkCreateProductsResponse = BulkCreateProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_CatalogV3BulkProductResult = CatalogV3BulkProductResult;
  type storesCatalogV3ProductProductsV3_universal_d_WixCommonItemMetadata = WixCommonItemMetadata;
  type storesCatalogV3ProductProductsV3_universal_d_InvalidDigitalFileIds = InvalidDigitalFileIds;
  type storesCatalogV3ProductProductsV3_universal_d_BulkCreateProductsWithInventoryRequest = BulkCreateProductsWithInventoryRequest;
  type storesCatalogV3ProductProductsV3_universal_d_BulkCreateProductsWithInventoryResponse = BulkCreateProductsWithInventoryResponse;
  type storesCatalogV3ProductProductsV3_universal_d_BulkProductResults = BulkProductResults;
  type storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsRequest = BulkUpdateProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_V3MaskedProduct = V3MaskedProduct;
  type storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsResponse = BulkUpdateProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsWithInventoryRequest = BulkUpdateProductsWithInventoryRequest;
  type storesCatalogV3ProductProductsV3_universal_d_MaskedProductWithInventory = MaskedProductWithInventory;
  type storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsWithInventoryResponse = BulkUpdateProductsWithInventoryResponse;
  type storesCatalogV3ProductProductsV3_universal_d_V3BulkUpdateProductsByFilterRequest = V3BulkUpdateProductsByFilterRequest;
  type storesCatalogV3ProductProductsV3_universal_d_WixCommonSearchDetails = WixCommonSearchDetails;
  type storesCatalogV3ProductProductsV3_universal_d_CommonSearchDetailsMode = CommonSearchDetailsMode;
  const storesCatalogV3ProductProductsV3_universal_d_CommonSearchDetailsMode: typeof CommonSearchDetailsMode;
  type storesCatalogV3ProductProductsV3_universal_d_V3BulkUpdateProductsByFilterResponse = V3BulkUpdateProductsByFilterResponse;
  type storesCatalogV3ProductProductsV3_universal_d_V3UpdateExtendedFieldsRequest = V3UpdateExtendedFieldsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_V3UpdateExtendedFieldsResponse = V3UpdateExtendedFieldsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_V3DeleteProductRequest = V3DeleteProductRequest;
  type storesCatalogV3ProductProductsV3_universal_d_V3DeleteProductResponse = V3DeleteProductResponse;
  type storesCatalogV3ProductProductsV3_universal_d_V3BulkDeleteProductsRequest = V3BulkDeleteProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_V3BulkDeleteProductsResponse = V3BulkDeleteProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_BulkDeleteProductsResponseBulkProductResult = BulkDeleteProductsResponseBulkProductResult;
  type storesCatalogV3ProductProductsV3_universal_d_V3BulkDeleteProductsByFilterRequest = V3BulkDeleteProductsByFilterRequest;
  type storesCatalogV3ProductProductsV3_universal_d_V3BulkDeleteProductsByFilterResponse = V3BulkDeleteProductsByFilterResponse;
  type storesCatalogV3ProductProductsV3_universal_d_V3GetProductRequest = V3GetProductRequest;
  type storesCatalogV3ProductProductsV3_universal_d_V3GetProductResponse = V3GetProductResponse;
  type storesCatalogV3ProductProductsV3_universal_d_V3GetProductBySlugRequest = V3GetProductBySlugRequest;
  type storesCatalogV3ProductProductsV3_universal_d_V3GetProductBySlugResponse = V3GetProductBySlugResponse;
  type storesCatalogV3ProductProductsV3_universal_d_V3SearchProductsRequest = V3SearchProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_CommonCursorSearch = CommonCursorSearch;
  type storesCatalogV3ProductProductsV3_universal_d_CommonCursorSearchPagingMethodOneOf = CommonCursorSearchPagingMethodOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_WixCommonSorting = WixCommonSorting;
  type storesCatalogV3ProductProductsV3_universal_d_WixCommonSortOrder = WixCommonSortOrder;
  const storesCatalogV3ProductProductsV3_universal_d_WixCommonSortOrder: typeof WixCommonSortOrder;
  type storesCatalogV3ProductProductsV3_universal_d_WixCommonAggregation = WixCommonAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_WixCommonAggregationKindOneOf = WixCommonAggregationKindOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationRangeAggregationRangeBucket = AggregationRangeAggregationRangeBucket;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationValueAggregationSortType = AggregationValueAggregationSortType;
  const storesCatalogV3ProductProductsV3_universal_d_AggregationValueAggregationSortType: typeof AggregationValueAggregationSortType;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationValueAggregationSortDirection = AggregationValueAggregationSortDirection;
  const storesCatalogV3ProductProductsV3_universal_d_AggregationValueAggregationSortDirection: typeof AggregationValueAggregationSortDirection;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationValueAggregationMissingValues = AggregationValueAggregationMissingValues;
  const storesCatalogV3ProductProductsV3_universal_d_AggregationValueAggregationMissingValues: typeof AggregationValueAggregationMissingValues;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationValueAggregationIncludeMissingValuesOptions = AggregationValueAggregationIncludeMissingValuesOptions;
  type storesCatalogV3ProductProductsV3_universal_d_WixCommonScalarType = WixCommonScalarType;
  const storesCatalogV3ProductProductsV3_universal_d_WixCommonScalarType: typeof WixCommonScalarType;
  type storesCatalogV3ProductProductsV3_universal_d_CommonAggregationValueAggregation = CommonAggregationValueAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_CommonAggregationValueAggregationOptionsOneOf = CommonAggregationValueAggregationOptionsOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationNestedAggregationNestedAggregationType = AggregationNestedAggregationNestedAggregationType;
  const storesCatalogV3ProductProductsV3_universal_d_AggregationNestedAggregationNestedAggregationType: typeof AggregationNestedAggregationNestedAggregationType;
  type storesCatalogV3ProductProductsV3_universal_d_CommonAggregationRangeAggregation = CommonAggregationRangeAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_CommonAggregationScalarAggregation = CommonAggregationScalarAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_CommonAggregationDateHistogramAggregation = CommonAggregationDateHistogramAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationDateHistogramAggregationInterval = AggregationDateHistogramAggregationInterval;
  const storesCatalogV3ProductProductsV3_universal_d_AggregationDateHistogramAggregationInterval: typeof AggregationDateHistogramAggregationInterval;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationNestedAggregationNestedAggregationItem = AggregationNestedAggregationNestedAggregationItem;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationNestedAggregationNestedAggregationItemKindOneOf = AggregationNestedAggregationNestedAggregationItemKindOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_WixCommonAggregationType = WixCommonAggregationType;
  const storesCatalogV3ProductProductsV3_universal_d_WixCommonAggregationType: typeof WixCommonAggregationType;
  type storesCatalogV3ProductProductsV3_universal_d_CommonAggregationNestedAggregation = CommonAggregationNestedAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_CommonCursorPaging = CommonCursorPaging;
  type storesCatalogV3ProductProductsV3_universal_d_V3SearchProductsResponse = V3SearchProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_CommonCursorPagingMetadata = CommonCursorPagingMetadata;
  type storesCatalogV3ProductProductsV3_universal_d_CommonCursors = CommonCursors;
  type storesCatalogV3ProductProductsV3_universal_d_CommonAggregationData = CommonAggregationData;
  type storesCatalogV3ProductProductsV3_universal_d_ValueResultsValueAggregationResult = ValueResultsValueAggregationResult;
  type storesCatalogV3ProductProductsV3_universal_d_RangeResultsRangeAggregationResult = RangeResultsRangeAggregationResult;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationResultsNestedAggregationResults = AggregationResultsNestedAggregationResults;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationResultsNestedAggregationResultsResultOneOf = AggregationResultsNestedAggregationResultsResultOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationResultsValueResults = AggregationResultsValueResults;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationResultsRangeResults = AggregationResultsRangeResults;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationDataAggregationResultsScalarResult = AggregationDataAggregationResultsScalarResult;
  type storesCatalogV3ProductProductsV3_universal_d_GroupByValueResultsNestedValueAggregationResult = GroupByValueResultsNestedValueAggregationResult;
  type storesCatalogV3ProductProductsV3_universal_d_NestedResultsValueResult = NestedResultsValueResult;
  type storesCatalogV3ProductProductsV3_universal_d_NestedResultsRangeResult = NestedResultsRangeResult;
  type storesCatalogV3ProductProductsV3_universal_d_NestedResultsScalarResult = NestedResultsScalarResult;
  type storesCatalogV3ProductProductsV3_universal_d_NestedResultsNestedResultValue = NestedResultsNestedResultValue;
  type storesCatalogV3ProductProductsV3_universal_d_NestedResultsNestedResultValueResultOneOf = NestedResultsNestedResultValueResultOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_NestedResultsResults = NestedResultsResults;
  type storesCatalogV3ProductProductsV3_universal_d_DateHistogramResultsDateHistogramResult = DateHistogramResultsDateHistogramResult;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationResultsGroupByValueResults = AggregationResultsGroupByValueResults;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationResultsDateHistogramResults = AggregationResultsDateHistogramResults;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationResultsNestedResults = AggregationResultsNestedResults;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationDataAggregationResults = AggregationDataAggregationResults;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationDataAggregationResultsResultOneOf = AggregationDataAggregationResultsResultOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_V3QueryProductsRequest = V3QueryProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_CommonCursorQuery = CommonCursorQuery;
  type storesCatalogV3ProductProductsV3_universal_d_CommonCursorQueryPagingMethodOneOf = CommonCursorQueryPagingMethodOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_V3QueryProductsResponse = V3QueryProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_V3CountProductsRequest = V3CountProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_V3CountProductsResponse = V3CountProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductVariantsByFilterRequest = BulkUpdateProductVariantsByFilterRequest;
  type storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductVariantsByFilterResponse = BulkUpdateProductVariantsByFilterResponse;
  type storesCatalogV3ProductProductsV3_universal_d_BulkAdjustProductVariantsByFilterRequest = BulkAdjustProductVariantsByFilterRequest;
  type storesCatalogV3ProductProductsV3_universal_d_V3AdjustValue = V3AdjustValue;
  type storesCatalogV3ProductProductsV3_universal_d_V3AdjustValueAdjustValueOneOf = V3AdjustValueAdjustValueOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_V3UnsignedAdjustValue = V3UnsignedAdjustValue;
  type storesCatalogV3ProductProductsV3_universal_d_V3UnsignedAdjustValueAdjustValueOneOf = V3UnsignedAdjustValueAdjustValueOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_BulkAdjustProductVariantsByFilterRequestRoundingStrategy = BulkAdjustProductVariantsByFilterRequestRoundingStrategy;
  const storesCatalogV3ProductProductsV3_universal_d_BulkAdjustProductVariantsByFilterRequestRoundingStrategy: typeof BulkAdjustProductVariantsByFilterRequestRoundingStrategy;
  type storesCatalogV3ProductProductsV3_universal_d_BulkAdjustProductVariantsByFilterResponse = BulkAdjustProductVariantsByFilterResponse;
  type storesCatalogV3ProductProductsV3_universal_d_V3BulkAddInfoSectionsToProductsByFilterRequest = V3BulkAddInfoSectionsToProductsByFilterRequest;
  type storesCatalogV3ProductProductsV3_universal_d_V3BulkAddInfoSectionsToProductsByFilterResponse = V3BulkAddInfoSectionsToProductsByFilterResponse;
  type storesCatalogV3ProductProductsV3_universal_d_V3BulkAddInfoSectionsToProductsRequest = V3BulkAddInfoSectionsToProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_V3ProductIdWithRevision = V3ProductIdWithRevision;
  type storesCatalogV3ProductProductsV3_universal_d_V3BulkAddInfoSectionsToProductsResponse = V3BulkAddInfoSectionsToProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_V3BulkRemoveInfoSectionsFromProductsByFilterRequest = V3BulkRemoveInfoSectionsFromProductsByFilterRequest;
  type storesCatalogV3ProductProductsV3_universal_d_V3BulkRemoveInfoSectionsFromProductsByFilterResponse = V3BulkRemoveInfoSectionsFromProductsByFilterResponse;
  type storesCatalogV3ProductProductsV3_universal_d_V3BulkRemoveInfoSectionsFromProductsRequest = V3BulkRemoveInfoSectionsFromProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_V3BulkRemoveInfoSectionsFromProductsResponse = V3BulkRemoveInfoSectionsFromProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_BulkAddProductsToCategoriesByFilterRequest = BulkAddProductsToCategoriesByFilterRequest;
  type storesCatalogV3ProductProductsV3_universal_d_BulkAddProductsToCategoriesByFilterResponse = BulkAddProductsToCategoriesByFilterResponse;
  type storesCatalogV3ProductProductsV3_universal_d_BulkRemoveProductsFromCategoriesByFilterRequest = BulkRemoveProductsFromCategoriesByFilterRequest;
  type storesCatalogV3ProductProductsV3_universal_d_BulkRemoveProductsFromCategoriesByFilterResponse = BulkRemoveProductsFromCategoriesByFilterResponse;
  type storesCatalogV3ProductProductsV3_universal_d_DoNotCallCreateProductRequest = DoNotCallCreateProductRequest;
  type storesCatalogV3ProductProductsV3_universal_d_DoNotCallCreateProductResponse = DoNotCallCreateProductResponse;
  type storesCatalogV3ProductProductsV3_universal_d_GetProductRequest = GetProductRequest;
  type storesCatalogV3ProductProductsV3_universal_d_GetProductResponse = GetProductResponse;
  type storesCatalogV3ProductProductsV3_universal_d_GetProductBySlugRequest = GetProductBySlugRequest;
  type storesCatalogV3ProductProductsV3_universal_d_GetProductBySlugResponse = GetProductBySlugResponse;
  type storesCatalogV3ProductProductsV3_universal_d_DoNotCallUpdateProductRequest = DoNotCallUpdateProductRequest;
  type storesCatalogV3ProductProductsV3_universal_d_DoNotCallUpdateProductResponse = DoNotCallUpdateProductResponse;
  type storesCatalogV3ProductProductsV3_universal_d_VariantsRemoved = VariantsRemoved;
  type storesCatalogV3ProductProductsV3_universal_d_DeleteProductRequest = DeleteProductRequest;
  type storesCatalogV3ProductProductsV3_universal_d_DeleteProductResponse = DeleteProductResponse;
  type storesCatalogV3ProductProductsV3_universal_d_SearchProductsRequest = SearchProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_CursorSearch = CursorSearch;
  type storesCatalogV3ProductProductsV3_universal_d_CursorSearchPagingMethodOneOf = CursorSearchPagingMethodOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_Aggregation = Aggregation;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationKindOneOf = AggregationKindOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_RangeBucket = RangeBucket;
  type storesCatalogV3ProductProductsV3_universal_d_SortType = SortType;
  const storesCatalogV3ProductProductsV3_universal_d_SortType: typeof SortType;
  type storesCatalogV3ProductProductsV3_universal_d_SortDirection = SortDirection;
  const storesCatalogV3ProductProductsV3_universal_d_SortDirection: typeof SortDirection;
  type storesCatalogV3ProductProductsV3_universal_d_MissingValues = MissingValues;
  const storesCatalogV3ProductProductsV3_universal_d_MissingValues: typeof MissingValues;
  type storesCatalogV3ProductProductsV3_universal_d_IncludeMissingValuesOptions = IncludeMissingValuesOptions;
  type storesCatalogV3ProductProductsV3_universal_d_ScalarType = ScalarType;
  const storesCatalogV3ProductProductsV3_universal_d_ScalarType: typeof ScalarType;
  type storesCatalogV3ProductProductsV3_universal_d_ValueAggregation = ValueAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_ValueAggregationOptionsOneOf = ValueAggregationOptionsOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_NestedAggregationType = NestedAggregationType;
  const storesCatalogV3ProductProductsV3_universal_d_NestedAggregationType: typeof NestedAggregationType;
  type storesCatalogV3ProductProductsV3_universal_d_RangeAggregation = RangeAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_ScalarAggregation = ScalarAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_DateHistogramAggregation = DateHistogramAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_Interval = Interval;
  const storesCatalogV3ProductProductsV3_universal_d_Interval: typeof Interval;
  type storesCatalogV3ProductProductsV3_universal_d_NestedAggregationItem = NestedAggregationItem;
  type storesCatalogV3ProductProductsV3_universal_d_NestedAggregationItemKindOneOf = NestedAggregationItemKindOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationType = AggregationType;
  const storesCatalogV3ProductProductsV3_universal_d_AggregationType: typeof AggregationType;
  type storesCatalogV3ProductProductsV3_universal_d_NestedAggregation = NestedAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_SearchDetails = SearchDetails;
  type storesCatalogV3ProductProductsV3_universal_d_Mode = Mode;
  const storesCatalogV3ProductProductsV3_universal_d_Mode: typeof Mode;
  type storesCatalogV3ProductProductsV3_universal_d_SearchProductsResponse = SearchProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationData = AggregationData;
  type storesCatalogV3ProductProductsV3_universal_d_ValueAggregationResult = ValueAggregationResult;
  type storesCatalogV3ProductProductsV3_universal_d_RangeAggregationResult = RangeAggregationResult;
  type storesCatalogV3ProductProductsV3_universal_d_NestedAggregationResults = NestedAggregationResults;
  type storesCatalogV3ProductProductsV3_universal_d_NestedAggregationResultsResultOneOf = NestedAggregationResultsResultOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_ValueResults = ValueResults;
  type storesCatalogV3ProductProductsV3_universal_d_RangeResults = RangeResults;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationResultsScalarResult = AggregationResultsScalarResult;
  type storesCatalogV3ProductProductsV3_universal_d_NestedValueAggregationResult = NestedValueAggregationResult;
  type storesCatalogV3ProductProductsV3_universal_d_ValueResult = ValueResult;
  type storesCatalogV3ProductProductsV3_universal_d_RangeResult = RangeResult;
  type storesCatalogV3ProductProductsV3_universal_d_ScalarResult = ScalarResult;
  type storesCatalogV3ProductProductsV3_universal_d_NestedResultValue = NestedResultValue;
  type storesCatalogV3ProductProductsV3_universal_d_NestedResultValueResultOneOf = NestedResultValueResultOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_Results = Results;
  type storesCatalogV3ProductProductsV3_universal_d_DateHistogramResult = DateHistogramResult;
  type storesCatalogV3ProductProductsV3_universal_d_GroupByValueResults = GroupByValueResults;
  type storesCatalogV3ProductProductsV3_universal_d_DateHistogramResults = DateHistogramResults;
  type storesCatalogV3ProductProductsV3_universal_d_NestedResults = NestedResults;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationResults = AggregationResults;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationResultsResultOneOf = AggregationResultsResultOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_SearchRelatedProductsRequest = SearchRelatedProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_SearchRelated = SearchRelated;
  type storesCatalogV3ProductProductsV3_universal_d_SearchRelatedDetails = SearchRelatedDetails;
  type storesCatalogV3ProductProductsV3_universal_d_SearchRelatedProductsResponse = SearchRelatedProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_EventuallyConsistentQueryProductsRequest = EventuallyConsistentQueryProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_EventuallyConsistentQueryProductsResponse = EventuallyConsistentQueryProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_QueryProductsRequest = QueryProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_QueryProductsResponse = QueryProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_DeprecatedSearchProductsWithOffsetRequest = DeprecatedSearchProductsWithOffsetRequest;
  type storesCatalogV3ProductProductsV3_universal_d_PlatformOffsetSearch = PlatformOffsetSearch;
  type storesCatalogV3ProductProductsV3_universal_d_PlatformOffsetSearchPagingMethodOneOf = PlatformOffsetSearchPagingMethodOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_CommonSorting = CommonSorting;
  type storesCatalogV3ProductProductsV3_universal_d_CommonSortOrder = CommonSortOrder;
  const storesCatalogV3ProductProductsV3_universal_d_CommonSortOrder: typeof CommonSortOrder;
  type storesCatalogV3ProductProductsV3_universal_d_CommonAggregation = CommonAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_CommonAggregationKindOneOf = CommonAggregationKindOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_RangeAggregationRangeBucket = RangeAggregationRangeBucket;
  type storesCatalogV3ProductProductsV3_universal_d_ValueAggregationSortType = ValueAggregationSortType;
  const storesCatalogV3ProductProductsV3_universal_d_ValueAggregationSortType: typeof ValueAggregationSortType;
  type storesCatalogV3ProductProductsV3_universal_d_ValueAggregationSortDirection = ValueAggregationSortDirection;
  const storesCatalogV3ProductProductsV3_universal_d_ValueAggregationSortDirection: typeof ValueAggregationSortDirection;
  type storesCatalogV3ProductProductsV3_universal_d_ValueAggregationMissingValues = ValueAggregationMissingValues;
  const storesCatalogV3ProductProductsV3_universal_d_ValueAggregationMissingValues: typeof ValueAggregationMissingValues;
  type storesCatalogV3ProductProductsV3_universal_d_ValueAggregationIncludeMissingValuesOptions = ValueAggregationIncludeMissingValuesOptions;
  type storesCatalogV3ProductProductsV3_universal_d_CommonScalarType = CommonScalarType;
  const storesCatalogV3ProductProductsV3_universal_d_CommonScalarType: typeof CommonScalarType;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationValueAggregation = AggregationValueAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationValueAggregationOptionsOneOf = AggregationValueAggregationOptionsOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_NestedAggregationNestedAggregationType = NestedAggregationNestedAggregationType;
  const storesCatalogV3ProductProductsV3_universal_d_NestedAggregationNestedAggregationType: typeof NestedAggregationNestedAggregationType;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationRangeAggregation = AggregationRangeAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationScalarAggregation = AggregationScalarAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationDateHistogramAggregation = AggregationDateHistogramAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_DateHistogramAggregationInterval = DateHistogramAggregationInterval;
  const storesCatalogV3ProductProductsV3_universal_d_DateHistogramAggregationInterval: typeof DateHistogramAggregationInterval;
  type storesCatalogV3ProductProductsV3_universal_d_NestedAggregationNestedAggregationItem = NestedAggregationNestedAggregationItem;
  type storesCatalogV3ProductProductsV3_universal_d_NestedAggregationNestedAggregationItemKindOneOf = NestedAggregationNestedAggregationItemKindOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_CommonAggregationType = CommonAggregationType;
  const storesCatalogV3ProductProductsV3_universal_d_CommonAggregationType: typeof CommonAggregationType;
  type storesCatalogV3ProductProductsV3_universal_d_AggregationNestedAggregation = AggregationNestedAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_GroupByAggregation = GroupByAggregation;
  type storesCatalogV3ProductProductsV3_universal_d_GroupByAggregationKindOneOf = GroupByAggregationKindOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_CommonSearchDetails = CommonSearchDetails;
  type storesCatalogV3ProductProductsV3_universal_d_SearchDetailsMode = SearchDetailsMode;
  const storesCatalogV3ProductProductsV3_universal_d_SearchDetailsMode: typeof SearchDetailsMode;
  type storesCatalogV3ProductProductsV3_universal_d_PlatformPaging = PlatformPaging;
  type storesCatalogV3ProductProductsV3_universal_d_DeprecatedSearchProductsWithOffsetResponse = DeprecatedSearchProductsWithOffsetResponse;
  type storesCatalogV3ProductProductsV3_universal_d_PagingMetadata = PagingMetadata;
  type storesCatalogV3ProductProductsV3_universal_d_RetrieveVariantsRequest = RetrieveVariantsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_ProductVariantIds = ProductVariantIds;
  type storesCatalogV3ProductProductsV3_universal_d_VariantsCursorPaging = VariantsCursorPaging;
  type storesCatalogV3ProductProductsV3_universal_d_VariantsOpsRequestedFields = VariantsOpsRequestedFields;
  const storesCatalogV3ProductProductsV3_universal_d_VariantsOpsRequestedFields: typeof VariantsOpsRequestedFields;
  type storesCatalogV3ProductProductsV3_universal_d_RetrieveVariantsResponse = RetrieveVariantsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_ProductVariants = ProductVariants;
  type storesCatalogV3ProductProductsV3_universal_d_CountProductsRequest = CountProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_CountProductsResponse = CountProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_DoNotCallBulkCreateProductsRequest = DoNotCallBulkCreateProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_DoNotCallBulkCreateProductsResponse = DoNotCallBulkCreateProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_V3BulkProductResult = V3BulkProductResult;
  type storesCatalogV3ProductProductsV3_universal_d_DoNotCallBulkUpdateProductsRequest = DoNotCallBulkUpdateProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_MaskedProduct = MaskedProduct;
  type storesCatalogV3ProductProductsV3_universal_d_DoNotCallBulkUpdateProductsResponse = DoNotCallBulkUpdateProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsByFilterRequest = BulkUpdateProductsByFilterRequest;
  type storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsByFilterResponse = BulkUpdateProductsByFilterResponse;
  type storesCatalogV3ProductProductsV3_universal_d_BulkDeleteProductsRequest = BulkDeleteProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_BulkDeleteProductsResponse = BulkDeleteProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_BulkProductResult = BulkProductResult;
  type storesCatalogV3ProductProductsV3_universal_d_BulkDeleteProductsByFilterRequest = BulkDeleteProductsByFilterRequest;
  type storesCatalogV3ProductProductsV3_universal_d_BulkDeleteProductsByFilterResponse = BulkDeleteProductsByFilterResponse;
  type storesCatalogV3ProductProductsV3_universal_d_UpdateExtendedFieldsRequest = UpdateExtendedFieldsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_UpdateExtendedFieldsResponse = UpdateExtendedFieldsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_BulkAddInfoSectionsToProductsByFilterRequest = BulkAddInfoSectionsToProductsByFilterRequest;
  type storesCatalogV3ProductProductsV3_universal_d_BulkAddInfoSectionsToProductsByFilterResponse = BulkAddInfoSectionsToProductsByFilterResponse;
  type storesCatalogV3ProductProductsV3_universal_d_FulfillerDeleted = FulfillerDeleted;
  type storesCatalogV3ProductProductsV3_universal_d_BulkAddInfoSectionsToProductsRequest = BulkAddInfoSectionsToProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_ProductIdWithRevision = ProductIdWithRevision;
  type storesCatalogV3ProductProductsV3_universal_d_BulkAddInfoSectionsToProductsResponse = BulkAddInfoSectionsToProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_BulkRemoveInfoSectionsFromProductsByFilterRequest = BulkRemoveInfoSectionsFromProductsByFilterRequest;
  type storesCatalogV3ProductProductsV3_universal_d_BulkRemoveInfoSectionsFromProductsByFilterResponse = BulkRemoveInfoSectionsFromProductsByFilterResponse;
  type storesCatalogV3ProductProductsV3_universal_d_BulkRemoveInfoSectionsFromProductsRequest = BulkRemoveInfoSectionsFromProductsRequest;
  type storesCatalogV3ProductProductsV3_universal_d_BulkRemoveInfoSectionsFromProductsResponse = BulkRemoveInfoSectionsFromProductsResponse;
  type storesCatalogV3ProductProductsV3_universal_d_BulkUpdateVariantsByFilterRequest = BulkUpdateVariantsByFilterRequest;
  type storesCatalogV3ProductProductsV3_universal_d_BulkUpdateVariantsByFilterResponse = BulkUpdateVariantsByFilterResponse;
  type storesCatalogV3ProductProductsV3_universal_d_V3BulkAdjustProductVariantsByFilterRequest = V3BulkAdjustProductVariantsByFilterRequest;
  type storesCatalogV3ProductProductsV3_universal_d_AdjustValue = AdjustValue;
  type storesCatalogV3ProductProductsV3_universal_d_AdjustValueAdjustValueOneOf = AdjustValueAdjustValueOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_UnsignedAdjustValue = UnsignedAdjustValue;
  type storesCatalogV3ProductProductsV3_universal_d_UnsignedAdjustValueAdjustValueOneOf = UnsignedAdjustValueAdjustValueOneOf;
  type storesCatalogV3ProductProductsV3_universal_d_RoundingStrategy = RoundingStrategy;
  const storesCatalogV3ProductProductsV3_universal_d_RoundingStrategy: typeof RoundingStrategy;
  type storesCatalogV3ProductProductsV3_universal_d_V3BulkAdjustProductVariantsByFilterResponse = V3BulkAdjustProductVariantsByFilterResponse;
  type storesCatalogV3ProductProductsV3_universal_d_BulkInventoryItemAction = BulkInventoryItemAction;
  const storesCatalogV3ProductProductsV3_universal_d_createProduct: typeof createProduct;
  type storesCatalogV3ProductProductsV3_universal_d_CreateProductOptions = CreateProductOptions;
  const storesCatalogV3ProductProductsV3_universal_d_createProductWithInventory: typeof createProductWithInventory;
  type storesCatalogV3ProductProductsV3_universal_d_CreateProductWithInventoryOptions = CreateProductWithInventoryOptions;
  const storesCatalogV3ProductProductsV3_universal_d_updateProduct: typeof updateProduct;
  type storesCatalogV3ProductProductsV3_universal_d_UpdateProduct = UpdateProduct;
  type storesCatalogV3ProductProductsV3_universal_d_UpdateProductOptions = UpdateProductOptions;
  const storesCatalogV3ProductProductsV3_universal_d_updateProductWithInventory: typeof updateProductWithInventory;
  type storesCatalogV3ProductProductsV3_universal_d_UpdateProductWithInventoryProduct = UpdateProductWithInventoryProduct;
  type storesCatalogV3ProductProductsV3_universal_d_UpdateProductWithInventoryOptions = UpdateProductWithInventoryOptions;
  const storesCatalogV3ProductProductsV3_universal_d_bulkCreateProducts: typeof bulkCreateProducts;
  type storesCatalogV3ProductProductsV3_universal_d_BulkCreateProductsOptions = BulkCreateProductsOptions;
  const storesCatalogV3ProductProductsV3_universal_d_bulkCreateProductsWithInventory: typeof bulkCreateProductsWithInventory;
  type storesCatalogV3ProductProductsV3_universal_d_BulkCreateProductsWithInventoryOptions = BulkCreateProductsWithInventoryOptions;
  const storesCatalogV3ProductProductsV3_universal_d_bulkUpdateProducts: typeof bulkUpdateProducts;
  type storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsOptions = BulkUpdateProductsOptions;
  const storesCatalogV3ProductProductsV3_universal_d_bulkUpdateProductsWithInventory: typeof bulkUpdateProductsWithInventory;
  type storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsWithInventoryOptions = BulkUpdateProductsWithInventoryOptions;
  const storesCatalogV3ProductProductsV3_universal_d_bulkUpdateProductsByFilter: typeof bulkUpdateProductsByFilter;
  type storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsByFilterOptions = BulkUpdateProductsByFilterOptions;
  const storesCatalogV3ProductProductsV3_universal_d_updateExtendedFields: typeof updateExtendedFields;
  type storesCatalogV3ProductProductsV3_universal_d_UpdateExtendedFieldsOptions = UpdateExtendedFieldsOptions;
  const storesCatalogV3ProductProductsV3_universal_d_deleteProduct: typeof deleteProduct;
  const storesCatalogV3ProductProductsV3_universal_d_bulkDeleteProducts: typeof bulkDeleteProducts;
  const storesCatalogV3ProductProductsV3_universal_d_bulkDeleteProductsByFilter: typeof bulkDeleteProductsByFilter;
  type storesCatalogV3ProductProductsV3_universal_d_BulkDeleteProductsByFilterOptions = BulkDeleteProductsByFilterOptions;
  const storesCatalogV3ProductProductsV3_universal_d_getProduct: typeof getProduct;
  type storesCatalogV3ProductProductsV3_universal_d_GetProductOptions = GetProductOptions;
  const storesCatalogV3ProductProductsV3_universal_d_getProductBySlug: typeof getProductBySlug;
  type storesCatalogV3ProductProductsV3_universal_d_GetProductBySlugOptions = GetProductBySlugOptions;
  const storesCatalogV3ProductProductsV3_universal_d_searchProducts: typeof searchProducts;
  type storesCatalogV3ProductProductsV3_universal_d_SearchProductsOptions = SearchProductsOptions;
  const storesCatalogV3ProductProductsV3_universal_d_queryProducts: typeof queryProducts;
  type storesCatalogV3ProductProductsV3_universal_d_QueryProductsOptions = QueryProductsOptions;
  type storesCatalogV3ProductProductsV3_universal_d_ProductsQueryResult = ProductsQueryResult;
  type storesCatalogV3ProductProductsV3_universal_d_ProductsQueryBuilder = ProductsQueryBuilder;
  const storesCatalogV3ProductProductsV3_universal_d_countProducts: typeof countProducts;
  type storesCatalogV3ProductProductsV3_universal_d_CountProductsOptions = CountProductsOptions;
  const storesCatalogV3ProductProductsV3_universal_d_bulkUpdateProductVariantsByFilter: typeof bulkUpdateProductVariantsByFilter;
  type storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductVariantsByFilterOptions = BulkUpdateProductVariantsByFilterOptions;
  const storesCatalogV3ProductProductsV3_universal_d_bulkAdjustProductVariantsByFilter: typeof bulkAdjustProductVariantsByFilter;
  type storesCatalogV3ProductProductsV3_universal_d_BulkAdjustProductVariantsByFilterOptions = BulkAdjustProductVariantsByFilterOptions;
  const storesCatalogV3ProductProductsV3_universal_d_bulkAddInfoSectionsToProductsByFilter: typeof bulkAddInfoSectionsToProductsByFilter;
  type storesCatalogV3ProductProductsV3_universal_d_BulkAddInfoSectionsToProductsByFilterOptions = BulkAddInfoSectionsToProductsByFilterOptions;
  const storesCatalogV3ProductProductsV3_universal_d_bulkAddInfoSectionsToProducts: typeof bulkAddInfoSectionsToProducts;
  type storesCatalogV3ProductProductsV3_universal_d_BulkAddInfoSectionsToProductsOptions = BulkAddInfoSectionsToProductsOptions;
  const storesCatalogV3ProductProductsV3_universal_d_bulkRemoveInfoSectionsFromProductsByFilter: typeof bulkRemoveInfoSectionsFromProductsByFilter;
  type storesCatalogV3ProductProductsV3_universal_d_BulkRemoveInfoSectionsFromProductsByFilterOptions = BulkRemoveInfoSectionsFromProductsByFilterOptions;
  const storesCatalogV3ProductProductsV3_universal_d_bulkRemoveInfoSectionsFromProducts: typeof bulkRemoveInfoSectionsFromProducts;
  type storesCatalogV3ProductProductsV3_universal_d_BulkRemoveInfoSectionsFromProductsOptions = BulkRemoveInfoSectionsFromProductsOptions;
  const storesCatalogV3ProductProductsV3_universal_d_bulkAddProductsToCategoriesByFilter: typeof bulkAddProductsToCategoriesByFilter;
  type storesCatalogV3ProductProductsV3_universal_d_BulkAddProductsToCategoriesByFilterOptions = BulkAddProductsToCategoriesByFilterOptions;
  const storesCatalogV3ProductProductsV3_universal_d_bulkRemoveProductsFromCategoriesByFilter: typeof bulkRemoveProductsFromCategoriesByFilter;
  type storesCatalogV3ProductProductsV3_universal_d_BulkRemoveProductsFromCategoriesByFilterOptions = BulkRemoveProductsFromCategoriesByFilterOptions;
  namespace storesCatalogV3ProductProductsV3_universal_d {
    export {
      storesCatalogV3ProductProductsV3_universal_d_V3Product as V3Product,
      storesCatalogV3ProductProductsV3_universal_d_V3ProductTypedPropertiesOneOf as V3ProductTypedPropertiesOneOf,
      storesCatalogV3ProductProductsV3_universal_d_RichContent as RichContent,
      storesCatalogV3ProductProductsV3_universal_d_Node as Node,
      storesCatalogV3ProductProductsV3_universal_d_NodeDataOneOf as NodeDataOneOf,
      storesCatalogV3ProductProductsV3_universal_d_NodeType as NodeType,
      storesCatalogV3ProductProductsV3_universal_d_NodeStyle as NodeStyle,
      storesCatalogV3ProductProductsV3_universal_d_ButtonData as ButtonData,
      storesCatalogV3ProductProductsV3_universal_d_Border as Border,
      storesCatalogV3ProductProductsV3_universal_d_Colors as Colors,
      storesCatalogV3ProductProductsV3_universal_d_PluginContainerData as PluginContainerData,
      storesCatalogV3ProductProductsV3_universal_d_WidthType as WidthType,
      storesCatalogV3ProductProductsV3_universal_d_PluginContainerDataWidth as PluginContainerDataWidth,
      storesCatalogV3ProductProductsV3_universal_d_PluginContainerDataWidthDataOneOf as PluginContainerDataWidthDataOneOf,
      storesCatalogV3ProductProductsV3_universal_d_PluginContainerDataAlignment as PluginContainerDataAlignment,
      storesCatalogV3ProductProductsV3_universal_d_Spoiler as Spoiler,
      storesCatalogV3ProductProductsV3_universal_d_Height as Height,
      storesCatalogV3ProductProductsV3_universal_d_Type as Type,
      storesCatalogV3ProductProductsV3_universal_d_Styles as Styles,
      storesCatalogV3ProductProductsV3_universal_d_Link as Link,
      storesCatalogV3ProductProductsV3_universal_d_LinkDataOneOf as LinkDataOneOf,
      storesCatalogV3ProductProductsV3_universal_d_Target as Target,
      storesCatalogV3ProductProductsV3_universal_d_Rel as Rel,
      storesCatalogV3ProductProductsV3_universal_d_CodeBlockData as CodeBlockData,
      storesCatalogV3ProductProductsV3_universal_d_TextStyle as TextStyle,
      storesCatalogV3ProductProductsV3_universal_d_TextAlignment as TextAlignment,
      storesCatalogV3ProductProductsV3_universal_d_DividerData as DividerData,
      storesCatalogV3ProductProductsV3_universal_d_LineStyle as LineStyle,
      storesCatalogV3ProductProductsV3_universal_d_Width as Width,
      storesCatalogV3ProductProductsV3_universal_d_Alignment as Alignment,
      storesCatalogV3ProductProductsV3_universal_d_FileData as FileData,
      storesCatalogV3ProductProductsV3_universal_d_ViewMode as ViewMode,
      storesCatalogV3ProductProductsV3_universal_d_FileSource as FileSource,
      storesCatalogV3ProductProductsV3_universal_d_FileSourceDataOneOf as FileSourceDataOneOf,
      storesCatalogV3ProductProductsV3_universal_d_PDFSettings as PDFSettings,
      storesCatalogV3ProductProductsV3_universal_d_GalleryData as GalleryData,
      storesCatalogV3ProductProductsV3_universal_d_V1Media as V1Media,
      storesCatalogV3ProductProductsV3_universal_d_Image as Image,
      storesCatalogV3ProductProductsV3_universal_d_Video as Video,
      storesCatalogV3ProductProductsV3_universal_d_Item as Item,
      storesCatalogV3ProductProductsV3_universal_d_ItemDataOneOf as ItemDataOneOf,
      storesCatalogV3ProductProductsV3_universal_d_GalleryOptions as GalleryOptions,
      storesCatalogV3ProductProductsV3_universal_d_LayoutType as LayoutType,
      storesCatalogV3ProductProductsV3_universal_d_Orientation as Orientation,
      storesCatalogV3ProductProductsV3_universal_d_Crop as Crop,
      storesCatalogV3ProductProductsV3_universal_d_ThumbnailsAlignment as ThumbnailsAlignment,
      storesCatalogV3ProductProductsV3_universal_d_Layout as Layout,
      storesCatalogV3ProductProductsV3_universal_d_ItemStyle as ItemStyle,
      storesCatalogV3ProductProductsV3_universal_d_Thumbnails as Thumbnails,
      storesCatalogV3ProductProductsV3_universal_d_GIFData as GIFData,
      storesCatalogV3ProductProductsV3_universal_d_GIF as GIF,
      storesCatalogV3ProductProductsV3_universal_d_HeadingData as HeadingData,
      storesCatalogV3ProductProductsV3_universal_d_HTMLData as HTMLData,
      storesCatalogV3ProductProductsV3_universal_d_HTMLDataDataOneOf as HTMLDataDataOneOf,
      storesCatalogV3ProductProductsV3_universal_d_Source as Source,
      storesCatalogV3ProductProductsV3_universal_d_ImageData as ImageData,
      storesCatalogV3ProductProductsV3_universal_d_LinkPreviewData as LinkPreviewData,
      storesCatalogV3ProductProductsV3_universal_d_MapData as MapData,
      storesCatalogV3ProductProductsV3_universal_d_MapSettings as MapSettings,
      storesCatalogV3ProductProductsV3_universal_d_MapType as MapType,
      storesCatalogV3ProductProductsV3_universal_d_ParagraphData as ParagraphData,
      storesCatalogV3ProductProductsV3_universal_d_PollData as PollData,
      storesCatalogV3ProductProductsV3_universal_d_ViewRole as ViewRole,
      storesCatalogV3ProductProductsV3_universal_d_VoteRole as VoteRole,
      storesCatalogV3ProductProductsV3_universal_d_Permissions as Permissions,
      storesCatalogV3ProductProductsV3_universal_d_Option as Option,
      storesCatalogV3ProductProductsV3_universal_d_PollSettings as PollSettings,
      storesCatalogV3ProductProductsV3_universal_d_PollLayoutType as PollLayoutType,
      storesCatalogV3ProductProductsV3_universal_d_PollLayoutDirection as PollLayoutDirection,
      storesCatalogV3ProductProductsV3_universal_d_PollLayout as PollLayout,
      storesCatalogV3ProductProductsV3_universal_d_OptionLayout as OptionLayout,
      storesCatalogV3ProductProductsV3_universal_d_BackgroundType as BackgroundType,
      storesCatalogV3ProductProductsV3_universal_d_Gradient as Gradient,
      storesCatalogV3ProductProductsV3_universal_d_Background as Background,
      storesCatalogV3ProductProductsV3_universal_d_BackgroundBackgroundOneOf as BackgroundBackgroundOneOf,
      storesCatalogV3ProductProductsV3_universal_d_PollDesign as PollDesign,
      storesCatalogV3ProductProductsV3_universal_d_OptionDesign as OptionDesign,
      storesCatalogV3ProductProductsV3_universal_d_Poll as Poll,
      storesCatalogV3ProductProductsV3_universal_d_PollDataLayout as PollDataLayout,
      storesCatalogV3ProductProductsV3_universal_d_Design as Design,
      storesCatalogV3ProductProductsV3_universal_d_TextData as TextData,
      storesCatalogV3ProductProductsV3_universal_d_Decoration as Decoration,
      storesCatalogV3ProductProductsV3_universal_d_DecorationDataOneOf as DecorationDataOneOf,
      storesCatalogV3ProductProductsV3_universal_d_DecorationType as DecorationType,
      storesCatalogV3ProductProductsV3_universal_d_AnchorData as AnchorData,
      storesCatalogV3ProductProductsV3_universal_d_ColorData as ColorData,
      storesCatalogV3ProductProductsV3_universal_d_LinkData as LinkData,
      storesCatalogV3ProductProductsV3_universal_d_MentionData as MentionData,
      storesCatalogV3ProductProductsV3_universal_d_FontSizeData as FontSizeData,
      storesCatalogV3ProductProductsV3_universal_d_FontType as FontType,
      storesCatalogV3ProductProductsV3_universal_d_SpoilerData as SpoilerData,
      storesCatalogV3ProductProductsV3_universal_d_AppEmbedData as AppEmbedData,
      storesCatalogV3ProductProductsV3_universal_d_AppEmbedDataAppDataOneOf as AppEmbedDataAppDataOneOf,
      storesCatalogV3ProductProductsV3_universal_d_AppType as AppType,
      storesCatalogV3ProductProductsV3_universal_d_BookingData as BookingData,
      storesCatalogV3ProductProductsV3_universal_d_EventData as EventData,
      storesCatalogV3ProductProductsV3_universal_d_VideoData as VideoData,
      storesCatalogV3ProductProductsV3_universal_d_PlaybackOptions as PlaybackOptions,
      storesCatalogV3ProductProductsV3_universal_d_EmbedData as EmbedData,
      storesCatalogV3ProductProductsV3_universal_d_Oembed as Oembed,
      storesCatalogV3ProductProductsV3_universal_d_CollapsibleListData as CollapsibleListData,
      storesCatalogV3ProductProductsV3_universal_d_InitialExpandedItems as InitialExpandedItems,
      storesCatalogV3ProductProductsV3_universal_d_Direction as Direction,
      storesCatalogV3ProductProductsV3_universal_d_TableData as TableData,
      storesCatalogV3ProductProductsV3_universal_d_Dimensions as Dimensions,
      storesCatalogV3ProductProductsV3_universal_d_TableCellData as TableCellData,
      storesCatalogV3ProductProductsV3_universal_d_VerticalAlignment as VerticalAlignment,
      storesCatalogV3ProductProductsV3_universal_d_CellStyle as CellStyle,
      storesCatalogV3ProductProductsV3_universal_d_BorderColors as BorderColors,
      storesCatalogV3ProductProductsV3_universal_d_NullValue as NullValue,
      storesCatalogV3ProductProductsV3_universal_d_ListValue as ListValue,
      storesCatalogV3ProductProductsV3_universal_d_AudioData as AudioData,
      storesCatalogV3ProductProductsV3_universal_d_OrderedListData as OrderedListData,
      storesCatalogV3ProductProductsV3_universal_d_BulletedListData as BulletedListData,
      storesCatalogV3ProductProductsV3_universal_d_BlockquoteData as BlockquoteData,
      storesCatalogV3ProductProductsV3_universal_d_CaptionData as CaptionData,
      storesCatalogV3ProductProductsV3_universal_d_Metadata as Metadata,
      storesCatalogV3ProductProductsV3_universal_d_DocumentStyle as DocumentStyle,
      storesCatalogV3ProductProductsV3_universal_d_TextNodeStyle as TextNodeStyle,
      storesCatalogV3ProductProductsV3_universal_d_Media as Media,
      storesCatalogV3ProductProductsV3_universal_d_ProductMedia as ProductMedia,
      storesCatalogV3ProductProductsV3_universal_d_ProductMediaSetByOneOf as ProductMediaSetByOneOf,
      storesCatalogV3ProductProductsV3_universal_d_ProductMediaMediaOneOf as ProductMediaMediaOneOf,
      storesCatalogV3ProductProductsV3_universal_d_VideoResolution as VideoResolution,
      storesCatalogV3ProductProductsV3_universal_d_MediaType as MediaType,
      storesCatalogV3ProductProductsV3_universal_d_Thumbnail as Thumbnail,
      storesCatalogV3ProductProductsV3_universal_d_MediaItemsInfo as MediaItemsInfo,
      storesCatalogV3ProductProductsV3_universal_d_SeoSchema as SeoSchema,
      storesCatalogV3ProductProductsV3_universal_d_Keyword as Keyword,
      storesCatalogV3ProductProductsV3_universal_d_Tag as Tag,
      storesCatalogV3ProductProductsV3_universal_d_Settings as Settings,
      storesCatalogV3ProductProductsV3_universal_d_ConnectedOption as ConnectedOption,
      storesCatalogV3ProductProductsV3_universal_d_ConnectedOptionOptionSettingsOneOf as ConnectedOptionOptionSettingsOneOf,
      storesCatalogV3ProductProductsV3_universal_d_ProductOptionRenderType as ProductOptionRenderType,
      storesCatalogV3ProductProductsV3_universal_d_ChoicesSettings as ChoicesSettings,
      storesCatalogV3ProductProductsV3_universal_d_ConnectedOptionChoice as ConnectedOptionChoice,
      storesCatalogV3ProductProductsV3_universal_d_ConnectedOptionChoiceValueOneOf as ConnectedOptionChoiceValueOneOf,
      storesCatalogV3ProductProductsV3_universal_d_ChoiceType as ChoiceType,
      storesCatalogV3ProductProductsV3_universal_d_MultipleColors as MultipleColors,
      storesCatalogV3ProductProductsV3_universal_d_ConnectedModifier as ConnectedModifier,
      storesCatalogV3ProductProductsV3_universal_d_ConnectedModifierModifierSettingsOneOf as ConnectedModifierModifierSettingsOneOf,
      storesCatalogV3ProductProductsV3_universal_d_ModifierRenderType as ModifierRenderType,
      storesCatalogV3ProductProductsV3_universal_d_FreeTextSettings as FreeTextSettings,
      storesCatalogV3ProductProductsV3_universal_d_ModifierChoicesSettings as ModifierChoicesSettings,
      storesCatalogV3ProductProductsV3_universal_d_ConnectedModifierChoice as ConnectedModifierChoice,
      storesCatalogV3ProductProductsV3_universal_d_ConnectedModifierChoiceValueOneOf as ConnectedModifierChoiceValueOneOf,
      storesCatalogV3ProductProductsV3_universal_d_Brand as Brand,
      storesCatalogV3ProductProductsV3_universal_d_InfoSection as InfoSection,
      Ribbon$1 as Ribbon,
      storesCatalogV3ProductProductsV3_universal_d_ProductCategoriesInfo as ProductCategoriesInfo,
      storesCatalogV3ProductProductsV3_universal_d_ProductCategory as ProductCategory,
      storesCatalogV3ProductProductsV3_universal_d_ProductCategoryIdsInfo as ProductCategoryIdsInfo,
      storesCatalogV3ProductProductsV3_universal_d_PriceRange as PriceRange,
      storesCatalogV3ProductProductsV3_universal_d_FixedMonetaryAmount as FixedMonetaryAmount,
      storesCatalogV3ProductProductsV3_universal_d_Inventory as Inventory,
      storesCatalogV3ProductProductsV3_universal_d_InventoryAvailabilityStatus as InventoryAvailabilityStatus,
      storesCatalogV3ProductProductsV3_universal_d_PreorderStatus as PreorderStatus,
      storesCatalogV3ProductProductsV3_universal_d_ProductPreorderAvailability as ProductPreorderAvailability,
      storesCatalogV3ProductProductsV3_universal_d_ProductType as ProductType,
      storesCatalogV3ProductProductsV3_universal_d_PhysicalProperties as PhysicalProperties,
      storesCatalogV3ProductProductsV3_universal_d_PricePerUnitSettings as PricePerUnitSettings,
      storesCatalogV3ProductProductsV3_universal_d_MeasurementUnit as MeasurementUnit,
      storesCatalogV3ProductProductsV3_universal_d_WeightRange as WeightRange,
      storesCatalogV3ProductProductsV3_universal_d_PricePerUnitRange as PricePerUnitRange,
      storesCatalogV3ProductProductsV3_universal_d_PricePerUnitRangePricePerUnit as PricePerUnitRangePricePerUnit,
      storesCatalogV3ProductProductsV3_universal_d_WeightMeasurementUnitInfo as WeightMeasurementUnitInfo,
      storesCatalogV3ProductProductsV3_universal_d_WeightUnit as WeightUnit,
      storesCatalogV3ProductProductsV3_universal_d_BreadcrumbsInfo as BreadcrumbsInfo,
      storesCatalogV3ProductProductsV3_universal_d_BreadCrumb as BreadCrumb,
      storesCatalogV3ProductProductsV3_universal_d_VariantsInfo as VariantsInfo,
      storesCatalogV3ProductProductsV3_universal_d_Variant as Variant,
      storesCatalogV3ProductProductsV3_universal_d_VariantTypedPropertiesOneOf as VariantTypedPropertiesOneOf,
      storesCatalogV3ProductProductsV3_universal_d_OptionChoice as OptionChoice,
      storesCatalogV3ProductProductsV3_universal_d_OptionChoiceIds as OptionChoiceIds,
      storesCatalogV3ProductProductsV3_universal_d_OptionChoiceNames as OptionChoiceNames,
      storesCatalogV3ProductProductsV3_universal_d_PriceInfo as PriceInfo,
      storesCatalogV3ProductProductsV3_universal_d_RevenueDetails as RevenueDetails,
      storesCatalogV3ProductProductsV3_universal_d_VariantPhysicalProperties as VariantPhysicalProperties,
      storesCatalogV3ProductProductsV3_universal_d_PricePerUnit as PricePerUnit,
      storesCatalogV3ProductProductsV3_universal_d_VariantDigitalProperties as VariantDigitalProperties,
      storesCatalogV3ProductProductsV3_universal_d_SecuredMedia as SecuredMedia,
      storesCatalogV3ProductProductsV3_universal_d_FileType as FileType,
      storesCatalogV3ProductProductsV3_universal_d_SubscriptionPricesInfo as SubscriptionPricesInfo,
      storesCatalogV3ProductProductsV3_universal_d_SubscriptionPrice as SubscriptionPrice,
      storesCatalogV3ProductProductsV3_universal_d_SubscriptionPricePerUnit as SubscriptionPricePerUnit,
      storesCatalogV3ProductProductsV3_universal_d_InventoryStatus as InventoryStatus,
      storesCatalogV3ProductProductsV3_universal_d_ExtendedFields as ExtendedFields,
      storesCatalogV3ProductProductsV3_universal_d_SubscriptionDetails as SubscriptionDetails,
      storesCatalogV3ProductProductsV3_universal_d_Subscription as Subscription,
      storesCatalogV3ProductProductsV3_universal_d_SubscriptionCyclesOneOf as SubscriptionCyclesOneOf,
      storesCatalogV3ProductProductsV3_universal_d_SubscriptionFrequency as SubscriptionFrequency,
      storesCatalogV3ProductProductsV3_universal_d_SubscriptionDiscount as SubscriptionDiscount,
      storesCatalogV3ProductProductsV3_universal_d_SubscriptionDiscountDiscountOneOf as SubscriptionDiscountDiscountOneOf,
      storesCatalogV3ProductProductsV3_universal_d_DiscountType as DiscountType,
      storesCatalogV3ProductProductsV3_universal_d_VariantSummary as VariantSummary,
      storesCatalogV3ProductProductsV3_universal_d_MinVariantPriceInfo as MinVariantPriceInfo,
      storesCatalogV3ProductProductsV3_universal_d_UpdateDocumentsEvent as UpdateDocumentsEvent,
      storesCatalogV3ProductProductsV3_universal_d_UpdateDocumentsEventOperationOneOf as UpdateDocumentsEventOperationOneOf,
      storesCatalogV3ProductProductsV3_universal_d_DocumentUpdateOperation as DocumentUpdateOperation,
      storesCatalogV3ProductProductsV3_universal_d_IndexDocument as IndexDocument,
      storesCatalogV3ProductProductsV3_universal_d_DocumentPayload as DocumentPayload,
      storesCatalogV3ProductProductsV3_universal_d_DocumentImage as DocumentImage,
      storesCatalogV3ProductProductsV3_universal_d_Enum as Enum,
      storesCatalogV3ProductProductsV3_universal_d_DeleteByIdsOperation as DeleteByIdsOperation,
      storesCatalogV3ProductProductsV3_universal_d_DeleteByFilterOperation as DeleteByFilterOperation,
      storesCatalogV3ProductProductsV3_universal_d_UpdateByFilterOperation as UpdateByFilterOperation,
      storesCatalogV3ProductProductsV3_universal_d_UpdateExistingOperation as UpdateExistingOperation,
      DomainEvent$3 as DomainEvent,
      DomainEventBodyOneOf$3 as DomainEventBodyOneOf,
      EntityCreatedEvent$3 as EntityCreatedEvent,
      RestoreInfo$3 as RestoreInfo,
      EntityUpdatedEvent$3 as EntityUpdatedEvent,
      EntityDeletedEvent$3 as EntityDeletedEvent,
      ActionEvent$3 as ActionEvent,
      Empty$3 as Empty,
      storesCatalogV3ProductProductsV3_universal_d_SearchIndexingNotification as SearchIndexingNotification,
      State$1 as State,
      MessageEnvelope$3 as MessageEnvelope,
      IdentificationData$3 as IdentificationData,
      IdentificationDataIdOneOf$3 as IdentificationDataIdOneOf,
      WebhookIdentityType$3 as WebhookIdentityType,
      storesCatalogV3ProductProductsV3_universal_d_CreateProductRequest as CreateProductRequest,
      storesCatalogV3ProductProductsV3_universal_d_SingleEntityOpsRequestedFields as SingleEntityOpsRequestedFields,
      storesCatalogV3ProductProductsV3_universal_d_CreateProductResponse as CreateProductResponse,
      storesCatalogV3ProductProductsV3_universal_d_VariantsNotAlignedWithProduct as VariantsNotAlignedWithProduct,
      storesCatalogV3ProductProductsV3_universal_d_VariantNotAlignedWithProduct as VariantNotAlignedWithProduct,
      storesCatalogV3ProductProductsV3_universal_d_CreateProductWithInventoryRequest as CreateProductWithInventoryRequest,
      storesCatalogV3ProductProductsV3_universal_d_ProductWithInventory as ProductWithInventory,
      storesCatalogV3ProductProductsV3_universal_d_ProductWithInventoryTypedPropertiesOneOf as ProductWithInventoryTypedPropertiesOneOf,
      storesCatalogV3ProductProductsV3_universal_d_V3VariantsInfo as V3VariantsInfo,
      storesCatalogV3ProductProductsV3_universal_d_VariantWithInventory as VariantWithInventory,
      storesCatalogV3ProductProductsV3_universal_d_VariantWithInventoryTypedPropertiesOneOf as VariantWithInventoryTypedPropertiesOneOf,
      storesCatalogV3ProductProductsV3_universal_d_InventoryItemComposite as InventoryItemComposite,
      storesCatalogV3ProductProductsV3_universal_d_InventoryItemCompositeTrackingMethodOneOf as InventoryItemCompositeTrackingMethodOneOf,
      storesCatalogV3ProductProductsV3_universal_d_PreorderInfo as PreorderInfo,
      storesCatalogV3ProductProductsV3_universal_d_OptionChoiceReferences as OptionChoiceReferences,
      storesCatalogV3ProductProductsV3_universal_d_V3OptionChoiceIds as V3OptionChoiceIds,
      storesCatalogV3ProductProductsV3_universal_d_V3OptionChoiceNames as V3OptionChoiceNames,
      storesCatalogV3ProductProductsV3_universal_d_CreateProductWithInventoryResponse as CreateProductWithInventoryResponse,
      storesCatalogV3ProductProductsV3_universal_d_BulkInventoryItemResults as BulkInventoryItemResults,
      storesCatalogV3ProductProductsV3_universal_d_BulkInventoryItemResult as BulkInventoryItemResult,
      storesCatalogV3ProductProductsV3_universal_d_CommonItemMetadata as CommonItemMetadata,
      ApplicationError$1 as ApplicationError,
      storesCatalogV3ProductProductsV3_universal_d_InventoryItem as InventoryItem,
      storesCatalogV3ProductProductsV3_universal_d_InventoryItemTrackingMethodOneOf as InventoryItemTrackingMethodOneOf,
      storesCatalogV3ProductProductsV3_universal_d_AvailabilityStatus as AvailabilityStatus,
      storesCatalogV3ProductProductsV3_universal_d_Product as Product,
      storesCatalogV3ProductProductsV3_universal_d_CommonBulkActionMetadata as CommonBulkActionMetadata,
      storesCatalogV3ProductProductsV3_universal_d_UpdateProductRequest as UpdateProductRequest,
      storesCatalogV3ProductProductsV3_universal_d_UpdateProductResponse as UpdateProductResponse,
      storesCatalogV3ProductProductsV3_universal_d_UnsupportedFieldMasks as UnsupportedFieldMasks,
      storesCatalogV3ProductProductsV3_universal_d_UpdateProductWithInventoryRequest as UpdateProductWithInventoryRequest,
      storesCatalogV3ProductProductsV3_universal_d_UpdateProductWithInventoryResponse as UpdateProductWithInventoryResponse,
      storesCatalogV3ProductProductsV3_universal_d_BulkCreateProductsRequest as BulkCreateProductsRequest,
      RequestedFields$1 as RequestedFields,
      storesCatalogV3ProductProductsV3_universal_d_BulkCreateProductsResponse as BulkCreateProductsResponse,
      storesCatalogV3ProductProductsV3_universal_d_CatalogV3BulkProductResult as CatalogV3BulkProductResult,
      storesCatalogV3ProductProductsV3_universal_d_WixCommonItemMetadata as WixCommonItemMetadata,
      storesCatalogV3ProductProductsV3_universal_d_InvalidDigitalFileIds as InvalidDigitalFileIds,
      storesCatalogV3ProductProductsV3_universal_d_BulkCreateProductsWithInventoryRequest as BulkCreateProductsWithInventoryRequest,
      storesCatalogV3ProductProductsV3_universal_d_BulkCreateProductsWithInventoryResponse as BulkCreateProductsWithInventoryResponse,
      storesCatalogV3ProductProductsV3_universal_d_BulkProductResults as BulkProductResults,
      storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsRequest as BulkUpdateProductsRequest,
      storesCatalogV3ProductProductsV3_universal_d_V3MaskedProduct as V3MaskedProduct,
      storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsResponse as BulkUpdateProductsResponse,
      storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsWithInventoryRequest as BulkUpdateProductsWithInventoryRequest,
      storesCatalogV3ProductProductsV3_universal_d_MaskedProductWithInventory as MaskedProductWithInventory,
      storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsWithInventoryResponse as BulkUpdateProductsWithInventoryResponse,
      storesCatalogV3ProductProductsV3_universal_d_V3BulkUpdateProductsByFilterRequest as V3BulkUpdateProductsByFilterRequest,
      storesCatalogV3ProductProductsV3_universal_d_WixCommonSearchDetails as WixCommonSearchDetails,
      storesCatalogV3ProductProductsV3_universal_d_CommonSearchDetailsMode as CommonSearchDetailsMode,
      storesCatalogV3ProductProductsV3_universal_d_V3BulkUpdateProductsByFilterResponse as V3BulkUpdateProductsByFilterResponse,
      storesCatalogV3ProductProductsV3_universal_d_V3UpdateExtendedFieldsRequest as V3UpdateExtendedFieldsRequest,
      storesCatalogV3ProductProductsV3_universal_d_V3UpdateExtendedFieldsResponse as V3UpdateExtendedFieldsResponse,
      storesCatalogV3ProductProductsV3_universal_d_V3DeleteProductRequest as V3DeleteProductRequest,
      storesCatalogV3ProductProductsV3_universal_d_V3DeleteProductResponse as V3DeleteProductResponse,
      storesCatalogV3ProductProductsV3_universal_d_V3BulkDeleteProductsRequest as V3BulkDeleteProductsRequest,
      storesCatalogV3ProductProductsV3_universal_d_V3BulkDeleteProductsResponse as V3BulkDeleteProductsResponse,
      storesCatalogV3ProductProductsV3_universal_d_BulkDeleteProductsResponseBulkProductResult as BulkDeleteProductsResponseBulkProductResult,
      storesCatalogV3ProductProductsV3_universal_d_V3BulkDeleteProductsByFilterRequest as V3BulkDeleteProductsByFilterRequest,
      storesCatalogV3ProductProductsV3_universal_d_V3BulkDeleteProductsByFilterResponse as V3BulkDeleteProductsByFilterResponse,
      storesCatalogV3ProductProductsV3_universal_d_V3GetProductRequest as V3GetProductRequest,
      storesCatalogV3ProductProductsV3_universal_d_V3GetProductResponse as V3GetProductResponse,
      storesCatalogV3ProductProductsV3_universal_d_V3GetProductBySlugRequest as V3GetProductBySlugRequest,
      storesCatalogV3ProductProductsV3_universal_d_V3GetProductBySlugResponse as V3GetProductBySlugResponse,
      storesCatalogV3ProductProductsV3_universal_d_V3SearchProductsRequest as V3SearchProductsRequest,
      storesCatalogV3ProductProductsV3_universal_d_CommonCursorSearch as CommonCursorSearch,
      storesCatalogV3ProductProductsV3_universal_d_CommonCursorSearchPagingMethodOneOf as CommonCursorSearchPagingMethodOneOf,
      storesCatalogV3ProductProductsV3_universal_d_WixCommonSorting as WixCommonSorting,
      storesCatalogV3ProductProductsV3_universal_d_WixCommonSortOrder as WixCommonSortOrder,
      storesCatalogV3ProductProductsV3_universal_d_WixCommonAggregation as WixCommonAggregation,
      storesCatalogV3ProductProductsV3_universal_d_WixCommonAggregationKindOneOf as WixCommonAggregationKindOneOf,
      storesCatalogV3ProductProductsV3_universal_d_AggregationRangeAggregationRangeBucket as AggregationRangeAggregationRangeBucket,
      storesCatalogV3ProductProductsV3_universal_d_AggregationValueAggregationSortType as AggregationValueAggregationSortType,
      storesCatalogV3ProductProductsV3_universal_d_AggregationValueAggregationSortDirection as AggregationValueAggregationSortDirection,
      storesCatalogV3ProductProductsV3_universal_d_AggregationValueAggregationMissingValues as AggregationValueAggregationMissingValues,
      storesCatalogV3ProductProductsV3_universal_d_AggregationValueAggregationIncludeMissingValuesOptions as AggregationValueAggregationIncludeMissingValuesOptions,
      storesCatalogV3ProductProductsV3_universal_d_WixCommonScalarType as WixCommonScalarType,
      storesCatalogV3ProductProductsV3_universal_d_CommonAggregationValueAggregation as CommonAggregationValueAggregation,
      storesCatalogV3ProductProductsV3_universal_d_CommonAggregationValueAggregationOptionsOneOf as CommonAggregationValueAggregationOptionsOneOf,
      storesCatalogV3ProductProductsV3_universal_d_AggregationNestedAggregationNestedAggregationType as AggregationNestedAggregationNestedAggregationType,
      storesCatalogV3ProductProductsV3_universal_d_CommonAggregationRangeAggregation as CommonAggregationRangeAggregation,
      storesCatalogV3ProductProductsV3_universal_d_CommonAggregationScalarAggregation as CommonAggregationScalarAggregation,
      storesCatalogV3ProductProductsV3_universal_d_CommonAggregationDateHistogramAggregation as CommonAggregationDateHistogramAggregation,
      storesCatalogV3ProductProductsV3_universal_d_AggregationDateHistogramAggregationInterval as AggregationDateHistogramAggregationInterval,
      storesCatalogV3ProductProductsV3_universal_d_AggregationNestedAggregationNestedAggregationItem as AggregationNestedAggregationNestedAggregationItem,
      storesCatalogV3ProductProductsV3_universal_d_AggregationNestedAggregationNestedAggregationItemKindOneOf as AggregationNestedAggregationNestedAggregationItemKindOneOf,
      storesCatalogV3ProductProductsV3_universal_d_WixCommonAggregationType as WixCommonAggregationType,
      storesCatalogV3ProductProductsV3_universal_d_CommonAggregationNestedAggregation as CommonAggregationNestedAggregation,
      storesCatalogV3ProductProductsV3_universal_d_CommonCursorPaging as CommonCursorPaging,
      storesCatalogV3ProductProductsV3_universal_d_V3SearchProductsResponse as V3SearchProductsResponse,
      storesCatalogV3ProductProductsV3_universal_d_CommonCursorPagingMetadata as CommonCursorPagingMetadata,
      storesCatalogV3ProductProductsV3_universal_d_CommonCursors as CommonCursors,
      storesCatalogV3ProductProductsV3_universal_d_CommonAggregationData as CommonAggregationData,
      storesCatalogV3ProductProductsV3_universal_d_ValueResultsValueAggregationResult as ValueResultsValueAggregationResult,
      storesCatalogV3ProductProductsV3_universal_d_RangeResultsRangeAggregationResult as RangeResultsRangeAggregationResult,
      storesCatalogV3ProductProductsV3_universal_d_AggregationResultsNestedAggregationResults as AggregationResultsNestedAggregationResults,
      storesCatalogV3ProductProductsV3_universal_d_AggregationResultsNestedAggregationResultsResultOneOf as AggregationResultsNestedAggregationResultsResultOneOf,
      storesCatalogV3ProductProductsV3_universal_d_AggregationResultsValueResults as AggregationResultsValueResults,
      storesCatalogV3ProductProductsV3_universal_d_AggregationResultsRangeResults as AggregationResultsRangeResults,
      storesCatalogV3ProductProductsV3_universal_d_AggregationDataAggregationResultsScalarResult as AggregationDataAggregationResultsScalarResult,
      storesCatalogV3ProductProductsV3_universal_d_GroupByValueResultsNestedValueAggregationResult as GroupByValueResultsNestedValueAggregationResult,
      storesCatalogV3ProductProductsV3_universal_d_NestedResultsValueResult as NestedResultsValueResult,
      storesCatalogV3ProductProductsV3_universal_d_NestedResultsRangeResult as NestedResultsRangeResult,
      storesCatalogV3ProductProductsV3_universal_d_NestedResultsScalarResult as NestedResultsScalarResult,
      storesCatalogV3ProductProductsV3_universal_d_NestedResultsNestedResultValue as NestedResultsNestedResultValue,
      storesCatalogV3ProductProductsV3_universal_d_NestedResultsNestedResultValueResultOneOf as NestedResultsNestedResultValueResultOneOf,
      storesCatalogV3ProductProductsV3_universal_d_NestedResultsResults as NestedResultsResults,
      storesCatalogV3ProductProductsV3_universal_d_DateHistogramResultsDateHistogramResult as DateHistogramResultsDateHistogramResult,
      storesCatalogV3ProductProductsV3_universal_d_AggregationResultsGroupByValueResults as AggregationResultsGroupByValueResults,
      storesCatalogV3ProductProductsV3_universal_d_AggregationResultsDateHistogramResults as AggregationResultsDateHistogramResults,
      storesCatalogV3ProductProductsV3_universal_d_AggregationResultsNestedResults as AggregationResultsNestedResults,
      storesCatalogV3ProductProductsV3_universal_d_AggregationDataAggregationResults as AggregationDataAggregationResults,
      storesCatalogV3ProductProductsV3_universal_d_AggregationDataAggregationResultsResultOneOf as AggregationDataAggregationResultsResultOneOf,
      storesCatalogV3ProductProductsV3_universal_d_V3QueryProductsRequest as V3QueryProductsRequest,
      storesCatalogV3ProductProductsV3_universal_d_CommonCursorQuery as CommonCursorQuery,
      storesCatalogV3ProductProductsV3_universal_d_CommonCursorQueryPagingMethodOneOf as CommonCursorQueryPagingMethodOneOf,
      storesCatalogV3ProductProductsV3_universal_d_V3QueryProductsResponse as V3QueryProductsResponse,
      storesCatalogV3ProductProductsV3_universal_d_V3CountProductsRequest as V3CountProductsRequest,
      storesCatalogV3ProductProductsV3_universal_d_V3CountProductsResponse as V3CountProductsResponse,
      storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductVariantsByFilterRequest as BulkUpdateProductVariantsByFilterRequest,
      storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductVariantsByFilterResponse as BulkUpdateProductVariantsByFilterResponse,
      storesCatalogV3ProductProductsV3_universal_d_BulkAdjustProductVariantsByFilterRequest as BulkAdjustProductVariantsByFilterRequest,
      storesCatalogV3ProductProductsV3_universal_d_V3AdjustValue as V3AdjustValue,
      storesCatalogV3ProductProductsV3_universal_d_V3AdjustValueAdjustValueOneOf as V3AdjustValueAdjustValueOneOf,
      storesCatalogV3ProductProductsV3_universal_d_V3UnsignedAdjustValue as V3UnsignedAdjustValue,
      storesCatalogV3ProductProductsV3_universal_d_V3UnsignedAdjustValueAdjustValueOneOf as V3UnsignedAdjustValueAdjustValueOneOf,
      storesCatalogV3ProductProductsV3_universal_d_BulkAdjustProductVariantsByFilterRequestRoundingStrategy as BulkAdjustProductVariantsByFilterRequestRoundingStrategy,
      storesCatalogV3ProductProductsV3_universal_d_BulkAdjustProductVariantsByFilterResponse as BulkAdjustProductVariantsByFilterResponse,
      storesCatalogV3ProductProductsV3_universal_d_V3BulkAddInfoSectionsToProductsByFilterRequest as V3BulkAddInfoSectionsToProductsByFilterRequest,
      storesCatalogV3ProductProductsV3_universal_d_V3BulkAddInfoSectionsToProductsByFilterResponse as V3BulkAddInfoSectionsToProductsByFilterResponse,
      storesCatalogV3ProductProductsV3_universal_d_V3BulkAddInfoSectionsToProductsRequest as V3BulkAddInfoSectionsToProductsRequest,
      storesCatalogV3ProductProductsV3_universal_d_V3ProductIdWithRevision as V3ProductIdWithRevision,
      storesCatalogV3ProductProductsV3_universal_d_V3BulkAddInfoSectionsToProductsResponse as V3BulkAddInfoSectionsToProductsResponse,
      storesCatalogV3ProductProductsV3_universal_d_V3BulkRemoveInfoSectionsFromProductsByFilterRequest as V3BulkRemoveInfoSectionsFromProductsByFilterRequest,
      storesCatalogV3ProductProductsV3_universal_d_V3BulkRemoveInfoSectionsFromProductsByFilterResponse as V3BulkRemoveInfoSectionsFromProductsByFilterResponse,
      storesCatalogV3ProductProductsV3_universal_d_V3BulkRemoveInfoSectionsFromProductsRequest as V3BulkRemoveInfoSectionsFromProductsRequest,
      storesCatalogV3ProductProductsV3_universal_d_V3BulkRemoveInfoSectionsFromProductsResponse as V3BulkRemoveInfoSectionsFromProductsResponse,
      storesCatalogV3ProductProductsV3_universal_d_BulkAddProductsToCategoriesByFilterRequest as BulkAddProductsToCategoriesByFilterRequest,
      storesCatalogV3ProductProductsV3_universal_d_BulkAddProductsToCategoriesByFilterResponse as BulkAddProductsToCategoriesByFilterResponse,
      storesCatalogV3ProductProductsV3_universal_d_BulkRemoveProductsFromCategoriesByFilterRequest as BulkRemoveProductsFromCategoriesByFilterRequest,
      storesCatalogV3ProductProductsV3_universal_d_BulkRemoveProductsFromCategoriesByFilterResponse as BulkRemoveProductsFromCategoriesByFilterResponse,
      InvalidateCache$2 as InvalidateCache,
      InvalidateCacheGetByOneOf$2 as InvalidateCacheGetByOneOf,
      App$2 as App,
      Page$2 as Page,
      URI$2 as URI,
      File$2 as File,
      storesCatalogV3ProductProductsV3_universal_d_DoNotCallCreateProductRequest as DoNotCallCreateProductRequest,
      storesCatalogV3ProductProductsV3_universal_d_DoNotCallCreateProductResponse as DoNotCallCreateProductResponse,
      storesCatalogV3ProductProductsV3_universal_d_GetProductRequest as GetProductRequest,
      storesCatalogV3ProductProductsV3_universal_d_GetProductResponse as GetProductResponse,
      storesCatalogV3ProductProductsV3_universal_d_GetProductBySlugRequest as GetProductBySlugRequest,
      storesCatalogV3ProductProductsV3_universal_d_GetProductBySlugResponse as GetProductBySlugResponse,
      storesCatalogV3ProductProductsV3_universal_d_DoNotCallUpdateProductRequest as DoNotCallUpdateProductRequest,
      storesCatalogV3ProductProductsV3_universal_d_DoNotCallUpdateProductResponse as DoNotCallUpdateProductResponse,
      storesCatalogV3ProductProductsV3_universal_d_VariantsRemoved as VariantsRemoved,
      storesCatalogV3ProductProductsV3_universal_d_DeleteProductRequest as DeleteProductRequest,
      storesCatalogV3ProductProductsV3_universal_d_DeleteProductResponse as DeleteProductResponse,
      storesCatalogV3ProductProductsV3_universal_d_SearchProductsRequest as SearchProductsRequest,
      storesCatalogV3ProductProductsV3_universal_d_CursorSearch as CursorSearch,
      storesCatalogV3ProductProductsV3_universal_d_CursorSearchPagingMethodOneOf as CursorSearchPagingMethodOneOf,
      Sorting$2 as Sorting,
      SortOrder$2 as SortOrder,
      storesCatalogV3ProductProductsV3_universal_d_Aggregation as Aggregation,
      storesCatalogV3ProductProductsV3_universal_d_AggregationKindOneOf as AggregationKindOneOf,
      storesCatalogV3ProductProductsV3_universal_d_RangeBucket as RangeBucket,
      storesCatalogV3ProductProductsV3_universal_d_SortType as SortType,
      storesCatalogV3ProductProductsV3_universal_d_SortDirection as SortDirection,
      storesCatalogV3ProductProductsV3_universal_d_MissingValues as MissingValues,
      storesCatalogV3ProductProductsV3_universal_d_IncludeMissingValuesOptions as IncludeMissingValuesOptions,
      storesCatalogV3ProductProductsV3_universal_d_ScalarType as ScalarType,
      storesCatalogV3ProductProductsV3_universal_d_ValueAggregation as ValueAggregation,
      storesCatalogV3ProductProductsV3_universal_d_ValueAggregationOptionsOneOf as ValueAggregationOptionsOneOf,
      storesCatalogV3ProductProductsV3_universal_d_NestedAggregationType as NestedAggregationType,
      storesCatalogV3ProductProductsV3_universal_d_RangeAggregation as RangeAggregation,
      storesCatalogV3ProductProductsV3_universal_d_ScalarAggregation as ScalarAggregation,
      storesCatalogV3ProductProductsV3_universal_d_DateHistogramAggregation as DateHistogramAggregation,
      storesCatalogV3ProductProductsV3_universal_d_Interval as Interval,
      storesCatalogV3ProductProductsV3_universal_d_NestedAggregationItem as NestedAggregationItem,
      storesCatalogV3ProductProductsV3_universal_d_NestedAggregationItemKindOneOf as NestedAggregationItemKindOneOf,
      storesCatalogV3ProductProductsV3_universal_d_AggregationType as AggregationType,
      storesCatalogV3ProductProductsV3_universal_d_NestedAggregation as NestedAggregation,
      storesCatalogV3ProductProductsV3_universal_d_SearchDetails as SearchDetails,
      storesCatalogV3ProductProductsV3_universal_d_Mode as Mode,
      CursorPaging$2 as CursorPaging,
      storesCatalogV3ProductProductsV3_universal_d_SearchProductsResponse as SearchProductsResponse,
      CursorPagingMetadata$2 as CursorPagingMetadata,
      Cursors$2 as Cursors,
      storesCatalogV3ProductProductsV3_universal_d_AggregationData as AggregationData,
      storesCatalogV3ProductProductsV3_universal_d_ValueAggregationResult as ValueAggregationResult,
      storesCatalogV3ProductProductsV3_universal_d_RangeAggregationResult as RangeAggregationResult,
      storesCatalogV3ProductProductsV3_universal_d_NestedAggregationResults as NestedAggregationResults,
      storesCatalogV3ProductProductsV3_universal_d_NestedAggregationResultsResultOneOf as NestedAggregationResultsResultOneOf,
      storesCatalogV3ProductProductsV3_universal_d_ValueResults as ValueResults,
      storesCatalogV3ProductProductsV3_universal_d_RangeResults as RangeResults,
      storesCatalogV3ProductProductsV3_universal_d_AggregationResultsScalarResult as AggregationResultsScalarResult,
      storesCatalogV3ProductProductsV3_universal_d_NestedValueAggregationResult as NestedValueAggregationResult,
      storesCatalogV3ProductProductsV3_universal_d_ValueResult as ValueResult,
      storesCatalogV3ProductProductsV3_universal_d_RangeResult as RangeResult,
      storesCatalogV3ProductProductsV3_universal_d_ScalarResult as ScalarResult,
      storesCatalogV3ProductProductsV3_universal_d_NestedResultValue as NestedResultValue,
      storesCatalogV3ProductProductsV3_universal_d_NestedResultValueResultOneOf as NestedResultValueResultOneOf,
      storesCatalogV3ProductProductsV3_universal_d_Results as Results,
      storesCatalogV3ProductProductsV3_universal_d_DateHistogramResult as DateHistogramResult,
      storesCatalogV3ProductProductsV3_universal_d_GroupByValueResults as GroupByValueResults,
      storesCatalogV3ProductProductsV3_universal_d_DateHistogramResults as DateHistogramResults,
      storesCatalogV3ProductProductsV3_universal_d_NestedResults as NestedResults,
      storesCatalogV3ProductProductsV3_universal_d_AggregationResults as AggregationResults,
      storesCatalogV3ProductProductsV3_universal_d_AggregationResultsResultOneOf as AggregationResultsResultOneOf,
      storesCatalogV3ProductProductsV3_universal_d_SearchRelatedProductsRequest as SearchRelatedProductsRequest,
      storesCatalogV3ProductProductsV3_universal_d_SearchRelated as SearchRelated,
      storesCatalogV3ProductProductsV3_universal_d_SearchRelatedDetails as SearchRelatedDetails,
      storesCatalogV3ProductProductsV3_universal_d_SearchRelatedProductsResponse as SearchRelatedProductsResponse,
      storesCatalogV3ProductProductsV3_universal_d_EventuallyConsistentQueryProductsRequest as EventuallyConsistentQueryProductsRequest,
      CursorQuery$2 as CursorQuery,
      CursorQueryPagingMethodOneOf$2 as CursorQueryPagingMethodOneOf,
      storesCatalogV3ProductProductsV3_universal_d_EventuallyConsistentQueryProductsResponse as EventuallyConsistentQueryProductsResponse,
      storesCatalogV3ProductProductsV3_universal_d_QueryProductsRequest as QueryProductsRequest,
      storesCatalogV3ProductProductsV3_universal_d_QueryProductsResponse as QueryProductsResponse,
      storesCatalogV3ProductProductsV3_universal_d_DeprecatedSearchProductsWithOffsetRequest as DeprecatedSearchProductsWithOffsetRequest,
      storesCatalogV3ProductProductsV3_universal_d_PlatformOffsetSearch as PlatformOffsetSearch,
      storesCatalogV3ProductProductsV3_universal_d_PlatformOffsetSearchPagingMethodOneOf as PlatformOffsetSearchPagingMethodOneOf,
      storesCatalogV3ProductProductsV3_universal_d_CommonSorting as CommonSorting,
      storesCatalogV3ProductProductsV3_universal_d_CommonSortOrder as CommonSortOrder,
      storesCatalogV3ProductProductsV3_universal_d_CommonAggregation as CommonAggregation,
      storesCatalogV3ProductProductsV3_universal_d_CommonAggregationKindOneOf as CommonAggregationKindOneOf,
      storesCatalogV3ProductProductsV3_universal_d_RangeAggregationRangeBucket as RangeAggregationRangeBucket,
      storesCatalogV3ProductProductsV3_universal_d_ValueAggregationSortType as ValueAggregationSortType,
      storesCatalogV3ProductProductsV3_universal_d_ValueAggregationSortDirection as ValueAggregationSortDirection,
      storesCatalogV3ProductProductsV3_universal_d_ValueAggregationMissingValues as ValueAggregationMissingValues,
      storesCatalogV3ProductProductsV3_universal_d_ValueAggregationIncludeMissingValuesOptions as ValueAggregationIncludeMissingValuesOptions,
      storesCatalogV3ProductProductsV3_universal_d_CommonScalarType as CommonScalarType,
      storesCatalogV3ProductProductsV3_universal_d_AggregationValueAggregation as AggregationValueAggregation,
      storesCatalogV3ProductProductsV3_universal_d_AggregationValueAggregationOptionsOneOf as AggregationValueAggregationOptionsOneOf,
      storesCatalogV3ProductProductsV3_universal_d_NestedAggregationNestedAggregationType as NestedAggregationNestedAggregationType,
      storesCatalogV3ProductProductsV3_universal_d_AggregationRangeAggregation as AggregationRangeAggregation,
      storesCatalogV3ProductProductsV3_universal_d_AggregationScalarAggregation as AggregationScalarAggregation,
      storesCatalogV3ProductProductsV3_universal_d_AggregationDateHistogramAggregation as AggregationDateHistogramAggregation,
      storesCatalogV3ProductProductsV3_universal_d_DateHistogramAggregationInterval as DateHistogramAggregationInterval,
      storesCatalogV3ProductProductsV3_universal_d_NestedAggregationNestedAggregationItem as NestedAggregationNestedAggregationItem,
      storesCatalogV3ProductProductsV3_universal_d_NestedAggregationNestedAggregationItemKindOneOf as NestedAggregationNestedAggregationItemKindOneOf,
      storesCatalogV3ProductProductsV3_universal_d_CommonAggregationType as CommonAggregationType,
      storesCatalogV3ProductProductsV3_universal_d_AggregationNestedAggregation as AggregationNestedAggregation,
      storesCatalogV3ProductProductsV3_universal_d_GroupByAggregation as GroupByAggregation,
      storesCatalogV3ProductProductsV3_universal_d_GroupByAggregationKindOneOf as GroupByAggregationKindOneOf,
      storesCatalogV3ProductProductsV3_universal_d_CommonSearchDetails as CommonSearchDetails,
      storesCatalogV3ProductProductsV3_universal_d_SearchDetailsMode as SearchDetailsMode,
      storesCatalogV3ProductProductsV3_universal_d_PlatformPaging as PlatformPaging,
      storesCatalogV3ProductProductsV3_universal_d_DeprecatedSearchProductsWithOffsetResponse as DeprecatedSearchProductsWithOffsetResponse,
      storesCatalogV3ProductProductsV3_universal_d_PagingMetadata as PagingMetadata,
      storesCatalogV3ProductProductsV3_universal_d_RetrieveVariantsRequest as RetrieveVariantsRequest,
      storesCatalogV3ProductProductsV3_universal_d_ProductVariantIds as ProductVariantIds,
      storesCatalogV3ProductProductsV3_universal_d_VariantsCursorPaging as VariantsCursorPaging,
      storesCatalogV3ProductProductsV3_universal_d_VariantsOpsRequestedFields as VariantsOpsRequestedFields,
      storesCatalogV3ProductProductsV3_universal_d_RetrieveVariantsResponse as RetrieveVariantsResponse,
      storesCatalogV3ProductProductsV3_universal_d_ProductVariants as ProductVariants,
      storesCatalogV3ProductProductsV3_universal_d_CountProductsRequest as CountProductsRequest,
      storesCatalogV3ProductProductsV3_universal_d_CountProductsResponse as CountProductsResponse,
      storesCatalogV3ProductProductsV3_universal_d_DoNotCallBulkCreateProductsRequest as DoNotCallBulkCreateProductsRequest,
      storesCatalogV3ProductProductsV3_universal_d_DoNotCallBulkCreateProductsResponse as DoNotCallBulkCreateProductsResponse,
      storesCatalogV3ProductProductsV3_universal_d_V3BulkProductResult as V3BulkProductResult,
      ItemMetadata$1 as ItemMetadata,
      BulkActionMetadata$1 as BulkActionMetadata,
      storesCatalogV3ProductProductsV3_universal_d_DoNotCallBulkUpdateProductsRequest as DoNotCallBulkUpdateProductsRequest,
      storesCatalogV3ProductProductsV3_universal_d_MaskedProduct as MaskedProduct,
      storesCatalogV3ProductProductsV3_universal_d_DoNotCallBulkUpdateProductsResponse as DoNotCallBulkUpdateProductsResponse,
      storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsByFilterRequest as BulkUpdateProductsByFilterRequest,
      storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsByFilterResponse as BulkUpdateProductsByFilterResponse,
      storesCatalogV3ProductProductsV3_universal_d_BulkDeleteProductsRequest as BulkDeleteProductsRequest,
      storesCatalogV3ProductProductsV3_universal_d_BulkDeleteProductsResponse as BulkDeleteProductsResponse,
      storesCatalogV3ProductProductsV3_universal_d_BulkProductResult as BulkProductResult,
      storesCatalogV3ProductProductsV3_universal_d_BulkDeleteProductsByFilterRequest as BulkDeleteProductsByFilterRequest,
      storesCatalogV3ProductProductsV3_universal_d_BulkDeleteProductsByFilterResponse as BulkDeleteProductsByFilterResponse,
      storesCatalogV3ProductProductsV3_universal_d_UpdateExtendedFieldsRequest as UpdateExtendedFieldsRequest,
      storesCatalogV3ProductProductsV3_universal_d_UpdateExtendedFieldsResponse as UpdateExtendedFieldsResponse,
      storesCatalogV3ProductProductsV3_universal_d_BulkAddInfoSectionsToProductsByFilterRequest as BulkAddInfoSectionsToProductsByFilterRequest,
      storesCatalogV3ProductProductsV3_universal_d_BulkAddInfoSectionsToProductsByFilterResponse as BulkAddInfoSectionsToProductsByFilterResponse,
      storesCatalogV3ProductProductsV3_universal_d_FulfillerDeleted as FulfillerDeleted,
      storesCatalogV3ProductProductsV3_universal_d_BulkAddInfoSectionsToProductsRequest as BulkAddInfoSectionsToProductsRequest,
      storesCatalogV3ProductProductsV3_universal_d_ProductIdWithRevision as ProductIdWithRevision,
      storesCatalogV3ProductProductsV3_universal_d_BulkAddInfoSectionsToProductsResponse as BulkAddInfoSectionsToProductsResponse,
      storesCatalogV3ProductProductsV3_universal_d_BulkRemoveInfoSectionsFromProductsByFilterRequest as BulkRemoveInfoSectionsFromProductsByFilterRequest,
      storesCatalogV3ProductProductsV3_universal_d_BulkRemoveInfoSectionsFromProductsByFilterResponse as BulkRemoveInfoSectionsFromProductsByFilterResponse,
      storesCatalogV3ProductProductsV3_universal_d_BulkRemoveInfoSectionsFromProductsRequest as BulkRemoveInfoSectionsFromProductsRequest,
      storesCatalogV3ProductProductsV3_universal_d_BulkRemoveInfoSectionsFromProductsResponse as BulkRemoveInfoSectionsFromProductsResponse,
      storesCatalogV3ProductProductsV3_universal_d_BulkUpdateVariantsByFilterRequest as BulkUpdateVariantsByFilterRequest,
      storesCatalogV3ProductProductsV3_universal_d_BulkUpdateVariantsByFilterResponse as BulkUpdateVariantsByFilterResponse,
      storesCatalogV3ProductProductsV3_universal_d_V3BulkAdjustProductVariantsByFilterRequest as V3BulkAdjustProductVariantsByFilterRequest,
      storesCatalogV3ProductProductsV3_universal_d_AdjustValue as AdjustValue,
      storesCatalogV3ProductProductsV3_universal_d_AdjustValueAdjustValueOneOf as AdjustValueAdjustValueOneOf,
      storesCatalogV3ProductProductsV3_universal_d_UnsignedAdjustValue as UnsignedAdjustValue,
      storesCatalogV3ProductProductsV3_universal_d_UnsignedAdjustValueAdjustValueOneOf as UnsignedAdjustValueAdjustValueOneOf,
      storesCatalogV3ProductProductsV3_universal_d_RoundingStrategy as RoundingStrategy,
      storesCatalogV3ProductProductsV3_universal_d_V3BulkAdjustProductVariantsByFilterResponse as V3BulkAdjustProductVariantsByFilterResponse,
      storesCatalogV3ProductProductsV3_universal_d_BulkInventoryItemAction as BulkInventoryItemAction,
      storesCatalogV3ProductProductsV3_universal_d_createProduct as createProduct,
      storesCatalogV3ProductProductsV3_universal_d_CreateProductOptions as CreateProductOptions,
      storesCatalogV3ProductProductsV3_universal_d_createProductWithInventory as createProductWithInventory,
      storesCatalogV3ProductProductsV3_universal_d_CreateProductWithInventoryOptions as CreateProductWithInventoryOptions,
      storesCatalogV3ProductProductsV3_universal_d_updateProduct as updateProduct,
      storesCatalogV3ProductProductsV3_universal_d_UpdateProduct as UpdateProduct,
      storesCatalogV3ProductProductsV3_universal_d_UpdateProductOptions as UpdateProductOptions,
      storesCatalogV3ProductProductsV3_universal_d_updateProductWithInventory as updateProductWithInventory,
      storesCatalogV3ProductProductsV3_universal_d_UpdateProductWithInventoryProduct as UpdateProductWithInventoryProduct,
      storesCatalogV3ProductProductsV3_universal_d_UpdateProductWithInventoryOptions as UpdateProductWithInventoryOptions,
      storesCatalogV3ProductProductsV3_universal_d_bulkCreateProducts as bulkCreateProducts,
      storesCatalogV3ProductProductsV3_universal_d_BulkCreateProductsOptions as BulkCreateProductsOptions,
      storesCatalogV3ProductProductsV3_universal_d_bulkCreateProductsWithInventory as bulkCreateProductsWithInventory,
      storesCatalogV3ProductProductsV3_universal_d_BulkCreateProductsWithInventoryOptions as BulkCreateProductsWithInventoryOptions,
      storesCatalogV3ProductProductsV3_universal_d_bulkUpdateProducts as bulkUpdateProducts,
      storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsOptions as BulkUpdateProductsOptions,
      storesCatalogV3ProductProductsV3_universal_d_bulkUpdateProductsWithInventory as bulkUpdateProductsWithInventory,
      storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsWithInventoryOptions as BulkUpdateProductsWithInventoryOptions,
      storesCatalogV3ProductProductsV3_universal_d_bulkUpdateProductsByFilter as bulkUpdateProductsByFilter,
      storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductsByFilterOptions as BulkUpdateProductsByFilterOptions,
      storesCatalogV3ProductProductsV3_universal_d_updateExtendedFields as updateExtendedFields,
      storesCatalogV3ProductProductsV3_universal_d_UpdateExtendedFieldsOptions as UpdateExtendedFieldsOptions,
      storesCatalogV3ProductProductsV3_universal_d_deleteProduct as deleteProduct,
      storesCatalogV3ProductProductsV3_universal_d_bulkDeleteProducts as bulkDeleteProducts,
      storesCatalogV3ProductProductsV3_universal_d_bulkDeleteProductsByFilter as bulkDeleteProductsByFilter,
      storesCatalogV3ProductProductsV3_universal_d_BulkDeleteProductsByFilterOptions as BulkDeleteProductsByFilterOptions,
      storesCatalogV3ProductProductsV3_universal_d_getProduct as getProduct,
      storesCatalogV3ProductProductsV3_universal_d_GetProductOptions as GetProductOptions,
      storesCatalogV3ProductProductsV3_universal_d_getProductBySlug as getProductBySlug,
      storesCatalogV3ProductProductsV3_universal_d_GetProductBySlugOptions as GetProductBySlugOptions,
      storesCatalogV3ProductProductsV3_universal_d_searchProducts as searchProducts,
      storesCatalogV3ProductProductsV3_universal_d_SearchProductsOptions as SearchProductsOptions,
      storesCatalogV3ProductProductsV3_universal_d_queryProducts as queryProducts,
      storesCatalogV3ProductProductsV3_universal_d_QueryProductsOptions as QueryProductsOptions,
      storesCatalogV3ProductProductsV3_universal_d_ProductsQueryResult as ProductsQueryResult,
      storesCatalogV3ProductProductsV3_universal_d_ProductsQueryBuilder as ProductsQueryBuilder,
      storesCatalogV3ProductProductsV3_universal_d_countProducts as countProducts,
      storesCatalogV3ProductProductsV3_universal_d_CountProductsOptions as CountProductsOptions,
      storesCatalogV3ProductProductsV3_universal_d_bulkUpdateProductVariantsByFilter as bulkUpdateProductVariantsByFilter,
      storesCatalogV3ProductProductsV3_universal_d_BulkUpdateProductVariantsByFilterOptions as BulkUpdateProductVariantsByFilterOptions,
      storesCatalogV3ProductProductsV3_universal_d_bulkAdjustProductVariantsByFilter as bulkAdjustProductVariantsByFilter,
      storesCatalogV3ProductProductsV3_universal_d_BulkAdjustProductVariantsByFilterOptions as BulkAdjustProductVariantsByFilterOptions,
      storesCatalogV3ProductProductsV3_universal_d_bulkAddInfoSectionsToProductsByFilter as bulkAddInfoSectionsToProductsByFilter,
      storesCatalogV3ProductProductsV3_universal_d_BulkAddInfoSectionsToProductsByFilterOptions as BulkAddInfoSectionsToProductsByFilterOptions,
      storesCatalogV3ProductProductsV3_universal_d_bulkAddInfoSectionsToProducts as bulkAddInfoSectionsToProducts,
      storesCatalogV3ProductProductsV3_universal_d_BulkAddInfoSectionsToProductsOptions as BulkAddInfoSectionsToProductsOptions,
      storesCatalogV3ProductProductsV3_universal_d_bulkRemoveInfoSectionsFromProductsByFilter as bulkRemoveInfoSectionsFromProductsByFilter,
      storesCatalogV3ProductProductsV3_universal_d_BulkRemoveInfoSectionsFromProductsByFilterOptions as BulkRemoveInfoSectionsFromProductsByFilterOptions,
      storesCatalogV3ProductProductsV3_universal_d_bulkRemoveInfoSectionsFromProducts as bulkRemoveInfoSectionsFromProducts,
      storesCatalogV3ProductProductsV3_universal_d_BulkRemoveInfoSectionsFromProductsOptions as BulkRemoveInfoSectionsFromProductsOptions,
      storesCatalogV3ProductProductsV3_universal_d_bulkAddProductsToCategoriesByFilter as bulkAddProductsToCategoriesByFilter,
      storesCatalogV3ProductProductsV3_universal_d_BulkAddProductsToCategoriesByFilterOptions as BulkAddProductsToCategoriesByFilterOptions,
      storesCatalogV3ProductProductsV3_universal_d_bulkRemoveProductsFromCategoriesByFilter as bulkRemoveProductsFromCategoriesByFilter,
      storesCatalogV3ProductProductsV3_universal_d_BulkRemoveProductsFromCategoriesByFilterOptions as BulkRemoveProductsFromCategoriesByFilterOptions,
    };
  }
  
  interface Provision {
      /**
       * Provision ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the Provision is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the Provision.
       * Ignored when creating a Provision.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the Provision was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the Provision was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Version of the catalog this store was provisioned on. DO NOT USE unless part of the install flow */
      catalogVersion?: Version;
  }
  enum Version {
      /** Version 1 of the catalog. */
      V1_CATALOG = "V1_CATALOG",
      /** Version 3 of the catalog. */
      V3_CATALOG = "V3_CATALOG"
  }
  interface DefaultDeliveryProfileSetup {
      /** metasite id of site */
      metaSiteId?: string | null;
  }
  interface StoresV3CatalogProvisioned {
      /** instance id of stores app (AppDefId: 215238eb-22a5-4c36-9e7b-e7c08025e04e) */
      storeId?: string;
      /** instance id of the store to be cloned from */
      originStoreId?: string;
  }
  interface GetCatalogVersionRequest {
  }
  interface GetCatalogVersionResponse {
      /** The version of Stores Catalog installed on a site. */
      catalogVersion?: Version;
  }
  interface ProvisionRequest {
      /** Store this store was cloned from. If store was not cloned, leave empty */
      originalInstanceId?: string | null;
  }
  interface ProvisionResponse {
      /** The requested Provision. */
      provision?: Provision;
  }
  interface InstallBassAppDependencyRequest {
  }
  interface InstallBassAppDependencyResponse {
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
  interface Empty$2 {
  }
  interface InstallStoresRequest {
  }
  interface InstallStoresResponse {
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
   * Retrieves the version of Stores Catalog installed on a site.
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_STORES.CATALOG_VERSION_READ
   */
  function getCatalogVersion(): Promise<GetCatalogVersionResponse>;
  
  type storesCatalogV3Provision_universal_d_Provision = Provision;
  type storesCatalogV3Provision_universal_d_Version = Version;
  const storesCatalogV3Provision_universal_d_Version: typeof Version;
  type storesCatalogV3Provision_universal_d_DefaultDeliveryProfileSetup = DefaultDeliveryProfileSetup;
  type storesCatalogV3Provision_universal_d_StoresV3CatalogProvisioned = StoresV3CatalogProvisioned;
  type storesCatalogV3Provision_universal_d_GetCatalogVersionRequest = GetCatalogVersionRequest;
  type storesCatalogV3Provision_universal_d_GetCatalogVersionResponse = GetCatalogVersionResponse;
  type storesCatalogV3Provision_universal_d_ProvisionRequest = ProvisionRequest;
  type storesCatalogV3Provision_universal_d_ProvisionResponse = ProvisionResponse;
  type storesCatalogV3Provision_universal_d_InstallBassAppDependencyRequest = InstallBassAppDependencyRequest;
  type storesCatalogV3Provision_universal_d_InstallBassAppDependencyResponse = InstallBassAppDependencyResponse;
  type storesCatalogV3Provision_universal_d_MetaSiteSpecialEvent = MetaSiteSpecialEvent;
  type storesCatalogV3Provision_universal_d_MetaSiteSpecialEventPayloadOneOf = MetaSiteSpecialEventPayloadOneOf;
  type storesCatalogV3Provision_universal_d_Asset = Asset;
  type storesCatalogV3Provision_universal_d_State = State;
  const storesCatalogV3Provision_universal_d_State: typeof State;
  type storesCatalogV3Provision_universal_d_SiteCreated = SiteCreated;
  type storesCatalogV3Provision_universal_d_SiteCreatedContext = SiteCreatedContext;
  const storesCatalogV3Provision_universal_d_SiteCreatedContext: typeof SiteCreatedContext;
  type storesCatalogV3Provision_universal_d_Namespace = Namespace;
  const storesCatalogV3Provision_universal_d_Namespace: typeof Namespace;
  type storesCatalogV3Provision_universal_d_SiteTransferred = SiteTransferred;
  type storesCatalogV3Provision_universal_d_SiteDeleted = SiteDeleted;
  type storesCatalogV3Provision_universal_d_DeleteContext = DeleteContext;
  type storesCatalogV3Provision_universal_d_DeleteStatus = DeleteStatus;
  const storesCatalogV3Provision_universal_d_DeleteStatus: typeof DeleteStatus;
  type storesCatalogV3Provision_universal_d_SiteUndeleted = SiteUndeleted;
  type storesCatalogV3Provision_universal_d_SitePublished = SitePublished;
  type storesCatalogV3Provision_universal_d_SiteUnpublished = SiteUnpublished;
  type storesCatalogV3Provision_universal_d_SiteMarkedAsTemplate = SiteMarkedAsTemplate;
  type storesCatalogV3Provision_universal_d_SiteMarkedAsWixSite = SiteMarkedAsWixSite;
  type storesCatalogV3Provision_universal_d_ServiceProvisioned = ServiceProvisioned;
  type storesCatalogV3Provision_universal_d_ServiceRemoved = ServiceRemoved;
  type storesCatalogV3Provision_universal_d_SiteRenamed = SiteRenamed;
  type storesCatalogV3Provision_universal_d_SiteHardDeleted = SiteHardDeleted;
  type storesCatalogV3Provision_universal_d_NamespaceChanged = NamespaceChanged;
  type storesCatalogV3Provision_universal_d_StudioAssigned = StudioAssigned;
  type storesCatalogV3Provision_universal_d_StudioUnassigned = StudioUnassigned;
  type storesCatalogV3Provision_universal_d_InstallStoresRequest = InstallStoresRequest;
  type storesCatalogV3Provision_universal_d_InstallStoresResponse = InstallStoresResponse;
  const storesCatalogV3Provision_universal_d_getCatalogVersion: typeof getCatalogVersion;
  namespace storesCatalogV3Provision_universal_d {
    export {
      storesCatalogV3Provision_universal_d_Provision as Provision,
      storesCatalogV3Provision_universal_d_Version as Version,
      storesCatalogV3Provision_universal_d_DefaultDeliveryProfileSetup as DefaultDeliveryProfileSetup,
      storesCatalogV3Provision_universal_d_StoresV3CatalogProvisioned as StoresV3CatalogProvisioned,
      storesCatalogV3Provision_universal_d_GetCatalogVersionRequest as GetCatalogVersionRequest,
      storesCatalogV3Provision_universal_d_GetCatalogVersionResponse as GetCatalogVersionResponse,
      storesCatalogV3Provision_universal_d_ProvisionRequest as ProvisionRequest,
      storesCatalogV3Provision_universal_d_ProvisionResponse as ProvisionResponse,
      storesCatalogV3Provision_universal_d_InstallBassAppDependencyRequest as InstallBassAppDependencyRequest,
      storesCatalogV3Provision_universal_d_InstallBassAppDependencyResponse as InstallBassAppDependencyResponse,
      storesCatalogV3Provision_universal_d_MetaSiteSpecialEvent as MetaSiteSpecialEvent,
      storesCatalogV3Provision_universal_d_MetaSiteSpecialEventPayloadOneOf as MetaSiteSpecialEventPayloadOneOf,
      storesCatalogV3Provision_universal_d_Asset as Asset,
      storesCatalogV3Provision_universal_d_State as State,
      storesCatalogV3Provision_universal_d_SiteCreated as SiteCreated,
      storesCatalogV3Provision_universal_d_SiteCreatedContext as SiteCreatedContext,
      storesCatalogV3Provision_universal_d_Namespace as Namespace,
      storesCatalogV3Provision_universal_d_SiteTransferred as SiteTransferred,
      storesCatalogV3Provision_universal_d_SiteDeleted as SiteDeleted,
      storesCatalogV3Provision_universal_d_DeleteContext as DeleteContext,
      storesCatalogV3Provision_universal_d_DeleteStatus as DeleteStatus,
      storesCatalogV3Provision_universal_d_SiteUndeleted as SiteUndeleted,
      storesCatalogV3Provision_universal_d_SitePublished as SitePublished,
      storesCatalogV3Provision_universal_d_SiteUnpublished as SiteUnpublished,
      storesCatalogV3Provision_universal_d_SiteMarkedAsTemplate as SiteMarkedAsTemplate,
      storesCatalogV3Provision_universal_d_SiteMarkedAsWixSite as SiteMarkedAsWixSite,
      storesCatalogV3Provision_universal_d_ServiceProvisioned as ServiceProvisioned,
      storesCatalogV3Provision_universal_d_ServiceRemoved as ServiceRemoved,
      storesCatalogV3Provision_universal_d_SiteRenamed as SiteRenamed,
      storesCatalogV3Provision_universal_d_SiteHardDeleted as SiteHardDeleted,
      storesCatalogV3Provision_universal_d_NamespaceChanged as NamespaceChanged,
      storesCatalogV3Provision_universal_d_StudioAssigned as StudioAssigned,
      storesCatalogV3Provision_universal_d_StudioUnassigned as StudioUnassigned,
      Empty$2 as Empty,
      storesCatalogV3Provision_universal_d_InstallStoresRequest as InstallStoresRequest,
      storesCatalogV3Provision_universal_d_InstallStoresResponse as InstallStoresResponse,
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
      storesCatalogV3Provision_universal_d_getCatalogVersion as getCatalogVersion,
    };
  }
  
  /** A Ribbon is a visual element that you can assign to products to highlight them on your site. */
  interface Ribbon {
      /**
       * Ribbon ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the ribbon is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the ribbon.
       *
       * Ignored when creating a ribbon.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the ribbon was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the ribbon was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Ribbon name. */
      name?: string;
      /**
       * Number of products this ribbon is assigned to.
       * > **Note:** Returned only when you pass `"ASSIGNED_PRODUCT_COUNT"` to the `fields` array in Ribbon API requests.
       * @readonly
       */
      assignedProductCount?: number | null;
  }
  interface InvalidateCache$1 extends InvalidateCacheGetByOneOf$1 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$1;
      /** Invalidate by page id */
      page?: Page$1;
      /** Invalidate by URI path */
      uri?: URI$1;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$1;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf$1 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$1;
      /** Invalidate by page id */
      page?: Page$1;
      /** Invalidate by URI path */
      uri?: URI$1;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$1;
  }
  interface App$1 {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page$1 {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI$1 {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File$1 {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface CreateRibbonRequest {
      /** Ribbon to create. */
      ribbon: Ribbon;
  }
  interface CreateRibbonResponse {
      /** Created ribbon. */
      ribbon?: Ribbon;
  }
  interface GetRibbonRequest {
      /** Ribbon ID. */
      ribbonId: string;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields[];
  }
  enum RequestedFields {
      UNKNOWN_REQUESTED_FIELD = "UNKNOWN_REQUESTED_FIELD",
      ASSIGNED_PRODUCT_COUNT = "ASSIGNED_PRODUCT_COUNT"
  }
  interface GetRibbonResponse {
      /** Ribbon. */
      ribbon?: Ribbon;
  }
  interface UpdateRibbonRequest {
      /** Ribbon to update. */
      ribbon: Ribbon;
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields[];
  }
  interface UpdateRibbonResponse {
      /** Updated Ribbon. */
      ribbon?: Ribbon;
  }
  interface DeleteRibbonRequest {
      /** Ribbon ID. */
      ribbonId: string;
  }
  interface DeleteRibbonResponse {
  }
  interface QueryRibbonsRequest {
      /** Query options. */
      query?: CursorQuery$1;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields[];
  }
  interface CursorQuery$1 extends CursorQueryPagingMethodOneOf$1 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$1;
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
      sort?: Sorting$1[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$1 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$1;
  }
  interface Sorting$1 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$1;
  }
  enum SortOrder$1 {
      /** Ascending order. */
      ASC = "ASC",
      /** Descending order. */
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
  interface QueryRibbonsResponse {
      /** List of ribbons. */
      ribbons?: Ribbon[];
      /** Details on the paged set of results returned. */
      pagingMetadata?: CursorPagingMetadata$1;
  }
  interface CursorPagingMetadata$1 {
      /** Number of items returned in the response. */
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
  }
  interface Cursors$1 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface BulkCreateRibbonsRequest {
      /** Ribbons to create. */
      ribbons: Ribbon[];
      /**
       * Whether to return the full created ribbon entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
  }
  interface BulkCreateRibbonsResponse {
      /** Ribbons created by bulk action. */
      results?: BulkRibbonResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkRibbonResult {
      /** Bulk action metadata for ribbon. */
      itemMetadata?: ItemMetadata;
      /**
       * Full ribbon entity.
       *
       * Returned only if `returnEntity: true` is passed in the request.
       */
      item?: Ribbon;
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
  interface BulkUpdateRibbonsRequest {
      /** List of ribbons to update. */
      ribbons: MaskedRibbon[];
      /**
       * Whether to return the full updated ribbon entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields[];
  }
  interface MaskedRibbon {
      /** Ribbon to update. */
      ribbon?: Ribbon;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  interface BulkUpdateRibbonsResponse {
      /** Ribbons updated by bulk action. */
      results?: BulkRibbonResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface GetOrCreateRibbonRequest {
      /** Ribbon name to retrieve or create. */
      ribbonName: string;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields[];
  }
  interface GetOrCreateRibbonResponse {
      /** Ribbon. */
      ribbon?: Ribbon;
  }
  interface BulkGetOrCreateRibbonsRequest {
      /** Ribbon names to retrieve or create. */
      ribbonNames: string[];
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields[];
  }
  interface BulkGetOrCreateRibbonsResponse {
      /** Ribbons retrieved or created by bulk action. */
      results?: BulkRibbonResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkDeleteRibbonsRequest {
      /** IDs of ribbons to delete. */
      ribbonIds: string[];
  }
  interface BulkDeleteRibbonsResponse {
      /** Ribbons deleted by bulk action. */
      results?: BulkDeleteRibbonsResponseBulkRibbonResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkDeleteRibbonsResponseBulkRibbonResult {
      /** Bulk action metadata for ribbon. */
      itemMetadata?: ItemMetadata;
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
   * Creates a ribbon.
   *
   * To assign the ribbon to a product, include the `ribbon.id` or `ribbon.name` when [creating](https://dev.wix.com/docs/rest/business-solutions/stores/catalog-v3/products-v3/create-product) or [updating](https://dev.wix.com/docs/rest/business-solutions/stores/catalog-v3/products-v3/update-product) a product.
   * @param ribbon - Ribbon to create.
   * @public
   * @documentationMaturity preview
   * @requiredField ribbon
   * @requiredField ribbon.name
   * @permissionId WIX_STORES.RIBBON_CREATE
   * @adminMethod
   * @returns Created ribbon.
   */
  function createRibbon(ribbon: Ribbon): Promise<Ribbon>;
  /**
   * Retrieves a ribbon.
   * @param ribbonId - Ribbon ID.
   * @public
   * @documentationMaturity preview
   * @requiredField ribbonId
   * @permissionId WIX_STORES.RIBBON_READ
   * @adminMethod
   * @returns Ribbon.
   */
  function getRibbon(ribbonId: string, options?: GetRibbonOptions): Promise<Ribbon>;
  interface GetRibbonOptions {
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields[];
  }
  /**
   * Updates a ribbon.
   *
   *
   * Each time the ribbon is updated, `revision` increments by 1.
   * The current `revision` must be passed when updating the ribbon.
   * This ensures you're working with the latest ribbon and prevents unintended overwrites.
   * @param _id - Ribbon ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField ribbon
   * @requiredField ribbon.revision
   * @permissionId WIX_STORES.RIBBON_UPDATE
   * @adminMethod
   * @returns Updated Ribbon.
   */
  function updateRibbon(_id: string | null, ribbon: UpdateRibbon, options?: UpdateRibbonOptions): Promise<Ribbon>;
  interface UpdateRibbon {
      /**
       * Ribbon ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the ribbon is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the ribbon.
       *
       * Ignored when creating a ribbon.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the ribbon was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the ribbon was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Ribbon name. */
      name?: string;
      /**
       * Number of products this ribbon is assigned to.
       * > **Note:** Returned only when you pass `"ASSIGNED_PRODUCT_COUNT"` to the `fields` array in Ribbon API requests.
       * @readonly
       */
      assignedProductCount?: number | null;
  }
  interface UpdateRibbonOptions {
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields[];
  }
  /**
   * Deletes a ribbon.
   *
   *
   * > **Note:** Deleting a ribbon will also remove it from all products it is assigned to.
   * @param ribbonId - Ribbon ID.
   * @public
   * @documentationMaturity preview
   * @requiredField ribbonId
   * @permissionId WIX_STORES.RIBBON_DELETE
   * @adminMethod
   */
  function deleteRibbon(ribbonId: string): Promise<void>;
  /**
   * Retrieves a list of up to 100 ribbons, given the provided filtering, sorting, and cursor paging.
   * Pass supported values to the `fields` array in the request to include those fields in the response.
   *
   *
   * Query Brands runs with these defaults, which you can override:
   *
   * - `createdDate` is sorted in `DESC` order
   * - `cursorPaging.limit` is `100`
   *
   * For field support for filters and sorting,
   * see [Ribbons: Supported Filters and Sorting](https://dev.wix.com/docs/rest/business-solutions/stores/catalog-v3/ribbons-v3/supported-filters-and-sorting).
   *
   * To learn about working with _Query_ endpoints, see
   * [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language),
   * and [Sorting and Paging](https://dev.wix.com/docs/rest/articles/getting-started/sorting-and-paging).
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_STORES.RIBBON_READ
   * @adminMethod
   */
  function queryRibbons(options?: QueryRibbonsOptions): RibbonsQueryBuilder;
  interface QueryRibbonsOptions {
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields[] | undefined;
  }
  interface QueryCursorResult$1 {
      cursors: Cursors$1;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface RibbonsQueryResult extends QueryCursorResult$1 {
      items: Ribbon[];
      query: RibbonsQueryBuilder;
      next: () => Promise<RibbonsQueryResult>;
      prev: () => Promise<RibbonsQueryResult>;
  }
  interface RibbonsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name', value: any) => RibbonsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name', value: any) => RibbonsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => RibbonsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => RibbonsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => RibbonsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => RibbonsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'name', value: string) => RibbonsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name', value: any[]) => RibbonsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name', value: any) => RibbonsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name', value: boolean) => RibbonsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_createdDate' | '_updatedDate' | 'name'>) => RibbonsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_createdDate' | '_updatedDate' | 'name'>) => RibbonsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => RibbonsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => RibbonsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<RibbonsQueryResult>;
  }
  /**
   * Creates multiple ribbons.
   * @param ribbons - Ribbons to create.
   * @public
   * @documentationMaturity preview
   * @requiredField ribbons
   * @requiredField ribbons.name
   * @permissionId WIX_STORES.RIBBON_CREATE
   * @adminMethod
   */
  function bulkCreateRibbons(ribbons: Ribbon[], options?: BulkCreateRibbonsOptions): Promise<BulkCreateRibbonsResponse>;
  interface BulkCreateRibbonsOptions {
      /**
       * Whether to return the full created ribbon entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
  }
  /**
   * Updates multiple ribbons.
   *
   * Each time a ribbon is updated, `revision` increments by 1.
   * The current `revision` must be passed when updating a ribbon.
   * This ensures you're working with the latest ribbon and prevents unintended overwrites.
   * @param ribbons - List of ribbons to update.
   * @public
   * @documentationMaturity preview
   * @requiredField ribbons
   * @requiredField ribbons.ribbon._id
   * @requiredField ribbons.ribbon.revision
   * @permissionId WIX_STORES.RIBBON_UPDATE
   * @adminMethod
   */
  function bulkUpdateRibbons(ribbons: MaskedRibbon[], options?: BulkUpdateRibbonsOptions): Promise<BulkUpdateRibbonsResponse>;
  interface BulkUpdateRibbonsOptions {
      /**
       * Whether to return the full updated ribbon entities in the response.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields[];
  }
  /**
   * Retrieves a ribbon by name, or creates a ribbon if one with the passed `ribbonName` doesn't exist.
   * @param ribbonName - Ribbon name to retrieve or create.
   * @public
   * @documentationMaturity preview
   * @requiredField ribbonName
   * @permissionId WIX_STORES.RIBBON_GET_OR_CREATE
   * @adminMethod
   */
  function getOrCreateRibbon(ribbonName: string, options?: GetOrCreateRibbonOptions): Promise<GetOrCreateRibbonResponse>;
  interface GetOrCreateRibbonOptions {
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields[];
  }
  /**
   * Retrieves multiple ribbons by name, or creates multiple ribbons if those with the passed `ribbonNames` don't exist.
   * @param ribbonNames - Ribbon names to retrieve or create.
   * @public
   * @documentationMaturity preview
   * @requiredField ribbonNames
   * @permissionId WIX_STORES.RIBBON_GET_OR_CREATE
   * @adminMethod
   */
  function bulkGetOrCreateRibbons(ribbonNames: string[], options?: BulkGetOrCreateRibbonsOptions): Promise<BulkGetOrCreateRibbonsResponse>;
  interface BulkGetOrCreateRibbonsOptions {
      /**
       * Fields to include in the response.
       *
       * Supported values: `ASSIGNED_PRODUCTS_COUNT`
       */
      fields?: RequestedFields[];
  }
  /**
   * Deletes multiple ribbons.
   * @param ribbonIds - IDs of ribbons to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField ribbonIds
   * @permissionId WIX_STORES.RIBBON_DELETE
   * @adminMethod
   */
  function bulkDeleteRibbons(ribbonIds: string[]): Promise<BulkDeleteRibbonsResponse>;
  
  type storesCatalogV3Ribbon_universal_d_Ribbon = Ribbon;
  type storesCatalogV3Ribbon_universal_d_CreateRibbonRequest = CreateRibbonRequest;
  type storesCatalogV3Ribbon_universal_d_CreateRibbonResponse = CreateRibbonResponse;
  type storesCatalogV3Ribbon_universal_d_GetRibbonRequest = GetRibbonRequest;
  type storesCatalogV3Ribbon_universal_d_RequestedFields = RequestedFields;
  const storesCatalogV3Ribbon_universal_d_RequestedFields: typeof RequestedFields;
  type storesCatalogV3Ribbon_universal_d_GetRibbonResponse = GetRibbonResponse;
  type storesCatalogV3Ribbon_universal_d_UpdateRibbonRequest = UpdateRibbonRequest;
  type storesCatalogV3Ribbon_universal_d_UpdateRibbonResponse = UpdateRibbonResponse;
  type storesCatalogV3Ribbon_universal_d_DeleteRibbonRequest = DeleteRibbonRequest;
  type storesCatalogV3Ribbon_universal_d_DeleteRibbonResponse = DeleteRibbonResponse;
  type storesCatalogV3Ribbon_universal_d_QueryRibbonsRequest = QueryRibbonsRequest;
  type storesCatalogV3Ribbon_universal_d_QueryRibbonsResponse = QueryRibbonsResponse;
  type storesCatalogV3Ribbon_universal_d_BulkCreateRibbonsRequest = BulkCreateRibbonsRequest;
  type storesCatalogV3Ribbon_universal_d_BulkCreateRibbonsResponse = BulkCreateRibbonsResponse;
  type storesCatalogV3Ribbon_universal_d_BulkRibbonResult = BulkRibbonResult;
  type storesCatalogV3Ribbon_universal_d_ItemMetadata = ItemMetadata;
  type storesCatalogV3Ribbon_universal_d_ApplicationError = ApplicationError;
  type storesCatalogV3Ribbon_universal_d_BulkActionMetadata = BulkActionMetadata;
  type storesCatalogV3Ribbon_universal_d_BulkUpdateRibbonsRequest = BulkUpdateRibbonsRequest;
  type storesCatalogV3Ribbon_universal_d_MaskedRibbon = MaskedRibbon;
  type storesCatalogV3Ribbon_universal_d_BulkUpdateRibbonsResponse = BulkUpdateRibbonsResponse;
  type storesCatalogV3Ribbon_universal_d_GetOrCreateRibbonRequest = GetOrCreateRibbonRequest;
  type storesCatalogV3Ribbon_universal_d_GetOrCreateRibbonResponse = GetOrCreateRibbonResponse;
  type storesCatalogV3Ribbon_universal_d_BulkGetOrCreateRibbonsRequest = BulkGetOrCreateRibbonsRequest;
  type storesCatalogV3Ribbon_universal_d_BulkGetOrCreateRibbonsResponse = BulkGetOrCreateRibbonsResponse;
  type storesCatalogV3Ribbon_universal_d_BulkDeleteRibbonsRequest = BulkDeleteRibbonsRequest;
  type storesCatalogV3Ribbon_universal_d_BulkDeleteRibbonsResponse = BulkDeleteRibbonsResponse;
  type storesCatalogV3Ribbon_universal_d_BulkDeleteRibbonsResponseBulkRibbonResult = BulkDeleteRibbonsResponseBulkRibbonResult;
  const storesCatalogV3Ribbon_universal_d_createRibbon: typeof createRibbon;
  const storesCatalogV3Ribbon_universal_d_getRibbon: typeof getRibbon;
  type storesCatalogV3Ribbon_universal_d_GetRibbonOptions = GetRibbonOptions;
  const storesCatalogV3Ribbon_universal_d_updateRibbon: typeof updateRibbon;
  type storesCatalogV3Ribbon_universal_d_UpdateRibbon = UpdateRibbon;
  type storesCatalogV3Ribbon_universal_d_UpdateRibbonOptions = UpdateRibbonOptions;
  const storesCatalogV3Ribbon_universal_d_deleteRibbon: typeof deleteRibbon;
  const storesCatalogV3Ribbon_universal_d_queryRibbons: typeof queryRibbons;
  type storesCatalogV3Ribbon_universal_d_QueryRibbonsOptions = QueryRibbonsOptions;
  type storesCatalogV3Ribbon_universal_d_RibbonsQueryResult = RibbonsQueryResult;
  type storesCatalogV3Ribbon_universal_d_RibbonsQueryBuilder = RibbonsQueryBuilder;
  const storesCatalogV3Ribbon_universal_d_bulkCreateRibbons: typeof bulkCreateRibbons;
  type storesCatalogV3Ribbon_universal_d_BulkCreateRibbonsOptions = BulkCreateRibbonsOptions;
  const storesCatalogV3Ribbon_universal_d_bulkUpdateRibbons: typeof bulkUpdateRibbons;
  type storesCatalogV3Ribbon_universal_d_BulkUpdateRibbonsOptions = BulkUpdateRibbonsOptions;
  const storesCatalogV3Ribbon_universal_d_getOrCreateRibbon: typeof getOrCreateRibbon;
  type storesCatalogV3Ribbon_universal_d_GetOrCreateRibbonOptions = GetOrCreateRibbonOptions;
  const storesCatalogV3Ribbon_universal_d_bulkGetOrCreateRibbons: typeof bulkGetOrCreateRibbons;
  type storesCatalogV3Ribbon_universal_d_BulkGetOrCreateRibbonsOptions = BulkGetOrCreateRibbonsOptions;
  const storesCatalogV3Ribbon_universal_d_bulkDeleteRibbons: typeof bulkDeleteRibbons;
  namespace storesCatalogV3Ribbon_universal_d {
    export {
      storesCatalogV3Ribbon_universal_d_Ribbon as Ribbon,
      InvalidateCache$1 as InvalidateCache,
      InvalidateCacheGetByOneOf$1 as InvalidateCacheGetByOneOf,
      App$1 as App,
      Page$1 as Page,
      URI$1 as URI,
      File$1 as File,
      storesCatalogV3Ribbon_universal_d_CreateRibbonRequest as CreateRibbonRequest,
      storesCatalogV3Ribbon_universal_d_CreateRibbonResponse as CreateRibbonResponse,
      storesCatalogV3Ribbon_universal_d_GetRibbonRequest as GetRibbonRequest,
      storesCatalogV3Ribbon_universal_d_RequestedFields as RequestedFields,
      storesCatalogV3Ribbon_universal_d_GetRibbonResponse as GetRibbonResponse,
      storesCatalogV3Ribbon_universal_d_UpdateRibbonRequest as UpdateRibbonRequest,
      storesCatalogV3Ribbon_universal_d_UpdateRibbonResponse as UpdateRibbonResponse,
      storesCatalogV3Ribbon_universal_d_DeleteRibbonRequest as DeleteRibbonRequest,
      storesCatalogV3Ribbon_universal_d_DeleteRibbonResponse as DeleteRibbonResponse,
      storesCatalogV3Ribbon_universal_d_QueryRibbonsRequest as QueryRibbonsRequest,
      CursorQuery$1 as CursorQuery,
      CursorQueryPagingMethodOneOf$1 as CursorQueryPagingMethodOneOf,
      Sorting$1 as Sorting,
      SortOrder$1 as SortOrder,
      CursorPaging$1 as CursorPaging,
      storesCatalogV3Ribbon_universal_d_QueryRibbonsResponse as QueryRibbonsResponse,
      CursorPagingMetadata$1 as CursorPagingMetadata,
      Cursors$1 as Cursors,
      storesCatalogV3Ribbon_universal_d_BulkCreateRibbonsRequest as BulkCreateRibbonsRequest,
      storesCatalogV3Ribbon_universal_d_BulkCreateRibbonsResponse as BulkCreateRibbonsResponse,
      storesCatalogV3Ribbon_universal_d_BulkRibbonResult as BulkRibbonResult,
      storesCatalogV3Ribbon_universal_d_ItemMetadata as ItemMetadata,
      storesCatalogV3Ribbon_universal_d_ApplicationError as ApplicationError,
      storesCatalogV3Ribbon_universal_d_BulkActionMetadata as BulkActionMetadata,
      storesCatalogV3Ribbon_universal_d_BulkUpdateRibbonsRequest as BulkUpdateRibbonsRequest,
      storesCatalogV3Ribbon_universal_d_MaskedRibbon as MaskedRibbon,
      storesCatalogV3Ribbon_universal_d_BulkUpdateRibbonsResponse as BulkUpdateRibbonsResponse,
      storesCatalogV3Ribbon_universal_d_GetOrCreateRibbonRequest as GetOrCreateRibbonRequest,
      storesCatalogV3Ribbon_universal_d_GetOrCreateRibbonResponse as GetOrCreateRibbonResponse,
      storesCatalogV3Ribbon_universal_d_BulkGetOrCreateRibbonsRequest as BulkGetOrCreateRibbonsRequest,
      storesCatalogV3Ribbon_universal_d_BulkGetOrCreateRibbonsResponse as BulkGetOrCreateRibbonsResponse,
      storesCatalogV3Ribbon_universal_d_BulkDeleteRibbonsRequest as BulkDeleteRibbonsRequest,
      storesCatalogV3Ribbon_universal_d_BulkDeleteRibbonsResponse as BulkDeleteRibbonsResponse,
      storesCatalogV3Ribbon_universal_d_BulkDeleteRibbonsResponseBulkRibbonResult as BulkDeleteRibbonsResponseBulkRibbonResult,
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
      storesCatalogV3Ribbon_universal_d_createRibbon as createRibbon,
      storesCatalogV3Ribbon_universal_d_getRibbon as getRibbon,
      storesCatalogV3Ribbon_universal_d_GetRibbonOptions as GetRibbonOptions,
      storesCatalogV3Ribbon_universal_d_updateRibbon as updateRibbon,
      storesCatalogV3Ribbon_universal_d_UpdateRibbon as UpdateRibbon,
      storesCatalogV3Ribbon_universal_d_UpdateRibbonOptions as UpdateRibbonOptions,
      storesCatalogV3Ribbon_universal_d_deleteRibbon as deleteRibbon,
      storesCatalogV3Ribbon_universal_d_queryRibbons as queryRibbons,
      storesCatalogV3Ribbon_universal_d_QueryRibbonsOptions as QueryRibbonsOptions,
      storesCatalogV3Ribbon_universal_d_RibbonsQueryResult as RibbonsQueryResult,
      storesCatalogV3Ribbon_universal_d_RibbonsQueryBuilder as RibbonsQueryBuilder,
      storesCatalogV3Ribbon_universal_d_bulkCreateRibbons as bulkCreateRibbons,
      storesCatalogV3Ribbon_universal_d_BulkCreateRibbonsOptions as BulkCreateRibbonsOptions,
      storesCatalogV3Ribbon_universal_d_bulkUpdateRibbons as bulkUpdateRibbons,
      storesCatalogV3Ribbon_universal_d_BulkUpdateRibbonsOptions as BulkUpdateRibbonsOptions,
      storesCatalogV3Ribbon_universal_d_getOrCreateRibbon as getOrCreateRibbon,
      storesCatalogV3Ribbon_universal_d_GetOrCreateRibbonOptions as GetOrCreateRibbonOptions,
      storesCatalogV3Ribbon_universal_d_bulkGetOrCreateRibbons as bulkGetOrCreateRibbons,
      storesCatalogV3Ribbon_universal_d_BulkGetOrCreateRibbonsOptions as BulkGetOrCreateRibbonsOptions,
      storesCatalogV3Ribbon_universal_d_bulkDeleteRibbons as bulkDeleteRibbons,
    };
  }
  
  /** A location is a physical or virtual site where products are sold. */
  interface StoresLocation {
      /**
       * Stores location ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the Stores location is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the Stores location.
       *
       * Ignored when creating a Stores location.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the Stores location was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the Stores location was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Wix location ID.
       * Learn more about the [Locations API](https://dev.wix.com/docs/rest/business-management/locations/introduction).
       */
      wixLocationId?: string | null;
      /**
       * Location type.
       * @readonly
       */
      locationType?: LocationType;
      /**
       * Stores location name.
       * @readonly
       */
      name?: string;
      /** Whether the location is the site's default location. */
      defaultLocation?: boolean;
  }
  enum LocationType {
      UNKNOWN_LOCATION_TYPE = "UNKNOWN_LOCATION_TYPE",
      /** Online store. */
      VIRTUAL = "VIRTUAL",
      /** Physical location, for example, POS. */
      PHYSICAL = "PHYSICAL"
  }
  interface InvalidateCache extends InvalidateCacheGetByOneOf {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App;
      /** Invalidate by page id */
      page?: Page;
      /** Invalidate by URI path */
      uri?: URI;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App;
      /** Invalidate by page id */
      page?: Page;
      /** Invalidate by URI path */
      uri?: URI;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File;
  }
  interface App {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface CreateStoresLocationRequest {
      /** Stores location to create. */
      storesLocation: StoresLocation;
  }
  interface CreateStoresLocationResponse {
      /** Created Stores location. */
      storesLocation?: StoresLocation;
  }
  interface GetStoresLocationRequest {
      /** Stores location ID. */
      storesLocationId: string;
  }
  interface GetStoresLocationResponse {
      /** Stores location. */
      storesLocation?: StoresLocation;
  }
  interface UpdateStoresLocationRequest {
      /** Stores location to update. */
      storesLocation: StoresLocation;
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateStoresLocationResponse {
      /** Updated Stores location. */
      storesLocation?: StoresLocation;
  }
  interface DeleteStoresLocationRequest {
      /** Stores location ID. */
      storesLocationId: string;
  }
  interface DeleteStoresLocationResponse {
  }
  interface QueryStoresLocationsRequest {
      /** Query options. */
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
  }
  enum SortOrder {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging {
      /** Number of items to load. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * You can get the relevant cursor token
       * from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface QueryStoresLocationsResponse {
      /** List of Stores locations. */
      storesLocations?: StoresLocation[];
      /** Details on the paged set of results returned. */
      pagingMetadata?: CursorPagingMetadata;
  }
  interface CursorPagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      cursors?: Cursors;
      /**
       * Whether there are more pages to retrieve following the current page.
       *
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface GetOrCreateDefaultStoresLocationRequest {
  }
  interface GetOrCreateDefaultStoresLocationResponse {
      /** Default Stores location. */
      storesLocation?: StoresLocation;
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
  interface Empty {
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
   * Creates a Stores location.
   * @param storesLocation - Stores location to create.
   * @internal
   * @documentationMaturity preview
   * @requiredField storesLocation
   * @requiredField storesLocation.name
   * @permissionId WIX_STORES.STORES_LOCATION_CREATE
   * @adminMethod
   * @returns Created Stores location.
   */
  function createStoresLocation(storesLocation: StoresLocation): Promise<StoresLocation>;
  /**
   * Retrieves a Stores location.
   * @param storesLocationId - Stores location ID.
   * @public
   * @documentationMaturity preview
   * @requiredField storesLocationId
   * @permissionId WIX_STORES.STORES_LOCATION_READ
   * @returns Stores location.
   */
  function getStoresLocation(storesLocationId: string): Promise<StoresLocation>;
  /**
   * Updates a Stores location.
   *
   * Each time the Stores location is updated, `revision` increments by 1.
   * The current `revision` must be passed when updating the Stores location.
   * This ensures you're working with the latest Stores location and prevents unintended overwrites.
   * @param _id - Stores location ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField storesLocation
   * @requiredField storesLocation.revision
   * @permissionId WIX_STORES.STORES_LOCATION_UPDATE
   * @adminMethod
   * @returns Updated Stores location.
   */
  function updateStoresLocation(_id: string | null, storesLocation: UpdateStoresLocation, options?: UpdateStoresLocationOptions): Promise<StoresLocation>;
  interface UpdateStoresLocation {
      /**
       * Stores location ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the Stores location is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the Stores location.
       *
       * Ignored when creating a Stores location.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the Stores location was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the Stores location was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Wix location ID.
       * Learn more about the [Locations API](https://dev.wix.com/docs/rest/business-management/locations/introduction).
       */
      wixLocationId?: string | null;
      /**
       * Location type.
       * @readonly
       */
      locationType?: LocationType;
      /**
       * Stores location name.
       * @readonly
       */
      name?: string;
      /** Whether the location is the site's default location. */
      defaultLocation?: boolean;
  }
  interface UpdateStoresLocationOptions {
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Deletes a Stores location.
   * @param storesLocationId - Stores location ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField storesLocationId
   * @permissionId WIX_STORES.STORES_LOCATION_DELETE
   * @adminMethod
   */
  function deleteStoresLocation(storesLocationId: string): Promise<void>;
  /**
   * Retrieves a list of up to 100 Stores locations, given the provided filtering, sorting, and cursor paging.
   * Pass supported values to the `fields` array in the request to include those fields in the response.
   *
   *
   * Query Stores Locations runs with these defaults, which you can override:
   *
   * - `createdDate` is sorted in `DESC` order
   * - `cursorPaging.limit` is `100`
   *
   * For field support for filters and sorting,
   * see [Stores Locations: Supported Filters and Sorting](https://dev.wix.com/docs/rest/business-solutions/stores/catalog-v3/stores-locations-v3/supported-filters-and-sorting).
   *
   * To learn about working with _Query_ endpoints, see
   * [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language),
   * and [Sorting and Paging](https://dev.wix.com/docs/rest/articles/getting-started/sorting-and-paging).
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_STORES.STORES_LOCATION_READ
   */
  function queryStoresLocations(): StoresLocationsQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface StoresLocationsQueryResult extends QueryCursorResult {
      items: StoresLocation[];
      query: StoresLocationsQueryBuilder;
      next: () => Promise<StoresLocationsQueryResult>;
      prev: () => Promise<StoresLocationsQueryResult>;
  }
  interface StoresLocationsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'wixLocationId' | 'locationType' | 'name' | 'defaultLocation', value: any) => StoresLocationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'wixLocationId' | 'locationType' | 'name' | 'defaultLocation', value: any) => StoresLocationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => StoresLocationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => StoresLocationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => StoresLocationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => StoresLocationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'wixLocationId' | 'name', value: string) => StoresLocationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'wixLocationId' | 'locationType' | 'name' | 'defaultLocation', value: any[]) => StoresLocationsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'wixLocationId' | 'locationType' | 'name' | 'defaultLocation', value: any) => StoresLocationsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'wixLocationId' | 'locationType' | 'name' | 'defaultLocation', value: boolean) => StoresLocationsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_createdDate' | '_updatedDate' | 'locationType' | 'name' | 'defaultLocation'>) => StoresLocationsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_createdDate' | '_updatedDate' | 'locationType' | 'name' | 'defaultLocation'>) => StoresLocationsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => StoresLocationsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => StoresLocationsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<StoresLocationsQueryResult>;
  }
  /**
   * Retrieves the default inventory location, or creates it if it doesn't exist.
   * @internal
   * @documentationMaturity preview
   * @permissionId WIX_STORES.STORES_LOCATION_GET_OR_CREATE
   * @adminMethod
   */
  function getOrCreateDefaultStoresLocation(): Promise<GetOrCreateDefaultStoresLocationResponse>;
  
  type storesCatalogV3StoresLocation_universal_d_StoresLocation = StoresLocation;
  type storesCatalogV3StoresLocation_universal_d_LocationType = LocationType;
  const storesCatalogV3StoresLocation_universal_d_LocationType: typeof LocationType;
  type storesCatalogV3StoresLocation_universal_d_InvalidateCache = InvalidateCache;
  type storesCatalogV3StoresLocation_universal_d_InvalidateCacheGetByOneOf = InvalidateCacheGetByOneOf;
  type storesCatalogV3StoresLocation_universal_d_App = App;
  type storesCatalogV3StoresLocation_universal_d_Page = Page;
  type storesCatalogV3StoresLocation_universal_d_URI = URI;
  type storesCatalogV3StoresLocation_universal_d_File = File;
  type storesCatalogV3StoresLocation_universal_d_CreateStoresLocationRequest = CreateStoresLocationRequest;
  type storesCatalogV3StoresLocation_universal_d_CreateStoresLocationResponse = CreateStoresLocationResponse;
  type storesCatalogV3StoresLocation_universal_d_GetStoresLocationRequest = GetStoresLocationRequest;
  type storesCatalogV3StoresLocation_universal_d_GetStoresLocationResponse = GetStoresLocationResponse;
  type storesCatalogV3StoresLocation_universal_d_UpdateStoresLocationRequest = UpdateStoresLocationRequest;
  type storesCatalogV3StoresLocation_universal_d_UpdateStoresLocationResponse = UpdateStoresLocationResponse;
  type storesCatalogV3StoresLocation_universal_d_DeleteStoresLocationRequest = DeleteStoresLocationRequest;
  type storesCatalogV3StoresLocation_universal_d_DeleteStoresLocationResponse = DeleteStoresLocationResponse;
  type storesCatalogV3StoresLocation_universal_d_QueryStoresLocationsRequest = QueryStoresLocationsRequest;
  type storesCatalogV3StoresLocation_universal_d_CursorQuery = CursorQuery;
  type storesCatalogV3StoresLocation_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type storesCatalogV3StoresLocation_universal_d_Sorting = Sorting;
  type storesCatalogV3StoresLocation_universal_d_SortOrder = SortOrder;
  const storesCatalogV3StoresLocation_universal_d_SortOrder: typeof SortOrder;
  type storesCatalogV3StoresLocation_universal_d_CursorPaging = CursorPaging;
  type storesCatalogV3StoresLocation_universal_d_QueryStoresLocationsResponse = QueryStoresLocationsResponse;
  type storesCatalogV3StoresLocation_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type storesCatalogV3StoresLocation_universal_d_Cursors = Cursors;
  type storesCatalogV3StoresLocation_universal_d_GetOrCreateDefaultStoresLocationRequest = GetOrCreateDefaultStoresLocationRequest;
  type storesCatalogV3StoresLocation_universal_d_GetOrCreateDefaultStoresLocationResponse = GetOrCreateDefaultStoresLocationResponse;
  type storesCatalogV3StoresLocation_universal_d_DomainEvent = DomainEvent;
  type storesCatalogV3StoresLocation_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type storesCatalogV3StoresLocation_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type storesCatalogV3StoresLocation_universal_d_RestoreInfo = RestoreInfo;
  type storesCatalogV3StoresLocation_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type storesCatalogV3StoresLocation_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type storesCatalogV3StoresLocation_universal_d_ActionEvent = ActionEvent;
  type storesCatalogV3StoresLocation_universal_d_Empty = Empty;
  type storesCatalogV3StoresLocation_universal_d_MessageEnvelope = MessageEnvelope;
  type storesCatalogV3StoresLocation_universal_d_IdentificationData = IdentificationData;
  type storesCatalogV3StoresLocation_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type storesCatalogV3StoresLocation_universal_d_WebhookIdentityType = WebhookIdentityType;
  const storesCatalogV3StoresLocation_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const storesCatalogV3StoresLocation_universal_d_createStoresLocation: typeof createStoresLocation;
  const storesCatalogV3StoresLocation_universal_d_getStoresLocation: typeof getStoresLocation;
  const storesCatalogV3StoresLocation_universal_d_updateStoresLocation: typeof updateStoresLocation;
  type storesCatalogV3StoresLocation_universal_d_UpdateStoresLocation = UpdateStoresLocation;
  type storesCatalogV3StoresLocation_universal_d_UpdateStoresLocationOptions = UpdateStoresLocationOptions;
  const storesCatalogV3StoresLocation_universal_d_deleteStoresLocation: typeof deleteStoresLocation;
  const storesCatalogV3StoresLocation_universal_d_queryStoresLocations: typeof queryStoresLocations;
  type storesCatalogV3StoresLocation_universal_d_StoresLocationsQueryResult = StoresLocationsQueryResult;
  type storesCatalogV3StoresLocation_universal_d_StoresLocationsQueryBuilder = StoresLocationsQueryBuilder;
  const storesCatalogV3StoresLocation_universal_d_getOrCreateDefaultStoresLocation: typeof getOrCreateDefaultStoresLocation;
  namespace storesCatalogV3StoresLocation_universal_d {
    export {
      storesCatalogV3StoresLocation_universal_d_StoresLocation as StoresLocation,
      storesCatalogV3StoresLocation_universal_d_LocationType as LocationType,
      storesCatalogV3StoresLocation_universal_d_InvalidateCache as InvalidateCache,
      storesCatalogV3StoresLocation_universal_d_InvalidateCacheGetByOneOf as InvalidateCacheGetByOneOf,
      storesCatalogV3StoresLocation_universal_d_App as App,
      storesCatalogV3StoresLocation_universal_d_Page as Page,
      storesCatalogV3StoresLocation_universal_d_URI as URI,
      storesCatalogV3StoresLocation_universal_d_File as File,
      storesCatalogV3StoresLocation_universal_d_CreateStoresLocationRequest as CreateStoresLocationRequest,
      storesCatalogV3StoresLocation_universal_d_CreateStoresLocationResponse as CreateStoresLocationResponse,
      storesCatalogV3StoresLocation_universal_d_GetStoresLocationRequest as GetStoresLocationRequest,
      storesCatalogV3StoresLocation_universal_d_GetStoresLocationResponse as GetStoresLocationResponse,
      storesCatalogV3StoresLocation_universal_d_UpdateStoresLocationRequest as UpdateStoresLocationRequest,
      storesCatalogV3StoresLocation_universal_d_UpdateStoresLocationResponse as UpdateStoresLocationResponse,
      storesCatalogV3StoresLocation_universal_d_DeleteStoresLocationRequest as DeleteStoresLocationRequest,
      storesCatalogV3StoresLocation_universal_d_DeleteStoresLocationResponse as DeleteStoresLocationResponse,
      storesCatalogV3StoresLocation_universal_d_QueryStoresLocationsRequest as QueryStoresLocationsRequest,
      storesCatalogV3StoresLocation_universal_d_CursorQuery as CursorQuery,
      storesCatalogV3StoresLocation_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      storesCatalogV3StoresLocation_universal_d_Sorting as Sorting,
      storesCatalogV3StoresLocation_universal_d_SortOrder as SortOrder,
      storesCatalogV3StoresLocation_universal_d_CursorPaging as CursorPaging,
      storesCatalogV3StoresLocation_universal_d_QueryStoresLocationsResponse as QueryStoresLocationsResponse,
      storesCatalogV3StoresLocation_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      storesCatalogV3StoresLocation_universal_d_Cursors as Cursors,
      storesCatalogV3StoresLocation_universal_d_GetOrCreateDefaultStoresLocationRequest as GetOrCreateDefaultStoresLocationRequest,
      storesCatalogV3StoresLocation_universal_d_GetOrCreateDefaultStoresLocationResponse as GetOrCreateDefaultStoresLocationResponse,
      storesCatalogV3StoresLocation_universal_d_DomainEvent as DomainEvent,
      storesCatalogV3StoresLocation_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      storesCatalogV3StoresLocation_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      storesCatalogV3StoresLocation_universal_d_RestoreInfo as RestoreInfo,
      storesCatalogV3StoresLocation_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      storesCatalogV3StoresLocation_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      storesCatalogV3StoresLocation_universal_d_ActionEvent as ActionEvent,
      storesCatalogV3StoresLocation_universal_d_Empty as Empty,
      storesCatalogV3StoresLocation_universal_d_MessageEnvelope as MessageEnvelope,
      storesCatalogV3StoresLocation_universal_d_IdentificationData as IdentificationData,
      storesCatalogV3StoresLocation_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      storesCatalogV3StoresLocation_universal_d_WebhookIdentityType as WebhookIdentityType,
      storesCatalogV3StoresLocation_universal_d_createStoresLocation as createStoresLocation,
      storesCatalogV3StoresLocation_universal_d_getStoresLocation as getStoresLocation,
      storesCatalogV3StoresLocation_universal_d_updateStoresLocation as updateStoresLocation,
      storesCatalogV3StoresLocation_universal_d_UpdateStoresLocation as UpdateStoresLocation,
      storesCatalogV3StoresLocation_universal_d_UpdateStoresLocationOptions as UpdateStoresLocationOptions,
      storesCatalogV3StoresLocation_universal_d_deleteStoresLocation as deleteStoresLocation,
      storesCatalogV3StoresLocation_universal_d_queryStoresLocations as queryStoresLocations,
      storesCatalogV3StoresLocation_universal_d_StoresLocationsQueryResult as StoresLocationsQueryResult,
      storesCatalogV3StoresLocation_universal_d_StoresLocationsQueryBuilder as StoresLocationsQueryBuilder,
      storesCatalogV3StoresLocation_universal_d_getOrCreateDefaultStoresLocation as getOrCreateDefaultStoresLocation,
    };
  }
  
  export { storesCatalogV3Brand_universal_d as brandsV3, storesCatalogV1Provision_universal_d as catalogProvision, storesCatalogV3Provision_universal_d as catalogVersioning, storesCatalogV3Customization_universal_d as customizationsV3, storesCatalogV3InfoSection_universal_d as infoSectionsV3, storesCatalogV3InventoryItem_universal_d as inventoryItemsV3, storesCatalogV3ProductProductsV3_universal_d as productsV3, storesCatalogV3Ribbon_universal_d as ribbonsV3, storesCatalogV3StoresLocation_universal_d as storesLocationsV3 };
}
