declare module "wix-automations.v1" {
  /** Automation */
  interface Automation {
      /**
       * Automation ID
       * @readonly
       */
      _id?: string | null;
      /** Revision */
      revision?: string | null;
      /** Automation name */
      name?: string;
      /** Automation description */
      description?: string;
      /**
       * Automation Type
       * @readonly
       */
      type?: Type;
      /** Automation Status */
      status?: Status;
      /** Rule that contains a trigger and some actions */
      rule?: Rule;
      /**
       * Source Application Automation
       * @readonly
       */
      source?: Source;
      /**
       * Metadata
       * @readonly
       */
      metadata?: AutomationMetadata;
      /**
       * Created date
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Updated date
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * ESB Configuration ID
       * @readonly
       */
      esbConfigurationId?: string | null;
      /**
       * Was this automation migrated from v1
       * @readonly
       */
      migratedFromV1?: boolean | null;
      /** @readonly */
      migratedToV3?: boolean | null;
      /** @internal */
      extendedFields?: ExtendedFields;
  }
  enum Type {
      CUSTOM = "CUSTOM",
      APPLICATION = "APPLICATION"
  }
  enum Status {
      ACTIVE = "ACTIVE",
      INACTIVE = "INACTIVE"
  }
  interface Rule {
      /** an event triggered by visitors on a site, or by a site manager (owner & team). */
      trigger?: Trigger;
      /**
       * the actions responding to the trigger happening.
       * ** IMPORTANT NOTE: the order of the actions is important, and will be executed in the order they appear in the list **
       */
      actions?: Action[];
  }
  interface Trigger {
      /** the id of the app defining the trigger */
      appId?: string;
      /** Identifier for this trigger - human readable action key */
      triggerKey?: string;
      /** optional list of filters on schema fields */
      filters?: Filter[];
      /**
       * optional - allows to define a trigger whose following actions will be executed only if the same event for the same resource has not in the last X seconds.
       * for example, if the trigger is "session booked", the resource is a contact and the timeframe is 3600 seconds (contact hasn't booked another session in the last hour),
       * then the actions will be executed only if the same event (session booked for that contact) has not happened in the last hour.
       */
      debounce?: Debounce;
  }
  interface Filter {
      /** the filter identifier */
      _id?: string | null;
      /** the field key from the schema, for example "formId" */
      fieldKey?: string;
      /** filter expression that evaluates to a boolean, for example - {{ contains(["guid1","guid2"];formId) }} */
      filterExpression?: string;
  }
  interface Debounce {
      /**
       * Amount of time in seconds to wait for any additional events to occur before triggering the actions.
       * If no additional events occur within the specified time, the actions will be triggered.
       * If additional events occur within the specified time, the timer will be reset.
       */
      timeFrameInSeconds?: number;
      /**
       * The field key in the trigger's payload of the entity/event to debounce on
       * For example: if the trigger is "user logged in", the resource is a contact and the resource key is "contactId",
       * Another example: if the trigger is "visitor logged in", the resource is a visitor and the resource key is "visitorId".
       */
      fieldKey?: string;
  }
  interface Action {
      /**
       * the id of the action for delayed events
       * @readonly
       */
      _id?: string | null;
      /** the id of the app defining the action */
      appId?: string;
      /** Identifier for this action - human readable action key - unique per app def id */
      actionKey?: string;
      /**
       * input mapping expression for the action inputs
       * for example:
       * `{  "subject": "Thanks for reaching out!"
       * "message": "Hi {{contact.name.first}}, thanks for contacting our business"
       * }`
       * where the value for "contact.name.first" comes from the trigger's payload
       */
      actionConfig?: string;
      /**
       * output mapping expression for the action output
       * for example in get-contact action:
       * `{ "author": "{{$}}" }`
       * This will map the entire entity of contact under `author` namespace
       */
      outputActionConfig?: string | null;
      /** Optional delay configuration for the action */
      delay?: Delay;
      /** allows you define an activation policy - like number of activations in a time frame, or limit by some identifier, like contact (e.g. send email to user only at first login) */
      rateLimit?: RateLimit;
      /**
       * allows the user to define a condition for the action to be executed, if the condition fails the action (and following actions) will not be executed
       * @deprecated allows the user to define a condition for the action to be executed, if the condition fails the action (and following actions) will not be executed
       * @replacedBy conditions
       * @targetRemovalDate 2023-08-01
       */
      condition?: Condition;
      conditions?: Conditions;
      /** allows the user to define a namespace for the action output */
      namespace?: string | null;
  }
  enum BlockType {
      UNKNOWN = "UNKNOWN",
      OR = "OR",
      AND = "AND"
  }
  interface ConditionBlock {
      type?: BlockType;
      lineExpressions?: string[];
  }
  interface Offset extends OffsetValueOneOf {
      /** A delay in seconds */
      seconds?: number;
      /** The key of the field in the trigger payload which contains a delay, in seconds. */
      delayFieldKey?: string;
  }
  /** @oneof */
  interface OffsetValueOneOf {
      /** A delay in seconds */
      seconds?: number;
      /** The key of the field in the trigger payload which contains a delay, in seconds. */
      delayFieldKey?: string;
  }
  /** calculated as date + delay */
  interface Until {
      /** The key of the field in the trigger payload which contains the date to delay until */
      dateFieldKey?: string;
      /** Optional: a delay to add together with the date described in the payload */
      offset?: Offset;
  }
  interface Delay extends DelayTypeOneOf {
      /** A delay which is calculated based on the immediate time when the action is triggered. */
      for?: Offset;
      /** A delay which is calculated based on a date field in the trigger payload. May also be used together with an Offset delay. */
      until?: Until;
  }
  /** @oneof */
  interface DelayTypeOneOf {
      /** A delay which is calculated based on the immediate time when the action is triggered. */
      for?: Offset;
      /** A delay which is calculated based on a date field in the trigger payload. May also be used together with an Offset delay. */
      until?: Until;
  }
  interface RateLimit {
      /** time frame in minutes */
      timeFrame?: number | null;
      /** number of activations allowed in the given time frame */
      activations?: number;
      /** limit the activation by an entity, for example activate once per contact. example: {{contact.id}} */
      uniqueIdentifierExpression?: string | null;
  }
  interface Condition {
      /**
       * entity object is deprecated due to the new approach to conditions
       * the condition expression, for example - {{and(gt(price;10);lt(price;100))}}
       */
      conditionExpression?: string;
  }
  interface Conditions {
      /** condition evaluates to `true` if either of the blocks evaluate to `true` (aka OR between all) */
      conditionBlocks?: ConditionBlock[];
  }
  interface Source {
      /** Automation ID */
      automationId?: string | null;
      /** Application ID */
      appId?: string | null;
      /** Component ID */
      componentId?: string | null;
      /** Version */
      version?: number | null;
  }
  interface AutomationMetadata {
      /** Is this Automation hidden on a site? */
      hidden?: boolean;
      /** Can this Automation be dismissed (inactivated) on a site? */
      alwaysActive?: boolean;
      /** Is this Automation's scheduling modification is disabled on a site? */
      schedulingModificationDisabled?: boolean;
      /** Is the removal of this Automation's actions disabled? */
      actionRemovalDisabled?: boolean;
      /** Is conditions editing for this Automation allowed on a site? */
      actionConditionsEditingDisabled?: boolean;
      /**
       * Domain
       * @internal
       */
      domain?: Domain;
  }
  enum Domain {
      /** User domain (default) */
      USER = "USER",
      /** Wix domain */
      WIX = "WIX"
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
  interface GetApplicationAutomationRequest {
      /** Application Automation ID */
      automationId?: string;
  }
  interface GetApplicationAutomationResponse {
      /** Automation */
      automation?: Automation;
  }
  interface QueryApplicationAutomationsRequest {
      /** Query */
      query?: QueryV2;
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
  interface QueryApplicationAutomationsResponse {
      /** List of automations */
      automations?: Automation[];
      /** Paging metadata */
      paging?: PagingMetadataV2;
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
  interface UpdateApplicationAutomationConfigurationIdRequest {
      /** Application Automation ID */
      automationId?: string;
      /** Configuration ID */
      esbConfigurationId?: string;
  }
  interface UpdateApplicationAutomationConfigurationIdResponse {
  }
  interface UpdateApplicationAutomationToMigratedFromV1Request {
      /** Application Automation ID */
      automationId?: string;
      /**
       * Revision
       * @readonly
       */
      revision?: string | null;
      /** value to be set */
      value?: boolean | null;
  }
  interface UpdateApplicationAutomationToMigratedFromV1Response {
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
  interface Empty {
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
  interface SyncApplicationAutomationsRequest {
      /** List of app IDs */
      appIds?: string[];
  }
  interface SyncApplicationAutomationsResponse {
  }
  interface BulkCreateApplicationAutomationRequest {
      /** Automations to be created */
      automations: Automation[];
  }
  interface BulkCreateApplicationAutomationResponse {
      /** The created Automations */
      results?: Automation[];
      /** Bulk create metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkActionMetadata {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
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
  interface CreateAutomationRequest {
      /** Automation to be created */
      automation: Automation;
  }
  interface CreateAutomationResponse {
      /** The created Automation */
      automation?: Automation;
  }
  interface MigrationBulkCreateAutomationsRequest {
      /** Automations to be created */
      automations?: Automation[];
      /** V1 Activity type (trigger name) */
      activityType?: string;
      /** automation id to counter map */
      automationIdToCounter?: Record<string, string>;
      /** automation id to last triggered map */
      automationIdToLastTriggered?: Record<string, string>;
      /** ignore validations */
      ignoreValidations?: boolean | null;
  }
  interface MigrationBulkCreateAutomationsResponse {
      /** bulk action metadata */
      bulkActionMetadata?: BulkActionMetadata;
      /** item metadata */
      itemMetadata?: ItemMetadata[];
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
  interface MigrationBulkCreateAutomations {
      /** Automations to be created */
      automations?: Automation[];
      /** V1 Activity type (trigger name) */
      activityType?: string;
      /** automation id to counter map */
      automationIdToCounter?: Record<string, string>;
      /** automation id to last triggered map */
      automationIdToLastTriggered?: Record<string, string>;
  }
  interface GetAutomationRequest {
      /** Automation ID */
      automationId: string;
      /** Automation type */
      automationType?: Type;
  }
  interface GetAutomationResponse {
      /** Automation */
      automation?: Automation;
  }
  interface UpdateAutomationRequest {
      /** Automation to be updated, may be partial */
      automation: Automation;
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  interface UpdateAutomationResponse {
      /** The updated Automation */
      automation?: Automation;
  }
  interface UpdatedWithPreviousEntity {
      /** previous automation */
      previousAutomation?: Automation;
      /** updated automation */
      currentAutomation?: Automation;
  }
  interface MigrationUpdateAutomationRequest {
      /** Automation to be updated, may be partial */
      automation: Automation;
  }
  interface MigrationUpdateAutomationResponse {
      /** The updated Automation */
      automation?: Automation;
  }
  interface DeleteAutomationRequest {
      /** Id of the Automation to delete */
      automationId: string;
      /** The revision of the Automation */
      revision?: string;
  }
  interface DeleteAutomationResponse {
  }
  interface DeletedWithEntity {
      /** Deleted automation */
      automation?: Automation;
  }
  interface QueryAutomationsRequest {
      /** WQL expression */
      query: QueryV2;
      /** Automation type */
      automationType?: Type;
  }
  interface QueryAutomationsResponse {
      /** List of automations */
      automations?: Automation[];
      /** Paging metadata */
      paging?: PagingMetadataV2;
  }
  interface OverrideApplicationAutomationRequest {
      /** Application Automation */
      automation: Automation;
  }
  interface OverrideApplicationAutomationResponse {
      /** Custom Automation */
      automation?: Automation;
  }
  interface GenerateApplicationAutomationFromCustomRequest {
      /** Custom Automation */
      automation: Automation;
  }
  interface GenerateApplicationAutomationFromCustomResponse {
      /** Application Automation */
      automation?: Automation;
  }
  interface ValidateAutomationByIdRequest {
      /** Automation ID */
      automationId: string;
      /** Automation type */
      automationType?: Type;
  }
  interface ValidateAutomationByIdResponse {
      /** is the Automation valid */
      valid?: boolean;
      /** list of validation errors for the automation Trigger */
      triggerValidationErrors?: TriggerValidationError[];
      /** list of validation information for the automation Actions */
      actionValidationInfo?: ActionValidationInfo[];
  }
  interface TriggerValidationError extends TriggerValidationErrorErrorOneOf {
      /** trigger configuration error */
      configurationError?: TriggerConfigurationError;
      /** provider configuration error */
      providerConfigurationError?: ProviderConfigurationError;
      /** validation error type */
      errorType?: TriggerValidationErrorValidationErrorType;
  }
  /** @oneof */
  interface TriggerValidationErrorErrorOneOf {
      /** trigger configuration error */
      configurationError?: TriggerConfigurationError;
      /** provider configuration error */
      providerConfigurationError?: ProviderConfigurationError;
  }
  enum TriggerValidationErrorValidationErrorType {
      UNKNOWN_VALIDATION_ERROR_TYPE = "UNKNOWN_VALIDATION_ERROR_TYPE",
      CONFIGURATION_ERROR = "CONFIGURATION_ERROR",
      PROVIDER_ERROR = "PROVIDER_ERROR"
  }
  interface TriggerConfigurationError {
      /** trigger error type */
      errorType?: TriggerErrorType;
      /** optional - related filter field key */
      filterFieldKey?: string | null;
  }
  enum TriggerErrorType {
      UNKNOWN_TRIGGER_ERROR_TYPE = "UNKNOWN_TRIGGER_ERROR_TYPE",
      NOT_FOUND = "NOT_FOUND",
      APP_NOT_INSTALLED = "APP_NOT_INSTALLED",
      MODERATION_MISMATCH = "MODERATION_MISMATCH",
      DEPRECATED = "DEPRECATED",
      INVALID_TRIGGER_KEY = "INVALID_TRIGGER_KEY",
      INVALID_FILTER_FIELD_KEY = "INVALID_FILTER_FIELD_KEY",
      INVALID_FILTER_EXPRESSION = "INVALID_FILTER_EXPRESSION"
  }
  interface ProviderConfigurationError {
      /** Key corresponding to the field in the schema. */
      fieldKey?: string | null;
      /** Error message. */
      message?: string;
      /** Label for a call-to-action button that's displayed with the error. Translated according to the SPI language context. */
      ctaLabel?: string | null;
      /** URL to redirect to when the call-to-action button is clicked. */
      ctaUrl?: string | null;
      /** Title for the error. */
      title?: string;
  }
  interface ActionValidationInfo {
      /** the id of the action in the automation */
      actionId?: string | null;
      /** the id of the app defining the action */
      appId?: string;
      /** human readable identifier of the action per app */
      actionKey?: string;
      /** list of action validation errors */
      validationErrors?: ActionValidationError[];
  }
  interface ActionValidationError extends ActionValidationErrorErrorOneOf {
      /** action configuration error */
      configurationError?: ActionConfigurationError;
      /** provider configuration error */
      providerConfigurationError?: ProviderConfigurationError;
      /** validation error type */
      errorType?: ValidationErrorType;
  }
  /** @oneof */
  interface ActionValidationErrorErrorOneOf {
      /** action configuration error */
      configurationError?: ActionConfigurationError;
      /** provider configuration error */
      providerConfigurationError?: ProviderConfigurationError;
  }
  enum ValidationErrorType {
      UNKNOWN_VALIDATION_ERROR_TYPE = "UNKNOWN_VALIDATION_ERROR_TYPE",
      CONFIGURATION_ERROR = "CONFIGURATION_ERROR",
      PROVIDER_ERROR = "PROVIDER_ERROR"
  }
  interface ActionConfigurationError {
      /** action error type */
      errorType?: ActionErrorType;
      /** optional - related field key */
      fieldKey?: string | null;
  }
  enum ActionErrorType {
      UNKNOWN_ACTION_ERROR_TYPE = "UNKNOWN_ACTION_ERROR_TYPE",
      NOT_FOUND = "NOT_FOUND",
      APP_NOT_INSTALLED = "APP_NOT_INSTALLED",
      MODERATION_MISMATCH = "MODERATION_MISMATCH",
      DEPRECATED = "DEPRECATED",
      INVALID_ACTION_KEY = "INVALID_ACTION_KEY",
      INVALID_INPUT_MAPPING = "INVALID_INPUT_MAPPING",
      INVALID_OUTPUT_MAPPING = "INVALID_OUTPUT_MAPPING",
      INVALID_DELAY = "INVALID_DELAY",
      INVALID_RATE_LIMIT = "INVALID_RATE_LIMIT",
      INPUT_MAPPING_TYPE_MISMATCH = "INPUT_MAPPING_TYPE_MISMATCH",
      INPUT_MAPPING_MISSING_REQUIRED_FIELD = "INPUT_MAPPING_MISSING_REQUIRED_FIELD",
      INPUT_MAPPING_SCHEMA_MISMATCH = "INPUT_MAPPING_SCHEMA_MISMATCH",
      INPUT_MAPPING_VARIABLE_MISSING_FROM_SCHEMA = "INPUT_MAPPING_VARIABLE_MISSING_FROM_SCHEMA"
  }
  interface ValidateAutomationRequest {
      /** Automation to validate */
      automation: Automation;
  }
  interface ValidateAutomationResponse {
      /** is the Automation valid */
      valid?: boolean;
      /** list of validation errors for the automation Trigger */
      triggerValidationErrors?: TriggerValidationError[];
      /** list of validation information for the automation Actions */
      actionValidationInfo?: ActionValidationInfo[];
  }
  interface UpdatedAutomationsWithEsb {
      /** updated automations */
      automations?: Automation[];
  }
  interface GetAutomationActivationReportsRequest {
      /** Automation ID */
      automationId: string;
      paging?: Paging;
      /** Fields projection - pass in the field key you want to get back */
      fields?: string[];
  }
  interface GetAutomationActivationReportsResponse {
      /** Automation activation reports */
      activationReports?: ActivationReport[];
      metadata?: PagingMetadata;
      /** activationStatus -> count */
      stats?: Record<string, number>;
  }
  interface ActivationReport {
      activationId?: string;
      requestId?: string;
      status?: ActivationStatus;
      creationDate?: Date | null;
      updateDate?: Date | null;
      /** will be populated when status = FAILED */
      error?: string | null;
  }
  enum ActivationStatus {
      UNKNOWN_ACTIVATION_REQUEST = "UNKNOWN_ACTIVATION_REQUEST",
      IN_PROGRESS = "IN_PROGRESS",
      SUCCESS = "SUCCESS",
      FAILED = "FAILED",
      SCHEDULED = "SCHEDULED",
      RETRY = "RETRY",
      RESUMED = "RESUMED",
      PAUSED = "PAUSED"
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
  interface GetAutomationActionSchemaRequest {
      /** Automation's Configuration ID */
      esbConfigurationId: string;
      /** Specific action ID */
      actionId: string;
  }
  interface GetAutomationActionSchemaResponse {
      /** The payload schema of the automation for the specific action */
      schema?: Record<string, any> | null;
  }
  interface GetActionsQuotaInfoRequest {
  }
  interface GetActionsQuotaInfoResponse {
      /** list of action quota information */
      actionProviderQuotaInfo?: ActionProviderQuotaInfo[];
  }
  interface ActionProviderQuotaInfo {
      /** action app id */
      appId?: string;
      /** the action key */
      actionKey?: string;
      /** the action quota information */
      actionQuotaInfo?: ActionQuotaInfo;
  }
  interface ActionQuotaInfo {
      /**
       * Whether the quotas for your action are enforced. If you mark this as `true` in the response body,
       * Wix displays the information in the quota object on the site dashboard. If you mark this as `false` for
       * a user, Wix does not display any quota info on the site dashboard for your service.
       */
      enforced?: boolean;
      /**
       * The plans your service provides, together with the quotas enforced by each plan. A site may be enrolled
       * in multiple plans. Plans and quotas can be related as follows:
       *
       * + A single plan has a single quota.
       * + A single plan has multiple quotas.
       * + Multiple plans are associated with multiple quotas.
       *
       * Plans and quotas that are related should be grouped together in a single `quotaInfo`
       * object.
       */
      quotaInfo?: QuotaInfo[];
  }
  interface QuotaInfo {
      /** List of plans associated with the site making the request. */
      plans?: Plan[];
      /** List of quotas associated with the plans the site is enrolled in. */
      quotas?: Quota[];
      /**
       * Details for an upgrade call-to-action button.
       * Displayed in the site contributor’s dashboard together with the quota details.
       */
      upgradeCta?: UpgradeCTA;
  }
  interface Plan {
      /** Plan ID defined by the action provider. */
      _id?: string;
      /** Plan name to display in the site contributor’s dashboard. */
      name?: string;
      /**
       * optional - the plan group id
       * @internal
       */
      groupId?: string | null;
  }
  interface Quota {
      /** Name of the feature the quota is related to. For example, "Messages sent". */
      featureName?: string;
      /**
       * Quota renewal date in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.
       * For example, 10 July 2020 at 15:00 is written as `2020-07-10 15:00:00.000`.
       */
      renewalDate?: Date | null;
      /** The user's current quota usage. */
      currentUsage?: string;
      /** Quota limit data. */
      limit?: string | null;
      /** Additional information about the quota. Displayed as a tooltip in the site contributor’s dashboard. */
      additionalInfo?: AdditionalInfo;
  }
  interface CTA {
      /** Call-to-action redirect URL. */
      url?: string;
      /** Call-to-action label. */
      label?: string;
  }
  interface AdditionalInfo {
      /** Tooltip content. */
      description?: string;
      /** Details for an options call-to-action link that appears in the tooltip. */
      cta?: CTA;
  }
  interface UpgradeCTA {
      /** CTA button redirect URL. */
      url?: string;
      /** CTA button label. */
      label?: string;
      /**
       * optional - id of the related plan
       * @internal
       */
      planId?: string | null;
  }
  interface BulkDeleteAutomationsRequest {
      /** Automation IDs to delete */
      automationIds?: string[];
  }
  interface BulkDeleteAutomationsResponse {
  }
  interface GenerateActionInputMappingFromTemplateRequest {
      /** action app id */
      appId: string;
      /** the action key */
      actionKey: string;
      /** action input mapping template the action spi provider will generate input mapping from */
      actionInputMappingTemplate: Record<string, any> | null;
  }
  interface GenerateActionInputMappingFromTemplateResponse {
      /** generated action input mapping */
      generatedActionInputMapping?: Record<string, any> | null;
  }
  interface MigrationUpdateMigratedToV3AutomationRequest {
      /** Automation id */
      automationId?: string;
  }
  interface MigrationUpdateMigratedToV3AutomationResponse {
  }
  /**
   * Create application automations
   * @param automations - Automations to be created
   * @internal
   * @documentationMaturity preview
   * @requiredField automations
   * @requiredField automations.name
   * @requiredField automations.rule
   * @requiredField automations.rule.actions
   * @requiredField automations.rule.actions.actionKey
   * @requiredField automations.rule.actions.appId
   * @requiredField automations.rule.trigger
   * @requiredField automations.rule.trigger.appId
   * @requiredField automations.rule.trigger.triggerKey
   * @requiredField automations.source
   * @requiredField automations.source.appId
   * @requiredField automations.source.componentId
   * @permissionId AUTOMATIONS.APP_AUTOMATION_CREATE
   * @adminMethod
   */
  function bulkCreateApplicationAutomation(automations: Automation[]): Promise<BulkCreateApplicationAutomationResponse>;
  /**
   * Creates a new Automation
   * @param automation - Automation to be created
   * @public
   * @documentationMaturity preview
   * @requiredField automation
   * @requiredField automation.name
   * @requiredField automation.rule
   * @requiredField automation.rule.actions
   * @requiredField automation.rule.actions.actionKey
   * @requiredField automation.rule.actions.appId
   * @requiredField automation.rule.trigger
   * @requiredField automation.rule.trigger.appId
   * @requiredField automation.rule.trigger.triggerKey
   * @permissionId AUTOMATIONS.AUTOMATION_CREATE
   * @adminMethod
   * @returns The created Automation
   */
  function createAutomation(automation: Automation): Promise<Automation>;
  /**
   * Creates new Automations in bulk
   * @internal
   * @documentationMaturity preview
   * @permissionId AUTOMATIONS.AUTOMATION_CREATE
   * @adminMethod
   */
  function migrationBulkCreateAutomations(options?: MigrationBulkCreateAutomationsOptions): Promise<MigrationBulkCreateAutomationsResponse>;
  interface MigrationBulkCreateAutomationsOptions {
      /** Automations to be created */
      automations?: Automation[];
      /** V1 Activity type (trigger name) */
      activityType?: string;
      /** automation id to counter map */
      automationIdToCounter?: Record<string, string>;
      /** automation id to last triggered map */
      automationIdToLastTriggered?: Record<string, string>;
      /** ignore validations */
      ignoreValidations?: boolean | null;
  }
  /**
   * Get a Automation by id
   * @param automationId - Automation ID
   * @public
   * @documentationMaturity preview
   * @requiredField automationId
   * @permissionId AUTOMATIONS.AUTOMATION_READ
   * @adminMethod
   * @returns Automation
   */
  function getAutomation(automationId: string, options?: GetAutomationOptions): Promise<Automation>;
  interface GetAutomationOptions {
      /** Automation type */
      automationType?: Type;
  }
  /**
   * Update a Automation, supports partial update
   * Pass the latest `revision` for a successful update
   * @param _id - Automation ID
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField automation
   * @requiredField automation.revision
   * @permissionId AUTOMATIONS.AUTOMATION_UPDATE
   * @adminMethod
   * @returns The updated Automation
   */
  function updateAutomation(_id: string | null, automation: UpdateAutomation, options?: UpdateAutomationOptions): Promise<Automation>;
  interface UpdateAutomation {
      /**
       * Automation ID
       * @readonly
       */
      _id?: string | null;
      /** Revision */
      revision?: string | null;
      /** Automation name */
      name?: string;
      /** Automation description */
      description?: string;
      /**
       * Automation Type
       * @readonly
       */
      type?: Type;
      /** Automation Status */
      status?: Status;
      /** Rule that contains a trigger and some actions */
      rule?: Rule;
      /**
       * Source Application Automation
       * @readonly
       */
      source?: Source;
      /**
       * Metadata
       * @readonly
       */
      metadata?: AutomationMetadata;
      /**
       * Created date
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Updated date
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * ESB Configuration ID
       * @readonly
       */
      esbConfigurationId?: string | null;
      /**
       * Was this automation migrated from v1
       * @readonly
       */
      migratedFromV1?: boolean | null;
      /** @readonly */
      migratedToV3?: boolean | null;
      /** @internal */
      extendedFields?: ExtendedFields;
  }
  interface UpdateAutomationOptions {
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  /** @param _id - Automation ID
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField automation
   * @permissionId AUTOMATIONS.AUTOMATION_UPDATE
   * @adminMethod
   */
  function migrationUpdateAutomation(_id: string | null, automation: MigrationUpdateAutomation): Promise<MigrationUpdateAutomationResponse>;
  interface MigrationUpdateAutomation {
      /**
       * Automation ID
       * @readonly
       */
      _id?: string | null;
      /** Revision */
      revision?: string | null;
      /** Automation name */
      name?: string;
      /** Automation description */
      description?: string;
      /**
       * Automation Type
       * @readonly
       */
      type?: Type;
      /** Automation Status */
      status?: Status;
      /** Rule that contains a trigger and some actions */
      rule?: Rule;
      /**
       * Source Application Automation
       * @readonly
       */
      source?: Source;
      /**
       * Metadata
       * @readonly
       */
      metadata?: AutomationMetadata;
      /**
       * Created date
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Updated date
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * ESB Configuration ID
       * @readonly
       */
      esbConfigurationId?: string | null;
      /**
       * Was this automation migrated from v1
       * @readonly
       */
      migratedFromV1?: boolean | null;
      /** @readonly */
      migratedToV3?: boolean | null;
      /** @internal */
      extendedFields?: ExtendedFields;
  }
  /**
   * Delete an Automation
   * @param automationId - Id of the Automation to delete
   * @public
   * @documentationMaturity preview
   * @requiredField automationId
   * @permissionId AUTOMATIONS.AUTOMATION_DELETE
   * @adminMethod
   */
  function deleteAutomation(automationId: string, options?: DeleteAutomationOptions): Promise<void>;
  interface DeleteAutomationOptions {
      /** The revision of the Automation */
      revision?: string;
  }
  /**
   * Query Automations using [WQL - Wix Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language)
   * @public
   * @documentationMaturity preview
   * @permissionId AUTOMATIONS.AUTOMATION_READ
   * @adminMethod
   */
  function queryAutomations(options?: QueryAutomationsOptions): AutomationsQueryBuilder;
  interface QueryAutomationsOptions {
      /** Automation type */
      automationType?: Type | undefined;
  }
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface AutomationsQueryResult extends QueryCursorResult {
      items: Automation[];
      query: AutomationsQueryBuilder;
      next: () => Promise<AutomationsQueryResult>;
      prev: () => Promise<AutomationsQueryResult>;
  }
  interface AutomationsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | 'revision' | 'name' | 'description' | 'type' | 'status' | 'rule.trigger.appId' | 'rule.trigger.triggerKey' | 'rule.actions.id' | 'rule.actions.appId' | 'rule.actions.actionKey' | 'source.automationId' | 'source.appId' | 'source.componentId' | 'source.version' | 'metadata.hidden' | 'metadata.alwaysActive' | 'metadata.schedulingModificationDisabled' | 'metadata.actionRemovalDisabled' | 'metadata.actionConditionsEditingDisabled' | '_createdDate' | '_updatedDate' | 'esbConfigurationId', value: any) => AutomationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | 'revision' | 'name' | 'description' | 'type' | 'status' | 'rule.trigger.appId' | 'rule.trigger.triggerKey' | 'rule.actions.id' | 'rule.actions.appId' | 'rule.actions.actionKey' | 'source.automationId' | 'source.appId' | 'source.componentId' | 'source.version' | 'metadata.hidden' | 'metadata.alwaysActive' | 'metadata.schedulingModificationDisabled' | 'metadata.actionRemovalDisabled' | 'metadata.actionConditionsEditingDisabled' | '_createdDate' | '_updatedDate' | 'esbConfigurationId', value: any) => AutomationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: 'revision' | 'source.version' | '_createdDate' | '_updatedDate', value: any) => AutomationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: 'revision' | 'source.version' | '_createdDate' | '_updatedDate', value: any) => AutomationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: 'revision' | 'source.version' | '_createdDate' | '_updatedDate', value: any) => AutomationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: 'revision' | 'source.version' | '_createdDate' | '_updatedDate', value: any) => AutomationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'name' | 'description' | 'rule.trigger.appId' | 'rule.trigger.triggerKey' | 'rule.actions.id' | 'rule.actions.appId' | 'rule.actions.actionKey' | 'source.automationId' | 'source.appId' | 'source.componentId' | 'esbConfigurationId', value: string) => AutomationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | 'revision' | 'name' | 'description' | 'type' | 'status' | 'rule.trigger.appId' | 'rule.trigger.triggerKey' | 'rule.actions.id' | 'rule.actions.appId' | 'rule.actions.actionKey' | 'source.automationId' | 'source.appId' | 'source.componentId' | 'source.version' | 'metadata.hidden' | 'metadata.alwaysActive' | 'metadata.schedulingModificationDisabled' | 'metadata.actionRemovalDisabled' | 'metadata.actionConditionsEditingDisabled' | '_createdDate' | '_updatedDate' | 'esbConfigurationId', value: any[]) => AutomationsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'revision' | 'name' | 'description' | 'type' | 'status' | 'rule.trigger.appId' | 'rule.trigger.triggerKey' | 'rule.actions.id' | 'rule.actions.appId' | 'rule.actions.actionKey' | 'source.automationId' | 'source.appId' | 'source.componentId' | 'source.version' | 'metadata.hidden' | 'metadata.alwaysActive' | 'metadata.schedulingModificationDisabled' | 'metadata.actionRemovalDisabled' | 'metadata.actionConditionsEditingDisabled' | '_createdDate' | '_updatedDate' | 'esbConfigurationId', value: any) => AutomationsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | 'revision' | 'name' | 'description' | 'type' | 'status' | 'rule.trigger.appId' | 'rule.trigger.triggerKey' | 'rule.actions.id' | 'rule.actions.appId' | 'rule.actions.actionKey' | 'source.automationId' | 'source.appId' | 'source.componentId' | 'source.version' | 'metadata.hidden' | 'metadata.alwaysActive' | 'metadata.schedulingModificationDisabled' | 'metadata.actionRemovalDisabled' | 'metadata.actionConditionsEditingDisabled' | '_createdDate' | '_updatedDate' | 'esbConfigurationId', value: boolean) => AutomationsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | 'revision' | 'name' | 'description' | 'type' | 'status' | 'rule.trigger.appId' | 'rule.trigger.triggerKey' | 'rule.actions.id' | 'rule.actions.appId' | 'rule.actions.actionKey' | 'source.automationId' | 'source.appId' | 'source.componentId' | 'source.version' | 'metadata.hidden' | 'metadata.alwaysActive' | 'metadata.schedulingModificationDisabled' | 'metadata.actionRemovalDisabled' | 'metadata.actionConditionsEditingDisabled' | '_createdDate' | '_updatedDate' | 'esbConfigurationId'>) => AutomationsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | 'revision' | 'name' | 'description' | 'type' | 'status' | 'rule.trigger.appId' | 'rule.trigger.triggerKey' | 'rule.actions.id' | 'rule.actions.appId' | 'rule.actions.actionKey' | 'source.automationId' | 'source.appId' | 'source.componentId' | 'source.version' | 'metadata.hidden' | 'metadata.alwaysActive' | 'metadata.schedulingModificationDisabled' | 'metadata.actionRemovalDisabled' | 'metadata.actionConditionsEditingDisabled' | '_createdDate' | '_updatedDate' | 'esbConfigurationId'>) => AutomationsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => AutomationsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => AutomationsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<AutomationsQueryResult>;
  }
  /**
   * Creates a new Automation
   * @param automation - Application Automation
   * @public
   * @documentationMaturity preview
   * @requiredField automation
   * @requiredField automation.name
   * @requiredField automation.rule
   * @requiredField automation.rule.actions
   * @requiredField automation.rule.actions.actionKey
   * @requiredField automation.rule.actions.appId
   * @requiredField automation.rule.trigger
   * @requiredField automation.rule.trigger.appId
   * @requiredField automation.rule.trigger.triggerKey
   * @permissionId AUTOMATIONS.OVERRIDE_APPLICATION_AUTOMATION
   * @adminMethod
   */
  function overrideApplicationAutomation(automation: Automation): Promise<OverrideApplicationAutomationResponse>;
  /**
   * Generates an Application Automation from given Custom Automation
   * @param automation - Custom Automation
   * @internal
   * @documentationMaturity preview
   * @requiredField automation
   * @requiredField automation.name
   * @requiredField automation.rule
   * @requiredField automation.rule.actions
   * @requiredField automation.rule.actions.actionKey
   * @requiredField automation.rule.actions.appId
   * @requiredField automation.rule.trigger
   * @requiredField automation.rule.trigger.appId
   * @requiredField automation.rule.trigger.triggerKey
   * @permissionId AUTOMATIONS.GENERATE_APPLICATION_AUTOMATION_FROM_CUSTOM
   * @adminMethod
   */
  function generateApplicationAutomationFromCustom(automation: Automation): Promise<GenerateApplicationAutomationFromCustomResponse>;
  /**
   * Validate Automation by Id
   * @param automationId - Automation ID
   * @public
   * @documentationMaturity preview
   * @requiredField automationId
   * @permissionId AUTOMATIONS.AUTOMATION_VALIDATE
   * @adminMethod
   */
  function validateAutomationById(automationId: string, options?: ValidateAutomationByIdOptions): Promise<ValidateAutomationByIdResponse>;
  interface ValidateAutomationByIdOptions {
      /** Automation type */
      automationType?: Type;
  }
  /**
   * Validate Automation
   * @param automation - Automation to validate
   * @public
   * @documentationMaturity preview
   * @requiredField automation
   * @permissionId AUTOMATIONS.AUTOMATION_VALIDATE
   * @adminMethod
   */
  function validateAutomation(automation: Automation): Promise<ValidateAutomationResponse>;
  /** @param automationId - Automation ID
   * @public
   * @documentationMaturity preview
   * @requiredField automationId
   * @permissionId AUTOMATIONS.AUTOMATION_READ
   * @adminMethod
   */
  function getAutomationActivationStats(automationId: string, options?: GetAutomationActivationStatsOptions): Promise<GetAutomationActivationReportsResponse>;
  interface GetAutomationActivationStatsOptions {
      paging?: Paging;
      /** Fields projection - pass in the field key you want to get back */
      fields?: string[];
  }
  /**
   * Get the automation payload schema for a specific action
   * @internal
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.actionId
   * @requiredField identifiers.esbConfigurationId
   * @permissionId AUTOMATIONS.AUTOMATION_READ
   * @adminMethod
   */
  function getAutomationActionSchema(identifiers: GetAutomationActionSchemaIdentifiers): Promise<GetAutomationActionSchemaResponse>;
  interface GetAutomationActionSchemaIdentifiers {
      /** Automation's Configuration ID */
      esbConfigurationId: string;
      /** Specific action ID */
      actionId: string;
  }
  /**
   * Get actions quota information
   * @public
   * @documentationMaturity preview
   * @permissionId AUTOMATIONS.AUTOMATION_READ
   * @adminMethod
   */
  function getActionsQuotaInfo(): Promise<GetActionsQuotaInfoResponse>;
  /**
   * Bulk delete automations
   * @internal
   * @documentationMaturity preview
   * @permissionId AUTOMATIONS.AUTOMATION_DELETE
   * @adminMethod
   */
  function bulkDeleteAutomations(options?: BulkDeleteAutomationsOptions): Promise<void>;
  interface BulkDeleteAutomationsOptions {
      /** Automation IDs to delete */
      automationIds?: string[];
  }
  /**
   * Generate action input mapping from a template
   * @param appId - action app id
   * @public
   * @documentationMaturity preview
   * @requiredField appId
   * @requiredField options
   * @requiredField options.actionInputMappingTemplate
   * @requiredField options.actionKey
   * @permissionId AUTOMATIONS.AUTOMATION_READ
   * @adminMethod
   */
  function generateActionInputMappingFromTemplate(appId: string, options: GenerateActionInputMappingFromTemplateOptions): Promise<GenerateActionInputMappingFromTemplateResponse>;
  interface GenerateActionInputMappingFromTemplateOptions {
      /** the action key */
      actionKey: string;
      /** action input mapping template the action spi provider will generate input mapping from */
      actionInputMappingTemplate: Record<string, any> | null;
  }
  
  type automationsV1Automation_universal_d_Automation = Automation;
  type automationsV1Automation_universal_d_Type = Type;
  const automationsV1Automation_universal_d_Type: typeof Type;
  type automationsV1Automation_universal_d_Status = Status;
  const automationsV1Automation_universal_d_Status: typeof Status;
  type automationsV1Automation_universal_d_Rule = Rule;
  type automationsV1Automation_universal_d_Trigger = Trigger;
  type automationsV1Automation_universal_d_Filter = Filter;
  type automationsV1Automation_universal_d_Debounce = Debounce;
  type automationsV1Automation_universal_d_Action = Action;
  type automationsV1Automation_universal_d_BlockType = BlockType;
  const automationsV1Automation_universal_d_BlockType: typeof BlockType;
  type automationsV1Automation_universal_d_ConditionBlock = ConditionBlock;
  type automationsV1Automation_universal_d_Offset = Offset;
  type automationsV1Automation_universal_d_OffsetValueOneOf = OffsetValueOneOf;
  type automationsV1Automation_universal_d_Until = Until;
  type automationsV1Automation_universal_d_Delay = Delay;
  type automationsV1Automation_universal_d_DelayTypeOneOf = DelayTypeOneOf;
  type automationsV1Automation_universal_d_RateLimit = RateLimit;
  type automationsV1Automation_universal_d_Condition = Condition;
  type automationsV1Automation_universal_d_Conditions = Conditions;
  type automationsV1Automation_universal_d_Source = Source;
  type automationsV1Automation_universal_d_AutomationMetadata = AutomationMetadata;
  type automationsV1Automation_universal_d_Domain = Domain;
  const automationsV1Automation_universal_d_Domain: typeof Domain;
  type automationsV1Automation_universal_d_ExtendedFields = ExtendedFields;
  type automationsV1Automation_universal_d_GetApplicationAutomationRequest = GetApplicationAutomationRequest;
  type automationsV1Automation_universal_d_GetApplicationAutomationResponse = GetApplicationAutomationResponse;
  type automationsV1Automation_universal_d_QueryApplicationAutomationsRequest = QueryApplicationAutomationsRequest;
  type automationsV1Automation_universal_d_QueryV2 = QueryV2;
  type automationsV1Automation_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
  type automationsV1Automation_universal_d_Sorting = Sorting;
  type automationsV1Automation_universal_d_SortOrder = SortOrder;
  const automationsV1Automation_universal_d_SortOrder: typeof SortOrder;
  type automationsV1Automation_universal_d_Paging = Paging;
  type automationsV1Automation_universal_d_CursorPaging = CursorPaging;
  type automationsV1Automation_universal_d_QueryApplicationAutomationsResponse = QueryApplicationAutomationsResponse;
  type automationsV1Automation_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type automationsV1Automation_universal_d_Cursors = Cursors;
  type automationsV1Automation_universal_d_UpdateApplicationAutomationConfigurationIdRequest = UpdateApplicationAutomationConfigurationIdRequest;
  type automationsV1Automation_universal_d_UpdateApplicationAutomationConfigurationIdResponse = UpdateApplicationAutomationConfigurationIdResponse;
  type automationsV1Automation_universal_d_UpdateApplicationAutomationToMigratedFromV1Request = UpdateApplicationAutomationToMigratedFromV1Request;
  type automationsV1Automation_universal_d_UpdateApplicationAutomationToMigratedFromV1Response = UpdateApplicationAutomationToMigratedFromV1Response;
  type automationsV1Automation_universal_d_DomainEvent = DomainEvent;
  type automationsV1Automation_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type automationsV1Automation_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type automationsV1Automation_universal_d_RestoreInfo = RestoreInfo;
  type automationsV1Automation_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type automationsV1Automation_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type automationsV1Automation_universal_d_ActionEvent = ActionEvent;
  type automationsV1Automation_universal_d_Empty = Empty;
  type automationsV1Automation_universal_d_MetaSiteSpecialEvent = MetaSiteSpecialEvent;
  type automationsV1Automation_universal_d_MetaSiteSpecialEventPayloadOneOf = MetaSiteSpecialEventPayloadOneOf;
  type automationsV1Automation_universal_d_Asset = Asset;
  type automationsV1Automation_universal_d_State = State;
  const automationsV1Automation_universal_d_State: typeof State;
  type automationsV1Automation_universal_d_SiteCreated = SiteCreated;
  type automationsV1Automation_universal_d_SiteCreatedContext = SiteCreatedContext;
  const automationsV1Automation_universal_d_SiteCreatedContext: typeof SiteCreatedContext;
  type automationsV1Automation_universal_d_Namespace = Namespace;
  const automationsV1Automation_universal_d_Namespace: typeof Namespace;
  type automationsV1Automation_universal_d_SiteTransferred = SiteTransferred;
  type automationsV1Automation_universal_d_SiteDeleted = SiteDeleted;
  type automationsV1Automation_universal_d_DeleteContext = DeleteContext;
  type automationsV1Automation_universal_d_DeleteStatus = DeleteStatus;
  const automationsV1Automation_universal_d_DeleteStatus: typeof DeleteStatus;
  type automationsV1Automation_universal_d_SiteUndeleted = SiteUndeleted;
  type automationsV1Automation_universal_d_SitePublished = SitePublished;
  type automationsV1Automation_universal_d_SiteUnpublished = SiteUnpublished;
  type automationsV1Automation_universal_d_SiteMarkedAsTemplate = SiteMarkedAsTemplate;
  type automationsV1Automation_universal_d_SiteMarkedAsWixSite = SiteMarkedAsWixSite;
  type automationsV1Automation_universal_d_ServiceProvisioned = ServiceProvisioned;
  type automationsV1Automation_universal_d_ServiceRemoved = ServiceRemoved;
  type automationsV1Automation_universal_d_SiteRenamed = SiteRenamed;
  type automationsV1Automation_universal_d_SiteHardDeleted = SiteHardDeleted;
  type automationsV1Automation_universal_d_NamespaceChanged = NamespaceChanged;
  type automationsV1Automation_universal_d_StudioAssigned = StudioAssigned;
  type automationsV1Automation_universal_d_StudioUnassigned = StudioUnassigned;
  type automationsV1Automation_universal_d_SyncApplicationAutomationsRequest = SyncApplicationAutomationsRequest;
  type automationsV1Automation_universal_d_SyncApplicationAutomationsResponse = SyncApplicationAutomationsResponse;
  type automationsV1Automation_universal_d_BulkCreateApplicationAutomationRequest = BulkCreateApplicationAutomationRequest;
  type automationsV1Automation_universal_d_BulkCreateApplicationAutomationResponse = BulkCreateApplicationAutomationResponse;
  type automationsV1Automation_universal_d_BulkActionMetadata = BulkActionMetadata;
  type automationsV1Automation_universal_d_MessageEnvelope = MessageEnvelope;
  type automationsV1Automation_universal_d_IdentificationData = IdentificationData;
  type automationsV1Automation_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type automationsV1Automation_universal_d_WebhookIdentityType = WebhookIdentityType;
  const automationsV1Automation_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  type automationsV1Automation_universal_d_CreateAutomationRequest = CreateAutomationRequest;
  type automationsV1Automation_universal_d_CreateAutomationResponse = CreateAutomationResponse;
  type automationsV1Automation_universal_d_MigrationBulkCreateAutomationsRequest = MigrationBulkCreateAutomationsRequest;
  type automationsV1Automation_universal_d_MigrationBulkCreateAutomationsResponse = MigrationBulkCreateAutomationsResponse;
  type automationsV1Automation_universal_d_ItemMetadata = ItemMetadata;
  type automationsV1Automation_universal_d_ApplicationError = ApplicationError;
  type automationsV1Automation_universal_d_MigrationBulkCreateAutomations = MigrationBulkCreateAutomations;
  type automationsV1Automation_universal_d_GetAutomationRequest = GetAutomationRequest;
  type automationsV1Automation_universal_d_GetAutomationResponse = GetAutomationResponse;
  type automationsV1Automation_universal_d_UpdateAutomationRequest = UpdateAutomationRequest;
  type automationsV1Automation_universal_d_UpdateAutomationResponse = UpdateAutomationResponse;
  type automationsV1Automation_universal_d_UpdatedWithPreviousEntity = UpdatedWithPreviousEntity;
  type automationsV1Automation_universal_d_MigrationUpdateAutomationRequest = MigrationUpdateAutomationRequest;
  type automationsV1Automation_universal_d_MigrationUpdateAutomationResponse = MigrationUpdateAutomationResponse;
  type automationsV1Automation_universal_d_DeleteAutomationRequest = DeleteAutomationRequest;
  type automationsV1Automation_universal_d_DeleteAutomationResponse = DeleteAutomationResponse;
  type automationsV1Automation_universal_d_DeletedWithEntity = DeletedWithEntity;
  type automationsV1Automation_universal_d_QueryAutomationsRequest = QueryAutomationsRequest;
  type automationsV1Automation_universal_d_QueryAutomationsResponse = QueryAutomationsResponse;
  type automationsV1Automation_universal_d_OverrideApplicationAutomationRequest = OverrideApplicationAutomationRequest;
  type automationsV1Automation_universal_d_OverrideApplicationAutomationResponse = OverrideApplicationAutomationResponse;
  type automationsV1Automation_universal_d_GenerateApplicationAutomationFromCustomRequest = GenerateApplicationAutomationFromCustomRequest;
  type automationsV1Automation_universal_d_GenerateApplicationAutomationFromCustomResponse = GenerateApplicationAutomationFromCustomResponse;
  type automationsV1Automation_universal_d_ValidateAutomationByIdRequest = ValidateAutomationByIdRequest;
  type automationsV1Automation_universal_d_ValidateAutomationByIdResponse = ValidateAutomationByIdResponse;
  type automationsV1Automation_universal_d_TriggerValidationError = TriggerValidationError;
  type automationsV1Automation_universal_d_TriggerValidationErrorErrorOneOf = TriggerValidationErrorErrorOneOf;
  type automationsV1Automation_universal_d_TriggerValidationErrorValidationErrorType = TriggerValidationErrorValidationErrorType;
  const automationsV1Automation_universal_d_TriggerValidationErrorValidationErrorType: typeof TriggerValidationErrorValidationErrorType;
  type automationsV1Automation_universal_d_TriggerConfigurationError = TriggerConfigurationError;
  type automationsV1Automation_universal_d_TriggerErrorType = TriggerErrorType;
  const automationsV1Automation_universal_d_TriggerErrorType: typeof TriggerErrorType;
  type automationsV1Automation_universal_d_ProviderConfigurationError = ProviderConfigurationError;
  type automationsV1Automation_universal_d_ActionValidationInfo = ActionValidationInfo;
  type automationsV1Automation_universal_d_ActionValidationError = ActionValidationError;
  type automationsV1Automation_universal_d_ActionValidationErrorErrorOneOf = ActionValidationErrorErrorOneOf;
  type automationsV1Automation_universal_d_ValidationErrorType = ValidationErrorType;
  const automationsV1Automation_universal_d_ValidationErrorType: typeof ValidationErrorType;
  type automationsV1Automation_universal_d_ActionConfigurationError = ActionConfigurationError;
  type automationsV1Automation_universal_d_ActionErrorType = ActionErrorType;
  const automationsV1Automation_universal_d_ActionErrorType: typeof ActionErrorType;
  type automationsV1Automation_universal_d_ValidateAutomationRequest = ValidateAutomationRequest;
  type automationsV1Automation_universal_d_ValidateAutomationResponse = ValidateAutomationResponse;
  type automationsV1Automation_universal_d_UpdatedAutomationsWithEsb = UpdatedAutomationsWithEsb;
  type automationsV1Automation_universal_d_GetAutomationActivationReportsRequest = GetAutomationActivationReportsRequest;
  type automationsV1Automation_universal_d_GetAutomationActivationReportsResponse = GetAutomationActivationReportsResponse;
  type automationsV1Automation_universal_d_ActivationReport = ActivationReport;
  type automationsV1Automation_universal_d_ActivationStatus = ActivationStatus;
  const automationsV1Automation_universal_d_ActivationStatus: typeof ActivationStatus;
  type automationsV1Automation_universal_d_PagingMetadata = PagingMetadata;
  type automationsV1Automation_universal_d_GetAutomationActionSchemaRequest = GetAutomationActionSchemaRequest;
  type automationsV1Automation_universal_d_GetAutomationActionSchemaResponse = GetAutomationActionSchemaResponse;
  type automationsV1Automation_universal_d_GetActionsQuotaInfoRequest = GetActionsQuotaInfoRequest;
  type automationsV1Automation_universal_d_GetActionsQuotaInfoResponse = GetActionsQuotaInfoResponse;
  type automationsV1Automation_universal_d_ActionProviderQuotaInfo = ActionProviderQuotaInfo;
  type automationsV1Automation_universal_d_ActionQuotaInfo = ActionQuotaInfo;
  type automationsV1Automation_universal_d_QuotaInfo = QuotaInfo;
  type automationsV1Automation_universal_d_Plan = Plan;
  type automationsV1Automation_universal_d_Quota = Quota;
  type automationsV1Automation_universal_d_CTA = CTA;
  type automationsV1Automation_universal_d_AdditionalInfo = AdditionalInfo;
  type automationsV1Automation_universal_d_UpgradeCTA = UpgradeCTA;
  type automationsV1Automation_universal_d_BulkDeleteAutomationsRequest = BulkDeleteAutomationsRequest;
  type automationsV1Automation_universal_d_BulkDeleteAutomationsResponse = BulkDeleteAutomationsResponse;
  type automationsV1Automation_universal_d_GenerateActionInputMappingFromTemplateRequest = GenerateActionInputMappingFromTemplateRequest;
  type automationsV1Automation_universal_d_GenerateActionInputMappingFromTemplateResponse = GenerateActionInputMappingFromTemplateResponse;
  type automationsV1Automation_universal_d_MigrationUpdateMigratedToV3AutomationRequest = MigrationUpdateMigratedToV3AutomationRequest;
  type automationsV1Automation_universal_d_MigrationUpdateMigratedToV3AutomationResponse = MigrationUpdateMigratedToV3AutomationResponse;
  const automationsV1Automation_universal_d_bulkCreateApplicationAutomation: typeof bulkCreateApplicationAutomation;
  const automationsV1Automation_universal_d_createAutomation: typeof createAutomation;
  const automationsV1Automation_universal_d_migrationBulkCreateAutomations: typeof migrationBulkCreateAutomations;
  type automationsV1Automation_universal_d_MigrationBulkCreateAutomationsOptions = MigrationBulkCreateAutomationsOptions;
  const automationsV1Automation_universal_d_getAutomation: typeof getAutomation;
  type automationsV1Automation_universal_d_GetAutomationOptions = GetAutomationOptions;
  const automationsV1Automation_universal_d_updateAutomation: typeof updateAutomation;
  type automationsV1Automation_universal_d_UpdateAutomation = UpdateAutomation;
  type automationsV1Automation_universal_d_UpdateAutomationOptions = UpdateAutomationOptions;
  const automationsV1Automation_universal_d_migrationUpdateAutomation: typeof migrationUpdateAutomation;
  type automationsV1Automation_universal_d_MigrationUpdateAutomation = MigrationUpdateAutomation;
  const automationsV1Automation_universal_d_deleteAutomation: typeof deleteAutomation;
  type automationsV1Automation_universal_d_DeleteAutomationOptions = DeleteAutomationOptions;
  const automationsV1Automation_universal_d_queryAutomations: typeof queryAutomations;
  type automationsV1Automation_universal_d_QueryAutomationsOptions = QueryAutomationsOptions;
  type automationsV1Automation_universal_d_AutomationsQueryResult = AutomationsQueryResult;
  type automationsV1Automation_universal_d_AutomationsQueryBuilder = AutomationsQueryBuilder;
  const automationsV1Automation_universal_d_overrideApplicationAutomation: typeof overrideApplicationAutomation;
  const automationsV1Automation_universal_d_generateApplicationAutomationFromCustom: typeof generateApplicationAutomationFromCustom;
  const automationsV1Automation_universal_d_validateAutomationById: typeof validateAutomationById;
  type automationsV1Automation_universal_d_ValidateAutomationByIdOptions = ValidateAutomationByIdOptions;
  const automationsV1Automation_universal_d_validateAutomation: typeof validateAutomation;
  const automationsV1Automation_universal_d_getAutomationActivationStats: typeof getAutomationActivationStats;
  type automationsV1Automation_universal_d_GetAutomationActivationStatsOptions = GetAutomationActivationStatsOptions;
  const automationsV1Automation_universal_d_getAutomationActionSchema: typeof getAutomationActionSchema;
  type automationsV1Automation_universal_d_GetAutomationActionSchemaIdentifiers = GetAutomationActionSchemaIdentifiers;
  const automationsV1Automation_universal_d_getActionsQuotaInfo: typeof getActionsQuotaInfo;
  const automationsV1Automation_universal_d_bulkDeleteAutomations: typeof bulkDeleteAutomations;
  type automationsV1Automation_universal_d_BulkDeleteAutomationsOptions = BulkDeleteAutomationsOptions;
  const automationsV1Automation_universal_d_generateActionInputMappingFromTemplate: typeof generateActionInputMappingFromTemplate;
  type automationsV1Automation_universal_d_GenerateActionInputMappingFromTemplateOptions = GenerateActionInputMappingFromTemplateOptions;
  namespace automationsV1Automation_universal_d {
    export {
      automationsV1Automation_universal_d_Automation as Automation,
      automationsV1Automation_universal_d_Type as Type,
      automationsV1Automation_universal_d_Status as Status,
      automationsV1Automation_universal_d_Rule as Rule,
      automationsV1Automation_universal_d_Trigger as Trigger,
      automationsV1Automation_universal_d_Filter as Filter,
      automationsV1Automation_universal_d_Debounce as Debounce,
      automationsV1Automation_universal_d_Action as Action,
      automationsV1Automation_universal_d_BlockType as BlockType,
      automationsV1Automation_universal_d_ConditionBlock as ConditionBlock,
      automationsV1Automation_universal_d_Offset as Offset,
      automationsV1Automation_universal_d_OffsetValueOneOf as OffsetValueOneOf,
      automationsV1Automation_universal_d_Until as Until,
      automationsV1Automation_universal_d_Delay as Delay,
      automationsV1Automation_universal_d_DelayTypeOneOf as DelayTypeOneOf,
      automationsV1Automation_universal_d_RateLimit as RateLimit,
      automationsV1Automation_universal_d_Condition as Condition,
      automationsV1Automation_universal_d_Conditions as Conditions,
      automationsV1Automation_universal_d_Source as Source,
      automationsV1Automation_universal_d_AutomationMetadata as AutomationMetadata,
      automationsV1Automation_universal_d_Domain as Domain,
      automationsV1Automation_universal_d_ExtendedFields as ExtendedFields,
      automationsV1Automation_universal_d_GetApplicationAutomationRequest as GetApplicationAutomationRequest,
      automationsV1Automation_universal_d_GetApplicationAutomationResponse as GetApplicationAutomationResponse,
      automationsV1Automation_universal_d_QueryApplicationAutomationsRequest as QueryApplicationAutomationsRequest,
      automationsV1Automation_universal_d_QueryV2 as QueryV2,
      automationsV1Automation_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf,
      automationsV1Automation_universal_d_Sorting as Sorting,
      automationsV1Automation_universal_d_SortOrder as SortOrder,
      automationsV1Automation_universal_d_Paging as Paging,
      automationsV1Automation_universal_d_CursorPaging as CursorPaging,
      automationsV1Automation_universal_d_QueryApplicationAutomationsResponse as QueryApplicationAutomationsResponse,
      automationsV1Automation_universal_d_PagingMetadataV2 as PagingMetadataV2,
      automationsV1Automation_universal_d_Cursors as Cursors,
      automationsV1Automation_universal_d_UpdateApplicationAutomationConfigurationIdRequest as UpdateApplicationAutomationConfigurationIdRequest,
      automationsV1Automation_universal_d_UpdateApplicationAutomationConfigurationIdResponse as UpdateApplicationAutomationConfigurationIdResponse,
      automationsV1Automation_universal_d_UpdateApplicationAutomationToMigratedFromV1Request as UpdateApplicationAutomationToMigratedFromV1Request,
      automationsV1Automation_universal_d_UpdateApplicationAutomationToMigratedFromV1Response as UpdateApplicationAutomationToMigratedFromV1Response,
      automationsV1Automation_universal_d_DomainEvent as DomainEvent,
      automationsV1Automation_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      automationsV1Automation_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      automationsV1Automation_universal_d_RestoreInfo as RestoreInfo,
      automationsV1Automation_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      automationsV1Automation_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      automationsV1Automation_universal_d_ActionEvent as ActionEvent,
      automationsV1Automation_universal_d_Empty as Empty,
      automationsV1Automation_universal_d_MetaSiteSpecialEvent as MetaSiteSpecialEvent,
      automationsV1Automation_universal_d_MetaSiteSpecialEventPayloadOneOf as MetaSiteSpecialEventPayloadOneOf,
      automationsV1Automation_universal_d_Asset as Asset,
      automationsV1Automation_universal_d_State as State,
      automationsV1Automation_universal_d_SiteCreated as SiteCreated,
      automationsV1Automation_universal_d_SiteCreatedContext as SiteCreatedContext,
      automationsV1Automation_universal_d_Namespace as Namespace,
      automationsV1Automation_universal_d_SiteTransferred as SiteTransferred,
      automationsV1Automation_universal_d_SiteDeleted as SiteDeleted,
      automationsV1Automation_universal_d_DeleteContext as DeleteContext,
      automationsV1Automation_universal_d_DeleteStatus as DeleteStatus,
      automationsV1Automation_universal_d_SiteUndeleted as SiteUndeleted,
      automationsV1Automation_universal_d_SitePublished as SitePublished,
      automationsV1Automation_universal_d_SiteUnpublished as SiteUnpublished,
      automationsV1Automation_universal_d_SiteMarkedAsTemplate as SiteMarkedAsTemplate,
      automationsV1Automation_universal_d_SiteMarkedAsWixSite as SiteMarkedAsWixSite,
      automationsV1Automation_universal_d_ServiceProvisioned as ServiceProvisioned,
      automationsV1Automation_universal_d_ServiceRemoved as ServiceRemoved,
      automationsV1Automation_universal_d_SiteRenamed as SiteRenamed,
      automationsV1Automation_universal_d_SiteHardDeleted as SiteHardDeleted,
      automationsV1Automation_universal_d_NamespaceChanged as NamespaceChanged,
      automationsV1Automation_universal_d_StudioAssigned as StudioAssigned,
      automationsV1Automation_universal_d_StudioUnassigned as StudioUnassigned,
      automationsV1Automation_universal_d_SyncApplicationAutomationsRequest as SyncApplicationAutomationsRequest,
      automationsV1Automation_universal_d_SyncApplicationAutomationsResponse as SyncApplicationAutomationsResponse,
      automationsV1Automation_universal_d_BulkCreateApplicationAutomationRequest as BulkCreateApplicationAutomationRequest,
      automationsV1Automation_universal_d_BulkCreateApplicationAutomationResponse as BulkCreateApplicationAutomationResponse,
      automationsV1Automation_universal_d_BulkActionMetadata as BulkActionMetadata,
      automationsV1Automation_universal_d_MessageEnvelope as MessageEnvelope,
      automationsV1Automation_universal_d_IdentificationData as IdentificationData,
      automationsV1Automation_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      automationsV1Automation_universal_d_WebhookIdentityType as WebhookIdentityType,
      automationsV1Automation_universal_d_CreateAutomationRequest as CreateAutomationRequest,
      automationsV1Automation_universal_d_CreateAutomationResponse as CreateAutomationResponse,
      automationsV1Automation_universal_d_MigrationBulkCreateAutomationsRequest as MigrationBulkCreateAutomationsRequest,
      automationsV1Automation_universal_d_MigrationBulkCreateAutomationsResponse as MigrationBulkCreateAutomationsResponse,
      automationsV1Automation_universal_d_ItemMetadata as ItemMetadata,
      automationsV1Automation_universal_d_ApplicationError as ApplicationError,
      automationsV1Automation_universal_d_MigrationBulkCreateAutomations as MigrationBulkCreateAutomations,
      automationsV1Automation_universal_d_GetAutomationRequest as GetAutomationRequest,
      automationsV1Automation_universal_d_GetAutomationResponse as GetAutomationResponse,
      automationsV1Automation_universal_d_UpdateAutomationRequest as UpdateAutomationRequest,
      automationsV1Automation_universal_d_UpdateAutomationResponse as UpdateAutomationResponse,
      automationsV1Automation_universal_d_UpdatedWithPreviousEntity as UpdatedWithPreviousEntity,
      automationsV1Automation_universal_d_MigrationUpdateAutomationRequest as MigrationUpdateAutomationRequest,
      automationsV1Automation_universal_d_MigrationUpdateAutomationResponse as MigrationUpdateAutomationResponse,
      automationsV1Automation_universal_d_DeleteAutomationRequest as DeleteAutomationRequest,
      automationsV1Automation_universal_d_DeleteAutomationResponse as DeleteAutomationResponse,
      automationsV1Automation_universal_d_DeletedWithEntity as DeletedWithEntity,
      automationsV1Automation_universal_d_QueryAutomationsRequest as QueryAutomationsRequest,
      automationsV1Automation_universal_d_QueryAutomationsResponse as QueryAutomationsResponse,
      automationsV1Automation_universal_d_OverrideApplicationAutomationRequest as OverrideApplicationAutomationRequest,
      automationsV1Automation_universal_d_OverrideApplicationAutomationResponse as OverrideApplicationAutomationResponse,
      automationsV1Automation_universal_d_GenerateApplicationAutomationFromCustomRequest as GenerateApplicationAutomationFromCustomRequest,
      automationsV1Automation_universal_d_GenerateApplicationAutomationFromCustomResponse as GenerateApplicationAutomationFromCustomResponse,
      automationsV1Automation_universal_d_ValidateAutomationByIdRequest as ValidateAutomationByIdRequest,
      automationsV1Automation_universal_d_ValidateAutomationByIdResponse as ValidateAutomationByIdResponse,
      automationsV1Automation_universal_d_TriggerValidationError as TriggerValidationError,
      automationsV1Automation_universal_d_TriggerValidationErrorErrorOneOf as TriggerValidationErrorErrorOneOf,
      automationsV1Automation_universal_d_TriggerValidationErrorValidationErrorType as TriggerValidationErrorValidationErrorType,
      automationsV1Automation_universal_d_TriggerConfigurationError as TriggerConfigurationError,
      automationsV1Automation_universal_d_TriggerErrorType as TriggerErrorType,
      automationsV1Automation_universal_d_ProviderConfigurationError as ProviderConfigurationError,
      automationsV1Automation_universal_d_ActionValidationInfo as ActionValidationInfo,
      automationsV1Automation_universal_d_ActionValidationError as ActionValidationError,
      automationsV1Automation_universal_d_ActionValidationErrorErrorOneOf as ActionValidationErrorErrorOneOf,
      automationsV1Automation_universal_d_ValidationErrorType as ValidationErrorType,
      automationsV1Automation_universal_d_ActionConfigurationError as ActionConfigurationError,
      automationsV1Automation_universal_d_ActionErrorType as ActionErrorType,
      automationsV1Automation_universal_d_ValidateAutomationRequest as ValidateAutomationRequest,
      automationsV1Automation_universal_d_ValidateAutomationResponse as ValidateAutomationResponse,
      automationsV1Automation_universal_d_UpdatedAutomationsWithEsb as UpdatedAutomationsWithEsb,
      automationsV1Automation_universal_d_GetAutomationActivationReportsRequest as GetAutomationActivationReportsRequest,
      automationsV1Automation_universal_d_GetAutomationActivationReportsResponse as GetAutomationActivationReportsResponse,
      automationsV1Automation_universal_d_ActivationReport as ActivationReport,
      automationsV1Automation_universal_d_ActivationStatus as ActivationStatus,
      automationsV1Automation_universal_d_PagingMetadata as PagingMetadata,
      automationsV1Automation_universal_d_GetAutomationActionSchemaRequest as GetAutomationActionSchemaRequest,
      automationsV1Automation_universal_d_GetAutomationActionSchemaResponse as GetAutomationActionSchemaResponse,
      automationsV1Automation_universal_d_GetActionsQuotaInfoRequest as GetActionsQuotaInfoRequest,
      automationsV1Automation_universal_d_GetActionsQuotaInfoResponse as GetActionsQuotaInfoResponse,
      automationsV1Automation_universal_d_ActionProviderQuotaInfo as ActionProviderQuotaInfo,
      automationsV1Automation_universal_d_ActionQuotaInfo as ActionQuotaInfo,
      automationsV1Automation_universal_d_QuotaInfo as QuotaInfo,
      automationsV1Automation_universal_d_Plan as Plan,
      automationsV1Automation_universal_d_Quota as Quota,
      automationsV1Automation_universal_d_CTA as CTA,
      automationsV1Automation_universal_d_AdditionalInfo as AdditionalInfo,
      automationsV1Automation_universal_d_UpgradeCTA as UpgradeCTA,
      automationsV1Automation_universal_d_BulkDeleteAutomationsRequest as BulkDeleteAutomationsRequest,
      automationsV1Automation_universal_d_BulkDeleteAutomationsResponse as BulkDeleteAutomationsResponse,
      automationsV1Automation_universal_d_GenerateActionInputMappingFromTemplateRequest as GenerateActionInputMappingFromTemplateRequest,
      automationsV1Automation_universal_d_GenerateActionInputMappingFromTemplateResponse as GenerateActionInputMappingFromTemplateResponse,
      automationsV1Automation_universal_d_MigrationUpdateMigratedToV3AutomationRequest as MigrationUpdateMigratedToV3AutomationRequest,
      automationsV1Automation_universal_d_MigrationUpdateMigratedToV3AutomationResponse as MigrationUpdateMigratedToV3AutomationResponse,
      automationsV1Automation_universal_d_bulkCreateApplicationAutomation as bulkCreateApplicationAutomation,
      automationsV1Automation_universal_d_createAutomation as createAutomation,
      automationsV1Automation_universal_d_migrationBulkCreateAutomations as migrationBulkCreateAutomations,
      automationsV1Automation_universal_d_MigrationBulkCreateAutomationsOptions as MigrationBulkCreateAutomationsOptions,
      automationsV1Automation_universal_d_getAutomation as getAutomation,
      automationsV1Automation_universal_d_GetAutomationOptions as GetAutomationOptions,
      automationsV1Automation_universal_d_updateAutomation as updateAutomation,
      automationsV1Automation_universal_d_UpdateAutomation as UpdateAutomation,
      automationsV1Automation_universal_d_UpdateAutomationOptions as UpdateAutomationOptions,
      automationsV1Automation_universal_d_migrationUpdateAutomation as migrationUpdateAutomation,
      automationsV1Automation_universal_d_MigrationUpdateAutomation as MigrationUpdateAutomation,
      automationsV1Automation_universal_d_deleteAutomation as deleteAutomation,
      automationsV1Automation_universal_d_DeleteAutomationOptions as DeleteAutomationOptions,
      automationsV1Automation_universal_d_queryAutomations as queryAutomations,
      automationsV1Automation_universal_d_QueryAutomationsOptions as QueryAutomationsOptions,
      automationsV1Automation_universal_d_AutomationsQueryResult as AutomationsQueryResult,
      automationsV1Automation_universal_d_AutomationsQueryBuilder as AutomationsQueryBuilder,
      automationsV1Automation_universal_d_overrideApplicationAutomation as overrideApplicationAutomation,
      automationsV1Automation_universal_d_generateApplicationAutomationFromCustom as generateApplicationAutomationFromCustom,
      automationsV1Automation_universal_d_validateAutomationById as validateAutomationById,
      automationsV1Automation_universal_d_ValidateAutomationByIdOptions as ValidateAutomationByIdOptions,
      automationsV1Automation_universal_d_validateAutomation as validateAutomation,
      automationsV1Automation_universal_d_getAutomationActivationStats as getAutomationActivationStats,
      automationsV1Automation_universal_d_GetAutomationActivationStatsOptions as GetAutomationActivationStatsOptions,
      automationsV1Automation_universal_d_getAutomationActionSchema as getAutomationActionSchema,
      automationsV1Automation_universal_d_GetAutomationActionSchemaIdentifiers as GetAutomationActionSchemaIdentifiers,
      automationsV1Automation_universal_d_getActionsQuotaInfo as getActionsQuotaInfo,
      automationsV1Automation_universal_d_bulkDeleteAutomations as bulkDeleteAutomations,
      automationsV1Automation_universal_d_BulkDeleteAutomationsOptions as BulkDeleteAutomationsOptions,
      automationsV1Automation_universal_d_generateActionInputMappingFromTemplate as generateActionInputMappingFromTemplate,
      automationsV1Automation_universal_d_GenerateActionInputMappingFromTemplateOptions as GenerateActionInputMappingFromTemplateOptions,
    };
  }
  
  interface MainEntity {
      _id?: string;
  }
  interface TriggerAutomationRequest {
      /** hookId is the id of the hook to trigger */
      hookId?: string;
      /** payload is the payload to send to the hook */
      payload?: Record<string, any> | null;
  }
  interface TriggerAutomationResponse {
  }
  /**
   * TriggerAutomation triggers an automation with custom trigger by its hookId
   * @internal
   * @documentationMaturity preview
   * @permissionId AUTOMATIONS.TRIGGER_WEBHOOK
   * @adminMethod
   */
  function triggerAutomation(options?: TriggerAutomationOptions): Promise<void>;
  interface TriggerAutomationOptions {
      /** hookId is the id of the hook to trigger */
      hookId?: string;
      /** payload is the payload to send to the hook */
      payload?: Record<string, any> | null;
  }
  
  type automationsV1AutomationsCustomTrigger_universal_d_MainEntity = MainEntity;
  type automationsV1AutomationsCustomTrigger_universal_d_TriggerAutomationRequest = TriggerAutomationRequest;
  type automationsV1AutomationsCustomTrigger_universal_d_TriggerAutomationResponse = TriggerAutomationResponse;
  const automationsV1AutomationsCustomTrigger_universal_d_triggerAutomation: typeof triggerAutomation;
  type automationsV1AutomationsCustomTrigger_universal_d_TriggerAutomationOptions = TriggerAutomationOptions;
  namespace automationsV1AutomationsCustomTrigger_universal_d {
    export {
      automationsV1AutomationsCustomTrigger_universal_d_MainEntity as MainEntity,
      automationsV1AutomationsCustomTrigger_universal_d_TriggerAutomationRequest as TriggerAutomationRequest,
      automationsV1AutomationsCustomTrigger_universal_d_TriggerAutomationResponse as TriggerAutomationResponse,
      automationsV1AutomationsCustomTrigger_universal_d_triggerAutomation as triggerAutomation,
      automationsV1AutomationsCustomTrigger_universal_d_TriggerAutomationOptions as TriggerAutomationOptions,
    };
  }
  
  export { automationsV1AutomationsCustomTrigger_universal_d as automations, automationsV1Automation_universal_d as automationsService };
}
