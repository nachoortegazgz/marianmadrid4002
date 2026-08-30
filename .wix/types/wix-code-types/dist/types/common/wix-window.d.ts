/**
 * The wix-window module contains functionality that pertains to the
 *  current browser window.
 * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#)
 */
declare module 'wix-window' {
    import wixWindowFrontend from 'wix-window-frontend';
    /**
     * Gets the locale of a site visitor's browser.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#browserLocale)
     */
    const browserLocale: string;
    /**
     * The ConsentPolicy API manages site visitor cookie preferences and 3rd-party data transfers for GDPR and CCPA compliance.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#consentPolicy)
     */
    const consentPolicy: ConsentPolicy;
    /**
     * Gets what kind of device is being used to view the page.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#formFactor)
     */
    const formFactor: string;
    /**
     * A [popup](https://support.wix.com/en/article/studio-editor-using-popups) opens on a site to grab a site visitor's attention.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#lightbox)
     */
    const lightbox: Lightbox;
    /**
     * The Multilingual API is used when working with the languages in a multilingual site.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#multilingual)
     */
    const multilingual: Multilingual;
    /**
     * Gets the HTTP referrer header field.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#referrer)
     */
    const referrer: string;
    /**
     * The [Rendering API](wix-window.html#rendering) is used to control when code is run as a page is being loaded.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#rendering)
     */
    const rendering: Rendering;
    /**
     * Gets which mode a site is currently being viewed in.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#viewMode)
     */
    const viewMode: string;
    /**
     * The Warmup Data API is used to optimize data loading for sites that render both on the server and in the browser,
     *  allowing costly data fetching operations to be done only once.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#warmupData)
     */
    const warmupData: WarmupData;
    /**
     * Copies text to a site visitor's clipboard.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#copyToClipboard)
     */
    function copyToClipboard(text: string): Promise<void>;
    /**
     * Gets the data passed to a [custom app page](https://dev.wix.com/docs/develop-websites/articles/wix-apps/replace-a-wix-business-app-page-with-your-own-custom-version).
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#getAppPageData)
     */
    function getAppPageData(): any;
    /**
     * Retrieves information about a window.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#getBoundingRect)
     */
    function getBoundingRect(): Promise<WindowSizeInfo>;
    /**
     * Retrieves the current geolocation of a site visitor.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#getCurrentGeolocation)
     */
    function getCurrentGeolocation(): Promise<CurrentGeolocation>;
    /**
     * Retrieves the data sent by a router to a page as part of its response.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#getRouterData)
     */
    function getRouterData(): any;
    /**
     * Opens a popup and optionally passes it the specified data.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#openLightbox)
     */
    function openLightbox(name: string, data?: any): Promise<any>;
    /**
     * Opens a modal window that displays the specified web page.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#openModal)
     */
    function openModal(url: string, options: wixWindowFrontend.OpenModalOptions): Promise<void>;
    /**
     * Sends a message to a page's parent.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#postMessage)
     */
    function postMessage(message: any, target?: string): Promise<any>;
    /**
     * Registers a listener for all events triggered by `trackEvent()`.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#registerEventListener)
     */
    function registerEventListener(eventName: string, params: any): void;
    /**
     * Scrolls a page by the specified number of pixels.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#scrollBy)
     */
    function scrollBy(x: number, y: number): Promise<void>;
    /**
     * Scrolls a page to the specified location.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#scrollTo)
     */
    function scrollTo(x: number, y: number, options?: ScrollToOptions): Promise<void>;
    /**
     * Sends a tracking event to external analytics tools.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.html#trackEvent)
     */
    function trackEvent(eventName: string, parameters: trackingParametersCustomEvent | trackingParametersAddPaymentInfoEvent | trackingParametersAddProductImpressionEvent | trackingParametersAddToCartEvent | trackingParametersCheckoutStepEvent | trackingParametersClickProductEvent | trackingParametersInitiateCheckoutEvent | trackingParametersLeadEvent | trackingParametersPurchaseEvent | trackingParametersRemoveFromCartEvent | trackingParametersStartPaymentEvent | trackingParametersViewContentEvent): void;
    /**
     * An object that defines the location.
     */
    type Coordinates = {
        /**
         * The position's latitude in decimal degrees.
         */
        latitude: number;
        /**
         * The position's longitude in decimal degrees.
         */
        longitude: number;
        /**
         * The position's altitude in meters, relative to sea level. This value may be null if the browser can't provide the data.
         */
        altitude: number;
        /**
         * The accuracy in meters of the `latitude` and `longitude` properties.
         */
        accuracy: number;
        /**
         * The accuracy in meters of the `altitude` property. This value may be null.
         */
        altitudeAccuracy: number;
        /**
         * The direction in degrees in which the device is traveling. It indicates how far off from heading true north the device is. If `speed` is `0`, the heading is `NaN`. This value may be null if the browser can't provide the data.
         */
        heading: number;
        /**
         * The velocity in meters per second of the device. This value may be null if the browser can't provide the data.
         */
        speed: number;
    };
    /**
     * An object returned by `getCurrentGeolocation()` that contains information about the current geolocation.
     */
    type CurrentGeolocation = {
        /**
         * The geolocation timestamp representing the date and time at which the location was retrieved.
         */
        timestamp: string;
        /**
         * An object that defines the location.
         */
        coords: Coordinates;
    };
    /**
     * A custom parameter used when sending a `CustomEvent` track event.
     */
    type CustomType = {};
    /**
     * An object containing the size of the actual body of the page, which may be larger or smaller than the current window.
     */
    type DocumentSize = {
        /**
         * The height of the page body.
         */
        height: number;
        /**
         * The width of the page body.
         */
        width: number;
    };
    /**
     * An object used when opening a modal window.
     */
    type OpenModalOptions = {
        /**
         * Width of the modal window.
         */
        width: number;
        /**
         * Height of the modal window.
         */
        height: number;
    };
    /**
     * An object containing the scroll offset of the page within the window from the top-left corner.
     */
    type ScrollOffset = {
        /**
         * The horizontal scroll offset of the page within the window from the left.
         */
        x: number;
        /**
         * The vertical scroll offset of the page within the window from the top.
         */
        y: number;
    };
    /**
     * An object used for providing options for the `scrollTo()` method.
     */
    type ScrollToOptions = {
        /**
         * Indicates whether to scroll with an animation. Defaults to `true`.
         */
        scrollAnimation: boolean;
    };
    /**
     * An object containing the size of the viewable area of the current browser window.
     */
    type WindowSize = {
        /**
         * The height of the window.
         */
        height: number;
        /**
         * The width of the window.
         */
        width: number;
    };
    /**
     * An object returned by `getBoundingRect()` that contains information about a window's size, a document's size, and a current scroll position.
     */
    type WindowSizeInfo = {
        /**
         * An object containing the size of the viewable area of the current browser window.
         */
        window: WindowSize;
        /**
         * An object containing the size of the actual body of the page, which may be larger or smaller than the current window.
         */
        document: DocumentSize;
        /**
         * An object containing the scroll offset of the page within the window from the top-left corner.
         */
        scroll: ScrollOffset;
    };
    /**
     * Objects used when calling `trackEvent()`.
     */
    type trackingParameters = {
        /**
         * Object used for `AddPaymentInfo` events.
         */
        AddPaymentInfoEvent?: wixWindowFrontend.trackingParametersAddPaymentInfoEvent;
        /**
         * Object used for `AddProductImpression` events.
         */
        AddProductImpressionEvent?: wixWindowFrontend.trackingParametersAddProductImpressionEvent;
        /**
         * Object used for `AddToCart` events.
         */
        AddToCartEvent?: wixWindowFrontend.trackingParametersAddToCartEvent;
        /**
         * Object used for `CheckoutStep` events.
         */
        CheckoutStepEvent?: wixWindowFrontend.trackingParametersCheckoutStepEvent;
        /**
         * Object used for `ClickProduct` events.
         */
        ClickProductEvent?: wixWindowFrontend.trackingParametersClickProductEvent;
        /**
         * Object used for `InitiateCheckout` events.
         */
        InitiateCheckoutEvent?: wixWindowFrontend.trackingParametersInitiateCheckoutEvent;
        /**
         * Object used for `Lead` events.
         */
        LeadEvent?: wixWindowFrontend.trackingParametersLeadEvent;
        /**
         * Object used for `Purchase` events.
         */
        PurchaseEvent?: wixWindowFrontend.trackingParametersPurchaseEvent;
        /**
         * Object used for `RemoveFromCart` events.
         */
        RemoveFromCartEvent?: wixWindowFrontend.trackingParametersRemoveFromCartEvent;
        /**
         * Object used for `StartPayment` events.
         */
        StartPaymentEvent?: wixWindowFrontend.trackingParametersStartPaymentEvent;
        /**
         * Object used for `ViewContent` events.
         */
        ViewContentEvent?: wixWindowFrontend.trackingParametersViewContentEvent;
        /**
         * Object used for custom events.
         */
        CustomEvent?: wixWindowFrontend.trackingParametersCustomEvent;
    };
    /**
     * An object used when sending an `AddPaymentInfo` track event.
     */
    type trackingParametersAddPaymentInfoEvent = {
        /**
         * Event origin. For example, `Music Player` or `Contact Form`.
         */
        origin?: string;
        /**
         * Payment type. For example, `Visa` or `PayPal`.
         */
        option?: string;
    };
    /**
     * An object used when sending an `AddProductImpression` track event.
     */
    type trackingParametersAddProductImpressionEvent = {
        /**
         * Event origin. For example, `Music Player` or `Contact Form`.
         */
        origin?: string;
        /**
         * `key:value` pairs describing the products.
         */
        contents: trackingParametersAddProductImpressionEventContents[];
    };
    /**
     * An object used when sending an `AddProductImpression` track event.
     */
    type trackingParametersAddProductImpressionEventContents = {
        /**
         * Product ID.
         */
        id?: string;
        /**
         * Stock-keeping unit for the product.
         */
        sku?: string;
        /**
         * Product name.
         */
        name: string;
        /**
         * Product category. For example, `Accessories/Watches`.
         */
        category?: string;
        /**
         * Product price.
         */
        price?: number;
        /**
         * Currency code in [ISO 4217 format](https://en.wikipedia.org/wiki/ISO_4217). For example, `EUR`, `USD`, or `CAD`.
         */
        currency?: string;
        /**
         * Brand name of the product.
         */
        brand?: string;
        /**
         * Product variant such as `green` or `large`.
         */
        variant?: string;
        /**
         * List or collection the product is part of. For example, `Product Gallery` or `Search Results`.
         */
        list?: string;
        /**
         * Position of the product within a list or collection.
         */
        position?: string;
    };
    /**
     * An object used when sending an `AddToCart` track event.
     */
    type trackingParametersAddToCartEvent = {
        /**
         * Event origin. For example, `Music Player` or `Contact Form`.
         */
        origin?: string;
        /**
         * Product ID.
         */
        id?: string;
        /**
         * Stock-keeping unit for the product.
         */
        sku?: string;
        /**
         * Product name.
         */
        name: string;
        /**
         * Product price.
         */
        price?: number;
        /**
         * Currency code in [ISO 4217 format](https://en.wikipedia.org/wiki/ISO_4217). For example, `EUR`, `USD`, or `CAD`.
         */
        currency?: string;
        /**
         * Product category. For example, `Accessories/Watches`.
         */
        category?: string;
        /**
         * Brand name of the product.
         */
        brand?: string;
        /**
         * Product variant such as `green` or `large`.
         */
        variant?: string;
        /**
         * List or collection the product is part of. For example, `Product Gallery` or `Search Results`.
         */
        position?: string;
        /**
         * Product quantity.
         */
        quantity?: number;
    };
    /**
     * An object used when sending an `CheckoutStep` track event.
     */
    type trackingParametersCheckoutStepEvent = {
        /**
         * Event origin. For example, `Music Player` or `Contact Form`.
         */
        origin?: string;
        /**
         * Number of the step in the checkout process.
         * For example `2` for `addPaymentInfo` in a checkout flow that consists of the steps `StartPayment`, `addPaymentInfo`, and `Select Shipping`.
         */
        step?: string;
        /**
         * Action the visitor has taken in this step. For example, `Select Shipping`.
         */
        action?: string;
        /**
         * Option information on the checkout page. For example the selected payment method.
         */
        option?: string;
    };
    /**
     * An object used when sending a `ClickProduct` track event.
     */
    type trackingParametersClickProductEvent = {
        /**
         * Event origin. For example, `Music Player` or `Contact Form`.
         */
        origin?: string;
        /**
         * Product ID.
         */
        id?: string;
        /**
         * Stock-keeping unit for the product.
         */
        sku?: string;
        /**
         * Product name.
         */
        name: string;
        /**
         * Product price.
         */
        price?: number;
        /**
         * Currency code in [ISO 4217 format](https://en.wikipedia.org/wiki/ISO_4217). For example, `EUR`, `USD`, or `CAD`.
         */
        currency?: string;
        /**
         * Product category. For example, `Accessories/Watches`.
         */
        category?: string;
        /**
         * Brand name of the product.
         */
        brand?: string;
        /**
         * Product variant such as `green` or `large`.
         */
        variant?: string;
        /**
         * List or collection the product is part of. For example, `Product Gallery` or `Search Results`.
         */
        list?: string;
        /**
         * Position of the product within a list or collection.
         */
        position?: string;
    };
    /**
     * An object used when sending a `CustomEvent` track event.
     */
    type trackingParametersCustomEvent = {
        /**
         * Event category. **Note:** Required for Google Analytics and Facebook Pixel.
         */
        eventCategory?: string;
        /**
         * Event action type. **Note:** Required for Google Analytics and Facebook Pixel.
         */
        eventAction?: string;
        /**
         * Event label.
         */
        eventLabel?: string;
        /**
         * Event value.
         */
        eventValue?: number;
        /**
         * Any number of custom properties.
         */
        "*"?: CustomType;
    };
    /**
     * An object used when sending an `InitiateCheckout` track event.
     */
    type trackingParametersInitiateCheckoutEvent = {
        /**
         * Event origin. For example, `Music Player` or `Contact Form`.
         */
        origin?: string;
        /**
         * `key:value` pairs describing the products.
         */
        contents: trackingParametersInitiateCheckoutEventContents[];
    };
    /**
     * An object used when sending an `InitiateCheckout` track event.
     */
    type trackingParametersInitiateCheckoutEventContents = {
        /**
         * Product ID.
         */
        id?: string;
        /**
         * Stock-keeping unit for the product.
         */
        sku?: string;
        /**
         * Product name.
         */
        name: string;
        /**
         * Product category. For example, `Accessories/Watches`.
         */
        category?: string;
        /**
         * Product price.
         */
        price?: number;
        /**
         * Currency code in [ISO 4217 format](https://en.wikipedia.org/wiki/ISO_4217). For example, `EUR`, `USD`, or `CAD`.
         */
        currency?: string;
        /**
         * Brand name of the product.
         */
        brand?: string;
        /**
         * Product variant such as `green` or `large`.
         */
        variant?: string;
        /**
         * Product quantity.
         */
        quantity?: number;
    };
    /**
     * An object used when sending a `Lead` track event.
     */
    type trackingParametersLeadEvent = {
        /**
         * Lead category.
         */
        category?: string;
        /**
         * Lead action.
         */
        action?: string;
        /**
         * Lead label.
         */
        label?: string;
    };
    /**
     * An object used when sending a `Purchase` track event.
     */
    type trackingParametersPurchaseEvent = {
        /**
         * Event origin. For example, `Music Player` or `Contact Form`.
         */
        origin?: string;
        /**
         * Transaction ID or order number.
         */
        id?: string;
        /**
         * Store name.
         */
        affiliation?: string;
        /**
         * Total purchase price. Includes tax and shipping fee.
         */
        revenue?: number;
        /**
         * Total tax.
         */
        tax?: number;
        /**
         * Shipping fee.
         */
        shipping?: number;
        /**
         * Applied coupon code.
         */
        coupon?: string;
        /**
         * `key:value` pairs describing the purchased products.
         */
        contents: trackingParametersPurchaseEventContents[];
    };
    /**
     * An object used when sending a `Purchase` track event.
     */
    type trackingParametersPurchaseEventContents = {
        /**
         * Product ID.
         */
        id?: string;
        /**
         * Product name.
         */
        name: string;
        /**
         * Product category. For example, `Accessories/Watches`.
         */
        category?: string;
        /**
         * Product price.
         */
        price?: number;
        /**
         * Currency code in [ISO 4217 format](https://en.wikipedia.org/wiki/ISO_4217). For example, `EUR`, `USD`, or `CAD`.
         */
        currency?: string;
        /**
         * Brand name of the product.
         */
        brand?: string;
        /**
         * Product variant such as `green` or `large`.
         */
        variant?: string;
        /**
         * Product quantity.
         */
        quantity?: number;
    };
    /**
     * An object used when sending a `RemoveFromCart` track event.
     */
    type trackingParametersRemoveFromCartEvent = {
        /**
         * Event origin. For example, `Music Player` or `Contact Form`.
         */
        origin?: string;
        /**
         * Product ID.
         */
        id?: string;
        /**
         * Product name.
         */
        name: string;
        /**
         * Product price.
         */
        price?: number;
        /**
         * Currency code in [ISO 4217 format](https://en.wikipedia.org/wiki/ISO_4217). For example, `EUR`, `USD`, or `CAD`.
         */
        currency?: string;
        /**
         * Product category. For example, `Accessories/Watches`.
         */
        category?: string;
        /**
         * Brand name of the product.
         */
        brand?: string;
        /**
         * Product variant such as `green` or `large`.
         */
        variant?: string;
        /**
         * Position of the product within a list or collection.
         */
        position?: string;
        /**
         * Product quantity.
         */
        quantity?: number;
    };
    /**
     * An object used when sending an `StartPayment` track event.
     */
    type trackingParametersStartPaymentEvent = {
        /**
         * Event origin. For example, `Music Player` or `Contact Form`.
         */
        origin?: string;
        /**
         * Payment type. For example, `Visa` or `PayPal`.
         */
        option?: string;
    };
    /**
     * An object used when sending a `ViewContent` track event.
     */
    type trackingParametersViewContentEvent = {
        /**
         * Event origin. For example, `Music Player` or `Contact Form`.
         */
        origin?: string;
        /**
         * Product ID.
         */
        id?: string;
        /**
         * Stock-keeping unit for the product.
         */
        sku?: string;
        /**
         * Product name.
         */
        name: string;
        /**
         * Product price.
         */
        price?: number;
        /**
         * Currency code in [ISO 4217 format](https://en.wikipedia.org/wiki/ISO_4217). For example, `EUR`, `USD`, or `CAD`.
         */
        currency?: string;
        /**
         * Product category. For example, `Accessories/Watches`.
         */
        category?: string;
        /**
         * Brand name of the product.
         */
        brand?: string;
        /**
         * Product variant such as `green` or `large`.
         */
        variant?: string;
        /**
         * List or collection the product is part of. For example, `Product Gallery` or `Search Results`.
         */
        list?: string;
        /**
         * Position of the product in a list or collection.
         */
        position?: string;
    };
    /**
     * The Consent Policy API manages site visitor cookie preferences and 3rd-party data transfers for GDPR and CCPA compliance.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.ConsentPolicy.html#)
     */
    interface ConsentPolicy {
        /**
         * Gets the site visitor's consent policy regarding allowed cookies and 3rd-party data transfers for GDPR or CCPA compliance.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-window.ConsentPolicy.html#getCurrentConsentPolicy)
         */
        getCurrentConsentPolicy(): ConsentPolicy.PolicyDetails;
        /**
         * Triggered when a site visitor's consent policy was changed using
         * `setConsentPolicy()` or reset using
         * `resetConsentPolicy()`.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-window.ConsentPolicy.html#onConsentPolicyChanged)
         */
        onConsentPolicyChanged(handler: wixWindowFrontend.ConsentPolicy.ConsentPolicyChangedHandler): void;
        /**
         * Removes the current policy from the site visitor's browser
         * and resets the site visitor's consent policy to the default policy for the site.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-window.ConsentPolicy.html#resetConsentPolicy)
         */
        resetConsentPolicy(): Promise<void>;
        /**
         * Sets the current site visitor's consent policy
         * regarding allowed cookies and data transfer to 3rd parties,
         * such as for GDPR or CCPA purposes.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-window.ConsentPolicy.html#setConsentPolicy)
         */
        setConsentPolicy(policy: wixWindowFrontend.ConsentPolicy.Policy): Promise<ConsentPolicy.PolicyDetails>;
    }
    /**
     * A [popup](https://support.wix.com/en/article/studio-editor-using-popups) opens on a site to grab a site visitor's attention.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.Lightbox.html#)
     */
    interface Lightbox {
        /**
         * Closes a popup.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-window.Lightbox.html#close)
         */
        close(data?: any): void;
        /**
         * Gets the data object that was passed to a popup.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-window.Lightbox.html#getContext)
         */
        getContext(): any;
    }
    /**
     * The Multilingual API is used when working with the languages in a multilingual site.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.Multilingual.html#)
     */
    interface Multilingual {
        /**
         * Sets or gets a site's current display language.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-window.Multilingual.html#currentLanguage)
         */
        currentLanguage: string;
        /**
         * Gets whether a site has been set up to be shown in multiple languages.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-window.Multilingual.html#isEnabled)
         */
        readonly isEnabled: boolean;
        /**
         * Gets information about a site's languages.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-window.Multilingual.html#siteLanguages)
         */
        readonly siteLanguages: Multilingual.SiteLanguage[];
    }
    /**
     * The Rendering API is used to control when code is run as a page is being loaded.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.Rendering.html#)
     */
    interface Rendering {
        /**
         * Gets the current environment the rendering process is running in.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-window.Rendering.html#env)
         */
        readonly env: string;
    }
    /**
     * The Warmup Data API is used to optimize data loading for sites that render both on the server and in the browser,
     *  allowing costly data fetching operations to be done only once.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.WarmupData.html#)
     */
    interface WarmupData {
        /**
         * Retrieves data from server-side code for use in client-side code.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-window.WarmupData.html#get)
         */
        get(key: string): any;
        /**
         * Sets data in server-side code for use in client-side code.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-window.WarmupData.html#set)
         */
        set(key: string, data: any): void;
    }
    /**
     * The Consent Policy API manages site visitor cookie preferences and 3rd-party data transfers for GDPR and CCPA compliance.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.ConsentPolicy.html#)
     */
    namespace ConsentPolicy {
        /**
         * The event that occurred when the consent policy changed.
         */
        type ConsentPolicyChangedEvent = {};
        /**
         * The current site visitor's consent policy settings.
         */
        type Policy = {
            /**
             * Consent for mandatory cookies for Wix websites, such as for security cookies. Wix places these cookies on the site visitor's device. These cookies don't require site visitor consent. Always `true`.
             */
            essential: boolean;
            /**
             * Consent for cookies placed on the site visitor's device that "remember" their user settings to improve user experience. For example, an indication that the user dismissed a popup. Default: `true`.
             */
            functional: boolean;
            /**
             * Consent for cookies used for analytics, such as Wix analytics, Google Analytics, Yandex Metrica, and so on. Default: `true`.
             */
            analytics: boolean;
            /**
             * Consent for cookies used for advertising purposes. This includes 3rd-party scripts and pixels that may potentially place advertising cookies on the device. For example, Twitter page view and Facebook Pixel. Default: `true`.
             */
            advertising: boolean;
            /**
             * Consent for a site visitor's personal data to be transferred to a 3rd party. For example, Google Analytics, Facebook Pixel, and FullStory. Default: `true`.
             */
            dataToThirdParty: boolean;
        };
        /**
         * The complete details of the current site visitor's consent policy.
         */
        type PolicyDetails = {
            /**
             * Whether the current consent policy is the default one you set. If `true`, either the site visitor hasn't set a policy, or you've reset it to its default settings.
             */
            defaultPolicy: boolean;
            /**
             * An object representing the site visitor's current consent policy.
             */
            policy: wixWindowFrontend.ConsentPolicy.Policy;
            /**
             * The date the consent policy was set, if a cookie defining the current policy exists in the browser. Otherwise, it's undefined.
             */
            createdDate?: Date;
        };
        /**
         * Method that runs when a site visitor's consent policy was changed using `setConsentPolicy()`.
         */
        type ConsentPolicyChangedHandler = (event: wixWindowFrontend.ConsentPolicy.ConsentPolicyChangedEvent) => void;
    }
    /**
     * The Multilingual API is used when working with the languages in a multilingual site.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-window.Multilingual.html#)
     */
    namespace Multilingual {
        /**
         * An object returned by the `siteLanguages` property that contains information about a site's languages.
         */
        type SiteLanguage = {
            /**
             * The language's full name.
             */
            name: string;
            /**
             * The language's locale code, which represents a set of language-related formatting preferences.
             */
            locale: string;
            /**
             * The 2-letter or 4-letter language code.
             */
            languageCode: string;
            /**
             * The language's 3-letter country code.
             */
            countryCode: string;
            /**
             * Whether the language is a site's primary language.
             */
            isPrimaryLanguage: boolean;
        };
    }
}
