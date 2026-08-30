declare module "wix-b2btransfer" {
  /** The B2B Site Transfer object contains information about a site transfer. */
  interface SiteTransfer {
      /**
       * ID of the site. See the
       * [Sites API](https://dev.wix.com/api/rest/account-level-apis/sites/query-sites)
       * for more details.
       */
      siteId?: string;
      /**
       * ID of the source account.
       * Contact the [Wix B2B sales team](mailto:bizdev@wix.com) for more
       * information about supported source accounts.
       */
      sourceAccountId?: string;
      /**
       * Whether the site owner receives an email notification from Wix about the
       * successful site transfer. Site owners don't receive email notifications
       * about failed transfers. Default: `false`.
       */
      enableNotifications?: boolean;
  }
  interface TransferSiteRequest {
      /** Information about the site transfer. */
      siteTransfer: SiteTransfer;
  }
  interface TransferSiteResponse {
      /** Information about the site transfer. */
      siteTransfer?: SiteTransfer;
  }
  /**
   * Transfers a Wix site from the source account to the target account.
   *
   * > **Note:** You must pass the ID of the target account in the header of the call.
   *
   *  Only strategic partners of Wix services can transfer sites. Contact the [Wix B2B sales team](mailto:bizdev@wix.com) to learn how to become a strategic partner.
   *
   *  Not all Wix accounts are supported as source accounts and you can transfer a site only to your main account or one of its sub-accounts. It isn’t possible to transfer a site to an unrelated account. Contact the [Wix B2B sales team](mailto:bizdev@wix.com) for more information.
   *
   *  Only sites that don’t include paid Wix services can be transferred. After transferring the site, you can use the [Resellers API](https://dev.wix.com/docs/sdk/account-level-modules/resellers/introduction) to offer paid Wix services to your customers.
   *
   * >  **Important:** This call requires an account level API key and cannot be authenticated with the standard authorization header.
   * @param siteTransfer - Information about the site transfer.
   * @public
   * @documentationMaturity preview
   * @requiredField siteTransfer
   * @permissionId PREMIUM.BUSINESS_SITE_TRANSFER
   * @adminMethod
   */
  function transferSite(siteTransfer: SiteTransfer): Promise<TransferSiteResponse>;
  
  type premiumBusinessV1BusinessSiteTransfer_universal_d_SiteTransfer = SiteTransfer;
  type premiumBusinessV1BusinessSiteTransfer_universal_d_TransferSiteRequest = TransferSiteRequest;
  type premiumBusinessV1BusinessSiteTransfer_universal_d_TransferSiteResponse = TransferSiteResponse;
  const premiumBusinessV1BusinessSiteTransfer_universal_d_transferSite: typeof transferSite;
  namespace premiumBusinessV1BusinessSiteTransfer_universal_d {
    export {
      premiumBusinessV1BusinessSiteTransfer_universal_d_SiteTransfer as SiteTransfer,
      premiumBusinessV1BusinessSiteTransfer_universal_d_TransferSiteRequest as TransferSiteRequest,
      premiumBusinessV1BusinessSiteTransfer_universal_d_TransferSiteResponse as TransferSiteResponse,
      premiumBusinessV1BusinessSiteTransfer_universal_d_transferSite as transferSite,
    };
  }
  
  export { premiumBusinessV1BusinessSiteTransfer_universal_d as b2BTransfer };
}
