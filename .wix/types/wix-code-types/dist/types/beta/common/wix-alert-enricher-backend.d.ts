declare module "wix-alert-enricher-backend" {
  /** EnrichmentConfig is the main entity of EnrichmentBo */
  interface EnrichmentConfig {
      /** EnrichmentConfig ID */
      _id?: string | null;
      /** Represents the current state of an item. Each time the item is modified, its `revision` changes. for an update operation to succeed, you MUST pass the latest revision */
      revision?: string | null;
      /**
       * Represents the time this EnrichmentConfig was created
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Represents the time this EnrichmentConfig was last updated
       * @readonly
       */
      _updatedDate?: Date | null;
      show?: boolean | null;
      /** implemented bu core / plugin */
      enrichmentSource?: EnrichmentSource;
      /**
       * one of : base definition/ override /merge. merge may only be set by server
       * @readonly
       */
      configurationType?: EnrichmentConfigType;
      /** reserved 9; */
      artifactId?: string | null;
      /** slack channel */
      channel?: string | null;
      /** core: Last-ga-time/ sled-traffic/ top-exceptions plugin: free-text */
      enrichmentType?: EnrichmentType;
      /** app def id defined in dev-center */
      implementorId?: string | null;
      /** user properties for overrides  exp: last GA in X days */
      enrichmentConfigProperties?: Record<string, string>;
      /** free text */
      description?: string | null;
      /** implementer owner buildup or other */
      owner?: string;
      /** owner-ship tag */
      createdBy?: string;
      /** free -text */
      overrideName?: string;
      /** alert type: Error percentage / Unknown */
      alertTypes?: AlertType[];
  }
  enum EnrichmentSource {
      CORE = "CORE",
      PLUGIN = "PLUGIN"
  }
  enum EnrichmentConfigType {
      OVERRIDE = "OVERRIDE",
      BASE_DEFINITION = "BASE_DEFINITION",
      MERGED = "MERGED"
  }
  enum EnrichmentType {
      UNKNOWN = "UNKNOWN",
      LAST_GA_TIME = "LAST_GA_TIME",
      GRAFANA_LINK_TIMESTAMP = "GRAFANA_LINK_TIMESTAMP",
      TOP_EXCEPTIONS = "TOP_EXCEPTIONS",
      SLED_INFO = "SLED_INFO",
      ERROR_BY_METASITE = "ERROR_BY_METASITE",
      DEBUG_PROD = "DEBUG_PROD",
      LAST_EXPERIMENTS_CHANGES = "LAST_EXPERIMENTS_CHANGES",
      LAST_KUBE_CHANGES = "LAST_KUBE_CHANGES",
      APP_HEALTH_CHECK = "APP_HEALTH_CHECK",
      IMMIGRATOR_ACTIVE_MIGRATION = "IMMIGRATOR_ACTIVE_MIGRATION",
      OUTGOING_CALLS_ERROR_RATES = "OUTGOING_CALLS_ERROR_RATES",
      SERVICE_INCOMING_CALLS_ERROR_RATES = "SERVICE_INCOMING_CALLS_ERROR_RATES",
      ACTIVE_RESOURCE_TUNING = "ACTIVE_RESOURCE_TUNING",
      ENDPOINT_CALLERS_ERROR_RATES = "ENDPOINT_CALLERS_ERROR_RATES",
      SINGLE_EXCEPTION_DATA = "SINGLE_EXCEPTION_DATA",
      ACTIVITY_IN_WAR_ROOM = "ACTIVITY_IN_WAR_ROOM",
      PODS_DOMINANT_ERROR_RATES = "PODS_DOMINANT_ERROR_RATES",
      PANORAMA_INFO = "PANORAMA_INFO",
      TRAFFIC_SWITCH = "TRAFFIC_SWITCH",
      PAYMENT_TRANSACTIONS = "PAYMENT_TRANSACTIONS",
      ZIONA = "ZIONA",
      DEAD_LETTER_QUEUE = "DEAD_LETTER_QUEUE"
  }
  enum AlertType {
      UNKNOWN = "UNKNOWN",
      ERROR_PERCENTAGE = "ERROR_PERCENTAGE",
      APP_HEALTH_CHECK = "APP_HEALTH_CHECK",
      KAFKA_LAG_GROWTH = "KAFKA_LAG_GROWTH",
      CPU_THROTTLED = "CPU_THROTTLED",
      POD_OUT_OF_MEMORY = "POD_OUT_OF_MEMORY",
      ENDPOINT_ERROR_RATE = "ENDPOINT_ERROR_RATE",
      SERVICE_ERROR_RATE = "SERVICE_ERROR_RATE",
      ZERO_ERROR_POLICY = "ZERO_ERROR_POLICY",
      PANORAMA = "PANORAMA",
      PAYMENT_PROVIDER = "PAYMENT_PROVIDER",
      JVM_OUT_OF_MEMORY = "JVM_OUT_OF_MEMORY",
      JVM_GC_COLLECTION_TIME = "JVM_GC_COLLECTION_TIME",
      ENDPOINT_WEIGHTED_RESPONSE_TIME = "ENDPOINT_WEIGHTED_RESPONSE_TIME",
      CUSTOM = "CUSTOM",
      DEAD_LETTER_QUEUE = "DEAD_LETTER_QUEUE"
  }
  interface CreateEnrichmentConfigRequest extends CreateEnrichmentConfigRequestCreateWithPropertiesOneOf {
      enrichmentConfigBase?: EnrichmentConfigBase;
      enrichmentConfigOverride?: EnrichmentConfigOverride;
  }
  /** @oneof */
  interface CreateEnrichmentConfigRequestCreateWithPropertiesOneOf {
      enrichmentConfigBase?: EnrichmentConfigBase;
      enrichmentConfigOverride?: EnrichmentConfigOverride;
  }
  interface EnrichmentConfigBase {
      /** implemented by core / plugin */
      enrichmentSource?: EnrichmentSource;
      /** reserve 2 */
      enrichmentType?: EnrichmentType;
      /** app def id defined in dev-center */
      implementorId?: string;
      /** user properties for overrides  exp: last GA in X days */
      enrichmentConfigProperties?: Record<string, string>;
      /** free text */
      description?: string | null;
      /** implementer owner buildup or other */
      owner?: string;
      /** owner tag */
      createdBy?: string;
      /** show enrichment */
      show?: boolean | null;
      /** alert type: Error percentage / Unknown */
      alertTypes?: AlertType[];
  }
  interface EnrichmentConfigOverride {
      /** reserved 9; */
      artifactId?: string | null;
      /** slack channel */
      channel?: string | null;
      enrichmentType?: EnrichmentType;
      /** user properties for overrides  exp: last GA in X days */
      enrichmentConfigProperties?: Record<string, string>;
      /** owner-ship tag */
      createdBy?: string;
      /** free -text */
      overrideName?: string | null;
      show?: boolean | null;
      /** alert type: Error percentage / Unknown */
      alertTypes?: AlertType[];
  }
  interface CreateEnrichmentConfigResponse {
      /** The created EnrichmentConfig */
      enrichmentConfig?: EnrichmentConfig;
  }
  interface GetEnrichmentConfigRequest {
      /** Id of the EnrichmentConfig to retrieve */
      enrichmentConfigId: string;
  }
  interface GetEnrichmentConfigResponse {
      /** The retrieved EnrichmentConfig */
      enrichmentConfig?: EnrichmentConfig;
  }
  interface ListEnrichmentConfigRequest {
      configurationType?: EnrichmentConfigType;
      alertType?: string | null;
      channel?: string | null;
      artifactId?: string | null;
      enrichmentType?: EnrichmentType;
  }
  interface ListEnrichmentConfigResponse {
      enrichmentConfigs?: EnrichmentConfig[];
  }
  interface ListAllEnrichmentConfigRequest {
  }
  interface UpdateEnrichmentConfigRequest extends UpdateEnrichmentConfigRequestEnrichmentConfigUpdateOneOf {
      enrichmentConfigOvr?: EnrichmentConfigOverrideUpdate;
      enrichmentConfigBase?: EnrichmentConfigBaseUpdate;
      /** Id of the EnrichmentConfig to retrieve */
      _id: string;
      /** The revision of the EnrichmentConfig */
      revision?: string;
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  /** @oneof */
  interface UpdateEnrichmentConfigRequestEnrichmentConfigUpdateOneOf {
      enrichmentConfigOvr?: EnrichmentConfigOverrideUpdate;
      enrichmentConfigBase?: EnrichmentConfigBaseUpdate;
  }
  interface EnrichmentConfigOverrideUpdate {
      /** reserve 9; */
      artifactId?: string | null;
      /** slack channel */
      channel?: string | null;
      /** user properties for overrides  exp: last GA in X days */
      enrichmentConfigProperties?: Record<string, string>;
      /** owner-ship tag */
      createdBy?: string;
      /** free -text */
      overrideName?: string;
      show?: boolean;
      /** alert type: Error percentage / Unknown */
      alertTypes?: AlertType[];
  }
  interface EnrichmentConfigBaseUpdate {
      /** implemented by core / plugin */
      enrichmentSource?: EnrichmentSource;
      /** reserve 2; */
      enrichmentType?: EnrichmentType;
      /** app def id defined in dev-center */
      implementorId?: string | null;
      /** user properties for overrides  exp: last GA in X days */
      enrichmentConfigProperties?: Record<string, string>;
      /** free text */
      description?: string | null;
      /** implementer owner buildup or other */
      owner?: string;
      /** owner-ship tag */
      createdBy?: string;
      /** show enrichment */
      show?: boolean;
      /** alert type: Error percentage / Unknown */
      alertTypes?: AlertType[];
  }
  interface UpdateEnrichmentConfigResponse {
      /** The updated EnrichmentConfig */
      enrichmentConfig?: EnrichmentConfig;
  }
  interface UpdateEnrichmentConfigShowRequest {
      /** Id of the EnrichmentConfig to retrieve */
      enrichmentConfigId: string;
      /** show property */
      show: boolean;
  }
  interface UpdateEnrichmentConfigShowResponse {
      /** The updated EnrichmentConfig */
      enrichmentConfig?: EnrichmentConfig;
  }
  interface DeleteEnrichmentConfigRequest {
      /** Id of the EnrichmentConfig to delete */
      enrichmentConfigId: string;
      /** The revision of the EnrichmentConfig */
      revision?: string;
  }
  interface DeleteEnrichmentConfigResponse {
  }
  interface QueryEnrichmentConfigRequest {
      /** WQL expression */
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
  interface QueryEnrichmentConfigResponse {
      /** The retrieved EnrichmentConfigs */
      enrichmentConfigs?: EnrichmentConfig[];
  }
  interface GetEnrichmentConfigForRequest {
      channel?: string;
      alertType?: AlertType;
      artifactId?: string | null;
  }
  interface GetEnrichmentConfigForResponse {
      enrichmentConfigs?: EnrichmentConfig[];
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
  }
  interface EntityDeletedEvent {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
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
  /** @internal
   * @documentationMaturity preview
   * @permissionId ALERT_ENRICHER.ENRICHMENT_CONFIG_API_CREATE
   */
  function createEnrichmentConfig(options?: CreateEnrichmentConfigOptions): Promise<CreateEnrichmentConfigResponse>;
  interface CreateEnrichmentConfigOptions extends CreateEnrichmentConfigRequestCreateWithPropertiesOneOf {
      enrichmentConfigBase?: EnrichmentConfigBase;
      enrichmentConfigOverride?: EnrichmentConfigOverride;
  }
  /**
   * Get a EnrichmentConfig by id
   * @param enrichmentConfigId - Id of the EnrichmentConfig to retrieve
   * @internal
   * @documentationMaturity preview
   * @requiredField enrichmentConfigId
   * @permissionId ALERT_ENRICHER.ENRICHMENT_CONFIG_API_READ
   */
  function getEnrichmentConfig(enrichmentConfigId: string): Promise<GetEnrichmentConfigResponse>;
  /**
   * Get a EnrichmentConfig by ListEnrichmentConfigRequest
   * @internal
   * @documentationMaturity preview
   * @permissionId ALERT_ENRICHER.ENRICHMENT_CONFIG_API_READ
   */
  function listEnrichmentConfig(options?: ListEnrichmentConfigOptions): Promise<ListEnrichmentConfigResponse>;
  interface ListEnrichmentConfigOptions {
      configurationType?: EnrichmentConfigType;
      alertType?: string | null;
      channel?: string | null;
      artifactId?: string | null;
      enrichmentType?: EnrichmentType;
  }
  /**
   * Get a EnrichmentConfig by ListEnrichmentConfigRequest
   * @internal
   * @documentationMaturity preview
   * @permissionId ALERT_ENRICHER.ENRICHMENT_CONFIG_API_READ
   */
  function listAllEnrichmentConfig(): Promise<ListEnrichmentConfigResponse>;
  /** @param _id - Id of the EnrichmentConfig to retrieve
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId ALERT_ENRICHER.ENRICHMENT_CONFIG_API_UPDATE
   */
  function updateEnrichmentConfig(_id: string, options?: UpdateEnrichmentConfigOptions): Promise<UpdateEnrichmentConfigResponse>;
  interface UpdateEnrichmentConfigOptions extends UpdateEnrichmentConfigRequestEnrichmentConfigUpdateOneOf {
      /** The revision of the EnrichmentConfig */
      revision?: string;
      enrichmentConfigOvr?: EnrichmentConfigOverrideUpdate;
      enrichmentConfigBase?: EnrichmentConfigBaseUpdate;
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  /** @internal
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.enrichmentConfigId
   * @requiredField identifiers.show
   * @permissionId ALERT_ENRICHER.ENRICHMENT_CONFIG_API_UPDATE
   */
  function updateEnrichmentConfigShow(identifiers: UpdateEnrichmentConfigShowIdentifiers): Promise<UpdateEnrichmentConfigShowResponse>;
  interface UpdateEnrichmentConfigShowIdentifiers {
      /** Id of the EnrichmentConfig to retrieve */
      enrichmentConfigId: string;
      /** show property */
      show: boolean;
  }
  /**
   * Delete a EnrichmentConfig
   * @param enrichmentConfigId - Id of the EnrichmentConfig to delete
   * @internal
   * @documentationMaturity preview
   * @requiredField enrichmentConfigId
   * @permissionId ALERT_ENRICHER.ENRICHMENT_CONFIG_API_DELETE
   */
  function deleteEnrichmentConfig(enrichmentConfigId: string, options?: DeleteEnrichmentConfigOptions): Promise<void>;
  interface DeleteEnrichmentConfigOptions {
      /** The revision of the EnrichmentConfig */
      revision?: string;
  }
  /**
   * Query EnrichmentConfigs using [WQL - Wix Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language)
   * @param query - WQL expression
   * @internal
   * @documentationMaturity preview
   * @requiredField query
   * @permissionId ALERT_ENRICHER.ENRICHMENT_CONFIG_API_READ
   */
  function queryEnrichmentConfig(query: QueryV2): Promise<QueryEnrichmentConfigResponse>;
  /** @internal
   * @documentationMaturity preview
   * @permissionId ALERT_ENRICHER.ENRICHMENT_CONFIG_API_READ
   */
  function getEnrichmentConfigFor(options?: GetEnrichmentConfigForOptions): Promise<GetEnrichmentConfigForResponse>;
  interface GetEnrichmentConfigForOptions {
      channel?: string;
      alertType?: AlertType;
      artifactId?: string | null;
  }
  
  type primeAutoV1EnrichmentConfig_universal_d_EnrichmentConfig = EnrichmentConfig;
  type primeAutoV1EnrichmentConfig_universal_d_EnrichmentSource = EnrichmentSource;
  const primeAutoV1EnrichmentConfig_universal_d_EnrichmentSource: typeof EnrichmentSource;
  type primeAutoV1EnrichmentConfig_universal_d_EnrichmentConfigType = EnrichmentConfigType;
  const primeAutoV1EnrichmentConfig_universal_d_EnrichmentConfigType: typeof EnrichmentConfigType;
  type primeAutoV1EnrichmentConfig_universal_d_EnrichmentType = EnrichmentType;
  const primeAutoV1EnrichmentConfig_universal_d_EnrichmentType: typeof EnrichmentType;
  type primeAutoV1EnrichmentConfig_universal_d_AlertType = AlertType;
  const primeAutoV1EnrichmentConfig_universal_d_AlertType: typeof AlertType;
  type primeAutoV1EnrichmentConfig_universal_d_CreateEnrichmentConfigRequest = CreateEnrichmentConfigRequest;
  type primeAutoV1EnrichmentConfig_universal_d_CreateEnrichmentConfigRequestCreateWithPropertiesOneOf = CreateEnrichmentConfigRequestCreateWithPropertiesOneOf;
  type primeAutoV1EnrichmentConfig_universal_d_EnrichmentConfigBase = EnrichmentConfigBase;
  type primeAutoV1EnrichmentConfig_universal_d_EnrichmentConfigOverride = EnrichmentConfigOverride;
  type primeAutoV1EnrichmentConfig_universal_d_CreateEnrichmentConfigResponse = CreateEnrichmentConfigResponse;
  type primeAutoV1EnrichmentConfig_universal_d_GetEnrichmentConfigRequest = GetEnrichmentConfigRequest;
  type primeAutoV1EnrichmentConfig_universal_d_GetEnrichmentConfigResponse = GetEnrichmentConfigResponse;
  type primeAutoV1EnrichmentConfig_universal_d_ListEnrichmentConfigRequest = ListEnrichmentConfigRequest;
  type primeAutoV1EnrichmentConfig_universal_d_ListEnrichmentConfigResponse = ListEnrichmentConfigResponse;
  type primeAutoV1EnrichmentConfig_universal_d_ListAllEnrichmentConfigRequest = ListAllEnrichmentConfigRequest;
  type primeAutoV1EnrichmentConfig_universal_d_UpdateEnrichmentConfigRequest = UpdateEnrichmentConfigRequest;
  type primeAutoV1EnrichmentConfig_universal_d_UpdateEnrichmentConfigRequestEnrichmentConfigUpdateOneOf = UpdateEnrichmentConfigRequestEnrichmentConfigUpdateOneOf;
  type primeAutoV1EnrichmentConfig_universal_d_EnrichmentConfigOverrideUpdate = EnrichmentConfigOverrideUpdate;
  type primeAutoV1EnrichmentConfig_universal_d_EnrichmentConfigBaseUpdate = EnrichmentConfigBaseUpdate;
  type primeAutoV1EnrichmentConfig_universal_d_UpdateEnrichmentConfigResponse = UpdateEnrichmentConfigResponse;
  type primeAutoV1EnrichmentConfig_universal_d_UpdateEnrichmentConfigShowRequest = UpdateEnrichmentConfigShowRequest;
  type primeAutoV1EnrichmentConfig_universal_d_UpdateEnrichmentConfigShowResponse = UpdateEnrichmentConfigShowResponse;
  type primeAutoV1EnrichmentConfig_universal_d_DeleteEnrichmentConfigRequest = DeleteEnrichmentConfigRequest;
  type primeAutoV1EnrichmentConfig_universal_d_DeleteEnrichmentConfigResponse = DeleteEnrichmentConfigResponse;
  type primeAutoV1EnrichmentConfig_universal_d_QueryEnrichmentConfigRequest = QueryEnrichmentConfigRequest;
  type primeAutoV1EnrichmentConfig_universal_d_QueryV2 = QueryV2;
  type primeAutoV1EnrichmentConfig_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
  type primeAutoV1EnrichmentConfig_universal_d_Sorting = Sorting;
  type primeAutoV1EnrichmentConfig_universal_d_SortOrder = SortOrder;
  const primeAutoV1EnrichmentConfig_universal_d_SortOrder: typeof SortOrder;
  type primeAutoV1EnrichmentConfig_universal_d_Paging = Paging;
  type primeAutoV1EnrichmentConfig_universal_d_CursorPaging = CursorPaging;
  type primeAutoV1EnrichmentConfig_universal_d_QueryEnrichmentConfigResponse = QueryEnrichmentConfigResponse;
  type primeAutoV1EnrichmentConfig_universal_d_GetEnrichmentConfigForRequest = GetEnrichmentConfigForRequest;
  type primeAutoV1EnrichmentConfig_universal_d_GetEnrichmentConfigForResponse = GetEnrichmentConfigForResponse;
  type primeAutoV1EnrichmentConfig_universal_d_DomainEvent = DomainEvent;
  type primeAutoV1EnrichmentConfig_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type primeAutoV1EnrichmentConfig_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type primeAutoV1EnrichmentConfig_universal_d_RestoreInfo = RestoreInfo;
  type primeAutoV1EnrichmentConfig_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type primeAutoV1EnrichmentConfig_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type primeAutoV1EnrichmentConfig_universal_d_ActionEvent = ActionEvent;
  type primeAutoV1EnrichmentConfig_universal_d_MessageEnvelope = MessageEnvelope;
  type primeAutoV1EnrichmentConfig_universal_d_IdentificationData = IdentificationData;
  type primeAutoV1EnrichmentConfig_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type primeAutoV1EnrichmentConfig_universal_d_WebhookIdentityType = WebhookIdentityType;
  const primeAutoV1EnrichmentConfig_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const primeAutoV1EnrichmentConfig_universal_d_createEnrichmentConfig: typeof createEnrichmentConfig;
  type primeAutoV1EnrichmentConfig_universal_d_CreateEnrichmentConfigOptions = CreateEnrichmentConfigOptions;
  const primeAutoV1EnrichmentConfig_universal_d_getEnrichmentConfig: typeof getEnrichmentConfig;
  const primeAutoV1EnrichmentConfig_universal_d_listEnrichmentConfig: typeof listEnrichmentConfig;
  type primeAutoV1EnrichmentConfig_universal_d_ListEnrichmentConfigOptions = ListEnrichmentConfigOptions;
  const primeAutoV1EnrichmentConfig_universal_d_listAllEnrichmentConfig: typeof listAllEnrichmentConfig;
  const primeAutoV1EnrichmentConfig_universal_d_updateEnrichmentConfig: typeof updateEnrichmentConfig;
  type primeAutoV1EnrichmentConfig_universal_d_UpdateEnrichmentConfigOptions = UpdateEnrichmentConfigOptions;
  const primeAutoV1EnrichmentConfig_universal_d_updateEnrichmentConfigShow: typeof updateEnrichmentConfigShow;
  type primeAutoV1EnrichmentConfig_universal_d_UpdateEnrichmentConfigShowIdentifiers = UpdateEnrichmentConfigShowIdentifiers;
  const primeAutoV1EnrichmentConfig_universal_d_deleteEnrichmentConfig: typeof deleteEnrichmentConfig;
  type primeAutoV1EnrichmentConfig_universal_d_DeleteEnrichmentConfigOptions = DeleteEnrichmentConfigOptions;
  const primeAutoV1EnrichmentConfig_universal_d_queryEnrichmentConfig: typeof queryEnrichmentConfig;
  const primeAutoV1EnrichmentConfig_universal_d_getEnrichmentConfigFor: typeof getEnrichmentConfigFor;
  type primeAutoV1EnrichmentConfig_universal_d_GetEnrichmentConfigForOptions = GetEnrichmentConfigForOptions;
  namespace primeAutoV1EnrichmentConfig_universal_d {
    export {
      primeAutoV1EnrichmentConfig_universal_d_EnrichmentConfig as EnrichmentConfig,
      primeAutoV1EnrichmentConfig_universal_d_EnrichmentSource as EnrichmentSource,
      primeAutoV1EnrichmentConfig_universal_d_EnrichmentConfigType as EnrichmentConfigType,
      primeAutoV1EnrichmentConfig_universal_d_EnrichmentType as EnrichmentType,
      primeAutoV1EnrichmentConfig_universal_d_AlertType as AlertType,
      primeAutoV1EnrichmentConfig_universal_d_CreateEnrichmentConfigRequest as CreateEnrichmentConfigRequest,
      primeAutoV1EnrichmentConfig_universal_d_CreateEnrichmentConfigRequestCreateWithPropertiesOneOf as CreateEnrichmentConfigRequestCreateWithPropertiesOneOf,
      primeAutoV1EnrichmentConfig_universal_d_EnrichmentConfigBase as EnrichmentConfigBase,
      primeAutoV1EnrichmentConfig_universal_d_EnrichmentConfigOverride as EnrichmentConfigOverride,
      primeAutoV1EnrichmentConfig_universal_d_CreateEnrichmentConfigResponse as CreateEnrichmentConfigResponse,
      primeAutoV1EnrichmentConfig_universal_d_GetEnrichmentConfigRequest as GetEnrichmentConfigRequest,
      primeAutoV1EnrichmentConfig_universal_d_GetEnrichmentConfigResponse as GetEnrichmentConfigResponse,
      primeAutoV1EnrichmentConfig_universal_d_ListEnrichmentConfigRequest as ListEnrichmentConfigRequest,
      primeAutoV1EnrichmentConfig_universal_d_ListEnrichmentConfigResponse as ListEnrichmentConfigResponse,
      primeAutoV1EnrichmentConfig_universal_d_ListAllEnrichmentConfigRequest as ListAllEnrichmentConfigRequest,
      primeAutoV1EnrichmentConfig_universal_d_UpdateEnrichmentConfigRequest as UpdateEnrichmentConfigRequest,
      primeAutoV1EnrichmentConfig_universal_d_UpdateEnrichmentConfigRequestEnrichmentConfigUpdateOneOf as UpdateEnrichmentConfigRequestEnrichmentConfigUpdateOneOf,
      primeAutoV1EnrichmentConfig_universal_d_EnrichmentConfigOverrideUpdate as EnrichmentConfigOverrideUpdate,
      primeAutoV1EnrichmentConfig_universal_d_EnrichmentConfigBaseUpdate as EnrichmentConfigBaseUpdate,
      primeAutoV1EnrichmentConfig_universal_d_UpdateEnrichmentConfigResponse as UpdateEnrichmentConfigResponse,
      primeAutoV1EnrichmentConfig_universal_d_UpdateEnrichmentConfigShowRequest as UpdateEnrichmentConfigShowRequest,
      primeAutoV1EnrichmentConfig_universal_d_UpdateEnrichmentConfigShowResponse as UpdateEnrichmentConfigShowResponse,
      primeAutoV1EnrichmentConfig_universal_d_DeleteEnrichmentConfigRequest as DeleteEnrichmentConfigRequest,
      primeAutoV1EnrichmentConfig_universal_d_DeleteEnrichmentConfigResponse as DeleteEnrichmentConfigResponse,
      primeAutoV1EnrichmentConfig_universal_d_QueryEnrichmentConfigRequest as QueryEnrichmentConfigRequest,
      primeAutoV1EnrichmentConfig_universal_d_QueryV2 as QueryV2,
      primeAutoV1EnrichmentConfig_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf,
      primeAutoV1EnrichmentConfig_universal_d_Sorting as Sorting,
      primeAutoV1EnrichmentConfig_universal_d_SortOrder as SortOrder,
      primeAutoV1EnrichmentConfig_universal_d_Paging as Paging,
      primeAutoV1EnrichmentConfig_universal_d_CursorPaging as CursorPaging,
      primeAutoV1EnrichmentConfig_universal_d_QueryEnrichmentConfigResponse as QueryEnrichmentConfigResponse,
      primeAutoV1EnrichmentConfig_universal_d_GetEnrichmentConfigForRequest as GetEnrichmentConfigForRequest,
      primeAutoV1EnrichmentConfig_universal_d_GetEnrichmentConfigForResponse as GetEnrichmentConfigForResponse,
      primeAutoV1EnrichmentConfig_universal_d_DomainEvent as DomainEvent,
      primeAutoV1EnrichmentConfig_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      primeAutoV1EnrichmentConfig_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      primeAutoV1EnrichmentConfig_universal_d_RestoreInfo as RestoreInfo,
      primeAutoV1EnrichmentConfig_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      primeAutoV1EnrichmentConfig_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      primeAutoV1EnrichmentConfig_universal_d_ActionEvent as ActionEvent,
      primeAutoV1EnrichmentConfig_universal_d_MessageEnvelope as MessageEnvelope,
      primeAutoV1EnrichmentConfig_universal_d_IdentificationData as IdentificationData,
      primeAutoV1EnrichmentConfig_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      primeAutoV1EnrichmentConfig_universal_d_WebhookIdentityType as WebhookIdentityType,
      primeAutoV1EnrichmentConfig_universal_d_createEnrichmentConfig as createEnrichmentConfig,
      primeAutoV1EnrichmentConfig_universal_d_CreateEnrichmentConfigOptions as CreateEnrichmentConfigOptions,
      primeAutoV1EnrichmentConfig_universal_d_getEnrichmentConfig as getEnrichmentConfig,
      primeAutoV1EnrichmentConfig_universal_d_listEnrichmentConfig as listEnrichmentConfig,
      primeAutoV1EnrichmentConfig_universal_d_ListEnrichmentConfigOptions as ListEnrichmentConfigOptions,
      primeAutoV1EnrichmentConfig_universal_d_listAllEnrichmentConfig as listAllEnrichmentConfig,
      primeAutoV1EnrichmentConfig_universal_d_updateEnrichmentConfig as updateEnrichmentConfig,
      primeAutoV1EnrichmentConfig_universal_d_UpdateEnrichmentConfigOptions as UpdateEnrichmentConfigOptions,
      primeAutoV1EnrichmentConfig_universal_d_updateEnrichmentConfigShow as updateEnrichmentConfigShow,
      primeAutoV1EnrichmentConfig_universal_d_UpdateEnrichmentConfigShowIdentifiers as UpdateEnrichmentConfigShowIdentifiers,
      primeAutoV1EnrichmentConfig_universal_d_deleteEnrichmentConfig as deleteEnrichmentConfig,
      primeAutoV1EnrichmentConfig_universal_d_DeleteEnrichmentConfigOptions as DeleteEnrichmentConfigOptions,
      primeAutoV1EnrichmentConfig_universal_d_queryEnrichmentConfig as queryEnrichmentConfig,
      primeAutoV1EnrichmentConfig_universal_d_getEnrichmentConfigFor as getEnrichmentConfigFor,
      primeAutoV1EnrichmentConfig_universal_d_GetEnrichmentConfigForOptions as GetEnrichmentConfigForOptions,
    };
  }
  
  export { primeAutoV1EnrichmentConfig_universal_d as config };
}
