declare module "wix-automations-activation-log.v1" {
  interface ActivationLog {
      /** Activation ID */
      _id?: string;
      /** The activated automation ID */
      automationId?: string;
      /** The activated automation revision */
      automationRevision?: string;
      /** Automation activation status */
      status?: Status;
      /** Scheduled status additional info */
      initiatedInfo?: InitiatedStatusInfo;
      /** Scheduled status additional info */
      scheduledInfo?: ScheduledStatusInfo;
      /** Started status additional info */
      startedInfo?: StartedStatusInfo;
      /** Ended status additional info */
      endedInfo?: EndedStatusInfo;
      /** Cancelled status additional info */
      cancelledInfo?: CancelledStatusInfo;
      /** Failed status additional info */
      failedInfo?: FailedStatusInfo;
      /** Created date */
      _createdDate?: Date | null;
  }
  enum Target {
      UNKNOWN_TARGET = "UNKNOWN_TARGET",
      SCHEDULE = "SCHEDULE",
      IMMEDIATE = "IMMEDIATE"
  }
  enum CancellationReason {
      UNKNOWN_CANCELLATION_REASON = "UNKNOWN_CANCELLATION_REASON",
      /** Indicating that the activation was cancelled directly */
      EVENT_CANCELLED = "EVENT_CANCELLED",
      /** Indicating that the activation is cancelled because the automation was deactivated */
      AUTOMATION_DEACTIVATED = "AUTOMATION_DEACTIVATED",
      /** Indicating that the activation is cancelled because the automation was deleted */
      AUTOMATION_DELETED = "AUTOMATION_DELETED",
      /** Indicating that the activation is cancelled after the automation schedule time was reached */
      CANCELLED_BY_REFRESH_PAYLOAD = "CANCELLED_BY_REFRESH_PAYLOAD"
  }
  interface Identity {
      /** User ID */
      userId?: string | null;
      /** App ID */
      appId?: string | null;
  }
  enum Status {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      /** This indicates activation is not started yet (no action has run yet) */
      INITIATED = "INITIATED",
      /** The activation is in scheduled status when the automation has future date or debounce defined and we're in the waiting stage (no action has run yet) */
      SCHEDULED = "SCHEDULED",
      /** This indicates the automation activation has started and currently in progress */
      STARTED = "STARTED",
      /** This indicates all the automation actions were handled either by invoking them, skipping them etc. */
      ENDED = "ENDED",
      /** This indicates the activation was cancelled */
      CANCELLED = "CANCELLED",
      /**
       * This indicates the activation failed to start
       * Note that failure in the activation of a single action will not result a failure in activation of the entire automation
       */
      FAILED = "FAILED"
  }
  interface InitiatedStatusInfo {
      /** Created date */
      statusChangedDate?: Date | null;
      target?: Target;
      /** The reported trigger payload */
      payload?: Record<string, any> | null;
      externalEntityId?: string | null;
      /** Unique identifier for the request that initiated the automation */
      requestId?: string | null;
  }
  interface ScheduledStatusInfo {
      /** Created date */
      statusChangedDate?: Date | null;
      /** Schedule identifier */
      scheduleId?: string;
      /** Indicating when the activation should start */
      date?: Date | null;
  }
  interface StartedStatusInfo {
      /** Created date */
      statusChangedDate?: Date | null;
      /** Enriched and refreshed payload */
      payload?: Record<string, any> | null;
  }
  interface EndedStatusInfo {
      /** Created date */
      statusChangedDate?: Date | null;
  }
  interface CancelledStatusInfo {
      /** Created date */
      statusChangedDate?: Date | null;
      /** Cancellation reason */
      reason?: CancellationReason;
      /** The identity (such as user, app etc.) that caused the cancellation */
      initiator?: Identity;
  }
  interface FailedStatusInfo {
      /** Created date */
      statusChangedDate?: Date | null;
      /**
       * Error description
       * @readonly
       */
      errorDescription?: string;
      /** Error code */
      errorCode?: string | null;
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
  interface Empty {
  }
  interface ActivationContinuedAfterSchedule {
      /** Activation identifier */
      _id?: string;
      /** Activation Automation */
      automation?: Automation;
  }
  interface Automation extends AutomationOriginInfoOneOf {
      /** Application info */
      applicationInfo?: ApplicationOrigin;
      /** Preinstalled info */
      preinstalledInfo?: PreinstalledOrigin;
      /**
       * Automation ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the automation is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the automation.
       *
       * Ignored when creating an automation.
       * @readonly
       */
      revision?: string | null;
      /**
       * Information about the creator of the automation.
       * @readonly
       */
      createdBy?: AuditInfo;
      /**
       * Date and time the automation was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * The entity that last updated the automation.
       * @readonly
       */
      updatedBy?: AuditInfo;
      /**
       * Date and time the automation was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Automation name that is displayed on the user's site. */
      name?: string;
      /** Automation description. */
      description?: string | null;
      /** Object that defines the automation's trigger, actions, and activation status. */
      configuration?: AutomationConfiguration;
      /** Defines how the automation was added to the site. */
      origin?: Origin;
      /** Automation settings. */
      settings?: AutomationSettings;
      /**
       * Draft info (optional - only if the automation is a draft)
       * @readonly
       */
      draftInfo?: DraftInfo;
      /** Namespace */
      namespace?: string | null;
      /**
       * Enrichments in use
       * @internal
       * @readonly
       */
      enrichments?: Enrichments;
      /**
       * Date and time the automation's draft was last updated.
       * @internal
       * @readonly
       */
      draftUpdatedDate?: Date | null;
  }
  /** @oneof */
  interface AutomationOriginInfoOneOf {
      /** Application info */
      applicationInfo?: ApplicationOrigin;
      /** Preinstalled info */
      preinstalledInfo?: PreinstalledOrigin;
  }
  interface ActionSettings {
      /**
       * List of actions that cannot be deleted.
       * Default: Empty. All actions are deletable by default.
       */
      permanentActionIds?: string[];
      /**
       * List of actions that cannot be edited.
       * Default: Empty. All actions are editable by default.
       */
      readonlyActionIds?: string[];
      /** Whether the option to add a delay is disabled for the automation. */
      disableDelayAddition?: boolean;
      /** Whether the option to add a condition is disabled for the automation. */
      disableConditionAddition?: boolean;
  }
  enum Domain {
      /** User domain (default). */
      USER = "USER",
      /** Wix domain. */
      WIX = "WIX"
  }
  interface Enrichment {
      /** Enrichment input mappings. */
      inputMappings?: Record<string, any>[] | null;
  }
  interface AuditInfo extends AuditInfoIdOneOf {
      /** User ID. */
      userId?: string;
      /** Application ID. */
      appId?: string;
  }
  /** @oneof */
  interface AuditInfoIdOneOf {
      /** User ID. */
      userId?: string;
      /** Application ID. */
      appId?: string;
  }
  /** Automation runtime configuration */
  interface AutomationConfiguration {
      /** Status of the automation on the site. */
      status?: AutomationConfigurationStatus;
      /** Automation trigger configuration. */
      trigger?: Trigger;
      /** List of IDs of root actions. Root actions are the first actions to run after the trigger. The actions in the list run in parallel. */
      rootActionIds?: string[];
      /**
       * Map of all actions that the automation may execute.
       * The key is the action ID, and the value is the action configuration.
       */
      actions?: Record<string, Action>;
  }
  enum TimeUnit {
      UNKNOWN_TIME_UNIT = "UNKNOWN_TIME_UNIT",
      MINUTES = "MINUTES",
      HOURS = "HOURS",
      DAYS = "DAYS",
      WEEKS = "WEEKS",
      MONTHS = "MONTHS"
  }
  interface Filter {
      /** Filter ID. */
      _id?: string;
      /** Field key from the payload schema, for example "formId". */
      fieldKey?: string;
      /** Filter expression that evaluates to a boolean. */
      filterExpression?: string;
  }
  interface FutureDateActivationOffset {
      /**
       * The offset value. The value is always taken as negative, so that the automation runs before the trigger date.
       * To create an offset that causes the automation to run after the trigger date, use a delay action.
       */
      preScheduledEventOffsetExpression?: string;
      /** Time unit for the scheduled event offset. */
      scheduledEventOffsetTimeUnit?: TimeUnit;
  }
  interface RateLimit {
      /** Value expressing the maximum number of times the trigger can be activated. */
      maxActivationsExpression?: string;
      /** Duration of the rate limiting window in the selected time unit. If no value is set, the rate limit is permanent. */
      durationExpression?: string | null;
      /** Time unit for the rate limit duration. */
      durationTimeUnit?: TimeUnit;
      /** Unique identifier of each activation, by which rate limiter will count activations. */
      uniqueIdentifierExpression?: string | null;
  }
  interface ConditionExpressionGroup {
      /** Expression group operator. */
      operator?: Operator;
      /** List of boolean expressions to be evaluated with the given operator. */
      booleanExpressions?: string[];
  }
  enum Operator {
      UNKNOWN_OPERATOR = "UNKNOWN_OPERATOR",
      OR = "OR",
      AND = "AND"
  }
  enum Type {
      /** Automation will be triggered according to the trigger configuration. */
      UNKNOWN_ACTION_TYPE = "UNKNOWN_ACTION_TYPE",
      /** App defined Action. */
      APP_DEFINED = "APP_DEFINED",
      /** Condition Action. */
      CONDITION = "CONDITION",
      /** Delay Action. */
      DELAY = "DELAY",
      /** RateLimit Action. */
      RATE_LIMIT = "RATE_LIMIT",
      /** Set Variables Action. */
      SET_VARIABLES = "SET_VARIABLES",
      /** Output Action. */
      OUTPUT = "OUTPUT"
  }
  interface AppDefinedAction {
      /** ID of the app that defines the action. */
      appId?: string;
      /** Action key. */
      actionKey?: string;
      /** Action input mapping. */
      inputMapping?: Record<string, any> | null;
      /**
       * Array of conditions determining whether to skip the action in the automation flow.
       * The action will be skipped if any of the expression groups evaluate to `true`.
       * Actions following a skipped action will still run.
       */
      skipConditionOrExpressionGroups?: ConditionExpressionGroup[];
      /** List of IDs of actions to run in parallel once the action completes. */
      postActionIds?: string[];
  }
  interface ConditionAction {
      /** The condition evaluates to `true` if either of the expression groups evaluate to `true`. */
      orExpressionGroups?: ConditionExpressionGroup[];
      /** List of IDs of actions to run when the entire condition is evaluated to `true`. */
      truePostActionIds?: string[];
      /** List of IDs of actions to run when the entire condition is evaluated to `false`. */
      falsePostActionIds?: string[];
  }
  interface DelayAction {
      /** Value expressing the amount of time to wait from a specific date or from the time the action is executed. */
      offsetExpression?: string | null;
      /** Time unit for delay offset. */
      offsetTimeUnit?: TimeUnit;
      /**
       * The action due date. If defined without an offset, the automation will wait until this date to execute the next step.
       * If an offset is defined, it's calculated from this date.
       * The date is expressed in the number of milliseconds since the Unix Epoch (1 January, 1970 UTC).
       */
      dueDateEpochExpression?: string | null;
      /** List of IDs of actions to run in parallel after the delay. */
      postActionIds?: string[];
  }
  interface RateLimitAction {
      /** The maximum number of activations allowed for the action. */
      maxActivationsExpression?: string;
      /**
       * Duration of the rate limiting window, expressed in selected time unit.
       * If no value is set, then there is no time limit on the rate limiter.
       */
      rateLimitDurationExpression?: string | null;
      /** Time unit for the rate limit duration. */
      rateLimitDurationTimeUnit?: TimeUnit;
      /** Unique identifier of each activation by which rate limiter counts activations. */
      uniqueIdentifierExpression?: string | null;
      /** List of IDs of actions to run in parallel once the action completes. */
      postActionIds?: string[];
  }
  interface SetVariablesAction {
      /**
       * output mapping
       * for example: {"someField": "{{10}}", "someOtherField": "{{multiply( var('account.points.balance') ;2 )}}" }
       */
      outputMapping?: Record<string, any> | null;
      /**
       * output json schema representation
       * could be string instead of Struct (and introduce some compression to minimize the size of it)
       */
      outputSchema?: Record<string, any> | null;
      /** List of IDs of actions to run in parallel after variable initialization. */
      postActionIds?: string[];
  }
  interface OutputAction {
      /** Output action output mapping. */
      outputMapping?: Record<string, any> | null;
  }
  enum AutomationConfigurationStatus {
      /** unused */
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      /** Automation will be triggered according to the trigger configuration */
      ACTIVE = "ACTIVE",
      /** Automation will not be triggered */
      INACTIVE = "INACTIVE"
  }
  interface Trigger {
      /** ID of the app that defines the trigger. */
      appId?: string;
      /** Trigger key. */
      triggerKey?: string;
      /**
       * List of filters on schema fields.
       * In order for the automation to run, all filter expressions must evaluate to `true` for a given payload.
       */
      filters?: Filter[];
      /** Defines the time offset between the trigger date and when the automation runs. */
      scheduledEventOffset?: FutureDateActivationOffset;
      /** Limits the number of times an automation can be triggered. */
      rateLimit?: RateLimit;
      /**
       * An optional configuration, per automation, of a schema that is optionally offered by the trigger provider to affect the behavior of the trigger.
       * For example, a trigger provider may offer a schema that allows the user to configure the trigger to happen at a certain time of day,
       * He would define a schema with a field called "startDate" and using this parameter the user can define his preferred startDate, per automation.
       */
      automationConfigMapping?: Record<string, any> | null;
  }
  interface Action extends ActionInfoOneOf {
      /** Action defined by an app (via RPC, HTTP or Velo). */
      appDefinedInfo?: AppDefinedAction;
      /** Condition action. */
      conditionInfo?: ConditionAction;
      /** Delay action. */
      delayInfo?: DelayAction;
      /** Rate-limiting action. */
      rateLimitInfo?: RateLimitAction;
      /**
       * Set-variables action.
       * @internal
       */
      setVariablesInfo?: SetVariablesAction;
      /**
       * Output action.
       * @internal
       */
      outputInfo?: OutputAction;
      /** Action ID. If not specified, a new ID is generated. */
      _id?: string | null;
      /** Action type. */
      type?: Type;
      /**
       * Human-readable name to differentiate the action from other actions of the same type.
       * The name can contain only alphanumeric characters and underscores. If not provided, a namespace in the form `actionkey-indexOfAction` is
       * generated automatically.
       * If the action has output, the output will be available in the payload under this name.
       * If the user has multiple actions with the same appId and actionKey, previous action output will be overwritten.
       */
      namespace?: string | null;
  }
  /** @oneof */
  interface ActionInfoOneOf {
      /** Action defined by an app (via RPC, HTTP or Velo). */
      appDefinedInfo?: AppDefinedAction;
      /** Condition action. */
      conditionInfo?: ConditionAction;
      /** Delay action. */
      delayInfo?: DelayAction;
      /** Rate-limiting action. */
      rateLimitInfo?: RateLimitAction;
      /**
       * Set-variables action.
       * @internal
       */
      setVariablesInfo?: SetVariablesAction;
      /**
       * Output action.
       * @internal
       */
      outputInfo?: OutputAction;
  }
  enum Origin {
      /** Default value. This is unused. */
      UNKNOWN_ORIGIN = "UNKNOWN_ORIGIN",
      /** User created automation. */
      USER = "USER",
      /** Automation created by application (site specific). */
      APPLICATION = "APPLICATION",
      /** Preinstalled application automation. */
      PREINSTALLED = "PREINSTALLED",
      /** Automation created from a recipe. */
      RECIPE = "RECIPE"
  }
  interface ApplicationOrigin {
      /** Application ID. */
      appId?: string;
  }
  interface PreinstalledOrigin {
      /** ID of the app that defines the preinstalled automation. */
      appId?: string;
      /** Application component ID. */
      componentId?: string;
      /** Application component version. */
      componentVersion?: number;
      /**
       * Whether the automation is an override automation. If the user modifies the preinstalled automation installed on their site, a site-specific
       * automation is created that overrides the original one. If the user makes no modifications this boolean is set to `false` and the original
       * preinstalled automation is used.
       *
       * Default: `false`
       * @readonly
       */
      override?: boolean | null;
  }
  interface AutomationSettings {
      /**
       * Whether the automation is hidden from users.
       * Default: `false`
       */
      hidden?: boolean;
      /**
       * Whether the automation is read-only.
       * Default: `false`
       */
      readonly?: boolean;
      /**
       * Whether the option to delete the automation from the site is disabled.
       * Default: `false`
       */
      disableDelete?: boolean;
      /**
       * Whether the option to change the automation status (from active to inactive and vice versa) is disabled.
       * Default: `false`
       */
      disableStatusChange?: boolean;
      /** Automation action settings. */
      actionSettings?: ActionSettings;
      /**
       * Domain
       * @internal
       */
      domain?: Domain;
  }
  interface DraftInfo {
      /**
       * Optional - automationId of the original automation.
       * @readonly
       */
      originalAutomationId?: string | null;
  }
  interface Enrichments {
      /** Whether the studio site enrichment is wanted. */
      studioSite?: Enrichment;
  }
  interface UouDeleteRequest {
      /** Original UouRightToBeDeletedRequest request */
      originalRequest?: Record<string, any> | null;
      /** Found client ids */
      foundClientEntityIdsByNamespace?: ClientEntityIdsByNamespace[];
  }
  interface ClientEntityIdsByNamespace {
      /** Client namespace */
      namespace?: string;
      /** Client entity IDs */
      clientEntityIds?: string[];
  }
  interface GetActivationLogRequest {
      /** Activation log ID */
      activationId: string;
  }
  interface GetActivationLogResponse {
      /** Activation log */
      activationLog?: ActivationLog;
  }
  interface ListActivationLogsRequest {
      /** Automation ID */
      automationId: string;
      /** From created date */
      fromCreatedDate: Date | null;
      /** To created date */
      toCreatedDate?: Date | null;
      /** Paging */
      cursorPaging?: CursorPaging;
      /** Should return payload in the response */
      includePayload?: boolean | null;
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
  interface ListActivationLogsResponse {
      /** List of activation logs */
      activationLogs?: ActivationLog[];
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
  interface SearchActivationLogsByPayloadPiiValueRequest {
      /** Value to search in the payload */
      value: string;
      /** Paging */
      cursorPaging?: CursorPaging;
      /** Should return payload in the response */
      includePayload?: boolean | null;
  }
  interface SearchActivationLogsByPayloadPiiValueResponse {
      /** List of activation logs */
      activationLogs?: ActivationLog[];
      /** Paging metadata */
      pagingMetadata?: CursorPagingMetadata;
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
   * Get activation log by ID
   * @param activationId - Activation log ID
   * @public
   * @documentationMaturity preview
   * @requiredField activationId
   * @permissionId AUTOMATIONS.ACTIVATION_LOG_READ
   * @adminMethod
   * @returns Activation log
   */
  function getActivationLog(activationId: string): Promise<ActivationLog>;
  /**
   * List activation logs
   * @param automationId - Automation ID
   * @public
   * @documentationMaturity preview
   * @requiredField automationId
   * @requiredField options.fromCreatedDate
   * @permissionId AUTOMATIONS.ACTIVATION_LOG_READ
   * @adminMethod
   */
  function listActivationLogs(automationId: string, options?: ListActivationLogsOptions): Promise<ListActivationLogsResponse>;
  interface ListActivationLogsOptions {
      /** From created date */
      fromCreatedDate: Date | null;
      /** To created date */
      toCreatedDate?: Date | null;
      /** Paging */
      cursorPaging?: CursorPaging;
      /** Should return payload in the response */
      includePayload?: boolean | null;
  }
  /**
   * Search activation logs by payload pii value
   * Entire field value match is supported
   * Supported are emails, phones and guids
   * @param value - Value to search in the payload
   * @public
   * @documentationMaturity preview
   * @requiredField value
   * @permissionId AUTOMATIONS.ACTIVATION_LOG_READ
   * @adminMethod
   */
  function searchActivationLogsByPayloadPiiValue(value: string, options?: SearchActivationLogsByPayloadPiiValueOptions): Promise<SearchActivationLogsByPayloadPiiValueResponse>;
  interface SearchActivationLogsByPayloadPiiValueOptions {
      /** Paging */
      cursorPaging?: CursorPaging;
      /** Should return payload in the response */
      includePayload?: boolean | null;
  }
  
  type automationsActivationLogsV1ActivationLog_universal_d_ActivationLog = ActivationLog;
  type automationsActivationLogsV1ActivationLog_universal_d_Target = Target;
  const automationsActivationLogsV1ActivationLog_universal_d_Target: typeof Target;
  type automationsActivationLogsV1ActivationLog_universal_d_CancellationReason = CancellationReason;
  const automationsActivationLogsV1ActivationLog_universal_d_CancellationReason: typeof CancellationReason;
  type automationsActivationLogsV1ActivationLog_universal_d_Identity = Identity;
  type automationsActivationLogsV1ActivationLog_universal_d_Status = Status;
  const automationsActivationLogsV1ActivationLog_universal_d_Status: typeof Status;
  type automationsActivationLogsV1ActivationLog_universal_d_InitiatedStatusInfo = InitiatedStatusInfo;
  type automationsActivationLogsV1ActivationLog_universal_d_ScheduledStatusInfo = ScheduledStatusInfo;
  type automationsActivationLogsV1ActivationLog_universal_d_StartedStatusInfo = StartedStatusInfo;
  type automationsActivationLogsV1ActivationLog_universal_d_EndedStatusInfo = EndedStatusInfo;
  type automationsActivationLogsV1ActivationLog_universal_d_CancelledStatusInfo = CancelledStatusInfo;
  type automationsActivationLogsV1ActivationLog_universal_d_FailedStatusInfo = FailedStatusInfo;
  type automationsActivationLogsV1ActivationLog_universal_d_DomainEvent = DomainEvent;
  type automationsActivationLogsV1ActivationLog_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type automationsActivationLogsV1ActivationLog_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type automationsActivationLogsV1ActivationLog_universal_d_RestoreInfo = RestoreInfo;
  type automationsActivationLogsV1ActivationLog_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type automationsActivationLogsV1ActivationLog_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type automationsActivationLogsV1ActivationLog_universal_d_ActionEvent = ActionEvent;
  type automationsActivationLogsV1ActivationLog_universal_d_Empty = Empty;
  type automationsActivationLogsV1ActivationLog_universal_d_ActivationContinuedAfterSchedule = ActivationContinuedAfterSchedule;
  type automationsActivationLogsV1ActivationLog_universal_d_Automation = Automation;
  type automationsActivationLogsV1ActivationLog_universal_d_AutomationOriginInfoOneOf = AutomationOriginInfoOneOf;
  type automationsActivationLogsV1ActivationLog_universal_d_ActionSettings = ActionSettings;
  type automationsActivationLogsV1ActivationLog_universal_d_Domain = Domain;
  const automationsActivationLogsV1ActivationLog_universal_d_Domain: typeof Domain;
  type automationsActivationLogsV1ActivationLog_universal_d_Enrichment = Enrichment;
  type automationsActivationLogsV1ActivationLog_universal_d_AuditInfo = AuditInfo;
  type automationsActivationLogsV1ActivationLog_universal_d_AuditInfoIdOneOf = AuditInfoIdOneOf;
  type automationsActivationLogsV1ActivationLog_universal_d_AutomationConfiguration = AutomationConfiguration;
  type automationsActivationLogsV1ActivationLog_universal_d_TimeUnit = TimeUnit;
  const automationsActivationLogsV1ActivationLog_universal_d_TimeUnit: typeof TimeUnit;
  type automationsActivationLogsV1ActivationLog_universal_d_Filter = Filter;
  type automationsActivationLogsV1ActivationLog_universal_d_FutureDateActivationOffset = FutureDateActivationOffset;
  type automationsActivationLogsV1ActivationLog_universal_d_RateLimit = RateLimit;
  type automationsActivationLogsV1ActivationLog_universal_d_ConditionExpressionGroup = ConditionExpressionGroup;
  type automationsActivationLogsV1ActivationLog_universal_d_Operator = Operator;
  const automationsActivationLogsV1ActivationLog_universal_d_Operator: typeof Operator;
  type automationsActivationLogsV1ActivationLog_universal_d_Type = Type;
  const automationsActivationLogsV1ActivationLog_universal_d_Type: typeof Type;
  type automationsActivationLogsV1ActivationLog_universal_d_AppDefinedAction = AppDefinedAction;
  type automationsActivationLogsV1ActivationLog_universal_d_ConditionAction = ConditionAction;
  type automationsActivationLogsV1ActivationLog_universal_d_DelayAction = DelayAction;
  type automationsActivationLogsV1ActivationLog_universal_d_RateLimitAction = RateLimitAction;
  type automationsActivationLogsV1ActivationLog_universal_d_SetVariablesAction = SetVariablesAction;
  type automationsActivationLogsV1ActivationLog_universal_d_OutputAction = OutputAction;
  type automationsActivationLogsV1ActivationLog_universal_d_AutomationConfigurationStatus = AutomationConfigurationStatus;
  const automationsActivationLogsV1ActivationLog_universal_d_AutomationConfigurationStatus: typeof AutomationConfigurationStatus;
  type automationsActivationLogsV1ActivationLog_universal_d_Trigger = Trigger;
  type automationsActivationLogsV1ActivationLog_universal_d_Action = Action;
  type automationsActivationLogsV1ActivationLog_universal_d_ActionInfoOneOf = ActionInfoOneOf;
  type automationsActivationLogsV1ActivationLog_universal_d_Origin = Origin;
  const automationsActivationLogsV1ActivationLog_universal_d_Origin: typeof Origin;
  type automationsActivationLogsV1ActivationLog_universal_d_ApplicationOrigin = ApplicationOrigin;
  type automationsActivationLogsV1ActivationLog_universal_d_PreinstalledOrigin = PreinstalledOrigin;
  type automationsActivationLogsV1ActivationLog_universal_d_AutomationSettings = AutomationSettings;
  type automationsActivationLogsV1ActivationLog_universal_d_DraftInfo = DraftInfo;
  type automationsActivationLogsV1ActivationLog_universal_d_Enrichments = Enrichments;
  type automationsActivationLogsV1ActivationLog_universal_d_UouDeleteRequest = UouDeleteRequest;
  type automationsActivationLogsV1ActivationLog_universal_d_ClientEntityIdsByNamespace = ClientEntityIdsByNamespace;
  type automationsActivationLogsV1ActivationLog_universal_d_GetActivationLogRequest = GetActivationLogRequest;
  type automationsActivationLogsV1ActivationLog_universal_d_GetActivationLogResponse = GetActivationLogResponse;
  type automationsActivationLogsV1ActivationLog_universal_d_ListActivationLogsRequest = ListActivationLogsRequest;
  type automationsActivationLogsV1ActivationLog_universal_d_CursorPaging = CursorPaging;
  type automationsActivationLogsV1ActivationLog_universal_d_ListActivationLogsResponse = ListActivationLogsResponse;
  type automationsActivationLogsV1ActivationLog_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type automationsActivationLogsV1ActivationLog_universal_d_Cursors = Cursors;
  type automationsActivationLogsV1ActivationLog_universal_d_SearchActivationLogsByPayloadPiiValueRequest = SearchActivationLogsByPayloadPiiValueRequest;
  type automationsActivationLogsV1ActivationLog_universal_d_SearchActivationLogsByPayloadPiiValueResponse = SearchActivationLogsByPayloadPiiValueResponse;
  type automationsActivationLogsV1ActivationLog_universal_d_MessageEnvelope = MessageEnvelope;
  type automationsActivationLogsV1ActivationLog_universal_d_IdentificationData = IdentificationData;
  type automationsActivationLogsV1ActivationLog_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type automationsActivationLogsV1ActivationLog_universal_d_WebhookIdentityType = WebhookIdentityType;
  const automationsActivationLogsV1ActivationLog_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const automationsActivationLogsV1ActivationLog_universal_d_getActivationLog: typeof getActivationLog;
  const automationsActivationLogsV1ActivationLog_universal_d_listActivationLogs: typeof listActivationLogs;
  type automationsActivationLogsV1ActivationLog_universal_d_ListActivationLogsOptions = ListActivationLogsOptions;
  const automationsActivationLogsV1ActivationLog_universal_d_searchActivationLogsByPayloadPiiValue: typeof searchActivationLogsByPayloadPiiValue;
  type automationsActivationLogsV1ActivationLog_universal_d_SearchActivationLogsByPayloadPiiValueOptions = SearchActivationLogsByPayloadPiiValueOptions;
  namespace automationsActivationLogsV1ActivationLog_universal_d {
    export {
      automationsActivationLogsV1ActivationLog_universal_d_ActivationLog as ActivationLog,
      automationsActivationLogsV1ActivationLog_universal_d_Target as Target,
      automationsActivationLogsV1ActivationLog_universal_d_CancellationReason as CancellationReason,
      automationsActivationLogsV1ActivationLog_universal_d_Identity as Identity,
      automationsActivationLogsV1ActivationLog_universal_d_Status as Status,
      automationsActivationLogsV1ActivationLog_universal_d_InitiatedStatusInfo as InitiatedStatusInfo,
      automationsActivationLogsV1ActivationLog_universal_d_ScheduledStatusInfo as ScheduledStatusInfo,
      automationsActivationLogsV1ActivationLog_universal_d_StartedStatusInfo as StartedStatusInfo,
      automationsActivationLogsV1ActivationLog_universal_d_EndedStatusInfo as EndedStatusInfo,
      automationsActivationLogsV1ActivationLog_universal_d_CancelledStatusInfo as CancelledStatusInfo,
      automationsActivationLogsV1ActivationLog_universal_d_FailedStatusInfo as FailedStatusInfo,
      automationsActivationLogsV1ActivationLog_universal_d_DomainEvent as DomainEvent,
      automationsActivationLogsV1ActivationLog_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      automationsActivationLogsV1ActivationLog_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      automationsActivationLogsV1ActivationLog_universal_d_RestoreInfo as RestoreInfo,
      automationsActivationLogsV1ActivationLog_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      automationsActivationLogsV1ActivationLog_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      automationsActivationLogsV1ActivationLog_universal_d_ActionEvent as ActionEvent,
      automationsActivationLogsV1ActivationLog_universal_d_Empty as Empty,
      automationsActivationLogsV1ActivationLog_universal_d_ActivationContinuedAfterSchedule as ActivationContinuedAfterSchedule,
      automationsActivationLogsV1ActivationLog_universal_d_Automation as Automation,
      automationsActivationLogsV1ActivationLog_universal_d_AutomationOriginInfoOneOf as AutomationOriginInfoOneOf,
      automationsActivationLogsV1ActivationLog_universal_d_ActionSettings as ActionSettings,
      automationsActivationLogsV1ActivationLog_universal_d_Domain as Domain,
      automationsActivationLogsV1ActivationLog_universal_d_Enrichment as Enrichment,
      automationsActivationLogsV1ActivationLog_universal_d_AuditInfo as AuditInfo,
      automationsActivationLogsV1ActivationLog_universal_d_AuditInfoIdOneOf as AuditInfoIdOneOf,
      automationsActivationLogsV1ActivationLog_universal_d_AutomationConfiguration as AutomationConfiguration,
      automationsActivationLogsV1ActivationLog_universal_d_TimeUnit as TimeUnit,
      automationsActivationLogsV1ActivationLog_universal_d_Filter as Filter,
      automationsActivationLogsV1ActivationLog_universal_d_FutureDateActivationOffset as FutureDateActivationOffset,
      automationsActivationLogsV1ActivationLog_universal_d_RateLimit as RateLimit,
      automationsActivationLogsV1ActivationLog_universal_d_ConditionExpressionGroup as ConditionExpressionGroup,
      automationsActivationLogsV1ActivationLog_universal_d_Operator as Operator,
      automationsActivationLogsV1ActivationLog_universal_d_Type as Type,
      automationsActivationLogsV1ActivationLog_universal_d_AppDefinedAction as AppDefinedAction,
      automationsActivationLogsV1ActivationLog_universal_d_ConditionAction as ConditionAction,
      automationsActivationLogsV1ActivationLog_universal_d_DelayAction as DelayAction,
      automationsActivationLogsV1ActivationLog_universal_d_RateLimitAction as RateLimitAction,
      automationsActivationLogsV1ActivationLog_universal_d_SetVariablesAction as SetVariablesAction,
      automationsActivationLogsV1ActivationLog_universal_d_OutputAction as OutputAction,
      automationsActivationLogsV1ActivationLog_universal_d_AutomationConfigurationStatus as AutomationConfigurationStatus,
      automationsActivationLogsV1ActivationLog_universal_d_Trigger as Trigger,
      automationsActivationLogsV1ActivationLog_universal_d_Action as Action,
      automationsActivationLogsV1ActivationLog_universal_d_ActionInfoOneOf as ActionInfoOneOf,
      automationsActivationLogsV1ActivationLog_universal_d_Origin as Origin,
      automationsActivationLogsV1ActivationLog_universal_d_ApplicationOrigin as ApplicationOrigin,
      automationsActivationLogsV1ActivationLog_universal_d_PreinstalledOrigin as PreinstalledOrigin,
      automationsActivationLogsV1ActivationLog_universal_d_AutomationSettings as AutomationSettings,
      automationsActivationLogsV1ActivationLog_universal_d_DraftInfo as DraftInfo,
      automationsActivationLogsV1ActivationLog_universal_d_Enrichments as Enrichments,
      automationsActivationLogsV1ActivationLog_universal_d_UouDeleteRequest as UouDeleteRequest,
      automationsActivationLogsV1ActivationLog_universal_d_ClientEntityIdsByNamespace as ClientEntityIdsByNamespace,
      automationsActivationLogsV1ActivationLog_universal_d_GetActivationLogRequest as GetActivationLogRequest,
      automationsActivationLogsV1ActivationLog_universal_d_GetActivationLogResponse as GetActivationLogResponse,
      automationsActivationLogsV1ActivationLog_universal_d_ListActivationLogsRequest as ListActivationLogsRequest,
      automationsActivationLogsV1ActivationLog_universal_d_CursorPaging as CursorPaging,
      automationsActivationLogsV1ActivationLog_universal_d_ListActivationLogsResponse as ListActivationLogsResponse,
      automationsActivationLogsV1ActivationLog_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      automationsActivationLogsV1ActivationLog_universal_d_Cursors as Cursors,
      automationsActivationLogsV1ActivationLog_universal_d_SearchActivationLogsByPayloadPiiValueRequest as SearchActivationLogsByPayloadPiiValueRequest,
      automationsActivationLogsV1ActivationLog_universal_d_SearchActivationLogsByPayloadPiiValueResponse as SearchActivationLogsByPayloadPiiValueResponse,
      automationsActivationLogsV1ActivationLog_universal_d_MessageEnvelope as MessageEnvelope,
      automationsActivationLogsV1ActivationLog_universal_d_IdentificationData as IdentificationData,
      automationsActivationLogsV1ActivationLog_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      automationsActivationLogsV1ActivationLog_universal_d_WebhookIdentityType as WebhookIdentityType,
      automationsActivationLogsV1ActivationLog_universal_d_getActivationLog as getActivationLog,
      automationsActivationLogsV1ActivationLog_universal_d_listActivationLogs as listActivationLogs,
      automationsActivationLogsV1ActivationLog_universal_d_ListActivationLogsOptions as ListActivationLogsOptions,
      automationsActivationLogsV1ActivationLog_universal_d_searchActivationLogsByPayloadPiiValue as searchActivationLogsByPayloadPiiValue,
      automationsActivationLogsV1ActivationLog_universal_d_SearchActivationLogsByPayloadPiiValueOptions as SearchActivationLogsByPayloadPiiValueOptions,
    };
  }
  
  export { automationsActivationLogsV1ActivationLog_universal_d as activationLog };
}
