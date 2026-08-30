declare module "wix-async-jobs.v2" {
  interface AsyncJob {
      /**
       * Job ID.
       * @readonly
       */
      _id?: string;
      /** Optional job metadata, used to store any parameters used during job execution, user-defined statuses, etc. */
      metadata?: Record<string, any> | null;
      /** Current job execution status. */
      status?: Status;
      /**
       * Current counters.
       * @deprecated Current counters.
       * @replacedBy wix.infra.asyncjobs.v1.AsyncJob.counts
       * @targetRemovalDate 2024-12-12
       */
      counters?: Counters;
      /**
       * Date and time the job was created in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the job was last updated in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Job owner.
       * @readonly
       * @deprecated Job owner.
       * @replacedBy wix.infra.asyncjobs.v1.AsyncJob.created_by
       * @targetRemovalDate 2024-12-12
       */
      owner?: Owner;
      /**
       * Job creator.
       * @readonly
       */
      createdBy?: CreatedBy;
      /** Current execution counts. */
      counts?: Counts;
  }
  enum Type {
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      ANONYMOUS_VISITOR_ID = "ANONYMOUS_VISITOR_ID",
      MEMBER_ID = "MEMBER_ID",
      WIX_USER_ID = "WIX_USER_ID",
      APP_ID = "APP_ID"
  }
  interface AnonymousVisitorIdOptions {
      /** Visitor ID - when the job is owned by a site visitor that was **not** logged in. */
      anonymousVisitorId?: string;
  }
  interface MemberIdOptions {
      /** Member ID - when the job is owned by a by a **logged in** site visitor. */
      memberId?: string;
  }
  interface WixUserIdOptions {
      /** User ID - when the job is owned by a site owner or contributor. */
      wixUserId?: string;
  }
  interface AppIdOptions {
      /** App ID - when the job is owned by an external application or Wix service. */
      appId?: string;
  }
  enum Status {
      UNKNOWN = "UNKNOWN",
      /** Job is created, but hasn't started yet. */
      INITIALIZED = "INITIALIZED",
      /** Job has started and is in progress. */
      PROCESSING = "PROCESSING",
      /** Job is finished. */
      FINISHED = "FINISHED",
      /** Job has failed. */
      FAILED = "FAILED"
  }
  interface Counters {
      /** Optional count of the dataset size, as specified during job creation. Can be used for progress bars, etc. */
      itemsToProcess?: number | null;
      /** Amount of items that were successfully processed. */
      itemsSucceeded?: number;
      /** Amount of items whose processing failed. */
      itemsFailed?: number;
      /** Mapping between an error code and the number of failures associated with it. */
      errorCountByCode?: Record<string, number>;
  }
  interface Owner extends OwnerIdOneOf {
      /** Visitor ID - when the job is owned by a site visitor that was **not** logged in. */
      anonymousVisitorId?: string;
      /** Member ID - when the job is owned by a by a **logged in** site visitor. */
      memberId?: string;
      /** User ID - when the job is owned by a site owner or contributor. */
      wixUserId?: string;
      /** App ID - when the job is owned by an external application or Wix service. */
      appId?: string;
      /** Service ID. */
      serviceId?: string;
  }
  /** @oneof */
  interface OwnerIdOneOf {
      /** Visitor ID - when the job is owned by a site visitor that was **not** logged in. */
      anonymousVisitorId?: string;
      /** Member ID - when the job is owned by a by a **logged in** site visitor. */
      memberId?: string;
      /** User ID - when the job is owned by a site owner or contributor. */
      wixUserId?: string;
      /** App ID - when the job is owned by an external application or Wix service. */
      appId?: string;
      /** Service ID. */
      serviceId?: string;
  }
  interface CreatedBy extends CreatedByOptionsOneOf {
      /** Visitor ID - when the job is created by a site visitor that was **not** logged in. */
      anonymousVisitorIdOptions?: AnonymousVisitorIdOptions;
      /** Member ID - when the job is created by a by a **logged in** site visitor. */
      memberIdOptions?: MemberIdOptions;
      /** User ID - when the job is created by a site owner or contributor. */
      wixUserIdOptions?: WixUserIdOptions;
      /** App ID - when the job is created by an external application or Wix service. */
      appIdOptions?: AppIdOptions;
      /** The type of the creator. */
      type?: Type;
  }
  /** @oneof */
  interface CreatedByOptionsOneOf {
      /** Visitor ID - when the job is created by a site visitor that was **not** logged in. */
      anonymousVisitorIdOptions?: AnonymousVisitorIdOptions;
      /** Member ID - when the job is created by a by a **logged in** site visitor. */
      memberIdOptions?: MemberIdOptions;
      /** User ID - when the job is created by a site owner or contributor. */
      wixUserIdOptions?: WixUserIdOptions;
      /** App ID - when the job is created by an external application or Wix service. */
      appIdOptions?: AppIdOptions;
  }
  interface Counts {
      /** Optional count of the dataset size, specified during job creation. Can be used for progress bars, etc. */
      total?: number | null;
      /** Amount of items that were successfully processed. */
      successCount?: number;
      /** Amount of items whose processing failed. */
      failCount?: number;
      /** Mapping between an error code and the number of failures associated with it. */
      errorByCodeCount?: Record<string, number>;
  }
  /** Events */
  interface AsyncJobFinishedEvent {
      /** Job ID. */
      jobId?: string;
  }
  interface AsyncJobFailedEvent {
      /** Job ID. */
      jobId?: string;
  }
  interface AsyncJobItemFailedEvent {
      /** Job ID. */
      jobId?: string;
      /** Job items. */
      jobItem?: AsyncJobItem;
  }
  interface AsyncJobItem {
      /**
       * Job item ID.
       * @readonly
       */
      _id?: string;
      /** Job item data, as passed by the originating service. */
      data?: Record<string, any> | null;
      /** ID of the entity being processed, as passed by the originating service. */
      entityId?: string | null;
      /**
       * Whether the job item was processed successfully.
       * @readonly
       */
      success?: boolean;
      /** Error that prevented the item from being processed, if relevant. */
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
  interface CreateAsyncJobRequest {
      /** Job to create. */
      job: AsyncJob;
  }
  interface CreateAsyncJobResponse {
      /** Created job. */
      job?: AsyncJob;
  }
  interface GetAsyncJobRequest {
      /** Job ID. */
      jobId: string;
  }
  interface GetAsyncJobResponse {
      /** Returned job. */
      job?: AsyncJob;
  }
  interface UpdateAsyncJobRequest {
      /** Job to update. */
      job?: AsyncJob;
      /**
       * Field mask.
       * @internal
       */
      mask?: string[];
  }
  interface UpdateAsyncJobResponse {
      /** Updated job. */
      job?: AsyncJob;
  }
  interface DeleteAsyncJobRequest {
      /** Job ID. */
      jobId: string;
  }
  interface DeleteAsyncJobResponse {
  }
  interface CompleteAsyncJobRequest {
      /** Job ID. */
      jobId: string;
      /** Job status. */
      status?: CompleteStatus;
  }
  enum CompleteStatus {
      /** Job is finished. */
      FINISHED = "FINISHED",
      /** Job has failed. */
      FAILED = "FAILED"
  }
  interface CompleteAsyncJobResponse {
  }
  interface ReportAsyncJobProgressRequest {
      /** Job ID. */
      jobId: string;
      /** Job items being reported. */
      items?: AsyncJobItem[];
  }
  interface ReportAsyncJobProgressResponse {
  }
  interface AsyncJobItemAddedEvent {
      /** Job ID. */
      jobId?: string;
      /** Job items. */
      jobItem?: AsyncJobItem;
  }
  interface ListAsyncJobItemsRequest {
      /** Job ID. */
      jobId: string;
      /** Pagination options. */
      paging?: CursorPaging;
      /**
       * Whether to return only failed items.
       * when false, only successful items will be returned.
       * when not set, all both failed and successful will be returned.
       * @internal
       * @deprecated
       * @replacedBy wix.infra.asyncjobs.v1.ListAsyncJobItemsRequest.status_filter
       * @targetRemovalDate 2024-12-12
       */
      hasError?: boolean | null;
      /** async job item status filter. */
      statusFilter?: StatusFilter;
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
  enum StatusFilter {
      /** Return all items. */
      ALL = "ALL",
      /** Return only failed items. */
      FAILED_ONLY = "FAILED_ONLY",
      /** Return only successful items. */
      SUCCESSFUL_ONLY = "SUCCESSFUL_ONLY"
  }
  interface ListAsyncJobItemsResponse {
      /** Job items. */
      results?: AsyncJobItem[];
      /** Paging metadata. */
      pagingMetadata?: PagingMetadataV2;
  }
  interface PagingMetadataV2 {
      /** Number of items returned in the response. */
      count?: number | null;
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
   * Creates an async job.
   * @param job - Job to create.
   * @internal
   * @documentationMaturity preview
   * @requiredField job
   * @permissionId INFRA.ASYNC_JOB_MANAGE
   * @adminMethod
   * @returns Created job.
   */
  function createAsyncJob(job: AsyncJob): Promise<AsyncJob>;
  /**
   * Retrieves a job.
   * @param jobId - Job ID.
   * @public
   * @documentationMaturity preview
   * @requiredField jobId
   * @permissionId INFRA.ASYNC_JOB_READ
   * @adminMethod
   * @returns Returned job.
   */
  function getAsyncJob(jobId: string): Promise<AsyncJob>;
  /**
   * Updates a job.
   * @param _id - Job ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId INFRA.ASYNC_JOB_MANAGE
   * @adminMethod
   * @returns Updated job.
   */
  function updateAsyncJob(_id: string, options?: UpdateAsyncJobOptions): Promise<AsyncJob>;
  interface UpdateAsyncJobOptions {
      job: {
          /**
           * Job ID.
           * @readonly
           */
          _id?: string;
          /** Optional job metadata, used to store any parameters used during job execution, user-defined statuses, etc. */
          metadata?: Record<string, any> | null;
          /** Current job execution status. */
          status?: Status;
          /**
           * Current counters.
           * @deprecated Current counters.
           * @replacedBy wix.infra.asyncjobs.v1.AsyncJob.counts
           * @targetRemovalDate 2024-12-12
           */
          counters?: Counters;
          /**
           * Date and time the job was created in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format.
           * @readonly
           */
          _createdDate?: Date | null;
          /**
           * Date and time the job was last updated in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format.
           * @readonly
           */
          _updatedDate?: Date | null;
          /**
           * Job owner.
           * @readonly
           * @deprecated Job owner.
           * @replacedBy wix.infra.asyncjobs.v1.AsyncJob.created_by
           * @targetRemovalDate 2024-12-12
           */
          owner?: Owner;
          /**
           * Job creator.
           * @readonly
           */
          createdBy?: CreatedBy;
          /** Current execution counts. */
          counts?: Counts;
      };
      /**
       * Field mask.
       * @internal
       */
      mask?: string[];
  }
  /**
   * Deletes a job.
   * @param jobId - Job ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField jobId
   * @permissionId INFRA.ASYNC_JOB_MANAGE
   * @adminMethod
   */
  function deleteAsyncJob(jobId: string): Promise<void>;
  /**
   * Completes a job.
   * @param jobId - Job ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField jobId
   * @permissionId INFRA.ASYNC_JOB_MANAGE
   * @adminMethod
   */
  function completeAsyncJob(jobId: string, options?: CompleteAsyncJobOptions): Promise<void>;
  interface CompleteAsyncJobOptions {
      /** Job status. */
      status?: CompleteStatus;
  }
  /**
   * Reports job progress.
   * @param jobId - Job ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField jobId
   * @permissionId INFRA.ASYNC_JOB_MANAGE
   * @adminMethod
   */
  function reportAsyncJobProgress(jobId: string, options?: ReportAsyncJobProgressOptions): Promise<void>;
  interface ReportAsyncJobProgressOptions {
      /** Job items being reported. */
      items?: AsyncJobItem[];
  }
  /**
   * Retrieves a list of job items.
   * @param jobId - Job ID.
   * @public
   * @documentationMaturity preview
   * @requiredField jobId
   * @param options - Field options.
   * @permissionId INFRA.ASYNC_JOB_READ
   * @adminMethod
   */
  function listAsyncJobItems(jobId: string, options?: ListAsyncJobItemsOptions): Promise<ListAsyncJobItemsResponse>;
  interface ListAsyncJobItemsOptions {
      /** Pagination options. */
      paging?: CursorPaging;
      /**
       * Whether to return only failed items.
       * when false, only successful items will be returned.
       * when not set, all both failed and successful will be returned.
       * @internal
       * @deprecated
       * @replacedBy wix.infra.asyncjobs.v1.ListAsyncJobItemsRequest.status_filter
       * @targetRemovalDate 2024-12-12
       */
      hasError?: boolean | null;
      /** async job item status filter. */
      statusFilter?: StatusFilter;
  }
  
  type infraAsyncjobsV1AsyncJob_universal_d_AsyncJob = AsyncJob;
  type infraAsyncjobsV1AsyncJob_universal_d_Type = Type;
  const infraAsyncjobsV1AsyncJob_universal_d_Type: typeof Type;
  type infraAsyncjobsV1AsyncJob_universal_d_AnonymousVisitorIdOptions = AnonymousVisitorIdOptions;
  type infraAsyncjobsV1AsyncJob_universal_d_MemberIdOptions = MemberIdOptions;
  type infraAsyncjobsV1AsyncJob_universal_d_WixUserIdOptions = WixUserIdOptions;
  type infraAsyncjobsV1AsyncJob_universal_d_AppIdOptions = AppIdOptions;
  type infraAsyncjobsV1AsyncJob_universal_d_Status = Status;
  const infraAsyncjobsV1AsyncJob_universal_d_Status: typeof Status;
  type infraAsyncjobsV1AsyncJob_universal_d_Counters = Counters;
  type infraAsyncjobsV1AsyncJob_universal_d_Owner = Owner;
  type infraAsyncjobsV1AsyncJob_universal_d_OwnerIdOneOf = OwnerIdOneOf;
  type infraAsyncjobsV1AsyncJob_universal_d_CreatedBy = CreatedBy;
  type infraAsyncjobsV1AsyncJob_universal_d_CreatedByOptionsOneOf = CreatedByOptionsOneOf;
  type infraAsyncjobsV1AsyncJob_universal_d_Counts = Counts;
  type infraAsyncjobsV1AsyncJob_universal_d_AsyncJobFinishedEvent = AsyncJobFinishedEvent;
  type infraAsyncjobsV1AsyncJob_universal_d_AsyncJobFailedEvent = AsyncJobFailedEvent;
  type infraAsyncjobsV1AsyncJob_universal_d_AsyncJobItemFailedEvent = AsyncJobItemFailedEvent;
  type infraAsyncjobsV1AsyncJob_universal_d_AsyncJobItem = AsyncJobItem;
  type infraAsyncjobsV1AsyncJob_universal_d_ApplicationError = ApplicationError;
  type infraAsyncjobsV1AsyncJob_universal_d_CreateAsyncJobRequest = CreateAsyncJobRequest;
  type infraAsyncjobsV1AsyncJob_universal_d_CreateAsyncJobResponse = CreateAsyncJobResponse;
  type infraAsyncjobsV1AsyncJob_universal_d_GetAsyncJobRequest = GetAsyncJobRequest;
  type infraAsyncjobsV1AsyncJob_universal_d_GetAsyncJobResponse = GetAsyncJobResponse;
  type infraAsyncjobsV1AsyncJob_universal_d_UpdateAsyncJobRequest = UpdateAsyncJobRequest;
  type infraAsyncjobsV1AsyncJob_universal_d_UpdateAsyncJobResponse = UpdateAsyncJobResponse;
  type infraAsyncjobsV1AsyncJob_universal_d_DeleteAsyncJobRequest = DeleteAsyncJobRequest;
  type infraAsyncjobsV1AsyncJob_universal_d_DeleteAsyncJobResponse = DeleteAsyncJobResponse;
  type infraAsyncjobsV1AsyncJob_universal_d_CompleteAsyncJobRequest = CompleteAsyncJobRequest;
  type infraAsyncjobsV1AsyncJob_universal_d_CompleteStatus = CompleteStatus;
  const infraAsyncjobsV1AsyncJob_universal_d_CompleteStatus: typeof CompleteStatus;
  type infraAsyncjobsV1AsyncJob_universal_d_CompleteAsyncJobResponse = CompleteAsyncJobResponse;
  type infraAsyncjobsV1AsyncJob_universal_d_ReportAsyncJobProgressRequest = ReportAsyncJobProgressRequest;
  type infraAsyncjobsV1AsyncJob_universal_d_ReportAsyncJobProgressResponse = ReportAsyncJobProgressResponse;
  type infraAsyncjobsV1AsyncJob_universal_d_AsyncJobItemAddedEvent = AsyncJobItemAddedEvent;
  type infraAsyncjobsV1AsyncJob_universal_d_ListAsyncJobItemsRequest = ListAsyncJobItemsRequest;
  type infraAsyncjobsV1AsyncJob_universal_d_CursorPaging = CursorPaging;
  type infraAsyncjobsV1AsyncJob_universal_d_StatusFilter = StatusFilter;
  const infraAsyncjobsV1AsyncJob_universal_d_StatusFilter: typeof StatusFilter;
  type infraAsyncjobsV1AsyncJob_universal_d_ListAsyncJobItemsResponse = ListAsyncJobItemsResponse;
  type infraAsyncjobsV1AsyncJob_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type infraAsyncjobsV1AsyncJob_universal_d_Cursors = Cursors;
  type infraAsyncjobsV1AsyncJob_universal_d_DomainEvent = DomainEvent;
  type infraAsyncjobsV1AsyncJob_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type infraAsyncjobsV1AsyncJob_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type infraAsyncjobsV1AsyncJob_universal_d_RestoreInfo = RestoreInfo;
  type infraAsyncjobsV1AsyncJob_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type infraAsyncjobsV1AsyncJob_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type infraAsyncjobsV1AsyncJob_universal_d_ActionEvent = ActionEvent;
  type infraAsyncjobsV1AsyncJob_universal_d_MessageEnvelope = MessageEnvelope;
  type infraAsyncjobsV1AsyncJob_universal_d_IdentificationData = IdentificationData;
  type infraAsyncjobsV1AsyncJob_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type infraAsyncjobsV1AsyncJob_universal_d_WebhookIdentityType = WebhookIdentityType;
  const infraAsyncjobsV1AsyncJob_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const infraAsyncjobsV1AsyncJob_universal_d_createAsyncJob: typeof createAsyncJob;
  const infraAsyncjobsV1AsyncJob_universal_d_getAsyncJob: typeof getAsyncJob;
  const infraAsyncjobsV1AsyncJob_universal_d_updateAsyncJob: typeof updateAsyncJob;
  type infraAsyncjobsV1AsyncJob_universal_d_UpdateAsyncJobOptions = UpdateAsyncJobOptions;
  const infraAsyncjobsV1AsyncJob_universal_d_deleteAsyncJob: typeof deleteAsyncJob;
  const infraAsyncjobsV1AsyncJob_universal_d_completeAsyncJob: typeof completeAsyncJob;
  type infraAsyncjobsV1AsyncJob_universal_d_CompleteAsyncJobOptions = CompleteAsyncJobOptions;
  const infraAsyncjobsV1AsyncJob_universal_d_reportAsyncJobProgress: typeof reportAsyncJobProgress;
  type infraAsyncjobsV1AsyncJob_universal_d_ReportAsyncJobProgressOptions = ReportAsyncJobProgressOptions;
  const infraAsyncjobsV1AsyncJob_universal_d_listAsyncJobItems: typeof listAsyncJobItems;
  type infraAsyncjobsV1AsyncJob_universal_d_ListAsyncJobItemsOptions = ListAsyncJobItemsOptions;
  namespace infraAsyncjobsV1AsyncJob_universal_d {
    export {
      infraAsyncjobsV1AsyncJob_universal_d_AsyncJob as AsyncJob,
      infraAsyncjobsV1AsyncJob_universal_d_Type as Type,
      infraAsyncjobsV1AsyncJob_universal_d_AnonymousVisitorIdOptions as AnonymousVisitorIdOptions,
      infraAsyncjobsV1AsyncJob_universal_d_MemberIdOptions as MemberIdOptions,
      infraAsyncjobsV1AsyncJob_universal_d_WixUserIdOptions as WixUserIdOptions,
      infraAsyncjobsV1AsyncJob_universal_d_AppIdOptions as AppIdOptions,
      infraAsyncjobsV1AsyncJob_universal_d_Status as Status,
      infraAsyncjobsV1AsyncJob_universal_d_Counters as Counters,
      infraAsyncjobsV1AsyncJob_universal_d_Owner as Owner,
      infraAsyncjobsV1AsyncJob_universal_d_OwnerIdOneOf as OwnerIdOneOf,
      infraAsyncjobsV1AsyncJob_universal_d_CreatedBy as CreatedBy,
      infraAsyncjobsV1AsyncJob_universal_d_CreatedByOptionsOneOf as CreatedByOptionsOneOf,
      infraAsyncjobsV1AsyncJob_universal_d_Counts as Counts,
      infraAsyncjobsV1AsyncJob_universal_d_AsyncJobFinishedEvent as AsyncJobFinishedEvent,
      infraAsyncjobsV1AsyncJob_universal_d_AsyncJobFailedEvent as AsyncJobFailedEvent,
      infraAsyncjobsV1AsyncJob_universal_d_AsyncJobItemFailedEvent as AsyncJobItemFailedEvent,
      infraAsyncjobsV1AsyncJob_universal_d_AsyncJobItem as AsyncJobItem,
      infraAsyncjobsV1AsyncJob_universal_d_ApplicationError as ApplicationError,
      infraAsyncjobsV1AsyncJob_universal_d_CreateAsyncJobRequest as CreateAsyncJobRequest,
      infraAsyncjobsV1AsyncJob_universal_d_CreateAsyncJobResponse as CreateAsyncJobResponse,
      infraAsyncjobsV1AsyncJob_universal_d_GetAsyncJobRequest as GetAsyncJobRequest,
      infraAsyncjobsV1AsyncJob_universal_d_GetAsyncJobResponse as GetAsyncJobResponse,
      infraAsyncjobsV1AsyncJob_universal_d_UpdateAsyncJobRequest as UpdateAsyncJobRequest,
      infraAsyncjobsV1AsyncJob_universal_d_UpdateAsyncJobResponse as UpdateAsyncJobResponse,
      infraAsyncjobsV1AsyncJob_universal_d_DeleteAsyncJobRequest as DeleteAsyncJobRequest,
      infraAsyncjobsV1AsyncJob_universal_d_DeleteAsyncJobResponse as DeleteAsyncJobResponse,
      infraAsyncjobsV1AsyncJob_universal_d_CompleteAsyncJobRequest as CompleteAsyncJobRequest,
      infraAsyncjobsV1AsyncJob_universal_d_CompleteStatus as CompleteStatus,
      infraAsyncjobsV1AsyncJob_universal_d_CompleteAsyncJobResponse as CompleteAsyncJobResponse,
      infraAsyncjobsV1AsyncJob_universal_d_ReportAsyncJobProgressRequest as ReportAsyncJobProgressRequest,
      infraAsyncjobsV1AsyncJob_universal_d_ReportAsyncJobProgressResponse as ReportAsyncJobProgressResponse,
      infraAsyncjobsV1AsyncJob_universal_d_AsyncJobItemAddedEvent as AsyncJobItemAddedEvent,
      infraAsyncjobsV1AsyncJob_universal_d_ListAsyncJobItemsRequest as ListAsyncJobItemsRequest,
      infraAsyncjobsV1AsyncJob_universal_d_CursorPaging as CursorPaging,
      infraAsyncjobsV1AsyncJob_universal_d_StatusFilter as StatusFilter,
      infraAsyncjobsV1AsyncJob_universal_d_ListAsyncJobItemsResponse as ListAsyncJobItemsResponse,
      infraAsyncjobsV1AsyncJob_universal_d_PagingMetadataV2 as PagingMetadataV2,
      infraAsyncjobsV1AsyncJob_universal_d_Cursors as Cursors,
      infraAsyncjobsV1AsyncJob_universal_d_DomainEvent as DomainEvent,
      infraAsyncjobsV1AsyncJob_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      infraAsyncjobsV1AsyncJob_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      infraAsyncjobsV1AsyncJob_universal_d_RestoreInfo as RestoreInfo,
      infraAsyncjobsV1AsyncJob_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      infraAsyncjobsV1AsyncJob_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      infraAsyncjobsV1AsyncJob_universal_d_ActionEvent as ActionEvent,
      infraAsyncjobsV1AsyncJob_universal_d_MessageEnvelope as MessageEnvelope,
      infraAsyncjobsV1AsyncJob_universal_d_IdentificationData as IdentificationData,
      infraAsyncjobsV1AsyncJob_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      infraAsyncjobsV1AsyncJob_universal_d_WebhookIdentityType as WebhookIdentityType,
      infraAsyncjobsV1AsyncJob_universal_d_createAsyncJob as createAsyncJob,
      infraAsyncjobsV1AsyncJob_universal_d_getAsyncJob as getAsyncJob,
      infraAsyncjobsV1AsyncJob_universal_d_updateAsyncJob as updateAsyncJob,
      infraAsyncjobsV1AsyncJob_universal_d_UpdateAsyncJobOptions as UpdateAsyncJobOptions,
      infraAsyncjobsV1AsyncJob_universal_d_deleteAsyncJob as deleteAsyncJob,
      infraAsyncjobsV1AsyncJob_universal_d_completeAsyncJob as completeAsyncJob,
      infraAsyncjobsV1AsyncJob_universal_d_CompleteAsyncJobOptions as CompleteAsyncJobOptions,
      infraAsyncjobsV1AsyncJob_universal_d_reportAsyncJobProgress as reportAsyncJobProgress,
      infraAsyncjobsV1AsyncJob_universal_d_ReportAsyncJobProgressOptions as ReportAsyncJobProgressOptions,
      infraAsyncjobsV1AsyncJob_universal_d_listAsyncJobItems as listAsyncJobItems,
      infraAsyncjobsV1AsyncJob_universal_d_ListAsyncJobItemsOptions as ListAsyncJobItemsOptions,
    };
  }
  
  export { infraAsyncjobsV1AsyncJob_universal_d as asyncJobs };
}
