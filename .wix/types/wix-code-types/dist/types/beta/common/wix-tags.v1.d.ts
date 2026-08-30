declare module "wix-tags.v1" {
  interface Tag {
      /**
       * Tag ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the tag is updated.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the tag was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the tag was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Tag name. */
      name?: string | null;
      /** FQDN of the entity that belongs to this tag. */
      fqdn?: string | null;
      /**
       * Tag exposure.
       * @internal
       */
      exposure?: TagExposure;
      /**
       * Indicates whether this tag is deleted.
       * @internal
       * @readonly
       */
      deleted?: boolean | null;
  }
  enum TagExposure {
      UNKNOWN = "UNKNOWN",
      PRIVATE = "PRIVATE",
      /** Not handled by client yet. */
      PUBLIC = "PUBLIC"
  }
  interface CreateTagRequest {
      /** The tag to be created. */
      tag: Tag;
  }
  interface CreateTagResponse {
      /** The created tag. */
      tag?: Tag;
  }
  interface GetTagRequest {
      /** The ID of the tag to retrieve. */
      tagId: string;
  }
  interface GetTagResponse {
      /** The requested tag. */
      tag?: Tag;
  }
  interface UpdateTagRequest {
      /** The tag to be updated, which may be partial. */
      tag: Tag;
  }
  interface UpdateTagResponse {
      /** The updated tag. */
      tag?: Tag;
  }
  interface DeleteTagRequest {
      /** ID of the tag to delete. */
      tagId: string;
  }
  interface DeleteTagResponse {
  }
  interface ListTagsRequest {
      /** The Fully Qualified Domain Name (FQDN) to which the tags are associated. Currently supports only eCommerce Orders: `wix.ecom.v1.order`. */
      fqdn: string;
      /**
       * The tag exposure.
       * @internal
       */
      exposure?: TagExposure;
  }
  interface ListTagsResponse {
      /** A list of tags. */
      tags?: Tag[];
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
  interface CreateTagForAccountRequest {
      /** The tag to be created. */
      tag: Tag;
  }
  interface CreateTagForAccountResponse {
      /** The created tag. */
      tag?: Tag;
  }
  interface GetTagForAccountRequest {
      /** The ID of the tag to retrieve. */
      tagId: string;
  }
  interface GetTagForAccountResponse {
      /** The requested tag. */
      tag?: Tag;
  }
  interface UpdateTagForAccountRequest {
      /** The tag to be updated, which may be partial. */
      tag: Tag;
  }
  interface UpdateTagForAccountResponse {
      /** The updated tag. */
      tag?: Tag;
  }
  interface DeleteTagForAccountRequest {
      /** ID of the tag to delete. */
      tagId: string;
  }
  interface DeleteTagForAccountResponse {
  }
  interface ListTagsForAccountRequest {
      /** The Fully Qualified Domain Name (FQDN) to which the tags are associated. Currently supports only eCommerce Orders: `wix.ecom.v1.order`. */
      fqdn: string;
      /**
       * The tag exposure.
       * @internal
       */
      exposure?: TagExposure;
  }
  interface ListTagsForAccountResponse {
      /** A list of tags. */
      tags?: Tag[];
  }
  /**
   * Creates a tag.
   * @param tag - The tag to be created.
   * @public
   * @documentationMaturity preview
   * @requiredField tag
   * @requiredField tag.fqdn
   * @requiredField tag.name
   * @permissionId TAGS.TAG_CREATE
   * @adminMethod
   * @returns The created tag.
   */
  function createTag(tag: Tag): Promise<Tag>;
  /**
   * Retrieves a tag.
   * @param tagId - The ID of the tag to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField tagId
   * @permissionId TAGS.TAG_READ
   * @adminMethod
   * @returns The requested tag.
   */
  function getTag(tagId: string): Promise<Tag>;
  /**
   * Updates a tag.
   * @param _id - Tag ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField tag
   * @requiredField tag.name
   * @requiredField tag.revision
   * @permissionId TAGS.TAG_UPDATE
   * @adminMethod
   * @returns The updated tag.
   */
  function updateTag(_id: string | null, tag: UpdateTag): Promise<Tag>;
  interface UpdateTag {
      /**
       * Tag ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the tag is updated.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the tag was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the tag was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Tag name. */
      name?: string | null;
      /** FQDN of the entity that belongs to this tag. */
      fqdn?: string | null;
      /**
       * Tag exposure.
       * @internal
       */
      exposure?: TagExposure;
      /**
       * Indicates whether this tag is deleted.
       * @internal
       * @readonly
       */
      deleted?: boolean | null;
  }
  /**
   * Deletes a tag.
   * @param tagId - ID of the tag to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField tagId
   * @permissionId TAGS.TAG_DELETE
   * @adminMethod
   */
  function deleteTag(tagId: string): Promise<void>;
  /**
   * Retrieves a list of tags.
   * @param fqdn - The Fully Qualified Domain Name (FQDN) to which the tags are associated. Currently supports only eCommerce Orders: `wix.ecom.v1.order`.
   * @public
   * @documentationMaturity preview
   * @requiredField fqdn
   * @permissionId TAGS.TAG_READ
   * @adminMethod
   */
  function listTags(fqdn: string, options?: ListTagsOptions): Promise<ListTagsResponse>;
  interface ListTagsOptions {
      /**
       * The tag exposure.
       * @internal
       */
      exposure?: TagExposure;
  }
  /**
   * Creates a tag.
   * @param tag - The tag to be created.
   * @internal
   * @documentationMaturity preview
   * @requiredField tag
   * @requiredField tag.fqdn
   * @requiredField tag.name
   * @permissionId TAGS.ACCOUNT_TAG_CREATE
   * @adminMethod
   */
  function createTagForAccount(tag: Tag): Promise<CreateTagForAccountResponse>;
  /**
   * Retrieves a tag.
   * @param tagId - The ID of the tag to retrieve.
   * @internal
   * @documentationMaturity preview
   * @requiredField tagId
   * @permissionId TAGS.ACCOUNT_TAG_READ
   * @adminMethod
   */
  function getTagForAccount(tagId: string): Promise<GetTagForAccountResponse>;
  /**
   * Updates a tag.
   * @param _id - Tag ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField tag
   * @requiredField tag.name
   * @requiredField tag.revision
   * @permissionId TAGS.ACCOUNT_TAG_UPDATE
   * @adminMethod
   */
  function updateTagForAccount(_id: string | null, tag: UpdateTagForAccountTag): Promise<UpdateTagForAccountResponse>;
  interface UpdateTagForAccountTag {
      /**
       * Tag ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the tag is updated.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the tag was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the tag was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Tag name. */
      name?: string | null;
      /** FQDN of the entity that belongs to this tag. */
      fqdn?: string | null;
      /**
       * Tag exposure.
       * @internal
       */
      exposure?: TagExposure;
      /**
       * Indicates whether this tag is deleted.
       * @internal
       * @readonly
       */
      deleted?: boolean | null;
  }
  /**
   * Deletes a tag.
   * @param tagId - ID of the tag to delete.
   * @internal
   * @documentationMaturity preview
   * @requiredField tagId
   * @permissionId TAGS.ACCOUNT_TAG_DELETE
   * @adminMethod
   */
  function deleteTagForAccount(tagId: string): Promise<void>;
  /**
   * Retrieves a list of tags.
   * @param fqdn - The Fully Qualified Domain Name (FQDN) to which the tags are associated. Currently supports only eCommerce Orders: `wix.ecom.v1.order`.
   * @internal
   * @documentationMaturity preview
   * @requiredField fqdn
   * @permissionId TAGS.ACCOUNT_TAG_READ
   * @adminMethod
   */
  function listTagsForAccount(fqdn: string, options?: ListTagsForAccountOptions): Promise<ListTagsForAccountResponse>;
  interface ListTagsForAccountOptions {
      /**
       * The tag exposure.
       * @internal
       */
      exposure?: TagExposure;
  }
  
  type osTagsV1Tag_universal_d_Tag = Tag;
  type osTagsV1Tag_universal_d_TagExposure = TagExposure;
  const osTagsV1Tag_universal_d_TagExposure: typeof TagExposure;
  type osTagsV1Tag_universal_d_CreateTagRequest = CreateTagRequest;
  type osTagsV1Tag_universal_d_CreateTagResponse = CreateTagResponse;
  type osTagsV1Tag_universal_d_GetTagRequest = GetTagRequest;
  type osTagsV1Tag_universal_d_GetTagResponse = GetTagResponse;
  type osTagsV1Tag_universal_d_UpdateTagRequest = UpdateTagRequest;
  type osTagsV1Tag_universal_d_UpdateTagResponse = UpdateTagResponse;
  type osTagsV1Tag_universal_d_DeleteTagRequest = DeleteTagRequest;
  type osTagsV1Tag_universal_d_DeleteTagResponse = DeleteTagResponse;
  type osTagsV1Tag_universal_d_ListTagsRequest = ListTagsRequest;
  type osTagsV1Tag_universal_d_ListTagsResponse = ListTagsResponse;
  type osTagsV1Tag_universal_d_DomainEvent = DomainEvent;
  type osTagsV1Tag_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type osTagsV1Tag_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type osTagsV1Tag_universal_d_RestoreInfo = RestoreInfo;
  type osTagsV1Tag_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type osTagsV1Tag_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type osTagsV1Tag_universal_d_ActionEvent = ActionEvent;
  type osTagsV1Tag_universal_d_MessageEnvelope = MessageEnvelope;
  type osTagsV1Tag_universal_d_IdentificationData = IdentificationData;
  type osTagsV1Tag_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type osTagsV1Tag_universal_d_WebhookIdentityType = WebhookIdentityType;
  const osTagsV1Tag_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  type osTagsV1Tag_universal_d_CreateTagForAccountRequest = CreateTagForAccountRequest;
  type osTagsV1Tag_universal_d_CreateTagForAccountResponse = CreateTagForAccountResponse;
  type osTagsV1Tag_universal_d_GetTagForAccountRequest = GetTagForAccountRequest;
  type osTagsV1Tag_universal_d_GetTagForAccountResponse = GetTagForAccountResponse;
  type osTagsV1Tag_universal_d_UpdateTagForAccountRequest = UpdateTagForAccountRequest;
  type osTagsV1Tag_universal_d_UpdateTagForAccountResponse = UpdateTagForAccountResponse;
  type osTagsV1Tag_universal_d_DeleteTagForAccountRequest = DeleteTagForAccountRequest;
  type osTagsV1Tag_universal_d_DeleteTagForAccountResponse = DeleteTagForAccountResponse;
  type osTagsV1Tag_universal_d_ListTagsForAccountRequest = ListTagsForAccountRequest;
  type osTagsV1Tag_universal_d_ListTagsForAccountResponse = ListTagsForAccountResponse;
  const osTagsV1Tag_universal_d_createTag: typeof createTag;
  const osTagsV1Tag_universal_d_getTag: typeof getTag;
  const osTagsV1Tag_universal_d_updateTag: typeof updateTag;
  type osTagsV1Tag_universal_d_UpdateTag = UpdateTag;
  const osTagsV1Tag_universal_d_deleteTag: typeof deleteTag;
  const osTagsV1Tag_universal_d_listTags: typeof listTags;
  type osTagsV1Tag_universal_d_ListTagsOptions = ListTagsOptions;
  const osTagsV1Tag_universal_d_createTagForAccount: typeof createTagForAccount;
  const osTagsV1Tag_universal_d_getTagForAccount: typeof getTagForAccount;
  const osTagsV1Tag_universal_d_updateTagForAccount: typeof updateTagForAccount;
  type osTagsV1Tag_universal_d_UpdateTagForAccountTag = UpdateTagForAccountTag;
  const osTagsV1Tag_universal_d_deleteTagForAccount: typeof deleteTagForAccount;
  const osTagsV1Tag_universal_d_listTagsForAccount: typeof listTagsForAccount;
  type osTagsV1Tag_universal_d_ListTagsForAccountOptions = ListTagsForAccountOptions;
  namespace osTagsV1Tag_universal_d {
    export {
      osTagsV1Tag_universal_d_Tag as Tag,
      osTagsV1Tag_universal_d_TagExposure as TagExposure,
      osTagsV1Tag_universal_d_CreateTagRequest as CreateTagRequest,
      osTagsV1Tag_universal_d_CreateTagResponse as CreateTagResponse,
      osTagsV1Tag_universal_d_GetTagRequest as GetTagRequest,
      osTagsV1Tag_universal_d_GetTagResponse as GetTagResponse,
      osTagsV1Tag_universal_d_UpdateTagRequest as UpdateTagRequest,
      osTagsV1Tag_universal_d_UpdateTagResponse as UpdateTagResponse,
      osTagsV1Tag_universal_d_DeleteTagRequest as DeleteTagRequest,
      osTagsV1Tag_universal_d_DeleteTagResponse as DeleteTagResponse,
      osTagsV1Tag_universal_d_ListTagsRequest as ListTagsRequest,
      osTagsV1Tag_universal_d_ListTagsResponse as ListTagsResponse,
      osTagsV1Tag_universal_d_DomainEvent as DomainEvent,
      osTagsV1Tag_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      osTagsV1Tag_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      osTagsV1Tag_universal_d_RestoreInfo as RestoreInfo,
      osTagsV1Tag_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      osTagsV1Tag_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      osTagsV1Tag_universal_d_ActionEvent as ActionEvent,
      osTagsV1Tag_universal_d_MessageEnvelope as MessageEnvelope,
      osTagsV1Tag_universal_d_IdentificationData as IdentificationData,
      osTagsV1Tag_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      osTagsV1Tag_universal_d_WebhookIdentityType as WebhookIdentityType,
      osTagsV1Tag_universal_d_CreateTagForAccountRequest as CreateTagForAccountRequest,
      osTagsV1Tag_universal_d_CreateTagForAccountResponse as CreateTagForAccountResponse,
      osTagsV1Tag_universal_d_GetTagForAccountRequest as GetTagForAccountRequest,
      osTagsV1Tag_universal_d_GetTagForAccountResponse as GetTagForAccountResponse,
      osTagsV1Tag_universal_d_UpdateTagForAccountRequest as UpdateTagForAccountRequest,
      osTagsV1Tag_universal_d_UpdateTagForAccountResponse as UpdateTagForAccountResponse,
      osTagsV1Tag_universal_d_DeleteTagForAccountRequest as DeleteTagForAccountRequest,
      osTagsV1Tag_universal_d_DeleteTagForAccountResponse as DeleteTagForAccountResponse,
      osTagsV1Tag_universal_d_ListTagsForAccountRequest as ListTagsForAccountRequest,
      osTagsV1Tag_universal_d_ListTagsForAccountResponse as ListTagsForAccountResponse,
      osTagsV1Tag_universal_d_createTag as createTag,
      osTagsV1Tag_universal_d_getTag as getTag,
      osTagsV1Tag_universal_d_updateTag as updateTag,
      osTagsV1Tag_universal_d_UpdateTag as UpdateTag,
      osTagsV1Tag_universal_d_deleteTag as deleteTag,
      osTagsV1Tag_universal_d_listTags as listTags,
      osTagsV1Tag_universal_d_ListTagsOptions as ListTagsOptions,
      osTagsV1Tag_universal_d_createTagForAccount as createTagForAccount,
      osTagsV1Tag_universal_d_getTagForAccount as getTagForAccount,
      osTagsV1Tag_universal_d_updateTagForAccount as updateTagForAccount,
      osTagsV1Tag_universal_d_UpdateTagForAccountTag as UpdateTagForAccountTag,
      osTagsV1Tag_universal_d_deleteTagForAccount as deleteTagForAccount,
      osTagsV1Tag_universal_d_listTagsForAccount as listTagsForAccount,
      osTagsV1Tag_universal_d_ListTagsForAccountOptions as ListTagsForAccountOptions,
    };
  }
  
  export { osTagsV1Tag_universal_d as tags };
}
