declare module "wix-site-plugins.v1" {
  /** The `PlacementStatus` object represents the status of your app's site plugins, indicating whether they are currently placed in a slot on the user's site. */
  interface PlacementStatus {
      /**
       * Plugin ID. This is a unique ID that is assigned to each plugin. You can view your plugin IDs in [extensions](https://dev.wix.com/app-selector?title=Select+an+App&primaryButtonText=Select+Site&actionUrl=https%3A%2F%2Fdev.wix.com%2Fapps%2F%7BappId%7D%2Fextensions) in your app's dashboard.
       * @readonly
       */
      pluginId?: string | null;
      /**
       * Whether the plugin placed in a slot on the user's site.
       * @readonly
       */
      placedInSlot?: boolean | null;
  }
  interface GetPlacementStatusRequest {
  }
  interface GetPlacementStatusResponse {
      /** Data about placement statuses of your app's site plugins on the user's site. */
      placementStatuses?: PlacementStatus[];
  }
  /**
   * Get the placement statuses of your app's site plugins on the user's site.
   * @public
   * @documentationMaturity preview
   * @permissionId PLUGINS.PLACEMENT_STATUSES_READ
   * @adminMethod
   */
  function getPlacementStatus(): Promise<GetPlacementStatusResponse>;
  
  type appPluginsSitePluginsV1PlacementStatus_universal_d_PlacementStatus = PlacementStatus;
  type appPluginsSitePluginsV1PlacementStatus_universal_d_GetPlacementStatusRequest = GetPlacementStatusRequest;
  type appPluginsSitePluginsV1PlacementStatus_universal_d_GetPlacementStatusResponse = GetPlacementStatusResponse;
  const appPluginsSitePluginsV1PlacementStatus_universal_d_getPlacementStatus: typeof getPlacementStatus;
  namespace appPluginsSitePluginsV1PlacementStatus_universal_d {
    export {
      appPluginsSitePluginsV1PlacementStatus_universal_d_PlacementStatus as PlacementStatus,
      appPluginsSitePluginsV1PlacementStatus_universal_d_GetPlacementStatusRequest as GetPlacementStatusRequest,
      appPluginsSitePluginsV1PlacementStatus_universal_d_GetPlacementStatusResponse as GetPlacementStatusResponse,
      appPluginsSitePluginsV1PlacementStatus_universal_d_getPlacementStatus as getPlacementStatus,
    };
  }
  
  export { appPluginsSitePluginsV1PlacementStatus_universal_d as plugins };
}
