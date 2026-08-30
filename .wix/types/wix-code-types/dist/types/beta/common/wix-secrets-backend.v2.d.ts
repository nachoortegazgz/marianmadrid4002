declare module "wix-secrets-backend.v2" {
  interface Secret {
      /**
       * Unique secret ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * A unique, human-friendly name for the secret. Use it to retrieve the secret value with Get Secret Value.
       *
       * **Note:** You can use alphanumeric characters and the following special characters: `_+=-@#$`. Spaces are not supported.
       */
      name?: string | null;
      /** Optional text describing the secret's purpose or any other notes about it. */
      description?: string | null;
      /** The encrypted confidential value. */
      value?: string | null;
      /**
       * Date and time when the secret was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time when the secret was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  interface GetSecretValueRequest {
      /** Secret name. */
      name: string;
  }
  interface GetSecretValueResponse {
      /** The confidential value to protect, such as an API key. */
      value?: string;
  }
  interface ListSecretInfoRequest {
  }
  interface ListSecretInfoResponse {
      /** A list of secrets with encrypted values. */
      secrets?: Secret[];
  }
  interface CreateSecretRequest {
      /** Details of a secret. */
      secret: Secret;
  }
  interface CreateSecretResponse {
      /** Unique secret ID. */
      _id?: string;
  }
  interface DeleteSecretRequest {
      /** ID of the secret to delete. */
      _id: string;
  }
  interface DeleteSecretResponse {
  }
  interface UpdateSecretRequest {
      /** ID of the secret to update. */
      _id: string;
      /** Details of a secret. */
      secret: Secret;
  }
  interface UpdateSecretResponse {
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
  /**
   * Retrieves a secret value by name.
   *
   * <blockquote class="caution">
   * __Caution:__
   * Only use a secret's value in the backend code. Returning the secret value in the frontend is a security risk.
   * </blockquote>
   * @public
   * @requiredField name
   * @param name - The name of the secret to get the value of.
   * @permissionId SECRETS_VAULT.SECRET_READ
   * @adminMethod
   */
  function getSecretValue(name: string): Promise<GetSecretValueResponse>;
  /**
   * Retrieves a list of secrets.
   *
   * > **Note:** This method doesn't return the secret's value for security reasons. To retrieve the value, call [Get Secret Value](https://dev.wix.com/docs/rest/business-management/secrets/get-secret-value).
   * @public
   * @permissionId SECRETS_VAULT.SECRET_METADATA_READ
   * @adminMethod
   */
  function listSecretInfo(): Promise<ListSecretInfoResponse>;
  /**
   * Creates a secret.
   * @public
   * @requiredField secret
   * @requiredField secret.name
   * @requiredField secret.value
   * @param secret - Fields of a new secret.
   * @permissionId SECRETS_VAULT.SECRET_CREATE
   * @adminMethod
   * @returns Unique secret ID.
   */
  function createSecret(secret: Secret): Promise<string>;
  /**
   * Deletes a secret.
   *
   * <blockquote class="warning">
   * __Warning:__
   * Deleting a secret is irreversible and will break all code using the secret.
   * </blockquote>
   * @public
   * @requiredField _id
   * @param _id - The unique ID of the secret to be deleted.
   * @permissionId SECRETS_VAULT.SECRET_DELETE
   * @adminMethod
   */
  function deleteSecret(_id: string): Promise<void>;
  /**
   * Updates a secret by ID.
   *
   * You can update one or more fields, but you can't rename the secret with a name of another existing secret. Unspecified fields remain unchanged.
   *
   * To get the secret ID, call List Secret Info.
   *
   * <blockquote class="warning">
   * **Warning:**
   * - Changing a secret's name or value will break all code using the secret.
   * - Delete secret keys from your code after calling this method to avoid security risks.
   * </blockquote>
   * @param _id - ID of the secret to update.
   * @param secret - Details of a secret.
   * @internal
   * @requiredField _id
   * @requiredField secret
   * @requiredField secret.name
   * @requiredField secret.value
   * @permissionId SECRETS_VAULT.SECRET_UPDATE
   * @adminMethod
   */
  function internalUpdateSecret(_id: string, secret: Secret): Promise<void>;
  /**
   * Updates 1 or all fields of a secret.
   *
   * To get the secret ID, call [List Secret Info](https://dev.wix.com/docs/rest/business-management/secrets/list-secret-info).
   * @param _id - ID of the secret to update.
   * @param secret - Details of a secret.
   * @public
   * @requiredField _id
   * @requiredField secret
   * @permissionId SECRETS_VAULT.SECRET_UPDATE
   * @adminMethod
   */
  function updateSecret(_id: string, secret: Secret): Promise<void>;
  
  type veloSecretsVaultV1Secret_universal_d_Secret = Secret;
  type veloSecretsVaultV1Secret_universal_d_GetSecretValueRequest = GetSecretValueRequest;
  type veloSecretsVaultV1Secret_universal_d_GetSecretValueResponse = GetSecretValueResponse;
  type veloSecretsVaultV1Secret_universal_d_ListSecretInfoRequest = ListSecretInfoRequest;
  type veloSecretsVaultV1Secret_universal_d_ListSecretInfoResponse = ListSecretInfoResponse;
  type veloSecretsVaultV1Secret_universal_d_CreateSecretRequest = CreateSecretRequest;
  type veloSecretsVaultV1Secret_universal_d_CreateSecretResponse = CreateSecretResponse;
  type veloSecretsVaultV1Secret_universal_d_DeleteSecretRequest = DeleteSecretRequest;
  type veloSecretsVaultV1Secret_universal_d_DeleteSecretResponse = DeleteSecretResponse;
  type veloSecretsVaultV1Secret_universal_d_UpdateSecretRequest = UpdateSecretRequest;
  type veloSecretsVaultV1Secret_universal_d_UpdateSecretResponse = UpdateSecretResponse;
  type veloSecretsVaultV1Secret_universal_d_DomainEvent = DomainEvent;
  type veloSecretsVaultV1Secret_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type veloSecretsVaultV1Secret_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type veloSecretsVaultV1Secret_universal_d_RestoreInfo = RestoreInfo;
  type veloSecretsVaultV1Secret_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type veloSecretsVaultV1Secret_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type veloSecretsVaultV1Secret_universal_d_ActionEvent = ActionEvent;
  type veloSecretsVaultV1Secret_universal_d_MessageEnvelope = MessageEnvelope;
  type veloSecretsVaultV1Secret_universal_d_IdentificationData = IdentificationData;
  type veloSecretsVaultV1Secret_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type veloSecretsVaultV1Secret_universal_d_WebhookIdentityType = WebhookIdentityType;
  const veloSecretsVaultV1Secret_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const veloSecretsVaultV1Secret_universal_d_getSecretValue: typeof getSecretValue;
  const veloSecretsVaultV1Secret_universal_d_listSecretInfo: typeof listSecretInfo;
  const veloSecretsVaultV1Secret_universal_d_createSecret: typeof createSecret;
  const veloSecretsVaultV1Secret_universal_d_deleteSecret: typeof deleteSecret;
  const veloSecretsVaultV1Secret_universal_d_internalUpdateSecret: typeof internalUpdateSecret;
  const veloSecretsVaultV1Secret_universal_d_updateSecret: typeof updateSecret;
  namespace veloSecretsVaultV1Secret_universal_d {
    export {
      veloSecretsVaultV1Secret_universal_d_Secret as Secret,
      veloSecretsVaultV1Secret_universal_d_GetSecretValueRequest as GetSecretValueRequest,
      veloSecretsVaultV1Secret_universal_d_GetSecretValueResponse as GetSecretValueResponse,
      veloSecretsVaultV1Secret_universal_d_ListSecretInfoRequest as ListSecretInfoRequest,
      veloSecretsVaultV1Secret_universal_d_ListSecretInfoResponse as ListSecretInfoResponse,
      veloSecretsVaultV1Secret_universal_d_CreateSecretRequest as CreateSecretRequest,
      veloSecretsVaultV1Secret_universal_d_CreateSecretResponse as CreateSecretResponse,
      veloSecretsVaultV1Secret_universal_d_DeleteSecretRequest as DeleteSecretRequest,
      veloSecretsVaultV1Secret_universal_d_DeleteSecretResponse as DeleteSecretResponse,
      veloSecretsVaultV1Secret_universal_d_UpdateSecretRequest as UpdateSecretRequest,
      veloSecretsVaultV1Secret_universal_d_UpdateSecretResponse as UpdateSecretResponse,
      veloSecretsVaultV1Secret_universal_d_DomainEvent as DomainEvent,
      veloSecretsVaultV1Secret_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      veloSecretsVaultV1Secret_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      veloSecretsVaultV1Secret_universal_d_RestoreInfo as RestoreInfo,
      veloSecretsVaultV1Secret_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      veloSecretsVaultV1Secret_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      veloSecretsVaultV1Secret_universal_d_ActionEvent as ActionEvent,
      veloSecretsVaultV1Secret_universal_d_MessageEnvelope as MessageEnvelope,
      veloSecretsVaultV1Secret_universal_d_IdentificationData as IdentificationData,
      veloSecretsVaultV1Secret_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      veloSecretsVaultV1Secret_universal_d_WebhookIdentityType as WebhookIdentityType,
      veloSecretsVaultV1Secret_universal_d_getSecretValue as getSecretValue,
      veloSecretsVaultV1Secret_universal_d_listSecretInfo as listSecretInfo,
      veloSecretsVaultV1Secret_universal_d_createSecret as createSecret,
      veloSecretsVaultV1Secret_universal_d_deleteSecret as deleteSecret,
      veloSecretsVaultV1Secret_universal_d_internalUpdateSecret as internalUpdateSecret,
      veloSecretsVaultV1Secret_universal_d_updateSecret as updateSecret,
    };
  }
  
  export { veloSecretsVaultV1Secret_universal_d as secrets };
}
