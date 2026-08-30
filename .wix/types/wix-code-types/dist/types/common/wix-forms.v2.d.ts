declare module "wix-forms.v2" {
    /** Form submission that was created or retrieved. */
    interface FormSubmission {
        /**
         * Submission ID.
         * @readonly
         */
        _id?: string | null;
        /** ID of the form which the submission belongs to. */
        formId?: string;
        /**
         * The app which the form submissions belong to. For example, the namespace for the Wix Forms app is `wix.form_app.form`. Call `Get Submission` to retrieve the namespace.
         * @readonly
         */
        namespace?: string;
        /**
         * Status of the submission.
         * - `PENDING`: A submission is created, but has not yet been recorded in the Wix Forms collection.
         * - `PAYMENT_WAITING`: A form submission requiring payment is created.
         * - `PAYMENT_CANCELED`: An order of a form submission is canceled.
         * - `CONFIRMED`: A submission is recorded in the Wix Forms collection.
         */
        status?: SubmissionStatus;
        /** Submission values where `key` is the form field and `value` is the data submitted for the given field. */
        submissions?: Record<string, any>;
        /**
         * Date and time the form submission was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date and time the form submission was updated.
         * @readonly
         */
        _updatedDate?: Date;
        /**
         * Revision number, which increments by 1 each time the form submission is updated. To prevent conflicting changes, the existing revision must be used when updating a form submission.
         * @readonly
         */
        revision?: string | null;
        /**
         * ID of the visitor that submitted the form.
         * @readonly
         */
        submitter?: Submitter;
        /** Whether a site owner marked a submission as "seen". */
        seen?: boolean;
        /** Data extension object that holds users' and apps' fields. */
        extendedFields?: ExtendedFields;
        /**
         * Order details. <br>
         * <b>Note</b>: This object is only applicable when submittng a form in the Wix Payments app.
         */
        orderDetails?: OrderDetails;
        /**
         * Contact ID. Member who created the submission, or a mapped contact.
         * @readonly
         */
        contactId?: string | null;
    }
    enum SubmissionStatus {
        UNDEFINED = "UNDEFINED",
        PENDING = "PENDING",
        CONFIRMED = "CONFIRMED",
        PAYMENT_WAITING = "PAYMENT_WAITING",
        PAYMENT_CANCELED = "PAYMENT_CANCELED"
    }
    interface Submitter extends SubmitterSubmitterOneOf {
        /** Member ID. */
        memberId?: string | null;
        /** Visitor ID. */
        visitorId?: string | null;
        /** Application ID. */
        applicationId?: string | null;
        /** User ID. */
        userId?: string | null;
    }
    /** @oneof */
    interface SubmitterSubmitterOneOf {
        /** Member ID. */
        memberId?: string | null;
        /** Visitor ID. */
        visitorId?: string | null;
        /** Application ID. */
        applicationId?: string | null;
        /** User ID. */
        userId?: string | null;
    }
    interface ExtendedFields {
        /**
         * Extended field data. Each key corresponds to the namespace of the app that created the extended fields.
         * The value of each key is structured according to the schema defined when the extended fields were configured.
         *
         * You can only access fields for which you have the appropriate permissions.
         *
         * Learn more about [extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields).
         */
        namespaces?: Record<string, Record<string, any>>;
    }
    interface OrderDetails {
        /**
         * ID of the order related to submission (only applicable if a form has payments).
         * @readonly
         */
        orderId?: string | null;
        /**
         * Order number.
         * @readonly
         */
        number?: string | null;
        /**
         * Currency.
         * @readonly
         */
        currency?: string | null;
        /**
         * Item subtotal.
         * @readonly
         */
        itemSubtotal?: string;
        /**
         * ID of the checkout related to submission (only applicable if a form has payments).
         * @readonly
         */
        checkoutId?: string;
    }
    interface CreateSubmissionRequest {
        /** Submission to create. */
        submission: FormSubmission;
        /** Captcha token. */
        captchaToken?: string | null;
    }
    interface CreateSubmissionResponse {
        /** The created submission. */
        submission?: FormSubmission;
    }
    interface CreateSubmissionBySubmitterRequest {
        /** Submission to create. */
        submission: FormSubmission;
        /** A flag indicating whether this operation is a repeated creation, such as restoring a previously manually reported as spam entity. */
        repeatedCreation?: boolean;
        /** Validation will be mode is more forgiving, for example "required" won't be validated. */
        lenientValidation?: boolean;
    }
    interface CreateSubmissionBySubmitterResponse {
        /** The created submission. */
        submission?: FormSubmission;
    }
    interface BulkCreateSubmissionBySubmitterRequest {
        /** Form id. Restricts submissions creation for a single form. */
        formId: string;
        /**
         * Submissions to create.
         * Deprecated
         */
        submissions?: FormSubmission[];
        /** When set, items will be returned on successful create. */
        returnEntity?: boolean;
        /** Submissions data to create. */
        submissionsV2?: BulkCreateSubmissionBySubmitterData[];
        /** Validation will be mode is more forgiving, for example "required" won't be validated. */
        lenientValidation?: boolean;
    }
    interface BulkCreateSubmissionBySubmitterData {
        /** Submissions to create. */
        submission?: FormSubmission;
        /** A flag indicating whether this operation is a repeated creation, such as restoring a previously manually reported as spam entity. */
        repeatedCreation?: boolean;
    }
    interface BulkCreateSubmissionBySubmitterResponse {
        /** Created submissions with metadata */
        results?: BulkSubmissionResult[];
        /** Metadata of request */
        bulkActionMetadata?: BulkActionMetadata;
    }
    interface BulkSubmissionResult {
        /** Created submission metadata */
        itemMetadata?: ItemMetadata;
        /** The created submission. */
        item?: FormSubmission;
    }
    interface ItemMetadata {
        /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
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
        /** Number of items that were successfully processed. */
        totalSuccesses?: number;
        /** Number of items that couldn't be processed. */
        totalFailures?: number;
        /** Number of failures without details because detailed failure threshold was exceeded. */
        undetailedFailures?: number;
    }
    interface GetSubmissionRequest {
        /** ID of the submission to retrieve. */
        submissionId: string;
    }
    interface GetSubmissionResponse {
        /** The retrieved submission. */
        submission?: FormSubmission;
    }
    interface GetSubmissionByCheckoutIdRequest {
        /** Checkout ID of the submission to retrieve. */
        checkoutId: string;
    }
    interface GetSubmissionByCheckoutIdResponse {
        /** The retrieved submission. */
        submission?: FormSubmission;
    }
    interface UpdateSubmissionRequest {
        /** Submission to update. */
        submission: FormSubmission;
    }
    interface UpdateSubmissionResponse {
        /** The updated submission. */
        submission?: FormSubmission;
    }
    interface ConfirmSubmissionRequest {
        /** Submission ID to confirm. */
        submissionId: string;
    }
    interface ConfirmSubmissionResponse {
        /** The confirmed submission. */
        submission?: FormSubmission;
    }
    interface FormSubmissionStatusUpdatedEvent {
        /** Updated submission. */
        submission?: FormSubmission;
        /** Previous status of the submission. */
        previousStatus?: SubmissionStatus;
    }
    interface DeleteSubmissionRequest {
        /** ID of the submission to delete. */
        submissionId: string;
        /**
         * Delete the submission, bypassing the trash bin. This means that the submission is permanently deleted and cannot be restored.
         *
         *
         * Default: `false`
         */
        permanent?: boolean;
        /** Whether to preserve files, associated with the submission. If the value is `false`, then the files are deleted after 210 days. */
        preserveFiles?: boolean;
    }
    interface DeleteSubmissionResponse {
    }
    interface BulkDeleteSubmissionRequest {
        /** Form ID. */
        formId: string;
        /** Submission ids. */
        submissionIds?: string[];
        /**
         * Delete submission bypassing trash-bin
         * Default: false
         */
        permanent?: boolean;
        /** Preserve files. */
        preserveFiles?: boolean;
    }
    interface BulkDeleteSubmissionResponse {
        /** Results of bulk submission delete */
        results?: BulkDeleteSubmissionResult[];
        /** Metadata of request */
        bulkActionMetadata?: BulkActionMetadata;
    }
    interface BulkDeleteSubmissionResult {
        /** Deleted item metadata */
        itemMetadata?: ItemMetadata;
    }
    interface RestoreSubmissionFromTrashBinRequest {
        /** ID of the submission to restore. */
        submissionId: string;
    }
    interface RestoreSubmissionFromTrashBinResponse {
        /** The restored submission. */
        submission?: FormSubmission;
    }
    interface RemoveSubmissionFromTrashBinRequest {
        /** ID of the submission to restore. */
        submissionId: string;
    }
    interface RemoveSubmissionFromTrashBinResponse {
    }
    interface RemovedSubmissionFromTrash {
        /** Removed submission. */
        submission?: FormSubmission;
    }
    interface BulkRemoveSubmissionFromTrashBinRequest {
        /** Form ID. */
        formId: string;
        /** Submission ids. */
        submissionIds?: string[];
    }
    interface BulkRemoveSubmissionFromTrashBinResponse {
        /** Results of bulk submission removal from trash */
        results?: BulkRemoveSubmissionFromTrashBinResult[];
        /** Metadata of request */
        bulkActionMetadata?: BulkActionMetadata;
    }
    interface BulkRemoveSubmissionFromTrashBinResult {
        /** Deleted item metadata */
        itemMetadata?: ItemMetadata;
    }
    interface ListDeletedSubmissionsRequest {
        /** Form ID. */
        formId: string;
        /** Submission ids. */
        submissionIds?: string[];
        /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not filter or `order`. */
        paging?: CursorPaging;
        /**
         * List of statuses of submissions which should be returned
         * Default: CONFIRMED
         */
        statuses?: SubmissionStatus[];
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
    interface ListDeletedSubmissionsResponse {
        /** The retrieved Submissions. */
        submissions?: FormSubmission[];
        /** Paging metadata. */
        pagingMetadata?: CursorPagingMetadata;
    }
    interface CursorPagingMetadata {
        /** Number of items returned in the response. */
        count?: number | null;
        /** Offset that was requested. */
        cursors?: Cursors;
        /**
         * Indicates if there are more results after the current page.
         * If `true`, another page of results can be retrieved.
         * If `false`, this is the last page.
         */
        hasNext?: boolean | null;
    }
    interface Cursors {
        /** Cursor pointing to next page in the list of results. */
        next?: string | null;
        /** Cursor pointing to previous page in the list of results. */
        prev?: string | null;
    }
    interface GetDeletedSubmissionRequest {
        /** Submission id. */
        submissionId: string;
    }
    interface GetDeletedSubmissionResponse {
        /** The retrieved Submission. */
        submission?: FormSubmission;
    }
    interface QuerySubmissionRequest {
        /** Query options. */
        query: CursorQuery;
        /** Whether to return only your own submissions. If `false`, returns all submissions based on query filters. */
        onlyYourOwn?: boolean;
    }
    interface CursorQuery extends CursorQueryPagingMethodOneOf {
        /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
        cursorPaging?: CursorPaging;
        /**
         * Filter object in the following format:
         * `"filter" : {
         * "fieldName1": "value1",
         * "fieldName2":{"$operator":"value2"}
         * }`
         * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
         */
        filter?: Record<string, any> | null;
        /**
         * Sort object in the following format:
         * `[{"fieldName":"sortField1","order":"ASC"},{"fieldName":"sortField2","order":"DESC"}]`
         */
        sort?: Sorting[];
    }
    /** @oneof */
    interface CursorQueryPagingMethodOneOf {
        /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
        cursorPaging?: CursorPaging;
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
    interface QuerySubmissionResponse {
        /** The retrieved submissions. */
        submissions?: FormSubmission[];
        /** Paging metadata. */
        metadata?: CursorPagingMetadata;
    }
    interface SearchSubmissionsByNamespaceRequest {
        /** Query options. */
        search: CursorSearch;
    }
    interface CursorSearch extends CursorSearchPagingMethodOneOf {
        /**
         * Cursor pointing to page of results.
         * When requesting 'cursor_paging.cursor', no `filter`, `sort` or `search` can be provided.
         */
        cursorPaging?: CursorPaging;
        /** A filter object. See documentation [here](https://bo.wix.com/wix-docs/rnd/platformization-guidelines/api-query-language#platformization-guidelines_api-query-language_defining-in-protobuf) */
        filter?: Record<string, any> | null;
        /** Sort object in the form [{"fieldName":"sortField1"},{"fieldName":"sortField2","direction":"DESC"}] */
        sort?: Sorting[];
        /** Free text to match in searchable fields */
        search?: SearchDetails;
    }
    /** @oneof */
    interface CursorSearchPagingMethodOneOf {
        /**
         * Cursor pointing to page of results.
         * When requesting 'cursor_paging.cursor', no `filter`, `sort` or `search` can be provided.
         */
        cursorPaging?: CursorPaging;
    }
    interface SearchDetails {
        /** Defines how separate search terms in `expression` are combined */
        mode?: Mode;
        /** Search term or expression */
        expression?: string | null;
        /** Flag if should use auto fuzzy search (allowing typos by a managed proximity algorithm) */
        fuzzy?: boolean;
    }
    enum Mode {
        /** Any of the search terms must be present */
        OR = "OR",
        /** All search terms must be present */
        AND = "AND"
    }
    interface SearchSubmissionsByNamespaceResponse {
        /** The retrieved Submissions. */
        submissions?: FormSubmission[];
        /** Paging metadata. */
        metadata?: CursorPagingMetadata;
    }
    interface SearchSubmissionsByNamespaceForExportRequest {
        /** Query options. */
        query: CursorQuery;
    }
    interface SearchSubmissionsByNamespaceForExportResponse {
        /** The retrieved Submissions. */
        submissions?: FormSubmission[];
        /** Paging metadata. */
        metadata?: CursorPagingMetadata;
    }
    interface QuerySubmissionsByNamespaceRequest {
        /** Query options. */
        query: CursorQuery;
        /** Whether to return only your own submissions. If `false`, returns all submissions based on query filters. */
        onlyYourOwn?: boolean;
    }
    interface QuerySubmissionsByNamespaceResponse {
        /** The retrieved Submissions. */
        submissions?: FormSubmission[];
        /** Paging metadata. */
        metadata?: CursorPagingMetadata;
    }
    interface QuerySubmissionsByNamespaceForExportRequest {
        /** Query options. */
        query: CursorQuery;
    }
    interface QuerySubmissionsByNamespaceForExportResponse {
        /** The retrieved Submissions. */
        submissions?: FormSubmission[];
        /** Paging metadata. */
        metadata?: CursorPagingMetadata;
    }
    interface CountSubmissionsByFilterRequest {
        /** A filter object. Must filter by namespace. */
        filter: Record<string, any> | null;
        /** Free text to match in searchable fields. */
        search?: SearchDetails;
    }
    interface CountSubmissionsByFilterResponse {
        /** Forms submission count. */
        formsSubmissionsCount?: FormSubmissionsCount[];
    }
    interface FormSubmissionsCount {
        /** Form ID. */
        formId?: string;
        /** Total number of submissions. */
        totalCount?: number;
        /** Number of submissions that the site owner hasn't seen yet. */
        unseenCount?: number;
    }
    interface CountSubmissionsRequest {
        /** Form IDs which submissions should be counted. */
        formIds: string[];
        /** The app which the form submissions belong to. For example, the namespace for the Wix Forms app is `wix.form_app.form`. Call `getSubmission()` to retrieve the namespace. */
        namespace: string;
        /**
         * Status of the submission.
         * - `PENDING`: A submission is created, but has not yet been recorded in the Wix Forms collection.
         * - `PAYMENT_WAITING`: A form submission requiring payment is created.
         * - `PAYMENT_CANCELED`: An order of a form submission is canceled.
         * - `CONFIRMED`: A submission is recorded in the Wix Forms collection.
         */
        statuses?: SubmissionStatus[];
    }
    interface CountSubmissionsResponse {
        /** Forms submission count. */
        formsSubmissionsCount?: FormSubmissionsCount[];
    }
    interface CountDeletedSubmissionsRequest {
        /** Form IDs. */
        formIds: string[];
        /** Identifies the app which the form submissions belong to. For example, the namespace for the Wix Forms App is `"wix.form_app.form"`. The namespace of a submission can be retrieved using the Get Submission endpoint. */
        namespace: string;
        /**
         * List of statuses of submissions which should be taken into count
         * Default: CONFIRMED, PAYMENT_WAITING, PAYMENT_CANCELED
         */
        statuses?: SubmissionStatus[];
    }
    interface CountDeletedSubmissionsResponse {
        /** Forms submission count. */
        formsDeletedSubmissionsCount?: FormDeletedSubmissionsCount[];
    }
    interface FormDeletedSubmissionsCount {
        /** Form ID. */
        formId?: string;
        /** Total number of submissions. */
        totalCount?: number;
    }
    interface GetMediaUploadURLRequest {
        /** Form ID. */
        formId: string;
        /** Name of file to upload. */
        filename: string;
        /**
         * [Mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#) of file to upload.
         *
         * For example, `'image/png'`
         */
        mimeType: string;
    }
    interface GetMediaUploadURLResponse {
        /** Url to upload file. */
        uploadUrl?: string;
    }
    interface BulkMarkSubmissionsAsSeenRequest {
        /** Submission IDs to mark as seen. */
        ids: string[];
        /** ID of the form which the submissions belong to. */
        formId: string;
    }
    interface BulkMarkSubmissionsAsSeenResponse {
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
    interface Empty {
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
    interface UpsertContactFromSubmissionRequest {
        /** Submission from which contact needs to be upserted. */
        submissionId: string;
        /** Optional contact id to which submission should be mapped. */
        contactId?: string | null;
        /** Indicates contact has verified primary email. */
        emailVerified?: boolean;
    }
    interface UpsertContactFromSubmissionResponse {
        /** Submit contact response. */
        submitContactResponse?: SubmitContactResponse;
    }
    interface SubmitContactResponse {
        /** ID of the contact that was found or created. */
        contactId?: string;
        /**
         * Identity type of the returned contact.
         *
         * - `CONTACT`: The returned contact ID belongs to a new or existing contact.
         * - `MEMBER`: The returned contact ID belongs to the currently logged-in site member.
         * - `NOT_AUTHENTICATED_MEMBER`: The returned contact ID belongs to a site member who is not currently logged in.
         */
        identityType?: IdentityType;
        /**
         * Indicates whether the contact was just created or already existed.
         *
         * If the contact was just created, returns `true`.
         * If it already existed, returns `false`.
         */
        newContact?: boolean;
    }
    enum IdentityType {
        UNKNOWN = "UNKNOWN",
        /** Existing or new contact */
        CONTACT = "CONTACT",
        /** Member is logged in, matching logic skipped */
        MEMBER = "MEMBER",
        /** Matching contact is a member, Merge logic won't be applied */
        NOT_AUTHENTICATED_MEMBER = "NOT_AUTHENTICATED_MEMBER"
    }
    interface SubmissionContactMapped {
        /**
         * Mapped upserted contact ID.
         * @readonly
         */
        contactId?: string;
        /** Identifies the namespace that the submission's form belongs to. */
        namespace?: string;
        /** Marketing subscription details */
        marketingSubscriptionDetails?: MarketingSubscriptionDetails;
    }
    interface MarketingSubscriptionDetails {
        /** Form id which was submitted */
        formId?: string;
        /** Mapped contact emails. */
        emails?: string[];
        /**
         * Date and time the form submission was created.
         * @readonly
         */
        submittedDate?: Date;
        /**
         * Subscription consent opt in level, either single or double confirmation.
         * Default: SINGLE_CONFIRMATION
         */
        optInLevel?: OptInLevel;
    }
    enum OptInLevel {
        SINGLE_CONFIRMATION = "SINGLE_CONFIRMATION",
        DOUBLE_CONFIRMATION = "DOUBLE_CONFIRMATION"
    }
    interface SubmissionContactMappingSkipped {
        /** Form Id. */
        formId?: string;
        /** Identifies the namespace that the submission's form belongs to. */
        namespace?: string;
    }
    /**
     * Creates a submission.
     *
     *
     * The `createSubmission()` function is an alternative way to the [`WixFormsV2`](https://www.wix.com/velo/reference/$w/wixformsv2/submit) element for submitting a form. In this case, clicking the submit button is unnecessary, the submission is automatically created when calling this function.
     * @param submission - Submission to create.
     * @public
     * @requiredField submission
     * @requiredField submission.formId
     * @param options - Optional fields.
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     */
    function createSubmission(submission: FormSubmission, options?: CreateSubmissionOptions): Promise<CreateSubmissionResponse>;
    interface CreateSubmissionOptions {
        /** Captcha token. */
        captchaToken?: string | null;
    }
    interface CreateSubmissionBySubmitterOptions {
        /** A flag indicating whether this operation is a repeated creation, such as restoring a previously manually reported as spam entity. */
        repeatedCreation?: boolean;
        /** Validation will be mode is more forgiving, for example "required" won't be validated. */
        lenientValidation?: boolean;
    }
    /**
     * Creates multiple submissions with specified submitters.
     * Internal, migration only.
     * @param formId - Form id. Restricts submissions creation for a single form.
     * @public
     * @documentationMaturity preview
     * @requiredField formId
     * @requiredField options.submissions.submissions
     * @requiredField options.submissions.submitter
     * @adminMethod
     */
    function bulkCreateSubmissionBySubmitter(formId: string, options?: BulkCreateSubmissionBySubmitterOptions): Promise<BulkCreateSubmissionBySubmitterResponse>;
    interface BulkCreateSubmissionBySubmitterOptions {
        /**
         * Submissions to create.
         * Deprecated
         */
        submissions?: FormSubmission[];
        /** When set, items will be returned on successful create. */
        returnEntity?: boolean;
        /** Submissions data to create. */
        submissionsV2?: BulkCreateSubmissionBySubmitterData[];
        /** Validation will be mode is more forgiving, for example "required" won't be validated. */
        lenientValidation?: boolean;
    }
    /**
     * Retrieves a submission by ID.
     * @param submissionId - ID of the submission to retrieve.
     * @public
     * @requiredField submissionId
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-ORDERS
     * @permissionScope Read Submissions
     * @permissionScopeId SCOPE.DC-FORMS.READ-SUBMISSIONS
     * @applicableIdentity APP
     * @adminMethod
     */
    function getSubmission(submissionId: string): Promise<GetSubmissionResponse>;
    /**
     * Updates a submission.
     *
     *
     * Each time the submission is updated, `revision` increments by 1. The existing `revision` must be included when updating the submission. This ensures you're working with the latest submission information, and prevents unintended overwrites.
     * @param _id - Submission ID.
     * @public
     * @requiredField _id
     * @requiredField submission
     * @requiredField submission.formId
     * @requiredField submission.revision
     * @param submission - Submission to update.
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @applicableIdentity APP
     * @adminMethod
     * @returns The updated submission.
     */
    function updateSubmission(_id: string | null, submission: UpdateSubmission, options?: UpdateSubmissionOptions): Promise<FormSubmission>;
    interface UpdateSubmission {
        /**
         * Submission ID.
         * @readonly
         */
        _id?: string | null;
        /** ID of the form which the submission belongs to. */
        formId?: string;
        /**
         * The app which the form submissions belong to. For example, the namespace for the Wix Forms app is `wix.form_app.form`. Call `Get Submission` to retrieve the namespace.
         * @readonly
         */
        namespace?: string;
        /**
         * Status of the submission.
         * - `PENDING`: A submission is created, but has not yet been recorded in the Wix Forms collection.
         * - `PAYMENT_WAITING`: A form submission requiring payment is created.
         * - `PAYMENT_CANCELED`: An order of a form submission is canceled.
         * - `CONFIRMED`: A submission is recorded in the Wix Forms collection.
         */
        status?: SubmissionStatus;
        /** Submission values where `key` is the form field and `value` is the data submitted for the given field. */
        submissions?: Record<string, any>;
        /**
         * Date and time the form submission was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date and time the form submission was updated.
         * @readonly
         */
        _updatedDate?: Date;
        /**
         * Revision number, which increments by 1 each time the form submission is updated. To prevent conflicting changes, the existing revision must be used when updating a form submission.
         * @readonly
         */
        revision?: string | null;
        /**
         * ID of the visitor that submitted the form.
         * @readonly
         */
        submitter?: Submitter;
        /** Whether a site owner marked a submission as "seen". */
        seen?: boolean;
        /** Data extension object that holds users' and apps' fields. */
        extendedFields?: ExtendedFields;
        /**
         * Order details. <br>
         * <b>Note</b>: This object is only applicable when submittng a form in the Wix Payments app.
         */
        orderDetails?: OrderDetails;
        /**
         * Contact ID. Member who created the submission, or a mapped contact.
         * @readonly
         */
        contactId?: string | null;
    }
    interface UpdateSubmissionOptions {
    }
    /**
     * Confirms a submission.
     *
     *
     * You can only confirm a submission that has a `PENDING` status.
     * When using forms from the [Wix Pricing Plans](https://www.wix.com/app-market/paid-plans?referral=collection&appIndex=42&referralTag=made-by-wix&referralSectionName=made-by-wix) app, the default submission status is `PENDING`.
     * When using forms from the [Wix Forms]() app, the default form submission status is `CONFIRMED`. You can change the default status for individual submissions using the `updateSubmission()` method.
     * @param submissionId - Submission ID to confirm.
     * @public
     * @requiredField submissionId
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @applicableIdentity APP
     * @adminMethod
     */
    function confirmSubmission(submissionId: string): Promise<ConfirmSubmissionResponse>;
    /**
     * Deletes a submission.
     *
     *
     * This function moves the form submission into the trash bin. To delete the submission permanently, change the default `permanent` field value to `true.`
     * @param submissionId - ID of the submission to delete.
     * @public
     * @requiredField submissionId
     * @param options - Optional fields.
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @applicableIdentity APP
     * @adminMethod
     */
    function deleteSubmission(submissionId: string, options?: DeleteSubmissionOptions): Promise<void>;
    interface DeleteSubmissionOptions {
        /**
         * Delete the submission, bypassing the trash bin. This means that the submission is permanently delete and cannot be restored.
         *
         *
         * Default: `false`
         */
        permanent?: boolean;
        /** Whether to preserve files, associated with the submission. If the value is `false`, then the files are deleted after 210 days. */
        preserveFiles?: boolean;
    }
    /**
     * Deletes submissions by IDS for specific form.
     * @param formId - Form ID.
     * @public
     * @documentationMaturity preview
     * @requiredField formId
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @applicableIdentity APP
     * @adminMethod
     */
    function bulkDeleteSubmission(formId: string, options?: BulkDeleteSubmissionOptions): Promise<BulkDeleteSubmissionResponse>;
    interface BulkDeleteSubmissionOptions {
        /** Submission ids. */
        submissionIds?: string[];
        /**
         * Delete submission bypassing trash-bin
         * Default: false
         */
        permanent?: boolean;
        /** Preserve files. */
        preserveFiles?: boolean;
    }
    /**
     * Restores deleted submission
     * @param submissionId - ID of the submission to restore.
     * @public
     * @documentationMaturity preview
     * @requiredField submissionId
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @applicableIdentity APP
     * @adminMethod
     */
    function restoreSubmissionFromTrashBin(submissionId: string): Promise<RestoreSubmissionFromTrashBinResponse>;
    /**
     * Remove deleted submission
     * @param submissionId - ID of the submission to restore.
     * @public
     * @documentationMaturity preview
     * @requiredField submissionId
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @applicableIdentity APP
     * @adminMethod
     */
    function removeSubmissionFromTrashBin(submissionId: string): Promise<void>;
    /**
     * Remove multiple deleted submissions
     * @param formId - Form ID.
     * @public
     * @documentationMaturity preview
     * @requiredField formId
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @applicableIdentity APP
     * @adminMethod
     */
    function bulkRemoveSubmissionFromTrashBin(formId: string, options?: BulkRemoveSubmissionFromTrashBinOptions): Promise<BulkRemoveSubmissionFromTrashBinResponse>;
    interface BulkRemoveSubmissionFromTrashBinOptions {
        /** Submission ids. */
        submissionIds?: string[];
    }
    /**
     * List deleted submissions
     * @param formId - Form ID.
     * @public
     * @documentationMaturity preview
     * @requiredField formId
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-ORDERS
     * @permissionScope Read Submissions
     * @permissionScopeId SCOPE.DC-FORMS.READ-SUBMISSIONS
     * @applicableIdentity APP
     * @adminMethod
     */
    function listDeletedSubmissions(formId: string, options?: ListDeletedSubmissionsOptions): Promise<ListDeletedSubmissionsResponse>;
    interface ListDeletedSubmissionsOptions {
        /** Submission ids. */
        submissionIds?: string[];
        /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not filter or `order`. */
        paging?: CursorPaging;
        /**
         * List of statuses of submissions which should be returned
         * Default: CONFIRMED
         */
        statuses?: SubmissionStatus[];
    }
    /**
     * Get deleted submission
     * @param submissionId - Submission id.
     * @public
     * @documentationMaturity preview
     * @requiredField submissionId
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-ORDERS
     * @permissionScope Read Submissions
     * @permissionScopeId SCOPE.DC-FORMS.READ-SUBMISSIONS
     * @applicableIdentity APP
     * @adminMethod
     */
    function getDeletedSubmission(submissionId: string): Promise<GetDeletedSubmissionResponse>;
    /**
     * Deprecated on '2023-08-08'. Use QuerySubmissionsByNamespace.
     * @param query - Query options.
     * @public
     * @documentationMaturity preview
     * @requiredField query
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-ORDERS
     * @permissionScope Read Submissions
     * @permissionScopeId SCOPE.DC-FORMS.READ-SUBMISSIONS
     * @applicableIdentity APP
     * @adminMethod
     * @deprecated
     * @replacedBy com.wixpress.forms.v4.FormSubmissionService.QuerySubmissionsByNamespace
     * @targetRemovalDate 2025-01-11
     */
    function querySubmission(query: CursorQuery, options?: QuerySubmissionOptions): Promise<QuerySubmissionResponse>;
    interface QuerySubmissionOptions {
        /** Whether to return only your own submissions. If `false`, returns all submissions based on query filters. */
        onlyYourOwn?: boolean;
    }
    /**
     * > **Note:** The Form Submission API only works with the Wix Forms app. Call [GetAppInstance](https://dev.wix.com/docs/rest/api-reference/app-management/apps/app-instance/get-app-instance) to confirm that the app named `wix_forms` is installed on the site.
     * <br>
     *
     * Returns a list of up to 100 submissions, given the provided paging, filtering, and sorting.
     *
     * You can only query submissions from a specified namespace. Use the query filter on the `namespace` field, otherwise you will receive an error.
     *
     * For field support for filters and sorting, see [Form Submissions: Supported Filters and Sorting](https://dev.wix.com/docs/rest/api-reference/wix-forms/form-submissions/sort-and-filter).option
     *
     * To learn about working with _Query_ endpoints, see [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language), [Sorting and Paging](https://dev.wix.com/api/rest/getting-started/pagination), and [Field Projection](https://dev.wix.com/api/rest/getting-started/field-projection).
     * @param search - Query options.
     * @public
     * @documentationMaturity preview
     * @requiredField search
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-ORDERS
     * @permissionScope Read Submissions
     * @permissionScopeId SCOPE.DC-FORMS.READ-SUBMISSIONS
     * @applicableIdentity APP
     * @adminMethod
     */
    function searchSubmissionsByNamespace(search: CursorSearch): Promise<SearchSubmissionsByNamespaceResponse>;
    /**
     * Creates a query to retrieve a list of submissions.
     *
     *
     * The `querySubmissionsByNamespace()` method builds a query to retrieve a list of submissions from the specified namespace and returns a [`SubmissionsQueryBuilder`](#submissionsquerybuilder) object.
     * >**Note:** You can only query submissions from a specified namespace. Use the query filter on the `namespace` field, otherwise you will receive an error.
     *
     * The returned object contains the query definition, which is typically used to run the query using the [`find()`](#submissionsquerybuilder/find) method.
     *
     * You can refine the query by chaining `SubmissionsQueryBuilder` methods onto the query. `SubmissionsQueryBuilder` methods enable you to sort, filter, and control the results that `querySubmissionsByNamespace()` returns.
     *
     * The following `SubmissionsQueryBuilder` methods are supported for `querySubmissionsByNamespace()`. For a full description of the Submissions object, see the object returned for the [`items`](#submissionsqueryresult/items) property in [`SubmissionsQueryResult`](#submissionsqueryresult).
     * @public
     * @param options - Query options.
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-ORDERS
     * @permissionScope Read Submissions
     * @permissionScopeId SCOPE.DC-FORMS.READ-SUBMISSIONS
     * @applicableIdentity APP
     * @adminMethod
     */
    function querySubmissionsByNamespace(options?: QuerySubmissionsByNamespaceOptions): SubmissionsQueryBuilder;
    interface QuerySubmissionsByNamespaceOptions {
        /** Whether to return only your own submissions. If `false`, returns all submissions based on query filters. */
        onlyYourOwn?: boolean | undefined;
    }
    interface QueryCursorResult {
        cursors: Cursors;
        hasNext: () => boolean;
        hasPrev: () => boolean;
        length: number;
        pageSize: number;
    }
    interface SubmissionsQueryResult extends QueryCursorResult {
        items: FormSubmission[];
        query: SubmissionsQueryBuilder;
        next: () => Promise<SubmissionsQueryResult>;
        prev: () => Promise<SubmissionsQueryResult>;
    }
    interface SubmissionsQueryBuilder {
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        eq: (propertyName: "_id" | "formId" | "namespace" | "status" | "_createdDate" | "_updatedDate" | "seen", value: any) => SubmissionsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        ne: (propertyName: "_id" | "formId" | "status" | "_createdDate" | "_updatedDate" | "seen", value: any) => SubmissionsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        ge: (propertyName: "_createdDate" | "_updatedDate", value: any) => SubmissionsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        gt: (propertyName: "_createdDate" | "_updatedDate", value: any) => SubmissionsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        le: (propertyName: "_createdDate" | "_updatedDate", value: any) => SubmissionsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        lt: (propertyName: "_createdDate" | "_updatedDate", value: any) => SubmissionsQueryBuilder;
        in: (propertyName: "_id" | "formId" | "status" | "_createdDate" | "_updatedDate", value: any) => SubmissionsQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
        ascending: (...propertyNames: Array<"_id" | "formId" | "status" | "_createdDate" | "_updatedDate" | "seen">) => SubmissionsQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
        descending: (...propertyNames: Array<"_id" | "formId" | "status" | "_createdDate" | "_updatedDate" | "seen">) => SubmissionsQueryBuilder;
        /** @param limit - Number of items to return, which is also the `pageSize` of the results object. */
        limit: (limit: number) => SubmissionsQueryBuilder;
        /** @param cursor - A pointer to specific record */
        skipTo: (cursor: string) => SubmissionsQueryBuilder;
        find: () => Promise<SubmissionsQueryResult>;
    }
    /**
     * > **Note:** The Form Submission API only works with the Wix Forms app. Call [GetAppInstance](https://dev.wix.com/docs/rest/api-reference/app-management/apps/app-instance/get-app-instance) to confirm that the app named `wix_forms` is installed on the site.
     * <br>
     * Counts the number of submissions belonging to forms that were filtered and contain a provided expression.
     * @param filter - A filter object. Must filter by namespace.
     * @public
     * @documentationMaturity preview
     * @requiredField filter
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-ORDERS
     * @permissionScope Read Submissions
     * @permissionScopeId SCOPE.DC-FORMS.READ-SUBMISSIONS
     * @applicableIdentity APP
     * @adminMethod
     */
    function countSubmissionsByFilter(filter: Record<string, any> | null, options?: CountSubmissionsByFilterOptions): Promise<CountSubmissionsByFilterResponse>;
    interface CountSubmissionsByFilterOptions {
        /** Free text to match in searchable fields. */
        search?: SearchDetails;
    }
    /**
     * Counts the number of submissions belonging to the specified forms.
     *
     *
     * The `countSubmissions()` function is useful for analytics and tracking purposes. For example, if you have a contact form on your website, you can use this function to track how many submissions it receives daily, weekly, or monthly.
     * @public
     * @requiredField formIds
     * @requiredField namespace
     * @param namespace - The app which the form submissions belong to. For example, the namespace for the Wix Forms app is `wix.form_app.form`. Call `getSubmission()` to retrieve the namespace.
     * @param formIds - Form IDs which submissions should be counted.
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-ORDERS
     * @permissionScope Read Submissions
     * @permissionScopeId SCOPE.DC-FORMS.READ-SUBMISSIONS
     * @applicableIdentity APP
     * @adminMethod
     */
    function countSubmissions(formIds: string[], namespace: string, options?: CountSubmissionsOptions): Promise<CountSubmissionsResponse>;
    interface CountSubmissionsOptions {
        /**
         * Status of the submission.
         * - `PENDING`: A submission is created, but has not yet been recorded in the Wix Forms collection.
         * - `PAYMENT_WAITING`: A form submission requiring payment is created.
         * - `PAYMENT_CANCELED`: An order of a form submission is canceled.
         * - `CONFIRMED`: A submission is recorded in the Wix Forms collection.
         */
        statuses?: SubmissionStatus[];
    }
    /**
     * > **Note:**
     * > The Submissions API is only available in the Wix Studio editor.
     *
     * Counts the number of submissions belonging to the specified forms.
     * @param formIds - Form IDs.
     * @param namespace - Identifies the app which the form submissions belong to. For example, the namespace for the Wix Forms App is `"wix.form_app.form"`. The namespace of a submission can be retrieved using the Get Submission endpoint.
     * @public
     * @documentationMaturity preview
     * @requiredField formIds
     * @requiredField namespace
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-ORDERS
     * @permissionScope Read Submissions
     * @permissionScopeId SCOPE.DC-FORMS.READ-SUBMISSIONS
     * @applicableIdentity APP
     * @adminMethod
     */
    function countDeletedSubmissions(formIds: string[], namespace: string, options?: CountDeletedSubmissionsOptions): Promise<CountDeletedSubmissionsResponse>;
    interface CountDeletedSubmissionsOptions {
        /**
         * List of statuses of submissions which should be taken into count
         * Default: CONFIRMED, PAYMENT_WAITING, PAYMENT_CANCELED
         */
        statuses?: SubmissionStatus[];
    }
    /**
     * Retrieves a URL generated by the [Media Manager](https://www.wix.com/velo/reference/wix-media-v2/files/generatefileuploadurl) to use when creating a submission that includes a field for uploading files.
     * > **Note:** You need at least a [Standard Premium](https://support.wix.com/en/article/choosing-a-premium-plan) plan for your site to upload files.
     *
     *
     * To learn how external clients can use the generated upload URL to upload a file to the Media Manager, see [Upload API](https://www.wix.com/velo/reference/wix-media-v2/files/upload-api).
     * @param formId - Form ID.
     * @param filename - Name of file to upload.
     * @param mimeType - [Mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#) of file to upload.
     *
     * For example, `'image/png'`
     * @public
     * @requiredField filename
     * @requiredField formId
     * @requiredField mimeType
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     */
    function getMediaUploadUrl(formId: string, filename: string, mimeType: string): Promise<GetMediaUploadURLResponse>;
    /**
     * Marks form submissions as "seen".
     *
     *
     * This function marks the submissions as if they were seen by the site owner. Only site collaborators with the **[Manage Submission](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions)** permissions can mark submissions.
     * @public
     * @requiredField formId
     * @requiredField ids
     * @param ids - IDs of submissions to mark as seen.
     * @param formId - ID of the form which the submissions belong to.
     * @permissionScope Manage Submissions
     * @permissionScopeId SCOPE.DC-FORMS.MANAGE-SUBMISSIONS
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.MANAGE-ORDERS
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-PAIDPLANS.READ-ORDERS
     * @permissionScope Read Submissions
     * @permissionScopeId SCOPE.DC-FORMS.READ-SUBMISSIONS
     * @applicableIdentity APP
     * @adminMethod
     */
    function bulkMarkSubmissionsAsSeen(ids: string[], formId: string): Promise<void>;
    /**
     * Upserts contact from submission.
     * @param submissionId - Submission from which contact needs to be upserted.
     * @public
     * @documentationMaturity preview
     * @requiredField submissionId
     * @adminMethod
     */
    function upsertContactFromSubmission(submissionId: string, options?: UpsertContactFromSubmissionOptions): Promise<UpsertContactFromSubmissionResponse>;
    interface UpsertContactFromSubmissionOptions {
        /** Optional contact id to which submission should be mapped. */
        contactId?: string | null;
        /** Indicates contact has verified primary email. */
        emailVerified?: boolean;
    }
    type formsV4SubmissionSubmissions_universal_d_FormSubmission = FormSubmission;
    type formsV4SubmissionSubmissions_universal_d_SubmissionStatus = SubmissionStatus;
    const formsV4SubmissionSubmissions_universal_d_SubmissionStatus: typeof SubmissionStatus;
    type formsV4SubmissionSubmissions_universal_d_Submitter = Submitter;
    type formsV4SubmissionSubmissions_universal_d_SubmitterSubmitterOneOf = SubmitterSubmitterOneOf;
    type formsV4SubmissionSubmissions_universal_d_ExtendedFields = ExtendedFields;
    type formsV4SubmissionSubmissions_universal_d_OrderDetails = OrderDetails;
    type formsV4SubmissionSubmissions_universal_d_CreateSubmissionRequest = CreateSubmissionRequest;
    type formsV4SubmissionSubmissions_universal_d_CreateSubmissionResponse = CreateSubmissionResponse;
    type formsV4SubmissionSubmissions_universal_d_CreateSubmissionBySubmitterRequest = CreateSubmissionBySubmitterRequest;
    type formsV4SubmissionSubmissions_universal_d_CreateSubmissionBySubmitterResponse = CreateSubmissionBySubmitterResponse;
    type formsV4SubmissionSubmissions_universal_d_BulkCreateSubmissionBySubmitterRequest = BulkCreateSubmissionBySubmitterRequest;
    type formsV4SubmissionSubmissions_universal_d_BulkCreateSubmissionBySubmitterData = BulkCreateSubmissionBySubmitterData;
    type formsV4SubmissionSubmissions_universal_d_BulkCreateSubmissionBySubmitterResponse = BulkCreateSubmissionBySubmitterResponse;
    type formsV4SubmissionSubmissions_universal_d_BulkSubmissionResult = BulkSubmissionResult;
    type formsV4SubmissionSubmissions_universal_d_ItemMetadata = ItemMetadata;
    type formsV4SubmissionSubmissions_universal_d_ApplicationError = ApplicationError;
    type formsV4SubmissionSubmissions_universal_d_BulkActionMetadata = BulkActionMetadata;
    type formsV4SubmissionSubmissions_universal_d_GetSubmissionRequest = GetSubmissionRequest;
    type formsV4SubmissionSubmissions_universal_d_GetSubmissionResponse = GetSubmissionResponse;
    type formsV4SubmissionSubmissions_universal_d_GetSubmissionByCheckoutIdRequest = GetSubmissionByCheckoutIdRequest;
    type formsV4SubmissionSubmissions_universal_d_GetSubmissionByCheckoutIdResponse = GetSubmissionByCheckoutIdResponse;
    type formsV4SubmissionSubmissions_universal_d_UpdateSubmissionRequest = UpdateSubmissionRequest;
    type formsV4SubmissionSubmissions_universal_d_UpdateSubmissionResponse = UpdateSubmissionResponse;
    type formsV4SubmissionSubmissions_universal_d_ConfirmSubmissionRequest = ConfirmSubmissionRequest;
    type formsV4SubmissionSubmissions_universal_d_ConfirmSubmissionResponse = ConfirmSubmissionResponse;
    type formsV4SubmissionSubmissions_universal_d_FormSubmissionStatusUpdatedEvent = FormSubmissionStatusUpdatedEvent;
    type formsV4SubmissionSubmissions_universal_d_DeleteSubmissionRequest = DeleteSubmissionRequest;
    type formsV4SubmissionSubmissions_universal_d_DeleteSubmissionResponse = DeleteSubmissionResponse;
    type formsV4SubmissionSubmissions_universal_d_BulkDeleteSubmissionRequest = BulkDeleteSubmissionRequest;
    type formsV4SubmissionSubmissions_universal_d_BulkDeleteSubmissionResponse = BulkDeleteSubmissionResponse;
    type formsV4SubmissionSubmissions_universal_d_BulkDeleteSubmissionResult = BulkDeleteSubmissionResult;
    type formsV4SubmissionSubmissions_universal_d_RestoreSubmissionFromTrashBinRequest = RestoreSubmissionFromTrashBinRequest;
    type formsV4SubmissionSubmissions_universal_d_RestoreSubmissionFromTrashBinResponse = RestoreSubmissionFromTrashBinResponse;
    type formsV4SubmissionSubmissions_universal_d_RemoveSubmissionFromTrashBinRequest = RemoveSubmissionFromTrashBinRequest;
    type formsV4SubmissionSubmissions_universal_d_RemoveSubmissionFromTrashBinResponse = RemoveSubmissionFromTrashBinResponse;
    type formsV4SubmissionSubmissions_universal_d_RemovedSubmissionFromTrash = RemovedSubmissionFromTrash;
    type formsV4SubmissionSubmissions_universal_d_BulkRemoveSubmissionFromTrashBinRequest = BulkRemoveSubmissionFromTrashBinRequest;
    type formsV4SubmissionSubmissions_universal_d_BulkRemoveSubmissionFromTrashBinResponse = BulkRemoveSubmissionFromTrashBinResponse;
    type formsV4SubmissionSubmissions_universal_d_BulkRemoveSubmissionFromTrashBinResult = BulkRemoveSubmissionFromTrashBinResult;
    type formsV4SubmissionSubmissions_universal_d_ListDeletedSubmissionsRequest = ListDeletedSubmissionsRequest;
    type formsV4SubmissionSubmissions_universal_d_CursorPaging = CursorPaging;
    type formsV4SubmissionSubmissions_universal_d_ListDeletedSubmissionsResponse = ListDeletedSubmissionsResponse;
    type formsV4SubmissionSubmissions_universal_d_CursorPagingMetadata = CursorPagingMetadata;
    type formsV4SubmissionSubmissions_universal_d_Cursors = Cursors;
    type formsV4SubmissionSubmissions_universal_d_GetDeletedSubmissionRequest = GetDeletedSubmissionRequest;
    type formsV4SubmissionSubmissions_universal_d_GetDeletedSubmissionResponse = GetDeletedSubmissionResponse;
    type formsV4SubmissionSubmissions_universal_d_QuerySubmissionRequest = QuerySubmissionRequest;
    type formsV4SubmissionSubmissions_universal_d_CursorQuery = CursorQuery;
    type formsV4SubmissionSubmissions_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
    type formsV4SubmissionSubmissions_universal_d_Sorting = Sorting;
    type formsV4SubmissionSubmissions_universal_d_SortOrder = SortOrder;
    const formsV4SubmissionSubmissions_universal_d_SortOrder: typeof SortOrder;
    type formsV4SubmissionSubmissions_universal_d_QuerySubmissionResponse = QuerySubmissionResponse;
    type formsV4SubmissionSubmissions_universal_d_SearchSubmissionsByNamespaceRequest = SearchSubmissionsByNamespaceRequest;
    type formsV4SubmissionSubmissions_universal_d_CursorSearch = CursorSearch;
    type formsV4SubmissionSubmissions_universal_d_CursorSearchPagingMethodOneOf = CursorSearchPagingMethodOneOf;
    type formsV4SubmissionSubmissions_universal_d_SearchDetails = SearchDetails;
    type formsV4SubmissionSubmissions_universal_d_Mode = Mode;
    const formsV4SubmissionSubmissions_universal_d_Mode: typeof Mode;
    type formsV4SubmissionSubmissions_universal_d_SearchSubmissionsByNamespaceResponse = SearchSubmissionsByNamespaceResponse;
    type formsV4SubmissionSubmissions_universal_d_SearchSubmissionsByNamespaceForExportRequest = SearchSubmissionsByNamespaceForExportRequest;
    type formsV4SubmissionSubmissions_universal_d_SearchSubmissionsByNamespaceForExportResponse = SearchSubmissionsByNamespaceForExportResponse;
    type formsV4SubmissionSubmissions_universal_d_QuerySubmissionsByNamespaceRequest = QuerySubmissionsByNamespaceRequest;
    type formsV4SubmissionSubmissions_universal_d_QuerySubmissionsByNamespaceResponse = QuerySubmissionsByNamespaceResponse;
    type formsV4SubmissionSubmissions_universal_d_QuerySubmissionsByNamespaceForExportRequest = QuerySubmissionsByNamespaceForExportRequest;
    type formsV4SubmissionSubmissions_universal_d_QuerySubmissionsByNamespaceForExportResponse = QuerySubmissionsByNamespaceForExportResponse;
    type formsV4SubmissionSubmissions_universal_d_CountSubmissionsByFilterRequest = CountSubmissionsByFilterRequest;
    type formsV4SubmissionSubmissions_universal_d_CountSubmissionsByFilterResponse = CountSubmissionsByFilterResponse;
    type formsV4SubmissionSubmissions_universal_d_FormSubmissionsCount = FormSubmissionsCount;
    type formsV4SubmissionSubmissions_universal_d_CountSubmissionsRequest = CountSubmissionsRequest;
    type formsV4SubmissionSubmissions_universal_d_CountSubmissionsResponse = CountSubmissionsResponse;
    type formsV4SubmissionSubmissions_universal_d_CountDeletedSubmissionsRequest = CountDeletedSubmissionsRequest;
    type formsV4SubmissionSubmissions_universal_d_CountDeletedSubmissionsResponse = CountDeletedSubmissionsResponse;
    type formsV4SubmissionSubmissions_universal_d_FormDeletedSubmissionsCount = FormDeletedSubmissionsCount;
    type formsV4SubmissionSubmissions_universal_d_GetMediaUploadURLRequest = GetMediaUploadURLRequest;
    type formsV4SubmissionSubmissions_universal_d_GetMediaUploadURLResponse = GetMediaUploadURLResponse;
    type formsV4SubmissionSubmissions_universal_d_BulkMarkSubmissionsAsSeenRequest = BulkMarkSubmissionsAsSeenRequest;
    type formsV4SubmissionSubmissions_universal_d_BulkMarkSubmissionsAsSeenResponse = BulkMarkSubmissionsAsSeenResponse;
    type formsV4SubmissionSubmissions_universal_d_DomainEvent = DomainEvent;
    type formsV4SubmissionSubmissions_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
    type formsV4SubmissionSubmissions_universal_d_EntityCreatedEvent = EntityCreatedEvent;
    type formsV4SubmissionSubmissions_universal_d_RestoreInfo = RestoreInfo;
    type formsV4SubmissionSubmissions_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
    type formsV4SubmissionSubmissions_universal_d_EntityDeletedEvent = EntityDeletedEvent;
    type formsV4SubmissionSubmissions_universal_d_ActionEvent = ActionEvent;
    type formsV4SubmissionSubmissions_universal_d_Empty = Empty;
    type formsV4SubmissionSubmissions_universal_d_MessageEnvelope = MessageEnvelope;
    type formsV4SubmissionSubmissions_universal_d_IdentificationData = IdentificationData;
    type formsV4SubmissionSubmissions_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
    type formsV4SubmissionSubmissions_universal_d_WebhookIdentityType = WebhookIdentityType;
    const formsV4SubmissionSubmissions_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
    type formsV4SubmissionSubmissions_universal_d_UpsertContactFromSubmissionRequest = UpsertContactFromSubmissionRequest;
    type formsV4SubmissionSubmissions_universal_d_UpsertContactFromSubmissionResponse = UpsertContactFromSubmissionResponse;
    type formsV4SubmissionSubmissions_universal_d_SubmitContactResponse = SubmitContactResponse;
    type formsV4SubmissionSubmissions_universal_d_IdentityType = IdentityType;
    const formsV4SubmissionSubmissions_universal_d_IdentityType: typeof IdentityType;
    type formsV4SubmissionSubmissions_universal_d_SubmissionContactMapped = SubmissionContactMapped;
    type formsV4SubmissionSubmissions_universal_d_MarketingSubscriptionDetails = MarketingSubscriptionDetails;
    type formsV4SubmissionSubmissions_universal_d_OptInLevel = OptInLevel;
    const formsV4SubmissionSubmissions_universal_d_OptInLevel: typeof OptInLevel;
    type formsV4SubmissionSubmissions_universal_d_SubmissionContactMappingSkipped = SubmissionContactMappingSkipped;
    const formsV4SubmissionSubmissions_universal_d_createSubmission: typeof createSubmission;
    type formsV4SubmissionSubmissions_universal_d_CreateSubmissionOptions = CreateSubmissionOptions;
    type formsV4SubmissionSubmissions_universal_d_CreateSubmissionBySubmitterOptions = CreateSubmissionBySubmitterOptions;
    const formsV4SubmissionSubmissions_universal_d_bulkCreateSubmissionBySubmitter: typeof bulkCreateSubmissionBySubmitter;
    type formsV4SubmissionSubmissions_universal_d_BulkCreateSubmissionBySubmitterOptions = BulkCreateSubmissionBySubmitterOptions;
    const formsV4SubmissionSubmissions_universal_d_getSubmission: typeof getSubmission;
    const formsV4SubmissionSubmissions_universal_d_updateSubmission: typeof updateSubmission;
    type formsV4SubmissionSubmissions_universal_d_UpdateSubmission = UpdateSubmission;
    type formsV4SubmissionSubmissions_universal_d_UpdateSubmissionOptions = UpdateSubmissionOptions;
    const formsV4SubmissionSubmissions_universal_d_confirmSubmission: typeof confirmSubmission;
    const formsV4SubmissionSubmissions_universal_d_deleteSubmission: typeof deleteSubmission;
    type formsV4SubmissionSubmissions_universal_d_DeleteSubmissionOptions = DeleteSubmissionOptions;
    const formsV4SubmissionSubmissions_universal_d_bulkDeleteSubmission: typeof bulkDeleteSubmission;
    type formsV4SubmissionSubmissions_universal_d_BulkDeleteSubmissionOptions = BulkDeleteSubmissionOptions;
    const formsV4SubmissionSubmissions_universal_d_restoreSubmissionFromTrashBin: typeof restoreSubmissionFromTrashBin;
    const formsV4SubmissionSubmissions_universal_d_removeSubmissionFromTrashBin: typeof removeSubmissionFromTrashBin;
    const formsV4SubmissionSubmissions_universal_d_bulkRemoveSubmissionFromTrashBin: typeof bulkRemoveSubmissionFromTrashBin;
    type formsV4SubmissionSubmissions_universal_d_BulkRemoveSubmissionFromTrashBinOptions = BulkRemoveSubmissionFromTrashBinOptions;
    const formsV4SubmissionSubmissions_universal_d_listDeletedSubmissions: typeof listDeletedSubmissions;
    type formsV4SubmissionSubmissions_universal_d_ListDeletedSubmissionsOptions = ListDeletedSubmissionsOptions;
    const formsV4SubmissionSubmissions_universal_d_getDeletedSubmission: typeof getDeletedSubmission;
    const formsV4SubmissionSubmissions_universal_d_querySubmission: typeof querySubmission;
    type formsV4SubmissionSubmissions_universal_d_QuerySubmissionOptions = QuerySubmissionOptions;
    const formsV4SubmissionSubmissions_universal_d_searchSubmissionsByNamespace: typeof searchSubmissionsByNamespace;
    const formsV4SubmissionSubmissions_universal_d_querySubmissionsByNamespace: typeof querySubmissionsByNamespace;
    type formsV4SubmissionSubmissions_universal_d_QuerySubmissionsByNamespaceOptions = QuerySubmissionsByNamespaceOptions;
    type formsV4SubmissionSubmissions_universal_d_SubmissionsQueryResult = SubmissionsQueryResult;
    type formsV4SubmissionSubmissions_universal_d_SubmissionsQueryBuilder = SubmissionsQueryBuilder;
    const formsV4SubmissionSubmissions_universal_d_countSubmissionsByFilter: typeof countSubmissionsByFilter;
    type formsV4SubmissionSubmissions_universal_d_CountSubmissionsByFilterOptions = CountSubmissionsByFilterOptions;
    const formsV4SubmissionSubmissions_universal_d_countSubmissions: typeof countSubmissions;
    type formsV4SubmissionSubmissions_universal_d_CountSubmissionsOptions = CountSubmissionsOptions;
    const formsV4SubmissionSubmissions_universal_d_countDeletedSubmissions: typeof countDeletedSubmissions;
    type formsV4SubmissionSubmissions_universal_d_CountDeletedSubmissionsOptions = CountDeletedSubmissionsOptions;
    const formsV4SubmissionSubmissions_universal_d_getMediaUploadUrl: typeof getMediaUploadUrl;
    const formsV4SubmissionSubmissions_universal_d_bulkMarkSubmissionsAsSeen: typeof bulkMarkSubmissionsAsSeen;
    const formsV4SubmissionSubmissions_universal_d_upsertContactFromSubmission: typeof upsertContactFromSubmission;
    type formsV4SubmissionSubmissions_universal_d_UpsertContactFromSubmissionOptions = UpsertContactFromSubmissionOptions;
    namespace formsV4SubmissionSubmissions_universal_d {
        export { formsV4SubmissionSubmissions_universal_d_FormSubmission as FormSubmission, formsV4SubmissionSubmissions_universal_d_SubmissionStatus as SubmissionStatus, formsV4SubmissionSubmissions_universal_d_Submitter as Submitter, formsV4SubmissionSubmissions_universal_d_SubmitterSubmitterOneOf as SubmitterSubmitterOneOf, formsV4SubmissionSubmissions_universal_d_ExtendedFields as ExtendedFields, formsV4SubmissionSubmissions_universal_d_OrderDetails as OrderDetails, formsV4SubmissionSubmissions_universal_d_CreateSubmissionRequest as CreateSubmissionRequest, formsV4SubmissionSubmissions_universal_d_CreateSubmissionResponse as CreateSubmissionResponse, formsV4SubmissionSubmissions_universal_d_CreateSubmissionBySubmitterRequest as CreateSubmissionBySubmitterRequest, formsV4SubmissionSubmissions_universal_d_CreateSubmissionBySubmitterResponse as CreateSubmissionBySubmitterResponse, formsV4SubmissionSubmissions_universal_d_BulkCreateSubmissionBySubmitterRequest as BulkCreateSubmissionBySubmitterRequest, formsV4SubmissionSubmissions_universal_d_BulkCreateSubmissionBySubmitterData as BulkCreateSubmissionBySubmitterData, formsV4SubmissionSubmissions_universal_d_BulkCreateSubmissionBySubmitterResponse as BulkCreateSubmissionBySubmitterResponse, formsV4SubmissionSubmissions_universal_d_BulkSubmissionResult as BulkSubmissionResult, formsV4SubmissionSubmissions_universal_d_ItemMetadata as ItemMetadata, formsV4SubmissionSubmissions_universal_d_ApplicationError as ApplicationError, formsV4SubmissionSubmissions_universal_d_BulkActionMetadata as BulkActionMetadata, formsV4SubmissionSubmissions_universal_d_GetSubmissionRequest as GetSubmissionRequest, formsV4SubmissionSubmissions_universal_d_GetSubmissionResponse as GetSubmissionResponse, formsV4SubmissionSubmissions_universal_d_GetSubmissionByCheckoutIdRequest as GetSubmissionByCheckoutIdRequest, formsV4SubmissionSubmissions_universal_d_GetSubmissionByCheckoutIdResponse as GetSubmissionByCheckoutIdResponse, formsV4SubmissionSubmissions_universal_d_UpdateSubmissionRequest as UpdateSubmissionRequest, formsV4SubmissionSubmissions_universal_d_UpdateSubmissionResponse as UpdateSubmissionResponse, formsV4SubmissionSubmissions_universal_d_ConfirmSubmissionRequest as ConfirmSubmissionRequest, formsV4SubmissionSubmissions_universal_d_ConfirmSubmissionResponse as ConfirmSubmissionResponse, formsV4SubmissionSubmissions_universal_d_FormSubmissionStatusUpdatedEvent as FormSubmissionStatusUpdatedEvent, formsV4SubmissionSubmissions_universal_d_DeleteSubmissionRequest as DeleteSubmissionRequest, formsV4SubmissionSubmissions_universal_d_DeleteSubmissionResponse as DeleteSubmissionResponse, formsV4SubmissionSubmissions_universal_d_BulkDeleteSubmissionRequest as BulkDeleteSubmissionRequest, formsV4SubmissionSubmissions_universal_d_BulkDeleteSubmissionResponse as BulkDeleteSubmissionResponse, formsV4SubmissionSubmissions_universal_d_BulkDeleteSubmissionResult as BulkDeleteSubmissionResult, formsV4SubmissionSubmissions_universal_d_RestoreSubmissionFromTrashBinRequest as RestoreSubmissionFromTrashBinRequest, formsV4SubmissionSubmissions_universal_d_RestoreSubmissionFromTrashBinResponse as RestoreSubmissionFromTrashBinResponse, formsV4SubmissionSubmissions_universal_d_RemoveSubmissionFromTrashBinRequest as RemoveSubmissionFromTrashBinRequest, formsV4SubmissionSubmissions_universal_d_RemoveSubmissionFromTrashBinResponse as RemoveSubmissionFromTrashBinResponse, formsV4SubmissionSubmissions_universal_d_RemovedSubmissionFromTrash as RemovedSubmissionFromTrash, formsV4SubmissionSubmissions_universal_d_BulkRemoveSubmissionFromTrashBinRequest as BulkRemoveSubmissionFromTrashBinRequest, formsV4SubmissionSubmissions_universal_d_BulkRemoveSubmissionFromTrashBinResponse as BulkRemoveSubmissionFromTrashBinResponse, formsV4SubmissionSubmissions_universal_d_BulkRemoveSubmissionFromTrashBinResult as BulkRemoveSubmissionFromTrashBinResult, formsV4SubmissionSubmissions_universal_d_ListDeletedSubmissionsRequest as ListDeletedSubmissionsRequest, formsV4SubmissionSubmissions_universal_d_CursorPaging as CursorPaging, formsV4SubmissionSubmissions_universal_d_ListDeletedSubmissionsResponse as ListDeletedSubmissionsResponse, formsV4SubmissionSubmissions_universal_d_CursorPagingMetadata as CursorPagingMetadata, formsV4SubmissionSubmissions_universal_d_Cursors as Cursors, formsV4SubmissionSubmissions_universal_d_GetDeletedSubmissionRequest as GetDeletedSubmissionRequest, formsV4SubmissionSubmissions_universal_d_GetDeletedSubmissionResponse as GetDeletedSubmissionResponse, formsV4SubmissionSubmissions_universal_d_QuerySubmissionRequest as QuerySubmissionRequest, formsV4SubmissionSubmissions_universal_d_CursorQuery as CursorQuery, formsV4SubmissionSubmissions_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf, formsV4SubmissionSubmissions_universal_d_Sorting as Sorting, formsV4SubmissionSubmissions_universal_d_SortOrder as SortOrder, formsV4SubmissionSubmissions_universal_d_QuerySubmissionResponse as QuerySubmissionResponse, formsV4SubmissionSubmissions_universal_d_SearchSubmissionsByNamespaceRequest as SearchSubmissionsByNamespaceRequest, formsV4SubmissionSubmissions_universal_d_CursorSearch as CursorSearch, formsV4SubmissionSubmissions_universal_d_CursorSearchPagingMethodOneOf as CursorSearchPagingMethodOneOf, formsV4SubmissionSubmissions_universal_d_SearchDetails as SearchDetails, formsV4SubmissionSubmissions_universal_d_Mode as Mode, formsV4SubmissionSubmissions_universal_d_SearchSubmissionsByNamespaceResponse as SearchSubmissionsByNamespaceResponse, formsV4SubmissionSubmissions_universal_d_SearchSubmissionsByNamespaceForExportRequest as SearchSubmissionsByNamespaceForExportRequest, formsV4SubmissionSubmissions_universal_d_SearchSubmissionsByNamespaceForExportResponse as SearchSubmissionsByNamespaceForExportResponse, formsV4SubmissionSubmissions_universal_d_QuerySubmissionsByNamespaceRequest as QuerySubmissionsByNamespaceRequest, formsV4SubmissionSubmissions_universal_d_QuerySubmissionsByNamespaceResponse as QuerySubmissionsByNamespaceResponse, formsV4SubmissionSubmissions_universal_d_QuerySubmissionsByNamespaceForExportRequest as QuerySubmissionsByNamespaceForExportRequest, formsV4SubmissionSubmissions_universal_d_QuerySubmissionsByNamespaceForExportResponse as QuerySubmissionsByNamespaceForExportResponse, formsV4SubmissionSubmissions_universal_d_CountSubmissionsByFilterRequest as CountSubmissionsByFilterRequest, formsV4SubmissionSubmissions_universal_d_CountSubmissionsByFilterResponse as CountSubmissionsByFilterResponse, formsV4SubmissionSubmissions_universal_d_FormSubmissionsCount as FormSubmissionsCount, formsV4SubmissionSubmissions_universal_d_CountSubmissionsRequest as CountSubmissionsRequest, formsV4SubmissionSubmissions_universal_d_CountSubmissionsResponse as CountSubmissionsResponse, formsV4SubmissionSubmissions_universal_d_CountDeletedSubmissionsRequest as CountDeletedSubmissionsRequest, formsV4SubmissionSubmissions_universal_d_CountDeletedSubmissionsResponse as CountDeletedSubmissionsResponse, formsV4SubmissionSubmissions_universal_d_FormDeletedSubmissionsCount as FormDeletedSubmissionsCount, formsV4SubmissionSubmissions_universal_d_GetMediaUploadURLRequest as GetMediaUploadURLRequest, formsV4SubmissionSubmissions_universal_d_GetMediaUploadURLResponse as GetMediaUploadURLResponse, formsV4SubmissionSubmissions_universal_d_BulkMarkSubmissionsAsSeenRequest as BulkMarkSubmissionsAsSeenRequest, formsV4SubmissionSubmissions_universal_d_BulkMarkSubmissionsAsSeenResponse as BulkMarkSubmissionsAsSeenResponse, formsV4SubmissionSubmissions_universal_d_DomainEvent as DomainEvent, formsV4SubmissionSubmissions_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf, formsV4SubmissionSubmissions_universal_d_EntityCreatedEvent as EntityCreatedEvent, formsV4SubmissionSubmissions_universal_d_RestoreInfo as RestoreInfo, formsV4SubmissionSubmissions_universal_d_EntityUpdatedEvent as EntityUpdatedEvent, formsV4SubmissionSubmissions_universal_d_EntityDeletedEvent as EntityDeletedEvent, formsV4SubmissionSubmissions_universal_d_ActionEvent as ActionEvent, formsV4SubmissionSubmissions_universal_d_Empty as Empty, formsV4SubmissionSubmissions_universal_d_MessageEnvelope as MessageEnvelope, formsV4SubmissionSubmissions_universal_d_IdentificationData as IdentificationData, formsV4SubmissionSubmissions_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf, formsV4SubmissionSubmissions_universal_d_WebhookIdentityType as WebhookIdentityType, formsV4SubmissionSubmissions_universal_d_UpsertContactFromSubmissionRequest as UpsertContactFromSubmissionRequest, formsV4SubmissionSubmissions_universal_d_UpsertContactFromSubmissionResponse as UpsertContactFromSubmissionResponse, formsV4SubmissionSubmissions_universal_d_SubmitContactResponse as SubmitContactResponse, formsV4SubmissionSubmissions_universal_d_IdentityType as IdentityType, formsV4SubmissionSubmissions_universal_d_SubmissionContactMapped as SubmissionContactMapped, formsV4SubmissionSubmissions_universal_d_MarketingSubscriptionDetails as MarketingSubscriptionDetails, formsV4SubmissionSubmissions_universal_d_OptInLevel as OptInLevel, formsV4SubmissionSubmissions_universal_d_SubmissionContactMappingSkipped as SubmissionContactMappingSkipped, formsV4SubmissionSubmissions_universal_d_createSubmission as createSubmission, formsV4SubmissionSubmissions_universal_d_CreateSubmissionOptions as CreateSubmissionOptions, formsV4SubmissionSubmissions_universal_d_CreateSubmissionBySubmitterOptions as CreateSubmissionBySubmitterOptions, formsV4SubmissionSubmissions_universal_d_bulkCreateSubmissionBySubmitter as bulkCreateSubmissionBySubmitter, formsV4SubmissionSubmissions_universal_d_BulkCreateSubmissionBySubmitterOptions as BulkCreateSubmissionBySubmitterOptions, formsV4SubmissionSubmissions_universal_d_getSubmission as getSubmission, formsV4SubmissionSubmissions_universal_d_updateSubmission as updateSubmission, formsV4SubmissionSubmissions_universal_d_UpdateSubmission as UpdateSubmission, formsV4SubmissionSubmissions_universal_d_UpdateSubmissionOptions as UpdateSubmissionOptions, formsV4SubmissionSubmissions_universal_d_confirmSubmission as confirmSubmission, formsV4SubmissionSubmissions_universal_d_deleteSubmission as deleteSubmission, formsV4SubmissionSubmissions_universal_d_DeleteSubmissionOptions as DeleteSubmissionOptions, formsV4SubmissionSubmissions_universal_d_bulkDeleteSubmission as bulkDeleteSubmission, formsV4SubmissionSubmissions_universal_d_BulkDeleteSubmissionOptions as BulkDeleteSubmissionOptions, formsV4SubmissionSubmissions_universal_d_restoreSubmissionFromTrashBin as restoreSubmissionFromTrashBin, formsV4SubmissionSubmissions_universal_d_removeSubmissionFromTrashBin as removeSubmissionFromTrashBin, formsV4SubmissionSubmissions_universal_d_bulkRemoveSubmissionFromTrashBin as bulkRemoveSubmissionFromTrashBin, formsV4SubmissionSubmissions_universal_d_BulkRemoveSubmissionFromTrashBinOptions as BulkRemoveSubmissionFromTrashBinOptions, formsV4SubmissionSubmissions_universal_d_listDeletedSubmissions as listDeletedSubmissions, formsV4SubmissionSubmissions_universal_d_ListDeletedSubmissionsOptions as ListDeletedSubmissionsOptions, formsV4SubmissionSubmissions_universal_d_getDeletedSubmission as getDeletedSubmission, formsV4SubmissionSubmissions_universal_d_querySubmission as querySubmission, formsV4SubmissionSubmissions_universal_d_QuerySubmissionOptions as QuerySubmissionOptions, formsV4SubmissionSubmissions_universal_d_searchSubmissionsByNamespace as searchSubmissionsByNamespace, formsV4SubmissionSubmissions_universal_d_querySubmissionsByNamespace as querySubmissionsByNamespace, formsV4SubmissionSubmissions_universal_d_QuerySubmissionsByNamespaceOptions as QuerySubmissionsByNamespaceOptions, formsV4SubmissionSubmissions_universal_d_SubmissionsQueryResult as SubmissionsQueryResult, formsV4SubmissionSubmissions_universal_d_SubmissionsQueryBuilder as SubmissionsQueryBuilder, formsV4SubmissionSubmissions_universal_d_countSubmissionsByFilter as countSubmissionsByFilter, formsV4SubmissionSubmissions_universal_d_CountSubmissionsByFilterOptions as CountSubmissionsByFilterOptions, formsV4SubmissionSubmissions_universal_d_countSubmissions as countSubmissions, formsV4SubmissionSubmissions_universal_d_CountSubmissionsOptions as CountSubmissionsOptions, formsV4SubmissionSubmissions_universal_d_countDeletedSubmissions as countDeletedSubmissions, formsV4SubmissionSubmissions_universal_d_CountDeletedSubmissionsOptions as CountDeletedSubmissionsOptions, formsV4SubmissionSubmissions_universal_d_getMediaUploadUrl as getMediaUploadUrl, formsV4SubmissionSubmissions_universal_d_bulkMarkSubmissionsAsSeen as bulkMarkSubmissionsAsSeen, formsV4SubmissionSubmissions_universal_d_upsertContactFromSubmission as upsertContactFromSubmission, formsV4SubmissionSubmissions_universal_d_UpsertContactFromSubmissionOptions as UpsertContactFromSubmissionOptions, };
    }
    export { formsV4SubmissionSubmissions_universal_d as submissions };
}
