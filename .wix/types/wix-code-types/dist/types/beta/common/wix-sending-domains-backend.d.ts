declare module "wix-sending-domains-backend" {
  /** A SendingDomain is a ... */
  interface SendingDomain {
      /**
       * SendingDomain ID.
       * @readonly
       */
      _id?: string;
      /**
       * Date and time this entity was created.
       * @readonly
       */
      _createdDate?: Date;
      /** The domain. */
      domain?: string;
      /**
       * Current status of the SendingDomain.
       * @readonly
       */
      status?: Status;
      /**
       * Required domain DNS records for an email to pass dkim check (not available when status is "INITIALIZING").
       * @readonly
       */
      dnsRecords?: DnsRecord[];
  }
  enum Type {
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      CNAME = "CNAME"
  }
  enum Status {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      INITIALIZING = "INITIALIZING",
      NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
      AUTHENTICATED = "AUTHENTICATED"
  }
  interface DnsRecord {
      /** Host name of the DNS record. */
      hostName?: string;
      /** Value of the DNS record. */
      value?: string;
      /** Type of the DNS record. */
      type?: Type;
  }
  interface CreateSendingDomainRequest {
      /** SendingDomain to be created. */
      sendingDomain: SendingDomain;
  }
  interface CreateSendingDomainResponse {
      /** The created SendingDomain. */
      sendingDomain?: SendingDomain;
  }
  interface GetSendingDomainRequest {
      /** ID of the SendingDomain to retrieve. */
      sendingDomainId: string;
  }
  interface GetSendingDomainResponse {
      /** The requested SendingDomain. */
      sendingDomain?: SendingDomain;
  }
  interface QuerySendingDomainsRequest {
      /** WQL expression. */
      query?: CursorQuery;
  }
  interface CursorQuery extends CursorQueryPagingMethodOneOf {
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
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
  }
  interface Sorting {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder;
  }
  enum SortOrder {
      ASC = "ASC",
      DESC = "DESC"
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
  interface QuerySendingDomainsResponse {
      /** List of SendingDomains. */
      sendingDomains?: SendingDomain[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata;
  }
  interface CursorPagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      cursors?: Cursors;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface AuthenticateSendingDomainRequest {
      /** ID of the SendingDomain to authenticate. */
      sendingDomainId: string;
  }
  interface AuthenticateSendingDomainResponse {
      /** SendingDomain after authentication attempt. */
      sendingDomain?: SendingDomain;
  }
  interface IsEmailUsableAsFromAddressRequest {
      /** Email address to be checked. */
      emailAddress?: string;
  }
  interface IsEmailUsableAsFromAddressResponse {
      /** "true" if given email can be used as from address, "false" otherwise. */
      usableAsFromAddress?: boolean;
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
   * Creates a SendingDomain.
   * Request body must include "domain" field.
   * You can only create sending domain if you have sender details entry with the provided domain.
   * @param sendingDomain - SendingDomain to be created.
   * @internal
   * @documentationMaturity preview
   * @requiredField sendingDomain
   * @permissionId WIX_EMAILS.SENDING_DOMAIN_CREATE
   * @adminMethod
   * @returns The created SendingDomain.
   */
  function createSendingDomain(sendingDomain: SendingDomain): Promise<SendingDomain>;
  /**
   * Retrieves SendingDomain by ID.
   * You can only retrieve sending domain if you have sender details entry with the requested domain.
   * @param sendingDomainId - ID of the SendingDomain to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField sendingDomainId
   * @permissionId WIX_EMAILS.SENDING_DOMAIN_READ
   * @adminMethod
   * @returns The requested SendingDomain.
   */
  function getSendingDomain(sendingDomainId: string): Promise<SendingDomain>;
  /**
   * Retrieves a list of SendingDomains, given the provided [paging, filtering, and sorting][1].
   * Up to 1,000 SendingDomains can be returned per request.
   * You can only retrieve sending domain if you have sender details entry with the requested domain.
   * To learn how to query SendingDomains, see [API Query Language][2].
   * [1]: https://dev.wix.com/api/rest/getting-started/sorting-and-paging
   * [2]: https://dev.wix.com/api/rest/getting-started/api-query-language
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_EMAILS.SENDING_DOMAIN_READ
   * @adminMethod
   */
  function querySendingDomains(): SendingDomainsQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface SendingDomainsQueryResult extends QueryCursorResult {
      items: SendingDomain[];
      query: SendingDomainsQueryBuilder;
      next: () => Promise<SendingDomainsQueryResult>;
      prev: () => Promise<SendingDomainsQueryResult>;
  }
  interface SendingDomainsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | 'domain', value: any) => SendingDomainsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | 'domain', value: any) => SendingDomainsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'domain', value: string) => SendingDomainsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | 'domain', value: any[]) => SendingDomainsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'domain', value: any) => SendingDomainsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | 'domain', value: boolean) => SendingDomainsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | 'domain'>) => SendingDomainsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | 'domain'>) => SendingDomainsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => SendingDomainsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => SendingDomainsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<SendingDomainsQueryResult>;
  }
  /**
   * Authenticate sending domain.
   * You can only authenticate sending domain if you have sender details entry with the provided domain.
   * @param sendingDomainId - ID of the SendingDomain to authenticate.
   * @public
   * @documentationMaturity preview
   * @requiredField sendingDomainId
   * @permissionId WIX_EMAILS.SENDING_DOMAIN_AUTHENTICATE
   * @adminMethod
   */
  function authenticateSendingDomain(sendingDomainId: string): Promise<AuthenticateSendingDomainResponse>;
  
  type emailsSendingdomainsV1SendingDomain_universal_d_SendingDomain = SendingDomain;
  type emailsSendingdomainsV1SendingDomain_universal_d_Type = Type;
  const emailsSendingdomainsV1SendingDomain_universal_d_Type: typeof Type;
  type emailsSendingdomainsV1SendingDomain_universal_d_Status = Status;
  const emailsSendingdomainsV1SendingDomain_universal_d_Status: typeof Status;
  type emailsSendingdomainsV1SendingDomain_universal_d_DnsRecord = DnsRecord;
  type emailsSendingdomainsV1SendingDomain_universal_d_CreateSendingDomainRequest = CreateSendingDomainRequest;
  type emailsSendingdomainsV1SendingDomain_universal_d_CreateSendingDomainResponse = CreateSendingDomainResponse;
  type emailsSendingdomainsV1SendingDomain_universal_d_GetSendingDomainRequest = GetSendingDomainRequest;
  type emailsSendingdomainsV1SendingDomain_universal_d_GetSendingDomainResponse = GetSendingDomainResponse;
  type emailsSendingdomainsV1SendingDomain_universal_d_QuerySendingDomainsRequest = QuerySendingDomainsRequest;
  type emailsSendingdomainsV1SendingDomain_universal_d_CursorQuery = CursorQuery;
  type emailsSendingdomainsV1SendingDomain_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type emailsSendingdomainsV1SendingDomain_universal_d_Sorting = Sorting;
  type emailsSendingdomainsV1SendingDomain_universal_d_SortOrder = SortOrder;
  const emailsSendingdomainsV1SendingDomain_universal_d_SortOrder: typeof SortOrder;
  type emailsSendingdomainsV1SendingDomain_universal_d_CursorPaging = CursorPaging;
  type emailsSendingdomainsV1SendingDomain_universal_d_QuerySendingDomainsResponse = QuerySendingDomainsResponse;
  type emailsSendingdomainsV1SendingDomain_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type emailsSendingdomainsV1SendingDomain_universal_d_Cursors = Cursors;
  type emailsSendingdomainsV1SendingDomain_universal_d_AuthenticateSendingDomainRequest = AuthenticateSendingDomainRequest;
  type emailsSendingdomainsV1SendingDomain_universal_d_AuthenticateSendingDomainResponse = AuthenticateSendingDomainResponse;
  type emailsSendingdomainsV1SendingDomain_universal_d_IsEmailUsableAsFromAddressRequest = IsEmailUsableAsFromAddressRequest;
  type emailsSendingdomainsV1SendingDomain_universal_d_IsEmailUsableAsFromAddressResponse = IsEmailUsableAsFromAddressResponse;
  type emailsSendingdomainsV1SendingDomain_universal_d_DomainEvent = DomainEvent;
  type emailsSendingdomainsV1SendingDomain_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type emailsSendingdomainsV1SendingDomain_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type emailsSendingdomainsV1SendingDomain_universal_d_RestoreInfo = RestoreInfo;
  type emailsSendingdomainsV1SendingDomain_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type emailsSendingdomainsV1SendingDomain_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type emailsSendingdomainsV1SendingDomain_universal_d_ActionEvent = ActionEvent;
  type emailsSendingdomainsV1SendingDomain_universal_d_Empty = Empty;
  type emailsSendingdomainsV1SendingDomain_universal_d_MessageEnvelope = MessageEnvelope;
  type emailsSendingdomainsV1SendingDomain_universal_d_IdentificationData = IdentificationData;
  type emailsSendingdomainsV1SendingDomain_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type emailsSendingdomainsV1SendingDomain_universal_d_WebhookIdentityType = WebhookIdentityType;
  const emailsSendingdomainsV1SendingDomain_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const emailsSendingdomainsV1SendingDomain_universal_d_createSendingDomain: typeof createSendingDomain;
  const emailsSendingdomainsV1SendingDomain_universal_d_getSendingDomain: typeof getSendingDomain;
  const emailsSendingdomainsV1SendingDomain_universal_d_querySendingDomains: typeof querySendingDomains;
  type emailsSendingdomainsV1SendingDomain_universal_d_SendingDomainsQueryResult = SendingDomainsQueryResult;
  type emailsSendingdomainsV1SendingDomain_universal_d_SendingDomainsQueryBuilder = SendingDomainsQueryBuilder;
  const emailsSendingdomainsV1SendingDomain_universal_d_authenticateSendingDomain: typeof authenticateSendingDomain;
  namespace emailsSendingdomainsV1SendingDomain_universal_d {
    export {
      emailsSendingdomainsV1SendingDomain_universal_d_SendingDomain as SendingDomain,
      emailsSendingdomainsV1SendingDomain_universal_d_Type as Type,
      emailsSendingdomainsV1SendingDomain_universal_d_Status as Status,
      emailsSendingdomainsV1SendingDomain_universal_d_DnsRecord as DnsRecord,
      emailsSendingdomainsV1SendingDomain_universal_d_CreateSendingDomainRequest as CreateSendingDomainRequest,
      emailsSendingdomainsV1SendingDomain_universal_d_CreateSendingDomainResponse as CreateSendingDomainResponse,
      emailsSendingdomainsV1SendingDomain_universal_d_GetSendingDomainRequest as GetSendingDomainRequest,
      emailsSendingdomainsV1SendingDomain_universal_d_GetSendingDomainResponse as GetSendingDomainResponse,
      emailsSendingdomainsV1SendingDomain_universal_d_QuerySendingDomainsRequest as QuerySendingDomainsRequest,
      emailsSendingdomainsV1SendingDomain_universal_d_CursorQuery as CursorQuery,
      emailsSendingdomainsV1SendingDomain_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      emailsSendingdomainsV1SendingDomain_universal_d_Sorting as Sorting,
      emailsSendingdomainsV1SendingDomain_universal_d_SortOrder as SortOrder,
      emailsSendingdomainsV1SendingDomain_universal_d_CursorPaging as CursorPaging,
      emailsSendingdomainsV1SendingDomain_universal_d_QuerySendingDomainsResponse as QuerySendingDomainsResponse,
      emailsSendingdomainsV1SendingDomain_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      emailsSendingdomainsV1SendingDomain_universal_d_Cursors as Cursors,
      emailsSendingdomainsV1SendingDomain_universal_d_AuthenticateSendingDomainRequest as AuthenticateSendingDomainRequest,
      emailsSendingdomainsV1SendingDomain_universal_d_AuthenticateSendingDomainResponse as AuthenticateSendingDomainResponse,
      emailsSendingdomainsV1SendingDomain_universal_d_IsEmailUsableAsFromAddressRequest as IsEmailUsableAsFromAddressRequest,
      emailsSendingdomainsV1SendingDomain_universal_d_IsEmailUsableAsFromAddressResponse as IsEmailUsableAsFromAddressResponse,
      emailsSendingdomainsV1SendingDomain_universal_d_DomainEvent as DomainEvent,
      emailsSendingdomainsV1SendingDomain_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      emailsSendingdomainsV1SendingDomain_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      emailsSendingdomainsV1SendingDomain_universal_d_RestoreInfo as RestoreInfo,
      emailsSendingdomainsV1SendingDomain_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      emailsSendingdomainsV1SendingDomain_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      emailsSendingdomainsV1SendingDomain_universal_d_ActionEvent as ActionEvent,
      emailsSendingdomainsV1SendingDomain_universal_d_Empty as Empty,
      emailsSendingdomainsV1SendingDomain_universal_d_MessageEnvelope as MessageEnvelope,
      emailsSendingdomainsV1SendingDomain_universal_d_IdentificationData as IdentificationData,
      emailsSendingdomainsV1SendingDomain_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      emailsSendingdomainsV1SendingDomain_universal_d_WebhookIdentityType as WebhookIdentityType,
      emailsSendingdomainsV1SendingDomain_universal_d_createSendingDomain as createSendingDomain,
      emailsSendingdomainsV1SendingDomain_universal_d_getSendingDomain as getSendingDomain,
      emailsSendingdomainsV1SendingDomain_universal_d_querySendingDomains as querySendingDomains,
      emailsSendingdomainsV1SendingDomain_universal_d_SendingDomainsQueryResult as SendingDomainsQueryResult,
      emailsSendingdomainsV1SendingDomain_universal_d_SendingDomainsQueryBuilder as SendingDomainsQueryBuilder,
      emailsSendingdomainsV1SendingDomain_universal_d_authenticateSendingDomain as authenticateSendingDomain,
    };
  }
  
  export { emailsSendingdomainsV1SendingDomain_universal_d as sendingDomains };
}
