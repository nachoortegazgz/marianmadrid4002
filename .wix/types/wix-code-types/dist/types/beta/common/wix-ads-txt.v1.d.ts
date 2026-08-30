declare module "wix-ads-txt.v1" {
  interface AdsTxt {
      /** Content of Ads.txt. */
      content?: string;
      /** Whether current Ads.txt is Wix's default. */
      default?: boolean;
      /** Subdomain of Ads.txt, for example `www`, `es`, `fr`. Default is `www`. */
      subdomain?: string;
      /**
       * entity Id
       * @internal
       */
      _id?: string;
  }
  /** The request to get the Ads.txt file content */
  interface GetAdsTxtRequest {
      /** Subdomain of Ads.txt, for example `www`, `es`, `fr`. Default is `www`. */
      subdomain?: string;
  }
  /** The response of the Ads.txt file request */
  interface GetAdsTxtResponse {
      /** Ads txt object */
      adsTxt?: AdsTxt;
  }
  /** The request to update the content of the Ads.txt file */
  interface UpdateAdsTxtRequest {
      /**
       * Submitted `adsTxT` object will replace the existing Ads.txt file.
       * To reset Ads.txt to Wix's default, submit `default:true` without a `content` object.
       */
      adsTxt?: AdsTxt;
  }
  interface UpdateAdsTxtResponse {
      /** Updated Ads txt object */
      adsTxt?: AdsTxt;
  }
  /** The request to append the content of the Ads.txt file */
  interface AppendAdsTxtRequest {
      /**
       * Submitted `content` object will be appended to the existing Ads.txt file.
       * To reset Ads.txt to Wix's default, submit `default:true` without a `content` object.
       */
      adsTxt?: AdsTxt;
  }
  interface AppendAdsTxtResponse {
      /** Appended Ads.txt file. */
      adsTxt?: AdsTxt;
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
   * Retrieves the Ads.txt file.
   * @public
   * @documentationMaturity preview
   * @adminMethod
   * @returns The response of the Ads.txt file request
   */
  function getAdsTxt(options?: GetAdsTxtOptions): Promise<GetAdsTxtResponse>;
  interface GetAdsTxtOptions {
      /** Subdomain of Ads.txt, for example `www`, `es`, `fr`. Default is `www`. */
      subdomain?: string;
  }
  /**
   * Updates the Ads.txt file.
   * When setting the `content` object to an empty string, an empty Ads.txt file will be created.
   * In order to reset Ads.txt to Wix's default, send `default: true` without a `content` object.
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function updateAdsTxt(options?: UpdateAdsTxtOptions): Promise<UpdateAdsTxtResponse>;
  interface UpdateAdsTxtOptions {
      /**
       * Submitted `adsTxT` object will replace the existing Ads.txt file.
       * To reset Ads.txt to Wix's default, submit `default:true` without a `content` object.
       */
      adsTxt?: AdsTxt;
  }
  /**
   * Appends the submitted `content` object to Ads.txt.
   * In order to reset Ads.txt to Wix's default, send `default: true` without a `content` object.
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function appendAdsTxt(options?: AppendAdsTxtOptions): Promise<AppendAdsTxtResponse>;
  interface AppendAdsTxtOptions {
      /**
       * Submitted `content` object will be appended to the existing Ads.txt file.
       * To reset Ads.txt to Wix's default, submit `default:true` without a `content` object.
       */
      adsTxt?: AdsTxt;
  }
  
  type promoteMarketingV2AdsTxt_universal_d_AdsTxt = AdsTxt;
  type promoteMarketingV2AdsTxt_universal_d_GetAdsTxtRequest = GetAdsTxtRequest;
  type promoteMarketingV2AdsTxt_universal_d_GetAdsTxtResponse = GetAdsTxtResponse;
  type promoteMarketingV2AdsTxt_universal_d_UpdateAdsTxtRequest = UpdateAdsTxtRequest;
  type promoteMarketingV2AdsTxt_universal_d_UpdateAdsTxtResponse = UpdateAdsTxtResponse;
  type promoteMarketingV2AdsTxt_universal_d_AppendAdsTxtRequest = AppendAdsTxtRequest;
  type promoteMarketingV2AdsTxt_universal_d_AppendAdsTxtResponse = AppendAdsTxtResponse;
  type promoteMarketingV2AdsTxt_universal_d_DomainEvent = DomainEvent;
  type promoteMarketingV2AdsTxt_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type promoteMarketingV2AdsTxt_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type promoteMarketingV2AdsTxt_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type promoteMarketingV2AdsTxt_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type promoteMarketingV2AdsTxt_universal_d_ActionEvent = ActionEvent;
  type promoteMarketingV2AdsTxt_universal_d_MessageEnvelope = MessageEnvelope;
  type promoteMarketingV2AdsTxt_universal_d_IdentificationData = IdentificationData;
  type promoteMarketingV2AdsTxt_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type promoteMarketingV2AdsTxt_universal_d_WebhookIdentityType = WebhookIdentityType;
  const promoteMarketingV2AdsTxt_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const promoteMarketingV2AdsTxt_universal_d_getAdsTxt: typeof getAdsTxt;
  type promoteMarketingV2AdsTxt_universal_d_GetAdsTxtOptions = GetAdsTxtOptions;
  const promoteMarketingV2AdsTxt_universal_d_updateAdsTxt: typeof updateAdsTxt;
  type promoteMarketingV2AdsTxt_universal_d_UpdateAdsTxtOptions = UpdateAdsTxtOptions;
  const promoteMarketingV2AdsTxt_universal_d_appendAdsTxt: typeof appendAdsTxt;
  type promoteMarketingV2AdsTxt_universal_d_AppendAdsTxtOptions = AppendAdsTxtOptions;
  namespace promoteMarketingV2AdsTxt_universal_d {
    export {
      promoteMarketingV2AdsTxt_universal_d_AdsTxt as AdsTxt,
      promoteMarketingV2AdsTxt_universal_d_GetAdsTxtRequest as GetAdsTxtRequest,
      promoteMarketingV2AdsTxt_universal_d_GetAdsTxtResponse as GetAdsTxtResponse,
      promoteMarketingV2AdsTxt_universal_d_UpdateAdsTxtRequest as UpdateAdsTxtRequest,
      promoteMarketingV2AdsTxt_universal_d_UpdateAdsTxtResponse as UpdateAdsTxtResponse,
      promoteMarketingV2AdsTxt_universal_d_AppendAdsTxtRequest as AppendAdsTxtRequest,
      promoteMarketingV2AdsTxt_universal_d_AppendAdsTxtResponse as AppendAdsTxtResponse,
      promoteMarketingV2AdsTxt_universal_d_DomainEvent as DomainEvent,
      promoteMarketingV2AdsTxt_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      promoteMarketingV2AdsTxt_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      promoteMarketingV2AdsTxt_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      promoteMarketingV2AdsTxt_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      promoteMarketingV2AdsTxt_universal_d_ActionEvent as ActionEvent,
      promoteMarketingV2AdsTxt_universal_d_MessageEnvelope as MessageEnvelope,
      promoteMarketingV2AdsTxt_universal_d_IdentificationData as IdentificationData,
      promoteMarketingV2AdsTxt_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      promoteMarketingV2AdsTxt_universal_d_WebhookIdentityType as WebhookIdentityType,
      promoteMarketingV2AdsTxt_universal_d_getAdsTxt as getAdsTxt,
      promoteMarketingV2AdsTxt_universal_d_GetAdsTxtOptions as GetAdsTxtOptions,
      promoteMarketingV2AdsTxt_universal_d_updateAdsTxt as updateAdsTxt,
      promoteMarketingV2AdsTxt_universal_d_UpdateAdsTxtOptions as UpdateAdsTxtOptions,
      promoteMarketingV2AdsTxt_universal_d_appendAdsTxt as appendAdsTxt,
      promoteMarketingV2AdsTxt_universal_d_AppendAdsTxtOptions as AppendAdsTxtOptions,
    };
  }
  
  export { promoteMarketingV2AdsTxt_universal_d as marketing };
}
