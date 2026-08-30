declare module "wix-automations" {
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
   * @permissionId AUTOMATIONS.AUTOMATION_READ
   * @adminMethod
   */
  function triggerAutomation(options?: TriggerAutomationOptions): Promise<void>;
  interface TriggerAutomationOptions {
      /** hookId is the id of the hook to trigger */
      hookId?: string;
      /** payload is the payload to send to the hook */
      payload?: Record<string, any> | null;
  }
  
  export { MainEntity, TriggerAutomationOptions, TriggerAutomationRequest, TriggerAutomationResponse, triggerAutomation };
}
