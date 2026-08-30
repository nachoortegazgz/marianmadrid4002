declare module "wix-site-actions.v2" {
  /**
   * A package is group of instances of Wix services that a reseller offers to a
   * customer as part of a single transaction.
   */
  interface EmptyEntity {
  }
  interface PublishSiteRequest {
  }
  interface PublishSiteResponse {
  }
  interface DuplicateSiteRequest {
      /** ID of the site to duplicated. */
      sourceSiteId: string;
      /** Display name for the new site. */
      siteDisplayName: string;
  }
  interface DuplicateSiteResponse {
      /** ID of the new site. */
      newSiteId?: string;
  }
  interface BulkDeleteSiteRequest {
      /**
       * Site IDs.
       *
       * Min: 1 site ID <br>
       * Max: 20 site IDs
       */
      ids: string[];
  }
  interface BulkDeleteSiteResponse {
      /** List of deletion results. */
      results?: BulkSiteResult[];
      /** Summary of deletion data. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkSiteResult {
      /** Result of deletion request per site describing the success or failure of each deletion. */
      itemMetadata?: ItemMetadata;
  }
  interface ItemMetadata {
      /** Site ID. */
      _id?: string | null;
      /** Index of the site in the request array. Allows for correlation between request and response. */
      originalIndex?: number;
      /** Whether the requested action was successful for the site. When `false`, the action failed and an `error` object is populated. */
      success?: boolean;
      /** Details about the error. */
      error?: ApplicationError;
  }
  interface ApplicationError {
      /** Error code. */
      code?: string;
      /** Description of error. */
      description?: string;
  }
  interface BulkActionMetadata {
      /** Number of sites that were deleted successfully. */
      totalSuccesses?: number;
      /** Number of sites that were not deleted successfully. */
      totalFailures?: number;
  }
  /**
   * Publishes a site.
   *
   * Publishing a site makes any changes previously saved on the site available on the internet.
   * After publishing, changes to your site appear in the [site's history](https://support.wix.com/en/article/viewing-and-managing-your-site-history).
   *
   * When you call this API, you must pass a header called `wix-site-id` whose value is the ID of the site you want to publish. Learn more about
   * working with [API keys and site IDs](https://dev.wix.com/docs/rest/articles/getting-started/api-keys#create-and-use-api-keys).
   *
   * >**Important:** This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function publishSite(): Promise<void>;
  /**
   * Duplicates a site with a new site name.
   *
   * > **Note:** When you duplicate a site, some business-related content such as store orders, contacts, invoices, and 3rd-party app settings are not be included.
   * > The duplicated site won’t have a domain or any Premium capabilities.
   *
   * Any installed apps that can be used only on sites with a Premium Plan, will be copied to the duplicated site and
   * will appear unactivated. Once the site is upgraded, the app will be available for use.
   *
   * > **Important:** This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param sourceSiteId - ID of the site to duplicated.
   * @public
   * @documentationMaturity preview
   * @requiredField options
   * @requiredField options.siteDisplayName
   * @requiredField sourceSiteId
   * @adminMethod
   */
  function duplicateSite(sourceSiteId: string, options: DuplicateSiteOptions): Promise<DuplicateSiteResponse>;
  interface DuplicateSiteOptions {
      /** Display name for the new site. */
      siteDisplayName: string;
  }
  /**
   * This endpoint enables you to delete multiple sites.
   *
   * This is not a permanent delete. Sites are moved to the trash bin and can be restored through site collaborators.
   *
   * Learn more about [deleting multiple sites](https://support.wix.com/en/article/moving-a-site-to-trash).
   *
   * > **Important:** This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param ids - Site IDs.
   *
   * Min: 1 site ID <br>
   * Max: 20 site IDs
   * @public
   * @documentationMaturity preview
   * @requiredField ids
   * @adminMethod
   */
  function bulkDeleteSite(ids: string[]): Promise<BulkDeleteSiteResponse>;
  
  type siteActionsV1SiteActions_universal_d_EmptyEntity = EmptyEntity;
  type siteActionsV1SiteActions_universal_d_PublishSiteRequest = PublishSiteRequest;
  type siteActionsV1SiteActions_universal_d_PublishSiteResponse = PublishSiteResponse;
  type siteActionsV1SiteActions_universal_d_DuplicateSiteRequest = DuplicateSiteRequest;
  type siteActionsV1SiteActions_universal_d_DuplicateSiteResponse = DuplicateSiteResponse;
  type siteActionsV1SiteActions_universal_d_BulkDeleteSiteRequest = BulkDeleteSiteRequest;
  type siteActionsV1SiteActions_universal_d_BulkDeleteSiteResponse = BulkDeleteSiteResponse;
  type siteActionsV1SiteActions_universal_d_BulkSiteResult = BulkSiteResult;
  type siteActionsV1SiteActions_universal_d_ItemMetadata = ItemMetadata;
  type siteActionsV1SiteActions_universal_d_ApplicationError = ApplicationError;
  type siteActionsV1SiteActions_universal_d_BulkActionMetadata = BulkActionMetadata;
  const siteActionsV1SiteActions_universal_d_publishSite: typeof publishSite;
  const siteActionsV1SiteActions_universal_d_duplicateSite: typeof duplicateSite;
  type siteActionsV1SiteActions_universal_d_DuplicateSiteOptions = DuplicateSiteOptions;
  const siteActionsV1SiteActions_universal_d_bulkDeleteSite: typeof bulkDeleteSite;
  namespace siteActionsV1SiteActions_universal_d {
    export {
      siteActionsV1SiteActions_universal_d_EmptyEntity as EmptyEntity,
      siteActionsV1SiteActions_universal_d_PublishSiteRequest as PublishSiteRequest,
      siteActionsV1SiteActions_universal_d_PublishSiteResponse as PublishSiteResponse,
      siteActionsV1SiteActions_universal_d_DuplicateSiteRequest as DuplicateSiteRequest,
      siteActionsV1SiteActions_universal_d_DuplicateSiteResponse as DuplicateSiteResponse,
      siteActionsV1SiteActions_universal_d_BulkDeleteSiteRequest as BulkDeleteSiteRequest,
      siteActionsV1SiteActions_universal_d_BulkDeleteSiteResponse as BulkDeleteSiteResponse,
      siteActionsV1SiteActions_universal_d_BulkSiteResult as BulkSiteResult,
      siteActionsV1SiteActions_universal_d_ItemMetadata as ItemMetadata,
      siteActionsV1SiteActions_universal_d_ApplicationError as ApplicationError,
      siteActionsV1SiteActions_universal_d_BulkActionMetadata as BulkActionMetadata,
      siteActionsV1SiteActions_universal_d_publishSite as publishSite,
      siteActionsV1SiteActions_universal_d_duplicateSite as duplicateSite,
      siteActionsV1SiteActions_universal_d_DuplicateSiteOptions as DuplicateSiteOptions,
      siteActionsV1SiteActions_universal_d_bulkDeleteSite as bulkDeleteSite,
    };
  }
  
  export { siteActionsV1SiteActions_universal_d as siteActions };
}
