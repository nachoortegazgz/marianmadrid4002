declare module "wix-promote-growth-tools-design.v1" {
  /** Design is the main entity of SocialMarketingDesignSPI */
  interface Design {
      /**
       * External design ID.
       * @readonly
       */
      _id?: string;
      /** Provider ID. */
      providerId?: string;
      /** Thumbnail of the design. deprecarted */
      thumbnail?: string;
      /** Media url of the design. deprecarted */
      mediaUrl?: string;
      /** Format of the design. deprecarted */
      format?: Format;
      /**
       * The date and time the design was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * The date and time the design was last edited.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Media type of the design. deprecarted */
      mediaType?: MediaType;
      /** Host metadata. */
      hostMetadata?: HostMetadata;
      /** Thumbnail url of the design. */
      thumbnailUrl?: string;
      /** Media of the design */
      media?: Media[];
  }
  enum Format {
      UNKNOWN = "UNKNOWN",
      SQUARE = "SQUARE",
      PORTRAIT = "PORTRAIT",
      LANDSCAPE = "LANDSCAPE"
  }
  enum MediaType {
      UNKNOWN = "UNKNOWN",
      IMAGE = "IMAGE",
      VIDEO = "VIDEO",
      GIF = "GIF"
  }
  interface HostMetadata {
      /**
       * Internal database ID of the design.
       * @readonly
       */
      internalId?: string;
      /**
       * Represents the current state of an item. Each time the item is modified, its `revision` changes. For an update operation to succeed, you MUST pass the latest revision.
       * @readonly
       */
      revision?: string | null;
  }
  interface Media {
      /** Url of the media item. */
      url?: string;
      /** Type of the media item. */
      type?: MediaType;
      /** Format of the media item. */
      format?: Format;
  }
  interface CreateDesignRequestLegacy {
      /** Design to be created */
      design: Design;
  }
  interface CreateDesignResponseLegacy {
      /** The created Design */
      design?: Design;
  }
  interface GetDesignRequestLegacy {
      /** Id of the Design to retrieve */
      designId: string;
  }
  interface GetDesignResponseLegacy {
      /** The retrieved Design */
      design?: Design;
  }
  interface UpdateDesignRequestLegacy {
      /** Design to be updated, may be partial */
      design: Design;
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  interface UpdateDesignResponseLegacy {
      /** The updated Design */
      design?: Design;
  }
  interface DeleteDesignRequestLegacy {
      /** Id of the Design to delete */
      designId: string;
      /** The revision of the Design */
      revision?: string;
  }
  interface DeleteDesignResponseLegacy {
  }
  interface QueryDesignRequestLegacy {
      /** WQL expression */
      query: QueryV2;
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
  interface QueryDesignResponseLegacy {
      /** The retrieved Designs */
      designs?: Design[];
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
  interface CreateDesignRequest {
      /** Design to be created */
      design: Design;
  }
  interface CreateDesignResponse {
      /** The created Design */
      design?: Design;
  }
  interface GetDesignRequest {
      /** Id of the Design to retrieve */
      designId: string;
  }
  interface GetDesignResponse {
      /** The retrieved Design */
      design?: Design;
  }
  interface GetTenantDesignsRequest {
  }
  interface GetTenantDesignsResponse {
      /** The retrieved Designs */
      designs?: Design[];
  }
  interface UpdateDesignRequest {
      /** Design to be updated, may be partial */
      design: Design;
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  interface UpdateDesignResponse {
      /** The updated Design */
      design?: Design;
  }
  interface DeleteDesignRequest {
      /** Id of the Design to delete. */
      designId: string;
      /** The revision of the Design */
      revision?: string;
  }
  interface DeleteDesignResponse {
  }
  interface ListProvidersRequest {
  }
  interface ListProvidersResponse {
      /** Providers who implement the SPI */
      providers?: ProviderInfo[];
  }
  interface ProviderInfo {
      /**
       * Provider ID
       * @readonly
       */
      _id?: string;
      /** Provider display name */
      name?: string;
      /**
       * Provider SPI configuration
       * @readonly
       */
      configuration?: SocialMarketingDesignsProviderConfig;
      /** Current app installation status */
      installationState?: InstallationState;
      /** Provider's app's icon */
      appIconUrl?: string;
  }
  interface SocialMarketingDesignsProviderConfig {
      /** Base URI which Wix will call to retrieve designs. For example, `https://my-design-provider.com/v1/listDesigns`. Required when the provider manages the designs on their own server. */
      baseUri?: string;
      /** Required. Human-readable name of the design provider app. */
      name?: string;
      /** Required. Component ID of the dashboard component. */
      editorComponentId?: string;
      /** The icon URL of the app that will be displayed in the . The icon will be displayed in the UI of the social media marketing dashboard page. */
      iconUrl?: string;
      /** Required. How the composer should be opened. One of: `"MODAL"`, `"NAVIGATE"` */
      navigationType?: NavigationType;
      /** Whether the designs can be deleted from a site owner's dashboard. When `false`, designs can only be deleted from the provider's database. */
      deleteDesignEnabled?: boolean;
      /** Whether the designs are managed by the provider. When `false`, designs are managed by Wix. */
      manageDesigns?: boolean;
  }
  enum NavigationType {
      NAVIGATE = "NAVIGATE",
      MODAL = "MODAL"
  }
  enum InstallationState {
      UNKNOWN = "UNKNOWN",
      /** App is not installed on site */
      NOT_INSTALLED = "NOT_INSTALLED",
      /** user need to finish configurations */
      PENDING_CONFIGURATIONS = "PENDING_CONFIGURATIONS",
      /** App is installed and configured */
      INSTALLED = "INSTALLED"
  }
  interface GetDesignsRequest {
  }
  interface GetDesignsResponse {
      /** The retrieved Designs */
      designs?: Design[];
  }
  interface DeleteProviderDesignRequest {
      /** Id of the relevant provider */
      providerId: string;
      /** Design to be created */
      design: Design;
  }
  interface DeleteProviderDesignResponse {
      /** Deletion success */
      success?: boolean;
  }
  interface CreateProviderDesignRequest {
      /** Id of the relevant provider */
      providerId: string;
      /** Design to be created */
      design: Design;
  }
  interface CreateProviderDesignResponse {
      /** The created Design */
      design?: Design;
  }
  interface UpdateProviderDesignRequest {
      /** Id of the relevant provider */
      providerId: string;
      /** Design to be updated, may be partial */
      design: Design;
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  interface UpdateProviderDesignResponse {
      /** The created Design */
      design?: Design;
  }
  /**
   * List all providers who implement the SPI
   * @param design - Design to be created
   * @internal
   * @documentationMaturity preview
   * @requiredField design
   * @permissionId promote-shareit.manage
   * @adminMethod
   */
  function createDesignLegacyV1(design: Design): Promise<CreateDesignResponseLegacy>;
  /**
   * Retrieves a design of a specific provider
   * @param designId - Id of the Design to retrieve
   * @internal
   * @documentationMaturity preview
   * @requiredField designId
   * @permissionId promote-shareit.manage
   * @adminMethod
   */
  function getDesignLegacy(designId: string): Promise<GetDesignResponseLegacy>;
  /**
   * Update a Design, supports partial update
   * @param internalId - Internal database ID of the design.
   * @internal
   * @documentationMaturity preview
   * @requiredField design
   * @requiredField design.hostMetadata.revision
   * @requiredField internalId
   * @permissionId promote-shareit.manage
   * @adminMethod
   */
  function updateDesignLegacy(internalId: string, design: UpdateDesignLegacyDesign, options?: UpdateDesignLegacyOptions): Promise<UpdateDesignResponseLegacy>;
  interface UpdateDesignLegacyDesign {
      /**
       * External design ID.
       * @readonly
       */
      _id?: string;
      /** Provider ID. */
      providerId?: string;
      /** Thumbnail of the design. deprecarted */
      thumbnail?: string;
      /** Media url of the design. deprecarted */
      mediaUrl?: string;
      /** Format of the design. deprecarted */
      format?: Format;
      /**
       * The date and time the design was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * The date and time the design was last edited.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Media type of the design. deprecarted */
      mediaType?: MediaType;
      /** Thumbnail url of the design. */
      thumbnailUrl?: string;
      /** Media of the design */
      media?: Media[];
  }
  interface UpdateDesignLegacyOptions {
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  /**
   * Delete a Design
   * @param designId - Id of the Design to delete
   * @internal
   * @documentationMaturity preview
   * @requiredField designId
   * @permissionId promote-shareit.manage
   * @adminMethod
   */
  function deleteDesignLegacy(designId: string, options?: DeleteDesignLegacyOptions): Promise<void>;
  interface DeleteDesignLegacyOptions {
      /** The revision of the Design */
      revision?: string;
  }
  /**
   * Query Designs using [WQL - Wix Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language)
   * @param query - WQL expression
   * @internal
   * @documentationMaturity preview
   * @requiredField query
   * @permissionId promote-shareit.manage
   * @adminMethod
   */
  function queryDesignLegacy(query: QueryV2): Promise<QueryDesignResponseLegacy>;
  /**
   * List all providers who implement the SPI
   * @param design - Design to be created
   * @internal
   * @documentationMaturity preview
   * @requiredField design
   * @permissionId promote-shareit.manage
   * @adminMethod
   */
  function createDesign(design: Design): Promise<CreateDesignResponse>;
  /**
   * Retrieves a design of a specific provider
   * @param designId - Id of the Design to retrieve
   * @internal
   * @documentationMaturity preview
   * @requiredField designId
   * @permissionId promote-shareit.manage
   * @adminMethod
   */
  function getDesign(designId: string): Promise<GetDesignResponse>;
  /**
   * Retrieves all designs for tenant
   * @internal
   * @documentationMaturity preview
   * @permissionId promote-shareit.manage
   * @adminMethod
   */
  function getTenantDesigns(): Promise<GetTenantDesignsResponse>;
  /**
   * Update a Design, supports partial update
   * @param internalId - Internal database ID of the design.
   * @internal
   * @documentationMaturity preview
   * @requiredField design
   * @requiredField design.hostMetadata.revision
   * @requiredField internalId
   * @permissionId promote-shareit.manage
   * @adminMethod
   */
  function updateDesign(internalId: string, design: UpdateDesign, options?: UpdateDesignOptions): Promise<UpdateDesignResponse>;
  interface UpdateDesign {
      /**
       * External design ID.
       * @readonly
       */
      _id?: string;
      /** Provider ID. */
      providerId?: string;
      /** Thumbnail of the design. deprecarted */
      thumbnail?: string;
      /** Media url of the design. deprecarted */
      mediaUrl?: string;
      /** Format of the design. deprecarted */
      format?: Format;
      /**
       * The date and time the design was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * The date and time the design was last edited.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Media type of the design. deprecarted */
      mediaType?: MediaType;
      /** Thumbnail url of the design. */
      thumbnailUrl?: string;
      /** Media of the design */
      media?: Media[];
  }
  interface UpdateDesignOptions {
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  /**
   * Delete a Design
   * @param designId - Id of the Design to delete.
   * @internal
   * @documentationMaturity preview
   * @requiredField designId
   * @permissionId promote-shareit.manage
   * @adminMethod
   */
  function deleteDesign(designId: string, options?: DeleteDesignOptions): Promise<void>;
  interface DeleteDesignOptions {
      /** The revision of the Design */
      revision?: string;
  }
  /**
   * List all providers who implement the SPI
   * @public
   * @documentationMaturity preview
   * @permissionId promote-shareit.manage
   * @adminMethod
   */
  function listProviders(): Promise<ListProvidersResponse>;
  /**
   * Retrieves all designs
   * @public
   * @documentationMaturity preview
   * @permissionId promote-shareit.manage
   * @adminMethod
   */
  function getDesigns(): Promise<GetDesignsResponse>;
  /**
   * Delete a Design
   * @param providerId - Id of the relevant provider
   * @param design - Design to be created
   * @public
   * @documentationMaturity preview
   * @requiredField design
   * @requiredField providerId
   * @permissionId promote-shareit.manage
   * @adminMethod
   */
  function deleteProviderDesign(providerId: string, design: Design): Promise<DeleteProviderDesignResponse>;
  /**
   * Create a Design
   * @param providerId - Id of the relevant provider
   * @param design - Design to be created
   * @public
   * @documentationMaturity preview
   * @requiredField design
   * @requiredField providerId
   * @permissionId promote-shareit.manage
   * @adminMethod
   */
  function createProviderDesign(providerId: string, design: Design): Promise<CreateProviderDesignResponse>;
  /**
   * Update a Design
   * @param providerId - Id of the relevant provider
   * @param design - Design to be updated, may be partial
   * @public
   * @documentationMaturity preview
   * @requiredField design
   * @requiredField providerId
   * @permissionId promote-shareit.manage
   * @adminMethod
   */
  function updateProviderDesign(providerId: string, design: Design, options?: UpdateProviderDesignOptions): Promise<UpdateProviderDesignResponse>;
  interface UpdateProviderDesignOptions {
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  
  export { ActionEvent, CreateDesignRequest, CreateDesignRequestLegacy, CreateDesignResponse, CreateDesignResponseLegacy, CreateProviderDesignRequest, CreateProviderDesignResponse, CursorPaging, DeleteDesignLegacyOptions, DeleteDesignOptions, DeleteDesignRequest, DeleteDesignRequestLegacy, DeleteDesignResponse, DeleteDesignResponseLegacy, DeleteProviderDesignRequest, DeleteProviderDesignResponse, Design, DomainEvent, DomainEventBodyOneOf, EntityCreatedEvent, EntityDeletedEvent, EntityUpdatedEvent, Format, GetDesignRequest, GetDesignRequestLegacy, GetDesignResponse, GetDesignResponseLegacy, GetDesignsRequest, GetDesignsResponse, GetTenantDesignsRequest, GetTenantDesignsResponse, HostMetadata, IdentificationData, IdentificationDataIdOneOf, InstallationState, ListProvidersRequest, ListProvidersResponse, Media, MediaType, MessageEnvelope, NavigationType, Paging, ProviderInfo, QueryDesignRequestLegacy, QueryDesignResponseLegacy, QueryV2, QueryV2PagingMethodOneOf, RestoreInfo, SocialMarketingDesignsProviderConfig, SortOrder, Sorting, UpdateDesign, UpdateDesignLegacyDesign, UpdateDesignLegacyOptions, UpdateDesignOptions, UpdateDesignRequest, UpdateDesignRequestLegacy, UpdateDesignResponse, UpdateDesignResponseLegacy, UpdateProviderDesignOptions, UpdateProviderDesignRequest, UpdateProviderDesignResponse, WebhookIdentityType, createDesign, createDesignLegacyV1, createProviderDesign, deleteDesign, deleteDesignLegacy, deleteProviderDesign, getDesign, getDesignLegacy, getDesigns, getTenantDesigns, listProviders, queryDesignLegacy, updateDesign, updateDesignLegacy, updateProviderDesign };
}
