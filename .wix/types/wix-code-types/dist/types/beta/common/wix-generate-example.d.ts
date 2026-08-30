declare module "wix-generate-example" {
  interface Example {
      /** ID of the example created. */
      _id?: string;
      /** the output of gpt */
      example?: string;
      /** the method we generated the example for */
      action?: string;
  }
  interface GenerateExamplesForResourceRequest {
      /** the main entity to generate examples for */
      resource: string;
  }
  interface GenerateExamplesForResourceResponse {
      examples?: Example[];
  }
  interface GetStatusForResourceRequest {
      /** the resource to check status for */
      resource: string;
      /** the namespace in resource to check status for */
      namespace: string;
  }
  interface GetStatusForResourceResponse {
      methodsStatus?: MethodStatus[];
  }
  interface MethodStatus {
      package?: string;
      namespace?: string;
      method?: string;
      status?: Status;
  }
  enum Status {
      SUCCESS = "SUCCESS",
      FAIL = "FAIL",
      NA = "NA"
  }
  /** @param resource - the main entity to generate examples for
   * @internal
   * @documentationMaturity preview
   * @requiredField resource
   * @permissionId WIX_IGOR.CREATE_EXAMPLE
   * @adminMethod
   */
  function generateExamplesForResource(resource: string): Promise<GenerateExamplesForResourceResponse>;
  /** @internal
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.namespace
   * @requiredField identifiers.resource
   * @permissionId WIX_IGOR.GET_STATUS
   * @adminMethod
   */
  function getStatusForResource(identifiers: GetStatusForResourceIdentifiers): Promise<GetStatusForResourceResponse>;
  interface GetStatusForResourceIdentifiers {
      /** the resource to check status for */
      resource: string;
      /** the namespace in resource to check status for */
      namespace: string;
  }
  
  export { Example, GenerateExamplesForResourceRequest, GenerateExamplesForResourceResponse, GetStatusForResourceIdentifiers, GetStatusForResourceRequest, GetStatusForResourceResponse, MethodStatus, Status, generateExamplesForResource, getStatusForResource };
}
