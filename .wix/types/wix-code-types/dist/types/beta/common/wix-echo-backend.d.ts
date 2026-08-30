declare module "wix-echo-backend" {
  interface CalculateMessage {
      /** result of the calculation */
      number?: number;
      /** message comment from the operation */
      message?: string;
      /** fake entity id */
      _id?: string;
  }
  interface CalculateRequest {
      /** 1st number to calculate */
      arg1: number;
      /** 2nd number to calculate */
      arg2: number;
      /** operation to perform */
      operation: CalculateOperation;
  }
  enum CalculateOperation {
      UNDEFINED = "UNDEFINED",
      ADD = "ADD",
      SUBTRACT = "SUBTRACT"
  }
  interface CalculateResponse {
      result?: CalculateMessage;
  }
  /** @public
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.arg1
   * @requiredField identifiers.arg2
   * @requiredField identifiers.operation
   * @adminMethod
   */
  function calculate(identifiers: CalculateIdentifiers): Promise<CalculateResponse>;
  interface CalculateIdentifiers {
      /** 1st number to calculate */
      arg1: number;
      /** 2nd number to calculate */
      arg2: number;
      /** operation to perform */
      operation: CalculateOperation;
  }
  
  type metroinspectorV1Calculator_universal_d_CalculateMessage = CalculateMessage;
  type metroinspectorV1Calculator_universal_d_CalculateRequest = CalculateRequest;
  type metroinspectorV1Calculator_universal_d_CalculateOperation = CalculateOperation;
  const metroinspectorV1Calculator_universal_d_CalculateOperation: typeof CalculateOperation;
  type metroinspectorV1Calculator_universal_d_CalculateResponse = CalculateResponse;
  const metroinspectorV1Calculator_universal_d_calculate: typeof calculate;
  type metroinspectorV1Calculator_universal_d_CalculateIdentifiers = CalculateIdentifiers;
  namespace metroinspectorV1Calculator_universal_d {
    export {
      metroinspectorV1Calculator_universal_d_CalculateMessage as CalculateMessage,
      metroinspectorV1Calculator_universal_d_CalculateRequest as CalculateRequest,
      metroinspectorV1Calculator_universal_d_CalculateOperation as CalculateOperation,
      metroinspectorV1Calculator_universal_d_CalculateResponse as CalculateResponse,
      metroinspectorV1Calculator_universal_d_calculate as calculate,
      metroinspectorV1Calculator_universal_d_CalculateIdentifiers as CalculateIdentifiers,
    };
  }
  
  interface MessageItem {
      /** inner_message comment from EchoMessage proto def */
      innerMessage?: string;
  }
  interface EchoRequest {
      /** 1st part of the message */
      arg1: string;
      /** 2nd part of the message */
      arg2?: string;
      /** this field test translatable annotation */
      titleField?: string;
      someInt32?: number;
      someDate?: Date | null;
  }
  interface EchoResponse {
      /**
       * override EchoResponse.echoMessage
       *
       */
      echoMessage?: EchoMessage;
      /** messge reseult as string */
      message?: string;
  }
  interface Dispatched {
      /** the message someone says */
      echo?: EchoMessage;
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
  interface EchoMessage {
      veloMessage: string;
      id: string;
  }
  /**
   * Another override description function 4
   * @param arg1 - 1st part of the message
   * @public
   * @documentationMaturity preview
   * @requiredField arg1
   * @param arg2 - modified comment for arg2 el hovav
   * @adminMethod
   * @returns ## override return 4
   */
  function echo(arg1: string, options?: EchoOptions): Promise<string>;
  interface EchoOptions {
      /** 2nd part of the message */
      arg2?: string;
      /** this field test translatable annotation */
      titleField?: string;
      someInt32?: number;
      someDate?: Date | null;
  }
  
  type metroinspectorV1Echo_universal_d_MessageItem = MessageItem;
  type metroinspectorV1Echo_universal_d_EchoRequest = EchoRequest;
  type metroinspectorV1Echo_universal_d_EchoResponse = EchoResponse;
  type metroinspectorV1Echo_universal_d_Dispatched = Dispatched;
  type metroinspectorV1Echo_universal_d_DomainEvent = DomainEvent;
  type metroinspectorV1Echo_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type metroinspectorV1Echo_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type metroinspectorV1Echo_universal_d_RestoreInfo = RestoreInfo;
  type metroinspectorV1Echo_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type metroinspectorV1Echo_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type metroinspectorV1Echo_universal_d_ActionEvent = ActionEvent;
  type metroinspectorV1Echo_universal_d_MessageEnvelope = MessageEnvelope;
  type metroinspectorV1Echo_universal_d_IdentificationData = IdentificationData;
  type metroinspectorV1Echo_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type metroinspectorV1Echo_universal_d_WebhookIdentityType = WebhookIdentityType;
  const metroinspectorV1Echo_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  type metroinspectorV1Echo_universal_d_EchoMessage = EchoMessage;
  const metroinspectorV1Echo_universal_d_echo: typeof echo;
  type metroinspectorV1Echo_universal_d_EchoOptions = EchoOptions;
  namespace metroinspectorV1Echo_universal_d {
    export {
      metroinspectorV1Echo_universal_d_MessageItem as MessageItem,
      metroinspectorV1Echo_universal_d_EchoRequest as EchoRequest,
      metroinspectorV1Echo_universal_d_EchoResponse as EchoResponse,
      metroinspectorV1Echo_universal_d_Dispatched as Dispatched,
      metroinspectorV1Echo_universal_d_DomainEvent as DomainEvent,
      metroinspectorV1Echo_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      metroinspectorV1Echo_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      metroinspectorV1Echo_universal_d_RestoreInfo as RestoreInfo,
      metroinspectorV1Echo_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      metroinspectorV1Echo_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      metroinspectorV1Echo_universal_d_ActionEvent as ActionEvent,
      metroinspectorV1Echo_universal_d_MessageEnvelope as MessageEnvelope,
      metroinspectorV1Echo_universal_d_IdentificationData as IdentificationData,
      metroinspectorV1Echo_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      metroinspectorV1Echo_universal_d_WebhookIdentityType as WebhookIdentityType,
      metroinspectorV1Echo_universal_d_EchoMessage as EchoMessage,
      metroinspectorV1Echo_universal_d_echo as echo,
      metroinspectorV1Echo_universal_d_EchoOptions as EchoOptions,
    };
  }
  
  export { metroinspectorV1Calculator_universal_d as calculator, metroinspectorV1Echo_universal_d as metroinspector };
}
