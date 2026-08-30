declare module "wix-automations-activation-summary.v1" {
  /**
   * Note: The following flynt-disable is because in this message we have a special case that this message represents
   * an aggregation by automation ID but the message itself has no ID of it's own.
   */
  interface ActivationSummary {
      /** Automation ID */
      automationId?: string | null;
      /** Preinstalled origin info */
      preinstalledOrigin?: PreinstalledOrigin;
      /** Total activations count per the automation */
      activationsCount?: number;
      /** When the automation was last activated */
      lastActivatedDate?: Date | null;
      /**
       * Migrated activations count
       * - If present, indicates the count of activations migrated from the old system
       * - If absent, indicates the migration has not been performed yet for this automation
       */
      migratedActivationsCount?: number | null;
      /** When the automation was last activated */
      migratedLastActivatedDate?: Date | null;
  }
  interface PreinstalledOrigin {
      /** Identifier for the application */
      appId?: string;
      /** Application component ID */
      componentId?: string;
  }
  interface GetActivationSummaryRequest {
      /** Automation ID */
      automationId: string;
  }
  interface GetActivationSummaryResponse {
      /** Activation summary per automation */
      activationSummary?: ActivationSummary;
  }
  interface GetActivationSummaryByPreinstalledOriginRequest {
      /** Preinstalled automation app ID */
      appId: string;
      /** Preinstalled automation component ID */
      componentId: string;
  }
  interface GetActivationSummaryByPreinstalledOriginResponse {
      /** Grouped activation summary by (app_id, component_id) */
      activationSummary?: ActivationSummary;
  }
  interface MigrateActivationsCountRequest {
      /** MetaSite ID */
      metaSiteId: string;
      /** Automation ID */
      automationId: string;
      /** Preinstalled info */
      preinstalledOrigin?: PreinstalledOrigin;
      /** Migrated activations count for automation */
      activationsCount: number | null;
      /** When the automation was last activated */
      lastActivatedDate: Date | null;
  }
  interface MigrateActivationsCountResponse {
  }
  /**
   * Get activation summary by automation id
   * @param automationId - Automation ID
   * @public
   * @documentationMaturity preview
   * @requiredField automationId
   * @permissionId AUTOMATIONS.ACTIVATION_SUMMARY_READ
   * @adminMethod
   * @returns Activation summary per automation
   */
  function getActivationSummary(automationId: string): Promise<ActivationSummary>;
  /** @public
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.appId
   * @requiredField identifiers.componentId
   * @permissionId AUTOMATIONS.ACTIVATION_SUMMARY_READ
   * @adminMethod
   */
  function getActivationSummaryByPreinstalledOrigin(identifiers: GetActivationSummaryByPreinstalledOriginIdentifiers): Promise<GetActivationSummaryByPreinstalledOriginResponse>;
  interface GetActivationSummaryByPreinstalledOriginIdentifiers {
      /** Preinstalled automation app ID */
      appId: string;
      /** Preinstalled automation component ID */
      componentId: string;
  }
  /**
   * migrate activations count
   * @param metaSiteId - MetaSite ID
   * @public
   * @documentationMaturity preview
   * @requiredField metaSiteId
   * @requiredField options.activationsCount
   * @requiredField options.automationId
   * @requiredField options.lastActivatedDate
   * @permissionId AUTOMATIONS.ACTIVATION_SUMMARY_WRITE
   * @adminMethod
   */
  function migrateActivationsCount(metaSiteId: string, options?: MigrateActivationsCountOptions): Promise<void>;
  interface MigrateActivationsCountOptions {
      /** Automation ID */
      automationId: string;
      /** Preinstalled info */
      preinstalledOrigin?: PreinstalledOrigin;
      /** Migrated activations count for automation */
      activationsCount: number | null;
      /** When the automation was last activated */
      lastActivatedDate: Date | null;
  }
  
  type automationsActivationLogsV1ActivationSummary_universal_d_ActivationSummary = ActivationSummary;
  type automationsActivationLogsV1ActivationSummary_universal_d_PreinstalledOrigin = PreinstalledOrigin;
  type automationsActivationLogsV1ActivationSummary_universal_d_GetActivationSummaryRequest = GetActivationSummaryRequest;
  type automationsActivationLogsV1ActivationSummary_universal_d_GetActivationSummaryResponse = GetActivationSummaryResponse;
  type automationsActivationLogsV1ActivationSummary_universal_d_GetActivationSummaryByPreinstalledOriginRequest = GetActivationSummaryByPreinstalledOriginRequest;
  type automationsActivationLogsV1ActivationSummary_universal_d_GetActivationSummaryByPreinstalledOriginResponse = GetActivationSummaryByPreinstalledOriginResponse;
  type automationsActivationLogsV1ActivationSummary_universal_d_MigrateActivationsCountRequest = MigrateActivationsCountRequest;
  type automationsActivationLogsV1ActivationSummary_universal_d_MigrateActivationsCountResponse = MigrateActivationsCountResponse;
  const automationsActivationLogsV1ActivationSummary_universal_d_getActivationSummary: typeof getActivationSummary;
  const automationsActivationLogsV1ActivationSummary_universal_d_getActivationSummaryByPreinstalledOrigin: typeof getActivationSummaryByPreinstalledOrigin;
  type automationsActivationLogsV1ActivationSummary_universal_d_GetActivationSummaryByPreinstalledOriginIdentifiers = GetActivationSummaryByPreinstalledOriginIdentifiers;
  const automationsActivationLogsV1ActivationSummary_universal_d_migrateActivationsCount: typeof migrateActivationsCount;
  type automationsActivationLogsV1ActivationSummary_universal_d_MigrateActivationsCountOptions = MigrateActivationsCountOptions;
  namespace automationsActivationLogsV1ActivationSummary_universal_d {
    export {
      automationsActivationLogsV1ActivationSummary_universal_d_ActivationSummary as ActivationSummary,
      automationsActivationLogsV1ActivationSummary_universal_d_PreinstalledOrigin as PreinstalledOrigin,
      automationsActivationLogsV1ActivationSummary_universal_d_GetActivationSummaryRequest as GetActivationSummaryRequest,
      automationsActivationLogsV1ActivationSummary_universal_d_GetActivationSummaryResponse as GetActivationSummaryResponse,
      automationsActivationLogsV1ActivationSummary_universal_d_GetActivationSummaryByPreinstalledOriginRequest as GetActivationSummaryByPreinstalledOriginRequest,
      automationsActivationLogsV1ActivationSummary_universal_d_GetActivationSummaryByPreinstalledOriginResponse as GetActivationSummaryByPreinstalledOriginResponse,
      automationsActivationLogsV1ActivationSummary_universal_d_MigrateActivationsCountRequest as MigrateActivationsCountRequest,
      automationsActivationLogsV1ActivationSummary_universal_d_MigrateActivationsCountResponse as MigrateActivationsCountResponse,
      automationsActivationLogsV1ActivationSummary_universal_d_getActivationSummary as getActivationSummary,
      automationsActivationLogsV1ActivationSummary_universal_d_getActivationSummaryByPreinstalledOrigin as getActivationSummaryByPreinstalledOrigin,
      automationsActivationLogsV1ActivationSummary_universal_d_GetActivationSummaryByPreinstalledOriginIdentifiers as GetActivationSummaryByPreinstalledOriginIdentifiers,
      automationsActivationLogsV1ActivationSummary_universal_d_migrateActivationsCount as migrateActivationsCount,
      automationsActivationLogsV1ActivationSummary_universal_d_MigrateActivationsCountOptions as MigrateActivationsCountOptions,
    };
  }
  
  export { automationsActivationLogsV1ActivationSummary_universal_d as activationActionSummary };
}
