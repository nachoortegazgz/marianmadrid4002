/**
 * The Velo Action Service Plugin.
 * 	[Read more](https://www.wix.com/corvid/reference/velo-action-spi.html#)
 */
declare module 'velo-action-spi' {
    /**
     * Runs your custom action when an automation is triggered.
     * 	[Read more](https://www.wix.com/corvid/reference/velo-action-spi.html#invoke)
     */
    function invoke(options: Options, context: Context): Promise<any>;
    type Context = {
        /**
         * [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) 3-letter currency code representing the currency used in the request sent from Wix. The response should be returned in the same currency.
         */
        currency: string;
        /**
         * The identity that describes the identity that triggered this request.
         */
        identity: Identity;
        /**
         * An array of languages in which the response should be returned. Languages are strings in concatenated [ISO 639-1: 2 Alpha language-code](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) and [ISO 3166-1: 2 Alpha country-code](https://en.wikipedia.org/wiki/ISO_3166-1) format, such as "en-US".
         */
        languages: string[];
        /**
         * A unique identifier of the request. You may print this ID to your logs to help with future debugging and easier correlation with Wix's logs.
         */
        requestId: string;
    };
    type Identity = {
        /**
         * Type of identity that triggered the request. Possible values are:
         * + `UNKNOWN`
         * + `ANONYMOUS_VISITOR`
         * + `MEMBER`
         * + `WIX_USER`
         * + `APP`
         */
        identityType: string;
        /**
         * ID of a site visitor who has not logged in to the site. Only provided if `identityType` is `ANONYMOUS_VISITOR`.
         */
        anonymousVisitorId?: string;
        /**
         * ID of a site visitor who has logged in to the site. Only provided if `identityType` is `MEMBER`.
         */
        memberId?: string;
        /**
         * ID of a Wix user (site owner, contributor, etc.). Only provided if `identityType` is `WIX_USER`.
         */
        wixUserId?: string;
        /**
         * ID of an app. Only provided if `identityType` is `APP`.
         */
        appId?: string;
    };
    type Options = {
        /**
         * The payload object. Fields vary depending on the selected trigger.
         */
        payload: Object;
    };
}
