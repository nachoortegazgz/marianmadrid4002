declare module "wix-marketing-consent-service-backend" {
  interface MarketingConsent {
      /**
       * Marketing consent ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number.
       * @readonly
       */
      revision?: string | null;
      /** Marketing consent communication details. */
      details?: MarketingConsentDetails;
      /**
       * Marketing consent state.
       *
       * + `UNKNOWN_STATE`: State of the marketing consent is unknown.
       * + `NEVER_CONFIRMED`: The visitor never confirmed to receive marketing consents.
       * + `REVOKED`: The marketing consent has been removed, for example, when a visitor unsubscribes from a newsletter.
       * + `PENDING`: The marketing consent is pending confirmation. Relevant only for `{"optInLevel": "DOUBLE_CONFIRMATION"}`.
       * + `CONFIRMED`: The site visitor has confirmed their marketing consent.
       *
       * Default: `UNKNOWN_STATE`.
       */
      state?: MarketingConsentState;
      /**
       * Date and time the marketing consent was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time the marketing consent was updated.
       * @readonly
       */
      _updatedDate?: Date;
      /** Last confirmation activity of the marketing consent. */
      lastConfirmationActivity?: LastConfirmationActivity;
      /** Last revoke activity of the marketing consent. */
      lastRevokeActivity?: LastRevokeActivity;
      /** Additional fields. */
      extendedFields?: ExtendedFields;
  }
  interface MarketingConsentDetails extends MarketingConsentDetailsIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
      /** The communication channel of the marketing consent. */
      type?: MarketingConsentDetailsIdentifierType;
  }
  /** @oneof */
  interface MarketingConsentDetailsIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
  }
  enum MarketingConsentDetailsIdentifierType {
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      EMAIL = "EMAIL",
      PHONE = "PHONE"
  }
  enum MarketingConsentState {
      UNKNOWN_STATE = "UNKNOWN_STATE",
      NEVER_CONFIRMED = "NEVER_CONFIRMED",
      REVOKED = "REVOKED",
      PENDING = "PENDING",
      CONFIRMED = "CONFIRMED"
  }
  interface LastConfirmationActivity {
      /** Source of the given consent (how the visitor signed up). */
      source?: Source;
      /** Consent description. */
      description?: string | null;
      /** Date and time the consent was updated. */
      _updatedDate?: Date;
      /** Consent opt in level, either single or double confirmation. */
      optInLevel?: OptInLevel;
  }
  enum Source {
      UNKNOWN_SOURCE = "UNKNOWN_SOURCE",
      IN_PERSON = "IN_PERSON",
      FORM = "FORM",
      LINK_CONFIRMATION = "LINK_CONFIRMATION",
      EMAIL_SERVICE = "EMAIL_SERVICE",
      WIX_USERS = "WIX_USERS",
      OTHER = "OTHER"
  }
  enum OptInLevel {
      UNKNOWN_OPT_IN_LEVEL = "UNKNOWN_OPT_IN_LEVEL",
      SINGLE_CONFIRMATION = "SINGLE_CONFIRMATION",
      DOUBLE_CONFIRMATION = "DOUBLE_CONFIRMATION"
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
  interface LastRevokeActivity {
      /** Source of the given revoke (how the visitor signed up). */
      source?: LastRevokeActivitySource;
      /** Revoke description. */
      description?: string | null;
      /** Date and time the consent was updated. */
      _updatedDate?: Date;
  }
  enum LastRevokeActivitySource {
      UNKNOWN_SOURCE = "UNKNOWN_SOURCE",
      IN_PERSON = "IN_PERSON",
      FORM = "FORM",
      REVOKE_LINK = "REVOKE_LINK",
      OTHER = "OTHER"
  }
  interface GetMarketingConsentRequest {
      /** Marketing consent ID. */
      marketingConsentId: string;
  }
  interface GetMarketingConsentResponse {
      /** The requested marketing consent. */
      marketingConsent?: MarketingConsent;
  }
  interface GetMarketingConsentByIdentifierRequest extends GetMarketingConsentByIdentifierRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
      /** The communication channel of the marketing consent. */
      type: MarketingConsentDetailsIdentifierType;
      /** Language of the page */
      linkLanguage?: string | null;
  }
  /** @oneof */
  interface GetMarketingConsentByIdentifierRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
  }
  interface GetMarketingConsentByIdentifierResponse {
      /** The requested marketing consent. */
      marketingConsent?: MarketingConsent;
      /** Details about whether the subject of the marketing consent is eligible to receive marketing messages. */
      communicationEligibility?: CommunicationEligibility;
  }
  interface CommunicationEligibility {
      /** Whether the recipient of the marketing consent is eligible to receive marketing messages. For example, if a visitor cancels their marketing consent, `CommunicationEligibility.granted` is `false`. Note that this only serves as a signal for your app to decide whether or not it should send marketing messages to the recipient's email address or phone number. */
      granted?: boolean;
      /** Cancellation link. */
      revokeConfirmationLink?: string | null;
      /** The reason the recipient of the marketing consent isn't eligible to receive marketing messages, for example, if the visitor unsubscribed from a newsletter. */
      reason?: string | null;
  }
  interface GetConsistentMarketingConsentByIdentifierRequest extends GetConsistentMarketingConsentByIdentifierRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
      /** The communication channel of the marketing consent. */
      type: MarketingConsentDetailsIdentifierType;
      /** Language of the page */
      linkLanguage?: string | null;
  }
  /** @oneof */
  interface GetConsistentMarketingConsentByIdentifierRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
  }
  interface GetConsistentMarketingConsentByIdentifierResponse {
      /** The requested marketing consent. */
      marketingConsent?: MarketingConsent;
      /** Details about whether the recipient of the marketing consent is eligible to receive marketing messages. */
      communicationEligibility?: CommunicationEligibility;
  }
  interface CreateMarketingConsentRequest {
      /** Marketing consent to create. */
      marketingConsent?: MarketingConsent;
  }
  interface CreateMarketingConsentResponse {
      /** Newly created marketing consent. */
      marketingConsent?: MarketingConsent;
      /** Marketing consent confirmation link. */
      link?: Link;
  }
  interface Link {
      /** Link type. */
      type?: LinkType;
      /** The link's URL. */
      url?: string;
  }
  enum LinkType {
      UNKNOWN_LINK_TYPE = "UNKNOWN_LINK_TYPE",
      CONFIRMATION = "CONFIRMATION",
      REVOKE_CONFIRMATION = "REVOKE_CONFIRMATION"
  }
  interface UpdateMarketingConsentRequest {
      /** Marketing consent to update. */
      marketingConsent?: MarketingConsent;
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask: string[];
  }
  interface UpdateMarketingConsentResponse {
      /** Updated marketing consent. */
      marketingConsent?: MarketingConsent;
      /** Marketing consent confirmation or cancelation link. */
      link?: Link;
  }
  interface DeleteMarketingConsentRequest {
      /** ID of the marketing consent to delete. */
      marketingConsentId: string;
  }
  interface DeleteMarketingConsentResponse {
  }
  interface RemoveMarketingConsentRequest {
      /** Marketing consent communication details. */
      details: MarketingConsentDetails;
      /** Information about the last revoke. */
      lastRevokeActivity?: LastRevokeActivity;
  }
  interface RemoveMarketingConsentResponse {
      /** The canceled marketing consent. */
      marketingConsent?: MarketingConsent;
  }
  interface CreateMarketingConsentByTokenRequest {
      /** Encrypted token with essential information */
      token: string;
  }
  interface CreateMarketingConsentByTokenResponse {
      /** The subscribed MarketingConsent */
      marketingConsent?: MarketingConsent;
  }
  interface RemoveMarketingConsentByTokenRequest {
      /** Encrypted token with essential information */
      token: string;
  }
  interface RemoveMarketingConsentByTokenResponse {
      /** The subscribed MarketingConsent */
      marketingConsent?: MarketingConsent;
  }
  interface QueryMarketingConsentRequest {
      /** Query options. */
      query: CursorQuery;
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
  interface QueryMarketingConsentResponse {
      /** List of marketing consents. */
      marketingConsent?: MarketingConsent[];
      /** Details on the paged set of results returned. */
      pagingMetadata?: CursorPagingMetadata;
  }
  interface CursorPagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors;
      /**
       * Whether there are more pages to retrieve following the current page.
       *
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface UpsertMarketingConsentRequest {
      /** Marketing consent to create or update. */
      marketingConsent?: MarketingConsent;
  }
  interface UpsertMarketingConsentResponse {
      /** Newly created or updated marketing consent. */
      marketingConsent?: MarketingConsent;
      /** Marketing consent confirmation or cancelation link. */
      link?: Link;
  }
  interface BulkUpsertMarketingConsentRequest {
      /** List of marketing consent information to update or create. */
      info?: MarketingConsent[];
  }
  interface BulkUpsertMarketingConsentResponse {
      /** List of created or updated marketing consents. */
      results?: BulkUpsertMarketingConsentResult[];
      /** Numbers of successful and failed actions. */
      metadata?: Metadata;
  }
  interface BulkUpsertMarketingConsentResult {
      /** Position of the newly created or updated marketing consent in the array. */
      originalIndex?: number;
      /** Newly created or updated marketing consent. */
      marketingConsent?: MarketingConsent;
      /** Information about the error. Only returns if the action fails. */
      error?: string | null;
      /** Marketing consent confirmation or cancelation link. */
      link?: Link;
  }
  interface Metadata {
      /** Number of successful actions. */
      totalSuccess?: number;
      /** Number of failed actions. */
      totalFailure?: number;
  }
  interface GenerateLinkRequest extends GenerateLinkRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
      /** The communication channel of the marketing consent. */
      type: MarketingConsentDetailsIdentifierType;
      linkType: LinkType;
      /** Language of the page */
      language?: string | null;
      /** Arbitrary parameters for closing-the-loop. */
      metadata?: Record<string, string>;
  }
  /** @oneof */
  interface GenerateLinkRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
  }
  interface GenerateLinkResponse {
      /** confirmation or revoke link */
      link?: Link;
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
   * Retrieves a marketing consent.
   * @param marketingConsentId - Marketing consent ID.
   * @public
   * @documentationMaturity preview
   * @requiredField marketingConsentId
   * @adminMethod
   * @returns The requested marketing consent.
   */
  function getMarketingConsent(marketingConsentId: string): Promise<MarketingConsent>;
  /**
   * Retrieves a marketing consent by its details.
   *
   * >**Note:** Due to the ongoing development of our new documentation portal, the query parameter is not displaying as expected. Use the `details` object located in the [marketing consent object](https://dev.wix.com/docs/rest/api-reference/marketing/marketing-consent/marketing-consent-object) in the request. You can also see the code example for reference.
   * @param type - The communication channel of the marketing consent.
   * @public
   * @documentationMaturity preview
   * @requiredField type
   * @adminMethod
   */
  function getMarketingConsentByIdentifier(type: MarketingConsentDetailsIdentifierType, options?: GetMarketingConsentByIdentifierOptions): Promise<GetMarketingConsentByIdentifierResponse>;
  interface GetMarketingConsentByIdentifierOptions extends GetMarketingConsentByIdentifierRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
      /** Language of the page */
      linkLanguage?: string | null;
  }
  /** @param type - The communication channel of the marketing consent.
   * @internal
   * @documentationMaturity preview
   * @requiredField type
   * @adminMethod
   */
  function getConsistentMarketingConsentByIdentifier(type: MarketingConsentDetailsIdentifierType, options?: GetConsistentMarketingConsentByIdentifierOptions): Promise<GetConsistentMarketingConsentByIdentifierResponse>;
  interface GetConsistentMarketingConsentByIdentifierOptions extends GetConsistentMarketingConsentByIdentifierRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
      /** Language of the page */
      linkLanguage?: string | null;
  }
  /**
   * Creates a confirmed marketing consent.
   *
   * Creates a marketing consent with a `state` of `CONFIRMED`, regardless of what state you set it to. To create a marketing consent with a different state, use [Upsert Marketing Consent](https://dev.wix.com/docs/rest/api-reference/marketing/marketing-consent/upsert-marketing-consent), or [Bulk Upsert Marketing Consent](https://dev.wix.com/docs/rest/api-reference/marketing/marketing-consent/bulk-upsert-marketing-consent).
   * @public
   * @documentationMaturity preview
   * @requiredField options.marketingConsent.details
   * @requiredField options.marketingConsent.lastConfirmationActivity
   * @adminMethod
   * @returns Newly created marketing consent.
   */
  function createMarketingConsent(options?: CreateMarketingConsentOptions): Promise<MarketingConsent>;
  interface CreateMarketingConsentOptions {
      /** Marketing consent to create. */
      marketingConsent?: MarketingConsent;
  }
  /**
   * Updates a marketing consent's properties.
   *
   * Only fields provided in `mask.paths` are updated. You can update the following fields:
   *
   * + `state`
   * + `lastConfirmationActivity`
   * + `extendedFields`
   *
   * Each time the marketing consent is updated, `revision` increments by 1.
   *
   * >**Note:** For existing marketing consents with `{"type": "EMAIL"}`, you can't update the `state` to `UNKNOWN_STATE`. Trying to do so maintains the current state. However, you can create a new marketing consent and set the `state` to `UNKNOWN_STATE`. Note that you can't create more than a single consent per email or phone number.
   * @param _id - Marketing consent ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField options.marketingConsent.details
   * @adminMethod
   * @returns Updated marketing consent.
   */
  function updateMarketingConsent(_id: string | null, options?: UpdateMarketingConsentOptions): Promise<MarketingConsent>;
  interface UpdateMarketingConsentOptions {
      marketingConsent: {
          /**
           * Marketing consent ID.
           * @readonly
           */
          _id?: string | null;
          /**
           * Revision number.
           * @readonly
           */
          revision?: string | null;
          /** Marketing consent communication details. */
          details?: MarketingConsentDetails;
          /**
           * Marketing consent state.
           *
           * + `UNKNOWN_STATE`: State of the marketing consent is unknown.
           * + `NEVER_CONFIRMED`: The visitor never confirmed to receive marketing consents.
           * + `REVOKED`: The marketing consent has been removed, for example, when a visitor unsubscribes from a newsletter.
           * + `PENDING`: The marketing consent is pending confirmation. Relevant only for `{"optInLevel": "DOUBLE_CONFIRMATION"}`.
           * + `CONFIRMED`: The site visitor has confirmed their marketing consent.
           *
           * Default: `UNKNOWN_STATE`.
           */
          state?: MarketingConsentState;
          /**
           * Date and time the marketing consent was created.
           * @readonly
           */
          _createdDate?: Date;
          /**
           * Date and time the marketing consent was updated.
           * @readonly
           */
          _updatedDate?: Date;
          /** Last confirmation activity of the marketing consent. */
          lastConfirmationActivity?: LastConfirmationActivity;
          /** Last revoke activity of the marketing consent. */
          lastRevokeActivity?: LastRevokeActivity;
          /** Additional fields. */
          extendedFields?: ExtendedFields;
      };
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask: string[];
  }
  /**
   * Deletes a marketing consent.
   * @param marketingConsentId - ID of the marketing consent to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField marketingConsentId
   * @adminMethod
   */
  function deleteMarketingConsent(marketingConsentId: string): Promise<void>;
  /**
   * Removes a marketing consent by its communication details.
   *
   * Removing a marketing consent cancels the consent, and updates the `state` to `REVOKED`. The marketing consent still exists, but the recipient of the marketing consent is no longer eligible to receive commmunication. To delete a marketing consent entirely, use [Delete Marketing Consent](https://dev.wix.com/api/rest/marketing/marketing-consent/delete-marketing-consent).
   * @param details - Marketing consent communication details.
   * @public
   * @documentationMaturity preview
   * @requiredField details
   * @requiredField details.type
   * @adminMethod
   */
  function removeMarketingConsent(details: MarketingConsentDetails, options?: RemoveMarketingConsentOptions): Promise<RemoveMarketingConsentResponse>;
  interface RemoveMarketingConsentOptions {
      /** Information about the last revoke. */
      lastRevokeActivity?: LastRevokeActivity;
  }
  /**
   * CreateMarketingConsent the specified marketing_consent in the token
   * @param token - Encrypted token with essential information
   * @internal
   * @documentationMaturity preview
   * @requiredField token
   * @adminMethod
   */
  function createMarketingConsentByToken(token: string): Promise<CreateMarketingConsentByTokenResponse>;
  /**
   * RemoveMarketingConsent the specified marketing_consent in the token
   * @param token - Encrypted token with essential information
   * @internal
   * @documentationMaturity preview
   * @requiredField token
   * @adminMethod
   */
  function removeMarketingConsentByToken(token: string): Promise<RemoveMarketingConsentByTokenResponse>;
  /**
   * Retrieves a list of marketing consents, given the provided paging, filtering, and sorting. Up to 100 marketing consents can be returned per request.
   *
   * The default `sort` is `id` in `ASC` order. For a detailed list of supported operations, see [filtering and sorting for marketing consent properties](https://dev.wix.com/docs/rest/api-reference/marketing/marketing-consent/sort-and-filter). To learn how to query marketing consents, see [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language).
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function queryMarketingConsent(): MarketingConsentQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface MarketingConsentQueryResult extends QueryCursorResult {
      items: MarketingConsent[];
      query: MarketingConsentQueryBuilder;
      next: () => Promise<MarketingConsentQueryResult>;
      prev: () => Promise<MarketingConsentQueryResult>;
  }
  interface MarketingConsentQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'details.email' | 'details.phone' | 'state', value: any) => MarketingConsentQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => MarketingConsentQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => MarketingConsentQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<MarketingConsentQueryResult>;
  }
  /**
   * Creates or updates a marketing consent.
   *
   * Note that `marketingConsent.lastConfirmationActivity` is required unless the `state` is `REVOKED` or `NEVER_CONFIRMED`.
   *
   * >**Note:** For existing marketing consents with `{"type": "EMAIL"}`, you can't update the `state` to `UNKNOWN_STATE`. Trying to do so maintains the current state. However, you can create a new marketing consent and set the `state` to `UNKNOWN_STATE`. Note that you can't create more than a single consent per email or phone number.
   * @public
   * @documentationMaturity preview
   * @requiredField options.marketingConsent.details
   * @requiredField options.marketingConsent.details.type
   * @adminMethod
   */
  function upsertMarketingConsent(options?: UpsertMarketingConsentOptions): Promise<UpsertMarketingConsentResponse>;
  interface UpsertMarketingConsentOptions {
      /** Marketing consent to create or update. */
      marketingConsent?: MarketingConsent;
  }
  /**
   * Creates or updates multiple marketing consents.
   *
   * Note that `info.lastConfirmationActivity` is required unless the `state` is `REVOKED` or `NEVER_CONFIRMED`.
   *
   * >**Note:** For existing marketing consents with `{"type": "EMAIL"}`, you can't update the `state` to `UNKNOWN_STATE`. Trying to do so maintains the current state. However, you can create a new marketing consent and set the `state` to `UNKNOWN_STATE`. Note that you can't create more than a single consent per email or phone number.
   * @public
   * @documentationMaturity preview
   * @requiredField options.info.details
   * @adminMethod
   */
  function bulkUpsertMarketingConsent(options?: BulkUpsertMarketingConsentOptions): Promise<BulkUpsertMarketingConsentResponse>;
  interface BulkUpsertMarketingConsentOptions {
      /** List of marketing consent information to update or create. */
      info?: MarketingConsent[];
  }
  /**
   * Creates an unsubscribe link to be shared with the relevant recipient.
   *
   * If someone clicks the **Unsubscribe** button on the confirmation page,
   * the recipient's `subscriptionStatus` is changed to `UNSUBSCRIBED`.
   * @param type - The communication channel of the marketing consent.
   * @internal
   * @documentationMaturity preview
   * @requiredField options.linkType
   * @requiredField type
   * @adminMethod
   */
  function generateLink(type: MarketingConsentDetailsIdentifierType, options?: GenerateLinkOptions): Promise<GenerateLinkResponse>;
  interface GenerateLinkOptions extends GenerateLinkRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
      linkType: LinkType;
      /** Language of the page */
      language?: string | null;
      /** Arbitrary parameters for closing-the-loop. */
      metadata?: Record<string, string>;
  }
  
  type marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsent = MarketingConsent;
  type marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentDetails = MarketingConsentDetails;
  type marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentDetailsIdentifierOneOf = MarketingConsentDetailsIdentifierOneOf;
  type marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentDetailsIdentifierType = MarketingConsentDetailsIdentifierType;
  const marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentDetailsIdentifierType: typeof MarketingConsentDetailsIdentifierType;
  type marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentState = MarketingConsentState;
  const marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentState: typeof MarketingConsentState;
  type marketingMarketingConsentV1MarketingConsent_universal_d_LastConfirmationActivity = LastConfirmationActivity;
  type marketingMarketingConsentV1MarketingConsent_universal_d_Source = Source;
  const marketingMarketingConsentV1MarketingConsent_universal_d_Source: typeof Source;
  type marketingMarketingConsentV1MarketingConsent_universal_d_OptInLevel = OptInLevel;
  const marketingMarketingConsentV1MarketingConsent_universal_d_OptInLevel: typeof OptInLevel;
  type marketingMarketingConsentV1MarketingConsent_universal_d_ExtendedFields = ExtendedFields;
  type marketingMarketingConsentV1MarketingConsent_universal_d_LastRevokeActivity = LastRevokeActivity;
  type marketingMarketingConsentV1MarketingConsent_universal_d_LastRevokeActivitySource = LastRevokeActivitySource;
  const marketingMarketingConsentV1MarketingConsent_universal_d_LastRevokeActivitySource: typeof LastRevokeActivitySource;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentRequest = GetMarketingConsentRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentResponse = GetMarketingConsentResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentByIdentifierRequest = GetMarketingConsentByIdentifierRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentByIdentifierRequestIdentifierOneOf = GetMarketingConsentByIdentifierRequestIdentifierOneOf;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentByIdentifierResponse = GetMarketingConsentByIdentifierResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CommunicationEligibility = CommunicationEligibility;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetConsistentMarketingConsentByIdentifierRequest = GetConsistentMarketingConsentByIdentifierRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetConsistentMarketingConsentByIdentifierRequestIdentifierOneOf = GetConsistentMarketingConsentByIdentifierRequestIdentifierOneOf;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetConsistentMarketingConsentByIdentifierResponse = GetConsistentMarketingConsentByIdentifierResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentRequest = CreateMarketingConsentRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentResponse = CreateMarketingConsentResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_Link = Link;
  type marketingMarketingConsentV1MarketingConsent_universal_d_LinkType = LinkType;
  const marketingMarketingConsentV1MarketingConsent_universal_d_LinkType: typeof LinkType;
  type marketingMarketingConsentV1MarketingConsent_universal_d_UpdateMarketingConsentRequest = UpdateMarketingConsentRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_UpdateMarketingConsentResponse = UpdateMarketingConsentResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_DeleteMarketingConsentRequest = DeleteMarketingConsentRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_DeleteMarketingConsentResponse = DeleteMarketingConsentResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentRequest = RemoveMarketingConsentRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentResponse = RemoveMarketingConsentResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentByTokenRequest = CreateMarketingConsentByTokenRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentByTokenResponse = CreateMarketingConsentByTokenResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentByTokenRequest = RemoveMarketingConsentByTokenRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentByTokenResponse = RemoveMarketingConsentByTokenResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_QueryMarketingConsentRequest = QueryMarketingConsentRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CursorQuery = CursorQuery;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type marketingMarketingConsentV1MarketingConsent_universal_d_Sorting = Sorting;
  type marketingMarketingConsentV1MarketingConsent_universal_d_SortOrder = SortOrder;
  const marketingMarketingConsentV1MarketingConsent_universal_d_SortOrder: typeof SortOrder;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CursorPaging = CursorPaging;
  type marketingMarketingConsentV1MarketingConsent_universal_d_QueryMarketingConsentResponse = QueryMarketingConsentResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type marketingMarketingConsentV1MarketingConsent_universal_d_Cursors = Cursors;
  type marketingMarketingConsentV1MarketingConsent_universal_d_UpsertMarketingConsentRequest = UpsertMarketingConsentRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_UpsertMarketingConsentResponse = UpsertMarketingConsentResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_BulkUpsertMarketingConsentRequest = BulkUpsertMarketingConsentRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_BulkUpsertMarketingConsentResponse = BulkUpsertMarketingConsentResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_BulkUpsertMarketingConsentResult = BulkUpsertMarketingConsentResult;
  type marketingMarketingConsentV1MarketingConsent_universal_d_Metadata = Metadata;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GenerateLinkRequest = GenerateLinkRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GenerateLinkRequestIdentifierOneOf = GenerateLinkRequestIdentifierOneOf;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GenerateLinkResponse = GenerateLinkResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_Empty = Empty;
  type marketingMarketingConsentV1MarketingConsent_universal_d_DomainEvent = DomainEvent;
  type marketingMarketingConsentV1MarketingConsent_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type marketingMarketingConsentV1MarketingConsent_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type marketingMarketingConsentV1MarketingConsent_universal_d_RestoreInfo = RestoreInfo;
  type marketingMarketingConsentV1MarketingConsent_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type marketingMarketingConsentV1MarketingConsent_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type marketingMarketingConsentV1MarketingConsent_universal_d_ActionEvent = ActionEvent;
  type marketingMarketingConsentV1MarketingConsent_universal_d_MessageEnvelope = MessageEnvelope;
  type marketingMarketingConsentV1MarketingConsent_universal_d_IdentificationData = IdentificationData;
  type marketingMarketingConsentV1MarketingConsent_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type marketingMarketingConsentV1MarketingConsent_universal_d_WebhookIdentityType = WebhookIdentityType;
  const marketingMarketingConsentV1MarketingConsent_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const marketingMarketingConsentV1MarketingConsent_universal_d_getMarketingConsent: typeof getMarketingConsent;
  const marketingMarketingConsentV1MarketingConsent_universal_d_getMarketingConsentByIdentifier: typeof getMarketingConsentByIdentifier;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentByIdentifierOptions = GetMarketingConsentByIdentifierOptions;
  const marketingMarketingConsentV1MarketingConsent_universal_d_getConsistentMarketingConsentByIdentifier: typeof getConsistentMarketingConsentByIdentifier;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetConsistentMarketingConsentByIdentifierOptions = GetConsistentMarketingConsentByIdentifierOptions;
  const marketingMarketingConsentV1MarketingConsent_universal_d_createMarketingConsent: typeof createMarketingConsent;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentOptions = CreateMarketingConsentOptions;
  const marketingMarketingConsentV1MarketingConsent_universal_d_updateMarketingConsent: typeof updateMarketingConsent;
  type marketingMarketingConsentV1MarketingConsent_universal_d_UpdateMarketingConsentOptions = UpdateMarketingConsentOptions;
  const marketingMarketingConsentV1MarketingConsent_universal_d_deleteMarketingConsent: typeof deleteMarketingConsent;
  const marketingMarketingConsentV1MarketingConsent_universal_d_removeMarketingConsent: typeof removeMarketingConsent;
  type marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentOptions = RemoveMarketingConsentOptions;
  const marketingMarketingConsentV1MarketingConsent_universal_d_createMarketingConsentByToken: typeof createMarketingConsentByToken;
  const marketingMarketingConsentV1MarketingConsent_universal_d_removeMarketingConsentByToken: typeof removeMarketingConsentByToken;
  const marketingMarketingConsentV1MarketingConsent_universal_d_queryMarketingConsent: typeof queryMarketingConsent;
  type marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentQueryResult = MarketingConsentQueryResult;
  type marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentQueryBuilder = MarketingConsentQueryBuilder;
  const marketingMarketingConsentV1MarketingConsent_universal_d_upsertMarketingConsent: typeof upsertMarketingConsent;
  type marketingMarketingConsentV1MarketingConsent_universal_d_UpsertMarketingConsentOptions = UpsertMarketingConsentOptions;
  const marketingMarketingConsentV1MarketingConsent_universal_d_bulkUpsertMarketingConsent: typeof bulkUpsertMarketingConsent;
  type marketingMarketingConsentV1MarketingConsent_universal_d_BulkUpsertMarketingConsentOptions = BulkUpsertMarketingConsentOptions;
  const marketingMarketingConsentV1MarketingConsent_universal_d_generateLink: typeof generateLink;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GenerateLinkOptions = GenerateLinkOptions;
  namespace marketingMarketingConsentV1MarketingConsent_universal_d {
    export {
      marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsent as MarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentDetails as MarketingConsentDetails,
      marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentDetailsIdentifierOneOf as MarketingConsentDetailsIdentifierOneOf,
      marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentDetailsIdentifierType as MarketingConsentDetailsIdentifierType,
      marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentState as MarketingConsentState,
      marketingMarketingConsentV1MarketingConsent_universal_d_LastConfirmationActivity as LastConfirmationActivity,
      marketingMarketingConsentV1MarketingConsent_universal_d_Source as Source,
      marketingMarketingConsentV1MarketingConsent_universal_d_OptInLevel as OptInLevel,
      marketingMarketingConsentV1MarketingConsent_universal_d_ExtendedFields as ExtendedFields,
      marketingMarketingConsentV1MarketingConsent_universal_d_LastRevokeActivity as LastRevokeActivity,
      marketingMarketingConsentV1MarketingConsent_universal_d_LastRevokeActivitySource as LastRevokeActivitySource,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentRequest as GetMarketingConsentRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentResponse as GetMarketingConsentResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentByIdentifierRequest as GetMarketingConsentByIdentifierRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentByIdentifierRequestIdentifierOneOf as GetMarketingConsentByIdentifierRequestIdentifierOneOf,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentByIdentifierResponse as GetMarketingConsentByIdentifierResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_CommunicationEligibility as CommunicationEligibility,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetConsistentMarketingConsentByIdentifierRequest as GetConsistentMarketingConsentByIdentifierRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetConsistentMarketingConsentByIdentifierRequestIdentifierOneOf as GetConsistentMarketingConsentByIdentifierRequestIdentifierOneOf,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetConsistentMarketingConsentByIdentifierResponse as GetConsistentMarketingConsentByIdentifierResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentRequest as CreateMarketingConsentRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentResponse as CreateMarketingConsentResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_Link as Link,
      marketingMarketingConsentV1MarketingConsent_universal_d_LinkType as LinkType,
      marketingMarketingConsentV1MarketingConsent_universal_d_UpdateMarketingConsentRequest as UpdateMarketingConsentRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_UpdateMarketingConsentResponse as UpdateMarketingConsentResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_DeleteMarketingConsentRequest as DeleteMarketingConsentRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_DeleteMarketingConsentResponse as DeleteMarketingConsentResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentRequest as RemoveMarketingConsentRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentResponse as RemoveMarketingConsentResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentByTokenRequest as CreateMarketingConsentByTokenRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentByTokenResponse as CreateMarketingConsentByTokenResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentByTokenRequest as RemoveMarketingConsentByTokenRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentByTokenResponse as RemoveMarketingConsentByTokenResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_QueryMarketingConsentRequest as QueryMarketingConsentRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_CursorQuery as CursorQuery,
      marketingMarketingConsentV1MarketingConsent_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      marketingMarketingConsentV1MarketingConsent_universal_d_Sorting as Sorting,
      marketingMarketingConsentV1MarketingConsent_universal_d_SortOrder as SortOrder,
      marketingMarketingConsentV1MarketingConsent_universal_d_CursorPaging as CursorPaging,
      marketingMarketingConsentV1MarketingConsent_universal_d_QueryMarketingConsentResponse as QueryMarketingConsentResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      marketingMarketingConsentV1MarketingConsent_universal_d_Cursors as Cursors,
      marketingMarketingConsentV1MarketingConsent_universal_d_UpsertMarketingConsentRequest as UpsertMarketingConsentRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_UpsertMarketingConsentResponse as UpsertMarketingConsentResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_BulkUpsertMarketingConsentRequest as BulkUpsertMarketingConsentRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_BulkUpsertMarketingConsentResponse as BulkUpsertMarketingConsentResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_BulkUpsertMarketingConsentResult as BulkUpsertMarketingConsentResult,
      marketingMarketingConsentV1MarketingConsent_universal_d_Metadata as Metadata,
      marketingMarketingConsentV1MarketingConsent_universal_d_GenerateLinkRequest as GenerateLinkRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_GenerateLinkRequestIdentifierOneOf as GenerateLinkRequestIdentifierOneOf,
      marketingMarketingConsentV1MarketingConsent_universal_d_GenerateLinkResponse as GenerateLinkResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_Empty as Empty,
      marketingMarketingConsentV1MarketingConsent_universal_d_DomainEvent as DomainEvent,
      marketingMarketingConsentV1MarketingConsent_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      marketingMarketingConsentV1MarketingConsent_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      marketingMarketingConsentV1MarketingConsent_universal_d_RestoreInfo as RestoreInfo,
      marketingMarketingConsentV1MarketingConsent_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      marketingMarketingConsentV1MarketingConsent_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      marketingMarketingConsentV1MarketingConsent_universal_d_ActionEvent as ActionEvent,
      marketingMarketingConsentV1MarketingConsent_universal_d_MessageEnvelope as MessageEnvelope,
      marketingMarketingConsentV1MarketingConsent_universal_d_IdentificationData as IdentificationData,
      marketingMarketingConsentV1MarketingConsent_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      marketingMarketingConsentV1MarketingConsent_universal_d_WebhookIdentityType as WebhookIdentityType,
      marketingMarketingConsentV1MarketingConsent_universal_d_getMarketingConsent as getMarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_getMarketingConsentByIdentifier as getMarketingConsentByIdentifier,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentByIdentifierOptions as GetMarketingConsentByIdentifierOptions,
      marketingMarketingConsentV1MarketingConsent_universal_d_getConsistentMarketingConsentByIdentifier as getConsistentMarketingConsentByIdentifier,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetConsistentMarketingConsentByIdentifierOptions as GetConsistentMarketingConsentByIdentifierOptions,
      marketingMarketingConsentV1MarketingConsent_universal_d_createMarketingConsent as createMarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentOptions as CreateMarketingConsentOptions,
      marketingMarketingConsentV1MarketingConsent_universal_d_updateMarketingConsent as updateMarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_UpdateMarketingConsentOptions as UpdateMarketingConsentOptions,
      marketingMarketingConsentV1MarketingConsent_universal_d_deleteMarketingConsent as deleteMarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_removeMarketingConsent as removeMarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentOptions as RemoveMarketingConsentOptions,
      marketingMarketingConsentV1MarketingConsent_universal_d_createMarketingConsentByToken as createMarketingConsentByToken,
      marketingMarketingConsentV1MarketingConsent_universal_d_removeMarketingConsentByToken as removeMarketingConsentByToken,
      marketingMarketingConsentV1MarketingConsent_universal_d_queryMarketingConsent as queryMarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentQueryResult as MarketingConsentQueryResult,
      marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentQueryBuilder as MarketingConsentQueryBuilder,
      marketingMarketingConsentV1MarketingConsent_universal_d_upsertMarketingConsent as upsertMarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_UpsertMarketingConsentOptions as UpsertMarketingConsentOptions,
      marketingMarketingConsentV1MarketingConsent_universal_d_bulkUpsertMarketingConsent as bulkUpsertMarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_BulkUpsertMarketingConsentOptions as BulkUpsertMarketingConsentOptions,
      marketingMarketingConsentV1MarketingConsent_universal_d_generateLink as generateLink,
      marketingMarketingConsentV1MarketingConsent_universal_d_GenerateLinkOptions as GenerateLinkOptions,
    };
  }
  
  export { marketingMarketingConsentV1MarketingConsent_universal_d as marketingConsentService };
}
