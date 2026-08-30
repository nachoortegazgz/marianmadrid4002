declare module "wix-search.v2" {
  interface SiteDocument$1 {
      /**
       * Result ID.
       * @readonly
       */
      _id?: string;
      /** The document payload. */
      data?: Record<string, any> | null;
  }
  interface SearchRequest$1 {
      /** Search query and aggregation information. */
      search: Search;
      /** Document type to search in. */
      documentType: DocumentType;
      /** Language to search in. */
      language?: string | null;
  }
  interface Search extends SearchPagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
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
      /** A search method for grouping data into various categories (facets) and providing summaries for each category. For example, use aggregations to categorize search results by specific price ranges, brand names, or ratings. */
      aggregations?: Aggregation$1[];
      /** Search information. */
      search?: SearchDetails;
  }
  /** @oneof */
  interface SearchPagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
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
  interface Aggregation$1 extends AggregationKindOneOf {
      /** Pass if `type` is `VALUE`. A value aggregation calculates metrics such as count for specific fields within a dataset, providing insights into the overall distribution and key statistics of those values. For example, use a value aggregation to get the number of products (count) for each price listed in the store. */
      value?: ValueAggregation;
      /** Pass if `type` is `SCALAR`. A scalar aggregation calculates a single numerical value from a dataset, such as the total, minimum, or maximum value, summarizing the dataset into one key metric. For example, use a scalar aggregation to get the minimum price listed in a store. */
      scalar?: ScalarAggregation;
      /** Pass if `type` is `NESTED`. A nested aggregation is applied to the results of another aggregation. Rather than aggregating directly on the primary dataset, first group data using one aggregation and then apply another aggregation within each group. This allows for more complex analyses that summarize data at different levels of detail or hierarchy. For example, to get the number of products that are in stock and out of stock for each price listed, first perform a value aggregation on the field containing the price, and a second value aggregation on the field indicating whether a product is in stock. You can nest up to a maximum of 3 aggregations. Each aggregation can be either value-based or scalar, allowing flexibility in how the data is grouped and analyzed. */
      nested?: NestedAggregation;
      /** Aggregation name displayed in the return. */
      name?: string | null;
      /** Type of aggregation to perform. */
      type?: AggregationType;
      /** Field to aggregate by. */
      fieldPath?: string;
  }
  /** @oneof */
  interface AggregationKindOneOf {
      /** Pass if `type` is `VALUE`. A value aggregation calculates metrics such as count for specific fields within a dataset, providing insights into the overall distribution and key statistics of those values. For example, use a value aggregation to get the number of products (count) for each price listed in the store. */
      value?: ValueAggregation;
      /** Pass if `type` is `SCALAR`. A scalar aggregation calculates a single numerical value from a dataset, such as the total, minimum, or maximum value, summarizing the dataset into one key metric. For example, use a scalar aggregation to get the minimum price listed in a store. */
      scalar?: ScalarAggregation;
      /** Pass if `type` is `NESTED`. A nested aggregation is applied to the results of another aggregation. Rather than aggregating directly on the primary dataset, first group data using one aggregation and then apply another aggregation within each group. This allows for more complex analyses that summarize data at different levels of detail or hierarchy. For example, to get the number of products that are in stock and out of stock for each price listed, first perform a value aggregation on the field containing the price, and a second value aggregation on the field indicating whether a product is in stock. You can nest up to a maximum of 3 aggregations. Each aggregation can be either value-based or scalar, allowing flexibility in how the data is grouped and analyzed. */
      nested?: NestedAggregation;
  }
  enum ScalarType {
      /** Unknown scalar type. */
      UNKNOWN_SCALAR_TYPE = "UNKNOWN_SCALAR_TYPE",
      /** Minimum value. */
      MIN = "MIN",
      /** Maximum value. */
      MAX = "MAX",
      /** Sum of values. */
      SUM = "SUM"
  }
  enum NestedAggregationType {
      /** Unknown aggregation type. */
      UNKNOWN_AGGREGATION_TYPE = "UNKNOWN_AGGREGATION_TYPE",
      /** An aggregation where result buckets are dynamically built - one per unique value. */
      VALUE = "VALUE",
      /** A single-value metric aggregation - e.g. min, max, sum, avg. */
      SCALAR = "SCALAR"
  }
  interface ValueAggregation {
      /**
       * Maximum number of aggregation results to return.
       * Min: `1`
       * Max: `250`
       * Default: `10`
       */
      limit?: number | null;
  }
  interface ScalarAggregation {
      /** Type of scalar aggregation. */
      type?: ScalarType;
  }
  interface NestedAggregationItem extends NestedAggregationItemKindOneOf {
      /** Pass if `type` is `VALUE`. A value aggregation calculates metrics such as count for specific fields within a dataset, providing insights into the overall distribution and key statistics of those values. For example, use a value aggregation to get the number of products (count) for each price listed in the store. */
      value?: ValueAggregation;
      /** Pass if `type` is `SCALAR`. A scalar aggregation calculates a single numerical value from a dataset, such as the total, minimum, or maximum value, summarizing the dataset into one key metric. For example, use a scalar aggregation to get the minimum price listed in a store. */
      scalar?: ScalarAggregation;
      /** Aggregation name displayed in the return. */
      name?: string | null;
      /** Type of aggregation to perform. */
      type?: NestedAggregationType;
      /** Field to aggregate by. */
      fieldPath?: string;
  }
  /** @oneof */
  interface NestedAggregationItemKindOneOf {
      /** Pass if `type` is `VALUE`. A value aggregation calculates metrics such as count for specific fields within a dataset, providing insights into the overall distribution and key statistics of those values. For example, use a value aggregation to get the number of products (count) for each price listed in the store. */
      value?: ValueAggregation;
      /** Pass if `type` is `SCALAR`. A scalar aggregation calculates a single numerical value from a dataset, such as the total, minimum, or maximum value, summarizing the dataset into one key metric. For example, use a scalar aggregation to get the minimum price listed in a store. */
      scalar?: ScalarAggregation;
  }
  enum AggregationType {
      UNKNOWN_AGGREGATION_TYPE = "UNKNOWN_AGGREGATION_TYPE",
      /** An aggregation where result buckets are dynamically built - one per unique value. */
      VALUE = "VALUE",
      /** A single-value metric aggregation - e.g. min, max, sum, avg. */
      SCALAR = "SCALAR",
      /** Multi-level aggregation, where each next aggregation is nested within previous one. */
      NESTED = "NESTED"
  }
  /** List of aggregations. Each aggregation is nested within the previous one. */
  interface NestedAggregation {
      /** List of aggregations, where each aggregation is nested within previous one. */
      nestedAggregations?: NestedAggregationItem[];
  }
  interface SearchDetails {
      /** Search term or expression. */
      expression?: string | null;
      /**
       * Fields to search in.
       * If the array is empty, all fields are searched.
       */
      fields?: string[];
      /** Whether to allow the search function to automatically correct typos or minor mistakes in the search expression. The search function uses an algorithm to find results that are close to the text provided. */
      fuzzy?: boolean;
  }
  interface Paging {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  enum DocumentType {
      UNSPECIFIED = "UNSPECIFIED",
      BLOG_POSTS = "BLOG_POSTS",
      BOOKING_SERVICES = "BOOKING_SERVICES",
      EVENTS = "EVENTS",
      FORUM_CONTENT = "FORUM_CONTENT",
      ONLINE_PROGRAMS = "ONLINE_PROGRAMS",
      PROGALLERY_ITEM = "PROGALLERY_ITEM",
      STORES_PRODUCTS = "STORES_PRODUCTS"
  }
  interface SearchResponse$1 extends SearchResponsePagingOneOf {
      /** Paging metadata. */
      pagingOffsetMetadata?: PagingMetadata;
      /** Documents matching the search query. */
      siteDocumentItems?: SiteDocument$1[];
      /** Aggregated data. */
      aggregationData?: AggregationData;
  }
  /** @oneof */
  interface SearchResponsePagingOneOf {
      /** Paging metadata. */
      pagingOffsetMetadata?: PagingMetadata;
  }
  interface AggregationData {
      /** List of the aggregated data results. */
      results?: AggregationResults[];
  }
  interface ValueAggregationResult {
      /** Value contained in the field specified in `fieldPath` for this aggregation in the request. */
      value?: string;
      /** Number of documents containing the specified value in the specified field. */
      count?: number;
  }
  interface ValueResults {
      /** List of value aggregation results. */
      results?: ValueAggregationResult[];
  }
  interface AggregationResultsScalarResult {
      /** Type of scalar aggregation. */
      type?: ScalarType;
      /** Value of the scalar aggregation. For example, the minimum, maximum, or total value for the specified field. */
      value?: number;
  }
  interface ValueResult {
      /** Value contained in the field specified in `fieldPath` for this aggregation in the request. */
      value?: string;
      /** Number of documents containing the specified value in the specified field. */
      count?: number | null;
  }
  interface ScalarResult {
      /** Scalar aggregation results. */
      value?: number;
  }
  interface NestedResultValue extends NestedResultValueResultOneOf {
      /** Value aggregation results. */
      value?: ValueResult;
      /** Scalar aggregation results. */
      scalar?: ScalarResult;
  }
  /** @oneof */
  interface NestedResultValueResultOneOf {
      /** Value aggregation results. */
      value?: ValueResult;
      /** Scalar aggregation results. */
      scalar?: ScalarResult;
  }
  interface Results {
      /** Aggregation results. */
      results?: Record<string, NestedResultValue>;
  }
  /**
   * Results of `NESTED` aggregation type in a flattened form
   * aggregations in resulting array are keyed by requested aggregation `name`.
   */
  interface NestedResults {
      /** List of nested aggregation results. */
      results?: Results[];
  }
  interface AggregationResults extends AggregationResultsResultOneOf {
      /** Value aggregation results. */
      values?: ValueResults;
      /** Scalar aggregation results. */
      scalar?: AggregationResultsScalarResult;
      /** Nested aggregation results. */
      nested?: NestedResults;
      /** Aggregation name defined in the request. */
      name?: string;
      /** Type of aggregation that was performed. */
      type?: AggregationType;
      /** Field the data was aggregated by. */
      fieldPath?: string;
  }
  /** @oneof */
  interface AggregationResultsResultOneOf {
      /** Value aggregation results. */
      values?: ValueResults;
      /** Scalar aggregation results. */
      scalar?: AggregationResultsScalarResult;
      /** Nested aggregation results. */
      nested?: NestedResults;
  }
  interface PagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. */
      total?: number | null;
      /** Whether the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  /**
   * Retrieves a list of site documents that match the provided search query and optionally performs aggregations on the data queried.
   *
   * The `search()` API supports the document types listed in the [Introduction](https://dev.wix.com/docs/sdk/backend-modules/search/wix-site-search/introduction), each with its own schema. These schemas define the fields available for filtering, sorting, and free-text searching.
   *
   * To learn more about working with the search query, see [API Query Language](https://dev.wix.com/docs/sdk/articles/working-with-the-sdk/api-query-language).
   * @param search - Search query and aggregation information.
   * @param documentType - Document type to search in.
   * @public
   * @documentationMaturity preview
   * @requiredField documentType
   * @requiredField search
   * @permissionId SEARCH.SITE_DOCUMENT_READ
   */
  function search$1(search: Search, documentType: DocumentType, options?: SearchOptions$1): Promise<SearchResponse$1>;
  interface SearchOptions$1 {
      /** Language to search in. */
      language?: string | null;
  }
  
  type searchPlatformizedV1SiteDocument_universal_d_Search = Search;
  type searchPlatformizedV1SiteDocument_universal_d_SearchPagingMethodOneOf = SearchPagingMethodOneOf;
  type searchPlatformizedV1SiteDocument_universal_d_Sorting = Sorting;
  type searchPlatformizedV1SiteDocument_universal_d_SortOrder = SortOrder;
  const searchPlatformizedV1SiteDocument_universal_d_SortOrder: typeof SortOrder;
  type searchPlatformizedV1SiteDocument_universal_d_AggregationKindOneOf = AggregationKindOneOf;
  type searchPlatformizedV1SiteDocument_universal_d_ScalarType = ScalarType;
  const searchPlatformizedV1SiteDocument_universal_d_ScalarType: typeof ScalarType;
  type searchPlatformizedV1SiteDocument_universal_d_NestedAggregationType = NestedAggregationType;
  const searchPlatformizedV1SiteDocument_universal_d_NestedAggregationType: typeof NestedAggregationType;
  type searchPlatformizedV1SiteDocument_universal_d_ValueAggregation = ValueAggregation;
  type searchPlatformizedV1SiteDocument_universal_d_ScalarAggregation = ScalarAggregation;
  type searchPlatformizedV1SiteDocument_universal_d_NestedAggregationItem = NestedAggregationItem;
  type searchPlatformizedV1SiteDocument_universal_d_NestedAggregationItemKindOneOf = NestedAggregationItemKindOneOf;
  type searchPlatformizedV1SiteDocument_universal_d_AggregationType = AggregationType;
  const searchPlatformizedV1SiteDocument_universal_d_AggregationType: typeof AggregationType;
  type searchPlatformizedV1SiteDocument_universal_d_NestedAggregation = NestedAggregation;
  type searchPlatformizedV1SiteDocument_universal_d_SearchDetails = SearchDetails;
  type searchPlatformizedV1SiteDocument_universal_d_Paging = Paging;
  type searchPlatformizedV1SiteDocument_universal_d_DocumentType = DocumentType;
  const searchPlatformizedV1SiteDocument_universal_d_DocumentType: typeof DocumentType;
  type searchPlatformizedV1SiteDocument_universal_d_SearchResponsePagingOneOf = SearchResponsePagingOneOf;
  type searchPlatformizedV1SiteDocument_universal_d_AggregationData = AggregationData;
  type searchPlatformizedV1SiteDocument_universal_d_ValueAggregationResult = ValueAggregationResult;
  type searchPlatformizedV1SiteDocument_universal_d_ValueResults = ValueResults;
  type searchPlatformizedV1SiteDocument_universal_d_AggregationResultsScalarResult = AggregationResultsScalarResult;
  type searchPlatformizedV1SiteDocument_universal_d_ValueResult = ValueResult;
  type searchPlatformizedV1SiteDocument_universal_d_ScalarResult = ScalarResult;
  type searchPlatformizedV1SiteDocument_universal_d_NestedResultValue = NestedResultValue;
  type searchPlatformizedV1SiteDocument_universal_d_NestedResultValueResultOneOf = NestedResultValueResultOneOf;
  type searchPlatformizedV1SiteDocument_universal_d_Results = Results;
  type searchPlatformizedV1SiteDocument_universal_d_NestedResults = NestedResults;
  type searchPlatformizedV1SiteDocument_universal_d_AggregationResults = AggregationResults;
  type searchPlatformizedV1SiteDocument_universal_d_AggregationResultsResultOneOf = AggregationResultsResultOneOf;
  type searchPlatformizedV1SiteDocument_universal_d_PagingMetadata = PagingMetadata;
  namespace searchPlatformizedV1SiteDocument_universal_d {
    export {
      SiteDocument$1 as SiteDocument,
      SearchRequest$1 as SearchRequest,
      searchPlatformizedV1SiteDocument_universal_d_Search as Search,
      searchPlatformizedV1SiteDocument_universal_d_SearchPagingMethodOneOf as SearchPagingMethodOneOf,
      searchPlatformizedV1SiteDocument_universal_d_Sorting as Sorting,
      searchPlatformizedV1SiteDocument_universal_d_SortOrder as SortOrder,
      Aggregation$1 as Aggregation,
      searchPlatformizedV1SiteDocument_universal_d_AggregationKindOneOf as AggregationKindOneOf,
      searchPlatformizedV1SiteDocument_universal_d_ScalarType as ScalarType,
      searchPlatformizedV1SiteDocument_universal_d_NestedAggregationType as NestedAggregationType,
      searchPlatformizedV1SiteDocument_universal_d_ValueAggregation as ValueAggregation,
      searchPlatformizedV1SiteDocument_universal_d_ScalarAggregation as ScalarAggregation,
      searchPlatformizedV1SiteDocument_universal_d_NestedAggregationItem as NestedAggregationItem,
      searchPlatformizedV1SiteDocument_universal_d_NestedAggregationItemKindOneOf as NestedAggregationItemKindOneOf,
      searchPlatformizedV1SiteDocument_universal_d_AggregationType as AggregationType,
      searchPlatformizedV1SiteDocument_universal_d_NestedAggregation as NestedAggregation,
      searchPlatformizedV1SiteDocument_universal_d_SearchDetails as SearchDetails,
      searchPlatformizedV1SiteDocument_universal_d_Paging as Paging,
      searchPlatformizedV1SiteDocument_universal_d_DocumentType as DocumentType,
      SearchResponse$1 as SearchResponse,
      searchPlatformizedV1SiteDocument_universal_d_SearchResponsePagingOneOf as SearchResponsePagingOneOf,
      searchPlatformizedV1SiteDocument_universal_d_AggregationData as AggregationData,
      searchPlatformizedV1SiteDocument_universal_d_ValueAggregationResult as ValueAggregationResult,
      searchPlatformizedV1SiteDocument_universal_d_ValueResults as ValueResults,
      searchPlatformizedV1SiteDocument_universal_d_AggregationResultsScalarResult as AggregationResultsScalarResult,
      searchPlatformizedV1SiteDocument_universal_d_ValueResult as ValueResult,
      searchPlatformizedV1SiteDocument_universal_d_ScalarResult as ScalarResult,
      searchPlatformizedV1SiteDocument_universal_d_NestedResultValue as NestedResultValue,
      searchPlatformizedV1SiteDocument_universal_d_NestedResultValueResultOneOf as NestedResultValueResultOneOf,
      searchPlatformizedV1SiteDocument_universal_d_Results as Results,
      searchPlatformizedV1SiteDocument_universal_d_NestedResults as NestedResults,
      searchPlatformizedV1SiteDocument_universal_d_AggregationResults as AggregationResults,
      searchPlatformizedV1SiteDocument_universal_d_AggregationResultsResultOneOf as AggregationResultsResultOneOf,
      searchPlatformizedV1SiteDocument_universal_d_PagingMetadata as PagingMetadata,
      search$1 as search,
      SearchOptions$1 as SearchOptions,
    };
  }
  
  /** API is not yet fully migrated to FQDN entity */
  interface SiteDocument {
      /** the document payload */
      document?: Record<string, any> | null;
  }
  interface UpdateInternalDocumentsEvent extends UpdateInternalDocumentsEventOperationOneOf {
      /** insert/update documents */
      update?: InternalDocumentUpdateOperation;
      /** delete by document ids */
      deleteByIds?: DeleteByIdsOperation;
      /** delete documents matching filter */
      deleteByFilter?: DeleteByFilterOperation;
      /** update internal documents matching filter */
      updateByFilter?: InternalDocumentUpdateByFilterOperation;
      /** update only existing documents */
      updateExisting?: InternalUpdateExistingOperation;
      /** insert/update documents with versioning */
      versionedUpdate?: VersionedDocumentUpdateOperation;
      /** delete by document ids with versioning */
      versionedDeleteByIds?: VersionedDeleteByIdsOperation;
      /** type of the documents */
      documentType?: string;
      /** language of the documents (mandatory) */
      language?: string | null;
      /**
       * one or more search documents
       * @deprecated
       */
      addDocuments?: InternalDocument[];
      /**
       * one or more ids of indexed documents to be removed. Removal will happen before addition (if both provided)
       * @deprecated
       */
      removeDocumentIds?: string[];
      /** id to pass to processing notification */
      correlationId?: string | null;
      /** when event was created / issued */
      issuedAt?: Date | null;
  }
  /** @oneof */
  interface UpdateInternalDocumentsEventOperationOneOf {
      /** insert/update documents */
      update?: InternalDocumentUpdateOperation;
      /** delete by document ids */
      deleteByIds?: DeleteByIdsOperation;
      /** delete documents matching filter */
      deleteByFilter?: DeleteByFilterOperation;
      /** update internal documents matching filter */
      updateByFilter?: InternalDocumentUpdateByFilterOperation;
      /** update only existing documents */
      updateExisting?: InternalUpdateExistingOperation;
      /** insert/update documents with versioning */
      versionedUpdate?: VersionedDocumentUpdateOperation;
      /** delete by document ids with versioning */
      versionedDeleteByIds?: VersionedDeleteByIdsOperation;
  }
  interface InternalDocument {
      /** document with mandatory fields (id) and with fields specific to the type of the document */
      document?: Record<string, any> | null;
  }
  interface InternalDocumentUpdateOperation {
      /** documents to index or update */
      documents?: InternalDocument[];
  }
  interface DeleteByIdsOperation {
      /** ids of the documents to delete */
      documentIds?: string[];
  }
  interface DeleteByFilterOperation {
      /** documents matching this filter wil be deleted. only filterable documents defined in document_type can be used for filtering */
      filter?: Record<string, any> | null;
  }
  interface InternalDocumentUpdateByFilterOperation {
      /** documents matching this filter will be updated */
      filter?: Record<string, any> | null;
      /** partial document to apply */
      document?: InternalDocument;
  }
  interface InternalUpdateExistingOperation {
      /** documents to update */
      documents?: InternalDocument[];
  }
  interface VersionedDocumentUpdateOperation {
      /** documents to create or overwrite */
      documents?: InternalDocument[];
      /** versioning mode to use instead of default */
      versioningMode?: VersioningMode;
  }
  enum VersioningMode {
      /** use default versioning mode agreed with search team */
      DEFAULT = "DEFAULT",
      /** execute only if version is greater than existing */
      GREATER_THAN = "GREATER_THAN",
      /** execute only if version is greater or equal to existing */
      GREATER_OR_EQUAL = "GREATER_OR_EQUAL"
  }
  interface VersionedDeleteByIdsOperation {
      /** ids with version of the documents to delete */
      documentIds?: VersionedDocumentId[];
  }
  interface VersionedDocumentId {
      /** document id */
      documentId?: string;
      /** document version */
      version?: string;
      /** versioning mode to use instead of default */
      versioningMode?: VersioningMode;
  }
  interface UpdateDocumentsEvent extends UpdateDocumentsEventOperationOneOf {
      /** insert/update documents */
      update?: DocumentUpdateOperation;
      /** delete by document ids */
      deleteByIds?: V1DeleteByIdsOperation;
      /** delete documents matching filter */
      deleteByFilter?: V1DeleteByFilterOperation;
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
      deleteByIds?: V1DeleteByIdsOperation;
      /** delete documents matching filter */
      deleteByFilter?: V1DeleteByFilterOperation;
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
  interface V1DeleteByIdsOperation {
      /** ids of the documents to delete */
      documentIds?: string[];
  }
  interface V1DeleteByFilterOperation {
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
  interface SearchRequest {
      /** Text to search for. All searchable fields will be searched. */
      query?: string | null;
      /** Document type of documents to search for. All document types are searched if not provided. */
      documentType?: string | null;
      /** Fields to order by. */
      ordering?: OrderingClauses;
      /** Paging parameters. */
      paging?: SearchPaging;
      /** Language to search in. */
      language?: string | null;
      /** Filter in platformized query language (for example {'field': {'$eq': 'value'}}) */
      filter?: Record<string, any> | null;
      /** The facets to retrieve. */
      facets?: FacetClauses;
      /** Enable fuzzy search (eg. query 'kalvin clein' will match document with 'calvin klein' in title). */
      fuzzy?: boolean | null;
      /** Highlight texts matching the query. Highlighted text will be wrapped with <mark/> tag. Defaults to true if not provided. */
      highlight?: boolean | null;
      /** Searchable fields to search in. If not provided, search is executed on all searchable fields in schema */
      searchFields?: string[];
      /** A list of fields to include in the result set. If not provided, all fields of schema will be included. */
      fields?: string[];
      /** The properties/overrides/experiments to enable for this request. Currently supported: `scoring_profile`, `result-format`. */
      properties?: SearchProperty[];
      /** Include seo hidden documents. Defaults to false if not provided. */
      includeSeoHidden?: boolean | null;
  }
  interface OrderingClauses {
      ordering?: OrderingClause[];
  }
  interface OrderingClause {
      fieldName?: string | null;
      direction?: Direction;
  }
  enum Direction {
      UninitializedDirection = "UninitializedDirection",
      ASC = "ASC",
      DESC = "DESC"
  }
  interface SearchPaging {
      /**
       * Number of items to skip in the result set.
       * @deprecated
       */
      skip?: number;
      /** Number of items to fetch (effectively page size). */
      limit?: number;
      /** Number of items to skip in the result set. */
      offset?: number;
  }
  interface FacetClauses {
      /** Each entry represents a single facet with parameters. */
      clauses?: FacetClause[];
  }
  interface FacetClause extends FacetClauseClauseOneOf {
      term?: TermFacet;
      aggregation?: AggregationFacet;
      hierarchical?: HierarchicalFacet;
  }
  /** @oneof */
  interface FacetClauseClauseOneOf {
      term?: TermFacet;
      aggregation?: AggregationFacet;
      hierarchical?: HierarchicalFacet;
  }
  enum Aggregation {
      MIN = "MIN",
      MAX = "MAX",
      SUM = "SUM"
  }
  interface HierarchicalFacet extends HierarchicalFacetClauseOneOf {
      term?: TermFacet;
      aggregation?: AggregationFacet;
      nestedAggregation?: HierarchicalFacet;
  }
  /** @oneof */
  interface HierarchicalFacetClauseOneOf {
      term?: TermFacet;
      aggregation?: AggregationFacet;
  }
  interface TermFacet {
      /** The name of the faceted attribute. */
      name?: string;
      /** Limit the number of facet values returned. Default is 10. */
      limit?: number | null;
  }
  interface AggregationFacet {
      /** The name of the faceted attribute. */
      name?: string;
      /** Aggregation type. */
      aggregation?: Aggregation;
  }
  interface SearchProperty {
      name?: string;
      value?: any;
  }
  interface SearchResponse {
      /** Documents matching filter and query. */
      documents?: Record<string, any>[] | null;
      nextPage?: NextPageResponse;
      /**
       * Facets provide "counts in categories" view. For example searching for "Nike" would return
       * (Shoes, 5), (Socks, 2) indicating numbers for matching by each faceted field.
       */
      facets?: FacetsResponse[];
  }
  interface NextPageResponse {
      /** Total number of items across all pages */
      total?: number;
      /** The number of items to skip */
      skip?: number;
      /** The number of items to retrieve in one page */
      limit?: number;
  }
  interface FacetsResponse extends FacetsResponseResponseOneOf {
      terms?: TermAggregationResponse;
      minAggregation?: MinAggregationResponse;
      maxAggregation?: MaxAggregationResponse;
      minMaxAggregation?: MinMaxAggregationResponse;
      hierarchicalAggregation?: HierarchicalAggregationResponse;
      sumAggregation?: SumAggregationResponse;
  }
  /** @oneof */
  interface FacetsResponseResponseOneOf {
      terms?: TermAggregationResponse;
      minAggregation?: MinAggregationResponse;
      maxAggregation?: MaxAggregationResponse;
      minMaxAggregation?: MinMaxAggregationResponse;
      hierarchicalAggregation?: HierarchicalAggregationResponse;
      sumAggregation?: SumAggregationResponse;
  }
  interface FacetCountResponse {
      /** Facet field value (for example "Shoes", "Socks") */
      facetValue?: string;
      /** Document count within the group */
      count?: number;
  }
  interface Value {
      value?: string;
      facets?: FacetsResponse;
      count?: number;
  }
  interface TermAggregationResponse {
      /** Facet field (for example productCategory) */
      facet?: string;
      /** Facet values and document counts */
      facets?: FacetCountResponse[];
  }
  interface MinAggregationResponse {
      /** Facet field (for example productPrice) */
      facet?: string;
      /** The minimum value across all documents */
      minValue?: number | null;
  }
  interface MaxAggregationResponse {
      /** Facet field (for example productPrice) */
      facet?: string;
      /** The maximum value across all documents */
      maxValue?: number | null;
  }
  interface MinMaxAggregationResponse {
      /** Facet field (for example productPrice) */
      facet?: string;
      /** The minimum value across all documents */
      minValue?: number | null;
      /** The maximum value across all documents */
      maxValue?: number | null;
  }
  interface HierarchicalAggregationResponse {
      facet?: string;
      values?: Value[];
  }
  interface SumAggregationResponse {
      /** Facet field (for example productPrice) */
      facet?: string;
      /** The sum value across all documents */
      value?: number | null;
  }
  interface FederatedSearchRequest {
      /** Query phrase to use. */
      query?: string | null;
      /** Language to search in. */
      language?: string | null;
      /** Limit of documents to return per document type. */
      limit?: number | null;
      /** Enable fuzzy search (for example query 'kalvin clein' will match document with 'calvin klein' in title). */
      fuzzy?: boolean | null;
      /** Highlight texts matching the query. Highlighted text will be wrapped with <mark/> tag. Defaults to true if not provided. */
      highlight?: boolean | null;
      /** Searchable fields to search in. If not provided, search is executed on all searchable fields in schemas */
      searchFields?: string[];
      /** Document types to search in. If not provided, search is executed on all document types enabled for the site */
      documentTypes?: string[];
      /** Include seo hidden documents. Defaults to false if not provided. */
      includeSeoHidden?: boolean | null;
      /** The properties/overrides/experiments to enable for this request. Currently supported: `scoring_profile`, `result-format`. */
      properties?: SearchProperty[];
  }
  interface FederatedSearchResponse {
      /** Search results from multiple indexes. */
      results?: FederatedSearchDocuments[];
  }
  interface FederatedSearchDocuments {
      /** Document type of documents */
      documentType?: string | null;
      /** Documents of document type */
      documents?: Record<string, any>[] | null;
      /** Total count of matching documents for document type */
      total?: number;
  }
  interface SuggestRequest {
      /** Text to search for. Fields configured in suggester configuration will be searched. */
      query?: string | null;
      /** Document type of documents to search for. All document types are searched if not provided. */
      documentType?: string | null;
      /** Fields to order by. */
      ordering?: OrderingClauses;
      /** Number of suggested document to return. */
      limit?: number;
      /** Language to search in. */
      language?: string | null;
      /** Filter in platformized query language (for example {'field': {'$eq': 'value'}}) */
      filter?: Record<string, any> | null;
      /** Searchable fields to search in. If not provided, search is executed on all suggestable fields in schema */
      searchFields?: string[];
      /** A list of fields to include in the result set. If not provided, all fields of schema will be included. */
      fields?: string[];
      /** Include seo hidden documents. Defaults to false if not provided. */
      includeSeoHidden?: boolean | null;
      /** The properties/overrides/experiments to enable for this request. Currently supported: `scoring_profile`, `result-format`. */
      properties?: SearchProperty[];
  }
  interface SuggestResponse {
      /** Suggested documents. */
      documents?: Record<string, any>[] | null;
  }
  interface FederatedSuggestRequest {
      /** Text to search for. Fields configured in suggester configuration will be searched. */
      query?: string | null;
      /** Language to search in. */
      language?: string | null;
      /** Number of suggested document to return per document type. */
      limit?: number;
      /** Searchable fields to search in. If not provided, search is executed on all suggestable fields in schemas */
      searchFields?: string[];
      /** Document types to search in. If not provided, search is executed on all document types enabled for the site */
      documentTypes?: string[];
      /** Include seo hidden documents. Defaults to false if not provided. */
      includeSeoHidden?: boolean | null;
      /** The properties/overrides/experiments to enable for this request. Currently supported: `scoring_profile`, `result-format`. */
      properties?: SearchProperty[];
  }
  interface FederatedSuggestResponse {
      /** Suggest results from multiple indexes. */
      results?: FederatedSuggestDocuments[];
  }
  interface FederatedSuggestDocuments {
      /** Document type of documents */
      documentType?: string | null;
      /** Documents of document type */
      documents?: Record<string, any>[] | null;
  }
  interface RelatedRequest {
      /** ID of the document to fetch related documents for. */
      documentId?: string | null;
      /** Document type of the document. */
      documentType?: string | null;
      /** Fields to order by. */
      ordering?: OrderingClauses;
      /** Language to search in. */
      language?: string | null;
      /** Filter in platformized query language (for example {'field': {'$eq': 'value'}}). */
      filter?: Record<string, any> | null;
      /** Searchable fields to compare documents by. If not provided, all searchable fields in schema are used */
      searchFields?: string[];
      /** A list of fields to include in the result set. If not provided, all fields of schema will be included. */
      fields?: string[];
      /** Number of related documents to return */
      limit?: number;
      /** The properties/overrides/experiments to enable for this request. Currently supported: `scoring_profile`. */
      properties?: SearchProperty[];
      /** Include seo hidden documents. Defaults to false if not provided. */
      includeSeoHidden?: boolean | null;
  }
  interface RelatedResponse {
      /** Documents matching filter and query. */
      documents?: Record<string, any>[] | null;
  }
  interface AutocompleteRequest {
      /** Query phrase to fetch completions for. */
      query?: string | null;
      /** Document type to use to search for phrases. */
      documentType?: string | null;
      /** Limit of phrases to fetch. */
      limit?: number;
      /** Language to search in. */
      language?: string | null;
      /** Filter in platfromized query language (for example {'field': {'$eq': 'value'}}) */
      filter?: Record<string, any> | null;
      /** Searchable fields to use for query completion. If not provided, all searchable fields in schema are used */
      searchFields?: string[];
      /** Include seo hidden documents. Defaults to false if not provided. */
      includeSeoHidden?: boolean | null;
  }
  interface AutocompleteResponse {
      /** Suggested phrases. */
      values?: AutocompleteResponseValue[];
  }
  interface AutocompleteResponseValue {
      /** Suggested phrase. */
      query?: string;
  }
  interface FederatedAutocompleteRequest {
      /** Query phrase to fetch completions for. */
      query?: string | null;
      /** Language to search in. */
      language?: string | null;
      /** Number of queries to return per document type. */
      limit?: number;
      /** Searchable fields to search in. If not provided, search is executed on all autocompletable fields in schemas */
      searchFields?: string[];
      /** Document types to autocomplete in. If not provided, autocomplete is executed on all document types enabled for the site */
      documentTypes?: string[];
      /** Include seo hidden documents. Defaults to false if not provided. */
      includeSeoHidden?: boolean | null;
  }
  interface FederatedAutocompleteResponse {
      /** Suggested phrases from multiple indexes */
      results?: FederatedAutocompleteResults[];
  }
  interface FederatedAutocompleteResults {
      /** Document type of queries */
      documentType?: string | null;
      /** Suggested phrases */
      values?: AutocompleteResponseValue[];
  }
  interface TrendingRequest {
      documentTypes?: string[];
      language?: string | null;
      /** Include seo hidden documents. Defaults to false if not provided. */
      includeSeoHidden?: boolean | null;
      /** The properties/overrides/experiments to enable for this request. Currently supported: `scoring_profile`, `result-format`. */
      properties?: SearchProperty[];
  }
  interface TrendingResponse {
      results?: TrendingItems[];
  }
  interface TrendingItems {
      documentType?: string;
      documents?: Record<string, any>[] | null;
  }
  /**
   * Executes a regular search query.
   * If you are unsure, this is likely the search method you want to used.
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function search(options?: SearchOptions): Promise<SearchResponse>;
  interface SearchOptions {
      /** Text to search for. All searchable fields will be searched. */
      query?: string | null;
      /** Document type of documents to search for. All document types are searched if not provided. */
      documentType?: string | null;
      /** Fields to order by. */
      ordering?: OrderingClauses;
      /** Paging parameters. */
      paging?: SearchPaging;
      /** Language to search in. */
      language?: string | null;
      /** Filter in platformized query language (for example {'field': {'$eq': 'value'}}) */
      filter?: Record<string, any> | null;
      /** The facets to retrieve. */
      facets?: FacetClauses;
      /** Enable fuzzy search (eg. query 'kalvin clein' will match document with 'calvin klein' in title). */
      fuzzy?: boolean | null;
      /** Highlight texts matching the query. Highlighted text will be wrapped with <mark/> tag. Defaults to true if not provided. */
      highlight?: boolean | null;
      /** Searchable fields to search in. If not provided, search is executed on all searchable fields in schema */
      searchFields?: string[];
      /** A list of fields to include in the result set. If not provided, all fields of schema will be included. */
      fields?: string[];
      /** The properties/overrides/experiments to enable for this request. Currently supported: `scoring_profile`, `result-format`. */
      properties?: SearchProperty[];
      /** Include seo hidden documents. Defaults to false if not provided. */
      includeSeoHidden?: boolean | null;
  }
  /**
   * Searches in multiple document types at once.
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function federatedSearch(options?: FederatedSearchOptions): Promise<FederatedSearchResponse>;
  interface FederatedSearchOptions {
      /** Query phrase to use. */
      query?: string | null;
      /** Language to search in. */
      language?: string | null;
      /** Limit of documents to return per document type. */
      limit?: number | null;
      /** Enable fuzzy search (for example query 'kalvin clein' will match document with 'calvin klein' in title). */
      fuzzy?: boolean | null;
      /** Highlight texts matching the query. Highlighted text will be wrapped with <mark/> tag. Defaults to true if not provided. */
      highlight?: boolean | null;
      /** Searchable fields to search in. If not provided, search is executed on all searchable fields in schemas */
      searchFields?: string[];
      /** Document types to search in. If not provided, search is executed on all document types enabled for the site */
      documentTypes?: string[];
      /** Include seo hidden documents. Defaults to false if not provided. */
      includeSeoHidden?: boolean | null;
      /** The properties/overrides/experiments to enable for this request. Currently supported: `scoring_profile`, `result-format`. */
      properties?: SearchProperty[];
  }
  /**
   * Executes search query to fetch suggested items. Unlike search query suggest will match
   * partial phrases (for example "blu" will match documents containing "blue", "blues" and "blunt").
   * Phrase needs to be at least 3 symbols long. Suggestions can also perform optimisations in search
   * results and generally do not guarantee the same level of quality as regular Search endpoint.
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function suggest(options?: SuggestOptions): Promise<SuggestResponse>;
  interface SuggestOptions {
      /** Text to search for. Fields configured in suggester configuration will be searched. */
      query?: string | null;
      /** Document type of documents to search for. All document types are searched if not provided. */
      documentType?: string | null;
      /** Fields to order by. */
      ordering?: OrderingClauses;
      /** Number of suggested document to return. */
      limit?: number;
      /** Language to search in. */
      language?: string | null;
      /** Filter in platformized query language (for example {'field': {'$eq': 'value'}}) */
      filter?: Record<string, any> | null;
      /** Searchable fields to search in. If not provided, search is executed on all suggestable fields in schema */
      searchFields?: string[];
      /** A list of fields to include in the result set. If not provided, all fields of schema will be included. */
      fields?: string[];
      /** Include seo hidden documents. Defaults to false if not provided. */
      includeSeoHidden?: boolean | null;
      /** The properties/overrides/experiments to enable for this request. Currently supported: `scoring_profile`, `result-format`. */
      properties?: SearchProperty[];
  }
  /**
   * Searches for suggestions in multiple document types at once.
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function federatedSuggest(options?: FederatedSuggestOptions): Promise<FederatedSuggestResponse>;
  interface FederatedSuggestOptions {
      /** Text to search for. Fields configured in suggester configuration will be searched. */
      query?: string | null;
      /** Language to search in. */
      language?: string | null;
      /** Number of suggested document to return per document type. */
      limit?: number;
      /** Searchable fields to search in. If not provided, search is executed on all suggestable fields in schemas */
      searchFields?: string[];
      /** Document types to search in. If not provided, search is executed on all document types enabled for the site */
      documentTypes?: string[];
      /** Include seo hidden documents. Defaults to false if not provided. */
      includeSeoHidden?: boolean | null;
      /** The properties/overrides/experiments to enable for this request. Currently supported: `scoring_profile`, `result-format`. */
      properties?: SearchProperty[];
  }
  /**
   * Fetches documents similar to one single document.
   * This is typically used to implement "related to" scenarios (for example to fetch related store products when
   * consumer is already viewing one).
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function related(options?: RelatedOptions): Promise<RelatedResponse>;
  interface RelatedOptions {
      /** ID of the document to fetch related documents for. */
      documentId?: string | null;
      /** Document type of the document. */
      documentType?: string | null;
      /** Fields to order by. */
      ordering?: OrderingClauses;
      /** Language to search in. */
      language?: string | null;
      /** Filter in platformized query language (for example {'field': {'$eq': 'value'}}). */
      filter?: Record<string, any> | null;
      /** Searchable fields to compare documents by. If not provided, all searchable fields in schema are used */
      searchFields?: string[];
      /** A list of fields to include in the result set. If not provided, all fields of schema will be included. */
      fields?: string[];
      /** Number of related documents to return */
      limit?: number;
      /** The properties/overrides/experiments to enable for this request. Currently supported: `scoring_profile`. */
      properties?: SearchProperty[];
      /** Include seo hidden documents. Defaults to false if not provided. */
      includeSeoHidden?: boolean | null;
  }
  /**
   * Provides phrase completion. For example "blu" could return "blue", "blues" and "blunt" as candidate phrases. This operation is resource heavy at index time and is reserved for special use cases.
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function autocomplete(options?: AutocompleteOptions): Promise<AutocompleteResponse>;
  interface AutocompleteOptions {
      /** Query phrase to fetch completions for. */
      query?: string | null;
      /** Document type to use to search for phrases. */
      documentType?: string | null;
      /** Limit of phrases to fetch. */
      limit?: number;
      /** Language to search in. */
      language?: string | null;
      /** Filter in platfromized query language (for example {'field': {'$eq': 'value'}}) */
      filter?: Record<string, any> | null;
      /** Searchable fields to use for query completion. If not provided, all searchable fields in schema are used */
      searchFields?: string[];
      /** Include seo hidden documents. Defaults to false if not provided. */
      includeSeoHidden?: boolean | null;
  }
  /**
   * Provides phrase completion from multiple document types at once
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function federatedAutocomplete(options?: FederatedAutocompleteOptions): Promise<FederatedAutocompleteResponse>;
  interface FederatedAutocompleteOptions {
      /** Query phrase to fetch completions for. */
      query?: string | null;
      /** Language to search in. */
      language?: string | null;
      /** Number of queries to return per document type. */
      limit?: number;
      /** Searchable fields to search in. If not provided, search is executed on all autocompletable fields in schemas */
      searchFields?: string[];
      /** Document types to autocomplete in. If not provided, autocomplete is executed on all document types enabled for the site */
      documentTypes?: string[];
      /** Include seo hidden documents. Defaults to false if not provided. */
      includeSeoHidden?: boolean | null;
  }
  /**
   * Returns trending documents for given document types
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function trending(options?: TrendingOptions): Promise<TrendingResponse>;
  interface TrendingOptions {
      documentTypes?: string[];
      language?: string | null;
      /** Include seo hidden documents. Defaults to false if not provided. */
      includeSeoHidden?: boolean | null;
      /** The properties/overrides/experiments to enable for this request. Currently supported: `scoring_profile`, `result-format`. */
      properties?: SearchProperty[];
  }
  
  type searchV1Sitedocument_universal_d_SiteDocument = SiteDocument;
  type searchV1Sitedocument_universal_d_UpdateInternalDocumentsEvent = UpdateInternalDocumentsEvent;
  type searchV1Sitedocument_universal_d_UpdateInternalDocumentsEventOperationOneOf = UpdateInternalDocumentsEventOperationOneOf;
  type searchV1Sitedocument_universal_d_InternalDocument = InternalDocument;
  type searchV1Sitedocument_universal_d_InternalDocumentUpdateOperation = InternalDocumentUpdateOperation;
  type searchV1Sitedocument_universal_d_DeleteByIdsOperation = DeleteByIdsOperation;
  type searchV1Sitedocument_universal_d_DeleteByFilterOperation = DeleteByFilterOperation;
  type searchV1Sitedocument_universal_d_InternalDocumentUpdateByFilterOperation = InternalDocumentUpdateByFilterOperation;
  type searchV1Sitedocument_universal_d_InternalUpdateExistingOperation = InternalUpdateExistingOperation;
  type searchV1Sitedocument_universal_d_VersionedDocumentUpdateOperation = VersionedDocumentUpdateOperation;
  type searchV1Sitedocument_universal_d_VersioningMode = VersioningMode;
  const searchV1Sitedocument_universal_d_VersioningMode: typeof VersioningMode;
  type searchV1Sitedocument_universal_d_VersionedDeleteByIdsOperation = VersionedDeleteByIdsOperation;
  type searchV1Sitedocument_universal_d_VersionedDocumentId = VersionedDocumentId;
  type searchV1Sitedocument_universal_d_UpdateDocumentsEvent = UpdateDocumentsEvent;
  type searchV1Sitedocument_universal_d_UpdateDocumentsEventOperationOneOf = UpdateDocumentsEventOperationOneOf;
  type searchV1Sitedocument_universal_d_DocumentUpdateOperation = DocumentUpdateOperation;
  type searchV1Sitedocument_universal_d_IndexDocument = IndexDocument;
  type searchV1Sitedocument_universal_d_DocumentPayload = DocumentPayload;
  type searchV1Sitedocument_universal_d_DocumentImage = DocumentImage;
  type searchV1Sitedocument_universal_d_Enum = Enum;
  const searchV1Sitedocument_universal_d_Enum: typeof Enum;
  type searchV1Sitedocument_universal_d_V1DeleteByIdsOperation = V1DeleteByIdsOperation;
  type searchV1Sitedocument_universal_d_V1DeleteByFilterOperation = V1DeleteByFilterOperation;
  type searchV1Sitedocument_universal_d_UpdateByFilterOperation = UpdateByFilterOperation;
  type searchV1Sitedocument_universal_d_UpdateExistingOperation = UpdateExistingOperation;
  type searchV1Sitedocument_universal_d_Empty = Empty;
  type searchV1Sitedocument_universal_d_MessageEnvelope = MessageEnvelope;
  type searchV1Sitedocument_universal_d_IdentificationData = IdentificationData;
  type searchV1Sitedocument_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type searchV1Sitedocument_universal_d_WebhookIdentityType = WebhookIdentityType;
  const searchV1Sitedocument_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  type searchV1Sitedocument_universal_d_SearchRequest = SearchRequest;
  type searchV1Sitedocument_universal_d_OrderingClauses = OrderingClauses;
  type searchV1Sitedocument_universal_d_OrderingClause = OrderingClause;
  type searchV1Sitedocument_universal_d_Direction = Direction;
  const searchV1Sitedocument_universal_d_Direction: typeof Direction;
  type searchV1Sitedocument_universal_d_SearchPaging = SearchPaging;
  type searchV1Sitedocument_universal_d_FacetClauses = FacetClauses;
  type searchV1Sitedocument_universal_d_FacetClause = FacetClause;
  type searchV1Sitedocument_universal_d_FacetClauseClauseOneOf = FacetClauseClauseOneOf;
  type searchV1Sitedocument_universal_d_Aggregation = Aggregation;
  const searchV1Sitedocument_universal_d_Aggregation: typeof Aggregation;
  type searchV1Sitedocument_universal_d_HierarchicalFacet = HierarchicalFacet;
  type searchV1Sitedocument_universal_d_HierarchicalFacetClauseOneOf = HierarchicalFacetClauseOneOf;
  type searchV1Sitedocument_universal_d_TermFacet = TermFacet;
  type searchV1Sitedocument_universal_d_AggregationFacet = AggregationFacet;
  type searchV1Sitedocument_universal_d_SearchProperty = SearchProperty;
  type searchV1Sitedocument_universal_d_SearchResponse = SearchResponse;
  type searchV1Sitedocument_universal_d_NextPageResponse = NextPageResponse;
  type searchV1Sitedocument_universal_d_FacetsResponse = FacetsResponse;
  type searchV1Sitedocument_universal_d_FacetsResponseResponseOneOf = FacetsResponseResponseOneOf;
  type searchV1Sitedocument_universal_d_FacetCountResponse = FacetCountResponse;
  type searchV1Sitedocument_universal_d_Value = Value;
  type searchV1Sitedocument_universal_d_TermAggregationResponse = TermAggregationResponse;
  type searchV1Sitedocument_universal_d_MinAggregationResponse = MinAggregationResponse;
  type searchV1Sitedocument_universal_d_MaxAggregationResponse = MaxAggregationResponse;
  type searchV1Sitedocument_universal_d_MinMaxAggregationResponse = MinMaxAggregationResponse;
  type searchV1Sitedocument_universal_d_HierarchicalAggregationResponse = HierarchicalAggregationResponse;
  type searchV1Sitedocument_universal_d_SumAggregationResponse = SumAggregationResponse;
  type searchV1Sitedocument_universal_d_FederatedSearchRequest = FederatedSearchRequest;
  type searchV1Sitedocument_universal_d_FederatedSearchResponse = FederatedSearchResponse;
  type searchV1Sitedocument_universal_d_FederatedSearchDocuments = FederatedSearchDocuments;
  type searchV1Sitedocument_universal_d_SuggestRequest = SuggestRequest;
  type searchV1Sitedocument_universal_d_SuggestResponse = SuggestResponse;
  type searchV1Sitedocument_universal_d_FederatedSuggestRequest = FederatedSuggestRequest;
  type searchV1Sitedocument_universal_d_FederatedSuggestResponse = FederatedSuggestResponse;
  type searchV1Sitedocument_universal_d_FederatedSuggestDocuments = FederatedSuggestDocuments;
  type searchV1Sitedocument_universal_d_RelatedRequest = RelatedRequest;
  type searchV1Sitedocument_universal_d_RelatedResponse = RelatedResponse;
  type searchV1Sitedocument_universal_d_AutocompleteRequest = AutocompleteRequest;
  type searchV1Sitedocument_universal_d_AutocompleteResponse = AutocompleteResponse;
  type searchV1Sitedocument_universal_d_AutocompleteResponseValue = AutocompleteResponseValue;
  type searchV1Sitedocument_universal_d_FederatedAutocompleteRequest = FederatedAutocompleteRequest;
  type searchV1Sitedocument_universal_d_FederatedAutocompleteResponse = FederatedAutocompleteResponse;
  type searchV1Sitedocument_universal_d_FederatedAutocompleteResults = FederatedAutocompleteResults;
  type searchV1Sitedocument_universal_d_TrendingRequest = TrendingRequest;
  type searchV1Sitedocument_universal_d_TrendingResponse = TrendingResponse;
  type searchV1Sitedocument_universal_d_TrendingItems = TrendingItems;
  const searchV1Sitedocument_universal_d_search: typeof search;
  type searchV1Sitedocument_universal_d_SearchOptions = SearchOptions;
  const searchV1Sitedocument_universal_d_federatedSearch: typeof federatedSearch;
  type searchV1Sitedocument_universal_d_FederatedSearchOptions = FederatedSearchOptions;
  const searchV1Sitedocument_universal_d_suggest: typeof suggest;
  type searchV1Sitedocument_universal_d_SuggestOptions = SuggestOptions;
  const searchV1Sitedocument_universal_d_federatedSuggest: typeof federatedSuggest;
  type searchV1Sitedocument_universal_d_FederatedSuggestOptions = FederatedSuggestOptions;
  const searchV1Sitedocument_universal_d_related: typeof related;
  type searchV1Sitedocument_universal_d_RelatedOptions = RelatedOptions;
  const searchV1Sitedocument_universal_d_autocomplete: typeof autocomplete;
  type searchV1Sitedocument_universal_d_AutocompleteOptions = AutocompleteOptions;
  const searchV1Sitedocument_universal_d_federatedAutocomplete: typeof federatedAutocomplete;
  type searchV1Sitedocument_universal_d_FederatedAutocompleteOptions = FederatedAutocompleteOptions;
  const searchV1Sitedocument_universal_d_trending: typeof trending;
  type searchV1Sitedocument_universal_d_TrendingOptions = TrendingOptions;
  namespace searchV1Sitedocument_universal_d {
    export {
      searchV1Sitedocument_universal_d_SiteDocument as SiteDocument,
      searchV1Sitedocument_universal_d_UpdateInternalDocumentsEvent as UpdateInternalDocumentsEvent,
      searchV1Sitedocument_universal_d_UpdateInternalDocumentsEventOperationOneOf as UpdateInternalDocumentsEventOperationOneOf,
      searchV1Sitedocument_universal_d_InternalDocument as InternalDocument,
      searchV1Sitedocument_universal_d_InternalDocumentUpdateOperation as InternalDocumentUpdateOperation,
      searchV1Sitedocument_universal_d_DeleteByIdsOperation as DeleteByIdsOperation,
      searchV1Sitedocument_universal_d_DeleteByFilterOperation as DeleteByFilterOperation,
      searchV1Sitedocument_universal_d_InternalDocumentUpdateByFilterOperation as InternalDocumentUpdateByFilterOperation,
      searchV1Sitedocument_universal_d_InternalUpdateExistingOperation as InternalUpdateExistingOperation,
      searchV1Sitedocument_universal_d_VersionedDocumentUpdateOperation as VersionedDocumentUpdateOperation,
      searchV1Sitedocument_universal_d_VersioningMode as VersioningMode,
      searchV1Sitedocument_universal_d_VersionedDeleteByIdsOperation as VersionedDeleteByIdsOperation,
      searchV1Sitedocument_universal_d_VersionedDocumentId as VersionedDocumentId,
      searchV1Sitedocument_universal_d_UpdateDocumentsEvent as UpdateDocumentsEvent,
      searchV1Sitedocument_universal_d_UpdateDocumentsEventOperationOneOf as UpdateDocumentsEventOperationOneOf,
      searchV1Sitedocument_universal_d_DocumentUpdateOperation as DocumentUpdateOperation,
      searchV1Sitedocument_universal_d_IndexDocument as IndexDocument,
      searchV1Sitedocument_universal_d_DocumentPayload as DocumentPayload,
      searchV1Sitedocument_universal_d_DocumentImage as DocumentImage,
      searchV1Sitedocument_universal_d_Enum as Enum,
      searchV1Sitedocument_universal_d_V1DeleteByIdsOperation as V1DeleteByIdsOperation,
      searchV1Sitedocument_universal_d_V1DeleteByFilterOperation as V1DeleteByFilterOperation,
      searchV1Sitedocument_universal_d_UpdateByFilterOperation as UpdateByFilterOperation,
      searchV1Sitedocument_universal_d_UpdateExistingOperation as UpdateExistingOperation,
      searchV1Sitedocument_universal_d_Empty as Empty,
      searchV1Sitedocument_universal_d_MessageEnvelope as MessageEnvelope,
      searchV1Sitedocument_universal_d_IdentificationData as IdentificationData,
      searchV1Sitedocument_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      searchV1Sitedocument_universal_d_WebhookIdentityType as WebhookIdentityType,
      searchV1Sitedocument_universal_d_SearchRequest as SearchRequest,
      searchV1Sitedocument_universal_d_OrderingClauses as OrderingClauses,
      searchV1Sitedocument_universal_d_OrderingClause as OrderingClause,
      searchV1Sitedocument_universal_d_Direction as Direction,
      searchV1Sitedocument_universal_d_SearchPaging as SearchPaging,
      searchV1Sitedocument_universal_d_FacetClauses as FacetClauses,
      searchV1Sitedocument_universal_d_FacetClause as FacetClause,
      searchV1Sitedocument_universal_d_FacetClauseClauseOneOf as FacetClauseClauseOneOf,
      searchV1Sitedocument_universal_d_Aggregation as Aggregation,
      searchV1Sitedocument_universal_d_HierarchicalFacet as HierarchicalFacet,
      searchV1Sitedocument_universal_d_HierarchicalFacetClauseOneOf as HierarchicalFacetClauseOneOf,
      searchV1Sitedocument_universal_d_TermFacet as TermFacet,
      searchV1Sitedocument_universal_d_AggregationFacet as AggregationFacet,
      searchV1Sitedocument_universal_d_SearchProperty as SearchProperty,
      searchV1Sitedocument_universal_d_SearchResponse as SearchResponse,
      searchV1Sitedocument_universal_d_NextPageResponse as NextPageResponse,
      searchV1Sitedocument_universal_d_FacetsResponse as FacetsResponse,
      searchV1Sitedocument_universal_d_FacetsResponseResponseOneOf as FacetsResponseResponseOneOf,
      searchV1Sitedocument_universal_d_FacetCountResponse as FacetCountResponse,
      searchV1Sitedocument_universal_d_Value as Value,
      searchV1Sitedocument_universal_d_TermAggregationResponse as TermAggregationResponse,
      searchV1Sitedocument_universal_d_MinAggregationResponse as MinAggregationResponse,
      searchV1Sitedocument_universal_d_MaxAggregationResponse as MaxAggregationResponse,
      searchV1Sitedocument_universal_d_MinMaxAggregationResponse as MinMaxAggregationResponse,
      searchV1Sitedocument_universal_d_HierarchicalAggregationResponse as HierarchicalAggregationResponse,
      searchV1Sitedocument_universal_d_SumAggregationResponse as SumAggregationResponse,
      searchV1Sitedocument_universal_d_FederatedSearchRequest as FederatedSearchRequest,
      searchV1Sitedocument_universal_d_FederatedSearchResponse as FederatedSearchResponse,
      searchV1Sitedocument_universal_d_FederatedSearchDocuments as FederatedSearchDocuments,
      searchV1Sitedocument_universal_d_SuggestRequest as SuggestRequest,
      searchV1Sitedocument_universal_d_SuggestResponse as SuggestResponse,
      searchV1Sitedocument_universal_d_FederatedSuggestRequest as FederatedSuggestRequest,
      searchV1Sitedocument_universal_d_FederatedSuggestResponse as FederatedSuggestResponse,
      searchV1Sitedocument_universal_d_FederatedSuggestDocuments as FederatedSuggestDocuments,
      searchV1Sitedocument_universal_d_RelatedRequest as RelatedRequest,
      searchV1Sitedocument_universal_d_RelatedResponse as RelatedResponse,
      searchV1Sitedocument_universal_d_AutocompleteRequest as AutocompleteRequest,
      searchV1Sitedocument_universal_d_AutocompleteResponse as AutocompleteResponse,
      searchV1Sitedocument_universal_d_AutocompleteResponseValue as AutocompleteResponseValue,
      searchV1Sitedocument_universal_d_FederatedAutocompleteRequest as FederatedAutocompleteRequest,
      searchV1Sitedocument_universal_d_FederatedAutocompleteResponse as FederatedAutocompleteResponse,
      searchV1Sitedocument_universal_d_FederatedAutocompleteResults as FederatedAutocompleteResults,
      searchV1Sitedocument_universal_d_TrendingRequest as TrendingRequest,
      searchV1Sitedocument_universal_d_TrendingResponse as TrendingResponse,
      searchV1Sitedocument_universal_d_TrendingItems as TrendingItems,
      searchV1Sitedocument_universal_d_search as search,
      searchV1Sitedocument_universal_d_SearchOptions as SearchOptions,
      searchV1Sitedocument_universal_d_federatedSearch as federatedSearch,
      searchV1Sitedocument_universal_d_FederatedSearchOptions as FederatedSearchOptions,
      searchV1Sitedocument_universal_d_suggest as suggest,
      searchV1Sitedocument_universal_d_SuggestOptions as SuggestOptions,
      searchV1Sitedocument_universal_d_federatedSuggest as federatedSuggest,
      searchV1Sitedocument_universal_d_FederatedSuggestOptions as FederatedSuggestOptions,
      searchV1Sitedocument_universal_d_related as related,
      searchV1Sitedocument_universal_d_RelatedOptions as RelatedOptions,
      searchV1Sitedocument_universal_d_autocomplete as autocomplete,
      searchV1Sitedocument_universal_d_AutocompleteOptions as AutocompleteOptions,
      searchV1Sitedocument_universal_d_federatedAutocomplete as federatedAutocomplete,
      searchV1Sitedocument_universal_d_FederatedAutocompleteOptions as FederatedAutocompleteOptions,
      searchV1Sitedocument_universal_d_trending as trending,
      searchV1Sitedocument_universal_d_TrendingOptions as TrendingOptions,
    };
  }
  
  export { searchV1Sitedocument_universal_d as siteSearch, searchPlatformizedV1SiteDocument_universal_d as wixSiteSearch };
}
