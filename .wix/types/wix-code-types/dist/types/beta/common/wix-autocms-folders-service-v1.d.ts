declare module "wix-autocms-folders-service-v1" {
  /**
   * Folder is a container for other folders and collection references
   * There's always 1 root folder with empty ID
   */
  interface Folder {
      /**
       * unique ID, not present for root folder, mandatory for nested folders
       * @readonly
       */
      _id?: string | null;
      /**
       * display name
       * @internal
       * @deprecated
       * @replacedBy name
       * @targetRemovalDate 2025-01-01
       */
      displayName?: string;
      /** display name */
      name?: string;
      /** folder description if any */
      description?: string | null;
      /**
       * additional information
       * @internal
       */
      info?: Record<string, any> | null;
      /**
       * collections in current folder
       * @internal
       * @deprecated
       * @replacedBy collection_references
       * @targetRemovalDate 2025-01-01
       */
      collections?: CollectionReference[];
      /** nested folders */
      folders?: Folder[];
      /** collections in current folder */
      collectionReferences?: CollectionReference[];
  }
  /**
   * Reference to a collection, contained in a folder
   * Collection may have up to 1 reference per folder
   * and exactly 1 non-shortcut reference overall
   */
  interface CollectionReference {
      /** collection unique name (ID) */
      collectionName?: string;
      /**
       * same collection may have many shortcut references across folders
       * but only one non-shortcut reference
       * by default any collection will have reference at root folder
       * @internal
       */
      shortcut?: boolean;
      /**
       * additional information
       * @internal
       */
      info?: Record<string, any> | null;
      /** Folder ID, where reference is located, not present for root folder */
      folderId?: string | null;
  }
  interface GetFolderRequest {
      /** missing means root */
      folderId?: string | null;
      /**
       * nesting depth to return
       * - 0 means no nested elements, only folder details
       * - none means full folder tree
       */
      depth?: number | null;
      /**
       * if true CollectionReference.schema are not returned,
       * but call is much faster.
       * ignored for root folder request
       * @internal
       * @deprecated
       * @targetRemovalDate 2025-01-01
       */
      skipSchemas?: boolean;
  }
  interface GetFolderResponse {
      /** requested folder details */
      folder?: Folder;
      /** depth value requested */
      depth?: number | null;
  }
  interface CreateFolderRequest {
      /** parent folder ID or none if root */
      parentFolderId?: string | null;
      /**
       * folder info to create
       * @internal
       * @deprecated
       * @replacedBy folder_details
       * @targetRemovalDate 2025-01-01
       */
      folderInfo?: FolderInfo;
      /** folder info to create */
      folderDetails?: FolderDetails;
  }
  interface FolderInfo {
      /**
       * display name
       * @internal
       * @deprecated
       * @replacedBy name
       * @targetRemovalDate 2025-01-01
       */
      displayName?: string | null;
      /** display name */
      name?: string | null;
      /** description */
      description?: string | null;
      /**
       * additional info
       * @internal
       */
      info?: Record<string, any> | null;
  }
  interface FolderDetails {
      /** display name */
      name?: string | null;
      /** description */
      description?: string | null;
      /**
       * additional info
       * @internal
       */
      info?: Record<string, any> | null;
  }
  interface CreateFolderResponse {
      /** parent of created folder or none for root */
      parentFolderId?: string | null;
      /** created folder */
      folder?: Folder;
  }
  interface UpdateFolderRequest {
      /** Folder ID */
      folderId: string;
      /** Fields to update, partial */
      folderInfo?: FolderInfo;
      /**
       * patch mask, not exposed to JSON
       * @internal
       */
      mask?: string[];
  }
  interface UpdateFolderResponse {
      /**
       * updated folder
       * folder contents (folders and collections) would not be returned
       */
      folder?: Folder;
  }
  interface UpdateFolderDetailsRequest {
      /** Folder ID */
      folderId: string;
      /** Fields to update, partial */
      folderDetails?: FolderDetails;
      /**
       * patch mask, not exposed to JSON
       * @internal
       */
      mask?: string[];
  }
  interface UpdateFolderDetailsResponse {
      /**
       * updated folder
       * folder contents (folders and collections) would not be returned
       */
      folder?: Folder;
  }
  interface DeleteFolderRequest {
      /** folder ID to delete */
      folderId: string;
  }
  interface DeleteFolderResponse {
  }
  interface MoveFolderRequest {
      /** folder ID to move */
      folderId: string;
      /** destination folder ID (new parent), none if root */
      parentFolderId?: string | null;
  }
  interface MoveFolderResponse {
  }
  interface ReferenceCollectionRequest {
      /** collection name to reference (ID) */
      collectionName: string;
      /** target folder ID or none if root */
      folderId?: string | null;
      /**
       * if false then single non-shortcut reference to this
       * collection is moved to target folder
       * otherwise new shortcut reference is created
       * @internal
       */
      shortcut?: boolean;
      /**
       * additional information for shortcut reference
       * ignored for non-shortcut reference
       * @internal
       */
      info?: Record<string, any> | null;
  }
  interface ReferenceCollectionResponse {
      /** Folder ID that contains reference or none if root */
      folderId?: string | null;
      /** reference details */
      collectionReference?: CollectionReference;
  }
  interface CreateCollectionReferenceRequest {
      /** Collection reference to create */
      collectionReference: CollectionReference;
  }
  interface CreateCollectionReferenceResponse {
      /** Collection reference created */
      collectionReference?: CollectionReference;
  }
  interface GetReferencesRequest {
      /** collection name (ID) to get */
      collectionName: string;
      /**
       * if true schema would not be loaded and reference may not be found if collection is in root folder
       * loading schema has performance impact
       * @internal
       * @deprecated
       * @targetRemovalDate 2025-01-01
       */
      skipSchemas?: boolean;
  }
  interface GetReferencesResponse {
      /** list of references */
      references?: ReferenceLocation[];
  }
  interface ReferenceLocation {
      /** folder where reference is located */
      folderId?: string | null;
      /** reference details */
      reference?: CollectionReference;
  }
  interface UpdateReferenceInfoRequest {
      /** folder where reference is located, none for root */
      folderId?: string | null;
      /** referenced collection name (ID) */
      collectionName: string;
      /** additional information to set */
      info?: Record<string, any> | null;
  }
  interface UpdateReferenceInfoResponse {
      /** Folder ID that contains reference or none if root */
      folderId?: string | null;
      /** reference details */
      collectionReference?: CollectionReference;
  }
  interface DeleteReferenceRequest {
      /** collection name (ID) to delete */
      collectionName: string;
      /** folder ID where to delete reference or none if root */
      folderId?: string | null;
  }
  interface DeleteReferenceResponse {
  }
  interface GetCollectionReferencesRequest {
      /** collection ID to get */
      collectionName: string;
  }
  interface GetCollectionReferencesResponse {
      /** list of references */
      collectionReferences?: CollectionReference[];
  }
  interface UpdateCollectionReferenceRequest {
      /** Collection reference to update */
      collectionReference: CollectionReference;
  }
  interface UpdateCollectionReferenceResponse {
      /** Updated collection reference */
      collectionReference?: CollectionReference;
  }
  interface DeleteCollectionReferenceRequest {
      /** collection name (ID) to delete */
      collectionName: string;
      /** folder ID where to delete reference or none if root */
      folderId?: string | null;
  }
  interface DeleteCollectionReferenceResponse {
  }
  interface SearchRequest {
      /**
       * Search string, matched ignoring case
       * @internal
       * @deprecated
       * @replacedBy keyword
       * @targetRemovalDate 2025-01-01
       */
      searchTerm?: string;
      /** Search string, matched ignoring case */
      keyword?: string;
  }
  interface SearchResponse {
      /** folders found, no contents are returned */
      folders?: Folder[];
      /**
       * collections found
       * @internal
       * @deprecated
       * @replacedBy collection_references
       * @targetRemovalDate 2025-01-01
       */
      collections?: CollectionReference[];
      /** collection references found */
      collectionReferences?: CollectionReference[];
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
  interface Empty {
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
   * Get folder by ID
   *
   * Error codes:
   * - `FOLDER_NOT_FOUND` in case if folder does not exists
   * @public
   * @documentationMaturity preview
   * @permissionId AUTOCMS.FOLDER_READ
   * @adminMethod
   * @returns requested folder details
   */
  function getFolder(options?: GetFolderOptions): Promise<Folder>;
  interface GetFolderOptions {
      /** missing means root */
      folderId?: string | null;
      /**
       * nesting depth to return
       * - 0 means no nested elements, only folder details
       * - none means full folder tree
       */
      depth?: number | null;
      /**
       * if true CollectionReference.schema are not returned,
       * but call is much faster.
       * ignored for root folder request
       * @internal
       * @deprecated
       * @targetRemovalDate 2025-01-01
       */
      skipSchemas?: boolean;
  }
  /**
   * Create new folder
   *
   * Error codes:
   * - `FOLDER_NOT_FOUND` in case if parent folder does not exists
   * @public
   * @documentationMaturity preview
   * @permissionId AUTOCMS.FOLDER_CREATE
   * @adminMethod
   */
  function createFolder(options?: CreateFolderOptions): Promise<CreateFolderResponse>;
  interface CreateFolderOptions {
      /** parent folder ID or none if root */
      parentFolderId?: string | null;
      /**
       * folder info to create
       * @internal
       * @deprecated
       * @replacedBy folder_details
       * @targetRemovalDate 2025-01-01
       */
      folderInfo?: FolderInfo;
      /** folder info to create */
      folderDetails?: FolderDetails;
  }
  /**
   * Update nested folder details.
   * Root folder can't be updated.
   * @param folderId - Folder ID
   * @internal
   * @documentationMaturity preview
   * @requiredField folderId
   * @permissionId AUTOCMS.FOLDER_UPDATE
   * @adminMethod
   * @deprecated
   * @replacedBy UpdateFolderDetails
   * @targetRemovalDate 2025-01-01
   */
  function updateFolder(folderId: string, options?: UpdateFolderOptions): Promise<UpdateFolderResponse>;
  interface UpdateFolderOptions {
      /** Fields to update, partial */
      folderInfo?: FolderInfo;
      /**
       * patch mask, not exposed to JSON
       * @internal
       */
      mask?: string[];
  }
  /**
   * Update nested folder details.
   * Root folder can't be updated.
   *
   * Error codes:
   * - `FOLDER_NOT_FOUND` in case if folder does not exists
   * @param folderId - Folder ID
   * @public
   * @documentationMaturity preview
   * @requiredField folderId
   * @permissionId AUTOCMS.FOLDER_UPDATE
   * @adminMethod
   */
  function updateFolderDetails(folderId: string, options?: UpdateFolderDetailsOptions): Promise<UpdateFolderDetailsResponse>;
  interface UpdateFolderDetailsOptions {
      /** Fields to update, partial */
      folderDetails?: FolderDetails;
      /**
       * patch mask, not exposed to JSON
       * @internal
       */
      mask?: string[];
  }
  /**
   * Delete nested folder.
   * - any nested folder would be deleted recursively
   * - any shortcut collection references will be deleted
   * - any non-shortcut collection references will be moved to root folder
   * Root folder can't be deleted.
   *
   * Error codes:
   * - `COLLECTION_REFERENCE_EXISTS` when non-shortcut collection reference from removed tree conflicts with existing reference in the root
   * @param folderId - folder ID to delete
   * @public
   * @documentationMaturity preview
   * @requiredField folderId
   * @permissionId AUTOCMS.FOLDER_DELETE
   * @adminMethod
   */
  function deleteFolder(folderId: string): Promise<void>;
  /**
   * Move nested folder to different parent with all it's contents
   *
   * Error codes:
   * - `FOLDER_NOT_FOUND` in case if folder with given ID does not exists
   * @param folderId - folder ID to move
   * @public
   * @documentationMaturity preview
   * @requiredField folderId
   * @permissionId AUTOCMS.FOLDER_MOVE
   * @adminMethod
   */
  function moveFolder(folderId: string, options?: MoveFolderOptions): Promise<void>;
  interface MoveFolderOptions {
      /** destination folder ID (new parent), none if root */
      parentFolderId?: string | null;
  }
  /**
   * Create collection reference.
   * If reference is non-shortcut it is moved from previous location.
   * @param collectionName - collection name to reference (ID)
   * @internal
   * @documentationMaturity preview
   * @requiredField collectionName
   * @permissionId AUTOCMS.FOLDER_REFERENCE
   * @adminMethod
   * @deprecated
   * @replacedBy CreateCollectionReference
   * @targetRemovalDate 2025-01-01
   */
  function referenceCollection(collectionName: string, options?: ReferenceCollectionOptions): Promise<ReferenceCollectionResponse>;
  interface ReferenceCollectionOptions {
      /** target folder ID or none if root */
      folderId?: string | null;
      /**
       * if false then single non-shortcut reference to this
       * collection is moved to target folder
       * otherwise new shortcut reference is created
       * @internal
       */
      shortcut?: boolean;
      /**
       * additional information for shortcut reference
       * ignored for non-shortcut reference
       * @internal
       */
      info?: Record<string, any> | null;
  }
  /**
   * Create collection reference.
   * If reference is non-shortcut it is moved from previous location.
   *
   * Error codes:
   * - `FOLDER_NOT_FOUND` in case if folder with given ID does not exists
   * - `COLLECTION_REFERENCE_EXISTS` when reference to same collection already exists in the folder
   * @param collectionReference - Collection reference to create
   * @public
   * @documentationMaturity preview
   * @requiredField collectionReference
   * @requiredField collectionReference.collectionName
   * @permissionId AUTOCMS.FOLDER_REFERENCE
   * @adminMethod
   */
  function createCollectionReference(collectionReference: CollectionReference): Promise<CreateCollectionReferenceResponse>;
  /**
   * Return all references to given collection.
   * @param collectionName - collection name (ID) to get
   * @internal
   * @documentationMaturity preview
   * @requiredField collectionName
   * @permissionId AUTOCMS.FOLDER_READ
   * @adminMethod
   * @deprecated
   * @replacedBy GetCollectionReferences
   * @targetRemovalDate 2025-01-01
   */
  function getReferences(collectionName: string, options?: GetReferencesOptions): Promise<GetReferencesResponse>;
  interface GetReferencesOptions {
      /**
       * if true schema would not be loaded and reference may not be found if collection is in root folder
       * loading schema has performance impact
       * @internal
       * @deprecated
       * @targetRemovalDate 2025-01-01
       */
      skipSchemas?: boolean;
  }
  /**
   * Update reference info.
   * @internal
   * @documentationMaturity preview
   * @requiredField options.collectionName
   * @permissionId AUTOCMS.FOLDER_UPDATE_REFERENCE
   * @adminMethod
   * @deprecated
   * @replacedBy UpdateCollectionReference
   * @targetRemovalDate 2025-01-01
   */
  function updateReferenceInfo(options?: UpdateReferenceInfoOptions): Promise<UpdateReferenceInfoResponse>;
  interface UpdateReferenceInfoOptions {
      /** folder where reference is located, none for root */
      folderId?: string | null;
      /** referenced collection name (ID) */
      collectionName: string;
      /** additional information to set */
      info?: Record<string, any> | null;
  }
  /**
   * Delete shortcut reference.
   * @param collectionName - collection name (ID) to delete
   * @internal
   * @documentationMaturity preview
   * @requiredField collectionName
   * @permissionId AUTOCMS.FOLDER_DELETE_REFERENCE
   * @adminMethod
   * @deprecated
   * @replacedBy DeleteCollectionReference
   * @targetRemovalDate 2025-01-01
   */
  function deleteReference(collectionName: string, options?: DeleteReferenceOptions): Promise<void>;
  interface DeleteReferenceOptions {
      /** folder ID where to delete reference or none if root */
      folderId?: string | null;
  }
  /**
   * Return all references to given collection.
   * @param collectionName - collection ID to get
   * @public
   * @documentationMaturity preview
   * @requiredField collectionName
   * @permissionId AUTOCMS.FOLDER_READ
   * @adminMethod
   */
  function getCollectionReferences(collectionName: string): Promise<GetCollectionReferencesResponse>;
  /**
   * Update reference info.
   *
   * Error codes:
   * - `REFERENCE_NOT_FOUND` in case if reference to that collection in a folder doesn't exist
   * @param collectionReference - Collection reference to update
   * @internal
   * @documentationMaturity preview
   * @requiredField collectionReference
   * @requiredField collectionReference.collectionName
   * @permissionId AUTOCMS.FOLDER_UPDATE_REFERENCE
   * @adminMethod
   */
  function updateCollectionReference(collectionReference: CollectionReference): Promise<UpdateCollectionReferenceResponse>;
  /**
   * Delete shortcut reference.
   *
   * Error codes:
   * - `REFERENCE_NOT_FOUND` when reference is not found
   * - `NOT_A_SHORTCUT` when trying to delete non-shortcut reference
   * @param collectionName - collection name (ID) to delete
   * @public
   * @documentationMaturity preview
   * @requiredField collectionName
   * @permissionId AUTOCMS.FOLDER_DELETE_REFERENCE
   * @adminMethod
   */
  function deleteCollectionReference(collectionName: string, options?: DeleteCollectionReferenceOptions): Promise<void>;
  interface DeleteCollectionReferenceOptions {
      /** folder ID where to delete reference or none if root */
      folderId?: string | null;
  }
  /**
   * Search folders and collections by name.
   * @public
   * @documentationMaturity preview
   * @permissionId AUTOCMS.FOLDER_SEARCH
   * @adminMethod
   */
  function search(options?: SearchOptions): Promise<SearchResponse>;
  interface SearchOptions {
      /**
       * Search string, matched ignoring case
       * @internal
       * @deprecated
       * @replacedBy keyword
       * @targetRemovalDate 2025-01-01
       */
      searchTerm?: string;
      /** Search string, matched ignoring case */
      keyword?: string;
  }
  
  type cloudAutocmsV1Folder_universal_d_Folder = Folder;
  type cloudAutocmsV1Folder_universal_d_CollectionReference = CollectionReference;
  type cloudAutocmsV1Folder_universal_d_GetFolderRequest = GetFolderRequest;
  type cloudAutocmsV1Folder_universal_d_GetFolderResponse = GetFolderResponse;
  type cloudAutocmsV1Folder_universal_d_CreateFolderRequest = CreateFolderRequest;
  type cloudAutocmsV1Folder_universal_d_FolderInfo = FolderInfo;
  type cloudAutocmsV1Folder_universal_d_FolderDetails = FolderDetails;
  type cloudAutocmsV1Folder_universal_d_CreateFolderResponse = CreateFolderResponse;
  type cloudAutocmsV1Folder_universal_d_UpdateFolderRequest = UpdateFolderRequest;
  type cloudAutocmsV1Folder_universal_d_UpdateFolderResponse = UpdateFolderResponse;
  type cloudAutocmsV1Folder_universal_d_UpdateFolderDetailsRequest = UpdateFolderDetailsRequest;
  type cloudAutocmsV1Folder_universal_d_UpdateFolderDetailsResponse = UpdateFolderDetailsResponse;
  type cloudAutocmsV1Folder_universal_d_DeleteFolderRequest = DeleteFolderRequest;
  type cloudAutocmsV1Folder_universal_d_DeleteFolderResponse = DeleteFolderResponse;
  type cloudAutocmsV1Folder_universal_d_MoveFolderRequest = MoveFolderRequest;
  type cloudAutocmsV1Folder_universal_d_MoveFolderResponse = MoveFolderResponse;
  type cloudAutocmsV1Folder_universal_d_ReferenceCollectionRequest = ReferenceCollectionRequest;
  type cloudAutocmsV1Folder_universal_d_ReferenceCollectionResponse = ReferenceCollectionResponse;
  type cloudAutocmsV1Folder_universal_d_CreateCollectionReferenceRequest = CreateCollectionReferenceRequest;
  type cloudAutocmsV1Folder_universal_d_CreateCollectionReferenceResponse = CreateCollectionReferenceResponse;
  type cloudAutocmsV1Folder_universal_d_GetReferencesRequest = GetReferencesRequest;
  type cloudAutocmsV1Folder_universal_d_GetReferencesResponse = GetReferencesResponse;
  type cloudAutocmsV1Folder_universal_d_ReferenceLocation = ReferenceLocation;
  type cloudAutocmsV1Folder_universal_d_UpdateReferenceInfoRequest = UpdateReferenceInfoRequest;
  type cloudAutocmsV1Folder_universal_d_UpdateReferenceInfoResponse = UpdateReferenceInfoResponse;
  type cloudAutocmsV1Folder_universal_d_DeleteReferenceRequest = DeleteReferenceRequest;
  type cloudAutocmsV1Folder_universal_d_DeleteReferenceResponse = DeleteReferenceResponse;
  type cloudAutocmsV1Folder_universal_d_GetCollectionReferencesRequest = GetCollectionReferencesRequest;
  type cloudAutocmsV1Folder_universal_d_GetCollectionReferencesResponse = GetCollectionReferencesResponse;
  type cloudAutocmsV1Folder_universal_d_UpdateCollectionReferenceRequest = UpdateCollectionReferenceRequest;
  type cloudAutocmsV1Folder_universal_d_UpdateCollectionReferenceResponse = UpdateCollectionReferenceResponse;
  type cloudAutocmsV1Folder_universal_d_DeleteCollectionReferenceRequest = DeleteCollectionReferenceRequest;
  type cloudAutocmsV1Folder_universal_d_DeleteCollectionReferenceResponse = DeleteCollectionReferenceResponse;
  type cloudAutocmsV1Folder_universal_d_SearchRequest = SearchRequest;
  type cloudAutocmsV1Folder_universal_d_SearchResponse = SearchResponse;
  type cloudAutocmsV1Folder_universal_d_DomainEvent = DomainEvent;
  type cloudAutocmsV1Folder_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type cloudAutocmsV1Folder_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type cloudAutocmsV1Folder_universal_d_RestoreInfo = RestoreInfo;
  type cloudAutocmsV1Folder_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type cloudAutocmsV1Folder_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type cloudAutocmsV1Folder_universal_d_ActionEvent = ActionEvent;
  type cloudAutocmsV1Folder_universal_d_Empty = Empty;
  type cloudAutocmsV1Folder_universal_d_MetaSiteSpecialEvent = MetaSiteSpecialEvent;
  type cloudAutocmsV1Folder_universal_d_MetaSiteSpecialEventPayloadOneOf = MetaSiteSpecialEventPayloadOneOf;
  type cloudAutocmsV1Folder_universal_d_Asset = Asset;
  type cloudAutocmsV1Folder_universal_d_State = State;
  const cloudAutocmsV1Folder_universal_d_State: typeof State;
  type cloudAutocmsV1Folder_universal_d_SiteCreated = SiteCreated;
  type cloudAutocmsV1Folder_universal_d_SiteCreatedContext = SiteCreatedContext;
  const cloudAutocmsV1Folder_universal_d_SiteCreatedContext: typeof SiteCreatedContext;
  type cloudAutocmsV1Folder_universal_d_Namespace = Namespace;
  const cloudAutocmsV1Folder_universal_d_Namespace: typeof Namespace;
  type cloudAutocmsV1Folder_universal_d_SiteTransferred = SiteTransferred;
  type cloudAutocmsV1Folder_universal_d_SiteDeleted = SiteDeleted;
  type cloudAutocmsV1Folder_universal_d_DeleteContext = DeleteContext;
  type cloudAutocmsV1Folder_universal_d_DeleteStatus = DeleteStatus;
  const cloudAutocmsV1Folder_universal_d_DeleteStatus: typeof DeleteStatus;
  type cloudAutocmsV1Folder_universal_d_SiteUndeleted = SiteUndeleted;
  type cloudAutocmsV1Folder_universal_d_SitePublished = SitePublished;
  type cloudAutocmsV1Folder_universal_d_SiteUnpublished = SiteUnpublished;
  type cloudAutocmsV1Folder_universal_d_SiteMarkedAsTemplate = SiteMarkedAsTemplate;
  type cloudAutocmsV1Folder_universal_d_SiteMarkedAsWixSite = SiteMarkedAsWixSite;
  type cloudAutocmsV1Folder_universal_d_ServiceProvisioned = ServiceProvisioned;
  type cloudAutocmsV1Folder_universal_d_ServiceRemoved = ServiceRemoved;
  type cloudAutocmsV1Folder_universal_d_SiteRenamed = SiteRenamed;
  type cloudAutocmsV1Folder_universal_d_SiteHardDeleted = SiteHardDeleted;
  type cloudAutocmsV1Folder_universal_d_NamespaceChanged = NamespaceChanged;
  type cloudAutocmsV1Folder_universal_d_StudioAssigned = StudioAssigned;
  type cloudAutocmsV1Folder_universal_d_StudioUnassigned = StudioUnassigned;
  type cloudAutocmsV1Folder_universal_d_MessageEnvelope = MessageEnvelope;
  type cloudAutocmsV1Folder_universal_d_IdentificationData = IdentificationData;
  type cloudAutocmsV1Folder_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type cloudAutocmsV1Folder_universal_d_WebhookIdentityType = WebhookIdentityType;
  const cloudAutocmsV1Folder_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const cloudAutocmsV1Folder_universal_d_getFolder: typeof getFolder;
  type cloudAutocmsV1Folder_universal_d_GetFolderOptions = GetFolderOptions;
  const cloudAutocmsV1Folder_universal_d_createFolder: typeof createFolder;
  type cloudAutocmsV1Folder_universal_d_CreateFolderOptions = CreateFolderOptions;
  const cloudAutocmsV1Folder_universal_d_updateFolder: typeof updateFolder;
  type cloudAutocmsV1Folder_universal_d_UpdateFolderOptions = UpdateFolderOptions;
  const cloudAutocmsV1Folder_universal_d_updateFolderDetails: typeof updateFolderDetails;
  type cloudAutocmsV1Folder_universal_d_UpdateFolderDetailsOptions = UpdateFolderDetailsOptions;
  const cloudAutocmsV1Folder_universal_d_deleteFolder: typeof deleteFolder;
  const cloudAutocmsV1Folder_universal_d_moveFolder: typeof moveFolder;
  type cloudAutocmsV1Folder_universal_d_MoveFolderOptions = MoveFolderOptions;
  const cloudAutocmsV1Folder_universal_d_referenceCollection: typeof referenceCollection;
  type cloudAutocmsV1Folder_universal_d_ReferenceCollectionOptions = ReferenceCollectionOptions;
  const cloudAutocmsV1Folder_universal_d_createCollectionReference: typeof createCollectionReference;
  const cloudAutocmsV1Folder_universal_d_getReferences: typeof getReferences;
  type cloudAutocmsV1Folder_universal_d_GetReferencesOptions = GetReferencesOptions;
  const cloudAutocmsV1Folder_universal_d_updateReferenceInfo: typeof updateReferenceInfo;
  type cloudAutocmsV1Folder_universal_d_UpdateReferenceInfoOptions = UpdateReferenceInfoOptions;
  const cloudAutocmsV1Folder_universal_d_deleteReference: typeof deleteReference;
  type cloudAutocmsV1Folder_universal_d_DeleteReferenceOptions = DeleteReferenceOptions;
  const cloudAutocmsV1Folder_universal_d_getCollectionReferences: typeof getCollectionReferences;
  const cloudAutocmsV1Folder_universal_d_updateCollectionReference: typeof updateCollectionReference;
  const cloudAutocmsV1Folder_universal_d_deleteCollectionReference: typeof deleteCollectionReference;
  type cloudAutocmsV1Folder_universal_d_DeleteCollectionReferenceOptions = DeleteCollectionReferenceOptions;
  const cloudAutocmsV1Folder_universal_d_search: typeof search;
  type cloudAutocmsV1Folder_universal_d_SearchOptions = SearchOptions;
  namespace cloudAutocmsV1Folder_universal_d {
    export {
      cloudAutocmsV1Folder_universal_d_Folder as Folder,
      cloudAutocmsV1Folder_universal_d_CollectionReference as CollectionReference,
      cloudAutocmsV1Folder_universal_d_GetFolderRequest as GetFolderRequest,
      cloudAutocmsV1Folder_universal_d_GetFolderResponse as GetFolderResponse,
      cloudAutocmsV1Folder_universal_d_CreateFolderRequest as CreateFolderRequest,
      cloudAutocmsV1Folder_universal_d_FolderInfo as FolderInfo,
      cloudAutocmsV1Folder_universal_d_FolderDetails as FolderDetails,
      cloudAutocmsV1Folder_universal_d_CreateFolderResponse as CreateFolderResponse,
      cloudAutocmsV1Folder_universal_d_UpdateFolderRequest as UpdateFolderRequest,
      cloudAutocmsV1Folder_universal_d_UpdateFolderResponse as UpdateFolderResponse,
      cloudAutocmsV1Folder_universal_d_UpdateFolderDetailsRequest as UpdateFolderDetailsRequest,
      cloudAutocmsV1Folder_universal_d_UpdateFolderDetailsResponse as UpdateFolderDetailsResponse,
      cloudAutocmsV1Folder_universal_d_DeleteFolderRequest as DeleteFolderRequest,
      cloudAutocmsV1Folder_universal_d_DeleteFolderResponse as DeleteFolderResponse,
      cloudAutocmsV1Folder_universal_d_MoveFolderRequest as MoveFolderRequest,
      cloudAutocmsV1Folder_universal_d_MoveFolderResponse as MoveFolderResponse,
      cloudAutocmsV1Folder_universal_d_ReferenceCollectionRequest as ReferenceCollectionRequest,
      cloudAutocmsV1Folder_universal_d_ReferenceCollectionResponse as ReferenceCollectionResponse,
      cloudAutocmsV1Folder_universal_d_CreateCollectionReferenceRequest as CreateCollectionReferenceRequest,
      cloudAutocmsV1Folder_universal_d_CreateCollectionReferenceResponse as CreateCollectionReferenceResponse,
      cloudAutocmsV1Folder_universal_d_GetReferencesRequest as GetReferencesRequest,
      cloudAutocmsV1Folder_universal_d_GetReferencesResponse as GetReferencesResponse,
      cloudAutocmsV1Folder_universal_d_ReferenceLocation as ReferenceLocation,
      cloudAutocmsV1Folder_universal_d_UpdateReferenceInfoRequest as UpdateReferenceInfoRequest,
      cloudAutocmsV1Folder_universal_d_UpdateReferenceInfoResponse as UpdateReferenceInfoResponse,
      cloudAutocmsV1Folder_universal_d_DeleteReferenceRequest as DeleteReferenceRequest,
      cloudAutocmsV1Folder_universal_d_DeleteReferenceResponse as DeleteReferenceResponse,
      cloudAutocmsV1Folder_universal_d_GetCollectionReferencesRequest as GetCollectionReferencesRequest,
      cloudAutocmsV1Folder_universal_d_GetCollectionReferencesResponse as GetCollectionReferencesResponse,
      cloudAutocmsV1Folder_universal_d_UpdateCollectionReferenceRequest as UpdateCollectionReferenceRequest,
      cloudAutocmsV1Folder_universal_d_UpdateCollectionReferenceResponse as UpdateCollectionReferenceResponse,
      cloudAutocmsV1Folder_universal_d_DeleteCollectionReferenceRequest as DeleteCollectionReferenceRequest,
      cloudAutocmsV1Folder_universal_d_DeleteCollectionReferenceResponse as DeleteCollectionReferenceResponse,
      cloudAutocmsV1Folder_universal_d_SearchRequest as SearchRequest,
      cloudAutocmsV1Folder_universal_d_SearchResponse as SearchResponse,
      cloudAutocmsV1Folder_universal_d_DomainEvent as DomainEvent,
      cloudAutocmsV1Folder_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      cloudAutocmsV1Folder_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      cloudAutocmsV1Folder_universal_d_RestoreInfo as RestoreInfo,
      cloudAutocmsV1Folder_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      cloudAutocmsV1Folder_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      cloudAutocmsV1Folder_universal_d_ActionEvent as ActionEvent,
      cloudAutocmsV1Folder_universal_d_Empty as Empty,
      cloudAutocmsV1Folder_universal_d_MetaSiteSpecialEvent as MetaSiteSpecialEvent,
      cloudAutocmsV1Folder_universal_d_MetaSiteSpecialEventPayloadOneOf as MetaSiteSpecialEventPayloadOneOf,
      cloudAutocmsV1Folder_universal_d_Asset as Asset,
      cloudAutocmsV1Folder_universal_d_State as State,
      cloudAutocmsV1Folder_universal_d_SiteCreated as SiteCreated,
      cloudAutocmsV1Folder_universal_d_SiteCreatedContext as SiteCreatedContext,
      cloudAutocmsV1Folder_universal_d_Namespace as Namespace,
      cloudAutocmsV1Folder_universal_d_SiteTransferred as SiteTransferred,
      cloudAutocmsV1Folder_universal_d_SiteDeleted as SiteDeleted,
      cloudAutocmsV1Folder_universal_d_DeleteContext as DeleteContext,
      cloudAutocmsV1Folder_universal_d_DeleteStatus as DeleteStatus,
      cloudAutocmsV1Folder_universal_d_SiteUndeleted as SiteUndeleted,
      cloudAutocmsV1Folder_universal_d_SitePublished as SitePublished,
      cloudAutocmsV1Folder_universal_d_SiteUnpublished as SiteUnpublished,
      cloudAutocmsV1Folder_universal_d_SiteMarkedAsTemplate as SiteMarkedAsTemplate,
      cloudAutocmsV1Folder_universal_d_SiteMarkedAsWixSite as SiteMarkedAsWixSite,
      cloudAutocmsV1Folder_universal_d_ServiceProvisioned as ServiceProvisioned,
      cloudAutocmsV1Folder_universal_d_ServiceRemoved as ServiceRemoved,
      cloudAutocmsV1Folder_universal_d_SiteRenamed as SiteRenamed,
      cloudAutocmsV1Folder_universal_d_SiteHardDeleted as SiteHardDeleted,
      cloudAutocmsV1Folder_universal_d_NamespaceChanged as NamespaceChanged,
      cloudAutocmsV1Folder_universal_d_StudioAssigned as StudioAssigned,
      cloudAutocmsV1Folder_universal_d_StudioUnassigned as StudioUnassigned,
      cloudAutocmsV1Folder_universal_d_MessageEnvelope as MessageEnvelope,
      cloudAutocmsV1Folder_universal_d_IdentificationData as IdentificationData,
      cloudAutocmsV1Folder_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      cloudAutocmsV1Folder_universal_d_WebhookIdentityType as WebhookIdentityType,
      cloudAutocmsV1Folder_universal_d_getFolder as getFolder,
      cloudAutocmsV1Folder_universal_d_GetFolderOptions as GetFolderOptions,
      cloudAutocmsV1Folder_universal_d_createFolder as createFolder,
      cloudAutocmsV1Folder_universal_d_CreateFolderOptions as CreateFolderOptions,
      cloudAutocmsV1Folder_universal_d_updateFolder as updateFolder,
      cloudAutocmsV1Folder_universal_d_UpdateFolderOptions as UpdateFolderOptions,
      cloudAutocmsV1Folder_universal_d_updateFolderDetails as updateFolderDetails,
      cloudAutocmsV1Folder_universal_d_UpdateFolderDetailsOptions as UpdateFolderDetailsOptions,
      cloudAutocmsV1Folder_universal_d_deleteFolder as deleteFolder,
      cloudAutocmsV1Folder_universal_d_moveFolder as moveFolder,
      cloudAutocmsV1Folder_universal_d_MoveFolderOptions as MoveFolderOptions,
      cloudAutocmsV1Folder_universal_d_referenceCollection as referenceCollection,
      cloudAutocmsV1Folder_universal_d_ReferenceCollectionOptions as ReferenceCollectionOptions,
      cloudAutocmsV1Folder_universal_d_createCollectionReference as createCollectionReference,
      cloudAutocmsV1Folder_universal_d_getReferences as getReferences,
      cloudAutocmsV1Folder_universal_d_GetReferencesOptions as GetReferencesOptions,
      cloudAutocmsV1Folder_universal_d_updateReferenceInfo as updateReferenceInfo,
      cloudAutocmsV1Folder_universal_d_UpdateReferenceInfoOptions as UpdateReferenceInfoOptions,
      cloudAutocmsV1Folder_universal_d_deleteReference as deleteReference,
      cloudAutocmsV1Folder_universal_d_DeleteReferenceOptions as DeleteReferenceOptions,
      cloudAutocmsV1Folder_universal_d_getCollectionReferences as getCollectionReferences,
      cloudAutocmsV1Folder_universal_d_updateCollectionReference as updateCollectionReference,
      cloudAutocmsV1Folder_universal_d_deleteCollectionReference as deleteCollectionReference,
      cloudAutocmsV1Folder_universal_d_DeleteCollectionReferenceOptions as DeleteCollectionReferenceOptions,
      cloudAutocmsV1Folder_universal_d_search as search,
      cloudAutocmsV1Folder_universal_d_SearchOptions as SearchOptions,
    };
  }
  
  export { cloudAutocmsV1Folder_universal_d as autocms };
}
