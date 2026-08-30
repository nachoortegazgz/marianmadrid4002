declare module "wix-members.v1" {
  /** Default privacy status */
  interface DefaultPrivacy {
      /**
       * Privacy ID.
       * @readonly
       */
      _id?: string | null;
      /** Default privacy status in meta site. */
      defaultPrivacy?: Privacy;
      /** Revision number, used for checking the optimistic lock condition. */
      revision?: string | null;
  }
  enum Privacy {
      PRIVATE = "PRIVATE",
      PUBLIC = "PUBLIC"
  }
  interface GetDefaultPrivacyStatusRequest {
  }
  interface GetDefaultPrivacyStatusResponse {
      defaultPrivacy?: DefaultPrivacy;
  }
  interface SetDefaultPrivacyStatusRequest {
      defaultPrivacy: DefaultPrivacy;
  }
  interface SetDefaultPrivacyStatusResponse {
      defaultPrivacy?: DefaultPrivacy;
  }
  /**
   * Get metasite default privacy status
   * @public
   * @documentationMaturity preview
   */
  function getDefaultPrivacyStatus(): Promise<GetDefaultPrivacyStatusResponse>;
  /**
   * Set metasite default privacy status
   * @public
   * @documentationMaturity preview
   * @requiredField defaultPrivacy
   * @requiredField defaultPrivacy.revision
   * @adminMethod
   */
  function setDefaultPrivacyStatus(defaultPrivacy: DefaultPrivacy): Promise<SetDefaultPrivacyStatusResponse>;
  
  type membersV1DefaultPrivacy_universal_d_DefaultPrivacy = DefaultPrivacy;
  type membersV1DefaultPrivacy_universal_d_Privacy = Privacy;
  const membersV1DefaultPrivacy_universal_d_Privacy: typeof Privacy;
  type membersV1DefaultPrivacy_universal_d_GetDefaultPrivacyStatusRequest = GetDefaultPrivacyStatusRequest;
  type membersV1DefaultPrivacy_universal_d_GetDefaultPrivacyStatusResponse = GetDefaultPrivacyStatusResponse;
  type membersV1DefaultPrivacy_universal_d_SetDefaultPrivacyStatusRequest = SetDefaultPrivacyStatusRequest;
  type membersV1DefaultPrivacy_universal_d_SetDefaultPrivacyStatusResponse = SetDefaultPrivacyStatusResponse;
  const membersV1DefaultPrivacy_universal_d_getDefaultPrivacyStatus: typeof getDefaultPrivacyStatus;
  const membersV1DefaultPrivacy_universal_d_setDefaultPrivacyStatus: typeof setDefaultPrivacyStatus;
  namespace membersV1DefaultPrivacy_universal_d {
    export {
      membersV1DefaultPrivacy_universal_d_DefaultPrivacy as DefaultPrivacy,
      membersV1DefaultPrivacy_universal_d_Privacy as Privacy,
      membersV1DefaultPrivacy_universal_d_GetDefaultPrivacyStatusRequest as GetDefaultPrivacyStatusRequest,
      membersV1DefaultPrivacy_universal_d_GetDefaultPrivacyStatusResponse as GetDefaultPrivacyStatusResponse,
      membersV1DefaultPrivacy_universal_d_SetDefaultPrivacyStatusRequest as SetDefaultPrivacyStatusRequest,
      membersV1DefaultPrivacy_universal_d_SetDefaultPrivacyStatusResponse as SetDefaultPrivacyStatusResponse,
      membersV1DefaultPrivacy_universal_d_getDefaultPrivacyStatus as getDefaultPrivacyStatus,
      membersV1DefaultPrivacy_universal_d_setDefaultPrivacyStatus as setDefaultPrivacyStatus,
    };
  }
  
  export { membersV1DefaultPrivacy_universal_d as members };
}
