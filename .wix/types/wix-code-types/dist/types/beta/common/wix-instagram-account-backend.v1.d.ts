declare module "wix-instagram-account-backend.v1" {
  interface InstagramAccount {
      /**
       * The id of the connection
       * @readonly
       */
      _id?: string;
      /**
       * The revision of the connection
       * @readonly
       */
      revision?: string | null;
      /** The instagram info connected to */
      instagramInfo?: InstagramInfo;
      /** True - account is synchronized with the Meta API. False - in last successful state */
      synchronized?: boolean | null;
  }
  interface InstagramInfo {
      /** The id of the instagram user */
      instagramId?: string;
      /**
       * The username of the instagram user
       * @readonly
       */
      instagramUsername?: string;
  }
  interface ConnectAccountByTokenRequest {
      /** access token received from instagram api */
      accessToken?: string;
  }
  interface ConnectAccountByTokenResponse {
      /** instagram account profile information */
      instagramAccount?: InstagramAccount;
  }
  interface ChangeTokenExpirationDateRequest {
      /**
       * connection id
       * @readonly
       */
      connectionId?: string;
      /** new expiration date */
      expirationDate?: Date | null;
  }
  interface ChangeTokenExpirationDateResponse {
  }
  interface GetLongLivedTokenRequest {
      /**
       * connection id
       * @readonly
       */
      connectionId?: string;
  }
  interface GetLongLivedTokenResponse {
      /** access token received from instagram api */
      token?: string;
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
  interface InitiateAccountConnectionRequest {
  }
  interface InitiateAccountConnectionResponse {
      /** State parameter for authorization callback */
      connectionParams?: string[];
  }
  interface DisconnectAccountRequest {
      /**
       * connection id to be disconnected
       * @readonly
       */
      connectionId: string;
  }
  interface DisconnectAccountResponse {
  }
  interface GetInstagramAccountRequest {
      /**
       * connection id
       * @readonly
       */
      connectionId: string;
  }
  interface GetInstagramAccountResponse {
      /** instagram account information */
      instagramAccount?: InstagramAccount;
  }
  interface ListInstagramAccountsRequest {
  }
  interface ListInstagramAccountsResponse {
      /** instagram account profile information */
      instagramAccounts?: InstagramAccount[];
  }
  /**
   * Retrieve hash needed for connection of instagram account to a site.
   * @public
   * @documentationMaturity preview
   * @permissionId INSTAGRAM_ACCOUNTS.INITIATE_CONNECTION
   * @adminMethod
   */
  function initiateAccountConnection(): Promise<InitiateAccountConnectionResponse>;
  /**
   * Disconnect instagram account from a site.
   *
   * Removes stored Long-life token corresponding to the instagram user id.
   * @param connectionId - connection id to be disconnected
   * @public
   * @documentationMaturity preview
   * @requiredField connectionId
   * @permissionId INSTAGRAM_ACCOUNTS.DISCONNECT
   * @adminMethod
   */
  function disconnectAccount(connectionId: string): Promise<void>;
  /**
   * Get instagram account profile.
   *
   * Returns instagram account profile corresponding to account id.
   * @param connectionId - connection id
   * @public
   * @documentationMaturity preview
   * @requiredField connectionId
   * @permissionId INSTAGRAM_ACCOUNTS.GET_PROFILE
   * @adminMethod
   * @returns instagram account information
   */
  function getInstagramAccount(connectionId: string): Promise<InstagramAccount>;
  /**
   * List instagram accounts connected to the site.
   *
   * Returns list of instagram user ids connected to app instance.
   * @public
   * @documentationMaturity preview
   * @permissionId INSTAGRAM_ACCOUNTS.LIST_PROFILES
   * @adminMethod
   */
  function listInstagramAccounts(): Promise<ListInstagramAccountsResponse>;
  
  type instagramFeedV1InstagramAccount_universal_d_InstagramAccount = InstagramAccount;
  type instagramFeedV1InstagramAccount_universal_d_InstagramInfo = InstagramInfo;
  type instagramFeedV1InstagramAccount_universal_d_ConnectAccountByTokenRequest = ConnectAccountByTokenRequest;
  type instagramFeedV1InstagramAccount_universal_d_ConnectAccountByTokenResponse = ConnectAccountByTokenResponse;
  type instagramFeedV1InstagramAccount_universal_d_ChangeTokenExpirationDateRequest = ChangeTokenExpirationDateRequest;
  type instagramFeedV1InstagramAccount_universal_d_ChangeTokenExpirationDateResponse = ChangeTokenExpirationDateResponse;
  type instagramFeedV1InstagramAccount_universal_d_GetLongLivedTokenRequest = GetLongLivedTokenRequest;
  type instagramFeedV1InstagramAccount_universal_d_GetLongLivedTokenResponse = GetLongLivedTokenResponse;
  type instagramFeedV1InstagramAccount_universal_d_DomainEvent = DomainEvent;
  type instagramFeedV1InstagramAccount_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type instagramFeedV1InstagramAccount_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type instagramFeedV1InstagramAccount_universal_d_RestoreInfo = RestoreInfo;
  type instagramFeedV1InstagramAccount_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type instagramFeedV1InstagramAccount_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type instagramFeedV1InstagramAccount_universal_d_ActionEvent = ActionEvent;
  type instagramFeedV1InstagramAccount_universal_d_MessageEnvelope = MessageEnvelope;
  type instagramFeedV1InstagramAccount_universal_d_IdentificationData = IdentificationData;
  type instagramFeedV1InstagramAccount_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type instagramFeedV1InstagramAccount_universal_d_WebhookIdentityType = WebhookIdentityType;
  const instagramFeedV1InstagramAccount_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  type instagramFeedV1InstagramAccount_universal_d_InitiateAccountConnectionRequest = InitiateAccountConnectionRequest;
  type instagramFeedV1InstagramAccount_universal_d_InitiateAccountConnectionResponse = InitiateAccountConnectionResponse;
  type instagramFeedV1InstagramAccount_universal_d_DisconnectAccountRequest = DisconnectAccountRequest;
  type instagramFeedV1InstagramAccount_universal_d_DisconnectAccountResponse = DisconnectAccountResponse;
  type instagramFeedV1InstagramAccount_universal_d_GetInstagramAccountRequest = GetInstagramAccountRequest;
  type instagramFeedV1InstagramAccount_universal_d_GetInstagramAccountResponse = GetInstagramAccountResponse;
  type instagramFeedV1InstagramAccount_universal_d_ListInstagramAccountsRequest = ListInstagramAccountsRequest;
  type instagramFeedV1InstagramAccount_universal_d_ListInstagramAccountsResponse = ListInstagramAccountsResponse;
  const instagramFeedV1InstagramAccount_universal_d_initiateAccountConnection: typeof initiateAccountConnection;
  const instagramFeedV1InstagramAccount_universal_d_disconnectAccount: typeof disconnectAccount;
  const instagramFeedV1InstagramAccount_universal_d_getInstagramAccount: typeof getInstagramAccount;
  const instagramFeedV1InstagramAccount_universal_d_listInstagramAccounts: typeof listInstagramAccounts;
  namespace instagramFeedV1InstagramAccount_universal_d {
    export {
      instagramFeedV1InstagramAccount_universal_d_InstagramAccount as InstagramAccount,
      instagramFeedV1InstagramAccount_universal_d_InstagramInfo as InstagramInfo,
      instagramFeedV1InstagramAccount_universal_d_ConnectAccountByTokenRequest as ConnectAccountByTokenRequest,
      instagramFeedV1InstagramAccount_universal_d_ConnectAccountByTokenResponse as ConnectAccountByTokenResponse,
      instagramFeedV1InstagramAccount_universal_d_ChangeTokenExpirationDateRequest as ChangeTokenExpirationDateRequest,
      instagramFeedV1InstagramAccount_universal_d_ChangeTokenExpirationDateResponse as ChangeTokenExpirationDateResponse,
      instagramFeedV1InstagramAccount_universal_d_GetLongLivedTokenRequest as GetLongLivedTokenRequest,
      instagramFeedV1InstagramAccount_universal_d_GetLongLivedTokenResponse as GetLongLivedTokenResponse,
      instagramFeedV1InstagramAccount_universal_d_DomainEvent as DomainEvent,
      instagramFeedV1InstagramAccount_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      instagramFeedV1InstagramAccount_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      instagramFeedV1InstagramAccount_universal_d_RestoreInfo as RestoreInfo,
      instagramFeedV1InstagramAccount_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      instagramFeedV1InstagramAccount_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      instagramFeedV1InstagramAccount_universal_d_ActionEvent as ActionEvent,
      instagramFeedV1InstagramAccount_universal_d_MessageEnvelope as MessageEnvelope,
      instagramFeedV1InstagramAccount_universal_d_IdentificationData as IdentificationData,
      instagramFeedV1InstagramAccount_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      instagramFeedV1InstagramAccount_universal_d_WebhookIdentityType as WebhookIdentityType,
      instagramFeedV1InstagramAccount_universal_d_InitiateAccountConnectionRequest as InitiateAccountConnectionRequest,
      instagramFeedV1InstagramAccount_universal_d_InitiateAccountConnectionResponse as InitiateAccountConnectionResponse,
      instagramFeedV1InstagramAccount_universal_d_DisconnectAccountRequest as DisconnectAccountRequest,
      instagramFeedV1InstagramAccount_universal_d_DisconnectAccountResponse as DisconnectAccountResponse,
      instagramFeedV1InstagramAccount_universal_d_GetInstagramAccountRequest as GetInstagramAccountRequest,
      instagramFeedV1InstagramAccount_universal_d_GetInstagramAccountResponse as GetInstagramAccountResponse,
      instagramFeedV1InstagramAccount_universal_d_ListInstagramAccountsRequest as ListInstagramAccountsRequest,
      instagramFeedV1InstagramAccount_universal_d_ListInstagramAccountsResponse as ListInstagramAccountsResponse,
      instagramFeedV1InstagramAccount_universal_d_initiateAccountConnection as initiateAccountConnection,
      instagramFeedV1InstagramAccount_universal_d_disconnectAccount as disconnectAccount,
      instagramFeedV1InstagramAccount_universal_d_getInstagramAccount as getInstagramAccount,
      instagramFeedV1InstagramAccount_universal_d_listInstagramAccounts as listInstagramAccounts,
    };
  }
  
  export { instagramFeedV1InstagramAccount_universal_d as accounts };
}
