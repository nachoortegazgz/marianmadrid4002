declare module "wix-user-management-backend" {
  interface AccountV2 {
      /** Account ID. */
      accountId?: string;
  }
  interface GetUserAccountRequest {
      /** the user id that his account we query */
      userId: string;
  }
  interface Account {
      /** Account ID. */
      accountId?: string;
      /** Account slug - used in the free URL prefix */
      slug?: string;
      /** Account name (display) */
      accountName?: string | null;
      /**
       * DEPRECATED field of account image
       * @deprecated
       */
      accountImg?: string | null;
      /** account status */
      status?: AccountStatus;
      /** account owner user id */
      accountOwner?: string;
      /** account extra properties */
      accountProperties?: AccountProperties;
      /** the account creation date */
      dateCreated?: Date | null;
      /** last time account was updated */
      dateUpdated?: Date | null;
  }
  /** enum with all available statuses of account */
  enum AccountStatus {
      ACTIVE = "ACTIVE",
      BLOCKED = "BLOCKED",
      DELETED = "DELETED"
  }
  /** All relevant account properties */
  interface AccountProperties {
      /** Whether this account is a team account. */
      isTeam?: boolean;
      /**
       * Account image (display)
       * relevant mainly for CoBranded accounts
       */
      accountImg?: string | null;
      /**
       * the account banner (display)
       * relevant mainly for CoBranded accounts
       */
      accountBanner?: string | null;
      /**
       * the account logo (display)
       * wll be shown as the account logo in the UI (top right corner, contributor list etc..)
       */
      accountLogo?: string | null;
      /**
       * account co branding flag (if exists)
       * an enum for CoBranding flag contains 4 possible options:
       * None - the account is not CoBranded
       * CoBranded - the account has a CoBranding flag
       * CoBranded_Customer_New - the account is a contributor of a CoBranded account. This account was created because of the contributor invite
       * CoBranded_Customer_Existing - the account is a contributor of a CoBranded account. This account was created before the invite of the contributor invite
       */
      coBranding?: CoBranding;
      /** account's website URL (shown on co branding customers sites) */
      websiteUrl?: string | null;
      /** the id of the parent account of this account, if it has a parent */
      parentAccountId?: string | null;
  }
  /** co branding flag options for account */
  enum CoBranding {
      None = "None",
      CoBranded = "CoBranded",
      CoBranded_Customer_New = "CoBranded_Customer_New",
      CoBranded_Customer_Existing = "CoBranded_Customer_Existing"
  }
  interface GetUserAccountsRequest {
      /** the user id that his accounts we query */
      userId: string;
      /** Limited to max 20 at a single request */
      paging?: Paging$2;
  }
  interface Paging$2 {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface AccountsResponse {
      accounts?: Account[];
  }
  interface GetMyUserAccountsRequest {
      /** Limited to max 20 at a single request */
      paging?: Paging$2;
  }
  interface GetAccountRequest {
      /** the account id that it's data should be retrieved */
      accountId: string;
  }
  interface AccountResponse {
      account?: Account;
  }
  interface GetMyAccountRequest {
  }
  interface GetAccountsRequest {
      /** the account id to retrieve */
      accountIds?: string[];
  }
  interface CreateAccountRequest {
      /** The user to create under the new account, with the roles defined in `roles`. */
      user: User$2;
      /**
       * Roles to be assigned to the user in the new account. To retrieve all available roles, call Get Roles Info in the Users API.
       * Default: OWNER.
       */
      roles?: string[] | null;
  }
  /** A User to be created under an implicitly provided accountId: must have a unique email. */
  interface User$2 {
      /** User's unique email address details. Required. */
      email?: Email;
      /** User's single sign on identity, when the user is identified via SSO authentication response token params, as specified by [OpenID Connect](https://openid.net/developers/how-connect-works/) (aka. OIDC) protocol. */
      ssoIdentities?: SsoIdentity[];
      /** Additional user details. */
      userDetails?: UserDetails;
  }
  /** User's email address. */
  interface Email {
      /** User's email address. */
      emailAddress?: string;
      /** Whether the caller has verified the user's email address. */
      isVerified?: boolean;
  }
  /** Single Sign On (aka. SSO) identity; user is identified via SSO authentication response token params, as specified by OpenID Connect (aka. OIDC) protocol */
  interface SsoIdentity {
      /** An SSO setting (URLs, clientId, secret, etc. as required by OIDC protocol) for a specific Identity-Provider (aka. IdP) for a specific Wix account. */
      ssoId?: string;
      /**
       * User ID as stored in IdP. For example a "sub" claim of OIDC protocol,
       * or any other alternative, specified by IdP (Identity Provider).
       */
      userId?: string;
  }
  /** additional user details */
  interface UserDetails {
      /** User's first name. */
      firstName?: string | null;
      /** User's last name. */
      lastName?: string | null;
      /** URL to location of user's profile picture. */
      profilePictureUrl?: string | null;
      /** User's preferred language in [ISO 639-1:2002](https://en.wikipedia.org/wiki/ISO_639-1) format. For example, "en", "es". */
      language?: string | null;
      /**
       * Original Client IP from which a request was made.
       * This is useful in case where a createUser API is called by some server call, which, in turn, has been called by some client from another IP.
       * Wix checks this IP against the [OFAC sanctioned countries](https://ofac.treasury.gov/sanctions-programs-and-country-information).
       */
      clientIp?: string | null;
  }
  interface CreateAccountResponse {
      /** The created account. */
      account?: AccountV2;
  }
  interface CreateAccountForMyUserRequest {
      /** the account name */
      accountName?: string | null;
      /** account image url */
      accountImg?: string | null;
      /** whether to mark the account as `studio` */
      studio?: boolean;
  }
  interface CreateAccountTenantRequest {
      slug?: string | null;
  }
  interface CreateAccountTenantResponse {
      account?: AccountV2;
  }
  interface CreateAccountAndAssignUserRequest {
      /** the user id for which we are creating the account */
      userId: string;
      /** the user name of the user for which the account is created */
      userName: string;
      /** the parent account of the created account */
      parentAccountId?: string | null;
      /** whether to mark the account as `studio` */
      studio?: boolean;
  }
  interface UpdateAccountRequest {
      /** the account id to update */
      accountId: string;
      /**
       * DEPRECATED field of image
       * @deprecated
       */
      accountImg?: string | null;
      /** optional - new account name */
      accountName?: string | null;
      /**
       * the new properties for the account.
       * can be passed partially - and only relevant fields will be updated
       */
      accountProperties?: AccountProperties;
  }
  interface UpdateParentAccountRequest extends UpdateParentAccountRequestUpdateOneOf {
      /** Removes the parent account */
      remove?: RemoveParent;
  }
  /** @oneof */
  interface UpdateParentAccountRequestUpdateOneOf {
      /** Removes the parent account */
      remove?: RemoveParent;
  }
  interface RemoveParent {
  }
  interface UpdateParentAccountResponse {
      newParentAccountId?: string | null;
  }
  interface DeleteAccountRequest {
      /** the account id to delete */
      accountId: string;
      /** will throw exception if trying to delete the account of the last user when the value is true */
      shouldNotDeleteLastAccount?: boolean;
  }
  interface EmptyResponse {
  }
  interface UpdateSlugRequest {
      /** account id */
      accountId: string;
      /** new slug */
      newSlugName: string;
  }
  interface IsTeamRequest {
      /** the account id to check if it's a team account */
      accountId: string;
  }
  interface IsTeamResponse {
      /** true if the account is marked as a team account, false if not */
      isTeamAccount?: boolean;
  }
  interface MarkAccountFlagRequest extends MarkAccountFlagRequestFlagOneOf {
      /**
       * account co branding flag (if exists)
       * an enum for CoBranding flag contains 4 possible options:
       * None - the account is not CoBranded
       * CoBranded - the account has a CoBranding flag
       * CoBranded_Customer_New - the account is a contributor of a CoBranded account. This account was created because of the contributor invite
       * CoBranded_Customer_Existing - the account is a contributor of a CoBranded account. This account was created before the invite of the contributor invite
       */
      coBranding?: CoBranding;
      /** the account id to mark */
      accountId: string;
      /** the inviting account id in case the flag is given by an invite */
      invitedByAccountId?: string | null;
  }
  /** @oneof */
  interface MarkAccountFlagRequestFlagOneOf {
      /**
       * account co branding flag (if exists)
       * an enum for CoBranding flag contains 4 possible options:
       * None - the account is not CoBranded
       * CoBranded - the account has a CoBranding flag
       * CoBranded_Customer_New - the account is a contributor of a CoBranded account. This account was created because of the contributor invite
       * CoBranded_Customer_Existing - the account is a contributor of a CoBranded account. This account was created before the invite of the contributor invite
       */
      coBranding?: CoBranding;
  }
  interface GetParentAccountInfoRequest {
  }
  interface GetParentAccountInfoResponse {
      /** The info of the parent account, if the account has a parent */
      parentAccountInfo?: AccountInfo$2;
  }
  interface AccountInfo$2 {
      /** The name of the account */
      name?: string | null;
      /** The url of the image of the account */
      image?: string | null;
  }
  interface GetSubAccountsRequest {
      /** Offset-based pagination for the response. Default page size is 20, max page size is 50 */
      paging?: Paging$2;
  }
  interface GetSubAccountsResponse {
      /** The sub accounts of the target account */
      subAccounts?: SubAccountInfo[];
      /** Metadata of the response pagination */
      pagingMetadata?: PagingMetadata;
  }
  interface SubAccountInfo {
      /** The id of the sub account */
      accountId?: string;
  }
  interface PagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. */
      total?: number | null;
      /** Flag that indicates the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface ListChildAccountsRequest {
      /**
       * Paging options to limit and offset the number of items.
       * Default: 20. Max: 50.
       */
      paging?: Paging$2;
  }
  interface ListChildAccountsResponse {
      /** The requested child accounts. */
      childAccounts?: AccountV2[];
      /** Metadata of the response pagination. */
      pagingMetadata?: PagingMetadata;
  }
  interface SetIsReadOnlyAccountRequest {
      accountId: string;
      isReadOnly: boolean;
  }
  /**
   * Get account data by user id
   * @param userId - the user id that his account we query
   * @internal
   * @documentationMaturity preview
   * @requiredField userId
   * @permissionId Account.GetUserAccountProperties
   * @adminMethod
   */
  function getUserAccount(userId: string): Promise<Account>;
  /**
   * Get accounts data by user id
   * @param userId - the user id that his accounts we query
   * @internal
   * @documentationMaturity preview
   * @requiredField userId
   * @permissionId Account.GetUserAccountProperties
   * @adminMethod
   */
  function getUserAccounts(userId: string, options?: GetUserAccountsOptions): Promise<AccountsResponse>;
  interface GetUserAccountsOptions {
      /** Limited to max 20 at a single request */
      paging?: Paging$2;
  }
  /**
   * Get accounts data by current user
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function getMyUserAccounts(options?: GetMyUserAccountsOptions): Promise<AccountsResponse>;
  interface GetMyUserAccountsOptions {
      /** Limited to max 20 at a single request */
      paging?: Paging$2;
  }
  /** @param accountId - the account id that it's data should be retrieved
   * @internal
   * @documentationMaturity preview
   * @requiredField accountId
   * @permissionId Account.GetAccountProperties
   * @adminMethod
   */
  function getAccount(accountId: string): Promise<AccountResponse>;
  /**
   * Get logged-in user account
   * @internal
   * @documentationMaturity preview
   * @permissionId Account.GetAccountProperties
   * @adminMethod
   */
  function getMyAccount(): Promise<AccountResponse>;
  /** @internal
   * @documentationMaturity preview
   * @permissionId Account.GetBulk
   * @adminMethod
   */
  function getAccounts(options?: GetAccountsOptions): Promise<AccountsResponse>;
  interface GetAccountsOptions {
      /** the account id to retrieve */
      accountIds?: string[];
  }
  /**
   * Creates a new Wix account, and creates a new Wix user as the account owner.
   * The newly created account is a child account of the account used to create it, making that account its parent.
   *
   * > **Important**: This call requires an account level API key and cannot be authenticated with the standard authorization header. API keys are currently available to selected beta users only.
   * @param user - The user to create under the new account, with the roles defined in `roles`.
   * @public
   * @documentationMaturity preview
   * @requiredField user
   * @param options - Filter options.
   * @permissionId ACCOUNT.CREATE_ACCOUNT
   * @adminMethod
   */
  function createAccount(user: User$2, options?: CreateAccountOptions): Promise<CreateAccountResponse>;
  interface CreateAccountOptions {
      /**
       * Roles to be assigned to the user in the new account. To retrieve all available roles, call Get Roles Info in the Users API.
       * Default: OWNER.
       */
      roles?: string[] | null;
  }
  /**
   * creates account for the logged in user
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function createAccountForMyUser(options?: CreateAccountForMyUserOptions): Promise<AccountResponse>;
  interface CreateAccountForMyUserOptions {
      /** the account name */
      accountName?: string | null;
      /** account image url */
      accountImg?: string | null;
      /** whether to mark the account as `studio` */
      studio?: boolean;
  }
  /** @internal
   * @documentationMaturity preview
   * @permissionId ACCOUNT.CREATE_ACCOUNT_TENANT
   * @adminMethod
   */
  function createAccountTenant(options?: CreateAccountTenantOptions): Promise<CreateAccountTenantResponse>;
  interface CreateAccountTenantOptions {
      slug?: string | null;
  }
  /**
   * Creates a new Wix account and assign Wix user under this account, as the account owner.
   * If parentAccountId exists, the account will be created as a sub account of the parent account.
   * Otherwise, the account will be created without a parent account.
   * @param userId - the user id for which we are creating the account
   * @param userName - the user name of the user for which the account is created
   * @internal
   * @documentationMaturity preview
   * @requiredField userId
   * @requiredField userName
   * @permissionId ACCOUNT.CREATE_ACCOUNT_AND_ASSIGN_USER
   * @adminMethod
   */
  function createAccountAndAssignUser(userId: string, userName: string, options?: CreateAccountAndAssignUserOptions): Promise<AccountResponse>;
  interface CreateAccountAndAssignUserOptions {
      /** the parent account of the created account */
      parentAccountId?: string | null;
      /** whether to mark the account as `studio` */
      studio?: boolean;
  }
  /** @param accountId - the account id to update
   * @internal
   * @documentationMaturity preview
   * @requiredField accountId
   * @adminMethod
   */
  function updateAccount(accountId: string, options?: UpdateAccountOptions): Promise<AccountResponse>;
  interface UpdateAccountOptions {
      /**
       * DEPRECATED field of image
       * @deprecated
       */
      accountImg?: string | null;
      /** optional - new account name */
      accountName?: string | null;
      /**
       * the new properties for the account.
       * can be passed partially - and only relevant fields will be updated
       */
      accountProperties?: AccountProperties;
  }
  /**
   * Updates the parent account of the account that is passed in the target account header.
   * The permission required for removing a parent account: "ACCOUNT.REMOVE_PARENT_ACCOUNT"
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function updateParentAccount(options?: UpdateParentAccountOptions): Promise<UpdateParentAccountResponse>;
  interface UpdateParentAccountOptions extends UpdateParentAccountRequestUpdateOneOf {
      /** Removes the parent account */
      remove?: RemoveParent;
  }
  /** @param accountId - the account id to delete
   * @internal
   * @documentationMaturity preview
   * @requiredField accountId
   * @permissionId Account.DeleteAccount
   * @adminMethod
   */
  function deleteAccount(accountId: string, options?: DeleteAccountOptions): Promise<void>;
  interface DeleteAccountOptions {
      /** will throw exception if trying to delete the account of the last user when the value is true */
      shouldNotDeleteLastAccount?: boolean;
  }
  /** @param accountId - account id
   * @param newSlugName - new slug
   * @internal
   * @documentationMaturity preview
   * @requiredField accountId
   * @requiredField newSlugName
   * @permissionId Account.UpdateSlugName
   * @adminMethod
   */
  function updateSlugName(accountId: string, newSlugName: string): Promise<void>;
  /**
   * Returns whether the account is a team account.
   * @param accountId - the account id to check if it's a team account
   * @internal
   * @documentationMaturity preview
   * @requiredField accountId
   * @permissionId Account.CheckTeamStatus
   * @adminMethod
   */
  function isTeam(accountId: string): Promise<IsTeamResponse>;
  /**
   * Marking an account flag explicitly. Returns the new account data
   * @param accountId - the account id to mark
   * @internal
   * @documentationMaturity preview
   * @requiredField accountId
   * @permissionId Account.MarkAccountFlag
   * @adminMethod
   */
  function markAccountFlag(accountId: string, options?: MarkAccountFlagOptions): Promise<AccountResponse>;
  interface MarkAccountFlagOptions extends MarkAccountFlagRequestFlagOneOf {
      /**
       * account co branding flag (if exists)
       * an enum for CoBranding flag contains 4 possible options:
       * None - the account is not CoBranded
       * CoBranded - the account has a CoBranding flag
       * CoBranded_Customer_New - the account is a contributor of a CoBranded account. This account was created because of the contributor invite
       * CoBranded_Customer_Existing - the account is a contributor of a CoBranded account. This account was created before the invite of the contributor invite
       */
      coBranding?: CoBranding;
      /** the inviting account id in case the flag is given by an invite */
      invitedByAccountId?: string | null;
  }
  /**
   * Gets information about the parent account of the target account (taken from the context targetAccountId field).
   * If the target account has no parent, no information will be returned.
   * @internal
   * @documentationMaturity preview
   * @permissionId ACCOUNT.GET_PARENT_ACCOUNT_INFO
   * @adminMethod
   */
  function getParentAccountInfo(): Promise<GetParentAccountInfoResponse>;
  /**
   * Gets the sub accounts of the target account (taken from the context targetAccountId field).
   * If the target account has no sub accounts, an empty list will be returned.
   * @internal
   * @documentationMaturity preview
   * @permissionId ACCOUNT.GET_SUB_ACCOUNTS
   * @adminMethod
   */
  function getSubAccounts(options?: GetSubAccountsOptions): Promise<GetSubAccountsResponse>;
  interface GetSubAccountsOptions {
      /** Offset-based pagination for the response. Default page size is 20, max page size is 50 */
      paging?: Paging$2;
  }
  /**
   * Retrieves a list of child account IDs for the requesting account.
   * If no child accounts exist, an empty list will be returned.
   *
   * > **Important**: This call requires an account level API key and cannot be authenticated with the standard authorization header. API keys are currently available to selected beta users only.
   * @public
   * @documentationMaturity preview
   * @param options - Filter options.
   * @permissionId ACCOUNT.CHILD_ACCOUNTS_LIST
   * @adminMethod
   */
  function listChildAccounts(options?: ListChildAccountsOptions): Promise<ListChildAccountsResponse>;
  interface ListChildAccountsOptions {
      /**
       * Paging options to limit and offset the number of items.
       * Default: 20. Max: 50.
       */
      paging?: Paging$2;
  }
  /**
   * set the account's is_read_only flag
   * @internal
   * @documentationMaturity preview
   * @requiredField accountId
   * @requiredField isReadOnly
   * @permissionId ACCOUNT.SET_IS_READ_ONLY
   * @adminMethod
   */
  function setIsReadOnlyAccount(accountId: string, isReadOnly: boolean): Promise<void>;
  
  type identityAccountV2Account_universal_d_AccountV2 = AccountV2;
  type identityAccountV2Account_universal_d_GetUserAccountRequest = GetUserAccountRequest;
  type identityAccountV2Account_universal_d_Account = Account;
  type identityAccountV2Account_universal_d_AccountStatus = AccountStatus;
  const identityAccountV2Account_universal_d_AccountStatus: typeof AccountStatus;
  type identityAccountV2Account_universal_d_AccountProperties = AccountProperties;
  type identityAccountV2Account_universal_d_CoBranding = CoBranding;
  const identityAccountV2Account_universal_d_CoBranding: typeof CoBranding;
  type identityAccountV2Account_universal_d_GetUserAccountsRequest = GetUserAccountsRequest;
  type identityAccountV2Account_universal_d_AccountsResponse = AccountsResponse;
  type identityAccountV2Account_universal_d_GetMyUserAccountsRequest = GetMyUserAccountsRequest;
  type identityAccountV2Account_universal_d_GetAccountRequest = GetAccountRequest;
  type identityAccountV2Account_universal_d_AccountResponse = AccountResponse;
  type identityAccountV2Account_universal_d_GetMyAccountRequest = GetMyAccountRequest;
  type identityAccountV2Account_universal_d_GetAccountsRequest = GetAccountsRequest;
  type identityAccountV2Account_universal_d_CreateAccountRequest = CreateAccountRequest;
  type identityAccountV2Account_universal_d_Email = Email;
  type identityAccountV2Account_universal_d_SsoIdentity = SsoIdentity;
  type identityAccountV2Account_universal_d_UserDetails = UserDetails;
  type identityAccountV2Account_universal_d_CreateAccountResponse = CreateAccountResponse;
  type identityAccountV2Account_universal_d_CreateAccountForMyUserRequest = CreateAccountForMyUserRequest;
  type identityAccountV2Account_universal_d_CreateAccountTenantRequest = CreateAccountTenantRequest;
  type identityAccountV2Account_universal_d_CreateAccountTenantResponse = CreateAccountTenantResponse;
  type identityAccountV2Account_universal_d_CreateAccountAndAssignUserRequest = CreateAccountAndAssignUserRequest;
  type identityAccountV2Account_universal_d_UpdateAccountRequest = UpdateAccountRequest;
  type identityAccountV2Account_universal_d_UpdateParentAccountRequest = UpdateParentAccountRequest;
  type identityAccountV2Account_universal_d_UpdateParentAccountRequestUpdateOneOf = UpdateParentAccountRequestUpdateOneOf;
  type identityAccountV2Account_universal_d_RemoveParent = RemoveParent;
  type identityAccountV2Account_universal_d_UpdateParentAccountResponse = UpdateParentAccountResponse;
  type identityAccountV2Account_universal_d_DeleteAccountRequest = DeleteAccountRequest;
  type identityAccountV2Account_universal_d_EmptyResponse = EmptyResponse;
  type identityAccountV2Account_universal_d_UpdateSlugRequest = UpdateSlugRequest;
  type identityAccountV2Account_universal_d_IsTeamRequest = IsTeamRequest;
  type identityAccountV2Account_universal_d_IsTeamResponse = IsTeamResponse;
  type identityAccountV2Account_universal_d_MarkAccountFlagRequest = MarkAccountFlagRequest;
  type identityAccountV2Account_universal_d_MarkAccountFlagRequestFlagOneOf = MarkAccountFlagRequestFlagOneOf;
  type identityAccountV2Account_universal_d_GetParentAccountInfoRequest = GetParentAccountInfoRequest;
  type identityAccountV2Account_universal_d_GetParentAccountInfoResponse = GetParentAccountInfoResponse;
  type identityAccountV2Account_universal_d_GetSubAccountsRequest = GetSubAccountsRequest;
  type identityAccountV2Account_universal_d_GetSubAccountsResponse = GetSubAccountsResponse;
  type identityAccountV2Account_universal_d_SubAccountInfo = SubAccountInfo;
  type identityAccountV2Account_universal_d_PagingMetadata = PagingMetadata;
  type identityAccountV2Account_universal_d_ListChildAccountsRequest = ListChildAccountsRequest;
  type identityAccountV2Account_universal_d_ListChildAccountsResponse = ListChildAccountsResponse;
  type identityAccountV2Account_universal_d_SetIsReadOnlyAccountRequest = SetIsReadOnlyAccountRequest;
  const identityAccountV2Account_universal_d_getUserAccount: typeof getUserAccount;
  const identityAccountV2Account_universal_d_getUserAccounts: typeof getUserAccounts;
  type identityAccountV2Account_universal_d_GetUserAccountsOptions = GetUserAccountsOptions;
  const identityAccountV2Account_universal_d_getMyUserAccounts: typeof getMyUserAccounts;
  type identityAccountV2Account_universal_d_GetMyUserAccountsOptions = GetMyUserAccountsOptions;
  const identityAccountV2Account_universal_d_getAccount: typeof getAccount;
  const identityAccountV2Account_universal_d_getMyAccount: typeof getMyAccount;
  const identityAccountV2Account_universal_d_getAccounts: typeof getAccounts;
  type identityAccountV2Account_universal_d_GetAccountsOptions = GetAccountsOptions;
  const identityAccountV2Account_universal_d_createAccount: typeof createAccount;
  type identityAccountV2Account_universal_d_CreateAccountOptions = CreateAccountOptions;
  const identityAccountV2Account_universal_d_createAccountForMyUser: typeof createAccountForMyUser;
  type identityAccountV2Account_universal_d_CreateAccountForMyUserOptions = CreateAccountForMyUserOptions;
  const identityAccountV2Account_universal_d_createAccountTenant: typeof createAccountTenant;
  type identityAccountV2Account_universal_d_CreateAccountTenantOptions = CreateAccountTenantOptions;
  const identityAccountV2Account_universal_d_createAccountAndAssignUser: typeof createAccountAndAssignUser;
  type identityAccountV2Account_universal_d_CreateAccountAndAssignUserOptions = CreateAccountAndAssignUserOptions;
  const identityAccountV2Account_universal_d_updateAccount: typeof updateAccount;
  type identityAccountV2Account_universal_d_UpdateAccountOptions = UpdateAccountOptions;
  const identityAccountV2Account_universal_d_updateParentAccount: typeof updateParentAccount;
  type identityAccountV2Account_universal_d_UpdateParentAccountOptions = UpdateParentAccountOptions;
  const identityAccountV2Account_universal_d_deleteAccount: typeof deleteAccount;
  type identityAccountV2Account_universal_d_DeleteAccountOptions = DeleteAccountOptions;
  const identityAccountV2Account_universal_d_updateSlugName: typeof updateSlugName;
  const identityAccountV2Account_universal_d_isTeam: typeof isTeam;
  const identityAccountV2Account_universal_d_markAccountFlag: typeof markAccountFlag;
  type identityAccountV2Account_universal_d_MarkAccountFlagOptions = MarkAccountFlagOptions;
  const identityAccountV2Account_universal_d_getParentAccountInfo: typeof getParentAccountInfo;
  const identityAccountV2Account_universal_d_getSubAccounts: typeof getSubAccounts;
  type identityAccountV2Account_universal_d_GetSubAccountsOptions = GetSubAccountsOptions;
  const identityAccountV2Account_universal_d_listChildAccounts: typeof listChildAccounts;
  type identityAccountV2Account_universal_d_ListChildAccountsOptions = ListChildAccountsOptions;
  const identityAccountV2Account_universal_d_setIsReadOnlyAccount: typeof setIsReadOnlyAccount;
  namespace identityAccountV2Account_universal_d {
    export {
      identityAccountV2Account_universal_d_AccountV2 as AccountV2,
      identityAccountV2Account_universal_d_GetUserAccountRequest as GetUserAccountRequest,
      identityAccountV2Account_universal_d_Account as Account,
      identityAccountV2Account_universal_d_AccountStatus as AccountStatus,
      identityAccountV2Account_universal_d_AccountProperties as AccountProperties,
      identityAccountV2Account_universal_d_CoBranding as CoBranding,
      identityAccountV2Account_universal_d_GetUserAccountsRequest as GetUserAccountsRequest,
      Paging$2 as Paging,
      identityAccountV2Account_universal_d_AccountsResponse as AccountsResponse,
      identityAccountV2Account_universal_d_GetMyUserAccountsRequest as GetMyUserAccountsRequest,
      identityAccountV2Account_universal_d_GetAccountRequest as GetAccountRequest,
      identityAccountV2Account_universal_d_AccountResponse as AccountResponse,
      identityAccountV2Account_universal_d_GetMyAccountRequest as GetMyAccountRequest,
      identityAccountV2Account_universal_d_GetAccountsRequest as GetAccountsRequest,
      identityAccountV2Account_universal_d_CreateAccountRequest as CreateAccountRequest,
      User$2 as User,
      identityAccountV2Account_universal_d_Email as Email,
      identityAccountV2Account_universal_d_SsoIdentity as SsoIdentity,
      identityAccountV2Account_universal_d_UserDetails as UserDetails,
      identityAccountV2Account_universal_d_CreateAccountResponse as CreateAccountResponse,
      identityAccountV2Account_universal_d_CreateAccountForMyUserRequest as CreateAccountForMyUserRequest,
      identityAccountV2Account_universal_d_CreateAccountTenantRequest as CreateAccountTenantRequest,
      identityAccountV2Account_universal_d_CreateAccountTenantResponse as CreateAccountTenantResponse,
      identityAccountV2Account_universal_d_CreateAccountAndAssignUserRequest as CreateAccountAndAssignUserRequest,
      identityAccountV2Account_universal_d_UpdateAccountRequest as UpdateAccountRequest,
      identityAccountV2Account_universal_d_UpdateParentAccountRequest as UpdateParentAccountRequest,
      identityAccountV2Account_universal_d_UpdateParentAccountRequestUpdateOneOf as UpdateParentAccountRequestUpdateOneOf,
      identityAccountV2Account_universal_d_RemoveParent as RemoveParent,
      identityAccountV2Account_universal_d_UpdateParentAccountResponse as UpdateParentAccountResponse,
      identityAccountV2Account_universal_d_DeleteAccountRequest as DeleteAccountRequest,
      identityAccountV2Account_universal_d_EmptyResponse as EmptyResponse,
      identityAccountV2Account_universal_d_UpdateSlugRequest as UpdateSlugRequest,
      identityAccountV2Account_universal_d_IsTeamRequest as IsTeamRequest,
      identityAccountV2Account_universal_d_IsTeamResponse as IsTeamResponse,
      identityAccountV2Account_universal_d_MarkAccountFlagRequest as MarkAccountFlagRequest,
      identityAccountV2Account_universal_d_MarkAccountFlagRequestFlagOneOf as MarkAccountFlagRequestFlagOneOf,
      identityAccountV2Account_universal_d_GetParentAccountInfoRequest as GetParentAccountInfoRequest,
      identityAccountV2Account_universal_d_GetParentAccountInfoResponse as GetParentAccountInfoResponse,
      AccountInfo$2 as AccountInfo,
      identityAccountV2Account_universal_d_GetSubAccountsRequest as GetSubAccountsRequest,
      identityAccountV2Account_universal_d_GetSubAccountsResponse as GetSubAccountsResponse,
      identityAccountV2Account_universal_d_SubAccountInfo as SubAccountInfo,
      identityAccountV2Account_universal_d_PagingMetadata as PagingMetadata,
      identityAccountV2Account_universal_d_ListChildAccountsRequest as ListChildAccountsRequest,
      identityAccountV2Account_universal_d_ListChildAccountsResponse as ListChildAccountsResponse,
      identityAccountV2Account_universal_d_SetIsReadOnlyAccountRequest as SetIsReadOnlyAccountRequest,
      identityAccountV2Account_universal_d_getUserAccount as getUserAccount,
      identityAccountV2Account_universal_d_getUserAccounts as getUserAccounts,
      identityAccountV2Account_universal_d_GetUserAccountsOptions as GetUserAccountsOptions,
      identityAccountV2Account_universal_d_getMyUserAccounts as getMyUserAccounts,
      identityAccountV2Account_universal_d_GetMyUserAccountsOptions as GetMyUserAccountsOptions,
      identityAccountV2Account_universal_d_getAccount as getAccount,
      identityAccountV2Account_universal_d_getMyAccount as getMyAccount,
      identityAccountV2Account_universal_d_getAccounts as getAccounts,
      identityAccountV2Account_universal_d_GetAccountsOptions as GetAccountsOptions,
      identityAccountV2Account_universal_d_createAccount as createAccount,
      identityAccountV2Account_universal_d_CreateAccountOptions as CreateAccountOptions,
      identityAccountV2Account_universal_d_createAccountForMyUser as createAccountForMyUser,
      identityAccountV2Account_universal_d_CreateAccountForMyUserOptions as CreateAccountForMyUserOptions,
      identityAccountV2Account_universal_d_createAccountTenant as createAccountTenant,
      identityAccountV2Account_universal_d_CreateAccountTenantOptions as CreateAccountTenantOptions,
      identityAccountV2Account_universal_d_createAccountAndAssignUser as createAccountAndAssignUser,
      identityAccountV2Account_universal_d_CreateAccountAndAssignUserOptions as CreateAccountAndAssignUserOptions,
      identityAccountV2Account_universal_d_updateAccount as updateAccount,
      identityAccountV2Account_universal_d_UpdateAccountOptions as UpdateAccountOptions,
      identityAccountV2Account_universal_d_updateParentAccount as updateParentAccount,
      identityAccountV2Account_universal_d_UpdateParentAccountOptions as UpdateParentAccountOptions,
      identityAccountV2Account_universal_d_deleteAccount as deleteAccount,
      identityAccountV2Account_universal_d_DeleteAccountOptions as DeleteAccountOptions,
      identityAccountV2Account_universal_d_updateSlugName as updateSlugName,
      identityAccountV2Account_universal_d_isTeam as isTeam,
      identityAccountV2Account_universal_d_markAccountFlag as markAccountFlag,
      identityAccountV2Account_universal_d_MarkAccountFlagOptions as MarkAccountFlagOptions,
      identityAccountV2Account_universal_d_getParentAccountInfo as getParentAccountInfo,
      identityAccountV2Account_universal_d_getSubAccounts as getSubAccounts,
      identityAccountV2Account_universal_d_GetSubAccountsOptions as GetSubAccountsOptions,
      identityAccountV2Account_universal_d_listChildAccounts as listChildAccounts,
      identityAccountV2Account_universal_d_ListChildAccountsOptions as ListChildAccountsOptions,
      identityAccountV2Account_universal_d_setIsReadOnlyAccount as setIsReadOnlyAccount,
    };
  }
  
  interface AccountInvite$1 {
      /**
       * Invite ID.
       * @readonly
       */
      _id?: string;
      /**
       * Account ID.
       * @readonly
       */
      accountId?: string;
      /** Email address where the invite was sent. */
      email?: string;
      /**
       * Deprecated. Use `policyIds`.
       * @deprecated
       */
      role?: string;
      /**
       * Deprecated. Use `inviterAccountId`.
       * @readonly
       * @deprecated
       */
      inviterId?: string;
      /**
       * Invite status.
       *
       * Supported values:
       * - **Pending:** The invite has been sent and is valid, waiting for the user's response.
       * - **Used:** The invite has been accepted.
       * - **Deleted:** The invite has been deleted or revoked.
       * - **Declined:** The user has declined the invite.
       * - **Expired:** The invite has expired without being accepted.
       */
      status?: InviteStatus$3;
      /** Link to accept the invite. */
      acceptLink?: string;
      /**
       * Inviting account ID.
       * @readonly
       */
      inviterAccountId?: string;
      /**
       * Account ID that accepted the invite. Populated only once the invite is accepted.
       * @readonly
       */
      acceptedByAccountId?: string | null;
      /** Date the invite was created. */
      dateCreated?: Date | null;
      /** Role IDs included in the invite. */
      policyIds?: string[];
      /** Date the invite was last updated. */
      dateUpdated?: Date | null;
      /** Assets the users are invited to join. */
      assignments?: InviteResourceAssignment$1[];
      /**
       * Brand domain.
       * @internal
       */
      brandDomain?: string | null;
      /** Invite expiration date. */
      expirationDate?: Date | null;
  }
  /** Invite status stating whether the invite was accepted, waiting to be accepted, deleted etc.. */
  enum InviteStatus$3 {
      Pending = "Pending",
      Used = "Used",
      Deleted = "Deleted",
      Declined = "Declined",
      Expired = "Expired"
  }
  interface InviteResourceAssignment$1 {
      /** Role ID. */
      policyId?: string;
      /** Resources the user will be able to access. */
      assignments?: InviteAssignment$1[];
  }
  interface InviteAssignment$1 {
      /** Full name of resource to be assigned. */
      fullNameResource?: FullNameResource$1;
      /**
       * Condition that will limit the user's access.
       * @internal
       */
      condition?: PolicyCondition$1;
  }
  interface FullNameResource$1 extends FullNameResourceResourceContextOneOf$1 {
      /** Specific site details. */
      siteContext?: SiteResourceContext$1;
      /** Specific account details. */
      accountContext?: AccountResourceContext$1;
      /**
       * Specific organization.
       * @internal
       */
      organizationContext?: OrganizationResourceContext$1;
      /**
       * A specific resource. We will determine the resource type based on the action.
       * @internal
       */
      resource?: Resource$2;
  }
  /** @oneof */
  interface FullNameResourceResourceContextOneOf$1 {
      /** Specific site details. */
      siteContext?: SiteResourceContext$1;
      /** Specific account details. */
      accountContext?: AccountResourceContext$1;
      /**
       * Specific organization.
       * @internal
       */
      organizationContext?: OrganizationResourceContext$1;
  }
  /** Site resource context. It indicates that the resource is under a site (can be the site itself or some asset of a site, like a blog post) */
  interface SiteResourceContext$1 {
      /** Site ID. */
      metasiteId?: string;
  }
  /** Account resource contexts. It indicates that the resource is under the account (can be the account itself or some asset of an account, like a logo or a domain) */
  interface AccountResourceContext$1 {
      /** Account ID. */
      accountId?: string;
  }
  interface OrganizationResourceContext$1 {
  }
  /**
   * A custom resource. Is used to represent some asset that is not a direct resource context (site or account), but something custom.
   * For example: payment method, blog post, domain, logo.
   */
  interface Resource$2 {
      /** The resource id. */
      _id?: string | null;
      /** The resource type */
      type?: string | null;
  }
  interface PolicyCondition$1 {
      /** The type of the condition */
      condition?: ConditionType$1;
  }
  interface ConditionType$1 extends ConditionTypeOfOneOf$1 {
      /** @deprecated */
      simpleCondition?: SimpleCondition$1;
      /** A logic combination between several conditions, with an operator between them */
      joinedConditions?: JoinedCondition$1;
      /** @deprecated */
      environmentCondition?: EnvironmentCondition$1;
      /** A single condition */
      condition?: Condition$2;
  }
  /** @oneof */
  interface ConditionTypeOfOneOf$1 {
      /** @deprecated */
      simpleCondition?: SimpleCondition$1;
      /** A logic combination between several conditions, with an operator between them */
      joinedConditions?: JoinedCondition$1;
      /** @deprecated */
      environmentCondition?: EnvironmentCondition$1;
      /** A single condition */
      condition?: Condition$2;
  }
  interface SimpleCondition$1 {
      attrName?: string;
      value?: SimpleConditionValue$1;
      op?: SimpleConditionOperator$1;
      conditionModelId?: string;
  }
  interface SimpleConditionValue$1 extends SimpleConditionValueValueOneOf$1 {
      attrName?: string;
      stringValue?: string;
      boolValue?: boolean;
  }
  /** @oneof */
  interface SimpleConditionValueValueOneOf$1 {
      attrName?: string;
      stringValue?: string;
      boolValue?: boolean;
  }
  enum SimpleConditionOperator$1 {
      UNKNOWN_SIMPLE_OP = "UNKNOWN_SIMPLE_OP",
      EQUAL = "EQUAL"
  }
  interface JoinedCondition$1 {
      /** The operator that should be used when evaluating the condition */
      op?: JoinedConditionOperator$1;
      /** The conditions that should be evaluated, and then joined using the operator provided */
      conditions?: ConditionType$1[];
  }
  enum JoinedConditionOperator$1 {
      UNKNOWN_JOIN_OP = "UNKNOWN_JOIN_OP",
      OR = "OR",
      AND = "AND"
  }
  interface EnvironmentCondition$1 extends EnvironmentConditionConditionOneOf$1 {
      experimentCondition?: ExperimentCondition$1;
  }
  /** @oneof */
  interface EnvironmentConditionConditionOneOf$1 {
      experimentCondition?: ExperimentCondition$1;
  }
  interface ExperimentCondition$1 {
      spec?: string;
      fallbackValue?: string;
      expectedValue?: string;
  }
  interface Condition$2 {
      /** The unique identifier of the condition model. Indicates which actions the condition is working on */
      conditionModelId?: string;
      /** The operator that should be evaluated */
      operator?: ConditionOperator$1;
  }
  interface ConditionOperator$1 extends ConditionOperatorOperatorsOneOf$1 {
      /** Comparison of equality - will be evaluated to true if the given parties are equal */
      equals?: EqualOperator$1;
      /** Regex operator - will be evaluated to true if the given value matches the provided regex */
      like?: LikeOperator$1;
      /** Petri experiment - will be evaluated using petri. */
      experiment?: ExperimentOperator$1;
      /** Operator that indicates a dependency on another subject being allowed to perform something. */
      dependOn?: DependOnOperator$1;
  }
  /** @oneof */
  interface ConditionOperatorOperatorsOneOf$1 {
      /** Comparison of equality - will be evaluated to true if the given parties are equal */
      equals?: EqualOperator$1;
      /** Regex operator - will be evaluated to true if the given value matches the provided regex */
      like?: LikeOperator$1;
      /** Petri experiment - will be evaluated using petri. */
      experiment?: ExperimentOperator$1;
      /** Operator that indicates a dependency on another subject being allowed to perform something. */
      dependOn?: DependOnOperator$1;
  }
  interface EqualOperator$1 {
      /** The attribute which should be compared. The attribute will be first evaluated to a value, and then compared the other side (attribute/value) */
      attrName?: string;
      /** The value to compare to. If the two parties are equal - we will return true. */
      value?: ConditionValue$1;
  }
  interface ConditionValue$1 extends ConditionValueValueOneOf$1 {
      /** an attribute. We'll first retrieve the value of the attribute (from the request or from pre-indexed values), and then compare to what it needs to be compared with. */
      attrName?: string;
      /** a value with a string type. Will be compared to the attribute provided, and be true only if they match the operator. */
      stringValue?: string;
      /** a value with a boolean type. Will be compared to the attribute provided, and be true only if they match the operator. */
      boolValue?: boolean;
  }
  /** @oneof */
  interface ConditionValueValueOneOf$1 {
      /** an attribute. We'll first retrieve the value of the attribute (from the request or from pre-indexed values), and then compare to what it needs to be compared with. */
      attrName?: string;
      /** a value with a string type. Will be compared to the attribute provided, and be true only if they match the operator. */
      stringValue?: string;
      /** a value with a boolean type. Will be compared to the attribute provided, and be true only if they match the operator. */
      boolValue?: boolean;
  }
  interface LikeOperator$1 {
      /** The attribute which should be compared. The attribute will be first evaluated to a value, and then compared the regex values provided. */
      attrName?: string;
      /** The regex values which the attribute value should be evaluated on. If the attribute value matches at least one of the regular expressions provided - we will return true */
      values?: string[];
  }
  interface ExperimentOperator$1 {
      /** The spec to conduct the experiment on. */
      spec?: string;
      /** The value to use if the experiment could not be conducted */
      fallbackValue?: string;
      /** The expected value of the experiment conduction. If it matches the actual value - true will be returned. Otherwise - false. */
      expectedValue?: string;
  }
  /** Implies that the policy takes affect only if the depend on subject is permitted as well. */
  interface DependOnOperator$1 {
      /** The subject on which the current entry depends on. If the subject is allowed to perform what the query was about - the condition will be evaluated to true. Otherwise - false */
      dependOnSubject?: Subject$2;
  }
  interface Subject$2 {
      /** ID of identity assigned to the asset. */
      _id?: string;
      /** Type of identity assigned to the asset. Supported subject types include user IDs, account IDs, and app IDs. */
      subjectType?: SubjectType$2;
      /** Context of identity assigned to the asset. For example, a `subjectType` = `USER` will have `context` = `ACCOUNT`. */
      context?: SubjectContext$2;
  }
  enum SubjectType$2 {
      UNKNOWN = "UNKNOWN",
      ACCOUNT = "ACCOUNT",
      USER = "USER",
      USER_GROUP = "USER_GROUP",
      MEMBER_GROUP = "MEMBER_GROUP",
      VISITOR_GROUP = "VISITOR_GROUP",
      EXTERNAL_APP = "EXTERNAL_APP",
      ACCOUNT_GROUP = "ACCOUNT_GROUP",
      WIX_APP = "WIX_APP"
  }
  interface SubjectContext$2 {
      _id?: string;
      contextType?: SubjectContextType$2;
  }
  enum SubjectContextType$2 {
      UNKNOWN_CTX = "UNKNOWN_CTX",
      ORG_CTX = "ORG_CTX",
      ACCOUNT_CTX = "ACCOUNT_CTX"
  }
  interface GetAccountInvitesRequest {
  }
  interface GetAccountInvitesResponse {
      invites?: AccountInvite$1[];
  }
  interface GetAccountInviteRequest {
      _id: string;
  }
  interface GetAccountInviteResponse {
      invite?: AccountInvite$1;
  }
  interface AccountInviteRequest {
      role?: string;
      email?: string;
      policyIds?: string[];
  }
  interface AccountInviteResponse {
      invite?: AccountInvite$1;
  }
  interface CreateInviteRequest {
      /** Array of potential team members' email addresses and their corresponding assignments (how they will be assigned when they accept the invite). */
      subjectsAssignments: SubjectInviteAssignments[];
      /**
       * Whether to suppress (not send) emails to the assignees.
       * @internal
       */
      suppressEmail?: boolean;
      /** Language of emails to send. Relevant only for recipients that don't currently have a Wix user ID. Default: Site owner's language. */
      defaultEmailLanguage?: string | null;
  }
  interface SubjectInviteAssignments {
      /** Invitee's email address. */
      subjectEmail?: string;
      /** Mapping of roles (referred to here as policies) and assets (referred to here as resources) that will be assigned to the invitee when they accept the invite. When no resources are specified, the invitee will be given access to everything within the account. */
      assignments?: InviteResourceAssignment$1[];
  }
  interface CreateInviteResponse {
      /** Invites that were sent successfully. */
      successfulInvites?: AccountInvite$1[];
      /** Invites that failed. */
      failedInvites?: InviteFailure[];
  }
  interface InviteFailure {
      /** Email address of the failed invite. */
      subjectEmail?: string;
      /** Error description. */
      errorMessage?: string;
  }
  interface BulkAccountInviteRequest {
      role?: string;
      emails?: string[];
      policyIds?: string[];
  }
  interface BulkAccountInviteResponse {
      invites?: AccountInvite$1[];
      failedEmails?: string[];
  }
  interface ResendAccountInviteRequest {
      inviteId: string;
      /** The language of emails that will be used only for recipients that don't have a user, in case this parameter is unspecified, the sender's language will be used instead */
      defaultEmailLanguage?: string | null;
  }
  interface AcceptAccountInviteRequest {
      inviteToken?: string;
  }
  interface AcceptAccountInviteResponse {
  }
  interface RevokeAccountInviteRequest {
      inviteId: string;
  }
  interface RevokeAccountInviteResponse {
  }
  interface UpdateAccountInviteRequest {
      inviteId: string;
      role?: string;
      policyIds?: string[];
  }
  interface UpdateAccountInviteResponse {
  }
  interface UpdateAccountInviteAssignmentsRequest {
      inviteId: string;
      assignments?: InviteResourceAssignment$1[];
  }
  interface UpdateAccountInviteAssignmentsResponse {
  }
  interface ParseAccountInviteTokenRequest {
      inviteToken?: string;
  }
  interface ParseAccountInviteTokenResponse {
      inviteId?: string;
      accountId?: string;
      status?: InviteStatus$3;
  }
  /** @internal
   * @documentationMaturity preview
   * @permissionId team.view-invites
   * @adminMethod
   */
  function getInvites$1(): Promise<GetAccountInvitesResponse>;
  /** @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId team.view-invites
   * @adminMethod
   */
  function getInvite$1(_id: string): Promise<AccountInvite$1>;
  /**
   * Deprecated: please use CreateInvite
   * @internal
   * @documentationMaturity preview
   * @permissionId team.send-invite
   * @adminMethod
   * @deprecated
   */
  function invite$1(options?: InviteOptions$1): Promise<AccountInviteResponse>;
  interface InviteOptions$1 {
      role?: string;
      email?: string;
      policyIds?: string[];
  }
  /**
   * Creates and sends invite emails to a list of potential team members, inviting them to become team members of the requesting account.
   * The invites may be limited to a specific resource (site or other asset).
   * Maximum 50 invitees can be specified per call.
   *
   * > **Important**: This call requires an account level API key and cannot be authenticated with the standard authorization header. API keys are currently available to selected beta users only.
   * @param subjectsAssignments - Array of potential team members' email addresses and their corresponding assignments (how they will be assigned when they accept the invite).
   * @public
   * @documentationMaturity preview
   * @requiredField subjectsAssignments
   * @param options - Filter options.
   * @permissionId team.send-invite
   * @adminMethod
   */
  function createInvite(subjectsAssignments: SubjectInviteAssignments[], options?: CreateInviteOptions): Promise<CreateInviteResponse>;
  interface CreateInviteOptions {
      /**
       * Whether to suppress (not send) emails to the assignees.
       * @internal
       */
      suppressEmail?: boolean;
      /** Language of emails to send. Relevant only for recipients that don't currently have a Wix user ID. Default: Site owner's language. */
      defaultEmailLanguage?: string | null;
  }
  /**
   * Deprecated: please use CreateInvite
   * @internal
   * @documentationMaturity preview
   * @permissionId team.send-invite
   * @adminMethod
   * @deprecated
   */
  function bulkInvite$1(options?: BulkInviteOptions$1): Promise<BulkAccountInviteResponse>;
  interface BulkInviteOptions$1 {
      role?: string;
      emails?: string[];
      policyIds?: string[];
  }
  /** @internal
   * @documentationMaturity preview
   * @requiredField inviteId
   * @permissionId team.send-invite
   * @adminMethod
   */
  function resendInvite$1(inviteId: string, options?: ResendInviteOptions$1): Promise<AccountInviteResponse>;
  interface ResendInviteOptions$1 {
      /** The language of emails that will be used only for recipients that don't have a user, in case this parameter is unspecified, the sender's language will be used instead */
      defaultEmailLanguage?: string | null;
  }
  /** @internal
   * @documentationMaturity preview
   * @permissionId team.accept-invite
   * @adminMethod
   */
  function acceptInvite$1(options?: AcceptInviteOptions$1): Promise<void>;
  interface AcceptInviteOptions$1 {
      inviteToken?: string;
  }
  /** @internal
   * @documentationMaturity preview
   * @requiredField inviteId
   * @permissionId team.delete-invite
   * @adminMethod
   */
  function revokeInvite$1(inviteId: string): Promise<void>;
  /**
   * Deprecated: please use UpdateInviteAssignments
   * @internal
   * @documentationMaturity preview
   * @requiredField inviteId
   * @permissionId team.change-invite
   * @adminMethod
   * @deprecated
   */
  function updateInvite$1(inviteId: string, options?: UpdateInviteOptions$1): Promise<void>;
  interface UpdateInviteOptions$1 {
      role?: string;
      policyIds?: string[];
  }
  /** @internal
   * @documentationMaturity preview
   * @requiredField inviteId
   * @permissionId team.change-invite
   * @adminMethod
   */
  function updateInviteAssignments(inviteId: string, options?: UpdateInviteAssignmentsOptions): Promise<void>;
  interface UpdateInviteAssignmentsOptions {
      assignments?: InviteResourceAssignment$1[];
  }
  
  type identityInvitesV1AccountInvite_universal_d_GetAccountInvitesRequest = GetAccountInvitesRequest;
  type identityInvitesV1AccountInvite_universal_d_GetAccountInvitesResponse = GetAccountInvitesResponse;
  type identityInvitesV1AccountInvite_universal_d_GetAccountInviteRequest = GetAccountInviteRequest;
  type identityInvitesV1AccountInvite_universal_d_GetAccountInviteResponse = GetAccountInviteResponse;
  type identityInvitesV1AccountInvite_universal_d_AccountInviteRequest = AccountInviteRequest;
  type identityInvitesV1AccountInvite_universal_d_AccountInviteResponse = AccountInviteResponse;
  type identityInvitesV1AccountInvite_universal_d_CreateInviteRequest = CreateInviteRequest;
  type identityInvitesV1AccountInvite_universal_d_SubjectInviteAssignments = SubjectInviteAssignments;
  type identityInvitesV1AccountInvite_universal_d_CreateInviteResponse = CreateInviteResponse;
  type identityInvitesV1AccountInvite_universal_d_InviteFailure = InviteFailure;
  type identityInvitesV1AccountInvite_universal_d_BulkAccountInviteRequest = BulkAccountInviteRequest;
  type identityInvitesV1AccountInvite_universal_d_BulkAccountInviteResponse = BulkAccountInviteResponse;
  type identityInvitesV1AccountInvite_universal_d_ResendAccountInviteRequest = ResendAccountInviteRequest;
  type identityInvitesV1AccountInvite_universal_d_AcceptAccountInviteRequest = AcceptAccountInviteRequest;
  type identityInvitesV1AccountInvite_universal_d_AcceptAccountInviteResponse = AcceptAccountInviteResponse;
  type identityInvitesV1AccountInvite_universal_d_RevokeAccountInviteRequest = RevokeAccountInviteRequest;
  type identityInvitesV1AccountInvite_universal_d_RevokeAccountInviteResponse = RevokeAccountInviteResponse;
  type identityInvitesV1AccountInvite_universal_d_UpdateAccountInviteRequest = UpdateAccountInviteRequest;
  type identityInvitesV1AccountInvite_universal_d_UpdateAccountInviteResponse = UpdateAccountInviteResponse;
  type identityInvitesV1AccountInvite_universal_d_UpdateAccountInviteAssignmentsRequest = UpdateAccountInviteAssignmentsRequest;
  type identityInvitesV1AccountInvite_universal_d_UpdateAccountInviteAssignmentsResponse = UpdateAccountInviteAssignmentsResponse;
  type identityInvitesV1AccountInvite_universal_d_ParseAccountInviteTokenRequest = ParseAccountInviteTokenRequest;
  type identityInvitesV1AccountInvite_universal_d_ParseAccountInviteTokenResponse = ParseAccountInviteTokenResponse;
  const identityInvitesV1AccountInvite_universal_d_createInvite: typeof createInvite;
  type identityInvitesV1AccountInvite_universal_d_CreateInviteOptions = CreateInviteOptions;
  const identityInvitesV1AccountInvite_universal_d_updateInviteAssignments: typeof updateInviteAssignments;
  type identityInvitesV1AccountInvite_universal_d_UpdateInviteAssignmentsOptions = UpdateInviteAssignmentsOptions;
  namespace identityInvitesV1AccountInvite_universal_d {
    export {
      AccountInvite$1 as AccountInvite,
      InviteStatus$3 as InviteStatus,
      InviteResourceAssignment$1 as InviteResourceAssignment,
      InviteAssignment$1 as InviteAssignment,
      FullNameResource$1 as FullNameResource,
      FullNameResourceResourceContextOneOf$1 as FullNameResourceResourceContextOneOf,
      SiteResourceContext$1 as SiteResourceContext,
      AccountResourceContext$1 as AccountResourceContext,
      OrganizationResourceContext$1 as OrganizationResourceContext,
      Resource$2 as Resource,
      PolicyCondition$1 as PolicyCondition,
      ConditionType$1 as ConditionType,
      ConditionTypeOfOneOf$1 as ConditionTypeOfOneOf,
      SimpleCondition$1 as SimpleCondition,
      SimpleConditionValue$1 as SimpleConditionValue,
      SimpleConditionValueValueOneOf$1 as SimpleConditionValueValueOneOf,
      SimpleConditionOperator$1 as SimpleConditionOperator,
      JoinedCondition$1 as JoinedCondition,
      JoinedConditionOperator$1 as JoinedConditionOperator,
      EnvironmentCondition$1 as EnvironmentCondition,
      EnvironmentConditionConditionOneOf$1 as EnvironmentConditionConditionOneOf,
      ExperimentCondition$1 as ExperimentCondition,
      Condition$2 as Condition,
      ConditionOperator$1 as ConditionOperator,
      ConditionOperatorOperatorsOneOf$1 as ConditionOperatorOperatorsOneOf,
      EqualOperator$1 as EqualOperator,
      ConditionValue$1 as ConditionValue,
      ConditionValueValueOneOf$1 as ConditionValueValueOneOf,
      LikeOperator$1 as LikeOperator,
      ExperimentOperator$1 as ExperimentOperator,
      DependOnOperator$1 as DependOnOperator,
      Subject$2 as Subject,
      SubjectType$2 as SubjectType,
      SubjectContext$2 as SubjectContext,
      SubjectContextType$2 as SubjectContextType,
      identityInvitesV1AccountInvite_universal_d_GetAccountInvitesRequest as GetAccountInvitesRequest,
      identityInvitesV1AccountInvite_universal_d_GetAccountInvitesResponse as GetAccountInvitesResponse,
      identityInvitesV1AccountInvite_universal_d_GetAccountInviteRequest as GetAccountInviteRequest,
      identityInvitesV1AccountInvite_universal_d_GetAccountInviteResponse as GetAccountInviteResponse,
      identityInvitesV1AccountInvite_universal_d_AccountInviteRequest as AccountInviteRequest,
      identityInvitesV1AccountInvite_universal_d_AccountInviteResponse as AccountInviteResponse,
      identityInvitesV1AccountInvite_universal_d_CreateInviteRequest as CreateInviteRequest,
      identityInvitesV1AccountInvite_universal_d_SubjectInviteAssignments as SubjectInviteAssignments,
      identityInvitesV1AccountInvite_universal_d_CreateInviteResponse as CreateInviteResponse,
      identityInvitesV1AccountInvite_universal_d_InviteFailure as InviteFailure,
      identityInvitesV1AccountInvite_universal_d_BulkAccountInviteRequest as BulkAccountInviteRequest,
      identityInvitesV1AccountInvite_universal_d_BulkAccountInviteResponse as BulkAccountInviteResponse,
      identityInvitesV1AccountInvite_universal_d_ResendAccountInviteRequest as ResendAccountInviteRequest,
      identityInvitesV1AccountInvite_universal_d_AcceptAccountInviteRequest as AcceptAccountInviteRequest,
      identityInvitesV1AccountInvite_universal_d_AcceptAccountInviteResponse as AcceptAccountInviteResponse,
      identityInvitesV1AccountInvite_universal_d_RevokeAccountInviteRequest as RevokeAccountInviteRequest,
      identityInvitesV1AccountInvite_universal_d_RevokeAccountInviteResponse as RevokeAccountInviteResponse,
      identityInvitesV1AccountInvite_universal_d_UpdateAccountInviteRequest as UpdateAccountInviteRequest,
      identityInvitesV1AccountInvite_universal_d_UpdateAccountInviteResponse as UpdateAccountInviteResponse,
      identityInvitesV1AccountInvite_universal_d_UpdateAccountInviteAssignmentsRequest as UpdateAccountInviteAssignmentsRequest,
      identityInvitesV1AccountInvite_universal_d_UpdateAccountInviteAssignmentsResponse as UpdateAccountInviteAssignmentsResponse,
      identityInvitesV1AccountInvite_universal_d_ParseAccountInviteTokenRequest as ParseAccountInviteTokenRequest,
      identityInvitesV1AccountInvite_universal_d_ParseAccountInviteTokenResponse as ParseAccountInviteTokenResponse,
      getInvites$1 as getInvites,
      getInvite$1 as getInvite,
      invite$1 as invite,
      InviteOptions$1 as InviteOptions,
      identityInvitesV1AccountInvite_universal_d_createInvite as createInvite,
      identityInvitesV1AccountInvite_universal_d_CreateInviteOptions as CreateInviteOptions,
      bulkInvite$1 as bulkInvite,
      BulkInviteOptions$1 as BulkInviteOptions,
      resendInvite$1 as resendInvite,
      ResendInviteOptions$1 as ResendInviteOptions,
      acceptInvite$1 as acceptInvite,
      AcceptInviteOptions$1 as AcceptInviteOptions,
      revokeInvite$1 as revokeInvite,
      updateInvite$1 as updateInvite,
      UpdateInviteOptions$1 as UpdateInviteOptions,
      identityInvitesV1AccountInvite_universal_d_updateInviteAssignments as updateInviteAssignments,
      identityInvitesV1AccountInvite_universal_d_UpdateInviteAssignmentsOptions as UpdateInviteAssignmentsOptions,
    };
  }
  
  interface SiteInvite$1 {
      /**
       * Invite ID.
       * @readonly
       */
      _id?: string;
      /**
       * Site ID the user is invited to as a collaborator.
       * @readonly
       */
      siteId?: string;
      /** Email address where the invite was sent. */
      email?: string;
      /** Role IDs included in the invite. */
      policyIds?: string[];
      /**
       * Deprecated. Use `inviterAccountId`.
       * @readonly
       * @deprecated
       */
      inviterId?: string;
      /**
       * Invite Status.
       *
       * Supported values:
       * - **Pending:** The invite has been sent and is valid, waiting for the user's response.
       * - **Used:** The invite has been accepted.
       * - **Deleted:** The invite has been deleted or revoked.
       * - **Declined:** The user declined the invite.
       * - **Expired:** The invite has expired without being accepted.
       */
      status?: InviteStatus$2;
      /** Link to accept the invite. */
      acceptLink?: string;
      /**
       * Inviting account ID.
       * @readonly
       */
      inviterAccountId?: string;
      /**
       * Account ID that accepted the invite. Populated only once the invite is accepted.
       * @readonly
       */
      acceptedByAccountId?: string | null;
      /** Date the invite was created. */
      dateCreated?: Date | null;
      /** User's Wix Bookings staff ID, if relevant. */
      staffId?: string | null;
      /**
       * Brand domain.
       * @internal
       */
      brandDomain?: string | null;
      /**
       * Optional field representing the purpose of the invite
       * @internal
       */
      invitePurpose?: string | null;
      /** Invite expiration date */
      expirationDate?: Date | null;
  }
  /** Invite status stating whether the invite was accepted, waiting to be accepted, deleted etc.. */
  enum InviteStatus$2 {
      Pending = "Pending",
      Used = "Used",
      Deleted = "Deleted",
      Declined = "Declined",
      Expired = "Expired"
  }
  interface GetSiteInvitesRequest {
  }
  interface GetSiteInvitesResponse {
      invites?: SiteInvite$1[];
  }
  interface QuerySiteInvitesRequest {
      /**
       * Supports only `filter` field with
       * `"filter" : {
       * "acceptedByAccountId":{"$in": [<id1>, <id2>, ...]}
       * }`
       */
      query?: QueryV2;
  }
  interface QueryV2 extends QueryV2PagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$1;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
      /**
       * Filter object.
       *
       * Learn more about the [filter section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-filter-section).
       */
      filter?: Record<string, any> | null;
      /**
       * Sort object.
       *
       * Learn more about the [sort section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-sort-section).
       */
      sort?: Sorting[];
      /** Array of projected fields. A list of specific field names to return. If `fieldsets` are also specified, the union of `fieldsets` and `fields` is returned. */
      fields?: string[];
      /** Array of named, predefined sets of projected fields. A array of predefined named sets of fields to be returned. Specifying multiple `fieldsets` will return the union of fields from all sets. If `fields` are also specified, the union of `fieldsets` and `fields` is returned. */
      fieldsets?: string[];
  }
  /** @oneof */
  interface QueryV2PagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$1;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
  }
  interface Sorting {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder;
      /**
       * When `field_name` is a property of repeated field that is marked as `MATCH_ITEMS` and sort should be done by
       * a specific element from a collection, filter can/should be provided to ensure correct sort value is picked.
       *
       * If multiple filters are provided, they are combined with AND operator.
       *
       * Example:
       * Given we have document like {"id": "1", "nestedField": [{"price": 10, "region": "EU"}, {"price": 20, "region": "US"}]}
       * and `nestedField` is marked as `MATCH_ITEMS`, to ensure that sorting is done by correct region, filter should be
       * { fieldName: "nestedField.price", "select_items_by": [{"nestedField.region": "US"}] }
       * @internal
       */
      selectItemsBy?: Record<string, any>[] | null;
  }
  enum SortOrder {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface Paging$1 {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface CursorPaging {
      /** Maximum number of items to return in the results. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * Pass the relevant cursor token from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface QuerySiteInvitesResponse {
      invites?: SiteInvite$1[];
  }
  interface GetSiteInviteRequest {
      _id: string;
  }
  interface GetSiteInviteResponse {
      invite?: SiteInvite$1;
  }
  interface SiteInviteRequest {
      /** The role ids to be assigned */
      policyIds?: string[];
      /** Invitee email */
      email?: string;
      /**
       * Booking staff id
       * @internal
       */
      staffId?: string | null;
      /**
       * Invite purpose
       * @internal
       */
      invitePurpose?: string | null;
      /** The language of emails that will be used only for recipients that don't have a user, in case this parameter is unspecified, the sender's language will be used instead */
      defaultEmailLanguage?: string | null;
      /**
       * An indicator for suppressing (not sending) emails to the assignees.
       * @internal
       */
      suppressEmail?: boolean;
  }
  interface SiteInviteResponse {
      /** Invites that were sent. */
      invite?: SiteInvite$1;
  }
  interface BulkSiteInviteRequest {
      /** Role IDs, referred to as policy IDs, to assign to the contributors. */
      policyIds: string[];
      /** Email addresses to which the invites should be sent. */
      emails: string[];
      /** Details explaining the purpose of the invite. */
      invitePurpose?: string | null;
      /** Language of emails to send. Relevant only for recipients that don't currently have a Wix user ID. Default: Site owner's language. */
      defaultEmailLanguage?: string | null;
  }
  interface BulkSiteInviteResponse {
      /** Invites that were sent successfully. */
      invites?: SiteInvite$1[];
      /** Invites that failed. */
      failedEmails?: string[];
  }
  interface ResendSiteInviteRequest {
      /** Invite ID. */
      inviteId: string;
      /** Language of emails to send. Relevant only for recipients that don't currently have a Wix user ID. Default: Site owner's language. */
      defaultEmailLanguage?: string | null;
  }
  interface AcceptSiteInviteRequest {
      inviteToken?: string;
  }
  interface AcceptSiteInviteResponse {
  }
  interface RevokeSiteInviteRequest {
      /** Invite ID. */
      inviteId: string;
  }
  interface RevokeSiteInviteResponse {
  }
  interface UpdateSiteInviteRequest {
      inviteId: string;
      policyIds?: string[];
      staffId?: string | null;
  }
  interface UpdateSiteInviteResponse {
  }
  interface GetContributorLimitRequest {
  }
  interface GetContributorLimitResponse {
      contributorLimitation?: ContributorLimitation;
  }
  interface ContributorLimitation {
      contributorLimit?: number;
      leftInvites?: number;
  }
  interface ParseSiteInviteTokenRequest {
      inviteToken?: string;
  }
  interface ParseSiteInviteTokenResponse {
      inviteId?: string;
      siteId?: string;
      status?: InviteStatus$2;
  }
  /** @internal
   * @documentationMaturity preview
   * @permissionId site-users.view-invitations
   * @adminMethod
   */
  function getInvites(): Promise<GetSiteInvitesResponse>;
  /** @internal
   * @documentationMaturity preview
   * @permissionId site-users.view-invitations
   * @adminMethod
   */
  function queryInvites(options?: QueryInvitesOptions): Promise<QuerySiteInvitesResponse>;
  interface QueryInvitesOptions {
      /**
       * Supports only `filter` field with
       * `"filter" : {
       * "acceptedByAccountId":{"$in": [<id1>, <id2>, ...]}
       * }`
       */
      query?: QueryV2;
  }
  /** @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId site-users.view-invitations
   * @adminMethod
   */
  function getInvite(_id: string): Promise<SiteInvite$1>;
  /** @internal
   * @documentationMaturity preview
   * @permissionId site-users.send-invite
   * @adminMethod
   */
  function invite(options?: InviteOptions): Promise<SiteInviteResponse>;
  interface InviteOptions {
      /** The role ids to be assigned */
      policyIds?: string[];
      /** Invitee email */
      email?: string;
      /**
       * Booking staff id
       * @internal
       */
      staffId?: string | null;
      /**
       * Invite purpose
       * @internal
       */
      invitePurpose?: string | null;
      /** The language of emails that will be used only for recipients that don't have a user, in case this parameter is unspecified, the sender's language will be used instead */
      defaultEmailLanguage?: string | null;
      /**
       * An indicator for suppressing (not sending) emails to the assignees.
       * @internal
       */
      suppressEmail?: boolean;
  }
  /**
   * Creates and sends emails inviting potential site contributors to become contributors in the requesting site.
   * > **Important**: This call requires an account level API key and cannot be authenticated with the standard authorization header. API keys are currently available to selected beta users only.
   * @param policyIds - Role IDs, referred to as policy IDs, to assign to the contributors.
   * @public
   * @documentationMaturity preview
   * @requiredField options.emails
   * @requiredField policyIds
   * @param options - Filter options.
   * @permissionId site-users.send-invite
   * @adminMethod
   */
  function bulkInvite(policyIds: string[], options?: BulkInviteOptions): Promise<BulkSiteInviteResponse>;
  interface BulkInviteOptions {
      /** Email addresses to which the invites should be sent. */
      emails: string[];
      /** Details explaining the purpose of the invite. */
      invitePurpose?: string | null;
      /** Language of emails to send. Relevant only for recipients that don't currently have a Wix user ID. Default: Site owner's language. */
      defaultEmailLanguage?: string | null;
  }
  /**
   * Resends the email invitation to a potential site contributor.
   * > **Important**: This call requires an account level API key and cannot be authenticated with the standard authorization header. API keys are currently available to selected beta users only.
   * @param inviteId - Invite ID.
   * @public
   * @documentationMaturity preview
   * @requiredField inviteId
   * @param options - Filter options.
   * @permissionId site-users.send-invite
   * @adminMethod
   */
  function resendInvite(inviteId: string, options?: ResendInviteOptions): Promise<SiteInviteResponse>;
  interface ResendInviteOptions {
      /** Language of emails to send. Relevant only for recipients that don't currently have a Wix user ID. Default: Site owner's language. */
      defaultEmailLanguage?: string | null;
  }
  /** @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function acceptInvite(options?: AcceptInviteOptions): Promise<void>;
  interface AcceptInviteOptions {
      inviteToken?: string;
  }
  /**
   * Revokes a pending site contributor invite.
   * > **Important**: This call requires an account level API key and cannot be authenticated with the standard authorization header. API keys are currently available to selected beta users only.
   * @param inviteId - Invite ID.
   * @public
   * @documentationMaturity preview
   * @requiredField inviteId
   * @permissionId site-users.delete-invite
   * @adminMethod
   */
  function revokeInvite(inviteId: string): Promise<void>;
  /** @internal
   * @documentationMaturity preview
   * @requiredField inviteId
   * @permissionId site-users.remove-user
   * @adminMethod
   */
  function updateInvite(inviteId: string, options?: UpdateInviteOptions): Promise<void>;
  interface UpdateInviteOptions {
      policyIds?: string[];
      staffId?: string | null;
  }
  /** @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function getContributorLimit(): Promise<GetContributorLimitResponse>;
  
  type identityInvitesV1SiteInvite_universal_d_GetSiteInvitesRequest = GetSiteInvitesRequest;
  type identityInvitesV1SiteInvite_universal_d_GetSiteInvitesResponse = GetSiteInvitesResponse;
  type identityInvitesV1SiteInvite_universal_d_QuerySiteInvitesRequest = QuerySiteInvitesRequest;
  type identityInvitesV1SiteInvite_universal_d_QueryV2 = QueryV2;
  type identityInvitesV1SiteInvite_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
  type identityInvitesV1SiteInvite_universal_d_Sorting = Sorting;
  type identityInvitesV1SiteInvite_universal_d_SortOrder = SortOrder;
  const identityInvitesV1SiteInvite_universal_d_SortOrder: typeof SortOrder;
  type identityInvitesV1SiteInvite_universal_d_CursorPaging = CursorPaging;
  type identityInvitesV1SiteInvite_universal_d_QuerySiteInvitesResponse = QuerySiteInvitesResponse;
  type identityInvitesV1SiteInvite_universal_d_GetSiteInviteRequest = GetSiteInviteRequest;
  type identityInvitesV1SiteInvite_universal_d_GetSiteInviteResponse = GetSiteInviteResponse;
  type identityInvitesV1SiteInvite_universal_d_SiteInviteRequest = SiteInviteRequest;
  type identityInvitesV1SiteInvite_universal_d_SiteInviteResponse = SiteInviteResponse;
  type identityInvitesV1SiteInvite_universal_d_BulkSiteInviteRequest = BulkSiteInviteRequest;
  type identityInvitesV1SiteInvite_universal_d_BulkSiteInviteResponse = BulkSiteInviteResponse;
  type identityInvitesV1SiteInvite_universal_d_ResendSiteInviteRequest = ResendSiteInviteRequest;
  type identityInvitesV1SiteInvite_universal_d_AcceptSiteInviteRequest = AcceptSiteInviteRequest;
  type identityInvitesV1SiteInvite_universal_d_AcceptSiteInviteResponse = AcceptSiteInviteResponse;
  type identityInvitesV1SiteInvite_universal_d_RevokeSiteInviteRequest = RevokeSiteInviteRequest;
  type identityInvitesV1SiteInvite_universal_d_RevokeSiteInviteResponse = RevokeSiteInviteResponse;
  type identityInvitesV1SiteInvite_universal_d_UpdateSiteInviteRequest = UpdateSiteInviteRequest;
  type identityInvitesV1SiteInvite_universal_d_UpdateSiteInviteResponse = UpdateSiteInviteResponse;
  type identityInvitesV1SiteInvite_universal_d_GetContributorLimitRequest = GetContributorLimitRequest;
  type identityInvitesV1SiteInvite_universal_d_GetContributorLimitResponse = GetContributorLimitResponse;
  type identityInvitesV1SiteInvite_universal_d_ContributorLimitation = ContributorLimitation;
  type identityInvitesV1SiteInvite_universal_d_ParseSiteInviteTokenRequest = ParseSiteInviteTokenRequest;
  type identityInvitesV1SiteInvite_universal_d_ParseSiteInviteTokenResponse = ParseSiteInviteTokenResponse;
  const identityInvitesV1SiteInvite_universal_d_getInvites: typeof getInvites;
  const identityInvitesV1SiteInvite_universal_d_queryInvites: typeof queryInvites;
  type identityInvitesV1SiteInvite_universal_d_QueryInvitesOptions = QueryInvitesOptions;
  const identityInvitesV1SiteInvite_universal_d_getInvite: typeof getInvite;
  const identityInvitesV1SiteInvite_universal_d_invite: typeof invite;
  type identityInvitesV1SiteInvite_universal_d_InviteOptions = InviteOptions;
  const identityInvitesV1SiteInvite_universal_d_bulkInvite: typeof bulkInvite;
  type identityInvitesV1SiteInvite_universal_d_BulkInviteOptions = BulkInviteOptions;
  const identityInvitesV1SiteInvite_universal_d_resendInvite: typeof resendInvite;
  type identityInvitesV1SiteInvite_universal_d_ResendInviteOptions = ResendInviteOptions;
  const identityInvitesV1SiteInvite_universal_d_acceptInvite: typeof acceptInvite;
  type identityInvitesV1SiteInvite_universal_d_AcceptInviteOptions = AcceptInviteOptions;
  const identityInvitesV1SiteInvite_universal_d_revokeInvite: typeof revokeInvite;
  const identityInvitesV1SiteInvite_universal_d_updateInvite: typeof updateInvite;
  type identityInvitesV1SiteInvite_universal_d_UpdateInviteOptions = UpdateInviteOptions;
  const identityInvitesV1SiteInvite_universal_d_getContributorLimit: typeof getContributorLimit;
  namespace identityInvitesV1SiteInvite_universal_d {
    export {
      SiteInvite$1 as SiteInvite,
      InviteStatus$2 as InviteStatus,
      identityInvitesV1SiteInvite_universal_d_GetSiteInvitesRequest as GetSiteInvitesRequest,
      identityInvitesV1SiteInvite_universal_d_GetSiteInvitesResponse as GetSiteInvitesResponse,
      identityInvitesV1SiteInvite_universal_d_QuerySiteInvitesRequest as QuerySiteInvitesRequest,
      identityInvitesV1SiteInvite_universal_d_QueryV2 as QueryV2,
      identityInvitesV1SiteInvite_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf,
      identityInvitesV1SiteInvite_universal_d_Sorting as Sorting,
      identityInvitesV1SiteInvite_universal_d_SortOrder as SortOrder,
      Paging$1 as Paging,
      identityInvitesV1SiteInvite_universal_d_CursorPaging as CursorPaging,
      identityInvitesV1SiteInvite_universal_d_QuerySiteInvitesResponse as QuerySiteInvitesResponse,
      identityInvitesV1SiteInvite_universal_d_GetSiteInviteRequest as GetSiteInviteRequest,
      identityInvitesV1SiteInvite_universal_d_GetSiteInviteResponse as GetSiteInviteResponse,
      identityInvitesV1SiteInvite_universal_d_SiteInviteRequest as SiteInviteRequest,
      identityInvitesV1SiteInvite_universal_d_SiteInviteResponse as SiteInviteResponse,
      identityInvitesV1SiteInvite_universal_d_BulkSiteInviteRequest as BulkSiteInviteRequest,
      identityInvitesV1SiteInvite_universal_d_BulkSiteInviteResponse as BulkSiteInviteResponse,
      identityInvitesV1SiteInvite_universal_d_ResendSiteInviteRequest as ResendSiteInviteRequest,
      identityInvitesV1SiteInvite_universal_d_AcceptSiteInviteRequest as AcceptSiteInviteRequest,
      identityInvitesV1SiteInvite_universal_d_AcceptSiteInviteResponse as AcceptSiteInviteResponse,
      identityInvitesV1SiteInvite_universal_d_RevokeSiteInviteRequest as RevokeSiteInviteRequest,
      identityInvitesV1SiteInvite_universal_d_RevokeSiteInviteResponse as RevokeSiteInviteResponse,
      identityInvitesV1SiteInvite_universal_d_UpdateSiteInviteRequest as UpdateSiteInviteRequest,
      identityInvitesV1SiteInvite_universal_d_UpdateSiteInviteResponse as UpdateSiteInviteResponse,
      identityInvitesV1SiteInvite_universal_d_GetContributorLimitRequest as GetContributorLimitRequest,
      identityInvitesV1SiteInvite_universal_d_GetContributorLimitResponse as GetContributorLimitResponse,
      identityInvitesV1SiteInvite_universal_d_ContributorLimitation as ContributorLimitation,
      identityInvitesV1SiteInvite_universal_d_ParseSiteInviteTokenRequest as ParseSiteInviteTokenRequest,
      identityInvitesV1SiteInvite_universal_d_ParseSiteInviteTokenResponse as ParseSiteInviteTokenResponse,
      identityInvitesV1SiteInvite_universal_d_getInvites as getInvites,
      identityInvitesV1SiteInvite_universal_d_queryInvites as queryInvites,
      identityInvitesV1SiteInvite_universal_d_QueryInvitesOptions as QueryInvitesOptions,
      identityInvitesV1SiteInvite_universal_d_getInvite as getInvite,
      identityInvitesV1SiteInvite_universal_d_invite as invite,
      identityInvitesV1SiteInvite_universal_d_InviteOptions as InviteOptions,
      identityInvitesV1SiteInvite_universal_d_bulkInvite as bulkInvite,
      identityInvitesV1SiteInvite_universal_d_BulkInviteOptions as BulkInviteOptions,
      identityInvitesV1SiteInvite_universal_d_resendInvite as resendInvite,
      identityInvitesV1SiteInvite_universal_d_ResendInviteOptions as ResendInviteOptions,
      identityInvitesV1SiteInvite_universal_d_acceptInvite as acceptInvite,
      identityInvitesV1SiteInvite_universal_d_AcceptInviteOptions as AcceptInviteOptions,
      identityInvitesV1SiteInvite_universal_d_revokeInvite as revokeInvite,
      identityInvitesV1SiteInvite_universal_d_updateInvite as updateInvite,
      identityInvitesV1SiteInvite_universal_d_UpdateInviteOptions as UpdateInviteOptions,
      identityInvitesV1SiteInvite_universal_d_getContributorLimit as getContributorLimit,
    };
  }
  
  interface User$1 {
      /** User ID. */
      _id?: string;
      /**
       * Deprecated.
       * @deprecated
       */
      roles?: string[];
      /** User's email address. */
      email?: string;
      /** User's name. */
      name?: Name$1;
      /** URL to user's profile image, when provided. */
      profileImage?: string | null;
      /** Date the user joined the team. */
      joinedTeamAt?: Date | null;
      /**
       * Deprecated.
       * @deprecated
       */
      policyIds?: string[];
      /** Resources the user can access. */
      assignments?: Assignment$1[];
  }
  interface Name$1 {
      /** User's first name. */
      firstName?: string;
      /** User's last name. */
      lastName?: string;
  }
  interface Assignment$1 {
      /** Role assigned to the user. */
      policy?: AssignedPolicy$1;
      /** Unique ID for this specific assignment. */
      assignmentId?: string;
      /**
       * The asset a user is assigned access to in an assignment, including any restrictions to their access. When empty, the role covers all assets, with no restrictions to specific sites or folders.
       * @internal
       */
      restrictions?: Restriction$1;
      /** Identity assigned to the asset in an assignment, referred to as subject. Supported subjects include user IDs, account IDs, and app IDs. */
      subject?: Subject$1;
  }
  interface AssignedPolicy$1 {
      /** Role ID. */
      policyId?: string;
      /** Role title. */
      title?: string | null;
      /** Role description. */
      description?: string | null;
  }
  interface Restriction$1 extends RestrictionRestrictionsOneOf$1 {
      /**
       * Deprecated.
       * @deprecated
       */
      resource?: ApiResource;
      /** List of conditions restricting the user's access. Currently only folder conditions are supported. */
      conditions?: Conditions$1;
      /** Site where the assignment restrictions apply. */
      site?: SiteRestriction$1;
  }
  /** @oneof */
  interface RestrictionRestrictionsOneOf$1 {
      /**
       * Deprecated.
       * @deprecated
       */
      resource?: ApiResource;
      /** List of conditions restricting the user's access. Currently only folder conditions are supported. */
      conditions?: Conditions$1;
      /** Site where the assignment restrictions apply. */
      site?: SiteRestriction$1;
  }
  interface ApiResource {
      /** Resource type. */
      resourceType?: ResourceType$1;
      /** Resource ID. */
      _id?: string;
      value?: string | null;
  }
  enum ResourceType$1 {
      UNKNOWN_RESOURCE_TYPE = "UNKNOWN_RESOURCE_TYPE",
      SITE = "SITE"
  }
  interface Conditions$1 {
      /** List of conditions. */
      conditions?: ApiCondition[];
  }
  interface ApiCondition {
      /** Condition type. */
      conditionType?: ConditionAttributeType$1;
      /** Condition ID. */
      _id?: string;
      /** Expected value of the condition. When `conditionType` = "FOLDER", this is the folder path. */
      value?: string | null;
  }
  enum ConditionAttributeType$1 {
      UNKNOWN_CONDITION_TYPE = "UNKNOWN_CONDITION_TYPE",
      FOLDER = "FOLDER"
  }
  interface SiteRestriction$1 {
      /** Site ID. */
      _id?: string;
      /** Site name. */
      value?: string | null;
      /**
       * A specific asset (referred to as a resource) inside the site, if relevant. For example, a specific dashboard page.
       * @internal
       */
      resource?: CompanionResource$1;
  }
  interface CompanionResource$1 {
      /** Asset ID (referred to here as resource ID). */
      _id?: string;
      /** Asset type (referred to here as resource type). as predefined in the authorization system */
      resourceType?: string;
  }
  interface Subject$1 {
      /** ID of identity assigned to the asset. */
      _id?: string;
      /** Type of identity assigned to the asset. Supported subject types include user IDs, account IDs, and app IDs. */
      subjectType?: SubjectType$1;
      /** Context of identity assigned to the asset. For example, a `subjectType` = `USER` will have `context` = `ACCOUNT`. */
      context?: SubjectContext$1;
  }
  enum SubjectType$1 {
      UNKNOWN = "UNKNOWN",
      ACCOUNT = "ACCOUNT",
      USER = "USER",
      USER_GROUP = "USER_GROUP",
      MEMBER_GROUP = "MEMBER_GROUP",
      VISITOR_GROUP = "VISITOR_GROUP",
      EXTERNAL_APP = "EXTERNAL_APP",
      ACCOUNT_GROUP = "ACCOUNT_GROUP",
      WIX_APP = "WIX_APP"
  }
  interface SubjectContext$1 {
      _id?: string;
      contextType?: SubjectContextType$1;
  }
  enum SubjectContextType$1 {
      UNKNOWN_CTX = "UNKNOWN_CTX",
      ORG_CTX = "ORG_CTX",
      ACCOUNT_CTX = "ACCOUNT_CTX"
  }
  interface GetTeamRequest {
      /** @deprecated */
      usersLimit?: number | null;
      /** The locale of the request. Defaults to en */
      locale?: string | null;
      paging?: Paging;
  }
  interface Paging {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface GetTeamResponse {
      users?: User$1[];
      invites?: AccountInvite[];
      accountInfo?: AccountInfo$1;
      permissions?: string[];
      userId?: string;
      targetAccountId?: string;
      policies?: ApiPolicy[];
      totalUsersInAccount?: string;
      predefinedRoles?: PredefinedRoles$1;
  }
  interface AccountInvite {
      /**
       * Invite ID.
       * @readonly
       */
      _id?: string;
      /**
       * Account ID.
       * @readonly
       */
      accountId?: string;
      /** Email address where the invite was sent. */
      email?: string;
      /**
       * Deprecated. Use `policyIds`.
       * @deprecated
       */
      role?: string;
      /**
       * Deprecated. Use `inviterAccountId`.
       * @readonly
       * @deprecated
       */
      inviterId?: string;
      /**
       * Invite status.
       *
       * Supported values:
       * - **Pending:** The invite has been sent and is valid, waiting for the user's response.
       * - **Used:** The invite has been accepted.
       * - **Deleted:** The invite has been deleted or revoked.
       * - **Declined:** The user has declined the invite.
       * - **Expired:** The invite has expired without being accepted.
       */
      status?: InviteStatus$1;
      /** Link to accept the invite. */
      acceptLink?: string;
      /**
       * Inviting account ID.
       * @readonly
       */
      inviterAccountId?: string;
      /**
       * Account ID that accepted the invite. Populated only once the invite is accepted.
       * @readonly
       */
      acceptedByAccountId?: string | null;
      /** Date the invite was created. */
      dateCreated?: Date | null;
      /** Role IDs included in the invite. */
      policyIds?: string[];
      /** Date the invite was last updated. */
      dateUpdated?: Date | null;
      /** Assets the users are invited to join. */
      assignments?: InviteResourceAssignment[];
      /**
       * Brand domain.
       * @internal
       */
      brandDomain?: string | null;
      /** Invite expiration date. */
      expirationDate?: Date | null;
  }
  /** Invite status stating whether the invite was accepted, waiting to be accepted, deleted etc.. */
  enum InviteStatus$1 {
      Pending = "Pending",
      Used = "Used",
      Deleted = "Deleted",
      Declined = "Declined",
      Expired = "Expired"
  }
  interface InviteResourceAssignment {
      /** Role ID. */
      policyId?: string;
      /** Resources the user will be able to access. */
      assignments?: InviteAssignment[];
  }
  interface InviteAssignment {
      /** Full name of resource to be assigned. */
      fullNameResource?: FullNameResource;
      /**
       * Condition that will limit the user's access.
       * @internal
       */
      condition?: PolicyCondition;
  }
  interface FullNameResource extends FullNameResourceResourceContextOneOf {
      /** Specific site details. */
      siteContext?: SiteResourceContext;
      /** Specific account details. */
      accountContext?: AccountResourceContext;
      /**
       * Specific organization.
       * @internal
       */
      organizationContext?: OrganizationResourceContext;
      /**
       * A specific resource. We will determine the resource type based on the action.
       * @internal
       */
      resource?: Resource$1;
  }
  /** @oneof */
  interface FullNameResourceResourceContextOneOf {
      /** Specific site details. */
      siteContext?: SiteResourceContext;
      /** Specific account details. */
      accountContext?: AccountResourceContext;
      /**
       * Specific organization.
       * @internal
       */
      organizationContext?: OrganizationResourceContext;
  }
  /** Site resource context. It indicates that the resource is under a site (can be the site itself or some asset of a site, like a blog post) */
  interface SiteResourceContext {
      /** Site ID. */
      metasiteId?: string;
  }
  /** Account resource contexts. It indicates that the resource is under the account (can be the account itself or some asset of an account, like a logo or a domain) */
  interface AccountResourceContext {
      /** Account ID. */
      accountId?: string;
  }
  interface OrganizationResourceContext {
  }
  /**
   * A custom resource. Is used to represent some asset that is not a direct resource context (site or account), but something custom.
   * For example: payment method, blog post, domain, logo.
   */
  interface Resource$1 {
      /** The resource id. */
      _id?: string | null;
      /** The resource type */
      type?: string | null;
  }
  interface PolicyCondition {
      /** The type of the condition */
      condition?: ConditionType;
  }
  interface ConditionType extends ConditionTypeOfOneOf {
      /** @deprecated */
      simpleCondition?: SimpleCondition;
      /** A logic combination between several conditions, with an operator between them */
      joinedConditions?: JoinedCondition;
      /** @deprecated */
      environmentCondition?: EnvironmentCondition;
      /** A single condition */
      condition?: Condition$1;
  }
  /** @oneof */
  interface ConditionTypeOfOneOf {
      /** @deprecated */
      simpleCondition?: SimpleCondition;
      /** A logic combination between several conditions, with an operator between them */
      joinedConditions?: JoinedCondition;
      /** @deprecated */
      environmentCondition?: EnvironmentCondition;
      /** A single condition */
      condition?: Condition$1;
  }
  interface SimpleCondition {
      attrName?: string;
      value?: SimpleConditionValue;
      op?: SimpleConditionOperator;
      conditionModelId?: string;
  }
  interface SimpleConditionValue extends SimpleConditionValueValueOneOf {
      attrName?: string;
      stringValue?: string;
      boolValue?: boolean;
  }
  /** @oneof */
  interface SimpleConditionValueValueOneOf {
      attrName?: string;
      stringValue?: string;
      boolValue?: boolean;
  }
  enum SimpleConditionOperator {
      UNKNOWN_SIMPLE_OP = "UNKNOWN_SIMPLE_OP",
      EQUAL = "EQUAL"
  }
  interface JoinedCondition {
      /** The operator that should be used when evaluating the condition */
      op?: JoinedConditionOperator;
      /** The conditions that should be evaluated, and then joined using the operator provided */
      conditions?: ConditionType[];
  }
  enum JoinedConditionOperator {
      UNKNOWN_JOIN_OP = "UNKNOWN_JOIN_OP",
      OR = "OR",
      AND = "AND"
  }
  interface EnvironmentCondition extends EnvironmentConditionConditionOneOf {
      experimentCondition?: ExperimentCondition;
  }
  /** @oneof */
  interface EnvironmentConditionConditionOneOf {
      experimentCondition?: ExperimentCondition;
  }
  interface ExperimentCondition {
      spec?: string;
      fallbackValue?: string;
      expectedValue?: string;
  }
  interface Condition$1 {
      /** The unique identifier of the condition model. Indicates which actions the condition is working on */
      conditionModelId?: string;
      /** The operator that should be evaluated */
      operator?: ConditionOperator;
  }
  interface ConditionOperator extends ConditionOperatorOperatorsOneOf {
      /** Comparison of equality - will be evaluated to true if the given parties are equal */
      equals?: EqualOperator;
      /** Regex operator - will be evaluated to true if the given value matches the provided regex */
      like?: LikeOperator;
      /** Petri experiment - will be evaluated using petri. */
      experiment?: ExperimentOperator;
      /** Operator that indicates a dependency on another subject being allowed to perform something. */
      dependOn?: DependOnOperator;
  }
  /** @oneof */
  interface ConditionOperatorOperatorsOneOf {
      /** Comparison of equality - will be evaluated to true if the given parties are equal */
      equals?: EqualOperator;
      /** Regex operator - will be evaluated to true if the given value matches the provided regex */
      like?: LikeOperator;
      /** Petri experiment - will be evaluated using petri. */
      experiment?: ExperimentOperator;
      /** Operator that indicates a dependency on another subject being allowed to perform something. */
      dependOn?: DependOnOperator;
  }
  interface EqualOperator {
      /** The attribute which should be compared. The attribute will be first evaluated to a value, and then compared the other side (attribute/value) */
      attrName?: string;
      /** The value to compare to. If the two parties are equal - we will return true. */
      value?: ConditionValue;
  }
  interface ConditionValue extends ConditionValueValueOneOf {
      /** an attribute. We'll first retrieve the value of the attribute (from the request or from pre-indexed values), and then compare to what it needs to be compared with. */
      attrName?: string;
      /** a value with a string type. Will be compared to the attribute provided, and be true only if they match the operator. */
      stringValue?: string;
      /** a value with a boolean type. Will be compared to the attribute provided, and be true only if they match the operator. */
      boolValue?: boolean;
  }
  /** @oneof */
  interface ConditionValueValueOneOf {
      /** an attribute. We'll first retrieve the value of the attribute (from the request or from pre-indexed values), and then compare to what it needs to be compared with. */
      attrName?: string;
      /** a value with a string type. Will be compared to the attribute provided, and be true only if they match the operator. */
      stringValue?: string;
      /** a value with a boolean type. Will be compared to the attribute provided, and be true only if they match the operator. */
      boolValue?: boolean;
  }
  interface LikeOperator {
      /** The attribute which should be compared. The attribute will be first evaluated to a value, and then compared the regex values provided. */
      attrName?: string;
      /** The regex values which the attribute value should be evaluated on. If the attribute value matches at least one of the regular expressions provided - we will return true */
      values?: string[];
  }
  interface ExperimentOperator {
      /** The spec to conduct the experiment on. */
      spec?: string;
      /** The value to use if the experiment could not be conducted */
      fallbackValue?: string;
      /** The expected value of the experiment conduction. If it matches the actual value - true will be returned. Otherwise - false. */
      expectedValue?: string;
  }
  /** Implies that the policy takes affect only if the depend on subject is permitted as well. */
  interface DependOnOperator {
      /** The subject on which the current entry depends on. If the subject is allowed to perform what the query was about - the condition will be evaluated to true. Otherwise - false */
      dependOnSubject?: Subject$1;
  }
  interface AccountInfo$1 {
      accountName?: string;
      accountImage?: string;
      isTeam?: boolean;
  }
  interface ApiPolicy {
      _id?: string;
      description?: string | null;
      name?: string | null;
      isCustom?: boolean;
      scopes?: string[];
  }
  interface PredefinedRoles$1 {
      roles?: PredefinedRole$1[];
  }
  interface PredefinedRole$1 {
      titleKey?: string;
      roles?: Role$1[];
      title?: string | null;
      areaId?: string;
  }
  interface Role$1 {
      _id?: string;
      deprecatedKey?: string;
      /** @deprecated */
      titleKey?: string;
      /** @deprecated */
      descriptionKey?: string;
      deprecated?: boolean;
      restrictFromLevel?: string;
      experiments?: string[];
      appDefIds?: string[];
      title?: string | null;
      description?: string | null;
      isCustom?: boolean;
      scopes?: string[];
      availableResourceTypes?: ResourceType$1[];
      availableConditions?: ConditionAttributeType$1[];
      limitToEditorTypes?: string[];
  }
  interface ChangeRoleRequest {
      /** User ID. */
      _id: string;
      /**
       * Deprecated. Use `policyIds`.
       * @deprecated
       */
      role?: string;
      /** Role IDs to be assigned. */
      policyIds: string[];
  }
  interface ChangeRoleResponse {
  }
  interface RemoveMemberRequest {
      /** User ID of the team member to remove. */
      userId: string;
  }
  interface RemoveMemberResponse {
  }
  interface GetUsersRequest {
      /** The number of items to load */
      limit?: number | null;
      /** number of items to skip in the current sort order */
      offset?: number | null;
  }
  interface GetUsersResponse {
      users?: User$1[];
  }
  interface GetScopesRequest {
      /** The locale of the request. Defaults to en */
      locale?: string | null;
  }
  interface GetScopesResponse {
      scopeAreas?: ScopeArea[];
  }
  interface ScopeArea {
      title?: string;
      appDefIds?: string[];
      scopes?: PermissionScope[];
      restrictFromLevel?: ScopeLevel;
  }
  interface PermissionScope {
      _id?: string;
      title?: string;
      description?: string;
      level?: ScopeLevel;
      experiments?: string[];
      dependantScopes?: string[];
      restrictFromLevel?: ScopeLevel;
      deprecated?: boolean | null;
      /** The visibility of the scope for the caller */
      visibility?: Visibility;
      appDefIds?: string[];
  }
  enum ScopeLevel {
      None = "None",
      SITE = "SITE",
      ACCOUNT = "ACCOUNT"
  }
  enum Visibility {
      /** The scope should be visible to the caller */
      VISIBLE = "VISIBLE",
      /** The scope shouldn't be visible for the caller, because the capability that blocks it is turned on for the caller */
      BLOCKED_BY_CAPABILITY = "BLOCKED_BY_CAPABILITY"
  }
  interface GetPeopleRequest {
      resource?: PeopleResource;
      peopleType?: PeopleType;
      paging?: Paging;
      /** The locale of the request. Defaults to en */
      locale?: string | null;
  }
  interface PeopleResource extends PeopleResourceResourceTypeOneOf {
      site?: string;
      folder?: FolderResource;
  }
  /** @oneof */
  interface PeopleResourceResourceTypeOneOf {
      site?: string;
      folder?: FolderResource;
  }
  interface FolderResource {
      folderId?: string;
      folderFullPath?: string;
  }
  enum PeopleType {
      UNDEF_PEOPLE_TYPE = "UNDEF_PEOPLE_TYPE",
      CONTRIBUTOR = "CONTRIBUTOR",
      TEAM_MEMBER = "TEAM_MEMBER"
  }
  interface GetPeopleResponse {
      people?: People;
  }
  interface People {
      people?: Person[];
      totalPeople?: number;
  }
  interface Person extends PersonPersonOneOf {
      contributor?: Contributor$1;
      teamMember?: TeamMember;
  }
  /** @oneof */
  interface PersonPersonOneOf {
      contributor?: Contributor$1;
      teamMember?: TeamMember;
  }
  interface Contributor$1 {
      /** Contributor's metadata. */
      metaData?: PersonMetaData$1;
      /** Whether the contributor account is a team account. */
      isTeam?: boolean | null;
      /** Date that the contributor joined the site. */
      joinedAt?: Date | null;
      /** Email address that received the invite. */
      invitedEmail?: string | null;
      /** Whether the contributor account is a client account. */
      isClient?: boolean | null;
      /**
       * Contributor's user ID.
       * @readonly
       */
      _id?: string;
  }
  interface PersonMetaData$1 {
      /** Contributor's account ID. */
      _id?: string;
      /** Contributor's full name. */
      fullName?: string | null;
      /** URL for contributor's profile image. */
      imageUrl?: string | null;
      /** Contributor's email address. */
      email?: string | null;
      /** Contributor's access to assets and their assigned role (`policy`) for that asset. */
      assignments?: Assignment$1[];
  }
  interface TeamMember {
      metaData?: PersonMetaData$1;
  }
  interface GetTeamV2Response {
      users?: User$1[];
      totalUsersInAccount?: string;
  }
  interface GetTeamInvitesRequest {
      /** The locale of the request. Defaults to en */
      locale?: string | null;
  }
  interface GetTeamInvitesResponse {
      invites?: Invite[];
  }
  interface Invite {
      /** @readonly */
      _id?: string;
      /** @readonly */
      accountId?: string;
      email?: string;
      status?: InviteStatus$1;
      acceptLink?: string;
      dateCreated?: Date | null;
      dateUpdated?: Date | null;
      assignments?: ApiInviteAssignment[];
      /** Invite expiration date */
      expirationDate?: Date | null;
  }
  interface ApiInviteAssignment {
      policy?: AssignedPolicy$1;
      restrictions?: Restriction$1;
  }
  interface GetPoliciesRequest {
      /** The locale of the request. Defaults to en */
      locale?: string | null;
      /** Areas filter to include only roles from areas that pass this filter. When not provided, roles from all areas will be returned */
      areasFilter?: AreasFilter;
      /** Role level filter to include only roles that are not restricted from the requested resource level (site/account). When set to ALL, all levels are returned */
      roleLevel?: RoleLevel;
  }
  interface AreasFilter {
      /** A list of role area ids, to filter only roles belonging to these areas */
      areaIds?: string[];
  }
  enum RoleLevel {
      ALL = "ALL",
      SITE_LEVEL = "SITE_LEVEL",
      ACCOUNT_LEVEL = "ACCOUNT_LEVEL"
  }
  interface GetPoliciesResponse {
      policies?: PredefinedRoles$1;
  }
  interface SearchTeamRequest {
      /** Free text to search for within team member name and email address fields. */
      query?: string | null;
      /** Sort data. */
      orderBy?: Ordering[];
      /**
       * Filter object. Supported values: `inviteType` and `roleId`. For example, `{'inviteType': {'$eq': 'Expired'}}`.
       * See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language) for more information.
       */
      filter?: Record<string, any> | null;
      /**
       * A list of facets to return in the response. Facets count the items within logical groupings.
       * See [Filters and Facets: An Explainer](https://medium.com/@westontt/filters-and-facets-an-explainer-3b73a9538eca) for more information.
       */
      facets?: FacetType[];
      /** Pagination. */
      paging?: Paging;
  }
  interface Ordering {
      /** Field to sort by. */
      fieldName?: OrderField;
      /** Sort order. */
      direction?: Direction;
  }
  enum OrderField {
      /** For internal use. */
      Undefined = "Undefined",
      /** Team member name. */
      Name = "Name",
      /** Date team member joined the account. */
      JoinedAt = "JoinedAt"
  }
  enum Direction {
      /** For internal use. */
      UninitializedDirection = "UninitializedDirection",
      /** Ascending. */
      ASC = "ASC",
      /** Descending. */
      DESC = "DESC"
  }
  enum FacetType {
      Undefined = "Undefined",
      /** How many team members with each role */
      Roles = "Roles",
      /** How many team members by invite status */
      InviteStatus = "InviteStatus",
      /** How many team members in total in the account */
      Users = "Users"
  }
  interface SearchTeamResponse {
      /** List of facets, as requested. */
      facets?: Facet[];
      /** Existing team members and invites sent to join the account. */
      teamMembers?: TeamMemberV3[];
  }
  interface Facet {
      /** Facet type. */
      facetType?: FacetType;
      /** Values and their counters. Values with count = 0 are not returned. */
      values?: FacetValue[];
  }
  interface FacetValue {
      /** Supported values: `Roles`, `InviteStatus`, `Users`. */
      value?: string;
      /** Number of existing items for the value. */
      count?: number;
  }
  interface TeamMemberV3 extends TeamMemberV3MembersOneOf {
      /** Existing team member data. */
      user?: UserV3;
      /** Invited team member data. */
      invite?: InviteV3;
  }
  /** @oneof */
  interface TeamMemberV3MembersOneOf {
      /** Existing team member data. */
      user?: UserV3;
      /** Invited team member data. */
      invite?: InviteV3;
  }
  interface UserV3 {
      /** User ID. */
      _id?: string;
      /** User's email address. */
      email?: string | null;
      /** User's name, when provided. */
      name?: Name$1;
      /** URL to user's profile image, when provided. */
      profileImage?: string | null;
      /** Date the user joined the team. */
      joinedTeamAt?: Date | null;
      /** Mapping of the user's access to an asset and their assigned role. */
      assignments?: AssignmentV3[];
  }
  interface AssignmentV3 {
      /** Role assigned to the user. To retrieve all available roles, call Get Roles Info. */
      policyId?: string | null;
      /**
       * Unique ID for this specific assignment.
       * @readonly
       */
      assignmentId?: string | null;
      /** The asset where a user is assigned access in an assignment. When empty, the role covers all assets, with no restrictions to specific sites or folders. */
      restrictions?: Restriction$1;
      /** Identity assigned to the asset in an assignment, referred to as subject. Supported subjects include user IDs, account IDs, and app IDs. */
      subject?: AssignedSubject;
  }
  interface AssignedSubject {
      /**
       * Identity ID.
       * @readonly
       */
      _id?: string;
      /** Identity type. */
      subjectType?: SubjectType$1;
  }
  interface InviteV3 {
      /**
       * Invite ID.
       * @readonly
       */
      _id?: string;
      /** Invitee's email address. */
      email?: string | null;
      /** Invite status. */
      status?: InviteStatus$1;
      /** URL of direct link to accept the invite. */
      acceptLink?: string | null;
      /** Date the invite was created. */
      dateCreated?: Date | null;
      /** Date the invite was last updated. */
      dateUpdated?: Date | null;
      /** A list of assignments that will be applied to the invitees when they accept the invite. */
      assignments?: InviteAssignmentV3[];
      /** Invite expiration date. */
      expirationDate?: Date | null;
  }
  interface InviteAssignmentV3 {
      /** Role ID that will be assigned once the invite is accepted. */
      policyId?: string | null;
      /** Assets where the user will be assigned access. When empty, the role covers all assets, with no restrictions to specific sites or folders. */
      restrictions?: Restriction$1;
  }
  interface GetRolesRequest {
      /** The locale of the predefined roles names and descriptions. Defaults to English */
      locale?: string | null;
  }
  interface GetRolesResponse {
      /** The predefined roles (by areas) */
      predefinedRolesAreas?: PredefinedRolesArea[];
      /** The custom roles */
      customRoles?: CustomRole[];
  }
  interface PredefinedRolesArea {
      /** The id of the area (e.g "Blog") */
      areaId?: string;
      /** The translated area title, according to the request locale, or the original title if translation failed */
      title?: string;
      /** The predefined roles belonging to this area */
      roles?: PredefinedRoleV2[];
  }
  interface PredefinedRoleV2 {
      /** The policy id of this role */
      _id?: string;
      /** The title of this role, translated according to the request locale, or the original title if translation failed */
      title?: string;
      /** The description of this role, translated according to the request locale, or the original description if translation failed */
      description?: string;
      /** The permission-scopes this role's policy contains */
      scopes?: string[];
      /** Indicates if the role is deprecated (shouldn't be granted, and only exists for backward compatability) */
      deprecated?: boolean;
      /** Indicates if this role should be restricted from assignments of a specific resource type (if RoleLevelRestriction = None, there is no restriction) */
      restrictFromLevel?: RoleLevelRestriction;
      /** Experiments that should be open for this role to be visible */
      experiments?: string[];
      /** Applications that should be installed for this role to be visible */
      appDefIds?: string[];
      /** Editor types this role should be limited to (if empty, available in all editors) */
      limitToEditorTypes?: EditorType[];
      /** The visibility of the role */
      visibility?: RoleVisibility;
  }
  enum RoleLevelRestriction {
      NoRestriction = "NoRestriction",
      Site = "Site",
      Account = "Account"
  }
  enum EditorType {
      UNINITIALIZED = "UNINITIALIZED",
      EDITORX = "EDITORX",
      BLOCKS = "BLOCKS",
      STUDIO = "STUDIO"
  }
  enum RoleVisibility {
      /** the role should be visible to the caller */
      Visible = "Visible",
      /** the role should be disabled for the caller, because it contains permissions the caller wasn't granted on the call context (site/account) */
      Disabled_Dependency = "Disabled_Dependency",
      /** the role should be disabled for the caller, because the role's capability is disabled for the caller */
      Disabled_Capability = "Disabled_Capability"
  }
  interface CustomRole {
      /** The policy this role grants */
      policy?: ApiPolicy;
      /** The visibility of the role */
      visibility?: RoleVisibility;
  }
  interface GetRolesInfoRequest {
      /** Language of predefined roles names and descriptions to return, in ISO 639 format. Default: `en`. */
      locale?: string | null;
      /** Roles to return. */
      filter?: RolesInfoFilter;
  }
  interface RolesInfoFilter {
      /** Role level to return. Default: ALL. */
      roleLevel?: RoleLevel;
      /** Filter for editor-specific roles. Default: ALL. */
      editorTypes?: EditorType[];
  }
  interface GetRolesInfoResponse {
      /** Predefined roles. */
      predefinedRoles?: RoleInfo[];
      /** Custom roles. */
      customRoles?: RoleInfo[];
  }
  interface RoleInfo {
      /** Role ID. */
      _id?: string;
      /** Role title, translated according to the request locale. If translation fails, the original title is returned. */
      title?: string;
      /** Role description, translated according to the request locale. If translation fails, the original description is returned. */
      description?: string;
      /** Whether this role is restricted from accessing a specific resource type. Default: `NoRestriction`. */
      restrictFromLevel?: RoleLevelRestriction;
  }
  interface CreateCustomRoleRequest {
      /** The custom role to create */
      role: Policy$1;
  }
  interface Policy$1 {
      /** @readonly */
      _id?: string | null;
      name?: string | null;
      description?: string | null;
      /** @readonly */
      status?: string;
      policyType?: PolicyType;
      statements?: PolicyStatement[];
  }
  enum PolicyType {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      PREDEFINED = "PREDEFINED",
      CUSTOM = "CUSTOM",
      INLINE_CUSTOM = "INLINE_CUSTOM"
  }
  interface PolicyStatement {
      /** @readonly */
      _id?: string | null;
      permissions?: string[];
      scopes?: string[];
      effect?: Effect;
      condition?: PolicyCondition;
  }
  enum Effect {
      UNKNOWN_EFFECT = "UNKNOWN_EFFECT",
      ALLOW = "ALLOW",
      DENY = "DENY"
  }
  interface CreateCustomRoleResponse {
      /** The newly created custom role */
      roleCreated?: Policy$1;
  }
  interface ChangeRoleV2Request {
      /** ID of team member being affected. */
      userId: string;
      /** New assignments, including roles, to apply to the team member in this account. To retrieve all available roles, call Get Roles Info. */
      roles: AssignmentV3[];
      /** Existing assignment IDs to remove. To retrieve all existing assignment IDs for a team member, call Search Team. */
      assignmentIdsToReplace: string[];
  }
  interface ChangeRoleV2Response {
      /** New roles assigned to the given team member. */
      roles?: AssignmentV3[];
  }
  interface UpdateTeamMemberAssignmentsRequest {
      /** ID of team member being affected. */
      userId: string;
      /** New assignments to apply to the team member in this account. */
      newAssignments: AssignmentV3[];
      /** Existing assignment IDs to remove. To retrieve all existing assignment IDs for a team member, call Search Team. */
      assignmentIdsToRemove: string[];
  }
  interface UpdateTeamMemberAssignmentsResponse {
      /** The new assignments, assigned to the given team member. */
      assignments?: AssignmentV3[];
  }
  interface GetSubjectsAssignmentsRequest {
      /** The locale of the request. Defaults to en */
      locale?: string | null;
      /** list of subjects */
      subjects?: Subject$1[];
  }
  interface GetSubjectsAssignmentsResponse {
      /** list of subjects with assignments */
      subjectsAssignments?: SubjectAssignments[];
  }
  interface SubjectAssignments {
      subject?: Subject$1;
      assignments?: Assignment$1[];
  }
  /** @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function getTeam(options?: GetTeamOptions): Promise<GetTeamResponse>;
  interface GetTeamOptions {
      /** @deprecated */
      usersLimit?: number | null;
      /** The locale of the request. Defaults to en */
      locale?: string | null;
      paging?: Paging;
  }
  /**
   * Changes an existing site contributor's role.
   * @param _id - User ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField options.policyIds
   * @permissionId team.change-member
   * @adminMethod
   */
  function changeRole$1(_id: string, options?: ChangeRoleOptions$1): Promise<void>;
  interface ChangeRoleOptions$1 {
      /**
       * Deprecated. Use `policyIds`.
       * @deprecated
       */
      role?: string;
      /** Role IDs to be assigned. */
      policyIds: string[];
  }
  /**
   * Removes a team member from the requesting account.
   * > **Important**: This call requires an account level API key and cannot be authenticated with the standard authorization header. API keys are currently available to selected beta users only.
   * @param userId - User ID of the team member to remove.
   * @public
   * @documentationMaturity preview
   * @requiredField userId
   * @permissionId team.delete-member
   * @adminMethod
   */
  function removeMember(userId: string): Promise<void>;
  /** @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function users(options?: UsersOptions): Promise<GetUsersResponse>;
  interface UsersOptions {
      /** The number of items to load */
      limit?: number | null;
      /** number of items to skip in the current sort order */
      offset?: number | null;
  }
  /** @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function getScopes(options?: GetScopesOptions): Promise<GetScopesResponse>;
  interface GetScopesOptions {
      /** The locale of the request. Defaults to en */
      locale?: string | null;
  }
  /** @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function getPeople(options?: GetPeopleOptions): Promise<GetPeopleResponse>;
  interface GetPeopleOptions {
      resource?: PeopleResource;
      peopleType?: PeopleType;
      paging?: Paging;
      /** The locale of the request. Defaults to en */
      locale?: string | null;
  }
  /** @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function getTeamV2(options?: GetTeamV2Options): Promise<GetTeamV2Response>;
  interface GetTeamV2Options {
      /** @deprecated */
      usersLimit?: number | null;
      /** The locale of the request. Defaults to en */
      locale?: string | null;
      paging?: Paging;
  }
  /** @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function getTeamInvites(options?: GetTeamInvitesOptions): Promise<GetTeamInvitesResponse>;
  interface GetTeamInvitesOptions {
      /** The locale of the request. Defaults to en */
      locale?: string | null;
  }
  /** @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function getPolicies(options?: GetPoliciesOptions): Promise<GetPoliciesResponse>;
  interface GetPoliciesOptions {
      /** The locale of the request. Defaults to en */
      locale?: string | null;
      /** Areas filter to include only roles from areas that pass this filter. When not provided, roles from all areas will be returned */
      areasFilter?: AreasFilter;
      /** Role level filter to include only roles that are not restricted from the requested resource level (site/account). When set to ALL, all levels are returned */
      roleLevel?: RoleLevel;
  }
  /**
   * Retrieves all team members of the requesting account, based on the provided filters and free text queries.
   * > **Important**: This call requires an account level API key and cannot be authenticated with the standard authorization header. API keys are currently available to selected beta users only.
   * @public
   * @documentationMaturity preview
   * @param options - Filter options.
   * @adminMethod
   */
  function searchTeam(options?: SearchTeamOptions): Promise<SearchTeamResponse>;
  interface SearchTeamOptions {
      /** Free text to search for within team member name and email address fields. */
      query?: string | null;
      /** Sort data. */
      orderBy?: Ordering[];
      /**
       * Filter object. Supported values: `inviteType` and `roleId`. For example, `{'inviteType': {'$eq': 'Expired'}}`.
       * See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language) for more information.
       */
      filter?: Record<string, any> | null;
      /**
       * A list of facets to return in the response. Facets count the items within logical groupings.
       * See [Filters and Facets: An Explainer](https://medium.com/@westontt/filters-and-facets-an-explainer-3b73a9538eca) for more information.
       */
      facets?: FacetType[];
      /** Pagination. */
      paging?: Paging;
  }
  /**
   * Get all the available roles, both predefined roles and custom roles of the account taken from the target account in the call context.
   * Roles contain their visibility for the caller.
   * @internal
   * @documentationMaturity preview
   * @permissionId ACCOUNT_ROLES.GET_ROLES
   * @adminMethod
   */
  function getRoles(options?: GetRolesOptions): Promise<GetRolesResponse>;
  interface GetRolesOptions {
      /** The locale of the predefined roles names and descriptions. Defaults to English */
      locale?: string | null;
  }
  /**
   * Retrieves all available roles in the requesting account, including predefined and custom roles.
   * > **Important**: This call requires an account level API key and cannot be authenticated with the standard authorization header. API keys are currently available to selected beta users only.
   * @public
   * @documentationMaturity preview
   * @param options - Filter options.
   * @permissionId ACCOUNT_ROLES.GET_ROLES
   * @adminMethod
   */
  function getRolesInfo(options?: GetRolesInfoOptions): Promise<GetRolesInfoResponse>;
  interface GetRolesInfoOptions {
      /** Language of predefined roles names and descriptions to return, in ISO 639 format. Default: `en`. */
      locale?: string | null;
      /** Roles to return. */
      filter?: RolesInfoFilter;
  }
  /**
   * Create a custom role in the account taken from the target account in the call context.
   * @param role - The custom role to create
   * @internal
   * @documentationMaturity preview
   * @requiredField role
   * @permissionId team.manage-team-member-roles
   * @adminMethod
   */
  function createCustomRole(role: Policy$1): Promise<CreateCustomRoleResponse>;
  /**
   * Updates the roles and conditions for an existing team member. Changing roles changes the team member's access to account assets.
   * > **Important**: This call requires an account level API key and cannot be authenticated with the standard authorization header. API keys are currently available to selected beta users only.
   * @param userId - ID of team member being affected.
   * @internal
   * @documentationMaturity preview
   * @requiredField options
   * @requiredField options.assignmentIdsToReplace
   * @requiredField options.roles
   * @requiredField userId
   * @permissionId team.manage-team-member-roles
   * @adminMethod
   */
  function changeRoleV2(userId: string, options: ChangeRoleV2Options): Promise<ChangeRoleV2Response>;
  interface ChangeRoleV2Options {
      /** New assignments, including roles, to apply to the team member in this account. To retrieve all available roles, call Get Roles Info. */
      roles: AssignmentV3[];
      /** Existing assignment IDs to remove. To retrieve all existing assignment IDs for a team member, call Search Team. */
      assignmentIdsToReplace: string[];
  }
  /**
   * Updates the assignments of roles and conditions for an existing team member.  Changing assignments changes the team member’s access to account assets.
   * > **Important**: This call requires an account level API key and cannot be authenticated with the standard authorization header. API keys are currently available to selected beta users only.
   * @param userId - ID of team member being affected.
   * @public
   * @documentationMaturity preview
   * @requiredField options
   * @requiredField options.assignmentIdsToRemove
   * @requiredField options.newAssignments
   * @requiredField userId
   * @param options - Filter options. The `assignmentIdsToRemove` and `newAssignments` fields **must** be passed.
   * @permissionId team.manage-team-member-roles
   * @adminMethod
   */
  function updateTeamMemberAssignments(userId: string, options: UpdateTeamMemberAssignmentsOptions): Promise<UpdateTeamMemberAssignmentsResponse>;
  interface UpdateTeamMemberAssignmentsOptions {
      /** New assignments to apply to the team member in this account. */
      newAssignments: AssignmentV3[];
      /** Existing assignment IDs to remove. To retrieve all existing assignment IDs for a team member, call Search Team. */
      assignmentIdsToRemove: string[];
  }
  /**
   * Get subjects assignments
   * @internal
   * @documentationMaturity preview
   * @permissionId ACCOUNT.SUBJECTS_ASSIGNMENTS_READ
   * @adminMethod
   */
  function getSubjectsAssignments(options?: GetSubjectsAssignmentsOptions): Promise<GetSubjectsAssignmentsResponse>;
  interface GetSubjectsAssignmentsOptions {
      /** The locale of the request. Defaults to en */
      locale?: string | null;
      /** list of subjects */
      subjects?: Subject$1[];
  }
  
  type identityRolesV1User_universal_d_ApiResource = ApiResource;
  type identityRolesV1User_universal_d_ApiCondition = ApiCondition;
  type identityRolesV1User_universal_d_GetTeamRequest = GetTeamRequest;
  type identityRolesV1User_universal_d_Paging = Paging;
  type identityRolesV1User_universal_d_GetTeamResponse = GetTeamResponse;
  type identityRolesV1User_universal_d_AccountInvite = AccountInvite;
  type identityRolesV1User_universal_d_InviteResourceAssignment = InviteResourceAssignment;
  type identityRolesV1User_universal_d_InviteAssignment = InviteAssignment;
  type identityRolesV1User_universal_d_FullNameResource = FullNameResource;
  type identityRolesV1User_universal_d_FullNameResourceResourceContextOneOf = FullNameResourceResourceContextOneOf;
  type identityRolesV1User_universal_d_SiteResourceContext = SiteResourceContext;
  type identityRolesV1User_universal_d_AccountResourceContext = AccountResourceContext;
  type identityRolesV1User_universal_d_OrganizationResourceContext = OrganizationResourceContext;
  type identityRolesV1User_universal_d_PolicyCondition = PolicyCondition;
  type identityRolesV1User_universal_d_ConditionType = ConditionType;
  type identityRolesV1User_universal_d_ConditionTypeOfOneOf = ConditionTypeOfOneOf;
  type identityRolesV1User_universal_d_SimpleCondition = SimpleCondition;
  type identityRolesV1User_universal_d_SimpleConditionValue = SimpleConditionValue;
  type identityRolesV1User_universal_d_SimpleConditionValueValueOneOf = SimpleConditionValueValueOneOf;
  type identityRolesV1User_universal_d_SimpleConditionOperator = SimpleConditionOperator;
  const identityRolesV1User_universal_d_SimpleConditionOperator: typeof SimpleConditionOperator;
  type identityRolesV1User_universal_d_JoinedCondition = JoinedCondition;
  type identityRolesV1User_universal_d_JoinedConditionOperator = JoinedConditionOperator;
  const identityRolesV1User_universal_d_JoinedConditionOperator: typeof JoinedConditionOperator;
  type identityRolesV1User_universal_d_EnvironmentCondition = EnvironmentCondition;
  type identityRolesV1User_universal_d_EnvironmentConditionConditionOneOf = EnvironmentConditionConditionOneOf;
  type identityRolesV1User_universal_d_ExperimentCondition = ExperimentCondition;
  type identityRolesV1User_universal_d_ConditionOperator = ConditionOperator;
  type identityRolesV1User_universal_d_ConditionOperatorOperatorsOneOf = ConditionOperatorOperatorsOneOf;
  type identityRolesV1User_universal_d_EqualOperator = EqualOperator;
  type identityRolesV1User_universal_d_ConditionValue = ConditionValue;
  type identityRolesV1User_universal_d_ConditionValueValueOneOf = ConditionValueValueOneOf;
  type identityRolesV1User_universal_d_LikeOperator = LikeOperator;
  type identityRolesV1User_universal_d_ExperimentOperator = ExperimentOperator;
  type identityRolesV1User_universal_d_DependOnOperator = DependOnOperator;
  type identityRolesV1User_universal_d_ApiPolicy = ApiPolicy;
  type identityRolesV1User_universal_d_ChangeRoleRequest = ChangeRoleRequest;
  type identityRolesV1User_universal_d_ChangeRoleResponse = ChangeRoleResponse;
  type identityRolesV1User_universal_d_RemoveMemberRequest = RemoveMemberRequest;
  type identityRolesV1User_universal_d_RemoveMemberResponse = RemoveMemberResponse;
  type identityRolesV1User_universal_d_GetUsersRequest = GetUsersRequest;
  type identityRolesV1User_universal_d_GetUsersResponse = GetUsersResponse;
  type identityRolesV1User_universal_d_GetScopesRequest = GetScopesRequest;
  type identityRolesV1User_universal_d_GetScopesResponse = GetScopesResponse;
  type identityRolesV1User_universal_d_ScopeArea = ScopeArea;
  type identityRolesV1User_universal_d_PermissionScope = PermissionScope;
  type identityRolesV1User_universal_d_ScopeLevel = ScopeLevel;
  const identityRolesV1User_universal_d_ScopeLevel: typeof ScopeLevel;
  type identityRolesV1User_universal_d_Visibility = Visibility;
  const identityRolesV1User_universal_d_Visibility: typeof Visibility;
  type identityRolesV1User_universal_d_GetPeopleRequest = GetPeopleRequest;
  type identityRolesV1User_universal_d_PeopleResource = PeopleResource;
  type identityRolesV1User_universal_d_PeopleResourceResourceTypeOneOf = PeopleResourceResourceTypeOneOf;
  type identityRolesV1User_universal_d_FolderResource = FolderResource;
  type identityRolesV1User_universal_d_PeopleType = PeopleType;
  const identityRolesV1User_universal_d_PeopleType: typeof PeopleType;
  type identityRolesV1User_universal_d_GetPeopleResponse = GetPeopleResponse;
  type identityRolesV1User_universal_d_People = People;
  type identityRolesV1User_universal_d_Person = Person;
  type identityRolesV1User_universal_d_PersonPersonOneOf = PersonPersonOneOf;
  type identityRolesV1User_universal_d_TeamMember = TeamMember;
  type identityRolesV1User_universal_d_GetTeamV2Response = GetTeamV2Response;
  type identityRolesV1User_universal_d_GetTeamInvitesRequest = GetTeamInvitesRequest;
  type identityRolesV1User_universal_d_GetTeamInvitesResponse = GetTeamInvitesResponse;
  type identityRolesV1User_universal_d_Invite = Invite;
  type identityRolesV1User_universal_d_ApiInviteAssignment = ApiInviteAssignment;
  type identityRolesV1User_universal_d_GetPoliciesRequest = GetPoliciesRequest;
  type identityRolesV1User_universal_d_AreasFilter = AreasFilter;
  type identityRolesV1User_universal_d_RoleLevel = RoleLevel;
  const identityRolesV1User_universal_d_RoleLevel: typeof RoleLevel;
  type identityRolesV1User_universal_d_GetPoliciesResponse = GetPoliciesResponse;
  type identityRolesV1User_universal_d_SearchTeamRequest = SearchTeamRequest;
  type identityRolesV1User_universal_d_Ordering = Ordering;
  type identityRolesV1User_universal_d_OrderField = OrderField;
  const identityRolesV1User_universal_d_OrderField: typeof OrderField;
  type identityRolesV1User_universal_d_Direction = Direction;
  const identityRolesV1User_universal_d_Direction: typeof Direction;
  type identityRolesV1User_universal_d_FacetType = FacetType;
  const identityRolesV1User_universal_d_FacetType: typeof FacetType;
  type identityRolesV1User_universal_d_SearchTeamResponse = SearchTeamResponse;
  type identityRolesV1User_universal_d_Facet = Facet;
  type identityRolesV1User_universal_d_FacetValue = FacetValue;
  type identityRolesV1User_universal_d_TeamMemberV3 = TeamMemberV3;
  type identityRolesV1User_universal_d_TeamMemberV3MembersOneOf = TeamMemberV3MembersOneOf;
  type identityRolesV1User_universal_d_UserV3 = UserV3;
  type identityRolesV1User_universal_d_AssignmentV3 = AssignmentV3;
  type identityRolesV1User_universal_d_AssignedSubject = AssignedSubject;
  type identityRolesV1User_universal_d_InviteV3 = InviteV3;
  type identityRolesV1User_universal_d_InviteAssignmentV3 = InviteAssignmentV3;
  type identityRolesV1User_universal_d_GetRolesRequest = GetRolesRequest;
  type identityRolesV1User_universal_d_GetRolesResponse = GetRolesResponse;
  type identityRolesV1User_universal_d_PredefinedRolesArea = PredefinedRolesArea;
  type identityRolesV1User_universal_d_PredefinedRoleV2 = PredefinedRoleV2;
  type identityRolesV1User_universal_d_RoleLevelRestriction = RoleLevelRestriction;
  const identityRolesV1User_universal_d_RoleLevelRestriction: typeof RoleLevelRestriction;
  type identityRolesV1User_universal_d_EditorType = EditorType;
  const identityRolesV1User_universal_d_EditorType: typeof EditorType;
  type identityRolesV1User_universal_d_RoleVisibility = RoleVisibility;
  const identityRolesV1User_universal_d_RoleVisibility: typeof RoleVisibility;
  type identityRolesV1User_universal_d_CustomRole = CustomRole;
  type identityRolesV1User_universal_d_GetRolesInfoRequest = GetRolesInfoRequest;
  type identityRolesV1User_universal_d_RolesInfoFilter = RolesInfoFilter;
  type identityRolesV1User_universal_d_GetRolesInfoResponse = GetRolesInfoResponse;
  type identityRolesV1User_universal_d_RoleInfo = RoleInfo;
  type identityRolesV1User_universal_d_CreateCustomRoleRequest = CreateCustomRoleRequest;
  type identityRolesV1User_universal_d_PolicyType = PolicyType;
  const identityRolesV1User_universal_d_PolicyType: typeof PolicyType;
  type identityRolesV1User_universal_d_PolicyStatement = PolicyStatement;
  type identityRolesV1User_universal_d_Effect = Effect;
  const identityRolesV1User_universal_d_Effect: typeof Effect;
  type identityRolesV1User_universal_d_CreateCustomRoleResponse = CreateCustomRoleResponse;
  type identityRolesV1User_universal_d_ChangeRoleV2Request = ChangeRoleV2Request;
  type identityRolesV1User_universal_d_ChangeRoleV2Response = ChangeRoleV2Response;
  type identityRolesV1User_universal_d_UpdateTeamMemberAssignmentsRequest = UpdateTeamMemberAssignmentsRequest;
  type identityRolesV1User_universal_d_UpdateTeamMemberAssignmentsResponse = UpdateTeamMemberAssignmentsResponse;
  type identityRolesV1User_universal_d_GetSubjectsAssignmentsRequest = GetSubjectsAssignmentsRequest;
  type identityRolesV1User_universal_d_GetSubjectsAssignmentsResponse = GetSubjectsAssignmentsResponse;
  type identityRolesV1User_universal_d_SubjectAssignments = SubjectAssignments;
  const identityRolesV1User_universal_d_getTeam: typeof getTeam;
  type identityRolesV1User_universal_d_GetTeamOptions = GetTeamOptions;
  const identityRolesV1User_universal_d_removeMember: typeof removeMember;
  const identityRolesV1User_universal_d_users: typeof users;
  type identityRolesV1User_universal_d_UsersOptions = UsersOptions;
  const identityRolesV1User_universal_d_getScopes: typeof getScopes;
  type identityRolesV1User_universal_d_GetScopesOptions = GetScopesOptions;
  const identityRolesV1User_universal_d_getPeople: typeof getPeople;
  type identityRolesV1User_universal_d_GetPeopleOptions = GetPeopleOptions;
  const identityRolesV1User_universal_d_getTeamV2: typeof getTeamV2;
  type identityRolesV1User_universal_d_GetTeamV2Options = GetTeamV2Options;
  const identityRolesV1User_universal_d_getTeamInvites: typeof getTeamInvites;
  type identityRolesV1User_universal_d_GetTeamInvitesOptions = GetTeamInvitesOptions;
  const identityRolesV1User_universal_d_getPolicies: typeof getPolicies;
  type identityRolesV1User_universal_d_GetPoliciesOptions = GetPoliciesOptions;
  const identityRolesV1User_universal_d_searchTeam: typeof searchTeam;
  type identityRolesV1User_universal_d_SearchTeamOptions = SearchTeamOptions;
  const identityRolesV1User_universal_d_getRoles: typeof getRoles;
  type identityRolesV1User_universal_d_GetRolesOptions = GetRolesOptions;
  const identityRolesV1User_universal_d_getRolesInfo: typeof getRolesInfo;
  type identityRolesV1User_universal_d_GetRolesInfoOptions = GetRolesInfoOptions;
  const identityRolesV1User_universal_d_createCustomRole: typeof createCustomRole;
  const identityRolesV1User_universal_d_changeRoleV2: typeof changeRoleV2;
  type identityRolesV1User_universal_d_ChangeRoleV2Options = ChangeRoleV2Options;
  const identityRolesV1User_universal_d_updateTeamMemberAssignments: typeof updateTeamMemberAssignments;
  type identityRolesV1User_universal_d_UpdateTeamMemberAssignmentsOptions = UpdateTeamMemberAssignmentsOptions;
  const identityRolesV1User_universal_d_getSubjectsAssignments: typeof getSubjectsAssignments;
  type identityRolesV1User_universal_d_GetSubjectsAssignmentsOptions = GetSubjectsAssignmentsOptions;
  namespace identityRolesV1User_universal_d {
    export {
      User$1 as User,
      Name$1 as Name,
      Assignment$1 as Assignment,
      AssignedPolicy$1 as AssignedPolicy,
      Restriction$1 as Restriction,
      RestrictionRestrictionsOneOf$1 as RestrictionRestrictionsOneOf,
      identityRolesV1User_universal_d_ApiResource as ApiResource,
      ResourceType$1 as ResourceType,
      Conditions$1 as Conditions,
      identityRolesV1User_universal_d_ApiCondition as ApiCondition,
      ConditionAttributeType$1 as ConditionAttributeType,
      SiteRestriction$1 as SiteRestriction,
      CompanionResource$1 as CompanionResource,
      Subject$1 as Subject,
      SubjectType$1 as SubjectType,
      SubjectContext$1 as SubjectContext,
      SubjectContextType$1 as SubjectContextType,
      identityRolesV1User_universal_d_GetTeamRequest as GetTeamRequest,
      identityRolesV1User_universal_d_Paging as Paging,
      identityRolesV1User_universal_d_GetTeamResponse as GetTeamResponse,
      identityRolesV1User_universal_d_AccountInvite as AccountInvite,
      InviteStatus$1 as InviteStatus,
      identityRolesV1User_universal_d_InviteResourceAssignment as InviteResourceAssignment,
      identityRolesV1User_universal_d_InviteAssignment as InviteAssignment,
      identityRolesV1User_universal_d_FullNameResource as FullNameResource,
      identityRolesV1User_universal_d_FullNameResourceResourceContextOneOf as FullNameResourceResourceContextOneOf,
      identityRolesV1User_universal_d_SiteResourceContext as SiteResourceContext,
      identityRolesV1User_universal_d_AccountResourceContext as AccountResourceContext,
      identityRolesV1User_universal_d_OrganizationResourceContext as OrganizationResourceContext,
      Resource$1 as Resource,
      identityRolesV1User_universal_d_PolicyCondition as PolicyCondition,
      identityRolesV1User_universal_d_ConditionType as ConditionType,
      identityRolesV1User_universal_d_ConditionTypeOfOneOf as ConditionTypeOfOneOf,
      identityRolesV1User_universal_d_SimpleCondition as SimpleCondition,
      identityRolesV1User_universal_d_SimpleConditionValue as SimpleConditionValue,
      identityRolesV1User_universal_d_SimpleConditionValueValueOneOf as SimpleConditionValueValueOneOf,
      identityRolesV1User_universal_d_SimpleConditionOperator as SimpleConditionOperator,
      identityRolesV1User_universal_d_JoinedCondition as JoinedCondition,
      identityRolesV1User_universal_d_JoinedConditionOperator as JoinedConditionOperator,
      identityRolesV1User_universal_d_EnvironmentCondition as EnvironmentCondition,
      identityRolesV1User_universal_d_EnvironmentConditionConditionOneOf as EnvironmentConditionConditionOneOf,
      identityRolesV1User_universal_d_ExperimentCondition as ExperimentCondition,
      Condition$1 as Condition,
      identityRolesV1User_universal_d_ConditionOperator as ConditionOperator,
      identityRolesV1User_universal_d_ConditionOperatorOperatorsOneOf as ConditionOperatorOperatorsOneOf,
      identityRolesV1User_universal_d_EqualOperator as EqualOperator,
      identityRolesV1User_universal_d_ConditionValue as ConditionValue,
      identityRolesV1User_universal_d_ConditionValueValueOneOf as ConditionValueValueOneOf,
      identityRolesV1User_universal_d_LikeOperator as LikeOperator,
      identityRolesV1User_universal_d_ExperimentOperator as ExperimentOperator,
      identityRolesV1User_universal_d_DependOnOperator as DependOnOperator,
      AccountInfo$1 as AccountInfo,
      identityRolesV1User_universal_d_ApiPolicy as ApiPolicy,
      PredefinedRoles$1 as PredefinedRoles,
      PredefinedRole$1 as PredefinedRole,
      Role$1 as Role,
      identityRolesV1User_universal_d_ChangeRoleRequest as ChangeRoleRequest,
      identityRolesV1User_universal_d_ChangeRoleResponse as ChangeRoleResponse,
      identityRolesV1User_universal_d_RemoveMemberRequest as RemoveMemberRequest,
      identityRolesV1User_universal_d_RemoveMemberResponse as RemoveMemberResponse,
      identityRolesV1User_universal_d_GetUsersRequest as GetUsersRequest,
      identityRolesV1User_universal_d_GetUsersResponse as GetUsersResponse,
      identityRolesV1User_universal_d_GetScopesRequest as GetScopesRequest,
      identityRolesV1User_universal_d_GetScopesResponse as GetScopesResponse,
      identityRolesV1User_universal_d_ScopeArea as ScopeArea,
      identityRolesV1User_universal_d_PermissionScope as PermissionScope,
      identityRolesV1User_universal_d_ScopeLevel as ScopeLevel,
      identityRolesV1User_universal_d_Visibility as Visibility,
      identityRolesV1User_universal_d_GetPeopleRequest as GetPeopleRequest,
      identityRolesV1User_universal_d_PeopleResource as PeopleResource,
      identityRolesV1User_universal_d_PeopleResourceResourceTypeOneOf as PeopleResourceResourceTypeOneOf,
      identityRolesV1User_universal_d_FolderResource as FolderResource,
      identityRolesV1User_universal_d_PeopleType as PeopleType,
      identityRolesV1User_universal_d_GetPeopleResponse as GetPeopleResponse,
      identityRolesV1User_universal_d_People as People,
      identityRolesV1User_universal_d_Person as Person,
      identityRolesV1User_universal_d_PersonPersonOneOf as PersonPersonOneOf,
      Contributor$1 as Contributor,
      PersonMetaData$1 as PersonMetaData,
      identityRolesV1User_universal_d_TeamMember as TeamMember,
      identityRolesV1User_universal_d_GetTeamV2Response as GetTeamV2Response,
      identityRolesV1User_universal_d_GetTeamInvitesRequest as GetTeamInvitesRequest,
      identityRolesV1User_universal_d_GetTeamInvitesResponse as GetTeamInvitesResponse,
      identityRolesV1User_universal_d_Invite as Invite,
      identityRolesV1User_universal_d_ApiInviteAssignment as ApiInviteAssignment,
      identityRolesV1User_universal_d_GetPoliciesRequest as GetPoliciesRequest,
      identityRolesV1User_universal_d_AreasFilter as AreasFilter,
      identityRolesV1User_universal_d_RoleLevel as RoleLevel,
      identityRolesV1User_universal_d_GetPoliciesResponse as GetPoliciesResponse,
      identityRolesV1User_universal_d_SearchTeamRequest as SearchTeamRequest,
      identityRolesV1User_universal_d_Ordering as Ordering,
      identityRolesV1User_universal_d_OrderField as OrderField,
      identityRolesV1User_universal_d_Direction as Direction,
      identityRolesV1User_universal_d_FacetType as FacetType,
      identityRolesV1User_universal_d_SearchTeamResponse as SearchTeamResponse,
      identityRolesV1User_universal_d_Facet as Facet,
      identityRolesV1User_universal_d_FacetValue as FacetValue,
      identityRolesV1User_universal_d_TeamMemberV3 as TeamMemberV3,
      identityRolesV1User_universal_d_TeamMemberV3MembersOneOf as TeamMemberV3MembersOneOf,
      identityRolesV1User_universal_d_UserV3 as UserV3,
      identityRolesV1User_universal_d_AssignmentV3 as AssignmentV3,
      identityRolesV1User_universal_d_AssignedSubject as AssignedSubject,
      identityRolesV1User_universal_d_InviteV3 as InviteV3,
      identityRolesV1User_universal_d_InviteAssignmentV3 as InviteAssignmentV3,
      identityRolesV1User_universal_d_GetRolesRequest as GetRolesRequest,
      identityRolesV1User_universal_d_GetRolesResponse as GetRolesResponse,
      identityRolesV1User_universal_d_PredefinedRolesArea as PredefinedRolesArea,
      identityRolesV1User_universal_d_PredefinedRoleV2 as PredefinedRoleV2,
      identityRolesV1User_universal_d_RoleLevelRestriction as RoleLevelRestriction,
      identityRolesV1User_universal_d_EditorType as EditorType,
      identityRolesV1User_universal_d_RoleVisibility as RoleVisibility,
      identityRolesV1User_universal_d_CustomRole as CustomRole,
      identityRolesV1User_universal_d_GetRolesInfoRequest as GetRolesInfoRequest,
      identityRolesV1User_universal_d_RolesInfoFilter as RolesInfoFilter,
      identityRolesV1User_universal_d_GetRolesInfoResponse as GetRolesInfoResponse,
      identityRolesV1User_universal_d_RoleInfo as RoleInfo,
      identityRolesV1User_universal_d_CreateCustomRoleRequest as CreateCustomRoleRequest,
      Policy$1 as Policy,
      identityRolesV1User_universal_d_PolicyType as PolicyType,
      identityRolesV1User_universal_d_PolicyStatement as PolicyStatement,
      identityRolesV1User_universal_d_Effect as Effect,
      identityRolesV1User_universal_d_CreateCustomRoleResponse as CreateCustomRoleResponse,
      identityRolesV1User_universal_d_ChangeRoleV2Request as ChangeRoleV2Request,
      identityRolesV1User_universal_d_ChangeRoleV2Response as ChangeRoleV2Response,
      identityRolesV1User_universal_d_UpdateTeamMemberAssignmentsRequest as UpdateTeamMemberAssignmentsRequest,
      identityRolesV1User_universal_d_UpdateTeamMemberAssignmentsResponse as UpdateTeamMemberAssignmentsResponse,
      identityRolesV1User_universal_d_GetSubjectsAssignmentsRequest as GetSubjectsAssignmentsRequest,
      identityRolesV1User_universal_d_GetSubjectsAssignmentsResponse as GetSubjectsAssignmentsResponse,
      identityRolesV1User_universal_d_SubjectAssignments as SubjectAssignments,
      identityRolesV1User_universal_d_getTeam as getTeam,
      identityRolesV1User_universal_d_GetTeamOptions as GetTeamOptions,
      changeRole$1 as changeRole,
      ChangeRoleOptions$1 as ChangeRoleOptions,
      identityRolesV1User_universal_d_removeMember as removeMember,
      identityRolesV1User_universal_d_users as users,
      identityRolesV1User_universal_d_UsersOptions as UsersOptions,
      identityRolesV1User_universal_d_getScopes as getScopes,
      identityRolesV1User_universal_d_GetScopesOptions as GetScopesOptions,
      identityRolesV1User_universal_d_getPeople as getPeople,
      identityRolesV1User_universal_d_GetPeopleOptions as GetPeopleOptions,
      identityRolesV1User_universal_d_getTeamV2 as getTeamV2,
      identityRolesV1User_universal_d_GetTeamV2Options as GetTeamV2Options,
      identityRolesV1User_universal_d_getTeamInvites as getTeamInvites,
      identityRolesV1User_universal_d_GetTeamInvitesOptions as GetTeamInvitesOptions,
      identityRolesV1User_universal_d_getPolicies as getPolicies,
      identityRolesV1User_universal_d_GetPoliciesOptions as GetPoliciesOptions,
      identityRolesV1User_universal_d_searchTeam as searchTeam,
      identityRolesV1User_universal_d_SearchTeamOptions as SearchTeamOptions,
      identityRolesV1User_universal_d_getRoles as getRoles,
      identityRolesV1User_universal_d_GetRolesOptions as GetRolesOptions,
      identityRolesV1User_universal_d_getRolesInfo as getRolesInfo,
      identityRolesV1User_universal_d_GetRolesInfoOptions as GetRolesInfoOptions,
      identityRolesV1User_universal_d_createCustomRole as createCustomRole,
      identityRolesV1User_universal_d_changeRoleV2 as changeRoleV2,
      identityRolesV1User_universal_d_ChangeRoleV2Options as ChangeRoleV2Options,
      identityRolesV1User_universal_d_updateTeamMemberAssignments as updateTeamMemberAssignments,
      identityRolesV1User_universal_d_UpdateTeamMemberAssignmentsOptions as UpdateTeamMemberAssignmentsOptions,
      identityRolesV1User_universal_d_getSubjectsAssignments as getSubjectsAssignments,
      identityRolesV1User_universal_d_GetSubjectsAssignmentsOptions as GetSubjectsAssignmentsOptions,
    };
  }
  
  interface Contributor {
      /** Contributor's metadata. */
      metaData?: PersonMetaData;
      /** Whether the contributor account is a team account. */
      isTeam?: boolean | null;
      /** Date that the contributor joined the site. */
      joinedAt?: Date | null;
      /** Email address that received the invite. */
      invitedEmail?: string | null;
      /** Whether the contributor account is a client account. */
      isClient?: boolean | null;
      /**
       * Contributor's user ID.
       * @readonly
       */
      _id?: string;
  }
  interface PersonMetaData {
      /** Contributor's account ID. */
      _id?: string;
      /** Contributor's full name. */
      fullName?: string | null;
      /** URL for contributor's profile image. */
      imageUrl?: string | null;
      /** Contributor's email address. */
      email?: string | null;
      /** Contributor's access to assets and their assigned role (`policy`) for that asset. */
      assignments?: Assignment[];
  }
  interface Assignment {
      /** Role assigned to the user. */
      policy?: AssignedPolicy;
      /** Unique ID for this specific assignment. */
      assignmentId?: string;
      /**
       * The asset a user is assigned access to in an assignment, including any restrictions to their access. When empty, the role covers all assets, with no restrictions to specific sites or folders.
       * @internal
       */
      restrictions?: Restriction;
      /** Identity assigned to the asset in an assignment, referred to as subject. Supported subjects include user IDs, account IDs, and app IDs. */
      subject?: Subject;
  }
  interface AssignedPolicy {
      /** Role ID. */
      policyId?: string;
      /** Role title. */
      title?: string | null;
      /** Role description. */
      description?: string | null;
  }
  interface Restriction extends RestrictionRestrictionsOneOf {
      /**
       * Deprecated.
       * @deprecated
       */
      resource?: Resource;
      /** List of conditions restricting the user's access. Currently only folder conditions are supported. */
      conditions?: Conditions;
      /** Site where the assignment restrictions apply. */
      site?: SiteRestriction;
  }
  /** @oneof */
  interface RestrictionRestrictionsOneOf {
      /**
       * Deprecated.
       * @deprecated
       */
      resource?: Resource;
      /** List of conditions restricting the user's access. Currently only folder conditions are supported. */
      conditions?: Conditions;
      /** Site where the assignment restrictions apply. */
      site?: SiteRestriction;
  }
  interface Resource {
      /** Resource type. */
      resourceType?: ResourceType;
      /** Resource ID. */
      _id?: string;
      value?: string | null;
  }
  enum ResourceType {
      UNKNOWN_RESOURCE_TYPE = "UNKNOWN_RESOURCE_TYPE",
      SITE = "SITE"
  }
  interface Conditions {
      /** List of conditions. */
      conditions?: Condition[];
  }
  interface Condition {
      /** Condition type. */
      conditionType?: ConditionAttributeType;
      /** Condition ID. */
      _id?: string;
      /** Expected value of the condition. When `conditionType` = "FOLDER", this is the folder path. */
      value?: string | null;
  }
  enum ConditionAttributeType {
      UNKNOWN_CONDITION_TYPE = "UNKNOWN_CONDITION_TYPE",
      FOLDER = "FOLDER"
  }
  interface SiteRestriction {
      /** Site ID. */
      _id?: string;
      /** Site name. */
      value?: string | null;
      /**
       * A specific asset (referred to as a resource) inside the site, if relevant. For example, a specific dashboard page.
       * @internal
       */
      resource?: CompanionResource;
  }
  interface CompanionResource {
      /** Asset ID (referred to here as resource ID). */
      _id?: string;
      /** Asset type (referred to here as resource type). as predefined in the authorization system */
      resourceType?: string;
  }
  interface Subject {
      /** ID of identity assigned to the asset. */
      _id?: string;
      /** Type of identity assigned to the asset. Supported subject types include user IDs, account IDs, and app IDs. */
      subjectType?: SubjectType;
      /** Context of identity assigned to the asset. For example, a `subjectType` = `USER` will have `context` = `ACCOUNT`. */
      context?: SubjectContext;
  }
  enum SubjectType {
      UNKNOWN = "UNKNOWN",
      ACCOUNT = "ACCOUNT",
      USER = "USER",
      USER_GROUP = "USER_GROUP",
      MEMBER_GROUP = "MEMBER_GROUP",
      VISITOR_GROUP = "VISITOR_GROUP",
      EXTERNAL_APP = "EXTERNAL_APP",
      ACCOUNT_GROUP = "ACCOUNT_GROUP",
      WIX_APP = "WIX_APP"
  }
  interface SubjectContext {
      _id?: string;
      contextType?: SubjectContextType;
  }
  enum SubjectContextType {
      UNKNOWN_CTX = "UNKNOWN_CTX",
      ORG_CTX = "ORG_CTX",
      ACCOUNT_CTX = "ACCOUNT_CTX"
  }
  interface GetAppContributorsRequest {
      appId: string;
      /** The locale of the request. Defaults to en-us. */
      locale?: string | null;
  }
  interface GetAppContributorsResponse {
      contributors?: Contributor[];
      invites?: AppInvite[];
  }
  interface AppInvite {
      /** @readonly */
      _id?: string;
      /** TODO: amitis - remove this comment after the next merge */
      destEmail?: string;
      /** @readonly */
      status?: string;
      /** @readonly */
      acceptLink?: string;
      invitePurpose?: string | null;
      policies?: AssignedPolicy[];
      /** @readonly */
      expirationDate?: Date | null;
      /** @readonly */
      dateCreated?: Date | null;
      /** @readonly */
      dateUpdated?: Date | null;
  }
  interface GetSiteContributorsRequest {
      /** The locale of the request. Defaults to en-us */
      locale?: string | null;
  }
  interface GetSiteContributorsResponse {
      users?: User[];
      teams?: Team[];
      invites?: SiteInvite[];
      policies?: Policy[];
      permissions?: string[];
      userId?: string;
      loggedInAccountId?: string;
      pendingOwner?: PendingOwner;
      contributorLimit?: ContributorLimit;
      predefinedRoles?: PredefinedRoles;
  }
  interface User {
      /** User ID. */
      _id?: string;
      /**
       * Deprecated.
       * @deprecated
       */
      roles?: string[];
      /** User's email address. */
      email?: string;
      /** User's name. */
      name?: Name;
      /** URL to user's profile image, when provided. */
      profileImage?: string | null;
      /** Date the user joined the team. */
      joinedTeamAt?: Date | null;
      /**
       * Deprecated.
       * @deprecated
       */
      policyIds?: string[];
      /** Resources the user can access. */
      assignments?: Assignment[];
  }
  interface Name {
      /** User's first name. */
      firstName?: string;
      /** User's last name. */
      lastName?: string;
  }
  interface Team {
      accountId?: string;
      accountInfo?: AccountInfo;
      policyIds?: string[];
      joinedAt?: Date | null;
  }
  interface AccountInfo {
      accountName?: string;
      accountImage?: string;
      isTeam?: boolean;
  }
  interface SiteInvite {
      /**
       * Invite ID.
       * @readonly
       */
      _id?: string;
      /**
       * Site ID the user is invited to as a collaborator.
       * @readonly
       */
      siteId?: string;
      /** Email address where the invite was sent. */
      email?: string;
      /** Role IDs included in the invite. */
      policyIds?: string[];
      /**
       * Deprecated. Use `inviterAccountId`.
       * @readonly
       * @deprecated
       */
      inviterId?: string;
      /**
       * Invite Status.
       *
       * Supported values:
       * - **Pending:** The invite has been sent and is valid, waiting for the user's response.
       * - **Used:** The invite has been accepted.
       * - **Deleted:** The invite has been deleted or revoked.
       * - **Declined:** The user declined the invite.
       * - **Expired:** The invite has expired without being accepted.
       */
      status?: InviteStatus;
      /** Link to accept the invite. */
      acceptLink?: string;
      /**
       * Inviting account ID.
       * @readonly
       */
      inviterAccountId?: string;
      /**
       * Account ID that accepted the invite. Populated only once the invite is accepted.
       * @readonly
       */
      acceptedByAccountId?: string | null;
      /** Date the invite was created. */
      dateCreated?: Date | null;
      /** User's Wix Bookings staff ID, if relevant. */
      staffId?: string | null;
      /**
       * Brand domain.
       * @internal
       */
      brandDomain?: string | null;
      /**
       * Optional field representing the purpose of the invite
       * @internal
       */
      invitePurpose?: string | null;
      /** Invite expiration date */
      expirationDate?: Date | null;
  }
  /** Invite status stating whether the invite was accepted, waiting to be accepted, deleted etc.. */
  enum InviteStatus {
      Pending = "Pending",
      Used = "Used",
      Deleted = "Deleted",
      Declined = "Declined",
      Expired = "Expired"
  }
  interface Policy {
      _id?: string;
      description?: string | null;
      name?: string | null;
      isCustom?: boolean;
      scopes?: string[];
  }
  interface PendingOwner {
      email?: string;
      expirationDate?: Date | null;
      acceptLink?: string;
  }
  interface ContributorLimit {
      contributorLimit?: number;
  }
  interface PredefinedRoles {
      roles?: PredefinedRole[];
  }
  interface PredefinedRole {
      titleKey?: string;
      roles?: Role[];
      title?: string | null;
      areaId?: string;
  }
  interface Role {
      _id?: string;
      deprecatedKey?: string;
      /** @deprecated */
      titleKey?: string;
      /** @deprecated */
      descriptionKey?: string;
      deprecated?: boolean;
      restrictFromLevel?: string;
      experiments?: string[];
      appDefIds?: string[];
      title?: string | null;
      description?: string | null;
      isCustom?: boolean;
      scopes?: string[];
      availableResourceTypes?: ResourceType[];
      availableConditions?: ConditionAttributeType[];
      limitToEditorTypes?: string[];
  }
  interface GetSiteContributorsV2Request {
      /** The locale of the request. Defaults to en-us. */
      locale?: string | null;
      /**
       * The set of desired fields.
       * @internal
       */
      fields?: string[];
  }
  interface GetSiteContributorsV2Response {
      /** List of contributors of the given site. */
      contributors?: Contributor[];
      /** List of invites to contribute to the given site. */
      invites?: SiteInvite[];
      /** Quota information for contributors on the given site. */
      contributorsQuota?: ContributorsQuota;
  }
  interface ContributorsQuota extends ContributorsQuotaOptionsOneOf {
      /** Limited contributors quota details. */
      limitedOptions?: LimitedOptions;
      /** Type of contributors quota */
      type?: Type;
  }
  /** @oneof */
  interface ContributorsQuotaOptionsOneOf {
      /** Limited contributors quota details. */
      limitedOptions?: LimitedOptions;
  }
  /** Enum to represent different types of contributors quota. */
  enum Type {
      UNKNOWN = "UNKNOWN",
      LIMITED = "LIMITED",
      UNLIMITED = "UNLIMITED"
  }
  /** Details for a limited contributors quota. */
  interface LimitedOptions {
      /** Maximum number of contributors allowed. */
      limit?: number;
      /** Number of accepted or pending invitations. */
      used?: number;
  }
  interface HandleSiteTransferRequest {
      originalOwnerAccountId?: string;
      newOwnerAccountId?: string;
      metaSiteId?: string;
      keepOriginalOwnerAsContributor?: boolean;
  }
  interface HandleSiteTransferResponse {
  }
  interface GetCurrentUserRolesRequest {
      /** The locale of the request. Defaults to en-us */
      locale?: string | null;
  }
  interface GetCurrentUserRolesResponse {
      roles?: LocalizedRole[];
  }
  interface LocalizedRole {
      name?: string;
      description?: string | null;
  }
  interface BulkGetUserRolesOnSiteRequest {
      users?: UserSubject[];
      /** The locale of the request. Defaults to en-us */
      locale?: string | null;
  }
  interface UserSubject {
      userId?: string;
      accountId?: string;
  }
  interface BulkGetUserRolesOnSiteResponse {
      userRoles?: UserLocalizedRoles[];
  }
  interface UserLocalizedRoles {
      user?: UserSubject;
      roles?: LocalizedRole[];
  }
  interface BulkValidateEmailInviteEligibilityRequest {
      /** List of emails to be checked for invite eligibility. */
      emails?: string[];
  }
  interface BulkValidateEmailInviteEligibilityResponse {
      /** List of email invite eligibility results. */
      emailsEligibility?: EmailInviteEligibility[];
  }
  interface EmailInviteEligibility {
      /** The email address being checked. */
      email?: string;
      /** Whether the email is eligible for an invite. */
      eligible?: boolean;
  }
  interface ChangeContributorRoleRequest {
      /** Contributor's account ID. */
      accountId: string;
      /** New roles to assign to the contributor on the site. */
      newRoles: SiteRoleAssignment[];
  }
  interface SiteRoleAssignment {
      /** Role ID. Sometimes referred to as policy ID. See [Roles and Permissions](https://support.wix.com/en/article/roles-permissions-overview) for a list of available roles. */
      roleId?: string;
      /**
       * Assignment ID mapping the role to the contributor on the site.
       * @readonly
       */
      assignmentId?: string;
  }
  interface ChangeContributorRoleResponse {
      /** New roles assigned to the contributor on the site. */
      newAssignedRoles?: SiteRoleAssignment[];
  }
  interface QuerySiteContributorsRequest {
      filter?: QuerySiteContributorsFilter;
      /** @internal */
      fieldSet?: FieldSet[];
  }
  interface QuerySiteContributorsFilter {
      /** Role IDs (referred to here as policy IDs) to return. See [Roles and Permissions](https://support.wix.com/en/article/roles-permissions-overview) for available roles. */
      policyIds?: string[];
  }
  enum FieldSet {
      UNKNOWN = "UNKNOWN",
      /** Include only `account_id` and `account_owner_id` fields. */
      META_DATA = "META_DATA"
  }
  interface QuerySiteContributorsResponse {
      /** List of site contributors. */
      contributors?: ContributorV2[];
  }
  interface ContributorV2 {
      /** Contributor's account ID. */
      accountId?: string | null;
      /** User ID of the owner of the account that the contributor has joined. */
      accountOwnerId?: string | null;
  }
  interface GetContributorsQuotaRequest {
  }
  interface GetContributorsQuotaResponse {
      /** Quota information for contributors on the given site. */
      contributorsQuota?: ContributorsQuota;
  }
  /** @internal
   * @documentationMaturity preview
   * @requiredField appId
   * @permissionId DEV_CENTER.GET_APP_CONTRIBUTORS
   * @adminMethod
   */
  function getAppContributors(appId: string, options?: GetAppContributorsOptions): Promise<GetAppContributorsResponse>;
  interface GetAppContributorsOptions {
      /** The locale of the request. Defaults to en-us. */
      locale?: string | null;
  }
  /** @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function getSiteContributors(options?: GetSiteContributorsOptions): Promise<GetSiteContributorsResponse>;
  interface GetSiteContributorsOptions {
      /** The locale of the request. Defaults to en-us */
      locale?: string | null;
  }
  /**
   * returns a list of all the contributors + invites to be contributors of a given meta site ID taken from the
   * context.
   * @internal
   * @documentationMaturity preview
   * @permissionId site-users.view-users
   * @adminMethod
   */
  function getSiteContributorsV2(options?: GetSiteContributorsV2Options): Promise<GetSiteContributorsV2Response>;
  interface GetSiteContributorsV2Options {
      /** The locale of the request. Defaults to en-us. */
      locale?: string | null;
      /**
       * The set of desired fields.
       * @internal
       */
      fields?: string[];
  }
  /** @internal
   * @documentationMaturity preview
   * @permissionId SITE_ROLES.HANDLE_SITE_TRANSFER
   * @adminMethod
   */
  function handleSiteTransfer(options?: HandleSiteTransferOptions): Promise<void>;
  interface HandleSiteTransferOptions {
      originalOwnerAccountId?: string;
      newOwnerAccountId?: string;
      metaSiteId?: string;
      keepOriginalOwnerAsContributor?: boolean;
  }
  /** @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function getCurrentUserRoles(options?: GetCurrentUserRolesOptions): Promise<GetCurrentUserRolesResponse>;
  interface GetCurrentUserRolesOptions {
      /** The locale of the request. Defaults to en-us */
      locale?: string | null;
  }
  /**
   * Get a list of roles (localized) for each user in the request on a specific site taken from aspects.
   * @internal
   * @documentationMaturity preview
   * @permissionId SITE_ROLES.BULK_READ
   * @adminMethod
   */
  function bulkGetUserRolesOnSite(options?: BulkGetUserRolesOnSiteOptions): Promise<BulkGetUserRolesOnSiteResponse>;
  interface BulkGetUserRolesOnSiteOptions {
      users?: UserSubject[];
      /** The locale of the request. Defaults to en-us */
      locale?: string | null;
  }
  /**
   * Validating the eligibility of email site invites in bulk.
   * @internal
   * @documentationMaturity preview
   * @permissionId SITE_ROLES.BULK_READ
   * @adminMethod
   */
  function bulkValidateEmailInviteEligibility(options?: BulkValidateEmailInviteEligibilityOptions): Promise<BulkValidateEmailInviteEligibilityResponse>;
  interface BulkValidateEmailInviteEligibilityOptions {
      /** List of emails to be checked for invite eligibility. */
      emails?: string[];
  }
  /**
   * Overrides all the roles of a contributor for the specified site.
   * @param accountId - Contributor's account ID.
   * @public
   * @documentationMaturity preview
   * @requiredField accountId
   * @requiredField options
   * @requiredField options.newRoles
   * @param options - Filter options. The `newRoles` field **must** be passed.
   * @permissionId SITE_ROLES.CHANGE_ROLE
   * @adminMethod
   */
  function changeRole(accountId: string, options: ChangeRoleOptions): Promise<ChangeContributorRoleResponse>;
  interface ChangeRoleOptions {
      /** New roles to assign to the contributor on the site. */
      newRoles: SiteRoleAssignment[];
  }
  /**
   * Retrieves a list of contributors for the specified site, given the provided filters.
   * @public
   * @documentationMaturity preview
   * @param options - Filter options.
   * @permissionId site-users.view-users
   * @adminMethod
   */
  function querySiteContributors(options?: QuerySiteContributorsOptions): Promise<QuerySiteContributorsResponse>;
  interface QuerySiteContributorsOptions {
      filter?: QuerySiteContributorsFilter;
      /** @internal */
      fieldSet?: FieldSet[];
  }
  /**
   * returns the quota information for contributors on the given site.
   * @internal
   * @documentationMaturity preview
   * @permissionId site-users.view-users
   * @adminMethod
   */
  function getContributorsQuota(): Promise<GetContributorsQuotaResponse>;
  
  type identityV1Contributor_universal_d_Contributor = Contributor;
  type identityV1Contributor_universal_d_PersonMetaData = PersonMetaData;
  type identityV1Contributor_universal_d_Assignment = Assignment;
  type identityV1Contributor_universal_d_AssignedPolicy = AssignedPolicy;
  type identityV1Contributor_universal_d_Restriction = Restriction;
  type identityV1Contributor_universal_d_RestrictionRestrictionsOneOf = RestrictionRestrictionsOneOf;
  type identityV1Contributor_universal_d_Resource = Resource;
  type identityV1Contributor_universal_d_ResourceType = ResourceType;
  const identityV1Contributor_universal_d_ResourceType: typeof ResourceType;
  type identityV1Contributor_universal_d_Conditions = Conditions;
  type identityV1Contributor_universal_d_Condition = Condition;
  type identityV1Contributor_universal_d_ConditionAttributeType = ConditionAttributeType;
  const identityV1Contributor_universal_d_ConditionAttributeType: typeof ConditionAttributeType;
  type identityV1Contributor_universal_d_SiteRestriction = SiteRestriction;
  type identityV1Contributor_universal_d_CompanionResource = CompanionResource;
  type identityV1Contributor_universal_d_Subject = Subject;
  type identityV1Contributor_universal_d_SubjectType = SubjectType;
  const identityV1Contributor_universal_d_SubjectType: typeof SubjectType;
  type identityV1Contributor_universal_d_SubjectContext = SubjectContext;
  type identityV1Contributor_universal_d_SubjectContextType = SubjectContextType;
  const identityV1Contributor_universal_d_SubjectContextType: typeof SubjectContextType;
  type identityV1Contributor_universal_d_GetAppContributorsRequest = GetAppContributorsRequest;
  type identityV1Contributor_universal_d_GetAppContributorsResponse = GetAppContributorsResponse;
  type identityV1Contributor_universal_d_AppInvite = AppInvite;
  type identityV1Contributor_universal_d_GetSiteContributorsRequest = GetSiteContributorsRequest;
  type identityV1Contributor_universal_d_GetSiteContributorsResponse = GetSiteContributorsResponse;
  type identityV1Contributor_universal_d_User = User;
  type identityV1Contributor_universal_d_Name = Name;
  type identityV1Contributor_universal_d_Team = Team;
  type identityV1Contributor_universal_d_AccountInfo = AccountInfo;
  type identityV1Contributor_universal_d_SiteInvite = SiteInvite;
  type identityV1Contributor_universal_d_InviteStatus = InviteStatus;
  const identityV1Contributor_universal_d_InviteStatus: typeof InviteStatus;
  type identityV1Contributor_universal_d_Policy = Policy;
  type identityV1Contributor_universal_d_PendingOwner = PendingOwner;
  type identityV1Contributor_universal_d_ContributorLimit = ContributorLimit;
  type identityV1Contributor_universal_d_PredefinedRoles = PredefinedRoles;
  type identityV1Contributor_universal_d_PredefinedRole = PredefinedRole;
  type identityV1Contributor_universal_d_Role = Role;
  type identityV1Contributor_universal_d_GetSiteContributorsV2Request = GetSiteContributorsV2Request;
  type identityV1Contributor_universal_d_GetSiteContributorsV2Response = GetSiteContributorsV2Response;
  type identityV1Contributor_universal_d_ContributorsQuota = ContributorsQuota;
  type identityV1Contributor_universal_d_ContributorsQuotaOptionsOneOf = ContributorsQuotaOptionsOneOf;
  type identityV1Contributor_universal_d_Type = Type;
  const identityV1Contributor_universal_d_Type: typeof Type;
  type identityV1Contributor_universal_d_LimitedOptions = LimitedOptions;
  type identityV1Contributor_universal_d_HandleSiteTransferRequest = HandleSiteTransferRequest;
  type identityV1Contributor_universal_d_HandleSiteTransferResponse = HandleSiteTransferResponse;
  type identityV1Contributor_universal_d_GetCurrentUserRolesRequest = GetCurrentUserRolesRequest;
  type identityV1Contributor_universal_d_GetCurrentUserRolesResponse = GetCurrentUserRolesResponse;
  type identityV1Contributor_universal_d_LocalizedRole = LocalizedRole;
  type identityV1Contributor_universal_d_BulkGetUserRolesOnSiteRequest = BulkGetUserRolesOnSiteRequest;
  type identityV1Contributor_universal_d_UserSubject = UserSubject;
  type identityV1Contributor_universal_d_BulkGetUserRolesOnSiteResponse = BulkGetUserRolesOnSiteResponse;
  type identityV1Contributor_universal_d_UserLocalizedRoles = UserLocalizedRoles;
  type identityV1Contributor_universal_d_BulkValidateEmailInviteEligibilityRequest = BulkValidateEmailInviteEligibilityRequest;
  type identityV1Contributor_universal_d_BulkValidateEmailInviteEligibilityResponse = BulkValidateEmailInviteEligibilityResponse;
  type identityV1Contributor_universal_d_EmailInviteEligibility = EmailInviteEligibility;
  type identityV1Contributor_universal_d_ChangeContributorRoleRequest = ChangeContributorRoleRequest;
  type identityV1Contributor_universal_d_SiteRoleAssignment = SiteRoleAssignment;
  type identityV1Contributor_universal_d_ChangeContributorRoleResponse = ChangeContributorRoleResponse;
  type identityV1Contributor_universal_d_QuerySiteContributorsRequest = QuerySiteContributorsRequest;
  type identityV1Contributor_universal_d_QuerySiteContributorsFilter = QuerySiteContributorsFilter;
  type identityV1Contributor_universal_d_FieldSet = FieldSet;
  const identityV1Contributor_universal_d_FieldSet: typeof FieldSet;
  type identityV1Contributor_universal_d_QuerySiteContributorsResponse = QuerySiteContributorsResponse;
  type identityV1Contributor_universal_d_ContributorV2 = ContributorV2;
  type identityV1Contributor_universal_d_GetContributorsQuotaRequest = GetContributorsQuotaRequest;
  type identityV1Contributor_universal_d_GetContributorsQuotaResponse = GetContributorsQuotaResponse;
  const identityV1Contributor_universal_d_getAppContributors: typeof getAppContributors;
  type identityV1Contributor_universal_d_GetAppContributorsOptions = GetAppContributorsOptions;
  const identityV1Contributor_universal_d_getSiteContributors: typeof getSiteContributors;
  type identityV1Contributor_universal_d_GetSiteContributorsOptions = GetSiteContributorsOptions;
  const identityV1Contributor_universal_d_getSiteContributorsV2: typeof getSiteContributorsV2;
  type identityV1Contributor_universal_d_GetSiteContributorsV2Options = GetSiteContributorsV2Options;
  const identityV1Contributor_universal_d_handleSiteTransfer: typeof handleSiteTransfer;
  type identityV1Contributor_universal_d_HandleSiteTransferOptions = HandleSiteTransferOptions;
  const identityV1Contributor_universal_d_getCurrentUserRoles: typeof getCurrentUserRoles;
  type identityV1Contributor_universal_d_GetCurrentUserRolesOptions = GetCurrentUserRolesOptions;
  const identityV1Contributor_universal_d_bulkGetUserRolesOnSite: typeof bulkGetUserRolesOnSite;
  type identityV1Contributor_universal_d_BulkGetUserRolesOnSiteOptions = BulkGetUserRolesOnSiteOptions;
  const identityV1Contributor_universal_d_bulkValidateEmailInviteEligibility: typeof bulkValidateEmailInviteEligibility;
  type identityV1Contributor_universal_d_BulkValidateEmailInviteEligibilityOptions = BulkValidateEmailInviteEligibilityOptions;
  const identityV1Contributor_universal_d_changeRole: typeof changeRole;
  type identityV1Contributor_universal_d_ChangeRoleOptions = ChangeRoleOptions;
  const identityV1Contributor_universal_d_querySiteContributors: typeof querySiteContributors;
  type identityV1Contributor_universal_d_QuerySiteContributorsOptions = QuerySiteContributorsOptions;
  const identityV1Contributor_universal_d_getContributorsQuota: typeof getContributorsQuota;
  namespace identityV1Contributor_universal_d {
    export {
      identityV1Contributor_universal_d_Contributor as Contributor,
      identityV1Contributor_universal_d_PersonMetaData as PersonMetaData,
      identityV1Contributor_universal_d_Assignment as Assignment,
      identityV1Contributor_universal_d_AssignedPolicy as AssignedPolicy,
      identityV1Contributor_universal_d_Restriction as Restriction,
      identityV1Contributor_universal_d_RestrictionRestrictionsOneOf as RestrictionRestrictionsOneOf,
      identityV1Contributor_universal_d_Resource as Resource,
      identityV1Contributor_universal_d_ResourceType as ResourceType,
      identityV1Contributor_universal_d_Conditions as Conditions,
      identityV1Contributor_universal_d_Condition as Condition,
      identityV1Contributor_universal_d_ConditionAttributeType as ConditionAttributeType,
      identityV1Contributor_universal_d_SiteRestriction as SiteRestriction,
      identityV1Contributor_universal_d_CompanionResource as CompanionResource,
      identityV1Contributor_universal_d_Subject as Subject,
      identityV1Contributor_universal_d_SubjectType as SubjectType,
      identityV1Contributor_universal_d_SubjectContext as SubjectContext,
      identityV1Contributor_universal_d_SubjectContextType as SubjectContextType,
      identityV1Contributor_universal_d_GetAppContributorsRequest as GetAppContributorsRequest,
      identityV1Contributor_universal_d_GetAppContributorsResponse as GetAppContributorsResponse,
      identityV1Contributor_universal_d_AppInvite as AppInvite,
      identityV1Contributor_universal_d_GetSiteContributorsRequest as GetSiteContributorsRequest,
      identityV1Contributor_universal_d_GetSiteContributorsResponse as GetSiteContributorsResponse,
      identityV1Contributor_universal_d_User as User,
      identityV1Contributor_universal_d_Name as Name,
      identityV1Contributor_universal_d_Team as Team,
      identityV1Contributor_universal_d_AccountInfo as AccountInfo,
      identityV1Contributor_universal_d_SiteInvite as SiteInvite,
      identityV1Contributor_universal_d_InviteStatus as InviteStatus,
      identityV1Contributor_universal_d_Policy as Policy,
      identityV1Contributor_universal_d_PendingOwner as PendingOwner,
      identityV1Contributor_universal_d_ContributorLimit as ContributorLimit,
      identityV1Contributor_universal_d_PredefinedRoles as PredefinedRoles,
      identityV1Contributor_universal_d_PredefinedRole as PredefinedRole,
      identityV1Contributor_universal_d_Role as Role,
      identityV1Contributor_universal_d_GetSiteContributorsV2Request as GetSiteContributorsV2Request,
      identityV1Contributor_universal_d_GetSiteContributorsV2Response as GetSiteContributorsV2Response,
      identityV1Contributor_universal_d_ContributorsQuota as ContributorsQuota,
      identityV1Contributor_universal_d_ContributorsQuotaOptionsOneOf as ContributorsQuotaOptionsOneOf,
      identityV1Contributor_universal_d_Type as Type,
      identityV1Contributor_universal_d_LimitedOptions as LimitedOptions,
      identityV1Contributor_universal_d_HandleSiteTransferRequest as HandleSiteTransferRequest,
      identityV1Contributor_universal_d_HandleSiteTransferResponse as HandleSiteTransferResponse,
      identityV1Contributor_universal_d_GetCurrentUserRolesRequest as GetCurrentUserRolesRequest,
      identityV1Contributor_universal_d_GetCurrentUserRolesResponse as GetCurrentUserRolesResponse,
      identityV1Contributor_universal_d_LocalizedRole as LocalizedRole,
      identityV1Contributor_universal_d_BulkGetUserRolesOnSiteRequest as BulkGetUserRolesOnSiteRequest,
      identityV1Contributor_universal_d_UserSubject as UserSubject,
      identityV1Contributor_universal_d_BulkGetUserRolesOnSiteResponse as BulkGetUserRolesOnSiteResponse,
      identityV1Contributor_universal_d_UserLocalizedRoles as UserLocalizedRoles,
      identityV1Contributor_universal_d_BulkValidateEmailInviteEligibilityRequest as BulkValidateEmailInviteEligibilityRequest,
      identityV1Contributor_universal_d_BulkValidateEmailInviteEligibilityResponse as BulkValidateEmailInviteEligibilityResponse,
      identityV1Contributor_universal_d_EmailInviteEligibility as EmailInviteEligibility,
      identityV1Contributor_universal_d_ChangeContributorRoleRequest as ChangeContributorRoleRequest,
      identityV1Contributor_universal_d_SiteRoleAssignment as SiteRoleAssignment,
      identityV1Contributor_universal_d_ChangeContributorRoleResponse as ChangeContributorRoleResponse,
      identityV1Contributor_universal_d_QuerySiteContributorsRequest as QuerySiteContributorsRequest,
      identityV1Contributor_universal_d_QuerySiteContributorsFilter as QuerySiteContributorsFilter,
      identityV1Contributor_universal_d_FieldSet as FieldSet,
      identityV1Contributor_universal_d_QuerySiteContributorsResponse as QuerySiteContributorsResponse,
      identityV1Contributor_universal_d_ContributorV2 as ContributorV2,
      identityV1Contributor_universal_d_GetContributorsQuotaRequest as GetContributorsQuotaRequest,
      identityV1Contributor_universal_d_GetContributorsQuotaResponse as GetContributorsQuotaResponse,
      identityV1Contributor_universal_d_getAppContributors as getAppContributors,
      identityV1Contributor_universal_d_GetAppContributorsOptions as GetAppContributorsOptions,
      identityV1Contributor_universal_d_getSiteContributors as getSiteContributors,
      identityV1Contributor_universal_d_GetSiteContributorsOptions as GetSiteContributorsOptions,
      identityV1Contributor_universal_d_getSiteContributorsV2 as getSiteContributorsV2,
      identityV1Contributor_universal_d_GetSiteContributorsV2Options as GetSiteContributorsV2Options,
      identityV1Contributor_universal_d_handleSiteTransfer as handleSiteTransfer,
      identityV1Contributor_universal_d_HandleSiteTransferOptions as HandleSiteTransferOptions,
      identityV1Contributor_universal_d_getCurrentUserRoles as getCurrentUserRoles,
      identityV1Contributor_universal_d_GetCurrentUserRolesOptions as GetCurrentUserRolesOptions,
      identityV1Contributor_universal_d_bulkGetUserRolesOnSite as bulkGetUserRolesOnSite,
      identityV1Contributor_universal_d_BulkGetUserRolesOnSiteOptions as BulkGetUserRolesOnSiteOptions,
      identityV1Contributor_universal_d_bulkValidateEmailInviteEligibility as bulkValidateEmailInviteEligibility,
      identityV1Contributor_universal_d_BulkValidateEmailInviteEligibilityOptions as BulkValidateEmailInviteEligibilityOptions,
      identityV1Contributor_universal_d_changeRole as changeRole,
      identityV1Contributor_universal_d_ChangeRoleOptions as ChangeRoleOptions,
      identityV1Contributor_universal_d_querySiteContributors as querySiteContributors,
      identityV1Contributor_universal_d_QuerySiteContributorsOptions as QuerySiteContributorsOptions,
      identityV1Contributor_universal_d_getContributorsQuota as getContributorsQuota,
    };
  }
  
  export { identityInvitesV1AccountInvite_universal_d as accountInvites, identityAccountV2Account_universal_d as accounts, identityV1Contributor_universal_d as contributors, identityInvitesV1SiteInvite_universal_d as siteInvites, identityRolesV1User_universal_d as users };
}
