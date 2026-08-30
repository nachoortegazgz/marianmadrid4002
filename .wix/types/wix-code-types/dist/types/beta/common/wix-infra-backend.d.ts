declare module "wix-infra-backend" {
  interface AsyncJob {
      /**
       * Unique identifier of the job
       * @readonly
       */
      _id?: string;
      /** Optional job metadata, used to store any parameters used during job execution, user-define statuses, etc. */
      metadata?: Record<string, any> | null;
      /** The current stage of job execution. */
      status?: Status;
      /**
       * The current counters.
       * @deprecated The current counters.
       * @replacedBy wix.infra.asyncjobs.v1.AsyncJob.counts
       * @removalDate 2024-12-12
       */
      counters?: Counters;
      /** @readonly */
      _createdDate?: Date;
      /** @readonly */
      _updatedDate?: Date;
      /**
       * The owner of the job.
       * @readonly
       * @deprecated The owner of the job.
       * @replacedBy wix.infra.asyncjobs.v1.AsyncJob.created_by
       * @removalDate 2024-12-12
       */
      owner?: Owner;
      /**
       * The creator of the job.
       * @readonly
       */
      createdBy?: CreatedBy;
      /** The current execution counts. */
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
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
  }
  interface MemberIdOptions {
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
  }
  interface WixUserIdOptions {
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
  }
  interface AppIdOptions {
      /** ID of an app. */
      appId?: string;
  }
  enum Status {
      UNKNOWN = "UNKNOWN",
      /** Job was created, but not started yet. */
      INITIALIZED = "INITIALIZED",
      /** Job has started and is in progress. */
      PROCESSING = "PROCESSING",
      /** Job is finished. */
      FINISHED = "FINISHED",
      /** Job is failed */
      FAILED = "FAILED"
  }
  interface Counters {
      /** Optional count of the dataset size, specified during job creation. Can be used for progress bars, etc. */
      itemsToProcess?: number | null;
      /** Amount of items that were successfully processed. */
      itemsSucceeded?: number;
      /** Amount of items whose processing failed. */
      itemsFailed?: number;
      /** A mapping between an error code and the number of failures associated with it */
      errorCountByCode?: Record<string, number>;
  }
  interface Owner extends OwnerIdOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** ID of service. */
      serviceId?: string;
  }
  /** @oneof */
  interface OwnerIdOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** ID of service. */
      serviceId?: string;
  }
  interface CreatedBy extends CreatedByOptionsOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorIdOptions?: AnonymousVisitorIdOptions;
      /** ID of a site visitor that has logged in to the site. */
      memberIdOptions?: MemberIdOptions;
      /** ID of a Wix user. */
      wixUserIdOptions?: WixUserIdOptions;
      /** ID of an app. */
      appIdOptions?: AppIdOptions;
      /** The type of the creator. */
      type?: Type;
  }
  /** @oneof */
  interface CreatedByOptionsOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorIdOptions?: AnonymousVisitorIdOptions;
      /** ID of a site visitor that has logged in to the site. */
      memberIdOptions?: MemberIdOptions;
      /** ID of a Wix user. */
      wixUserIdOptions?: WixUserIdOptions;
      /** ID of an app. */
      appIdOptions?: AppIdOptions;
  }
  interface Counts {
      /** Optional count of the dataset size, specified during job creation. Can be used for progress bars, etc. */
      total?: number | null;
      /** Amount of items that were successfully processed. */
      successCount?: number;
      /** Amount of items whose processing failed. */
      failCount?: number;
      /** A mapping between an error code and the number of failures associated with it */
      errorByCodeCount?: Record<string, number>;
  }
  /** Events */
  interface AsyncJobFinishedEvent {
      /** the job id. */
      jobId?: string;
  }
  interface AsyncJobFailedEvent {
      /** the job id. */
      jobId?: string;
  }
  interface AsyncJobItemFailedEvent {
      /** the job id. */
      jobId?: string;
      /** the job items. */
      jobItem?: AsyncJobItem;
  }
  interface AsyncJobItem {
      /** @readonly */
      _id?: string;
      /** Used to optionally return result of the job (e.g., S3 link to the generated CSV file). */
      data?: Record<string, any> | null;
      /** The optional id of the job entity id being processed. */
      entityId?: string | null;
      /**
       * Convenience property, signifies absence of errors.
       * @readonly
       */
      success?: boolean;
      /** Error which prevented item from being processed. */
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
      /** the job being created. */
      job: AsyncJob;
  }
  interface CreateAsyncJobResponse {
      /** the job created. */
      job?: AsyncJob;
  }
  interface GetAsyncJobRequest {
      /** the job id. */
      jobId: string;
  }
  interface GetAsyncJobResponse {
      /** the job returned. */
      job?: AsyncJob;
  }
  interface UpdateAsyncJobRequest {
      /** the job being updated. */
      job?: AsyncJob;
      /**
       * the mask.
       * @internal
       */
      mask?: string[];
  }
  interface UpdateAsyncJobResponse {
      /** the job updated. */
      job?: AsyncJob;
  }
  interface DeleteAsyncJobRequest {
      /** the job id. */
      jobId: string;
  }
  interface DeleteAsyncJobResponse {
  }
  interface CompleteAsyncJobRequest {
      /** the job id. */
      jobId: string;
      /** the job status. */
      status?: CompleteStatus;
  }
  enum CompleteStatus {
      /** Job is finished. */
      FINISHED = "FINISHED",
      /** Job is failed */
      FAILED = "FAILED"
  }
  interface CompleteAsyncJobResponse {
  }
  interface ReportAsyncJobProgressRequest {
      /** id of the job to report progress on */
      jobId: string;
      /** the job items being reported. */
      items?: AsyncJobItem[];
  }
  interface ReportAsyncJobProgressResponse {
  }
  interface AsyncJobItemAddedEvent {
      /** the job id. */
      jobId?: string;
      /** the job items. */
      jobItem?: AsyncJobItem;
  }
  interface ListAsyncJobItemsRequest {
      /** the job id. */
      jobId: string;
      /** the paging. */
      paging?: CursorPaging;
      /**
       * when true, only failed items will be returned.
       * when false, only successful items will be returned.
       * when not set, all both failed and successful will be returned.
       */
      hasError?: boolean | null;
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
  interface ListAsyncJobItemsResponse {
      /** the job items. */
      results?: AsyncJobItem[];
      /** paging metadata. */
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
      /** Event timestamp. */
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
  /**
   * Create new async job.
   * @param job - the job being created.
   * @internal
   * @documentationMaturity preview
   * @requiredField job
   * @adminMethod
   * @returns the job created.
   */
  function createAsyncJob(job: AsyncJob): Promise<AsyncJob>;
  /**
   * Get the job by id.
   * @param jobId - the job id.
   * @public
   * @documentationMaturity preview
   * @requiredField jobId
   * @adminMethod
   * @returns the job returned.
   */
  function getAsyncJob(jobId: string): Promise<AsyncJob>;
  /**
   * Update the job.
   * @param _id - Unique identifier of the job
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @adminMethod
   * @returns the job updated.
   */
  function updateAsyncJob(_id: string, options?: UpdateAsyncJobOptions): Promise<AsyncJob>;
  interface UpdateAsyncJobOptions {
      job: {
          /**
           * Unique identifier of the job
           * @readonly
           */
          _id?: string;
          /** Optional job metadata, used to store any parameters used during job execution, user-define statuses, etc. */
          metadata?: Record<string, any> | null;
          /** The current stage of job execution. */
          status?: Status;
          /**
           * The current counters.
           * @deprecated The current counters.
           * @replacedBy wix.infra.asyncjobs.v1.AsyncJob.counts
           * @removalDate 2024-12-12
           */
          counters?: Counters;
          /** @readonly */
          _createdDate?: Date;
          /** @readonly */
          _updatedDate?: Date;
          /**
           * The owner of the job.
           * @readonly
           * @deprecated The owner of the job.
           * @replacedBy wix.infra.asyncjobs.v1.AsyncJob.created_by
           * @removalDate 2024-12-12
           */
          owner?: Owner;
          /**
           * The creator of the job.
           * @readonly
           */
          createdBy?: CreatedBy;
          /** The current execution counts. */
          counts?: Counts;
      };
      /**
       * the mask.
       * @internal
       */
      mask?: string[];
  }
  /**
   * Delete the job.
   * @param jobId - the job id.
   * @internal
   * @documentationMaturity preview
   * @requiredField jobId
   * @adminMethod
   */
  function deleteAsyncJob(jobId: string): Promise<void>;
  /**
   * Complete the job.
   * @param jobId - the job id.
   * @internal
   * @documentationMaturity preview
   * @requiredField jobId
   * @adminMethod
   */
  function completeAsyncJob(jobId: string, options?: CompleteAsyncJobOptions): Promise<void>;
  interface CompleteAsyncJobOptions {
      /** the job status. */
      status?: CompleteStatus;
  }
  /**
   * report job progress.
   * @param jobId - id of the job to report progress on
   * @internal
   * @documentationMaturity preview
   * @requiredField jobId
   * @adminMethod
   */
  function reportAsyncJobProgress(jobId: string, options?: ReportAsyncJobProgressOptions): Promise<void>;
  interface ReportAsyncJobProgressOptions {
      /** the job items being reported. */
      items?: AsyncJobItem[];
  }
  /**
   * List the job items.
   * @param jobId - the job id.
   * @public
   * @documentationMaturity preview
   * @requiredField jobId
   * @adminMethod
   */
  function listAsyncJobItems(jobId: string, options?: ListAsyncJobItemsOptions): Promise<ListAsyncJobItemsResponse>;
  interface ListAsyncJobItemsOptions {
      /** the paging. */
      paging?: CursorPaging;
      /**
       * when true, only failed items will be returned.
       * when false, only successful items will be returned.
       * when not set, all both failed and successful will be returned.
       */
      hasError?: boolean | null;
  }
  
  export { ActionEvent, AnonymousVisitorIdOptions, AppIdOptions, ApplicationError, AsyncJob, AsyncJobFailedEvent, AsyncJobFinishedEvent, AsyncJobItem, AsyncJobItemAddedEvent, AsyncJobItemFailedEvent, CompleteAsyncJobOptions, CompleteAsyncJobRequest, CompleteAsyncJobResponse, CompleteStatus, Counters, Counts, CreateAsyncJobRequest, CreateAsyncJobResponse, CreatedBy, CreatedByOptionsOneOf, CursorPaging, Cursors, DeleteAsyncJobRequest, DeleteAsyncJobResponse, DomainEvent, DomainEventBodyOneOf, EntityCreatedEvent, EntityDeletedEvent, EntityUpdatedEvent, GetAsyncJobRequest, GetAsyncJobResponse, IdentificationData, IdentificationDataIdOneOf, ListAsyncJobItemsOptions, ListAsyncJobItemsRequest, ListAsyncJobItemsResponse, MemberIdOptions, MessageEnvelope, Owner, OwnerIdOneOf, PagingMetadataV2, ReportAsyncJobProgressOptions, ReportAsyncJobProgressRequest, ReportAsyncJobProgressResponse, Status, Type, UpdateAsyncJobOptions, UpdateAsyncJobRequest, UpdateAsyncJobResponse, WebhookIdentityType, WixUserIdOptions, completeAsyncJob, createAsyncJob, deleteAsyncJob, getAsyncJob, listAsyncJobItems, reportAsyncJobProgress, updateAsyncJob };
}
