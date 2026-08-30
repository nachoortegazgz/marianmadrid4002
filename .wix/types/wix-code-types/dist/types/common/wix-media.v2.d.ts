declare module "wix-media.v2" {
    interface Folder {
        /** Folder ID. Generated when a folder is created in the Media Manager. */
        _id?: string;
        /** Folder name as it appears in the Media Manager. */
        displayName?: string;
        /** ID of the folder's parent folder. <br /> Default: `media-root` folder. */
        parentFolderId?: string;
        /**
         * Date the folder was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date the folder was updated.
         * @readonly
         */
        _updatedDate?: Date;
        /**
         * State of the folder.
         * @readonly
         */
        state?: State$1;
    }
    enum State$1 {
        OK = "OK",
        DELETED = "DELETED"
    }
    enum Namespace$1 {
        NO_NAMESPACE = "NO_NAMESPACE",
        OTHERS = "OTHERS",
        /** ANY = 2; */
        WIX_VIDEO = "WIX_VIDEO",
        /** _nsWixMusic */
        WIX_MUSIC = "WIX_MUSIC",
        /** _nsArtStore */
        ALBUMS_AND_ART_STORE = "ALBUMS_AND_ART_STORE",
        /** _nsDigitalProduct */
        WIX_ECOM = "WIX_ECOM",
        /** _nsPhotoShareApp */
        PHOTO_SHARE_APP = "PHOTO_SHARE_APP",
        /** _nsSharingApp, */
        SHARING_APP = "SHARING_APP",
        /** engage */
        CHAT = "CHAT",
        /** logobuilder */
        LOGO_BUILDER = "LOGO_BUILDER",
        /** WixExposure */
        ALBUMS_OLD = "ALBUMS_OLD",
        /** chat-mobile-uploads */
        CHAT_MOBILE = "CHAT_MOBILE",
        /** _nsWixForms */
        WIX_FORMS = "WIX_FORMS"
    }
    interface CreateFolderRequest {
        /** Folder name that appears in the Media Manager. */
        displayName: string;
        /** ID of the folder's parent folder. */
        parentFolderId?: string | null;
    }
    interface CreateFolderResponse {
        /** Information about the newly created folder. */
        folder?: Folder;
    }
    interface GetFolderRequest {
        /** Folder ID. */
        folderId: string;
    }
    interface GetFolderResponse {
        /** Information about the folder. */
        folder?: Folder;
    }
    interface ListFoldersRequest {
        /**
         * ID of the folder's parent folder.
         * <br /> Default: `media-root` folder.
         */
        parentFolderId?: string | null;
        /**
         * Field name and order to sort by. One of:
         * - `displayName`
         * - `_updatedDate`
         * Default: `_updatedDate` in `"DESC"` order.
         */
        sort?: Sorting$1;
        /** Cursor and paging information. */
        paging?: CursorPaging$1;
    }
    interface Sorting$1 {
        /** Name of the field to sort by. */
        fieldName?: string;
        /** Sort order. */
        order?: SortOrder$1;
    }
    enum SortOrder$1 {
        ASC = "ASC",
        DESC = "DESC"
    }
    interface CursorPaging$1 {
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
    interface ListFoldersResponse {
        /** Information about the folders in the requested folder. */
        folders?: Folder[];
        /** The next cursor if it exists. */
        nextCursor?: PagingMetadataV2$1;
    }
    interface PagingMetadataV2$1 {
        /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
        total?: number | null;
        /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
        cursors?: Cursors$1;
    }
    interface Cursors$1 {
        /** Cursor string pointing to the next page in the list of results. */
        next?: string | null;
    }
    interface SearchFoldersRequest {
        /**
         * A root folder in the media manager to search in. <br />
         * Default: `MEDIA_ROOT`.
         */
        rootFolder?: RootFolder$1;
        /**
         * Field name and order to sort by. One of:
         * - `displayName`
         * - `_updatedDate`
         *
         * Default: `_updatedDate` in `"DESC"` order.
         */
        sort?: Sorting$1;
        /** Cursor and paging information. */
        paging?: CursorPaging$1;
        /**
         * Term to search for, such as the value of a folder's `displayName`. <br />
         * For example, if a folder's `displayName` is 'my-videos-folder', the search term is 'my-videos-folder'.
         */
        search?: string | null;
    }
    enum RootFolder$1 {
        /** Root of all site media */
        MEDIA_ROOT = "MEDIA_ROOT",
        /** Root of the trash system folder */
        TRASH_ROOT = "TRASH_ROOT",
        /** Root of all visitor uploads */
        VISITOR_UPLOADS_ROOT = "VISITOR_UPLOADS_ROOT"
    }
    interface SearchFoldersResponse {
        /** Information about the folders in the requested folder. */
        folders?: Folder[];
        /** The next cursor if it exists. */
        nextCursor?: PagingMetadataV2$1;
    }
    interface UpdateFolderRequest {
        /** The folder to update. */
        folder: Folder;
    }
    interface UpdateFolderResponse {
        /** Information about the updated folder. */
        folder?: Folder;
    }
    interface GenerateFolderDownloadUrlRequest {
        /** Folder ID. */
        folderId: string;
    }
    interface GenerateFolderDownloadUrlResponse {
        /** URL for downloading a specific folder in the Media Manager. */
        downloadUrl?: string;
    }
    interface BulkDeleteFoldersRequest {
        /** IDs of the folders to move to the Media Manager's trash bin. */
        folderIds: string[];
        /**
         * Whether the specified folders are permanently deleted. <br />
         * Default: `false`
         */
        permanent?: boolean;
    }
    interface BulkDeleteFoldersResponse {
    }
    interface BulkRestoreFoldersFromTrashBinRequest {
        /** IDs of the folders to restore from the Media Manager's trash bin. */
        folderIds: string[];
    }
    interface BulkRestoreFoldersFromTrashBinResponse {
    }
    interface ListDeletedFoldersRequest {
        /** ID of the folder's parent folder. */
        parentFolderId?: string | null;
        /**
         * Field name and order to sort by. One of:
         * - `displayName`
         * - `_updatedDate`
         *
         * Default: `_updatedDate` in `"DESC"` order.
         */
        sort?: Sorting$1;
        /** Cursor and paging information. */
        paging?: CursorPaging$1;
    }
    interface ListDeletedFoldersResponse {
        /** List of folders in the Media Manager's trash bin. */
        folders?: Folder[];
        /** The next cursor if it exists. */
        nextCursor?: PagingMetadataV2$1;
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
    interface DomainEventBodyOneOf$1 {
        createdEvent?: EntityCreatedEvent$1;
        updatedEvent?: EntityUpdatedEvent$1;
        deletedEvent?: EntityDeletedEvent$1;
        actionEvent?: ActionEvent$1;
    }
    interface EntityCreatedEvent$1 {
        entityAsJson?: string;
    }
    interface EntityUpdatedEvent$1 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$1 {
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
     * Creates a new folder in the Media Manager.
     *
     * The `createFolder()` function returns a Promise that resolves to the created folder.
     *
     * Use the `parentFolderId` parameter to specify in which existing folder you want the new folder to be created.
     * If no folder is specified, the new folder is created in the `media-root` folder.
     * @param displayName - Folder name that appears in the Media Manager.
     * @public
     * @requiredField displayName
     * @param options - Options for specifying where to create a folder.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @applicableIdentity APP
     * @adminMethod
     */
    function createFolder(displayName: string, options?: CreateFolderOptions): Promise<CreateFolderResponse>;
    interface CreateFolderOptions {
        /** ID of the folder's parent folder. */
        parentFolderId?: string | null;
    }
    /**
     * Gets information from the specified folder in the Media Manager.
     *
     * The `getFolder()` function returns a Promise that resolves to information about the specified folder.
     * @param folderId - Folder ID.
     * @public
     * @requiredField folderId
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Read Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.READ-MEDIAMANAGER
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @applicableIdentity APP
     * @adminMethod
     * @returns Information about the folder.
     */
    function getFolder(folderId: string): Promise<Folder>;
    /**
     * Retrieves a list of folders in the Media Manager.
     *
     * The `listFolders()` function returns a Promise that resolves to information about the specified folders and cursor information.
     *
     * To retrieve a list of folders within a specific folder in the Media Manager, pass the specific folder's ID in the `parentFolderId` parameter. If no folder is specified, the function retrieves only the list of folders within the root folder of the Media Manager.
     *
     * To retrieve a list of (non-permanently) deleted folders, use the `listDeletedFolders()` function.
     * @public
     * @param options - Options to use when listing folders from the Media Manager.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Read Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.READ-MEDIAMANAGER
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @applicableIdentity APP
     * @adminMethod
     */
    function listFolders(options?: ListFoldersOptions): Promise<ListFoldersResponse>;
    interface ListFoldersOptions {
        /**
         * ID of the folder's parent folder.
         * <br /> Default: `media-root` folder.
         */
        parentFolderId?: string | null;
        /**
         * Field name and order to sort by. One of:
         * - `displayName`
         * - `_updatedDate`
         *
         * Default: `_updatedDate` in `"DESC"` order.
         */
        sort?: Sorting$1;
        /** Cursor and paging information. */
        paging?: CursorPaging$1;
    }
    /**
     * Searches the Media Manager and returns a list of folders that match the terms specified in the parameters.
     *
     * The `searchFolders()` function returns a Promise that resolves to information about the specified folders and cursor information.
     *
     * If no parameters are specified, the function returns all folders in the `MEDIA_ROOT` folder.
     * @public
     * @param options - Options specifying which folders to search.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Read Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.READ-MEDIAMANAGER
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @applicableIdentity APP
     * @adminMethod
     */
    function searchFolders(options?: SearchFoldersOptions): Promise<SearchFoldersResponse>;
    interface SearchFoldersOptions {
        /**
         * A root folder in the media manager to search in. <br />
         * Default: `MEDIA_ROOT`.
         */
        rootFolder?: RootFolder$1;
        /**
         * Field name and order to sort by. One of:
         * - `displayName`
         * - `_updatedDate`
         *
         * Default: `_updatedDate` in `"DESC"` order.
         */
        sort?: Sorting$1;
        /** Cursor and paging information. */
        paging?: CursorPaging$1;
        /**
         * Term to search for, such as the value of a folder's `displayName`.
         *
         * For example, if a folder's `displayName` is 'my-videos-folder', the search term is `'my-videos-folder'`.
         */
        search?: string | null;
    }
    interface UpdateFolder {
        /** Folder ID. Generated when a folder is created in the Media Manager. */
        _id?: string;
        /** Folder name as it appears in the Media Manager. */
        displayName?: string;
        /** ID of the folder's parent folder. <br /> Default: `media-root` folder. */
        parentFolderId?: string;
        /**
         * Date the folder was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date the folder was updated.
         * @readonly
         */
        _updatedDate?: Date;
        /**
         * State of the folder.
         * @readonly
         */
        state?: State$1;
    }
    interface UpdateFolderOptions {
    }
    /**
     * Generates a URL for downloading a compressed file containing a specific folder in the Media Manager.
     *
     * The `generateFolderDownloadUrl()` function returns a Promise that resolves to a download URL.
     *
     * The compressed file can contain sub-folders, and up to 1000 files.
     * @param folderId - Folder ID.
     * @public
     * @requiredField folderId
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @applicableIdentity APP
     * @adminMethod
     */
    function generateFolderDownloadUrl(folderId: string): Promise<GenerateFolderDownloadUrlResponse>;
    /**
     * Temporarily deletes the specified folders from the Media Manager.
     *
     * The `bulkDeleteFolders()` function returns a Promise that resolves when the folders are deleted.
     *
     * The deleted folders are moved to the Media Manager's `TRASH_ROOT` folder (trash bin) unless permanently deleted. To permanently delete folders, pass the `permanent` parameter with the value `true`. Permanently deleting folders isn't reversible, so make sure that the files in these folders aren't being used in a site or in any other way as the files will no longer be accessible.
     *
     * >**Notes:**
     * > - When a folder is deleted, the files in that folder are deleted.
     * > - The specified folders can be from different parent folders.
     * > - Moving multiple folders at once is an asynchronous action, and may take time for the changes to appear in the Media Manager.
     * > - Attempting to delete folders that are already in the trash bin doesn't result in an error.
     * > - If your site contains files from a non-permanently deleted media folder, the files still appear on your site as the deleted folder is still in the Media Manager (in the trash bin).
     * > - You can use the `bulkRestoreFoldersFromTrashBin()` function to restore folders from the Media Manager's trash bin.
     * @param folderIds - IDs of the folders to move to the Media Manager's trash bin.
     * @public
     * @requiredField folderIds
     * @param options - Options to use when deleting folders.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @applicableIdentity APP
     * @adminMethod
     */
    function bulkDeleteFolders(folderIds: string[], options?: BulkDeleteFoldersOptions): Promise<void>;
    interface BulkDeleteFoldersOptions {
        /**
         * Whether the specified folders are permanently deleted. <br />
         * Default: `false`
         */
        permanent?: boolean;
    }
    /**
     * Restores the specified folders from the Media Manager's trash bin, and moves them to their original locations in the Media Manager.
     *
     *
     * The `bulkRestoreFoldersFromTrashBin()` function returns a Promise that resolves when the folders have been restored.
     * @param folderIds - IDs of the folders to restore from the Media Manager's trash bin.
     * @public
     * @requiredField folderIds
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @applicableIdentity APP
     * @adminMethod
     */
    function bulkRestoreFoldersFromTrashBin(folderIds: string[]): Promise<void>;
    /**
     * Retrieves a list of deleted folders from the trash bin.
     *
     * The `listDeletedFolders()` function returns a Promise that resolves to information about the specified deleted folders and cursor information.
     *
     * To retrieve a list of non-deleted folders, use the `listFolders()` function.
     * @public
     * @param options - Options to use when listing deleted folders from the trash bin.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Read Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.READ-MEDIAMANAGER
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @applicableIdentity APP
     * @adminMethod
     */
    function listDeletedFolders(options?: ListDeletedFoldersOptions): Promise<ListDeletedFoldersResponse>;
    interface ListDeletedFoldersOptions {
        /** ID of the folder's parent folder. */
        parentFolderId?: string | null;
        /**
         * Field name and order to sort by. One of:
         * - `displayName`
         * - `_updatedDate`
         *
         * Default: `_updatedDate` in `"DESC"` order.
         */
        sort?: Sorting$1;
        /** Cursor and paging information. */
        paging?: CursorPaging$1;
    }
    type mediaSiteMediaV1FolderFolders_universal_d_Folder = Folder;
    type mediaSiteMediaV1FolderFolders_universal_d_CreateFolderRequest = CreateFolderRequest;
    type mediaSiteMediaV1FolderFolders_universal_d_CreateFolderResponse = CreateFolderResponse;
    type mediaSiteMediaV1FolderFolders_universal_d_GetFolderRequest = GetFolderRequest;
    type mediaSiteMediaV1FolderFolders_universal_d_GetFolderResponse = GetFolderResponse;
    type mediaSiteMediaV1FolderFolders_universal_d_ListFoldersRequest = ListFoldersRequest;
    type mediaSiteMediaV1FolderFolders_universal_d_ListFoldersResponse = ListFoldersResponse;
    type mediaSiteMediaV1FolderFolders_universal_d_SearchFoldersRequest = SearchFoldersRequest;
    type mediaSiteMediaV1FolderFolders_universal_d_SearchFoldersResponse = SearchFoldersResponse;
    type mediaSiteMediaV1FolderFolders_universal_d_UpdateFolderRequest = UpdateFolderRequest;
    type mediaSiteMediaV1FolderFolders_universal_d_UpdateFolderResponse = UpdateFolderResponse;
    type mediaSiteMediaV1FolderFolders_universal_d_GenerateFolderDownloadUrlRequest = GenerateFolderDownloadUrlRequest;
    type mediaSiteMediaV1FolderFolders_universal_d_GenerateFolderDownloadUrlResponse = GenerateFolderDownloadUrlResponse;
    type mediaSiteMediaV1FolderFolders_universal_d_BulkDeleteFoldersRequest = BulkDeleteFoldersRequest;
    type mediaSiteMediaV1FolderFolders_universal_d_BulkDeleteFoldersResponse = BulkDeleteFoldersResponse;
    type mediaSiteMediaV1FolderFolders_universal_d_BulkRestoreFoldersFromTrashBinRequest = BulkRestoreFoldersFromTrashBinRequest;
    type mediaSiteMediaV1FolderFolders_universal_d_BulkRestoreFoldersFromTrashBinResponse = BulkRestoreFoldersFromTrashBinResponse;
    type mediaSiteMediaV1FolderFolders_universal_d_ListDeletedFoldersRequest = ListDeletedFoldersRequest;
    type mediaSiteMediaV1FolderFolders_universal_d_ListDeletedFoldersResponse = ListDeletedFoldersResponse;
    const mediaSiteMediaV1FolderFolders_universal_d_createFolder: typeof createFolder;
    type mediaSiteMediaV1FolderFolders_universal_d_CreateFolderOptions = CreateFolderOptions;
    const mediaSiteMediaV1FolderFolders_universal_d_getFolder: typeof getFolder;
    const mediaSiteMediaV1FolderFolders_universal_d_listFolders: typeof listFolders;
    type mediaSiteMediaV1FolderFolders_universal_d_ListFoldersOptions = ListFoldersOptions;
    const mediaSiteMediaV1FolderFolders_universal_d_searchFolders: typeof searchFolders;
    type mediaSiteMediaV1FolderFolders_universal_d_SearchFoldersOptions = SearchFoldersOptions;
    type mediaSiteMediaV1FolderFolders_universal_d_UpdateFolder = UpdateFolder;
    type mediaSiteMediaV1FolderFolders_universal_d_UpdateFolderOptions = UpdateFolderOptions;
    const mediaSiteMediaV1FolderFolders_universal_d_generateFolderDownloadUrl: typeof generateFolderDownloadUrl;
    const mediaSiteMediaV1FolderFolders_universal_d_bulkDeleteFolders: typeof bulkDeleteFolders;
    type mediaSiteMediaV1FolderFolders_universal_d_BulkDeleteFoldersOptions = BulkDeleteFoldersOptions;
    const mediaSiteMediaV1FolderFolders_universal_d_bulkRestoreFoldersFromTrashBin: typeof bulkRestoreFoldersFromTrashBin;
    const mediaSiteMediaV1FolderFolders_universal_d_listDeletedFolders: typeof listDeletedFolders;
    type mediaSiteMediaV1FolderFolders_universal_d_ListDeletedFoldersOptions = ListDeletedFoldersOptions;
    namespace mediaSiteMediaV1FolderFolders_universal_d {
        export { mediaSiteMediaV1FolderFolders_universal_d_Folder as Folder, State$1 as State, Namespace$1 as Namespace, mediaSiteMediaV1FolderFolders_universal_d_CreateFolderRequest as CreateFolderRequest, mediaSiteMediaV1FolderFolders_universal_d_CreateFolderResponse as CreateFolderResponse, mediaSiteMediaV1FolderFolders_universal_d_GetFolderRequest as GetFolderRequest, mediaSiteMediaV1FolderFolders_universal_d_GetFolderResponse as GetFolderResponse, mediaSiteMediaV1FolderFolders_universal_d_ListFoldersRequest as ListFoldersRequest, Sorting$1 as Sorting, SortOrder$1 as SortOrder, CursorPaging$1 as CursorPaging, mediaSiteMediaV1FolderFolders_universal_d_ListFoldersResponse as ListFoldersResponse, PagingMetadataV2$1 as PagingMetadataV2, Cursors$1 as Cursors, mediaSiteMediaV1FolderFolders_universal_d_SearchFoldersRequest as SearchFoldersRequest, RootFolder$1 as RootFolder, mediaSiteMediaV1FolderFolders_universal_d_SearchFoldersResponse as SearchFoldersResponse, mediaSiteMediaV1FolderFolders_universal_d_UpdateFolderRequest as UpdateFolderRequest, mediaSiteMediaV1FolderFolders_universal_d_UpdateFolderResponse as UpdateFolderResponse, mediaSiteMediaV1FolderFolders_universal_d_GenerateFolderDownloadUrlRequest as GenerateFolderDownloadUrlRequest, mediaSiteMediaV1FolderFolders_universal_d_GenerateFolderDownloadUrlResponse as GenerateFolderDownloadUrlResponse, mediaSiteMediaV1FolderFolders_universal_d_BulkDeleteFoldersRequest as BulkDeleteFoldersRequest, mediaSiteMediaV1FolderFolders_universal_d_BulkDeleteFoldersResponse as BulkDeleteFoldersResponse, mediaSiteMediaV1FolderFolders_universal_d_BulkRestoreFoldersFromTrashBinRequest as BulkRestoreFoldersFromTrashBinRequest, mediaSiteMediaV1FolderFolders_universal_d_BulkRestoreFoldersFromTrashBinResponse as BulkRestoreFoldersFromTrashBinResponse, mediaSiteMediaV1FolderFolders_universal_d_ListDeletedFoldersRequest as ListDeletedFoldersRequest, mediaSiteMediaV1FolderFolders_universal_d_ListDeletedFoldersResponse as ListDeletedFoldersResponse, DomainEvent$1 as DomainEvent, DomainEventBodyOneOf$1 as DomainEventBodyOneOf, EntityCreatedEvent$1 as EntityCreatedEvent, EntityUpdatedEvent$1 as EntityUpdatedEvent, EntityDeletedEvent$1 as EntityDeletedEvent, ActionEvent$1 as ActionEvent, MessageEnvelope$1 as MessageEnvelope, IdentificationData$1 as IdentificationData, IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf, WebhookIdentityType$1 as WebhookIdentityType, mediaSiteMediaV1FolderFolders_universal_d_createFolder as createFolder, mediaSiteMediaV1FolderFolders_universal_d_CreateFolderOptions as CreateFolderOptions, mediaSiteMediaV1FolderFolders_universal_d_getFolder as getFolder, mediaSiteMediaV1FolderFolders_universal_d_listFolders as listFolders, mediaSiteMediaV1FolderFolders_universal_d_ListFoldersOptions as ListFoldersOptions, mediaSiteMediaV1FolderFolders_universal_d_searchFolders as searchFolders, mediaSiteMediaV1FolderFolders_universal_d_SearchFoldersOptions as SearchFoldersOptions, mediaSiteMediaV1FolderFolders_universal_d_UpdateFolder as UpdateFolder, mediaSiteMediaV1FolderFolders_universal_d_UpdateFolderOptions as UpdateFolderOptions, mediaSiteMediaV1FolderFolders_universal_d_generateFolderDownloadUrl as generateFolderDownloadUrl, mediaSiteMediaV1FolderFolders_universal_d_bulkDeleteFolders as bulkDeleteFolders, mediaSiteMediaV1FolderFolders_universal_d_BulkDeleteFoldersOptions as BulkDeleteFoldersOptions, mediaSiteMediaV1FolderFolders_universal_d_bulkRestoreFoldersFromTrashBin as bulkRestoreFoldersFromTrashBin, mediaSiteMediaV1FolderFolders_universal_d_listDeletedFolders as listDeletedFolders, mediaSiteMediaV1FolderFolders_universal_d_ListDeletedFoldersOptions as ListDeletedFoldersOptions, };
    }
    interface FileDescriptor {
        /**
         * File ID. Generated when a file is uploaded to the Media Manager.
         * @readonly
         */
        _id?: string;
        /** File name as it appears in the Media Manager. */
        displayName?: string;
        /**
         * Static URL of the file.
         * @readonly
         */
        url?: string;
        /** ID of the file's parent folder. */
        parentFolderId?: string | null;
        /**
         * File hash.
         * @readonly
         */
        hash?: string;
        /**
         * Size of the uploaded file in bytes.
         * @readonly
         */
        sizeInBytes?: string | null;
        /**
         * Whether the link to the uploaded file is public or private. Private links require a token.
         * @readonly
         */
        private?: boolean;
        /**
         * Media file type.
         * @readonly
         */
        mediaType?: MediaType;
        /**
         * Media file content.
         * @readonly
         */
        media?: FileMedia;
        /**
         * Status of the file that was uploaded.
         * * `FAILED`: The file failed to upload, for example, during media post processing.
         * * `READY`: The file uploaded, finished all processing, and is ready for use.
         * * `PENDING`: The file is processing and the URLs are not yet available. This response is returned when importing a file.
         * @readonly
         */
        operationStatus?: OperationStatus;
        /**
         * URL where the file was uploaded from.
         * @readonly
         */
        sourceUrl?: string | null;
        /**
         * URL of the file's thumbnail.
         * @readonly
         */
        thumbnailUrl?: string | null;
        /** Labels assigned to media files that describe and categorize them. Provided by the user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
        labels?: string[];
        /**
         * Date and time the file was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date and time the file was updated.
         * @readonly
         */
        _updatedDate?: Date;
        /**
         * The Wix site ID where the media file is stored.
         * @readonly
         */
        siteId?: string;
        /**
         * State of the file.
         * @readonly
         */
        state?: State;
    }
    enum MediaType {
        UNKNOWN = "UNKNOWN",
        IMAGE = "IMAGE",
        VIDEO = "VIDEO",
        AUDIO = "AUDIO",
        DOCUMENT = "DOCUMENT",
        VECTOR = "VECTOR",
        ARCHIVE = "ARCHIVE",
        MODEL3D = "MODEL3D",
        OTHER = "OTHER"
    }
    interface FileMedia extends FileMediaMediaOneOf {
        /** Information about the image. */
        image?: ImageMedia;
        /** Information about the video. */
        video?: string;
        /** Information about the audio. */
        audio?: AudioV2;
        /** Information about the document. */
        document?: string;
        /** Information about the vector. */
        vector?: ImageMedia;
        /** Information about the archive. */
        archive?: Archive;
        /** Information about the 3D Model. */
        model3d?: Model3D;
    }
    /** @oneof */
    interface FileMediaMediaOneOf {
        /** Information about the image. */
        image?: ImageMedia;
        /** Information about the video. */
        video?: string;
        /** Information about the audio. */
        audio?: AudioV2;
        /** Information about the document. */
        document?: string;
        /** Information about the vector. */
        vector?: ImageMedia;
        /** Information about the archive. */
        archive?: Archive;
        /** Information about the 3D Model. */
        model3d?: Model3D;
    }
    interface ImageMedia {
        /** Image data. */
        image?: string;
        /** Image colors. */
        colors?: Colors;
        /** Information about faces in the image. Use to crop images without cutting out faces. */
        faces?: FaceRecognition[];
        /**
         * Information about the image preview.
         * You can use this to display a preview for private images.
         */
        previewImage?: string;
        /**
         * Optional, An AI generated description of the image
         * @readonly
         */
        caption?: string | null;
    }
    interface Colors {
        /** Main color of the image. */
        prominent?: Color;
        /** Color palette of the image. */
        palette?: Color[];
    }
    interface Color {
        /** HEX color. */
        hex?: string | null;
        /** RGB color. */
        rgb?: ColorRGB;
    }
    interface ColorRGB {
        /** Red channel. */
        r?: number | null;
        /** Green channel. */
        g?: number | null;
        /** Blue channel. */
        b?: number | null;
    }
    /**
     * Using this object you can crop images while centering on faces
     * ------------------------
     * |                      |
     * |    x,y               |
     * |    *--------         |
     * |    |  .  . |         |
     * |    |   |   | height  |
     * |    |  \ /  |         |
     * |    |       |         |
     * |    ---------         |
     * |     width            |
     * |                      |
     * |______________________|
     */
    interface FaceRecognition {
        /** The accuracy percentage of the face recognition. The likelihood that a face is detected. */
        confidence?: number;
        /** Top left x pixel coordinate of the face. */
        x?: number;
        /** Top left y pixel coordinate of the face. */
        y?: number;
        /** Face pixel height. */
        height?: number;
        /** Face pixel width. */
        width?: number;
    }
    interface VideoResolution {
        /** Video URL. */
        url?: string;
        /** Video height. */
        height?: number;
        /** Video width. */
        width?: number;
        /**
         * Video format
         * Possible values: ['144p.mp4' '144p.webm' '240p.mp4' '240p.webm' '360p.mp4' '360p.webm' '480p.mp4' '480p.webm'
         * '720p.mp4' '720p.webm' '1080p.mp4' '1080p.webm', 'hls' ]
         */
        format?: string;
    }
    interface AudioV2 {
        /** WixMedia ID. */
        _id?: string;
        /** Audio formats available for this file. */
        assets?: string[];
        /**
         * Audio bitrate.
         * @readonly
         */
        bitrate?: number | null;
        /**
         * Audio format.
         * @readonly
         */
        format?: string | null;
        /**
         * Audio duration in seconds.
         * @readonly
         */
        duration?: number | null;
        /**
         * Audio size in bytes.
         * @readonly
         */
        sizeInBytes?: string | null;
    }
    interface Archive {
        /** WixMedia ID. */
        _id?: string;
        /** Archive URL. */
        url?: string;
        /**
         * Archive URL expiration date (when relevant).
         * @readonly
         */
        urlExpirationDate?: Date;
        /** Archive size in bytes. */
        sizeInBytes?: string | null;
        /** Archive filename. */
        filename?: string | null;
    }
    interface Model3D {
        /** WixMedia 3D ID. */
        _id?: string;
        /** 3D URL. */
        url?: string;
        /** 3D thumbnail Image */
        thumbnail?: string;
        /** 3D alt text. */
        altText?: string | null;
        /**
         * 3D URL expiration date (when relevant).
         * @readonly
         */
        urlExpirationDate?: Date;
        /**
         * 3D filename.
         * @readonly
         */
        filename?: string | null;
        /**
         * 3D size in bytes.
         * @readonly
         */
        sizeInBytes?: string | null;
    }
    interface OtherMedia {
        /** WixMedia ID. for use with Site Media APIs only */
        _id?: string;
        /**
         * The media type of the file: 'site_icon', 'swf', 'package', 'ufont'
         * @readonly
         */
        internalMediaType?: string | null;
        /**
         * size in bytes. Optional.
         * @readonly
         */
        sizeInBytes?: string | null;
    }
    enum OperationStatus {
        /** File upload or processing failed */
        FAILED = "FAILED",
        /** File is ready for consumption */
        READY = "READY",
        /** File is waiting for processing or currently being processed */
        PENDING = "PENDING"
    }
    enum State {
        /** File is ready for consumption */
        OK = "OK",
        /** Deleted file */
        DELETED = "DELETED"
    }
    enum Namespace {
        NO_NAMESPACE = "NO_NAMESPACE",
        OTHERS = "OTHERS",
        /** ANY = 2; */
        WIX_VIDEO = "WIX_VIDEO",
        /** _nsWixMusic */
        WIX_MUSIC = "WIX_MUSIC",
        /** _nsArtStore */
        ALBUMS_AND_ART_STORE = "ALBUMS_AND_ART_STORE",
        /** _nsDigitalProduct */
        WIX_ECOM = "WIX_ECOM",
        /** _nsPhotoShareApp */
        PHOTO_SHARE_APP = "PHOTO_SHARE_APP",
        /** _nsSharingApp, */
        SHARING_APP = "SHARING_APP",
        /** engage */
        CHAT = "CHAT",
        /** logobuilder */
        LOGO_BUILDER = "LOGO_BUILDER",
        /** WixExposure */
        ALBUMS_OLD = "ALBUMS_OLD",
        /** chat-mobile-uploads */
        CHAT_MOBILE = "CHAT_MOBILE",
        /** _nsWixForms */
        WIX_FORMS = "WIX_FORMS"
    }
    interface IdentityInfo {
        /** The type of the user that uploaded the file */
        identityType?: IdentityType;
        /** User Id. empty when UNKNOWN */
        identityId?: string | null;
    }
    enum IdentityType {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    interface FileReady {
        /** File entity that is ready with full information */
        file?: FileDescriptor;
        /** External information passed in the file import or upload. */
        externalInfo?: ExternalInfo;
        /** The File was restored from the trash-bin */
        triggeredByUndelete?: boolean;
    }
    interface ExternalInfo {
        /** External information to pass in the File Ready or File Failed events. */
        origin?: string;
        /** External IDs to pass in the File Ready or File Failed events. */
        externalIds?: string[];
    }
    interface FileFailed {
        /** External information passed in the file import or upload. */
        externalInfo?: ExternalInfo;
    }
    interface GenerateFilesDownloadUrlRequest {
        /**
         * IDs of the files to download.
         *
         * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
         * Learn more in the File and Folder IDs article.
         */
        fileIds: string[];
    }
    interface GenerateFilesDownloadUrlResponse {
        /** URL for downloading the compressed file containing the specified files in the Media Manager. */
        downloadUrl?: string;
    }
    interface GenerateFileDownloadUrlRequest {
        /**
         * File ID.
         *
         * You can also pass the file's Wix media URL. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
         * Learn more in the File and Folder IDs article.
         */
        fileId: string;
        /**
         * Temporary file name used to identify the file type. For example, a file named "myFile.jpeg" identifies as an "image/jpeg" file type. <br />
         *
         * **Note:** The name that appears in the Media Manager is taken from the `filename` query parameter in the upload request.
         */
        downloadFileName?: string | null;
        /**
         * The time that it takes in minutes for the download URL to expire. <br />
         * Default: `600`. <br />
         * Limit: `525600` (1 year).
         */
        expirationInMinutes?: number | null;
        /**
         * The redirect URL for when the temporary download URL with a token expires. <br />
         * Default: A 403 Forbidden response page.
         */
        expirationRedirectUrl?: string | null;
        /**
         * Keys for downloading different assets (format and quality) of a file.
         * Default: `src`, key representing the original file's format and quality.
         */
        assetKeys?: string[] | null;
        /**
         * Whether the link downloads the file or opens the file in the browser.
         *
         * - `ATTACHMENT`: The link downloads the file.
         * - `INLINE`: The link opens the file in the browser.
         *
         * Default: `ATTACHMENT`
         */
        contentDisposition?: ContentDisposition;
    }
    enum ContentDisposition {
        /** Using the link in the browser will download the file */
        ATTACHMENT = "ATTACHMENT",
        /** Using the link in the browser will open the file in the browser */
        INLINE = "INLINE"
    }
    interface GenerateFileDownloadUrlResponse {
        /** URL for downloading a specific file in the Media Manager. */
        downloadUrls?: DownloadUrl[];
    }
    interface DownloadUrl {
        /** The file download URL. */
        url?: string;
        /**
         * Key for downloading a different asset (format and quality) of a file.
         * Default: `src`, key representing the original file's format and quality.
         */
        assetKey?: string;
    }
    interface GetFileDescriptorRequest {
        /**
         * File ID.
         *
         * You can also pass the file's Wix media URL. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
         * Learn more in the File and Folder IDs article.
         */
        fileId: string;
    }
    interface GetFileDescriptorResponse {
        /** Information about the file. */
        file?: FileDescriptor;
    }
    interface GetFileDescriptorsRequest {
        /**
         * File IDs.
         *
         * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
         * Learn more in the File and Folder IDs article.
         */
        fileIds: string[];
    }
    interface GetFileDescriptorsResponse {
        /** Information about the requested files. */
        files?: FileDescriptor[];
    }
    interface UpdateFileDescriptorRequest {
        /** The file to update. */
        file: FileDescriptor;
    }
    interface UpdateFileDescriptorResponse {
        /** Information about the updated file. */
        file?: FileDescriptor;
    }
    interface GenerateFileUploadUrlRequest {
        /** File mime type. */
        mimeType: string | null;
        /**
         * Temporary file name used to identify the file type. For example, a file named "myFile.jpeg" identifies as an "image/jpeg" file type.
         * <br /> **Note:** The name that appears in the Media Manager is taken from the `filename` query parameter in the upload request.
         */
        fileName?: string | null;
        /**
         * File size in bytes.
         * @readonly
         */
        sizeInBytes?: string | null;
        /**
         * ID of the file's parent folder. <br />
         * This folder is the path root for the `filePath`.<br />
         * Default: `media-root`.
         */
        parentFolderId?: string | null;
        /** Whether the link to the uploaded file is public or private. See `Private Files` in terminology. */
        private?: boolean | null;
        /** Labels assigned to media files that describe and categorize them. Provided by the user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
        labels?: string[] | null;
        /** Information sent to the `onFileDescriptorFileReady( )` and `onFileDescriptorFileFailed( )` events. See the Importing Files article to learn more. */
        externalInfo?: ExternalInfo;
        /**
         * Path to the folder where the file will be stored.
         * For example, `/videos/2024/december`. <br/>
         * If `parentFolderId` is defined, the parent folder is used as the path root. Otherwise, the root is `media-root`.
         * The folders in the path will be created if they don't already exist.  <br />
         */
        filePath?: string | null;
    }
    interface GenerateFileUploadUrlResponse {
        /** The URL for uploading a file to the Media Manager. */
        uploadUrl?: string;
    }
    interface GenerateFileResumableUploadUrlRequest {
        /** File mime type. */
        mimeType: string | null;
        /**
         * Temporary file name used to identify the file type. For example, a file named "myFile.jpeg" identifies as an "image/jpeg" file type.
         * <br /> **Note:** The name that appears in the Media Manager is taken from the `filename` query parameter in the upload request.
         */
        fileName?: string | null;
        /**
         * File size in bytes.
         * @readonly
         */
        sizeInBytes?: string | null;
        /**
         * ID of the file's parent folder. <br />
         * This folder is the path root for the `filePath`.<br />
         * Default: `media-root`.
         */
        parentFolderId?: string | null;
        /** Whether the link to the imported file is public or private. See `Private Files` in terminology. */
        private?: boolean | null;
        /** Labels assigned to media files that describe and categorize them. Provided by the user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
        labels?: string[] | null;
        /** The upload protocol to use for implementing the resumable upload. */
        uploadProtocol?: UploadProtocol;
        /**
         * Path to the folder where the file will be stored.
         * For example, `/videos/2024/december`. <br/>
         * If `parentFolderId` is defined, the parent folder is used as the path root. Otherwise, the root is `media-root`.
         * The folders in the path will be created if they don't already exist.  <br />
         */
        filePath?: string | null;
    }
    enum UploadProtocol {
        /** The upload protocol to use for implementing the resumable upload. */
        TUS = "TUS"
    }
    interface GenerateFileResumableUploadUrlResponse {
        /**
         * The upload protocol to use for implementing the resumable upload.
         *
         * Supported values: `"TUS"`
         */
        uploadProtocol?: UploadProtocol;
        /** The URL for uploading a file to the Media Manager. */
        uploadUrl?: string;
        /** Single-use upload token. */
        uploadToken?: string;
    }
    interface ImportFileRequest {
        /** Publicly accessible external file URL. */
        url: string;
        /** Media type of the file to import. */
        mediaType?: MediaType;
        /** File name that appears in the Media Manager. */
        displayName?: string | null;
        /**
         * ID of the file's parent folder. <br />
         * This folder is the path root for the `filePath`. <br />
         * Default: `media-root`.
         */
        parentFolderId?: string | null;
        /** Whether the link to the imported file is public or private. */
        private?: boolean | null;
        /** Labels assigned to media files that describe and categorize them. Provided by the user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
        labels?: string[] | null;
        /** File mime type. */
        mimeType?: string;
        /** Information sent to the `onFileDescriptorFileReady( )` and `onFileDescriptorFileFailed( )` events. See the Importing Files article to learn more. */
        externalInfo?: ExternalInfo;
        /** Optional parameters that should be sent with the external URL. */
        urlParams?: Record<string, any> | null;
        /** Optional headers that should be sent with the external URL. */
        urlHeaders?: Record<string, any> | null;
        /**
         * Path to the folder where the file will be stored.
         * For example, `/videos/2024/december`. <br/>
         * If `parentFolderId` is defined, the parent folder is used as the path root. Otherwise, the root is `media-root`.
         * The folders in the path will be created if they don't already exist.  <br />
         */
        filePath?: string | null;
    }
    interface ImportFileResponse {
        /** Information about the imported file. */
        file?: FileDescriptor;
    }
    interface BulkImportFilesRequest {
        /** Information about the files to import. */
        importFileRequests: ImportFileRequest[];
    }
    interface BulkImportFilesResponse {
        /** Information about the imported files. */
        files?: FileDescriptor[];
    }
    interface BulkImportFileRequest {
        /** Information about the files to import. */
        importFileRequests: ImportFileRequest[];
        /**
         * Whether to include the imported File Descriptor in the response. Set to `false` to exclude the File Descriptor from the returned object.
         *
         * Default: `true`
         */
        returnEntity?: boolean | null;
    }
    interface BulkImportFileResponse {
        /** Items created by bulk action. */
        results?: BulkImportFileResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata;
    }
    interface BulkImportFileResult {
        /** Item metadata. */
        itemMetadata?: ItemMetadata;
        /** Imported file. This field is returned if the operation was successful and `returnEntity` is not set to `false`. */
        item?: FileDescriptor;
    }
    interface ItemMetadata {
        /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
        _id?: string | null;
        /** Index of the item within the request array. Allows for correlation between request and response items. */
        originalIndex?: number;
        /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
        success?: boolean;
        /** Details about the error in case of failure. */
        error?: ApplicationError;
    }
    interface ApplicationError {
        /** Error code. */
        code?: string;
        /** Description of the error. */
        description?: string;
        /** Data related to the error. */
        data?: Record<string, any> | null;
    }
    interface BulkActionMetadata {
        /** Number of items that were successfully processed. */
        totalSuccesses?: number;
        /** Number of items that couldn't be processed. */
        totalFailures?: number;
        /** Number of failures without details because detailed failure threshold was exceeded. */
        undetailedFailures?: number;
    }
    interface ListFilesRequest {
        /**
         * ID of the file's parent folder. <br />
         * Default:`media-root`.
         */
        parentFolderId?: string | null;
        /**
         * File media type.
         * excluding: OTHER media type
         */
        mediaTypes?: MediaType[];
        /** Whether the link to the imported file is public or private. */
        private?: boolean | null;
        /**
         * Field name and order to sort by. One of:
         *
         * - `displayName`
         * - `_updatedDate`
         * - `sizeInBytes`
         *
         * Default: `_updatedDate` in `"DESC"` order.
         */
        sort?: Sorting;
        /** Cursor and paging information. */
        paging?: CursorPaging;
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
    interface ListFilesResponse {
        /** List of files in the Media Manager. */
        files?: FileDescriptor[];
        /** The next cursor if it exists. */
        nextCursor?: PagingMetadataV2;
    }
    interface PagingMetadataV2 {
        /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
        total?: number | null;
        /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
        cursors?: Cursors;
    }
    interface Cursors {
        /** Cursor string pointing to the next page in the list of results. */
        next?: string | null;
    }
    interface SearchFilesRequest {
        /**
         * Term to search for. Possible terms include the value of a file's
         * `displayName`, `mimeType`, and `label`. <br />
         * For example, if a file's label is cat, the search term is 'cat'.
         */
        search?: string | null;
        /**
         * A root folder in the media manager to search in. <br />
         * Default: `MEDIA_ROOT`.
         */
        rootFolder?: RootFolder;
        /**
         * File media type.
         * excluding: OTHER media type
         */
        mediaTypes?: MediaType[];
        /** Whether the link to the imported file is public or private. */
        private?: boolean | null;
        /**
         * Field name and order to sort by. One of:
         *
         * - `displayName`
         * - `_updatedDate`
         * - `sizeInBytes`
         *
         * Default: `_updatedDate` in `"DESC"` order.
         */
        sort?: Sorting;
        /** Cursor and paging information. */
        paging?: CursorPaging;
    }
    enum RootFolder {
        /** Root of all site media */
        MEDIA_ROOT = "MEDIA_ROOT",
        /** Root of the trash system folder */
        TRASH_ROOT = "TRASH_ROOT",
        /** Root of all visitor uploads */
        VISITOR_UPLOADS_ROOT = "VISITOR_UPLOADS_ROOT"
    }
    interface SearchFilesResponse {
        /** Files matching the query. */
        files?: FileDescriptor[];
        /** The next cursor if it exists. */
        nextCursor?: PagingMetadataV2;
    }
    interface GenerateVideoStreamingUrlRequest {
        /**
         * File ID.
         *
         * You can also pass the file's Wix media URL. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
         * Learn more in the File and Folder IDs article.
         */
        fileId: string;
        /** Video stream format. */
        format?: StreamFormat;
    }
    enum StreamFormat {
        UNKNOWN = "UNKNOWN",
        HLS = "HLS",
        DASH = "DASH"
    }
    interface GenerateVideoStreamingUrlResponse {
        /** URL for streaming a specific file in the Media Manager. */
        downloadUrl?: DownloadUrl;
    }
    interface GenerateWebSocketTokenRequest {
    }
    interface GenerateWebSocketTokenResponse {
        /** The web socket token for the identity in the request */
        token?: string;
    }
    interface BulkDeleteFilesRequest {
        /**
         * IDs of the files to move to the Media Manager's trash bin.
         *
         * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
         * Learn more in the File and Folder IDs article.
         */
        fileIds: string[];
        /**
         * Whether the specified files are permanently deleted. <br />
         * Default: `false`
         */
        permanent?: boolean;
    }
    interface BulkDeleteFilesResponse {
    }
    interface BulkRestoreFilesFromTrashBinRequest {
        /**
         * IDs of the files to restore from the Media Manager's trash bin.
         *
         * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
         * Learn more in the File and Folder IDs article.
         */
        fileIds: string[];
    }
    interface BulkRestoreFilesFromTrashBinResponse {
    }
    interface ListDeletedFilesRequest {
        /**
         * ID of the file's parent folder. <br />
         * Default: `media-root`.
         */
        parentFolderId?: string | null;
        /**
         * File media type.
         * excluding: OTHER media type
         */
        mediaTypes?: MediaType[];
        /** Whether the link to the imported file is public or private. */
        private?: boolean | null;
        /**
         * Field name and order to sort by. One of:
         *
         * - `displayName`
         * - `_updatedDate`
         * - `sizeInBytes`
         *
         * Default: `_updatedDate` in `"DESC"` order.
         */
        sort?: Sorting;
        /** Cursor and paging information. */
        paging?: CursorPaging;
    }
    interface ListDeletedFilesResponse {
        /** List of files in the Media Manager's trash bin. */
        files?: FileDescriptor[];
        /** The next cursor if it exists. */
        nextCursor?: PagingMetadataV2;
    }
    interface UpdateFileRequest {
        /**
         * ID of the file to update.
         *
         * You can also pass the file's Wix media URL. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
         * Learn more in the File and Folder IDs article.
         */
        fileId: string;
        /** File name that appears in the Media Manager. */
        displayName?: string | null;
        /**
         * ID of the file's parent folder. <br />
         * Default: `media-root`.
         */
        parentFolderId?: string | null;
        /** Labels assigned to media files that describe and categorize them. Provided by the user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
        labels?: string[] | null;
    }
    interface UpdateFileResponse {
        /** Information about the updated file. */
        file?: FileDescriptor;
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
    }
    interface EntityDeletedEvent {
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
     * Generates a URL for downloading a compressed file containing specific files in the Media Manager.
     *
     * The `generateFilesDownloadUrl()` function returns a Promise that resolves to a download URL.
     *
     * The compressed file can contain up to 1000 files.
     *
     * To generate one or more temporary URLs for downloading a specific file in the Media Manager, use the `generateFileDownloadUrl()` function.
     * You can use the `expirationInMinutes` parameter to set the URL expiration time, making it more secure than the `generateFilesDownloadUrl()` function.
     * Therefore, to download private files, use the `generateFileDownloadUrl` function for each private file that you want to generate a download URL for.
     * @public
     * @requiredField fileIds
     * @param fileIds - IDs of the files to download.
     *
     * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
     * Learn more in the File and Folder IDs article.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     */
    function generateFilesDownloadUrl(fileIds: string[]): Promise<GenerateFilesDownloadUrlResponse>;
    /**
     * Generates one or more temporary URLs for downloading a specific file in the Media Manager.
     *
     * The `generateFileDownloadUrl()` function returns a Promise that resolves to an array containing download URLs for the assets specified in the options parameter.
     *
     * To download different assets of the file, use the `assetKeys` parameter which generates a download URL for each asset.
     * If no asset key is specified, it defaults to `src`, which generates one download URL in the original file's format and quality.
     *
     * Use this function to grant external clients access to a private media file. Use the `expirationInMinutes` parameter to set the URL expiration time, and the `expirationRedirectUrl` parameter to add a redirect URL when the URL expires.
     *
     * To generate a permanent URL for downloading a compressed file that contains multiple files in the Media Manager, use the `generateFilesDownloadUrl()` function.
     * Since this is a permanent URL, it is less secure. Therefore, to download private files, use the `generateFileDownloadUrl()` function for each private file that you want to generate a download URL for.
     * @public
     * @requiredField fileId
     * @param options - Options to use when generating a file's download URL.
     * @param fileId - File ID.
     *
     * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
     * Learn more in the File and Folder IDs article.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     */
    function generateFileDownloadUrl(fileId: string, options?: GenerateFileDownloadUrlOptions): Promise<GenerateFileDownloadUrlResponse>;
    interface GenerateFileDownloadUrlOptions {
        /**
         * Temporary file name used to identify the file type. For example, a file named "myFile.jpeg" identifies as an "image/jpeg" file type. <br />
         *
         * **Note:** The name that appears in the Media Manager is taken from the `filename` query parameter in the upload request.
         */
        downloadFileName?: string | null;
        /**
         * The time that it takes in minutes for the download URL to expire. <br />
         * Default: `600`. <br />
         * Limit: `525600` (1 year).
         */
        expirationInMinutes?: number | null;
        /**
         * The redirect URL for when the temporary download URL with a token expires. <br />
         * Default: A 403 Forbidden response page.
         */
        expirationRedirectUrl?: string | null;
        /**
         * Keys for downloading different assets (format and quality) of a file.
         * Default: `src`, key representing the original file's format and quality.
         */
        assetKeys?: string[] | null;
        /**
         * Whether the link downloads the file or opens the file in the browser.
         *
         * - `ATTACHMENT`: The link downloads the file.
         * - `INLINE`: The link opens the file in the browser.
         *
         * Default: `ATTACHMENT`
         */
        contentDisposition?: ContentDisposition;
    }
    /**
     * Gets information about the specified file in the Media Manager.
     *
     *
     * The `getFileDescriptor()` function returns a Promise that resolves to the specified file's descriptor.
     *
     * Use `getFileDescriptors()` to get multiple file descriptors at once.
     * @public
     * @requiredField fileId
     * @param fileId - File ID.
     *
     * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
     * Learn more in the File and Folder IDs article.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Read Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.READ-MEDIAMANAGER
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     * @returns Information about the file.
     */
    function getFileDescriptor(fileId: string): Promise<FileDescriptor>;
    /**
     * Gets information about the specified files in the Media Manager.
     *
     *
     * The `getFileDescriptors()` function returns a Promise that resolves to an array containing the specified files' descriptors.
     *
     * Use `getFileDescriptor()` to get a single file descriptor.
     * @public
     * @requiredField fileIds
     * @param fileIds - File IDs.
     *
     * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
     * Learn more in the File and Folder IDs article.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Read Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.READ-MEDIAMANAGER
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     */
    function getFileDescriptors(fileIds: string[]): Promise<GetFileDescriptorsResponse>;
    /**
     * Updates a file.
     *
     *
     * The `updateFileDescriptor()` function returns a Promise that resolves to the updated file's descriptor.
     *
     * You can use the `parentFolderId` parameter to move a file from its current folder to a different folder.
     * @param file - The file to update.
     * @public
     * @requiredField file
     * @requiredField file._id
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     * @returns Information about the updated file.
     */
    function updateFileDescriptor(file: FileDescriptor, options?: UpdateFileDescriptorOptions): Promise<FileDescriptor>;
    interface UpdateFileDescriptorOptions {
    }
    /**
     * Generates an upload URL to allow external clients to upload a file to the Media Manager.
     *
     * The `generateFileUploadUrl()` function returns a Promise that resolves to an upload URL.
     *
     * To learn how external clients can use the generated upload URL in the response to upload a file to the Media Manager, see the Upload API article.
     *
     * > **Note:** Any interruption in the upload process stops the file upload. For files larger than 10MB, or when network connection is poor, use `generateFileResumableUploadUrl()` instead. With the resumable upload URL, any interruption in the upload process pauses the file upload, and resumes the file upload process after the interruption.
     * @param mimeType - File mime type.
     * @public
     * @requiredField mimeType
     * @param options - Options to use when generating a file's upload URL.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     */
    function generateFileUploadUrl(mimeType: string | null, options?: GenerateFileUploadUrlOptions): Promise<GenerateFileUploadUrlResponse>;
    interface GenerateFileUploadUrlOptions {
        /**
         * Temporary file name used to identify the file type. For example, a file named "myFile.jpeg" identifies as an "image/jpeg" file type.
         * <br /> **Note:** The name that appears in the Media Manager is taken from the `filename` query parameter in the upload request.
         */
        fileName?: string | null;
        /**
         * File size in bytes.
         * @readonly
         */
        sizeInBytes?: string | null;
        /**
         * ID of the file's parent folder. <br />
         * This folder is the path root for the `filePath`.<br />
         * Default: `media-root`.
         */
        parentFolderId?: string | null;
        /** Whether the link to the uploaded file is public or private. See `Private Files` in terminology. */
        private?: boolean | null;
        /** Labels assigned to media files that describe and categorize them. Provided by the user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
        labels?: string[] | null;
        /** Information sent to the `onFileDescriptorFileReady( )` and `onFileDescriptorFileFailed( )` events. See the Importing Files article to learn more. */
        externalInfo?: ExternalInfo;
        /**
         * Path to the folder where the file will be stored.
         * For example, `/videos/2024/december`. <br/>
         * If `parentFolderId` is defined, the parent folder is used as the path root. Otherwise, the root is `media-root`.
         * The folders in the path will be created if they don't already exist.  <br />
         */
        filePath?: string | null;
    }
    /**
     * Generates a resumable upload URL to allow external clients to upload large files over 10MB to the Media Manager.
     *
     * The `generateFileResumableUploadUrl()` function returns a Promise that resolves to an upload URL, token, and protocol.
     *
     * When using the resumable upload URL, any interruptions will pause the file upload process, which automatically resumes once the interruption is resolved. The resumable upload URL is also helpful when network connection is poor.
     *
     * To learn how external clients can use the generated upload URL in the response to upload large files to the Media Manager, see the Resumable Upload API article.
     * @param mimeType - File mime type.
     * @public
     * @requiredField mimeType
     * @param options - Options to use when generating a resumable upload URL.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     */
    function generateFileResumableUploadUrl(mimeType: string | null, options?: GenerateFileResumableUploadUrlOptions): Promise<GenerateFileResumableUploadUrlResponse>;
    interface GenerateFileResumableUploadUrlOptions {
        /**
         * Temporary file name used to identify the file type. For example, a file named "myFile.jpeg" identifies as an "image/jpeg" file type.
         * <br /> **Note:** The name that appears in the Media Manager is taken from the `filename` query parameter in the upload request.
         */
        fileName?: string | null;
        /**
         * File size in bytes.
         * @readonly
         */
        sizeInBytes?: string | null;
        /**
         * ID of the file's parent folder. <br />
         * This folder is the path root for the `filePath`.<br />
         * Default: `media-root`.
         */
        parentFolderId?: string | null;
        /** Whether the link to the imported file is public or private. See `Private Files` in terminology. */
        private?: boolean | null;
        /** Labels assigned to media files that describe and categorize them. Provided by the user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
        labels?: string[] | null;
        /**
         * The upload protocol to use for implementing the resumable upload.
         *
         * Supported values: `"TUS"`
         */
        uploadProtocol?: UploadProtocol;
        /**
         * Path to the folder where the file will be stored.
         * For example, `/videos/2024/december`. <br/>
         * If `parentFolderId` is defined, the parent folder is used as the path root. Otherwise, the root is `media-root`.
         * The folders in the path will be created if they don't already exist.  <br />
         */
        filePath?: string | null;
    }
    /**
     * Imports a file to the Media Manager using an external URL.
     *
     * The `importFile()` function returns a Promise that resolves to the imported file's descriptor.
     *
     * This function returns information about the imported file. Importing a file is the method through which you can add files to the Media Manager.
     * Use the `parentFolderId` and `filePath` parameters to specify which folder you want the file to be imported to.
     * If no folder is specified, the file is imported to the `media-root` folder.
     *
     * To import a file, you need to do one of the following:
     * - Pass its [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) in the `mimeType` field of the request. For example, `mimeType: 'image/jpeg'`.
     * - Include its extension in either the `displayName` or `url` field of the request. For example, `displayName: 'Example Image.jpeg` or `url: https://www.example.com/image.jpeg`.
     * - Ensure the server hosting the file supports HEAD requests. In these cases the Wix servers can retrieve the MIME type from the hosting server.
     *   > **Note:** If you want to validate the media type, pass the file's expected media type in the optional `mediaType` field of the request.  For example, `mediaType: 'IMAGE'`.
     * @param url - Publicly accessible external file URL.
     * @public
     * @requiredField url
     * @param options - Options to use when importing a single file.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     */
    function importFile(url: string, options?: ImportFileOptions): Promise<ImportFileResponse>;
    interface ImportFileOptions {
        /** Media type of the file to import. */
        mediaType?: MediaType;
        /** File name that appears in the Media Manager. */
        displayName?: string | null;
        /**
         * ID of the file's parent folder. <br />
         * This folder is the path root for the `filePath`. <br />
         * Default: `media-root`.
         */
        parentFolderId?: string | null;
        /** Whether the link to the imported file is public or private. */
        private?: boolean | null;
        /** Labels assigned to media files that describe and categorize them. Provided by the user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
        labels?: string[] | null;
        /** File mime type. */
        mimeType?: string;
        /** Information sent to the `onFileDescriptorFileReady( )` and `onFileDescriptorFileFailed( )` events. See the Importing Files article to learn more. */
        externalInfo?: ExternalInfo;
        /** Optional parameters that should be sent with the external URL. */
        urlParams?: Record<string, any> | null;
        /** Optional headers that should be sent with the external URL. */
        urlHeaders?: Record<string, any> | null;
        /**
         * Path to the folder where the file will be stored.
         * For example, `/videos/2024/december`. <br/>
         * If `parentFolderId` is defined, the parent folder is used as the path root. Otherwise, the root is `media-root`.
         * The folders in the path will be created if they don't already exist.  <br />
         */
        filePath?: string | null;
    }
    /**
     * > **Deprecated.**
     * > This function has been replaced with `bulkImportFile()`, and will be removed on March 31, 2024.
     *
     *
     * The `bulkImportFiles()` function returns a Promise that resolves to an array of the imported files' descriptors.
     *
     * Imports a bulk of files to the Media Manager using external urls.
     *
     * Returns information about the imported files. Use the `parentFolderId` and `filePath` parameters to specify in which folder you want each file to be imported.
     * If no folder is specified, the file is imported to the `media-root` folder.
     *
     * >**Note:** The `media` property isn't returned in the `files` response object.
     *
     * To import files, you need to do one of the following for each file:
     * - Pass its [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) in the `mimeType` field of the request. For example, `mimeType: 'image/jpeg'`.
     * - Include its extension in either the `displayName` or `url` field of the request. For example, `displayName: 'Example Image.jpeg` or `url: https://www.example.com/image.jpeg`.
     * - Ensure the server hosting the file supports HEAD requests. In these cases the Wix servers can retrieve the MIME type from the hosting server.
     *   > **Note:** If you want to validate the media type, pass the file's expected media type in the optional `mediaType` field of the request.  For example, `mediaType: 'IMAGE'`.
     * @param importFileRequests - Information about the files to import.
     * @public
     * @requiredField importFileRequests
     * @requiredField importFileRequests.url
     * @param options - Options to use when uploading multiple files.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     * @deprecated
     * @replacedBy com.wix.media.site_media.v1.FilesService.BulkImportFile
     * @targetRemovalDate 2024-03-31
     */
    function bulkImportFiles(importFileRequests: ImportFileRequest[]): Promise<BulkImportFilesResponse>;
    /**
     * Imports a bulk of files to the Media Manager using external urls.
     *
     * The `bulkImportFile()` function returns a Promise that resolves to an object containing bulk import metadata and an array of imported files' descriptors and metadata.
     *
     * Returns information about the imported files. Use the `parentFolderId` and `filePath` parameters to specify in which folder you want each file to be imported.
     * If no folder is specified, the file is imported to the `media-root` folder.
     *
     * To import files, you need to do one of the following for each file:
     * - Pass its [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) in the `mimeType` field of the request. For example, `mimeType: 'image/jpeg'`.
     * - Include its extension in either the `displayName` or `url` field of the request. For example, `displayName: 'Example Image.jpeg` or `url: https://www.example.com/image.jpeg`.
     * - Ensure the server hosting the file supports HEAD requests. In these cases the Wix servers can retrieve the MIME type from the hosting server.
     *   > **Note:** If you want to validate the media type, pass the file's expected media type in the optional `mediaType` field of the request.  For example, `mediaType: 'IMAGE'`.
     * @param importFileRequests - Information about the files to import.
     * @public
     * @requiredField importFileRequests
     * @requiredField importFileRequests.url
     * @param options - Options to include the file descriptor in the response.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     */
    function bulkImportFile(importFileRequests: ImportFileRequest[], options?: BulkImportFileOptions): Promise<BulkImportFileResponse>;
    interface BulkImportFileOptions {
        /**
         * Whether to include the imported File Descriptor in the response. Set to `false` to exclude the File Descriptor from the returned object.
         *
         * Default: `true`
         */
        returnEntity?: boolean | null;
    }
    /**
     * Retrieves a list of files in the Media Manager.
     *
     * The `listFiles()` function returns a Promise that resolves to an array of the specified files' descriptors and cursor information.
     *
     * To retrieve a list of files within a specific folder in the Media Manager, pass the folder's ID in the `parentFolderId` parameter. If no folder is specified, the function retrieves only the files in the root folder of the Media Manager.
     *
     * To retrieve a list of (non-permanently) deleted files, use the `listDeletedFiles()` function.
     * @public
     * @param options - Options to use when listing media files.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Read Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.READ-MEDIAMANAGER
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     */
    function listFiles(options?: ListFilesOptions): Promise<ListFilesResponse>;
    interface ListFilesOptions {
        /**
         * ID of the file's parent folder. <br />
         * Default:`media-root`.
         */
        parentFolderId?: string | null;
        /** Media file type. */
        mediaTypes?: MediaType[];
        /** Whether the link to the imported file is public or private. */
        private?: boolean | null;
        /**
         * Field name and order to sort by. One of:
         *
         * - `displayName`
         * - `_updatedDate`
         * - `sizeInBytes`
         *
         * Default: `_updatedDate` in `"DESC"` order.
         */
        sort?: Sorting;
        /** Cursor and paging information. */
        paging?: CursorPaging;
    }
    /**
     * Searches all folders in the Media Manager and returns a list of files that match the terms specified in the optional parameters.
     *
     * The `searchFiles()` function returns a Promise that resolves to an array of the specified files' descriptors and cursor information.
     *
     * If no parameters are specified, the function returns all files in the `MEDIA_ROOT` folder.
     * @public
     * @param options - Options to specify which folders to search.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Read Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.READ-MEDIAMANAGER
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     */
    function searchFiles(options?: SearchFilesOptions): Promise<SearchFilesResponse>;
    interface SearchFilesOptions {
        /**
         * Term to search for. Possible terms include the value of a file's
         * `displayName`, `mimeType`, and `label`. <br />
         * For example, if a file's label is cat, the search term is 'cat'.
         */
        search?: string | null;
        /**
         * A root folder in the media manager to search in.
         *
         * Default: `MEDIA_ROOT`.
         */
        rootFolder?: RootFolder;
        /** Media file type. */
        mediaTypes?: MediaType[];
        /**
         * Whether the link to the imported file is public or private.
         *
         * Default: `false`.
         */
        private?: boolean | null;
        /**
         * Field name and order to sort by. One of:
         *
         * - `displayName`
         * - `_updatedDate`
         * - `sizeInBytes`
         *
         * Default: `_updatedDate` in `"DESC"` order.
         */
        sort?: Sorting;
        /** Cursor and paging information. */
        paging?: CursorPaging;
    }
    /**
     * Generates a URL for streaming a specific video file in the Media Manager.
     *
     *
     * The `generateVideoStreamingUrl()` function returns a Promise that resolves to a download URL and its asset key.
     *
     * To stream different assets of the file, use the `assetKeys` parameter which generates a video streaming URL for each asset. If no asset key is specified, it defaults to `src`, which generates one video streaming URL in the original file's format and quality.
     * @public
     * @requiredField fileId
     * @param options - Options to use when generating a video file's streaming URL.
     * @param fileId - File ID.
     *
     * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
     * Learn more in the File and Folder IDs article.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Read Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.READ-MEDIAMANAGER
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     */
    function generateVideoStreamingUrl(fileId: string, options?: GenerateVideoStreamingUrlOptions): Promise<GenerateVideoStreamingUrlResponse>;
    interface GenerateVideoStreamingUrlOptions {
        /** Video stream format. */
        format?: StreamFormat;
    }
    /**
     * Deletes the specified files from the Media Manager.
     *
     *
     * The `bulkDeleteFiles()` function returns a Promise that resolves when the files are deleted.
     *
     * The deleted files are moved to the Media Manager's trash bin (`TRASH_ROOT` folder) unless permanently deleted. To permanently delete files, pass the `permanent` parameter with the value `true`. Permanently deleting files isn't reversible, so make sure that these files aren't being used in a site or in any other way as the files will no longer be accessible.
     *
     * >**Notes:**
     * > - The specified files can be from different folders.
     * > - Moving multiple files at once is an asynchronous action, and may take time for the changes to appear in the Media Manager.
     * > - Attempting to delete files that are already in the trash bin doesn't result in an error.
     * > - If your site contains deleted media files, the deleted media files still appear on your site as the files are still in the Media Manager (in the trash bin).
     * > - You can use `bulkRestoreFilesFromTrashBin()` to restore files from the Media Manager's trash bin.
     * @public
     * @requiredField fileIds
     * @param options - Options to use when deleting files.
     * @param fileIds - IDs of the files to move to the Media Manager's trash bin.
     *
     * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
     * Learn more in the File and Folder IDs article.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     */
    function bulkDeleteFiles(fileIds: string[], options?: BulkDeleteFilesOptions): Promise<void>;
    interface BulkDeleteFilesOptions {
        /**
         * Whether the specified files are permanently deleted. <br />
         * Default: `false`
         */
        permanent?: boolean;
    }
    /**
     * Restores the specified files from the Media Manager's trash bin, and moves them to their original locations in the Media Manager.
     *
     * The `bulkRestoreFilesFromTrashBin()` function returns a Promise that resolves when the files have been restored.
     * @public
     * @requiredField fileIds
     * @param fileIds - IDs of the files to restore from the Media Manager's trash bin.
     *
     * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
     * Learn more in the File and Folder IDs article.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     */
    function bulkRestoreFilesFromTrashBin(fileIds: string[]): Promise<void>;
    /**
     * Retrieves a list of files in the Media Manager's trash bin.
     *
     * The `listDeletedFiles()` function returns a Promise that resolves to an array of the specified deleted files' descriptors and cursor information.
     *
     * >**Note:** The Media Manager's trash bin (`TRASH_ROOT` folder) only contains temporarily deleted files, not permanently deleted files.
     *
     * To retrieve a list of non-deleted files, use the `listFiles()` function.
     * @public
     * @param options - Options to use when listing deleted files from the trash bin.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Read Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.READ-MEDIAMANAGER
     * @permissionScope Manage Media Manager
     * @permissionScopeId SCOPE.DC-MEDIA.MANAGE-MEDIAMANAGER
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     */
    function listDeletedFiles(options?: ListDeletedFilesOptions): Promise<ListDeletedFilesResponse>;
    interface ListDeletedFilesOptions {
        /**
         * ID of the file's parent folder. <br />
         * Default: `media-root`.
         */
        parentFolderId?: string | null;
        /** Media file type. */
        mediaTypes?: MediaType[];
        /** Whether the link to the imported file is public or private. */
        private?: boolean | null;
        /**
         * Field name and order to sort by. One of:
         *
         * - `displayName`
         * - `_updatedDate`
         * - `sizeInBytes`
         *
         * Default: `_updatedDate` in `"DESC"` order.
         */
        sort?: Sorting;
        /** Cursor and paging information. */
        paging?: CursorPaging;
    }
    interface UpdateFileOptions {
        /** File name that appears in the Media Manager. */
        displayName?: string | null;
        /**
         * ID of the file's parent folder. <br />
         * Default: `media-root`.
         */
        parentFolderId?: string | null;
        /** Labels assigned to media files that describe and categorize them. Provided by the user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
        labels?: string[] | null;
    }
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_FileDescriptor = FileDescriptor;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_MediaType = MediaType;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_MediaType: typeof MediaType;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_FileMedia = FileMedia;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_FileMediaMediaOneOf = FileMediaMediaOneOf;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_ImageMedia = ImageMedia;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_Colors = Colors;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_Color = Color;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_ColorRGB = ColorRGB;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_FaceRecognition = FaceRecognition;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_VideoResolution = VideoResolution;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_AudioV2 = AudioV2;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_Archive = Archive;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_Model3D = Model3D;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_OtherMedia = OtherMedia;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_OperationStatus = OperationStatus;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_OperationStatus: typeof OperationStatus;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_State = State;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_State: typeof State;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_Namespace = Namespace;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_Namespace: typeof Namespace;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_IdentityInfo = IdentityInfo;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_IdentityType = IdentityType;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_IdentityType: typeof IdentityType;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_FileReady = FileReady;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_ExternalInfo = ExternalInfo;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_FileFailed = FileFailed;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFilesDownloadUrlRequest = GenerateFilesDownloadUrlRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFilesDownloadUrlResponse = GenerateFilesDownloadUrlResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileDownloadUrlRequest = GenerateFileDownloadUrlRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_ContentDisposition = ContentDisposition;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_ContentDisposition: typeof ContentDisposition;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileDownloadUrlResponse = GenerateFileDownloadUrlResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_DownloadUrl = DownloadUrl;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GetFileDescriptorRequest = GetFileDescriptorRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GetFileDescriptorResponse = GetFileDescriptorResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GetFileDescriptorsRequest = GetFileDescriptorsRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GetFileDescriptorsResponse = GetFileDescriptorsResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_UpdateFileDescriptorRequest = UpdateFileDescriptorRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_UpdateFileDescriptorResponse = UpdateFileDescriptorResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileUploadUrlRequest = GenerateFileUploadUrlRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileUploadUrlResponse = GenerateFileUploadUrlResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileResumableUploadUrlRequest = GenerateFileResumableUploadUrlRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_UploadProtocol = UploadProtocol;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_UploadProtocol: typeof UploadProtocol;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileResumableUploadUrlResponse = GenerateFileResumableUploadUrlResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_ImportFileRequest = ImportFileRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_ImportFileResponse = ImportFileResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkImportFilesRequest = BulkImportFilesRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkImportFilesResponse = BulkImportFilesResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkImportFileRequest = BulkImportFileRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkImportFileResponse = BulkImportFileResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkImportFileResult = BulkImportFileResult;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_ItemMetadata = ItemMetadata;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_ApplicationError = ApplicationError;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkActionMetadata = BulkActionMetadata;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_ListFilesRequest = ListFilesRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_Sorting = Sorting;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_SortOrder = SortOrder;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_SortOrder: typeof SortOrder;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_CursorPaging = CursorPaging;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_ListFilesResponse = ListFilesResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_PagingMetadataV2 = PagingMetadataV2;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_Cursors = Cursors;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_SearchFilesRequest = SearchFilesRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_RootFolder = RootFolder;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_RootFolder: typeof RootFolder;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_SearchFilesResponse = SearchFilesResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateVideoStreamingUrlRequest = GenerateVideoStreamingUrlRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_StreamFormat = StreamFormat;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_StreamFormat: typeof StreamFormat;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateVideoStreamingUrlResponse = GenerateVideoStreamingUrlResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateWebSocketTokenRequest = GenerateWebSocketTokenRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateWebSocketTokenResponse = GenerateWebSocketTokenResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkDeleteFilesRequest = BulkDeleteFilesRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkDeleteFilesResponse = BulkDeleteFilesResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkRestoreFilesFromTrashBinRequest = BulkRestoreFilesFromTrashBinRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkRestoreFilesFromTrashBinResponse = BulkRestoreFilesFromTrashBinResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_ListDeletedFilesRequest = ListDeletedFilesRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_ListDeletedFilesResponse = ListDeletedFilesResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_UpdateFileRequest = UpdateFileRequest;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_UpdateFileResponse = UpdateFileResponse;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_DomainEvent = DomainEvent;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_EntityCreatedEvent = EntityCreatedEvent;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_RestoreInfo = RestoreInfo;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_EntityDeletedEvent = EntityDeletedEvent;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_ActionEvent = ActionEvent;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_MessageEnvelope = MessageEnvelope;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_IdentificationData = IdentificationData;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_WebhookIdentityType = WebhookIdentityType;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_generateFilesDownloadUrl: typeof generateFilesDownloadUrl;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_generateFileDownloadUrl: typeof generateFileDownloadUrl;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileDownloadUrlOptions = GenerateFileDownloadUrlOptions;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_getFileDescriptor: typeof getFileDescriptor;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_getFileDescriptors: typeof getFileDescriptors;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_updateFileDescriptor: typeof updateFileDescriptor;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_UpdateFileDescriptorOptions = UpdateFileDescriptorOptions;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_generateFileUploadUrl: typeof generateFileUploadUrl;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileUploadUrlOptions = GenerateFileUploadUrlOptions;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_generateFileResumableUploadUrl: typeof generateFileResumableUploadUrl;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileResumableUploadUrlOptions = GenerateFileResumableUploadUrlOptions;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_importFile: typeof importFile;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_ImportFileOptions = ImportFileOptions;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_bulkImportFiles: typeof bulkImportFiles;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_bulkImportFile: typeof bulkImportFile;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkImportFileOptions = BulkImportFileOptions;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_listFiles: typeof listFiles;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_ListFilesOptions = ListFilesOptions;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_searchFiles: typeof searchFiles;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_SearchFilesOptions = SearchFilesOptions;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_generateVideoStreamingUrl: typeof generateVideoStreamingUrl;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateVideoStreamingUrlOptions = GenerateVideoStreamingUrlOptions;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_bulkDeleteFiles: typeof bulkDeleteFiles;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkDeleteFilesOptions = BulkDeleteFilesOptions;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_bulkRestoreFilesFromTrashBin: typeof bulkRestoreFilesFromTrashBin;
    const mediaSiteMediaV1FileDescriptorFiles_universal_d_listDeletedFiles: typeof listDeletedFiles;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_ListDeletedFilesOptions = ListDeletedFilesOptions;
    type mediaSiteMediaV1FileDescriptorFiles_universal_d_UpdateFileOptions = UpdateFileOptions;
    namespace mediaSiteMediaV1FileDescriptorFiles_universal_d {
        export { mediaSiteMediaV1FileDescriptorFiles_universal_d_FileDescriptor as FileDescriptor, mediaSiteMediaV1FileDescriptorFiles_universal_d_MediaType as MediaType, mediaSiteMediaV1FileDescriptorFiles_universal_d_FileMedia as FileMedia, mediaSiteMediaV1FileDescriptorFiles_universal_d_FileMediaMediaOneOf as FileMediaMediaOneOf, mediaSiteMediaV1FileDescriptorFiles_universal_d_ImageMedia as ImageMedia, mediaSiteMediaV1FileDescriptorFiles_universal_d_Colors as Colors, mediaSiteMediaV1FileDescriptorFiles_universal_d_Color as Color, mediaSiteMediaV1FileDescriptorFiles_universal_d_ColorRGB as ColorRGB, mediaSiteMediaV1FileDescriptorFiles_universal_d_FaceRecognition as FaceRecognition, mediaSiteMediaV1FileDescriptorFiles_universal_d_VideoResolution as VideoResolution, mediaSiteMediaV1FileDescriptorFiles_universal_d_AudioV2 as AudioV2, mediaSiteMediaV1FileDescriptorFiles_universal_d_Archive as Archive, mediaSiteMediaV1FileDescriptorFiles_universal_d_Model3D as Model3D, mediaSiteMediaV1FileDescriptorFiles_universal_d_OtherMedia as OtherMedia, mediaSiteMediaV1FileDescriptorFiles_universal_d_OperationStatus as OperationStatus, mediaSiteMediaV1FileDescriptorFiles_universal_d_State as State, mediaSiteMediaV1FileDescriptorFiles_universal_d_Namespace as Namespace, mediaSiteMediaV1FileDescriptorFiles_universal_d_IdentityInfo as IdentityInfo, mediaSiteMediaV1FileDescriptorFiles_universal_d_IdentityType as IdentityType, mediaSiteMediaV1FileDescriptorFiles_universal_d_FileReady as FileReady, mediaSiteMediaV1FileDescriptorFiles_universal_d_ExternalInfo as ExternalInfo, mediaSiteMediaV1FileDescriptorFiles_universal_d_FileFailed as FileFailed, mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFilesDownloadUrlRequest as GenerateFilesDownloadUrlRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFilesDownloadUrlResponse as GenerateFilesDownloadUrlResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileDownloadUrlRequest as GenerateFileDownloadUrlRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_ContentDisposition as ContentDisposition, mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileDownloadUrlResponse as GenerateFileDownloadUrlResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_DownloadUrl as DownloadUrl, mediaSiteMediaV1FileDescriptorFiles_universal_d_GetFileDescriptorRequest as GetFileDescriptorRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_GetFileDescriptorResponse as GetFileDescriptorResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_GetFileDescriptorsRequest as GetFileDescriptorsRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_GetFileDescriptorsResponse as GetFileDescriptorsResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_UpdateFileDescriptorRequest as UpdateFileDescriptorRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_UpdateFileDescriptorResponse as UpdateFileDescriptorResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileUploadUrlRequest as GenerateFileUploadUrlRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileUploadUrlResponse as GenerateFileUploadUrlResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileResumableUploadUrlRequest as GenerateFileResumableUploadUrlRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_UploadProtocol as UploadProtocol, mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileResumableUploadUrlResponse as GenerateFileResumableUploadUrlResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_ImportFileRequest as ImportFileRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_ImportFileResponse as ImportFileResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkImportFilesRequest as BulkImportFilesRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkImportFilesResponse as BulkImportFilesResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkImportFileRequest as BulkImportFileRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkImportFileResponse as BulkImportFileResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkImportFileResult as BulkImportFileResult, mediaSiteMediaV1FileDescriptorFiles_universal_d_ItemMetadata as ItemMetadata, mediaSiteMediaV1FileDescriptorFiles_universal_d_ApplicationError as ApplicationError, mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkActionMetadata as BulkActionMetadata, mediaSiteMediaV1FileDescriptorFiles_universal_d_ListFilesRequest as ListFilesRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_Sorting as Sorting, mediaSiteMediaV1FileDescriptorFiles_universal_d_SortOrder as SortOrder, mediaSiteMediaV1FileDescriptorFiles_universal_d_CursorPaging as CursorPaging, mediaSiteMediaV1FileDescriptorFiles_universal_d_ListFilesResponse as ListFilesResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_PagingMetadataV2 as PagingMetadataV2, mediaSiteMediaV1FileDescriptorFiles_universal_d_Cursors as Cursors, mediaSiteMediaV1FileDescriptorFiles_universal_d_SearchFilesRequest as SearchFilesRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_RootFolder as RootFolder, mediaSiteMediaV1FileDescriptorFiles_universal_d_SearchFilesResponse as SearchFilesResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateVideoStreamingUrlRequest as GenerateVideoStreamingUrlRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_StreamFormat as StreamFormat, mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateVideoStreamingUrlResponse as GenerateVideoStreamingUrlResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateWebSocketTokenRequest as GenerateWebSocketTokenRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateWebSocketTokenResponse as GenerateWebSocketTokenResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkDeleteFilesRequest as BulkDeleteFilesRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkDeleteFilesResponse as BulkDeleteFilesResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkRestoreFilesFromTrashBinRequest as BulkRestoreFilesFromTrashBinRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkRestoreFilesFromTrashBinResponse as BulkRestoreFilesFromTrashBinResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_ListDeletedFilesRequest as ListDeletedFilesRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_ListDeletedFilesResponse as ListDeletedFilesResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_UpdateFileRequest as UpdateFileRequest, mediaSiteMediaV1FileDescriptorFiles_universal_d_UpdateFileResponse as UpdateFileResponse, mediaSiteMediaV1FileDescriptorFiles_universal_d_DomainEvent as DomainEvent, mediaSiteMediaV1FileDescriptorFiles_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf, mediaSiteMediaV1FileDescriptorFiles_universal_d_EntityCreatedEvent as EntityCreatedEvent, mediaSiteMediaV1FileDescriptorFiles_universal_d_RestoreInfo as RestoreInfo, mediaSiteMediaV1FileDescriptorFiles_universal_d_EntityUpdatedEvent as EntityUpdatedEvent, mediaSiteMediaV1FileDescriptorFiles_universal_d_EntityDeletedEvent as EntityDeletedEvent, mediaSiteMediaV1FileDescriptorFiles_universal_d_ActionEvent as ActionEvent, mediaSiteMediaV1FileDescriptorFiles_universal_d_MessageEnvelope as MessageEnvelope, mediaSiteMediaV1FileDescriptorFiles_universal_d_IdentificationData as IdentificationData, mediaSiteMediaV1FileDescriptorFiles_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf, mediaSiteMediaV1FileDescriptorFiles_universal_d_WebhookIdentityType as WebhookIdentityType, mediaSiteMediaV1FileDescriptorFiles_universal_d_generateFilesDownloadUrl as generateFilesDownloadUrl, mediaSiteMediaV1FileDescriptorFiles_universal_d_generateFileDownloadUrl as generateFileDownloadUrl, mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileDownloadUrlOptions as GenerateFileDownloadUrlOptions, mediaSiteMediaV1FileDescriptorFiles_universal_d_getFileDescriptor as getFileDescriptor, mediaSiteMediaV1FileDescriptorFiles_universal_d_getFileDescriptors as getFileDescriptors, mediaSiteMediaV1FileDescriptorFiles_universal_d_updateFileDescriptor as updateFileDescriptor, mediaSiteMediaV1FileDescriptorFiles_universal_d_UpdateFileDescriptorOptions as UpdateFileDescriptorOptions, mediaSiteMediaV1FileDescriptorFiles_universal_d_generateFileUploadUrl as generateFileUploadUrl, mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileUploadUrlOptions as GenerateFileUploadUrlOptions, mediaSiteMediaV1FileDescriptorFiles_universal_d_generateFileResumableUploadUrl as generateFileResumableUploadUrl, mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateFileResumableUploadUrlOptions as GenerateFileResumableUploadUrlOptions, mediaSiteMediaV1FileDescriptorFiles_universal_d_importFile as importFile, mediaSiteMediaV1FileDescriptorFiles_universal_d_ImportFileOptions as ImportFileOptions, mediaSiteMediaV1FileDescriptorFiles_universal_d_bulkImportFiles as bulkImportFiles, mediaSiteMediaV1FileDescriptorFiles_universal_d_bulkImportFile as bulkImportFile, mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkImportFileOptions as BulkImportFileOptions, mediaSiteMediaV1FileDescriptorFiles_universal_d_listFiles as listFiles, mediaSiteMediaV1FileDescriptorFiles_universal_d_ListFilesOptions as ListFilesOptions, mediaSiteMediaV1FileDescriptorFiles_universal_d_searchFiles as searchFiles, mediaSiteMediaV1FileDescriptorFiles_universal_d_SearchFilesOptions as SearchFilesOptions, mediaSiteMediaV1FileDescriptorFiles_universal_d_generateVideoStreamingUrl as generateVideoStreamingUrl, mediaSiteMediaV1FileDescriptorFiles_universal_d_GenerateVideoStreamingUrlOptions as GenerateVideoStreamingUrlOptions, mediaSiteMediaV1FileDescriptorFiles_universal_d_bulkDeleteFiles as bulkDeleteFiles, mediaSiteMediaV1FileDescriptorFiles_universal_d_BulkDeleteFilesOptions as BulkDeleteFilesOptions, mediaSiteMediaV1FileDescriptorFiles_universal_d_bulkRestoreFilesFromTrashBin as bulkRestoreFilesFromTrashBin, mediaSiteMediaV1FileDescriptorFiles_universal_d_listDeletedFiles as listDeletedFiles, mediaSiteMediaV1FileDescriptorFiles_universal_d_ListDeletedFilesOptions as ListDeletedFilesOptions, mediaSiteMediaV1FileDescriptorFiles_universal_d_UpdateFileOptions as UpdateFileOptions, };
    }
    export { mediaSiteMediaV1FileDescriptorFiles_universal_d as files, mediaSiteMediaV1FolderFolders_universal_d as folders };
}
