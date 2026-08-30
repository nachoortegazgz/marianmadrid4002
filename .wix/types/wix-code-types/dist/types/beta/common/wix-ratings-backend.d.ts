declare module "wix-ratings-backend" {
  /**
   * A Rating object includes all of the details related to the rating of an entity or its attributes.
   * An entity is a resource to be rated, for example, a Wix Stores product.
   * You can manage existing ratings, create new ratings, and retrieve rating data.
   * Read more about ratings in this [tutorial](https://support.wix.com/en/article/velo-tutorial-capturing-and-displaying-ratings).
   */
  interface Rating {
      /**
       * Rating ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the rating is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the rating.
       * Ignored when creating a rating.
       * @readonly
       */
      revision?: string | null;
      /** The Wix module or app that the Ratings API is integrated with. For example, Wix Reviews as `reviews`. */
      namespace?: string | null;
      /** A group of entities in a namespace. A namespace can have one or more groups. For example, `blog` and `forum` groups in the `comments` namespace. */
      group?: string;
      /** ID of the entity being rated. For example, a Wix Stores product. */
      entityId?: string;
      /** Characteristic of an entity that can be rated individually. For example, `value for money`. */
      attributeName?: string;
      /**
       * Rating score.
       *
       * Min = `0` <br />
       * Max = `100`
       */
      value?: number | null;
      /** Rating owner. */
      owner?: IdentificationData;
      /**
       * Date and time the rating was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the rating was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Entities related to the entity being rated.
       * [Query Ratings](https://dev.wix.com/api/rest/ratings/query-ratings) can filter by this parameter.
       */
      relatedEntityIds?: string[] | null;
      /**
       * @internal
       * @deprecated
       * @replacedBy attribute_name
       */
      attributeId?: string;
  }
  interface IdentificationData extends IdentificationDataIdOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a contact in the site's [CRM by Ascend](https://www.wix.com/ascend/crm) system. */
      contactId?: string | null;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
  }
  interface GroupAttributeSummaryUpdated {
      /** The Wix module or app that the Ratings API is integrated with. For example, Wix Reviews as `reviews`. */
      namespace?: string;
      /** A group of entities in a namespace. A namespace can have one or more groups. For example, `blog` and `forum` groups in the `comments` namespace. */
      group?: string;
      /** Rating summary of the attributes. */
      attributeSummary?: AttributeSummary;
  }
  interface AttributeSummary {
      /** Attribute name. An attribute is a feature of an entity that can be rated individually. */
      attributeName?: string | null;
      /** Total number of ratings. */
      total?: number;
      /** Average rating score for the attribute. */
      average?: number;
      /** Details of the rating scores. This includes every rating `value` given for the attribute and the `total` number of ratings with the `value`. */
      valueBreakdown?: ValueBreakdown[];
      /**
       * ID of the attribute.
       * @internal
       * @deprecated ID of the attribute.
       * @replacedBy attribute_name
       */
      attributeId?: string | null;
  }
  interface ValueBreakdown {
      /** Rating score. */
      value?: number;
      /** Total number of ratings scored with the `value`. */
      total?: number;
  }
  interface EntityAttributeSummaryUpdated {
      /** The Wix module or app that the Ratings API is integrated with. For example, Wix Reviews as `reviews`. */
      namespace?: string;
      /** A group of entities in a namespace. A namespace can have one or more groups. For example, `blog` and `forum` groups in the `comments` namespace. */
      group?: string;
      /** ID of the entity. */
      entityId?: string;
      /** Rating summary of the attributes. */
      attributeSummary?: AttributeSummary;
  }
  interface CreateRatingRequest {
      /** Rating to create. */
      rating: Rating;
  }
  interface CreateRatingResponse {
      /** Created rating. */
      rating?: Rating;
  }
  interface GetRatingRequest {
      /** ID of the rating to retrieve. */
      _id: string;
      /**
       * Namespace of ratings to retrieve.
       * @internal
       * @deprecated Namespace of ratings to retrieve.
       * @targetRemovalDate 2024-02-15
       */
      namespace?: string | null;
  }
  interface GetRatingResponse {
      /** Retrieved rating. */
      rating?: Rating;
  }
  interface UpdateRatingRequest {
      /** Rating to update. */
      rating: Rating;
      /**
       * Fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface UpdateRatingResponse {
      /** Updated rating. */
      rating?: Rating;
  }
  interface DeleteRatingRequest {
      /** ID of the rating to delete. */
      _id: string;
  }
  interface DeleteRatingResponse {
  }
  interface GetGroupSummaryRequest {
      /** Name of group to calculate the rating summaries for. */
      group: string;
      /** List of attributes for the summaries. */
      attributeNames?: string[];
      /** Namespace for the summaries. */
      namespace?: string | null;
      /**
       * List of attributes to calculate the summaries for.
       * @internal
       * @deprecated List of attributes to calculate the summaries for.
       * @replacedBy attribute_ids
       */
      attributeIds?: string[];
  }
  interface GetGroupSummaryResponse {
      /** Group name. */
      group?: string;
      /** List of attribute summaries. */
      attributeSummaries?: AttributeSummary[];
  }
  interface GetEntitySummaryRequest {
      /** Name of group to calculate the summaries for. */
      group: string;
      /** Entity ID. */
      entityId: string;
      /** List of attributes for the summaries. */
      attributeNames?: string[];
      /** Namespace for the summaries. */
      namespace?: string | null;
      /**
       * List of attributes to calculate the summaries for.
       * @internal
       * @deprecated List of attributes to calculate the summaries for.
       * @replacedBy attribute_names
       */
      attributeIds?: string[];
  }
  interface GetEntitySummaryResponse {
      /** Group name. */
      group?: string;
      /** Entity ID. */
      entityId?: string;
      /** List of attribute summaries. */
      attributeSummaries?: AttributeSummary[];
  }
  interface ListAttributeAveragesByEntityRequest {
      /** Name of group to calculate rating averages for. */
      group: string;
      /** Entity IDs to calculate rating averages for. */
      entityIds?: string[];
      /** Attribute to calculate rating averages for. */
      attributeName: string | null;
      /** Namespace to calculate rating averages for. */
      namespace?: string | null;
      /**
       * @internal
       * @deprecated
       * @replacedBy attribute_names
       */
      attributeId?: string | null;
  }
  interface ListAttributeAveragesByEntityResponse {
      /** Group name. */
      group?: string;
      /** Entity averages. */
      entityAverages?: EntityAverage[];
  }
  interface EntityAverage {
      /** Entity ID. */
      entityId?: string;
      /** Total number of ratings for the entity. */
      total?: number;
      /** Average rating for the attributes of the entity. */
      average?: number;
  }
  interface QueryRatingsRequest {
      /** Rating query. */
      query?: QueryV2;
  }
  interface QueryV2 {
      /**
       * Filter object. See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language) for more information.
       * For a detailed list of supported filters, see [Ratings: Supported Filters and Sorting](https://dev.wix.com/api/rest/ratings/sort-and-filter),
       */
      filter?: Record<string, any> | null;
      /** Sorting options. See [Ratings: Supported Filters and Sorting](https://dev.wix.com/api/rest/ratings/sort-and-filter) for more information, */
      sort?: Sorting[];
      /** Cursor paging options. */
      cursorPaging?: CursorPaging;
  }
  /** Sort options. */
  interface Sorting {
      /** Name of the field to sort by. */
      fieldName?: string;
      /**
       * Sort order.
       *
       * Default: `ASC`.
       */
      order?: SortOrder;
  }
  enum SortOrder {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging {
      /**
       * The number of items to load.
       * Cursor token returned in the query response. To be used on the next query request, but not the first query request.
       *
       * Max: `100` <br />
       * Default: `50`
       */
      limit?: number | null;
      /** Cursor returned in last query response. Should not be provided on first page request. */
      cursor?: string | null;
  }
  interface QueryRatingsResponse {
      /** List of returned ratings. */
      ratings?: Rating[];
      /** Paging metadata. */
      metadata?: PagingMetadataV2;
  }
  interface PagingMetadataV2 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
      cursors?: Cursors;
  }
  interface Cursors {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
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
      /** Event timestamp. */
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
  }
  interface EntityDeletedEvent {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
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
      identity?: WebhooksIdentificationData;
      /** Stringify payload. */
      data?: string;
  }
  interface WebhooksIdentificationData extends WebhooksIdentificationDataIdOneOf {
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
  interface WebhooksIdentificationDataIdOneOf {
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
   * Creates a new rating.
   *
   *
   * The request body must include `group`, `entityId`, and rating `value`.
   * @param rating - Rating to create.
   * @internal
   * @documentationMaturity preview
   * @requiredField rating
   * @requiredField rating.entityId
   * @requiredField rating.group
   * @requiredField rating.value
   * @permissionId RATING.RATING_CREATE
   * @adminMethod
   * @returns Created rating.
   */
  function createRating(rating: Rating): Promise<Rating>;
  /**
   * Retrieves a rating by ID.
   * @param _id - ID of the rating to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId RATING.RATING_READ
   * @returns Retrieved rating.
   */
  function getRating(_id: string, options?: GetRatingOptions): Promise<Rating>;
  interface GetRatingOptions {
      /**
       * Namespace of ratings to retrieve.
       * @internal
       * @deprecated Namespace of ratings to retrieve.
       * @targetRemovalDate 2024-02-15
       */
      namespace?: string | null;
  }
  /**
   * Updates a rating or list of related entities.
   *
   *
   * Each time the rating is updated, `revision` increments by 1. The existing `revision` must be included
   * when updating the rating. This ensures you're working with the latest rating information, and it prevents unintended overwrites.
   * @param _id - Rating ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField rating
   * @requiredField rating.revision
   * @permissionId RATING.RATING_UPDATE
   * @adminMethod
   * @returns Updated rating.
   */
  function updateRating(_id: string | null, rating: UpdateRating, options?: UpdateRatingOptions): Promise<Rating>;
  interface UpdateRating {
      /**
       * Rating ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the rating is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the rating.
       * Ignored when creating a rating.
       * @readonly
       */
      revision?: string | null;
      /** The Wix module or app that the Ratings API is integrated with. For example, Wix Reviews as `reviews`. */
      namespace?: string | null;
      /** A group of entities in a namespace. A namespace can have one or more groups. For example, `blog` and `forum` groups in the `comments` namespace. */
      group?: string;
      /** ID of the entity being rated. For example, a Wix Stores product. */
      entityId?: string;
      /** Characteristic of an entity that can be rated individually. For example, `value for money`. */
      attributeName?: string;
      /**
       * Rating score.
       *
       * Min = `0` <br />
       * Max = `100`
       */
      value?: number | null;
      /** Rating owner. */
      owner?: IdentificationData;
      /**
       * Date and time the rating was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the rating was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Entities related to the entity being rated.
       * [Query Ratings](https://dev.wix.com/api/rest/ratings/query-ratings) can filter by this parameter.
       */
      relatedEntityIds?: string[] | null;
      /**
       * @internal
       * @deprecated
       * @replacedBy attribute_name
       */
      attributeId?: string;
  }
  interface UpdateRatingOptions {
      /**
       * Fields to update.
       * @internal
       */
      mask?: string[];
  }
  /**
   * Deletes a rating by ID.
   * @param _id - ID of the rating to delete.
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId RATING.RATING_DELETE
   * @adminMethod
   */
  function deleteRating(_id: string): Promise<void>;
  /**
   * Retrieves a rating summary for a group.
   * @param group - Name of group to calculate the rating summaries for.
   * @internal
   * @documentationMaturity preview
   * @requiredField group
   * @permissionId RATING.RATING_GET_NAMESPACE_SUMMARY
   */
  function getGroupSummary(group: string, options?: GetGroupSummaryOptions): Promise<GetGroupSummaryResponse>;
  interface GetGroupSummaryOptions {
      /** List of attributes for the summaries. */
      attributeNames?: string[];
      /** Namespace for the summaries. */
      namespace?: string | null;
      /**
       * List of attributes to calculate the summaries for.
       * @internal
       * @deprecated List of attributes to calculate the summaries for.
       * @replacedBy attribute_ids
       */
      attributeIds?: string[];
  }
  /**
   * Retrieves a rating summary for the requested entity.
   * @public
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.entityId
   * @requiredField identifiers.group
   * @permissionId RATING.RATING_GET_ENTITY_SUMMARY
   */
  function getEntitySummary(identifiers: GetEntitySummaryIdentifiers, options?: GetEntitySummaryOptions): Promise<GetEntitySummaryResponse>;
  interface GetEntitySummaryIdentifiers {
      /** Name of group to calculate the summaries for. */
      group: string;
      /** Entity ID. */
      entityId: string;
  }
  interface GetEntitySummaryOptions {
      /** List of attributes for the summaries. */
      attributeNames?: string[];
      /** Namespace for the summaries. */
      namespace?: string | null;
      /**
       * List of attributes to calculate the summaries for.
       * @internal
       * @deprecated List of attributes to calculate the summaries for.
       * @replacedBy attribute_names
       */
      attributeIds?: string[];
  }
  /**
   * Retrieves average attribute ratings for entities in a group.
   * @param group - Name of group to calculate rating averages for.
   * @public
   * @documentationMaturity preview
   * @requiredField group
   * @requiredField options.attributeName
   * @permissionId RATING.RATING_READ
   */
  function listAttributeAveragesByEntity(group: string, options?: ListAttributeAveragesByEntityOptions): Promise<ListAttributeAveragesByEntityResponse>;
  interface ListAttributeAveragesByEntityOptions {
      /** Entity IDs to calculate rating averages for. */
      entityIds?: string[];
      /** Attribute to calculate rating averages for. */
      attributeName: string | null;
      /** Namespace to calculate rating averages for. */
      namespace?: string | null;
      /**
       * @internal
       * @deprecated
       * @replacedBy attribute_names
       */
      attributeId?: string | null;
  }
  /**
   * Retrieves a list of ratings, given the provided paging, filtering, and sorting.
   * 100 ratings can be returned per request.
   *
   * Query Ratings runs with these defaults, which you can override:
   *
   * - `createdDate` is sorted in `ASC` order
   * - `paging.limit` is `100`
   *
   * For field support for filters and sorting, see
   * [Ratings: Supported Filters and Sorting](https://dev.wix.com/api/rest/ratings/sort-and-filter).
   * To learn about working with _Query_ endpoints, see
   * [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language).
   * @internal
   * @documentationMaturity preview
   * @permissionId RATING.RATING_READ
   */
  function queryRatings(): RatingsQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface RatingsQueryResult extends QueryCursorResult {
      items: Rating[];
      query: RatingsQueryBuilder;
      next: () => Promise<RatingsQueryResult>;
      prev: () => Promise<RatingsQueryResult>;
  }
  interface RatingsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | 'revision' | 'namespace' | 'group' | 'entityId' | 'attributeName' | 'value' | 'owner' | 'owner.anonymousVisitorId' | 'owner.memberId' | 'owner.contactId' | '_createdDate' | '_updatedDate' | 'relatedEntityIds', value: any) => RatingsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | 'revision' | 'namespace' | 'group' | 'entityId' | 'attributeName' | 'value' | 'owner' | 'owner.anonymousVisitorId' | 'owner.memberId' | 'owner.contactId' | '_createdDate' | '_updatedDate' | 'relatedEntityIds', value: any) => RatingsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: 'revision' | 'value' | '_createdDate' | '_updatedDate', value: any) => RatingsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: 'revision' | 'value' | '_createdDate' | '_updatedDate', value: any) => RatingsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: 'revision' | 'value' | '_createdDate' | '_updatedDate', value: any) => RatingsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: 'revision' | 'value' | '_createdDate' | '_updatedDate', value: any) => RatingsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'namespace' | 'group' | 'entityId' | 'attributeName' | 'owner.anonymousVisitorId' | 'owner.memberId' | 'owner.contactId', value: string) => RatingsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | 'revision' | 'namespace' | 'group' | 'entityId' | 'attributeName' | 'value' | 'owner' | 'owner.anonymousVisitorId' | 'owner.memberId' | 'owner.contactId' | '_createdDate' | '_updatedDate' | 'relatedEntityIds', value: any[]) => RatingsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasAll: (propertyName: 'relatedEntityIds', value: any[]) => RatingsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'revision' | 'namespace' | 'group' | 'entityId' | 'attributeName' | 'value' | 'owner' | 'owner.anonymousVisitorId' | 'owner.memberId' | 'owner.contactId' | '_createdDate' | '_updatedDate' | 'relatedEntityIds', value: any) => RatingsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | 'revision' | 'namespace' | 'group' | 'entityId' | 'attributeName' | 'value' | 'owner' | 'owner.anonymousVisitorId' | 'owner.memberId' | 'owner.contactId' | '_createdDate' | '_updatedDate' | 'relatedEntityIds', value: boolean) => RatingsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | 'revision' | 'namespace' | 'group' | 'entityId' | 'attributeName' | 'value' | 'owner' | 'owner.anonymousVisitorId' | 'owner.memberId' | 'owner.contactId' | '_createdDate' | '_updatedDate' | 'relatedEntityIds' | 'attributeId'>) => RatingsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | 'revision' | 'namespace' | 'group' | 'entityId' | 'attributeName' | 'value' | 'owner' | 'owner.anonymousVisitorId' | 'owner.memberId' | 'owner.contactId' | '_createdDate' | '_updatedDate' | 'relatedEntityIds' | 'attributeId'>) => RatingsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => RatingsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => RatingsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<RatingsQueryResult>;
  }
  
  export { ActionEvent, AttributeSummary, CreateRatingRequest, CreateRatingResponse, CursorPaging, Cursors, DeleteRatingRequest, DeleteRatingResponse, DomainEvent, DomainEventBodyOneOf, Empty, EntityAttributeSummaryUpdated, EntityAverage, EntityCreatedEvent, EntityDeletedEvent, EntityUpdatedEvent, GetEntitySummaryIdentifiers, GetEntitySummaryOptions, GetEntitySummaryRequest, GetEntitySummaryResponse, GetGroupSummaryOptions, GetGroupSummaryRequest, GetGroupSummaryResponse, GetRatingOptions, GetRatingRequest, GetRatingResponse, GroupAttributeSummaryUpdated, IdentificationData, IdentificationDataIdOneOf, ListAttributeAveragesByEntityOptions, ListAttributeAveragesByEntityRequest, ListAttributeAveragesByEntityResponse, MessageEnvelope, PagingMetadataV2, QueryRatingsRequest, QueryRatingsResponse, QueryV2, Rating, RatingsQueryBuilder, RatingsQueryResult, RestoreInfo, SortOrder, Sorting, UpdateRating, UpdateRatingOptions, UpdateRatingRequest, UpdateRatingResponse, ValueBreakdown, WebhookIdentityType, WebhooksIdentificationData, WebhooksIdentificationDataIdOneOf, createRating, deleteRating, getEntitySummary, getGroupSummary, getRating, listAttributeAveragesByEntity, queryRatings, updateRating };
}
