declare module "wix-members-area.v1" {
  interface MembersAreaSiteConfiguration extends MembersAreaSiteConfigurationValueOneOf {
      stringValue?: string | null;
      booleanValue?: boolean | null;
      /**
       * SiteConfiguration ID.
       * @readonly
       */
      _id?: string | null;
      key?: string | null;
      /**
       * Date and time the SiteConfiguration was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the SiteConfiguration was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  /** @oneof */
  interface MembersAreaSiteConfigurationValueOneOf {
      stringValue?: string | null;
      booleanValue?: boolean | null;
  }
  interface CreateMembersAreaSiteConfigurationRequest {
      /** SiteConfiguration to be created. */
      membersAreaSiteConfiguration: MembersAreaSiteConfiguration;
  }
  interface CreateMembersAreaSiteConfigurationResponse {
      /** The created SiteConfiguration. */
      membersAreaSiteConfiguration?: MembersAreaSiteConfiguration;
  }
  interface BulkCreateMembersAreaSiteConfigurationRequest {
      membersAreaSiteConfigurations: MembersAreaSiteConfiguration[];
      /** set to `true` if you wish to receive back the created MembersAreaSiteConfigurations in the response */
      returnEntity?: boolean;
  }
  interface BulkCreateMembersAreaSiteConfigurationResponse {
      results?: BulkMembersAreaSiteConfigurationResult[];
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkMembersAreaSiteConfigurationResult {
      itemMetadata?: ItemMetadata;
      /** Only exists if `returnEntity` was set to true in the request */
      item?: MembersAreaSiteConfiguration;
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
  interface GetMembersAreaSiteConfigurationRequest {
      /** ID of the SiteConfiguration to retrieve. */
      membersAreaSiteConfigurationId: string;
  }
  interface GetMembersAreaSiteConfigurationResponse {
      /** The requested SiteConfiguration. */
      membersAreaSiteConfiguration?: MembersAreaSiteConfiguration;
  }
  interface GetMembersAreaSiteConfigurationByKeyRequest {
      /** KEY field of the SiteConfiguration to retrieve. */
      membersAreaSiteConfigurationKey: string;
  }
  interface GetMembersAreaSiteConfigurationByKeyResponse {
      /** The requested SiteConfiguration. */
      membersAreaSiteConfiguration?: MembersAreaSiteConfiguration;
  }
  interface QueryMembersAreaSiteConfigurationsRequest {
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
  interface QueryMembersAreaSiteConfigurationsResponse {
      /** List of SiteConfigurations. */
      membersAreaSiteConfigurations?: MembersAreaSiteConfiguration[];
      /** Paging metadata */
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
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface UpdateMembersAreaSiteConfigurationRequest {
      /** SiteConfiguration to be updated, may be partial. */
      membersAreaSiteConfiguration: MembersAreaSiteConfiguration;
      /**
       * Explicit list of fields to update
       * @internal
       */
      fieldMask: string[];
  }
  interface UpdateMembersAreaSiteConfigurationResponse {
      /** Updated SiteConfiguration. */
      membersAreaSiteConfiguration?: MembersAreaSiteConfiguration;
  }
  interface UpdateMembersAreaSiteConfigurationValueByKeyRequest {
      /** SiteConfiguration with existing key and updated value. */
      membersAreaSiteConfiguration: MembersAreaSiteConfiguration;
  }
  interface UpdateMembersAreaSiteConfigurationValueByKeyResponse {
      /** Updated SiteConfiguration. */
      membersAreaSiteConfiguration?: MembersAreaSiteConfiguration;
  }
  interface DeleteMembersAreaSiteConfigurationRequest {
      /** Id of the SiteConfiguration to delete. */
      membersAreaSiteConfigurationId: string;
  }
  interface DeleteMembersAreaSiteConfigurationResponse {
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
  /** @param membersAreaSiteConfiguration - SiteConfiguration to be created.
   * @public
   * @documentationMaturity preview
   * @requiredField membersAreaSiteConfiguration
   * @requiredField membersAreaSiteConfiguration.key
   * @permissionId MEMBERS.MEMBERS_AREA_SITE_CONFIGURATION_CREATE
   * @adminMethod
   * @returns The created SiteConfiguration.
   */
  function createMembersAreaSiteConfiguration(membersAreaSiteConfiguration: MembersAreaSiteConfiguration): Promise<MembersAreaSiteConfiguration>;
  /**
   * Creates up to 100 SiteConfigurations in a bulk.
   * @public
   * @documentationMaturity preview
   * @requiredField membersAreaSiteConfigurations
   * @requiredField membersAreaSiteConfigurations.key
   * @permissionId MEMBERS.MEMBERS_AREA_SITE_CONFIGURATION_CREATE
   * @adminMethod
   */
  function bulkCreateMembersAreaSiteConfiguration(membersAreaSiteConfigurations: MembersAreaSiteConfiguration[], options?: BulkCreateMembersAreaSiteConfigurationOptions): Promise<BulkCreateMembersAreaSiteConfigurationResponse>;
  interface BulkCreateMembersAreaSiteConfigurationOptions {
      /** set to `true` if you wish to receive back the created MembersAreaSiteConfigurations in the response */
      returnEntity?: boolean;
  }
  /**
   * Retrieves a SiteConfiguration by ID.
   * @param membersAreaSiteConfigurationId - ID of the SiteConfiguration to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField membersAreaSiteConfigurationId
   * @permissionId MEMBERS.MEMBERS_AREA_SITE_CONFIGURATION_READ
   * @adminMethod
   * @returns The requested SiteConfiguration.
   */
  function getMembersAreaSiteConfiguration(membersAreaSiteConfigurationId: string): Promise<MembersAreaSiteConfiguration>;
  /** @param membersAreaSiteConfigurationKey - KEY field of the SiteConfiguration to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField membersAreaSiteConfigurationKey
   * @permissionId MEMBERS.MEMBERS_AREA_SITE_CONFIGURATION_READ
   * @adminMethod
   */
  function getMembersAreaSiteConfigurationByKey(membersAreaSiteConfigurationKey: string): Promise<GetMembersAreaSiteConfigurationByKeyResponse>;
  /**
   * Retrieves a list of SiteConfigurations, given the provided [paging, filtering, and sorting][1].
   * Up to 1,000 SiteConfigurations can be returned per request.
   * To learn how to query SiteConfigurations, see [API Query Language][2].
   * [1]: https://dev.wix.com/api/rest/getting-started/sorting-and-paging
   * [2]: https://dev.wix.com/api/rest/getting-started/api-query-language
   * @public
   * @documentationMaturity preview
   * @permissionId MEMBERS.MEMBERS_AREA_SITE_CONFIGURATION_READ
   * @adminMethod
   */
  function queryMembersAreaSiteConfigurations(): MembersAreaSiteConfigurationsQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface MembersAreaSiteConfigurationsQueryResult extends QueryCursorResult {
      items: MembersAreaSiteConfiguration[];
      query: MembersAreaSiteConfigurationsQueryBuilder;
      next: () => Promise<MembersAreaSiteConfigurationsQueryResult>;
      prev: () => Promise<MembersAreaSiteConfigurationsQueryResult>;
  }
  interface MembersAreaSiteConfigurationsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'stringValue' | 'booleanValue' | '_id' | 'key', value: any) => MembersAreaSiteConfigurationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: 'stringValue' | 'booleanValue' | '_id' | 'key', value: any) => MembersAreaSiteConfigurationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: 'stringValue' | '_id' | 'key', value: string) => MembersAreaSiteConfigurationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: 'stringValue' | 'booleanValue' | '_id' | 'key', value: any[]) => MembersAreaSiteConfigurationsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'stringValue' | 'booleanValue' | '_id' | 'key', value: any) => MembersAreaSiteConfigurationsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'stringValue' | 'booleanValue' | '_id' | 'key', value: boolean) => MembersAreaSiteConfigurationsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'stringValue' | 'booleanValue' | '_id' | 'key'>) => MembersAreaSiteConfigurationsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => MembersAreaSiteConfigurationsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => MembersAreaSiteConfigurationsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<MembersAreaSiteConfigurationsQueryResult>;
  }
  /**
   * Updates the SiteConfiguration.
   * @param _id - SiteConfiguration ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField membersAreaSiteConfiguration
   * @permissionId MEMBERS.MEMBERS_AREA_SITE_CONFIGURATION_UPDATE
   * @adminMethod
   * @returns Updated SiteConfiguration.
   */
  function updateMembersAreaSiteConfiguration(_id: string | null, membersAreaSiteConfiguration: UpdateMembersAreaSiteConfiguration, options?: UpdateMembersAreaSiteConfigurationOptions): Promise<MembersAreaSiteConfiguration>;
  interface UpdateMembersAreaSiteConfiguration {
      stringValue?: string | null;
      booleanValue?: boolean | null;
      /**
       * SiteConfiguration ID.
       * @readonly
       */
      _id?: string | null;
      key?: string | null;
      /**
       * Date and time the SiteConfiguration was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the SiteConfiguration was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  interface UpdateMembersAreaSiteConfigurationOptions {
      /**
       * Explicit list of fields to update
       * @internal
       */
      fieldMask: string[];
  }
  /**
   * Updates the SiteConfiguration value by key.
   * @public
   * @documentationMaturity preview
   * @requiredField key
   * @requiredField membersAreaSiteConfiguration
   * @permissionId MEMBERS.MEMBERS_AREA_SITE_CONFIGURATION_UPDATE
   * @adminMethod
   */
  function updateMembersAreaSiteConfigurationValueByKey(key: string | null, membersAreaSiteConfiguration: UpdateMembersAreaSiteConfigurationValueByKeyMembersAreaSiteConfiguration): Promise<UpdateMembersAreaSiteConfigurationValueByKeyResponse>;
  interface UpdateMembersAreaSiteConfigurationValueByKeyMembersAreaSiteConfiguration {
      stringValue?: string | null;
      booleanValue?: boolean | null;
      /**
       * SiteConfiguration ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Date and time the SiteConfiguration was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the SiteConfiguration was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  /**
   * Deletes the SiteConfiguration.
   * @param membersAreaSiteConfigurationId - Id of the SiteConfiguration to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField membersAreaSiteConfigurationId
   * @permissionId MEMBERS.MEMBERS_AREA_SITE_CONFIGURATION_DELETE
   * @adminMethod
   */
  function deleteMembersAreaSiteConfiguration(membersAreaSiteConfigurationId: string): Promise<void>;
  
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_MembersAreaSiteConfiguration = MembersAreaSiteConfiguration;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_MembersAreaSiteConfigurationValueOneOf = MembersAreaSiteConfigurationValueOneOf;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_CreateMembersAreaSiteConfigurationRequest = CreateMembersAreaSiteConfigurationRequest;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_CreateMembersAreaSiteConfigurationResponse = CreateMembersAreaSiteConfigurationResponse;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_BulkCreateMembersAreaSiteConfigurationRequest = BulkCreateMembersAreaSiteConfigurationRequest;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_BulkCreateMembersAreaSiteConfigurationResponse = BulkCreateMembersAreaSiteConfigurationResponse;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_BulkMembersAreaSiteConfigurationResult = BulkMembersAreaSiteConfigurationResult;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_ItemMetadata = ItemMetadata;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_ApplicationError = ApplicationError;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_BulkActionMetadata = BulkActionMetadata;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_GetMembersAreaSiteConfigurationRequest = GetMembersAreaSiteConfigurationRequest;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_GetMembersAreaSiteConfigurationResponse = GetMembersAreaSiteConfigurationResponse;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_GetMembersAreaSiteConfigurationByKeyRequest = GetMembersAreaSiteConfigurationByKeyRequest;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_GetMembersAreaSiteConfigurationByKeyResponse = GetMembersAreaSiteConfigurationByKeyResponse;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_QueryMembersAreaSiteConfigurationsRequest = QueryMembersAreaSiteConfigurationsRequest;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_CursorQuery = CursorQuery;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_Sorting = Sorting;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_SortOrder = SortOrder;
  const membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_SortOrder: typeof SortOrder;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_CursorPaging = CursorPaging;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_QueryMembersAreaSiteConfigurationsResponse = QueryMembersAreaSiteConfigurationsResponse;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_Cursors = Cursors;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_UpdateMembersAreaSiteConfigurationRequest = UpdateMembersAreaSiteConfigurationRequest;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_UpdateMembersAreaSiteConfigurationResponse = UpdateMembersAreaSiteConfigurationResponse;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_UpdateMembersAreaSiteConfigurationValueByKeyRequest = UpdateMembersAreaSiteConfigurationValueByKeyRequest;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_UpdateMembersAreaSiteConfigurationValueByKeyResponse = UpdateMembersAreaSiteConfigurationValueByKeyResponse;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_DeleteMembersAreaSiteConfigurationRequest = DeleteMembersAreaSiteConfigurationRequest;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_DeleteMembersAreaSiteConfigurationResponse = DeleteMembersAreaSiteConfigurationResponse;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_DomainEvent = DomainEvent;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_RestoreInfo = RestoreInfo;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_ActionEvent = ActionEvent;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_MessageEnvelope = MessageEnvelope;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_IdentificationData = IdentificationData;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_WebhookIdentityType = WebhookIdentityType;
  const membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_createMembersAreaSiteConfiguration: typeof createMembersAreaSiteConfiguration;
  const membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_bulkCreateMembersAreaSiteConfiguration: typeof bulkCreateMembersAreaSiteConfiguration;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_BulkCreateMembersAreaSiteConfigurationOptions = BulkCreateMembersAreaSiteConfigurationOptions;
  const membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_getMembersAreaSiteConfiguration: typeof getMembersAreaSiteConfiguration;
  const membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_getMembersAreaSiteConfigurationByKey: typeof getMembersAreaSiteConfigurationByKey;
  const membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_queryMembersAreaSiteConfigurations: typeof queryMembersAreaSiteConfigurations;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_MembersAreaSiteConfigurationsQueryResult = MembersAreaSiteConfigurationsQueryResult;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_MembersAreaSiteConfigurationsQueryBuilder = MembersAreaSiteConfigurationsQueryBuilder;
  const membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_updateMembersAreaSiteConfiguration: typeof updateMembersAreaSiteConfiguration;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_UpdateMembersAreaSiteConfiguration = UpdateMembersAreaSiteConfiguration;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_UpdateMembersAreaSiteConfigurationOptions = UpdateMembersAreaSiteConfigurationOptions;
  const membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_updateMembersAreaSiteConfigurationValueByKey: typeof updateMembersAreaSiteConfigurationValueByKey;
  type membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_UpdateMembersAreaSiteConfigurationValueByKeyMembersAreaSiteConfiguration = UpdateMembersAreaSiteConfigurationValueByKeyMembersAreaSiteConfiguration;
  const membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_deleteMembersAreaSiteConfiguration: typeof deleteMembersAreaSiteConfiguration;
  namespace membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d {
    export {
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_MembersAreaSiteConfiguration as MembersAreaSiteConfiguration,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_MembersAreaSiteConfigurationValueOneOf as MembersAreaSiteConfigurationValueOneOf,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_CreateMembersAreaSiteConfigurationRequest as CreateMembersAreaSiteConfigurationRequest,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_CreateMembersAreaSiteConfigurationResponse as CreateMembersAreaSiteConfigurationResponse,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_BulkCreateMembersAreaSiteConfigurationRequest as BulkCreateMembersAreaSiteConfigurationRequest,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_BulkCreateMembersAreaSiteConfigurationResponse as BulkCreateMembersAreaSiteConfigurationResponse,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_BulkMembersAreaSiteConfigurationResult as BulkMembersAreaSiteConfigurationResult,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_ItemMetadata as ItemMetadata,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_ApplicationError as ApplicationError,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_BulkActionMetadata as BulkActionMetadata,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_GetMembersAreaSiteConfigurationRequest as GetMembersAreaSiteConfigurationRequest,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_GetMembersAreaSiteConfigurationResponse as GetMembersAreaSiteConfigurationResponse,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_GetMembersAreaSiteConfigurationByKeyRequest as GetMembersAreaSiteConfigurationByKeyRequest,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_GetMembersAreaSiteConfigurationByKeyResponse as GetMembersAreaSiteConfigurationByKeyResponse,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_QueryMembersAreaSiteConfigurationsRequest as QueryMembersAreaSiteConfigurationsRequest,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_CursorQuery as CursorQuery,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_Sorting as Sorting,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_SortOrder as SortOrder,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_CursorPaging as CursorPaging,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_QueryMembersAreaSiteConfigurationsResponse as QueryMembersAreaSiteConfigurationsResponse,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_PagingMetadataV2 as PagingMetadataV2,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_Cursors as Cursors,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_UpdateMembersAreaSiteConfigurationRequest as UpdateMembersAreaSiteConfigurationRequest,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_UpdateMembersAreaSiteConfigurationResponse as UpdateMembersAreaSiteConfigurationResponse,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_UpdateMembersAreaSiteConfigurationValueByKeyRequest as UpdateMembersAreaSiteConfigurationValueByKeyRequest,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_UpdateMembersAreaSiteConfigurationValueByKeyResponse as UpdateMembersAreaSiteConfigurationValueByKeyResponse,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_DeleteMembersAreaSiteConfigurationRequest as DeleteMembersAreaSiteConfigurationRequest,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_DeleteMembersAreaSiteConfigurationResponse as DeleteMembersAreaSiteConfigurationResponse,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_DomainEvent as DomainEvent,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_RestoreInfo as RestoreInfo,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_ActionEvent as ActionEvent,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_MessageEnvelope as MessageEnvelope,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_IdentificationData as IdentificationData,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_WebhookIdentityType as WebhookIdentityType,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_createMembersAreaSiteConfiguration as createMembersAreaSiteConfiguration,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_bulkCreateMembersAreaSiteConfiguration as bulkCreateMembersAreaSiteConfiguration,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_BulkCreateMembersAreaSiteConfigurationOptions as BulkCreateMembersAreaSiteConfigurationOptions,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_getMembersAreaSiteConfiguration as getMembersAreaSiteConfiguration,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_getMembersAreaSiteConfigurationByKey as getMembersAreaSiteConfigurationByKey,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_queryMembersAreaSiteConfigurations as queryMembersAreaSiteConfigurations,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_MembersAreaSiteConfigurationsQueryResult as MembersAreaSiteConfigurationsQueryResult,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_MembersAreaSiteConfigurationsQueryBuilder as MembersAreaSiteConfigurationsQueryBuilder,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_updateMembersAreaSiteConfiguration as updateMembersAreaSiteConfiguration,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_UpdateMembersAreaSiteConfiguration as UpdateMembersAreaSiteConfiguration,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_UpdateMembersAreaSiteConfigurationOptions as UpdateMembersAreaSiteConfigurationOptions,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_updateMembersAreaSiteConfigurationValueByKey as updateMembersAreaSiteConfigurationValueByKey,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_UpdateMembersAreaSiteConfigurationValueByKeyMembersAreaSiteConfiguration as UpdateMembersAreaSiteConfigurationValueByKeyMembersAreaSiteConfiguration,
      membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d_deleteMembersAreaSiteConfiguration as deleteMembersAreaSiteConfiguration,
    };
  }
  
  /** Fake FQDN to comply with the rules */
  interface SantaMember {
      /** fake id */
      _id?: string | null;
  }
  interface GetMyMemberPageRequest {
      /** My member page config */
      config?: Config;
      /** My member page full url */
      fullUrl?: string;
      /** My member page roles */
      pageRoles?: Record<string, PageRole>;
      /** My member page request info */
      requestInfo?: RequestInfo;
      /** My member page router prefix */
      routerPrefix?: string;
      /** My member page router suffix */
      routerSuffix?: string;
  }
  interface Config {
      /** Configuration patterns */
      patterns?: Record<string, Pattern>;
      /** Configuration type */
      type?: string;
  }
  interface Pattern {
      /** Pattern app data */
      appData?: AppData;
      /** Pattern page id */
      page?: string;
      /** Pattern seo data */
      seoData?: SeoData;
      /** Pattern social home flag */
      socialHome?: boolean;
      /** Pattern page title */
      title?: string;
  }
  interface AppData {
      /** App definition id */
      appDefinitionId?: string;
      /** App page id */
      appPageId?: string;
      /** App menu order */
      menuOrder?: number;
      /** App numbers */
      numbers?: Numbers;
      /** Which roles app is visible to */
      visibleForRoles?: string[] | null;
  }
  interface Numbers {
      /** Number default value */
      default?: number;
      /** Number key */
      key?: string;
  }
  interface SeoData {
      /** SEO description */
      description?: string | null;
      /** SEO keywords */
      keywords?: string | null;
      /** SEO no index flag */
      noIndex?: string;
      /** SEO title */
      title?: string;
  }
  interface PageRole {
      /** Page role id */
      _id?: string;
      /** Page title */
      title?: string;
  }
  interface RequestInfo {
      /** Request info environment */
      env?: string;
      /** Request form factor */
      formFactor?: string;
  }
  interface GetMyMemberPageResponse {
      /** Get mt member page result */
      result?: MemberPageResult;
  }
  interface MemberPageResult {
      /** Data Struct can return types of FullData or RolesData messages. */
      data?: Record<string, any> | null;
      /** Page head */
      head?: Head;
      /** A message */
      message?: string | null;
      /** Page id */
      page?: string;
      /** Public data */
      publicData?: PublicData;
      /** Page redirect url */
      redirectUrl?: string | null;
      /** Page status */
      status?: number;
      /** Page tpa inner route */
      tpaInnerRoute?: string | null;
  }
  interface Head {
      /** Head description */
      description?: string | null;
      /** Head keywords */
      keywords?: string | null;
      /** Head meta tags */
      metaTags?: Record<string, string>;
      /** Head no index flag */
      noIndex?: string;
      /** Head title */
      title?: string | null;
  }
  interface PublicData {
      /** Viewed member */
      viewedUser?: ViewedUser;
  }
  interface ViewedUser {
      /** Viewed member id */
      _id?: string;
      /** Viewed member name */
      name?: string | null;
      /** Viewed member roles */
      roles?: string[];
      /** Viewed member slug */
      slug?: string | null;
  }
  interface GetSiteMapRequest {
      /** Get site map configuration */
      config?: Config;
      /** Get site map url of the page */
      fullUrl?: string;
      /** Get site map page roles */
      pageRoles?: Record<string, PageRole>;
      /** Get site map request info */
      requestInfo?: RequestInfo;
      /** Get site map router prefix */
      routerPrefix?: string;
      /** Get site map router suffix */
      routerSuffix?: string;
  }
  interface GetSiteMapResponse {
      /** Site map result */
      result?: any;
  }
  /**
   * Returns my member page
   * @public
   * @documentationMaturity preview
   * @permissionId MEMBERS.SANTA_MEMBERS_MY_MEMBER_PAGE_READ
   */
  function getMyMemberPage(options?: GetMyMemberPageOptions): Promise<GetMyMemberPageResponse>;
  interface GetMyMemberPageOptions {
      /** My member page config */
      config?: Config;
      /** My member page full url */
      fullUrl?: string;
      /** My member page roles */
      pageRoles?: Record<string, PageRole>;
      /** My member page request info */
      requestInfo?: RequestInfo;
      /** My member page router prefix */
      routerPrefix?: string;
      /** My member page router suffix */
      routerSuffix?: string;
  }
  /**
   * Returns site map
   * No permission as the request can be made by anything pretty much
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function getSiteMap(options?: GetSiteMapOptions): Promise<GetSiteMapResponse>;
  interface GetSiteMapOptions {
      /** Get site map configuration */
      config?: Config;
      /** Get site map url of the page */
      fullUrl?: string;
      /** Get site map page roles */
      pageRoles?: Record<string, PageRole>;
      /** Get site map request info */
      requestInfo?: RequestInfo;
      /** Get site map router prefix */
      routerPrefix?: string;
      /** Get site map router suffix */
      routerSuffix?: string;
  }
  
  type membersV1SantaMember_universal_d_SantaMember = SantaMember;
  type membersV1SantaMember_universal_d_GetMyMemberPageRequest = GetMyMemberPageRequest;
  type membersV1SantaMember_universal_d_Config = Config;
  type membersV1SantaMember_universal_d_Pattern = Pattern;
  type membersV1SantaMember_universal_d_AppData = AppData;
  type membersV1SantaMember_universal_d_Numbers = Numbers;
  type membersV1SantaMember_universal_d_SeoData = SeoData;
  type membersV1SantaMember_universal_d_PageRole = PageRole;
  type membersV1SantaMember_universal_d_RequestInfo = RequestInfo;
  type membersV1SantaMember_universal_d_GetMyMemberPageResponse = GetMyMemberPageResponse;
  type membersV1SantaMember_universal_d_MemberPageResult = MemberPageResult;
  type membersV1SantaMember_universal_d_Head = Head;
  type membersV1SantaMember_universal_d_PublicData = PublicData;
  type membersV1SantaMember_universal_d_ViewedUser = ViewedUser;
  type membersV1SantaMember_universal_d_GetSiteMapRequest = GetSiteMapRequest;
  type membersV1SantaMember_universal_d_GetSiteMapResponse = GetSiteMapResponse;
  const membersV1SantaMember_universal_d_getMyMemberPage: typeof getMyMemberPage;
  type membersV1SantaMember_universal_d_GetMyMemberPageOptions = GetMyMemberPageOptions;
  const membersV1SantaMember_universal_d_getSiteMap: typeof getSiteMap;
  type membersV1SantaMember_universal_d_GetSiteMapOptions = GetSiteMapOptions;
  namespace membersV1SantaMember_universal_d {
    export {
      membersV1SantaMember_universal_d_SantaMember as SantaMember,
      membersV1SantaMember_universal_d_GetMyMemberPageRequest as GetMyMemberPageRequest,
      membersV1SantaMember_universal_d_Config as Config,
      membersV1SantaMember_universal_d_Pattern as Pattern,
      membersV1SantaMember_universal_d_AppData as AppData,
      membersV1SantaMember_universal_d_Numbers as Numbers,
      membersV1SantaMember_universal_d_SeoData as SeoData,
      membersV1SantaMember_universal_d_PageRole as PageRole,
      membersV1SantaMember_universal_d_RequestInfo as RequestInfo,
      membersV1SantaMember_universal_d_GetMyMemberPageResponse as GetMyMemberPageResponse,
      membersV1SantaMember_universal_d_MemberPageResult as MemberPageResult,
      membersV1SantaMember_universal_d_Head as Head,
      membersV1SantaMember_universal_d_PublicData as PublicData,
      membersV1SantaMember_universal_d_ViewedUser as ViewedUser,
      membersV1SantaMember_universal_d_GetSiteMapRequest as GetSiteMapRequest,
      membersV1SantaMember_universal_d_GetSiteMapResponse as GetSiteMapResponse,
      membersV1SantaMember_universal_d_getMyMemberPage as getMyMemberPage,
      membersV1SantaMember_universal_d_GetMyMemberPageOptions as GetMyMemberPageOptions,
      membersV1SantaMember_universal_d_getSiteMap as getSiteMap,
      membersV1SantaMember_universal_d_GetSiteMapOptions as GetSiteMapOptions,
    };
  }
  
  export { membersMembersareasiteconfigurationV1MembersAreaSiteConfiguration_universal_d as membersAreaSiteConfiguration, membersV1SantaMember_universal_d as santaMember };
}
