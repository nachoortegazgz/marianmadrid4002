declare module "wix-data.v2" {
  /**
   * Permissions configuration of a data collection.
   *
   * Describes who can perform certain data operations on a collection.
   */
  interface DataPermissions$1 {
      /** Data Collection ID that is subject of these permissions */
      _id?: string;
      /** Access level for data items read */
      itemRead?: AccessLevel$1;
      /** Access level for data items insert */
      itemInsert?: AccessLevel$1;
      /** Access level for data items update */
      itemUpdate?: AccessLevel$1;
      /** Access level for data items removal */
      itemRemove?: AccessLevel$1;
      /**
       * Additional access list, which allows certain actions.
       * If some action is not allowed by special permission it
       * still can be allowed by top-level permissions list.
       * @internal
       * @readonly
       */
      specialPermissions?: SpecialPermissions[];
  }
  /**
   * Describes who can perform certain action.
   * Each level includes all levels below it (except UNDEFINED).
   */
  enum AccessLevel$1 {
      /** Not set */
      UNKNOWN = "UNKNOWN",
      /** Any subject, including visitors */
      ANYONE = "ANYONE",
      /** Any signed-in user (both site members and collaborators) */
      SITE_MEMBER = "SITE_MEMBER",
      /** Any signed-in user, but site members only have access to own items */
      SITE_MEMBER_AUTHOR = "SITE_MEMBER_AUTHOR",
      /** Site collaborator that has a role with CMS Access permission */
      CMS_EDITOR = "CMS_EDITOR",
      /** CMS administrators and users or roles granted with special access */
      PRIVILEGED = "PRIVILEGED"
  }
  /** Special access granted to user or role */
  interface SpecialPermissions extends SpecialPermissionsSubjectOneOf {
      /** User ID that is subject of these permissions */
      userId?: string;
      /** Policy ID of (custom) role that is subject of these permissions */
      policyId?: string;
      /**
       * ID of this special access, so it can be managed separately
       * @readonly
       */
      _id?: string;
      /** If data item read is allowed */
      itemRead?: Access;
      /** If data item insert is allowed */
      itemInsert?: Access;
      /** If data item update is allowed */
      itemUpdate?: Access;
      /** If data item remove is allowed */
      itemRemove?: Access;
  }
  /** @oneof */
  interface SpecialPermissionsSubjectOneOf {
      /** User ID that is subject of these permissions */
      userId?: string;
      /** Policy ID of (custom) role that is subject of these permissions */
      policyId?: string;
  }
  enum Access {
      /** Action is not specifically allowed, but can be allowed by top-level permissions */
      UNSPECIFIED = "UNSPECIFIED",
      /** Action is specifically allowed */
      ALLOWED = "ALLOWED"
  }
  interface GetPermissionsRequest {
      /** Data Collection ID to get permissions for */
      dataCollectionId: string;
  }
  interface GetPermissionsResponse {
      /** Requested data permissions */
      dataPermissions?: DataPermissions$1;
  }
  interface UpdatePermissionsRequest {
      /** Data permissions to update */
      dataPermissions: DataPermissions$1;
  }
  interface UpdatePermissionsResponse {
      /** Updated data permissions */
      dataPermissions?: DataPermissions$1;
  }
  interface AddSpecialPermissionsRequest {
      /** Data Collection ID to add special permission for */
      dataCollectionId: string;
      /** Special permissions to add */
      specialPermissions: SpecialPermissions;
  }
  interface AddSpecialPermissionsResponse {
      /** Added special data permissions */
      specialPermissions?: SpecialPermissions;
  }
  interface UpdateSpecialPermissionsRequest {
      /** Special permissions to update */
      specialPermissions: SpecialPermissions;
  }
  interface UpdateSpecialPermissionsResponse {
      /** Updated special data permissions */
      specialPermissions?: SpecialPermissions;
  }
  interface RemoveSpecialPermissionsRequest {
      /** Special permissions ID to remove */
      specialPermissionsId: string;
  }
  interface RemoveSpecialPermissionsResponse {
  }
  interface GetMyPermissionsRequest {
      /** Data Collection ID to get permission for */
      dataCollectionId: string;
  }
  interface GetMyPermissionsResponse {
      /** If data item read is allowed */
      itemRead?: boolean;
      /** If data item insert is allowed */
      itemInsert?: boolean;
      /** If data item update is allowed */
      itemUpdate?: boolean;
      /** If data item remove is allowed */
      itemRemove?: boolean;
  }
  interface MigrateCustomRolesRequest {
      /** Role ID to update, if empty updates all roles in scope */
      policyId?: string | null;
  }
  interface MigrateCustomRolesResponse {
  }
  interface PolicyAssignmentsUpdated extends PolicyAssignmentsUpdatedEventOneOf {
      policyAssigned?: PolicyAssigned;
      policyUnassigned?: PolicyUnassigned;
      policyAssignmentUpdated?: PolicyAssignmentUpdated;
  }
  /** @oneof */
  interface PolicyAssignmentsUpdatedEventOneOf {
      policyAssigned?: PolicyAssigned;
      policyUnassigned?: PolicyUnassigned;
      policyAssignmentUpdated?: PolicyAssignmentUpdated;
  }
  interface PolicyAssigned {
      subject?: Subject;
      assignment?: PolicyAssignment[];
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
  interface PolicyAssignment {
      policyId?: string;
      resource?: ResourcePath;
      condition?: PolicyCondition;
      assignmentId?: string | null;
  }
  interface ResourcePath {
      organization?: string | null;
      account?: string | null;
      site?: string | null;
      resource?: Resource;
  }
  /**
   * A custom resource. Is used to represent some asset that is not a direct resource context (site or account), but something custom.
   * For example: payment method, blog post, domain, logo.
   */
  interface Resource {
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
      condition?: Condition;
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
      condition?: Condition;
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
  interface Condition {
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
      dependOnSubject?: Subject;
  }
  interface PolicyUnassigned {
      subject?: Subject;
      assignment?: PolicyAssignment[];
  }
  interface PolicyAssignmentUpdated {
      subject?: Subject;
      fromAssignment?: PolicyAssignment[];
      toAssignment?: PolicyAssignment[];
  }
  interface Empty {
  }
  interface PolicyAuthorizationDataUpdated {
      policyId?: string;
      fromPolicyStatements?: PolicyStatement[];
      toPolicyStatements?: PolicyStatement[];
      policyType?: PolicyType;
      policyOwner?: PolicyOwner;
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
  enum PolicyType {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      PREDEFINED = "PREDEFINED",
      CUSTOM = "CUSTOM",
      INLINE_CUSTOM = "INLINE_CUSTOM"
  }
  interface PolicyOwner {
      type?: PolicyOwnerType;
      _id?: string;
  }
  enum PolicyOwnerType {
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      WIX = "WIX",
      WIX_ACCOUNT = "WIX_ACCOUNT"
  }
  interface DomainEvent$3 extends DomainEventBodyOneOf$3 {
      createdEvent?: EntityCreatedEvent$3;
      updatedEvent?: EntityUpdatedEvent$3;
      deletedEvent?: EntityDeletedEvent$3;
      actionEvent?: ActionEvent$3;
      /**
       * Unique event ID.
       * Allows clients to ignore duplicate webhooks.
       */
      _id?: string;
      /**
       * Assumes actions are also always typed to an entity_type
       * Example: wix.stores.catalog.product, wix.bookings.session, wix.payments.transaction
       */
      entityFqdn?: string;
      /**
       * This is top level to ease client code dispatching of messages (switch on entity_fqdn+slug)
       * This is although the created/updated/deleted notion is duplication of the oneof types
       * Example: created/updated/deleted/started/completed/email_opened
       */
      slug?: string;
      /** ID of the entity associated with the event. */
      entityId?: string;
      /** Event timestamp in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format and UTC time. For example: 2020-04-26T13:57:50.699Z */
      eventTime?: Date | null;
      /**
       * Whether the event was triggered as a result of a privacy regulation application
       * (for example, GDPR).
       */
      triggeredByAnonymizeRequest?: boolean | null;
      /** If present, indicates the action that triggered the event. */
      originatedFrom?: string | null;
      /**
       * A sequence number defining the order of updates to the underlying entity.
       * For example, given that some entity was updated at 16:00 and than again at 16:01,
       * it is guaranteed that the sequence number of the second update is strictly higher than the first.
       * As the consumer, you can use this value to ensure that you handle messages in the correct order.
       * To do so, you will need to persist this number on your end, and compare the sequence number from the
       * message against the one you have stored. Given that the stored number is higher, you should ignore the message.
       */
      entityEventSequence?: string | null;
  }
  /** @oneof */
  interface DomainEventBodyOneOf$3 {
      createdEvent?: EntityCreatedEvent$3;
      updatedEvent?: EntityUpdatedEvent$3;
      deletedEvent?: EntityDeletedEvent$3;
      actionEvent?: ActionEvent$3;
  }
  interface EntityCreatedEvent$3 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$3;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$3 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$3 {
      /**
       * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
       * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
       * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
       */
      currentEntityAsJson?: string;
      /**
       * This field is currently part of the of the EntityUpdatedEvent msg, but scala/node libraries which implements the domain events standard
       * wont populate it / have any reference to it in the API.
       * The main reason for it is that fetching the old entity from the DB will have a performance hit on an update operation so unless truly needed,
       * the developer should send only the new (current) entity.
       * An additional reason is not wanting to send this additional entity over the wire (kafka) since in some cases it can be really big
       * Developers that must reflect the old entity will have to implement their own domain event sender mechanism which will follow the DomainEvent proto message.
       * @internal
       * @deprecated
       */
      previousEntityAsJson?: string | null;
      /**
       * WIP - This property will hold both names and previous values of the updated fields of the entity.
       * For more details please see [adr](https://docs.google.com/document/d/1PdqsOM20Ph2HAkmx8zvUnzzk3Sekp3BR9h34wSvsRnI/edit#heading=h.phlw87mh2imx) or [issue](https://github.com/wix-private/nile-tracker/issues/363)
       * @internal
       */
      modifiedFields?: Record<string, any>;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface EntityDeletedEvent$3 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface ActionEvent$3 {
      bodyAsJson?: string;
  }
  /**
   * Returns data permissions for a data collection
   * @param dataCollectionId - Data Collection ID to get permissions for
   * @internal
   * @documentationMaturity preview
   * @requiredField dataCollectionId
   * @permissionId WIX_DATA.PERMISSIONS_READ
   * @adminMethod
   */
  function getPermissions(dataCollectionId: string): Promise<GetPermissionsResponse>;
  /**
   * Updates data permissions for a data collection
   *
   * NOTE that special permissions are not updated using this API, use dedicated methods for it.
   * @param dataPermissions - Data permissions to update
   * @internal
   * @documentationMaturity preview
   * @requiredField dataPermissions
   * @requiredField dataPermissions._id
   * @requiredField dataPermissions.itemInsert
   * @requiredField dataPermissions.itemRead
   * @requiredField dataPermissions.itemRemove
   * @requiredField dataPermissions.itemUpdate
   * @permissionId WIX_DATA.PERMISSIONS_UPDATE
   * @adminMethod
   */
  function updatePermissions(dataPermissions: DataPermissions$1): Promise<UpdatePermissionsResponse>;
  /**
   * Adds special data permissions for particular user/group
   * Errors:
   * - `ALREADY_EXISTS` in case if special permission for same subject already exists
   * @param dataCollectionId - Data Collection ID to add special permission for
   * @internal
   * @documentationMaturity preview
   * @requiredField dataCollectionId
   * @requiredField options
   * @requiredField options.specialPermissions
   * @permissionId WIX_DATA.PERMISSIONS_UPDATE_SPECIAL
   * @adminMethod
   */
  function addSpecialPermissions(dataCollectionId: string, options: AddSpecialPermissionsOptions): Promise<AddSpecialPermissionsResponse>;
  interface AddSpecialPermissionsOptions {
      /** Special permissions to add */
      specialPermissions: SpecialPermissions;
  }
  /**
   * Updates special data permissions for particular user/group.
   * Any omitted permissions will be set to UNSPECIFIED.
   * @param _id - ID of this special access, so it can be managed separately
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField specialPermissions
   * @permissionId WIX_DATA.PERMISSIONS_UPDATE_SPECIAL
   * @adminMethod
   */
  function updateSpecialPermissions(_id: string, specialPermissions: UpdateSpecialPermissions): Promise<UpdateSpecialPermissionsResponse>;
  interface UpdateSpecialPermissions {
      /** User ID that is subject of these permissions */
      userId?: string;
      /** Policy ID of (custom) role that is subject of these permissions */
      policyId?: string;
      /**
       * ID of this special access, so it can be managed separately
       * @readonly
       */
      _id?: string;
      /** If data item read is allowed */
      itemRead?: Access;
      /** If data item insert is allowed */
      itemInsert?: Access;
      /** If data item update is allowed */
      itemUpdate?: Access;
      /** If data item remove is allowed */
      itemRemove?: Access;
  }
  /**
   * Deletes special data permissions for particular user/group
   * @param specialPermissionsId - Special permissions ID to remove
   * @internal
   * @documentationMaturity preview
   * @requiredField specialPermissionsId
   * @permissionId WIX_DATA.PERMISSIONS_UPDATE_SPECIAL
   * @adminMethod
   */
  function removeSpecialPermissions(specialPermissionsId: string): Promise<void>;
  /**
   * Returns current user permissions for given data collection
   * @param dataCollectionId - Data Collection ID to get permission for
   * @internal
   * @documentationMaturity preview
   * @requiredField dataCollectionId
   * @permissionId WIX_DATA.PERMISSIONS_GET_ALLOWED
   * @adminMethod
   */
  function getMyPermissions(dataCollectionId: string): Promise<GetMyPermissionsResponse>;
  
  type dataV1DataPermissions_universal_d_SpecialPermissions = SpecialPermissions;
  type dataV1DataPermissions_universal_d_SpecialPermissionsSubjectOneOf = SpecialPermissionsSubjectOneOf;
  type dataV1DataPermissions_universal_d_Access = Access;
  const dataV1DataPermissions_universal_d_Access: typeof Access;
  type dataV1DataPermissions_universal_d_GetPermissionsRequest = GetPermissionsRequest;
  type dataV1DataPermissions_universal_d_GetPermissionsResponse = GetPermissionsResponse;
  type dataV1DataPermissions_universal_d_UpdatePermissionsRequest = UpdatePermissionsRequest;
  type dataV1DataPermissions_universal_d_UpdatePermissionsResponse = UpdatePermissionsResponse;
  type dataV1DataPermissions_universal_d_AddSpecialPermissionsRequest = AddSpecialPermissionsRequest;
  type dataV1DataPermissions_universal_d_AddSpecialPermissionsResponse = AddSpecialPermissionsResponse;
  type dataV1DataPermissions_universal_d_UpdateSpecialPermissionsRequest = UpdateSpecialPermissionsRequest;
  type dataV1DataPermissions_universal_d_UpdateSpecialPermissionsResponse = UpdateSpecialPermissionsResponse;
  type dataV1DataPermissions_universal_d_RemoveSpecialPermissionsRequest = RemoveSpecialPermissionsRequest;
  type dataV1DataPermissions_universal_d_RemoveSpecialPermissionsResponse = RemoveSpecialPermissionsResponse;
  type dataV1DataPermissions_universal_d_GetMyPermissionsRequest = GetMyPermissionsRequest;
  type dataV1DataPermissions_universal_d_GetMyPermissionsResponse = GetMyPermissionsResponse;
  type dataV1DataPermissions_universal_d_MigrateCustomRolesRequest = MigrateCustomRolesRequest;
  type dataV1DataPermissions_universal_d_MigrateCustomRolesResponse = MigrateCustomRolesResponse;
  type dataV1DataPermissions_universal_d_PolicyAssignmentsUpdated = PolicyAssignmentsUpdated;
  type dataV1DataPermissions_universal_d_PolicyAssignmentsUpdatedEventOneOf = PolicyAssignmentsUpdatedEventOneOf;
  type dataV1DataPermissions_universal_d_PolicyAssigned = PolicyAssigned;
  type dataV1DataPermissions_universal_d_Subject = Subject;
  type dataV1DataPermissions_universal_d_SubjectType = SubjectType;
  const dataV1DataPermissions_universal_d_SubjectType: typeof SubjectType;
  type dataV1DataPermissions_universal_d_SubjectContext = SubjectContext;
  type dataV1DataPermissions_universal_d_SubjectContextType = SubjectContextType;
  const dataV1DataPermissions_universal_d_SubjectContextType: typeof SubjectContextType;
  type dataV1DataPermissions_universal_d_PolicyAssignment = PolicyAssignment;
  type dataV1DataPermissions_universal_d_ResourcePath = ResourcePath;
  type dataV1DataPermissions_universal_d_Resource = Resource;
  type dataV1DataPermissions_universal_d_PolicyCondition = PolicyCondition;
  type dataV1DataPermissions_universal_d_ConditionType = ConditionType;
  type dataV1DataPermissions_universal_d_ConditionTypeOfOneOf = ConditionTypeOfOneOf;
  type dataV1DataPermissions_universal_d_SimpleCondition = SimpleCondition;
  type dataV1DataPermissions_universal_d_SimpleConditionValue = SimpleConditionValue;
  type dataV1DataPermissions_universal_d_SimpleConditionValueValueOneOf = SimpleConditionValueValueOneOf;
  type dataV1DataPermissions_universal_d_SimpleConditionOperator = SimpleConditionOperator;
  const dataV1DataPermissions_universal_d_SimpleConditionOperator: typeof SimpleConditionOperator;
  type dataV1DataPermissions_universal_d_JoinedCondition = JoinedCondition;
  type dataV1DataPermissions_universal_d_JoinedConditionOperator = JoinedConditionOperator;
  const dataV1DataPermissions_universal_d_JoinedConditionOperator: typeof JoinedConditionOperator;
  type dataV1DataPermissions_universal_d_EnvironmentCondition = EnvironmentCondition;
  type dataV1DataPermissions_universal_d_EnvironmentConditionConditionOneOf = EnvironmentConditionConditionOneOf;
  type dataV1DataPermissions_universal_d_ExperimentCondition = ExperimentCondition;
  type dataV1DataPermissions_universal_d_Condition = Condition;
  type dataV1DataPermissions_universal_d_ConditionOperator = ConditionOperator;
  type dataV1DataPermissions_universal_d_ConditionOperatorOperatorsOneOf = ConditionOperatorOperatorsOneOf;
  type dataV1DataPermissions_universal_d_EqualOperator = EqualOperator;
  type dataV1DataPermissions_universal_d_ConditionValue = ConditionValue;
  type dataV1DataPermissions_universal_d_ConditionValueValueOneOf = ConditionValueValueOneOf;
  type dataV1DataPermissions_universal_d_LikeOperator = LikeOperator;
  type dataV1DataPermissions_universal_d_ExperimentOperator = ExperimentOperator;
  type dataV1DataPermissions_universal_d_DependOnOperator = DependOnOperator;
  type dataV1DataPermissions_universal_d_PolicyUnassigned = PolicyUnassigned;
  type dataV1DataPermissions_universal_d_PolicyAssignmentUpdated = PolicyAssignmentUpdated;
  type dataV1DataPermissions_universal_d_Empty = Empty;
  type dataV1DataPermissions_universal_d_PolicyAuthorizationDataUpdated = PolicyAuthorizationDataUpdated;
  type dataV1DataPermissions_universal_d_PolicyStatement = PolicyStatement;
  type dataV1DataPermissions_universal_d_Effect = Effect;
  const dataV1DataPermissions_universal_d_Effect: typeof Effect;
  type dataV1DataPermissions_universal_d_PolicyType = PolicyType;
  const dataV1DataPermissions_universal_d_PolicyType: typeof PolicyType;
  type dataV1DataPermissions_universal_d_PolicyOwner = PolicyOwner;
  type dataV1DataPermissions_universal_d_PolicyOwnerType = PolicyOwnerType;
  const dataV1DataPermissions_universal_d_PolicyOwnerType: typeof PolicyOwnerType;
  const dataV1DataPermissions_universal_d_getPermissions: typeof getPermissions;
  const dataV1DataPermissions_universal_d_updatePermissions: typeof updatePermissions;
  const dataV1DataPermissions_universal_d_addSpecialPermissions: typeof addSpecialPermissions;
  type dataV1DataPermissions_universal_d_AddSpecialPermissionsOptions = AddSpecialPermissionsOptions;
  const dataV1DataPermissions_universal_d_updateSpecialPermissions: typeof updateSpecialPermissions;
  type dataV1DataPermissions_universal_d_UpdateSpecialPermissions = UpdateSpecialPermissions;
  const dataV1DataPermissions_universal_d_removeSpecialPermissions: typeof removeSpecialPermissions;
  const dataV1DataPermissions_universal_d_getMyPermissions: typeof getMyPermissions;
  namespace dataV1DataPermissions_universal_d {
    export {
      DataPermissions$1 as DataPermissions,
      AccessLevel$1 as AccessLevel,
      dataV1DataPermissions_universal_d_SpecialPermissions as SpecialPermissions,
      dataV1DataPermissions_universal_d_SpecialPermissionsSubjectOneOf as SpecialPermissionsSubjectOneOf,
      dataV1DataPermissions_universal_d_Access as Access,
      dataV1DataPermissions_universal_d_GetPermissionsRequest as GetPermissionsRequest,
      dataV1DataPermissions_universal_d_GetPermissionsResponse as GetPermissionsResponse,
      dataV1DataPermissions_universal_d_UpdatePermissionsRequest as UpdatePermissionsRequest,
      dataV1DataPermissions_universal_d_UpdatePermissionsResponse as UpdatePermissionsResponse,
      dataV1DataPermissions_universal_d_AddSpecialPermissionsRequest as AddSpecialPermissionsRequest,
      dataV1DataPermissions_universal_d_AddSpecialPermissionsResponse as AddSpecialPermissionsResponse,
      dataV1DataPermissions_universal_d_UpdateSpecialPermissionsRequest as UpdateSpecialPermissionsRequest,
      dataV1DataPermissions_universal_d_UpdateSpecialPermissionsResponse as UpdateSpecialPermissionsResponse,
      dataV1DataPermissions_universal_d_RemoveSpecialPermissionsRequest as RemoveSpecialPermissionsRequest,
      dataV1DataPermissions_universal_d_RemoveSpecialPermissionsResponse as RemoveSpecialPermissionsResponse,
      dataV1DataPermissions_universal_d_GetMyPermissionsRequest as GetMyPermissionsRequest,
      dataV1DataPermissions_universal_d_GetMyPermissionsResponse as GetMyPermissionsResponse,
      dataV1DataPermissions_universal_d_MigrateCustomRolesRequest as MigrateCustomRolesRequest,
      dataV1DataPermissions_universal_d_MigrateCustomRolesResponse as MigrateCustomRolesResponse,
      dataV1DataPermissions_universal_d_PolicyAssignmentsUpdated as PolicyAssignmentsUpdated,
      dataV1DataPermissions_universal_d_PolicyAssignmentsUpdatedEventOneOf as PolicyAssignmentsUpdatedEventOneOf,
      dataV1DataPermissions_universal_d_PolicyAssigned as PolicyAssigned,
      dataV1DataPermissions_universal_d_Subject as Subject,
      dataV1DataPermissions_universal_d_SubjectType as SubjectType,
      dataV1DataPermissions_universal_d_SubjectContext as SubjectContext,
      dataV1DataPermissions_universal_d_SubjectContextType as SubjectContextType,
      dataV1DataPermissions_universal_d_PolicyAssignment as PolicyAssignment,
      dataV1DataPermissions_universal_d_ResourcePath as ResourcePath,
      dataV1DataPermissions_universal_d_Resource as Resource,
      dataV1DataPermissions_universal_d_PolicyCondition as PolicyCondition,
      dataV1DataPermissions_universal_d_ConditionType as ConditionType,
      dataV1DataPermissions_universal_d_ConditionTypeOfOneOf as ConditionTypeOfOneOf,
      dataV1DataPermissions_universal_d_SimpleCondition as SimpleCondition,
      dataV1DataPermissions_universal_d_SimpleConditionValue as SimpleConditionValue,
      dataV1DataPermissions_universal_d_SimpleConditionValueValueOneOf as SimpleConditionValueValueOneOf,
      dataV1DataPermissions_universal_d_SimpleConditionOperator as SimpleConditionOperator,
      dataV1DataPermissions_universal_d_JoinedCondition as JoinedCondition,
      dataV1DataPermissions_universal_d_JoinedConditionOperator as JoinedConditionOperator,
      dataV1DataPermissions_universal_d_EnvironmentCondition as EnvironmentCondition,
      dataV1DataPermissions_universal_d_EnvironmentConditionConditionOneOf as EnvironmentConditionConditionOneOf,
      dataV1DataPermissions_universal_d_ExperimentCondition as ExperimentCondition,
      dataV1DataPermissions_universal_d_Condition as Condition,
      dataV1DataPermissions_universal_d_ConditionOperator as ConditionOperator,
      dataV1DataPermissions_universal_d_ConditionOperatorOperatorsOneOf as ConditionOperatorOperatorsOneOf,
      dataV1DataPermissions_universal_d_EqualOperator as EqualOperator,
      dataV1DataPermissions_universal_d_ConditionValue as ConditionValue,
      dataV1DataPermissions_universal_d_ConditionValueValueOneOf as ConditionValueValueOneOf,
      dataV1DataPermissions_universal_d_LikeOperator as LikeOperator,
      dataV1DataPermissions_universal_d_ExperimentOperator as ExperimentOperator,
      dataV1DataPermissions_universal_d_DependOnOperator as DependOnOperator,
      dataV1DataPermissions_universal_d_PolicyUnassigned as PolicyUnassigned,
      dataV1DataPermissions_universal_d_PolicyAssignmentUpdated as PolicyAssignmentUpdated,
      dataV1DataPermissions_universal_d_Empty as Empty,
      dataV1DataPermissions_universal_d_PolicyAuthorizationDataUpdated as PolicyAuthorizationDataUpdated,
      dataV1DataPermissions_universal_d_PolicyStatement as PolicyStatement,
      dataV1DataPermissions_universal_d_Effect as Effect,
      dataV1DataPermissions_universal_d_PolicyType as PolicyType,
      dataV1DataPermissions_universal_d_PolicyOwner as PolicyOwner,
      dataV1DataPermissions_universal_d_PolicyOwnerType as PolicyOwnerType,
      DomainEvent$3 as DomainEvent,
      DomainEventBodyOneOf$3 as DomainEventBodyOneOf,
      EntityCreatedEvent$3 as EntityCreatedEvent,
      RestoreInfo$3 as RestoreInfo,
      EntityUpdatedEvent$3 as EntityUpdatedEvent,
      EntityDeletedEvent$3 as EntityDeletedEvent,
      ActionEvent$3 as ActionEvent,
      dataV1DataPermissions_universal_d_getPermissions as getPermissions,
      dataV1DataPermissions_universal_d_updatePermissions as updatePermissions,
      dataV1DataPermissions_universal_d_addSpecialPermissions as addSpecialPermissions,
      dataV1DataPermissions_universal_d_AddSpecialPermissionsOptions as AddSpecialPermissionsOptions,
      dataV1DataPermissions_universal_d_updateSpecialPermissions as updateSpecialPermissions,
      dataV1DataPermissions_universal_d_UpdateSpecialPermissions as UpdateSpecialPermissions,
      dataV1DataPermissions_universal_d_removeSpecialPermissions as removeSpecialPermissions,
      dataV1DataPermissions_universal_d_getMyPermissions as getMyPermissions,
    };
  }
  
  /** An external database connection defines a connection between an external database and a Wix site or project. */
  interface ExternalDatabaseConnection {
      /**
       * Name of the external database connection.
       * An external database connection may connect to one or more external data collections or tables.
       * These are represented as `connectionName/dataCollectionId`.
       */
      name?: string;
      /** Base URL for provisioning and managing data in the external database. For example: `https://example.com/my-external-database`. */
      endpoint?: string | null;
      /**
       * Settings passed to the external database connection as part of each request.
       * These settings can relate to authentication, tenancy, or provide any other information needed for processing a request.
       * Their content and structure depend on the specific requirements of the external database's API.
       */
      configuration?: Record<string, any> | null;
      /**
       * Status of the external database connection. Includes whether the connection was established successfully, and if not, the reason for the failure.
       * @readonly
       */
      connectionStatus?: ConnectionStatus;
      /**
       * The protocol version of the external database connection.
       * @internal
       * @readonly
       */
      protocolVersion?: ProtocolVersion;
      /**
       * The public key used to validate requests to the external database. Applicable only when the protocol version is `V3`.
       * @internal
       * @readonly
       */
      publicKey?: string | null;
      /**
       * The external database's capabilities.
       * @readonly
       */
      capabilities?: Capabilities;
      /**
       * The ID of the app used to integrate this external database.
       * @internal
       * @readonly
       */
      applicationId?: string | null;
  }
  enum CauseOfFailure {
      /** No connection failure. */
      NONE = "NONE",
      /** General communication failure. */
      COMMUNICATION_FAILURE = "COMMUNICATION_FAILURE",
      /** External database host is unreachable. */
      DESTINATION_HOST_UNREACHABLE = "DESTINATION_HOST_UNREACHABLE",
      /** Unauthorized to access the external database. */
      UNAUTHORIZED = "UNAUTHORIZED",
      /** `endpoint` is not set. */
      DESTINATION_ENDPOINT_NOT_DEFINED = "DESTINATION_ENDPOINT_NOT_DEFINED"
  }
  enum CollectionsFound {
      /** Attempt to connect to the external database failed, so status is unknown. */
      UNKNOWN = "UNKNOWN",
      /** External database has existing collections. */
      YES = "YES",
      /** External database does not have any existing collections. */
      NO = "NO"
  }
  enum FieldType$1 {
      UNKNOWN_FIELD_TYPE = "UNKNOWN_FIELD_TYPE",
      TEXT = "TEXT",
      NUMBER = "NUMBER",
      DATE = "DATE",
      DATETIME = "DATETIME",
      IMAGE = "IMAGE",
      BOOLEAN = "BOOLEAN",
      DOCUMENT = "DOCUMENT",
      URL = "URL",
      RICH_TEXT = "RICH_TEXT",
      VIDEO = "VIDEO",
      ANY = "ANY",
      ARRAY_STRING = "ARRAY_STRING",
      ARRAY_DOCUMENT = "ARRAY_DOCUMENT",
      AUDIO = "AUDIO",
      TIME = "TIME",
      LANGUAGE = "LANGUAGE",
      RICH_CONTENT = "RICH_CONTENT",
      MEDIA_GALLERY = "MEDIA_GALLERY",
      ADDRESS = "ADDRESS",
      PAGE_LINK = "PAGE_LINK",
      REFERENCE = "REFERENCE",
      MULTI_REFERENCE = "MULTI_REFERENCE",
      OBJECT = "OBJECT",
      ARRAY = "ARRAY",
      /** Deprecated - can’t be added to collections. Can only appear in older collections. */
      LEGACY_TIME = "LEGACY_TIME",
      /** Deprecated - can’t be added to collections. Can only appear in older collections. */
      LEGACY_BOOK = "LEGACY_BOOK",
      /** Deprecated - can’t be added to collections. Can only appear in older collections. */
      LEGACY_EXTERNAL_URL = "LEGACY_EXTERNAL_URL",
      /** Deprecated - can’t be added to collections. Can only appear in older collections. */
      LEGACY_BROKEN_REFERENCE = "LEGACY_BROKEN_REFERENCE",
      /** Deprecated - can’t be added to collections. Can only appear in older collections. */
      LEGACY_IMAGE = "LEGACY_IMAGE",
      /** Deprecated - can’t be added to collections. Can only appear in older collections. */
      LEGACY_COLOR = "LEGACY_COLOR",
      /** Deprecated - can’t be added to collections. Can only appear in older collections. */
      LEGACY_EXTERNAL_VIDEO = "LEGACY_EXTERNAL_VIDEO"
  }
  interface ConnectionStatus {
      /** Whether the connection was established successfully. */
      successful?: boolean;
      /** Whether and why a connection attempt failed. */
      causeOfFailure?: CauseOfFailure;
      /**
       * Whether the external database has existing collections.
       * @readonly
       */
      hasCollections?: CollectionsFound;
  }
  enum ProtocolVersion {
      UNKNOWN_PROTOCOL_VERSION = "UNKNOWN_PROTOCOL_VERSION",
      V1 = "V1",
      V2 = "V2",
      V3 = "V3"
  }
  interface Capabilities {
      /** Whether the external database supports creating new collections, updating the structure of existing collections, or deleting them. */
      collectionModificationsSupported?: boolean;
      /**
       * Field types the external database supports.
       * This field only applies when `collectionModificationsSupported` is `true`.
       */
      fieldTypes?: FieldType$1[];
  }
  interface GetExternalDatabaseConnectionRequest {
      /** Name of the external database connection to retrieve. */
      name: string;
  }
  interface GetExternalDatabaseConnectionResponse {
      /** Details of the external database connection requested. */
      externalDatabaseConnection?: ExternalDatabaseConnection;
  }
  interface ListExternalDatabaseConnectionsRequest {
      /** Paging */
      paging?: Paging$3;
  }
  interface Paging$3 {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface ListExternalDatabaseConnectionsResponse {
      /** List of external database connections. */
      externalDatabaseConnections?: ExternalDatabaseConnection[];
      /** Paging metadata */
      pagingMetadata?: PagingMetadata$1;
  }
  interface PagingMetadata$1 {
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
  interface CreateExternalDatabaseConnectionRequest {
      /** External database connection details. */
      externalDatabaseConnection: ExternalDatabaseConnection;
      /** Connection type. */
      connectionType: ConnectionType;
      /**
       * Indicates if database is managed by WIX.
       * @internal
       */
      databaseManagedByWix?: boolean;
  }
  enum ConnectionType {
      /** Unknown connection type. */
      UNKNOWN_CONNECTION_TYPE = "UNKNOWN_CONNECTION_TYPE",
      /**
       * Connection to database adapter that implements legacy External Database Collections SPI (protocol version 1 or 2)
       * https://www.wix.com/velo/reference/spis/external-database-collections/introduction
       */
      STANDALONE = "STANDALONE",
      /**
       * Connection to database adapter that implements External Database SPI (protocol version 3)
       * https://dev.wix.com/docs/rest/internal-only/wix-data/external-database-spi/introduction
       * https://dev.wix.com/docs/rest/articles/getting-started/service-provider-interface
       */
      WIX_SPI = "WIX_SPI"
  }
  interface CreateExternalDatabaseConnectionResponse {
      /** Details of external database connection created. */
      externalDatabaseConnection?: ExternalDatabaseConnection;
  }
  interface UpdateExternalDatabaseConnectionRequest {
      /** Updated external database connection details. The existing connection is replaced with this version. */
      externalDatabaseConnection: ExternalDatabaseConnection;
  }
  interface UpdateExternalDatabaseConnectionResponse {
      /** Updated external database connection details. */
      externalDatabaseConnection?: ExternalDatabaseConnection;
  }
  interface DeleteExternalDatabaseConnectionRequest {
      /** Name of the external database connection to delete. */
      name: string;
  }
  interface DeleteExternalDatabaseConnectionResponse {
  }
  interface DomainEvent$2 extends DomainEventBodyOneOf$2 {
      createdEvent?: EntityCreatedEvent$2;
      updatedEvent?: EntityUpdatedEvent$2;
      deletedEvent?: EntityDeletedEvent$2;
      actionEvent?: ActionEvent$2;
      /**
       * Unique event ID.
       * Allows clients to ignore duplicate webhooks.
       */
      _id?: string;
      /**
       * Assumes actions are also always typed to an entity_type
       * Example: wix.stores.catalog.product, wix.bookings.session, wix.payments.transaction
       */
      entityFqdn?: string;
      /**
       * This is top level to ease client code dispatching of messages (switch on entity_fqdn+slug)
       * This is although the created/updated/deleted notion is duplication of the oneof types
       * Example: created/updated/deleted/started/completed/email_opened
       */
      slug?: string;
      /** ID of the entity associated with the event. */
      entityId?: string;
      /** Event timestamp in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format and UTC time. For example: 2020-04-26T13:57:50.699Z */
      eventTime?: Date | null;
      /**
       * Whether the event was triggered as a result of a privacy regulation application
       * (for example, GDPR).
       */
      triggeredByAnonymizeRequest?: boolean | null;
      /** If present, indicates the action that triggered the event. */
      originatedFrom?: string | null;
      /**
       * A sequence number defining the order of updates to the underlying entity.
       * For example, given that some entity was updated at 16:00 and than again at 16:01,
       * it is guaranteed that the sequence number of the second update is strictly higher than the first.
       * As the consumer, you can use this value to ensure that you handle messages in the correct order.
       * To do so, you will need to persist this number on your end, and compare the sequence number from the
       * message against the one you have stored. Given that the stored number is higher, you should ignore the message.
       */
      entityEventSequence?: string | null;
  }
  /** @oneof */
  interface DomainEventBodyOneOf$2 {
      createdEvent?: EntityCreatedEvent$2;
      updatedEvent?: EntityUpdatedEvent$2;
      deletedEvent?: EntityDeletedEvent$2;
      actionEvent?: ActionEvent$2;
  }
  interface EntityCreatedEvent$2 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$2;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$2 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$2 {
      /**
       * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
       * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
       * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
       */
      currentEntityAsJson?: string;
      /**
       * This field is currently part of the of the EntityUpdatedEvent msg, but scala/node libraries which implements the domain events standard
       * wont populate it / have any reference to it in the API.
       * The main reason for it is that fetching the old entity from the DB will have a performance hit on an update operation so unless truly needed,
       * the developer should send only the new (current) entity.
       * An additional reason is not wanting to send this additional entity over the wire (kafka) since in some cases it can be really big
       * Developers that must reflect the old entity will have to implement their own domain event sender mechanism which will follow the DomainEvent proto message.
       * @internal
       * @deprecated
       */
      previousEntityAsJson?: string | null;
      /**
       * WIP - This property will hold both names and previous values of the updated fields of the entity.
       * For more details please see [adr](https://docs.google.com/document/d/1PdqsOM20Ph2HAkmx8zvUnzzk3Sekp3BR9h34wSvsRnI/edit#heading=h.phlw87mh2imx) or [issue](https://github.com/wix-private/nile-tracker/issues/363)
       * @internal
       */
      modifiedFields?: Record<string, any>;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface EntityDeletedEvent$2 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface ActionEvent$2 {
      bodyAsJson?: string;
  }
  interface MessageEnvelope$2 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$2;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$2 extends IdentificationDataIdOneOf$2 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$2;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$2 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$2 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Retrieves an external database connection by name.
   * @param name - Name of the external database connection to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField name
   * @permissionId WIX_DATA.GET_EXTERNAL_DATABASE_CONNECTION
   * @adminMethod
   * @returns Details of the external database connection requested.
   */
  function getExternalDatabaseConnection(name: string): Promise<ExternalDatabaseConnection>;
  /**
   * Retrieves a list of all external database collections associated with the site or project.
   * @public
   * @documentationMaturity preview
   * @permissionId WIX_DATA.LIST_EXTERNAL_DATABASE_CONNECTIONS
   * @adminMethod
   */
  function listExternalDatabaseConnections(options?: ListExternalDatabaseConnectionsOptions): Promise<ListExternalDatabaseConnectionsResponse>;
  interface ListExternalDatabaseConnectionsOptions {
      /** Paging */
      paging?: Paging$3;
  }
  /**
   * Creates a new external database connection.
   *
   * The `externalDatabaseConnection` parameter must include a `name`, `endpoint`, and `configuration` details for the external database.
   * If any of these are missing, the external database connection isn't created.
   * @param externalDatabaseConnection - External database connection details.
   * @public
   * @documentationMaturity preview
   * @requiredField externalDatabaseConnection
   * @requiredField externalDatabaseConnection.name
   * @requiredField options.connectionType
   * @param options - Options for creating an external database connection.
   * @permissionId WIX_DATA.CREATE_EXTERNAL_DATABASE_CONNECTION
   * @adminMethod
   * @returns Details of external database connection created.
   */
  function createExternalDatabaseConnection(externalDatabaseConnection: ExternalDatabaseConnection, options?: CreateExternalDatabaseConnectionOptions): Promise<ExternalDatabaseConnection>;
  interface CreateExternalDatabaseConnectionOptions {
      /** Connection type. */
      connectionType: ConnectionType;
      /**
       * Indicates if database is managed by WIX.
       * @internal
       */
      databaseManagedByWix?: boolean;
  }
  /**
   * Updates an external database connection.
   *
   * An external database collection name must be provided in `name`.
   * If an existing external database connection is found with the same name, that connection's details are updated.
   * If no external database connection has that name, the request fails.
   *
   * > **Note:** After an external database connection is updated, it only contains the values provided in the request. All previous values are lost.
   * @param name - Name of the external database connection.
   * An external database connection may connect to one or more external data collections or tables.
   * These are represented as `connectionName/dataCollectionId`.
   * @public
   * @documentationMaturity preview
   * @requiredField externalDatabaseConnection
   * @requiredField name
   * @param options - Options for updating an external database connection.
   * @param externalDatabaseConnection - Updated external database connection details. The existing connection is replaced with this version.
   * @permissionId WIX_DATA.UPDATE_EXTERNAL_DATABASE_CONNECTION
   * @adminMethod
   * @returns Updated external database connection details.
   */
  function updateExternalDatabaseConnection(name: string, externalDatabaseConnection: UpdateExternalDatabaseConnection): Promise<ExternalDatabaseConnection>;
  interface UpdateExternalDatabaseConnection {
      /** Base URL for provisioning and managing data in the external database. For example: `https://example.com/my-external-database`. */
      endpoint?: string | null;
      /**
       * Settings passed to the external database connection as part of each request.
       * These settings can relate to authentication, tenancy, or provide any other information needed for processing a request.
       * Their content and structure depend on the specific requirements of the external database's API.
       */
      configuration?: Record<string, any> | null;
      /**
       * Status of the external database connection. Includes whether the connection was established successfully, and if not, the reason for the failure.
       * @readonly
       */
      connectionStatus?: ConnectionStatus;
      /**
       * The protocol version of the external database connection.
       * @internal
       * @readonly
       */
      protocolVersion?: ProtocolVersion;
      /**
       * The public key used to validate requests to the external database. Applicable only when the protocol version is `V3`.
       * @internal
       * @readonly
       */
      publicKey?: string | null;
      /**
       * The external database's capabilities.
       * @readonly
       */
      capabilities?: Capabilities;
      /**
       * The ID of the app used to integrate this external database.
       * @internal
       * @readonly
       */
      applicationId?: string | null;
  }
  /**
   * Deletes an external database connection.
   *
   * > **Note:** Once an external database connection is deleted, it can't be restored. To reconnect the database you need to create a new external database connection.
   * @param name - Name of the external database connection to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField name
   * @permissionId WIX_DATA.DELETE_EXTERNAL_DATABASE_CONNECTION
   * @adminMethod
   */
  function deleteExternalDatabaseConnection(name: string): Promise<void>;
  
  type dataV1ExternalDatabaseConnection_universal_d_ExternalDatabaseConnection = ExternalDatabaseConnection;
  type dataV1ExternalDatabaseConnection_universal_d_CauseOfFailure = CauseOfFailure;
  const dataV1ExternalDatabaseConnection_universal_d_CauseOfFailure: typeof CauseOfFailure;
  type dataV1ExternalDatabaseConnection_universal_d_CollectionsFound = CollectionsFound;
  const dataV1ExternalDatabaseConnection_universal_d_CollectionsFound: typeof CollectionsFound;
  type dataV1ExternalDatabaseConnection_universal_d_ConnectionStatus = ConnectionStatus;
  type dataV1ExternalDatabaseConnection_universal_d_ProtocolVersion = ProtocolVersion;
  const dataV1ExternalDatabaseConnection_universal_d_ProtocolVersion: typeof ProtocolVersion;
  type dataV1ExternalDatabaseConnection_universal_d_Capabilities = Capabilities;
  type dataV1ExternalDatabaseConnection_universal_d_GetExternalDatabaseConnectionRequest = GetExternalDatabaseConnectionRequest;
  type dataV1ExternalDatabaseConnection_universal_d_GetExternalDatabaseConnectionResponse = GetExternalDatabaseConnectionResponse;
  type dataV1ExternalDatabaseConnection_universal_d_ListExternalDatabaseConnectionsRequest = ListExternalDatabaseConnectionsRequest;
  type dataV1ExternalDatabaseConnection_universal_d_ListExternalDatabaseConnectionsResponse = ListExternalDatabaseConnectionsResponse;
  type dataV1ExternalDatabaseConnection_universal_d_CreateExternalDatabaseConnectionRequest = CreateExternalDatabaseConnectionRequest;
  type dataV1ExternalDatabaseConnection_universal_d_ConnectionType = ConnectionType;
  const dataV1ExternalDatabaseConnection_universal_d_ConnectionType: typeof ConnectionType;
  type dataV1ExternalDatabaseConnection_universal_d_CreateExternalDatabaseConnectionResponse = CreateExternalDatabaseConnectionResponse;
  type dataV1ExternalDatabaseConnection_universal_d_UpdateExternalDatabaseConnectionRequest = UpdateExternalDatabaseConnectionRequest;
  type dataV1ExternalDatabaseConnection_universal_d_UpdateExternalDatabaseConnectionResponse = UpdateExternalDatabaseConnectionResponse;
  type dataV1ExternalDatabaseConnection_universal_d_DeleteExternalDatabaseConnectionRequest = DeleteExternalDatabaseConnectionRequest;
  type dataV1ExternalDatabaseConnection_universal_d_DeleteExternalDatabaseConnectionResponse = DeleteExternalDatabaseConnectionResponse;
  const dataV1ExternalDatabaseConnection_universal_d_getExternalDatabaseConnection: typeof getExternalDatabaseConnection;
  const dataV1ExternalDatabaseConnection_universal_d_listExternalDatabaseConnections: typeof listExternalDatabaseConnections;
  type dataV1ExternalDatabaseConnection_universal_d_ListExternalDatabaseConnectionsOptions = ListExternalDatabaseConnectionsOptions;
  const dataV1ExternalDatabaseConnection_universal_d_createExternalDatabaseConnection: typeof createExternalDatabaseConnection;
  type dataV1ExternalDatabaseConnection_universal_d_CreateExternalDatabaseConnectionOptions = CreateExternalDatabaseConnectionOptions;
  const dataV1ExternalDatabaseConnection_universal_d_updateExternalDatabaseConnection: typeof updateExternalDatabaseConnection;
  type dataV1ExternalDatabaseConnection_universal_d_UpdateExternalDatabaseConnection = UpdateExternalDatabaseConnection;
  const dataV1ExternalDatabaseConnection_universal_d_deleteExternalDatabaseConnection: typeof deleteExternalDatabaseConnection;
  namespace dataV1ExternalDatabaseConnection_universal_d {
    export {
      dataV1ExternalDatabaseConnection_universal_d_ExternalDatabaseConnection as ExternalDatabaseConnection,
      dataV1ExternalDatabaseConnection_universal_d_CauseOfFailure as CauseOfFailure,
      dataV1ExternalDatabaseConnection_universal_d_CollectionsFound as CollectionsFound,
      FieldType$1 as FieldType,
      dataV1ExternalDatabaseConnection_universal_d_ConnectionStatus as ConnectionStatus,
      dataV1ExternalDatabaseConnection_universal_d_ProtocolVersion as ProtocolVersion,
      dataV1ExternalDatabaseConnection_universal_d_Capabilities as Capabilities,
      dataV1ExternalDatabaseConnection_universal_d_GetExternalDatabaseConnectionRequest as GetExternalDatabaseConnectionRequest,
      dataV1ExternalDatabaseConnection_universal_d_GetExternalDatabaseConnectionResponse as GetExternalDatabaseConnectionResponse,
      dataV1ExternalDatabaseConnection_universal_d_ListExternalDatabaseConnectionsRequest as ListExternalDatabaseConnectionsRequest,
      Paging$3 as Paging,
      dataV1ExternalDatabaseConnection_universal_d_ListExternalDatabaseConnectionsResponse as ListExternalDatabaseConnectionsResponse,
      PagingMetadata$1 as PagingMetadata,
      dataV1ExternalDatabaseConnection_universal_d_CreateExternalDatabaseConnectionRequest as CreateExternalDatabaseConnectionRequest,
      dataV1ExternalDatabaseConnection_universal_d_ConnectionType as ConnectionType,
      dataV1ExternalDatabaseConnection_universal_d_CreateExternalDatabaseConnectionResponse as CreateExternalDatabaseConnectionResponse,
      dataV1ExternalDatabaseConnection_universal_d_UpdateExternalDatabaseConnectionRequest as UpdateExternalDatabaseConnectionRequest,
      dataV1ExternalDatabaseConnection_universal_d_UpdateExternalDatabaseConnectionResponse as UpdateExternalDatabaseConnectionResponse,
      dataV1ExternalDatabaseConnection_universal_d_DeleteExternalDatabaseConnectionRequest as DeleteExternalDatabaseConnectionRequest,
      dataV1ExternalDatabaseConnection_universal_d_DeleteExternalDatabaseConnectionResponse as DeleteExternalDatabaseConnectionResponse,
      DomainEvent$2 as DomainEvent,
      DomainEventBodyOneOf$2 as DomainEventBodyOneOf,
      EntityCreatedEvent$2 as EntityCreatedEvent,
      RestoreInfo$2 as RestoreInfo,
      EntityUpdatedEvent$2 as EntityUpdatedEvent,
      EntityDeletedEvent$2 as EntityDeletedEvent,
      ActionEvent$2 as ActionEvent,
      MessageEnvelope$2 as MessageEnvelope,
      IdentificationData$2 as IdentificationData,
      IdentificationDataIdOneOf$2 as IdentificationDataIdOneOf,
      WebhookIdentityType$2 as WebhookIdentityType,
      dataV1ExternalDatabaseConnection_universal_d_getExternalDatabaseConnection as getExternalDatabaseConnection,
      dataV1ExternalDatabaseConnection_universal_d_listExternalDatabaseConnections as listExternalDatabaseConnections,
      dataV1ExternalDatabaseConnection_universal_d_ListExternalDatabaseConnectionsOptions as ListExternalDatabaseConnectionsOptions,
      dataV1ExternalDatabaseConnection_universal_d_createExternalDatabaseConnection as createExternalDatabaseConnection,
      dataV1ExternalDatabaseConnection_universal_d_CreateExternalDatabaseConnectionOptions as CreateExternalDatabaseConnectionOptions,
      dataV1ExternalDatabaseConnection_universal_d_updateExternalDatabaseConnection as updateExternalDatabaseConnection,
      dataV1ExternalDatabaseConnection_universal_d_UpdateExternalDatabaseConnection as UpdateExternalDatabaseConnection,
      dataV1ExternalDatabaseConnection_universal_d_deleteExternalDatabaseConnection as deleteExternalDatabaseConnection,
    };
  }
  
  /** A data collection determines the structure of data to be stored in a database. */
  interface DataCollection {
      /** Collection ID. For example, `my-first-collection`. May include a namespace. */
      _id?: string;
      /**
       * Collection type. Indicates how the collection was created and how it is stored.
       * @readonly
       */
      collectionType?: CollectionType;
      /**
       * ID of the app that defined this collection. For collections defined by Wix users, this value is null.
       * @readonly
       */
      ownerAppId?: string | null;
      /**
       * Maximum number of items returned in a single query, based on the underlying storage.
       * Native collections have a maximum page size of 1000 for offset-based queries or 100 for cursor-based queries.
       * External collections' maximum page size defaults to 50, but an external provider can set any maximum value up to 1000.
       * @readonly
       */
      maxPageSize?: number | null;
      /** Collection's display name as shown in the CMS. For example, `My First Collection`. */
      displayName?: string | null;
      /**
       * Default item sorting order when a query doesn't specify one.
       * @readonly
       */
      defaultDisplayOrder?: Sort;
      /**
       * UI-friendly namespace of the Wix app with which the data collection is associated, such as Stores or Bookings.
       * Empty for all data collections not owned by Wix apps.
       * @readonly
       */
      displayNamespace?: string | null;
      /** Field whose value the CMS displays to represent the collection item when referenced in a different collection. */
      displayField?: string | null;
      /**
       * Capabilities the collection supports.
       * @readonly
       */
      capabilities?: CollectionCapabilities;
      /** Collection's field structure. */
      fields?: Field$1[];
      /** Levels of permission for accessing and modifying data, defined by lowest role needed to perform each action. */
      permissions?: Permissions;
      /**
       * Collection's current revision number, which increments each time the collection is updated. For an update operation to succeed, you must specify the latest revision number.
       * @readonly
       */
      revision?: string | null;
      /** Plugins the collection uses. Plugins apply additional capabilities to the collection or extend its functionality. */
      plugins?: Plugin[];
      /**
       * Paging modes the collection supports. In native collections, offset-based paging is supported by default.
       * @readonly
       */
      pagingModes?: PagingMode[];
      /**
       * Date the collection was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date the collection was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Levels of permission for accessing and modifying data.
       * @internal
       */
      dataPermissions?: DataPermissions;
      /**
       * Actual data operations permitted for the caller. Included only if requested by `include_allowed_data_permissions`
       * @internal
       * @readonly
       */
      allowedDataPermissions?: AllowedDataPermissions;
  }
  enum CollectionType {
      /** User-created collection. */
      NATIVE = "NATIVE",
      /** [Collection](https://support.wix.com/en/article/velo-working-with-wix-app-collections-and-code#what-are-wix-app-collections) created by a Wix app when it is installed. This type of collection can be modified dynamically by that app (for example, Wix Forms). */
      WIX_APP = "WIX_APP",
      /** Collection created by a Wix Blocks app. */
      BLOCKS_APP = "BLOCKS_APP",
      /** Collection located in externally connected storage. */
      EXTERNAL = "EXTERNAL"
  }
  interface Sort {
      /** Field to sort by. */
      fieldKey?: string;
      /**
       * Sort order. Use `ASC` for ascending order or `DESC` for descending order.
       *
       * Default: `ASC`
       */
      direction?: Direction;
  }
  enum Direction {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CollectionCapabilities {
      /**
       * Data operations the collection supports. The listed operations can be performed on data the collection contains.
       *
       * > **Note**: The `PATCH` and `BULK_PATCH` oeprations aren't currently supported.
       */
      dataOperations?: DataOperation[];
      /** Collection operations supported. The listed operations can be performed on the collection itself. */
      collectionOperations?: CollectionOperation[];
      /** Maximum number of indexes for the collection. */
      indexLimits?: IndexLimits;
  }
  enum DataOperation {
      AGGREGATE = "AGGREGATE",
      BULK_INSERT = "BULK_INSERT",
      BULK_REMOVE = "BULK_REMOVE",
      BULK_SAVE = "BULK_SAVE",
      BULK_UPDATE = "BULK_UPDATE",
      COUNT = "COUNT",
      DISTINCT = "DISTINCT",
      FIND = "FIND",
      GET = "GET",
      INSERT = "INSERT",
      INSERT_REFERENCE = "INSERT_REFERENCE",
      IS_REFERENCED = "IS_REFERENCED",
      QUERY_REFERENCED = "QUERY_REFERENCED",
      REMOVE = "REMOVE",
      REMOVE_REFERENCE = "REMOVE_REFERENCE",
      REPLACE_REFERENCES = "REPLACE_REFERENCES",
      SAVE = "SAVE",
      TRUNCATE = "TRUNCATE",
      UPDATE = "UPDATE",
      PATCH = "PATCH",
      BULK_PATCH = "BULK_PATCH"
  }
  enum CollectionOperation {
      /** Allows updating the collection's structure, for example adding, updating, or deleting fields. If not included, the collection's structure can't be changed. */
      UPDATE = "UPDATE",
      /** Allows deleting the entire collection. If not included, the collection can't be deleted. */
      REMOVE = "REMOVE"
  }
  interface IndexLimits {
      /** Maximum number of regular (non-unique) indexes allowed for this collection. */
      regular?: number;
      /** Maximum number of unique indexes allowed for this collection. */
      unique?: number;
      /** Maximum number of regular and unique indexes allowed for this collection. */
      total?: number;
  }
  interface Field$1 extends FieldRangeValidationsOneOf {
      /** Range of possible values for a numerical field. */
      numberRange?: NumberRange;
      /** Length range permitted for a text field. Relevant for fields that hold strings, such as those of type `TEXT` or `RICH_TEXT`. */
      stringLengthRange?: StringLengthRange;
      /** Array size range permitted. Relevant for fields that hold arrays, such as those of type `ARRAY`, `ARRAY_STRING`, or `ARRAY_DOCUMENT`. */
      arraySizeRange?: ArraySizeRange;
      /** Unique identifier for the field. For example, `firstName`. */
      key?: string;
      /** Field's display name when displayed in the CMS. For example, `First Name`. */
      displayName?: string | null;
      /** Field's data type. */
      type?: FieldType;
      /** Metadata for complex data types. This property only exists for references, multi-references, objects, and arrays. */
      typeMetadata?: TypeMetadata;
      /**
       * Whether the field is a system field.
       * @readonly
       */
      systemField?: boolean;
      /**
       * Capabilities the field supports.
       * @readonly
       */
      capabilities?: FieldCapabilities;
      /** Whether the field is encrypted. */
      encrypted?: boolean;
      /** Field description. */
      description?: string | null;
      /** @internal */
      plugin?: string | null;
      /**
       * Whether the field is read-only. A read-only field can't be changed.
       *
       * Default: `false`
       */
      readOnly?: boolean | null;
      /**
       * Whether the field is immutable. An immutable field can be set once, but then cannot be updated.
       *
       * Default: `false`
       */
      immutable?: boolean | null;
      /**
       * Whether the field is required.
       *
       * Default: `false`
       */
      required?: boolean | null;
      /** Additional optional plugins for the field. */
      plugins?: FieldPlugin[];
      /**
       * Whether the field is deleted. Returned only when `include_deleted_fields = true`.
       * @internal
       * @readonly
       */
      deleted?: boolean | null;
  }
  /** @oneof */
  interface FieldRangeValidationsOneOf {
      /** Range of possible values for a numerical field. */
      numberRange?: NumberRange;
      /** Length range permitted for a text field. Relevant for fields that hold strings, such as those of type `TEXT` or `RICH_TEXT`. */
      stringLengthRange?: StringLengthRange;
      /** Array size range permitted. Relevant for fields that hold arrays, such as those of type `ARRAY`, `ARRAY_STRING`, or `ARRAY_DOCUMENT`. */
      arraySizeRange?: ArraySizeRange;
  }
  enum FieldType {
      UNKNOWN_FIELD_TYPE = "UNKNOWN_FIELD_TYPE",
      TEXT = "TEXT",
      NUMBER = "NUMBER",
      DATE = "DATE",
      DATETIME = "DATETIME",
      IMAGE = "IMAGE",
      BOOLEAN = "BOOLEAN",
      DOCUMENT = "DOCUMENT",
      URL = "URL",
      RICH_TEXT = "RICH_TEXT",
      VIDEO = "VIDEO",
      ANY = "ANY",
      ARRAY_STRING = "ARRAY_STRING",
      ARRAY_DOCUMENT = "ARRAY_DOCUMENT",
      AUDIO = "AUDIO",
      TIME = "TIME",
      LANGUAGE = "LANGUAGE",
      RICH_CONTENT = "RICH_CONTENT",
      MEDIA_GALLERY = "MEDIA_GALLERY",
      ADDRESS = "ADDRESS",
      PAGE_LINK = "PAGE_LINK",
      REFERENCE = "REFERENCE",
      MULTI_REFERENCE = "MULTI_REFERENCE",
      OBJECT = "OBJECT",
      ARRAY = "ARRAY",
      /** Deprecated - can’t be added to collections. Can only appear in older collections. */
      LEGACY_TIME = "LEGACY_TIME",
      /** Deprecated - can’t be added to collections. Can only appear in older collections. */
      LEGACY_BOOK = "LEGACY_BOOK",
      /** Deprecated - can’t be added to collections. Can only appear in older collections. */
      LEGACY_EXTERNAL_URL = "LEGACY_EXTERNAL_URL",
      /** Deprecated - can’t be added to collections. Can only appear in older collections. */
      LEGACY_BROKEN_REFERENCE = "LEGACY_BROKEN_REFERENCE",
      /** Deprecated - can’t be added to collections. Can only appear in older collections. */
      LEGACY_IMAGE = "LEGACY_IMAGE",
      /** Deprecated - can’t be added to collections. Can only appear in older collections. */
      LEGACY_COLOR = "LEGACY_COLOR",
      /** Deprecated - can’t be added to collections. Can only appear in older collections. */
      LEGACY_EXTERNAL_VIDEO = "LEGACY_EXTERNAL_VIDEO"
  }
  interface TypeMetadata extends TypeMetadataMetadataOneOf {
      /** Metadata for a reference field. */
      reference?: Reference;
      /** Metadata for a multi-reference field. */
      multiReference?: MultiReference;
      /** Metadata for an object field. */
      object?: Object$1;
      /** Metadata for an array field. */
      array?: Array$1;
      /** Metadata for a page link field. */
      pageLink?: PageLink;
  }
  /** @oneof */
  interface TypeMetadataMetadataOneOf {
      /** Metadata for a reference field. */
      reference?: Reference;
      /** Metadata for a multi-reference field. */
      multiReference?: MultiReference;
      /** Metadata for an object field. */
      object?: Object$1;
      /** Metadata for an array field. */
      array?: Array$1;
      /** Metadata for a page link field. */
      pageLink?: PageLink;
  }
  interface FieldCapabilities {
      /**
       * Whether the collection can be sorted by this field.
       *
       * Default: `false`
       */
      sortable?: boolean;
      /** Query operators that can be used for this field. */
      queryOperators?: QueryOperator[];
  }
  enum QueryOperator {
      EQ = "EQ",
      LT = "LT",
      GT = "GT",
      NE = "NE",
      LTE = "LTE",
      GTE = "GTE",
      STARTS_WITH = "STARTS_WITH",
      ENDS_WITH = "ENDS_WITH",
      CONTAINS = "CONTAINS",
      HAS_SOME = "HAS_SOME",
      HAS_ALL = "HAS_ALL",
      EXISTS = "EXISTS",
      URLIZED = "URLIZED"
  }
  interface ObjectField {
      /** Field ID. */
      key?: string;
      /** Display name for the field. */
      displayName?: string | null;
      /** Field type. */
      type?: FieldType;
      /** Metadata for complex data types. This property only exists for references, multi-references, objects, and arrays. */
      typeMetadata?: TypeMetadata;
      /**
       * Capabilities the object field supports.
       * @readonly
       */
      capabilities?: FieldCapabilities;
  }
  interface FieldsPattern {
      pattern?: string;
      lowercase?: boolean;
  }
  interface UrlizedOnlyPattern {
      pattern?: string;
  }
  interface Calculator extends CalculatorPatternOneOf {
      /** Value is calculated according to pattern, whitespaces are replaced with dash [-]. */
      fieldsPattern?: FieldsPattern;
      /** Value is only URL encoded. */
      urlizedOnlyPattern?: UrlizedOnlyPattern;
  }
  /** @oneof */
  interface CalculatorPatternOneOf {
      /** Value is calculated according to pattern, whitespaces are replaced with dash [-]. */
      fieldsPattern?: FieldsPattern;
      /** Value is only URL encoded. */
      urlizedOnlyPattern?: UrlizedOnlyPattern;
  }
  interface Reference {
      /** Referenced collection ID. */
      referencedCollectionId?: string;
  }
  interface MultiReference {
      /** Referenced collection ID. */
      referencedCollectionId?: string;
      /** Referencing field ID. */
      referencingFieldKey?: string;
      /** Display name in the CMS for the referenced data. */
      referencingDisplayName?: string;
  }
  interface Object$1 {
      /** Fields within the object. */
      fields?: ObjectField[];
  }
  interface Array$1 {
      /** Element's data type. */
      elementType?: FieldType;
      /** Metadata for complex data types. This property only exists for references, multi-references, objects, and arrays. */
      typeMetadata?: TypeMetadata;
  }
  interface PageLink {
      calculator?: Calculator;
      /** Defines reference to router pattern in the site document. */
      linkedRouterPage?: string | null;
  }
  interface NumberRange {
      /**
       * Minimum permitted value for a numerical field.
       *
       * Default: No validation
       */
      min?: number | null;
      /**
       * Maximum permitted value for a numerical field.
       *
       * Default: No validation
       */
      max?: number | null;
  }
  interface StringLengthRange {
      /**
       * Minimum permitted length for a text field.
       *
       * Default: No validation
       */
      minLength?: number | null;
      /**
       * Maximum permitted length for a text field.
       *
       * Default: No validation
       */
      maxLength?: number | null;
  }
  interface ArraySizeRange {
      /**
       * Minimum permitted number of items in an array field. Relevant for fields that hold arrays, such as those of type `ARRAY`, `ARRAY_STRING`, or `ARRAY_DOCUMENT`.
       *
       * Default: No validation
       */
      minSize?: number | null;
      /**
       * Maximum permitted number of items in an array field. Relevant for fields that hold arrays, such as those of type `ARRAY`, `ARRAY_STRING`, or `ARRAY_DOCUMENT`.
       *
       * Default: No validation
       */
      maxSize?: number | null;
  }
  /** Optional plug-in aspects for fields */
  interface FieldPlugin extends FieldPluginOptionsOneOf {
      /** Options for the CMS plugin. */
      cmsOptions?: CmsOptions;
      type?: FieldPluginType;
  }
  /** @oneof */
  interface FieldPluginOptionsOneOf {
      /** Options for the CMS plugin. */
      cmsOptions?: CmsOptions;
  }
  enum FieldPluginType {
      /** Uknown plugin type. */
      UNKNOWN = "UNKNOWN",
      /** CMS-related field attributes */
      CMS = "CMS"
  }
  /** Options for the CMS plugin. */
  interface CmsOptions {
      /**
       * Indicates an internal CMS field. The CMS does not display internal fields.
       *
       * Default: `false`
       */
      internal?: boolean;
  }
  /** Permissions defined by the lowest role needed to perform each action. */
  interface Permissions {
      /** Lowest role needed to add a collection. */
      insert?: Role;
      /** Lowest role needed to update a collection. */
      update?: Role;
      /** Lowest role needed to remove a collection. */
      remove?: Role;
      /** Lowest role needed to read a collection. */
      read?: Role;
  }
  enum Role {
      /** Unknown role. */
      UNKNOWN_ROLE = "UNKNOWN_ROLE",
      /** Site administrator. */
      ADMIN = "ADMIN",
      /** Signed-in user who added content to this collection. */
      SITE_MEMBER_AUTHOR = "SITE_MEMBER_AUTHOR",
      /** Any signed-in user. */
      SITE_MEMBER = "SITE_MEMBER",
      /** Any site visitor. */
      ANYONE = "ANYONE"
  }
  interface Plugin extends PluginOptionsOneOf {
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishOptions?: PublishPluginOptions$1;
      /** Options for the Single Item plugin. */
      singleItemOptions?: SingleItemPluginOptions;
      /** Options for the Urlized plugin. */
      urlizedOptions?: UrlizedPluginOptions;
      /** Options for the Multilingual plugin. */
      multilingualOptions?: MultilingualOptions;
      /** Options for the PageLink plugin. */
      editablePageLinkOptions?: PageLinkPluginOptions;
      /** Options for the CMS plugin. */
      cmsOptions?: PluginCmsOptions;
      /** Plugin types. */
      type?: Type;
  }
  /** @oneof */
  interface PluginOptionsOneOf {
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishOptions?: PublishPluginOptions$1;
      /** Options for the Single Item plugin. */
      singleItemOptions?: SingleItemPluginOptions;
      /** Options for the Urlized plugin. */
      urlizedOptions?: UrlizedPluginOptions;
      /** Options for the Multilingual plugin. */
      multilingualOptions?: MultilingualOptions;
      /** Options for the PageLink plugin. */
      editablePageLinkOptions?: PageLinkPluginOptions;
      /** Options for the CMS plugin. */
      cmsOptions?: PluginCmsOptions;
  }
  enum Status$1 {
      UNKNOWN_PUBLISH_PLUGIN_STATUS = "UNKNOWN_PUBLISH_PLUGIN_STATUS",
      PUBLISHED = "PUBLISHED",
      DRAFT = "DRAFT"
  }
  enum Format {
      UNKNOWN_URLIZED_PLUGIN_FORMAT = "UNKNOWN_URLIZED_PLUGIN_FORMAT",
      /** Letters are converted to lower case and spaces are replaced with dashes before generating the encoded URL. */
      ORIGINAL = "ORIGINAL",
      /** No changes are made before generating the encoded URL. */
      PLAIN = "PLAIN"
  }
  /** if CMS-defined sort is enabled and should be used in site */
  interface SiteSort {
      /** Field and order for the site sort. */
      sort?: Sort[];
  }
  enum Type {
      /** Unknown plugin type. */
      UNKNOWN_PLUGIN_TYPE = "UNKNOWN_PLUGIN_TYPE",
      /** Allows items to be marked as either draft or published. For each item you can set a publishing time when the item will become visible to site visitors. */
      PUBLISH = "PUBLISH",
      /** Ensures the collection can have one item at most. Can only be applied to a new collection. */
      SINGLE_ITEM = "SINGLE_ITEM",
      /** Generates item URLs for collections used by dynamic pages. */
      URLIZED = "URLIZED",
      /** Deprecated. Will be removed in the future. */
      GRIDAPPLESS = "GRIDAPPLESS",
      /** Indicates that the collection is translatable. This allows you to manage translation for selected fields using [Wix Multilingual](https://www.wix.com/app-market/wix-multilingual). */
      MULTILINGUAL = "MULTILINGUAL",
      /** Indicates that collection is shared with current site. */
      SHARED = "SHARED",
      /** Indicates that page link fields are persisted and can be updated. */
      EDITABLE_PAGE_LINK = "EDITABLE_PAGE_LINK",
      /** CMS-specific collection properties. */
      CMS = "CMS"
  }
  interface PublishPluginOptions$1 {
      /** Default status. */
      defaultStatus?: Status$1;
  }
  interface SingleItemPluginOptions {
      /** ID of the single item in this collection. If you insert or update an item, its ID value is always changed to this. */
      singleItemId?: string;
  }
  interface UrlizedPluginOptions {
      /** Encoding method for generating a URL in ASCII characters. */
      format?: Format;
  }
  interface MultilingualOptions {
      /** IDs of fields to allow translation. */
      translatableFieldKeys?: string[];
  }
  interface PageLinkPluginOptions {
      isPersisted?: boolean;
      isMutable?: boolean;
  }
  interface PluginCmsOptions {
      /** CMS sort, applied when a collection is displayed on a site. */
      siteSort?: SiteSort;
  }
  enum PagingMode {
      /** Offset-based paging. */
      OFFSET = "OFFSET",
      /** Cursor-based paging. */
      CURSOR = "CURSOR"
  }
  /** Data permissions defined by access level for each action. */
  interface DataPermissions {
      /** Access level for data items read */
      itemRead?: AccessLevel;
      /** Access level for data items insert */
      itemInsert?: AccessLevel;
      /** Access level for data items update */
      itemUpdate?: AccessLevel;
      /** Access level for data items removal */
      itemRemove?: AccessLevel;
  }
  /**
   * Describes who can perform certain action.
   * Each level includes all levels below it (except UNDEFINED).
   */
  enum AccessLevel {
      /** Not set. */
      UNDEFINED = "UNDEFINED",
      /** Any subject, including visitors. */
      ANYONE = "ANYONE",
      /** Any signed-in user (both site members and collaborators). */
      SITE_MEMBER = "SITE_MEMBER",
      /** Any signed-in user, but site members only have access to own items. */
      SITE_MEMBER_AUTHOR = "SITE_MEMBER_AUTHOR",
      /** Site collaborator that has a role with CMS Access permission. */
      CMS_EDITOR = "CMS_EDITOR",
      /** CMS administrators and users or roles granted with special access. */
      PRIVILEGED = "PRIVILEGED"
  }
  interface AllowedDataPermissions {
      /** If data items read permitted */
      itemRead?: boolean;
      /** If for data items insert permitted */
      itemInsert?: boolean;
      /** If data items update permitted */
      itemUpdate?: boolean;
      /** If data items removal permitted */
      itemRemove?: boolean;
  }
  interface DataCollectionClonedEvent {
      /** Instance ID of the collection from which the data is cloned. */
      originInstanceId?: string;
      /** ID of the collection from which the data is cloned. */
      originId?: string;
  }
  interface DataCollectionChangedEvent {
      /** list of new fields */
      fieldsAdded?: Field$1[];
      /** list of changed fields */
      fieldsUpdated?: FieldUpdate$1[];
      /** list of removed fields */
      fieldsRemoved?: Field$1[];
      /** list of new plugins */
      pluginsAdded?: Plugin[];
      /** list of changed plugins */
      pluginsUpdated?: PluginUpdate[];
      /** list of removed plugins */
      pluginsRemoved?: Plugin[];
  }
  interface FieldUpdate$1 {
      /** previous state of the field */
      previous?: Field$1;
      /** current state of the field */
      current?: Field$1;
  }
  interface PluginUpdate {
      /** previous state of the plugin */
      previous?: Plugin;
      /** current state of the plugin */
      current?: Plugin;
  }
  interface CreateDataCollectionRequest {
      /** Collection details. */
      collection: DataCollection;
  }
  interface CreateDataCollectionResponse {
      /** Details of collection created. */
      collection?: DataCollection;
  }
  interface GetDataCollectionRequest {
      /** ID of the collection to retrieve. */
      dataCollectionId: string;
      /**
       * Whether to return all collections referenced by the requested collection.
       *
       * Default: `false`
       * @internal
       */
      includeReferencedCollections?: boolean;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       * Learn more about [Wix Data and eventual consistency](https://dev.wix.com/api/rest/wix-data/wix-data/eventual-consistency).
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /**
       * Whether to return deleted fields.
       *
       * Default: `false`
       * @internal
       */
      includeDeletedFields?: boolean;
      /**
       * If set allowed for caller data permissions would be included in the response
       * @internal
       */
      includeAllowedDataPermissions?: boolean;
      /**
       * Segment: PUBLIC or DEV.
       * Impacts blocks apps collections only: if PUBLIC, only apps in published site are included.
       * @internal
       */
      segment?: Segment;
      /**
       * List of specific field names to return, if empty all fields are returned.
       * Affects all returned collections
       */
      fields?: string[];
  }
  enum Segment {
      UNKNOWN_SEGMENT = "UNKNOWN_SEGMENT",
      PUBLIC = "PUBLIC",
      DEV = "DEV"
  }
  interface GetDataCollectionResponse {
      /** Details of the collection requested. */
      collection?: DataCollection;
      /**
       * Details of collections referenced by the collection requested.
       * Only populated when `includeReferencedCollections` is `true` in the request.
       */
      referencedCollections?: DataCollection[];
  }
  interface ListDataCollectionsRequest {
      /**
       * Defines how collections in the response are sorted.
       *
       * Default: Ordered by ID in ascending order.
       */
      sort?: Sorting$1;
      /** Pagination information. */
      paging?: Paging$2;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       * Learn more about [Wix Data and eventual consistency](https://dev.wix.com/api/rest/wix-data/wix-data/eventual-consistency).
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /**
       * If set allowed for caller data permissions would be included in the response
       * @internal
       */
      includeAllowedDataPermissions?: boolean;
      /**
       * Segment: PUBLIC or DEV.
       * Impacts blocks apps collections only: if PUBLIC, only apps in published site are included.
       * @internal
       */
      segment?: Segment;
      /**
       * List of specific field names to return, if empty all fields are returned.
       * Affects all returned collections
       */
      fields?: string[];
  }
  interface Sorting$1 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$1;
  }
  enum SortOrder$1 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface Paging$2 {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface ListDataCollectionsResponse {
      /** List of collections. */
      collections?: DataCollection[];
      /** Paging information. */
      pagingMetadata?: PagingMetadataV2$1;
  }
  interface PagingMetadataV2$1 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
      total?: number | null;
      /** Flag that indicates the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
  }
  interface BulkGetDataCollectionsRequest {
      /** IDs of the collections to retrieve. */
      dataCollectionIds?: string[];
      /**
       * Whether to include deleted collections.
       *
       * Default: `false`
       */
      showDeletedCollections?: boolean;
      /**
       * Whether the returned collection list should include referenced collections.
       *
       * Default: `false`
       */
      includeReferencedCollections?: boolean;
      /** Sorting preferences. */
      sort?: Sorting$1;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       * Learn more about [Wix Data and eventual consistency](https://dev.wix.com/api/rest/wix-data/wix-data/eventual-consistency).
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /**
       * If set allowed for caller data permissions would be included in the response
       * @internal
       */
      includeAllowedDataPermissions?: boolean;
      /**
       * Segment: PUBLIC or DEV.
       * Impacts blocks apps collections only: if PUBLIC, only apps in published site are included.
       * @internal
       */
      segment?: Segment;
      /**
       * List of specific field names to return, if empty all fields are returned.
       * Affects all returned collections
       */
      fields?: string[];
  }
  interface BulkGetDataCollectionsResponse {
      /**
       * List of requested collections.
       * When `include_referenced_collections` is `true` in the request, referenced collections are included here.
       */
      activeCollections?: DataCollection[];
      /** List of requested deleted collections. Only populated when `showDeletedCollections` is true in the request. */
      deletedCollections?: DataCollection[];
  }
  interface UpdateDataCollectionRequest {
      /** Updated collection details. The existing collection is replaced with this version. */
      collection: DataCollection;
  }
  interface UpdateDataCollectionResponse {
      /** Updated collection details. */
      collection?: DataCollection;
  }
  interface DeleteDataCollectionRequest {
      /** ID of the collection to delete. */
      dataCollectionId: string;
  }
  interface DeleteDataCollectionResponse {
  }
  interface RestoreDataCollectionRequest {
      /** Data Collection ID to restore */
      dataCollectionId?: string;
  }
  interface RestoreDataCollectionResponse {
      /** Restored data collection */
      dataCollection?: DataCollection;
  }
  interface CreateDataCollectionFieldRequest {
      /** ID of data collection to update */
      dataCollectionId: string;
      /** field to create */
      field: Field$1;
  }
  interface CreateDataCollectionFieldResponse {
      /** updated data collection */
      dataCollection?: DataCollection;
  }
  interface UpdateDataCollectionFieldRequest {
      /** ID of data collection to update */
      dataCollectionId: string;
      /** Field to update */
      field: Field$1;
  }
  interface UpdateDataCollectionFieldResponse {
      /** updated data collection */
      dataCollection?: DataCollection;
  }
  interface DeleteDataCollectionFieldRequest {
      /** ID of data collection to update */
      dataCollectionId: string;
      /** Field ID to delete */
      fieldKey: string;
  }
  interface DeleteDataCollectionFieldResponse {
      /** updated data collection */
      dataCollection?: DataCollection;
  }
  interface UpdateDataPermissionsRequest {
      /** ID of data collections to update */
      dataCollectionId?: string;
      /** Data permissions to set */
      dataPermissions?: DataPermissions;
  }
  interface UpdateDataPermissionsResponse {
      /** Updated data collection */
      dataCollection?: DataCollection;
  }
  interface BulkGetDataCollectionsPageBySnapshotsRequest {
      /** Ids of schema snapshot */
      snapshotIds?: string[];
      /** Pagination information. */
      paging?: Paging$2;
  }
  interface BulkGetDataCollectionsPageBySnapshotsResponse {
      /** List of snapshot collection map */
      snapshotCollections?: SnapshotCollection[];
      /** Paging information. */
      pagingMetadata?: PagingMetadataV2$1;
  }
  interface SnapshotCollection {
      /** snapshot to which collection belongs */
      snapshotId?: string;
      /** snapshot collection */
      collection?: DataCollection;
      /** snapshot of collection indexes */
      indexes?: Index$1[];
  }
  /** An index is a map of a collection's data, organized according to specific fields to increase query speed. */
  interface Index$1 {
      /** Name of the index. */
      name?: string;
      /**
       * Fields for which the index is defined.
       *
       * Max: 3 fields (for a unique index: 1 field)
       */
      fields?: IndexField[];
      /**
       * Current status of the index.
       * @readonly
       */
      status?: IndexStatus;
      /**
       * Contains details about the reasons for failure when `status` is `FAILED`.
       * @readonly
       */
      failure?: Failure$1;
      /**
       * Whether the index enforces uniqueness of values in the field for which it is defined.
       * If `true`, the index can have only one field.
       *
       * Default: `false`
       */
      unique?: boolean;
      /**
       * Whether the index ignores case.
       *
       * Default: `false`
       */
      caseInsensitive?: boolean;
  }
  /**
   * Order determines how values are ordered in the index. This is important when
   * ordering and/or range querying by indexed fields.
   */
  enum Order$1 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface IndexField {
      /** Path of the field to index. For example: `title` or `options.price`. */
      path?: string;
      /**
       * Sort order for the index. Base on how the data is regularly queried.
       *
       * Default: `ASC`
       */
      order?: Order$1;
  }
  enum IndexStatus {
      /** Place holder. Never returned by the service. */
      UNKNOWN = "UNKNOWN",
      /** Index creation is in progress. */
      BUILDING = "BUILDING",
      /** Index has been successfully created and can be used in queries. */
      ACTIVE = "ACTIVE",
      /** Index is in the process of being dropped. */
      DROPPING = "DROPPING",
      /** Index has been dropped successfully. */
      DROPPED = "DROPPED",
      /** Index creation has failed. */
      FAILED = "FAILED",
      /** Index contains incorrectly indexed data. */
      INVALID = "INVALID"
  }
  interface Failure$1 {
      /**
       * Error code.
       * - `WDE0112`: Unknown error while building collection index.
       * - `WDE0113`: Duplicate key error while building collection index.
       * - `WDE0114`: Document too large while building collection index.
       */
      code?: string;
      /**
       * Broad error code.
       * - `WD_UNKNOWN_ERROR`: Unknown error.
       * @internal
       */
      broadCode?: string;
      /** Description of the failure. */
      description?: string;
      /**
       * ID of the data item that caused the failure.
       * For example, if `unique` is `true`, the ID of an item containing a duplicate value.
       */
      itemId?: string | null;
  }
  interface CreateDataCollectionsSnapshotRequest {
  }
  interface CreateDataCollectionsSnapshotResponse {
      /** created snapshot ID */
      snapshotId?: string;
      /** data collections in snapshot */
      snapshotCollections?: DataCollection[];
  }
  interface RestoreDataCollectionsFromSnapshotRequest {
      /** snapshot ID to restore */
      snapshotId?: string;
      /**
       * collection IDs to restore, if empty – all collections would be restored
       * @deprecated
       * @replacedBy restoration_collections
       * @targetRemovalDate 2025-12-31
       */
      dataCollectionIds?: string[];
      /** collection to restore, if empty – all collections would be restored */
      restorationCollections?: RestorationCollection[];
  }
  interface Destination {
      /** Collection id. */
      dataCollectionId?: string;
      /** Display name. When not specified value is taken from the snapshot. */
      displayName?: string | null;
  }
  interface RestorationCollection {
      /** Collection ID to restore */
      dataCollectionId?: string;
      /**
       * Destination where to restore the collection.
       * When not specified destination is taken from snapshot.
       */
      destination?: Destination;
  }
  interface RestoreDataCollectionsFromSnapshotResponse {
      /** restored collections */
      restoredCollections?: DataCollection[];
  }
  interface DeleteDataCollectionsSnapshotRequest {
      /** snapshot ID to delete */
      snapshotId?: string;
  }
  interface DeleteDataCollectionsSnapshotResponse {
  }
  interface CreateMigratedCollectionsSnapshotRequest {
      existingSnapshotId?: string;
      newNamespace?: string;
      existingNamespace?: string;
  }
  interface CreateMigratedCollectionsSnapshotResponse {
      snapshotId?: string;
  }
  interface DomainEvent$1 extends DomainEventBodyOneOf$1 {
      createdEvent?: EntityCreatedEvent$1;
      updatedEvent?: EntityUpdatedEvent$1;
      deletedEvent?: EntityDeletedEvent$1;
      actionEvent?: ActionEvent$1;
      /**
       * Unique event ID.
       * Allows clients to ignore duplicate webhooks.
       */
      _id?: string;
      /**
       * Assumes actions are also always typed to an entity_type
       * Example: wix.stores.catalog.product, wix.bookings.session, wix.payments.transaction
       */
      entityFqdn?: string;
      /**
       * This is top level to ease client code dispatching of messages (switch on entity_fqdn+slug)
       * This is although the created/updated/deleted notion is duplication of the oneof types
       * Example: created/updated/deleted/started/completed/email_opened
       */
      slug?: string;
      /** ID of the entity associated with the event. */
      entityId?: string;
      /** Event timestamp in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format and UTC time. For example: 2020-04-26T13:57:50.699Z */
      eventTime?: Date | null;
      /**
       * Whether the event was triggered as a result of a privacy regulation application
       * (for example, GDPR).
       */
      triggeredByAnonymizeRequest?: boolean | null;
      /** If present, indicates the action that triggered the event. */
      originatedFrom?: string | null;
      /**
       * A sequence number defining the order of updates to the underlying entity.
       * For example, given that some entity was updated at 16:00 and than again at 16:01,
       * it is guaranteed that the sequence number of the second update is strictly higher than the first.
       * As the consumer, you can use this value to ensure that you handle messages in the correct order.
       * To do so, you will need to persist this number on your end, and compare the sequence number from the
       * message against the one you have stored. Given that the stored number is higher, you should ignore the message.
       */
      entityEventSequence?: string | null;
  }
  /** @oneof */
  interface DomainEventBodyOneOf$1 {
      createdEvent?: EntityCreatedEvent$1;
      updatedEvent?: EntityUpdatedEvent$1;
      deletedEvent?: EntityDeletedEvent$1;
      actionEvent?: ActionEvent$1;
  }
  interface EntityCreatedEvent$1 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$1;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$1 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$1 {
      /**
       * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
       * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
       * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
       */
      currentEntityAsJson?: string;
      /**
       * This field is currently part of the of the EntityUpdatedEvent msg, but scala/node libraries which implements the domain events standard
       * wont populate it / have any reference to it in the API.
       * The main reason for it is that fetching the old entity from the DB will have a performance hit on an update operation so unless truly needed,
       * the developer should send only the new (current) entity.
       * An additional reason is not wanting to send this additional entity over the wire (kafka) since in some cases it can be really big
       * Developers that must reflect the old entity will have to implement their own domain event sender mechanism which will follow the DomainEvent proto message.
       * @internal
       * @deprecated
       */
      previousEntityAsJson?: string | null;
      /**
       * WIP - This property will hold both names and values of the updated fields of the entity.
       * For more details please see [adr](https://docs.google.com/document/d/1PdqsOM20Ph2HAkmx8zvUnzzk3Sekp3BR9h34wSvsRnI/edit#heading=h.phlw87mh2imx) or [issue](https://github.com/wix-private/nile-tracker/issues/363)
       * @internal
       */
      modifiedFields?: Record<string, any>;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface EntityDeletedEvent$1 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface ActionEvent$1 {
      bodyAsJson?: string;
  }
  interface MessageEnvelope$1 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$1;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$1 extends IdentificationDataIdOneOf$1 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$1;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$1 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$1 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Creates a new data collection.
   *
   * The request body must include an ID, details for at least 1 field, and a permissions object. If any of these are missing, the collection isn't created.
   * @param collection - Collection details.
   * @public
   * @requiredField collection
   * @requiredField collection._id
   * @requiredField collection.fields.key
   * @requiredField collection.fields.type
   * @requiredField collection.permissions.insert
   * @requiredField collection.permissions.read
   * @requiredField collection.permissions.remove
   * @requiredField collection.permissions.update
   * @param options - Options for creating a data collection.
   * @permissionId WIX_DATA.CREATE_COLLECTION
   * @adminMethod
   * @returns Details of collection created.
   */
  function createDataCollection(collection: DataCollection): Promise<DataCollection>;
  /**
   * Retrieves a data collection by ID.
   * @param dataCollectionId - ID of the collection to retrieve.
   * @public
   * @requiredField dataCollectionId
   * @param options - Options for retrieving a data collection.
   * @permissionId WIX_DATA.GET_COLLECTION
   * @returns Details of the collection requested.
   */
  function getDataCollection(dataCollectionId: string, options?: GetDataCollectionOptions): Promise<DataCollection>;
  interface GetDataCollectionOptions {
      /**
       * Whether to return all collections referenced by the requested collection.
       *
       * Default: `false`
       * @internal
       */
      includeReferencedCollections?: boolean;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       * Learn more about [Wix Data and eventual consistency](https://dev.wix.com/api/rest/wix-data/wix-data/eventual-consistency).
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /**
       * Whether to return deleted fields.
       *
       * Default: `false`
       * @internal
       */
      includeDeletedFields?: boolean;
      /**
       * If set allowed for caller data permissions would be included in the response
       * @internal
       */
      includeAllowedDataPermissions?: boolean;
      /**
       * Segment: PUBLIC or DEV.
       * Impacts blocks apps collections only: if PUBLIC, only apps in published site are included.
       * @internal
       */
      segment?: Segment;
      /**
       * List of specific field names to return, if empty all fields are returned.
       * Affects all returned collections
       */
      fields?: string[];
  }
  /**
   * Retrieves a list of all data collections associated with the site or project.
   *
   * By default, the list is ordered by ID in ascending order.
   * @public
   * @param options - Options for retrieving a list of data collections.
   * @permissionId WIX_DATA.LIST_COLLECTIONS
   * @adminMethod
   */
  function listDataCollections(options?: ListDataCollectionsOptions): Promise<ListDataCollectionsResponse>;
  interface ListDataCollectionsOptions {
      /**
       * Defines how collections in the response are sorted.
       *
       * Default: Ordered by ID in ascending order.
       */
      sort?: Sorting$1;
      /** Pagination information. */
      paging?: Paging$2;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       * Learn more about [Wix Data and eventual consistency](https://dev.wix.com/api/rest/wix-data/wix-data/eventual-consistency).
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /**
       * If set allowed for caller data permissions would be included in the response
       * @internal
       */
      includeAllowedDataPermissions?: boolean;
      /**
       * Segment: PUBLIC or DEV.
       * Impacts blocks apps collections only: if PUBLIC, only apps in published site are included.
       * @internal
       */
      segment?: Segment;
      /**
       * List of specific field names to return, if empty all fields are returned.
       * Affects all returned collections
       */
      fields?: string[];
  }
  /**
   * Retrieves multiple data collections by ID.
   * Used in frontend databinding to load multiple specific collections at once. For internal use only.
   * @internal
   * @documentationMaturity preview
   * @permissionId WIX_DATA.BULK_GET_COLLECTIONS
   */
  function bulkGetDataCollections(options?: BulkGetDataCollectionsOptions): Promise<BulkGetDataCollectionsResponse>;
  interface BulkGetDataCollectionsOptions {
      /** IDs of the collections to retrieve. */
      dataCollectionIds?: string[];
      /**
       * Whether to include deleted collections.
       *
       * Default: `false`
       */
      showDeletedCollections?: boolean;
      /**
       * Whether the returned collection list should include referenced collections.
       *
       * Default: `false`
       */
      includeReferencedCollections?: boolean;
      /** Sorting preferences. */
      sort?: Sorting$1;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       * Learn more about [Wix Data and eventual consistency](https://dev.wix.com/api/rest/wix-data/wix-data/eventual-consistency).
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /**
       * If set allowed for caller data permissions would be included in the response
       * @internal
       */
      includeAllowedDataPermissions?: boolean;
      /**
       * Segment: PUBLIC or DEV.
       * Impacts blocks apps collections only: if PUBLIC, only apps in published site are included.
       * @internal
       */
      segment?: Segment;
      /**
       * List of specific field names to return, if empty all fields are returned.
       * Affects all returned collections
       */
      fields?: string[];
  }
  /**
   * Updates a data collection.
   *
   * A collection ID, revision number, permissions, and at least 1 field must be provided within the `collection` body parameter.
   * If a collection with that ID exists, and if its current `revision` number matches the one provided, it is updated.
   * Otherwise, the request fails.
   *
   * When a collection is updated, its `updatedDate` property is changed to the current date and its `revision` property is incremented.
   *
   * > **Note:**
   * > After a collection is updated, it only contains the properties included in the Update Data Collection request. If the existing collection has properties with values and those properties
   * > aren't included in the updated collection details, their values are lost.
   * @param collection - Updated collection details. The existing collection is replaced with this version.
   * @public
   * @requiredField collection
   * @requiredField collection._id
   * @requiredField collection.fields.key
   * @requiredField collection.fields.type
   * @requiredField collection.permissions.insert
   * @requiredField collection.permissions.read
   * @requiredField collection.permissions.remove
   * @requiredField collection.permissions.update
   * @requiredField collection.revision
   * @param options - Options for updating a data collection.
   * @permissionId WIX_DATA.UPDATE_COLLECTION
   * @adminMethod
   * @returns Updated collection details.
   */
  function updateDataCollection(collection: DataCollection): Promise<DataCollection>;
  /**
   * Deletes a data collection.
   *
   * > **Note:**
   * > Once a collection is deleted, it can only be restored for limited amount of time.
   * @param dataCollectionId - ID of the collection to delete.
   * @public
   * @requiredField dataCollectionId
   * @permissionId WIX_DATA.DELETE_COLLECTION
   * @adminMethod
   */
  function deleteDataCollection(dataCollectionId: string): Promise<void>;
  /**
   * Restores recently deleted collection.
   *
   * Fails with `WDE0025` if collection was deleted too long ago or has never existed.
   * @param dataCollectionId - Data Collection ID to restore
   * @internal
   * @documentationMaturity preview
   * @requiredField dataCollectionId
   * @permissionId WIX_DATA.CREATE_COLLECTION
   * @adminMethod
   */
  function restoreDataCollection(dataCollectionId: string): Promise<RestoreDataCollectionResponse>;
  /**
   * Adds new field to data collection schema
   * @param dataCollectionId - ID of data collection to update
   * @internal
   * @documentationMaturity preview
   * @requiredField dataCollectionId
   * @requiredField options
   * @requiredField options.field
   * @permissionId WIX_DATA.CREATE_COLLECTION_FIELD
   * @adminMethod
   */
  function createDataCollectionField(dataCollectionId: string, options: CreateDataCollectionFieldOptions): Promise<CreateDataCollectionFieldResponse>;
  interface CreateDataCollectionFieldOptions {
      /** field to create */
      field: Field$1;
  }
  /**
   * Updates data collection field
   * @param dataCollectionId - ID of data collection to update
   * @internal
   * @documentationMaturity preview
   * @requiredField dataCollectionId
   * @requiredField options
   * @requiredField options.field
   * @permissionId WIX_DATA.UPDATE_COLLECTION_FIELD
   * @adminMethod
   */
  function updateDataCollectionField(dataCollectionId: string, options: UpdateDataCollectionFieldOptions): Promise<UpdateDataCollectionFieldResponse>;
  interface UpdateDataCollectionFieldOptions {
      /** Field to update */
      field: Field$1;
  }
  /**
   * Deletes data collection field
   * @param dataCollectionId - ID of data collection to update
   * @internal
   * @documentationMaturity preview
   * @requiredField dataCollectionId
   * @requiredField options
   * @requiredField options.fieldKey
   * @permissionId WIX_DATA.DELETE_COLLECTION_FIELD
   * @adminMethod
   */
  function deleteDataCollectionField(dataCollectionId: string, options: DeleteDataCollectionFieldOptions): Promise<DeleteDataCollectionFieldResponse>;
  interface DeleteDataCollectionFieldOptions {
      /** Field ID to delete */
      fieldKey: string;
  }
  
  type dataV2DataCollection_universal_d_DataCollection = DataCollection;
  type dataV2DataCollection_universal_d_CollectionType = CollectionType;
  const dataV2DataCollection_universal_d_CollectionType: typeof CollectionType;
  type dataV2DataCollection_universal_d_Sort = Sort;
  type dataV2DataCollection_universal_d_Direction = Direction;
  const dataV2DataCollection_universal_d_Direction: typeof Direction;
  type dataV2DataCollection_universal_d_CollectionCapabilities = CollectionCapabilities;
  type dataV2DataCollection_universal_d_DataOperation = DataOperation;
  const dataV2DataCollection_universal_d_DataOperation: typeof DataOperation;
  type dataV2DataCollection_universal_d_CollectionOperation = CollectionOperation;
  const dataV2DataCollection_universal_d_CollectionOperation: typeof CollectionOperation;
  type dataV2DataCollection_universal_d_IndexLimits = IndexLimits;
  type dataV2DataCollection_universal_d_FieldRangeValidationsOneOf = FieldRangeValidationsOneOf;
  type dataV2DataCollection_universal_d_FieldType = FieldType;
  const dataV2DataCollection_universal_d_FieldType: typeof FieldType;
  type dataV2DataCollection_universal_d_TypeMetadata = TypeMetadata;
  type dataV2DataCollection_universal_d_TypeMetadataMetadataOneOf = TypeMetadataMetadataOneOf;
  type dataV2DataCollection_universal_d_FieldCapabilities = FieldCapabilities;
  type dataV2DataCollection_universal_d_QueryOperator = QueryOperator;
  const dataV2DataCollection_universal_d_QueryOperator: typeof QueryOperator;
  type dataV2DataCollection_universal_d_ObjectField = ObjectField;
  type dataV2DataCollection_universal_d_FieldsPattern = FieldsPattern;
  type dataV2DataCollection_universal_d_UrlizedOnlyPattern = UrlizedOnlyPattern;
  type dataV2DataCollection_universal_d_Calculator = Calculator;
  type dataV2DataCollection_universal_d_CalculatorPatternOneOf = CalculatorPatternOneOf;
  type dataV2DataCollection_universal_d_Reference = Reference;
  type dataV2DataCollection_universal_d_MultiReference = MultiReference;
  type dataV2DataCollection_universal_d_PageLink = PageLink;
  type dataV2DataCollection_universal_d_NumberRange = NumberRange;
  type dataV2DataCollection_universal_d_StringLengthRange = StringLengthRange;
  type dataV2DataCollection_universal_d_ArraySizeRange = ArraySizeRange;
  type dataV2DataCollection_universal_d_FieldPlugin = FieldPlugin;
  type dataV2DataCollection_universal_d_FieldPluginOptionsOneOf = FieldPluginOptionsOneOf;
  type dataV2DataCollection_universal_d_FieldPluginType = FieldPluginType;
  const dataV2DataCollection_universal_d_FieldPluginType: typeof FieldPluginType;
  type dataV2DataCollection_universal_d_CmsOptions = CmsOptions;
  type dataV2DataCollection_universal_d_Permissions = Permissions;
  type dataV2DataCollection_universal_d_Role = Role;
  const dataV2DataCollection_universal_d_Role: typeof Role;
  type dataV2DataCollection_universal_d_Plugin = Plugin;
  type dataV2DataCollection_universal_d_PluginOptionsOneOf = PluginOptionsOneOf;
  type dataV2DataCollection_universal_d_Format = Format;
  const dataV2DataCollection_universal_d_Format: typeof Format;
  type dataV2DataCollection_universal_d_SiteSort = SiteSort;
  type dataV2DataCollection_universal_d_Type = Type;
  const dataV2DataCollection_universal_d_Type: typeof Type;
  type dataV2DataCollection_universal_d_SingleItemPluginOptions = SingleItemPluginOptions;
  type dataV2DataCollection_universal_d_UrlizedPluginOptions = UrlizedPluginOptions;
  type dataV2DataCollection_universal_d_MultilingualOptions = MultilingualOptions;
  type dataV2DataCollection_universal_d_PageLinkPluginOptions = PageLinkPluginOptions;
  type dataV2DataCollection_universal_d_PluginCmsOptions = PluginCmsOptions;
  type dataV2DataCollection_universal_d_PagingMode = PagingMode;
  const dataV2DataCollection_universal_d_PagingMode: typeof PagingMode;
  type dataV2DataCollection_universal_d_DataPermissions = DataPermissions;
  type dataV2DataCollection_universal_d_AccessLevel = AccessLevel;
  const dataV2DataCollection_universal_d_AccessLevel: typeof AccessLevel;
  type dataV2DataCollection_universal_d_AllowedDataPermissions = AllowedDataPermissions;
  type dataV2DataCollection_universal_d_DataCollectionClonedEvent = DataCollectionClonedEvent;
  type dataV2DataCollection_universal_d_DataCollectionChangedEvent = DataCollectionChangedEvent;
  type dataV2DataCollection_universal_d_PluginUpdate = PluginUpdate;
  type dataV2DataCollection_universal_d_CreateDataCollectionRequest = CreateDataCollectionRequest;
  type dataV2DataCollection_universal_d_CreateDataCollectionResponse = CreateDataCollectionResponse;
  type dataV2DataCollection_universal_d_GetDataCollectionRequest = GetDataCollectionRequest;
  type dataV2DataCollection_universal_d_Segment = Segment;
  const dataV2DataCollection_universal_d_Segment: typeof Segment;
  type dataV2DataCollection_universal_d_GetDataCollectionResponse = GetDataCollectionResponse;
  type dataV2DataCollection_universal_d_ListDataCollectionsRequest = ListDataCollectionsRequest;
  type dataV2DataCollection_universal_d_ListDataCollectionsResponse = ListDataCollectionsResponse;
  type dataV2DataCollection_universal_d_BulkGetDataCollectionsRequest = BulkGetDataCollectionsRequest;
  type dataV2DataCollection_universal_d_BulkGetDataCollectionsResponse = BulkGetDataCollectionsResponse;
  type dataV2DataCollection_universal_d_UpdateDataCollectionRequest = UpdateDataCollectionRequest;
  type dataV2DataCollection_universal_d_UpdateDataCollectionResponse = UpdateDataCollectionResponse;
  type dataV2DataCollection_universal_d_DeleteDataCollectionRequest = DeleteDataCollectionRequest;
  type dataV2DataCollection_universal_d_DeleteDataCollectionResponse = DeleteDataCollectionResponse;
  type dataV2DataCollection_universal_d_RestoreDataCollectionRequest = RestoreDataCollectionRequest;
  type dataV2DataCollection_universal_d_RestoreDataCollectionResponse = RestoreDataCollectionResponse;
  type dataV2DataCollection_universal_d_CreateDataCollectionFieldRequest = CreateDataCollectionFieldRequest;
  type dataV2DataCollection_universal_d_CreateDataCollectionFieldResponse = CreateDataCollectionFieldResponse;
  type dataV2DataCollection_universal_d_UpdateDataCollectionFieldRequest = UpdateDataCollectionFieldRequest;
  type dataV2DataCollection_universal_d_UpdateDataCollectionFieldResponse = UpdateDataCollectionFieldResponse;
  type dataV2DataCollection_universal_d_DeleteDataCollectionFieldRequest = DeleteDataCollectionFieldRequest;
  type dataV2DataCollection_universal_d_DeleteDataCollectionFieldResponse = DeleteDataCollectionFieldResponse;
  type dataV2DataCollection_universal_d_UpdateDataPermissionsRequest = UpdateDataPermissionsRequest;
  type dataV2DataCollection_universal_d_UpdateDataPermissionsResponse = UpdateDataPermissionsResponse;
  type dataV2DataCollection_universal_d_BulkGetDataCollectionsPageBySnapshotsRequest = BulkGetDataCollectionsPageBySnapshotsRequest;
  type dataV2DataCollection_universal_d_BulkGetDataCollectionsPageBySnapshotsResponse = BulkGetDataCollectionsPageBySnapshotsResponse;
  type dataV2DataCollection_universal_d_SnapshotCollection = SnapshotCollection;
  type dataV2DataCollection_universal_d_IndexField = IndexField;
  type dataV2DataCollection_universal_d_IndexStatus = IndexStatus;
  const dataV2DataCollection_universal_d_IndexStatus: typeof IndexStatus;
  type dataV2DataCollection_universal_d_CreateDataCollectionsSnapshotRequest = CreateDataCollectionsSnapshotRequest;
  type dataV2DataCollection_universal_d_CreateDataCollectionsSnapshotResponse = CreateDataCollectionsSnapshotResponse;
  type dataV2DataCollection_universal_d_RestoreDataCollectionsFromSnapshotRequest = RestoreDataCollectionsFromSnapshotRequest;
  type dataV2DataCollection_universal_d_Destination = Destination;
  type dataV2DataCollection_universal_d_RestorationCollection = RestorationCollection;
  type dataV2DataCollection_universal_d_RestoreDataCollectionsFromSnapshotResponse = RestoreDataCollectionsFromSnapshotResponse;
  type dataV2DataCollection_universal_d_DeleteDataCollectionsSnapshotRequest = DeleteDataCollectionsSnapshotRequest;
  type dataV2DataCollection_universal_d_DeleteDataCollectionsSnapshotResponse = DeleteDataCollectionsSnapshotResponse;
  type dataV2DataCollection_universal_d_CreateMigratedCollectionsSnapshotRequest = CreateMigratedCollectionsSnapshotRequest;
  type dataV2DataCollection_universal_d_CreateMigratedCollectionsSnapshotResponse = CreateMigratedCollectionsSnapshotResponse;
  const dataV2DataCollection_universal_d_createDataCollection: typeof createDataCollection;
  const dataV2DataCollection_universal_d_getDataCollection: typeof getDataCollection;
  type dataV2DataCollection_universal_d_GetDataCollectionOptions = GetDataCollectionOptions;
  const dataV2DataCollection_universal_d_listDataCollections: typeof listDataCollections;
  type dataV2DataCollection_universal_d_ListDataCollectionsOptions = ListDataCollectionsOptions;
  const dataV2DataCollection_universal_d_bulkGetDataCollections: typeof bulkGetDataCollections;
  type dataV2DataCollection_universal_d_BulkGetDataCollectionsOptions = BulkGetDataCollectionsOptions;
  const dataV2DataCollection_universal_d_updateDataCollection: typeof updateDataCollection;
  const dataV2DataCollection_universal_d_deleteDataCollection: typeof deleteDataCollection;
  const dataV2DataCollection_universal_d_restoreDataCollection: typeof restoreDataCollection;
  const dataV2DataCollection_universal_d_createDataCollectionField: typeof createDataCollectionField;
  type dataV2DataCollection_universal_d_CreateDataCollectionFieldOptions = CreateDataCollectionFieldOptions;
  const dataV2DataCollection_universal_d_updateDataCollectionField: typeof updateDataCollectionField;
  type dataV2DataCollection_universal_d_UpdateDataCollectionFieldOptions = UpdateDataCollectionFieldOptions;
  const dataV2DataCollection_universal_d_deleteDataCollectionField: typeof deleteDataCollectionField;
  type dataV2DataCollection_universal_d_DeleteDataCollectionFieldOptions = DeleteDataCollectionFieldOptions;
  namespace dataV2DataCollection_universal_d {
    export {
      dataV2DataCollection_universal_d_DataCollection as DataCollection,
      dataV2DataCollection_universal_d_CollectionType as CollectionType,
      dataV2DataCollection_universal_d_Sort as Sort,
      dataV2DataCollection_universal_d_Direction as Direction,
      dataV2DataCollection_universal_d_CollectionCapabilities as CollectionCapabilities,
      dataV2DataCollection_universal_d_DataOperation as DataOperation,
      dataV2DataCollection_universal_d_CollectionOperation as CollectionOperation,
      dataV2DataCollection_universal_d_IndexLimits as IndexLimits,
      Field$1 as Field,
      dataV2DataCollection_universal_d_FieldRangeValidationsOneOf as FieldRangeValidationsOneOf,
      dataV2DataCollection_universal_d_FieldType as FieldType,
      dataV2DataCollection_universal_d_TypeMetadata as TypeMetadata,
      dataV2DataCollection_universal_d_TypeMetadataMetadataOneOf as TypeMetadataMetadataOneOf,
      dataV2DataCollection_universal_d_FieldCapabilities as FieldCapabilities,
      dataV2DataCollection_universal_d_QueryOperator as QueryOperator,
      dataV2DataCollection_universal_d_ObjectField as ObjectField,
      dataV2DataCollection_universal_d_FieldsPattern as FieldsPattern,
      dataV2DataCollection_universal_d_UrlizedOnlyPattern as UrlizedOnlyPattern,
      dataV2DataCollection_universal_d_Calculator as Calculator,
      dataV2DataCollection_universal_d_CalculatorPatternOneOf as CalculatorPatternOneOf,
      dataV2DataCollection_universal_d_Reference as Reference,
      dataV2DataCollection_universal_d_MultiReference as MultiReference,
      Object$1 as Object,
      Array$1 as Array,
      dataV2DataCollection_universal_d_PageLink as PageLink,
      dataV2DataCollection_universal_d_NumberRange as NumberRange,
      dataV2DataCollection_universal_d_StringLengthRange as StringLengthRange,
      dataV2DataCollection_universal_d_ArraySizeRange as ArraySizeRange,
      dataV2DataCollection_universal_d_FieldPlugin as FieldPlugin,
      dataV2DataCollection_universal_d_FieldPluginOptionsOneOf as FieldPluginOptionsOneOf,
      dataV2DataCollection_universal_d_FieldPluginType as FieldPluginType,
      dataV2DataCollection_universal_d_CmsOptions as CmsOptions,
      dataV2DataCollection_universal_d_Permissions as Permissions,
      dataV2DataCollection_universal_d_Role as Role,
      dataV2DataCollection_universal_d_Plugin as Plugin,
      dataV2DataCollection_universal_d_PluginOptionsOneOf as PluginOptionsOneOf,
      Status$1 as Status,
      dataV2DataCollection_universal_d_Format as Format,
      dataV2DataCollection_universal_d_SiteSort as SiteSort,
      dataV2DataCollection_universal_d_Type as Type,
      PublishPluginOptions$1 as PublishPluginOptions,
      dataV2DataCollection_universal_d_SingleItemPluginOptions as SingleItemPluginOptions,
      dataV2DataCollection_universal_d_UrlizedPluginOptions as UrlizedPluginOptions,
      dataV2DataCollection_universal_d_MultilingualOptions as MultilingualOptions,
      dataV2DataCollection_universal_d_PageLinkPluginOptions as PageLinkPluginOptions,
      dataV2DataCollection_universal_d_PluginCmsOptions as PluginCmsOptions,
      dataV2DataCollection_universal_d_PagingMode as PagingMode,
      dataV2DataCollection_universal_d_DataPermissions as DataPermissions,
      dataV2DataCollection_universal_d_AccessLevel as AccessLevel,
      dataV2DataCollection_universal_d_AllowedDataPermissions as AllowedDataPermissions,
      dataV2DataCollection_universal_d_DataCollectionClonedEvent as DataCollectionClonedEvent,
      dataV2DataCollection_universal_d_DataCollectionChangedEvent as DataCollectionChangedEvent,
      FieldUpdate$1 as FieldUpdate,
      dataV2DataCollection_universal_d_PluginUpdate as PluginUpdate,
      dataV2DataCollection_universal_d_CreateDataCollectionRequest as CreateDataCollectionRequest,
      dataV2DataCollection_universal_d_CreateDataCollectionResponse as CreateDataCollectionResponse,
      dataV2DataCollection_universal_d_GetDataCollectionRequest as GetDataCollectionRequest,
      dataV2DataCollection_universal_d_Segment as Segment,
      dataV2DataCollection_universal_d_GetDataCollectionResponse as GetDataCollectionResponse,
      dataV2DataCollection_universal_d_ListDataCollectionsRequest as ListDataCollectionsRequest,
      Sorting$1 as Sorting,
      SortOrder$1 as SortOrder,
      Paging$2 as Paging,
      dataV2DataCollection_universal_d_ListDataCollectionsResponse as ListDataCollectionsResponse,
      PagingMetadataV2$1 as PagingMetadataV2,
      dataV2DataCollection_universal_d_BulkGetDataCollectionsRequest as BulkGetDataCollectionsRequest,
      dataV2DataCollection_universal_d_BulkGetDataCollectionsResponse as BulkGetDataCollectionsResponse,
      dataV2DataCollection_universal_d_UpdateDataCollectionRequest as UpdateDataCollectionRequest,
      dataV2DataCollection_universal_d_UpdateDataCollectionResponse as UpdateDataCollectionResponse,
      dataV2DataCollection_universal_d_DeleteDataCollectionRequest as DeleteDataCollectionRequest,
      dataV2DataCollection_universal_d_DeleteDataCollectionResponse as DeleteDataCollectionResponse,
      dataV2DataCollection_universal_d_RestoreDataCollectionRequest as RestoreDataCollectionRequest,
      dataV2DataCollection_universal_d_RestoreDataCollectionResponse as RestoreDataCollectionResponse,
      dataV2DataCollection_universal_d_CreateDataCollectionFieldRequest as CreateDataCollectionFieldRequest,
      dataV2DataCollection_universal_d_CreateDataCollectionFieldResponse as CreateDataCollectionFieldResponse,
      dataV2DataCollection_universal_d_UpdateDataCollectionFieldRequest as UpdateDataCollectionFieldRequest,
      dataV2DataCollection_universal_d_UpdateDataCollectionFieldResponse as UpdateDataCollectionFieldResponse,
      dataV2DataCollection_universal_d_DeleteDataCollectionFieldRequest as DeleteDataCollectionFieldRequest,
      dataV2DataCollection_universal_d_DeleteDataCollectionFieldResponse as DeleteDataCollectionFieldResponse,
      dataV2DataCollection_universal_d_UpdateDataPermissionsRequest as UpdateDataPermissionsRequest,
      dataV2DataCollection_universal_d_UpdateDataPermissionsResponse as UpdateDataPermissionsResponse,
      dataV2DataCollection_universal_d_BulkGetDataCollectionsPageBySnapshotsRequest as BulkGetDataCollectionsPageBySnapshotsRequest,
      dataV2DataCollection_universal_d_BulkGetDataCollectionsPageBySnapshotsResponse as BulkGetDataCollectionsPageBySnapshotsResponse,
      dataV2DataCollection_universal_d_SnapshotCollection as SnapshotCollection,
      Index$1 as Index,
      Order$1 as Order,
      dataV2DataCollection_universal_d_IndexField as IndexField,
      dataV2DataCollection_universal_d_IndexStatus as IndexStatus,
      Failure$1 as Failure,
      dataV2DataCollection_universal_d_CreateDataCollectionsSnapshotRequest as CreateDataCollectionsSnapshotRequest,
      dataV2DataCollection_universal_d_CreateDataCollectionsSnapshotResponse as CreateDataCollectionsSnapshotResponse,
      dataV2DataCollection_universal_d_RestoreDataCollectionsFromSnapshotRequest as RestoreDataCollectionsFromSnapshotRequest,
      dataV2DataCollection_universal_d_Destination as Destination,
      dataV2DataCollection_universal_d_RestorationCollection as RestorationCollection,
      dataV2DataCollection_universal_d_RestoreDataCollectionsFromSnapshotResponse as RestoreDataCollectionsFromSnapshotResponse,
      dataV2DataCollection_universal_d_DeleteDataCollectionsSnapshotRequest as DeleteDataCollectionsSnapshotRequest,
      dataV2DataCollection_universal_d_DeleteDataCollectionsSnapshotResponse as DeleteDataCollectionsSnapshotResponse,
      dataV2DataCollection_universal_d_CreateMigratedCollectionsSnapshotRequest as CreateMigratedCollectionsSnapshotRequest,
      dataV2DataCollection_universal_d_CreateMigratedCollectionsSnapshotResponse as CreateMigratedCollectionsSnapshotResponse,
      DomainEvent$1 as DomainEvent,
      DomainEventBodyOneOf$1 as DomainEventBodyOneOf,
      EntityCreatedEvent$1 as EntityCreatedEvent,
      RestoreInfo$1 as RestoreInfo,
      EntityUpdatedEvent$1 as EntityUpdatedEvent,
      EntityDeletedEvent$1 as EntityDeletedEvent,
      ActionEvent$1 as ActionEvent,
      MessageEnvelope$1 as MessageEnvelope,
      IdentificationData$1 as IdentificationData,
      IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf,
      WebhookIdentityType$1 as WebhookIdentityType,
      dataV2DataCollection_universal_d_createDataCollection as createDataCollection,
      dataV2DataCollection_universal_d_getDataCollection as getDataCollection,
      dataV2DataCollection_universal_d_GetDataCollectionOptions as GetDataCollectionOptions,
      dataV2DataCollection_universal_d_listDataCollections as listDataCollections,
      dataV2DataCollection_universal_d_ListDataCollectionsOptions as ListDataCollectionsOptions,
      dataV2DataCollection_universal_d_bulkGetDataCollections as bulkGetDataCollections,
      dataV2DataCollection_universal_d_BulkGetDataCollectionsOptions as BulkGetDataCollectionsOptions,
      dataV2DataCollection_universal_d_updateDataCollection as updateDataCollection,
      dataV2DataCollection_universal_d_deleteDataCollection as deleteDataCollection,
      dataV2DataCollection_universal_d_restoreDataCollection as restoreDataCollection,
      dataV2DataCollection_universal_d_createDataCollectionField as createDataCollectionField,
      dataV2DataCollection_universal_d_CreateDataCollectionFieldOptions as CreateDataCollectionFieldOptions,
      dataV2DataCollection_universal_d_updateDataCollectionField as updateDataCollectionField,
      dataV2DataCollection_universal_d_UpdateDataCollectionFieldOptions as UpdateDataCollectionFieldOptions,
      dataV2DataCollection_universal_d_deleteDataCollectionField as deleteDataCollectionField,
      dataV2DataCollection_universal_d_DeleteDataCollectionFieldOptions as DeleteDataCollectionFieldOptions,
    };
  }
  
  interface DataItem {
      /** Data item ID. */
      _id?: string;
      /**
       * ID of the collection this item belongs to
       * @readonly
       */
      dataCollectionId?: string;
      /**
       * Data item contents.
       *
       * Property-value pairs representing the data item's payload. When retrieving a data item, it also includes the following read-only fields:
       *
       * + `_id`: Item ID.
       * + `_createdDate`: Date and time the item was added to the collection.
       * + `_updatedDate`: Date and time the item was last modified. When the item is first inserted, `_createdDate` and `_updatedDate` have the same value.
       * + `_ownerId`: ID of the user who created the item. Can be modified with site owner permissions.
       */
      data?: Record<string, any> | null;
  }
  interface InsertDataItemRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection in which to insert the item. */
      dataCollectionId: string;
      /** Item to insert. */
      dataItem: DataItem;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * If true, referenced items will be included.
       * @internal
       */
      includeReferencedItems?: boolean;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
  }
  enum Environment$1 {
      LIVE = "LIVE",
      SANDBOX = "SANDBOX",
      SANDBOX_PREFERRED = "SANDBOX_PREFERRED"
  }
  interface Options {
      /**
       * Should hooks execution be suppressed.
       * This option can only be used with Corvid backend
       * code identity.
       * @internal
       */
      suppressHooks?: boolean;
      /** @internal */
      appOptions?: Record<string, any> | null;
      /** @internal */
      publishPluginOptions?: PublishPluginOptions;
  }
  interface PublishPluginOptions {
      showDraftItems?: boolean;
  }
  interface InsertDataItemResponse {
      /** Inserted data item. */
      dataItem?: DataItem;
  }
  interface PatchDataItemRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection containing the existing item. */
      dataCollectionId: string;
      /** Patch set applied during item update. */
      patchSet: PatchSet;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  interface PatchSet {
      /** Data item ID. */
      dataItemId?: string;
      /** Set of field updates to be applied */
      fieldUpdates?: FieldUpdate[];
  }
  interface FieldUpdate extends FieldUpdateActionOptionsOneOf {
      setField?: SetField;
      incrementField?: IncrementField;
      appendToArray?: AppendToArray;
      removeFromArray?: RemoveFromArray;
      /** Field ID to be patched. For ex "title", "address.street" */
      fieldPath?: string;
      /** Action to be applied */
      action?: ACTION;
  }
  /** @oneof */
  interface FieldUpdateActionOptionsOneOf {
      setField?: SetField;
      incrementField?: IncrementField;
      appendToArray?: AppendToArray;
      removeFromArray?: RemoveFromArray;
  }
  enum ACTION {
      UNKNOWN_ACTION = "UNKNOWN_ACTION",
      SET_FIELD = "SET_FIELD",
      REMOVE_FIELD = "REMOVE_FIELD",
      INCREMENT_FIELD = "INCREMENT_FIELD",
      APPEND_TO_ARRAY = "APPEND_TO_ARRAY",
      REMOVE_FROM_ARRAY = "REMOVE_FROM_ARRAY"
  }
  interface SetField {
      value?: any;
  }
  interface IncrementField {
      value?: number;
  }
  interface AppendToArray {
      value?: any;
  }
  interface RemoveFromArray {
      value?: any;
  }
  interface DataPublishPluginOptions {
      /**
       * Whether to include draft items.
       * When `true`, the response includes both published and draft items. Default: `false`.
       */
      includeDraftItems?: boolean;
  }
  interface PatchDataItemResponse {
      /** Updated data item. */
      dataItem?: DataItem;
  }
  interface BulkPatchDataItemsRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection in which to update items. */
      dataCollectionId: string;
      /** Patch sets to apply. */
      patchSets: PatchSet[];
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to return the updated data items.
       * When `true`, the `results` objects contain a `dataItem` field.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying:
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  interface BulkPatchDataItemsResponse {
      /** Information about the updated items. */
      results?: BulkDataItemResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkDataItemResult {
      /**
       * The action attempted for the data item.
       *
       * Supported values: `UNKNOWN_ACTION_TYPE`, `INSERT`, `UPDATE`, `DELETE`.
       */
      action?: BulkActionType;
      /** Metadata related to the data item for which the action was attempted. */
      itemMetadata?: ItemMetadata;
      /** The data item for which the action was attempted. Only returned if `returnEntity` is `true` in the request and the action is successful. */
      dataItem?: DataItem;
  }
  enum BulkActionType {
      UNKNOWN_ACTION_TYPE = "UNKNOWN_ACTION_TYPE",
      INSERT = "INSERT",
      UPDATE = "UPDATE",
      DELETE = "DELETE",
      PATCH = "PATCH"
  }
  interface ItemMetadata {
      /** Item ID. This field doesn't appear if there is no item ID, for example, when item creation fails. */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError;
  }
  interface ApplicationError {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  interface BulkActionMetadata {
      /** Number of items successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
  }
  interface UpdateDataItemRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection containing the existing item. */
      dataCollectionId: string;
      /** Updated data item content. The existing data item's content is replaced entirely. */
      dataItem: DataItem;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * If true, referenced items will be included.
       * @internal
       */
      includeReferencedItems?: boolean;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  interface UpdateDataItemResponse {
      /** Updated data item. */
      dataItem?: DataItem;
  }
  interface SaveDataItemRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection in which to insert or update the item. */
      dataCollectionId: string;
      /** Data item to insert or update. */
      dataItem: DataItem;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * If true, referenced items will be included.
       * @internal
       */
      includeReferencedItems?: boolean;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  interface SaveDataItemResponse {
      /** The action carried out for the item. */
      action?: Action;
      /** Inserted or updated data item. */
      dataItem?: DataItem;
  }
  enum Action {
      /** Undefined action. */
      UNKNOWN_ACTION = "UNKNOWN_ACTION",
      /** A new item was added to the collection. */
      INSERTED = "INSERTED",
      /** An existing item in the collection was updated. */
      UPDATED = "UPDATED"
  }
  interface GetDataItemRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection from which to retrieve the data item. */
      dataCollectionId: string;
      /** ID of the data item to retrieve. */
      dataItemId: string;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /**
       * Language to translate result text into, in [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) format.
       * If provided, the result text is returned in the specified language.
       * **Note:** Translation for the specified language must be enabled for the collection in [Wix Multilingual](https://www.wix.com/app-market/wix-multilingual).
       *
       * If not provided, result text is not translated.
       */
      language?: string | null;
      /**
       * Fields to return for the item. Only fields specified in the array are included in the response. If the array is empty, all fields are returned.
       * **Note:** The `_id` system field is always returned.
       */
      fields?: string[];
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  interface GetDataItemResponse {
      /** Retrieved item. */
      dataItem?: DataItem;
  }
  interface RemoveDataItemRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection from which to remove the item. */
      dataCollectionId: string;
      /** ID of the item to remove. */
      dataItemId: string;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  interface RemoveDataItemResponse {
      /** Removed item. */
      dataItem?: DataItem;
  }
  interface TruncateDataItemsRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection to truncate. */
      dataCollectionId: string;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
  }
  interface TruncateDataItemsResponse {
  }
  interface QueryDataItemsRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection to query. */
      dataCollectionId: string;
      /** Query preferences. For more details on using queries, see [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language). */
      query?: QueryV2;
      /**
       * Whether to return the total count in the response for a query with offset paging.
       * When `true`, the `pagingMetadata` object in the response contains a `total` field.
       *
       * Default: `false`
       */
      returnTotalCount?: boolean;
      /**
       * Properties for which to include referenced items in the query's results.
       * Up to 50 referenced items can be included for each item that matches the query.
       * @deprecated
       * @replacedBy referenced_item_options
       * @targetRemovalDate 2025-08-01
       */
      includeReferencedItems?: string[];
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /**
       * Language to translate result text into, in [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) format.
       * If provided, the result text is returned in the specified language.
       * **Note:** Translation for the specified language must be enabled for the collection in [Wix Multilingual](https://www.wix.com/app-market/wix-multilingual).
       *
       * If not provided, result text is not translated.
       */
      language?: string | null;
      /**
       * Request information about this collection caching
       * @internal
       */
      requestCachingInfo?: boolean;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
      /** Options for retrieving referenced items. */
      referencedItemOptions?: ReferencedItemOptions[];
  }
  interface QueryV2 extends QueryV2PagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$1;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
      /**
       * Filter object in the following format:
       *
       * `"filter" : {
       * "fieldName1": "value1",
       * "fieldName2":{"$operator":"value2"}
       * }`
       *
       * Examples of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
       *
       * **Note:** The values you provide for each field must adhere to that field's type. For example, when filtering by a field whose type is Date and Time, use an object in the following format: `"someDateAndTimeFieldKey": { "$date": "YYYY-MM-DDTHH:mm:ss.sssZ"}`. Learn more about [data types in Wix Data](https://dev.wix.com/docs/rest/business-solutions/cms/data-items/data-types-in-wix-data).
       */
      filter?: Record<string, any> | null;
      /**
       * Sort object in the following format:
       * `[{"fieldName":"sortField1","order":"ASC"},{"fieldName":"sortField2","order":"DESC"}]`
       */
      sort?: Sorting[];
      /**
       * Fields to return for each item. Only fields specified in the array are included in the response. If the array is empty, all fields are returned.
       * **Note:** The `_id` system field is always returned.
       */
      fields?: string[];
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
      /**
       * Sort order.
       *
       * Supported values: `ASC`, `DESC`.
       */
      order?: SortOrder;
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
      /** Number of items to load. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * You can get the relevant cursor token
       * from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface ReferencedItemOptions {
      /** Field containing references in the queried item. */
      fieldName?: string;
      /** Maximum number of referenced items to include for each queried item. */
      limit?: number | null;
  }
  interface QueryDataItemsResponse {
      /** Retrieved items. */
      dataItems?: DataItem[];
      /**
       * Caching info, returned if `request_caching_info` is set and caching is allowed
       * @internal
       */
      cachingInfo?: CachingInfo;
      /** Paging information. */
      pagingMetadata?: PagingMetadataV2;
  }
  interface CachingInfo {
      /** Caching tags for this collection */
      tags?: string[];
      /** max caching time if set */
      maxAge?: number | null;
  }
  interface PagingMetadataV2 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. Returned if offset paging is used, `returnTotalCount` is `true` in the request, and `tooManyToCount` is false. */
      total?: number | null;
      /** Whether the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
      cursors?: Cursors;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface Cursors {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface AggregateDataItemsRequest extends AggregateDataItemsRequestPagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$1;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection on which to run the aggregation. */
      dataCollectionId: string;
      /**
       * Filter applied to the collection's data prior to running the aggregation. See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language#getting-started_api-query-language_the-filter-section) for information on how to structure a filter object.
       *
       * **Note:** The values you provide for each filter field must adhere to that field's type. For example, when filtering by a field whose type is Date and Time, use an object in the following format: `"someDateAndTimeFieldKey": { "$date": "YYYY-MM-DDTHH:mm:ss.sssZ"}`. Learn more about [data types in Wix Data](https://dev.wix.com/docs/rest/business-solutions/cms/data-items/data-types-in-wix-data).
       */
      initialFilter?: Record<string, any> | null;
      /** Aggregation applied to the data. */
      aggregation?: Aggregation;
      /**
       * Filter applied to the processed data following the aggregation. See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language#getting-started_api-query-language_the-filter-section) for information on how to structure a filter object.
       * **Note:** The values you provide for each filter field must adhere to that field's type. For example, when filtering by a field whose type is Date and Time, use an object in the following format: `"someDateAndTimeFieldKey": { "$date": "YYYY-MM-DDTHH:mm:ss.sssZ"}`. Learn more about [data types in Wix Data](https://dev.wix.com/docs/rest/business-solutions/cms/data-items/data-types-in-wix-data).
       */
      finalFilter?: Record<string, any> | null;
      /**
       * Sort object in the following format:
       * `[{"fieldName":"sortField1","order":"ASC"},{"fieldName":"sortField2","order":"DESC"}]`
       */
      sort?: Sorting[];
      /**
       * Whether to return the total count in the response for a query with offset paging.
       * When `true`, the `pagingMetadata` object in the response contains a `total` field.
       *
       * Default: `false`
       */
      returnTotalCount?: boolean;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /**
       * Language to translate result text into, in [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) format.
       * If provided, the result text is returned in the specified language.
       * **Note:** Translation for the specified language must be enabled for the collection in [Wix Multilingual](https://www.wix.com/app-market/wix-multilingual).
       *
       * If not provided, result text is not translated.
       */
      language?: string | null;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  /** @oneof */
  interface AggregateDataItemsRequestPagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$1;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
  }
  interface Average {
      /** Name of the field for which to calculate the average value. */
      itemFieldName?: string;
  }
  interface Min {
      /** Name of the field for which to calculate the minimum value. */
      itemFieldName?: string;
  }
  interface Max {
      /** Name of the field for which to calculate the maximum value. */
      itemFieldName?: string;
  }
  interface Sum {
      /** Name of the field for which to calculate the sum. */
      itemFieldName?: string;
  }
  interface Count {
  }
  interface Operation extends OperationCalculateOneOf {
      /** Calculate the average value of a specified field for all items in the grouping. */
      average?: Average;
      /** Calculate the minimum value of a specified field for all items in the grouping. */
      min?: Min;
      /** Calculate the maximum value of a specified field for all items in the grouping. */
      max?: Max;
      /** Calculate the sum of values of a specified field for all items in the grouping. */
      sum?: Sum;
      /** Calculate the number of items in the grouping. */
      itemCount?: Count;
      /** Name of the field containing results of the operation. */
      resultFieldName?: string;
  }
  /** @oneof */
  interface OperationCalculateOneOf {
      /** Calculate the average value of a specified field for all items in the grouping. */
      average?: Average;
      /** Calculate the minimum value of a specified field for all items in the grouping. */
      min?: Min;
      /** Calculate the maximum value of a specified field for all items in the grouping. */
      max?: Max;
      /** Calculate the sum of values of a specified field for all items in the grouping. */
      sum?: Sum;
      /** Calculate the number of items in the grouping. */
      itemCount?: Count;
  }
  interface Aggregation {
      /** Fields by which to group items for the aggregation. If empty, the aggregation is carried out on all items in the collection. */
      groupingFields?: string[];
      /** Operations to carry out on the data in each grouping. */
      operations?: Operation[];
  }
  interface AggregateDataItemsResponse {
      /** Aggregation results. */
      results?: Record<string, any>[] | null;
      /** Paging information. */
      pagingMetadata?: PagingMetadataV2;
  }
  interface CountDataItemsRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection for which to count query results. */
      dataCollectionId: string;
      /**
       * Filter object in the following format:
       *
       * `"filter" : {
       * "fieldName1": "value1",
       * "fieldName2":{"$operator":"value2"}
       * }`.
       *
       * Examples of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`.
       *
       * **Note:** The values you provide for each field must adhere to that field's type. For example, when filtering by a field whose type is Date and Time, use an object in the following format: `"someDateAndTimeFieldKey": { "$date": "YYYY-MM-DDTHH:mm:ss.sssZ"}`. Learn more about [data types in Wix Data](https://dev.wix.com/docs/rest/business-solutions/cms/data-items/data-types-in-wix-data).
       */
      filter?: Record<string, any> | null;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /**
       * Language to translate result text into, in [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) format.
       * If provided, the result text is returned in the specified language.
       * **Note:** Translation for the specified language must be enabled for the collection in [Wix Multilingual](https://www.wix.com/app-market/wix-multilingual).
       *
       * If not provided, result text is not translated.
       */
      language?: string | null;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  interface CountDataItemsResponse {
      /** Number of items matching the query. */
      totalCount?: number;
  }
  interface QueryDistinctValuesRequest extends QueryDistinctValuesRequestPagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$1;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection to query. */
      dataCollectionId: string;
      /** Item field name for which to return all distinct values. */
      fieldName?: string;
      /**
       * Filter object in the following format:
       *
       * `"filter" : {
       * "fieldName1": "value1",
       * "fieldName2":{"$operator":"value2"}
       * }`.
       *
       * Examples of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`.
       *
       * **Note:** The values you provide for each field must adhere to that field's type. For example, when filtering by a field whose type is Date and Time, use an object in the following format: `"someDateAndTimeFieldKey": { "$date": "YYYY-MM-DDTHH:mm:ss.sssZ"}`. Learn more about [data types in Wix Data](https://dev.wix.com/docs/rest/business-solutions/cms/data-items/data-types-in-wix-data).
       */
      filter?: Record<string, any> | null;
      /**
       * Sort order.
       *
       * Supported values: `ASC`, `DESC`.
       */
      order?: SortOrder;
      /**
       * Whether to return the total count in the response for a query with offset paging.
       * When `true`, the `pagingMetadata` object in the response contains a `total` field.
       *
       * Default: `false`
       */
      returnTotalCount?: boolean;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /**
       * Language to translate result text into, in [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) format.
       * If provided, the result text is returned in the specified language.
       * **Note:** Translation for the specified language must be enabled for the collection in [Wix Multilingual](https://www.wix.com/app-market/wix-multilingual).
       *
       * If not provided, result text is not translated.
       */
      language?: string | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  /** @oneof */
  interface QueryDistinctValuesRequestPagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$1;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
  }
  interface QueryDistinctValuesResponse {
      /** List of distinct values contained in the field specified in `fieldName`. */
      distinctValues?: any[];
      /** Paging information. */
      pagingMetadata?: PagingMetadataV2;
  }
  interface BulkInsertDataItemsRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection in which to insert the items. */
      dataCollectionId: string;
      /** Data items to insert. */
      dataItems: DataItem[];
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options.
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to return the inserted data items.
       * When `true`, the `results` objects contain a `dataItem` field.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
  }
  interface BulkInsertDataItemsResponse {
      /** Information about the inserted items. */
      results?: BulkDataItemResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkUpdateDataItemsRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection in which to update items. */
      dataCollectionId: string;
      /** Data items to update. */
      dataItems: DataItem[];
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to return the updated data items.
       * When `true`, the `results` objects contain a `dataItem` field.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  interface BulkUpdateDataItemsResponse {
      /** Information about the updated items. */
      results?: BulkDataItemResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkSaveDataItemsRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection in which to insert or update the items. */
      dataCollectionId: string;
      /** Data items to insert or update. */
      dataItems: DataItem[];
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to return the saved data item.
       * When `true`, the `results` objects contain a `dataItem` field.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  interface BulkSaveDataItemsResponse {
      /** Information about the saved items. */
      results?: BulkDataItemResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkRemoveDataItemsRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection from which to remove the item. */
      dataCollectionId: string;
      /** IDs of data items to remove. */
      dataItemIds: string[];
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  interface BulkRemoveDataItemsResponse {
      /** Information about the removed data items. */
      results?: BulkDataItemResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface QueryReferencedDataItemsRequest extends QueryReferencedDataItemsRequestPagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$1;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection containing the referring item. */
      dataCollectionId: string;
      /** ID of the referring item. */
      referringItemId?: string;
      /** Field containing references in the referring item. */
      referringItemFieldName?: string;
      /** Order of the returned referenced items. Sorted by the date each item was referenced. */
      order?: SortOrder;
      /**
       * Whether to return the total count in the response.
       * When `true`, the `pagingMetadata` object in the response contains a `total` field.
       *
       * Default: `false`
       */
      returnTotalCount?: boolean;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /**
       * Language to translate result text into, in [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) format.
       * If provided, the result text is returned in the specified language.
       * **Note:** Translation for the specified language must be enabled for the collection in [Wix Multilingual](https://www.wix.com/app-market/wix-multilingual).
       *
       * If not provided, result text is not translated.
       */
      language?: string | null;
      /**
       * Fields to return for each referenced item. Only fields specified in the array are included in the response. If the array is empty, all fields are returned.
       * **Note:** The `_id` system field is always returned.
       */
      fields?: string[];
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying:
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
      /**
       * IDs of the referring items.
       * @internal
       */
      referringItemIds?: string[];
  }
  /** @oneof */
  interface QueryReferencedDataItemsRequestPagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$1;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
  }
  interface QueryReferencedDataItemsResponse {
      /** Referenced items and/or IDs. For successfully resolved references, the referenced data item is returned. For references that can't be resolved, the ID is returned. */
      results?: ReferencedResult[];
      /** Paging information. */
      pagingMetadata?: PagingMetadataV2;
  }
  interface UnresolvedReference {
      /**
       * ID of the referring item.
       * @deprecated
       * @targetRemovalDate 2025-03-01
       */
      referringItemId?: string;
      /**
       * Field specified to query for references.
       * @deprecated
       * @targetRemovalDate 2025-03-01
       */
      referringItemFieldName?: string;
      /** ID of unresolved referenced item */
      referencedItemId?: string;
      /** Flag is set if item exists, but user is not authorized to read it */
      unauthorized?: boolean;
  }
  interface ReferencedResult extends ReferencedResultEntityOneOf {
      /** Data item referenced. */
      dataItem?: DataItem;
      /** Unresolved reference. Appears instead of the data item when the reference doesn't resolve, for example, when an ID isn't found or if an item is in draft state. */
      unresolvedReference?: UnresolvedReference;
      /** ID of the referring item. */
      referringItemId?: string;
  }
  /** @oneof */
  interface ReferencedResultEntityOneOf {
      /** Data item referenced. */
      dataItem?: DataItem;
      /** Unresolved reference. Appears instead of the data item when the reference doesn't resolve, for example, when an ID isn't found or if an item is in draft state. */
      unresolvedReference?: UnresolvedReference;
  }
  interface IsReferencedDataItemRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection containing the referring data item. */
      dataCollectionId: string;
      /** Field to check for a reference to the item that may be referenced. */
      referringItemFieldName: string;
      /** ID of the referring item. */
      referringItemId: string;
      /** ID of the item that may be referenced. */
      referencedItemId: string;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /** @internal */
      appOptions?: Record<string, any> | null;
  }
  interface IsReferencedDataItemResponse {
      /** Whether the specified reference exists. */
      isReferenced?: boolean;
  }
  interface InsertDataItemReferenceRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection in which to insert the reference. */
      dataCollectionId: string;
      /** Reference to insert */
      dataItemReference?: DataItemReference;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
  }
  interface DataItemReference {
      /** Referring item field containing the references to the referenced items. */
      referringItemFieldName?: string;
      /** ID of the referring item. */
      referringItemId?: string;
      /** ID of the referenced item. */
      referencedItemId?: string;
  }
  interface InsertDataItemReferenceResponse {
      /** Inserted reference. */
      dataItemReference?: DataItemReference;
  }
  interface RemoveDataItemReferenceRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection containing the referring item. */
      dataCollectionId: string;
      /** Reference to remove. */
      dataItemReference: DataItemReference;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /** @internal */
      appOptions?: Record<string, any> | null;
  }
  interface RemoveDataItemReferenceResponse {
      /** Removed reference. */
      dataItemReference?: DataItemReference;
  }
  interface BulkInsertDataItemReferencesRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection containing the referring items. */
      dataCollectionId: string;
      /** References to insert. */
      dataItemReferences: DataItemReference[];
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to return the inserted data item references.
       * When `true`, the `results` objects contain a `dataItemReference` field.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** @internal */
      appOptions?: Record<string, any> | null;
  }
  interface BulkInsertDataItemReferencesResponse {
      /** Information about the inserted references. */
      results?: BulkDataItemReferenceResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkDataItemReferenceResult {
      /**
       * The action attempted for the reference.
       *
       * Supported values: `UNKNOWN_ACTION_TYPE`, `INSERT`, `UPDATE`, `DELETE`.
       */
      action?: BulkActionType;
      /** Metadata related to the reference for which the action was attempted. */
      referenceMetadata?: ItemMetadata;
      /** The reference for which the action was attempted. Only returned if `returnEntity` is `true` in the request and the action is successful. */
      dataItemReference?: DataItemReference;
  }
  interface BulkRemoveDataItemReferencesRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection containing the referring items. */
      dataCollectionId: string;
      /** References to remove. */
      dataItemReferences: DataItemReference[];
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /** @internal */
      appOptions?: Record<string, any> | null;
  }
  interface BulkRemoveDataItemReferencesResponse {
      /** Information about the removed references. */
      results?: BulkDataItemReferenceResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface ReplaceDataItemReferencesRequest {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection containing the referring item. */
      dataCollectionId: string;
      /** Field containing references in the referring item. */
      referringItemFieldName: string;
      /** ID of the referring item. */
      referringItemId: string;
      /** List of new referenced item IDs to replace the existing ones. */
      newReferencedItemIds?: string[];
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /** @internal */
      appOptions?: Record<string, any> | null;
  }
  interface ReplaceDataItemReferencesResponse {
      /** Updated references. */
      dataItemReferences?: DataItemReference[];
  }
  interface DomainEvent extends DomainEventBodyOneOf {
      createdEvent?: EntityCreatedEvent;
      updatedEvent?: EntityUpdatedEvent;
      deletedEvent?: EntityDeletedEvent;
      actionEvent?: ActionEvent;
      /**
       * Unique event ID.
       * Allows clients to ignore duplicate webhooks.
       */
      _id?: string;
      /**
       * Assumes actions are also always typed to an entity_type
       * Example: wix.stores.catalog.product, wix.bookings.session, wix.payments.transaction
       */
      entityFqdn?: string;
      /**
       * This is top level to ease client code dispatching of messages (switch on entity_fqdn+slug)
       * This is although the created/updated/deleted notion is duplication of the oneof types
       * Example: created/updated/deleted/started/completed/email_opened
       */
      slug?: string;
      /** ID of the entity associated with the event. */
      entityId?: string;
      /** Event timestamp in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format and UTC time. For example: 2020-04-26T13:57:50.699Z */
      eventTime?: Date | null;
      /**
       * Whether the event was triggered as a result of a privacy regulation application
       * (for example, GDPR).
       */
      triggeredByAnonymizeRequest?: boolean | null;
      /** If present, indicates the action that triggered the event. */
      originatedFrom?: string | null;
      /**
       * A sequence number defining the order of updates to the underlying entity.
       * For example, given that some entity was updated at 16:00 and than again at 16:01,
       * it is guaranteed that the sequence number of the second update is strictly higher than the first.
       * As the consumer, you can use this value to ensure that you handle messages in the correct order.
       * To do so, you will need to persist this number on your end, and compare the sequence number from the
       * message against the one you have stored. Given that the stored number is higher, you should ignore the message.
       */
      entityEventSequence?: string | null;
  }
  /** @oneof */
  interface DomainEventBodyOneOf {
      createdEvent?: EntityCreatedEvent;
      updatedEvent?: EntityUpdatedEvent;
      deletedEvent?: EntityDeletedEvent;
      actionEvent?: ActionEvent;
  }
  interface EntityCreatedEvent {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent {
      /**
       * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
       * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
       * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
       */
      currentEntityAsJson?: string;
      /**
       * This field is currently part of the of the EntityUpdatedEvent msg, but scala/node libraries which implements the domain events standard
       * wont populate it / have any reference to it in the API.
       * The main reason for it is that fetching the old entity from the DB will have a performance hit on an update operation so unless truly needed,
       * the developer should send only the new (current) entity.
       * An additional reason is not wanting to send this additional entity over the wire (kafka) since in some cases it can be really big
       * Developers that must reflect the old entity will have to implement their own domain event sender mechanism which will follow the DomainEvent proto message.
       * @internal
       * @deprecated
       */
      previousEntityAsJson?: string | null;
      /**
       * WIP - This property will hold both names and values of the updated fields of the entity.
       * For more details please see [adr](https://docs.google.com/document/d/1PdqsOM20Ph2HAkmx8zvUnzzk3Sekp3BR9h34wSvsRnI/edit#heading=h.phlw87mh2imx) or [issue](https://github.com/wix-private/nile-tracker/issues/363)
       * @internal
       */
      modifiedFields?: Record<string, any>;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface EntityDeletedEvent {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface ActionEvent {
      bodyAsJson?: string;
  }
  interface MessageEnvelope {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData;
      /** Stringify payload. */
      data?: string;
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
      identityType?: WebhookIdentityType;
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
  enum WebhookIdentityType {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Adds an item to a collection.
   *
   *
   * An item can only be inserted into an existing connection.
   * You can create a new collection using the Data Collections API.
   *
   * When an item is inserted into a collection, the item's ID is automatically assigned a random value.
   * You can optionally provide a custom ID in `dataItem.id` when inserting the item.
   * If you specify an ID that already exists in the collection, the insertion will fail.
   *
   * If `options.dataItem.data` is empty, a new item is created with no data fields.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @requiredField options.dataItem
   * @param options - Options for adding an item to a collection.
   * @permissionId WIX_DATA.INSERT
   * @adminMethod
   */
  function insertDataItem(options?: InsertDataItemOptions): Promise<InsertDataItemResponse>;
  interface InsertDataItemOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection in which to insert the item. */
      dataCollectionId: string;
      /** Item to insert. */
      dataItem: DataItem;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * If true, referenced items will be included.
       * @internal
       */
      includeReferencedItems?: boolean;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
  }
  /** @param dataItemId - Data item ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField dataItemId
   * @requiredField options.dataCollectionId
   * @requiredField options.patchSet
   * @permissionId WIX_DATA.PATCH
   * @adminMethod
   */
  function patchDataItem(dataItemId: string, options?: PatchDataItemOptions): Promise<PatchDataItemResponse>;
  interface PatchDataItemOptions {
      patchSet: {
          /** Set of field updates to be applied */
          fieldUpdates?: FieldUpdate[];
      };
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection containing the existing item. */
      dataCollectionId: string;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  /** @internal
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @requiredField options.patchSets
   * @permissionId WIX_DATA.BULK_PATCH
   * @adminMethod
   */
  function bulkPatchDataItems(options?: BulkPatchDataItemsOptions): Promise<BulkPatchDataItemsResponse>;
  interface BulkPatchDataItemsOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection in which to update items. */
      dataCollectionId: string;
      /** Patch sets to apply. */
      patchSets: PatchSet[];
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to return the updated data items.
       * When `true`, the `results` objects contain a `dataItem` field.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying:
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  /**
   * Updates an item in a collection.
   *
   *
   * This function replaces the data item's existing data with the payload provided in `options.dataItem.data` in the request.
   *
   * To update an item, you need to specify an item ID and a collection ID.
   * If an item is found in the specified collection with the specified ID, that item is updated.
   * If the collection doesn't contain an item with that ID, the request fails.
   *
   * When an item is updated, its `data._updatedDate` field is changed to the current date and time.
   *
   * > **Note:**
   * > After an item is updated, it only contains the fields included in the `options.dataItem.data` payload in the `updateDataItem()` call.
   * > If the existing item has fields with values and those fields aren't included in the updated item, their values are lost.
   * @param _id - Data item ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField options.dataCollectionId
   * @requiredField options.dataItem
   * @param options - Options for updating an item in a collection.
   * @permissionId WIX_DATA.UPDATE
   * @adminMethod
   */
  function updateDataItem(_id: string, options?: UpdateDataItemOptions): Promise<UpdateDataItemResponse>;
  interface UpdateDataItemOptions {
      /** Updated data item content. The existing data item's content is replaced entirely. */
      dataItem: {
          /** Data item ID. */
          _id?: string;
          /**
           * ID of the collection this item belongs to
           * @readonly
           */
          dataCollectionId?: string;
          /**
           * Data item contents.
           *
           * Property-value pairs representing the data item's payload. When retrieving a data item, it also includes the following read-only fields:
           *
           * + `_id`: Item ID.
           * + `_createdDate`: Date and time the item was added to the collection.
           * + `_updatedDate`: Date and time the item was last modified. When the item is first inserted, `_createdDate` and `_updatedDate` have the same value.
           * + `_ownerId`: ID of the user who created the item. Can be modified with site owner permissions.
           */
          data?: Record<string, any> | null;
      };
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection containing the existing item. */
      dataCollectionId: string;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * If true, referenced items will be included.
       * @internal
       */
      includeReferencedItems?: boolean;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  /**
   * Inserts or updates an item in a collection.
   *
   *
   * The `saveDataItem()` function inserts or updates the specified item, depending on whether it already exists in the collection.
   *
   * + If you don't provide an ID, a new item is created.
   *
   * + If you provide an ID that does not exist in the collection, a new item is created with that ID.
   *
   * + If an item with the ID you provide already exists in the collection, that item is updated. When an item is updated, its `data._updatedDate` field is changed to the current date and time.
   *
   * > **Note:** When you provide an item with an ID that already exists in the collection, the payload you provide in `options.dataItem.data` replaces the existing item with that ID.
   * > This means that the item's previous fields and values are lost.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @requiredField options.dataItem
   * @param options - Options for saving an item in a collection.
   * @permissionId WIX_DATA.SAVE
   * @adminMethod
   */
  function saveDataItem(options?: SaveDataItemOptions): Promise<SaveDataItemResponse>;
  interface SaveDataItemOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection in which to insert or update the item. */
      dataCollectionId: string;
      /** Data item to insert or update. */
      dataItem: DataItem;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * If true, referenced items will be included.
       * @internal
       */
      includeReferencedItems?: boolean;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  /**
   * Retrieves an item from a collection.
   *
   *
   * > **Note**: When calling `getDataItem()` following an update to your collection, the data retrieved may not contain the most recent changes. If you need the most up-to-date data, set `options.consistentRead` to `true`.
   * @param dataItemId - ID of the data item to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField dataItemId
   * @requiredField options.dataCollectionId
   * @param options - Options for retrieving an item from a collection.
   * @permissionId WIX_DATA.GET
   * @adminMethod
   * @returns Retrieved item.
   */
  function getDataItem(dataItemId: string, options?: GetDataItemOptions): Promise<DataItem>;
  interface GetDataItemOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection from which to retrieve the data item. */
      dataCollectionId: string;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /**
       * Language to translate result text into, in [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) format.
       * If provided, the result text is returned in the specified language.
       * **Note:** Translation for the specified language must be enabled for the collection in [Wix Multilingual](https://www.wix.com/app-market/wix-multilingual).
       *
       * If not provided, result text is not translated.
       */
      language?: string | null;
      /**
       * Fields to return for the item. Only fields specified in the array are included in the response. If the array is empty, all fields are returned.
       * **Note:** The `_id` system field is always returned.
       */
      fields?: string[];
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  /**
   * Removes an item from a collection.
   *
   *
   * If any items in other collections reference the removed item in reference or multi-reference fields, those fields are cleared.
   *
   * > **Note:**
   * > Once an item has been removed from a collection, it can't be restored.
   * @param dataItemId - ID of the item to remove.
   * @public
   * @documentationMaturity preview
   * @requiredField dataItemId
   * @requiredField options.dataCollectionId
   * @param options - Options for removing an item from a collection.
   * @permissionId WIX_DATA.REMOVE
   * @adminMethod
   */
  function removeDataItem(dataItemId: string, options?: RemoveDataItemOptions): Promise<RemoveDataItemResponse>;
  interface RemoveDataItemOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection from which to remove the item. */
      dataCollectionId: string;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  /**
   * Removes all items from a collection.
   *
   *
   * If any items in other collections reference the removed items in reference or multi-reference fields, those fields are cleared.
   *
   * > **Note:**
   * > Once items have been removed from a collection, they can't be restored.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @param options - Options for truncating data items from a collection.
   * @permissionId WIX_DATA.TRUNCATE
   * @adminMethod
   */
  function truncateDataItems(options?: TruncateDataItemsOptions): Promise<void>;
  interface TruncateDataItemsOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection to truncate. */
      dataCollectionId: string;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
  }
  /**
   * Creates a query to retrieve items from a database collection.
   *
   * The `queryDataItems()` function builds a query to retrieve data items from a collection and returns a `DataItemsQueryBuilder` object.
   *
   * The returned object contains the query definition which is typically used to run the query using the `find()` function.
   *
   * You can refine the query by chaining `DataItemsQueryBuilder` functions onto the query. `DataItemsQueryBuilder` functions enable you to sort, filter, and control the results that `queryDataItems()` returns.
   *
   * The `queryDataItems()` function runs with the following `DataItemsQueryBuilder` defaults that you can override:
   *
   * + `skip`: 0
   * + `limit`: 50
   * + `descending`: by `_createdDate`
   *
   * The functions that are chained to `queryDataItems()` are applied in the order they are called. For example, if you sort on an `age` field in ascending order and then on a `name` field in descending order, the results are sorted first by the age of the items and then, if there are multiple results with the same age, the items are sorted by name in descending order, per age value.
   *
   * If the collection that you are querying has references to other collections, by default the data from referenced collections is not retrieved. To get the data from referenced items, specify them in the `options.includeReferencedItems` parameter.
   *
   * > **Note**: When calling `queryDataItems()` following an update to your collection, the data retrieved may not contain the most recent changes. If you need the most up-to-date data, set `options.consistentRead` to `true`.
   *
   *
   * @public
   * @documentationMaturity preview
   * @requiredField options.options.dataCollectionId
   * @param options - Options for querying data items.
   * @permissionId WIX_DATA.QUERY
   * @adminMethod
   */
  function queryDataItems(options: QueryDataItemsOptions): DataItemsQueryBuilder;
  interface QueryDataItemsOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1 | undefined;
      /** ID of the collection to query. */
      dataCollectionId: string;
      /**
       * Whether to return the total count in the response for a query with offset paging.
       * When `true`, the `pagingMetadata` object in the response contains a `total` field.
       *
       * Default: `false`
       */
      returnTotalCount?: boolean | undefined;
      /**
       * Properties for which to include referenced items in the query's results.
       * Up to 50 referenced items can be included for each item that matches the query.
       * @deprecated
       * @replacedBy referenced_item_options
       * @targetRemovalDate 2025-08-01
       */
      includeReferencedItems?: string[] | undefined;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null | undefined;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options | undefined;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       *
       * Default: `false`
       */
      consistentRead?: boolean | undefined;
      /**
       * Language to translate result text into, in [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) format.
       * If provided, the result text is returned in the specified language.
       * **Note:** Translation for the specified language must be enabled for the collection in [Wix Multilingual](https://www.wix.com/app-market/wix-multilingual).
       *
       * If not provided, result text is not translated.
       */
      language?: string | null | undefined;
      /**
       * Request information about this collection caching
       * @internal
       */
      requestCachingInfo?: boolean | undefined;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean | undefined;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null | undefined;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions | undefined;
      /** Options for retrieving referenced items. */
      referencedItemOptions?: ReferencedItemOptions[] | undefined;
  }
  interface QueryOffsetResult {
      currentPage: number | undefined;
      totalPages: number | undefined;
      totalCount: number | undefined;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface DataItemsQueryResult extends QueryOffsetResult {
      items: DataItem[];
      query: DataItemsQueryBuilder;
      next: () => Promise<DataItemsQueryResult>;
      prev: () => Promise<DataItemsQueryResult>;
  }
  interface DataItemsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | 'dataCollectionId' | 'data' | string, value: any) => DataItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | 'dataCollectionId' | 'data' | string, value: any) => DataItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'dataCollectionId' | string, value: string) => DataItemsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'dataCollectionId' | 'data' | string, value: any) => DataItemsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | 'dataCollectionId' | 'data' | string, value: boolean) => DataItemsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | 'dataCollectionId' | 'data' | string>) => DataItemsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | 'dataCollectionId' | 'data' | string>) => DataItemsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => DataItemsQueryBuilder;
      /** @param skip - Number of items to skip in the query results before returning the results.
       * @documentationMaturity preview
       */
      skip: (skip: number) => DataItemsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<DataItemsQueryResult>;
  }
  /**
   * Runs an aggregation on a data collection and returns the resulting list of items.
   *
   *
   * An aggregation enables you to perform certain calculations on your collection data, or on groups of items that you define, to retrieve meaningful summaries.
   * You can also add paging, filtering, and sorting preferences to your aggregation to retrieve exactly what you need.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @param options - Options for running an aggregation.
   * @permissionId WIX_DATA.AGGREGATE
   * @adminMethod
   */
  function aggregateDataItems(options?: AggregateDataItemsOptions): Promise<AggregateDataItemsResponse>;
  interface AggregateDataItemsOptions extends AggregateDataItemsRequestPagingMethodOneOf {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection on which to run the aggregation. */
      dataCollectionId: string;
      /**
       * Filter applied to the collection's data prior to running the aggregation. See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language#getting-started_api-query-language_the-filter-section) for information on how to structure a filter object.
       *
       * **Note:** The values you provide for each filter field must adhere to that field's type. For example, when filtering by a field whose type is Date and Time, use an object in the following format: `"someDateAndTimeFieldKey": { "$date": "YYYY-MM-DDTHH:mm:ss.sssZ"}`. Learn more about [data types in Wix Data](https://dev.wix.com/docs/rest/business-solutions/cms/data-items/data-types-in-wix-data).
       */
      initialFilter?: Record<string, any> | null;
      /** Aggregation applied to the data. */
      aggregation?: Aggregation;
      /**
       * Filter applied to the processed data following the aggregation. See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language#getting-started_api-query-language_the-filter-section) for information on how to structure a filter object.
       * **Note:** The values you provide for each filter field must adhere to that field's type. For example, when filtering by a field whose type is Date and Time, use an object in the following format: `"someDateAndTimeFieldKey": { "$date": "YYYY-MM-DDTHH:mm:ss.sssZ"}`. Learn more about [data types in Wix Data](https://dev.wix.com/docs/rest/business-solutions/cms/data-items/data-types-in-wix-data).
       */
      finalFilter?: Record<string, any> | null;
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$1;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
      /**
       * Sort object in the following format:
       * `[{"fieldName":"sortField1","order":"ASC"},{"fieldName":"sortField2","order":"DESC"}]`
       */
      sort?: Sorting[];
      /**
       * Whether to return the total count in the response for a query with offset paging.
       * When `true`, the `pagingMetadata` object in the response contains a `total` field.
       *
       * Default: `false`
       */
      returnTotalCount?: boolean;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /**
       * Language to translate result text into, in [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) format.
       * If provided, the result text is returned in the specified language.
       * **Note:** Translation for the specified language must be enabled for the collection in [Wix Multilingual](https://www.wix.com/app-market/wix-multilingual).
       *
       * If not provided, result text is not translated.
       */
      language?: string | null;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  /**
   * Counts the number of items in a data collection that match the provided filtering preferences.
   *
   * > **Note**: When calling `countDataItems()` following an update to your collection, the result returned may not reflect the most recent changes. If you need the most up-to-date data, set `options.consistentRead` to `true`.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @param options - Options for counting the number of items in a data collection.
   * @permissionId WIX_DATA.COUNT
   * @adminMethod
   */
  function countDataItems(options?: CountDataItemsOptions): Promise<CountDataItemsResponse>;
  interface CountDataItemsOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection for which to count query results. */
      dataCollectionId: string;
      /**
       * Filter object in the following format:
       *
       * `"filter" : {
       * "fieldName1": "value1",
       * "fieldName2":{"$operator":"value2"}
       * }`.
       *
       * Examples of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`.
       *
       * **Note:** The values you provide for each field must adhere to that field's type. For example, when filtering by a field whose type is Date and Time, use an object in the following format: `"someDateAndTimeFieldKey": { "$date": "YYYY-MM-DDTHH:mm:ss.sssZ"}`. Learn more about [data types in Wix Data](https://dev.wix.com/docs/rest/business-solutions/cms/data-items/data-types-in-wix-data).
       */
      filter?: Record<string, any> | null;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /**
       * Language to translate result text into, in [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) format.
       * If provided, the result text is returned in the specified language.
       * **Note:** Translation for the specified language must be enabled for the collection in [Wix Multilingual](https://www.wix.com/app-market/wix-multilingual).
       *
       * If not provided, result text is not translated.
       */
      language?: string | null;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  /**
   * Retrieves a list of distinct values for a given field in all items that match a query, without duplicates.
   *
   *
   * As with `queryDataItems()`, this endpoint retrieves items based on the filtering, sorting, and paging preferences you provide.
   * However, `queryDistinctValues()` doesn't return all of the full items that match the query.
   * Rather, it returns all unique values of the field you specify in `options.fieldName` for items that match the query.
   * If more than one item has the same value for that field, that value appears only once.
   *
   * For more details on using queries, see [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language).
   *
   * > **Note**: When calling `queryDistinctValues()` following an update to your collection, the data retrieved may not reflect the most recent changes. If you need the most up-to-date data, set `options.consistentRead` to `true`.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @param options - Options for querying distinct values.
   * @permissionId WIX_DATA.QUERY_DISTINCT_VALUES
   * @adminMethod
   */
  function queryDistinctValues(options?: QueryDistinctValuesOptions): Promise<QueryDistinctValuesResponse>;
  interface QueryDistinctValuesOptions extends QueryDistinctValuesRequestPagingMethodOneOf {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection to query. */
      dataCollectionId: string;
      /** Item field name for which to return all distinct values. */
      fieldName?: string;
      /**
       * Filter object in the following format:
       *
       * `"filter" : {
       * "fieldName1": "value1",
       * "fieldName2":{"$operator":"value2"}
       * }`.
       *
       * Examples of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`.
       *
       * **Note:** The values you provide for each field must adhere to that field's type. For example, when filtering by a field whose type is Date and Time, use an object in the following format: `"someDateAndTimeFieldKey": { "$date": "YYYY-MM-DDTHH:mm:ss.sssZ"}`. Learn more about [data types in Wix Data](https://dev.wix.com/docs/rest/business-solutions/cms/data-items/data-types-in-wix-data).
       */
      filter?: Record<string, any> | null;
      /**
       * Sort order.
       *
       * Supported values: `ASC`, `DESC`.
       */
      order?: SortOrder;
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$1;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
      /**
       * Whether to return the total count in the response for a query with offset paging.
       * When `true`, the `pagingMetadata` object in the response contains a `total` field.
       *
       * Default: `false`
       */
      returnTotalCount?: boolean;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /**
       * Language to translate result text into, in [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) format.
       * If provided, the result text is returned in the specified language.
       * **Note:** Translation for the specified language must be enabled for the collection in [Wix Multilingual](https://www.wix.com/app-market/wix-multilingual).
       *
       * If not provided, result text is not translated.
       */
      language?: string | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  /**
   * Adds multiple items to a collection.
   *
   *
   * When each item is inserted into a collection, its ID is automatically assigned a random value.
   * You can optionally provide your own ID when inserting the item. If you specify an ID that already exists in the collection, the insertion will fail.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @requiredField options.dataItems
   * @param options - Options for adding multiple items to a collection.
   * @permissionId WIX_DATA.BULK_INSERT
   * @adminMethod
   */
  function bulkInsertDataItems(options?: BulkInsertDataItemsOptions): Promise<BulkInsertDataItemsResponse>;
  interface BulkInsertDataItemsOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection in which to insert the items. */
      dataCollectionId: string;
      /** Data items to insert. */
      dataItems: DataItem[];
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options.
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to return the inserted data items.
       * When `true`, the `results` objects contain a `dataItem` field.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
  }
  /**
   * Updates multiple items in a collection.
   *
   *
   * This function replaces each specified data item's existing data with the payload provided in the request.
   *
   * Each item in the request must include an ID. If an item is found in the specified collection with
   * the same ID, that item is updated. If the collection doesn't contain an item with that ID, the update fails.
   *
   * When an item is updated, its `data._updatedDate` field is changed to the current date and time.
   *
   * > **Note:**
   * > After each item is updated, it only contains the fields included in the request. If the existing item has fields with values and those fields
   * > aren't included in the updated item, their values are lost.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @requiredField options.dataItems
   * @param options - Options for updating multiple items in a collection.
   * @permissionId WIX_DATA.BULK_UPDATE
   * @adminMethod
   */
  function bulkUpdateDataItems(options?: BulkUpdateDataItemsOptions): Promise<BulkUpdateDataItemsResponse>;
  interface BulkUpdateDataItemsOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection in which to update items. */
      dataCollectionId: string;
      /** Data items to update. */
      dataItems: DataItem[];
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to return the updated data items.
       * When `true`, the `results` objects contain a `dataItem` field.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  /**
   * Inserts or updates multiple items in a collection.
   *
   *
   * This function inserts or updates each item provided, depending on whether it already exists in the collection. For each item:
   *
   * + If you don't provide an ID, a new item is created.
   *
   * + If you provide an ID that doesn't exist in the collection, a new item is created with that ID.
   *
   * + If an item with the ID you provide already exists in the collection, that item is updated. When an item is updated, its `data._updatedDate` field is changed to the current date and time.
   *
   * > **Note:** When you provide an item with an ID that already exists in the collection, the item you provide completely replaces the existing item with that ID.
   * > This means that all of the item's previous fields and values are lost.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @requiredField options.dataItems
   * @param options - Options for saving multiple items in a collection.
   * @permissionId WIX_DATA.BULK_SAVE
   * @adminMethod
   */
  function bulkSaveDataItems(options?: BulkSaveDataItemsOptions): Promise<BulkSaveDataItemsResponse>;
  interface BulkSaveDataItemsOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection in which to insert or update the items. */
      dataCollectionId: string;
      /** Data items to insert or update. */
      dataItems: DataItem[];
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to return the saved data item.
       * When `true`, the `results` objects contain a `dataItem` field.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  /**
   * Removes multiple items from a collection.
   *
   *
   * If any items in other collections reference the removed items in reference or multi-reference fields, those fields are cleared.
   *
   * > **Note:** Once an item has been removed from a collection, it can't be restored.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @requiredField options.dataItemIds
   * @param options - Options for removing multiple items from a collection.
   * @permissionId WIX_DATA.BULK_REMOVE
   * @adminMethod
   */
  function bulkRemoveDataItems(options?: BulkRemoveDataItemsOptions): Promise<BulkRemoveDataItemsResponse>;
  interface BulkRemoveDataItemsOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection from which to remove the item. */
      dataCollectionId: string;
      /** IDs of data items to remove. */
      dataItemIds: string[];
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to suppress data hooks.
       * When `true`, data hooks typically triggered by this endpoint don't run.
       *
       * **Note:** This option can only be used in code that runs in [the Wix site backend](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/about-the-site-backend).
       *
       * Default: `false`
       * @internal
       */
      suppressHooks?: boolean;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
  }
  /**
   * Retrieves the full items referenced in the specified field of an item.
   *
   *
   * Reference and multi-reference fields refer to items in different collections.
   * Use this function to retrieve the full details of the referenced items themselves.
   *
   * For example, suppose you have a **Movies** collection with an **Actors** field that contains references to items in a **People** collection.
   * Querying the **Movies** collection using `queryReferencedDataItems()` returns the relevant **People** items referenced in the **Actors** field of the specified **Movie** item.
   * This gives you information from the **People** collection about each of the actors in the specified movie.
   *
   * > **Note**: When calling `queryReferencedDataItems()` following an update to your collection, the data retrieved may not contain the most recent changes. If you need the most up-to-date data, set `options.consistentRead` to `true`.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @param options - Options for querying referenced data items.
   * @permissionId WIX_DATA.QUERY_REFERENCED
   * @adminMethod
   */
  function queryReferencedDataItems(options?: QueryReferencedDataItemsOptions): Promise<QueryReferencedDataItemsResponse>;
  interface QueryReferencedDataItemsOptions extends QueryReferencedDataItemsRequestPagingMethodOneOf {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection containing the referring item. */
      dataCollectionId: string;
      /** ID of the referring item. */
      referringItemId?: string;
      /** Field containing references in the referring item. */
      referringItemFieldName?: string;
      /** Order of the returned referenced items. Sorted by the date each item was referenced. */
      order?: SortOrder;
      /** Paging options to limit and skip the number of items. */
      paging?: Paging$1;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
      /**
       * Whether to return the total count in the response.
       * When `true`, the `pagingMetadata` object in the response contains a `total` field.
       *
       * Default: `false`
       */
      returnTotalCount?: boolean;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /**
       * Language to translate result text into, in [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) format.
       * If provided, the result text is returned in the specified language.
       * **Note:** Translation for the specified language must be enabled for the collection in [Wix Multilingual](https://www.wix.com/app-market/wix-multilingual).
       *
       * If not provided, result text is not translated.
       */
      language?: string | null;
      /**
       * Fields to return for each referenced item. Only fields specified in the array are included in the response. If the array is empty, all fields are returned.
       * **Note:** The `_id` system field is always returned.
       */
      fields?: string[];
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying:
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
      /**
       * Options for the Publish plugin.
       * This plugin allows items in a [data collection](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/data-collection-object) to be marked as draft or published. Published items are visible to site visitors, while draft items are not.
       */
      publishPluginOptions?: DataPublishPluginOptions;
      /**
       * IDs of the referring items.
       * @internal
       */
      referringItemIds?: string[];
  }
  /**
   * Checks whether a field in a referring item contains a reference to a specified item.
   *
   * > **Note**: When calling `isReferencedDataItem()` following an update to your collection, the result returned may not reflect the most recent changes. If you need the most up-to-date data, set `options.consistentRead` to `true`.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @requiredField options.referencedItemId
   * @requiredField options.referringItemFieldName
   * @requiredField options.referringItemId
   * @param options - Options for checking whether a field contains a reference to an item.
   * @permissionId WIX_DATA.IS_REFERENCED
   * @adminMethod
   */
  function isReferencedDataItem(options?: IsReferencedDataItemOptions): Promise<IsReferencedDataItemResponse>;
  interface IsReferencedDataItemOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection containing the referring data item. */
      dataCollectionId: string;
      /** Field to check for a reference to the item that may be referenced. */
      referringItemFieldName: string;
      /** ID of the referring item. */
      referringItemId: string;
      /** ID of the item that may be referenced. */
      referencedItemId: string;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to retrieve data from the primary database instance.
       * This decreases performance but ensures data retrieved is up to date even immediately after an update.
       *
       * Default: `false`
       */
      consistentRead?: boolean;
      /** @internal */
      appOptions?: Record<string, any> | null;
  }
  /**
   * Inserts a reference in the specified field in an item in a collection.
   *
   *
   * A reference in `options.dataItemReference` specifies a referring item's ID, the field in which to insert the reference, and the ID of the referenced item.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @requiredField options.dataItemReference.referencedItemId
   * @requiredField options.dataItemReference.referringItemFieldName
   * @requiredField options.dataItemReference.referringItemId
   * @param options - Options for inserting a reference.
   * @permissionId WIX_DATA.INSERT_REFERENCE
   * @adminMethod
   */
  function insertDataItemReference(options?: InsertDataItemReferenceOptions): Promise<InsertDataItemReferenceResponse>;
  interface InsertDataItemReferenceOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection in which to insert the reference. */
      dataCollectionId: string;
      /** Reference to insert */
      dataItemReference?: DataItemReference;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Additional parameters specific to the [Wix app collection](https://support.wix.com/en/article/cms-formerly-content-manager-working-with-wix-app-collections) you are querying.
       *
       * When querying the Wix Stores [Products collection](https://dev.wix.com/docs/develop-websites/articles/wix-apps/wix-e-commerce-stores/wix-stores-products-collection-fields), pass the following optional parameters:
       * - `includeHiddenProducts`: Whether to include hidden products in the response. Default: `false`.
       * - `includeVariants`: Whether to include product variants in the query. Default: `false`.
       */
      appOptions?: Record<string, any> | null;
  }
  /**
   * Removes the specified reference from the specified field.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @requiredField options.dataItemReference
   * @requiredField options.dataItemReference.referencedItemId
   * @requiredField options.dataItemReference.referringItemFieldName
   * @requiredField options.dataItemReference.referringItemId
   * @param options - Options for removing a reference.
   * @permissionId WIX_DATA.REMOVE_REFERENCE
   * @adminMethod
   */
  function removeDataItemReference(options?: RemoveDataItemReferenceOptions): Promise<RemoveDataItemReferenceResponse>;
  interface RemoveDataItemReferenceOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection containing the referring item. */
      dataCollectionId: string;
      /** Reference to remove. */
      dataItemReference: DataItemReference;
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /** @internal */
      appOptions?: Record<string, any> | null;
  }
  /**
   * Inserts one or more references in the specified fields of items in a collection.
   *
   *
   * This endpoint adds one or more references to a collection.
   * Each new reference in `options.dataItemReferences` specifies a referring item's ID, the field in which to insert the reference, and the ID of the referenced item.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @requiredField options.dataItemReferences
   * @requiredField options.dataItemReferences.referencedItemId
   * @requiredField options.dataItemReferences.referringItemFieldName
   * @requiredField options.dataItemReferences.referringItemId
   * @param options - Options for inserting one or more references.
   * @permissionId WIX_DATA.BULK_INSERT_REFERENCES
   * @adminMethod
   */
  function bulkInsertDataItemReferences(options?: BulkInsertDataItemReferencesOptions): Promise<BulkInsertDataItemReferencesResponse>;
  interface BulkInsertDataItemReferencesOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection containing the referring items. */
      dataCollectionId: string;
      /** References to insert. */
      dataItemReferences: DataItemReference[];
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /**
       * Whether to return the inserted data item references.
       * When `true`, the `results` objects contain a `dataItemReference` field.
       *
       * Default: `false`
       */
      returnEntity?: boolean;
      /** @internal */
      appOptions?: Record<string, any> | null;
  }
  /**
   * Removes one or more references.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @requiredField options.dataItemReferences
   * @requiredField options.dataItemReferences.referencedItemId
   * @requiredField options.dataItemReferences.referringItemFieldName
   * @requiredField options.dataItemReferences.referringItemId
   * @param options - Options for removing one or more references.
   * @permissionId WIX_DATA.BULK_REMOVE_REFERENCES
   * @adminMethod
   */
  function bulkRemoveDataItemReferences(options?: BulkRemoveDataItemReferencesOptions): Promise<BulkRemoveDataItemReferencesResponse>;
  interface BulkRemoveDataItemReferencesOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection containing the referring items. */
      dataCollectionId: string;
      /** References to remove. */
      dataItemReferences: DataItemReference[];
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /** @internal */
      appOptions?: Record<string, any> | null;
  }
  /**
   * Replaces references in a specified field of a specified data item.
   *
   *
   * This function replaces the existing reference or references contained in the field specified in `options.referringItemFieldName` within the data item specified in `options.referringItemId`.
   * The function removes existing references and in their place it adds references to the items specified in `options.newReferencedItemIds`.
   *
   * > **Note:** If you pass an empty array in `options.newReferencedItemIds`, all existing references are removed.
   * @public
   * @documentationMaturity preview
   * @requiredField options.dataCollectionId
   * @requiredField options.referringItemFieldName
   * @requiredField options.referringItemId
   * @param options - Options for replacing references.
   * @permissionId WIX_DATA.REPLACE_REFERENCES
   * @adminMethod
   */
  function replaceDataItemReferences(options?: ReplaceDataItemReferencesOptions): Promise<ReplaceDataItemReferencesResponse>;
  interface ReplaceDataItemReferencesOptions {
      /**
       * Environment: LIVE or SANDBOX
       * @internal
       */
      environment?: Environment$1;
      /** ID of the collection containing the referring item. */
      dataCollectionId: string;
      /** Field containing references in the referring item. */
      referringItemFieldName: string;
      /** ID of the referring item. */
      referringItemId: string;
      /** List of new referenced item IDs to replace the existing ones. */
      newReferencedItemIds?: string[];
      /**
       * Grid app id. Optional in Live segment.
       * @internal
       */
      appId?: string | null;
      /**
       * Data access options
       * @internal
       * @deprecated
       * @replacedBy inlined
       * @targetRemovalDate 2024-07-12
       */
      options?: Options;
      /** @internal */
      appOptions?: Record<string, any> | null;
  }
  
  type dataV2DataItem_universal_d_DataItem = DataItem;
  type dataV2DataItem_universal_d_InsertDataItemRequest = InsertDataItemRequest;
  type dataV2DataItem_universal_d_Options = Options;
  type dataV2DataItem_universal_d_PublishPluginOptions = PublishPluginOptions;
  type dataV2DataItem_universal_d_InsertDataItemResponse = InsertDataItemResponse;
  type dataV2DataItem_universal_d_PatchDataItemRequest = PatchDataItemRequest;
  type dataV2DataItem_universal_d_PatchSet = PatchSet;
  type dataV2DataItem_universal_d_FieldUpdate = FieldUpdate;
  type dataV2DataItem_universal_d_FieldUpdateActionOptionsOneOf = FieldUpdateActionOptionsOneOf;
  type dataV2DataItem_universal_d_ACTION = ACTION;
  const dataV2DataItem_universal_d_ACTION: typeof ACTION;
  type dataV2DataItem_universal_d_SetField = SetField;
  type dataV2DataItem_universal_d_IncrementField = IncrementField;
  type dataV2DataItem_universal_d_AppendToArray = AppendToArray;
  type dataV2DataItem_universal_d_RemoveFromArray = RemoveFromArray;
  type dataV2DataItem_universal_d_DataPublishPluginOptions = DataPublishPluginOptions;
  type dataV2DataItem_universal_d_PatchDataItemResponse = PatchDataItemResponse;
  type dataV2DataItem_universal_d_BulkPatchDataItemsRequest = BulkPatchDataItemsRequest;
  type dataV2DataItem_universal_d_BulkPatchDataItemsResponse = BulkPatchDataItemsResponse;
  type dataV2DataItem_universal_d_BulkDataItemResult = BulkDataItemResult;
  type dataV2DataItem_universal_d_BulkActionType = BulkActionType;
  const dataV2DataItem_universal_d_BulkActionType: typeof BulkActionType;
  type dataV2DataItem_universal_d_ItemMetadata = ItemMetadata;
  type dataV2DataItem_universal_d_ApplicationError = ApplicationError;
  type dataV2DataItem_universal_d_BulkActionMetadata = BulkActionMetadata;
  type dataV2DataItem_universal_d_UpdateDataItemRequest = UpdateDataItemRequest;
  type dataV2DataItem_universal_d_UpdateDataItemResponse = UpdateDataItemResponse;
  type dataV2DataItem_universal_d_SaveDataItemRequest = SaveDataItemRequest;
  type dataV2DataItem_universal_d_SaveDataItemResponse = SaveDataItemResponse;
  type dataV2DataItem_universal_d_Action = Action;
  const dataV2DataItem_universal_d_Action: typeof Action;
  type dataV2DataItem_universal_d_GetDataItemRequest = GetDataItemRequest;
  type dataV2DataItem_universal_d_GetDataItemResponse = GetDataItemResponse;
  type dataV2DataItem_universal_d_RemoveDataItemRequest = RemoveDataItemRequest;
  type dataV2DataItem_universal_d_RemoveDataItemResponse = RemoveDataItemResponse;
  type dataV2DataItem_universal_d_TruncateDataItemsRequest = TruncateDataItemsRequest;
  type dataV2DataItem_universal_d_TruncateDataItemsResponse = TruncateDataItemsResponse;
  type dataV2DataItem_universal_d_QueryDataItemsRequest = QueryDataItemsRequest;
  type dataV2DataItem_universal_d_QueryV2 = QueryV2;
  type dataV2DataItem_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
  type dataV2DataItem_universal_d_Sorting = Sorting;
  type dataV2DataItem_universal_d_SortOrder = SortOrder;
  const dataV2DataItem_universal_d_SortOrder: typeof SortOrder;
  type dataV2DataItem_universal_d_CursorPaging = CursorPaging;
  type dataV2DataItem_universal_d_ReferencedItemOptions = ReferencedItemOptions;
  type dataV2DataItem_universal_d_QueryDataItemsResponse = QueryDataItemsResponse;
  type dataV2DataItem_universal_d_CachingInfo = CachingInfo;
  type dataV2DataItem_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type dataV2DataItem_universal_d_Cursors = Cursors;
  type dataV2DataItem_universal_d_AggregateDataItemsRequest = AggregateDataItemsRequest;
  type dataV2DataItem_universal_d_AggregateDataItemsRequestPagingMethodOneOf = AggregateDataItemsRequestPagingMethodOneOf;
  type dataV2DataItem_universal_d_Average = Average;
  type dataV2DataItem_universal_d_Min = Min;
  type dataV2DataItem_universal_d_Max = Max;
  type dataV2DataItem_universal_d_Sum = Sum;
  type dataV2DataItem_universal_d_Count = Count;
  type dataV2DataItem_universal_d_Operation = Operation;
  type dataV2DataItem_universal_d_OperationCalculateOneOf = OperationCalculateOneOf;
  type dataV2DataItem_universal_d_Aggregation = Aggregation;
  type dataV2DataItem_universal_d_AggregateDataItemsResponse = AggregateDataItemsResponse;
  type dataV2DataItem_universal_d_CountDataItemsRequest = CountDataItemsRequest;
  type dataV2DataItem_universal_d_CountDataItemsResponse = CountDataItemsResponse;
  type dataV2DataItem_universal_d_QueryDistinctValuesRequest = QueryDistinctValuesRequest;
  type dataV2DataItem_universal_d_QueryDistinctValuesRequestPagingMethodOneOf = QueryDistinctValuesRequestPagingMethodOneOf;
  type dataV2DataItem_universal_d_QueryDistinctValuesResponse = QueryDistinctValuesResponse;
  type dataV2DataItem_universal_d_BulkInsertDataItemsRequest = BulkInsertDataItemsRequest;
  type dataV2DataItem_universal_d_BulkInsertDataItemsResponse = BulkInsertDataItemsResponse;
  type dataV2DataItem_universal_d_BulkUpdateDataItemsRequest = BulkUpdateDataItemsRequest;
  type dataV2DataItem_universal_d_BulkUpdateDataItemsResponse = BulkUpdateDataItemsResponse;
  type dataV2DataItem_universal_d_BulkSaveDataItemsRequest = BulkSaveDataItemsRequest;
  type dataV2DataItem_universal_d_BulkSaveDataItemsResponse = BulkSaveDataItemsResponse;
  type dataV2DataItem_universal_d_BulkRemoveDataItemsRequest = BulkRemoveDataItemsRequest;
  type dataV2DataItem_universal_d_BulkRemoveDataItemsResponse = BulkRemoveDataItemsResponse;
  type dataV2DataItem_universal_d_QueryReferencedDataItemsRequest = QueryReferencedDataItemsRequest;
  type dataV2DataItem_universal_d_QueryReferencedDataItemsRequestPagingMethodOneOf = QueryReferencedDataItemsRequestPagingMethodOneOf;
  type dataV2DataItem_universal_d_QueryReferencedDataItemsResponse = QueryReferencedDataItemsResponse;
  type dataV2DataItem_universal_d_UnresolvedReference = UnresolvedReference;
  type dataV2DataItem_universal_d_ReferencedResult = ReferencedResult;
  type dataV2DataItem_universal_d_ReferencedResultEntityOneOf = ReferencedResultEntityOneOf;
  type dataV2DataItem_universal_d_IsReferencedDataItemRequest = IsReferencedDataItemRequest;
  type dataV2DataItem_universal_d_IsReferencedDataItemResponse = IsReferencedDataItemResponse;
  type dataV2DataItem_universal_d_InsertDataItemReferenceRequest = InsertDataItemReferenceRequest;
  type dataV2DataItem_universal_d_DataItemReference = DataItemReference;
  type dataV2DataItem_universal_d_InsertDataItemReferenceResponse = InsertDataItemReferenceResponse;
  type dataV2DataItem_universal_d_RemoveDataItemReferenceRequest = RemoveDataItemReferenceRequest;
  type dataV2DataItem_universal_d_RemoveDataItemReferenceResponse = RemoveDataItemReferenceResponse;
  type dataV2DataItem_universal_d_BulkInsertDataItemReferencesRequest = BulkInsertDataItemReferencesRequest;
  type dataV2DataItem_universal_d_BulkInsertDataItemReferencesResponse = BulkInsertDataItemReferencesResponse;
  type dataV2DataItem_universal_d_BulkDataItemReferenceResult = BulkDataItemReferenceResult;
  type dataV2DataItem_universal_d_BulkRemoveDataItemReferencesRequest = BulkRemoveDataItemReferencesRequest;
  type dataV2DataItem_universal_d_BulkRemoveDataItemReferencesResponse = BulkRemoveDataItemReferencesResponse;
  type dataV2DataItem_universal_d_ReplaceDataItemReferencesRequest = ReplaceDataItemReferencesRequest;
  type dataV2DataItem_universal_d_ReplaceDataItemReferencesResponse = ReplaceDataItemReferencesResponse;
  type dataV2DataItem_universal_d_DomainEvent = DomainEvent;
  type dataV2DataItem_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type dataV2DataItem_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type dataV2DataItem_universal_d_RestoreInfo = RestoreInfo;
  type dataV2DataItem_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type dataV2DataItem_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type dataV2DataItem_universal_d_ActionEvent = ActionEvent;
  type dataV2DataItem_universal_d_MessageEnvelope = MessageEnvelope;
  type dataV2DataItem_universal_d_IdentificationData = IdentificationData;
  type dataV2DataItem_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type dataV2DataItem_universal_d_WebhookIdentityType = WebhookIdentityType;
  const dataV2DataItem_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const dataV2DataItem_universal_d_insertDataItem: typeof insertDataItem;
  type dataV2DataItem_universal_d_InsertDataItemOptions = InsertDataItemOptions;
  const dataV2DataItem_universal_d_patchDataItem: typeof patchDataItem;
  type dataV2DataItem_universal_d_PatchDataItemOptions = PatchDataItemOptions;
  const dataV2DataItem_universal_d_bulkPatchDataItems: typeof bulkPatchDataItems;
  type dataV2DataItem_universal_d_BulkPatchDataItemsOptions = BulkPatchDataItemsOptions;
  const dataV2DataItem_universal_d_updateDataItem: typeof updateDataItem;
  type dataV2DataItem_universal_d_UpdateDataItemOptions = UpdateDataItemOptions;
  const dataV2DataItem_universal_d_saveDataItem: typeof saveDataItem;
  type dataV2DataItem_universal_d_SaveDataItemOptions = SaveDataItemOptions;
  const dataV2DataItem_universal_d_getDataItem: typeof getDataItem;
  type dataV2DataItem_universal_d_GetDataItemOptions = GetDataItemOptions;
  const dataV2DataItem_universal_d_removeDataItem: typeof removeDataItem;
  type dataV2DataItem_universal_d_RemoveDataItemOptions = RemoveDataItemOptions;
  const dataV2DataItem_universal_d_truncateDataItems: typeof truncateDataItems;
  type dataV2DataItem_universal_d_TruncateDataItemsOptions = TruncateDataItemsOptions;
  const dataV2DataItem_universal_d_queryDataItems: typeof queryDataItems;
  type dataV2DataItem_universal_d_QueryDataItemsOptions = QueryDataItemsOptions;
  type dataV2DataItem_universal_d_DataItemsQueryResult = DataItemsQueryResult;
  type dataV2DataItem_universal_d_DataItemsQueryBuilder = DataItemsQueryBuilder;
  const dataV2DataItem_universal_d_aggregateDataItems: typeof aggregateDataItems;
  type dataV2DataItem_universal_d_AggregateDataItemsOptions = AggregateDataItemsOptions;
  const dataV2DataItem_universal_d_countDataItems: typeof countDataItems;
  type dataV2DataItem_universal_d_CountDataItemsOptions = CountDataItemsOptions;
  const dataV2DataItem_universal_d_queryDistinctValues: typeof queryDistinctValues;
  type dataV2DataItem_universal_d_QueryDistinctValuesOptions = QueryDistinctValuesOptions;
  const dataV2DataItem_universal_d_bulkInsertDataItems: typeof bulkInsertDataItems;
  type dataV2DataItem_universal_d_BulkInsertDataItemsOptions = BulkInsertDataItemsOptions;
  const dataV2DataItem_universal_d_bulkUpdateDataItems: typeof bulkUpdateDataItems;
  type dataV2DataItem_universal_d_BulkUpdateDataItemsOptions = BulkUpdateDataItemsOptions;
  const dataV2DataItem_universal_d_bulkSaveDataItems: typeof bulkSaveDataItems;
  type dataV2DataItem_universal_d_BulkSaveDataItemsOptions = BulkSaveDataItemsOptions;
  const dataV2DataItem_universal_d_bulkRemoveDataItems: typeof bulkRemoveDataItems;
  type dataV2DataItem_universal_d_BulkRemoveDataItemsOptions = BulkRemoveDataItemsOptions;
  const dataV2DataItem_universal_d_queryReferencedDataItems: typeof queryReferencedDataItems;
  type dataV2DataItem_universal_d_QueryReferencedDataItemsOptions = QueryReferencedDataItemsOptions;
  const dataV2DataItem_universal_d_isReferencedDataItem: typeof isReferencedDataItem;
  type dataV2DataItem_universal_d_IsReferencedDataItemOptions = IsReferencedDataItemOptions;
  const dataV2DataItem_universal_d_insertDataItemReference: typeof insertDataItemReference;
  type dataV2DataItem_universal_d_InsertDataItemReferenceOptions = InsertDataItemReferenceOptions;
  const dataV2DataItem_universal_d_removeDataItemReference: typeof removeDataItemReference;
  type dataV2DataItem_universal_d_RemoveDataItemReferenceOptions = RemoveDataItemReferenceOptions;
  const dataV2DataItem_universal_d_bulkInsertDataItemReferences: typeof bulkInsertDataItemReferences;
  type dataV2DataItem_universal_d_BulkInsertDataItemReferencesOptions = BulkInsertDataItemReferencesOptions;
  const dataV2DataItem_universal_d_bulkRemoveDataItemReferences: typeof bulkRemoveDataItemReferences;
  type dataV2DataItem_universal_d_BulkRemoveDataItemReferencesOptions = BulkRemoveDataItemReferencesOptions;
  const dataV2DataItem_universal_d_replaceDataItemReferences: typeof replaceDataItemReferences;
  type dataV2DataItem_universal_d_ReplaceDataItemReferencesOptions = ReplaceDataItemReferencesOptions;
  namespace dataV2DataItem_universal_d {
    export {
      dataV2DataItem_universal_d_DataItem as DataItem,
      dataV2DataItem_universal_d_InsertDataItemRequest as InsertDataItemRequest,
      Environment$1 as Environment,
      dataV2DataItem_universal_d_Options as Options,
      dataV2DataItem_universal_d_PublishPluginOptions as PublishPluginOptions,
      dataV2DataItem_universal_d_InsertDataItemResponse as InsertDataItemResponse,
      dataV2DataItem_universal_d_PatchDataItemRequest as PatchDataItemRequest,
      dataV2DataItem_universal_d_PatchSet as PatchSet,
      dataV2DataItem_universal_d_FieldUpdate as FieldUpdate,
      dataV2DataItem_universal_d_FieldUpdateActionOptionsOneOf as FieldUpdateActionOptionsOneOf,
      dataV2DataItem_universal_d_ACTION as ACTION,
      dataV2DataItem_universal_d_SetField as SetField,
      dataV2DataItem_universal_d_IncrementField as IncrementField,
      dataV2DataItem_universal_d_AppendToArray as AppendToArray,
      dataV2DataItem_universal_d_RemoveFromArray as RemoveFromArray,
      dataV2DataItem_universal_d_DataPublishPluginOptions as DataPublishPluginOptions,
      dataV2DataItem_universal_d_PatchDataItemResponse as PatchDataItemResponse,
      dataV2DataItem_universal_d_BulkPatchDataItemsRequest as BulkPatchDataItemsRequest,
      dataV2DataItem_universal_d_BulkPatchDataItemsResponse as BulkPatchDataItemsResponse,
      dataV2DataItem_universal_d_BulkDataItemResult as BulkDataItemResult,
      dataV2DataItem_universal_d_BulkActionType as BulkActionType,
      dataV2DataItem_universal_d_ItemMetadata as ItemMetadata,
      dataV2DataItem_universal_d_ApplicationError as ApplicationError,
      dataV2DataItem_universal_d_BulkActionMetadata as BulkActionMetadata,
      dataV2DataItem_universal_d_UpdateDataItemRequest as UpdateDataItemRequest,
      dataV2DataItem_universal_d_UpdateDataItemResponse as UpdateDataItemResponse,
      dataV2DataItem_universal_d_SaveDataItemRequest as SaveDataItemRequest,
      dataV2DataItem_universal_d_SaveDataItemResponse as SaveDataItemResponse,
      dataV2DataItem_universal_d_Action as Action,
      dataV2DataItem_universal_d_GetDataItemRequest as GetDataItemRequest,
      dataV2DataItem_universal_d_GetDataItemResponse as GetDataItemResponse,
      dataV2DataItem_universal_d_RemoveDataItemRequest as RemoveDataItemRequest,
      dataV2DataItem_universal_d_RemoveDataItemResponse as RemoveDataItemResponse,
      dataV2DataItem_universal_d_TruncateDataItemsRequest as TruncateDataItemsRequest,
      dataV2DataItem_universal_d_TruncateDataItemsResponse as TruncateDataItemsResponse,
      dataV2DataItem_universal_d_QueryDataItemsRequest as QueryDataItemsRequest,
      dataV2DataItem_universal_d_QueryV2 as QueryV2,
      dataV2DataItem_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf,
      dataV2DataItem_universal_d_Sorting as Sorting,
      dataV2DataItem_universal_d_SortOrder as SortOrder,
      Paging$1 as Paging,
      dataV2DataItem_universal_d_CursorPaging as CursorPaging,
      dataV2DataItem_universal_d_ReferencedItemOptions as ReferencedItemOptions,
      dataV2DataItem_universal_d_QueryDataItemsResponse as QueryDataItemsResponse,
      dataV2DataItem_universal_d_CachingInfo as CachingInfo,
      dataV2DataItem_universal_d_PagingMetadataV2 as PagingMetadataV2,
      dataV2DataItem_universal_d_Cursors as Cursors,
      dataV2DataItem_universal_d_AggregateDataItemsRequest as AggregateDataItemsRequest,
      dataV2DataItem_universal_d_AggregateDataItemsRequestPagingMethodOneOf as AggregateDataItemsRequestPagingMethodOneOf,
      dataV2DataItem_universal_d_Average as Average,
      dataV2DataItem_universal_d_Min as Min,
      dataV2DataItem_universal_d_Max as Max,
      dataV2DataItem_universal_d_Sum as Sum,
      dataV2DataItem_universal_d_Count as Count,
      dataV2DataItem_universal_d_Operation as Operation,
      dataV2DataItem_universal_d_OperationCalculateOneOf as OperationCalculateOneOf,
      dataV2DataItem_universal_d_Aggregation as Aggregation,
      dataV2DataItem_universal_d_AggregateDataItemsResponse as AggregateDataItemsResponse,
      dataV2DataItem_universal_d_CountDataItemsRequest as CountDataItemsRequest,
      dataV2DataItem_universal_d_CountDataItemsResponse as CountDataItemsResponse,
      dataV2DataItem_universal_d_QueryDistinctValuesRequest as QueryDistinctValuesRequest,
      dataV2DataItem_universal_d_QueryDistinctValuesRequestPagingMethodOneOf as QueryDistinctValuesRequestPagingMethodOneOf,
      dataV2DataItem_universal_d_QueryDistinctValuesResponse as QueryDistinctValuesResponse,
      dataV2DataItem_universal_d_BulkInsertDataItemsRequest as BulkInsertDataItemsRequest,
      dataV2DataItem_universal_d_BulkInsertDataItemsResponse as BulkInsertDataItemsResponse,
      dataV2DataItem_universal_d_BulkUpdateDataItemsRequest as BulkUpdateDataItemsRequest,
      dataV2DataItem_universal_d_BulkUpdateDataItemsResponse as BulkUpdateDataItemsResponse,
      dataV2DataItem_universal_d_BulkSaveDataItemsRequest as BulkSaveDataItemsRequest,
      dataV2DataItem_universal_d_BulkSaveDataItemsResponse as BulkSaveDataItemsResponse,
      dataV2DataItem_universal_d_BulkRemoveDataItemsRequest as BulkRemoveDataItemsRequest,
      dataV2DataItem_universal_d_BulkRemoveDataItemsResponse as BulkRemoveDataItemsResponse,
      dataV2DataItem_universal_d_QueryReferencedDataItemsRequest as QueryReferencedDataItemsRequest,
      dataV2DataItem_universal_d_QueryReferencedDataItemsRequestPagingMethodOneOf as QueryReferencedDataItemsRequestPagingMethodOneOf,
      dataV2DataItem_universal_d_QueryReferencedDataItemsResponse as QueryReferencedDataItemsResponse,
      dataV2DataItem_universal_d_UnresolvedReference as UnresolvedReference,
      dataV2DataItem_universal_d_ReferencedResult as ReferencedResult,
      dataV2DataItem_universal_d_ReferencedResultEntityOneOf as ReferencedResultEntityOneOf,
      dataV2DataItem_universal_d_IsReferencedDataItemRequest as IsReferencedDataItemRequest,
      dataV2DataItem_universal_d_IsReferencedDataItemResponse as IsReferencedDataItemResponse,
      dataV2DataItem_universal_d_InsertDataItemReferenceRequest as InsertDataItemReferenceRequest,
      dataV2DataItem_universal_d_DataItemReference as DataItemReference,
      dataV2DataItem_universal_d_InsertDataItemReferenceResponse as InsertDataItemReferenceResponse,
      dataV2DataItem_universal_d_RemoveDataItemReferenceRequest as RemoveDataItemReferenceRequest,
      dataV2DataItem_universal_d_RemoveDataItemReferenceResponse as RemoveDataItemReferenceResponse,
      dataV2DataItem_universal_d_BulkInsertDataItemReferencesRequest as BulkInsertDataItemReferencesRequest,
      dataV2DataItem_universal_d_BulkInsertDataItemReferencesResponse as BulkInsertDataItemReferencesResponse,
      dataV2DataItem_universal_d_BulkDataItemReferenceResult as BulkDataItemReferenceResult,
      dataV2DataItem_universal_d_BulkRemoveDataItemReferencesRequest as BulkRemoveDataItemReferencesRequest,
      dataV2DataItem_universal_d_BulkRemoveDataItemReferencesResponse as BulkRemoveDataItemReferencesResponse,
      dataV2DataItem_universal_d_ReplaceDataItemReferencesRequest as ReplaceDataItemReferencesRequest,
      dataV2DataItem_universal_d_ReplaceDataItemReferencesResponse as ReplaceDataItemReferencesResponse,
      dataV2DataItem_universal_d_DomainEvent as DomainEvent,
      dataV2DataItem_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      dataV2DataItem_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      dataV2DataItem_universal_d_RestoreInfo as RestoreInfo,
      dataV2DataItem_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      dataV2DataItem_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      dataV2DataItem_universal_d_ActionEvent as ActionEvent,
      dataV2DataItem_universal_d_MessageEnvelope as MessageEnvelope,
      dataV2DataItem_universal_d_IdentificationData as IdentificationData,
      dataV2DataItem_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      dataV2DataItem_universal_d_WebhookIdentityType as WebhookIdentityType,
      dataV2DataItem_universal_d_insertDataItem as insertDataItem,
      dataV2DataItem_universal_d_InsertDataItemOptions as InsertDataItemOptions,
      dataV2DataItem_universal_d_patchDataItem as patchDataItem,
      dataV2DataItem_universal_d_PatchDataItemOptions as PatchDataItemOptions,
      dataV2DataItem_universal_d_bulkPatchDataItems as bulkPatchDataItems,
      dataV2DataItem_universal_d_BulkPatchDataItemsOptions as BulkPatchDataItemsOptions,
      dataV2DataItem_universal_d_updateDataItem as updateDataItem,
      dataV2DataItem_universal_d_UpdateDataItemOptions as UpdateDataItemOptions,
      dataV2DataItem_universal_d_saveDataItem as saveDataItem,
      dataV2DataItem_universal_d_SaveDataItemOptions as SaveDataItemOptions,
      dataV2DataItem_universal_d_getDataItem as getDataItem,
      dataV2DataItem_universal_d_GetDataItemOptions as GetDataItemOptions,
      dataV2DataItem_universal_d_removeDataItem as removeDataItem,
      dataV2DataItem_universal_d_RemoveDataItemOptions as RemoveDataItemOptions,
      dataV2DataItem_universal_d_truncateDataItems as truncateDataItems,
      dataV2DataItem_universal_d_TruncateDataItemsOptions as TruncateDataItemsOptions,
      dataV2DataItem_universal_d_queryDataItems as queryDataItems,
      dataV2DataItem_universal_d_QueryDataItemsOptions as QueryDataItemsOptions,
      dataV2DataItem_universal_d_DataItemsQueryResult as DataItemsQueryResult,
      dataV2DataItem_universal_d_DataItemsQueryBuilder as DataItemsQueryBuilder,
      dataV2DataItem_universal_d_aggregateDataItems as aggregateDataItems,
      dataV2DataItem_universal_d_AggregateDataItemsOptions as AggregateDataItemsOptions,
      dataV2DataItem_universal_d_countDataItems as countDataItems,
      dataV2DataItem_universal_d_CountDataItemsOptions as CountDataItemsOptions,
      dataV2DataItem_universal_d_queryDistinctValues as queryDistinctValues,
      dataV2DataItem_universal_d_QueryDistinctValuesOptions as QueryDistinctValuesOptions,
      dataV2DataItem_universal_d_bulkInsertDataItems as bulkInsertDataItems,
      dataV2DataItem_universal_d_BulkInsertDataItemsOptions as BulkInsertDataItemsOptions,
      dataV2DataItem_universal_d_bulkUpdateDataItems as bulkUpdateDataItems,
      dataV2DataItem_universal_d_BulkUpdateDataItemsOptions as BulkUpdateDataItemsOptions,
      dataV2DataItem_universal_d_bulkSaveDataItems as bulkSaveDataItems,
      dataV2DataItem_universal_d_BulkSaveDataItemsOptions as BulkSaveDataItemsOptions,
      dataV2DataItem_universal_d_bulkRemoveDataItems as bulkRemoveDataItems,
      dataV2DataItem_universal_d_BulkRemoveDataItemsOptions as BulkRemoveDataItemsOptions,
      dataV2DataItem_universal_d_queryReferencedDataItems as queryReferencedDataItems,
      dataV2DataItem_universal_d_QueryReferencedDataItemsOptions as QueryReferencedDataItemsOptions,
      dataV2DataItem_universal_d_isReferencedDataItem as isReferencedDataItem,
      dataV2DataItem_universal_d_IsReferencedDataItemOptions as IsReferencedDataItemOptions,
      dataV2DataItem_universal_d_insertDataItemReference as insertDataItemReference,
      dataV2DataItem_universal_d_InsertDataItemReferenceOptions as InsertDataItemReferenceOptions,
      dataV2DataItem_universal_d_removeDataItemReference as removeDataItemReference,
      dataV2DataItem_universal_d_RemoveDataItemReferenceOptions as RemoveDataItemReferenceOptions,
      dataV2DataItem_universal_d_bulkInsertDataItemReferences as bulkInsertDataItemReferences,
      dataV2DataItem_universal_d_BulkInsertDataItemReferencesOptions as BulkInsertDataItemReferencesOptions,
      dataV2DataItem_universal_d_bulkRemoveDataItemReferences as bulkRemoveDataItemReferences,
      dataV2DataItem_universal_d_BulkRemoveDataItemReferencesOptions as BulkRemoveDataItemReferencesOptions,
      dataV2DataItem_universal_d_replaceDataItemReferences as replaceDataItemReferences,
      dataV2DataItem_universal_d_ReplaceDataItemReferencesOptions as ReplaceDataItemReferencesOptions,
    };
  }
  
  /** An index is a map of a collection's data, organized according to specific fields to increase query speed. */
  interface Index {
      /** Name of the index. */
      name?: string;
      /**
       * Fields for which the index is defined.
       *
       * Max: 3 fields (for a unique index: 1 field)
       */
      fields?: Field[];
      /**
       * Current status of the index.
       * @readonly
       */
      status?: Status;
      /**
       * Contains details about the reasons for failure when `status` is `FAILED`.
       * @readonly
       */
      failure?: Failure;
      /**
       * Whether the index enforces uniqueness of values in the field for which it is defined.
       * If `true`, the index can have only one field.
       *
       * Default: `false`
       */
      unique?: boolean;
      /**
       * Whether the index ignores case.
       *
       * Default: `false`
       */
      caseInsensitive?: boolean;
  }
  /**
   * Order determines how values are ordered in the index. This is important when
   * ordering and/or range querying by indexed fields.
   */
  enum Order {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface Field {
      /** Path of the field to index. For example: `title` or `options.price`. */
      path?: string;
      /**
       * Sort order for the index. Base on how the data is regularly queried.
       *
       * Default: `ASC`
       */
      order?: Order;
  }
  enum Status {
      /** Place holder. Never returned by the service. */
      UNKNOWN = "UNKNOWN",
      /** Index creation is in progress. */
      BUILDING = "BUILDING",
      /** Index has been successfully created and can be used in queries. */
      ACTIVE = "ACTIVE",
      /** Index is in the process of being dropped. */
      DROPPING = "DROPPING",
      /** Index has been dropped successfully. */
      DROPPED = "DROPPED",
      /** Index creation has failed. */
      FAILED = "FAILED",
      /** Index contains incorrectly indexed data. */
      INVALID = "INVALID"
  }
  interface Failure {
      /**
       * Error code.
       * - `WDE0112`: Unknown error while building collection index.
       * - `WDE0113`: Duplicate key error while building collection index.
       * - `WDE0114`: Document too large while building collection index.
       */
      code?: string;
      /**
       * Broad error code.
       * - `WD_UNKNOWN_ERROR`: Unknown error.
       * @internal
       */
      broadCode?: string;
      /** Description of the failure. */
      description?: string;
      /**
       * ID of the data item that caused the failure.
       * For example, if `unique` is `true`, the ID of an item containing a duplicate value.
       */
      itemId?: string | null;
  }
  interface CreateIndexRequest {
      /**
       * Environment on which to define the index. Default value is LIVE.
       * @internal
       */
      environment?: Environment;
      /** Details of the index to be created. */
      index: Index;
      /** ID of the data collection for which to generate the index. */
      dataCollectionId: string;
  }
  enum Environment {
      LIVE = "LIVE",
      SANDBOX = "SANDBOX",
      SANDBOX_PREFERRED = "SANDBOX_PREFERRED"
  }
  interface CreateIndexResponse {
      /** Details of the index being generated. */
      index?: Index;
  }
  interface DropIndexRequest {
      /**
       * Environment on which the index is defined. Default value is LIVE.
       * @internal
       */
      environment?: Environment;
      /** Name of the index to drop. */
      indexName: string;
      /** ID of the data collection for which the index to be dropped is defined. */
      dataCollectionId: string;
  }
  interface DropIndexResponse {
  }
  interface ListIndexesRequest {
      /**
       * Environment to list indexes for.
       * @internal
       */
      environment?: Environment;
      /**
       * Whether to retrieve data from the primary database instance. This decreases performance but ensures data retrieved is up to date even immediately after an update.
       * @internal
       */
      consistentRead?: boolean;
      /** ID of the data collection for which to list indexes. */
      dataCollectionId: string;
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
  }
  interface Paging {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface ListIndexesResponse {
      /** List of all indexes for the requested data collection. */
      indexes?: Index[];
      /** Paging metadata. */
      pagingMetadata?: PagingMetadata;
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
  interface ListAvailableIndexesRequest {
      /** Data collection to show available indexes for */
      dataCollectionId: string;
  }
  interface ListAvailableIndexesResponse {
      /**
       * limit of regular single-field indexes, even if 0 1-field indices may be created using
       * 3-field quota (if available)
       */
      regular1Field?: number;
      /** limit of regular indexes up to 3-fields (in addition to 1-field indexes quota) */
      regular3Field?: number;
      /** limit of unique indexes */
      unique1Field?: number;
      /** Overall index limit, missing value means there's no overall limit */
      total?: number | null;
  }
  /**
   * Creates an index for a data collection.
   *
   * The index can't be used immediately, as the process of generating the index takes time.
   * You can check whether an index is ready by calling List Indexes.
   *
   * Note that when an index fails to create, the failed index still occupies a slot.
   * To remove the failed index and free up the slot for a new index, call Drop Index.
   * @param dataCollectionId - ID of the data collection for which to generate the index.
   * @param index - Details of the index to be created.
   * @public
   * @requiredField dataCollectionId
   * @requiredField index
   * @requiredField index.fields
   * @requiredField index.fields.path
   * @requiredField index.name
   * @param options - Options for creating an index.
   * @permissionId WIX_DATA.CREATE_INDEX
   * @adminMethod
   * @returns Details of the index being generated.
   */
  function createIndex(dataCollectionId: string, index: Index, options?: CreateIndexOptions): Promise<Index>;
  interface CreateIndexOptions {
      /**
       * Environment on which to define the index. Default value is LIVE.
       * @internal
       */
      environment?: Environment;
  }
  /**
   * Removes an index from a data collection.
   *
   * The process of dropping an index from a collection takes time.
   * You can check whether an index has been dropped by calling List Indexes.
   * @param dataCollectionId - ID of the data collection for which the index to be dropped is defined.
   * @param indexName - Name of the index to drop.
   * @public
   * @requiredField dataCollectionId
   * @requiredField indexName
   * @param options - Options for dropping an index.
   * @permissionId WIX_DATA.DROP_INDEX
   * @adminMethod
   */
  function dropIndex(dataCollectionId: string, indexName: string, options?: DropIndexOptions): Promise<void>;
  interface DropIndexOptions {
      /**
       * Environment on which the index is defined. Default value is LIVE.
       * @internal
       */
      environment?: Environment;
  }
  /**
   * Lists all indexes defined for a data collection.
   *
   * When an index's status is `ACTIVE`, it is ready to use.
   * While it is still being created, its status is `BUILDING`.
   *
   * When an index's status is `DROPPED`, it has been dropped successfully.
   * While it is still in the process of being removed, its status is `DROPPING`.
   * @param dataCollectionId - ID of the data collection for which to list indexes.
   * @public
   * @requiredField dataCollectionId
   * @param options - Options for retrieving a list of indexes.
   * @permissionId WIX_DATA.LIST_INDEXES
   * @adminMethod
   */
  function listIndexes(dataCollectionId: string, options?: ListIndexesOptions): Promise<ListIndexesResponse>;
  interface ListIndexesOptions {
      /**
       * Environment to list indexes for.
       * @internal
       */
      environment?: Environment;
      /**
       * Whether to retrieve data from the primary database instance. This decreases performance but ensures data retrieved is up to date even immediately after an update.
       * @internal
       */
      consistentRead?: boolean;
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
  }
  /**
   * Lists available indexes limits
   * @param dataCollectionId - Data collection to show available indexes for
   * @internal
   * @documentationMaturity preview
   * @requiredField dataCollectionId
   * @permissionId WIX_DATA.LIST_INDEXES
   * @adminMethod
   */
  function listAvailableIndexes(dataCollectionId: string): Promise<ListAvailableIndexesResponse>;
  
  type dataV2Index_universal_d_Index = Index;
  type dataV2Index_universal_d_Order = Order;
  const dataV2Index_universal_d_Order: typeof Order;
  type dataV2Index_universal_d_Field = Field;
  type dataV2Index_universal_d_Status = Status;
  const dataV2Index_universal_d_Status: typeof Status;
  type dataV2Index_universal_d_Failure = Failure;
  type dataV2Index_universal_d_CreateIndexRequest = CreateIndexRequest;
  type dataV2Index_universal_d_Environment = Environment;
  const dataV2Index_universal_d_Environment: typeof Environment;
  type dataV2Index_universal_d_CreateIndexResponse = CreateIndexResponse;
  type dataV2Index_universal_d_DropIndexRequest = DropIndexRequest;
  type dataV2Index_universal_d_DropIndexResponse = DropIndexResponse;
  type dataV2Index_universal_d_ListIndexesRequest = ListIndexesRequest;
  type dataV2Index_universal_d_Paging = Paging;
  type dataV2Index_universal_d_ListIndexesResponse = ListIndexesResponse;
  type dataV2Index_universal_d_PagingMetadata = PagingMetadata;
  type dataV2Index_universal_d_ListAvailableIndexesRequest = ListAvailableIndexesRequest;
  type dataV2Index_universal_d_ListAvailableIndexesResponse = ListAvailableIndexesResponse;
  const dataV2Index_universal_d_createIndex: typeof createIndex;
  type dataV2Index_universal_d_CreateIndexOptions = CreateIndexOptions;
  const dataV2Index_universal_d_dropIndex: typeof dropIndex;
  type dataV2Index_universal_d_DropIndexOptions = DropIndexOptions;
  const dataV2Index_universal_d_listIndexes: typeof listIndexes;
  type dataV2Index_universal_d_ListIndexesOptions = ListIndexesOptions;
  const dataV2Index_universal_d_listAvailableIndexes: typeof listAvailableIndexes;
  namespace dataV2Index_universal_d {
    export {
      dataV2Index_universal_d_Index as Index,
      dataV2Index_universal_d_Order as Order,
      dataV2Index_universal_d_Field as Field,
      dataV2Index_universal_d_Status as Status,
      dataV2Index_universal_d_Failure as Failure,
      dataV2Index_universal_d_CreateIndexRequest as CreateIndexRequest,
      dataV2Index_universal_d_Environment as Environment,
      dataV2Index_universal_d_CreateIndexResponse as CreateIndexResponse,
      dataV2Index_universal_d_DropIndexRequest as DropIndexRequest,
      dataV2Index_universal_d_DropIndexResponse as DropIndexResponse,
      dataV2Index_universal_d_ListIndexesRequest as ListIndexesRequest,
      dataV2Index_universal_d_Paging as Paging,
      dataV2Index_universal_d_ListIndexesResponse as ListIndexesResponse,
      dataV2Index_universal_d_PagingMetadata as PagingMetadata,
      dataV2Index_universal_d_ListAvailableIndexesRequest as ListAvailableIndexesRequest,
      dataV2Index_universal_d_ListAvailableIndexesResponse as ListAvailableIndexesResponse,
      dataV2Index_universal_d_createIndex as createIndex,
      dataV2Index_universal_d_CreateIndexOptions as CreateIndexOptions,
      dataV2Index_universal_d_dropIndex as dropIndex,
      dataV2Index_universal_d_DropIndexOptions as DropIndexOptions,
      dataV2Index_universal_d_listIndexes as listIndexes,
      dataV2Index_universal_d_ListIndexesOptions as ListIndexesOptions,
      dataV2Index_universal_d_listAvailableIndexes as listAvailableIndexes,
    };
  }
  
  export { dataV2DataCollection_universal_d as collections, dataV1ExternalDatabaseConnection_universal_d as externalDatabaseConnections, dataV2Index_universal_d as indexes, dataV2DataItem_universal_d as items, dataV1DataPermissions_universal_d as permissions };
}
