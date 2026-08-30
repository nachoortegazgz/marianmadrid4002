declare module "wix-urls.v2" {
  interface EditorUrls {
      /**
       * Editor type.
       * @readonly
       */
      editorType?: EditorType;
      /**
       * Editor URL.
       * @readonly
       */
      editorUrl?: string | null;
      /**
       * Preview URL.
       * @readonly
       */
      previewUrl?: string | null;
  }
  enum EditorType {
      /** Unknown editor type. */
      UNKNOWN = "UNKNOWN",
      /** The classic Wix Editor. */
      WIX_EDITOR = "WIX_EDITOR",
      /** Deprecated. Expected end-of-life date: July 1, 2024. */
      EDITOR_X = "EDITOR_X",
      /** Wix's Editor built for agencies and enterprises. */
      WIX_STUDIO = "WIX_STUDIO"
  }
  interface GetEditorUrlsRequest {
  }
  interface GetEditorUrlsResponse {
      /** Editor URL. */
      urls?: EditorUrls;
  }
  /**
   * Retrieves a site's Editor URLs.
   * @public
   * @documentationMaturity preview
   * @permissionId MetaSite.Read
   * @adminMethod
   */
  function getEditorUrls(): Promise<GetEditorUrlsResponse>;
  
  type editorurlsV2EditorUrls_universal_d_EditorUrls = EditorUrls;
  type editorurlsV2EditorUrls_universal_d_EditorType = EditorType;
  const editorurlsV2EditorUrls_universal_d_EditorType: typeof EditorType;
  type editorurlsV2EditorUrls_universal_d_GetEditorUrlsRequest = GetEditorUrlsRequest;
  type editorurlsV2EditorUrls_universal_d_GetEditorUrlsResponse = GetEditorUrlsResponse;
  const editorurlsV2EditorUrls_universal_d_getEditorUrls: typeof getEditorUrls;
  namespace editorurlsV2EditorUrls_universal_d {
    export {
      editorurlsV2EditorUrls_universal_d_EditorUrls as EditorUrls,
      editorurlsV2EditorUrls_universal_d_EditorType as EditorType,
      editorurlsV2EditorUrls_universal_d_GetEditorUrlsRequest as GetEditorUrlsRequest,
      editorurlsV2EditorUrls_universal_d_GetEditorUrlsResponse as GetEditorUrlsResponse,
      editorurlsV2EditorUrls_universal_d_getEditorUrls as getEditorUrls,
    };
  }
  
  interface PublishedSiteUrls {
      /** List of published sites. This array will be empty if the site hasn't been published. */
      urls?: Url[];
  }
  interface Url {
      /** URL type. */
      urlType?: UrlType;
      /** Whether this is the site's primary URL. */
      primary?: boolean;
      /** Published site URL. */
      url?: string;
      /** Language subdomain info hosted by [Wix multilingual](https://support.wix.com/article/wix-multilingual-adding-and-setting-up-wix-multilingual). */
      multilingualInfo?: MultilingualInfo;
  }
  enum UrlType {
      /** Unknown URL type. */
      UNKNOWN = "UNKNOWN",
      /** Only URLs directing to the Premium version of the site. */
      PREMIUM = "PREMIUM",
      /** Only URLs including `wixsite.com`. */
      FREE = "FREE"
  }
  interface MultilingualInfo {
      /** IETF BCP 47 language tag. For example, `en-US`. */
      languageCode?: string;
      /** Whether this is the site's default language. */
      defaultLanguage?: boolean;
  }
  interface ListPublishedSiteUrlsRequest {
      /** Filters for the list. */
      filters?: Filters;
  }
  interface Filters {
      /**
       * URL type filter.
       * Default: `ALL`
       */
      urlType?: UrlTypeFilter;
      /** Whether to return only the site's primary URL. <br /> Default: `true`. */
      primary?: boolean | null;
      /** Whether to return language subdomains hosted by [Wix Multilingual](https://support.wix.com/article/wix-multilingual-adding-and-setting-up-wix-multilingual). <br /> Default: `true`. */
      multilingual?: boolean | null;
  }
  enum UrlTypeFilter {
      /** All URLs. */
      ALL = "ALL",
      /** Only URLs directing to the Premium version of the site. */
      PREMIUM = "PREMIUM",
      /** Only URLs including `wixsite.com`. */
      FREE = "FREE"
  }
  interface ListPublishedSiteUrlsResponse {
      /** List will be empty for non published sites */
      urls?: Url[];
  }
  /**
   * Retrieves a list of a site's published URLs.
   * If a site hasn't been published, the call returns an empty array.
   * @public
   * @documentationMaturity preview
   * @permissionId SITE_URLS.READ
   * @adminMethod
   */
  function listPublishedSiteUrls(options?: ListPublishedSiteUrlsOptions): Promise<ListPublishedSiteUrlsResponse>;
  interface ListPublishedSiteUrlsOptions {
      /** Filters for the list. */
      filters?: Filters;
  }
  
  type urlsApiV2PublishedSiteUrls_universal_d_PublishedSiteUrls = PublishedSiteUrls;
  type urlsApiV2PublishedSiteUrls_universal_d_Url = Url;
  type urlsApiV2PublishedSiteUrls_universal_d_UrlType = UrlType;
  const urlsApiV2PublishedSiteUrls_universal_d_UrlType: typeof UrlType;
  type urlsApiV2PublishedSiteUrls_universal_d_MultilingualInfo = MultilingualInfo;
  type urlsApiV2PublishedSiteUrls_universal_d_ListPublishedSiteUrlsRequest = ListPublishedSiteUrlsRequest;
  type urlsApiV2PublishedSiteUrls_universal_d_Filters = Filters;
  type urlsApiV2PublishedSiteUrls_universal_d_UrlTypeFilter = UrlTypeFilter;
  const urlsApiV2PublishedSiteUrls_universal_d_UrlTypeFilter: typeof UrlTypeFilter;
  type urlsApiV2PublishedSiteUrls_universal_d_ListPublishedSiteUrlsResponse = ListPublishedSiteUrlsResponse;
  const urlsApiV2PublishedSiteUrls_universal_d_listPublishedSiteUrls: typeof listPublishedSiteUrls;
  type urlsApiV2PublishedSiteUrls_universal_d_ListPublishedSiteUrlsOptions = ListPublishedSiteUrlsOptions;
  namespace urlsApiV2PublishedSiteUrls_universal_d {
    export {
      urlsApiV2PublishedSiteUrls_universal_d_PublishedSiteUrls as PublishedSiteUrls,
      urlsApiV2PublishedSiteUrls_universal_d_Url as Url,
      urlsApiV2PublishedSiteUrls_universal_d_UrlType as UrlType,
      urlsApiV2PublishedSiteUrls_universal_d_MultilingualInfo as MultilingualInfo,
      urlsApiV2PublishedSiteUrls_universal_d_ListPublishedSiteUrlsRequest as ListPublishedSiteUrlsRequest,
      urlsApiV2PublishedSiteUrls_universal_d_Filters as Filters,
      urlsApiV2PublishedSiteUrls_universal_d_UrlTypeFilter as UrlTypeFilter,
      urlsApiV2PublishedSiteUrls_universal_d_ListPublishedSiteUrlsResponse as ListPublishedSiteUrlsResponse,
      urlsApiV2PublishedSiteUrls_universal_d_listPublishedSiteUrls as listPublishedSiteUrls,
      urlsApiV2PublishedSiteUrls_universal_d_ListPublishedSiteUrlsOptions as ListPublishedSiteUrlsOptions,
    };
  }
  
  export { editorurlsV2EditorUrls_universal_d as editor, urlsApiV2PublishedSiteUrls_universal_d as site };
}
