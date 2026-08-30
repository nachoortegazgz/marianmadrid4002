declare module "wix-analytics-session.v1" {
  interface Session {
      /** Session ID. */
      _id?: string;
  }
  /** List sessions async request. */
  interface ListSessionsAsyncRequest extends ListSessionsAsyncRequestPeriodOneOf, ListSessionsAsyncRequestParamsOneOf {
      /** Custom time period with start & end dates. */
      customTimePeriod?: CustomTimePeriod;
      /** Predefined time period. */
      predefinedTimePeriod?: PredefinedTimePeriod;
      /** Navigation flow details. */
      navigationFlow?: NavigationFlowSessionsParams;
      /** Conversion funnel details. The steps in the journey the visitor has taken on the site. */
      conversionFunnel?: ConversionFunnelSessionsParams;
      /** Device type. */
      deviceType?: SessionsByDeviceParams;
      /** User's timezone. Defaults to timezone as set in the [Site Properties API](https://dev.wix.com/docs/rest/business-management/site-properties/properties/properties-object). */
      timezone?: string | null;
  }
  /** @oneof */
  interface ListSessionsAsyncRequestPeriodOneOf {
      /** Custom time period with start & end dates. */
      customTimePeriod?: CustomTimePeriod;
      /** Predefined time period. */
      predefinedTimePeriod?: PredefinedTimePeriod;
  }
  /** @oneof */
  interface ListSessionsAsyncRequestParamsOneOf {
      /** Navigation flow details. */
      navigationFlow?: NavigationFlowSessionsParams;
      /** Conversion funnel details. The steps in the journey the visitor has taken on the site. */
      conversionFunnel?: ConversionFunnelSessionsParams;
      /** Device type. */
      deviceType?: SessionsByDeviceParams;
  }
  /** Custom time period. */
  interface CustomTimePeriod {
      /** Custom period start date in provided timezone. */
      startDate?: string;
      /**
       * Custom period end date in provided timezone. Returned data will include all dates until the requested end date.
       * For example, { startDate: '2024-01-01', endDate: '2024-01-03' } will return data for '2024-01-01' and '2024-01-02'
       */
      endDate?: string;
  }
  /**
   * Predefined time period.
   * `THIS_WEEK`begins with Monday.
   */
  enum PredefinedTimePeriod {
      /** Today. */
      TODAY = "TODAY",
      /** Yesterday. */
      YESTERDAY = "YESTERDAY",
      /** Last 7 days. */
      LAST_7_DAYS = "LAST_7_DAYS",
      /** Last 14 days. */
      LAST_14_DAYS = "LAST_14_DAYS",
      /** Last 30 days. */
      LAST_30_DAYS = "LAST_30_DAYS",
      /** Last 90 days. */
      LAST_90_DAYS = "LAST_90_DAYS",
      /** Last 28 days. */
      LAST_28_DAYS = "LAST_28_DAYS",
      /** Last 180 days. */
      LAST_180_DAYS = "LAST_180_DAYS",
      /** Last 365 days. */
      LAST_365_DAYS = "LAST_365_DAYS",
      /** Current week, starting on Monday. */
      THIS_WEEK = "THIS_WEEK",
      /** Current month. */
      THIS_MONTH = "THIS_MONTH",
      /** Current quarter. */
      THIS_QUARTER = "THIS_QUARTER",
      /** This year. */
      THIS_YEAR = "THIS_YEAR",
      /** Last week (previous week). */
      LAST_WEEK = "LAST_WEEK",
      /** Last month. */
      LAST_MONTH = "LAST_MONTH",
      /** Last quarter. */
      LAST_QUARTER = "LAST_QUARTER",
      /** Last year. */
      LAST_YEAR = "LAST_YEAR",
      /** Last 12 months. */
      LAST_12_MONTHS = "LAST_12_MONTHS"
  }
  /** Navigation flow details. */
  interface NavigationFlowSessionsParams {
      /**
       * Page interactions, including where the user dropped off. For example:
       * - ["/{Homepage}", "__DROP__"]: Sessions where a user visited the site's homepage and then dropped off.
       * - ["", "__DROP__"]: Sessions where a user visited (any page) and then dropped off.
       * - ["", "", "__DROP__"]: Session where a user visited any page, then navigated to any page, and then dropped off.
       */
      pageInteractions?: string[] | null;
  }
  /** Conversion funnel details, meaning the steps in the journey the visitor has taken on the site. */
  interface ConversionFunnelSessionsParams {
      /** Funnel step to include. */
      include?: FunnelStep;
      /** Funnel step to exclude. */
      exclude?: FunnelStep;
  }
  /** Funnel step. */
  enum FunnelStep {
      /** Not selected. */
      NOT_SELECTED_FUNNEL_STEP = "NOT_SELECTED_FUNNEL_STEP",
      /** Site sessions. */
      SITE_SESSIONS = "SITE_SESSIONS",
      /** Viewed product. */
      VIEWED_PRODUCT = "VIEWED_PRODUCT",
      /** Added to cart. */
      ADDED_TO_CART = "ADDED_TO_CART",
      /** Reached checkout. */
      REACHED_CHECKOUT = "REACHED_CHECKOUT",
      /** Sessions converted. */
      SESSIONS_CONVERTED = "SESSIONS_CONVERTED"
  }
  /** Device details. */
  interface SessionsByDeviceParams {
      /** Device type. */
      type?: DeviceType;
  }
  /** Device type. */
  enum DeviceType {
      /** Not selected. */
      NOT_SELECTED_DEVICE_TYPE = "NOT_SELECTED_DEVICE_TYPE",
      /** Desktop. */
      DESKTOP = "DESKTOP",
      /** Mobile. */
      MOBILE = "MOBILE",
      /** Tablet. */
      TABLET = "TABLET",
      /** All. */
      ALL = "ALL"
  }
  /** List sessions async response. */
  interface ListSessionsAsyncResponse {
      /** List sessions job ID. */
      jobId?: string;
  }
  /** Get list sessions job result request. */
  interface GetListSessionsJobResultRequest {
      /** List sessions job ID. */
      jobId: string;
      /** Number of items to load. */
      limit: number;
      /** Number of items to skip in the current sort order. */
      offset: number;
  }
  /** Get list sessions job result response. */
  interface GetListSessionsJobResultResponse {
      /** List sessions job result data. */
      result?: JobResult;
  }
  /** List sessions job result. */
  interface JobResult {
      /** Job status. */
      jobStatus?: JobStatus;
      /** Total number of sessions. */
      total?: number | null;
      /** Session IDs. */
      sessionIds?: string[];
  }
  /** Job status. */
  enum JobStatus {
      /** Unknown. */
      UNKNOWN_JOB_STATUS = "UNKNOWN_JOB_STATUS",
      /** In progress. */
      IN_PROGRESS = "IN_PROGRESS",
      /** Finished. */
      FINISHED = "FINISHED",
      /** Error. */
      ERROR = "ERROR"
  }
  /** Request for getting store conversion sessions. */
  interface CountFunnelSessionsRequest extends CountFunnelSessionsRequestPeriodOneOf {
      /** Custom time period with start & end dates. */
      customTimePeriod?: CustomTimePeriod;
      /** Predefined time period. */
      predefinedTimePeriod?: PredefinedTimePeriod;
      /** User timezone. If not provided it will be taken from site properties. */
      timezone?: string | null;
  }
  /** @oneof */
  interface CountFunnelSessionsRequestPeriodOneOf {
      /** Custom time period with start & end dates. */
      customTimePeriod?: CustomTimePeriod;
      /** Predefined time period. */
      predefinedTimePeriod?: PredefinedTimePeriod;
  }
  /** Response for getting store conversion sessions. */
  interface CountFunnelSessionsResponse {
      /** Recordings. */
      recordings?: Recordings;
  }
  /** Recordings. */
  interface Recordings {
      /** Saved Session count. */
      siteSessions?: number | null;
      /** Saved Sessions with Product Views */
      productViewSessions?: number | null;
      /** Saved Sessions with Cart Views */
      cartViewSessions?: number | null;
      /** Saved Sessions with Checkouts */
      checkoutSessions?: number | null;
      /** Saved Converted Sessions */
      convertedSessions?: number | null;
  }
  /** Request for getting the total number of sessions. */
  interface CountSessionsRequest extends CountSessionsRequestPeriodOneOf {
      /** Custom time period with start & end dates. */
      customTimePeriod?: CustomTimePeriod;
      /** Predefined time period. */
      predefinedTimePeriod?: PredefinedTimePeriod;
      /** User timezone. If not provided it will be taken from site properties. */
      timezone?: string | null;
  }
  /** @oneof */
  interface CountSessionsRequestPeriodOneOf {
      /** Custom time period with start & end dates. */
      customTimePeriod?: CustomTimePeriod;
      /** Predefined time period. */
      predefinedTimePeriod?: PredefinedTimePeriod;
  }
  /** Response for getting the total number of sessions. */
  interface CountSessionsResponse {
      /** Total number of sessions. */
      sessions?: number;
  }
  /** Mark a browser session as recorded. */
  interface MarkSessionAsRecordedRequest {
      /** Browser session ID. */
      sessionId: string;
  }
  /** Mark a browser session as recorded. */
  interface MarkSessionAsRecordedResponse {
  }
  /**
   * Start an async job to retrieve a list of session IDs, given the provided filters. The following filters **must** be passed:
   * - Time period, either predefined or custom.
   * - Session filter, either navigation flow (page interactions), conversion funnel steps, or device type.
   * @public
   * @documentationMaturity preview
   * @param options - Filter options. The following filters **must** be passed:
   *
   *  - Time period, either predefined or custom.
   *
   *  - Session filter, either navigation flow (page interactions), conversion funnel steps, or device type.
   * @adminMethod
   * @returns List sessions async response.
   */
  function listSessionsAsync(options?: ListSessionsAsyncOptions): Promise<ListSessionsAsyncResponse>;
  interface ListSessionsAsyncOptions extends ListSessionsAsyncRequestPeriodOneOf, ListSessionsAsyncRequestParamsOneOf {
      /** Custom time period with start & end dates. */
      customTimePeriod?: CustomTimePeriod;
      /** Predefined time period. */
      predefinedTimePeriod?: PredefinedTimePeriod;
      /** User's timezone. Defaults to timezone as set in the [Site Properties API](https://dev.wix.com/docs/rest/business-management/site-properties/properties/properties-object). */
      timezone?: string | null;
      /** Navigation flow details. */
      navigationFlow?: NavigationFlowSessionsParams;
      /** Conversion funnel details. The steps in the journey the visitor has taken on the site. */
      conversionFunnel?: ConversionFunnelSessionsParams;
      /** Device type. */
      deviceType?: SessionsByDeviceParams;
  }
  /**
   * Retrieves the job status and a list of session IDs, if ready.
   * @param jobId - List sessions job ID.
   * @public
   * @documentationMaturity preview
   * @requiredField jobId
   * @requiredField options
   * @requiredField options.limit
   * @requiredField options.offset
   * @param options - Field options. The `limit` and `offset` filters **must** be passed.
   * @adminMethod
   * @returns Get list sessions job result response.
   */
  function getListSessionsJobResult(jobId: string, options: GetListSessionsJobResultOptions): Promise<GetListSessionsJobResultResponse>;
  interface GetListSessionsJobResultOptions {
      /** Number of items to load. */
      limit: number;
      /** Number of items to skip in the current sort order. */
      offset: number;
  }
  /**
   * Get the number of session recordings for store conversion funnel step.
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   * @returns Response for getting store conversion sessions.
   */
  function countFunnelSessions(options?: CountFunnelSessionsOptions): Promise<CountFunnelSessionsResponse>;
  interface CountFunnelSessionsOptions extends CountFunnelSessionsRequestPeriodOneOf {
      /** Custom time period with start & end dates. */
      customTimePeriod?: CustomTimePeriod;
      /** Predefined time period. */
      predefinedTimePeriod?: PredefinedTimePeriod;
      /** User timezone. If not provided it will be taken from site properties. */
      timezone?: string | null;
  }
  /**
   * Get the total number of session recordings.
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   * @returns Response for getting the total number of sessions.
   */
  function countSessions(options?: CountSessionsOptions): Promise<CountSessionsResponse>;
  interface CountSessionsOptions extends CountSessionsRequestPeriodOneOf {
      /** Custom time period with start & end dates. */
      customTimePeriod?: CustomTimePeriod;
      /** Predefined time period. */
      predefinedTimePeriod?: PredefinedTimePeriod;
      /** User timezone. If not provided it will be taken from site properties. */
      timezone?: string | null;
  }
  /**
   * Marks a browser session as recorded.
   * @param sessionId - Browser session ID.
   * @public
   * @documentationMaturity preview
   * @requiredField sessionId
   * @adminMethod
   * @returns Mark a browser session as recorded.
   */
  function markSessionAsRecorded(sessionId: string): Promise<void>;
  
  type analyticsNgV1Session_universal_d_Session = Session;
  type analyticsNgV1Session_universal_d_ListSessionsAsyncRequest = ListSessionsAsyncRequest;
  type analyticsNgV1Session_universal_d_ListSessionsAsyncRequestPeriodOneOf = ListSessionsAsyncRequestPeriodOneOf;
  type analyticsNgV1Session_universal_d_ListSessionsAsyncRequestParamsOneOf = ListSessionsAsyncRequestParamsOneOf;
  type analyticsNgV1Session_universal_d_CustomTimePeriod = CustomTimePeriod;
  type analyticsNgV1Session_universal_d_PredefinedTimePeriod = PredefinedTimePeriod;
  const analyticsNgV1Session_universal_d_PredefinedTimePeriod: typeof PredefinedTimePeriod;
  type analyticsNgV1Session_universal_d_NavigationFlowSessionsParams = NavigationFlowSessionsParams;
  type analyticsNgV1Session_universal_d_ConversionFunnelSessionsParams = ConversionFunnelSessionsParams;
  type analyticsNgV1Session_universal_d_FunnelStep = FunnelStep;
  const analyticsNgV1Session_universal_d_FunnelStep: typeof FunnelStep;
  type analyticsNgV1Session_universal_d_SessionsByDeviceParams = SessionsByDeviceParams;
  type analyticsNgV1Session_universal_d_DeviceType = DeviceType;
  const analyticsNgV1Session_universal_d_DeviceType: typeof DeviceType;
  type analyticsNgV1Session_universal_d_ListSessionsAsyncResponse = ListSessionsAsyncResponse;
  type analyticsNgV1Session_universal_d_GetListSessionsJobResultRequest = GetListSessionsJobResultRequest;
  type analyticsNgV1Session_universal_d_GetListSessionsJobResultResponse = GetListSessionsJobResultResponse;
  type analyticsNgV1Session_universal_d_JobResult = JobResult;
  type analyticsNgV1Session_universal_d_JobStatus = JobStatus;
  const analyticsNgV1Session_universal_d_JobStatus: typeof JobStatus;
  type analyticsNgV1Session_universal_d_CountFunnelSessionsRequest = CountFunnelSessionsRequest;
  type analyticsNgV1Session_universal_d_CountFunnelSessionsRequestPeriodOneOf = CountFunnelSessionsRequestPeriodOneOf;
  type analyticsNgV1Session_universal_d_CountFunnelSessionsResponse = CountFunnelSessionsResponse;
  type analyticsNgV1Session_universal_d_Recordings = Recordings;
  type analyticsNgV1Session_universal_d_CountSessionsRequest = CountSessionsRequest;
  type analyticsNgV1Session_universal_d_CountSessionsRequestPeriodOneOf = CountSessionsRequestPeriodOneOf;
  type analyticsNgV1Session_universal_d_CountSessionsResponse = CountSessionsResponse;
  type analyticsNgV1Session_universal_d_MarkSessionAsRecordedRequest = MarkSessionAsRecordedRequest;
  type analyticsNgV1Session_universal_d_MarkSessionAsRecordedResponse = MarkSessionAsRecordedResponse;
  const analyticsNgV1Session_universal_d_listSessionsAsync: typeof listSessionsAsync;
  type analyticsNgV1Session_universal_d_ListSessionsAsyncOptions = ListSessionsAsyncOptions;
  const analyticsNgV1Session_universal_d_getListSessionsJobResult: typeof getListSessionsJobResult;
  type analyticsNgV1Session_universal_d_GetListSessionsJobResultOptions = GetListSessionsJobResultOptions;
  const analyticsNgV1Session_universal_d_countFunnelSessions: typeof countFunnelSessions;
  type analyticsNgV1Session_universal_d_CountFunnelSessionsOptions = CountFunnelSessionsOptions;
  const analyticsNgV1Session_universal_d_countSessions: typeof countSessions;
  type analyticsNgV1Session_universal_d_CountSessionsOptions = CountSessionsOptions;
  const analyticsNgV1Session_universal_d_markSessionAsRecorded: typeof markSessionAsRecorded;
  namespace analyticsNgV1Session_universal_d {
    export {
      analyticsNgV1Session_universal_d_Session as Session,
      analyticsNgV1Session_universal_d_ListSessionsAsyncRequest as ListSessionsAsyncRequest,
      analyticsNgV1Session_universal_d_ListSessionsAsyncRequestPeriodOneOf as ListSessionsAsyncRequestPeriodOneOf,
      analyticsNgV1Session_universal_d_ListSessionsAsyncRequestParamsOneOf as ListSessionsAsyncRequestParamsOneOf,
      analyticsNgV1Session_universal_d_CustomTimePeriod as CustomTimePeriod,
      analyticsNgV1Session_universal_d_PredefinedTimePeriod as PredefinedTimePeriod,
      analyticsNgV1Session_universal_d_NavigationFlowSessionsParams as NavigationFlowSessionsParams,
      analyticsNgV1Session_universal_d_ConversionFunnelSessionsParams as ConversionFunnelSessionsParams,
      analyticsNgV1Session_universal_d_FunnelStep as FunnelStep,
      analyticsNgV1Session_universal_d_SessionsByDeviceParams as SessionsByDeviceParams,
      analyticsNgV1Session_universal_d_DeviceType as DeviceType,
      analyticsNgV1Session_universal_d_ListSessionsAsyncResponse as ListSessionsAsyncResponse,
      analyticsNgV1Session_universal_d_GetListSessionsJobResultRequest as GetListSessionsJobResultRequest,
      analyticsNgV1Session_universal_d_GetListSessionsJobResultResponse as GetListSessionsJobResultResponse,
      analyticsNgV1Session_universal_d_JobResult as JobResult,
      analyticsNgV1Session_universal_d_JobStatus as JobStatus,
      analyticsNgV1Session_universal_d_CountFunnelSessionsRequest as CountFunnelSessionsRequest,
      analyticsNgV1Session_universal_d_CountFunnelSessionsRequestPeriodOneOf as CountFunnelSessionsRequestPeriodOneOf,
      analyticsNgV1Session_universal_d_CountFunnelSessionsResponse as CountFunnelSessionsResponse,
      analyticsNgV1Session_universal_d_Recordings as Recordings,
      analyticsNgV1Session_universal_d_CountSessionsRequest as CountSessionsRequest,
      analyticsNgV1Session_universal_d_CountSessionsRequestPeriodOneOf as CountSessionsRequestPeriodOneOf,
      analyticsNgV1Session_universal_d_CountSessionsResponse as CountSessionsResponse,
      analyticsNgV1Session_universal_d_MarkSessionAsRecordedRequest as MarkSessionAsRecordedRequest,
      analyticsNgV1Session_universal_d_MarkSessionAsRecordedResponse as MarkSessionAsRecordedResponse,
      analyticsNgV1Session_universal_d_listSessionsAsync as listSessionsAsync,
      analyticsNgV1Session_universal_d_ListSessionsAsyncOptions as ListSessionsAsyncOptions,
      analyticsNgV1Session_universal_d_getListSessionsJobResult as getListSessionsJobResult,
      analyticsNgV1Session_universal_d_GetListSessionsJobResultOptions as GetListSessionsJobResultOptions,
      analyticsNgV1Session_universal_d_countFunnelSessions as countFunnelSessions,
      analyticsNgV1Session_universal_d_CountFunnelSessionsOptions as CountFunnelSessionsOptions,
      analyticsNgV1Session_universal_d_countSessions as countSessions,
      analyticsNgV1Session_universal_d_CountSessionsOptions as CountSessionsOptions,
      analyticsNgV1Session_universal_d_markSessionAsRecorded as markSessionAsRecorded,
    };
  }
  
  export { analyticsNgV1Session_universal_d as analyticsSession };
}
