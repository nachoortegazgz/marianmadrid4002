declare module "wix-autocms-tasks-service-v1" {
  /** Batch data items change task */
  interface Task extends TaskConfigOneOf, TaskOptionsOneOf {
      /**
       * original DeleteByQueryRequest config if DELETE_BY_QUERY task
       * @deprecated
       * @replacedBy options.delete_by_query_options
       * @targetRemovalDate 2025-01-01
       */
      deleteByQuery?: DeleteByQueryRequest;
      /**
       * config in case if UPDATE_DRAFT_PUBLISH task
       * @deprecated
       * @replacedBy options.update_publish_status_options
       * @targetRemovalDate 2025-01-01
       */
      updateDraftPublish?: UpdateDraftPublishConfig;
      /**
       * original CopyFieldDataRequest config if COPY_FIELD_DATA task
       * @deprecated
       * @replacedBy options.copy_field_data_options
       * @targetRemovalDate 2025-01-01
       */
      copyFieldData?: CopyFieldDataRequest;
      /**
       * original EditFieldDataRequest config if EDIT_FIELD_DATA task
       * @deprecated
       * @replacedBy options.edit_field_data_options
       * @targetRemovalDate 2025-01-01
       */
      editFieldData?: EditFieldDataRequest;
      /**
       * `DELETE_BY_QUERY` task options
       * @internal
       */
      deleteByQueryOptions?: DeleteByQueryOptions;
      /**
       * `COPY_FIELD_DATA` task options
       * @internal
       */
      copyFieldDataOptions?: CopyFieldDataOptions;
      /**
       * `EDIT_FIELD_DATA` task options
       * @internal
       */
      editFieldDataOptions?: EditFieldDataOptions;
      /**
       * `UPDATE_PUBLISH_STATUS` task options
       * @internal
       */
      updatePublishStatusOptions?: UpdatePublishStatusOptions;
      /**
       * Task ID
       * @readonly
       */
      _id?: string;
      /** Task type. `UPDATE_DRAFT_PUBLISH` is deprecated, use `UPDATE_PUBLISH_STATUS` instead */
      type?: Type;
      /**
       * Task status:
       * - `NEW` if task was created, but haven't started yet
       * - `RUNNING` if task is in progress
       * - `COMPLETED` if task finished, there could be partial errors in `failures`
       * - `FAILED` if task was not able to complete either due to error or have been canceled.
       * In case of cancellation `failures` will contain failure with "CANCELLED" code
       * @readonly
       */
      status?: Status;
      /**
       * start time, may be empty if NEW
       * @readonly
       */
      startedAt?: Date | null;
      /**
       * finish time, may be empty until completed
       * @readonly
       */
      finishedAt?: Date | null;
      /**
       * estimated number of items to be affected by task
       * @deprecated
       * @replacedBy item_count
       * @targetRemovalDate 2025-01-01
       */
      taskSize?: number;
      /**
       * number of items already processed
       * @readonly
       * @deprecated
       * @replacedBy items_succeeded
       * @targetRemovalDate 2025-01-01
       */
      itemsProcessed?: number;
      /**
       * number of failed items
       * @readonly
       */
      itemsFailed?: number;
      /**
       * list of encountered errors
       * @deprecated
       * @replacedBy failures
       * @targetRemovalDate 2025-01-01
       */
      errors?: Error[];
      /**
       * list of encountered errors
       * @readonly
       */
      failures?: ApplicationError[];
      /**
       * estimated number of items to be affected by task
       * @readonly
       */
      estimatedItemCount?: number;
      /**
       * number of items succeeded
       * @readonly
       */
      itemsSucceeded?: number;
  }
  /** @oneof */
  interface TaskConfigOneOf {
      /**
       * original DeleteByQueryRequest config if DELETE_BY_QUERY task
       * @deprecated
       * @replacedBy options.delete_by_query_options
       * @targetRemovalDate 2025-01-01
       */
      deleteByQuery?: DeleteByQueryRequest;
      /**
       * config in case if UPDATE_DRAFT_PUBLISH task
       * @deprecated
       * @replacedBy options.update_publish_status_options
       * @targetRemovalDate 2025-01-01
       */
      updateDraftPublish?: UpdateDraftPublishConfig;
      /**
       * original CopyFieldDataRequest config if COPY_FIELD_DATA task
       * @deprecated
       * @replacedBy options.copy_field_data_options
       * @targetRemovalDate 2025-01-01
       */
      copyFieldData?: CopyFieldDataRequest;
      /**
       * original EditFieldDataRequest config if EDIT_FIELD_DATA task
       * @deprecated
       * @replacedBy options.edit_field_data_options
       * @targetRemovalDate 2025-01-01
       */
      editFieldData?: EditFieldDataRequest;
  }
  /** @oneof */
  interface TaskOptionsOneOf {
      /**
       * `DELETE_BY_QUERY` task options
       * @internal
       */
      deleteByQueryOptions?: DeleteByQueryOptions;
      /**
       * `COPY_FIELD_DATA` task options
       * @internal
       */
      copyFieldDataOptions?: CopyFieldDataOptions;
      /**
       * `EDIT_FIELD_DATA` task options
       * @internal
       */
      editFieldDataOptions?: EditFieldDataOptions;
      /**
       * `UPDATE_PUBLISH_STATUS` task options
       * @internal
       */
      updatePublishStatusOptions?: UpdatePublishStatusOptions;
  }
  enum Type {
      UNKNOWN = "UNKNOWN",
      /** Task deletes all data collection items by given query */
      DELETE_BY_QUERY = "DELETE_BY_QUERY",
      /** use UPDATE_PUBLISH_STATUS instead */
      UPDATE_DRAFT_PUBLISH = "UPDATE_DRAFT_PUBLISH",
      /** Task copies data from one data collection field to another for all items */
      COPY_FIELD_DATA = "COPY_FIELD_DATA",
      /** Task updates field data for every data collection item */
      EDIT_FIELD_DATA = "EDIT_FIELD_DATA",
      /** Task updates data collection items publish status */
      UPDATE_PUBLISH_STATUS = "UPDATE_PUBLISH_STATUS"
  }
  enum Status {
      NEW = "NEW",
      RUNNING = "RUNNING",
      COMPLETED = "COMPLETED",
      FAILED = "FAILED"
  }
  interface Error {
      /** error message */
      message?: string;
  }
  interface DeleteByQueryRequest {
      /** collection name to delete from */
      collectionName: string;
      /** segment, by default LIVE */
      segment?: Segment;
      /** AppId, required if SANDBOX segment */
      appId?: string | null;
      /** filter to lookup for items, empty will delete all */
      filter?: Record<string, any> | null;
      /** options */
      options?: Options;
  }
  enum Segment {
      LIVE = "LIVE",
      SANDBOX = "SANDBOX"
  }
  interface Options {
      /** application-specific options */
      appOptions?: Record<string, any> | null;
      /** plugin-specific options */
      pluginOptions?: Record<string, any> | null;
  }
  interface UpdateDraftPublishConfig {
      /** original request */
      request?: UpdateDraftPublishRequest;
      /** time used as published/draft time */
      now?: Date | null;
      /** last updated record ID */
      lastUpdatedId?: string | null;
      /** optional items to update filter, none or empty means all applicable */
      filter?: Record<string, any> | null;
  }
  interface UpdateDraftPublishRequest extends UpdateDraftPublishRequestOperationOneOf {
      /** Set all items to Draft */
      setToDraft?: Empty;
      /** Set all items to Published */
      setToPublished?: Empty;
      /** Schedule all items to Draft on given date */
      scheduleToDraft?: ScheduleOperation;
      /** Schedule all items to Published on given date */
      scheduleToPublished?: ScheduleOperation;
      /** Remove any publishing schedule */
      removeScheduling?: Empty;
      /** collection to update items */
      collectionName: string;
      /** segment, LIVE by default */
      segment?: Segment;
      /** AppID, required if SANDBOX */
      appId?: string | null;
      /** optional items to update filter, none or empty means all applicable */
      filter?: Record<string, any> | null;
  }
  /** @oneof */
  interface UpdateDraftPublishRequestOperationOneOf {
      /** Set all items to Draft */
      setToDraft?: Empty;
      /** Set all items to Published */
      setToPublished?: Empty;
      /** Schedule all items to Draft on given date */
      scheduleToDraft?: ScheduleOperation;
      /** Schedule all items to Published on given date */
      scheduleToPublished?: ScheduleOperation;
      /** Remove any publishing schedule */
      removeScheduling?: Empty;
  }
  interface Empty {
  }
  interface ScheduleOperation {
      /** scheduled draft/publish date */
      date?: Date | null;
  }
  interface CopyFieldDataRequest {
      /** collection to update items */
      collectionName: string;
      /** segment, LIVE by default */
      segment?: Segment;
      /** AppID, required if SANDBOX */
      appId?: string | null;
      /** field to copy data from */
      sourceField?: string;
      /** field to copy data to */
      targetField?: string;
  }
  interface EditFieldDataRequest {
      /** collection to update items */
      collectionName: string;
      /** segment, LIVE by default */
      segment?: Segment;
      /** AppID, required if SANDBOX */
      appId?: string | null;
      /** Filter to edit only selected items */
      filter?: Record<string, any> | null;
      /** Field name to update */
      field?: string;
      /** adds elements to array */
      addItems?: any[];
      /** removes elements from array */
      removeItems?: any[];
      /** replaces all matched elements of array */
      replaceItems?: Replace[];
      /**
       * removes duplicated items from array
       *
       * Default value: false
       */
      uniqueItems?: boolean;
  }
  interface Replace {
      /** Value to search */
      from?: any;
      /** Value to replace with */
      to?: any;
  }
  interface ApplicationError {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  interface DeleteByQueryOptions {
      /** collection name to delete from */
      dataCollectionId?: string;
      /** Environment, by default LIVE */
      environment?: Environment;
      /**
       * AppId, required if SANDBOX segment
       * @internal
       */
      appId?: string | null;
      /** filter to lookup for items, empty will delete all */
      filter?: Record<string, any> | null;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: PublishPluginOptions;
  }
  enum Environment {
      LIVE = "LIVE",
      SANDBOX = "SANDBOX",
      SANDBOX_PREFERRED = "SANDBOX_PREFERRED"
  }
  interface PublishPluginOptions {
      /**
       * Whether to include draft items.
       * When `true`, the response includes both published and draft items. Default: `false`.
       */
      includeDraftItems?: boolean;
  }
  interface CopyFieldDataOptions {
      /** collection to update items */
      dataCollectionId?: string;
      /** Environment, by default LIVE */
      environment?: Environment;
      /**
       * AppId, required if SANDBOX segment
       * @internal
       */
      appId?: string | null;
      /** field to copy data from */
      sourceFieldKey?: string;
      /** field to copy data to */
      targetFieldKey?: string;
  }
  interface EditFieldDataOptions {
      /** collection to update items */
      dataCollectionId?: string;
      /** Environment, by default LIVE */
      environment?: Environment;
      /**
       * AppId, required if SANDBOX segment
       * @internal
       */
      appId?: string | null;
      /** Filter to edit only selected items */
      filter?: Record<string, any> | null;
      /** Field key to update */
      fieldKey?: string;
      /** Edit operations to perform on field values */
      operations?: Operations;
  }
  interface OperationsReplace {
      /** Value to search */
      from?: any;
      /** Value to replace with */
      to?: any;
  }
  interface Operations {
      /** adds elements to array */
      addItems?: any[];
      /** removes elements from array */
      removeItems?: any[];
      /** replaces all matched elements of array or value of non-array field */
      replaceItems?: OperationsReplace[];
      /**
       * removes duplicated items from array
       *
       * Default value: false
       */
      removeDuplicates?: boolean;
  }
  interface UpdatePublishStatusOptions extends UpdatePublishStatusOptionsOptionsOneOf {
      /** Schedule all items to Draft on given date */
      scheduleDraftStatusOptions?: UpdatePublishStatusOptionsScheduleOperation;
      /** Schedule all items to Published on given date */
      schedulePublishedStatusOptions?: UpdatePublishStatusOptionsScheduleOperation;
      /** collection to update items */
      dataCollectionId?: string;
      /** Environment, by default LIVE */
      environment?: Environment;
      /**
       * AppId, required if SANDBOX segment
       * @internal
       */
      appId?: string | null;
      /** optional items to update filter, none or empty means all applicable */
      filter?: Record<string, any> | null;
      /** Update operation to be performed */
      operation?: Operation;
  }
  /** @oneof */
  interface UpdatePublishStatusOptionsOptionsOneOf {
      /** Schedule all items to Draft on given date */
      scheduleDraftStatusOptions?: UpdatePublishStatusOptionsScheduleOperation;
      /** Schedule all items to Published on given date */
      schedulePublishedStatusOptions?: UpdatePublishStatusOptionsScheduleOperation;
  }
  enum Operation {
      UNDEFINED = "UNDEFINED",
      /** Sets all items status to PUBLISHED */
      SET_PUBLISHED_STATUS = "SET_PUBLISHED_STATUS",
      /** Sets all items status to DRAFT */
      SET_DRAFT_STATUS = "SET_DRAFT_STATUS",
      /** Schedules all items publish */
      SCHEDULE_PUBLISHED_STATUS = "SCHEDULE_PUBLISHED_STATUS",
      /** Schedules all items draft */
      SCHEDULE_DRAFT_STATUS = "SCHEDULE_DRAFT_STATUS",
      /** Cancels all items scheduling */
      CANCEL_SCHEDULING = "CANCEL_SCHEDULING"
  }
  interface UpdatePublishStatusOptionsScheduleOperation {
      /** scheduled draft/publish date */
      date?: Date | null;
  }
  interface CreateTaskRequest {
      /** Task to run */
      task?: Task;
  }
  interface CreateTaskResponse {
      /** Task created */
      task?: Task;
  }
  interface ListTasksRequest {
      /** Allow paginating, default: limit = 30 and offset = 0 */
      paging?: Paging;
  }
  interface Paging {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface ListTasksResponse {
      /** requested tasks */
      tasks?: Task[];
      /** paging metadata */
      metadata?: PagingMetadataV2;
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
  interface GetTaskRequest {
      /** task ID */
      taskId: string;
  }
  interface GetTaskResponse {
      /** requested task */
      task?: Task;
  }
  interface CancelTaskRequest {
      /** task ID to cancel */
      taskId: string;
  }
  interface CancelTaskResponse {
      /** current task state */
      task?: Task;
  }
  interface TaskSubmitted {
      /** submitted task ID */
      taskId?: string;
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
   * Creates and starts task execution
   *
   * Requires additional specific permissions for every task type.
   * @public
   * @documentationMaturity preview
   * @requiredField options
   * @requiredField options.task
   * @requiredField options.task.type
   * @permissionId AUTOCMS.TASK_CREATE
   * @permissionId AUTOCMS.TASK_DELETE_BY_QUERY
   * @permissionId AUTOCMS.TASK_UPDATE_DRAFT_PUBLISH
   * @permissionId AUTOCMS.TASK_COPY_FIELD_DATA
   * @permissionId AUTOCMS.TASK_EDIT_FIELD_DATA
   * @adminMethod
   * @returns Task created
   */
  function createTask(options: CreateTaskOptions): Promise<Task>;
  interface CreateTaskOptions {
      /** Task to run */
      task?: Task;
  }
  /**
   * Returns a list of tasks, given the provided paging (offset, limit)
   * @public
   * @documentationMaturity preview
   * @permissionId AUTOCMS.TASK_READ
   * @adminMethod
   */
  function listTasks(options?: ListTasksOptions): Promise<ListTasksResponse>;
  interface ListTasksOptions {
      /** Allow paginating, default: limit = 30 and offset = 0 */
      paging?: Paging;
  }
  /**
   * Returns task details and status by ID
   * @param taskId - task ID
   * @public
   * @documentationMaturity preview
   * @requiredField taskId
   * @permissionId AUTOCMS.TASK_READ
   * @adminMethod
   * @returns requested task
   */
  function getTask(taskId: string): Promise<Task>;
  /**
   * Interrupts task execution
   * @param taskId - task ID to cancel
   * @public
   * @documentationMaturity preview
   * @requiredField taskId
   * @permissionId AUTOCMS.TASK_CANCEL
   * @adminMethod
   */
  function cancelTask(taskId: string): Promise<CancelTaskResponse>;
  /**
   * Deletes collection items by filter
   * @param collectionName - collection name to delete from
   * @public
   * @documentationMaturity preview
   * @requiredField collectionName
   * @permissionId AUTOCMS.TASK_DELETE_BY_QUERY
   * @adminMethod
   * @deprecated
   * @replacedBy CreateTask
   * @targetRemovalDate 2025-01-01
   */
  function deleteByQuery(collectionName: string, options?: DeleteByQueryOptionsForRequest): Promise<TaskSubmitted>;
  interface DeleteByQueryOptionsForRequest {
      /** segment, by default LIVE */
      segment?: Segment;
      /** AppId, required if SANDBOX segment */
      appId?: string | null;
      /** filter to lookup for items, empty will delete all */
      filter?: Record<string, any> | null;
      /** options */
      options?: Options;
  }
  /**
   * Updates Draft/Publish status of all items
   * @param collectionName - collection to update items
   * @public
   * @documentationMaturity preview
   * @requiredField collectionName
   * @permissionId AUTOCMS.TASK_UPDATE_DRAFT_PUBLISH
   * @adminMethod
   * @deprecated
   * @replacedBy CreateTask
   * @targetRemovalDate 2025-01-01
   */
  function updateDraftPublish(collectionName: string, options?: UpdateDraftPublishOptions): Promise<TaskSubmitted>;
  interface UpdateDraftPublishOptions extends UpdateDraftPublishRequestOperationOneOf {
      /** segment, LIVE by default */
      segment?: Segment;
      /** AppID, required if SANDBOX */
      appId?: string | null;
      /** optional items to update filter, none or empty means all applicable */
      filter?: Record<string, any> | null;
      /** Set all items to Draft */
      setToDraft?: Empty;
      /** Set all items to Published */
      setToPublished?: Empty;
      /** Schedule all items to Draft on given date */
      scheduleToDraft?: ScheduleOperation;
      /** Schedule all items to Published on given date */
      scheduleToPublished?: ScheduleOperation;
      /** Remove any publishing schedule */
      removeScheduling?: Empty;
  }
  /**
   * Copies all data from one field to another in same collection
   * @param collectionName - collection to update items
   * @public
   * @documentationMaturity preview
   * @requiredField collectionName
   * @permissionId AUTOCMS.TASK_COPY_FIELD_DATA
   * @adminMethod
   * @deprecated
   * @replacedBy CreateTask
   * @targetRemovalDate 2025-01-01
   */
  function copyFieldData(collectionName: string, options?: CopyFieldDataOptionsForRequest): Promise<TaskSubmitted>;
  interface CopyFieldDataOptionsForRequest {
      /** segment, LIVE by default */
      segment?: Segment;
      /** AppID, required if SANDBOX */
      appId?: string | null;
      /** field to copy data from */
      sourceField?: string;
      /** field to copy data to */
      targetField?: string;
  }
  /**
   * Updates data in a field
   *
   * Operations:
   * - `addItems` adds elements to array
   * - `removeItems` removes elements from array
   * - `replaceItems` replaces all matched elements of array
   * - `uniqueItems` removes duplicated items from array
   *
   * Array operations are applied only if current field value is array or not set (treated as empty array)
   * @param collectionName - collection to update items
   * @public
   * @documentationMaturity preview
   * @requiredField collectionName
   * @permissionId AUTOCMS.TASK_EDIT_FIELD_DATA
   * @adminMethod
   * @deprecated
   * @replacedBy CreateTask
   * @targetRemovalDate 2025-01-01
   */
  function editFieldData(collectionName: string, options?: EditFieldDataOptionsForRequest): Promise<TaskSubmitted>;
  interface EditFieldDataOptionsForRequest {
      /** segment, LIVE by default */
      segment?: Segment;
      /** AppID, required if SANDBOX */
      appId?: string | null;
      /** Filter to edit only selected items */
      filter?: Record<string, any> | null;
      /** Field name to update */
      field?: string;
      /** adds elements to array */
      addItems?: any[];
      /** removes elements from array */
      removeItems?: any[];
      /** replaces all matched elements of array */
      replaceItems?: Replace[];
      /**
       * removes duplicated items from array
       *
       * Default value: false
       */
      uniqueItems?: boolean;
  }
  
  type dataAutocmsV2BackgroundTask_universal_d_Task = Task;
  type dataAutocmsV2BackgroundTask_universal_d_TaskConfigOneOf = TaskConfigOneOf;
  type dataAutocmsV2BackgroundTask_universal_d_TaskOptionsOneOf = TaskOptionsOneOf;
  type dataAutocmsV2BackgroundTask_universal_d_Type = Type;
  const dataAutocmsV2BackgroundTask_universal_d_Type: typeof Type;
  type dataAutocmsV2BackgroundTask_universal_d_Status = Status;
  const dataAutocmsV2BackgroundTask_universal_d_Status: typeof Status;
  type dataAutocmsV2BackgroundTask_universal_d_Error = Error;
  type dataAutocmsV2BackgroundTask_universal_d_DeleteByQueryRequest = DeleteByQueryRequest;
  type dataAutocmsV2BackgroundTask_universal_d_Segment = Segment;
  const dataAutocmsV2BackgroundTask_universal_d_Segment: typeof Segment;
  type dataAutocmsV2BackgroundTask_universal_d_Options = Options;
  type dataAutocmsV2BackgroundTask_universal_d_UpdateDraftPublishConfig = UpdateDraftPublishConfig;
  type dataAutocmsV2BackgroundTask_universal_d_UpdateDraftPublishRequest = UpdateDraftPublishRequest;
  type dataAutocmsV2BackgroundTask_universal_d_UpdateDraftPublishRequestOperationOneOf = UpdateDraftPublishRequestOperationOneOf;
  type dataAutocmsV2BackgroundTask_universal_d_Empty = Empty;
  type dataAutocmsV2BackgroundTask_universal_d_ScheduleOperation = ScheduleOperation;
  type dataAutocmsV2BackgroundTask_universal_d_CopyFieldDataRequest = CopyFieldDataRequest;
  type dataAutocmsV2BackgroundTask_universal_d_EditFieldDataRequest = EditFieldDataRequest;
  type dataAutocmsV2BackgroundTask_universal_d_Replace = Replace;
  type dataAutocmsV2BackgroundTask_universal_d_ApplicationError = ApplicationError;
  type dataAutocmsV2BackgroundTask_universal_d_DeleteByQueryOptions = DeleteByQueryOptions;
  type dataAutocmsV2BackgroundTask_universal_d_Environment = Environment;
  const dataAutocmsV2BackgroundTask_universal_d_Environment: typeof Environment;
  type dataAutocmsV2BackgroundTask_universal_d_PublishPluginOptions = PublishPluginOptions;
  type dataAutocmsV2BackgroundTask_universal_d_CopyFieldDataOptions = CopyFieldDataOptions;
  type dataAutocmsV2BackgroundTask_universal_d_EditFieldDataOptions = EditFieldDataOptions;
  type dataAutocmsV2BackgroundTask_universal_d_OperationsReplace = OperationsReplace;
  type dataAutocmsV2BackgroundTask_universal_d_Operations = Operations;
  type dataAutocmsV2BackgroundTask_universal_d_UpdatePublishStatusOptions = UpdatePublishStatusOptions;
  type dataAutocmsV2BackgroundTask_universal_d_UpdatePublishStatusOptionsOptionsOneOf = UpdatePublishStatusOptionsOptionsOneOf;
  type dataAutocmsV2BackgroundTask_universal_d_Operation = Operation;
  const dataAutocmsV2BackgroundTask_universal_d_Operation: typeof Operation;
  type dataAutocmsV2BackgroundTask_universal_d_UpdatePublishStatusOptionsScheduleOperation = UpdatePublishStatusOptionsScheduleOperation;
  type dataAutocmsV2BackgroundTask_universal_d_CreateTaskRequest = CreateTaskRequest;
  type dataAutocmsV2BackgroundTask_universal_d_CreateTaskResponse = CreateTaskResponse;
  type dataAutocmsV2BackgroundTask_universal_d_ListTasksRequest = ListTasksRequest;
  type dataAutocmsV2BackgroundTask_universal_d_Paging = Paging;
  type dataAutocmsV2BackgroundTask_universal_d_ListTasksResponse = ListTasksResponse;
  type dataAutocmsV2BackgroundTask_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type dataAutocmsV2BackgroundTask_universal_d_Cursors = Cursors;
  type dataAutocmsV2BackgroundTask_universal_d_GetTaskRequest = GetTaskRequest;
  type dataAutocmsV2BackgroundTask_universal_d_GetTaskResponse = GetTaskResponse;
  type dataAutocmsV2BackgroundTask_universal_d_CancelTaskRequest = CancelTaskRequest;
  type dataAutocmsV2BackgroundTask_universal_d_CancelTaskResponse = CancelTaskResponse;
  type dataAutocmsV2BackgroundTask_universal_d_TaskSubmitted = TaskSubmitted;
  type dataAutocmsV2BackgroundTask_universal_d_DomainEvent = DomainEvent;
  type dataAutocmsV2BackgroundTask_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type dataAutocmsV2BackgroundTask_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type dataAutocmsV2BackgroundTask_universal_d_RestoreInfo = RestoreInfo;
  type dataAutocmsV2BackgroundTask_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type dataAutocmsV2BackgroundTask_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type dataAutocmsV2BackgroundTask_universal_d_ActionEvent = ActionEvent;
  type dataAutocmsV2BackgroundTask_universal_d_MessageEnvelope = MessageEnvelope;
  type dataAutocmsV2BackgroundTask_universal_d_IdentificationData = IdentificationData;
  type dataAutocmsV2BackgroundTask_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type dataAutocmsV2BackgroundTask_universal_d_WebhookIdentityType = WebhookIdentityType;
  const dataAutocmsV2BackgroundTask_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const dataAutocmsV2BackgroundTask_universal_d_createTask: typeof createTask;
  type dataAutocmsV2BackgroundTask_universal_d_CreateTaskOptions = CreateTaskOptions;
  const dataAutocmsV2BackgroundTask_universal_d_listTasks: typeof listTasks;
  type dataAutocmsV2BackgroundTask_universal_d_ListTasksOptions = ListTasksOptions;
  const dataAutocmsV2BackgroundTask_universal_d_getTask: typeof getTask;
  const dataAutocmsV2BackgroundTask_universal_d_cancelTask: typeof cancelTask;
  const dataAutocmsV2BackgroundTask_universal_d_deleteByQuery: typeof deleteByQuery;
  type dataAutocmsV2BackgroundTask_universal_d_DeleteByQueryOptionsForRequest = DeleteByQueryOptionsForRequest;
  const dataAutocmsV2BackgroundTask_universal_d_updateDraftPublish: typeof updateDraftPublish;
  type dataAutocmsV2BackgroundTask_universal_d_UpdateDraftPublishOptions = UpdateDraftPublishOptions;
  const dataAutocmsV2BackgroundTask_universal_d_copyFieldData: typeof copyFieldData;
  type dataAutocmsV2BackgroundTask_universal_d_CopyFieldDataOptionsForRequest = CopyFieldDataOptionsForRequest;
  const dataAutocmsV2BackgroundTask_universal_d_editFieldData: typeof editFieldData;
  type dataAutocmsV2BackgroundTask_universal_d_EditFieldDataOptionsForRequest = EditFieldDataOptionsForRequest;
  namespace dataAutocmsV2BackgroundTask_universal_d {
    export {
      dataAutocmsV2BackgroundTask_universal_d_Task as Task,
      dataAutocmsV2BackgroundTask_universal_d_TaskConfigOneOf as TaskConfigOneOf,
      dataAutocmsV2BackgroundTask_universal_d_TaskOptionsOneOf as TaskOptionsOneOf,
      dataAutocmsV2BackgroundTask_universal_d_Type as Type,
      dataAutocmsV2BackgroundTask_universal_d_Status as Status,
      dataAutocmsV2BackgroundTask_universal_d_Error as Error,
      dataAutocmsV2BackgroundTask_universal_d_DeleteByQueryRequest as DeleteByQueryRequest,
      dataAutocmsV2BackgroundTask_universal_d_Segment as Segment,
      dataAutocmsV2BackgroundTask_universal_d_Options as Options,
      dataAutocmsV2BackgroundTask_universal_d_UpdateDraftPublishConfig as UpdateDraftPublishConfig,
      dataAutocmsV2BackgroundTask_universal_d_UpdateDraftPublishRequest as UpdateDraftPublishRequest,
      dataAutocmsV2BackgroundTask_universal_d_UpdateDraftPublishRequestOperationOneOf as UpdateDraftPublishRequestOperationOneOf,
      dataAutocmsV2BackgroundTask_universal_d_Empty as Empty,
      dataAutocmsV2BackgroundTask_universal_d_ScheduleOperation as ScheduleOperation,
      dataAutocmsV2BackgroundTask_universal_d_CopyFieldDataRequest as CopyFieldDataRequest,
      dataAutocmsV2BackgroundTask_universal_d_EditFieldDataRequest as EditFieldDataRequest,
      dataAutocmsV2BackgroundTask_universal_d_Replace as Replace,
      dataAutocmsV2BackgroundTask_universal_d_ApplicationError as ApplicationError,
      dataAutocmsV2BackgroundTask_universal_d_DeleteByQueryOptions as DeleteByQueryOptions,
      dataAutocmsV2BackgroundTask_universal_d_Environment as Environment,
      dataAutocmsV2BackgroundTask_universal_d_PublishPluginOptions as PublishPluginOptions,
      dataAutocmsV2BackgroundTask_universal_d_CopyFieldDataOptions as CopyFieldDataOptions,
      dataAutocmsV2BackgroundTask_universal_d_EditFieldDataOptions as EditFieldDataOptions,
      dataAutocmsV2BackgroundTask_universal_d_OperationsReplace as OperationsReplace,
      dataAutocmsV2BackgroundTask_universal_d_Operations as Operations,
      dataAutocmsV2BackgroundTask_universal_d_UpdatePublishStatusOptions as UpdatePublishStatusOptions,
      dataAutocmsV2BackgroundTask_universal_d_UpdatePublishStatusOptionsOptionsOneOf as UpdatePublishStatusOptionsOptionsOneOf,
      dataAutocmsV2BackgroundTask_universal_d_Operation as Operation,
      dataAutocmsV2BackgroundTask_universal_d_UpdatePublishStatusOptionsScheduleOperation as UpdatePublishStatusOptionsScheduleOperation,
      dataAutocmsV2BackgroundTask_universal_d_CreateTaskRequest as CreateTaskRequest,
      dataAutocmsV2BackgroundTask_universal_d_CreateTaskResponse as CreateTaskResponse,
      dataAutocmsV2BackgroundTask_universal_d_ListTasksRequest as ListTasksRequest,
      dataAutocmsV2BackgroundTask_universal_d_Paging as Paging,
      dataAutocmsV2BackgroundTask_universal_d_ListTasksResponse as ListTasksResponse,
      dataAutocmsV2BackgroundTask_universal_d_PagingMetadataV2 as PagingMetadataV2,
      dataAutocmsV2BackgroundTask_universal_d_Cursors as Cursors,
      dataAutocmsV2BackgroundTask_universal_d_GetTaskRequest as GetTaskRequest,
      dataAutocmsV2BackgroundTask_universal_d_GetTaskResponse as GetTaskResponse,
      dataAutocmsV2BackgroundTask_universal_d_CancelTaskRequest as CancelTaskRequest,
      dataAutocmsV2BackgroundTask_universal_d_CancelTaskResponse as CancelTaskResponse,
      dataAutocmsV2BackgroundTask_universal_d_TaskSubmitted as TaskSubmitted,
      dataAutocmsV2BackgroundTask_universal_d_DomainEvent as DomainEvent,
      dataAutocmsV2BackgroundTask_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      dataAutocmsV2BackgroundTask_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      dataAutocmsV2BackgroundTask_universal_d_RestoreInfo as RestoreInfo,
      dataAutocmsV2BackgroundTask_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      dataAutocmsV2BackgroundTask_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      dataAutocmsV2BackgroundTask_universal_d_ActionEvent as ActionEvent,
      dataAutocmsV2BackgroundTask_universal_d_MessageEnvelope as MessageEnvelope,
      dataAutocmsV2BackgroundTask_universal_d_IdentificationData as IdentificationData,
      dataAutocmsV2BackgroundTask_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      dataAutocmsV2BackgroundTask_universal_d_WebhookIdentityType as WebhookIdentityType,
      dataAutocmsV2BackgroundTask_universal_d_createTask as createTask,
      dataAutocmsV2BackgroundTask_universal_d_CreateTaskOptions as CreateTaskOptions,
      dataAutocmsV2BackgroundTask_universal_d_listTasks as listTasks,
      dataAutocmsV2BackgroundTask_universal_d_ListTasksOptions as ListTasksOptions,
      dataAutocmsV2BackgroundTask_universal_d_getTask as getTask,
      dataAutocmsV2BackgroundTask_universal_d_cancelTask as cancelTask,
      dataAutocmsV2BackgroundTask_universal_d_deleteByQuery as deleteByQuery,
      dataAutocmsV2BackgroundTask_universal_d_DeleteByQueryOptionsForRequest as DeleteByQueryOptionsForRequest,
      dataAutocmsV2BackgroundTask_universal_d_updateDraftPublish as updateDraftPublish,
      dataAutocmsV2BackgroundTask_universal_d_UpdateDraftPublishOptions as UpdateDraftPublishOptions,
      dataAutocmsV2BackgroundTask_universal_d_copyFieldData as copyFieldData,
      dataAutocmsV2BackgroundTask_universal_d_CopyFieldDataOptionsForRequest as CopyFieldDataOptionsForRequest,
      dataAutocmsV2BackgroundTask_universal_d_editFieldData as editFieldData,
      dataAutocmsV2BackgroundTask_universal_d_EditFieldDataOptionsForRequest as EditFieldDataOptionsForRequest,
    };
  }
  
  export { dataAutocmsV2BackgroundTask_universal_d as autocms };
}
