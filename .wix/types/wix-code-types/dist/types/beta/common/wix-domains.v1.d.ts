declare module "wix-domains.v1" {
  /** A `connectedDomain` object holds information about an external domain and its connection to a Wix site. */
  interface ConnectedDomain {
      /**
       * ID of the connected domain. Identical to the domain name including TLD.
       * @readonly
       */
      _id?: string;
      /**
       * Domain name including TLD.
       * Both root domains and subdomains are supported.
       */
      domain?: string;
      /**
       * How the domain is connected to the Wix site.
       *
       * + `"UNKNOWN_CONNECTION_TYPE"`: There is no information about the connection type.
       * + `"POINTING"`: The domain is connected by pointing. Wix doesn't manage DNS information.
       * + `"NAMESERVERS"`: The domain is connected by nameservers. Wix manages DNS information.
       * + `"HIDDEN"`: The domain isn't visible to site visitors.
       */
      connectionType?: ConnectionType$1;
      /**
       * Information about the site to which the domain is assigned, and whether
       * it's the primary domain or a redirect.
       */
      siteInfo?: SiteInfo$1;
      /**
       * Whether the site owner receives standard email notifications from Wix about
       * the connected domain.
       *
       * Default: `false`
       */
      suppressNotifications?: boolean;
      /**
       * DNS propagation status.
       *
       * + `"UNKNOWN_DNS_PROPAGATION_STATUS"`: There's no information about the domain's DNS propagation status.
       * + `"IN_PROGRESS"`: The domain's DNS propagation process has started but hasn't successfully completed yet.
       * + `"COMPLETED"`: The domain's DNS propagation process has successfully finished.
       * + `"FAILED"`: The domain's DNS propagation process has failed.
       * @readonly
       */
      dnsPropagationStatus?: DnsPropagationStatus$1;
      /**
       * Date and time the `connectedDomain` object was created in
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the `connectedDomain` object was last updated in
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  enum ConnectionType$1 {
      /** Used by sub domain */
      UNKNOWN_CONNECTION_TYPE = "UNKNOWN_CONNECTION_TYPE",
      POINTING = "POINTING",
      NAMESERVERS = "NAMESERVERS",
      /**
       * internal used by photography company.
       * when a customer creates a photo album, each album has its sub domain and this sub domain
       * is not visible in my domains page.
       */
      HIDDEN = "HIDDEN"
  }
  interface SiteInfo$1 extends SiteInfoAssignmentInfoOneOf$1 {
      /**
       * Redirect information, relevant when `assignmentType` = `REDIRECT`.
       * @readonly
       */
      redirectInfo?: RedirectAssignmentInfo$1;
      /**
       * ID of the site to which the domain is assigned.
       * @readonly
       */
      _id?: string | null;
      /**
       * The relationship assigned for this domain to the site:
       * + `"UNKNOWN_ASSIGNMENT_TYPE"`: There is no information about the domain assignment type.
       * + `"PRIMARY"`: The singular primary domain for a site. When this type is assigned, this domain will lead directly to the site.
       * + `"REDIRECT"`: A redirect domain for a site. Each site can have multiple redirect domains. When this type is assigned, this domain will redirect to the primary domain.
       * Read more about [primary and redirected domains](https://support.wix.com/en/article/switching-your-primary-and-redirected-domains).
       */
      assignmentType?: AssignmentType$1;
  }
  /** @oneof */
  interface SiteInfoAssignmentInfoOneOf$1 {
      /**
       * Redirect information, relevant when `assignmentType` = `REDIRECT`.
       * @readonly
       */
      redirectInfo?: RedirectAssignmentInfo$1;
  }
  enum AssignmentType$1 {
      UNKNOWN_ASSIGNMENT_TYPE = "UNKNOWN_ASSIGNMENT_TYPE",
      PRIMARY = "PRIMARY",
      REDIRECT = "REDIRECT"
  }
  interface RedirectAssignmentInfo$1 {
      /**
       * Primary domain to which this domain will redirect.
       * @readonly
       */
      primaryDomain?: string;
  }
  enum DnsPropagationStatus$1 {
      UNKNOWN_DNS_PROPAGATION_STATUS = "UNKNOWN_DNS_PROPAGATION_STATUS",
      COMPLETED = "COMPLETED",
      FAILED = "FAILED",
      IN_PROGRESS = "IN_PROGRESS"
  }
  interface DomainRemovedEvent$1 {
      /**
       * Domain name including TLD.
       * Both root domains and subdomains are supported.
       */
      domain?: string;
  }
  interface CreateConnectedDomainRequest {
      /** Domain to connect. */
      connectedDomain: ConnectedDomain;
      /**
       * used for BI event to distinguish between connect from entri and manual
       * @internal
       */
      connectedByEntri?: boolean;
  }
  interface CreateConnectedDomainResponse {
      /** Connected domain. */
      connectedDomain?: ConnectedDomain;
  }
  interface GetConnectedDomainRequest {
      /** ID of the connected domain. Identical to the domain name including TLD. */
      connectedDomainId: string;
  }
  interface GetConnectedDomainResponse {
      /** Retrieved connected domain. */
      connectedDomain?: ConnectedDomain;
  }
  interface DeleteConnectedDomainRequest {
      /** ID of the connected domain to delete. Identical to the domain name including TLD. */
      connectedDomainId: string;
  }
  interface DeleteConnectedDomainResponse {
  }
  interface ListConnectedDomainsRequest {
      /** Cursor paging options. */
      paging?: CursorPaging$2;
  }
  interface CursorPaging$2 {
      /**
       * Number of domains to load.
       *
       * Min: `0`
       * Max: `100`
       */
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
  interface ListConnectedDomainsResponse {
      /** Metadata about the returned list of connected domains. */
      pagingMetadata?: CursorPagingMetadata$2;
      /** Retrieved connected domains. */
      connectedDomains?: ConnectedDomain[];
  }
  interface CursorPagingMetadata$2 {
      /** Number of domains returned in the response. */
      count?: number | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
      cursors?: Cursors$2;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$2 {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface DomainEvent$2 extends DomainEventBodyOneOf$2 {
      createdEvent?: EntityCreatedEvent$2;
      updatedEvent?: EntityUpdatedEvent$2;
      deletedEvent?: EntityDeletedEvent$2;
      actionEvent?: ActionEvent$2;
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
  interface DomainEventBodyOneOf$2 {
      createdEvent?: EntityCreatedEvent$2;
      updatedEvent?: EntityUpdatedEvent$2;
      deletedEvent?: EntityDeletedEvent$2;
      actionEvent?: ActionEvent$2;
  }
  interface EntityCreatedEvent$2 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$2;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$2 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$2 {
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
  interface EntityDeletedEvent$2 {
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
  interface ActionEvent$2 {
      bodyAsJson?: string;
  }
  interface MessageEnvelope$2 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$2;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$2 extends IdentificationDataIdOneOf$2 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$2;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$2 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$2 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Creates a `connectedDomain` object and starts the domain connection process. It may take up to 48 hours for the DNS changes to take effect.
   *
   *  You must pass the relevant Wix account ID in the header of the call. You may also pass a Wix site ID in the header.
   *
   *  You can only connect external domains using this endpoint.
   *
   *  You can connect both root domains and subdomains to Wix sites.
   *
   *  The domain can be assigned as a primary domain or a redirect. You can read more about [primary and redirected domains](https://support.wix.com/en/article/switching-your-primary-and-redirected-domains). If you connect a domain as `"PRIMARY"` to a Wix site, the existing primary domain automatically becomes unassigned.
   *
   * > **Important:** This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param connectedDomain - Domain to connect.
   * @public
   * @requiredField connectedDomain
   * @requiredField connectedDomain.domain
   * @permissionId DOMAINS.MANAGE_CONNECTED_DOMAINS
   * @adminMethod
   * @returns Connected domain.
   */
  function createConnectedDomain(connectedDomain: ConnectedDomain, options?: CreateConnectedDomainOptions): Promise<ConnectedDomain>;
  interface CreateConnectedDomainOptions {
      /**
       * used for BI event to distinguish between connect from entri and manual
       * @internal
       */
      connectedByEntri?: boolean;
  }
  /**
   * Retrieves a connected domain.
   *
   *
   * You must pass the relevant Wix account ID in the header of the call.
   *
   * > __Important:__ This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param connectedDomainId - ID of the connected domain. Identical to the domain name including TLD.
   * @public
   * @requiredField connectedDomainId
   * @permissionId DOMAINS.READ_CONNECTED_DOMAINS
   * @adminMethod
   * @returns Retrieved connected domain.
   */
  function getConnectedDomain(connectedDomainId: string): Promise<ConnectedDomain>;
  /**
   * Deletes a `connectedDomain` object and removes related DNS records from
   * [Google's Cloud DNS](https://cloud.google.com/dns).
   *
   *
   * You must pass the relevant Wix account ID in the header of the call.
   *
   * If you delete a `"PRIMARY"` domain, the site automatically uses the standard
   * URL for free Wix sites. Read more about
   * [URLs of free Wix sites](https://support.wix.com/en/article/changing-your-free-wix-url-8591528).
   *
   * When you delete a subdomain, its CNAME record is deleted from Google's Cloud DNS.
   *
   * > __Important:__ This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param connectedDomainId - ID of the connected domain to delete. Identical to the domain name including TLD.
   * @public
   * @requiredField connectedDomainId
   * @permissionId DOMAINS.MANAGE_CONNECTED_DOMAINS
   * @adminMethod
   */
  function deleteConnectedDomain(connectedDomainId: string): Promise<void>;
  /**
   * Retrieves a list of up to 100 connected domains.
   *
   *
   * You must pass the relevant Wix account ID in the header of the call.
   *
   * The retrieved domains are sorted by `createdDate` in descending order.
   *
   * > __Important:__ This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @public
   * @param options - Filter options.
   * @permissionId DOMAINS.READ_CONNECTED_DOMAINS
   * @adminMethod
   */
  function listConnectedDomains(options?: ListConnectedDomainsOptions): Promise<ListConnectedDomainsResponse>;
  interface ListConnectedDomainsOptions {
      /** Cursor paging options. */
      paging?: CursorPaging$2;
  }
  
  type premiumDomainsV1ConnectedDomain_universal_d_ConnectedDomain = ConnectedDomain;
  type premiumDomainsV1ConnectedDomain_universal_d_CreateConnectedDomainRequest = CreateConnectedDomainRequest;
  type premiumDomainsV1ConnectedDomain_universal_d_CreateConnectedDomainResponse = CreateConnectedDomainResponse;
  type premiumDomainsV1ConnectedDomain_universal_d_GetConnectedDomainRequest = GetConnectedDomainRequest;
  type premiumDomainsV1ConnectedDomain_universal_d_GetConnectedDomainResponse = GetConnectedDomainResponse;
  type premiumDomainsV1ConnectedDomain_universal_d_DeleteConnectedDomainRequest = DeleteConnectedDomainRequest;
  type premiumDomainsV1ConnectedDomain_universal_d_DeleteConnectedDomainResponse = DeleteConnectedDomainResponse;
  type premiumDomainsV1ConnectedDomain_universal_d_ListConnectedDomainsRequest = ListConnectedDomainsRequest;
  type premiumDomainsV1ConnectedDomain_universal_d_ListConnectedDomainsResponse = ListConnectedDomainsResponse;
  const premiumDomainsV1ConnectedDomain_universal_d_createConnectedDomain: typeof createConnectedDomain;
  type premiumDomainsV1ConnectedDomain_universal_d_CreateConnectedDomainOptions = CreateConnectedDomainOptions;
  const premiumDomainsV1ConnectedDomain_universal_d_getConnectedDomain: typeof getConnectedDomain;
  const premiumDomainsV1ConnectedDomain_universal_d_deleteConnectedDomain: typeof deleteConnectedDomain;
  const premiumDomainsV1ConnectedDomain_universal_d_listConnectedDomains: typeof listConnectedDomains;
  type premiumDomainsV1ConnectedDomain_universal_d_ListConnectedDomainsOptions = ListConnectedDomainsOptions;
  namespace premiumDomainsV1ConnectedDomain_universal_d {
    export {
      premiumDomainsV1ConnectedDomain_universal_d_ConnectedDomain as ConnectedDomain,
      ConnectionType$1 as ConnectionType,
      SiteInfo$1 as SiteInfo,
      SiteInfoAssignmentInfoOneOf$1 as SiteInfoAssignmentInfoOneOf,
      AssignmentType$1 as AssignmentType,
      RedirectAssignmentInfo$1 as RedirectAssignmentInfo,
      DnsPropagationStatus$1 as DnsPropagationStatus,
      DomainRemovedEvent$1 as DomainRemovedEvent,
      premiumDomainsV1ConnectedDomain_universal_d_CreateConnectedDomainRequest as CreateConnectedDomainRequest,
      premiumDomainsV1ConnectedDomain_universal_d_CreateConnectedDomainResponse as CreateConnectedDomainResponse,
      premiumDomainsV1ConnectedDomain_universal_d_GetConnectedDomainRequest as GetConnectedDomainRequest,
      premiumDomainsV1ConnectedDomain_universal_d_GetConnectedDomainResponse as GetConnectedDomainResponse,
      premiumDomainsV1ConnectedDomain_universal_d_DeleteConnectedDomainRequest as DeleteConnectedDomainRequest,
      premiumDomainsV1ConnectedDomain_universal_d_DeleteConnectedDomainResponse as DeleteConnectedDomainResponse,
      premiumDomainsV1ConnectedDomain_universal_d_ListConnectedDomainsRequest as ListConnectedDomainsRequest,
      CursorPaging$2 as CursorPaging,
      premiumDomainsV1ConnectedDomain_universal_d_ListConnectedDomainsResponse as ListConnectedDomainsResponse,
      CursorPagingMetadata$2 as CursorPagingMetadata,
      Cursors$2 as Cursors,
      DomainEvent$2 as DomainEvent,
      DomainEventBodyOneOf$2 as DomainEventBodyOneOf,
      EntityCreatedEvent$2 as EntityCreatedEvent,
      RestoreInfo$2 as RestoreInfo,
      EntityUpdatedEvent$2 as EntityUpdatedEvent,
      EntityDeletedEvent$2 as EntityDeletedEvent,
      ActionEvent$2 as ActionEvent,
      MessageEnvelope$2 as MessageEnvelope,
      IdentificationData$2 as IdentificationData,
      IdentificationDataIdOneOf$2 as IdentificationDataIdOneOf,
      WebhookIdentityType$2 as WebhookIdentityType,
      premiumDomainsV1ConnectedDomain_universal_d_createConnectedDomain as createConnectedDomain,
      premiumDomainsV1ConnectedDomain_universal_d_CreateConnectedDomainOptions as CreateConnectedDomainOptions,
      premiumDomainsV1ConnectedDomain_universal_d_getConnectedDomain as getConnectedDomain,
      premiumDomainsV1ConnectedDomain_universal_d_deleteConnectedDomain as deleteConnectedDomain,
      premiumDomainsV1ConnectedDomain_universal_d_listConnectedDomains as listConnectedDomains,
      premiumDomainsV1ConnectedDomain_universal_d_ListConnectedDomainsOptions as ListConnectedDomainsOptions,
    };
  }
  
  /**
   * A `connectedDomainSetupInfo` object holds information the connected domain's
   * external registrar and some DNS records. You can use this information to guide
   * the site owner through the domain's setup process.
   */
  interface ConnectedDomainSetupInfo extends ConnectedDomainSetupInfoDnsRecordsOneOf {
      /**
       * Information about domains connected using nameservers. Available only for
       * `{"connectionType": "NAMESERVERS"}`.
       */
      nameserverRecord?: NameserverRecord;
      /**
       * Information about domains connected by pointing.  Available only for
       * `{"connectionType": "POINTING"}`.
       * @readonly
       */
      pointingRecords?: PointingRecords;
      /**
       * Information about subdomains.  Available only for subdomains.
       * @readonly
       */
      subdomainRecords?: SubdomainRecords;
      /** ID of the connected domain. Identical to the domain name including TLD. */
      connectedDomainId?: string;
      /**
       * Information about the external domain registrar including current name
       * servers.
       */
      registrar?: Registrar;
  }
  /** @oneof */
  interface ConnectedDomainSetupInfoDnsRecordsOneOf {
      /**
       * Information about domains connected using nameservers. Available only for
       * `{"connectionType": "NAMESERVERS"}`.
       */
      nameserverRecord?: NameserverRecord;
      /**
       * Information about domains connected by pointing.  Available only for
       * `{"connectionType": "POINTING"}`.
       * @readonly
       */
      pointingRecords?: PointingRecords;
      /**
       * Information about subdomains.  Available only for subdomains.
       * @readonly
       */
      subdomainRecords?: SubdomainRecords;
  }
  interface Registrar {
      /**
       * Name of the external domain registrar. For subdomains it's the registrar of the root domain.
       * @readonly
       */
      name?: string | null;
      /**
       * Values of the current name server records. In case you connect an external
       * domain using name servers, site owners must replace these current name servers
       * with the new name servers found in `connectedDomainSetupInfo.nameserverRecord.nsRecord.values`
       * during the initial domain setup.
       * The replacement can't be performed through Wix APIs, you must use the
       * infrastructure of the external domain registrar. Read more about
       * [connecting domains using nameservers](https://dev.wix.com/api/rest/account-level-apis/connected-domains/sample-flows#account-level-apis_connected-domains_sample-flows_connect-an-external-domain-using-nameservers).
       * @readonly
       */
      nameServers?: string[];
  }
  /** Information about domains connected by nameservers. */
  interface NameserverRecord {
      /**
       * Default [nameserver record](https://en.wikipedia.org/wiki/List_of_DNS_record_types#NS).
       * @readonly
       */
      nsRecord?: NsRecord;
  }
  interface NsRecord {
      /** Domain host name. For example `domain.com` or `mail.domain.com`. Can be a subdomain. */
      hostName?: string;
      /** [Time to live](https://en.wikipedia.org/wiki/Time_to_live) in seconds. */
      ttl?: number;
      /** DNS record values. */
      values?: string[];
  }
  /** Information about domains connected by pointing. */
  interface PointingRecords {
      /**
       * [Address record](https://en.wikipedia.org/wiki/List_of_DNS_record_types#A).
       * @readonly
       */
      aRecord?: ARecord;
      /**
       * [Canonical Name record](https://en.wikipedia.org/wiki/CNAME_record).
       * @readonly
       */
      cnameRecord?: CnameRecord;
  }
  interface ARecord {
      /** Domain host name. For example `domain.com` or `mail.domain.com`. Can be a subdomain. */
      hostName?: string;
      /** [Time to live](https://en.wikipedia.org/wiki/Time_to_live) in seconds. */
      ttl?: number;
      /** DNS record values. */
      values?: string[];
  }
  interface CnameRecord {
      /** Domain host name. For example `domain.com` or `mail.domain.com`. Can be a subdomain. */
      hostName?: string;
      /** [Time to live](https://en.wikipedia.org/wiki/Time_to_live) in seconds. */
      ttl?: number;
      /** DNS record value. */
      value?: string;
  }
  /** Information about subdomains. */
  interface SubdomainRecords {
      /**
       * [Canonical Name records](https://en.wikipedia.org/wiki/CNAME_record).
       * @readonly
       */
      cnameRecords?: CnameRecord[];
  }
  interface GetSetupInfoRequest {
      /** Domain name including TLD */
      domain: string;
      /**
       * How the domain should be to connected the Wix site.
       *
       * + `"UNKNOWN_CONNECTION_TYPE"`: supported only for subdomain.
       * + `"POINTING"`: Get domain or subdomain setup by pointing
       * + `"NAMESERVERS"`: Get domain setup by nameservers
       * + `"HIDDEN"`: supported only for subdomain.
       */
      connectionType?: ConnectionType;
      /** Whether to return registrar information or not. Default is false. */
      includeRegistrar?: boolean;
  }
  enum ConnectionType {
      /** Used by sub domain */
      UNKNOWN_CONNECTION_TYPE = "UNKNOWN_CONNECTION_TYPE",
      POINTING = "POINTING",
      NAMESERVERS = "NAMESERVERS",
      /**
       * internal used by photography company.
       * when a customer creates a photo album, each album has its sub domain and this sub domain
       * is not visible in my domains page.
       */
      HIDDEN = "HIDDEN"
  }
  interface GetSetupInfoResponse {
      /** Retrieved setup information. */
      domainSetupInfo?: ConnectedDomainSetupInfo;
  }
  interface PreCreateConnectedDomainRequest {
      /** Domain name including TLD */
      domain?: string;
  }
  interface PreCreateConnectedDomainResponse {
  }
  interface GetConnectedDomainSetupInfoRequest {
      /**
       * ID of the connected domain to retrieve setup information for.
       * Identical to the domain name including TLD.
       */
      connectedDomainId: string;
  }
  interface GetConnectedDomainSetupInfoResponse {
      /** Retrieved setup information. */
      connectedDomainSetupInfo?: ConnectedDomainSetupInfo;
  }
  /** @param domain - Domain name including TLD
   * @internal
   * @documentationMaturity preview
   * @requiredField domain
   * @permissionId DOMAINS.READ_CONNECTED_DOMAINS
   * @adminMethod
   */
  function getSetupInfo(domain: string, options?: GetSetupInfoOptions): Promise<GetSetupInfoResponse>;
  interface GetSetupInfoOptions {
      /**
       * How the domain should be to connected the Wix site.
       *
       * + `"UNKNOWN_CONNECTION_TYPE"`: supported only for subdomain.
       * + `"POINTING"`: Get domain or subdomain setup by pointing
       * + `"NAMESERVERS"`: Get domain setup by nameservers
       * + `"HIDDEN"`: supported only for subdomain.
       */
      connectionType?: ConnectionType;
      /** Whether to return registrar information or not. Default is false. */
      includeRegistrar?: boolean;
  }
  /**
   * Retrieves information for the initial setup of a connected domain.
   *
   *
   * You must pass the relevant Wix account ID in the header of the call.
   *
   * > __Important:__ This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param connectedDomainId - ID of the connected domain to retrieve setup information for.
   * Identical to the domain name including TLD.
   * @public
   * @requiredField connectedDomainId
   * @permissionId DOMAINS.READ_CONNECTED_DOMAINS
   * @adminMethod
   * @returns Retrieved setup information.
   */
  function getConnectedDomainSetupInfo(connectedDomainId: string): Promise<ConnectedDomainSetupInfo>;
  
  type premiumDomainsV1ConnectedDomainSetupInfo_universal_d_ConnectedDomainSetupInfo = ConnectedDomainSetupInfo;
  type premiumDomainsV1ConnectedDomainSetupInfo_universal_d_ConnectedDomainSetupInfoDnsRecordsOneOf = ConnectedDomainSetupInfoDnsRecordsOneOf;
  type premiumDomainsV1ConnectedDomainSetupInfo_universal_d_Registrar = Registrar;
  type premiumDomainsV1ConnectedDomainSetupInfo_universal_d_NameserverRecord = NameserverRecord;
  type premiumDomainsV1ConnectedDomainSetupInfo_universal_d_NsRecord = NsRecord;
  type premiumDomainsV1ConnectedDomainSetupInfo_universal_d_PointingRecords = PointingRecords;
  type premiumDomainsV1ConnectedDomainSetupInfo_universal_d_ARecord = ARecord;
  type premiumDomainsV1ConnectedDomainSetupInfo_universal_d_CnameRecord = CnameRecord;
  type premiumDomainsV1ConnectedDomainSetupInfo_universal_d_SubdomainRecords = SubdomainRecords;
  type premiumDomainsV1ConnectedDomainSetupInfo_universal_d_GetSetupInfoRequest = GetSetupInfoRequest;
  type premiumDomainsV1ConnectedDomainSetupInfo_universal_d_ConnectionType = ConnectionType;
  const premiumDomainsV1ConnectedDomainSetupInfo_universal_d_ConnectionType: typeof ConnectionType;
  type premiumDomainsV1ConnectedDomainSetupInfo_universal_d_GetSetupInfoResponse = GetSetupInfoResponse;
  type premiumDomainsV1ConnectedDomainSetupInfo_universal_d_PreCreateConnectedDomainRequest = PreCreateConnectedDomainRequest;
  type premiumDomainsV1ConnectedDomainSetupInfo_universal_d_PreCreateConnectedDomainResponse = PreCreateConnectedDomainResponse;
  type premiumDomainsV1ConnectedDomainSetupInfo_universal_d_GetConnectedDomainSetupInfoRequest = GetConnectedDomainSetupInfoRequest;
  type premiumDomainsV1ConnectedDomainSetupInfo_universal_d_GetConnectedDomainSetupInfoResponse = GetConnectedDomainSetupInfoResponse;
  const premiumDomainsV1ConnectedDomainSetupInfo_universal_d_getSetupInfo: typeof getSetupInfo;
  type premiumDomainsV1ConnectedDomainSetupInfo_universal_d_GetSetupInfoOptions = GetSetupInfoOptions;
  const premiumDomainsV1ConnectedDomainSetupInfo_universal_d_getConnectedDomainSetupInfo: typeof getConnectedDomainSetupInfo;
  namespace premiumDomainsV1ConnectedDomainSetupInfo_universal_d {
    export {
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_ConnectedDomainSetupInfo as ConnectedDomainSetupInfo,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_ConnectedDomainSetupInfoDnsRecordsOneOf as ConnectedDomainSetupInfoDnsRecordsOneOf,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_Registrar as Registrar,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_NameserverRecord as NameserverRecord,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_NsRecord as NsRecord,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_PointingRecords as PointingRecords,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_ARecord as ARecord,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_CnameRecord as CnameRecord,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_SubdomainRecords as SubdomainRecords,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_GetSetupInfoRequest as GetSetupInfoRequest,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_ConnectionType as ConnectionType,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_GetSetupInfoResponse as GetSetupInfoResponse,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_PreCreateConnectedDomainRequest as PreCreateConnectedDomainRequest,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_PreCreateConnectedDomainResponse as PreCreateConnectedDomainResponse,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_GetConnectedDomainSetupInfoRequest as GetConnectedDomainSetupInfoRequest,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_GetConnectedDomainSetupInfoResponse as GetConnectedDomainSetupInfoResponse,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_getSetupInfo as getSetupInfo,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_GetSetupInfoOptions as GetSetupInfoOptions,
      premiumDomainsV1ConnectedDomainSetupInfo_universal_d_getConnectedDomainSetupInfo as getConnectedDomainSetupInfo,
    };
  }
  
  /** DNS zones hold information about the records that map a domain's URL to an IP address. */
  interface DnsZone {
      /** Domain name including the TLD. Both root domains and subdomains are supported. */
      domainName?: string;
      /**
       * DNS records. You can only set up a single `record` object per DNS record
       * type. If you want to specify multiple values for the same record type, you
       * must save them in the `values` for the relevant type.
       *
       * Min: 2 DNS record - a DNS zone file has to have at least two required DNS records: NS and SOA records
       * Max: 5000 DNS records
       */
      records?: DnsRecord[];
      /**
       * ID of the Dns Zone. Identical to the domain name including TLD.
       * @readonly
       */
      _id?: string;
      /**
       * Whether [DNS Security Extensions (DNSSEC)](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions)
       * are enabled.
       *
       * Default: `false`
       */
      dnssecEnabled?: boolean;
      /**
       * Information about [DNSSEC](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions).
       * Available only if `{"dnssecEnabled": true}`.
       * @readonly
       */
      dnssecInfo?: DnssecInfo;
  }
  interface DnsRecord {
      /**
       * [DNS record type](https://en.wikipedia.org/wiki/List_of_DNS_record_types).
       *
       * + `UNKNOWN`: Default value. Used in case the record type isn't known. You can't set a record type to `UNKNOWN`.
       * + `A`: Address record. Most fundamental type of DNS record that indicates the IP address of a given domain.
       * + `AAAA`: Address record in [IPv6 format](https://en.wikipedia.org/wiki/IPv6).
       * + `NS`: Name server record. Describes which server contains the actual DNS record.
       * + `SOA`: [Start of authority record](https://en.wikipedia.org/wiki/SOA_record). Holds adminstrative information about the zone.
       * + `CNAME`: [CNAME record](https://en.wikipedia.org/wiki/CNAME_record). Maps an alias name to the canonical domain name.
       * + `MX`: MX record. Directs emails to mail servers.
       * + `TXT`: [TXT record](https://en.wikipedia.org/wiki/TXT_record). Used by domain admins to add human readable descriptions.
       * + `SPF`: SPF record. Used for email authentication.
       * + `SRV`: [Service record](https://en.wikipedia.org/wiki/SRV_record). Defines the server location.
       * + `PTR`: Pointer record. Specifies which host is supported for a given IP address.
       * + `NAPTR`: [Name Authority Pointer record](https://en.wikipedia.org/wiki/NAPTR_record). Used by Internet telephony applications.
       */
      type?: RecordType;
      /**
       * Host name. Can be a subdomain. For example, `domain.com` or
       * `mail.domain.com`. Equal to the domain name, except for `CNAME` records.
       */
      hostName?: string;
      /** [Time to live](https://en.wikipedia.org/wiki/Time_to_live) in seconds. */
      ttl?: number;
      /**
       * DNS record values. Wix limits DNS records to 50 values per type. External
       * providers may support a different maximum number of DNS records for a
       * specific type, Wix doesn't validate that you don't exceed these external
       * limits.
       *
       * Max: 50 records
       */
      values?: string[];
  }
  enum RecordType {
      UNKNOWN = "UNKNOWN",
      A = "A",
      AAAA = "AAAA",
      NS = "NS",
      SOA = "SOA",
      CNAME = "CNAME",
      MX = "MX",
      TXT = "TXT",
      SPF = "SPF",
      SRV = "SRV",
      PTR = "PTR",
      NAPTR = "NAPTR"
  }
  interface DnssecInfo {
      /**
       * Unique 16-bit identifier for a [DNSKEY](https://cloud.google.com/dns/docs/reference/rest/v1/dnsKeys)
       * record that allows efficient DNSSEC validation in zones with multiple keys.
       */
      keyTag?: number;
      /**
       * Cryptographic hash of the [DNSKEY](https://cloud.google.com/dns/docs/reference/rest/v1/dnsKeys)
       * record that's included in the delegation signer (DS) record and ensures secure
       * DNSSEC validation.
       */
      digest?: string;
  }
  interface DnsRecordsChangedEvent {
      domainName?: string;
      changeTime?: Date | null;
  }
  interface DomainRemovedEvent {
      /**
       * Domain name including TLD.
       * Both root domains and subdomains are supported.
       */
      domain?: string;
  }
  interface CreateDnsZoneRequest {
      /** DNS zone to create. */
      dnsZone: DnsZone;
  }
  interface CreateDnsZoneResponse {
      /** Created DNS zone. */
      dnsZone?: DnsZone;
  }
  interface GetDnsZoneRequest {
      /** Domain to retrieve the DNS zone for. */
      domainName: string;
  }
  interface GetDnsZoneResponse {
      /** Retrieved DNS zone. */
      dnsZone?: DnsZone;
  }
  interface UpdateDnsZoneRequest {
      /** Domain to update the DNS zone for. Must include the TLD. */
      domainName: string;
      /**
       * DNS records to add to the DNS zone.
       *
       * Max: 10 additions
       */
      additions?: DnsRecord[];
      /**
       * DNS records to remove from the DNS zone.
       *
       * Max: 10 deletions
       */
      deletions?: DnsRecord[];
      /** Whether you want to enable or disable [DNS Security Extensions (DNSSEC)](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions). */
      dnssecEnabled?: boolean | null;
  }
  interface UpdateDnsZoneResponse {
      /** Updated DNS zone. */
      dnsZone?: DnsZone;
  }
  interface DeleteDnsZoneRequest {
      /** Domain name to delete the DNS zone for. */
      domainName: string;
  }
  interface DeleteDnsZoneResponse {
  }
  interface PreviewDnsZoneRequest {
      /** Domain name to generate a DNS zone preview for. */
      domainName: string;
  }
  interface PreviewDnsZoneResponse {
      /**
       * DNS zone preview.
       *
       * Includes calculated `A`, `CNAME`, `NS` and `SOA` records.
       */
      dnsZone?: DnsZone;
  }
  interface DomainEvent$1 extends DomainEventBodyOneOf$1 {
      createdEvent?: EntityCreatedEvent$1;
      updatedEvent?: EntityUpdatedEvent$1;
      deletedEvent?: EntityDeletedEvent$1;
      actionEvent?: ActionEvent$1;
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
  interface DomainEventBodyOneOf$1 {
      createdEvent?: EntityCreatedEvent$1;
      updatedEvent?: EntityUpdatedEvent$1;
      deletedEvent?: EntityDeletedEvent$1;
      actionEvent?: ActionEvent$1;
  }
  interface EntityCreatedEvent$1 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$1;
  }
  interface RestoreInfo$1 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$1 {
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
  interface EntityDeletedEvent$1 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
  }
  interface ActionEvent$1 {
      bodyAsJson?: string;
  }
  interface MessageEnvelope$1 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$1;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$1 extends IdentificationDataIdOneOf$1 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$1;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$1 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$1 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Creates a DNS zone in [Google's Cloud DNS](https://cloud.google.com/dns).
   *
   *
   * If there is an existing DNS zone for the domain, it's deleted before
   * the new zone is created.
   *
   * The call is synchronous, that means it fails in case of an error on
   * Google's side.
   *
   * You can only set up a single `record` object per DNS record
   * type. If you want to specify multiple values for the same record type, you
   * must save them in the `values` for the relevant type.
   *
   * > __Important:__ This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param dnsZone - DNS zone to create.
   * @public
   * @requiredField dnsZone
   * @requiredField dnsZone.domainName
   * @requiredField dnsZone.records.hostName
   * @requiredField dnsZone.records.type
   * @permissionId DOMAINS.MANAGE_DNS_ZONES
   * @adminMethod
   * @returns Created DNS zone.
   */
  function createDnsZone(dnsZone: DnsZone): Promise<DnsZone>;
  /**
   * Retrieves the DNS zone belonging to the domain from
   * [Google's Cloud DNS](https://cloud.google.com/dns).
   *
   *
   * > __Important:__ This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param domainName - Domain to retrieve the DNS zone for.
   * @public
   * @requiredField domainName
   * @permissionId DOMAINS.READ_DNS_ZONES
   * @adminMethod
   * @returns Retrieved DNS zone.
   */
  function getDnsZone(domainName: string): Promise<DnsZone>;
  /**
   * Adds DNS records to and removes DNS records from a DNS zone in
   * [Google's Cloud DNS](https://cloud.google.com/dns).
   *
   * The call is synchronous, that means it fails in case of an error on
   * Google's side.
   *
   * You can only set up a single `record` object per DNS record
   * type. If you want to specify multiple values for the same record type, you
   * must save them in the `values` for the relevant type. This means, you must
   * delete the relevant record and add a new `addition` object for this type
   * to the request, in case you want to add values for an existing DNS record
   * type.
   *
   * > __Important:__ This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param domainName - Domain to update the DNS zone for. Must include the TLD.
   * @public
   * @requiredField domainName
   * @requiredField options.additions.hostName
   * @requiredField options.additions.type
   * @requiredField options.deletions.hostName
   * @requiredField options.deletions.type
   * @permissionId DOMAINS.MANAGE_DNS_ZONES
   * @adminMethod
   */
  function updateDnsZone(domainName: string, options?: UpdateDnsZoneOptions): Promise<UpdateDnsZoneResponse>;
  interface UpdateDnsZoneOptions {
      /**
       * DNS records to add to the DNS zone.
       *
       * Max: 10 additions
       */
      additions?: DnsRecord[];
      /**
       * DNS records to remove from the DNS zone.
       *
       * Max: 10 deletions
       */
      deletions?: DnsRecord[];
      /** Whether you want to enable or disable [DNS Security Extensions (DNSSEC)](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions). */
      dnssecEnabled?: boolean | null;
  }
  /**
   * Deletes a DNS zone in [Google's Cloud DNS](https://cloud.google.com/dns).
   *
   *
   * The call is synchronous, that means it fails in case of an error on
   * Google's side.
   *
   * > __Important:__ This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param domainName - Domain name to delete the DNS zone for.
   * @public
   * @requiredField domainName
   * @permissionId DOMAINS.MANAGE_DNS_ZONES
   * @adminMethod
   */
  function deleteDnsZone(domainName: string): Promise<void>;
  /**
   * Generates a preview for a DNS zone based on
   * [Google's Cloud DNS](https://cloud.google.com/dns).
   *
   *
   * This includes calculating the `A`, `CNAME`, `NS` and `SOA` records.
   * You can use this information to configure a domain from an external
   * provider, before connecting it to a Wix site.
   *
   * > __Important:__ This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param domainName - Domain name to generate a DNS zone preview for.
   * @public
   * @requiredField domainName
   * @permissionId DOMAINS.READ_DNS_ZONES
   * @adminMethod
   */
  function previewDnsZone(domainName: string): Promise<PreviewDnsZoneResponse>;
  
  type premiumDomainsV1DnsZone_universal_d_DnsZone = DnsZone;
  type premiumDomainsV1DnsZone_universal_d_DnsRecord = DnsRecord;
  type premiumDomainsV1DnsZone_universal_d_RecordType = RecordType;
  const premiumDomainsV1DnsZone_universal_d_RecordType: typeof RecordType;
  type premiumDomainsV1DnsZone_universal_d_DnssecInfo = DnssecInfo;
  type premiumDomainsV1DnsZone_universal_d_DnsRecordsChangedEvent = DnsRecordsChangedEvent;
  type premiumDomainsV1DnsZone_universal_d_DomainRemovedEvent = DomainRemovedEvent;
  type premiumDomainsV1DnsZone_universal_d_CreateDnsZoneRequest = CreateDnsZoneRequest;
  type premiumDomainsV1DnsZone_universal_d_CreateDnsZoneResponse = CreateDnsZoneResponse;
  type premiumDomainsV1DnsZone_universal_d_GetDnsZoneRequest = GetDnsZoneRequest;
  type premiumDomainsV1DnsZone_universal_d_GetDnsZoneResponse = GetDnsZoneResponse;
  type premiumDomainsV1DnsZone_universal_d_UpdateDnsZoneRequest = UpdateDnsZoneRequest;
  type premiumDomainsV1DnsZone_universal_d_UpdateDnsZoneResponse = UpdateDnsZoneResponse;
  type premiumDomainsV1DnsZone_universal_d_DeleteDnsZoneRequest = DeleteDnsZoneRequest;
  type premiumDomainsV1DnsZone_universal_d_DeleteDnsZoneResponse = DeleteDnsZoneResponse;
  type premiumDomainsV1DnsZone_universal_d_PreviewDnsZoneRequest = PreviewDnsZoneRequest;
  type premiumDomainsV1DnsZone_universal_d_PreviewDnsZoneResponse = PreviewDnsZoneResponse;
  const premiumDomainsV1DnsZone_universal_d_createDnsZone: typeof createDnsZone;
  const premiumDomainsV1DnsZone_universal_d_getDnsZone: typeof getDnsZone;
  const premiumDomainsV1DnsZone_universal_d_updateDnsZone: typeof updateDnsZone;
  type premiumDomainsV1DnsZone_universal_d_UpdateDnsZoneOptions = UpdateDnsZoneOptions;
  const premiumDomainsV1DnsZone_universal_d_deleteDnsZone: typeof deleteDnsZone;
  const premiumDomainsV1DnsZone_universal_d_previewDnsZone: typeof previewDnsZone;
  namespace premiumDomainsV1DnsZone_universal_d {
    export {
      premiumDomainsV1DnsZone_universal_d_DnsZone as DnsZone,
      premiumDomainsV1DnsZone_universal_d_DnsRecord as DnsRecord,
      premiumDomainsV1DnsZone_universal_d_RecordType as RecordType,
      premiumDomainsV1DnsZone_universal_d_DnssecInfo as DnssecInfo,
      premiumDomainsV1DnsZone_universal_d_DnsRecordsChangedEvent as DnsRecordsChangedEvent,
      premiumDomainsV1DnsZone_universal_d_DomainRemovedEvent as DomainRemovedEvent,
      premiumDomainsV1DnsZone_universal_d_CreateDnsZoneRequest as CreateDnsZoneRequest,
      premiumDomainsV1DnsZone_universal_d_CreateDnsZoneResponse as CreateDnsZoneResponse,
      premiumDomainsV1DnsZone_universal_d_GetDnsZoneRequest as GetDnsZoneRequest,
      premiumDomainsV1DnsZone_universal_d_GetDnsZoneResponse as GetDnsZoneResponse,
      premiumDomainsV1DnsZone_universal_d_UpdateDnsZoneRequest as UpdateDnsZoneRequest,
      premiumDomainsV1DnsZone_universal_d_UpdateDnsZoneResponse as UpdateDnsZoneResponse,
      premiumDomainsV1DnsZone_universal_d_DeleteDnsZoneRequest as DeleteDnsZoneRequest,
      premiumDomainsV1DnsZone_universal_d_DeleteDnsZoneResponse as DeleteDnsZoneResponse,
      premiumDomainsV1DnsZone_universal_d_PreviewDnsZoneRequest as PreviewDnsZoneRequest,
      premiumDomainsV1DnsZone_universal_d_PreviewDnsZoneResponse as PreviewDnsZoneResponse,
      DomainEvent$1 as DomainEvent,
      DomainEventBodyOneOf$1 as DomainEventBodyOneOf,
      EntityCreatedEvent$1 as EntityCreatedEvent,
      RestoreInfo$1 as RestoreInfo,
      EntityUpdatedEvent$1 as EntityUpdatedEvent,
      EntityDeletedEvent$1 as EntityDeletedEvent,
      ActionEvent$1 as ActionEvent,
      MessageEnvelope$1 as MessageEnvelope,
      IdentificationData$1 as IdentificationData,
      IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf,
      WebhookIdentityType$1 as WebhookIdentityType,
      premiumDomainsV1DnsZone_universal_d_createDnsZone as createDnsZone,
      premiumDomainsV1DnsZone_universal_d_getDnsZone as getDnsZone,
      premiumDomainsV1DnsZone_universal_d_updateDnsZone as updateDnsZone,
      premiumDomainsV1DnsZone_universal_d_UpdateDnsZoneOptions as UpdateDnsZoneOptions,
      premiumDomainsV1DnsZone_universal_d_deleteDnsZone as deleteDnsZone,
      premiumDomainsV1DnsZone_universal_d_previewDnsZone as previewDnsZone,
    };
  }
  
  /**
   * A registered domain is a domain that Wix has registered on behalf of a customer
   * with an external registar.
   */
  interface RegisteredDomain extends RegisteredDomainStatusInfoOneOf {
      /**
       * Information about a domain that hasn't been successfully registered
       * yet. Includes the timestamp of the latest registration attempt.
       * @readonly
       */
      pendingRegistrationInfo?: PendingRegistrationInfo;
      /**
       * Information about a domain that couldn't be registered. Includes
       * failure code and message.
       * @readonly
       */
      failedRegistrationInfo?: FailedRegistrationInfo;
      /**
       * Domain ID. Identical to `domain`.
       * @readonly
       */
      _id?: string;
      /**
       * Name of the domain including TLD.
       * Subdomains aren't supported. You can only register a root domain.
       * Domain name and TLD must be separated by a dot. For example,
       * `my-new-domain.com`. Only alphanumeric characters, hyphens, and dots are
       * supported.
       *
       * Min: 3 characters
       * Max: 63 characters
       */
      domain?: string;
      /**
       * ID of the product instance from the
       * [Resellers API](https://dev.wix.com/docs/rest/api-reference/account-level-apis/resellers/packages-and-product-instances/packages-object)
       * that belongs to the `registeredDomain` object.
       * Your account must own a product that supports the chosen TLD, regardless of
       * whether you want to assign the domain to a site or keep it floating. If
       * you want to assign the domain to a site, the relevant site must also
       * own a Premium plan. Contact the [Wix B2B team](mailto:bizdev@wix.com)
       * for more information about how to become a reseller and a list of available
       * product IDs.
       */
      productInstanceId?: string;
      /**
       * Date and time the `registeredDomain` object was created in
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the `registeredDomain` object was last updated in
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Revision number, which increments by 1 each time the registered domain
       * is updated. To prevent conflicting changes, the current revision must be
       * passed when updating the registered domain.
       *
       * Ignored when creating a registered domain.
       */
      revision?: string | null;
      /**
       * Information about the Wix site the domain is connected to and whether the
       * domain is assigned as the primary domain or a redirect.
       */
      siteInfo?: SiteInfo;
      /**
       * Contact details for the registrant, admin, and tech support of the registered domain.
       * You can read more about which
       * [Contact Field Validations](https://https://dev.wix.com/api/rest/account-level-apis/registered-domains/contact-field-validations)
       * are implemented.
       */
      contacts?: Contacts;
      /**
       * Status of the registered domain.
       *
       * + `"UNKNOWN_STATUS"`: There's no information about the status of the registered domain.
       * + `"PENDING_REGISTRATION"`: Wix has started the domain registration process, but the domain hasn't been successfully registered yet.
       * + `"ACTIVE"`: The domain has been registered successfully and is active.
       * + `"FAILED_REGISTRATION"`: Wix has tried to register the domain, but has stopped the process due to too many failed attempts. Contact the [Wix B2B team](mailto:bizdev@wix.com) for more information.
       * + `"CANCELED"`: The domain has been canceled and isn't active any longer.
       * @readonly
       */
      status?: Status;
      /**
       * ICANN confirmation status.
       *
       * + `"UNKNOWN_ICANN_CONFIRMATION_STATUS"`: There's no information about the status of the ICANN confirmation process.
       * + `"PENDING"`: Wix has started the ICANN confirmation process, but not all contacts have confirmed the domain yet.
       * + `"CONFIRMED_BY_ALL"`: The domain has been successfully confirmed by all contacts.
       * + `"EXPIRED"`: The domain hasn't been confirmed by all contacts before the ICANN confirmation process expired. The domain isn't active and a new confirmation process must be started. Contact the [Wix B2B team](mailto:bizdev@wix.com) for more information.
       * @readonly
       */
      icannConfirmationStatus?: ICANNConfirmationStatus;
      /**
       * Details about the ICANN confirmation status.
       * @readonly
       */
      icannConfirmationStatusInfo?: ICANNConfirmationStatusInfo;
      /**
       * DNS propagation status.
       *
       * + `"UNKNOWN_DNS_PROPAGATION_STATUS"`: There's no information about the domain's DNS propagation status.
       * + `"IN_PROGRESS"`: The domain's DNS propagation process has started but hasn't successfully completed yet.
       * + `"COMPLETED"`: The domain's DNS propagation process has successfully finished.
       * + `"FAILED"`: The domain's DNS propagation process has failed.
       * @readonly
       */
      dnsPropagationStatus?: DnsPropagationStatus;
      /**
       * Expiration date of the registered domain in `YYYY-MM-DDThh:mm:ss.sssZ`
       * format.
       * @readonly
       */
      expirationDate?: Date | null;
  }
  /** @oneof */
  interface RegisteredDomainStatusInfoOneOf {
      /**
       * Information about a domain that hasn't been successfully registered
       * yet. Includes the timestamp of the latest registration attempt.
       * @readonly
       */
      pendingRegistrationInfo?: PendingRegistrationInfo;
      /**
       * Information about a domain that couldn't be registered. Includes
       * failure code and message.
       * @readonly
       */
      failedRegistrationInfo?: FailedRegistrationInfo;
  }
  interface SiteInfo extends SiteInfoAssignmentInfoOneOf {
      /**
       * Extra details if `{"assignmentType": `"REDIRECT"}`.
       * @readonly
       */
      redirectInfo?: RedirectAssignmentInfo;
      /**
       * ID of the site to which the domain is assigned.
       * @readonly
       */
      _id?: string | null;
      /**
       * Whether the domain is assigned as the primary domain or a redirect.
       * Read more about [primary and redirected domains](https://support.wix.com/en/article/switching-your-primary-and-redirected-domains).
       * __Note:__ When you connect a domain or subdomain, you can't pass `"UNKNOWN_ASSIGNMENT_TYPE"`
       * in the request of the Create Registered Domain call.
       *
       * + `"UNKNOWN_ASSIGNMENT_TYPE"`: There's no information about the assignment type.
       * + `"PRIMARY"`: The domain is assigned as the primary domain to the Wix site.
       * + `"REDIRECT"`: The domain is assigned as a redirect to the Wix site.
       */
      assignmentType?: AssignmentType;
  }
  /** @oneof */
  interface SiteInfoAssignmentInfoOneOf {
      /**
       * Extra details if `{"assignmentType": `"REDIRECT"}`.
       * @readonly
       */
      redirectInfo?: RedirectAssignmentInfo;
  }
  enum AssignmentType {
      UNKNOWN_ASSIGNMENT_TYPE = "UNKNOWN_ASSIGNMENT_TYPE",
      PRIMARY = "PRIMARY",
      REDIRECT = "REDIRECT"
  }
  interface RedirectAssignmentInfo {
      /**
       * Primary domain the redirect points to.
       * @readonly
       */
      primaryDomain?: string;
  }
  interface Contacts {
      /** Contact information for the domain registrant. */
      registrant?: ContactData;
      /** Contact information for the domain admin. */
      admin?: ContactData;
      /** Contact information for the tech support of the domain. */
      tech?: ContactData;
  }
  interface ContactData {
      /**
       * First name. Only
       * [alphanumerical characters](https://en.wikipedia.org/wiki/Alphanumericals)
       * are supported.
       *
       * Min: 2 characters
       * Max: 64 characters
       */
      firstName?: string;
      /**
       * Last name. Only
       * [alphanumerical characters](https://en.wikipedia.org/wiki/Alphanumericals)
       * are supported.
       *
       * Min: 2 characters
       * Max: 64 characters
       */
      lastName?: string;
      /**
       * Email address.  Only
       * [alphanumerical characters](https://en.wikipedia.org/wiki/Alphanumericals)
       * and a single `@` are supported. Wix doesn't validate that the email address
       * exists.
       *
       * Min: 3 characters
       * Max: 64 characters before the `@` and 63 after
       */
      email?: string;
      /**
       * Address details, including street name and house number. Only
       * [alphanumerical characters](https://en.wikipedia.org/wiki/Alphanumericals)
       * are supported.
       *
       * Min: 2 characters
       * Max: 64 characters
       */
      address?: string;
      /**
       * City. Only
       * [alphanumerical characters](https://en.wikipedia.org/wiki/Alphanumericals)
       * are supported.
       *
       * Min: 2 characters
       * Max: 64 characters
       */
      city?: string;
      /**
       * Subdivision code in
       * [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
       * format. Only
       * [alphanumerical characters](https://en.wikipedia.org/wiki/Alphanumericals)
       * are supported.
       * __Required__ for these countries:
       * `”AE"`, `"AR"`, `"AT"`, `"AU"`, `"BE"`, `"BR"`, `"CA"`, `"CH"`, `"CL"`,
       * `"CO"`, `"CR"`, `"CZ"`, `"DE"`, `"DK"`, `"ES"`, `"FI"`, `"FR"`, `"GR"`,
       * `"IE"`, `"IN"`, `"IT"`, `"JP"`, `"KR"`, `"MX"`, `"MY"`, `"NL"`, `"NO"`,
       * `"NZ"`, `"PE"`, `"PL"`, `"PT"`, `"RU"`, `"SE"`, `"SG"`, `"TH"`, `"TR"`,
       * `"TW"`, `"UA"`, `"US"`, `”ZA”`.
       *
       * Min: 2 characters
       * Max: 2 characters
       */
      subdivisionCode?: string | null;
      /**
       * Postal code. Only
       * [alphanumerical characters](https://en.wikipedia.org/wiki/Alphanumericals)
       * are supported.
       *
       * Min: 2 characters
       * Max: 16 characters
       */
      postalCode?: string | null;
      /**
       * Country code in
       * [ISO-3166 alpha-1](https://en.wikipedia.org/wiki/ISO_3166-2#Subdivisions_included_in_ISO_3166-1)
       * format. Only
       * [alphanumerical characters](https://en.wikipedia.org/wiki/Alphanumericals)
       * are supported. Wix doesn't validate that the postal code is valid for the
       * given country.
       *
       * Min: 2 characters
       * Max: 2 characters
       */
      countryCode?: string;
      /**
       * Phone number. Only
       * [alphanumerical characters](https://en.wikipedia.org/wiki/Alphanumericals)
       * are supported. For example, `+15551234567`. Wix doesn't validate that the
       * phone number belongs to the specified country.
       *
       * Min: 2 characters
       * Max: 20 characters
       */
      phone?: string;
      /**
       * Company name. Only
       * [alphanumerical characters](https://en.wikipedia.org/wiki/Alphanumericals)
       * are supported.
       *
       * Max: 2 characters
       * Max: 64 characters
       */
      company?: string | null;
  }
  enum Status {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      PENDING_REGISTRATION = "PENDING_REGISTRATION",
      ACTIVE = "ACTIVE",
      FAILED_REGISTRATION = "FAILED_REGISTRATION",
      CANCELED = "CANCELED"
  }
  interface PendingRegistrationInfo {
      /**
       * Information about the latest attempt to register
       * the domain. Wix tries to register the domain several times if the
       * first attempt is unsuccessful. You can contact the
       * [Wix B2B team](mailto:bizdev@wix.com)
       * for more information about the number of attempts and their timing.
       * @readonly
       */
      latestAttempt?: LatestAttempt;
  }
  interface LatestAttempt {
      /**
       * Number of the latest attempt to register the domain.
       * @readonly
       */
      number?: number;
      /**
       * Date and time of the latest domain registration attempt in
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      timestamp?: Date | null;
  }
  interface FailedRegistrationInfo {
      /**
       * Failure code.
       *
       * + `"UNKNOWN_FAILURE_CODE"`: There's no information about the failure code.
       * + `"OTHER"`: There was a failure, but none of the listed failure codes applies.
       * @readonly
       */
      code?: FailureCode;
      /**
       * Failure message.
       * @readonly
       */
      message?: string;
  }
  enum FailureCode {
      UNKNOWN_FAILURE_CODE = "UNKNOWN_FAILURE_CODE",
      OTHER = "OTHER"
  }
  /**
   * he confirmation status types, a record:
   * starts at pending
   * ends either at confirmed_by_all or expired
   */
  enum ICANNConfirmationStatus {
      UNKNOWN_ICANN_CONFIRMATION_STATUS = "UNKNOWN_ICANN_CONFIRMATION_STATUS",
      PENDING = "PENDING",
      CONFIRMED_BY_ALL = "CONFIRMED_BY_ALL",
      EXPIRED = "EXPIRED"
  }
  interface ICANNConfirmationStatusInfo extends ICANNConfirmationStatusInfoStatusOneOf {
      /** Details about domains with `"PENDING"` ICANN confirmation status. */
      pending?: Pending;
      /** Details about domains with `"EXPIRED"` ICANN confirmation status. */
      expired?: Expired;
  }
  /** @oneof */
  interface ICANNConfirmationStatusInfoStatusOneOf {
      /** Details about domains with `"PENDING"` ICANN confirmation status. */
      pending?: Pending;
      /** Details about domains with `"EXPIRED"` ICANN confirmation status. */
      expired?: Expired;
  }
  interface Pending {
      /**
       * Expiration date of the ICANN confirmation process in
       * `YYYY-MM-DDThh:mm:ss.sssZ` format. All contacts must confirm the domain
       * before this date or the domain won't be active.
       */
      expirationDate?: Date | null;
      /**
       * Email addresses of the contacts who haven't confirmed the domain with ICANN
       * yet.
       */
      notConfirmedBy?: string[];
  }
  interface Expired {
      /**
       * Email addresses of the contacts who haven't confirmed the domain with ICANN
       * in time.
       */
      notConfirmedBy?: string[];
  }
  enum DnsPropagationStatus {
      UNKNOWN_DNS_PROPAGATION_STATUS = "UNKNOWN_DNS_PROPAGATION_STATUS",
      COMPLETED = "COMPLETED",
      FAILED = "FAILED",
      IN_PROGRESS = "IN_PROGRESS"
  }
  interface CreateRegisteredDomainRequest {
      /** Information about the domain to register including contact details. */
      registeredDomain: RegisteredDomain;
  }
  interface CreateRegisteredDomainResponse {
      /** Created registered domain. */
      registeredDomain?: RegisteredDomain;
  }
  interface GetRegisteredDomainRequest {
      /** ID of the registered domain to retrieve. */
      registeredDomainId: string;
  }
  interface GetRegisteredDomainResponse {
      /** Retrieved registered domain. */
      registeredDomain?: RegisteredDomain;
  }
  interface ListRegisteredDomainsRequest {
      /** Cursor paging options. */
      paging?: CursorPaging$1;
  }
  interface CursorPaging$1 {
      /**
       * Number of domains to load.
       *
       * Min: `0`
       * Max: `100`
       */
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
  interface ListRegisteredDomainsResponse {
      /** Metadata about the returned list of registered domains. */
      pagingMetadata?: CursorPagingMetadata$1;
      /** Retrieved registered domains. */
      registeredDomains?: RegisteredDomain[];
  }
  interface CursorPagingMetadata$1 {
      /** Number of domains returned in the response. */
      count?: number | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
      cursors?: Cursors$1;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$1 {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface DeleteRegisteredDomainByIdRequest {
      /** ID of the registered domain to delete. */
      registeredDomainId: string;
  }
  interface DeleteRegisteredDomainByIdResponse {
  }
  interface RedeemRegisteredDomainRequest {
      /**
       * ID of the registered domain to redeem. Identical to the domain name
       * including TLD.
       */
      registeredDomainId: string;
  }
  interface RedeemRegisteredDomainResponse {
      /** Registered domain to redeem. */
      registeredDomain?: RegisteredDomain;
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
   * Creates a registeredDomain object and starts the domain registration process that may take up to 48 hours to resolve.
   *
   *  You must pass the relevant Wix account ID in the header of the call. You may also pass a Wix site ID in the header of the call. This assigns the domain to the site when the registration succeeds. If you don't provide a site ID, the domain is registered but not assigned to a Wix site. Information about the site is returned in the `siteInfo object`, while information about the account isn't returned.
   *
   *  To register a domain and assign it to a site, the site must have an active [Premium plan](https://support.wix.com/en/article/upgrading-your-site-to-premium-3066683). However, if you just want to register a domain without connecting it to a site, the account doesn't need an active Premium plan. In both situations, the account must own a product that supports linking a domain with the chosen TLD. Use [Create Package](/packages/create-package) of the Resellers API to add the relevant Premium plan or product to your customer's site. Contact the [Wix B2B sales team](mailto:bizdev@wix.com) for details about the available product IDs.
   *
   *  You can register domains for 1, 2, or 3 years, but you don't set the duration with this endpoint. Instead Wix chooses the registration length based on the billing cycle of the corresponding `productInstance` from the [Resellers API](/packages/Introduction). The [Create Registered Domain](/registeredDomains/create-registered-domains) call fails if the billing cycle of the relevant productInstance isn't 1, 2, or 3 years.
   *
   *  You can only register a root domain. You can't register a subdomain.
   *
   *  If you try to register a domain that isn't available for purchase or there is already a `registeredDomain` object for the specified domain, the call fails without creating a `registeredDomain` object or starting the registration process.
   *
   *  Wix tries to register the domain several times, but stops if the process fails too often. Contact the [Wix B2B team](mailto:bizdev@wix.com) for more information about the number of attempts and their timing.
   *
   *  Wix only checks formal requirements of each field in the `contacts` object, such as the maximum number of characters. Wix doesn't check whether the actual domain registrar has additional requirements, for example that the postal code is valid in the specified country. If there is such a mismatch between the request and the registrar's requirements, the call succeeds but the registration process can't succeed. Read more about [contact validations](https://dev.wix.com/api/rest/account-level-apis/registered-domains/contact-validations).
   *
   * >  **Important:** This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param registeredDomain - Information about the domain to register including contact details.
   * @internal
   * @documentationMaturity preview
   * @requiredField registeredDomain
   * @requiredField registeredDomain.contacts
   * @requiredField registeredDomain.contacts.admin.address
   * @requiredField registeredDomain.contacts.admin.city
   * @requiredField registeredDomain.contacts.admin.countryCode
   * @requiredField registeredDomain.contacts.admin.email
   * @requiredField registeredDomain.contacts.admin.firstName
   * @requiredField registeredDomain.contacts.admin.lastName
   * @requiredField registeredDomain.contacts.admin.phone
   * @requiredField registeredDomain.contacts.registrant
   * @requiredField registeredDomain.contacts.registrant.address
   * @requiredField registeredDomain.contacts.registrant.city
   * @requiredField registeredDomain.contacts.registrant.countryCode
   * @requiredField registeredDomain.contacts.registrant.email
   * @requiredField registeredDomain.contacts.registrant.firstName
   * @requiredField registeredDomain.contacts.registrant.lastName
   * @requiredField registeredDomain.contacts.registrant.phone
   * @requiredField registeredDomain.contacts.tech.address
   * @requiredField registeredDomain.contacts.tech.city
   * @requiredField registeredDomain.contacts.tech.countryCode
   * @requiredField registeredDomain.contacts.tech.email
   * @requiredField registeredDomain.contacts.tech.firstName
   * @requiredField registeredDomain.contacts.tech.lastName
   * @requiredField registeredDomain.contacts.tech.phone
   * @requiredField registeredDomain.domain
   * @requiredField registeredDomain.productInstanceId
   * @permissionId DOMAINS.MANAGE_REGISTERED_DOMAINS
   * @adminMethod
   * @returns Created registered domain.
   */
  function createRegisteredDomain(registeredDomain: RegisteredDomain): Promise<RegisteredDomain>;
  /**
   * Retrieves a registered domain.
   *
   *
   * You must pass the relevant Wix account ID in the header of the call.
   *
   * > __Important:__ This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param registeredDomainId - ID of the registered domain to retrieve.
   * @internal
   * @documentationMaturity preview
   * @requiredField registeredDomainId
   * @permissionId DOMAINS.READ_REGISTERED_DOMAINS
   * @adminMethod
   * @returns Retrieved registered domain.
   */
  function getRegisteredDomain(registeredDomainId: string): Promise<RegisteredDomain>;
  /**
   * Retrieves a list of up to 100 registered domains.
   *
   *
   * You must pass the relevant Wix account ID in the header of the call.
   *
   * The retrieved domains are sorted by `createdDate` in descending order.
   *
   * > __Important:__ This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @internal
   * @documentationMaturity preview
   * @permissionId DOMAINS.READ_REGISTERED_DOMAINS
   * @adminMethod
   */
  function listRegisteredDomains(options?: ListRegisteredDomainsOptions): Promise<ListRegisteredDomainsResponse>;
  interface ListRegisteredDomainsOptions {
      /** Cursor paging options. */
      paging?: CursorPaging$1;
  }
  /**
   * Deletes a registered domains.
   *
   *
   * You must pass the relevant Wix account ID in the header of the call.
   *
   * > __Important:__ This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param registeredDomainId - ID of the registered domain to delete.
   * @internal
   * @documentationMaturity preview
   * @requiredField registeredDomainId
   * @permissionId DOMAINS.MANAGE_REGISTERED_DOMAINS
   * @adminMethod
   */
  function deleteRegisteredDomainById(registeredDomainId: string): Promise<void>;
  /**
   * Redeems a registered domain that's currently in redemption.
   *
   *
   * You must pass the relevant Wix account ID in the header of the call.
   *
   * It may take up to 7 days to complete the domain redemption. If the domain
   * is successfully redeemed, the new `expirationDate` is 1 year after the
   * original `expirationDate`.
   *
   * You can't redeem registered domains that haven't expired yet or have passed
   * the redemption period.
   *
   * > __Important:__ This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param registeredDomainId - ID of the registered domain to redeem. Identical to the domain name
   * including TLD.
   * @internal
   * @documentationMaturity preview
   * @requiredField registeredDomainId
   * @permissionId DOMAINS.MANAGE_REGISTERED_DOMAINS
   * @adminMethod
   */
  function redeemRegisteredDomain(registeredDomainId: string): Promise<RedeemRegisteredDomainResponse>;
  
  type premiumDomainsV1RegisteredDomain_universal_d_RegisteredDomain = RegisteredDomain;
  type premiumDomainsV1RegisteredDomain_universal_d_RegisteredDomainStatusInfoOneOf = RegisteredDomainStatusInfoOneOf;
  type premiumDomainsV1RegisteredDomain_universal_d_SiteInfo = SiteInfo;
  type premiumDomainsV1RegisteredDomain_universal_d_SiteInfoAssignmentInfoOneOf = SiteInfoAssignmentInfoOneOf;
  type premiumDomainsV1RegisteredDomain_universal_d_AssignmentType = AssignmentType;
  const premiumDomainsV1RegisteredDomain_universal_d_AssignmentType: typeof AssignmentType;
  type premiumDomainsV1RegisteredDomain_universal_d_RedirectAssignmentInfo = RedirectAssignmentInfo;
  type premiumDomainsV1RegisteredDomain_universal_d_Contacts = Contacts;
  type premiumDomainsV1RegisteredDomain_universal_d_ContactData = ContactData;
  type premiumDomainsV1RegisteredDomain_universal_d_Status = Status;
  const premiumDomainsV1RegisteredDomain_universal_d_Status: typeof Status;
  type premiumDomainsV1RegisteredDomain_universal_d_PendingRegistrationInfo = PendingRegistrationInfo;
  type premiumDomainsV1RegisteredDomain_universal_d_LatestAttempt = LatestAttempt;
  type premiumDomainsV1RegisteredDomain_universal_d_FailedRegistrationInfo = FailedRegistrationInfo;
  type premiumDomainsV1RegisteredDomain_universal_d_FailureCode = FailureCode;
  const premiumDomainsV1RegisteredDomain_universal_d_FailureCode: typeof FailureCode;
  type premiumDomainsV1RegisteredDomain_universal_d_ICANNConfirmationStatus = ICANNConfirmationStatus;
  const premiumDomainsV1RegisteredDomain_universal_d_ICANNConfirmationStatus: typeof ICANNConfirmationStatus;
  type premiumDomainsV1RegisteredDomain_universal_d_ICANNConfirmationStatusInfo = ICANNConfirmationStatusInfo;
  type premiumDomainsV1RegisteredDomain_universal_d_ICANNConfirmationStatusInfoStatusOneOf = ICANNConfirmationStatusInfoStatusOneOf;
  type premiumDomainsV1RegisteredDomain_universal_d_Pending = Pending;
  type premiumDomainsV1RegisteredDomain_universal_d_Expired = Expired;
  type premiumDomainsV1RegisteredDomain_universal_d_DnsPropagationStatus = DnsPropagationStatus;
  const premiumDomainsV1RegisteredDomain_universal_d_DnsPropagationStatus: typeof DnsPropagationStatus;
  type premiumDomainsV1RegisteredDomain_universal_d_CreateRegisteredDomainRequest = CreateRegisteredDomainRequest;
  type premiumDomainsV1RegisteredDomain_universal_d_CreateRegisteredDomainResponse = CreateRegisteredDomainResponse;
  type premiumDomainsV1RegisteredDomain_universal_d_GetRegisteredDomainRequest = GetRegisteredDomainRequest;
  type premiumDomainsV1RegisteredDomain_universal_d_GetRegisteredDomainResponse = GetRegisteredDomainResponse;
  type premiumDomainsV1RegisteredDomain_universal_d_ListRegisteredDomainsRequest = ListRegisteredDomainsRequest;
  type premiumDomainsV1RegisteredDomain_universal_d_ListRegisteredDomainsResponse = ListRegisteredDomainsResponse;
  type premiumDomainsV1RegisteredDomain_universal_d_DeleteRegisteredDomainByIdRequest = DeleteRegisteredDomainByIdRequest;
  type premiumDomainsV1RegisteredDomain_universal_d_DeleteRegisteredDomainByIdResponse = DeleteRegisteredDomainByIdResponse;
  type premiumDomainsV1RegisteredDomain_universal_d_RedeemRegisteredDomainRequest = RedeemRegisteredDomainRequest;
  type premiumDomainsV1RegisteredDomain_universal_d_RedeemRegisteredDomainResponse = RedeemRegisteredDomainResponse;
  type premiumDomainsV1RegisteredDomain_universal_d_DomainEvent = DomainEvent;
  type premiumDomainsV1RegisteredDomain_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type premiumDomainsV1RegisteredDomain_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type premiumDomainsV1RegisteredDomain_universal_d_RestoreInfo = RestoreInfo;
  type premiumDomainsV1RegisteredDomain_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type premiumDomainsV1RegisteredDomain_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type premiumDomainsV1RegisteredDomain_universal_d_ActionEvent = ActionEvent;
  type premiumDomainsV1RegisteredDomain_universal_d_MessageEnvelope = MessageEnvelope;
  type premiumDomainsV1RegisteredDomain_universal_d_IdentificationData = IdentificationData;
  type premiumDomainsV1RegisteredDomain_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type premiumDomainsV1RegisteredDomain_universal_d_WebhookIdentityType = WebhookIdentityType;
  const premiumDomainsV1RegisteredDomain_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const premiumDomainsV1RegisteredDomain_universal_d_createRegisteredDomain: typeof createRegisteredDomain;
  const premiumDomainsV1RegisteredDomain_universal_d_getRegisteredDomain: typeof getRegisteredDomain;
  const premiumDomainsV1RegisteredDomain_universal_d_listRegisteredDomains: typeof listRegisteredDomains;
  type premiumDomainsV1RegisteredDomain_universal_d_ListRegisteredDomainsOptions = ListRegisteredDomainsOptions;
  const premiumDomainsV1RegisteredDomain_universal_d_deleteRegisteredDomainById: typeof deleteRegisteredDomainById;
  const premiumDomainsV1RegisteredDomain_universal_d_redeemRegisteredDomain: typeof redeemRegisteredDomain;
  namespace premiumDomainsV1RegisteredDomain_universal_d {
    export {
      premiumDomainsV1RegisteredDomain_universal_d_RegisteredDomain as RegisteredDomain,
      premiumDomainsV1RegisteredDomain_universal_d_RegisteredDomainStatusInfoOneOf as RegisteredDomainStatusInfoOneOf,
      premiumDomainsV1RegisteredDomain_universal_d_SiteInfo as SiteInfo,
      premiumDomainsV1RegisteredDomain_universal_d_SiteInfoAssignmentInfoOneOf as SiteInfoAssignmentInfoOneOf,
      premiumDomainsV1RegisteredDomain_universal_d_AssignmentType as AssignmentType,
      premiumDomainsV1RegisteredDomain_universal_d_RedirectAssignmentInfo as RedirectAssignmentInfo,
      premiumDomainsV1RegisteredDomain_universal_d_Contacts as Contacts,
      premiumDomainsV1RegisteredDomain_universal_d_ContactData as ContactData,
      premiumDomainsV1RegisteredDomain_universal_d_Status as Status,
      premiumDomainsV1RegisteredDomain_universal_d_PendingRegistrationInfo as PendingRegistrationInfo,
      premiumDomainsV1RegisteredDomain_universal_d_LatestAttempt as LatestAttempt,
      premiumDomainsV1RegisteredDomain_universal_d_FailedRegistrationInfo as FailedRegistrationInfo,
      premiumDomainsV1RegisteredDomain_universal_d_FailureCode as FailureCode,
      premiumDomainsV1RegisteredDomain_universal_d_ICANNConfirmationStatus as ICANNConfirmationStatus,
      premiumDomainsV1RegisteredDomain_universal_d_ICANNConfirmationStatusInfo as ICANNConfirmationStatusInfo,
      premiumDomainsV1RegisteredDomain_universal_d_ICANNConfirmationStatusInfoStatusOneOf as ICANNConfirmationStatusInfoStatusOneOf,
      premiumDomainsV1RegisteredDomain_universal_d_Pending as Pending,
      premiumDomainsV1RegisteredDomain_universal_d_Expired as Expired,
      premiumDomainsV1RegisteredDomain_universal_d_DnsPropagationStatus as DnsPropagationStatus,
      premiumDomainsV1RegisteredDomain_universal_d_CreateRegisteredDomainRequest as CreateRegisteredDomainRequest,
      premiumDomainsV1RegisteredDomain_universal_d_CreateRegisteredDomainResponse as CreateRegisteredDomainResponse,
      premiumDomainsV1RegisteredDomain_universal_d_GetRegisteredDomainRequest as GetRegisteredDomainRequest,
      premiumDomainsV1RegisteredDomain_universal_d_GetRegisteredDomainResponse as GetRegisteredDomainResponse,
      premiumDomainsV1RegisteredDomain_universal_d_ListRegisteredDomainsRequest as ListRegisteredDomainsRequest,
      CursorPaging$1 as CursorPaging,
      premiumDomainsV1RegisteredDomain_universal_d_ListRegisteredDomainsResponse as ListRegisteredDomainsResponse,
      CursorPagingMetadata$1 as CursorPagingMetadata,
      Cursors$1 as Cursors,
      premiumDomainsV1RegisteredDomain_universal_d_DeleteRegisteredDomainByIdRequest as DeleteRegisteredDomainByIdRequest,
      premiumDomainsV1RegisteredDomain_universal_d_DeleteRegisteredDomainByIdResponse as DeleteRegisteredDomainByIdResponse,
      premiumDomainsV1RegisteredDomain_universal_d_RedeemRegisteredDomainRequest as RedeemRegisteredDomainRequest,
      premiumDomainsV1RegisteredDomain_universal_d_RedeemRegisteredDomainResponse as RedeemRegisteredDomainResponse,
      premiumDomainsV1RegisteredDomain_universal_d_DomainEvent as DomainEvent,
      premiumDomainsV1RegisteredDomain_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      premiumDomainsV1RegisteredDomain_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      premiumDomainsV1RegisteredDomain_universal_d_RestoreInfo as RestoreInfo,
      premiumDomainsV1RegisteredDomain_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      premiumDomainsV1RegisteredDomain_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      premiumDomainsV1RegisteredDomain_universal_d_ActionEvent as ActionEvent,
      premiumDomainsV1RegisteredDomain_universal_d_MessageEnvelope as MessageEnvelope,
      premiumDomainsV1RegisteredDomain_universal_d_IdentificationData as IdentificationData,
      premiumDomainsV1RegisteredDomain_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      premiumDomainsV1RegisteredDomain_universal_d_WebhookIdentityType as WebhookIdentityType,
      premiumDomainsV1RegisteredDomain_universal_d_createRegisteredDomain as createRegisteredDomain,
      premiumDomainsV1RegisteredDomain_universal_d_getRegisteredDomain as getRegisteredDomain,
      premiumDomainsV1RegisteredDomain_universal_d_listRegisteredDomains as listRegisteredDomains,
      premiumDomainsV1RegisteredDomain_universal_d_ListRegisteredDomainsOptions as ListRegisteredDomainsOptions,
      premiumDomainsV1RegisteredDomain_universal_d_deleteRegisteredDomainById as deleteRegisteredDomainById,
      premiumDomainsV1RegisteredDomain_universal_d_redeemRegisteredDomain as redeemRegisteredDomain,
    };
  }
  
  interface DomainAvailability {
      /** Domain name including TLD. For example, `my-new-domain.com`. */
      domain?: string;
      /**
       * Whether the domain is available for purchase. You can purchase the
       * domain in case the boolean is `true`. The domain is already taken
       * when `false` is returned.
       */
      available?: boolean;
      /** Whether the domain has a higher price due to its perceived value or demand. */
      premium?: boolean;
  }
  interface CheckDomainAvailabilityRequest {
      /**
       * Domain name. Must include the TLD. For example, `my-new-domain.com`. Only
       * alphanumeric characters, hyphens, and dots are supported.
       *
       * Min: 3 characters
       * Max: 63 characters
       */
      domain: string;
  }
  interface CheckDomainAvailabilityResponse {
      /** Information about the domain's availability. */
      availability?: DomainAvailability;
  }
  /**
   * Checks whether the given domain is available for purchase.
   *
   *
   * You can purchase the specified domain in case the returned
   * `availability.available` boolean is `true`. The domain is already taken
   * when `false` is returned.
   *
   * The `domain` field must include the TLD. For example, `my-new-domain.com`.
   *
   * > __Important:__ This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param domain - Domain name. Must include the TLD. For example, `my-new-domain.com`. Only
   * alphanumeric characters, hyphens, and dots are supported.
   *
   * Min: 3 characters
   * Max: 63 characters
   * @public
   * @requiredField domain
   * @permissionId DOMAINS.PUBLIC_API_PERMISSION
   * @adminMethod
   */
  function checkDomainAvailability(domain: string): Promise<CheckDomainAvailabilityResponse>;
  
  type premiumDomainsV2Availability_universal_d_DomainAvailability = DomainAvailability;
  type premiumDomainsV2Availability_universal_d_CheckDomainAvailabilityRequest = CheckDomainAvailabilityRequest;
  type premiumDomainsV2Availability_universal_d_CheckDomainAvailabilityResponse = CheckDomainAvailabilityResponse;
  const premiumDomainsV2Availability_universal_d_checkDomainAvailability: typeof checkDomainAvailability;
  namespace premiumDomainsV2Availability_universal_d {
    export {
      premiumDomainsV2Availability_universal_d_DomainAvailability as DomainAvailability,
      premiumDomainsV2Availability_universal_d_CheckDomainAvailabilityRequest as CheckDomainAvailabilityRequest,
      premiumDomainsV2Availability_universal_d_CheckDomainAvailabilityResponse as CheckDomainAvailabilityResponse,
      premiumDomainsV2Availability_universal_d_checkDomainAvailability as checkDomainAvailability,
    };
  }
  
  interface DomainSuggestion {
      /** Suggested domain name including TLD. */
      domain?: string;
      /** Whether the domain has a higher price due to its perceived value or demand. */
      premium?: boolean;
  }
  interface SuggestDomainsRequest {
      /**
       * Input to base your domain suggestions on. May include
       * letters, numbers, spaces, dots, and hyphens. Must not include the TLD.
       *
       * Min: 3 characters
       * Max: 100 characters
       */
      query: string;
      /**
       * [Top-level domains](https://en.wikipedia.org/wiki/Top-level_domain). Must
       * not include the dot. For example, `com`, not `.com`. Not all TLDs can be
       * connected to Wix sites. Supported TLDS include `com`, `net`, and `org`.
       * Contact the [Wix B2B sales team](mailto:bizdev@wix.com) for more
       * information.
       *
       * Max: 10 TLDs
       */
      tlds?: string[];
      /**
       * Number of domain suggestions to return. __Deprecated__: This field will be
       * removed on March 1, 2025. Use `paging.limit` instead.
       *
       * Min: `1`
       * Max: `20`
       * Default: `10`
       * @deprecated Number of domain suggestions to return. __Deprecated__: This field will be
       * removed on March 1, 2025. Use `paging.limit` instead.
       *
       * Min: `1`
       * Max: `20`
       * Default: `10`
       * @replacedBy paging.limit
       * @targetRemovalDate 2025-03-01
       */
      limit?: number | null;
      /** Cursor paging options. */
      paging?: CursorPaging;
      /**
       * Maximum number of characters for the domain name, excluding the TLD.
       *
       * Min: `3`
       * Max: `63`
       * Default: `63`
       */
      maxLength?: number | null;
  }
  interface CursorPaging {
      /**
       * Maximum number of domains to return in the results.
       *
       * Min: `0`
       * Max: `20`
       */
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
  interface SuggestDomainsResponse {
      /** List of suggested available domains. */
      suggestions?: DomainSuggestion[];
      /** Metadata about the returned list of suggested domains. */
      pagingMetadata?: CursorPagingMetadata;
  }
  interface CursorPagingMetadata {
      /** Number of domains returned in the response. */
      count?: number | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
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
  /**
   * Suggests domains that are available for purchase, based on the provided query input.
   *
   *  You may use this endpoint to get inspired and then call [Check Domain Availability()](/domainAvailability/check-domain-availability) to check whether a specific variation of the suggestions is also available for purchsase.
   *
   *  The `tlds` must not include the dot. For example, `com` and not `.com`.
   *
   * > **Important:** This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param query - Input to base your domain suggestions on. May include
   * letters, numbers, spaces, dots, and hyphens. Must not include the TLD.
   *
   * Min: 3 characters
   * Max: 100 characters
   * @public
   * @requiredField query
   * @permissionId DOMAINS.PUBLIC_API_PERMISSION
   * @adminMethod
   */
  function suggestDomains(query: string, options?: SuggestDomainsOptions): Promise<SuggestDomainsResponse>;
  interface SuggestDomainsOptions {
      /**
       * [Top-level domains](https://en.wikipedia.org/wiki/Top-level_domain). Must
       * not include the dot. For example, `com`, not `.com`. Not all TLDs can be
       * connected to Wix sites. Supported TLDS include `com`, `net`, and `org`.
       * Contact the [Wix B2B sales team](mailto:bizdev@wix.com) for more
       * information.
       *
       * Max: 10 TLDs
       */
      tlds?: string[];
      /**
       * Number of domain suggestions to return. __Deprecated__: This field will be
       * removed on March 1, 2025. Use `paging.limit` instead.
       *
       * Min: `1`
       * Max: `20`
       * Default: `10`
       * @deprecated Number of domain suggestions to return. __Deprecated__: This field will be
       * removed on March 1, 2025. Use `paging.limit` instead.
       *
       * Min: `1`
       * Max: `20`
       * Default: `10`
       * @replacedBy paging.limit
       * @targetRemovalDate 2025-03-01
       */
      limit?: number | null;
      /** Cursor paging options. */
      paging?: CursorPaging;
      /**
       * Maximum number of characters for the domain name, excluding the TLD.
       *
       * Min: `3`
       * Max: `63`
       * Default: `63`
       */
      maxLength?: number | null;
  }
  
  type premiumDomainsV2Suggestion_universal_d_DomainSuggestion = DomainSuggestion;
  type premiumDomainsV2Suggestion_universal_d_SuggestDomainsRequest = SuggestDomainsRequest;
  type premiumDomainsV2Suggestion_universal_d_CursorPaging = CursorPaging;
  type premiumDomainsV2Suggestion_universal_d_SuggestDomainsResponse = SuggestDomainsResponse;
  type premiumDomainsV2Suggestion_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type premiumDomainsV2Suggestion_universal_d_Cursors = Cursors;
  const premiumDomainsV2Suggestion_universal_d_suggestDomains: typeof suggestDomains;
  type premiumDomainsV2Suggestion_universal_d_SuggestDomainsOptions = SuggestDomainsOptions;
  namespace premiumDomainsV2Suggestion_universal_d {
    export {
      premiumDomainsV2Suggestion_universal_d_DomainSuggestion as DomainSuggestion,
      premiumDomainsV2Suggestion_universal_d_SuggestDomainsRequest as SuggestDomainsRequest,
      premiumDomainsV2Suggestion_universal_d_CursorPaging as CursorPaging,
      premiumDomainsV2Suggestion_universal_d_SuggestDomainsResponse as SuggestDomainsResponse,
      premiumDomainsV2Suggestion_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      premiumDomainsV2Suggestion_universal_d_Cursors as Cursors,
      premiumDomainsV2Suggestion_universal_d_suggestDomains as suggestDomains,
      premiumDomainsV2Suggestion_universal_d_SuggestDomainsOptions as SuggestDomainsOptions,
    };
  }
  
  export { premiumDomainsV1ConnectedDomainSetupInfo_universal_d as connectedDomainSetupInfo, premiumDomainsV1ConnectedDomain_universal_d as connectedDomains, premiumDomainsV2Availability_universal_d as domainAvailability, premiumDomainsV1DnsZone_universal_d as domainDns, premiumDomainsV2Suggestion_universal_d as domainSuggestions, premiumDomainsV1RegisteredDomain_universal_d as registeredDomains };
}
