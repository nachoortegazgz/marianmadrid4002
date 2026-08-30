declare module "wix-assistant-playground.v2" {
  interface Message {
      /** Message ID. */
      _id?: string;
      /** Conversation ID. */
      conversationId?: string;
      /** Message sender */
      sender?: Sender;
      /** Message feedback */
      feedback?: Feedback;
      /** Assistant trigger id */
      triggerId?: string | null;
      /**
       * Date and time the Message was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the Message was created.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Message revision number.
       * @readonly
       */
      revision?: string | null;
      /** Message body */
      body?: Body;
      /** Answer to message ID. */
      answerTo?: string | null;
      /** Data Extensions */
      extendedFields?: ExtendedFields;
      /** Tags */
      tags?: Tags;
  }
  enum Sender {
      UNKNOWN_SENDER = "UNKNOWN_SENDER",
      USER = "USER",
      ASSISTANT = "ASSISTANT"
  }
  interface Feedback {
      /** Feedback text. */
      text?: string | null;
      /**
       * Embedded document
       * @readonly
       */
      document?: Document;
      /**
       * error while embedding document
       * @readonly
       */
      error?: string | null;
      /** Feedback type */
      type?: FeedbackType;
  }
  interface Document {
      /** ID of the external document. */
      _id?: string;
      /** Title of the external document. */
      title?: string;
      /** Description of the external document. */
      description?: string;
      /** Tags of the external document. */
      tags?: string[];
      /** URL of the external document. */
      url?: string;
      /** Category of the external document. */
      category?: Category;
      /** Action to be taken when the external document is presented to the user. */
      action?: Action;
      /** Is the external document generated from a feedback. */
      isFeedback?: boolean | null;
      /** Is the external document published. */
      isPublished?: boolean | null;
      /** Timestamp of the last update of the external document. */
      updateTs?: Date | null;
      /** Relevance of the external document. */
      relevance?: number | null;
      /** Usage of the external document. */
      usage?: number | null;
  }
  /** Category of the external document. */
  enum Category {
      /** [(wix.api.enum_maturity) = NOT_IMPLEMENTED]; */
      NO_CATEGORY = "NO_CATEGORY",
      ENRICHMENT = "ENRICHMENT",
      /** FEEDBACK = 2; */
      RESTRICTION = "RESTRICTION"
  }
  /** Action to be taken when the external document is presented to the user. */
  enum Action {
      /** [(wix.api.enum_maturity) = NOT_IMPLEMENTED]; */
      NO_ACTION = "NO_ACTION",
      NO_ANSWER = "NO_ANSWER",
      CONTACT = "CONTACT"
  }
  enum FeedbackType {
      UNKNOWN = "UNKNOWN",
      THUMBS_UP = "THUMBS_UP",
      IRRELEVANT = "IRRELEVANT",
      INCORRECT = "INCORRECT",
      SHOULD_NOT_ANSWER = "SHOULD_NOT_ANSWER",
      OK_BUT = "OK_BUT",
      OTHER = "OTHER"
  }
  interface Body {
      /** Main text of the message */
      mainText?: string | null;
      /** Footer text of the message */
      footerText?: string | null;
      /** Additional data */
      additionalData?: Record<string, any>[] | null;
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
  /**
   * Common object for tags.
   * Should be use as in this example:
   * message Foo {
   * string id = 1;
   * ...
   * Tags tags = 5
   * }
   *
   * example of taggable entity
   * {
   * id: "123"
   * tags: {
   * tags: {
   * tag_ids:["11","22"]
   * },
   * private_tags: {
   * tag_ids: ["33", "44"]
   * }
   * }
   * }
   */
  interface Tags {
      /** Tags that require an additional permission in order to access them, normally not given to site members or visitors. */
      privateTags?: TagList;
      /** Tags that are exposed to anyone who has access to the labeled entity itself, including site members and visitors. */
      tags?: TagList;
  }
  interface TagList {
      /** List of tag IDs */
      tagIds?: string[];
  }
  interface QueryMessagesRequest {
      /** WQL expression. */
      query?: CursorQuery;
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
  interface QueryMessagesResponse {
      /**
       * Messages type.
       *
       */
      messages?: Message[];
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
  interface AskQuestionRequest {
      /** Question message. */
      question: Message;
  }
  interface AskQuestionResponse {
      /** Answer message. */
      answer?: Message;
  }
  interface AddFeedbackRequest {
      /** Message id to add feedback to. */
      messageId: string;
      /** Feedback to add to the message. */
      feedback: Feedback;
      /** Conversation revision. */
      revision: string;
  }
  interface AddFeedbackResponse {
      /** Updated message. */
      message?: Message;
  }
  interface BulkUpdateMessageTagsRequest {
      /** List of NileProtoTagsEntities that their tags will update. */
      ids: string[] | null;
      /** List of Tags to assign */
      assignTags: Tags;
      /** List of Tags to unAssign */
      unassignTags?: Tags;
  }
  interface BulkUpdateMessageTagsResponse {
      /** Results */
      results?: BulkUpdateMessageTagsResult[];
      /** Metadata regarding the bulk update operation */
      bulkActionMetadata?: BulkActionMetadata;
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
  interface BulkUpdateMessageTagsResult {
      /** Metadata regarding the specific single update operation */
      itemMetadata?: ItemMetadata;
  }
  interface BulkActionMetadata {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface BulkUpdateMessageTagsByFilterRequest {
      /** Filter */
      filter: Record<string, any> | null;
      /** List of Tags to assign */
      assignTags: Tags;
      /** List of Tags to unAssign */
      unassignTags?: Tags;
  }
  interface BulkUpdateMessageTagsByFilterResponse {
      /** Job ID */
      jobId?: string;
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
      /** Updated Product. */
      message?: Message;
  }
  interface Empty {
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
   * Retrieves a list of Messages, given the provided [paging, filtering, and sorting][1].
   *
   * Up to 1,000 Messages can be returned per request.
   *
   * To learn how to query Messages, see [API Query Language][2].
   *
   * [1]: https://dev.wix.com/api/rest/getting-started/sorting-and-paging
   * [2]: https://dev.wix.com/api/rest/getting-started/api-query-language
   * @public
   * @documentationMaturity preview
   * @permissionId INNOVATION_LAB.WIX_ASSISTANT
   * @adminMethod
   */
  function queryMessages(): MessagesQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface MessagesQueryResult extends QueryCursorResult {
      items: Message[];
      query: MessagesQueryBuilder;
      next: () => Promise<MessagesQueryResult>;
      prev: () => Promise<MessagesQueryResult>;
  }
  interface MessagesQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate', value: any) => MessagesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate', value: any) => MessagesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate', value: any) => MessagesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate', value: any) => MessagesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate', value: any) => MessagesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate', value: any) => MessagesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id', value: string) => MessagesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | '_createdDate', value: any[]) => MessagesQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | '_createdDate', value: any) => MessagesQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | '_createdDate', value: boolean) => MessagesQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | '_createdDate'>) => MessagesQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | '_createdDate'>) => MessagesQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => MessagesQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => MessagesQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<MessagesQueryResult>;
  }
  /**
   * Ask question to ai assistant.
   *
   * This ensures you're working with the latest Conversation
   * and prevents unintended overwrites.
   * @param question - Question message.
   * @public
   * @documentationMaturity preview
   * @requiredField question
   * @permissionId INNOVATION_LAB.WIX_ASSISTANT
   * @adminMethod
   */
  function askQuestion(question: Message): Promise<AskQuestionResponse>;
  /**
   * Adds feedback to a message.
   *
   * Each time the Conversation is updated,
   * `revision` increments by 1.
   * The current `revision` must be passed when updating the Conversation.
   * This ensures you're working with the latest Conversation
   * and prevents unintended overwrites.
   * @param messageId - Message id to add feedback to.
   * @public
   * @documentationMaturity preview
   * @requiredField messageId
   * @requiredField options
   * @requiredField options.feedback
   * @requiredField options.revision
   * @permissionId INNOVATION_LAB.WIX_ASSISTANT
   * @adminMethod
   */
  function addFeedback(messageId: string, options: AddFeedbackOptions): Promise<AddFeedbackResponse>;
  interface AddFeedbackOptions {
      /** Feedback to add to the message. */
      feedback: Feedback;
      /** Conversation revision. */
      revision: string;
  }
  /**
   * Synchronously update tags on multiple products, by list of product ids
   * A tag that appears both in the list of assign and unassign tags, will be assigned
   * @param ids - List of NileProtoTagsEntities that their tags will update.
   * @public
   * @documentationMaturity preview
   * @requiredField ids
   * @requiredField options.assignTags
   * @permissionId INNOVATION_LAB.WIX_ASSISTANT
   * @adminMethod
   */
  function bulkUpdateMessageTags(ids: string[] | null, options?: BulkUpdateMessageTagsOptions): Promise<BulkUpdateMessageTagsResponse>;
  interface BulkUpdateMessageTagsOptions {
      /** List of Tags to assign */
      assignTags: Tags;
      /** List of Tags to unAssign */
      unassignTags?: Tags;
  }
  /**
   * Asynchronously update tags on multiple products, by provided filter
   * An empty filter will update all products
   * A tag that appears both in the list of assign and unassign tags, will be assigned
   * @param filter - Filter
   * @public
   * @documentationMaturity preview
   * @requiredField filter
   * @requiredField options.assignTags
   * @permissionId INNOVATION_LAB.WIX_ASSISTANT
   * @adminMethod
   */
  function bulkUpdateMessageTagsByFilter(filter: Record<string, any> | null, options?: BulkUpdateMessageTagsByFilterOptions): Promise<BulkUpdateMessageTagsByFilterResponse>;
  interface BulkUpdateMessageTagsByFilterOptions {
      /** List of Tags to assign */
      assignTags: Tags;
      /** List of Tags to unAssign */
      unassignTags?: Tags;
  }
  /**
   * Updates extended fields of a Test without incrementing revision
   * @param _id - ID of the entity to update.
   * @param namespace - Identifier for the app whose extended fields are being updated.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField namespace
   * @requiredField options
   * @requiredField options.namespaceData
   * @permissionId INNOVATION_LAB.WIX_ASSISTANT
   * @adminMethod
   */
  function updateExtendedFields(_id: string, namespace: string, options: UpdateExtendedFieldsOptions): Promise<UpdateExtendedFieldsResponse>;
  interface UpdateExtendedFieldsOptions {
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData: Record<string, any> | null;
  }
  
  type innovationPlaygroundV2Message_universal_d_Message = Message;
  type innovationPlaygroundV2Message_universal_d_Sender = Sender;
  const innovationPlaygroundV2Message_universal_d_Sender: typeof Sender;
  type innovationPlaygroundV2Message_universal_d_Feedback = Feedback;
  type innovationPlaygroundV2Message_universal_d_Document = Document;
  type innovationPlaygroundV2Message_universal_d_Category = Category;
  const innovationPlaygroundV2Message_universal_d_Category: typeof Category;
  type innovationPlaygroundV2Message_universal_d_Action = Action;
  const innovationPlaygroundV2Message_universal_d_Action: typeof Action;
  type innovationPlaygroundV2Message_universal_d_FeedbackType = FeedbackType;
  const innovationPlaygroundV2Message_universal_d_FeedbackType: typeof FeedbackType;
  type innovationPlaygroundV2Message_universal_d_Body = Body;
  type innovationPlaygroundV2Message_universal_d_ExtendedFields = ExtendedFields;
  type innovationPlaygroundV2Message_universal_d_Tags = Tags;
  type innovationPlaygroundV2Message_universal_d_TagList = TagList;
  type innovationPlaygroundV2Message_universal_d_QueryMessagesRequest = QueryMessagesRequest;
  type innovationPlaygroundV2Message_universal_d_CursorQuery = CursorQuery;
  type innovationPlaygroundV2Message_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type innovationPlaygroundV2Message_universal_d_Sorting = Sorting;
  type innovationPlaygroundV2Message_universal_d_SortOrder = SortOrder;
  const innovationPlaygroundV2Message_universal_d_SortOrder: typeof SortOrder;
  type innovationPlaygroundV2Message_universal_d_CursorPaging = CursorPaging;
  type innovationPlaygroundV2Message_universal_d_QueryMessagesResponse = QueryMessagesResponse;
  type innovationPlaygroundV2Message_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type innovationPlaygroundV2Message_universal_d_Cursors = Cursors;
  type innovationPlaygroundV2Message_universal_d_AskQuestionRequest = AskQuestionRequest;
  type innovationPlaygroundV2Message_universal_d_AskQuestionResponse = AskQuestionResponse;
  type innovationPlaygroundV2Message_universal_d_AddFeedbackRequest = AddFeedbackRequest;
  type innovationPlaygroundV2Message_universal_d_AddFeedbackResponse = AddFeedbackResponse;
  type innovationPlaygroundV2Message_universal_d_BulkUpdateMessageTagsRequest = BulkUpdateMessageTagsRequest;
  type innovationPlaygroundV2Message_universal_d_BulkUpdateMessageTagsResponse = BulkUpdateMessageTagsResponse;
  type innovationPlaygroundV2Message_universal_d_ItemMetadata = ItemMetadata;
  type innovationPlaygroundV2Message_universal_d_ApplicationError = ApplicationError;
  type innovationPlaygroundV2Message_universal_d_BulkUpdateMessageTagsResult = BulkUpdateMessageTagsResult;
  type innovationPlaygroundV2Message_universal_d_BulkActionMetadata = BulkActionMetadata;
  type innovationPlaygroundV2Message_universal_d_BulkUpdateMessageTagsByFilterRequest = BulkUpdateMessageTagsByFilterRequest;
  type innovationPlaygroundV2Message_universal_d_BulkUpdateMessageTagsByFilterResponse = BulkUpdateMessageTagsByFilterResponse;
  type innovationPlaygroundV2Message_universal_d_UpdateExtendedFieldsRequest = UpdateExtendedFieldsRequest;
  type innovationPlaygroundV2Message_universal_d_UpdateExtendedFieldsResponse = UpdateExtendedFieldsResponse;
  type innovationPlaygroundV2Message_universal_d_Empty = Empty;
  type innovationPlaygroundV2Message_universal_d_DomainEvent = DomainEvent;
  type innovationPlaygroundV2Message_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type innovationPlaygroundV2Message_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type innovationPlaygroundV2Message_universal_d_RestoreInfo = RestoreInfo;
  type innovationPlaygroundV2Message_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type innovationPlaygroundV2Message_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type innovationPlaygroundV2Message_universal_d_ActionEvent = ActionEvent;
  type innovationPlaygroundV2Message_universal_d_MessageEnvelope = MessageEnvelope;
  type innovationPlaygroundV2Message_universal_d_IdentificationData = IdentificationData;
  type innovationPlaygroundV2Message_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type innovationPlaygroundV2Message_universal_d_WebhookIdentityType = WebhookIdentityType;
  const innovationPlaygroundV2Message_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const innovationPlaygroundV2Message_universal_d_queryMessages: typeof queryMessages;
  type innovationPlaygroundV2Message_universal_d_MessagesQueryResult = MessagesQueryResult;
  type innovationPlaygroundV2Message_universal_d_MessagesQueryBuilder = MessagesQueryBuilder;
  const innovationPlaygroundV2Message_universal_d_askQuestion: typeof askQuestion;
  const innovationPlaygroundV2Message_universal_d_addFeedback: typeof addFeedback;
  type innovationPlaygroundV2Message_universal_d_AddFeedbackOptions = AddFeedbackOptions;
  const innovationPlaygroundV2Message_universal_d_bulkUpdateMessageTags: typeof bulkUpdateMessageTags;
  type innovationPlaygroundV2Message_universal_d_BulkUpdateMessageTagsOptions = BulkUpdateMessageTagsOptions;
  const innovationPlaygroundV2Message_universal_d_bulkUpdateMessageTagsByFilter: typeof bulkUpdateMessageTagsByFilter;
  type innovationPlaygroundV2Message_universal_d_BulkUpdateMessageTagsByFilterOptions = BulkUpdateMessageTagsByFilterOptions;
  const innovationPlaygroundV2Message_universal_d_updateExtendedFields: typeof updateExtendedFields;
  type innovationPlaygroundV2Message_universal_d_UpdateExtendedFieldsOptions = UpdateExtendedFieldsOptions;
  namespace innovationPlaygroundV2Message_universal_d {
    export {
      innovationPlaygroundV2Message_universal_d_Message as Message,
      innovationPlaygroundV2Message_universal_d_Sender as Sender,
      innovationPlaygroundV2Message_universal_d_Feedback as Feedback,
      innovationPlaygroundV2Message_universal_d_Document as Document,
      innovationPlaygroundV2Message_universal_d_Category as Category,
      innovationPlaygroundV2Message_universal_d_Action as Action,
      innovationPlaygroundV2Message_universal_d_FeedbackType as FeedbackType,
      innovationPlaygroundV2Message_universal_d_Body as Body,
      innovationPlaygroundV2Message_universal_d_ExtendedFields as ExtendedFields,
      innovationPlaygroundV2Message_universal_d_Tags as Tags,
      innovationPlaygroundV2Message_universal_d_TagList as TagList,
      innovationPlaygroundV2Message_universal_d_QueryMessagesRequest as QueryMessagesRequest,
      innovationPlaygroundV2Message_universal_d_CursorQuery as CursorQuery,
      innovationPlaygroundV2Message_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      innovationPlaygroundV2Message_universal_d_Sorting as Sorting,
      innovationPlaygroundV2Message_universal_d_SortOrder as SortOrder,
      innovationPlaygroundV2Message_universal_d_CursorPaging as CursorPaging,
      innovationPlaygroundV2Message_universal_d_QueryMessagesResponse as QueryMessagesResponse,
      innovationPlaygroundV2Message_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      innovationPlaygroundV2Message_universal_d_Cursors as Cursors,
      innovationPlaygroundV2Message_universal_d_AskQuestionRequest as AskQuestionRequest,
      innovationPlaygroundV2Message_universal_d_AskQuestionResponse as AskQuestionResponse,
      innovationPlaygroundV2Message_universal_d_AddFeedbackRequest as AddFeedbackRequest,
      innovationPlaygroundV2Message_universal_d_AddFeedbackResponse as AddFeedbackResponse,
      innovationPlaygroundV2Message_universal_d_BulkUpdateMessageTagsRequest as BulkUpdateMessageTagsRequest,
      innovationPlaygroundV2Message_universal_d_BulkUpdateMessageTagsResponse as BulkUpdateMessageTagsResponse,
      innovationPlaygroundV2Message_universal_d_ItemMetadata as ItemMetadata,
      innovationPlaygroundV2Message_universal_d_ApplicationError as ApplicationError,
      innovationPlaygroundV2Message_universal_d_BulkUpdateMessageTagsResult as BulkUpdateMessageTagsResult,
      innovationPlaygroundV2Message_universal_d_BulkActionMetadata as BulkActionMetadata,
      innovationPlaygroundV2Message_universal_d_BulkUpdateMessageTagsByFilterRequest as BulkUpdateMessageTagsByFilterRequest,
      innovationPlaygroundV2Message_universal_d_BulkUpdateMessageTagsByFilterResponse as BulkUpdateMessageTagsByFilterResponse,
      innovationPlaygroundV2Message_universal_d_UpdateExtendedFieldsRequest as UpdateExtendedFieldsRequest,
      innovationPlaygroundV2Message_universal_d_UpdateExtendedFieldsResponse as UpdateExtendedFieldsResponse,
      innovationPlaygroundV2Message_universal_d_Empty as Empty,
      innovationPlaygroundV2Message_universal_d_DomainEvent as DomainEvent,
      innovationPlaygroundV2Message_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      innovationPlaygroundV2Message_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      innovationPlaygroundV2Message_universal_d_RestoreInfo as RestoreInfo,
      innovationPlaygroundV2Message_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      innovationPlaygroundV2Message_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      innovationPlaygroundV2Message_universal_d_ActionEvent as ActionEvent,
      innovationPlaygroundV2Message_universal_d_MessageEnvelope as MessageEnvelope,
      innovationPlaygroundV2Message_universal_d_IdentificationData as IdentificationData,
      innovationPlaygroundV2Message_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      innovationPlaygroundV2Message_universal_d_WebhookIdentityType as WebhookIdentityType,
      innovationPlaygroundV2Message_universal_d_queryMessages as queryMessages,
      innovationPlaygroundV2Message_universal_d_MessagesQueryResult as MessagesQueryResult,
      innovationPlaygroundV2Message_universal_d_MessagesQueryBuilder as MessagesQueryBuilder,
      innovationPlaygroundV2Message_universal_d_askQuestion as askQuestion,
      innovationPlaygroundV2Message_universal_d_addFeedback as addFeedback,
      innovationPlaygroundV2Message_universal_d_AddFeedbackOptions as AddFeedbackOptions,
      innovationPlaygroundV2Message_universal_d_bulkUpdateMessageTags as bulkUpdateMessageTags,
      innovationPlaygroundV2Message_universal_d_BulkUpdateMessageTagsOptions as BulkUpdateMessageTagsOptions,
      innovationPlaygroundV2Message_universal_d_bulkUpdateMessageTagsByFilter as bulkUpdateMessageTagsByFilter,
      innovationPlaygroundV2Message_universal_d_BulkUpdateMessageTagsByFilterOptions as BulkUpdateMessageTagsByFilterOptions,
      innovationPlaygroundV2Message_universal_d_updateExtendedFields as updateExtendedFields,
      innovationPlaygroundV2Message_universal_d_UpdateExtendedFieldsOptions as UpdateExtendedFieldsOptions,
    };
  }
  
  export { innovationPlaygroundV2Message_universal_d as messages };
}
