declare module "wix-editor-deployments.v1" {
  /** Deployment is the main entity of Deployments. */
  interface Deployment extends DeploymentDescriptionOneOf, DeploymentCreationPublishTypeOneOf {
      /** Deployment description */
      editorRevision?: EditorRevision;
      /** No publish */
      noPublish?: CreationPublishTypeNone;
      /** Publish Site */
      sitePublish?: CreationPublishTypeSite;
      /** Publish Site's RC */
      rcPublish?: CreationPublishTypeRC;
      /** Deployment ID */
      _id?: string;
      /** Deployment type */
      deploymentType?: DeploymentType;
      /** The label of the deployment. */
      label?: string | null;
      /**
       * Represents the time this Deployment was last modified
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Represents the current state of an item. Each time the item is modified, its `revision` changes. for an update operation to succeed, you MUST pass the latest revision */
      revision?: string | null;
      /** All pipelines that implement DeploymentPipelineProvider interface */
      pipelines?: PipelineResult[];
      /** The pipelines status of the deployment */
      deploymentPipelinesStatus?: DeploymentPipelinesStatus;
      /**
       * Represents the time this Deployment was created
       * @readonly
       */
      _createdDate?: Date | null;
      /** The editor session that created the deployment */
      editorSession?: EditorSession;
      /** Data Extensions */
      extendedFields?: ExtendedFields;
  }
  /** @oneof */
  interface DeploymentDescriptionOneOf {
      /** Deployment description */
      editorRevision?: EditorRevision;
  }
  /** @oneof */
  interface DeploymentCreationPublishTypeOneOf {
      /** No publish */
      noPublish?: CreationPublishTypeNone;
      /** Publish Site */
      sitePublish?: CreationPublishTypeSite;
      /** Publish Site's RC */
      rcPublish?: CreationPublishTypeRC;
  }
  enum DeploymentType {
      UNKNOWN = "UNKNOWN",
      EDITOR_REVISION = "EDITOR_REVISION"
  }
  interface EditorRevision {
      /** Branch's Id */
      branchId?: string | null;
      /** Revision's Id */
      siteRevision?: string;
  }
  interface PipelineResult {
      /** The deployment pipeline implementer id as appears in the SPI Config */
      deploymentPipelineId?: string;
      /** Pipeline status */
      pipelineStatus?: PipelineStatus;
      /** The deployment pipeline task results */
      tasksResults?: TaskResult[];
  }
  enum PipelineStatus {
      UNDEFINED = "UNDEFINED",
      IN_PROGRESS = "IN_PROGRESS",
      SUCCESS = "SUCCESS",
      ERROR = "ERROR",
      INVOKE_ERROR = "INVOKE_ERROR",
      TIMEOUT = "TIMEOUT",
      SKIPPED = "SKIPPED"
  }
  interface TaskResult {
      /** Name of the task for internal references. For example: "user code bundling". */
      taskName?: string;
      /** The execution status of the pipeline for the given deployment creation process */
      status?: TaskStatus;
  }
  enum TaskStatus {
      UNDEFINED = "UNDEFINED",
      SUCCESS = "SUCCESS",
      ERROR = "ERROR",
      RUNNING = "RUNNING",
      ABORTED = "ABORTED"
  }
  enum DeploymentPipelinesStatus {
      UNDEFINED = "UNDEFINED",
      /** No pipelines are defined for this deployment */
      NONE = "NONE",
      /** Pipelines are invoked and in progress */
      IN_PROGRESS = "IN_PROGRESS",
      /** Pipelines completed successfully */
      SUCCESS = "SUCCESS",
      /** Pipelines completed with errors */
      ERROR = "ERROR"
  }
  interface EditorSession {
      /** Editor Session Id */
      esi?: string | null;
      /** Document services Origin */
      dsOrigin?: string | null;
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
  interface CreationPublishTypeNone {
  }
  interface CreationPublishTypeSite {
  }
  interface CreationPublishTypeRC {
      /** The RC label provided on the deployment creation */
      rcLabel?: RCLabel;
  }
  enum RCLabel {
      /** Illegal default value, exception will be thrown if used */
      UNKNOWN = "UNKNOWN",
      RELEASE_MANAGER = "RELEASE_MANAGER",
      BLOCKS = "BLOCKS",
      WIX_CLI = "WIX_CLI",
      MOBILE_APP_BUILDER = "MOBILE_APP_BUILDER",
      SEO = "SEO",
      FEEDBACK = "FEEDBACK"
  }
  interface DeploymentPipelineUpdatedMessage {
      /** The deployment id */
      deploymentId?: string;
  }
  interface CreateDeploymentRequest extends CreateDeploymentRequestBasedOnOneOf, CreateDeploymentRequestPublishMethodOneOf {
      /** Based on a specific Editor Revision. */
      specificVersion?: EditorRevision;
      /** Publish RC */
      publishSiteRcMethod?: PublishSiteRCMethod;
      /** Deployment's label. */
      label?: string;
      /** Deployments attributes. */
      deploymentAttributes?: DeploymentAttribute[];
      /** Supporting publish on the creation flow. Please specify the publish type and leave empty in case you don't want to publish */
      publishType?: PublishType;
      /** Session info */
      sessionInfo?: SessionInfo;
  }
  /** @oneof */
  interface CreateDeploymentRequestBasedOnOneOf {
      /** Based on a specific Editor Revision. */
      specificVersion?: EditorRevision;
  }
  /** @oneof */
  interface CreateDeploymentRequestPublishMethodOneOf {
      /** Publish RC */
      publishSiteRcMethod?: PublishSiteRCMethod;
  }
  interface DeploymentAttribute extends DeploymentAttributeAttributeOneOf {
      /** GridAppId attribute. */
      gridAppIdAttribute?: GridAppIdAttribute;
      /** Page attribute. */
      pageAttribute?: PagesAttribute;
  }
  /** @oneof */
  interface DeploymentAttributeAttributeOneOf {
      /** GridAppId attribute. */
      gridAppIdAttribute?: GridAppIdAttribute;
      /** Page attribute. */
      pageAttribute?: PagesAttribute;
  }
  interface GridAppIdAttribute {
      /** The gridAppId attribute would like to override/append. */
      gridAppId?: string;
  }
  interface PagesAttribute {
      /** pageIds attributes we would like to override/append. */
      pageIds?: string[];
      /** The editor revision from which we take the pages. */
      editorRevision?: EditorRevision;
  }
  enum PublishType {
      /** No publish */
      NONE = "NONE",
      /** Publish Site */
      SITE = "SITE",
      /** Publish Site's RC - Notice that PublishSiteRCMethod should be provided as well. */
      RC = "RC"
  }
  interface SessionInfo {
      /** Editor session id */
      esi?: string | null;
      /** Ds origin */
      dsOrigin?: string | null;
  }
  interface PublishSiteRCMethod {
      /** The label of this RC */
      rcLabel?: RCLabel;
  }
  interface CreateDeploymentResponse {
      /** The created Deployment */
      deployment?: Deployment;
  }
  interface GetDeploymentRequest {
      /** Id of the Deployment to retrieve */
      deploymentId: string;
  }
  interface GetDeploymentResponse {
      /** The retrieved Deployment */
      deployment?: Deployment;
  }
  interface PublishDeploymentRequest {
      /** Id of the Deployment to publish */
      deploymentId: string;
      /** If provided - will publish even if deployment's pipeline is not successfully completed */
      skipPipelineCheck?: boolean | null;
  }
  interface PublishDeploymentResponse {
      /** The published Deployment */
      deployment?: Deployment;
  }
  interface PublishRCDeploymentRequest {
      /** Id of the Deployment to publish */
      deploymentId: string;
      /** The label of this RC */
      rcLabel?: RCLabel;
      /** If provided - will publish even if deployment's pipeline is not successfully completed */
      skipPipelineCheck?: boolean | null;
  }
  interface PublishRCDeploymentResponse {
      /** The published Deployment */
      deployment?: Deployment;
  }
  interface ListDeploymentsRequest {
  }
  interface ListDeploymentsResponse {
      /** The retrieved Deployments */
      deployments?: Deployment[];
  }
  interface QueryDeploymentsRequest {
      /** Cursor query message. */
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
  interface QueryDeploymentsResponse {
      /** Results from query. */
      deployments?: Deployment[];
      /** Paging metadata */
      pagingMetadata?: CursorPagingMetadata;
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
  interface ReportDeploymentPipelineResultRequest {
      /** The deployment creation process id, should match the id that was passed in the invoke() call by the SPI Host */
      deploymentId: string;
      /** The deployment pipeline implementer id as appears in the SPI Config */
      deploymentPipelineId: string;
      /** The deployment pipeline task results */
      tasksResults?: TaskResult[];
  }
  interface ReportDeploymentPipelineResultResponse {
  }
  interface GetDeploymentPipelineDescriptionRequest {
      /** The deployment id */
      deploymentId: string;
      /** The deployment pipelines implementers ids as appears in the SPI Config to be called for getting descriptions. */
      deploymentPipelinesIds: string[];
  }
  interface GetDeploymentPipelineDescriptionResponse {
      /** Full description on the tasks each provider done on the specific deployment_id (description per task). */
      pipelinesDescription?: PipelineDescription[];
  }
  interface PipelineDescription {
      /** The deployment pipeline id (spi implementers). */
      deploymentPipelineId?: string;
      /** description per task */
      tasksDescriptions?: TaskDescription[];
  }
  interface TaskDescription {
      /** Name of the task for internal references. For example: "user code bundling". */
      taskName?: string;
      /** Description about the tasks results. */
      description?: string | null;
      /** Task status */
      status?: TaskStatus;
  }
  interface Empty {
  }
  interface UpdateExtendedFieldsRequest {
      /** ID of the entity to update. */
      _id: string;
      /** Identifier for the app whose extended fields are being updated. */
      namespace: string;
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData: Record<string, any> | null;
  }
  interface UpdateExtendedFieldsResponse {
      /** Updated Deployment. */
      deployment?: Deployment;
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
   * Creates a new Deployment
   * @public
   * @documentationMaturity preview
   * @permissionId EDITOR.DEPLOYMENT_CREATE
   * @adminMethod
   * @returns The created Deployment
   */
  function createDeployment(options?: CreateDeploymentOptions): Promise<Deployment>;
  interface CreateDeploymentOptions extends CreateDeploymentRequestBasedOnOneOf, CreateDeploymentRequestPublishMethodOneOf {
      /** Deployment's label. */
      label?: string;
      /** Deployments attributes. */
      deploymentAttributes?: DeploymentAttribute[];
      /** Supporting publish on the creation flow. Please specify the publish type and leave empty in case you don't want to publish */
      publishType?: PublishType;
      /** Session info */
      sessionInfo?: SessionInfo;
      /** Based on a specific Editor Revision. */
      specificVersion?: EditorRevision;
      /** Publish RC */
      publishSiteRcMethod?: PublishSiteRCMethod;
  }
  /**
   * Get a Deployment by id
   * @param deploymentId - Id of the Deployment to retrieve
   * @public
   * @documentationMaturity preview
   * @requiredField deploymentId
   * @permissionId EDITOR.DEPLOYMENT_READ
   * @adminMethod
   * @returns The retrieved Deployment
   */
  function getDeployment(deploymentId: string): Promise<Deployment>;
  /**
   * Publish a Deployment
   * @param deploymentId - Id of the Deployment to publish
   * @public
   * @documentationMaturity preview
   * @requiredField deploymentId
   * @permissionId EDITOR.DEPLOYMENT_PUBLISH
   * @adminMethod
   */
  function publishDeployment(deploymentId: string, options?: PublishDeploymentOptions): Promise<PublishDeploymentResponse>;
  interface PublishDeploymentOptions {
      /** If provided - will publish even if deployment's pipeline is not successfully completed */
      skipPipelineCheck?: boolean | null;
  }
  /**
   * Publish an RC Deployment
   * @param deploymentId - Id of the Deployment to publish
   * @public
   * @documentationMaturity preview
   * @requiredField deploymentId
   * @permissionId EDITOR.DEPLOYMENT_PUBLISH
   * @adminMethod
   */
  function publishRcDeployment(deploymentId: string, options?: PublishRcDeploymentOptions): Promise<PublishRCDeploymentResponse>;
  interface PublishRcDeploymentOptions {
      /** The label of this RC */
      rcLabel?: RCLabel;
      /** If provided - will publish even if deployment's pipeline is not successfully completed */
      skipPipelineCheck?: boolean | null;
  }
  /**
   * List Deployments
   * @public
   * @documentationMaturity preview
   * @permissionId EDITOR.DEPLOYMENT_READ
   * @adminMethod
   */
  function listDeployments(): Promise<ListDeploymentsResponse>;
  /**
   * Query Deployments
   * @public
   * @documentationMaturity preview
   * @permissionId EDITOR.DEPLOYMENT_READ
   * @adminMethod
   */
  function queryDeployments(): DeploymentsQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface DeploymentsQueryResult extends QueryCursorResult {
      items: Deployment[];
      query: DeploymentsQueryBuilder;
      next: () => Promise<DeploymentsQueryResult>;
      prev: () => Promise<DeploymentsQueryResult>;
  }
  interface DeploymentsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'deploymentType' | 'label' | '_updatedDate' | 'pipelines.deploymentPipelineId' | 'pipelines.pipelineStatus' | 'pipelines.tasksResults.taskName' | 'pipelines.tasksResults.status' | 'deploymentPipelinesStatus' | '_createdDate', value: any) => DeploymentsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_updatedDate' | '_createdDate', value: any) => DeploymentsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_updatedDate' | '_createdDate', value: any) => DeploymentsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_updatedDate' | '_createdDate', value: any) => DeploymentsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_updatedDate' | '_createdDate', value: any) => DeploymentsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_updatedDate' | '_createdDate', value: any) => DeploymentsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_updatedDate' | '_createdDate', value: any[]) => DeploymentsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_updatedDate' | '_createdDate', value: any) => DeploymentsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_updatedDate' | '_createdDate', value: boolean) => DeploymentsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'deploymentType' | 'label' | '_updatedDate' | 'deploymentPipelinesStatus' | '_createdDate'>) => DeploymentsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'deploymentType' | 'label' | '_updatedDate' | 'deploymentPipelinesStatus' | '_createdDate'>) => DeploymentsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => DeploymentsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => DeploymentsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<DeploymentsQueryResult>;
  }
  /**
   * The pipeline provider has to send this event when its execution has ended.
   * @param deploymentId - The deployment creation process id, should match the id that was passed in the invoke() call by the SPI Host
   * @param deploymentPipelineId - The deployment pipeline implementer id as appears in the SPI Config
   * @public
   * @documentationMaturity preview
   * @requiredField deploymentId
   * @requiredField deploymentPipelineId
   * @permissionId EDITOR.DEPLOYMENT_UPDATE
   * @adminMethod
   */
  function reportDeploymentPipelineResult(deploymentId: string, deploymentPipelineId: string, options?: ReportDeploymentPipelineResultOptions): Promise<void>;
  interface ReportDeploymentPipelineResultOptions {
      /** The deployment pipeline task results */
      tasksResults?: TaskResult[];
  }
  /**
   * Get Deployment Pipeline Description
   * @param deploymentId - The deployment id
   * @param deploymentPipelinesIds - The deployment pipelines implementers ids as appears in the SPI Config to be called for getting descriptions.
   * @public
   * @documentationMaturity preview
   * @requiredField deploymentId
   * @requiredField deploymentPipelinesIds
   * @permissionId EDITOR.DEPLOYMENT_READ
   * @adminMethod
   */
  function getDeploymentPipelineDescription(deploymentId: string, deploymentPipelinesIds: string[]): Promise<GetDeploymentPipelineDescriptionResponse>;
  /**
   * Updates extended fields of a Deployment without incrementing revision
   * @param _id - ID of the entity to update.
   * @param namespace - Identifier for the app whose extended fields are being updated.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField namespace
   * @requiredField options
   * @requiredField options.namespaceData
   * @permissionId EDITOR.DEPLOYMENT_UPDATE
   * @adminMethod
   */
  function updateExtendedFields(_id: string, namespace: string, options: UpdateExtendedFieldsOptions): Promise<UpdateExtendedFieldsResponse>;
  interface UpdateExtendedFieldsOptions {
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData: Record<string, any> | null;
  }
  
  type documentManagementEditorDeploymentsV1Deployment_universal_d_Deployment = Deployment;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentDescriptionOneOf = DeploymentDescriptionOneOf;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentCreationPublishTypeOneOf = DeploymentCreationPublishTypeOneOf;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentType = DeploymentType;
  const documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentType: typeof DeploymentType;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_EditorRevision = EditorRevision;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_PipelineResult = PipelineResult;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_PipelineStatus = PipelineStatus;
  const documentManagementEditorDeploymentsV1Deployment_universal_d_PipelineStatus: typeof PipelineStatus;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_TaskResult = TaskResult;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_TaskStatus = TaskStatus;
  const documentManagementEditorDeploymentsV1Deployment_universal_d_TaskStatus: typeof TaskStatus;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentPipelinesStatus = DeploymentPipelinesStatus;
  const documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentPipelinesStatus: typeof DeploymentPipelinesStatus;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_EditorSession = EditorSession;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_ExtendedFields = ExtendedFields;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_CreationPublishTypeNone = CreationPublishTypeNone;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_CreationPublishTypeSite = CreationPublishTypeSite;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_CreationPublishTypeRC = CreationPublishTypeRC;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_RCLabel = RCLabel;
  const documentManagementEditorDeploymentsV1Deployment_universal_d_RCLabel: typeof RCLabel;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentPipelineUpdatedMessage = DeploymentPipelineUpdatedMessage;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_CreateDeploymentRequest = CreateDeploymentRequest;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_CreateDeploymentRequestBasedOnOneOf = CreateDeploymentRequestBasedOnOneOf;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_CreateDeploymentRequestPublishMethodOneOf = CreateDeploymentRequestPublishMethodOneOf;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentAttribute = DeploymentAttribute;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentAttributeAttributeOneOf = DeploymentAttributeAttributeOneOf;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_GridAppIdAttribute = GridAppIdAttribute;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_PagesAttribute = PagesAttribute;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_PublishType = PublishType;
  const documentManagementEditorDeploymentsV1Deployment_universal_d_PublishType: typeof PublishType;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_SessionInfo = SessionInfo;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_PublishSiteRCMethod = PublishSiteRCMethod;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_CreateDeploymentResponse = CreateDeploymentResponse;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_GetDeploymentRequest = GetDeploymentRequest;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_GetDeploymentResponse = GetDeploymentResponse;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_PublishDeploymentRequest = PublishDeploymentRequest;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_PublishDeploymentResponse = PublishDeploymentResponse;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_PublishRCDeploymentRequest = PublishRCDeploymentRequest;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_PublishRCDeploymentResponse = PublishRCDeploymentResponse;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_ListDeploymentsRequest = ListDeploymentsRequest;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_ListDeploymentsResponse = ListDeploymentsResponse;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_QueryDeploymentsRequest = QueryDeploymentsRequest;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_CursorQuery = CursorQuery;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_Sorting = Sorting;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_SortOrder = SortOrder;
  const documentManagementEditorDeploymentsV1Deployment_universal_d_SortOrder: typeof SortOrder;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_CursorPaging = CursorPaging;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_QueryDeploymentsResponse = QueryDeploymentsResponse;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_Cursors = Cursors;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_ReportDeploymentPipelineResultRequest = ReportDeploymentPipelineResultRequest;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_ReportDeploymentPipelineResultResponse = ReportDeploymentPipelineResultResponse;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_GetDeploymentPipelineDescriptionRequest = GetDeploymentPipelineDescriptionRequest;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_GetDeploymentPipelineDescriptionResponse = GetDeploymentPipelineDescriptionResponse;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_PipelineDescription = PipelineDescription;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_TaskDescription = TaskDescription;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_Empty = Empty;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_UpdateExtendedFieldsRequest = UpdateExtendedFieldsRequest;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_UpdateExtendedFieldsResponse = UpdateExtendedFieldsResponse;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_DomainEvent = DomainEvent;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_RestoreInfo = RestoreInfo;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_ActionEvent = ActionEvent;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_MessageEnvelope = MessageEnvelope;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_IdentificationData = IdentificationData;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_WebhookIdentityType = WebhookIdentityType;
  const documentManagementEditorDeploymentsV1Deployment_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const documentManagementEditorDeploymentsV1Deployment_universal_d_createDeployment: typeof createDeployment;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_CreateDeploymentOptions = CreateDeploymentOptions;
  const documentManagementEditorDeploymentsV1Deployment_universal_d_getDeployment: typeof getDeployment;
  const documentManagementEditorDeploymentsV1Deployment_universal_d_publishDeployment: typeof publishDeployment;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_PublishDeploymentOptions = PublishDeploymentOptions;
  const documentManagementEditorDeploymentsV1Deployment_universal_d_publishRcDeployment: typeof publishRcDeployment;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_PublishRcDeploymentOptions = PublishRcDeploymentOptions;
  const documentManagementEditorDeploymentsV1Deployment_universal_d_listDeployments: typeof listDeployments;
  const documentManagementEditorDeploymentsV1Deployment_universal_d_queryDeployments: typeof queryDeployments;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentsQueryResult = DeploymentsQueryResult;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentsQueryBuilder = DeploymentsQueryBuilder;
  const documentManagementEditorDeploymentsV1Deployment_universal_d_reportDeploymentPipelineResult: typeof reportDeploymentPipelineResult;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_ReportDeploymentPipelineResultOptions = ReportDeploymentPipelineResultOptions;
  const documentManagementEditorDeploymentsV1Deployment_universal_d_getDeploymentPipelineDescription: typeof getDeploymentPipelineDescription;
  const documentManagementEditorDeploymentsV1Deployment_universal_d_updateExtendedFields: typeof updateExtendedFields;
  type documentManagementEditorDeploymentsV1Deployment_universal_d_UpdateExtendedFieldsOptions = UpdateExtendedFieldsOptions;
  namespace documentManagementEditorDeploymentsV1Deployment_universal_d {
    export {
      documentManagementEditorDeploymentsV1Deployment_universal_d_Deployment as Deployment,
      documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentDescriptionOneOf as DeploymentDescriptionOneOf,
      documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentCreationPublishTypeOneOf as DeploymentCreationPublishTypeOneOf,
      documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentType as DeploymentType,
      documentManagementEditorDeploymentsV1Deployment_universal_d_EditorRevision as EditorRevision,
      documentManagementEditorDeploymentsV1Deployment_universal_d_PipelineResult as PipelineResult,
      documentManagementEditorDeploymentsV1Deployment_universal_d_PipelineStatus as PipelineStatus,
      documentManagementEditorDeploymentsV1Deployment_universal_d_TaskResult as TaskResult,
      documentManagementEditorDeploymentsV1Deployment_universal_d_TaskStatus as TaskStatus,
      documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentPipelinesStatus as DeploymentPipelinesStatus,
      documentManagementEditorDeploymentsV1Deployment_universal_d_EditorSession as EditorSession,
      documentManagementEditorDeploymentsV1Deployment_universal_d_ExtendedFields as ExtendedFields,
      documentManagementEditorDeploymentsV1Deployment_universal_d_CreationPublishTypeNone as CreationPublishTypeNone,
      documentManagementEditorDeploymentsV1Deployment_universal_d_CreationPublishTypeSite as CreationPublishTypeSite,
      documentManagementEditorDeploymentsV1Deployment_universal_d_CreationPublishTypeRC as CreationPublishTypeRC,
      documentManagementEditorDeploymentsV1Deployment_universal_d_RCLabel as RCLabel,
      documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentPipelineUpdatedMessage as DeploymentPipelineUpdatedMessage,
      documentManagementEditorDeploymentsV1Deployment_universal_d_CreateDeploymentRequest as CreateDeploymentRequest,
      documentManagementEditorDeploymentsV1Deployment_universal_d_CreateDeploymentRequestBasedOnOneOf as CreateDeploymentRequestBasedOnOneOf,
      documentManagementEditorDeploymentsV1Deployment_universal_d_CreateDeploymentRequestPublishMethodOneOf as CreateDeploymentRequestPublishMethodOneOf,
      documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentAttribute as DeploymentAttribute,
      documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentAttributeAttributeOneOf as DeploymentAttributeAttributeOneOf,
      documentManagementEditorDeploymentsV1Deployment_universal_d_GridAppIdAttribute as GridAppIdAttribute,
      documentManagementEditorDeploymentsV1Deployment_universal_d_PagesAttribute as PagesAttribute,
      documentManagementEditorDeploymentsV1Deployment_universal_d_PublishType as PublishType,
      documentManagementEditorDeploymentsV1Deployment_universal_d_SessionInfo as SessionInfo,
      documentManagementEditorDeploymentsV1Deployment_universal_d_PublishSiteRCMethod as PublishSiteRCMethod,
      documentManagementEditorDeploymentsV1Deployment_universal_d_CreateDeploymentResponse as CreateDeploymentResponse,
      documentManagementEditorDeploymentsV1Deployment_universal_d_GetDeploymentRequest as GetDeploymentRequest,
      documentManagementEditorDeploymentsV1Deployment_universal_d_GetDeploymentResponse as GetDeploymentResponse,
      documentManagementEditorDeploymentsV1Deployment_universal_d_PublishDeploymentRequest as PublishDeploymentRequest,
      documentManagementEditorDeploymentsV1Deployment_universal_d_PublishDeploymentResponse as PublishDeploymentResponse,
      documentManagementEditorDeploymentsV1Deployment_universal_d_PublishRCDeploymentRequest as PublishRCDeploymentRequest,
      documentManagementEditorDeploymentsV1Deployment_universal_d_PublishRCDeploymentResponse as PublishRCDeploymentResponse,
      documentManagementEditorDeploymentsV1Deployment_universal_d_ListDeploymentsRequest as ListDeploymentsRequest,
      documentManagementEditorDeploymentsV1Deployment_universal_d_ListDeploymentsResponse as ListDeploymentsResponse,
      documentManagementEditorDeploymentsV1Deployment_universal_d_QueryDeploymentsRequest as QueryDeploymentsRequest,
      documentManagementEditorDeploymentsV1Deployment_universal_d_CursorQuery as CursorQuery,
      documentManagementEditorDeploymentsV1Deployment_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      documentManagementEditorDeploymentsV1Deployment_universal_d_Sorting as Sorting,
      documentManagementEditorDeploymentsV1Deployment_universal_d_SortOrder as SortOrder,
      documentManagementEditorDeploymentsV1Deployment_universal_d_CursorPaging as CursorPaging,
      documentManagementEditorDeploymentsV1Deployment_universal_d_QueryDeploymentsResponse as QueryDeploymentsResponse,
      documentManagementEditorDeploymentsV1Deployment_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      documentManagementEditorDeploymentsV1Deployment_universal_d_Cursors as Cursors,
      documentManagementEditorDeploymentsV1Deployment_universal_d_ReportDeploymentPipelineResultRequest as ReportDeploymentPipelineResultRequest,
      documentManagementEditorDeploymentsV1Deployment_universal_d_ReportDeploymentPipelineResultResponse as ReportDeploymentPipelineResultResponse,
      documentManagementEditorDeploymentsV1Deployment_universal_d_GetDeploymentPipelineDescriptionRequest as GetDeploymentPipelineDescriptionRequest,
      documentManagementEditorDeploymentsV1Deployment_universal_d_GetDeploymentPipelineDescriptionResponse as GetDeploymentPipelineDescriptionResponse,
      documentManagementEditorDeploymentsV1Deployment_universal_d_PipelineDescription as PipelineDescription,
      documentManagementEditorDeploymentsV1Deployment_universal_d_TaskDescription as TaskDescription,
      documentManagementEditorDeploymentsV1Deployment_universal_d_Empty as Empty,
      documentManagementEditorDeploymentsV1Deployment_universal_d_UpdateExtendedFieldsRequest as UpdateExtendedFieldsRequest,
      documentManagementEditorDeploymentsV1Deployment_universal_d_UpdateExtendedFieldsResponse as UpdateExtendedFieldsResponse,
      documentManagementEditorDeploymentsV1Deployment_universal_d_DomainEvent as DomainEvent,
      documentManagementEditorDeploymentsV1Deployment_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      documentManagementEditorDeploymentsV1Deployment_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      documentManagementEditorDeploymentsV1Deployment_universal_d_RestoreInfo as RestoreInfo,
      documentManagementEditorDeploymentsV1Deployment_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      documentManagementEditorDeploymentsV1Deployment_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      documentManagementEditorDeploymentsV1Deployment_universal_d_ActionEvent as ActionEvent,
      documentManagementEditorDeploymentsV1Deployment_universal_d_MessageEnvelope as MessageEnvelope,
      documentManagementEditorDeploymentsV1Deployment_universal_d_IdentificationData as IdentificationData,
      documentManagementEditorDeploymentsV1Deployment_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      documentManagementEditorDeploymentsV1Deployment_universal_d_WebhookIdentityType as WebhookIdentityType,
      documentManagementEditorDeploymentsV1Deployment_universal_d_createDeployment as createDeployment,
      documentManagementEditorDeploymentsV1Deployment_universal_d_CreateDeploymentOptions as CreateDeploymentOptions,
      documentManagementEditorDeploymentsV1Deployment_universal_d_getDeployment as getDeployment,
      documentManagementEditorDeploymentsV1Deployment_universal_d_publishDeployment as publishDeployment,
      documentManagementEditorDeploymentsV1Deployment_universal_d_PublishDeploymentOptions as PublishDeploymentOptions,
      documentManagementEditorDeploymentsV1Deployment_universal_d_publishRcDeployment as publishRcDeployment,
      documentManagementEditorDeploymentsV1Deployment_universal_d_PublishRcDeploymentOptions as PublishRcDeploymentOptions,
      documentManagementEditorDeploymentsV1Deployment_universal_d_listDeployments as listDeployments,
      documentManagementEditorDeploymentsV1Deployment_universal_d_queryDeployments as queryDeployments,
      documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentsQueryResult as DeploymentsQueryResult,
      documentManagementEditorDeploymentsV1Deployment_universal_d_DeploymentsQueryBuilder as DeploymentsQueryBuilder,
      documentManagementEditorDeploymentsV1Deployment_universal_d_reportDeploymentPipelineResult as reportDeploymentPipelineResult,
      documentManagementEditorDeploymentsV1Deployment_universal_d_ReportDeploymentPipelineResultOptions as ReportDeploymentPipelineResultOptions,
      documentManagementEditorDeploymentsV1Deployment_universal_d_getDeploymentPipelineDescription as getDeploymentPipelineDescription,
      documentManagementEditorDeploymentsV1Deployment_universal_d_updateExtendedFields as updateExtendedFields,
      documentManagementEditorDeploymentsV1Deployment_universal_d_UpdateExtendedFieldsOptions as UpdateExtendedFieldsOptions,
    };
  }
  
  export { documentManagementEditorDeploymentsV1Deployment_universal_d as deployments };
}
