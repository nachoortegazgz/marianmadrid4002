declare module "wix-riseevent" {
  /** Event is the main entity of EventService */
  interface Event {
      /**
       * Event ID
       * @internal
       * @readonly
       */
      _id?: string | null;
      /**
       * Represents the current state of an item. Each time the item is modified, its `revision` changes. For an update operation to succeed, you MUST pass the latest revision
       * @internal
       */
      revision?: string | null;
      /**
       * Represents the time this Event was created
       * @internal
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Represents the time this Event was last updated
       * @internal
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Wallet ID
       * @internal
       */
      walletId?: string;
      /**
       * Represents the time when the event's amount will be added to the account
       * @internal
       */
      startDate?: Date | null;
      /**
       * Represents the time when the unused balance will be deducted from the account
       * @internal
       */
      expiresAt?: Date | null;
      /**
       * Represents the time when the event was manually disabled
       * @internal
       */
      disabledAt?: Date | null;
      /**
       * The amount to be added to the customer
       * @internal
       */
      amount?: string;
      /**
       * Free text comment regarding the Event context
       * @internal
       */
      note?: string | null;
      /**
       * Indicates the kind of the specific event
       * @internal
       */
      type?: EventType;
      /**
       * The transactionId that added the event's amount;
       * @internal
       * @readonly
       */
      eventAddedTransactionId?: string | null;
      /**
       * The transactionId that removed the remaining event's balance;
       * @internal
       * @readonly
       */
      eventRemovedTransactionId?: string | null;
      /** @internal */
      status?: EventStatus;
  }
  enum EventType {
      UNKNOWN = "UNKNOWN",
      REWARD = "REWARD",
      REFUND = "REFUND"
  }
  enum EventStatus {
      PENDING = "PENDING",
      ACTIVE = "ACTIVE",
      DISABLED = "DISABLED",
      EXPIRED = "EXPIRED"
  }
  interface CreateEventRequest {
      /**
       * Event to be created
       * @internal
       */
      event: Event;
  }
  interface CreateEventResponse {
      /**
       * The created Event
       * @internal
       */
      event?: Event;
  }
  interface EventCreationExpirationDateInThePastDetails {
      /**
       * The date when the event expires.
       * @internal
       */
      expiresAt?: Date | null;
      /**
       * The date when the event was tried to be created.
       * @internal
       */
      currentDate?: Date | null;
  }
  interface EventCreationStartLaterThanExpirationDetails {
      /**
       * The start date of the event.
       * @internal
       */
      startDate?: Date | null;
      /**
       * The date when the event expires.
       * @internal
       */
      expiresAt?: Date | null;
  }
  interface EventCreationDisabledAtDateSetDetails {
      /**
       * Represents the time when the event was disabled.
       * @internal
       */
      disabledAt?: Date | null;
  }
  interface GetEventRequest {
      /**
       * ID of the Event to retrieve
       * @internal
       */
      eventId: string;
  }
  interface GetEventResponse {
      /**
       * The retrieved Event
       * @internal
       */
      event?: Event;
  }
  interface UpdateEventRequest {
      /**
       * Event to be updated, may be partial
       * @internal
       */
      event: Event;
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  interface UpdateEventResponse {
      /**
       * The updated Event
       * @internal
       */
      event?: Event;
  }
  interface InvalidEventDetails {
      /**
       * Event ID.
       * @internal
       */
      eventId?: string;
  }
  interface EventUpdateStartDateInThePastDetails {
      /**
       * Event ID.
       * @internal
       */
      eventId?: string;
      /**
       * The date when the event expires.
       * @internal
       */
      newStartDate?: Date | null;
      /**
       * The date when the event was tried to be updated.
       * @internal
       */
      currentDate?: Date | null;
  }
  interface EventUpdateExpirationDateInThePastDetails {
      /**
       * Event ID.
       * @internal
       */
      eventId?: string;
      /**
       * The date when the event expires.
       * @internal
       */
      newExpiresAt?: Date | null;
      /**
       * The date when the event was tried to be updated.
       * @internal
       */
      currentDate?: Date | null;
  }
  interface EventUpdateStartLaterThanExpirationDetails {
      /**
       * Event ID.
       * @internal
       */
      eventId?: string;
      /**
       * The start date of the event.
       * @internal
       */
      startDate?: Date | null;
      /**
       * The date when the event expires.
       * @internal
       */
      expiresAt?: Date | null;
  }
  interface DisableEventRequest {
      /**
       * ID of the Event to delete
       * @internal
       */
      eventId: string;
      /**
       * The revision of the Event
       * @internal
       */
      revision: string;
  }
  interface DisableEventResponse {
      /**
       * The expired Event
       * @internal
       */
      event?: Event;
  }
  interface EventDisabled {
      /** @internal */
      event?: Event;
  }
  interface DeleteEventRequest {
      /**
       * ID of the Event to delete
       * @internal
       */
      eventId: string;
      /**
       * The revision of the Event
       * @internal
       */
      revision?: string;
  }
  interface DeleteEventResponse {
  }
  interface QueryEventRequest {
      /**
       * WQL expression
       * @internal
       */
      query: QueryV2;
  }
  interface QueryV2 extends QueryV2PagingMethodOneOf {
      /**
       * Paging options to limit and skip the number of items.
       * @internal
       */
      paging?: Paging;
      /**
       * Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`.
       * @internal
       */
      cursorPaging?: CursorPaging;
      /**
       * Filter object in the following format:
       * `"filter" : {
       * "fieldName1": "value1",
       * "fieldName2":{"$operator":"value2"}
       * }`
       * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
       * @internal
       */
      filter?: Record<string, any> | null;
      /**
       * Sort object in the following format:
       * `[{"fieldName":"sortField1","order":"ASC"},{"fieldName":"sortField2","order":"DESC"}]`
       * @internal
       */
      sort?: Sorting[];
      /**
       * Array of projected fields. A list of specific field names to return. If `fieldsets` are also specified, the union of `fieldsets` and `fields` is returned.
       * @internal
       */
      fields?: string[];
      /**
       * Array of named, predefined sets of projected fields. A array of predefined named sets of fields to be returned. Specifying multiple `fieldsets` will return the union of fields from all sets. If `fields` are also specified, the union of `fieldsets` and `fields` is returned.
       * @internal
       */
      fieldsets?: string[];
  }
  /** @oneof */
  interface QueryV2PagingMethodOneOf {
      /**
       * Paging options to limit and skip the number of items.
       * @internal
       */
      paging?: Paging;
      /**
       * Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`.
       * @internal
       */
      cursorPaging?: CursorPaging;
  }
  interface Sorting {
      /**
       * Name of the field to sort by.
       * @internal
       */
      fieldName?: string;
      /**
       * Sort order.
       * @internal
       */
      order?: SortOrder;
  }
  enum SortOrder {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface Paging {
      /**
       * Number of items to load.
       * @internal
       */
      limit?: number | null;
      /**
       * Number of items to skip in the current sort order.
       * @internal
       */
      offset?: number | null;
  }
  interface CursorPaging {
      /**
       * Number of items to load.
       * @internal
       */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * You can get the relevant cursor token
       * from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       * @internal
       */
      cursor?: string | null;
  }
  interface QueryEventResponse {
      /**
       * The retrieved Events
       * @internal
       */
      events?: Event[];
      /** @internal */
      pagingMetadata?: PagingMetadataV2;
  }
  interface PagingMetadataV2 {
      /**
       * Number of items returned in the response.
       * @internal
       */
      count?: number | null;
      /**
       * Offset that was requested.
       * @internal
       */
      offset?: number | null;
      /**
       * Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set.
       * @internal
       */
      total?: number | null;
      /**
       * Flag that indicates the server failed to calculate the `total` field.
       * @internal
       */
      tooManyToCount?: boolean | null;
      /**
       * Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used.
       * @internal
       */
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
      /**
       * Cursor pointing to next page in the list of results.
       * @internal
       */
      next?: string | null;
      /**
       * Cursor pointing to previous page in the list of results.
       * @internal
       */
      prev?: string | null;
  }
  interface QueryEventBalancesRequest {
      /**
       * WQL expression
       * @internal
       */
      query: QueryV2;
  }
  interface QueryEventBalancesResponse {
      /**
       * The retrieved Events with their balance
       * @internal
       */
      events?: EventWithBalance[];
      /** @internal */
      pagingMetadata?: PagingMetadataV2;
  }
  interface EventWithBalance {
      /**
       * Event
       * @internal
       */
      event?: Event;
      /**
       * Event balance
       * @internal
       */
      balance?: string | null;
  }
  interface Task extends TaskTriggerOneOf {
      /**
       * A trigger which will fire once at a specified timestamp
       * @internal
       */
      oneTime?: Date | null;
      /**
       * A recurrent trigger defined by a specified cron expression.
       *
       * Cron expression is a string of five space-separated sub-expressions
       *
       * * * * * *
       * | | | | |
       * minute of hour | | | day of week
       * hour of day | month of year
       * day of month
       *
       * Field            Accepted values
       * -----            ---------------
       * minute of hour   0..59 / * ,
       * hour of day      0..23 / * ,
       * day of month     1..31 / * , W L
       * month of year    1..12 / * ,
       * day of week      0..7 MON..SUN / * W L #
       *
       * Coma separates multiple values:
       * 0,20,40 * * * * => on 0th, 20th and 40th minute
       * Slash selects every Nth value:
       * * /20 * * * * => equivalent to 0,20,40
       * 5/20 * * * * => on 5th, 25th and 45th minute
       * W selects working days
       * 0 2 * * W =>  2am on Mon..Fri
       * L selects the last day of ...
       * 0 0 L * *    => last day of each month
       * 0 0 LW * *   => last working day of each month
       * 0 0 * * FRIL => midnight of the last Friday of the month
       * Hash selects Nth day of week
       * 0 0 * * Mon#1 => midnight of the first Monday of the month
       *
       * Following aliases are supported: @hourly, @daily, @weekly, @monthly
       *
       * The first execution time will be evaluated based on the client invocation time (approximately the moment the
       * client call returns).
       * All executions will be evaluated in UTC.
       *
       * Example:
       * 00:19:59 - client schedules a task with cron = 0/20 * * * * (every 20-th minute of the hour)
       * 00:20:02 - task reaches Time Capsule database
       * 00:21:00 - task is executed by Time Capsule, the client is triggered with a ~1 minute delay
       * 00:40:00 - task is executed by Time Capsule according to the schedule with no delay
       * @internal
       */
      cron?: string;
      /**
       * Task id
       * @internal
       */
      _id?: TaskId;
      /**
       * Task payload
       * @internal
       */
      payload?: Record<string, any> | null;
      /**
       * A Greyhound topic to which the task will be produced when triggered
       * @internal
       * @readonly
       */
      topic?: string;
      /**
       * The time when this task is scheduled to trigger. For reoccurring tasks, this will be hold the next time this task will run and will be updated after every run
       * @internal
       * @readonly
       */
      scheduledFor?: Date | null;
  }
  /** @oneof */
  interface TaskTriggerOneOf {
      /**
       * A trigger which will fire once at a specified timestamp
       * @internal
       */
      oneTime?: Date | null;
      /**
       * A recurrent trigger defined by a specified cron expression.
       *
       * Cron expression is a string of five space-separated sub-expressions
       *
       * * * * * *
       * | | | | |
       * minute of hour | | | day of week
       * hour of day | month of year
       * day of month
       *
       * Field            Accepted values
       * -----            ---------------
       * minute of hour   0..59 / * ,
       * hour of day      0..23 / * ,
       * day of month     1..31 / * , W L
       * month of year    1..12 / * ,
       * day of week      0..7 MON..SUN / * W L #
       *
       * Coma separates multiple values:
       * 0,20,40 * * * * => on 0th, 20th and 40th minute
       * Slash selects every Nth value:
       * * /20 * * * * => equivalent to 0,20,40
       * 5/20 * * * * => on 5th, 25th and 45th minute
       * W selects working days
       * 0 2 * * W =>  2am on Mon..Fri
       * L selects the last day of ...
       * 0 0 L * *    => last day of each month
       * 0 0 LW * *   => last working day of each month
       * 0 0 * * FRIL => midnight of the last Friday of the month
       * Hash selects Nth day of week
       * 0 0 * * Mon#1 => midnight of the first Monday of the month
       *
       * Following aliases are supported: @hourly, @daily, @weekly, @monthly
       *
       * The first execution time will be evaluated based on the client invocation time (approximately the moment the
       * client call returns).
       * All executions will be evaluated in UTC.
       *
       * Example:
       * 00:19:59 - client schedules a task with cron = 0/20 * * * * (every 20-th minute of the hour)
       * 00:20:02 - task reaches Time Capsule database
       * 00:21:00 - task is executed by Time Capsule, the client is triggered with a ~1 minute delay
       * 00:40:00 - task is executed by Time Capsule according to the schedule with no delay
       * @internal
       */
      cron?: string;
  }
  interface TaskId {
      /**
       * A unique identifier of an application or a source that define the task. In most cases this would be the appDefId
       * @internal
       */
      namespace?: string;
      /**
       * A free-form string distinguishing different families of tasks within a namespace.
       * For example: "send-promo-email", "ClearTrashBin", "premium expiration reminder"
       * @internal
       */
      taskType?: string;
      /**
       * A free-form string that together with `namespace` and `task_type` uniquely identifies a task.
       * When there is an entity involved, setting this to be equal to the ID of an entity related to the task is a good option.
       * @internal
       */
      key?: string;
  }
  interface Empty {
  }
  interface EventExpired {
      /** @internal */
      event?: Event;
  }
  interface DomainEvent extends DomainEventBodyOneOf {
      /** @internal */
      createdEvent?: EntityCreatedEvent;
      /** @internal */
      updatedEvent?: EntityUpdatedEvent;
      /** @internal */
      deletedEvent?: EntityDeletedEvent;
      /** @internal */
      actionEvent?: ActionEvent;
      /**
       * random GUID so clients can tell if event was already handled
       * @internal
       */
      _id?: string;
      /**
       * Assumes actions are also always typed to an entity_type
       * Example: wix.stores.catalog.product, wix.bookings.session, wix.payments.transaction
       * @internal
       */
      entityFqdn?: string;
      /**
       * This is top level to ease client code dispatching of messages (switch on entity_fqdn+slug)
       * This is although the created/updated/deleted notion is duplication of the oneof types
       * Example: created/updated/deleted/started/completed/email_opened
       * @internal
       */
      slug?: string;
      /**
       * Assuming that all messages including Actions have id
       * Example: The id of the specific order, the id of a specific campaign
       * @internal
       */
      entityId?: string;
      /**
       * The time of the event. Useful if there was a delay in dispatching
       * @internal
       */
      eventTime?: Date | null;
      /**
       * A field that should be set if this event was triggered by an anonymize request.
       * For example you must set it to true when sending an event as a result of a GDPR right to be forgotten request.
       * NOTE: This field is not relevant for `EntityCreatedEvent` but is located here for better ergonomics of consumers.
       * @internal
       */
      triggeredByAnonymizeRequest?: boolean | null;
      /**
       * If present, indicates the action that triggered the event.
       * @internal
       */
      originatedFrom?: string | null;
      /**
       * A sequence number defining the order of updates to the underlying entity.
       * For example, given that some entity was updated at 16:00 and than again at 16:01,
       * it is guaranteed that the sequence number of the second update is strictly higher than the first.
       * As the consumer, you can use this value to ensure that you handle messages in the correct order.
       * To do so, you will need to persist this number on your end, and compare the sequence number from the
       * message against the one you have stored. Given that the stored number is higher, you should ignore the message.
       * @internal
       */
      entityEventSequence?: string | null;
  }
  /** @oneof */
  interface DomainEventBodyOneOf {
      /** @internal */
      createdEvent?: EntityCreatedEvent;
      /** @internal */
      updatedEvent?: EntityUpdatedEvent;
      /** @internal */
      deletedEvent?: EntityDeletedEvent;
      /** @internal */
      actionEvent?: ActionEvent;
  }
  interface EntityCreatedEvent {
      /** @internal */
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
       * @internal
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
       */
      previousEntityAsJson?: string | null;
      /**
       * WIP - This property will hold both names and values of the updated fields of the entity.
       * For more details please see [adr](https://docs.google.com/document/d/1PdqsOM20Ph2HAkmx8zvUnzzk3Sekp3BR9h34wSvsRnI/edit#heading=h.phlw87mh2imx) or [issue](https://github.com/wix-private/nile-tracker/issues/363)
       * @internal
       */
      entityUpdates?: Record<string, any>;
  }
  interface EntityDeletedEvent {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
  }
  interface ActionEvent {
      /** @internal */
      bodyAsJson?: string;
  }
  /**
   * Creates a new Event
   * @param event - Event to be created
   * @public
   * @documentationMaturity preview
   * @requiredField event
   * @permissionId RISE.EVENT_CREATE
   * @adminMethod
   * @returns The created Event
   */
  function createEvent(event: Event): Promise<Event>;
  /**
   * Get an Event by ID
   * @param eventId - ID of the Event to retrieve
   * @public
   * @documentationMaturity preview
   * @requiredField eventId
   * @permissionId RISE.EVENT_READ
   * @adminMethod
   * @returns The retrieved Event
   */
  function getEvent(eventId: string): Promise<Event>;
  /**
   * Update an Event, supports partial update
   * Pass the latest `revision` for a successful update
   * @param _id - Event ID
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField event
   * @permissionId RISE.EVENT_UPDATE
   * @adminMethod
   * @returns The updated Event
   */
  function updateEvent(_id: string | null, event: UpdateEvent, options?: UpdateEventOptions): Promise<Event>;
  interface UpdateEvent {
      /**
       * Event ID
       * @internal
       * @readonly
       */
      _id?: string | null;
      /**
       * Represents the current state of an item. Each time the item is modified, its `revision` changes. For an update operation to succeed, you MUST pass the latest revision
       * @internal
       */
      revision?: string | null;
      /**
       * Represents the time this Event was created
       * @internal
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Represents the time this Event was last updated
       * @internal
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Wallet ID
       * @internal
       */
      walletId?: string;
      /**
       * Represents the time when the event's amount will be added to the account
       * @internal
       */
      startDate?: Date | null;
      /**
       * Represents the time when the unused balance will be deducted from the account
       * @internal
       */
      expiresAt?: Date | null;
      /**
       * Represents the time when the event was manually disabled
       * @internal
       */
      disabledAt?: Date | null;
      /**
       * The amount to be added to the customer
       * @internal
       */
      amount?: string;
      /**
       * Free text comment regarding the Event context
       * @internal
       */
      note?: string | null;
      /**
       * Indicates the kind of the specific event
       * @internal
       */
      type?: EventType;
      /**
       * The transactionId that added the event's amount;
       * @internal
       * @readonly
       */
      eventAddedTransactionId?: string | null;
      /**
       * The transactionId that removed the remaining event's balance;
       * @internal
       * @readonly
       */
      eventRemovedTransactionId?: string | null;
      /** @internal */
      status?: EventStatus;
  }
  interface UpdateEventOptions {
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  /**
   * Expire an Event immediately and deducting the remaining balance from the gift card
   * @param eventId - ID of the Event to delete
   * @param revision - The revision of the Event
   * @public
   * @documentationMaturity preview
   * @requiredField eventId
   * @requiredField revision
   * @permissionId RISE.EVENT_UPDATE
   * @adminMethod
   */
  function disableEvent(eventId: string, revision: string): Promise<void>;
  /**
   * Delete an Event, only available for events which haven't started
   * @param eventId - ID of the Event to delete
   * @internal
   * @documentationMaturity preview
   * @requiredField eventId
   * @permissionId RISE.EVENT_DELETE
   * @adminMethod
   */
  function deleteEvent(eventId: string, options?: DeleteEventOptions): Promise<void>;
  interface DeleteEventOptions {
      /**
       * The revision of the Event
       * @internal
       */
      revision?: string;
  }
  /**
   * Query Events using [WQL - Wix Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language)
   * @param query - WQL expression
   * @internal
   * @documentationMaturity preview
   * @requiredField query
   * @permissionId RISE.EVENT_READ
   * @adminMethod
   */
  function queryEvent(query: QueryV2): Promise<void>;
  /**
   * Query Events using [WQL - Wix Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language)
   * Results will be enriched with calculated balances
   * @param query - WQL expression
   * @public
   * @documentationMaturity preview
   * @requiredField query
   * @permissionId RISE.EVENT_READ
   * @adminMethod
   */
  function queryEventBalances(query: QueryV2): Promise<void>;
  
  type riseV1Event_universal_d_Event = Event;
  type riseV1Event_universal_d_EventType = EventType;
  const riseV1Event_universal_d_EventType: typeof EventType;
  type riseV1Event_universal_d_EventStatus = EventStatus;
  const riseV1Event_universal_d_EventStatus: typeof EventStatus;
  type riseV1Event_universal_d_CreateEventRequest = CreateEventRequest;
  type riseV1Event_universal_d_CreateEventResponse = CreateEventResponse;
  type riseV1Event_universal_d_EventCreationExpirationDateInThePastDetails = EventCreationExpirationDateInThePastDetails;
  type riseV1Event_universal_d_EventCreationStartLaterThanExpirationDetails = EventCreationStartLaterThanExpirationDetails;
  type riseV1Event_universal_d_EventCreationDisabledAtDateSetDetails = EventCreationDisabledAtDateSetDetails;
  type riseV1Event_universal_d_GetEventRequest = GetEventRequest;
  type riseV1Event_universal_d_GetEventResponse = GetEventResponse;
  type riseV1Event_universal_d_UpdateEventRequest = UpdateEventRequest;
  type riseV1Event_universal_d_UpdateEventResponse = UpdateEventResponse;
  type riseV1Event_universal_d_InvalidEventDetails = InvalidEventDetails;
  type riseV1Event_universal_d_EventUpdateStartDateInThePastDetails = EventUpdateStartDateInThePastDetails;
  type riseV1Event_universal_d_EventUpdateExpirationDateInThePastDetails = EventUpdateExpirationDateInThePastDetails;
  type riseV1Event_universal_d_EventUpdateStartLaterThanExpirationDetails = EventUpdateStartLaterThanExpirationDetails;
  type riseV1Event_universal_d_DisableEventRequest = DisableEventRequest;
  type riseV1Event_universal_d_DisableEventResponse = DisableEventResponse;
  type riseV1Event_universal_d_EventDisabled = EventDisabled;
  type riseV1Event_universal_d_DeleteEventRequest = DeleteEventRequest;
  type riseV1Event_universal_d_DeleteEventResponse = DeleteEventResponse;
  type riseV1Event_universal_d_QueryEventRequest = QueryEventRequest;
  type riseV1Event_universal_d_QueryV2 = QueryV2;
  type riseV1Event_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
  type riseV1Event_universal_d_Sorting = Sorting;
  type riseV1Event_universal_d_SortOrder = SortOrder;
  const riseV1Event_universal_d_SortOrder: typeof SortOrder;
  type riseV1Event_universal_d_Paging = Paging;
  type riseV1Event_universal_d_CursorPaging = CursorPaging;
  type riseV1Event_universal_d_QueryEventResponse = QueryEventResponse;
  type riseV1Event_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type riseV1Event_universal_d_Cursors = Cursors;
  type riseV1Event_universal_d_QueryEventBalancesRequest = QueryEventBalancesRequest;
  type riseV1Event_universal_d_QueryEventBalancesResponse = QueryEventBalancesResponse;
  type riseV1Event_universal_d_EventWithBalance = EventWithBalance;
  type riseV1Event_universal_d_Task = Task;
  type riseV1Event_universal_d_TaskTriggerOneOf = TaskTriggerOneOf;
  type riseV1Event_universal_d_TaskId = TaskId;
  type riseV1Event_universal_d_Empty = Empty;
  type riseV1Event_universal_d_EventExpired = EventExpired;
  type riseV1Event_universal_d_DomainEvent = DomainEvent;
  type riseV1Event_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type riseV1Event_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type riseV1Event_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type riseV1Event_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type riseV1Event_universal_d_ActionEvent = ActionEvent;
  const riseV1Event_universal_d_createEvent: typeof createEvent;
  const riseV1Event_universal_d_getEvent: typeof getEvent;
  const riseV1Event_universal_d_updateEvent: typeof updateEvent;
  type riseV1Event_universal_d_UpdateEvent = UpdateEvent;
  type riseV1Event_universal_d_UpdateEventOptions = UpdateEventOptions;
  const riseV1Event_universal_d_disableEvent: typeof disableEvent;
  const riseV1Event_universal_d_deleteEvent: typeof deleteEvent;
  type riseV1Event_universal_d_DeleteEventOptions = DeleteEventOptions;
  const riseV1Event_universal_d_queryEvent: typeof queryEvent;
  const riseV1Event_universal_d_queryEventBalances: typeof queryEventBalances;
  namespace riseV1Event_universal_d {
    export {
      riseV1Event_universal_d_Event as Event,
      riseV1Event_universal_d_EventType as EventType,
      riseV1Event_universal_d_EventStatus as EventStatus,
      riseV1Event_universal_d_CreateEventRequest as CreateEventRequest,
      riseV1Event_universal_d_CreateEventResponse as CreateEventResponse,
      riseV1Event_universal_d_EventCreationExpirationDateInThePastDetails as EventCreationExpirationDateInThePastDetails,
      riseV1Event_universal_d_EventCreationStartLaterThanExpirationDetails as EventCreationStartLaterThanExpirationDetails,
      riseV1Event_universal_d_EventCreationDisabledAtDateSetDetails as EventCreationDisabledAtDateSetDetails,
      riseV1Event_universal_d_GetEventRequest as GetEventRequest,
      riseV1Event_universal_d_GetEventResponse as GetEventResponse,
      riseV1Event_universal_d_UpdateEventRequest as UpdateEventRequest,
      riseV1Event_universal_d_UpdateEventResponse as UpdateEventResponse,
      riseV1Event_universal_d_InvalidEventDetails as InvalidEventDetails,
      riseV1Event_universal_d_EventUpdateStartDateInThePastDetails as EventUpdateStartDateInThePastDetails,
      riseV1Event_universal_d_EventUpdateExpirationDateInThePastDetails as EventUpdateExpirationDateInThePastDetails,
      riseV1Event_universal_d_EventUpdateStartLaterThanExpirationDetails as EventUpdateStartLaterThanExpirationDetails,
      riseV1Event_universal_d_DisableEventRequest as DisableEventRequest,
      riseV1Event_universal_d_DisableEventResponse as DisableEventResponse,
      riseV1Event_universal_d_EventDisabled as EventDisabled,
      riseV1Event_universal_d_DeleteEventRequest as DeleteEventRequest,
      riseV1Event_universal_d_DeleteEventResponse as DeleteEventResponse,
      riseV1Event_universal_d_QueryEventRequest as QueryEventRequest,
      riseV1Event_universal_d_QueryV2 as QueryV2,
      riseV1Event_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf,
      riseV1Event_universal_d_Sorting as Sorting,
      riseV1Event_universal_d_SortOrder as SortOrder,
      riseV1Event_universal_d_Paging as Paging,
      riseV1Event_universal_d_CursorPaging as CursorPaging,
      riseV1Event_universal_d_QueryEventResponse as QueryEventResponse,
      riseV1Event_universal_d_PagingMetadataV2 as PagingMetadataV2,
      riseV1Event_universal_d_Cursors as Cursors,
      riseV1Event_universal_d_QueryEventBalancesRequest as QueryEventBalancesRequest,
      riseV1Event_universal_d_QueryEventBalancesResponse as QueryEventBalancesResponse,
      riseV1Event_universal_d_EventWithBalance as EventWithBalance,
      riseV1Event_universal_d_Task as Task,
      riseV1Event_universal_d_TaskTriggerOneOf as TaskTriggerOneOf,
      riseV1Event_universal_d_TaskId as TaskId,
      riseV1Event_universal_d_Empty as Empty,
      riseV1Event_universal_d_EventExpired as EventExpired,
      riseV1Event_universal_d_DomainEvent as DomainEvent,
      riseV1Event_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      riseV1Event_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      riseV1Event_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      riseV1Event_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      riseV1Event_universal_d_ActionEvent as ActionEvent,
      riseV1Event_universal_d_createEvent as createEvent,
      riseV1Event_universal_d_getEvent as getEvent,
      riseV1Event_universal_d_updateEvent as updateEvent,
      riseV1Event_universal_d_UpdateEvent as UpdateEvent,
      riseV1Event_universal_d_UpdateEventOptions as UpdateEventOptions,
      riseV1Event_universal_d_disableEvent as disableEvent,
      riseV1Event_universal_d_deleteEvent as deleteEvent,
      riseV1Event_universal_d_DeleteEventOptions as DeleteEventOptions,
      riseV1Event_universal_d_queryEvent as queryEvent,
      riseV1Event_universal_d_queryEventBalances as queryEventBalances,
    };
  }
  
  export { riseV1Event_universal_d as event };
}
