declare module "wix-reports.v2" {
  interface Report {
      /**
       * Report ID.
       * @readonly
       */
      _id?: string | null;
      /** Reported entity name, such as `comment`. */
      entityName?: string;
      /** Reported entity ID. */
      entityId?: string;
      /**
       * Identity of who created a report.
       * @readonly
       */
      identity?: CommonIdentificationData;
      /** Reason for the report. */
      reason?: Reason;
      /**
       * Revision number, which increments by 1 each time the rule is updated. To prevent conflicting changes, the existing revision must be used when updating a rule.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time when the report created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time when the report updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Custom field data for the report object.
       *
       * **Note:** You must configure extended fields using schema plugin extensions in your app's dashboard before you can access the extended fields with API calls.
       */
      extendedFields?: ExtendedFields;
  }
  interface CommonIdentificationData extends CommonIdentificationDataIdOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /**
       * ID of a Wix user (site owner, contributor, etc.).
       * @internal
       */
      wixUserId?: string;
      /**
       * ID of an app.
       * @internal
       */
      appId?: string;
      /**
       * Identity type
       * @readonly
       */
      identityType?: IdentityType;
  }
  /** @oneof */
  interface CommonIdentificationDataIdOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /**
       * ID of a Wix user (site owner, contributor, etc.).
       * @internal
       */
      wixUserId?: string;
      /**
       * ID of an app.
       * @internal
       */
      appId?: string;
  }
  enum IdentityType {
      /** Unknown type. This value is not used. */
      UNKNOWN = "UNKNOWN",
      /** A site visitor who has not logged in. */
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      /** A logged-in site member. */
      MEMBER = "MEMBER",
      /** A Wix account holder, such as a site owner or contributor. This value is not used. */
      WIX_USER = "WIX_USER",
      /** An application integrated with the Wix platform. This value is not used. */
      APP = "APP"
  }
  interface Reason {
      /** Report reason type. */
      reasonType?: Type;
      /** Why the entity is reported. */
      details?: string | null;
  }
  enum Type {
      /** Unknown type. This value is not used. */
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      /** Entity is reported for other reasons. Specify in `details`. */
      OTHER = "OTHER",
      /** Entity is reported for spam. */
      SPAM = "SPAM",
      /** Entity is reported for nudity or sexual harassment. */
      NUDITY_OR_SEXUAL_HARASSMENT = "NUDITY_OR_SEXUAL_HARASSMENT",
      /** Entity is reported for hate speech. */
      HATE_SPEECH_OR_SYMBOLS = "HATE_SPEECH_OR_SYMBOLS",
      /** Entity is reported for false information. */
      FALSE_INFORMATION = "FALSE_INFORMATION",
      /** Entity is reported for a community guideline violation. */
      COMMUNITY_GUIDELINES_VIOLATION = "COMMUNITY_GUIDELINES_VIOLATION",
      /** Entity is reported for violence. */
      VIOLENCE = "VIOLENCE",
      /** Entity is reported for mentioning suicide. */
      SUICIDE_OR_SELF_INJURY = "SUICIDE_OR_SELF_INJURY",
      /** Entity is reported for unuathorized sales. */
      UNAUTHORIZED_SALES = "UNAUTHORIZED_SALES",
      /** Entity is reported for mentioning an eating disorder. */
      EATING_DISORDER = "EATING_DISORDER",
      /** Entity is reported for involving a minor. */
      INVOLVES_A_CHILD = "INVOLVES_A_CHILD",
      /** Entity is reported for mentioning terrorism. */
      TERRORISM = "TERRORISM",
      /** Entity is reported for mentioning drugs. */
      DRUGS = "DRUGS",
      /** Entity is reported for unlawful actions. */
      UNLAWFUL = "UNLAWFUL",
      /** Entity is reported for exposing identifying details. */
      EXPOSING_IDENTIFYING_INFO = "EXPOSING_IDENTIFYING_INFO"
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
  interface EntityReportSummaryChanged {
      /** Reported entity name. */
      entityName?: string;
      /** Reported entity ID. */
      entityId?: string;
      /** Number of reports. */
      reportCount?: number;
      /** Number of reports per reason type. */
      reasonCounts?: ReasonCount[];
  }
  interface ReasonCount {
      /** Reason type. */
      reasonType?: Type;
      /** Number of reports. */
      count?: number;
  }
  interface CreateReportRequest {
      /** Report details. */
      report: Report;
  }
  interface CreateReportResponse {
      /** Created report. */
      report?: Report;
  }
  interface GetReportRequest {
      /** ID of the report to retrieve. */
      reportId: string;
  }
  interface GetReportResponse {
      /** Retrieved report. */
      report?: Report;
  }
  interface UpdateReportRequest {
      /** Report to update. */
      report: Report;
      /**
       * Set of fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateReportResponse {
      /** Updated report. */
      report?: Report;
  }
  interface DeleteReportRequest {
      /** ID of the report to delete. */
      reportId: string;
  }
  interface DeleteReportResponse {
  }
  interface UpsertReportRequest {
      /** Report to create or update. */
      report?: Report;
  }
  interface UpsertReportResponse {
      /** Updated or created report. */
      report?: Report;
  }
  interface BulkDeleteReportsByFilterRequest {
      /** Query options. See [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language) for more details. */
      filter: Record<string, any> | null;
  }
  interface BulkDeleteReportsByFilterResponse {
      /** Job ID. Pass this ID to [Get Async Job](https://dev.wix.com/docs/rest/business-management/async-job/introduction) to retrieve job details and metadata. */
      jobId?: string;
  }
  interface CountReportsByReasonTypesRequest {
      /** Reported entity name. For example, `comment`. */
      entityName: string;
      /** ID of the reported entity. */
      entityId: string;
  }
  interface CountReportsByReasonTypesResponse {
      /** List of reports grouped by the reason type. */
      reasonTypeCount?: ReasonTypeCount[];
  }
  interface ReasonTypeCount {
      /** Reason for report. */
      reasonType?: Type;
      /** Number of reports by reason type. */
      count?: number;
  }
  interface QueryReportsRequest {
      /** Query options. See [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language) for more details. */
      query?: CursorQuery;
  }
  interface CursorQuery extends CursorQueryPagingMethodOneOf {
      /** Cursor paging options */
      cursorPaging?: CursorPaging;
      /** Filter object. See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language) for more information. */
      filter?: Record<string, any> | null;
      /** Sorting options */
      sort?: Sorting[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf {
      /** Cursor paging options */
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
       * Pass the relevant cursor token from the `pagingMetadata` object in the previous call's response.
       */
      cursor?: string | null;
  }
  interface QueryReportsResponse {
      /** List of reports. */
      reports?: Report[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata;
  }
  interface CursorPagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors;
      /** Whether there are more pages to retrieve following the current page. */
      hasNext?: boolean | null;
  }
  interface Cursors {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface UpdateExtendedFieldsRequest {
      /** ID of the report to update. */
      _id: string;
      /** Identifier for the app whose extended fields are being updated. */
      namespace: string;
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData: Record<string, any> | null;
  }
  interface UpdateExtendedFieldsResponse {
      /** Updated report. */
      report?: Report;
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
   * Creates a report.
   * @param report - Report details.
   * @public
   * @documentationMaturity preview
   * @requiredField report
   * @permissionId REPORTS.REPORT_CREATE
   * @adminMethod
   * @returns Created report.
   */
  function createReport(report: Report): Promise<Report>;
  /**
   * Retrieves a report.
   *
   * Site members and visitors can only access their own reports.
   * @param reportId - ID of the report to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField reportId
   * @permissionId REPORTS.REPORT_READ
   * @adminMethod
   * @returns Retrieved report.
   */
  function getReport(reportId: string): Promise<Report>;
  /**
   * Updates a report.
   *
   * Each time the report is updated, `revision` increments by 1. The current `revision` must be passed when updating the report. This ensures you're working with the latest report and prevents unintended overwrites.
   * @param _id - Report ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField report
   * @requiredField report.revision
   * @permissionId REPORTS.REPORT_UPDATE
   * @adminMethod
   * @returns Updated report.
   */
  function updateReport(_id: string | null, report: UpdateReport, options?: UpdateReportOptions): Promise<Report>;
  interface UpdateReport {
      /**
       * Report ID.
       * @readonly
       */
      _id?: string | null;
      /** Reported entity name, such as `comment`. */
      entityName?: string;
      /** Reported entity ID. */
      entityId?: string;
      /**
       * Identity of who created a report.
       * @readonly
       */
      identity?: CommonIdentificationData;
      /** Reason for the report. */
      reason?: Reason;
      /**
       * Revision number, which increments by 1 each time the rule is updated. To prevent conflicting changes, the existing revision must be used when updating a rule.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time when the report created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time when the report updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Custom field data for the report object.
       *
       * **Note:** You must configure extended fields using schema plugin extensions in your app's dashboard before you can access the extended fields with API calls.
       */
      extendedFields?: ExtendedFields;
  }
  interface UpdateReportOptions {
      /**
       * Set of fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Deletes a report and removes it from the report list in the dashboard.
   *
   * Site members and visitors can only delete their own reports.
   * @param reportId - ID of the report to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField reportId
   * @permissionId REPORTS.REPORT_DELETE
   * @adminMethod
   */
  function deleteReport(reportId: string): Promise<void>;
  /**
   * Creates or updates a report.
   * If the report for the requested entity already exists, updates the report with the provided `reason` value. Otherwise, creates the report.
   * @public
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.reportEntityId
   * @requiredField identifiers.reportEntityName
   * @permissionId REPORTS.REPORT_UPSERT
   */
  function upsertReport(identifiers: UpsertReportIdentifiers, options?: UpsertReportOptions): Promise<UpsertReportResponse>;
  interface UpsertReportOptions {
      report: {
          /**
           * Report ID.
           * @readonly
           */
          _id?: string | null;
          /**
           * Identity of who created a report.
           * @readonly
           */
          identity?: CommonIdentificationData;
          /** Reason for the report. */
          reason?: Reason;
          /**
           * Revision number, which increments by 1 each time the rule is updated. To prevent conflicting changes, the existing revision must be used when updating a rule.
           * @readonly
           */
          revision?: string | null;
          /**
           * Date and time when the report created.
           * @readonly
           */
          _createdDate?: Date | null;
          /**
           * Date and time when the report updated.
           * @readonly
           */
          _updatedDate?: Date | null;
          /**
           * Custom field data for the report object.
           *
           * **Note:** You must configure extended fields using schema plugin extensions in your app's dashboard before you can access the extended fields with API calls.
           */
          extendedFields?: ExtendedFields;
      };
  }
  interface UpsertReportIdentifiers {
      /** Reported entity name, such as `comment`. */
      reportEntityName?: string;
      /** Reported entity ID. */
      reportEntityId?: string;
  }
  /**
   * Deletes multiple reports by filter, and removes them from the report list in the dashboard.
   * @param filter - Query options. See [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language) for more details.
   * @public
   * @documentationMaturity preview
   * @requiredField filter
   * @permissionId REPORTS.REPORT_BULK_DELETE
   * @adminMethod
   */
  function bulkDeleteReportsByFilter(filter: Record<string, any> | null): Promise<BulkDeleteReportsByFilterResponse>;
  /**
   * Counts reports by reason types.
   * @param entityName - Reported entity name. For example, `comment`.
   * @public
   * @documentationMaturity preview
   * @requiredField entityName
   * @requiredField options
   * @requiredField options.entityId
   * @permissionId REPORTS.REPORT_READ_COUNTS
   * @adminMethod
   */
  function countReportsByReasonTypes(entityName: string, options: CountReportsByReasonTypesOptions): Promise<CountReportsByReasonTypesResponse>;
  interface CountReportsByReasonTypesOptions {
      /** ID of the reported entity. */
      entityId: string;
  }
  /**
   * Retrieves a list of reports, given the provided paging, filtering, and sorting.
   * Query Reports runs with these defaults, which you can override:
   * - `createdDate` is sorted in `ASC` order
   * - `paging.limit` is `100`
   * - `paging.offset` is `0`
   *
   * For field support for filters and sorting, see [Reports: Supported Filters and Sorting]().
   * To learn about working with _Query_ endpoints, see [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language).
   * @public
   * @documentationMaturity preview
   * @permissionId REPORTS.REPORT_QUERY
   * @adminMethod
   */
  function queryReports(): ReportsQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ReportsQueryResult extends QueryCursorResult {
      items: Report[];
      query: ReportsQueryBuilder;
      next: () => Promise<ReportsQueryResult>;
      prev: () => Promise<ReportsQueryResult>;
  }
  interface ReportsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | 'entityName' | 'entityId' | '_createdDate' | 'extendedFields', value: any) => ReportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | 'entityName' | 'entityId' | '_createdDate' | 'extendedFields', value: any) => ReportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate', value: any) => ReportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate', value: any) => ReportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate', value: any) => ReportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate', value: any) => ReportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'entityName' | 'entityId', value: string) => ReportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | 'entityName' | 'entityId' | '_createdDate' | 'extendedFields', value: any[]) => ReportsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'entityName' | 'entityId' | '_createdDate' | 'extendedFields', value: any) => ReportsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | 'entityName' | 'entityId' | '_createdDate' | 'extendedFields', value: boolean) => ReportsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | 'entityName' | 'entityId' | '_createdDate' | 'extendedFields'>) => ReportsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | 'entityName' | 'entityId' | '_createdDate' | 'extendedFields'>) => ReportsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ReportsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ReportsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ReportsQueryResult>;
  }
  /**
   * Updates extended fields of a report.
   * [Extended fields](https://dev.wix.com/docs/build-apps/develop-your-app/extensions/backend-extensions/schema-plugins/about-schema-plugin-extensions) must first be configured in the app dashboard.
   * @param _id - ID of the report to update.
   * @param namespace - Identifier for the app whose extended fields are being updated.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField namespace
   * @requiredField options
   * @requiredField options.namespaceData
   * @permissionId REPORTS.REPORT_UPDATE
   * @adminMethod
   */
  function updateExtendedFields(_id: string, namespace: string, options: UpdateExtendedFieldsOptions): Promise<UpdateExtendedFieldsResponse>;
  interface UpdateExtendedFieldsOptions {
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData: Record<string, any> | null;
  }
  
  type reportsV2Report_universal_d_Report = Report;
  type reportsV2Report_universal_d_CommonIdentificationData = CommonIdentificationData;
  type reportsV2Report_universal_d_CommonIdentificationDataIdOneOf = CommonIdentificationDataIdOneOf;
  type reportsV2Report_universal_d_IdentityType = IdentityType;
  const reportsV2Report_universal_d_IdentityType: typeof IdentityType;
  type reportsV2Report_universal_d_Reason = Reason;
  type reportsV2Report_universal_d_Type = Type;
  const reportsV2Report_universal_d_Type: typeof Type;
  type reportsV2Report_universal_d_ExtendedFields = ExtendedFields;
  type reportsV2Report_universal_d_EntityReportSummaryChanged = EntityReportSummaryChanged;
  type reportsV2Report_universal_d_ReasonCount = ReasonCount;
  type reportsV2Report_universal_d_CreateReportRequest = CreateReportRequest;
  type reportsV2Report_universal_d_CreateReportResponse = CreateReportResponse;
  type reportsV2Report_universal_d_GetReportRequest = GetReportRequest;
  type reportsV2Report_universal_d_GetReportResponse = GetReportResponse;
  type reportsV2Report_universal_d_UpdateReportRequest = UpdateReportRequest;
  type reportsV2Report_universal_d_UpdateReportResponse = UpdateReportResponse;
  type reportsV2Report_universal_d_DeleteReportRequest = DeleteReportRequest;
  type reportsV2Report_universal_d_DeleteReportResponse = DeleteReportResponse;
  type reportsV2Report_universal_d_UpsertReportRequest = UpsertReportRequest;
  type reportsV2Report_universal_d_UpsertReportResponse = UpsertReportResponse;
  type reportsV2Report_universal_d_BulkDeleteReportsByFilterRequest = BulkDeleteReportsByFilterRequest;
  type reportsV2Report_universal_d_BulkDeleteReportsByFilterResponse = BulkDeleteReportsByFilterResponse;
  type reportsV2Report_universal_d_CountReportsByReasonTypesRequest = CountReportsByReasonTypesRequest;
  type reportsV2Report_universal_d_CountReportsByReasonTypesResponse = CountReportsByReasonTypesResponse;
  type reportsV2Report_universal_d_ReasonTypeCount = ReasonTypeCount;
  type reportsV2Report_universal_d_QueryReportsRequest = QueryReportsRequest;
  type reportsV2Report_universal_d_CursorQuery = CursorQuery;
  type reportsV2Report_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type reportsV2Report_universal_d_Sorting = Sorting;
  type reportsV2Report_universal_d_SortOrder = SortOrder;
  const reportsV2Report_universal_d_SortOrder: typeof SortOrder;
  type reportsV2Report_universal_d_CursorPaging = CursorPaging;
  type reportsV2Report_universal_d_QueryReportsResponse = QueryReportsResponse;
  type reportsV2Report_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type reportsV2Report_universal_d_Cursors = Cursors;
  type reportsV2Report_universal_d_UpdateExtendedFieldsRequest = UpdateExtendedFieldsRequest;
  type reportsV2Report_universal_d_UpdateExtendedFieldsResponse = UpdateExtendedFieldsResponse;
  type reportsV2Report_universal_d_DomainEvent = DomainEvent;
  type reportsV2Report_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type reportsV2Report_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type reportsV2Report_universal_d_RestoreInfo = RestoreInfo;
  type reportsV2Report_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type reportsV2Report_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type reportsV2Report_universal_d_ActionEvent = ActionEvent;
  type reportsV2Report_universal_d_Empty = Empty;
  type reportsV2Report_universal_d_MessageEnvelope = MessageEnvelope;
  type reportsV2Report_universal_d_IdentificationData = IdentificationData;
  type reportsV2Report_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type reportsV2Report_universal_d_WebhookIdentityType = WebhookIdentityType;
  const reportsV2Report_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const reportsV2Report_universal_d_createReport: typeof createReport;
  const reportsV2Report_universal_d_getReport: typeof getReport;
  const reportsV2Report_universal_d_updateReport: typeof updateReport;
  type reportsV2Report_universal_d_UpdateReport = UpdateReport;
  type reportsV2Report_universal_d_UpdateReportOptions = UpdateReportOptions;
  const reportsV2Report_universal_d_deleteReport: typeof deleteReport;
  const reportsV2Report_universal_d_upsertReport: typeof upsertReport;
  type reportsV2Report_universal_d_UpsertReportOptions = UpsertReportOptions;
  type reportsV2Report_universal_d_UpsertReportIdentifiers = UpsertReportIdentifiers;
  const reportsV2Report_universal_d_bulkDeleteReportsByFilter: typeof bulkDeleteReportsByFilter;
  const reportsV2Report_universal_d_countReportsByReasonTypes: typeof countReportsByReasonTypes;
  type reportsV2Report_universal_d_CountReportsByReasonTypesOptions = CountReportsByReasonTypesOptions;
  const reportsV2Report_universal_d_queryReports: typeof queryReports;
  type reportsV2Report_universal_d_ReportsQueryResult = ReportsQueryResult;
  type reportsV2Report_universal_d_ReportsQueryBuilder = ReportsQueryBuilder;
  const reportsV2Report_universal_d_updateExtendedFields: typeof updateExtendedFields;
  type reportsV2Report_universal_d_UpdateExtendedFieldsOptions = UpdateExtendedFieldsOptions;
  namespace reportsV2Report_universal_d {
    export {
      reportsV2Report_universal_d_Report as Report,
      reportsV2Report_universal_d_CommonIdentificationData as CommonIdentificationData,
      reportsV2Report_universal_d_CommonIdentificationDataIdOneOf as CommonIdentificationDataIdOneOf,
      reportsV2Report_universal_d_IdentityType as IdentityType,
      reportsV2Report_universal_d_Reason as Reason,
      reportsV2Report_universal_d_Type as Type,
      reportsV2Report_universal_d_ExtendedFields as ExtendedFields,
      reportsV2Report_universal_d_EntityReportSummaryChanged as EntityReportSummaryChanged,
      reportsV2Report_universal_d_ReasonCount as ReasonCount,
      reportsV2Report_universal_d_CreateReportRequest as CreateReportRequest,
      reportsV2Report_universal_d_CreateReportResponse as CreateReportResponse,
      reportsV2Report_universal_d_GetReportRequest as GetReportRequest,
      reportsV2Report_universal_d_GetReportResponse as GetReportResponse,
      reportsV2Report_universal_d_UpdateReportRequest as UpdateReportRequest,
      reportsV2Report_universal_d_UpdateReportResponse as UpdateReportResponse,
      reportsV2Report_universal_d_DeleteReportRequest as DeleteReportRequest,
      reportsV2Report_universal_d_DeleteReportResponse as DeleteReportResponse,
      reportsV2Report_universal_d_UpsertReportRequest as UpsertReportRequest,
      reportsV2Report_universal_d_UpsertReportResponse as UpsertReportResponse,
      reportsV2Report_universal_d_BulkDeleteReportsByFilterRequest as BulkDeleteReportsByFilterRequest,
      reportsV2Report_universal_d_BulkDeleteReportsByFilterResponse as BulkDeleteReportsByFilterResponse,
      reportsV2Report_universal_d_CountReportsByReasonTypesRequest as CountReportsByReasonTypesRequest,
      reportsV2Report_universal_d_CountReportsByReasonTypesResponse as CountReportsByReasonTypesResponse,
      reportsV2Report_universal_d_ReasonTypeCount as ReasonTypeCount,
      reportsV2Report_universal_d_QueryReportsRequest as QueryReportsRequest,
      reportsV2Report_universal_d_CursorQuery as CursorQuery,
      reportsV2Report_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      reportsV2Report_universal_d_Sorting as Sorting,
      reportsV2Report_universal_d_SortOrder as SortOrder,
      reportsV2Report_universal_d_CursorPaging as CursorPaging,
      reportsV2Report_universal_d_QueryReportsResponse as QueryReportsResponse,
      reportsV2Report_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      reportsV2Report_universal_d_Cursors as Cursors,
      reportsV2Report_universal_d_UpdateExtendedFieldsRequest as UpdateExtendedFieldsRequest,
      reportsV2Report_universal_d_UpdateExtendedFieldsResponse as UpdateExtendedFieldsResponse,
      reportsV2Report_universal_d_DomainEvent as DomainEvent,
      reportsV2Report_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      reportsV2Report_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      reportsV2Report_universal_d_RestoreInfo as RestoreInfo,
      reportsV2Report_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      reportsV2Report_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      reportsV2Report_universal_d_ActionEvent as ActionEvent,
      reportsV2Report_universal_d_Empty as Empty,
      reportsV2Report_universal_d_MessageEnvelope as MessageEnvelope,
      reportsV2Report_universal_d_IdentificationData as IdentificationData,
      reportsV2Report_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      reportsV2Report_universal_d_WebhookIdentityType as WebhookIdentityType,
      reportsV2Report_universal_d_createReport as createReport,
      reportsV2Report_universal_d_getReport as getReport,
      reportsV2Report_universal_d_updateReport as updateReport,
      reportsV2Report_universal_d_UpdateReport as UpdateReport,
      reportsV2Report_universal_d_UpdateReportOptions as UpdateReportOptions,
      reportsV2Report_universal_d_deleteReport as deleteReport,
      reportsV2Report_universal_d_upsertReport as upsertReport,
      reportsV2Report_universal_d_UpsertReportOptions as UpsertReportOptions,
      reportsV2Report_universal_d_UpsertReportIdentifiers as UpsertReportIdentifiers,
      reportsV2Report_universal_d_bulkDeleteReportsByFilter as bulkDeleteReportsByFilter,
      reportsV2Report_universal_d_countReportsByReasonTypes as countReportsByReasonTypes,
      reportsV2Report_universal_d_CountReportsByReasonTypesOptions as CountReportsByReasonTypesOptions,
      reportsV2Report_universal_d_queryReports as queryReports,
      reportsV2Report_universal_d_ReportsQueryResult as ReportsQueryResult,
      reportsV2Report_universal_d_ReportsQueryBuilder as ReportsQueryBuilder,
      reportsV2Report_universal_d_updateExtendedFields as updateExtendedFields,
      reportsV2Report_universal_d_UpdateExtendedFieldsOptions as UpdateExtendedFieldsOptions,
    };
  }
  
  export { reportsV2Report_universal_d as reports };
}
