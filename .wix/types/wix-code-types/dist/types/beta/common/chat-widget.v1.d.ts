declare module "chat-widget.v1" {
  interface Message {
      /**
       * Message ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Date and time the Message was created.
       * @readonly
       */
      _createdDate?: Date;
      /** Message sender */
      sender?: Sender;
      /** Message text */
      text?: string | null;
      /** Text that follows after payloads */
      suffixText?: string | null;
      /** Message payloads as struct */
      structPayloads?: Record<string, any>[] | null;
      /**
       * Conversation id
       * @readonly
       */
      conversationId?: string | null;
      /**
       * Message options
       * @readonly
       */
      options?: string[];
      /** Answer to message ID. */
      answerTo?: string | null;
      /**
       * Trigger id from ai assistant answer
       * @readonly
       */
      triggerId?: string | null;
      /** Type of message */
      messageType?: MessageType;
      /** Should site owner receive inbox notification */
      notifyInbox?: boolean;
      /**
       * Message ID.
       * @readonly
       */
      inboxMessageId?: string | null;
  }
  enum Sender {
      UNKNOWN = "UNKNOWN",
      UOU = "UOU",
      ASSISTANT = "ASSISTANT",
      USER = "USER",
      SYSTEM = "SYSTEM"
  }
  enum MessageType {
      UNKNOWN_MESSAGE_TYPE = "UNKNOWN_MESSAGE_TYPE",
      QUESTION = "QUESTION",
      ANSWER = "ANSWER",
      INTRO = "INTRO",
      LEGAL = "LEGAL",
      /** DEPRECATED */
      ESCALATION = "ESCALATION",
      CONTACT_FORM = "CONTACT_FORM",
      CONTACT_FORM_SUBMITTED = "CONTACT_FORM_SUBMITTED",
      SITE_OWNER_NOTIFICATION = "SITE_OWNER_NOTIFICATION"
  }
  interface CreateMessageRequest {
      /** Message to be created. */
      message: Message;
  }
  interface CreateMessageResponse {
      /** The created Message. */
      message?: Message;
  }
  interface BatchCreateMessageRequest {
      /** Messages to be created. */
      messages?: Message[];
  }
  interface BatchCreateMessageResponse {
      /** The created Messages. */
      messages?: Message[];
  }
  interface ListMessagesRequest {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
  }
  interface CursorPaging {
      /** Number of items to load. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * You can get the relevant cursor token
       * from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface ListMessagesResponse {
      /** List of Messages. */
      messages?: Message[];
      /** Paging metadata */
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
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface GetWidgetSettingsRequest {
  }
  interface GetWidgetSettingsResponse {
      /** Widget settings */
      widgetSettings?: WidgetSettings;
      /**
       * true if enabled and current time is within working hours
       * @readonly
       */
      assistantOnline?: boolean;
  }
  interface WidgetSettings {
      /** Is the widget enabled */
      enabled?: boolean;
      /** Working hours settings */
      workingHours?: WorkingHours;
      /** Intro message settings */
      introMessage?: IntroMessage;
      /** Contact form settings */
      contactForm?: ContactForm;
      /**
       * Created date
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Updated date
       * @readonly
       */
      _updatedDate?: Date;
      /** Offline strategy (deprecated) */
      offlineStrategy?: string;
      /** Offline strategy enum */
      strategy?: OfflineStrategy;
  }
  /** Working hours settings */
  interface WorkingHours {
      /** enabled 24/7 or by schedule */
      always?: boolean;
      /** schedule */
      schedule?: Schedule;
      /** timezone */
      timeZone?: string;
  }
  /** Schedule */
  interface Schedule {
      /** Monday schedule */
      monday?: DaySchedule;
      /** Tuesday schedule */
      tuesday?: DaySchedule;
      /** Wednesday schedule */
      wednesday?: DaySchedule;
      /** Thursday schedule */
      thursday?: DaySchedule;
      /** Friday schedule */
      friday?: DaySchedule;
      /** Saturday schedule */
      saturday?: DaySchedule;
      /** Sunday schedule */
      sunday?: DaySchedule;
  }
  /** Day schedule */
  interface DaySchedule {
      /** Is the day enabled */
      enabled?: boolean;
      /** Working hours frames */
      frames?: WorkingHoursFrame[];
  }
  /** Working hours frame */
  interface WorkingHoursFrame {
      /** Start time of the working hours frame */
      start?: number;
      /** End time of the working hours frame */
      end?: number;
  }
  /** Intro message */
  interface IntroMessage {
      /** Intro message settings */
      message?: SettingsMessage;
      /** Legal disclaimer settings */
      legalDisclaimer?: SettingsMessage;
  }
  interface SettingsMessage {
      /** Is the message enabled */
      enabled?: boolean;
      /** Message text */
      text?: string;
  }
  interface ContactForm {
      /** Contact form conditions */
      conditions?: Conditions;
      /** Contact form fields */
      fields?: Fields;
  }
  /** Contact form conditions */
  interface Conditions {
      /** No answer condition */
      noAnswer?: boolean;
      /** Escalation condition */
      escalation?: boolean;
  }
  /** Contact form fields */
  interface Fields {
      /** Name field */
      name?: boolean;
      /** Email field */
      email?: boolean;
      /** Phone field */
      phone?: boolean;
      /** Message field */
      message?: boolean;
  }
  enum OfflineStrategy {
      UNKNOWN_OFFLINE_STRATEGY = "UNKNOWN_OFFLINE_STRATEGY",
      HIDDEN = "HIDDEN",
      CONTACT = "CONTACT"
  }
  interface SetWidgetSettingsRequest {
      /** Widget settings */
      widgetSettings: WidgetSettings;
  }
  interface SetWidgetSettingsResponse {
  }
  interface GetConversationRequest {
  }
  interface GetConversationResponse {
      /** Conversation id */
      conversationId?: string;
      /** Is new conversation */
      newConversation?: boolean;
      /** Is contact */
      contact?: boolean;
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
      /** A list of "assets" (applications). The same as MetaSiteContext. */
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
      BRANDED_FIRST = "BRANDED_FIRST"
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
      dateDeleted?: Date;
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
  interface Empty {
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
   * Creates a Message.
   * @param message - Message to be created.
   * @public
   * @documentationMaturity preview
   * @requiredField message
   * @requiredField message.messageType
   * @requiredField message.sender
   * @returns The created Message.
   */
  function createMessage(message: Message): Promise<Message>;
  /**
   * Creates a batch Messages.
   * @public
   * @documentationMaturity preview
   * @requiredField options.messages.messageType
   * @requiredField options.messages.sender
   */
  function batchCreateMessage(options?: BatchCreateMessageOptions): Promise<BatchCreateMessageResponse>;
  interface BatchCreateMessageOptions {
      /** Messages to be created. */
      messages?: Message[];
  }
  /**
   * Retrieves a list of Messages, given the provided [cursor paging].
   *
   * Up to 100 Messages can be returned per request.
   * @public
   * @documentationMaturity preview
   */
  function listMessages(options?: ListMessagesOptions): Promise<ListMessagesResponse>;
  interface ListMessagesOptions {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
  }
  /**
   * Get settings for settings management
   * @public
   * @documentationMaturity preview
   */
  function getWidgetSettings(): Promise<GetWidgetSettingsResponse>;
  /**
   * Set settings for settings management
   * @param widgetSettings - Widget settings
   * @public
   * @documentationMaturity preview
   * @requiredField widgetSettings
   * @requiredField widgetSettings.contactForm
   * @requiredField widgetSettings.contactForm.conditions
   * @requiredField widgetSettings.contactForm.fields
   * @requiredField widgetSettings.introMessage
   * @requiredField widgetSettings.workingHours
   * @adminMethod
   */
  function setWidgetSettings(widgetSettings: WidgetSettings): Promise<void>;
  /**
   * Get or create conversation
   * @public
   * @documentationMaturity preview
   */
  function getConversation(): Promise<GetConversationResponse>;
  
  type innovationWidgetV1Message_universal_d_Message = Message;
  type innovationWidgetV1Message_universal_d_Sender = Sender;
  const innovationWidgetV1Message_universal_d_Sender: typeof Sender;
  type innovationWidgetV1Message_universal_d_MessageType = MessageType;
  const innovationWidgetV1Message_universal_d_MessageType: typeof MessageType;
  type innovationWidgetV1Message_universal_d_CreateMessageRequest = CreateMessageRequest;
  type innovationWidgetV1Message_universal_d_CreateMessageResponse = CreateMessageResponse;
  type innovationWidgetV1Message_universal_d_BatchCreateMessageRequest = BatchCreateMessageRequest;
  type innovationWidgetV1Message_universal_d_BatchCreateMessageResponse = BatchCreateMessageResponse;
  type innovationWidgetV1Message_universal_d_ListMessagesRequest = ListMessagesRequest;
  type innovationWidgetV1Message_universal_d_CursorPaging = CursorPaging;
  type innovationWidgetV1Message_universal_d_ListMessagesResponse = ListMessagesResponse;
  type innovationWidgetV1Message_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type innovationWidgetV1Message_universal_d_Cursors = Cursors;
  type innovationWidgetV1Message_universal_d_GetWidgetSettingsRequest = GetWidgetSettingsRequest;
  type innovationWidgetV1Message_universal_d_GetWidgetSettingsResponse = GetWidgetSettingsResponse;
  type innovationWidgetV1Message_universal_d_WidgetSettings = WidgetSettings;
  type innovationWidgetV1Message_universal_d_WorkingHours = WorkingHours;
  type innovationWidgetV1Message_universal_d_Schedule = Schedule;
  type innovationWidgetV1Message_universal_d_DaySchedule = DaySchedule;
  type innovationWidgetV1Message_universal_d_WorkingHoursFrame = WorkingHoursFrame;
  type innovationWidgetV1Message_universal_d_IntroMessage = IntroMessage;
  type innovationWidgetV1Message_universal_d_SettingsMessage = SettingsMessage;
  type innovationWidgetV1Message_universal_d_ContactForm = ContactForm;
  type innovationWidgetV1Message_universal_d_Conditions = Conditions;
  type innovationWidgetV1Message_universal_d_Fields = Fields;
  type innovationWidgetV1Message_universal_d_OfflineStrategy = OfflineStrategy;
  const innovationWidgetV1Message_universal_d_OfflineStrategy: typeof OfflineStrategy;
  type innovationWidgetV1Message_universal_d_SetWidgetSettingsRequest = SetWidgetSettingsRequest;
  type innovationWidgetV1Message_universal_d_SetWidgetSettingsResponse = SetWidgetSettingsResponse;
  type innovationWidgetV1Message_universal_d_GetConversationRequest = GetConversationRequest;
  type innovationWidgetV1Message_universal_d_GetConversationResponse = GetConversationResponse;
  type innovationWidgetV1Message_universal_d_MetaSiteSpecialEvent = MetaSiteSpecialEvent;
  type innovationWidgetV1Message_universal_d_MetaSiteSpecialEventPayloadOneOf = MetaSiteSpecialEventPayloadOneOf;
  type innovationWidgetV1Message_universal_d_Asset = Asset;
  type innovationWidgetV1Message_universal_d_State = State;
  const innovationWidgetV1Message_universal_d_State: typeof State;
  type innovationWidgetV1Message_universal_d_SiteCreated = SiteCreated;
  type innovationWidgetV1Message_universal_d_SiteCreatedContext = SiteCreatedContext;
  const innovationWidgetV1Message_universal_d_SiteCreatedContext: typeof SiteCreatedContext;
  type innovationWidgetV1Message_universal_d_Namespace = Namespace;
  const innovationWidgetV1Message_universal_d_Namespace: typeof Namespace;
  type innovationWidgetV1Message_universal_d_SiteTransferred = SiteTransferred;
  type innovationWidgetV1Message_universal_d_SiteDeleted = SiteDeleted;
  type innovationWidgetV1Message_universal_d_DeleteContext = DeleteContext;
  type innovationWidgetV1Message_universal_d_DeleteStatus = DeleteStatus;
  const innovationWidgetV1Message_universal_d_DeleteStatus: typeof DeleteStatus;
  type innovationWidgetV1Message_universal_d_SiteUndeleted = SiteUndeleted;
  type innovationWidgetV1Message_universal_d_SitePublished = SitePublished;
  type innovationWidgetV1Message_universal_d_SiteUnpublished = SiteUnpublished;
  type innovationWidgetV1Message_universal_d_SiteMarkedAsTemplate = SiteMarkedAsTemplate;
  type innovationWidgetV1Message_universal_d_SiteMarkedAsWixSite = SiteMarkedAsWixSite;
  type innovationWidgetV1Message_universal_d_ServiceProvisioned = ServiceProvisioned;
  type innovationWidgetV1Message_universal_d_ServiceRemoved = ServiceRemoved;
  type innovationWidgetV1Message_universal_d_SiteRenamed = SiteRenamed;
  type innovationWidgetV1Message_universal_d_SiteHardDeleted = SiteHardDeleted;
  type innovationWidgetV1Message_universal_d_NamespaceChanged = NamespaceChanged;
  type innovationWidgetV1Message_universal_d_StudioAssigned = StudioAssigned;
  type innovationWidgetV1Message_universal_d_StudioUnassigned = StudioUnassigned;
  type innovationWidgetV1Message_universal_d_Empty = Empty;
  type innovationWidgetV1Message_universal_d_DomainEvent = DomainEvent;
  type innovationWidgetV1Message_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type innovationWidgetV1Message_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type innovationWidgetV1Message_universal_d_RestoreInfo = RestoreInfo;
  type innovationWidgetV1Message_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type innovationWidgetV1Message_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type innovationWidgetV1Message_universal_d_ActionEvent = ActionEvent;
  type innovationWidgetV1Message_universal_d_MessageEnvelope = MessageEnvelope;
  type innovationWidgetV1Message_universal_d_IdentificationData = IdentificationData;
  type innovationWidgetV1Message_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type innovationWidgetV1Message_universal_d_WebhookIdentityType = WebhookIdentityType;
  const innovationWidgetV1Message_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const innovationWidgetV1Message_universal_d_createMessage: typeof createMessage;
  const innovationWidgetV1Message_universal_d_batchCreateMessage: typeof batchCreateMessage;
  type innovationWidgetV1Message_universal_d_BatchCreateMessageOptions = BatchCreateMessageOptions;
  const innovationWidgetV1Message_universal_d_listMessages: typeof listMessages;
  type innovationWidgetV1Message_universal_d_ListMessagesOptions = ListMessagesOptions;
  const innovationWidgetV1Message_universal_d_getWidgetSettings: typeof getWidgetSettings;
  const innovationWidgetV1Message_universal_d_setWidgetSettings: typeof setWidgetSettings;
  const innovationWidgetV1Message_universal_d_getConversation: typeof getConversation;
  namespace innovationWidgetV1Message_universal_d {
    export {
      innovationWidgetV1Message_universal_d_Message as Message,
      innovationWidgetV1Message_universal_d_Sender as Sender,
      innovationWidgetV1Message_universal_d_MessageType as MessageType,
      innovationWidgetV1Message_universal_d_CreateMessageRequest as CreateMessageRequest,
      innovationWidgetV1Message_universal_d_CreateMessageResponse as CreateMessageResponse,
      innovationWidgetV1Message_universal_d_BatchCreateMessageRequest as BatchCreateMessageRequest,
      innovationWidgetV1Message_universal_d_BatchCreateMessageResponse as BatchCreateMessageResponse,
      innovationWidgetV1Message_universal_d_ListMessagesRequest as ListMessagesRequest,
      innovationWidgetV1Message_universal_d_CursorPaging as CursorPaging,
      innovationWidgetV1Message_universal_d_ListMessagesResponse as ListMessagesResponse,
      innovationWidgetV1Message_universal_d_PagingMetadataV2 as PagingMetadataV2,
      innovationWidgetV1Message_universal_d_Cursors as Cursors,
      innovationWidgetV1Message_universal_d_GetWidgetSettingsRequest as GetWidgetSettingsRequest,
      innovationWidgetV1Message_universal_d_GetWidgetSettingsResponse as GetWidgetSettingsResponse,
      innovationWidgetV1Message_universal_d_WidgetSettings as WidgetSettings,
      innovationWidgetV1Message_universal_d_WorkingHours as WorkingHours,
      innovationWidgetV1Message_universal_d_Schedule as Schedule,
      innovationWidgetV1Message_universal_d_DaySchedule as DaySchedule,
      innovationWidgetV1Message_universal_d_WorkingHoursFrame as WorkingHoursFrame,
      innovationWidgetV1Message_universal_d_IntroMessage as IntroMessage,
      innovationWidgetV1Message_universal_d_SettingsMessage as SettingsMessage,
      innovationWidgetV1Message_universal_d_ContactForm as ContactForm,
      innovationWidgetV1Message_universal_d_Conditions as Conditions,
      innovationWidgetV1Message_universal_d_Fields as Fields,
      innovationWidgetV1Message_universal_d_OfflineStrategy as OfflineStrategy,
      innovationWidgetV1Message_universal_d_SetWidgetSettingsRequest as SetWidgetSettingsRequest,
      innovationWidgetV1Message_universal_d_SetWidgetSettingsResponse as SetWidgetSettingsResponse,
      innovationWidgetV1Message_universal_d_GetConversationRequest as GetConversationRequest,
      innovationWidgetV1Message_universal_d_GetConversationResponse as GetConversationResponse,
      innovationWidgetV1Message_universal_d_MetaSiteSpecialEvent as MetaSiteSpecialEvent,
      innovationWidgetV1Message_universal_d_MetaSiteSpecialEventPayloadOneOf as MetaSiteSpecialEventPayloadOneOf,
      innovationWidgetV1Message_universal_d_Asset as Asset,
      innovationWidgetV1Message_universal_d_State as State,
      innovationWidgetV1Message_universal_d_SiteCreated as SiteCreated,
      innovationWidgetV1Message_universal_d_SiteCreatedContext as SiteCreatedContext,
      innovationWidgetV1Message_universal_d_Namespace as Namespace,
      innovationWidgetV1Message_universal_d_SiteTransferred as SiteTransferred,
      innovationWidgetV1Message_universal_d_SiteDeleted as SiteDeleted,
      innovationWidgetV1Message_universal_d_DeleteContext as DeleteContext,
      innovationWidgetV1Message_universal_d_DeleteStatus as DeleteStatus,
      innovationWidgetV1Message_universal_d_SiteUndeleted as SiteUndeleted,
      innovationWidgetV1Message_universal_d_SitePublished as SitePublished,
      innovationWidgetV1Message_universal_d_SiteUnpublished as SiteUnpublished,
      innovationWidgetV1Message_universal_d_SiteMarkedAsTemplate as SiteMarkedAsTemplate,
      innovationWidgetV1Message_universal_d_SiteMarkedAsWixSite as SiteMarkedAsWixSite,
      innovationWidgetV1Message_universal_d_ServiceProvisioned as ServiceProvisioned,
      innovationWidgetV1Message_universal_d_ServiceRemoved as ServiceRemoved,
      innovationWidgetV1Message_universal_d_SiteRenamed as SiteRenamed,
      innovationWidgetV1Message_universal_d_SiteHardDeleted as SiteHardDeleted,
      innovationWidgetV1Message_universal_d_NamespaceChanged as NamespaceChanged,
      innovationWidgetV1Message_universal_d_StudioAssigned as StudioAssigned,
      innovationWidgetV1Message_universal_d_StudioUnassigned as StudioUnassigned,
      innovationWidgetV1Message_universal_d_Empty as Empty,
      innovationWidgetV1Message_universal_d_DomainEvent as DomainEvent,
      innovationWidgetV1Message_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      innovationWidgetV1Message_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      innovationWidgetV1Message_universal_d_RestoreInfo as RestoreInfo,
      innovationWidgetV1Message_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      innovationWidgetV1Message_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      innovationWidgetV1Message_universal_d_ActionEvent as ActionEvent,
      innovationWidgetV1Message_universal_d_MessageEnvelope as MessageEnvelope,
      innovationWidgetV1Message_universal_d_IdentificationData as IdentificationData,
      innovationWidgetV1Message_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      innovationWidgetV1Message_universal_d_WebhookIdentityType as WebhookIdentityType,
      innovationWidgetV1Message_universal_d_createMessage as createMessage,
      innovationWidgetV1Message_universal_d_batchCreateMessage as batchCreateMessage,
      innovationWidgetV1Message_universal_d_BatchCreateMessageOptions as BatchCreateMessageOptions,
      innovationWidgetV1Message_universal_d_listMessages as listMessages,
      innovationWidgetV1Message_universal_d_ListMessagesOptions as ListMessagesOptions,
      innovationWidgetV1Message_universal_d_getWidgetSettings as getWidgetSettings,
      innovationWidgetV1Message_universal_d_setWidgetSettings as setWidgetSettings,
      innovationWidgetV1Message_universal_d_getConversation as getConversation,
    };
  }
  
  export { innovationWidgetV1Message_universal_d as messages };
}
