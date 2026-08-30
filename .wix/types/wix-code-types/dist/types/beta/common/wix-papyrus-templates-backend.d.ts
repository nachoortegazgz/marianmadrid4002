declare module "wix-papyrus-templates-backend" {
  interface TemplateSettings {
      /**
       * Auto generated ID.
       * @readonly
       */
      _id?: string | null;
      /** Wix app definition ID. */
      appSlug?: string | null;
      /** The type of the template. */
      templateType?: string | null;
      /** The id of the template. */
      templateId?: string | null;
      /**
       * Template settings external ID. For example ticket definition ID.
       * Must be unique per tenant where tenant is taken from authorization (wix_app_id + meta_site_id)
       */
      externalId?: string | null;
      /**
       * Date settings were created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date settings were updated.
       * @readonly
       */
      _updatedDate?: Date;
      settingGroups?: SettingsGroup[];
      /** Paper size */
      paperSize?: PaperSize;
  }
  interface TextSetting {
      /** Font family class name */
      fontFamily?: string | null;
      /** Font style class names */
      fontStyle?: string[];
      /** Text alignment class name */
      textAlignment?: string | null;
      /** Text color hex code */
      textColor?: string | null;
      /** Font size */
      fontSize?: number | null;
      /** Text content setting */
      textContent?: TextContent[];
  }
  interface TextContent {
      _id?: string;
      value?: string | null;
      visible?: boolean;
  }
  interface ImageSetting {
      /** Wix media Image */
      image?: string;
      /** Image resizing mode */
      resize?: ResizeOption;
  }
  enum ResizeOption {
      /** Automatically resizes full image to fit image field */
      FIT = "FIT",
      /** Enables user to manually crop image to fit image field */
      CROP = "CROP"
  }
  interface SelectSetting {
      /** Selected value */
      value?: string | null;
      /** Color hex code */
      primaryColor?: string | null;
      /** Color hex code */
      secondaryColor?: string | null;
      /** Size */
      size?: number | null;
  }
  interface BackgroundSetting {
      /** Color of the background hex code */
      color?: string | null;
      /** Wix media Image */
      image?: string;
  }
  interface SettingsGroup {
      /** Id of the control group */
      groupId?: string;
      /** Display settings. */
      display?: Record<string, boolean>;
      /** Texts settings. */
      texts?: Record<string, TextSetting>;
      /** Images settings. */
      images?: Record<string, ImageSetting>;
      /** Select option settings. */
      selects?: Record<string, SelectSetting>;
      /** Backgrounds settings. */
      backgrounds?: Record<string, BackgroundSetting>;
  }
  enum PaperSize {
      A4_PORTRAIT = "A4_PORTRAIT",
      A4_LANDSCAPE = "A4_LANDSCAPE"
  }
  interface CreateTemplateSettingsRequest {
      /** Settings to be created. */
      settings?: TemplateSettings;
  }
  interface CreateTemplateSettingsResponse {
      /** Created settings. */
      settings?: TemplateSettings;
  }
  interface BulkCreateTemplateSettingsRequest {
      /** Settings to be created. */
      settings?: TemplateSettings[];
  }
  interface BulkCreateTemplateSettingsResponse {
      /** Created settings */
      settings?: TemplateSettings[];
  }
  interface UpsertTemplateSettingsRequest {
      /** Settings to be upserted. */
      settings?: TemplateSettings;
  }
  interface UpsertTemplateSettingsResponse {
      /** Upserted settings. */
      settings?: TemplateSettings;
  }
  interface GetTemplateSettingsRequest {
      /** Settings ID. */
      templateSettingsId: string;
  }
  interface GetTemplateSettingsResponse {
      /** Retrieved settings. */
      settings?: TemplateSettings;
  }
  interface UpdateTemplateSettingsRequest {
      /** Template Settings to be updated. */
      settings?: TemplateSettings;
  }
  interface UpdateTemplateSettingsResponse {
      /** Updated settings. */
      settings?: TemplateSettings;
  }
  interface DeleteTemplateSettingsRequest {
      /** Settings ID. */
      templateSettingsId: string;
  }
  interface DeleteTemplateSettingsResponse {
      /** Deleted settings. */
      settings?: TemplateSettings;
  }
  interface QueryTemplateSettingsRequest {
      /** Generic query object. */
      query: QueryV2;
  }
  interface QueryV2 extends QueryV2PagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
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
  interface QueryTemplateSettingsResponse {
      /** Template settings results. */
      settings?: TemplateSettings[];
      /** Query result's metadata. */
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
  interface ResolveTemplateSettingsRequest {
      /** The id of the settings. */
      templateSettingsId?: string | null;
      /** External ID. */
      templateSettingsExternalId?: string | null;
      /** The type of the template. Used to resolve default settings. */
      templateType: string | null;
      /** Wix app slug. */
      appSlug: string | null;
      /** The id of template. */
      templateId?: string | null;
  }
  interface ResolveTemplateSettingsResponse {
      /** Retrieved settings. */
      settings?: TemplateSettings;
  }
  interface GetTemplateControlsRequest {
  }
  interface GetTemplateControlsResponse {
      templateControls?: TemplateControls;
  }
  interface TemplateControls {
      /** The name of the template */
      templateName?: string;
      /** The controls groups configuration */
      controlGroups?: ControlGroup[];
  }
  /** Represents control groups on the left side of the UI */
  interface ControlGroup {
      groupId?: string;
      icon?: string;
      labelKey?: string;
      titleKey?: string;
      descriptionKey?: string;
      linkKey?: string | null;
      linkUrl?: string | null;
      tooltipKey?: string | null;
      /** Display controls */
      display?: DisplayControl[];
      /** Text controls */
      texts?: TextControl[];
      /** Image controls */
      images?: ImageControl[];
      /** Select controls */
      selects?: SelectControl[];
      /** Background controls */
      backgrounds?: BackgroundControl[];
  }
  interface DisplayControl {
      /** The id of the setting */
      _id?: string;
      /** Optional label key for translations */
      labelKey?: string | null;
      /** Default setting for this control */
      default?: boolean;
  }
  interface TextControl {
      /** The id of the setting */
      _id?: string;
      /** Optional label key for translations */
      labelKey?: string | null;
      /** Default setting for this control */
      default?: TextSetting;
      /** Text properties */
      textProperties?: TextPropertyControl[];
      textContent?: TextContentControl[];
  }
  interface TextPropertyControl {
      /** One of "fontFamily", "fontStyle", "fontSize", "textAlignment" */
      type?: string;
      /** Optional label key for translations */
      labelKey?: string | null;
      /** List of possible options. Used for "fontFamily", "fontStyle", "textAlignment" */
      options?: ValueOption[];
      /** Optional range of the value. Used for "fontSize" */
      range?: Range;
  }
  interface ValueOption {
      /** The label key for translations */
      labelKey?: string;
      /** The value */
      value?: string;
  }
  interface Range {
      /** Minimum value. */
      min?: number | null;
      /** Maximum value. */
      max?: number | null;
  }
  interface TextContentControl {
      _id?: string;
      labelKey?: string | null;
      maxLength?: number | null;
  }
  interface ImageControl {
      /** The id of the setting */
      _id?: string;
      /** Optional label key for translations */
      labelKey?: string | null;
      /** Default setting for this control */
      default?: ImageSetting;
      /** Optional description key for translations */
      descriptionKey?: string | null;
      /** Enable logo builder support */
      showLogoBuilder?: boolean;
  }
  interface SelectControl {
      /** The id of the setting */
      _id?: string;
      /** Optional label key for translations */
      labelKey?: string | null;
      /** Default setting for this control */
      default?: SelectSetting;
      /** List of possible options */
      options?: ValueOption[];
      /** Allows to use primary colour setting from template designer */
      showPrimaryColorPicker?: boolean;
      /** Allows to use secondary colour setting from template designer */
      showSecondaryColorPicker?: boolean;
      /** Allows to use size setting from template designer. */
      showSize?: boolean;
      /** Optional range of the size value. */
      sizeRange?: Range;
  }
  interface BackgroundControl {
      /** The id of the setting */
      _id?: string;
      /** Optional label key for translations */
      labelKey?: string | null;
      /** Default setting for this control */
      default?: BackgroundSetting;
      /** Allows to use colour setting from template designer */
      showColorPicker?: boolean;
      /** Allows to use image setting from template designer */
      showImagePicker?: boolean;
      /** Enables background opacity control */
      opacityEnabled?: boolean | null;
      /** Enables background image opacity control */
      imageOpacityEnabled?: boolean | null;
      /** Default media manager folder with background images */
      mediaRootFolder?: string | null;
  }
  interface GetTemplateRegistryRequest {
  }
  interface GetTemplateRegistryResponse {
      templateRegistry?: TemplateRegistry;
  }
  interface TemplateRegistry {
      /** Templates. */
      templates?: WixAppTemplate[];
  }
  /** Defines a template and it's styles. */
  interface WixAppTemplate {
      /** Wix App Id */
      wixAppId?: string;
      /** App Slug */
      appSlug?: string;
      /** Template type. */
      templateType?: string;
      /** Templates */
      templates?: TemplateStyle[];
  }
  /**
   * Defines a template style.
   *
   * Path to TemplateControls json file:
   * papyrus-templates-lib/
   * src/
   * templates/
   * {app_slug}/
   * {template_type}/
   * {id}/
   * controls.json
   */
  interface TemplateStyle {
      /** The id of the template. */
      _id?: string;
      /**
       * Determines which template should be used if user did not choose it yet.
       * Only single template per wix_app_id can be default.
       */
      default?: boolean;
      /** Determines if template cannot be selected for a new entity. */
      inactive?: boolean;
      /** Paper size */
      paperSize?: PaperSize;
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
      deletedDate?: Date;
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
   * Create Template Settings.
   * @internal
   * @documentationMaturity preview
   * @requiredField options.settings.appSlug
   * @requiredField options.settings.externalId
   * @requiredField options.settings.templateId
   * @requiredField options.settings.templateType
   * @adminMethod
   * @returns Created settings.
   */
  function createTemplateSettings(options?: CreateTemplateSettingsOptions): Promise<TemplateSettings>;
  interface CreateTemplateSettingsOptions {
      /** Settings to be created. */
      settings?: TemplateSettings;
  }
  /**
   * Upsert Template Settings.
   * @public
   * @documentationMaturity preview
   * @requiredField options.settings.appSlug
   * @requiredField options.settings.externalId
   * @requiredField options.settings.templateId
   * @requiredField options.settings.templateType
   * @adminMethod
   */
  function upsertTemplateSettings(options?: UpsertTemplateSettingsOptions): Promise<UpsertTemplateSettingsResponse>;
  interface UpsertTemplateSettingsOptions {
      /** Settings to be upserted. */
      settings?: TemplateSettings;
  }
  /**
   * Get Template Settings.
   * @param templateSettingsId - Settings ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField templateSettingsId
   * @adminMethod
   * @returns Retrieved settings.
   */
  function getTemplateSettings(templateSettingsId: string): Promise<TemplateSettings>;
  /**
   * Update Template Settings.
   * @internal
   * @documentationMaturity preview
   * @requiredField options.settings._id
   * @requiredField options.settings.templateId
   * @requiredField options.settings.templateType
   * @adminMethod
   * @returns Updated settings.
   */
  function updateTemplateSettings(options?: UpdateTemplateSettingsOptions): Promise<TemplateSettings>;
  interface UpdateTemplateSettingsOptions {
      /** Template Settings to be updated. */
      settings?: TemplateSettings;
  }
  /**
   * Delete Template Settings.
   * @param templateSettingsId - Settings ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField templateSettingsId
   * @adminMethod
   */
  function deleteTemplateSettings(templateSettingsId: string): Promise<DeleteTemplateSettingsResponse>;
  /**
   * Lists Template Settings.
   * @public
   * @documentationMaturity preview
   * @permissionId PAPYRUS.READ_TEMPLATE_SETTINGS
   * @adminMethod
   */
  function queryTemplateSettings(): SettingsQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface SettingsQueryResult extends QueryCursorResult {
      items: TemplateSettings[];
      query: SettingsQueryBuilder;
      next: () => Promise<SettingsQueryResult>;
      prev: () => Promise<SettingsQueryResult>;
  }
  interface SettingsQueryBuilder {
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => SettingsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => SettingsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<SettingsQueryResult>;
  }
  /**
   * Resolve Template Settings. Returns default Template Settings if it does not exist.
   * @public
   * @documentationMaturity preview
   * @requiredField options.appSlug
   * @requiredField options.templateType
   * @adminMethod
   */
  function resolveTemplateSettings(options?: ResolveTemplateSettingsOptions): Promise<ResolveTemplateSettingsResponse>;
  interface ResolveTemplateSettingsOptions {
      /** The id of the settings. */
      templateSettingsId?: string | null;
      /** External ID. */
      templateSettingsExternalId?: string | null;
      /** The type of the template. Used to resolve default settings. */
      templateType: string | null;
      /** Wix app slug. */
      appSlug: string | null;
      /** The id of template. */
      templateId?: string | null;
  }
  
  type papyrusV1TemplateSettings_universal_d_TemplateSettings = TemplateSettings;
  type papyrusV1TemplateSettings_universal_d_TextSetting = TextSetting;
  type papyrusV1TemplateSettings_universal_d_TextContent = TextContent;
  type papyrusV1TemplateSettings_universal_d_ImageSetting = ImageSetting;
  type papyrusV1TemplateSettings_universal_d_ResizeOption = ResizeOption;
  const papyrusV1TemplateSettings_universal_d_ResizeOption: typeof ResizeOption;
  type papyrusV1TemplateSettings_universal_d_SelectSetting = SelectSetting;
  type papyrusV1TemplateSettings_universal_d_BackgroundSetting = BackgroundSetting;
  type papyrusV1TemplateSettings_universal_d_SettingsGroup = SettingsGroup;
  type papyrusV1TemplateSettings_universal_d_PaperSize = PaperSize;
  const papyrusV1TemplateSettings_universal_d_PaperSize: typeof PaperSize;
  type papyrusV1TemplateSettings_universal_d_CreateTemplateSettingsRequest = CreateTemplateSettingsRequest;
  type papyrusV1TemplateSettings_universal_d_CreateTemplateSettingsResponse = CreateTemplateSettingsResponse;
  type papyrusV1TemplateSettings_universal_d_BulkCreateTemplateSettingsRequest = BulkCreateTemplateSettingsRequest;
  type papyrusV1TemplateSettings_universal_d_BulkCreateTemplateSettingsResponse = BulkCreateTemplateSettingsResponse;
  type papyrusV1TemplateSettings_universal_d_UpsertTemplateSettingsRequest = UpsertTemplateSettingsRequest;
  type papyrusV1TemplateSettings_universal_d_UpsertTemplateSettingsResponse = UpsertTemplateSettingsResponse;
  type papyrusV1TemplateSettings_universal_d_GetTemplateSettingsRequest = GetTemplateSettingsRequest;
  type papyrusV1TemplateSettings_universal_d_GetTemplateSettingsResponse = GetTemplateSettingsResponse;
  type papyrusV1TemplateSettings_universal_d_UpdateTemplateSettingsRequest = UpdateTemplateSettingsRequest;
  type papyrusV1TemplateSettings_universal_d_UpdateTemplateSettingsResponse = UpdateTemplateSettingsResponse;
  type papyrusV1TemplateSettings_universal_d_DeleteTemplateSettingsRequest = DeleteTemplateSettingsRequest;
  type papyrusV1TemplateSettings_universal_d_DeleteTemplateSettingsResponse = DeleteTemplateSettingsResponse;
  type papyrusV1TemplateSettings_universal_d_QueryTemplateSettingsRequest = QueryTemplateSettingsRequest;
  type papyrusV1TemplateSettings_universal_d_QueryV2 = QueryV2;
  type papyrusV1TemplateSettings_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
  type papyrusV1TemplateSettings_universal_d_Sorting = Sorting;
  type papyrusV1TemplateSettings_universal_d_SortOrder = SortOrder;
  const papyrusV1TemplateSettings_universal_d_SortOrder: typeof SortOrder;
  type papyrusV1TemplateSettings_universal_d_Paging = Paging;
  type papyrusV1TemplateSettings_universal_d_CursorPaging = CursorPaging;
  type papyrusV1TemplateSettings_universal_d_QueryTemplateSettingsResponse = QueryTemplateSettingsResponse;
  type papyrusV1TemplateSettings_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type papyrusV1TemplateSettings_universal_d_Cursors = Cursors;
  type papyrusV1TemplateSettings_universal_d_ResolveTemplateSettingsRequest = ResolveTemplateSettingsRequest;
  type papyrusV1TemplateSettings_universal_d_ResolveTemplateSettingsResponse = ResolveTemplateSettingsResponse;
  type papyrusV1TemplateSettings_universal_d_GetTemplateControlsRequest = GetTemplateControlsRequest;
  type papyrusV1TemplateSettings_universal_d_GetTemplateControlsResponse = GetTemplateControlsResponse;
  type papyrusV1TemplateSettings_universal_d_TemplateControls = TemplateControls;
  type papyrusV1TemplateSettings_universal_d_ControlGroup = ControlGroup;
  type papyrusV1TemplateSettings_universal_d_DisplayControl = DisplayControl;
  type papyrusV1TemplateSettings_universal_d_TextControl = TextControl;
  type papyrusV1TemplateSettings_universal_d_TextPropertyControl = TextPropertyControl;
  type papyrusV1TemplateSettings_universal_d_ValueOption = ValueOption;
  type papyrusV1TemplateSettings_universal_d_Range = Range;
  type papyrusV1TemplateSettings_universal_d_TextContentControl = TextContentControl;
  type papyrusV1TemplateSettings_universal_d_ImageControl = ImageControl;
  type papyrusV1TemplateSettings_universal_d_SelectControl = SelectControl;
  type papyrusV1TemplateSettings_universal_d_BackgroundControl = BackgroundControl;
  type papyrusV1TemplateSettings_universal_d_GetTemplateRegistryRequest = GetTemplateRegistryRequest;
  type papyrusV1TemplateSettings_universal_d_GetTemplateRegistryResponse = GetTemplateRegistryResponse;
  type papyrusV1TemplateSettings_universal_d_TemplateRegistry = TemplateRegistry;
  type papyrusV1TemplateSettings_universal_d_WixAppTemplate = WixAppTemplate;
  type papyrusV1TemplateSettings_universal_d_TemplateStyle = TemplateStyle;
  type papyrusV1TemplateSettings_universal_d_DomainEvent = DomainEvent;
  type papyrusV1TemplateSettings_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type papyrusV1TemplateSettings_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type papyrusV1TemplateSettings_universal_d_RestoreInfo = RestoreInfo;
  type papyrusV1TemplateSettings_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type papyrusV1TemplateSettings_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type papyrusV1TemplateSettings_universal_d_ActionEvent = ActionEvent;
  type papyrusV1TemplateSettings_universal_d_MessageEnvelope = MessageEnvelope;
  type papyrusV1TemplateSettings_universal_d_IdentificationData = IdentificationData;
  type papyrusV1TemplateSettings_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type papyrusV1TemplateSettings_universal_d_WebhookIdentityType = WebhookIdentityType;
  const papyrusV1TemplateSettings_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const papyrusV1TemplateSettings_universal_d_createTemplateSettings: typeof createTemplateSettings;
  type papyrusV1TemplateSettings_universal_d_CreateTemplateSettingsOptions = CreateTemplateSettingsOptions;
  const papyrusV1TemplateSettings_universal_d_upsertTemplateSettings: typeof upsertTemplateSettings;
  type papyrusV1TemplateSettings_universal_d_UpsertTemplateSettingsOptions = UpsertTemplateSettingsOptions;
  const papyrusV1TemplateSettings_universal_d_getTemplateSettings: typeof getTemplateSettings;
  const papyrusV1TemplateSettings_universal_d_updateTemplateSettings: typeof updateTemplateSettings;
  type papyrusV1TemplateSettings_universal_d_UpdateTemplateSettingsOptions = UpdateTemplateSettingsOptions;
  const papyrusV1TemplateSettings_universal_d_deleteTemplateSettings: typeof deleteTemplateSettings;
  const papyrusV1TemplateSettings_universal_d_queryTemplateSettings: typeof queryTemplateSettings;
  type papyrusV1TemplateSettings_universal_d_SettingsQueryResult = SettingsQueryResult;
  type papyrusV1TemplateSettings_universal_d_SettingsQueryBuilder = SettingsQueryBuilder;
  const papyrusV1TemplateSettings_universal_d_resolveTemplateSettings: typeof resolveTemplateSettings;
  type papyrusV1TemplateSettings_universal_d_ResolveTemplateSettingsOptions = ResolveTemplateSettingsOptions;
  namespace papyrusV1TemplateSettings_universal_d {
    export {
      papyrusV1TemplateSettings_universal_d_TemplateSettings as TemplateSettings,
      papyrusV1TemplateSettings_universal_d_TextSetting as TextSetting,
      papyrusV1TemplateSettings_universal_d_TextContent as TextContent,
      papyrusV1TemplateSettings_universal_d_ImageSetting as ImageSetting,
      papyrusV1TemplateSettings_universal_d_ResizeOption as ResizeOption,
      papyrusV1TemplateSettings_universal_d_SelectSetting as SelectSetting,
      papyrusV1TemplateSettings_universal_d_BackgroundSetting as BackgroundSetting,
      papyrusV1TemplateSettings_universal_d_SettingsGroup as SettingsGroup,
      papyrusV1TemplateSettings_universal_d_PaperSize as PaperSize,
      papyrusV1TemplateSettings_universal_d_CreateTemplateSettingsRequest as CreateTemplateSettingsRequest,
      papyrusV1TemplateSettings_universal_d_CreateTemplateSettingsResponse as CreateTemplateSettingsResponse,
      papyrusV1TemplateSettings_universal_d_BulkCreateTemplateSettingsRequest as BulkCreateTemplateSettingsRequest,
      papyrusV1TemplateSettings_universal_d_BulkCreateTemplateSettingsResponse as BulkCreateTemplateSettingsResponse,
      papyrusV1TemplateSettings_universal_d_UpsertTemplateSettingsRequest as UpsertTemplateSettingsRequest,
      papyrusV1TemplateSettings_universal_d_UpsertTemplateSettingsResponse as UpsertTemplateSettingsResponse,
      papyrusV1TemplateSettings_universal_d_GetTemplateSettingsRequest as GetTemplateSettingsRequest,
      papyrusV1TemplateSettings_universal_d_GetTemplateSettingsResponse as GetTemplateSettingsResponse,
      papyrusV1TemplateSettings_universal_d_UpdateTemplateSettingsRequest as UpdateTemplateSettingsRequest,
      papyrusV1TemplateSettings_universal_d_UpdateTemplateSettingsResponse as UpdateTemplateSettingsResponse,
      papyrusV1TemplateSettings_universal_d_DeleteTemplateSettingsRequest as DeleteTemplateSettingsRequest,
      papyrusV1TemplateSettings_universal_d_DeleteTemplateSettingsResponse as DeleteTemplateSettingsResponse,
      papyrusV1TemplateSettings_universal_d_QueryTemplateSettingsRequest as QueryTemplateSettingsRequest,
      papyrusV1TemplateSettings_universal_d_QueryV2 as QueryV2,
      papyrusV1TemplateSettings_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf,
      papyrusV1TemplateSettings_universal_d_Sorting as Sorting,
      papyrusV1TemplateSettings_universal_d_SortOrder as SortOrder,
      papyrusV1TemplateSettings_universal_d_Paging as Paging,
      papyrusV1TemplateSettings_universal_d_CursorPaging as CursorPaging,
      papyrusV1TemplateSettings_universal_d_QueryTemplateSettingsResponse as QueryTemplateSettingsResponse,
      papyrusV1TemplateSettings_universal_d_PagingMetadataV2 as PagingMetadataV2,
      papyrusV1TemplateSettings_universal_d_Cursors as Cursors,
      papyrusV1TemplateSettings_universal_d_ResolveTemplateSettingsRequest as ResolveTemplateSettingsRequest,
      papyrusV1TemplateSettings_universal_d_ResolveTemplateSettingsResponse as ResolveTemplateSettingsResponse,
      papyrusV1TemplateSettings_universal_d_GetTemplateControlsRequest as GetTemplateControlsRequest,
      papyrusV1TemplateSettings_universal_d_GetTemplateControlsResponse as GetTemplateControlsResponse,
      papyrusV1TemplateSettings_universal_d_TemplateControls as TemplateControls,
      papyrusV1TemplateSettings_universal_d_ControlGroup as ControlGroup,
      papyrusV1TemplateSettings_universal_d_DisplayControl as DisplayControl,
      papyrusV1TemplateSettings_universal_d_TextControl as TextControl,
      papyrusV1TemplateSettings_universal_d_TextPropertyControl as TextPropertyControl,
      papyrusV1TemplateSettings_universal_d_ValueOption as ValueOption,
      papyrusV1TemplateSettings_universal_d_Range as Range,
      papyrusV1TemplateSettings_universal_d_TextContentControl as TextContentControl,
      papyrusV1TemplateSettings_universal_d_ImageControl as ImageControl,
      papyrusV1TemplateSettings_universal_d_SelectControl as SelectControl,
      papyrusV1TemplateSettings_universal_d_BackgroundControl as BackgroundControl,
      papyrusV1TemplateSettings_universal_d_GetTemplateRegistryRequest as GetTemplateRegistryRequest,
      papyrusV1TemplateSettings_universal_d_GetTemplateRegistryResponse as GetTemplateRegistryResponse,
      papyrusV1TemplateSettings_universal_d_TemplateRegistry as TemplateRegistry,
      papyrusV1TemplateSettings_universal_d_WixAppTemplate as WixAppTemplate,
      papyrusV1TemplateSettings_universal_d_TemplateStyle as TemplateStyle,
      papyrusV1TemplateSettings_universal_d_DomainEvent as DomainEvent,
      papyrusV1TemplateSettings_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      papyrusV1TemplateSettings_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      papyrusV1TemplateSettings_universal_d_RestoreInfo as RestoreInfo,
      papyrusV1TemplateSettings_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      papyrusV1TemplateSettings_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      papyrusV1TemplateSettings_universal_d_ActionEvent as ActionEvent,
      papyrusV1TemplateSettings_universal_d_MessageEnvelope as MessageEnvelope,
      papyrusV1TemplateSettings_universal_d_IdentificationData as IdentificationData,
      papyrusV1TemplateSettings_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      papyrusV1TemplateSettings_universal_d_WebhookIdentityType as WebhookIdentityType,
      papyrusV1TemplateSettings_universal_d_createTemplateSettings as createTemplateSettings,
      papyrusV1TemplateSettings_universal_d_CreateTemplateSettingsOptions as CreateTemplateSettingsOptions,
      papyrusV1TemplateSettings_universal_d_upsertTemplateSettings as upsertTemplateSettings,
      papyrusV1TemplateSettings_universal_d_UpsertTemplateSettingsOptions as UpsertTemplateSettingsOptions,
      papyrusV1TemplateSettings_universal_d_getTemplateSettings as getTemplateSettings,
      papyrusV1TemplateSettings_universal_d_updateTemplateSettings as updateTemplateSettings,
      papyrusV1TemplateSettings_universal_d_UpdateTemplateSettingsOptions as UpdateTemplateSettingsOptions,
      papyrusV1TemplateSettings_universal_d_deleteTemplateSettings as deleteTemplateSettings,
      papyrusV1TemplateSettings_universal_d_queryTemplateSettings as queryTemplateSettings,
      papyrusV1TemplateSettings_universal_d_SettingsQueryResult as SettingsQueryResult,
      papyrusV1TemplateSettings_universal_d_SettingsQueryBuilder as SettingsQueryBuilder,
      papyrusV1TemplateSettings_universal_d_resolveTemplateSettings as resolveTemplateSettings,
      papyrusV1TemplateSettings_universal_d_ResolveTemplateSettingsOptions as ResolveTemplateSettingsOptions,
    };
  }
  
  export { papyrusV1TemplateSettings_universal_d as papyrusTemplates };
}
