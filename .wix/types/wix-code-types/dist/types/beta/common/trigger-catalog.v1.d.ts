declare module "trigger-catalog.v1" {
  interface TriggerConfiguration {
      /** @readonly */
      _id?: string | null;
      /**
       * updates are allowed only for the latest revision
       * @readonly
       */
      revision?: string | null;
      /** @readonly */
      _createdDate?: Date;
      /** @readonly */
      _updatedDate?: Date;
      /** @readonly */
      source?: Source;
      /** For EventType.LEGACY the message name, eg. RsvpCreated. For EventType.DOMAIN_EVENT the domain event fqdn, eg. wix.events.rsvp */
      name?: string | null;
      /** a translation key */
      displayName?: string | null;
      /** a translation key */
      description?: string | null;
      /** list of keys used to group triggers in the UI */
      categories?: string[];
      /** the payload schema, see SchemaConfiguration */
      schemaConfiguration?: SchemaConfiguration;
      /** apply and display this template to specific users */
      preconditions?: Precondition[];
      /** pass setup configuration to actions */
      actionRecommendations?: ActionRecommendation[];
      /** additional trigger data retrieved from some service using references from the trigger payload as input */
      enrichments?: Enrichment[];
      /** For EventType.LEGACY the topic of the message, eg. wix-events.rsvp. For EventType.DOMAIN_EVENT the domain event topic, eg. domain_events_wix.wix_events.rsvp */
      eventTopic?: string | null;
      /** For EventType.LEGACY leave empty. For EventType.DOMAIN_EVENT add the relevant slug created/updated/deleted/started/completed/email_opened/etc.. */
      eventSlug?: string | null;
      /** default DOMAIN_EVENT, LEGACY should only be used after consulting #crm-automations team */
      eventType?: EventType;
      /** @readonly */
      translation?: Translation;
      reengagementInfo?: ReengagementInfo;
      /** if defined it will instruct how build the delay after the trigger is fired */
      delayStrategy?: DelayStrategy;
      /** The rate limiting options and configurations this trigger provides */
      rateLimiting?: RateLimiting;
      /**
       * Data Extensions
       * @internal
       */
      extendedFields?: ExtendedFields;
  }
  interface Source {
      /**
       * Source app or service ID.
       * @readonly
       */
      sourceId?: string;
      /**
       * App or service type.
       * @readonly
       */
      sourceType?: SourceType;
  }
  enum SourceType {
      UNKNOWN_SOURCE_TYPE = "UNKNOWN_SOURCE_TYPE",
      WIX_APP = "WIX_APP",
      EXTERNAL = "EXTERNAL",
      ADMIN = "ADMIN",
      OTHER = "OTHER"
  }
  interface SchemaConfiguration {
      /** the fields of the payload */
      fields?: SchemaField[];
      /**
       * the endpoint to resolve the schema configuration after the user updates the option selections.
       * invocation will be done via REST protocol, method POST with payload as described in com.wixpress.actiontriggers.integrator.entities.DynamicSchemaRequest
       * expected output must be compliant with com.wixpress.actiontriggers.integrator.entities.DynamicSchemaResponse
       * in order to insure the caller identity we will add a HEADER, 'md5', that will be signed with a private key and can be decrypted using the RSA 1024 public key,
       * MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCuwhNPTeyleWLcq7nVGyXv1Swar442JNZ7fKSukPjuoNUokw1X+fvQ7GcqQu5SOqCRhlBjnL0HAjUVeUvBAHotmGXbzBpe73uKsj6am5XiRubxFT3t17teAR4KYvn1d7izaxGkc+eyAZm7M/9tvrms5DGMvilZ01zusWek1i3FmwIDAQAB
       *
       * the decrypted md5 header must match md5 of the body.
       *
       * example call:
       * curl --location --request POST 'www.trigger-example.com/dynamic-schema' \
       * --header 'md5: Lu9Gk1EavSV23vKno5pNuKBNDFn0H5il2hsfl0nsKsF186EpJFNVrMEVGCM/CYF9YYIOu0PzprCJBT9i7dKVv+6Scp9FhRz3kiKWOTfMEbFW+gIwOeQ3OojQ6VVA9668CDKe+rsWmAXVDPXASXtdf2849BNJ6SZkC2vsBF9yRbE=' \
       * --header 'Content-Type: application/json' \
       * --data-raw '{"selectedConditions":{"someKey":{"values":["value1","value2"]},"anotherKey":{"values":["anotherValue1","anotherValue2"]}},"instanceId":"2ad0b21b-2813-4380-b56c-a8ded8aa854f"}'
       *
       * resolving side validation:
       * 1. decrypt the md5 header using the public key specified above -> in the example above the result should be -> A159933841647D2A1579001CB49C0B42
       * 2. run md5 on the payload -> 65DAEF72E2A8BC42C8A9CC2042406C7C
       *
       * example result:
       * {
       * "schemaConfiguration": {
       * "fields": [
       * {
       * "key": "exampleKey",
       * "displayName": "Example Key",
       * "description": "Some example",
       * "fieldType": "TEXT",
       * "sampleValues": [
       * "Hello World"
       * ],
       * "exposure": "EXPOSED",
       * "allowNegativeOffset": false
       * }
       * ]
       * }
       * }
       */
      dynamicSchemaUrl?: string | null;
  }
  interface SchemaField {
      /** the key as it appears on the payload */
      key?: string;
      /** a translation key */
      displayName?: string;
      /** a translation key */
      description?: string | null;
      /** the field type */
      fieldTypeV2?: SchemaFieldTypeV2;
      /** sample values as translation keys */
      sampleValues?: string[];
      /** the field exposure */
      exposure?: Exposure;
      /** for fields with a known set of possible values */
      conditionOptions?: ConditionOptions;
      /** for computed and formatted fields, (TODO: jsonata?) representation of the value, default will be taken from key */
      valueMapping?: string | null;
      isArray?: boolean | null;
      /** the ID of the option, to be correlated with condition option values */
      conditionOptionId?: string | null;
      /** specify the footer content */
      footerContent?: string | null;
  }
  enum PrimitiveType {
      UNKNOWN_PRIMITIVE_TYPE = "UNKNOWN_PRIMITIVE_TYPE",
      TEXT = "TEXT",
      BOOLEAN = "BOOLEAN",
      NUMBER = "NUMBER"
  }
  enum SimpleType {
      UNKNOWN_SIMPLE_TYPE = "UNKNOWN_SIMPLE_TYPE",
      MONEY = "MONEY",
      LINK = "LINK",
      BACKOFFICE_LINK = "BACKOFFICE_LINK",
      LIVESITE_LINK = "LIVESITE_LINK",
      MULTILINGUAL = "MULTILINGUAL",
      IMAGE_LINK = "IMAGE_LINK",
      GUID = "GUID",
      EMAIL = "EMAIL",
      PHONE = "PHONE",
      CONTACT_ID = "CONTACT_ID",
      ORDER_ID = "ORDER_ID"
  }
  interface EnumOption {
      /** The name displayed to the user. */
      displayName?: string;
  }
  interface Primitive {
      primitiveType?: PrimitiveType;
  }
  /** need to think about it */
  interface Simple {
      simpleType?: SimpleType;
  }
  interface DateType {
      /** default: false, set this to true if the date is normally a future date, like: Invoice expiration date, Membership renewal date */
      allowNegativeOffset?: boolean;
  }
  interface Enumeration {
      /** enumValue (The field value option) -> enum option */
      options?: Record<string, EnumOption>;
  }
  interface Complex {
      schemaFields?: SchemaField[];
  }
  interface MultilingualType {
      /** app_def_id in multilingual */
      appDefId?: string;
      /** namespace in multilingual */
      namespace?: string;
      /** entity_id in multilingual */
      entityId?: string;
      /** key in multilingual */
      key?: string;
      /** default value of item */
      defaultValue?: string | null;
  }
  interface SchemaFieldTypeV2 extends SchemaFieldTypeV2FieldTypeOneOf {
      primitive?: Primitive;
      simple?: Simple;
      /**
       * the field value must conform to the following JSON structure { "timestamp": string, "timeZone": string }, where the timestamp is ISO format UTC, and the time zone is the full name
       * example: { "timestamp": "2021-03-22T11:41:47.992Z", timeZone: "Asia/Jerusalem" }
       */
      date?: DateType;
      enum?: Enumeration;
      complex?: Complex;
      multilingualType?: MultilingualType;
  }
  /** @oneof */
  interface SchemaFieldTypeV2FieldTypeOneOf {
      primitive?: Primitive;
      simple?: Simple;
      /**
       * the field value must conform to the following JSON structure { "timestamp": string, "timeZone": string }, where the timestamp is ISO format UTC, and the time zone is the full name
       * example: { "timestamp": "2021-03-22T11:41:47.992Z", timeZone: "Asia/Jerusalem" }
       */
      date?: DateType;
      enum?: Enumeration;
      complex?: Complex;
      multilingualType?: MultilingualType;
  }
  enum Exposure {
      UNKNOWN_EXPOSURE = "UNKNOWN_EXPOSURE",
      /** not sent to the action provider */
      SETUP = "SETUP",
      /** sent to the action provider and usually hidden from user */
      HIDDEN = "HIDDEN",
      /** sent to the action provider and usually shown to user */
      EXPOSED = "EXPOSED"
  }
  interface ConditionOptions {
      /** the label to display to the user, such as "Select a Form:" */
      displayName?: string | null;
      /** possible values, like a list of Forms, Pages or Events on a site */
      values?: OptionValue[];
      /** the selection type, see SelectionType */
      selectionType?: SelectionType;
      /** the optional default value */
      defaultValue?: string | null;
      /** the visibility of the condition */
      visibility?: Visibility;
      /** regex to validate free text */
      validationRegex?: string | null;
      /** description of validation_string */
      validationDescription?: string | null;
  }
  interface OptionValue {
      /** a translation key */
      displayName?: string;
      /** the value, like form_id, page_id, event_id */
      value?: string;
      /** the optional labels for the option */
      labels?: string[] | null;
      /** the optional group this option is associated to */
      group?: string | null;
      /** the ID of the option, to be correlated with other schema fields */
      conditionOptionId?: string | null;
  }
  enum SelectionType {
      UNKNOWN_SELECTION_TYPE = "UNKNOWN_SELECTION_TYPE",
      SINGLE = "SINGLE",
      MULTI = "MULTI",
      TEXT = "TEXT",
      NUMBER = "NUMBER"
  }
  enum Visibility {
      UNKNOWN_VISIBILITY = "UNKNOWN_VISIBILITY",
      VISIBLE = "VISIBLE",
      READONLY = "READONLY",
      HIDDEN = "HIDDEN"
  }
  interface Precondition {
      /** Precondition type */
      preconditionType?: PreconditionType;
      /** Precondition unique key */
      key?: string;
      /** Precondition value */
      value?: string;
  }
  enum PreconditionType {
      UNKNOWN_PRECONDITION_TYPE = "UNKNOWN_PRECONDITION_TYPE",
      PETRI = "PETRI",
      STATE = "STATE",
      APP_DEPENDENCY = "APP_DEPENDENCY",
      DEALER_OFFERING = "DEALER_OFFERING"
  }
  interface ActionRecommendation {
      /** the action to configure */
      actionName?: string;
      /** show, hide or leave the default of the action */
      actionVisibilityOverride?: ActionVisibilityOverride;
      propertySuggestions?: Record<string, any> | null;
  }
  enum ActionVisibilityOverride {
      UNKNOWN_ACTION_VISIBILITY_OVERRIDE = "UNKNOWN_ACTION_VISIBILITY_OVERRIDE",
      HIDE = "HIDE",
      SHOW = "SHOW"
  }
  interface Enrichment {
      /** make fields available to computed fields */
      namespace?: string;
      /** the service called to resolve the enrichment */
      serviceName?: string;
      /** the method called to resolve the enrichment */
      serviceMethod?: string;
      /** the request payload with mappings */
      inputMapping?: string;
      /** the output payload */
      fields?: SchemaField[];
  }
  enum EventType {
      UNKNOWN_EVENT_TYPE = "UNKNOWN_EVENT_TYPE",
      LEGACY = "LEGACY",
      DOMAIN_EVENT = "DOMAIN_EVENT"
  }
  interface Translation {
      state?: TranslationState;
  }
  enum TranslationState {
      UNKNOWN_TRANSLATION_STATE = "UNKNOWN_TRANSLATION_STATE",
      NOT_REQUESTED = "NOT_REQUESTED",
      PENDING = "PENDING",
      PARTIAL = "PARTIAL",
      TRANSLATED = "TRANSLATED"
  }
  interface ReengagementInfo {
      /** enable reengagement strategy for this trigger */
      mode?: ReengagementMode;
      /** trigger name in reengagement mode */
      displayName?: string;
      /** text to display as label for the timing section */
      timingLabelText?: string;
  }
  enum ReengagementMode {
      UNKNOWN_REENGAGEMENT_MODE = "UNKNOWN_REENGAGEMENT_MODE",
      DISABLED = "DISABLED",
      ENABLED = "ENABLED"
  }
  interface DelayStrategy {
      /** explains in text what we are waiting for, example: Invoice Expiration */
      displayName?: string | null;
      /**
       * jsonata expression that defines the "immediate" activation time, for example in "invoiceExpired" trigger we will put here: $toMillis(expirationDate)
       * client will add a delay on top of that, for example: -5 days. that means the delay we will create will be: expirationDate - 5 days
       */
      eventTime?: string | null;
      /** once getting back from the delay we will check this jsonata condition, for example: Invoice.Status = "Sent" and Invoice.Balance > 0 */
      condition?: string | null;
  }
  interface RateLimiting {
      /** The rate limiting options this trigger provides */
      options?: RateLimitingOption[];
  }
  interface RateLimitingOption {
      /** The jsonata used to extract the entity/resource id, we want to limit on, from the final payload (after enrichment and output mapping). */
      keyJsonata?: string;
      /** The display name of the entity/resource we limit on (e.g. "Contact") */
      displayName?: string;
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
  interface ResolveTriggersConfigurationRequest {
      /** TODO: Once we implement trigger paging, refactor to Cursor Paging */
      paging?: Paging;
  }
  interface Paging {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface ResolveTriggersConfigurationResponse {
      /** paginated triggers configuration */
      results?: TriggerConfiguration[];
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
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface CreateTriggerConfigurationRequest {
      /** Trigger Configuration */
      triggerConfiguration?: TriggerConfiguration;
  }
  interface CreateTriggerConfigurationResponse {
      /** Trigger Configuration */
      triggerConfiguration?: TriggerConfiguration;
  }
  interface UpdateTriggerConfigurationRequest {
      /**
       * Partial update method. Client can send field mask, or let the server infer it.
       * If field is empty it will not be updated unless in field_mask the client sends
       * If field_mask is inferred, it works with caveats:
       * 1. Does not infer repeated nested schema
       * 2. Does not infer google.protobuf.Struct nested structure
       * More info here: https://github.com/wix-private/server-infra/blob/master/framework/grpc/p13n/auto-field-masks/README.md
       */
      triggerConfiguration?: TriggerConfiguration;
      /**
       * Optional parameter. Field mask to indicate which fields should be updated
       * If field_mask not send, the server will infer it for you with caveats - see above
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateTriggerConfigurationResponse {
      /** Trigger Configuration */
      triggerConfiguration?: TriggerConfiguration;
  }
  interface DeleteTriggerConfigurationRequest {
      /** Trigger Configuration ID */
      _id: string;
      revision?: string;
  }
  interface DeleteTriggerConfigurationResponse {
  }
  interface GetTriggerConfigurationRequest {
      /** Trigger Configuration ID */
      _id: string;
      /**
       * Projection on the result object - list of specific field names to return.
       * @internal
       */
      fields?: string[];
  }
  interface GetTriggerConfigurationResponse {
      /** Trigger Configuration */
      triggerConfiguration?: TriggerConfiguration;
  }
  interface QueryTriggersConfigurationRequest {
      /** Query - support filter, sort, paging, fields and field sets */
      query?: QueryV2;
      fromTrashBin?: boolean;
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
  interface QueryTriggersConfigurationResponse {
      /** Queried triggers configuration */
      results?: TriggerConfiguration[];
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
  interface GetTriggerSchemaRequest {
      _id: string;
      selectedConditions?: Record<string, UserSelection>;
  }
  interface UserSelection {
      values?: string[];
  }
  interface GetTriggerSchemaResponse {
      schemaConfiguration?: SchemaConfiguration;
  }
  interface MigrateFromActionTriggersServerRequest {
      paging?: Paging;
  }
  interface MigrateFromActionTriggersServerResponse {
      pagingMetadata?: PagingMetadata;
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
   * Resolve a list of triggers configuration that are relevant to the entity that made the request.
   * resolving includes:
   * 1. filtering by the preconditions
   * 2. translations
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function resolveTriggersConfiguration(options?: ResolveTriggersConfigurationOptions): Promise<ResolveTriggersConfigurationResponse>;
  interface ResolveTriggersConfigurationOptions {
      /** TODO: Once we implement trigger paging, refactor to Cursor Paging */
      paging?: Paging;
  }
  /**
   * Create a new trigger configuration
   * @public
   * @documentationMaturity preview
   * @requiredField options.triggerConfiguration.categories
   * @requiredField options.triggerConfiguration.description
   * @requiredField options.triggerConfiguration.displayName
   * @requiredField options.triggerConfiguration.name
   * @requiredField options.triggerConfiguration.schemaConfiguration
   * @adminMethod
   * @returns Trigger Configuration
   */
  function createTriggerConfiguration(options?: CreateTriggerConfigurationOptions): Promise<TriggerConfiguration>;
  interface CreateTriggerConfigurationOptions {
      /** Trigger Configuration */
      triggerConfiguration?: TriggerConfiguration;
  }
  /**
   * Updates trigger configuration by ID
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField options.triggerConfiguration.revision
   * @adminMethod
   * @returns Trigger Configuration
   */
  function updateTriggerConfiguration(_id: string | null, options?: UpdateTriggerConfigurationOptions): Promise<TriggerConfiguration>;
  interface UpdateTriggerConfigurationOptions {
      triggerConfiguration: {
          /** @readonly */
          _id?: string | null;
          /**
           * updates are allowed only for the latest revision
           * @readonly
           */
          revision?: string | null;
          /** @readonly */
          _createdDate?: Date;
          /** @readonly */
          _updatedDate?: Date;
          /** @readonly */
          source?: Source;
          /** For EventType.LEGACY the message name, eg. RsvpCreated. For EventType.DOMAIN_EVENT the domain event fqdn, eg. wix.events.rsvp */
          name?: string | null;
          /** a translation key */
          displayName?: string | null;
          /** a translation key */
          description?: string | null;
          /** list of keys used to group triggers in the UI */
          categories?: string[];
          /** the payload schema, see SchemaConfiguration */
          schemaConfiguration?: SchemaConfiguration;
          /** apply and display this template to specific users */
          preconditions?: Precondition[];
          /** pass setup configuration to actions */
          actionRecommendations?: ActionRecommendation[];
          /** additional trigger data retrieved from some service using references from the trigger payload as input */
          enrichments?: Enrichment[];
          /** For EventType.LEGACY the topic of the message, eg. wix-events.rsvp. For EventType.DOMAIN_EVENT the domain event topic, eg. domain_events_wix.wix_events.rsvp */
          eventTopic?: string | null;
          /** For EventType.LEGACY leave empty. For EventType.DOMAIN_EVENT add the relevant slug created/updated/deleted/started/completed/email_opened/etc.. */
          eventSlug?: string | null;
          /** default DOMAIN_EVENT, LEGACY should only be used after consulting #crm-automations team */
          eventType?: EventType;
          /** @readonly */
          translation?: Translation;
          reengagementInfo?: ReengagementInfo;
          /** if defined it will instruct how build the delay after the trigger is fired */
          delayStrategy?: DelayStrategy;
          /** The rate limiting options and configurations this trigger provides */
          rateLimiting?: RateLimiting;
          /**
           * Data Extensions
           * @internal
           */
          extendedFields?: ExtendedFields;
      };
      /**
       * Optional parameter. Field mask to indicate which fields should be updated
       * If field_mask not send, the server will infer it for you with caveats - see above
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Deletes trigger configuration by ID
   * @param _id - Trigger Configuration ID
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @adminMethod
   */
  function deleteTriggerConfiguration(_id: string, options?: DeleteTriggerConfigurationOptions): Promise<void>;
  interface DeleteTriggerConfigurationOptions {
      revision?: string;
  }
  /**
   * Returns trigger configuration by ID
   * @param _id - Trigger Configuration ID
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @adminMethod
   * @returns Trigger Configuration
   */
  function getTriggerConfiguration(_id: string, options?: GetTriggerConfigurationOptions): Promise<TriggerConfiguration>;
  interface GetTriggerConfigurationOptions {
      /**
       * Projection on the result object - list of specific field names to return.
       * @internal
       */
      fields?: string[];
  }
  /**
   * Returns triggers configuration by query params
   * @public
   * @documentationMaturity preview
   * @permissionId TRIGGER_CATALOG.TRIGGER_CONFIGURATION_READ
   * @adminMethod
   */
  function queryTriggersConfiguration(options?: QueryTriggersConfigurationOptions): ResultsQueryBuilder;
  interface QueryTriggersConfigurationOptions {
      fromTrashBin?: boolean | undefined;
  }
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ResultsQueryResult extends QueryCursorResult {
      items: TriggerConfiguration[];
      query: ResultsQueryBuilder;
      next: () => Promise<ResultsQueryResult>;
      prev: () => Promise<ResultsQueryResult>;
  }
  interface ResultsQueryBuilder {
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ResultsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ResultsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ResultsQueryResult>;
  }
  /**
   * return trigger configuration schema by trigger ID and selected conditions
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @adminMethod
   */
  function getTriggerSchema(_id: string, options?: GetTriggerSchemaOptions): Promise<GetTriggerSchemaResponse>;
  interface GetTriggerSchemaOptions {
      selectedConditions?: Record<string, UserSelection>;
  }
  
  type crmAutomationsV1TriggerConfiguration_universal_d_TriggerConfiguration = TriggerConfiguration;
  type crmAutomationsV1TriggerConfiguration_universal_d_Source = Source;
  type crmAutomationsV1TriggerConfiguration_universal_d_SourceType = SourceType;
  const crmAutomationsV1TriggerConfiguration_universal_d_SourceType: typeof SourceType;
  type crmAutomationsV1TriggerConfiguration_universal_d_SchemaConfiguration = SchemaConfiguration;
  type crmAutomationsV1TriggerConfiguration_universal_d_SchemaField = SchemaField;
  type crmAutomationsV1TriggerConfiguration_universal_d_PrimitiveType = PrimitiveType;
  const crmAutomationsV1TriggerConfiguration_universal_d_PrimitiveType: typeof PrimitiveType;
  type crmAutomationsV1TriggerConfiguration_universal_d_SimpleType = SimpleType;
  const crmAutomationsV1TriggerConfiguration_universal_d_SimpleType: typeof SimpleType;
  type crmAutomationsV1TriggerConfiguration_universal_d_EnumOption = EnumOption;
  type crmAutomationsV1TriggerConfiguration_universal_d_Primitive = Primitive;
  type crmAutomationsV1TriggerConfiguration_universal_d_Simple = Simple;
  type crmAutomationsV1TriggerConfiguration_universal_d_DateType = DateType;
  type crmAutomationsV1TriggerConfiguration_universal_d_Enumeration = Enumeration;
  type crmAutomationsV1TriggerConfiguration_universal_d_Complex = Complex;
  type crmAutomationsV1TriggerConfiguration_universal_d_MultilingualType = MultilingualType;
  type crmAutomationsV1TriggerConfiguration_universal_d_SchemaFieldTypeV2 = SchemaFieldTypeV2;
  type crmAutomationsV1TriggerConfiguration_universal_d_SchemaFieldTypeV2FieldTypeOneOf = SchemaFieldTypeV2FieldTypeOneOf;
  type crmAutomationsV1TriggerConfiguration_universal_d_Exposure = Exposure;
  const crmAutomationsV1TriggerConfiguration_universal_d_Exposure: typeof Exposure;
  type crmAutomationsV1TriggerConfiguration_universal_d_ConditionOptions = ConditionOptions;
  type crmAutomationsV1TriggerConfiguration_universal_d_OptionValue = OptionValue;
  type crmAutomationsV1TriggerConfiguration_universal_d_SelectionType = SelectionType;
  const crmAutomationsV1TriggerConfiguration_universal_d_SelectionType: typeof SelectionType;
  type crmAutomationsV1TriggerConfiguration_universal_d_Visibility = Visibility;
  const crmAutomationsV1TriggerConfiguration_universal_d_Visibility: typeof Visibility;
  type crmAutomationsV1TriggerConfiguration_universal_d_Precondition = Precondition;
  type crmAutomationsV1TriggerConfiguration_universal_d_PreconditionType = PreconditionType;
  const crmAutomationsV1TriggerConfiguration_universal_d_PreconditionType: typeof PreconditionType;
  type crmAutomationsV1TriggerConfiguration_universal_d_ActionRecommendation = ActionRecommendation;
  type crmAutomationsV1TriggerConfiguration_universal_d_ActionVisibilityOverride = ActionVisibilityOverride;
  const crmAutomationsV1TriggerConfiguration_universal_d_ActionVisibilityOverride: typeof ActionVisibilityOverride;
  type crmAutomationsV1TriggerConfiguration_universal_d_Enrichment = Enrichment;
  type crmAutomationsV1TriggerConfiguration_universal_d_EventType = EventType;
  const crmAutomationsV1TriggerConfiguration_universal_d_EventType: typeof EventType;
  type crmAutomationsV1TriggerConfiguration_universal_d_Translation = Translation;
  type crmAutomationsV1TriggerConfiguration_universal_d_TranslationState = TranslationState;
  const crmAutomationsV1TriggerConfiguration_universal_d_TranslationState: typeof TranslationState;
  type crmAutomationsV1TriggerConfiguration_universal_d_ReengagementInfo = ReengagementInfo;
  type crmAutomationsV1TriggerConfiguration_universal_d_ReengagementMode = ReengagementMode;
  const crmAutomationsV1TriggerConfiguration_universal_d_ReengagementMode: typeof ReengagementMode;
  type crmAutomationsV1TriggerConfiguration_universal_d_DelayStrategy = DelayStrategy;
  type crmAutomationsV1TriggerConfiguration_universal_d_RateLimiting = RateLimiting;
  type crmAutomationsV1TriggerConfiguration_universal_d_RateLimitingOption = RateLimitingOption;
  type crmAutomationsV1TriggerConfiguration_universal_d_ExtendedFields = ExtendedFields;
  type crmAutomationsV1TriggerConfiguration_universal_d_ResolveTriggersConfigurationRequest = ResolveTriggersConfigurationRequest;
  type crmAutomationsV1TriggerConfiguration_universal_d_Paging = Paging;
  type crmAutomationsV1TriggerConfiguration_universal_d_ResolveTriggersConfigurationResponse = ResolveTriggersConfigurationResponse;
  type crmAutomationsV1TriggerConfiguration_universal_d_PagingMetadata = PagingMetadata;
  type crmAutomationsV1TriggerConfiguration_universal_d_CreateTriggerConfigurationRequest = CreateTriggerConfigurationRequest;
  type crmAutomationsV1TriggerConfiguration_universal_d_CreateTriggerConfigurationResponse = CreateTriggerConfigurationResponse;
  type crmAutomationsV1TriggerConfiguration_universal_d_UpdateTriggerConfigurationRequest = UpdateTriggerConfigurationRequest;
  type crmAutomationsV1TriggerConfiguration_universal_d_UpdateTriggerConfigurationResponse = UpdateTriggerConfigurationResponse;
  type crmAutomationsV1TriggerConfiguration_universal_d_DeleteTriggerConfigurationRequest = DeleteTriggerConfigurationRequest;
  type crmAutomationsV1TriggerConfiguration_universal_d_DeleteTriggerConfigurationResponse = DeleteTriggerConfigurationResponse;
  type crmAutomationsV1TriggerConfiguration_universal_d_GetTriggerConfigurationRequest = GetTriggerConfigurationRequest;
  type crmAutomationsV1TriggerConfiguration_universal_d_GetTriggerConfigurationResponse = GetTriggerConfigurationResponse;
  type crmAutomationsV1TriggerConfiguration_universal_d_QueryTriggersConfigurationRequest = QueryTriggersConfigurationRequest;
  type crmAutomationsV1TriggerConfiguration_universal_d_QueryV2 = QueryV2;
  type crmAutomationsV1TriggerConfiguration_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
  type crmAutomationsV1TriggerConfiguration_universal_d_Sorting = Sorting;
  type crmAutomationsV1TriggerConfiguration_universal_d_SortOrder = SortOrder;
  const crmAutomationsV1TriggerConfiguration_universal_d_SortOrder: typeof SortOrder;
  type crmAutomationsV1TriggerConfiguration_universal_d_CursorPaging = CursorPaging;
  type crmAutomationsV1TriggerConfiguration_universal_d_QueryTriggersConfigurationResponse = QueryTriggersConfigurationResponse;
  type crmAutomationsV1TriggerConfiguration_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type crmAutomationsV1TriggerConfiguration_universal_d_Cursors = Cursors;
  type crmAutomationsV1TriggerConfiguration_universal_d_GetTriggerSchemaRequest = GetTriggerSchemaRequest;
  type crmAutomationsV1TriggerConfiguration_universal_d_UserSelection = UserSelection;
  type crmAutomationsV1TriggerConfiguration_universal_d_GetTriggerSchemaResponse = GetTriggerSchemaResponse;
  type crmAutomationsV1TriggerConfiguration_universal_d_MigrateFromActionTriggersServerRequest = MigrateFromActionTriggersServerRequest;
  type crmAutomationsV1TriggerConfiguration_universal_d_MigrateFromActionTriggersServerResponse = MigrateFromActionTriggersServerResponse;
  type crmAutomationsV1TriggerConfiguration_universal_d_DomainEvent = DomainEvent;
  type crmAutomationsV1TriggerConfiguration_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type crmAutomationsV1TriggerConfiguration_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type crmAutomationsV1TriggerConfiguration_universal_d_RestoreInfo = RestoreInfo;
  type crmAutomationsV1TriggerConfiguration_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type crmAutomationsV1TriggerConfiguration_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type crmAutomationsV1TriggerConfiguration_universal_d_ActionEvent = ActionEvent;
  type crmAutomationsV1TriggerConfiguration_universal_d_MessageEnvelope = MessageEnvelope;
  type crmAutomationsV1TriggerConfiguration_universal_d_IdentificationData = IdentificationData;
  type crmAutomationsV1TriggerConfiguration_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type crmAutomationsV1TriggerConfiguration_universal_d_WebhookIdentityType = WebhookIdentityType;
  const crmAutomationsV1TriggerConfiguration_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const crmAutomationsV1TriggerConfiguration_universal_d_resolveTriggersConfiguration: typeof resolveTriggersConfiguration;
  type crmAutomationsV1TriggerConfiguration_universal_d_ResolveTriggersConfigurationOptions = ResolveTriggersConfigurationOptions;
  const crmAutomationsV1TriggerConfiguration_universal_d_createTriggerConfiguration: typeof createTriggerConfiguration;
  type crmAutomationsV1TriggerConfiguration_universal_d_CreateTriggerConfigurationOptions = CreateTriggerConfigurationOptions;
  const crmAutomationsV1TriggerConfiguration_universal_d_updateTriggerConfiguration: typeof updateTriggerConfiguration;
  type crmAutomationsV1TriggerConfiguration_universal_d_UpdateTriggerConfigurationOptions = UpdateTriggerConfigurationOptions;
  const crmAutomationsV1TriggerConfiguration_universal_d_deleteTriggerConfiguration: typeof deleteTriggerConfiguration;
  type crmAutomationsV1TriggerConfiguration_universal_d_DeleteTriggerConfigurationOptions = DeleteTriggerConfigurationOptions;
  const crmAutomationsV1TriggerConfiguration_universal_d_getTriggerConfiguration: typeof getTriggerConfiguration;
  type crmAutomationsV1TriggerConfiguration_universal_d_GetTriggerConfigurationOptions = GetTriggerConfigurationOptions;
  const crmAutomationsV1TriggerConfiguration_universal_d_queryTriggersConfiguration: typeof queryTriggersConfiguration;
  type crmAutomationsV1TriggerConfiguration_universal_d_QueryTriggersConfigurationOptions = QueryTriggersConfigurationOptions;
  type crmAutomationsV1TriggerConfiguration_universal_d_ResultsQueryResult = ResultsQueryResult;
  type crmAutomationsV1TriggerConfiguration_universal_d_ResultsQueryBuilder = ResultsQueryBuilder;
  const crmAutomationsV1TriggerConfiguration_universal_d_getTriggerSchema: typeof getTriggerSchema;
  type crmAutomationsV1TriggerConfiguration_universal_d_GetTriggerSchemaOptions = GetTriggerSchemaOptions;
  namespace crmAutomationsV1TriggerConfiguration_universal_d {
    export {
      crmAutomationsV1TriggerConfiguration_universal_d_TriggerConfiguration as TriggerConfiguration,
      crmAutomationsV1TriggerConfiguration_universal_d_Source as Source,
      crmAutomationsV1TriggerConfiguration_universal_d_SourceType as SourceType,
      crmAutomationsV1TriggerConfiguration_universal_d_SchemaConfiguration as SchemaConfiguration,
      crmAutomationsV1TriggerConfiguration_universal_d_SchemaField as SchemaField,
      crmAutomationsV1TriggerConfiguration_universal_d_PrimitiveType as PrimitiveType,
      crmAutomationsV1TriggerConfiguration_universal_d_SimpleType as SimpleType,
      crmAutomationsV1TriggerConfiguration_universal_d_EnumOption as EnumOption,
      crmAutomationsV1TriggerConfiguration_universal_d_Primitive as Primitive,
      crmAutomationsV1TriggerConfiguration_universal_d_Simple as Simple,
      crmAutomationsV1TriggerConfiguration_universal_d_DateType as DateType,
      crmAutomationsV1TriggerConfiguration_universal_d_Enumeration as Enumeration,
      crmAutomationsV1TriggerConfiguration_universal_d_Complex as Complex,
      crmAutomationsV1TriggerConfiguration_universal_d_MultilingualType as MultilingualType,
      crmAutomationsV1TriggerConfiguration_universal_d_SchemaFieldTypeV2 as SchemaFieldTypeV2,
      crmAutomationsV1TriggerConfiguration_universal_d_SchemaFieldTypeV2FieldTypeOneOf as SchemaFieldTypeV2FieldTypeOneOf,
      crmAutomationsV1TriggerConfiguration_universal_d_Exposure as Exposure,
      crmAutomationsV1TriggerConfiguration_universal_d_ConditionOptions as ConditionOptions,
      crmAutomationsV1TriggerConfiguration_universal_d_OptionValue as OptionValue,
      crmAutomationsV1TriggerConfiguration_universal_d_SelectionType as SelectionType,
      crmAutomationsV1TriggerConfiguration_universal_d_Visibility as Visibility,
      crmAutomationsV1TriggerConfiguration_universal_d_Precondition as Precondition,
      crmAutomationsV1TriggerConfiguration_universal_d_PreconditionType as PreconditionType,
      crmAutomationsV1TriggerConfiguration_universal_d_ActionRecommendation as ActionRecommendation,
      crmAutomationsV1TriggerConfiguration_universal_d_ActionVisibilityOverride as ActionVisibilityOverride,
      crmAutomationsV1TriggerConfiguration_universal_d_Enrichment as Enrichment,
      crmAutomationsV1TriggerConfiguration_universal_d_EventType as EventType,
      crmAutomationsV1TriggerConfiguration_universal_d_Translation as Translation,
      crmAutomationsV1TriggerConfiguration_universal_d_TranslationState as TranslationState,
      crmAutomationsV1TriggerConfiguration_universal_d_ReengagementInfo as ReengagementInfo,
      crmAutomationsV1TriggerConfiguration_universal_d_ReengagementMode as ReengagementMode,
      crmAutomationsV1TriggerConfiguration_universal_d_DelayStrategy as DelayStrategy,
      crmAutomationsV1TriggerConfiguration_universal_d_RateLimiting as RateLimiting,
      crmAutomationsV1TriggerConfiguration_universal_d_RateLimitingOption as RateLimitingOption,
      crmAutomationsV1TriggerConfiguration_universal_d_ExtendedFields as ExtendedFields,
      crmAutomationsV1TriggerConfiguration_universal_d_ResolveTriggersConfigurationRequest as ResolveTriggersConfigurationRequest,
      crmAutomationsV1TriggerConfiguration_universal_d_Paging as Paging,
      crmAutomationsV1TriggerConfiguration_universal_d_ResolveTriggersConfigurationResponse as ResolveTriggersConfigurationResponse,
      crmAutomationsV1TriggerConfiguration_universal_d_PagingMetadata as PagingMetadata,
      crmAutomationsV1TriggerConfiguration_universal_d_CreateTriggerConfigurationRequest as CreateTriggerConfigurationRequest,
      crmAutomationsV1TriggerConfiguration_universal_d_CreateTriggerConfigurationResponse as CreateTriggerConfigurationResponse,
      crmAutomationsV1TriggerConfiguration_universal_d_UpdateTriggerConfigurationRequest as UpdateTriggerConfigurationRequest,
      crmAutomationsV1TriggerConfiguration_universal_d_UpdateTriggerConfigurationResponse as UpdateTriggerConfigurationResponse,
      crmAutomationsV1TriggerConfiguration_universal_d_DeleteTriggerConfigurationRequest as DeleteTriggerConfigurationRequest,
      crmAutomationsV1TriggerConfiguration_universal_d_DeleteTriggerConfigurationResponse as DeleteTriggerConfigurationResponse,
      crmAutomationsV1TriggerConfiguration_universal_d_GetTriggerConfigurationRequest as GetTriggerConfigurationRequest,
      crmAutomationsV1TriggerConfiguration_universal_d_GetTriggerConfigurationResponse as GetTriggerConfigurationResponse,
      crmAutomationsV1TriggerConfiguration_universal_d_QueryTriggersConfigurationRequest as QueryTriggersConfigurationRequest,
      crmAutomationsV1TriggerConfiguration_universal_d_QueryV2 as QueryV2,
      crmAutomationsV1TriggerConfiguration_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf,
      crmAutomationsV1TriggerConfiguration_universal_d_Sorting as Sorting,
      crmAutomationsV1TriggerConfiguration_universal_d_SortOrder as SortOrder,
      crmAutomationsV1TriggerConfiguration_universal_d_CursorPaging as CursorPaging,
      crmAutomationsV1TriggerConfiguration_universal_d_QueryTriggersConfigurationResponse as QueryTriggersConfigurationResponse,
      crmAutomationsV1TriggerConfiguration_universal_d_PagingMetadataV2 as PagingMetadataV2,
      crmAutomationsV1TriggerConfiguration_universal_d_Cursors as Cursors,
      crmAutomationsV1TriggerConfiguration_universal_d_GetTriggerSchemaRequest as GetTriggerSchemaRequest,
      crmAutomationsV1TriggerConfiguration_universal_d_UserSelection as UserSelection,
      crmAutomationsV1TriggerConfiguration_universal_d_GetTriggerSchemaResponse as GetTriggerSchemaResponse,
      crmAutomationsV1TriggerConfiguration_universal_d_MigrateFromActionTriggersServerRequest as MigrateFromActionTriggersServerRequest,
      crmAutomationsV1TriggerConfiguration_universal_d_MigrateFromActionTriggersServerResponse as MigrateFromActionTriggersServerResponse,
      crmAutomationsV1TriggerConfiguration_universal_d_DomainEvent as DomainEvent,
      crmAutomationsV1TriggerConfiguration_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      crmAutomationsV1TriggerConfiguration_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      crmAutomationsV1TriggerConfiguration_universal_d_RestoreInfo as RestoreInfo,
      crmAutomationsV1TriggerConfiguration_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      crmAutomationsV1TriggerConfiguration_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      crmAutomationsV1TriggerConfiguration_universal_d_ActionEvent as ActionEvent,
      crmAutomationsV1TriggerConfiguration_universal_d_MessageEnvelope as MessageEnvelope,
      crmAutomationsV1TriggerConfiguration_universal_d_IdentificationData as IdentificationData,
      crmAutomationsV1TriggerConfiguration_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      crmAutomationsV1TriggerConfiguration_universal_d_WebhookIdentityType as WebhookIdentityType,
      crmAutomationsV1TriggerConfiguration_universal_d_resolveTriggersConfiguration as resolveTriggersConfiguration,
      crmAutomationsV1TriggerConfiguration_universal_d_ResolveTriggersConfigurationOptions as ResolveTriggersConfigurationOptions,
      crmAutomationsV1TriggerConfiguration_universal_d_createTriggerConfiguration as createTriggerConfiguration,
      crmAutomationsV1TriggerConfiguration_universal_d_CreateTriggerConfigurationOptions as CreateTriggerConfigurationOptions,
      crmAutomationsV1TriggerConfiguration_universal_d_updateTriggerConfiguration as updateTriggerConfiguration,
      crmAutomationsV1TriggerConfiguration_universal_d_UpdateTriggerConfigurationOptions as UpdateTriggerConfigurationOptions,
      crmAutomationsV1TriggerConfiguration_universal_d_deleteTriggerConfiguration as deleteTriggerConfiguration,
      crmAutomationsV1TriggerConfiguration_universal_d_DeleteTriggerConfigurationOptions as DeleteTriggerConfigurationOptions,
      crmAutomationsV1TriggerConfiguration_universal_d_getTriggerConfiguration as getTriggerConfiguration,
      crmAutomationsV1TriggerConfiguration_universal_d_GetTriggerConfigurationOptions as GetTriggerConfigurationOptions,
      crmAutomationsV1TriggerConfiguration_universal_d_queryTriggersConfiguration as queryTriggersConfiguration,
      crmAutomationsV1TriggerConfiguration_universal_d_QueryTriggersConfigurationOptions as QueryTriggersConfigurationOptions,
      crmAutomationsV1TriggerConfiguration_universal_d_ResultsQueryResult as ResultsQueryResult,
      crmAutomationsV1TriggerConfiguration_universal_d_ResultsQueryBuilder as ResultsQueryBuilder,
      crmAutomationsV1TriggerConfiguration_universal_d_getTriggerSchema as getTriggerSchema,
      crmAutomationsV1TriggerConfiguration_universal_d_GetTriggerSchemaOptions as GetTriggerSchemaOptions,
    };
  }
  
  export { crmAutomationsV1TriggerConfiguration_universal_d as triggerCatalog };
}
