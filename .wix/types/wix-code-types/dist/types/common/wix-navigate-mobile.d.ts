/**
 * The `wix-navigate-mobile` module contains functionality for navigating in a mobile app.
 * 	[Read more](https://www.wix.com/corvid/reference/wix-navigate-mobile.html#)
 */
declare module 'wix-navigate-mobile' {
    /**
     * Closes the current screen.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-navigate-mobile.html#closeScreen)
     */
    function closeScreen(ClosedScreenData: ClosedScreenData): Promise<void>;
    /**
     * Get's the screen's data.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-navigate-mobile.html#getScreenContext)
     */
    function getScreenContext(): Promise<ScreenContext>;
    /**
     * Directs the mobile app to open the specified URL in the device's browser.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-navigate-mobile.html#openURL)
     */
    function openURL(url: string): Promise<void>;
    /**
     * Opens the specified screen.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-navigate-mobile.html#toScreen)
     */
    function toScreen(screenId: string, data?: any): Promise<CloseScreenResult>;
    type CloseScreenResult = {
        /**
         * Error message.
         */
        error: string;
        /**
         * Data sent when a screen closes to the screen beneath it in the stack. Learn more about [stack navigation](https://dev.wix.com/docs/velo/apis/wix-navigate-mobile/introduction#apis_wix-navigate-mobile_stack-navigation).
         */
        data: any;
    };
    type ClosedScreenData = {
        /**
         * Error message.
         */
        error: string;
        /**
         * Data sent when a screen closes to the screen beneath it in the stack. Learn more about [stack navigation](https://dev.wix.com/docs/velo/apis/wix-navigate-mobile/introduction#apis_wix-navigate-mobile_stack-navigation).
         */
        data: any;
    };
    type ScreenContext = {
        /**
         * The screen's data, defined when the screen is opened by `toScreen()`.
         */
        data?: any;
    };
}
