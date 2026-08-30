declare module "wix-custom-fields-schema.v2" {
  interface DataExtensionSchema {
      /**
       * Schema ID.
       * @readonly
       */
      _id?: string | null;
      /** FQDN of the entity this schema extends. */
      fqdn?: string | null;
      /**
       * Namespace for this schema. For example, an app creating schemas might use their app name as a namespace.
       * When a site owner creates a user-defined schema, the namespace is: `_user_fields`.
       */
      namespace?: string | null;
      /**
       * Schema definition in [JSON schema format](https://dev.wix.com/docs/build-apps/develop-your-app/extensions/backend-extensions/schema-plugins/the-json-schema) with the following [vocab](https://docs.json-everything.net/schema/vocabs/) extension:
       * ```
       * {
       * "$schema": "https://json-schema.org/draft/2020-12/schema",
       * "$id": "https://wixapis.com/v1/json-schema/extensions",
       * "$vocabulary": {
       * "https://wixapis.com/v1/json-schema/extensions/vocab/data-extensions": true
       * },
       * "$dynamicAnchor": "meta",
       * "title": "Wix' data-extensions vocabulary meta schema",
       * "type": [
       * "object",
       * "boolean"
       * ],
       * "properties": {
       * "x-wix-permissions": {
       * "type": "object",
       * "description": "list of identity types that are allowed reading schema properties",
       * "properties": {
       * "read": {
       * "type": "array",
       * "items": {
       * "type": "string",
       * "enum": [
       * "apps",
       * "owning-app",
       * "users",
       * "users-of-users"
       * ]
       * }
       * },
       * "write": {
       * "type": "array",
       * "items": {
       * "type": "string",
       * "enum": [
       * "apps",
       * "owning-app",
       * "users",
       * "users-of-users"
       * ]
       * }
       * }
       * }
       * },
       * "x-wix-display": {
       * "type": "object",
       * "description": "field display properties",
       * "schema": {
       * "properties": {
       * "placeholder": {
       * "type": "string",
       * "maxLength": 255,
       * "description": "placeholder text for input fields"
       * },
       * "label": {
       * "type": "string",
       * "maxLength": 255,
       * "description": "label of the input fields"
       * },
       * "hint": {
       * "type": "string",
       * "maxLength": 255,
       * "description": "a short explanation that appears next to the input field"
       * }
       * }
       * }
       * }
       * }
       * }
       * ```
       */
      jsonSchema?: Record<string, any> | null;
      /**
       * Date and time the schema was last updated.
       * @readonly
       */
      _updatedDate?: Date;
      /**
       * Date and time the schema was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Revision number, which increments by 1 each time the schema is updated. To prevent conflicting changes, the existing revision must be used when updating a schema.
       * @readonly
       */
      revision?: string | null;
      /**
       * app def if of the app in the given namespace
       * @internal
       * @readonly
       */
      appDefId?: string | null;
      /**
       * Maximum allowed schema size in bytes.
       * @readonly
       */
      maxLimitBytes?: number | null;
      /**
       * Current schema size in bytes.
       * @readonly
       */
      currentSizeBytes?: number | null;
      /** Name of the specific entity field this schema is extending, or `"ROOT"` for extensions for the entire entity. Default: `"ROOT"`. */
      extensionPoint?: string;
  }
  interface ReindexEvent {
      /** fqdn of the dext schema that needs reindexing */
      fqdn?: string;
      /** List of fields that needs reindexing */
      fields?: ReindexField[];
  }
  interface ReindexField {
      /** path of field that needs reindexing */
      fieldPath?: string;
      /** only reindex records updated after this timestamp */
      reindexSince?: Date;
  }
  interface CreateDataExtensionSchemaRequest {
      /** Schema to create. */
      dataExtensionSchema: DataExtensionSchema;
  }
  interface CreateDataExtensionSchemaResponse {
      /** Created schema. */
      dataExtensionSchema?: DataExtensionSchema;
  }
  interface UpdateDataExtensionSchemaRequest {
      /** Schema to update. */
      dataExtensionSchema?: DataExtensionSchema;
  }
  interface UpdateDataExtensionSchemaResponse {
      /** Updated schema. */
      dataExtensionSchema?: DataExtensionSchema;
  }
  interface ListDataExtensionSchemasRequest {
      /** [Fully qualified domain name](https://dev.wix.com/docs/rest/articles/getting-started/fqdns). */
      fqdn: string;
      /** Namespaces within the given entity. */
      namespaces?: string[];
      /** Additional fields that are hidden by default. For example, fields with `"x-wix-archived": true`. */
      fields?: RequestedField[];
  }
  enum RequestedField {
      /** Doesn't do anything */
      UNKNOWN_REQUESTED_FIELD = "UNKNOWN_REQUESTED_FIELD",
      /** Returns `x-wix-archived` fields in `DataExtensionSchema.json_schema`. */
      ARCHIVED = "ARCHIVED"
  }
  interface ListDataExtensionSchemasResponse {
      /** Requested schemas. */
      dataExtensionSchemas?: DataExtensionSchema[];
  }
  interface ListAllDataExtensionSchemasRequest {
      /** [Fully qualified domain name](https://dev.wix.com/docs/rest/articles/getting-started/fqdns). */
      fqdn?: string;
      /** Namespaces within the given entity. */
      namespaces?: string[];
      /** Additional fields that are hidden by default. For example, fields with `"x-wix-archived": true`. */
      fields?: RequestedField[];
  }
  interface ListAllDataExtensionSchemasResponse {
      /** Requested schemas. */
      dataExtensionSchemas?: DataExtensionSchema[];
  }
  interface UpsertDataExtensionGlobalSchemaRequest {
      /** the upsert to create */
      dataExtensionSchema?: DataExtensionSchema;
  }
  interface UpsertDataExtensionGlobalSchemaResponse {
      /** the upsert schema */
      dataExtensionSchema?: DataExtensionSchema;
  }
  interface DeleteDemoDataExtensionSchemaRequest {
      /** Schema ID. */
      dataExtensionSchemaId?: string;
  }
  interface DeleteDemoDataExtensionSchemaResponse {
  }
  interface DeleteGlobalExtensionSchemaRequest {
      /** fqdn */
      fqdn?: string;
      /** namespace */
      namespace?: string;
  }
  interface DeleteGlobalExtensionSchemaResponse {
  }
  interface DeleteByWhiteListedMetaSiteRequest {
      /** Meta site id */
      metaSiteId: string;
  }
  interface DeleteByWhiteListedMetaSiteResponse {
      /** has more */
      hasMore?: boolean;
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
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
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
  /** payload for kafka event for this version on app submit */
  interface AppVersionStateChanged extends AppVersionStateChangedStateOneOf {
      created?: AppVersionCreated;
      submitted?: AppVersionSubmitted;
      published?: AppVersionPublished;
      declined?: AppVersionDeclined;
      released?: AppVersionReleased;
      approved?: AppVersionApproved;
      draftChanged?: AppVersionDraftChanged;
      archived?: AppVersionArchived;
      appId?: string;
      /** @readonly */
      version?: string;
      previousState?: VersionStatus;
  }
  /** @oneof */
  interface AppVersionStateChangedStateOneOf {
      created?: AppVersionCreated;
      submitted?: AppVersionSubmitted;
      published?: AppVersionPublished;
      declined?: AppVersionDeclined;
      released?: AppVersionReleased;
      approved?: AppVersionApproved;
      draftChanged?: AppVersionDraftChanged;
      archived?: AppVersionArchived;
  }
  interface AppVersionCreated {
  }
  interface AppVersionSubmitted {
  }
  interface AppVersionPublished {
  }
  interface AppVersionDeclined {
  }
  interface AppVersionReleased {
  }
  interface AppVersionApproved {
  }
  interface AppVersionDraftChanged {
  }
  interface AppVersionArchived {
  }
  enum VersionStatus {
      /** default, internal use status. do not use */
      NONE_STATUS = "NONE_STATUS",
      /** a version which was created in the dev center and has not started the approval process yet */
      DRAFT = "DRAFT",
      /** the version was submitted for review by the developer */
      SUBMITTED = "SUBMITTED",
      /** the version is being reviewed by the app market team in cactus */
      IN_REVIEW = "IN_REVIEW",
      /** our team approved the version */
      APPROVED = "APPROVED",
      /** this version is published - only one version can be published at any given time; if this app was already published, the previously published version's status is now ARCHIVED */
      PUBLISHED = "PUBLISHED",
      /** our team did not accept this version of the app */
      DECLINED = "DECLINED",
      /** the status for versions that are no longer relevant */
      ARCHIVED = "ARCHIVED",
      /** status for versions with no significant changes, e.g. for test app. for questions contact our team */
      HIDDEN = "HIDDEN",
      /** mark apps as RELEASED, without adding to the apps cache, and allow users to install */
      RELEASED = "RELEASED"
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
   * Creates a user-defined data extension schema.
   * @param dataExtensionSchema - Schema to create.
   * @public
   * @documentationMaturity preview
   * @requiredField dataExtensionSchema
   * @requiredField dataExtensionSchema.fqdn
   * @requiredField dataExtensionSchema.jsonSchema
   * @requiredField dataExtensionSchema.namespace
   * @permissionId DATA_EXTENSION_SCHEMA.WRITE
   * @adminMethod
   * @returns Created schema.
   */
  function createDataExtensionSchema(dataExtensionSchema: DataExtensionSchema): Promise<DataExtensionSchema>;
  /**
   * Updates a user-defined data extension schema, overriding the existing data.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataExtensionSchema._id
   * @requiredField options.dataExtensionSchema.jsonSchema
   * @requiredField options.dataExtensionSchema.revision
   * @param options - Field options. The following fields **must** be passed: `_id`, `jsonSchema`, `revision`.
   * @permissionId DATA_EXTENSION_SCHEMA.WRITE
   * @adminMethod
   */
  function updateDataExtensionSchema(options?: UpdateDataExtensionSchemaOptions): Promise<UpdateDataExtensionSchemaResponse>;
  interface UpdateDataExtensionSchemaOptions {
      /** Schema to update. */
      dataExtensionSchema?: DataExtensionSchema;
  }
  /**
   * Retrieves a list of global and user-defined data extension schemas for a given FQDN.
   * @param fqdn - [Fully qualified domain name](https://dev.wix.com/docs/rest/articles/getting-started/fqdns).
   * @public
   * @documentationMaturity preview
   * @requiredField fqdn
   * @permissionId DATA_EXTENSION_SCHEMA.READ
   */
  function listDataExtensionSchemas(fqdn: string, options?: ListDataExtensionSchemasOptions): Promise<ListDataExtensionSchemasResponse>;
  interface ListDataExtensionSchemasOptions {
      /** Namespaces within the given entity. */
      namespaces?: string[];
      /** Additional fields that are hidden by default. For example, fields with `"x-wix-archived": true`. */
      fields?: RequestedField[];
  }
  /**
   * Deletes schemas of whitelisted metasite ids
   * @param metaSiteId - Meta site id
   * @public
   * @documentationMaturity preview
   * @requiredField metaSiteId
   * @adminMethod
   */
  function deleteByWhiteListedMetaSite(metaSiteId: string): Promise<DeleteByWhiteListedMetaSiteResponse>;
  
  type dataExtensionsV1DataExtensionSchema_universal_d_DataExtensionSchema = DataExtensionSchema;
  type dataExtensionsV1DataExtensionSchema_universal_d_ReindexEvent = ReindexEvent;
  type dataExtensionsV1DataExtensionSchema_universal_d_ReindexField = ReindexField;
  type dataExtensionsV1DataExtensionSchema_universal_d_CreateDataExtensionSchemaRequest = CreateDataExtensionSchemaRequest;
  type dataExtensionsV1DataExtensionSchema_universal_d_CreateDataExtensionSchemaResponse = CreateDataExtensionSchemaResponse;
  type dataExtensionsV1DataExtensionSchema_universal_d_UpdateDataExtensionSchemaRequest = UpdateDataExtensionSchemaRequest;
  type dataExtensionsV1DataExtensionSchema_universal_d_UpdateDataExtensionSchemaResponse = UpdateDataExtensionSchemaResponse;
  type dataExtensionsV1DataExtensionSchema_universal_d_ListDataExtensionSchemasRequest = ListDataExtensionSchemasRequest;
  type dataExtensionsV1DataExtensionSchema_universal_d_RequestedField = RequestedField;
  const dataExtensionsV1DataExtensionSchema_universal_d_RequestedField: typeof RequestedField;
  type dataExtensionsV1DataExtensionSchema_universal_d_ListDataExtensionSchemasResponse = ListDataExtensionSchemasResponse;
  type dataExtensionsV1DataExtensionSchema_universal_d_ListAllDataExtensionSchemasRequest = ListAllDataExtensionSchemasRequest;
  type dataExtensionsV1DataExtensionSchema_universal_d_ListAllDataExtensionSchemasResponse = ListAllDataExtensionSchemasResponse;
  type dataExtensionsV1DataExtensionSchema_universal_d_UpsertDataExtensionGlobalSchemaRequest = UpsertDataExtensionGlobalSchemaRequest;
  type dataExtensionsV1DataExtensionSchema_universal_d_UpsertDataExtensionGlobalSchemaResponse = UpsertDataExtensionGlobalSchemaResponse;
  type dataExtensionsV1DataExtensionSchema_universal_d_DeleteDemoDataExtensionSchemaRequest = DeleteDemoDataExtensionSchemaRequest;
  type dataExtensionsV1DataExtensionSchema_universal_d_DeleteDemoDataExtensionSchemaResponse = DeleteDemoDataExtensionSchemaResponse;
  type dataExtensionsV1DataExtensionSchema_universal_d_DeleteGlobalExtensionSchemaRequest = DeleteGlobalExtensionSchemaRequest;
  type dataExtensionsV1DataExtensionSchema_universal_d_DeleteGlobalExtensionSchemaResponse = DeleteGlobalExtensionSchemaResponse;
  type dataExtensionsV1DataExtensionSchema_universal_d_DeleteByWhiteListedMetaSiteRequest = DeleteByWhiteListedMetaSiteRequest;
  type dataExtensionsV1DataExtensionSchema_universal_d_DeleteByWhiteListedMetaSiteResponse = DeleteByWhiteListedMetaSiteResponse;
  type dataExtensionsV1DataExtensionSchema_universal_d_DomainEvent = DomainEvent;
  type dataExtensionsV1DataExtensionSchema_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type dataExtensionsV1DataExtensionSchema_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type dataExtensionsV1DataExtensionSchema_universal_d_RestoreInfo = RestoreInfo;
  type dataExtensionsV1DataExtensionSchema_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type dataExtensionsV1DataExtensionSchema_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type dataExtensionsV1DataExtensionSchema_universal_d_ActionEvent = ActionEvent;
  type dataExtensionsV1DataExtensionSchema_universal_d_Empty = Empty;
  type dataExtensionsV1DataExtensionSchema_universal_d_AppVersionStateChanged = AppVersionStateChanged;
  type dataExtensionsV1DataExtensionSchema_universal_d_AppVersionStateChangedStateOneOf = AppVersionStateChangedStateOneOf;
  type dataExtensionsV1DataExtensionSchema_universal_d_AppVersionCreated = AppVersionCreated;
  type dataExtensionsV1DataExtensionSchema_universal_d_AppVersionSubmitted = AppVersionSubmitted;
  type dataExtensionsV1DataExtensionSchema_universal_d_AppVersionPublished = AppVersionPublished;
  type dataExtensionsV1DataExtensionSchema_universal_d_AppVersionDeclined = AppVersionDeclined;
  type dataExtensionsV1DataExtensionSchema_universal_d_AppVersionReleased = AppVersionReleased;
  type dataExtensionsV1DataExtensionSchema_universal_d_AppVersionApproved = AppVersionApproved;
  type dataExtensionsV1DataExtensionSchema_universal_d_AppVersionDraftChanged = AppVersionDraftChanged;
  type dataExtensionsV1DataExtensionSchema_universal_d_AppVersionArchived = AppVersionArchived;
  type dataExtensionsV1DataExtensionSchema_universal_d_VersionStatus = VersionStatus;
  const dataExtensionsV1DataExtensionSchema_universal_d_VersionStatus: typeof VersionStatus;
  type dataExtensionsV1DataExtensionSchema_universal_d_MessageEnvelope = MessageEnvelope;
  type dataExtensionsV1DataExtensionSchema_universal_d_IdentificationData = IdentificationData;
  type dataExtensionsV1DataExtensionSchema_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type dataExtensionsV1DataExtensionSchema_universal_d_WebhookIdentityType = WebhookIdentityType;
  const dataExtensionsV1DataExtensionSchema_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const dataExtensionsV1DataExtensionSchema_universal_d_createDataExtensionSchema: typeof createDataExtensionSchema;
  const dataExtensionsV1DataExtensionSchema_universal_d_updateDataExtensionSchema: typeof updateDataExtensionSchema;
  type dataExtensionsV1DataExtensionSchema_universal_d_UpdateDataExtensionSchemaOptions = UpdateDataExtensionSchemaOptions;
  const dataExtensionsV1DataExtensionSchema_universal_d_listDataExtensionSchemas: typeof listDataExtensionSchemas;
  type dataExtensionsV1DataExtensionSchema_universal_d_ListDataExtensionSchemasOptions = ListDataExtensionSchemasOptions;
  const dataExtensionsV1DataExtensionSchema_universal_d_deleteByWhiteListedMetaSite: typeof deleteByWhiteListedMetaSite;
  namespace dataExtensionsV1DataExtensionSchema_universal_d {
    export {
      dataExtensionsV1DataExtensionSchema_universal_d_DataExtensionSchema as DataExtensionSchema,
      dataExtensionsV1DataExtensionSchema_universal_d_ReindexEvent as ReindexEvent,
      dataExtensionsV1DataExtensionSchema_universal_d_ReindexField as ReindexField,
      dataExtensionsV1DataExtensionSchema_universal_d_CreateDataExtensionSchemaRequest as CreateDataExtensionSchemaRequest,
      dataExtensionsV1DataExtensionSchema_universal_d_CreateDataExtensionSchemaResponse as CreateDataExtensionSchemaResponse,
      dataExtensionsV1DataExtensionSchema_universal_d_UpdateDataExtensionSchemaRequest as UpdateDataExtensionSchemaRequest,
      dataExtensionsV1DataExtensionSchema_universal_d_UpdateDataExtensionSchemaResponse as UpdateDataExtensionSchemaResponse,
      dataExtensionsV1DataExtensionSchema_universal_d_ListDataExtensionSchemasRequest as ListDataExtensionSchemasRequest,
      dataExtensionsV1DataExtensionSchema_universal_d_RequestedField as RequestedField,
      dataExtensionsV1DataExtensionSchema_universal_d_ListDataExtensionSchemasResponse as ListDataExtensionSchemasResponse,
      dataExtensionsV1DataExtensionSchema_universal_d_ListAllDataExtensionSchemasRequest as ListAllDataExtensionSchemasRequest,
      dataExtensionsV1DataExtensionSchema_universal_d_ListAllDataExtensionSchemasResponse as ListAllDataExtensionSchemasResponse,
      dataExtensionsV1DataExtensionSchema_universal_d_UpsertDataExtensionGlobalSchemaRequest as UpsertDataExtensionGlobalSchemaRequest,
      dataExtensionsV1DataExtensionSchema_universal_d_UpsertDataExtensionGlobalSchemaResponse as UpsertDataExtensionGlobalSchemaResponse,
      dataExtensionsV1DataExtensionSchema_universal_d_DeleteDemoDataExtensionSchemaRequest as DeleteDemoDataExtensionSchemaRequest,
      dataExtensionsV1DataExtensionSchema_universal_d_DeleteDemoDataExtensionSchemaResponse as DeleteDemoDataExtensionSchemaResponse,
      dataExtensionsV1DataExtensionSchema_universal_d_DeleteGlobalExtensionSchemaRequest as DeleteGlobalExtensionSchemaRequest,
      dataExtensionsV1DataExtensionSchema_universal_d_DeleteGlobalExtensionSchemaResponse as DeleteGlobalExtensionSchemaResponse,
      dataExtensionsV1DataExtensionSchema_universal_d_DeleteByWhiteListedMetaSiteRequest as DeleteByWhiteListedMetaSiteRequest,
      dataExtensionsV1DataExtensionSchema_universal_d_DeleteByWhiteListedMetaSiteResponse as DeleteByWhiteListedMetaSiteResponse,
      dataExtensionsV1DataExtensionSchema_universal_d_DomainEvent as DomainEvent,
      dataExtensionsV1DataExtensionSchema_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      dataExtensionsV1DataExtensionSchema_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      dataExtensionsV1DataExtensionSchema_universal_d_RestoreInfo as RestoreInfo,
      dataExtensionsV1DataExtensionSchema_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      dataExtensionsV1DataExtensionSchema_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      dataExtensionsV1DataExtensionSchema_universal_d_ActionEvent as ActionEvent,
      dataExtensionsV1DataExtensionSchema_universal_d_Empty as Empty,
      dataExtensionsV1DataExtensionSchema_universal_d_AppVersionStateChanged as AppVersionStateChanged,
      dataExtensionsV1DataExtensionSchema_universal_d_AppVersionStateChangedStateOneOf as AppVersionStateChangedStateOneOf,
      dataExtensionsV1DataExtensionSchema_universal_d_AppVersionCreated as AppVersionCreated,
      dataExtensionsV1DataExtensionSchema_universal_d_AppVersionSubmitted as AppVersionSubmitted,
      dataExtensionsV1DataExtensionSchema_universal_d_AppVersionPublished as AppVersionPublished,
      dataExtensionsV1DataExtensionSchema_universal_d_AppVersionDeclined as AppVersionDeclined,
      dataExtensionsV1DataExtensionSchema_universal_d_AppVersionReleased as AppVersionReleased,
      dataExtensionsV1DataExtensionSchema_universal_d_AppVersionApproved as AppVersionApproved,
      dataExtensionsV1DataExtensionSchema_universal_d_AppVersionDraftChanged as AppVersionDraftChanged,
      dataExtensionsV1DataExtensionSchema_universal_d_AppVersionArchived as AppVersionArchived,
      dataExtensionsV1DataExtensionSchema_universal_d_VersionStatus as VersionStatus,
      dataExtensionsV1DataExtensionSchema_universal_d_MessageEnvelope as MessageEnvelope,
      dataExtensionsV1DataExtensionSchema_universal_d_IdentificationData as IdentificationData,
      dataExtensionsV1DataExtensionSchema_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      dataExtensionsV1DataExtensionSchema_universal_d_WebhookIdentityType as WebhookIdentityType,
      dataExtensionsV1DataExtensionSchema_universal_d_createDataExtensionSchema as createDataExtensionSchema,
      dataExtensionsV1DataExtensionSchema_universal_d_updateDataExtensionSchema as updateDataExtensionSchema,
      dataExtensionsV1DataExtensionSchema_universal_d_UpdateDataExtensionSchemaOptions as UpdateDataExtensionSchemaOptions,
      dataExtensionsV1DataExtensionSchema_universal_d_listDataExtensionSchemas as listDataExtensionSchemas,
      dataExtensionsV1DataExtensionSchema_universal_d_ListDataExtensionSchemasOptions as ListDataExtensionSchemasOptions,
      dataExtensionsV1DataExtensionSchema_universal_d_deleteByWhiteListedMetaSite as deleteByWhiteListedMetaSite,
    };
  }
  
  export { dataExtensionsV1DataExtensionSchema_universal_d as schemas };
}
