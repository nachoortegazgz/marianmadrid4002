declare module "wix-custom-fields.v1" {
  interface CustomFieldApplication {
      /** Custom field ID. */
      customFieldId?: string | null;
      /**
       * Custom field key.
       * @readonly
       */
      customFieldKey?: string | null;
      /** Entities the custom field applies to. */
      applications?: ApplicationsWrapper;
      /** Entities the custom field is excluded from. */
      exclusions?: ExclusionsWrapper;
      /** Revision number. */
      revision?: string | null;
  }
  interface ApplicationsWrapper {
      /** List of up to 100 entities the custom field applies to. */
      items?: AppliesTo[];
  }
  interface AppliesTo {
      /** Type of application. */
      applicationType?: Type;
      /** Entity ID. */
      entityId?: string | null;
  }
  enum Type {
      UNKNOWN = "UNKNOWN",
      ROLE = "ROLE",
      BADGE = "BADGE",
      PRICING_PLAN = "PRICING_PLAN",
      MEMBER = "MEMBER"
  }
  interface ExclusionsWrapper {
      /** List of up to 100 entities the custom field is excluded from. */
      items?: Exclusion[];
  }
  interface Exclusion {
      /** Type of exclusion. */
      exclusionType?: ExclusionType;
      /** Entity ID. */
      entityId?: string | null;
  }
  enum ExclusionType {
      UNKNOWN = "UNKNOWN",
      ROLE = "ROLE",
      BADGE = "BADGE",
      PRICING_PLAN = "PRICING_PLAN",
      MEMBER = "MEMBER"
  }
  interface CreateCustomFieldApplicationRequest {
      /** Custom field application to create. */
      application: CustomFieldApplication;
  }
  interface CreateCustomFieldApplicationResponse {
      /** Newly created custom field application. */
      application?: CustomFieldApplication;
  }
  interface DeleteCustomFieldApplicationRequest {
      /** ID of the custom field which application should be deleted. */
      customFieldId: string | null;
  }
  interface DeleteCustomFieldApplicationResponse {
  }
  interface UpdateCustomFieldApplicationRequest {
      /** Custom field application to update. */
      application: CustomFieldApplication;
  }
  interface UpdateCustomFieldApplicationResponse {
      /** Updated custom field application. */
      application?: CustomFieldApplication;
  }
  interface GetCustomFieldApplicationRequest {
      /** ID of the custom field which application should be returned. */
      customFieldId: string | null;
  }
  interface GetCustomFieldApplicationResponse {
      /** Requested custom field application. */
      application?: CustomFieldApplication;
  }
  interface GetCustomFieldApplicationsRequest {
      /** List of IDs of the custom fields which applications should be returned. */
      customFieldIds: string[];
  }
  interface GetCustomFieldApplicationsResponse {
      /** List of requested custom field applications. */
      applications?: CustomFieldApplication[];
  }
  interface GetMembersCustomFieldApplicationsRequest {
      /** IDs of members whose custom field applications are requested. */
      memberIds: string[];
  }
  interface GetMembersCustomFieldApplicationsResponse {
      results?: MemberCustomFieldApplication[];
  }
  interface MemberCustomFieldApplication {
      memberId?: string | null;
      applications?: FieldApplication[];
  }
  interface FieldApplication {
      /**
       * Custom field key.
       * @readonly
       */
      customFieldKey?: string | null;
      /** Indicates if the custom field applies. */
      applies?: boolean;
      /** Custom field. */
      customField?: CustomField;
  }
  /** Custom field */
  interface CustomField {
      /**
       * Field ID.
       * @readonly
       */
      _id?: string | null;
      /** Human-readable name shown in the business manager and live site. */
      name?: string | null;
      /**
       * Field key.
       * @readonly
       */
      key?: string | null;
      /** Default privacy of custom field. */
      defaultPrivacy?: Privacy;
      /** Type of data the field holds. */
      fieldType?: FieldTypeType;
      /** Social field type. */
      socialType?: SocialTypeType;
      /**
       * Field origin.
       * @readonly
       */
      fieldOrigin?: Origin;
      /**
       * Describes whom the custom field applies to.
       * @readonly
       */
      appliesTo?: AppliesToAppliesTo;
      /**
       * The section the field belongs to.
       * @readonly
       */
      section?: Section;
      /**
       * Date and time when the field was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time when the field was updated.
       * @readonly
       */
      _updatedDate?: Date;
      /** Revision number, used for checking the optimistic lock condition. */
      revision?: string | null;
  }
  enum Privacy {
      UNKNOWN = "UNKNOWN",
      PUBLIC = "PUBLIC",
      PRIVATE = "PRIVATE"
  }
  enum FieldTypeType {
      UNKNOWN = "UNKNOWN",
      TEXT = "TEXT",
      NUMBER = "NUMBER",
      DATE = "DATE",
      URL = "URL",
      SOCIAL = "SOCIAL"
  }
  enum SocialTypeType {
      UNKNOWN = "UNKNOWN",
      FACEBOOK = "FACEBOOK",
      INSTAGRAM = "INSTAGRAM",
      LINKEDIN = "LINKEDIN",
      TWITTER = "TWITTER",
      YOUTUBE = "YOUTUBE",
      PINTEREST = "PINTEREST",
      TIKTOK = "TIKTOK",
      DEVIANTART = "DEVIANTART",
      SOUNDCLOUD = "SOUNDCLOUD",
      TUMBLR = "TUMBLR",
      VIMEO = "VIMEO",
      VKONTAKTE = "VKONTAKTE",
      ODNOKLASSNIKI = "ODNOKLASSNIKI",
      OTHER = "OTHER"
  }
  enum Origin {
      UNKNOWN = "UNKNOWN",
      CUSTOM = "CUSTOM",
      CONTACT = "CONTACT",
      SYSTEM = "SYSTEM"
  }
  enum AppliesToAppliesTo {
      ALL_MEMBERS = "ALL_MEMBERS",
      SELECTED_MEMBERS = "SELECTED_MEMBERS"
  }
  enum Section {
      GENERAL = "GENERAL",
      SOCIAL = "SOCIAL",
      DISPLAY_INFO = "DISPLAY_INFO",
      ADDRESS = "ADDRESS"
  }
  interface GetRolesCustomFieldApplicationsRequest {
      /** IDs of roles which custom field applications are requested. */
      roleIds: string[];
  }
  interface GetRolesCustomFieldApplicationsResponse {
      results?: RoleCustomFieldApplication[];
  }
  interface RoleCustomFieldApplication {
      roleId?: string | null;
      applications?: FieldApplication[];
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
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      undeleteInfo?: UndeleteInfo;
  }
  interface UndeleteInfo {
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
  /**
   * Creates custom field application which defines whom the custom field applies to.
   *
   * When the field applies to a specific group, the field will be held by the members of that group.
   * When the field applies to member ids, the field will be held by the specified members.
   * Site members that do not fall into the defined groups or member IDs, will not have the custom field.
   * @param application - Custom field application to create.
   * @internal
   * @documentationMaturity preview
   * @requiredField application
   * @requiredField application.applications.items.entityId
   * @requiredField application.customFieldId
   * @requiredField application.exclusions.items.entityId
   * @adminMethod
   * @returns Newly created custom field application.
   */
  function createCustomFieldApplication(application: CustomFieldApplication): Promise<CustomFieldApplication>;
  /**
   * Deletes custom field application.
   *
   * When deleted, the related custom field applies to all members.
   * @param customFieldId - ID of the custom field which application should be deleted.
   * @internal
   * @documentationMaturity preview
   * @requiredField customFieldId
   * @adminMethod
   */
  function deleteCustomFieldApplication(customFieldId: string | null): Promise<void>;
  /**
   * Updates custom field application.
   * Partial updates are not supported. Passing `applications` will overwrite existing ones.
   * @param customFieldId - Custom field ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField application
   * @requiredField application.applications.items.entityId
   * @requiredField application.exclusions.items.entityId
   * @requiredField application.revision
   * @requiredField customFieldId
   * @adminMethod
   * @returns Updated custom field application.
   */
  function updateCustomFieldApplication(customFieldId: string | null, application: UpdateCustomFieldApplication): Promise<CustomFieldApplication>;
  interface UpdateCustomFieldApplication {
      /**
       * Custom field key.
       * @readonly
       */
      customFieldKey?: string | null;
      /** Entities the custom field applies to. */
      applications?: ApplicationsWrapper;
      /** Entities the custom field is excluded from. */
      exclusions?: ExclusionsWrapper;
      /** Revision number. */
      revision?: string | null;
  }
  /**
   * Retrieves custom field application.
   * @param customFieldId - ID of the custom field which application should be returned.
   * @internal
   * @documentationMaturity preview
   * @requiredField customFieldId
   */
  function getCustomFieldApplication(customFieldId: string | null): Promise<GetCustomFieldApplicationResponse>;
  /**
   * Retrieves a list of custom field application.
   * @param customFieldIds - List of IDs of the custom fields which applications should be returned.
   * @internal
   * @documentationMaturity preview
   * @requiredField customFieldIds
   */
  function getCustomFieldApplications(customFieldIds: string[]): Promise<GetCustomFieldApplicationsResponse>;
  /**
   * Returns custom field applications which indicates if the custom fields apply to given members.
   * @param memberIds - IDs of members whose custom field applications are requested.
   * @internal
   * @documentationMaturity preview
   * @requiredField memberIds
   * @adminMethod
   */
  function getMembersCustomFieldApplications(memberIds: string[]): Promise<GetMembersCustomFieldApplicationsResponse>;
  /**
   * Returns custom field applications which indicates if the custom fields apply to given roles.
   * @param roleIds - IDs of roles which custom field applications are requested.
   * @internal
   * @documentationMaturity preview
   * @requiredField roleIds
   * @adminMethod
   */
  function getRolesCustomFieldApplications(roleIds: string[]): Promise<GetRolesCustomFieldApplicationsResponse>;
  
  type membersV1CustomFieldApplication_universal_d_CustomFieldApplication = CustomFieldApplication;
  type membersV1CustomFieldApplication_universal_d_ApplicationsWrapper = ApplicationsWrapper;
  type membersV1CustomFieldApplication_universal_d_AppliesTo = AppliesTo;
  type membersV1CustomFieldApplication_universal_d_Type = Type;
  const membersV1CustomFieldApplication_universal_d_Type: typeof Type;
  type membersV1CustomFieldApplication_universal_d_ExclusionsWrapper = ExclusionsWrapper;
  type membersV1CustomFieldApplication_universal_d_Exclusion = Exclusion;
  type membersV1CustomFieldApplication_universal_d_ExclusionType = ExclusionType;
  const membersV1CustomFieldApplication_universal_d_ExclusionType: typeof ExclusionType;
  type membersV1CustomFieldApplication_universal_d_CreateCustomFieldApplicationRequest = CreateCustomFieldApplicationRequest;
  type membersV1CustomFieldApplication_universal_d_CreateCustomFieldApplicationResponse = CreateCustomFieldApplicationResponse;
  type membersV1CustomFieldApplication_universal_d_DeleteCustomFieldApplicationRequest = DeleteCustomFieldApplicationRequest;
  type membersV1CustomFieldApplication_universal_d_DeleteCustomFieldApplicationResponse = DeleteCustomFieldApplicationResponse;
  type membersV1CustomFieldApplication_universal_d_UpdateCustomFieldApplicationRequest = UpdateCustomFieldApplicationRequest;
  type membersV1CustomFieldApplication_universal_d_UpdateCustomFieldApplicationResponse = UpdateCustomFieldApplicationResponse;
  type membersV1CustomFieldApplication_universal_d_GetCustomFieldApplicationRequest = GetCustomFieldApplicationRequest;
  type membersV1CustomFieldApplication_universal_d_GetCustomFieldApplicationResponse = GetCustomFieldApplicationResponse;
  type membersV1CustomFieldApplication_universal_d_GetCustomFieldApplicationsRequest = GetCustomFieldApplicationsRequest;
  type membersV1CustomFieldApplication_universal_d_GetCustomFieldApplicationsResponse = GetCustomFieldApplicationsResponse;
  type membersV1CustomFieldApplication_universal_d_GetMembersCustomFieldApplicationsRequest = GetMembersCustomFieldApplicationsRequest;
  type membersV1CustomFieldApplication_universal_d_GetMembersCustomFieldApplicationsResponse = GetMembersCustomFieldApplicationsResponse;
  type membersV1CustomFieldApplication_universal_d_MemberCustomFieldApplication = MemberCustomFieldApplication;
  type membersV1CustomFieldApplication_universal_d_FieldApplication = FieldApplication;
  type membersV1CustomFieldApplication_universal_d_CustomField = CustomField;
  type membersV1CustomFieldApplication_universal_d_Privacy = Privacy;
  const membersV1CustomFieldApplication_universal_d_Privacy: typeof Privacy;
  type membersV1CustomFieldApplication_universal_d_FieldTypeType = FieldTypeType;
  const membersV1CustomFieldApplication_universal_d_FieldTypeType: typeof FieldTypeType;
  type membersV1CustomFieldApplication_universal_d_SocialTypeType = SocialTypeType;
  const membersV1CustomFieldApplication_universal_d_SocialTypeType: typeof SocialTypeType;
  type membersV1CustomFieldApplication_universal_d_Origin = Origin;
  const membersV1CustomFieldApplication_universal_d_Origin: typeof Origin;
  type membersV1CustomFieldApplication_universal_d_AppliesToAppliesTo = AppliesToAppliesTo;
  const membersV1CustomFieldApplication_universal_d_AppliesToAppliesTo: typeof AppliesToAppliesTo;
  type membersV1CustomFieldApplication_universal_d_Section = Section;
  const membersV1CustomFieldApplication_universal_d_Section: typeof Section;
  type membersV1CustomFieldApplication_universal_d_GetRolesCustomFieldApplicationsRequest = GetRolesCustomFieldApplicationsRequest;
  type membersV1CustomFieldApplication_universal_d_GetRolesCustomFieldApplicationsResponse = GetRolesCustomFieldApplicationsResponse;
  type membersV1CustomFieldApplication_universal_d_RoleCustomFieldApplication = RoleCustomFieldApplication;
  type membersV1CustomFieldApplication_universal_d_DomainEvent = DomainEvent;
  type membersV1CustomFieldApplication_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type membersV1CustomFieldApplication_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type membersV1CustomFieldApplication_universal_d_UndeleteInfo = UndeleteInfo;
  type membersV1CustomFieldApplication_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type membersV1CustomFieldApplication_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type membersV1CustomFieldApplication_universal_d_ActionEvent = ActionEvent;
  type membersV1CustomFieldApplication_universal_d_Empty = Empty;
  type membersV1CustomFieldApplication_universal_d_MessageEnvelope = MessageEnvelope;
  type membersV1CustomFieldApplication_universal_d_IdentificationData = IdentificationData;
  type membersV1CustomFieldApplication_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type membersV1CustomFieldApplication_universal_d_WebhookIdentityType = WebhookIdentityType;
  const membersV1CustomFieldApplication_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const membersV1CustomFieldApplication_universal_d_createCustomFieldApplication: typeof createCustomFieldApplication;
  const membersV1CustomFieldApplication_universal_d_deleteCustomFieldApplication: typeof deleteCustomFieldApplication;
  const membersV1CustomFieldApplication_universal_d_updateCustomFieldApplication: typeof updateCustomFieldApplication;
  type membersV1CustomFieldApplication_universal_d_UpdateCustomFieldApplication = UpdateCustomFieldApplication;
  const membersV1CustomFieldApplication_universal_d_getCustomFieldApplication: typeof getCustomFieldApplication;
  const membersV1CustomFieldApplication_universal_d_getCustomFieldApplications: typeof getCustomFieldApplications;
  const membersV1CustomFieldApplication_universal_d_getMembersCustomFieldApplications: typeof getMembersCustomFieldApplications;
  const membersV1CustomFieldApplication_universal_d_getRolesCustomFieldApplications: typeof getRolesCustomFieldApplications;
  namespace membersV1CustomFieldApplication_universal_d {
    export {
      membersV1CustomFieldApplication_universal_d_CustomFieldApplication as CustomFieldApplication,
      membersV1CustomFieldApplication_universal_d_ApplicationsWrapper as ApplicationsWrapper,
      membersV1CustomFieldApplication_universal_d_AppliesTo as AppliesTo,
      membersV1CustomFieldApplication_universal_d_Type as Type,
      membersV1CustomFieldApplication_universal_d_ExclusionsWrapper as ExclusionsWrapper,
      membersV1CustomFieldApplication_universal_d_Exclusion as Exclusion,
      membersV1CustomFieldApplication_universal_d_ExclusionType as ExclusionType,
      membersV1CustomFieldApplication_universal_d_CreateCustomFieldApplicationRequest as CreateCustomFieldApplicationRequest,
      membersV1CustomFieldApplication_universal_d_CreateCustomFieldApplicationResponse as CreateCustomFieldApplicationResponse,
      membersV1CustomFieldApplication_universal_d_DeleteCustomFieldApplicationRequest as DeleteCustomFieldApplicationRequest,
      membersV1CustomFieldApplication_universal_d_DeleteCustomFieldApplicationResponse as DeleteCustomFieldApplicationResponse,
      membersV1CustomFieldApplication_universal_d_UpdateCustomFieldApplicationRequest as UpdateCustomFieldApplicationRequest,
      membersV1CustomFieldApplication_universal_d_UpdateCustomFieldApplicationResponse as UpdateCustomFieldApplicationResponse,
      membersV1CustomFieldApplication_universal_d_GetCustomFieldApplicationRequest as GetCustomFieldApplicationRequest,
      membersV1CustomFieldApplication_universal_d_GetCustomFieldApplicationResponse as GetCustomFieldApplicationResponse,
      membersV1CustomFieldApplication_universal_d_GetCustomFieldApplicationsRequest as GetCustomFieldApplicationsRequest,
      membersV1CustomFieldApplication_universal_d_GetCustomFieldApplicationsResponse as GetCustomFieldApplicationsResponse,
      membersV1CustomFieldApplication_universal_d_GetMembersCustomFieldApplicationsRequest as GetMembersCustomFieldApplicationsRequest,
      membersV1CustomFieldApplication_universal_d_GetMembersCustomFieldApplicationsResponse as GetMembersCustomFieldApplicationsResponse,
      membersV1CustomFieldApplication_universal_d_MemberCustomFieldApplication as MemberCustomFieldApplication,
      membersV1CustomFieldApplication_universal_d_FieldApplication as FieldApplication,
      membersV1CustomFieldApplication_universal_d_CustomField as CustomField,
      membersV1CustomFieldApplication_universal_d_Privacy as Privacy,
      membersV1CustomFieldApplication_universal_d_FieldTypeType as FieldTypeType,
      membersV1CustomFieldApplication_universal_d_SocialTypeType as SocialTypeType,
      membersV1CustomFieldApplication_universal_d_Origin as Origin,
      membersV1CustomFieldApplication_universal_d_AppliesToAppliesTo as AppliesToAppliesTo,
      membersV1CustomFieldApplication_universal_d_Section as Section,
      membersV1CustomFieldApplication_universal_d_GetRolesCustomFieldApplicationsRequest as GetRolesCustomFieldApplicationsRequest,
      membersV1CustomFieldApplication_universal_d_GetRolesCustomFieldApplicationsResponse as GetRolesCustomFieldApplicationsResponse,
      membersV1CustomFieldApplication_universal_d_RoleCustomFieldApplication as RoleCustomFieldApplication,
      membersV1CustomFieldApplication_universal_d_DomainEvent as DomainEvent,
      membersV1CustomFieldApplication_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      membersV1CustomFieldApplication_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      membersV1CustomFieldApplication_universal_d_UndeleteInfo as UndeleteInfo,
      membersV1CustomFieldApplication_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      membersV1CustomFieldApplication_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      membersV1CustomFieldApplication_universal_d_ActionEvent as ActionEvent,
      membersV1CustomFieldApplication_universal_d_Empty as Empty,
      membersV1CustomFieldApplication_universal_d_MessageEnvelope as MessageEnvelope,
      membersV1CustomFieldApplication_universal_d_IdentificationData as IdentificationData,
      membersV1CustomFieldApplication_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      membersV1CustomFieldApplication_universal_d_WebhookIdentityType as WebhookIdentityType,
      membersV1CustomFieldApplication_universal_d_createCustomFieldApplication as createCustomFieldApplication,
      membersV1CustomFieldApplication_universal_d_deleteCustomFieldApplication as deleteCustomFieldApplication,
      membersV1CustomFieldApplication_universal_d_updateCustomFieldApplication as updateCustomFieldApplication,
      membersV1CustomFieldApplication_universal_d_UpdateCustomFieldApplication as UpdateCustomFieldApplication,
      membersV1CustomFieldApplication_universal_d_getCustomFieldApplication as getCustomFieldApplication,
      membersV1CustomFieldApplication_universal_d_getCustomFieldApplications as getCustomFieldApplications,
      membersV1CustomFieldApplication_universal_d_getMembersCustomFieldApplications as getMembersCustomFieldApplications,
      membersV1CustomFieldApplication_universal_d_getRolesCustomFieldApplications as getRolesCustomFieldApplications,
    };
  }
  
  export { membersV1CustomFieldApplication_universal_d as customFields };
}
