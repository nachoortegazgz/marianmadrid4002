declare module "wix-automations-runner.v1" {
  interface MainEntity {
      _id?: string;
  }
  interface TriggerAutomationRequest {
      /** hookId is the id of the hook to trigger */
      hookId?: string;
      /** payload is the payload to send to the hook */
      payload?: Record<string, any> | null;
  }
  interface TriggerAutomationResponse {
  }
  /**
   * TriggerAutomation triggers an automation with webhook trigger by its hookId
   * @internal
   * @documentationMaturity preview
   * @permissionId AUTOMATIONS.TRIGGER_WEBHOOK
   * @adminMethod
   */
  function triggerAutomation(options?: TriggerAutomationOptions): Promise<void>;
  interface TriggerAutomationOptions {
      /** hookId is the id of the hook to trigger */
      hookId?: string;
      /** payload is the payload to send to the hook */
      payload?: Record<string, any> | null;
  }
  
  type automationsV1AutomationsVelo_universal_d_MainEntity = MainEntity;
  type automationsV1AutomationsVelo_universal_d_TriggerAutomationRequest = TriggerAutomationRequest;
  type automationsV1AutomationsVelo_universal_d_TriggerAutomationResponse = TriggerAutomationResponse;
  const automationsV1AutomationsVelo_universal_d_triggerAutomation: typeof triggerAutomation;
  type automationsV1AutomationsVelo_universal_d_TriggerAutomationOptions = TriggerAutomationOptions;
  namespace automationsV1AutomationsVelo_universal_d {
    export {
      automationsV1AutomationsVelo_universal_d_MainEntity as MainEntity,
      automationsV1AutomationsVelo_universal_d_TriggerAutomationRequest as TriggerAutomationRequest,
      automationsV1AutomationsVelo_universal_d_TriggerAutomationResponse as TriggerAutomationResponse,
      automationsV1AutomationsVelo_universal_d_triggerAutomation as triggerAutomation,
      automationsV1AutomationsVelo_universal_d_TriggerAutomationOptions as TriggerAutomationOptions,
    };
  }
  
  export { automationsV1AutomationsVelo_universal_d as automationsRunnerV1 };
}
