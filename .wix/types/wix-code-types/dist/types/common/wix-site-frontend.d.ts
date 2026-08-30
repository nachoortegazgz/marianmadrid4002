/**
 * The wix-site-frontend module contains functionality for obtaining information about a site and its pages.
 * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.html#)
 */
declare module 'wix-site-frontend' {
    /**
     * Retrieves a code representing the site's currency.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.html#currency)
     */
    const currency: string;
    /**
     * Retrieves information about a current page or popup.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.html#currentPage)
     */
    const currentPage: StructurePage | StructureLightbox;
    /**
     * Retrieves a code representing the site's language.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.html#language)
     */
    const language: string;
    /**
     * Retrieves a site's regional settings.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.html#regionalSettings)
     */
    const regionalSettings: string;
    /**
     * Retrieves the site revision ID.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.html#revision)
     */
    const revision: string;
    /**
     * Retrieves a site's time zone.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.html#timezone)
     */
    const timezone: string;
    /**
     * [Read more](https://www.wix.com/corvid/reference/wix-site-frontend.html#wixRouterSitemapEntry)
     */
    const wixRouterSitemapEntry: WixRouterSitemapEntry;
    /**
     * Gets an HTML element containing CSS code to load fonts.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.html#getFontsHtml)
     */
    function getFontsHtml(fonts: string[], options?: getFontsHtmlOptions): Promise<string>;
    /**
     * Gets the site display name.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.html#getSiteDisplayName)
     */
    function getSiteDisplayName(): string;
    /**
     * Returns information about a site's pages, prefixes, and popups.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.html#getSiteStructure)
     */
    function getSiteStructure(): SiteStructure;
    /**
     * Gets the CSS code of the site's theme.
     * Use `getSiteThemeHtml()` to get an HTML element containing the CSS code of a site's
     * [theme colors and fonts](https://support.wix.com/en/article/wix-editor-customizing-your-sites-theme-and-design).
     * Use `getSiteThemeHtml()` when embedding a custom element in a Wix site where the page's stylesheet
     * is inaccessible, such as when using a shadow root or an internal iframe.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.html#getSiteThemeHtml)
     */
    function getSiteThemeHtml(options?: getSiteThemeHtmlOptions): Promise<string>;
    /**
     * Optimizes resource fetching of pages and popups in a site so they'll load faster.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.html#prefetchPageResources)
     */
    function prefetchPageResources(prefetchItems: PrefetchItems): PrefetchResult;
    /**
     * Returns the sitemap for a router or dynamic page prefix.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.html#routerSitemap)
     */
    function routerSitemap(routerPrefix: string): Promise<WixRouterSitemapEntry[]>;
    /**
     * An object that contains information about which pages and popups to
     *  prefetch resources for.
     */
    type PrefetchItems = {
        /**
         * The relative or absolute URLs of the pages in a site
         *  to prefetch resources for.
         */
        pages?: string[];
        /**
         * The names of the popups in a site to prefetch
         *  resources for.
         *
         *  > **Note:** Pages are listed by relative or absolute URL, but popups are listed by name.
         *  See `location.to` to learn how to find a page's relative
         *  URL. You can find a popup's name by selecting the popup and clicking the settings button.
         */
        lightboxes?: string[];
    };
    /**
     * An object that's returned from a prefetch request.
     */
    type PrefetchResult = {
        /**
         * A success or failure message.
         */
        message: string;
        /**
         * The errors that occurred.
         */
        errors: PrefetchResultError;
    };
    /**
     * An object that's returned when a resource prefetch is unsuccessful.
     */
    type PrefetchResultError = {
        /**
         * The names of the pages for which prefetch failed.
         */
        pages: string[];
        /**
         * The names of the popups for which prefetch failed.
         */
        lightboxes: string[];
    };
    /**
     * An object that contains information about a site's prefixes.
     */
    type Prefix = {
        /**
         * The name of the prefix.
         */
        name: string;
        /**
         * The type of the prefix.
         *
         *  A site's routers, dynamic pages, and app pages all have prefixes.
         *
         *  One of:
         *
         *  + `"dynamicPages"`
         *  + `"router"`
         *  + `"app"`
         */
        type: string;
        /**
         * The prefix.
         */
        prefix: string;
        /**
         * If the prefix is an app's prefix, the `applicationId` property is the app's ID.
         */
        applicationId?: string;
    };
    /**
     * An object that contains information about a site's pages, prefixes, and popups.
     */
    type SiteStructure = {
        /**
         * The pages of a site.
         *  Pages can be regular pages, dynamic pages, router pages, or pages from an app.
         */
        pages: StructurePage[];
        /**
         * The prefixes of the site's routers and dynamic pages.
         */
        prefixes: Prefix[];
        /**
         * The site's popups.
         */
        lightboxes: StructureLightbox[];
    };
    /**
     * An object that contains information about a popup on a site.
     */
    type StructureLightbox = {
        /**
         * The name of the popup.
         */
        name: string;
    };
    /**
     * An object that contains information about a page on a site.
     */
    type StructurePage = {
        /**
         * Page name.
         */
        name: string;
        /**
         * Page type: `"static"` or `"template"`.
         */
        type: string;
        /**
         * URL of the page. If the page is a `static` page the `url` property is the page's SEO URL.
         */
        url?: string;
        /**
         * If the page is an app page, the `applicationId` property is the app's ID.
         */
        applicationId?: string;
        /**
         * If the page is a router or dynamic page, the `prefix` property is the page's prefix.
         */
        prefix?: string;
        /**
         * If the page is the Home page, `isHomePage` is `true`. Otherwise, it doesn't exist.
         */
        isHomePage?: boolean;
    };
    /**
     * The options used when getting the HTML element.
     */
    type getFontsHtmlOptions = {
        /**
         * An identifier that's added in a `data-test-id` attribute on the returned HTML element. Use this identifier to locate the HTML element when testing your code.
         */
        testId: string;
    };
    /**
     * The options used when getting an HTML element.
     */
    type getSiteThemeHtmlOptions = {
        /**
         * An identifier that's added in a `data-test-id` attribute on the returned HTML element. You can use this identifier to locate the HTML element when testing your code.
         */
        testId: string;
    };
    /**
     * An object representing a single entry in a sitemap.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.WixRouterSitemapEntry.html#)
     */
    interface WixRouterSitemapEntry {
        /**
         * Gets how frequently the page is likely to change.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.WixRouterSitemapEntry.html#changeFrequency)
         */
        readonly changeFrequency: string;
        /**
         * Gets when the page data was last modified.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.WixRouterSitemapEntry.html#lastModified)
         */
        readonly lastModified: Date;
        /**
         * Gets the page name.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.WixRouterSitemapEntry.html#pageName)
         */
        readonly pageName: string;
        /**
         * Gets the priority of this URL relative to other URLs on your site.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.WixRouterSitemapEntry.html#priority)
         */
        readonly priority: number;
        /**
         * Gets the page title.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.WixRouterSitemapEntry.html#title)
         */
        readonly title: string;
        /**
         * Gets the relative url of the page.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-site-frontend.WixRouterSitemapEntry.html#url)
         */
        readonly url: string;
    }
}
