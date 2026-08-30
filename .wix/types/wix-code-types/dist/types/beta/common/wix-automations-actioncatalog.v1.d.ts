declare module "wix-automations-actioncatalog.v1" {
  interface Action {
      /**
       * the id of the app defining the action
       * @readonly
       */
      appId?: string;
      /**
       * identifier for this action - human readable action key - unique per app def id
       * TODO: use slug when possible
       * @readonly
       */
      actionKey?: string;
      /**
       * The action expects the following input
       * The schema is described according to JSON Schema standard: https://json-schema.org/
       *
       * Example - Add Label to Contact Action input schema:
       * {
       * "$schema": "https://json-schema.org/draft/2020-12/schema",
       * "type": "object",
       * "title": "Add label to contact input schema",
       * "description": "The schema of the json that is sent when invoking this add label to contact action",
       * "default": {},
       * "examples": [
       * {
       * "contactId": "a647eb32-c5f4-11ec-9d64-0242ac120002",
       * "labelId": "1e8b5e5e-dba2-11ec-9d64-0242ac120002"
       * }
       * ],
       * "required": [
       * "contactId",
       * "labelId"
       * ],
       * "properties": {
       * "contactId": {
       * "$id": "#/properties/contactId",
       * "type": "string",
       * "format": "uuid",
       * "title": "Contact Id",
       * "description": "The Id of the contact to apply the label to",
       * "default": "",
       * "identityType": "contact" // can be contact/visitor/user, limited to 1 type per identity.
       * },
       * "labelId": {
       * "$id": "#/properties/labelId",
       * "type": "string",
       * "format": "uuid",
       * "title": "Label Id",
       * "description": "The Id of label to apply",
       * "default": "",
       * }
       * }
       * }
       * @readonly
       */
      inputSchema?: Record<string, any> | null;
      /**
       * The output of the action which will be added to the payload after execution
       * The schema is described according to JSON Schema standard: https://json-schema.org/
       *
       * Example - Output of create task action
       * {
       * "$schema": "https://json-schema.org/draft/2020-12/schema",
       * "type": "object",
       * "title": "Create task action schema",
       * "description": "The schema of the json that is sent when invoking this create task action",
       * "default": {},
       * "examples": [
       * {
       * "taskId": "a647eb32-c5f4-11ec-9d64-0242ac120002",
       * }
       * ],
       * "required": [
       * "taskId"
       * ],
       * "properties": {
       * "taskId": {
       * "$id": "#/properties/taskId",
       * "type": "string",
       * "format": "uuid",
       * "title": "Contact Id",
       * "description": "The Id of the task created",
       * "default": "",
       * }
       * }
       * }
       * @readonly
       */
      outputSchema?: Record<string, any> | null;
      /**
       * actions display name - human readable field. ex. - "Send SMS"
       * @readonly
       */
      displayName?: string | null;
      /** @readonly */
      description?: string | null;
      metadata?: Metadata;
      /** specifies which optional methods were implemented */
      implementedMethods?: ImplementedMethods;
      executionType?: ExecutionType;
      /** chosen interface for action */
      interfaceConfiguration?: InterfaceConfiguration;
      /** icon representing the action in UI */
      icon?: string;
  }
  enum Type {
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      WIDGET_COMPONENT = "WIDGET_COMPONENT",
      GENERIC = "GENERIC"
  }
  interface WidgetComponentOptions {
      /** name of provided component */
      componentName?: string;
  }
  interface GenericOptions {
      /** ui schema */
      uiSchema?: Record<string, any> | null;
  }
  interface Metadata {
      /** Show action only to advanced mode users (Wix staff) */
      hidden?: boolean;
  }
  interface ImplementedMethods {
      /** implements ValidateConfiguration */
      validateConfiguration?: boolean;
      /** implements DuplicateInputMapping */
      duplicateInputMapping?: boolean;
      /** implements GenerateApplicationAutomationInputMapping */
      generateApplicationAutomationInputMapping?: boolean;
      /** implements GetQuotaInfo */
      getQuotaInfo?: boolean;
      /** implements OnBeforeSave */
      onBeforeSave?: boolean;
      /** implements OnReset */
      onReset?: boolean;
      /** implements generateActionInputMappingFromTemplate */
      generateActionInputMappingFromTemplate?: boolean;
      /** implements OnRemove */
      onRemove?: boolean;
      /** Implements GetDynamicInputSchema */
      getDynamicInputSchema?: boolean;
  }
  enum ExecutionType {
      UNKNOWN_EXECUTION_TYPE = "UNKNOWN_EXECUTION_TYPE",
      SYNC = "SYNC",
      ASYNC = "ASYNC"
  }
  interface InterfaceConfiguration extends InterfaceConfigurationOptionsOneOf {
      widgetComponentOptions?: WidgetComponentOptions;
      genericOptions?: GenericOptions;
      /** type of chosen interface */
      type?: Type;
  }
  /** @oneof */
  interface InterfaceConfigurationOptionsOneOf {
      widgetComponentOptions?: WidgetComponentOptions;
      genericOptions?: GenericOptions;
  }
  interface FocalPoint {
      /** X-coordinate of the focal point. */
      x?: number;
      /** Y-coordinate of the focal point. */
      y?: number;
      /** crop by height */
      height?: number | null;
      /** crop by width */
      width?: number | null;
  }
  interface GetRuntimeActionRequest {
      /** The action App Id */
      appId: string;
      /** Action key */
      actionKey: string;
  }
  interface GetRuntimeActionResponse {
      /** Action Configuration */
      action?: Action;
  }
  interface GetActionDynamicInputSchemaRequest {
      /** The App ID of the action's owner. */
      appId: string;
      /**
       * Action key as defined in an app's action configuration in the Wix Developers Center.
       * For example, `send-email` or `generate-invoice`.
       */
      actionKey: string;
      /**
       * Object representing the mapping a site contributor made between keys in the [input schema](https://dev.wix.com/docs/rest/api-reference/wix-automations/action-spi/about-the-action-spi-input-schema) and their expected
       * values when running the automation. A field can be a static value mapping, or an expression that will be evaluated
       * dynamically on each activation.
       */
      inputMapping: Record<string, any> | null;
  }
  interface GetActionDynamicInputSchemaResponse {
      /** A [JSON schema](https://json-schema.org/) containing the action's added dynamic fields and its static fields. */
      inputSchema?: Record<string, any> | null;
      /** A [UI schema](https://bo.wix.com/pages/automations-ui-lib/?path=/story/getting-started--about) is a JSON Schema that describes the UI of the static and dynamic fields. */
      uiSchema?: Record<string, any> | null;
  }
  interface ResolveActionsRequest {
      /** WQL expression - support filter, sort, paging, fields and field sets */
      query?: QueryV2;
  }
  interface QueryV2 extends QueryV2PagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
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
      /** Array of projected fields. A list of specific field names to return. If `fieldsets` are also specified, the union of `fieldsets` and `fields` is returned. */
      fields?: string[];
      /** Array of named, predefined sets of projected fields. A array of predefined named sets of fields to be returned. Specifying multiple `fieldsets` will return the union of fields from all sets. If `fields` are also specified, the union of `fieldsets` and `fields` is returned. */
      fieldsets?: string[];
  }
  /** @oneof */
  interface QueryV2PagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
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
  interface Paging {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
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
  interface ResolveActionsResponse {
      /** paginated action configurations */
      actions?: Action[];
      /** paging data of the response */
      paging?: PagingMetadataV2;
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
  interface CopyInputMappingRequest {
      /** Action app id */
      appId: string;
      /** Action key */
      actionKey: string;
      /** Action input mapping */
      inputMapping: Record<string, any> | null;
  }
  interface CopyInputMappingResponse {
      /** New action input mapping */
      inputMapping?: Record<string, any> | null;
  }
  /**
   * Returns action configuration by action key
   * @public
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.actionKey
   * @requiredField identifiers.appId
   * @permissionId AUTOMATIONS.ACTION_READ
   * @adminMethod
   * @returns Action Configuration
   */
  function getRuntimeAction(identifiers: GetRuntimeActionIdentifiers): Promise<Action>;
  interface GetRuntimeActionIdentifiers {
      /** The action App Id */
      appId: string;
      /** Action key */
      actionKey: string;
  }
  /**
   * Returns action dynamic schema and ui schema for the given action key and input mapping (action config)
   * @param appId - The App ID of the action's owner.
   * @public
   * @documentationMaturity preview
   * @requiredField appId
   * @requiredField options
   * @requiredField options.actionKey
   * @requiredField options.inputMapping
   * @permissionId AUTOMATIONS.ACTION_READ
   * @adminMethod
   */
  function getActionDynamicInputSchema(appId: string, options: GetActionDynamicInputSchemaOptions): Promise<GetActionDynamicInputSchemaResponse>;
  interface GetActionDynamicInputSchemaOptions {
      /**
       * Action key as defined in an app's action configuration in the Wix Developers Center.
       * For example, `send-email` or `generate-invoice`.
       */
      actionKey: string;
      /**
       * Object representing the mapping a site contributor made between keys in the [input schema](https://dev.wix.com/docs/rest/api-reference/wix-automations/action-spi/about-the-action-spi-input-schema) and their expected
       * values when running the automation. A field can be a static value mapping, or an expression that will be evaluated
       * dynamically on each activation.
       */
      inputMapping: Record<string, any> | null;
  }
  /**
   * Returns action configurations that are installed on the site and are exposed to the user
   * @public
   * @documentationMaturity preview
   * @permissionId AUTOMATIONS.ACTION_READ
   * @adminMethod
   */
  function resolveActions(options?: ResolveActionsOptions): Promise<ResolveActionsResponse>;
  interface ResolveActionsOptions {
      /** WQL expression - support filter, sort, paging, fields and field sets */
      query?: QueryV2;
  }
  /**
   * Get action input mapping copy
   * The main use case is to call this method from the automations editor, when the user wants to copy an action. So
   * this method is getting an input mapping of an existing action and returns a changed input mapping. It's changing
   * the input mapping by passing it through the SPI endpoint of `DuplicateInputMapping` in the case that this SPI
   * endpoint is implemented.
   * A possible usage is by `triggered-email` action - Wix Emails need to change the `messageId` inside the input mapping
   * so such that the `messageId` stays unique across multiple actions.
   * @param appId - Action app id
   * @public
   * @documentationMaturity preview
   * @requiredField appId
   * @requiredField options
   * @requiredField options.actionKey
   * @requiredField options.inputMapping
   * @permissionId AUTOMATIONS.ACTION_COPY
   * @adminMethod
   */
  function copyInputMapping(appId: string, options: CopyInputMappingOptions): Promise<CopyInputMappingResponse>;
  interface CopyInputMappingOptions {
      /** Action key */
      actionKey: string;
      /** Action input mapping */
      inputMapping: Record<string, any> | null;
  }
  
  type automationsActioncatalogV1Action_universal_d_Action = Action;
  type automationsActioncatalogV1Action_universal_d_Type = Type;
  const automationsActioncatalogV1Action_universal_d_Type: typeof Type;
  type automationsActioncatalogV1Action_universal_d_WidgetComponentOptions = WidgetComponentOptions;
  type automationsActioncatalogV1Action_universal_d_GenericOptions = GenericOptions;
  type automationsActioncatalogV1Action_universal_d_Metadata = Metadata;
  type automationsActioncatalogV1Action_universal_d_ImplementedMethods = ImplementedMethods;
  type automationsActioncatalogV1Action_universal_d_ExecutionType = ExecutionType;
  const automationsActioncatalogV1Action_universal_d_ExecutionType: typeof ExecutionType;
  type automationsActioncatalogV1Action_universal_d_InterfaceConfiguration = InterfaceConfiguration;
  type automationsActioncatalogV1Action_universal_d_InterfaceConfigurationOptionsOneOf = InterfaceConfigurationOptionsOneOf;
  type automationsActioncatalogV1Action_universal_d_FocalPoint = FocalPoint;
  type automationsActioncatalogV1Action_universal_d_GetRuntimeActionRequest = GetRuntimeActionRequest;
  type automationsActioncatalogV1Action_universal_d_GetRuntimeActionResponse = GetRuntimeActionResponse;
  type automationsActioncatalogV1Action_universal_d_GetActionDynamicInputSchemaRequest = GetActionDynamicInputSchemaRequest;
  type automationsActioncatalogV1Action_universal_d_GetActionDynamicInputSchemaResponse = GetActionDynamicInputSchemaResponse;
  type automationsActioncatalogV1Action_universal_d_ResolveActionsRequest = ResolveActionsRequest;
  type automationsActioncatalogV1Action_universal_d_QueryV2 = QueryV2;
  type automationsActioncatalogV1Action_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
  type automationsActioncatalogV1Action_universal_d_Sorting = Sorting;
  type automationsActioncatalogV1Action_universal_d_SortOrder = SortOrder;
  const automationsActioncatalogV1Action_universal_d_SortOrder: typeof SortOrder;
  type automationsActioncatalogV1Action_universal_d_Paging = Paging;
  type automationsActioncatalogV1Action_universal_d_CursorPaging = CursorPaging;
  type automationsActioncatalogV1Action_universal_d_ResolveActionsResponse = ResolveActionsResponse;
  type automationsActioncatalogV1Action_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type automationsActioncatalogV1Action_universal_d_Cursors = Cursors;
  type automationsActioncatalogV1Action_universal_d_CopyInputMappingRequest = CopyInputMappingRequest;
  type automationsActioncatalogV1Action_universal_d_CopyInputMappingResponse = CopyInputMappingResponse;
  const automationsActioncatalogV1Action_universal_d_getRuntimeAction: typeof getRuntimeAction;
  type automationsActioncatalogV1Action_universal_d_GetRuntimeActionIdentifiers = GetRuntimeActionIdentifiers;
  const automationsActioncatalogV1Action_universal_d_getActionDynamicInputSchema: typeof getActionDynamicInputSchema;
  type automationsActioncatalogV1Action_universal_d_GetActionDynamicInputSchemaOptions = GetActionDynamicInputSchemaOptions;
  const automationsActioncatalogV1Action_universal_d_resolveActions: typeof resolveActions;
  type automationsActioncatalogV1Action_universal_d_ResolveActionsOptions = ResolveActionsOptions;
  const automationsActioncatalogV1Action_universal_d_copyInputMapping: typeof copyInputMapping;
  type automationsActioncatalogV1Action_universal_d_CopyInputMappingOptions = CopyInputMappingOptions;
  namespace automationsActioncatalogV1Action_universal_d {
    export {
      automationsActioncatalogV1Action_universal_d_Action as Action,
      automationsActioncatalogV1Action_universal_d_Type as Type,
      automationsActioncatalogV1Action_universal_d_WidgetComponentOptions as WidgetComponentOptions,
      automationsActioncatalogV1Action_universal_d_GenericOptions as GenericOptions,
      automationsActioncatalogV1Action_universal_d_Metadata as Metadata,
      automationsActioncatalogV1Action_universal_d_ImplementedMethods as ImplementedMethods,
      automationsActioncatalogV1Action_universal_d_ExecutionType as ExecutionType,
      automationsActioncatalogV1Action_universal_d_InterfaceConfiguration as InterfaceConfiguration,
      automationsActioncatalogV1Action_universal_d_InterfaceConfigurationOptionsOneOf as InterfaceConfigurationOptionsOneOf,
      automationsActioncatalogV1Action_universal_d_FocalPoint as FocalPoint,
      automationsActioncatalogV1Action_universal_d_GetRuntimeActionRequest as GetRuntimeActionRequest,
      automationsActioncatalogV1Action_universal_d_GetRuntimeActionResponse as GetRuntimeActionResponse,
      automationsActioncatalogV1Action_universal_d_GetActionDynamicInputSchemaRequest as GetActionDynamicInputSchemaRequest,
      automationsActioncatalogV1Action_universal_d_GetActionDynamicInputSchemaResponse as GetActionDynamicInputSchemaResponse,
      automationsActioncatalogV1Action_universal_d_ResolveActionsRequest as ResolveActionsRequest,
      automationsActioncatalogV1Action_universal_d_QueryV2 as QueryV2,
      automationsActioncatalogV1Action_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf,
      automationsActioncatalogV1Action_universal_d_Sorting as Sorting,
      automationsActioncatalogV1Action_universal_d_SortOrder as SortOrder,
      automationsActioncatalogV1Action_universal_d_Paging as Paging,
      automationsActioncatalogV1Action_universal_d_CursorPaging as CursorPaging,
      automationsActioncatalogV1Action_universal_d_ResolveActionsResponse as ResolveActionsResponse,
      automationsActioncatalogV1Action_universal_d_PagingMetadataV2 as PagingMetadataV2,
      automationsActioncatalogV1Action_universal_d_Cursors as Cursors,
      automationsActioncatalogV1Action_universal_d_CopyInputMappingRequest as CopyInputMappingRequest,
      automationsActioncatalogV1Action_universal_d_CopyInputMappingResponse as CopyInputMappingResponse,
      automationsActioncatalogV1Action_universal_d_getRuntimeAction as getRuntimeAction,
      automationsActioncatalogV1Action_universal_d_GetRuntimeActionIdentifiers as GetRuntimeActionIdentifiers,
      automationsActioncatalogV1Action_universal_d_getActionDynamicInputSchema as getActionDynamicInputSchema,
      automationsActioncatalogV1Action_universal_d_GetActionDynamicInputSchemaOptions as GetActionDynamicInputSchemaOptions,
      automationsActioncatalogV1Action_universal_d_resolveActions as resolveActions,
      automationsActioncatalogV1Action_universal_d_ResolveActionsOptions as ResolveActionsOptions,
      automationsActioncatalogV1Action_universal_d_copyInputMapping as copyInputMapping,
      automationsActioncatalogV1Action_universal_d_CopyInputMappingOptions as CopyInputMappingOptions,
    };
  }
  
  export { automationsActioncatalogV1Action_universal_d as automationsActionCatalog };
}
