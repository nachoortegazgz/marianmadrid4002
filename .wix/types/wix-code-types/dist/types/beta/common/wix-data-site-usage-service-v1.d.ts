declare module "wix-data-site-usage-service-v1" {
  /** SiteDataUsage describes site-wide resource limits and usage */
  interface SiteDataUsage {
      /**
       * Storage limit in bytes. Used storage for LIVE and SANDBOX is counted together towards the limit. For example given
       * 1 GB limit LIVE environment could contain 700 MB and SANDBOX 300 MB before limit is reached.
       */
      storageLimitInBytes?: string | null;
      /**
       * Max number of items allowed. Limit is applied separately to LIVE and SANDBOX environments, that is if limit is 1000 items,
       * both LIVE and SANDBOX environments are allowed to contain 1000 items each.
       */
      itemCountLimit?: string | null;
      /** Max number of native collections allowed */
      collectionCountLimit?: number | null;
      /** Total number of native collections created */
      collectionCount?: number | null;
      /** Current usage of all collections in LIVE environment */
      totalUsedLive?: Usage;
      /** Current usage of all collections in SANDBOX environment */
      totalUsedSandbox?: Usage;
      /** Usages per data collection */
      dataCollectionUsages?: DataCollectionUsage[];
  }
  interface Usage {
      /** Number of bytes */
      bytes?: string;
      /** Number of items */
      items?: string;
  }
  interface DataCollectionUsage {
      /** Data Collection ID */
      dataCollectionId?: string;
      /** Data Collection display name */
      displayName?: string | null;
      /** Type of data collection, currently only NATIVE are returned in this API */
      dataCollectionType?: CollectionType;
      /** Current usage in LIVE environment */
      totalUsedLive?: Usage;
      /** Current usage in SANDBOX environment */
      totalUsedSandbox?: Usage;
  }
  enum CollectionType {
      /** User-created collection. */
      NATIVE = "NATIVE",
      /** [Collection](https://support.wix.com/en/article/velo-working-with-wix-app-collections-and-code#what-are-wix-app-collections) created by a Wix app when it is installed. This type of collection can be modified dynamically by that app (for example, Wix Forms). */
      WIX_APP = "WIX_APP",
      /** Collection created by a Wix Blocks app. */
      BLOCKS_APP = "BLOCKS_APP",
      /** Collection located in externally connected storage. */
      EXTERNAL = "EXTERNAL"
  }
  interface GetSiteDataUsageRequest {
      /** SiteDataUsage fields to return, if empty all are returned */
      fields?: string[];
      /** If true, operation queries collections for up-to-date values (rather than using cached values) */
      consistentRead?: boolean;
  }
  interface GetSiteDataUsageResponse {
      /** The retrieved SiteDataUsage */
      siteDataUsage?: SiteDataUsage;
  }
  interface BulkUpdateUsagesRequest {
      /** Usages to update */
      updates?: InstanceUsageUpdate[];
  }
  interface DataCollectionUsageUpdate {
      /** Data Collection ID */
      dataCollectionId?: string;
      /** if true present values are added to existing, otherwise values are replaced */
      relative?: boolean;
      /** Data Collection item count in the live environment */
      liveItemCount?: string | null;
      /** Data Collection item count in the sandbox environment */
      sandboxItemCount?: string | null;
      /** Data Collection used storage in bytes in the live environment */
      liveUsedStorageInBytes?: string | null;
      /** Data Collection used storage in bytes in the sandbox environment */
      sandboxUsedStorageInBytes?: string | null;
  }
  enum Segment {
      BOTH = "BOTH",
      LIVE = "LIVE",
      SANDBOX = "SANDBOX"
  }
  interface InstanceUsageUpdate {
      /** Data Instance ID */
      instanceId?: string;
      /** Usage updates per collection */
      collections?: DataCollectionUsageUpdate[];
      /** if true all collections not in the list assumed to have 0 usage */
      allCollectionsPresent?: boolean;
      /** Indicates which segment is being updated */
      segment?: Segment;
  }
  interface BulkUpdateUsagesResponse {
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
  interface DataChangeEvent extends DataChangeEventEventOneOf {
      dataChanged?: DataChanged;
      /** resume point is lost so some changes may be lost */
      changesLost?: ChangesLost;
      referenceChanged?: ReferenceChanged;
      /** segment access or mapping changed */
      segmentChanged?: SegmentChanged;
      /** segment migration started to new physical location */
      segmentMigrationStarted?: SegmentMigrationStarted;
      idempotenceKey?: string;
  }
  /** @oneof */
  interface DataChangeEventEventOneOf {
      dataChanged?: DataChanged;
      /** resume point is lost so some changes may be lost */
      changesLost?: ChangesLost;
      referenceChanged?: ReferenceChanged;
      /** segment access or mapping changed */
      segmentChanged?: SegmentChanged;
      /** segment migration started to new physical location */
      segmentMigrationStarted?: SegmentMigrationStarted;
  }
  interface DataChanged extends DataChangedChangeOneOf {
      /** inserted document */
      inserted?: Record<string, any> | null;
      /** full replaced document */
      replaced?: Record<string, any> | null;
      /** partial update, removed fields are set to Empty */
      partial?: Record<string, any> | null;
      /** deleted document ID */
      removedId?: string;
      /** physical cluster ID */
      clusterId?: string;
      /**
       * physical source
       * db.collection for MongoDB
       */
      source?: string;
      /** instance ID */
      tenantId?: string;
      /** logical collection name */
      collectionName?: string;
      dataStore?: DataStore;
      documentId?: string;
      clusterTime?: Date | null;
      /** raw resume token BSON */
      resumeToken?: string;
      /** Initiator of the request */
      initiator?: Initiator;
      /** Identity of the user who initiated the request */
      writer?: Identity;
  }
  /** @oneof */
  interface DataChangedChangeOneOf {
      /** inserted document */
      inserted?: Record<string, any> | null;
      /** full replaced document */
      replaced?: Record<string, any> | null;
      /** partial update, removed fields are set to Empty */
      partial?: Record<string, any> | null;
      /** deleted document ID */
      removedId?: string;
  }
  enum Type {
      /** Initiator is unknown */
      Unknown = "Unknown",
      /** Indicated that write has been initiated by SSR indexer */
      SsrIndexer = "SsrIndexer"
  }
  enum DataStore {
      Dev = "Dev",
      Public = "Public"
  }
  interface Initiator {
      type?: Type;
  }
  interface Identity {
      /** User ID, when the request is initiated by a user */
      userId?: string | null;
      /** Member ID, when the request is initiated by a member */
      memberId?: string | null;
      /** Visitor ID, when the request is initiated by a visitor */
      visitorId?: string | null;
      /** External App ID, when the request is initiated by an external app */
      externalAppId?: string | null;
      /** Service ID, when the request is initiated by a service */
      serviceId?: string | null;
  }
  interface ChangesLost {
      clusterId?: string;
  }
  interface ReferenceChanged {
      /** physical cluster ID */
      clusterId?: string;
      /**
       * physical source
       * db.collection for MongoDB
       */
      source?: string;
      /** instance ID */
      tenantId?: string;
      dataStore?: DataStore;
      relationshipName?: string;
      leftId?: string;
      rightId?: string;
      /** if reference is set or unset */
      isRemoved?: boolean;
      clusterTime?: Date | null;
      /** raw resume token BSON */
      resumeToken?: string;
      /** ref created date */
      createdAt?: Date | null;
  }
  interface SegmentChanged {
      /** physical cluster ID */
      clusterId?: string;
      /**
       * physical source
       * db.collection for MongoDB
       */
      source?: string;
      /** instance ID */
      tenantId?: string;
      /** segment */
      dataStore?: DataStore;
      /** new db name if changed */
      newDatabase?: string | null;
      /** new cluster if changed */
      newClusterId?: string | null;
      /** read permissions if changed */
      readsEnabled?: boolean | null;
      /** write permissions if changed */
      writesEnabled?: boolean | null;
      /** event time */
      clusterTime?: Date | null;
      /** raw resume token BSON */
      resumeToken?: string;
  }
  interface SegmentMigrationStarted {
      /** physical cluster ID */
      clusterId?: string;
      /**
       * physical source
       * db.collection for MongoDB
       */
      source?: string;
      /** instance ID */
      tenantId?: string;
      /** segment */
      dataStore?: DataStore;
      /** new db name if changed */
      newDatabase?: string;
      /** new cluster if changed */
      newClusterId?: string;
      /** event time */
      clusterTime?: Date | null;
      /** raw resume token BSON */
      resumeToken?: string;
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
   * Get current site data usage
   * @internal
   * @documentationMaturity preview
   * @permissionId WIX_DATA.SITE_DATA_USAGE_READ
   * @adminMethod
   */
  function getSiteDataUsage(options?: GetSiteDataUsageOptions): Promise<GetSiteDataUsageResponse>;
  interface GetSiteDataUsageOptions {
      /** SiteDataUsage fields to return, if empty all are returned */
      fields?: string[];
      /** If true, operation queries collections for up-to-date values (rather than using cached values) */
      consistentRead?: boolean;
  }
  
  type cloudDataUsageV1SiteDataUsage_universal_d_SiteDataUsage = SiteDataUsage;
  type cloudDataUsageV1SiteDataUsage_universal_d_Usage = Usage;
  type cloudDataUsageV1SiteDataUsage_universal_d_DataCollectionUsage = DataCollectionUsage;
  type cloudDataUsageV1SiteDataUsage_universal_d_CollectionType = CollectionType;
  const cloudDataUsageV1SiteDataUsage_universal_d_CollectionType: typeof CollectionType;
  type cloudDataUsageV1SiteDataUsage_universal_d_GetSiteDataUsageRequest = GetSiteDataUsageRequest;
  type cloudDataUsageV1SiteDataUsage_universal_d_GetSiteDataUsageResponse = GetSiteDataUsageResponse;
  type cloudDataUsageV1SiteDataUsage_universal_d_BulkUpdateUsagesRequest = BulkUpdateUsagesRequest;
  type cloudDataUsageV1SiteDataUsage_universal_d_DataCollectionUsageUpdate = DataCollectionUsageUpdate;
  type cloudDataUsageV1SiteDataUsage_universal_d_Segment = Segment;
  const cloudDataUsageV1SiteDataUsage_universal_d_Segment: typeof Segment;
  type cloudDataUsageV1SiteDataUsage_universal_d_InstanceUsageUpdate = InstanceUsageUpdate;
  type cloudDataUsageV1SiteDataUsage_universal_d_BulkUpdateUsagesResponse = BulkUpdateUsagesResponse;
  type cloudDataUsageV1SiteDataUsage_universal_d_DomainEvent = DomainEvent;
  type cloudDataUsageV1SiteDataUsage_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type cloudDataUsageV1SiteDataUsage_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type cloudDataUsageV1SiteDataUsage_universal_d_RestoreInfo = RestoreInfo;
  type cloudDataUsageV1SiteDataUsage_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type cloudDataUsageV1SiteDataUsage_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type cloudDataUsageV1SiteDataUsage_universal_d_ActionEvent = ActionEvent;
  type cloudDataUsageV1SiteDataUsage_universal_d_Empty = Empty;
  type cloudDataUsageV1SiteDataUsage_universal_d_DataChangeEvent = DataChangeEvent;
  type cloudDataUsageV1SiteDataUsage_universal_d_DataChangeEventEventOneOf = DataChangeEventEventOneOf;
  type cloudDataUsageV1SiteDataUsage_universal_d_DataChanged = DataChanged;
  type cloudDataUsageV1SiteDataUsage_universal_d_DataChangedChangeOneOf = DataChangedChangeOneOf;
  type cloudDataUsageV1SiteDataUsage_universal_d_Type = Type;
  const cloudDataUsageV1SiteDataUsage_universal_d_Type: typeof Type;
  type cloudDataUsageV1SiteDataUsage_universal_d_DataStore = DataStore;
  const cloudDataUsageV1SiteDataUsage_universal_d_DataStore: typeof DataStore;
  type cloudDataUsageV1SiteDataUsage_universal_d_Initiator = Initiator;
  type cloudDataUsageV1SiteDataUsage_universal_d_Identity = Identity;
  type cloudDataUsageV1SiteDataUsage_universal_d_ChangesLost = ChangesLost;
  type cloudDataUsageV1SiteDataUsage_universal_d_ReferenceChanged = ReferenceChanged;
  type cloudDataUsageV1SiteDataUsage_universal_d_SegmentChanged = SegmentChanged;
  type cloudDataUsageV1SiteDataUsage_universal_d_SegmentMigrationStarted = SegmentMigrationStarted;
  type cloudDataUsageV1SiteDataUsage_universal_d_MessageEnvelope = MessageEnvelope;
  type cloudDataUsageV1SiteDataUsage_universal_d_IdentificationData = IdentificationData;
  type cloudDataUsageV1SiteDataUsage_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type cloudDataUsageV1SiteDataUsage_universal_d_WebhookIdentityType = WebhookIdentityType;
  const cloudDataUsageV1SiteDataUsage_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const cloudDataUsageV1SiteDataUsage_universal_d_getSiteDataUsage: typeof getSiteDataUsage;
  type cloudDataUsageV1SiteDataUsage_universal_d_GetSiteDataUsageOptions = GetSiteDataUsageOptions;
  namespace cloudDataUsageV1SiteDataUsage_universal_d {
    export {
      cloudDataUsageV1SiteDataUsage_universal_d_SiteDataUsage as SiteDataUsage,
      cloudDataUsageV1SiteDataUsage_universal_d_Usage as Usage,
      cloudDataUsageV1SiteDataUsage_universal_d_DataCollectionUsage as DataCollectionUsage,
      cloudDataUsageV1SiteDataUsage_universal_d_CollectionType as CollectionType,
      cloudDataUsageV1SiteDataUsage_universal_d_GetSiteDataUsageRequest as GetSiteDataUsageRequest,
      cloudDataUsageV1SiteDataUsage_universal_d_GetSiteDataUsageResponse as GetSiteDataUsageResponse,
      cloudDataUsageV1SiteDataUsage_universal_d_BulkUpdateUsagesRequest as BulkUpdateUsagesRequest,
      cloudDataUsageV1SiteDataUsage_universal_d_DataCollectionUsageUpdate as DataCollectionUsageUpdate,
      cloudDataUsageV1SiteDataUsage_universal_d_Segment as Segment,
      cloudDataUsageV1SiteDataUsage_universal_d_InstanceUsageUpdate as InstanceUsageUpdate,
      cloudDataUsageV1SiteDataUsage_universal_d_BulkUpdateUsagesResponse as BulkUpdateUsagesResponse,
      cloudDataUsageV1SiteDataUsage_universal_d_DomainEvent as DomainEvent,
      cloudDataUsageV1SiteDataUsage_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      cloudDataUsageV1SiteDataUsage_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      cloudDataUsageV1SiteDataUsage_universal_d_RestoreInfo as RestoreInfo,
      cloudDataUsageV1SiteDataUsage_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      cloudDataUsageV1SiteDataUsage_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      cloudDataUsageV1SiteDataUsage_universal_d_ActionEvent as ActionEvent,
      cloudDataUsageV1SiteDataUsage_universal_d_Empty as Empty,
      cloudDataUsageV1SiteDataUsage_universal_d_DataChangeEvent as DataChangeEvent,
      cloudDataUsageV1SiteDataUsage_universal_d_DataChangeEventEventOneOf as DataChangeEventEventOneOf,
      cloudDataUsageV1SiteDataUsage_universal_d_DataChanged as DataChanged,
      cloudDataUsageV1SiteDataUsage_universal_d_DataChangedChangeOneOf as DataChangedChangeOneOf,
      cloudDataUsageV1SiteDataUsage_universal_d_Type as Type,
      cloudDataUsageV1SiteDataUsage_universal_d_DataStore as DataStore,
      cloudDataUsageV1SiteDataUsage_universal_d_Initiator as Initiator,
      cloudDataUsageV1SiteDataUsage_universal_d_Identity as Identity,
      cloudDataUsageV1SiteDataUsage_universal_d_ChangesLost as ChangesLost,
      cloudDataUsageV1SiteDataUsage_universal_d_ReferenceChanged as ReferenceChanged,
      cloudDataUsageV1SiteDataUsage_universal_d_SegmentChanged as SegmentChanged,
      cloudDataUsageV1SiteDataUsage_universal_d_SegmentMigrationStarted as SegmentMigrationStarted,
      cloudDataUsageV1SiteDataUsage_universal_d_MessageEnvelope as MessageEnvelope,
      cloudDataUsageV1SiteDataUsage_universal_d_IdentificationData as IdentificationData,
      cloudDataUsageV1SiteDataUsage_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      cloudDataUsageV1SiteDataUsage_universal_d_WebhookIdentityType as WebhookIdentityType,
      cloudDataUsageV1SiteDataUsage_universal_d_getSiteDataUsage as getSiteDataUsage,
      cloudDataUsageV1SiteDataUsage_universal_d_GetSiteDataUsageOptions as GetSiteDataUsageOptions,
    };
  }
  
  export { cloudDataUsageV1SiteDataUsage_universal_d as data };
}
