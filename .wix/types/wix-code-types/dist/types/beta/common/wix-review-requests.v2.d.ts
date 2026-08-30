declare module "wix-review-requests.v2" {
  /** ReviewRequest is the main entity of ReviewRequests */
  interface ReviewRequest extends ReviewRequestStatusOptionsOneOf {
      /** Options for sent status */
      sentOptions?: SentOptions;
      /** Options for failed status */
      failedOptions?: FailedOptions;
      /**
       * Review request ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Represents the current state of an item. Each time the item is modified, its `revision` changes by the server. for an update operation to succeed, you MUST pass the latest revision.
       * @readonly
       */
      revision?: string | null;
      /**
       * Represents the time this review request was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Represents the time this review request was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Represents the time this review request to be sent. */
      sendDate?: Date | null;
      /** Namespace of app integrated with reviews. */
      namespace?: string;
      /** Details the order for which the review request is made. */
      order?: Order;
      /** List of items relevant to the review request. */
      items?: Item[];
      /** Recipient of review request. */
      recipient?: Recipient;
      /** Indicates notification channel of review request */
      communicationChannel?: CommunicationChannel;
      /**
       * Indicates status of review request.
       * @readonly
       */
      status?: ReviewRequestStatus;
      /**
       * The ID of the automation activation.
       * It is used to track and update the status of the review request.
       */
      automationActivationId?: string | null;
      /**
       * Requester of the review request
       * @readonly
       */
      requestedBy?: IdentificationData;
      /**
       * Wix data extensions
       * @internal
       */
      extendedFields?: ExtendedFields;
  }
  /** @oneof */
  interface ReviewRequestStatusOptionsOneOf {
      /** Options for sent status */
      sentOptions?: SentOptions;
      /** Options for failed status */
      failedOptions?: FailedOptions;
  }
  interface Order {
      /** Order ID. */
      _id?: string;
      /**
       * Order number.
       * @readonly
       */
      number?: string | null;
  }
  /** Item to review */
  interface Item {
      /**
       * ID of the item within its catalog, corresponding to:
       * + `product.id` for [Stores](https://dev.wix.com/docs/rest/business-solutions/stores/about-wix-stores).
       */
      catalogItemId?: string;
      /** ID of the review created for this item by the review request recipient. */
      reviewId?: string | null;
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
  interface SentOptions {
      /** Indicates if the review request was opened by the recipient. */
      opened?: boolean;
  }
  interface FailedOptions {
      /** Reason for review request failure. */
      reason?: FailureReason;
      /** Error message for review request failure. */
      message?: string | null;
  }
  enum FailureReason {
      /** Unknown reason for review request failure. */
      UNKNOWN_FAILURE_REASON = "UNKNOWN_FAILURE_REASON",
      /** Review request failed due to failure in activation flow. */
      ACTIVATION_FAILED = "ACTIVATION_FAILED",
      /** Email bounced when sent to a recipient. */
      BOUNCED = "BOUNCED",
      /** Review request failed due to inactive subscription. */
      SUBSCRIPTION_INACTIVE = "SUBSCRIPTION_INACTIVE"
  }
  interface IdentificationData extends IdentificationDataIdOneOf {
      /**
       * ID of a site visitor that has not logged in to the site.
       * @internal
       */
      anonymousVisitorId?: string;
      /**
       * ID of a site visitor that has logged in to the site.
       * @internal
       */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app.s */
      appId?: string;
      /**
       * Identity type
       * @readonly
       */
      identityType?: IdentityType;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf {
      /**
       * ID of a site visitor that has not logged in to the site.
       * @internal
       */
      anonymousVisitorId?: string;
      /**
       * ID of a site visitor that has logged in to the site.
       * @internal
       */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app.s */
      appId?: string;
  }
  enum IdentityType {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
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
  /** This is the preferred message for cursor-paging enabled services */
  interface CursorPagingMetadata {
      /** Number of items returned in the response. */
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
  }
  interface Cursors {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface CountReviewRequestsByFilterRequest {
      /**
       * Filter object in the following format:
       * `"filter" : {
       * "fieldName1": "value1",
       * "fieldName2":{"$operator":"value2"}
       * }`
       * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
       */
      filter?: Record<string, any> | null;
  }
  interface CountReviewRequestsByFilterResponse {
      /** Number of review requests that meet the specified criteria. */
      count?: number;
  }
  interface BulkCancelReviewRequestsByFilterRequest {
      /**
       * Filter object in the following format:
       * `"filter" : {
       * "fieldName1": "value1",
       * "fieldName2":{"$operator":"value2"}
       * }`
       * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
       */
      filter?: Record<string, any> | null;
  }
  interface BulkCancelReviewRequestsByFilterResponse {
      /** Bulk job ID. The job's status can be retrieved with Get Bulk Job or List Bulk Jobs. */
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
  interface MessageEnvelope {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: WebhooksIdentificationData;
      /** Stringify payload. */
      data?: string;
  }
  interface WebhooksIdentificationData extends WebhooksIdentificationDataIdOneOf {
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
  interface WebhooksIdentificationDataIdOneOf {
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
   * Creates a new review request.
   *
   * This method allows to create requests for customer reviews.
   *
   * Each request must include:
   * - The recipient's contact ID.
   * - The preferred communication channel.
   * - Either the Order ID or item IDs being reviewed.
   *
   * Review requests depend on the [Wix eCommerce platform's](https://dev.wix.com/docs/rest/business-solutions/e-commerce/introduction#about-the-wix-ecommerce-api)
   * Order and Catalog. The corresponding order or catalog item must exist within Wix eCommerce before a review request can be created.
   *
   * When providing an Order ID, you can optionally specify individual items from that order to be included in the review request.
   * If no items are specified, the 5 most expensive items from the order will be automatically populated in the request.
   * Alternatively, you can choose to provide only item IDs from the catalog for review.
   *
   * The Review Requests functionality is exclusively available within the `stores` reviews namespace.
   * @param reviewRequest - ReviewRequest to be created
   * @public
   * @documentationMaturity preview
   * @requiredField reviewRequest
   * @requiredField reviewRequest.communicationChannel
   * @requiredField reviewRequest.recipient.contactId
   * @permissionId REVIEWS.REVIEW_REQUEST_CREATE
   * @adminMethod
   * @returns The created ReviewRequest
   */
  function createReviewRequest(reviewRequest: ReviewRequest): Promise<ReviewRequest>;
  /**
   * Retrieves a specific review request by its ID.
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
   * Deletes an existing review request.
   *
   * This method allows you to remove a specific review request from the system using its unique ID.
   * This operation is only permitted for review requests that are in the `CANCELED` state.
   * @param reviewRequestId - Id of the ReviewRequest to delete
   * @public
   * @documentationMaturity preview
   * @requiredField reviewRequestId
   * @permissionId REVIEWS.REVIEW_REQUEST_DELETE
   * @adminMethod
   */
  function deleteReviewRequest(reviewRequestId: string): Promise<void>;
  /**
   * Queries Review Requests that meet specified criteria.
   *
   * This method enables the search through review requests based on specific criteria, leveraging the [Wix Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language).
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
      eq: (propertyName: '_id' | '_createdDate' | 'sendDate' | 'namespace' | 'order.id' | 'items.catalogItemId' | 'items.reviewId' | 'recipient.contactId' | 'communicationChannel' | 'status' | 'automationActivationId' | 'requestedBy.wixUserId' | 'requestedBy.appId' | 'requestedBy.identityType', value: any) => ReviewRequestsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | 'sendDate' | 'namespace' | 'order.id' | 'items.catalogItemId' | 'items.reviewId' | 'recipient.contactId' | 'communicationChannel' | 'status' | 'automationActivationId' | 'requestedBy.wixUserId' | 'requestedBy.appId' | 'requestedBy.identityType', value: any) => ReviewRequestsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | 'sendDate', value: any) => ReviewRequestsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | 'sendDate', value: any) => ReviewRequestsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | 'sendDate', value: any) => ReviewRequestsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | 'sendDate', value: any) => ReviewRequestsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | '_createdDate' | 'sendDate' | 'namespace' | 'order.id' | 'items.catalogItemId' | 'items.reviewId' | 'recipient.contactId' | 'communicationChannel' | 'status' | 'automationActivationId' | 'requestedBy.wixUserId' | 'requestedBy.appId' | 'requestedBy.identityType', value: any) => ReviewRequestsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'order.id' | 'items.reviewId' | 'automationActivationId', value: boolean) => ReviewRequestsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_createdDate' | 'sendDate' | 'status'>) => ReviewRequestsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_createdDate' | 'sendDate' | 'status'>) => ReviewRequestsQueryBuilder;
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
  /**
   * Counts Review Requests that meet specified criteria.
   *
   * This method enables the count review requests based on specific criteria, leveraging the [Wix Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language) filter.
   * @public
   * @documentationMaturity preview
   * @permissionId REVIEWS.REVIEW_REQUEST_READ
   * @adminMethod
   */
  function countReviewRequestsByFilter(options?: CountReviewRequestsByFilterOptions): Promise<CountReviewRequestsByFilterResponse>;
  interface CountReviewRequestsByFilterOptions {
      /**
       * Filter object in the following format:
       * `"filter" : {
       * "fieldName1": "value1",
       * "fieldName2":{"$operator":"value2"}
       * }`
       * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
       */
      filter?: Record<string, any> | null;
  }
  /**
   * Cancels multiple review requests that meet specified criteria.
   *
   * All scheduled review requests with automation activation id that meet the specified `filter` criteria are canceled.
   * To perform a dry run, use the intended filter options with
   * [Query Review Requests](https://dev.wix.com/docs/rest/crm/community/reviews/review-request/query-review-requests).
   *
   * When this endpoint is used, a bulk job is started and the job ID is returned.
   * The job might not complete right away, depending on its size.
   * The job's status can be retrieved with
   * [Get Async Job](https://dev.wix.com/docs/rest/business-management/async-job/get-async-job) or
   * [List Async Job Items](https://dev.wix.com/docs/rest/business-management/async-job/list-async-job-items).
   * @public
   * @documentationMaturity preview
   * @permissionId REVIEWS.REVIEW_REQUEST_CANCEL
   * @adminMethod
   */
  function bulkCancelReviewRequestsByFilter(options?: BulkCancelReviewRequestsByFilterOptions): Promise<BulkCancelReviewRequestsByFilterResponse>;
  interface BulkCancelReviewRequestsByFilterOptions {
      /**
       * Filter object in the following format:
       * `"filter" : {
       * "fieldName1": "value1",
       * "fieldName2":{"$operator":"value2"}
       * }`
       * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
       */
      filter?: Record<string, any> | null;
  }
  
  type reviewsV2ReviewRequest_universal_d_ReviewRequest = ReviewRequest;
  type reviewsV2ReviewRequest_universal_d_ReviewRequestStatusOptionsOneOf = ReviewRequestStatusOptionsOneOf;
  type reviewsV2ReviewRequest_universal_d_Order = Order;
  type reviewsV2ReviewRequest_universal_d_Item = Item;
  type reviewsV2ReviewRequest_universal_d_Recipient = Recipient;
  type reviewsV2ReviewRequest_universal_d_CommunicationChannel = CommunicationChannel;
  const reviewsV2ReviewRequest_universal_d_CommunicationChannel: typeof CommunicationChannel;
  type reviewsV2ReviewRequest_universal_d_ReviewRequestStatus = ReviewRequestStatus;
  const reviewsV2ReviewRequest_universal_d_ReviewRequestStatus: typeof ReviewRequestStatus;
  type reviewsV2ReviewRequest_universal_d_SentOptions = SentOptions;
  type reviewsV2ReviewRequest_universal_d_FailedOptions = FailedOptions;
  type reviewsV2ReviewRequest_universal_d_FailureReason = FailureReason;
  const reviewsV2ReviewRequest_universal_d_FailureReason: typeof FailureReason;
  type reviewsV2ReviewRequest_universal_d_IdentificationData = IdentificationData;
  type reviewsV2ReviewRequest_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type reviewsV2ReviewRequest_universal_d_IdentityType = IdentityType;
  const reviewsV2ReviewRequest_universal_d_IdentityType: typeof IdentityType;
  type reviewsV2ReviewRequest_universal_d_ExtendedFields = ExtendedFields;
  type reviewsV2ReviewRequest_universal_d_CreateReviewRequestRequest = CreateReviewRequestRequest;
  type reviewsV2ReviewRequest_universal_d_CreateReviewRequestResponse = CreateReviewRequestResponse;
  type reviewsV2ReviewRequest_universal_d_GetReviewRequestRequest = GetReviewRequestRequest;
  type reviewsV2ReviewRequest_universal_d_GetReviewRequestResponse = GetReviewRequestResponse;
  type reviewsV2ReviewRequest_universal_d_DeleteReviewRequestRequest = DeleteReviewRequestRequest;
  type reviewsV2ReviewRequest_universal_d_DeleteReviewRequestResponse = DeleteReviewRequestResponse;
  type reviewsV2ReviewRequest_universal_d_QueryReviewRequestsRequest = QueryReviewRequestsRequest;
  type reviewsV2ReviewRequest_universal_d_CursorQuery = CursorQuery;
  type reviewsV2ReviewRequest_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type reviewsV2ReviewRequest_universal_d_Sorting = Sorting;
  type reviewsV2ReviewRequest_universal_d_SortOrder = SortOrder;
  const reviewsV2ReviewRequest_universal_d_SortOrder: typeof SortOrder;
  type reviewsV2ReviewRequest_universal_d_CursorPaging = CursorPaging;
  type reviewsV2ReviewRequest_universal_d_QueryReviewRequestsResponse = QueryReviewRequestsResponse;
  type reviewsV2ReviewRequest_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type reviewsV2ReviewRequest_universal_d_Cursors = Cursors;
  type reviewsV2ReviewRequest_universal_d_CountReviewRequestsByFilterRequest = CountReviewRequestsByFilterRequest;
  type reviewsV2ReviewRequest_universal_d_CountReviewRequestsByFilterResponse = CountReviewRequestsByFilterResponse;
  type reviewsV2ReviewRequest_universal_d_BulkCancelReviewRequestsByFilterRequest = BulkCancelReviewRequestsByFilterRequest;
  type reviewsV2ReviewRequest_universal_d_BulkCancelReviewRequestsByFilterResponse = BulkCancelReviewRequestsByFilterResponse;
  type reviewsV2ReviewRequest_universal_d_DomainEvent = DomainEvent;
  type reviewsV2ReviewRequest_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type reviewsV2ReviewRequest_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type reviewsV2ReviewRequest_universal_d_RestoreInfo = RestoreInfo;
  type reviewsV2ReviewRequest_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type reviewsV2ReviewRequest_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type reviewsV2ReviewRequest_universal_d_ActionEvent = ActionEvent;
  type reviewsV2ReviewRequest_universal_d_MessageEnvelope = MessageEnvelope;
  type reviewsV2ReviewRequest_universal_d_WebhooksIdentificationData = WebhooksIdentificationData;
  type reviewsV2ReviewRequest_universal_d_WebhooksIdentificationDataIdOneOf = WebhooksIdentificationDataIdOneOf;
  type reviewsV2ReviewRequest_universal_d_WebhookIdentityType = WebhookIdentityType;
  const reviewsV2ReviewRequest_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const reviewsV2ReviewRequest_universal_d_createReviewRequest: typeof createReviewRequest;
  const reviewsV2ReviewRequest_universal_d_getReviewRequest: typeof getReviewRequest;
  const reviewsV2ReviewRequest_universal_d_deleteReviewRequest: typeof deleteReviewRequest;
  const reviewsV2ReviewRequest_universal_d_queryReviewRequests: typeof queryReviewRequests;
  type reviewsV2ReviewRequest_universal_d_ReviewRequestsQueryResult = ReviewRequestsQueryResult;
  type reviewsV2ReviewRequest_universal_d_ReviewRequestsQueryBuilder = ReviewRequestsQueryBuilder;
  const reviewsV2ReviewRequest_universal_d_countReviewRequestsByFilter: typeof countReviewRequestsByFilter;
  type reviewsV2ReviewRequest_universal_d_CountReviewRequestsByFilterOptions = CountReviewRequestsByFilterOptions;
  const reviewsV2ReviewRequest_universal_d_bulkCancelReviewRequestsByFilter: typeof bulkCancelReviewRequestsByFilter;
  type reviewsV2ReviewRequest_universal_d_BulkCancelReviewRequestsByFilterOptions = BulkCancelReviewRequestsByFilterOptions;
  namespace reviewsV2ReviewRequest_universal_d {
    export {
      reviewsV2ReviewRequest_universal_d_ReviewRequest as ReviewRequest,
      reviewsV2ReviewRequest_universal_d_ReviewRequestStatusOptionsOneOf as ReviewRequestStatusOptionsOneOf,
      reviewsV2ReviewRequest_universal_d_Order as Order,
      reviewsV2ReviewRequest_universal_d_Item as Item,
      reviewsV2ReviewRequest_universal_d_Recipient as Recipient,
      reviewsV2ReviewRequest_universal_d_CommunicationChannel as CommunicationChannel,
      reviewsV2ReviewRequest_universal_d_ReviewRequestStatus as ReviewRequestStatus,
      reviewsV2ReviewRequest_universal_d_SentOptions as SentOptions,
      reviewsV2ReviewRequest_universal_d_FailedOptions as FailedOptions,
      reviewsV2ReviewRequest_universal_d_FailureReason as FailureReason,
      reviewsV2ReviewRequest_universal_d_IdentificationData as IdentificationData,
      reviewsV2ReviewRequest_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      reviewsV2ReviewRequest_universal_d_IdentityType as IdentityType,
      reviewsV2ReviewRequest_universal_d_ExtendedFields as ExtendedFields,
      reviewsV2ReviewRequest_universal_d_CreateReviewRequestRequest as CreateReviewRequestRequest,
      reviewsV2ReviewRequest_universal_d_CreateReviewRequestResponse as CreateReviewRequestResponse,
      reviewsV2ReviewRequest_universal_d_GetReviewRequestRequest as GetReviewRequestRequest,
      reviewsV2ReviewRequest_universal_d_GetReviewRequestResponse as GetReviewRequestResponse,
      reviewsV2ReviewRequest_universal_d_DeleteReviewRequestRequest as DeleteReviewRequestRequest,
      reviewsV2ReviewRequest_universal_d_DeleteReviewRequestResponse as DeleteReviewRequestResponse,
      reviewsV2ReviewRequest_universal_d_QueryReviewRequestsRequest as QueryReviewRequestsRequest,
      reviewsV2ReviewRequest_universal_d_CursorQuery as CursorQuery,
      reviewsV2ReviewRequest_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      reviewsV2ReviewRequest_universal_d_Sorting as Sorting,
      reviewsV2ReviewRequest_universal_d_SortOrder as SortOrder,
      reviewsV2ReviewRequest_universal_d_CursorPaging as CursorPaging,
      reviewsV2ReviewRequest_universal_d_QueryReviewRequestsResponse as QueryReviewRequestsResponse,
      reviewsV2ReviewRequest_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      reviewsV2ReviewRequest_universal_d_Cursors as Cursors,
      reviewsV2ReviewRequest_universal_d_CountReviewRequestsByFilterRequest as CountReviewRequestsByFilterRequest,
      reviewsV2ReviewRequest_universal_d_CountReviewRequestsByFilterResponse as CountReviewRequestsByFilterResponse,
      reviewsV2ReviewRequest_universal_d_BulkCancelReviewRequestsByFilterRequest as BulkCancelReviewRequestsByFilterRequest,
      reviewsV2ReviewRequest_universal_d_BulkCancelReviewRequestsByFilterResponse as BulkCancelReviewRequestsByFilterResponse,
      reviewsV2ReviewRequest_universal_d_DomainEvent as DomainEvent,
      reviewsV2ReviewRequest_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      reviewsV2ReviewRequest_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      reviewsV2ReviewRequest_universal_d_RestoreInfo as RestoreInfo,
      reviewsV2ReviewRequest_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      reviewsV2ReviewRequest_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      reviewsV2ReviewRequest_universal_d_ActionEvent as ActionEvent,
      reviewsV2ReviewRequest_universal_d_MessageEnvelope as MessageEnvelope,
      reviewsV2ReviewRequest_universal_d_WebhooksIdentificationData as WebhooksIdentificationData,
      reviewsV2ReviewRequest_universal_d_WebhooksIdentificationDataIdOneOf as WebhooksIdentificationDataIdOneOf,
      reviewsV2ReviewRequest_universal_d_WebhookIdentityType as WebhookIdentityType,
      reviewsV2ReviewRequest_universal_d_createReviewRequest as createReviewRequest,
      reviewsV2ReviewRequest_universal_d_getReviewRequest as getReviewRequest,
      reviewsV2ReviewRequest_universal_d_deleteReviewRequest as deleteReviewRequest,
      reviewsV2ReviewRequest_universal_d_queryReviewRequests as queryReviewRequests,
      reviewsV2ReviewRequest_universal_d_ReviewRequestsQueryResult as ReviewRequestsQueryResult,
      reviewsV2ReviewRequest_universal_d_ReviewRequestsQueryBuilder as ReviewRequestsQueryBuilder,
      reviewsV2ReviewRequest_universal_d_countReviewRequestsByFilter as countReviewRequestsByFilter,
      reviewsV2ReviewRequest_universal_d_CountReviewRequestsByFilterOptions as CountReviewRequestsByFilterOptions,
      reviewsV2ReviewRequest_universal_d_bulkCancelReviewRequestsByFilter as bulkCancelReviewRequestsByFilter,
      reviewsV2ReviewRequest_universal_d_BulkCancelReviewRequestsByFilterOptions as BulkCancelReviewRequestsByFilterOptions,
    };
  }
  
  export { reviewsV2ReviewRequest_universal_d as reviews };
}
