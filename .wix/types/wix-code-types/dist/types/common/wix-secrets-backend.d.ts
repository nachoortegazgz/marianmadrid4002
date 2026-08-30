/**
 * The wix-secrets-backend module contains functionality for
 * managing secrets you safely store in your site's [Secrets Manager](https://support.wix.com/en/article/velo-about-the-secrets-manager).
 * 	[Read more](https://www.wix.com/corvid/reference/wix-secrets-backend.html#)
 */
declare module 'wix-secrets-backend' {
    /**
     * > **Deprecation Warning**
     * >
     * > This method will be deprecated on September 7, 2025.
     * >
     * > Replace with [Create Secret](https://dev.wix.com/docs/velo/apis/wix-secrets-backend-v2/secrets/create-secret).
     *
     * Creates a new secret.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-secrets-backend.html#createSecret)
     */
    function createSecret(secret: Secret): Promise<string>;
    /**
     * > **Deprecation Warning**
     * >
     * > This method will be deprecated on September 7, 2025.
     * >
     * > Replace with [Delete Secret](https://dev.wix.com/docs/velo/apis/wix-secrets-backend-v2/secrets/delete-secret).
     *
     * Deletes an existing secret by ID.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-secrets-backend.html#deleteSecret)
     */
    function deleteSecret(id: string): Promise<void>;
    /**
     * > **Deprecation Warning**
     * >
     * > This method will be deprecated on September 7, 2025.
     * >
     * > Replace with [Get Secret Value](https://dev.wix.com/docs/velo/apis/wix-secrets-backend-v2/secrets/get-secret-value).
     *
     * Gets a secret by name.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-secrets-backend.html#getSecret)
     */
    function getSecret(name: string): Promise<string>;
    /**
     * > **Deprecation Warning**
     * >
     * > This method will be deprecated on September 7, 2025.
     * >
     * > Replace with [List Secret Info](https://dev.wix.com/docs/velo/apis/wix-secrets-backend-v2/secrets/list-secret-info).
     *
     * Gets a list of objects containing information about all secrets stored in the Secrets Manager.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-secrets-backend.html#listSecretInfo)
     */
    function listSecretInfo(): Promise<SecretInfo[]>;
    /**
     * > **Deprecation Warning**
     * >
     * > This method will be deprecated on September 7, 2025.
     * >
     * > Replace with [Update Secret](https://dev.wix.com/docs/velo/apis/wix-secrets-backend-v2/secrets/update-secret).
     *
     * Updates the specified fields of an existing secret by ID.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-secrets-backend.html#updateSecret)
     */
    function updateSecret(id: string, secret: SecretUpdateInfo): Promise<void>;
    /**
     * An object representing information for creating or updating a secret.
     */
    type Secret = {
        /**
         * A unique, meaningful name used for retrieving the secret at runtime using [`getSecret()`](wix-secrets-backend.html#getSecret). You can use alphanumeric characters and the following special characters: `_+=-#@$#`. Spaces are not supported.
         */
        name: string;
        /**
         * The confidential value to protect, such as an API key.
         */
        value: string;
        /**
         * An optional text describing the secret's purpose or any other notes.
         */
        description?: string;
    };
    /**
     * Information about a secret, not including the protected `value`.
     */
    type SecretInfo = {
        /**
         * The secret's ID.
         */
        id: string;
        /**
         * A unique, meaningful name used for retrieving the secret at runtime using [`getSecret()`](wix-secrets-backend.html#getSecret).
         */
        name: string;
        /**
         * An optional text describing the secret's purpose or any other notes about it.
         */
        description: string;
        /**
         * The date and time the secret was created.
         */
        createdDate: Date;
        /**
         * The date and time the secret was last updated.
         */
        updatedDate: Date;
    };
    /**
     * An object representing information for creating or updating a secret.
     */
    type SecretUpdateInfo = {
        /**
         * A unique, meaningful name used for retrieving the secret at runtime using [`getSecret()`](wix-secrets-backend.html#getSecret). You can use alphanumeric characters and the following special characters: `_+=-#@$#`. Spaces are not supported.
         */
        name?: string;
        /**
         * The confidential value to protect, such as an API key.
         */
        value?: string;
        /**
         * An optional text describing the secret's purpose or any other notes.
         */
        description?: string;
    };
}
