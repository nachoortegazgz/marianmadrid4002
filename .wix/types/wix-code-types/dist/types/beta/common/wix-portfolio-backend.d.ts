declare module "wix-portfolio-backend" {
  interface Collection {
      /**
       * Collection ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the collection is updated. To prevent conflicting changes, the existing revision must be passed when updating the collection object.
       * @readonly
       */
      revision?: string | null;
      /** Collection title. */
      title?: string | null;
      /** Collection description. */
      description?: string | null;
      /** Collection slug. */
      slug?: string | null;
      /** Collection cover image. */
      coverImage?: CommonImage$2;
      /** Whether the collection is hidden from the portfolio. Default: `false` */
      hidden?: boolean | null;
      /**
       * Index that determines which position a collection is displayed in the portfolio. <br />
       *
       * Default: [Epoch](https://www.epoch101.com/) timestamp. <br />
       */
      sortOrder?: number | null;
      /**
       * Date and time the collection was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the collection was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Collection page URL and and relative path. Returned when `includePageUrl` is `true` in the request.
       * @readonly
       */
      url?: string;
      /** Collection SEO data. */
      seoData?: SeoSchema$2;
  }
  interface CommonImage$2 {
      /**
       * @internal
       * @deprecated
       */
      type?: ImageImageType$2;
      /** Information about the Wix Media image. */
      imageInfo?: string;
      /** Focal point of the image. */
      focalPoint?: CommonPoint$2;
      /**
       * Set of key-value pairs describing the media in [Exchangeable Image File format](https://en.wikipedia.org/wiki/Exif).
       * @internal
       */
      exif?: Record<string, any> | null;
      /**
       * Image compression level. <br />
       *
       * Min: `30` <br />
       * Max: `100`
       * @internal
       */
      quality?: number | null;
      /**
       * [Unsharp masking](https://en.wikipedia.org/wiki/Unsharp_masking) values of the image.
       * @internal
       */
      unsharpMasking?: CommonUnsharpMasking$2;
      /**
       * Whether the image is saved in secure media.
       * @internal
       */
      secure?: boolean | null;
      /**
       * When image is saved in secure media, token is generated.
       * @internal
       * @readonly
       */
      token?: string | null;
  }
  enum ImageImageType$2 {
      UNDEFINED = "UNDEFINED",
      WIX_MEDIA = "WIX_MEDIA",
      EXTERNAL = "EXTERNAL"
  }
  interface CommonPoint$2 {
      /** X-coordinate of the focal point. */
      x?: number;
      /** Y-coordinate of the focal point. */
      y?: number;
  }
  interface CommonUnsharpMasking$2 {
      /**
       * Unsharp masking amount. Controls the sharpening strength. <br />
       *
       * Min: `0` <br />
       * Max: `5`
       */
      amount?: number | null;
      /** Unsharp masking radius in pixels. Controls the sharpening width. */
      radius?: number | null;
      /**
       * Unsharp masking threshold. Controls how different neighboring pixels must be for shapening to apply. <br />
       *
       * Min: `0` <br />
       * Max: `1`
       */
      threshold?: number | null;
  }
  /**
   * The SEO schema object contains data about different types of meta tags. It makes sure that the information about your page is presented properly to search engines.
   * The search engines use this information for ranking purposes, or to display snippets in the search results.
   * This data will override other sources of tags (for example patterns) and will be included in the <head> section of the HTML document, while not being displayed on the page itself.
   */
  interface SeoSchema$2 {
      /** SEO tag information. */
      tags?: Tag$2[];
      /** SEO general settings. */
      settings?: Settings$2;
  }
  interface Keyword$2 {
      /** Keyword value. */
      term?: string;
      /** Whether the keyword is the main focus keyword. */
      isMain?: boolean;
      /** The source that added the keyword terms to the SEO settings. */
      origin?: string | null;
  }
  interface Tag$2 {
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
  interface Settings$2 {
      /**
       * Whether the Auto Redirect feature, which creates `301 redirects` on a slug change, is enabled.
       *
       *
       * Default: `false` (Auto Redirect is enabled.)
       */
      preventAutoRedirect?: boolean;
      /** User-selected keyword terms for a specific page. */
      keywords?: Keyword$2[];
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
  interface Empty$3 {
  }
  interface AdminRemoveMenuItemsResponse {
      /** number of items queried for deletion */
      numItems?: number;
      /** number of items sucessfully deleted */
      numItemsSuccessfullyDeleted?: number;
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
  interface CreateCollectionRequest {
      /** Collection to create. */
      collection: Collection;
  }
  interface CreateCollectionResponse {
      /** Created collection. */
      collection?: Collection;
  }
  interface GetCollectionRequest {
      /** ID of the collection to retrieve. */
      collectionId: string;
      /** Whether to include the collection's page URL and relative path in the response. Default: `false` */
      includePageUrl?: boolean | null;
  }
  interface GetCollectionResponse {
      /** The requested collection. */
      collection?: Collection;
  }
  interface ListCollectionsRequest {
      paging?: CursorPaging$4;
      /** Whether to include the collection's page URL and relative path in the response. Default: `false` */
      includePageUrl?: boolean | null;
  }
  interface CursorPaging$4 {
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
  interface ListCollectionsResponse {
      /** List of collections. */
      collections?: Collection[];
      /**
       * @internal
       * @deprecated
       * @targetRemovalDate 2025-05-25
       */
      pagingMetadataV2?: PagingMetadataV2$4;
      /** Paging metadata. */
      metadata?: PagingMetadataV2$4;
  }
  interface PagingMetadataV2$4 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
      total?: number | null;
      /** Flag that indicates the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
      cursors?: Cursors$4;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface Cursors$4 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface UpdateCollectionRequest {
      /** Collection to update. */
      collection: Collection;
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  interface UpdateCollectionResponse {
      /** Updated collection. */
      collection?: Collection;
  }
  interface DeleteCollectionRequest {
      /** ID of the collection to delete. */
      collectionId: string;
      /**
       * @internal
       * @deprecated
       * @targetRemovalDate 2025-05-25
       */
      revision?: string;
  }
  interface DeleteCollectionResponse {
      /** ID of the deleted collection. */
      collectionId?: string;
  }
  interface QueryCollectionsRequest {
      /** Query options. */
      query: QueryV2$3;
      /** Whether to include the collection's page URL and relative path in the response. Default: `false` */
      includePageUrl?: boolean | null;
  }
  interface QueryV2$3 extends QueryV2PagingMethodOneOf$3 {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$3;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$4;
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
      sort?: Sorting$3[];
      /** Array of projected fields. A list of specific field names to return. If `fieldsets` are also specified, the union of `fieldsets` and `fields` is returned. */
      fields?: string[];
      /** Array of named, predefined sets of projected fields. A array of predefined named sets of fields to be returned. Specifying multiple `fieldsets` will return the union of fields from all sets. If `fields` are also specified, the union of `fieldsets` and `fields` is returned. */
      fieldsets?: string[];
  }
  /** @oneof */
  interface QueryV2PagingMethodOneOf$3 {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$3;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$4;
  }
  interface Sorting$3 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$3;
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
  enum SortOrder$3 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface Paging$3 {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface QueryCollectionsResponse {
      /** List of collections. */
      collections?: Collection[];
      /**
       * @internal
       * @deprecated
       * @targetRemovalDate 2025-05-25
       */
      pagingMetadataV2?: PagingMetadataV2$4;
      /** Paging metadata. */
      metadata?: PagingMetadataV2$4;
  }
  /** @internal
   * @documentationMaturity preview
   * @permissionId PORTFOLIO.PROJECT_CREATE
   * @adminMethod
   */
  function adminRemoveMenuItems(): Promise<AdminRemoveMenuItemsResponse>;
  /**
   * Creates a collection.
   * @param collection - Collection to create.
   * @public
   * @documentationMaturity preview
   * @requiredField collection
   * @permissionId PORTFOLIO.COLLECTION_CREATE
   * @adminMethod
   * @returns Created collection.
   */
  function createCollection(collection: Collection): Promise<Collection>;
  /**
   * Retrieves a collection.
   * @param collectionId - ID of the collection to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField collectionId
   * @permissionId PORTFOLIO.COLLECTION_READ
   * @returns The requested collection.
   */
  function getCollection(collectionId: string, options?: GetCollectionOptions): Promise<Collection>;
  interface GetCollectionOptions {
      /** Whether to include the collection's page URL and relative path in the response. Default: `false` */
      includePageUrl?: boolean | null;
  }
  /**
   * Retrieves a list all collections in a portfolio.
   * @public
   * @documentationMaturity preview
   * @permissionId PORTFOLIO.COLLECTION_READ
   */
  function listCollections(options?: ListCollectionsOptions): Promise<ListCollectionsResponse>;
  interface ListCollectionsOptions {
      paging?: CursorPaging$4;
      /** Whether to include the collection's page URL and relative path in the response. Default: `false` */
      includePageUrl?: boolean | null;
  }
  /**
   * Updates a collection.
   * @param _id - Collection ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField collection
   * @requiredField collection.revision
   * @permissionId PORTFOLIO.COLLECTION_UPDATE
   * @adminMethod
   * @returns Updated collection.
   */
  function updateCollection(_id: string | null, collection: UpdateCollection, options?: UpdateCollectionOptions): Promise<Collection>;
  interface UpdateCollection {
      /**
       * Collection ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the collection is updated. To prevent conflicting changes, the existing revision must be passed when updating the collection object.
       * @readonly
       */
      revision?: string | null;
      /** Collection title. */
      title?: string | null;
      /** Collection description. */
      description?: string | null;
      /** Collection slug. */
      slug?: string | null;
      /** Collection cover image. */
      coverImage?: CommonImage$2;
      /** Whether the collection is hidden from the portfolio. Default: `false` */
      hidden?: boolean | null;
      /**
       * Index that determines which position a collection is displayed in the portfolio. <br />
       *
       * Default: [Epoch](https://www.epoch101.com/) timestamp. <br />
       */
      sortOrder?: number | null;
      /**
       * Date and time the collection was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the collection was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Collection page URL and and relative path. Returned when `includePageUrl` is `true` in the request.
       * @readonly
       */
      url?: string;
      /** Collection SEO data. */
      seoData?: SeoSchema$2;
  }
  interface UpdateCollectionOptions {
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  /**
   * Deletes a collection.
   * @param collectionId - ID of the collection to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField collectionId
   * @permissionId PORTFOLIO.COLLECTION_DELETE
   * @adminMethod
   */
  function deleteCollection(collectionId: string, options?: DeleteCollectionOptions): Promise<DeleteCollectionResponse>;
  interface DeleteCollectionOptions {
      /**
       * @internal
       * @deprecated
       * @targetRemovalDate 2025-05-25
       */
      revision?: string;
  }
  /**
   * Retrieves a list of collections given the provided paging, filtering, and sorting. Up to 100 collections can be returned per request.
   *
   * The default `sort` is `id` in `ASC`.
   *
   * For a detailed list of supported operations, see [Collections: Supported Filters and Sorting](https://dev.wix.com/docs/rest/business-solutions/portfolio/collections/sort-and-filter).
   * To learn how to query collections, see [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language).
   * @public
   * @documentationMaturity preview
   * @permissionId PORTFOLIO.COLLECTION_READ
   */
  function queryCollections(options?: QueryCollectionsOptions): CollectionsQueryBuilder;
  interface QueryCollectionsOptions {
      /** Whether to include the collection's page URL and relative path in the response. Default: `false` */
      includePageUrl?: boolean | null | undefined;
  }
  interface QueryCursorResult$2 {
      cursors: Cursors$4;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface CollectionsQueryResult extends QueryCursorResult$2 {
      items: Collection[];
      query: CollectionsQueryBuilder;
      next: () => Promise<CollectionsQueryResult>;
      prev: () => Promise<CollectionsQueryResult>;
  }
  interface CollectionsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | 'title' | 'description' | 'slug' | 'hidden' | 'sortOrder' | '_createdDate' | '_updatedDate', value: any) => CollectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | 'title' | 'description' | 'slug' | 'hidden' | 'sortOrder' | '_createdDate' | '_updatedDate', value: any) => CollectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: 'sortOrder' | '_createdDate' | '_updatedDate', value: any) => CollectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: 'sortOrder' | '_createdDate' | '_updatedDate', value: any) => CollectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: 'sortOrder' | '_createdDate' | '_updatedDate', value: any) => CollectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: 'sortOrder' | '_createdDate' | '_updatedDate', value: any) => CollectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'title' | 'description' | 'slug', value: string) => CollectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | 'title' | 'description' | 'slug' | 'hidden' | 'sortOrder' | '_createdDate' | '_updatedDate', value: any[]) => CollectionsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'title' | 'description' | 'slug' | 'hidden' | 'sortOrder' | '_createdDate' | '_updatedDate', value: any) => CollectionsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | 'title' | 'description' | 'slug' | 'hidden' | 'sortOrder' | '_createdDate' | '_updatedDate', value: boolean) => CollectionsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | 'title' | 'description' | 'slug' | 'sortOrder' | '_createdDate' | '_updatedDate'>) => CollectionsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | 'title' | 'description' | 'slug' | 'sortOrder' | '_createdDate' | '_updatedDate'>) => CollectionsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => CollectionsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => CollectionsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<CollectionsQueryResult>;
  }
  
  type portfolioCollectionsV1Collection_universal_d_Collection = Collection;
  type portfolioCollectionsV1Collection_universal_d_AdminRemoveMenuItemsResponse = AdminRemoveMenuItemsResponse;
  type portfolioCollectionsV1Collection_universal_d_CreateCollectionRequest = CreateCollectionRequest;
  type portfolioCollectionsV1Collection_universal_d_CreateCollectionResponse = CreateCollectionResponse;
  type portfolioCollectionsV1Collection_universal_d_GetCollectionRequest = GetCollectionRequest;
  type portfolioCollectionsV1Collection_universal_d_GetCollectionResponse = GetCollectionResponse;
  type portfolioCollectionsV1Collection_universal_d_ListCollectionsRequest = ListCollectionsRequest;
  type portfolioCollectionsV1Collection_universal_d_ListCollectionsResponse = ListCollectionsResponse;
  type portfolioCollectionsV1Collection_universal_d_UpdateCollectionRequest = UpdateCollectionRequest;
  type portfolioCollectionsV1Collection_universal_d_UpdateCollectionResponse = UpdateCollectionResponse;
  type portfolioCollectionsV1Collection_universal_d_DeleteCollectionRequest = DeleteCollectionRequest;
  type portfolioCollectionsV1Collection_universal_d_DeleteCollectionResponse = DeleteCollectionResponse;
  type portfolioCollectionsV1Collection_universal_d_QueryCollectionsRequest = QueryCollectionsRequest;
  type portfolioCollectionsV1Collection_universal_d_QueryCollectionsResponse = QueryCollectionsResponse;
  const portfolioCollectionsV1Collection_universal_d_adminRemoveMenuItems: typeof adminRemoveMenuItems;
  const portfolioCollectionsV1Collection_universal_d_createCollection: typeof createCollection;
  const portfolioCollectionsV1Collection_universal_d_getCollection: typeof getCollection;
  type portfolioCollectionsV1Collection_universal_d_GetCollectionOptions = GetCollectionOptions;
  const portfolioCollectionsV1Collection_universal_d_listCollections: typeof listCollections;
  type portfolioCollectionsV1Collection_universal_d_ListCollectionsOptions = ListCollectionsOptions;
  const portfolioCollectionsV1Collection_universal_d_updateCollection: typeof updateCollection;
  type portfolioCollectionsV1Collection_universal_d_UpdateCollection = UpdateCollection;
  type portfolioCollectionsV1Collection_universal_d_UpdateCollectionOptions = UpdateCollectionOptions;
  const portfolioCollectionsV1Collection_universal_d_deleteCollection: typeof deleteCollection;
  type portfolioCollectionsV1Collection_universal_d_DeleteCollectionOptions = DeleteCollectionOptions;
  const portfolioCollectionsV1Collection_universal_d_queryCollections: typeof queryCollections;
  type portfolioCollectionsV1Collection_universal_d_QueryCollectionsOptions = QueryCollectionsOptions;
  type portfolioCollectionsV1Collection_universal_d_CollectionsQueryResult = CollectionsQueryResult;
  type portfolioCollectionsV1Collection_universal_d_CollectionsQueryBuilder = CollectionsQueryBuilder;
  namespace portfolioCollectionsV1Collection_universal_d {
    export {
      portfolioCollectionsV1Collection_universal_d_Collection as Collection,
      CommonImage$2 as CommonImage,
      ImageImageType$2 as ImageImageType,
      CommonPoint$2 as CommonPoint,
      CommonUnsharpMasking$2 as CommonUnsharpMasking,
      SeoSchema$2 as SeoSchema,
      Keyword$2 as Keyword,
      Tag$2 as Tag,
      Settings$2 as Settings,
      DomainEvent$5 as DomainEvent,
      DomainEventBodyOneOf$5 as DomainEventBodyOneOf,
      EntityCreatedEvent$5 as EntityCreatedEvent,
      RestoreInfo$5 as RestoreInfo,
      EntityUpdatedEvent$5 as EntityUpdatedEvent,
      EntityDeletedEvent$5 as EntityDeletedEvent,
      ActionEvent$5 as ActionEvent,
      Empty$3 as Empty,
      portfolioCollectionsV1Collection_universal_d_AdminRemoveMenuItemsResponse as AdminRemoveMenuItemsResponse,
      MessageEnvelope$5 as MessageEnvelope,
      IdentificationData$5 as IdentificationData,
      IdentificationDataIdOneOf$5 as IdentificationDataIdOneOf,
      WebhookIdentityType$5 as WebhookIdentityType,
      InvalidateCache$2 as InvalidateCache,
      InvalidateCacheGetByOneOf$2 as InvalidateCacheGetByOneOf,
      App$2 as App,
      Page$2 as Page,
      URI$2 as URI,
      File$2 as File,
      portfolioCollectionsV1Collection_universal_d_CreateCollectionRequest as CreateCollectionRequest,
      portfolioCollectionsV1Collection_universal_d_CreateCollectionResponse as CreateCollectionResponse,
      portfolioCollectionsV1Collection_universal_d_GetCollectionRequest as GetCollectionRequest,
      portfolioCollectionsV1Collection_universal_d_GetCollectionResponse as GetCollectionResponse,
      portfolioCollectionsV1Collection_universal_d_ListCollectionsRequest as ListCollectionsRequest,
      CursorPaging$4 as CursorPaging,
      portfolioCollectionsV1Collection_universal_d_ListCollectionsResponse as ListCollectionsResponse,
      PagingMetadataV2$4 as PagingMetadataV2,
      Cursors$4 as Cursors,
      portfolioCollectionsV1Collection_universal_d_UpdateCollectionRequest as UpdateCollectionRequest,
      portfolioCollectionsV1Collection_universal_d_UpdateCollectionResponse as UpdateCollectionResponse,
      portfolioCollectionsV1Collection_universal_d_DeleteCollectionRequest as DeleteCollectionRequest,
      portfolioCollectionsV1Collection_universal_d_DeleteCollectionResponse as DeleteCollectionResponse,
      portfolioCollectionsV1Collection_universal_d_QueryCollectionsRequest as QueryCollectionsRequest,
      QueryV2$3 as QueryV2,
      QueryV2PagingMethodOneOf$3 as QueryV2PagingMethodOneOf,
      Sorting$3 as Sorting,
      SortOrder$3 as SortOrder,
      Paging$3 as Paging,
      portfolioCollectionsV1Collection_universal_d_QueryCollectionsResponse as QueryCollectionsResponse,
      portfolioCollectionsV1Collection_universal_d_adminRemoveMenuItems as adminRemoveMenuItems,
      portfolioCollectionsV1Collection_universal_d_createCollection as createCollection,
      portfolioCollectionsV1Collection_universal_d_getCollection as getCollection,
      portfolioCollectionsV1Collection_universal_d_GetCollectionOptions as GetCollectionOptions,
      portfolioCollectionsV1Collection_universal_d_listCollections as listCollections,
      portfolioCollectionsV1Collection_universal_d_ListCollectionsOptions as ListCollectionsOptions,
      portfolioCollectionsV1Collection_universal_d_updateCollection as updateCollection,
      portfolioCollectionsV1Collection_universal_d_UpdateCollection as UpdateCollection,
      portfolioCollectionsV1Collection_universal_d_UpdateCollectionOptions as UpdateCollectionOptions,
      portfolioCollectionsV1Collection_universal_d_deleteCollection as deleteCollection,
      portfolioCollectionsV1Collection_universal_d_DeleteCollectionOptions as DeleteCollectionOptions,
      portfolioCollectionsV1Collection_universal_d_queryCollections as queryCollections,
      portfolioCollectionsV1Collection_universal_d_QueryCollectionsOptions as QueryCollectionsOptions,
      portfolioCollectionsV1Collection_universal_d_CollectionsQueryResult as CollectionsQueryResult,
      portfolioCollectionsV1Collection_universal_d_CollectionsQueryBuilder as CollectionsQueryBuilder,
    };
  }
  
  interface PortfolioSettings {
      /**
       * Revision number. Increments by 1 each time the portfolio settings object is updated. To prevent conflicting changes, the existing revision must be passed when updating the portfolio settings object.
       * @readonly
       */
      revision?: string | null;
      /** Portfolio's project item settings. */
      projectItemSettings?: ProjectItemSettings;
      /** Portfolio's media settings. */
      mediaSettings?: MediaSettings;
      /**
       * The site menu settings
       * @internal
       */
      siteMenuSettings?: SiteMenuSettings;
      /**
       * Date and time the portfolio settings were created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the portfolio settings were updated.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  interface ProjectItemSettings {
      /** The direction in which to add new project items to a gallery. Default: `GALLERY_START` */
      addItemDirection?: AddItemDirection;
      /** Default title assigned to a project item if no title is provided. Default: `FILE_NAME` */
      defaultItemName?: DefaultItemName;
  }
  enum AddItemDirection {
      /** Add new project items to the beginning of the gallery. */
      GALLERY_START = "GALLERY_START",
      /** Add new project items to the end of the gallery. */
      GALLERY_END = "GALLERY_END"
  }
  enum DefaultItemName {
      /** File name assigned as the title. */
      FILE_NAME = "FILE_NAME",
      /** No title assigned. */
      EMPTY = "EMPTY"
  }
  interface MediaSettings {
      /** ID of the folder containing the media. */
      folderId?: string | null;
  }
  interface SiteMenuSettings {
      /** Whether to automatically update the site menu */
      autoUpdateMenu?: boolean | null;
  }
  interface CreatePortfolioSettingsRequest {
      /** The portfolio settings to create. */
      portfolioSettings: PortfolioSettings;
  }
  interface CreatePortfolioSettingsResponse {
      /** Newly created portfolio settings. */
      portfolioSettings?: PortfolioSettings;
  }
  interface GetPortfolioSettingsRequest {
  }
  interface GetPortfolioSettingsResponse {
      /** Portfolio settings. */
      portfolioSettings?: PortfolioSettings;
  }
  interface UpdatePortfolioSettingsRequest {
      /** The portfolio settings to update. */
      portfolioSettings: PortfolioSettings;
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  interface UpdatePortfolioSettingsResponse {
      /** Updated portfolio settings. */
      updatedPortfolioSettings?: PortfolioSettings;
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
   * Creates a site's portfolio settings.
   *
   * > **Note:**
   * >
   * > This method is intended for creating portfolio settings. If settings already exist, the request will return an error. To update existing settings, call [Update Portfolio Settings](https://dev.wix.com/docs/rest/business-solutions/portfolio/portfolio-settings/update-portfolio-settings).
   * @param portfolioSettings - The portfolio settings to create.
   * @public
   * @documentationMaturity preview
   * @requiredField portfolioSettings
   * @requiredField portfolioSettings.projectItemSettings
   * @permissionId PORTFOLIO.SETTINGS_CREATE
   * @adminMethod
   * @returns Newly created portfolio settings.
   */
  function createPortfolioSettings(portfolioSettings: PortfolioSettings): Promise<PortfolioSettings>;
  /**
   * Retrieves a site's portfolio settings.
   * @public
   * @documentationMaturity preview
   * @permissionId PORTFOLIO.SETTINGS_READ
   * @adminMethod
   */
  function getPortfolioSettings(): Promise<GetPortfolioSettingsResponse>;
  /**
   * Updates a site's portfolio settings.
   * @param portfolioSettings - The portfolio settings to update.
   * @public
   * @documentationMaturity preview
   * @requiredField portfolioSettings
   * @requiredField portfolioSettings.revision
   * @permissionId PORTFOLIO.SETTINGS_UPDATE
   * @adminMethod
   */
  function updatePortfolioSettings(portfolioSettings: PortfolioSettings, options?: UpdatePortfolioSettingsOptions): Promise<UpdatePortfolioSettingsResponse>;
  interface UpdatePortfolioSettingsOptions {
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  
  type portfolioPortfolioAppV1PortfolioSettings_universal_d_PortfolioSettings = PortfolioSettings;
  type portfolioPortfolioAppV1PortfolioSettings_universal_d_ProjectItemSettings = ProjectItemSettings;
  type portfolioPortfolioAppV1PortfolioSettings_universal_d_AddItemDirection = AddItemDirection;
  const portfolioPortfolioAppV1PortfolioSettings_universal_d_AddItemDirection: typeof AddItemDirection;
  type portfolioPortfolioAppV1PortfolioSettings_universal_d_DefaultItemName = DefaultItemName;
  const portfolioPortfolioAppV1PortfolioSettings_universal_d_DefaultItemName: typeof DefaultItemName;
  type portfolioPortfolioAppV1PortfolioSettings_universal_d_MediaSettings = MediaSettings;
  type portfolioPortfolioAppV1PortfolioSettings_universal_d_SiteMenuSettings = SiteMenuSettings;
  type portfolioPortfolioAppV1PortfolioSettings_universal_d_CreatePortfolioSettingsRequest = CreatePortfolioSettingsRequest;
  type portfolioPortfolioAppV1PortfolioSettings_universal_d_CreatePortfolioSettingsResponse = CreatePortfolioSettingsResponse;
  type portfolioPortfolioAppV1PortfolioSettings_universal_d_GetPortfolioSettingsRequest = GetPortfolioSettingsRequest;
  type portfolioPortfolioAppV1PortfolioSettings_universal_d_GetPortfolioSettingsResponse = GetPortfolioSettingsResponse;
  type portfolioPortfolioAppV1PortfolioSettings_universal_d_UpdatePortfolioSettingsRequest = UpdatePortfolioSettingsRequest;
  type portfolioPortfolioAppV1PortfolioSettings_universal_d_UpdatePortfolioSettingsResponse = UpdatePortfolioSettingsResponse;
  const portfolioPortfolioAppV1PortfolioSettings_universal_d_createPortfolioSettings: typeof createPortfolioSettings;
  const portfolioPortfolioAppV1PortfolioSettings_universal_d_getPortfolioSettings: typeof getPortfolioSettings;
  const portfolioPortfolioAppV1PortfolioSettings_universal_d_updatePortfolioSettings: typeof updatePortfolioSettings;
  type portfolioPortfolioAppV1PortfolioSettings_universal_d_UpdatePortfolioSettingsOptions = UpdatePortfolioSettingsOptions;
  namespace portfolioPortfolioAppV1PortfolioSettings_universal_d {
    export {
      portfolioPortfolioAppV1PortfolioSettings_universal_d_PortfolioSettings as PortfolioSettings,
      portfolioPortfolioAppV1PortfolioSettings_universal_d_ProjectItemSettings as ProjectItemSettings,
      portfolioPortfolioAppV1PortfolioSettings_universal_d_AddItemDirection as AddItemDirection,
      portfolioPortfolioAppV1PortfolioSettings_universal_d_DefaultItemName as DefaultItemName,
      portfolioPortfolioAppV1PortfolioSettings_universal_d_MediaSettings as MediaSettings,
      portfolioPortfolioAppV1PortfolioSettings_universal_d_SiteMenuSettings as SiteMenuSettings,
      portfolioPortfolioAppV1PortfolioSettings_universal_d_CreatePortfolioSettingsRequest as CreatePortfolioSettingsRequest,
      portfolioPortfolioAppV1PortfolioSettings_universal_d_CreatePortfolioSettingsResponse as CreatePortfolioSettingsResponse,
      portfolioPortfolioAppV1PortfolioSettings_universal_d_GetPortfolioSettingsRequest as GetPortfolioSettingsRequest,
      portfolioPortfolioAppV1PortfolioSettings_universal_d_GetPortfolioSettingsResponse as GetPortfolioSettingsResponse,
      portfolioPortfolioAppV1PortfolioSettings_universal_d_UpdatePortfolioSettingsRequest as UpdatePortfolioSettingsRequest,
      portfolioPortfolioAppV1PortfolioSettings_universal_d_UpdatePortfolioSettingsResponse as UpdatePortfolioSettingsResponse,
      DomainEvent$4 as DomainEvent,
      DomainEventBodyOneOf$4 as DomainEventBodyOneOf,
      EntityCreatedEvent$4 as EntityCreatedEvent,
      RestoreInfo$4 as RestoreInfo,
      EntityUpdatedEvent$4 as EntityUpdatedEvent,
      EntityDeletedEvent$4 as EntityDeletedEvent,
      ActionEvent$4 as ActionEvent,
      MessageEnvelope$4 as MessageEnvelope,
      IdentificationData$4 as IdentificationData,
      IdentificationDataIdOneOf$4 as IdentificationDataIdOneOf,
      WebhookIdentityType$4 as WebhookIdentityType,
      portfolioPortfolioAppV1PortfolioSettings_universal_d_createPortfolioSettings as createPortfolioSettings,
      portfolioPortfolioAppV1PortfolioSettings_universal_d_getPortfolioSettings as getPortfolioSettings,
      portfolioPortfolioAppV1PortfolioSettings_universal_d_updatePortfolioSettings as updatePortfolioSettings,
      portfolioPortfolioAppV1PortfolioSettings_universal_d_UpdatePortfolioSettingsOptions as UpdatePortfolioSettingsOptions,
    };
  }
  
  interface ProjectitemsItem extends ProjectitemsItemMetadataOneOf {
      /** Information about the Wix Media image. */
      image?: CommonImage$1;
      /** Information about the Wix Media video. */
      video?: CommonVideo;
      /** Project ID. */
      projectId?: string | null;
      /**
       * Project item ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Index that determines which position a project is displayed in the project.  <br />
       *
       * Default: [Epoch](https://www.epoch101.com/) timestamp. <br />
       */
      sortOrder?: number | null;
      /** Project item title. */
      title?: string | null;
      /** Project item description. */
      description?: string | null;
      /**
       * Project item data type.
       * @readonly
       */
      type?: ItemType;
      /**
       * Date and time the project item was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the project item was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Project item tags.
       * @internal
       */
      tags?: ProjectitemsTags;
      /** Project item link. */
      link?: Link;
  }
  /** @oneof */
  interface ProjectitemsItemMetadataOneOf {
      /** Information about the Wix Media image. */
      image?: CommonImage$1;
      /** Information about the Wix Media video. */
      video?: CommonVideo;
  }
  enum ItemType {
      /** Undefined item type. */
      UNDEFINED = "UNDEFINED",
      /** Image item type. */
      IMAGE = "IMAGE",
      /** Video item type. */
      VIDEO = "VIDEO"
  }
  interface CommonImage$1 {
      /**
       * @internal
       * @deprecated
       */
      type?: ImageImageType$1;
      /** Information about the Wix Media image. */
      imageInfo?: string;
      /** Focal point of the image. */
      focalPoint?: CommonPoint$1;
      /**
       * Set of key-value pairs describing the media in [Exchangeable Image File format](https://en.wikipedia.org/wiki/Exif).
       * @internal
       */
      exif?: Record<string, any> | null;
      /**
       * Image compression level. <br />
       *
       * Min: `30` <br />
       * Max: `100`
       * @internal
       */
      quality?: number | null;
      /**
       * [Unsharp masking](https://en.wikipedia.org/wiki/Unsharp_masking) values of the image.
       * @internal
       */
      unsharpMasking?: CommonUnsharpMasking$1;
      /**
       * Whether the image is saved in secure media.
       * @internal
       */
      secure?: boolean | null;
      /**
       * When image is saved in secure media, token is generated.
       * @internal
       * @readonly
       */
      token?: string | null;
  }
  enum ImageImageType$1 {
      UNDEFINED = "UNDEFINED",
      WIX_MEDIA = "WIX_MEDIA",
      EXTERNAL = "EXTERNAL"
  }
  interface CommonPoint$1 {
      /** X-coordinate of the focal point. */
      x?: number;
      /** Y-coordinate of the focal point. */
      y?: number;
  }
  interface CommonUnsharpMasking$1 {
      /**
       * Unsharp masking amount. Controls the sharpening strength. <br />
       *
       * Min: `0` <br />
       * Max: `5`
       */
      amount?: number | null;
      /** Unsharp masking radius in pixels. Controls the sharpening width. */
      radius?: number | null;
      /**
       * Unsharp masking threshold. Controls how different neighboring pixels must be for shapening to apply. <br />
       *
       * Min: `0` <br />
       * Max: `1`
       */
      threshold?: number | null;
  }
  interface CommonVideo {
      /** Information about the Wix Media video. */
      videoInfo?: string;
      /** Manually defined Video duration in milliseconds. */
      durationInMillis?: number | null;
  }
  interface CommonVideoResolution {
      /** Video URL.  Required. */
      url?: string;
      /** Video height. Required. */
      height?: number;
      /** Video width.  Required. */
      width?: number;
      /**
       * Video poster. Deprecated, please use the `posters` property in the parent entity
       * @internal
       * @deprecated
       */
      poster?: string;
      /** Video format for example, mp4, hls.  Required. */
      format?: string;
      /** Video quality for example 480p, 720p. */
      quality?: string | null;
      /** Video filename. */
      filename?: string | null;
  }
  interface ProjectitemsTags {
      /** List of tags assigned to the media item. */
      values?: string[];
  }
  interface Link {
      /** Display text of the link. */
      text?: string | null;
      /** Target URL of the link. */
      url?: string | null;
      /**
       * Whether the link opens in a new tab or window. One of:
       * * `'_blank'`: The link opens in a new tab or window.
       * * `'_self'`: The link opens in the same tab or window.
       */
      target?: string | null;
  }
  interface GenerateTokenForProjectItemsRequest {
      /** Media ids of requested project items */
      mediaIds: string[];
  }
  interface GenerateTokenForProjectItemsResponse {
      /** Generated media tokens for project items */
      mediaTokens?: ProjectItemMediaToken[];
  }
  interface ProjectItemMediaToken {
      /** Media id of project item */
      mediaId?: string;
      /** Generated media token for project item */
      mediaToken?: string;
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
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
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
  interface EntityDeletedEvent$3 {
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
  interface CreateProjectItemRequest {
      /** Project item to create. */
      item: ProjectitemsItem;
  }
  interface CreateProjectItemResponse {
      /**
       * @internal
       * @deprecated
       * @targetRemovalDate 2025-05-25
       */
      projectId?: string;
      /** Newly created project item. */
      item?: ProjectitemsItem;
  }
  interface BulkCreateProjectItemsRequest {
      /**
       * Project ID.
       * @internal
       */
      projectId: string;
      /** Project items to create. */
      items: ProjectitemsItem[];
      /** Whether to include the created project items in the response. Set to `true` to receive the project items in the response. Default: `false` */
      returnFullEntity?: boolean | null;
  }
  interface BulkCreateProjectItemsResponse {
      /**
       * Project ID.
       * @internal
       */
      projectId?: string;
      /** Project items created by bulk action. */
      results?: BulkCreateProjectItemResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  interface BulkCreateProjectItemResult {
      /** Information about successful action or error for failure. */
      itemMetadata?: ItemMetadata$1;
      /** Newly created project item. */
      item?: ProjectitemsItem;
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
  interface GetProjectItemRequest {
      /**
       * @internal
       * @deprecated
       * @targetRemovalDate 2025-05-25
       */
      projectId?: string;
      /** Project item ID. */
      itemId: string;
  }
  interface GetProjectItemResponse {
      /**
       * @internal
       * @deprecated
       * @targetRemovalDate 2025-05-25
       */
      projectId?: string;
      /** Project item. */
      item?: ProjectitemsItem;
  }
  interface ListProjectItemsRequest {
      /** Project ID. */
      projectId: string;
      /** Maximum number of items to return in the results. */
      paging?: Paging$2;
  }
  interface Paging$2 {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface ListProjectItemsResponse {
      /**
       * @internal
       * @deprecated
       * @targetRemovalDate 2025-05-25
       */
      projectId?: string;
      /** Project items. */
      items?: ProjectitemsItem[];
      /**
       * @deprecated
       * @targetRemovalDate 2025-05-25
       */
      pagingMetadataV2?: PagingMetadataV2$3;
      /** Paging metadata. */
      metadata?: PagingMetadataV2$3;
  }
  interface PagingMetadataV2$3 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
      total?: number | null;
      /** Flag that indicates the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
      cursors?: Cursors$3;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface Cursors$3 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface QueryProjectItemsRequest {
      /** WQL expression */
      query?: QueryV2$2;
  }
  interface QueryV2$2 extends QueryV2PagingMethodOneOf$2 {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$2;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$3;
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
      sort?: Sorting$2[];
      /** Array of projected fields. A list of specific field names to return. If `fieldsets` are also specified, the union of `fieldsets` and `fields` is returned. */
      fields?: string[];
      /** Array of named, predefined sets of projected fields. A array of predefined named sets of fields to be returned. Specifying multiple `fieldsets` will return the union of fields from all sets. If `fields` are also specified, the union of `fieldsets` and `fields` is returned. */
      fieldsets?: string[];
  }
  /** @oneof */
  interface QueryV2PagingMethodOneOf$2 {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$2;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$3;
  }
  interface Sorting$2 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$2;
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
  enum SortOrder$2 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$3 {
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
  interface QueryProjectItemsResponse {
      /** Project items. */
      items?: ProjectitemsItem[];
      /** Paging metadata. */
      metadata?: PagingMetadataV2$3;
  }
  interface UpdateProjectItemRequest {
      /** The project item to update. */
      item: ProjectitemsItem;
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  interface UpdateProjectItemResponse {
      /**
       * @internal
       * @deprecated
       * @targetRemovalDate 2025-05-25
       */
      projectId?: string;
      /** The updated project item. */
      item?: ProjectitemsItem;
  }
  interface BulkUpdateProjectItemsRequest {
      /**
       * Project ID.
       * @internal
       */
      projectId: string;
      /** items to be updated. */
      items?: MaskedItem[];
      /** Whether to include the updated project items in the response. Set to `true` to receive the project items in the response. Default: `false` */
      returnFullEntity?: boolean | null;
  }
  interface MaskedItem {
      /** Item to be updated. */
      item?: ProjectitemsItem;
      /**
       * Fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  interface BulkUpdateProjectItemsResponse {
      /**
       * Project ID.
       * @internal
       */
      projectId?: string;
      /** Project items updated by bulk action. */
      results?: BulkUpdateProjectItemResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  interface BulkUpdateProjectItemResult {
      /** Information about successful action or error for failure. */
      itemMetadata?: ItemMetadata$1;
      /** Updated project item. */
      item?: ProjectitemsItem;
  }
  interface DeleteProjectItemRequest {
      /**
       * @internal
       * @deprecated
       * @targetRemovalDate 2025-05-25
       */
      projectId?: string;
      /** ID of the project item to delete. */
      itemId: string;
  }
  interface DeleteProjectItemResponse {
      /** Project ID. */
      projectId?: string;
      /** ID of the deleted project item. */
      itemId?: string;
  }
  interface BulkDeleteProjectItemsRequest {
      /**
       * Project ID.
       * @internal
       */
      projectId: string;
      /** Project item IDs. */
      itemIds: string[];
  }
  interface BulkDeleteProjectItemsResponse {
      /**
       * Project ID.
       * @internal
       */
      projectId?: string;
      /** Project items deleted by bulk action. */
      results?: BulkDeleteProjectItemResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  interface BulkDeleteProjectItemResult {
      /** Information about successful action or error for failure. */
      itemMetadata?: ItemMetadata$1;
      /** Project item ID. */
      itemId?: string;
  }
  interface CreateProjectGalleryRequest {
      /** Id of Project to create */
      projectId?: string;
  }
  interface CreateProjectGalleryResponse {
      /** Id of created Project */
      projectId?: string;
      /** Id of created gallery */
      galleryId?: string;
  }
  interface Empty$2 {
  }
  interface DeletedProjectRestored$1 {
      /** the id of the project that was restored */
      projectId?: string;
      /** timestamp for when the project was originally deleted. */
      deletionTimestamp?: Date | null;
  }
  interface DuplicateProjectItemsRequest {
      /** ID of the project containing the items to duplicate. */
      originProjectId: string;
      /** ID of the project where the duplicated items will be added. */
      targetProjectId: string;
  }
  interface DuplicateProjectItemsResponse {
      /** Project ID where the duplicated items have been added. */
      projectId?: string;
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  /**
   * Generate media token for project items
   * @param mediaIds - Media ids of requested project items
   * @internal
   * @documentationMaturity preview
   * @requiredField mediaIds
   * @permissionId PORTFOLIO.PROJECT_ITEM_CREATE
   * @adminMethod
   */
  function generateTokenForProjectItems(mediaIds: string[]): Promise<GenerateTokenForProjectItemsResponse>;
  /**
   * Creates a project item.
   * @param item - Project item to create.
   * @public
   * @documentationMaturity preview
   * @requiredField item
   * @permissionId PORTFOLIO.PROJECT_ITEM_CREATE
   * @adminMethod
   * @returns Newly created project item.
   */
  function createProjectItem(item: ProjectitemsItem): Promise<ProjectitemsItem>;
  /**
   * Creates multiple project items.
   * @param projectId - Project ID.
   * @public
   * @documentationMaturity preview
   * @requiredField options.items
   * @requiredField projectId
   * @permissionId PORTFOLIO.PROJECT_ITEM_CREATE
   * @adminMethod
   */
  function bulkCreateProjectItems(projectId: string, options?: BulkCreateProjectItemsOptions): Promise<BulkCreateProjectItemsResponse>;
  interface BulkCreateProjectItemsOptions {
      /** Project items to create. */
      items: ProjectitemsItem[];
      /** Whether to include the created project items in the response. Set to `true` to receive the project items in the response. Default: `false` */
      returnFullEntity?: boolean | null;
  }
  /**
   * Retrieves a project item.
   * @param itemId - Project item ID.
   * @public
   * @documentationMaturity preview
   * @requiredField itemId
   * @permissionId PORTFOLIO.PROJECT_ITEM_READ
   * @returns Project item.
   */
  function getProjectItem(itemId: string, options?: GetProjectItemOptions): Promise<ProjectitemsItem>;
  interface GetProjectItemOptions {
      /**
       * @internal
       * @deprecated
       * @targetRemovalDate 2025-05-25
       */
      projectId?: string;
  }
  /**
   * Retrieves a list of all project items in the specified project.
   * @param projectId - Project ID.
   * @public
   * @documentationMaturity preview
   * @requiredField projectId
   * @permissionId PORTFOLIO.PROJECT_ITEM_READ
   */
  function listProjectItems(projectId: string, options?: ListProjectItemsOptions): Promise<ListProjectItemsResponse>;
  interface ListProjectItemsOptions {
      /** Maximum number of items to return in the results. */
      paging?: Paging$2;
  }
  /**
   * Query Collections using [WQL - Wix Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language)
   * supported only by projectId & id
   * internal usage only - should not be used, created for auto-db-driver only
   * @internal
   * @documentationMaturity preview
   * @permissionId PORTFOLIO.PROJECT_ITEM_READ
   */
  function queryProjectItems(): ItemsQueryBuilder;
  interface QueryOffsetResult {
      currentPage: number | undefined;
      totalPages: number | undefined;
      totalCount: number | undefined;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ItemsQueryResult extends QueryOffsetResult {
      items: ProjectitemsItem[];
      query: ItemsQueryBuilder;
      next: () => Promise<ItemsQueryResult>;
      prev: () => Promise<ItemsQueryResult>;
  }
  interface ItemsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'projectId' | '_id', value: any) => ItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id', value: any) => ItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id', value: string) => ItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id', value: any[]) => ItemsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id', value: any) => ItemsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id', value: boolean) => ItemsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ItemsQueryBuilder;
      /** @param skip - Number of items to skip in the query results before returning the results.
       * @documentationMaturity preview
       */
      skip: (skip: number) => ItemsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ItemsQueryResult>;
  }
  /**
   * Updates a project item.
   * @param _id - Project item ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField item
   * @permissionId PORTFOLIO.PROJECT_ITEM_UPDATE
   * @adminMethod
   * @returns The updated project item.
   */
  function updateProjectItem(_id: string | null, item: UpdateProjectItem, options?: UpdateProjectItemOptions): Promise<ProjectitemsItem>;
  interface UpdateProjectItem {
      /** Information about the Wix Media image. */
      image?: CommonImage$1;
      /** Information about the Wix Media video. */
      video?: CommonVideo;
      /** Project ID. */
      projectId?: string | null;
      /**
       * Project item ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Index that determines which position a project is displayed in the project.  <br />
       *
       * Default: [Epoch](https://www.epoch101.com/) timestamp. <br />
       */
      sortOrder?: number | null;
      /** Project item title. */
      title?: string | null;
      /** Project item description. */
      description?: string | null;
      /**
       * Project item data type.
       * @readonly
       */
      type?: ItemType;
      /**
       * Date and time the project item was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the project item was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Project item tags.
       * @internal
       */
      tags?: ProjectitemsTags;
      /** Project item link. */
      link?: Link;
  }
  interface UpdateProjectItemOptions {
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  /**
   * Updates multiple project items.
   * @param projectId - Project ID.
   * @public
   * @documentationMaturity preview
   * @requiredField options.items.item
   * @requiredField options.items.item._id
   * @requiredField projectId
   * @permissionId PORTFOLIO.PROJECT_ITEM_UPDATE
   * @adminMethod
   */
  function bulkUpdateProjectItems(projectId: string, options?: BulkUpdateProjectItemsOptions): Promise<BulkUpdateProjectItemsResponse>;
  interface BulkUpdateProjectItemsOptions {
      /** items to be updated. */
      items?: MaskedItem[];
      /** Whether to include the updated project items in the response. Set to `true` to receive the project items in the response. Default: `false` */
      returnFullEntity?: boolean | null;
  }
  /**
   * Deletes a project item.
   * @param itemId - ID of the project item to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField itemId
   * @permissionId PORTFOLIO.PROJECT_ITEM_DELETE
   * @adminMethod
   */
  function deleteProjectItem(itemId: string, options?: DeleteProjectItemOptions): Promise<DeleteProjectItemResponse>;
  interface DeleteProjectItemOptions {
      /**
       * @internal
       * @deprecated
       * @targetRemovalDate 2025-05-25
       */
      projectId?: string;
  }
  /**
   * Deletes multiple project items.
   * @param projectId - Project ID.
   * @public
   * @documentationMaturity preview
   * @requiredField options
   * @requiredField options.itemIds
   * @requiredField projectId
   * @permissionId PORTFOLIO.PROJECT_ITEM_DELETE
   * @adminMethod
   */
  function bulkDeleteProjectItems(projectId: string, options: BulkDeleteProjectItemsOptions): Promise<BulkDeleteProjectItemsResponse>;
  interface BulkDeleteProjectItemsOptions {
      /** Project item IDs. */
      itemIds: string[];
  }
  /**
   * Duplicates project items from one project (the origin) to another project (the target).
   *
   * <blockquote class="important">
   * <strong>Important:</strong>
   *
   * Both the origin and target projects must exist before calling this method.
   * </blockquote>
   * @param originProjectId - ID of the project containing the items to duplicate.
   * @public
   * @documentationMaturity preview
   * @requiredField options
   * @requiredField options.targetProjectId
   * @requiredField originProjectId
   * @permissionId PORTFOLIO.PROJECT_ITEM_CREATE
   * @adminMethod
   */
  function duplicateProjectItems(originProjectId: string, options: DuplicateProjectItemsOptions): Promise<DuplicateProjectItemsResponse>;
  interface DuplicateProjectItemsOptions {
      /** ID of the project where the duplicated items will be added. */
      targetProjectId: string;
  }
  
  type portfolioProjectItemsV1ProjectItem_universal_d_ProjectitemsItem = ProjectitemsItem;
  type portfolioProjectItemsV1ProjectItem_universal_d_ProjectitemsItemMetadataOneOf = ProjectitemsItemMetadataOneOf;
  type portfolioProjectItemsV1ProjectItem_universal_d_ItemType = ItemType;
  const portfolioProjectItemsV1ProjectItem_universal_d_ItemType: typeof ItemType;
  type portfolioProjectItemsV1ProjectItem_universal_d_CommonVideo = CommonVideo;
  type portfolioProjectItemsV1ProjectItem_universal_d_CommonVideoResolution = CommonVideoResolution;
  type portfolioProjectItemsV1ProjectItem_universal_d_ProjectitemsTags = ProjectitemsTags;
  type portfolioProjectItemsV1ProjectItem_universal_d_Link = Link;
  type portfolioProjectItemsV1ProjectItem_universal_d_GenerateTokenForProjectItemsRequest = GenerateTokenForProjectItemsRequest;
  type portfolioProjectItemsV1ProjectItem_universal_d_GenerateTokenForProjectItemsResponse = GenerateTokenForProjectItemsResponse;
  type portfolioProjectItemsV1ProjectItem_universal_d_ProjectItemMediaToken = ProjectItemMediaToken;
  type portfolioProjectItemsV1ProjectItem_universal_d_CreateProjectItemRequest = CreateProjectItemRequest;
  type portfolioProjectItemsV1ProjectItem_universal_d_CreateProjectItemResponse = CreateProjectItemResponse;
  type portfolioProjectItemsV1ProjectItem_universal_d_BulkCreateProjectItemsRequest = BulkCreateProjectItemsRequest;
  type portfolioProjectItemsV1ProjectItem_universal_d_BulkCreateProjectItemsResponse = BulkCreateProjectItemsResponse;
  type portfolioProjectItemsV1ProjectItem_universal_d_BulkCreateProjectItemResult = BulkCreateProjectItemResult;
  type portfolioProjectItemsV1ProjectItem_universal_d_GetProjectItemRequest = GetProjectItemRequest;
  type portfolioProjectItemsV1ProjectItem_universal_d_GetProjectItemResponse = GetProjectItemResponse;
  type portfolioProjectItemsV1ProjectItem_universal_d_ListProjectItemsRequest = ListProjectItemsRequest;
  type portfolioProjectItemsV1ProjectItem_universal_d_ListProjectItemsResponse = ListProjectItemsResponse;
  type portfolioProjectItemsV1ProjectItem_universal_d_QueryProjectItemsRequest = QueryProjectItemsRequest;
  type portfolioProjectItemsV1ProjectItem_universal_d_QueryProjectItemsResponse = QueryProjectItemsResponse;
  type portfolioProjectItemsV1ProjectItem_universal_d_UpdateProjectItemRequest = UpdateProjectItemRequest;
  type portfolioProjectItemsV1ProjectItem_universal_d_UpdateProjectItemResponse = UpdateProjectItemResponse;
  type portfolioProjectItemsV1ProjectItem_universal_d_BulkUpdateProjectItemsRequest = BulkUpdateProjectItemsRequest;
  type portfolioProjectItemsV1ProjectItem_universal_d_MaskedItem = MaskedItem;
  type portfolioProjectItemsV1ProjectItem_universal_d_BulkUpdateProjectItemsResponse = BulkUpdateProjectItemsResponse;
  type portfolioProjectItemsV1ProjectItem_universal_d_BulkUpdateProjectItemResult = BulkUpdateProjectItemResult;
  type portfolioProjectItemsV1ProjectItem_universal_d_DeleteProjectItemRequest = DeleteProjectItemRequest;
  type portfolioProjectItemsV1ProjectItem_universal_d_DeleteProjectItemResponse = DeleteProjectItemResponse;
  type portfolioProjectItemsV1ProjectItem_universal_d_BulkDeleteProjectItemsRequest = BulkDeleteProjectItemsRequest;
  type portfolioProjectItemsV1ProjectItem_universal_d_BulkDeleteProjectItemsResponse = BulkDeleteProjectItemsResponse;
  type portfolioProjectItemsV1ProjectItem_universal_d_BulkDeleteProjectItemResult = BulkDeleteProjectItemResult;
  type portfolioProjectItemsV1ProjectItem_universal_d_CreateProjectGalleryRequest = CreateProjectGalleryRequest;
  type portfolioProjectItemsV1ProjectItem_universal_d_CreateProjectGalleryResponse = CreateProjectGalleryResponse;
  type portfolioProjectItemsV1ProjectItem_universal_d_DuplicateProjectItemsRequest = DuplicateProjectItemsRequest;
  type portfolioProjectItemsV1ProjectItem_universal_d_DuplicateProjectItemsResponse = DuplicateProjectItemsResponse;
  const portfolioProjectItemsV1ProjectItem_universal_d_generateTokenForProjectItems: typeof generateTokenForProjectItems;
  const portfolioProjectItemsV1ProjectItem_universal_d_createProjectItem: typeof createProjectItem;
  const portfolioProjectItemsV1ProjectItem_universal_d_bulkCreateProjectItems: typeof bulkCreateProjectItems;
  type portfolioProjectItemsV1ProjectItem_universal_d_BulkCreateProjectItemsOptions = BulkCreateProjectItemsOptions;
  const portfolioProjectItemsV1ProjectItem_universal_d_getProjectItem: typeof getProjectItem;
  type portfolioProjectItemsV1ProjectItem_universal_d_GetProjectItemOptions = GetProjectItemOptions;
  const portfolioProjectItemsV1ProjectItem_universal_d_listProjectItems: typeof listProjectItems;
  type portfolioProjectItemsV1ProjectItem_universal_d_ListProjectItemsOptions = ListProjectItemsOptions;
  const portfolioProjectItemsV1ProjectItem_universal_d_queryProjectItems: typeof queryProjectItems;
  type portfolioProjectItemsV1ProjectItem_universal_d_ItemsQueryResult = ItemsQueryResult;
  type portfolioProjectItemsV1ProjectItem_universal_d_ItemsQueryBuilder = ItemsQueryBuilder;
  const portfolioProjectItemsV1ProjectItem_universal_d_updateProjectItem: typeof updateProjectItem;
  type portfolioProjectItemsV1ProjectItem_universal_d_UpdateProjectItem = UpdateProjectItem;
  type portfolioProjectItemsV1ProjectItem_universal_d_UpdateProjectItemOptions = UpdateProjectItemOptions;
  const portfolioProjectItemsV1ProjectItem_universal_d_bulkUpdateProjectItems: typeof bulkUpdateProjectItems;
  type portfolioProjectItemsV1ProjectItem_universal_d_BulkUpdateProjectItemsOptions = BulkUpdateProjectItemsOptions;
  const portfolioProjectItemsV1ProjectItem_universal_d_deleteProjectItem: typeof deleteProjectItem;
  type portfolioProjectItemsV1ProjectItem_universal_d_DeleteProjectItemOptions = DeleteProjectItemOptions;
  const portfolioProjectItemsV1ProjectItem_universal_d_bulkDeleteProjectItems: typeof bulkDeleteProjectItems;
  type portfolioProjectItemsV1ProjectItem_universal_d_BulkDeleteProjectItemsOptions = BulkDeleteProjectItemsOptions;
  const portfolioProjectItemsV1ProjectItem_universal_d_duplicateProjectItems: typeof duplicateProjectItems;
  type portfolioProjectItemsV1ProjectItem_universal_d_DuplicateProjectItemsOptions = DuplicateProjectItemsOptions;
  namespace portfolioProjectItemsV1ProjectItem_universal_d {
    export {
      portfolioProjectItemsV1ProjectItem_universal_d_ProjectitemsItem as ProjectitemsItem,
      portfolioProjectItemsV1ProjectItem_universal_d_ProjectitemsItemMetadataOneOf as ProjectitemsItemMetadataOneOf,
      portfolioProjectItemsV1ProjectItem_universal_d_ItemType as ItemType,
      CommonImage$1 as CommonImage,
      ImageImageType$1 as ImageImageType,
      CommonPoint$1 as CommonPoint,
      CommonUnsharpMasking$1 as CommonUnsharpMasking,
      portfolioProjectItemsV1ProjectItem_universal_d_CommonVideo as CommonVideo,
      portfolioProjectItemsV1ProjectItem_universal_d_CommonVideoResolution as CommonVideoResolution,
      portfolioProjectItemsV1ProjectItem_universal_d_ProjectitemsTags as ProjectitemsTags,
      portfolioProjectItemsV1ProjectItem_universal_d_Link as Link,
      portfolioProjectItemsV1ProjectItem_universal_d_GenerateTokenForProjectItemsRequest as GenerateTokenForProjectItemsRequest,
      portfolioProjectItemsV1ProjectItem_universal_d_GenerateTokenForProjectItemsResponse as GenerateTokenForProjectItemsResponse,
      portfolioProjectItemsV1ProjectItem_universal_d_ProjectItemMediaToken as ProjectItemMediaToken,
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
      InvalidateCache$1 as InvalidateCache,
      InvalidateCacheGetByOneOf$1 as InvalidateCacheGetByOneOf,
      App$1 as App,
      Page$1 as Page,
      URI$1 as URI,
      File$1 as File,
      portfolioProjectItemsV1ProjectItem_universal_d_CreateProjectItemRequest as CreateProjectItemRequest,
      portfolioProjectItemsV1ProjectItem_universal_d_CreateProjectItemResponse as CreateProjectItemResponse,
      portfolioProjectItemsV1ProjectItem_universal_d_BulkCreateProjectItemsRequest as BulkCreateProjectItemsRequest,
      portfolioProjectItemsV1ProjectItem_universal_d_BulkCreateProjectItemsResponse as BulkCreateProjectItemsResponse,
      portfolioProjectItemsV1ProjectItem_universal_d_BulkCreateProjectItemResult as BulkCreateProjectItemResult,
      ItemMetadata$1 as ItemMetadata,
      ApplicationError$1 as ApplicationError,
      BulkActionMetadata$1 as BulkActionMetadata,
      portfolioProjectItemsV1ProjectItem_universal_d_GetProjectItemRequest as GetProjectItemRequest,
      portfolioProjectItemsV1ProjectItem_universal_d_GetProjectItemResponse as GetProjectItemResponse,
      portfolioProjectItemsV1ProjectItem_universal_d_ListProjectItemsRequest as ListProjectItemsRequest,
      Paging$2 as Paging,
      portfolioProjectItemsV1ProjectItem_universal_d_ListProjectItemsResponse as ListProjectItemsResponse,
      PagingMetadataV2$3 as PagingMetadataV2,
      Cursors$3 as Cursors,
      portfolioProjectItemsV1ProjectItem_universal_d_QueryProjectItemsRequest as QueryProjectItemsRequest,
      QueryV2$2 as QueryV2,
      QueryV2PagingMethodOneOf$2 as QueryV2PagingMethodOneOf,
      Sorting$2 as Sorting,
      SortOrder$2 as SortOrder,
      CursorPaging$3 as CursorPaging,
      portfolioProjectItemsV1ProjectItem_universal_d_QueryProjectItemsResponse as QueryProjectItemsResponse,
      portfolioProjectItemsV1ProjectItem_universal_d_UpdateProjectItemRequest as UpdateProjectItemRequest,
      portfolioProjectItemsV1ProjectItem_universal_d_UpdateProjectItemResponse as UpdateProjectItemResponse,
      portfolioProjectItemsV1ProjectItem_universal_d_BulkUpdateProjectItemsRequest as BulkUpdateProjectItemsRequest,
      portfolioProjectItemsV1ProjectItem_universal_d_MaskedItem as MaskedItem,
      portfolioProjectItemsV1ProjectItem_universal_d_BulkUpdateProjectItemsResponse as BulkUpdateProjectItemsResponse,
      portfolioProjectItemsV1ProjectItem_universal_d_BulkUpdateProjectItemResult as BulkUpdateProjectItemResult,
      portfolioProjectItemsV1ProjectItem_universal_d_DeleteProjectItemRequest as DeleteProjectItemRequest,
      portfolioProjectItemsV1ProjectItem_universal_d_DeleteProjectItemResponse as DeleteProjectItemResponse,
      portfolioProjectItemsV1ProjectItem_universal_d_BulkDeleteProjectItemsRequest as BulkDeleteProjectItemsRequest,
      portfolioProjectItemsV1ProjectItem_universal_d_BulkDeleteProjectItemsResponse as BulkDeleteProjectItemsResponse,
      portfolioProjectItemsV1ProjectItem_universal_d_BulkDeleteProjectItemResult as BulkDeleteProjectItemResult,
      portfolioProjectItemsV1ProjectItem_universal_d_CreateProjectGalleryRequest as CreateProjectGalleryRequest,
      portfolioProjectItemsV1ProjectItem_universal_d_CreateProjectGalleryResponse as CreateProjectGalleryResponse,
      Empty$2 as Empty,
      DeletedProjectRestored$1 as DeletedProjectRestored,
      portfolioProjectItemsV1ProjectItem_universal_d_DuplicateProjectItemsRequest as DuplicateProjectItemsRequest,
      portfolioProjectItemsV1ProjectItem_universal_d_DuplicateProjectItemsResponse as DuplicateProjectItemsResponse,
      portfolioProjectItemsV1ProjectItem_universal_d_generateTokenForProjectItems as generateTokenForProjectItems,
      portfolioProjectItemsV1ProjectItem_universal_d_createProjectItem as createProjectItem,
      portfolioProjectItemsV1ProjectItem_universal_d_bulkCreateProjectItems as bulkCreateProjectItems,
      portfolioProjectItemsV1ProjectItem_universal_d_BulkCreateProjectItemsOptions as BulkCreateProjectItemsOptions,
      portfolioProjectItemsV1ProjectItem_universal_d_getProjectItem as getProjectItem,
      portfolioProjectItemsV1ProjectItem_universal_d_GetProjectItemOptions as GetProjectItemOptions,
      portfolioProjectItemsV1ProjectItem_universal_d_listProjectItems as listProjectItems,
      portfolioProjectItemsV1ProjectItem_universal_d_ListProjectItemsOptions as ListProjectItemsOptions,
      portfolioProjectItemsV1ProjectItem_universal_d_queryProjectItems as queryProjectItems,
      portfolioProjectItemsV1ProjectItem_universal_d_ItemsQueryResult as ItemsQueryResult,
      portfolioProjectItemsV1ProjectItem_universal_d_ItemsQueryBuilder as ItemsQueryBuilder,
      portfolioProjectItemsV1ProjectItem_universal_d_updateProjectItem as updateProjectItem,
      portfolioProjectItemsV1ProjectItem_universal_d_UpdateProjectItem as UpdateProjectItem,
      portfolioProjectItemsV1ProjectItem_universal_d_UpdateProjectItemOptions as UpdateProjectItemOptions,
      portfolioProjectItemsV1ProjectItem_universal_d_bulkUpdateProjectItems as bulkUpdateProjectItems,
      portfolioProjectItemsV1ProjectItem_universal_d_BulkUpdateProjectItemsOptions as BulkUpdateProjectItemsOptions,
      portfolioProjectItemsV1ProjectItem_universal_d_deleteProjectItem as deleteProjectItem,
      portfolioProjectItemsV1ProjectItem_universal_d_DeleteProjectItemOptions as DeleteProjectItemOptions,
      portfolioProjectItemsV1ProjectItem_universal_d_bulkDeleteProjectItems as bulkDeleteProjectItems,
      portfolioProjectItemsV1ProjectItem_universal_d_BulkDeleteProjectItemsOptions as BulkDeleteProjectItemsOptions,
      portfolioProjectItemsV1ProjectItem_universal_d_duplicateProjectItems as duplicateProjectItems,
      portfolioProjectItemsV1ProjectItem_universal_d_DuplicateProjectItemsOptions as DuplicateProjectItemsOptions,
    };
  }
  
  interface Project$1 extends ProjectCoverOneOf$1 {
      /** Project cover image. */
      coverImage?: CommonImage;
      /** Project cover video. */
      coverVideo?: Video$1;
      /**
       * Project ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the project is updated. To prevent conflicting changes, the existing revision must be passed when updating the project object.
       * @readonly
       */
      revision?: string | null;
      /** Project title. */
      title?: string | null;
      /** Project description. */
      description?: string | null;
      /** Whether the project is hidden from the portfolio. Default: `false` */
      hidden?: boolean | null;
      /** IDs of the collections that include the project. */
      collectionIds?: string[];
      /** Project details. */
      details?: ProjectDetail$1[];
      /** Project slug. */
      slug?: string | null;
      /**
       * Date and time the project was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the project was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * project source - When project is synced from external platform, this field will represent the app & source the projects synced from.
       * @internal
       */
      source?: ProjectSource$1;
      /**
       * Project page URL and and relative path. Returned when `includePageUrl` is `true` in the request.
       * @readonly
       */
      url?: string;
      /** Project SEO data. */
      seoData?: SeoSchema$1;
      /**
       * Whether the project is synced to an external platform and will receive daily updates.
       * @internal
       * @readonly
       */
      syncedProject?: boolean | null;
  }
  /** @oneof */
  interface ProjectCoverOneOf$1 {
      /** Project cover image. */
      coverImage?: CommonImage;
      /** Project cover video. */
      coverVideo?: Video$1;
  }
  interface CommonImage {
      /**
       * @internal
       * @deprecated
       */
      type?: ImageImageType;
      /** Information about the Wix Media image. */
      imageInfo?: string;
      /** Focal point of the image. */
      focalPoint?: CommonPoint;
      /**
       * Set of key-value pairs describing the media in [Exchangeable Image File format](https://en.wikipedia.org/wiki/Exif).
       * @internal
       */
      exif?: Record<string, any> | null;
      /**
       * Image compression level. <br />
       *
       * Min: `30` <br />
       * Max: `100`
       * @internal
       */
      quality?: number | null;
      /**
       * [Unsharp masking](https://en.wikipedia.org/wiki/Unsharp_masking) values of the image.
       * @internal
       */
      unsharpMasking?: CommonUnsharpMasking;
      /**
       * Whether the image is saved in secure media.
       * @internal
       */
      secure?: boolean | null;
      /**
       * When image is saved in secure media, token is generated.
       * @internal
       * @readonly
       */
      token?: string | null;
  }
  enum ImageImageType {
      UNDEFINED = "UNDEFINED",
      WIX_MEDIA = "WIX_MEDIA",
      EXTERNAL = "EXTERNAL"
  }
  interface CommonPoint {
      /** X-coordinate of the focal point. */
      x?: number;
      /** Y-coordinate of the focal point. */
      y?: number;
  }
  interface CommonUnsharpMasking {
      /**
       * Unsharp masking amount. Controls the sharpening strength. <br />
       *
       * Min: `0` <br />
       * Max: `5`
       */
      amount?: number | null;
      /** Unsharp masking radius in pixels. Controls the sharpening width. */
      radius?: number | null;
      /**
       * Unsharp masking threshold. Controls how different neighboring pixels must be for shapening to apply. <br />
       *
       * Min: `0` <br />
       * Max: `1`
       */
      threshold?: number | null;
  }
  interface Video$1 {
      /** Information about the Wix Media video. */
      videoInfo?: string;
      /** Manually defined Video duration in milliseconds. */
      durationInMillis?: number | null;
  }
  interface VideoResolution$1 {
      /** Video URL.  Required. */
      url?: string;
      /** Video height. Required. */
      height?: number;
      /** Video width.  Required. */
      width?: number;
      /**
       * Video poster. Deprecated, please use the `posters` property in the parent entity
       * @internal
       * @deprecated
       */
      poster?: string;
      /** Video format for example, mp4, hls.  Required. */
      format?: string;
      /** Video quality for example 480p, 720p. */
      quality?: string | null;
      /** Video filename. */
      filename?: string | null;
  }
  /**
   * Project label.
   * One of:
   * + `text`
   * + `link`
   */
  interface ProjectDetail$1 extends ProjectDetailValueOneOf$1 {
      /** Project label in plain text format. */
      text?: string;
      /** Project label in link format. */
      link?: DetailsLink$1;
      /** Project label. */
      label?: string;
  }
  /** @oneof */
  interface ProjectDetailValueOneOf$1 {
      /** Project label in plain text format. */
      text?: string;
      /** Project label in link format. */
      link?: DetailsLink$1;
  }
  interface DetailsLink$1 {
      /** Display text of the link. */
      text?: string | null;
      /** Target URL of the link. */
      url?: string | null;
      /**
       * Whether the link opens in a new tab or window. One of:
       * * `'_blank'`: The link opens in a new tab or window.
       * * `'_self'`: The link opens in the same tab or window.
       */
      target?: string | null;
  }
  interface ProjectSource$1 {
      /** App definition id */
      appDefId?: string;
      /** External source id */
      externalId?: string;
      /** Source name */
      sourceName?: string;
      /** Source description */
      description?: string | null;
      /** link to external source */
      link?: string | null;
      /** Sync status */
      syncStatus?: SyncStatus$2;
      /** fields that are synced from external source, should be blocked to update in UI */
      notEditableFields?: string[];
      /** last date the project was synced */
      lastSync?: Date | null;
  }
  enum SyncStatus$2 {
      SYNCED = "SYNCED",
      SYNCING = "SYNCING",
      NOT_SYNCED = "NOT_SYNCED"
  }
  /**
   * The SEO schema object contains data about different types of meta tags. It makes sure that the information about your page is presented properly to search engines.
   * The search engines use this information for ranking purposes, or to display snippets in the search results.
   * This data will override other sources of tags (for example patterns) and will be included in the <head> section of the HTML document, while not being displayed on the page itself.
   */
  interface SeoSchema$1 {
      /** SEO tag information. */
      tags?: Tag$1[];
      /** SEO general settings. */
      settings?: Settings$1;
  }
  interface Keyword$1 {
      /** Keyword value. */
      term?: string;
      /** Whether the keyword is the main focus keyword. */
      isMain?: boolean;
      /** The source that added the keyword terms to the SEO settings. */
      origin?: string | null;
  }
  interface Tag$1 {
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
  interface Settings$1 {
      /**
       * Whether the Auto Redirect feature, which creates `301 redirects` on a slug change, is enabled.
       *
       *
       * Default: `false` (Auto Redirect is enabled.)
       */
      preventAutoRedirect?: boolean;
      /** User-selected keyword terms for a specific page. */
      keywords?: Keyword$1[];
  }
  interface MenuSettingUpdatedEvent {
  }
  interface GetProjectPageDataRequest {
      /** Slug of the project's current collection */
      collectionSlug: string;
      /** Project's slug */
      projectSlug: string;
  }
  interface GetProjectPageDataResponse {
      /** Project data */
      project?: Project$1;
      /** Previous project slug */
      previousProject?: ProjectSlug;
      /** Next project slug */
      nextProject?: ProjectSlug;
  }
  interface ProjectSlug {
      /** Project id */
      projectId?: string;
      /** Project slug */
      slug?: string;
  }
  interface CreateNewPortfolioAppRequest {
  }
  interface CreateNewPortfolioAppResponse {
  }
  interface MetaSiteSpecialEvent$1 extends MetaSiteSpecialEventPayloadOneOf$1 {
      /** Emitted on a meta site creation. */
      siteCreated?: SiteCreated$1;
      /** Emitted on a meta site transfer completion. */
      siteTransferred?: SiteTransferred$1;
      /** Emitted on a meta site deletion. */
      siteDeleted?: SiteDeleted$1;
      /** Emitted on a meta site restoration. */
      siteUndeleted?: SiteUndeleted$1;
      /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
      sitePublished?: SitePublished$1;
      /** Emitted on a meta site unpublish. */
      siteUnpublished?: SiteUnpublished$1;
      /** Emitted when meta site is marked as template. */
      siteMarkedAsTemplate?: SiteMarkedAsTemplate$1;
      /** Emitted when meta site is marked as a WixSite. */
      siteMarkedAsWixSite?: SiteMarkedAsWixSite$1;
      /** Emitted when an application is provisioned (installed). */
      serviceProvisioned?: ServiceProvisioned$1;
      /** Emitted when an application is removed (uninstalled). */
      serviceRemoved?: ServiceRemoved$1;
      /** Emitted when meta site name (URL slug) is changed. */
      siteRenamedPayload?: SiteRenamed$1;
      /** Emitted when meta site was permanently deleted. */
      hardDeleted?: SiteHardDeleted$1;
      /** Emitted on a namespace change. */
      namespaceChanged?: NamespaceChanged$1;
      /** Emitted when Studio is attached. */
      studioAssigned?: StudioAssigned$1;
      /** Emitted when Studio is detached. */
      studioUnassigned?: StudioUnassigned$1;
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
      assets?: Asset$1[];
  }
  /** @oneof */
  interface MetaSiteSpecialEventPayloadOneOf$1 {
      /** Emitted on a meta site creation. */
      siteCreated?: SiteCreated$1;
      /** Emitted on a meta site transfer completion. */
      siteTransferred?: SiteTransferred$1;
      /** Emitted on a meta site deletion. */
      siteDeleted?: SiteDeleted$1;
      /** Emitted on a meta site restoration. */
      siteUndeleted?: SiteUndeleted$1;
      /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
      sitePublished?: SitePublished$1;
      /** Emitted on a meta site unpublish. */
      siteUnpublished?: SiteUnpublished$1;
      /** Emitted when meta site is marked as template. */
      siteMarkedAsTemplate?: SiteMarkedAsTemplate$1;
      /** Emitted when meta site is marked as a WixSite. */
      siteMarkedAsWixSite?: SiteMarkedAsWixSite$1;
      /** Emitted when an application is provisioned (installed). */
      serviceProvisioned?: ServiceProvisioned$1;
      /** Emitted when an application is removed (uninstalled). */
      serviceRemoved?: ServiceRemoved$1;
      /** Emitted when meta site name (URL slug) is changed. */
      siteRenamedPayload?: SiteRenamed$1;
      /** Emitted when meta site was permanently deleted. */
      hardDeleted?: SiteHardDeleted$1;
      /** Emitted on a namespace change. */
      namespaceChanged?: NamespaceChanged$1;
      /** Emitted when Studio is attached. */
      studioAssigned?: StudioAssigned$1;
      /** Emitted when Studio is detached. */
      studioUnassigned?: StudioUnassigned$1;
  }
  interface Asset$1 {
      /** An application definition id (app_id in dev-center). For legacy reasons may be UUID or a string (from Java Enum). */
      appDefId?: string;
      /** An instance id. For legacy reasons may be UUID or a string. */
      instanceId?: string;
      /** An application state. */
      state?: State$1;
  }
  enum State$1 {
      UNKNOWN = "UNKNOWN",
      ENABLED = "ENABLED",
      DISABLED = "DISABLED",
      PENDING = "PENDING",
      DEMO = "DEMO"
  }
  interface SiteCreated$1 {
      /** A template identifier (empty if not created from a template). */
      originTemplateId?: string;
      /** An account id of the owner. */
      ownerId?: string;
      /** A context in which meta site was created. */
      context?: SiteCreatedContext$1;
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
      namespace?: Namespace$1;
  }
  enum SiteCreatedContext$1 {
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
  enum Namespace$1 {
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
  interface SiteTransferred$1 {
      /** A previous owner id (user that transfers meta site). */
      oldOwnerId?: string;
      /** A new owner id (user that accepts meta site). */
      newOwnerId?: string;
  }
  /** Soft deletion of the meta site. Could be restored. */
  interface SiteDeleted$1 {
      /** A deletion context. */
      deleteContext?: DeleteContext$1;
  }
  interface DeleteContext$1 {
      /** When the meta site was deleted. */
      dateDeleted?: Date | null;
      /** A status. */
      deleteStatus?: DeleteStatus$1;
      /** A reason (flow). */
      deleteOrigin?: string;
      /** A service that deleted it. */
      initiatorId?: string | null;
  }
  enum DeleteStatus$1 {
      UNKNOWN = "UNKNOWN",
      TRASH = "TRASH",
      DELETED = "DELETED",
      PENDING_PURGE = "PENDING_PURGE"
  }
  /** Restoration of the meta site. */
  interface SiteUndeleted$1 {
  }
  /** First publish of a meta site. Or subsequent publish after unpublish. */
  interface SitePublished$1 {
  }
  interface SiteUnpublished$1 {
      /** A list of URLs previously associated with the meta site. */
      urls?: string[];
  }
  interface SiteMarkedAsTemplate$1 {
  }
  interface SiteMarkedAsWixSite$1 {
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
  interface ServiceProvisioned$1 {
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
  interface ServiceRemoved$1 {
      /** Either UUID or EmbeddedServiceType. */
      appDefId?: string;
      /** Not only UUID. Something here could be something weird. */
      instanceId?: string;
      /** A version. */
      version?: string | null;
  }
  /** Rename of the site. Meaning, free public url has been changed as well. */
  interface SiteRenamed$1 {
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
  interface SiteHardDeleted$1 {
      /** A deletion context. */
      deleteContext?: DeleteContext$1;
  }
  interface NamespaceChanged$1 {
      /** A previous namespace. */
      oldNamespace?: Namespace$1;
      /** A new namespace. */
      newNamespace?: Namespace$1;
  }
  /** Assigned Studio editor */
  interface StudioAssigned$1 {
  }
  /** Unassigned Studio editor */
  interface StudioUnassigned$1 {
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
  interface SyncProjectWithCollectionMappings {
      /** Id of recently updated Project */
      projectId?: string;
      /** fields that were updated in the given project */
      fieldMaskPaths?: string[];
  }
  interface DeletedProjectRestored {
      /** the id of the project that was restored */
      projectId?: string;
      /** timestamp for when the project was originally deleted. */
      deletionTimestamp?: Date | null;
  }
  interface CreateProjectRequest {
      /** Project to create. */
      project: Project$1;
  }
  interface CreateProjectResponse {
      /** Created project. */
      project?: Project$1;
  }
  interface GetProjectRequest {
      /** ID of the project to retrieve. */
      projectId: string;
      /** Whether to include the project's relative path and full URL in the response. Default: `false` */
      includePageUrl?: boolean | null;
  }
  interface GetProjectResponse {
      /** The requested project. */
      project?: Project$1;
  }
  interface ListProjectsRequest {
      /** Projects limit per response is maximum 100, In the first request the cursor is None ? */
      paging?: CursorPaging$2;
      /** Whether to include the project's relative path and full URL in the response. Default: `false` */
      includePageUrl?: boolean | null;
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
  interface ListProjectsResponse {
      /** List of projects. */
      projects?: Project$1[];
      /**
       * Paging metadata.
       * @internal
       * @deprecated
       */
      pagingMetadataV2?: PagingMetadataV2$2;
      /** Paging metadata. */
      metadata?: PagingMetadataV2$2;
  }
  interface PagingMetadataV2$2 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
      total?: number | null;
      /** Flag that indicates the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
      cursors?: Cursors$2;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface Cursors$2 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface UpdateProjectRequest {
      /** Project to update. */
      project: Project$1;
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  interface UpdateProjectResponse {
      /** Updated project. */
      project?: Project$1;
  }
  interface BulkUpdateProjectsRequest {
      /** Projects to update. */
      projects?: MaskedProject[];
      /** Whether to include the updated projects in the response. Set to `true` to receive the projects in the response. Default: `false` */
      returnFullEntity?: boolean | null;
  }
  interface MaskedProject {
      /** Project to update. */
      project?: Project$1;
      /**
       * Explicit list of fields to update
       * @internal
       */
      fieldMask?: string[];
  }
  interface BulkUpdateProjectsResponse {
      /** Items created by bulk action. */
      results?: BulkUpdateProjectsResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkUpdateProjectsResult {
      /** Item metadata. */
      itemMetadata?: ItemMetadata;
      /** Updated project. */
      project?: Project$1;
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
  interface DeleteProjectRequest {
      /** ID of the project to delete. */
      projectId: string;
      /**
       * The revision of the Project
       * @internal
       * @deprecated
       */
      revision?: string;
  }
  interface DeleteProjectResponse {
      /** ID of the deleted project. */
      projectId?: string;
  }
  interface QueryProjectsRequest {
      /** Query options. */
      query: QueryV2$1;
      /** Whether to include the project's relative path and full URL in the response. Default: `false` */
      includePageUrl?: boolean | null;
  }
  interface QueryV2$1 extends QueryV2PagingMethodOneOf$1 {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$1;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$2;
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
      /** Array of projected fields. A list of specific field names to return. If `fieldsets` are also specified, the union of `fieldsets` and `fields` is returned. */
      fields?: string[];
      /** Array of named, predefined sets of projected fields. A array of predefined named sets of fields to be returned. Specifying multiple `fieldsets` will return the union of fields from all sets. If `fields` are also specified, the union of `fieldsets` and `fields` is returned. */
      fieldsets?: string[];
  }
  /** @oneof */
  interface QueryV2PagingMethodOneOf$1 {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$1;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$2;
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
  interface Paging$1 {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface QueryProjectsResponse {
      /** List of projects. */
      projects?: Project$1[];
      /**
       * Paging metadata.
       * @internal
       * @deprecated
       */
      pagingMetadataV2?: PagingMetadataV2$2;
      /** Paging metadata. */
      metadata?: PagingMetadataV2$2;
  }
  interface UpdateProjectOrderInCollectionRequest$1 {
      /** ID of the project to update. */
      projectId: string;
      /** Collection ID. */
      collectionId: string;
      /** Index that determines the placement of a project within the collection. */
      sortOrder: number | null;
  }
  interface UpdateProjectOrderInCollectionResponse$1 {
      /**
       * @internal
       * @deprecated
       */
      project?: ProjectsInCollections$1;
      /** Updated project placement within the specified collection. */
      projectInCollection?: ProjectsInCollections$1;
  }
  interface ProjectsInCollections$1 {
      /** Collection ID. */
      collectionId?: string;
      /** Project object. */
      project?: Project$1;
      /**
       * Index that determines the placement of a project within the collection.  <br />
       *
       * Default: [Epoch](https://www.epoch101.com/) timestamp. <br />
       */
      sortOrder?: number | null;
      /**
       * Project placement ID.
       * @readonly
       */
      _id?: string | null;
  }
  interface QueryProjectWithCollectionInfoRequest {
      /** WQL expression */
      query: QueryV2$1;
      /** Include page url */
      includePageUrl?: boolean | null;
  }
  interface QueryProjectWithCollectionInfoResponse {
      /** The retrieved Projects in Collection */
      projects?: ProjectsInCollections$1[];
      /**
       * Paging metadata
       * @internal
       * @deprecated
       */
      pagingMetadataV2?: PagingMetadataV2$2;
      /** Paging metadata */
      metadata?: PagingMetadataV2$2;
  }
  interface RestoreProjectFromTrashBinRequest {
      /** id of deleted project to restore from trash bin. */
      projectId: string;
  }
  interface RestoreProjectFromTrashBinResponse {
      /** project that was restored from trash bin */
      project?: Project$1;
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
  /**
   * Get project data for a specific project
   * @internal
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.collectionSlug
   * @requiredField identifiers.projectSlug
   * @permissionId PORTFOLIO.PROJECT_READ
   */
  function getProjectPageData(identifiers: GetProjectPageDataIdentifiers): Promise<GetProjectPageDataResponse>;
  interface GetProjectPageDataIdentifiers {
      /** Slug of the project's current collection */
      collectionSlug: string;
      /** Project's slug */
      projectSlug: string;
  }
  /**
   * create default Portfolio data
   * @internal
   * @documentationMaturity preview
   * @permissionId PORTFOLIO.PROJECT_CREATE
   * @adminMethod
   */
  function createNewPortfolioApp(): Promise<void>;
  /**
   * Creates a project.
   * @param project - Project to create.
   * @public
   * @documentationMaturity preview
   * @requiredField project
   * @permissionId PORTFOLIO.PROJECT_CREATE
   * @adminMethod
   * @returns Created project.
   */
  function createProject(project: Project$1): Promise<Project$1>;
  /**
   * Retrieves a project.
   * @param projectId - ID of the project to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField projectId
   * @permissionId PORTFOLIO.PROJECT_READ
   * @returns The requested project.
   */
  function getProject(projectId: string, options?: GetProjectOptions): Promise<Project$1>;
  interface GetProjectOptions {
      /** Whether to include the project's relative path and full URL in the response. Default: `false` */
      includePageUrl?: boolean | null;
  }
  /**
   * Retrieves a list of all projects in a portfolio.
   * @public
   * @documentationMaturity preview
   * @permissionId PORTFOLIO.PROJECT_READ
   */
  function listProjects(options?: ListProjectsOptions): Promise<ListProjectsResponse>;
  interface ListProjectsOptions {
      /** Projects limit per response is maximum 100, In the first request the cursor is None ? */
      paging?: CursorPaging$2;
      /** Whether to include the project's relative path and full URL in the response. Default: `false` */
      includePageUrl?: boolean | null;
  }
  /**
   * Updates a project.
   * @param _id - Project ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField project
   * @requiredField project.revision
   * @permissionId PORTFOLIO.PROJECT_UPDATE
   * @adminMethod
   * @returns Updated project.
   */
  function updateProject(_id: string | null, project: UpdateProject, options?: UpdateProjectOptions): Promise<Project$1>;
  interface UpdateProject {
      /** Project cover image. */
      coverImage?: CommonImage;
      /** Project cover video. */
      coverVideo?: Video$1;
      /**
       * Project ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the project is updated. To prevent conflicting changes, the existing revision must be passed when updating the project object.
       * @readonly
       */
      revision?: string | null;
      /** Project title. */
      title?: string | null;
      /** Project description. */
      description?: string | null;
      /** Whether the project is hidden from the portfolio. Default: `false` */
      hidden?: boolean | null;
      /** IDs of the collections that include the project. */
      collectionIds?: string[];
      /** Project details. */
      details?: ProjectDetail$1[];
      /** Project slug. */
      slug?: string | null;
      /**
       * Date and time the project was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the project was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * project source - When project is synced from external platform, this field will represent the app & source the projects synced from.
       * @internal
       */
      source?: ProjectSource$1;
      /**
       * Project page URL and and relative path. Returned when `includePageUrl` is `true` in the request.
       * @readonly
       */
      url?: string;
      /** Project SEO data. */
      seoData?: SeoSchema$1;
      /**
       * Whether the project is synced to an external platform and will receive daily updates.
       * @internal
       * @readonly
       */
      syncedProject?: boolean | null;
  }
  interface UpdateProjectOptions {
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  /**
   * Updates multiple projects.
   * @public
   * @documentationMaturity preview
   * @requiredField options.projects.project
   * @requiredField options.projects.project._id
   * @requiredField options.projects.project.revision
   * @permissionId PORTFOLIO.PROJECT_UPDATE
   * @adminMethod
   */
  function bulkUpdateProjects(options?: BulkUpdateProjectsOptions): Promise<BulkUpdateProjectsResponse>;
  interface BulkUpdateProjectsOptions {
      /** Projects to update. */
      projects?: MaskedProject[];
      /** Whether to include the updated projects in the response. Set to `true` to receive the projects in the response. Default: `false` */
      returnFullEntity?: boolean | null;
  }
  /**
   * Deletes a project.
   * @param projectId - ID of the project to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField projectId
   * @permissionId PORTFOLIO.PROJECT_DELETE
   * @adminMethod
   */
  function deleteProject(projectId: string, options?: DeleteProjectOptions): Promise<DeleteProjectResponse>;
  interface DeleteProjectOptions {
      /**
       * The revision of the Project
       * @internal
       * @deprecated
       */
      revision?: string;
  }
  /**
   * Retrieves a list of projects, given the provided paging, filtering, and sorting. Up to 100 projects can be returned per request.
   *
   * The default `sort` is `id` in `ASC`.
   *
   * For a detailed list of supported operations, see [Projects: Supported Filters and Sorting](https://dev.wix.com/docs/rest/business-solutions/portfolio/projects/sort-and-filter).
   * To learn how to query projects, see [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language).
   * @public
   * @documentationMaturity preview
   * @permissionId PORTFOLIO.PROJECT_READ
   */
  function queryProjects(options?: QueryProjectsOptions): ProjectsQueryBuilder;
  interface QueryProjectsOptions {
      /** Whether to include the project's relative path and full URL in the response. Default: `false` */
      includePageUrl?: boolean | null | undefined;
  }
  interface QueryCursorResult$1 {
      cursors: Cursors$2;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ProjectsQueryResult extends QueryCursorResult$1 {
      items: Project$1[];
      query: ProjectsQueryBuilder;
      next: () => Promise<ProjectsQueryResult>;
      prev: () => Promise<ProjectsQueryResult>;
  }
  interface ProjectsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | 'title' | 'description' | 'hidden' | 'collectionIds' | 'slug' | '_createdDate' | '_updatedDate', value: any) => ProjectsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | 'title' | 'description' | 'hidden' | 'collectionIds' | 'slug' | '_createdDate' | '_updatedDate', value: any) => ProjectsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => ProjectsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ProjectsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => ProjectsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ProjectsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'title' | 'description' | 'slug', value: string) => ProjectsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | 'title' | 'description' | 'hidden' | 'collectionIds' | 'slug' | '_createdDate' | '_updatedDate', value: any[]) => ProjectsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasAll: (propertyName: 'collectionIds', value: any[]) => ProjectsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'title' | 'description' | 'hidden' | 'collectionIds' | 'slug' | '_createdDate' | '_updatedDate', value: any) => ProjectsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | 'title' | 'description' | 'hidden' | 'collectionIds' | 'slug' | '_createdDate' | '_updatedDate', value: boolean) => ProjectsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | 'title' | 'description' | 'slug' | '_createdDate' | '_updatedDate'>) => ProjectsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | 'title' | 'description' | 'slug' | '_createdDate' | '_updatedDate'>) => ProjectsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ProjectsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ProjectsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ProjectsQueryResult>;
  }
  /**
   * Deprecated - please use ProjectsInCollectionsService.UpdateProjectOrderInCollection instead
   * our Client still use it
   * @param sortOrder - Index that determines the placement of a project within the collection.
   * @public
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.collectionId
   * @requiredField identifiers.projectId
   * @requiredField sortOrder
   * @permissionId PORTFOLIO.PROJECT_UPDATE
   * @adminMethod
   * @deprecated
   */
  function updateProjectOrderInCollection$1(identifiers: UpdateProjectOrderInCollectionIdentifiers$1, sortOrder: number | null): Promise<UpdateProjectOrderInCollectionResponse$1>;
  interface UpdateProjectOrderInCollectionIdentifiers$1 {
      /** ID of the project to update. */
      projectId: string;
      /** Collection ID. */
      collectionId: string;
  }
  /**
   * Deprecated - please use ProjectsInCollectionsService.QueryProjectsInCollections instead
   * our Client still use it
   * @param query - WQL expression
   * @public
   * @documentationMaturity preview
   * @requiredField query
   * @permissionId PORTFOLIO.PROJECT_READ
   * @deprecated
   */
  function queryProjectsWithCollectionInfo(query: QueryV2$1, options?: QueryProjectsWithCollectionInfoOptions): Promise<QueryProjectWithCollectionInfoResponse>;
  interface QueryProjectsWithCollectionInfoOptions {
      /** Include page url */
      includePageUrl?: boolean | null;
  }
  /**
   * Restore from trash bin a project that was deleted. Will lead to restoring Project's items as well.
   * @param projectId - id of deleted project to restore from trash bin.
   * @internal
   * @documentationMaturity preview
   * @requiredField projectId
   * @permissionId PORTFOLIO.PROJECT_CREATE
   * @adminMethod
   */
  function restoreProjectFromTrashBin(projectId: string): Promise<RestoreProjectFromTrashBinResponse>;
  
  type portfolioProjectsV1Project_universal_d_CommonImage = CommonImage;
  type portfolioProjectsV1Project_universal_d_ImageImageType = ImageImageType;
  const portfolioProjectsV1Project_universal_d_ImageImageType: typeof ImageImageType;
  type portfolioProjectsV1Project_universal_d_CommonPoint = CommonPoint;
  type portfolioProjectsV1Project_universal_d_CommonUnsharpMasking = CommonUnsharpMasking;
  type portfolioProjectsV1Project_universal_d_MenuSettingUpdatedEvent = MenuSettingUpdatedEvent;
  type portfolioProjectsV1Project_universal_d_GetProjectPageDataRequest = GetProjectPageDataRequest;
  type portfolioProjectsV1Project_universal_d_GetProjectPageDataResponse = GetProjectPageDataResponse;
  type portfolioProjectsV1Project_universal_d_ProjectSlug = ProjectSlug;
  type portfolioProjectsV1Project_universal_d_CreateNewPortfolioAppRequest = CreateNewPortfolioAppRequest;
  type portfolioProjectsV1Project_universal_d_CreateNewPortfolioAppResponse = CreateNewPortfolioAppResponse;
  type portfolioProjectsV1Project_universal_d_InvalidateCache = InvalidateCache;
  type portfolioProjectsV1Project_universal_d_InvalidateCacheGetByOneOf = InvalidateCacheGetByOneOf;
  type portfolioProjectsV1Project_universal_d_App = App;
  type portfolioProjectsV1Project_universal_d_Page = Page;
  type portfolioProjectsV1Project_universal_d_URI = URI;
  type portfolioProjectsV1Project_universal_d_File = File;
  type portfolioProjectsV1Project_universal_d_SyncProjectWithCollectionMappings = SyncProjectWithCollectionMappings;
  type portfolioProjectsV1Project_universal_d_DeletedProjectRestored = DeletedProjectRestored;
  type portfolioProjectsV1Project_universal_d_CreateProjectRequest = CreateProjectRequest;
  type portfolioProjectsV1Project_universal_d_CreateProjectResponse = CreateProjectResponse;
  type portfolioProjectsV1Project_universal_d_GetProjectRequest = GetProjectRequest;
  type portfolioProjectsV1Project_universal_d_GetProjectResponse = GetProjectResponse;
  type portfolioProjectsV1Project_universal_d_ListProjectsRequest = ListProjectsRequest;
  type portfolioProjectsV1Project_universal_d_ListProjectsResponse = ListProjectsResponse;
  type portfolioProjectsV1Project_universal_d_UpdateProjectRequest = UpdateProjectRequest;
  type portfolioProjectsV1Project_universal_d_UpdateProjectResponse = UpdateProjectResponse;
  type portfolioProjectsV1Project_universal_d_BulkUpdateProjectsRequest = BulkUpdateProjectsRequest;
  type portfolioProjectsV1Project_universal_d_MaskedProject = MaskedProject;
  type portfolioProjectsV1Project_universal_d_BulkUpdateProjectsResponse = BulkUpdateProjectsResponse;
  type portfolioProjectsV1Project_universal_d_BulkUpdateProjectsResult = BulkUpdateProjectsResult;
  type portfolioProjectsV1Project_universal_d_ItemMetadata = ItemMetadata;
  type portfolioProjectsV1Project_universal_d_ApplicationError = ApplicationError;
  type portfolioProjectsV1Project_universal_d_BulkActionMetadata = BulkActionMetadata;
  type portfolioProjectsV1Project_universal_d_DeleteProjectRequest = DeleteProjectRequest;
  type portfolioProjectsV1Project_universal_d_DeleteProjectResponse = DeleteProjectResponse;
  type portfolioProjectsV1Project_universal_d_QueryProjectsRequest = QueryProjectsRequest;
  type portfolioProjectsV1Project_universal_d_QueryProjectsResponse = QueryProjectsResponse;
  type portfolioProjectsV1Project_universal_d_QueryProjectWithCollectionInfoRequest = QueryProjectWithCollectionInfoRequest;
  type portfolioProjectsV1Project_universal_d_QueryProjectWithCollectionInfoResponse = QueryProjectWithCollectionInfoResponse;
  type portfolioProjectsV1Project_universal_d_RestoreProjectFromTrashBinRequest = RestoreProjectFromTrashBinRequest;
  type portfolioProjectsV1Project_universal_d_RestoreProjectFromTrashBinResponse = RestoreProjectFromTrashBinResponse;
  const portfolioProjectsV1Project_universal_d_getProjectPageData: typeof getProjectPageData;
  type portfolioProjectsV1Project_universal_d_GetProjectPageDataIdentifiers = GetProjectPageDataIdentifiers;
  const portfolioProjectsV1Project_universal_d_createNewPortfolioApp: typeof createNewPortfolioApp;
  const portfolioProjectsV1Project_universal_d_createProject: typeof createProject;
  const portfolioProjectsV1Project_universal_d_getProject: typeof getProject;
  type portfolioProjectsV1Project_universal_d_GetProjectOptions = GetProjectOptions;
  const portfolioProjectsV1Project_universal_d_listProjects: typeof listProjects;
  type portfolioProjectsV1Project_universal_d_ListProjectsOptions = ListProjectsOptions;
  const portfolioProjectsV1Project_universal_d_updateProject: typeof updateProject;
  type portfolioProjectsV1Project_universal_d_UpdateProject = UpdateProject;
  type portfolioProjectsV1Project_universal_d_UpdateProjectOptions = UpdateProjectOptions;
  const portfolioProjectsV1Project_universal_d_bulkUpdateProjects: typeof bulkUpdateProjects;
  type portfolioProjectsV1Project_universal_d_BulkUpdateProjectsOptions = BulkUpdateProjectsOptions;
  const portfolioProjectsV1Project_universal_d_deleteProject: typeof deleteProject;
  type portfolioProjectsV1Project_universal_d_DeleteProjectOptions = DeleteProjectOptions;
  const portfolioProjectsV1Project_universal_d_queryProjects: typeof queryProjects;
  type portfolioProjectsV1Project_universal_d_QueryProjectsOptions = QueryProjectsOptions;
  type portfolioProjectsV1Project_universal_d_ProjectsQueryResult = ProjectsQueryResult;
  type portfolioProjectsV1Project_universal_d_ProjectsQueryBuilder = ProjectsQueryBuilder;
  const portfolioProjectsV1Project_universal_d_queryProjectsWithCollectionInfo: typeof queryProjectsWithCollectionInfo;
  type portfolioProjectsV1Project_universal_d_QueryProjectsWithCollectionInfoOptions = QueryProjectsWithCollectionInfoOptions;
  const portfolioProjectsV1Project_universal_d_restoreProjectFromTrashBin: typeof restoreProjectFromTrashBin;
  namespace portfolioProjectsV1Project_universal_d {
    export {
      Project$1 as Project,
      ProjectCoverOneOf$1 as ProjectCoverOneOf,
      portfolioProjectsV1Project_universal_d_CommonImage as CommonImage,
      portfolioProjectsV1Project_universal_d_ImageImageType as ImageImageType,
      portfolioProjectsV1Project_universal_d_CommonPoint as CommonPoint,
      portfolioProjectsV1Project_universal_d_CommonUnsharpMasking as CommonUnsharpMasking,
      Video$1 as Video,
      VideoResolution$1 as VideoResolution,
      ProjectDetail$1 as ProjectDetail,
      ProjectDetailValueOneOf$1 as ProjectDetailValueOneOf,
      DetailsLink$1 as DetailsLink,
      ProjectSource$1 as ProjectSource,
      SyncStatus$2 as SyncStatus,
      SeoSchema$1 as SeoSchema,
      Keyword$1 as Keyword,
      Tag$1 as Tag,
      Settings$1 as Settings,
      portfolioProjectsV1Project_universal_d_MenuSettingUpdatedEvent as MenuSettingUpdatedEvent,
      portfolioProjectsV1Project_universal_d_GetProjectPageDataRequest as GetProjectPageDataRequest,
      portfolioProjectsV1Project_universal_d_GetProjectPageDataResponse as GetProjectPageDataResponse,
      portfolioProjectsV1Project_universal_d_ProjectSlug as ProjectSlug,
      portfolioProjectsV1Project_universal_d_CreateNewPortfolioAppRequest as CreateNewPortfolioAppRequest,
      portfolioProjectsV1Project_universal_d_CreateNewPortfolioAppResponse as CreateNewPortfolioAppResponse,
      MetaSiteSpecialEvent$1 as MetaSiteSpecialEvent,
      MetaSiteSpecialEventPayloadOneOf$1 as MetaSiteSpecialEventPayloadOneOf,
      Asset$1 as Asset,
      State$1 as State,
      SiteCreated$1 as SiteCreated,
      SiteCreatedContext$1 as SiteCreatedContext,
      Namespace$1 as Namespace,
      SiteTransferred$1 as SiteTransferred,
      SiteDeleted$1 as SiteDeleted,
      DeleteContext$1 as DeleteContext,
      DeleteStatus$1 as DeleteStatus,
      SiteUndeleted$1 as SiteUndeleted,
      SitePublished$1 as SitePublished,
      SiteUnpublished$1 as SiteUnpublished,
      SiteMarkedAsTemplate$1 as SiteMarkedAsTemplate,
      SiteMarkedAsWixSite$1 as SiteMarkedAsWixSite,
      ServiceProvisioned$1 as ServiceProvisioned,
      ServiceRemoved$1 as ServiceRemoved,
      SiteRenamed$1 as SiteRenamed,
      SiteHardDeleted$1 as SiteHardDeleted,
      NamespaceChanged$1 as NamespaceChanged,
      StudioAssigned$1 as StudioAssigned,
      StudioUnassigned$1 as StudioUnassigned,
      Empty$1 as Empty,
      MessageEnvelope$2 as MessageEnvelope,
      IdentificationData$2 as IdentificationData,
      IdentificationDataIdOneOf$2 as IdentificationDataIdOneOf,
      WebhookIdentityType$2 as WebhookIdentityType,
      portfolioProjectsV1Project_universal_d_InvalidateCache as InvalidateCache,
      portfolioProjectsV1Project_universal_d_InvalidateCacheGetByOneOf as InvalidateCacheGetByOneOf,
      portfolioProjectsV1Project_universal_d_App as App,
      portfolioProjectsV1Project_universal_d_Page as Page,
      portfolioProjectsV1Project_universal_d_URI as URI,
      portfolioProjectsV1Project_universal_d_File as File,
      portfolioProjectsV1Project_universal_d_SyncProjectWithCollectionMappings as SyncProjectWithCollectionMappings,
      portfolioProjectsV1Project_universal_d_DeletedProjectRestored as DeletedProjectRestored,
      portfolioProjectsV1Project_universal_d_CreateProjectRequest as CreateProjectRequest,
      portfolioProjectsV1Project_universal_d_CreateProjectResponse as CreateProjectResponse,
      portfolioProjectsV1Project_universal_d_GetProjectRequest as GetProjectRequest,
      portfolioProjectsV1Project_universal_d_GetProjectResponse as GetProjectResponse,
      portfolioProjectsV1Project_universal_d_ListProjectsRequest as ListProjectsRequest,
      CursorPaging$2 as CursorPaging,
      portfolioProjectsV1Project_universal_d_ListProjectsResponse as ListProjectsResponse,
      PagingMetadataV2$2 as PagingMetadataV2,
      Cursors$2 as Cursors,
      portfolioProjectsV1Project_universal_d_UpdateProjectRequest as UpdateProjectRequest,
      portfolioProjectsV1Project_universal_d_UpdateProjectResponse as UpdateProjectResponse,
      portfolioProjectsV1Project_universal_d_BulkUpdateProjectsRequest as BulkUpdateProjectsRequest,
      portfolioProjectsV1Project_universal_d_MaskedProject as MaskedProject,
      portfolioProjectsV1Project_universal_d_BulkUpdateProjectsResponse as BulkUpdateProjectsResponse,
      portfolioProjectsV1Project_universal_d_BulkUpdateProjectsResult as BulkUpdateProjectsResult,
      portfolioProjectsV1Project_universal_d_ItemMetadata as ItemMetadata,
      portfolioProjectsV1Project_universal_d_ApplicationError as ApplicationError,
      portfolioProjectsV1Project_universal_d_BulkActionMetadata as BulkActionMetadata,
      portfolioProjectsV1Project_universal_d_DeleteProjectRequest as DeleteProjectRequest,
      portfolioProjectsV1Project_universal_d_DeleteProjectResponse as DeleteProjectResponse,
      portfolioProjectsV1Project_universal_d_QueryProjectsRequest as QueryProjectsRequest,
      QueryV2$1 as QueryV2,
      QueryV2PagingMethodOneOf$1 as QueryV2PagingMethodOneOf,
      Sorting$1 as Sorting,
      SortOrder$1 as SortOrder,
      Paging$1 as Paging,
      portfolioProjectsV1Project_universal_d_QueryProjectsResponse as QueryProjectsResponse,
      UpdateProjectOrderInCollectionRequest$1 as UpdateProjectOrderInCollectionRequest,
      UpdateProjectOrderInCollectionResponse$1 as UpdateProjectOrderInCollectionResponse,
      ProjectsInCollections$1 as ProjectsInCollections,
      portfolioProjectsV1Project_universal_d_QueryProjectWithCollectionInfoRequest as QueryProjectWithCollectionInfoRequest,
      portfolioProjectsV1Project_universal_d_QueryProjectWithCollectionInfoResponse as QueryProjectWithCollectionInfoResponse,
      portfolioProjectsV1Project_universal_d_RestoreProjectFromTrashBinRequest as RestoreProjectFromTrashBinRequest,
      portfolioProjectsV1Project_universal_d_RestoreProjectFromTrashBinResponse as RestoreProjectFromTrashBinResponse,
      DomainEvent$2 as DomainEvent,
      DomainEventBodyOneOf$2 as DomainEventBodyOneOf,
      EntityCreatedEvent$2 as EntityCreatedEvent,
      RestoreInfo$2 as RestoreInfo,
      EntityUpdatedEvent$2 as EntityUpdatedEvent,
      EntityDeletedEvent$2 as EntityDeletedEvent,
      ActionEvent$2 as ActionEvent,
      portfolioProjectsV1Project_universal_d_getProjectPageData as getProjectPageData,
      portfolioProjectsV1Project_universal_d_GetProjectPageDataIdentifiers as GetProjectPageDataIdentifiers,
      portfolioProjectsV1Project_universal_d_createNewPortfolioApp as createNewPortfolioApp,
      portfolioProjectsV1Project_universal_d_createProject as createProject,
      portfolioProjectsV1Project_universal_d_getProject as getProject,
      portfolioProjectsV1Project_universal_d_GetProjectOptions as GetProjectOptions,
      portfolioProjectsV1Project_universal_d_listProjects as listProjects,
      portfolioProjectsV1Project_universal_d_ListProjectsOptions as ListProjectsOptions,
      portfolioProjectsV1Project_universal_d_updateProject as updateProject,
      portfolioProjectsV1Project_universal_d_UpdateProject as UpdateProject,
      portfolioProjectsV1Project_universal_d_UpdateProjectOptions as UpdateProjectOptions,
      portfolioProjectsV1Project_universal_d_bulkUpdateProjects as bulkUpdateProjects,
      portfolioProjectsV1Project_universal_d_BulkUpdateProjectsOptions as BulkUpdateProjectsOptions,
      portfolioProjectsV1Project_universal_d_deleteProject as deleteProject,
      portfolioProjectsV1Project_universal_d_DeleteProjectOptions as DeleteProjectOptions,
      portfolioProjectsV1Project_universal_d_queryProjects as queryProjects,
      portfolioProjectsV1Project_universal_d_QueryProjectsOptions as QueryProjectsOptions,
      portfolioProjectsV1Project_universal_d_ProjectsQueryResult as ProjectsQueryResult,
      portfolioProjectsV1Project_universal_d_ProjectsQueryBuilder as ProjectsQueryBuilder,
      updateProjectOrderInCollection$1 as updateProjectOrderInCollection,
      UpdateProjectOrderInCollectionIdentifiers$1 as UpdateProjectOrderInCollectionIdentifiers,
      portfolioProjectsV1Project_universal_d_queryProjectsWithCollectionInfo as queryProjectsWithCollectionInfo,
      portfolioProjectsV1Project_universal_d_QueryProjectsWithCollectionInfoOptions as QueryProjectsWithCollectionInfoOptions,
      portfolioProjectsV1Project_universal_d_restoreProjectFromTrashBin as restoreProjectFromTrashBin,
    };
  }
  
  interface ProjectsInCollections {
      /** Collection ID. */
      collectionId?: string;
      /** Project object. */
      project?: Project;
      /**
       * Index that determines the placement of a project within the collection.  <br />
       *
       * Default: [Epoch](https://www.epoch101.com/) timestamp. <br />
       */
      sortOrder?: number | null;
      /**
       * Project placement ID.
       * @readonly
       */
      _id?: string | null;
  }
  interface Project extends ProjectCoverOneOf {
      /** Project cover image. */
      coverImage?: Image;
      /** Project cover video. */
      coverVideo?: Video;
      /**
       * Project ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the project is updated. To prevent conflicting changes, the existing revision must be passed when updating the project object.
       * @readonly
       */
      revision?: string | null;
      /** Project title. */
      title?: string | null;
      /** Project description. */
      description?: string | null;
      /** Whether the project is hidden from the portfolio. Default: `false` */
      hidden?: boolean | null;
      /** IDs of the collections that include the project. */
      collectionIds?: string[];
      /** Project details. */
      details?: ProjectDetail[];
      /** Project slug. */
      slug?: string | null;
      /**
       * Date and time the project was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the project was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * project source - When project is synced from external platform, this field will represent the app & source the projects synced from.
       * @internal
       */
      source?: ProjectSource;
      /**
       * Project page URL and and relative path. Returned when `includePageUrl` is `true` in the request.
       * @readonly
       */
      url?: string;
      /** Project SEO data. */
      seoData?: SeoSchema;
      /**
       * Whether the project is synced to an external platform and will receive daily updates.
       * @internal
       * @readonly
       */
      syncedProject?: boolean | null;
  }
  /** @oneof */
  interface ProjectCoverOneOf {
      /** Project cover image. */
      coverImage?: Image;
      /** Project cover video. */
      coverVideo?: Video;
  }
  interface Image {
      /**
       * @internal
       * @deprecated
       */
      type?: ImageType;
      /** Information about the Wix Media image. */
      imageInfo?: string;
      /** Focal point of the image. */
      focalPoint?: Point;
      /**
       * Set of key-value pairs describing the media in [Exchangeable Image File format](https://en.wikipedia.org/wiki/Exif).
       * @internal
       */
      exif?: Record<string, any> | null;
      /**
       * Image compression level. <br />
       *
       * Min: `30` <br />
       * Max: `100`
       * @internal
       */
      quality?: number | null;
      /**
       * [Unsharp masking](https://en.wikipedia.org/wiki/Unsharp_masking) values of the image.
       * @internal
       */
      unsharpMasking?: UnsharpMasking;
      /**
       * Whether the image is saved in secure media.
       * @internal
       */
      secure?: boolean | null;
      /**
       * When image is saved in secure media, token is generated.
       * @internal
       * @readonly
       */
      token?: string | null;
  }
  enum ImageType {
      UNDEFINED = "UNDEFINED",
      WIX_MEDIA = "WIX_MEDIA",
      EXTERNAL = "EXTERNAL"
  }
  interface Point {
      /** X-coordinate of the focal point. */
      x?: number;
      /** Y-coordinate of the focal point. */
      y?: number;
  }
  interface UnsharpMasking {
      /**
       * Unsharp masking amount. Controls the sharpening strength. <br />
       *
       * Min: `0` <br />
       * Max: `5`
       */
      amount?: number | null;
      /** Unsharp masking radius in pixels. Controls the sharpening width. */
      radius?: number | null;
      /**
       * Unsharp masking threshold. Controls how different neighboring pixels must be for shapening to apply. <br />
       *
       * Min: `0` <br />
       * Max: `1`
       */
      threshold?: number | null;
  }
  interface Video {
      /** Information about the Wix Media video. */
      videoInfo?: string;
      /** Manually defined Video duration in milliseconds. */
      durationInMillis?: number | null;
  }
  interface VideoResolution {
      /** Video URL.  Required. */
      url?: string;
      /** Video height. Required. */
      height?: number;
      /** Video width.  Required. */
      width?: number;
      /**
       * Video poster. Deprecated, please use the `posters` property in the parent entity
       * @internal
       * @deprecated
       */
      poster?: string;
      /** Video format for example, mp4, hls.  Required. */
      format?: string;
      /** Video quality for example 480p, 720p. */
      quality?: string | null;
      /** Video filename. */
      filename?: string | null;
  }
  /**
   * Project label.
   * One of:
   * + `text`
   * + `link`
   */
  interface ProjectDetail extends ProjectDetailValueOneOf {
      /** Project label in plain text format. */
      text?: string;
      /** Project label in link format. */
      link?: DetailsLink;
      /** Project label. */
      label?: string;
  }
  /** @oneof */
  interface ProjectDetailValueOneOf {
      /** Project label in plain text format. */
      text?: string;
      /** Project label in link format. */
      link?: DetailsLink;
  }
  interface DetailsLink {
      /** Display text of the link. */
      text?: string | null;
      /** Target URL of the link. */
      url?: string | null;
      /**
       * Whether the link opens in a new tab or window. One of:
       * * `'_blank'`: The link opens in a new tab or window.
       * * `'_self'`: The link opens in the same tab or window.
       */
      target?: string | null;
  }
  interface ProjectSource {
      /** App definition id */
      appDefId?: string;
      /** External source id */
      externalId?: string;
      /** Source name */
      sourceName?: string;
      /** Source description */
      description?: string | null;
      /** link to external source */
      link?: string | null;
      /** Sync status */
      syncStatus?: SyncStatus$1;
      /** fields that are synced from external source, should be blocked to update in UI */
      notEditableFields?: string[];
      /** last date the project was synced */
      lastSync?: Date | null;
  }
  enum SyncStatus$1 {
      SYNCED = "SYNCED",
      SYNCING = "SYNCING",
      NOT_SYNCED = "NOT_SYNCED"
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
  interface QueryProjectInCollectionsRequest {
      /** Query options. */
      query: QueryV2;
      /**
       * Whether to include the project's relative path and full URL in the response.
       * Default: `false`
       */
      includePageUrl?: boolean | null;
  }
  interface QueryV2 extends QueryV2PagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
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
      cursorPaging?: CursorPaging$1;
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
  interface CursorPaging$1 {
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
  interface QueryProjectInCollectionsResponse {
      /** List of projects and their placement within the specified collections. */
      projectInCollections?: ProjectsInCollections[];
      /** Paging metadata. */
      metadata?: PagingMetadataV2$1;
  }
  interface PagingMetadataV2$1 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
      total?: number | null;
      /** Flag that indicates the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
      cursors?: Cursors$1;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface Cursors$1 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface UpdateProjectOrderInCollectionRequest {
      /** ID of the project to update. */
      projectId: string;
      /** Collection ID. */
      collectionId: string;
      /** Index that determines the placement of a project within the collection. */
      sortOrder: number | null;
  }
  interface UpdateProjectOrderInCollectionResponse {
      /**
       * @internal
       * @deprecated
       */
      project?: ProjectsInCollections;
      /** Updated project placement within the specified collection. */
      projectInCollection?: ProjectsInCollections;
  }
  interface ProjectOrderInCollectionUpdatedEvent {
      /** ID of the project to update. */
      projectId?: string;
      /** Collection ID. */
      collectionId?: string;
      /** Index that determines the placement of a project within the collection. */
      sortOrder?: number | null;
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
  /**
   * Retrieves a list of projects and their placement in the specified collections given the provided paging, filtering, and sorting. Up to 100 projects can be returned per request.
   *
   * The default `sort` is `project.id` in `ASC`.
   *
   * For additional field support for filters and sorting, see [Projects In Collections: Supported Filters and Sorting](https://dev.wix.com/docs/rest/business-solutions/portfolio/project-in-collection/sort-and-filter.
   *
   * To learn how to query projects and their placement in collections, see [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language).
   * @internal
   * @documentationMaturity preview
   * @permissionId PORTFOLIO.PROJECT_READ
   */
  function queryProjectInCollections(options?: QueryProjectInCollectionsOptions): ProjectInCollectionsQueryBuilder;
  interface QueryProjectInCollectionsOptions {
      /**
       * Whether to include the project's relative path and full URL in the response.
       * Default: `false`
       */
      includePageUrl?: boolean | null | undefined;
  }
  interface QueryCursorResult {
      cursors: Cursors$1;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ProjectInCollectionsQueryResult extends QueryCursorResult {
      items: ProjectsInCollections[];
      query: ProjectInCollectionsQueryBuilder;
      next: () => Promise<ProjectInCollectionsQueryResult>;
      prev: () => Promise<ProjectInCollectionsQueryResult>;
  }
  interface ProjectInCollectionsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'collectionId' | 'project.id' | 'project.hidden' | 'project.slug' | 'sortOrder', value: any) => ProjectInCollectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: 'collectionId' | 'project.id' | 'project.hidden' | 'project.slug' | 'sortOrder', value: any) => ProjectInCollectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: 'sortOrder', value: any) => ProjectInCollectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: 'sortOrder', value: any) => ProjectInCollectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: 'sortOrder', value: any) => ProjectInCollectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: 'sortOrder', value: any) => ProjectInCollectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: 'collectionId' | 'project.id' | 'project.slug', value: string) => ProjectInCollectionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: 'collectionId' | 'project.id' | 'project.hidden' | 'project.slug' | 'sortOrder', value: any[]) => ProjectInCollectionsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'collectionId' | 'project.id' | 'project.hidden' | 'project.slug' | 'sortOrder', value: any) => ProjectInCollectionsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'collectionId' | 'project.id' | 'project.hidden' | 'project.slug' | 'sortOrder', value: boolean) => ProjectInCollectionsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'collectionId' | 'project.id' | 'project.slug' | 'sortOrder'>) => ProjectInCollectionsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'collectionId' | 'project.id' | 'project.slug' | 'sortOrder'>) => ProjectInCollectionsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ProjectInCollectionsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ProjectInCollectionsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ProjectInCollectionsQueryResult>;
  }
  /**
   * Updates the placement of a project within a specified collection.
   * @param sortOrder - Index that determines the placement of a project within the collection.
   * @public
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.collectionId
   * @requiredField identifiers.projectId
   * @requiredField sortOrder
   * @permissionId PORTFOLIO.PROJECT_UPDATE
   * @adminMethod
   */
  function updateProjectOrderInCollection(identifiers: UpdateProjectOrderInCollectionIdentifiers, sortOrder: number | null): Promise<UpdateProjectOrderInCollectionResponse>;
  interface UpdateProjectOrderInCollectionIdentifiers {
      /** ID of the project to update. */
      projectId: string;
      /** Collection ID. */
      collectionId: string;
  }
  
  type portfolioProjectsV1ProjectInCollection_universal_d_ProjectsInCollections = ProjectsInCollections;
  type portfolioProjectsV1ProjectInCollection_universal_d_Project = Project;
  type portfolioProjectsV1ProjectInCollection_universal_d_ProjectCoverOneOf = ProjectCoverOneOf;
  type portfolioProjectsV1ProjectInCollection_universal_d_Image = Image;
  type portfolioProjectsV1ProjectInCollection_universal_d_ImageType = ImageType;
  const portfolioProjectsV1ProjectInCollection_universal_d_ImageType: typeof ImageType;
  type portfolioProjectsV1ProjectInCollection_universal_d_Point = Point;
  type portfolioProjectsV1ProjectInCollection_universal_d_UnsharpMasking = UnsharpMasking;
  type portfolioProjectsV1ProjectInCollection_universal_d_Video = Video;
  type portfolioProjectsV1ProjectInCollection_universal_d_VideoResolution = VideoResolution;
  type portfolioProjectsV1ProjectInCollection_universal_d_ProjectDetail = ProjectDetail;
  type portfolioProjectsV1ProjectInCollection_universal_d_ProjectDetailValueOneOf = ProjectDetailValueOneOf;
  type portfolioProjectsV1ProjectInCollection_universal_d_DetailsLink = DetailsLink;
  type portfolioProjectsV1ProjectInCollection_universal_d_ProjectSource = ProjectSource;
  type portfolioProjectsV1ProjectInCollection_universal_d_SeoSchema = SeoSchema;
  type portfolioProjectsV1ProjectInCollection_universal_d_Keyword = Keyword;
  type portfolioProjectsV1ProjectInCollection_universal_d_Tag = Tag;
  type portfolioProjectsV1ProjectInCollection_universal_d_Settings = Settings;
  type portfolioProjectsV1ProjectInCollection_universal_d_QueryProjectInCollectionsRequest = QueryProjectInCollectionsRequest;
  type portfolioProjectsV1ProjectInCollection_universal_d_QueryV2 = QueryV2;
  type portfolioProjectsV1ProjectInCollection_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
  type portfolioProjectsV1ProjectInCollection_universal_d_Sorting = Sorting;
  type portfolioProjectsV1ProjectInCollection_universal_d_SortOrder = SortOrder;
  const portfolioProjectsV1ProjectInCollection_universal_d_SortOrder: typeof SortOrder;
  type portfolioProjectsV1ProjectInCollection_universal_d_Paging = Paging;
  type portfolioProjectsV1ProjectInCollection_universal_d_QueryProjectInCollectionsResponse = QueryProjectInCollectionsResponse;
  type portfolioProjectsV1ProjectInCollection_universal_d_UpdateProjectOrderInCollectionRequest = UpdateProjectOrderInCollectionRequest;
  type portfolioProjectsV1ProjectInCollection_universal_d_UpdateProjectOrderInCollectionResponse = UpdateProjectOrderInCollectionResponse;
  type portfolioProjectsV1ProjectInCollection_universal_d_ProjectOrderInCollectionUpdatedEvent = ProjectOrderInCollectionUpdatedEvent;
  const portfolioProjectsV1ProjectInCollection_universal_d_queryProjectInCollections: typeof queryProjectInCollections;
  type portfolioProjectsV1ProjectInCollection_universal_d_QueryProjectInCollectionsOptions = QueryProjectInCollectionsOptions;
  type portfolioProjectsV1ProjectInCollection_universal_d_ProjectInCollectionsQueryResult = ProjectInCollectionsQueryResult;
  type portfolioProjectsV1ProjectInCollection_universal_d_ProjectInCollectionsQueryBuilder = ProjectInCollectionsQueryBuilder;
  const portfolioProjectsV1ProjectInCollection_universal_d_updateProjectOrderInCollection: typeof updateProjectOrderInCollection;
  type portfolioProjectsV1ProjectInCollection_universal_d_UpdateProjectOrderInCollectionIdentifiers = UpdateProjectOrderInCollectionIdentifiers;
  namespace portfolioProjectsV1ProjectInCollection_universal_d {
    export {
      portfolioProjectsV1ProjectInCollection_universal_d_ProjectsInCollections as ProjectsInCollections,
      portfolioProjectsV1ProjectInCollection_universal_d_Project as Project,
      portfolioProjectsV1ProjectInCollection_universal_d_ProjectCoverOneOf as ProjectCoverOneOf,
      portfolioProjectsV1ProjectInCollection_universal_d_Image as Image,
      portfolioProjectsV1ProjectInCollection_universal_d_ImageType as ImageType,
      portfolioProjectsV1ProjectInCollection_universal_d_Point as Point,
      portfolioProjectsV1ProjectInCollection_universal_d_UnsharpMasking as UnsharpMasking,
      portfolioProjectsV1ProjectInCollection_universal_d_Video as Video,
      portfolioProjectsV1ProjectInCollection_universal_d_VideoResolution as VideoResolution,
      portfolioProjectsV1ProjectInCollection_universal_d_ProjectDetail as ProjectDetail,
      portfolioProjectsV1ProjectInCollection_universal_d_ProjectDetailValueOneOf as ProjectDetailValueOneOf,
      portfolioProjectsV1ProjectInCollection_universal_d_DetailsLink as DetailsLink,
      portfolioProjectsV1ProjectInCollection_universal_d_ProjectSource as ProjectSource,
      SyncStatus$1 as SyncStatus,
      portfolioProjectsV1ProjectInCollection_universal_d_SeoSchema as SeoSchema,
      portfolioProjectsV1ProjectInCollection_universal_d_Keyword as Keyword,
      portfolioProjectsV1ProjectInCollection_universal_d_Tag as Tag,
      portfolioProjectsV1ProjectInCollection_universal_d_Settings as Settings,
      portfolioProjectsV1ProjectInCollection_universal_d_QueryProjectInCollectionsRequest as QueryProjectInCollectionsRequest,
      portfolioProjectsV1ProjectInCollection_universal_d_QueryV2 as QueryV2,
      portfolioProjectsV1ProjectInCollection_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf,
      portfolioProjectsV1ProjectInCollection_universal_d_Sorting as Sorting,
      portfolioProjectsV1ProjectInCollection_universal_d_SortOrder as SortOrder,
      portfolioProjectsV1ProjectInCollection_universal_d_Paging as Paging,
      CursorPaging$1 as CursorPaging,
      portfolioProjectsV1ProjectInCollection_universal_d_QueryProjectInCollectionsResponse as QueryProjectInCollectionsResponse,
      PagingMetadataV2$1 as PagingMetadataV2,
      Cursors$1 as Cursors,
      portfolioProjectsV1ProjectInCollection_universal_d_UpdateProjectOrderInCollectionRequest as UpdateProjectOrderInCollectionRequest,
      portfolioProjectsV1ProjectInCollection_universal_d_UpdateProjectOrderInCollectionResponse as UpdateProjectOrderInCollectionResponse,
      portfolioProjectsV1ProjectInCollection_universal_d_ProjectOrderInCollectionUpdatedEvent as ProjectOrderInCollectionUpdatedEvent,
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
      portfolioProjectsV1ProjectInCollection_universal_d_queryProjectInCollections as queryProjectInCollections,
      portfolioProjectsV1ProjectInCollection_universal_d_QueryProjectInCollectionsOptions as QueryProjectInCollectionsOptions,
      portfolioProjectsV1ProjectInCollection_universal_d_ProjectInCollectionsQueryResult as ProjectInCollectionsQueryResult,
      portfolioProjectsV1ProjectInCollection_universal_d_ProjectInCollectionsQueryBuilder as ProjectInCollectionsQueryBuilder,
      portfolioProjectsV1ProjectInCollection_universal_d_updateProjectOrderInCollection as updateProjectOrderInCollection,
      portfolioProjectsV1ProjectInCollection_universal_d_UpdateProjectOrderInCollectionIdentifiers as UpdateProjectOrderInCollectionIdentifiers,
    };
  }
  
  interface SyncedProject {
      /** Project ID in Portfolio - if project was yet to be create, will be None */
      portfolioProjectId?: string | null;
      /** External Project ID */
      externalId?: string;
      /** Project name */
      title?: string | null;
      /** Project media count */
      mediaCount?: number;
      /** Project image url */
      coverImage?: string | null;
      /** Project url in external */
      link?: string | null;
      /**
       * Represents the last time project was synced - returned only if external project is synced
       * @readonly
       */
      lastSynced?: Date | null;
      /** External Project synced status */
      status?: SyncStatus;
  }
  enum SyncStatus {
      /** Project was not synced */
      NOT_SYNCED = "NOT_SYNCED",
      /** Project is in pending state */
      PENDING = "PENDING",
      /** Project is in syncing state */
      SYNCING = "SYNCING",
      /** Project was synced */
      SYNCED = "SYNCED"
  }
  interface SyncingProjectEvent {
      /** Provider appDefId */
      appDefId?: string;
      /** External Project ID */
      externalProjectId?: string;
      /** Portfolio Project ID */
      portfolioProjectId?: string;
      /** When the first event was produced, and started syncing */
      firstProduceTimestamp?: Date | null;
      /** Project Revision */
      projectSyncRevision?: Date | null;
  }
  interface SyncProjectPagingEvent {
      /** Provider appDefId */
      appDefId?: string;
      /** External Project ID */
      externalProjectId?: string;
      /** Portfolio Project ID */
      portfolioProjectId?: string;
      /** Next page cursor */
      nextPageCursor?: string | null;
      /** Project Revision */
      projectSyncRevision?: Date | null;
  }
  interface SyncSiteEvent {
      /** Portfolio instance id */
      instanceId?: string;
      /** Paging */
      paging?: CursorPaging;
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
  interface SyncProjectRequest {
      /** Provider appDefId */
      appDefId: string;
      /** External Project ID */
      externalId: string;
  }
  interface GetProjectsRequest {
      /** Provider appDefId */
      appDefId: string;
      /** Paging */
      paging?: CursorPaging;
  }
  interface GetProjectsResponse {
      /** Provider appDefId */
      projects?: SyncedProject[];
      /** Paging metadata */
      metadata?: PagingMetadataV2;
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
  interface SyncProjectResponse {
      /** Portfolio project */
      project?: SyncedProject;
  }
  interface GetSyncStatusRequest {
      /** Provider appDefId */
      appDefId: string;
      /** External Project ID */
      externalId: string;
  }
  interface GetSyncStatusResponse {
      /** Provider appDefId */
      appDefId?: string;
      /** External Project ID */
      externalId?: string;
      /** Synced status */
      status?: SyncStatus;
  }
  interface StopSyncRequest {
      /** Provider appDefId */
      appDefId: string;
      /** External Project ID */
      externalId: string;
  }
  interface StopSyncResponse {
      /** Provider appDefId */
      appDefId?: string;
      /** External Project ID */
      externalId?: string;
  }
  interface GetLoginRedirectableUrlRequest {
      /** Provider appDefId */
      appDefId: string;
  }
  interface GetLoginRedirectableUrlResponse {
      /** Provider appDefId */
      appDefId?: string;
      /** Login url */
      url?: string;
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
  interface Empty {
  }
  interface ItemCreatedMediaCallbackRequest {
      appDefId: string;
      /** External Project ID */
      projectExternalId: string;
      /** External Project ID */
      itemExternalId: string;
      fileName?: string | null;
      mediaType?: string | null;
      opStatus?: string | null;
      fileSize?: number | null;
      width?: number | null;
      height?: number | null;
      fileOutput?: MediaFileOutput;
      siteId?: string | null;
  }
  interface MediaFileOutput {
      video?: MediaVideoOutput[];
      image?: MediaImageOutput[];
  }
  interface MediaVideoOutput {
      key?: string | null;
      status?: string | null;
      url?: string | null;
      quality?: string | null;
      duration?: number | null;
      width?: number | null;
      height?: number | null;
      format?: string | null;
  }
  interface MediaImageOutput {
      key?: string | null;
      status?: string | null;
      url?: string | null;
      width?: number | null;
      height?: number | null;
      format?: string | null;
  }
  interface ItemCreatedMediaCallbackResponse {
  }
  interface ProjectCoverImageCreatedMediaCallbackRequest {
      appDefId: string;
      /** External Project ID */
      projectExternalId: string;
      fileName?: string | null;
      mediaType?: string | null;
      opStatus?: string | null;
      fileSize?: number | null;
      width?: number | null;
      height?: number | null;
      fileOutput?: MediaFileOutput;
      siteId?: string | null;
  }
  interface ProjectCoverImageCreatedMediaCallbackResponse {
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
  interface SyncAllSitesEvent {
      /** Paging */
      paging?: CursorPaging;
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
   * Get projects per app
   * @param appDefId - Provider appDefId
   * @public
   * @documentationMaturity preview
   * @requiredField appDefId
   * @permissionId PORTFOLIO.SYNCED_PROJECTS_READ
   * @adminMethod
   */
  function getProjects(appDefId: string, options?: GetProjectsOptions): Promise<GetProjectsResponse>;
  interface GetProjectsOptions {
      /** Paging */
      paging?: CursorPaging;
  }
  /**
   * Async Sync project
   * @public
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.appDefId
   * @requiredField identifiers.externalId
   * @permissionId PORTFOLIO.SYNCED_PROJECTS_SYNC
   * @adminMethod
   */
  function syncProject(identifiers: SyncProjectIdentifiers): Promise<SyncProjectResponse>;
  interface SyncProjectIdentifiers {
      /** Provider appDefId */
      appDefId: string;
      /** External Project ID */
      externalId: string;
  }
  /**
   * Get sync status (when was last synced and etc..)
   * @public
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.appDefId
   * @requiredField identifiers.externalId
   * @permissionId PORTFOLIO.SYNCED_PROJECTS_READ
   * @adminMethod
   */
  function getSyncStatus(identifiers: GetSyncStatusIdentifiers): Promise<GetSyncStatusResponse>;
  interface GetSyncStatusIdentifiers {
      /** Provider appDefId */
      appDefId: string;
      /** External Project ID */
      externalId: string;
  }
  /**
   * Stop sync project
   * @public
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.appDefId
   * @requiredField identifiers.externalId
   * @permissionId PORTFOLIO.SYNCED_PROJECTS_STOP_SYNC
   * @adminMethod
   */
  function stopSync(identifiers: StopSyncIdentifiers): Promise<StopSyncResponse>;
  interface StopSyncIdentifiers {
      /** Provider appDefId */
      appDefId: string;
      /** External Project ID */
      externalId: string;
  }
  /**
   * Get login redirectable url
   * @param appDefId - Provider appDefId
   * @public
   * @documentationMaturity preview
   * @requiredField appDefId
   * @permissionId PORTFOLIO.SYNCED_PROJECTS_READ
   * @adminMethod
   */
  function getLoginRedirectableUrl(appDefId: string): Promise<GetLoginRedirectableUrlResponse>;
  /**
   * media-callback endpoint for item created
   * @internal
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.appDefId
   * @requiredField identifiers.itemExternalId
   * @requiredField identifiers.projectExternalId
   * @adminMethod
   */
  function itemCreatedMediaCallback(identifiers: ItemCreatedMediaCallbackIdentifiers, options?: ItemCreatedMediaCallbackOptions): Promise<void>;
  interface ItemCreatedMediaCallbackIdentifiers {
      appDefId: string;
      /** External Project ID */
      projectExternalId: string;
      /** External Project ID */
      itemExternalId: string;
  }
  interface ItemCreatedMediaCallbackOptions {
      fileName?: string | null;
      mediaType?: string | null;
      opStatus?: string | null;
      fileSize?: number | null;
      width?: number | null;
      height?: number | null;
      fileOutput?: MediaFileOutput;
      siteId?: string | null;
  }
  /**
   * media-callback endpoint for project cover image created
   * @internal
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.appDefId
   * @requiredField identifiers.projectExternalId
   * @adminMethod
   */
  function projectCoverImageCreatedMediaCallback(identifiers: ProjectCoverImageCreatedMediaCallbackIdentifiers, options?: ProjectCoverImageCreatedMediaCallbackOptions): Promise<void>;
  interface ProjectCoverImageCreatedMediaCallbackIdentifiers {
      appDefId: string;
      /** External Project ID */
      projectExternalId: string;
  }
  interface ProjectCoverImageCreatedMediaCallbackOptions {
      fileName?: string | null;
      mediaType?: string | null;
      opStatus?: string | null;
      fileSize?: number | null;
      width?: number | null;
      height?: number | null;
      fileOutput?: MediaFileOutput;
      siteId?: string | null;
  }
  
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SyncedProject = SyncedProject;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SyncStatus = SyncStatus;
  const portfolioSyncedprojectsV1SyncedProject_universal_d_SyncStatus: typeof SyncStatus;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SyncingProjectEvent = SyncingProjectEvent;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SyncProjectPagingEvent = SyncProjectPagingEvent;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SyncSiteEvent = SyncSiteEvent;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_CursorPaging = CursorPaging;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SyncProjectRequest = SyncProjectRequest;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_GetProjectsRequest = GetProjectsRequest;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_GetProjectsResponse = GetProjectsResponse;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_Cursors = Cursors;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SyncProjectResponse = SyncProjectResponse;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_GetSyncStatusRequest = GetSyncStatusRequest;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_GetSyncStatusResponse = GetSyncStatusResponse;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_StopSyncRequest = StopSyncRequest;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_StopSyncResponse = StopSyncResponse;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_GetLoginRedirectableUrlRequest = GetLoginRedirectableUrlRequest;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_GetLoginRedirectableUrlResponse = GetLoginRedirectableUrlResponse;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_DomainEvent = DomainEvent;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_RestoreInfo = RestoreInfo;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_ActionEvent = ActionEvent;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_Empty = Empty;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_ItemCreatedMediaCallbackRequest = ItemCreatedMediaCallbackRequest;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_MediaFileOutput = MediaFileOutput;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_MediaVideoOutput = MediaVideoOutput;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_MediaImageOutput = MediaImageOutput;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_ItemCreatedMediaCallbackResponse = ItemCreatedMediaCallbackResponse;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_ProjectCoverImageCreatedMediaCallbackRequest = ProjectCoverImageCreatedMediaCallbackRequest;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_ProjectCoverImageCreatedMediaCallbackResponse = ProjectCoverImageCreatedMediaCallbackResponse;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_MetaSiteSpecialEvent = MetaSiteSpecialEvent;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_MetaSiteSpecialEventPayloadOneOf = MetaSiteSpecialEventPayloadOneOf;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_Asset = Asset;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_State = State;
  const portfolioSyncedprojectsV1SyncedProject_universal_d_State: typeof State;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SiteCreated = SiteCreated;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SiteCreatedContext = SiteCreatedContext;
  const portfolioSyncedprojectsV1SyncedProject_universal_d_SiteCreatedContext: typeof SiteCreatedContext;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_Namespace = Namespace;
  const portfolioSyncedprojectsV1SyncedProject_universal_d_Namespace: typeof Namespace;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SiteTransferred = SiteTransferred;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SiteDeleted = SiteDeleted;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_DeleteContext = DeleteContext;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_DeleteStatus = DeleteStatus;
  const portfolioSyncedprojectsV1SyncedProject_universal_d_DeleteStatus: typeof DeleteStatus;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SiteUndeleted = SiteUndeleted;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SitePublished = SitePublished;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SiteUnpublished = SiteUnpublished;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SiteMarkedAsTemplate = SiteMarkedAsTemplate;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SiteMarkedAsWixSite = SiteMarkedAsWixSite;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_ServiceProvisioned = ServiceProvisioned;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_ServiceRemoved = ServiceRemoved;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SiteRenamed = SiteRenamed;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SiteHardDeleted = SiteHardDeleted;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_NamespaceChanged = NamespaceChanged;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_StudioAssigned = StudioAssigned;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_StudioUnassigned = StudioUnassigned;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SyncAllSitesEvent = SyncAllSitesEvent;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_MessageEnvelope = MessageEnvelope;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_IdentificationData = IdentificationData;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_WebhookIdentityType = WebhookIdentityType;
  const portfolioSyncedprojectsV1SyncedProject_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const portfolioSyncedprojectsV1SyncedProject_universal_d_getProjects: typeof getProjects;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_GetProjectsOptions = GetProjectsOptions;
  const portfolioSyncedprojectsV1SyncedProject_universal_d_syncProject: typeof syncProject;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_SyncProjectIdentifiers = SyncProjectIdentifiers;
  const portfolioSyncedprojectsV1SyncedProject_universal_d_getSyncStatus: typeof getSyncStatus;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_GetSyncStatusIdentifiers = GetSyncStatusIdentifiers;
  const portfolioSyncedprojectsV1SyncedProject_universal_d_stopSync: typeof stopSync;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_StopSyncIdentifiers = StopSyncIdentifiers;
  const portfolioSyncedprojectsV1SyncedProject_universal_d_getLoginRedirectableUrl: typeof getLoginRedirectableUrl;
  const portfolioSyncedprojectsV1SyncedProject_universal_d_itemCreatedMediaCallback: typeof itemCreatedMediaCallback;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_ItemCreatedMediaCallbackIdentifiers = ItemCreatedMediaCallbackIdentifiers;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_ItemCreatedMediaCallbackOptions = ItemCreatedMediaCallbackOptions;
  const portfolioSyncedprojectsV1SyncedProject_universal_d_projectCoverImageCreatedMediaCallback: typeof projectCoverImageCreatedMediaCallback;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_ProjectCoverImageCreatedMediaCallbackIdentifiers = ProjectCoverImageCreatedMediaCallbackIdentifiers;
  type portfolioSyncedprojectsV1SyncedProject_universal_d_ProjectCoverImageCreatedMediaCallbackOptions = ProjectCoverImageCreatedMediaCallbackOptions;
  namespace portfolioSyncedprojectsV1SyncedProject_universal_d {
    export {
      portfolioSyncedprojectsV1SyncedProject_universal_d_SyncedProject as SyncedProject,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SyncStatus as SyncStatus,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SyncingProjectEvent as SyncingProjectEvent,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SyncProjectPagingEvent as SyncProjectPagingEvent,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SyncSiteEvent as SyncSiteEvent,
      portfolioSyncedprojectsV1SyncedProject_universal_d_CursorPaging as CursorPaging,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SyncProjectRequest as SyncProjectRequest,
      portfolioSyncedprojectsV1SyncedProject_universal_d_GetProjectsRequest as GetProjectsRequest,
      portfolioSyncedprojectsV1SyncedProject_universal_d_GetProjectsResponse as GetProjectsResponse,
      portfolioSyncedprojectsV1SyncedProject_universal_d_PagingMetadataV2 as PagingMetadataV2,
      portfolioSyncedprojectsV1SyncedProject_universal_d_Cursors as Cursors,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SyncProjectResponse as SyncProjectResponse,
      portfolioSyncedprojectsV1SyncedProject_universal_d_GetSyncStatusRequest as GetSyncStatusRequest,
      portfolioSyncedprojectsV1SyncedProject_universal_d_GetSyncStatusResponse as GetSyncStatusResponse,
      portfolioSyncedprojectsV1SyncedProject_universal_d_StopSyncRequest as StopSyncRequest,
      portfolioSyncedprojectsV1SyncedProject_universal_d_StopSyncResponse as StopSyncResponse,
      portfolioSyncedprojectsV1SyncedProject_universal_d_GetLoginRedirectableUrlRequest as GetLoginRedirectableUrlRequest,
      portfolioSyncedprojectsV1SyncedProject_universal_d_GetLoginRedirectableUrlResponse as GetLoginRedirectableUrlResponse,
      portfolioSyncedprojectsV1SyncedProject_universal_d_DomainEvent as DomainEvent,
      portfolioSyncedprojectsV1SyncedProject_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      portfolioSyncedprojectsV1SyncedProject_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      portfolioSyncedprojectsV1SyncedProject_universal_d_RestoreInfo as RestoreInfo,
      portfolioSyncedprojectsV1SyncedProject_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      portfolioSyncedprojectsV1SyncedProject_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      portfolioSyncedprojectsV1SyncedProject_universal_d_ActionEvent as ActionEvent,
      portfolioSyncedprojectsV1SyncedProject_universal_d_Empty as Empty,
      portfolioSyncedprojectsV1SyncedProject_universal_d_ItemCreatedMediaCallbackRequest as ItemCreatedMediaCallbackRequest,
      portfolioSyncedprojectsV1SyncedProject_universal_d_MediaFileOutput as MediaFileOutput,
      portfolioSyncedprojectsV1SyncedProject_universal_d_MediaVideoOutput as MediaVideoOutput,
      portfolioSyncedprojectsV1SyncedProject_universal_d_MediaImageOutput as MediaImageOutput,
      portfolioSyncedprojectsV1SyncedProject_universal_d_ItemCreatedMediaCallbackResponse as ItemCreatedMediaCallbackResponse,
      portfolioSyncedprojectsV1SyncedProject_universal_d_ProjectCoverImageCreatedMediaCallbackRequest as ProjectCoverImageCreatedMediaCallbackRequest,
      portfolioSyncedprojectsV1SyncedProject_universal_d_ProjectCoverImageCreatedMediaCallbackResponse as ProjectCoverImageCreatedMediaCallbackResponse,
      portfolioSyncedprojectsV1SyncedProject_universal_d_MetaSiteSpecialEvent as MetaSiteSpecialEvent,
      portfolioSyncedprojectsV1SyncedProject_universal_d_MetaSiteSpecialEventPayloadOneOf as MetaSiteSpecialEventPayloadOneOf,
      portfolioSyncedprojectsV1SyncedProject_universal_d_Asset as Asset,
      portfolioSyncedprojectsV1SyncedProject_universal_d_State as State,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SiteCreated as SiteCreated,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SiteCreatedContext as SiteCreatedContext,
      portfolioSyncedprojectsV1SyncedProject_universal_d_Namespace as Namespace,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SiteTransferred as SiteTransferred,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SiteDeleted as SiteDeleted,
      portfolioSyncedprojectsV1SyncedProject_universal_d_DeleteContext as DeleteContext,
      portfolioSyncedprojectsV1SyncedProject_universal_d_DeleteStatus as DeleteStatus,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SiteUndeleted as SiteUndeleted,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SitePublished as SitePublished,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SiteUnpublished as SiteUnpublished,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SiteMarkedAsTemplate as SiteMarkedAsTemplate,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SiteMarkedAsWixSite as SiteMarkedAsWixSite,
      portfolioSyncedprojectsV1SyncedProject_universal_d_ServiceProvisioned as ServiceProvisioned,
      portfolioSyncedprojectsV1SyncedProject_universal_d_ServiceRemoved as ServiceRemoved,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SiteRenamed as SiteRenamed,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SiteHardDeleted as SiteHardDeleted,
      portfolioSyncedprojectsV1SyncedProject_universal_d_NamespaceChanged as NamespaceChanged,
      portfolioSyncedprojectsV1SyncedProject_universal_d_StudioAssigned as StudioAssigned,
      portfolioSyncedprojectsV1SyncedProject_universal_d_StudioUnassigned as StudioUnassigned,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SyncAllSitesEvent as SyncAllSitesEvent,
      portfolioSyncedprojectsV1SyncedProject_universal_d_MessageEnvelope as MessageEnvelope,
      portfolioSyncedprojectsV1SyncedProject_universal_d_IdentificationData as IdentificationData,
      portfolioSyncedprojectsV1SyncedProject_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      portfolioSyncedprojectsV1SyncedProject_universal_d_WebhookIdentityType as WebhookIdentityType,
      portfolioSyncedprojectsV1SyncedProject_universal_d_getProjects as getProjects,
      portfolioSyncedprojectsV1SyncedProject_universal_d_GetProjectsOptions as GetProjectsOptions,
      portfolioSyncedprojectsV1SyncedProject_universal_d_syncProject as syncProject,
      portfolioSyncedprojectsV1SyncedProject_universal_d_SyncProjectIdentifiers as SyncProjectIdentifiers,
      portfolioSyncedprojectsV1SyncedProject_universal_d_getSyncStatus as getSyncStatus,
      portfolioSyncedprojectsV1SyncedProject_universal_d_GetSyncStatusIdentifiers as GetSyncStatusIdentifiers,
      portfolioSyncedprojectsV1SyncedProject_universal_d_stopSync as stopSync,
      portfolioSyncedprojectsV1SyncedProject_universal_d_StopSyncIdentifiers as StopSyncIdentifiers,
      portfolioSyncedprojectsV1SyncedProject_universal_d_getLoginRedirectableUrl as getLoginRedirectableUrl,
      portfolioSyncedprojectsV1SyncedProject_universal_d_itemCreatedMediaCallback as itemCreatedMediaCallback,
      portfolioSyncedprojectsV1SyncedProject_universal_d_ItemCreatedMediaCallbackIdentifiers as ItemCreatedMediaCallbackIdentifiers,
      portfolioSyncedprojectsV1SyncedProject_universal_d_ItemCreatedMediaCallbackOptions as ItemCreatedMediaCallbackOptions,
      portfolioSyncedprojectsV1SyncedProject_universal_d_projectCoverImageCreatedMediaCallback as projectCoverImageCreatedMediaCallback,
      portfolioSyncedprojectsV1SyncedProject_universal_d_ProjectCoverImageCreatedMediaCallbackIdentifiers as ProjectCoverImageCreatedMediaCallbackIdentifiers,
      portfolioSyncedprojectsV1SyncedProject_universal_d_ProjectCoverImageCreatedMediaCallbackOptions as ProjectCoverImageCreatedMediaCallbackOptions,
    };
  }
  
  export { portfolioCollectionsV1Collection_universal_d as collections, portfolioPortfolioAppV1PortfolioSettings_universal_d as portfolioSettings, portfolioProjectsV1ProjectInCollection_universal_d as projectInCollections, portfolioProjectItemsV1ProjectItem_universal_d as projectItems, portfolioProjectsV1Project_universal_d as projects, portfolioSyncedprojectsV1SyncedProject_universal_d as syncedProject };
}
