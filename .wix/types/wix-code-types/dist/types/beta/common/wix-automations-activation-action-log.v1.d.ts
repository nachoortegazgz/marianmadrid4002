declare module "wix-automations-activation-action-log.v1" {
  interface ActivationActionLog {
      /** Action ID */
      _id?: string;
      /** Activation ID */
      activationId?: string;
      /** Action type */
      type?: Type;
      /** Action activation status */
      activationStatus?: Status;
      /** Started status information */
      startedInfo?: StartedStatusInfo;
      /** Ended status information */
      endedInfo?: EndedStatusInfo;
      /** Skipped status information */
      skippedInfo?: SkippedStatusInfo;
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
      /** The output that the action implementer returned */
      output?: Record<string, any> | null;
  }
  interface ConditionActionInfo {
      /** Indicates that the condition `if` clause evaluated to `true` */
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
  enum Status {
      UNKNOWN_ACTION_ACTIVATION_STATUS = "UNKNOWN_ACTION_ACTIVATION_STATUS",
      /**
       * Indicating that action activation has been started and it's in progress
       * Relevant to action types: APP_DEFINED, DELAY
       */
      STARTED = "STARTED",
      /**
       * Indicating that the action activation is completed without errors
       * Relevant to action types: APP_DEFINED, DELAY, CONDITION, RATE_LIMIT
       */
      ENDED = "ENDED",
      /**
       * Indicating that the action is skipped and post actions will not start
       * Relevant to action types: APP_DEFINED
       */
      SKIPPED = "SKIPPED",
      /**
       * Indicating that the action failed
       * Relevant to action types: APP_DEFINED, DELAY, RATE_LIMIT
       */
      FAILED = "FAILED"
  }
  interface StartedStatusInfo extends StartedStatusInfoTypeInfoOneOf {
      /** APP DEFINED action additional info */
      appDefinedActionInfo?: StartedStatusInfoAppDefinedActionInfo;
      /** Delay action additional info */
      delayActionInfo?: DelayActionInfo;
      /** Created date */
      statusChangedDate?: Date | null;
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
      /** Created date */
      statusChangedDate?: Date | null;
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
  }
  interface SkippedStatusInfo {
      /** Created date */
      statusChangedDate?: Date | null;
  }
  interface FailedStatusInfo {
      /** Created date */
      statusChangedDate?: Date | null;
      /** Error description */
      errorDescription?: string;
      /** Error code */
      errorCode?: string | null;
  }
  interface ListActivationActionLogsRequest {
      /** Activation ID */
      activationId?: string;
  }
  interface ListActivationActionLogsResponse {
      /** List of activation action logs */
      activationActionLogs?: ActivationActionLog[];
  }
  /**
   * List activation action logs
   * @public
   * @documentationMaturity preview
   * @permissionId AUTOMATIONS.ACTIVATION_ACTION_LOG_READ
   * @adminMethod
   */
  function listActivationActionLogs(options?: ListActivationActionLogsOptions): Promise<ListActivationActionLogsResponse>;
  interface ListActivationActionLogsOptions {
      /** Activation ID */
      activationId?: string;
  }
  
  type automationsActivationLogsV1ActivationActionLog_universal_d_ActivationActionLog = ActivationActionLog;
  type automationsActivationLogsV1ActivationActionLog_universal_d_StartedStatusInfoAppDefinedActionInfo = StartedStatusInfoAppDefinedActionInfo;
  type automationsActivationLogsV1ActivationActionLog_universal_d_DelayActionInfo = DelayActionInfo;
  type automationsActivationLogsV1ActivationActionLog_universal_d_ExpressionEvaluationResult = ExpressionEvaluationResult;
  type automationsActivationLogsV1ActivationActionLog_universal_d_AppDefinedActionInfo = AppDefinedActionInfo;
  type automationsActivationLogsV1ActivationActionLog_universal_d_ConditionActionInfo = ConditionActionInfo;
  type automationsActivationLogsV1ActivationActionLog_universal_d_RateLimitActionInfo = RateLimitActionInfo;
  type automationsActivationLogsV1ActivationActionLog_universal_d_EndedStatusInfoDelayActionInfo = EndedStatusInfoDelayActionInfo;
  type automationsActivationLogsV1ActivationActionLog_universal_d_Type = Type;
  const automationsActivationLogsV1ActivationActionLog_universal_d_Type: typeof Type;
  type automationsActivationLogsV1ActivationActionLog_universal_d_Status = Status;
  const automationsActivationLogsV1ActivationActionLog_universal_d_Status: typeof Status;
  type automationsActivationLogsV1ActivationActionLog_universal_d_StartedStatusInfo = StartedStatusInfo;
  type automationsActivationLogsV1ActivationActionLog_universal_d_StartedStatusInfoTypeInfoOneOf = StartedStatusInfoTypeInfoOneOf;
  type automationsActivationLogsV1ActivationActionLog_universal_d_EndedStatusInfo = EndedStatusInfo;
  type automationsActivationLogsV1ActivationActionLog_universal_d_EndedStatusInfoTypeInfoOneOf = EndedStatusInfoTypeInfoOneOf;
  type automationsActivationLogsV1ActivationActionLog_universal_d_SkippedStatusInfo = SkippedStatusInfo;
  type automationsActivationLogsV1ActivationActionLog_universal_d_FailedStatusInfo = FailedStatusInfo;
  type automationsActivationLogsV1ActivationActionLog_universal_d_ListActivationActionLogsRequest = ListActivationActionLogsRequest;
  type automationsActivationLogsV1ActivationActionLog_universal_d_ListActivationActionLogsResponse = ListActivationActionLogsResponse;
  const automationsActivationLogsV1ActivationActionLog_universal_d_listActivationActionLogs: typeof listActivationActionLogs;
  type automationsActivationLogsV1ActivationActionLog_universal_d_ListActivationActionLogsOptions = ListActivationActionLogsOptions;
  namespace automationsActivationLogsV1ActivationActionLog_universal_d {
    export {
      automationsActivationLogsV1ActivationActionLog_universal_d_ActivationActionLog as ActivationActionLog,
      automationsActivationLogsV1ActivationActionLog_universal_d_StartedStatusInfoAppDefinedActionInfo as StartedStatusInfoAppDefinedActionInfo,
      automationsActivationLogsV1ActivationActionLog_universal_d_DelayActionInfo as DelayActionInfo,
      automationsActivationLogsV1ActivationActionLog_universal_d_ExpressionEvaluationResult as ExpressionEvaluationResult,
      automationsActivationLogsV1ActivationActionLog_universal_d_AppDefinedActionInfo as AppDefinedActionInfo,
      automationsActivationLogsV1ActivationActionLog_universal_d_ConditionActionInfo as ConditionActionInfo,
      automationsActivationLogsV1ActivationActionLog_universal_d_RateLimitActionInfo as RateLimitActionInfo,
      automationsActivationLogsV1ActivationActionLog_universal_d_EndedStatusInfoDelayActionInfo as EndedStatusInfoDelayActionInfo,
      automationsActivationLogsV1ActivationActionLog_universal_d_Type as Type,
      automationsActivationLogsV1ActivationActionLog_universal_d_Status as Status,
      automationsActivationLogsV1ActivationActionLog_universal_d_StartedStatusInfo as StartedStatusInfo,
      automationsActivationLogsV1ActivationActionLog_universal_d_StartedStatusInfoTypeInfoOneOf as StartedStatusInfoTypeInfoOneOf,
      automationsActivationLogsV1ActivationActionLog_universal_d_EndedStatusInfo as EndedStatusInfo,
      automationsActivationLogsV1ActivationActionLog_universal_d_EndedStatusInfoTypeInfoOneOf as EndedStatusInfoTypeInfoOneOf,
      automationsActivationLogsV1ActivationActionLog_universal_d_SkippedStatusInfo as SkippedStatusInfo,
      automationsActivationLogsV1ActivationActionLog_universal_d_FailedStatusInfo as FailedStatusInfo,
      automationsActivationLogsV1ActivationActionLog_universal_d_ListActivationActionLogsRequest as ListActivationActionLogsRequest,
      automationsActivationLogsV1ActivationActionLog_universal_d_ListActivationActionLogsResponse as ListActivationActionLogsResponse,
      automationsActivationLogsV1ActivationActionLog_universal_d_listActivationActionLogs as listActivationActionLogs,
      automationsActivationLogsV1ActivationActionLog_universal_d_ListActivationActionLogsOptions as ListActivationActionLogsOptions,
    };
  }
  
  export { automationsActivationLogsV1ActivationActionLog_universal_d as activationActionLog };
}
