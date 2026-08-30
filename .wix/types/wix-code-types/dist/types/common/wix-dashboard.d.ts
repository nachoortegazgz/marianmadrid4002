/**
 * The wix-dashboard module contains functionality for interacting with your site's dashboard in the code for dashboard pages.
 * 	[Read more](https://www.wix.com/corvid/reference/wix-dashboard.html#)
 */
declare module 'wix-dashboard' {
    /**
     * Adds a site plugin to one of the slots supported in an app created by Wix. You can specify a single slot in which you want to add the plugin, or add the plugin to one of the available slots based on a list of prioritized slots that you configure in the plugin's installation settings in your [app's dashboard](https://manage.wix.com/studio/custom-apps).
     * 	[Read more](https://www.wix.com/corvid/reference/wix-dashboard.html#addSitePlugin)
     */
    function addSitePlugin(pluginId: string, options: AddSitePluginOptions): Promise<void>;
    /**
     * Gets the full URL for a dashboard page.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-dashboard.html#getPageUrl)
     */
    function getPageUrl(destination: Destination): Promise<string>;
    /**
     * Navigates the user to another page in the dashboard.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-dashboard.html#navigate)
     */
    function navigate(destination: Destination): void;
    /**
     * Defines a callback function that receives changes to the state of a dashboard page's environment.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-dashboard.html#observeState)
     */
    function observeState(observer: observeStateCallback): void;
    /**
     * Registers a [`beforeunload` event](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event) handler for a dashboard page.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-dashboard.html#onBeforeUnload)
     */
    function onBeforeUnload(callback: onBeforeUnloadCallback): onBeforeUnloadReturn;
    /**
     * Opens the Wix Media Manager in a modal.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-dashboard.html#openMediaManager)
     */
    function openMediaManager(options: OpenMediaManagerOptions): Promise<openMediaManagerReturn>;
    /**
     * Opens a [dashboard modal extension](https://dev.wix.com/docs/build-apps/develop-your-app/extensions/dashboard-extensions/dashboard-modals/about-dashboard-modals).
     * 	[Read more](https://www.wix.com/corvid/reference/wix-dashboard.html#openModal)
     */
    function openModal(modalId: string, modalParams?: any): OpenModalReturn;
    /**
     * Sets the title of the current dashboard page in the browser tab.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-dashboard.html#setPageTitle)
     */
    function setPageTitle(pageTitle: string): void;
    /**
     * Displays a toast notification at the top of a dashboard page.
     *
     * ![Toast notification](/images/toast_example.png "Toast notification")
     * 	[Read more](https://www.wix.com/corvid/reference/wix-dashboard.html#showToast)
     */
    function showToast(config: ToastConfig): ToastReturn;
    /**
     * An object representing the options to use when adding a site plugin.
     */
    type AddSitePluginOptions = {
        /**
         * Optional. Details of the slot in which you want to add the plugin. You can find this information in the articles about the [slots that are available on Wix app pages](https://dev.wix.com/docs/build-apps/develop-your-app/extensions/site-extensions/site-plugins/supported-wix-app-pages/about-slots). If you do not include this property, your plugin is placed in the first available slot according to the order you defined in the plugin's installation settings in your app's dashboard. If that slot is occupied, it is added in the next available slot, and so on. If there are no available slots, it is not added.
         */
        placement?: PluginPlacement;
    };
    type Archive = {
        /**
         * WixMedia ID.
         */
        _id: string;
        /**
         * Archive filename.
         */
        filename: string;
        /**
         * Archive size in bytes.
         */
        sizeInBytes: string;
        /**
         * Archive URL.
         */
        url: string;
        /**
         * Archive URL expiration date (when relevant).
         */
        urlExpirationDate: Date;
    };
    type AudioV2 = {
        /**
         * WixMedia ID.
         */
        _id: string;
        /**
         * Audio formats available for this file.
         */
        assets: string[];
        /**
         * Audio bitrate.
         */
        bitrate: number;
        /**
         * Audio duration in seconds.
         */
        duration: number;
        /**
         * Audio format.
         */
        format: string;
        /**
         * Audio size in bytes.
         */
        sizeInBytes: string;
    };
    type Color = {
        /**
         * HEX code.
         */
        hex: string;
        /**
         * RGB color.
         */
        rgb: ColorRGB;
    };
    type ColorRGB = {
        /**
         * Blue channel.
         */
        b: number;
        /**
         * Green channel.
         */
        g: number;
        /**
         * Red channel.
         */
        r: number;
    };
    type Colors = {
        /**
         * Color palette of the image.
         */
        palette: Color[];
        /**
         * Main color of the image.
         */
        prominent: Color;
    };
    /**
     * Destination Object
     */
    type Destination = {
        /**
         * ID of the page to link to. See [Dashboard Page IDs](#dashboard-page-ids) to find the appropriate ID.
         */
        pageId: string;
        /**
         * URL segment to append to the base URL of the selected page. Can include path segments, a query string, and a fragment identifier.
         */
        relativeUrl?: string;
    };
    type Document = {
        /**
         * Information about the document.
         */
        document: string;
    };
    type EnvironmentState = {
        /**
         * User's locale.
         */
        locale: string;
        /**
         * Information about the currently rendered page location.
         */
        pageLocation: PageLocation;
    };
    type FaceRecognition = {
        /**
         * The accuracy percentage of the face recognition. The likelihood that a face is detected.
         */
        confidence: number;
        /**
         * Face pixel height.
         */
        height: number;
        /**
         * Face pixel width.
         */
        width: number;
        /**
         * Top left x pixel coordinate of the face.
         */
        x: number;
        /**
         * Top left y pixel coordinate of the face.
         */
        y: number;
    };
    type FileDescriptor = {
        /**
         * Date and time the file was created.
         */
        _createdDate: Date;
        /**
         * File ID. Generated when a file is uploaded to the Media Manager.
         */
        _id: string;
        /**
         * Date and time the file was updated.
         */
        _updatedDate: Date;
        /**
         * File name as it appears in the Media Manager.
         */
        displayName: string;
        /**
         * File hash.
         */
        hash: string;
        /**
         * Labels assigned to media files that describe and categorize them. Provided by the user, or generated by Google Vision API for images.
         */
        labels: string[];
        /**
         * Media file content.
         */
        media: Archive | AudioV2 | Document | Image | Model3D | Vector | Video;
        /**
         * Media file type.
         *
         * Supported values: `"IMAGE"`, `"VIDEO"`, `"AUDIO"`, `"DOCUMENT"`, `"VECTOR"`, `"ARCHIVE"`, `"MODEL3D"`
         */
        mediaType: string;
        /**
         * Status of the file that was uploaded.
         *
         * Supported values: `"FAILED"`, `"READY"`, `"PENDING"`
         */
        operationStatus: string;
        /**
         * ID of the file's parent folder.
         */
        parentFolderId: string;
        /**
         * Whether the link to the uploaded file is public or private. Private links require a token.
         */
        private: boolean;
        /**
         * The Wix site ID where the media file is stored.
         */
        siteId: string;
        /**
         * Size of the uploaded file in bytes.
         */
        sizeInBytes: string;
        /**
         * URL where the file was uploaded from.
         */
        sourceUrl: string;
        /**
         * State of the file.
         *
         * Supported values: `"OK"`, `"DELETED"`
         */
        state: string;
        /**
         * URL of the file's thumbnail.
         */
        thumbnailUrl: string;
        /**
         * Static URL of the file.
         */
        url: string;
    };
    type Image = {
        /**
         * Information about the image.
         */
        image: ImageMedia;
    };
    type ImageMedia = {
        /**
         * Optional, An AI generated description of the image.
         */
        caption: string;
        /**
         * Image colors.
         */
        colors: Colors;
        /**
         * Information about faces in the image. Use to crop images without cutting out faces.
         */
        faces: FaceRecognition[];
        /**
         * Image data.
         */
        image: string;
        /**
         * Information about the image preview. You can use this to display a preview for private images.
         */
        previewImage: string;
    };
    type Model3D = {
        /**
         * WixMedia 3D ID.
         */
        _id: string;
        /**
         * 3D alt text.
         */
        altText: string;
        /**
         * 3D filename.
         */
        filename: string;
        /**
         * 3D size in bytes.
         */
        sizeInBytes: string;
        /**
         * 3D thumbnail Image.
         */
        thumbnail: string;
        /**
         * 3D URL.
         */
        url: string;
        /**
         * 3D URL expiration date (when relevant).
         */
        urlExpirationDate: Date;
    };
    type OpenMediaManagerOptions = {
        /**
         * The type of media files to display in the modal. If this value is empty, all media types are displayed.
         *
         * Supported values: `"IMAGE"`, `"VIDEO"`, `"MUSIC"`, `"DOCUMENT"`, `"VECTOR_ART"`, `"3D_IMAGE"`
         *
         * By default, all the categories except `"3D_IMAGE"` are displayed.
         */
        category?: string;
        /**
         * Whether multiple files can be selected.Default: `false`
         */
        multiSelect?: boolean;
    };
    /**
     * Open Modal Return Object
     */
    type OpenModalReturn = {
        /**
         * Resolves to the data passed to [`closeModal()`](#closeModal) when the modal is closed.
         */
        modalClosed: Promise<Serializable>;
    };
    /**
     * PageLocation Object
     */
    type PageLocation = {
        /**
         * ID of the rendered page.
         */
        pageId: string;
        /**
         * Any parts of the current URL path appended to the page's full URL.
         */
        pathname: string;
        /**
         * The current URL's query string.
         */
        search?: string;
        /**
         * The current URL's fragment.
         */
        hash?: string;
    };
    /**
     * An object representing a slot in which to add a plugin.
     */
    type PluginPlacement = {
        /**
         * ID of the Wix business solution to which you want to add your plugin.
         */
        appDefinitionId: string;
        /**
         * ID of the host widget in which the slot is located.
         */
        widgetId: string;
        /**
         * ID of the slot.
         */
        slotId: string;
    };
    type Serializable = {};
    /**
     * ToastAction Object
     */
    type ToastAction = {
        /**
         * Text that appears in the call-to-action.
         */
        text: string;
        /**
         * The type of call-to-action.
         *
         * Options: `"button"`, `"link"`
         *
         * Default: `"button"`
         */
        uiType?: string;
        /**
         * Whether to remove the toast after the call-to-action is clicked.
         *
         * Default: `true`
         */
        removeToastOnClick?: boolean;
        /**
         * Callback function to run after the call-to-action is clicked.
         */
        onClick: Function;
    };
    /**
     * ToastConfig Object
     */
    type ToastConfig = {
        /**
         * Text that appears in the toast.
         */
        message: string;
        /**
         * Whether the toast removes itself.
         *
         * Options:
         * - `"normal"`: The toast removes itself after 6 seconds.
         * - `"none"`: The toast doesn't remove itself.
         *
         * Default: `"normal"`
         */
        timeout?: string;
        /**
         * Toast color and message type.
         *
         * Options:
         * - `"standard"`: Blue toast.
         * - `"success"`: Green toast.
         * - `"warning"`: Yellow warning toast.
         * - `"error"`: Red error toast.
         *
         * Default: `"standard"`
         */
        type?: string;
        /**
         * Priority of the toast. If several toasts are triggered at the same time, they're displayed in the order of their priority levels.
         *
         * Options: `"low"`, `"normal"`, `"high"`
         *
         * Default: `"normal"`
         */
        priority?: string;
        /**
         * Object representing a call-to-action that's displayed in the toast.
         */
        action?: ToastAction;
        /**
         * Callback function to run when the toast is closed by clicking its close button.
         */
        onCloseClick?: Function;
        /**
         * Callback function to run when the toast is seen by the user.
         */
        onToastSeen?: Function;
    };
    /**
     * ShowToast Return Object
     */
    type ToastReturn = {
        /**
         * Removes the displayed toast.
         */
        remove: Function;
    };
    type Vector = {
        /**
         * Information about the vector.
         */
        vector: ImageMedia;
    };
    type Video = {
        /**
         * Information about the video.
         */
        video: string;
    };
    type onBeforeUnloadEvent = {
        /**
         * Prevents the page from unloading. Opens a dialog with a warning that there may be unsaved data on the page.
         */
        preventDefault: Function;
    };
    type onBeforeUnloadReturn = {
        /**
         * Removes the `onBeforeUnload` event handler.
         */
        remove: Function;
    };
    type openMediaManagerReturn = {
        /**
         * An array of file descriptors for the selected media files.
         */
        items: FileDescriptor[];
    };
    type observeStateCallback = (pageParams: any, environmentState: EnvironmentState) => void;
    type onBeforeUnloadCallback = (event: onBeforeUnloadEvent) => void;
}
