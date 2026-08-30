declare module "wix-automations.v2" {
  interface Activation {
      /** Activation ID */
      _id?: string;
      /** Activation automation */
      automation?: Automation$1;
  }
  interface Automation$1 extends AutomationOriginInfoOneOf$1 {
      /** Application info */
      applicationInfo?: ApplicationOrigin$1;
      /** Preinstalled info */
      preinstalledInfo?: PreinstalledOrigin$1;
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
      createdBy?: AuditInfo$1;
      /**
       * Date and time the automation was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * The entity that last updated the automation.
       * @readonly
       */
      updatedBy?: AuditInfo$1;
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
      configuration?: AutomationConfiguration$1;
      /** Defines how the automation was added to the site. */
      origin?: Origin$1;
      /** Automation settings. */
      settings?: AutomationSettings$1;
      /**
       * Draft info (optional - only if the automation is a draft)
       * @readonly
       */
      draftInfo?: DraftInfo$1;
      /** Namespace */
      namespace?: string | null;
      /**
       * Enrichments in use
       * @internal
       * @readonly
       */
      enrichments?: Enrichments$1;
      /**
       * Date and time the automation's draft was last updated.
       * @internal
       * @readonly
       */
      draftUpdatedDate?: Date | null;
  }
  /** @oneof */
  interface AutomationOriginInfoOneOf$1 {
      /** Application info */
      applicationInfo?: ApplicationOrigin$1;
      /** Preinstalled info */
      preinstalledInfo?: PreinstalledOrigin$1;
  }
  interface ActionSettings$1 {
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
  enum Domain$1 {
      /** User domain (default). */
      USER = "USER",
      /** Wix domain. */
      WIX = "WIX"
  }
  interface Enrichment$1 {
      /** Enrichment input mappings. */
      inputMappings?: Record<string, any>[] | null;
  }
  interface AuditInfo$1 extends AuditInfoIdOneOf$1 {
      /** User ID. */
      userId?: string;
      /** Application ID. */
      appId?: string;
  }
  /** @oneof */
  interface AuditInfoIdOneOf$1 {
      /** User ID. */
      userId?: string;
      /** Application ID. */
      appId?: string;
  }
  /** Automation runtime configuration */
  interface AutomationConfiguration$1 {
      /** Status of the automation on the site. */
      status?: AutomationConfigurationStatus;
      /** Automation trigger configuration. */
      trigger?: Trigger$1;
      /** List of IDs of root actions. Root actions are the first actions to run after the trigger. The actions in the list run in parallel. */
      rootActionIds?: string[];
      /**
       * Map of all actions that the automation may execute.
       * The key is the action ID, and the value is the action configuration.
       */
      actions?: Record<string, AutomationConfigurationAction>;
  }
  enum TimeUnit$1 {
      UNKNOWN_TIME_UNIT = "UNKNOWN_TIME_UNIT",
      MINUTES = "MINUTES",
      HOURS = "HOURS",
      DAYS = "DAYS",
      WEEKS = "WEEKS",
      MONTHS = "MONTHS"
  }
  interface Filter$1 {
      /** Filter ID. */
      _id?: string;
      /** Field key from the payload schema, for example "formId". */
      fieldKey?: string;
      /** Filter expression that evaluates to a boolean. */
      filterExpression?: string;
  }
  interface FutureDateActivationOffset$1 {
      /**
       * The offset value. The value is always taken as negative, so that the automation runs before the trigger date.
       * To create an offset that causes the automation to run after the trigger date, use a delay action.
       */
      preScheduledEventOffsetExpression?: string;
      /** Time unit for the scheduled event offset. */
      scheduledEventOffsetTimeUnit?: TimeUnit$1;
  }
  interface RateLimit$1 {
      /** Value expressing the maximum number of times the trigger can be activated. */
      maxActivationsExpression?: string;
      /** Duration of the rate limiting window in the selected time unit. If no value is set, the rate limit is permanent. */
      durationExpression?: string | null;
      /** Time unit for the rate limit duration. */
      durationTimeUnit?: TimeUnit$1;
      /** Unique identifier of each activation, by which rate limiter will count activations. */
      uniqueIdentifierExpression?: string | null;
  }
  interface ConditionExpressionGroup$1 {
      /** Expression group operator. */
      operator?: Operator$1;
      /** List of boolean expressions to be evaluated with the given operator. */
      booleanExpressions?: string[];
  }
  enum Operator$1 {
      UNKNOWN_OPERATOR = "UNKNOWN_OPERATOR",
      OR = "OR",
      AND = "AND"
  }
  enum Type$1 {
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
  interface AppDefinedAction$1 {
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
      skipConditionOrExpressionGroups?: ConditionExpressionGroup$1[];
      /** List of IDs of actions to run in parallel once the action completes. */
      postActionIds?: string[];
  }
  interface ConditionAction$1 {
      /** The condition evaluates to `true` if either of the expression groups evaluate to `true`. */
      orExpressionGroups?: ConditionExpressionGroup$1[];
      /** List of IDs of actions to run when the entire condition is evaluated to `true`. */
      truePostActionIds?: string[];
      /** List of IDs of actions to run when the entire condition is evaluated to `false`. */
      falsePostActionIds?: string[];
  }
  interface DelayAction$1 {
      /** Value expressing the amount of time to wait from a specific date or from the time the action is executed. */
      offsetExpression?: string | null;
      /** Time unit for delay offset. */
      offsetTimeUnit?: TimeUnit$1;
      /**
       * The action due date. If defined without an offset, the automation will wait until this date to execute the next step.
       * If an offset is defined, it's calculated from this date.
       * The date is expressed in the number of milliseconds since the Unix Epoch (1 January, 1970 UTC).
       */
      dueDateEpochExpression?: string | null;
      /** List of IDs of actions to run in parallel after the delay. */
      postActionIds?: string[];
  }
  interface RateLimitAction$1 {
      /** The maximum number of activations allowed for the action. */
      maxActivationsExpression?: string;
      /**
       * Duration of the rate limiting window, expressed in selected time unit.
       * If no value is set, then there is no time limit on the rate limiter.
       */
      rateLimitDurationExpression?: string | null;
      /** Time unit for the rate limit duration. */
      rateLimitDurationTimeUnit?: TimeUnit$1;
      /** Unique identifier of each activation by which rate limiter counts activations. */
      uniqueIdentifierExpression?: string | null;
      /** List of IDs of actions to run in parallel once the action completes. */
      postActionIds?: string[];
  }
  interface SetVariablesAction$1 {
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
  interface OutputAction$1 {
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
  interface Trigger$1 {
      /** ID of the app that defines the trigger. */
      appId?: string;
      /** Trigger key. */
      triggerKey?: string;
      /**
       * List of filters on schema fields.
       * In order for the automation to run, all filter expressions must evaluate to `true` for a given payload.
       */
      filters?: Filter$1[];
      /** Defines the time offset between the trigger date and when the automation runs. */
      scheduledEventOffset?: FutureDateActivationOffset$1;
      /** Limits the number of times an automation can be triggered. */
      rateLimit?: RateLimit$1;
      /**
       * An optional configuration, per automation, of a schema that is optionally offered by the trigger provider to affect the behavior of the trigger.
       * For example, a trigger provider may offer a schema that allows the user to configure the trigger to happen at a certain time of day,
       * He would define a schema with a field called "startDate" and using this parameter the user can define his preferred startDate, per automation.
       */
      automationConfigMapping?: Record<string, any> | null;
  }
  interface AutomationConfigurationAction extends AutomationConfigurationActionInfoOneOf {
      /** Action defined by an app (via RPC, HTTP or Velo). */
      appDefinedInfo?: AppDefinedAction$1;
      /** Condition action. */
      conditionInfo?: ConditionAction$1;
      /** Delay action. */
      delayInfo?: DelayAction$1;
      /** Rate-limiting action. */
      rateLimitInfo?: RateLimitAction$1;
      /**
       * Set-variables action.
       * @internal
       */
      setVariablesInfo?: SetVariablesAction$1;
      /**
       * Output action.
       * @internal
       */
      outputInfo?: OutputAction$1;
      /** Action ID. If not specified, a new ID is generated. */
      _id?: string | null;
      /** Action type. */
      type?: Type$1;
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
  interface AutomationConfigurationActionInfoOneOf {
      /** Action defined by an app (via RPC, HTTP or Velo). */
      appDefinedInfo?: AppDefinedAction$1;
      /** Condition action. */
      conditionInfo?: ConditionAction$1;
      /** Delay action. */
      delayInfo?: DelayAction$1;
      /** Rate-limiting action. */
      rateLimitInfo?: RateLimitAction$1;
      /**
       * Set-variables action.
       * @internal
       */
      setVariablesInfo?: SetVariablesAction$1;
      /**
       * Output action.
       * @internal
       */
      outputInfo?: OutputAction$1;
  }
  enum Origin$1 {
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
  interface ApplicationOrigin$1 {
      /** Application ID. */
      appId?: string;
  }
  interface PreinstalledOrigin$1 {
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
  interface AutomationSettings$1 {
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
      actionSettings?: ActionSettings$1;
      /**
       * Domain
       * @internal
       */
      domain?: Domain$1;
  }
  interface DraftInfo$1 {
      /**
       * Optional - automationId of the original automation.
       * @readonly
       */
      originalAutomationId?: string | null;
  }
  interface Enrichments$1 {
      /** Whether the studio site enrichment is wanted. */
      studioSite?: Enrichment$1;
  }
  interface ActivationStatus {
      /** Activation's ID. */
      _id?: string;
      /** Configuration's ID. */
      configurationId?: string;
      /** Configuration's Correlation ID. */
      configurationCorrelationId?: string;
      /** Activation's status. */
      status?: Status$1;
      /** Activation's error reason (if there is one). */
      errorReason?: string | null;
  }
  enum Status$1 {
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
  interface ActivationStatusChanged extends ActivationStatusChangedStatusInfoOneOf {
      /** Initiated status information */
      initiatedInfo?: InitiatedStatusInfo;
      /** Started status information */
      startedInfo?: ActivationStatusChangedStartedStatusInfo;
      /** Scheduled status information */
      scheduledInfo?: ScheduledStatusInfo;
      /** Cancelled status information */
      cancelledInfo?: CancelledStatusInfo;
      /** Failed status information */
      failedInfo?: ActivationStatusChangedFailedStatusInfo;
      /** Activation */
      activation?: Activation;
      /** Activation status */
      status?: ActivationStatusChangedStatus;
      /** Change event created date */
      statusChangedDate?: Date | null;
  }
  /** @oneof */
  interface ActivationStatusChangedStatusInfoOneOf {
      /** Initiated status information */
      initiatedInfo?: InitiatedStatusInfo;
      /** Started status information */
      startedInfo?: ActivationStatusChangedStartedStatusInfo;
      /** Scheduled status information */
      scheduledInfo?: ScheduledStatusInfo;
      /** Cancelled status information */
      cancelledInfo?: CancelledStatusInfo;
      /** Failed status information */
      failedInfo?: ActivationStatusChangedFailedStatusInfo;
  }
  enum Target {
      UNKNOWN_TARGET = "UNKNOWN_TARGET",
      SCHEDULE = "SCHEDULE",
      IMMEDIATE = "IMMEDIATE"
  }
  enum CancellationReason {
      UNKNOWN_CANCELLATION_REASON = "UNKNOWN_CANCELLATION_REASON",
      /** Indicates that the activation was cancelled directly. */
      EVENT_CANCELLED = "EVENT_CANCELLED",
      /** Indicates that the activation was cancelled because the automation was deactivated. */
      AUTOMATION_DEACTIVATED = "AUTOMATION_DEACTIVATED",
      /** Indicates that the activation was cancelled because the automation was deleted. */
      AUTOMATION_DELETED = "AUTOMATION_DELETED",
      /** Indicates that the activation was cancelled after the automation schedule time was reached. */
      CANCELLED_BY_REFRESH_PAYLOAD = "CANCELLED_BY_REFRESH_PAYLOAD"
  }
  interface Identity {
      /** User ID */
      userId?: string | null;
      /** App ID */
      appId?: string | null;
  }
  enum ActivationStatusChangedStatus {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      /** Indicates that activation has not started yet and no actions have been executed. */
      INITIATED = "INITIATED",
      /** Activation is in scheduled status when the automation has a future date or debounce defined and we're in the waiting stage and no actions have been executed. */
      SCHEDULED = "SCHEDULED",
      /** Indicates the automation activation has started and is currently in progress. */
      STARTED = "STARTED",
      /** Indicates all the automation actions were handled either by invoking them, skipping them, etc. */
      ENDED = "ENDED",
      /** Indicates the activation was cancelled. */
      CANCELLED = "CANCELLED",
      /**
       * Indicates the activation failed to start.
       * Note that failure in the activation of a single action will not result in a failure in activation of the entire automation.
       */
      FAILED = "FAILED"
  }
  interface InitiatedStatusInfo {
      /** Activation target */
      target?: Target;
      /** Event payload */
      payload?: Record<string, any> | null;
      /** External entity ID */
      externalEntityId?: string | null;
      /** Unique identifier for the request that initiated the automation */
      requestId?: string;
  }
  interface ActivationStatusChangedStartedStatusInfo {
      /** Enriched and refreshed payload */
      payload?: Record<string, any> | null;
  }
  interface ScheduledStatusInfo {
      /** Schedule identifier */
      scheduleId?: string;
      /** Indicates when the activation should start */
      date?: Date | null;
  }
  interface CancelledStatusInfo {
      /** Cancellation reason */
      reason?: CancellationReason;
      /** Identity (such as user, app, etc.) that caused the cancellation. */
      initiator?: Identity;
  }
  interface ActivationStatusChangedFailedStatusInfo {
      /**
       * Error description
       * @readonly
       */
      errorDescription?: string;
      /**
       * Error code
       * @readonly
       */
      errorCode?: string | null;
  }
  interface ScheduleRequest {
      schedule: Schedule;
  }
  interface Schedule {
      /** @readonly */
      _id?: string | null;
      /** doesn't have to be unique. example: triggerName+entityId */
      identifier?: string;
      configurationCorrelationId?: string;
      activationId?: string;
      scheduledAction?: ScheduledAction;
      /** Raw domain event, not enriched */
      eventPayload?: string;
      /** @readonly */
      scheduleStatus?: ScheduleStatus;
      /** @readonly */
      scheduleDate?: Date | null;
      /** @readonly */
      _createdDate?: Date | null;
      /** @readonly */
      _updatedDate?: Date | null;
      overrideable?: boolean | null;
      triggerInfo?: TriggerInfo;
      automation?: Automation$1;
  }
  interface ScheduledAction {
      /** Action's id. */
      _id?: string;
      /** decide how long we should wait */
      delay?: Delay;
  }
  interface Delay extends DelayOfOneOf {
      simple?: SimpleDelay;
      /**
       * jsonata expression - sleep until the given date
       * for example: $toMillis(MyObject.Date) + 2*1000*60*60*24) -> will schedule 2 days after MyObject.Date
       */
      dateExpression?: string;
  }
  /** @oneof */
  interface DelayOfOneOf {
      simple?: SimpleDelay;
      /**
       * jsonata expression - sleep until the given date
       * for example: $toMillis(MyObject.Date) + 2*1000*60*60*24) -> will schedule 2 days after MyObject.Date
       */
      dateExpression?: string;
  }
  interface SimpleDelay {
      value?: number;
      units?: Units;
      /** Optional, used if provided: Jsonata expression that evaluates to a number of milliseconds to wait */
      delayExpression?: string | null;
  }
  enum Units {
      UNKNOWN = "UNKNOWN",
      MINUTES = "MINUTES",
      HOURS = "HOURS",
      DAYS = "DAYS"
  }
  enum ScheduleStatus {
      UNKNOWN_SCHEDULE_STATUS = "UNKNOWN_SCHEDULE_STATUS",
      PENDING = "PENDING",
      CANCELLED = "CANCELLED",
      DONE = "DONE"
  }
  interface TriggerInfo {
      /** App id of the initial trigger. */
      appId?: string;
      /** Trigger key of the initial trigger. */
      triggerKey?: string;
  }
  interface ScheduleResponse {
      _id?: string;
  }
  interface CancelPendingScheduleRequest extends CancelPendingScheduleRequestByOneOf {
      _id?: string;
      identifier?: string;
      configurationCorrelationId?: string;
      activationId?: string;
      identifierPattern?: string;
  }
  /** @oneof */
  interface CancelPendingScheduleRequestByOneOf {
      _id?: string;
      identifier?: string;
      configurationCorrelationId?: string;
      activationId?: string;
      identifierPattern?: string;
  }
  interface CancelPendingScheduleResponse {
  }
  interface UpdatePendingSchedulesPayloadRequest {
      identifier?: string;
      eventPayload?: string;
  }
  interface UpdatePendingSchedulesPayloadResponse {
  }
  interface DomainEvent$1 extends DomainEventBodyOneOf$1 {
      createdEvent?: EntityCreatedEvent$1;
      updatedEvent?: EntityUpdatedEvent$1;
      deletedEvent?: EntityDeletedEvent$1;
      actionEvent?: ActionEvent$1;
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
  interface DomainEventBodyOneOf$1 {
      createdEvent?: EntityCreatedEvent$1;
      updatedEvent?: EntityUpdatedEvent$1;
      deletedEvent?: EntityDeletedEvent$1;
      actionEvent?: ActionEvent$1;
  }
  interface EntityCreatedEvent$1 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$1;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$1 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$1 {
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
  interface EntityDeletedEvent$1 {
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
  interface ActionEvent$1 {
      bodyAsJson?: string;
  }
  interface MessageEnvelope$1 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$1;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$1 extends IdentificationDataIdOneOf$1 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$1;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$1 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$1 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  interface ActivationRequest {
      /** Activation's ID. */
      activationId?: string;
      /** Configuration's ID. */
      configurationId?: string;
      configurationCorrelationId?: string;
      /** Received event name. */
      eventName?: string;
      /** Received event slug. */
      eventSlug?: string | null;
      /** Received event payload. */
      eventPayload?: string | null;
      /** List of action data. */
      actions?: ActionData[];
      /** External ID. */
      externalId?: string;
      /** The source of this activation */
      source?: ActivationSource;
      /** Actions tree */
      actionsMap?: ActionsData;
      /** Automation V2. Used for reporting domain event until activation request will be deprecated. */
      automation?: Automation$1;
      /** Trigger entity for the activation, available for v2 and v3 automations only */
      triggerSchema?: Record<string, any> | null;
  }
  interface Runtime {
  }
  interface Scheduler {
      scheduleId?: string | null;
  }
  interface AsyncAction {
  }
  interface ActionData {
      /**
       * Action's id.
       * @readonly
       */
      _id?: string | null;
      /** Action's data. */
      action?: Action$1;
  }
  interface Action$1 extends ActionActionOneOf {
      service?: Service;
      systemHelper?: SystemHelper;
      spiAction?: SpiAction;
  }
  /** @oneof */
  interface ActionActionOneOf {
      service?: Service;
      systemHelper?: SystemHelper;
      spiAction?: SpiAction;
  }
  interface ServiceMapping {
      /** Sevice name. */
      name?: string;
      /** Method name. */
      method?: string;
  }
  interface IfFilter {
      /** If filter's condition. */
      condition?: string;
      /** If's true post actions. */
      truePostActions?: ActionData[];
      /** If's false post actions. */
      falsePostActions?: ActionData[];
      /** If's true post actions ids. */
      truePostActionsIds?: string[];
      /** If's false post actions ids. */
      falsePostActionsIds?: string[];
  }
  interface SwitchFilter {
      /** Switch's filter cases. */
      cases?: Case[];
  }
  interface Case {
      /** Case's condition. */
      condition?: any;
      /** Case's post actions. */
      postActions?: ActionData[];
      /** Case's post actions ids. */
      postActionsIds?: string[];
  }
  interface DelayHelper {
      /** jsonata expression, for example: triggerName + eventId */
      scheduleIdentifier?: string;
      /** decide how long we should wait */
      delay?: Delay;
      /** Delay's post actions. */
      postActions?: ActionData[];
      /**
       * Optional: if true, any new schedule with the same schedule identifier will override the existing one.
       * If false, the new schedule will be ignored.
       */
      overrideable?: boolean | null;
      /** Delay's post actions ids. */
      postActionsIds?: string[];
  }
  interface RateLimiting {
      /** The maximum number of activations allowed in the given time frame */
      maxNumOfActivations?: number;
      /** Optional, used if provided: A jsonata expression that evaluates to the maximum number of activations allowed in the given time frame */
      maxNumOfActivationsExpression?: string | null;
      /** If given - the time frame in minutes, otherwise, for life */
      timeFrameInMinutes?: number | null;
      /** Optional, used if provided - A jsonata expression that evaluates to the time frame in minutes, otherwise, for life */
      timeFrameInMinutesExpression?: string | null;
      /** The jsonata to use to extract the entity/resource key from the enriched event payload */
      keyJsonata?: string;
      /** The actions to perform if this rate limiting action succeeded - meaning we are still in the allowed number of activations in the given time frame */
      postActions?: ActionData[];
      /** The ids of actions to perform if this rate limiting action succeeded - meaning we are still in the allowed number of activations in the given time frame */
      postActionsIds?: string[];
  }
  interface ConditionFilter {
      /** condition evaluates to `true` if either of the blocks evaluate to `true` (aka OR between all). */
      conditionBlocks?: ConditionBlock[];
      /** Actions to perform when condition_blocks evaluates to `true`. */
      postActions?: ActionData[];
      /** Action's post actions ids. */
      postActionsIds?: string[];
      /** Actions to perform when condition_blocks evaluates to `false`. */
      elsePostActions?: ActionData[];
  }
  enum BlockType {
      UNKNOWN = "UNKNOWN",
      OR = "OR",
      AND = "AND"
  }
  interface ConditionBlock {
      type?: BlockType;
      lineExpressions?: string[];
  }
  interface Output {
      /** The jsonata to use to produce the output */
      outputMapping?: string;
  }
  interface SetVariables {
      /**
       * Action's output mapping.
       * Jsonata expressions to set variables
       * for example: { "var1": "$average([10,20])", "var2": "$number($lookup($, $decodeUrlComponent(\"var1\"))) >= $number(8)"" }
       */
      outputMapping?: string;
      /** Action's post actions. */
      postActions?: ActionData[];
      /** Action's post actions ids. */
      postActionsIds?: string[];
      /** The namespace of the action */
      namespace?: string | null;
  }
  interface Service {
      /** Action's service mapping. */
      serviceMapping?: ServiceMapping;
      /**
       * Action's input mapping.
       * Jsonata description of the input this service gets.
       */
      inputMapping?: string | null;
      /**
       * Action's output mapping.
       * Jsonata description of the output this service returns.
       */
      outputMapping?: string | null;
      /** Action's post actions. */
      postActions?: ActionData[];
      /** Action's post actions ids. */
      postActionsIds?: string[];
      /** The namespace of the action */
      namespace?: string | null;
  }
  interface SystemHelper extends SystemHelperHelperOneOf {
      ifFilter?: IfFilter;
      switchFilter?: SwitchFilter;
      delay?: DelayHelper;
      rateLimiting?: RateLimiting;
      conditionFilter?: ConditionFilter;
      output?: Output;
      setVariables?: SetVariables;
  }
  /** @oneof */
  interface SystemHelperHelperOneOf {
      ifFilter?: IfFilter;
      switchFilter?: SwitchFilter;
      delay?: DelayHelper;
      rateLimiting?: RateLimiting;
      conditionFilter?: ConditionFilter;
      output?: Output;
      setVariables?: SetVariables;
  }
  interface SpiAction {
      /** The App Def Id of the action provider */
      appDefId?: string;
      /** Identifier for this action - human readable action key - unique per app def id */
      actionKey?: string;
      /** The configuration of the user for this action, can include params that are taken from the trigger event payload */
      userActionConfig?: string | null;
      /** The post action to execute after this action */
      postActions?: ActionData[];
      /** The output configuration of the user for this action, can include params that are taken from the trigger event payload */
      userOutputActionConfig?: string | null;
      /**
       * optional skip condition expression for current action
       * decides whether to skip the action before executing it's post actions
       */
      skipConditionExpression?: string | null;
      /** Action's post actions ids. */
      postActionsIds?: string[];
      /** The namespace of the action */
      namespace?: string | null;
  }
  interface ActivationSource extends ActivationSourceOfOneOf {
      runtime?: Runtime;
      scheduler?: Scheduler;
      asyncAction?: AsyncAction;
  }
  /** @oneof */
  interface ActivationSourceOfOneOf {
      runtime?: Runtime;
      scheduler?: Scheduler;
      asyncAction?: AsyncAction;
  }
  interface ActionsData {
      /** Ids of the first level actions. */
      rootActionIds?: string[];
      /** Map of action id to action data. */
      actions?: Record<string, Action$1>;
  }
  interface ActionStatus {
      /** Action's status. */
      _id?: string;
      /** Activation's ID. */
      activationId?: string;
      /** Action's name. */
      actionName?: string | null;
      /** Action's status. */
      status?: Status$1;
      /** Action's error reason (if there is one). */
      errorReason?: string | null;
      /** Activation external id. */
      activationExternalId?: string;
      /** Trigger app id. */
      triggerAppId?: string | null;
      /** Trigger key. */
      triggerKey?: string | null;
      /** The configuration correlation id */
      configurationCorrelationId?: string | null;
  }
  interface BatchActivationRequest {
      /** List of Activation-Request. */
      activationRequests?: ActivationRequest[];
      /**
       * Time of the Batch-Activation-Request creation: used for crm monitoring migration only
       * @internal
       */
      creationDate?: Date | null;
  }
  interface Empty$1 {
  }
  interface ActivationActionStatusChanged extends ActivationActionStatusChangedInfoOneOf, ActivationActionStatusChangedStatusInfoOneOf {
      /** App defined action info */
      appDefinedInfo?: ActivationActionStatusChangedAppDefinedActionInfo;
      /** Started status information */
      startedInfo?: StartedStatusInfo;
      /** Ended status information */
      endedInfo?: EndedStatusInfo;
      /** Failed status information */
      failedInfo?: FailedStatusInfo;
      /** Action ID */
      _id?: string;
      /** Activation ID */
      activationId?: string;
      /** Automation info */
      automationInfo?: AutomationInfo;
      /** Action type */
      type?: Type$1;
      /** External entity ID */
      externalEntityId?: string | null;
      /** Event date */
      statusChangedDate?: Date | null;
      /** Action activation status */
      status?: ActivationActionStatusChangedStatus;
  }
  /** @oneof */
  interface ActivationActionStatusChangedInfoOneOf {
      /** App defined action info */
      appDefinedInfo?: ActivationActionStatusChangedAppDefinedActionInfo;
  }
  /** @oneof */
  interface ActivationActionStatusChangedStatusInfoOneOf {
      /** Started status information */
      startedInfo?: StartedStatusInfo;
      /** Ended status information */
      endedInfo?: EndedStatusInfo;
      /** Failed status information */
      failedInfo?: FailedStatusInfo;
  }
  interface StartedStatusInfoAppDefinedActionInfo {
      /** Action input */
      input?: Record<string, any> | null;
  }
  interface DelayActionInfo {
      /** Indicates when this action becomes completed and the activation will move to the post actions */
      date?: Date | null;
  }
  interface ExpressionEvaluationResult {
      /** Indicates if the expression was evaluated to true or false */
      passed?: boolean;
      /** Indicates if there was an error in the evaluation process */
      error?: boolean;
  }
  interface AppDefinedActionInfo {
      /** Output returned by the action implementer. */
      output?: Record<string, any> | null;
  }
  interface ConditionActionInfo {
      /** Indicates that the condition `if` clause evaluated to `true`. */
      passed?: boolean;
      /** Collects results per each expression evaluation that took place */
      expressionResults?: Record<string, ExpressionEvaluationResult>;
  }
  interface RateLimitActionInfo {
      /** Indicates if the rate limiter passed (not reached the quota) */
      passed?: boolean;
  }
  interface EndedStatusInfoDelayActionInfo {
      /** Enriched and refreshed payload */
      payload?: Record<string, any> | null;
  }
  interface SetVariablesActionInfo {
      /** Output returned after jsonata expression evaluation */
      output?: Record<string, any> | null;
  }
  interface AutomationInfo extends AutomationInfoOriginInfoOneOf {
      /** Application info */
      applicationInfo?: ApplicationOrigin$1;
      /** Preinstalled info */
      preinstalledInfo?: PreinstalledOrigin$1;
      /** Automation ID */
      _id?: string;
      /** Origin type */
      origin?: Origin$1;
      /** Trigger info */
      triggerInfo?: AutomationInfoTriggerInfo;
  }
  /** @oneof */
  interface AutomationInfoOriginInfoOneOf {
      /** Application info */
      applicationInfo?: ApplicationOrigin$1;
      /** Preinstalled info */
      preinstalledInfo?: PreinstalledOrigin$1;
  }
  interface AutomationInfoTriggerInfo {
      /** Trigger app ID */
      appId?: string;
      /** Trigger key */
      triggerKey?: string;
  }
  interface ActivationActionStatusChangedAppDefinedActionInfo {
      /** Action app ID */
      appId?: string;
      /** Action key */
      actionKey?: string;
  }
  enum ActivationActionStatusChangedStatus {
      UNKNOWN_ACTION_ACTIVATION_STATUS = "UNKNOWN_ACTION_ACTIVATION_STATUS",
      /**
       * Indicates that action activation has started and is in progress.
       * Relevant to action types: APP_DEFINED, DELAY.
       */
      STARTED = "STARTED",
      /**
       * Indicates that the action activation was completed without errors.
       * Relevant to action types: APP_DEFINED, DELAY, CONDITION, RATE_LIMIT.
       */
      ENDED = "ENDED",
      /**
       * Indicates that the action was skipped and post actions won't start.
       * Relevant to action types: APP_DEFINED.
       */
      SKIPPED = "SKIPPED",
      /**
       * Indicates that the action failed.
       * Relevant to action types: APP_DEFINED, DELAY, RATE_LIMIT.
       */
      FAILED = "FAILED"
  }
  interface StartedStatusInfo extends StartedStatusInfoTypeInfoOneOf {
      /** APP DEFINED action additional info */
      appDefinedActionInfo?: StartedStatusInfoAppDefinedActionInfo;
      /** Delay action additional info */
      delayActionInfo?: DelayActionInfo;
  }
  /** @oneof */
  interface StartedStatusInfoTypeInfoOneOf {
      /** APP DEFINED action additional info */
      appDefinedActionInfo?: StartedStatusInfoAppDefinedActionInfo;
      /** Delay action additional info */
      delayActionInfo?: DelayActionInfo;
  }
  interface EndedStatusInfo extends EndedStatusInfoTypeInfoOneOf {
      /** APP DEFINED action additional info */
      appDefinedActionInfo?: AppDefinedActionInfo;
      /** Condition action additional info */
      conditionActionInfo?: ConditionActionInfo;
      /** Rate limit action additional info */
      rateLimitActionInfo?: RateLimitActionInfo;
      /** Delay action additional info */
      delayActionInfo?: EndedStatusInfoDelayActionInfo;
      /** Set Variables action additional info */
      setVariablesActionInfo?: SetVariablesActionInfo;
  }
  /** @oneof */
  interface EndedStatusInfoTypeInfoOneOf {
      /** APP DEFINED action additional info */
      appDefinedActionInfo?: AppDefinedActionInfo;
      /** Condition action additional info */
      conditionActionInfo?: ConditionActionInfo;
      /** Rate limit action additional info */
      rateLimitActionInfo?: RateLimitActionInfo;
      /** Delay action additional info */
      delayActionInfo?: EndedStatusInfoDelayActionInfo;
      /** Set Variables action additional info */
      setVariablesActionInfo?: SetVariablesActionInfo;
  }
  interface FailedStatusInfo {
      /** Error description */
      errorDescription?: string;
      /** Error code */
      errorCode?: string | null;
  }
  interface ActivationResumeAfterDelay {
      /** Activation identifier */
      _id?: string;
      /** Activation schedule identifier */
      scheduleId?: string;
      /** Activation schedule due date */
      scheduleDate?: Date | null;
      /** Activation payload */
      payload?: Record<string, any> | null;
      /** Activation Automation */
      automation?: Automation$1;
      /** Scheduled action identifier - with the intent to execute that action's post actions */
      scheduledActionId?: string;
      /** Optional - external entity id that this activation is related to */
      externalEntityId?: string | null;
  }
  interface ActionCompletedRequest {
      /** The execution identifier that was given to the spi provider when we invoked the action */
      executionIdentifier: string;
      /** The result of invoking the action. Must conform to the output schema configured by the action provider. */
      result?: Record<string, any> | null;
  }
  interface RefreshPayloadRequest {
      /** Application definition ID. */
      appDefId?: string;
      /** Trigger key. */
      triggerKey?: string;
      /** Payload to refresh. */
      payload?: Record<string, any> | null;
      /** External entity ID. */
      externalEntityId?: string | null;
  }
  interface RefreshPayloadResponse {
      /** Updated payload. */
      payload?: Record<string, any> | null;
      /** If the automation activation should be canceled (default is false) */
      cancelActivation?: boolean | null;
  }
  interface RunAutomationRequest {
      /** App of the automation trigger */
      appId?: string;
      /** Trigger key of the action */
      triggerKey?: string;
      /** Payload of the triggered event */
      triggerPayload?: Record<string, any> | null;
      /** Specific automation id to run */
      automationId?: string;
      /** Schema of the trigger */
      triggerSchema?: Record<string, any> | null;
  }
  interface RunAutomationResponse {
      /** Automation activation output payload */
      output?: Record<string, any> | null;
  }
  interface ActivationScheduleRequested {
      /** Activation identifier */
      _id?: string;
      /** Activation schedule request date */
      requestedDate?: Date | null;
      /** Activation schedule due date */
      scheduleDate?: Date | null;
      /** Activation payload */
      payload?: Record<string, any> | null;
      /** Activation Automation */
      automation?: Automation$1;
      /** Optional - external entity id that this activation is related to */
      externalEntityId?: string | null;
  }
  interface ScheduleActivationRequested {
      /** Activation identifier */
      _id?: string;
      /** Optional - external entity id that this activation is related to */
      externalEntityId?: string | null;
      /** Activation payload */
      payload?: Record<string, any> | null;
      /** Activation Automation */
      automation?: Automation$1;
      /** Activation schedule date */
      scheduleDate?: Date | null;
  }
  interface ActivationContinuedAfterSchedule {
      /** Activation identifier */
      _id?: string;
      /** Activation Automation */
      automation?: Automation$1;
  }
  interface ReportEventRequest {
      /**
       * Trigger key as defined in your app's trigger configuration
       * in the app dashboard.
       * For example, `form_submitted` or `invoice_due`.
       */
      triggerKey: string;
      /**
       * Event payload, formatted as key:value pairs.
       * Must comply with the payload schema
       * if you provided one when configuring your trigger.
       *
       * Key names can include only alphanumeric characters or underscores
       * (`A-Z`, `a-z`, `0-9`, `_`).
       * They cannot start with an underscore.
       *
       * Values can be strings, numbers, integers, booleans, or arrays.
       * If a value is an array, the array items must be objects,
       * and nested object properties must be
       * strings, numbers, integers, or booleans only.
       */
      payload?: Record<string, any> | null;
      /**
       * ID of the related resource in GUID format.
       * For example, `fc81a355-3429-50fc-a4c7-def486e828f3`.
       *
       * Required if your app needs to
       * [cancel the event](https://dev.wix.com/docs/sdk/backend-modules/automations/triggered-events/cancel-event)
       * if the automation becomes no longer relevant.
       *
       * Typically, this ID is defined in your system,
       * but you can also use any Wix resource GUID,
       * such as contact ID, member ID, or invoice ID.
       * See
       * [Choose the right `externalEntityId`](https://dev.wix.com/docs/rest/business-management/automations/triggered-events/reporting-and-canceling-events#about-canceling-events)
       * for more information.
       */
      externalEntityId?: string | null;
      /** Idempotency information for the event */
      idempotency?: Idempotency;
  }
  interface Idempotency {
      /**
       * A unique identifier for the event.
       * If you send the same idempotency key in multiple report event requests, for the same trigger key and app id,
       * consecutive requests will be ignored after the first one. Note that the idempotency key is kept for a week before it expires.
       */
      key?: string;
      /** Optional. The time to live (TTL) in milliseconds before the key will expire. Default is a week. */
      ttlInMilliseconds?: string | null;
  }
  interface ReportEventResponse {
      /** The activation IDs of triggered ReportEvents. */
      activationIds?: string[];
  }
  interface BulkReportEventRequest {
      /**
       * Trigger key as defined in your app's trigger configuration
       * in the app dashboard.
       * For example, `form_submitted` or `invoice_due`.
       */
      triggerKey: string;
      /** Repeated list of event details for bulk reporting */
      eventsInfo: EventInfo[];
  }
  interface EventInfo {
      /**
       * Event payload, formatted as key:value pairs.
       * Must comply with the payload schema
       * if you provided one when configuring your trigger.
       */
      payload?: Record<string, any> | null;
      /** ID of the related resource in GUID format. */
      externalEntityId?: string | null;
      /** Idempotency information for the event */
      idempotency?: Idempotency;
  }
  interface BulkReportEventResponse {
      /** Trigger key associated with the event */
      triggerKey?: string;
      /** List of results for each item in the bulk report event request */
      results?: BulkReportEventResult[];
      /** Metadata for the overall bulk action, including success and failure counts */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  interface BulkReportEventResult {
      /** Metadata for the individual item in the request */
      itemMetadata?: ItemMetadata$1;
      /** Event details for the item in the request */
      eventInfo?: EventInfo;
      /** The activation IDs of triggered ReportEvents. */
      activationIds?: string[];
  }
  interface ItemMetadata$1 {
      /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError$1;
  }
  interface ApplicationError$1 {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  interface BulkActionMetadata$1 {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface BulkCancelEventRequest {
      /**
       * Trigger key whose events you want to cancel.
       * For example, `form_submitted` or `invoice_due`.
       */
      triggerKey: string;
      /** Repeated list of external_entity_id, representing the related resources' IDs */
      externalEntityIds: string[];
  }
  interface BulkCancelEventResponse {
      /** Trigger key related to the cancelled event */
      triggerKey?: string;
      /** List of results for each item in the bulk cancel event request */
      results?: BulkCancelEventResult[];
      /** Metadata for the overall bulk action, including success and failure counts */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  interface BulkCancelEventResult {
      /** Metadata of the item, including its ID and success or failure status */
      itemMetadata?: ItemMetadata$1;
      /** ID of the related resource in GUID format */
      externalEntityId?: string;
  }
  interface CancelEventRequest {
      /**
       * ID of the related resource in GUID format.
       * For example, `fc81a355-3429-50fc-a4c7-def486e828f3`.
       *
       * Typically, this ID is defined in your system,
       * but you can also use any Wix resource GUID,
       * such as contact ID, member ID, or invoice ID.
       * See
       * [Choose the right `externalEntityId`](https://dev.wix.com/docs/rest/business-management/automations/triggered-events/reporting-and-canceling-events#choose-the-right-externalentityid)
       * for more information.
       */
      externalEntityId: string;
      /**
       * Trigger key whose event you want to cancel.
       * For example, `form_submitted` or `invoice_due`.
       */
      triggerKey: string;
  }
  interface CancelEventResponse {
  }
  interface V1RunAutomationRequest extends V1RunAutomationRequestIdentifierOneOf {
      /** a preinstalled automation identifier */
      preinstalledIdentifier?: PreinstalledIdentifier;
      /** a automation of any type identifier that will be available in future */
      automationIdentifier?: AutomationIdentifier;
      /** identifier MUST be either AUTOMATION or PREINSTALLED */
      identifierType: IdentifierType;
      /**
       * Event payload, formatted as key:value pairs.
       * Must comply with the payload schema
       * if you provided one when configuring your trigger.
       *
       * Key names can include only alphanumeric characters or underscores
       * (`A-Z`, `a-z`, `0-9`, `_`).
       * They cannot start with an underscore.
       *
       * Values can be strings, numbers, integers, booleans, or arrays.
       * If a value is an array, the array items must be objects,
       * and nested object properties must be
       * strings, numbers, integers, or booleans only.
       */
      payload: Record<string, any> | null;
  }
  /** @oneof */
  interface V1RunAutomationRequestIdentifierOneOf {
      /** a preinstalled automation identifier */
      preinstalledIdentifier?: PreinstalledIdentifier;
      /** a automation of any type identifier that will be available in future */
      automationIdentifier?: AutomationIdentifier;
  }
  enum IdentifierType {
      UNKNOWN_IDENTIFIER = "UNKNOWN_IDENTIFIER",
      PREINSTALLED = "PREINSTALLED",
      AUTOMATION = "AUTOMATION"
  }
  interface PreinstalledIdentifier {
      /** identifier for the application of the preinstalled */
      appId?: string;
      /** application component id */
      componentId?: string;
  }
  interface AutomationIdentifier {
      /** automation id */
      automationId?: string;
  }
  interface V1RunAutomationResponse {
  }
  interface ReportDomainEventRequest {
      /** trigger app id */
      triggerAppId: string;
      /** report event request */
      reportEventRequest: ReportEventRequest;
  }
  interface ReportDomainEventResponse {
  }
  interface ExecuteFromActionRequest {
      /** Requested action id */
      actionId?: string;
      /** Optional: an activation id to link this action to */
      activationId?: string | null;
      /** Activation payload */
      payload?: Record<string, any> | null;
      /** Configuration correlation id to run this action from */
      configurationCorrelationId?: string;
      /** Optional - schedule id that this action was scheduled from */
      scheduleId?: string | null;
      /** Optional - an external entity id that this execution is related to */
      externalEntityId?: string | null;
      /** Optional - Activation automation */
      automation?: Automation$1;
  }
  interface ExecuteFromActionResponse {
  }
  interface ActivationScheduleCompleted {
      /** Activation identifier */
      _id?: string;
      /** Activation schedule identifier */
      scheduleId?: string;
      /** Activation schedule due date */
      scheduleDate?: Date | null;
      /** Activation payload */
      payload?: Record<string, any> | null;
      /** Activation Automation */
      automation?: Automation$1;
      /** Optional - external entity id that this activation is related to */
      externalEntityId?: string | null;
  }
  /** @internal
   * @documentationMaturity preview
   * @requiredField schedule
   * @requiredField schedule.scheduledAction
   * @permissionId ESB.SCHEDULER_MANAGE
   * @adminMethod
   */
  function schedule(schedule: Schedule): Promise<ScheduleResponse>;
  /** @internal
   * @documentationMaturity preview
   * @permissionId ESB.SCHEDULER_MANAGE
   * @adminMethod
   */
  function cancelPendingSchedule(options?: CancelPendingScheduleOptions): Promise<void>;
  interface CancelPendingScheduleOptions extends CancelPendingScheduleRequestByOneOf {
      _id?: string;
      identifier?: string;
      configurationCorrelationId?: string;
      activationId?: string;
      identifierPattern?: string;
  }
  /** @internal
   * @documentationMaturity preview
   * @permissionId ESB.SCHEDULER_MANAGE
   * @adminMethod
   */
  function updatePendingSchedulesPayload(options?: UpdatePendingSchedulesPayloadOptions): Promise<void>;
  interface UpdatePendingSchedulesPayloadOptions {
      identifier?: string;
      eventPayload?: string;
  }
  /** @param executionIdentifier - The execution identifier that was given to the spi provider when we invoked the action
   * @internal
   * @documentationMaturity preview
   * @requiredField executionIdentifier
   * @permissionId ESB_RUNTIME.ACTION_COMPLETED
   * @adminMethod
   */
  function actionCompleted(executionIdentifier: string, options?: ActionCompletedOptions): Promise<void>;
  interface ActionCompletedOptions {
      /** The result of invoking the action. Must conform to the output schema configured by the action provider. */
      result?: Record<string, any> | null;
  }
  /**
   * Reports an event and activates site automations with the specified trigger key.
   *
   *
   * Only the app that created a trigger can report events for it.
   * This means other apps can't report events for your triggers,
   * and you can't report events for another app's triggers.
   *
   * If your app supports canceling events,
   * `externalEntityId` must be provided.
   * `externalEntityId` is required when calling [cancelEvent()](#cancel-event).
   * @param triggerKey - Trigger key as defined in your app's trigger configuration
   * in the app dashboard.
   * For example, `form_submitted` or `invoice_due`.
   * @public
   * @documentationMaturity preview
   * @requiredField triggerKey
   * @permissionId AUTOMATIONS.REPORT_EVENT
   * @adminMethod
   */
  function reportEvent(triggerKey: string, options?: ReportEventOptions): Promise<ReportEventResponse>;
  interface ReportEventOptions {
      /**
       * Event payload, formatted as key:value pairs.
       * Must comply with the payload schema
       * if you provided one when configuring your trigger.
       *
       * Key names can include only alphanumeric characters or underscores
       * (`A-Z`, `a-z`, `0-9`, `_`).
       * They cannot start with an underscore.
       *
       * Values can be strings, numbers, integers, booleans, or arrays.
       * If a value is an array, the array items must be objects,
       * and nested object properties must be
       * strings, numbers, integers, or booleans only.
       */
      payload?: Record<string, any> | null;
      /**
       * ID of the related resource in GUID format.
       * For example, `fc81a355-3429-50fc-a4c7-def486e828f3`.
       *
       * Required if your app needs to
       * [cancel the event](https://dev.wix.com/docs/sdk/backend-modules/automations/triggered-events/cancel-event)
       * if the automation becomes no longer relevant.
       *
       * Typically, this ID is defined in your system,
       * but you can also use any Wix resource GUID,
       * such as contact ID, member ID, or invoice ID.
       * See
       * [Choose the right `externalEntityId`](https://dev.wix.com/docs/rest/business-management/automations/triggered-events/reporting-and-canceling-events#about-canceling-events)
       * for more information.
       */
      externalEntityId?: string | null;
      /** Idempotency information for the event */
      idempotency?: Idempotency;
  }
  /**
   * Bulk reports events and activates site automations with the specified trigger key.
   * @param triggerKey - Trigger key as defined in your app's trigger configuration
   * in the app dashboard.
   * For example, `form_submitted` or `invoice_due`.
   * @param eventsInfo - Repeated list of event details for bulk reporting
   * @public
   * @documentationMaturity preview
   * @requiredField eventsInfo
   * @requiredField triggerKey
   * @permissionId AUTOMATIONS.REPORT_EVENT
   * @adminMethod
   */
  function bulkReportEvent(triggerKey: string, eventsInfo: EventInfo[]): Promise<BulkReportEventResponse>;
  /**
   * Bulk cancels any remaining actions for a trigger and external entities.
   * @param triggerKey - Trigger key whose events you want to cancel.
   * For example, `form_submitted` or `invoice_due`.
   * @param externalEntityIds - Repeated list of external_entity_id, representing the related resources' IDs
   * @public
   * @documentationMaturity preview
   * @requiredField externalEntityIds
   * @requiredField triggerKey
   * @permissionId AUTOMATIONS.CANCEL_EVENT
   * @adminMethod
   */
  function bulkCancelEvent(triggerKey: string, externalEntityIds: string[]): Promise<BulkCancelEventResponse>;
  /**
   * Cancels any remaining actions for a trigger and external entity.
   *
   *
   * Events are not cancelable by default.
   * To make an event cancelable,
   * you must first pass an `externalEntityId`
   * and the applicable `triggerKey` to [reportEvent()](#report-event).
   * When you call cancelEvent() with the same `externalEntityId` and `triggerKey`,
   * the event is canceled,
   * as are all other events that share the `externalEntityId` and `triggerKey`.
   * @param triggerKey - Trigger key whose event you want to cancel.
   * For example, `form_submitted` or `invoice_due`.
   * @param externalEntityId - ID of the related resource in GUID format.
   * For example, `fc81a355-3429-50fc-a4c7-def486e828f3`.
   *
   * Typically, this ID is defined in your system,
   * but you can also use any Wix resource GUID,
   * such as contact ID, member ID, or invoice ID.
   * See
   * [Choose the right `externalEntityId`](https://dev.wix.com/docs/rest/business-management/automations/triggered-events/reporting-and-canceling-events#choose-the-right-externalentityid)
   * for more information.
   * @public
   * @documentationMaturity preview
   * @requiredField externalEntityId
   * @requiredField triggerKey
   * @permissionId AUTOMATIONS.CANCEL_EVENT
   * @adminMethod
   */
  function cancelEvent(triggerKey: string, externalEntityId: string): Promise<void>;
  /**
   * Runs an automation manually.
   *
   * This gives a user the ability to trigger the automation manually,
   * without requiring an event to be reported to start the automation.
   * As an example,
   * consider an automation that sends a confirmation for a hotel booking when a user submits a reservation online.
   * However, if the user calls the hotel directly to make the reservation, the automation isn't triggered.
   * The site owner needs a way to send the automated confirmation without the user making an online booking.
   * Run Automation provides this functionality.
   *
   *
   * <blockquote class="important">
   * __Permissions__
   * This endpoint requires the Manage Your App
   * [permission scope](https://devforum.wix.com/en/article/available-permissions).
   * </blockquote>
   * @param identifierType - identifier MUST be either AUTOMATION or PREINSTALLED
   * @internal
   * @documentationMaturity preview
   * @requiredField identifierType
   * @requiredField options.payload
   * @permissionId AUTOMATIONS.REPORT_EVENT
   * @adminMethod
   */
  function esbConfigResolverRunAutomation(identifierType: IdentifierType, options?: EsbConfigResolverRunAutomationOptions): Promise<void>;
  interface EsbConfigResolverRunAutomationOptions extends V1RunAutomationRequestIdentifierOneOf {
      /** a preinstalled automation identifier */
      preinstalledIdentifier?: PreinstalledIdentifier;
      /** a automation of any type identifier that will be available in future */
      automationIdentifier?: AutomationIdentifier;
      /**
       * Event payload, formatted as key:value pairs.
       * Must comply with the payload schema
       * if you provided one when configuring your trigger.
       *
       * Key names can include only alphanumeric characters or underscores
       * (`A-Z`, `a-z`, `0-9`, `_`).
       * They cannot start with an underscore.
       *
       * Values can be strings, numbers, integers, booleans, or arrays.
       * If a value is an array, the array items must be objects,
       * and nested object properties must be
       * strings, numbers, integers, or booleans only.
       */
      payload: Record<string, any> | null;
  }
  /**
   * Report domain event
   * @param triggerAppId - trigger app id
   * @internal
   * @documentationMaturity preview
   * @requiredField options
   * @requiredField options.reportEventRequest
   * @requiredField options.reportEventRequest.triggerKey
   * @requiredField triggerAppId
   * @permissionId AUTOMATIONS.DOMAIN_EVENT_FRAMEWORK
   * @adminMethod
   */
  function reportDomainEvent(triggerAppId: string, options: ReportDomainEventOptions): Promise<void>;
  interface ReportDomainEventOptions {
      /** report event request */
      reportEventRequest: ReportEventRequest;
  }
  
  type automationsV2Activation_universal_d_Activation = Activation;
  type automationsV2Activation_universal_d_AutomationConfigurationStatus = AutomationConfigurationStatus;
  const automationsV2Activation_universal_d_AutomationConfigurationStatus: typeof AutomationConfigurationStatus;
  type automationsV2Activation_universal_d_AutomationConfigurationAction = AutomationConfigurationAction;
  type automationsV2Activation_universal_d_AutomationConfigurationActionInfoOneOf = AutomationConfigurationActionInfoOneOf;
  type automationsV2Activation_universal_d_ActivationStatus = ActivationStatus;
  type automationsV2Activation_universal_d_ActivationStatusChanged = ActivationStatusChanged;
  type automationsV2Activation_universal_d_ActivationStatusChangedStatusInfoOneOf = ActivationStatusChangedStatusInfoOneOf;
  type automationsV2Activation_universal_d_Target = Target;
  const automationsV2Activation_universal_d_Target: typeof Target;
  type automationsV2Activation_universal_d_CancellationReason = CancellationReason;
  const automationsV2Activation_universal_d_CancellationReason: typeof CancellationReason;
  type automationsV2Activation_universal_d_Identity = Identity;
  type automationsV2Activation_universal_d_ActivationStatusChangedStatus = ActivationStatusChangedStatus;
  const automationsV2Activation_universal_d_ActivationStatusChangedStatus: typeof ActivationStatusChangedStatus;
  type automationsV2Activation_universal_d_InitiatedStatusInfo = InitiatedStatusInfo;
  type automationsV2Activation_universal_d_ActivationStatusChangedStartedStatusInfo = ActivationStatusChangedStartedStatusInfo;
  type automationsV2Activation_universal_d_ScheduledStatusInfo = ScheduledStatusInfo;
  type automationsV2Activation_universal_d_CancelledStatusInfo = CancelledStatusInfo;
  type automationsV2Activation_universal_d_ActivationStatusChangedFailedStatusInfo = ActivationStatusChangedFailedStatusInfo;
  type automationsV2Activation_universal_d_ScheduleRequest = ScheduleRequest;
  type automationsV2Activation_universal_d_Schedule = Schedule;
  type automationsV2Activation_universal_d_ScheduledAction = ScheduledAction;
  type automationsV2Activation_universal_d_Delay = Delay;
  type automationsV2Activation_universal_d_DelayOfOneOf = DelayOfOneOf;
  type automationsV2Activation_universal_d_SimpleDelay = SimpleDelay;
  type automationsV2Activation_universal_d_Units = Units;
  const automationsV2Activation_universal_d_Units: typeof Units;
  type automationsV2Activation_universal_d_ScheduleStatus = ScheduleStatus;
  const automationsV2Activation_universal_d_ScheduleStatus: typeof ScheduleStatus;
  type automationsV2Activation_universal_d_TriggerInfo = TriggerInfo;
  type automationsV2Activation_universal_d_ScheduleResponse = ScheduleResponse;
  type automationsV2Activation_universal_d_CancelPendingScheduleRequest = CancelPendingScheduleRequest;
  type automationsV2Activation_universal_d_CancelPendingScheduleRequestByOneOf = CancelPendingScheduleRequestByOneOf;
  type automationsV2Activation_universal_d_CancelPendingScheduleResponse = CancelPendingScheduleResponse;
  type automationsV2Activation_universal_d_UpdatePendingSchedulesPayloadRequest = UpdatePendingSchedulesPayloadRequest;
  type automationsV2Activation_universal_d_UpdatePendingSchedulesPayloadResponse = UpdatePendingSchedulesPayloadResponse;
  type automationsV2Activation_universal_d_ActivationRequest = ActivationRequest;
  type automationsV2Activation_universal_d_Runtime = Runtime;
  type automationsV2Activation_universal_d_Scheduler = Scheduler;
  type automationsV2Activation_universal_d_AsyncAction = AsyncAction;
  type automationsV2Activation_universal_d_ActionData = ActionData;
  type automationsV2Activation_universal_d_ActionActionOneOf = ActionActionOneOf;
  type automationsV2Activation_universal_d_ServiceMapping = ServiceMapping;
  type automationsV2Activation_universal_d_IfFilter = IfFilter;
  type automationsV2Activation_universal_d_SwitchFilter = SwitchFilter;
  type automationsV2Activation_universal_d_Case = Case;
  type automationsV2Activation_universal_d_DelayHelper = DelayHelper;
  type automationsV2Activation_universal_d_RateLimiting = RateLimiting;
  type automationsV2Activation_universal_d_ConditionFilter = ConditionFilter;
  type automationsV2Activation_universal_d_BlockType = BlockType;
  const automationsV2Activation_universal_d_BlockType: typeof BlockType;
  type automationsV2Activation_universal_d_ConditionBlock = ConditionBlock;
  type automationsV2Activation_universal_d_Output = Output;
  type automationsV2Activation_universal_d_SetVariables = SetVariables;
  type automationsV2Activation_universal_d_Service = Service;
  type automationsV2Activation_universal_d_SystemHelper = SystemHelper;
  type automationsV2Activation_universal_d_SystemHelperHelperOneOf = SystemHelperHelperOneOf;
  type automationsV2Activation_universal_d_SpiAction = SpiAction;
  type automationsV2Activation_universal_d_ActivationSource = ActivationSource;
  type automationsV2Activation_universal_d_ActivationSourceOfOneOf = ActivationSourceOfOneOf;
  type automationsV2Activation_universal_d_ActionsData = ActionsData;
  type automationsV2Activation_universal_d_ActionStatus = ActionStatus;
  type automationsV2Activation_universal_d_BatchActivationRequest = BatchActivationRequest;
  type automationsV2Activation_universal_d_ActivationActionStatusChanged = ActivationActionStatusChanged;
  type automationsV2Activation_universal_d_ActivationActionStatusChangedInfoOneOf = ActivationActionStatusChangedInfoOneOf;
  type automationsV2Activation_universal_d_ActivationActionStatusChangedStatusInfoOneOf = ActivationActionStatusChangedStatusInfoOneOf;
  type automationsV2Activation_universal_d_StartedStatusInfoAppDefinedActionInfo = StartedStatusInfoAppDefinedActionInfo;
  type automationsV2Activation_universal_d_DelayActionInfo = DelayActionInfo;
  type automationsV2Activation_universal_d_ExpressionEvaluationResult = ExpressionEvaluationResult;
  type automationsV2Activation_universal_d_AppDefinedActionInfo = AppDefinedActionInfo;
  type automationsV2Activation_universal_d_ConditionActionInfo = ConditionActionInfo;
  type automationsV2Activation_universal_d_RateLimitActionInfo = RateLimitActionInfo;
  type automationsV2Activation_universal_d_EndedStatusInfoDelayActionInfo = EndedStatusInfoDelayActionInfo;
  type automationsV2Activation_universal_d_SetVariablesActionInfo = SetVariablesActionInfo;
  type automationsV2Activation_universal_d_AutomationInfo = AutomationInfo;
  type automationsV2Activation_universal_d_AutomationInfoOriginInfoOneOf = AutomationInfoOriginInfoOneOf;
  type automationsV2Activation_universal_d_AutomationInfoTriggerInfo = AutomationInfoTriggerInfo;
  type automationsV2Activation_universal_d_ActivationActionStatusChangedAppDefinedActionInfo = ActivationActionStatusChangedAppDefinedActionInfo;
  type automationsV2Activation_universal_d_ActivationActionStatusChangedStatus = ActivationActionStatusChangedStatus;
  const automationsV2Activation_universal_d_ActivationActionStatusChangedStatus: typeof ActivationActionStatusChangedStatus;
  type automationsV2Activation_universal_d_StartedStatusInfo = StartedStatusInfo;
  type automationsV2Activation_universal_d_StartedStatusInfoTypeInfoOneOf = StartedStatusInfoTypeInfoOneOf;
  type automationsV2Activation_universal_d_EndedStatusInfo = EndedStatusInfo;
  type automationsV2Activation_universal_d_EndedStatusInfoTypeInfoOneOf = EndedStatusInfoTypeInfoOneOf;
  type automationsV2Activation_universal_d_FailedStatusInfo = FailedStatusInfo;
  type automationsV2Activation_universal_d_ActivationResumeAfterDelay = ActivationResumeAfterDelay;
  type automationsV2Activation_universal_d_ActionCompletedRequest = ActionCompletedRequest;
  type automationsV2Activation_universal_d_RefreshPayloadRequest = RefreshPayloadRequest;
  type automationsV2Activation_universal_d_RefreshPayloadResponse = RefreshPayloadResponse;
  type automationsV2Activation_universal_d_RunAutomationRequest = RunAutomationRequest;
  type automationsV2Activation_universal_d_RunAutomationResponse = RunAutomationResponse;
  type automationsV2Activation_universal_d_ActivationScheduleRequested = ActivationScheduleRequested;
  type automationsV2Activation_universal_d_ScheduleActivationRequested = ScheduleActivationRequested;
  type automationsV2Activation_universal_d_ActivationContinuedAfterSchedule = ActivationContinuedAfterSchedule;
  type automationsV2Activation_universal_d_ReportEventRequest = ReportEventRequest;
  type automationsV2Activation_universal_d_Idempotency = Idempotency;
  type automationsV2Activation_universal_d_ReportEventResponse = ReportEventResponse;
  type automationsV2Activation_universal_d_BulkReportEventRequest = BulkReportEventRequest;
  type automationsV2Activation_universal_d_EventInfo = EventInfo;
  type automationsV2Activation_universal_d_BulkReportEventResponse = BulkReportEventResponse;
  type automationsV2Activation_universal_d_BulkReportEventResult = BulkReportEventResult;
  type automationsV2Activation_universal_d_BulkCancelEventRequest = BulkCancelEventRequest;
  type automationsV2Activation_universal_d_BulkCancelEventResponse = BulkCancelEventResponse;
  type automationsV2Activation_universal_d_BulkCancelEventResult = BulkCancelEventResult;
  type automationsV2Activation_universal_d_CancelEventRequest = CancelEventRequest;
  type automationsV2Activation_universal_d_CancelEventResponse = CancelEventResponse;
  type automationsV2Activation_universal_d_V1RunAutomationRequest = V1RunAutomationRequest;
  type automationsV2Activation_universal_d_V1RunAutomationRequestIdentifierOneOf = V1RunAutomationRequestIdentifierOneOf;
  type automationsV2Activation_universal_d_IdentifierType = IdentifierType;
  const automationsV2Activation_universal_d_IdentifierType: typeof IdentifierType;
  type automationsV2Activation_universal_d_PreinstalledIdentifier = PreinstalledIdentifier;
  type automationsV2Activation_universal_d_AutomationIdentifier = AutomationIdentifier;
  type automationsV2Activation_universal_d_V1RunAutomationResponse = V1RunAutomationResponse;
  type automationsV2Activation_universal_d_ReportDomainEventRequest = ReportDomainEventRequest;
  type automationsV2Activation_universal_d_ReportDomainEventResponse = ReportDomainEventResponse;
  type automationsV2Activation_universal_d_ExecuteFromActionRequest = ExecuteFromActionRequest;
  type automationsV2Activation_universal_d_ExecuteFromActionResponse = ExecuteFromActionResponse;
  type automationsV2Activation_universal_d_ActivationScheduleCompleted = ActivationScheduleCompleted;
  const automationsV2Activation_universal_d_schedule: typeof schedule;
  const automationsV2Activation_universal_d_cancelPendingSchedule: typeof cancelPendingSchedule;
  type automationsV2Activation_universal_d_CancelPendingScheduleOptions = CancelPendingScheduleOptions;
  const automationsV2Activation_universal_d_updatePendingSchedulesPayload: typeof updatePendingSchedulesPayload;
  type automationsV2Activation_universal_d_UpdatePendingSchedulesPayloadOptions = UpdatePendingSchedulesPayloadOptions;
  const automationsV2Activation_universal_d_actionCompleted: typeof actionCompleted;
  type automationsV2Activation_universal_d_ActionCompletedOptions = ActionCompletedOptions;
  const automationsV2Activation_universal_d_reportEvent: typeof reportEvent;
  type automationsV2Activation_universal_d_ReportEventOptions = ReportEventOptions;
  const automationsV2Activation_universal_d_bulkReportEvent: typeof bulkReportEvent;
  const automationsV2Activation_universal_d_bulkCancelEvent: typeof bulkCancelEvent;
  const automationsV2Activation_universal_d_cancelEvent: typeof cancelEvent;
  const automationsV2Activation_universal_d_esbConfigResolverRunAutomation: typeof esbConfigResolverRunAutomation;
  type automationsV2Activation_universal_d_EsbConfigResolverRunAutomationOptions = EsbConfigResolverRunAutomationOptions;
  const automationsV2Activation_universal_d_reportDomainEvent: typeof reportDomainEvent;
  type automationsV2Activation_universal_d_ReportDomainEventOptions = ReportDomainEventOptions;
  namespace automationsV2Activation_universal_d {
    export {
      automationsV2Activation_universal_d_Activation as Activation,
      Automation$1 as Automation,
      AutomationOriginInfoOneOf$1 as AutomationOriginInfoOneOf,
      ActionSettings$1 as ActionSettings,
      Domain$1 as Domain,
      Enrichment$1 as Enrichment,
      AuditInfo$1 as AuditInfo,
      AuditInfoIdOneOf$1 as AuditInfoIdOneOf,
      AutomationConfiguration$1 as AutomationConfiguration,
      TimeUnit$1 as TimeUnit,
      Filter$1 as Filter,
      FutureDateActivationOffset$1 as FutureDateActivationOffset,
      RateLimit$1 as RateLimit,
      ConditionExpressionGroup$1 as ConditionExpressionGroup,
      Operator$1 as Operator,
      Type$1 as Type,
      AppDefinedAction$1 as AppDefinedAction,
      ConditionAction$1 as ConditionAction,
      DelayAction$1 as DelayAction,
      RateLimitAction$1 as RateLimitAction,
      SetVariablesAction$1 as SetVariablesAction,
      OutputAction$1 as OutputAction,
      automationsV2Activation_universal_d_AutomationConfigurationStatus as AutomationConfigurationStatus,
      Trigger$1 as Trigger,
      automationsV2Activation_universal_d_AutomationConfigurationAction as AutomationConfigurationAction,
      automationsV2Activation_universal_d_AutomationConfigurationActionInfoOneOf as AutomationConfigurationActionInfoOneOf,
      Origin$1 as Origin,
      ApplicationOrigin$1 as ApplicationOrigin,
      PreinstalledOrigin$1 as PreinstalledOrigin,
      AutomationSettings$1 as AutomationSettings,
      DraftInfo$1 as DraftInfo,
      Enrichments$1 as Enrichments,
      automationsV2Activation_universal_d_ActivationStatus as ActivationStatus,
      Status$1 as Status,
      automationsV2Activation_universal_d_ActivationStatusChanged as ActivationStatusChanged,
      automationsV2Activation_universal_d_ActivationStatusChangedStatusInfoOneOf as ActivationStatusChangedStatusInfoOneOf,
      automationsV2Activation_universal_d_Target as Target,
      automationsV2Activation_universal_d_CancellationReason as CancellationReason,
      automationsV2Activation_universal_d_Identity as Identity,
      automationsV2Activation_universal_d_ActivationStatusChangedStatus as ActivationStatusChangedStatus,
      automationsV2Activation_universal_d_InitiatedStatusInfo as InitiatedStatusInfo,
      automationsV2Activation_universal_d_ActivationStatusChangedStartedStatusInfo as ActivationStatusChangedStartedStatusInfo,
      automationsV2Activation_universal_d_ScheduledStatusInfo as ScheduledStatusInfo,
      automationsV2Activation_universal_d_CancelledStatusInfo as CancelledStatusInfo,
      automationsV2Activation_universal_d_ActivationStatusChangedFailedStatusInfo as ActivationStatusChangedFailedStatusInfo,
      automationsV2Activation_universal_d_ScheduleRequest as ScheduleRequest,
      automationsV2Activation_universal_d_Schedule as Schedule,
      automationsV2Activation_universal_d_ScheduledAction as ScheduledAction,
      automationsV2Activation_universal_d_Delay as Delay,
      automationsV2Activation_universal_d_DelayOfOneOf as DelayOfOneOf,
      automationsV2Activation_universal_d_SimpleDelay as SimpleDelay,
      automationsV2Activation_universal_d_Units as Units,
      automationsV2Activation_universal_d_ScheduleStatus as ScheduleStatus,
      automationsV2Activation_universal_d_TriggerInfo as TriggerInfo,
      automationsV2Activation_universal_d_ScheduleResponse as ScheduleResponse,
      automationsV2Activation_universal_d_CancelPendingScheduleRequest as CancelPendingScheduleRequest,
      automationsV2Activation_universal_d_CancelPendingScheduleRequestByOneOf as CancelPendingScheduleRequestByOneOf,
      automationsV2Activation_universal_d_CancelPendingScheduleResponse as CancelPendingScheduleResponse,
      automationsV2Activation_universal_d_UpdatePendingSchedulesPayloadRequest as UpdatePendingSchedulesPayloadRequest,
      automationsV2Activation_universal_d_UpdatePendingSchedulesPayloadResponse as UpdatePendingSchedulesPayloadResponse,
      DomainEvent$1 as DomainEvent,
      DomainEventBodyOneOf$1 as DomainEventBodyOneOf,
      EntityCreatedEvent$1 as EntityCreatedEvent,
      RestoreInfo$1 as RestoreInfo,
      EntityUpdatedEvent$1 as EntityUpdatedEvent,
      EntityDeletedEvent$1 as EntityDeletedEvent,
      ActionEvent$1 as ActionEvent,
      MessageEnvelope$1 as MessageEnvelope,
      IdentificationData$1 as IdentificationData,
      IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf,
      WebhookIdentityType$1 as WebhookIdentityType,
      automationsV2Activation_universal_d_ActivationRequest as ActivationRequest,
      automationsV2Activation_universal_d_Runtime as Runtime,
      automationsV2Activation_universal_d_Scheduler as Scheduler,
      automationsV2Activation_universal_d_AsyncAction as AsyncAction,
      automationsV2Activation_universal_d_ActionData as ActionData,
      Action$1 as Action,
      automationsV2Activation_universal_d_ActionActionOneOf as ActionActionOneOf,
      automationsV2Activation_universal_d_ServiceMapping as ServiceMapping,
      automationsV2Activation_universal_d_IfFilter as IfFilter,
      automationsV2Activation_universal_d_SwitchFilter as SwitchFilter,
      automationsV2Activation_universal_d_Case as Case,
      automationsV2Activation_universal_d_DelayHelper as DelayHelper,
      automationsV2Activation_universal_d_RateLimiting as RateLimiting,
      automationsV2Activation_universal_d_ConditionFilter as ConditionFilter,
      automationsV2Activation_universal_d_BlockType as BlockType,
      automationsV2Activation_universal_d_ConditionBlock as ConditionBlock,
      automationsV2Activation_universal_d_Output as Output,
      automationsV2Activation_universal_d_SetVariables as SetVariables,
      automationsV2Activation_universal_d_Service as Service,
      automationsV2Activation_universal_d_SystemHelper as SystemHelper,
      automationsV2Activation_universal_d_SystemHelperHelperOneOf as SystemHelperHelperOneOf,
      automationsV2Activation_universal_d_SpiAction as SpiAction,
      automationsV2Activation_universal_d_ActivationSource as ActivationSource,
      automationsV2Activation_universal_d_ActivationSourceOfOneOf as ActivationSourceOfOneOf,
      automationsV2Activation_universal_d_ActionsData as ActionsData,
      automationsV2Activation_universal_d_ActionStatus as ActionStatus,
      automationsV2Activation_universal_d_BatchActivationRequest as BatchActivationRequest,
      Empty$1 as Empty,
      automationsV2Activation_universal_d_ActivationActionStatusChanged as ActivationActionStatusChanged,
      automationsV2Activation_universal_d_ActivationActionStatusChangedInfoOneOf as ActivationActionStatusChangedInfoOneOf,
      automationsV2Activation_universal_d_ActivationActionStatusChangedStatusInfoOneOf as ActivationActionStatusChangedStatusInfoOneOf,
      automationsV2Activation_universal_d_StartedStatusInfoAppDefinedActionInfo as StartedStatusInfoAppDefinedActionInfo,
      automationsV2Activation_universal_d_DelayActionInfo as DelayActionInfo,
      automationsV2Activation_universal_d_ExpressionEvaluationResult as ExpressionEvaluationResult,
      automationsV2Activation_universal_d_AppDefinedActionInfo as AppDefinedActionInfo,
      automationsV2Activation_universal_d_ConditionActionInfo as ConditionActionInfo,
      automationsV2Activation_universal_d_RateLimitActionInfo as RateLimitActionInfo,
      automationsV2Activation_universal_d_EndedStatusInfoDelayActionInfo as EndedStatusInfoDelayActionInfo,
      automationsV2Activation_universal_d_SetVariablesActionInfo as SetVariablesActionInfo,
      automationsV2Activation_universal_d_AutomationInfo as AutomationInfo,
      automationsV2Activation_universal_d_AutomationInfoOriginInfoOneOf as AutomationInfoOriginInfoOneOf,
      automationsV2Activation_universal_d_AutomationInfoTriggerInfo as AutomationInfoTriggerInfo,
      automationsV2Activation_universal_d_ActivationActionStatusChangedAppDefinedActionInfo as ActivationActionStatusChangedAppDefinedActionInfo,
      automationsV2Activation_universal_d_ActivationActionStatusChangedStatus as ActivationActionStatusChangedStatus,
      automationsV2Activation_universal_d_StartedStatusInfo as StartedStatusInfo,
      automationsV2Activation_universal_d_StartedStatusInfoTypeInfoOneOf as StartedStatusInfoTypeInfoOneOf,
      automationsV2Activation_universal_d_EndedStatusInfo as EndedStatusInfo,
      automationsV2Activation_universal_d_EndedStatusInfoTypeInfoOneOf as EndedStatusInfoTypeInfoOneOf,
      automationsV2Activation_universal_d_FailedStatusInfo as FailedStatusInfo,
      automationsV2Activation_universal_d_ActivationResumeAfterDelay as ActivationResumeAfterDelay,
      automationsV2Activation_universal_d_ActionCompletedRequest as ActionCompletedRequest,
      automationsV2Activation_universal_d_RefreshPayloadRequest as RefreshPayloadRequest,
      automationsV2Activation_universal_d_RefreshPayloadResponse as RefreshPayloadResponse,
      automationsV2Activation_universal_d_RunAutomationRequest as RunAutomationRequest,
      automationsV2Activation_universal_d_RunAutomationResponse as RunAutomationResponse,
      automationsV2Activation_universal_d_ActivationScheduleRequested as ActivationScheduleRequested,
      automationsV2Activation_universal_d_ScheduleActivationRequested as ScheduleActivationRequested,
      automationsV2Activation_universal_d_ActivationContinuedAfterSchedule as ActivationContinuedAfterSchedule,
      automationsV2Activation_universal_d_ReportEventRequest as ReportEventRequest,
      automationsV2Activation_universal_d_Idempotency as Idempotency,
      automationsV2Activation_universal_d_ReportEventResponse as ReportEventResponse,
      automationsV2Activation_universal_d_BulkReportEventRequest as BulkReportEventRequest,
      automationsV2Activation_universal_d_EventInfo as EventInfo,
      automationsV2Activation_universal_d_BulkReportEventResponse as BulkReportEventResponse,
      automationsV2Activation_universal_d_BulkReportEventResult as BulkReportEventResult,
      ItemMetadata$1 as ItemMetadata,
      ApplicationError$1 as ApplicationError,
      BulkActionMetadata$1 as BulkActionMetadata,
      automationsV2Activation_universal_d_BulkCancelEventRequest as BulkCancelEventRequest,
      automationsV2Activation_universal_d_BulkCancelEventResponse as BulkCancelEventResponse,
      automationsV2Activation_universal_d_BulkCancelEventResult as BulkCancelEventResult,
      automationsV2Activation_universal_d_CancelEventRequest as CancelEventRequest,
      automationsV2Activation_universal_d_CancelEventResponse as CancelEventResponse,
      automationsV2Activation_universal_d_V1RunAutomationRequest as V1RunAutomationRequest,
      automationsV2Activation_universal_d_V1RunAutomationRequestIdentifierOneOf as V1RunAutomationRequestIdentifierOneOf,
      automationsV2Activation_universal_d_IdentifierType as IdentifierType,
      automationsV2Activation_universal_d_PreinstalledIdentifier as PreinstalledIdentifier,
      automationsV2Activation_universal_d_AutomationIdentifier as AutomationIdentifier,
      automationsV2Activation_universal_d_V1RunAutomationResponse as V1RunAutomationResponse,
      automationsV2Activation_universal_d_ReportDomainEventRequest as ReportDomainEventRequest,
      automationsV2Activation_universal_d_ReportDomainEventResponse as ReportDomainEventResponse,
      automationsV2Activation_universal_d_ExecuteFromActionRequest as ExecuteFromActionRequest,
      automationsV2Activation_universal_d_ExecuteFromActionResponse as ExecuteFromActionResponse,
      automationsV2Activation_universal_d_ActivationScheduleCompleted as ActivationScheduleCompleted,
      automationsV2Activation_universal_d_schedule as schedule,
      automationsV2Activation_universal_d_cancelPendingSchedule as cancelPendingSchedule,
      automationsV2Activation_universal_d_CancelPendingScheduleOptions as CancelPendingScheduleOptions,
      automationsV2Activation_universal_d_updatePendingSchedulesPayload as updatePendingSchedulesPayload,
      automationsV2Activation_universal_d_UpdatePendingSchedulesPayloadOptions as UpdatePendingSchedulesPayloadOptions,
      automationsV2Activation_universal_d_actionCompleted as actionCompleted,
      automationsV2Activation_universal_d_ActionCompletedOptions as ActionCompletedOptions,
      automationsV2Activation_universal_d_reportEvent as reportEvent,
      automationsV2Activation_universal_d_ReportEventOptions as ReportEventOptions,
      automationsV2Activation_universal_d_bulkReportEvent as bulkReportEvent,
      automationsV2Activation_universal_d_bulkCancelEvent as bulkCancelEvent,
      automationsV2Activation_universal_d_cancelEvent as cancelEvent,
      automationsV2Activation_universal_d_esbConfigResolverRunAutomation as esbConfigResolverRunAutomation,
      automationsV2Activation_universal_d_EsbConfigResolverRunAutomationOptions as EsbConfigResolverRunAutomationOptions,
      automationsV2Activation_universal_d_reportDomainEvent as reportDomainEvent,
      automationsV2Activation_universal_d_ReportDomainEventOptions as ReportDomainEventOptions,
    };
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
      status?: Status;
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
  enum Status {
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
  interface UpdatedWithPreviousEntity {
      /** previous automation */
      previousAutomation?: Automation;
      /** updated automation */
      currentAutomation?: Automation;
  }
  interface DeletedWithEntity {
      /** Deleted automation */
      automation?: Automation;
  }
  interface DraftPublished {
      /** Draft automation ID */
      draftAutomationId?: string;
      /**
       * Draft original automation.
       * if it's not a draft of an existing automation, the draft original automation would be the draft itself
       */
      draftOriginalAutomation?: Automation;
      /** Updated automation after publishing the draft. */
      updatedAutomation?: Automation;
  }
  interface GetAutomationRevisionRequest {
      /** Automation ID. */
      automationId: string;
      /** Automation revision. */
      revision?: string | null;
  }
  interface GetAutomationRevisionResponse {
      /** Automation with the relevant revision. */
      automation?: Automation;
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
  interface CreateAutomationRequest {
      /** Automation to be created. */
      automation: Automation;
  }
  interface CreateAutomationResponse {
      /** The created automation. */
      automation?: Automation;
  }
  interface GetAutomationRequest {
      /** Automation ID. */
      automationId: string;
      /** Automation origin. */
      origin?: Origin;
  }
  interface GetAutomationResponse {
      /** The requested automation. */
      automation?: Automation;
  }
  interface UpdateAutomationRequest {
      /** Automation to update. */
      automation: Automation;
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateAutomationResponse {
      /** Updated automation. */
      automation?: Automation;
  }
  interface DeleteAutomationRequest {
      /** Automation ID. */
      automationId: string;
  }
  interface DeleteAutomationResponse {
  }
  interface BulkDeleteAutomationsRequest {
      /** Automation IDs to delete. */
      automationIds: string[];
  }
  interface BulkDeleteAutomationsResponse {
      /** Deleted automations results. */
      results?: BulkDeleteResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkDeleteResult {
      /** Metadata for the item deletion. */
      itemMetadata?: ItemMetadata;
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
  interface BulkActionMetadata {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface CreatePreinstalledAutomationRequest {
      /** Preinstalled automation to be created. */
      automation: Automation;
      /** Optional - hide the created automation behind a spec */
      specInfo?: PreinstalledAutomationSpecInfo;
      /**
       * Optional - the information about the original site automation that was used to create this preinstalled automation
       * Usually an existing automation in a site is used to create the preinstalled automation, this is the relevant information.
       */
      originAutomationInfo?: OriginAutomationInfo;
  }
  interface PreinstalledAutomationSpecInfo {
      /** Spec to conduct on for the automation */
      spec?: string;
      /**
       * Value the spec should return in order to affect the user with the operation
       * e.g. creation - show the users the automation, update - show the users the updated automation, deletion - not show the users the automation
       */
      variantValue?: string | null;
      /**
       * Version from which the experiment should decide whether to expose it to users when !conduct(spec).contains(variant_value)
       * For example, if 50 is set, version 49 and below (including 49) will not expose the preinstalled automation to the user.
       */
      experimentVersion?: number;
  }
  interface OriginAutomationInfo {
      /** The original automation id */
      siteAutomationId?: string;
      /** The original automation meta site id */
      metaSiteId?: string;
  }
  interface CreatePreinstalledAutomationResponse {
      /** The created preinstalled automation. */
      automation?: Automation;
  }
  interface UpdatePreinstalledAutomationRequest {
      /** Preinstalled automation to update. */
      automation: Automation;
      /** Optional - hide the updated automation behind a spec */
      specInfo?: PreinstalledAutomationSpecInfo;
  }
  interface UpdatePreinstalledAutomationResponse {
      /** Updated preinstalled automation. */
      automation?: Automation;
  }
  interface DeletePreinstalledAutomationRequest {
      /** Preinstalled Component Id */
      componentId: string;
      /**
       * Optional - makes the deletion operation gradual
       * The automation will not return if the variant returns for the site
       */
      specInfo?: PreinstalledAutomationSpecInfo;
  }
  interface DeletePreinstalledAutomationResponse {
  }
  interface GeneratePreinstalledAutomationRequest {
      automation: Automation;
  }
  interface GeneratePreinstalledAutomationResponse {
      automation?: Automation;
  }
  interface QueryPreinstalledAutomationsForAppRequest {
      /** WQL expression. */
      query?: CommonCursorQuery;
  }
  interface CommonCursorQuery extends CommonCursorQueryPagingMethodOneOf {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CommonCursorPaging;
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
      sort?: CommonSorting[];
  }
  /** @oneof */
  interface CommonCursorQueryPagingMethodOneOf {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CommonCursorPaging;
  }
  interface CommonSorting {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: CommonSortOrder;
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
  enum CommonSortOrder {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CommonCursorPaging {
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
  interface QueryPreinstalledAutomationsForAppResponse {
      /** List of automations. */
      automations?: Automation[];
      /** Paging metadata. */
      pagingMetadata?: CommonCursorPagingMetadata;
  }
  interface CommonCursorPagingMetadata {
      /** Number of items returned in current page. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: CommonCursors;
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
  interface CommonCursors {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface QueryAutomationsRequest {
      /** WQL expression. */
      query?: CursorQuery;
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
  interface QueryAutomationsResponse {
      /** List of automations. */
      automations?: Automation[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata;
  }
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
  interface Empty {
  }
  interface CopyAutomationRequest {
      /** Automation ID. */
      automationId: string;
      /** Automation origin. */
      origin?: Origin;
  }
  interface CopyAutomationResponse {
      /** Automation copy. */
      automation?: Automation;
  }
  interface MetaSiteSpecialEvent extends MetaSiteSpecialEventPayloadOneOf {
      /** Emitted on a meta site creation. */
      siteCreated?: SiteCreated;
      /** Emitted on a meta site transfer completion. */
      siteTransferred?: SiteTransferred;
      /** Emitted on a meta site deletion. */
      siteDeleted?: SiteDeleted;
      /** Emitted on a meta site restoration. */
      siteUndeleted?: SiteUndeleted;
      /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
      sitePublished?: SitePublished;
      /** Emitted on a meta site unpublish. */
      siteUnpublished?: SiteUnpublished;
      /** Emitted when meta site is marked as template. */
      siteMarkedAsTemplate?: SiteMarkedAsTemplate;
      /** Emitted when meta site is marked as a WixSite. */
      siteMarkedAsWixSite?: SiteMarkedAsWixSite;
      /** Emitted when an application is provisioned (installed). */
      serviceProvisioned?: ServiceProvisioned;
      /** Emitted when an application is removed (uninstalled). */
      serviceRemoved?: ServiceRemoved;
      /** Emitted when meta site name (URL slug) is changed. */
      siteRenamedPayload?: SiteRenamed;
      /** Emitted when meta site was permanently deleted. */
      hardDeleted?: SiteHardDeleted;
      /** Emitted on a namespace change. */
      namespaceChanged?: NamespaceChanged;
      /** Emitted when Studio is attached. */
      studioAssigned?: StudioAssigned;
      /** Emitted when Studio is detached. */
      studioUnassigned?: StudioUnassigned;
      /** A meta site id. */
      metaSiteId?: string;
      /** A meta site version. Monotonically increasing. */
      version?: string;
      /** A timestamp of the event. */
      timestamp?: string;
      /**
       * TODO(meta-site): Change validation once validations are disabled for consumers
       * More context: https://wix.slack.com/archives/C0UHEBPFT/p1720957844413149 and https://wix.slack.com/archives/CFWKX325T/p1728892152855659
       */
      assets?: Asset[];
  }
  /** @oneof */
  interface MetaSiteSpecialEventPayloadOneOf {
      /** Emitted on a meta site creation. */
      siteCreated?: SiteCreated;
      /** Emitted on a meta site transfer completion. */
      siteTransferred?: SiteTransferred;
      /** Emitted on a meta site deletion. */
      siteDeleted?: SiteDeleted;
      /** Emitted on a meta site restoration. */
      siteUndeleted?: SiteUndeleted;
      /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
      sitePublished?: SitePublished;
      /** Emitted on a meta site unpublish. */
      siteUnpublished?: SiteUnpublished;
      /** Emitted when meta site is marked as template. */
      siteMarkedAsTemplate?: SiteMarkedAsTemplate;
      /** Emitted when meta site is marked as a WixSite. */
      siteMarkedAsWixSite?: SiteMarkedAsWixSite;
      /** Emitted when an application is provisioned (installed). */
      serviceProvisioned?: ServiceProvisioned;
      /** Emitted when an application is removed (uninstalled). */
      serviceRemoved?: ServiceRemoved;
      /** Emitted when meta site name (URL slug) is changed. */
      siteRenamedPayload?: SiteRenamed;
      /** Emitted when meta site was permanently deleted. */
      hardDeleted?: SiteHardDeleted;
      /** Emitted on a namespace change. */
      namespaceChanged?: NamespaceChanged;
      /** Emitted when Studio is attached. */
      studioAssigned?: StudioAssigned;
      /** Emitted when Studio is detached. */
      studioUnassigned?: StudioUnassigned;
  }
  interface Asset {
      /** An application definition id (app_id in dev-center). For legacy reasons may be UUID or a string (from Java Enum). */
      appDefId?: string;
      /** An instance id. For legacy reasons may be UUID or a string. */
      instanceId?: string;
      /** An application state. */
      state?: State;
  }
  enum State {
      UNKNOWN = "UNKNOWN",
      ENABLED = "ENABLED",
      DISABLED = "DISABLED",
      PENDING = "PENDING",
      DEMO = "DEMO"
  }
  interface SiteCreated {
      /** A template identifier (empty if not created from a template). */
      originTemplateId?: string;
      /** An account id of the owner. */
      ownerId?: string;
      /** A context in which meta site was created. */
      context?: SiteCreatedContext;
      /**
       * A meta site id from which this site was created.
       *
       * In case of a creation from a template it's a template id.
       * In case of a site duplication ("Save As" in dashboard or duplicate in UM) it's an id of a source site.
       */
      originMetaSiteId?: string | null;
      /** A meta site name (URL slug). */
      siteName?: string;
      /** A namespace. */
      namespace?: Namespace;
  }
  enum SiteCreatedContext {
      /** A valid option, we don't expose all reasons why site might be created. */
      OTHER = "OTHER",
      /** A meta site was created from template. */
      FROM_TEMPLATE = "FROM_TEMPLATE",
      /** A meta site was created by copying of the transfferred meta site. */
      DUPLICATE_BY_SITE_TRANSFER = "DUPLICATE_BY_SITE_TRANSFER",
      /** A copy of existing meta site. */
      DUPLICATE = "DUPLICATE",
      /** A meta site was created as a transfferred site (copy of the original), old flow, should die soon. */
      OLD_SITE_TRANSFER = "OLD_SITE_TRANSFER",
      /** deprecated A meta site was created for Flash editor. */
      FLASH = "FLASH"
  }
  enum Namespace {
      UNKNOWN_NAMESPACE = "UNKNOWN_NAMESPACE",
      /** Default namespace for UGC sites. MetaSites with this namespace will be shown in a user's site list by default. */
      WIX = "WIX",
      /** ShoutOut stand alone product. These are siteless (no actual Wix site, no HtmlWeb). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      SHOUT_OUT = "SHOUT_OUT",
      /** MetaSites created by the Albums product, they appear as part of the Albums app. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      ALBUMS = "ALBUMS",
      /** Part of the WixStores migration flow, a user tries to migrate and gets this site to view and if the user likes it then stores removes this namespace and deletes the old site with the old stores. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      WIX_STORES_TEST_DRIVE = "WIX_STORES_TEST_DRIVE",
      /** Hotels standalone (siteless). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      HOTELS = "HOTELS",
      /** Clubs siteless MetaSites, a club without a wix website. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      CLUBS = "CLUBS",
      /** A partially created ADI website. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      ONBOARDING_DRAFT = "ONBOARDING_DRAFT",
      /** AppBuilder for AppStudio / shmite (c). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      DEV_SITE = "DEV_SITE",
      /** LogoMaker websites offered to the user after logo purchase. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      LOGOS = "LOGOS",
      /** VideoMaker websites offered to the user after video purchase. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      VIDEO_MAKER = "VIDEO_MAKER",
      /** MetaSites with this namespace will *not* be shown in a user's site list by default. */
      PARTNER_DASHBOARD = "PARTNER_DASHBOARD",
      /** MetaSites with this namespace will *not* be shown in a user's site list by default. */
      DEV_CENTER_COMPANY = "DEV_CENTER_COMPANY",
      /**
       * A draft created by HTML editor on open. Upon "first save" it will be moved to be of WIX domain.
       *
       * Meta site with this namespace will *not* be shown in a user's site list by default.
       */
      HTML_DRAFT = "HTML_DRAFT",
      /**
       * the user-journey for Fitness users who want to start from managing their business instead of designing their website.
       * Will be accessible from Site List and will not have a website app.
       * Once the user attaches a site, the site will become a regular wixsite.
       */
      SITELESS_BUSINESS = "SITELESS_BUSINESS",
      /** Belongs to "strategic products" company. Supports new product in the creator's economy space. */
      CREATOR_ECONOMY = "CREATOR_ECONOMY",
      /** It is to be used in the Business First efforts. */
      DASHBOARD_FIRST = "DASHBOARD_FIRST",
      /** Bookings business flow with no site. */
      ANYWHERE = "ANYWHERE",
      /** Namespace for Headless Backoffice with no editor */
      HEADLESS = "HEADLESS",
      /**
       * Namespace for master site that will exist in parent account that will be referenced by subaccounts
       * The site will be used for account level CSM feature for enterprise
       */
      ACCOUNT_MASTER_CMS = "ACCOUNT_MASTER_CMS",
      /** Rise.ai Siteless account management for Gift Cards and Store Credit. */
      RISE = "RISE",
      /**
       * As part of the branded app new funnel, users now can create a meta site that will be branded app first.
       * There's a blank site behind the scene but it's blank).
       * The Mobile company will be the owner of this namespace.
       */
      BRANDED_FIRST = "BRANDED_FIRST",
      /** Nownia.com Siteless account management for Ai Scheduling Assistant. */
      NOWNIA = "NOWNIA",
      /**
       * UGC Templates are templates that are created by users for personal use and to sale to other users.
       * The Partners company owns this namespace.
       */
      UGC_TEMPLATE = "UGC_TEMPLATE",
      /** Codux Headless Sites */
      CODUX = "CODUX",
      /** Bobb - AI Design Creator. */
      MEDIA_DESIGN_CREATOR = "MEDIA_DESIGN_CREATOR"
  }
  /** Site transferred to another user. */
  interface SiteTransferred {
      /** A previous owner id (user that transfers meta site). */
      oldOwnerId?: string;
      /** A new owner id (user that accepts meta site). */
      newOwnerId?: string;
  }
  /** Soft deletion of the meta site. Could be restored. */
  interface SiteDeleted {
      /** A deletion context. */
      deleteContext?: DeleteContext;
  }
  interface DeleteContext {
      /** When the meta site was deleted. */
      dateDeleted?: Date | null;
      /** A status. */
      deleteStatus?: DeleteStatus;
      /** A reason (flow). */
      deleteOrigin?: string;
      /** A service that deleted it. */
      initiatorId?: string | null;
  }
  enum DeleteStatus {
      UNKNOWN = "UNKNOWN",
      TRASH = "TRASH",
      DELETED = "DELETED",
      PENDING_PURGE = "PENDING_PURGE"
  }
  /** Restoration of the meta site. */
  interface SiteUndeleted {
  }
  /** First publish of a meta site. Or subsequent publish after unpublish. */
  interface SitePublished {
  }
  interface SiteUnpublished {
      /** A list of URLs previously associated with the meta site. */
      urls?: string[];
  }
  interface SiteMarkedAsTemplate {
  }
  interface SiteMarkedAsWixSite {
  }
  /**
   * Represents a service provisioned a site.
   *
   * Note on `origin_instance_id`:
   * There is no guarantee that you will be able to find a meta site using `origin_instance_id`.
   * This is because of the following scenario:
   *
   * Imagine you have a template where a third-party application (TPA) includes some stub data,
   * such as a product catalog. When you create a site from this template, you inherit this
   * default product catalog. However, if the template's product catalog is modified,
   * your site will retain the catalog as it was at the time of site creation. This ensures that
   * your site remains consistent with what you initially received and does not include any
   * changes made to the original template afterward.
   * To ensure this, the TPA on the template gets a new instance_id.
   */
  interface ServiceProvisioned {
      /** Either UUID or EmbeddedServiceType. */
      appDefId?: string;
      /** Not only UUID. Something here could be something weird. */
      instanceId?: string;
      /** An instance id from which this instance is originated. */
      originInstanceId?: string;
      /** A version. */
      version?: string | null;
      /** The origin meta site id */
      originMetaSiteId?: string | null;
  }
  interface ServiceRemoved {
      /** Either UUID or EmbeddedServiceType. */
      appDefId?: string;
      /** Not only UUID. Something here could be something weird. */
      instanceId?: string;
      /** A version. */
      version?: string | null;
  }
  /** Rename of the site. Meaning, free public url has been changed as well. */
  interface SiteRenamed {
      /** A new meta site name (URL slug). */
      newSiteName?: string;
      /** A previous meta site name (URL slug). */
      oldSiteName?: string;
  }
  /**
   * Hard deletion of the meta site.
   *
   * Could not be restored. Therefore it's desirable to cleanup data.
   */
  interface SiteHardDeleted {
      /** A deletion context. */
      deleteContext?: DeleteContext;
  }
  interface NamespaceChanged {
      /** A previous namespace. */
      oldNamespace?: Namespace;
      /** A new namespace. */
      newNamespace?: Namespace;
  }
  /** Assigned Studio editor */
  interface StudioAssigned {
  }
  /** Unassigned Studio editor */
  interface StudioUnassigned {
  }
  interface CreateDraftAutomationRequest {
      /** Draft automation to be created. */
      automation?: Automation;
  }
  interface CreateDraftAutomationResponse {
      /** The created draft automation. */
      automation?: Automation;
  }
  interface GetOrCreateDraftAutomationRequest {
      /** Original automation id */
      originalAutomationId: string;
  }
  interface GetOrCreateDraftAutomationResponse {
      /** Draft automation. */
      automation?: Automation;
  }
  interface UpdateDraftAutomationRequest {
      /** Automation to be updated, may be partial. */
      automation: Automation;
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateDraftAutomationResponse {
      /** Updated draft automation. */
      automation?: Automation;
  }
  interface QueryAutomationsWithDraftsRequest {
      /** WQL expression. */
      query?: CursorQuery;
  }
  interface QueryAutomationsWithDraftsResponse {
      /** List of automations. */
      automations?: Automation[];
      /** Paging metadata */
      pagingMetadata?: CursorPagingMetadata;
      /**
       * map of existing automationIds and their relevant drafts' automationIds
       * if include_draft_data: false was passed, the map will be empty
       * The key is the automationId of the original automation, and the value a list of related draft automationIds
       */
      originalAutomationIdToDrafts?: Record<string, DraftsInfo>;
  }
  interface DraftsInfo {
      /** list of drafts of an existing Automation */
      draftAutomationIds?: string[];
  }
  interface DeleteDraftAutomationRequest {
      /** Id of the draft automation to delete. */
      automationId: string;
  }
  interface DeleteDraftAutomationResponse {
  }
  interface PublishDraftAutomationRequest {
      /** Id of the draft automation to publish. */
      automationId: string;
  }
  interface PublishDraftAutomationResponse {
      /** Updated automation after publishing the draft */
      automation?: Automation;
  }
  interface ValidateAutomationRequest {
      /** Automation to validate. */
      automation: Automation;
      /** Settings to customize the validation. */
      validationSettings?: ValidationSettings;
  }
  interface ValidationSettings {
      /**
       * List of specific actions to validate. Only the actions in the list are validated. In this case, triggers are not validated.
       *
       * If the list is empty, the entire automation is validated, including triggers.
       *
       * Default: Empty.
       */
      actionIds?: string[];
      /**
       * Whether to skip provider validations.
       * Default: `false`
       */
      skipProviderValidations?: boolean;
  }
  interface ValidateAutomationResponse {
      /** Whether the automation is valid. */
      valid?: boolean;
      /** List of validation errors for the automation trigger. */
      triggerValidationErrors?: TriggerValidationError[];
      /** List of validation information for the automation actions. */
      actionValidationInfo?: ActionValidationInfo[];
      /** List of additional validation errors for the automation */
      automationValidationErrors?: AutomationValidationError[];
  }
  interface TriggerValidationError extends TriggerValidationErrorErrorOneOf {
      /** Trigger configuration error. */
      configurationError?: TriggerConfigurationError;
      /** Provider configuration error. */
      providerConfigurationError?: ProviderConfigurationError;
      /** Validation error type. */
      errorType?: TriggerValidationErrorValidationErrorType;
      /** Validation error severity */
      severity?: ValidationErrorSeverity;
  }
  /** @oneof */
  interface TriggerValidationErrorErrorOneOf {
      /** Trigger configuration error. */
      configurationError?: TriggerConfigurationError;
      /** Provider configuration error. */
      providerConfigurationError?: ProviderConfigurationError;
  }
  enum TriggerValidationErrorValidationErrorType {
      UNKNOWN_VALIDATION_ERROR_TYPE = "UNKNOWN_VALIDATION_ERROR_TYPE",
      CONFIGURATION_ERROR = "CONFIGURATION_ERROR",
      PROVIDER_ERROR = "PROVIDER_ERROR"
  }
  interface TriggerConfigurationError {
      /** Trigger error type. */
      errorType?: TriggerErrorType;
      /** Related filter field key. */
      filterFieldKey?: string | null;
  }
  enum TriggerErrorType {
      UNKNOWN_TRIGGER_ERROR_TYPE = "UNKNOWN_TRIGGER_ERROR_TYPE",
      NOT_FOUND = "NOT_FOUND",
      APP_NOT_INSTALLED = "APP_NOT_INSTALLED",
      MODERATION_MISMATCH = "MODERATION_MISMATCH",
      DEPRECATED = "DEPRECATED",
      INVALID_TRIGGER_KEY = "INVALID_TRIGGER_KEY",
      INVALID_FILTER_FIELD_KEY = "INVALID_FILTER_FIELD_KEY",
      INVALID_FILTER_EXPRESSION = "INVALID_FILTER_EXPRESSION"
  }
  interface ProviderConfigurationError {
      /** Key corresponding to the field in the schema. */
      fieldKey?: string | null;
      /** Error message. */
      message?: string;
      /** Label for a call-to-action button that's displayed with the error. Translated according to the SPI language context. */
      ctaLabel?: string | null;
      /** URL to redirect to when the call-to-action button is clicked. */
      ctaUrl?: string | null;
      /** Title for the error. */
      title?: string;
  }
  enum ValidationErrorSeverity {
      UNKNOWN_VALIDATION_ERROR_SEVERITY = "UNKNOWN_VALIDATION_ERROR_SEVERITY",
      WARNING = "WARNING",
      ERROR = "ERROR"
  }
  interface ActionValidationInfo {
      /** Action ID. */
      actionId?: string | null;
      /** ID of the app that defines the action. */
      appId?: string;
      /** Human-readable action identifier. */
      actionKey?: string;
      /** List of action validation errors. */
      validationErrors?: ActionValidationError[];
  }
  interface ActionValidationError extends ActionValidationErrorErrorOneOf {
      /** Action configuration error. */
      configurationError?: ActionConfigurationError;
      /** Provider configuration error. */
      providerConfigurationError?: ProviderConfigurationError;
      /** Validation error type. */
      errorType?: ValidationErrorType;
      /** Validation error severity */
      severity?: ValidationErrorSeverity;
  }
  /** @oneof */
  interface ActionValidationErrorErrorOneOf {
      /** Action configuration error. */
      configurationError?: ActionConfigurationError;
      /** Provider configuration error. */
      providerConfigurationError?: ProviderConfigurationError;
  }
  enum ValidationErrorType {
      UNKNOWN_VALIDATION_ERROR_TYPE = "UNKNOWN_VALIDATION_ERROR_TYPE",
      CONFIGURATION_ERROR = "CONFIGURATION_ERROR",
      PROVIDER_ERROR = "PROVIDER_ERROR"
  }
  interface ActionConfigurationError {
      /** Action error type. */
      errorType?: ActionErrorType;
      /** Related field key. */
      fieldKey?: string | null;
  }
  enum ActionErrorType {
      UNKNOWN_ACTION_ERROR_TYPE = "UNKNOWN_ACTION_ERROR_TYPE",
      NOT_FOUND = "NOT_FOUND",
      APP_NOT_INSTALLED = "APP_NOT_INSTALLED",
      MODERATION_MISMATCH = "MODERATION_MISMATCH",
      DEPRECATED = "DEPRECATED",
      INVALID_ACTION_KEY = "INVALID_ACTION_KEY",
      INVALID_MAPPING = "INVALID_MAPPING",
      MAPPING_TYPE_MISMATCH = "MAPPING_TYPE_MISMATCH",
      MAPPING_MISSING_REQUIRED_FIELD = "MAPPING_MISSING_REQUIRED_FIELD",
      MAPPING_SCHEMA_MISMATCH = "MAPPING_SCHEMA_MISMATCH",
      MAPPING_VARIABLE_MISSING_FROM_SCHEMA = "MAPPING_VARIABLE_MISSING_FROM_SCHEMA"
  }
  interface AutomationValidationError extends AutomationValidationErrorErrorOneOf {
      /** Automation configuration error. */
      configurationError?: AutomationConfigurationError;
      /** Provider configuration error. */
      providerConfigurationError?: ProviderConfigurationError;
      /** Validation error type. */
      errorType?: AutomationValidationErrorValidationErrorType;
      /** Validation error severity */
      severity?: ValidationErrorSeverity;
  }
  /** @oneof */
  interface AutomationValidationErrorErrorOneOf {
      /** Automation configuration error. */
      configurationError?: AutomationConfigurationError;
      /** Provider configuration error. */
      providerConfigurationError?: ProviderConfigurationError;
  }
  enum AutomationValidationErrorValidationErrorType {
      UNKNOWN_VALIDATION_ERROR_TYPE = "UNKNOWN_VALIDATION_ERROR_TYPE",
      CONFIGURATION_ERROR = "CONFIGURATION_ERROR",
      PROVIDER_ERROR = "PROVIDER_ERROR"
  }
  interface AutomationConfigurationError {
      /** Automation error type. */
      errorType?: AutomationErrorType;
  }
  enum AutomationErrorType {
      UNKNOWN_AUTOMATION_ERROR_TYPE = "UNKNOWN_AUTOMATION_ERROR_TYPE"
  }
  interface GetAutomationActionSchemaRequest {
      /** Automation ID */
      automationId: string;
      /** Action ID */
      actionId: string;
  }
  interface GetAutomationActionSchemaResponse {
      /** The accumulated payload schema for an action. */
      schema?: Record<string, any> | null;
  }
  interface GetActionsQuotaInfoRequest {
  }
  interface GetActionsQuotaInfoResponse {
      /** List of action quotas. */
      actionProviderQuotaInfo?: ActionProviderQuotaInfo[];
  }
  interface ActionProviderQuotaInfo {
      /** ID of the app that defines the action. */
      appId?: string;
      /** Action key. */
      actionKey?: string;
      /** Action quota information. */
      actionQuotaInfo?: ActionQuotaInfo;
  }
  interface ActionQuotaInfo {
      /**
       * Whether the quotas for your action are enforced. If you mark this as `true` in the response body,
       * Wix displays the information in the quota object on the site dashboard. If you mark this as `false` for
       * a user, Wix does not display any quota info on the site dashboard for your service.
       */
      enforced?: boolean;
      /**
       * The plans your service provides, together with the quotas enforced by each plan. A site may be enrolled
       * in multiple plans. Plans and quotas can be related as follows:
       *
       * + A single plan has a single quota.
       * + A single plan has multiple quotas.
       * + Multiple plans are associated with multiple quotas.
       *
       * Plans and quotas that are related should be grouped together in a single `quotaInfo`
       * object.
       */
      quotaInfo?: QuotaInfo[];
  }
  interface QuotaInfo {
      /** List of plans associated with the site making the request. */
      plans?: Plan[];
      /** List of quotas associated with the plans the site is enrolled in. */
      quotas?: Quota[];
      /**
       * Details for an upgrade call-to-action button.
       * Displayed in the site contributor’s dashboard together with the quota details.
       */
      upgradeCta?: UpgradeCTA;
  }
  interface Plan {
      /** Plan ID defined by the action provider. */
      _id?: string;
      /** Plan name to display in the site contributor’s dashboard. */
      name?: string;
      /**
       * optional - the plan group id
       * @internal
       */
      groupId?: string | null;
  }
  interface Quota {
      /** Name of the feature the quota is related to. For example, "Messages sent". */
      featureName?: string;
      /**
       * Quota renewal date in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.
       * For example, 10 July 2020 at 15:00 is written as `2020-07-10 15:00:00.000`.
       */
      renewalDate?: Date | null;
      /** The user's current quota usage. */
      currentUsage?: string;
      /** Quota limit data. */
      limit?: string | null;
      /** Additional information about the quota. Displayed as a tooltip in the site contributor’s dashboard. */
      additionalInfo?: AdditionalInfo;
  }
  interface CTA {
      /** Call-to-action redirect URL. */
      url?: string;
      /** Call-to-action label. */
      label?: string;
  }
  interface AdditionalInfo {
      /** Tooltip content. */
      description?: string;
      /** Details for an options call-to-action link that appears in the tooltip. */
      cta?: CTA;
  }
  interface UpgradeCTA {
      /** CTA button redirect URL. */
      url?: string;
      /** CTA button label. */
      label?: string;
      /**
       * optional - id of the related plan
       * @internal
       */
      planId?: string | null;
  }
  interface MigrateVeloActionAutomationsRequest {
      oldAppId?: string;
      newAppId?: string;
      newComponentId?: string;
  }
  interface MigrateVeloActionAutomationsResponse {
  }
  /**
   * Get automation revision
   * @param automationId - Automation ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField automationId
   * @permissionId AUTOMATIONS.AUTOMATION_REVISION_READ
   * @adminMethod
   */
  function getAutomationRevision(automationId: string, options?: GetAutomationRevisionOptions): Promise<GetAutomationRevisionResponse>;
  interface GetAutomationRevisionOptions {
      /** Automation revision. */
      revision?: string | null;
  }
  /**
   * Creates an automation.
   * @param automation - Automation to be created.
   * @public
   * @documentationMaturity preview
   * @requiredField automation
   * @requiredField automation.configuration
   * @requiredField automation.configuration.actions
   * @requiredField automation.configuration.rootActionIds
   * @requiredField automation.configuration.status
   * @requiredField automation.configuration.trigger
   * @requiredField automation.configuration.trigger.appId
   * @requiredField automation.configuration.trigger.triggerKey
   * @requiredField automation.name
   * @requiredField automation.origin
   * @permissionId AUTOMATIONS.AUTOMATION_CREATE
   * @adminMethod
   * @returns The created automation.
   */
  function createAutomation(automation: Automation): Promise<Automation>;
  /**
   * Retrieves an automation.
   * @param automationId - Automation ID.
   * @public
   * @documentationMaturity preview
   * @requiredField automationId
   * @permissionId AUTOMATIONS.AUTOMATION_READ
   * @adminMethod
   * @returns The requested automation.
   */
  function getAutomation(automationId: string, options?: GetAutomationOptions): Promise<Automation>;
  interface GetAutomationOptions {
      /** Automation origin. */
      origin?: Origin;
  }
  /**
   * Updates an automation.
   *
   * Each time the automation is updated,
   * `revision` increments by 1.
   * The current `revision` must be passed when updating the automation.
   * This ensures you're working with the latest automation
   * and prevents unintended overwrites.
   * @param _id - Automation ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField automation
   * @requiredField automation.revision
   * @permissionId AUTOMATIONS.AUTOMATION_UPDATE
   * @adminMethod
   * @returns Updated automation.
   */
  function updateAutomation(_id: string | null, automation: UpdateAutomation, options?: UpdateAutomationOptions): Promise<Automation>;
  interface UpdateAutomation {
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
  interface UpdateAutomationOptions {
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Deletes an Automation.
   * @param automationId - Automation ID.
   * @public
   * @documentationMaturity preview
   * @requiredField automationId
   * @permissionId AUTOMATIONS.AUTOMATION_DELETE
   * @adminMethod
   */
  function deleteAutomation(automationId: string): Promise<void>;
  /**
   * Deletes multiple automations.
   * @param automationIds - Automation IDs to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField automationIds
   * @permissionId AUTOMATIONS.AUTOMATION_DELETE
   * @adminMethod
   */
  function bulkDeleteAutomations(automationIds: string[]): Promise<BulkDeleteAutomationsResponse>;
  /**
   * Creates a Preinstalled Automation.
   * @param automation - Preinstalled automation to be created.
   * @public
   * @documentationMaturity preview
   * @requiredField automation
   * @requiredField automation.configuration
   * @requiredField automation.configuration.actions
   * @requiredField automation.configuration.rootActionIds
   * @requiredField automation.configuration.status
   * @requiredField automation.configuration.trigger
   * @requiredField automation.configuration.trigger.appId
   * @requiredField automation.configuration.trigger.triggerKey
   * @requiredField automation.name
   * @permissionId AUTOMATIONS.AUTOMATION_CREATE_PREINSTALLED
   * @adminMethod
   */
  function createPreinstalledAutomation(automation: Automation, options?: CreatePreinstalledAutomationOptions): Promise<CreatePreinstalledAutomationResponse>;
  interface CreatePreinstalledAutomationOptions {
      /** Optional - hide the created automation behind a spec */
      specInfo?: PreinstalledAutomationSpecInfo;
      /**
       * Optional - the information about the original site automation that was used to create this preinstalled automation
       * Usually an existing automation in a site is used to create the preinstalled automation, this is the relevant information.
       */
      originAutomationInfo?: OriginAutomationInfo;
  }
  /**
   * Updates a Preinstalled Automation.
   * @param automation - Preinstalled automation to update.
   * @public
   * @documentationMaturity preview
   * @requiredField automation
   * @requiredField automation.preinstalledInfo
   * @requiredField automation.preinstalledInfo.componentId
   * @requiredField automation.preinstalledInfo.componentVersion
   * @permissionId AUTOMATIONS.AUTOMATION_UPDATE_PREINSTALLED
   * @adminMethod
   */
  function updatePreinstalledAutomation(automation: Automation, options?: UpdatePreinstalledAutomationOptions): Promise<UpdatePreinstalledAutomationResponse>;
  interface UpdatePreinstalledAutomationOptions {
      /** Optional - hide the updated automation behind a spec */
      specInfo?: PreinstalledAutomationSpecInfo;
  }
  /**
   * Deletes a Preinstalled Automation.
   * @param componentId - Preinstalled Component Id
   * @public
   * @documentationMaturity preview
   * @requiredField componentId
   * @permissionId AUTOMATIONS.AUTOMATION_DELETE_PREINSTALLED
   * @adminMethod
   */
  function deletePreinstalledAutomation(componentId: string, options?: DeletePreinstalledAutomationOptions): Promise<void>;
  interface DeletePreinstalledAutomationOptions {
      /**
       * Optional - makes the deletion operation gradual
       * The automation will not return if the variant returns for the site
       */
      specInfo?: PreinstalledAutomationSpecInfo;
  }
  /**
   * Generate a preinstalled automation from another automation
   * Calls the action providers for changes needed to make a preinstalled (e.g. template for email etc)
   * @internal
   * @documentationMaturity preview
   * @requiredField automation
   * @permissionId AUTOMATIONS.GENERATE_PREINSTALLED_AUTOMATION
   * @adminMethod
   */
  function generatePreinstalledAutomation(automation: Automation): Promise<GeneratePreinstalledAutomationResponse>;
  /**
   * Allows an app to query for his preinstalled automations
   * @public
   * @documentationMaturity preview
   * @permissionId AUTOMATIONS.AUTOMATION_QUERY_PREINSTALLED
   * @adminMethod
   */
  function queryPreinstalledAutomationsForApp(options?: QueryPreinstalledAutomationsForAppOptions): Promise<QueryPreinstalledAutomationsForAppResponse>;
  interface QueryPreinstalledAutomationsForAppOptions {
      /** WQL expression. */
      query?: CommonCursorQuery;
  }
  /**
   * Retrieves a list of automations. Max query filter depth is 3.
   *
   * Relevant automations for the query are returned. This includes automations created on the site and pre-installed automations.
   * If there's an existing override for a pre-installed automation, the override is returned in the query result.
   * The query only returns automations from apps that are installed on the site.
   *
   * To learn about working with _Query_ endpoints, see
   * [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language),
   * [Sorting and Paging](https://dev.wix.com/api/rest/getting-started/pagination),
   * and [Field Projection](https://dev.wix.com/api/rest/getting-started/field-projection).
   * @public
   * @documentationMaturity preview
   * @permissionId AUTOMATIONS.AUTOMATION_READ
   * @adminMethod
   */
  function queryAutomations(): AutomationsQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface AutomationsQueryResult extends QueryCursorResult {
      items: Automation[];
      query: AutomationsQueryBuilder;
      next: () => Promise<AutomationsQueryResult>;
      prev: () => Promise<AutomationsQueryResult>;
  }
  interface AutomationsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'name' | 'configuration.status' | 'configuration.trigger.appId' | 'configuration.trigger.triggerKey' | 'origin' | 'settings' | 'settings.readonly' | 'settings.disableDelete' | 'settings.disableStatusChange' | 'settings.actionSettings' | 'settings.actionSettings.permanentActionIds' | 'settings.actionSettings.readonlyActionIds' | 'settings.actionSettings.disableDelayAddition' | 'settings.actionSettings.disableConditionAddition', value: any) => AutomationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: 'name' | 'configuration.status' | 'configuration.trigger.appId' | 'configuration.trigger.triggerKey' | 'origin' | 'settings' | 'settings.readonly' | 'settings.disableDelete' | 'settings.disableStatusChange' | 'settings.actionSettings' | 'settings.actionSettings.permanentActionIds' | 'settings.actionSettings.readonlyActionIds' | 'settings.actionSettings.disableDelayAddition' | 'settings.actionSettings.disableConditionAddition', value: any) => AutomationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: 'name' | 'configuration.trigger.appId' | 'configuration.trigger.triggerKey', value: string) => AutomationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: 'name' | 'configuration.status' | 'configuration.trigger.appId' | 'configuration.trigger.triggerKey' | 'origin' | 'settings' | 'settings.readonly' | 'settings.disableDelete' | 'settings.disableStatusChange' | 'settings.actionSettings' | 'settings.actionSettings.permanentActionIds' | 'settings.actionSettings.readonlyActionIds' | 'settings.actionSettings.disableDelayAddition' | 'settings.actionSettings.disableConditionAddition', value: any[]) => AutomationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasAll: (propertyName: 'settings.actionSettings.permanentActionIds' | 'settings.actionSettings.readonlyActionIds', value: any[]) => AutomationsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'name' | 'configuration.status' | 'configuration.trigger.appId' | 'configuration.trigger.triggerKey' | 'origin' | 'settings' | 'settings.readonly' | 'settings.disableDelete' | 'settings.disableStatusChange' | 'settings.actionSettings' | 'settings.actionSettings.permanentActionIds' | 'settings.actionSettings.readonlyActionIds' | 'settings.actionSettings.disableDelayAddition' | 'settings.actionSettings.disableConditionAddition', value: any) => AutomationsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'name' | 'configuration.status' | 'configuration.trigger.appId' | 'configuration.trigger.triggerKey' | 'origin' | 'settings' | 'settings.readonly' | 'settings.disableDelete' | 'settings.disableStatusChange' | 'settings.actionSettings' | 'settings.actionSettings.permanentActionIds' | 'settings.actionSettings.readonlyActionIds' | 'settings.actionSettings.disableDelayAddition' | 'settings.actionSettings.disableConditionAddition', value: boolean) => AutomationsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'name' | 'configuration.status' | 'configuration.trigger.appId' | 'configuration.trigger.triggerKey' | 'origin' | 'settings' | 'settings.readonly' | 'settings.disableDelete' | 'settings.disableStatusChange' | 'settings.actionSettings' | 'settings.actionSettings.permanentActionIds' | 'settings.actionSettings.readonlyActionIds' | 'settings.actionSettings.disableDelayAddition' | 'settings.actionSettings.disableConditionAddition'>) => AutomationsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'name' | 'configuration.status' | 'configuration.trigger.appId' | 'configuration.trigger.triggerKey' | 'origin' | 'settings' | 'settings.readonly' | 'settings.disableDelete' | 'settings.disableStatusChange' | 'settings.actionSettings' | 'settings.actionSettings.permanentActionIds' | 'settings.actionSettings.readonlyActionIds' | 'settings.actionSettings.disableDelayAddition' | 'settings.actionSettings.disableConditionAddition'>) => AutomationsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => AutomationsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => AutomationsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<AutomationsQueryResult>;
  }
  /**
   * Creates a copy of an action with a new ID, and changes the action's input mapping if necessary.
   *
   * The action copy isn't saved automatically. To save it, the user must perform an action
   * such as clicking the **Save** button.
   * @param automationId - Automation ID.
   * @public
   * @documentationMaturity preview
   * @requiredField automationId
   * @permissionId AUTOMATIONS.AUTOMATION_COPY
   * @adminMethod
   */
  function copyAutomation(automationId: string, options?: CopyAutomationOptions): Promise<CopyAutomationResponse>;
  interface CopyAutomationOptions {
      /** Automation origin. */
      origin?: Origin;
  }
  /**
   * Creates a draft automation.
   * @public
   * @documentationMaturity preview
   * @permissionId AUTOMATIONS.AUTOMATION_DRAFT_CREATE
   * @adminMethod
   */
  function createDraftAutomation(options?: CreateDraftAutomationOptions): Promise<CreateDraftAutomationResponse>;
  interface CreateDraftAutomationOptions {
      /** Draft automation to be created. */
      automation?: Automation;
  }
  /**
   * Gets the draft of the given original automation if exists, or creates one and returns it
   *
   * - if the original automation is a draft, returns the original automation
   * @param originalAutomationId - Original automation id
   * @public
   * @documentationMaturity preview
   * @requiredField originalAutomationId
   * @permissionId AUTOMATIONS.AUTOMATION_DRAFT_CREATE
   * @adminMethod
   */
  function getOrCreateDraftAutomation(originalAutomationId: string): Promise<GetOrCreateDraftAutomationResponse>;
  /**
   * Updates a draft automation
   * @param _id - Automation ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField automation
   * @permissionId AUTOMATIONS.AUTOMATION_DRAFT_UPDATE
   * @adminMethod
   */
  function updateDraftAutomation(_id: string | null, automation: UpdateDraftAutomation, options?: UpdateDraftAutomationOptions): Promise<UpdateDraftAutomationResponse>;
  interface UpdateDraftAutomation {
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
  interface UpdateDraftAutomationOptions {
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Retrieves a list of automations including drafts. Max query filter depth is 3.
   *
   * Relevant automations for the query are returned. This includes automations created on the site and pre-installed automations.
   * If there's an existing override for a pre-installed automation, the override is returned in the query result.
   * The query only returns automations from apps that are installed on the site.
   *
   * - new drafts that are not related to existing automations will be returned in the list
   * - the response will contain a map of originalAutomationId => relatedDrafts
   *
   * To learn about working with _Query_ endpoints, see
   * [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language),
   * [Sorting and Paging](https://dev.wix.com/api/rest/getting-started/pagination),
   * and [Field Projection](https://dev.wix.com/api/rest/getting-started/field-projection).
   * @public
   * @documentationMaturity preview
   * @permissionId AUTOMATIONS.AUTOMATION_DRAFT_READ
   * @adminMethod
   */
  function queryAutomationsWithDrafts(options?: QueryAutomationsWithDraftsOptions): Promise<QueryAutomationsWithDraftsResponse>;
  interface QueryAutomationsWithDraftsOptions {
      /** WQL expression. */
      query?: CursorQuery;
  }
  /**
   * Deletes a draft automation.
   * @param automationId - Id of the draft automation to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField automationId
   * @permissionId AUTOMATIONS.AUTOMATION_DRAFT_DELETE
   * @adminMethod
   */
  function deleteDraftAutomation(automationId: string): Promise<void>;
  /**
   * Publishes a draft automation, applying the changes to live automation
   * @param automationId - Id of the draft automation to publish.
   * @public
   * @documentationMaturity preview
   * @requiredField automationId
   * @permissionId AUTOMATIONS.AUTOMATION_UPDATE
   * @adminMethod
   */
  function publishDraftAutomation(automationId: string): Promise<PublishDraftAutomationResponse>;
  /**
   * Validates the automation without requiring the automation ID to be passed in.
   * @param automation - Automation to validate.
   * @public
   * @documentationMaturity preview
   * @requiredField automation
   * @permissionId AUTOMATIONS.AUTOMATION_VALIDATE
   * @adminMethod
   */
  function validateAutomation(automation: Automation, options?: ValidateAutomationOptions): Promise<ValidateAutomationResponse>;
  interface ValidateAutomationOptions {
      /** Settings to customize the validation. */
      validationSettings?: ValidationSettings;
  }
  /**
   * Gets the payload schema received by the action whose ID is passed in.
   * @public
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.actionId
   * @requiredField identifiers.automationId
   * @permissionId AUTOMATIONS.AUTOMATION_READ
   * @adminMethod
   */
  function getAutomationActionSchema(identifiers: GetAutomationActionSchemaIdentifiers): Promise<GetAutomationActionSchemaResponse>;
  interface GetAutomationActionSchemaIdentifiers {
      /** Automation ID */
      automationId: string;
      /** Action ID */
      actionId: string;
  }
  /**
   * Gets action quota information.
   * @public
   * @documentationMaturity preview
   * @permissionId AUTOMATIONS.AUTOMATION_READ
   * @adminMethod
   */
  function getActionsQuotaInfo(): Promise<GetActionsQuotaInfoResponse>;
  
  type automationsV2Automation_universal_d_Automation = Automation;
  type automationsV2Automation_universal_d_AutomationOriginInfoOneOf = AutomationOriginInfoOneOf;
  type automationsV2Automation_universal_d_ActionSettings = ActionSettings;
  type automationsV2Automation_universal_d_Domain = Domain;
  const automationsV2Automation_universal_d_Domain: typeof Domain;
  type automationsV2Automation_universal_d_Enrichment = Enrichment;
  type automationsV2Automation_universal_d_AuditInfo = AuditInfo;
  type automationsV2Automation_universal_d_AuditInfoIdOneOf = AuditInfoIdOneOf;
  type automationsV2Automation_universal_d_AutomationConfiguration = AutomationConfiguration;
  type automationsV2Automation_universal_d_TimeUnit = TimeUnit;
  const automationsV2Automation_universal_d_TimeUnit: typeof TimeUnit;
  type automationsV2Automation_universal_d_Filter = Filter;
  type automationsV2Automation_universal_d_FutureDateActivationOffset = FutureDateActivationOffset;
  type automationsV2Automation_universal_d_RateLimit = RateLimit;
  type automationsV2Automation_universal_d_ConditionExpressionGroup = ConditionExpressionGroup;
  type automationsV2Automation_universal_d_Operator = Operator;
  const automationsV2Automation_universal_d_Operator: typeof Operator;
  type automationsV2Automation_universal_d_Type = Type;
  const automationsV2Automation_universal_d_Type: typeof Type;
  type automationsV2Automation_universal_d_AppDefinedAction = AppDefinedAction;
  type automationsV2Automation_universal_d_ConditionAction = ConditionAction;
  type automationsV2Automation_universal_d_DelayAction = DelayAction;
  type automationsV2Automation_universal_d_RateLimitAction = RateLimitAction;
  type automationsV2Automation_universal_d_SetVariablesAction = SetVariablesAction;
  type automationsV2Automation_universal_d_OutputAction = OutputAction;
  type automationsV2Automation_universal_d_Status = Status;
  const automationsV2Automation_universal_d_Status: typeof Status;
  type automationsV2Automation_universal_d_Trigger = Trigger;
  type automationsV2Automation_universal_d_Action = Action;
  type automationsV2Automation_universal_d_ActionInfoOneOf = ActionInfoOneOf;
  type automationsV2Automation_universal_d_Origin = Origin;
  const automationsV2Automation_universal_d_Origin: typeof Origin;
  type automationsV2Automation_universal_d_ApplicationOrigin = ApplicationOrigin;
  type automationsV2Automation_universal_d_PreinstalledOrigin = PreinstalledOrigin;
  type automationsV2Automation_universal_d_AutomationSettings = AutomationSettings;
  type automationsV2Automation_universal_d_DraftInfo = DraftInfo;
  type automationsV2Automation_universal_d_Enrichments = Enrichments;
  type automationsV2Automation_universal_d_UpdatedWithPreviousEntity = UpdatedWithPreviousEntity;
  type automationsV2Automation_universal_d_DeletedWithEntity = DeletedWithEntity;
  type automationsV2Automation_universal_d_DraftPublished = DraftPublished;
  type automationsV2Automation_universal_d_GetAutomationRevisionRequest = GetAutomationRevisionRequest;
  type automationsV2Automation_universal_d_GetAutomationRevisionResponse = GetAutomationRevisionResponse;
  type automationsV2Automation_universal_d_DomainEvent = DomainEvent;
  type automationsV2Automation_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type automationsV2Automation_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type automationsV2Automation_universal_d_RestoreInfo = RestoreInfo;
  type automationsV2Automation_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type automationsV2Automation_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type automationsV2Automation_universal_d_ActionEvent = ActionEvent;
  type automationsV2Automation_universal_d_MessageEnvelope = MessageEnvelope;
  type automationsV2Automation_universal_d_IdentificationData = IdentificationData;
  type automationsV2Automation_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type automationsV2Automation_universal_d_WebhookIdentityType = WebhookIdentityType;
  const automationsV2Automation_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  type automationsV2Automation_universal_d_CreateAutomationRequest = CreateAutomationRequest;
  type automationsV2Automation_universal_d_CreateAutomationResponse = CreateAutomationResponse;
  type automationsV2Automation_universal_d_GetAutomationRequest = GetAutomationRequest;
  type automationsV2Automation_universal_d_GetAutomationResponse = GetAutomationResponse;
  type automationsV2Automation_universal_d_UpdateAutomationRequest = UpdateAutomationRequest;
  type automationsV2Automation_universal_d_UpdateAutomationResponse = UpdateAutomationResponse;
  type automationsV2Automation_universal_d_DeleteAutomationRequest = DeleteAutomationRequest;
  type automationsV2Automation_universal_d_DeleteAutomationResponse = DeleteAutomationResponse;
  type automationsV2Automation_universal_d_BulkDeleteAutomationsRequest = BulkDeleteAutomationsRequest;
  type automationsV2Automation_universal_d_BulkDeleteAutomationsResponse = BulkDeleteAutomationsResponse;
  type automationsV2Automation_universal_d_BulkDeleteResult = BulkDeleteResult;
  type automationsV2Automation_universal_d_ItemMetadata = ItemMetadata;
  type automationsV2Automation_universal_d_ApplicationError = ApplicationError;
  type automationsV2Automation_universal_d_BulkActionMetadata = BulkActionMetadata;
  type automationsV2Automation_universal_d_CreatePreinstalledAutomationRequest = CreatePreinstalledAutomationRequest;
  type automationsV2Automation_universal_d_PreinstalledAutomationSpecInfo = PreinstalledAutomationSpecInfo;
  type automationsV2Automation_universal_d_OriginAutomationInfo = OriginAutomationInfo;
  type automationsV2Automation_universal_d_CreatePreinstalledAutomationResponse = CreatePreinstalledAutomationResponse;
  type automationsV2Automation_universal_d_UpdatePreinstalledAutomationRequest = UpdatePreinstalledAutomationRequest;
  type automationsV2Automation_universal_d_UpdatePreinstalledAutomationResponse = UpdatePreinstalledAutomationResponse;
  type automationsV2Automation_universal_d_DeletePreinstalledAutomationRequest = DeletePreinstalledAutomationRequest;
  type automationsV2Automation_universal_d_DeletePreinstalledAutomationResponse = DeletePreinstalledAutomationResponse;
  type automationsV2Automation_universal_d_GeneratePreinstalledAutomationRequest = GeneratePreinstalledAutomationRequest;
  type automationsV2Automation_universal_d_GeneratePreinstalledAutomationResponse = GeneratePreinstalledAutomationResponse;
  type automationsV2Automation_universal_d_QueryPreinstalledAutomationsForAppRequest = QueryPreinstalledAutomationsForAppRequest;
  type automationsV2Automation_universal_d_CommonCursorQuery = CommonCursorQuery;
  type automationsV2Automation_universal_d_CommonCursorQueryPagingMethodOneOf = CommonCursorQueryPagingMethodOneOf;
  type automationsV2Automation_universal_d_CommonSorting = CommonSorting;
  type automationsV2Automation_universal_d_CommonSortOrder = CommonSortOrder;
  const automationsV2Automation_universal_d_CommonSortOrder: typeof CommonSortOrder;
  type automationsV2Automation_universal_d_CommonCursorPaging = CommonCursorPaging;
  type automationsV2Automation_universal_d_QueryPreinstalledAutomationsForAppResponse = QueryPreinstalledAutomationsForAppResponse;
  type automationsV2Automation_universal_d_CommonCursorPagingMetadata = CommonCursorPagingMetadata;
  type automationsV2Automation_universal_d_CommonCursors = CommonCursors;
  type automationsV2Automation_universal_d_QueryAutomationsRequest = QueryAutomationsRequest;
  type automationsV2Automation_universal_d_CursorQuery = CursorQuery;
  type automationsV2Automation_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type automationsV2Automation_universal_d_Sorting = Sorting;
  type automationsV2Automation_universal_d_SortOrder = SortOrder;
  const automationsV2Automation_universal_d_SortOrder: typeof SortOrder;
  type automationsV2Automation_universal_d_CursorPaging = CursorPaging;
  type automationsV2Automation_universal_d_QueryAutomationsResponse = QueryAutomationsResponse;
  type automationsV2Automation_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type automationsV2Automation_universal_d_Cursors = Cursors;
  type automationsV2Automation_universal_d_Empty = Empty;
  type automationsV2Automation_universal_d_CopyAutomationRequest = CopyAutomationRequest;
  type automationsV2Automation_universal_d_CopyAutomationResponse = CopyAutomationResponse;
  type automationsV2Automation_universal_d_MetaSiteSpecialEvent = MetaSiteSpecialEvent;
  type automationsV2Automation_universal_d_MetaSiteSpecialEventPayloadOneOf = MetaSiteSpecialEventPayloadOneOf;
  type automationsV2Automation_universal_d_Asset = Asset;
  type automationsV2Automation_universal_d_State = State;
  const automationsV2Automation_universal_d_State: typeof State;
  type automationsV2Automation_universal_d_SiteCreated = SiteCreated;
  type automationsV2Automation_universal_d_SiteCreatedContext = SiteCreatedContext;
  const automationsV2Automation_universal_d_SiteCreatedContext: typeof SiteCreatedContext;
  type automationsV2Automation_universal_d_Namespace = Namespace;
  const automationsV2Automation_universal_d_Namespace: typeof Namespace;
  type automationsV2Automation_universal_d_SiteTransferred = SiteTransferred;
  type automationsV2Automation_universal_d_SiteDeleted = SiteDeleted;
  type automationsV2Automation_universal_d_DeleteContext = DeleteContext;
  type automationsV2Automation_universal_d_DeleteStatus = DeleteStatus;
  const automationsV2Automation_universal_d_DeleteStatus: typeof DeleteStatus;
  type automationsV2Automation_universal_d_SiteUndeleted = SiteUndeleted;
  type automationsV2Automation_universal_d_SitePublished = SitePublished;
  type automationsV2Automation_universal_d_SiteUnpublished = SiteUnpublished;
  type automationsV2Automation_universal_d_SiteMarkedAsTemplate = SiteMarkedAsTemplate;
  type automationsV2Automation_universal_d_SiteMarkedAsWixSite = SiteMarkedAsWixSite;
  type automationsV2Automation_universal_d_ServiceProvisioned = ServiceProvisioned;
  type automationsV2Automation_universal_d_ServiceRemoved = ServiceRemoved;
  type automationsV2Automation_universal_d_SiteRenamed = SiteRenamed;
  type automationsV2Automation_universal_d_SiteHardDeleted = SiteHardDeleted;
  type automationsV2Automation_universal_d_NamespaceChanged = NamespaceChanged;
  type automationsV2Automation_universal_d_StudioAssigned = StudioAssigned;
  type automationsV2Automation_universal_d_StudioUnassigned = StudioUnassigned;
  type automationsV2Automation_universal_d_CreateDraftAutomationRequest = CreateDraftAutomationRequest;
  type automationsV2Automation_universal_d_CreateDraftAutomationResponse = CreateDraftAutomationResponse;
  type automationsV2Automation_universal_d_GetOrCreateDraftAutomationRequest = GetOrCreateDraftAutomationRequest;
  type automationsV2Automation_universal_d_GetOrCreateDraftAutomationResponse = GetOrCreateDraftAutomationResponse;
  type automationsV2Automation_universal_d_UpdateDraftAutomationRequest = UpdateDraftAutomationRequest;
  type automationsV2Automation_universal_d_UpdateDraftAutomationResponse = UpdateDraftAutomationResponse;
  type automationsV2Automation_universal_d_QueryAutomationsWithDraftsRequest = QueryAutomationsWithDraftsRequest;
  type automationsV2Automation_universal_d_QueryAutomationsWithDraftsResponse = QueryAutomationsWithDraftsResponse;
  type automationsV2Automation_universal_d_DraftsInfo = DraftsInfo;
  type automationsV2Automation_universal_d_DeleteDraftAutomationRequest = DeleteDraftAutomationRequest;
  type automationsV2Automation_universal_d_DeleteDraftAutomationResponse = DeleteDraftAutomationResponse;
  type automationsV2Automation_universal_d_PublishDraftAutomationRequest = PublishDraftAutomationRequest;
  type automationsV2Automation_universal_d_PublishDraftAutomationResponse = PublishDraftAutomationResponse;
  type automationsV2Automation_universal_d_ValidateAutomationRequest = ValidateAutomationRequest;
  type automationsV2Automation_universal_d_ValidationSettings = ValidationSettings;
  type automationsV2Automation_universal_d_ValidateAutomationResponse = ValidateAutomationResponse;
  type automationsV2Automation_universal_d_TriggerValidationError = TriggerValidationError;
  type automationsV2Automation_universal_d_TriggerValidationErrorErrorOneOf = TriggerValidationErrorErrorOneOf;
  type automationsV2Automation_universal_d_TriggerValidationErrorValidationErrorType = TriggerValidationErrorValidationErrorType;
  const automationsV2Automation_universal_d_TriggerValidationErrorValidationErrorType: typeof TriggerValidationErrorValidationErrorType;
  type automationsV2Automation_universal_d_TriggerConfigurationError = TriggerConfigurationError;
  type automationsV2Automation_universal_d_TriggerErrorType = TriggerErrorType;
  const automationsV2Automation_universal_d_TriggerErrorType: typeof TriggerErrorType;
  type automationsV2Automation_universal_d_ProviderConfigurationError = ProviderConfigurationError;
  type automationsV2Automation_universal_d_ValidationErrorSeverity = ValidationErrorSeverity;
  const automationsV2Automation_universal_d_ValidationErrorSeverity: typeof ValidationErrorSeverity;
  type automationsV2Automation_universal_d_ActionValidationInfo = ActionValidationInfo;
  type automationsV2Automation_universal_d_ActionValidationError = ActionValidationError;
  type automationsV2Automation_universal_d_ActionValidationErrorErrorOneOf = ActionValidationErrorErrorOneOf;
  type automationsV2Automation_universal_d_ValidationErrorType = ValidationErrorType;
  const automationsV2Automation_universal_d_ValidationErrorType: typeof ValidationErrorType;
  type automationsV2Automation_universal_d_ActionConfigurationError = ActionConfigurationError;
  type automationsV2Automation_universal_d_ActionErrorType = ActionErrorType;
  const automationsV2Automation_universal_d_ActionErrorType: typeof ActionErrorType;
  type automationsV2Automation_universal_d_AutomationValidationError = AutomationValidationError;
  type automationsV2Automation_universal_d_AutomationValidationErrorErrorOneOf = AutomationValidationErrorErrorOneOf;
  type automationsV2Automation_universal_d_AutomationValidationErrorValidationErrorType = AutomationValidationErrorValidationErrorType;
  const automationsV2Automation_universal_d_AutomationValidationErrorValidationErrorType: typeof AutomationValidationErrorValidationErrorType;
  type automationsV2Automation_universal_d_AutomationConfigurationError = AutomationConfigurationError;
  type automationsV2Automation_universal_d_AutomationErrorType = AutomationErrorType;
  const automationsV2Automation_universal_d_AutomationErrorType: typeof AutomationErrorType;
  type automationsV2Automation_universal_d_GetAutomationActionSchemaRequest = GetAutomationActionSchemaRequest;
  type automationsV2Automation_universal_d_GetAutomationActionSchemaResponse = GetAutomationActionSchemaResponse;
  type automationsV2Automation_universal_d_GetActionsQuotaInfoRequest = GetActionsQuotaInfoRequest;
  type automationsV2Automation_universal_d_GetActionsQuotaInfoResponse = GetActionsQuotaInfoResponse;
  type automationsV2Automation_universal_d_ActionProviderQuotaInfo = ActionProviderQuotaInfo;
  type automationsV2Automation_universal_d_ActionQuotaInfo = ActionQuotaInfo;
  type automationsV2Automation_universal_d_QuotaInfo = QuotaInfo;
  type automationsV2Automation_universal_d_Plan = Plan;
  type automationsV2Automation_universal_d_Quota = Quota;
  type automationsV2Automation_universal_d_CTA = CTA;
  type automationsV2Automation_universal_d_AdditionalInfo = AdditionalInfo;
  type automationsV2Automation_universal_d_UpgradeCTA = UpgradeCTA;
  type automationsV2Automation_universal_d_MigrateVeloActionAutomationsRequest = MigrateVeloActionAutomationsRequest;
  type automationsV2Automation_universal_d_MigrateVeloActionAutomationsResponse = MigrateVeloActionAutomationsResponse;
  const automationsV2Automation_universal_d_getAutomationRevision: typeof getAutomationRevision;
  type automationsV2Automation_universal_d_GetAutomationRevisionOptions = GetAutomationRevisionOptions;
  const automationsV2Automation_universal_d_createAutomation: typeof createAutomation;
  const automationsV2Automation_universal_d_getAutomation: typeof getAutomation;
  type automationsV2Automation_universal_d_GetAutomationOptions = GetAutomationOptions;
  const automationsV2Automation_universal_d_updateAutomation: typeof updateAutomation;
  type automationsV2Automation_universal_d_UpdateAutomation = UpdateAutomation;
  type automationsV2Automation_universal_d_UpdateAutomationOptions = UpdateAutomationOptions;
  const automationsV2Automation_universal_d_deleteAutomation: typeof deleteAutomation;
  const automationsV2Automation_universal_d_bulkDeleteAutomations: typeof bulkDeleteAutomations;
  const automationsV2Automation_universal_d_createPreinstalledAutomation: typeof createPreinstalledAutomation;
  type automationsV2Automation_universal_d_CreatePreinstalledAutomationOptions = CreatePreinstalledAutomationOptions;
  const automationsV2Automation_universal_d_updatePreinstalledAutomation: typeof updatePreinstalledAutomation;
  type automationsV2Automation_universal_d_UpdatePreinstalledAutomationOptions = UpdatePreinstalledAutomationOptions;
  const automationsV2Automation_universal_d_deletePreinstalledAutomation: typeof deletePreinstalledAutomation;
  type automationsV2Automation_universal_d_DeletePreinstalledAutomationOptions = DeletePreinstalledAutomationOptions;
  const automationsV2Automation_universal_d_generatePreinstalledAutomation: typeof generatePreinstalledAutomation;
  const automationsV2Automation_universal_d_queryPreinstalledAutomationsForApp: typeof queryPreinstalledAutomationsForApp;
  type automationsV2Automation_universal_d_QueryPreinstalledAutomationsForAppOptions = QueryPreinstalledAutomationsForAppOptions;
  const automationsV2Automation_universal_d_queryAutomations: typeof queryAutomations;
  type automationsV2Automation_universal_d_AutomationsQueryResult = AutomationsQueryResult;
  type automationsV2Automation_universal_d_AutomationsQueryBuilder = AutomationsQueryBuilder;
  const automationsV2Automation_universal_d_copyAutomation: typeof copyAutomation;
  type automationsV2Automation_universal_d_CopyAutomationOptions = CopyAutomationOptions;
  const automationsV2Automation_universal_d_createDraftAutomation: typeof createDraftAutomation;
  type automationsV2Automation_universal_d_CreateDraftAutomationOptions = CreateDraftAutomationOptions;
  const automationsV2Automation_universal_d_getOrCreateDraftAutomation: typeof getOrCreateDraftAutomation;
  const automationsV2Automation_universal_d_updateDraftAutomation: typeof updateDraftAutomation;
  type automationsV2Automation_universal_d_UpdateDraftAutomation = UpdateDraftAutomation;
  type automationsV2Automation_universal_d_UpdateDraftAutomationOptions = UpdateDraftAutomationOptions;
  const automationsV2Automation_universal_d_queryAutomationsWithDrafts: typeof queryAutomationsWithDrafts;
  type automationsV2Automation_universal_d_QueryAutomationsWithDraftsOptions = QueryAutomationsWithDraftsOptions;
  const automationsV2Automation_universal_d_deleteDraftAutomation: typeof deleteDraftAutomation;
  const automationsV2Automation_universal_d_publishDraftAutomation: typeof publishDraftAutomation;
  const automationsV2Automation_universal_d_validateAutomation: typeof validateAutomation;
  type automationsV2Automation_universal_d_ValidateAutomationOptions = ValidateAutomationOptions;
  const automationsV2Automation_universal_d_getAutomationActionSchema: typeof getAutomationActionSchema;
  type automationsV2Automation_universal_d_GetAutomationActionSchemaIdentifiers = GetAutomationActionSchemaIdentifiers;
  const automationsV2Automation_universal_d_getActionsQuotaInfo: typeof getActionsQuotaInfo;
  namespace automationsV2Automation_universal_d {
    export {
      automationsV2Automation_universal_d_Automation as Automation,
      automationsV2Automation_universal_d_AutomationOriginInfoOneOf as AutomationOriginInfoOneOf,
      automationsV2Automation_universal_d_ActionSettings as ActionSettings,
      automationsV2Automation_universal_d_Domain as Domain,
      automationsV2Automation_universal_d_Enrichment as Enrichment,
      automationsV2Automation_universal_d_AuditInfo as AuditInfo,
      automationsV2Automation_universal_d_AuditInfoIdOneOf as AuditInfoIdOneOf,
      automationsV2Automation_universal_d_AutomationConfiguration as AutomationConfiguration,
      automationsV2Automation_universal_d_TimeUnit as TimeUnit,
      automationsV2Automation_universal_d_Filter as Filter,
      automationsV2Automation_universal_d_FutureDateActivationOffset as FutureDateActivationOffset,
      automationsV2Automation_universal_d_RateLimit as RateLimit,
      automationsV2Automation_universal_d_ConditionExpressionGroup as ConditionExpressionGroup,
      automationsV2Automation_universal_d_Operator as Operator,
      automationsV2Automation_universal_d_Type as Type,
      automationsV2Automation_universal_d_AppDefinedAction as AppDefinedAction,
      automationsV2Automation_universal_d_ConditionAction as ConditionAction,
      automationsV2Automation_universal_d_DelayAction as DelayAction,
      automationsV2Automation_universal_d_RateLimitAction as RateLimitAction,
      automationsV2Automation_universal_d_SetVariablesAction as SetVariablesAction,
      automationsV2Automation_universal_d_OutputAction as OutputAction,
      automationsV2Automation_universal_d_Status as Status,
      automationsV2Automation_universal_d_Trigger as Trigger,
      automationsV2Automation_universal_d_Action as Action,
      automationsV2Automation_universal_d_ActionInfoOneOf as ActionInfoOneOf,
      automationsV2Automation_universal_d_Origin as Origin,
      automationsV2Automation_universal_d_ApplicationOrigin as ApplicationOrigin,
      automationsV2Automation_universal_d_PreinstalledOrigin as PreinstalledOrigin,
      automationsV2Automation_universal_d_AutomationSettings as AutomationSettings,
      automationsV2Automation_universal_d_DraftInfo as DraftInfo,
      automationsV2Automation_universal_d_Enrichments as Enrichments,
      automationsV2Automation_universal_d_UpdatedWithPreviousEntity as UpdatedWithPreviousEntity,
      automationsV2Automation_universal_d_DeletedWithEntity as DeletedWithEntity,
      automationsV2Automation_universal_d_DraftPublished as DraftPublished,
      automationsV2Automation_universal_d_GetAutomationRevisionRequest as GetAutomationRevisionRequest,
      automationsV2Automation_universal_d_GetAutomationRevisionResponse as GetAutomationRevisionResponse,
      automationsV2Automation_universal_d_DomainEvent as DomainEvent,
      automationsV2Automation_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      automationsV2Automation_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      automationsV2Automation_universal_d_RestoreInfo as RestoreInfo,
      automationsV2Automation_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      automationsV2Automation_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      automationsV2Automation_universal_d_ActionEvent as ActionEvent,
      automationsV2Automation_universal_d_MessageEnvelope as MessageEnvelope,
      automationsV2Automation_universal_d_IdentificationData as IdentificationData,
      automationsV2Automation_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      automationsV2Automation_universal_d_WebhookIdentityType as WebhookIdentityType,
      automationsV2Automation_universal_d_CreateAutomationRequest as CreateAutomationRequest,
      automationsV2Automation_universal_d_CreateAutomationResponse as CreateAutomationResponse,
      automationsV2Automation_universal_d_GetAutomationRequest as GetAutomationRequest,
      automationsV2Automation_universal_d_GetAutomationResponse as GetAutomationResponse,
      automationsV2Automation_universal_d_UpdateAutomationRequest as UpdateAutomationRequest,
      automationsV2Automation_universal_d_UpdateAutomationResponse as UpdateAutomationResponse,
      automationsV2Automation_universal_d_DeleteAutomationRequest as DeleteAutomationRequest,
      automationsV2Automation_universal_d_DeleteAutomationResponse as DeleteAutomationResponse,
      automationsV2Automation_universal_d_BulkDeleteAutomationsRequest as BulkDeleteAutomationsRequest,
      automationsV2Automation_universal_d_BulkDeleteAutomationsResponse as BulkDeleteAutomationsResponse,
      automationsV2Automation_universal_d_BulkDeleteResult as BulkDeleteResult,
      automationsV2Automation_universal_d_ItemMetadata as ItemMetadata,
      automationsV2Automation_universal_d_ApplicationError as ApplicationError,
      automationsV2Automation_universal_d_BulkActionMetadata as BulkActionMetadata,
      automationsV2Automation_universal_d_CreatePreinstalledAutomationRequest as CreatePreinstalledAutomationRequest,
      automationsV2Automation_universal_d_PreinstalledAutomationSpecInfo as PreinstalledAutomationSpecInfo,
      automationsV2Automation_universal_d_OriginAutomationInfo as OriginAutomationInfo,
      automationsV2Automation_universal_d_CreatePreinstalledAutomationResponse as CreatePreinstalledAutomationResponse,
      automationsV2Automation_universal_d_UpdatePreinstalledAutomationRequest as UpdatePreinstalledAutomationRequest,
      automationsV2Automation_universal_d_UpdatePreinstalledAutomationResponse as UpdatePreinstalledAutomationResponse,
      automationsV2Automation_universal_d_DeletePreinstalledAutomationRequest as DeletePreinstalledAutomationRequest,
      automationsV2Automation_universal_d_DeletePreinstalledAutomationResponse as DeletePreinstalledAutomationResponse,
      automationsV2Automation_universal_d_GeneratePreinstalledAutomationRequest as GeneratePreinstalledAutomationRequest,
      automationsV2Automation_universal_d_GeneratePreinstalledAutomationResponse as GeneratePreinstalledAutomationResponse,
      automationsV2Automation_universal_d_QueryPreinstalledAutomationsForAppRequest as QueryPreinstalledAutomationsForAppRequest,
      automationsV2Automation_universal_d_CommonCursorQuery as CommonCursorQuery,
      automationsV2Automation_universal_d_CommonCursorQueryPagingMethodOneOf as CommonCursorQueryPagingMethodOneOf,
      automationsV2Automation_universal_d_CommonSorting as CommonSorting,
      automationsV2Automation_universal_d_CommonSortOrder as CommonSortOrder,
      automationsV2Automation_universal_d_CommonCursorPaging as CommonCursorPaging,
      automationsV2Automation_universal_d_QueryPreinstalledAutomationsForAppResponse as QueryPreinstalledAutomationsForAppResponse,
      automationsV2Automation_universal_d_CommonCursorPagingMetadata as CommonCursorPagingMetadata,
      automationsV2Automation_universal_d_CommonCursors as CommonCursors,
      automationsV2Automation_universal_d_QueryAutomationsRequest as QueryAutomationsRequest,
      automationsV2Automation_universal_d_CursorQuery as CursorQuery,
      automationsV2Automation_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      automationsV2Automation_universal_d_Sorting as Sorting,
      automationsV2Automation_universal_d_SortOrder as SortOrder,
      automationsV2Automation_universal_d_CursorPaging as CursorPaging,
      automationsV2Automation_universal_d_QueryAutomationsResponse as QueryAutomationsResponse,
      automationsV2Automation_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      automationsV2Automation_universal_d_Cursors as Cursors,
      automationsV2Automation_universal_d_Empty as Empty,
      automationsV2Automation_universal_d_CopyAutomationRequest as CopyAutomationRequest,
      automationsV2Automation_universal_d_CopyAutomationResponse as CopyAutomationResponse,
      automationsV2Automation_universal_d_MetaSiteSpecialEvent as MetaSiteSpecialEvent,
      automationsV2Automation_universal_d_MetaSiteSpecialEventPayloadOneOf as MetaSiteSpecialEventPayloadOneOf,
      automationsV2Automation_universal_d_Asset as Asset,
      automationsV2Automation_universal_d_State as State,
      automationsV2Automation_universal_d_SiteCreated as SiteCreated,
      automationsV2Automation_universal_d_SiteCreatedContext as SiteCreatedContext,
      automationsV2Automation_universal_d_Namespace as Namespace,
      automationsV2Automation_universal_d_SiteTransferred as SiteTransferred,
      automationsV2Automation_universal_d_SiteDeleted as SiteDeleted,
      automationsV2Automation_universal_d_DeleteContext as DeleteContext,
      automationsV2Automation_universal_d_DeleteStatus as DeleteStatus,
      automationsV2Automation_universal_d_SiteUndeleted as SiteUndeleted,
      automationsV2Automation_universal_d_SitePublished as SitePublished,
      automationsV2Automation_universal_d_SiteUnpublished as SiteUnpublished,
      automationsV2Automation_universal_d_SiteMarkedAsTemplate as SiteMarkedAsTemplate,
      automationsV2Automation_universal_d_SiteMarkedAsWixSite as SiteMarkedAsWixSite,
      automationsV2Automation_universal_d_ServiceProvisioned as ServiceProvisioned,
      automationsV2Automation_universal_d_ServiceRemoved as ServiceRemoved,
      automationsV2Automation_universal_d_SiteRenamed as SiteRenamed,
      automationsV2Automation_universal_d_SiteHardDeleted as SiteHardDeleted,
      automationsV2Automation_universal_d_NamespaceChanged as NamespaceChanged,
      automationsV2Automation_universal_d_StudioAssigned as StudioAssigned,
      automationsV2Automation_universal_d_StudioUnassigned as StudioUnassigned,
      automationsV2Automation_universal_d_CreateDraftAutomationRequest as CreateDraftAutomationRequest,
      automationsV2Automation_universal_d_CreateDraftAutomationResponse as CreateDraftAutomationResponse,
      automationsV2Automation_universal_d_GetOrCreateDraftAutomationRequest as GetOrCreateDraftAutomationRequest,
      automationsV2Automation_universal_d_GetOrCreateDraftAutomationResponse as GetOrCreateDraftAutomationResponse,
      automationsV2Automation_universal_d_UpdateDraftAutomationRequest as UpdateDraftAutomationRequest,
      automationsV2Automation_universal_d_UpdateDraftAutomationResponse as UpdateDraftAutomationResponse,
      automationsV2Automation_universal_d_QueryAutomationsWithDraftsRequest as QueryAutomationsWithDraftsRequest,
      automationsV2Automation_universal_d_QueryAutomationsWithDraftsResponse as QueryAutomationsWithDraftsResponse,
      automationsV2Automation_universal_d_DraftsInfo as DraftsInfo,
      automationsV2Automation_universal_d_DeleteDraftAutomationRequest as DeleteDraftAutomationRequest,
      automationsV2Automation_universal_d_DeleteDraftAutomationResponse as DeleteDraftAutomationResponse,
      automationsV2Automation_universal_d_PublishDraftAutomationRequest as PublishDraftAutomationRequest,
      automationsV2Automation_universal_d_PublishDraftAutomationResponse as PublishDraftAutomationResponse,
      automationsV2Automation_universal_d_ValidateAutomationRequest as ValidateAutomationRequest,
      automationsV2Automation_universal_d_ValidationSettings as ValidationSettings,
      automationsV2Automation_universal_d_ValidateAutomationResponse as ValidateAutomationResponse,
      automationsV2Automation_universal_d_TriggerValidationError as TriggerValidationError,
      automationsV2Automation_universal_d_TriggerValidationErrorErrorOneOf as TriggerValidationErrorErrorOneOf,
      automationsV2Automation_universal_d_TriggerValidationErrorValidationErrorType as TriggerValidationErrorValidationErrorType,
      automationsV2Automation_universal_d_TriggerConfigurationError as TriggerConfigurationError,
      automationsV2Automation_universal_d_TriggerErrorType as TriggerErrorType,
      automationsV2Automation_universal_d_ProviderConfigurationError as ProviderConfigurationError,
      automationsV2Automation_universal_d_ValidationErrorSeverity as ValidationErrorSeverity,
      automationsV2Automation_universal_d_ActionValidationInfo as ActionValidationInfo,
      automationsV2Automation_universal_d_ActionValidationError as ActionValidationError,
      automationsV2Automation_universal_d_ActionValidationErrorErrorOneOf as ActionValidationErrorErrorOneOf,
      automationsV2Automation_universal_d_ValidationErrorType as ValidationErrorType,
      automationsV2Automation_universal_d_ActionConfigurationError as ActionConfigurationError,
      automationsV2Automation_universal_d_ActionErrorType as ActionErrorType,
      automationsV2Automation_universal_d_AutomationValidationError as AutomationValidationError,
      automationsV2Automation_universal_d_AutomationValidationErrorErrorOneOf as AutomationValidationErrorErrorOneOf,
      automationsV2Automation_universal_d_AutomationValidationErrorValidationErrorType as AutomationValidationErrorValidationErrorType,
      automationsV2Automation_universal_d_AutomationConfigurationError as AutomationConfigurationError,
      automationsV2Automation_universal_d_AutomationErrorType as AutomationErrorType,
      automationsV2Automation_universal_d_GetAutomationActionSchemaRequest as GetAutomationActionSchemaRequest,
      automationsV2Automation_universal_d_GetAutomationActionSchemaResponse as GetAutomationActionSchemaResponse,
      automationsV2Automation_universal_d_GetActionsQuotaInfoRequest as GetActionsQuotaInfoRequest,
      automationsV2Automation_universal_d_GetActionsQuotaInfoResponse as GetActionsQuotaInfoResponse,
      automationsV2Automation_universal_d_ActionProviderQuotaInfo as ActionProviderQuotaInfo,
      automationsV2Automation_universal_d_ActionQuotaInfo as ActionQuotaInfo,
      automationsV2Automation_universal_d_QuotaInfo as QuotaInfo,
      automationsV2Automation_universal_d_Plan as Plan,
      automationsV2Automation_universal_d_Quota as Quota,
      automationsV2Automation_universal_d_CTA as CTA,
      automationsV2Automation_universal_d_AdditionalInfo as AdditionalInfo,
      automationsV2Automation_universal_d_UpgradeCTA as UpgradeCTA,
      automationsV2Automation_universal_d_MigrateVeloActionAutomationsRequest as MigrateVeloActionAutomationsRequest,
      automationsV2Automation_universal_d_MigrateVeloActionAutomationsResponse as MigrateVeloActionAutomationsResponse,
      automationsV2Automation_universal_d_getAutomationRevision as getAutomationRevision,
      automationsV2Automation_universal_d_GetAutomationRevisionOptions as GetAutomationRevisionOptions,
      automationsV2Automation_universal_d_createAutomation as createAutomation,
      automationsV2Automation_universal_d_getAutomation as getAutomation,
      automationsV2Automation_universal_d_GetAutomationOptions as GetAutomationOptions,
      automationsV2Automation_universal_d_updateAutomation as updateAutomation,
      automationsV2Automation_universal_d_UpdateAutomation as UpdateAutomation,
      automationsV2Automation_universal_d_UpdateAutomationOptions as UpdateAutomationOptions,
      automationsV2Automation_universal_d_deleteAutomation as deleteAutomation,
      automationsV2Automation_universal_d_bulkDeleteAutomations as bulkDeleteAutomations,
      automationsV2Automation_universal_d_createPreinstalledAutomation as createPreinstalledAutomation,
      automationsV2Automation_universal_d_CreatePreinstalledAutomationOptions as CreatePreinstalledAutomationOptions,
      automationsV2Automation_universal_d_updatePreinstalledAutomation as updatePreinstalledAutomation,
      automationsV2Automation_universal_d_UpdatePreinstalledAutomationOptions as UpdatePreinstalledAutomationOptions,
      automationsV2Automation_universal_d_deletePreinstalledAutomation as deletePreinstalledAutomation,
      automationsV2Automation_universal_d_DeletePreinstalledAutomationOptions as DeletePreinstalledAutomationOptions,
      automationsV2Automation_universal_d_generatePreinstalledAutomation as generatePreinstalledAutomation,
      automationsV2Automation_universal_d_queryPreinstalledAutomationsForApp as queryPreinstalledAutomationsForApp,
      automationsV2Automation_universal_d_QueryPreinstalledAutomationsForAppOptions as QueryPreinstalledAutomationsForAppOptions,
      automationsV2Automation_universal_d_queryAutomations as queryAutomations,
      automationsV2Automation_universal_d_AutomationsQueryResult as AutomationsQueryResult,
      automationsV2Automation_universal_d_AutomationsQueryBuilder as AutomationsQueryBuilder,
      automationsV2Automation_universal_d_copyAutomation as copyAutomation,
      automationsV2Automation_universal_d_CopyAutomationOptions as CopyAutomationOptions,
      automationsV2Automation_universal_d_createDraftAutomation as createDraftAutomation,
      automationsV2Automation_universal_d_CreateDraftAutomationOptions as CreateDraftAutomationOptions,
      automationsV2Automation_universal_d_getOrCreateDraftAutomation as getOrCreateDraftAutomation,
      automationsV2Automation_universal_d_updateDraftAutomation as updateDraftAutomation,
      automationsV2Automation_universal_d_UpdateDraftAutomation as UpdateDraftAutomation,
      automationsV2Automation_universal_d_UpdateDraftAutomationOptions as UpdateDraftAutomationOptions,
      automationsV2Automation_universal_d_queryAutomationsWithDrafts as queryAutomationsWithDrafts,
      automationsV2Automation_universal_d_QueryAutomationsWithDraftsOptions as QueryAutomationsWithDraftsOptions,
      automationsV2Automation_universal_d_deleteDraftAutomation as deleteDraftAutomation,
      automationsV2Automation_universal_d_publishDraftAutomation as publishDraftAutomation,
      automationsV2Automation_universal_d_validateAutomation as validateAutomation,
      automationsV2Automation_universal_d_ValidateAutomationOptions as ValidateAutomationOptions,
      automationsV2Automation_universal_d_getAutomationActionSchema as getAutomationActionSchema,
      automationsV2Automation_universal_d_GetAutomationActionSchemaIdentifiers as GetAutomationActionSchemaIdentifiers,
      automationsV2Automation_universal_d_getActionsQuotaInfo as getActionsQuotaInfo,
    };
  }
  
  export { automationsV2Activation_universal_d as activations, automationsV2Automation_universal_d as automationsServiceV2 };
}
