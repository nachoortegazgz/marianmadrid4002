declare module "wix-instagram-media.v1" {
  interface Media {
      /** @readonly */
      _id?: string;
      /** The id of the media */
      mediaId?: string;
      /** 2200 is the max length of a caption in Instagram */
      caption?: string;
      /** The type of the media can be one of [Unknown, Image, Video, CarouselAlbum] */
      mediaType?: MediaType;
      /** Base media url */
      mediaUrl?: string | null;
      /** Permalink to post */
      permalink?: string | null;
      /** Thumbnail url */
      thumbnailUrl?: string | null;
      /** Timestamp of the media */
      timestamp?: Date | null;
      /** Children for CarouselAlbum */
      children?: Children[];
  }
  enum MediaType {
      UNKNOWN = "UNKNOWN",
      IMAGE = "IMAGE",
      VIDEO = "VIDEO",
      CAROUSEL_ALBUM = "CAROUSEL_ALBUM"
  }
  interface Children {
      /** The id of the media */
      mediaId?: string;
      /** The type of the child media can be one of [Unknown, Image, Video] */
      mediaType?: MediaType;
      /** Base media url */
      mediaUrl?: string | null;
      /** Permalink to post */
      permalink?: string | null;
      /** Thumbnail url */
      thumbnailUrl?: string | null;
  }
  interface InvalidateCache extends InvalidateCacheGetByOneOf {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App;
      /** Invalidate by page id */
      page?: Page;
      /** Invalidate by URI path */
      uri?: URI;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File;
      /** tell us why you're invalidating the cache. You don't need to add your app name */
      reason?: string | null;
      /** Is local DS */
      localDc?: boolean;
      hardPurge?: boolean;
  }
  /** @oneof */
  interface InvalidateCacheGetByOneOf {
      /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
      metaSiteId?: string;
      /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
      siteId?: string;
      /** Invalidate by App */
      app?: App;
      /** Invalidate by page id */
      page?: Page;
      /** Invalidate by URI path */
      uri?: URI;
      /** Invalidate by file (for media files such as PDFs) */
      file?: File;
  }
  interface App {
      /** The AppDefId */
      appDefId?: string;
      /** The instance Id */
      instanceId?: string;
  }
  interface Page {
      /** the msid the page is on */
      metaSiteId?: string;
      /** Invalidate by Page ID */
      pageId?: string;
  }
  interface URI {
      /** the msid the URI is on */
      metaSiteId?: string;
      /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
      uriPath?: string;
  }
  interface File {
      /** the msid the file is related to */
      metaSiteId?: string;
      /** Invalidate by filename (for media files such as PDFs) */
      fileName?: string;
  }
  interface ETagVerificationEvent {
      /**
       * connection id
       * @readonly
       */
      connectionId?: string;
      /** cursor query */
      cursorQuery?: CursorQuery;
  }
  interface CursorQuery extends CursorQueryPagingMethodOneOf {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf {
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
  interface ListInstagramAccountMediaRequest {
      /**
       * connection id
       * @readonly
       */
      connectionId: string;
      /** paging */
      paging?: CursorQuery;
  }
  interface ListInstagramAccountMediaResponse {
      /** instagram media */
      media?: Media[];
      /** paging metadata */
      paging?: PagingMetadataV2;
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
   * Get media from instagram account.
   *
   * Returns list of instagram media including all albums content.
   * @param connectionId - connection id
   * @public
   * @documentationMaturity preview
   * @requiredField connectionId
   * @permissionId INSTAGRAM_ACCOUNTS.GET_MEDIA
   * @adminMethod
   */
  function listInstagramAccountMedia(connectionId: string, options?: ListInstagramAccountMediaOptions): Promise<ListInstagramAccountMediaResponse>;
  interface ListInstagramAccountMediaOptions {
      /** paging */
      paging?: CursorQuery;
  }
  
  type instagramFeedV1InstagramMedia_universal_d_Media = Media;
  type instagramFeedV1InstagramMedia_universal_d_MediaType = MediaType;
  const instagramFeedV1InstagramMedia_universal_d_MediaType: typeof MediaType;
  type instagramFeedV1InstagramMedia_universal_d_Children = Children;
  type instagramFeedV1InstagramMedia_universal_d_InvalidateCache = InvalidateCache;
  type instagramFeedV1InstagramMedia_universal_d_InvalidateCacheGetByOneOf = InvalidateCacheGetByOneOf;
  type instagramFeedV1InstagramMedia_universal_d_App = App;
  type instagramFeedV1InstagramMedia_universal_d_Page = Page;
  type instagramFeedV1InstagramMedia_universal_d_URI = URI;
  type instagramFeedV1InstagramMedia_universal_d_File = File;
  type instagramFeedV1InstagramMedia_universal_d_ETagVerificationEvent = ETagVerificationEvent;
  type instagramFeedV1InstagramMedia_universal_d_CursorQuery = CursorQuery;
  type instagramFeedV1InstagramMedia_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type instagramFeedV1InstagramMedia_universal_d_CursorPaging = CursorPaging;
  type instagramFeedV1InstagramMedia_universal_d_ListInstagramAccountMediaRequest = ListInstagramAccountMediaRequest;
  type instagramFeedV1InstagramMedia_universal_d_ListInstagramAccountMediaResponse = ListInstagramAccountMediaResponse;
  type instagramFeedV1InstagramMedia_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type instagramFeedV1InstagramMedia_universal_d_Cursors = Cursors;
  type instagramFeedV1InstagramMedia_universal_d_DomainEvent = DomainEvent;
  type instagramFeedV1InstagramMedia_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type instagramFeedV1InstagramMedia_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type instagramFeedV1InstagramMedia_universal_d_RestoreInfo = RestoreInfo;
  type instagramFeedV1InstagramMedia_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type instagramFeedV1InstagramMedia_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type instagramFeedV1InstagramMedia_universal_d_ActionEvent = ActionEvent;
  type instagramFeedV1InstagramMedia_universal_d_Empty = Empty;
  type instagramFeedV1InstagramMedia_universal_d_MessageEnvelope = MessageEnvelope;
  type instagramFeedV1InstagramMedia_universal_d_IdentificationData = IdentificationData;
  type instagramFeedV1InstagramMedia_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type instagramFeedV1InstagramMedia_universal_d_WebhookIdentityType = WebhookIdentityType;
  const instagramFeedV1InstagramMedia_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const instagramFeedV1InstagramMedia_universal_d_listInstagramAccountMedia: typeof listInstagramAccountMedia;
  type instagramFeedV1InstagramMedia_universal_d_ListInstagramAccountMediaOptions = ListInstagramAccountMediaOptions;
  namespace instagramFeedV1InstagramMedia_universal_d {
    export {
      instagramFeedV1InstagramMedia_universal_d_Media as Media,
      instagramFeedV1InstagramMedia_universal_d_MediaType as MediaType,
      instagramFeedV1InstagramMedia_universal_d_Children as Children,
      instagramFeedV1InstagramMedia_universal_d_InvalidateCache as InvalidateCache,
      instagramFeedV1InstagramMedia_universal_d_InvalidateCacheGetByOneOf as InvalidateCacheGetByOneOf,
      instagramFeedV1InstagramMedia_universal_d_App as App,
      instagramFeedV1InstagramMedia_universal_d_Page as Page,
      instagramFeedV1InstagramMedia_universal_d_URI as URI,
      instagramFeedV1InstagramMedia_universal_d_File as File,
      instagramFeedV1InstagramMedia_universal_d_ETagVerificationEvent as ETagVerificationEvent,
      instagramFeedV1InstagramMedia_universal_d_CursorQuery as CursorQuery,
      instagramFeedV1InstagramMedia_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      instagramFeedV1InstagramMedia_universal_d_CursorPaging as CursorPaging,
      instagramFeedV1InstagramMedia_universal_d_ListInstagramAccountMediaRequest as ListInstagramAccountMediaRequest,
      instagramFeedV1InstagramMedia_universal_d_ListInstagramAccountMediaResponse as ListInstagramAccountMediaResponse,
      instagramFeedV1InstagramMedia_universal_d_PagingMetadataV2 as PagingMetadataV2,
      instagramFeedV1InstagramMedia_universal_d_Cursors as Cursors,
      instagramFeedV1InstagramMedia_universal_d_DomainEvent as DomainEvent,
      instagramFeedV1InstagramMedia_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      instagramFeedV1InstagramMedia_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      instagramFeedV1InstagramMedia_universal_d_RestoreInfo as RestoreInfo,
      instagramFeedV1InstagramMedia_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      instagramFeedV1InstagramMedia_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      instagramFeedV1InstagramMedia_universal_d_ActionEvent as ActionEvent,
      instagramFeedV1InstagramMedia_universal_d_Empty as Empty,
      instagramFeedV1InstagramMedia_universal_d_MessageEnvelope as MessageEnvelope,
      instagramFeedV1InstagramMedia_universal_d_IdentificationData as IdentificationData,
      instagramFeedV1InstagramMedia_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      instagramFeedV1InstagramMedia_universal_d_WebhookIdentityType as WebhookIdentityType,
      instagramFeedV1InstagramMedia_universal_d_listInstagramAccountMedia as listInstagramAccountMedia,
      instagramFeedV1InstagramMedia_universal_d_ListInstagramAccountMediaOptions as ListInstagramAccountMediaOptions,
    };
  }
  
  export { instagramFeedV1InstagramMedia_universal_d as media };
}
