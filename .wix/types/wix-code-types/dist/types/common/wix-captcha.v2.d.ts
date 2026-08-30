declare module "wix-captcha.v2" {
    interface CaptchaEntity {
    }
    interface CaptchaRequest {
        /** The CAPTCHA token to authorize. */
        token?: string;
    }
    interface CaptchaResponse {
        /** Value is `true` when authorization is successful. */
        success?: boolean;
        /** Error information. */
        errors?: Errors;
    }
    interface Errors {
        /** ID of error. */
        errorId?: number;
    }
    interface AssessmentResponse {
        assessment?: string;
    }
    /**
     * Authorizes the CAPTCHA token.
     *
     *
     * Following CAPTCHA verification on the client side, you must authorize the generated CAPTCHA token in the backend.
     *
     * `authorize()` checks if the token is valid, making sure it was not tampered with or timed out.
     *
     * The `authorize()` function returns a Promise that resolves to a `Success` object when the token is authorized and to an `Error` object when authorization fails.
     *
     * To understand how `authorize()` is used in a typical CAPTCHA validation lifecycle, click [here](/$w/captcha/introduction).
     *
     * If CAPTCHA token authorization fails, an error message containing a status code is returned. The following table lists the possible HTTP error status codes, based on [RFC 2616](https://tools.ietf.org/html/rfc2616#section-10):
     *
     * | Status Code | Name | Description |
     * |---|---|---|
     * | 400 | Bad Request | The request could not be understood by the server. This could occur for a number of reasons, such as: <ul> <li>The request was sent without a token.</li> <li>The token is invalid.</li> <li>The token has timed out.</li> </ul> |
     * | 401 | Unauthenticated | No user identity found in passed request. |
     * | 500 | Internal Server Error | The server encountered an unexpected condition, such as a missing or invalid private CAPTCHA key. |
     * | 503 | Unavailable | The service is unavailable due to one of the following: <ul> <li>Throttled error: Server overload due to more than the allowed requests in a given time frame.</li> <li>Request failed: No response following 10 retries with a 1-second interval.</li> </ul> |
     * @param token - The CAPTCHA token to authorize.
     * @public
     * @documentationMaturity preview
     * @requiredField token
     * @adminMethod
     */
    function authorize(token: string, options?: AuthorizeOptions): Promise<CaptchaResponse>;
    interface AuthorizeOptions {
    }
    interface AuthorizeWithoutDomainValidationOptions {
        /** The CAPTCHA token to authorize. */
        token?: string;
    }
    interface AssessmentOptions {
        /** The CAPTCHA token to authorize. */
        token?: string;
    }
    type captcharatorV1CaptchaEntityCaptcha_universal_d_CaptchaEntity = CaptchaEntity;
    type captcharatorV1CaptchaEntityCaptcha_universal_d_CaptchaRequest = CaptchaRequest;
    type captcharatorV1CaptchaEntityCaptcha_universal_d_CaptchaResponse = CaptchaResponse;
    type captcharatorV1CaptchaEntityCaptcha_universal_d_Errors = Errors;
    type captcharatorV1CaptchaEntityCaptcha_universal_d_AssessmentResponse = AssessmentResponse;
    const captcharatorV1CaptchaEntityCaptcha_universal_d_authorize: typeof authorize;
    type captcharatorV1CaptchaEntityCaptcha_universal_d_AuthorizeOptions = AuthorizeOptions;
    type captcharatorV1CaptchaEntityCaptcha_universal_d_AuthorizeWithoutDomainValidationOptions = AuthorizeWithoutDomainValidationOptions;
    type captcharatorV1CaptchaEntityCaptcha_universal_d_AssessmentOptions = AssessmentOptions;
    namespace captcharatorV1CaptchaEntityCaptcha_universal_d {
        export { captcharatorV1CaptchaEntityCaptcha_universal_d_CaptchaEntity as CaptchaEntity, captcharatorV1CaptchaEntityCaptcha_universal_d_CaptchaRequest as CaptchaRequest, captcharatorV1CaptchaEntityCaptcha_universal_d_CaptchaResponse as CaptchaResponse, captcharatorV1CaptchaEntityCaptcha_universal_d_Errors as Errors, captcharatorV1CaptchaEntityCaptcha_universal_d_AssessmentResponse as AssessmentResponse, captcharatorV1CaptchaEntityCaptcha_universal_d_authorize as authorize, captcharatorV1CaptchaEntityCaptcha_universal_d_AuthorizeOptions as AuthorizeOptions, captcharatorV1CaptchaEntityCaptcha_universal_d_AuthorizeWithoutDomainValidationOptions as AuthorizeWithoutDomainValidationOptions, captcharatorV1CaptchaEntityCaptcha_universal_d_AssessmentOptions as AssessmentOptions, };
    }
    export { captcharatorV1CaptchaEntityCaptcha_universal_d as captcha };
}
