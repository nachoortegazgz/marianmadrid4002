declare module "wix-review-request.v1" {
  /** ReviewRequest is the main entity of ReviewRequests */
  interface ReviewRequest extends ReviewRequestStatusOptionsOneOf {
      failedOptions?: FailedOptions;
      sentOptions?: SentOptions;
      /**
       * Review request ID
       * @readonly
       */
      _id?: string | null;
      /**
       * Represents the current state of an item. Each time the item is modified, its `revision` changes by the server. for an update operation to succeed, you MUST pass the latest revision
       * @readonly
       */
      revision?: string | null;
      /**
       * Represents the time this review request was created
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Represents the time this review request was last updated
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Represents the time this review request to be sent */
      sendDate?: Date | null;
      /** Namespace of app integrated with reviews */
      namespace?: string;
      /** Id of event which triggers review request (e.g. order id) */
      eventId?: string;
      /** Label of event which triggers review request (e.g. order id) */
      eventLabel?: string | null;
      /** Entities to review */
      entitiesToReview?: Entity[];
      /** Review request */
      recipient?: Recipient;
      /** Id of event which triggers review request (e.g. order id) */
      activationId?: string;
      /** Indicates notification channel of review request */
      communicationChannel?: CommunicationChannel;
      /**
       * Indicates status of review request.
       * @readonly
       */
      status?: ReviewRequestStatus;
      /** Indicates review request was opened. */
      opened?: boolean;
      /** Wix data extensions */
      extendedFields?: ExtendedFields;
  }
  /** @oneof */
  interface ReviewRequestStatusOptionsOneOf {
      failedOptions?: FailedOptions;
      sentOptions?: SentOptions;
  }
  /** Entity describing recipient */
  interface Entity {
      /** Entity id */
      _id?: string;
      /** Data of the review written by review request recipient */
      reviewData?: ReviewData;
  }
  enum ReviewSource {
      UNKNOWN_REVIEW_SOURCE = "UNKNOWN_REVIEW_SOURCE",
      REVIEW_REQUEST_NOTIFICATION = "REVIEW_REQUEST_NOTIFICATION",
      ORGANIC_REVIEW = "ORGANIC_REVIEW"
  }
  interface ReviewData {
      /** Indicates id of review written by review request recipient */
      reviewId?: string;
      /** Indicates how review request recipient left a review */
      reviewSource?: ReviewSource;
  }
  /** Entity for which review request was created */
  interface Recipient {
      /** Contact id of recipient */
      contactId?: string;
  }
  enum CommunicationChannel {
      UNKNOWN_COMMUNICATION_CHANNEL = "UNKNOWN_COMMUNICATION_CHANNEL",
      EMAIL = "EMAIL"
  }
  enum ReviewRequestStatus {
      /** Indicates unknown status of review request. */
      UNKNOWN_REVIEW_REQUEST_STATUS = "UNKNOWN_REVIEW_REQUEST_STATUS",
      /** Indicates review request was scheduled. */
      SCHEDULED = "SCHEDULED",
      /** Indicates review request was canceled. */
      CANCELED = "CANCELED",
      /** Indicates review request failed. */
      FAILED = "FAILED",
      /** Indicates review request was sent. */
      SENT = "SENT"
  }
  interface FailedOptions {
      reason?: FailureReason;
      message?: string | null;
  }
  enum FailureReason {
      /** Unknown reason for review request failure. */
      UNKNOWN_FAILURE_REASON = "UNKNOWN_FAILURE_REASON",
      /** Failure in activation process. */
      ACTIVATION_FAILED = "ACTIVATION_FAILED",
      /** Review request was bounced. */
      BOUNCED = "BOUNCED",
      /** Review request failed due to inactive subscription. */
      SUBSCRIPTION_INACTIVE = "SUBSCRIPTION_INACTIVE"
  }
  interface SentOptions {
      opened?: boolean;
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
  interface CreateReviewRequestRequest {
      /** ReviewRequest to be created */
      reviewRequest: ReviewRequest;
  }
  interface CreateReviewRequestResponse {
      /** The created ReviewRequest */
      reviewRequest?: ReviewRequest;
  }
  interface GetReviewRequestRequest {
      /** Id of the ReviewRequest to retrieve */
      reviewRequestId: string;
  }
  interface GetReviewRequestResponse {
      /** The retrieved ReviewRequest */
      reviewRequest?: ReviewRequest;
  }
  interface DeleteReviewRequestRequest {
      /** Id of the ReviewRequest to delete */
      reviewRequestId: string;
  }
  interface DeleteReviewRequestResponse {
  }
  interface QueryReviewRequestsRequest {
      /** WQL expression */
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
  interface QueryReviewRequestsResponse {
      /** The retrieved ReviewRequests */
      reviewRequests?: ReviewRequest[];
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
  interface CountReviewRequestsRequest {
      filter?: Record<string, any> | null;
  }
  interface CountReviewRequestsResponse {
      count?: number;
  }
  interface BulkCancelReviewRequestRequest {
      filter?: Record<string, any> | null;
  }
  interface BulkCancelReviewRequestResponse {
      jobId?: string;
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
  interface ActivationStatus {
      /** Activation's ID. */
      _id?: string;
      /** Configuration's ID. */
      configurationId?: string;
      /** Configuration's Correlation ID. */
      configurationCorrelationId?: string;
      /** Activation's status. */
      status?: Status;
      /** Activation's error reason (if there is one). */
      errorReason?: string | null;
  }
  enum Status {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      STARTED = "STARTED",
      ENDED = "ENDED",
      ERROR = "ERROR",
      SCHEDULED = "SCHEDULED",
      FROM_SCHEDULER = "FROM_SCHEDULER",
      RETRY = "RETRY",
      RESUMED = "RESUMED",
      PAUSED = "PAUSED",
      ACTION_SKIPPED = "ACTION_SKIPPED"
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
   * Creates a new Review Request
   * @param reviewRequest - ReviewRequest to be created
   * @internal
   * @documentationMaturity preview
   * @requiredField reviewRequest
   * @requiredField reviewRequest.activationId
   * @requiredField reviewRequest.communicationChannel
   * @requiredField reviewRequest.eventId
   * @requiredField reviewRequest.recipient.contactId
   * @requiredField reviewRequest.sendDate
   * @permissionId REVIEWS.REVIEW_REQUEST_CREATE
   * @adminMethod
   * @returns The created ReviewRequest
   */
  function createReviewRequest(reviewRequest: ReviewRequest): Promise<ReviewRequest>;
  /**
   * Get a Review Request by id
   * @param reviewRequestId - Id of the ReviewRequest to retrieve
   * @public
   * @documentationMaturity preview
   * @requiredField reviewRequestId
   * @permissionId REVIEWS.REVIEW_REQUEST_READ
   * @adminMethod
   * @returns The retrieved ReviewRequest
   */
  function getReviewRequest(reviewRequestId: string): Promise<ReviewRequest>;
  /**
   * Delete a Review Request
   * @param reviewRequestId - Id of the ReviewRequest to delete
   * @internal
   * @documentationMaturity preview
   * @requiredField reviewRequestId
   * @permissionId REVIEWS.REVIEW_REQUEST_DELETE
   * @adminMethod
   */
  function deleteReviewRequest(reviewRequestId: string): Promise<void>;
  /**
   * Query Review Requests using [WQL - Wix Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language)
   * @public
   * @documentationMaturity preview
   * @permissionId REVIEWS.REVIEW_REQUEST_READ
   * @adminMethod
   */
  function queryReviewRequests(): ReviewRequestsQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ReviewRequestsQueryResult extends QueryCursorResult {
      items: ReviewRequest[];
      query: ReviewRequestsQueryBuilder;
      next: () => Promise<ReviewRequestsQueryResult>;
      prev: () => Promise<ReviewRequestsQueryResult>;
  }
  interface ReviewRequestsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'failedOptions' | 'failedOptions.reason' | 'failedOptions.message' | 'sentOptions' | 'sentOptions.opened' | '_id' | 'revision' | '_createdDate' | '_updatedDate' | 'sendDate' | 'namespace' | 'eventId' | 'eventLabel' | 'entitiesToReview.id' | 'entitiesToReview.reviewData' | 'entitiesToReview.reviewData.reviewId' | 'entitiesToReview.reviewData.reviewSource' | 'recipient' | 'recipient.contactId' | 'activationId' | 'communicationChannel' | 'status' | 'opened' | 'extendedFields', value: any) => ReviewRequestsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: 'failedOptions' | 'failedOptions.reason' | 'failedOptions.message' | 'sentOptions' | 'sentOptions.opened' | '_id' | 'revision' | '_createdDate' | '_updatedDate' | 'sendDate' | 'namespace' | 'eventId' | 'eventLabel' | 'entitiesToReview.id' | 'entitiesToReview.reviewData' | 'entitiesToReview.reviewData.reviewId' | 'entitiesToReview.reviewData.reviewSource' | 'recipient' | 'recipient.contactId' | 'activationId' | 'communicationChannel' | 'status' | 'opened' | 'extendedFields', value: any) => ReviewRequestsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: 'revision' | '_createdDate' | '_updatedDate' | 'sendDate', value: any) => ReviewRequestsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: 'revision' | '_createdDate' | '_updatedDate' | 'sendDate', value: any) => ReviewRequestsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: 'revision' | '_createdDate' | '_updatedDate' | 'sendDate', value: any) => ReviewRequestsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: 'revision' | '_createdDate' | '_updatedDate' | 'sendDate', value: any) => ReviewRequestsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: 'failedOptions.message' | '_id' | 'namespace' | 'eventId' | 'eventLabel' | 'entitiesToReview.id' | 'entitiesToReview.reviewData.reviewId' | 'recipient.contactId' | 'activationId', value: string) => ReviewRequestsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: 'failedOptions' | 'failedOptions.reason' | 'failedOptions.message' | 'sentOptions' | 'sentOptions.opened' | '_id' | 'revision' | '_createdDate' | '_updatedDate' | 'sendDate' | 'namespace' | 'eventId' | 'eventLabel' | 'entitiesToReview.id' | 'entitiesToReview.reviewData' | 'entitiesToReview.reviewData.reviewId' | 'entitiesToReview.reviewData.reviewSource' | 'recipient' | 'recipient.contactId' | 'activationId' | 'communicationChannel' | 'status' | 'opened' | 'extendedFields', value: any[]) => ReviewRequestsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'failedOptions' | 'failedOptions.reason' | 'failedOptions.message' | 'sentOptions' | 'sentOptions.opened' | '_id' | 'revision' | '_createdDate' | '_updatedDate' | 'sendDate' | 'namespace' | 'eventId' | 'eventLabel' | 'entitiesToReview.id' | 'entitiesToReview.reviewData' | 'entitiesToReview.reviewData.reviewId' | 'entitiesToReview.reviewData.reviewSource' | 'recipient' | 'recipient.contactId' | 'activationId' | 'communicationChannel' | 'status' | 'opened' | 'extendedFields', value: any) => ReviewRequestsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'failedOptions' | 'failedOptions.reason' | 'failedOptions.message' | 'sentOptions' | 'sentOptions.opened' | '_id' | 'revision' | '_createdDate' | '_updatedDate' | 'sendDate' | 'namespace' | 'eventId' | 'eventLabel' | 'entitiesToReview.id' | 'entitiesToReview.reviewData' | 'entitiesToReview.reviewData.reviewId' | 'entitiesToReview.reviewData.reviewSource' | 'recipient' | 'recipient.contactId' | 'activationId' | 'communicationChannel' | 'status' | 'opened' | 'extendedFields', value: boolean) => ReviewRequestsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'failedOptions' | 'failedOptions.reason' | 'failedOptions.message' | 'sentOptions' | 'sentOptions.opened' | '_id' | 'revision' | '_createdDate' | '_updatedDate' | 'sendDate' | 'namespace' | 'eventId' | 'eventLabel' | 'entitiesToReview' | 'entitiesToReview.id' | 'entitiesToReview.reviewData' | 'entitiesToReview.reviewData.reviewId' | 'entitiesToReview.reviewData.reviewSource' | 'recipient' | 'recipient.contactId' | 'activationId' | 'communicationChannel' | 'status' | 'opened' | 'extendedFields' | 'extendedFields.namespaces'>) => ReviewRequestsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'failedOptions' | 'failedOptions.reason' | 'failedOptions.message' | 'sentOptions' | 'sentOptions.opened' | '_id' | 'revision' | '_createdDate' | '_updatedDate' | 'sendDate' | 'namespace' | 'eventId' | 'eventLabel' | 'entitiesToReview' | 'entitiesToReview.id' | 'entitiesToReview.reviewData' | 'entitiesToReview.reviewData.reviewId' | 'entitiesToReview.reviewData.reviewSource' | 'recipient' | 'recipient.contactId' | 'activationId' | 'communicationChannel' | 'status' | 'opened' | 'extendedFields' | 'extendedFields.namespaces'>) => ReviewRequestsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ReviewRequestsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ReviewRequestsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ReviewRequestsQueryResult>;
  }
  /** @public
   * @documentationMaturity preview
   * @permissionId REVIEWS.REVIEW_REQUEST_READ
   * @adminMethod
   */
  function countReviewRequests(options?: CountReviewRequestsOptions): Promise<CountReviewRequestsResponse>;
  interface CountReviewRequestsOptions {
      filter?: Record<string, any> | null;
  }
  /**
   * Bulk Cancel Review Request
   * @public
   * @documentationMaturity preview
   * @permissionId REVIEWS.REVIEW_REQUEST_CANCEL
   * @adminMethod
   */
  function bulkCancelReviewRequest(options?: BulkCancelReviewRequestOptions): Promise<BulkCancelReviewRequestResponse>;
  interface BulkCancelReviewRequestOptions {
      filter?: Record<string, any> | null;
  }
  
  export { ActionEvent, ActivationStatus, BulkCancelReviewRequestOptions, BulkCancelReviewRequestRequest, BulkCancelReviewRequestResponse, CommunicationChannel, CountReviewRequestsOptions, CountReviewRequestsRequest, CountReviewRequestsResponse, CreateReviewRequestRequest, CreateReviewRequestResponse, CursorPaging, CursorPagingMetadata, CursorQuery, CursorQueryPagingMethodOneOf, Cursors, DeleteReviewRequestRequest, DeleteReviewRequestResponse, DomainEvent, DomainEventBodyOneOf, Empty, Entity, EntityCreatedEvent, EntityDeletedEvent, EntityUpdatedEvent, ExtendedFields, FailedOptions, FailureReason, GetReviewRequestRequest, GetReviewRequestResponse, IdentificationData, IdentificationDataIdOneOf, MessageEnvelope, QueryReviewRequestsRequest, QueryReviewRequestsResponse, Recipient, RestoreInfo, ReviewData, ReviewRequest, ReviewRequestStatus, ReviewRequestStatusOptionsOneOf, ReviewRequestsQueryBuilder, ReviewRequestsQueryResult, ReviewSource, SentOptions, SortOrder, Sorting, Status, WebhookIdentityType, bulkCancelReviewRequest, countReviewRequests, createReviewRequest, deleteReviewRequest, getReviewRequest, queryReviewRequests };
}
