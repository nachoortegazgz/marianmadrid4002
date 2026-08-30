declare module "wix-gift-vouchers.v2" {
  interface GiftCard extends GiftCardSourceInfoOneOf {
      /** Information about the order which is associated with the gift card purchase. */
      orderInfo?: OrderInfo;
      /**
       * Gift Card unique id.
       * @readonly
       */
      _id?: string | null;
      /**
       * Gift Card code.
       *
       * >**Notes:**
       * + In the CreateGiftCard API response, the `code` field will contain the **full** gift card code, e.g., `1111-2222-3333-4444`.
       * + In any other API response, as well as in the GiftCardCreated Domain Event, the `code` field will contain the **obfuscated** gift card code, e.g., `****-****-****-4444`.
       */
      code?: string | null;
      /** Gift Card initial value. */
      initialValue?: Amount;
      /**
       * Gift Card current balance.
       * @readonly
       */
      balance?: Amount;
      /** Gift Card currency. */
      currency?: string | null;
      /** Gift Card expiration date. */
      expirationDate?: Date | null;
      /**
       * Gift Card creation date.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Gift Card last update date.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Gift Card disable date.
       * @readonly
       */
      disabledDate?: Date | null;
      /**
       * Gift card notification info.
       * @readonly
       */
      notificationInfo?: NotificationInfo;
      /** Gift card source. */
      source?: Source;
  }
  /** @oneof */
  interface GiftCardSourceInfoOneOf {
      /** Information about the order which is associated with the gift card purchase. */
      orderInfo?: OrderInfo;
  }
  interface Amount {
      /** Amount. */
      amount?: string;
      /**
       * Amount formatted with currency symbol.
       * @readonly
       */
      formattedAmount?: string;
  }
  interface NotificationInfo {
      /**
       * Gift Card recipient.
       * @readonly
       */
      recipient?: Recipient;
      /**
       * Gift Card details notification date.
       * Remains empty when notification is sent immediately and not scheduled for a future date.
       * @readonly
       */
      notificationDate?: Date | null;
      /**
       * Notification's personalized message.
       * @readonly
       */
      personalizedMessage?: string | null;
      /**
       * Gift Card sender.
       * @readonly
       */
      sender?: Sender;
  }
  interface Recipient {
      /**
       * Gift Card recipient's email.
       * @readonly
       */
      email?: string | null;
      /**
       * Gift Card recipient's name.
       * @readonly
       */
      name?: string | null;
  }
  interface Sender {
      /**
       * Gift Card sender's email.
       * @readonly
       */
      email?: string | null;
      /**
       * Gift Card sender's name.
       * @readonly
       */
      name?: string | null;
  }
  enum Source {
      UNKNOWN_SOURCE = "UNKNOWN_SOURCE",
      ORDER = "ORDER",
      MANUAL = "MANUAL"
  }
  interface OrderInfo {
      /** ID of the order. */
      orderId?: string;
      /** Number of the order. */
      orderNumber?: string | null;
  }
  interface GiftCardsAppInstallationCompleted$1 {
  }
  interface StoreCreditAppInstallationCompleted {
  }
  interface CreateGiftCardRequest {
      /** Gift Card info for creation. */
      giftCard: GiftCard;
      /** Idempotency key for gift card creation. */
      idempotencyKey?: string | null;
  }
  interface CreateGiftCardResponse {
      /** The newly created gift card. */
      giftCard?: GiftCard;
  }
  interface GetGiftCardRequest {
      /** ID of the gift card to be retrieved. */
      giftCardId: string;
  }
  interface GetGiftCardResponse {
      /** The requested gift card. */
      giftCard?: GiftCard;
  }
  interface QueryGiftCardsRequest {
      /** WQL expression. */
      query: CursorQuery$1;
  }
  interface CursorQuery$1 extends CursorQueryPagingMethodOneOf$1 {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$1;
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
      sort?: Sorting$1[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$1 {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$1;
  }
  interface Sorting$1 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$1;
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
  enum SortOrder$1 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$1 {
      /** Maximum number of items to return in the results. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       * Pass the relevant cursor token from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface QueryGiftCardsResponse {
      /** The retrieved gift cards. */
      giftCards?: GiftCard[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata$1;
  }
  interface CursorPagingMetadata$1 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors$1;
      /**
       * Whether there are more pages to retrieve following the current page.
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$1 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface SearchGiftCardsRequest {
      /** WQL expression. */
      search: CursorSearch;
  }
  interface CursorSearch extends CursorSearchPagingMethodOneOf {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$1;
      /**
       * Filter object.
       *
       * Learn more about the [filter section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-filter-section).
       */
      filter?: Record<string, any> | null;
      /**
       * List of sort objects.
       *
       * Learn more about the [sort section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-sort-section).
       */
      sort?: Sorting$1[];
      /** Aggregations | Faceted search: refers to a way to explore large amounts of data by displaying summaries about various partitions of the data and later allowing to narrow the navigation to a specific partition. */
      aggregations?: Aggregation[];
      /** Free text to match in searchable fields. */
      search?: SearchDetails;
      /**
       * UTC offset or IANA time zone. Valid values are
       * ISO 8601 UTC offsets, such as +02:00 or -06:00,
       * and IANA time zone IDs, such as Europe/Rome
       *
       * Affects all filters and aggregations returned values.
       * You may override this behavior in a specific filter by providing
       * timestamps including time zone. e.g. `"2023-12-20T10:52:34.795Z"`
       */
      timeZone?: string | null;
  }
  /** @oneof */
  interface CursorSearchPagingMethodOneOf {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
      cursorPaging?: CursorPaging$1;
  }
  interface Aggregation extends AggregationKindOneOf {
      /** Value aggregation */
      value?: ValueAggregation;
      /** Range aggregation */
      range?: RangeAggregation;
      /** Scalar aggregation */
      scalar?: ScalarAggregation;
      /** Date histogram aggregation */
      dateHistogram?: DateHistogramAggregation;
      /** Nested aggregation */
      nested?: NestedAggregation;
      /** User-defined name of aggregation, should be unique, will appear in aggregation results */
      name?: string | null;
      /** Type of aggregation, client must provide matching aggregation field below */
      type?: AggregationType;
      /** Field to aggregate by, use dot notation to specify json path */
      fieldPath?: string;
  }
  /** @oneof */
  interface AggregationKindOneOf {
      /** Value aggregation */
      value?: ValueAggregation;
      /** Range aggregation */
      range?: RangeAggregation;
      /** Scalar aggregation */
      scalar?: ScalarAggregation;
      /** Date histogram aggregation */
      dateHistogram?: DateHistogramAggregation;
      /** Nested aggregation */
      nested?: NestedAggregation;
  }
  interface RangeBucket {
      /** Inclusive lower bound of the range. Required if to is not given */
      from?: number | null;
      /** Exclusive upper bound of the range. Required if from is not given */
      to?: number | null;
  }
  enum SortType {
      /** Should sort by number of matches */
      COUNT = "COUNT",
      /** Should sort by value of the field alphabetically */
      VALUE = "VALUE"
  }
  enum SortDirection {
      /** Should sort in descending order */
      DESC = "DESC",
      /** Should sort in ascending order */
      ASC = "ASC"
  }
  enum MissingValues {
      /** Should missing values be excluded from the aggregation results */
      EXCLUDE = "EXCLUDE",
      /** Should missing values be included in the aggregation results */
      INCLUDE = "INCLUDE"
  }
  interface IncludeMissingValuesOptions {
      /** Can specify custom bucket name. Defaults are [string -> "N/A"], [int -> "0"], [bool -> "false"] ... */
      addToBucket?: string;
  }
  enum ScalarType {
      UNKNOWN_SCALAR_TYPE = "UNKNOWN_SCALAR_TYPE",
      /** Count of distinct values */
      COUNT_DISTINCT = "COUNT_DISTINCT",
      /** Minimum value */
      MIN = "MIN",
      /** Maximum value */
      MAX = "MAX",
      /** Sum of values */
      SUM = "SUM",
      /** Average of values */
      AVG = "AVG"
  }
  interface ValueAggregation extends ValueAggregationOptionsOneOf {
      /** Options for including missing values */
      includeOptions?: IncludeMissingValuesOptions;
      /** Should sort by number of matches or value of the field */
      sortType?: SortType;
      /** Should sort in ascending or descending order */
      sortDirection?: SortDirection;
      /** How many aggregations would you like to return? Can be between 1 and 250. 10 is the default. */
      limit?: number | null;
      /** Should missing values be included or excluded from the aggregation results. Default is EXCLUDE */
      missingValues?: MissingValues;
  }
  /** @oneof */
  interface ValueAggregationOptionsOneOf {
      /** Options for including missing values */
      includeOptions?: IncludeMissingValuesOptions;
  }
  enum NestedAggregationType {
      UNKNOWN_AGGREGATION_TYPE = "UNKNOWN_AGGREGATION_TYPE",
      /** An aggregation where result buckets are dynamically built - one per unique value */
      VALUE = "VALUE",
      /** An aggregation, where user can define set of ranges - each representing a bucket */
      RANGE = "RANGE",
      /** A single-value metric aggregation - e.g. min, max, sum, avg */
      SCALAR = "SCALAR",
      /** An aggregation, where result buckets are dynamically built - one per time interval (hour, day, week, etc.) */
      DATE_HISTOGRAM = "DATE_HISTOGRAM"
  }
  interface RangeAggregation {
      /** List of range buckets, where during aggregation each entity will be placed in the first bucket where its value falls into based on provided range bounds */
      buckets?: RangeBucket[];
  }
  interface ScalarAggregation {
      /** Define the operator for the scalar aggregation */
      type?: ScalarType;
  }
  interface DateHistogramAggregation {
      /** Interval for date histogram aggregation */
      interval?: Interval;
  }
  enum Interval {
      UNKNOWN_INTERVAL = "UNKNOWN_INTERVAL",
      /** Yearly interval */
      YEAR = "YEAR",
      /** Monthly interval */
      MONTH = "MONTH",
      /** Weekly interval */
      WEEK = "WEEK",
      /** Daily interval */
      DAY = "DAY",
      /** Hourly interval */
      HOUR = "HOUR",
      /** Minute interval */
      MINUTE = "MINUTE",
      /** Second interval */
      SECOND = "SECOND"
  }
  interface NestedAggregationItem extends NestedAggregationItemKindOneOf {
      /** Value aggregation */
      value?: ValueAggregation;
      /** Range aggregation */
      range?: RangeAggregation;
      /** Scalar aggregation */
      scalar?: ScalarAggregation;
      /** Date histogram aggregation */
      dateHistogram?: DateHistogramAggregation;
      /** User-defined name of aggregation, should be unique, will appear in aggregation results */
      name?: string | null;
      /** Type of aggregation, client must provide matching aggregation field below */
      type?: NestedAggregationType;
      /** Field to aggregate by, use dont notation to specify json path */
      fieldPath?: string;
  }
  /** @oneof */
  interface NestedAggregationItemKindOneOf {
      /** Value aggregation */
      value?: ValueAggregation;
      /** Range aggregation */
      range?: RangeAggregation;
      /** Scalar aggregation */
      scalar?: ScalarAggregation;
      /** Date histogram aggregation */
      dateHistogram?: DateHistogramAggregation;
  }
  enum AggregationType {
      UNKNOWN_AGGREGATION_TYPE = "UNKNOWN_AGGREGATION_TYPE",
      /** An aggregation where result buckets are dynamically built - one per unique value */
      VALUE = "VALUE",
      /** An aggregation, where user can define set of ranges - each representing a bucket */
      RANGE = "RANGE",
      /** A single-value metric aggregation - e.g. min, max, sum, avg */
      SCALAR = "SCALAR",
      /** An aggregation, where result buckets are dynamically built - one per time interval (hour, day, week, etc.) */
      DATE_HISTOGRAM = "DATE_HISTOGRAM",
      /** Multi-level aggregation, where each next aggregation is nested within previous one */
      NESTED = "NESTED"
  }
  /** Nested aggregation expressed through a list of aggregation where each next aggregation is nested within previous one */
  interface NestedAggregation {
      /** Flattened list of aggregations, where each next aggregation is nested within previous one */
      nestedAggregations?: NestedAggregationItem[];
  }
  interface SearchDetails {
      /** Defines how separate search terms in `expression` are combined */
      mode?: Mode;
      /** Search term or expression */
      expression?: string | null;
      /** Fields to search in. If empty - will search in all searchable fields. Use dot notation to specify json path */
      fields?: string[];
      /** Flag if should use auto fuzzy search (allowing typos by a managed proximity algorithm) */
      fuzzy?: boolean;
  }
  enum Mode {
      /** Any of the search terms must be present */
      OR = "OR",
      /** All search terms must be present */
      AND = "AND"
  }
  interface SearchGiftCardsResponse {
      /** The retrieved gift cards. */
      giftCards?: GiftCard[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata$1;
      /** Aggregation data. */
      aggregationData?: AggregationData;
  }
  interface AggregationData {
      /** key = aggregation name (as derived from search request) */
      results?: AggregationResults[];
  }
  interface ValueAggregationResult {
      /** Value of the field */
      value?: string;
      /** Count of entities with this value */
      count?: number;
  }
  interface RangeAggregationResult {
      /** Inclusive lower bound of the range */
      from?: number | null;
      /** Exclusive upper bound of the range */
      to?: number | null;
      /** Count of entities in this range */
      count?: number;
  }
  interface NestedAggregationResults extends NestedAggregationResultsResultOneOf {
      /** Value aggregation results */
      values?: ValueResults;
      /** Range aggregation results */
      ranges?: RangeResults;
      /** Scalar aggregation results */
      scalar?: AggregationResultsScalarResult;
      /** User-defined name of aggregation, matches the one provided in request */
      name?: string;
      /** Type of aggregation that matches result */
      type?: AggregationType;
      /** Field to aggregate by, matches the one provided in request */
      fieldPath?: string;
  }
  /** @oneof */
  interface NestedAggregationResultsResultOneOf {
      /** Value aggregation results */
      values?: ValueResults;
      /** Range aggregation results */
      ranges?: RangeResults;
      /** Scalar aggregation results */
      scalar?: AggregationResultsScalarResult;
  }
  interface ValueResults {
      /** List of value aggregations */
      results?: ValueAggregationResult[];
  }
  interface RangeResults {
      /** List of ranges returned in same order as requested */
      results?: RangeAggregationResult[];
  }
  interface AggregationResultsScalarResult {
      /** Type of scalar aggregation */
      type?: ScalarType;
      /** Value of the scalar aggregation */
      value?: number;
  }
  interface NestedValueAggregationResult {
      /** Value of the field */
      value?: string;
      /** Nested aggregations */
      nestedResults?: NestedAggregationResults;
  }
  interface ValueResult {
      /** Value of the field */
      value?: string;
      /** Count of entities with this value */
      count?: number | null;
  }
  interface RangeResult {
      /** Inclusive lower bound of the range */
      from?: number | null;
      /** Exclusive upper bound of the range */
      to?: number | null;
      /** Count of entities in this range */
      count?: number | null;
  }
  interface ScalarResult {
      /** Value of the scalar aggregation */
      value?: number;
  }
  interface NestedResultValue extends NestedResultValueResultOneOf {
      /** Value aggregation result */
      value?: ValueResult;
      /** Range aggregation result */
      range?: RangeResult;
      /** Scalar aggregation result */
      scalar?: ScalarResult;
      /** Date histogram aggregation result */
      dateHistogram?: ValueResult;
  }
  /** @oneof */
  interface NestedResultValueResultOneOf {
      /** Value aggregation result */
      value?: ValueResult;
      /** Range aggregation result */
      range?: RangeResult;
      /** Scalar aggregation result */
      scalar?: ScalarResult;
      /** Date histogram aggregation result */
      dateHistogram?: ValueResult;
  }
  interface Results {
      /** List of nested aggregations */
      results?: Record<string, NestedResultValue>;
  }
  interface DateHistogramResult {
      /** Date in ISO 8601 format */
      value?: string;
      /** Count of documents in the bucket */
      count?: number;
  }
  interface GroupByValueResults {
      /** List of value aggregations */
      results?: NestedValueAggregationResult[];
  }
  interface DateHistogramResults {
      /** List of date histogram aggregations */
      results?: DateHistogramResult[];
  }
  /**
   * Results of `NESTED` aggregation type in a flattened form
   * aggregations in resulting array are keyed by requested aggregation `name`.
   */
  interface NestedResults {
      /** List of nested aggregations */
      results?: Results[];
  }
  interface AggregationResults extends AggregationResultsResultOneOf {
      /** Value aggregation results */
      values?: ValueResults;
      /** Range aggregation results */
      ranges?: RangeResults;
      /** Scalar aggregation results */
      scalar?: AggregationResultsScalarResult;
      /** Group by value aggregation results */
      groupedByValue?: GroupByValueResults;
      /** Date histogram aggregation results */
      dateHistogram?: DateHistogramResults;
      /** Nested aggregation results */
      nested?: NestedResults;
      /** User-defined name of aggregation as derived from search request */
      name?: string;
      /** Type of aggregation that must match provided kind as derived from search request */
      type?: AggregationType;
      /** Field to aggregate by as derived from search request */
      fieldPath?: string;
  }
  /** @oneof */
  interface AggregationResultsResultOneOf {
      /** Value aggregation results */
      values?: ValueResults;
      /** Range aggregation results */
      ranges?: RangeResults;
      /** Scalar aggregation results */
      scalar?: AggregationResultsScalarResult;
      /** Group by value aggregation results */
      groupedByValue?: GroupByValueResults;
      /** Date histogram aggregation results */
      dateHistogram?: DateHistogramResults;
      /** Nested aggregation results */
      nested?: NestedResults;
  }
  interface SendGiftCardEmailRequest {
      /** ID of the gift card to send the email for. */
      giftCardId: string;
      /**
       * Optional. Email address of the recipient to whom the gift card should be sent.
       * If not provided, the recipient's email will be retrieved from the gift card's associated recipient, if available.
       */
      recipientEmail?: string | null;
  }
  interface SendGiftCardEmailResponse {
  }
  interface DisableGiftCardRequest {
      /** ID of the gift card to disable. */
      giftCardId: string;
  }
  interface DisableGiftCardResponse {
      /** The disabled gift card. */
      giftCard?: GiftCard;
  }
  interface ListGiftCardsByEmailRequest {
      /** Email. */
      email: string;
  }
  interface ListGiftCardsByEmailResponse {
      /** The retrieved gift cards. */
      giftCards?: GiftCard[];
  }
  interface CountGiftCardsRequest {
      filter?: Record<string, any> | null;
  }
  interface CountGiftCardsResponse {
      count?: number;
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
  interface Empty$1 {
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
      locale?: Locale;
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
  interface Locale {
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
      periods?: TimePeriod$1[];
      /** Exceptions to the business's regular hours. The business can be open or closed during the exception. */
      specialHourPeriod?: SpecialHourPeriod[];
  }
  /** Weekly recurring time periods when the business is regularly open or the service is available. */
  interface TimePeriod$1 {
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
      locale?: Locale;
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
      siteCreated?: V4SiteCreated;
      /** Properties were cloned on site cloning. */
      siteCloned?: SiteCloned;
  }
  /** @oneof */
  interface ChangeContextPayloadOneOf {
      /** Properties were updated. */
      propertiesChange?: PropertiesChange;
      /** Default properties were created on site creation. */
      siteCreated?: V4SiteCreated;
      /** Properties were cloned on site cloning. */
      siteCloned?: SiteCloned;
  }
  interface PropertiesChange {
  }
  interface V4SiteCreated {
      /** Origin template site id. */
      originTemplateId?: string | null;
  }
  interface SiteCloned {
      /** Origin site id. */
      originMetaSiteId?: string;
  }
  interface TriggerGiftCardsAppInstallationFlowEvent$1 {
      /** The meta site ID to trigger installation flow for. */
      metaSiteId?: string;
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
  /**
   * Creates a gift card.
   * @param giftCard - Gift Card info for creation.
   * @public
   * @documentationMaturity preview
   * @requiredField giftCard
   * @requiredField giftCard.currency
   * @requiredField giftCard.initialValue
   * @requiredField giftCard.initialValue.amount
   * @requiredField giftCard.source
   * @permissionId GIFT_CARDS.GIFT_CARD_CREATE
   * @adminMethod
   * @returns The newly created gift card.
   */
  function createGiftCard(giftCard: GiftCard, options?: CreateGiftCardOptions): Promise<GiftCard>;
  interface CreateGiftCardOptions {
      /** Idempotency key for gift card creation. */
      idempotencyKey?: string | null;
  }
  /**
   * Retrieves a gift card.
   * @param giftCardId - ID of the gift card to be retrieved.
   * @public
   * @documentationMaturity preview
   * @requiredField giftCardId
   * @permissionId GIFT_CARDS.GIFT_CARD_READ
   * @adminMethod
   * @returns The requested gift card.
   */
  function getGiftCard(giftCardId: string): Promise<GiftCard>;
  /**
   * Retrieves a list of gift cards, given the provided [paging, filtering, and sorting][1].
   *
   * To learn how to query gift cards, see [API Query Language][2].
   *
   * [1]: https://dev.wix.com/api/rest/getting-started/sorting-and-paging
   * [2]: https://dev.wix.com/api/rest/getting-started/api-query-language
   * @public
   * @documentationMaturity preview
   * @permissionId GIFT_CARDS.GIFT_CARD_READ
   * @adminMethod
   */
  function queryGiftCards(): GiftCardsQueryBuilder;
  interface QueryCursorResult$1 {
      cursors: Cursors$1;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface GiftCardsQueryResult extends QueryCursorResult$1 {
      items: GiftCard[];
      query: GiftCardsQueryBuilder;
      next: () => Promise<GiftCardsQueryResult>;
      prev: () => Promise<GiftCardsQueryResult>;
  }
  interface GiftCardsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | 'code' | 'initialValue' | 'balance' | 'expirationDate' | '_createdDate' | '_updatedDate', value: any) => GiftCardsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | 'code' | 'initialValue' | 'balance' | 'expirationDate' | '_createdDate' | '_updatedDate', value: any) => GiftCardsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: 'expirationDate' | '_createdDate' | '_updatedDate', value: any) => GiftCardsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: 'expirationDate' | '_createdDate' | '_updatedDate', value: any) => GiftCardsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: 'expirationDate' | '_createdDate' | '_updatedDate', value: any) => GiftCardsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: 'expirationDate' | '_createdDate' | '_updatedDate', value: any) => GiftCardsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'code', value: string) => GiftCardsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | 'code' | 'initialValue' | 'balance' | 'expirationDate' | '_createdDate' | '_updatedDate', value: any[]) => GiftCardsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'code' | 'initialValue' | 'balance' | 'expirationDate' | '_createdDate' | '_updatedDate', value: any) => GiftCardsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | 'code' | 'initialValue' | 'balance' | 'expirationDate' | '_createdDate' | '_updatedDate', value: boolean) => GiftCardsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | 'code' | 'initialValue' | 'balance' | 'expirationDate' | '_createdDate' | '_updatedDate'>) => GiftCardsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | 'code' | 'initialValue' | 'balance' | 'expirationDate' | '_createdDate' | '_updatedDate'>) => GiftCardsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => GiftCardsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => GiftCardsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<GiftCardsQueryResult>;
  }
  /**
   * Retrieves a list of gift cards, given the provided [paging, filtering, and sorting][1].
   *
   * To learn how to search gift cards, see [API Query Language][2].
   *
   * [1]: https://dev.wix.com/api/rest/getting-started/sorting-and-paging
   * [2]: https://dev.wix.com/api/rest/getting-started/api-query-language
   * @param search - WQL expression.
   * @public
   * @documentationMaturity preview
   * @requiredField search
   * @permissionId GIFT_CARDS.GIFT_CARD_READ
   * @adminMethod
   */
  function searchGiftCards(search: CursorSearch): Promise<SearchGiftCardsResponse>;
  /**
   * Sends a gift card to its recipient.
   * @param giftCardId - ID of the gift card to send the email for.
   * @public
   * @documentationMaturity preview
   * @requiredField giftCardId
   * @permissionId GIFT_CARDS.GIFT_CARD_SEND_EMAIL
   * @adminMethod
   */
  function sendGiftCardEmail(giftCardId: string, options?: SendGiftCardEmailOptions): Promise<void>;
  interface SendGiftCardEmailOptions {
      /**
       * Optional. Email address of the recipient to whom the gift card should be sent.
       * If not provided, the recipient's email will be retrieved from the gift card's associated recipient, if available.
       */
      recipientEmail?: string | null;
  }
  /**
   * Disables a gift card.
   * @param giftCardId - ID of the gift card to disable.
   * @public
   * @documentationMaturity preview
   * @requiredField giftCardId
   * @permissionId GIFT_CARDS.GIFT_CARD_DISABLE
   * @adminMethod
   */
  function disableGiftCard(giftCardId: string): Promise<DisableGiftCardResponse>;
  /**
   * List gift cards by email (either sender's or recipient's email).
   * No more than 50 gift cards will be returned per request.
   * A default sorting is applied, by gift card's creation date, in descending order.
   * @param email - Email.
   * @public
   * @documentationMaturity preview
   * @requiredField email
   * @permissionId GIFT_CARDS.GIFT_CARD_READ
   * @adminMethod
   */
  function listGiftCardsByEmail(email: string): Promise<ListGiftCardsByEmailResponse>;
  /** @public
   * @documentationMaturity preview
   * @permissionId GIFT_CARDS.GIFT_CARD_READ
   * @adminMethod
   */
  function countGiftCards(options?: CountGiftCardsOptions): Promise<CountGiftCardsResponse>;
  interface CountGiftCardsOptions {
      filter?: Record<string, any> | null;
  }
  
  type giftCardsV1GiftCard_universal_d_GiftCard = GiftCard;
  type giftCardsV1GiftCard_universal_d_GiftCardSourceInfoOneOf = GiftCardSourceInfoOneOf;
  type giftCardsV1GiftCard_universal_d_Amount = Amount;
  type giftCardsV1GiftCard_universal_d_NotificationInfo = NotificationInfo;
  type giftCardsV1GiftCard_universal_d_Recipient = Recipient;
  type giftCardsV1GiftCard_universal_d_Sender = Sender;
  type giftCardsV1GiftCard_universal_d_Source = Source;
  const giftCardsV1GiftCard_universal_d_Source: typeof Source;
  type giftCardsV1GiftCard_universal_d_OrderInfo = OrderInfo;
  type giftCardsV1GiftCard_universal_d_StoreCreditAppInstallationCompleted = StoreCreditAppInstallationCompleted;
  type giftCardsV1GiftCard_universal_d_CreateGiftCardRequest = CreateGiftCardRequest;
  type giftCardsV1GiftCard_universal_d_CreateGiftCardResponse = CreateGiftCardResponse;
  type giftCardsV1GiftCard_universal_d_GetGiftCardRequest = GetGiftCardRequest;
  type giftCardsV1GiftCard_universal_d_GetGiftCardResponse = GetGiftCardResponse;
  type giftCardsV1GiftCard_universal_d_QueryGiftCardsRequest = QueryGiftCardsRequest;
  type giftCardsV1GiftCard_universal_d_QueryGiftCardsResponse = QueryGiftCardsResponse;
  type giftCardsV1GiftCard_universal_d_SearchGiftCardsRequest = SearchGiftCardsRequest;
  type giftCardsV1GiftCard_universal_d_CursorSearch = CursorSearch;
  type giftCardsV1GiftCard_universal_d_CursorSearchPagingMethodOneOf = CursorSearchPagingMethodOneOf;
  type giftCardsV1GiftCard_universal_d_Aggregation = Aggregation;
  type giftCardsV1GiftCard_universal_d_AggregationKindOneOf = AggregationKindOneOf;
  type giftCardsV1GiftCard_universal_d_RangeBucket = RangeBucket;
  type giftCardsV1GiftCard_universal_d_SortType = SortType;
  const giftCardsV1GiftCard_universal_d_SortType: typeof SortType;
  type giftCardsV1GiftCard_universal_d_SortDirection = SortDirection;
  const giftCardsV1GiftCard_universal_d_SortDirection: typeof SortDirection;
  type giftCardsV1GiftCard_universal_d_MissingValues = MissingValues;
  const giftCardsV1GiftCard_universal_d_MissingValues: typeof MissingValues;
  type giftCardsV1GiftCard_universal_d_IncludeMissingValuesOptions = IncludeMissingValuesOptions;
  type giftCardsV1GiftCard_universal_d_ScalarType = ScalarType;
  const giftCardsV1GiftCard_universal_d_ScalarType: typeof ScalarType;
  type giftCardsV1GiftCard_universal_d_ValueAggregation = ValueAggregation;
  type giftCardsV1GiftCard_universal_d_ValueAggregationOptionsOneOf = ValueAggregationOptionsOneOf;
  type giftCardsV1GiftCard_universal_d_NestedAggregationType = NestedAggregationType;
  const giftCardsV1GiftCard_universal_d_NestedAggregationType: typeof NestedAggregationType;
  type giftCardsV1GiftCard_universal_d_RangeAggregation = RangeAggregation;
  type giftCardsV1GiftCard_universal_d_ScalarAggregation = ScalarAggregation;
  type giftCardsV1GiftCard_universal_d_DateHistogramAggregation = DateHistogramAggregation;
  type giftCardsV1GiftCard_universal_d_Interval = Interval;
  const giftCardsV1GiftCard_universal_d_Interval: typeof Interval;
  type giftCardsV1GiftCard_universal_d_NestedAggregationItem = NestedAggregationItem;
  type giftCardsV1GiftCard_universal_d_NestedAggregationItemKindOneOf = NestedAggregationItemKindOneOf;
  type giftCardsV1GiftCard_universal_d_AggregationType = AggregationType;
  const giftCardsV1GiftCard_universal_d_AggregationType: typeof AggregationType;
  type giftCardsV1GiftCard_universal_d_NestedAggregation = NestedAggregation;
  type giftCardsV1GiftCard_universal_d_SearchDetails = SearchDetails;
  type giftCardsV1GiftCard_universal_d_Mode = Mode;
  const giftCardsV1GiftCard_universal_d_Mode: typeof Mode;
  type giftCardsV1GiftCard_universal_d_SearchGiftCardsResponse = SearchGiftCardsResponse;
  type giftCardsV1GiftCard_universal_d_AggregationData = AggregationData;
  type giftCardsV1GiftCard_universal_d_ValueAggregationResult = ValueAggregationResult;
  type giftCardsV1GiftCard_universal_d_RangeAggregationResult = RangeAggregationResult;
  type giftCardsV1GiftCard_universal_d_NestedAggregationResults = NestedAggregationResults;
  type giftCardsV1GiftCard_universal_d_NestedAggregationResultsResultOneOf = NestedAggregationResultsResultOneOf;
  type giftCardsV1GiftCard_universal_d_ValueResults = ValueResults;
  type giftCardsV1GiftCard_universal_d_RangeResults = RangeResults;
  type giftCardsV1GiftCard_universal_d_AggregationResultsScalarResult = AggregationResultsScalarResult;
  type giftCardsV1GiftCard_universal_d_NestedValueAggregationResult = NestedValueAggregationResult;
  type giftCardsV1GiftCard_universal_d_ValueResult = ValueResult;
  type giftCardsV1GiftCard_universal_d_RangeResult = RangeResult;
  type giftCardsV1GiftCard_universal_d_ScalarResult = ScalarResult;
  type giftCardsV1GiftCard_universal_d_NestedResultValue = NestedResultValue;
  type giftCardsV1GiftCard_universal_d_NestedResultValueResultOneOf = NestedResultValueResultOneOf;
  type giftCardsV1GiftCard_universal_d_Results = Results;
  type giftCardsV1GiftCard_universal_d_DateHistogramResult = DateHistogramResult;
  type giftCardsV1GiftCard_universal_d_GroupByValueResults = GroupByValueResults;
  type giftCardsV1GiftCard_universal_d_DateHistogramResults = DateHistogramResults;
  type giftCardsV1GiftCard_universal_d_NestedResults = NestedResults;
  type giftCardsV1GiftCard_universal_d_AggregationResults = AggregationResults;
  type giftCardsV1GiftCard_universal_d_AggregationResultsResultOneOf = AggregationResultsResultOneOf;
  type giftCardsV1GiftCard_universal_d_SendGiftCardEmailRequest = SendGiftCardEmailRequest;
  type giftCardsV1GiftCard_universal_d_SendGiftCardEmailResponse = SendGiftCardEmailResponse;
  type giftCardsV1GiftCard_universal_d_DisableGiftCardRequest = DisableGiftCardRequest;
  type giftCardsV1GiftCard_universal_d_DisableGiftCardResponse = DisableGiftCardResponse;
  type giftCardsV1GiftCard_universal_d_ListGiftCardsByEmailRequest = ListGiftCardsByEmailRequest;
  type giftCardsV1GiftCard_universal_d_ListGiftCardsByEmailResponse = ListGiftCardsByEmailResponse;
  type giftCardsV1GiftCard_universal_d_CountGiftCardsRequest = CountGiftCardsRequest;
  type giftCardsV1GiftCard_universal_d_CountGiftCardsResponse = CountGiftCardsResponse;
  type giftCardsV1GiftCard_universal_d_MetaSiteSpecialEvent = MetaSiteSpecialEvent;
  type giftCardsV1GiftCard_universal_d_MetaSiteSpecialEventPayloadOneOf = MetaSiteSpecialEventPayloadOneOf;
  type giftCardsV1GiftCard_universal_d_Asset = Asset;
  type giftCardsV1GiftCard_universal_d_State = State;
  const giftCardsV1GiftCard_universal_d_State: typeof State;
  type giftCardsV1GiftCard_universal_d_SiteCreated = SiteCreated;
  type giftCardsV1GiftCard_universal_d_SiteCreatedContext = SiteCreatedContext;
  const giftCardsV1GiftCard_universal_d_SiteCreatedContext: typeof SiteCreatedContext;
  type giftCardsV1GiftCard_universal_d_Namespace = Namespace;
  const giftCardsV1GiftCard_universal_d_Namespace: typeof Namespace;
  type giftCardsV1GiftCard_universal_d_SiteTransferred = SiteTransferred;
  type giftCardsV1GiftCard_universal_d_SiteDeleted = SiteDeleted;
  type giftCardsV1GiftCard_universal_d_DeleteContext = DeleteContext;
  type giftCardsV1GiftCard_universal_d_DeleteStatus = DeleteStatus;
  const giftCardsV1GiftCard_universal_d_DeleteStatus: typeof DeleteStatus;
  type giftCardsV1GiftCard_universal_d_SiteUndeleted = SiteUndeleted;
  type giftCardsV1GiftCard_universal_d_SitePublished = SitePublished;
  type giftCardsV1GiftCard_universal_d_SiteUnpublished = SiteUnpublished;
  type giftCardsV1GiftCard_universal_d_SiteMarkedAsTemplate = SiteMarkedAsTemplate;
  type giftCardsV1GiftCard_universal_d_SiteMarkedAsWixSite = SiteMarkedAsWixSite;
  type giftCardsV1GiftCard_universal_d_ServiceProvisioned = ServiceProvisioned;
  type giftCardsV1GiftCard_universal_d_ServiceRemoved = ServiceRemoved;
  type giftCardsV1GiftCard_universal_d_SiteRenamed = SiteRenamed;
  type giftCardsV1GiftCard_universal_d_SiteHardDeleted = SiteHardDeleted;
  type giftCardsV1GiftCard_universal_d_NamespaceChanged = NamespaceChanged;
  type giftCardsV1GiftCard_universal_d_StudioAssigned = StudioAssigned;
  type giftCardsV1GiftCard_universal_d_StudioUnassigned = StudioUnassigned;
  type giftCardsV1GiftCard_universal_d_SitePropertiesNotification = SitePropertiesNotification;
  type giftCardsV1GiftCard_universal_d_SitePropertiesEvent = SitePropertiesEvent;
  type giftCardsV1GiftCard_universal_d_Properties = Properties;
  type giftCardsV1GiftCard_universal_d_Categories = Categories;
  type giftCardsV1GiftCard_universal_d_Locale = Locale;
  type giftCardsV1GiftCard_universal_d_Address = Address;
  type giftCardsV1GiftCard_universal_d_AddressHint = AddressHint;
  type giftCardsV1GiftCard_universal_d_PlacementType = PlacementType;
  const giftCardsV1GiftCard_universal_d_PlacementType: typeof PlacementType;
  type giftCardsV1GiftCard_universal_d_GeoCoordinates = GeoCoordinates;
  type giftCardsV1GiftCard_universal_d_BusinessSchedule = BusinessSchedule;
  type giftCardsV1GiftCard_universal_d_DayOfWeek = DayOfWeek;
  const giftCardsV1GiftCard_universal_d_DayOfWeek: typeof DayOfWeek;
  type giftCardsV1GiftCard_universal_d_SpecialHourPeriod = SpecialHourPeriod;
  type giftCardsV1GiftCard_universal_d_Multilingual = Multilingual;
  type giftCardsV1GiftCard_universal_d_SupportedLanguage = SupportedLanguage;
  type giftCardsV1GiftCard_universal_d_ResolutionMethod = ResolutionMethod;
  const giftCardsV1GiftCard_universal_d_ResolutionMethod: typeof ResolutionMethod;
  type giftCardsV1GiftCard_universal_d_ConsentPolicy = ConsentPolicy;
  type giftCardsV1GiftCard_universal_d_Translation = Translation;
  type giftCardsV1GiftCard_universal_d_ChangeContext = ChangeContext;
  type giftCardsV1GiftCard_universal_d_ChangeContextPayloadOneOf = ChangeContextPayloadOneOf;
  type giftCardsV1GiftCard_universal_d_PropertiesChange = PropertiesChange;
  type giftCardsV1GiftCard_universal_d_V4SiteCreated = V4SiteCreated;
  type giftCardsV1GiftCard_universal_d_SiteCloned = SiteCloned;
  const giftCardsV1GiftCard_universal_d_createGiftCard: typeof createGiftCard;
  type giftCardsV1GiftCard_universal_d_CreateGiftCardOptions = CreateGiftCardOptions;
  const giftCardsV1GiftCard_universal_d_getGiftCard: typeof getGiftCard;
  const giftCardsV1GiftCard_universal_d_queryGiftCards: typeof queryGiftCards;
  type giftCardsV1GiftCard_universal_d_GiftCardsQueryResult = GiftCardsQueryResult;
  type giftCardsV1GiftCard_universal_d_GiftCardsQueryBuilder = GiftCardsQueryBuilder;
  const giftCardsV1GiftCard_universal_d_searchGiftCards: typeof searchGiftCards;
  const giftCardsV1GiftCard_universal_d_sendGiftCardEmail: typeof sendGiftCardEmail;
  type giftCardsV1GiftCard_universal_d_SendGiftCardEmailOptions = SendGiftCardEmailOptions;
  const giftCardsV1GiftCard_universal_d_disableGiftCard: typeof disableGiftCard;
  const giftCardsV1GiftCard_universal_d_listGiftCardsByEmail: typeof listGiftCardsByEmail;
  const giftCardsV1GiftCard_universal_d_countGiftCards: typeof countGiftCards;
  type giftCardsV1GiftCard_universal_d_CountGiftCardsOptions = CountGiftCardsOptions;
  namespace giftCardsV1GiftCard_universal_d {
    export {
      giftCardsV1GiftCard_universal_d_GiftCard as GiftCard,
      giftCardsV1GiftCard_universal_d_GiftCardSourceInfoOneOf as GiftCardSourceInfoOneOf,
      giftCardsV1GiftCard_universal_d_Amount as Amount,
      giftCardsV1GiftCard_universal_d_NotificationInfo as NotificationInfo,
      giftCardsV1GiftCard_universal_d_Recipient as Recipient,
      giftCardsV1GiftCard_universal_d_Sender as Sender,
      giftCardsV1GiftCard_universal_d_Source as Source,
      giftCardsV1GiftCard_universal_d_OrderInfo as OrderInfo,
      GiftCardsAppInstallationCompleted$1 as GiftCardsAppInstallationCompleted,
      giftCardsV1GiftCard_universal_d_StoreCreditAppInstallationCompleted as StoreCreditAppInstallationCompleted,
      giftCardsV1GiftCard_universal_d_CreateGiftCardRequest as CreateGiftCardRequest,
      giftCardsV1GiftCard_universal_d_CreateGiftCardResponse as CreateGiftCardResponse,
      giftCardsV1GiftCard_universal_d_GetGiftCardRequest as GetGiftCardRequest,
      giftCardsV1GiftCard_universal_d_GetGiftCardResponse as GetGiftCardResponse,
      giftCardsV1GiftCard_universal_d_QueryGiftCardsRequest as QueryGiftCardsRequest,
      CursorQuery$1 as CursorQuery,
      CursorQueryPagingMethodOneOf$1 as CursorQueryPagingMethodOneOf,
      Sorting$1 as Sorting,
      SortOrder$1 as SortOrder,
      CursorPaging$1 as CursorPaging,
      giftCardsV1GiftCard_universal_d_QueryGiftCardsResponse as QueryGiftCardsResponse,
      CursorPagingMetadata$1 as CursorPagingMetadata,
      Cursors$1 as Cursors,
      giftCardsV1GiftCard_universal_d_SearchGiftCardsRequest as SearchGiftCardsRequest,
      giftCardsV1GiftCard_universal_d_CursorSearch as CursorSearch,
      giftCardsV1GiftCard_universal_d_CursorSearchPagingMethodOneOf as CursorSearchPagingMethodOneOf,
      giftCardsV1GiftCard_universal_d_Aggregation as Aggregation,
      giftCardsV1GiftCard_universal_d_AggregationKindOneOf as AggregationKindOneOf,
      giftCardsV1GiftCard_universal_d_RangeBucket as RangeBucket,
      giftCardsV1GiftCard_universal_d_SortType as SortType,
      giftCardsV1GiftCard_universal_d_SortDirection as SortDirection,
      giftCardsV1GiftCard_universal_d_MissingValues as MissingValues,
      giftCardsV1GiftCard_universal_d_IncludeMissingValuesOptions as IncludeMissingValuesOptions,
      giftCardsV1GiftCard_universal_d_ScalarType as ScalarType,
      giftCardsV1GiftCard_universal_d_ValueAggregation as ValueAggregation,
      giftCardsV1GiftCard_universal_d_ValueAggregationOptionsOneOf as ValueAggregationOptionsOneOf,
      giftCardsV1GiftCard_universal_d_NestedAggregationType as NestedAggregationType,
      giftCardsV1GiftCard_universal_d_RangeAggregation as RangeAggregation,
      giftCardsV1GiftCard_universal_d_ScalarAggregation as ScalarAggregation,
      giftCardsV1GiftCard_universal_d_DateHistogramAggregation as DateHistogramAggregation,
      giftCardsV1GiftCard_universal_d_Interval as Interval,
      giftCardsV1GiftCard_universal_d_NestedAggregationItem as NestedAggregationItem,
      giftCardsV1GiftCard_universal_d_NestedAggregationItemKindOneOf as NestedAggregationItemKindOneOf,
      giftCardsV1GiftCard_universal_d_AggregationType as AggregationType,
      giftCardsV1GiftCard_universal_d_NestedAggregation as NestedAggregation,
      giftCardsV1GiftCard_universal_d_SearchDetails as SearchDetails,
      giftCardsV1GiftCard_universal_d_Mode as Mode,
      giftCardsV1GiftCard_universal_d_SearchGiftCardsResponse as SearchGiftCardsResponse,
      giftCardsV1GiftCard_universal_d_AggregationData as AggregationData,
      giftCardsV1GiftCard_universal_d_ValueAggregationResult as ValueAggregationResult,
      giftCardsV1GiftCard_universal_d_RangeAggregationResult as RangeAggregationResult,
      giftCardsV1GiftCard_universal_d_NestedAggregationResults as NestedAggregationResults,
      giftCardsV1GiftCard_universal_d_NestedAggregationResultsResultOneOf as NestedAggregationResultsResultOneOf,
      giftCardsV1GiftCard_universal_d_ValueResults as ValueResults,
      giftCardsV1GiftCard_universal_d_RangeResults as RangeResults,
      giftCardsV1GiftCard_universal_d_AggregationResultsScalarResult as AggregationResultsScalarResult,
      giftCardsV1GiftCard_universal_d_NestedValueAggregationResult as NestedValueAggregationResult,
      giftCardsV1GiftCard_universal_d_ValueResult as ValueResult,
      giftCardsV1GiftCard_universal_d_RangeResult as RangeResult,
      giftCardsV1GiftCard_universal_d_ScalarResult as ScalarResult,
      giftCardsV1GiftCard_universal_d_NestedResultValue as NestedResultValue,
      giftCardsV1GiftCard_universal_d_NestedResultValueResultOneOf as NestedResultValueResultOneOf,
      giftCardsV1GiftCard_universal_d_Results as Results,
      giftCardsV1GiftCard_universal_d_DateHistogramResult as DateHistogramResult,
      giftCardsV1GiftCard_universal_d_GroupByValueResults as GroupByValueResults,
      giftCardsV1GiftCard_universal_d_DateHistogramResults as DateHistogramResults,
      giftCardsV1GiftCard_universal_d_NestedResults as NestedResults,
      giftCardsV1GiftCard_universal_d_AggregationResults as AggregationResults,
      giftCardsV1GiftCard_universal_d_AggregationResultsResultOneOf as AggregationResultsResultOneOf,
      giftCardsV1GiftCard_universal_d_SendGiftCardEmailRequest as SendGiftCardEmailRequest,
      giftCardsV1GiftCard_universal_d_SendGiftCardEmailResponse as SendGiftCardEmailResponse,
      giftCardsV1GiftCard_universal_d_DisableGiftCardRequest as DisableGiftCardRequest,
      giftCardsV1GiftCard_universal_d_DisableGiftCardResponse as DisableGiftCardResponse,
      giftCardsV1GiftCard_universal_d_ListGiftCardsByEmailRequest as ListGiftCardsByEmailRequest,
      giftCardsV1GiftCard_universal_d_ListGiftCardsByEmailResponse as ListGiftCardsByEmailResponse,
      giftCardsV1GiftCard_universal_d_CountGiftCardsRequest as CountGiftCardsRequest,
      giftCardsV1GiftCard_universal_d_CountGiftCardsResponse as CountGiftCardsResponse,
      DomainEvent$1 as DomainEvent,
      DomainEventBodyOneOf$1 as DomainEventBodyOneOf,
      EntityCreatedEvent$1 as EntityCreatedEvent,
      RestoreInfo$1 as RestoreInfo,
      EntityUpdatedEvent$1 as EntityUpdatedEvent,
      EntityDeletedEvent$1 as EntityDeletedEvent,
      ActionEvent$1 as ActionEvent,
      Empty$1 as Empty,
      giftCardsV1GiftCard_universal_d_MetaSiteSpecialEvent as MetaSiteSpecialEvent,
      giftCardsV1GiftCard_universal_d_MetaSiteSpecialEventPayloadOneOf as MetaSiteSpecialEventPayloadOneOf,
      giftCardsV1GiftCard_universal_d_Asset as Asset,
      giftCardsV1GiftCard_universal_d_State as State,
      giftCardsV1GiftCard_universal_d_SiteCreated as SiteCreated,
      giftCardsV1GiftCard_universal_d_SiteCreatedContext as SiteCreatedContext,
      giftCardsV1GiftCard_universal_d_Namespace as Namespace,
      giftCardsV1GiftCard_universal_d_SiteTransferred as SiteTransferred,
      giftCardsV1GiftCard_universal_d_SiteDeleted as SiteDeleted,
      giftCardsV1GiftCard_universal_d_DeleteContext as DeleteContext,
      giftCardsV1GiftCard_universal_d_DeleteStatus as DeleteStatus,
      giftCardsV1GiftCard_universal_d_SiteUndeleted as SiteUndeleted,
      giftCardsV1GiftCard_universal_d_SitePublished as SitePublished,
      giftCardsV1GiftCard_universal_d_SiteUnpublished as SiteUnpublished,
      giftCardsV1GiftCard_universal_d_SiteMarkedAsTemplate as SiteMarkedAsTemplate,
      giftCardsV1GiftCard_universal_d_SiteMarkedAsWixSite as SiteMarkedAsWixSite,
      giftCardsV1GiftCard_universal_d_ServiceProvisioned as ServiceProvisioned,
      giftCardsV1GiftCard_universal_d_ServiceRemoved as ServiceRemoved,
      giftCardsV1GiftCard_universal_d_SiteRenamed as SiteRenamed,
      giftCardsV1GiftCard_universal_d_SiteHardDeleted as SiteHardDeleted,
      giftCardsV1GiftCard_universal_d_NamespaceChanged as NamespaceChanged,
      giftCardsV1GiftCard_universal_d_StudioAssigned as StudioAssigned,
      giftCardsV1GiftCard_universal_d_StudioUnassigned as StudioUnassigned,
      giftCardsV1GiftCard_universal_d_SitePropertiesNotification as SitePropertiesNotification,
      giftCardsV1GiftCard_universal_d_SitePropertiesEvent as SitePropertiesEvent,
      giftCardsV1GiftCard_universal_d_Properties as Properties,
      giftCardsV1GiftCard_universal_d_Categories as Categories,
      giftCardsV1GiftCard_universal_d_Locale as Locale,
      giftCardsV1GiftCard_universal_d_Address as Address,
      giftCardsV1GiftCard_universal_d_AddressHint as AddressHint,
      giftCardsV1GiftCard_universal_d_PlacementType as PlacementType,
      giftCardsV1GiftCard_universal_d_GeoCoordinates as GeoCoordinates,
      giftCardsV1GiftCard_universal_d_BusinessSchedule as BusinessSchedule,
      TimePeriod$1 as TimePeriod,
      giftCardsV1GiftCard_universal_d_DayOfWeek as DayOfWeek,
      giftCardsV1GiftCard_universal_d_SpecialHourPeriod as SpecialHourPeriod,
      giftCardsV1GiftCard_universal_d_Multilingual as Multilingual,
      giftCardsV1GiftCard_universal_d_SupportedLanguage as SupportedLanguage,
      giftCardsV1GiftCard_universal_d_ResolutionMethod as ResolutionMethod,
      giftCardsV1GiftCard_universal_d_ConsentPolicy as ConsentPolicy,
      giftCardsV1GiftCard_universal_d_Translation as Translation,
      giftCardsV1GiftCard_universal_d_ChangeContext as ChangeContext,
      giftCardsV1GiftCard_universal_d_ChangeContextPayloadOneOf as ChangeContextPayloadOneOf,
      giftCardsV1GiftCard_universal_d_PropertiesChange as PropertiesChange,
      giftCardsV1GiftCard_universal_d_V4SiteCreated as V4SiteCreated,
      giftCardsV1GiftCard_universal_d_SiteCloned as SiteCloned,
      TriggerGiftCardsAppInstallationFlowEvent$1 as TriggerGiftCardsAppInstallationFlowEvent,
      MessageEnvelope$1 as MessageEnvelope,
      IdentificationData$1 as IdentificationData,
      IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf,
      WebhookIdentityType$1 as WebhookIdentityType,
      giftCardsV1GiftCard_universal_d_createGiftCard as createGiftCard,
      giftCardsV1GiftCard_universal_d_CreateGiftCardOptions as CreateGiftCardOptions,
      giftCardsV1GiftCard_universal_d_getGiftCard as getGiftCard,
      giftCardsV1GiftCard_universal_d_queryGiftCards as queryGiftCards,
      giftCardsV1GiftCard_universal_d_GiftCardsQueryResult as GiftCardsQueryResult,
      giftCardsV1GiftCard_universal_d_GiftCardsQueryBuilder as GiftCardsQueryBuilder,
      giftCardsV1GiftCard_universal_d_searchGiftCards as searchGiftCards,
      giftCardsV1GiftCard_universal_d_sendGiftCardEmail as sendGiftCardEmail,
      giftCardsV1GiftCard_universal_d_SendGiftCardEmailOptions as SendGiftCardEmailOptions,
      giftCardsV1GiftCard_universal_d_disableGiftCard as disableGiftCard,
      giftCardsV1GiftCard_universal_d_listGiftCardsByEmail as listGiftCardsByEmail,
      giftCardsV1GiftCard_universal_d_countGiftCards as countGiftCards,
      giftCardsV1GiftCard_universal_d_CountGiftCardsOptions as CountGiftCardsOptions,
    };
  }
  
  interface GiftCardProduct extends GiftCardProductExpirationDateOneOf {
      /** Fixed expiration date. */
      fixedExpirationDate?: Date | null;
      /** Relative expiration date from date of purchase. */
      relativeExpirationDate?: RelativeExpirationDate;
      /**
       * Gift card product unique ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the GiftCardProduct is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the product.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the product was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the product was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Gift card product name. */
      name?: string;
      /** Gift card product description. */
      description?: string | null;
      /**
       * Gift card product image.
       * + Pass at least media ID, width, and height. You should be able to get these values when you upload an image to Wix media manager.
       * + Given a full image URL of https://static.wixstatic.com/media/5cc69183e7954e2c9760fa2383870992.jpg, `media.id` would be "5cc69183e7954e2c9760fa2383870992.jpg".
       * + We only support images coming from Wix media manager, if you want to use an image from another source you must first upload it to Wix media manager.
       */
      image?: string;
      /** Gift card product expiration type */
      expirationType?: ExpirationType;
      /** Array of preset product variants. */
      presetVariants?: PresetVariant[];
      /** Gift card product custom variants */
      customVariant?: CustomVariant;
      /**
       * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the [app dashboard](https://dev.wix.com/dc3/my-apps/) before they can be accessed with API calls.
       * Enabling users to save custom data related to the gift card product.
       */
      extendedFields?: ExtendedFields;
  }
  /** @oneof */
  interface GiftCardProductExpirationDateOneOf {
      /** Fixed expiration date. */
      fixedExpirationDate?: Date | null;
      /** Relative expiration date from date of purchase. */
      relativeExpirationDate?: RelativeExpirationDate;
  }
  enum ExpirationType {
      UNKNOWN_EXPIRATION_TYPE = "UNKNOWN_EXPIRATION_TYPE",
      NONE = "NONE",
      FIXED = "FIXED",
      RELATIVE = "RELATIVE"
  }
  interface RelativeExpirationDate {
      /** Value until expiration. */
      value?: number;
      /** Time period until expiration */
      period?: TimePeriod;
  }
  enum TimePeriod {
      UNKNOWN_TIME_PERIOD = "UNKNOWN_TIME_PERIOD",
      DAYS = "DAYS",
      WEEKS = "WEEKS",
      MONTHS = "MONTHS",
      YEARS = "YEARS"
  }
  interface PresetVariant {
      /**
       * Gift card product variant unique ID.
       * @readonly
       */
      _id?: string | null;
      /** Gift card product variant price. */
      price?: MultiCurrencyPrice;
      /** Gift card product variant actual value. */
      value?: MultiCurrencyPrice;
      /**
       * Gift card product variant image.
       * + Pass at least media ID, width, and height. You should be able to get these values when you upload an image to Wix media manager.
       * + Given a full image URL of https://static.wixstatic.com/media/5cc69183e7954e2c9760fa2383870992.jpg, `media.id` would be "5cc69183e7954e2c9760fa2383870992.jpg".
       * + We only support images coming from Wix media manager, if you want to use an image from another source you must first upload it to Wix media manager.
       */
      image?: string;
  }
  interface MultiCurrencyPrice {
      /** Amount. */
      amount?: string;
      /**
       * Converted amount.
       * @readonly
       */
      convertedAmount?: string;
      /**
       * Amount formatted with currency symbol.
       * @readonly
       */
      formattedAmount?: string;
      /**
       * Converted amount formatted with currency symbol.
       * @readonly
       */
      formattedConvertedAmount?: string;
  }
  interface CustomVariant {
      /** Gift card product variant min value. */
      minValue?: MultiCurrencyPrice;
      /** Gift card product variant max value. */
      maxValue?: MultiCurrencyPrice;
      /**
       * Gift card product variant image.
       * + Pass at least media ID, width, and height. You should be able to get these values when you upload an image to Wix media manager.
       * + Given a full image URL of https://static.wixstatic.com/media/5cc69183e7954e2c9760fa2383870992.jpg, `media.id` would be "5cc69183e7954e2c9760fa2383870992.jpg".
       * + We only support images coming from Wix media manager, if you want to use an image from another source you must first upload it to Wix media manager.
       */
      image?: string;
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
  interface TriggerGiftCardsAppInstallationFlowEvent {
      /** The meta site ID to trigger installation flow for. */
      metaSiteId?: string;
  }
  interface CreateGiftCardProductRequest {
      /** Gift card product to be created. */
      giftCardProduct: GiftCardProduct;
  }
  interface CreateGiftCardProductResponse {
      /** The created gift card product. */
      giftCardProduct?: GiftCardProduct;
  }
  interface GetGiftCardProductRequest {
      /** ID of the gift card product to retrieve. */
      giftCardProductId: string;
  }
  interface GetGiftCardProductResponse {
      /** The requested gift card product. */
      giftCardProduct?: GiftCardProduct;
  }
  interface UpdateGiftCardProductRequest {
      /** Gift card product to be updated, may be partial. */
      giftCardProduct: GiftCardProduct;
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateGiftCardProductResponse {
      /** Updated gift card product. */
      giftCardProduct?: GiftCardProduct;
  }
  interface DeleteGiftCardProductRequest {
      /** Id of the gift card product to delete. */
      giftCardProductId: string;
  }
  interface DeleteGiftCardProductResponse {
  }
  interface QueryGiftCardProductsRequest {
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
       * Pass the relevant cursor token from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface QueryGiftCardProductsResponse {
      /** List of gift card products. */
      giftCardProducts?: GiftCardProduct[];
      /** Paging metadata */
      pagingMetadata?: CursorPagingMetadata;
  }
  interface CursorPagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors;
      /**
       * Whether there are more pages to retrieve following the current page.
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
  interface GiftCardsAppInstallationCompleted {
  }
  interface Empty {
  }
  interface IsInWixGiftCardsAppPopulationRequest {
  }
  interface IsInWixGiftCardsAppPopulationResponse {
      /** true if site is in the new Wix Gift Cards App population. */
      shouldUseNewGiftCardServices?: boolean;
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
   * Creates a new gift card product.
   * @param giftCardProduct - Gift card product to be created.
   * @public
   * @documentationMaturity preview
   * @requiredField giftCardProduct
   * @requiredField giftCardProduct.name
   * @requiredField giftCardProduct.presetVariants.price
   * @requiredField giftCardProduct.presetVariants.price.amount
   * @permissionId GIFT_CARDS.GIFT_CARD_PRODUCT_CREATE
   * @adminMethod
   * @returns The created gift card product.
   */
  function createGiftCardProduct(giftCardProduct: GiftCardProduct): Promise<GiftCardProduct>;
  /**
   * Retrieves a gift card product.
   * @param giftCardProductId - ID of the gift card product to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField giftCardProductId
   * @permissionId GIFT_CARDS.GIFT_CARD_PRODUCT_READ
   * @returns The requested gift card product.
   */
  function getGiftCardProduct(giftCardProductId: string): Promise<GiftCardProduct>;
  /**
   * Updates a gift card product.
   * Supports partial update.
   * Pass the latest `revision` for a successful update.
   * Each time the category is updated, `revision` increments by 1.
   * @param _id - Gift card product unique ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField giftCardProduct
   * @requiredField giftCardProduct.presetVariants.price
   * @requiredField giftCardProduct.presetVariants.price.amount
   * @requiredField giftCardProduct.revision
   * @permissionId GIFT_CARDS.GIFT_CARD_PRODUCT_UPDATE
   * @adminMethod
   * @returns Updated gift card product.
   */
  function updateGiftCardProduct(_id: string | null, giftCardProduct: UpdateGiftCardProduct, options?: UpdateGiftCardProductOptions): Promise<GiftCardProduct>;
  interface UpdateGiftCardProduct {
      /** Fixed expiration date. */
      fixedExpirationDate?: Date | null;
      /** Relative expiration date from date of purchase. */
      relativeExpirationDate?: RelativeExpirationDate;
      /**
       * Gift card product unique ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the GiftCardProduct is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the product.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the product was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the product was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Gift card product name. */
      name?: string;
      /** Gift card product description. */
      description?: string | null;
      /**
       * Gift card product image.
       * + Pass at least media ID, width, and height. You should be able to get these values when you upload an image to Wix media manager.
       * + Given a full image URL of https://static.wixstatic.com/media/5cc69183e7954e2c9760fa2383870992.jpg, `media.id` would be "5cc69183e7954e2c9760fa2383870992.jpg".
       * + We only support images coming from Wix media manager, if you want to use an image from another source you must first upload it to Wix media manager.
       */
      image?: string;
      /** Gift card product expiration type */
      expirationType?: ExpirationType;
      /** Array of preset product variants. */
      presetVariants?: PresetVariant[];
      /** Gift card product custom variants */
      customVariant?: CustomVariant;
      /**
       * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the [app dashboard](https://dev.wix.com/dc3/my-apps/) before they can be accessed with API calls.
       * Enabling users to save custom data related to the gift card product.
       */
      extendedFields?: ExtendedFields;
  }
  interface UpdateGiftCardProductOptions {
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Deletes a gift card product.
   * @param giftCardProductId - Id of the gift card product to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField giftCardProductId
   * @permissionId GIFT_CARDS.GIFT_CARD_PRODUCT_DELETE
   * @adminMethod
   */
  function deleteGiftCardProduct(giftCardProductId: string): Promise<void>;
  /**
   * Retrieves a list of gift card products, given the provided [paging, filtering, and sorting][1].
   *
   * Up to 1,000 gift card products can be returned per request.
   *
   * To learn how to query gift card products, see [API Query Language][2].
   *
   * [1]: https://dev.wix.com/api/rest/getting-started/sorting-and-paging
   * [2]: https://dev.wix.com/api/rest/getting-started/api-query-language
   * @public
   * @documentationMaturity preview
   * @permissionId GIFT_CARDS.GIFT_CARD_PRODUCT_READ
   */
  function queryGiftCardProducts(): GiftCardProductsQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface GiftCardProductsQueryResult extends QueryCursorResult {
      items: GiftCardProduct[];
      query: GiftCardProductsQueryBuilder;
      next: () => Promise<GiftCardProductsQueryResult>;
      prev: () => Promise<GiftCardProductsQueryResult>;
  }
  interface GiftCardProductsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'fixedExpirationDate' | '_id' | '_createdDate' | '_updatedDate' | 'name' | 'presetVariants.id' | 'presetVariants.price', value: any) => GiftCardProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: 'fixedExpirationDate' | '_id' | '_createdDate' | '_updatedDate' | 'name' | 'presetVariants.id' | 'presetVariants.price', value: any) => GiftCardProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: 'fixedExpirationDate' | '_createdDate' | '_updatedDate', value: any) => GiftCardProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: 'fixedExpirationDate' | '_createdDate' | '_updatedDate', value: any) => GiftCardProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: 'fixedExpirationDate' | '_createdDate' | '_updatedDate', value: any) => GiftCardProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: 'fixedExpirationDate' | '_createdDate' | '_updatedDate', value: any) => GiftCardProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'name' | 'presetVariants.id', value: string) => GiftCardProductsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: 'fixedExpirationDate' | '_id' | '_createdDate' | '_updatedDate' | 'name' | 'presetVariants.id' | 'presetVariants.price', value: any[]) => GiftCardProductsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'fixedExpirationDate' | '_id' | '_createdDate' | '_updatedDate' | 'name' | 'presetVariants.id' | 'presetVariants.price', value: any) => GiftCardProductsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'fixedExpirationDate' | '_id' | '_createdDate' | '_updatedDate' | 'name' | 'presetVariants.id' | 'presetVariants.price', value: boolean) => GiftCardProductsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'fixedExpirationDate' | '_createdDate' | '_updatedDate' | 'name' | 'presetVariants.price'>) => GiftCardProductsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'fixedExpirationDate' | '_createdDate' | '_updatedDate' | 'name' | 'presetVariants.price'>) => GiftCardProductsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => GiftCardProductsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => GiftCardProductsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<GiftCardProductsQueryResult>;
  }
  /**
   * Whether the meta site from the call's context is in the new Wix Gift Cards App population.
   * @public
   * @documentationMaturity preview
   * @permissionId GIFT_CARDS.GIFT_CARD_PRODUCT_READ
   */
  function isInWixGiftCardsAppPopulation(): Promise<IsInWixGiftCardsAppPopulationResponse>;
  
  type giftCardsV1GiftCardProduct_universal_d_GiftCardProduct = GiftCardProduct;
  type giftCardsV1GiftCardProduct_universal_d_GiftCardProductExpirationDateOneOf = GiftCardProductExpirationDateOneOf;
  type giftCardsV1GiftCardProduct_universal_d_ExpirationType = ExpirationType;
  const giftCardsV1GiftCardProduct_universal_d_ExpirationType: typeof ExpirationType;
  type giftCardsV1GiftCardProduct_universal_d_RelativeExpirationDate = RelativeExpirationDate;
  type giftCardsV1GiftCardProduct_universal_d_TimePeriod = TimePeriod;
  const giftCardsV1GiftCardProduct_universal_d_TimePeriod: typeof TimePeriod;
  type giftCardsV1GiftCardProduct_universal_d_PresetVariant = PresetVariant;
  type giftCardsV1GiftCardProduct_universal_d_MultiCurrencyPrice = MultiCurrencyPrice;
  type giftCardsV1GiftCardProduct_universal_d_CustomVariant = CustomVariant;
  type giftCardsV1GiftCardProduct_universal_d_ExtendedFields = ExtendedFields;
  type giftCardsV1GiftCardProduct_universal_d_TriggerGiftCardsAppInstallationFlowEvent = TriggerGiftCardsAppInstallationFlowEvent;
  type giftCardsV1GiftCardProduct_universal_d_CreateGiftCardProductRequest = CreateGiftCardProductRequest;
  type giftCardsV1GiftCardProduct_universal_d_CreateGiftCardProductResponse = CreateGiftCardProductResponse;
  type giftCardsV1GiftCardProduct_universal_d_GetGiftCardProductRequest = GetGiftCardProductRequest;
  type giftCardsV1GiftCardProduct_universal_d_GetGiftCardProductResponse = GetGiftCardProductResponse;
  type giftCardsV1GiftCardProduct_universal_d_UpdateGiftCardProductRequest = UpdateGiftCardProductRequest;
  type giftCardsV1GiftCardProduct_universal_d_UpdateGiftCardProductResponse = UpdateGiftCardProductResponse;
  type giftCardsV1GiftCardProduct_universal_d_DeleteGiftCardProductRequest = DeleteGiftCardProductRequest;
  type giftCardsV1GiftCardProduct_universal_d_DeleteGiftCardProductResponse = DeleteGiftCardProductResponse;
  type giftCardsV1GiftCardProduct_universal_d_QueryGiftCardProductsRequest = QueryGiftCardProductsRequest;
  type giftCardsV1GiftCardProduct_universal_d_CursorQuery = CursorQuery;
  type giftCardsV1GiftCardProduct_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type giftCardsV1GiftCardProduct_universal_d_Sorting = Sorting;
  type giftCardsV1GiftCardProduct_universal_d_SortOrder = SortOrder;
  const giftCardsV1GiftCardProduct_universal_d_SortOrder: typeof SortOrder;
  type giftCardsV1GiftCardProduct_universal_d_CursorPaging = CursorPaging;
  type giftCardsV1GiftCardProduct_universal_d_QueryGiftCardProductsResponse = QueryGiftCardProductsResponse;
  type giftCardsV1GiftCardProduct_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type giftCardsV1GiftCardProduct_universal_d_Cursors = Cursors;
  type giftCardsV1GiftCardProduct_universal_d_GiftCardsAppInstallationCompleted = GiftCardsAppInstallationCompleted;
  type giftCardsV1GiftCardProduct_universal_d_Empty = Empty;
  type giftCardsV1GiftCardProduct_universal_d_IsInWixGiftCardsAppPopulationRequest = IsInWixGiftCardsAppPopulationRequest;
  type giftCardsV1GiftCardProduct_universal_d_IsInWixGiftCardsAppPopulationResponse = IsInWixGiftCardsAppPopulationResponse;
  type giftCardsV1GiftCardProduct_universal_d_DomainEvent = DomainEvent;
  type giftCardsV1GiftCardProduct_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type giftCardsV1GiftCardProduct_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type giftCardsV1GiftCardProduct_universal_d_RestoreInfo = RestoreInfo;
  type giftCardsV1GiftCardProduct_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type giftCardsV1GiftCardProduct_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type giftCardsV1GiftCardProduct_universal_d_ActionEvent = ActionEvent;
  type giftCardsV1GiftCardProduct_universal_d_MessageEnvelope = MessageEnvelope;
  type giftCardsV1GiftCardProduct_universal_d_IdentificationData = IdentificationData;
  type giftCardsV1GiftCardProduct_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type giftCardsV1GiftCardProduct_universal_d_WebhookIdentityType = WebhookIdentityType;
  const giftCardsV1GiftCardProduct_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const giftCardsV1GiftCardProduct_universal_d_createGiftCardProduct: typeof createGiftCardProduct;
  const giftCardsV1GiftCardProduct_universal_d_getGiftCardProduct: typeof getGiftCardProduct;
  const giftCardsV1GiftCardProduct_universal_d_updateGiftCardProduct: typeof updateGiftCardProduct;
  type giftCardsV1GiftCardProduct_universal_d_UpdateGiftCardProduct = UpdateGiftCardProduct;
  type giftCardsV1GiftCardProduct_universal_d_UpdateGiftCardProductOptions = UpdateGiftCardProductOptions;
  const giftCardsV1GiftCardProduct_universal_d_deleteGiftCardProduct: typeof deleteGiftCardProduct;
  const giftCardsV1GiftCardProduct_universal_d_queryGiftCardProducts: typeof queryGiftCardProducts;
  type giftCardsV1GiftCardProduct_universal_d_GiftCardProductsQueryResult = GiftCardProductsQueryResult;
  type giftCardsV1GiftCardProduct_universal_d_GiftCardProductsQueryBuilder = GiftCardProductsQueryBuilder;
  const giftCardsV1GiftCardProduct_universal_d_isInWixGiftCardsAppPopulation: typeof isInWixGiftCardsAppPopulation;
  namespace giftCardsV1GiftCardProduct_universal_d {
    export {
      giftCardsV1GiftCardProduct_universal_d_GiftCardProduct as GiftCardProduct,
      giftCardsV1GiftCardProduct_universal_d_GiftCardProductExpirationDateOneOf as GiftCardProductExpirationDateOneOf,
      giftCardsV1GiftCardProduct_universal_d_ExpirationType as ExpirationType,
      giftCardsV1GiftCardProduct_universal_d_RelativeExpirationDate as RelativeExpirationDate,
      giftCardsV1GiftCardProduct_universal_d_TimePeriod as TimePeriod,
      giftCardsV1GiftCardProduct_universal_d_PresetVariant as PresetVariant,
      giftCardsV1GiftCardProduct_universal_d_MultiCurrencyPrice as MultiCurrencyPrice,
      giftCardsV1GiftCardProduct_universal_d_CustomVariant as CustomVariant,
      giftCardsV1GiftCardProduct_universal_d_ExtendedFields as ExtendedFields,
      giftCardsV1GiftCardProduct_universal_d_TriggerGiftCardsAppInstallationFlowEvent as TriggerGiftCardsAppInstallationFlowEvent,
      giftCardsV1GiftCardProduct_universal_d_CreateGiftCardProductRequest as CreateGiftCardProductRequest,
      giftCardsV1GiftCardProduct_universal_d_CreateGiftCardProductResponse as CreateGiftCardProductResponse,
      giftCardsV1GiftCardProduct_universal_d_GetGiftCardProductRequest as GetGiftCardProductRequest,
      giftCardsV1GiftCardProduct_universal_d_GetGiftCardProductResponse as GetGiftCardProductResponse,
      giftCardsV1GiftCardProduct_universal_d_UpdateGiftCardProductRequest as UpdateGiftCardProductRequest,
      giftCardsV1GiftCardProduct_universal_d_UpdateGiftCardProductResponse as UpdateGiftCardProductResponse,
      giftCardsV1GiftCardProduct_universal_d_DeleteGiftCardProductRequest as DeleteGiftCardProductRequest,
      giftCardsV1GiftCardProduct_universal_d_DeleteGiftCardProductResponse as DeleteGiftCardProductResponse,
      giftCardsV1GiftCardProduct_universal_d_QueryGiftCardProductsRequest as QueryGiftCardProductsRequest,
      giftCardsV1GiftCardProduct_universal_d_CursorQuery as CursorQuery,
      giftCardsV1GiftCardProduct_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      giftCardsV1GiftCardProduct_universal_d_Sorting as Sorting,
      giftCardsV1GiftCardProduct_universal_d_SortOrder as SortOrder,
      giftCardsV1GiftCardProduct_universal_d_CursorPaging as CursorPaging,
      giftCardsV1GiftCardProduct_universal_d_QueryGiftCardProductsResponse as QueryGiftCardProductsResponse,
      giftCardsV1GiftCardProduct_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      giftCardsV1GiftCardProduct_universal_d_Cursors as Cursors,
      giftCardsV1GiftCardProduct_universal_d_GiftCardsAppInstallationCompleted as GiftCardsAppInstallationCompleted,
      giftCardsV1GiftCardProduct_universal_d_Empty as Empty,
      giftCardsV1GiftCardProduct_universal_d_IsInWixGiftCardsAppPopulationRequest as IsInWixGiftCardsAppPopulationRequest,
      giftCardsV1GiftCardProduct_universal_d_IsInWixGiftCardsAppPopulationResponse as IsInWixGiftCardsAppPopulationResponse,
      giftCardsV1GiftCardProduct_universal_d_DomainEvent as DomainEvent,
      giftCardsV1GiftCardProduct_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      giftCardsV1GiftCardProduct_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      giftCardsV1GiftCardProduct_universal_d_RestoreInfo as RestoreInfo,
      giftCardsV1GiftCardProduct_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      giftCardsV1GiftCardProduct_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      giftCardsV1GiftCardProduct_universal_d_ActionEvent as ActionEvent,
      giftCardsV1GiftCardProduct_universal_d_MessageEnvelope as MessageEnvelope,
      giftCardsV1GiftCardProduct_universal_d_IdentificationData as IdentificationData,
      giftCardsV1GiftCardProduct_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      giftCardsV1GiftCardProduct_universal_d_WebhookIdentityType as WebhookIdentityType,
      giftCardsV1GiftCardProduct_universal_d_createGiftCardProduct as createGiftCardProduct,
      giftCardsV1GiftCardProduct_universal_d_getGiftCardProduct as getGiftCardProduct,
      giftCardsV1GiftCardProduct_universal_d_updateGiftCardProduct as updateGiftCardProduct,
      giftCardsV1GiftCardProduct_universal_d_UpdateGiftCardProduct as UpdateGiftCardProduct,
      giftCardsV1GiftCardProduct_universal_d_UpdateGiftCardProductOptions as UpdateGiftCardProductOptions,
      giftCardsV1GiftCardProduct_universal_d_deleteGiftCardProduct as deleteGiftCardProduct,
      giftCardsV1GiftCardProduct_universal_d_queryGiftCardProducts as queryGiftCardProducts,
      giftCardsV1GiftCardProduct_universal_d_GiftCardProductsQueryResult as GiftCardProductsQueryResult,
      giftCardsV1GiftCardProduct_universal_d_GiftCardProductsQueryBuilder as GiftCardProductsQueryBuilder,
      giftCardsV1GiftCardProduct_universal_d_isInWixGiftCardsAppPopulation as isInWixGiftCardsAppPopulation,
    };
  }
  
  export { giftCardsV1GiftCardProduct_universal_d as giftVoucherProducts, giftCardsV1GiftCard_universal_d as giftVouchers };
}
