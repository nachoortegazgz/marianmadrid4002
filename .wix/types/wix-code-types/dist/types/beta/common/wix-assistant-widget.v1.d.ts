declare module "wix-assistant-widget.v1" {
  interface Message {
      /**
       * Message ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Date and time the Message was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * __Required.__
       *
       * - `"UOU"`: Visitor sent message.
       * - `"ASSISTANT"`: AI assistant.
       * - `"SYSTEM"`: System notification.
       */
      sender?: Sender;
      /**
       * Controls who can see the message.
       *
       * - `"BUSINESS_AND_PARTICIPANT"`: Visible to the participant and site collaborators.
       * - `"BUSINESS"`: Visible to site collaborators only.
       */
      text?: string | null;
      /** Text that follows after payloads */
      suffixText?: string | null;
      /** Message payloads as struct */
      structPayloads?: Record<string, any>[] | null;
      /**
       * Conversation id
       * @readonly
       */
      conversationId?: string | null;
      /**
       * Message options
       * @readonly
       */
      options?: string[];
      /** Answer to message ID. */
      answerTo?: string | null;
      /**
       * Trigger id from ai assistant answer
       * @readonly
       */
      triggerId?: string | null;
      /**
       * __Required.__
       * Message type.
       *
       */
      messageType?: MessageType;
      /** Should site owner receive inbox notification */
      notifyInbox?: boolean;
      /**
       * Message ID.
       * @readonly
       */
      inboxMessageId?: string | null;
      /** Data Extensions */
      extendedFields?: ExtendedFields;
      /** Tags */
      tags?: Tags;
  }
  enum Sender {
      UNKNOWN = "UNKNOWN",
      UOU = "UOU",
      ASSISTANT = "ASSISTANT",
      USER = "USER",
      SYSTEM = "SYSTEM"
  }
  enum MessageType {
      UNKNOWN_MESSAGE_TYPE = "UNKNOWN_MESSAGE_TYPE",
      QUESTION = "QUESTION",
      ANSWER = "ANSWER",
      INTRO = "INTRO",
      LEGAL = "LEGAL",
      CONTACT_FORM = "CONTACT_FORM",
      CONTACT_FORM_SUBMITTED = "CONTACT_FORM_SUBMITTED",
      SITE_OWNER_NOTIFICATION = "SITE_OWNER_NOTIFICATION",
      OFFLINE = "OFFLINE"
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
  interface CreateMessageRequest {
      /** Message to be created. */
      message: Message;
  }
  interface CreateMessageResponse {
      /** The created Message. */
      message?: Message;
  }
  interface BatchCreateMessageRequest {
      /** Messages to be created. */
      messages?: Message[];
  }
  interface BatchCreateMessageResponse {
      /** The created Messages. */
      messages?: Message[];
  }
  interface ListMessagesRequest {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
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
  interface ListMessagesResponse {
      /** List of Messages. */
      messages?: Message[];
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
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
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
   * Creates a Message.
   * @param message - Message to be created.
   * @public
   * @documentationMaturity preview
   * @requiredField message
   * @requiredField message.messageType
   * @requiredField message.sender
   * @param options - Additional options for sending a message.
   * @permissionId INNOVATION_LAB.CHAT_WIDGET
   * @returns The created Message.
   */
  function createMessage(message: Message): Promise<Message>;
  /**
   * Creates a batch Messages.
   * @public
   * @documentationMaturity preview
   * @requiredField options.messages.messageType
   * @requiredField options.messages.sender
   * @param options - Additional options for sending a message.
   * @permissionId INNOVATION_LAB.CHAT_WIDGET
   */
  function batchCreateMessage(options?: BatchCreateMessageOptions): Promise<BatchCreateMessageResponse>;
  interface BatchCreateMessageOptions {
      /** Messages to be created. */
      messages?: Message[];
  }
  /**
   * Retrieves a list of Messages, given the provided [cursor paging].
   *
   * Up to 100 Messages can be returned per request.
   * @public
   * @documentationMaturity preview
   * @param options - Additional options for listing messages.
   * @permissionId INNOVATION_LAB.CHAT_WIDGET
   */
  function listMessages(options?: ListMessagesOptions): Promise<ListMessagesResponse>;
  interface ListMessagesOptions {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
  }
  /**
   * Synchronously update tags on multiple products, by list of product ids
   * A tag that appears both in the list of assign and unassign tags, will be assigned
   * @param ids - List of NileProtoTagsEntities that their tags will update.
   * @public
   * @documentationMaturity preview
   * @requiredField ids
   * @requiredField options.assignTags
   * @permissionId INNOVATION_LAB.CHAT_WIDGET
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
   * @permissionId INNOVATION_LAB.CHAT_WIDGET
   */
  function bulkUpdateMessageTagsByFilter(filter: Record<string, any> | null, options?: BulkUpdateMessageTagsByFilterOptions): Promise<BulkUpdateMessageTagsByFilterResponse>;
  interface BulkUpdateMessageTagsByFilterOptions {
      /** List of Tags to assign */
      assignTags: Tags;
      /** List of Tags to unAssign */
      unassignTags?: Tags;
  }
  
  type innovationWidgetV1Message_universal_d_Message = Message;
  type innovationWidgetV1Message_universal_d_Sender = Sender;
  const innovationWidgetV1Message_universal_d_Sender: typeof Sender;
  type innovationWidgetV1Message_universal_d_MessageType = MessageType;
  const innovationWidgetV1Message_universal_d_MessageType: typeof MessageType;
  type innovationWidgetV1Message_universal_d_ExtendedFields = ExtendedFields;
  type innovationWidgetV1Message_universal_d_Tags = Tags;
  type innovationWidgetV1Message_universal_d_TagList = TagList;
  type innovationWidgetV1Message_universal_d_CreateMessageRequest = CreateMessageRequest;
  type innovationWidgetV1Message_universal_d_CreateMessageResponse = CreateMessageResponse;
  type innovationWidgetV1Message_universal_d_BatchCreateMessageRequest = BatchCreateMessageRequest;
  type innovationWidgetV1Message_universal_d_BatchCreateMessageResponse = BatchCreateMessageResponse;
  type innovationWidgetV1Message_universal_d_ListMessagesRequest = ListMessagesRequest;
  type innovationWidgetV1Message_universal_d_CursorPaging = CursorPaging;
  type innovationWidgetV1Message_universal_d_ListMessagesResponse = ListMessagesResponse;
  type innovationWidgetV1Message_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type innovationWidgetV1Message_universal_d_Cursors = Cursors;
  type innovationWidgetV1Message_universal_d_BulkUpdateMessageTagsRequest = BulkUpdateMessageTagsRequest;
  type innovationWidgetV1Message_universal_d_BulkUpdateMessageTagsResponse = BulkUpdateMessageTagsResponse;
  type innovationWidgetV1Message_universal_d_ItemMetadata = ItemMetadata;
  type innovationWidgetV1Message_universal_d_ApplicationError = ApplicationError;
  type innovationWidgetV1Message_universal_d_BulkUpdateMessageTagsResult = BulkUpdateMessageTagsResult;
  type innovationWidgetV1Message_universal_d_BulkActionMetadata = BulkActionMetadata;
  type innovationWidgetV1Message_universal_d_BulkUpdateMessageTagsByFilterRequest = BulkUpdateMessageTagsByFilterRequest;
  type innovationWidgetV1Message_universal_d_BulkUpdateMessageTagsByFilterResponse = BulkUpdateMessageTagsByFilterResponse;
  type innovationWidgetV1Message_universal_d_DomainEvent = DomainEvent;
  type innovationWidgetV1Message_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type innovationWidgetV1Message_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type innovationWidgetV1Message_universal_d_RestoreInfo = RestoreInfo;
  type innovationWidgetV1Message_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type innovationWidgetV1Message_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type innovationWidgetV1Message_universal_d_ActionEvent = ActionEvent;
  type innovationWidgetV1Message_universal_d_MessageEnvelope = MessageEnvelope;
  type innovationWidgetV1Message_universal_d_IdentificationData = IdentificationData;
  type innovationWidgetV1Message_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type innovationWidgetV1Message_universal_d_WebhookIdentityType = WebhookIdentityType;
  const innovationWidgetV1Message_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const innovationWidgetV1Message_universal_d_createMessage: typeof createMessage;
  const innovationWidgetV1Message_universal_d_batchCreateMessage: typeof batchCreateMessage;
  type innovationWidgetV1Message_universal_d_BatchCreateMessageOptions = BatchCreateMessageOptions;
  const innovationWidgetV1Message_universal_d_listMessages: typeof listMessages;
  type innovationWidgetV1Message_universal_d_ListMessagesOptions = ListMessagesOptions;
  const innovationWidgetV1Message_universal_d_bulkUpdateMessageTags: typeof bulkUpdateMessageTags;
  type innovationWidgetV1Message_universal_d_BulkUpdateMessageTagsOptions = BulkUpdateMessageTagsOptions;
  const innovationWidgetV1Message_universal_d_bulkUpdateMessageTagsByFilter: typeof bulkUpdateMessageTagsByFilter;
  type innovationWidgetV1Message_universal_d_BulkUpdateMessageTagsByFilterOptions = BulkUpdateMessageTagsByFilterOptions;
  namespace innovationWidgetV1Message_universal_d {
    export {
      innovationWidgetV1Message_universal_d_Message as Message,
      innovationWidgetV1Message_universal_d_Sender as Sender,
      innovationWidgetV1Message_universal_d_MessageType as MessageType,
      innovationWidgetV1Message_universal_d_ExtendedFields as ExtendedFields,
      innovationWidgetV1Message_universal_d_Tags as Tags,
      innovationWidgetV1Message_universal_d_TagList as TagList,
      innovationWidgetV1Message_universal_d_CreateMessageRequest as CreateMessageRequest,
      innovationWidgetV1Message_universal_d_CreateMessageResponse as CreateMessageResponse,
      innovationWidgetV1Message_universal_d_BatchCreateMessageRequest as BatchCreateMessageRequest,
      innovationWidgetV1Message_universal_d_BatchCreateMessageResponse as BatchCreateMessageResponse,
      innovationWidgetV1Message_universal_d_ListMessagesRequest as ListMessagesRequest,
      innovationWidgetV1Message_universal_d_CursorPaging as CursorPaging,
      innovationWidgetV1Message_universal_d_ListMessagesResponse as ListMessagesResponse,
      innovationWidgetV1Message_universal_d_PagingMetadataV2 as PagingMetadataV2,
      innovationWidgetV1Message_universal_d_Cursors as Cursors,
      innovationWidgetV1Message_universal_d_BulkUpdateMessageTagsRequest as BulkUpdateMessageTagsRequest,
      innovationWidgetV1Message_universal_d_BulkUpdateMessageTagsResponse as BulkUpdateMessageTagsResponse,
      innovationWidgetV1Message_universal_d_ItemMetadata as ItemMetadata,
      innovationWidgetV1Message_universal_d_ApplicationError as ApplicationError,
      innovationWidgetV1Message_universal_d_BulkUpdateMessageTagsResult as BulkUpdateMessageTagsResult,
      innovationWidgetV1Message_universal_d_BulkActionMetadata as BulkActionMetadata,
      innovationWidgetV1Message_universal_d_BulkUpdateMessageTagsByFilterRequest as BulkUpdateMessageTagsByFilterRequest,
      innovationWidgetV1Message_universal_d_BulkUpdateMessageTagsByFilterResponse as BulkUpdateMessageTagsByFilterResponse,
      innovationWidgetV1Message_universal_d_DomainEvent as DomainEvent,
      innovationWidgetV1Message_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      innovationWidgetV1Message_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      innovationWidgetV1Message_universal_d_RestoreInfo as RestoreInfo,
      innovationWidgetV1Message_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      innovationWidgetV1Message_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      innovationWidgetV1Message_universal_d_ActionEvent as ActionEvent,
      innovationWidgetV1Message_universal_d_MessageEnvelope as MessageEnvelope,
      innovationWidgetV1Message_universal_d_IdentificationData as IdentificationData,
      innovationWidgetV1Message_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      innovationWidgetV1Message_universal_d_WebhookIdentityType as WebhookIdentityType,
      innovationWidgetV1Message_universal_d_createMessage as createMessage,
      innovationWidgetV1Message_universal_d_batchCreateMessage as batchCreateMessage,
      innovationWidgetV1Message_universal_d_BatchCreateMessageOptions as BatchCreateMessageOptions,
      innovationWidgetV1Message_universal_d_listMessages as listMessages,
      innovationWidgetV1Message_universal_d_ListMessagesOptions as ListMessagesOptions,
      innovationWidgetV1Message_universal_d_bulkUpdateMessageTags as bulkUpdateMessageTags,
      innovationWidgetV1Message_universal_d_BulkUpdateMessageTagsOptions as BulkUpdateMessageTagsOptions,
      innovationWidgetV1Message_universal_d_bulkUpdateMessageTagsByFilter as bulkUpdateMessageTagsByFilter,
      innovationWidgetV1Message_universal_d_BulkUpdateMessageTagsByFilterOptions as BulkUpdateMessageTagsByFilterOptions,
    };
  }
  
  export { innovationWidgetV1Message_universal_d as messages };
}
