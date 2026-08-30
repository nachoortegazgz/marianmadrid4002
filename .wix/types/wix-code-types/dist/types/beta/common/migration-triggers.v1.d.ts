declare module "migration-triggers.v1" {
  interface MigrationTrigger {
      /** Trigger name in V1 */
      name?: string;
      /** Trigger name in V2, in most cases should be the same as v1_name */
      v2Name?: string;
      /** Application ID of the app that holds the V2 trigger component */
      v2AppId?: string;
      /**
       * If true then new automations should be created in V2 instead of V1
       * @readonly
       */
      openedInV2?: boolean;
      /**
       * Date of opening
       * @readonly
       */
      openedDate?: Date | null;
      /**
       * If true then automations that are both in V1 and V2 should be activated in V2 instead of V1. If false then such automations should be activated in V1.
       * @readonly
       */
      activatedInV2?: boolean;
      /**
       * Date of activation
       * @readonly
       */
      activatedDate?: Date | null;
      /**
       * If true then the sync mechanism that guarantees that automation is activated in v2 instead of V1 should be turned off.
       * @readonly
       */
      completed?: boolean;
      /**
       * Date of completion
       * @readonly
       */
      completedDate?: Date | null;
      /**
       * If true this trigger is not being migrated or has been replaced by another trigger
       * @readonly
       */
      deprecatedInV1?: boolean;
      /**
       * Date of deprecation in v1
       * @readonly
       */
      deprecatedInV1Date?: Date | null;
  }
  interface BulkCreateTriggersRequest {
      triggers?: MigrationTrigger[];
  }
  interface BulkCreateTriggersResponse {
  }
  interface BulkUpdateTriggersRequest {
      triggers?: MigrationTrigger[];
      onMissingCreate?: boolean;
  }
  interface BulkUpdateTriggersResponse {
  }
  interface ToggleTriggerOpenedRequest {
      name?: string;
      state?: boolean;
  }
  interface ToggleTriggerOpenedResponse {
      trigger?: MigrationTrigger;
  }
  interface ToggleTriggerActivatedRequest {
      name?: string;
      state?: boolean;
  }
  interface ToggleTriggerActivatedResponse {
      trigger?: MigrationTrigger;
  }
  interface ToggleTriggerCompletedRequest {
      name?: string;
      state?: boolean;
  }
  interface ToggleTriggerCompletedResponse {
      trigger?: MigrationTrigger;
  }
  interface ToggleTriggerDeprecatedInV1Request {
      name?: string;
      state?: boolean;
  }
  interface ToggleTriggerDeprecatedInV1Response {
      trigger?: MigrationTrigger;
  }
  interface GetTriggerRequest {
      name: string;
  }
  interface GetTriggerResponse {
      trigger?: MigrationTrigger;
  }
  interface DeleteTriggerRequest {
      name?: string;
  }
  interface DeleteTriggerResponse {
  }
  interface ListTriggersRequest {
  }
  interface ListTriggersResponse {
      triggers?: MigrationTrigger[];
  }
  /**
   * Get trigger
   * @public
   * @documentationMaturity preview
   * @requiredField name
   * @permissionId AUTOMATIONS.MIGRATION_TRIGGERS_READ
   * @adminMethod
   */
  function getTrigger(name: string): Promise<GetTriggerResponse>;
  /**
   * List all trigger
   * @public
   * @documentationMaturity preview
   * @permissionId AUTOMATIONS.MIGRATION_TRIGGERS_READ
   * @adminMethod
   */
  function listTriggers(): Promise<ListTriggersResponse>;
  
  type automationsMigrationV1MigrationTrigger_universal_d_MigrationTrigger = MigrationTrigger;
  type automationsMigrationV1MigrationTrigger_universal_d_BulkCreateTriggersRequest = BulkCreateTriggersRequest;
  type automationsMigrationV1MigrationTrigger_universal_d_BulkCreateTriggersResponse = BulkCreateTriggersResponse;
  type automationsMigrationV1MigrationTrigger_universal_d_BulkUpdateTriggersRequest = BulkUpdateTriggersRequest;
  type automationsMigrationV1MigrationTrigger_universal_d_BulkUpdateTriggersResponse = BulkUpdateTriggersResponse;
  type automationsMigrationV1MigrationTrigger_universal_d_ToggleTriggerOpenedRequest = ToggleTriggerOpenedRequest;
  type automationsMigrationV1MigrationTrigger_universal_d_ToggleTriggerOpenedResponse = ToggleTriggerOpenedResponse;
  type automationsMigrationV1MigrationTrigger_universal_d_ToggleTriggerActivatedRequest = ToggleTriggerActivatedRequest;
  type automationsMigrationV1MigrationTrigger_universal_d_ToggleTriggerActivatedResponse = ToggleTriggerActivatedResponse;
  type automationsMigrationV1MigrationTrigger_universal_d_ToggleTriggerCompletedRequest = ToggleTriggerCompletedRequest;
  type automationsMigrationV1MigrationTrigger_universal_d_ToggleTriggerCompletedResponse = ToggleTriggerCompletedResponse;
  type automationsMigrationV1MigrationTrigger_universal_d_ToggleTriggerDeprecatedInV1Request = ToggleTriggerDeprecatedInV1Request;
  type automationsMigrationV1MigrationTrigger_universal_d_ToggleTriggerDeprecatedInV1Response = ToggleTriggerDeprecatedInV1Response;
  type automationsMigrationV1MigrationTrigger_universal_d_GetTriggerRequest = GetTriggerRequest;
  type automationsMigrationV1MigrationTrigger_universal_d_GetTriggerResponse = GetTriggerResponse;
  type automationsMigrationV1MigrationTrigger_universal_d_DeleteTriggerRequest = DeleteTriggerRequest;
  type automationsMigrationV1MigrationTrigger_universal_d_DeleteTriggerResponse = DeleteTriggerResponse;
  type automationsMigrationV1MigrationTrigger_universal_d_ListTriggersRequest = ListTriggersRequest;
  type automationsMigrationV1MigrationTrigger_universal_d_ListTriggersResponse = ListTriggersResponse;
  const automationsMigrationV1MigrationTrigger_universal_d_getTrigger: typeof getTrigger;
  const automationsMigrationV1MigrationTrigger_universal_d_listTriggers: typeof listTriggers;
  namespace automationsMigrationV1MigrationTrigger_universal_d {
    export {
      automationsMigrationV1MigrationTrigger_universal_d_MigrationTrigger as MigrationTrigger,
      automationsMigrationV1MigrationTrigger_universal_d_BulkCreateTriggersRequest as BulkCreateTriggersRequest,
      automationsMigrationV1MigrationTrigger_universal_d_BulkCreateTriggersResponse as BulkCreateTriggersResponse,
      automationsMigrationV1MigrationTrigger_universal_d_BulkUpdateTriggersRequest as BulkUpdateTriggersRequest,
      automationsMigrationV1MigrationTrigger_universal_d_BulkUpdateTriggersResponse as BulkUpdateTriggersResponse,
      automationsMigrationV1MigrationTrigger_universal_d_ToggleTriggerOpenedRequest as ToggleTriggerOpenedRequest,
      automationsMigrationV1MigrationTrigger_universal_d_ToggleTriggerOpenedResponse as ToggleTriggerOpenedResponse,
      automationsMigrationV1MigrationTrigger_universal_d_ToggleTriggerActivatedRequest as ToggleTriggerActivatedRequest,
      automationsMigrationV1MigrationTrigger_universal_d_ToggleTriggerActivatedResponse as ToggleTriggerActivatedResponse,
      automationsMigrationV1MigrationTrigger_universal_d_ToggleTriggerCompletedRequest as ToggleTriggerCompletedRequest,
      automationsMigrationV1MigrationTrigger_universal_d_ToggleTriggerCompletedResponse as ToggleTriggerCompletedResponse,
      automationsMigrationV1MigrationTrigger_universal_d_ToggleTriggerDeprecatedInV1Request as ToggleTriggerDeprecatedInV1Request,
      automationsMigrationV1MigrationTrigger_universal_d_ToggleTriggerDeprecatedInV1Response as ToggleTriggerDeprecatedInV1Response,
      automationsMigrationV1MigrationTrigger_universal_d_GetTriggerRequest as GetTriggerRequest,
      automationsMigrationV1MigrationTrigger_universal_d_GetTriggerResponse as GetTriggerResponse,
      automationsMigrationV1MigrationTrigger_universal_d_DeleteTriggerRequest as DeleteTriggerRequest,
      automationsMigrationV1MigrationTrigger_universal_d_DeleteTriggerResponse as DeleteTriggerResponse,
      automationsMigrationV1MigrationTrigger_universal_d_ListTriggersRequest as ListTriggersRequest,
      automationsMigrationV1MigrationTrigger_universal_d_ListTriggersResponse as ListTriggersResponse,
      automationsMigrationV1MigrationTrigger_universal_d_getTrigger as getTrigger,
      automationsMigrationV1MigrationTrigger_universal_d_listTriggers as listTriggers,
    };
  }
  
  export { automationsMigrationV1MigrationTrigger_universal_d as migrationTriggers };
}
