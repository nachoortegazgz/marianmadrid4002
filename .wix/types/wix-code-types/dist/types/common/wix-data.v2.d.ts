declare module "wix-data.v2" {
    /** An index is a map of a collection's data, organized according to specific fields to increase query speed. */
    interface Index$1 {
        /** Name of the index. */
        name?: string;
        /**
         * Fields for which the index is defined.
         *
         * Max: 3 fields (for a unique index: 1 field)
         */
        fields?: Field$1[];
        /**
         * Current status of the index.
         * @readonly
         */
        status?: Status$1;
        /**
         * Contains details about the reasons for failure when `status` is `FAILED`.
         * @readonly
         */
        failure?: Failure$1;
        /**
         * Whether the index enforces uniqueness of values in the field for which it is defined.
         * If `true`, the index can have only one field.
         *
         * Default: `false`
         */
        unique?: boolean;
        /**
         * Whether the index ignores case.
         *
         * Default: `false`
         */
        caseInsensitive?: boolean;
    }
    /**
     * Order determines how values are ordered in the index. This is important when
     * ordering and/or range querying by indexed fields.
     */
    enum Order$1 {
        ASC = "ASC",
        DESC = "DESC"
    }
    interface Field$1 {
        /** Path of the field to index. For example: `title` or `options.price`. */
        path?: string;
        /**
         * Sort order for the index. Base on how the data is regularly queried.
         *
         * Default: `ASC`
         */
        order?: Order$1;
    }
    enum Status$1 {
        /** Place holder. Never returned by the service. */
        UNKNOWN = "UNKNOWN",
        /** Index creation is in progress. */
        BUILDING = "BUILDING",
        /** Index has been successfully created and can be used in queries. */
        ACTIVE = "ACTIVE",
        /** Index is in the process of being dropped. */
        DROPPING = "DROPPING",
        /** Index has been dropped successfully. */
        DROPPED = "DROPPED",
        /** Index creation has failed. */
        FAILED = "FAILED",
        /** Index contains incorrectly indexed data. */
        INVALID = "INVALID"
    }
    interface Failure$1 {
        /**
         * Error code.
         * - `WDE0112`: Unknown error while building collection index.
         * - `WDE0113`: Duplicate key error while building collection index.
         * - `WDE0114`: Document too large while building collection index.
         */
        code?: string;
        /** Description of the failure. */
        description?: string;
        /**
         * ID of the data item that caused the failure.
         * For example, if `unique` is `true`, the ID of an item containing a duplicate value.
         */
        itemId?: string | null;
    }
    interface CreateIndexRequest {
        /** Details of the index to be created. */
        index: Index$1;
        /** ID of the data collection for which to generate the index. */
        dataCollectionId: string;
    }
    enum Environment {
        LIVE = "LIVE",
        SANDBOX = "SANDBOX",
        SANDBOX_PREFERRED = "SANDBOX_PREFERRED"
    }
    interface CreateIndexResponse {
        /** Details of the index being generated. */
        index?: Index$1;
    }
    interface DropIndexRequest {
        /** Name of the index to drop. */
        indexName: string;
        /** ID of the data collection for which the index to be dropped is defined. */
        dataCollectionId: string;
    }
    interface DropIndexResponse {
    }
    interface ListIndexesRequest {
        /** ID of the data collection for which to list indexes. */
        dataCollectionId: string;
        /** Paging options to limit and skip the number of items. */
        paging?: Paging$2;
    }
    interface Paging$2 {
        /** Number of items to load. */
        limit?: number | null;
        /** Number of items to skip in the current sort order. */
        offset?: number | null;
    }
    interface ListIndexesResponse {
        /** List of all indexes for the requested data collection. */
        indexes?: Index$1[];
        /** Paging metadata. */
        pagingMetadata?: PagingMetadata$1;
    }
    interface PagingMetadata$1 {
        /** Number of items returned in the response. */
        count?: number | null;
        /** Offset that was requested. */
        offset?: number | null;
        /** Total number of items that match the query. */
        total?: number | null;
        /** Flag that indicates the server failed to calculate the `total` field. */
        tooManyToCount?: boolean | null;
    }
    interface ListAvailableIndexesRequest {
        /** Data collection to show available indexes for */
        dataCollectionId: string;
    }
    interface ListAvailableIndexesResponse {
        /**
         * limit of regular single-field indexes, even if 0 1-field indices may be created using
         * 3-field quota (if available)
         */
        regular1Field?: number;
        /** limit of regular indexes up to 3-fields (in addition to 1-field indexes quota) */
        regular3Field?: number;
        /** limit of unique indexes */
        unique1Field?: number;
        /** Overall index limit, missing value means there's no overall limit */
        total?: number | null;
    }
    /**
     * Creates an index for a data collection.
     *
     * The index can't be used immediately, as the process of generating the index takes time.
     * You can check whether an index is ready by calling List Indexes.
     *
     * Note that when an index fails to create, the failed index still occupies a slot.
     * To remove the failed index and free up the slot for a new index, call Drop Index.
     * @param dataCollectionId - ID of the data collection for which to generate the index.
     * @param index - Details of the index to be created.
     * @public
     * @requiredField dataCollectionId
     * @requiredField index
     * @requiredField index.fields
     * @requiredField index.fields.path
     * @requiredField index.name
     * @param options - Options for creating an index.
     * @permissionId WIX_DATA.CREATE_INDEX
     * @permissionScope Manage Data Indexes
     * @permissionScopeId SCOPE.DC-DATA.INDEXES-MANAGE
     * @applicableIdentity APP
     * @adminMethod
     * @returns Details of the index being generated.
     */
    function createIndex(dataCollectionId: string, index: Index$1, options?: CreateIndexOptions): Promise<Index$1>;
    interface CreateIndexOptions {
    }
    /**
     * Removes an index from a data collection.
     *
     * The process of dropping an index from a collection takes time.
     * You can check whether an index has been dropped by calling List Indexes.
     * @param dataCollectionId - ID of the data collection for which the index to be dropped is defined.
     * @param indexName - Name of the index to drop.
     * @public
     * @requiredField dataCollectionId
     * @requiredField indexName
     * @param options - Options for dropping an index.
     * @permissionId WIX_DATA.DROP_INDEX
     * @permissionScope Manage Data Indexes
     * @permissionScopeId SCOPE.DC-DATA.INDEXES-MANAGE
     * @applicableIdentity APP
     * @adminMethod
     */
    function dropIndex(dataCollectionId: string, indexName: string, options?: DropIndexOptions): Promise<void>;
    interface DropIndexOptions {
    }
    /**
     * Lists all indexes defined for a data collection.
     *
     * When an index's status is `ACTIVE`, it is ready to use.
     * While it is still being created, its status is `BUILDING`.
     *
     * When an index's status is `DROPPED`, it has been dropped successfully.
     * While it is still in the process of being removed, its status is `DROPPING`.
     * @param dataCollectionId - ID of the data collection for which to list indexes.
     * @public
     * @requiredField dataCollectionId
     * @param options - Options for retrieving a list of indexes.
     * @permissionId WIX_DATA.LIST_INDEXES
     * @permissionScope Manage Data Indexes
     * @permissionScopeId SCOPE.DC-DATA.INDEXES-MANAGE
     * @applicableIdentity APP
     * @adminMethod
     */
    function listIndexes(dataCollectionId: string, options?: ListIndexesOptions): Promise<ListIndexesResponse>;
    interface ListIndexesOptions {
        /** Paging options to limit and skip the number of items. */
        paging?: Paging$2;
    }
    type dataV2IndexIndexes_universal_d_CreateIndexRequest = CreateIndexRequest;
    type dataV2IndexIndexes_universal_d_Environment = Environment;
    const dataV2IndexIndexes_universal_d_Environment: typeof Environment;
    type dataV2IndexIndexes_universal_d_CreateIndexResponse = CreateIndexResponse;
    type dataV2IndexIndexes_universal_d_DropIndexRequest = DropIndexRequest;
    type dataV2IndexIndexes_universal_d_DropIndexResponse = DropIndexResponse;
    type dataV2IndexIndexes_universal_d_ListIndexesRequest = ListIndexesRequest;
    type dataV2IndexIndexes_universal_d_ListIndexesResponse = ListIndexesResponse;
    type dataV2IndexIndexes_universal_d_ListAvailableIndexesRequest = ListAvailableIndexesRequest;
    type dataV2IndexIndexes_universal_d_ListAvailableIndexesResponse = ListAvailableIndexesResponse;
    const dataV2IndexIndexes_universal_d_createIndex: typeof createIndex;
    type dataV2IndexIndexes_universal_d_CreateIndexOptions = CreateIndexOptions;
    const dataV2IndexIndexes_universal_d_dropIndex: typeof dropIndex;
    type dataV2IndexIndexes_universal_d_DropIndexOptions = DropIndexOptions;
    const dataV2IndexIndexes_universal_d_listIndexes: typeof listIndexes;
    type dataV2IndexIndexes_universal_d_ListIndexesOptions = ListIndexesOptions;
    namespace dataV2IndexIndexes_universal_d {
        export { Index$1 as Index, Order$1 as Order, Field$1 as Field, Status$1 as Status, Failure$1 as Failure, dataV2IndexIndexes_universal_d_CreateIndexRequest as CreateIndexRequest, dataV2IndexIndexes_universal_d_Environment as Environment, dataV2IndexIndexes_universal_d_CreateIndexResponse as CreateIndexResponse, dataV2IndexIndexes_universal_d_DropIndexRequest as DropIndexRequest, dataV2IndexIndexes_universal_d_DropIndexResponse as DropIndexResponse, dataV2IndexIndexes_universal_d_ListIndexesRequest as ListIndexesRequest, Paging$2 as Paging, dataV2IndexIndexes_universal_d_ListIndexesResponse as ListIndexesResponse, PagingMetadata$1 as PagingMetadata, dataV2IndexIndexes_universal_d_ListAvailableIndexesRequest as ListAvailableIndexesRequest, dataV2IndexIndexes_universal_d_ListAvailableIndexesResponse as ListAvailableIndexesResponse, dataV2IndexIndexes_universal_d_createIndex as createIndex, dataV2IndexIndexes_universal_d_CreateIndexOptions as CreateIndexOptions, dataV2IndexIndexes_universal_d_dropIndex as dropIndex, dataV2IndexIndexes_universal_d_DropIndexOptions as DropIndexOptions, dataV2IndexIndexes_universal_d_listIndexes as listIndexes, dataV2IndexIndexes_universal_d_ListIndexesOptions as ListIndexesOptions, };
    }
    /** A data collection determines the structure of data to be stored in a database. */
    interface DataCollection {
        /** Collection ID. For example, `my-first-collection`. May include a namespace. */
        _id?: string;
        /**
         * Collection type. Indicates how the collection was created and is stored.
         *
         * * `NATIVE`: User-created collection.
         * * `WIX_APP`: [Collection](https://support.wix.com/en/article/velo-working-with-wix-app-collections-and-code#what-are-wix-app-collections) created by a Wix app, including [starter collections](https://support.wix.com/en/article/velo-working-with-wix-app-collections-and-code#what-are-wix-app-starter-collections) created when a Wix app is installed.
         * * `BLOCKS_APP`: Collection created by a Wix Blocks app.
         * * `EXTERNAL`: Collection located in externally connected storage.
         * @readonly
         */
        collectionType?: CollectionType;
        /**
         * ID of the app that defined this collection. For user-defined collections, this value is null.
         * @readonly
         */
        ownerAppId?: string | null;
        /**
         * Maximum number of items returned in a single query, based on the underlying storage.
         * Native collections have a maximum page size of 1000 for offset-based queries or 100 for cursor-based queries.
         * External collections' maximum page size defaults to 50, but an external provider can set any maximum value up to 1000.
         * @readonly
         */
        maxPageSize?: number | null;
        /** Collection's display name as shown in the CMS. For example, `My First Collection`. */
        displayName?: string | null;
        /**
         * Indicates how the collection's items are sorted by default when a query doesn't specify an order.
         * @readonly
         */
        defaultDisplayOrder?: Sort;
        /**
         * UI-friendly namespace of the Wix app with which the data collection is associated, such as Stores or Bookings.
         * Empty for all data collections not owned by internal Wix apps.
         * @readonly
         */
        displayNamespace?: string | null;
        /** The field whose value the CMS displays to represent the collection item when referenced in a different collection. */
        displayField?: string | null;
        /**
         * Capabilities the collection supports.
         * @readonly
         */
        capabilities?: CollectionCapabilities;
        /** Collection's field structure. */
        fields?: Field[];
        /** Levels of permission for accessing and modifying data, defined by lowest role needed to perform each action. */
        permissions?: Permissions;
        /**
         * Collection's current revision number, which increments each time the collection is updated. For an update operation to succeed, you must pass the latest revision number.
         * @readonly
         */
        revision?: string | null;
        /** All plugins the collection uses. Plugins apply additional capabilities to the collection or extend its functionality. */
        plugins?: Plugin[];
        /**
         * All paging modes the collection supports. In native collections, offset-based paging is supported by default.
         * @readonly
         */
        pagingModes?: PagingMode[];
        /**
         * Date the collection was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date the collection was last updated.
         * @readonly
         */
        _updatedDate?: Date;
    }
    enum CollectionType {
        /** User-created collection. */
        NATIVE = "NATIVE",
        /** [Collection](https://support.wix.com/en/article/velo-working-with-wix-app-collections-and-code#what-are-wix-app-collections) created by a Wix app when it is installed. This type of collection can be modified dynamically by that app (for example, Wix Forms). */
        WIX_APP = "WIX_APP",
        /** Collection created by a Wix Blocks app. */
        BLOCKS_APP = "BLOCKS_APP",
        /** Collection located in externally connected storage. */
        EXTERNAL = "EXTERNAL"
    }
    interface Sort {
        /** Field to sort by. */
        fieldKey?: string;
        /**
         * Sort order. Use `ASC` for ascending order or `DESC` for descending order.
         *
         * Default: `ASC`
         */
        direction?: Direction;
    }
    enum Direction {
        ASC = "ASC",
        DESC = "DESC"
    }
    interface CollectionCapabilities {
        /**
         * Data operations the collection supports. The listed operations can be performed on data the collection contains.
         *
         * Supported values: `AGGREGATE`, `BULK_INSERT`, `BULK_REMOVE`, `BULK_SAVE`, `BULK_UPDATE`, `COUNT`, `DISTINCT`, `FIND`, `GET`, `INSERT`, `INSERT_REFERENCE`, `IS_REFERENCED`, `QUERY_REFERENCED`, `REMOVE`, `REMOVE_REFERENCE`, `REPLACE_REFERENCES`, `SAVE`, `TRUNCATE`, `UPDATE`.
         */
        dataOperations?: DataOperation[];
        /**
         * Collection operations supported. The listed operations can be performed on the collection itself.
         * + `UPDATE`: Allows updating the collection's structure, for example adding, updating, or deleting fields. If not included, the collection's structure can't be changed.
         * + `REMOVE`: Allows deleting the entire collection. If not included, the collection can't be deleted.
         */
        collectionOperations?: CollectionOperation[];
        /** Maximum number of indexes for the collection. */
        indexLimits?: IndexLimits;
    }
    enum DataOperation {
        AGGREGATE = "AGGREGATE",
        BULK_INSERT = "BULK_INSERT",
        BULK_REMOVE = "BULK_REMOVE",
        BULK_SAVE = "BULK_SAVE",
        BULK_UPDATE = "BULK_UPDATE",
        COUNT = "COUNT",
        DISTINCT = "DISTINCT",
        FIND = "FIND",
        GET = "GET",
        INSERT = "INSERT",
        INSERT_REFERENCE = "INSERT_REFERENCE",
        IS_REFERENCED = "IS_REFERENCED",
        QUERY_REFERENCED = "QUERY_REFERENCED",
        REMOVE = "REMOVE",
        REMOVE_REFERENCE = "REMOVE_REFERENCE",
        REPLACE_REFERENCES = "REPLACE_REFERENCES",
        SAVE = "SAVE",
        TRUNCATE = "TRUNCATE",
        UPDATE = "UPDATE"
    }
    enum CollectionOperation {
        /** Supports updating this collection. */
        UPDATE = "UPDATE",
        /** Supports removing this collections. */
        REMOVE = "REMOVE"
    }
    interface IndexLimits {
        /** Maximum number of regular (non-unique) indexes allowed for this collection. */
        regular?: number;
        /** Maximum number of unique indexes allowed for this collection. */
        unique?: number;
        /** Maximum number of regular and unique indexes allowed for this collection. */
        total?: number;
    }
    interface Field extends FieldRangeValidationsOneOf {
        /** Range of possible values for a numerical field. */
        numberRange?: NumberRange;
        /** Length range permitted for a text field. Relevant for fields that hold strings, such as those of type `TEXT` or `RICH_TEXT`. */
        stringLengthRange?: StringLengthRange;
        /** Array size range permitted. Relevant for fields that hold arrays, such as those of type `ARRAY`, `ARRAY_STRING`, or `ARRAY_DOCUMENT`. */
        arraySizeRange?: ArraySizeRange;
        /** Unique identifier for the field. For example, `firstName`. */
        key?: string;
        /** Field's display name when shown in the CMS. For example, `First Name`. */
        displayName?: string | null;
        /** Field's data type. */
        type?: Type;
        /** Metadata for complex data types. This property only exists for references, multi-references, objects, and arrays. */
        typeMetadata?: TypeMetadata;
        /**
         * Whether the field is a system field (created automatically).
         * @readonly
         */
        systemField?: boolean;
        /**
         * Capabilities the field supports.
         * @readonly
         */
        capabilities?: FieldCapabilities;
        /** Indicates if field is encrypted. */
        encrypted?: boolean;
        /** Description of the field. */
        description?: string | null;
        plugin?: string | null;
        /**
         * Whether the field is read-only. A read-only field can't be changed.
         *
         * Default: `false`
         */
        readOnly?: boolean | null;
        /**
         * Whether the field is immutable. An immutable field can be set once, but then cannot be updated.
         *
         * Default: `false`
         */
        immutable?: boolean | null;
        /**
         * Whether the field is required.
         *
         * Default: `false`
         */
        required?: boolean | null;
        /** Additional optional plugins for the field. */
        plugins?: FieldPlugin[];
    }
    /** @oneof */
    interface FieldRangeValidationsOneOf {
        /** Range of possible values for a numerical field. */
        numberRange?: NumberRange;
        /** Length range permitted for a text field. Relevant for fields that hold strings, such as those of type `TEXT` or `RICH_TEXT`. */
        stringLengthRange?: StringLengthRange;
        /** Array size range permitted. Relevant for fields that hold arrays, such as those of type `ARRAY`, `ARRAY_STRING`, or `ARRAY_DOCUMENT`. */
        arraySizeRange?: ArraySizeRange;
    }
    enum Type {
        UNKNOWN_FIELD_TYPE = "UNKNOWN_FIELD_TYPE",
        TEXT = "TEXT",
        NUMBER = "NUMBER",
        DATE = "DATE",
        DATETIME = "DATETIME",
        IMAGE = "IMAGE",
        BOOLEAN = "BOOLEAN",
        DOCUMENT = "DOCUMENT",
        URL = "URL",
        RICH_TEXT = "RICH_TEXT",
        VIDEO = "VIDEO",
        ANY = "ANY",
        ARRAY_STRING = "ARRAY_STRING",
        ARRAY_DOCUMENT = "ARRAY_DOCUMENT",
        AUDIO = "AUDIO",
        TIME = "TIME",
        LANGUAGE = "LANGUAGE",
        RICH_CONTENT = "RICH_CONTENT",
        MEDIA_GALLERY = "MEDIA_GALLERY",
        ADDRESS = "ADDRESS",
        PAGE_LINK = "PAGE_LINK",
        REFERENCE = "REFERENCE",
        MULTI_REFERENCE = "MULTI_REFERENCE",
        OBJECT = "OBJECT",
        ARRAY = "ARRAY",
        /** Deprecated - can’t be added to collections. Can only appear in older collections. */
        LEGACY_TIME = "LEGACY_TIME",
        /** Deprecated - can’t be added to collections. Can only appear in older collections. */
        LEGACY_BOOK = "LEGACY_BOOK",
        /** Deprecated - can’t be added to collections. Can only appear in older collections. */
        LEGACY_EXTERNAL_URL = "LEGACY_EXTERNAL_URL",
        /** Deprecated - can’t be added to collections. Can only appear in older collections. */
        LEGACY_BROKEN_REFERENCE = "LEGACY_BROKEN_REFERENCE",
        /** Deprecated - can’t be added to collections. Can only appear in older collections. */
        LEGACY_IMAGE = "LEGACY_IMAGE",
        /** Deprecated - can’t be added to collections. Can only appear in older collections. */
        LEGACY_COLOR = "LEGACY_COLOR",
        /** Deprecated - can’t be added to collections. Can only appear in older collections. */
        LEGACY_EXTERNAL_VIDEO = "LEGACY_EXTERNAL_VIDEO"
    }
    interface TypeMetadata extends TypeMetadataMetadataOneOf {
        /** Metadata for a reference field. */
        reference?: Reference;
        /** Metadata for a multi-reference field. */
        multiReference?: MultiReference;
        /** Metadata for an object field. */
        object?: _Object;
        /** Metadata for an array field. */
        array?: _Array;
        /** Metadata for a page link field. */
        pageLink?: PageLink;
    }
    /** @oneof */
    interface TypeMetadataMetadataOneOf {
        /** Metadata for a reference field. */
        reference?: Reference;
        /** Metadata for a multi-reference field. */
        multiReference?: MultiReference;
        /** Metadata for an object field. */
        object?: _Object;
        /** Metadata for an array field. */
        array?: _Array;
        /** Metadata for a page link field. */
        pageLink?: PageLink;
    }
    interface FieldCapabilities {
        /**
         * Whether the collection can be sorted by this field.
         *
         * Default: `false`
         */
        sortable?: boolean;
        /**
         * Query operators that can be used for this field.
         *
         * Supported values: `EQ`, `LT`, `GT`, `NE`, `LTE`, `GTE`, `STARTS_WITH`, `ENDS_WITH`, `CONTAINS`, `HAS_SOME`, `HAS_ALL`, `EXISTS`, `URLIZED`.
         */
        queryOperators?: QueryOperator[];
    }
    enum QueryOperator {
        EQ = "EQ",
        LT = "LT",
        GT = "GT",
        NE = "NE",
        LTE = "LTE",
        GTE = "GTE",
        STARTS_WITH = "STARTS_WITH",
        ENDS_WITH = "ENDS_WITH",
        CONTAINS = "CONTAINS",
        HAS_SOME = "HAS_SOME",
        HAS_ALL = "HAS_ALL",
        EXISTS = "EXISTS",
        URLIZED = "URLIZED"
    }
    interface ObjectField {
        /** Field key. */
        key?: string;
        /** Display name for the field. */
        displayName?: string | null;
        /** Field type. */
        type?: Type;
        /** Metadata for complex data types. This property only exists for references, multi-references, objects, and arrays. */
        typeMetadata?: TypeMetadata;
        /**
         * Capabilities the object field supports.
         * @readonly
         */
        capabilities?: FieldCapabilities;
    }
    interface FieldsPattern {
        pattern?: string;
        lowercase?: boolean;
    }
    interface UrlizedOnlyPattern {
        pattern?: string;
    }
    interface Calculator extends CalculatorPatternOneOf {
        /** Value is calculated according to pattern, whitespaces are replaced with dash [-]. */
        fieldsPattern?: FieldsPattern;
        /** Value is only URL encoded. */
        urlizedOnlyPattern?: UrlizedOnlyPattern;
    }
    /** @oneof */
    interface CalculatorPatternOneOf {
        /** Value is calculated according to pattern, whitespaces are replaced with dash [-]. */
        fieldsPattern?: FieldsPattern;
        /** Value is only URL encoded. */
        urlizedOnlyPattern?: UrlizedOnlyPattern;
    }
    interface Reference {
        /** Referenced collection ID. */
        referencedCollectionId?: string;
    }
    interface MultiReference {
        /** Referenced collection ID. */
        referencedCollectionId?: string;
        /** Referencing field key. */
        referencingFieldKey?: string;
        /** Display name in the CMS for the referenced data. */
        referencingDisplayName?: string;
    }
    interface _Object {
        /** Fields within the object. */
        fields?: ObjectField[];
    }
    interface _Array {
        /** Element's data type. */
        elementType?: Type;
        /** Metadata for complex data types. This property only exists for references, multi-references, objects, and arrays. */
        typeMetadata?: TypeMetadata;
    }
    interface PageLink {
        calculator?: Calculator;
        /** Defines reference to router pattern in the site document. */
        linkedRouterPage?: string | null;
    }
    interface NumberRange {
        /**
         * Minimum permitted value for a numerical field.
         *
         * Default: No validation
         */
        min?: number | null;
        /**
         * Maximum permitted value for a numerical field.
         *
         * Default: No validation
         */
        max?: number | null;
    }
    interface StringLengthRange {
        /**
         * Minimum permitted length for a text field.
         *
         * Default: No validation
         */
        minLength?: number | null;
        /**
         * Maximum permitted length for a text field.
         *
         * Default: No validation
         */
        maxLength?: number | null;
    }
    interface ArraySizeRange {
        /**
         * Minimum permitted number of items in an array field. Relevant for fields that hold arrays, such as those of type `ARRAY`, `ARRAY_STRING`, or `ARRAY_DOCUMENT`.
         *
         * Default: No validation
         */
        minSize?: number | null;
        /**
         * Maximum permitted number of items in an array field. Relevant for fields that hold arrays, such as those of type `ARRAY`, `ARRAY_STRING`, or `ARRAY_DOCUMENT`.
         *
         * Default: No validation
         */
        maxSize?: number | null;
    }
    /** Optional plug-in aspects for fields */
    interface FieldPlugin extends FieldPluginOptionsOneOf {
        /** Options for the CMS plugin. */
        cmsOptions?: CmsOptions;
        type?: FieldPluginType;
    }
    /** @oneof */
    interface FieldPluginOptionsOneOf {
        /** Options for the CMS plugin. */
        cmsOptions?: CmsOptions;
    }
    enum FieldPluginType {
        UNKNOWN = "UNKNOWN",
        /** CMS-related field attributes */
        CMS = "CMS"
    }
    /** Options for the CMS plugin. */
    interface CmsOptions {
        /**
         * Indicates an internal CMS field. The CMS does not display internal fields.
         *
         * Default: `false`
         */
        internal?: boolean;
    }
    /** Permissions defined by the lowest role needed to perform each action. */
    interface Permissions {
        /** Lowest role needed to add a collection. */
        insert?: Role;
        /** Lowest role needed to update a collection. */
        update?: Role;
        /** Lowest role needed to remove a collection. */
        remove?: Role;
        /** Lowest role needed to read a collection. */
        read?: Role;
    }
    enum Role {
        /** Unknown. */
        UNKNOWN_ROLE = "UNKNOWN_ROLE",
        /** Site administrator. */
        ADMIN = "ADMIN",
        /** Signed-in user who added content to this collection. */
        SITE_MEMBER_AUTHOR = "SITE_MEMBER_AUTHOR",
        /** Any signed-in user. */
        SITE_MEMBER = "SITE_MEMBER",
        /** Any site visitor. */
        ANYONE = "ANYONE"
    }
    interface Plugin extends PluginOptionsOneOf {
        /** Options for the Publish plugin. */
        publishOptions?: PublishPluginOptions;
        /** Options for the Single Item plugin. */
        singleItemOptions?: SingleItemPluginOptions;
        /** Options for the Urlized plugin. */
        urlizedOptions?: UrlizedPluginOptions;
        /** Options for the Multilingual plugin. */
        multilingualOptions?: MultilingualOptions;
        /** Options for the PageLink plugin. */
        editablePageLinkOptions?: PageLinkPluginOptions;
        /** Options for the CMS plugin. */
        cmsOptions?: PluginCmsOptions;
        /**
         * Plugin types. The following plugins are supported:
         *
         * * `PUBLISH`: Allows items to be marked as either draft or published. For each item you can set a publishing time when the item will become visible to site visitors.
         * * `SINGLE_ITEM`: Ensures the collection can have one item at most. Can only be applied to a new collection.
         * * `URLIZED`: Generates item URLs for collections used by dynamic pages.
         * * `MULTILINGUAL`: Indicates that the collection is translatable. This allows you to manage translation for selected fields using [Wix Multilingual](https://www.wix.com/app-market/wix-multilingual).
         * * `CMS`: Contains CMS-related collection attributes
         */
        type?: PluginType;
    }
    /** @oneof */
    interface PluginOptionsOneOf {
        /** Options for the Publish plugin. */
        publishOptions?: PublishPluginOptions;
        /** Options for the Single Item plugin. */
        singleItemOptions?: SingleItemPluginOptions;
        /** Options for the Urlized plugin. */
        urlizedOptions?: UrlizedPluginOptions;
        /** Options for the Multilingual plugin. */
        multilingualOptions?: MultilingualOptions;
        /** Options for the PageLink plugin. */
        editablePageLinkOptions?: PageLinkPluginOptions;
        /** Options for the CMS plugin. */
        cmsOptions?: PluginCmsOptions;
    }
    enum Status {
        UNKNOWN_PUBLISH_PLUGIN_STATUS = "UNKNOWN_PUBLISH_PLUGIN_STATUS",
        PUBLISHED = "PUBLISHED",
        DRAFT = "DRAFT"
    }
    enum Format {
        UNKNOWN_URLIZED_PLUGIN_FORMAT = "UNKNOWN_URLIZED_PLUGIN_FORMAT",
        ORIGINAL = "ORIGINAL",
        PLAIN = "PLAIN"
    }
    /** if CMS-defined sort is enabled and should be used in site */
    interface SiteSort {
        /** Field and order for the site sort. */
        sort?: Sort[];
    }
    enum PluginType {
        /** Unknown plugin type. */
        UNKNOWN_PLUGIN_TYPE = "UNKNOWN_PLUGIN_TYPE",
        /** Allows items to be marked as either draft or published. For each item you can set a publishing time when the item will become visible to site visitors. */
        PUBLISH = "PUBLISH",
        /** Ensures the collection can have one item at most. Can only be applied to a new collection. */
        SINGLE_ITEM = "SINGLE_ITEM",
        /** Generates item URLs for collections used by dynamic pages. */
        URLIZED = "URLIZED",
        /** Deprecated. Will be removed in the future. */
        GRIDAPPLESS = "GRIDAPPLESS",
        /** Indicates that the collection is translatable. This allows you to manage translation for selected fields using [Wix Multilingual](https://www.wix.com/app-market/wix-multilingual). */
        MULTILINGUAL = "MULTILINGUAL",
        /** Indicates that collection is shared with current site */
        SHARED = "SHARED",
        /** Indicates that page link fields are persisted and can be updated */
        EDITABLE_PAGE_LINK = "EDITABLE_PAGE_LINK",
        /** CMS-specific collection properties */
        CMS = "CMS"
    }
    interface PublishPluginOptions {
        /** Default status. */
        defaultStatus?: Status;
    }
    interface SingleItemPluginOptions {
        /** ID of the single item in this collection. If you insert or update an item, its ID value is always changed to this. */
        singleItemId?: string;
    }
    interface UrlizedPluginOptions {
        /**
         * Encoding method for generating a URL in ASCII characters.
         *
         * * `ORIGINAL`: Letters are converted to lower case and spaces are replaced with dashes before generating the encoded URL.
         * * `PLAIN`: No changes are made before generating the encoded URL.
         */
        format?: Format;
    }
    interface MultilingualOptions {
        /** IDs of fields to allow translation. */
        translatableFieldKeys?: string[];
    }
    interface PageLinkPluginOptions {
        isPersisted?: boolean;
        isMutable?: boolean;
    }
    interface PluginCmsOptions {
        /** CMS sort, applied when a collection is displayed on a site. */
        siteSort?: SiteSort;
    }
    enum PagingMode {
        /** Offset-based paging. */
        OFFSET = "OFFSET",
        /** Cursor-based paging. */
        CURSOR = "CURSOR"
    }
    interface DataCollectionClonedEvent {
        /** original instance collection is cloned from */
        originInstanceId?: string;
        /** original collection ID, may be same as current one */
        originId?: string;
    }
    interface DataCollectionChangedEvent {
        /** list of new fields */
        fieldsAdded?: Field[];
        /** list of changed fields */
        fieldsUpdated?: FieldUpdate[];
        /** list of removed fields */
        fieldsRemoved?: Field[];
        /** list of new plugins */
        pluginsAdded?: Plugin[];
        /** list of changed plugins */
        pluginsUpdated?: PluginUpdate[];
        /** list of removed plugins */
        pluginsRemoved?: Plugin[];
    }
    interface FieldUpdate {
        /** previous state of the field */
        previous?: Field;
        /** current state of the field */
        current?: Field;
    }
    interface PluginUpdate {
        /** previous state of the plugin */
        previous?: Plugin;
        /** current state of the plugin */
        current?: Plugin;
    }
    interface CreateDataCollectionRequest {
        /** Collection details. */
        collection: DataCollection;
    }
    interface CreateDataCollectionResponse {
        /** Details of collection created. */
        collection?: DataCollection;
    }
    interface GetDataCollectionRequest {
        /** ID of the collection to retrieve. */
        dataCollectionId: string;
        /**
         * Whether to retrieve data from the primary database instance.
         * This decreases performance but ensures data retrieved is up to date even immediately after an update.
         * Learn more about [Wix Data and eventual consistency](https://dev.wix.com/api/rest/wix-data/wix-data/eventual-consistency).
         *
         * Default: `false`
         */
        consistentRead?: boolean;
    }
    interface GetDataCollectionResponse {
        /** Details of the collection requested. */
        collection?: DataCollection;
        /**
         * Details of collections referenced by the collection requested.
         * Only populated when `includeReferencedCollections` is `true` in the request.
         */
        referencedCollections?: DataCollection[];
    }
    interface ListDataCollectionsRequest {
        /**
         * Defines how collections in the response are sorted.
         *
         * Default: Ordered by ID in ascending order.
         */
        sort?: Sorting;
        /** Pagination information. */
        paging?: Paging$1;
        /**
         * Whether to retrieve data from the primary database instance.
         * This decreases performance but ensures data retrieved is up to date even immediately after an update.
         * Learn more about [Wix Data and eventual consistency](https://dev.wix.com/api/rest/wix-data/wix-data/eventual-consistency).
         *
         * Default: `false`
         */
        consistentRead?: boolean;
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
    interface Paging$1 {
        /** Number of items to load. */
        limit?: number | null;
        /** Number of items to skip in the current sort order. */
        offset?: number | null;
    }
    interface ListDataCollectionsResponse {
        /** List of collections. */
        collections?: DataCollection[];
        /** Paging information. */
        pagingMetadata?: PagingMetadataV2;
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
    }
    interface BulkGetDataCollectionsRequest {
        /** IDs of the collections to retrieve. */
        dataCollectionIds?: string[];
        /**
         * Whether to include deleted collections.
         *
         * Default: `false`
         */
        showDeletedCollections?: boolean;
        /**
         * Whether the returned collection list should include referenced collections.
         *
         * Default: `false`
         */
        includeReferencedCollections?: boolean;
        /** Sorting preferences. */
        sort?: Sorting;
        /**
         * Whether to retrieve data from the primary database instance.
         * This decreases performance but ensures data retrieved is up to date even immediately after an update.
         * Learn more about [Wix Data and eventual consistency](https://dev.wix.com/api/rest/wix-data/wix-data/eventual-consistency).
         *
         * Default: `false`
         */
        consistentRead?: boolean;
    }
    interface BulkGetDataCollectionsResponse {
        /**
         * List of requested collections.
         * When `include_referenced_collections` is `true` in the request, referenced collections are included here.
         */
        activeCollections?: DataCollection[];
        /** List of requested deleted collections. Only populated when `showDeletedCollections` is true in the request. */
        deletedCollections?: DataCollection[];
    }
    interface UpdateDataCollectionRequest {
        /** Updated collection details. The existing collection is replaced with this version. */
        collection: DataCollection;
    }
    interface UpdateDataCollectionResponse {
        /** Updated collection details. */
        collection?: DataCollection;
    }
    interface DeleteDataCollectionRequest {
        /** ID of the collection to delete. */
        dataCollectionId: string;
    }
    interface DeleteDataCollectionResponse {
    }
    interface CreateDataCollectionFieldRequest {
        /** ID of data collection to update */
        dataCollectionId: string;
        /** field to create */
        field: Field;
    }
    interface CreateDataCollectionFieldResponse {
        /** updated data collection */
        dataCollection?: DataCollection;
    }
    interface UpdateDataCollectionFieldRequest {
        /** ID of data collection to update */
        dataCollectionId: string;
        /** Field to update */
        field: Field;
    }
    interface UpdateDataCollectionFieldResponse {
        /** updated data collection */
        dataCollection?: DataCollection;
    }
    interface DeleteDataCollectionFieldRequest {
        /** ID of data collection to update */
        dataCollectionId: string;
        /** Field key to delete */
        fieldKey: string;
    }
    interface DeleteDataCollectionFieldResponse {
        /** updated data collection */
        dataCollection?: DataCollection;
    }
    interface BulkGetDataCollectionsPageBySnapshotsRequest {
        /** Ids of schema snapshot */
        snapshotIds?: string[];
        /** Pagination information. */
        paging?: Paging$1;
    }
    interface BulkGetDataCollectionsPageBySnapshotsResponse {
        /** List of snapshot collection map */
        snapshotCollections?: SnapshotCollection[];
        /** Paging information. */
        pagingMetadata?: PagingMetadataV2;
    }
    interface SnapshotCollection {
        /** snapshot to which collection belongs */
        snapshotId?: string;
        /** snapshot collection */
        collection?: DataCollection;
        /** snapshot of collection indexes */
        indexes?: Index[];
    }
    /** An index is a map of a collection's data, organized according to specific fields to increase query speed. */
    interface Index {
        /** Name of the index. */
        name?: string;
        /**
         * Fields for which the index is defined.
         *
         * Max: 3 fields (for a unique index: 1 field)
         */
        fields?: IndexField[];
        /**
         * Current status of the index.
         * - `BUILDING`: Index creation is in progress.
         * - `ACTIVE`: Index has been successfully created and can be used in queries.
         * - `DROPPING`: Index is in the process of being dropped.
         * - `DROPPED`: Index has been dropped successfully.
         * - `FAILED`: Index creation has failed.
         * - `INVALID`: Index contains incorrectly indexed data.
         * @readonly
         */
        status?: IndexStatus;
        /**
         * Contains details about the reasons for failure when `status` is `FAILED`.
         * @readonly
         */
        failure?: Failure;
        /**
         * Whether the index enforces uniqueness of values in the field for which it is defined.
         * If `true`, the index can have only one field.
         *
         * Default: `false`
         */
        unique?: boolean;
        /**
         * Whether the index ignores case.
         *
         * Default: `false`
         */
        caseInsensitive?: boolean;
    }
    /**
     * Order determines how values are ordered in the index. This is important when
     * ordering and/or range querying by indexed fields.
     */
    enum Order {
        ASC = "ASC",
        DESC = "DESC"
    }
    interface IndexField {
        /** Path of the field to index. For example: `title` or `options.price`. */
        path?: string;
        /**
         * Sort order for the index. Base on how the data is regularly queried.
         *
         * Default: `ASC`
         */
        order?: Order;
    }
    enum IndexStatus {
        /** Place holder. Never returned by the service. */
        UNKNOWN = "UNKNOWN",
        /** Index creation is in progress. */
        BUILDING = "BUILDING",
        /** Index has been successfully created and can be used in queries. */
        ACTIVE = "ACTIVE",
        /** Index is in the process of being dropped. */
        DROPPING = "DROPPING",
        /** Index has been dropped successfully. */
        DROPPED = "DROPPED",
        /** Index creation has failed. */
        FAILED = "FAILED",
        /** Index contains incorrectly indexed data. */
        INVALID = "INVALID"
    }
    interface Failure {
        /**
         * Error code.
         * - `WDE0112`: Unknown error while building collection index.
         * - `WDE0113`: Duplicate key error while building collection index.
         * - `WDE0114`: Document too large while building collection index.
         */
        code?: string;
        /** Description of the failure. */
        description?: string;
        /**
         * ID of the data item that caused the failure.
         * For example, if `unique` is `true`, the ID of an item containing a duplicate value.
         */
        itemId?: string | null;
    }
    interface CreateDataCollectionsSnapshotRequest {
    }
    interface CreateDataCollectionsSnapshotResponse {
        /** created snapshot ID */
        snapshotId?: string;
        /** data collections in snapshot */
        snapshotCollections?: DataCollection[];
    }
    interface RestoreDataCollectionsFromSnapshotRequest {
        /** snapshot ID to restore */
        snapshotId?: string;
        /** collection IDs to restore, if empty – all collections would be restored */
        dataCollectionIds?: string[];
    }
    interface RestoreDataCollectionsFromSnapshotResponse {
        /** restored collections */
        restoredCollections?: DataCollection[];
    }
    interface DeleteDataCollectionsSnapshotRequest {
        /** snapshot ID to delete */
        snapshotId?: string;
    }
    interface DeleteDataCollectionsSnapshotResponse {
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
        /** Event timestamp. */
        eventTime?: Date;
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
    }
    interface EntityUpdatedEvent$1 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$1 {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
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
    /**
     * Creates a new data collection.
     *
     * The request body must include an ID, details for at least 1 field, and a permissions object. If any of these are missing, the collection isn't created.
     * @param collection - Collection details.
     * @public
     * @requiredField collection
     * @requiredField collection._id
     * @requiredField collection.fields.key
     * @requiredField collection.fields.type
     * @requiredField collection.permissions.insert
     * @requiredField collection.permissions.read
     * @requiredField collection.permissions.remove
     * @requiredField collection.permissions.update
     * @param options - Options for creating a data collection.
     * @permissionScope Manage Data Collections
     * @permissionScopeId SCOPE.DC-DATA.DATA-COLLECTIONS-MANAGE
     * @applicableIdentity APP
     * @adminMethod
     * @returns Details of collection created.
     */
    function createDataCollection(collection: DataCollection): Promise<DataCollection>;
    /**
     * Retrieves a data collection by ID.
     * @param dataCollectionId - ID of the collection to retrieve.
     * @public
     * @requiredField dataCollectionId
     * @param options - Options for retrieving a data collection.
     * @permissionScope Manage Data Collections
     * @permissionScopeId SCOPE.DC-DATA.DATA-COLLECTIONS-MANAGE
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Details of the collection requested.
     */
    function getDataCollection(dataCollectionId: string, options?: GetDataCollectionOptions): Promise<DataCollection>;
    interface GetDataCollectionOptions {
        /**
         * Whether to retrieve data from the primary database instance.
         * This decreases performance but ensures data retrieved is up to date even immediately after an update.
         * Learn more about [Wix Data and eventual consistency](https://dev.wix.com/api/rest/wix-data/wix-data/eventual-consistency).
         *
         * Default: `false`
         */
        consistentRead?: boolean;
    }
    /**
     * Retrieves a list of all data collections associated with the site or project.
     *
     * By default, the list is ordered by ID in ascending order.
     * @public
     * @param options - Options for retrieving a list of data collections.
     * @permissionScope Manage Data Collections
     * @permissionScopeId SCOPE.DC-DATA.DATA-COLLECTIONS-MANAGE
     * @applicableIdentity APP
     * @adminMethod
     */
    function listDataCollections(options?: ListDataCollectionsOptions): Promise<ListDataCollectionsResponse>;
    interface ListDataCollectionsOptions {
        /**
         * Defines how collections in the response are sorted.
         *
         * Default: Ordered by ID in ascending order.
         */
        sort?: Sorting;
        /** Pagination information. */
        paging?: Paging$1;
        /**
         * Whether to retrieve data from the primary database instance.
         * This decreases performance but ensures data retrieved is up to date even immediately after an update.
         * Learn more about [Wix Data and eventual consistency](https://dev.wix.com/api/rest/wix-data/wix-data/eventual-consistency).
         *
         * Default: `false`
         */
        consistentRead?: boolean;
    }
    interface BulkGetDataCollectionsOptions {
        /** IDs of the collections to retrieve. */
        dataCollectionIds?: string[];
        /**
         * Whether to include deleted collections.
         *
         * Default: `false`
         */
        showDeletedCollections?: boolean;
        /**
         * Whether the returned collection list should include referenced collections.
         *
         * Default: `false`
         */
        includeReferencedCollections?: boolean;
        /** Sorting preferences. */
        sort?: Sorting;
        /**
         * Whether to retrieve data from the primary database instance.
         * This decreases performance but ensures data retrieved is up to date even immediately after an update.
         * Learn more about [Wix Data and eventual consistency](https://dev.wix.com/api/rest/wix-data/wix-data/eventual-consistency).
         *
         * Default: `false`
         */
        consistentRead?: boolean;
    }
    /**
     * Updates a data collection.
     *
     * A collection ID, revision number, permissions, and at least 1 field must be provided within `options.collection`.
     * If a collection with that ID exists, and if its current `revision` number matches the one provided, it is updated.
     * Otherwise, the request fails.
     *
     * When a collection is updated, its `_updatedDate` property is changed to the current date and its `revision` property is incremented.
     *
     * > **Note:**
     * > After a collection is updated, it only contains the properties included in the `updateDataCollection()` call. If the existing collection has properties with values and those properties
     * > aren't included in the updated collection details, their values are lost.
     * @param collection - Updated collection details. The existing collection is replaced with this version.
     * @public
     * @requiredField collection
     * @requiredField collection._id
     * @requiredField collection.fields.key
     * @requiredField collection.fields.type
     * @requiredField collection.permissions.insert
     * @requiredField collection.permissions.read
     * @requiredField collection.permissions.remove
     * @requiredField collection.permissions.update
     * @requiredField collection.revision
     * @param options - Options for updating a data collection.
     * @permissionScope Manage Data Collections
     * @permissionScopeId SCOPE.DC-DATA.DATA-COLLECTIONS-MANAGE
     * @applicableIdentity APP
     * @adminMethod
     * @returns Updated collection details.
     */
    function updateDataCollection(collection: DataCollection): Promise<DataCollection>;
    /**
     * Deletes a data collection.
     *
     * > **Note:**
     * > Once a collection is deleted, it can't be restored.
     * @param dataCollectionId - ID of the collection to delete.
     * @public
     * @requiredField dataCollectionId
     * @permissionScope Manage Data Collections
     * @permissionScopeId SCOPE.DC-DATA.DATA-COLLECTIONS-MANAGE
     * @applicableIdentity APP
     * @adminMethod
     */
    function deleteDataCollection(dataCollectionId: string): Promise<void>;
    interface CreateDataCollectionFieldOptions {
        /** field to create */
        field: Field;
    }
    interface UpdateDataCollectionFieldOptions {
        /** Field to update */
        field: Field;
    }
    interface DeleteDataCollectionFieldOptions {
        /** Field key to delete */
        fieldKey: string;
    }
    type dataV2DataCollectionCollections_universal_d_DataCollection = DataCollection;
    type dataV2DataCollectionCollections_universal_d_CollectionType = CollectionType;
    const dataV2DataCollectionCollections_universal_d_CollectionType: typeof CollectionType;
    type dataV2DataCollectionCollections_universal_d_Sort = Sort;
    type dataV2DataCollectionCollections_universal_d_Direction = Direction;
    const dataV2DataCollectionCollections_universal_d_Direction: typeof Direction;
    type dataV2DataCollectionCollections_universal_d_CollectionCapabilities = CollectionCapabilities;
    type dataV2DataCollectionCollections_universal_d_DataOperation = DataOperation;
    const dataV2DataCollectionCollections_universal_d_DataOperation: typeof DataOperation;
    type dataV2DataCollectionCollections_universal_d_CollectionOperation = CollectionOperation;
    const dataV2DataCollectionCollections_universal_d_CollectionOperation: typeof CollectionOperation;
    type dataV2DataCollectionCollections_universal_d_IndexLimits = IndexLimits;
    type dataV2DataCollectionCollections_universal_d_Field = Field;
    type dataV2DataCollectionCollections_universal_d_FieldRangeValidationsOneOf = FieldRangeValidationsOneOf;
    type dataV2DataCollectionCollections_universal_d_Type = Type;
    const dataV2DataCollectionCollections_universal_d_Type: typeof Type;
    type dataV2DataCollectionCollections_universal_d_TypeMetadata = TypeMetadata;
    type dataV2DataCollectionCollections_universal_d_TypeMetadataMetadataOneOf = TypeMetadataMetadataOneOf;
    type dataV2DataCollectionCollections_universal_d_FieldCapabilities = FieldCapabilities;
    type dataV2DataCollectionCollections_universal_d_QueryOperator = QueryOperator;
    const dataV2DataCollectionCollections_universal_d_QueryOperator: typeof QueryOperator;
    type dataV2DataCollectionCollections_universal_d_ObjectField = ObjectField;
    type dataV2DataCollectionCollections_universal_d_FieldsPattern = FieldsPattern;
    type dataV2DataCollectionCollections_universal_d_UrlizedOnlyPattern = UrlizedOnlyPattern;
    type dataV2DataCollectionCollections_universal_d_Calculator = Calculator;
    type dataV2DataCollectionCollections_universal_d_CalculatorPatternOneOf = CalculatorPatternOneOf;
    type dataV2DataCollectionCollections_universal_d_Reference = Reference;
    type dataV2DataCollectionCollections_universal_d_MultiReference = MultiReference;
    type dataV2DataCollectionCollections_universal_d__Object = _Object;
    type dataV2DataCollectionCollections_universal_d__Array = _Array;
    type dataV2DataCollectionCollections_universal_d_PageLink = PageLink;
    type dataV2DataCollectionCollections_universal_d_NumberRange = NumberRange;
    type dataV2DataCollectionCollections_universal_d_StringLengthRange = StringLengthRange;
    type dataV2DataCollectionCollections_universal_d_ArraySizeRange = ArraySizeRange;
    type dataV2DataCollectionCollections_universal_d_FieldPlugin = FieldPlugin;
    type dataV2DataCollectionCollections_universal_d_FieldPluginOptionsOneOf = FieldPluginOptionsOneOf;
    type dataV2DataCollectionCollections_universal_d_FieldPluginType = FieldPluginType;
    const dataV2DataCollectionCollections_universal_d_FieldPluginType: typeof FieldPluginType;
    type dataV2DataCollectionCollections_universal_d_CmsOptions = CmsOptions;
    type dataV2DataCollectionCollections_universal_d_Permissions = Permissions;
    type dataV2DataCollectionCollections_universal_d_Role = Role;
    const dataV2DataCollectionCollections_universal_d_Role: typeof Role;
    type dataV2DataCollectionCollections_universal_d_Plugin = Plugin;
    type dataV2DataCollectionCollections_universal_d_PluginOptionsOneOf = PluginOptionsOneOf;
    type dataV2DataCollectionCollections_universal_d_Status = Status;
    const dataV2DataCollectionCollections_universal_d_Status: typeof Status;
    type dataV2DataCollectionCollections_universal_d_Format = Format;
    const dataV2DataCollectionCollections_universal_d_Format: typeof Format;
    type dataV2DataCollectionCollections_universal_d_SiteSort = SiteSort;
    type dataV2DataCollectionCollections_universal_d_PluginType = PluginType;
    const dataV2DataCollectionCollections_universal_d_PluginType: typeof PluginType;
    type dataV2DataCollectionCollections_universal_d_PublishPluginOptions = PublishPluginOptions;
    type dataV2DataCollectionCollections_universal_d_SingleItemPluginOptions = SingleItemPluginOptions;
    type dataV2DataCollectionCollections_universal_d_UrlizedPluginOptions = UrlizedPluginOptions;
    type dataV2DataCollectionCollections_universal_d_MultilingualOptions = MultilingualOptions;
    type dataV2DataCollectionCollections_universal_d_PageLinkPluginOptions = PageLinkPluginOptions;
    type dataV2DataCollectionCollections_universal_d_PluginCmsOptions = PluginCmsOptions;
    type dataV2DataCollectionCollections_universal_d_PagingMode = PagingMode;
    const dataV2DataCollectionCollections_universal_d_PagingMode: typeof PagingMode;
    type dataV2DataCollectionCollections_universal_d_DataCollectionClonedEvent = DataCollectionClonedEvent;
    type dataV2DataCollectionCollections_universal_d_DataCollectionChangedEvent = DataCollectionChangedEvent;
    type dataV2DataCollectionCollections_universal_d_FieldUpdate = FieldUpdate;
    type dataV2DataCollectionCollections_universal_d_PluginUpdate = PluginUpdate;
    type dataV2DataCollectionCollections_universal_d_CreateDataCollectionRequest = CreateDataCollectionRequest;
    type dataV2DataCollectionCollections_universal_d_CreateDataCollectionResponse = CreateDataCollectionResponse;
    type dataV2DataCollectionCollections_universal_d_GetDataCollectionRequest = GetDataCollectionRequest;
    type dataV2DataCollectionCollections_universal_d_GetDataCollectionResponse = GetDataCollectionResponse;
    type dataV2DataCollectionCollections_universal_d_ListDataCollectionsRequest = ListDataCollectionsRequest;
    type dataV2DataCollectionCollections_universal_d_Sorting = Sorting;
    type dataV2DataCollectionCollections_universal_d_SortOrder = SortOrder;
    const dataV2DataCollectionCollections_universal_d_SortOrder: typeof SortOrder;
    type dataV2DataCollectionCollections_universal_d_ListDataCollectionsResponse = ListDataCollectionsResponse;
    type dataV2DataCollectionCollections_universal_d_PagingMetadataV2 = PagingMetadataV2;
    type dataV2DataCollectionCollections_universal_d_BulkGetDataCollectionsRequest = BulkGetDataCollectionsRequest;
    type dataV2DataCollectionCollections_universal_d_BulkGetDataCollectionsResponse = BulkGetDataCollectionsResponse;
    type dataV2DataCollectionCollections_universal_d_UpdateDataCollectionRequest = UpdateDataCollectionRequest;
    type dataV2DataCollectionCollections_universal_d_UpdateDataCollectionResponse = UpdateDataCollectionResponse;
    type dataV2DataCollectionCollections_universal_d_DeleteDataCollectionRequest = DeleteDataCollectionRequest;
    type dataV2DataCollectionCollections_universal_d_DeleteDataCollectionResponse = DeleteDataCollectionResponse;
    type dataV2DataCollectionCollections_universal_d_CreateDataCollectionFieldRequest = CreateDataCollectionFieldRequest;
    type dataV2DataCollectionCollections_universal_d_CreateDataCollectionFieldResponse = CreateDataCollectionFieldResponse;
    type dataV2DataCollectionCollections_universal_d_UpdateDataCollectionFieldRequest = UpdateDataCollectionFieldRequest;
    type dataV2DataCollectionCollections_universal_d_UpdateDataCollectionFieldResponse = UpdateDataCollectionFieldResponse;
    type dataV2DataCollectionCollections_universal_d_DeleteDataCollectionFieldRequest = DeleteDataCollectionFieldRequest;
    type dataV2DataCollectionCollections_universal_d_DeleteDataCollectionFieldResponse = DeleteDataCollectionFieldResponse;
    type dataV2DataCollectionCollections_universal_d_BulkGetDataCollectionsPageBySnapshotsRequest = BulkGetDataCollectionsPageBySnapshotsRequest;
    type dataV2DataCollectionCollections_universal_d_BulkGetDataCollectionsPageBySnapshotsResponse = BulkGetDataCollectionsPageBySnapshotsResponse;
    type dataV2DataCollectionCollections_universal_d_SnapshotCollection = SnapshotCollection;
    type dataV2DataCollectionCollections_universal_d_Index = Index;
    type dataV2DataCollectionCollections_universal_d_Order = Order;
    const dataV2DataCollectionCollections_universal_d_Order: typeof Order;
    type dataV2DataCollectionCollections_universal_d_IndexField = IndexField;
    type dataV2DataCollectionCollections_universal_d_IndexStatus = IndexStatus;
    const dataV2DataCollectionCollections_universal_d_IndexStatus: typeof IndexStatus;
    type dataV2DataCollectionCollections_universal_d_Failure = Failure;
    type dataV2DataCollectionCollections_universal_d_CreateDataCollectionsSnapshotRequest = CreateDataCollectionsSnapshotRequest;
    type dataV2DataCollectionCollections_universal_d_CreateDataCollectionsSnapshotResponse = CreateDataCollectionsSnapshotResponse;
    type dataV2DataCollectionCollections_universal_d_RestoreDataCollectionsFromSnapshotRequest = RestoreDataCollectionsFromSnapshotRequest;
    type dataV2DataCollectionCollections_universal_d_RestoreDataCollectionsFromSnapshotResponse = RestoreDataCollectionsFromSnapshotResponse;
    type dataV2DataCollectionCollections_universal_d_DeleteDataCollectionsSnapshotRequest = DeleteDataCollectionsSnapshotRequest;
    type dataV2DataCollectionCollections_universal_d_DeleteDataCollectionsSnapshotResponse = DeleteDataCollectionsSnapshotResponse;
    const dataV2DataCollectionCollections_universal_d_createDataCollection: typeof createDataCollection;
    const dataV2DataCollectionCollections_universal_d_getDataCollection: typeof getDataCollection;
    type dataV2DataCollectionCollections_universal_d_GetDataCollectionOptions = GetDataCollectionOptions;
    const dataV2DataCollectionCollections_universal_d_listDataCollections: typeof listDataCollections;
    type dataV2DataCollectionCollections_universal_d_ListDataCollectionsOptions = ListDataCollectionsOptions;
    type dataV2DataCollectionCollections_universal_d_BulkGetDataCollectionsOptions = BulkGetDataCollectionsOptions;
    const dataV2DataCollectionCollections_universal_d_updateDataCollection: typeof updateDataCollection;
    const dataV2DataCollectionCollections_universal_d_deleteDataCollection: typeof deleteDataCollection;
    type dataV2DataCollectionCollections_universal_d_CreateDataCollectionFieldOptions = CreateDataCollectionFieldOptions;
    type dataV2DataCollectionCollections_universal_d_UpdateDataCollectionFieldOptions = UpdateDataCollectionFieldOptions;
    type dataV2DataCollectionCollections_universal_d_DeleteDataCollectionFieldOptions = DeleteDataCollectionFieldOptions;
    namespace dataV2DataCollectionCollections_universal_d {
        export { dataV2DataCollectionCollections_universal_d_DataCollection as DataCollection, dataV2DataCollectionCollections_universal_d_CollectionType as CollectionType, dataV2DataCollectionCollections_universal_d_Sort as Sort, dataV2DataCollectionCollections_universal_d_Direction as Direction, dataV2DataCollectionCollections_universal_d_CollectionCapabilities as CollectionCapabilities, dataV2DataCollectionCollections_universal_d_DataOperation as DataOperation, dataV2DataCollectionCollections_universal_d_CollectionOperation as CollectionOperation, dataV2DataCollectionCollections_universal_d_IndexLimits as IndexLimits, dataV2DataCollectionCollections_universal_d_Field as Field, dataV2DataCollectionCollections_universal_d_FieldRangeValidationsOneOf as FieldRangeValidationsOneOf, dataV2DataCollectionCollections_universal_d_Type as Type, dataV2DataCollectionCollections_universal_d_TypeMetadata as TypeMetadata, dataV2DataCollectionCollections_universal_d_TypeMetadataMetadataOneOf as TypeMetadataMetadataOneOf, dataV2DataCollectionCollections_universal_d_FieldCapabilities as FieldCapabilities, dataV2DataCollectionCollections_universal_d_QueryOperator as QueryOperator, dataV2DataCollectionCollections_universal_d_ObjectField as ObjectField, dataV2DataCollectionCollections_universal_d_FieldsPattern as FieldsPattern, dataV2DataCollectionCollections_universal_d_UrlizedOnlyPattern as UrlizedOnlyPattern, dataV2DataCollectionCollections_universal_d_Calculator as Calculator, dataV2DataCollectionCollections_universal_d_CalculatorPatternOneOf as CalculatorPatternOneOf, dataV2DataCollectionCollections_universal_d_Reference as Reference, dataV2DataCollectionCollections_universal_d_MultiReference as MultiReference, dataV2DataCollectionCollections_universal_d__Object as _Object, dataV2DataCollectionCollections_universal_d__Array as _Array, dataV2DataCollectionCollections_universal_d_PageLink as PageLink, dataV2DataCollectionCollections_universal_d_NumberRange as NumberRange, dataV2DataCollectionCollections_universal_d_StringLengthRange as StringLengthRange, dataV2DataCollectionCollections_universal_d_ArraySizeRange as ArraySizeRange, dataV2DataCollectionCollections_universal_d_FieldPlugin as FieldPlugin, dataV2DataCollectionCollections_universal_d_FieldPluginOptionsOneOf as FieldPluginOptionsOneOf, dataV2DataCollectionCollections_universal_d_FieldPluginType as FieldPluginType, dataV2DataCollectionCollections_universal_d_CmsOptions as CmsOptions, dataV2DataCollectionCollections_universal_d_Permissions as Permissions, dataV2DataCollectionCollections_universal_d_Role as Role, dataV2DataCollectionCollections_universal_d_Plugin as Plugin, dataV2DataCollectionCollections_universal_d_PluginOptionsOneOf as PluginOptionsOneOf, dataV2DataCollectionCollections_universal_d_Status as Status, dataV2DataCollectionCollections_universal_d_Format as Format, dataV2DataCollectionCollections_universal_d_SiteSort as SiteSort, dataV2DataCollectionCollections_universal_d_PluginType as PluginType, dataV2DataCollectionCollections_universal_d_PublishPluginOptions as PublishPluginOptions, dataV2DataCollectionCollections_universal_d_SingleItemPluginOptions as SingleItemPluginOptions, dataV2DataCollectionCollections_universal_d_UrlizedPluginOptions as UrlizedPluginOptions, dataV2DataCollectionCollections_universal_d_MultilingualOptions as MultilingualOptions, dataV2DataCollectionCollections_universal_d_PageLinkPluginOptions as PageLinkPluginOptions, dataV2DataCollectionCollections_universal_d_PluginCmsOptions as PluginCmsOptions, dataV2DataCollectionCollections_universal_d_PagingMode as PagingMode, dataV2DataCollectionCollections_universal_d_DataCollectionClonedEvent as DataCollectionClonedEvent, dataV2DataCollectionCollections_universal_d_DataCollectionChangedEvent as DataCollectionChangedEvent, dataV2DataCollectionCollections_universal_d_FieldUpdate as FieldUpdate, dataV2DataCollectionCollections_universal_d_PluginUpdate as PluginUpdate, dataV2DataCollectionCollections_universal_d_CreateDataCollectionRequest as CreateDataCollectionRequest, dataV2DataCollectionCollections_universal_d_CreateDataCollectionResponse as CreateDataCollectionResponse, dataV2DataCollectionCollections_universal_d_GetDataCollectionRequest as GetDataCollectionRequest, dataV2DataCollectionCollections_universal_d_GetDataCollectionResponse as GetDataCollectionResponse, dataV2DataCollectionCollections_universal_d_ListDataCollectionsRequest as ListDataCollectionsRequest, dataV2DataCollectionCollections_universal_d_Sorting as Sorting, dataV2DataCollectionCollections_universal_d_SortOrder as SortOrder, Paging$1 as Paging, dataV2DataCollectionCollections_universal_d_ListDataCollectionsResponse as ListDataCollectionsResponse, dataV2DataCollectionCollections_universal_d_PagingMetadataV2 as PagingMetadataV2, dataV2DataCollectionCollections_universal_d_BulkGetDataCollectionsRequest as BulkGetDataCollectionsRequest, dataV2DataCollectionCollections_universal_d_BulkGetDataCollectionsResponse as BulkGetDataCollectionsResponse, dataV2DataCollectionCollections_universal_d_UpdateDataCollectionRequest as UpdateDataCollectionRequest, dataV2DataCollectionCollections_universal_d_UpdateDataCollectionResponse as UpdateDataCollectionResponse, dataV2DataCollectionCollections_universal_d_DeleteDataCollectionRequest as DeleteDataCollectionRequest, dataV2DataCollectionCollections_universal_d_DeleteDataCollectionResponse as DeleteDataCollectionResponse, dataV2DataCollectionCollections_universal_d_CreateDataCollectionFieldRequest as CreateDataCollectionFieldRequest, dataV2DataCollectionCollections_universal_d_CreateDataCollectionFieldResponse as CreateDataCollectionFieldResponse, dataV2DataCollectionCollections_universal_d_UpdateDataCollectionFieldRequest as UpdateDataCollectionFieldRequest, dataV2DataCollectionCollections_universal_d_UpdateDataCollectionFieldResponse as UpdateDataCollectionFieldResponse, dataV2DataCollectionCollections_universal_d_DeleteDataCollectionFieldRequest as DeleteDataCollectionFieldRequest, dataV2DataCollectionCollections_universal_d_DeleteDataCollectionFieldResponse as DeleteDataCollectionFieldResponse, dataV2DataCollectionCollections_universal_d_BulkGetDataCollectionsPageBySnapshotsRequest as BulkGetDataCollectionsPageBySnapshotsRequest, dataV2DataCollectionCollections_universal_d_BulkGetDataCollectionsPageBySnapshotsResponse as BulkGetDataCollectionsPageBySnapshotsResponse, dataV2DataCollectionCollections_universal_d_SnapshotCollection as SnapshotCollection, dataV2DataCollectionCollections_universal_d_Index as Index, dataV2DataCollectionCollections_universal_d_Order as Order, dataV2DataCollectionCollections_universal_d_IndexField as IndexField, dataV2DataCollectionCollections_universal_d_IndexStatus as IndexStatus, dataV2DataCollectionCollections_universal_d_Failure as Failure, dataV2DataCollectionCollections_universal_d_CreateDataCollectionsSnapshotRequest as CreateDataCollectionsSnapshotRequest, dataV2DataCollectionCollections_universal_d_CreateDataCollectionsSnapshotResponse as CreateDataCollectionsSnapshotResponse, dataV2DataCollectionCollections_universal_d_RestoreDataCollectionsFromSnapshotRequest as RestoreDataCollectionsFromSnapshotRequest, dataV2DataCollectionCollections_universal_d_RestoreDataCollectionsFromSnapshotResponse as RestoreDataCollectionsFromSnapshotResponse, dataV2DataCollectionCollections_universal_d_DeleteDataCollectionsSnapshotRequest as DeleteDataCollectionsSnapshotRequest, dataV2DataCollectionCollections_universal_d_DeleteDataCollectionsSnapshotResponse as DeleteDataCollectionsSnapshotResponse, DomainEvent$1 as DomainEvent, DomainEventBodyOneOf$1 as DomainEventBodyOneOf, EntityCreatedEvent$1 as EntityCreatedEvent, EntityUpdatedEvent$1 as EntityUpdatedEvent, EntityDeletedEvent$1 as EntityDeletedEvent, ActionEvent$1 as ActionEvent, MessageEnvelope$1 as MessageEnvelope, IdentificationData$1 as IdentificationData, IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf, WebhookIdentityType$1 as WebhookIdentityType, dataV2DataCollectionCollections_universal_d_createDataCollection as createDataCollection, dataV2DataCollectionCollections_universal_d_getDataCollection as getDataCollection, dataV2DataCollectionCollections_universal_d_GetDataCollectionOptions as GetDataCollectionOptions, dataV2DataCollectionCollections_universal_d_listDataCollections as listDataCollections, dataV2DataCollectionCollections_universal_d_ListDataCollectionsOptions as ListDataCollectionsOptions, dataV2DataCollectionCollections_universal_d_BulkGetDataCollectionsOptions as BulkGetDataCollectionsOptions, dataV2DataCollectionCollections_universal_d_updateDataCollection as updateDataCollection, dataV2DataCollectionCollections_universal_d_deleteDataCollection as deleteDataCollection, dataV2DataCollectionCollections_universal_d_CreateDataCollectionFieldOptions as CreateDataCollectionFieldOptions, dataV2DataCollectionCollections_universal_d_UpdateDataCollectionFieldOptions as UpdateDataCollectionFieldOptions, dataV2DataCollectionCollections_universal_d_DeleteDataCollectionFieldOptions as DeleteDataCollectionFieldOptions, };
    }
    /** An external database connection defines a connection between an external database and a Wix site. */
    interface ExternalDatabaseConnection {
        /**
         * Name of the external database connection.
         *
         * An external database connection can connect to one or more external data collections or tables. These appear as `connectionName/dataCollectionId`.
         */
        name?: string;
        /** Base URL for accessing and managing data in the external database. For example: `https://example.com/my-external-database`. */
        endpoint?: string | null;
        /**
         * Settings specified to the external database connection as part of each request.
         *
         * These settings can relate to authentication, tenancy, or provide any other information necessary for processing a request. Their content and structure depend on the specific requirements of the external database's API.
         */
        configuration?: Record<string, any> | null;
        /**
         * Status of the external database connection. Includes whether the connection was established successfully, and if not, the reason for the failure.
         * @readonly
         */
        connectionStatus?: ConnectionStatus;
        /**
         * Public key used to validate requests to the external database.
         * @readonly
         */
        publicKey?: string | null;
        /**
         * Capabilities of the external database.
         * @readonly
         */
        capabilities?: Capabilities;
    }
    enum CauseOfFailure {
        /** No connection failure. */
        NONE = "NONE",
        /** General communication failure. */
        COMMUNICATION_FAILURE = "COMMUNICATION_FAILURE",
        /** External database host is unreachable. */
        DESTINATION_HOST_UNREACHABLE = "DESTINATION_HOST_UNREACHABLE",
        /** Unauthorized to access the external database. */
        UNAUTHORIZED = "UNAUTHORIZED",
        /** `endpoint` is not set. */
        DESTINATION_ENDPOINT_NOT_DEFINED = "DESTINATION_ENDPOINT_NOT_DEFINED"
    }
    enum CollectionsFound {
        /** Attempt to connect to the external database failed, so status is unknown. */
        UNKNOWN = "UNKNOWN",
        /** External database has collections. */
        YES = "YES",
        /** External database does not have any collections. */
        NO = "NO"
    }
    enum FieldType {
        UNKNOWN_FIELD_TYPE = "UNKNOWN_FIELD_TYPE",
        TEXT = "TEXT",
        NUMBER = "NUMBER",
        DATE = "DATE",
        DATETIME = "DATETIME",
        IMAGE = "IMAGE",
        BOOLEAN = "BOOLEAN",
        DOCUMENT = "DOCUMENT",
        URL = "URL",
        RICH_TEXT = "RICH_TEXT",
        VIDEO = "VIDEO",
        ANY = "ANY",
        ARRAY_STRING = "ARRAY_STRING",
        ARRAY_DOCUMENT = "ARRAY_DOCUMENT",
        AUDIO = "AUDIO",
        TIME = "TIME",
        LANGUAGE = "LANGUAGE",
        RICH_CONTENT = "RICH_CONTENT",
        MEDIA_GALLERY = "MEDIA_GALLERY",
        ADDRESS = "ADDRESS",
        PAGE_LINK = "PAGE_LINK",
        REFERENCE = "REFERENCE",
        MULTI_REFERENCE = "MULTI_REFERENCE",
        OBJECT = "OBJECT",
        ARRAY = "ARRAY",
        /** Deprecated - can’t be added to collections. Can only appear in older collections. */
        LEGACY_TIME = "LEGACY_TIME",
        /** Deprecated - can’t be added to collections. Can only appear in older collections. */
        LEGACY_BOOK = "LEGACY_BOOK",
        /** Deprecated - can’t be added to collections. Can only appear in older collections. */
        LEGACY_EXTERNAL_URL = "LEGACY_EXTERNAL_URL",
        /** Deprecated - can’t be added to collections. Can only appear in older collections. */
        LEGACY_BROKEN_REFERENCE = "LEGACY_BROKEN_REFERENCE",
        /** Deprecated - can’t be added to collections. Can only appear in older collections. */
        LEGACY_IMAGE = "LEGACY_IMAGE",
        /** Deprecated - can’t be added to collections. Can only appear in older collections. */
        LEGACY_COLOR = "LEGACY_COLOR",
        /** Deprecated - can’t be added to collections. Can only appear in older collections. */
        LEGACY_EXTERNAL_VIDEO = "LEGACY_EXTERNAL_VIDEO"
    }
    interface ConnectionStatus {
        /** Whether the connection was established successfully. */
        successful?: boolean;
        /** Whether and why the connection attempt failed. */
        causeOfFailure?: CauseOfFailure;
        /**
         * Whether the external database has collections.
         * @readonly
         */
        hasCollections?: CollectionsFound;
    }
    enum ProtocolVersion {
        UNKNOWN_PROTOCOL_VERSION = "UNKNOWN_PROTOCOL_VERSION",
        V1 = "V1",
        V2 = "V2",
        V3 = "V3"
    }
    interface Capabilities {
        /** Whether the external database supports creating new collections, updating the structure of existing collections, or deleting them. */
        collectionModificationsSupported?: boolean;
        /** Field types the external database supports. Applies only when `collectionModificationsSupported` is set to `true`. */
        fieldTypes?: FieldType[];
    }
    interface GetExternalDatabaseConnectionRequest {
        /** Name of the external database connection to retrieve. */
        name: string;
    }
    interface GetExternalDatabaseConnectionResponse {
        /** Details of the retrieved external database connection. */
        externalDatabaseConnection?: ExternalDatabaseConnection;
    }
    interface ListExternalDatabaseConnectionsRequest {
        /** Paging metadata. */
        paging?: Paging;
    }
    interface Paging {
        /** Number of items to load. */
        limit?: number | null;
        /** Number of items to skip in the current sort order. */
        offset?: number | null;
    }
    interface ListExternalDatabaseConnectionsResponse {
        /** List of external database connections. */
        externalDatabaseConnections?: ExternalDatabaseConnection[];
        /** Paging metadata. */
        pagingMetadata?: PagingMetadata;
    }
    interface PagingMetadata {
        /** Number of items returned in the response. */
        count?: number | null;
        /** Offset that was requested. */
        offset?: number | null;
        /** Total number of items that match the query. */
        total?: number | null;
        /** Flag that indicates the server failed to calculate the `total` field. */
        tooManyToCount?: boolean | null;
    }
    interface CreateExternalDatabaseConnectionRequest {
        /** External database connection details. */
        externalDatabaseConnection: ExternalDatabaseConnection;
        /**
         * Connection type. The connection type determines the type of adaptor by which the external collection is integrated with the site.
         *
         * Learn more about [external database adaptors](https://dev.wix.com/docs/rest/business-solutions/cms/external-database-connection/introduction#about-external-database-adaptors).
         */
        connectionType: ConnectionType;
    }
    enum ConnectionType {
        /** Unknown connection type. */
        UNKNOWN_CONNECTION_TYPE = "UNKNOWN_CONNECTION_TYPE",
        /** External database connection based on the legacy [external database collection service plugin](https://dev.wix.com/docs/velo/api-reference/wix-data-v2/service-plugins-spis/external-database-collection-legacy/introduction). */
        STANDALONE = "STANDALONE",
        /** External database connection based on the [external database service plugin](https://dev.wix.com/docs/rest/business-solutions/cms/service-plugins/external-database-service-plugin/introduction). */
        WIX_SERVICE_PLUGIN = "WIX_SERVICE_PLUGIN"
    }
    interface CreateExternalDatabaseConnectionResponse {
        /** Details of the created external database connection. */
        externalDatabaseConnection?: ExternalDatabaseConnection;
    }
    interface UpdateExternalDatabaseConnectionRequest {
        /** Updated external database connection. The existing connection is replaced with this version. */
        externalDatabaseConnection: ExternalDatabaseConnection;
    }
    interface UpdateExternalDatabaseConnectionResponse {
        /** Details of the updated external database connection. */
        externalDatabaseConnection?: ExternalDatabaseConnection;
    }
    interface DeleteExternalDatabaseConnectionRequest {
        /** Name of the external database connection to delete. */
        name: string;
    }
    interface DeleteExternalDatabaseConnectionResponse {
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
    }
    interface EntityDeletedEvent {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
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
     * Retrieves the specified external database connection.
     * @param name - Name of the external database connection to retrieve.
     * @public
     * @requiredField name
     * @permissionId WIX_DATA.GET_EXTERNAL_DATABASE_CONNECTION
     * @permissionScope Manage External Database Connections
     * @permissionScopeId SCOPE.DC-DATA.EXTERNAL-DATABASE-CONNECTIONS-MANAGE
     * @permissionScope Manage All Data Resources
     * @permissionScopeId SCOPE.DC-DATA.MANAGE-ALL
     * @applicableIdentity APP
     * @adminMethod
     * @returns Details of the retrieved external database connection.
     * @fqn com.wixpress.cloud.data.api.externaldatabase.ExternalDatabaseConnectionService.GetExternalDatabaseConnection
     */
    function getExternalDatabaseConnection(name: string): Promise<ExternalDatabaseConnection>;
    /**
     * Lists the site's external database connections.
     *
     * > **Note**: The method lists both [adaptor types](https://dev.wix.com/docs/rest/business-solutions/cms/external-database-connection/introduction#about-external-database-adaptors).
     * @public
     * @permissionId WIX_DATA.LIST_EXTERNAL_DATABASE_CONNECTIONS
     * @permissionScope Manage External Database Connections
     * @permissionScopeId SCOPE.DC-DATA.EXTERNAL-DATABASE-CONNECTIONS-MANAGE
     * @permissionScope Manage All Data Resources
     * @permissionScopeId SCOPE.DC-DATA.MANAGE-ALL
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.cloud.data.api.externaldatabase.ExternalDatabaseConnectionService.ListExternalDatabaseConnections
     */
    function listExternalDatabaseConnections(options?: ListExternalDatabaseConnectionsOptions): Promise<ListExternalDatabaseConnectionsResponse>;
    interface ListExternalDatabaseConnectionsOptions {
        /** Paging metadata. */
        paging?: Paging;
    }
    /**
     * Creates a new external database connection.
     *
     * The `externalDatabaseConnection` parameter must include a `name`, `endpoint`, and `configuration` details for the external database.
     * If any of these are missing, the external database connection isn't created.
     * @param externalDatabaseConnection - External database connection details.
     * @param connectionType - Connection type. The connection type determines the type of adaptor by which the external collection is integrated with the site.
     *
     * Learn more about [external database adaptors](https://dev.wix.com/docs/rest/business-solutions/cms/external-database-connection/introduction#about-external-database-adaptors).
     * @public
     * @requiredField connectionType
     * @requiredField externalDatabaseConnection
     * @requiredField externalDatabaseConnection.name
     * @param options - Options for creating an external database connection.
     * @permissionId WIX_DATA.CREATE_EXTERNAL_DATABASE_CONNECTION
     * @permissionScope Manage External Database Connections
     * @permissionScopeId SCOPE.DC-DATA.EXTERNAL-DATABASE-CONNECTIONS-MANAGE
     * @permissionScope Manage All Data Resources
     * @permissionScopeId SCOPE.DC-DATA.MANAGE-ALL
     * @applicableIdentity APP
     * @adminMethod
     * @returns Details of the created external database connection.
     * @fqn com.wixpress.cloud.data.api.externaldatabase.ExternalDatabaseConnectionService.CreateExternalDatabaseConnection
     */
    function createExternalDatabaseConnection(externalDatabaseConnection: ExternalDatabaseConnection, connectionType: ConnectionType, options?: CreateExternalDatabaseConnectionOptions): Promise<ExternalDatabaseConnection>;
    interface CreateExternalDatabaseConnectionOptions {
    }
    /**
     * Updates an external database connection.
     *
     * An external database collection name must be provided in `name`.
     * If an existing external database connection is found with the same name, that connection's details are updated.
     * If no external database connection has that name, the request fails.
     *
     * > **Note:** After an external database connection is updated, it only contains the values provided in the request. All previous values are lost.
     * @param name - Name of the external database connection.
     *
     * An external database connection can connect to one or more external data collections or tables. These appear as `connectionName/dataCollectionId`.
     * @public
     * @requiredField externalDatabaseConnection
     * @requiredField name
     * @param options - Options for updating an external database connection.
     * @param externalDatabaseConnection - Updated external database connection details. The existing connection is replaced with this version.
     * @permissionId WIX_DATA.UPDATE_EXTERNAL_DATABASE_CONNECTION
     * @permissionScope Manage External Database Connections
     * @permissionScopeId SCOPE.DC-DATA.EXTERNAL-DATABASE-CONNECTIONS-MANAGE
     * @permissionScope Manage All Data Resources
     * @permissionScopeId SCOPE.DC-DATA.MANAGE-ALL
     * @applicableIdentity APP
     * @adminMethod
     * @returns Details of the updated external database connection.
     * @fqn com.wixpress.cloud.data.api.externaldatabase.ExternalDatabaseConnectionService.UpdateExternalDatabaseConnection
     */
    function updateExternalDatabaseConnection(name: string, externalDatabaseConnection: UpdateExternalDatabaseConnection): Promise<ExternalDatabaseConnection>;
    interface UpdateExternalDatabaseConnection {
        /** Base URL for accessing and managing data in the external database. For example: `https://example.com/my-external-database`. */
        endpoint?: string | null;
        /**
         * Settings specified to the external database connection as part of each request.
         *
         * These settings can relate to authentication, tenancy, or provide any other information necessary for processing a request. Their content and structure depend on the specific requirements of the external database's API.
         */
        configuration?: Record<string, any> | null;
        /**
         * Status of the external database connection. Includes whether the connection was established successfully, and if not, the reason for the failure.
         * @readonly
         */
        connectionStatus?: ConnectionStatus;
        /**
         * Public key used to validate requests to the external database.
         * @readonly
         */
        publicKey?: string | null;
        /**
         * Capabilities of the external database.
         * @readonly
         */
        capabilities?: Capabilities;
    }
    /**
     * Deletes an external database connection.
     *
     * > **Note:** Once an external database connection is deleted, it can't be restored. To reconnect the database you need to create a new external database connection.
     * @param name - Name of the external database connection to delete.
     * @public
     * @requiredField name
     * @permissionId WIX_DATA.DELETE_EXTERNAL_DATABASE_CONNECTION
     * @permissionScope Manage External Database Connections
     * @permissionScopeId SCOPE.DC-DATA.EXTERNAL-DATABASE-CONNECTIONS-MANAGE
     * @permissionScope Manage All Data Resources
     * @permissionScopeId SCOPE.DC-DATA.MANAGE-ALL
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.cloud.data.api.externaldatabase.ExternalDatabaseConnectionService.DeleteExternalDatabaseConnection
     */
    function deleteExternalDatabaseConnection(name: string): Promise<void>;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ExternalDatabaseConnection = ExternalDatabaseConnection;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_CauseOfFailure = CauseOfFailure;
    const dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_CauseOfFailure: typeof CauseOfFailure;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_CollectionsFound = CollectionsFound;
    const dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_CollectionsFound: typeof CollectionsFound;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_FieldType = FieldType;
    const dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_FieldType: typeof FieldType;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ConnectionStatus = ConnectionStatus;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ProtocolVersion = ProtocolVersion;
    const dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ProtocolVersion: typeof ProtocolVersion;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_Capabilities = Capabilities;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_GetExternalDatabaseConnectionRequest = GetExternalDatabaseConnectionRequest;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_GetExternalDatabaseConnectionResponse = GetExternalDatabaseConnectionResponse;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ListExternalDatabaseConnectionsRequest = ListExternalDatabaseConnectionsRequest;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_Paging = Paging;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ListExternalDatabaseConnectionsResponse = ListExternalDatabaseConnectionsResponse;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_PagingMetadata = PagingMetadata;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_CreateExternalDatabaseConnectionRequest = CreateExternalDatabaseConnectionRequest;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ConnectionType = ConnectionType;
    const dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ConnectionType: typeof ConnectionType;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_CreateExternalDatabaseConnectionResponse = CreateExternalDatabaseConnectionResponse;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_UpdateExternalDatabaseConnectionRequest = UpdateExternalDatabaseConnectionRequest;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_UpdateExternalDatabaseConnectionResponse = UpdateExternalDatabaseConnectionResponse;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_DeleteExternalDatabaseConnectionRequest = DeleteExternalDatabaseConnectionRequest;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_DeleteExternalDatabaseConnectionResponse = DeleteExternalDatabaseConnectionResponse;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_DomainEvent = DomainEvent;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_EntityCreatedEvent = EntityCreatedEvent;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_RestoreInfo = RestoreInfo;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_EntityDeletedEvent = EntityDeletedEvent;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ActionEvent = ActionEvent;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_MessageEnvelope = MessageEnvelope;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_IdentificationData = IdentificationData;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_WebhookIdentityType = WebhookIdentityType;
    const dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
    const dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_getExternalDatabaseConnection: typeof getExternalDatabaseConnection;
    const dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_listExternalDatabaseConnections: typeof listExternalDatabaseConnections;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ListExternalDatabaseConnectionsOptions = ListExternalDatabaseConnectionsOptions;
    const dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_createExternalDatabaseConnection: typeof createExternalDatabaseConnection;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_CreateExternalDatabaseConnectionOptions = CreateExternalDatabaseConnectionOptions;
    const dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_updateExternalDatabaseConnection: typeof updateExternalDatabaseConnection;
    type dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_UpdateExternalDatabaseConnection = UpdateExternalDatabaseConnection;
    const dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_deleteExternalDatabaseConnection: typeof deleteExternalDatabaseConnection;
    namespace dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d {
        export { dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ExternalDatabaseConnection as ExternalDatabaseConnection, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_CauseOfFailure as CauseOfFailure, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_CollectionsFound as CollectionsFound, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_FieldType as FieldType, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ConnectionStatus as ConnectionStatus, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ProtocolVersion as ProtocolVersion, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_Capabilities as Capabilities, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_GetExternalDatabaseConnectionRequest as GetExternalDatabaseConnectionRequest, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_GetExternalDatabaseConnectionResponse as GetExternalDatabaseConnectionResponse, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ListExternalDatabaseConnectionsRequest as ListExternalDatabaseConnectionsRequest, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_Paging as Paging, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ListExternalDatabaseConnectionsResponse as ListExternalDatabaseConnectionsResponse, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_PagingMetadata as PagingMetadata, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_CreateExternalDatabaseConnectionRequest as CreateExternalDatabaseConnectionRequest, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ConnectionType as ConnectionType, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_CreateExternalDatabaseConnectionResponse as CreateExternalDatabaseConnectionResponse, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_UpdateExternalDatabaseConnectionRequest as UpdateExternalDatabaseConnectionRequest, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_UpdateExternalDatabaseConnectionResponse as UpdateExternalDatabaseConnectionResponse, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_DeleteExternalDatabaseConnectionRequest as DeleteExternalDatabaseConnectionRequest, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_DeleteExternalDatabaseConnectionResponse as DeleteExternalDatabaseConnectionResponse, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_DomainEvent as DomainEvent, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_EntityCreatedEvent as EntityCreatedEvent, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_RestoreInfo as RestoreInfo, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_EntityUpdatedEvent as EntityUpdatedEvent, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_EntityDeletedEvent as EntityDeletedEvent, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ActionEvent as ActionEvent, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_MessageEnvelope as MessageEnvelope, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_IdentificationData as IdentificationData, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_WebhookIdentityType as WebhookIdentityType, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_getExternalDatabaseConnection as getExternalDatabaseConnection, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_listExternalDatabaseConnections as listExternalDatabaseConnections, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_ListExternalDatabaseConnectionsOptions as ListExternalDatabaseConnectionsOptions, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_createExternalDatabaseConnection as createExternalDatabaseConnection, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_CreateExternalDatabaseConnectionOptions as CreateExternalDatabaseConnectionOptions, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_updateExternalDatabaseConnection as updateExternalDatabaseConnection, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_UpdateExternalDatabaseConnection as UpdateExternalDatabaseConnection, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d_deleteExternalDatabaseConnection as deleteExternalDatabaseConnection, };
    }
    export { dataV2DataCollectionCollections_universal_d as collections, dataV1ExternalDatabaseConnectionExternalDatabaseConnections_universal_d as externalDatabaseConnections, dataV2IndexIndexes_universal_d as indexes };
}
