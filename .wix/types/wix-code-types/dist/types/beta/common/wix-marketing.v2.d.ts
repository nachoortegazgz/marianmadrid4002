declare module "wix-marketing.v2" {
  /**
   * The `Coupon` object represents all information available for a coupon
   * including its basic definition and runtime information.
   */
  interface Coupon {
      /** Coupon ID. */
      _id?: string;
      /** Basic coupon info. */
      specification?: Specification;
      /** Time the coupon was created (UNIX Epoch time in milliseconds). */
      dateCreated?: string;
      /** Whether the coupon is expired. */
      expired?: boolean;
      /** How many times this coupon has been used. */
      numberOfUsages?: number;
      /** Coupon display information. */
      displayData?: DisplayData;
      /**
       * ID of the app that created the coupon. Empty if created by the site owner.
       * @readonly
       */
      appId?: string | null;
  }
  interface MediaItem {
      /** Media item URL. */
      url?: string;
      /** Media item width. */
      width?: number;
      /** Media item height. */
      height?: number;
  }
  /** Coupon information */
  interface Specification extends SpecificationScopeOrMinSubtotalOneOf, SpecificationBehaviorOneOf {
      /** Specifies the type of line items this coupon will apply to. See the [introduction](#introduction) for a table of currently supported coupon scopes. */
      scope?: Scope;
      /** The coupon is only applicable when the order subtotal is over this amount. */
      minimumSubtotal?: number | null;
      /** Discount as a fixed amount. */
      moneyOffAmount?: number;
      /** Discount as a percentage. */
      percentOffRate?: number;
      /**
       * Free shipping.
       *
       * If `true`, the coupon applies to all items in all `namespaces`.
       */
      freeShipping?: boolean;
      /** Fixed sale price. */
      fixedPriceAmount?: number;
      /**
       * Receive free products when making a purchase.
       *
       * For example, purchase `x` number of products and receive `y` number of products for free.
       */
      buyXGetY?: BuyXGetY;
      /** Name of coupon. */
      name?: string | null;
      /**
       * Coupon code. Must be unique for all coupons on your site.
       *
       * Max: 20 characters
       */
      code?: string | null;
      /** Coupon valid from this date and time. */
      startTime?: string | null;
      /** Coupon expires at this date and time. */
      expirationTime?: string | null;
      /**
       * Maximum number of times the coupon can be used.
       *
       * >**Note:** Multiple purchases by the same customer or purchases by different customers are both counted toward `usageLimit`.
       */
      usageLimit?: number | null;
      /** Maximum number of times the coupon can be used per customer. */
      limitPerCustomer?: number | null;
      /**
       * Whether the coupon is limited to one item.
       *
       * If `true` and a customer pays for multiple items, the discount applies to only the lowest priced item.
       * Coupons with a `bookings` `scope.namespace` are always limited to one item.
       */
      limitedToOneItem?: boolean | null;
      /**
       * Whether the coupon applies to subscription products.
       *
       * If set to `true`, the discount will apply to all billing cycles.
       */
      appliesToSubscriptions?: boolean | null;
      /**
       * Specifies the amount of discounted cycles for a subscription item.
       *
       * + Can only be set when `scope.namespace = pricingPlans`.
       * + If `discountedCycleCount` is empty, the coupon applies to all available cycles.
       * + `discountedCycleCount` is ignored if `appliesToSubscriptions = true`.
       *
       * Max: `999`
       */
      discountedCycleCount?: number | null;
      /**
       * Whether the coupon is currently [active](https://support.wix.com/en/article/wix-stores-activating-and-deactivating-coupons).
       *
       * Default: `true`
       */
      active?: boolean | null;
      /** Coupon type. Read-only. */
      type?: string;
  }
  /** @oneof */
  interface SpecificationScopeOrMinSubtotalOneOf {
      /** Specifies the type of line items this coupon will apply to. See the [introduction](#introduction) for a table of currently supported coupon scopes. */
      scope?: Scope;
      /** The coupon is only applicable when the order subtotal is over this amount. */
      minimumSubtotal?: number | null;
  }
  /** @oneof */
  interface SpecificationBehaviorOneOf {
      /** Discount as a fixed amount. */
      moneyOffAmount?: number;
      /** Discount as a percentage. */
      percentOffRate?: number;
      /**
       * Free shipping.
       *
       * If `true`, the coupon applies to all items in all `namespaces`.
       */
      freeShipping?: boolean;
      /** Fixed sale price. */
      fixedPriceAmount?: number;
      /**
       * Receive free products when making a purchase.
       *
       * For example, purchase `x` number of products and receive `y` number of products for free.
       */
      buyXGetY?: BuyXGetY;
  }
  interface Scope {
      /** Scope namespace (Wix Stores, Wix Bookings, Wix Events, Wix Pricing Plans) */
      namespace?: string;
      /** Group within a `namespace` for which the coupon is applicable. If no group is specified, the coupon applies to all items in the namespace. `group` is required in some cases. See the table in the [introduction](#introduction) for a list of currently supported groups for each namespace. */
      group?: Group;
  }
  interface Group {
      /** Name of coupon scope's group (e.g., product or collection in Wix Stores). See the [introduction](#introduction) for a table of currently supported coupon scopes. */
      name?: string;
      /** ID of the specific item in the group for which the coupon is applicable. If no `entityId` is specified, the coupon applies to all items in the group. In some cases when a group is specified, an `entityId` is required. See the [introduction](#introduction) for a list of currently supported entities for each namespace and group. */
      entityId?: string | null;
  }
  /** Coupon type. */
  interface BuyXGetY {
      /** Number of purchased items required to receive free items. */
      x?: number;
      /** Number of items received for free if required number of items were purchased. */
      y?: number;
  }
  interface DisplayData {
      /** Coupon name to be displayed. */
      name?: string;
      /** Displayed media item information. */
      mediaItem?: MediaItem;
      /** Formatted price for display. */
      formattedPrice?: string | null;
  }
  interface CreateCouponRequest {
      /** Coupon to create. */
      specification?: Specification;
  }
  interface CreateCouponResponse {
      /** ID of the newly created coupon. */
      _id?: string;
  }
  interface UpdateCouponRequest {
      /** ID of the coupon to update. */
      _id: string;
      /**
       * Field mask of fields to update (required - passing an empty `fieldMask` will return an error). Valid field masks are any of those in the `specification` field.
       * @internal
       */
      fieldMask?: string[];
      /** Coupon information to update. */
      specification?: Specification;
  }
  interface UpdateCouponResponse {
  }
  interface GetCouponRequest {
      /** ID of the coupon to retrieve. */
      _id: string;
  }
  interface GetCouponResponse {
      /** Retrieved coupon. */
      coupon?: Coupon;
  }
  interface DeleteCouponRequest {
      /** ID of the coupon to delete. */
      _id: string;
  }
  interface DeleteCouponResponse {
  }
  interface QueryCouponsRequest {
      query?: Query;
  }
  interface Query {
      /** Optional pagination parameters */
      paging?: Paging;
      /** Filter string (e.g., when {"expired":"true"}, expired coupons will be returned). */
      filter?: string | null;
      /** Sort string. */
      sort?: string | null;
  }
  interface Paging {
      /** Number of items to load. */
      limit?: number | null;
      /** Offset since the beginning of the collection. */
      offset?: number | null;
  }
  interface QueryCouponsResponse {
      /** Returned coupons. */
      coupons?: Coupon[];
      /** Total results. */
      totalResults?: number | null;
  }
  interface CalculateRequest extends CalculateRequestCalculateByOneOf {
      /** For calculating by coupon ID (usually for cart calculate phase). */
      _id?: string;
      /** For calculating by coupon code (usually for apply coupon phase - for validation). */
      code: string;
      /** Type of in-memory discount that can be applied when coupon doesn't exist. */
      discount?: Specification;
      /** Cart to which the coupon will be applied. */
      cart?: Cart;
      /** Currency symbol for error message and applied coupon. */
      currencySymbol?: string;
      /** Round the result to <precision> places after the decimal dot. Defaults to 2 if not provided. */
      precision?: number | null;
      /** Unique identifier of a buyer that applied the coupon. Used to limit coupon use per customer. */
      uniqueUserIdentifier?: string | null;
  }
  /** @oneof */
  interface CalculateRequestCalculateByOneOf {
      /** For calculating by coupon ID (usually for cart calculate phase). */
      _id?: string;
      /** For calculating by coupon code (usually for apply coupon phase - for validation). */
      code?: string;
      /** Type of in-memory discount that can be applied when coupon doesn't exist. */
      discount?: Specification;
  }
  /**
   * Cart is passed to coupon service's apply function in order to
   * apply the coupons calculation on it
   */
  interface Cart {
      /** Array of cart line items. */
      lineItems?: LineItem[];
      /** Cart shipping information. */
      shipping?: Shipping;
      /** Summary of cart totals. */
      totals?: Totals;
  }
  interface AppliedDiscount {
      /** Discount amount, in case discount is applied per line. */
      discountAmount?: number;
      /** Line item price after applied discount. */
      afterDiscountAmount?: number;
  }
  /** represents a single line in the cart */
  interface LineItem {
      /** Cart line item ID - represents index position (required). */
      lineId?: string;
      /** Item ID in the external system - will usually be a product ID. */
      externalId?: string;
      /** Line item amount (while quantity = 1). */
      amount?: number;
      /** Line item quantity. Must be greater than 0. */
      quantity?: number;
      /** Coupon scopes this line item applies to. */
      scopes?: Scope[];
      /** Applied discount on line item after calculation. */
      appliedDiscount?: AppliedDiscount;
      /** Whether the line item is of type subscription. */
      subscription?: boolean;
  }
  /**
   * represents the shipping line in the cart
   * the coupons need to know about it because of the free shipping coupon
   */
  interface Shipping {
      /** Shipping price before applying the coupon. */
      amount?: number;
      /** Discount on shipping price. */
      appliedDiscount?: AppliedDiscount;
  }
  interface Totals {
      /** Cart subtotal. */
      subTotal?: number;
      /** Sum of all discounts. */
      discount?: number;
      total?: number;
  }
  interface CalculateResponse {
      /** Cart after applying the coupon. */
      cart?: Cart;
      /** Applied coupon information. */
      appliedCoupon?: AppliedCoupon;
      /** Errors, in case call failed. */
      error?: Error[];
  }
  interface AppliedCoupon {
      /** Name of the coupon applied. */
      name?: string;
      /** Coupon ID. */
      _id?: string;
      /** Coupon code. */
      code?: string;
      /** Whether the coupon type entitles free shipping. */
      isFreeShipping?: boolean;
      /** Coupon type (e.g., moneyOffAmount, buyXGetY, percentOffRate). */
      couponType?: string;
      /** Discount value (e.g., $10, 10%). */
      discountValue?: string;
      /** Amount of discounted cycles for subscription item. None specifies for all cycles. */
      discountedCycleCount?: number | null;
  }
  interface Error {
      /** error code */
      code?: string;
      /** descriptive error message */
      message?: string;
  }
  interface IncreaseUsageRequest {
      /** Coupon ID. */
      _id: string;
      /** Unique ID of the entity that the coupon was applied to (e.g., orderId). */
      usedBy?: string | null;
      /** Unique identifier of a buyer that applied the coupon. Used to limit coupon use per customer. */
      uniqueUserIdentifier?: string | null;
      /** ID of app that applied the coupon (e.g. bookings appDefId). */
      wixAppId?: string | null;
  }
  interface IncreaseUsageResponse {
      /** Errors, in case call failed. */
      error?: Error[];
  }
  interface CouponApplied {
      /** Applied coupon information. */
      coupon?: Coupon;
      /**
       * ID of Wix app that applied the coupon. Supported values:
       * + Wix Stores - `1380b703-ce81-ff05-f115-39571d94dfcd`
       * + Wix Bookings - `13d21c63-b5ec-5912-8397-c3a5ddb27a97`
       * + Wix Events - `140603ad-af8d-84a5-2c80-a0f60cb47351`
       */
      wixAppId?: string;
      /** ID of the entity that the coupon was applied to (orderId, bookingId, etc.). */
      wixAppOrderId?: string;
  }
  interface HasCouponsRequest {
  }
  interface HasCouponsResponse {
      /** True if site has ever had a coupon. */
      hasCoupons?: boolean;
  }
  interface BulkDeleteCouponsRequest {
      /** IDs of coupons to delete. */
      ids?: string[];
  }
  interface BulkDeleteCouponsResponse {
      /** Item metadata. */
      results?: ItemMetadata[];
      /** Bulk action metadata. */
      deleteMetadata?: BulkActionMetadata;
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
  interface BulkCreateCouponsRequest {
      /** List of coupon specifications to be created. */
      specifications?: Specification[];
      /**
       * Whether to return full coupon entity in the response.
       *
       * Default: `false`
       */
      returnFullEntity?: boolean;
  }
  interface BulkCreateCouponsResponse {
      /** Items created by bulk action. */
      results?: BulkCreateCouponResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkCreateCouponResult {
      /** Item metadata. */
      itemMetadata?: ItemMetadata;
      /** New coupons. */
      coupon?: Coupon;
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
   * Creates a new coupon.
   *
   * The `createCoupon()` function returns a Promise that resolves to the new coupon when it is created.
   *
   * When creating a coupon, the `specification` object must contain values for `name`, `code`, `startTime`, and either `scope` or `minimumSubtotal`. The exception is for a `freeShipping` coupon type, for which you cannot apply a `scope` and `minimumSubtotal` is optional.
   *
   * The coupon `scope` defines the items a coupon applies to. A coupon can apply to all items in a specific Wix application, a group within the application, or a single item within a group. See the [introduction](#introduction) for a table of currently supported coupon scopes.
   *
   * The `specification` object must also contain a value for exactly 1 of the following coupon properties. This defines the coupon type.
   *
   * + `"moneyOffAmount"`
   * + `"percentOffRate"`
   * + `"freeShipping"`
   * + `"fixedPriceAmount"`
   * + `"buyXGetY"`
   * @param specification - Coupon to create.
   * @public
   * @requiredField specification
   * @permissionId COUPONS.MANAGE
   * @adminMethod
   */
  function createCoupon(specification: Specification): Promise<CreateCouponResponse>;
  /**
   * Updates a coupon.
   *
   * The `updateCoupon()` function returns a Promise that resolves when the coupon is updated.
   *
   * Only the properties passed in the `specification` object will be updated. All other properties will remain the same.
   *
   * To remove a value from the coupon, pass its corresponding property with a value of `null`.
   *
   * When updating a coupon, you cannot change the coupon's `type`. For example, if the coupon's `type` is `moneyOffAmount`, you cannot change it to `fixedPriceAmount`. You can update the coupon type's value. For example, you can change the value of `moneyOffAmount` from `5` to `10`.
   *
   * The coupon `scope` defines the items a coupon applies to. A coupon can apply to all items in a specific Wix application, a group within the application, or a single item within a group.
   * See the [introduction](#introduction) for a table of currently supported coupon scopes.
   * @param _id - ID of the coupon to update.
   * @param specification - Coupon information to update.
   * @param fieldMask - Field mask of fields to update (required - passing an empty `fieldMask` will return an error). Valid field masks are any of those in the `specification` field.
   * @public
   * @requiredField _id
   * @requiredField fieldMask
   * @requiredField specification
   * @permissionId COUPONS.MANAGE
   * @adminMethod
   */
  function updateCoupon(_id: string, specification: Specification, fieldMask: string[]): Promise<void>;
  /**
   * Retrieves a coupon by ID.
   *
   * The `getCoupon()` function returns a Promise that resolves when the specified coupon is retrieved.
   * @param _id - ID of the coupon to retrieve.
   * @public
   * @requiredField _id
   * @permissionId COUPONS.MANAGE
   * @adminMethod
   * @returns Retrieved coupon.
   */
  function getCoupon(_id: string): Promise<Coupon>;
  /**
   * Deletes a coupon.
   *
   * The `deleteCoupon()` function returns a Promise that resolves when the specified coupon is deleted.
   * @param _id - ID of the coupon to delete.
   * @public
   * @requiredField _id
   * @permissionId COUPONS.MANAGE
   * @adminMethod
   */
  function deleteCoupon(_id: string): Promise<void>;
  /**
   * Retrieves a list of up to 100 coupons with pagination and filters.
   *
   * The `queryCoupons()` function returns a Promise that resolves when the coupons are retrieved.
   * @public
   * @requiredField query
   * @permissionId COUPONS.MANAGE
   * @adminMethod
   */
  function queryCoupons(query: Query): Promise<QueryCouponsResponse>;
  /**
   * Calculate a cart's total price after applying a coupon.
   * Pass the Cart with line items and shipping, and the cart will be returned
   * along with its coupon's calculations applied.
   * @param code - For calculating by coupon code (usually for apply coupon phase - for validation).
   * @internal
   * @documentationMaturity preview
   * @requiredField code
   * @permissionId COUPONS.MANAGE
   * @adminMethod
   */
  function calculateCart(code: string, options?: CalculateCartOptions): Promise<CalculateResponse>;
  interface CalculateCartOptions extends CalculateRequestCalculateByOneOf {
      /** For calculating by coupon ID (usually for cart calculate phase). */
      _id?: string;
      /** Type of in-memory discount that can be applied when coupon doesn't exist. */
      discount?: Specification;
      /** Cart to which the coupon will be applied. */
      cart?: Cart;
      /** Currency symbol for error message and applied coupon. */
      currencySymbol?: string;
      /** Round the result to <precision> places after the decimal dot. Defaults to 2 if not provided. */
      precision?: number | null;
      /** Unique identifier of a buyer that applied the coupon. Used to limit coupon use per customer. */
      uniqueUserIdentifier?: string | null;
  }
  /**
   * It is the responsibility of the payment process to call this endpoint after
   * the coupon was used.
   * @param _id - Coupon ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @adminMethod
   */
  function increaseUsage(_id: string, options?: IncreaseUsageOptions): Promise<IncreaseUsageResponse>;
  interface IncreaseUsageOptions {
      /** Unique ID of the entity that the coupon was applied to (e.g., orderId). */
      usedBy?: string | null;
      /** Unique identifier of a buyer that applied the coupon. Used to limit coupon use per customer. */
      uniqueUserIdentifier?: string | null;
      /** ID of app that applied the coupon (e.g. bookings appDefId). */
      wixAppId?: string | null;
  }
  /**
   * Returns true if the site has ever had any coupons (even if they have all been deleted or deactivated).
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function hasCoupons(): Promise<HasCouponsResponse>;
  /**
   * Deletes the specified coupons.
   *
   * The `bulkDeleteCoupons()` function returns a Promise that resolves when the coupons are deleted.
   * @param ids - IDs of coupons to delete.
   * @public
   * @requiredField ids
   * @permissionId COUPONS.MANAGE
   * @adminMethod
   */
  function bulkDeleteCoupons(ids: string[]): Promise<BulkDeleteCouponsResponse>;
  /**
   * Creates multiple coupons.
   *
   * The `bulkCreateCoupons()` function returns a Promise that resolves when the coupons are created.
   * @param specifications - List of coupon specifications to be created.
   * @public
   * @requiredField specifications
   * @permissionId COUPONS.MANAGE
   * @adminMethod
   */
  function bulkCreateCoupons(specifications: Specification[], options?: BulkCreateCouponsOptions): Promise<BulkCreateCouponsResponse>;
  interface BulkCreateCouponsOptions {
      /**
       * Whether to return full coupon entity in the response.
       *
       * Default: `false`
       */
      returnFullEntity?: boolean;
  }
  
  type ecommerceCouponsV2Coupon_universal_d_Coupon = Coupon;
  type ecommerceCouponsV2Coupon_universal_d_MediaItem = MediaItem;
  type ecommerceCouponsV2Coupon_universal_d_Specification = Specification;
  type ecommerceCouponsV2Coupon_universal_d_SpecificationScopeOrMinSubtotalOneOf = SpecificationScopeOrMinSubtotalOneOf;
  type ecommerceCouponsV2Coupon_universal_d_SpecificationBehaviorOneOf = SpecificationBehaviorOneOf;
  type ecommerceCouponsV2Coupon_universal_d_Scope = Scope;
  type ecommerceCouponsV2Coupon_universal_d_Group = Group;
  type ecommerceCouponsV2Coupon_universal_d_BuyXGetY = BuyXGetY;
  type ecommerceCouponsV2Coupon_universal_d_DisplayData = DisplayData;
  type ecommerceCouponsV2Coupon_universal_d_CreateCouponRequest = CreateCouponRequest;
  type ecommerceCouponsV2Coupon_universal_d_CreateCouponResponse = CreateCouponResponse;
  type ecommerceCouponsV2Coupon_universal_d_UpdateCouponRequest = UpdateCouponRequest;
  type ecommerceCouponsV2Coupon_universal_d_UpdateCouponResponse = UpdateCouponResponse;
  type ecommerceCouponsV2Coupon_universal_d_GetCouponRequest = GetCouponRequest;
  type ecommerceCouponsV2Coupon_universal_d_GetCouponResponse = GetCouponResponse;
  type ecommerceCouponsV2Coupon_universal_d_DeleteCouponRequest = DeleteCouponRequest;
  type ecommerceCouponsV2Coupon_universal_d_DeleteCouponResponse = DeleteCouponResponse;
  type ecommerceCouponsV2Coupon_universal_d_QueryCouponsRequest = QueryCouponsRequest;
  type ecommerceCouponsV2Coupon_universal_d_Query = Query;
  type ecommerceCouponsV2Coupon_universal_d_Paging = Paging;
  type ecommerceCouponsV2Coupon_universal_d_QueryCouponsResponse = QueryCouponsResponse;
  type ecommerceCouponsV2Coupon_universal_d_CalculateRequest = CalculateRequest;
  type ecommerceCouponsV2Coupon_universal_d_CalculateRequestCalculateByOneOf = CalculateRequestCalculateByOneOf;
  type ecommerceCouponsV2Coupon_universal_d_Cart = Cart;
  type ecommerceCouponsV2Coupon_universal_d_AppliedDiscount = AppliedDiscount;
  type ecommerceCouponsV2Coupon_universal_d_LineItem = LineItem;
  type ecommerceCouponsV2Coupon_universal_d_Shipping = Shipping;
  type ecommerceCouponsV2Coupon_universal_d_Totals = Totals;
  type ecommerceCouponsV2Coupon_universal_d_CalculateResponse = CalculateResponse;
  type ecommerceCouponsV2Coupon_universal_d_AppliedCoupon = AppliedCoupon;
  type ecommerceCouponsV2Coupon_universal_d_Error = Error;
  type ecommerceCouponsV2Coupon_universal_d_IncreaseUsageRequest = IncreaseUsageRequest;
  type ecommerceCouponsV2Coupon_universal_d_IncreaseUsageResponse = IncreaseUsageResponse;
  type ecommerceCouponsV2Coupon_universal_d_CouponApplied = CouponApplied;
  type ecommerceCouponsV2Coupon_universal_d_HasCouponsRequest = HasCouponsRequest;
  type ecommerceCouponsV2Coupon_universal_d_HasCouponsResponse = HasCouponsResponse;
  type ecommerceCouponsV2Coupon_universal_d_BulkDeleteCouponsRequest = BulkDeleteCouponsRequest;
  type ecommerceCouponsV2Coupon_universal_d_BulkDeleteCouponsResponse = BulkDeleteCouponsResponse;
  type ecommerceCouponsV2Coupon_universal_d_ItemMetadata = ItemMetadata;
  type ecommerceCouponsV2Coupon_universal_d_ApplicationError = ApplicationError;
  type ecommerceCouponsV2Coupon_universal_d_BulkActionMetadata = BulkActionMetadata;
  type ecommerceCouponsV2Coupon_universal_d_BulkCreateCouponsRequest = BulkCreateCouponsRequest;
  type ecommerceCouponsV2Coupon_universal_d_BulkCreateCouponsResponse = BulkCreateCouponsResponse;
  type ecommerceCouponsV2Coupon_universal_d_BulkCreateCouponResult = BulkCreateCouponResult;
  const ecommerceCouponsV2Coupon_universal_d_createCoupon: typeof createCoupon;
  const ecommerceCouponsV2Coupon_universal_d_updateCoupon: typeof updateCoupon;
  const ecommerceCouponsV2Coupon_universal_d_getCoupon: typeof getCoupon;
  const ecommerceCouponsV2Coupon_universal_d_deleteCoupon: typeof deleteCoupon;
  const ecommerceCouponsV2Coupon_universal_d_queryCoupons: typeof queryCoupons;
  const ecommerceCouponsV2Coupon_universal_d_calculateCart: typeof calculateCart;
  type ecommerceCouponsV2Coupon_universal_d_CalculateCartOptions = CalculateCartOptions;
  const ecommerceCouponsV2Coupon_universal_d_increaseUsage: typeof increaseUsage;
  type ecommerceCouponsV2Coupon_universal_d_IncreaseUsageOptions = IncreaseUsageOptions;
  const ecommerceCouponsV2Coupon_universal_d_hasCoupons: typeof hasCoupons;
  const ecommerceCouponsV2Coupon_universal_d_bulkDeleteCoupons: typeof bulkDeleteCoupons;
  const ecommerceCouponsV2Coupon_universal_d_bulkCreateCoupons: typeof bulkCreateCoupons;
  type ecommerceCouponsV2Coupon_universal_d_BulkCreateCouponsOptions = BulkCreateCouponsOptions;
  namespace ecommerceCouponsV2Coupon_universal_d {
    export {
      ecommerceCouponsV2Coupon_universal_d_Coupon as Coupon,
      ecommerceCouponsV2Coupon_universal_d_MediaItem as MediaItem,
      ecommerceCouponsV2Coupon_universal_d_Specification as Specification,
      ecommerceCouponsV2Coupon_universal_d_SpecificationScopeOrMinSubtotalOneOf as SpecificationScopeOrMinSubtotalOneOf,
      ecommerceCouponsV2Coupon_universal_d_SpecificationBehaviorOneOf as SpecificationBehaviorOneOf,
      ecommerceCouponsV2Coupon_universal_d_Scope as Scope,
      ecommerceCouponsV2Coupon_universal_d_Group as Group,
      ecommerceCouponsV2Coupon_universal_d_BuyXGetY as BuyXGetY,
      ecommerceCouponsV2Coupon_universal_d_DisplayData as DisplayData,
      ecommerceCouponsV2Coupon_universal_d_CreateCouponRequest as CreateCouponRequest,
      ecommerceCouponsV2Coupon_universal_d_CreateCouponResponse as CreateCouponResponse,
      ecommerceCouponsV2Coupon_universal_d_UpdateCouponRequest as UpdateCouponRequest,
      ecommerceCouponsV2Coupon_universal_d_UpdateCouponResponse as UpdateCouponResponse,
      ecommerceCouponsV2Coupon_universal_d_GetCouponRequest as GetCouponRequest,
      ecommerceCouponsV2Coupon_universal_d_GetCouponResponse as GetCouponResponse,
      ecommerceCouponsV2Coupon_universal_d_DeleteCouponRequest as DeleteCouponRequest,
      ecommerceCouponsV2Coupon_universal_d_DeleteCouponResponse as DeleteCouponResponse,
      ecommerceCouponsV2Coupon_universal_d_QueryCouponsRequest as QueryCouponsRequest,
      ecommerceCouponsV2Coupon_universal_d_Query as Query,
      ecommerceCouponsV2Coupon_universal_d_Paging as Paging,
      ecommerceCouponsV2Coupon_universal_d_QueryCouponsResponse as QueryCouponsResponse,
      ecommerceCouponsV2Coupon_universal_d_CalculateRequest as CalculateRequest,
      ecommerceCouponsV2Coupon_universal_d_CalculateRequestCalculateByOneOf as CalculateRequestCalculateByOneOf,
      ecommerceCouponsV2Coupon_universal_d_Cart as Cart,
      ecommerceCouponsV2Coupon_universal_d_AppliedDiscount as AppliedDiscount,
      ecommerceCouponsV2Coupon_universal_d_LineItem as LineItem,
      ecommerceCouponsV2Coupon_universal_d_Shipping as Shipping,
      ecommerceCouponsV2Coupon_universal_d_Totals as Totals,
      ecommerceCouponsV2Coupon_universal_d_CalculateResponse as CalculateResponse,
      ecommerceCouponsV2Coupon_universal_d_AppliedCoupon as AppliedCoupon,
      ecommerceCouponsV2Coupon_universal_d_Error as Error,
      ecommerceCouponsV2Coupon_universal_d_IncreaseUsageRequest as IncreaseUsageRequest,
      ecommerceCouponsV2Coupon_universal_d_IncreaseUsageResponse as IncreaseUsageResponse,
      ecommerceCouponsV2Coupon_universal_d_CouponApplied as CouponApplied,
      ecommerceCouponsV2Coupon_universal_d_HasCouponsRequest as HasCouponsRequest,
      ecommerceCouponsV2Coupon_universal_d_HasCouponsResponse as HasCouponsResponse,
      ecommerceCouponsV2Coupon_universal_d_BulkDeleteCouponsRequest as BulkDeleteCouponsRequest,
      ecommerceCouponsV2Coupon_universal_d_BulkDeleteCouponsResponse as BulkDeleteCouponsResponse,
      ecommerceCouponsV2Coupon_universal_d_ItemMetadata as ItemMetadata,
      ecommerceCouponsV2Coupon_universal_d_ApplicationError as ApplicationError,
      ecommerceCouponsV2Coupon_universal_d_BulkActionMetadata as BulkActionMetadata,
      ecommerceCouponsV2Coupon_universal_d_BulkCreateCouponsRequest as BulkCreateCouponsRequest,
      ecommerceCouponsV2Coupon_universal_d_BulkCreateCouponsResponse as BulkCreateCouponsResponse,
      ecommerceCouponsV2Coupon_universal_d_BulkCreateCouponResult as BulkCreateCouponResult,
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
      ecommerceCouponsV2Coupon_universal_d_createCoupon as createCoupon,
      ecommerceCouponsV2Coupon_universal_d_updateCoupon as updateCoupon,
      ecommerceCouponsV2Coupon_universal_d_getCoupon as getCoupon,
      ecommerceCouponsV2Coupon_universal_d_deleteCoupon as deleteCoupon,
      ecommerceCouponsV2Coupon_universal_d_queryCoupons as queryCoupons,
      ecommerceCouponsV2Coupon_universal_d_calculateCart as calculateCart,
      ecommerceCouponsV2Coupon_universal_d_CalculateCartOptions as CalculateCartOptions,
      ecommerceCouponsV2Coupon_universal_d_increaseUsage as increaseUsage,
      ecommerceCouponsV2Coupon_universal_d_IncreaseUsageOptions as IncreaseUsageOptions,
      ecommerceCouponsV2Coupon_universal_d_hasCoupons as hasCoupons,
      ecommerceCouponsV2Coupon_universal_d_bulkDeleteCoupons as bulkDeleteCoupons,
      ecommerceCouponsV2Coupon_universal_d_bulkCreateCoupons as bulkCreateCoupons,
      ecommerceCouponsV2Coupon_universal_d_BulkCreateCouponsOptions as BulkCreateCouponsOptions,
    };
  }
  
  interface MarketingConsent {
      /**
       * Marketing consent ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number.
       * @readonly
       */
      revision?: string | null;
      /** Marketing consent communication details. */
      details?: MarketingConsentDetails;
      /**
       * Marketing consent state.
       *
       * Default: `UNKNOWN_STATE`.
       */
      state?: MarketingConsentState;
      /**
       * Date and time the marketing consent was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the marketing consent was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Last confirmation activity of the marketing consent. */
      lastConfirmationActivity?: LastConfirmationActivity;
      /** Last revoke activity of the marketing consent. */
      lastRevokeActivity?: LastRevokeActivity;
      /** Additional fields. */
      extendedFields?: ExtendedFields;
  }
  interface MarketingConsentDetails extends MarketingConsentDetailsIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
      /** The communication channel of the marketing consent. */
      type?: MarketingConsentDetailsIdentifierType;
  }
  /** @oneof */
  interface MarketingConsentDetailsIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
  }
  enum MarketingConsentDetailsIdentifierType {
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      EMAIL = "EMAIL",
      PHONE = "PHONE"
  }
  enum MarketingConsentState {
      /** State of the marketing consent is unknown. */
      UNKNOWN_STATE = "UNKNOWN_STATE",
      /** The site visitor never confirmed to receive marketing consents. */
      NEVER_CONFIRMED = "NEVER_CONFIRMED",
      /** The marketing consent has been removed, for example, when a site visitor unsubscribes from a newsletter. */
      REVOKED = "REVOKED",
      /** The marketing consent is pending confirmation. Relevant only for `{"optInLevel": "DOUBLE_CONFIRMATION"}`. */
      PENDING = "PENDING",
      /** The site visitor has confirmed their marketing consent. */
      CONFIRMED = "CONFIRMED"
  }
  interface LastConfirmationActivity {
      /** Source of the given consent (how the site visitor signed up). */
      source?: Source;
      /** Consent description. */
      description?: string | null;
      /** Date and time the consent was updated. */
      _updatedDate?: Date | null;
      /** Consent opt in level, either single or double confirmation. */
      optInLevel?: OptInLevel;
  }
  enum Source {
      UNKNOWN_SOURCE = "UNKNOWN_SOURCE",
      IN_PERSON = "IN_PERSON",
      FORM = "FORM",
      LINK_CONFIRMATION = "LINK_CONFIRMATION",
      EMAIL_SERVICE = "EMAIL_SERVICE",
      WIX_USERS = "WIX_USERS",
      OTHER = "OTHER"
  }
  enum OptInLevel {
      UNKNOWN_OPT_IN_LEVEL = "UNKNOWN_OPT_IN_LEVEL",
      SINGLE_CONFIRMATION = "SINGLE_CONFIRMATION",
      DOUBLE_CONFIRMATION = "DOUBLE_CONFIRMATION"
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
  interface LastRevokeActivity {
      /** Source of the given revoke (how the visitor signed up). */
      source?: LastRevokeActivitySource;
      /** Details about the revoke, if relevant. */
      description?: string | null;
      /** Date and time the consent was updated. */
      _updatedDate?: Date | null;
  }
  enum LastRevokeActivitySource {
      UNKNOWN_SOURCE = "UNKNOWN_SOURCE",
      IN_PERSON = "IN_PERSON",
      FORM = "FORM",
      REVOKE_LINK = "REVOKE_LINK",
      OTHER = "OTHER"
  }
  interface GetMarketingConsentRequest {
      /** Marketing consent ID. */
      marketingConsentId: string;
  }
  interface GetMarketingConsentResponse {
      /** The requested marketing consent. */
      marketingConsent?: MarketingConsent;
  }
  interface GetMarketingConsentByIdentifierRequest extends GetMarketingConsentByIdentifierRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
      /** The communication channel of the marketing consent. */
      type: MarketingConsentDetailsIdentifierType;
      /** Language of the page */
      linkLanguage?: string | null;
  }
  /** @oneof */
  interface GetMarketingConsentByIdentifierRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
  }
  interface GetMarketingConsentByIdentifierResponse {
      /** The requested marketing consent. */
      marketingConsent?: MarketingConsent;
      /** Details about whether the subject of the marketing consent is eligible to receive marketing messages. */
      communicationEligibility?: CommunicationEligibility;
  }
  interface CommunicationEligibility {
      /** Whether the recipient of the marketing consent is eligible to receive marketing messages. For example, if a visitor cancels their marketing consent, `CommunicationEligibility.granted` is `false`. Note that this only serves as a signal for your app to decide whether or not it should send marketing messages to the recipient's email address or phone number. */
      granted?: boolean;
      /** Cancellation link. */
      revokeConfirmationLink?: string | null;
      /** The reason the recipient of the marketing consent isn't eligible to receive marketing messages, for example, if the visitor unsubscribed from a newsletter. */
      reason?: string | null;
  }
  interface GetConsistentMarketingConsentByIdentifierRequest extends GetConsistentMarketingConsentByIdentifierRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
      /** The communication channel of the marketing consent. */
      type: MarketingConsentDetailsIdentifierType;
      /** Language of the page */
      linkLanguage?: string | null;
  }
  /** @oneof */
  interface GetConsistentMarketingConsentByIdentifierRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
  }
  interface GetConsistentMarketingConsentByIdentifierResponse {
      /** The requested marketing consent. */
      marketingConsent?: MarketingConsent;
      /** Details about whether the recipient of the marketing consent is eligible to receive marketing messages. */
      communicationEligibility?: CommunicationEligibility;
  }
  interface CreateMarketingConsentRequest {
      /** Marketing consent to create. */
      marketingConsent?: MarketingConsent;
  }
  interface CreateMarketingConsentResponse {
      /** Newly created marketing consent. */
      marketingConsent?: MarketingConsent;
      /** Marketing consent confirmation link. */
      link?: Link;
  }
  interface Link {
      /** Link type. */
      type?: LinkType;
      /** The link's URL. */
      url?: string;
  }
  enum LinkType {
      UNKNOWN_LINK_TYPE = "UNKNOWN_LINK_TYPE",
      CONFIRMATION = "CONFIRMATION",
      REVOKE_CONFIRMATION = "REVOKE_CONFIRMATION"
  }
  interface UpdateMarketingConsentRequest {
      /** Marketing consent to update. */
      marketingConsent?: MarketingConsent;
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask: string[];
  }
  interface UpdateMarketingConsentResponse {
      /** Updated marketing consent. */
      marketingConsent?: MarketingConsent;
      /** Marketing consent confirmation or cancelation link. */
      link?: Link;
  }
  interface DeleteMarketingConsentRequest {
      /** ID of the marketing consent to delete. */
      marketingConsentId: string;
  }
  interface DeleteMarketingConsentResponse {
  }
  interface RemoveMarketingConsentRequest {
      /** Marketing consent communication details. */
      details: MarketingConsentDetails;
      /** Information about the last revoke. */
      lastRevokeActivity?: LastRevokeActivity;
  }
  interface RemoveMarketingConsentResponse {
      /** The canceled marketing consent. */
      marketingConsent?: MarketingConsent;
  }
  interface CreateMarketingConsentByTokenRequest {
      /** Encrypted token with essential information */
      token: string;
  }
  interface CreateMarketingConsentByTokenResponse {
      /** The subscribed MarketingConsent */
      marketingConsent?: MarketingConsent;
  }
  interface RemoveMarketingConsentByTokenRequest {
      /** Encrypted token with essential information */
      token: string;
  }
  interface RemoveMarketingConsentByTokenResponse {
      /** The subscribed MarketingConsent */
      marketingConsent?: MarketingConsent;
  }
  interface QueryMarketingConsentRequest {
      /** Query options. */
      query: CursorQuery;
  }
  interface CursorQuery extends CursorQueryPagingMethodOneOf {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
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
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf {
      /**
       * Cursor paging options.
       *
       * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
       */
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
  interface QueryMarketingConsentResponse {
      /** List of marketing consents. */
      marketingConsent?: MarketingConsent[];
      /** Details on the paged set of results returned. */
      pagingMetadata?: CursorPagingMetadata;
  }
  interface CursorPagingMetadata {
      /** Number of items returned in current page. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors;
      /**
       * Whether there are more pages to retrieve following the current page.
       *
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
      /**
       * Total number of items matching the filter.
       * Available only on the first page of *Search* results, not included in *Query* or *List* results.
       * If the Search results span multiple pages, the value of `total` will exceed the number of items returned on the first page.
       * @internal
       */
      total?: number | null;
  }
  interface Cursors {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface UpsertMarketingConsentRequest {
      /** Marketing consent to create or update. */
      marketingConsent?: MarketingConsent;
  }
  interface UpsertMarketingConsentResponse {
      /** Newly created or updated marketing consent. */
      marketingConsent?: MarketingConsent;
      /** Marketing consent confirmation or cancelation link. */
      link?: Link;
  }
  interface BulkUpsertMarketingConsentRequest {
      /** List of marketing consent information to update or create. */
      info?: MarketingConsent[];
  }
  interface BulkUpsertMarketingConsentResponse {
      /** List of created or updated marketing consents. */
      results?: BulkUpsertMarketingConsentResult[];
      /** Numbers of successful and failed actions. */
      metadata?: Metadata;
  }
  interface BulkUpsertMarketingConsentResult {
      /** Position of the newly created or updated marketing consent in the array. */
      originalIndex?: number;
      /** Newly created or updated marketing consent. */
      marketingConsent?: MarketingConsent;
      /** Information about the error. Only returns if the action fails. */
      error?: string | null;
      /** Marketing consent confirmation or cancelation link. */
      link?: Link;
  }
  interface Metadata {
      /** Number of successful actions. */
      totalSuccess?: number;
      /** Number of failed actions. */
      totalFailure?: number;
  }
  interface GenerateLinkRequest extends GenerateLinkRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
      /** The communication channel of the marketing consent. */
      type: MarketingConsentDetailsIdentifierType;
      linkType: LinkType;
      /** Language of the page */
      language?: string | null;
      /** Arbitrary parameters for closing-the-loop. */
      metadata?: Record<string, string>;
  }
  /** @oneof */
  interface GenerateLinkRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
  }
  interface GenerateLinkResponse {
      /** confirmation or revoke link */
      link?: Link;
  }
  interface Empty {
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
   * Retrieves a marketing consent.
   * @param marketingConsentId - Marketing consent ID.
   * @public
   * @documentationMaturity preview
   * @requiredField marketingConsentId
   * @permissionId MARKETING.CONSENT_READ
   * @adminMethod
   * @returns The requested marketing consent.
   */
  function getMarketingConsent(marketingConsentId: string): Promise<MarketingConsent>;
  /**
   * Retrieves a marketing consent by its details.
   * Required fields:
   * - `details.type`.
   * - `details.email` OR `details.phone`.
   *
   * >**Note:** Due to the ongoing development of our new documentation portal, the query parameter is not displaying as expected. Use the `details` object located in the marketing consent object in the request. You can also see the code example for reference.
   * @param type - The communication channel of the marketing consent.
   * @public
   * @documentationMaturity preview
   * @requiredField type
   * @param options - Field options. The relevant `email` or `phone` **must** be passed.
   * @permissionId MARKETING.CONSENT_READ
   * @adminMethod
   */
  function getMarketingConsentByIdentifier(type: MarketingConsentDetailsIdentifierType, options?: GetMarketingConsentByIdentifierOptions): Promise<GetMarketingConsentByIdentifierResponse>;
  interface GetMarketingConsentByIdentifierOptions extends GetMarketingConsentByIdentifierRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
      /** Language of the page */
      linkLanguage?: string | null;
  }
  /** @param type - The communication channel of the marketing consent.
   * @internal
   * @documentationMaturity preview
   * @requiredField type
   * @permissionId MARKETING.CONSENT_READ_CONSISTENT
   * @adminMethod
   */
  function getConsistentMarketingConsentByIdentifier(type: MarketingConsentDetailsIdentifierType, options?: GetConsistentMarketingConsentByIdentifierOptions): Promise<GetConsistentMarketingConsentByIdentifierResponse>;
  interface GetConsistentMarketingConsentByIdentifierOptions extends GetConsistentMarketingConsentByIdentifierRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
      /** Language of the page */
      linkLanguage?: string | null;
  }
  /**
   * Creates a confirmed marketing consent with a `state` of `CONFIRMED`.
   * Required fields:
   * - `details.type`.
   * - `details.email` OR `details.phone`.
   * - `lastConfirmationActivity`.
   *
   * To create a marketing consent with a different state, use Upsert Marketing Consent, or Bulk Upsert Marketing Consent.
   * @param marketingConsent - Marketing consent to create.
   * @public
   * @documentationMaturity preview
   * @requiredField marketingConsent
   * @requiredField marketingConsent.details
   * @requiredField marketingConsent.lastConfirmationActivity
   * @permissionId MARKETING.CONSENT_UPSERT
   * @adminMethod
   * @returns Newly created marketing consent.
   */
  function createMarketingConsent(marketingConsent: MarketingConsent): Promise<MarketingConsent>;
  /**
   * Updates a marketing consent.
   * Required fields:
   * - `details.type`.
   * - `details.email` OR `details.phone`.
   * - `state`.
   *
   * When a marketing consent's `state` is `PENDING` or `CONFIRMED`, the `info.lastConfirmationActivity` field is required.
   * When a marketing consent's `state` is `REVOKED`, the `info.lastRevokeActivity` field is required.
   *
   * >**Note:** For existing marketing consents with `{"type": "EMAIL"}`, you can't update the `state` to `UNKNOWN_STATE`. Trying to do so maintains the current state. However, you can create a new marketing consent and set the `state` to `UNKNOWN_STATE`. Note that you can't create more than a single consent per email or phone number.
   * @param _id - Marketing consent ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField options.marketingConsent.details
   * @param options - Field options. The following fields **must** be passed: `details.type`, the relevant `email` OR `phone`, and `state`.
   * @permissionId MARKETING.CONSENT_UPDATE
   * @adminMethod
   * @returns Updated marketing consent.
   */
  function updateMarketingConsent(_id: string | null, options?: UpdateMarketingConsentOptions): Promise<MarketingConsent>;
  interface UpdateMarketingConsentOptions {
      marketingConsent: {
          /**
           * Marketing consent ID.
           * @readonly
           */
          _id?: string | null;
          /**
           * Revision number.
           * @readonly
           */
          revision?: string | null;
          /** Marketing consent communication details. */
          details?: MarketingConsentDetails;
          /**
           * Marketing consent state.
           *
           * Default: `UNKNOWN_STATE`.
           */
          state?: MarketingConsentState;
          /**
           * Date and time the marketing consent was created.
           * @readonly
           */
          _createdDate?: Date | null;
          /**
           * Date and time the marketing consent was updated.
           * @readonly
           */
          _updatedDate?: Date | null;
          /** Last confirmation activity of the marketing consent. */
          lastConfirmationActivity?: LastConfirmationActivity;
          /** Last revoke activity of the marketing consent. */
          lastRevokeActivity?: LastRevokeActivity;
          /** Additional fields. */
          extendedFields?: ExtendedFields;
      };
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask: string[];
  }
  /**
   * Deletes a marketing consent.
   * @param marketingConsentId - ID of the marketing consent to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField marketingConsentId
   * @permissionId MARKETING.CONSENT_DELETE
   * @adminMethod
   */
  function deleteMarketingConsent(marketingConsentId: string): Promise<void>;
  /**
   * Removes a marketing consent. The consent is cancelled, and the `state` is updated to `REVOKED`.
   * The marketing consent entity still exists, but the recipient is no longer eligible to receive commmunication.
   * To delete a marketing consent entirely, use Delete Marketing Consent.
   *
   * Required fields:
   * - `details.type`.
   * - `details.email` OR `details.phone`.
   * - `info.lastRevokeActivity`.
   * @param details - Marketing consent communication details.
   * @public
   * @documentationMaturity preview
   * @requiredField details
   * @requiredField details.type
   * @param options - Field options. The `lastRevokeActivity` field **must** be passed.
   * @permissionId MARKETING.CONSENT_UPSERT
   * @adminMethod
   */
  function removeMarketingConsent(details: MarketingConsentDetails, options?: RemoveMarketingConsentOptions): Promise<RemoveMarketingConsentResponse>;
  interface RemoveMarketingConsentOptions {
      /** Information about the last revoke. */
      lastRevokeActivity?: LastRevokeActivity;
  }
  /**
   * CreateMarketingConsent the specified marketing_consent in the token
   * @param token - Encrypted token with essential information
   * @internal
   * @documentationMaturity preview
   * @requiredField token
   * @permissionId MARKETING.CONSENT_UPSERT
   * @adminMethod
   */
  function createMarketingConsentByToken(token: string): Promise<CreateMarketingConsentByTokenResponse>;
  /**
   * RemoveMarketingConsent the specified marketing_consent in the token
   * @param token - Encrypted token with essential information
   * @internal
   * @documentationMaturity preview
   * @requiredField token
   * @permissionId MARKETING.CONSENT_UPSERT
   * @adminMethod
   */
  function removeMarketingConsentByToken(token: string): Promise<RemoveMarketingConsentByTokenResponse>;
  /**
   * Retrieves a list of marketing consents, given the provided paging, filtering, and sorting. Up to 100 marketing consents can be returned per request.
   *
   * The default `sort` is `id` in `ASC` order. For a detailed list of supported operations, see filtering and sorting for marketing consent properties. To learn how to query marketing consents, see API Query Language.
   * @public
   * @documentationMaturity preview
   * @permissionId MARKETING.CONSENT_READ
   * @adminMethod
   */
  function queryMarketingConsent(): MarketingConsentQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface MarketingConsentQueryResult extends QueryCursorResult {
      items: MarketingConsent[];
      query: MarketingConsentQueryBuilder;
      next: () => Promise<MarketingConsentQueryResult>;
      prev: () => Promise<MarketingConsentQueryResult>;
  }
  interface MarketingConsentQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'details.email' | 'details.phone' | 'state', value: any) => MarketingConsentQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => MarketingConsentQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => MarketingConsentQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<MarketingConsentQueryResult>;
  }
  /**
   * Creates or updates a marketing consent.
   * Required fields:
   * - `details.type`.
   * - `details.email` OR `details.phone`.
   * - `state`.
   *
   * When a marketing consent's `state` is `PENDING` or `CONFIRMED`, the `info.lastConfirmationActivity` field is required.
   * When a marketing consent's `state` is `REVOKED`, the `info.lastRevokeActivity` field is required.
   *
   * >**Note:** For existing marketing consents with `{"type": "EMAIL"}`, you can't update the `state` to `UNKNOWN_STATE`. Trying to do so maintains the current state. However, you can create a new marketing consent and set the `state` to `UNKNOWN_STATE`. Note that you can't create more than a single consent per email or phone number.
   * @param marketingConsent - Marketing consent to create or update.
   * @public
   * @documentationMaturity preview
   * @requiredField marketingConsent
   * @requiredField marketingConsent.details
   * @requiredField marketingConsent.details.type
   * @permissionId MARKETING.CONSENT_UPSERT
   * @adminMethod
   */
  function upsertMarketingConsent(marketingConsent: MarketingConsent): Promise<UpsertMarketingConsentResponse>;
  /**
   * Creates or updates multiple marketing consents.
   * Required fields:
   * - `details.type`.
   * - `details.email` OR `details.phone`.
   * - `state`.
   *
   * When a marketing consent's `state` is `PENDING` or `CONFIRMED`, the `info.lastConfirmationActivity` field is required.
   * When a marketing consent's `state` is `REVOKED`, the `info.lastRevokeActivity` field is required.
   *
   * >**Note:** For existing marketing consents with `{"type": "EMAIL"}`, you can't update the `state` to `UNKNOWN_STATE`. Trying to do so maintains the current state. However, you can create a new marketing consent and set the `state` to `UNKNOWN_STATE`. Note that you can't create more than a single consent per email or phone number.
   * @param info - List of marketing consent information to update or create.
   * @public
   * @documentationMaturity preview
   * @requiredField info
   * @requiredField info.details
   * @permissionId MARKETING.CONSENT_UPSERT
   * @adminMethod
   */
  function bulkUpsertMarketingConsent(info: MarketingConsent[]): Promise<BulkUpsertMarketingConsentResponse>;
  /**
   * Creates an unsubscribe link to be shared with the relevant recipient.
   *
   * If someone clicks the **Unsubscribe** button on the confirmation page,
   * the recipient's `subscriptionStatus` is changed to `UNSUBSCRIBED`.
   * @param type - The communication channel of the marketing consent.
   * @internal
   * @documentationMaturity preview
   * @requiredField options.linkType
   * @requiredField type
   * @permissionId MARKETING.CONSENT_READ
   * @adminMethod
   */
  function generateLink(type: MarketingConsentDetailsIdentifierType, options?: GenerateLinkOptions): Promise<GenerateLinkResponse>;
  interface GenerateLinkOptions extends GenerateLinkRequestIdentifierOneOf {
      /** Email address used for the marketing consent. */
      email?: string;
      /** Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format used for the SMS marketing consent. */
      phone?: string;
      linkType: LinkType;
      /** Language of the page */
      language?: string | null;
      /** Arbitrary parameters for closing-the-loop. */
      metadata?: Record<string, string>;
  }
  
  type marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsent = MarketingConsent;
  type marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentDetails = MarketingConsentDetails;
  type marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentDetailsIdentifierOneOf = MarketingConsentDetailsIdentifierOneOf;
  type marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentDetailsIdentifierType = MarketingConsentDetailsIdentifierType;
  const marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentDetailsIdentifierType: typeof MarketingConsentDetailsIdentifierType;
  type marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentState = MarketingConsentState;
  const marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentState: typeof MarketingConsentState;
  type marketingMarketingConsentV1MarketingConsent_universal_d_LastConfirmationActivity = LastConfirmationActivity;
  type marketingMarketingConsentV1MarketingConsent_universal_d_Source = Source;
  const marketingMarketingConsentV1MarketingConsent_universal_d_Source: typeof Source;
  type marketingMarketingConsentV1MarketingConsent_universal_d_OptInLevel = OptInLevel;
  const marketingMarketingConsentV1MarketingConsent_universal_d_OptInLevel: typeof OptInLevel;
  type marketingMarketingConsentV1MarketingConsent_universal_d_ExtendedFields = ExtendedFields;
  type marketingMarketingConsentV1MarketingConsent_universal_d_LastRevokeActivity = LastRevokeActivity;
  type marketingMarketingConsentV1MarketingConsent_universal_d_LastRevokeActivitySource = LastRevokeActivitySource;
  const marketingMarketingConsentV1MarketingConsent_universal_d_LastRevokeActivitySource: typeof LastRevokeActivitySource;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentRequest = GetMarketingConsentRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentResponse = GetMarketingConsentResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentByIdentifierRequest = GetMarketingConsentByIdentifierRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentByIdentifierRequestIdentifierOneOf = GetMarketingConsentByIdentifierRequestIdentifierOneOf;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentByIdentifierResponse = GetMarketingConsentByIdentifierResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CommunicationEligibility = CommunicationEligibility;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetConsistentMarketingConsentByIdentifierRequest = GetConsistentMarketingConsentByIdentifierRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetConsistentMarketingConsentByIdentifierRequestIdentifierOneOf = GetConsistentMarketingConsentByIdentifierRequestIdentifierOneOf;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetConsistentMarketingConsentByIdentifierResponse = GetConsistentMarketingConsentByIdentifierResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentRequest = CreateMarketingConsentRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentResponse = CreateMarketingConsentResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_Link = Link;
  type marketingMarketingConsentV1MarketingConsent_universal_d_LinkType = LinkType;
  const marketingMarketingConsentV1MarketingConsent_universal_d_LinkType: typeof LinkType;
  type marketingMarketingConsentV1MarketingConsent_universal_d_UpdateMarketingConsentRequest = UpdateMarketingConsentRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_UpdateMarketingConsentResponse = UpdateMarketingConsentResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_DeleteMarketingConsentRequest = DeleteMarketingConsentRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_DeleteMarketingConsentResponse = DeleteMarketingConsentResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentRequest = RemoveMarketingConsentRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentResponse = RemoveMarketingConsentResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentByTokenRequest = CreateMarketingConsentByTokenRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentByTokenResponse = CreateMarketingConsentByTokenResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentByTokenRequest = RemoveMarketingConsentByTokenRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentByTokenResponse = RemoveMarketingConsentByTokenResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_QueryMarketingConsentRequest = QueryMarketingConsentRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CursorQuery = CursorQuery;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type marketingMarketingConsentV1MarketingConsent_universal_d_Sorting = Sorting;
  type marketingMarketingConsentV1MarketingConsent_universal_d_SortOrder = SortOrder;
  const marketingMarketingConsentV1MarketingConsent_universal_d_SortOrder: typeof SortOrder;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CursorPaging = CursorPaging;
  type marketingMarketingConsentV1MarketingConsent_universal_d_QueryMarketingConsentResponse = QueryMarketingConsentResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type marketingMarketingConsentV1MarketingConsent_universal_d_Cursors = Cursors;
  type marketingMarketingConsentV1MarketingConsent_universal_d_UpsertMarketingConsentRequest = UpsertMarketingConsentRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_UpsertMarketingConsentResponse = UpsertMarketingConsentResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_BulkUpsertMarketingConsentRequest = BulkUpsertMarketingConsentRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_BulkUpsertMarketingConsentResponse = BulkUpsertMarketingConsentResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_BulkUpsertMarketingConsentResult = BulkUpsertMarketingConsentResult;
  type marketingMarketingConsentV1MarketingConsent_universal_d_Metadata = Metadata;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GenerateLinkRequest = GenerateLinkRequest;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GenerateLinkRequestIdentifierOneOf = GenerateLinkRequestIdentifierOneOf;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GenerateLinkResponse = GenerateLinkResponse;
  type marketingMarketingConsentV1MarketingConsent_universal_d_Empty = Empty;
  const marketingMarketingConsentV1MarketingConsent_universal_d_getMarketingConsent: typeof getMarketingConsent;
  const marketingMarketingConsentV1MarketingConsent_universal_d_getMarketingConsentByIdentifier: typeof getMarketingConsentByIdentifier;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentByIdentifierOptions = GetMarketingConsentByIdentifierOptions;
  const marketingMarketingConsentV1MarketingConsent_universal_d_getConsistentMarketingConsentByIdentifier: typeof getConsistentMarketingConsentByIdentifier;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GetConsistentMarketingConsentByIdentifierOptions = GetConsistentMarketingConsentByIdentifierOptions;
  const marketingMarketingConsentV1MarketingConsent_universal_d_createMarketingConsent: typeof createMarketingConsent;
  const marketingMarketingConsentV1MarketingConsent_universal_d_updateMarketingConsent: typeof updateMarketingConsent;
  type marketingMarketingConsentV1MarketingConsent_universal_d_UpdateMarketingConsentOptions = UpdateMarketingConsentOptions;
  const marketingMarketingConsentV1MarketingConsent_universal_d_deleteMarketingConsent: typeof deleteMarketingConsent;
  const marketingMarketingConsentV1MarketingConsent_universal_d_removeMarketingConsent: typeof removeMarketingConsent;
  type marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentOptions = RemoveMarketingConsentOptions;
  const marketingMarketingConsentV1MarketingConsent_universal_d_createMarketingConsentByToken: typeof createMarketingConsentByToken;
  const marketingMarketingConsentV1MarketingConsent_universal_d_removeMarketingConsentByToken: typeof removeMarketingConsentByToken;
  const marketingMarketingConsentV1MarketingConsent_universal_d_queryMarketingConsent: typeof queryMarketingConsent;
  type marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentQueryResult = MarketingConsentQueryResult;
  type marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentQueryBuilder = MarketingConsentQueryBuilder;
  const marketingMarketingConsentV1MarketingConsent_universal_d_upsertMarketingConsent: typeof upsertMarketingConsent;
  const marketingMarketingConsentV1MarketingConsent_universal_d_bulkUpsertMarketingConsent: typeof bulkUpsertMarketingConsent;
  const marketingMarketingConsentV1MarketingConsent_universal_d_generateLink: typeof generateLink;
  type marketingMarketingConsentV1MarketingConsent_universal_d_GenerateLinkOptions = GenerateLinkOptions;
  namespace marketingMarketingConsentV1MarketingConsent_universal_d {
    export {
      marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsent as MarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentDetails as MarketingConsentDetails,
      marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentDetailsIdentifierOneOf as MarketingConsentDetailsIdentifierOneOf,
      marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentDetailsIdentifierType as MarketingConsentDetailsIdentifierType,
      marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentState as MarketingConsentState,
      marketingMarketingConsentV1MarketingConsent_universal_d_LastConfirmationActivity as LastConfirmationActivity,
      marketingMarketingConsentV1MarketingConsent_universal_d_Source as Source,
      marketingMarketingConsentV1MarketingConsent_universal_d_OptInLevel as OptInLevel,
      marketingMarketingConsentV1MarketingConsent_universal_d_ExtendedFields as ExtendedFields,
      marketingMarketingConsentV1MarketingConsent_universal_d_LastRevokeActivity as LastRevokeActivity,
      marketingMarketingConsentV1MarketingConsent_universal_d_LastRevokeActivitySource as LastRevokeActivitySource,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentRequest as GetMarketingConsentRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentResponse as GetMarketingConsentResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentByIdentifierRequest as GetMarketingConsentByIdentifierRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentByIdentifierRequestIdentifierOneOf as GetMarketingConsentByIdentifierRequestIdentifierOneOf,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentByIdentifierResponse as GetMarketingConsentByIdentifierResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_CommunicationEligibility as CommunicationEligibility,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetConsistentMarketingConsentByIdentifierRequest as GetConsistentMarketingConsentByIdentifierRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetConsistentMarketingConsentByIdentifierRequestIdentifierOneOf as GetConsistentMarketingConsentByIdentifierRequestIdentifierOneOf,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetConsistentMarketingConsentByIdentifierResponse as GetConsistentMarketingConsentByIdentifierResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentRequest as CreateMarketingConsentRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentResponse as CreateMarketingConsentResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_Link as Link,
      marketingMarketingConsentV1MarketingConsent_universal_d_LinkType as LinkType,
      marketingMarketingConsentV1MarketingConsent_universal_d_UpdateMarketingConsentRequest as UpdateMarketingConsentRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_UpdateMarketingConsentResponse as UpdateMarketingConsentResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_DeleteMarketingConsentRequest as DeleteMarketingConsentRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_DeleteMarketingConsentResponse as DeleteMarketingConsentResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentRequest as RemoveMarketingConsentRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentResponse as RemoveMarketingConsentResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentByTokenRequest as CreateMarketingConsentByTokenRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_CreateMarketingConsentByTokenResponse as CreateMarketingConsentByTokenResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentByTokenRequest as RemoveMarketingConsentByTokenRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentByTokenResponse as RemoveMarketingConsentByTokenResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_QueryMarketingConsentRequest as QueryMarketingConsentRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_CursorQuery as CursorQuery,
      marketingMarketingConsentV1MarketingConsent_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      marketingMarketingConsentV1MarketingConsent_universal_d_Sorting as Sorting,
      marketingMarketingConsentV1MarketingConsent_universal_d_SortOrder as SortOrder,
      marketingMarketingConsentV1MarketingConsent_universal_d_CursorPaging as CursorPaging,
      marketingMarketingConsentV1MarketingConsent_universal_d_QueryMarketingConsentResponse as QueryMarketingConsentResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      marketingMarketingConsentV1MarketingConsent_universal_d_Cursors as Cursors,
      marketingMarketingConsentV1MarketingConsent_universal_d_UpsertMarketingConsentRequest as UpsertMarketingConsentRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_UpsertMarketingConsentResponse as UpsertMarketingConsentResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_BulkUpsertMarketingConsentRequest as BulkUpsertMarketingConsentRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_BulkUpsertMarketingConsentResponse as BulkUpsertMarketingConsentResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_BulkUpsertMarketingConsentResult as BulkUpsertMarketingConsentResult,
      marketingMarketingConsentV1MarketingConsent_universal_d_Metadata as Metadata,
      marketingMarketingConsentV1MarketingConsent_universal_d_GenerateLinkRequest as GenerateLinkRequest,
      marketingMarketingConsentV1MarketingConsent_universal_d_GenerateLinkRequestIdentifierOneOf as GenerateLinkRequestIdentifierOneOf,
      marketingMarketingConsentV1MarketingConsent_universal_d_GenerateLinkResponse as GenerateLinkResponse,
      marketingMarketingConsentV1MarketingConsent_universal_d_Empty as Empty,
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
      marketingMarketingConsentV1MarketingConsent_universal_d_getMarketingConsent as getMarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_getMarketingConsentByIdentifier as getMarketingConsentByIdentifier,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetMarketingConsentByIdentifierOptions as GetMarketingConsentByIdentifierOptions,
      marketingMarketingConsentV1MarketingConsent_universal_d_getConsistentMarketingConsentByIdentifier as getConsistentMarketingConsentByIdentifier,
      marketingMarketingConsentV1MarketingConsent_universal_d_GetConsistentMarketingConsentByIdentifierOptions as GetConsistentMarketingConsentByIdentifierOptions,
      marketingMarketingConsentV1MarketingConsent_universal_d_createMarketingConsent as createMarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_updateMarketingConsent as updateMarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_UpdateMarketingConsentOptions as UpdateMarketingConsentOptions,
      marketingMarketingConsentV1MarketingConsent_universal_d_deleteMarketingConsent as deleteMarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_removeMarketingConsent as removeMarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_RemoveMarketingConsentOptions as RemoveMarketingConsentOptions,
      marketingMarketingConsentV1MarketingConsent_universal_d_createMarketingConsentByToken as createMarketingConsentByToken,
      marketingMarketingConsentV1MarketingConsent_universal_d_removeMarketingConsentByToken as removeMarketingConsentByToken,
      marketingMarketingConsentV1MarketingConsent_universal_d_queryMarketingConsent as queryMarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentQueryResult as MarketingConsentQueryResult,
      marketingMarketingConsentV1MarketingConsent_universal_d_MarketingConsentQueryBuilder as MarketingConsentQueryBuilder,
      marketingMarketingConsentV1MarketingConsent_universal_d_upsertMarketingConsent as upsertMarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_bulkUpsertMarketingConsent as bulkUpsertMarketingConsent,
      marketingMarketingConsentV1MarketingConsent_universal_d_generateLink as generateLink,
      marketingMarketingConsentV1MarketingConsent_universal_d_GenerateLinkOptions as GenerateLinkOptions,
    };
  }
  
  interface AdsTxt {
      /** Content of Ads.txt. */
      content?: string;
      /** Whether the current Ads.txt file is Wix's default. */
      default?: boolean;
      /**
       * Subdomain of the Ads.txt file. For example, `www`, `es`, or `fr`.
       *
       * Default: `www`
       */
      subdomain?: string;
      /**
       * ID of the `adsTxt` object.
       * @internal
       */
      _id?: string;
  }
  /** The request to get the Ads.txt file content */
  interface GetAdsTxtRequest {
      /**
       * Subdomain of the Ads.txt file. For example, `www`, `es`, or `fr`.
       *
       * Default: `www`
       */
      subdomain?: string;
  }
  /** The response of the Ads.txt file request */
  interface GetAdsTxtResponse {
      /** Retrieved `adsTxt` object. */
      adsTxt?: AdsTxt;
  }
  /** The request to update the content of the Ads.txt file */
  interface UpdateAdsTxtRequest {
      /**
       * Details about how to replace the existing Ads.txt file.
       * To reset the Ads.txt file to Wix's default, set `default` to `true` and omit `content`.
       */
      adsTxt?: AdsTxt;
  }
  interface UpdateAdsTxtResponse {
      /** Updated `adsTxt` object. */
      adsTxt?: AdsTxt;
  }
  /** The request to append the content of the Ads.txt file */
  interface AppendAdsTxtRequest {
      /**
       * Details to add to the existing Ads.txt file.
       * To reset the Ads.txt file to Wix's default, set `default` to `true` and omit `content`.
       */
      adsTxt?: AdsTxt;
  }
  interface AppendAdsTxtResponse {
      /** Updated `adsTxt` object. */
      adsTxt?: AdsTxt;
  }
  interface DomainEvent extends DomainEventBodyOneOf {
      createdEvent?: EntityCreatedEvent;
      /** Triggered when the Ads.txt file is updated. */
      updatedEvent?: EntityUpdatedEvent;
      deletedEvent?: EntityDeletedEvent;
      /** Triggered when the Ads.txt file is updated. */
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
  }
  interface EntityDeletedEvent {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
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
  /**
   * Retrieves the Ads.txt file.
   * @public
   * @documentationMaturity preview
   * @param options - Options to use when retrieving the Ads.txt file.
   * @permissionId PROMOTE.ADS_TXT_READ
   * @adminMethod
   * @returns The response of the Ads.txt file request
   */
  function getAdsTxt(options?: GetAdsTxtOptions): Promise<GetAdsTxtResponse>;
  interface GetAdsTxtOptions {
      /**
       * Subdomain of the Ads.txt file. For example, `www`, `es`, or `fr`.
       *
       * Default: `www`
       */
      subdomain?: string;
  }
  /**
   * Replaces the Ads.txt file.
   *
   * When setting `content` to an empty string, an empty Ads.txt file is created. To reset Ads.txt to Wix's default, set `default` to `true` and omit `content`.
   * @public
   * @documentationMaturity preview
   * @param options - Options to use when replacing the Ads.txt file.
   * @permissionId PROMOTE.ADS_TXT_WRITE
   * @adminMethod
   */
  function updateAdsTxt(options?: UpdateAdsTxtOptions): Promise<UpdateAdsTxtResponse>;
  interface UpdateAdsTxtOptions {
      /**
       * Details about how to replace the existing Ads.txt file.
       * To reset the Ads.txt file to Wix's default, set `default` to `true` and omit `content`.
       */
      adsTxt?: AdsTxt;
  }
  /**
   * Adds `content` to the Ads.txt file.
   *
   * To reset the Ads.txt file to Wix's default, set `default` to `true` and omit `content`.
   * @public
   * @documentationMaturity preview
   * @param options - Options to use when appending the Ads.txt file.
   * @permissionId PROMOTE.ADS_TXT_WRITE
   * @adminMethod
   */
  function appendAdsTxt(options?: AppendAdsTxtOptions): Promise<AppendAdsTxtResponse>;
  interface AppendAdsTxtOptions {
      /**
       * Details to add to the existing Ads.txt file.
       * To reset the Ads.txt file to Wix's default, set `default` to `true` and omit `content`.
       */
      adsTxt?: AdsTxt;
  }
  
  type promoteMarketingV2AdsTxt_universal_d_AdsTxt = AdsTxt;
  type promoteMarketingV2AdsTxt_universal_d_GetAdsTxtRequest = GetAdsTxtRequest;
  type promoteMarketingV2AdsTxt_universal_d_GetAdsTxtResponse = GetAdsTxtResponse;
  type promoteMarketingV2AdsTxt_universal_d_UpdateAdsTxtRequest = UpdateAdsTxtRequest;
  type promoteMarketingV2AdsTxt_universal_d_UpdateAdsTxtResponse = UpdateAdsTxtResponse;
  type promoteMarketingV2AdsTxt_universal_d_AppendAdsTxtRequest = AppendAdsTxtRequest;
  type promoteMarketingV2AdsTxt_universal_d_AppendAdsTxtResponse = AppendAdsTxtResponse;
  type promoteMarketingV2AdsTxt_universal_d_DomainEvent = DomainEvent;
  type promoteMarketingV2AdsTxt_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type promoteMarketingV2AdsTxt_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type promoteMarketingV2AdsTxt_universal_d_RestoreInfo = RestoreInfo;
  type promoteMarketingV2AdsTxt_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type promoteMarketingV2AdsTxt_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type promoteMarketingV2AdsTxt_universal_d_ActionEvent = ActionEvent;
  type promoteMarketingV2AdsTxt_universal_d_MessageEnvelope = MessageEnvelope;
  type promoteMarketingV2AdsTxt_universal_d_IdentificationData = IdentificationData;
  type promoteMarketingV2AdsTxt_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type promoteMarketingV2AdsTxt_universal_d_WebhookIdentityType = WebhookIdentityType;
  const promoteMarketingV2AdsTxt_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const promoteMarketingV2AdsTxt_universal_d_getAdsTxt: typeof getAdsTxt;
  type promoteMarketingV2AdsTxt_universal_d_GetAdsTxtOptions = GetAdsTxtOptions;
  const promoteMarketingV2AdsTxt_universal_d_updateAdsTxt: typeof updateAdsTxt;
  type promoteMarketingV2AdsTxt_universal_d_UpdateAdsTxtOptions = UpdateAdsTxtOptions;
  const promoteMarketingV2AdsTxt_universal_d_appendAdsTxt: typeof appendAdsTxt;
  type promoteMarketingV2AdsTxt_universal_d_AppendAdsTxtOptions = AppendAdsTxtOptions;
  namespace promoteMarketingV2AdsTxt_universal_d {
    export {
      promoteMarketingV2AdsTxt_universal_d_AdsTxt as AdsTxt,
      promoteMarketingV2AdsTxt_universal_d_GetAdsTxtRequest as GetAdsTxtRequest,
      promoteMarketingV2AdsTxt_universal_d_GetAdsTxtResponse as GetAdsTxtResponse,
      promoteMarketingV2AdsTxt_universal_d_UpdateAdsTxtRequest as UpdateAdsTxtRequest,
      promoteMarketingV2AdsTxt_universal_d_UpdateAdsTxtResponse as UpdateAdsTxtResponse,
      promoteMarketingV2AdsTxt_universal_d_AppendAdsTxtRequest as AppendAdsTxtRequest,
      promoteMarketingV2AdsTxt_universal_d_AppendAdsTxtResponse as AppendAdsTxtResponse,
      promoteMarketingV2AdsTxt_universal_d_DomainEvent as DomainEvent,
      promoteMarketingV2AdsTxt_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      promoteMarketingV2AdsTxt_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      promoteMarketingV2AdsTxt_universal_d_RestoreInfo as RestoreInfo,
      promoteMarketingV2AdsTxt_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      promoteMarketingV2AdsTxt_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      promoteMarketingV2AdsTxt_universal_d_ActionEvent as ActionEvent,
      promoteMarketingV2AdsTxt_universal_d_MessageEnvelope as MessageEnvelope,
      promoteMarketingV2AdsTxt_universal_d_IdentificationData as IdentificationData,
      promoteMarketingV2AdsTxt_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      promoteMarketingV2AdsTxt_universal_d_WebhookIdentityType as WebhookIdentityType,
      promoteMarketingV2AdsTxt_universal_d_getAdsTxt as getAdsTxt,
      promoteMarketingV2AdsTxt_universal_d_GetAdsTxtOptions as GetAdsTxtOptions,
      promoteMarketingV2AdsTxt_universal_d_updateAdsTxt as updateAdsTxt,
      promoteMarketingV2AdsTxt_universal_d_UpdateAdsTxtOptions as UpdateAdsTxtOptions,
      promoteMarketingV2AdsTxt_universal_d_appendAdsTxt as appendAdsTxt,
      promoteMarketingV2AdsTxt_universal_d_AppendAdsTxtOptions as AppendAdsTxtOptions,
    };
  }
  
  export { promoteMarketingV2AdsTxt_universal_d as adsTxt, ecommerceCouponsV2Coupon_universal_d as coupons, marketingMarketingConsentV1MarketingConsent_universal_d as marketingConsent };
}
