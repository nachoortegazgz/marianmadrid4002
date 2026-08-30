declare module "wix-groups.v2" {
    interface GroupMember$1 {
        /**
         * Site member ID.
         * @readonly
         */
        memberId?: string;
        /** Group Member Role. */
        role?: GroupRole$1;
        /**
         * Date and time the group Member joined the group.
         * @readonly
         */
        joinedDate?: Date;
    }
    /**
     * A group member may have multiple roles in a single group.
     * Currently, only `MEMBER` and `ADMIN` roles are supported, but more roles may be available in the future.
     */
    interface GroupRole$1 {
        /**
         * Group member role. One of:
         * - `"MEMBER"` - Regular group member.
         * - `"ADMIN"` - Group administrator.
         */
        value?: Role$1;
    }
    enum Role$1 {
        UNKNOWN_ROLE = "UNKNOWN_ROLE",
        /** Regular group member. */
        MEMBER = "MEMBER",
        /** Group administrator. */
        ADMIN = "ADMIN"
    }
    interface SocialGroupsEvent$1 extends SocialGroupsEventPayloadOneOf$1 {
        memberJoined?: MemberJoinedGroup$1;
        membersAdded?: MembersAddedToGroup$1;
        joinRequestsApproved?: JoinRequestsApproved$1;
        membersInvited?: MembersInvitedToGroup$1;
    }
    /** @oneof */
    interface SocialGroupsEventPayloadOneOf$1 {
        memberJoined?: MemberJoinedGroup$1;
        membersAdded?: MembersAddedToGroup$1;
        joinRequestsApproved?: JoinRequestsApproved$1;
        membersInvited?: MembersInvitedToGroup$1;
    }
    interface MemberJoinedGroup$1 {
        groupId?: string;
        groupsInstanceId?: string;
        siteMemberId?: string;
    }
    interface MembersAddedToGroup$1 {
        groupId?: string;
        groupsInstanceId?: string;
        whoAddedId?: string | null;
        siteMemberIds?: string[];
        /** Used for Apes sticky experiment */
        operationId?: string;
    }
    interface JoinRequestsApproved$1 {
        groupId?: string;
        groupsInstanceId?: string;
        siteMemberIds?: string[];
        /** Used for Apes sticky experiment */
        operationId?: string;
    }
    interface MembersInvitedToGroup$1 {
        groupId?: string;
        groupsInstanceId?: string;
        siteMemberIds?: string[];
    }
    /** ID of the group to join. */
    interface JoinRequest {
        groupId: string;
        /** Answers to membership questions. A Join Request will fail, if the answer to a required question is omitted. */
        membershipQuestionAnswers?: MembershipQuestionAnswer$1[];
        autoInviteId?: string | null;
    }
    /** Answer to a membership question. */
    interface MembershipQuestionAnswer$1 {
        /** Question ID. */
        _id?: string;
        /** Answer text. */
        text?: string | null;
    }
    interface JoinResponse {
        /** New member. */
        member?: GroupMember$1;
    }
    interface MemberJoined {
        /** Group ID that member has joined. */
        groupId?: string;
        /** Joined group member. */
        groupMember?: GroupMember$1;
    }
    enum JoinBy {
        MANUALLY = "MANUALLY",
        PERSONAL_INVITE_LINK = "PERSONAL_INVITE_LINK",
        PUBLIC_INVITE_LINK = "PUBLIC_INVITE_LINK"
    }
    interface LeaveRequest {
        /** ID of the Group to leave. */
        groupId: string;
    }
    interface LeaveResponse {
    }
    interface MemberLeft {
        /** Group ID that member has left. */
        groupId?: string;
        /** Group member that left. */
        groupMember?: GroupMember$1;
    }
    interface AddGroupMembersRequest {
        /** Group ID. */
        groupId: string;
        /**
         * IDs of the site members to add to the group.
         *
         *
         */
        memberIds?: string[];
    }
    interface AddGroupMembersResponse {
        /** New members. */
        members?: GroupMember$1[];
    }
    interface MemberAdded {
        /** Group ID that member was added to. */
        groupId?: string;
        /** Added group member. */
        groupMember?: GroupMember$1;
    }
    interface RemoveGroupMembersRequest {
        /** Group ID. */
        groupId: string;
        /**  IDs of the site members to remove from the group. */
        memberIds?: string[];
    }
    interface RemoveGroupMembersResponse {
    }
    interface MemberRemoved {
        /** Group ID that member was removed from. */
        groupId?: string;
        /** Removed group member. */
        groupMember?: GroupMember$1;
    }
    interface ListGroupMembersRequest {
        /** Group ID. */
        groupId: string;
        /** Number of items to load. Maximum `100.` */
        limit?: number | null;
        /** Number of group members to skip in the list. */
        offset?: number | null;
    }
    interface ListGroupMembersResponse {
        /** Retrieved members. */
        members?: GroupMember$1[];
        /** Paging information. */
        metadata?: PagingMetadata$2;
    }
    interface PagingMetadata$2 {
        /** Number of items returned in the response. */
        count?: number | null;
        /** Offset that was requested. */
        offset?: number | null;
        /** Total number of items that match the query. */
        total?: number | null;
        /** Flag that indicates the server failed to calculate the `total` field. */
        tooManyToCount?: boolean | null;
    }
    interface QueryGroupMembersRequest {
        /** Group ID. */
        groupId: string;
        query?: Query$2;
    }
    interface Query$2 {
        /**
         * Filter object in the following format:
         * `"filter" : {
         * "fieldName1": "value1",
         * "fieldName2":{"$operator":"value2"}
         * }`
         * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
         */
        filter?: any;
        /**
         * Sort object in the following format:
         * `[{"fieldName":"sortField1","order":"ASC"},{"fieldName":"sortField2","order":"DESC"}]`
         */
        sort?: Sorting$2[];
        /** Paging options to limit and skip the number of items. */
        paging?: Paging$2;
        /** Array of projected fields. A list of specific field names to return. If `fieldsets` are also specified, the union of `fieldsets` and `fields` is returned. */
        fields?: string[];
        /** Array of named, predefined sets of projected fields. A array of predefined named sets of fields to be returned. Specifying multiple `fieldsets` will return the union of fields from all sets. If `fields` are also specified, the union of `fieldsets` and `fields` is returned. */
        fieldsets?: string[];
    }
    interface Sorting$2 {
        /** Name of the field to sort by. */
        fieldName?: string;
        /** Sort order. */
        order?: SortOrder$2;
    }
    enum SortOrder$2 {
        ASC = "ASC",
        DESC = "DESC"
    }
    interface Paging$2 {
        /** Number of items to load. */
        limit?: number | null;
        /** Number of items to skip in the current sort order. */
        offset?: number | null;
    }
    interface QueryGroupMembersResponse {
        /** Group members. */
        members?: GroupMember$1[];
        /** Paging information. */
        metadata?: PagingMetadata$2;
    }
    interface QueryNonGroupMembersRequest {
        /** Group ID. */
        groupId: string;
        query?: Query$2;
    }
    interface QueryNonGroupMembersResponse {
        /** Retrieved members. */
        members?: GroupMember$1[];
    }
    interface ListMembershipsRequest {
        /** Site member ID. */
        memberId: string | null;
        /** Number of items to load. */
        limit?: number | null;
        /** Number of memberships to skip in the list. */
        offset?: number | null;
    }
    interface ListMembershipsResponse {
        /** Site member's memberships. */
        memberships?: Membership[];
        /** Paging information. */
        metadata?: PagingMetadata$2;
    }
    interface Membership {
        /**
         * Group ID.
         * @readonly
         */
        groupId?: string;
        /**
         * Membership status with Group
         * - `"JOINED"` - Site member is a group member.
         * - `"PENDING"` - Site member has submitted a Join Request for this group that is still `"PENDING"`.
         */
        status?: MembershipStatus$1;
        /** Group member role. When membership status is not `JOINED`, this is empty. */
        role?: GroupRole$1;
    }
    enum MembershipStatus$1 {
        UNKNOWN_STATUS = "UNKNOWN_STATUS",
        /** Site member is a group member. */
        JOINED = "JOINED",
        /** Site member has join group request with `PENDING` status for this group. */
        PENDING = "PENDING"
    }
    interface QueryMembershipsRequest {
        /** Site member ID. */
        memberId: string | null;
        query?: Query$2;
    }
    interface QueryMembershipsResponse {
        /** Site member's memberships. */
        memberships?: Membership[];
        /** Paging information. */
        metadata?: PagingMetadata$2;
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
        /** Event timestamp. */
        eventTime?: Date;
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
        /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
        restoreInfo?: RestoreInfo$3;
    }
    interface RestoreInfo$3 {
        deletedDate?: Date;
    }
    interface EntityUpdatedEvent$3 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$3 {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent$3 {
        bodyAsJson?: string;
    }
    interface MessageEnvelope$3 {
        /** App instance ID. */
        instanceId?: string | null;
        /** Event type. */
        eventType?: string;
        /** The identification type and identity data. */
        identity?: IdentificationData$3;
        /** Stringify payload. */
        data?: string;
    }
    interface IdentificationData$3 extends IdentificationDataIdOneOf$3 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
        /** @readonly */
        identityType?: WebhookIdentityType$3;
    }
    /** @oneof */
    interface IdentificationDataIdOneOf$3 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
    }
    enum WebhookIdentityType$3 {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    interface JoinGroupOptions {
        /** Answers to membership questions. A Join Request will fail, if the answer to a required question is omitted. */
        membershipQuestionAnswers?: MembershipQuestionAnswer$1[];
        autoInviteId?: string | null;
    }
    /**
     * Adds site members to a group.
     *
     *
     * The `addGroupMembers()` function returns a Promise that resolves to the newly-added group member
     * after the member has successfully been added.
     *
     * For `SECRET` groups, site admins, group admins, and group members can add additional members to their group.
     *
     * For `PUBLIC` and `PRIVATE` groups, only site admins and group admins can add additional members to their group. They can also choose to allow all group members to add a new member to the group.
     * This setting can be found in your site's Dashboard under **Groups Application > Your Group > Admin Tools > Member Permissions**.
     *
     * <!-- > **Note:** If the `suppressAuth` option is set to `true`, all permissions are overwritten and all site members (including non-group members) can add additional members to a group. -->
     *
     * @param groupId - Group ID.
     * @param memberIds - IDs of the site members to add to the group.
     * @public
     * @requiredField groupId
     * @requiredField memberIds
     * @adminMethod
     */
    function addGroupMembers(groupId: string, memberIds: string[], options?: AddGroupMembersOptions): Promise<AddGroupMembersResponse>;
    interface AddGroupMembersOptions {
    }
    /**
     * Removes members from a group.
     *
     *
     * The `removeGroupMembers()` function returns a Promise that resolves when the member is removed from the group.
     *
     * > **Note:** Only site admins and group admins can remove members from their group. <!-- However, if the `suppressAuth` option is set to `true`, all permissions are overwritten and all site members (including non-group members) can remove members from a group. -->
     *
     * @param groupId - Group ID.
     * @param memberIds - IDs of the site members to remove from the group.
     * @public
     * @requiredField groupId
     * @requiredField memberIds
     * @adminMethod
     */
    function removeGroupMembers(groupId: string, memberIds: string[], options?: RemoveGroupMembersOptions): Promise<void>;
    interface RemoveGroupMembersOptions {
    }
    /**
     * Lists all members of a group.
     *
     *
     *  The `listGroupMembers()` function returns a Promise that resolves to a list of up to 100 group members.
     *  Sorts by default to `joinedDate` in descending order.
     *
     *  > **Note:** For `SECRET` groups, only site admins, group admins, and group members can see the list of group members. <!-- However, if the `suppressAuth` option is set to `true`, all permissions are overwritten, and all site members (including non-group members) can see the list of group members.  -->
     *  <!-- > + This function's parameters are positional, and must be specified in the sequence shown in the syntax below. When specifying a parameter, use `null` as a placeholder for any unspecified parameters. For example, to specify `limit` only, call `listGroupMembers(groupId, paging, null)`. To specify `supressAuth` only, call `listGroupMembers(groupId, null, options)`. -->
     *
     * @param groupId - Group ID.
     * @public
     * @requiredField groupId
     * @param options - Paging options.
     * @adminMethod
     */
    function listGroupMembers(groupId: string, options?: ListGroupMembersOptions): Promise<ListGroupMembersResponse>;
    interface ListGroupMembersOptions {
        /** Maximum number of group members to retrieve. Defaults to 100. */
        limit?: number | null;
        /** Number of group members to skip in the list. */
        offset?: number | null;
    }
    /**
     * Retrieves a list of up to 100 group members, given the provided paging, sorting and filtering.
     *
     *
     * Creates a query to retrieve a list of group members.
     *
     * > **Note:** For `SECRET` groups, only site admins, group admins, and group members can query group members. <!-- However, if the `suppressAuth` option is set to `true`, all permissions are overwritten, and all site members (including non-group members) can query group members.  -->
     *
     * The `queryGroupMembers()` function builds a query to retrieve a list of all group members, and returns a [GroupMembersQueryBuilder](#membersquerybuilder) object.
     *
     * The returned object contains the query definition which is typically used to run the query using the [`find()`](#membersquerybuilder/find) function.
     *
     * You can refine the query by chaining `GroupMembersQueryBuilder` functions onto the query. `GroupMembersQueryBuilder` functions enable you to sort, filter, and control the results that `queryMembers()` returns.
     *
     *  `queryGroupMembers()` runs with these `GroupMembersQueryBuilder` defaults, which you can override:
     *  + [`limit(100)`](/members-query-builder/limit)
     *  + [`descending("joinedDate")`](/members-query-builder/descending)
     *
     * The following `GroupMembersQueryBuilder` functions are supported for `queryGroupMembers()`. For a full description of the Members object, see the object returned for the [`items`](/members-query-result/items) property in `MembersQueryResult`.
     * @public
     * @requiredField groupId
     * @param groupId - Group ID.
     * @adminMethod
     */
    function queryGroupMembers(groupId: string): MembersQueryBuilder;
    interface QueryOffsetResult$2 {
        currentPage: number | undefined;
        totalPages: number | undefined;
        totalCount: number | undefined;
        hasNext: () => boolean;
        hasPrev: () => boolean;
        length: number;
        pageSize: number;
    }
    interface MembersQueryResult extends QueryOffsetResult$2 {
        items: GroupMember$1[];
        query: MembersQueryBuilder;
        next: () => Promise<MembersQueryResult>;
        prev: () => Promise<MembersQueryResult>;
    }
    interface MembersQueryBuilder {
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        eq: (propertyName: "role", value: any) => MembersQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        ne: (propertyName: "role", value: any) => MembersQueryBuilder;
        /** @param propertyName - Property whose value is compared with `values`.
         * @param values - List of values to compare against.
         */
        hasSome: (propertyName: "role", value: any[]) => MembersQueryBuilder;
        in: (propertyName: "role", value: any) => MembersQueryBuilder;
        exists: (propertyName: "role", value: boolean) => MembersQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
        ascending: (...propertyNames: Array<"role" | "joinedDate">) => MembersQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
        descending: (...propertyNames: Array<"role" | "joinedDate">) => MembersQueryBuilder;
        /** @param limit - Number of items to return, which is also the `pageSize` of the results object. */
        limit: (limit: number) => MembersQueryBuilder;
        /** @param skip - Number of items to skip in the query results before returning the results. */
        skip: (skip: number) => MembersQueryBuilder;
        find: () => Promise<MembersQueryResult>;
    }
    interface QueryNonGroupMembersOptions {
        query?: Query$2;
    }
    /**
     * Lists all group memberships of a site member.
     *
     *
     * The `listMemberships()` function returns a Promise that resolves to a list of up to 100 group memberships.
     * Sorts by default to `groupId` in descending order.
     *
     * > **Note:** Only site admins can retrieve a site member's memberships. Site members can see a list of their memberships. <!-- However, if the `suppressAuth` option is set to `true`, all permissions are overwritten, and all site members (including non-group members) can see a list of a site member's memberships. -->
     * <!-- > + This function's parameters are positional, and must be specified in the sequence shown in the syntax below. When specifying a parameter, use `null` as a placeholder for any unspecified parameters. For example, to specify `limit` only, call `listMemberships(memberId, paging, null)`. To specify `supressAuth` only, call `listMemberships(memberId, null, options)`. -->
     *
     * @public
     * @requiredField memberId
     * @param memberId - Site member ID.
     * @param options - Paging options.
     * @adminMethod
     */
    function listMemberships(memberId: string | null, options?: ListMembershipsOptions): Promise<ListMembershipsResponse>;
    interface ListMembershipsOptions {
        /** Maximum number of memberships to retrieve. Defaults to 100. */
        limit?: number | null;
        /** Number of memberships to skip in the list. */
        offset?: number | null;
    }
    /**
     * Retrieves a list of up to 100 members and their membership status, given the provided paging and filtering.
     *
     * The queryMemberships function returns a Promise that resolves to a list of memberships.
     *
     * >**Note:** Site members can only query their own memberships.
     *
     * | Property                    | Supported Filters & Sorting                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
     * | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
     * | `status`                    | [`eq()`](#membershipsquerybuilder/eq), [`ne()`](#membershipsquerybuilder/ne)             |
     * | `role`                      | [`eq()`](#membershipsquerybuilder/eq), [`ne()`](#membershipsquerybuilder/ne)             |
     *
     * @public
     * @requiredField memberId
     * @param memberId - Site member ID.
     * @adminMethod
     */
    function queryMemberships(memberId: string | null, options?: QueryMembershipsOptions): Promise<QueryMembershipsResponse>;
    interface QueryMembershipsOptions {
        query?: Query$2;
    }
    type socialGroupsV2GroupMemberMembers_universal_d_JoinRequest = JoinRequest;
    type socialGroupsV2GroupMemberMembers_universal_d_JoinResponse = JoinResponse;
    type socialGroupsV2GroupMemberMembers_universal_d_MemberJoined = MemberJoined;
    type socialGroupsV2GroupMemberMembers_universal_d_JoinBy = JoinBy;
    const socialGroupsV2GroupMemberMembers_universal_d_JoinBy: typeof JoinBy;
    type socialGroupsV2GroupMemberMembers_universal_d_LeaveRequest = LeaveRequest;
    type socialGroupsV2GroupMemberMembers_universal_d_LeaveResponse = LeaveResponse;
    type socialGroupsV2GroupMemberMembers_universal_d_MemberLeft = MemberLeft;
    type socialGroupsV2GroupMemberMembers_universal_d_AddGroupMembersRequest = AddGroupMembersRequest;
    type socialGroupsV2GroupMemberMembers_universal_d_AddGroupMembersResponse = AddGroupMembersResponse;
    type socialGroupsV2GroupMemberMembers_universal_d_MemberAdded = MemberAdded;
    type socialGroupsV2GroupMemberMembers_universal_d_RemoveGroupMembersRequest = RemoveGroupMembersRequest;
    type socialGroupsV2GroupMemberMembers_universal_d_RemoveGroupMembersResponse = RemoveGroupMembersResponse;
    type socialGroupsV2GroupMemberMembers_universal_d_MemberRemoved = MemberRemoved;
    type socialGroupsV2GroupMemberMembers_universal_d_ListGroupMembersRequest = ListGroupMembersRequest;
    type socialGroupsV2GroupMemberMembers_universal_d_ListGroupMembersResponse = ListGroupMembersResponse;
    type socialGroupsV2GroupMemberMembers_universal_d_QueryGroupMembersRequest = QueryGroupMembersRequest;
    type socialGroupsV2GroupMemberMembers_universal_d_QueryGroupMembersResponse = QueryGroupMembersResponse;
    type socialGroupsV2GroupMemberMembers_universal_d_QueryNonGroupMembersRequest = QueryNonGroupMembersRequest;
    type socialGroupsV2GroupMemberMembers_universal_d_QueryNonGroupMembersResponse = QueryNonGroupMembersResponse;
    type socialGroupsV2GroupMemberMembers_universal_d_ListMembershipsRequest = ListMembershipsRequest;
    type socialGroupsV2GroupMemberMembers_universal_d_ListMembershipsResponse = ListMembershipsResponse;
    type socialGroupsV2GroupMemberMembers_universal_d_Membership = Membership;
    type socialGroupsV2GroupMemberMembers_universal_d_QueryMembershipsRequest = QueryMembershipsRequest;
    type socialGroupsV2GroupMemberMembers_universal_d_QueryMembershipsResponse = QueryMembershipsResponse;
    type socialGroupsV2GroupMemberMembers_universal_d_JoinGroupOptions = JoinGroupOptions;
    const socialGroupsV2GroupMemberMembers_universal_d_addGroupMembers: typeof addGroupMembers;
    type socialGroupsV2GroupMemberMembers_universal_d_AddGroupMembersOptions = AddGroupMembersOptions;
    const socialGroupsV2GroupMemberMembers_universal_d_removeGroupMembers: typeof removeGroupMembers;
    type socialGroupsV2GroupMemberMembers_universal_d_RemoveGroupMembersOptions = RemoveGroupMembersOptions;
    const socialGroupsV2GroupMemberMembers_universal_d_listGroupMembers: typeof listGroupMembers;
    type socialGroupsV2GroupMemberMembers_universal_d_ListGroupMembersOptions = ListGroupMembersOptions;
    const socialGroupsV2GroupMemberMembers_universal_d_queryGroupMembers: typeof queryGroupMembers;
    type socialGroupsV2GroupMemberMembers_universal_d_MembersQueryResult = MembersQueryResult;
    type socialGroupsV2GroupMemberMembers_universal_d_MembersQueryBuilder = MembersQueryBuilder;
    type socialGroupsV2GroupMemberMembers_universal_d_QueryNonGroupMembersOptions = QueryNonGroupMembersOptions;
    const socialGroupsV2GroupMemberMembers_universal_d_listMemberships: typeof listMemberships;
    type socialGroupsV2GroupMemberMembers_universal_d_ListMembershipsOptions = ListMembershipsOptions;
    const socialGroupsV2GroupMemberMembers_universal_d_queryMemberships: typeof queryMemberships;
    type socialGroupsV2GroupMemberMembers_universal_d_QueryMembershipsOptions = QueryMembershipsOptions;
    namespace socialGroupsV2GroupMemberMembers_universal_d {
        export { GroupMember$1 as GroupMember, GroupRole$1 as GroupRole, Role$1 as Role, SocialGroupsEvent$1 as SocialGroupsEvent, SocialGroupsEventPayloadOneOf$1 as SocialGroupsEventPayloadOneOf, MemberJoinedGroup$1 as MemberJoinedGroup, MembersAddedToGroup$1 as MembersAddedToGroup, JoinRequestsApproved$1 as JoinRequestsApproved, MembersInvitedToGroup$1 as MembersInvitedToGroup, socialGroupsV2GroupMemberMembers_universal_d_JoinRequest as JoinRequest, MembershipQuestionAnswer$1 as MembershipQuestionAnswer, socialGroupsV2GroupMemberMembers_universal_d_JoinResponse as JoinResponse, socialGroupsV2GroupMemberMembers_universal_d_MemberJoined as MemberJoined, socialGroupsV2GroupMemberMembers_universal_d_JoinBy as JoinBy, socialGroupsV2GroupMemberMembers_universal_d_LeaveRequest as LeaveRequest, socialGroupsV2GroupMemberMembers_universal_d_LeaveResponse as LeaveResponse, socialGroupsV2GroupMemberMembers_universal_d_MemberLeft as MemberLeft, socialGroupsV2GroupMemberMembers_universal_d_AddGroupMembersRequest as AddGroupMembersRequest, socialGroupsV2GroupMemberMembers_universal_d_AddGroupMembersResponse as AddGroupMembersResponse, socialGroupsV2GroupMemberMembers_universal_d_MemberAdded as MemberAdded, socialGroupsV2GroupMemberMembers_universal_d_RemoveGroupMembersRequest as RemoveGroupMembersRequest, socialGroupsV2GroupMemberMembers_universal_d_RemoveGroupMembersResponse as RemoveGroupMembersResponse, socialGroupsV2GroupMemberMembers_universal_d_MemberRemoved as MemberRemoved, socialGroupsV2GroupMemberMembers_universal_d_ListGroupMembersRequest as ListGroupMembersRequest, socialGroupsV2GroupMemberMembers_universal_d_ListGroupMembersResponse as ListGroupMembersResponse, PagingMetadata$2 as PagingMetadata, socialGroupsV2GroupMemberMembers_universal_d_QueryGroupMembersRequest as QueryGroupMembersRequest, Query$2 as Query, Sorting$2 as Sorting, SortOrder$2 as SortOrder, Paging$2 as Paging, socialGroupsV2GroupMemberMembers_universal_d_QueryGroupMembersResponse as QueryGroupMembersResponse, socialGroupsV2GroupMemberMembers_universal_d_QueryNonGroupMembersRequest as QueryNonGroupMembersRequest, socialGroupsV2GroupMemberMembers_universal_d_QueryNonGroupMembersResponse as QueryNonGroupMembersResponse, socialGroupsV2GroupMemberMembers_universal_d_ListMembershipsRequest as ListMembershipsRequest, socialGroupsV2GroupMemberMembers_universal_d_ListMembershipsResponse as ListMembershipsResponse, socialGroupsV2GroupMemberMembers_universal_d_Membership as Membership, MembershipStatus$1 as MembershipStatus, socialGroupsV2GroupMemberMembers_universal_d_QueryMembershipsRequest as QueryMembershipsRequest, socialGroupsV2GroupMemberMembers_universal_d_QueryMembershipsResponse as QueryMembershipsResponse, DomainEvent$3 as DomainEvent, DomainEventBodyOneOf$3 as DomainEventBodyOneOf, EntityCreatedEvent$3 as EntityCreatedEvent, RestoreInfo$3 as RestoreInfo, EntityUpdatedEvent$3 as EntityUpdatedEvent, EntityDeletedEvent$3 as EntityDeletedEvent, ActionEvent$3 as ActionEvent, MessageEnvelope$3 as MessageEnvelope, IdentificationData$3 as IdentificationData, IdentificationDataIdOneOf$3 as IdentificationDataIdOneOf, WebhookIdentityType$3 as WebhookIdentityType, socialGroupsV2GroupMemberMembers_universal_d_JoinGroupOptions as JoinGroupOptions, socialGroupsV2GroupMemberMembers_universal_d_addGroupMembers as addGroupMembers, socialGroupsV2GroupMemberMembers_universal_d_AddGroupMembersOptions as AddGroupMembersOptions, socialGroupsV2GroupMemberMembers_universal_d_removeGroupMembers as removeGroupMembers, socialGroupsV2GroupMemberMembers_universal_d_RemoveGroupMembersOptions as RemoveGroupMembersOptions, socialGroupsV2GroupMemberMembers_universal_d_listGroupMembers as listGroupMembers, socialGroupsV2GroupMemberMembers_universal_d_ListGroupMembersOptions as ListGroupMembersOptions, socialGroupsV2GroupMemberMembers_universal_d_queryGroupMembers as queryGroupMembers, socialGroupsV2GroupMemberMembers_universal_d_MembersQueryResult as MembersQueryResult, socialGroupsV2GroupMemberMembers_universal_d_MembersQueryBuilder as MembersQueryBuilder, socialGroupsV2GroupMemberMembers_universal_d_QueryNonGroupMembersOptions as QueryNonGroupMembersOptions, socialGroupsV2GroupMemberMembers_universal_d_listMemberships as listMemberships, socialGroupsV2GroupMemberMembers_universal_d_ListMembershipsOptions as ListMembershipsOptions, socialGroupsV2GroupMemberMembers_universal_d_queryMemberships as queryMemberships, socialGroupsV2GroupMemberMembers_universal_d_QueryMembershipsOptions as QueryMembershipsOptions, };
    }
    /**
     * A group member may have multiple roles in a single group.
     * Currently, only `MEMBER` and `ADMIN` roles are supported, but more roles may be available in the future.
     */
    interface GroupRole {
        /** Member's role. */
        value?: Role;
    }
    enum Role {
        /** Undefined group member role. */
        UNKNOWN_ROLE = "UNKNOWN_ROLE",
        /** Regular group member. */
        MEMBER = "MEMBER",
        /** Group administrator. */
        ADMIN = "ADMIN"
    }
    interface AssignRoleRequest {
        /** Group ID. */
        groupId: string;
        /** Member IDs. Limited to 100 member IDs. See the Members API for details. */
        memberIds?: string[];
        /** Role to assign. */
        role?: GroupRole;
    }
    interface AssignRoleResponse {
        /** Group ID. */
        groupId?: string;
        /** Member IDs. Limited to 100 member IDs. See the Members API for details. */
        memberIds?: string[];
        /** Assigned role. */
        role?: GroupRole;
    }
    interface RoleAssignedToGroupMember {
        /** Group ID in which role was assigned. */
        groupId?: string;
        /** Group member to whom the role was assigned. */
        groupMember?: GroupMember;
        /** Assigned group role. */
        role?: GroupRole;
        /** ID of site member who assigned the role. It can be empty if the role was assigned by a third-party application. */
        assignedById?: string | null;
    }
    interface GroupMember {
        /**
         * Member ID. See the Members API for more details.
         * @readonly
         */
        memberId?: string;
        /** Group member role. */
        role?: GroupRole;
        /**
         * Date and time the group Member joined the group.
         * @readonly
         */
        joinedDate?: Date | null;
    }
    interface UnassignRoleRequest {
        /** Group ID. */
        groupId: string;
        /** Member IDs. Limited to 100 member IDs. See the Members API for details. */
        memberIds?: string[];
        /** Role to unassign. */
        role?: GroupRole;
    }
    interface UnassignRoleResponse {
        /** Group ID. */
        groupId?: string;
        /** Member IDs. Limited to 100 member IDs. See the Members API for details. */
        memberIds?: string[];
        /** Unassigned role. */
        role?: GroupRole;
    }
    interface RoleUnassignedFromGroupMember {
        /** Group ID in which role was unassigned. */
        groupId?: string;
        /** Group member from whom role was removed. */
        groupMember?: GroupMember;
        /** Unassigned group role. */
        role?: GroupRole;
        /** ID of site member who unassigned the role. It can be empty if the role was assigned by a third-party application. */
        unassignedById?: string | null;
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
        /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
        restoreInfo?: RestoreInfo$2;
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
    }
    interface EntityDeletedEvent$2 {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
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
     * Assigns a specific role to group members.
     *
     * Calling this method overrides the group member's current `role.value`.
     *
     * >**Notes:**
     * > + Only group admins can assign roles.
     * > + You cannot create new members with this method.
     * @param groupId - Group ID.
     * @param memberIds - Member IDs. Limited to 100 member IDs. See the Members API for details.
     * @param role - Role to assign.
     * @public
     * @requiredField groupId
     * @requiredField memberIds
     * @requiredField role
     * @adminMethod
     * @fqn wix.social.groups.api.v2.GroupRolesService.AssignRole
     */
    function assignRole(groupId: string, memberIds: string[], role: GroupRole, options?: AssignRoleOptions): Promise<AssignRoleResponse>;
    interface AssignRoleOptions {
    }
    /**
     * Unassigns a role from group members.
     *
     * You can only unassign `ADMIN` roles. Calling this method with group members
     * with `role.value` set to `MEMBER` returns an error.
     *
     * > **Notes:**
     * > + Only group admins can assign roles.
     * > + You cannot remove members with this method.
     * @param groupId - Group ID.
     * @param memberIds - Member IDs. Limited to 100 member IDs. See the Members API for details.
     * @param role - Role to unassign.
     * @public
     * @requiredField groupId
     * @requiredField memberIds
     * @requiredField role
     * @adminMethod
     * @fqn wix.social.groups.api.v2.GroupRolesService.UnassignRole
     */
    function unassignRole(groupId: string, memberIds: string[], role: GroupRole, options?: UnassignRoleOptions): Promise<UnassignRoleResponse>;
    interface UnassignRoleOptions {
    }
    type socialGroupsV2GroupRoleRoles_universal_d_GroupRole = GroupRole;
    type socialGroupsV2GroupRoleRoles_universal_d_Role = Role;
    const socialGroupsV2GroupRoleRoles_universal_d_Role: typeof Role;
    type socialGroupsV2GroupRoleRoles_universal_d_AssignRoleRequest = AssignRoleRequest;
    type socialGroupsV2GroupRoleRoles_universal_d_AssignRoleResponse = AssignRoleResponse;
    type socialGroupsV2GroupRoleRoles_universal_d_RoleAssignedToGroupMember = RoleAssignedToGroupMember;
    type socialGroupsV2GroupRoleRoles_universal_d_GroupMember = GroupMember;
    type socialGroupsV2GroupRoleRoles_universal_d_UnassignRoleRequest = UnassignRoleRequest;
    type socialGroupsV2GroupRoleRoles_universal_d_UnassignRoleResponse = UnassignRoleResponse;
    type socialGroupsV2GroupRoleRoles_universal_d_RoleUnassignedFromGroupMember = RoleUnassignedFromGroupMember;
    const socialGroupsV2GroupRoleRoles_universal_d_assignRole: typeof assignRole;
    type socialGroupsV2GroupRoleRoles_universal_d_AssignRoleOptions = AssignRoleOptions;
    const socialGroupsV2GroupRoleRoles_universal_d_unassignRole: typeof unassignRole;
    type socialGroupsV2GroupRoleRoles_universal_d_UnassignRoleOptions = UnassignRoleOptions;
    namespace socialGroupsV2GroupRoleRoles_universal_d {
        export { socialGroupsV2GroupRoleRoles_universal_d_GroupRole as GroupRole, socialGroupsV2GroupRoleRoles_universal_d_Role as Role, socialGroupsV2GroupRoleRoles_universal_d_AssignRoleRequest as AssignRoleRequest, socialGroupsV2GroupRoleRoles_universal_d_AssignRoleResponse as AssignRoleResponse, socialGroupsV2GroupRoleRoles_universal_d_RoleAssignedToGroupMember as RoleAssignedToGroupMember, socialGroupsV2GroupRoleRoles_universal_d_GroupMember as GroupMember, socialGroupsV2GroupRoleRoles_universal_d_UnassignRoleRequest as UnassignRoleRequest, socialGroupsV2GroupRoleRoles_universal_d_UnassignRoleResponse as UnassignRoleResponse, socialGroupsV2GroupRoleRoles_universal_d_RoleUnassignedFromGroupMember as RoleUnassignedFromGroupMember, DomainEvent$2 as DomainEvent, DomainEventBodyOneOf$2 as DomainEventBodyOneOf, EntityCreatedEvent$2 as EntityCreatedEvent, RestoreInfo$2 as RestoreInfo, EntityUpdatedEvent$2 as EntityUpdatedEvent, EntityDeletedEvent$2 as EntityDeletedEvent, ActionEvent$2 as ActionEvent, MessageEnvelope$2 as MessageEnvelope, IdentificationData$2 as IdentificationData, IdentificationDataIdOneOf$2 as IdentificationDataIdOneOf, WebhookIdentityType$2 as WebhookIdentityType, socialGroupsV2GroupRoleRoles_universal_d_assignRole as assignRole, socialGroupsV2GroupRoleRoles_universal_d_AssignRoleOptions as AssignRoleOptions, socialGroupsV2GroupRoleRoles_universal_d_unassignRole as unassignRole, socialGroupsV2GroupRoleRoles_universal_d_UnassignRoleOptions as UnassignRoleOptions, };
    }
    interface Group {
        /**
         * Group ID.
         * @readonly
         */
        _id?: string | null;
        /** A unique part of a group's URL, for example `https:/example.com/groups/slug`. */
        slug?: string | null;
        /** Group privacy status. */
        privacyStatus?: PrivacyStatus;
        /** Group name. */
        name?: string | null;
        /** Group description in [DraftJS](https://draftjs.org) format. */
        description?: string | null;
        /** Group teaser. */
        teaser?: string | null;
        /** What group members are called, for example `Coworkers`, `Friends`, or `Students`. */
        memberTitle?: string | null;
        /** Cover image. You cannot upload your own cover image. */
        coverImage?: CoverImage;
        /**
         * Group specific settings.
         *
         * These settings can also be found in [a site's Dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Fwix-groups/settings?).
         */
        settings?: GroupSettings;
        /**
         * Total count of current group members.
         * @readonly
         */
        membersCount?: number | null;
        /**
         * Group owner.
         * @readonly
         */
        ownerId?: string | null;
        /**
         * Group creation date and time.
         * @readonly
         */
        _createdDate?: Date | null;
        /**
         * Date and time of the latest group update.
         * @readonly
         */
        _updatedDate?: Date | null;
        /**
         * Date and time of the most recent group activity, for example a post or comment.
         * @readonly
         */
        lastActivityDate?: Date | null;
    }
    enum Type {
        UNKNOWN = "UNKNOWN",
        ADMIN_APPROVAL = "ADMIN_APPROVAL",
        PAID_PLANS = "PAID_PLANS",
        EVENTS = "EVENTS"
    }
    interface Events {
        eventIds?: string[];
    }
    interface Logo {
        /** Logo image ID (for internal use). */
        mediaId?: string | null;
        /** Logo image width. */
        width?: number | null;
        /** Logo image height. */
        height?: number | null;
    }
    interface GroupDetailsPosition {
        /** horizontal coordinate */
        x?: number;
        /** vertical coordinate */
        y?: number;
    }
    interface Image {
        /** Image ID (for internal use). */
        mediaId?: string | null;
        /** Image width. */
        width?: number | null;
        /** Image height. */
        height?: number | null;
        /** Indicates pre-configured/auto-generated images (from templates, client generated). */
        preset?: boolean | null;
    }
    interface Position {
        /** horizontal coordinate */
        x?: number;
        /** vertical coordinate */
        y?: number;
    }
    enum AllowPolicy {
        UNKNOWN = "UNKNOWN",
        OWNER_AND_ADMINS = "OWNER_AND_ADMINS",
        OWNER = "OWNER",
        ALL_MEMBERS = "ALL_MEMBERS"
    }
    interface OnboardingStepSettings {
        stepKey?: StepKey;
        visible?: boolean;
    }
    enum StepKey {
        UNKNOWN = "UNKNOWN",
        CREATE_POST = "CREATE_POST",
        REACT_TO_POST = "REACT_TO_POST",
        INVITE_MEMBERS = "INVITE_MEMBERS"
    }
    enum PrivacyStatus {
        /** Undefined group privacy status. */
        UNKNOWN = "UNKNOWN",
        /** Anyone can see the group and its content. Anyone can join the group. */
        PUBLIC = "PUBLIC",
        /** Anyone can see the group, but only members can see its content. New members must submit a `Join Group Request`. */
        PRIVATE = "PRIVATE",
        /** Only admins and members can see the group. New members can only be added by other members. */
        SECRET = "SECRET"
    }
    interface AccessRestriction extends AccessRestrictionDataOneOf {
        events?: Events;
        type?: Type;
    }
    /** @oneof */
    interface AccessRestrictionDataOneOf {
        events?: Events;
    }
    interface GroupDetails {
        /** Group logo. You cannot upload your own logo. */
        logo?: Logo;
        /** What group members are called, for example `Coworkers`, `Friends`, or `Students`. */
        membersTitle?: string | null;
    }
    /** Cover image. You cannot upload your own cover image. */
    interface CoverImage {
        /** Cover image. */
        image?: Image;
        /** Position of the corner of the cover image (or logo). */
        position?: Position;
        /** Position of the corner of the cover image (or logo) for mobile browser. */
        mobilePosition?: Position;
        /**
         * Alternative text is typically a relatively short phrase that describes what the image depicts.
         *
         * The alternative text is used:
         * + If the browser cannot display the image.
         * + If the user is utilizing a screen reader.
         * + By search engines to understand what images are on your site.
         */
        altText?: string | null;
    }
    interface GroupSettings {
        /**
         * __Deprecated.__ Use `allowedToInviteMembers` instead.
         * Whether regular members are permitted to invite new members.
         * If `false`, only admins can invite members. Defaults to `true`.
         * @deprecated
         */
        membersCanInvite?: boolean | null;
        /**
         * __Deprecated.__ Use `allowedToApproveJoinRequests` instead.
         * Whether all group members are permitted to approve join group requests.
         * If `false`, member approval is limited to the admins.
         * @deprecated
         */
        membersCanApprove?: boolean | null;
        /** Whether a daily post about new members is enabled. */
        welcomeMemberPostEnabled?: boolean | null;
        /** Whether an automatic post about changing the group details is enabled. */
        groupDetailsChangedPostEnabled?: boolean | null;
        /** Whether all members can see the full member list. */
        showMemberList?: boolean | null;
        /** Determines who can invite members to the group */
        allowedToInviteMembers?: AllowPolicy;
        /** Determines who can approve member join requests to the group */
        allowedToApproveJoinRequests?: AllowPolicy;
    }
    interface Identity {
        /** Member ID of the group creator.  See the Members API for more details. */
        _id?: string | null;
        identityType?: IdentityType;
    }
    enum IdentityType {
        /** Wix user. */
        USER = "USER",
        /** Wix member. */
        MEMBER = "MEMBER"
    }
    interface CreateGroupRequest {
        /** Group to create. */
        group: Group;
        /** ID of the member who created the group, from the Members API. This member will automatically become an admin. */
        creatorId?: string | null;
        /** Content type. */
        contentType?: ContentType;
    }
    enum ContentType {
        PLAIN_TEXT = "PLAIN_TEXT",
        DRAFTJS = "DRAFTJS",
        RICH_CONTENT = "RICH_CONTENT"
    }
    interface CreateGroupResponse {
        /** Created group. */
        group?: Group;
    }
    interface UpdateGroupRequest {
        /** Group to update. */
        group: Group;
        /** Content type. */
        contentType?: ContentType;
    }
    interface UpdateGroupResponse {
        /** Updated group. */
        group?: Group;
    }
    interface GroupCoverChanged {
        /** Old URL of group cover. */
        oldUrl?: string | null;
        /** New URL of group cover. */
        newUrl?: string | null;
    }
    interface GroupDescriptionChanged {
        /** Group's old description. */
        oldDescription?: string | null;
        /** Group's new description. */
        newDescription?: string | null;
    }
    interface DeleteGroupRequest {
        /** ID of the group to delete. */
        groupId: string;
    }
    interface DeleteGroupResponse {
        /** Deleted group. */
        group?: Group;
    }
    interface GetGroupRequest {
        /** ID of the group to retrieve. */
        groupId: string;
        /** Content type. */
        contentType?: ContentType;
    }
    interface GetGroupResponse {
        /** Retrieved group. */
        group?: Group;
    }
    interface GetGroupBySlugRequest {
        /** Unique part of the group's URL. For example, if a group's URL is `https:/example.com/groups/{my-fitness-group}`, the slug is `my-fitness-group`. Case-sensitive. */
        slug: string;
        autoInviteId?: string | null;
        /** Content type. */
        contentType?: ContentType;
    }
    interface GetGroupBySlugResponse {
        /** Retrieved group. */
        group?: Group;
    }
    interface GetGroupIdBySlugRequest {
        /** Unique part of the group's URL, for example `group-1` in `https:/example.com/groups/group-1`. Pass only the slug. Case-sensitive. */
        slug: string;
        autoInviteId?: string | null;
    }
    interface GetGroupIdBySlugResponse {
        /** ID of the group that correspond to slug */
        groupId?: string;
        /** Global feed permissions */
        accessPermissions?: GlobalFeedPermissions;
    }
    interface GlobalFeedPermissions {
        feedPermissions?: FeedPermissions;
        ownFeedItemPermissions?: FeedItemPermissions;
        allFeedItemPermissions?: FeedItemPermissions;
        activityFeedItemPermissions?: FeedItemPermissions;
    }
    interface FeedPermissions {
        canViewPosts?: boolean;
        canCreatePosts?: boolean;
        canPinPosts?: boolean;
        canCreateTopic?: boolean;
        canFollowPosts?: boolean;
        canCreatePaidPosts?: boolean;
        canReadSettings?: boolean;
        canManageSettings?: boolean;
    }
    interface FeedItemPermissions {
        canViewFullPost?: boolean;
        canAssignTopic?: boolean;
        canUnassignTopic?: boolean;
        /** bool canFollow = 3; // it's not related to context token */
        canUpdate?: boolean;
        canDelete?: boolean;
        /** always true */
        canShare?: boolean;
        canAddComment?: boolean;
        canReact?: boolean;
        canPin?: boolean;
    }
    interface ListGroupsRequest {
        /** Number of items to load. Maximum `100`. */
        limit?: number | null;
        /** Number of items to skip in the current sort order. */
        offset?: number | null;
        /** Content type. */
        contentType?: ContentType;
    }
    interface ListGroupsResponse {
        /** Retrieved Groups. */
        groups?: Group[];
        /** Paging metadata. */
        metadata?: PagingMetadata$1;
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
    }
    interface ListGroupsByUserIdRequest {
        /** Content type. */
        contentType?: ContentType;
    }
    interface ListGroupsByUserIdResponse {
        groups?: GroupWithMsId[];
    }
    /** Retrieved Groups by metasite id */
    interface GroupWithMsId {
        metaSiteId?: string;
        groups?: Group[];
    }
    interface QueryGroupsRequest {
        /** Query options. */
        query?: Query$1;
        /** Content type. */
        contentType?: ContentType;
    }
    interface Query$1 {
        /**
         * Filter object in the following format:
         * `"filter" : {
         * "fieldName1": "value1",
         * "fieldName2":{"$operator":"value2"}
         * }`
         * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
         */
        filter?: any;
        /**
         * Sort object in the following format:
         * `[{"fieldName":"sortField1","order":"ASC"},{"fieldName":"sortField2","order":"DESC"}]`
         */
        sort?: Sorting$1[];
        /** Paging options to limit and skip the number of items. */
        paging?: Paging$1;
        /** Array of projected fields. A list of specific field names to return. If `fieldsets` are also specified, the union of `fieldsets` and `fields` is returned. */
        fields?: string[];
        /** Array of named, predefined sets of projected fields. A array of predefined named sets of fields to be returned. Specifying multiple `fieldsets` will return the union of fields from all sets. If `fields` are also specified, the union of `fieldsets` and `fields` is returned. */
        fieldsets?: string[];
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
    interface Paging$1 {
        /** Number of items to load. */
        limit?: number | null;
        /** Number of items to skip in the current sort order. */
        offset?: number | null;
    }
    interface QueryGroupsResponse {
        /** Retrieved groups. */
        groups?: Group[];
        /** Paging metadata. */
        metadata?: PagingMetadata$1;
    }
    interface QueryJoinedGroupsRequest {
        /** Query options. */
        query?: Query$1;
        /** Content type. */
        contentType?: ContentType;
    }
    interface QueryJoinedGroupsResponse {
        /** Retrieved groups. */
        groups?: Group[];
        /** Paging metadata. */
        metadata?: PagingMetadata$1;
    }
    interface QueryGroupsByMembershipRequest {
        /** Query options. */
        query?: Query$1;
        membershipStatus?: MembershipStatus;
        /** Filter groups by permissions. */
        permissionsFilter?: GroupPermissions;
        /** Content type. */
        contentType?: ContentType;
    }
    enum MembershipStatus {
        NONE = "NONE",
        JOINED = "JOINED",
        PENDING = "PENDING"
    }
    interface GroupPermissions {
        canCreatePosts?: boolean | null;
    }
    interface QueryGroupsByMembershipResponse {
        /** Retrieved groups. */
        groups?: Group[];
        /** Paging metadata. */
        metadata?: PagingMetadata$1;
    }
    interface ListGroupIntegrationsDataRequest {
        groupIds?: string[];
    }
    interface ListGroupIntegrationsDataResponse {
        groupsIntegrationsData?: GroupIntegrationsData[];
    }
    interface GroupIntegrationsData {
        groupId?: string;
        feedItemsCount?: number;
        topicIds?: string[];
        eventIds?: string[];
        connectedPricingPlanIds?: string[];
        onlineProgramIds?: string[];
    }
    interface GetGroupMembersGroupIdsRequest {
        /** ID of the group to retrieve members group ids. */
        groupId?: string;
    }
    interface GetGroupMembersGroupIdsResponse {
        /** All members group id */
        allMembersGroupId?: string;
        /** Admins members group id */
        adminMembersGroupId?: string;
    }
    interface GetGroupBMFeaturesRequest {
        /** ID of the group to retrieve BM features. */
        groupId: string;
    }
    interface GetGroupBMFeaturesResponse {
        level?: number;
        features?: BMFeatures;
    }
    interface BMFeatures {
        bmFeatures?: BMFeaturesBMFeatures[];
    }
    enum BMFeaturesBMFeatures {
        BM_FEATURES_UNKNOWN = "BM_FEATURES_UNKNOWN",
        BM_FEATURES_GENERATE_TOPICS = "BM_FEATURES_GENERATE_TOPICS",
        BM_FEATURES_GENERATE_QUESTIONS = "BM_FEATURES_GENERATE_QUESTIONS"
    }
    interface QueryJoinedGroupsWithMemberRequest {
        /** Query options. */
        query?: Query$1;
        /** ID of the member to find common groups with */
        memberId?: string;
        /** Content type. */
        contentType?: ContentType;
    }
    interface QueryJoinedGroupsWithMemberResponse {
        /** Retrieved groups. */
        groups?: Group[];
        /** Paging metadata. */
        metadata?: PagingMetadata$1;
    }
    interface GetPrivacyRequest {
        /** Group ids to list privacy for */
        groupIds?: string[];
    }
    interface GetPrivacyResponse {
        /** Privacy statuses listed per group id */
        privacyStatuses?: Record<string, PrivacyStatus>;
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
        /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
        restoreInfo?: RestoreInfo$1;
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
    }
    interface EntityDeletedEvent$1 {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
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
     * Creates a group.
     *
     * When a group is created, the newly created group is added to the [Groups List](https://support.wix.com/en/article/wix-groups-about-your-groups-pages#groups-group-list) page
     * of a site.
     *
     * Specify a `creatorId` to set the group's creator. The group's creator will automatically become a group admin, see Terminology ([REST](https://dev.wix.com/docs/rest/crm/community/groups/terminology) | [SDK](https://dev.wix.com/docs/sdk/backend-modules/groups/terminology)).
     *
     * Wix users determine who can create a group.
     * This setting can be found in [a site's Dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Fwix-groups/settings?) under **Groups > General Settings > Group Creation**.
     * If set to **members with approval**, site members can create a group with the Create Group method, and the group becomes a `createRequest` with a status of `PENDING`.
     * A Wix user either approves or rejects the request to create a group.
     * If set to **all site members**, site members can create a group with the Create Group method and no approval is required.
     * If set to **only admins**, only Wix users can create a group with the Create Group method.
     * Default is set to **members with approval**.
     * @param group - Group to create.
     * @public
     * @requiredField group
     * @param options - Optional fields for group creation.
     * @adminMethod
     * @returns Created group.
     * @fqn wix.social.groups.api.v2.GroupsService.CreateGroup
     */
    function createGroup(group: Group, options?: CreateGroupOptions): Promise<Group>;
    interface CreateGroupOptions {
        /** ID of the member who created the group, from the Members API. This member will automatically become an admin. */
        creatorId?: string | null;
        /** Content type. */
        contentType?: ContentType;
    }
    /**
     * Updates a group.
     *
     * When a public or private group's name is updated, the slug is updated to reflect the new group name.
     * Only group admins can update their group.
     *
     * > **Notes:**
     * > + When `group.privacyStatus` is updated from `PRIVATE` to `PUBLIC`, all pending group join requests are automatically approved.
     * > + When `group.privacyStatus` is updated from `PRIVATE` to `SECRET`, all pending group join requests are automatically rejected.
     * @param _id - Group ID.
     * @public
     * @requiredField _id
     * @requiredField group
     * @adminMethod
     * @returns Updated group.
     * @fqn wix.social.groups.api.v2.GroupsService.UpdateGroup
     */
    function updateGroup(_id: string | null, group: UpdateGroup, options?: UpdateGroupOptions): Promise<Group>;
    interface UpdateGroup {
        /**
         * Group ID.
         * @readonly
         */
        _id?: string | null;
        /** A unique part of a group's URL, for example `https:/example.com/groups/slug`. */
        slug?: string | null;
        /** Group privacy status. */
        privacyStatus?: PrivacyStatus;
        /** Group name. */
        name?: string | null;
        /** Group description in [DraftJS](https://draftjs.org) format. */
        description?: string | null;
        /** Group teaser. */
        teaser?: string | null;
        /** What group members are called, for example `Coworkers`, `Friends`, or `Students`. */
        memberTitle?: string | null;
        /** Cover image. You cannot upload your own cover image. */
        coverImage?: CoverImage;
        /**
         * Group specific settings.
         *
         * These settings can also be found in [a site's Dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Fwix-groups/settings?).
         */
        settings?: GroupSettings;
        /**
         * Total count of current group members.
         * @readonly
         */
        membersCount?: number | null;
        /**
         * Group owner.
         * @readonly
         */
        ownerId?: string | null;
        /**
         * Group creation date and time.
         * @readonly
         */
        _createdDate?: Date | null;
        /**
         * Date and time of the latest group update.
         * @readonly
         */
        _updatedDate?: Date | null;
        /**
         * Date and time of the most recent group activity, for example a post or comment.
         * @readonly
         */
        lastActivityDate?: Date | null;
    }
    interface UpdateGroupOptions {
        /** Content type. */
        contentType?: ContentType;
    }
    /**
     * Hides a group from the [Groups List](https://support.wix.com/en/article/wix-groups-about-your-groups-pages#groups-group-list) or cancels a group request.
     *
     * >**Notes:**
     * > + Only group admins can delete their group.
     * > + The group will no longer be visible in the live site or the dashboard.
     * > + It is not possible to restore a deleted group with the Update Group method.
     * > + It is still possible to retrieve the group with the Get Group, List Groups, and Query Groups methods.
     * @param groupId - ID of the group to delete.
     * @public
     * @requiredField groupId
     * @adminMethod
     * @fqn wix.social.groups.api.v2.GroupsService.DeleteGroup
     */
    function deleteGroup(groupId: string): Promise<DeleteGroupResponse>;
    /**
     * Retrieves a group.
     *
     * For groups with `group.privacyStatus` set to `SECRET`, only group admins and group members can see the group and its content.
     * @param groupId - ID of the group to retrieve.
     * @public
     * @requiredField groupId
     * @adminMethod
     * @returns Retrieved group.
     * @fqn wix.social.groups.api.v2.GroupsService.GetGroup
     */
    function getGroup(groupId: string, options?: GetGroupOptions): Promise<Group>;
    interface GetGroupOptions {
        /** Content type. */
        contentType?: ContentType;
    }
    /**
     * Retrieves a group by slug.
     *
     * The slug is the end of a group's URL that refers to a specific group.
     * For example, if a group's URL is `https:/example.com/groups/{my-fitness-group}`, the slug is `my-fitness-group`.
     * Slugs are case-sensitive. It is generally based on the group name, but for secret groups it is an autogenerated string of characters,
     * for example, `https:/example.com/groups/{5D3yTX}`.
     *
     * For groups with `group.privacyStatus` set to `SECRET`, only group admins and group members can see the group and its content.
     * @param slug - Unique part of the group's URL. For example, if a group's URL is `https:/example.com/groups/{my-fitness-group}`, the slug is `my-fitness-group`. Case-sensitive.
     * @public
     * @requiredField slug
     * @adminMethod
     * @fqn wix.social.groups.api.v2.GroupsService.GetGroupBySlug
     */
    function getGroupBySlug(slug: string, options?: GetGroupBySlugOptions): Promise<GetGroupBySlugResponse>;
    interface GetGroupBySlugOptions {
        autoInviteId?: string | null;
        /** Content type. */
        contentType?: ContentType;
    }
    interface GetGroupIdBySlugOptions {
        autoInviteId?: string | null;
    }
    /**
     * Retrieves up to 100 groups.
     *
     *
     * Default sorts by `_createdDate` in descending order. For `SECRET` groups, only group admins and group members can see a list of groups and their content.
     *
     * > **Note:** This function's parameters are positional, and must be specified in the sequence shown in the syntax below. When specifying a parameter, use `null` as a placeholder for any unspecified parameters. For example, to specify limit only, call `listGroups(paging, null)`.
     * @public
     * @param options - Limit and offset options.
     * @adminMethod
     * @fqn wix.social.groups.api.v2.GroupsService.ListGroups
     */
    function listGroups(options?: ListGroupsOptions): Promise<ListGroupsResponse>;
    interface ListGroupsOptions {
        /** Number of items to load. Maximum `100`. */
        limit?: number | null;
        /** Number of items to skip in the current sort order. */
        offset?: number | null;
        /** Content type. */
        contentType?: ContentType;
    }
    interface ListGroupsByUserIdOptions {
        /** Content type. */
        contentType?: ContentType;
    }
    /**
     * Retrieves up to 100 groups, given the provided paging, filtering, and sorting.
     *
     * Supported fields for filtering:
     * - `title`
     *
     * Supported fields for sorting:
     * - `title`
     * - `createdDate`
     * - `membersCount`
     * - `recentActivityDate`
     *
     * For groups with `group.privacyStatus` set to `SECRET`, only group admins and group members can see the group and its content.
     * @public
     * @adminMethod
     * @fqn wix.social.groups.api.v2.GroupsService.QueryGroups
     */
    function queryGroups(options?: QueryGroupsOptions): GroupsQueryBuilder;
    interface QueryGroupsOptions {
        /** Content type. */
        contentType?: ContentType | undefined;
    }
    interface QueryOffsetResult$1 {
        currentPage: number | undefined;
        totalPages: number | undefined;
        totalCount: number | undefined;
        hasNext: () => boolean;
        hasPrev: () => boolean;
        length: number;
        pageSize: number;
    }
    interface GroupsQueryResult extends QueryOffsetResult$1 {
        items: Group[];
        query: GroupsQueryBuilder;
        next: () => Promise<GroupsQueryResult>;
        prev: () => Promise<GroupsQueryResult>;
    }
    interface GroupsQueryBuilder {
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        eq: (propertyName: string, value: any) => GroupsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        ne: (propertyName: string, value: any) => GroupsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `string`.
         * @param string - String to compare against. Case-insensitive.
         */
        startsWith: (propertyName: string, value: string) => GroupsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `values`.
         * @param values - List of values to compare against.
         */
        hasSome: (propertyName: string, value: any[]) => GroupsQueryBuilder;
        in: (propertyName: string, value: any) => GroupsQueryBuilder;
        exists: (propertyName: string, value: boolean) => GroupsQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
        ascending: (...propertyNames: Array<"membersCount" | "_createdDate">) => GroupsQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
        descending: (...propertyNames: Array<"membersCount" | "_createdDate">) => GroupsQueryBuilder;
        /** @param limit - Number of items to return, which is also the `pageSize` of the results object. */
        limit: (limit: number) => GroupsQueryBuilder;
        /** @param skip - Number of items to skip in the query results before returning the results. */
        skip: (skip: number) => GroupsQueryBuilder;
        find: () => Promise<GroupsQueryResult>;
    }
    interface QueryJoinedGroupsOptions {
        /** Query options. */
        query?: Query$1;
        /** Content type. */
        contentType?: ContentType;
    }
    interface QueryGroupsByMembershipOptions {
        /** Query options. */
        query?: Query$1;
        membershipStatus?: MembershipStatus;
        /** Filter groups by permissions. */
        permissionsFilter?: GroupPermissions;
        /** Content type. */
        contentType?: ContentType;
    }
    interface ListGroupIntegrationsDataOptions {
        groupIds?: string[];
    }
    interface QueryJoinedGroupsWithMemberOptions {
        /** Query options. */
        query?: Query$1;
        /** ID of the member to find common groups with */
        memberId?: string;
        /** Content type. */
        contentType?: ContentType;
    }
    type socialGroupsV2GroupGroups_universal_d_Group = Group;
    type socialGroupsV2GroupGroups_universal_d_Type = Type;
    const socialGroupsV2GroupGroups_universal_d_Type: typeof Type;
    type socialGroupsV2GroupGroups_universal_d_Events = Events;
    type socialGroupsV2GroupGroups_universal_d_Logo = Logo;
    type socialGroupsV2GroupGroups_universal_d_GroupDetailsPosition = GroupDetailsPosition;
    type socialGroupsV2GroupGroups_universal_d_Image = Image;
    type socialGroupsV2GroupGroups_universal_d_Position = Position;
    type socialGroupsV2GroupGroups_universal_d_AllowPolicy = AllowPolicy;
    const socialGroupsV2GroupGroups_universal_d_AllowPolicy: typeof AllowPolicy;
    type socialGroupsV2GroupGroups_universal_d_OnboardingStepSettings = OnboardingStepSettings;
    type socialGroupsV2GroupGroups_universal_d_StepKey = StepKey;
    const socialGroupsV2GroupGroups_universal_d_StepKey: typeof StepKey;
    type socialGroupsV2GroupGroups_universal_d_PrivacyStatus = PrivacyStatus;
    const socialGroupsV2GroupGroups_universal_d_PrivacyStatus: typeof PrivacyStatus;
    type socialGroupsV2GroupGroups_universal_d_AccessRestriction = AccessRestriction;
    type socialGroupsV2GroupGroups_universal_d_AccessRestrictionDataOneOf = AccessRestrictionDataOneOf;
    type socialGroupsV2GroupGroups_universal_d_GroupDetails = GroupDetails;
    type socialGroupsV2GroupGroups_universal_d_CoverImage = CoverImage;
    type socialGroupsV2GroupGroups_universal_d_GroupSettings = GroupSettings;
    type socialGroupsV2GroupGroups_universal_d_Identity = Identity;
    type socialGroupsV2GroupGroups_universal_d_IdentityType = IdentityType;
    const socialGroupsV2GroupGroups_universal_d_IdentityType: typeof IdentityType;
    type socialGroupsV2GroupGroups_universal_d_CreateGroupRequest = CreateGroupRequest;
    type socialGroupsV2GroupGroups_universal_d_ContentType = ContentType;
    const socialGroupsV2GroupGroups_universal_d_ContentType: typeof ContentType;
    type socialGroupsV2GroupGroups_universal_d_CreateGroupResponse = CreateGroupResponse;
    type socialGroupsV2GroupGroups_universal_d_UpdateGroupRequest = UpdateGroupRequest;
    type socialGroupsV2GroupGroups_universal_d_UpdateGroupResponse = UpdateGroupResponse;
    type socialGroupsV2GroupGroups_universal_d_GroupCoverChanged = GroupCoverChanged;
    type socialGroupsV2GroupGroups_universal_d_GroupDescriptionChanged = GroupDescriptionChanged;
    type socialGroupsV2GroupGroups_universal_d_DeleteGroupRequest = DeleteGroupRequest;
    type socialGroupsV2GroupGroups_universal_d_DeleteGroupResponse = DeleteGroupResponse;
    type socialGroupsV2GroupGroups_universal_d_GetGroupRequest = GetGroupRequest;
    type socialGroupsV2GroupGroups_universal_d_GetGroupResponse = GetGroupResponse;
    type socialGroupsV2GroupGroups_universal_d_GetGroupBySlugRequest = GetGroupBySlugRequest;
    type socialGroupsV2GroupGroups_universal_d_GetGroupBySlugResponse = GetGroupBySlugResponse;
    type socialGroupsV2GroupGroups_universal_d_GetGroupIdBySlugRequest = GetGroupIdBySlugRequest;
    type socialGroupsV2GroupGroups_universal_d_GetGroupIdBySlugResponse = GetGroupIdBySlugResponse;
    type socialGroupsV2GroupGroups_universal_d_GlobalFeedPermissions = GlobalFeedPermissions;
    type socialGroupsV2GroupGroups_universal_d_FeedPermissions = FeedPermissions;
    type socialGroupsV2GroupGroups_universal_d_FeedItemPermissions = FeedItemPermissions;
    type socialGroupsV2GroupGroups_universal_d_ListGroupsRequest = ListGroupsRequest;
    type socialGroupsV2GroupGroups_universal_d_ListGroupsResponse = ListGroupsResponse;
    type socialGroupsV2GroupGroups_universal_d_ListGroupsByUserIdRequest = ListGroupsByUserIdRequest;
    type socialGroupsV2GroupGroups_universal_d_ListGroupsByUserIdResponse = ListGroupsByUserIdResponse;
    type socialGroupsV2GroupGroups_universal_d_GroupWithMsId = GroupWithMsId;
    type socialGroupsV2GroupGroups_universal_d_QueryGroupsRequest = QueryGroupsRequest;
    type socialGroupsV2GroupGroups_universal_d_QueryGroupsResponse = QueryGroupsResponse;
    type socialGroupsV2GroupGroups_universal_d_QueryJoinedGroupsRequest = QueryJoinedGroupsRequest;
    type socialGroupsV2GroupGroups_universal_d_QueryJoinedGroupsResponse = QueryJoinedGroupsResponse;
    type socialGroupsV2GroupGroups_universal_d_QueryGroupsByMembershipRequest = QueryGroupsByMembershipRequest;
    type socialGroupsV2GroupGroups_universal_d_MembershipStatus = MembershipStatus;
    const socialGroupsV2GroupGroups_universal_d_MembershipStatus: typeof MembershipStatus;
    type socialGroupsV2GroupGroups_universal_d_GroupPermissions = GroupPermissions;
    type socialGroupsV2GroupGroups_universal_d_QueryGroupsByMembershipResponse = QueryGroupsByMembershipResponse;
    type socialGroupsV2GroupGroups_universal_d_ListGroupIntegrationsDataRequest = ListGroupIntegrationsDataRequest;
    type socialGroupsV2GroupGroups_universal_d_ListGroupIntegrationsDataResponse = ListGroupIntegrationsDataResponse;
    type socialGroupsV2GroupGroups_universal_d_GroupIntegrationsData = GroupIntegrationsData;
    type socialGroupsV2GroupGroups_universal_d_GetGroupMembersGroupIdsRequest = GetGroupMembersGroupIdsRequest;
    type socialGroupsV2GroupGroups_universal_d_GetGroupMembersGroupIdsResponse = GetGroupMembersGroupIdsResponse;
    type socialGroupsV2GroupGroups_universal_d_GetGroupBMFeaturesRequest = GetGroupBMFeaturesRequest;
    type socialGroupsV2GroupGroups_universal_d_GetGroupBMFeaturesResponse = GetGroupBMFeaturesResponse;
    type socialGroupsV2GroupGroups_universal_d_BMFeatures = BMFeatures;
    type socialGroupsV2GroupGroups_universal_d_BMFeaturesBMFeatures = BMFeaturesBMFeatures;
    const socialGroupsV2GroupGroups_universal_d_BMFeaturesBMFeatures: typeof BMFeaturesBMFeatures;
    type socialGroupsV2GroupGroups_universal_d_QueryJoinedGroupsWithMemberRequest = QueryJoinedGroupsWithMemberRequest;
    type socialGroupsV2GroupGroups_universal_d_QueryJoinedGroupsWithMemberResponse = QueryJoinedGroupsWithMemberResponse;
    type socialGroupsV2GroupGroups_universal_d_GetPrivacyRequest = GetPrivacyRequest;
    type socialGroupsV2GroupGroups_universal_d_GetPrivacyResponse = GetPrivacyResponse;
    const socialGroupsV2GroupGroups_universal_d_createGroup: typeof createGroup;
    type socialGroupsV2GroupGroups_universal_d_CreateGroupOptions = CreateGroupOptions;
    const socialGroupsV2GroupGroups_universal_d_updateGroup: typeof updateGroup;
    type socialGroupsV2GroupGroups_universal_d_UpdateGroup = UpdateGroup;
    type socialGroupsV2GroupGroups_universal_d_UpdateGroupOptions = UpdateGroupOptions;
    const socialGroupsV2GroupGroups_universal_d_deleteGroup: typeof deleteGroup;
    const socialGroupsV2GroupGroups_universal_d_getGroup: typeof getGroup;
    type socialGroupsV2GroupGroups_universal_d_GetGroupOptions = GetGroupOptions;
    const socialGroupsV2GroupGroups_universal_d_getGroupBySlug: typeof getGroupBySlug;
    type socialGroupsV2GroupGroups_universal_d_GetGroupBySlugOptions = GetGroupBySlugOptions;
    type socialGroupsV2GroupGroups_universal_d_GetGroupIdBySlugOptions = GetGroupIdBySlugOptions;
    const socialGroupsV2GroupGroups_universal_d_listGroups: typeof listGroups;
    type socialGroupsV2GroupGroups_universal_d_ListGroupsOptions = ListGroupsOptions;
    type socialGroupsV2GroupGroups_universal_d_ListGroupsByUserIdOptions = ListGroupsByUserIdOptions;
    const socialGroupsV2GroupGroups_universal_d_queryGroups: typeof queryGroups;
    type socialGroupsV2GroupGroups_universal_d_QueryGroupsOptions = QueryGroupsOptions;
    type socialGroupsV2GroupGroups_universal_d_GroupsQueryResult = GroupsQueryResult;
    type socialGroupsV2GroupGroups_universal_d_GroupsQueryBuilder = GroupsQueryBuilder;
    type socialGroupsV2GroupGroups_universal_d_QueryJoinedGroupsOptions = QueryJoinedGroupsOptions;
    type socialGroupsV2GroupGroups_universal_d_QueryGroupsByMembershipOptions = QueryGroupsByMembershipOptions;
    type socialGroupsV2GroupGroups_universal_d_ListGroupIntegrationsDataOptions = ListGroupIntegrationsDataOptions;
    type socialGroupsV2GroupGroups_universal_d_QueryJoinedGroupsWithMemberOptions = QueryJoinedGroupsWithMemberOptions;
    namespace socialGroupsV2GroupGroups_universal_d {
        export { socialGroupsV2GroupGroups_universal_d_Group as Group, socialGroupsV2GroupGroups_universal_d_Type as Type, socialGroupsV2GroupGroups_universal_d_Events as Events, socialGroupsV2GroupGroups_universal_d_Logo as Logo, socialGroupsV2GroupGroups_universal_d_GroupDetailsPosition as GroupDetailsPosition, socialGroupsV2GroupGroups_universal_d_Image as Image, socialGroupsV2GroupGroups_universal_d_Position as Position, socialGroupsV2GroupGroups_universal_d_AllowPolicy as AllowPolicy, socialGroupsV2GroupGroups_universal_d_OnboardingStepSettings as OnboardingStepSettings, socialGroupsV2GroupGroups_universal_d_StepKey as StepKey, socialGroupsV2GroupGroups_universal_d_PrivacyStatus as PrivacyStatus, socialGroupsV2GroupGroups_universal_d_AccessRestriction as AccessRestriction, socialGroupsV2GroupGroups_universal_d_AccessRestrictionDataOneOf as AccessRestrictionDataOneOf, socialGroupsV2GroupGroups_universal_d_GroupDetails as GroupDetails, socialGroupsV2GroupGroups_universal_d_CoverImage as CoverImage, socialGroupsV2GroupGroups_universal_d_GroupSettings as GroupSettings, socialGroupsV2GroupGroups_universal_d_Identity as Identity, socialGroupsV2GroupGroups_universal_d_IdentityType as IdentityType, socialGroupsV2GroupGroups_universal_d_CreateGroupRequest as CreateGroupRequest, socialGroupsV2GroupGroups_universal_d_ContentType as ContentType, socialGroupsV2GroupGroups_universal_d_CreateGroupResponse as CreateGroupResponse, socialGroupsV2GroupGroups_universal_d_UpdateGroupRequest as UpdateGroupRequest, socialGroupsV2GroupGroups_universal_d_UpdateGroupResponse as UpdateGroupResponse, socialGroupsV2GroupGroups_universal_d_GroupCoverChanged as GroupCoverChanged, socialGroupsV2GroupGroups_universal_d_GroupDescriptionChanged as GroupDescriptionChanged, socialGroupsV2GroupGroups_universal_d_DeleteGroupRequest as DeleteGroupRequest, socialGroupsV2GroupGroups_universal_d_DeleteGroupResponse as DeleteGroupResponse, socialGroupsV2GroupGroups_universal_d_GetGroupRequest as GetGroupRequest, socialGroupsV2GroupGroups_universal_d_GetGroupResponse as GetGroupResponse, socialGroupsV2GroupGroups_universal_d_GetGroupBySlugRequest as GetGroupBySlugRequest, socialGroupsV2GroupGroups_universal_d_GetGroupBySlugResponse as GetGroupBySlugResponse, socialGroupsV2GroupGroups_universal_d_GetGroupIdBySlugRequest as GetGroupIdBySlugRequest, socialGroupsV2GroupGroups_universal_d_GetGroupIdBySlugResponse as GetGroupIdBySlugResponse, socialGroupsV2GroupGroups_universal_d_GlobalFeedPermissions as GlobalFeedPermissions, socialGroupsV2GroupGroups_universal_d_FeedPermissions as FeedPermissions, socialGroupsV2GroupGroups_universal_d_FeedItemPermissions as FeedItemPermissions, socialGroupsV2GroupGroups_universal_d_ListGroupsRequest as ListGroupsRequest, socialGroupsV2GroupGroups_universal_d_ListGroupsResponse as ListGroupsResponse, PagingMetadata$1 as PagingMetadata, socialGroupsV2GroupGroups_universal_d_ListGroupsByUserIdRequest as ListGroupsByUserIdRequest, socialGroupsV2GroupGroups_universal_d_ListGroupsByUserIdResponse as ListGroupsByUserIdResponse, socialGroupsV2GroupGroups_universal_d_GroupWithMsId as GroupWithMsId, socialGroupsV2GroupGroups_universal_d_QueryGroupsRequest as QueryGroupsRequest, Query$1 as Query, Sorting$1 as Sorting, SortOrder$1 as SortOrder, Paging$1 as Paging, socialGroupsV2GroupGroups_universal_d_QueryGroupsResponse as QueryGroupsResponse, socialGroupsV2GroupGroups_universal_d_QueryJoinedGroupsRequest as QueryJoinedGroupsRequest, socialGroupsV2GroupGroups_universal_d_QueryJoinedGroupsResponse as QueryJoinedGroupsResponse, socialGroupsV2GroupGroups_universal_d_QueryGroupsByMembershipRequest as QueryGroupsByMembershipRequest, socialGroupsV2GroupGroups_universal_d_MembershipStatus as MembershipStatus, socialGroupsV2GroupGroups_universal_d_GroupPermissions as GroupPermissions, socialGroupsV2GroupGroups_universal_d_QueryGroupsByMembershipResponse as QueryGroupsByMembershipResponse, socialGroupsV2GroupGroups_universal_d_ListGroupIntegrationsDataRequest as ListGroupIntegrationsDataRequest, socialGroupsV2GroupGroups_universal_d_ListGroupIntegrationsDataResponse as ListGroupIntegrationsDataResponse, socialGroupsV2GroupGroups_universal_d_GroupIntegrationsData as GroupIntegrationsData, socialGroupsV2GroupGroups_universal_d_GetGroupMembersGroupIdsRequest as GetGroupMembersGroupIdsRequest, socialGroupsV2GroupGroups_universal_d_GetGroupMembersGroupIdsResponse as GetGroupMembersGroupIdsResponse, socialGroupsV2GroupGroups_universal_d_GetGroupBMFeaturesRequest as GetGroupBMFeaturesRequest, socialGroupsV2GroupGroups_universal_d_GetGroupBMFeaturesResponse as GetGroupBMFeaturesResponse, socialGroupsV2GroupGroups_universal_d_BMFeatures as BMFeatures, socialGroupsV2GroupGroups_universal_d_BMFeaturesBMFeatures as BMFeaturesBMFeatures, socialGroupsV2GroupGroups_universal_d_QueryJoinedGroupsWithMemberRequest as QueryJoinedGroupsWithMemberRequest, socialGroupsV2GroupGroups_universal_d_QueryJoinedGroupsWithMemberResponse as QueryJoinedGroupsWithMemberResponse, socialGroupsV2GroupGroups_universal_d_GetPrivacyRequest as GetPrivacyRequest, socialGroupsV2GroupGroups_universal_d_GetPrivacyResponse as GetPrivacyResponse, DomainEvent$1 as DomainEvent, DomainEventBodyOneOf$1 as DomainEventBodyOneOf, EntityCreatedEvent$1 as EntityCreatedEvent, RestoreInfo$1 as RestoreInfo, EntityUpdatedEvent$1 as EntityUpdatedEvent, EntityDeletedEvent$1 as EntityDeletedEvent, ActionEvent$1 as ActionEvent, MessageEnvelope$1 as MessageEnvelope, IdentificationData$1 as IdentificationData, IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf, WebhookIdentityType$1 as WebhookIdentityType, socialGroupsV2GroupGroups_universal_d_createGroup as createGroup, socialGroupsV2GroupGroups_universal_d_CreateGroupOptions as CreateGroupOptions, socialGroupsV2GroupGroups_universal_d_updateGroup as updateGroup, socialGroupsV2GroupGroups_universal_d_UpdateGroup as UpdateGroup, socialGroupsV2GroupGroups_universal_d_UpdateGroupOptions as UpdateGroupOptions, socialGroupsV2GroupGroups_universal_d_deleteGroup as deleteGroup, socialGroupsV2GroupGroups_universal_d_getGroup as getGroup, socialGroupsV2GroupGroups_universal_d_GetGroupOptions as GetGroupOptions, socialGroupsV2GroupGroups_universal_d_getGroupBySlug as getGroupBySlug, socialGroupsV2GroupGroups_universal_d_GetGroupBySlugOptions as GetGroupBySlugOptions, socialGroupsV2GroupGroups_universal_d_GetGroupIdBySlugOptions as GetGroupIdBySlugOptions, socialGroupsV2GroupGroups_universal_d_listGroups as listGroups, socialGroupsV2GroupGroups_universal_d_ListGroupsOptions as ListGroupsOptions, socialGroupsV2GroupGroups_universal_d_ListGroupsByUserIdOptions as ListGroupsByUserIdOptions, socialGroupsV2GroupGroups_universal_d_queryGroups as queryGroups, socialGroupsV2GroupGroups_universal_d_QueryGroupsOptions as QueryGroupsOptions, socialGroupsV2GroupGroups_universal_d_GroupsQueryResult as GroupsQueryResult, socialGroupsV2GroupGroups_universal_d_GroupsQueryBuilder as GroupsQueryBuilder, socialGroupsV2GroupGroups_universal_d_QueryJoinedGroupsOptions as QueryJoinedGroupsOptions, socialGroupsV2GroupGroups_universal_d_QueryGroupsByMembershipOptions as QueryGroupsByMembershipOptions, socialGroupsV2GroupGroups_universal_d_ListGroupIntegrationsDataOptions as ListGroupIntegrationsDataOptions, socialGroupsV2GroupGroups_universal_d_QueryJoinedGroupsWithMemberOptions as QueryJoinedGroupsWithMemberOptions, };
    }
    /**
     * To join a private group, a site member must submit a Join Request, which can be approved or rejected by an admin.
     * When the request is approved, the site member becomes a group member.
     */
    interface JoinGroupRequest {
        /**
         * Site member ID of the requester.
         * @readonly
         */
        siteMemberId?: string;
        /** @readonly */
        contactId?: string;
        /**
         * Status of the request to join a group.
         *
         * One of:
         * - `"PENDING"`
         * - `"APPROVED"`
         * - `"REJECTED"`
         */
        status?: RequestStatus;
        /** Join group request details. */
        requestDetails?: RequestDetails;
    }
    enum RequestStatus {
        UNKNOWN_STATUS = "UNKNOWN_STATUS",
        /** Pending request. */
        PENDING = "PENDING",
        /** Approved request. */
        APPROVED = "APPROVED",
        /** Rejected request. */
        REJECTED = "REJECTED",
        /** Cancelled request. */
        CANCELLED = "CANCELLED",
        /** Canceled request. */
        CANCELED = "CANCELED"
    }
    interface RequestDetails {
        /** Reason the request to join a group was rejected. */
        rejectionReason?: string | null;
    }
    interface SocialGroupsEvent extends SocialGroupsEventPayloadOneOf {
        memberJoined?: MemberJoinedGroup;
        membersAdded?: MembersAddedToGroup;
        joinRequestsApproved?: JoinRequestsApproved;
        membersInvited?: MembersInvitedToGroup;
    }
    /** @oneof */
    interface SocialGroupsEventPayloadOneOf {
        memberJoined?: MemberJoinedGroup;
        membersAdded?: MembersAddedToGroup;
        joinRequestsApproved?: JoinRequestsApproved;
        membersInvited?: MembersInvitedToGroup;
    }
    interface MemberJoinedGroup {
        groupId?: string;
        groupsInstanceId?: string;
        siteMemberId?: string;
    }
    interface MembersAddedToGroup {
        groupId?: string;
        groupsInstanceId?: string;
        whoAddedId?: string | null;
        siteMemberIds?: string[];
        /** Used for Apes sticky experiment */
        operationId?: string;
    }
    interface JoinRequestsApproved {
        groupId?: string;
        groupsInstanceId?: string;
        siteMemberIds?: string[];
        /** Used for Apes sticky experiment */
        operationId?: string;
    }
    interface MembersInvitedToGroup {
        groupId?: string;
        groupsInstanceId?: string;
        siteMemberIds?: string[];
    }
    interface GetJoinRequirementsRequest {
        /** ID of the group requested to join. */
        groupId: string;
        /** Answers to membership questions. They can be empty, but submit join group request will fail if an answer to a required question is omitted. */
        membershipQuestionAnswers?: MembershipQuestionAnswer[];
        autoInviteId?: string | null;
    }
    /** Answer to a membership question. */
    interface MembershipQuestionAnswer {
        /** Question ID. */
        _id?: string;
        /** Answer text. */
        text?: string | null;
    }
    interface GetJoinRequirementsResponse {
        violation?: Violation;
    }
    interface PaidPlan {
        planId?: string;
        name?: string;
        startsAt?: Date;
    }
    enum ViolationType {
        NONE = "NONE",
        NOT_LOGGED_IN = "NOT_LOGGED_IN",
        ALREADY_JOINED = "ALREADY_JOINED",
        SECRET_GROUP = "SECRET_GROUP",
        EVENTS = "EVENTS",
        PRICING_PlANS = "PRICING_PlANS",
        MEMBERSHIP_QUESTIONS = "MEMBERSHIP_QUESTIONS",
        ADMIN_APPROVAL = "ADMIN_APPROVAL"
    }
    interface EventsViolationOptions {
        /** Events which allow user to join the group. */
        eventIds?: string[];
    }
    interface PricingPlanViolationOptions {
        installed?: boolean;
        /** Plan ids which allow user to join the group. */
        requiredPlans?: PaidPlan[];
        /** Plan ids which user have, but they don't allow to join group right now, because they start some time in the future. */
        futurePlans?: PaidPlan[];
    }
    interface MembershipQuestionViolationOptions {
        requiredQuestionIds?: string[];
    }
    interface Violation extends ViolationViolationOptionsOneOf {
        eventsOptions?: EventsViolationOptions;
        pricingPlansOptions?: PricingPlanViolationOptions;
        membershipQuestionsOptions?: MembershipQuestionViolationOptions;
        violationType?: ViolationType;
    }
    /** @oneof */
    interface ViolationViolationOptionsOneOf {
        eventsOptions?: EventsViolationOptions;
        pricingPlansOptions?: PricingPlanViolationOptions;
        membershipQuestionsOptions?: MembershipQuestionViolationOptions;
    }
    interface SubmitJoinGroupRequestRequest {
        /** ID of the group requested to join. */
        groupId: string;
        /** Answers to membership questions. They can be empty, but submit join group request will fail if an answer to a required question is omitted. */
        membershipQuestionAnswers?: MembershipQuestionAnswer[];
    }
    interface SubmitJoinGroupRequestResponse {
        /** Submitted join group request. */
        joinGroupRequest?: JoinGroupRequest;
    }
    interface CancelJoinGroupRequestRequest {
        /** ID of the group requested to join. */
        groupId: string;
    }
    interface CancelJoinGroupRequestResponse {
        /** Cancelled join group request. */
        joinGroupRequest?: JoinGroupRequest;
    }
    interface JoinGroupRequestCancelled {
        /** Group ID for which join request was cancelled. */
        groupId?: string;
        /** Cancelled join group request. */
        joinGroupRequest?: JoinGroupRequest;
    }
    interface ApproveJoinGroupRequestsRequest {
        /** ID of the group requested to join. */
        groupId: string;
        /**
         * @Internal
         * @Internal
         * @deprecated
         */
        siteMemberIds?: string[];
        /** IDs of the site members to approve. */
        memberIds?: string[];
    }
    enum ItemsToUpdate {
        /** Take into account only items which are listed in request. */
        BY_ID = "BY_ID",
        /** Update all items. */
        ALL_ITEMS = "ALL_ITEMS"
    }
    interface ApproveJoinGroupRequestsResponse {
        /** Approved join group requests. */
        joinGroupRequests?: JoinGroupRequest[];
    }
    interface JoinGroupRequestApproved {
        /** Group ID for which join request was approved. */
        groupId?: string;
        /** Approved join group request. */
        joinGroupRequest?: JoinGroupRequest;
    }
    interface RejectJoinGroupRequestsRequest {
        /** ID of the group requested to join. */
        groupId: string;
        /** Rejection data. */
        rejections?: Rejection[];
    }
    interface Rejection {
        /** Member ID to reject. */
        memberId?: string;
        /** Reason the request to join a group was rejected. Text written by the request reviewer that is displayed when the group is rejected (max 1,000 characters). */
        reason?: string | null;
    }
    interface RejectJoinGroupRequestsResponse {
        /** Rejected join group requests. */
        joinGroupRequests?: JoinGroupRequest[];
    }
    interface JoinGroupRequestRejected {
        /** Group ID for which join request was rejected. */
        groupId?: string;
        /** Rejected join group request. */
        joinGroupRequest?: JoinGroupRequest;
    }
    interface ListJoinGroupRequestsRequest {
        /** ID of the group requested to join. */
        groupId: string;
        limit?: number | null;
        offset?: number | null;
    }
    enum OwnershipFilter {
        /** All items. */
        ALL = "ALL",
        /** Items for current site member. */
        CURRENT_MEMBER = "CURRENT_MEMBER"
    }
    interface ListJoinGroupRequestsResponse {
        /** Join group requests. */
        joinGroupRequests?: JoinGroupRequest[];
        metadata?: PagingMetadata;
    }
    interface PagingMetadata {
        /** Number of items in the current results page. */
        count?: number | null;
        /** Offset that was requested. */
        offset?: number | null;
        /** Total number of items that match the query. */
        total?: number | null;
        /** Flag that indicates the server failed to calculate the `total` field. */
        tooManyToCount?: boolean | null;
    }
    interface QueryJoinGroupRequestsRequest {
        /** ID of the group requested to join. */
        groupId: string;
        query?: Query;
    }
    interface Query {
        /**
         * Filter object in the following format:
         * `"filter" : {
         * "fieldName1": "value1",
         * "fieldName2":{"$operator":"value2"}
         * }`
         * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
         */
        filter?: any;
        /**
         * Sort object in the following format:
         * `[{"fieldName":"sortField1","order":"ASC"},{"fieldName":"sortField2","order":"DESC"}]`
         */
        sort?: Sorting[];
        /** Paging options to limit and skip the number of items. */
        paging?: Paging;
        /** Array of projected fields. A list of specific field names to return. If `fieldsets` are also specified, the union of `fieldsets` and `fields` is returned. */
        fields?: string[];
        /** Array of named, predefined sets of projected fields. A array of predefined named sets of fields to be returned. Specifying multiple `fieldsets` will return the union of fields from all sets. If `fields` are also specified, the union of `fieldsets` and `fields` is returned. */
        fieldsets?: string[];
    }
    interface Sorting {
        /** Name of the field to sort by. */
        fieldName?: string;
        /** Sort order. */
        order?: SortOrder;
    }
    enum SortOrder {
        ASC = "ASC",
        DESC = "DESC"
    }
    interface Paging {
        /** Number of items to load. */
        limit?: number | null;
        /** Number of items to skip in the current sort order. */
        offset?: number | null;
    }
    interface QueryJoinGroupRequestsResponse {
        /** Requests to join a group. */
        joinGroupRequests?: JoinGroupRequest[];
        metadata?: PagingMetadata;
    }
    interface RejectAllJoinGroupRequestsRequest {
    }
    interface RejectAllJoinGroupRequestsResponse {
        /** Rejected join group requests. */
        joinGroupRequests?: JoinGroupRequest[];
    }
    interface ApproveAllJoinGroupRequestsRequest {
    }
    interface ApproveAllJoinGroupRequestsResponse {
        /** Rejected join group requests. */
        joinGroupRequests?: JoinGroupRequest[];
    }
    interface ListAllJoinGroupRequestsRequest {
        query?: Query;
    }
    interface ListAllJoinGroupRequestsResponse {
        /** Join group requests. */
        joinGroupRequests?: JoinGroupRequest[];
        metadata?: PagingMetadata;
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
        /** Event timestamp. */
        eventTime?: Date;
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
        /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
        restoreInfo?: RestoreInfo;
    }
    interface RestoreInfo {
        deletedDate?: Date;
    }
    interface EntityUpdatedEvent {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
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
    interface GetJoinRequirementsOptions {
        /** Answers to membership questions. They can be empty, but submit join group request will fail if an answer to a required question is omitted. */
        membershipQuestionAnswers?: MembershipQuestionAnswer[];
        autoInviteId?: string | null;
    }
    interface SubmitJoinGroupRequestOptions {
        /** Answers to membership questions. They can be empty, but submit join group request will fail if an answer to a required question is omitted. */
        membershipQuestionAnswers?: MembershipQuestionAnswer[];
    }
    /**
     * Approves requests to join a group.
     *
     * > **Note:** This function is only relevant for private groups.
     *
     * The `approvejoinGroupRequests()` function returns a Promise that resolves when a site member's request to join a group is approved.
     * Only site admins and group admins can approve site member requests to join a group, unless the group setting, `membersCanApprove` is set to `true`.
     *
     * <!--
     * > **Note:** If the `suppressAuth` option is set to `true`, all permissions are overwritten, and all site members (including non-group members) can approve site member requests to join a group.
     * -->
     * @param memberIds - IDs of the site members to approve.
     * @public
     * @requiredField groupId
     * @requiredField memberIds
     * @param groupId - ID of the group requested to join.
     * @adminMethod
     */
    function approveJoinGroupRequests(groupId: string, memberIds: string[], options?: ApproveJoinGroupRequestsOptions): Promise<ApproveJoinGroupRequestsResponse>;
    interface ApproveJoinGroupRequestsOptions {
        /**
         * @Internal
         * @Internal
         * @deprecated
         */
        siteMemberIds?: string[];
    }
    /**
     * Rejects requests to join a group.
     *
     * > **Note:**  This function is only relevant for private groups.
     *
     * The `rejectjoinGroupRequests()` function returns a Promise that resolves when the site member's request to join a group is rejected.
     * Only site admins or group admins can reject site member requests to join the group, unless the group setting, `membersCanApprove` is set to `true`.
     *
     * <!--
     * > **Note:** If the `suppressAuth` option is set to `true`, all permissions are overwritten, and all site members (including non-group members) can reject site member requests to join a group.
     * -->
     *
     * @param rejections - Rejection data.
     * @public
     * @requiredField groupId
     * @requiredField rejections
     * @param groupId - ID of the group requested to join.
     * @adminMethod
     */
    function rejectJoinGroupRequests(groupId: string, rejections: Rejection[], options?: RejectJoinGroupRequestsOptions): Promise<RejectJoinGroupRequestsResponse>;
    interface RejectJoinGroupRequestsOptions {
    }
    /**
     * Lists requests to join a group.
     *
     * > **Note:** This function is only relevant for private groups.
     *
     * The `listjoinGroupRequests()` function returns a Promise that resolves to a list of up to 100 requests to join a group. Sorts by default to `_createdDate` in descending order.
     * Only site admins and group admins can see requests to join their group. Site members can access their own join requests in their site.
     *
     * > **Notes:**
     * <!-- > + If the `suppressAuth` option is set to `true`, all permissions are overwritten, and all site members (including non-group members) can see requests to join a group. -->
     * @public
     * @requiredField groupId
     * @param groupId - ID of the group requested to join.
     * @adminMethod
     */
    function listJoinGroupRequests(groupId: string, options?: ListJoinGroupRequestsOptions): Promise<ListJoinGroupRequestsResponse>;
    interface ListJoinGroupRequestsOptions {
        limit?: number | null;
        offset?: number | null;
    }
    /**
     * Creates a query to retrieve a list of join requests.
     *
     * > **Notes:**
     * > + This function is only relevant for private groups.
     * > + For `SECRET` groups, only site admins and group admins can query requests to join their group. <!-- However, if the `suppressAuth` option is set to `true`, all permissions are overwritten, and all site members (including non-group members) can query requests to join a group. -->
     *
     * The `queryjoinGroupRequests()` function builds a query to retrieve a list of all requests to join a group, and returns a `JoinGroupRequestsQueryBuilder` object.
     *
     * The returned object contains the query definition which is typically used to run the query using the [`find()`](/join-group-requests-query-builder/find) function.
     *
     * You can refine the query by chaining `joinGroupRequestsQueryBuilder` functions onto the query. `joinGroupRequestsQueryBuilder` functions enable you to sort, filter, and control the results that `queryjoinGroupRequests()` returns.
     *
     * The results of the `queryjoinGroupRequests()` function are sorted by `_createdDate` in descending order.
     *
     * `queryjoinGroupRequests()` runs with this `joinGroupRequestsQueryBuilder` default, which you can override:
     * + [`limit(100)`](/join-group-requests-query-builder/limit)
     *
     * The following `joinGroupRequestsQueryBuilder` functions are supported for `queryjoinGroupRequests()`. For a full description of the joinGroupRequests object, see the object returned for the [`items`](/join-group-requests-query-result/items) property in `JoinGroupRequestsQueryResult`.
     *
     * @public
     * @requiredField groupId
     * @param groupId - Group ID.
     * @adminMethod
     */
    function queryJoinGroupRequests(groupId: string, options?: QueryJoinGroupRequestsOptions): JoinGroupRequestsQueryBuilder;
    interface QueryJoinGroupRequestsOptions {
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
    interface JoinGroupRequestsQueryResult extends QueryOffsetResult {
        items: JoinGroupRequest[];
        query: JoinGroupRequestsQueryBuilder;
        next: () => Promise<JoinGroupRequestsQueryResult>;
        prev: () => Promise<JoinGroupRequestsQueryResult>;
    }
    interface JoinGroupRequestsQueryBuilder {
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        eq: (propertyName: "status", value: any) => JoinGroupRequestsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        ne: (propertyName: "status", value: any) => JoinGroupRequestsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `values`.
         * @param values - List of values to compare against.
         */
        hasSome: (propertyName: "status", value: any[]) => JoinGroupRequestsQueryBuilder;
        in: (propertyName: "status", value: any) => JoinGroupRequestsQueryBuilder;
        exists: (propertyName: "status", value: boolean) => JoinGroupRequestsQueryBuilder;
        /** @param limit - Number of items to return, which is also the `pageSize` of the results object. */
        limit: (limit: number) => JoinGroupRequestsQueryBuilder;
        /** @param skip - Number of items to skip in the query results before returning the results. */
        skip: (skip: number) => JoinGroupRequestsQueryBuilder;
        find: () => Promise<JoinGroupRequestsQueryResult>;
    }
    interface ListAllJoinGroupRequestsOptions {
        query?: Query;
    }
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_JoinGroupRequest = JoinGroupRequest;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_RequestStatus = RequestStatus;
    const socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_RequestStatus: typeof RequestStatus;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_RequestDetails = RequestDetails;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_SocialGroupsEvent = SocialGroupsEvent;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_SocialGroupsEventPayloadOneOf = SocialGroupsEventPayloadOneOf;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_MemberJoinedGroup = MemberJoinedGroup;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_MembersAddedToGroup = MembersAddedToGroup;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_JoinRequestsApproved = JoinRequestsApproved;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_MembersInvitedToGroup = MembersInvitedToGroup;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_GetJoinRequirementsRequest = GetJoinRequirementsRequest;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_MembershipQuestionAnswer = MembershipQuestionAnswer;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_GetJoinRequirementsResponse = GetJoinRequirementsResponse;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_PaidPlan = PaidPlan;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ViolationType = ViolationType;
    const socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ViolationType: typeof ViolationType;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_EventsViolationOptions = EventsViolationOptions;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_PricingPlanViolationOptions = PricingPlanViolationOptions;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_MembershipQuestionViolationOptions = MembershipQuestionViolationOptions;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_Violation = Violation;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ViolationViolationOptionsOneOf = ViolationViolationOptionsOneOf;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_SubmitJoinGroupRequestRequest = SubmitJoinGroupRequestRequest;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_SubmitJoinGroupRequestResponse = SubmitJoinGroupRequestResponse;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_CancelJoinGroupRequestRequest = CancelJoinGroupRequestRequest;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_CancelJoinGroupRequestResponse = CancelJoinGroupRequestResponse;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_JoinGroupRequestCancelled = JoinGroupRequestCancelled;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ApproveJoinGroupRequestsRequest = ApproveJoinGroupRequestsRequest;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ItemsToUpdate = ItemsToUpdate;
    const socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ItemsToUpdate: typeof ItemsToUpdate;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ApproveJoinGroupRequestsResponse = ApproveJoinGroupRequestsResponse;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_JoinGroupRequestApproved = JoinGroupRequestApproved;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_RejectJoinGroupRequestsRequest = RejectJoinGroupRequestsRequest;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_Rejection = Rejection;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_RejectJoinGroupRequestsResponse = RejectJoinGroupRequestsResponse;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_JoinGroupRequestRejected = JoinGroupRequestRejected;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ListJoinGroupRequestsRequest = ListJoinGroupRequestsRequest;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_OwnershipFilter = OwnershipFilter;
    const socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_OwnershipFilter: typeof OwnershipFilter;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ListJoinGroupRequestsResponse = ListJoinGroupRequestsResponse;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_PagingMetadata = PagingMetadata;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_QueryJoinGroupRequestsRequest = QueryJoinGroupRequestsRequest;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_Query = Query;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_Sorting = Sorting;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_SortOrder = SortOrder;
    const socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_SortOrder: typeof SortOrder;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_Paging = Paging;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_QueryJoinGroupRequestsResponse = QueryJoinGroupRequestsResponse;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_RejectAllJoinGroupRequestsRequest = RejectAllJoinGroupRequestsRequest;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_RejectAllJoinGroupRequestsResponse = RejectAllJoinGroupRequestsResponse;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ApproveAllJoinGroupRequestsRequest = ApproveAllJoinGroupRequestsRequest;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ApproveAllJoinGroupRequestsResponse = ApproveAllJoinGroupRequestsResponse;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ListAllJoinGroupRequestsRequest = ListAllJoinGroupRequestsRequest;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ListAllJoinGroupRequestsResponse = ListAllJoinGroupRequestsResponse;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_DomainEvent = DomainEvent;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_EntityCreatedEvent = EntityCreatedEvent;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_RestoreInfo = RestoreInfo;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_EntityDeletedEvent = EntityDeletedEvent;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ActionEvent = ActionEvent;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_MessageEnvelope = MessageEnvelope;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_IdentificationData = IdentificationData;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_WebhookIdentityType = WebhookIdentityType;
    const socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_GetJoinRequirementsOptions = GetJoinRequirementsOptions;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_SubmitJoinGroupRequestOptions = SubmitJoinGroupRequestOptions;
    const socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_approveJoinGroupRequests: typeof approveJoinGroupRequests;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ApproveJoinGroupRequestsOptions = ApproveJoinGroupRequestsOptions;
    const socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_rejectJoinGroupRequests: typeof rejectJoinGroupRequests;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_RejectJoinGroupRequestsOptions = RejectJoinGroupRequestsOptions;
    const socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_listJoinGroupRequests: typeof listJoinGroupRequests;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ListJoinGroupRequestsOptions = ListJoinGroupRequestsOptions;
    const socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_queryJoinGroupRequests: typeof queryJoinGroupRequests;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_QueryJoinGroupRequestsOptions = QueryJoinGroupRequestsOptions;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_JoinGroupRequestsQueryResult = JoinGroupRequestsQueryResult;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_JoinGroupRequestsQueryBuilder = JoinGroupRequestsQueryBuilder;
    type socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ListAllJoinGroupRequestsOptions = ListAllJoinGroupRequestsOptions;
    namespace socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d {
        export { socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_JoinGroupRequest as JoinGroupRequest, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_RequestStatus as RequestStatus, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_RequestDetails as RequestDetails, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_SocialGroupsEvent as SocialGroupsEvent, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_SocialGroupsEventPayloadOneOf as SocialGroupsEventPayloadOneOf, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_MemberJoinedGroup as MemberJoinedGroup, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_MembersAddedToGroup as MembersAddedToGroup, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_JoinRequestsApproved as JoinRequestsApproved, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_MembersInvitedToGroup as MembersInvitedToGroup, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_GetJoinRequirementsRequest as GetJoinRequirementsRequest, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_MembershipQuestionAnswer as MembershipQuestionAnswer, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_GetJoinRequirementsResponse as GetJoinRequirementsResponse, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_PaidPlan as PaidPlan, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ViolationType as ViolationType, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_EventsViolationOptions as EventsViolationOptions, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_PricingPlanViolationOptions as PricingPlanViolationOptions, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_MembershipQuestionViolationOptions as MembershipQuestionViolationOptions, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_Violation as Violation, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ViolationViolationOptionsOneOf as ViolationViolationOptionsOneOf, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_SubmitJoinGroupRequestRequest as SubmitJoinGroupRequestRequest, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_SubmitJoinGroupRequestResponse as SubmitJoinGroupRequestResponse, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_CancelJoinGroupRequestRequest as CancelJoinGroupRequestRequest, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_CancelJoinGroupRequestResponse as CancelJoinGroupRequestResponse, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_JoinGroupRequestCancelled as JoinGroupRequestCancelled, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ApproveJoinGroupRequestsRequest as ApproveJoinGroupRequestsRequest, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ItemsToUpdate as ItemsToUpdate, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ApproveJoinGroupRequestsResponse as ApproveJoinGroupRequestsResponse, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_JoinGroupRequestApproved as JoinGroupRequestApproved, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_RejectJoinGroupRequestsRequest as RejectJoinGroupRequestsRequest, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_Rejection as Rejection, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_RejectJoinGroupRequestsResponse as RejectJoinGroupRequestsResponse, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_JoinGroupRequestRejected as JoinGroupRequestRejected, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ListJoinGroupRequestsRequest as ListJoinGroupRequestsRequest, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_OwnershipFilter as OwnershipFilter, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ListJoinGroupRequestsResponse as ListJoinGroupRequestsResponse, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_PagingMetadata as PagingMetadata, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_QueryJoinGroupRequestsRequest as QueryJoinGroupRequestsRequest, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_Query as Query, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_Sorting as Sorting, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_SortOrder as SortOrder, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_Paging as Paging, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_QueryJoinGroupRequestsResponse as QueryJoinGroupRequestsResponse, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_RejectAllJoinGroupRequestsRequest as RejectAllJoinGroupRequestsRequest, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_RejectAllJoinGroupRequestsResponse as RejectAllJoinGroupRequestsResponse, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ApproveAllJoinGroupRequestsRequest as ApproveAllJoinGroupRequestsRequest, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ApproveAllJoinGroupRequestsResponse as ApproveAllJoinGroupRequestsResponse, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ListAllJoinGroupRequestsRequest as ListAllJoinGroupRequestsRequest, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ListAllJoinGroupRequestsResponse as ListAllJoinGroupRequestsResponse, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_DomainEvent as DomainEvent, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_EntityCreatedEvent as EntityCreatedEvent, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_RestoreInfo as RestoreInfo, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_EntityUpdatedEvent as EntityUpdatedEvent, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_EntityDeletedEvent as EntityDeletedEvent, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ActionEvent as ActionEvent, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_MessageEnvelope as MessageEnvelope, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_IdentificationData as IdentificationData, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_WebhookIdentityType as WebhookIdentityType, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_GetJoinRequirementsOptions as GetJoinRequirementsOptions, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_SubmitJoinGroupRequestOptions as SubmitJoinGroupRequestOptions, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_approveJoinGroupRequests as approveJoinGroupRequests, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ApproveJoinGroupRequestsOptions as ApproveJoinGroupRequestsOptions, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_rejectJoinGroupRequests as rejectJoinGroupRequests, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_RejectJoinGroupRequestsOptions as RejectJoinGroupRequestsOptions, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_listJoinGroupRequests as listJoinGroupRequests, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ListJoinGroupRequestsOptions as ListJoinGroupRequestsOptions, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_queryJoinGroupRequests as queryJoinGroupRequests, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_QueryJoinGroupRequestsOptions as QueryJoinGroupRequestsOptions, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_JoinGroupRequestsQueryResult as JoinGroupRequestsQueryResult, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_JoinGroupRequestsQueryBuilder as JoinGroupRequestsQueryBuilder, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d_ListAllJoinGroupRequestsOptions as ListAllJoinGroupRequestsOptions, };
    }
    export { socialGroupsV2GroupGroups_universal_d as groups, socialGroupsV2JoinGroupRequestJoinGroupRequests_universal_d as joinGroupRequests, socialGroupsV2GroupMemberMembers_universal_d as members, socialGroupsV2GroupRoleRoles_universal_d as roles };
}
