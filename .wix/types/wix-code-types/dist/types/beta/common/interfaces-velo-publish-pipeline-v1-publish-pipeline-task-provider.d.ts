declare module "interfaces-velo-publish-pipeline-v1-publish-pipeline-task-provider" {
  type BusinessError<T = unknown> = {
      __tag: 'BusinessError';
      httpCode: string;
      errorDescription: string;
      applicationCode: string;
      messageSchema: string;
      data: T;
  };
  
  interface InvokeVeloPublishPipelineTaskProviderRequest {
      /** The Velo app id */
      gridAppId: string;
      /** The deployment creation process id */
      deploymentId: string;
      /** The site's meta site id */
      metaSiteId?: string;
      /** The CloudSiteExtension instance id in meta site */
      wixCodeInstanceId?: string;
      /** The editor pages on the current deployed revision */
      pages?: Page[];
  }
  interface Page {
      /** The editor page id, i.e "c1dmp" */
      _id?: string;
      /** The editor page name, i.e "HOME" */
      name?: string | null;
  }
  interface InvokeVeloPublishPipelineTaskProviderResponse {
  }
  interface VeloPublishPipelineTaskProviderConfig {
      /** URI where the SPI Implementer is deployed */
      baseUri?: SpiBaseUri;
      /** The Velo Task name */
      implementerTasksNames?: WixCodePublishTaskName[];
  }
  interface SpiBaseUri {
      /** URI that will be used by the host to call the implementer. The path-suffix defined on the method will be appended to it */
      baseUri?: string;
      /** override method mappings per method */
      alternativeUris?: AlternativeUri[];
  }
  interface AlternativeUri {
      /** name of the method as it appears in the proto */
      methodName?: string;
      /** absolute uri that will be used by the host to call that method. The path-suffix mapped from the method http option will NOT be appended to this URI. For TPAs. it must be https */
      absoluteUri?: string;
  }
  enum WixCodePublishTaskName {
      /** unknown */
      UNKNOWN = "UNKNOWN",
      /** user code bundle */
      USER_CODE_BUNDLE = "USER_CODE_BUNDLE",
      /** exported functions analysis */
      EXPORTED_FUNCTIONS_ANALYSIS = "EXPORTED_FUNCTIONS_ANALYSIS",
      /** imported namespaces analysis */
      IMPORTED_NAMESPACES_ANALYSIS = "IMPORTED_NAMESPACES_ANALYSIS",
      /** page details analysis */
      PAGE_DETAILS_ANALYSIS = "PAGE_DETAILS_ANALYSIS"
  }
  /**
   * this message is not directly used by any service,
   * it exists to describe the expected parameters that SHOULD be provided to invoked Velo methods as part of open-platform.
   * e.g. SPIs, event-handlers, etc..
   * NOTE: this context object MUST be provided as the last argument in each Velo method signature.
   *
   * Example:
   * ```typescript
   * export function wixStores_onOrderCanceled({ event, metadata }: OrderCanceledEvent) {
   * ...
   * }
   * ```
   */
  interface Context {
      /** A unique identifier for each request. Can be used for logging / troubleshooting */
      requestId?: string | null;
      /** 3 capital letters string representing a currency according to ISO-4217 */
      currency?: string | null;
      /** The identification type and identity data */
      identity?: IdentificationData;
      /** A string representing a language and region in the format of "xx-XX". First 2 letters represent the language code according to ISO 639-1. This is followed by a dash "-", and then a by 2 capital letters representing the region according to ISO 3166-2 */
      languages?: string[];
      /** App instance ID of SPI in context */
      instanceId?: string | null;
      /**
       * Extension ID in Dev Center.
       * @internal
       */
      appExtensionId?: string | null;
      /**
       * Extension type in Dev Center.
       * @internal
       */
      appExtensionType?: string | null;
      /**
       * Invoked function.
       * @internal
       */
      functionName?: string | null;
  }
  enum IdentityType {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  interface IdentificationData extends IdentificationDataIdOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: IdentityType;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  interface InvokeVeloPublishPipelineTaskProviderOptions {
      /** The Velo app id */
      gridAppId: string;
      /** The deployment creation process id */
      deploymentId: string;
      /** The site's meta site id */
      metaSiteId?: string;
      /** The CloudSiteExtension instance id in meta site */
      wixCodeInstanceId?: string;
      /** The editor pages on the current deployed revision */
      pages?: Page[];
  }
  
  export { AlternativeUri, BusinessError, Context, IdentificationData, IdentificationDataIdOneOf, IdentityType, InvokeVeloPublishPipelineTaskProviderOptions, InvokeVeloPublishPipelineTaskProviderRequest, InvokeVeloPublishPipelineTaskProviderResponse, Page, SpiBaseUri, VeloPublishPipelineTaskProviderConfig, WixCodePublishTaskName };
}
