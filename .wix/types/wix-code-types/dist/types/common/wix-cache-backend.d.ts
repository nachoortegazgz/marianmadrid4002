declare module "wix-cache-backend" {
    interface InvalidateCacheRequest {
        /** An array of objects containing a `tag` field used to identify the cache to invalidate. All cached return values with any listed tags are invalidated. If no tags are specified, nothing is invalidated. */
        invalidationMethods?: InvalidationMethods[];
    }
    interface InvalidationMethods extends InvalidationMethodsInvalidateByOneOf {
        /** Identifiers of the caches to invalidate. */
        tag?: string;
    }
    /** @oneof */
    interface InvalidationMethodsInvalidateByOneOf {
        /** Identifiers of the caches to invalidate. */
        tag?: string;
    }
    interface InvalidateCacheResponse {
    }
    /**
     * Clears caches using specified tags.
     *
     * This function invalidates or clears previously cached return values based on specified tags. The `invalidationMethods` parameter accepts an array of objects, each containing a `tag` field. These tags are defined when caching return values for backend functions using the [`webMethod()`](https://dev.wix.com/docs/velo/api-reference/wix-web-module/web-method) function, and for routers using the [`ok()` function](https://dev.wix.com/docs/velo/api-reference/wix-router/ok). For example, an array such as `[{ tag: "contacts" }, { tag: "labels" }]` will clear any cached return values tagged with "contacts" or "labels." Any cache containing at least one tag specified in the `invalidationMethods` parameter will be cleared.
     *
     *
     * <blockquote class="important">
     *
     * __Important:__
     * - If you don't specify any tags in the `invalidationsMethod` parameter, no caches are invalidated.
     * - If you don't use the `invalidateCache()` function, your caches are only invalidated when the Time to Live (TTL) expires or when you republish your site with a code change.
     *
     *
     * - This function can be used to invalidate your backend function caches and router caches. To invalidate Server Side Rendering (SSR) caches for your site, use the `invalidateCache()` function from the [`wix-site-backend`](https://dev.wix.com/docs/velo/api-reference/wix-site-backend/invalidate-cache) module.
     *
     * </blockquote>
     * @param invalidationMethods - An array of objects containing a `tag` field used to identify the cache to invalidate. All cached return values with any listed tags are invalidated. If no tags are specified, nothing is invalidated.
     * @public
     * @documentationMaturity preview
     * @requiredField invalidationMethods
     * @permissionId SSR.INVALIDATE_CACHE
     * @adminMethod
     */
    function invalidateCache(invalidationMethods: InvalidationMethods[], options?: InvalidateCacheOptions): Promise<void>;
    interface InvalidateCacheOptions {
    }
    type ssrV1InvalidateCacheRequestCache_universal_d_InvalidateCacheRequest = InvalidateCacheRequest;
    type ssrV1InvalidateCacheRequestCache_universal_d_InvalidationMethods = InvalidationMethods;
    type ssrV1InvalidateCacheRequestCache_universal_d_InvalidationMethodsInvalidateByOneOf = InvalidationMethodsInvalidateByOneOf;
    type ssrV1InvalidateCacheRequestCache_universal_d_InvalidateCacheResponse = InvalidateCacheResponse;
    const ssrV1InvalidateCacheRequestCache_universal_d_invalidateCache: typeof invalidateCache;
    type ssrV1InvalidateCacheRequestCache_universal_d_InvalidateCacheOptions = InvalidateCacheOptions;
    namespace ssrV1InvalidateCacheRequestCache_universal_d {
        export { ssrV1InvalidateCacheRequestCache_universal_d_InvalidateCacheRequest as InvalidateCacheRequest, ssrV1InvalidateCacheRequestCache_universal_d_InvalidationMethods as InvalidationMethods, ssrV1InvalidateCacheRequestCache_universal_d_InvalidationMethodsInvalidateByOneOf as InvalidationMethodsInvalidateByOneOf, ssrV1InvalidateCacheRequestCache_universal_d_InvalidateCacheResponse as InvalidateCacheResponse, ssrV1InvalidateCacheRequestCache_universal_d_invalidateCache as invalidateCache, ssrV1InvalidateCacheRequestCache_universal_d_InvalidateCacheOptions as InvalidateCacheOptions, };
    }
    export { ssrV1InvalidateCacheRequestCache_universal_d as cache };
}
