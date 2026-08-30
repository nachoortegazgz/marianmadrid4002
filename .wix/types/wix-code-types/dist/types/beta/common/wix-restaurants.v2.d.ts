declare module "wix-restaurants.v2" {
  interface ModifierGroup$1 {
      /**
       * Modifier group ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the modifier group is updated. To prevent conflicting changes, the current revision must be passed when updating the modifier group. Ignored when creating a modifier group.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the modifier group was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the modifier group was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Modifier group name. */
      name?: string | null;
      /** Group of item modifiers. */
      modifiers?: Modifier$1[];
      /** Modifier group details. */
      rule?: Rule$1;
      /** Extended fields. */
      extendedFields?: ExtendedFields$9;
  }
  interface Modifier$1 {
      /** Item modifier ID. */
      _id?: string;
      /**
       * Deprecated, modifier additional charge. Can be 0 to represent free.
       * @internal
       * @deprecated Deprecated, modifier additional charge. Can be 0 to represent free.
       * @replacedBy AdditionalChargeInfo.additional_charge
       * @targetRemovalDate 2024-06-30
       */
      additionalCharge?: string | null;
      /**
       * Whether the item modifier is pre-selected.
       * Default: `false`.
       */
      preSelected?: boolean | null;
      /** Item modifier price details. */
      additionalChargeInfo?: AdditionalChargeInfo;
  }
  interface AdditionalChargeInfo {
      /** Additional charge for the item modifier. A value of `0` means the item modifier is free. */
      additionalCharge?: string | null;
      /**
       * Formatted additional charge.
       * @internal
       * @readonly
       */
      formattedAdditionalCharge?: string | null;
  }
  interface Rule$1 {
      /** Whether the items from the modifier group must be selected. */
      required?: boolean | null;
      /**
       * Minimum number of item modifiers a site visitor must select. The value must be lower or equal to the available item modifiers in the group.
       * Default: `0`.
       */
      minSelections?: number | null;
      /** Minimum number of item modifiers a site visitor must select. Must be greater than or equal to the value of `minSelections`. */
      maxSelections?: number | null;
  }
  interface ExtendedFields$9 {
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
  interface InvalidateCache$9 extends InvalidateCacheGetByOneOf$9 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$9;
      /** Invalidate by page id */
      page?: Page$9;
      /** Invalidate by URI path */
      uri?: URI$9;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$9;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf$9 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$9;
      /** Invalidate by page id */
      page?: Page$9;
      /** Invalidate by URI path */
      uri?: URI$9;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$9;
  }
  interface App$9 {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page$9 {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI$9 {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File$9 {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface CreateModifierGroupRequest {
      /** Modifier group details. */
      modifierGroup: ModifierGroup$1;
  }
  interface CreateModifierGroupResponse {
      /** Modifier group. */
      modifierGroup?: ModifierGroup$1;
  }
  interface GetModifierGroupRequest {
      /** Modifier group ID. */
      modifierGroupId: string;
  }
  interface GetModifierGroupResponse {
      /** Modifier group. */
      modifierGroup?: ModifierGroup$1;
  }
  interface ListModifierGroupRequest {
      /** Modifier group IDs. */
      modifierGroupIds?: string[];
      /** The metadata of the paginated results. */
      paging?: CursorPaging$a;
  }
  interface CursorPaging$a {
      /** Number of items to load. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * You can get the relevant cursor token
       * from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface ListModifierGroupResponse {
      /** Retrieved modifier groups. */
      modifierGroups?: ModifierGroup$1[];
      /** The metadata of the paginated results. */
      metadata?: CursorPagingMetadata$a;
  }
  interface CursorPagingMetadata$a {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      cursors?: Cursors$a;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$a {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface QueryModifierGroupsRequest {
      /** Query options. */
      query?: CursorQuery$b;
  }
  interface CursorQuery$b extends CursorQueryPagingMethodOneOf$b {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$a;
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
      sort?: Sorting$b[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$b {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$a;
  }
  interface Sorting$b {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$b;
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
  enum SortOrder$b {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface QueryModifierGroupsResponse {
      /** Retrieved modifier groups. */
      modifierGroups?: ModifierGroup$1[];
      /** Metadata of the paginated results. */
      pagingMetadata?: CursorPagingMetadata$a;
  }
  interface CountModifierGroupsRequest {
      /** Filter for counting modifier groups. */
      filter?: Record<string, any> | null;
  }
  interface CountModifierGroupsResponse {
      /** Counted modifier groups. */
      count?: number;
  }
  interface UpdateModifierGroupRequest {
      /** Modifier group to update. */
      modifierGroup: ModifierGroup$1;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface UpdateModifierGroupResponse {
      /** Updated modifier group. */
      modifierGroup?: ModifierGroup$1;
  }
  interface DeleteModifierGroupRequest {
      /** Modifier group ID. */
      modifierGroupId: string;
  }
  interface DeleteModifierGroupResponse {
  }
  interface BulkCreateModifierGroupsRequest {
      /** Modifier groups details. */
      modifierGroups: ModifierGroup$1[];
      /** Whether to receive the created modifier groups in the response. */
      returnEntity?: boolean;
  }
  interface BulkCreateModifierGroupsResponse {
      /** Information about the created modifier groups. */
      results?: BulkCreateModifierGroupsResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$9;
  }
  interface BulkCreateModifierGroupsResult {
      /** Metadata for group modifier creation. */
      itemMetadata?: ItemMetadata$9;
      /** Created modifier group. */
      modifierGroup?: ModifierGroup$1;
  }
  interface ItemMetadata$9 {
      /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError$9;
  }
  interface ApplicationError$9 {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  interface BulkActionMetadata$9 {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface BulkUpdateModifierGroupsRequest {
      /** Modifier groups to update. */
      modifierGroups: MaskedModifierGroup[];
      /** Whether to receive the updated modifier groups in the response. */
      returnEntity?: boolean;
  }
  interface MaskedModifierGroup {
      /** Modifier group to update. */
      modifierGroup?: ModifierGroup$1;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface BulkUpdateModifierGroupsResponse {
      /** Information about the updated modifier groups. */
      results?: BulkUpdateModifierGroupsResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$9;
  }
  interface BulkUpdateModifierGroupsResult {
      /** Metadata for group modifier update. */
      itemMetadata?: ItemMetadata$9;
      /** Updated modifier group. Only returned if `returnEntity` is set to `true`. */
      modifierGroup?: ModifierGroup$1;
  }
  interface BulkDeleteModifierGroupsRequest {
      /** Modifier Group IDs. */
      ids: string[];
  }
  interface BulkDeleteModifierGroupsResponse {
      /** Information about the deleted modifier group. */
      results?: BulkDeleteModifierGroupsResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$9;
  }
  interface BulkDeleteModifierGroupsResult {
      /** Metadata for group modifier deletion. */
      itemMetadata?: ItemMetadata$9;
  }
  interface CloneModifierGroupsRequest {
      /** The MetaSiteId to clone from. */
      metaSiteId: string;
  }
  interface CloneModifierGroupsResponse {
  }
  interface DomainEvent$c extends DomainEventBodyOneOf$c {
      createdEvent?: EntityCreatedEvent$c;
      updatedEvent?: EntityUpdatedEvent$c;
      deletedEvent?: EntityDeletedEvent$c;
      actionEvent?: ActionEvent$c;
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
  interface DomainEventBodyOneOf$c {
      createdEvent?: EntityCreatedEvent$c;
      updatedEvent?: EntityUpdatedEvent$c;
      deletedEvent?: EntityDeletedEvent$c;
      actionEvent?: ActionEvent$c;
  }
  interface EntityCreatedEvent$c {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$c;
  }
  interface RestoreInfo$c {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$c {
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
  }
  interface EntityDeletedEvent$c {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
  }
  interface ActionEvent$c {
      bodyAsJson?: string;
  }
  interface Empty$b {
  }
  interface MessageEnvelope$c {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$c;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$c extends IdentificationDataIdOneOf$c {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$c;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$c {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$c {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * > **Note:** The Item Modifier Groups API only works with the Wix Restaurants Menus (New) app. Make sure you downloaded this app from [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Creates a modifier group.
   *
   * To create multiple modifier groups at once, use [Bulk Create Modifiers](https://dev.wix.com/docs/rest/business-solutions/restaurants/menus/item-modifier-groups/bulk-create-modifier-groups).
   * @param modifierGroup - Modifier group details.
   * @public
   * @documentationMaturity preview
   * @requiredField modifierGroup
   * @requiredField modifierGroup.name
   * @permissionId RESTAURANTS.MODIFIER_GROUP_CREATE
   * @adminMethod
   * @returns Modifier group.
   */
  function createModifierGroup(modifierGroup: ModifierGroup$1): Promise<ModifierGroup$1>;
  /**
   * > **Note:** The Item Modifier Groups API only works with the Wix Restaurants Menus (New) app. Make sure you downloaded this app from [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves a modifier group by the ID.
   * @param modifierGroupId - Modifier group ID.
   * @public
   * @documentationMaturity preview
   * @requiredField modifierGroupId
   * @permissionId RESTAURANTS.MODIFIER_GROUP_READ
   * @returns Modifier group.
   */
  function getModifierGroup(modifierGroupId: string): Promise<ModifierGroup$1>;
  /**
   * > **Note:** The Item Modifier Groups API only works with the Wix Restaurants Menus (New) app. Make sure you downloaded this app from [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves a list of up to 100 modifier groups.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.MODIFIER_GROUP_READ
   */
  function listModifierGroups(options?: ListModifierGroupsOptions): Promise<ListModifierGroupResponse>;
  interface ListModifierGroupsOptions {
      /** Modifier group IDs. */
      modifierGroupIds?: string[];
      /** The metadata of the paginated results. */
      paging?: CursorPaging$a;
  }
  /**
   * Creates a query to retrieve a list of item modifier groups.
   *
   * The `queryModifierGroups()` function builds a query to retrieve a list of item modifier groups and returns a `ModifierGroupsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is used to run the query using the [`find()`](/item-modifier-groups/modifier-groups-query-builder/find) function.
   *
   * You can refine the query by chaining `ModifierGroupsQueryBuilder` functions onto the query. `ModifierGroupsQueryBuilder` functions enable you to filter, sort, and control the results that `queryModifierGroups()` returns.
   *
   * `queryModifierGroups()` runs with the following `ModifierGroupsQueryBuilder` defaults, which you can override:
   *
   * * [`limit(100)`](/item-modifier-groups/modifier-groups-query-builder/limit)
   * * [`ascending('entityId')`](/item-modifier-groups/modifier-groups-query-builder/ascending)
   *
   * The following `ModifierGroupsQueryBuilder` functions are supported for `queryModifierGroups()`. For a full description of the item modifier group object, see the object returned for the [`items`](/item-modifier-groups/modifier-groups-query-builder/items) property in `ModifierGroupsQueryResult`.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.MODIFIER_GROUP_READ
   */
  function queryModifierGroups(): ModifierGroupsQueryBuilder;
  interface QueryCursorResult$b {
      cursors: Cursors$a;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ModifierGroupsQueryResult extends QueryCursorResult$b {
      items: ModifierGroup$1[];
      query: ModifierGroupsQueryBuilder;
      next: () => Promise<ModifierGroupsQueryResult>;
      prev: () => Promise<ModifierGroupsQueryResult>;
  }
  interface ModifierGroupsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name' | 'modifiers.preSelected' | 'rule.required' | 'rule.minSelections' | 'rule.maxSelections', value: any) => ModifierGroupsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name' | 'modifiers.preSelected' | 'rule.required' | 'rule.minSelections' | 'rule.maxSelections', value: any) => ModifierGroupsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => ModifierGroupsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ModifierGroupsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => ModifierGroupsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ModifierGroupsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: 'name', value: string) => ModifierGroupsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'name' | 'modifiers.id' | 'modifiers.preSelected' | 'rule.required', value: any) => ModifierGroupsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'modifiers' | 'rule', value: boolean) => ModifierGroupsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ModifierGroupsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ModifierGroupsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ModifierGroupsQueryResult>;
  }
  /**
   * > **Note:** The Item API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves the number of modifier groups that match a specified filter.
   *
   * If a filter isn't passed in the request, the endpoint returns the count of all modifier groups.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.MODIFIER_GROUP_READ
   */
  function countModifierGroups(options?: CountModifierGroupsOptions): Promise<CountModifierGroupsResponse>;
  interface CountModifierGroupsOptions {
      /** Filter for counting modifier groups. */
      filter?: Record<string, any> | null;
  }
  /**
   * > **Note:** The Item Modifier Groups API only works with the Wix Restaurants Menus (New) app. Make sure you downloaded this app from [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Updates a modifier group.
   *
   * Each time a modifier group is updated, its revision increments by 1. The existing revision must be included when updating the modifier group. This ensures you're working with the latest modifier group information, and it prevents unintended overwrites.
   * @param _id - Modifier group ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField modifierGroup
   * @requiredField modifierGroup.revision
   * @permissionId RESTAURANTS.MODIFIER_GROUP_UPDATE
   * @adminMethod
   * @returns Updated modifier group.
   */
  function updateModifierGroup(_id: string | null, modifierGroup: UpdateModifierGroup, options?: UpdateModifierGroupOptions): Promise<ModifierGroup$1>;
  interface UpdateModifierGroup {
      /**
       * Modifier group ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the modifier group is updated. To prevent conflicting changes, the current revision must be passed when updating the modifier group. Ignored when creating a modifier group.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the modifier group was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the modifier group was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Modifier group name. */
      name?: string | null;
      /** Group of item modifiers. */
      modifiers?: Modifier$1[];
      /** Modifier group details. */
      rule?: Rule$1;
      /** Extended fields. */
      extendedFields?: ExtendedFields$9;
  }
  interface UpdateModifierGroupOptions {
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  /**
   * > **Note:** The Item Modifier Groups API only works with the Wix Restaurants Menus (New) app. Make sure you downloaded this app from [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Deletes a modifier group.
   * @param modifierGroupId - Modifier group ID.
   * @public
   * @documentationMaturity preview
   * @requiredField modifierGroupId
   * @permissionId RESTAURANTS.MODIFIER_GROUP_DELETE
   * @adminMethod
   */
  function deleteModifierGroup(modifierGroupId: string): Promise<void>;
  /**
   * > **Note:** The Item Modifier Groups API only works with the Wix Restaurants Menus (New) app. Make sure you downloaded this app from [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Creates multiple modifier groups.
   * @param modifierGroups - Modifier groups details.
   * @public
   * @documentationMaturity preview
   * @requiredField modifierGroups
   * @permissionId RESTAURANTS.MODIFIER_GROUP_CREATE
   * @adminMethod
   */
  function bulkCreateModifierGroups(modifierGroups: ModifierGroup$1[], options?: BulkCreateModifierGroupsOptions): Promise<BulkCreateModifierGroupsResponse>;
  interface BulkCreateModifierGroupsOptions {
      /** Whether to receive the created modifier groups in the response. */
      returnEntity?: boolean;
  }
  /**
   * > **Note:** The Item Modifier Groups API only works with the Wix Restaurants Menus (New) app. Make sure you downloaded this app from [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Updates multiple item modifier groups at once. This function supports partial updates.
   * Each time a modifier group is updated, its revision increments by 1. The existing revision must be included when updating an item modifier group. This ensures you're working with the latest item information, and prevents unintended overwrites.
   * Up to 100 modifier groups can be returned per request.
   * @param modifierGroups - Modifier groups to update.
   * @public
   * @documentationMaturity preview
   * @requiredField modifierGroups
   * @requiredField modifierGroups.modifierGroup._id
   * @requiredField modifierGroups.modifierGroup.revision
   * @permissionId RESTAURANTS.MODIFIER_GROUP_UPDATE
   * @adminMethod
   */
  function bulkUpdateModifierGroups(modifierGroups: MaskedModifierGroup[], options?: BulkUpdateModifierGroupsOptions): Promise<BulkUpdateModifierGroupsResponse>;
  interface BulkUpdateModifierGroupsOptions {
      /** Whether to receive the updated modifier groups in the response. */
      returnEntity?: boolean;
  }
  /** @param ids - Modifier Group IDs.
   * @public
   * @documentationMaturity preview
   * @requiredField ids
   * @permissionId RESTAURANTS.MODIFIER_GROUP_DELETE
   * @adminMethod
   */
  function bulkDeleteModifierGroups(ids: string[]): Promise<BulkDeleteModifierGroupsResponse>;
  /**
   * Clone modifier groups from a different metasite.
   * @param metaSiteId - The MetaSiteId to clone from.
   * @internal
   * @documentationMaturity preview
   * @requiredField metaSiteId
   * @permissionId RESTAURANTS.MODIFIER_GROUP_CREATE
   * @adminMethod
   */
  function cloneModifierGroups(metaSiteId: string): Promise<void>;
  
  type restaurantsMenusV1ItemModifierGroup_universal_d_AdditionalChargeInfo = AdditionalChargeInfo;
  type restaurantsMenusV1ItemModifierGroup_universal_d_CreateModifierGroupRequest = CreateModifierGroupRequest;
  type restaurantsMenusV1ItemModifierGroup_universal_d_CreateModifierGroupResponse = CreateModifierGroupResponse;
  type restaurantsMenusV1ItemModifierGroup_universal_d_GetModifierGroupRequest = GetModifierGroupRequest;
  type restaurantsMenusV1ItemModifierGroup_universal_d_GetModifierGroupResponse = GetModifierGroupResponse;
  type restaurantsMenusV1ItemModifierGroup_universal_d_ListModifierGroupRequest = ListModifierGroupRequest;
  type restaurantsMenusV1ItemModifierGroup_universal_d_ListModifierGroupResponse = ListModifierGroupResponse;
  type restaurantsMenusV1ItemModifierGroup_universal_d_QueryModifierGroupsRequest = QueryModifierGroupsRequest;
  type restaurantsMenusV1ItemModifierGroup_universal_d_QueryModifierGroupsResponse = QueryModifierGroupsResponse;
  type restaurantsMenusV1ItemModifierGroup_universal_d_CountModifierGroupsRequest = CountModifierGroupsRequest;
  type restaurantsMenusV1ItemModifierGroup_universal_d_CountModifierGroupsResponse = CountModifierGroupsResponse;
  type restaurantsMenusV1ItemModifierGroup_universal_d_UpdateModifierGroupRequest = UpdateModifierGroupRequest;
  type restaurantsMenusV1ItemModifierGroup_universal_d_UpdateModifierGroupResponse = UpdateModifierGroupResponse;
  type restaurantsMenusV1ItemModifierGroup_universal_d_DeleteModifierGroupRequest = DeleteModifierGroupRequest;
  type restaurantsMenusV1ItemModifierGroup_universal_d_DeleteModifierGroupResponse = DeleteModifierGroupResponse;
  type restaurantsMenusV1ItemModifierGroup_universal_d_BulkCreateModifierGroupsRequest = BulkCreateModifierGroupsRequest;
  type restaurantsMenusV1ItemModifierGroup_universal_d_BulkCreateModifierGroupsResponse = BulkCreateModifierGroupsResponse;
  type restaurantsMenusV1ItemModifierGroup_universal_d_BulkCreateModifierGroupsResult = BulkCreateModifierGroupsResult;
  type restaurantsMenusV1ItemModifierGroup_universal_d_BulkUpdateModifierGroupsRequest = BulkUpdateModifierGroupsRequest;
  type restaurantsMenusV1ItemModifierGroup_universal_d_MaskedModifierGroup = MaskedModifierGroup;
  type restaurantsMenusV1ItemModifierGroup_universal_d_BulkUpdateModifierGroupsResponse = BulkUpdateModifierGroupsResponse;
  type restaurantsMenusV1ItemModifierGroup_universal_d_BulkUpdateModifierGroupsResult = BulkUpdateModifierGroupsResult;
  type restaurantsMenusV1ItemModifierGroup_universal_d_BulkDeleteModifierGroupsRequest = BulkDeleteModifierGroupsRequest;
  type restaurantsMenusV1ItemModifierGroup_universal_d_BulkDeleteModifierGroupsResponse = BulkDeleteModifierGroupsResponse;
  type restaurantsMenusV1ItemModifierGroup_universal_d_BulkDeleteModifierGroupsResult = BulkDeleteModifierGroupsResult;
  type restaurantsMenusV1ItemModifierGroup_universal_d_CloneModifierGroupsRequest = CloneModifierGroupsRequest;
  type restaurantsMenusV1ItemModifierGroup_universal_d_CloneModifierGroupsResponse = CloneModifierGroupsResponse;
  const restaurantsMenusV1ItemModifierGroup_universal_d_createModifierGroup: typeof createModifierGroup;
  const restaurantsMenusV1ItemModifierGroup_universal_d_getModifierGroup: typeof getModifierGroup;
  const restaurantsMenusV1ItemModifierGroup_universal_d_listModifierGroups: typeof listModifierGroups;
  type restaurantsMenusV1ItemModifierGroup_universal_d_ListModifierGroupsOptions = ListModifierGroupsOptions;
  const restaurantsMenusV1ItemModifierGroup_universal_d_queryModifierGroups: typeof queryModifierGroups;
  type restaurantsMenusV1ItemModifierGroup_universal_d_ModifierGroupsQueryResult = ModifierGroupsQueryResult;
  type restaurantsMenusV1ItemModifierGroup_universal_d_ModifierGroupsQueryBuilder = ModifierGroupsQueryBuilder;
  const restaurantsMenusV1ItemModifierGroup_universal_d_countModifierGroups: typeof countModifierGroups;
  type restaurantsMenusV1ItemModifierGroup_universal_d_CountModifierGroupsOptions = CountModifierGroupsOptions;
  const restaurantsMenusV1ItemModifierGroup_universal_d_updateModifierGroup: typeof updateModifierGroup;
  type restaurantsMenusV1ItemModifierGroup_universal_d_UpdateModifierGroup = UpdateModifierGroup;
  type restaurantsMenusV1ItemModifierGroup_universal_d_UpdateModifierGroupOptions = UpdateModifierGroupOptions;
  const restaurantsMenusV1ItemModifierGroup_universal_d_deleteModifierGroup: typeof deleteModifierGroup;
  const restaurantsMenusV1ItemModifierGroup_universal_d_bulkCreateModifierGroups: typeof bulkCreateModifierGroups;
  type restaurantsMenusV1ItemModifierGroup_universal_d_BulkCreateModifierGroupsOptions = BulkCreateModifierGroupsOptions;
  const restaurantsMenusV1ItemModifierGroup_universal_d_bulkUpdateModifierGroups: typeof bulkUpdateModifierGroups;
  type restaurantsMenusV1ItemModifierGroup_universal_d_BulkUpdateModifierGroupsOptions = BulkUpdateModifierGroupsOptions;
  const restaurantsMenusV1ItemModifierGroup_universal_d_bulkDeleteModifierGroups: typeof bulkDeleteModifierGroups;
  const restaurantsMenusV1ItemModifierGroup_universal_d_cloneModifierGroups: typeof cloneModifierGroups;
  namespace restaurantsMenusV1ItemModifierGroup_universal_d {
    export {
      ModifierGroup$1 as ModifierGroup,
      Modifier$1 as Modifier,
      restaurantsMenusV1ItemModifierGroup_universal_d_AdditionalChargeInfo as AdditionalChargeInfo,
      Rule$1 as Rule,
      ExtendedFields$9 as ExtendedFields,
      InvalidateCache$9 as InvalidateCache,
      InvalidateCacheGetByOneOf$9 as InvalidateCacheGetByOneOf,
      App$9 as App,
      Page$9 as Page,
      URI$9 as URI,
      File$9 as File,
      restaurantsMenusV1ItemModifierGroup_universal_d_CreateModifierGroupRequest as CreateModifierGroupRequest,
      restaurantsMenusV1ItemModifierGroup_universal_d_CreateModifierGroupResponse as CreateModifierGroupResponse,
      restaurantsMenusV1ItemModifierGroup_universal_d_GetModifierGroupRequest as GetModifierGroupRequest,
      restaurantsMenusV1ItemModifierGroup_universal_d_GetModifierGroupResponse as GetModifierGroupResponse,
      restaurantsMenusV1ItemModifierGroup_universal_d_ListModifierGroupRequest as ListModifierGroupRequest,
      CursorPaging$a as CursorPaging,
      restaurantsMenusV1ItemModifierGroup_universal_d_ListModifierGroupResponse as ListModifierGroupResponse,
      CursorPagingMetadata$a as CursorPagingMetadata,
      Cursors$a as Cursors,
      restaurantsMenusV1ItemModifierGroup_universal_d_QueryModifierGroupsRequest as QueryModifierGroupsRequest,
      CursorQuery$b as CursorQuery,
      CursorQueryPagingMethodOneOf$b as CursorQueryPagingMethodOneOf,
      Sorting$b as Sorting,
      SortOrder$b as SortOrder,
      restaurantsMenusV1ItemModifierGroup_universal_d_QueryModifierGroupsResponse as QueryModifierGroupsResponse,
      restaurantsMenusV1ItemModifierGroup_universal_d_CountModifierGroupsRequest as CountModifierGroupsRequest,
      restaurantsMenusV1ItemModifierGroup_universal_d_CountModifierGroupsResponse as CountModifierGroupsResponse,
      restaurantsMenusV1ItemModifierGroup_universal_d_UpdateModifierGroupRequest as UpdateModifierGroupRequest,
      restaurantsMenusV1ItemModifierGroup_universal_d_UpdateModifierGroupResponse as UpdateModifierGroupResponse,
      restaurantsMenusV1ItemModifierGroup_universal_d_DeleteModifierGroupRequest as DeleteModifierGroupRequest,
      restaurantsMenusV1ItemModifierGroup_universal_d_DeleteModifierGroupResponse as DeleteModifierGroupResponse,
      restaurantsMenusV1ItemModifierGroup_universal_d_BulkCreateModifierGroupsRequest as BulkCreateModifierGroupsRequest,
      restaurantsMenusV1ItemModifierGroup_universal_d_BulkCreateModifierGroupsResponse as BulkCreateModifierGroupsResponse,
      restaurantsMenusV1ItemModifierGroup_universal_d_BulkCreateModifierGroupsResult as BulkCreateModifierGroupsResult,
      ItemMetadata$9 as ItemMetadata,
      ApplicationError$9 as ApplicationError,
      BulkActionMetadata$9 as BulkActionMetadata,
      restaurantsMenusV1ItemModifierGroup_universal_d_BulkUpdateModifierGroupsRequest as BulkUpdateModifierGroupsRequest,
      restaurantsMenusV1ItemModifierGroup_universal_d_MaskedModifierGroup as MaskedModifierGroup,
      restaurantsMenusV1ItemModifierGroup_universal_d_BulkUpdateModifierGroupsResponse as BulkUpdateModifierGroupsResponse,
      restaurantsMenusV1ItemModifierGroup_universal_d_BulkUpdateModifierGroupsResult as BulkUpdateModifierGroupsResult,
      restaurantsMenusV1ItemModifierGroup_universal_d_BulkDeleteModifierGroupsRequest as BulkDeleteModifierGroupsRequest,
      restaurantsMenusV1ItemModifierGroup_universal_d_BulkDeleteModifierGroupsResponse as BulkDeleteModifierGroupsResponse,
      restaurantsMenusV1ItemModifierGroup_universal_d_BulkDeleteModifierGroupsResult as BulkDeleteModifierGroupsResult,
      restaurantsMenusV1ItemModifierGroup_universal_d_CloneModifierGroupsRequest as CloneModifierGroupsRequest,
      restaurantsMenusV1ItemModifierGroup_universal_d_CloneModifierGroupsResponse as CloneModifierGroupsResponse,
      DomainEvent$c as DomainEvent,
      DomainEventBodyOneOf$c as DomainEventBodyOneOf,
      EntityCreatedEvent$c as EntityCreatedEvent,
      RestoreInfo$c as RestoreInfo,
      EntityUpdatedEvent$c as EntityUpdatedEvent,
      EntityDeletedEvent$c as EntityDeletedEvent,
      ActionEvent$c as ActionEvent,
      Empty$b as Empty,
      MessageEnvelope$c as MessageEnvelope,
      IdentificationData$c as IdentificationData,
      IdentificationDataIdOneOf$c as IdentificationDataIdOneOf,
      WebhookIdentityType$c as WebhookIdentityType,
      restaurantsMenusV1ItemModifierGroup_universal_d_createModifierGroup as createModifierGroup,
      restaurantsMenusV1ItemModifierGroup_universal_d_getModifierGroup as getModifierGroup,
      restaurantsMenusV1ItemModifierGroup_universal_d_listModifierGroups as listModifierGroups,
      restaurantsMenusV1ItemModifierGroup_universal_d_ListModifierGroupsOptions as ListModifierGroupsOptions,
      restaurantsMenusV1ItemModifierGroup_universal_d_queryModifierGroups as queryModifierGroups,
      restaurantsMenusV1ItemModifierGroup_universal_d_ModifierGroupsQueryResult as ModifierGroupsQueryResult,
      restaurantsMenusV1ItemModifierGroup_universal_d_ModifierGroupsQueryBuilder as ModifierGroupsQueryBuilder,
      restaurantsMenusV1ItemModifierGroup_universal_d_countModifierGroups as countModifierGroups,
      restaurantsMenusV1ItemModifierGroup_universal_d_CountModifierGroupsOptions as CountModifierGroupsOptions,
      restaurantsMenusV1ItemModifierGroup_universal_d_updateModifierGroup as updateModifierGroup,
      restaurantsMenusV1ItemModifierGroup_universal_d_UpdateModifierGroup as UpdateModifierGroup,
      restaurantsMenusV1ItemModifierGroup_universal_d_UpdateModifierGroupOptions as UpdateModifierGroupOptions,
      restaurantsMenusV1ItemModifierGroup_universal_d_deleteModifierGroup as deleteModifierGroup,
      restaurantsMenusV1ItemModifierGroup_universal_d_bulkCreateModifierGroups as bulkCreateModifierGroups,
      restaurantsMenusV1ItemModifierGroup_universal_d_BulkCreateModifierGroupsOptions as BulkCreateModifierGroupsOptions,
      restaurantsMenusV1ItemModifierGroup_universal_d_bulkUpdateModifierGroups as bulkUpdateModifierGroups,
      restaurantsMenusV1ItemModifierGroup_universal_d_BulkUpdateModifierGroupsOptions as BulkUpdateModifierGroupsOptions,
      restaurantsMenusV1ItemModifierGroup_universal_d_bulkDeleteModifierGroups as bulkDeleteModifierGroups,
      restaurantsMenusV1ItemModifierGroup_universal_d_cloneModifierGroups as cloneModifierGroups,
    };
  }
  
  interface Section {
      /**
       * Section ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the section is updated. To prevent conflicting changes, the current revision must be passed when updating the section. Ignored when creating a section.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the section was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the section was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Section name. */
      name?: string;
      /** Section description. */
      description?: string | null;
      /** Main section image. */
      image?: string;
      /** Additional section images. */
      additionalImages?: string[];
      /** Item IDs. */
      itemIds?: string[];
      /** Extended fields. */
      extendedFields?: ExtendedFields$8;
      /** Whether the section is visible in the menu for site visitors. */
      visible?: boolean | null;
      /**
       * @internal
       * @readonly
       */
      oloMigrationSectionId?: string | null;
  }
  interface ExtendedFields$8 {
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
  interface InvalidateCache$8 extends InvalidateCacheGetByOneOf$8 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$8;
      /** Invalidate by page id */
      page?: Page$8;
      /** Invalidate by URI path */
      uri?: URI$8;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$8;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf$8 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$8;
      /** Invalidate by page id */
      page?: Page$8;
      /** Invalidate by URI path */
      uri?: URI$8;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$8;
  }
  interface App$8 {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page$8 {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI$8 {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File$8 {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface CreateSectionRequest {
      /** Section details. */
      section: Section;
  }
  interface CreateSectionResponse {
      /** Section. */
      section?: Section;
  }
  interface BulkCreateSectionsRequest {
      /** Sections details. */
      sections: Section[];
      /** Whether to receive the created sections in the response. */
      returnEntity?: boolean;
  }
  interface BulkCreateSectionsResponse {
      /** Information about the created sections. */
      results?: BulkCreateSectionResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$8;
  }
  interface BulkCreateSectionResult {
      /** Metadata for created sections. */
      itemMetadata?: ItemMetadata$8;
      /** Created section. Only returned if `returnEntity` is set to `true`. */
      item?: Section;
  }
  interface ItemMetadata$8 {
      /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError$8;
  }
  interface ApplicationError$8 {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  interface BulkActionMetadata$8 {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface GetSectionRequest {
      /** Section ID. */
      sectionId: string;
  }
  interface GetSectionResponse {
      /** Section. */
      section?: Section;
  }
  interface ListSectionsRequest {
      /** Section IDs. */
      sectionIds?: string[];
      /** The metadata of the paginated results. */
      paging?: CursorPaging$9;
      /** Whether to return only sections that are visible to site visitors. */
      onlyVisible?: boolean | null;
  }
  interface CursorPaging$9 {
      /** Number of items to load. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * You can get the relevant cursor token
       * from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface ListSectionsResponse {
      /** Retrieved sections. */
      sections?: Section[];
      /** The metadata of the paginated results. */
      pagingMetadata?: CursorPagingMetadata$9;
  }
  interface CursorPagingMetadata$9 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      cursors?: Cursors$9;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$9 {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface QuerySectionsRequest {
      /** Query options. */
      query?: CursorQuery$a;
  }
  interface CursorQuery$a extends CursorQueryPagingMethodOneOf$a {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$9;
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
      sort?: Sorting$a[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$a {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$9;
  }
  interface Sorting$a {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$a;
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
  enum SortOrder$a {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface QuerySectionsResponse {
      /** Retrieved sections. */
      sections?: Section[];
      /** The metadata of the paginated results. */
      pagingMetadata?: CursorPagingMetadata$9;
  }
  interface UpdateSectionRequest {
      /** Section update. */
      section: Section;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface UpdateSectionResponse {
      /** Updated section. */
      section?: Section;
  }
  interface BulkUpdateSectionRequest {
      /** Sections to update. */
      sections: MaskedSection[];
      /** Whether to receive the updated sections in the response. */
      returnEntity?: boolean;
  }
  interface MaskedSection {
      /** Section update. */
      section?: Section;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface BulkUpdateSectionResponse {
      /** Information about the updated sections. */
      results?: BulkSectionResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$8;
  }
  interface BulkSectionResult {
      /** Whether to receive the updated sections in the response. */
      sectionMetadata?: ItemMetadata$8;
      /** Updated section. Only returned if `returnEntity` is set to `true`. */
      section?: Section;
  }
  interface DeleteSectionRequest {
      /** Section ID. */
      sectionId: string;
  }
  interface DeleteSectionResponse {
  }
  interface BulkDeleteSectionsRequest {
      /** Section IDs. */
      ids: string[];
  }
  interface BulkDeleteSectionsResponse {
      /** Information about the deleted sections. */
      results?: BulkDeleteSectionResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$8;
  }
  interface BulkDeleteSectionResult {
      /** Metadata for deleted sections. */
      itemMetadata?: ItemMetadata$8;
  }
  interface CloneSectionsRequest {
      /** The MetaSiteId to clone from. */
      metaSiteId: string;
  }
  interface CloneSectionsResponse {
  }
  interface DomainEvent$b extends DomainEventBodyOneOf$b {
      createdEvent?: EntityCreatedEvent$b;
      updatedEvent?: EntityUpdatedEvent$b;
      deletedEvent?: EntityDeletedEvent$b;
      actionEvent?: ActionEvent$b;
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
  interface DomainEventBodyOneOf$b {
      createdEvent?: EntityCreatedEvent$b;
      updatedEvent?: EntityUpdatedEvent$b;
      deletedEvent?: EntityDeletedEvent$b;
      actionEvent?: ActionEvent$b;
  }
  interface EntityCreatedEvent$b {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$b;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$b {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$b {
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
  interface EntityDeletedEvent$b {
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
  interface ActionEvent$b {
      bodyAsJson?: string;
  }
  interface Empty$a {
  }
  interface MessageEnvelope$b {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$b;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$b extends IdentificationDataIdOneOf$b {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$b;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$b {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$b {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * > **Note:** The Sections API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Creates a section.
   *
   * To create multiple sections at once, use [Bulk Create Sections](/sections/bulk-create-sections).
   * @param section - Section details.
   * @public
   * @documentationMaturity preview
   * @requiredField section
   * @permissionId RESTAURANTS.SECTION_CREATE
   * @adminMethod
   * @returns Section.
   */
  function createSection(section: Section): Promise<Section>;
  /**
   * > **Note:** The Section API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Creates multiple sections at once.
   * @param sections - Sections details.
   * @public
   * @documentationMaturity preview
   * @requiredField sections
   * @permissionId RESTAURANTS.SECTION_CREATE
   * @adminMethod
   */
  function bulkCreateSections(sections: Section[], options?: BulkCreateSectionsOptions): Promise<BulkCreateSectionsResponse>;
  interface BulkCreateSectionsOptions {
      /** Whether to receive the created sections in the response. */
      returnEntity?: boolean;
  }
  /**
   * > **Note:** The Section API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves a section by ID.
   * @param sectionId - Section ID.
   * @public
   * @documentationMaturity preview
   * @requiredField sectionId
   * @permissionId RESTAURANTS.SECTION_READ
   * @returns Section.
   */
  function getSection(sectionId: string): Promise<Section>;
  /**
   * > **Note:** The Section API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves a list of up to 500 sections.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.SECTION_READ
   */
  function listSections(options?: ListSectionsOptions): Promise<ListSectionsResponse>;
  interface ListSectionsOptions {
      /** Section IDs. */
      sectionIds?: string[];
      /** The metadata of the paginated results. */
      paging?: CursorPaging$9;
      /** Whether to return only sections that are visible to site visitors. */
      onlyVisible?: boolean | null;
  }
  /**
   * Creates a query to retrieve a list of sections.
   *
   * The `querySections()` function builds a query to retrieve a list of sections and returns a `SectionsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is used to run the query using the [`find()`](/sections/sections-query-builder/find) function.
   *
   * You can refine the query by chaining `SectionsQueryBuilder` functions onto the query. `SectionsQueryBuilder` functions enable you to filter, sort, and control the results that `querySections()` returns.
   *
   * `querySections()` runs with the following `SectionsQueryBuilder` defaults, which you can override:
   *
   * * [`limit(100)`](/sections/sections-query-builder/limit)
   * * [`ascending('entityId')`](/sections/sections-query-builder/ascending)
   *
   * The following `SectionsQueryBuilder` functions are supported for `querySections()`. For a full description of the section object, see the object returned for the [`items`](/sections/sections-query-result/items) property in `SectionsQueryResult`.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.SECTION_READ
   */
  function querySections(): SectionsQueryBuilder;
  interface QueryCursorResult$a {
      cursors: Cursors$9;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface SectionsQueryResult extends QueryCursorResult$a {
      items: Section[];
      query: SectionsQueryBuilder;
      next: () => Promise<SectionsQueryResult>;
      prev: () => Promise<SectionsQueryResult>;
  }
  interface SectionsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name' | 'description', value: any) => SectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name' | 'description', value: any) => SectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => SectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => SectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => SectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => SectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: 'name' | 'description', value: string) => SectionsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'name' | 'description', value: any) => SectionsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'image' | 'itemIds', value: boolean) => SectionsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => SectionsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => SectionsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<SectionsQueryResult>;
  }
  /**
   * > **Note:** The Section API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Updates a section.
   *
   * Each time a section is updated, its revision increments by 1. The existing revision must be included when updating a section. This ensures you're working with the latest section information, and it prevents unintended overwrites.
   * @param _id - Section ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField section
   * @requiredField section.revision
   * @permissionId RESTAURANTS.SECTION_UPDATE
   * @adminMethod
   * @returns Updated section.
   */
  function updateSection(_id: string | null, section: UpdateSection, options?: UpdateSectionOptions): Promise<Section>;
  interface UpdateSection {
      /**
       * Section ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the section is updated. To prevent conflicting changes, the current revision must be passed when updating the section. Ignored when creating a section.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the section was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the section was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Section name. */
      name?: string;
      /** Section description. */
      description?: string | null;
      /** Main section image. */
      image?: string;
      /** Additional section images. */
      additionalImages?: string[];
      /** Item IDs. */
      itemIds?: string[];
      /** Extended fields. */
      extendedFields?: ExtendedFields$8;
      /** Whether the section is visible in the menu for site visitors. */
      visible?: boolean | null;
      /**
       * @internal
       * @readonly
       */
      oloMigrationSectionId?: string | null;
  }
  interface UpdateSectionOptions {
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  /**
   * > **Note:** The Section API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Updates multiple sections at once.
   *
   * Each time a section is updated, its revision increments by 1. The existing revision must be included when updating a section. This ensures you're working with the latest section information, and it prevents unintended overwrites.
   * @param sections - Sections to update.
   * @public
   * @documentationMaturity preview
   * @requiredField sections
   * @requiredField sections.section._id
   * @requiredField sections.section.revision
   * @permissionId RESTAURANTS.SECTION_UPDATE
   * @adminMethod
   */
  function bulkUpdateSection(sections: MaskedSection[], options?: BulkUpdateSectionOptions): Promise<BulkUpdateSectionResponse>;
  interface BulkUpdateSectionOptions {
      /** Whether to receive the updated sections in the response. */
      returnEntity?: boolean;
  }
  /**
   * > **Note:** The Section API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Deletes a section.
   * @param sectionId - Section ID.
   * @public
   * @documentationMaturity preview
   * @requiredField sectionId
   * @permissionId RESTAURANTS.SECTION_DELETE
   * @adminMethod
   */
  function deleteSection(sectionId: string): Promise<void>;
  /**
   * > **Note:** The Section API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Deletes multiple sections at once.
   * @param ids - Section IDs.
   * @public
   * @documentationMaturity preview
   * @requiredField ids
   * @permissionId RESTAURANTS.SECTION_DELETE
   * @adminMethod
   */
  function bulkDeleteSections(ids: string[]): Promise<BulkDeleteSectionsResponse>;
  /**
   * Clone sections from a different metasite
   * @param metaSiteId - The MetaSiteId to clone from.
   * @internal
   * @documentationMaturity preview
   * @requiredField metaSiteId
   * @permissionId RESTAURANTS.SECTION_CREATE
   * @adminMethod
   */
  function cloneSections(metaSiteId: string): Promise<void>;
  
  type restaurantsMenusV1Section_universal_d_Section = Section;
  type restaurantsMenusV1Section_universal_d_CreateSectionRequest = CreateSectionRequest;
  type restaurantsMenusV1Section_universal_d_CreateSectionResponse = CreateSectionResponse;
  type restaurantsMenusV1Section_universal_d_BulkCreateSectionsRequest = BulkCreateSectionsRequest;
  type restaurantsMenusV1Section_universal_d_BulkCreateSectionsResponse = BulkCreateSectionsResponse;
  type restaurantsMenusV1Section_universal_d_BulkCreateSectionResult = BulkCreateSectionResult;
  type restaurantsMenusV1Section_universal_d_GetSectionRequest = GetSectionRequest;
  type restaurantsMenusV1Section_universal_d_GetSectionResponse = GetSectionResponse;
  type restaurantsMenusV1Section_universal_d_ListSectionsRequest = ListSectionsRequest;
  type restaurantsMenusV1Section_universal_d_ListSectionsResponse = ListSectionsResponse;
  type restaurantsMenusV1Section_universal_d_QuerySectionsRequest = QuerySectionsRequest;
  type restaurantsMenusV1Section_universal_d_QuerySectionsResponse = QuerySectionsResponse;
  type restaurantsMenusV1Section_universal_d_UpdateSectionRequest = UpdateSectionRequest;
  type restaurantsMenusV1Section_universal_d_UpdateSectionResponse = UpdateSectionResponse;
  type restaurantsMenusV1Section_universal_d_BulkUpdateSectionRequest = BulkUpdateSectionRequest;
  type restaurantsMenusV1Section_universal_d_MaskedSection = MaskedSection;
  type restaurantsMenusV1Section_universal_d_BulkUpdateSectionResponse = BulkUpdateSectionResponse;
  type restaurantsMenusV1Section_universal_d_BulkSectionResult = BulkSectionResult;
  type restaurantsMenusV1Section_universal_d_DeleteSectionRequest = DeleteSectionRequest;
  type restaurantsMenusV1Section_universal_d_DeleteSectionResponse = DeleteSectionResponse;
  type restaurantsMenusV1Section_universal_d_BulkDeleteSectionsRequest = BulkDeleteSectionsRequest;
  type restaurantsMenusV1Section_universal_d_BulkDeleteSectionsResponse = BulkDeleteSectionsResponse;
  type restaurantsMenusV1Section_universal_d_BulkDeleteSectionResult = BulkDeleteSectionResult;
  type restaurantsMenusV1Section_universal_d_CloneSectionsRequest = CloneSectionsRequest;
  type restaurantsMenusV1Section_universal_d_CloneSectionsResponse = CloneSectionsResponse;
  const restaurantsMenusV1Section_universal_d_createSection: typeof createSection;
  const restaurantsMenusV1Section_universal_d_bulkCreateSections: typeof bulkCreateSections;
  type restaurantsMenusV1Section_universal_d_BulkCreateSectionsOptions = BulkCreateSectionsOptions;
  const restaurantsMenusV1Section_universal_d_getSection: typeof getSection;
  const restaurantsMenusV1Section_universal_d_listSections: typeof listSections;
  type restaurantsMenusV1Section_universal_d_ListSectionsOptions = ListSectionsOptions;
  const restaurantsMenusV1Section_universal_d_querySections: typeof querySections;
  type restaurantsMenusV1Section_universal_d_SectionsQueryResult = SectionsQueryResult;
  type restaurantsMenusV1Section_universal_d_SectionsQueryBuilder = SectionsQueryBuilder;
  const restaurantsMenusV1Section_universal_d_updateSection: typeof updateSection;
  type restaurantsMenusV1Section_universal_d_UpdateSection = UpdateSection;
  type restaurantsMenusV1Section_universal_d_UpdateSectionOptions = UpdateSectionOptions;
  const restaurantsMenusV1Section_universal_d_bulkUpdateSection: typeof bulkUpdateSection;
  type restaurantsMenusV1Section_universal_d_BulkUpdateSectionOptions = BulkUpdateSectionOptions;
  const restaurantsMenusV1Section_universal_d_deleteSection: typeof deleteSection;
  const restaurantsMenusV1Section_universal_d_bulkDeleteSections: typeof bulkDeleteSections;
  const restaurantsMenusV1Section_universal_d_cloneSections: typeof cloneSections;
  namespace restaurantsMenusV1Section_universal_d {
    export {
      restaurantsMenusV1Section_universal_d_Section as Section,
      ExtendedFields$8 as ExtendedFields,
      InvalidateCache$8 as InvalidateCache,
      InvalidateCacheGetByOneOf$8 as InvalidateCacheGetByOneOf,
      App$8 as App,
      Page$8 as Page,
      URI$8 as URI,
      File$8 as File,
      restaurantsMenusV1Section_universal_d_CreateSectionRequest as CreateSectionRequest,
      restaurantsMenusV1Section_universal_d_CreateSectionResponse as CreateSectionResponse,
      restaurantsMenusV1Section_universal_d_BulkCreateSectionsRequest as BulkCreateSectionsRequest,
      restaurantsMenusV1Section_universal_d_BulkCreateSectionsResponse as BulkCreateSectionsResponse,
      restaurantsMenusV1Section_universal_d_BulkCreateSectionResult as BulkCreateSectionResult,
      ItemMetadata$8 as ItemMetadata,
      ApplicationError$8 as ApplicationError,
      BulkActionMetadata$8 as BulkActionMetadata,
      restaurantsMenusV1Section_universal_d_GetSectionRequest as GetSectionRequest,
      restaurantsMenusV1Section_universal_d_GetSectionResponse as GetSectionResponse,
      restaurantsMenusV1Section_universal_d_ListSectionsRequest as ListSectionsRequest,
      CursorPaging$9 as CursorPaging,
      restaurantsMenusV1Section_universal_d_ListSectionsResponse as ListSectionsResponse,
      CursorPagingMetadata$9 as CursorPagingMetadata,
      Cursors$9 as Cursors,
      restaurantsMenusV1Section_universal_d_QuerySectionsRequest as QuerySectionsRequest,
      CursorQuery$a as CursorQuery,
      CursorQueryPagingMethodOneOf$a as CursorQueryPagingMethodOneOf,
      Sorting$a as Sorting,
      SortOrder$a as SortOrder,
      restaurantsMenusV1Section_universal_d_QuerySectionsResponse as QuerySectionsResponse,
      restaurantsMenusV1Section_universal_d_UpdateSectionRequest as UpdateSectionRequest,
      restaurantsMenusV1Section_universal_d_UpdateSectionResponse as UpdateSectionResponse,
      restaurantsMenusV1Section_universal_d_BulkUpdateSectionRequest as BulkUpdateSectionRequest,
      restaurantsMenusV1Section_universal_d_MaskedSection as MaskedSection,
      restaurantsMenusV1Section_universal_d_BulkUpdateSectionResponse as BulkUpdateSectionResponse,
      restaurantsMenusV1Section_universal_d_BulkSectionResult as BulkSectionResult,
      restaurantsMenusV1Section_universal_d_DeleteSectionRequest as DeleteSectionRequest,
      restaurantsMenusV1Section_universal_d_DeleteSectionResponse as DeleteSectionResponse,
      restaurantsMenusV1Section_universal_d_BulkDeleteSectionsRequest as BulkDeleteSectionsRequest,
      restaurantsMenusV1Section_universal_d_BulkDeleteSectionsResponse as BulkDeleteSectionsResponse,
      restaurantsMenusV1Section_universal_d_BulkDeleteSectionResult as BulkDeleteSectionResult,
      restaurantsMenusV1Section_universal_d_CloneSectionsRequest as CloneSectionsRequest,
      restaurantsMenusV1Section_universal_d_CloneSectionsResponse as CloneSectionsResponse,
      DomainEvent$b as DomainEvent,
      DomainEventBodyOneOf$b as DomainEventBodyOneOf,
      EntityCreatedEvent$b as EntityCreatedEvent,
      RestoreInfo$b as RestoreInfo,
      EntityUpdatedEvent$b as EntityUpdatedEvent,
      EntityDeletedEvent$b as EntityDeletedEvent,
      ActionEvent$b as ActionEvent,
      Empty$a as Empty,
      MessageEnvelope$b as MessageEnvelope,
      IdentificationData$b as IdentificationData,
      IdentificationDataIdOneOf$b as IdentificationDataIdOneOf,
      WebhookIdentityType$b as WebhookIdentityType,
      restaurantsMenusV1Section_universal_d_createSection as createSection,
      restaurantsMenusV1Section_universal_d_bulkCreateSections as bulkCreateSections,
      restaurantsMenusV1Section_universal_d_BulkCreateSectionsOptions as BulkCreateSectionsOptions,
      restaurantsMenusV1Section_universal_d_getSection as getSection,
      restaurantsMenusV1Section_universal_d_listSections as listSections,
      restaurantsMenusV1Section_universal_d_ListSectionsOptions as ListSectionsOptions,
      restaurantsMenusV1Section_universal_d_querySections as querySections,
      restaurantsMenusV1Section_universal_d_SectionsQueryResult as SectionsQueryResult,
      restaurantsMenusV1Section_universal_d_SectionsQueryBuilder as SectionsQueryBuilder,
      restaurantsMenusV1Section_universal_d_updateSection as updateSection,
      restaurantsMenusV1Section_universal_d_UpdateSection as UpdateSection,
      restaurantsMenusV1Section_universal_d_UpdateSectionOptions as UpdateSectionOptions,
      restaurantsMenusV1Section_universal_d_bulkUpdateSection as bulkUpdateSection,
      restaurantsMenusV1Section_universal_d_BulkUpdateSectionOptions as BulkUpdateSectionOptions,
      restaurantsMenusV1Section_universal_d_deleteSection as deleteSection,
      restaurantsMenusV1Section_universal_d_bulkDeleteSections as bulkDeleteSections,
      restaurantsMenusV1Section_universal_d_cloneSections as cloneSections,
    };
  }
  
  interface MenuOrderingSettings {
      /**
       * Menu ordering settings object ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number. Increments by 1 each time the menu ordering settings object is updated. To prevent conflicting changes, the existing revision must be specified when updating a menu ordering settings object.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the menu ordering settings object was created in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the menu ordering settings object was last updated in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** ID of the restaurant operation the menu belongs to. (See the Restaurants Operations API for more information.) */
      operationId?: string | null;
      /**
       * ID of the menu these settings apply to.
       * @readonly
       */
      menuId?: string | null;
      /** Whether online ordering is enabled for the menu. */
      onlineOrderingEnabled?: boolean | null;
      /** Menu availability settings. */
      availability?: Availability$1;
      /**
       * Location ID associated with the menu.
       * @internal
       * @readonly
       */
      locationId?: string | null;
      /** Extended fields. */
      extendedFields?: ExtendedFields$7;
  }
  interface Availability$1 extends AvailabilityAvailabilityTypeOptionsOneOf {
      /** Settings for availability on a weekly schedule. */
      weeklyScheduleOptions?: WeeklyScheduleOptions;
      /** Settings for availability within a time range. */
      timestampRangesOptions?: TimestampRangesOptions;
      /** Availability type. */
      type?: AvailabilityType;
      /**
       * Time zone in [Time Zone Database](https://www.iana.org/time-zones) format.
       * @readonly
       */
      timeZone?: string | null;
  }
  /** @oneof */
  interface AvailabilityAvailabilityTypeOptionsOneOf {
      /** Settings for availability on a weekly schedule. */
      weeklyScheduleOptions?: WeeklyScheduleOptions;
      /** Settings for availability within a time range. */
      timestampRangesOptions?: TimestampRangesOptions;
  }
  enum AvailabilityType {
      /** Missing type due to an error. */
      UNSPECIFIED_AVAILABILITY_OPTION = "UNSPECIFIED_AVAILABILITY_OPTION",
      /** Available all the time. */
      ALWAYS_AVAILABLE = "ALWAYS_AVAILABLE",
      /** Available on specific days and times throughout the week. */
      WEEKLY_SCHEDULE = "WEEKLY_SCHEDULE",
      /** Available during a specific time range. */
      TIMESTAMP_RANGES = "TIMESTAMP_RANGES"
  }
  interface WeeklyScheduleOptions {
      /** List of available time ranges for specific days of the week. */
      availableTimes?: DayOfWeekAvailability$2[];
  }
  interface DayOfWeekAvailability$2 {
      /** The day of week this availability relates to. */
      dayOfWeek?: EntitiesDayOfWeek$2;
      /** A list of time ranges during which the fulfillment should be available. */
      timeRanges?: TimeOfDayRange$2[];
  }
  enum EntitiesDayOfWeek$2 {
      /** Monday. */
      MON = "MON",
      /** Tuesday. */
      TUE = "TUE",
      /** Wednesday. */
      WED = "WED",
      /** Thursday. */
      THU = "THU",
      /** Friday. */
      FRI = "FRI",
      /** Saturday. */
      SAT = "SAT",
      /** Sunday. */
      SUN = "SUN"
  }
  interface TimeOfDayRange$2 {
      /** The start time in time of day representation. */
      startTime?: TimeOfDay$2;
      /** The end time in time of day representation. */
      endTime?: TimeOfDay$2;
  }
  interface TimeOfDay$2 {
      /**
       * Hours. <br />
       * Min: `0`. <br />
       * Max: `23`.
       */
      hours?: number;
      /**
       * Minutes. <br />
       * Min: `0`. <br />
       * Max: `23`.
       */
      minutes?: number;
  }
  interface TimestampRangesOptions {
      /** List of available time ranges. */
      ranges?: AvailableRange[];
  }
  interface AvailableRange {
      /** The start time of the availability in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format. */
      startTime?: Date | null;
      /** The end time of the availability in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format. */
      endTime?: Date | null;
  }
  interface ExtendedFields$7 {
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
  interface InvalidateCache$7 extends InvalidateCacheGetByOneOf$7 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$7;
      /** Invalidate by page id */
      page?: Page$7;
      /** Invalidate by URI path */
      uri?: URI$7;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$7;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf$7 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$7;
      /** Invalidate by page id */
      page?: Page$7;
      /** Invalidate by URI path */
      uri?: URI$7;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$7;
  }
  interface App$7 {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page$7 {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI$7 {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File$7 {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface CreateMenuOrderingSettingsRequest {
      /** Menu ordering settings entity details. */
      menuOrderingSettings: MenuOrderingSettings;
  }
  interface CreateMenuOrderingSettingsResponse {
      /** The created menu ordering settings entity. */
      menuOrderingSettings?: MenuOrderingSettings;
  }
  interface GetMenuOrderingSettingsRequest {
      /** ID of the menu ordering settings entity to retrieve. */
      menuOrderingSettingsId: string;
  }
  interface GetMenuOrderingSettingsResponse {
      /** The requested menu ordering settings entity. */
      menuOrderingSettings?: MenuOrderingSettings;
  }
  interface UpsertMenuOrderingSettingsByMenuIdRequest {
      /** Details of the menu ordering settings entity to be created or updated. */
      menuOrderingSettings: MenuOrderingSettings;
      /**
       * Set of fields to update.
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpsertMenuOrderingSettingsByMenuIdResponse {
      /** The created or updated menu ordering settings entity. */
      menuOrderingSettings?: MenuOrderingSettings;
  }
  interface UpdateMenuOrderingSettingsRequest {
      /** Details of the menu ordering settings entity to update. */
      menuOrderingSettings: MenuOrderingSettings;
      /**
       * Set of fields to update.
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateMenuOrderingSettingsResponse {
      /** Updated menu ordering settings entity. */
      menuOrderingSettings?: MenuOrderingSettings;
  }
  interface DeleteMenuOrderingSettingsRequest {
      /** ID of the menu ordering settings entity to delete. */
      menuOrderingSettingsId: string;
  }
  interface DeleteMenuOrderingSettingsResponse {
  }
  interface QueryMenuOrderingSettingsRequest {
      /** WQL expression. */
      query?: CursorQuery$9;
  }
  interface CursorQuery$9 extends CursorQueryPagingMethodOneOf$9 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$8;
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
      sort?: Sorting$9[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$9 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$8;
  }
  interface Sorting$9 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$9;
  }
  enum SortOrder$9 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$8 {
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
  interface QueryMenuOrderingSettingsResponse {
      /** List of menu ordering settings entities. */
      menuOrderingSettings?: MenuOrderingSettings[];
      /** Paging metadata */
      pagingMetadata?: CursorPagingMetadata$8;
  }
  interface CursorPagingMetadata$8 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors$8;
      /**
       * Whether there are more pages to retrieve following the current page.
       *
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$8 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface BulkUpdateMenuOrderingSettingsRequest {
      /** Menu ordering settings entities to update. */
      menusOrderingSettings: MaskedMenuOrderingSettings[];
      /** Whether to receive the entity in the response. */
      returnEntity?: boolean;
  }
  interface MaskedMenuOrderingSettings {
      /** Menu ordering settings entities to update. */
      menuOrderingSettings?: MenuOrderingSettings;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface BulkUpdateMenuOrderingSettingsResponse {
      /** Results of bulk menu ordering settings entities update. */
      results?: BulkMenuOrderingSettingsResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$7;
  }
  interface ItemMetadata$7 {
      /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError$7;
  }
  interface ApplicationError$7 {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  interface BulkMenuOrderingSettingsResult {
      /** Metadata for menu update. */
      menuOrderingSettingsMetadata?: ItemMetadata$7;
      /** Updated menu ordering settings. Only returned if `returnEntity` is set to `true`. */
      menuOrderingSettings?: MenuOrderingSettings;
  }
  interface BulkActionMetadata$7 {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface ListMenusAvailabilityStatusRequest {
      /** The time slot for which to check the availability of menus. */
      timeSlot: TimeSlot;
      /** The ID of the restaurant operation whose menus will be checked. (See the Restaurants Operations API for more information.) */
      operationId?: string | null;
      /** Cursor paging */
      cursorPaging?: CursorPaging$8;
  }
  interface TimeSlot {
      /** The start time of the time slot in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format. */
      startTime?: Date | null;
      /** The end time of the time slot in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format. */
      endTime?: Date | null;
  }
  interface ListMenusAvailabilityStatusResponse {
      /** The retrieved menus' availability statuses. */
      menusAvailabilityStatus?: MenuAvailabilityStatus[];
      /** The metadata of the paginated results. */
      pagingMetadata?: CursorPagingMetadata$8;
  }
  interface MenuAvailabilityStatus {
      /** Menu ID. */
      menuId?: string;
      /** The menu's availability status. */
      availabilityStatus?: AvailabilityStatus;
  }
  enum AvailabilityStatus {
      /** Unknown availability status. */
      UNKNOWN_AVAILABILITY_STATUS = "UNKNOWN_AVAILABILITY_STATUS",
      /** Available. */
      AVAILABLE = "AVAILABLE",
      /** Unavailable. */
      UNAVAILABLE = "UNAVAILABLE"
  }
  interface UpdateExtendedFieldsRequest$1 {
      /** ID of the entity to update. */
      _id: string;
      /** Identifier for the app whose extended fields are being updated. */
      namespace: string;
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData: Record<string, any> | null;
  }
  interface UpdateExtendedFieldsResponse$1 {
      /** The updated menu ordering settings entity. */
      menuOrderingSettings?: MenuOrderingSettings;
  }
  interface DomainEvent$a extends DomainEventBodyOneOf$a {
      createdEvent?: EntityCreatedEvent$a;
      updatedEvent?: EntityUpdatedEvent$a;
      deletedEvent?: EntityDeletedEvent$a;
      actionEvent?: ActionEvent$a;
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
  interface DomainEventBodyOneOf$a {
      createdEvent?: EntityCreatedEvent$a;
      updatedEvent?: EntityUpdatedEvent$a;
      deletedEvent?: EntityDeletedEvent$a;
      actionEvent?: ActionEvent$a;
  }
  interface EntityCreatedEvent$a {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$a;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$a {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$a {
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
  interface EntityDeletedEvent$a {
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
  interface ActionEvent$a {
      bodyAsJson?: string;
  }
  interface Empty$9 {
  }
  interface GetRestaurantsAppClonesStatusRequest {
  }
  interface GetRestaurantsAppClonesStatusResponse {
      /** The requested menu ordering settings entity. */
      retaurantsAppCloneStatus?: RestaurantsAppCloneStatus;
  }
  /** The status of the data cloning process of the Restaurants Apps. */
  interface RestaurantsAppCloneStatus {
      /**
       * Whether the cloning of the orders was completed.
       * @readonly
       */
      ordersCloningCompleted?: boolean;
      /**
       * Whether the cloning of the menus was completed.
       * @readonly
       */
      menusCloningCompleted?: boolean;
  }
  /** Encapsulates all details written to the Greyhound topic when a site's properties are updated. */
  interface SitePropertiesNotification$3 {
      /** The site ID for which this update notification applies. */
      metasiteId?: string;
      /** The actual update event. */
      event?: SitePropertiesEvent$3;
      /** A convenience set of mappings from the MetaSite ID to its constituent services. */
      translations?: Translation$3[];
      /** Context of the notification */
      changeContext?: ChangeContext$3;
  }
  /** The actual update event for a particular notification. */
  interface SitePropertiesEvent$3 {
      /** Version of the site's properties represented by this update. */
      version?: number;
      /**
       * Set of properties that were updated - corresponds to the fields in "properties".
       * @internal
       */
      fields?: string[];
      /** Updated properties. */
      properties?: Properties$3;
  }
  interface Properties$3 {
      /** Site categories. */
      categories?: Categories$3;
      /** Site locale. */
      locale?: Locale$4;
      /**
       * Site language.
       *
       * Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format.
       */
      language?: string | null;
      /**
       * Site currency format used to bill customers.
       *
       * Three-letter currency code in [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
       */
      paymentCurrency?: string | null;
      /** Timezone in `America/New_York` format. */
      timeZone?: string | null;
      /** Email address. */
      email?: string | null;
      /** Phone number. */
      phone?: string | null;
      /** Fax number. */
      fax?: string | null;
      /** Address. */
      address?: Address$3;
      /** Site display name. */
      siteDisplayName?: string | null;
      /** Business name. */
      businessName?: string | null;
      /** Path to the site's logo in Wix Media (without Wix Media base URL). */
      logo?: string | null;
      /** Site description. */
      description?: string | null;
      /**
       * Business schedule. Regular and exceptional time periods when the business is open or the service is available.
       *
       * __Note:__ Not supported by Wix Bookings.
       */
      businessSchedule?: BusinessSchedule$3;
      /** Supported languages of a site and the primary language. */
      multilingual?: Multilingual$3;
      /** Cookie policy the Wix user defined for their site (before the site visitor interacts with/limits it). */
      consentPolicy?: ConsentPolicy$3;
      /**
       * Supported values: `FITNESS SERVICE`, `RESTAURANT`, `BLOG`, `STORE`, `EVENT`, `UNKNOWN`.
       *
       * Site business type.
       */
      businessConfig?: string | null;
      /** External site URL that uses Wix as its headless business solution. */
      externalSiteUrl?: string | null;
      /** Track clicks analytics. */
      trackClicksAnalytics?: boolean;
  }
  interface Categories$3 {
      /** Primary site category. */
      primary?: string;
      /** Secondary site category. */
      secondary?: string[];
      /** Business Term Id */
      businessTermId?: string | null;
  }
  interface Locale$4 {
      /** Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. */
      languageCode?: string;
      /** Two-letter country code in [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) format. */
      country?: string;
  }
  interface Address$3 {
      /** Street name. */
      street?: string;
      /** City name. */
      city?: string;
      /** Two-letter country code in an [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. */
      country?: string;
      /** State. */
      state?: string;
      /** Zip or postal code. */
      zip?: string;
      /** Extra information to be displayed in the address. */
      hint?: AddressHint$3;
      /** Whether this address represents a physical location. */
      isPhysical?: boolean;
      /** Google-formatted version of this address. */
      googleFormattedAddress?: string;
      /** Street number. */
      streetNumber?: string;
      /** Apartment number. */
      apartmentNumber?: string;
      /** Geographic coordinates of location. */
      coordinates?: GeoCoordinates$3;
  }
  /**
   * Extra information on displayed addresses.
   * This is used for display purposes. Used to add additional data about the address, such as "In the passage".
   * Free text. In addition, the user can state where to display the additional description - before, after, or instead of the address string.
   */
  interface AddressHint$3 {
      /** Extra text displayed next to, or instead of, the actual address. */
      text?: string;
      /** Where the extra text should be displayed. */
      placement?: PlacementType$3;
  }
  /** Where the extra text should be displayed: before, after or instead of the actual address. */
  enum PlacementType$3 {
      BEFORE = "BEFORE",
      AFTER = "AFTER",
      REPLACE = "REPLACE"
  }
  /** Geocoordinates for a particular address. */
  interface GeoCoordinates$3 {
      /** Latitude of the location. Must be between -90 and 90. */
      latitude?: number;
      /** Longitude of the location. Must be between -180 and 180. */
      longitude?: number;
  }
  /** Business schedule. Regular and exceptional time periods when the business is open or the service is available. */
  interface BusinessSchedule$3 {
      /** Weekly recurring time periods when the business is regularly open or the service is available. Limited to 100 time periods. */
      periods?: TimePeriod$3[];
      /** Exceptions to the business's regular hours. The business can be open or closed during the exception. */
      specialHourPeriod?: SpecialHourPeriod$3[];
  }
  /** Weekly recurring time periods when the business is regularly open or the service is available. */
  interface TimePeriod$3 {
      /** Day of the week the period starts on. */
      openDay?: DayOfWeek$3;
      /**
       * Time the period starts in 24-hour [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) extended format. Valid values are `00:00` to `24:00`, where `24:00` represents
       * midnight at the end of the specified day.
       */
      openTime?: string;
      /** Day of the week the period ends on. */
      closeDay?: DayOfWeek$3;
      /**
       * Time the period ends in 24-hour [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) extended format. Valid values are `00:00` to `24:00`, where `24:00` represents
       * midnight at the end of the specified day.
       *
       * __Note:__ If `openDay` and `closeDay` specify the same day of the week `closeTime` must be later than `openTime`.
       */
      closeTime?: string;
  }
  /** Enumerates the days of the week. */
  enum DayOfWeek$3 {
      MONDAY = "MONDAY",
      TUESDAY = "TUESDAY",
      WEDNESDAY = "WEDNESDAY",
      THURSDAY = "THURSDAY",
      FRIDAY = "FRIDAY",
      SATURDAY = "SATURDAY",
      SUNDAY = "SUNDAY"
  }
  /** Exception to the business's regular hours. The business can be open or closed during the exception. */
  interface SpecialHourPeriod$3 {
      /** Start date and time of the exception in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format and [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time). */
      startDate?: string;
      /** End date and time of the exception in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format and [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time). */
      endDate?: string;
      /**
       * Whether the business is closed (or the service is not available) during the exception.
       *
       * Default: `true`.
       */
      isClosed?: boolean;
      /** Additional info about the exception. For example, "We close earlier on New Year's Eve." */
      comment?: string;
  }
  interface Multilingual$3 {
      /** Supported languages list. */
      supportedLanguages?: SupportedLanguage$3[];
      /** Whether to redirect to user language. */
      autoRedirect?: boolean;
  }
  interface SupportedLanguage$3 {
      /** Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. */
      languageCode?: string;
      /** Locale. */
      locale?: Locale$4;
      /** Whether the supported language is the primary language for the site. */
      isPrimary?: boolean;
      /** Language icon. */
      countryCode?: string;
      /** How the language will be resolved. For internal use. */
      resolutionMethod?: ResolutionMethod$3;
  }
  enum ResolutionMethod$3 {
      QUERY_PARAM = "QUERY_PARAM",
      SUBDOMAIN = "SUBDOMAIN",
      SUBDIRECTORY = "SUBDIRECTORY"
  }
  interface ConsentPolicy$3 {
      /** Whether the site uses cookies that are essential to site operation. */
      essential?: boolean | null;
      /** Whether the site uses cookies that affect site performance and other functional measurements. */
      functional?: boolean | null;
      /** Whether the site uses cookies that collect analytics about how the site is used (in order to improve it). */
      analytics?: boolean | null;
      /** Whether the site uses cookies that collect information allowing better customization of the experience for a current visitor. */
      advertising?: boolean | null;
      /** CCPA compliance flag. */
      dataToThirdParty?: boolean | null;
  }
  /** A single mapping from the MetaSite ID to a particular service. */
  interface Translation$3 {
      /** The service type. */
      serviceType?: string;
      /** The application definition ID; this only applies to services of type ThirdPartyApps. */
      appDefId?: string;
      /** The instance ID of the service. */
      instanceId?: string;
  }
  interface ChangeContext$3 extends ChangeContextPayloadOneOf$3 {
      /** Properties were updated. */
      propertiesChange?: PropertiesChange$3;
      /** Default properties were created on site creation. */
      siteCreated?: SiteCreated$3;
      /** Properties were cloned on site cloning. */
      siteCloned?: SiteCloned$3;
  }
  /** @oneof */
  interface ChangeContextPayloadOneOf$3 {
      /** Properties were updated. */
      propertiesChange?: PropertiesChange$3;
      /** Default properties were created on site creation. */
      siteCreated?: SiteCreated$3;
      /** Properties were cloned on site cloning. */
      siteCloned?: SiteCloned$3;
  }
  interface PropertiesChange$3 {
  }
  interface SiteCreated$3 {
      /** Origin template site id. */
      originTemplateId?: string | null;
  }
  interface SiteCloned$3 {
      /** Origin site id. */
      originMetaSiteId?: string;
  }
  interface OperationsDataCloningCompleted$1 {
  }
  interface MenusDataCloningCompleted$1 {
  }
  interface MessageEnvelope$a {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$a;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$a extends IdentificationDataIdOneOf$a {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$a;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$a {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$a {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Creates a menu ordering settings entity.
   * @param menuOrderingSettings - Menu ordering settings entity details.
   * @internal
   * @documentationMaturity preview
   * @requiredField menuOrderingSettings
   * @requiredField menuOrderingSettings.menuId
   * @permissionId RESTAURANTS.MENU_ORDERING_SETTINGS_CREATE
   * @adminMethod
   * @returns The created menu ordering settings entity.
   */
  function createMenuOrderingSettings(menuOrderingSettings: MenuOrderingSettings): Promise<MenuOrderingSettings>;
  /**
   * Retrieves a menu ordering settings entity.
   * @param menuOrderingSettingsId - ID of the menu ordering settings entity to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField menuOrderingSettingsId
   * @permissionId RESTAURANTS.MENU_ORDERING_SETTINGS_READ
   * @returns The requested menu ordering settings entity.
   */
  function getMenuOrderingSettings(menuOrderingSettingsId: string): Promise<MenuOrderingSettings>;
  /**
   * Upserts a menu ordering settings entity for a given `menuId`.
   * Try to create a menu ordering settings, in case it already exists - update the menu ordering settings
   * @param menuId - ID of the menu these settings apply to.
   * @public
   * @documentationMaturity preview
   * @requiredField menuId
   * @requiredField menuOrderingSettings
   * @permissionId RESTAURANTS.MENU_ORDERING_SETTINGS_UPSERT
   * @adminMethod
   */
  function upsertMenuOrderingSettingsByMenuId(menuId: string | null, menuOrderingSettings: UpsertMenuOrderingSettingsByMenuIdMenuOrderingSettings, options?: UpsertMenuOrderingSettingsByMenuIdOptions): Promise<UpsertMenuOrderingSettingsByMenuIdResponse>;
  interface UpsertMenuOrderingSettingsByMenuIdMenuOrderingSettings {
      /**
       * Menu ordering settings object ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number. Increments by 1 each time the menu ordering settings object is updated. To prevent conflicting changes, the existing revision must be specified when updating a menu ordering settings object.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the menu ordering settings object was created in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the menu ordering settings object was last updated in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** ID of the restaurant operation the menu belongs to. (See the Restaurants Operations API for more information.) */
      operationId?: string | null;
      /** Whether online ordering is enabled for the menu. */
      onlineOrderingEnabled?: boolean | null;
      /** Menu availability settings. */
      availability?: Availability$1;
      /**
       * Location ID associated with the menu.
       * @internal
       * @readonly
       */
      locationId?: string | null;
      /** Extended fields. */
      extendedFields?: ExtendedFields$7;
  }
  interface UpsertMenuOrderingSettingsByMenuIdOptions {
      /**
       * Set of fields to update.
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Updates a menu ordering settings entity.
   *
   * Each time the menu ordering settings entity is updated, `revision` increments by 1. The current `revision` must be specified when updating the menu ordering settings entity.
   * This ensures you're working with the latest entity and prevents unintended overwrites.
   * @param _id - Menu ordering settings object ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField menuOrderingSettings
   * @requiredField menuOrderingSettings.revision
   * @permissionId RESTAURANTS.MENU_ORDERING_SETTINGS_UPDATE
   * @adminMethod
   * @returns Updated menu ordering settings entity.
   */
  function updateMenuOrderingSettings(_id: string | null, menuOrderingSettings: UpdateMenuOrderingSettings, options?: UpdateMenuOrderingSettingsOptions): Promise<MenuOrderingSettings>;
  interface UpdateMenuOrderingSettings {
      /**
       * Menu ordering settings object ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number. Increments by 1 each time the menu ordering settings object is updated. To prevent conflicting changes, the existing revision must be specified when updating a menu ordering settings object.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the menu ordering settings object was created in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the menu ordering settings object was last updated in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** ID of the restaurant operation the menu belongs to. (See the Restaurants Operations API for more information.) */
      operationId?: string | null;
      /**
       * ID of the menu these settings apply to.
       * @readonly
       */
      menuId?: string | null;
      /** Whether online ordering is enabled for the menu. */
      onlineOrderingEnabled?: boolean | null;
      /** Menu availability settings. */
      availability?: Availability$1;
      /**
       * Location ID associated with the menu.
       * @internal
       * @readonly
       */
      locationId?: string | null;
      /** Extended fields. */
      extendedFields?: ExtendedFields$7;
  }
  interface UpdateMenuOrderingSettingsOptions {
      /**
       * Set of fields to update.
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Deletes a menu ordering settings entity.
   * Deleting an entity permanently removes it from the menu ordering settings list.
   * @param menuOrderingSettingsId - ID of the menu ordering settings entity to delete.
   * @internal
   * @documentationMaturity preview
   * @requiredField menuOrderingSettingsId
   * @permissionId RESTAURANTS.MENU_ORDERING_SETTINGS_DELETE
   * @adminMethod
   */
  function deleteMenuOrderingSettings(menuOrderingSettingsId: string): Promise<void>;
  /**
   * Creates a query to retrieve a list of menu ordering settings objects.
   *
   * The `queryMenuOrderingSettings()` function builds a query to retrieve a list of menu ordering settings objects and returns an `MenuOrderingSettingsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is used to run the query using the [`find()`](/menu-ordering-settings/menu-ordering-settings-query-builder/find) function.
   *
   * You can refine the query by chaining `MenuOrderingSettingsQueryBuilder` functions onto the query. `MenuOrderingSettingsQueryBuilder` functions enable you to filter, sort, and control the results that `queryMenuOrderingSettings()` returns.
   *
   * `queryMenuOrderingSettings()` runs with the following `MenuOrderingSettingsQueryBuilder` defaults, which you can override:
   *
   * - [`limit(50)`](/menu-ordering-settings/menu-ordering-settings-query-builder/limit)
   * - [ascending('_id')](/menu-ordering-settings/menu-ordering-settings-query-builder/ascending)
   *
   * The following `MenuOrderingSettingsQueryBuilder` functions are supported for `queryMenuOrderingSettings()`. For a full description of the menu ordering settings object, see the object returned for the [`items`](/menu-ordering-settings/menu-ordering-settings-query-result/items) property in `MenuOrderingSettingsQueryResult`.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.MENU_ORDERING_SETTINGS_READ
   */
  function queryMenuOrderingSettings(): MenuOrderingSettingsQueryBuilder;
  interface QueryCursorResult$9 {
      cursors: Cursors$8;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface MenuOrderingSettingsQueryResult extends QueryCursorResult$9 {
      items: MenuOrderingSettings[];
      query: MenuOrderingSettingsQueryBuilder;
      next: () => Promise<MenuOrderingSettingsQueryResult>;
      prev: () => Promise<MenuOrderingSettingsQueryResult>;
  }
  interface MenuOrderingSettingsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'operationId' | 'menuId' | 'onlineOrderingEnabled' | 'availability.type', value: any) => MenuOrderingSettingsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'operationId' | 'menuId' | 'onlineOrderingEnabled' | 'availability.type', value: any) => MenuOrderingSettingsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => MenuOrderingSettingsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => MenuOrderingSettingsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => MenuOrderingSettingsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => MenuOrderingSettingsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'operationId' | 'menuId', value: string) => MenuOrderingSettingsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'operationId' | 'menuId' | 'onlineOrderingEnabled' | 'availability.type', value: any[]) => MenuOrderingSettingsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'operationId' | 'menuId' | 'onlineOrderingEnabled' | 'availability.type', value: any) => MenuOrderingSettingsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'operationId' | 'menuId' | 'onlineOrderingEnabled' | 'availability.type', value: boolean) => MenuOrderingSettingsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | '_createdDate' | '_updatedDate' | 'operationId' | 'menuId' | 'onlineOrderingEnabled' | 'availability.type'>) => MenuOrderingSettingsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | '_createdDate' | '_updatedDate' | 'operationId' | 'menuId' | 'onlineOrderingEnabled' | 'availability.type'>) => MenuOrderingSettingsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => MenuOrderingSettingsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => MenuOrderingSettingsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<MenuOrderingSettingsQueryResult>;
  }
  /**
   * Updates multiple menu ordering settings entities at once.
   * Each time a menu ordering settings entity is updated, `revision` increments by 1. The existing revision must be specified when updating the menu ordering settings entity. This ensures you're working with the entity's latest information, and it prevents unintended overwrites.
   * @param menusOrderingSettings - Menu ordering settings entities to update.
   * @public
   * @documentationMaturity preview
   * @requiredField menusOrderingSettings
   * @requiredField menusOrderingSettings.menuOrderingSettings._id
   * @requiredField menusOrderingSettings.menuOrderingSettings.revision
   * @permissionId RESTAURANTS.MENU_ORDERING_SETTINGS_UPDATE
   * @adminMethod
   */
  function bulkUpdateMenuOrderingSettings(menusOrderingSettings: MaskedMenuOrderingSettings[], options?: BulkUpdateMenuOrderingSettingsOptions): Promise<BulkUpdateMenuOrderingSettingsResponse>;
  interface BulkUpdateMenuOrderingSettingsOptions {
      /** Whether to receive the entity in the response. */
      returnEntity?: boolean;
  }
  /**
   * Retrieves a list of a menu's availability statuses for a given time slot and restaurant operation. (See the Restaurants Operations API for more information.)
   * Returns the availability status for the given time slot per menu.
   * @param timeSlot - The time slot for which to check the availability of menus.
   * @public
   * @documentationMaturity preview
   * @requiredField timeSlot
   * @requiredField timeSlot.endTime
   * @requiredField timeSlot.startTime
   * @permissionId RESTAURANTS.MENU_ORDERING_SETTINGS_READ
   */
  function listMenusAvailabilityStatus(timeSlot: TimeSlot, options?: ListMenusAvailabilityStatusOptions): Promise<ListMenusAvailabilityStatusResponse>;
  interface ListMenusAvailabilityStatusOptions {
      /** The ID of the restaurant operation whose menus will be checked. (See the Restaurants Operations API for more information.) */
      operationId?: string | null;
      /** Cursor paging */
      cursorPaging?: CursorPaging$8;
  }
  /**
   * Updates extended fields of a menu ordering settings entity without incrementing its revision.
   * @param _id - ID of the entity to update.
   * @param namespace - Identifier for the app whose extended fields are being updated.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField namespace
   * @requiredField options
   * @requiredField options.namespaceData
   * @permissionId RESTAURANTS.MENU_ORDERING_SETTINGS_UPDATE
   * @adminMethod
   */
  function updateExtendedFields$1(_id: string, namespace: string, options: UpdateExtendedFieldsOptions$1): Promise<UpdateExtendedFieldsResponse$1>;
  interface UpdateExtendedFieldsOptions$1 {
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData: Record<string, any> | null;
  }
  /**
   * Retrieves the clone status of the restaurants apps.
   * In case of uninstalling an app, the clone status will not be changed.
   * For internal use of the service only.
   * @internal
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.APP_CLONES_STATUS_READ
   * @adminMethod
   */
  function getRestaurantsAppClonesStatus(): Promise<GetRestaurantsAppClonesStatusResponse>;
  
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_MenuOrderingSettings = MenuOrderingSettings;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_AvailabilityAvailabilityTypeOptionsOneOf = AvailabilityAvailabilityTypeOptionsOneOf;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_AvailabilityType = AvailabilityType;
  const restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_AvailabilityType: typeof AvailabilityType;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_WeeklyScheduleOptions = WeeklyScheduleOptions;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_TimestampRangesOptions = TimestampRangesOptions;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_AvailableRange = AvailableRange;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_CreateMenuOrderingSettingsRequest = CreateMenuOrderingSettingsRequest;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_CreateMenuOrderingSettingsResponse = CreateMenuOrderingSettingsResponse;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_GetMenuOrderingSettingsRequest = GetMenuOrderingSettingsRequest;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_GetMenuOrderingSettingsResponse = GetMenuOrderingSettingsResponse;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_UpsertMenuOrderingSettingsByMenuIdRequest = UpsertMenuOrderingSettingsByMenuIdRequest;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_UpsertMenuOrderingSettingsByMenuIdResponse = UpsertMenuOrderingSettingsByMenuIdResponse;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_UpdateMenuOrderingSettingsRequest = UpdateMenuOrderingSettingsRequest;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_UpdateMenuOrderingSettingsResponse = UpdateMenuOrderingSettingsResponse;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_DeleteMenuOrderingSettingsRequest = DeleteMenuOrderingSettingsRequest;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_DeleteMenuOrderingSettingsResponse = DeleteMenuOrderingSettingsResponse;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_QueryMenuOrderingSettingsRequest = QueryMenuOrderingSettingsRequest;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_QueryMenuOrderingSettingsResponse = QueryMenuOrderingSettingsResponse;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_BulkUpdateMenuOrderingSettingsRequest = BulkUpdateMenuOrderingSettingsRequest;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_MaskedMenuOrderingSettings = MaskedMenuOrderingSettings;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_BulkUpdateMenuOrderingSettingsResponse = BulkUpdateMenuOrderingSettingsResponse;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_BulkMenuOrderingSettingsResult = BulkMenuOrderingSettingsResult;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_ListMenusAvailabilityStatusRequest = ListMenusAvailabilityStatusRequest;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_TimeSlot = TimeSlot;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_ListMenusAvailabilityStatusResponse = ListMenusAvailabilityStatusResponse;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_MenuAvailabilityStatus = MenuAvailabilityStatus;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_AvailabilityStatus = AvailabilityStatus;
  const restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_AvailabilityStatus: typeof AvailabilityStatus;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_GetRestaurantsAppClonesStatusRequest = GetRestaurantsAppClonesStatusRequest;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_GetRestaurantsAppClonesStatusResponse = GetRestaurantsAppClonesStatusResponse;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_RestaurantsAppCloneStatus = RestaurantsAppCloneStatus;
  const restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_createMenuOrderingSettings: typeof createMenuOrderingSettings;
  const restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_getMenuOrderingSettings: typeof getMenuOrderingSettings;
  const restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_upsertMenuOrderingSettingsByMenuId: typeof upsertMenuOrderingSettingsByMenuId;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_UpsertMenuOrderingSettingsByMenuIdMenuOrderingSettings = UpsertMenuOrderingSettingsByMenuIdMenuOrderingSettings;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_UpsertMenuOrderingSettingsByMenuIdOptions = UpsertMenuOrderingSettingsByMenuIdOptions;
  const restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_updateMenuOrderingSettings: typeof updateMenuOrderingSettings;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_UpdateMenuOrderingSettings = UpdateMenuOrderingSettings;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_UpdateMenuOrderingSettingsOptions = UpdateMenuOrderingSettingsOptions;
  const restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_deleteMenuOrderingSettings: typeof deleteMenuOrderingSettings;
  const restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_queryMenuOrderingSettings: typeof queryMenuOrderingSettings;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_MenuOrderingSettingsQueryResult = MenuOrderingSettingsQueryResult;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_MenuOrderingSettingsQueryBuilder = MenuOrderingSettingsQueryBuilder;
  const restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_bulkUpdateMenuOrderingSettings: typeof bulkUpdateMenuOrderingSettings;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_BulkUpdateMenuOrderingSettingsOptions = BulkUpdateMenuOrderingSettingsOptions;
  const restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_listMenusAvailabilityStatus: typeof listMenusAvailabilityStatus;
  type restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_ListMenusAvailabilityStatusOptions = ListMenusAvailabilityStatusOptions;
  const restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_getRestaurantsAppClonesStatus: typeof getRestaurantsAppClonesStatus;
  namespace restaurantsMenuSettingsV1MenuOrderingSettings_universal_d {
    export {
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_MenuOrderingSettings as MenuOrderingSettings,
      Availability$1 as Availability,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_AvailabilityAvailabilityTypeOptionsOneOf as AvailabilityAvailabilityTypeOptionsOneOf,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_AvailabilityType as AvailabilityType,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_WeeklyScheduleOptions as WeeklyScheduleOptions,
      DayOfWeekAvailability$2 as DayOfWeekAvailability,
      EntitiesDayOfWeek$2 as EntitiesDayOfWeek,
      TimeOfDayRange$2 as TimeOfDayRange,
      TimeOfDay$2 as TimeOfDay,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_TimestampRangesOptions as TimestampRangesOptions,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_AvailableRange as AvailableRange,
      ExtendedFields$7 as ExtendedFields,
      InvalidateCache$7 as InvalidateCache,
      InvalidateCacheGetByOneOf$7 as InvalidateCacheGetByOneOf,
      App$7 as App,
      Page$7 as Page,
      URI$7 as URI,
      File$7 as File,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_CreateMenuOrderingSettingsRequest as CreateMenuOrderingSettingsRequest,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_CreateMenuOrderingSettingsResponse as CreateMenuOrderingSettingsResponse,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_GetMenuOrderingSettingsRequest as GetMenuOrderingSettingsRequest,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_GetMenuOrderingSettingsResponse as GetMenuOrderingSettingsResponse,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_UpsertMenuOrderingSettingsByMenuIdRequest as UpsertMenuOrderingSettingsByMenuIdRequest,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_UpsertMenuOrderingSettingsByMenuIdResponse as UpsertMenuOrderingSettingsByMenuIdResponse,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_UpdateMenuOrderingSettingsRequest as UpdateMenuOrderingSettingsRequest,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_UpdateMenuOrderingSettingsResponse as UpdateMenuOrderingSettingsResponse,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_DeleteMenuOrderingSettingsRequest as DeleteMenuOrderingSettingsRequest,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_DeleteMenuOrderingSettingsResponse as DeleteMenuOrderingSettingsResponse,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_QueryMenuOrderingSettingsRequest as QueryMenuOrderingSettingsRequest,
      CursorQuery$9 as CursorQuery,
      CursorQueryPagingMethodOneOf$9 as CursorQueryPagingMethodOneOf,
      Sorting$9 as Sorting,
      SortOrder$9 as SortOrder,
      CursorPaging$8 as CursorPaging,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_QueryMenuOrderingSettingsResponse as QueryMenuOrderingSettingsResponse,
      CursorPagingMetadata$8 as CursorPagingMetadata,
      Cursors$8 as Cursors,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_BulkUpdateMenuOrderingSettingsRequest as BulkUpdateMenuOrderingSettingsRequest,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_MaskedMenuOrderingSettings as MaskedMenuOrderingSettings,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_BulkUpdateMenuOrderingSettingsResponse as BulkUpdateMenuOrderingSettingsResponse,
      ItemMetadata$7 as ItemMetadata,
      ApplicationError$7 as ApplicationError,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_BulkMenuOrderingSettingsResult as BulkMenuOrderingSettingsResult,
      BulkActionMetadata$7 as BulkActionMetadata,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_ListMenusAvailabilityStatusRequest as ListMenusAvailabilityStatusRequest,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_TimeSlot as TimeSlot,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_ListMenusAvailabilityStatusResponse as ListMenusAvailabilityStatusResponse,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_MenuAvailabilityStatus as MenuAvailabilityStatus,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_AvailabilityStatus as AvailabilityStatus,
      UpdateExtendedFieldsRequest$1 as UpdateExtendedFieldsRequest,
      UpdateExtendedFieldsResponse$1 as UpdateExtendedFieldsResponse,
      DomainEvent$a as DomainEvent,
      DomainEventBodyOneOf$a as DomainEventBodyOneOf,
      EntityCreatedEvent$a as EntityCreatedEvent,
      RestoreInfo$a as RestoreInfo,
      EntityUpdatedEvent$a as EntityUpdatedEvent,
      EntityDeletedEvent$a as EntityDeletedEvent,
      ActionEvent$a as ActionEvent,
      Empty$9 as Empty,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_GetRestaurantsAppClonesStatusRequest as GetRestaurantsAppClonesStatusRequest,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_GetRestaurantsAppClonesStatusResponse as GetRestaurantsAppClonesStatusResponse,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_RestaurantsAppCloneStatus as RestaurantsAppCloneStatus,
      SitePropertiesNotification$3 as SitePropertiesNotification,
      SitePropertiesEvent$3 as SitePropertiesEvent,
      Properties$3 as Properties,
      Categories$3 as Categories,
      Locale$4 as Locale,
      Address$3 as Address,
      AddressHint$3 as AddressHint,
      PlacementType$3 as PlacementType,
      GeoCoordinates$3 as GeoCoordinates,
      BusinessSchedule$3 as BusinessSchedule,
      TimePeriod$3 as TimePeriod,
      DayOfWeek$3 as DayOfWeek,
      SpecialHourPeriod$3 as SpecialHourPeriod,
      Multilingual$3 as Multilingual,
      SupportedLanguage$3 as SupportedLanguage,
      ResolutionMethod$3 as ResolutionMethod,
      ConsentPolicy$3 as ConsentPolicy,
      Translation$3 as Translation,
      ChangeContext$3 as ChangeContext,
      ChangeContextPayloadOneOf$3 as ChangeContextPayloadOneOf,
      PropertiesChange$3 as PropertiesChange,
      SiteCreated$3 as SiteCreated,
      SiteCloned$3 as SiteCloned,
      OperationsDataCloningCompleted$1 as OperationsDataCloningCompleted,
      MenusDataCloningCompleted$1 as MenusDataCloningCompleted,
      MessageEnvelope$a as MessageEnvelope,
      IdentificationData$a as IdentificationData,
      IdentificationDataIdOneOf$a as IdentificationDataIdOneOf,
      WebhookIdentityType$a as WebhookIdentityType,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_createMenuOrderingSettings as createMenuOrderingSettings,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_getMenuOrderingSettings as getMenuOrderingSettings,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_upsertMenuOrderingSettingsByMenuId as upsertMenuOrderingSettingsByMenuId,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_UpsertMenuOrderingSettingsByMenuIdMenuOrderingSettings as UpsertMenuOrderingSettingsByMenuIdMenuOrderingSettings,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_UpsertMenuOrderingSettingsByMenuIdOptions as UpsertMenuOrderingSettingsByMenuIdOptions,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_updateMenuOrderingSettings as updateMenuOrderingSettings,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_UpdateMenuOrderingSettings as UpdateMenuOrderingSettings,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_UpdateMenuOrderingSettingsOptions as UpdateMenuOrderingSettingsOptions,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_deleteMenuOrderingSettings as deleteMenuOrderingSettings,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_queryMenuOrderingSettings as queryMenuOrderingSettings,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_MenuOrderingSettingsQueryResult as MenuOrderingSettingsQueryResult,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_MenuOrderingSettingsQueryBuilder as MenuOrderingSettingsQueryBuilder,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_bulkUpdateMenuOrderingSettings as bulkUpdateMenuOrderingSettings,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_BulkUpdateMenuOrderingSettingsOptions as BulkUpdateMenuOrderingSettingsOptions,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_listMenusAvailabilityStatus as listMenusAvailabilityStatus,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_ListMenusAvailabilityStatusOptions as ListMenusAvailabilityStatusOptions,
      updateExtendedFields$1 as updateExtendedFields,
      UpdateExtendedFieldsOptions$1 as UpdateExtendedFieldsOptions,
      restaurantsMenuSettingsV1MenuOrderingSettings_universal_d_getRestaurantsAppClonesStatus as getRestaurantsAppClonesStatus,
    };
  }
  
  interface Item extends ItemPricingOneOf {
      /** Item price variants. */
      priceVariants?: PriceVariants;
      /** Item price info. */
      priceInfo?: PriceInfo;
      /**
       * Item ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the item is updated. To prevent conflicting changes, the current revision must be passed when updating the item. Ignored when creating a item.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the item was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the item was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Item name. */
      name?: string;
      /** Item description. */
      description?: string | null;
      /** Main item image. */
      image?: string;
      /** Additional item images. */
      additionalImages?: string[];
      /** Item labels. */
      labels?: Label$1[];
      /** Whether the item is visible in the menu for site visitors. */
      visible?: boolean | null;
      /** Online order settings. */
      orderSettings?: OrderSettings;
      /** Item modifier groups. */
      modifierGroups?: ModifierGroup[];
      /** Extended fields. */
      extendedFields?: ExtendedFields$6;
      /**
       * @internal
       * @readonly
       */
      oloMigrationItemId?: string | null;
  }
  /** @oneof */
  interface ItemPricingOneOf {
      /** Item price variants. */
      priceVariants?: PriceVariants;
      /** Item price info. */
      priceInfo?: PriceInfo;
  }
  interface PriceVariants {
      /** List of price variants. */
      variants?: PriceVariant[];
  }
  /** flynt-deleted-field-enum-reserved */
  interface PriceVariant {
      /** Price variant ID. */
      variantId?: string | null;
      /**
       * Price of a variant.
       * @deprecated Price of a variant.
       * @replacedBy pricing.price_variants.variants.price_info
       * @targetRemovalDate 2024-08-01
       */
      price?: string | null;
      /** Price info of a variant. */
      priceInfo?: PriceInfo;
  }
  interface PriceInfo {
      /** Price. */
      price?: string;
      /**
       * Formatted price.
       * @internal
       * @readonly
       */
      formattedPrice?: string | null;
  }
  interface Label$1 {
      /** Item label ID. */
      _id?: string;
  }
  interface OrderSettings {
      /**
       * Whether the item is in stock.
       * Default: `true`.
       */
      inStock?: boolean | null;
      /**
       * Whether a customer can add a special request when ordering this item.
       * Default: `true`.
       */
      acceptSpecialRequests?: boolean | null;
      /**
       * E-com defined tax group for the product.
       * @internal
       */
      taxGroupId?: string | null;
  }
  interface ModifierGroup {
      /** Modifier group ID. */
      _id?: string | null;
  }
  interface ExtendedFields$6 {
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
  interface UpdateDocumentsEvent extends UpdateDocumentsEventOperationOneOf {
      /** insert/update documents */
      update?: DocumentUpdateOperation;
      /** delete by document ids */
      deleteByIds?: DeleteByIdsOperation;
      /** delete documents matching filter */
      deleteByFilter?: DeleteByFilterOperation;
      /** update documents matching filter */
      updateByFilter?: UpdateByFilterOperation;
      /** update only existing documents */
      updateExisting?: UpdateExistingOperation;
      /** application which owns documents */
      appDefId?: string | null;
      /** type of the documents */
      documentType?: string | null;
      /** language of the documents */
      language?: string | null;
      /** site documents belong to */
      msId?: string | null;
  }
  /** @oneof */
  interface UpdateDocumentsEventOperationOneOf {
      /** insert/update documents */
      update?: DocumentUpdateOperation;
      /** delete by document ids */
      deleteByIds?: DeleteByIdsOperation;
      /** delete documents matching filter */
      deleteByFilter?: DeleteByFilterOperation;
      /** update documents matching filter */
      updateByFilter?: UpdateByFilterOperation;
      /** update only existing documents */
      updateExisting?: UpdateExistingOperation;
  }
  interface DocumentUpdateOperation {
      /** documents to index or update */
      documents?: IndexDocument[];
  }
  interface IndexDocument {
      /** data bag with non-searchable fields (url, image) */
      payload?: DocumentPayload;
      /** what type of users should documents be visible to */
      exposure?: Enum;
      /** document with mandatory fields (id, title, description) and with fields specific to the type of the document */
      document?: Record<string, any> | null;
      /** what member groups is the document exposed to. Used only with GROUP_PROTECTED exposure */
      permittedMemberGroups?: string[];
      /** if true SEO is disabled for this document */
      seoHidden?: boolean | null;
      /** if true the page is a lightbox popup */
      isPopup?: boolean | null;
  }
  interface DocumentPayload {
      /** url of the page representing the document */
      url?: string | null;
      /** image which represents the document */
      documentImage?: DocumentImage;
  }
  interface DocumentImage {
      /** the name of the image */
      name?: string;
      /** the width of the image */
      width?: number;
      /** the height of the image */
      height?: number;
  }
  enum Enum {
      /** Default value. Means that permission not set */
      UNKNOWN = "UNKNOWN",
      /** Protected exposure. Exposed to members and owners */
      PROTECTED = "PROTECTED",
      /** Private exposure. Exposed to owners */
      PRIVATE = "PRIVATE",
      /** Public exposure. Visible to everyone */
      PUBLIC = "PUBLIC",
      /** Used for partial updates, to state that exposure is not changing */
      UNCHANGED = "UNCHANGED",
      /** Protected to members of permitted groups and owners */
      GROUP_PROTECTED = "GROUP_PROTECTED"
  }
  interface DeleteByIdsOperation {
      /** ids of the documents to delete */
      documentIds?: string[];
  }
  interface DeleteByFilterOperation {
      /** documents matching this filter wil be deleted. only filterable documents defined in document_type can be used for filtering */
      filter?: Record<string, any> | null;
  }
  interface UpdateByFilterOperation {
      /** documents matching this filter will be updated */
      filter?: Record<string, any> | null;
      /** partial document to apply */
      document?: IndexDocument;
  }
  interface UpdateExistingOperation {
      /** documents to update */
      documents?: IndexDocument[];
  }
  interface DomainEvent$9 extends DomainEventBodyOneOf$9 {
      createdEvent?: EntityCreatedEvent$9;
      updatedEvent?: EntityUpdatedEvent$9;
      deletedEvent?: EntityDeletedEvent$9;
      actionEvent?: ActionEvent$9;
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
  interface DomainEventBodyOneOf$9 {
      createdEvent?: EntityCreatedEvent$9;
      updatedEvent?: EntityUpdatedEvent$9;
      deletedEvent?: EntityDeletedEvent$9;
      actionEvent?: ActionEvent$9;
  }
  interface EntityCreatedEvent$9 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$9;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$9 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$9 {
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
  interface EntityDeletedEvent$9 {
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
  interface ActionEvent$9 {
      bodyAsJson?: string;
  }
  interface Empty$8 {
  }
  interface SearchIndexingNotification {
      /** new state of indexing for the site specified in ms_id */
      indexState?: State;
      /** type of the document the notification is targeted for. Applies to all types if not provided */
      documentType?: string | null;
      /** languaInternalDocumentUpdateByFilterOperationge the notification is targeted for. Applies to all languages if not provided */
      language?: string | null;
      /** site for which notification is targeted */
      msId?: string | null;
  }
  enum State {
      /** default state */
      Unknown = "Unknown",
      /** metasite does not require site search indexing */
      Off = "Off",
      /** metasite requires site search indexing */
      On = "On"
  }
  /** Encapsulates all details written to the Greyhound topic when a site's properties are updated. */
  interface SitePropertiesNotification$2 {
      /** The site ID for which this update notification applies. */
      metasiteId?: string;
      /** The actual update event. */
      event?: SitePropertiesEvent$2;
      /** A convenience set of mappings from the MetaSite ID to its constituent services. */
      translations?: Translation$2[];
      /** Context of the notification */
      changeContext?: ChangeContext$2;
  }
  /** The actual update event for a particular notification. */
  interface SitePropertiesEvent$2 {
      /** Version of the site's properties represented by this update. */
      version?: number;
      /**
       * Set of properties that were updated - corresponds to the fields in "properties".
       * @internal
       */
      fields?: string[];
      /** Updated properties. */
      properties?: Properties$2;
  }
  interface Properties$2 {
      /** Site categories. */
      categories?: Categories$2;
      /** Site locale. */
      locale?: Locale$3;
      /**
       * Site language.
       *
       * Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format.
       */
      language?: string | null;
      /**
       * Site currency format used to bill customers.
       *
       * Three-letter currency code in [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
       */
      paymentCurrency?: string | null;
      /** Timezone in `America/New_York` format. */
      timeZone?: string | null;
      /** Email address. */
      email?: string | null;
      /** Phone number. */
      phone?: string | null;
      /** Fax number. */
      fax?: string | null;
      /** Address. */
      address?: Address$2;
      /** Site display name. */
      siteDisplayName?: string | null;
      /** Business name. */
      businessName?: string | null;
      /** Path to the site's logo in Wix Media (without Wix Media base URL). */
      logo?: string | null;
      /** Site description. */
      description?: string | null;
      /**
       * Business schedule. Regular and exceptional time periods when the business is open or the service is available.
       *
       * __Note:__ Not supported by Wix Bookings.
       */
      businessSchedule?: BusinessSchedule$2;
      /** Supported languages of a site and the primary language. */
      multilingual?: Multilingual$2;
      /** Cookie policy the Wix user defined for their site (before the site visitor interacts with/limits it). */
      consentPolicy?: ConsentPolicy$2;
      /**
       * Supported values: `FITNESS SERVICE`, `RESTAURANT`, `BLOG`, `STORE`, `EVENT`, `UNKNOWN`.
       *
       * Site business type.
       */
      businessConfig?: string | null;
      /** External site URL that uses Wix as its headless business solution. */
      externalSiteUrl?: string | null;
      /** Track clicks analytics. */
      trackClicksAnalytics?: boolean;
  }
  interface Categories$2 {
      /** Primary site category. */
      primary?: string;
      /** Secondary site category. */
      secondary?: string[];
      /** Business Term Id */
      businessTermId?: string | null;
  }
  interface Locale$3 {
      /** Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. */
      languageCode?: string;
      /** Two-letter country code in [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) format. */
      country?: string;
  }
  interface Address$2 {
      /** Street name. */
      street?: string;
      /** City name. */
      city?: string;
      /** Two-letter country code in an [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. */
      country?: string;
      /** State. */
      state?: string;
      /** Zip or postal code. */
      zip?: string;
      /** Extra information to be displayed in the address. */
      hint?: AddressHint$2;
      /** Whether this address represents a physical location. */
      isPhysical?: boolean;
      /** Google-formatted version of this address. */
      googleFormattedAddress?: string;
      /** Street number. */
      streetNumber?: string;
      /** Apartment number. */
      apartmentNumber?: string;
      /** Geographic coordinates of location. */
      coordinates?: GeoCoordinates$2;
  }
  /**
   * Extra information on displayed addresses.
   * This is used for display purposes. Used to add additional data about the address, such as "In the passage".
   * Free text. In addition, the user can state where to display the additional description - before, after, or instead of the address string.
   */
  interface AddressHint$2 {
      /** Extra text displayed next to, or instead of, the actual address. */
      text?: string;
      /** Where the extra text should be displayed. */
      placement?: PlacementType$2;
  }
  /** Where the extra text should be displayed: before, after or instead of the actual address. */
  enum PlacementType$2 {
      BEFORE = "BEFORE",
      AFTER = "AFTER",
      REPLACE = "REPLACE"
  }
  /** Geocoordinates for a particular address. */
  interface GeoCoordinates$2 {
      /** Latitude of the location. Must be between -90 and 90. */
      latitude?: number;
      /** Longitude of the location. Must be between -180 and 180. */
      longitude?: number;
  }
  /** Business schedule. Regular and exceptional time periods when the business is open or the service is available. */
  interface BusinessSchedule$2 {
      /** Weekly recurring time periods when the business is regularly open or the service is available. Limited to 100 time periods. */
      periods?: TimePeriod$2[];
      /** Exceptions to the business's regular hours. The business can be open or closed during the exception. */
      specialHourPeriod?: SpecialHourPeriod$2[];
  }
  /** Weekly recurring time periods when the business is regularly open or the service is available. */
  interface TimePeriod$2 {
      /** Day of the week the period starts on. */
      openDay?: DayOfWeek$2;
      /**
       * Time the period starts in 24-hour [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) extended format. Valid values are `00:00` to `24:00`, where `24:00` represents
       * midnight at the end of the specified day.
       */
      openTime?: string;
      /** Day of the week the period ends on. */
      closeDay?: DayOfWeek$2;
      /**
       * Time the period ends in 24-hour [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) extended format. Valid values are `00:00` to `24:00`, where `24:00` represents
       * midnight at the end of the specified day.
       *
       * __Note:__ If `openDay` and `closeDay` specify the same day of the week `closeTime` must be later than `openTime`.
       */
      closeTime?: string;
  }
  /** Enumerates the days of the week. */
  enum DayOfWeek$2 {
      MONDAY = "MONDAY",
      TUESDAY = "TUESDAY",
      WEDNESDAY = "WEDNESDAY",
      THURSDAY = "THURSDAY",
      FRIDAY = "FRIDAY",
      SATURDAY = "SATURDAY",
      SUNDAY = "SUNDAY"
  }
  /** Exception to the business's regular hours. The business can be open or closed during the exception. */
  interface SpecialHourPeriod$2 {
      /** Start date and time of the exception in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format and [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time). */
      startDate?: string;
      /** End date and time of the exception in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format and [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time). */
      endDate?: string;
      /**
       * Whether the business is closed (or the service is not available) during the exception.
       *
       * Default: `true`.
       */
      isClosed?: boolean;
      /** Additional info about the exception. For example, "We close earlier on New Year's Eve." */
      comment?: string;
  }
  interface Multilingual$2 {
      /** Supported languages list. */
      supportedLanguages?: SupportedLanguage$2[];
      /** Whether to redirect to user language. */
      autoRedirect?: boolean;
  }
  interface SupportedLanguage$2 {
      /** Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. */
      languageCode?: string;
      /** Locale. */
      locale?: Locale$3;
      /** Whether the supported language is the primary language for the site. */
      isPrimary?: boolean;
      /** Language icon. */
      countryCode?: string;
      /** How the language will be resolved. For internal use. */
      resolutionMethod?: ResolutionMethod$2;
  }
  enum ResolutionMethod$2 {
      QUERY_PARAM = "QUERY_PARAM",
      SUBDOMAIN = "SUBDOMAIN",
      SUBDIRECTORY = "SUBDIRECTORY"
  }
  interface ConsentPolicy$2 {
      /** Whether the site uses cookies that are essential to site operation. */
      essential?: boolean | null;
      /** Whether the site uses cookies that affect site performance and other functional measurements. */
      functional?: boolean | null;
      /** Whether the site uses cookies that collect analytics about how the site is used (in order to improve it). */
      analytics?: boolean | null;
      /** Whether the site uses cookies that collect information allowing better customization of the experience for a current visitor. */
      advertising?: boolean | null;
      /** CCPA compliance flag. */
      dataToThirdParty?: boolean | null;
  }
  /** A single mapping from the MetaSite ID to a particular service. */
  interface Translation$2 {
      /** The service type. */
      serviceType?: string;
      /** The application definition ID; this only applies to services of type ThirdPartyApps. */
      appDefId?: string;
      /** The instance ID of the service. */
      instanceId?: string;
  }
  interface ChangeContext$2 extends ChangeContextPayloadOneOf$2 {
      /** Properties were updated. */
      propertiesChange?: PropertiesChange$2;
      /** Default properties were created on site creation. */
      siteCreated?: SiteCreated$2;
      /** Properties were cloned on site cloning. */
      siteCloned?: SiteCloned$2;
  }
  /** @oneof */
  interface ChangeContextPayloadOneOf$2 {
      /** Properties were updated. */
      propertiesChange?: PropertiesChange$2;
      /** Default properties were created on site creation. */
      siteCreated?: SiteCreated$2;
      /** Properties were cloned on site cloning. */
      siteCloned?: SiteCloned$2;
  }
  interface PropertiesChange$2 {
  }
  interface SiteCreated$2 {
      /** Origin template site id. */
      originTemplateId?: string | null;
  }
  interface SiteCloned$2 {
      /** Origin site id. */
      originMetaSiteId?: string;
  }
  interface MessageEnvelope$9 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$9;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$9 extends IdentificationDataIdOneOf$9 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$9;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$9 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$9 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  interface InvalidateCache$6 extends InvalidateCacheGetByOneOf$6 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$6;
      /** Invalidate by page id */
      page?: Page$6;
      /** Invalidate by URI path */
      uri?: URI$6;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$6;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf$6 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$6;
      /** Invalidate by page id */
      page?: Page$6;
      /** Invalidate by URI path */
      uri?: URI$6;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$6;
  }
  interface App$6 {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page$6 {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI$6 {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File$6 {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface CreateItemRequest {
      /** Item details. */
      item: Item;
      /**
       * The source of this request.
       * @internal
       */
      source?: string | null;
  }
  interface CreateItemResponse {
      /** Item. */
      item?: Item;
  }
  interface BulkCreateItemsRequest {
      /** Items details. */
      items: Item[];
      /** Whether to return entity in the response. */
      returnEntity?: boolean;
      /**
       * The source of this request.
       * @internal
       */
      source?: string | null;
  }
  interface BulkCreateItemsResponse {
      /** Information about the created items. */
      results?: BulkCreateItemResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$6;
  }
  interface BulkCreateItemResult {
      /** Metadata for item update. */
      itemMetadata?: ItemMetadata$6;
      /** Created item. */
      item?: Item;
  }
  interface ItemMetadata$6 {
      /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError$6;
  }
  interface ApplicationError$6 {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  interface BulkActionMetadata$6 {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface GetItemRequest {
      /** Item ID. */
      itemId: string;
  }
  interface GetItemResponse {
      /** Item. */
      item?: Item;
  }
  interface ListItemsRequest {
      /** Item IDs. */
      itemIds?: string[];
      /** The metadata of the paginated results. */
      paging?: CursorPaging$7;
      /** Whether to return only items that are visible to site visitors. */
      onlyVisible?: boolean | null;
  }
  interface CursorPaging$7 {
      /** Number of items to load. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * You can get the relevant cursor token
       * from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface ListItemsResponse {
      /** Items. */
      items?: Item[];
      /** The metadata of the paginated results. */
      pagingMetadata?: CursorPagingMetadata$7;
  }
  interface CursorPagingMetadata$7 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      cursors?: Cursors$7;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$7 {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface QueryItemsRequest {
      /** Query options. */
      query?: CursorQuery$8;
  }
  interface CursorQuery$8 extends CursorQueryPagingMethodOneOf$8 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$7;
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
      sort?: Sorting$8[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$8 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$7;
  }
  interface Sorting$8 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$8;
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
  enum SortOrder$8 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface QueryItemsResponse {
      /** Retrieved items. */
      items?: Item[];
      /** The metadata of the paginated results. */
      pagingMetadata?: CursorPagingMetadata$7;
  }
  interface CountItemsRequest {
      /** Filter for counting items. */
      filter?: Record<string, any> | null;
  }
  interface CountItemsResponse {
      /** Counted items. */
      count?: number;
  }
  interface UpdateItemRequest {
      /** Item to update. */
      item: Item;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
      /**
       * The source of this request.
       * @internal
       */
      source?: string | null;
  }
  interface UpdateItemResponse {
      /** Updated item. */
      item?: Item;
  }
  interface BulkUpdateItemRequest {
      /** Items to update. */
      items: MaskedItem[];
      /** Whether to return entity in the response. */
      returnEntity?: boolean;
      /**
       * The source of this request.
       * @internal
       */
      source?: string | null;
  }
  interface MaskedItem {
      /** Item to update. */
      item?: Item;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface BulkUpdateItemResponse {
      /** Information about the updated items. */
      results?: BulkItemResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$6;
  }
  interface BulkItemResult {
      /** Metadata for item update. */
      itemMetadata?: ItemMetadata$6;
      /** Updated item. Only returned if `returnEntity` is set to `true`. */
      item?: Item;
  }
  interface DeleteItemRequest {
      /** Item ID. */
      itemId: string;
      /**
       * The source of this request.
       * @internal
       */
      source?: string | null;
  }
  interface DeleteItemResponse {
  }
  interface BulkDeleteItemsRequest {
      /** Item IDs. */
      ids: string[];
      /**
       * The source of this request.
       * @internal
       */
      source?: string | null;
  }
  interface BulkDeleteItemsResponse {
      /** Information about the deleted items. */
      results?: BulkDeleteItemResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$6;
  }
  interface BulkDeleteItemResult {
      /** Metadata for item delete. */
      itemMetadata?: ItemMetadata$6;
  }
  interface CloneItemsRequest {
      /** The MetaSiteId to clone from. */
      metaSiteId: string;
  }
  interface CloneItemsResponse {
  }
  /**
   * > **Note:** The Item API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Creates an item.
   *
   * To create multiple items at once, use [Bulk Create Items](https://dev.wix.com/docs/rest/business-solutions/restaurants/menus/item/bulk-create-items).
   * @param item - Item details.
   * @public
   * @documentationMaturity preview
   * @requiredField item
   * @requiredField item.modifierGroups._id
   * @permissionId RESTAURANTS.ITEM_CREATE
   * @adminMethod
   * @returns Item.
   */
  function createItem(item: Item, options?: CreateItemOptions): Promise<Item>;
  interface CreateItemOptions {
      /**
       * The source of this request.
       * @internal
       */
      source?: string | null;
  }
  /**
   * > **Note:** The Items API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Creates multiple items at once.
   * @param items - Items details.
   * @public
   * @documentationMaturity preview
   * @requiredField items
   * @requiredField items.modifierGroups._id
   * @permissionId RESTAURANTS.ITEM_CREATE
   * @adminMethod
   */
  function bulkCreateItems(items: Item[], options?: BulkCreateItemsOptions): Promise<BulkCreateItemsResponse>;
  interface BulkCreateItemsOptions {
      /** Whether to return entity in the response. */
      returnEntity?: boolean;
      /**
       * The source of this request.
       * @internal
       */
      source?: string | null;
  }
  /**
   * > **Note:** The Item API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves an item by ID.
   * @param itemId - Item ID.
   * @public
   * @documentationMaturity preview
   * @requiredField itemId
   * @permissionId RESTAURANTS.ITEM_READ
   * @returns Item.
   */
  function getItem(itemId: string): Promise<Item>;
  /**
   * > **Note:** The Item API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves a list of up to 500 items.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.ITEM_READ
   */
  function listItems(options?: ListItemsOptions): Promise<ListItemsResponse>;
  interface ListItemsOptions {
      /** Item IDs. */
      itemIds?: string[];
      /** The metadata of the paginated results. */
      paging?: CursorPaging$7;
      /** Whether to return only items that are visible to site visitors. */
      onlyVisible?: boolean | null;
  }
  /**
   * Creates a query to retrieve a list of items.
   *
   * The `queryItems()` function builds a query to retrieve a list of items and returns a `ItemsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is used to run the query using the [`find()`](/items/items-query-builder/find) function.
   *
   * You can refine the query by chaining `ItemsQueryBuilder` functions onto the query. `ItemsQueryBuilder` functions enable you to filter, sort, and control the results that `queryItems()` returns.
   *
   * `queryItems()` runs with the following `ItemsQueryBuilder` defaults, which you can override:
   *
   * * [`limit(500)`](/items/items-query-builder/limit)
   * * [`ascending('entityId')`](/items/items-query-builder/ascending)
   *
   * The following `ItemsQueryBuilder` functions are supported for `queryItems()`. For a full description of the item object, see the object returned for the [`items`](/items/items-query-result/items) property in `ItemsQueryResult`.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.ITEM_READ
   */
  function queryItems(): ItemsQueryBuilder;
  interface QueryCursorResult$8 {
      cursors: Cursors$7;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ItemsQueryResult extends QueryCursorResult$8 {
      items: Item[];
      query: ItemsQueryBuilder;
      next: () => Promise<ItemsQueryResult>;
      prev: () => Promise<ItemsQueryResult>;
  }
  interface ItemsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'priceVariants.variants.price' | '_id' | '_createdDate' | '_updatedDate' | 'name' | 'description' | 'image.id' | 'orderSettings.inStock' | 'orderSettings.acceptSpecialRequests', value: any) => ItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: 'priceVariants.variants.price' | '_id' | '_createdDate' | '_updatedDate' | 'name' | 'description' | 'image.id' | 'orderSettings.inStock' | 'orderSettings.acceptSpecialRequests', value: any) => ItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => ItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: 'name' | 'description', value: string) => ItemsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'name' | 'description' | 'orderSettings.inStock' | 'orderSettings.acceptSpecialRequests', value: any) => ItemsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'priceVariants.variants' | 'image' | 'labels' | 'orderSettings', value: boolean) => ItemsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ItemsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ItemsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ItemsQueryResult>;
  }
  /**
   * > **Note:** The Item API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves the number of items that match a specified filter.
   *
   * If a filter isn't passed in the request, the endpoint returns the count of all items.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.ITEM_READ
   */
  function countItems(options?: CountItemsOptions): Promise<CountItemsResponse>;
  interface CountItemsOptions {
      /** Filter for counting items. */
      filter?: Record<string, any> | null;
  }
  /**
   * > **Note:** The Item API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Updates an item.
   *
   * To update multiple items at once, use [Bulk Update Item](https://dev.wix.com/docs/rest/business-solutions/restaurants/menus/item/bulk-update-item)
   *
   * Each time an item is updated, its revision increments by 1. The existing revision must be included when updating the item. This ensures you're working with the latest item information, and it prevents unintended overwrites.
   * @param _id - Item ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField item
   * @requiredField item.modifierGroups._id
   * @requiredField item.revision
   * @permissionId RESTAURANTS.ITEM_UPDATE
   * @adminMethod
   * @returns Updated item.
   */
  function updateItem(_id: string | null, item: UpdateItem, options?: UpdateItemOptions): Promise<Item>;
  interface UpdateItem {
      /** Item price variants. */
      priceVariants?: PriceVariants;
      /** Item price info. */
      priceInfo?: PriceInfo;
      /**
       * Item ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the item is updated. To prevent conflicting changes, the current revision must be passed when updating the item. Ignored when creating a item.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the item was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the item was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Item name. */
      name?: string;
      /** Item description. */
      description?: string | null;
      /** Main item image. */
      image?: string;
      /** Additional item images. */
      additionalImages?: string[];
      /** Item labels. */
      labels?: Label$1[];
      /** Whether the item is visible in the menu for site visitors. */
      visible?: boolean | null;
      /** Online order settings. */
      orderSettings?: OrderSettings;
      /** Item modifier groups. */
      modifierGroups?: ModifierGroup[];
      /** Extended fields. */
      extendedFields?: ExtendedFields$6;
      /**
       * @internal
       * @readonly
       */
      oloMigrationItemId?: string | null;
  }
  interface UpdateItemOptions {
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
      /**
       * The source of this request.
       * @internal
       */
      source?: string | null;
  }
  /**
   * > **Note:** The Item API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Updates up to 100 multiple items at once.
   *
   * Each time an item is updated, its revision increments by 1. The existing revision must be included when updating item. This ensures you're working with the latest item information, and it prevents unintended overwrites.
   * @param items - Items to update.
   * @public
   * @documentationMaturity preview
   * @requiredField items
   * @requiredField items.item._id
   * @requiredField items.item.modifierGroups._id
   * @requiredField items.item.revision
   * @permissionId RESTAURANTS.ITEM_UPDATE
   * @adminMethod
   */
  function bulkUpdateItem(items: MaskedItem[], options?: BulkUpdateItemOptions): Promise<BulkUpdateItemResponse>;
  interface BulkUpdateItemOptions {
      /** Whether to return entity in the response. */
      returnEntity?: boolean;
      /**
       * The source of this request.
       * @internal
       */
      source?: string | null;
  }
  /**
   * > **Note:** The Item API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Deletes an item.
   * @param itemId - Item ID.
   * @public
   * @documentationMaturity preview
   * @requiredField itemId
   * @permissionId RESTAURANTS.ITEM_DELETE
   * @adminMethod
   */
  function deleteItem(itemId: string, options?: DeleteItemOptions): Promise<void>;
  interface DeleteItemOptions {
      /**
       * The source of this request.
       * @internal
       */
      source?: string | null;
  }
  /**
   * > **Note:** The Item API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Deletes multiple items at once.
   * @param ids - Item IDs.
   * @public
   * @documentationMaturity preview
   * @requiredField ids
   * @permissionId RESTAURANTS.ITEM_DELETE
   * @adminMethod
   */
  function bulkDeleteItems(ids: string[], options?: BulkDeleteItemsOptions): Promise<BulkDeleteItemsResponse>;
  interface BulkDeleteItemsOptions {
      /**
       * The source of this request.
       * @internal
       */
      source?: string | null;
  }
  /**
   * Clone items from a different metasite.
   * @param metaSiteId - The MetaSiteId to clone from.
   * @internal
   * @documentationMaturity preview
   * @requiredField metaSiteId
   * @permissionId RESTAURANTS.ITEM_CREATE
   * @adminMethod
   */
  function cloneItems(metaSiteId: string): Promise<void>;
  
  type restaurantsMenusV1Item_universal_d_Item = Item;
  type restaurantsMenusV1Item_universal_d_ItemPricingOneOf = ItemPricingOneOf;
  type restaurantsMenusV1Item_universal_d_PriceVariants = PriceVariants;
  type restaurantsMenusV1Item_universal_d_PriceVariant = PriceVariant;
  type restaurantsMenusV1Item_universal_d_PriceInfo = PriceInfo;
  type restaurantsMenusV1Item_universal_d_OrderSettings = OrderSettings;
  type restaurantsMenusV1Item_universal_d_ModifierGroup = ModifierGroup;
  type restaurantsMenusV1Item_universal_d_UpdateDocumentsEvent = UpdateDocumentsEvent;
  type restaurantsMenusV1Item_universal_d_UpdateDocumentsEventOperationOneOf = UpdateDocumentsEventOperationOneOf;
  type restaurantsMenusV1Item_universal_d_DocumentUpdateOperation = DocumentUpdateOperation;
  type restaurantsMenusV1Item_universal_d_IndexDocument = IndexDocument;
  type restaurantsMenusV1Item_universal_d_DocumentPayload = DocumentPayload;
  type restaurantsMenusV1Item_universal_d_DocumentImage = DocumentImage;
  type restaurantsMenusV1Item_universal_d_Enum = Enum;
  const restaurantsMenusV1Item_universal_d_Enum: typeof Enum;
  type restaurantsMenusV1Item_universal_d_DeleteByIdsOperation = DeleteByIdsOperation;
  type restaurantsMenusV1Item_universal_d_DeleteByFilterOperation = DeleteByFilterOperation;
  type restaurantsMenusV1Item_universal_d_UpdateByFilterOperation = UpdateByFilterOperation;
  type restaurantsMenusV1Item_universal_d_UpdateExistingOperation = UpdateExistingOperation;
  type restaurantsMenusV1Item_universal_d_SearchIndexingNotification = SearchIndexingNotification;
  type restaurantsMenusV1Item_universal_d_State = State;
  const restaurantsMenusV1Item_universal_d_State: typeof State;
  type restaurantsMenusV1Item_universal_d_CreateItemRequest = CreateItemRequest;
  type restaurantsMenusV1Item_universal_d_CreateItemResponse = CreateItemResponse;
  type restaurantsMenusV1Item_universal_d_BulkCreateItemsRequest = BulkCreateItemsRequest;
  type restaurantsMenusV1Item_universal_d_BulkCreateItemsResponse = BulkCreateItemsResponse;
  type restaurantsMenusV1Item_universal_d_BulkCreateItemResult = BulkCreateItemResult;
  type restaurantsMenusV1Item_universal_d_GetItemRequest = GetItemRequest;
  type restaurantsMenusV1Item_universal_d_GetItemResponse = GetItemResponse;
  type restaurantsMenusV1Item_universal_d_ListItemsRequest = ListItemsRequest;
  type restaurantsMenusV1Item_universal_d_ListItemsResponse = ListItemsResponse;
  type restaurantsMenusV1Item_universal_d_QueryItemsRequest = QueryItemsRequest;
  type restaurantsMenusV1Item_universal_d_QueryItemsResponse = QueryItemsResponse;
  type restaurantsMenusV1Item_universal_d_CountItemsRequest = CountItemsRequest;
  type restaurantsMenusV1Item_universal_d_CountItemsResponse = CountItemsResponse;
  type restaurantsMenusV1Item_universal_d_UpdateItemRequest = UpdateItemRequest;
  type restaurantsMenusV1Item_universal_d_UpdateItemResponse = UpdateItemResponse;
  type restaurantsMenusV1Item_universal_d_BulkUpdateItemRequest = BulkUpdateItemRequest;
  type restaurantsMenusV1Item_universal_d_MaskedItem = MaskedItem;
  type restaurantsMenusV1Item_universal_d_BulkUpdateItemResponse = BulkUpdateItemResponse;
  type restaurantsMenusV1Item_universal_d_BulkItemResult = BulkItemResult;
  type restaurantsMenusV1Item_universal_d_DeleteItemRequest = DeleteItemRequest;
  type restaurantsMenusV1Item_universal_d_DeleteItemResponse = DeleteItemResponse;
  type restaurantsMenusV1Item_universal_d_BulkDeleteItemsRequest = BulkDeleteItemsRequest;
  type restaurantsMenusV1Item_universal_d_BulkDeleteItemsResponse = BulkDeleteItemsResponse;
  type restaurantsMenusV1Item_universal_d_BulkDeleteItemResult = BulkDeleteItemResult;
  type restaurantsMenusV1Item_universal_d_CloneItemsRequest = CloneItemsRequest;
  type restaurantsMenusV1Item_universal_d_CloneItemsResponse = CloneItemsResponse;
  const restaurantsMenusV1Item_universal_d_createItem: typeof createItem;
  type restaurantsMenusV1Item_universal_d_CreateItemOptions = CreateItemOptions;
  const restaurantsMenusV1Item_universal_d_bulkCreateItems: typeof bulkCreateItems;
  type restaurantsMenusV1Item_universal_d_BulkCreateItemsOptions = BulkCreateItemsOptions;
  const restaurantsMenusV1Item_universal_d_getItem: typeof getItem;
  const restaurantsMenusV1Item_universal_d_listItems: typeof listItems;
  type restaurantsMenusV1Item_universal_d_ListItemsOptions = ListItemsOptions;
  const restaurantsMenusV1Item_universal_d_queryItems: typeof queryItems;
  type restaurantsMenusV1Item_universal_d_ItemsQueryResult = ItemsQueryResult;
  type restaurantsMenusV1Item_universal_d_ItemsQueryBuilder = ItemsQueryBuilder;
  const restaurantsMenusV1Item_universal_d_countItems: typeof countItems;
  type restaurantsMenusV1Item_universal_d_CountItemsOptions = CountItemsOptions;
  const restaurantsMenusV1Item_universal_d_updateItem: typeof updateItem;
  type restaurantsMenusV1Item_universal_d_UpdateItem = UpdateItem;
  type restaurantsMenusV1Item_universal_d_UpdateItemOptions = UpdateItemOptions;
  const restaurantsMenusV1Item_universal_d_bulkUpdateItem: typeof bulkUpdateItem;
  type restaurantsMenusV1Item_universal_d_BulkUpdateItemOptions = BulkUpdateItemOptions;
  const restaurantsMenusV1Item_universal_d_deleteItem: typeof deleteItem;
  type restaurantsMenusV1Item_universal_d_DeleteItemOptions = DeleteItemOptions;
  const restaurantsMenusV1Item_universal_d_bulkDeleteItems: typeof bulkDeleteItems;
  type restaurantsMenusV1Item_universal_d_BulkDeleteItemsOptions = BulkDeleteItemsOptions;
  const restaurantsMenusV1Item_universal_d_cloneItems: typeof cloneItems;
  namespace restaurantsMenusV1Item_universal_d {
    export {
      restaurantsMenusV1Item_universal_d_Item as Item,
      restaurantsMenusV1Item_universal_d_ItemPricingOneOf as ItemPricingOneOf,
      restaurantsMenusV1Item_universal_d_PriceVariants as PriceVariants,
      restaurantsMenusV1Item_universal_d_PriceVariant as PriceVariant,
      restaurantsMenusV1Item_universal_d_PriceInfo as PriceInfo,
      Label$1 as Label,
      restaurantsMenusV1Item_universal_d_OrderSettings as OrderSettings,
      restaurantsMenusV1Item_universal_d_ModifierGroup as ModifierGroup,
      ExtendedFields$6 as ExtendedFields,
      restaurantsMenusV1Item_universal_d_UpdateDocumentsEvent as UpdateDocumentsEvent,
      restaurantsMenusV1Item_universal_d_UpdateDocumentsEventOperationOneOf as UpdateDocumentsEventOperationOneOf,
      restaurantsMenusV1Item_universal_d_DocumentUpdateOperation as DocumentUpdateOperation,
      restaurantsMenusV1Item_universal_d_IndexDocument as IndexDocument,
      restaurantsMenusV1Item_universal_d_DocumentPayload as DocumentPayload,
      restaurantsMenusV1Item_universal_d_DocumentImage as DocumentImage,
      restaurantsMenusV1Item_universal_d_Enum as Enum,
      restaurantsMenusV1Item_universal_d_DeleteByIdsOperation as DeleteByIdsOperation,
      restaurantsMenusV1Item_universal_d_DeleteByFilterOperation as DeleteByFilterOperation,
      restaurantsMenusV1Item_universal_d_UpdateByFilterOperation as UpdateByFilterOperation,
      restaurantsMenusV1Item_universal_d_UpdateExistingOperation as UpdateExistingOperation,
      DomainEvent$9 as DomainEvent,
      DomainEventBodyOneOf$9 as DomainEventBodyOneOf,
      EntityCreatedEvent$9 as EntityCreatedEvent,
      RestoreInfo$9 as RestoreInfo,
      EntityUpdatedEvent$9 as EntityUpdatedEvent,
      EntityDeletedEvent$9 as EntityDeletedEvent,
      ActionEvent$9 as ActionEvent,
      Empty$8 as Empty,
      restaurantsMenusV1Item_universal_d_SearchIndexingNotification as SearchIndexingNotification,
      restaurantsMenusV1Item_universal_d_State as State,
      SitePropertiesNotification$2 as SitePropertiesNotification,
      SitePropertiesEvent$2 as SitePropertiesEvent,
      Properties$2 as Properties,
      Categories$2 as Categories,
      Locale$3 as Locale,
      Address$2 as Address,
      AddressHint$2 as AddressHint,
      PlacementType$2 as PlacementType,
      GeoCoordinates$2 as GeoCoordinates,
      BusinessSchedule$2 as BusinessSchedule,
      TimePeriod$2 as TimePeriod,
      DayOfWeek$2 as DayOfWeek,
      SpecialHourPeriod$2 as SpecialHourPeriod,
      Multilingual$2 as Multilingual,
      SupportedLanguage$2 as SupportedLanguage,
      ResolutionMethod$2 as ResolutionMethod,
      ConsentPolicy$2 as ConsentPolicy,
      Translation$2 as Translation,
      ChangeContext$2 as ChangeContext,
      ChangeContextPayloadOneOf$2 as ChangeContextPayloadOneOf,
      PropertiesChange$2 as PropertiesChange,
      SiteCreated$2 as SiteCreated,
      SiteCloned$2 as SiteCloned,
      MessageEnvelope$9 as MessageEnvelope,
      IdentificationData$9 as IdentificationData,
      IdentificationDataIdOneOf$9 as IdentificationDataIdOneOf,
      WebhookIdentityType$9 as WebhookIdentityType,
      InvalidateCache$6 as InvalidateCache,
      InvalidateCacheGetByOneOf$6 as InvalidateCacheGetByOneOf,
      App$6 as App,
      Page$6 as Page,
      URI$6 as URI,
      File$6 as File,
      restaurantsMenusV1Item_universal_d_CreateItemRequest as CreateItemRequest,
      restaurantsMenusV1Item_universal_d_CreateItemResponse as CreateItemResponse,
      restaurantsMenusV1Item_universal_d_BulkCreateItemsRequest as BulkCreateItemsRequest,
      restaurantsMenusV1Item_universal_d_BulkCreateItemsResponse as BulkCreateItemsResponse,
      restaurantsMenusV1Item_universal_d_BulkCreateItemResult as BulkCreateItemResult,
      ItemMetadata$6 as ItemMetadata,
      ApplicationError$6 as ApplicationError,
      BulkActionMetadata$6 as BulkActionMetadata,
      restaurantsMenusV1Item_universal_d_GetItemRequest as GetItemRequest,
      restaurantsMenusV1Item_universal_d_GetItemResponse as GetItemResponse,
      restaurantsMenusV1Item_universal_d_ListItemsRequest as ListItemsRequest,
      CursorPaging$7 as CursorPaging,
      restaurantsMenusV1Item_universal_d_ListItemsResponse as ListItemsResponse,
      CursorPagingMetadata$7 as CursorPagingMetadata,
      Cursors$7 as Cursors,
      restaurantsMenusV1Item_universal_d_QueryItemsRequest as QueryItemsRequest,
      CursorQuery$8 as CursorQuery,
      CursorQueryPagingMethodOneOf$8 as CursorQueryPagingMethodOneOf,
      Sorting$8 as Sorting,
      SortOrder$8 as SortOrder,
      restaurantsMenusV1Item_universal_d_QueryItemsResponse as QueryItemsResponse,
      restaurantsMenusV1Item_universal_d_CountItemsRequest as CountItemsRequest,
      restaurantsMenusV1Item_universal_d_CountItemsResponse as CountItemsResponse,
      restaurantsMenusV1Item_universal_d_UpdateItemRequest as UpdateItemRequest,
      restaurantsMenusV1Item_universal_d_UpdateItemResponse as UpdateItemResponse,
      restaurantsMenusV1Item_universal_d_BulkUpdateItemRequest as BulkUpdateItemRequest,
      restaurantsMenusV1Item_universal_d_MaskedItem as MaskedItem,
      restaurantsMenusV1Item_universal_d_BulkUpdateItemResponse as BulkUpdateItemResponse,
      restaurantsMenusV1Item_universal_d_BulkItemResult as BulkItemResult,
      restaurantsMenusV1Item_universal_d_DeleteItemRequest as DeleteItemRequest,
      restaurantsMenusV1Item_universal_d_DeleteItemResponse as DeleteItemResponse,
      restaurantsMenusV1Item_universal_d_BulkDeleteItemsRequest as BulkDeleteItemsRequest,
      restaurantsMenusV1Item_universal_d_BulkDeleteItemsResponse as BulkDeleteItemsResponse,
      restaurantsMenusV1Item_universal_d_BulkDeleteItemResult as BulkDeleteItemResult,
      restaurantsMenusV1Item_universal_d_CloneItemsRequest as CloneItemsRequest,
      restaurantsMenusV1Item_universal_d_CloneItemsResponse as CloneItemsResponse,
      restaurantsMenusV1Item_universal_d_createItem as createItem,
      restaurantsMenusV1Item_universal_d_CreateItemOptions as CreateItemOptions,
      restaurantsMenusV1Item_universal_d_bulkCreateItems as bulkCreateItems,
      restaurantsMenusV1Item_universal_d_BulkCreateItemsOptions as BulkCreateItemsOptions,
      restaurantsMenusV1Item_universal_d_getItem as getItem,
      restaurantsMenusV1Item_universal_d_listItems as listItems,
      restaurantsMenusV1Item_universal_d_ListItemsOptions as ListItemsOptions,
      restaurantsMenusV1Item_universal_d_queryItems as queryItems,
      restaurantsMenusV1Item_universal_d_ItemsQueryResult as ItemsQueryResult,
      restaurantsMenusV1Item_universal_d_ItemsQueryBuilder as ItemsQueryBuilder,
      restaurantsMenusV1Item_universal_d_countItems as countItems,
      restaurantsMenusV1Item_universal_d_CountItemsOptions as CountItemsOptions,
      restaurantsMenusV1Item_universal_d_updateItem as updateItem,
      restaurantsMenusV1Item_universal_d_UpdateItem as UpdateItem,
      restaurantsMenusV1Item_universal_d_UpdateItemOptions as UpdateItemOptions,
      restaurantsMenusV1Item_universal_d_bulkUpdateItem as bulkUpdateItem,
      restaurantsMenusV1Item_universal_d_BulkUpdateItemOptions as BulkUpdateItemOptions,
      restaurantsMenusV1Item_universal_d_deleteItem as deleteItem,
      restaurantsMenusV1Item_universal_d_DeleteItemOptions as DeleteItemOptions,
      restaurantsMenusV1Item_universal_d_bulkDeleteItems as bulkDeleteItems,
      restaurantsMenusV1Item_universal_d_BulkDeleteItemsOptions as BulkDeleteItemsOptions,
      restaurantsMenusV1Item_universal_d_cloneItems as cloneItems,
    };
  }
  
  interface Label {
      /**
       * Item label ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the item label is updated. To prevent conflicting changes, the current revision must be passed when updating the item label. Ignored when creating a item label.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the item label was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the item label was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Item label name. */
      name?: string;
      /** Item label icon. */
      icon?: string;
      /** Extended fields. */
      extendedFields?: ExtendedFields$5;
  }
  interface ExtendedFields$5 {
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
  interface InvalidateCache$5 extends InvalidateCacheGetByOneOf$5 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$5;
      /** Invalidate by page id */
      page?: Page$5;
      /** Invalidate by URI path */
      uri?: URI$5;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$5;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf$5 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$5;
      /** Invalidate by page id */
      page?: Page$5;
      /** Invalidate by URI path */
      uri?: URI$5;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$5;
  }
  interface App$5 {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page$5 {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI$5 {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File$5 {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface CreateLabelRequest {
      /** Item label details. */
      label: Label;
  }
  interface CreateLabelResponse {
      /** Item label. */
      label?: Label;
  }
  interface GetLabelRequest {
      /** Item label ID. */
      labelId: string;
  }
  interface GetLabelResponse {
      /** Item label. */
      label?: Label;
  }
  interface ListLabelsRequest {
  }
  interface ListLabelsResponse {
      /** Retrieved item labels. */
      labels?: Label[];
  }
  interface QueryLabelsRequest {
      /** Query options. */
      query?: CursorQuery$7;
  }
  interface CursorQuery$7 extends CursorQueryPagingMethodOneOf$7 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$6;
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
      sort?: Sorting$7[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$7 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$6;
  }
  interface Sorting$7 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$7;
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
  enum SortOrder$7 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$6 {
      /** Number of items to load. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * You can get the relevant cursor token
       * from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface QueryLabelsResponse {
      /** Retrieved item labels. */
      labels?: Label[];
      /** The metadata of the paginated results. */
      pagingMetadata?: CursorPagingMetadata$6;
  }
  interface CursorPagingMetadata$6 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      cursors?: Cursors$6;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$6 {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface UpdateLabelRequest {
      /** Item label to update. */
      label: Label;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface UpdateLabelResponse {
      /** Updated item label. */
      label?: Label;
  }
  interface DeleteLabelRequest {
      /** ID of the item label. */
      labelId: string;
  }
  interface DeleteLabelResponse {
  }
  interface CloneLabelsRequest {
      /** The MetaSiteId to clone from. */
      metaSiteId: string;
  }
  interface CloneLabelsResponse {
  }
  interface DomainEvent$8 extends DomainEventBodyOneOf$8 {
      createdEvent?: EntityCreatedEvent$8;
      updatedEvent?: EntityUpdatedEvent$8;
      deletedEvent?: EntityDeletedEvent$8;
      actionEvent?: ActionEvent$8;
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
  interface DomainEventBodyOneOf$8 {
      createdEvent?: EntityCreatedEvent$8;
      updatedEvent?: EntityUpdatedEvent$8;
      deletedEvent?: EntityDeletedEvent$8;
      actionEvent?: ActionEvent$8;
  }
  interface EntityCreatedEvent$8 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$8;
  }
  interface RestoreInfo$8 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$8 {
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
  }
  interface EntityDeletedEvent$8 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
  }
  interface ActionEvent$8 {
      bodyAsJson?: string;
  }
  interface Empty$7 {
  }
  interface MessageEnvelope$8 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$8;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$8 extends IdentificationDataIdOneOf$8 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$8;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$8 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$8 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * > **Note:** The Label API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Creates an item label.
   * @param label - Item label details.
   * @public
   * @documentationMaturity preview
   * @requiredField label
   * @permissionId RESTAURANTS.LABEL_CREATE
   * @adminMethod
   * @returns Item label.
   */
  function createLabel(label: Label): Promise<Label>;
  /**
   * > **Note:** The Labels API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves an item label by ID.
   * @param labelId - Item label ID.
   * @public
   * @documentationMaturity preview
   * @requiredField labelId
   * @permissionId RESTAURANTS.LABEL_READ
   * @returns Item label.
   */
  function getLabel(labelId: string): Promise<Label>;
  /**
   * > **Note:** The Label API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves a list of up to 500 item labels.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.LABEL_READ
   */
  function listLabels(): Promise<ListLabelsResponse>;
  /**
   * Creates a query to retrieve a list of item labels.
   *
   * The `queryLabels()` function builds a query to retrieve a list of item labels and returns a `LabelsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is used to run the query using the [`find()`](/item-labels/labels-query-builder/find) function.
   *
   * You can refine the query by chaining `LabelsQueryBuilder` functions onto the query. `LabelsQueryBuilder` functions enable you to filter, sort, and control the results that `queryLabels()` returns.
   *
   * `queryLabels()` runs with the following `LabelsQueryBuilder` defaults, which you can override:
   *
   * * [`limit(100)`](/item-labels/labels-query-builder/limit)
   * * [`ascending('entityId')`](/item-labels/labels-query-builder/ascending)
   *
   * The following `LabelsQueryBuilder` functions are supported for `queryLabels()`. For a full description of the item label object, see the object returned for the [`items`](/item-labels/labels-query-result/items) property in `LabelsQueryResult`.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.LABEL_READ
   */
  function queryLabels(): LabelsQueryBuilder;
  interface QueryCursorResult$7 {
      cursors: Cursors$6;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface LabelsQueryResult extends QueryCursorResult$7 {
      items: Label[];
      query: LabelsQueryBuilder;
      next: () => Promise<LabelsQueryResult>;
      prev: () => Promise<LabelsQueryResult>;
  }
  interface LabelsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name', value: any) => LabelsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name', value: any) => LabelsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => LabelsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => LabelsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => LabelsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => LabelsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: 'name', value: string) => LabelsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'name', value: any) => LabelsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'icon', value: boolean) => LabelsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => LabelsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => LabelsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<LabelsQueryResult>;
  }
  /**
   * > **Note:** The Label API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Updates an item Label.
   *
   * Each time an item label is updated, its revision increments by 1. The existing revision must be included when updating the item labels. This ensures you're working with the latest item labels information, and it prevents unintended overwrites.
   * @param _id - Item label ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField label
   * @requiredField label.revision
   * @permissionId RESTAURANTS.LABEL_UPDATE
   * @adminMethod
   * @returns Updated item label.
   */
  function updateLabel(_id: string | null, label: UpdateLabel, options?: UpdateLabelOptions): Promise<Label>;
  interface UpdateLabel {
      /**
       * Item label ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the item label is updated. To prevent conflicting changes, the current revision must be passed when updating the item label. Ignored when creating a item label.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the item label was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the item label was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Item label name. */
      name?: string;
      /** Item label icon. */
      icon?: string;
      /** Extended fields. */
      extendedFields?: ExtendedFields$5;
  }
  interface UpdateLabelOptions {
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  /**
   * > **Note:** The Label API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Deletes an item label.
   * @param labelId - ID of the item label.
   * @public
   * @documentationMaturity preview
   * @requiredField labelId
   * @permissionId RESTAURANTS.LABEL_DELETE
   * @adminMethod
   */
  function deleteLabel(labelId: string): Promise<void>;
  /**
   * Clone labels from a different metasite
   * @param metaSiteId - The MetaSiteId to clone from.
   * @internal
   * @documentationMaturity preview
   * @requiredField metaSiteId
   * @permissionId RESTAURANTS.LABEL_CREATE
   * @adminMethod
   */
  function cloneLabels(metaSiteId: string): Promise<void>;
  
  type restaurantsMenusV1ItemLabel_universal_d_Label = Label;
  type restaurantsMenusV1ItemLabel_universal_d_CreateLabelRequest = CreateLabelRequest;
  type restaurantsMenusV1ItemLabel_universal_d_CreateLabelResponse = CreateLabelResponse;
  type restaurantsMenusV1ItemLabel_universal_d_GetLabelRequest = GetLabelRequest;
  type restaurantsMenusV1ItemLabel_universal_d_GetLabelResponse = GetLabelResponse;
  type restaurantsMenusV1ItemLabel_universal_d_ListLabelsRequest = ListLabelsRequest;
  type restaurantsMenusV1ItemLabel_universal_d_ListLabelsResponse = ListLabelsResponse;
  type restaurantsMenusV1ItemLabel_universal_d_QueryLabelsRequest = QueryLabelsRequest;
  type restaurantsMenusV1ItemLabel_universal_d_QueryLabelsResponse = QueryLabelsResponse;
  type restaurantsMenusV1ItemLabel_universal_d_UpdateLabelRequest = UpdateLabelRequest;
  type restaurantsMenusV1ItemLabel_universal_d_UpdateLabelResponse = UpdateLabelResponse;
  type restaurantsMenusV1ItemLabel_universal_d_DeleteLabelRequest = DeleteLabelRequest;
  type restaurantsMenusV1ItemLabel_universal_d_DeleteLabelResponse = DeleteLabelResponse;
  type restaurantsMenusV1ItemLabel_universal_d_CloneLabelsRequest = CloneLabelsRequest;
  type restaurantsMenusV1ItemLabel_universal_d_CloneLabelsResponse = CloneLabelsResponse;
  const restaurantsMenusV1ItemLabel_universal_d_createLabel: typeof createLabel;
  const restaurantsMenusV1ItemLabel_universal_d_getLabel: typeof getLabel;
  const restaurantsMenusV1ItemLabel_universal_d_listLabels: typeof listLabels;
  const restaurantsMenusV1ItemLabel_universal_d_queryLabels: typeof queryLabels;
  type restaurantsMenusV1ItemLabel_universal_d_LabelsQueryResult = LabelsQueryResult;
  type restaurantsMenusV1ItemLabel_universal_d_LabelsQueryBuilder = LabelsQueryBuilder;
  const restaurantsMenusV1ItemLabel_universal_d_updateLabel: typeof updateLabel;
  type restaurantsMenusV1ItemLabel_universal_d_UpdateLabel = UpdateLabel;
  type restaurantsMenusV1ItemLabel_universal_d_UpdateLabelOptions = UpdateLabelOptions;
  const restaurantsMenusV1ItemLabel_universal_d_deleteLabel: typeof deleteLabel;
  const restaurantsMenusV1ItemLabel_universal_d_cloneLabels: typeof cloneLabels;
  namespace restaurantsMenusV1ItemLabel_universal_d {
    export {
      restaurantsMenusV1ItemLabel_universal_d_Label as Label,
      ExtendedFields$5 as ExtendedFields,
      InvalidateCache$5 as InvalidateCache,
      InvalidateCacheGetByOneOf$5 as InvalidateCacheGetByOneOf,
      App$5 as App,
      Page$5 as Page,
      URI$5 as URI,
      File$5 as File,
      restaurantsMenusV1ItemLabel_universal_d_CreateLabelRequest as CreateLabelRequest,
      restaurantsMenusV1ItemLabel_universal_d_CreateLabelResponse as CreateLabelResponse,
      restaurantsMenusV1ItemLabel_universal_d_GetLabelRequest as GetLabelRequest,
      restaurantsMenusV1ItemLabel_universal_d_GetLabelResponse as GetLabelResponse,
      restaurantsMenusV1ItemLabel_universal_d_ListLabelsRequest as ListLabelsRequest,
      restaurantsMenusV1ItemLabel_universal_d_ListLabelsResponse as ListLabelsResponse,
      restaurantsMenusV1ItemLabel_universal_d_QueryLabelsRequest as QueryLabelsRequest,
      CursorQuery$7 as CursorQuery,
      CursorQueryPagingMethodOneOf$7 as CursorQueryPagingMethodOneOf,
      Sorting$7 as Sorting,
      SortOrder$7 as SortOrder,
      CursorPaging$6 as CursorPaging,
      restaurantsMenusV1ItemLabel_universal_d_QueryLabelsResponse as QueryLabelsResponse,
      CursorPagingMetadata$6 as CursorPagingMetadata,
      Cursors$6 as Cursors,
      restaurantsMenusV1ItemLabel_universal_d_UpdateLabelRequest as UpdateLabelRequest,
      restaurantsMenusV1ItemLabel_universal_d_UpdateLabelResponse as UpdateLabelResponse,
      restaurantsMenusV1ItemLabel_universal_d_DeleteLabelRequest as DeleteLabelRequest,
      restaurantsMenusV1ItemLabel_universal_d_DeleteLabelResponse as DeleteLabelResponse,
      restaurantsMenusV1ItemLabel_universal_d_CloneLabelsRequest as CloneLabelsRequest,
      restaurantsMenusV1ItemLabel_universal_d_CloneLabelsResponse as CloneLabelsResponse,
      DomainEvent$8 as DomainEvent,
      DomainEventBodyOneOf$8 as DomainEventBodyOneOf,
      EntityCreatedEvent$8 as EntityCreatedEvent,
      RestoreInfo$8 as RestoreInfo,
      EntityUpdatedEvent$8 as EntityUpdatedEvent,
      EntityDeletedEvent$8 as EntityDeletedEvent,
      ActionEvent$8 as ActionEvent,
      Empty$7 as Empty,
      MessageEnvelope$8 as MessageEnvelope,
      IdentificationData$8 as IdentificationData,
      IdentificationDataIdOneOf$8 as IdentificationDataIdOneOf,
      WebhookIdentityType$8 as WebhookIdentityType,
      restaurantsMenusV1ItemLabel_universal_d_createLabel as createLabel,
      restaurantsMenusV1ItemLabel_universal_d_getLabel as getLabel,
      restaurantsMenusV1ItemLabel_universal_d_listLabels as listLabels,
      restaurantsMenusV1ItemLabel_universal_d_queryLabels as queryLabels,
      restaurantsMenusV1ItemLabel_universal_d_LabelsQueryResult as LabelsQueryResult,
      restaurantsMenusV1ItemLabel_universal_d_LabelsQueryBuilder as LabelsQueryBuilder,
      restaurantsMenusV1ItemLabel_universal_d_updateLabel as updateLabel,
      restaurantsMenusV1ItemLabel_universal_d_UpdateLabel as UpdateLabel,
      restaurantsMenusV1ItemLabel_universal_d_UpdateLabelOptions as UpdateLabelOptions,
      restaurantsMenusV1ItemLabel_universal_d_deleteLabel as deleteLabel,
      restaurantsMenusV1ItemLabel_universal_d_cloneLabels as cloneLabels,
    };
  }
  
  /**
   * An item modifier is a type of menu item that serves as an addition to a menu item.
   * Read more about [item modifiers](https://dev.wix.com/docs/rest/business-solutions/restaurants/menus/item-modifiers/introduction).
   */
  interface Modifier {
      /**
       * Item modifier ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the item modifier is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the item modifier. <br />
       *
       * Ignored when creating an item modifier.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the item modifier was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the item modifier was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Item modifier display name. */
      name?: string | null;
      /** Extended fields. */
      extendedFields?: ExtendedFields$4;
      /**
       * Whether the modifier is in stock.
       * Default: `true`.
       */
      inStock?: boolean | null;
  }
  interface ExtendedFields$4 {
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
  interface InvalidateCache$4 extends InvalidateCacheGetByOneOf$4 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$4;
      /** Invalidate by page id */
      page?: Page$4;
      /** Invalidate by URI path */
      uri?: URI$4;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$4;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf$4 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$4;
      /** Invalidate by page id */
      page?: Page$4;
      /** Invalidate by URI path */
      uri?: URI$4;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$4;
  }
  interface App$4 {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page$4 {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI$4 {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File$4 {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface CreateModifierRequest {
      /** Item modifier to create. */
      modifier: Modifier;
  }
  interface CreateModifierResponse {
      /** Created item modifier. */
      modifier?: Modifier;
  }
  interface GetModifierRequest {
      /** ID of the item modifier to retrieve. */
      modifierId: string;
  }
  interface GetModifierResponse {
      /** Retrieved item modifier. */
      modifier?: Modifier;
  }
  interface ListModifiersRequest {
      /** IDs of the item modifiers to retrieve. */
      modifierIds?: string[];
      /** Metadata of the paginated results. */
      paging?: CursorPaging$5;
  }
  interface CursorPaging$5 {
      /** Maximum number of items to load. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * You can get the relevant cursor token
       * from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface ListModifiersResponse {
      /** Retrieved item modifiers. */
      modifiers?: Modifier[];
      /** Metadata of the paginated results. */
      metadata?: CursorPagingMetadata$5;
  }
  interface CursorPagingMetadata$5 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Cursor pointing to the next page and the previous page in the list of results. */
      cursors?: Cursors$5;
      /**
       * Whether there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$5 {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface UpdateModifierRequest {
      /** Item Modifier with updated properties. */
      modifier: Modifier;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface UpdateModifierResponse {
      /** Updated item modifier. */
      modifier?: Modifier;
  }
  interface BulkCreateModifiersRequest {
      /** List of item modifiers to create. */
      modifiers: Modifier[];
      /**
       * Whether the created item modifiers are included in the response. <br />
       * Default: `false`.
       */
      returnEntity?: boolean;
  }
  interface BulkCreateModifiersResponse {
      /** Information about the created item modifiers. */
      results?: BulkCreateModifierResult[];
      /** Metadata for Bulk Create Modifiers API call. */
      bulkActionMetadata?: BulkActionMetadata$5;
  }
  interface BulkCreateModifierResult {
      /** Metadata for creation of the item modifer. */
      itemMetadata?: ItemMetadata$5;
      /** Created item modifier. */
      modifier?: Modifier;
  }
  interface ItemMetadata$5 {
      /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError$5;
  }
  interface ApplicationError$5 {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  interface BulkActionMetadata$5 {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface BulkUpdateModifiersRequest {
      /** List of item modifiers to update. */
      modifiers: MaskedModifier[];
      /** Whether the updated item modifiers are included in the response. */
      returnEntity?: boolean;
  }
  interface MaskedModifier {
      /** Item modifier to update. */
      modifier?: Modifier;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface BulkUpdateModifiersResponse {
      /** Information about the updated item modifiers. */
      results?: BulkUpdateModifierResult[];
      /** Metadata for Bulk Update Modifiers API call. */
      bulkActionMetadata?: BulkActionMetadata$5;
  }
  interface BulkUpdateModifierResult {
      /** Metadata for the update of the item modifer. */
      itemMetadata?: ItemMetadata$5;
      /** Updated item modifier. */
      modifier?: Modifier;
  }
  interface DeleteModifierRequest {
      /** ID of the item modifier to delete. */
      modifierId: string;
  }
  interface DeleteModifierResponse {
  }
  interface QueryModifiersRequest {
      /** Query options. */
      query?: CursorQuery$6;
  }
  interface CursorQuery$6 extends CursorQueryPagingMethodOneOf$6 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$5;
      /**
       * Filter object.
       * See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language)
       * for more information.
       *
       * For a detailed list of supported filters, see
       * [Supported Filters](https://dev.wix.com/docs/rest/business-solutions/restaurants/menus/item-modifiers/supported-filters-and-sorting).
       */
      filter?: Record<string, any> | null;
      /** Sort object. */
      sort?: Sorting$6[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$6 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$5;
  }
  interface Sorting$6 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$6;
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
  enum SortOrder$6 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface QueryModifiersResponse {
      /** Retrieved item modifiers. */
      modifiers?: Modifier[];
      /** Metadata of the paginated results. */
      pagingMetadata?: CursorPagingMetadata$5;
  }
  interface CountModifiersRequest {
      /** Filter for counting modifiers. */
      filter?: Record<string, any> | null;
  }
  interface CountModifiersResponse {
      /** Counted modifiers. */
      count?: number;
  }
  interface BulkDeleteModifiersRequest {
      /** Item Modifier IDs. */
      ids: string[];
  }
  interface BulkDeleteModifiersResponse {
      /** Information about the deleted modifiers. */
      results?: BulkDeleteModifiersResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$5;
  }
  interface BulkDeleteModifiersResult {
      /** Metadata for modifiers deletion. */
      itemMetadata?: ItemMetadata$5;
  }
  interface CloneModifiersRequest {
      /** The MetaSiteId to clone from */
      metaSiteId: string;
  }
  interface CloneModifiersResponse {
  }
  interface DomainEvent$7 extends DomainEventBodyOneOf$7 {
      createdEvent?: EntityCreatedEvent$7;
      updatedEvent?: EntityUpdatedEvent$7;
      deletedEvent?: EntityDeletedEvent$7;
      actionEvent?: ActionEvent$7;
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
  interface DomainEventBodyOneOf$7 {
      createdEvent?: EntityCreatedEvent$7;
      updatedEvent?: EntityUpdatedEvent$7;
      deletedEvent?: EntityDeletedEvent$7;
      actionEvent?: ActionEvent$7;
  }
  interface EntityCreatedEvent$7 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$7;
  }
  interface RestoreInfo$7 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$7 {
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
  }
  interface EntityDeletedEvent$7 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
  }
  interface ActionEvent$7 {
      bodyAsJson?: string;
  }
  interface Empty$6 {
  }
  interface MessageEnvelope$7 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$7;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$7 extends IdentificationDataIdOneOf$7 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$7;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$7 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$7 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * > **Note:** The Item Modifiers API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Creates an item modifier.
   *
   * To create multiple item modifiers at once, use [Bulk Create Modifiers](https://dev.wix.com/docs/rest/business-solutions/restaurants/menus/item-modifiers/bulk-create-modifiers).
   * @param modifier - Item modifier to create.
   * @public
   * @documentationMaturity preview
   * @requiredField modifier
   * @requiredField modifier.name
   * @permissionId RESTAURANTS.MODIFIER_CREATE
   * @adminMethod
   * @returns Created item modifier.
   */
  function createModifier(modifier: Modifier): Promise<Modifier>;
  /**
   * > **Note:** The Item Modifier API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves an item modifier by ID.
   * @param modifierId - ID of the item modifier to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField modifierId
   * @permissionId RESTAURANTS.MODIFIER_READ
   * @returns Retrieved item modifier.
   */
  function getModifier(modifierId: string): Promise<Modifier>;
  /**
   * > **Note:** The Item Modifier API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves a list of up to 100 item modifiers.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.MODIFIER_READ
   */
  function listModifiers(options?: ListModifiersOptions): Promise<ListModifiersResponse>;
  interface ListModifiersOptions {
      /** IDs of the item modifiers to retrieve. */
      modifierIds?: string[];
      /** Metadata of the paginated results. */
      paging?: CursorPaging$5;
  }
  /**
   * > **Note:** The Item Modifier API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Updates an item modifier.
   *
   * To update multiple item modifiers at once, use [Bulk Update Item Modifiers](https://dev.wix.com/docs/rest/business-solutions/restaurants/menus/item-modifiers/bulk-update-modifiers).
   *
   * Each time an item modifier is updated, its revision increments by 1. The existing revision must be included when updating an item modifier. This ensures you're working with the latest item modifier information, and it prevents unintended overwrites.
   * @param _id - Item modifier ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField modifier
   * @requiredField modifier.revision
   * @permissionId RESTAURANTS.MODIFIER_UPDATE
   * @adminMethod
   * @returns Updated item modifier.
   */
  function updateModifier(_id: string | null, modifier: UpdateModifier, options?: UpdateModifierOptions): Promise<Modifier>;
  interface UpdateModifier {
      /**
       * Item modifier ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the item modifier is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the item modifier. <br />
       *
       * Ignored when creating an item modifier.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the item modifier was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the item modifier was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Item modifier display name. */
      name?: string | null;
      /** Extended fields. */
      extendedFields?: ExtendedFields$4;
      /**
       * Whether the modifier is in stock.
       * Default: `true`.
       */
      inStock?: boolean | null;
  }
  interface UpdateModifierOptions {
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  /**
   * > **Note:** The Item Modifier API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Creates multiple item modifiers.
   * @param modifiers - List of item modifiers to create.
   * @public
   * @documentationMaturity preview
   * @requiredField modifiers
   * @permissionId RESTAURANTS.MODIFIER_CREATE
   * @adminMethod
   */
  function bulkCreateModifiers(modifiers: Modifier[], options?: BulkCreateModifiersOptions): Promise<BulkCreateModifiersResponse>;
  interface BulkCreateModifiersOptions {
      /**
       * Whether the created item modifiers are included in the response. <br />
       * Default: `false`.
       */
      returnEntity?: boolean;
  }
  /**
   * > **Note:** The Item modifier API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Updates multiple item modifiers at once.
   * Each time an item modifier is updated, its revision increments by 1. The existing revision must be included when updating the item modifier. This ensures you're working with the latest item modifier information, and prevents unintended overwrites.
   * @param modifiers - List of item modifiers to update.
   * @public
   * @documentationMaturity preview
   * @requiredField modifiers
   * @permissionId RESTAURANTS.MODIFIER_UPDATE
   * @adminMethod
   */
  function bulkUpdateModifiers(modifiers: MaskedModifier[], options?: BulkUpdateModifiersOptions): Promise<BulkUpdateModifiersResponse>;
  interface BulkUpdateModifiersOptions {
      /** Whether the updated item modifiers are included in the response. */
      returnEntity?: boolean;
  }
  /**
   * > **Note:** The Item modifier API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   * Deletes an item modifier.
   * @param modifierId - ID of the item modifier to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField modifierId
   * @permissionId RESTAURANTS.MODIFIER_DELETE
   * @adminMethod
   */
  function deleteModifier(modifierId: string): Promise<void>;
  /**
   * Creates a query to retrieve a list of item modifiers.
   *
   * The `queryModifiers()` function builds a query to retrieve a list of item modifiers and returns a `ModifiersQueryBuilder` object.
   *
   * The returned object contains the query definition, which is used to run the query using the [`find()`](/item-modifiers/modifiers-query-builder/find) function.
   *
   * You can refine the query by chaining `ModifiersQueryBuilder` functions onto the query. `ModifiersQueryBuilder` functions enable you to filter, sort, and control the results that `queryModifiers()` returns.
   *
   * `queryModifiers()` runs with the following `ModifiersQueryBuilder` defaults, which you can override:
   *
   * * [`limit(200)`](/item-modifiers/modifiers-query-builder/limit)
   * * [`ascending('entityId')`](/item-modifiers/modifiers-query-builder/ascending)
   *
   * The following `ModifiersQueryBuilder` functions are supported for `queryModifiers()`. For a full description of the item modifier object, see the object returned for the [`items`](/item-modifiers/modifiers-query-builder/items) property in `ModifiersQueryResult`.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.MODIFIER_READ
   */
  function queryModifiers(): ModifiersQueryBuilder;
  interface QueryCursorResult$6 {
      cursors: Cursors$5;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ModifiersQueryResult extends QueryCursorResult$6 {
      items: Modifier[];
      query: ModifiersQueryBuilder;
      next: () => Promise<ModifiersQueryResult>;
      prev: () => Promise<ModifiersQueryResult>;
  }
  interface ModifiersQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name', value: any) => ModifiersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name', value: any) => ModifiersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => ModifiersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ModifiersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => ModifiersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ModifiersQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'name', value: any) => ModifiersQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ModifiersQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ModifiersQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ModifiersQueryResult>;
  }
  /**
   * > **Note:** The Item API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves the number of modifiers that match a specified filter.
   *
   * If a filter isn't passed in the request, the endpoint returns the count of all modifiers.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.MODIFIER_READ
   */
  function countModifiers(options?: CountModifiersOptions): Promise<CountModifiersResponse>;
  interface CountModifiersOptions {
      /** Filter for counting modifiers. */
      filter?: Record<string, any> | null;
  }
  /**
   * > **Note:** The Item Modifier API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Deletes multiple item Modifiers at once.
   * @param ids - Item Modifier IDs.
   * @public
   * @documentationMaturity preview
   * @requiredField ids
   * @permissionId RESTAURANTS.MODIFIER_DELETE
   * @adminMethod
   */
  function bulkDeleteModifiers(ids: string[]): Promise<BulkDeleteModifiersResponse>;
  /**
   * Clone item modifiers from a different metasite.
   * @param metaSiteId - The MetaSiteId to clone from
   * @internal
   * @documentationMaturity preview
   * @requiredField metaSiteId
   * @permissionId RESTAURANTS.MODIFIER_CREATE
   * @adminMethod
   */
  function cloneModifiers(metaSiteId: string): Promise<void>;
  
  type restaurantsMenusV1ItemModifier_universal_d_Modifier = Modifier;
  type restaurantsMenusV1ItemModifier_universal_d_CreateModifierRequest = CreateModifierRequest;
  type restaurantsMenusV1ItemModifier_universal_d_CreateModifierResponse = CreateModifierResponse;
  type restaurantsMenusV1ItemModifier_universal_d_GetModifierRequest = GetModifierRequest;
  type restaurantsMenusV1ItemModifier_universal_d_GetModifierResponse = GetModifierResponse;
  type restaurantsMenusV1ItemModifier_universal_d_ListModifiersRequest = ListModifiersRequest;
  type restaurantsMenusV1ItemModifier_universal_d_ListModifiersResponse = ListModifiersResponse;
  type restaurantsMenusV1ItemModifier_universal_d_UpdateModifierRequest = UpdateModifierRequest;
  type restaurantsMenusV1ItemModifier_universal_d_UpdateModifierResponse = UpdateModifierResponse;
  type restaurantsMenusV1ItemModifier_universal_d_BulkCreateModifiersRequest = BulkCreateModifiersRequest;
  type restaurantsMenusV1ItemModifier_universal_d_BulkCreateModifiersResponse = BulkCreateModifiersResponse;
  type restaurantsMenusV1ItemModifier_universal_d_BulkCreateModifierResult = BulkCreateModifierResult;
  type restaurantsMenusV1ItemModifier_universal_d_BulkUpdateModifiersRequest = BulkUpdateModifiersRequest;
  type restaurantsMenusV1ItemModifier_universal_d_MaskedModifier = MaskedModifier;
  type restaurantsMenusV1ItemModifier_universal_d_BulkUpdateModifiersResponse = BulkUpdateModifiersResponse;
  type restaurantsMenusV1ItemModifier_universal_d_BulkUpdateModifierResult = BulkUpdateModifierResult;
  type restaurantsMenusV1ItemModifier_universal_d_DeleteModifierRequest = DeleteModifierRequest;
  type restaurantsMenusV1ItemModifier_universal_d_DeleteModifierResponse = DeleteModifierResponse;
  type restaurantsMenusV1ItemModifier_universal_d_QueryModifiersRequest = QueryModifiersRequest;
  type restaurantsMenusV1ItemModifier_universal_d_QueryModifiersResponse = QueryModifiersResponse;
  type restaurantsMenusV1ItemModifier_universal_d_CountModifiersRequest = CountModifiersRequest;
  type restaurantsMenusV1ItemModifier_universal_d_CountModifiersResponse = CountModifiersResponse;
  type restaurantsMenusV1ItemModifier_universal_d_BulkDeleteModifiersRequest = BulkDeleteModifiersRequest;
  type restaurantsMenusV1ItemModifier_universal_d_BulkDeleteModifiersResponse = BulkDeleteModifiersResponse;
  type restaurantsMenusV1ItemModifier_universal_d_BulkDeleteModifiersResult = BulkDeleteModifiersResult;
  type restaurantsMenusV1ItemModifier_universal_d_CloneModifiersRequest = CloneModifiersRequest;
  type restaurantsMenusV1ItemModifier_universal_d_CloneModifiersResponse = CloneModifiersResponse;
  const restaurantsMenusV1ItemModifier_universal_d_createModifier: typeof createModifier;
  const restaurantsMenusV1ItemModifier_universal_d_getModifier: typeof getModifier;
  const restaurantsMenusV1ItemModifier_universal_d_listModifiers: typeof listModifiers;
  type restaurantsMenusV1ItemModifier_universal_d_ListModifiersOptions = ListModifiersOptions;
  const restaurantsMenusV1ItemModifier_universal_d_updateModifier: typeof updateModifier;
  type restaurantsMenusV1ItemModifier_universal_d_UpdateModifier = UpdateModifier;
  type restaurantsMenusV1ItemModifier_universal_d_UpdateModifierOptions = UpdateModifierOptions;
  const restaurantsMenusV1ItemModifier_universal_d_bulkCreateModifiers: typeof bulkCreateModifiers;
  type restaurantsMenusV1ItemModifier_universal_d_BulkCreateModifiersOptions = BulkCreateModifiersOptions;
  const restaurantsMenusV1ItemModifier_universal_d_bulkUpdateModifiers: typeof bulkUpdateModifiers;
  type restaurantsMenusV1ItemModifier_universal_d_BulkUpdateModifiersOptions = BulkUpdateModifiersOptions;
  const restaurantsMenusV1ItemModifier_universal_d_deleteModifier: typeof deleteModifier;
  const restaurantsMenusV1ItemModifier_universal_d_queryModifiers: typeof queryModifiers;
  type restaurantsMenusV1ItemModifier_universal_d_ModifiersQueryResult = ModifiersQueryResult;
  type restaurantsMenusV1ItemModifier_universal_d_ModifiersQueryBuilder = ModifiersQueryBuilder;
  const restaurantsMenusV1ItemModifier_universal_d_countModifiers: typeof countModifiers;
  type restaurantsMenusV1ItemModifier_universal_d_CountModifiersOptions = CountModifiersOptions;
  const restaurantsMenusV1ItemModifier_universal_d_bulkDeleteModifiers: typeof bulkDeleteModifiers;
  const restaurantsMenusV1ItemModifier_universal_d_cloneModifiers: typeof cloneModifiers;
  namespace restaurantsMenusV1ItemModifier_universal_d {
    export {
      restaurantsMenusV1ItemModifier_universal_d_Modifier as Modifier,
      ExtendedFields$4 as ExtendedFields,
      InvalidateCache$4 as InvalidateCache,
      InvalidateCacheGetByOneOf$4 as InvalidateCacheGetByOneOf,
      App$4 as App,
      Page$4 as Page,
      URI$4 as URI,
      File$4 as File,
      restaurantsMenusV1ItemModifier_universal_d_CreateModifierRequest as CreateModifierRequest,
      restaurantsMenusV1ItemModifier_universal_d_CreateModifierResponse as CreateModifierResponse,
      restaurantsMenusV1ItemModifier_universal_d_GetModifierRequest as GetModifierRequest,
      restaurantsMenusV1ItemModifier_universal_d_GetModifierResponse as GetModifierResponse,
      restaurantsMenusV1ItemModifier_universal_d_ListModifiersRequest as ListModifiersRequest,
      CursorPaging$5 as CursorPaging,
      restaurantsMenusV1ItemModifier_universal_d_ListModifiersResponse as ListModifiersResponse,
      CursorPagingMetadata$5 as CursorPagingMetadata,
      Cursors$5 as Cursors,
      restaurantsMenusV1ItemModifier_universal_d_UpdateModifierRequest as UpdateModifierRequest,
      restaurantsMenusV1ItemModifier_universal_d_UpdateModifierResponse as UpdateModifierResponse,
      restaurantsMenusV1ItemModifier_universal_d_BulkCreateModifiersRequest as BulkCreateModifiersRequest,
      restaurantsMenusV1ItemModifier_universal_d_BulkCreateModifiersResponse as BulkCreateModifiersResponse,
      restaurantsMenusV1ItemModifier_universal_d_BulkCreateModifierResult as BulkCreateModifierResult,
      ItemMetadata$5 as ItemMetadata,
      ApplicationError$5 as ApplicationError,
      BulkActionMetadata$5 as BulkActionMetadata,
      restaurantsMenusV1ItemModifier_universal_d_BulkUpdateModifiersRequest as BulkUpdateModifiersRequest,
      restaurantsMenusV1ItemModifier_universal_d_MaskedModifier as MaskedModifier,
      restaurantsMenusV1ItemModifier_universal_d_BulkUpdateModifiersResponse as BulkUpdateModifiersResponse,
      restaurantsMenusV1ItemModifier_universal_d_BulkUpdateModifierResult as BulkUpdateModifierResult,
      restaurantsMenusV1ItemModifier_universal_d_DeleteModifierRequest as DeleteModifierRequest,
      restaurantsMenusV1ItemModifier_universal_d_DeleteModifierResponse as DeleteModifierResponse,
      restaurantsMenusV1ItemModifier_universal_d_QueryModifiersRequest as QueryModifiersRequest,
      CursorQuery$6 as CursorQuery,
      CursorQueryPagingMethodOneOf$6 as CursorQueryPagingMethodOneOf,
      Sorting$6 as Sorting,
      SortOrder$6 as SortOrder,
      restaurantsMenusV1ItemModifier_universal_d_QueryModifiersResponse as QueryModifiersResponse,
      restaurantsMenusV1ItemModifier_universal_d_CountModifiersRequest as CountModifiersRequest,
      restaurantsMenusV1ItemModifier_universal_d_CountModifiersResponse as CountModifiersResponse,
      restaurantsMenusV1ItemModifier_universal_d_BulkDeleteModifiersRequest as BulkDeleteModifiersRequest,
      restaurantsMenusV1ItemModifier_universal_d_BulkDeleteModifiersResponse as BulkDeleteModifiersResponse,
      restaurantsMenusV1ItemModifier_universal_d_BulkDeleteModifiersResult as BulkDeleteModifiersResult,
      restaurantsMenusV1ItemModifier_universal_d_CloneModifiersRequest as CloneModifiersRequest,
      restaurantsMenusV1ItemModifier_universal_d_CloneModifiersResponse as CloneModifiersResponse,
      DomainEvent$7 as DomainEvent,
      DomainEventBodyOneOf$7 as DomainEventBodyOneOf,
      EntityCreatedEvent$7 as EntityCreatedEvent,
      RestoreInfo$7 as RestoreInfo,
      EntityUpdatedEvent$7 as EntityUpdatedEvent,
      EntityDeletedEvent$7 as EntityDeletedEvent,
      ActionEvent$7 as ActionEvent,
      Empty$6 as Empty,
      MessageEnvelope$7 as MessageEnvelope,
      IdentificationData$7 as IdentificationData,
      IdentificationDataIdOneOf$7 as IdentificationDataIdOneOf,
      WebhookIdentityType$7 as WebhookIdentityType,
      restaurantsMenusV1ItemModifier_universal_d_createModifier as createModifier,
      restaurantsMenusV1ItemModifier_universal_d_getModifier as getModifier,
      restaurantsMenusV1ItemModifier_universal_d_listModifiers as listModifiers,
      restaurantsMenusV1ItemModifier_universal_d_ListModifiersOptions as ListModifiersOptions,
      restaurantsMenusV1ItemModifier_universal_d_updateModifier as updateModifier,
      restaurantsMenusV1ItemModifier_universal_d_UpdateModifier as UpdateModifier,
      restaurantsMenusV1ItemModifier_universal_d_UpdateModifierOptions as UpdateModifierOptions,
      restaurantsMenusV1ItemModifier_universal_d_bulkCreateModifiers as bulkCreateModifiers,
      restaurantsMenusV1ItemModifier_universal_d_BulkCreateModifiersOptions as BulkCreateModifiersOptions,
      restaurantsMenusV1ItemModifier_universal_d_bulkUpdateModifiers as bulkUpdateModifiers,
      restaurantsMenusV1ItemModifier_universal_d_BulkUpdateModifiersOptions as BulkUpdateModifiersOptions,
      restaurantsMenusV1ItemModifier_universal_d_deleteModifier as deleteModifier,
      restaurantsMenusV1ItemModifier_universal_d_queryModifiers as queryModifiers,
      restaurantsMenusV1ItemModifier_universal_d_ModifiersQueryResult as ModifiersQueryResult,
      restaurantsMenusV1ItemModifier_universal_d_ModifiersQueryBuilder as ModifiersQueryBuilder,
      restaurantsMenusV1ItemModifier_universal_d_countModifiers as countModifiers,
      restaurantsMenusV1ItemModifier_universal_d_CountModifiersOptions as CountModifiersOptions,
      restaurantsMenusV1ItemModifier_universal_d_bulkDeleteModifiers as bulkDeleteModifiers,
      restaurantsMenusV1ItemModifier_universal_d_cloneModifiers as cloneModifiers,
    };
  }
  
  interface Variant {
      /**
       * Item variant ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the item variant is updated. To prevent conflicting changes, the current revision must be passed when updating the item variant. Ignored when creating an item variant.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the item variant was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the item variant was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Item variant name. */
      name?: string | null;
      /** Extended fields. */
      extendedFields?: ExtendedFields$3;
      /**
       * @internal
       * @readonly
       */
      oloMigrationVariantId?: string | null;
  }
  interface ExtendedFields$3 {
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
  interface InvalidateCache$3 extends InvalidateCacheGetByOneOf$3 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$3;
      /** Invalidate by page id */
      page?: Page$3;
      /** Invalidate by URI path */
      uri?: URI$3;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$3;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf$3 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$3;
      /** Invalidate by page id */
      page?: Page$3;
      /** Invalidate by URI path */
      uri?: URI$3;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$3;
  }
  interface App$3 {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page$3 {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI$3 {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File$3 {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface CreateVariantRequest {
      /** Item variant info. */
      variant: Variant;
  }
  interface CreateVariantResponse {
      /** Item variant. */
      variant?: Variant;
  }
  interface GetVariantRequest {
      /** ID of the item variant to retrieve. */
      variantId: string;
  }
  interface GetVariantResponse {
      /** Item variant. */
      variant?: Variant;
  }
  interface ListVariantsRequest {
      /** Item variant IDs. */
      variantIds?: string[];
      /** The metadata of the paginated results. */
      paging?: CursorPaging$4;
  }
  interface CursorPaging$4 {
      /** Number of items to load. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * You can get the relevant cursor token
       * from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface ListVariantsResponse {
      /** The retrieved item variants. */
      variants?: Variant[];
      /** The metadata of the paginated results. */
      metadata?: CursorPagingMetadata$4;
  }
  interface CursorPagingMetadata$4 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      cursors?: Cursors$4;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$4 {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface UpdateVariantRequest {
      /** Item variant to update. */
      variant: Variant;
      /**
       * Set of fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateVariantResponse {
      /** Updated item variant. */
      variant?: Variant;
  }
  interface BulkCreateVariantsRequest {
      /** Item variants details. */
      variants: Variant[];
      /** Whether to receive the created item variants in the response. */
      returnEntity?: boolean;
  }
  interface BulkCreateVariantsResponse {
      /** Information about the created item variants. */
      results?: BulkVariantResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$4;
  }
  interface BulkVariantResult {
      /** Metadata for creation of item variants. */
      itemMetadata?: ItemMetadata$4;
      /** Created item variants. Only returned if the `returnEntity` value is `true`. */
      variant?: Variant;
  }
  interface ItemMetadata$4 {
      /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError$4;
  }
  interface ApplicationError$4 {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  interface BulkActionMetadata$4 {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface BulkUpdateVariantsRequest {
      /** Item variants to be updated. */
      variants: MaskedVariant[];
      /** Whether to receive the updated item variants in the response. */
      returnEntity?: boolean;
  }
  interface MaskedVariant {
      /** Item variant to update. */
      variant?: Variant;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  interface BulkUpdateVariantsResponse {
      /** Information about the updated item variants. */
      results?: BulkVariantResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$4;
  }
  interface DeleteVariantRequest {
      /** Item variant ID. */
      variantId: string;
  }
  interface DeleteVariantResponse {
  }
  interface QueryVariantsRequest {
      /** Query options. */
      query?: CursorQuery$5;
  }
  interface CursorQuery$5 extends CursorQueryPagingMethodOneOf$5 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$4;
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
      sort?: Sorting$5[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$5 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$4;
  }
  interface Sorting$5 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$5;
  }
  enum SortOrder$5 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface QueryVariantsResponse {
      /** Retrieved item variants. */
      variants?: Variant[];
      /** Metadata of the paginated results. */
      pagingMetadata?: CursorPagingMetadata$4;
  }
  interface CountVariantsRequest {
      /** Filter for counting variants. */
      filter?: Record<string, any> | null;
  }
  interface CountVariantsResponse {
      /** Counted variants. */
      count?: number;
  }
  interface CloneVariantsRequest {
      /** The MetaSiteId to clone from */
      metaSiteId: string;
  }
  interface CloneVariantsResponse {
  }
  interface BulkDeleteVariantsRequest {
      /** Item variant IDs. */
      ids: string[];
  }
  interface BulkDeleteVariantsResponse {
      /** Information about the deleted variants. */
      results?: BulkDeleteVariantsResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$4;
  }
  interface BulkDeleteVariantsResult {
      /** Metadata for variants deletion. */
      itemMetadata?: ItemMetadata$4;
  }
  interface DomainEvent$6 extends DomainEventBodyOneOf$6 {
      createdEvent?: EntityCreatedEvent$6;
      updatedEvent?: EntityUpdatedEvent$6;
      deletedEvent?: EntityDeletedEvent$6;
      actionEvent?: ActionEvent$6;
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
  interface DomainEventBodyOneOf$6 {
      createdEvent?: EntityCreatedEvent$6;
      updatedEvent?: EntityUpdatedEvent$6;
      deletedEvent?: EntityDeletedEvent$6;
      actionEvent?: ActionEvent$6;
  }
  interface EntityCreatedEvent$6 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$6;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$6 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$6 {
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
  interface EntityDeletedEvent$6 {
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
  interface ActionEvent$6 {
      bodyAsJson?: string;
  }
  interface Empty$5 {
  }
  interface MessageEnvelope$6 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$6;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$6 extends IdentificationDataIdOneOf$6 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$6;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$6 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$6 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * > **Note:** The Item Variants API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Creates an item variant.
   *
   * To create multiple item variants at once, use [Bulk Create Variants](https://dev.wix.com/docs/rest/business-solutions/restaurants/menus/item-variant/bulk-create-variants).
   * @param variant - Item variant info.
   * @public
   * @documentationMaturity preview
   * @requiredField variant
   * @requiredField variant.name
   * @permissionId RESTAURANTS.VARIANT_CREATE
   * @adminMethod
   * @returns Item variant.
   */
  function createVariant(variant: Variant): Promise<Variant>;
  /**
   * > **Note:** The Item Variants API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves an item variant by ID.
   * @param variantId - ID of the item variant to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField variantId
   * @permissionId RESTAURANTS.VARIANT_READ
   * @returns Item variant.
   */
  function getVariant(variantId: string): Promise<Variant>;
  /**
   * > **Note:** The Item Variants API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves a list of up to 100 item variants.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.VARIANT_READ
   */
  function listVariants(options?: ListVariantsOptions): Promise<ListVariantsResponse>;
  interface ListVariantsOptions {
      /** Item variant IDs. */
      variantIds?: string[];
      /** The metadata of the paginated results. */
      paging?: CursorPaging$4;
  }
  /**
   * > **Note:** The Item Variants API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Updates an item variant.
   *
   * To update multiple item variants at once, use [Bulk Update Variants](https://dev.wix.com/docs/rest/business-solutions/restaurants/menus/item-variant/bulk-update-variants).
   *
   * Each time an item variant is updated, its revision increments by 1. The existing revision must be included when updating the variant. This ensures you're working with the latest variant information, and it prevents unintended overwrites.
   * @param _id - Item variant ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField variant
   * @requiredField variant.revision
   * @permissionId RESTAURANTS.VARIANT_UPDATE
   * @adminMethod
   * @returns Updated item variant.
   */
  function updateVariant(_id: string | null, variant: UpdateVariant, options?: UpdateVariantOptions): Promise<Variant>;
  interface UpdateVariant {
      /**
       * Item variant ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the item variant is updated. To prevent conflicting changes, the current revision must be passed when updating the item variant. Ignored when creating an item variant.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the item variant was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the item variant was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Item variant name. */
      name?: string | null;
      /** Extended fields. */
      extendedFields?: ExtendedFields$3;
      /**
       * @internal
       * @readonly
       */
      oloMigrationVariantId?: string | null;
  }
  interface UpdateVariantOptions {
      /**
       * Set of fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * > **Note:** The Item Variants API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Creates multiple item variants.
   * @param variants - Item variants details.
   * @public
   * @documentationMaturity preview
   * @requiredField variants
   * @permissionId RESTAURANTS.VARIANT_CREATE
   * @adminMethod
   */
  function bulkCreateVariants(variants: Variant[], options?: BulkCreateVariantsOptions): Promise<BulkCreateVariantsResponse>;
  interface BulkCreateVariantsOptions {
      /** Whether to receive the created item variants in the response. */
      returnEntity?: boolean;
  }
  /**
   * > **Note:** The Item Variants API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Updates multiple item variants.
   *
   * Each time an item variant is updated, its revision increments by 1. The existing revision must be included when updating variant. This ensures you're working with the latest item information, and it prevents unintended overwrites.
   *
   * Up to 100 item variants can be returned per request.
   * @param variants - Item variants to be updated.
   * @public
   * @documentationMaturity preview
   * @requiredField variants
   * @permissionId RESTAURANTS.VARIANT_UPDATE
   * @adminMethod
   */
  function bulkUpdateVariants(variants: MaskedVariant[], options?: BulkUpdateVariantsOptions): Promise<BulkUpdateVariantsResponse>;
  interface BulkUpdateVariantsOptions {
      /** Whether to receive the updated item variants in the response. */
      returnEntity?: boolean;
  }
  /**
   * > **Note:** The Item Variants API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Permanently deletes an item variant.
   * @param variantId - Item variant ID.
   * @public
   * @documentationMaturity preview
   * @requiredField variantId
   * @permissionId RESTAURANTS.VARIANT_DELETE
   * @adminMethod
   */
  function deleteVariant(variantId: string): Promise<void>;
  /**
   * Creates a query to retrieve a list of item variants.
   *
   * The `queryVariants()` function builds a query to retrieve a list of item variants and returns a `VariantsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is used to run the query using the [`find()`](/item-variants/variants-query-builder/find) function.
   *
   * You can refine the query by chaining `VariantsQueryBuilder` functions onto the query. `VariantsQueryBuilder` functions enable you to filter, sort, and control the results that `queryVariants()` returns.
   *
   * `queryVariants()` runs with the following `VariantsQueryBuilder` defaults, which you can override:
   *
   * * [`limit(200)`](/item-variants/variants-query-builder/limit)
   * * [`ascending('entityId')`](/item-variants/variants-query-builder/ascending)
   *
   * The following `VariantsQueryBuilder` functions are supported for `queryVariants()`. For a full description of the item variant object, see the object returned for the [`items`](/item-variants/variants-query-builder/items) property in `VariantsQueryResult`.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.VARIANT_READ
   */
  function queryVariants(): VariantsQueryBuilder;
  interface QueryCursorResult$5 {
      cursors: Cursors$4;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface VariantsQueryResult extends QueryCursorResult$5 {
      items: Variant[];
      query: VariantsQueryBuilder;
      next: () => Promise<VariantsQueryResult>;
      prev: () => Promise<VariantsQueryResult>;
  }
  interface VariantsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name', value: any) => VariantsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name', value: any) => VariantsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => VariantsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => VariantsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => VariantsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => VariantsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'name', value: any) => VariantsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => VariantsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => VariantsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<VariantsQueryResult>;
  }
  /**
   * > **Note:** The Item API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves the number of item variants that match a specified filter.
   *
   * If a filter isn't passed in the request, the endpoint returns the count of all item variants.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.VARIANT_READ
   */
  function countVariants(options?: CountVariantsOptions): Promise<CountVariantsResponse>;
  interface CountVariantsOptions {
      /** Filter for counting variants. */
      filter?: Record<string, any> | null;
  }
  /**
   * Clone item variants from a different metasite.
   * @param metaSiteId - The MetaSiteId to clone from
   * @internal
   * @documentationMaturity preview
   * @requiredField metaSiteId
   * @permissionId RESTAURANTS.VARIANT_CREATE
   * @adminMethod
   */
  function cloneVariants(metaSiteId: string): Promise<void>;
  /**
   * > **Note:** The Item Variants API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Deletes multiple item variants at once.
   * @param ids - Item variant IDs.
   * @public
   * @documentationMaturity preview
   * @requiredField ids
   * @permissionId RESTAURANTS.VARIANT_DELETE
   * @adminMethod
   */
  function bulkDeleteVariants(ids: string[]): Promise<BulkDeleteVariantsResponse>;
  
  type restaurantsMenusV1ItemVariant_universal_d_Variant = Variant;
  type restaurantsMenusV1ItemVariant_universal_d_CreateVariantRequest = CreateVariantRequest;
  type restaurantsMenusV1ItemVariant_universal_d_CreateVariantResponse = CreateVariantResponse;
  type restaurantsMenusV1ItemVariant_universal_d_GetVariantRequest = GetVariantRequest;
  type restaurantsMenusV1ItemVariant_universal_d_GetVariantResponse = GetVariantResponse;
  type restaurantsMenusV1ItemVariant_universal_d_ListVariantsRequest = ListVariantsRequest;
  type restaurantsMenusV1ItemVariant_universal_d_ListVariantsResponse = ListVariantsResponse;
  type restaurantsMenusV1ItemVariant_universal_d_UpdateVariantRequest = UpdateVariantRequest;
  type restaurantsMenusV1ItemVariant_universal_d_UpdateVariantResponse = UpdateVariantResponse;
  type restaurantsMenusV1ItemVariant_universal_d_BulkCreateVariantsRequest = BulkCreateVariantsRequest;
  type restaurantsMenusV1ItemVariant_universal_d_BulkCreateVariantsResponse = BulkCreateVariantsResponse;
  type restaurantsMenusV1ItemVariant_universal_d_BulkVariantResult = BulkVariantResult;
  type restaurantsMenusV1ItemVariant_universal_d_BulkUpdateVariantsRequest = BulkUpdateVariantsRequest;
  type restaurantsMenusV1ItemVariant_universal_d_MaskedVariant = MaskedVariant;
  type restaurantsMenusV1ItemVariant_universal_d_BulkUpdateVariantsResponse = BulkUpdateVariantsResponse;
  type restaurantsMenusV1ItemVariant_universal_d_DeleteVariantRequest = DeleteVariantRequest;
  type restaurantsMenusV1ItemVariant_universal_d_DeleteVariantResponse = DeleteVariantResponse;
  type restaurantsMenusV1ItemVariant_universal_d_QueryVariantsRequest = QueryVariantsRequest;
  type restaurantsMenusV1ItemVariant_universal_d_QueryVariantsResponse = QueryVariantsResponse;
  type restaurantsMenusV1ItemVariant_universal_d_CountVariantsRequest = CountVariantsRequest;
  type restaurantsMenusV1ItemVariant_universal_d_CountVariantsResponse = CountVariantsResponse;
  type restaurantsMenusV1ItemVariant_universal_d_CloneVariantsRequest = CloneVariantsRequest;
  type restaurantsMenusV1ItemVariant_universal_d_CloneVariantsResponse = CloneVariantsResponse;
  type restaurantsMenusV1ItemVariant_universal_d_BulkDeleteVariantsRequest = BulkDeleteVariantsRequest;
  type restaurantsMenusV1ItemVariant_universal_d_BulkDeleteVariantsResponse = BulkDeleteVariantsResponse;
  type restaurantsMenusV1ItemVariant_universal_d_BulkDeleteVariantsResult = BulkDeleteVariantsResult;
  const restaurantsMenusV1ItemVariant_universal_d_createVariant: typeof createVariant;
  const restaurantsMenusV1ItemVariant_universal_d_getVariant: typeof getVariant;
  const restaurantsMenusV1ItemVariant_universal_d_listVariants: typeof listVariants;
  type restaurantsMenusV1ItemVariant_universal_d_ListVariantsOptions = ListVariantsOptions;
  const restaurantsMenusV1ItemVariant_universal_d_updateVariant: typeof updateVariant;
  type restaurantsMenusV1ItemVariant_universal_d_UpdateVariant = UpdateVariant;
  type restaurantsMenusV1ItemVariant_universal_d_UpdateVariantOptions = UpdateVariantOptions;
  const restaurantsMenusV1ItemVariant_universal_d_bulkCreateVariants: typeof bulkCreateVariants;
  type restaurantsMenusV1ItemVariant_universal_d_BulkCreateVariantsOptions = BulkCreateVariantsOptions;
  const restaurantsMenusV1ItemVariant_universal_d_bulkUpdateVariants: typeof bulkUpdateVariants;
  type restaurantsMenusV1ItemVariant_universal_d_BulkUpdateVariantsOptions = BulkUpdateVariantsOptions;
  const restaurantsMenusV1ItemVariant_universal_d_deleteVariant: typeof deleteVariant;
  const restaurantsMenusV1ItemVariant_universal_d_queryVariants: typeof queryVariants;
  type restaurantsMenusV1ItemVariant_universal_d_VariantsQueryResult = VariantsQueryResult;
  type restaurantsMenusV1ItemVariant_universal_d_VariantsQueryBuilder = VariantsQueryBuilder;
  const restaurantsMenusV1ItemVariant_universal_d_countVariants: typeof countVariants;
  type restaurantsMenusV1ItemVariant_universal_d_CountVariantsOptions = CountVariantsOptions;
  const restaurantsMenusV1ItemVariant_universal_d_cloneVariants: typeof cloneVariants;
  const restaurantsMenusV1ItemVariant_universal_d_bulkDeleteVariants: typeof bulkDeleteVariants;
  namespace restaurantsMenusV1ItemVariant_universal_d {
    export {
      restaurantsMenusV1ItemVariant_universal_d_Variant as Variant,
      ExtendedFields$3 as ExtendedFields,
      InvalidateCache$3 as InvalidateCache,
      InvalidateCacheGetByOneOf$3 as InvalidateCacheGetByOneOf,
      App$3 as App,
      Page$3 as Page,
      URI$3 as URI,
      File$3 as File,
      restaurantsMenusV1ItemVariant_universal_d_CreateVariantRequest as CreateVariantRequest,
      restaurantsMenusV1ItemVariant_universal_d_CreateVariantResponse as CreateVariantResponse,
      restaurantsMenusV1ItemVariant_universal_d_GetVariantRequest as GetVariantRequest,
      restaurantsMenusV1ItemVariant_universal_d_GetVariantResponse as GetVariantResponse,
      restaurantsMenusV1ItemVariant_universal_d_ListVariantsRequest as ListVariantsRequest,
      CursorPaging$4 as CursorPaging,
      restaurantsMenusV1ItemVariant_universal_d_ListVariantsResponse as ListVariantsResponse,
      CursorPagingMetadata$4 as CursorPagingMetadata,
      Cursors$4 as Cursors,
      restaurantsMenusV1ItemVariant_universal_d_UpdateVariantRequest as UpdateVariantRequest,
      restaurantsMenusV1ItemVariant_universal_d_UpdateVariantResponse as UpdateVariantResponse,
      restaurantsMenusV1ItemVariant_universal_d_BulkCreateVariantsRequest as BulkCreateVariantsRequest,
      restaurantsMenusV1ItemVariant_universal_d_BulkCreateVariantsResponse as BulkCreateVariantsResponse,
      restaurantsMenusV1ItemVariant_universal_d_BulkVariantResult as BulkVariantResult,
      ItemMetadata$4 as ItemMetadata,
      ApplicationError$4 as ApplicationError,
      BulkActionMetadata$4 as BulkActionMetadata,
      restaurantsMenusV1ItemVariant_universal_d_BulkUpdateVariantsRequest as BulkUpdateVariantsRequest,
      restaurantsMenusV1ItemVariant_universal_d_MaskedVariant as MaskedVariant,
      restaurantsMenusV1ItemVariant_universal_d_BulkUpdateVariantsResponse as BulkUpdateVariantsResponse,
      restaurantsMenusV1ItemVariant_universal_d_DeleteVariantRequest as DeleteVariantRequest,
      restaurantsMenusV1ItemVariant_universal_d_DeleteVariantResponse as DeleteVariantResponse,
      restaurantsMenusV1ItemVariant_universal_d_QueryVariantsRequest as QueryVariantsRequest,
      CursorQuery$5 as CursorQuery,
      CursorQueryPagingMethodOneOf$5 as CursorQueryPagingMethodOneOf,
      Sorting$5 as Sorting,
      SortOrder$5 as SortOrder,
      restaurantsMenusV1ItemVariant_universal_d_QueryVariantsResponse as QueryVariantsResponse,
      restaurantsMenusV1ItemVariant_universal_d_CountVariantsRequest as CountVariantsRequest,
      restaurantsMenusV1ItemVariant_universal_d_CountVariantsResponse as CountVariantsResponse,
      restaurantsMenusV1ItemVariant_universal_d_CloneVariantsRequest as CloneVariantsRequest,
      restaurantsMenusV1ItemVariant_universal_d_CloneVariantsResponse as CloneVariantsResponse,
      restaurantsMenusV1ItemVariant_universal_d_BulkDeleteVariantsRequest as BulkDeleteVariantsRequest,
      restaurantsMenusV1ItemVariant_universal_d_BulkDeleteVariantsResponse as BulkDeleteVariantsResponse,
      restaurantsMenusV1ItemVariant_universal_d_BulkDeleteVariantsResult as BulkDeleteVariantsResult,
      DomainEvent$6 as DomainEvent,
      DomainEventBodyOneOf$6 as DomainEventBodyOneOf,
      EntityCreatedEvent$6 as EntityCreatedEvent,
      RestoreInfo$6 as RestoreInfo,
      EntityUpdatedEvent$6 as EntityUpdatedEvent,
      EntityDeletedEvent$6 as EntityDeletedEvent,
      ActionEvent$6 as ActionEvent,
      Empty$5 as Empty,
      MessageEnvelope$6 as MessageEnvelope,
      IdentificationData$6 as IdentificationData,
      IdentificationDataIdOneOf$6 as IdentificationDataIdOneOf,
      WebhookIdentityType$6 as WebhookIdentityType,
      restaurantsMenusV1ItemVariant_universal_d_createVariant as createVariant,
      restaurantsMenusV1ItemVariant_universal_d_getVariant as getVariant,
      restaurantsMenusV1ItemVariant_universal_d_listVariants as listVariants,
      restaurantsMenusV1ItemVariant_universal_d_ListVariantsOptions as ListVariantsOptions,
      restaurantsMenusV1ItemVariant_universal_d_updateVariant as updateVariant,
      restaurantsMenusV1ItemVariant_universal_d_UpdateVariant as UpdateVariant,
      restaurantsMenusV1ItemVariant_universal_d_UpdateVariantOptions as UpdateVariantOptions,
      restaurantsMenusV1ItemVariant_universal_d_bulkCreateVariants as bulkCreateVariants,
      restaurantsMenusV1ItemVariant_universal_d_BulkCreateVariantsOptions as BulkCreateVariantsOptions,
      restaurantsMenusV1ItemVariant_universal_d_bulkUpdateVariants as bulkUpdateVariants,
      restaurantsMenusV1ItemVariant_universal_d_BulkUpdateVariantsOptions as BulkUpdateVariantsOptions,
      restaurantsMenusV1ItemVariant_universal_d_deleteVariant as deleteVariant,
      restaurantsMenusV1ItemVariant_universal_d_queryVariants as queryVariants,
      restaurantsMenusV1ItemVariant_universal_d_VariantsQueryResult as VariantsQueryResult,
      restaurantsMenusV1ItemVariant_universal_d_VariantsQueryBuilder as VariantsQueryBuilder,
      restaurantsMenusV1ItemVariant_universal_d_countVariants as countVariants,
      restaurantsMenusV1ItemVariant_universal_d_CountVariantsOptions as CountVariantsOptions,
      restaurantsMenusV1ItemVariant_universal_d_cloneVariants as cloneVariants,
      restaurantsMenusV1ItemVariant_universal_d_bulkDeleteVariants as bulkDeleteVariants,
    };
  }
  
  interface Menu {
      /**
       * Menu ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the menu is updated. To prevent conflicting changes, the current revision must be passed when updating the menu. Ignored when creating a menu.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the menu was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the menu was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Menu name. */
      name?: string;
      /** Menu description. */
      description?: string | null;
      /** Whether the menu visible to site visitors. */
      visible?: boolean | null;
      /** Menu section IDs. */
      sectionIds?: string[];
      /** Extended fields. */
      extendedFields?: ExtendedFields$2;
      /** Part of the site URL, that redirects to the menu. For example, in the URL `www.mywebsite.com/our-menus/dinner-menu`, `dinner-menu` is the field value. */
      urlQueryParam?: string | null;
      /** Custom SEO data for the menu. */
      seoData?: SeoSchema;
      /**
       * Details of this menu's location.
       * @internal
       */
      location?: Location$1;
      /**
       * @internal
       * @readonly
       */
      oloMigrationMenuId?: string | null;
  }
  interface ExtendedFields$2 {
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
   * The SEO schema object contains data about different types of meta tags. It makes sure that the information about your page is presented properly to search engines.
   * The search engines use this information for ranking purposes, or to display snippets in the search results.
   * This data will override other sources of tags (for example patterns) and will be included in the <head> section of the HTML document, while not being displayed on the page itself.
   */
  interface SeoSchema {
      /** SEO tag information. */
      tags?: Tag[];
      /** SEO general settings. */
      settings?: Settings;
  }
  interface Keyword {
      /** Keyword value. */
      term?: string;
      /** Whether the keyword is the main focus keyword. */
      isMain?: boolean;
      /** The source that added the keyword terms to the SEO settings. */
      origin?: string | null;
  }
  interface Tag {
      /**
       * SEO tag type.
       *
       *
       * Supported values: `title`, `meta`, `script`, `link`.
       */
      type?: string;
      /**
       * A `{"key": "value"}` pair object where each SEO tag property (`"name"`, `"content"`, `"rel"`, `"href"`) contains a value.
       * For example: `{"name": "description", "content": "the description itself"}`.
       */
      props?: Record<string, any> | null;
      /** SEO tag meta data. For example, `{"height": 300, "width": 240}`. */
      meta?: Record<string, any> | null;
      /** SEO tag inner content. For example, `<title> inner content </title>`. */
      children?: string;
      /** Whether the tag is a custom tag. */
      custom?: boolean;
      /** Whether the tag is disabled. */
      disabled?: boolean;
  }
  interface Settings {
      /**
       * Whether the Auto Redirect feature, which creates `301 redirects` on a slug change, is enabled.
       *
       *
       * Default: `false` (Auto Redirect is enabled.)
       */
      preventAutoRedirect?: boolean;
      /** User-selected keyword terms for a specific page. */
      keywords?: Keyword[];
  }
  interface Location$1 {
      /**
       * Location Id
       * @internal
       */
      _id?: string | null;
      /**
       * Location Name.
       * @internal
       * @readonly
       */
      name?: string | null;
      /**
       * Whether this menu's location is archived. This has no impact on API behavior, but it can be used to indicate whether this menu's location is active or inactive.
       * @internal
       * @readonly
       */
      archived?: boolean | null;
  }
  interface GetMenuSiteUrlRequest {
      /**
       * Menu ID.
       * @readonly
       */
      _id: string | null;
  }
  interface GetMenuSiteUrlResponse {
      /** Retrieved menuInfo with path url. */
      menuSiteUrl?: MenuSiteUrl;
  }
  interface MenuSiteUrl {
      /** Path URL. */
      path?: string;
  }
  interface QueryMenusSiteUrlRequest {
      /** Query options */
      query?: CursorQuery$4;
  }
  interface CursorQuery$4 extends CursorQueryPagingMethodOneOf$4 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$3;
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
      sort?: Sorting$4[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$4 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$3;
  }
  interface Sorting$4 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$4;
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
  enum SortOrder$4 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$3 {
      /** Number of items to load. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * You can get the relevant cursor token
       * from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface QueryMenusSiteUrlResponse {
      /** Retrieved menuInfos with path urls. */
      menuSiteUrls?: MenuSiteUrl[];
      /** The metadata of the paginated results. */
      pagingMetadata?: CursorPagingMetadata$3;
  }
  interface CursorPagingMetadata$3 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      cursors?: Cursors$3;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$3 {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface InvalidateCache$2 extends InvalidateCacheGetByOneOf$2 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$2;
      /** Invalidate by page id */
      page?: Page$2;
      /** Invalidate by URI path */
      uri?: URI$2;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$2;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf$2 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$2;
      /** Invalidate by page id */
      page?: Page$2;
      /** Invalidate by URI path */
      uri?: URI$2;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$2;
  }
  interface App$2 {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page$2 {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI$2 {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File$2 {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface DeleteOrphanSections {
      /** Menu id */
      menuId?: string;
  }
  interface MenusDataCloningCompleted {
  }
  interface CreateMenuRequest {
      /** Menu details. */
      menu: Menu;
  }
  interface CreateMenuResponse {
      /** Menu. */
      menu?: Menu;
  }
  interface BulkCreateMenusRequest {
      /** Menu details. */
      menus: Menu[];
      /** Whether to receive the created menus in the response. */
      returnEntity?: boolean;
  }
  interface BulkCreateMenusResponse {
      /** Information about the created menus. */
      results?: BulkCreateMenuResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$3;
  }
  interface BulkCreateMenuResult {
      /** Whether to receive the created menus in the response. */
      menuMetadata?: ItemMetadata$3;
      /** Created menu. */
      menu?: Menu;
  }
  interface ItemMetadata$3 {
      /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError$3;
  }
  interface ApplicationError$3 {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  interface BulkActionMetadata$3 {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface GetMenuRequest {
      /** Menu ID. */
      menuId: string;
  }
  interface GetMenuResponse {
      /** Menu. */
      menu?: Menu;
  }
  interface ListMenusRequest {
      /** Menu IDs. */
      menuIds?: string[];
      /** The metadata of the paginated results. */
      paging?: CursorPaging$3;
      /** Whether to return only menus that are visible to site visitors. */
      onlyVisible?: boolean | null;
  }
  interface ListMenusResponse {
      /** Retrieved menus. */
      menus?: Menu[];
      /** The metadata of the paginated results. */
      pagingMetadata?: CursorPagingMetadata$3;
  }
  interface QueryMenusRequest {
      /** Query options. */
      query?: CursorQuery$4;
  }
  interface QueryMenusResponse {
      /** Retrieved menus. */
      menus?: Menu[];
      /** The metadata of the paginated results. */
      pagingMetadata?: CursorPagingMetadata$3;
  }
  interface UpdateMenuRequest {
      /** Menu to update. */
      menu: Menu;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface UpdateMenuResponse {
      /** Updated menu. */
      menu?: Menu;
  }
  interface BulkUpdateMenuRequest {
      /** Menus to update. */
      menus: MaskedMenu[];
      /** Whether to receive the entity in the response. */
      returnEntity?: boolean;
  }
  interface MaskedMenu {
      /** Menu to updated. */
      menu?: Menu;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface BulkUpdateMenuResponse {
      /** Results of bulk menu update. */
      results?: BulkMenuResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$3;
  }
  interface BulkMenuResult {
      /** Metadata for menu update. */
      menuMetadata?: ItemMetadata$3;
      /** Updated menu. Only returned if `returnEntity` is set to `true`. */
      menu?: Menu;
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
      /** Namespace of the app. */
      namespace?: string;
      /** Updated extended fields data. */
      namespaceData?: Record<string, any> | null;
  }
  interface DeleteMenuRequest {
      /** Menu ID. */
      menuId: string;
  }
  interface DeleteMenuResponse {
  }
  interface CloneMenusRequest {
      /** The MetaSiteId to clone from. */
      metaSiteId: string;
  }
  interface CloneMenusResponse {
  }
  interface DomainEvent$5 extends DomainEventBodyOneOf$5 {
      createdEvent?: EntityCreatedEvent$5;
      updatedEvent?: EntityUpdatedEvent$5;
      deletedEvent?: EntityDeletedEvent$5;
      actionEvent?: ActionEvent$5;
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
  interface DomainEventBodyOneOf$5 {
      createdEvent?: EntityCreatedEvent$5;
      updatedEvent?: EntityUpdatedEvent$5;
      deletedEvent?: EntityDeletedEvent$5;
      actionEvent?: ActionEvent$5;
  }
  interface EntityCreatedEvent$5 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$5;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$5 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$5 {
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
  interface EntityDeletedEvent$5 {
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
  interface ActionEvent$5 {
      bodyAsJson?: string;
  }
  interface Empty$4 {
  }
  interface MessageEnvelope$5 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$5;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$5 extends IdentificationDataIdOneOf$5 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$5;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$5 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$5 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Get menu details and path URL by menu ID.
   * @param _id - Menu ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId RESTAURANTS.MENU_READ
   */
  function getMenuSiteUrl(_id: string | null): Promise<GetMenuSiteUrlResponse>;
  /**
   * Query menu details and path URL
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.MENU_READ
   */
  function queryMenusSiteUrl(options?: QueryMenusSiteUrlOptions): Promise<QueryMenusSiteUrlResponse>;
  interface QueryMenusSiteUrlOptions {
      /** Query options */
      query?: CursorQuery$4;
  }
  /**
   * > **Note:** The Menus API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Creates a menu.
   *
   * To create multiple menus at once, use [Bulk Create Menus](https://dev.wix.com/docs/rest/business-solutions/restaurants/menus/menu/bulk-create-menus).
   * @param menu - Menu details.
   * @public
   * @documentationMaturity preview
   * @requiredField menu
   * @permissionId RESTAURANTS.MENU_CREATE
   * @adminMethod
   * @returns Menu.
   */
  function createMenu(menu: Menu): Promise<Menu>;
  /**
   * > **Note:** The Menu API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Creates multiple menus at once.
   * @param menus - Menu details.
   * @public
   * @documentationMaturity preview
   * @requiredField menus
   * @permissionId RESTAURANTS.MENU_CREATE
   * @adminMethod
   */
  function bulkCreateMenus(menus: Menu[], options?: BulkCreateMenusOptions): Promise<BulkCreateMenusResponse>;
  interface BulkCreateMenusOptions {
      /** Whether to receive the created menus in the response. */
      returnEntity?: boolean;
  }
  /**
   * > **Note:** The Menu API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves a menu by ID.
   * @param menuId - Menu ID.
   * @public
   * @documentationMaturity preview
   * @requiredField menuId
   * @permissionId RESTAURANTS.MENU_READ
   * @returns Menu.
   */
  function getMenu(menuId: string): Promise<Menu>;
  /**
   * > **Note:** The Menu API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Retrieves a list of up to 500 menus.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.MENU_READ
   */
  function listMenus(options?: ListMenusOptions): Promise<ListMenusResponse>;
  interface ListMenusOptions {
      /** Menu IDs. */
      menuIds?: string[];
      /** The metadata of the paginated results. */
      paging?: CursorPaging$3;
      /** Whether to return only menus that are visible to site visitors. */
      onlyVisible?: boolean | null;
  }
  /**
   * Creates a query to retrieve a list of menus.
   *
   * The `queryMenus()` function builds a query to retrieve a list of menus and returns a `MenusQueryBuilder` object.
   *
   * The returned object contains the query definition, which is used to run the query using the [`find()`](/menus/menus-query-builder/find) function.
   *
   * You can refine the query by chaining `MenusQueryBuilder` functions onto the query. `MenusQueryBuilder` functions enable you to filter, sort, and control the results that `queryMenus()` returns.
   *
   * `queryMenus()` runs with the following `MenusQueryBuilder` defaults, which you can override:
   *
   * * [`limit(100)`](/menus/menus-query-builder/limit)
   * * [`ascending('entityId')`](/menus/menus-query-builder/ascending)
   *
   * The following `MenusQueryBuilder` functions are supported for `queryMenus()`. For a full description of the menu object, see the object returned for the [`items`](/menus/menus-query-result/items) property in `MenusQueryResult`.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.MENU_READ
   */
  function queryMenus(): MenusQueryBuilder;
  interface QueryCursorResult$4 {
      cursors: Cursors$3;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface MenusQueryResult extends QueryCursorResult$4 {
      items: Menu[];
      query: MenusQueryBuilder;
      next: () => Promise<MenusQueryResult>;
      prev: () => Promise<MenusQueryResult>;
  }
  interface MenusQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name' | 'description' | 'urlQueryParam', value: any) => MenusQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name' | 'description' | 'urlQueryParam', value: any) => MenusQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => MenusQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => MenusQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => MenusQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => MenusQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: 'name' | 'description' | 'urlQueryParam', value: string) => MenusQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'name' | 'description' | 'urlQueryParam', value: any) => MenusQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => MenusQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => MenusQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<MenusQueryResult>;
  }
  /**
   * > **Note:** The Menu API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Updates a menu.
   *
   * To update multiple menus at once, use [Bulk Update Menu](https://dev.wix.com/docs/rest/business-solutions/restaurants/menus/menu/bulk-update-menu).
   *
   * Each time a menu is updated, its revision increments by 1. The existing revision must be included when updating a menu. This ensures you're working with the latest menu information, and it prevents unintended overwrites.
   * @param _id - Menu ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField menu
   * @requiredField menu.revision
   * @permissionId RESTAURANTS.MENU_UPDATE
   * @adminMethod
   * @returns Updated menu.
   */
  function updateMenu(_id: string | null, menu: UpdateMenu, options?: UpdateMenuOptions): Promise<Menu>;
  interface UpdateMenu {
      /**
       * Menu ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the menu is updated. To prevent conflicting changes, the current revision must be passed when updating the menu. Ignored when creating a menu.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the menu was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the menu was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Menu name. */
      name?: string;
      /** Menu description. */
      description?: string | null;
      /** Whether the menu visible to site visitors. */
      visible?: boolean | null;
      /** Menu section IDs. */
      sectionIds?: string[];
      /** Extended fields. */
      extendedFields?: ExtendedFields$2;
      /** Part of the site URL, that redirects to the menu. For example, in the URL `www.mywebsite.com/our-menus/dinner-menu`, `dinner-menu` is the field value. */
      urlQueryParam?: string | null;
      /** Custom SEO data for the menu. */
      seoData?: SeoSchema;
      /**
       * Details of this menu's location.
       * @internal
       */
      location?: Location$1;
      /**
       * @internal
       * @readonly
       */
      oloMigrationMenuId?: string | null;
  }
  interface UpdateMenuOptions {
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  /**
   * > **Note:** The Menu API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Updates multiple menus at once.
   *
   * Each time a menu is updated, its revision increments by 1. The existing revision must be included when updating the menu. This ensures you're working with the latest menu information, and it prevents unintended overwrites.
   * @param menus - Menus to update.
   * @public
   * @documentationMaturity preview
   * @requiredField menus
   * @requiredField menus.menu._id
   * @requiredField menus.menu.revision
   * @permissionId RESTAURANTS.MENU_UPDATE
   * @adminMethod
   */
  function bulkUpdateMenu(menus: MaskedMenu[], options?: BulkUpdateMenuOptions): Promise<BulkUpdateMenuResponse>;
  interface BulkUpdateMenuOptions {
      /** Whether to receive the entity in the response. */
      returnEntity?: boolean;
  }
  /**
   * > **Note:** The Menu API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Updates only the `extendedFields` field.
   * @param _id - ID of the entity to update.
   * @param namespace - Identifier for the app whose extended fields are being updated.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField namespace
   * @requiredField options
   * @requiredField options.namespaceData
   * @adminMethod
   */
  function updateExtendedFields(_id: string, namespace: string, options: UpdateExtendedFieldsOptions): Promise<UpdateExtendedFieldsResponse>;
  interface UpdateExtendedFieldsOptions {
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData: Record<string, any> | null;
  }
  /**
   * > **Note:** The Menu API only works with the Wix Restaurants Menus (New) app. Make sure you have installed this app from the [Wix App Market](https://www.wix.com/app-market/wix-restaurants-menus-new).
   *
   * Deletes a menu.
   * @param menuId - Menu ID.
   * @public
   * @documentationMaturity preview
   * @requiredField menuId
   * @permissionId RESTAURANTS.MENU_DELETE
   * @adminMethod
   */
  function deleteMenu(menuId: string): Promise<void>;
  /**
   * Clone menus from a different metasite
   * @param metaSiteId - The MetaSiteId to clone from.
   * @internal
   * @documentationMaturity preview
   * @requiredField metaSiteId
   * @permissionId RESTAURANTS.MENU_CREATE
   * @adminMethod
   */
  function cloneMenus(metaSiteId: string): Promise<void>;
  
  type restaurantsMenusV1Menu_universal_d_Menu = Menu;
  type restaurantsMenusV1Menu_universal_d_SeoSchema = SeoSchema;
  type restaurantsMenusV1Menu_universal_d_Keyword = Keyword;
  type restaurantsMenusV1Menu_universal_d_Tag = Tag;
  type restaurantsMenusV1Menu_universal_d_Settings = Settings;
  type restaurantsMenusV1Menu_universal_d_GetMenuSiteUrlRequest = GetMenuSiteUrlRequest;
  type restaurantsMenusV1Menu_universal_d_GetMenuSiteUrlResponse = GetMenuSiteUrlResponse;
  type restaurantsMenusV1Menu_universal_d_MenuSiteUrl = MenuSiteUrl;
  type restaurantsMenusV1Menu_universal_d_QueryMenusSiteUrlRequest = QueryMenusSiteUrlRequest;
  type restaurantsMenusV1Menu_universal_d_QueryMenusSiteUrlResponse = QueryMenusSiteUrlResponse;
  type restaurantsMenusV1Menu_universal_d_DeleteOrphanSections = DeleteOrphanSections;
  type restaurantsMenusV1Menu_universal_d_MenusDataCloningCompleted = MenusDataCloningCompleted;
  type restaurantsMenusV1Menu_universal_d_CreateMenuRequest = CreateMenuRequest;
  type restaurantsMenusV1Menu_universal_d_CreateMenuResponse = CreateMenuResponse;
  type restaurantsMenusV1Menu_universal_d_BulkCreateMenusRequest = BulkCreateMenusRequest;
  type restaurantsMenusV1Menu_universal_d_BulkCreateMenusResponse = BulkCreateMenusResponse;
  type restaurantsMenusV1Menu_universal_d_BulkCreateMenuResult = BulkCreateMenuResult;
  type restaurantsMenusV1Menu_universal_d_GetMenuRequest = GetMenuRequest;
  type restaurantsMenusV1Menu_universal_d_GetMenuResponse = GetMenuResponse;
  type restaurantsMenusV1Menu_universal_d_ListMenusRequest = ListMenusRequest;
  type restaurantsMenusV1Menu_universal_d_ListMenusResponse = ListMenusResponse;
  type restaurantsMenusV1Menu_universal_d_QueryMenusRequest = QueryMenusRequest;
  type restaurantsMenusV1Menu_universal_d_QueryMenusResponse = QueryMenusResponse;
  type restaurantsMenusV1Menu_universal_d_UpdateMenuRequest = UpdateMenuRequest;
  type restaurantsMenusV1Menu_universal_d_UpdateMenuResponse = UpdateMenuResponse;
  type restaurantsMenusV1Menu_universal_d_BulkUpdateMenuRequest = BulkUpdateMenuRequest;
  type restaurantsMenusV1Menu_universal_d_MaskedMenu = MaskedMenu;
  type restaurantsMenusV1Menu_universal_d_BulkUpdateMenuResponse = BulkUpdateMenuResponse;
  type restaurantsMenusV1Menu_universal_d_BulkMenuResult = BulkMenuResult;
  type restaurantsMenusV1Menu_universal_d_UpdateExtendedFieldsRequest = UpdateExtendedFieldsRequest;
  type restaurantsMenusV1Menu_universal_d_UpdateExtendedFieldsResponse = UpdateExtendedFieldsResponse;
  type restaurantsMenusV1Menu_universal_d_DeleteMenuRequest = DeleteMenuRequest;
  type restaurantsMenusV1Menu_universal_d_DeleteMenuResponse = DeleteMenuResponse;
  type restaurantsMenusV1Menu_universal_d_CloneMenusRequest = CloneMenusRequest;
  type restaurantsMenusV1Menu_universal_d_CloneMenusResponse = CloneMenusResponse;
  const restaurantsMenusV1Menu_universal_d_getMenuSiteUrl: typeof getMenuSiteUrl;
  const restaurantsMenusV1Menu_universal_d_queryMenusSiteUrl: typeof queryMenusSiteUrl;
  type restaurantsMenusV1Menu_universal_d_QueryMenusSiteUrlOptions = QueryMenusSiteUrlOptions;
  const restaurantsMenusV1Menu_universal_d_createMenu: typeof createMenu;
  const restaurantsMenusV1Menu_universal_d_bulkCreateMenus: typeof bulkCreateMenus;
  type restaurantsMenusV1Menu_universal_d_BulkCreateMenusOptions = BulkCreateMenusOptions;
  const restaurantsMenusV1Menu_universal_d_getMenu: typeof getMenu;
  const restaurantsMenusV1Menu_universal_d_listMenus: typeof listMenus;
  type restaurantsMenusV1Menu_universal_d_ListMenusOptions = ListMenusOptions;
  const restaurantsMenusV1Menu_universal_d_queryMenus: typeof queryMenus;
  type restaurantsMenusV1Menu_universal_d_MenusQueryResult = MenusQueryResult;
  type restaurantsMenusV1Menu_universal_d_MenusQueryBuilder = MenusQueryBuilder;
  const restaurantsMenusV1Menu_universal_d_updateMenu: typeof updateMenu;
  type restaurantsMenusV1Menu_universal_d_UpdateMenu = UpdateMenu;
  type restaurantsMenusV1Menu_universal_d_UpdateMenuOptions = UpdateMenuOptions;
  const restaurantsMenusV1Menu_universal_d_bulkUpdateMenu: typeof bulkUpdateMenu;
  type restaurantsMenusV1Menu_universal_d_BulkUpdateMenuOptions = BulkUpdateMenuOptions;
  const restaurantsMenusV1Menu_universal_d_updateExtendedFields: typeof updateExtendedFields;
  type restaurantsMenusV1Menu_universal_d_UpdateExtendedFieldsOptions = UpdateExtendedFieldsOptions;
  const restaurantsMenusV1Menu_universal_d_deleteMenu: typeof deleteMenu;
  const restaurantsMenusV1Menu_universal_d_cloneMenus: typeof cloneMenus;
  namespace restaurantsMenusV1Menu_universal_d {
    export {
      restaurantsMenusV1Menu_universal_d_Menu as Menu,
      ExtendedFields$2 as ExtendedFields,
      restaurantsMenusV1Menu_universal_d_SeoSchema as SeoSchema,
      restaurantsMenusV1Menu_universal_d_Keyword as Keyword,
      restaurantsMenusV1Menu_universal_d_Tag as Tag,
      restaurantsMenusV1Menu_universal_d_Settings as Settings,
      Location$1 as Location,
      restaurantsMenusV1Menu_universal_d_GetMenuSiteUrlRequest as GetMenuSiteUrlRequest,
      restaurantsMenusV1Menu_universal_d_GetMenuSiteUrlResponse as GetMenuSiteUrlResponse,
      restaurantsMenusV1Menu_universal_d_MenuSiteUrl as MenuSiteUrl,
      restaurantsMenusV1Menu_universal_d_QueryMenusSiteUrlRequest as QueryMenusSiteUrlRequest,
      CursorQuery$4 as CursorQuery,
      CursorQueryPagingMethodOneOf$4 as CursorQueryPagingMethodOneOf,
      Sorting$4 as Sorting,
      SortOrder$4 as SortOrder,
      CursorPaging$3 as CursorPaging,
      restaurantsMenusV1Menu_universal_d_QueryMenusSiteUrlResponse as QueryMenusSiteUrlResponse,
      CursorPagingMetadata$3 as CursorPagingMetadata,
      Cursors$3 as Cursors,
      InvalidateCache$2 as InvalidateCache,
      InvalidateCacheGetByOneOf$2 as InvalidateCacheGetByOneOf,
      App$2 as App,
      Page$2 as Page,
      URI$2 as URI,
      File$2 as File,
      restaurantsMenusV1Menu_universal_d_DeleteOrphanSections as DeleteOrphanSections,
      restaurantsMenusV1Menu_universal_d_MenusDataCloningCompleted as MenusDataCloningCompleted,
      restaurantsMenusV1Menu_universal_d_CreateMenuRequest as CreateMenuRequest,
      restaurantsMenusV1Menu_universal_d_CreateMenuResponse as CreateMenuResponse,
      restaurantsMenusV1Menu_universal_d_BulkCreateMenusRequest as BulkCreateMenusRequest,
      restaurantsMenusV1Menu_universal_d_BulkCreateMenusResponse as BulkCreateMenusResponse,
      restaurantsMenusV1Menu_universal_d_BulkCreateMenuResult as BulkCreateMenuResult,
      ItemMetadata$3 as ItemMetadata,
      ApplicationError$3 as ApplicationError,
      BulkActionMetadata$3 as BulkActionMetadata,
      restaurantsMenusV1Menu_universal_d_GetMenuRequest as GetMenuRequest,
      restaurantsMenusV1Menu_universal_d_GetMenuResponse as GetMenuResponse,
      restaurantsMenusV1Menu_universal_d_ListMenusRequest as ListMenusRequest,
      restaurantsMenusV1Menu_universal_d_ListMenusResponse as ListMenusResponse,
      restaurantsMenusV1Menu_universal_d_QueryMenusRequest as QueryMenusRequest,
      restaurantsMenusV1Menu_universal_d_QueryMenusResponse as QueryMenusResponse,
      restaurantsMenusV1Menu_universal_d_UpdateMenuRequest as UpdateMenuRequest,
      restaurantsMenusV1Menu_universal_d_UpdateMenuResponse as UpdateMenuResponse,
      restaurantsMenusV1Menu_universal_d_BulkUpdateMenuRequest as BulkUpdateMenuRequest,
      restaurantsMenusV1Menu_universal_d_MaskedMenu as MaskedMenu,
      restaurantsMenusV1Menu_universal_d_BulkUpdateMenuResponse as BulkUpdateMenuResponse,
      restaurantsMenusV1Menu_universal_d_BulkMenuResult as BulkMenuResult,
      restaurantsMenusV1Menu_universal_d_UpdateExtendedFieldsRequest as UpdateExtendedFieldsRequest,
      restaurantsMenusV1Menu_universal_d_UpdateExtendedFieldsResponse as UpdateExtendedFieldsResponse,
      restaurantsMenusV1Menu_universal_d_DeleteMenuRequest as DeleteMenuRequest,
      restaurantsMenusV1Menu_universal_d_DeleteMenuResponse as DeleteMenuResponse,
      restaurantsMenusV1Menu_universal_d_CloneMenusRequest as CloneMenusRequest,
      restaurantsMenusV1Menu_universal_d_CloneMenusResponse as CloneMenusResponse,
      DomainEvent$5 as DomainEvent,
      DomainEventBodyOneOf$5 as DomainEventBodyOneOf,
      EntityCreatedEvent$5 as EntityCreatedEvent,
      RestoreInfo$5 as RestoreInfo,
      EntityUpdatedEvent$5 as EntityUpdatedEvent,
      EntityDeletedEvent$5 as EntityDeletedEvent,
      ActionEvent$5 as ActionEvent,
      Empty$4 as Empty,
      MessageEnvelope$5 as MessageEnvelope,
      IdentificationData$5 as IdentificationData,
      IdentificationDataIdOneOf$5 as IdentificationDataIdOneOf,
      WebhookIdentityType$5 as WebhookIdentityType,
      restaurantsMenusV1Menu_universal_d_getMenuSiteUrl as getMenuSiteUrl,
      restaurantsMenusV1Menu_universal_d_queryMenusSiteUrl as queryMenusSiteUrl,
      restaurantsMenusV1Menu_universal_d_QueryMenusSiteUrlOptions as QueryMenusSiteUrlOptions,
      restaurantsMenusV1Menu_universal_d_createMenu as createMenu,
      restaurantsMenusV1Menu_universal_d_bulkCreateMenus as bulkCreateMenus,
      restaurantsMenusV1Menu_universal_d_BulkCreateMenusOptions as BulkCreateMenusOptions,
      restaurantsMenusV1Menu_universal_d_getMenu as getMenu,
      restaurantsMenusV1Menu_universal_d_listMenus as listMenus,
      restaurantsMenusV1Menu_universal_d_ListMenusOptions as ListMenusOptions,
      restaurantsMenusV1Menu_universal_d_queryMenus as queryMenus,
      restaurantsMenusV1Menu_universal_d_MenusQueryResult as MenusQueryResult,
      restaurantsMenusV1Menu_universal_d_MenusQueryBuilder as MenusQueryBuilder,
      restaurantsMenusV1Menu_universal_d_updateMenu as updateMenu,
      restaurantsMenusV1Menu_universal_d_UpdateMenu as UpdateMenu,
      restaurantsMenusV1Menu_universal_d_UpdateMenuOptions as UpdateMenuOptions,
      restaurantsMenusV1Menu_universal_d_bulkUpdateMenu as bulkUpdateMenu,
      restaurantsMenusV1Menu_universal_d_BulkUpdateMenuOptions as BulkUpdateMenuOptions,
      restaurantsMenusV1Menu_universal_d_updateExtendedFields as updateExtendedFields,
      restaurantsMenusV1Menu_universal_d_UpdateExtendedFieldsOptions as UpdateExtendedFieldsOptions,
      restaurantsMenusV1Menu_universal_d_deleteMenu as deleteMenu,
      restaurantsMenusV1Menu_universal_d_cloneMenus as cloneMenus,
    };
  }
  
  /**
   * An operation is a service a restaurant offers that includes various aspects of its online ordering.
   * You can define default fulfillments, service fees, and scheduling requirements for each operation.
   */
  interface Operation$1 extends OperationOnlineOrderingStatusOptionsOneOf {
      /** Options for online ordering status. Required when `onlineOrderingStatus` is `PAUSED_UNTIL`. */
      pausedUntilOptions?: OnlineOrderingPausedUntilOptions;
      /**
       * Operation ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number. Increments by 1 each time the operation is updated.
       * To prevent conflicting changes,
       * the existing `revision` must be specified when updating an operation.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the operation was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the operation was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Operation name. */
      name?: string | null;
      /**
       * Currently INTERNAL. Whether the operation is enabled.
       * @internal
       */
      enabled?: boolean | null;
      /**
       * The scheduling data for this operation.
       * Scheduling specifies when an order can be placed for.
       * @internal
       * @deprecated
       * @replacedBy order_scheduling
       * @targetRemovalDate 2024-03-04
       */
      scheduling?: Scheduling;
      /**
       * INTERNAL. Profile ID associated with the operation.
       * @internal
       */
      profileId?: string | null;
      /**
       * Whether the operation is the default operation. <br />
       * Default: `false`.
       */
      default?: boolean | null;
      /** IDs of the fulfillment methods ([SDK](https://dev.wix.com/docs/sdk/backend-modules/restaurants/wix-restaurants-new/fulfillment-methods/introduction) | [REST](https://dev.wix.com/docs/rest/api-reference/wix-restaurants/fulfillment-methods/introduction)) associated with the operation. */
      fulfillmentIds?: string[] | null;
      /**
       * IDs of the service fee rules ([SDK](https://dev.wix.com/docs/sdk/backend-modules/restaurants/service-fees/introduction) | [REST](https://dev.wix.com/docs/rest/api-reference/wix-restaurants/service-fees/introduction)) associated with the operation.
       * @internal
       * @deprecated
       * @replacedBy service_fee_rule_ids
       * @targetRemovalDate 2024-02-04
       */
      serviceFeeRulesIds?: string[] | null;
      /** Online ordering status of the operation. <br /> */
      onlineOrderingStatus?: OnlineOrderingStatusType;
      /**
       * IDs of the service fee rules ([SDK](https://dev.wix.com/docs/sdk/backend-modules/restaurants/service-fees/introduction) | [REST](https://dev.wix.com/docs/rest/api-reference/wix-restaurants/service-fees/introduction)) associated with the operation.
       * @deprecated
       * @targetRemovalDate 2024-11-30
       */
      serviceFeeRuleIds?: string[] | null;
      /** Default fulfillment type of the operation. */
      defaultFulfillmentType?: FulfillmentType;
      /** Information about when an order can be placed for. */
      orderScheduling?: OrderScheduling;
      /**
       * ID of the operation group this operation belongs to.
       * @internal
       */
      operationGroupId?: string | null;
      /**
       * Details of this operation's location.
       * @internal
       */
      location?: Location;
  }
  /** @oneof */
  interface OperationOnlineOrderingStatusOptionsOneOf {
      /** Options for online ordering status. Required when `onlineOrderingStatus` is `PAUSED_UNTIL`. */
      pausedUntilOptions?: OnlineOrderingPausedUntilOptions;
  }
  /** Information about when an order can be placed for. */
  interface Scheduling extends SchedulingSchedulingOptionsOneOf {
      /** Options for scheduling. Required when `type` is `ASAP`. */
      asapOptions?: AsapScheduling;
      /** Options for scheduling. Required when `type` is `PREORDER`. */
      preorderOptions?: PreorderScheduling;
      /**
       * Scheduling type. <br />
       * - When `ASAP`, `asapOptions` is a required field.
       * - When `PREORDER`, `preorderOptions` is a required field.
       */
      type?: SchedulingType;
  }
  /** @oneof */
  interface SchedulingSchedulingOptionsOneOf {
      /** Options for scheduling. Required when `type` is `ASAP`. */
      asapOptions?: AsapScheduling;
      /** Options for scheduling. Required when `type` is `PREORDER`. */
      preorderOptions?: PreorderScheduling;
  }
  /** Scheduling type enum. */
  enum SchedulingType {
      /** Unknown scheduling type. */
      UNKNOWN_SCHEDULING = "UNKNOWN_SCHEDULING",
      /** Orders can be scheduled for the future and to be handled immediately. */
      ASAP = "ASAP",
      /** Orders can be scheduled only for the future. */
      PREORDER = "PREORDER"
  }
  /** Options for scheduling. Required if `type` is `ASAP`. */
  interface AsapScheduling extends AsapSchedulingPreparationTimeOneOf, AsapSchedulingAsapPreorderOneOf {
      /** Options for preparation time. Required when `type` is `MAX_TIME`. */
      maxOptions?: TimeDuration;
      /** Options for preparation time. Required when `type` is `TIME_RANGE`. */
      rangeOptions?: TimeDurationRange;
      /** Information for when orders must be made a set number of business days in advance. */
      businessDaysPreorderOptions?: BusinessDaysPreorder;
      /** How to define the time needed to prepare an order. */
      type?: PreparationTimeType;
      /**
       * Indication of whether it is possible to place an order for a later time on the same day.
       * @deprecated Indication of whether it is possible to place an order for a later time on the same day.
       * @replacedBy asap_preorder_type
       * @targetRemovalDate 2023-12-28
       */
      allowSameDayPreorder?: boolean | null;
      /** The type of preorder allowed for the ASAP scheduling. */
      asapPreorderType?: AsapPreorderType;
  }
  /** @oneof */
  interface AsapSchedulingPreparationTimeOneOf {
      /** Options for preparation time. Required when `type` is `MAX_TIME`. */
      maxOptions?: TimeDuration;
      /** Options for preparation time. Required when `type` is `TIME_RANGE`. */
      rangeOptions?: TimeDurationRange;
  }
  /** @oneof */
  interface AsapSchedulingAsapPreorderOneOf {
      /** Information for when orders must be made a set number of business days in advance. */
      businessDaysPreorderOptions?: BusinessDaysPreorder;
  }
  /** Preparation time type enum. */
  enum PreparationTimeType {
      /** Unknown preparation time type. */
      UNKNOWN_PREPARATION_TIME = "UNKNOWN_PREPARATION_TIME",
      /** Preparation time that is bounded by a maximum time. */
      MAX = "MAX",
      /** Preparation time that is bounded by a range of times. */
      RANGE = "RANGE"
  }
  /** Time duration. */
  interface TimeDuration {
      /** Unit of time for the duration. */
      timeUnit?: TimeUnit;
      /** Duration value. Unit of time specified in `timeUnit`. */
      duration?: number | null;
  }
  /** Time unit enum. */
  enum TimeUnit {
      /** Unknown time unit. */
      UNKNOWN_TIME_UNIT = "UNKNOWN_TIME_UNIT",
      /** Minutes time unit. */
      MINUTES = "MINUTES",
      /** Hours time unit. */
      HOURS = "HOURS",
      /** Days time unit. */
      DAYS = "DAYS"
  }
  /** Time range for preparation. */
  interface TimeDurationRange {
      /** Time unit for the time range. */
      timeUnit?: TimeUnit;
      /**
       * Minimum duration value. Unit of time specified in `timeUnit`.
       * @internal
       * @deprecated
       * @replacedBy min_duration
       * @targetRemovalDate 2023-11-11
       */
      rangeMinimumDuration?: number | null;
      /**
       * Maximum duration value. Unit of time specified in `timeUnit`.
       * @internal
       * @deprecated
       * @replacedBy max_duration
       * @targetRemovalDate 2023-11-11
       */
      rangeMaximumDuration?: number | null;
      /** Minimum duration value. Unit of time specified in `timeUnit`. */
      minDuration?: number | null;
      /** Maximum duration value. Unit of time specified in `timeUnit`. */
      maxDuration?: number | null;
  }
  /** Asap preorder type enum. */
  enum AsapPreorderType {
      /** Unknown ASAP preorder type. */
      UNKNOWN_ASAP_PREORDER = "UNKNOWN_ASAP_PREORDER",
      /** Doesn't allow preorder. */
      NO_PREORDER = "NO_PREORDER",
      /** Allows preorder for a maximum specified number of business days in advance. */
      BUSINESS_DAYS_PREORDER = "BUSINESS_DAYS_PREORDER"
  }
  /** Information for when orders must be made a set number of business days in advance. */
  interface BusinessDaysPreorder {
      /**
       * Maximum number of business days an order can be scheduled in advance.
       *
       * When `0`, an order can be scheduled only until the end of the current business day.
       * For any other value, the order can be scheduled for the end of the business day in that many days.
       * For example, `5` means the order can be scheduled for any time before the end of the 5th business day from today (where today is "day 0").
       */
      businessDays?: number | null;
  }
  /** Information about preorders. */
  interface PreorderScheduling {
      method?: PreorderMethod;
      /**
       * Configuration of the fulfillment times. <br />
       * Currently, only `TIME_WINDOWS` is supported.
       * @internal
       * @deprecated
       * @replacedBy fulfillment_times_display
       * @targetRemovalDate 2023-11-11
       */
      fulfillmentTimesDisplayConfig?: FulfillmentTimesDisplayConfig;
      /**
       * Configuration of the fulfillment times. <br />
       * Currently, only `TIME_WINDOWS` is supported.
       */
      fulfillmentTimesDisplay?: FulfillmentTimesDisplayConfig;
  }
  /** Method for `PREORDER` scheduling type. */
  interface PreorderMethod extends PreorderMethodMethodOptionsOneOf {
      /** Options for the method. Required when `type` is `TIME_BOUNDED`. */
      timeBoundedOptions?: TimeBounded;
      /** Options for the method. Required when `type` is `WEEKLY_SCHEDULE`. */
      weeklyScheduleOptions?: WeeklySchedule;
      /**
       * Type of time frame for how long in advance preorders can be made. <br />
       * - When `TIME_BOUNDED`, `timeBoundedOptions` is a required field.
       * - When `WEEKLY_SCHEDULE`, `weeklyScheduleOptions` is a required field.
       */
      type?: MethodType;
  }
  /** @oneof */
  interface PreorderMethodMethodOptionsOneOf {
      /** Options for the method. Required when `type` is `TIME_BOUNDED`. */
      timeBoundedOptions?: TimeBounded;
      /** Options for the method. Required when `type` is `WEEKLY_SCHEDULE`. */
      weeklyScheduleOptions?: WeeklySchedule;
  }
  /** Day of the week and time of the day. */
  interface DayAndTime {
      /** Day of the week. */
      dayOfWeek?: EntitiesDayOfWeek$1;
      /** Time of the day. */
      timeOfDay?: TimeOfDay$1;
  }
  enum EntitiesDayOfWeek$1 {
      /** Monday. */
      MON = "MON",
      /** Tuesday. */
      TUE = "TUE",
      /** Wednesday. */
      WED = "WED",
      /** Thursday. */
      THU = "THU",
      /** Friday. */
      FRI = "FRI",
      /** Saturday. */
      SAT = "SAT",
      /** Sunday. */
      SUN = "SUN"
  }
  interface TimeOfDay$1 {
      /**
       * Hours. <br />
       * Min: `0`. <br />
       * Max: `23`.
       */
      hours?: number;
      /**
       * Minutes. <br />
       * Min: `0`. <br />
       * Max: `23`.
       */
      minutes?: number;
  }
  /** Preorder method type enum. */
  enum MethodType {
      /** Unknown preorder method type. */
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      /** Preorder time has a minimum and a maximum. */
      TIME_BOUNDED = "TIME_BOUNDED",
      /** Preorders have a weekly schedule with a weekly cutoff time. */
      WEEKLY_SCHEDULE = "WEEKLY_SCHEDULE"
  }
  /** Information about the time range when preorders are time bounded. */
  interface TimeBounded {
      /**
       * Minimum time required to schedule the order.
       * @internal
       * @deprecated
       * @replacedBy min_time_in_advance
       * @targetRemovalDate 2023-11-11
       */
      minimumInAdvanceTime?: TimeDuration;
      /**
       * Maximum time allowed to schedule the order.
       * @internal
       * @deprecated
       * @replacedBy max_time_in_advance
       * @targetRemovalDate 2023-11-11
       */
      maximumInAdvanceTime?: TimeDuration;
      /** Minimum time required to schedule the order. */
      minTimeInAdvance?: TimeDuration;
      /** Maximum time allowed to schedule the order. */
      maxTimeInAdvance?: TimeDuration;
  }
  /** Options for the method. Required when `type` is `WEEKLY_SCHEDULE`. */
  interface WeeklySchedule {
      /**
       * The weekly schedule cutoff time. <br />
       * Orders placed before the cutoff time are scheduled for the current week. <br />
       * Orders placed after the cutoff time are scheduled for the next week.
       */
      cutOffTime?: DayAndTime;
  }
  /** Way by which fulfillment times should be displayed. */
  interface FulfillmentTimesDisplayConfig extends FulfillmentTimesDisplayConfigFulfillmentTimesDisplayOptionsOneOf {
      /** Options for fulfillment time. Required when `fulfillmentTimesType` is `TIME_WINDOWS`. */
      timeWindowsOptions?: TimeDuration;
      /**
       * Type of the fulfillment times.<br />
       * When `TIME_WINDOWS`, `timeWindowsOptions` is a required field.
       * @internal
       * @deprecated
       * @replacedBy type
       * @targetRemovalDate 2023-11-11
       */
      fulfillmentTimesType?: FulfillmentTimesType;
      /**
       * Type of the fulfillment times. <br />
       * When `TIME_WINDOWS`, `timeWindowsOptions` is a required field.
       */
      type?: FulfillmentTimesType;
  }
  /** @oneof */
  interface FulfillmentTimesDisplayConfigFulfillmentTimesDisplayOptionsOneOf {
      /** Options for fulfillment time. Required when `fulfillmentTimesType` is `TIME_WINDOWS`. */
      timeWindowsOptions?: TimeDuration;
  }
  /** The fulfillment times type enum. */
  enum FulfillmentTimesType {
      /** Unknown fulfillment times type. */
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      /** Display fulfillment times as time windows. */
      TIME_WINDOWS = "TIME_WINDOWS"
  }
  /** Online ordering status enum. */
  enum OnlineOrderingStatusType {
      /** Online ordering status is not defined. */
      UNDEFINED_ONLINE_ORDERING_STATUS = "UNDEFINED_ONLINE_ORDERING_STATUS",
      /** Operation currently accepts online orders. */
      ENABLED = "ENABLED",
      /** Operation currently does not accept online orders. */
      DISABLED = "DISABLED",
      /** Operation currently does not accept online orders, but will accept online orders from a specified time and date. When applied, `pausedUntilOptions` is a required field. */
      PAUSED_UNTIL = "PAUSED_UNTIL"
  }
  /** Options for online ordering status. Required when `onlineOrderingStatus` is `PAUSED_UNTIL`. */
  interface OnlineOrderingPausedUntilOptions {
      /**
       * Date and time until which online ordering is paused. <br />
       *
       * Before the specified time, behavior is the same as when `onlineOrderingStatus` is `DISABLED`. <br />
       *
       * After the specified time, behavior is the same as when `onlineOrderingStatus` is `ENABLED`. <br />
       *
       * Passing the time does not trigger any changes to value of any properties.
       */
      time?: Date | null;
  }
  /** Fulfillment type enum. */
  enum FulfillmentType {
      /** Undefined fulfillment type. */
      UNDEFINED_FULFILLMENT_TYPE = "UNDEFINED_FULFILLMENT_TYPE",
      /** Pickup fulfillment. */
      PICKUP = "PICKUP",
      /** Delivery fulfillment. */
      DELIVERY = "DELIVERY"
  }
  /** Information about when an order can be placed for. */
  interface OrderScheduling extends OrderSchedulingOrderSchedulingOptionsOneOf {
      /** Options for scheduling. Required if `type` is `ASAP`. */
      asapOptions?: AsapOrderScheduling;
      /** Options for scheduling. Required if `type` is `PREORDER`. */
      preorderOptions?: PreorderScheduling;
      /**
       * Scheduling type. <br />
       * - When `ASAP`, `asapOptions` is a required field.
       * - When `PREORDER`, `preorderOptions` is a required field.
       */
      type?: SchedulingType;
  }
  /** @oneof */
  interface OrderSchedulingOrderSchedulingOptionsOneOf {
      /** Options for scheduling. Required if `type` is `ASAP`. */
      asapOptions?: AsapOrderScheduling;
      /** Options for scheduling. Required if `type` is `PREORDER`. */
      preorderOptions?: PreorderScheduling;
  }
  interface AsapOrderScheduling extends AsapOrderSchedulingAsapFutureHandlingOptionsOneOf {
      /** Options for future handling. Required when `asapFutureHandlingType` is `BUSINESS_DAYS_AHEAD_HANDLING`. */
      businessDaysAheadHandlingOptions?: BusinessDaysAheadHandling;
      /**
       * Amount of time needed to prepare the order. <br />
       * - When `MAX_TIME`, `maxTimeOptions` is a required field.
       * - When `MAX_RANGE`, `timeRangeOptions` is a required field.
       */
      preparationTime?: PreparationTime;
      /**
       * Defines if and how non-immediate orders should be handled. <br />
       * When this value is `BUSINESS_DAYS_AHEAD_HANDLING`, `businessDaysAheadHandlingOptions` is a required field.
       */
      asapFutureHandlingType?: AsapFutureHandlingType;
  }
  /** @oneof */
  interface AsapOrderSchedulingAsapFutureHandlingOptionsOneOf {
      /** Options for future handling. Required when `asapFutureHandlingType` is `BUSINESS_DAYS_AHEAD_HANDLING`. */
      businessDaysAheadHandlingOptions?: BusinessDaysAheadHandling;
  }
  interface PreparationTime extends PreparationTimeTimeSpecificationOneOf {
      /** Options for preparation time. Required when `type` is `MAX_TIME`. */
      maxTimeOptions?: TimeDuration;
      /** Options for preparation time. Required when `type` is `TIME_RANGE`. */
      timeRangeOptions?: TimeDurationRange;
      /** Preparation time type. */
      type?: PreparationTimePreparationTimeType;
  }
  /** @oneof */
  interface PreparationTimeTimeSpecificationOneOf {
      /** Options for preparation time. Required when `type` is `MAX_TIME`. */
      maxTimeOptions?: TimeDuration;
      /** Options for preparation time. Required when `type` is `TIME_RANGE`. */
      timeRangeOptions?: TimeDurationRange;
  }
  /** Preparation time type enum. */
  enum PreparationTimePreparationTimeType {
      UNKNOWN_PREPARATION_TIME = "UNKNOWN_PREPARATION_TIME",
      MAX_TIME = "MAX_TIME",
      TIME_RANGE = "TIME_RANGE"
  }
  enum AsapFutureHandlingType {
      /** Unknown asap future handling type. */
      UNKNOWN_ASAP_FUTURE_HANDLING = "UNKNOWN_ASAP_FUTURE_HANDLING",
      /** No future handling. */
      NO_FUTURE_HANDLING = "NO_FUTURE_HANDLING",
      /** Allows future orders for up to a specified number of business days ahead. */
      BUSINESS_DAYS_AHEAD_HANDLING = "BUSINESS_DAYS_AHEAD_HANDLING"
  }
  interface BusinessDaysAheadHandling {
      /**
       * Number of business days ahead for which orders can be scheduled. <br />
       * Setting the `daysCount` to 0 means that orders can be scheduled until the end of the current business day.
       */
      daysCount?: number | null;
  }
  interface Location {
      /**
       * Location Id.
       * @internal
       */
      _id?: string | null;
      /**
       * Location Name.
       * @internal
       * @readonly
       */
      name?: string | null;
      /**
       * Whether this operation's location is archived. This has no impact on API behavior, but it can be used to indicate whether this operation's location is active or inactive.
       * @internal
       * @readonly
       */
      archived?: boolean | null;
  }
  interface InvalidateCache$1 extends InvalidateCacheGetByOneOf$1 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$1;
      /** Invalidate by page id */
      page?: Page$1;
      /** Invalidate by URI path */
      uri?: URI$1;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$1;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf$1 {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App$1;
      /** Invalidate by page id */
      page?: Page$1;
      /** Invalidate by URI path */
      uri?: URI$1;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File$1;
  }
  interface App$1 {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page$1 {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI$1 {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File$1 {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface DeliveryProfileConfiguredForOperation {
      /** Operation */
      operation?: Operation$1;
  }
  interface OperationsDataCloningCompleted {
  }
  interface CreateOperationRequest {
      /** Operation to create. */
      operation: Operation$1;
  }
  interface CreateOperationResponse {
      /** Created operation. */
      operation?: Operation$1;
  }
  interface GetOperationRequest {
      /** ID of the operation to retrieve. */
      operationId: string;
  }
  interface GetOperationResponse {
      /** Retrieved operation. */
      operation?: Operation$1;
  }
  interface UpdateOperationRequest {
      /** Operation to update. */
      operation: Operation$1;
      /**
       * Field mask of the fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface UpdateOperationResponse {
      /** Updated operation. */
      operation?: Operation$1;
  }
  interface DeleteOperationRequest {
      /** ID of the operation to delete. */
      operationId: string;
  }
  interface DeleteOperationResponse {
  }
  interface QueryOperationRequest {
      /** Query options. */
      query: CursorQuery$3;
  }
  interface CursorQuery$3 extends CursorQueryPagingMethodOneOf$3 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$2;
      /**
       * Filter object.
       * See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language)
       * for more information.
       *
       * For a detailed list of supported filters, see
       * [Supported Filters](https://dev.wix.com/docs/rest/api-reference/wix-restaurants/operations/operations/supported-filters-and-sorting).
       */
      filter?: Record<string, any> | null;
      /** Sort object. */
      sort?: Sorting$3[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$3 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$2;
  }
  interface Sorting$3 {
      /**
       * Supported properties:
       * - `id`
       * - `createdDate`
       * - `updatedDate`
       * - `name`
       */
      fieldName?: string;
      /**
       * Sort order. Use `ASC` for ascending order or `DESC` for descending order. <br />
       *
       * Default: `ASC`
       */
      order?: SortOrder$3;
  }
  enum SortOrder$3 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$2 {
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
  interface QueryOperationResponse {
      /** Retrieved operations. */
      operations?: Operation$1[];
      /** Metadata of the paginated results. */
      pagingMetadata?: CursorPagingMetadata$2;
  }
  interface CursorPagingMetadata$2 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors$2;
      /**
       * Whether there are more pages to retrieve following the current page.
       *
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$2 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface ListOperationsRequest {
  }
  interface ListOperationsResponse {
      /** Retrieved operations. */
      operations?: Operation$1[];
  }
  interface ListOperationIdsRequest {
      /** metasite id */
      metasiteId: string;
  }
  interface ListOperationIdsResponse {
      /** List of operation ids */
      operationIds?: string[];
  }
  interface ListAvailableFulfillmentOptionsRequest {
      /** Operation ID. Returned fulfillment options will belong to this operation. */
      operationId: string;
      /**
       * Delivery address. Optional.
       *
       * If provided, the returned delivery fulfillment options will be able to deliver to this address.
       */
      deliveryAddress?: CommonAddress$1;
  }
  /** Physical address */
  interface CommonAddress$1 extends CommonAddressStreetOneOf$1 {
      /** Street name and number. */
      streetAddress?: StreetAddress$1;
      /** Main address line, usually street and number as free text. */
      addressLine1?: string | null;
      /** Country code. */
      country?: string | null;
      /** Subdivision. Usually a state, region, prefecture, or province code, according to [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2). */
      subdivision?: string | null;
      /** City name. */
      city?: string | null;
      /** Zip/postal code. */
      postalCode?: string | null;
      /** Free text providing more detailed address info. Usually contains Apt, Suite, and Floor. */
      addressLine2?: string | null;
      /**
       * A string containing the full address of this location.
       * @internal
       */
      formatted?: string | null;
      /**
       * Coordinates of the physical address.
       * @internal
       */
      location?: AddressLocation$1;
      /**
       * Country full name.
       * @internal
       */
      countryFullname?: string | null;
      /**
       * Subdivision full name.
       * @internal
       */
      subdivisionFullname?: string | null;
      /**
       * Multi-level subdivisions from top to bottom.
       * @internal
       */
      subdivisions?: Subdivision$1[];
  }
  /** @oneof */
  interface CommonAddressStreetOneOf$1 {
      /** Street name and number. */
      streetAddress?: StreetAddress$1;
      /** Main address line, usually street and number as free text. */
      addressLine?: string | null;
  }
  interface StreetAddress$1 {
      /** Street number. */
      number?: string;
      /** Street name. */
      name?: string;
      /**
       * Apartment number.
       * @internal
       */
      apt?: string;
      /**
       * Optional address line 1
       * @internal
       */
      formattedAddressLine?: string | null;
  }
  interface AddressLocation$1 {
      /** Address latitude. */
      latitude?: number | null;
      /** Address longitude. */
      longitude?: number | null;
  }
  interface Subdivision$1 {
      /** Short subdivision code. */
      code?: string;
      /** Subdivision full name. */
      name?: string;
      /**
       * Subdivision level
       * @internal
       */
      type?: SubdivisionType$1;
      /**
       * Free text description of subdivision type.
       * @internal
       */
      typeInfo?: string | null;
  }
  enum SubdivisionType$1 {
      UNKNOWN_SUBDIVISION_TYPE = "UNKNOWN_SUBDIVISION_TYPE",
      /** State */
      ADMINISTRATIVE_AREA_LEVEL_1 = "ADMINISTRATIVE_AREA_LEVEL_1",
      /** County */
      ADMINISTRATIVE_AREA_LEVEL_2 = "ADMINISTRATIVE_AREA_LEVEL_2",
      /** City/town */
      ADMINISTRATIVE_AREA_LEVEL_3 = "ADMINISTRATIVE_AREA_LEVEL_3",
      /** Neighborhood/quarter */
      ADMINISTRATIVE_AREA_LEVEL_4 = "ADMINISTRATIVE_AREA_LEVEL_4",
      /** Street/block */
      ADMINISTRATIVE_AREA_LEVEL_5 = "ADMINISTRATIVE_AREA_LEVEL_5",
      /** ADMINISTRATIVE_AREA_LEVEL_0. Indicates the national political entity, and is typically the highest order type returned by the Geocoder. */
      COUNTRY = "COUNTRY"
  }
  interface ListAvailableFulfillmentOptionsResponse {
      /** Whether pickup fulfillment method is configured for the requested operation. */
      pickupConfigured?: boolean;
      /** Whether delivery fulfillment method is configured for the requested operation. */
      deliveryConfigured?: boolean;
      /** List of the available fulfillment options. */
      fulfillmentOptions?: FulfillmentOption[];
      /** Whether availability exceptions block the fulfillment options. */
      blockedByAvailabilityExceptions?: boolean | null;
  }
  /** Fulfillment method that is currently available to fulfill orders, given its availability and the operation's scheduling configurations. */
  interface FulfillmentOption extends FulfillmentOptionFulfillmentTimeOptionsOneOf, FulfillmentOptionFulfillmentTimesDisplayOptionsOneOf, FulfillmentOptionFulfillmentTypeOptionsOneOf {
      /** Fulfillment time has a maximum time. */
      maxTimeOptions?: number;
      /** Fulfillment time is limited by a range. */
      durationRangeOptions?: DurationRange;
      /** Options for fulfillment time. Required when `type` is `TIME_WINDOWS`. */
      timeWindowsOptions?: TimeWindowDisplayConfig;
      /** Information about pickup fulfillment types. */
      pickupOptions?: PickupDetails;
      /** Information about delivery fulfillment types. */
      deliveryOptions?: DeliveryDetails;
      /** Fulfillment method ID. */
      _id?: string | null;
      /** Fulfillment option type. */
      type?: FulfillmentType;
      /** Minimum order price to qualify for the fulfillment option. */
      minOrderPrice?: string | null;
      /** Fee for using the fulfillment option. */
      fee?: string | null;
      /** Availability of the fulfillment option. */
      availability?: FulfillmentOptionAvailability;
      /**
       * Fulfillment time type.
       * Relevant only to ASAP operations.
       */
      fulfillmentTimeType?: FulfillmentTimeType;
      /** Fulfillment times display type. Relevant to preorder operations. */
      fulfillmentTimesDisplayType?: FulfillmentTimesDisplayType;
      /**
       * Minimum order price for free fulfillment.
       * If order price exceeds this amount, the given `fee` is waived.
       */
      freeFulfillmentPriceThreshold?: string | null;
      /** Instructions for the fulfillment. */
      instructions?: string | null;
  }
  /** @oneof */
  interface FulfillmentOptionFulfillmentTimeOptionsOneOf {
      /** Fulfillment time has a maximum time. */
      maxTimeOptions?: number;
      /** Fulfillment time is limited by a range. */
      durationRangeOptions?: DurationRange;
  }
  /** @oneof */
  interface FulfillmentOptionFulfillmentTimesDisplayOptionsOneOf {
      /** Options for fulfillment time. Required when `type` is `TIME_WINDOWS`. */
      timeWindowsOptions?: TimeWindowDisplayConfig;
  }
  /** @oneof */
  interface FulfillmentOptionFulfillmentTypeOptionsOneOf {
      /** Information about pickup fulfillment types. */
      pickupOptions?: PickupDetails;
      /** Information about delivery fulfillment types. */
      deliveryOptions?: DeliveryDetails;
  }
  /** Availability of the fulfillment option. */
  interface FulfillmentOptionAvailability {
      /** Date and time at which the fulfillment option's availability starts. */
      startTime?: Date | null;
      /** Date and time at which the fulfillment option's availability ends. */
      endTime?: Date | null;
      /**
       * List of available times for the days of the week.
       * All the specified times must be within the range between `startTime` and `endTime`.
       */
      availableTimes?: DayOfWeekAvailability$1[];
      /** List of availability exceptions that override the availability defined in `availableTimes`. */
      exceptions?: AvailabilityException$1[];
      /** Timezone for which the available times are given. */
      timeZone?: string | null;
      /** Whether it's possible to submit an order for as soon as possible handling. */
      asapHandlingAvailable?: boolean;
      /** Whether it's possible to submit an order for future handling. */
      futureHandlingAvailable?: boolean | null;
  }
  interface DayOfWeekAvailability$1 {
      /** The day of week this availability relates to. */
      dayOfWeek?: EntitiesDayOfWeek$1;
      /** A list of time ranges during which the fulfillment should be available. */
      timeRanges?: TimeOfDayRange$1[];
  }
  interface TimeOfDayRange$1 {
      /** The start time in time of day representation. */
      startTime?: TimeOfDay$1;
      /** The end time in time of day representation. */
      endTime?: TimeOfDay$1;
  }
  interface AvailabilityException$1 {
      /** The start time of the availability exception. */
      startTime?: Date | null;
      /** The end time of the availability exception. */
      endTime?: Date | null;
      /** An indication whether the exception makes the [`start_time`, `end_time`] range available. */
      available?: boolean;
      /** The reason for the exception. */
      reason?: string | null;
  }
  /** Fulfillment time type enum. */
  enum FulfillmentTimeType {
      /** Undefined fulfillment time type. */
      UNDEFINED_FULFILLMENT_TIME = "UNDEFINED_FULFILLMENT_TIME",
      /** Fulfillment time has a maximum. */
      MAX_TIME = "MAX_TIME",
      /** Fulfillment time has a minimum and a maximum. */
      DURATION_RANGE = "DURATION_RANGE"
  }
  /** Duration range. */
  interface DurationRange {
      /** Minimum duration in minutes. */
      minDuration?: number;
      /** Maximum duration in minutes. */
      maxDuration?: number;
  }
  /** Fulfillment times display type enum. */
  enum FulfillmentTimesDisplayType {
      /** Undefined fulfillment times display type. */
      UNDEFINED_FULFILLMENT_TIMES_DISPLAY = "UNDEFINED_FULFILLMENT_TIMES_DISPLAY",
      /** Fulfillment times are displayed as a list of time windows. */
      TIME_WINDOWS = "TIME_WINDOWS"
  }
  /** Time window. */
  interface TimeWindowDisplayConfig {
      /** Time window duration in minutes. */
      durationInMinutes?: number;
  }
  /** Information about pickup fulfillment types. */
  interface PickupDetails {
      /** Pickup address. This is the restaurant's address. */
      address?: CommonAddress$1;
  }
  /** Information about delivery fulfillment types. */
  interface DeliveryDetails {
      /** Delivery provider app id. */
      deliveryProviderAppId?: string | null;
      /** Pickup instructions for couriers. */
      courierPickupInstructions?: string | null;
  }
  interface ListFirstAvailableTimeSlotForFulfillmentTypesRequest {
      /**
       * Operation ID.
       * Returned fulfillment options will belong to this operation.
       */
      operationId: string;
      /**
       * Delivery address. Optional.
       *
       * If provided, the returned delivery fulfillment options will be able to deliver to this address.
       */
      deliveryAddress?: CommonAddress$1;
  }
  interface ListFirstAvailableTimeSlotForFulfillmentTypesResponse {
      /**
       * List of available time slots for each fulfillment type.
       *
       * Each time slot is the first available time slot for the given fulfillment type.
       * A delivery fulfillment type is returned only if the delivery address is provided.
       */
      timeSlots?: FulfillmentTimeSlot[];
  }
  interface FulfillmentTimeSlot {
      /** Start time and date of the time slot. */
      startTime?: Date | null;
      /** End time and date of the time slot. */
      endTime?: Date | null;
      /** Type of the fulfillment. */
      fulfilmentType?: FulfillmentType;
      /** Whether the time slot starts now. */
      startsNow?: boolean;
      /** Details for each fulfillment option of the time slot. */
      fulfillmentDetails?: FulfillmentDetails[];
      /** Address of the fulfillment. */
      fulfillmentAddress?: FulfillmentAddress;
  }
  /** Details about the fulfillment option. */
  interface FulfillmentDetails extends FulfillmentDetailsFulfillmentTimeOptionsOneOf {
      /** Fulfillment time has a maximum. */
      maxTimeOptions?: number;
      /** Fulfillment time has a minimum and a maximum. */
      durationRangeOptions?: DurationRange;
      /** Fee for using this fulfillment. */
      fee?: string | null;
      /** Minimum order price to qualify for using this fulfillment. */
      minOrderPrice?: string | null;
      /** Fulfillment time type. Only be relevant to ASAP operations. */
      fulfillmentTimeType?: FulfillmentTimeType;
      /**
       * Minimum order price for free fulfillment.
       * If order price exceeds this amount, the given `fee` is waived.
       */
      freeFulfillmentPriceThreshold?: string | null;
  }
  /** @oneof */
  interface FulfillmentDetailsFulfillmentTimeOptionsOneOf {
      /** Fulfillment time has a maximum. */
      maxTimeOptions?: number;
      /** Fulfillment time has a minimum and a maximum. */
      durationRangeOptions?: DurationRange;
  }
  /**
   * Details on the address of the fulfillment.
   * For pickup it will the address to take the order from.
   * For delivery it will be the address to deliver the order to.
   */
  interface FulfillmentAddress {
      /** Pickup address. This is the address of the restaurant. */
      address?: CommonAddress$1;
  }
  interface ListFirstAvailableTimeSlotsForMenusRequest {
      /**
       * Operation ID.
       * Returned timeslots that are belong to this operation.
       */
      operationId: string | null;
      /**
       * Delivery address. Optional.
       *
       * If provided, the returned delivery fulfillment options will be able to deliver to this address.
       */
      deliveryAddress?: CommonAddress$1;
      /** Cursor paging */
      cursorPaging?: CursorPaging$2;
  }
  interface ListFirstAvailableTimeSlotsForMenusResponse {
      /**
       * List of available time slots for each menu.
       * For each menu will be returned the first available time slot for each fulfillment type.
       */
      timeSlotsPerMenu?: FirstFulfillmentTimeSlotsPerMenu[];
      /** Cursor to next request. */
      cursor?: string | null;
  }
  interface FirstFulfillmentTimeSlotsPerMenu {
      /** Menu ID. */
      menuId?: string | null;
      /** List of available time slots for each fulfillment type. */
      timeslotsPerFulfillmentType?: FulfillmentTimeSlot[];
  }
  interface ListAvailableTimeSlotsForDateRequest {
      /**
       * Operation ID.
       * The returned fulfillment options will belong to this operation.
       */
      operationId: string;
      /**
       * Delivery address. Optional.
       *
       * If provided, the returned delivery fulfillment options will be able to deliver to this address.
       */
      deliveryAddress?: CommonAddress$1;
      /** Date and time to get the available time slots for. */
      date: _Date;
  }
  interface _Date {
      /** The day of the month. */
      day?: number;
      /** The month of the year. */
      month?: number;
      /** The year of the date. */
      year?: number;
  }
  interface ListAvailableTimeSlotsForDateResponse {
      /** Lst of the available time slots in the requested date. */
      timeSlots?: FulfillmentTimeSlot[];
  }
  interface ListAvailableDatesInRangeRequest {
      /**
       * Operation ID.
       * The returned fulfillment options will belong to this operation.
       */
      operationId: string;
      /**
       * Delivery address. Optional.
       *
       * If provided, the returned delivery fulfillment options will be able to deliver to this address.
       */
      deliveryAddress?: CommonAddress$1;
      /** Start date and time of the range. */
      from: _Date;
      /** End date and time of the range. */
      until: _Date;
  }
  interface ListAvailableDatesInRangeResponse {
      /** List of the available dates in descending order for each fulfillment type. */
      availableDates?: FulfillmentTypeAvailableDates[];
  }
  /** Available dates for a given fulfillment type. */
  interface FulfillmentTypeAvailableDates {
      /** Type of the fulfillment. */
      fulfilmentType?: FulfillmentType;
      /** List of the available dates in descending order. */
      dates?: _Date[];
  }
  interface GetExpectedFulfillmentSelectionRequest {
      /** Operation ID. The returned fulfillment will belong to this operation. */
      operationId: string;
      /**
       * Delivery address. Optional.
       *
       * If provided, the returned delivery fulfillment options will be able to deliver to this address.
       */
      deliveryAddress?: CommonAddress$1;
      /** Start time and date of the time slot. */
      timeslotStartTime?: Date | null;
      /** End time and date of the time slot. */
      timeslotEndTime?: Date | null;
      /** Type of fulfillment. */
      fulfilmentType: FulfillmentType;
      /** Whether it is possible to submit an order to be prepared asap. */
      canSubmitOrderForNow?: boolean | null;
  }
  interface GetExpectedFulfillmentSelectionResponse {
      /** Expected fulfillment option. */
      expectedFulfillmentSelections?: FulfillmentOption[];
  }
  interface DomainEvent$4 extends DomainEventBodyOneOf$4 {
      createdEvent?: EntityCreatedEvent$4;
      updatedEvent?: EntityUpdatedEvent$4;
      deletedEvent?: EntityDeletedEvent$4;
      actionEvent?: ActionEvent$4;
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
  interface DomainEventBodyOneOf$4 {
      createdEvent?: EntityCreatedEvent$4;
      updatedEvent?: EntityUpdatedEvent$4;
      deletedEvent?: EntityDeletedEvent$4;
      actionEvent?: ActionEvent$4;
  }
  interface EntityCreatedEvent$4 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$4;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$4 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$4 {
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
  interface EntityDeletedEvent$4 {
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
  interface ActionEvent$4 {
      bodyAsJson?: string;
  }
  interface Empty$3 {
  }
  /** Encapsulates all details written to the Greyhound topic when a site's properties are updated. */
  interface SitePropertiesNotification$1 {
      /** The site ID for which this update notification applies. */
      metasiteId?: string;
      /** The actual update event. */
      event?: SitePropertiesEvent$1;
      /** A convenience set of mappings from the MetaSite ID to its constituent services. */
      translations?: Translation$1[];
      /** Context of the notification */
      changeContext?: ChangeContext$1;
  }
  /** The actual update event for a particular notification. */
  interface SitePropertiesEvent$1 {
      /** Version of the site's properties represented by this update. */
      version?: number;
      /**
       * Set of properties that were updated - corresponds to the fields in "properties".
       * @internal
       */
      fields?: string[];
      /** Updated properties. */
      properties?: Properties$1;
  }
  interface Properties$1 {
      /** Site categories. */
      categories?: Categories$1;
      /** Site locale. */
      locale?: Locale$2;
      /**
       * Site language.
       *
       * Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format.
       */
      language?: string | null;
      /**
       * Site currency format used to bill customers.
       *
       * Three-letter currency code in [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
       */
      paymentCurrency?: string | null;
      /** Timezone in `America/New_York` format. */
      timeZone?: string | null;
      /** Email address. */
      email?: string | null;
      /** Phone number. */
      phone?: string | null;
      /** Fax number. */
      fax?: string | null;
      /** Address. */
      address?: Address$1;
      /** Site display name. */
      siteDisplayName?: string | null;
      /** Business name. */
      businessName?: string | null;
      /** Path to the site's logo in Wix Media (without Wix Media base URL). */
      logo?: string | null;
      /** Site description. */
      description?: string | null;
      /**
       * Business schedule. Regular and exceptional time periods when the business is open or the service is available.
       *
       * __Note:__ Not supported by Wix Bookings.
       */
      businessSchedule?: BusinessSchedule$1;
      /** Supported languages of a site and the primary language. */
      multilingual?: Multilingual$1;
      /** Cookie policy the Wix user defined for their site (before the site visitor interacts with/limits it). */
      consentPolicy?: ConsentPolicy$1;
      /**
       * Supported values: `FITNESS SERVICE`, `RESTAURANT`, `BLOG`, `STORE`, `EVENT`, `UNKNOWN`.
       *
       * Site business type.
       */
      businessConfig?: string | null;
      /** External site URL that uses Wix as its headless business solution. */
      externalSiteUrl?: string | null;
      /** Track clicks analytics. */
      trackClicksAnalytics?: boolean;
  }
  interface Categories$1 {
      /** Primary site category. */
      primary?: string;
      /** Secondary site category. */
      secondary?: string[];
      /** Business Term Id */
      businessTermId?: string | null;
  }
  interface Locale$2 {
      /** Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. */
      languageCode?: string;
      /** Two-letter country code in [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) format. */
      country?: string;
  }
  interface Address$1 {
      /** Street name. */
      street?: string;
      /** City name. */
      city?: string;
      /** Two-letter country code in an [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. */
      country?: string;
      /** State. */
      state?: string;
      /** Zip or postal code. */
      zip?: string;
      /** Extra information to be displayed in the address. */
      hint?: AddressHint$1;
      /** Whether this address represents a physical location. */
      isPhysical?: boolean;
      /** Google-formatted version of this address. */
      googleFormattedAddress?: string;
      /** Street number. */
      streetNumber?: string;
      /** Apartment number. */
      apartmentNumber?: string;
      /** Geographic coordinates of location. */
      coordinates?: GeoCoordinates$1;
  }
  /**
   * Extra information on displayed addresses.
   * This is used for display purposes. Used to add additional data about the address, such as "In the passage".
   * Free text. In addition, the user can state where to display the additional description - before, after, or instead of the address string.
   */
  interface AddressHint$1 {
      /** Extra text displayed next to, or instead of, the actual address. */
      text?: string;
      /** Where the extra text should be displayed. */
      placement?: PlacementType$1;
  }
  /** Where the extra text should be displayed: before, after or instead of the actual address. */
  enum PlacementType$1 {
      BEFORE = "BEFORE",
      AFTER = "AFTER",
      REPLACE = "REPLACE"
  }
  /** Geocoordinates for a particular address. */
  interface GeoCoordinates$1 {
      /** Latitude of the location. Must be between -90 and 90. */
      latitude?: number;
      /** Longitude of the location. Must be between -180 and 180. */
      longitude?: number;
  }
  /** Business schedule. Regular and exceptional time periods when the business is open or the service is available. */
  interface BusinessSchedule$1 {
      /** Weekly recurring time periods when the business is regularly open or the service is available. Limited to 100 time periods. */
      periods?: TimePeriod$1[];
      /** Exceptions to the business's regular hours. The business can be open or closed during the exception. */
      specialHourPeriod?: SpecialHourPeriod$1[];
  }
  /** Weekly recurring time periods when the business is regularly open or the service is available. */
  interface TimePeriod$1 {
      /** Day of the week the period starts on. */
      openDay?: DayOfWeek$1;
      /**
       * Time the period starts in 24-hour [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) extended format. Valid values are `00:00` to `24:00`, where `24:00` represents
       * midnight at the end of the specified day.
       */
      openTime?: string;
      /** Day of the week the period ends on. */
      closeDay?: DayOfWeek$1;
      /**
       * Time the period ends in 24-hour [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) extended format. Valid values are `00:00` to `24:00`, where `24:00` represents
       * midnight at the end of the specified day.
       *
       * __Note:__ If `openDay` and `closeDay` specify the same day of the week `closeTime` must be later than `openTime`.
       */
      closeTime?: string;
  }
  /** Enumerates the days of the week. */
  enum DayOfWeek$1 {
      MONDAY = "MONDAY",
      TUESDAY = "TUESDAY",
      WEDNESDAY = "WEDNESDAY",
      THURSDAY = "THURSDAY",
      FRIDAY = "FRIDAY",
      SATURDAY = "SATURDAY",
      SUNDAY = "SUNDAY"
  }
  /** Exception to the business's regular hours. The business can be open or closed during the exception. */
  interface SpecialHourPeriod$1 {
      /** Start date and time of the exception in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format and [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time). */
      startDate?: string;
      /** End date and time of the exception in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format and [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time). */
      endDate?: string;
      /**
       * Whether the business is closed (or the service is not available) during the exception.
       *
       * Default: `true`.
       */
      isClosed?: boolean;
      /** Additional info about the exception. For example, "We close earlier on New Year's Eve." */
      comment?: string;
  }
  interface Multilingual$1 {
      /** Supported languages list. */
      supportedLanguages?: SupportedLanguage$1[];
      /** Whether to redirect to user language. */
      autoRedirect?: boolean;
  }
  interface SupportedLanguage$1 {
      /** Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. */
      languageCode?: string;
      /** Locale. */
      locale?: Locale$2;
      /** Whether the supported language is the primary language for the site. */
      isPrimary?: boolean;
      /** Language icon. */
      countryCode?: string;
      /** How the language will be resolved. For internal use. */
      resolutionMethod?: ResolutionMethod$1;
  }
  enum ResolutionMethod$1 {
      QUERY_PARAM = "QUERY_PARAM",
      SUBDOMAIN = "SUBDOMAIN",
      SUBDIRECTORY = "SUBDIRECTORY"
  }
  interface ConsentPolicy$1 {
      /** Whether the site uses cookies that are essential to site operation. */
      essential?: boolean | null;
      /** Whether the site uses cookies that affect site performance and other functional measurements. */
      functional?: boolean | null;
      /** Whether the site uses cookies that collect analytics about how the site is used (in order to improve it). */
      analytics?: boolean | null;
      /** Whether the site uses cookies that collect information allowing better customization of the experience for a current visitor. */
      advertising?: boolean | null;
      /** CCPA compliance flag. */
      dataToThirdParty?: boolean | null;
  }
  /** A single mapping from the MetaSite ID to a particular service. */
  interface Translation$1 {
      /** The service type. */
      serviceType?: string;
      /** The application definition ID; this only applies to services of type ThirdPartyApps. */
      appDefId?: string;
      /** The instance ID of the service. */
      instanceId?: string;
  }
  interface ChangeContext$1 extends ChangeContextPayloadOneOf$1 {
      /** Properties were updated. */
      propertiesChange?: PropertiesChange$1;
      /** Default properties were created on site creation. */
      siteCreated?: SiteCreated$1;
      /** Properties were cloned on site cloning. */
      siteCloned?: SiteCloned$1;
  }
  /** @oneof */
  interface ChangeContextPayloadOneOf$1 {
      /** Properties were updated. */
      propertiesChange?: PropertiesChange$1;
      /** Default properties were created on site creation. */
      siteCreated?: SiteCreated$1;
      /** Properties were cloned on site cloning. */
      siteCloned?: SiteCloned$1;
  }
  interface PropertiesChange$1 {
  }
  interface SiteCreated$1 {
      /** Origin template site id. */
      originTemplateId?: string | null;
  }
  interface SiteCloned$1 {
      /** Origin site id. */
      originMetaSiteId?: string;
  }
  interface MessageEnvelope$4 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$4;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$4 extends IdentificationDataIdOneOf$4 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$4;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$4 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$4 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Creates a new operation.
   * @param operation - Operation to create.
   * @public
   * @documentationMaturity preview
   * @requiredField operation
   * @permissionId RESTAURANTS.OPERATION_CREATE
   * @adminMethod
   * @returns Created operation.
   */
  function createOperation(operation: Operation$1): Promise<Operation$1>;
  /**
   * Retrieves an operation.
   * @param operationId - ID of the operation to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField operationId
   * @permissionId RESTAURANTS.OPERATION_READ
   * @returns Retrieved operation.
   */
  function getOperation(operationId: string): Promise<Operation$1>;
  /**
   * Updates an operation.
   *
   * If you update part of the `orderScheduling` property, the whole object is overwritten,
   * so you must include the entire object unless you are not updating `orderScheduling` at all. <br />
   *
   * Each time the operation is updated,
   * `revision` increments by 1.
   * The current `revision` must be passed when updating the operation.
   * This ensures you're working with the latest operation
   * and prevents unintended overwrites.
   * @param _id - Operation ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField operation
   * @requiredField operation.revision
   * @permissionId RESTAURANTS.OPERATION_UPDATE
   * @adminMethod
   * @returns Updated operation.
   */
  function updateOperation(_id: string | null, operation: UpdateOperation, options?: UpdateOperationOptions): Promise<Operation$1>;
  interface UpdateOperation {
      /** Options for online ordering status. Required when `onlineOrderingStatus` is `PAUSED_UNTIL`. */
      pausedUntilOptions?: OnlineOrderingPausedUntilOptions;
      /**
       * Operation ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number. Increments by 1 each time the operation is updated.
       * To prevent conflicting changes,
       * the existing `revision` must be specified when updating an operation.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the operation was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the operation was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Operation name. */
      name?: string | null;
      /**
       * Currently INTERNAL. Whether the operation is enabled.
       * @internal
       */
      enabled?: boolean | null;
      /**
       * The scheduling data for this operation.
       * Scheduling specifies when an order can be placed for.
       * @internal
       * @deprecated
       * @replacedBy order_scheduling
       * @targetRemovalDate 2024-03-04
       */
      scheduling?: Scheduling;
      /**
       * INTERNAL. Profile ID associated with the operation.
       * @internal
       */
      profileId?: string | null;
      /**
       * Whether the operation is the default operation. <br />
       * Default: `false`.
       */
      default?: boolean | null;
      /** IDs of the fulfillment methods ([SDK](https://dev.wix.com/docs/sdk/backend-modules/restaurants/wix-restaurants-new/fulfillment-methods/introduction) | [REST](https://dev.wix.com/docs/rest/api-reference/wix-restaurants/fulfillment-methods/introduction)) associated with the operation. */
      fulfillmentIds?: string[] | null;
      /**
       * IDs of the service fee rules ([SDK](https://dev.wix.com/docs/sdk/backend-modules/restaurants/service-fees/introduction) | [REST](https://dev.wix.com/docs/rest/api-reference/wix-restaurants/service-fees/introduction)) associated with the operation.
       * @internal
       * @deprecated
       * @replacedBy service_fee_rule_ids
       * @targetRemovalDate 2024-02-04
       */
      serviceFeeRulesIds?: string[] | null;
      /** Online ordering status of the operation. <br /> */
      onlineOrderingStatus?: OnlineOrderingStatusType;
      /**
       * IDs of the service fee rules ([SDK](https://dev.wix.com/docs/sdk/backend-modules/restaurants/service-fees/introduction) | [REST](https://dev.wix.com/docs/rest/api-reference/wix-restaurants/service-fees/introduction)) associated with the operation.
       * @deprecated
       * @targetRemovalDate 2024-11-30
       */
      serviceFeeRuleIds?: string[] | null;
      /** Default fulfillment type of the operation. */
      defaultFulfillmentType?: FulfillmentType;
      /** Information about when an order can be placed for. */
      orderScheduling?: OrderScheduling;
      /**
       * ID of the operation group this operation belongs to.
       * @internal
       */
      operationGroupId?: string | null;
      /**
       * Details of this operation's location.
       * @internal
       */
      location?: Location;
  }
  interface UpdateOperationOptions {
      /**
       * Field mask of the fields to update.
       * @internal
       */
      mask?: string[];
  }
  /**
   * Deletes an operation.
   * @param operationId - ID of the operation to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField operationId
   * @permissionId RESTAURANTS.OPERATION_DELETE
   * @adminMethod
   */
  function deleteOperation(operationId: string): Promise<void>;
  /**
   * Creates a query to retrieve a list of operations.
   *
   * The `queryOperations()` function builds a query to retrieve a list of operations and returns an `OperationsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is used to run the query using the [`find()`](/operations/operations-query-builder/find) function.
   *
   * You can refine the query by chaining `OperationsQueryBuilder` functions onto the query. `OperationsQueryBuilder` functions enable you to filter, sort, and control the results that `queryOperations()` returns.
   *
   * `queryOperations()` runs with the following `OperationsQueryBuilder` defaults, which you can override:
   *
   * * [`limit(50)`](/operations/operations-query-builder/limit)
   * * [`ascending('entityId')`](/operations/operations-methods-query-builder/ascending)
   *
   * The following `OperationsQueryBuilder` functions are supported for `queryOperations()`. For a full description of the operations object, see the object returned for the [`items`](/operations/operations-query-result/items) property in `OperationsQueryResult`.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.OPERATION_READ
   */
  function queryOperation(): OperationsQueryBuilder;
  interface QueryCursorResult$3 {
      cursors: Cursors$2;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface OperationsQueryResult extends QueryCursorResult$3 {
      items: Operation$1[];
      query: OperationsQueryBuilder;
      next: () => Promise<OperationsQueryResult>;
      prev: () => Promise<OperationsQueryResult>;
  }
  interface OperationsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name' | 'default' | 'fulfillmentIds' | 'onlineOrderingStatus' | 'serviceFeeRuleIds' | 'defaultFulfillmentType', value: any) => OperationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name' | 'default' | 'fulfillmentIds' | 'onlineOrderingStatus' | 'serviceFeeRuleIds' | 'defaultFulfillmentType', value: any) => OperationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => OperationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => OperationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => OperationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => OperationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'name', value: string) => OperationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name' | 'default' | 'fulfillmentIds' | 'onlineOrderingStatus' | 'serviceFeeRuleIds' | 'defaultFulfillmentType', value: any[]) => OperationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasAll: (propertyName: 'fulfillmentIds' | 'serviceFeeRuleIds', value: any[]) => OperationsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name' | 'default' | 'fulfillmentIds' | 'onlineOrderingStatus' | 'serviceFeeRuleIds' | 'defaultFulfillmentType', value: any) => OperationsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'name' | 'default' | 'fulfillmentIds' | 'onlineOrderingStatus' | 'serviceFeeRuleIds' | 'defaultFulfillmentType', value: boolean) => OperationsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | '_createdDate' | '_updatedDate' | 'name' | 'profileId' | 'default' | 'fulfillmentIds' | 'onlineOrderingStatus' | 'serviceFeeRuleIds' | 'defaultFulfillmentType'>) => OperationsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | '_createdDate' | '_updatedDate' | 'name' | 'profileId' | 'default' | 'fulfillmentIds' | 'onlineOrderingStatus' | 'serviceFeeRuleIds' | 'defaultFulfillmentType'>) => OperationsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => OperationsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => OperationsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<OperationsQueryResult>;
  }
  /**
   * Retrieves a list of operations.
   * The result will be sorted by created date in ascending order.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.OPERATION_READ
   */
  function listOperations(): Promise<ListOperationsResponse>;
  /** @param metasiteId - metasite id
   * @internal
   * @documentationMaturity preview
   * @requiredField metasiteId
   * @adminMethod
   */
  function listOperationIds(metasiteId: string): Promise<ListOperationIdsResponse>;
  /**
   * Retrieves a list of available fulfillment options.
   *
   * What makes a fulfillment option available is whether you can submit an order given the scheduling configurations and the fulfillment method's availability.
   * When a delivery address is not provided in the input, our system retrieves a list encompassing all types of fulfillment methods.
   * Conversely, if a delivery address` is given, the response may includes non-delivery fulfillment options along with delivery fulfillment methods that are applicable to the given address, ensuring the address falls within the defined delivery area of these methods.
   * @param operationId - Operation ID. Returned fulfillment options will belong to this operation.
   * @public
   * @documentationMaturity preview
   * @requiredField operationId
   * @permissionId RESTAURANTS.OPERATION_READ
   */
  function listAvailableFulfillmentOptions(operationId: string, options?: ListAvailableFulfillmentOptions): Promise<ListAvailableFulfillmentOptionsResponse>;
  interface ListAvailableFulfillmentOptions {
      /**
       * Delivery address. Optional.
       *
       * If provided, the returned delivery fulfillment options will be able to deliver to this address.
       */
      deliveryAddress?: CommonAddress$1;
  }
  /**
   * Retrieves a list of available time slots for each fulfillment type.
   *
   * Each time slot is the first available time slot for the given fulfillment type.
   * @param operationId - Operation ID.
   * Returned fulfillment options will belong to this operation.
   * @public
   * @documentationMaturity preview
   * @requiredField operationId
   * @permissionId RESTAURANTS.OPERATION_READ
   */
  function listFirstAvailableTimeSlotForFulfillmentTypes(operationId: string, options?: ListFirstAvailableTimeSlotForFulfillmentTypesOptions): Promise<ListFirstAvailableTimeSlotForFulfillmentTypesResponse>;
  interface ListFirstAvailableTimeSlotForFulfillmentTypesOptions {
      /**
       * Delivery address. Optional.
       *
       * If provided, the returned delivery fulfillment options will be able to deliver to this address.
       */
      deliveryAddress?: CommonAddress$1;
  }
  /**
   * For each menu, retrieves the first available time slots for each fulfillment type.
   * @param operationId - Operation ID.
   * Returned timeslots that are belong to this operation.
   * @public
   * @documentationMaturity preview
   * @requiredField operationId
   * @permissionId RESTAURANTS.OPERATION_READ
   */
  function listFirstAvailableTimeSlotsForMenus(operationId: string | null, options?: ListFirstAvailableTimeSlotsForMenusOptions): Promise<ListFirstAvailableTimeSlotsForMenusResponse>;
  interface ListFirstAvailableTimeSlotsForMenusOptions {
      /**
       * Delivery address. Optional.
       *
       * If provided, the returned delivery fulfillment options will be able to deliver to this address.
       */
      deliveryAddress?: CommonAddress$1;
      /** Cursor paging */
      cursorPaging?: CursorPaging$2;
  }
  /**
   * Retrieves a list of the available time slots for a given date.
   * @param operationId - Operation ID.
   * The returned fulfillment options will belong to this operation.
   * @public
   * @documentationMaturity preview
   * @requiredField operationId
   * @requiredField options.date
   * @requiredField options.date.day
   * @requiredField options.date.month
   * @requiredField options.date.year
   * @permissionId RESTAURANTS.OPERATION_READ
   */
  function listAvailableTimeSlotsForDate(operationId: string, options?: ListAvailableTimeSlotsForDateOptions): Promise<ListAvailableTimeSlotsForDateResponse>;
  interface ListAvailableTimeSlotsForDateOptions {
      /**
       * Delivery address. Optional.
       *
       * If provided, the returned delivery fulfillment options will be able to deliver to this address.
       */
      deliveryAddress?: CommonAddress$1;
      /** Date and time to get the available time slots for. */
      date: _Date;
  }
  /**
   * Retrieves a list of the available dates in a given time range.
   *
   * A date is considered available if it has at least one available time slot.
   * @param operationId - Operation ID.
   * The returned fulfillment options will belong to this operation.
   * @public
   * @documentationMaturity preview
   * @requiredField operationId
   * @requiredField options.from
   * @requiredField options.until
   * @permissionId RESTAURANTS.OPERATION_READ
   */
  function listAvailableDatesInRange(operationId: string, options?: ListAvailableDatesInRangeOptions): Promise<ListAvailableDatesInRangeResponse>;
  interface ListAvailableDatesInRangeOptions {
      /**
       * Delivery address. Optional.
       *
       * If provided, the returned delivery fulfillment options will be able to deliver to this address.
       */
      deliveryAddress?: CommonAddress$1;
      /** Start date and time of the range. */
      from: _Date;
      /** End date and time of the range. */
      until: _Date;
  }
  /**
   * Retrieves a list of the fulfillment options that will be available given the provided filters.
   *
   * TODO: probably rename, the implementation took a different direction than the name suggests
   * @param operationId - Operation ID. The returned fulfillment will belong to this operation.
   * @internal
   * @documentationMaturity preview
   * @requiredField operationId
   * @requiredField options.fulfilmentType
   * @permissionId RESTAURANTS.OPERATION_READ
   */
  function getExpectedFulfillmentSelection(operationId: string, options?: GetExpectedFulfillmentSelectionOptions): Promise<GetExpectedFulfillmentSelectionResponse>;
  interface GetExpectedFulfillmentSelectionOptions {
      /**
       * Delivery address. Optional.
       *
       * If provided, the returned delivery fulfillment options will be able to deliver to this address.
       */
      deliveryAddress?: CommonAddress$1;
      /** Start time and date of the time slot. */
      timeslotStartTime?: Date | null;
      /** End time and date of the time slot. */
      timeslotEndTime?: Date | null;
      /** Type of fulfillment. */
      fulfilmentType: FulfillmentType;
      /** Whether it is possible to submit an order to be prepared asap. */
      canSubmitOrderForNow?: boolean | null;
  }
  
  type restaurantsOperationsV1Operation_universal_d_OperationOnlineOrderingStatusOptionsOneOf = OperationOnlineOrderingStatusOptionsOneOf;
  type restaurantsOperationsV1Operation_universal_d_Scheduling = Scheduling;
  type restaurantsOperationsV1Operation_universal_d_SchedulingSchedulingOptionsOneOf = SchedulingSchedulingOptionsOneOf;
  type restaurantsOperationsV1Operation_universal_d_SchedulingType = SchedulingType;
  const restaurantsOperationsV1Operation_universal_d_SchedulingType: typeof SchedulingType;
  type restaurantsOperationsV1Operation_universal_d_AsapScheduling = AsapScheduling;
  type restaurantsOperationsV1Operation_universal_d_AsapSchedulingPreparationTimeOneOf = AsapSchedulingPreparationTimeOneOf;
  type restaurantsOperationsV1Operation_universal_d_AsapSchedulingAsapPreorderOneOf = AsapSchedulingAsapPreorderOneOf;
  type restaurantsOperationsV1Operation_universal_d_PreparationTimeType = PreparationTimeType;
  const restaurantsOperationsV1Operation_universal_d_PreparationTimeType: typeof PreparationTimeType;
  type restaurantsOperationsV1Operation_universal_d_TimeDuration = TimeDuration;
  type restaurantsOperationsV1Operation_universal_d_TimeUnit = TimeUnit;
  const restaurantsOperationsV1Operation_universal_d_TimeUnit: typeof TimeUnit;
  type restaurantsOperationsV1Operation_universal_d_TimeDurationRange = TimeDurationRange;
  type restaurantsOperationsV1Operation_universal_d_AsapPreorderType = AsapPreorderType;
  const restaurantsOperationsV1Operation_universal_d_AsapPreorderType: typeof AsapPreorderType;
  type restaurantsOperationsV1Operation_universal_d_BusinessDaysPreorder = BusinessDaysPreorder;
  type restaurantsOperationsV1Operation_universal_d_PreorderScheduling = PreorderScheduling;
  type restaurantsOperationsV1Operation_universal_d_PreorderMethod = PreorderMethod;
  type restaurantsOperationsV1Operation_universal_d_PreorderMethodMethodOptionsOneOf = PreorderMethodMethodOptionsOneOf;
  type restaurantsOperationsV1Operation_universal_d_DayAndTime = DayAndTime;
  type restaurantsOperationsV1Operation_universal_d_MethodType = MethodType;
  const restaurantsOperationsV1Operation_universal_d_MethodType: typeof MethodType;
  type restaurantsOperationsV1Operation_universal_d_TimeBounded = TimeBounded;
  type restaurantsOperationsV1Operation_universal_d_WeeklySchedule = WeeklySchedule;
  type restaurantsOperationsV1Operation_universal_d_FulfillmentTimesDisplayConfig = FulfillmentTimesDisplayConfig;
  type restaurantsOperationsV1Operation_universal_d_FulfillmentTimesDisplayConfigFulfillmentTimesDisplayOptionsOneOf = FulfillmentTimesDisplayConfigFulfillmentTimesDisplayOptionsOneOf;
  type restaurantsOperationsV1Operation_universal_d_FulfillmentTimesType = FulfillmentTimesType;
  const restaurantsOperationsV1Operation_universal_d_FulfillmentTimesType: typeof FulfillmentTimesType;
  type restaurantsOperationsV1Operation_universal_d_OnlineOrderingStatusType = OnlineOrderingStatusType;
  const restaurantsOperationsV1Operation_universal_d_OnlineOrderingStatusType: typeof OnlineOrderingStatusType;
  type restaurantsOperationsV1Operation_universal_d_OnlineOrderingPausedUntilOptions = OnlineOrderingPausedUntilOptions;
  type restaurantsOperationsV1Operation_universal_d_FulfillmentType = FulfillmentType;
  const restaurantsOperationsV1Operation_universal_d_FulfillmentType: typeof FulfillmentType;
  type restaurantsOperationsV1Operation_universal_d_OrderScheduling = OrderScheduling;
  type restaurantsOperationsV1Operation_universal_d_OrderSchedulingOrderSchedulingOptionsOneOf = OrderSchedulingOrderSchedulingOptionsOneOf;
  type restaurantsOperationsV1Operation_universal_d_AsapOrderScheduling = AsapOrderScheduling;
  type restaurantsOperationsV1Operation_universal_d_AsapOrderSchedulingAsapFutureHandlingOptionsOneOf = AsapOrderSchedulingAsapFutureHandlingOptionsOneOf;
  type restaurantsOperationsV1Operation_universal_d_PreparationTime = PreparationTime;
  type restaurantsOperationsV1Operation_universal_d_PreparationTimeTimeSpecificationOneOf = PreparationTimeTimeSpecificationOneOf;
  type restaurantsOperationsV1Operation_universal_d_PreparationTimePreparationTimeType = PreparationTimePreparationTimeType;
  const restaurantsOperationsV1Operation_universal_d_PreparationTimePreparationTimeType: typeof PreparationTimePreparationTimeType;
  type restaurantsOperationsV1Operation_universal_d_AsapFutureHandlingType = AsapFutureHandlingType;
  const restaurantsOperationsV1Operation_universal_d_AsapFutureHandlingType: typeof AsapFutureHandlingType;
  type restaurantsOperationsV1Operation_universal_d_BusinessDaysAheadHandling = BusinessDaysAheadHandling;
  type restaurantsOperationsV1Operation_universal_d_Location = Location;
  type restaurantsOperationsV1Operation_universal_d_DeliveryProfileConfiguredForOperation = DeliveryProfileConfiguredForOperation;
  type restaurantsOperationsV1Operation_universal_d_OperationsDataCloningCompleted = OperationsDataCloningCompleted;
  type restaurantsOperationsV1Operation_universal_d_CreateOperationRequest = CreateOperationRequest;
  type restaurantsOperationsV1Operation_universal_d_CreateOperationResponse = CreateOperationResponse;
  type restaurantsOperationsV1Operation_universal_d_GetOperationRequest = GetOperationRequest;
  type restaurantsOperationsV1Operation_universal_d_GetOperationResponse = GetOperationResponse;
  type restaurantsOperationsV1Operation_universal_d_UpdateOperationRequest = UpdateOperationRequest;
  type restaurantsOperationsV1Operation_universal_d_UpdateOperationResponse = UpdateOperationResponse;
  type restaurantsOperationsV1Operation_universal_d_DeleteOperationRequest = DeleteOperationRequest;
  type restaurantsOperationsV1Operation_universal_d_DeleteOperationResponse = DeleteOperationResponse;
  type restaurantsOperationsV1Operation_universal_d_QueryOperationRequest = QueryOperationRequest;
  type restaurantsOperationsV1Operation_universal_d_QueryOperationResponse = QueryOperationResponse;
  type restaurantsOperationsV1Operation_universal_d_ListOperationsRequest = ListOperationsRequest;
  type restaurantsOperationsV1Operation_universal_d_ListOperationsResponse = ListOperationsResponse;
  type restaurantsOperationsV1Operation_universal_d_ListOperationIdsRequest = ListOperationIdsRequest;
  type restaurantsOperationsV1Operation_universal_d_ListOperationIdsResponse = ListOperationIdsResponse;
  type restaurantsOperationsV1Operation_universal_d_ListAvailableFulfillmentOptionsRequest = ListAvailableFulfillmentOptionsRequest;
  type restaurantsOperationsV1Operation_universal_d_ListAvailableFulfillmentOptionsResponse = ListAvailableFulfillmentOptionsResponse;
  type restaurantsOperationsV1Operation_universal_d_FulfillmentOption = FulfillmentOption;
  type restaurantsOperationsV1Operation_universal_d_FulfillmentOptionFulfillmentTimeOptionsOneOf = FulfillmentOptionFulfillmentTimeOptionsOneOf;
  type restaurantsOperationsV1Operation_universal_d_FulfillmentOptionFulfillmentTimesDisplayOptionsOneOf = FulfillmentOptionFulfillmentTimesDisplayOptionsOneOf;
  type restaurantsOperationsV1Operation_universal_d_FulfillmentOptionFulfillmentTypeOptionsOneOf = FulfillmentOptionFulfillmentTypeOptionsOneOf;
  type restaurantsOperationsV1Operation_universal_d_FulfillmentOptionAvailability = FulfillmentOptionAvailability;
  type restaurantsOperationsV1Operation_universal_d_FulfillmentTimeType = FulfillmentTimeType;
  const restaurantsOperationsV1Operation_universal_d_FulfillmentTimeType: typeof FulfillmentTimeType;
  type restaurantsOperationsV1Operation_universal_d_DurationRange = DurationRange;
  type restaurantsOperationsV1Operation_universal_d_FulfillmentTimesDisplayType = FulfillmentTimesDisplayType;
  const restaurantsOperationsV1Operation_universal_d_FulfillmentTimesDisplayType: typeof FulfillmentTimesDisplayType;
  type restaurantsOperationsV1Operation_universal_d_TimeWindowDisplayConfig = TimeWindowDisplayConfig;
  type restaurantsOperationsV1Operation_universal_d_PickupDetails = PickupDetails;
  type restaurantsOperationsV1Operation_universal_d_DeliveryDetails = DeliveryDetails;
  type restaurantsOperationsV1Operation_universal_d_ListFirstAvailableTimeSlotForFulfillmentTypesRequest = ListFirstAvailableTimeSlotForFulfillmentTypesRequest;
  type restaurantsOperationsV1Operation_universal_d_ListFirstAvailableTimeSlotForFulfillmentTypesResponse = ListFirstAvailableTimeSlotForFulfillmentTypesResponse;
  type restaurantsOperationsV1Operation_universal_d_FulfillmentTimeSlot = FulfillmentTimeSlot;
  type restaurantsOperationsV1Operation_universal_d_FulfillmentDetails = FulfillmentDetails;
  type restaurantsOperationsV1Operation_universal_d_FulfillmentDetailsFulfillmentTimeOptionsOneOf = FulfillmentDetailsFulfillmentTimeOptionsOneOf;
  type restaurantsOperationsV1Operation_universal_d_FulfillmentAddress = FulfillmentAddress;
  type restaurantsOperationsV1Operation_universal_d_ListFirstAvailableTimeSlotsForMenusRequest = ListFirstAvailableTimeSlotsForMenusRequest;
  type restaurantsOperationsV1Operation_universal_d_ListFirstAvailableTimeSlotsForMenusResponse = ListFirstAvailableTimeSlotsForMenusResponse;
  type restaurantsOperationsV1Operation_universal_d_FirstFulfillmentTimeSlotsPerMenu = FirstFulfillmentTimeSlotsPerMenu;
  type restaurantsOperationsV1Operation_universal_d_ListAvailableTimeSlotsForDateRequest = ListAvailableTimeSlotsForDateRequest;
  type restaurantsOperationsV1Operation_universal_d__Date = _Date;
  type restaurantsOperationsV1Operation_universal_d_ListAvailableTimeSlotsForDateResponse = ListAvailableTimeSlotsForDateResponse;
  type restaurantsOperationsV1Operation_universal_d_ListAvailableDatesInRangeRequest = ListAvailableDatesInRangeRequest;
  type restaurantsOperationsV1Operation_universal_d_ListAvailableDatesInRangeResponse = ListAvailableDatesInRangeResponse;
  type restaurantsOperationsV1Operation_universal_d_FulfillmentTypeAvailableDates = FulfillmentTypeAvailableDates;
  type restaurantsOperationsV1Operation_universal_d_GetExpectedFulfillmentSelectionRequest = GetExpectedFulfillmentSelectionRequest;
  type restaurantsOperationsV1Operation_universal_d_GetExpectedFulfillmentSelectionResponse = GetExpectedFulfillmentSelectionResponse;
  const restaurantsOperationsV1Operation_universal_d_createOperation: typeof createOperation;
  const restaurantsOperationsV1Operation_universal_d_getOperation: typeof getOperation;
  const restaurantsOperationsV1Operation_universal_d_updateOperation: typeof updateOperation;
  type restaurantsOperationsV1Operation_universal_d_UpdateOperation = UpdateOperation;
  type restaurantsOperationsV1Operation_universal_d_UpdateOperationOptions = UpdateOperationOptions;
  const restaurantsOperationsV1Operation_universal_d_deleteOperation: typeof deleteOperation;
  const restaurantsOperationsV1Operation_universal_d_queryOperation: typeof queryOperation;
  type restaurantsOperationsV1Operation_universal_d_OperationsQueryResult = OperationsQueryResult;
  type restaurantsOperationsV1Operation_universal_d_OperationsQueryBuilder = OperationsQueryBuilder;
  const restaurantsOperationsV1Operation_universal_d_listOperations: typeof listOperations;
  const restaurantsOperationsV1Operation_universal_d_listOperationIds: typeof listOperationIds;
  const restaurantsOperationsV1Operation_universal_d_listAvailableFulfillmentOptions: typeof listAvailableFulfillmentOptions;
  type restaurantsOperationsV1Operation_universal_d_ListAvailableFulfillmentOptions = ListAvailableFulfillmentOptions;
  const restaurantsOperationsV1Operation_universal_d_listFirstAvailableTimeSlotForFulfillmentTypes: typeof listFirstAvailableTimeSlotForFulfillmentTypes;
  type restaurantsOperationsV1Operation_universal_d_ListFirstAvailableTimeSlotForFulfillmentTypesOptions = ListFirstAvailableTimeSlotForFulfillmentTypesOptions;
  const restaurantsOperationsV1Operation_universal_d_listFirstAvailableTimeSlotsForMenus: typeof listFirstAvailableTimeSlotsForMenus;
  type restaurantsOperationsV1Operation_universal_d_ListFirstAvailableTimeSlotsForMenusOptions = ListFirstAvailableTimeSlotsForMenusOptions;
  const restaurantsOperationsV1Operation_universal_d_listAvailableTimeSlotsForDate: typeof listAvailableTimeSlotsForDate;
  type restaurantsOperationsV1Operation_universal_d_ListAvailableTimeSlotsForDateOptions = ListAvailableTimeSlotsForDateOptions;
  const restaurantsOperationsV1Operation_universal_d_listAvailableDatesInRange: typeof listAvailableDatesInRange;
  type restaurantsOperationsV1Operation_universal_d_ListAvailableDatesInRangeOptions = ListAvailableDatesInRangeOptions;
  const restaurantsOperationsV1Operation_universal_d_getExpectedFulfillmentSelection: typeof getExpectedFulfillmentSelection;
  type restaurantsOperationsV1Operation_universal_d_GetExpectedFulfillmentSelectionOptions = GetExpectedFulfillmentSelectionOptions;
  namespace restaurantsOperationsV1Operation_universal_d {
    export {
      Operation$1 as Operation,
      restaurantsOperationsV1Operation_universal_d_OperationOnlineOrderingStatusOptionsOneOf as OperationOnlineOrderingStatusOptionsOneOf,
      restaurantsOperationsV1Operation_universal_d_Scheduling as Scheduling,
      restaurantsOperationsV1Operation_universal_d_SchedulingSchedulingOptionsOneOf as SchedulingSchedulingOptionsOneOf,
      restaurantsOperationsV1Operation_universal_d_SchedulingType as SchedulingType,
      restaurantsOperationsV1Operation_universal_d_AsapScheduling as AsapScheduling,
      restaurantsOperationsV1Operation_universal_d_AsapSchedulingPreparationTimeOneOf as AsapSchedulingPreparationTimeOneOf,
      restaurantsOperationsV1Operation_universal_d_AsapSchedulingAsapPreorderOneOf as AsapSchedulingAsapPreorderOneOf,
      restaurantsOperationsV1Operation_universal_d_PreparationTimeType as PreparationTimeType,
      restaurantsOperationsV1Operation_universal_d_TimeDuration as TimeDuration,
      restaurantsOperationsV1Operation_universal_d_TimeUnit as TimeUnit,
      restaurantsOperationsV1Operation_universal_d_TimeDurationRange as TimeDurationRange,
      restaurantsOperationsV1Operation_universal_d_AsapPreorderType as AsapPreorderType,
      restaurantsOperationsV1Operation_universal_d_BusinessDaysPreorder as BusinessDaysPreorder,
      restaurantsOperationsV1Operation_universal_d_PreorderScheduling as PreorderScheduling,
      restaurantsOperationsV1Operation_universal_d_PreorderMethod as PreorderMethod,
      restaurantsOperationsV1Operation_universal_d_PreorderMethodMethodOptionsOneOf as PreorderMethodMethodOptionsOneOf,
      restaurantsOperationsV1Operation_universal_d_DayAndTime as DayAndTime,
      EntitiesDayOfWeek$1 as EntitiesDayOfWeek,
      TimeOfDay$1 as TimeOfDay,
      restaurantsOperationsV1Operation_universal_d_MethodType as MethodType,
      restaurantsOperationsV1Operation_universal_d_TimeBounded as TimeBounded,
      restaurantsOperationsV1Operation_universal_d_WeeklySchedule as WeeklySchedule,
      restaurantsOperationsV1Operation_universal_d_FulfillmentTimesDisplayConfig as FulfillmentTimesDisplayConfig,
      restaurantsOperationsV1Operation_universal_d_FulfillmentTimesDisplayConfigFulfillmentTimesDisplayOptionsOneOf as FulfillmentTimesDisplayConfigFulfillmentTimesDisplayOptionsOneOf,
      restaurantsOperationsV1Operation_universal_d_FulfillmentTimesType as FulfillmentTimesType,
      restaurantsOperationsV1Operation_universal_d_OnlineOrderingStatusType as OnlineOrderingStatusType,
      restaurantsOperationsV1Operation_universal_d_OnlineOrderingPausedUntilOptions as OnlineOrderingPausedUntilOptions,
      restaurantsOperationsV1Operation_universal_d_FulfillmentType as FulfillmentType,
      restaurantsOperationsV1Operation_universal_d_OrderScheduling as OrderScheduling,
      restaurantsOperationsV1Operation_universal_d_OrderSchedulingOrderSchedulingOptionsOneOf as OrderSchedulingOrderSchedulingOptionsOneOf,
      restaurantsOperationsV1Operation_universal_d_AsapOrderScheduling as AsapOrderScheduling,
      restaurantsOperationsV1Operation_universal_d_AsapOrderSchedulingAsapFutureHandlingOptionsOneOf as AsapOrderSchedulingAsapFutureHandlingOptionsOneOf,
      restaurantsOperationsV1Operation_universal_d_PreparationTime as PreparationTime,
      restaurantsOperationsV1Operation_universal_d_PreparationTimeTimeSpecificationOneOf as PreparationTimeTimeSpecificationOneOf,
      restaurantsOperationsV1Operation_universal_d_PreparationTimePreparationTimeType as PreparationTimePreparationTimeType,
      restaurantsOperationsV1Operation_universal_d_AsapFutureHandlingType as AsapFutureHandlingType,
      restaurantsOperationsV1Operation_universal_d_BusinessDaysAheadHandling as BusinessDaysAheadHandling,
      restaurantsOperationsV1Operation_universal_d_Location as Location,
      InvalidateCache$1 as InvalidateCache,
      InvalidateCacheGetByOneOf$1 as InvalidateCacheGetByOneOf,
      App$1 as App,
      Page$1 as Page,
      URI$1 as URI,
      File$1 as File,
      restaurantsOperationsV1Operation_universal_d_DeliveryProfileConfiguredForOperation as DeliveryProfileConfiguredForOperation,
      restaurantsOperationsV1Operation_universal_d_OperationsDataCloningCompleted as OperationsDataCloningCompleted,
      restaurantsOperationsV1Operation_universal_d_CreateOperationRequest as CreateOperationRequest,
      restaurantsOperationsV1Operation_universal_d_CreateOperationResponse as CreateOperationResponse,
      restaurantsOperationsV1Operation_universal_d_GetOperationRequest as GetOperationRequest,
      restaurantsOperationsV1Operation_universal_d_GetOperationResponse as GetOperationResponse,
      restaurantsOperationsV1Operation_universal_d_UpdateOperationRequest as UpdateOperationRequest,
      restaurantsOperationsV1Operation_universal_d_UpdateOperationResponse as UpdateOperationResponse,
      restaurantsOperationsV1Operation_universal_d_DeleteOperationRequest as DeleteOperationRequest,
      restaurantsOperationsV1Operation_universal_d_DeleteOperationResponse as DeleteOperationResponse,
      restaurantsOperationsV1Operation_universal_d_QueryOperationRequest as QueryOperationRequest,
      CursorQuery$3 as CursorQuery,
      CursorQueryPagingMethodOneOf$3 as CursorQueryPagingMethodOneOf,
      Sorting$3 as Sorting,
      SortOrder$3 as SortOrder,
      CursorPaging$2 as CursorPaging,
      restaurantsOperationsV1Operation_universal_d_QueryOperationResponse as QueryOperationResponse,
      CursorPagingMetadata$2 as CursorPagingMetadata,
      Cursors$2 as Cursors,
      restaurantsOperationsV1Operation_universal_d_ListOperationsRequest as ListOperationsRequest,
      restaurantsOperationsV1Operation_universal_d_ListOperationsResponse as ListOperationsResponse,
      restaurantsOperationsV1Operation_universal_d_ListOperationIdsRequest as ListOperationIdsRequest,
      restaurantsOperationsV1Operation_universal_d_ListOperationIdsResponse as ListOperationIdsResponse,
      restaurantsOperationsV1Operation_universal_d_ListAvailableFulfillmentOptionsRequest as ListAvailableFulfillmentOptionsRequest,
      CommonAddress$1 as CommonAddress,
      CommonAddressStreetOneOf$1 as CommonAddressStreetOneOf,
      StreetAddress$1 as StreetAddress,
      AddressLocation$1 as AddressLocation,
      Subdivision$1 as Subdivision,
      SubdivisionType$1 as SubdivisionType,
      restaurantsOperationsV1Operation_universal_d_ListAvailableFulfillmentOptionsResponse as ListAvailableFulfillmentOptionsResponse,
      restaurantsOperationsV1Operation_universal_d_FulfillmentOption as FulfillmentOption,
      restaurantsOperationsV1Operation_universal_d_FulfillmentOptionFulfillmentTimeOptionsOneOf as FulfillmentOptionFulfillmentTimeOptionsOneOf,
      restaurantsOperationsV1Operation_universal_d_FulfillmentOptionFulfillmentTimesDisplayOptionsOneOf as FulfillmentOptionFulfillmentTimesDisplayOptionsOneOf,
      restaurantsOperationsV1Operation_universal_d_FulfillmentOptionFulfillmentTypeOptionsOneOf as FulfillmentOptionFulfillmentTypeOptionsOneOf,
      restaurantsOperationsV1Operation_universal_d_FulfillmentOptionAvailability as FulfillmentOptionAvailability,
      DayOfWeekAvailability$1 as DayOfWeekAvailability,
      TimeOfDayRange$1 as TimeOfDayRange,
      AvailabilityException$1 as AvailabilityException,
      restaurantsOperationsV1Operation_universal_d_FulfillmentTimeType as FulfillmentTimeType,
      restaurantsOperationsV1Operation_universal_d_DurationRange as DurationRange,
      restaurantsOperationsV1Operation_universal_d_FulfillmentTimesDisplayType as FulfillmentTimesDisplayType,
      restaurantsOperationsV1Operation_universal_d_TimeWindowDisplayConfig as TimeWindowDisplayConfig,
      restaurantsOperationsV1Operation_universal_d_PickupDetails as PickupDetails,
      restaurantsOperationsV1Operation_universal_d_DeliveryDetails as DeliveryDetails,
      restaurantsOperationsV1Operation_universal_d_ListFirstAvailableTimeSlotForFulfillmentTypesRequest as ListFirstAvailableTimeSlotForFulfillmentTypesRequest,
      restaurantsOperationsV1Operation_universal_d_ListFirstAvailableTimeSlotForFulfillmentTypesResponse as ListFirstAvailableTimeSlotForFulfillmentTypesResponse,
      restaurantsOperationsV1Operation_universal_d_FulfillmentTimeSlot as FulfillmentTimeSlot,
      restaurantsOperationsV1Operation_universal_d_FulfillmentDetails as FulfillmentDetails,
      restaurantsOperationsV1Operation_universal_d_FulfillmentDetailsFulfillmentTimeOptionsOneOf as FulfillmentDetailsFulfillmentTimeOptionsOneOf,
      restaurantsOperationsV1Operation_universal_d_FulfillmentAddress as FulfillmentAddress,
      restaurantsOperationsV1Operation_universal_d_ListFirstAvailableTimeSlotsForMenusRequest as ListFirstAvailableTimeSlotsForMenusRequest,
      restaurantsOperationsV1Operation_universal_d_ListFirstAvailableTimeSlotsForMenusResponse as ListFirstAvailableTimeSlotsForMenusResponse,
      restaurantsOperationsV1Operation_universal_d_FirstFulfillmentTimeSlotsPerMenu as FirstFulfillmentTimeSlotsPerMenu,
      restaurantsOperationsV1Operation_universal_d_ListAvailableTimeSlotsForDateRequest as ListAvailableTimeSlotsForDateRequest,
      restaurantsOperationsV1Operation_universal_d__Date as _Date,
      restaurantsOperationsV1Operation_universal_d_ListAvailableTimeSlotsForDateResponse as ListAvailableTimeSlotsForDateResponse,
      restaurantsOperationsV1Operation_universal_d_ListAvailableDatesInRangeRequest as ListAvailableDatesInRangeRequest,
      restaurantsOperationsV1Operation_universal_d_ListAvailableDatesInRangeResponse as ListAvailableDatesInRangeResponse,
      restaurantsOperationsV1Operation_universal_d_FulfillmentTypeAvailableDates as FulfillmentTypeAvailableDates,
      restaurantsOperationsV1Operation_universal_d_GetExpectedFulfillmentSelectionRequest as GetExpectedFulfillmentSelectionRequest,
      restaurantsOperationsV1Operation_universal_d_GetExpectedFulfillmentSelectionResponse as GetExpectedFulfillmentSelectionResponse,
      DomainEvent$4 as DomainEvent,
      DomainEventBodyOneOf$4 as DomainEventBodyOneOf,
      EntityCreatedEvent$4 as EntityCreatedEvent,
      RestoreInfo$4 as RestoreInfo,
      EntityUpdatedEvent$4 as EntityUpdatedEvent,
      EntityDeletedEvent$4 as EntityDeletedEvent,
      ActionEvent$4 as ActionEvent,
      Empty$3 as Empty,
      SitePropertiesNotification$1 as SitePropertiesNotification,
      SitePropertiesEvent$1 as SitePropertiesEvent,
      Properties$1 as Properties,
      Categories$1 as Categories,
      Locale$2 as Locale,
      Address$1 as Address,
      AddressHint$1 as AddressHint,
      PlacementType$1 as PlacementType,
      GeoCoordinates$1 as GeoCoordinates,
      BusinessSchedule$1 as BusinessSchedule,
      TimePeriod$1 as TimePeriod,
      DayOfWeek$1 as DayOfWeek,
      SpecialHourPeriod$1 as SpecialHourPeriod,
      Multilingual$1 as Multilingual,
      SupportedLanguage$1 as SupportedLanguage,
      ResolutionMethod$1 as ResolutionMethod,
      ConsentPolicy$1 as ConsentPolicy,
      Translation$1 as Translation,
      ChangeContext$1 as ChangeContext,
      ChangeContextPayloadOneOf$1 as ChangeContextPayloadOneOf,
      PropertiesChange$1 as PropertiesChange,
      SiteCreated$1 as SiteCreated,
      SiteCloned$1 as SiteCloned,
      MessageEnvelope$4 as MessageEnvelope,
      IdentificationData$4 as IdentificationData,
      IdentificationDataIdOneOf$4 as IdentificationDataIdOneOf,
      WebhookIdentityType$4 as WebhookIdentityType,
      restaurantsOperationsV1Operation_universal_d_createOperation as createOperation,
      restaurantsOperationsV1Operation_universal_d_getOperation as getOperation,
      restaurantsOperationsV1Operation_universal_d_updateOperation as updateOperation,
      restaurantsOperationsV1Operation_universal_d_UpdateOperation as UpdateOperation,
      restaurantsOperationsV1Operation_universal_d_UpdateOperationOptions as UpdateOperationOptions,
      restaurantsOperationsV1Operation_universal_d_deleteOperation as deleteOperation,
      restaurantsOperationsV1Operation_universal_d_queryOperation as queryOperation,
      restaurantsOperationsV1Operation_universal_d_OperationsQueryResult as OperationsQueryResult,
      restaurantsOperationsV1Operation_universal_d_OperationsQueryBuilder as OperationsQueryBuilder,
      restaurantsOperationsV1Operation_universal_d_listOperations as listOperations,
      restaurantsOperationsV1Operation_universal_d_listOperationIds as listOperationIds,
      restaurantsOperationsV1Operation_universal_d_listAvailableFulfillmentOptions as listAvailableFulfillmentOptions,
      restaurantsOperationsV1Operation_universal_d_ListAvailableFulfillmentOptions as ListAvailableFulfillmentOptions,
      restaurantsOperationsV1Operation_universal_d_listFirstAvailableTimeSlotForFulfillmentTypes as listFirstAvailableTimeSlotForFulfillmentTypes,
      restaurantsOperationsV1Operation_universal_d_ListFirstAvailableTimeSlotForFulfillmentTypesOptions as ListFirstAvailableTimeSlotForFulfillmentTypesOptions,
      restaurantsOperationsV1Operation_universal_d_listFirstAvailableTimeSlotsForMenus as listFirstAvailableTimeSlotsForMenus,
      restaurantsOperationsV1Operation_universal_d_ListFirstAvailableTimeSlotsForMenusOptions as ListFirstAvailableTimeSlotsForMenusOptions,
      restaurantsOperationsV1Operation_universal_d_listAvailableTimeSlotsForDate as listAvailableTimeSlotsForDate,
      restaurantsOperationsV1Operation_universal_d_ListAvailableTimeSlotsForDateOptions as ListAvailableTimeSlotsForDateOptions,
      restaurantsOperationsV1Operation_universal_d_listAvailableDatesInRange as listAvailableDatesInRange,
      restaurantsOperationsV1Operation_universal_d_ListAvailableDatesInRangeOptions as ListAvailableDatesInRangeOptions,
      restaurantsOperationsV1Operation_universal_d_getExpectedFulfillmentSelection as getExpectedFulfillmentSelection,
      restaurantsOperationsV1Operation_universal_d_GetExpectedFulfillmentSelectionOptions as GetExpectedFulfillmentSelectionOptions,
    };
  }
  
  /** Policy is the main entity of OrderPacingPolicies that can be used for lorem ipsum dolor */
  interface Policy {
      /** The policy's id */
      _id?: string | null;
      /**
       * Current state of this policy.
       * Each time the policy is modified, its `revision` changes.
       * For an update operation to succeed, you MUST pass the latest revision
       */
      revision?: string | null;
      /** The active state of this policy - is it enabled or not */
      enabled?: boolean;
      /** The location id this policy is related to */
      locationId?: string | null;
      /** The pacing rules this policy should enforce */
      rules?: PolicyRule[];
      /** Extended fields. */
      extendedFields?: ExtendedFields$1;
  }
  interface PolicyRule {
      /** The volume limit */
      volumeLimit?: number;
      /** Should the volume limit include contactless dine-in orders. */
      includeContactlessDineinOrders?: boolean;
      /**
       * A list of weekly time intervals in which the policy should be enforced.
       * An empty list means that the enforcement times are during the opening hours of the restaurant.
       */
      enforcementTimes?: WeeklyTimeInterval[];
  }
  interface WeeklyTimeInterval {
      /** The minute of the week the interval starts */
      minuteOfWeek?: number;
      /** The duration in minutes of the interval, starting from the minute_of_week */
      durationInMinutes?: number;
  }
  interface ExtendedFields$1 {
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
  interface CreatePolicyRequest {
      /** The policy to be created */
      policy: Policy;
  }
  interface CreatePolicyResponse {
      /** The created Policy */
      policy?: Policy;
  }
  interface GetPolicyRequest {
      /** The location_id the policy belongs to */
      locationId?: string | null;
      /**
       * The restaurantLocationId the policy belongs to
       * @internal
       */
      restaurantLocationId?: string | null;
  }
  interface GetPolicyResponse {
      /** The retrieved Policy */
      policy?: Policy;
  }
  interface UpdatePolicyRequest {
      /** Policy to be updated, may be partial */
      policy: Policy;
  }
  interface UpdatePolicyResponse {
      /** The updated Policy */
      policy?: Policy;
  }
  interface RestaurantLocationsUpdatedEvent {
      metaSiteId?: string;
      triggerBy?: SyncLocationsSource;
      prevLocationsProperties?: RestaurantLocationProperties[];
      updatedLocationsProperties?: RestaurantLocationProperties[];
      specialEvent?: SpecialEvent;
  }
  enum Type$2 {
      UNKNOWN = "UNKNOWN",
      FROM_ZERO_LOCATIONS_TO_ONE_LOCATION = "FROM_ZERO_LOCATIONS_TO_ONE_LOCATION",
      FROM_ONE_LOCATION_TO_ZERO_LOCATIONS = "FROM_ONE_LOCATION_TO_ZERO_LOCATIONS"
  }
  enum SyncLocationsSource {
      API = "API",
      LOCATION_EVENT = "LOCATION_EVENT",
      RESTAURANT_PROVISIONED_EVENT = "RESTAURANT_PROVISIONED_EVENT"
  }
  interface RestaurantLocationProperties {
      locationId?: string;
      defaultLocation?: boolean;
      archived?: boolean;
  }
  interface SpecialEvent {
      type?: Type$2;
      locationId?: string;
  }
  interface Empty$2 {
  }
  interface DomainEvent$3 extends DomainEventBodyOneOf$3 {
      createdEvent?: EntityCreatedEvent$3;
      updatedEvent?: EntityUpdatedEvent$3;
      deletedEvent?: EntityDeletedEvent$3;
      actionEvent?: ActionEvent$3;
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
  interface DomainEventBodyOneOf$3 {
      createdEvent?: EntityCreatedEvent$3;
      updatedEvent?: EntityUpdatedEvent$3;
      deletedEvent?: EntityDeletedEvent$3;
      actionEvent?: ActionEvent$3;
  }
  interface EntityCreatedEvent$3 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$3;
  }
  interface RestoreInfo$3 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$3 {
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
  }
  interface EntityDeletedEvent$3 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
  }
  interface ActionEvent$3 {
      bodyAsJson?: string;
  }
  interface MessageEnvelope$3 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$3;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$3 extends IdentificationDataIdOneOf$3 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$3;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$3 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$3 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Creates a new Policy
   * The default location id for the metaSite will be used if the location_id is not provided
   * @param policy - The policy to be created
   * @public
   * @documentationMaturity preview
   * @requiredField policy
   * @requiredField policy.rules
   * @permissionId WIX_RESTAURANTS.ORDER_PACING_CREATE
   * @adminMethod
   * @returns The created Policy
   */
  function createPolicy(policy: Policy): Promise<Policy>;
  /**
   * Get a Policy by location_id
   * The default location id for the metaSite will be used if the location_id is not provided
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_RESTAURANTS.ORDER_PACING_POLICIES_READ
   * @adminMethod
   */
  function getPolicy(options?: GetPolicyOptions): Promise<GetPolicyResponse>;
  interface GetPolicyOptions {
      /** The location_id the policy belongs to */
      locationId?: string | null;
      /**
       * The restaurantLocationId the policy belongs to
       * @internal
       */
      restaurantLocationId?: string | null;
  }
  /**
   * Update a Policy
   * The default location id for the metaSite will be used if the location_id is not provided
   * Pass the latest `revision` for a successful update
   * @param _id - The policy's id
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField policy
   * @requiredField policy.revision
   * @requiredField policy.rules
   * @permissionId WIX_RESTAURANTS.ORDER_PACING_UPDATE
   * @adminMethod
   */
  function updatePolicy(_id: string | null, policy: UpdatePolicy): Promise<UpdatePolicyResponse>;
  interface UpdatePolicy {
      /** The policy's id */
      _id?: string | null;
      /**
       * Current state of this policy.
       * Each time the policy is modified, its `revision` changes.
       * For an update operation to succeed, you MUST pass the latest revision
       */
      revision?: string | null;
      /** The active state of this policy - is it enabled or not */
      enabled?: boolean;
      /** The location id this policy is related to */
      locationId?: string | null;
      /** The pacing rules this policy should enforce */
      rules?: PolicyRule[];
      /** Extended fields. */
      extendedFields?: ExtendedFields$1;
  }
  
  type restaurantsOrderPacingV1Policy_universal_d_Policy = Policy;
  type restaurantsOrderPacingV1Policy_universal_d_PolicyRule = PolicyRule;
  type restaurantsOrderPacingV1Policy_universal_d_WeeklyTimeInterval = WeeklyTimeInterval;
  type restaurantsOrderPacingV1Policy_universal_d_CreatePolicyRequest = CreatePolicyRequest;
  type restaurantsOrderPacingV1Policy_universal_d_CreatePolicyResponse = CreatePolicyResponse;
  type restaurantsOrderPacingV1Policy_universal_d_GetPolicyRequest = GetPolicyRequest;
  type restaurantsOrderPacingV1Policy_universal_d_GetPolicyResponse = GetPolicyResponse;
  type restaurantsOrderPacingV1Policy_universal_d_UpdatePolicyRequest = UpdatePolicyRequest;
  type restaurantsOrderPacingV1Policy_universal_d_UpdatePolicyResponse = UpdatePolicyResponse;
  type restaurantsOrderPacingV1Policy_universal_d_RestaurantLocationsUpdatedEvent = RestaurantLocationsUpdatedEvent;
  type restaurantsOrderPacingV1Policy_universal_d_SyncLocationsSource = SyncLocationsSource;
  const restaurantsOrderPacingV1Policy_universal_d_SyncLocationsSource: typeof SyncLocationsSource;
  type restaurantsOrderPacingV1Policy_universal_d_RestaurantLocationProperties = RestaurantLocationProperties;
  type restaurantsOrderPacingV1Policy_universal_d_SpecialEvent = SpecialEvent;
  const restaurantsOrderPacingV1Policy_universal_d_createPolicy: typeof createPolicy;
  const restaurantsOrderPacingV1Policy_universal_d_getPolicy: typeof getPolicy;
  type restaurantsOrderPacingV1Policy_universal_d_GetPolicyOptions = GetPolicyOptions;
  const restaurantsOrderPacingV1Policy_universal_d_updatePolicy: typeof updatePolicy;
  type restaurantsOrderPacingV1Policy_universal_d_UpdatePolicy = UpdatePolicy;
  namespace restaurantsOrderPacingV1Policy_universal_d {
    export {
      restaurantsOrderPacingV1Policy_universal_d_Policy as Policy,
      restaurantsOrderPacingV1Policy_universal_d_PolicyRule as PolicyRule,
      restaurantsOrderPacingV1Policy_universal_d_WeeklyTimeInterval as WeeklyTimeInterval,
      ExtendedFields$1 as ExtendedFields,
      restaurantsOrderPacingV1Policy_universal_d_CreatePolicyRequest as CreatePolicyRequest,
      restaurantsOrderPacingV1Policy_universal_d_CreatePolicyResponse as CreatePolicyResponse,
      restaurantsOrderPacingV1Policy_universal_d_GetPolicyRequest as GetPolicyRequest,
      restaurantsOrderPacingV1Policy_universal_d_GetPolicyResponse as GetPolicyResponse,
      restaurantsOrderPacingV1Policy_universal_d_UpdatePolicyRequest as UpdatePolicyRequest,
      restaurantsOrderPacingV1Policy_universal_d_UpdatePolicyResponse as UpdatePolicyResponse,
      restaurantsOrderPacingV1Policy_universal_d_RestaurantLocationsUpdatedEvent as RestaurantLocationsUpdatedEvent,
      Type$2 as Type,
      restaurantsOrderPacingV1Policy_universal_d_SyncLocationsSource as SyncLocationsSource,
      restaurantsOrderPacingV1Policy_universal_d_RestaurantLocationProperties as RestaurantLocationProperties,
      restaurantsOrderPacingV1Policy_universal_d_SpecialEvent as SpecialEvent,
      Empty$2 as Empty,
      DomainEvent$3 as DomainEvent,
      DomainEventBodyOneOf$3 as DomainEventBodyOneOf,
      EntityCreatedEvent$3 as EntityCreatedEvent,
      RestoreInfo$3 as RestoreInfo,
      EntityUpdatedEvent$3 as EntityUpdatedEvent,
      EntityDeletedEvent$3 as EntityDeletedEvent,
      ActionEvent$3 as ActionEvent,
      MessageEnvelope$3 as MessageEnvelope,
      IdentificationData$3 as IdentificationData,
      IdentificationDataIdOneOf$3 as IdentificationDataIdOneOf,
      WebhookIdentityType$3 as WebhookIdentityType,
      restaurantsOrderPacingV1Policy_universal_d_createPolicy as createPolicy,
      restaurantsOrderPacingV1Policy_universal_d_getPolicy as getPolicy,
      restaurantsOrderPacingV1Policy_universal_d_GetPolicyOptions as GetPolicyOptions,
      restaurantsOrderPacingV1Policy_universal_d_updatePolicy as updatePolicy,
      restaurantsOrderPacingV1Policy_universal_d_UpdatePolicy as UpdatePolicy,
    };
  }
  
  interface AvailabilityException {
      /**
       * Availability exception ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the availability exception is updated.
       * To prevent conflicting changes, the current revision must be specified when updating the availability exception.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the availability exception was created in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the availability exception was last updated in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** The start time of the availability exception in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format. */
      startTime?: Date | null;
      /** The end time of the availability exception in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format. */
      endTime?: Date | null;
      /**
       * Whether the exception makes the [`start_time`, `end_time`] range available.
       * If `true`, the exception makes the restaurant available for online ordering during the time range. If `false`, the exception makes the restaurant unavailable for ordering during the time range.
       * Currently, only `false` is supported.
       * @readonly
       */
      available?: boolean | null;
      /** Exception name. */
      name?: string | null;
      /** Fulfillment methods for which this exception applies. */
      affectedFulfillmentMethods?: AffectedFulfillmentMethods;
      /** ID of the restaurant operation this exception is associated with. (See the Restaurants Operations API for more information.) */
      operationId?: string | null;
      /** Extended fields. */
      extendedFields?: ExtendedFields;
      /**
       * Location Id associated with the availability exception.
       * @internal
       * @readonly
       */
      locationId?: string | null;
  }
  interface AffectedFulfillmentMethods extends AffectedFulfillmentMethodsAffectedMethodsOptionsOneOf {
      /** Settings for specific fulfillment methods. */
      specificFulfillmentMethodsOptions?: SpecificFulfillmentMethodsImpactScope;
      /** The type of the fulfillment methods this exception applies to. */
      affectedMethods?: AffectedMethods;
  }
  /** @oneof */
  interface AffectedFulfillmentMethodsAffectedMethodsOptionsOneOf {
      /** Settings for specific fulfillment methods. */
      specificFulfillmentMethodsOptions?: SpecificFulfillmentMethodsImpactScope;
  }
  /** The scope the exception applied. */
  enum AffectedMethods {
      /** Unknown impact scope. */
      UNKNOWN_AFFECTED_METHODS = "UNKNOWN_AFFECTED_METHODS",
      /** All fulfillment methods of this operation applied for this exception. */
      ALL_FULFILLMENT_METHODS = "ALL_FULFILLMENT_METHODS",
      /** Specific fulfillment methods applied for this exception. */
      SPECIFIC_FULFILLMENT_METHODS = "SPECIFIC_FULFILLMENT_METHODS",
      /** All pickup fulfillment methods applied for this exception. */
      ALL_PICKUP_FULFILLMENT_METHODS = "ALL_PICKUP_FULFILLMENT_METHODS",
      /** All delivery fulfillment methods applied for this exception. */
      ALL_DELIVERY_FULFILLMENT_METHODS = "ALL_DELIVERY_FULFILLMENT_METHODS"
  }
  /** Details of the specific fulfillment methods this exception applies to. */
  interface SpecificFulfillmentMethodsImpactScope {
      /** IDs of the fulfillment methods this exception applies to. */
      fulfillmentMethodIds?: string[] | null;
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
  interface CreateAvailabilityExceptionRequest {
      /** Availability exception details. */
      availabilityException: AvailabilityException;
  }
  interface CreateAvailabilityExceptionResponse {
      /** The created availability exception. */
      availabilityException?: AvailabilityException;
  }
  interface GetAvailabilityExceptionRequest {
      /** ID of the availability exception to retrieve. */
      availabilityExceptionId: string;
  }
  interface GetAvailabilityExceptionResponse {
      /** The requested availability exception. */
      availabilityException?: AvailabilityException;
  }
  interface UpdateAvailabilityExceptionRequest {
      /** Availability exception to update. */
      availabilityException: AvailabilityException;
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateAvailabilityExceptionResponse {
      /** Updated availability exception. */
      availabilityException?: AvailabilityException;
  }
  interface DeleteAvailabilityExceptionRequest {
      /** ID of the availability exception to delete. */
      availabilityExceptionId: string;
  }
  interface DeleteAvailabilityExceptionResponse {
  }
  interface QueryAvailabilityExceptionsRequest {
      /** WQL expression. */
      query?: CursorQuery$2;
  }
  interface CursorQuery$2 extends CursorQueryPagingMethodOneOf$2 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$1;
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
      sort?: Sorting$2[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$2 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$1;
  }
  interface Sorting$2 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$2;
  }
  enum SortOrder$2 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$1 {
      /** Number of items to load. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * You can get the relevant cursor token
       * from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface QueryAvailabilityExceptionsResponse {
      /** List of availability exceptions. */
      availabilityExceptions?: AvailabilityException[];
      /** Paging metadata */
      pagingMetadata?: CursorPagingMetadata$1;
  }
  interface CursorPagingMetadata$1 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      cursors?: Cursors$1;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$1 {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface BulkCreateAvailabilityExceptionsRequest {
      /** Availability exception details. */
      availabilityExceptions: AvailabilityException[];
      /** Whether the full availability exception entity is returned. Defaults to `true`. */
      returnEntity?: boolean;
  }
  interface BulkCreateAvailabilityExceptionsResponse {
      /** Information about the created availability exception. */
      results?: BulkCreateAvailabilityExceptionsResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$2;
  }
  interface BulkCreateAvailabilityExceptionsResult {
      /** Metadata for availability exception creation. */
      itemMetadata?: ItemMetadata$2;
      /** Created availability exception. */
      availabilityException?: AvailabilityException;
  }
  interface ItemMetadata$2 {
      /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError$2;
  }
  interface ApplicationError$2 {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  interface BulkActionMetadata$2 {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface DomainEvent$2 extends DomainEventBodyOneOf$2 {
      createdEvent?: EntityCreatedEvent$2;
      updatedEvent?: EntityUpdatedEvent$2;
      deletedEvent?: EntityDeletedEvent$2;
      actionEvent?: ActionEvent$2;
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
  interface DomainEventBodyOneOf$2 {
      createdEvent?: EntityCreatedEvent$2;
      updatedEvent?: EntityUpdatedEvent$2;
      deletedEvent?: EntityDeletedEvent$2;
      actionEvent?: ActionEvent$2;
  }
  interface EntityCreatedEvent$2 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$2;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$2 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$2 {
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
  interface EntityDeletedEvent$2 {
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
  interface ActionEvent$2 {
      bodyAsJson?: string;
  }
  interface Empty$1 {
  }
  interface MessageEnvelope$2 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$2;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$2 extends IdentificationDataIdOneOf$2 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$2;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$2 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$2 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Creates a new availability exception.
   * @param availabilityException - Availability exception details.
   * @public
   * @documentationMaturity preview
   * @requiredField availabilityException
   * @requiredField availabilityException.affectedFulfillmentMethods
   * @requiredField availabilityException.affectedFulfillmentMethods.affectedMethods
   * @requiredField availabilityException.available
   * @requiredField availabilityException.endTime
   * @requiredField availabilityException.operationId
   * @requiredField availabilityException.startTime
   * @permissionId RESTAURANTS.AVAILABILITY_EXCEPTION_CREATE
   * @adminMethod
   * @returns The created availability exception.
   */
  function createAvailabilityException(availabilityException: AvailabilityException): Promise<AvailabilityException>;
  /**
   * Retrieves an availability exception.
   * @param availabilityExceptionId - ID of the availability exception to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField availabilityExceptionId
   * @permissionId RESTAURANTS.AVAILABILITY_EXCEPTION_READ
   * @adminMethod
   * @returns The requested availability exception.
   */
  function getAvailabilityException(availabilityExceptionId: string): Promise<AvailabilityException>;
  /**
   * Updates an availability exception.
   *
   * Each time the availability exception is updated, `revision` increments by 1.
   * The current `revision` must be passed when updating the availability exception.
   * This ensures you're working with the latest availability exception and prevents unintended overwrites.
   * @param _id - Availability exception ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField availabilityException
   * @requiredField availabilityException.revision
   * @permissionId RESTAURANTS.AVAILABILITY_EXCEPTION_UPDATE
   * @adminMethod
   * @returns Updated availability exception.
   */
  function updateAvailabilityException(_id: string | null, availabilityException: UpdateAvailabilityException, options?: UpdateAvailabilityExceptionOptions): Promise<AvailabilityException>;
  interface UpdateAvailabilityException {
      /**
       * Availability exception ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the availability exception is updated.
       * To prevent conflicting changes, the current revision must be specified when updating the availability exception.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the availability exception was created in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the availability exception was last updated in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** The start time of the availability exception in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format. */
      startTime?: Date | null;
      /** The end time of the availability exception in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#combined_date_and_time_representations) format. */
      endTime?: Date | null;
      /**
       * Whether the exception makes the [`start_time`, `end_time`] range available.
       * If `true`, the exception makes the restaurant available for online ordering during the time range. If `false`, the exception makes the restaurant unavailable for ordering during the time range.
       * Currently, only `false` is supported.
       * @readonly
       */
      available?: boolean | null;
      /** Exception name. */
      name?: string | null;
      /** Fulfillment methods for which this exception applies. */
      affectedFulfillmentMethods?: AffectedFulfillmentMethods;
      /** ID of the restaurant operation this exception is associated with. (See the Restaurants Operations API for more information.) */
      operationId?: string | null;
      /** Extended fields. */
      extendedFields?: ExtendedFields;
      /**
       * Location Id associated with the availability exception.
       * @internal
       * @readonly
       */
      locationId?: string | null;
  }
  interface UpdateAvailabilityExceptionOptions {
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Deletes an availability exception.
   * @param availabilityExceptionId - ID of the availability exception to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField availabilityExceptionId
   * @permissionId RESTAURANTS.AVAILABILITY_EXCEPTION_DELETE
   * @adminMethod
   */
  function deleteAvailabilityException(availabilityExceptionId: string): Promise<void>;
  /**
   * Creates a query to retrieve a list of availability exceptions.
   *
   * The `queryAvailabilityExceptions()` function builds a query to retrieve a list of availability exceptions and returns an `AvailabilityExceptionsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is used to run the query using the [`find()`](/availability-exceptions/availability-exceptions-query-builder/find) function.
   *
   * You can refine the query by chaining `AvailabilityExceptionsQueryBuilder` functions onto the query. `AvailabilityExceptionsQueryBuilder` functions enable you to filter, sort, and control the results that `queryAvailabilityExceptions()` returns.
   *
   * `queryAvailabilityExceptions()` runs with the following `AvailabilityExceptionsQueryBuilder` defaults, which you can override:
   *
   * - [`limit(50)`](/availability-exceptions/availability-exceptions-query-builder/limit)
   * - [`ascending('_id')`](/availability-exceptions/availability-exceptions-query-builder/ascending)
   *
   * The following `AvailabilityExceptionsQueryBuilder` functions are supported for `queryAvailabilityExceptions()`. For a full description of the availability exception object, see the object returned for the [`items`](/availability-exceptions/availability-exceptions-query-result/items) property in `AvailabilityExceptionsQueryResult`.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.AVAILABILITY_EXCEPTION_READ
   * @adminMethod
   */
  function queryAvailabilityExceptions(): AvailabilityExceptionsQueryBuilder;
  interface QueryCursorResult$2 {
      cursors: Cursors$1;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface AvailabilityExceptionsQueryResult extends QueryCursorResult$2 {
      items: AvailabilityException[];
      query: AvailabilityExceptionsQueryBuilder;
      next: () => Promise<AvailabilityExceptionsQueryResult>;
      prev: () => Promise<AvailabilityExceptionsQueryResult>;
  }
  interface AvailabilityExceptionsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'startTime' | 'endTime' | 'available' | 'name' | 'affectedFulfillmentMethods.affectedMethods', value: any) => AvailabilityExceptionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'startTime' | 'endTime' | 'available' | 'name' | 'affectedFulfillmentMethods.affectedMethods', value: any) => AvailabilityExceptionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate' | 'startTime' | 'endTime', value: any) => AvailabilityExceptionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate' | 'startTime' | 'endTime', value: any) => AvailabilityExceptionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate' | 'startTime' | 'endTime', value: any) => AvailabilityExceptionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate' | 'startTime' | 'endTime', value: any) => AvailabilityExceptionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'name', value: string) => AvailabilityExceptionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'startTime' | 'endTime' | 'available' | 'name' | 'affectedFulfillmentMethods.affectedMethods', value: any[]) => AvailabilityExceptionsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'startTime' | 'endTime' | 'available' | 'name' | 'affectedFulfillmentMethods.affectedMethods', value: any) => AvailabilityExceptionsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'startTime' | 'endTime' | 'available' | 'name' | 'affectedFulfillmentMethods.affectedMethods', value: boolean) => AvailabilityExceptionsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | '_createdDate' | '_updatedDate' | 'startTime' | 'endTime' | 'available' | 'name' | 'affectedFulfillmentMethods.affectedMethods'>) => AvailabilityExceptionsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | '_createdDate' | '_updatedDate' | 'startTime' | 'endTime' | 'available' | 'name' | 'affectedFulfillmentMethods.affectedMethods'>) => AvailabilityExceptionsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => AvailabilityExceptionsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => AvailabilityExceptionsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<AvailabilityExceptionsQueryResult>;
  }
  /**
   * Creates multiple availability exceptions.
   * @param availabilityExceptions - Availability exception details.
   * @internal
   * @documentationMaturity preview
   * @requiredField availabilityExceptions
   * @requiredField availabilityExceptions.affectedFulfillmentMethods
   * @requiredField availabilityExceptions.affectedFulfillmentMethods.affectedMethods
   * @requiredField availabilityExceptions.available
   * @requiredField availabilityExceptions.endTime
   * @requiredField availabilityExceptions.operationId
   * @requiredField availabilityExceptions.startTime
   * @permissionId RESTAURANTS.AVAILABILITY_EXCEPTION_CREATE
   * @adminMethod
   */
  function bulkCreateAvailabilityExceptions(availabilityExceptions: AvailabilityException[], options?: BulkCreateAvailabilityExceptionsOptions): Promise<BulkCreateAvailabilityExceptionsResponse>;
  interface BulkCreateAvailabilityExceptionsOptions {
      /** Whether the full availability exception entity is returned. Defaults to `true`. */
      returnEntity?: boolean;
  }
  
  type restaurantsV1AvailabilityException_universal_d_AvailabilityException = AvailabilityException;
  type restaurantsV1AvailabilityException_universal_d_AffectedFulfillmentMethods = AffectedFulfillmentMethods;
  type restaurantsV1AvailabilityException_universal_d_AffectedFulfillmentMethodsAffectedMethodsOptionsOneOf = AffectedFulfillmentMethodsAffectedMethodsOptionsOneOf;
  type restaurantsV1AvailabilityException_universal_d_AffectedMethods = AffectedMethods;
  const restaurantsV1AvailabilityException_universal_d_AffectedMethods: typeof AffectedMethods;
  type restaurantsV1AvailabilityException_universal_d_SpecificFulfillmentMethodsImpactScope = SpecificFulfillmentMethodsImpactScope;
  type restaurantsV1AvailabilityException_universal_d_ExtendedFields = ExtendedFields;
  type restaurantsV1AvailabilityException_universal_d_CreateAvailabilityExceptionRequest = CreateAvailabilityExceptionRequest;
  type restaurantsV1AvailabilityException_universal_d_CreateAvailabilityExceptionResponse = CreateAvailabilityExceptionResponse;
  type restaurantsV1AvailabilityException_universal_d_GetAvailabilityExceptionRequest = GetAvailabilityExceptionRequest;
  type restaurantsV1AvailabilityException_universal_d_GetAvailabilityExceptionResponse = GetAvailabilityExceptionResponse;
  type restaurantsV1AvailabilityException_universal_d_UpdateAvailabilityExceptionRequest = UpdateAvailabilityExceptionRequest;
  type restaurantsV1AvailabilityException_universal_d_UpdateAvailabilityExceptionResponse = UpdateAvailabilityExceptionResponse;
  type restaurantsV1AvailabilityException_universal_d_DeleteAvailabilityExceptionRequest = DeleteAvailabilityExceptionRequest;
  type restaurantsV1AvailabilityException_universal_d_DeleteAvailabilityExceptionResponse = DeleteAvailabilityExceptionResponse;
  type restaurantsV1AvailabilityException_universal_d_QueryAvailabilityExceptionsRequest = QueryAvailabilityExceptionsRequest;
  type restaurantsV1AvailabilityException_universal_d_QueryAvailabilityExceptionsResponse = QueryAvailabilityExceptionsResponse;
  type restaurantsV1AvailabilityException_universal_d_BulkCreateAvailabilityExceptionsRequest = BulkCreateAvailabilityExceptionsRequest;
  type restaurantsV1AvailabilityException_universal_d_BulkCreateAvailabilityExceptionsResponse = BulkCreateAvailabilityExceptionsResponse;
  type restaurantsV1AvailabilityException_universal_d_BulkCreateAvailabilityExceptionsResult = BulkCreateAvailabilityExceptionsResult;
  const restaurantsV1AvailabilityException_universal_d_createAvailabilityException: typeof createAvailabilityException;
  const restaurantsV1AvailabilityException_universal_d_getAvailabilityException: typeof getAvailabilityException;
  const restaurantsV1AvailabilityException_universal_d_updateAvailabilityException: typeof updateAvailabilityException;
  type restaurantsV1AvailabilityException_universal_d_UpdateAvailabilityException = UpdateAvailabilityException;
  type restaurantsV1AvailabilityException_universal_d_UpdateAvailabilityExceptionOptions = UpdateAvailabilityExceptionOptions;
  const restaurantsV1AvailabilityException_universal_d_deleteAvailabilityException: typeof deleteAvailabilityException;
  const restaurantsV1AvailabilityException_universal_d_queryAvailabilityExceptions: typeof queryAvailabilityExceptions;
  type restaurantsV1AvailabilityException_universal_d_AvailabilityExceptionsQueryResult = AvailabilityExceptionsQueryResult;
  type restaurantsV1AvailabilityException_universal_d_AvailabilityExceptionsQueryBuilder = AvailabilityExceptionsQueryBuilder;
  const restaurantsV1AvailabilityException_universal_d_bulkCreateAvailabilityExceptions: typeof bulkCreateAvailabilityExceptions;
  type restaurantsV1AvailabilityException_universal_d_BulkCreateAvailabilityExceptionsOptions = BulkCreateAvailabilityExceptionsOptions;
  namespace restaurantsV1AvailabilityException_universal_d {
    export {
      restaurantsV1AvailabilityException_universal_d_AvailabilityException as AvailabilityException,
      restaurantsV1AvailabilityException_universal_d_AffectedFulfillmentMethods as AffectedFulfillmentMethods,
      restaurantsV1AvailabilityException_universal_d_AffectedFulfillmentMethodsAffectedMethodsOptionsOneOf as AffectedFulfillmentMethodsAffectedMethodsOptionsOneOf,
      restaurantsV1AvailabilityException_universal_d_AffectedMethods as AffectedMethods,
      restaurantsV1AvailabilityException_universal_d_SpecificFulfillmentMethodsImpactScope as SpecificFulfillmentMethodsImpactScope,
      restaurantsV1AvailabilityException_universal_d_ExtendedFields as ExtendedFields,
      restaurantsV1AvailabilityException_universal_d_CreateAvailabilityExceptionRequest as CreateAvailabilityExceptionRequest,
      restaurantsV1AvailabilityException_universal_d_CreateAvailabilityExceptionResponse as CreateAvailabilityExceptionResponse,
      restaurantsV1AvailabilityException_universal_d_GetAvailabilityExceptionRequest as GetAvailabilityExceptionRequest,
      restaurantsV1AvailabilityException_universal_d_GetAvailabilityExceptionResponse as GetAvailabilityExceptionResponse,
      restaurantsV1AvailabilityException_universal_d_UpdateAvailabilityExceptionRequest as UpdateAvailabilityExceptionRequest,
      restaurantsV1AvailabilityException_universal_d_UpdateAvailabilityExceptionResponse as UpdateAvailabilityExceptionResponse,
      restaurantsV1AvailabilityException_universal_d_DeleteAvailabilityExceptionRequest as DeleteAvailabilityExceptionRequest,
      restaurantsV1AvailabilityException_universal_d_DeleteAvailabilityExceptionResponse as DeleteAvailabilityExceptionResponse,
      restaurantsV1AvailabilityException_universal_d_QueryAvailabilityExceptionsRequest as QueryAvailabilityExceptionsRequest,
      CursorQuery$2 as CursorQuery,
      CursorQueryPagingMethodOneOf$2 as CursorQueryPagingMethodOneOf,
      Sorting$2 as Sorting,
      SortOrder$2 as SortOrder,
      CursorPaging$1 as CursorPaging,
      restaurantsV1AvailabilityException_universal_d_QueryAvailabilityExceptionsResponse as QueryAvailabilityExceptionsResponse,
      CursorPagingMetadata$1 as CursorPagingMetadata,
      Cursors$1 as Cursors,
      restaurantsV1AvailabilityException_universal_d_BulkCreateAvailabilityExceptionsRequest as BulkCreateAvailabilityExceptionsRequest,
      restaurantsV1AvailabilityException_universal_d_BulkCreateAvailabilityExceptionsResponse as BulkCreateAvailabilityExceptionsResponse,
      restaurantsV1AvailabilityException_universal_d_BulkCreateAvailabilityExceptionsResult as BulkCreateAvailabilityExceptionsResult,
      ItemMetadata$2 as ItemMetadata,
      ApplicationError$2 as ApplicationError,
      BulkActionMetadata$2 as BulkActionMetadata,
      DomainEvent$2 as DomainEvent,
      DomainEventBodyOneOf$2 as DomainEventBodyOneOf,
      EntityCreatedEvent$2 as EntityCreatedEvent,
      RestoreInfo$2 as RestoreInfo,
      EntityUpdatedEvent$2 as EntityUpdatedEvent,
      EntityDeletedEvent$2 as EntityDeletedEvent,
      ActionEvent$2 as ActionEvent,
      Empty$1 as Empty,
      MessageEnvelope$2 as MessageEnvelope,
      IdentificationData$2 as IdentificationData,
      IdentificationDataIdOneOf$2 as IdentificationDataIdOneOf,
      WebhookIdentityType$2 as WebhookIdentityType,
      restaurantsV1AvailabilityException_universal_d_createAvailabilityException as createAvailabilityException,
      restaurantsV1AvailabilityException_universal_d_getAvailabilityException as getAvailabilityException,
      restaurantsV1AvailabilityException_universal_d_updateAvailabilityException as updateAvailabilityException,
      restaurantsV1AvailabilityException_universal_d_UpdateAvailabilityException as UpdateAvailabilityException,
      restaurantsV1AvailabilityException_universal_d_UpdateAvailabilityExceptionOptions as UpdateAvailabilityExceptionOptions,
      restaurantsV1AvailabilityException_universal_d_deleteAvailabilityException as deleteAvailabilityException,
      restaurantsV1AvailabilityException_universal_d_queryAvailabilityExceptions as queryAvailabilityExceptions,
      restaurantsV1AvailabilityException_universal_d_AvailabilityExceptionsQueryResult as AvailabilityExceptionsQueryResult,
      restaurantsV1AvailabilityException_universal_d_AvailabilityExceptionsQueryBuilder as AvailabilityExceptionsQueryBuilder,
      restaurantsV1AvailabilityException_universal_d_bulkCreateAvailabilityExceptions as bulkCreateAvailabilityExceptions,
      restaurantsV1AvailabilityException_universal_d_BulkCreateAvailabilityExceptionsOptions as BulkCreateAvailabilityExceptionsOptions,
    };
  }
  
  /** A Fulfillment Method represents a way in which a restaurant can provide orders to its customers. */
  interface FulfillmentMethod extends FulfillmentMethodMethodOptionsOneOf {
      /** Data specific for pickup fulfillment method. */
      pickupOptions?: PickupInfo;
      /** Data specific for delivery fulfillment method. */
      deliveryOptions?: DeliveryInfo;
      /**
       * Fulfillment method ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * The current state of an item. Each time the item is modified, its `revision` changes by the server. for an update operation to succeed, you MUST pass the latest revision.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the fulfillment method was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the fulfillment method was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Type of fulfillment method. */
      type?: FulfillmentMethodType;
      /** Fulfillment method name. */
      name?: string | null;
      /** Whether the fulfillment method is enabled. */
      enabled?: boolean | null;
      /** Fee for using this fulfillment method. */
      fee?: string | null;
      /** Availability of this fulfillment method. */
      availability?: Availability;
      /** Minimum order price to qualify for using this fulfillment method. */
      minOrderPrice?: string | null;
      /**
       * @internal
       * @readonly
       */
      oldFulfillmentMethodId?: string | null;
      /**
       * Location ID associated with the fulfillment method.
       * @internal
       * @readonly
       */
      locationId?: string | null;
  }
  /** @oneof */
  interface FulfillmentMethodMethodOptionsOneOf {
      /** Data specific for pickup fulfillment method. */
      pickupOptions?: PickupInfo;
      /** Data specific for delivery fulfillment method. */
      deliveryOptions?: DeliveryInfo;
  }
  enum FulfillmentMethodType {
      /** Unknown fulfillment type. */
      UNKNOWN_FULFILLMENT_TYPE = "UNKNOWN_FULFILLMENT_TYPE",
      /** The customer must pick up the order from the restaurant. */
      PICKUP = "PICKUP",
      /** The restaurant, or someone on behalf of the restaurant, must deliver the order to the customer. */
      DELIVERY = "DELIVERY"
  }
  interface PickupInfo {
      /** Instructions for the pickup. */
      instructions?: string | null;
      /**
       * Pickup address.
       *
       * This is set to the address of the restaurant.
       * @readonly
       */
      address?: CommonAddress;
  }
  /** Physical address */
  interface CommonAddress extends CommonAddressStreetOneOf {
      /** Street name and number. */
      streetAddress?: StreetAddress;
      /** Main address line, usually street and number as free text. */
      addressLine1?: string | null;
      /** Country code. */
      country?: string | null;
      /** Subdivision. Usually a state, region, prefecture, or province code, according to [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2). */
      subdivision?: string | null;
      /** City name. */
      city?: string | null;
      /** Zip/postal code. */
      postalCode?: string | null;
      /** Free text providing more detailed address info. Usually contains Apt, Suite, and Floor. */
      addressLine2?: string | null;
      /**
       * A string containing the full address of this location.
       * @internal
       */
      formatted?: string | null;
      /**
       * Coordinates of the physical address.
       * @internal
       */
      location?: AddressLocation;
      /**
       * Country full name.
       * @internal
       */
      countryFullname?: string | null;
      /**
       * Subdivision full name.
       * @internal
       */
      subdivisionFullname?: string | null;
      /**
       * Multi-level subdivisions from top to bottom.
       * @internal
       */
      subdivisions?: Subdivision[];
  }
  /** @oneof */
  interface CommonAddressStreetOneOf {
      /** Street name and number. */
      streetAddress?: StreetAddress;
      /** Main address line, usually street and number as free text. */
      addressLine?: string | null;
  }
  interface StreetAddress {
      /** Street number. */
      number?: string;
      /** Street name. */
      name?: string;
      /**
       * Apartment number.
       * @internal
       */
      apt?: string;
      /**
       * Optional address line 1
       * @internal
       */
      formattedAddressLine?: string | null;
  }
  interface AddressLocation {
      /** Address latitude. */
      latitude?: number | null;
      /** Address longitude. */
      longitude?: number | null;
  }
  interface Subdivision {
      /** Short subdivision code. */
      code?: string;
      /** Subdivision full name. */
      name?: string;
      /**
       * Subdivision level
       * @internal
       */
      type?: SubdivisionType;
      /**
       * Free text description of subdivision type.
       * @internal
       */
      typeInfo?: string | null;
  }
  enum SubdivisionType {
      UNKNOWN_SUBDIVISION_TYPE = "UNKNOWN_SUBDIVISION_TYPE",
      /** State */
      ADMINISTRATIVE_AREA_LEVEL_1 = "ADMINISTRATIVE_AREA_LEVEL_1",
      /** County */
      ADMINISTRATIVE_AREA_LEVEL_2 = "ADMINISTRATIVE_AREA_LEVEL_2",
      /** City/town */
      ADMINISTRATIVE_AREA_LEVEL_3 = "ADMINISTRATIVE_AREA_LEVEL_3",
      /** Neighborhood/quarter */
      ADMINISTRATIVE_AREA_LEVEL_4 = "ADMINISTRATIVE_AREA_LEVEL_4",
      /** Street/block */
      ADMINISTRATIVE_AREA_LEVEL_5 = "ADMINISTRATIVE_AREA_LEVEL_5",
      /** ADMINISTRATIVE_AREA_LEVEL_0. Indicates the national political entity, and is typically the highest order type returned by the Geocoder. */
      COUNTRY = "COUNTRY"
  }
  interface DeliveryInfo {
      /** Estimated delivery time in minutes. */
      deliveryTimeInMinutes?: number | null;
      /**
       * Threshold for offering free delivery.
       * If the order price exceeds this threshold, the delivery fee is waived.
       */
      freeDeliveryThreshold?: string | null;
      /** Delivery area supported by this delivery fulfillment method. */
      deliveryArea?: DeliveryArea;
      /**
       * Delivery provider app id.
       * @readonly
       */
      deliveryProviderAppId?: string | null;
      /** Pickup instructions for couriers. */
      courierPickupInstructions?: string | null;
  }
  interface DeliveryArea extends DeliveryAreaAreaOptionsOneOf {
      /** Settings for a radius delivery area. */
      radiusOptions?: Radius;
      /** Settings for a postal code delivery area. */
      postalCodeOptions?: PostalCode;
      /** Settings for a custom delivery area. */
      customOptions?: CustomArea;
      /** Type of delivery area. */
      type?: Type$1;
  }
  /** @oneof */
  interface DeliveryAreaAreaOptionsOneOf {
      /** Settings for a radius delivery area. */
      radiusOptions?: Radius;
      /** Settings for a postal code delivery area. */
      postalCodeOptions?: PostalCode;
      /** Settings for a custom delivery area. */
      customOptions?: CustomArea;
  }
  enum Type$1 {
      /** Unknown delivery area type. */
      UNKNOWN_DELIVERY_AREA = "UNKNOWN_DELIVERY_AREA",
      /** Delivery area defined by a radius around the restaurant's address. */
      RADIUS = "RADIUS",
      /** Delivery area defined by a list of postal codes. */
      POSTAL_CODE = "POSTAL_CODE",
      /** Delivery area defined by a custom polygon. */
      CUSTOM = "CUSTOM",
      /** Delivery area that is determined by the provider. Setting this option, you must also provide `delivery_provider_app_id`. */
      PROVIDER_DEFINED = "PROVIDER_DEFINED"
  }
  interface Radius {
      /**
       * Radius value.
       * The unit of the radius is specified in the `unit` field.
       * __Deprecated.__ Use `maxDistance` instead.
       * This property will be removed on {{Jan 18}}, {{2025}}.
       * @deprecated
       * @replacedBy max_distance
       * @targetRemovalDate 2025-01-18
       */
      value?: string | null;
      /**
       * Minimum distance value.
       * The unit of the radius is specified in the `unit` field.
       */
      minDistance?: string | null;
      /**
       * Maximum distance value.
       * The unit of the radius is specified in the `unit` field.
       */
      maxDistance?: string | null;
      /**
       * Address at the center of the circle.
       * @readonly
       */
      centerPointAddress?: CommonAddress;
      /** Unit of measurement of the radius. */
      unit?: Unit;
  }
  enum Unit {
      /** Unknown unit. */
      UNKNOWN_UNIT = "UNKNOWN_UNIT",
      /** Miles. */
      MILES = "MILES",
      /** Kilometers. */
      KILOMETERS = "KILOMETERS"
  }
  interface PostalCode {
      /**
       * Postal code of the delivery area.
       * @internal
       * @deprecated
       * @replacedBy postal_codes
       * @targetRemovalDate 2023-10-30
       */
      postalCode?: string | null;
      /**
       * Country code in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format.
       * @readonly
       */
      countryCode?: string | null;
      /**
       * List of postal codes and postal code regexes. For example, `10001`, `10002` or `1000*`.
       * A postal code regex will enable you to define a range of postal codes using an asterisk (*).
       * For example, to include the postal codes in the range of `10001`-`10009`, use `1000*`.
       */
      postalCodes?: string[] | null;
  }
  interface CustomArea {
      /** Geocodes of the polygon defining the delivery area. */
      geocodes?: AddressLocation[];
  }
  interface Availability {
      /** A list of availability times for the days of the week. */
      availableTimes?: DayOfWeekAvailability[];
      /**
       * The timezone in which the availability times are given.
       * @readonly
       */
      timeZone?: string | null;
  }
  interface DayOfWeekAvailability {
      /** The day of week this availability relates to. */
      dayOfWeek?: EntitiesDayOfWeek;
      /** A list of time ranges during which the fulfillment should be available. */
      timeRanges?: TimeOfDayRange[];
  }
  enum EntitiesDayOfWeek {
      /** Monday. */
      MON = "MON",
      /** Tuesday. */
      TUE = "TUE",
      /** Wednesday. */
      WED = "WED",
      /** Thursday. */
      THU = "THU",
      /** Friday. */
      FRI = "FRI",
      /** Saturday. */
      SAT = "SAT",
      /** Sunday. */
      SUN = "SUN"
  }
  interface TimeOfDayRange {
      /** The start time in time of day representation. */
      startTime?: TimeOfDay;
      /** The end time in time of day representation. */
      endTime?: TimeOfDay;
  }
  interface TimeOfDay {
      /**
       * Hours. <br />
       * Min: `0`. <br />
       * Max: `23`.
       */
      hours?: number;
      /**
       * Minutes. <br />
       * Min: `0`. <br />
       * Max: `23`.
       */
      minutes?: number;
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
  interface InvalidateCache extends InvalidateCacheGetByOneOf {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App;
      /** Invalidate by page id */
      page?: Page;
      /** Invalidate by URI path */
      uri?: URI;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App;
      /** Invalidate by page id */
      page?: Page;
      /** Invalidate by URI path */
      uri?: URI;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File;
  }
  interface App {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface CreateFulfillmentMethodRequest {
      /** Fulfillment method to create. */
      fulfillmentMethod: FulfillmentMethod;
  }
  interface CreateFulfillmentMethodResponse {
      /** The created fulfillment method. */
      fulfillmentMethod?: FulfillmentMethod;
  }
  interface BulkCreateFulfillmentMethodsRequest {
      /** Fulfillment methods to create. */
      fulfillmentMethods?: FulfillmentMethod[];
      /** If true, the created entities will be returned. */
      returnEntity?: boolean;
  }
  interface BulkCreateFulfillmentMethodsResponse {
      /** Information about the created fulfillment method. */
      results?: BulkCreateFulfillmentMethodResult[];
      /** Metadata for the API call. */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  interface BulkCreateFulfillmentMethodResult {
      /** Metadata for fulfillment method creation. */
      itemMetadata?: ItemMetadata$1;
      /** Created fulfillment method. */
      fulfillmentMethod?: FulfillmentMethod;
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
  interface GetFulfillmentMethodRequest {
      /** The ID of the fulfillment method to retrieve. */
      fulfillmentMethodId: string;
  }
  interface GetFulfillmentMethodResponse {
      /** The retrieved fulfillment method. */
      fulfillmentMethod?: FulfillmentMethod;
  }
  interface UpdateFulfillmentMethodRequest {
      /**
       * Fulfillment method to update.
       * The fulfillment method update may be partial with the use of `field_mask`.
       */
      fulfillmentMethod: FulfillmentMethod;
      /**
       * Field mask of the fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateFulfillmentMethodResponse {
      /** The updated fulfillment method. */
      fulfillmentMethod?: FulfillmentMethod;
  }
  interface DeleteFulfillmentMethodRequest {
      /** The ID of the fulfillment method to delete. */
      fulfillmentMethodId: string;
  }
  interface DeleteFulfillmentMethodResponse {
  }
  interface QueryFulfillmentMethodsRequest {
      /** The query by which to select fulfillment methods. */
      query?: CursorQuery$1;
      /**
       * Projection mask of the fields to return.
       * @internal
       * @deprecated Projection mask of the fields to return.
       */
      projectionMask?: string[];
  }
  interface CursorQuery$1 extends CursorQueryPagingMethodOneOf$1 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CommonCursorPaging;
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
      sort?: Sorting$1[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$1 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CommonCursorPaging;
  }
  interface Sorting$1 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$1;
  }
  enum SortOrder$1 {
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
  interface QueryFulfillmentMethodsResponse {
      /** The retrieved fulfillment methods. */
      fulfillmentMethods?: FulfillmentMethod[];
      /** The metadata of the paginated results. */
      pagingMetadata?: CommonCursorPagingMetadata;
  }
  interface CommonCursorPagingMetadata {
      /** Number of items returned in the response. */
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
  }
  interface CommonCursors {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface ListFulfillmentMethodsRequest {
      /**
       * The address by which to filter delivery fulfillment methods.
       * @internal
       * @deprecated The address by which to filter delivery fulfillment methods.
       */
      address?: CommonAddress;
      /** Cursor paging */
      cursorPaging?: CommonCursorPaging;
  }
  interface ListFulfillmentMethodsResponse {
      /** The retrieved fulfillment methods. */
      fulfillmentMethods?: FulfillmentMethod[];
      /** The metadata of the paginated results. */
      pagingMetadata?: CommonCursorPagingMetadata;
  }
  interface ListAvailableFulfillmentMethodsForAddressRequest {
      /** The address by which to filter delivery fulfillment methods. */
      address?: CommonAddress;
      /** Cursor paging */
      cursorPaging?: CommonCursorPaging;
      /** If provided, only fulfillment methods with the given IDs will be returned. */
      fulfillmentMethodIds?: string[];
  }
  interface ListAvailableFulfillmentMethodsForAddressResponse {
      /** The retrieved fulfillment methods. */
      fulfillmentMethods?: FulfillmentMethod[];
      /** The metadata of the paginated results. */
      pagingMetadata?: CommonCursorPagingMetadata;
  }
  interface ListActiveFulfillmentMethodsRequest {
      /** Only fulfillment methods with the given IDs will be returned. */
      fulfillmentMethodIds?: string[];
      /** Cursor paging */
      cursorPaging?: CommonCursorPaging;
  }
  interface ListActiveFulfillmentMethodsResponse {
      /** The enabled fulfillment methods. */
      fulfillmentMethods?: FulfillmentMethod[];
      /** The metadata of the paginated results. */
      pagingMetadata?: CommonCursorPagingMetadata;
  }
  interface GetAccumulatedFulfillmentMethodsAvailabilityRequest {
      /** fulfillment method ids to check availability for. */
      fulfillmentMethodIds?: string[];
  }
  interface GetAccumulatedFulfillmentMethodsAvailabilityResponse {
      /** The accumulated availability of all fulfillment methods. */
      availability?: Availability;
      /** Fulfillment methods types that accumulate availability. */
      types?: FulfillmentMethodType[];
  }
  interface GetCombinedMethodAvailabilityRequest {
      /** IDs of fulfillment methods used to determine the combined availability. */
      fulfillmentMethodIds: string[];
  }
  interface GetCombinedMethodAvailabilityResponse {
      /** The combined availability of the given fulfillment methods. */
      combinedAvailability?: Availability;
      /** Types of fulfillment methods available during at least some the combined availability's `availableTimes`. */
      fulfillmentTypes?: FulfillmentMethodType[];
  }
  /** Encapsulates all details written to the Greyhound topic when a site's properties are updated. */
  interface SitePropertiesNotification {
      /** The site ID for which this update notification applies. */
      metasiteId?: string;
      /** The actual update event. */
      event?: SitePropertiesEvent;
      /** A convenience set of mappings from the MetaSite ID to its constituent services. */
      translations?: Translation[];
      /** Context of the notification */
      changeContext?: ChangeContext;
  }
  /** The actual update event for a particular notification. */
  interface SitePropertiesEvent {
      /** Version of the site's properties represented by this update. */
      version?: number;
      /**
       * Set of properties that were updated - corresponds to the fields in "properties".
       * @internal
       */
      fields?: string[];
      /** Updated properties. */
      properties?: Properties;
  }
  interface Properties {
      /** Site categories. */
      categories?: Categories;
      /** Site locale. */
      locale?: Locale$1;
      /**
       * Site language.
       *
       * Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format.
       */
      language?: string | null;
      /**
       * Site currency format used to bill customers.
       *
       * Three-letter currency code in [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
       */
      paymentCurrency?: string | null;
      /** Timezone in `America/New_York` format. */
      timeZone?: string | null;
      /** Email address. */
      email?: string | null;
      /** Phone number. */
      phone?: string | null;
      /** Fax number. */
      fax?: string | null;
      /** Address. */
      address?: Address;
      /** Site display name. */
      siteDisplayName?: string | null;
      /** Business name. */
      businessName?: string | null;
      /** Path to the site's logo in Wix Media (without Wix Media base URL). */
      logo?: string | null;
      /** Site description. */
      description?: string | null;
      /**
       * Business schedule. Regular and exceptional time periods when the business is open or the service is available.
       *
       * __Note:__ Not supported by Wix Bookings.
       */
      businessSchedule?: BusinessSchedule;
      /** Supported languages of a site and the primary language. */
      multilingual?: Multilingual;
      /** Cookie policy the Wix user defined for their site (before the site visitor interacts with/limits it). */
      consentPolicy?: ConsentPolicy;
      /**
       * Supported values: `FITNESS SERVICE`, `RESTAURANT`, `BLOG`, `STORE`, `EVENT`, `UNKNOWN`.
       *
       * Site business type.
       */
      businessConfig?: string | null;
      /** External site URL that uses Wix as its headless business solution. */
      externalSiteUrl?: string | null;
      /** Track clicks analytics. */
      trackClicksAnalytics?: boolean;
  }
  interface Categories {
      /** Primary site category. */
      primary?: string;
      /** Secondary site category. */
      secondary?: string[];
      /** Business Term Id */
      businessTermId?: string | null;
  }
  interface Locale$1 {
      /** Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. */
      languageCode?: string;
      /** Two-letter country code in [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) format. */
      country?: string;
  }
  interface Address {
      /** Street name. */
      street?: string;
      /** City name. */
      city?: string;
      /** Two-letter country code in an [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. */
      country?: string;
      /** State. */
      state?: string;
      /** Zip or postal code. */
      zip?: string;
      /** Extra information to be displayed in the address. */
      hint?: AddressHint;
      /** Whether this address represents a physical location. */
      isPhysical?: boolean;
      /** Google-formatted version of this address. */
      googleFormattedAddress?: string;
      /** Street number. */
      streetNumber?: string;
      /** Apartment number. */
      apartmentNumber?: string;
      /** Geographic coordinates of location. */
      coordinates?: GeoCoordinates;
  }
  /**
   * Extra information on displayed addresses.
   * This is used for display purposes. Used to add additional data about the address, such as "In the passage".
   * Free text. In addition, the user can state where to display the additional description - before, after, or instead of the address string.
   */
  interface AddressHint {
      /** Extra text displayed next to, or instead of, the actual address. */
      text?: string;
      /** Where the extra text should be displayed. */
      placement?: PlacementType;
  }
  /** Where the extra text should be displayed: before, after or instead of the actual address. */
  enum PlacementType {
      BEFORE = "BEFORE",
      AFTER = "AFTER",
      REPLACE = "REPLACE"
  }
  /** Geocoordinates for a particular address. */
  interface GeoCoordinates {
      /** Latitude of the location. Must be between -90 and 90. */
      latitude?: number;
      /** Longitude of the location. Must be between -180 and 180. */
      longitude?: number;
  }
  /** Business schedule. Regular and exceptional time periods when the business is open or the service is available. */
  interface BusinessSchedule {
      /** Weekly recurring time periods when the business is regularly open or the service is available. Limited to 100 time periods. */
      periods?: TimePeriod[];
      /** Exceptions to the business's regular hours. The business can be open or closed during the exception. */
      specialHourPeriod?: SpecialHourPeriod[];
  }
  /** Weekly recurring time periods when the business is regularly open or the service is available. */
  interface TimePeriod {
      /** Day of the week the period starts on. */
      openDay?: DayOfWeek;
      /**
       * Time the period starts in 24-hour [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) extended format. Valid values are `00:00` to `24:00`, where `24:00` represents
       * midnight at the end of the specified day.
       */
      openTime?: string;
      /** Day of the week the period ends on. */
      closeDay?: DayOfWeek;
      /**
       * Time the period ends in 24-hour [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) extended format. Valid values are `00:00` to `24:00`, where `24:00` represents
       * midnight at the end of the specified day.
       *
       * __Note:__ If `openDay` and `closeDay` specify the same day of the week `closeTime` must be later than `openTime`.
       */
      closeTime?: string;
  }
  /** Enumerates the days of the week. */
  enum DayOfWeek {
      MONDAY = "MONDAY",
      TUESDAY = "TUESDAY",
      WEDNESDAY = "WEDNESDAY",
      THURSDAY = "THURSDAY",
      FRIDAY = "FRIDAY",
      SATURDAY = "SATURDAY",
      SUNDAY = "SUNDAY"
  }
  /** Exception to the business's regular hours. The business can be open or closed during the exception. */
  interface SpecialHourPeriod {
      /** Start date and time of the exception in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format and [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time). */
      startDate?: string;
      /** End date and time of the exception in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format and [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time). */
      endDate?: string;
      /**
       * Whether the business is closed (or the service is not available) during the exception.
       *
       * Default: `true`.
       */
      isClosed?: boolean;
      /** Additional info about the exception. For example, "We close earlier on New Year's Eve." */
      comment?: string;
  }
  interface Multilingual {
      /** Supported languages list. */
      supportedLanguages?: SupportedLanguage[];
      /** Whether to redirect to user language. */
      autoRedirect?: boolean;
  }
  interface SupportedLanguage {
      /** Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. */
      languageCode?: string;
      /** Locale. */
      locale?: Locale$1;
      /** Whether the supported language is the primary language for the site. */
      isPrimary?: boolean;
      /** Language icon. */
      countryCode?: string;
      /** How the language will be resolved. For internal use. */
      resolutionMethod?: ResolutionMethod;
  }
  enum ResolutionMethod {
      QUERY_PARAM = "QUERY_PARAM",
      SUBDOMAIN = "SUBDOMAIN",
      SUBDIRECTORY = "SUBDIRECTORY"
  }
  interface ConsentPolicy {
      /** Whether the site uses cookies that are essential to site operation. */
      essential?: boolean | null;
      /** Whether the site uses cookies that affect site performance and other functional measurements. */
      functional?: boolean | null;
      /** Whether the site uses cookies that collect analytics about how the site is used (in order to improve it). */
      analytics?: boolean | null;
      /** Whether the site uses cookies that collect information allowing better customization of the experience for a current visitor. */
      advertising?: boolean | null;
      /** CCPA compliance flag. */
      dataToThirdParty?: boolean | null;
  }
  /** A single mapping from the MetaSite ID to a particular service. */
  interface Translation {
      /** The service type. */
      serviceType?: string;
      /** The application definition ID; this only applies to services of type ThirdPartyApps. */
      appDefId?: string;
      /** The instance ID of the service. */
      instanceId?: string;
  }
  interface ChangeContext extends ChangeContextPayloadOneOf {
      /** Properties were updated. */
      propertiesChange?: PropertiesChange;
      /** Default properties were created on site creation. */
      siteCreated?: SiteCreated;
      /** Properties were cloned on site cloning. */
      siteCloned?: SiteCloned;
  }
  /** @oneof */
  interface ChangeContextPayloadOneOf {
      /** Properties were updated. */
      propertiesChange?: PropertiesChange;
      /** Default properties were created on site creation. */
      siteCreated?: SiteCreated;
      /** Properties were cloned on site cloning. */
      siteCloned?: SiteCloned;
  }
  interface PropertiesChange {
  }
  interface SiteCreated {
      /** Origin template site id. */
      originTemplateId?: string | null;
  }
  interface SiteCloned {
      /** Origin site id. */
      originMetaSiteId?: string;
  }
  interface Empty {
  }
  /**
   * Creates a new fulfillment method.
   *
   * >**Note:** `fulfillmentMethod.availability.time_zone` uses the time zone specified in the [`language and regions`](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Fsettings/language-and-region) settings in the dashboard, regardless of the value provided.
   * @param fulfillmentMethod - Fulfillment method to create.
   * @public
   * @documentationMaturity preview
   * @requiredField fulfillmentMethod
   * @requiredField fulfillmentMethod.availability.timeZone
   * @requiredField fulfillmentMethod.deliveryOptions.deliveryArea
   * @requiredField fulfillmentMethod.deliveryOptions.deliveryArea.postalCodeOptions.countryCode
   * @requiredField fulfillmentMethod.deliveryOptions.deliveryArea.radiusOptions.centerPointAddress
   * @requiredField fulfillmentMethod.pickupOptions.address
   * @permissionId RESTAURANTS.FULFILLMENT_METHOD_CREATE
   * @adminMethod
   * @returns The created fulfillment method.
   */
  function createFulfillmentMethod(fulfillmentMethod: FulfillmentMethod): Promise<FulfillmentMethod>;
  /**
   * Create multiple fulfillment methods at once.
   * @internal
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.FULFILLMENT_METHOD_CREATE
   * @adminMethod
   */
  function bulkCreateFulfillmentMethods(options?: BulkCreateFulfillmentMethodsOptions): Promise<BulkCreateFulfillmentMethodsResponse>;
  interface BulkCreateFulfillmentMethodsOptions {
      /** Fulfillment methods to create. */
      fulfillmentMethods?: FulfillmentMethod[];
      /** If true, the created entities will be returned. */
      returnEntity?: boolean;
  }
  /**
   * Retrieves a fulfillment method.
   * @param fulfillmentMethodId - The ID of the fulfillment method to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField fulfillmentMethodId
   * @permissionId RESTAURANTS.FULFILLMENT_METHOD_READ
   * @returns The retrieved fulfillment method.
   */
  function getFulfillmentMethod(fulfillmentMethodId: string): Promise<FulfillmentMethod>;
  /**
   * Updates a fulfillment method.
   *
   * Each time the fulfillment method is updated, its revision increments by 1. The existing revision must be included when updating the fulfillment method. This ensures you're working with the latest fulfillment method information, and it prevents unintended overwrites.
   * @param _id - Fulfillment method ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField fulfillmentMethod
   * @requiredField fulfillmentMethod.revision
   * @param fulfillmentMethod - Fulfillment method information to update.
   * @permissionId RESTAURANTS.FULFILLMENT_METHOD_UPDATE
   * @adminMethod
   * @returns The updated fulfillment method.
   */
  function updateFulfillmentMethod(_id: string | null, fulfillmentMethod: UpdateFulfillmentMethod, options?: UpdateFulfillmentMethodOptions): Promise<FulfillmentMethod>;
  interface UpdateFulfillmentMethod {
      /** Data specific for pickup fulfillment method. */
      pickupOptions?: PickupInfo;
      /** Data specific for delivery fulfillment method. */
      deliveryOptions?: DeliveryInfo;
      /**
       * Fulfillment method ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * The current state of an item. Each time the item is modified, its `revision` changes by the server. for an update operation to succeed, you MUST pass the latest revision.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the fulfillment method was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the fulfillment method was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Type of fulfillment method. */
      type?: FulfillmentMethodType;
      /** Fulfillment method name. */
      name?: string | null;
      /** Whether the fulfillment method is enabled. */
      enabled?: boolean | null;
      /** Fee for using this fulfillment method. */
      fee?: string | null;
      /** Availability of this fulfillment method. */
      availability?: Availability;
      /** Minimum order price to qualify for using this fulfillment method. */
      minOrderPrice?: string | null;
      /**
       * @internal
       * @readonly
       */
      oldFulfillmentMethodId?: string | null;
      /**
       * Location ID associated with the fulfillment method.
       * @internal
       * @readonly
       */
      locationId?: string | null;
  }
  interface UpdateFulfillmentMethodOptions {
      /**
       * Field mask of the fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Deletes a fulfillment method.
   * @param fulfillmentMethodId - The ID of the fulfillment method to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField fulfillmentMethodId
   * @permissionId RESTAURANTS.FULFILLMENT_METHOD_DELETE
   * @adminMethod
   */
  function deleteFulfillmentMethod(fulfillmentMethodId: string): Promise<void>;
  /**
   * Creates a query to retrieve a list of fulfillment methods.
   *
   * The `queryFulfillmentMethods()` function builds a query to retrieve a list of fulfillment methods and returns a `FulfillmentMethodsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is used to run the query using the [`find()`](/fulfillment-methods/fulfillment-methods-query-builder/find) function.
   *
   * You can refine the query by chaining `FulfillmentMethodsQueryBuilder` functions onto the query. `FulfillmentMethodsQueryBuilder` functions enable you to filter, sort, and control the results that `queryFulfillmentMethods()` returns.
   *
   * `queryFulfillmentMethods()` runs with the following `FulfillmentMethodsQueryBuilder` defaults, which you can override:
   *
   * * [`limit(50)`](/fulfillment-methods/fulfillment-methods-query-builder/limit)
   * * [`ascending('entityId')`](/fulfillment-methods/fulfillment-methods-query-builder/ascending)
   *
   * The following `FulfillmentMethodsQueryBuilder` functions are supported for `queryFulfillmentMethods()`. For a full description of the fulfillment method object, see the object returned for the [`items`](/fulfillment-methods/fulfillment-methods-query-result/items) property in `FulfillmentMethodsQueryResult`.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.FULFILLMENT_METHOD_READ
   */
  function queryFulfillmentMethods(options?: QueryFulfillmentMethodsOptions): FulfillmentMethodsQueryBuilder;
  interface QueryFulfillmentMethodsOptions {
      /**
       * Projection mask of the fields to return.
       * @internal
       * @deprecated Projection mask of the fields to return.
       */
      projectionMask?: string[] | undefined;
  }
  interface QueryCursorResult$1 {
      cursors: CommonCursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface FulfillmentMethodsQueryResult extends QueryCursorResult$1 {
      items: FulfillmentMethod[];
      query: FulfillmentMethodsQueryBuilder;
      next: () => Promise<FulfillmentMethodsQueryResult>;
      prev: () => Promise<FulfillmentMethodsQueryResult>;
  }
  interface FulfillmentMethodsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'type' | 'name' | 'enabled' | 'fee' | 'minOrderPrice', value: any) => FulfillmentMethodsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'type' | 'name' | 'enabled' | 'fee' | 'minOrderPrice', value: any) => FulfillmentMethodsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => FulfillmentMethodsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => FulfillmentMethodsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => FulfillmentMethodsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => FulfillmentMethodsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'name' | 'fee' | 'minOrderPrice', value: string) => FulfillmentMethodsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'type' | 'name' | 'enabled' | 'fee' | 'minOrderPrice', value: any[]) => FulfillmentMethodsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'type' | 'name' | 'enabled' | 'fee' | 'minOrderPrice', value: any) => FulfillmentMethodsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'type' | 'name' | 'enabled' | 'fee' | 'minOrderPrice', value: boolean) => FulfillmentMethodsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | '_createdDate' | '_updatedDate' | 'type' | 'name' | 'enabled' | 'fee' | 'minOrderPrice'>) => FulfillmentMethodsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | '_createdDate' | '_updatedDate' | 'type' | 'name' | 'enabled' | 'fee' | 'minOrderPrice'>) => FulfillmentMethodsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => FulfillmentMethodsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => FulfillmentMethodsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<FulfillmentMethodsQueryResult>;
  }
  /**
   * Retrieves a list of up to 100 fulfillment methods.
   * @public
   * @documentationMaturity preview
   * @param options - Options for listing the fulfillment methods.
   * @permissionId RESTAURANTS.FULFILLMENT_METHOD_READ
   */
  function listFulfillmentMethods(options?: ListFulfillmentMethodsOptions): Promise<ListFulfillmentMethodsResponse>;
  interface ListFulfillmentMethodsOptions {
      /**
       * The address by which to filter delivery fulfillment methods.
       * @internal
       * @deprecated The address by which to filter delivery fulfillment methods.
       */
      address?: CommonAddress;
      /** Cursor paging */
      cursorPaging?: CommonCursorPaging;
  }
  /**
   * Retrieves a list of up to 100 fulfillment methods available for a given address.
   *
   * The response will only include:
   * - Non-delivery fulfillment methods.
   * - Delivery fulfillment methods that are available to the given address according to their delivery areas.
   * @public
   * @documentationMaturity preview
   * @param options - Options for listing the available fulfillment methods.
   * @permissionId RESTAURANTS.FULFILLMENT_METHOD_READ
   */
  function listAvailableFulfillmentMethodsForAddress(options?: ListAvailableFulfillmentMethodsForAddressOptions): Promise<ListAvailableFulfillmentMethodsForAddressResponse>;
  interface ListAvailableFulfillmentMethodsForAddressOptions {
      /** The address by which to filter delivery fulfillment methods. */
      address?: CommonAddress;
      /** Cursor paging */
      cursorPaging?: CommonCursorPaging;
      /** If provided, only fulfillment methods with the given IDs will be returned. */
      fulfillmentMethodIds?: string[];
  }
  /**
   * Retrieves a list of up to 100 enabled fulfillment methods.
   *
   * The response will only include:
   * - External provider deliveries that are enabled and are returned as active by the provider.
   * - Enabled fulfillment methods that are not external provider deliveries.
   * @internal
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.FULFILLMENT_METHOD_READ
   */
  function listActiveFulfillmentMethods(options?: ListActiveFulfillmentMethodsOptions): Promise<ListActiveFulfillmentMethodsResponse>;
  interface ListActiveFulfillmentMethodsOptions {
      /** Only fulfillment methods with the given IDs will be returned. */
      fulfillmentMethodIds?: string[];
      /** Cursor paging */
      cursorPaging?: CommonCursorPaging;
  }
  /**
   * Retrieves the accumulated availability of all fulfillment methods.
   * @public
   * @documentationMaturity preview
   * @permissionId RESTAURANTS.FULFILLMENT_METHOD_READ
   * @deprecated method is deprecated due to...
   * @replacedBy GetCombinedMethodAvailability
   * @targetRemovalDate 2024-09-29
   */
  function getAccumulatedFulfillmentMethodsAvailability(options?: GetAccumulatedFulfillmentMethodsAvailabilityOptions): Promise<GetAccumulatedFulfillmentMethodsAvailabilityResponse>;
  interface GetAccumulatedFulfillmentMethodsAvailabilityOptions {
      /** fulfillment method ids to check availability for. */
      fulfillmentMethodIds?: string[];
  }
  /**
   * Retrieves the combined availability of a list of fulfillment methods.
   *
   * The combined availability is a list of times during which one or more of the given fulfillment methods is available, and the types of those fulfillment methods.
   * @param fulfillmentMethodIds - IDs of fulfillment methods used to determine the combined availability.
   * @public
   * @documentationMaturity preview
   * @requiredField fulfillmentMethodIds
   * @permissionId RESTAURANTS.FULFILLMENT_METHOD_READ
   */
  function getCombinedMethodAvailability(fulfillmentMethodIds: string[]): Promise<GetCombinedMethodAvailabilityResponse>;
  
  type restaurantsV1FulfillmentMethod_universal_d_FulfillmentMethod = FulfillmentMethod;
  type restaurantsV1FulfillmentMethod_universal_d_FulfillmentMethodMethodOptionsOneOf = FulfillmentMethodMethodOptionsOneOf;
  type restaurantsV1FulfillmentMethod_universal_d_FulfillmentMethodType = FulfillmentMethodType;
  const restaurantsV1FulfillmentMethod_universal_d_FulfillmentMethodType: typeof FulfillmentMethodType;
  type restaurantsV1FulfillmentMethod_universal_d_PickupInfo = PickupInfo;
  type restaurantsV1FulfillmentMethod_universal_d_CommonAddress = CommonAddress;
  type restaurantsV1FulfillmentMethod_universal_d_CommonAddressStreetOneOf = CommonAddressStreetOneOf;
  type restaurantsV1FulfillmentMethod_universal_d_StreetAddress = StreetAddress;
  type restaurantsV1FulfillmentMethod_universal_d_AddressLocation = AddressLocation;
  type restaurantsV1FulfillmentMethod_universal_d_Subdivision = Subdivision;
  type restaurantsV1FulfillmentMethod_universal_d_SubdivisionType = SubdivisionType;
  const restaurantsV1FulfillmentMethod_universal_d_SubdivisionType: typeof SubdivisionType;
  type restaurantsV1FulfillmentMethod_universal_d_DeliveryInfo = DeliveryInfo;
  type restaurantsV1FulfillmentMethod_universal_d_DeliveryArea = DeliveryArea;
  type restaurantsV1FulfillmentMethod_universal_d_DeliveryAreaAreaOptionsOneOf = DeliveryAreaAreaOptionsOneOf;
  type restaurantsV1FulfillmentMethod_universal_d_Radius = Radius;
  type restaurantsV1FulfillmentMethod_universal_d_Unit = Unit;
  const restaurantsV1FulfillmentMethod_universal_d_Unit: typeof Unit;
  type restaurantsV1FulfillmentMethod_universal_d_PostalCode = PostalCode;
  type restaurantsV1FulfillmentMethod_universal_d_CustomArea = CustomArea;
  type restaurantsV1FulfillmentMethod_universal_d_Availability = Availability;
  type restaurantsV1FulfillmentMethod_universal_d_DayOfWeekAvailability = DayOfWeekAvailability;
  type restaurantsV1FulfillmentMethod_universal_d_EntitiesDayOfWeek = EntitiesDayOfWeek;
  const restaurantsV1FulfillmentMethod_universal_d_EntitiesDayOfWeek: typeof EntitiesDayOfWeek;
  type restaurantsV1FulfillmentMethod_universal_d_TimeOfDayRange = TimeOfDayRange;
  type restaurantsV1FulfillmentMethod_universal_d_TimeOfDay = TimeOfDay;
  type restaurantsV1FulfillmentMethod_universal_d_InvalidateCache = InvalidateCache;
  type restaurantsV1FulfillmentMethod_universal_d_InvalidateCacheGetByOneOf = InvalidateCacheGetByOneOf;
  type restaurantsV1FulfillmentMethod_universal_d_App = App;
  type restaurantsV1FulfillmentMethod_universal_d_Page = Page;
  type restaurantsV1FulfillmentMethod_universal_d_URI = URI;
  type restaurantsV1FulfillmentMethod_universal_d_File = File;
  type restaurantsV1FulfillmentMethod_universal_d_CreateFulfillmentMethodRequest = CreateFulfillmentMethodRequest;
  type restaurantsV1FulfillmentMethod_universal_d_CreateFulfillmentMethodResponse = CreateFulfillmentMethodResponse;
  type restaurantsV1FulfillmentMethod_universal_d_BulkCreateFulfillmentMethodsRequest = BulkCreateFulfillmentMethodsRequest;
  type restaurantsV1FulfillmentMethod_universal_d_BulkCreateFulfillmentMethodsResponse = BulkCreateFulfillmentMethodsResponse;
  type restaurantsV1FulfillmentMethod_universal_d_BulkCreateFulfillmentMethodResult = BulkCreateFulfillmentMethodResult;
  type restaurantsV1FulfillmentMethod_universal_d_GetFulfillmentMethodRequest = GetFulfillmentMethodRequest;
  type restaurantsV1FulfillmentMethod_universal_d_GetFulfillmentMethodResponse = GetFulfillmentMethodResponse;
  type restaurantsV1FulfillmentMethod_universal_d_UpdateFulfillmentMethodRequest = UpdateFulfillmentMethodRequest;
  type restaurantsV1FulfillmentMethod_universal_d_UpdateFulfillmentMethodResponse = UpdateFulfillmentMethodResponse;
  type restaurantsV1FulfillmentMethod_universal_d_DeleteFulfillmentMethodRequest = DeleteFulfillmentMethodRequest;
  type restaurantsV1FulfillmentMethod_universal_d_DeleteFulfillmentMethodResponse = DeleteFulfillmentMethodResponse;
  type restaurantsV1FulfillmentMethod_universal_d_QueryFulfillmentMethodsRequest = QueryFulfillmentMethodsRequest;
  type restaurantsV1FulfillmentMethod_universal_d_CommonCursorPaging = CommonCursorPaging;
  type restaurantsV1FulfillmentMethod_universal_d_QueryFulfillmentMethodsResponse = QueryFulfillmentMethodsResponse;
  type restaurantsV1FulfillmentMethod_universal_d_CommonCursorPagingMetadata = CommonCursorPagingMetadata;
  type restaurantsV1FulfillmentMethod_universal_d_CommonCursors = CommonCursors;
  type restaurantsV1FulfillmentMethod_universal_d_ListFulfillmentMethodsRequest = ListFulfillmentMethodsRequest;
  type restaurantsV1FulfillmentMethod_universal_d_ListFulfillmentMethodsResponse = ListFulfillmentMethodsResponse;
  type restaurantsV1FulfillmentMethod_universal_d_ListAvailableFulfillmentMethodsForAddressRequest = ListAvailableFulfillmentMethodsForAddressRequest;
  type restaurantsV1FulfillmentMethod_universal_d_ListAvailableFulfillmentMethodsForAddressResponse = ListAvailableFulfillmentMethodsForAddressResponse;
  type restaurantsV1FulfillmentMethod_universal_d_ListActiveFulfillmentMethodsRequest = ListActiveFulfillmentMethodsRequest;
  type restaurantsV1FulfillmentMethod_universal_d_ListActiveFulfillmentMethodsResponse = ListActiveFulfillmentMethodsResponse;
  type restaurantsV1FulfillmentMethod_universal_d_GetAccumulatedFulfillmentMethodsAvailabilityRequest = GetAccumulatedFulfillmentMethodsAvailabilityRequest;
  type restaurantsV1FulfillmentMethod_universal_d_GetAccumulatedFulfillmentMethodsAvailabilityResponse = GetAccumulatedFulfillmentMethodsAvailabilityResponse;
  type restaurantsV1FulfillmentMethod_universal_d_GetCombinedMethodAvailabilityRequest = GetCombinedMethodAvailabilityRequest;
  type restaurantsV1FulfillmentMethod_universal_d_GetCombinedMethodAvailabilityResponse = GetCombinedMethodAvailabilityResponse;
  type restaurantsV1FulfillmentMethod_universal_d_SitePropertiesNotification = SitePropertiesNotification;
  type restaurantsV1FulfillmentMethod_universal_d_SitePropertiesEvent = SitePropertiesEvent;
  type restaurantsV1FulfillmentMethod_universal_d_Properties = Properties;
  type restaurantsV1FulfillmentMethod_universal_d_Categories = Categories;
  type restaurantsV1FulfillmentMethod_universal_d_Address = Address;
  type restaurantsV1FulfillmentMethod_universal_d_AddressHint = AddressHint;
  type restaurantsV1FulfillmentMethod_universal_d_PlacementType = PlacementType;
  const restaurantsV1FulfillmentMethod_universal_d_PlacementType: typeof PlacementType;
  type restaurantsV1FulfillmentMethod_universal_d_GeoCoordinates = GeoCoordinates;
  type restaurantsV1FulfillmentMethod_universal_d_BusinessSchedule = BusinessSchedule;
  type restaurantsV1FulfillmentMethod_universal_d_TimePeriod = TimePeriod;
  type restaurantsV1FulfillmentMethod_universal_d_DayOfWeek = DayOfWeek;
  const restaurantsV1FulfillmentMethod_universal_d_DayOfWeek: typeof DayOfWeek;
  type restaurantsV1FulfillmentMethod_universal_d_SpecialHourPeriod = SpecialHourPeriod;
  type restaurantsV1FulfillmentMethod_universal_d_Multilingual = Multilingual;
  type restaurantsV1FulfillmentMethod_universal_d_SupportedLanguage = SupportedLanguage;
  type restaurantsV1FulfillmentMethod_universal_d_ResolutionMethod = ResolutionMethod;
  const restaurantsV1FulfillmentMethod_universal_d_ResolutionMethod: typeof ResolutionMethod;
  type restaurantsV1FulfillmentMethod_universal_d_ConsentPolicy = ConsentPolicy;
  type restaurantsV1FulfillmentMethod_universal_d_Translation = Translation;
  type restaurantsV1FulfillmentMethod_universal_d_ChangeContext = ChangeContext;
  type restaurantsV1FulfillmentMethod_universal_d_ChangeContextPayloadOneOf = ChangeContextPayloadOneOf;
  type restaurantsV1FulfillmentMethod_universal_d_PropertiesChange = PropertiesChange;
  type restaurantsV1FulfillmentMethod_universal_d_SiteCreated = SiteCreated;
  type restaurantsV1FulfillmentMethod_universal_d_SiteCloned = SiteCloned;
  type restaurantsV1FulfillmentMethod_universal_d_Empty = Empty;
  const restaurantsV1FulfillmentMethod_universal_d_createFulfillmentMethod: typeof createFulfillmentMethod;
  const restaurantsV1FulfillmentMethod_universal_d_bulkCreateFulfillmentMethods: typeof bulkCreateFulfillmentMethods;
  type restaurantsV1FulfillmentMethod_universal_d_BulkCreateFulfillmentMethodsOptions = BulkCreateFulfillmentMethodsOptions;
  const restaurantsV1FulfillmentMethod_universal_d_getFulfillmentMethod: typeof getFulfillmentMethod;
  const restaurantsV1FulfillmentMethod_universal_d_updateFulfillmentMethod: typeof updateFulfillmentMethod;
  type restaurantsV1FulfillmentMethod_universal_d_UpdateFulfillmentMethod = UpdateFulfillmentMethod;
  type restaurantsV1FulfillmentMethod_universal_d_UpdateFulfillmentMethodOptions = UpdateFulfillmentMethodOptions;
  const restaurantsV1FulfillmentMethod_universal_d_deleteFulfillmentMethod: typeof deleteFulfillmentMethod;
  const restaurantsV1FulfillmentMethod_universal_d_queryFulfillmentMethods: typeof queryFulfillmentMethods;
  type restaurantsV1FulfillmentMethod_universal_d_QueryFulfillmentMethodsOptions = QueryFulfillmentMethodsOptions;
  type restaurantsV1FulfillmentMethod_universal_d_FulfillmentMethodsQueryResult = FulfillmentMethodsQueryResult;
  type restaurantsV1FulfillmentMethod_universal_d_FulfillmentMethodsQueryBuilder = FulfillmentMethodsQueryBuilder;
  const restaurantsV1FulfillmentMethod_universal_d_listFulfillmentMethods: typeof listFulfillmentMethods;
  type restaurantsV1FulfillmentMethod_universal_d_ListFulfillmentMethodsOptions = ListFulfillmentMethodsOptions;
  const restaurantsV1FulfillmentMethod_universal_d_listAvailableFulfillmentMethodsForAddress: typeof listAvailableFulfillmentMethodsForAddress;
  type restaurantsV1FulfillmentMethod_universal_d_ListAvailableFulfillmentMethodsForAddressOptions = ListAvailableFulfillmentMethodsForAddressOptions;
  const restaurantsV1FulfillmentMethod_universal_d_listActiveFulfillmentMethods: typeof listActiveFulfillmentMethods;
  type restaurantsV1FulfillmentMethod_universal_d_ListActiveFulfillmentMethodsOptions = ListActiveFulfillmentMethodsOptions;
  const restaurantsV1FulfillmentMethod_universal_d_getAccumulatedFulfillmentMethodsAvailability: typeof getAccumulatedFulfillmentMethodsAvailability;
  type restaurantsV1FulfillmentMethod_universal_d_GetAccumulatedFulfillmentMethodsAvailabilityOptions = GetAccumulatedFulfillmentMethodsAvailabilityOptions;
  const restaurantsV1FulfillmentMethod_universal_d_getCombinedMethodAvailability: typeof getCombinedMethodAvailability;
  namespace restaurantsV1FulfillmentMethod_universal_d {
    export {
      restaurantsV1FulfillmentMethod_universal_d_FulfillmentMethod as FulfillmentMethod,
      restaurantsV1FulfillmentMethod_universal_d_FulfillmentMethodMethodOptionsOneOf as FulfillmentMethodMethodOptionsOneOf,
      restaurantsV1FulfillmentMethod_universal_d_FulfillmentMethodType as FulfillmentMethodType,
      restaurantsV1FulfillmentMethod_universal_d_PickupInfo as PickupInfo,
      restaurantsV1FulfillmentMethod_universal_d_CommonAddress as CommonAddress,
      restaurantsV1FulfillmentMethod_universal_d_CommonAddressStreetOneOf as CommonAddressStreetOneOf,
      restaurantsV1FulfillmentMethod_universal_d_StreetAddress as StreetAddress,
      restaurantsV1FulfillmentMethod_universal_d_AddressLocation as AddressLocation,
      restaurantsV1FulfillmentMethod_universal_d_Subdivision as Subdivision,
      restaurantsV1FulfillmentMethod_universal_d_SubdivisionType as SubdivisionType,
      restaurantsV1FulfillmentMethod_universal_d_DeliveryInfo as DeliveryInfo,
      restaurantsV1FulfillmentMethod_universal_d_DeliveryArea as DeliveryArea,
      restaurantsV1FulfillmentMethod_universal_d_DeliveryAreaAreaOptionsOneOf as DeliveryAreaAreaOptionsOneOf,
      Type$1 as Type,
      restaurantsV1FulfillmentMethod_universal_d_Radius as Radius,
      restaurantsV1FulfillmentMethod_universal_d_Unit as Unit,
      restaurantsV1FulfillmentMethod_universal_d_PostalCode as PostalCode,
      restaurantsV1FulfillmentMethod_universal_d_CustomArea as CustomArea,
      restaurantsV1FulfillmentMethod_universal_d_Availability as Availability,
      restaurantsV1FulfillmentMethod_universal_d_DayOfWeekAvailability as DayOfWeekAvailability,
      restaurantsV1FulfillmentMethod_universal_d_EntitiesDayOfWeek as EntitiesDayOfWeek,
      restaurantsV1FulfillmentMethod_universal_d_TimeOfDayRange as TimeOfDayRange,
      restaurantsV1FulfillmentMethod_universal_d_TimeOfDay as TimeOfDay,
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
      restaurantsV1FulfillmentMethod_universal_d_InvalidateCache as InvalidateCache,
      restaurantsV1FulfillmentMethod_universal_d_InvalidateCacheGetByOneOf as InvalidateCacheGetByOneOf,
      restaurantsV1FulfillmentMethod_universal_d_App as App,
      restaurantsV1FulfillmentMethod_universal_d_Page as Page,
      restaurantsV1FulfillmentMethod_universal_d_URI as URI,
      restaurantsV1FulfillmentMethod_universal_d_File as File,
      restaurantsV1FulfillmentMethod_universal_d_CreateFulfillmentMethodRequest as CreateFulfillmentMethodRequest,
      restaurantsV1FulfillmentMethod_universal_d_CreateFulfillmentMethodResponse as CreateFulfillmentMethodResponse,
      restaurantsV1FulfillmentMethod_universal_d_BulkCreateFulfillmentMethodsRequest as BulkCreateFulfillmentMethodsRequest,
      restaurantsV1FulfillmentMethod_universal_d_BulkCreateFulfillmentMethodsResponse as BulkCreateFulfillmentMethodsResponse,
      restaurantsV1FulfillmentMethod_universal_d_BulkCreateFulfillmentMethodResult as BulkCreateFulfillmentMethodResult,
      ItemMetadata$1 as ItemMetadata,
      ApplicationError$1 as ApplicationError,
      BulkActionMetadata$1 as BulkActionMetadata,
      restaurantsV1FulfillmentMethod_universal_d_GetFulfillmentMethodRequest as GetFulfillmentMethodRequest,
      restaurantsV1FulfillmentMethod_universal_d_GetFulfillmentMethodResponse as GetFulfillmentMethodResponse,
      restaurantsV1FulfillmentMethod_universal_d_UpdateFulfillmentMethodRequest as UpdateFulfillmentMethodRequest,
      restaurantsV1FulfillmentMethod_universal_d_UpdateFulfillmentMethodResponse as UpdateFulfillmentMethodResponse,
      restaurantsV1FulfillmentMethod_universal_d_DeleteFulfillmentMethodRequest as DeleteFulfillmentMethodRequest,
      restaurantsV1FulfillmentMethod_universal_d_DeleteFulfillmentMethodResponse as DeleteFulfillmentMethodResponse,
      restaurantsV1FulfillmentMethod_universal_d_QueryFulfillmentMethodsRequest as QueryFulfillmentMethodsRequest,
      CursorQuery$1 as CursorQuery,
      CursorQueryPagingMethodOneOf$1 as CursorQueryPagingMethodOneOf,
      Sorting$1 as Sorting,
      SortOrder$1 as SortOrder,
      restaurantsV1FulfillmentMethod_universal_d_CommonCursorPaging as CommonCursorPaging,
      restaurantsV1FulfillmentMethod_universal_d_QueryFulfillmentMethodsResponse as QueryFulfillmentMethodsResponse,
      restaurantsV1FulfillmentMethod_universal_d_CommonCursorPagingMetadata as CommonCursorPagingMetadata,
      restaurantsV1FulfillmentMethod_universal_d_CommonCursors as CommonCursors,
      restaurantsV1FulfillmentMethod_universal_d_ListFulfillmentMethodsRequest as ListFulfillmentMethodsRequest,
      restaurantsV1FulfillmentMethod_universal_d_ListFulfillmentMethodsResponse as ListFulfillmentMethodsResponse,
      restaurantsV1FulfillmentMethod_universal_d_ListAvailableFulfillmentMethodsForAddressRequest as ListAvailableFulfillmentMethodsForAddressRequest,
      restaurantsV1FulfillmentMethod_universal_d_ListAvailableFulfillmentMethodsForAddressResponse as ListAvailableFulfillmentMethodsForAddressResponse,
      restaurantsV1FulfillmentMethod_universal_d_ListActiveFulfillmentMethodsRequest as ListActiveFulfillmentMethodsRequest,
      restaurantsV1FulfillmentMethod_universal_d_ListActiveFulfillmentMethodsResponse as ListActiveFulfillmentMethodsResponse,
      restaurantsV1FulfillmentMethod_universal_d_GetAccumulatedFulfillmentMethodsAvailabilityRequest as GetAccumulatedFulfillmentMethodsAvailabilityRequest,
      restaurantsV1FulfillmentMethod_universal_d_GetAccumulatedFulfillmentMethodsAvailabilityResponse as GetAccumulatedFulfillmentMethodsAvailabilityResponse,
      restaurantsV1FulfillmentMethod_universal_d_GetCombinedMethodAvailabilityRequest as GetCombinedMethodAvailabilityRequest,
      restaurantsV1FulfillmentMethod_universal_d_GetCombinedMethodAvailabilityResponse as GetCombinedMethodAvailabilityResponse,
      restaurantsV1FulfillmentMethod_universal_d_SitePropertiesNotification as SitePropertiesNotification,
      restaurantsV1FulfillmentMethod_universal_d_SitePropertiesEvent as SitePropertiesEvent,
      restaurantsV1FulfillmentMethod_universal_d_Properties as Properties,
      restaurantsV1FulfillmentMethod_universal_d_Categories as Categories,
      Locale$1 as Locale,
      restaurantsV1FulfillmentMethod_universal_d_Address as Address,
      restaurantsV1FulfillmentMethod_universal_d_AddressHint as AddressHint,
      restaurantsV1FulfillmentMethod_universal_d_PlacementType as PlacementType,
      restaurantsV1FulfillmentMethod_universal_d_GeoCoordinates as GeoCoordinates,
      restaurantsV1FulfillmentMethod_universal_d_BusinessSchedule as BusinessSchedule,
      restaurantsV1FulfillmentMethod_universal_d_TimePeriod as TimePeriod,
      restaurantsV1FulfillmentMethod_universal_d_DayOfWeek as DayOfWeek,
      restaurantsV1FulfillmentMethod_universal_d_SpecialHourPeriod as SpecialHourPeriod,
      restaurantsV1FulfillmentMethod_universal_d_Multilingual as Multilingual,
      restaurantsV1FulfillmentMethod_universal_d_SupportedLanguage as SupportedLanguage,
      restaurantsV1FulfillmentMethod_universal_d_ResolutionMethod as ResolutionMethod,
      restaurantsV1FulfillmentMethod_universal_d_ConsentPolicy as ConsentPolicy,
      restaurantsV1FulfillmentMethod_universal_d_Translation as Translation,
      restaurantsV1FulfillmentMethod_universal_d_ChangeContext as ChangeContext,
      restaurantsV1FulfillmentMethod_universal_d_ChangeContextPayloadOneOf as ChangeContextPayloadOneOf,
      restaurantsV1FulfillmentMethod_universal_d_PropertiesChange as PropertiesChange,
      restaurantsV1FulfillmentMethod_universal_d_SiteCreated as SiteCreated,
      restaurantsV1FulfillmentMethod_universal_d_SiteCloned as SiteCloned,
      restaurantsV1FulfillmentMethod_universal_d_Empty as Empty,
      restaurantsV1FulfillmentMethod_universal_d_createFulfillmentMethod as createFulfillmentMethod,
      restaurantsV1FulfillmentMethod_universal_d_bulkCreateFulfillmentMethods as bulkCreateFulfillmentMethods,
      restaurantsV1FulfillmentMethod_universal_d_BulkCreateFulfillmentMethodsOptions as BulkCreateFulfillmentMethodsOptions,
      restaurantsV1FulfillmentMethod_universal_d_getFulfillmentMethod as getFulfillmentMethod,
      restaurantsV1FulfillmentMethod_universal_d_updateFulfillmentMethod as updateFulfillmentMethod,
      restaurantsV1FulfillmentMethod_universal_d_UpdateFulfillmentMethod as UpdateFulfillmentMethod,
      restaurantsV1FulfillmentMethod_universal_d_UpdateFulfillmentMethodOptions as UpdateFulfillmentMethodOptions,
      restaurantsV1FulfillmentMethod_universal_d_deleteFulfillmentMethod as deleteFulfillmentMethod,
      restaurantsV1FulfillmentMethod_universal_d_queryFulfillmentMethods as queryFulfillmentMethods,
      restaurantsV1FulfillmentMethod_universal_d_QueryFulfillmentMethodsOptions as QueryFulfillmentMethodsOptions,
      restaurantsV1FulfillmentMethod_universal_d_FulfillmentMethodsQueryResult as FulfillmentMethodsQueryResult,
      restaurantsV1FulfillmentMethod_universal_d_FulfillmentMethodsQueryBuilder as FulfillmentMethodsQueryBuilder,
      restaurantsV1FulfillmentMethod_universal_d_listFulfillmentMethods as listFulfillmentMethods,
      restaurantsV1FulfillmentMethod_universal_d_ListFulfillmentMethodsOptions as ListFulfillmentMethodsOptions,
      restaurantsV1FulfillmentMethod_universal_d_listAvailableFulfillmentMethodsForAddress as listAvailableFulfillmentMethodsForAddress,
      restaurantsV1FulfillmentMethod_universal_d_ListAvailableFulfillmentMethodsForAddressOptions as ListAvailableFulfillmentMethodsForAddressOptions,
      restaurantsV1FulfillmentMethod_universal_d_listActiveFulfillmentMethods as listActiveFulfillmentMethods,
      restaurantsV1FulfillmentMethod_universal_d_ListActiveFulfillmentMethodsOptions as ListActiveFulfillmentMethodsOptions,
      restaurantsV1FulfillmentMethod_universal_d_getAccumulatedFulfillmentMethodsAvailability as getAccumulatedFulfillmentMethodsAvailability,
      restaurantsV1FulfillmentMethod_universal_d_GetAccumulatedFulfillmentMethodsAvailabilityOptions as GetAccumulatedFulfillmentMethodsAvailabilityOptions,
      restaurantsV1FulfillmentMethod_universal_d_getCombinedMethodAvailability as getCombinedMethodAvailability,
    };
  }
  
  interface Rule extends RuleValueOneOf, RuleRequirementsOneOf, RuleConditionsOneOf, RuleConditionTypeOptionsOneOf, RuleTaxesOneOf {
      /**
       * Fixed fee. Must hold a positive value.
       * @deprecated Fixed fee. Must hold a positive value.
       * @replacedBy fixed_fee
       * @targetRemovalDate 2024-02-15
       */
      amount?: Money;
      /**
       * Percentage fee. For example, `5` represents a 5% fee applied to the order's total.
       * @deprecated
       * @replacedBy percentage_fee
       * @targetRemovalDate 2024-02-15
       */
      percentage?: string | null;
      /** Fixed fee. Must hold a positive value. */
      fixedFee?: CommonMoney;
      /**
       * Percentage fee. For example, 5 represents a 5% fee applied to the order's total.
       *
       * Min: `0`.
       *
       * Max: `100`.
       */
      percentageFee?: string | null;
      /**
       * Single condition that must be met for the rule to be applied to an order.
       * @deprecated Single condition that must be met for the rule to be applied to an order.
       * @replacedBy condition_options
       * @targetRemovalDate 2024-02-15
       */
      condition?: Condition;
      /**
       * Binary tree of conditions. Use the operator to indicate whether only one or both conditions must be met in order for a service fee rule to be applied to an order.
       * @deprecated Binary tree of conditions. Use the operator to indicate whether only one or both conditions must be met in order for a service fee rule to be applied to an order.
       * @replacedBy condition_tree_options
       * @targetRemovalDate 2024-02-15
       */
      conditionTree?: ConditionTree;
      /** Single condition that must be met for the rule to be applied to an order. */
      conditionOptions?: Condition;
      /** Binary tree of conditions. Use the operator to indicate whether only one or both conditions must be met in order for a service fee rule to be applied to an order. */
      conditionTreeOptions?: ConditionTree;
      /** Percentage value to apply as a custom tax rate. Range: [0-100]. */
      customTaxRate?: string | null;
      /** Tax group ID. Internal only. */
      taxGroupId?: string | null;
      /**
       * Rule ID.
       * @readonly
       */
      _id?: string | null;
      /** ID of the restaurant’s [location](/locations/introduction). */
      locationId?: string | null;
      /** Rule name. */
      name?: string | null;
      /**
       * Date and time the rule was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the rule was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Percentage value to apply as a custom tax rate. For example, `5` respresents a 5% fee applied to the order's total. <br />
       * Min: '0'. <br />
       * Max: `100`.
       * @deprecated
       * @replacedBy taxes
       * @targetRemovalDate 2023-09-16
       */
      taxRate?: string | null;
      /**
       * Specifies the type of condition.
       * @deprecated Specifies the type of condition.
       * @replacedBy condition_type
       * @targetRemovalDate 2024-02-15
       */
      conditionsType?: ConditionsType;
      /** Specifies the type of condition. */
      conditionType?: ConditionType;
      /** Whether the rule is enabled. If `true`, the rule is evaluated when service fees are calculated. If `false`, the rule will not be evaluated when service fees are calculated. */
      enabled?: boolean | null;
      /**
       * Revision number. Increments by 1 each time the rule is updated.
       * To prevent conflicting changes, the existing `revision` must be used when updating a rule.
       * @readonly
       */
      revision?: string | null;
      /**
       * DEPRECATED. Defines the app that the rule is connected to.
       * @deprecated DEPRECATED. Defines the app that the rule is connected to.
       * @replacedBy app_id
       * @targetRemovalDate 2023-02-19
       */
      label?: string | null;
      /** Defines the app that the rule is connected to. */
      appId?: string | null;
      /**
       * Rounding strategy to apply to fee and tax calculation.
       *
       * Supported values:
       *
       * - `"HALF_UP"`: Rounds up any number exactly halfway between two integers. For example, `2.5` rounds to `3`, and `3.5` and rounds to `4`.
       * - `"HALF_EVEN"`: Rounds such numbers to the nearest even integer. For example, `2.5` rounds to `2`, but `3.5` rounds to `4`.
       * - `"UNKNOWN_ROUNDING_STRATEGY"`
       */
      roundingStrategy?: RoundingStrategy;
  }
  /** @oneof */
  interface RuleValueOneOf {
      /**
       * Fixed fee. Must hold a positive value.
       * @deprecated Fixed fee. Must hold a positive value.
       * @replacedBy fixed_fee
       * @targetRemovalDate 2024-02-15
       */
      amount?: Money;
      /**
       * Percentage fee. For example, `5` represents a 5% fee applied to the order's total.
       * @deprecated
       * @replacedBy percentage_fee
       * @targetRemovalDate 2024-02-15
       */
      percentage?: string | null;
  }
  /** @oneof */
  interface RuleRequirementsOneOf {
      /** Fixed fee. Must hold a positive value. */
      fixedFee?: CommonMoney;
      /**
       * Percentage fee. For example, 5 represents a 5% fee applied to the order's total.
       *
       * Min: `0`.
       *
       * Max: `100`.
       */
      percentageFee?: string | null;
  }
  /** @oneof */
  interface RuleConditionsOneOf {
      /**
       * Single condition that must be met for the rule to be applied to an order.
       * @deprecated Single condition that must be met for the rule to be applied to an order.
       * @replacedBy condition_options
       * @targetRemovalDate 2024-02-15
       */
      condition?: Condition;
      /**
       * Binary tree of conditions. Use the operator to indicate whether only one or both conditions must be met in order for a service fee rule to be applied to an order.
       * @deprecated Binary tree of conditions. Use the operator to indicate whether only one or both conditions must be met in order for a service fee rule to be applied to an order.
       * @replacedBy condition_tree_options
       * @targetRemovalDate 2024-02-15
       */
      conditionTree?: ConditionTree;
  }
  /** @oneof */
  interface RuleConditionTypeOptionsOneOf {
      /** Single condition that must be met for the rule to be applied to an order. */
      conditionOptions?: Condition;
      /** Binary tree of conditions. Use the operator to indicate whether only one or both conditions must be met in order for a service fee rule to be applied to an order. */
      conditionTreeOptions?: ConditionTree;
  }
  /** @oneof */
  interface RuleTaxesOneOf {
      /** Percentage value to apply as a custom tax rate. Range: [0-100]. */
      customTaxRate?: string | null;
      /** Tax group ID. Internal only. */
      taxGroupId?: string | null;
  }
  /**
   * Money.
   * Default format to use. Sufficiently compliant with majority of standards: w3c, ISO 4217, ISO 20022, ISO 8583:2003.
   */
  interface Money {
      /** Monetary amount. Decimal string with a period as a decimal separator (e.g., 3.99). Optionally, a single (-), to indicate that the amount is negative. */
      value?: string;
      /** Currency code. Must be valid ISO 4217 currency code (e.g., USD). */
      currency?: string;
      /** Monetary amount. Decimal string in local format (e.g., 1 000,30). Optionally, a single (-), to indicate that the amount is negative. */
      formattedValue?: string | null;
  }
  /**
   * Money.
   * Default format to use. Sufficiently compliant with majority of standards: w3c, ISO 4217, ISO 20022, ISO 8583:2003.
   */
  interface CommonMoney {
      /** Monetary amount. Decimal string with a period as a decimal separator (e.g., 3.99). Optionally, a single (-), to indicate that the amount is negative. */
      value?: string;
      /** Currency code. Must be valid ISO 4217 currency code (e.g., USD). */
      currency?: string;
      /** Monetary amount. Decimal string in local format (e.g., 1 000,30). Optionally, a single (-), to indicate that the amount is negative. */
      formattedValue?: string | null;
  }
  interface Condition extends ConditionValueOneOf {
      /**
       * Contains a numeric value and an operation.
       *
       * Required if `expectedFieldType` is `NUMBER`.
       */
      number?: _Number;
      /**
       * Contains an array of strings to compare with the value of the specified field. If the value of the field matches a string in the array, the condition is considered met.
       *
       * Required if `expectedFieldType` is `LIST`.
       */
      list?: List;
      /**
       * Path of the field in the order entity that this condition will evaluate. For example, `priceSummary.subtotal`.
       * @deprecated
       * @replacedBy order_field_path
       * @targetRemovalDate 2024-02-15
       */
      path?: string;
      /** Path of the field in the order entity that this condition will evaluate. For example, `priceSummary.subtotal`. */
      orderFieldPath?: string;
      /**
       * Type of the field specified in `orderFieldPath`. For example, the type of `priceSummary.subtotal` is `"NUMBER"`).
       * @deprecated Type of the field specified in `orderFieldPath`. For example, the type of `priceSummary.subtotal` is `"NUMBER"`).
       * @replacedBy expected_field_type
       * @targetRemovalDate 2024-02-15
       */
      expectedType?: ExpectedType;
      /** Type of the field specified in `orderFieldPath`. For example, the type of `priceSummary.subtotal` is `"NUMBER"`). */
      expectedFieldType?: ExpectedFieldType;
  }
  /** @oneof */
  interface ConditionValueOneOf {
      /**
       * Contains a numeric value and an operation.
       *
       * Required if `expectedFieldType` is `NUMBER`.
       */
      number?: _Number;
      /**
       * Contains an array of strings to compare with the value of the specified field. If the value of the field matches a string in the array, the condition is considered met.
       *
       * Required if `expectedFieldType` is `LIST`.
       */
      list?: List;
  }
  interface ExpectedType {
      /** Type of the field specified in `orderFieldPath`. */
      value?: Value;
  }
  enum Value {
      /** Represents a number value. */
      NUMBER = "NUMBER",
      /** Represents a list of strings values - Not supported yet. */
      LIST = "LIST",
      /** Represents a string value. */
      STRING = "STRING"
  }
  enum ExpectedFieldType {
      /** Unknown expected field type */
      UNKNOWN_EXPECTED_FIELD_TYPE = "UNKNOWN_EXPECTED_FIELD_TYPE",
      /** Represents a number value. */
      NUMBER = "NUMBER",
      /** Represents a list of strings values - Not supported yet. */
      LIST = "LIST",
      /** Represents a string value. */
      STRING = "STRING"
  }
  interface _Number {
      /** Numeric value to compare with the value of the specified field. */
      value?: number;
      /**
       * Operation to use.
       *
       * Supported values:
       *
       * - `"EQ"`: Equal to.
       * - `"LT"`: Strictly less than.
       * - `"LE"`: Less than or equal to.
       * - `"GT"`: Strictly greater than.
       * - `"GE"`: Greater than or equal to.
       */
      operation?: Operation;
  }
  enum Operation {
      /** Equal to. */
      EQ = "EQ",
      /** Strictly less than. */
      LT = "LT",
      /** Less than or equal to. */
      LE = "LE",
      /** Strictly greater than. */
      GT = "GT",
      /** Greater than or equal to. */
      GE = "GE"
  }
  interface List {
      /** Array of string values to compare with the value of the field. If the value of the fields matches a string in the array, the condition is considered met. */
      values?: string[];
  }
  /** Used to represent a logical condition in the form of a tree structure. */
  interface ConditionTree extends ConditionTreeLeftConditionNodeOneOf, ConditionTreeRightConditionNodeOneOf {
      /** Single condition that must be met for the rule to be applied to an order. */
      leftCondition?: Condition;
      /** Binary tree of conditions. Use the operator to indicate whether only one or both conditions must be met in order for a service fee rule to be applied to an order. */
      leftConditionsTree?: ConditionTree;
      /** Single condition that must be met for the rule to be applied to an order. */
      rightCondition?: Condition;
      /** Binary tree of conditions. Use the operator to indicate whether only one or both conditions must be met in order for a service fee rule to be applied to an order. */
      rightConditionsTree?: ConditionTree;
      /** Specifies the logical operator to use when combining the evaluation of the left and right conditions. */
      operator?: Operator;
  }
  /** @oneof */
  interface ConditionTreeLeftConditionNodeOneOf {
      /** Single condition that must be met for the rule to be applied to an order. */
      leftCondition?: Condition;
      /** Binary tree of conditions. Use the operator to indicate whether only one or both conditions must be met in order for a service fee rule to be applied to an order. */
      leftConditionsTree?: ConditionTree;
  }
  /** @oneof */
  interface ConditionTreeRightConditionNodeOneOf {
      /** Single condition that must be met for the rule to be applied to an order. */
      rightCondition?: Condition;
      /** Binary tree of conditions. Use the operator to indicate whether only one or both conditions must be met in order for a service fee rule to be applied to an order. */
      rightConditionsTree?: ConditionTree;
  }
  enum Operator {
      /** The condition is true if both the left and right sides are true. */
      AND = "AND",
      /** The condition is true if either the left or right side is true. */
      OR = "OR"
  }
  enum ConditionsType {
      /** Indicates that the Rule has no conditions specified. */
      NO_CONDITIONS = "NO_CONDITIONS",
      /** Indicates that the Rule has a single Condition. */
      CONDITION = "CONDITION",
      /** Indicates that the Rule has a complex condition specified as a ConditionTree. */
      CONDITION_TREE = "CONDITION_TREE"
  }
  enum ConditionType {
      /** Indicates that the Rule has no conditions specified. */
      UNDEFINED_CONDITION_TYPE = "UNDEFINED_CONDITION_TYPE",
      /** Indicates that the Rule has a single Condition. */
      CONDITION = "CONDITION",
      /** Indicates that the Rule has a complex condition specified as a ConditionTree. */
      CONDITION_TREE = "CONDITION_TREE"
  }
  enum RoundingStrategy {
      /** Unknown rounding strategy */
      UNKNOWN_ROUNDING_STRATEGY = "UNKNOWN_ROUNDING_STRATEGY",
      /** Half-up rounding strategy - relevant for fee and percentage fee calculation. */
      HALF_UP = "HALF_UP",
      /** Half-even rounding strategy - relevant for fee and percentage fee calculation. */
      HALF_EVEN = "HALF_EVEN"
  }
  interface CalculateServiceFeesRequest {
      /** Order information needed to evaluate the rules and calculate the relevant fees. */
      order: Order;
      /**
       * DEPRECATED. Defines the app that the rule is connected to.
       * @deprecated DEPRECATED. Defines the app that the rule is connected to.
       * @replacedBy app_id
       * @targetRemovalDate 2023-02-19
       */
      label?: string | null;
      /** Defines the app that the rule is connected to. */
      appId?: string | null;
  }
  interface Order {
      /**
       * Order ID.
       * @readonly
       */
      _id?: string;
      /** ID of the site's location. */
      locationId?: string | null;
      /** Currency used for pricing on the site. */
      currency?: string | null;
      /** Information about the price of the order. */
      priceSummary?: PriceSummary;
      /** Order's shipping information. */
      shippingInfo?: ShippingInformation;
      /** Platform on which the order was placed. */
      platform?: Platform;
      /** Order's locale. */
      locale?: Locale;
  }
  interface PriceSummary {
      /** Subtotal of the order. */
      subtotal?: string;
  }
  interface ShippingInformation {
      /** Information about the type of delivery. For example, pick-up. */
      logistics?: DeliveryLogistics;
  }
  interface DeliveryLogistics {
      /**
       * Type of delivery.
       *
       * Supported values:
       * - `"UNSPECIFIED_FULFILLMENT_TYPE"`
       * - `"PICKUP"`
       * - `"DELIVERY"`
       * - `"DINE_IN"`
       * - `"CURBSIDE_PICKUP"`
       */
      type?: Type;
  }
  enum Type {
      /** Missing type due to an error. */
      UNSPECIFIED_FULFILLMENT_TYPE = "UNSPECIFIED_FULFILLMENT_TYPE",
      /** Pickup */
      PICKUP = "PICKUP",
      /** Delivery */
      DELIVERY = "DELIVERY",
      /** Dine-in */
      DINE_IN = "DINE_IN",
      /** Curbside-pickup */
      CURBSIDE_PICKUP = "CURBSIDE_PICKUP"
  }
  interface Platform {
      /**
       * Platform on which the order was placed.
       *
       * Supported values:
       * - `"SITE"`
       * - `"MOBILE_SITE"`
       * - `"MOBILE_APP"`
       */
      value?: PlatformValue;
  }
  enum PlatformValue {
      /** Site */
      SITE = "SITE",
      /** Mobile site */
      MOBILE_SITE = "MOBILE_SITE",
      /** Mobile app */
      MOBILE_APP = "MOBILE_APP"
  }
  interface Locale {
      /**
       * Locale in [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) format.
       * Typically, this is a lowercase 2-letter language code,
       * followed by a hyphen, followed by an uppercase 2-letter country code.
       * For example, `en-US` for U.S. English, and `de-DE` for Germany German.
       */
      languageCode?: string | null;
      /** 2-letter country code in [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) format. */
      country?: string | null;
  }
  interface CalculateServiceFeesResponse {
      /** A list of calculated fees based on rules evaluation. */
      calculatedFees?: CalculatedFee[];
  }
  interface CalculatedFee {
      /** The ID of the rule that was used to calculate the fee. */
      ruleId?: string;
      /**
       * The name of the rule that was used to calculate the fee.
       * @readonly
       */
      name?: string;
      /** Fee amount. */
      fee?: CommonMoney;
      /** Tax amount. */
      tax?: CommonMoney;
      /** Tax group ID. This is an alternative to calculating the tax amount manually. */
      taxGroupId?: string | null;
  }
  interface CreateRuleRequest {
      /** Rule to create. */
      rule: Rule;
  }
  interface CreateRuleResponse {
      /** Created rule */
      rule?: Rule;
  }
  interface GetRuleRequest {
      /** ID of the rule to retrieve. */
      ruleId: string;
  }
  interface GetRuleResponse {
      /** The retrieved rule. */
      rule?: Rule;
  }
  interface UpdateRuleRequest {
      /** Rule to update. */
      rule: Rule;
      /**
       * List of fields to update in the rule.
       * @internal
       */
      mask?: string[];
  }
  interface UpdateRuleResponse {
      /** Updated rule. */
      rule?: Rule;
  }
  interface DeleteRuleRequest {
      /** ID of the rule to delete. */
      ruleId: string;
  }
  interface DeleteRuleResponse {
  }
  interface ListRulesRequest {
      /** Retrieve only rule that apply at the [location](https://dev.wix.com/docs/rest/api-reference/business-tools/locations/location-object) with this ID. If this field is `null`, the rules will not be filtered by location. */
      locationId?: string | null;
      /**
       * DEPRECATED. Defines the app that the rule is connected to.
       * @deprecated DEPRECATED. Defines the app that the rule is connected to.
       * @replacedBy app_id
       * @targetRemovalDate 2023-02-19
       */
      label?: string | null;
      /** Defines the app that the rule is connected to. */
      appId?: string | null;
  }
  interface ListRulesResponse {
      /** Array containing the retrieved rules. */
      rules?: Rule[];
  }
  interface QueryRulesRequest {
      /** Query options. */
      query: CursorQuery;
  }
  interface CursorQuery extends CursorQueryPagingMethodOneOf {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
      /**
       * Filter object.
       * See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language)
       * for more information.
       *
       * For a detailed list of supported filters, see
       * [Supported Filters](/supported-filters-and-sorting).
       */
      filter?: Record<string, any> | null;
      /** Sort object. */
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
      /**
       * Sort order.
       *
       * Supported values:
       * - `"ASC"`
       * - `"DESC"`
       */
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
      /**
       * Number of items to load. <br />
       * Default: `50`
       */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * You can get the relevant cursor token
       * from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface QueryRulesResponse {
      /** The retrieved rules. */
      rules?: Rule[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata;
  }
  interface CursorPagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      cursors?: Cursors;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface BulkCreateRulesRequest {
      /** Rules to create. */
      rules: Rule[];
      /**
       * Whether the full rule entity is returned. <br />
       * Default: `false`.
       */
      returnFullEntity?: boolean;
  }
  interface BulkCreateRulesResponse {
      /** The created rules. Omitted if `returnFullEntity` is set to false. */
      results?: BulkRuleResult[];
      /** Bulk Create Rule metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkRuleResult {
      /** Metadata of the rule. */
      itemMetadata?: ItemMetadata;
      /** The created rule. */
      rule?: Rule;
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
  interface BulkUpdateRulesRequest {
      /** Masked rules to update. */
      rules: MaskedRule[];
      /**
       * Whether the full rule entity is returned. <br />
       * Default: `false`.
       */
      returnFullEntity?: boolean;
  }
  interface MaskedRule {
      /** Rule to update. */
      rule?: Rule;
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  interface BulkUpdateRulesResponse {
      /** The updated rules. Omitted if `returnFullEntity` is set to false. */
      results?: BulkRuleResult[];
      /** Bulk Update Rule metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkDeleteRulesRequest {
      /** IDs of the rules to delete. */
      ruleIds: string[];
  }
  interface BulkDeleteRulesResponse {
      /** Information about the deleted rules. */
      results?: BulkRuleResult[];
      /** Bulk Delete Rule metadata. */
      bulkActionMetadata?: BulkActionMetadata;
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
   * The `calculateServiceFees()` function returns a Promise that resolves to an array containing the calculated fees.
   *
   *
   * The specified order information is evaluated against all rules created for the site. If the rule conditions are met, the service fee set in the rule is applied. Otherwise, no service fee is added.
   * @param order - Order information needed to evaluate the rules and calculate the relevant fees.
   * @public
   * @documentationMaturity preview
   * @requiredField order
   * @requiredField order.currency
   * @requiredField order.priceSummary
   * @permissionId WIX_RESTAURANTS.SERVICE_FEES_READ
   */
  function calculateServiceFees(order: Order, options?: CalculateServiceFeesOptions): Promise<CalculateServiceFeesResponse>;
  interface CalculateServiceFeesOptions {
      /**
       * DEPRECATED. Defines the app that the rule is connected to.
       * @deprecated DEPRECATED. Defines the app that the rule is connected to.
       * @replacedBy app_id
       * @targetRemovalDate 2023-02-19
       */
      label?: string | null;
      /** Defines the app that the rule is connected to. */
      appId?: string | null;
  }
  /**
   * The `createRule()` function returns a Promise that resolves to the created rule.
   *
   *
   * To create multiple rules at once, use the `bulkCreateRules()` function.
   * @param rule - Rule to create.
   * @public
   * @documentationMaturity preview
   * @requiredField rule
   * @requiredField rule.enabled
   * @requiredField rule.name
   * @permissionId WIX_RESTAURANTS.SERVICE_FEES_RULES_CREATE
   * @adminMethod
   * @returns Created rule
   */
  function createRule(rule: Rule): Promise<Rule>;
  /**
   * The `createRule()` function returns a Promise that resolves to the retrieved rule.
   * @param ruleId - ID of the rule to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField ruleId
   * @permissionId WIX_RESTAURANTS.SERVICE_FEES_RULES_READ
   * @returns The retrieved rule.
   */
  function getRule(ruleId: string): Promise<Rule>;
  /**
   * The `updateRule()` function returns a Promise that resolves to the updated rule.
   *
   *
   * Each time the task is updated, `revision` increments by 1. The existing `revision` must be included when updating the task. This ensures you're working with the latest task and prevents unintended overwrites.
   *
   * To update multiple rules at once, use the `bulkUpdateRules()` function.
   * @param _id - Rule ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField rule
   * @requiredField rule.revision
   * @permissionId WIX_RESTAURANTS.SERVICE_FEES_RULES_UPDATE
   * @adminMethod
   * @returns Updated rule.
   */
  function updateRule(_id: string | null, rule: UpdateRule, options?: UpdateRuleOptions): Promise<Rule>;
  interface UpdateRule {
      /**
       * Fixed fee. Must hold a positive value.
       * @deprecated Fixed fee. Must hold a positive value.
       * @replacedBy fixed_fee
       * @targetRemovalDate 2024-02-15
       */
      amount?: Money;
      /**
       * Percentage fee. For example, `5` represents a 5% fee applied to the order's total.
       * @deprecated
       * @replacedBy percentage_fee
       * @targetRemovalDate 2024-02-15
       */
      percentage?: string | null;
      /** Fixed fee. Must hold a positive value. */
      fixedFee?: CommonMoney;
      /**
       * Percentage fee. For example, 5 represents a 5% fee applied to the order's total.
       *
       * Min: `0`.
       *
       * Max: `100`.
       */
      percentageFee?: string | null;
      /**
       * Single condition that must be met for the rule to be applied to an order.
       * @deprecated Single condition that must be met for the rule to be applied to an order.
       * @replacedBy condition_options
       * @targetRemovalDate 2024-02-15
       */
      condition?: Condition;
      /**
       * Binary tree of conditions. Use the operator to indicate whether only one or both conditions must be met in order for a service fee rule to be applied to an order.
       * @deprecated Binary tree of conditions. Use the operator to indicate whether only one or both conditions must be met in order for a service fee rule to be applied to an order.
       * @replacedBy condition_tree_options
       * @targetRemovalDate 2024-02-15
       */
      conditionTree?: ConditionTree;
      /** Single condition that must be met for the rule to be applied to an order. */
      conditionOptions?: Condition;
      /** Binary tree of conditions. Use the operator to indicate whether only one or both conditions must be met in order for a service fee rule to be applied to an order. */
      conditionTreeOptions?: ConditionTree;
      /** Percentage value to apply as a custom tax rate. Range: [0-100]. */
      customTaxRate?: string | null;
      /** Tax group ID. Internal only. */
      taxGroupId?: string | null;
      /**
       * Rule ID.
       * @readonly
       */
      _id?: string | null;
      /** ID of the restaurant’s [location](/locations/introduction). */
      locationId?: string | null;
      /** Rule name. */
      name?: string | null;
      /**
       * Date and time the rule was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the rule was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Percentage value to apply as a custom tax rate. For example, `5` respresents a 5% fee applied to the order's total. <br />
       * Min: '0'. <br />
       * Max: `100`.
       * @deprecated
       * @replacedBy taxes
       * @targetRemovalDate 2023-09-16
       */
      taxRate?: string | null;
      /**
       * Specifies the type of condition.
       * @deprecated Specifies the type of condition.
       * @replacedBy condition_type
       * @targetRemovalDate 2024-02-15
       */
      conditionsType?: ConditionsType;
      /** Specifies the type of condition. */
      conditionType?: ConditionType;
      /** Whether the rule is enabled. If `true`, the rule is evaluated when service fees are calculated. If `false`, the rule will not be evaluated when service fees are calculated. */
      enabled?: boolean | null;
      /**
       * Revision number. Increments by 1 each time the rule is updated.
       * To prevent conflicting changes, the existing `revision` must be used when updating a rule.
       * @readonly
       */
      revision?: string | null;
      /**
       * DEPRECATED. Defines the app that the rule is connected to.
       * @deprecated DEPRECATED. Defines the app that the rule is connected to.
       * @replacedBy app_id
       * @targetRemovalDate 2023-02-19
       */
      label?: string | null;
      /** Defines the app that the rule is connected to. */
      appId?: string | null;
      /**
       * Rounding strategy to apply to fee and tax calculation.
       *
       * Supported values:
       *
       * - `"HALF_UP"`: Rounds up any number exactly halfway between two integers. For example, `2.5` rounds to `3`, and `3.5` and rounds to `4`.
       * - `"HALF_EVEN"`: Rounds such numbers to the nearest even integer. For example, `2.5` rounds to `2`, but `3.5` rounds to `4`.
       * - `"UNKNOWN_ROUNDING_STRATEGY"`
       */
      roundingStrategy?: RoundingStrategy;
  }
  interface UpdateRuleOptions {
      /**
       * List of fields to update in the rule.
       * @internal
       */
      mask?: string[];
  }
  /**
   * The `deleteRule()` function returns a Promise that resolves to void.
   *
   *
   * To delete multiple rules at once, use the `bulkDeleteRules()` function.
   * @param ruleId - ID of the rule to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField ruleId
   * @permissionId WIX_RESTAURANTS.SERVICE_FEES_RULES_DELETE
   * @adminMethod
   */
  function deleteRule(ruleId: string): Promise<void>;
  /**
   * The `listRules()` function returns a Promise that resolves to an array of the retrieved rules.
   *
   *
   * You can filter by location or app that the rules are associated with.
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_RESTAURANTS.SERVICE_FEES_RULES_READ
   */
  function listRules(options?: ListRulesOptions): Promise<ListRulesResponse>;
  interface ListRulesOptions {
      /** Retrieve only rule that apply at the [location](https://dev.wix.com/docs/rest/api-reference/business-tools/locations/location-object) with this ID. If this field is `null`, the rules will not be filtered by location. */
      locationId?: string | null;
      /**
       * DEPRECATED. Defines the app that the rule is connected to.
       * @deprecated DEPRECATED. Defines the app that the rule is connected to.
       * @replacedBy app_id
       * @targetRemovalDate 2023-02-19
       */
      label?: string | null;
      /** Defines the app that the rule is connected to. */
      appId?: string | null;
  }
  /**
   * Creates a query to retrieve a list of rules.
   *
   *
   * The `queryRules()` function builds a query to retrieve a list of up to 1,000 rules and returns a `RulesQueryBuilder` object.
   *
   * The returned object contains the query definition which is typically used to run the query using the [`find()`](/service-fees/rules-query-builder/find) function.
   *
   * You can refine the query by chaining `RulesQueryBuilder` functions onto the query. `RulesQueryBuilder` functions enable you to sort, filter, and control the results that `queryRules()` returns. The functions that are chained to `queryRules()` are applied in the order they are called.
   *
   * `queryRules()` runs with the following `RulesQueryBuilder` defaults that you can override:
   *
   * * [`limit(50)`](/service-fees/rules-query-builder/limit)
   * * [`ascending('entityId')`](/service-fees/rules-query-builder/ascending)
   *
   * The following `QueryRulesBuilder` functions are supported for the `queryRules()` function. For a full description of the Rules object, see the object returned for the [`items`](/service-fees/rules-query-builder/items) property in `RulesQueryResult`.
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_RESTAURANTS.SERVICE_FEES_RULES_READ
   */
  function queryRules(): RulesQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface RulesQueryResult extends QueryCursorResult {
      items: Rule[];
      query: RulesQueryBuilder;
      next: () => Promise<RulesQueryResult>;
      prev: () => Promise<RulesQueryResult>;
  }
  interface RulesQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id', value: any) => RulesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id', value: any) => RulesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id', value: string) => RulesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id', value: any[]) => RulesQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id', value: any) => RulesQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id', value: boolean) => RulesQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id'>) => RulesQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id'>) => RulesQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => RulesQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => RulesQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<RulesQueryResult>;
  }
  /**
   * The `bulkCreateRules()` function returns a Promise that resolves to the created rules.
   *
   *
   * To create only one rule, use the `createRule()` function.
   * @param rules - Rules to create.
   * @public
   * @documentationMaturity preview
   * @requiredField rules
   * @permissionId WIX_RESTAURANTS.SERVICE_FEES_RULES_CREATE
   * @adminMethod
   */
  function bulkCreateRules(rules: Rule[], options?: BulkCreateRulesOptions): Promise<BulkCreateRulesResponse>;
  interface BulkCreateRulesOptions {
      /**
       * Whether the full rule entity is returned. <br />
       * Default: `false`.
       */
      returnFullEntity?: boolean;
  }
  /**
   * The `bulkUpdateRules()` function returns a Promise that resolves to the updated rules.
   *
   *
   * Each time the task is updated, `revision` increments by 1. The existing `revision` must be included when updating the task. This ensures you're working with the latest task and prevents unintended overwrites.
   *
   * To update only one rule, use the `updateRule()` function.
   * @param rules - Masked rules to update.
   * @public
   * @documentationMaturity preview
   * @requiredField rules
   * @permissionId WIX_RESTAURANTS.SERVICE_FEES_RULES_UPDATE
   * @adminMethod
   */
  function bulkUpdateRules(rules: MaskedRule[], options?: BulkUpdateRulesOptions): Promise<BulkUpdateRulesResponse>;
  interface BulkUpdateRulesOptions {
      /**
       * Whether the full rule entity is returned. <br />
       * Default: `false`.
       */
      returnFullEntity?: boolean;
  }
  /**
   * The `bulkDeleteRules()` function returns a Promise that resolves to the deleted rules.
   *
   *
   * To delete only one rule, use the `deleteRule()` function.
   * @param ruleIds - IDs of the rules to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField ruleIds
   * @permissionId WIX_RESTAURANTS.SERVICE_FEES_RULES_DELETE
   * @adminMethod
   */
  function bulkDeleteRules(ruleIds: string[]): Promise<BulkDeleteRulesResponse>;
  
  type serviceFeesV1Rule_universal_d_Rule = Rule;
  type serviceFeesV1Rule_universal_d_RuleValueOneOf = RuleValueOneOf;
  type serviceFeesV1Rule_universal_d_RuleRequirementsOneOf = RuleRequirementsOneOf;
  type serviceFeesV1Rule_universal_d_RuleConditionsOneOf = RuleConditionsOneOf;
  type serviceFeesV1Rule_universal_d_RuleConditionTypeOptionsOneOf = RuleConditionTypeOptionsOneOf;
  type serviceFeesV1Rule_universal_d_RuleTaxesOneOf = RuleTaxesOneOf;
  type serviceFeesV1Rule_universal_d_Money = Money;
  type serviceFeesV1Rule_universal_d_CommonMoney = CommonMoney;
  type serviceFeesV1Rule_universal_d_Condition = Condition;
  type serviceFeesV1Rule_universal_d_ConditionValueOneOf = ConditionValueOneOf;
  type serviceFeesV1Rule_universal_d_ExpectedType = ExpectedType;
  type serviceFeesV1Rule_universal_d_Value = Value;
  const serviceFeesV1Rule_universal_d_Value: typeof Value;
  type serviceFeesV1Rule_universal_d_ExpectedFieldType = ExpectedFieldType;
  const serviceFeesV1Rule_universal_d_ExpectedFieldType: typeof ExpectedFieldType;
  type serviceFeesV1Rule_universal_d__Number = _Number;
  type serviceFeesV1Rule_universal_d_Operation = Operation;
  const serviceFeesV1Rule_universal_d_Operation: typeof Operation;
  type serviceFeesV1Rule_universal_d_List = List;
  type serviceFeesV1Rule_universal_d_ConditionTree = ConditionTree;
  type serviceFeesV1Rule_universal_d_ConditionTreeLeftConditionNodeOneOf = ConditionTreeLeftConditionNodeOneOf;
  type serviceFeesV1Rule_universal_d_ConditionTreeRightConditionNodeOneOf = ConditionTreeRightConditionNodeOneOf;
  type serviceFeesV1Rule_universal_d_Operator = Operator;
  const serviceFeesV1Rule_universal_d_Operator: typeof Operator;
  type serviceFeesV1Rule_universal_d_ConditionsType = ConditionsType;
  const serviceFeesV1Rule_universal_d_ConditionsType: typeof ConditionsType;
  type serviceFeesV1Rule_universal_d_ConditionType = ConditionType;
  const serviceFeesV1Rule_universal_d_ConditionType: typeof ConditionType;
  type serviceFeesV1Rule_universal_d_RoundingStrategy = RoundingStrategy;
  const serviceFeesV1Rule_universal_d_RoundingStrategy: typeof RoundingStrategy;
  type serviceFeesV1Rule_universal_d_CalculateServiceFeesRequest = CalculateServiceFeesRequest;
  type serviceFeesV1Rule_universal_d_Order = Order;
  type serviceFeesV1Rule_universal_d_PriceSummary = PriceSummary;
  type serviceFeesV1Rule_universal_d_ShippingInformation = ShippingInformation;
  type serviceFeesV1Rule_universal_d_DeliveryLogistics = DeliveryLogistics;
  type serviceFeesV1Rule_universal_d_Type = Type;
  const serviceFeesV1Rule_universal_d_Type: typeof Type;
  type serviceFeesV1Rule_universal_d_Platform = Platform;
  type serviceFeesV1Rule_universal_d_PlatformValue = PlatformValue;
  const serviceFeesV1Rule_universal_d_PlatformValue: typeof PlatformValue;
  type serviceFeesV1Rule_universal_d_Locale = Locale;
  type serviceFeesV1Rule_universal_d_CalculateServiceFeesResponse = CalculateServiceFeesResponse;
  type serviceFeesV1Rule_universal_d_CalculatedFee = CalculatedFee;
  type serviceFeesV1Rule_universal_d_CreateRuleRequest = CreateRuleRequest;
  type serviceFeesV1Rule_universal_d_CreateRuleResponse = CreateRuleResponse;
  type serviceFeesV1Rule_universal_d_GetRuleRequest = GetRuleRequest;
  type serviceFeesV1Rule_universal_d_GetRuleResponse = GetRuleResponse;
  type serviceFeesV1Rule_universal_d_UpdateRuleRequest = UpdateRuleRequest;
  type serviceFeesV1Rule_universal_d_UpdateRuleResponse = UpdateRuleResponse;
  type serviceFeesV1Rule_universal_d_DeleteRuleRequest = DeleteRuleRequest;
  type serviceFeesV1Rule_universal_d_DeleteRuleResponse = DeleteRuleResponse;
  type serviceFeesV1Rule_universal_d_ListRulesRequest = ListRulesRequest;
  type serviceFeesV1Rule_universal_d_ListRulesResponse = ListRulesResponse;
  type serviceFeesV1Rule_universal_d_QueryRulesRequest = QueryRulesRequest;
  type serviceFeesV1Rule_universal_d_CursorQuery = CursorQuery;
  type serviceFeesV1Rule_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type serviceFeesV1Rule_universal_d_Sorting = Sorting;
  type serviceFeesV1Rule_universal_d_SortOrder = SortOrder;
  const serviceFeesV1Rule_universal_d_SortOrder: typeof SortOrder;
  type serviceFeesV1Rule_universal_d_CursorPaging = CursorPaging;
  type serviceFeesV1Rule_universal_d_QueryRulesResponse = QueryRulesResponse;
  type serviceFeesV1Rule_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type serviceFeesV1Rule_universal_d_Cursors = Cursors;
  type serviceFeesV1Rule_universal_d_BulkCreateRulesRequest = BulkCreateRulesRequest;
  type serviceFeesV1Rule_universal_d_BulkCreateRulesResponse = BulkCreateRulesResponse;
  type serviceFeesV1Rule_universal_d_BulkRuleResult = BulkRuleResult;
  type serviceFeesV1Rule_universal_d_ItemMetadata = ItemMetadata;
  type serviceFeesV1Rule_universal_d_ApplicationError = ApplicationError;
  type serviceFeesV1Rule_universal_d_BulkActionMetadata = BulkActionMetadata;
  type serviceFeesV1Rule_universal_d_BulkUpdateRulesRequest = BulkUpdateRulesRequest;
  type serviceFeesV1Rule_universal_d_MaskedRule = MaskedRule;
  type serviceFeesV1Rule_universal_d_BulkUpdateRulesResponse = BulkUpdateRulesResponse;
  type serviceFeesV1Rule_universal_d_BulkDeleteRulesRequest = BulkDeleteRulesRequest;
  type serviceFeesV1Rule_universal_d_BulkDeleteRulesResponse = BulkDeleteRulesResponse;
  type serviceFeesV1Rule_universal_d_DomainEvent = DomainEvent;
  type serviceFeesV1Rule_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type serviceFeesV1Rule_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type serviceFeesV1Rule_universal_d_RestoreInfo = RestoreInfo;
  type serviceFeesV1Rule_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type serviceFeesV1Rule_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type serviceFeesV1Rule_universal_d_ActionEvent = ActionEvent;
  type serviceFeesV1Rule_universal_d_MessageEnvelope = MessageEnvelope;
  type serviceFeesV1Rule_universal_d_IdentificationData = IdentificationData;
  type serviceFeesV1Rule_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type serviceFeesV1Rule_universal_d_WebhookIdentityType = WebhookIdentityType;
  const serviceFeesV1Rule_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const serviceFeesV1Rule_universal_d_calculateServiceFees: typeof calculateServiceFees;
  type serviceFeesV1Rule_universal_d_CalculateServiceFeesOptions = CalculateServiceFeesOptions;
  const serviceFeesV1Rule_universal_d_createRule: typeof createRule;
  const serviceFeesV1Rule_universal_d_getRule: typeof getRule;
  const serviceFeesV1Rule_universal_d_updateRule: typeof updateRule;
  type serviceFeesV1Rule_universal_d_UpdateRule = UpdateRule;
  type serviceFeesV1Rule_universal_d_UpdateRuleOptions = UpdateRuleOptions;
  const serviceFeesV1Rule_universal_d_deleteRule: typeof deleteRule;
  const serviceFeesV1Rule_universal_d_listRules: typeof listRules;
  type serviceFeesV1Rule_universal_d_ListRulesOptions = ListRulesOptions;
  const serviceFeesV1Rule_universal_d_queryRules: typeof queryRules;
  type serviceFeesV1Rule_universal_d_RulesQueryResult = RulesQueryResult;
  type serviceFeesV1Rule_universal_d_RulesQueryBuilder = RulesQueryBuilder;
  const serviceFeesV1Rule_universal_d_bulkCreateRules: typeof bulkCreateRules;
  type serviceFeesV1Rule_universal_d_BulkCreateRulesOptions = BulkCreateRulesOptions;
  const serviceFeesV1Rule_universal_d_bulkUpdateRules: typeof bulkUpdateRules;
  type serviceFeesV1Rule_universal_d_BulkUpdateRulesOptions = BulkUpdateRulesOptions;
  const serviceFeesV1Rule_universal_d_bulkDeleteRules: typeof bulkDeleteRules;
  namespace serviceFeesV1Rule_universal_d {
    export {
      serviceFeesV1Rule_universal_d_Rule as Rule,
      serviceFeesV1Rule_universal_d_RuleValueOneOf as RuleValueOneOf,
      serviceFeesV1Rule_universal_d_RuleRequirementsOneOf as RuleRequirementsOneOf,
      serviceFeesV1Rule_universal_d_RuleConditionsOneOf as RuleConditionsOneOf,
      serviceFeesV1Rule_universal_d_RuleConditionTypeOptionsOneOf as RuleConditionTypeOptionsOneOf,
      serviceFeesV1Rule_universal_d_RuleTaxesOneOf as RuleTaxesOneOf,
      serviceFeesV1Rule_universal_d_Money as Money,
      serviceFeesV1Rule_universal_d_CommonMoney as CommonMoney,
      serviceFeesV1Rule_universal_d_Condition as Condition,
      serviceFeesV1Rule_universal_d_ConditionValueOneOf as ConditionValueOneOf,
      serviceFeesV1Rule_universal_d_ExpectedType as ExpectedType,
      serviceFeesV1Rule_universal_d_Value as Value,
      serviceFeesV1Rule_universal_d_ExpectedFieldType as ExpectedFieldType,
      serviceFeesV1Rule_universal_d__Number as _Number,
      serviceFeesV1Rule_universal_d_Operation as Operation,
      serviceFeesV1Rule_universal_d_List as List,
      serviceFeesV1Rule_universal_d_ConditionTree as ConditionTree,
      serviceFeesV1Rule_universal_d_ConditionTreeLeftConditionNodeOneOf as ConditionTreeLeftConditionNodeOneOf,
      serviceFeesV1Rule_universal_d_ConditionTreeRightConditionNodeOneOf as ConditionTreeRightConditionNodeOneOf,
      serviceFeesV1Rule_universal_d_Operator as Operator,
      serviceFeesV1Rule_universal_d_ConditionsType as ConditionsType,
      serviceFeesV1Rule_universal_d_ConditionType as ConditionType,
      serviceFeesV1Rule_universal_d_RoundingStrategy as RoundingStrategy,
      serviceFeesV1Rule_universal_d_CalculateServiceFeesRequest as CalculateServiceFeesRequest,
      serviceFeesV1Rule_universal_d_Order as Order,
      serviceFeesV1Rule_universal_d_PriceSummary as PriceSummary,
      serviceFeesV1Rule_universal_d_ShippingInformation as ShippingInformation,
      serviceFeesV1Rule_universal_d_DeliveryLogistics as DeliveryLogistics,
      serviceFeesV1Rule_universal_d_Type as Type,
      serviceFeesV1Rule_universal_d_Platform as Platform,
      serviceFeesV1Rule_universal_d_PlatformValue as PlatformValue,
      serviceFeesV1Rule_universal_d_Locale as Locale,
      serviceFeesV1Rule_universal_d_CalculateServiceFeesResponse as CalculateServiceFeesResponse,
      serviceFeesV1Rule_universal_d_CalculatedFee as CalculatedFee,
      serviceFeesV1Rule_universal_d_CreateRuleRequest as CreateRuleRequest,
      serviceFeesV1Rule_universal_d_CreateRuleResponse as CreateRuleResponse,
      serviceFeesV1Rule_universal_d_GetRuleRequest as GetRuleRequest,
      serviceFeesV1Rule_universal_d_GetRuleResponse as GetRuleResponse,
      serviceFeesV1Rule_universal_d_UpdateRuleRequest as UpdateRuleRequest,
      serviceFeesV1Rule_universal_d_UpdateRuleResponse as UpdateRuleResponse,
      serviceFeesV1Rule_universal_d_DeleteRuleRequest as DeleteRuleRequest,
      serviceFeesV1Rule_universal_d_DeleteRuleResponse as DeleteRuleResponse,
      serviceFeesV1Rule_universal_d_ListRulesRequest as ListRulesRequest,
      serviceFeesV1Rule_universal_d_ListRulesResponse as ListRulesResponse,
      serviceFeesV1Rule_universal_d_QueryRulesRequest as QueryRulesRequest,
      serviceFeesV1Rule_universal_d_CursorQuery as CursorQuery,
      serviceFeesV1Rule_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      serviceFeesV1Rule_universal_d_Sorting as Sorting,
      serviceFeesV1Rule_universal_d_SortOrder as SortOrder,
      serviceFeesV1Rule_universal_d_CursorPaging as CursorPaging,
      serviceFeesV1Rule_universal_d_QueryRulesResponse as QueryRulesResponse,
      serviceFeesV1Rule_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      serviceFeesV1Rule_universal_d_Cursors as Cursors,
      serviceFeesV1Rule_universal_d_BulkCreateRulesRequest as BulkCreateRulesRequest,
      serviceFeesV1Rule_universal_d_BulkCreateRulesResponse as BulkCreateRulesResponse,
      serviceFeesV1Rule_universal_d_BulkRuleResult as BulkRuleResult,
      serviceFeesV1Rule_universal_d_ItemMetadata as ItemMetadata,
      serviceFeesV1Rule_universal_d_ApplicationError as ApplicationError,
      serviceFeesV1Rule_universal_d_BulkActionMetadata as BulkActionMetadata,
      serviceFeesV1Rule_universal_d_BulkUpdateRulesRequest as BulkUpdateRulesRequest,
      serviceFeesV1Rule_universal_d_MaskedRule as MaskedRule,
      serviceFeesV1Rule_universal_d_BulkUpdateRulesResponse as BulkUpdateRulesResponse,
      serviceFeesV1Rule_universal_d_BulkDeleteRulesRequest as BulkDeleteRulesRequest,
      serviceFeesV1Rule_universal_d_BulkDeleteRulesResponse as BulkDeleteRulesResponse,
      serviceFeesV1Rule_universal_d_DomainEvent as DomainEvent,
      serviceFeesV1Rule_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      serviceFeesV1Rule_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      serviceFeesV1Rule_universal_d_RestoreInfo as RestoreInfo,
      serviceFeesV1Rule_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      serviceFeesV1Rule_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      serviceFeesV1Rule_universal_d_ActionEvent as ActionEvent,
      serviceFeesV1Rule_universal_d_MessageEnvelope as MessageEnvelope,
      serviceFeesV1Rule_universal_d_IdentificationData as IdentificationData,
      serviceFeesV1Rule_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      serviceFeesV1Rule_universal_d_WebhookIdentityType as WebhookIdentityType,
      serviceFeesV1Rule_universal_d_calculateServiceFees as calculateServiceFees,
      serviceFeesV1Rule_universal_d_CalculateServiceFeesOptions as CalculateServiceFeesOptions,
      serviceFeesV1Rule_universal_d_createRule as createRule,
      serviceFeesV1Rule_universal_d_getRule as getRule,
      serviceFeesV1Rule_universal_d_updateRule as updateRule,
      serviceFeesV1Rule_universal_d_UpdateRule as UpdateRule,
      serviceFeesV1Rule_universal_d_UpdateRuleOptions as UpdateRuleOptions,
      serviceFeesV1Rule_universal_d_deleteRule as deleteRule,
      serviceFeesV1Rule_universal_d_listRules as listRules,
      serviceFeesV1Rule_universal_d_ListRulesOptions as ListRulesOptions,
      serviceFeesV1Rule_universal_d_queryRules as queryRules,
      serviceFeesV1Rule_universal_d_RulesQueryResult as RulesQueryResult,
      serviceFeesV1Rule_universal_d_RulesQueryBuilder as RulesQueryBuilder,
      serviceFeesV1Rule_universal_d_bulkCreateRules as bulkCreateRules,
      serviceFeesV1Rule_universal_d_BulkCreateRulesOptions as BulkCreateRulesOptions,
      serviceFeesV1Rule_universal_d_bulkUpdateRules as bulkUpdateRules,
      serviceFeesV1Rule_universal_d_BulkUpdateRulesOptions as BulkUpdateRulesOptions,
      serviceFeesV1Rule_universal_d_bulkDeleteRules as bulkDeleteRules,
    };
  }
  
  export { restaurantsV1AvailabilityException_universal_d as availabilityExceptions, restaurantsV1FulfillmentMethod_universal_d as fulfillmentMethods, restaurantsMenusV1ItemLabel_universal_d as itemLabels, restaurantsMenusV1ItemModifierGroup_universal_d as itemModifierGroups, restaurantsMenusV1ItemModifier_universal_d as itemModifiers, restaurantsMenusV1ItemVariant_universal_d as itemVariants, restaurantsMenusV1Item_universal_d as items, restaurantsMenuSettingsV1MenuOrderingSettings_universal_d as menuOrderingSettings, restaurantsMenusV1Menu_universal_d as menus, restaurantsOperationsV1Operation_universal_d as operations, restaurantsOrderPacingV1Policy_universal_d as orderPacingPolicy, restaurantsMenusV1Section_universal_d as sections, serviceFeesV1Rule_universal_d as serviceFees };
}
