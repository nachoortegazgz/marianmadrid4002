/**
 * The `wix-mobile` module contains functionality for working with a mobile app.
 * 	[Read more](https://www.wix.com/corvid/reference/wix-mobile.html#)
 */
declare module 'wix-mobile' {
    /**
     * The Wix App Framework API contains functionality for working with a mobile app.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-mobile.html#appFramework)
     */
    const appFramework: AppFramework;
    /**
     * The `wix-mobile` module contains functionality for working with a mobile app.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-mobile.AppFramework.html#)
     */
    interface AppFramework {
        /**
         * Creates and opens a list of selectable actions on a mobile app.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-mobile.AppFramework.html#showActionSheet)
         */
        showActionSheet(actions: AppFramework.ActionSheetActions[], headerOptions?: AppFramework.HeaderOptions): Promise<AppFramework.ActionSheetResult>;
        /**
         * Creates and opens an alert modal on a mobile app.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-mobile.AppFramework.html#showAlert)
         */
        showAlert(title: string, message: string, actions: AppFramework.Actions): Promise<AppFramework.AlertResult>;
        /**
         * Opens a file picker that allows an app user to upload media to the app's [media manager](https://support.wix.com/en/article/wix-media-about-the-media-manager).
         * 	[Read more](https://www.wix.com/corvid/reference/wix-mobile.AppFramework.html#showFileUploadPicker)
         */
        showFileUploadPicker(fileType?: string, options?: AppFramework.FilePickerOptions): Promise<AppFramework.File[]>;
        /**
         * Displays an in-app notification.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-mobile.AppFramework.html#showInAppNotification)
         */
        showInAppNotification(body: string, options?: AppFramework.InAppNotificationOptions): Promise<AppFramework.InAppNotificationResult>;
        /**
         * Displays a toast notification for a mobile app.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-mobile.AppFramework.html#showToastNotification)
         */
        showToastNotification(body: string, type?: string, actionLabel?: string): Promise<AppFramework.ToastNotificationResult>;
    }
    /**
     * The `wix-mobile` module contains functionality for working with a mobile app.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-mobile.AppFramework.html#)
     */
    namespace AppFramework {
        /**
         * Action sheet actions.
         */
        type ActionSheetActions = {
            /**
             * Key to identify the action.
             */
            key: string;
            /**
             * Action title.
             */
            title: string;
            /**
             * Action subtitle.
             */
            subtitle?: string;
            /**
             * Type of action. The supported values are found in the `ActionSheetActionsType` property in `appFramework`. Supported values:
             * - `appFramework.ActionSheetActionTypes.DEFAULT`: Standard options styled in a neutral way.
             * - `appFramework.ActionSheetActionTypes.PROMINENT`: Typically used for the most important option. It is styled to stand out visually.
             * - `appFramework.ActionSheetActionTypes.DESTRUCTIVE`: Typically used for options that may cause significant changes, such as "delete". Only one action can be `destructive`.
             * - `appFramework.ActionSheetActionTypes.CANCEL`: Used to dismiss the action sheet without selecting an action.
             *
             * Default: `appFramework.ActionSheetActionTypes.DEFAULT`
             */
            type?: string;
        };
        /**
         * Action sheet result.
         */
        type ActionSheetResult = {
            /**
             * Supported values:
             * - `actionSelected`: The app user selected an action.
             * - `dismissed`: The notification was dismissed by the app user swiping it.
             */
            result: string;
            /**
             * Key of the selected action. Only defined if `result` is `actionSelected`.
             */
            actionKey: string;
        };
        /**
         * Alert actions.
         */
        type Actions = {
            /**
             * Positive alert action.
             */
            positive: AppFramework.PositiveAction;
            /**
             * Negative alert action.
             */
            negative?: AppFramework.NegativeAction;
            /**
             * Neutral alert action.
             */
            neutral?: AppFramework.NeutralAction;
        };
        /**
         * Alert's result based on the app user's selected action.
         */
        type AlertResult = {
            /**
             * Unique key for identifying the selected action.
             */
            key: string;
        };
        /**
         * File.
         */
        type File = {
            /**
             * File name.
             */
            name: string;
            /**
             * File type.
             */
            fileType: string;
            /**
             * Size of the file in bytes.
             */
            sizeInBytes: number;
            /**
             * Wix media URL. If the files isn't uploaded, this property is undefined.
             */
            url: string;
        };
        /**
         * File picker options.
         */
        type FilePickerOptions = {
            /**
             * Maximum number of files that can be uploaded.
             */
            fileLimit?: number;
            /**
             * Whether to allow the app user to use the device's camera to provide files. If neither `showCamera` nor `showDeviceMedia` is defined as `true`, `showDeviceMedia` defaults to `true` and `showCamera` defaults to `false`.
             */
            showCamera?: boolean;
            /**
             * Whether to allow the app user to use the device's media to provide files. If neither `showCamera` nor `showDeviceMedia` is defined as `true`, `showDeviceMedia` defaults to `true` and `showCamera` defaults to `false`.
             */
            showDeviceMedia?: boolean;
        };
        /**
         * Action sheet header.
         */
        type HeaderOptions = {
            /**
             * Action sheet title.
             */
            title?: string;
            /**
             * Action sheet subtitle.
             */
            subtitle?: string;
        };
        /**
         * In-app notification options.
         */
        type InAppNotificationOptions = {
            /**
             * Notification title.
             */
            title?: string;
            /**
             * Wix Media URL of an [image](https://dev.wix.com/docs/velo/api-reference/$w/image/introduction) to display in the notification. If `image` and `avatarImage` are both defined, `image` is used.
             */
            image?: string;
            /**
             * Wix Media URL of an [image](https://dev.wix.com/docs/velo/api-reference/$w/image/introduction) to display in the notification, cropped to a circle. If `image` and `avatarImage` are both defined, `image` is used.
             */
            avatarImage?: string;
        };
        /**
         * In-app notification result.
         */
        type InAppNotificationResult = {
            /**
             * Supported values:
             * - `pressed`: The notification was pressed.
             * - `dismissed`: The notification was dismissed by the app user swiping it.
             */
            result: string;
        };
        /**
         * Negative alert action.
         */
        type NegativeAction = {
            /**
             * The negative action button's label. For example, 'Delete'.
             */
            label: string;
            /**
             * Unique key for identifying a negative action. For example, 'delete'.
             */
            key: string;
            /**
             * **For iOs only.** Whether the action is classified as destructive. If `true`, the action is formatted to indicate to the app user to carefully consider whether to press the action button.
             */
            destructive?: boolean;
        };
        /**
         * Neutral alert action.
         */
        type NeutralAction = {
            /**
             * The neutral action button's label. For example, 'Remind Me Later'.
             */
            label: string;
            /**
             * Unique key for identifying a neutral action. For example, 'later'.
             */
            key: string;
            /**
             * **For iOs only.** Whether the action is classified as destructive. If `true`, the action is formatted to indicate to the app user to carefully consider whether to press the action button.
             */
            destructive?: boolean;
        };
        /**
         * Positive alert action.
         */
        type PositiveAction = {
            /**
             * The positive action button's label. For example, 'Save Now'.
             */
            label: string;
            /**
             * Unique key for identifying a positive action. For example, 'save'.
             */
            key: string;
            /**
             * **For iOs only.** Whether the action is classified as destructive. If `true`, the action is formatted to indicate to the app user to carefully consider whether to press the action button.
             */
            destructive?: boolean;
        };
        /**
         * Toast notification result.
         */
        type ToastNotificationResult = {
            /**
             * Supported values:
             * - `pressed`: The notification was pressed.
             * - `dismissed`: The notification was dismissed by the app user swiping it.
             */
            result: string;
        };
    }
}
