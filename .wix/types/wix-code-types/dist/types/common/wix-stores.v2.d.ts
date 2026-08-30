declare module "wix-stores.v2" {
    interface InventoryItemV2 {
        /** Inventory item ID. */
        _id?: string | null;
        /**
         * Product ID.
         * @readonly
         */
        productId?: string | null;
        /** Whether quantity is being tracked. */
        trackQuantity?: boolean | null;
        /** Variants associated with this inventory item. */
        variants?: InventoryVariantV2[];
        /**
         * Last updated timestamp.
         * @readonly
         */
        lastUpdated?: Date | null;
        /**
         * Inventory’s unique numeric ID (assigned in ascending order).
         * Primarily for sorting and filtering when crawling all inventories.
         * @readonly
         */
        numericId?: string;
        /** Preorder information. */
        preorderInfo?: PreorderInfo$1;
    }
    interface InventoryVariantV2 {
        /** Variant ID. */
        variantId?: string;
        /** Whether the product is listed as in stock. */
        inStock?: boolean | null;
        /** Quantity currently left in inventory. */
        quantity?: number | null;
        /**
         * Whether the variant is available for preorder. When `true`, the variant is out of stock and preorder is enabled on inventory level.
         * @readonly
         */
        availableForPreorder?: boolean;
    }
    interface PreorderInfo$1 {
        /** Whether the item is available for preorder. */
        enabled?: boolean;
        /** A message the buyer will see when the item is out of stock and preorder is enabled. */
        message?: string | null;
        /** Number of products that can be preordered after stock reaches zero. */
        limit?: number | null;
    }
    interface InventoryItemChanged {
        /** Inventory item ID. */
        inventoryItemId?: string;
        /** Product ID. */
        productId?: string;
        /** Whether inventory is being tracked. */
        trackInventory?: boolean;
        /** Preorder information. */
        preorderInfo?: PreorderInfo$1;
        /** Field mask of updated fields. */
        fieldMask?: string[];
        /** Date and time the inventory item was last updated. */
        _updatedDate?: Date | null;
    }
    interface InventoryVariantsChanged {
        /** Inventory item ID. */
        inventoryItemId?: string;
        /** Product ID. */
        productId?: string;
        /** Information about changed variants. */
        variants?: ChangedInventoryVariant[];
        /** Date and time the inventory variant item was last updated. */
        _updatedDate?: Date | null;
    }
    interface ChangedInventoryVariant {
        /** Variant ID. */
        _id?: string;
        /** Previous inventory variant data. */
        oldValue?: ChangedInventoryVariantData;
        /** Current inventory variant data. */
        newValue?: ChangedInventoryVariantData;
    }
    interface ChangedInventoryVariantData {
        /** Inventory variant quantity. */
        quantity?: number | null;
        /** Whether the product variant is in stock. */
        inStock?: boolean;
        /** Whether the variant is available for preorder. When `true`, the variant is out of stock and preorder is enabled on inventory level. */
        availableForPreorder?: boolean;
    }
    enum ReasonType {
        /** Unknown reason. */
        UNKNOWN = "UNKNOWN",
        /** Order related. */
        ORDER = "ORDER",
        /** Manual adjustment. */
        MANUAL = "MANUAL",
        /** Reverting an inventory change. */
        REVERT_INVENTORY_CHANGE = "REVERT_INVENTORY_CHANGE"
    }
    interface GetInventoryVariantsRequest extends GetInventoryVariantsRequestIdOneOf {
        /** Inventory item ID. */
        inventoryId: string;
        /** Product ID. */
        productId?: string;
        /** Variant IDs to query for this inventory item (optional). */
        variantIds?: string[];
    }
    /** @oneof */
    interface GetInventoryVariantsRequestIdOneOf {
        /** Inventory item ID. */
        inventoryId?: string;
        /** Product ID. */
        productId?: string;
    }
    interface GetInventoryVariantsResponse {
        /** Inventory item. */
        inventoryItem?: InventoryItemV2;
    }
    interface GetInventoryItemsRequest {
        /** Product IDs */
        productIds?: string[];
    }
    interface GetInventoryItemsResponse {
        /** Inventory items. */
        inventoryItems?: InventoryItemV2[];
    }
    interface QueryInventoryRequest {
        /** Information about paging, filters, sorting. */
        query?: Query$1;
    }
    interface Query$1 {
        /** Paging options to limit and skip the number of items. */
        paging?: Paging$1;
        /** Filter string */
        filter?: string | null;
        /** Sort string */
        sort?: string | null;
    }
    interface Paging$1 {
        /** Amount of items to load per page */
        limit?: number | null;
        /** Number of items to skip in the display (relevant for all pages after the first) */
        offset?: number | null;
    }
    interface QueryInventoryResponse {
        /** Inventory items. */
        inventoryItems?: InventoryItemV2[];
        /** Display metadata. */
        metadata?: PagingMetadata$1;
        /** Number of total results. */
        totalResults?: number;
    }
    interface PagingMetadata$1 {
        /** Amount of items to load per page */
        items?: number;
        /** Number of items to skip in the display (relevant for all pages after the first) */
        offset?: number;
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
    interface UpdateInventoryVariantsRequest {
        /** Inventory item. */
        inventoryItem: InventoryItemV2;
    }
    interface UpdateInventoryVariantsResponse {
    }
    interface BulkUpdateInventoryVariantsRequest extends BulkUpdateInventoryVariantsRequestActionOneOf {
        /** Change availability. */
        setInStock?: boolean | null;
        /** Set new quantity. */
        setQuantity?: number | null;
        /** Number to increment inventory by. */
        incrementBy?: number | null;
        /** Number to decrement inventory by. */
        decrementBy?: number | null;
        /** Variants filter. Learn more about [API query language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language). */
        filter: Record<string, any> | null;
    }
    /** @oneof */
    interface BulkUpdateInventoryVariantsRequestActionOneOf {
        /** Change availability. */
        setInStock?: boolean | null;
        /** Set new quantity. */
        setQuantity?: number | null;
        /** Number to increment inventory by. */
        incrementBy?: number | null;
        /** Number to decrement inventory by. */
        decrementBy?: number | null;
    }
    interface BulkUpdateInventoryVariantsResponse {
    }
    interface BulkUpdateInventoryItemsRequest {
        /** Variants filter */
        variantsFilter: Record<string, any> | null;
        /** Whether inventory is being tracked. */
        trackInventory: boolean | null;
    }
    interface BulkUpdateInventoryItemsResponse {
    }
    interface DecrementInventoryRequest {
        /** Item or product to decrement. */
        decrementData?: DecrementData[];
    }
    interface DecrementData extends DecrementDataIdOneOf {
        /** Inventory item ID. */
        inventoryId?: string;
        /** Product ID. */
        productId?: string;
        /** Variant ID. */
        variantId?: string;
        /** Number to decrement inventory by. */
        decrementBy?: number;
        /**
         * Whether the request to decrement the item's inventory was made as part of a purchase that includes preorder items.
         * If true and the item is available for preorder, we allow negative inventory.
         * If false and the item is not available for preorder, we allow regular buy flow (no negative inventory).
         */
        preorderRequest?: boolean;
    }
    /** @oneof */
    interface DecrementDataIdOneOf {
        /** Inventory item ID. */
        inventoryId?: string;
        /** Product ID. */
        productId?: string;
    }
    interface DecrementInventoryResponse {
    }
    interface IncrementInventoryRequest {
        /** Item or product to increment. */
        incrementData?: IncrementData[];
    }
    interface IncrementData extends IncrementDataIdOneOf {
        /** Inventory item ID. */
        inventoryId?: string;
        /** Product ID. */
        productId?: string;
        /** Variant ID. */
        variantId?: string;
        /** Number to increment inventory by. */
        incrementBy?: number;
    }
    /** @oneof */
    interface IncrementDataIdOneOf {
        /** Inventory item ID. */
        inventoryId?: string;
        /** Product ID. */
        productId?: string;
    }
    interface IncrementInventoryResponse {
    }
    /**
     * Gets inventory variant information based on the specified option choices.
     *
     *
     * The `getInventoryVariants()` function returns a Promise that resolves to the specified inventory variant information.
     * @param inventoryId - Inventory item ID.
     * @public
     * @requiredField inventoryId
     * @permissionId WIX_STORES.READ_INVENTORY
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Read Products
     * @permissionScopeId SCOPE.DC-STORES.READ-PRODUCTS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @fqn wix.inventory.api.v1.InventoryReadApi.GetInventoryVariants
     */
    function getInventoryVariants(inventoryId: string, options?: GetInventoryVariantsOptions): Promise<GetInventoryVariantsResponse>;
    interface GetInventoryVariantsOptions extends GetInventoryVariantsRequestIdOneOf {
        /** Product ID. */
        productId?: string;
        /** Variant IDs to query for this inventory item (optional). */
        variantIds?: string[];
    }
    /**
     * Returns a list of inventory items, given the provided paging, sorting and filtering.
     * @public
     * @permissionId WIX_STORES.READ_INVENTORY
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Read Products
     * @permissionScopeId SCOPE.DC-STORES.READ-PRODUCTS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @fqn wix.inventory.api.v1.InventoryReadApi.QueryInventory
     */
    function queryInventory(options?: QueryInventoryOptions): Promise<QueryInventoryResponse>;
    interface QueryInventoryOptions {
        /** Information about paging, filters, sorting. */
        query?: Query$1;
    }
    /**
     * Updates product inventory, including total quantity, whether the product is in stock, and whether the product inventory is tracked.
     *
     *
     * The `updateInventoryVariants()` function is a Promise that resolves to the updated inventory variant data.
     * @param productId - Product ID.
     * @public
     * @requiredField inventoryItem
     * @requiredField productId
     * @param inventoryItem - Inventory item to update.
     * @permissionId WIX_STORES.MODIFY_INVENTORY
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.inventory.api.v1.InventoryWriteApi.UpdateInventoryVariants
     */
    function updateInventoryVariants(productId: string | null, inventoryItem: UpdateInventoryVariantsInventoryItem, options?: UpdateInventoryVariantsOptions): Promise<void>;
    interface UpdateInventoryVariantsInventoryItem {
        /** Inventory item ID. */
        _id?: string | null;
        /** Whether quantity is being tracked. */
        trackQuantity?: boolean | null;
        /** Variants associated with this inventory item. */
        variants?: InventoryVariantV2[];
        /**
         * Last updated timestamp.
         * @readonly
         */
        lastUpdated?: Date | null;
        /**
         * Inventory’s unique numeric ID (assigned in ascending order).
         * Primarily for sorting and filtering when crawling all inventories.
         * @readonly
         */
        numericId?: string;
        /** Preorder information. */
        preorderInfo?: PreorderInfo$1;
    }
    interface UpdateInventoryVariantsOptions {
    }
    interface BulkUpdateInventoryVariantsOptions extends BulkUpdateInventoryVariantsRequestActionOneOf {
        /** Change availability. */
        setInStock?: boolean | null;
        /** Set new quantity. */
        setQuantity?: number | null;
        /** Number to increment inventory by. */
        incrementBy?: number | null;
        /** Number to decrement inventory by. */
        decrementBy?: number | null;
    }
    interface BulkUpdateInventoryItemsOptions {
        /** Whether inventory is being tracked. */
        trackInventory: boolean | null;
    }
    /**
     * Subtracts a set number of items from inventory.
     *
     *
     * The `decrementInventory()` function returns a Promise that is resolved when the specified item's quantity has been updated in the inventory.
     * @param decrementData - Item or product to decrement.
     * @public
     * @documentationMaturity preview
     * @requiredField decrementData
     * @permissionId WIX_STORES.MODIFY_INVENTORY
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.inventory.api.v1.InventoryWriteApi.DecrementInventory
     */
    function decrementInventory(decrementData: DecrementData[], options?: DecrementInventoryOptions): Promise<void>;
    interface DecrementInventoryOptions {
    }
    /**
     * Adds a set number of items to inventory.
     *
     *
     * The `incrementInventory()` function returns a Promise that is resolved when the specified item's quantity has been updated in the inventory.
     * @param incrementData - Item or product to increment.
     * @public
     * @documentationMaturity preview
     * @requiredField incrementData
     * @permissionId WIX_STORES.MODIFY_INVENTORY
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.inventory.api.v1.InventoryWriteApi.IncrementInventory
     */
    function incrementInventory(incrementData: IncrementData[], options?: IncrementInventoryOptions): Promise<void>;
    interface IncrementInventoryOptions {
    }
    type storesV2InventoryInventory_universal_d_InventoryItemV2 = InventoryItemV2;
    type storesV2InventoryInventory_universal_d_InventoryVariantV2 = InventoryVariantV2;
    type storesV2InventoryInventory_universal_d_InventoryItemChanged = InventoryItemChanged;
    type storesV2InventoryInventory_universal_d_InventoryVariantsChanged = InventoryVariantsChanged;
    type storesV2InventoryInventory_universal_d_ChangedInventoryVariant = ChangedInventoryVariant;
    type storesV2InventoryInventory_universal_d_ChangedInventoryVariantData = ChangedInventoryVariantData;
    type storesV2InventoryInventory_universal_d_ReasonType = ReasonType;
    const storesV2InventoryInventory_universal_d_ReasonType: typeof ReasonType;
    type storesV2InventoryInventory_universal_d_GetInventoryVariantsRequest = GetInventoryVariantsRequest;
    type storesV2InventoryInventory_universal_d_GetInventoryVariantsRequestIdOneOf = GetInventoryVariantsRequestIdOneOf;
    type storesV2InventoryInventory_universal_d_GetInventoryVariantsResponse = GetInventoryVariantsResponse;
    type storesV2InventoryInventory_universal_d_GetInventoryItemsRequest = GetInventoryItemsRequest;
    type storesV2InventoryInventory_universal_d_GetInventoryItemsResponse = GetInventoryItemsResponse;
    type storesV2InventoryInventory_universal_d_QueryInventoryRequest = QueryInventoryRequest;
    type storesV2InventoryInventory_universal_d_QueryInventoryResponse = QueryInventoryResponse;
    type storesV2InventoryInventory_universal_d_UpdateInventoryVariantsRequest = UpdateInventoryVariantsRequest;
    type storesV2InventoryInventory_universal_d_UpdateInventoryVariantsResponse = UpdateInventoryVariantsResponse;
    type storesV2InventoryInventory_universal_d_BulkUpdateInventoryVariantsRequest = BulkUpdateInventoryVariantsRequest;
    type storesV2InventoryInventory_universal_d_BulkUpdateInventoryVariantsRequestActionOneOf = BulkUpdateInventoryVariantsRequestActionOneOf;
    type storesV2InventoryInventory_universal_d_BulkUpdateInventoryVariantsResponse = BulkUpdateInventoryVariantsResponse;
    type storesV2InventoryInventory_universal_d_BulkUpdateInventoryItemsRequest = BulkUpdateInventoryItemsRequest;
    type storesV2InventoryInventory_universal_d_BulkUpdateInventoryItemsResponse = BulkUpdateInventoryItemsResponse;
    type storesV2InventoryInventory_universal_d_DecrementInventoryRequest = DecrementInventoryRequest;
    type storesV2InventoryInventory_universal_d_DecrementData = DecrementData;
    type storesV2InventoryInventory_universal_d_DecrementDataIdOneOf = DecrementDataIdOneOf;
    type storesV2InventoryInventory_universal_d_DecrementInventoryResponse = DecrementInventoryResponse;
    type storesV2InventoryInventory_universal_d_IncrementInventoryRequest = IncrementInventoryRequest;
    type storesV2InventoryInventory_universal_d_IncrementData = IncrementData;
    type storesV2InventoryInventory_universal_d_IncrementDataIdOneOf = IncrementDataIdOneOf;
    type storesV2InventoryInventory_universal_d_IncrementInventoryResponse = IncrementInventoryResponse;
    const storesV2InventoryInventory_universal_d_getInventoryVariants: typeof getInventoryVariants;
    type storesV2InventoryInventory_universal_d_GetInventoryVariantsOptions = GetInventoryVariantsOptions;
    const storesV2InventoryInventory_universal_d_queryInventory: typeof queryInventory;
    type storesV2InventoryInventory_universal_d_QueryInventoryOptions = QueryInventoryOptions;
    const storesV2InventoryInventory_universal_d_updateInventoryVariants: typeof updateInventoryVariants;
    type storesV2InventoryInventory_universal_d_UpdateInventoryVariantsInventoryItem = UpdateInventoryVariantsInventoryItem;
    type storesV2InventoryInventory_universal_d_UpdateInventoryVariantsOptions = UpdateInventoryVariantsOptions;
    type storesV2InventoryInventory_universal_d_BulkUpdateInventoryVariantsOptions = BulkUpdateInventoryVariantsOptions;
    type storesV2InventoryInventory_universal_d_BulkUpdateInventoryItemsOptions = BulkUpdateInventoryItemsOptions;
    const storesV2InventoryInventory_universal_d_decrementInventory: typeof decrementInventory;
    type storesV2InventoryInventory_universal_d_DecrementInventoryOptions = DecrementInventoryOptions;
    const storesV2InventoryInventory_universal_d_incrementInventory: typeof incrementInventory;
    type storesV2InventoryInventory_universal_d_IncrementInventoryOptions = IncrementInventoryOptions;
    namespace storesV2InventoryInventory_universal_d {
        export { storesV2InventoryInventory_universal_d_InventoryItemV2 as InventoryItemV2, storesV2InventoryInventory_universal_d_InventoryVariantV2 as InventoryVariantV2, PreorderInfo$1 as PreorderInfo, storesV2InventoryInventory_universal_d_InventoryItemChanged as InventoryItemChanged, storesV2InventoryInventory_universal_d_InventoryVariantsChanged as InventoryVariantsChanged, storesV2InventoryInventory_universal_d_ChangedInventoryVariant as ChangedInventoryVariant, storesV2InventoryInventory_universal_d_ChangedInventoryVariantData as ChangedInventoryVariantData, storesV2InventoryInventory_universal_d_ReasonType as ReasonType, storesV2InventoryInventory_universal_d_GetInventoryVariantsRequest as GetInventoryVariantsRequest, storesV2InventoryInventory_universal_d_GetInventoryVariantsRequestIdOneOf as GetInventoryVariantsRequestIdOneOf, storesV2InventoryInventory_universal_d_GetInventoryVariantsResponse as GetInventoryVariantsResponse, storesV2InventoryInventory_universal_d_GetInventoryItemsRequest as GetInventoryItemsRequest, storesV2InventoryInventory_universal_d_GetInventoryItemsResponse as GetInventoryItemsResponse, storesV2InventoryInventory_universal_d_QueryInventoryRequest as QueryInventoryRequest, Query$1 as Query, Paging$1 as Paging, storesV2InventoryInventory_universal_d_QueryInventoryResponse as QueryInventoryResponse, PagingMetadata$1 as PagingMetadata, MessageEnvelope$1 as MessageEnvelope, IdentificationData$1 as IdentificationData, IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf, WebhookIdentityType$1 as WebhookIdentityType, storesV2InventoryInventory_universal_d_UpdateInventoryVariantsRequest as UpdateInventoryVariantsRequest, storesV2InventoryInventory_universal_d_UpdateInventoryVariantsResponse as UpdateInventoryVariantsResponse, storesV2InventoryInventory_universal_d_BulkUpdateInventoryVariantsRequest as BulkUpdateInventoryVariantsRequest, storesV2InventoryInventory_universal_d_BulkUpdateInventoryVariantsRequestActionOneOf as BulkUpdateInventoryVariantsRequestActionOneOf, storesV2InventoryInventory_universal_d_BulkUpdateInventoryVariantsResponse as BulkUpdateInventoryVariantsResponse, storesV2InventoryInventory_universal_d_BulkUpdateInventoryItemsRequest as BulkUpdateInventoryItemsRequest, storesV2InventoryInventory_universal_d_BulkUpdateInventoryItemsResponse as BulkUpdateInventoryItemsResponse, storesV2InventoryInventory_universal_d_DecrementInventoryRequest as DecrementInventoryRequest, storesV2InventoryInventory_universal_d_DecrementData as DecrementData, storesV2InventoryInventory_universal_d_DecrementDataIdOneOf as DecrementDataIdOneOf, storesV2InventoryInventory_universal_d_DecrementInventoryResponse as DecrementInventoryResponse, storesV2InventoryInventory_universal_d_IncrementInventoryRequest as IncrementInventoryRequest, storesV2InventoryInventory_universal_d_IncrementData as IncrementData, storesV2InventoryInventory_universal_d_IncrementDataIdOneOf as IncrementDataIdOneOf, storesV2InventoryInventory_universal_d_IncrementInventoryResponse as IncrementInventoryResponse, storesV2InventoryInventory_universal_d_getInventoryVariants as getInventoryVariants, storesV2InventoryInventory_universal_d_GetInventoryVariantsOptions as GetInventoryVariantsOptions, storesV2InventoryInventory_universal_d_queryInventory as queryInventory, storesV2InventoryInventory_universal_d_QueryInventoryOptions as QueryInventoryOptions, storesV2InventoryInventory_universal_d_updateInventoryVariants as updateInventoryVariants, storesV2InventoryInventory_universal_d_UpdateInventoryVariantsInventoryItem as UpdateInventoryVariantsInventoryItem, storesV2InventoryInventory_universal_d_UpdateInventoryVariantsOptions as UpdateInventoryVariantsOptions, storesV2InventoryInventory_universal_d_BulkUpdateInventoryVariantsOptions as BulkUpdateInventoryVariantsOptions, storesV2InventoryInventory_universal_d_BulkUpdateInventoryItemsOptions as BulkUpdateInventoryItemsOptions, storesV2InventoryInventory_universal_d_decrementInventory as decrementInventory, storesV2InventoryInventory_universal_d_DecrementInventoryOptions as DecrementInventoryOptions, storesV2InventoryInventory_universal_d_incrementInventory as incrementInventory, storesV2InventoryInventory_universal_d_IncrementInventoryOptions as IncrementInventoryOptions, };
    }
    interface Product {
        /**
         * Product ID (generated automatically by the catalog).
         * @readonly
         */
        _id?: string;
        /**
         * Product name.
         *
         * Min: 1 character
         * Max: 80 characters
         */
        name?: string | null;
        /** A friendly URL name (generated automatically by the catalog when a product is created), can be updated. */
        slug?: string;
        /** Whether the product is visible to site visitors. */
        visible?: boolean | null;
        /** Currently, only creating physical products ( `"productType": "physical"` ) is supported via the API. */
        productType?: ProductType;
        /** Product description. */
        description?: string | null;
        /** Stock keeping unit. If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled, SKUs will be set per variant, and this field will be empty. */
        sku?: string | null;
        /** Product weight. If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled, weight will be set per variant, and this field will be empty. */
        weight?: number | null;
        /**
         * Product weight range. The minimum and maximum weights of all the variants.
         * @readonly
         */
        weightRange?: NumericPropertyRange;
        /**
         * Product inventory status (in future this will be writable via Inventory API).
         * @readonly
         */
        stock?: Stock;
        /**
         * Deprecated (use `priceData` instead).
         * @readonly
         * @deprecated
         */
        price?: PriceData;
        /** Price data. */
        priceData?: PriceData;
        /**
         * Price data, converted to the currency specified in request header.
         * @readonly
         */
        convertedPriceData?: PriceData;
        /**
         * Product price range. The minimum and maximum prices of all the variants.
         * @readonly
         */
        priceRange?: NumericPropertyRange;
        /** Cost and profit data. */
        costAndProfitData?: CostAndProfitData;
        /**
         * Product cost range. The minimum and maximum costs of all the variants.
         * @readonly
         */
        costRange?: NumericPropertyRange;
        /** Price per unit data. */
        pricePerUnitData?: PricePerUnitData;
        /** Additional text that the store owner can assign to the product (e.g. shipping details, refund policy, etc.). */
        additionalInfoSections?: AdditionalInfoSection[];
        /**
         * Deprecated (use `ribbon` instead).
         * @readonly
         * @deprecated
         */
        ribbons?: Ribbon[];
        /**
         * Media items (images, videos etc) associated with this product (writable via [Add Product Media](https://dev.wix.com/api/rest/wix-stores/catalog/products/add-product-media) endpoint).
         * @readonly
         */
        media?: Media;
        /**
         * Text box for the customer to add a message to their order (e.g., customization request). Currently writable only from the UI.
         * @readonly
         */
        customTextFields?: CustomTextField[];
        /** Whether variants are being managed for this product - enables unique SKU, price and weight per variant. Also affects inventory data. Once set to `true`, can be reset to `false` only if no variants exist. You cannot set `manageVariants` to `true` if more than 300 variants are defined. */
        manageVariants?: boolean | null;
        /** Options for this product. */
        productOptions?: ProductOption[];
        /**
         * Product page URL for this product (generated automatically by the server).
         * @readonly
         */
        productPageUrl?: PageUrl;
        /**
         * Product’s unique numeric ID (assigned in ascending order).
         * Primarily used for sorting and filtering when crawling all products.
         * @readonly
         */
        numericId?: string;
        /**
         * Inventory item ID - ID referencing the inventory system.
         * @readonly
         */
        inventoryItemId?: string;
        /** Discount deducted from the product's original price. */
        discount?: Discount;
        /**
         * A list of all collection IDs that this product is included in (writable via the Catalog > Collection APIs).
         * @readonly
         */
        collectionIds?: string[];
        /**
         * Product variants, will be provided if the the request was sent with the `includeVariants: true`.
         *
         * Max: 1,000 variants
         * @readonly
         */
        variants?: Variant[];
        /**
         * Date and time the product was last updated.
         * @readonly
         */
        lastUpdated?: Date | null;
        /**
         * Date and time the product was created.
         * @readonly
         */
        _createdDate?: Date | null;
        /** Custom SEO data for the product. */
        seoData?: SeoSchema;
        /** Product ribbon. Used to highlight relevant information about a product. For example, "Sale", "New Arrival", "Sold Out". */
        ribbon?: string | null;
        /** Product brand. Including a brand name can help improve site and product [visibility on search engines](https://support.wix.com/en/article/adding-brand-names-to-boost-product-page-seo-in-wix-stores). */
        brand?: string | null;
    }
    enum ProductType {
        unspecified_product_type = "unspecified_product_type",
        physical = "physical",
        digital = "digital"
    }
    interface NumericPropertyRange {
        /** Minimum value. */
        minValue?: number;
        /** Maximum value. */
        maxValue?: number;
    }
    interface Stock {
        /** Whether inventory is being tracked */
        trackInventory?: boolean;
        /** Quantity currently left in inventory */
        quantity?: number | null;
        /**
         * Whether the product is currently in stock (relevant only when tracking manually)
         * Deprecated (use `inventoryStatus` instead)
         * @deprecated
         */
        inStock?: boolean;
        /**
         * The current status of the inventory
         * + `IN_STOCK` - In stock
         * + `OUT_OF_STOCK` - Not in stock
         * + `PARTIALLY_OUT_OF_STOCK` - Some of the variants are not in stock
         */
        inventoryStatus?: InventoryStatus;
    }
    enum InventoryStatus {
        /** In stock */
        IN_STOCK = "IN_STOCK",
        /** Not in stock */
        OUT_OF_STOCK = "OUT_OF_STOCK",
        /** Some of the variants are not in stock */
        PARTIALLY_OUT_OF_STOCK = "PARTIALLY_OUT_OF_STOCK"
    }
    interface PriceData {
        /**
         * Product price currency
         * @readonly
         */
        currency?: string;
        /** Product price */
        price?: number | null;
        /**
         * Discounted product price (if no discounted price is set, the product price is returned)
         * @readonly
         */
        discountedPrice?: number;
        /**
         * The product price and discounted price, formatted with the currency
         * @readonly
         */
        formatted?: FormattedPrice;
        /**
         * Price per unit
         * @readonly
         */
        pricePerUnit?: number | null;
    }
    interface FormattedPrice {
        /** Product price formatted with the currency */
        price?: string;
        /** Discounted product price formatted with the currency (if no discounted price is set, the product formatted price is returned) */
        discountedPrice?: string;
        /**
         * Price per unit
         * @readonly
         */
        pricePerUnit?: string | null;
    }
    interface CostAndProfitData {
        /** Item cost. */
        itemCost?: number | null;
        /**
         * Item cost formatted with currency symbol.
         * @readonly
         */
        formattedItemCost?: string;
        /**
         * Profit. Calculated by reducing `cost` from `discounted_price`.
         * @readonly
         */
        profit?: number;
        /**
         * Profit formatted with currency symbol.
         * @readonly
         */
        formattedProfit?: string;
        /**
         * Profit Margin. Calculated by dividing `profit` by `discounted_price`.
         * The result is rounded to 4 decimal places.
         * @readonly
         */
        profitMargin?: number;
    }
    interface PricePerUnitData {
        /** Total quantity */
        totalQuantity?: number;
        /** Total measurement unit */
        totalMeasurementUnit?: MeasurementUnit;
        /** Base quantity */
        baseQuantity?: number;
        /** Base measurement unit */
        baseMeasurementUnit?: MeasurementUnit;
    }
    enum MeasurementUnit {
        UNSPECIFIED = "UNSPECIFIED",
        ML = "ML",
        CL = "CL",
        L = "L",
        CBM = "CBM",
        MG = "MG",
        G = "G",
        KG = "KG",
        MM = "MM",
        CM = "CM",
        M = "M",
        SQM = "SQM",
        OZ = "OZ",
        LB = "LB",
        FLOZ = "FLOZ",
        PT = "PT",
        QT = "QT",
        GAL = "GAL",
        IN = "IN",
        FT = "FT",
        YD = "YD",
        SQFT = "SQFT"
    }
    interface AdditionalInfoSection {
        /** Product info section title */
        title?: string;
        /** Product info section description */
        description?: string;
    }
    interface Ribbon {
        /** Ribbon text */
        text?: string;
    }
    interface Media {
        /** Primary media (image, video etc) associated with this product. */
        mainMedia?: MediaItem;
        /** Media (images, videos etc) associated with this product. */
        items?: MediaItem[];
    }
    interface MediaItem extends MediaItemItemOneOf {
        /** Image data (URL, size). */
        image?: MediaItemUrlAndSize;
        /** Video data (URL, size). */
        video?: MediaItemVideo;
        /** Media item thumbnail details. */
        thumbnail?: MediaItemUrlAndSize;
        /** Media item type (image, video, etc.). */
        mediaType?: MediaItemType;
        /** Media item title. */
        title?: string;
        /** Media ID (for example, `"nsplsh_306d666a123a4a74306459~mv2_d_4517_2992_s_4_2.jpg"`). */
        _id?: string;
    }
    /** @oneof */
    interface MediaItemItemOneOf {
        /** Image data (URL, size). */
        image?: MediaItemUrlAndSize;
        /** Video data (URL, size). */
        video?: MediaItemVideo;
    }
    interface MediaItemUrlAndSize {
        /** Media item URL. */
        url?: string;
        /** Media item width. */
        width?: number;
        /** Media item height. */
        height?: number;
        /** Media format (mp4, png, etc.). */
        format?: string | null;
        /** Alt text. This text will be shown in case the image is not available. */
        altText?: string | null;
    }
    enum MediaItemType {
        unspecified_media_item_type = "unspecified_media_item_type",
        /** Image media type. */
        image = "image",
        /** Video media type. */
        video = "video",
        /** Audio media type. */
        audio = "audio",
        /** Document media type. */
        document = "document",
        /** Zip media type. */
        zip = "zip"
    }
    interface MediaItemVideo {
        /** Data (URL, size) about each resolution for which this video is available. */
        files?: MediaItemUrlAndSize[];
        /** ID of an image taken from the video. Used primarily for Wix Search indexing. For example, `"nsplsh_306d666a123a4a74306459~mv2_d_4517_2992_s_4_2.jpg"`. */
        stillFrameMediaId?: string;
    }
    interface CustomTextField {
        /** Text box title */
        title?: string;
        /** Text box input max length */
        maxLength?: number;
        /** Whether this text box is mandatory */
        mandatory?: boolean;
    }
    interface ProductOption {
        /**
         * Option type.
         * @readonly
         */
        optionType?: OptionType;
        /** Option name. */
        name?: string;
        /** Choices available for this option. */
        choices?: Choice[];
    }
    enum OptionType {
        /** Unspecified option type. */
        unspecified_option_type = "unspecified_option_type",
        /** Drop down. */
        drop_down = "drop_down",
        /** Color. */
        color = "color"
    }
    interface Choice {
        /** Choice value. */
        value?: string;
        /** Choice description. */
        description?: string;
        /**
         * Media items (images, videos) associated with this choice
         * @readonly
         */
        media?: Media;
        /**
         * Based on the customer’s choices, which (if any) variants that include the selected choices are in stock
         * @readonly
         */
        inStock?: boolean;
        /**
         * Based on the customer’s choices, which (if any) variants that include the selected choices are visible
         * @readonly
         */
        visible?: boolean;
    }
    interface PageUrl {
        /** Base URL. For premium sites, this is the domain. For free sites, this is the site URL (e.g mysite.wixsite.com/mysite). */
        base?: string;
        /** Path to the product page - e.g /product-page/a-product. */
        path?: string;
    }
    interface Discount {
        /**
         * Discount type:
         * + `"AMOUNT"`
         * + `"PERCENT"`
         */
        type?: DiscountType;
        /** Discount value */
        value?: number;
    }
    enum DiscountType {
        UNDEFINED = "UNDEFINED",
        /** No discount */
        NONE = "NONE",
        /** Discount by a fixed amount */
        AMOUNT = "AMOUNT",
        /** Discount by a percentage */
        PERCENT = "PERCENT"
    }
    interface Variant {
        /** Requested Variant ID */
        _id?: string;
        /** Specific choices within a selection, as option-choice key-value pairs */
        choices?: Record<string, string>;
        variant?: VariantDataWithNoStock;
        /**
         * Variant inventory status.
         * @readonly
         */
        stock?: VariantStock;
    }
    interface VariantDataWithNoStock {
        /** Variant price. */
        priceData?: PriceData;
        /**
         * Variant price data, converted to currency requested in header.
         * @readonly
         */
        convertedPriceData?: PriceData;
        /** Cost and profit data. */
        costAndProfitData?: CostAndProfitData;
        /** Variant weight. */
        weight?: number;
        /** Variant SKU (stock keeping unit). */
        sku?: string;
        /** Whether the variant is visible to customers. */
        visible?: boolean;
    }
    interface VariantStock {
        /** Whether inventory is being tracked. */
        trackQuantity?: boolean;
        /** Quantity currently left in inventory. */
        quantity?: number | null;
        /** Whether the product is currently in stock (relevant only when tracking manually). */
        inStock?: boolean;
    }
    /**
     * The SEO schema object contains data about different types of meta tags. It makes sure that the information about your page is presented properly to search engines.
     * The search engines use this information for ranking purposes, or to display snippets in the search results.
     * This data will override other sources of tags (for example patterns) and will be included in the <head> section of the HTML document, while not being displayed on the page itself.
     */
    interface SeoSchema {
        /** SEO tag information. */
        tags?: Tag[];
        /** SEO general settings. */
        settings?: Settings;
    }
    interface Keyword {
        /** Keyword value. */
        term?: string;
        /** Whether the keyword is the main focus keyword. */
        isMain?: boolean;
        /** The source that added the keyword terms to the SEO settings. */
        origin?: string | null;
    }
    interface Tag {
        /**
         * SEO tag type.
         *
         *
         * Supported values: `title`, `meta`, `script`, `link`.
         */
        type?: string;
        /**
         * A `{"key": "value"}` pair object where each SEO tag property (`"name"`, `"content"`, `"rel"`, `"href"`) contains a value.
         * For example: `{"name": "description", "content": "the description itself"}`.
         */
        props?: Record<string, any> | null;
        /** SEO tag meta data. For example, `{"height": 300, "width": 240}`. */
        meta?: Record<string, any> | null;
        /** SEO tag inner content. For example, `<title> inner content </title>`. */
        children?: string;
        /** Whether the tag is a custom tag. */
        custom?: boolean;
        /** Whether the tag is disabled. */
        disabled?: boolean;
    }
    interface Settings {
        /**
         * Whether the Auto Redirect feature, which creates `301 redirects` on a slug change, is enabled.
         *
         *
         * Default: `false` (Auto Redirect is enabled.)
         */
        preventAutoRedirect?: boolean;
        /** User-selected keyword terms for a specific page. */
        keywords?: Keyword[];
    }
    interface SecuredMedia {
        /** Media ID in Wix Media Manager. */
        _id?: string;
        /** Original filename. */
        fileName?: string;
        /** File type. */
        fileType?: FileType;
    }
    enum FileType {
        UNSPECIFIED = "UNSPECIFIED",
        SECURE_PICTURE = "SECURE_PICTURE",
        SECURE_VIDEO = "SECURE_VIDEO",
        SECURE_DOCUMENT = "SECURE_DOCUMENT",
        SECURE_MUSIC = "SECURE_MUSIC",
        SECURE_ARCHIVE = "SECURE_ARCHIVE"
    }
    interface CreateProductRequest {
        /** Product information. */
        product?: Product;
    }
    interface CreateProductResponse {
        product?: Product;
    }
    interface CreateProductPlatformizedRequest {
        /** Product information. */
        product?: Product;
    }
    interface CreateProductPlatformizedResponse {
        product?: Product;
    }
    interface CreateDigitalProductRequest {
        /** Product information. */
        product?: Product;
    }
    interface CreateDigitalProductResponse {
        /** Created product. */
        product?: Product;
    }
    interface UpdateProductRequest {
        product: Product;
    }
    interface UpdateProductResponse {
        product?: Product;
    }
    interface UpdateProductPlatformizedRequest {
        product: Product;
    }
    interface UpdateProductPlatformizedResponse {
        product?: Product;
    }
    interface DeleteProductRequest {
        /** ID of the product to delete. */
        _id: string;
    }
    interface DeleteProductResponse {
    }
    interface DeleteProductPlatformizedRequest {
        /** ID of the product to delete. */
        _id: string;
    }
    interface DeleteProductPlatformizedResponse {
    }
    interface BulkDeleteProductsRequest {
        /** IDs of the products to be deleted. */
        ids: string[];
    }
    interface BulkDeleteProductsResponse {
    }
    interface UpdateVariantsRequest {
        /** ID of the product with managed variants. */
        _id: string;
        /** Variant info to update. */
        variants?: VariantOverride[];
    }
    interface VariantOverride {
        /** The specific choices available or chosen from within a selection (e.g., choosing the red Selection triggers the red Choice). You may specify all the relevant choices for a specific variant, or only some of the options, which will return all corresponding variants (Not relevant when passing variant IDs) */
        choices?: Record<string, string>;
        /**
         * List of variant IDs
         * (Not relevant when passing choices)
         */
        variantIds?: string[];
        /** Variant price */
        price?: number | null;
        /** Variant cost of goods */
        cost?: number | null;
        /** Variant weight */
        weight?: number | null;
        /** Variant SKU (stock keeping unit) */
        sku?: string | null;
        /** Whether the variant is visible to  customers */
        visible?: boolean | null;
    }
    interface UpdateVariantsResponse {
        /** List of the product's variants. */
        variants?: Variant[];
    }
    interface ResetAllVariantDataRequest {
        /** Product ID. */
        _id: string;
    }
    interface ResetAllVariantDataResponse {
    }
    interface AddProductsToCollectionRequest {
        /** Collection ID. */
        _id: string;
        /** IDs of the products to add to the collection, separated by commas. */
        productIds?: string[];
    }
    interface AddProductsToCollectionResponse {
    }
    interface RemoveProductsFromCollectionRequest {
        /** ID of the collection from which to remove products. */
        _id: string;
        /** IDs of the products to remove from the collection. */
        productIds: string[];
    }
    interface RemoveProductsFromCollectionResponse {
    }
    interface AddProductMediaRequest {
        /** Product ID. */
        _id: string;
        /** Sources of media items already uploaded to the Wix site. */
        media?: MediaDataForWrite[];
    }
    interface MediaDataForWrite extends MediaDataForWriteMediaSourceOneOf {
        /** Media ID. */
        mediaId?: string;
        /** Media external URL (for new media items). */
        url?: string;
        /** Assign this media item to a specific product choice. Note that you may set media items for choices under only one option (e.g., if Colors blue, green, and red have media items, Sizes S, M, and L can't have media items assigned to them). You may clear existing media from choices with the [Remove Product Media From Choices](#removeproductmediafromchoices). */
        choice?: OptionAndChoice;
    }
    /** @oneof */
    interface MediaDataForWriteMediaSourceOneOf {
        /** Media ID. */
        mediaId?: string;
        /** Media external URL (for new media items). */
        url?: string;
    }
    interface OptionAndChoice {
        /** Option to add the media to. */
        option?: string;
        /** Choice to add the media to. */
        choice?: string;
    }
    interface AddProductMediaResponse {
    }
    interface RemoveProductMediaRequest {
        /** Product ID. */
        _id: string;
        /** List of media IDs to remove. Pass an empty array to delete all media items for the product. */
        mediaIds?: string[];
    }
    interface RemoveProductMediaResponse {
    }
    interface AddProductMediaToChoicesRequest {
        /** Product ID. */
        _id: string;
        /** Product media items and the choices to add the media to. */
        media?: MediaAssignmentToChoice[];
    }
    interface MediaAssignmentToChoice {
        /** Option name. */
        option?: string;
        /** Choice name. */
        choice?: string;
        /** Media IDs (available via the Query Product endpoint). */
        mediaIds?: string[];
    }
    interface AddProductMediaToChoicesResponse {
    }
    interface RemoveProductMediaFromChoicesRequest {
        /** Product ID from whose choices to remove media items. */
        _id: string;
        /** Media to remove from choices. If an empty array is passed, all media will be removed from all choices for the given product. */
        media?: MediaAssignmentToChoice[];
    }
    interface RemoveProductMediaFromChoicesResponse {
    }
    interface DeleteProductOptionsRequest {
        /** ID of the product with options to delete. */
        _id: string;
    }
    interface DeleteProductOptionsResponse {
    }
    interface SetCustomFieldsRequest {
        /** Product ID. */
        _id: string;
        /** Custom field that will be added, if a custom field with the same name already exists, the value of the custom field will be overridden. */
        customFields?: Record<string, any>;
    }
    interface SetCustomFieldsResponse {
    }
    interface RemoveCustomFieldsRequest {
        /** Product ID. */
        _id: string;
        /** Custom fields to be removed (by name). */
        names?: string[];
    }
    interface RemoveCustomFieldsResponse {
    }
    interface RemoveProductBrandRequest {
        /** Product ID. */
        _id: string;
    }
    interface RemoveProductBrandResponse {
    }
    interface BulkSetCustomFieldsRequest {
        /** Filter string. */
        filter?: string | null;
        /** Custom field that will be added, if a custom field with same name already exists, the value of the custom field will be overridden. */
        customFields?: Record<string, any>;
    }
    interface BulkSetCustomFieldsResponse {
    }
    interface BulkRemoveCustomFieldsRequest {
        /** Filter string. */
        filter?: string | null;
        /** Custom fields names. */
        names?: string[];
    }
    interface BulkRemoveCustomFieldsResponse {
    }
    interface CreateCollectionRequest {
        /** Collection info. */
        collection: Collection;
    }
    interface Collection {
        /**
         * Collection ID (generated automatically by the catalog).
         * @readonly
         */
        _id?: string | null;
        /** Collection name. */
        name?: string | null;
        /**
         * Media items (images, videos etc) associated with this collection. Read only.
         * @readonly
         */
        media?: Media;
        /**
         * Number of products in the collection. Read only.
         * @readonly
         */
        numberOfProducts?: number;
        /** Collection description. */
        description?: string | null;
        /** Collection slug. */
        slug?: string | null;
        /** Collection visibility. Only impacts dynamic pages, no impact on static pages. Default: `true`. */
        visible?: boolean | null;
    }
    interface CreateCollectionResponse {
        /** Collection. */
        collection?: Collection;
    }
    interface UpdateCollectionRequest {
        /** Collection info. */
        collection: Collection;
    }
    interface UpdateCollectionResponse {
        /** Updated collection. */
        collection?: Collection;
    }
    interface DeleteCollectionRequest {
        /** ID of the collection to delete. */
        _id: string;
    }
    interface DeleteCollectionResponse {
    }
    interface RemoveProductRibbonRequest {
        /** Product ID. */
        _id: string;
    }
    interface RemoveProductRibbonResponse {
    }
    interface BulkUpdateProductsRequest {
        /** Product IDs. */
        ids: string[];
        /** Field to update. */
        set?: SetValue;
    }
    interface SetValue extends SetValueValueOneOf {
        /**
         * Set product price.
         * If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled,
         * variant prices will be calculated according to the set product price.
         * If variant price is negative after setting new price, the update will fail.
         */
        price?: number;
        /**
         * Set product cost of goods.
         * If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled,
         * cost of goods will be set per variant.
         */
        cost?: number;
        /**
         * Set product weight.
         * If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled,
         * weight will be set per variant.
         */
        weight?: number;
        /** Set product ribbon. Pass empty string to remove existing ribbon. */
        ribbon?: string;
        /** Set product brand. Pass empty string to remove existing brand. */
        brand?: string;
    }
    /** @oneof */
    interface SetValueValueOneOf {
        /**
         * Set product price.
         * If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled,
         * variant prices will be calculated according to the set product price.
         * If variant price is negative after setting new price, the update will fail.
         */
        price?: number;
        /**
         * Set product cost of goods.
         * If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled,
         * cost of goods will be set per variant.
         */
        cost?: number;
        /**
         * Set product weight.
         * If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled,
         * weight will be set per variant.
         */
        weight?: number;
        /** Set product ribbon. Pass empty string to remove existing ribbon. */
        ribbon?: string;
        /** Set product brand. Pass empty string to remove existing brand. */
        brand?: string;
    }
    interface BulkUpdateProductsResponse {
        /** Bulk action results. */
        results?: BulkProductResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata;
    }
    interface BulkProductResult {
        /** Item metadata. */
        itemMetadata?: ItemMetadata;
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
    interface BulkUpdateProductsByFilterSyncRequest {
        /** Filter object. Learn more about supported filters [here](https://bo.wix.com/wix-docs/rest/stores/stores-catalog/filter-and-sort). */
        filter: Record<string, any> | null;
        /** The field to update. */
        set?: SetValue;
    }
    interface BulkUpdateProductsByFilterSyncResponse {
        /** Items updated by bulk action. */
        results?: BulkProductResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata;
    }
    interface AllowedProductsCountLimitExceededErrorData {
        /** Total number of products */
        totalCount?: number;
    }
    interface BulkAdjustProductPropertiesRequest {
        /** Product IDs. */
        ids: string[];
        /** Numerical property to adjust. */
        adjust?: AdjustValue;
    }
    interface AdjustValue extends AdjustValueValueOneOf {
        /**
         * Adjust product price.
         * If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled,
         * variants prices will be calculated according to the adjusted price.
         * If variant price is negative after the adjustment, the update will fail.
         */
        price?: PropertyAdjustmentData;
        /**
         * Adjust product cost of goods.
         * If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled,
         * cost of goods will be adjusted per variant.
         */
        cost?: PropertyAdjustmentData;
        /**
         * Adjust product weight.
         * If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled,
         * weight will be adjusted per variant.
         */
        weight?: PropertyAdjustmentData;
    }
    /** @oneof */
    interface AdjustValueValueOneOf {
        /**
         * Adjust product price.
         * If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled,
         * variants prices will be calculated according to the adjusted price.
         * If variant price is negative after the adjustment, the update will fail.
         */
        price?: PropertyAdjustmentData;
        /**
         * Adjust product cost of goods.
         * If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled,
         * cost of goods will be adjusted per variant.
         */
        cost?: PropertyAdjustmentData;
        /**
         * Adjust product weight.
         * If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled,
         * weight will be adjusted per variant.
         */
        weight?: PropertyAdjustmentData;
    }
    interface PropertyAdjustmentData extends PropertyAdjustmentDataByOneOf {
        /** Adjust by percentage. */
        percentage?: PercentageData;
        /** Adjust by amount. */
        amount?: number;
    }
    /** @oneof */
    interface PropertyAdjustmentDataByOneOf {
        /** Adjust by percentage. */
        percentage?: PercentageData;
        /** Adjust by amount. */
        amount?: number;
    }
    interface PercentageData {
        /**
         * If `true`, result will be rounded to the nearest whole number.
         * If `false`, result will be rounded to 2 places after the decimal point.
         */
        roundToInt?: boolean;
        /**
         * Percentage value, as a whole number (integer) between `-100` and `1000`.
         *
         * For example:
         * + Pass `100` to increase value by 100% (multiply original value by 2).
         * + Pass `1000` to increase value by 1000% (multiply original value by 10).
         * + Pass `-50` to decrease value by 50% (original value is halved).
         */
        rate?: number;
    }
    interface BulkAdjustProductPropertiesResponse {
        /** Bulk action results. */
        results?: BulkProductResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata;
    }
    interface BulkAdjustProductPropertiesByFilterSyncRequest {
        /** Filter object. Learn more about supported filters [here](https://bo.wix.com/wix-docs/rest/stores/stores-catalog/filter-and-sort). */
        filter: Record<string, any> | null;
        /** Numerical property to adjust. */
        adjust?: AdjustValue;
    }
    interface BulkAdjustProductPropertiesByFilterSyncResponse {
        /** Items updated by bulk action. */
        results?: BulkProductResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata;
    }
    interface ReCloneStoreRequest {
        /** Description of value */
        metasiteId: string | null;
        originalMetasiteId?: string | null;
    }
    interface ReCloneStoreResponse {
    }
    interface V1CreateProductPlatformizedRequest {
        /** Product information. */
        product?: Product;
    }
    interface V1CreateProductPlatformizedResponse {
        product?: Product;
    }
    interface V1UpdateProductPlatformizedRequest {
        product: Product;
    }
    interface V1UpdateProductPlatformizedResponse {
        product?: Product;
    }
    interface V1DeleteProductPlatformizedRequest {
        /** ID of the product to delete. */
        _id: string;
    }
    interface V1DeleteProductPlatformizedResponse {
    }
    interface ProductCreated {
        /** Product ID (generated automatically by the catalog). */
        productId?: string;
        /** Product name. */
        name?: string;
        /** Product price. */
        price?: PriceData;
        /** Whether the product is visible to customers. */
        visible?: boolean;
        /** Media items (images, videos, etc.) associated with this product. */
        media?: Media;
        /** Product stock keeping unit (SKU). If variants are being managed, this will be empty. */
        sku?: string;
        /** Product page URL for this product (generated automatically by the server). */
        productPageUrl?: PageUrl;
        /** Product brand. */
        brand?: string | null;
        /** Cost and profit data */
        costAndProfitData?: CostAndProfitData;
        /** Information about the version of the catalog from where this event was triggered. */
        originatedFromVersion?: Version;
        /** Event slug. A human readable identifier of the event. */
        slug?: string;
    }
    enum Version {
        /** Version 1 of the catalog. */
        V1_CATALOG = "V1_CATALOG",
        /** Version 3 of the catalog. */
        V3_CATALOG = "V3_CATALOG"
    }
    interface ProductChanged {
        /** Product ID. */
        productId?: string;
        /** List of product fields that were changed. */
        changedFields?: string[];
        /** Information about the version of the catalog from where this event was triggered. */
        originatedFromVersion?: Version;
    }
    interface ProductDeleted {
        /** ID of the product that was deleted. */
        productId?: string;
        /** Information about the version of the catalog from where this event was triggered. */
        originatedFromVersion?: Version;
    }
    interface CollectionCreated {
        /** Collection ID (generated automatically by the catalog). */
        collection_Id?: string;
        /** Collection name. */
        name?: string;
        /** Media items (images, videos, etc.) associated with this collection. */
        media?: Media;
        /** Collection slug */
        slug?: string;
        /** Collection visible status */
        visible?: boolean;
        /** Information about the version of the catalog from where this event was triggered. */
        originatedFromVersion?: Version;
    }
    interface CollectionChanged {
        /** Collection ID (generated automatically by the catalog). */
        collection_Id?: string;
        /** List of collection fields that were changed. */
        changedFields?: string[];
        /** Information about the version of the catalog from where this event was triggered. */
        originatedFromVersion?: Version;
    }
    interface CollectionDeleted {
        /** ID of the collection that was deleted. */
        collection_Id?: string;
        /** Information about the version of the catalog from where this event was triggered. */
        originatedFromVersion?: Version;
    }
    interface VariantsChanged {
        /** Product ID. */
        productId?: string;
        /** List of variants that were changed. */
        variants?: VariantChanged[];
        /** Information about the version of the catalog from where this event was triggered. */
        originatedFromVersion?: Version;
    }
    interface VariantChanged {
        /** Variant ID. */
        variantId?: string;
        choices?: Record<string, string>;
        /** List of variant fields that were changed. */
        changedFields?: string[];
        /** Information about the version of the catalog from where this event was triggered. */
        originatedFromVersion?: Version;
    }
    interface QueryProductsRequest {
        query?: Query;
        /** Whether variants should be included in the response. */
        includeVariants?: boolean;
        /** Whether hidden products should be included in the response. Requires permissions to manage products. */
        includeHiddenProducts?: boolean;
        /** Whether merchant specific data should be included in the response. Requires permissions to manage products. */
        includeMerchantSpecificData?: boolean;
    }
    interface Query {
        paging?: Paging;
        /** Filter string */
        filter?: string | null;
        /** Sort string */
        sort?: string | null;
    }
    interface Paging {
        /** Amount of items to load per page */
        limit?: number | null;
        /** Number of items to skip in the display (relevant for all pages after the first) */
        offset?: number | null;
    }
    interface QueryProductsResponse {
        products?: Product[];
        metadata?: PagingMetadata;
        totalResults?: number;
    }
    interface PagingMetadata {
        /** Amount of items to load per page */
        items?: number;
        /** Number of items to skip in the display (relevant for all pages after the first) */
        offset?: number;
    }
    interface QueryProductsPlatformizedRequest {
        query?: PlatformQuery;
    }
    interface PlatformQuery extends PlatformQueryPagingMethodOneOf {
        /** Pointer to page of results using offset. Cannot be used together with `cursorPaging`. */
        paging?: PlatformPaging;
        /** Cursor pointing to page of results. Cannot be used together with `paging`. `cursorPaging.cursor` can not be used together with `filter` or `sort`. */
        cursorPaging?: CursorPaging;
        /** Filter object. */
        filter?: Record<string, any> | null;
        /** Sorting options. For example, `[{"fieldName":"sortField1"},{"fieldName":"sortField2","direction":"DESC"}]`. */
        sort?: Sorting[];
    }
    /** @oneof */
    interface PlatformQueryPagingMethodOneOf {
        /** Pointer to page of results using offset. Cannot be used together with `cursorPaging`. */
        paging?: PlatformPaging;
        /** Cursor pointing to page of results. Cannot be used together with `paging`. `cursorPaging.cursor` can not be used together with `filter` or `sort`. */
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
    interface PlatformPaging {
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
    interface QueryProductsPlatformizedResponse {
        products?: Product[];
        metadata?: PlatformPagingMetadata;
    }
    interface PlatformPagingMetadata {
        /** The number of items returned in this response. */
        count?: number | null;
        /** The offset which was requested. Returned if offset paging was used. */
        offset?: number | null;
        /** The total number of items that match the query. Returned if offset paging was used. */
        total?: number | null;
        /** Cursors to navigate through result pages. Returned if cursor paging was used. */
        cursors?: Cursors;
    }
    interface Cursors {
        /** Cursor string pointing to the next page in the list of results. */
        next?: string | null;
        /** Cursor pointing to the previous page in the list of results. */
        prev?: string | null;
    }
    interface QueryProductsWithBigPageLimitRequest {
        query?: QueryWithBigPageLimit;
        /** Whether variants should be included in the response. */
        includeVariants?: boolean;
        /** Whether hidden products should be included in the response. Requires permissions to manage products. */
        includeHiddenProducts?: boolean;
        /** Whether merchant specific data should be included in the response. Requires permissions to manage products. */
        includeMerchantSpecificData?: boolean;
    }
    interface QueryWithBigPageLimit {
        paging?: PagingWithBigLimit;
        /** Filter string */
        filter?: string | null;
        /** Sort string */
        sort?: string | null;
    }
    interface PagingWithBigLimit {
        /** Amount of items to load per page */
        limit?: number | null;
        /** Number of items to skip in the display (relevant for all pages after the first) */
        offset?: number | null;
    }
    interface GetProductsRequest {
        /** Requested product IDs. */
        ids?: string[];
    }
    interface GetProductsResponse {
        products?: Product[];
    }
    interface GetProductRequest {
        /** Requested product ID. */
        _id: string;
        /** Whether merchant specific data, such as cost and profit data, should be included in the response. Requires permissions to manage products. */
        includeMerchantSpecificData?: boolean;
    }
    interface GetProductResponse {
        /** Requested product data. */
        product?: Product;
    }
    interface GetProductPlatformizedRequest {
        /** Requested product ID. */
        _id: string;
        /** Whether merchant specific data, such as cost and profit data, should be included in the response. Requires permissions to manage products. */
        includeMerchantSpecificData?: boolean;
    }
    interface GetProductPlatformizedResponse {
        /** Requested product data. */
        product?: Product;
    }
    interface QueryCollectionsRequest {
        /** Query options. */
        query?: Query;
        /** Whether number of products should be included in the response. */
        includeNumberOfProducts?: boolean;
        /** Wether to include collection description in the response. When `false` is passed, `collection.description` will return null. */
        includeDescription?: boolean;
    }
    interface QueryCollectionsResponse {
        /** List of collections. */
        collections?: Collection[];
        /** Details on the paged set of results returned. */
        metadata?: PagingMetadata;
        /** Total number of results returned. */
        totalResults?: number;
    }
    interface QueryCollectionsPlatformizedRequest {
        query?: PlatformQuery;
    }
    interface QueryCollectionsPlatformizedResponse {
        collections?: Collection[];
        metadata?: PlatformPagingMetadata;
    }
    interface GetCollectionRequest {
        /** Requested collection ID. */
        _id: string;
        /**
         * Whether to return the `collection.numberOfProducts` field in the response.
         * Defaults to `false`, in which case the value of `collection.numberOfProducts` will be `0`.
         */
        includeNumberOfProducts?: boolean;
    }
    interface GetCollectionResponse {
        /** The requested collection. */
        collection?: Collection;
    }
    interface GetCollectionBySlugRequest {
        /** Slug of the collection to retrieve. */
        slug: string;
    }
    interface GetCollectionBySlugResponse {
        /** The requested collection. */
        collection?: Collection;
    }
    interface ProductOptionsAvailabilityRequest {
        /** Requested product ID. */
        _id: string;
        /** Array containing the selected options. For example, `["color": "Blue", "size": "Large"]`. */
        options?: Record<string, string>;
    }
    interface ProductOptionsAvailabilityResponse {
        /** Variant information, given that all the choices were provided. */
        selectedVariant?: VariantData;
        /** Information about media items (images, videos, etc.) associated with this choice. */
        media?: Media;
        /** Options information (color, size, etc.) for this product, with the inventory and visibility fields updated based on the provided choices. */
        productOptions?: ProductOption[];
        /** Whether all the selected choices result in a visible, in-stock variant. */
        availableForPurchase?: boolean;
    }
    interface VariantData {
        /** Variant price. */
        price?: PriceData;
        /**
         * Variant price data converted to currency provided in header.
         * @readonly
         */
        convertedPriceData?: PriceData;
        /** Variant weight. */
        weight?: number | null;
        /** Variant SKU (stock keeping unit). */
        sku?: string;
        /** Quantity currently in inventory (relevant only when tracking by inventory). */
        quantity?: number | null;
        /** Whether the product is currently in stock (relevant only when tracking manually). */
        inStock?: boolean;
        /** Whether the variant is visible to customers. */
        visible?: boolean;
    }
    interface QueryProductVariantsRequest {
        /** Requested product ID. */
        _id: string;
        /**
         * The specific choices available or chosen from within a selection (e.g., choosing the red Selection triggers the red Choice).
         * You may specify all the relevant choices for a specific variant, or only some of the options, which will return all corresponding variants (not relevant when passing variant IDs).
         */
        choices?: Record<string, string>;
        /** List of variant IDs (not relevant when passing choices). */
        variantIds?: string[];
        paging?: Paging;
        /** Whether merchant specific data should be included in the response. Requires permissions to manage products. */
        includeMerchantSpecificData?: boolean;
    }
    interface QueryProductVariantsResponse {
        /** List of variants based on the specified filters and sorting. */
        variants?: Variant[];
        metadata?: PagingMetadata;
        totalResults?: number;
    }
    interface QueryStoreVariantsRequest {
        /** Query options. */
        query?: PlatformQuery;
    }
    interface QueryStoreVariantsResponse {
        /** List of variants based on the specified filters and sorting. */
        variants?: StoreVariant[];
        /** Details on the paged set of results returned. */
        metadata?: PlatformPagingMetadata;
    }
    interface StoreVariant {
        /** Store variant ID. Comprised of the `productId` and the `variantId`, separated by a hyphen: {productId}.{variantId}. */
        _id?: string;
        /** Variant ID. */
        variantId?: string;
        /** Product ID. */
        productId?: string;
        /** Variant name. */
        variantName?: string;
        /** Product name. */
        productName?: string;
        /** Whether the variant is managed or represents a product. */
        managedVariant?: boolean;
        /** Variant SKU (stock keeping unit). */
        sku?: string;
        /** Variant inventory status. */
        stock?: VariantStock;
        /** The selected options of this variant. For example, `{"Color": "Blue", "Size": "Large"}`. */
        choices?: Record<string, string>;
        /** Collections that include this variant. */
        collectionIds?: string[];
        /**
         * Media items (images, videos) associated with this variant.
         * @readonly
         */
        media?: PlatformMedia;
        /** Preorder information. */
        preorderInfo?: PreorderInfo;
    }
    interface PlatformMedia extends PlatformMediaMediaOneOf {
        image?: string;
        video?: string;
    }
    /** @oneof */
    interface PlatformMediaMediaOneOf {
        image?: string;
        video?: string;
    }
    interface FocalPoint {
        /** X-coordinate of the focal point. */
        x?: number;
        /** Y-coordinate of the focal point. */
        y?: number;
        /** crop by height */
        height?: number | null;
        /** crop by width */
        width?: number | null;
    }
    interface VideoResolution {
        /** Video URL. */
        url?: string;
        /** Video height. */
        height?: number;
        /** Video width. */
        width?: number;
        /** Video format for example, mp4, hls. */
        format?: string;
    }
    interface PreorderInfo {
        /** Whether the item is available for preorder. */
        enabled?: boolean;
        /** A message the buyer will see when the item is out of stock and preorder is enabled. */
        message?: string | null;
        /** Number of products that can be preordered after stock reaches zero. */
        limit?: number | null;
    }
    interface QueryStoreVariantsWithBigLimitRequest {
        /** Query options. */
        query?: UnlimitedPlatformQuery;
    }
    /**
     * Don't use it unless you have to and know what you do. Prefer PlatformQuery other than this.
     * It doesn't have max validation for limit but we still MUST have it so implement required validation in your code.
     */
    interface UnlimitedPlatformQuery extends UnlimitedPlatformQueryPagingMethodOneOf {
        /** Pointer to page of results using offset. Cannot be used together with `cursorPaging`. */
        paging?: UnlimitedPlatformPaging;
        /** Cursor pointing to page of results. Cannot be used together with `paging`. `cursorPaging.cursor` can not be used together with `filter` or `sort`. */
        cursorPaging?: UnlimitedPlatformCursorPaging;
        /** Filter object. */
        filter?: Record<string, any> | null;
        /** Sorting options. For example, `[{"fieldName":"sortField1"},{"fieldName":"sortField2","direction":"DESC"}]`. */
        sort?: Sorting[];
    }
    /** @oneof */
    interface UnlimitedPlatformQueryPagingMethodOneOf {
        /** Pointer to page of results using offset. Cannot be used together with `cursorPaging`. */
        paging?: UnlimitedPlatformPaging;
        /** Cursor pointing to page of results. Cannot be used together with `paging`. `cursorPaging.cursor` can not be used together with `filter` or `sort`. */
        cursorPaging?: UnlimitedPlatformCursorPaging;
    }
    /**
     * Don't use it unless you have to and know what you do. Prefer PlatformPaging or wix.common.Paging other than this.
     * It doesn't have max validation for limit but we still MUST have it so implement required validation in your code.
     */
    interface UnlimitedPlatformPaging {
        /** Number of items to load. */
        limit?: number | null;
        /** Number of items to skip in the current sort order. */
        offset?: number | null;
    }
    /**
     * Don't use it unless you have to and know what you do. Prefer PlatformCursorPaging or wix.common.CursorPaging other than this.
     * It doesn't have max validation for limit but we still MUST have it so implement required validation in your code.
     */
    interface UnlimitedPlatformCursorPaging {
        /**
         * The number of items to load.
         * Cursor token returned in the query response. To be used on the next query request, but not the first query request.
         */
        limit?: number | null;
        /** Cursor returned in last query response. Should not be provided on first page request */
        cursor?: string | null;
    }
    interface GetStoreVariantRequest {
        /** Store variant ID. Comprised of the `productId` and the `variantId`, separated by a hyphen. For example, `{productId}-{variantId}`. */
        _id: string;
    }
    interface GetStoreVariantResponse {
        /** The requested store variant. */
        variant?: StoreVariant;
    }
    interface QueryCustomFieldsRequest {
        /** Requested product ID. */
        _id?: string;
        /** Requested field names. */
        names?: string[];
    }
    interface QueryCustomFieldsResponse {
        customFields?: Record<string, any>;
    }
    interface BulkQueryCustomFieldsRequest {
        /** Filter string. */
        query?: Query;
        /** Requested field names. */
        names?: string[];
    }
    interface BulkQueryCustomFieldsResponse {
        /** ProductId to Custom Fields Map packed in container. */
        productIdToCustomFields?: Record<string, CustomFieldsContainer>;
        metadata?: PagingMetadata;
        totalResults?: number;
    }
    interface CustomFieldsContainer {
        customFields?: Record<string, any>;
    }
    interface AggregateProductsRequest {
        /** Filter applied to original data */
        filter?: Record<string, any> | null;
        /** This is an object defining aggregation itself */
        aggregation: Record<string, any> | null;
        /** Whether hidden products should be considered. Requires permissions to manage products. */
        includeHiddenProducts?: boolean;
        /** Whether merchant specific data should be included in the response. Requires permissions to manage products. */
        includeMerchantSpecificData?: boolean;
    }
    interface AggregateProductsResponse {
        aggregates?: Record<string, any> | null;
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
     * Creates a new product.
     * @param product - Product information.
     * @public
     * @requiredField product
     * @requiredField product.costAndProfitData.itemCost
     * @requiredField product.name
     * @requiredField product.priceData
     * @requiredField product.priceData.price
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.CreateProduct
     */
    function createProduct(product: Product): Promise<CreateProductResponse>;
    interface CreateDigitalProductOptions {
        /** Product information. */
        product?: Product;
    }
    /**
     * Updates specified fields in a product.
     * @param _id - Product ID (generated automatically by the catalog).
     * @public
     * @requiredField _id
     * @requiredField product
     * @param product - Product info to update.
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.UpdateProduct
     */
    function updateProduct(_id: string, product: UpdateProduct): Promise<UpdateProductResponse>;
    interface UpdateProduct {
        /**
         * Product ID (generated automatically by the catalog).
         * @readonly
         */
        _id?: string;
        /**
         * Product name.
         *
         * Min: 1 character
         * Max: 80 characters
         */
        name?: string | null;
        /** A friendly URL name (generated automatically by the catalog when a product is created), can be updated. */
        slug?: string;
        /** Whether the product is visible to site visitors. */
        visible?: boolean | null;
        /** Currently, only creating physical products ( `"productType": "physical"` ) is supported via the API. */
        productType?: ProductType;
        /** Product description. */
        description?: string | null;
        /** Stock keeping unit. If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled, SKUs will be set per variant, and this field will be empty. */
        sku?: string | null;
        /** Product weight. If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled, weight will be set per variant, and this field will be empty. */
        weight?: number | null;
        /**
         * Product weight range. The minimum and maximum weights of all the variants.
         * @readonly
         */
        weightRange?: NumericPropertyRange;
        /**
         * Product inventory status (in future this will be writable via Inventory API).
         * @readonly
         */
        stock?: Stock;
        /**
         * Deprecated (use `priceData` instead).
         * @readonly
         * @deprecated
         */
        price?: PriceData;
        /** Price data. */
        priceData?: PriceData;
        /**
         * Price data, converted to the currency specified in request header.
         * @readonly
         */
        convertedPriceData?: PriceData;
        /**
         * Product price range. The minimum and maximum prices of all the variants.
         * @readonly
         */
        priceRange?: NumericPropertyRange;
        /** Cost and profit data. */
        costAndProfitData?: CostAndProfitData;
        /**
         * Product cost range. The minimum and maximum costs of all the variants.
         * @readonly
         */
        costRange?: NumericPropertyRange;
        /** Price per unit data. */
        pricePerUnitData?: PricePerUnitData;
        /** Additional text that the store owner can assign to the product (e.g. shipping details, refund policy, etc.). */
        additionalInfoSections?: AdditionalInfoSection[];
        /**
         * Deprecated (use `ribbon` instead).
         * @readonly
         * @deprecated
         */
        ribbons?: Ribbon[];
        /**
         * Media items (images, videos etc) associated with this product (writable via [Add Product Media](https://dev.wix.com/api/rest/wix-stores/catalog/products/add-product-media) endpoint).
         * @readonly
         */
        media?: Media;
        /**
         * Text box for the customer to add a message to their order (e.g., customization request). Currently writable only from the UI.
         * @readonly
         */
        customTextFields?: CustomTextField[];
        /** Whether variants are being managed for this product - enables unique SKU, price and weight per variant. Also affects inventory data. Once set to `true`, can be reset to `false` only if no variants exist. You cannot set `manageVariants` to `true` if more than 300 variants are defined. */
        manageVariants?: boolean | null;
        /** Options for this product. */
        productOptions?: ProductOption[];
        /**
         * Product page URL for this product (generated automatically by the server).
         * @readonly
         */
        productPageUrl?: PageUrl;
        /**
         * Product’s unique numeric ID (assigned in ascending order).
         * Primarily used for sorting and filtering when crawling all products.
         * @readonly
         */
        numericId?: string;
        /**
         * Inventory item ID - ID referencing the inventory system.
         * @readonly
         */
        inventoryItemId?: string;
        /** Discount deducted from the product's original price. */
        discount?: Discount;
        /**
         * A list of all collection IDs that this product is included in (writable via the Catalog > Collection APIs).
         * @readonly
         */
        collectionIds?: string[];
        /**
         * Product variants, will be provided if the the request was sent with the `includeVariants: true`.
         *
         * Max: 1,000 variants
         * @readonly
         */
        variants?: Variant[];
        /**
         * Date and time the product was last updated.
         * @readonly
         */
        lastUpdated?: Date | null;
        /**
         * Date and time the product was created.
         * @readonly
         */
        _createdDate?: Date | null;
        /** Custom SEO data for the product. */
        seoData?: SeoSchema;
        /** Product ribbon. Used to highlight relevant information about a product. For example, "Sale", "New Arrival", "Sold Out". */
        ribbon?: string | null;
        /** Product brand. Including a brand name can help improve site and product [visibility on search engines](https://support.wix.com/en/article/adding-brand-names-to-boost-product-page-seo-in-wix-stores). */
        brand?: string | null;
    }
    interface UpdateProductPlatformizedProduct {
        /**
         * Product ID (generated automatically by the catalog).
         * @readonly
         */
        _id?: string;
        /**
         * Product name.
         *
         * Min: 1 character
         * Max: 80 characters
         */
        name?: string | null;
        /** A friendly URL name (generated automatically by the catalog when a product is created), can be updated. */
        slug?: string;
        /** Whether the product is visible to site visitors. */
        visible?: boolean | null;
        /** Currently, only creating physical products ( `"productType": "physical"` ) is supported via the API. */
        productType?: ProductType;
        /** Product description. */
        description?: string | null;
        /** Stock keeping unit. If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled, SKUs will be set per variant, and this field will be empty. */
        sku?: string | null;
        /** Product weight. If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled, weight will be set per variant, and this field will be empty. */
        weight?: number | null;
        /**
         * Product weight range. The minimum and maximum weights of all the variants.
         * @readonly
         */
        weightRange?: NumericPropertyRange;
        /**
         * Product inventory status (in future this will be writable via Inventory API).
         * @readonly
         */
        stock?: Stock;
        /**
         * Deprecated (use `priceData` instead).
         * @readonly
         * @deprecated
         */
        price?: PriceData;
        /** Price data. */
        priceData?: PriceData;
        /**
         * Price data, converted to the currency specified in request header.
         * @readonly
         */
        convertedPriceData?: PriceData;
        /**
         * Product price range. The minimum and maximum prices of all the variants.
         * @readonly
         */
        priceRange?: NumericPropertyRange;
        /** Cost and profit data. */
        costAndProfitData?: CostAndProfitData;
        /**
         * Product cost range. The minimum and maximum costs of all the variants.
         * @readonly
         */
        costRange?: NumericPropertyRange;
        /** Price per unit data. */
        pricePerUnitData?: PricePerUnitData;
        /** Additional text that the store owner can assign to the product (e.g. shipping details, refund policy, etc.). */
        additionalInfoSections?: AdditionalInfoSection[];
        /**
         * Deprecated (use `ribbon` instead).
         * @readonly
         * @deprecated
         */
        ribbons?: Ribbon[];
        /**
         * Media items (images, videos etc) associated with this product (writable via [Add Product Media](https://dev.wix.com/api/rest/wix-stores/catalog/products/add-product-media) endpoint).
         * @readonly
         */
        media?: Media;
        /**
         * Text box for the customer to add a message to their order (e.g., customization request). Currently writable only from the UI.
         * @readonly
         */
        customTextFields?: CustomTextField[];
        /** Whether variants are being managed for this product - enables unique SKU, price and weight per variant. Also affects inventory data. Once set to `true`, can be reset to `false` only if no variants exist. You cannot set `manageVariants` to `true` if more than 300 variants are defined. */
        manageVariants?: boolean | null;
        /** Options for this product. */
        productOptions?: ProductOption[];
        /**
         * Product page URL for this product (generated automatically by the server).
         * @readonly
         */
        productPageUrl?: PageUrl;
        /**
         * Product’s unique numeric ID (assigned in ascending order).
         * Primarily used for sorting and filtering when crawling all products.
         * @readonly
         */
        numericId?: string;
        /**
         * Inventory item ID - ID referencing the inventory system.
         * @readonly
         */
        inventoryItemId?: string;
        /** Discount deducted from the product's original price. */
        discount?: Discount;
        /**
         * A list of all collection IDs that this product is included in (writable via the Catalog > Collection APIs).
         * @readonly
         */
        collectionIds?: string[];
        /**
         * Product variants, will be provided if the the request was sent with the `includeVariants: true`.
         *
         * Max: 1,000 variants
         * @readonly
         */
        variants?: Variant[];
        /**
         * Date and time the product was last updated.
         * @readonly
         */
        lastUpdated?: Date | null;
        /**
         * Date and time the product was created.
         * @readonly
         */
        _createdDate?: Date | null;
        /** Custom SEO data for the product. */
        seoData?: SeoSchema;
        /** Product ribbon. Used to highlight relevant information about a product. For example, "Sale", "New Arrival", "Sold Out". */
        ribbon?: string | null;
        /** Product brand. Including a brand name can help improve site and product [visibility on search engines](https://support.wix.com/en/article/adding-brand-names-to-boost-product-page-seo-in-wix-stores). */
        brand?: string | null;
    }
    /**
     * Deletes a product.
     * @param _id - ID of the product to delete.
     * @public
     * @requiredField _id
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.DeleteProduct
     */
    function deleteProduct(_id: string): Promise<void>;
    /**
     * Updates variants of a specified product.
     * @param _id - ID of the product with managed variants.
     * @param variants - Variant info to update.
     * @public
     * @requiredField _id
     * @requiredField variants
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.UpdateVariants
     */
    function updateProductVariants(_id: string, variants: VariantOverride[]): Promise<UpdateVariantsResponse>;
    /**
     * Resets the data (such as the price and the weight) of all variants for a given product to their default values.
     * @param _id - Product ID.
     * @public
     * @requiredField _id
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.ResetAllVariantData
     */
    function resetAllProductVariantData(_id: string): Promise<void>;
    /**
     * Adds products to a specified collection.
     * @param _id - Collection ID.
     * @param productIds - IDs of the products to add to the collection, separated by commas.
     * @public
     * @requiredField _id
     * @requiredField productIds
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.AddProductsToCollection
     */
    function addProductsToCollection(_id: string, productIds: string[]): Promise<void>;
    /**
     * Deletes products from a specified collection.
     * @param _id - ID of the collection from which to remove products.
     * @param productIds - IDs of the products to remove from the collection.
     * @public
     * @documentationMaturity preview
     * @requiredField _id
     * @requiredField productIds
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.RemoveProductsFromCollection
     */
    function removeProductsFromCollection(_id: string, productIds: string[]): Promise<void>;
    /**
     * Adds media items to a specified product, either via URL or existing media ID.
     *
     * > **NOTE:** The URL is not validated and no event is triggered to indicate if the media was added successfully.
     * @param _id - Product ID.
     * @param media - Sources of media items already uploaded to the Wix site.
     * @public
     * @requiredField _id
     * @requiredField media
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.AddProductMedia
     */
    function addProductMedia(_id: string, media: MediaDataForWrite[]): Promise<void>;
    /**
     * Removes specified media items from a product.
     * Pass an empty array to remove all media items.
     * @param _id - Product ID.
     * @param mediaIds - List of media IDs to remove. Pass an empty array to delete all media items for the product.
     * @public
     * @requiredField _id
     * @requiredField mediaIds
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.RemoveProductMedia
     */
    function removeProductMedia(_id: string, mediaIds: string[]): Promise<void>;
    /**
     * Links media items that are already associated with a specific product to a choice within the same product.
     *
     * Media items can only be set for choices within one option at a time - e.g., if you set media items for some or all of the choices within the Colors option (blue, green, and red), you won't be able to also assign media items to choices within the Size option (S, M, and L).
     *
     * To remove all existing media items, call the [Remove Product Media From Choices](https://dev.wix.com/api/rest/wix-stores/catalog/products/remove-product-media-from-choices) endpoint.
     * @param _id - Product ID.
     * @param media - Product media items and the choices to add the media to.
     * @public
     * @documentationMaturity preview
     * @requiredField _id
     * @requiredField media
     * @requiredField media.choice
     * @requiredField media.option
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.AddProductMediaToChoices
     */
    function addProductMediaToChoices(_id: string, media: MediaAssignmentToChoice[]): Promise<void>;
    /**
     * Removes media items from all or some of a product's choices.
     * (Media items can only be set for choices within one option at a time - e.g., if you set media items for some or all of the choices within the Colors option (blue, green, and red), you won't be able to also assign media items to choices within the Size option (S, M, and L).)
     * @param _id - Product ID from whose choices to remove media items.
     * @param media - Media to remove from choices. If an empty array is passed, all media will be removed from all choices for the given product.
     * @public
     * @documentationMaturity preview
     * @requiredField _id
     * @requiredField media
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.RemoveProductMediaFromChoices
     */
    function removeProductMediaFromChoices(_id: string, media: MediaAssignmentToChoice[]): Promise<void>;
    /**
     * Delete all options from a specific product. Only available when [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is disabled.
     * @param _id - ID of the product with options to delete.
     * @public
     * @documentationMaturity preview
     * @requiredField _id
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.DeleteProductOptions
     */
    function deleteProductOptions(_id: string): Promise<void>;
    interface SetCustomFieldsOptions {
        /** Custom field that will be added, if a custom field with the same name already exists, the value of the custom field will be overridden. */
        customFields?: Record<string, any>;
    }
    interface RemoveCustomFieldsOptions {
        /** Custom fields to be removed (by name). */
        names?: string[];
    }
    /**
     * Deletes a product's brand.
     * @param _id - Product ID.
     * @public
     * @requiredField _id
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.RemoveBrand
     */
    function removeBrand(_id: string): Promise<void>;
    interface BulkSetCustomFieldsOptions {
        /** Filter string. */
        filter?: string | null;
        /** Custom field that will be added, if a custom field with same name already exists, the value of the custom field will be overridden. */
        customFields?: Record<string, any>;
    }
    interface BulkRemoveCustomFieldsOptions {
        /** Filter string. */
        filter?: string | null;
        /** Custom fields names. */
        names?: string[];
    }
    /**
     * Creates a new collection.
     * @param collection - Collection info.
     * @public
     * @requiredField collection
     * @requiredField collection.name
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.CreateCollection
     */
    function createCollection(collection: Collection): Promise<CreateCollectionResponse>;
    /**
     * Updates specified properties of a collection. To add products to a collection, call the [addProductsToCollection](#addproductstocollection) function.
     * @param _id - Collection ID (generated automatically by the catalog).
     * @public
     * @documentationMaturity preview
     * @requiredField _id
     * @requiredField collection
     * @param collection - Collection info to update.
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.UpdateCollection
     */
    function updateCollection(_id: string | null, collection: UpdateCollection): Promise<UpdateCollectionResponse>;
    interface UpdateCollection {
        /**
         * Collection ID (generated automatically by the catalog).
         * @readonly
         */
        _id?: string | null;
        /** Collection name. */
        name?: string | null;
        /**
         * Media items (images, videos etc) associated with this collection. Read only.
         * @readonly
         */
        media?: Media;
        /**
         * Number of products in the collection. Read only.
         * @readonly
         */
        numberOfProducts?: number;
        /** Collection description. */
        description?: string | null;
        /** Collection slug. */
        slug?: string | null;
        /** Collection visibility. Only impacts dynamic pages, no impact on static pages. Default: `true`. */
        visible?: boolean | null;
    }
    /**
     * Deletes a collection.
     * @public
     * @documentationMaturity preview
     * @requiredField _id
     * @param _id - ID of the collection to delete.
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.DeleteCollection
     */
    function deleteCollection(_id: string): Promise<void>;
    /**
     * Deletes a product's ribbon.
     * @param _id - Product ID.
     * @public
     * @requiredField _id
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.RemoveRibbon
     */
    function removeRibbon(_id: string): Promise<void>;
    /**
     * Updates a specified property for up to 100 products at a time.
     * @param ids - Product IDs.
     * @param set - Field to update.
     * @public
     * @documentationMaturity preview
     * @requiredField ids
     * @requiredField set
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.BulkUpdateProducts
     */
    function bulkUpdateProductsProperty(ids: string[], set: SetValue): Promise<BulkUpdateProductsResponse>;
    interface BulkUpdateProductsByFilterSyncOptions {
        /** The field to update. */
        set?: SetValue;
    }
    /**
     * Adjusts a specified numerical property for up to 100 products at a time.
     * The property can be increased or decreased either by percentage or amount.
     * @param adjust - Numerical property to adjust.
     * @param ids - Product IDs.
     * @public
     * @documentationMaturity preview
     * @requiredField adjust
     * @requiredField ids
     * @permissionId WIX_STORES.MODIFY_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn wix.catalog.api.v1.CatalogWriteApi.BulkAdjustProductProperties
     */
    function bulkAdjustProductProperty(adjust: AdjustValue, ids: string[]): Promise<BulkAdjustProductPropertiesResponse>;
    interface BulkAdjustProductPropertiesByFilterSyncOptions {
        /** Numerical property to adjust. */
        adjust?: AdjustValue;
    }
    interface ReCloneStoreOptions {
        originalMetasiteId?: string | null;
    }
    interface WriteProxyUpdateProductPlatformizedProduct {
        /**
         * Product ID (generated automatically by the catalog).
         * @readonly
         */
        _id?: string;
        /**
         * Product name.
         *
         * Min: 1 character
         * Max: 80 characters
         */
        name?: string | null;
        /** A friendly URL name (generated automatically by the catalog when a product is created), can be updated. */
        slug?: string;
        /** Whether the product is visible to site visitors. */
        visible?: boolean | null;
        /** Currently, only creating physical products ( `"productType": "physical"` ) is supported via the API. */
        productType?: ProductType;
        /** Product description. */
        description?: string | null;
        /** Stock keeping unit. If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled, SKUs will be set per variant, and this field will be empty. */
        sku?: string | null;
        /** Product weight. If [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is enabled, weight will be set per variant, and this field will be empty. */
        weight?: number | null;
        /**
         * Product weight range. The minimum and maximum weights of all the variants.
         * @readonly
         */
        weightRange?: NumericPropertyRange;
        /**
         * Product inventory status (in future this will be writable via Inventory API).
         * @readonly
         */
        stock?: Stock;
        /**
         * Deprecated (use `priceData` instead).
         * @readonly
         * @deprecated
         */
        price?: PriceData;
        /** Price data. */
        priceData?: PriceData;
        /**
         * Price data, converted to the currency specified in request header.
         * @readonly
         */
        convertedPriceData?: PriceData;
        /**
         * Product price range. The minimum and maximum prices of all the variants.
         * @readonly
         */
        priceRange?: NumericPropertyRange;
        /** Cost and profit data. */
        costAndProfitData?: CostAndProfitData;
        /**
         * Product cost range. The minimum and maximum costs of all the variants.
         * @readonly
         */
        costRange?: NumericPropertyRange;
        /** Price per unit data. */
        pricePerUnitData?: PricePerUnitData;
        /** Additional text that the store owner can assign to the product (e.g. shipping details, refund policy, etc.). */
        additionalInfoSections?: AdditionalInfoSection[];
        /**
         * Deprecated (use `ribbon` instead).
         * @readonly
         * @deprecated
         */
        ribbons?: Ribbon[];
        /**
         * Media items (images, videos etc) associated with this product (writable via [Add Product Media](https://dev.wix.com/api/rest/wix-stores/catalog/products/add-product-media) endpoint).
         * @readonly
         */
        media?: Media;
        /**
         * Text box for the customer to add a message to their order (e.g., customization request). Currently writable only from the UI.
         * @readonly
         */
        customTextFields?: CustomTextField[];
        /** Whether variants are being managed for this product - enables unique SKU, price and weight per variant. Also affects inventory data. Once set to `true`, can be reset to `false` only if no variants exist. You cannot set `manageVariants` to `true` if more than 300 variants are defined. */
        manageVariants?: boolean | null;
        /** Options for this product. */
        productOptions?: ProductOption[];
        /**
         * Product page URL for this product (generated automatically by the server).
         * @readonly
         */
        productPageUrl?: PageUrl;
        /**
         * Product’s unique numeric ID (assigned in ascending order).
         * Primarily used for sorting and filtering when crawling all products.
         * @readonly
         */
        numericId?: string;
        /**
         * Inventory item ID - ID referencing the inventory system.
         * @readonly
         */
        inventoryItemId?: string;
        /** Discount deducted from the product's original price. */
        discount?: Discount;
        /**
         * A list of all collection IDs that this product is included in (writable via the Catalog > Collection APIs).
         * @readonly
         */
        collectionIds?: string[];
        /**
         * Product variants, will be provided if the the request was sent with the `includeVariants: true`.
         *
         * Max: 1,000 variants
         * @readonly
         */
        variants?: Variant[];
        /**
         * Date and time the product was last updated.
         * @readonly
         */
        lastUpdated?: Date | null;
        /**
         * Date and time the product was created.
         * @readonly
         */
        _createdDate?: Date | null;
        /** Custom SEO data for the product. */
        seoData?: SeoSchema;
        /** Product ribbon. Used to highlight relevant information about a product. For example, "Sale", "New Arrival", "Sold Out". */
        ribbon?: string | null;
        /** Product brand. Including a brand name can help improve site and product [visibility on search engines](https://support.wix.com/en/article/adding-brand-names-to-boost-product-page-seo-in-wix-stores). */
        brand?: string | null;
    }
    interface QueryProductsNonPlatformizedOptions {
        query?: Query;
        /** Whether variants should be included in the response. */
        includeVariants?: boolean;
        /** Whether hidden products should be included in the response. Requires permissions to manage products. */
        includeHiddenProducts?: boolean;
        /** Whether merchant specific data should be included in the response. Requires permissions to manage products. */
        includeMerchantSpecificData?: boolean;
    }
    /**
     * Returns a list of up to 100 products, given the provided paging, sorting and filtering.
     * @public
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Read Products
     * @permissionScopeId SCOPE.DC-STORES.READ-PRODUCTS
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @permissionId WIX_STORES.READ_PRODUCTS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @fqn wix.catalog.api.v1.CatalogReadApi.QueryProductsPlatformized
     */
    function queryProducts(): ProductsQueryBuilder;
    interface QueryOffsetResult {
        currentPage: number | undefined;
        totalPages: number | undefined;
        totalCount: number | undefined;
        hasNext: () => boolean;
        hasPrev: () => boolean;
        length: number;
        pageSize: number;
    }
    interface ProductsQueryResult extends QueryOffsetResult {
        items: Product[];
        query: ProductsQueryBuilder;
        next: () => Promise<ProductsQueryResult>;
        prev: () => Promise<ProductsQueryResult>;
    }
    interface ProductsQueryBuilder {
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        eq: (propertyName: "_id" | "name" | "slug" | "productType" | "description" | "sku" | "price" | "priceData.price" | "numericId" | "collectionIds" | "lastUpdated" | "_createdDate", value: any) => ProductsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        ne: (propertyName: "_id" | "name" | "slug" | "productType" | "description" | "sku" | "price" | "priceData.price" | "numericId" | "collectionIds" | "lastUpdated" | "_createdDate", value: any) => ProductsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        ge: (propertyName: "priceData.price" | "numericId" | "lastUpdated" | "_createdDate", value: any) => ProductsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        gt: (propertyName: "priceData.price" | "numericId" | "lastUpdated" | "_createdDate", value: any) => ProductsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        le: (propertyName: "priceData.price" | "numericId" | "lastUpdated" | "_createdDate", value: any) => ProductsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        lt: (propertyName: "priceData.price" | "numericId" | "lastUpdated" | "_createdDate", value: any) => ProductsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `string`.
         * @param string - String to compare against. Case-insensitive.
         */
        startsWith: (propertyName: "_id" | "name" | "slug" | "description" | "sku", value: string) => ProductsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `values`.
         * @param values - List of values to compare against.
         */
        hasSome: (propertyName: "_id" | "name" | "slug" | "productType" | "description" | "sku" | "price" | "priceData.price" | "numericId" | "collectionIds" | "lastUpdated" | "_createdDate", value: any[]) => ProductsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `values`.
         * @param values - List of values to compare against.
         */
        hasAll: (propertyName: "collectionIds", value: any[]) => ProductsQueryBuilder;
        in: (propertyName: "_id" | "name" | "slug" | "productType" | "description" | "sku" | "price" | "priceData.price" | "numericId" | "collectionIds" | "lastUpdated" | "_createdDate", value: any) => ProductsQueryBuilder;
        exists: (propertyName: "_id" | "name" | "slug" | "productType" | "description" | "sku" | "price" | "priceData.price" | "numericId" | "collectionIds" | "lastUpdated" | "_createdDate", value: boolean) => ProductsQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
        ascending: (...propertyNames: Array<"_id" | "name" | "slug" | "productType" | "sku" | "price" | "priceData.price" | "numericId" | "lastUpdated">) => ProductsQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
        descending: (...propertyNames: Array<"_id" | "name" | "slug" | "productType" | "sku" | "price" | "priceData.price" | "numericId" | "lastUpdated">) => ProductsQueryBuilder;
        /** @param limit - Number of items to return, which is also the `pageSize` of the results object. */
        limit: (limit: number) => ProductsQueryBuilder;
        /** @param skip - Number of items to skip in the query results before returning the results. */
        skip: (skip: number) => ProductsQueryBuilder;
        find: () => Promise<ProductsQueryResult>;
    }
    interface QueryProductsWithBigPageLimitOptions {
        query?: QueryWithBigPageLimit;
        /** Whether variants should be included in the response. */
        includeVariants?: boolean;
        /** Whether hidden products should be included in the response. Requires permissions to manage products. */
        includeHiddenProducts?: boolean;
        /** Whether merchant specific data should be included in the response. Requires permissions to manage products. */
        includeMerchantSpecificData?: boolean;
    }
    /**
     * Retrieves a product with the provided ID.
     * @param _id - Requested product ID.
     * @public
     * @requiredField _id
     * @permissionId WIX_STORES.READ_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Read Products
     * @permissionScopeId SCOPE.DC-STORES.READ-PRODUCTS
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @fqn wix.catalog.api.v1.CatalogReadApi.GetProduct
     */
    function getProduct(_id: string, options?: GetProductOptions): Promise<GetProductResponse>;
    interface GetProductOptions {
        /** Whether merchant specific data, such as cost and profit data, should be included in the response. Requires permissions to manage products. */
        includeMerchantSpecificData?: boolean;
    }
    interface GetProductPlatformizedOptions {
        /** Whether merchant specific data, such as cost and profit data, should be included in the response. Requires permissions to manage products. */
        includeMerchantSpecificData?: boolean;
    }
    interface QueryCollectionsOptions {
        /** Query options. */
        query?: Query;
        /** Whether number of products should be included in the response. */
        includeNumberOfProducts?: boolean;
        /** Wether to include collection description in the response. When `false` is passed, `collection.description` will return null. */
        includeDescription?: boolean;
    }
    interface GetCollectionOptions {
        /**
         * Whether to return the `collection.numberOfProducts` field in the response.
         * Defaults to `false`, in which case the value of `collection.numberOfProducts` will be `0`.
         */
        includeNumberOfProducts?: boolean;
    }
    /**
     * Retrieves a collection with the provided slug.
     * @param slug - Slug of the collection to retrieve.
     * @public
     * @requiredField slug
     * @permissionId WIX_STORES.READ_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Read Products
     * @permissionScopeId SCOPE.DC-STORES.READ-PRODUCTS
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @fqn wix.catalog.api.v1.CatalogReadApi.GetCollectionBySlug
     */
    function getCollectionBySlug(slug: string): Promise<GetCollectionBySlugResponse>;
    /**
     * Gets the availability of relevant product variants based on the product ID and selections provided. See [Use Cases](https://dev.wix.com/api/rest/wix-stores/catalog/use-cases) for an example.
     * @param _id - Requested product ID.
     * @param options - Array containing the selected options. For example, `["color": "Blue", "size": "Large"]`.
     * @public
     * @requiredField _id
     * @requiredField options
     * @permissionId WIX_STORES.READ_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Read Products
     * @permissionScopeId SCOPE.DC-STORES.READ-PRODUCTS
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @fqn wix.catalog.api.v1.CatalogReadApi.ProductOptionsAvailability
     */
    function getProductOptionsAvailability(_id: string, options: Record<string, string>): Promise<ProductOptionsAvailabilityResponse>;
    /**
     * Retrieves product variants, based on either choices (option-choice key-value pairs) or variant IDs.
     * See [Stores Pagination](https://dev.wix.com/api/rest/wix-stores/pagination) for more information.
     * @param _id - Requested product ID.
     * @public
     * @requiredField _id
     * @permissionId WIX_STORES.READ_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Read Products
     * @permissionScopeId SCOPE.DC-STORES.READ-PRODUCTS
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @fqn wix.catalog.api.v1.CatalogReadApi.QueryProductVariants
     */
    function queryProductVariants(_id: string, options?: QueryProductVariantsOptions): Promise<QueryProductVariantsResponse>;
    interface QueryProductVariantsOptions {
        /**
         * The specific choices available or chosen from within a selection (e.g., choosing the red Selection triggers the red Choice).
         * You may specify all the relevant choices for a specific variant, or only some of the options, which will return all corresponding variants (not relevant when passing variant IDs).
         */
        choices?: Record<string, string>;
        /** List of variant IDs (not relevant when passing choices). */
        variantIds?: string[];
        paging?: Paging;
        /** Whether merchant specific data should be included in the response. Requires permissions to manage products. */
        includeMerchantSpecificData?: boolean;
    }
    /**
     * Retrieves up to 100 store variants, given the provided paging, filtering, and sorting.
     * @param query - Query options.
     * @public
     * @requiredField query
     * @permissionId WIX_STORES.READ_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Read Products
     * @permissionScopeId SCOPE.DC-STORES.READ-PRODUCTS
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @fqn wix.catalog.api.v1.CatalogReadApi.QueryStoreVariants
     */
    function queryStoreVariants(query: PlatformQuery, options?: QueryStoreVariantsOptions): Promise<QueryStoreVariantsResponse>;
    interface QueryStoreVariantsOptions {
    }
    interface QueryStoreVariantsWithBigLimitOptions {
        /** Query options. */
        query?: UnlimitedPlatformQuery;
    }
    /**
     * Retrieves a store variant with the provided ID.
     * @param _id - Store variant ID. Comprised of the `productId` and the `variantId`, separated by a hyphen. For example, `{productId}-{variantId}`.
     * @public
     * @requiredField _id
     * @permissionId WIX_STORES.READ_PRODUCTS
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage Products
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Read Products
     * @permissionScopeId SCOPE.DC-STORES.READ-PRODUCTS
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @fqn wix.catalog.api.v1.CatalogReadApi.GetStoreVariant
     */
    function getStoreVariant(_id: string): Promise<GetStoreVariantResponse>;
    interface AggregateProductsOptions {
        /** Filter applied to original data */
        filter?: Record<string, any> | null;
        /** This is an object defining aggregation itself */
        aggregation: Record<string, any> | null;
        /** Whether hidden products should be considered. Requires permissions to manage products. */
        includeHiddenProducts?: boolean;
        /** Whether merchant specific data should be included in the response. Requires permissions to manage products. */
        includeMerchantSpecificData?: boolean;
    }
    type storesCatalogV1ProductProducts_universal_d_Product = Product;
    type storesCatalogV1ProductProducts_universal_d_ProductType = ProductType;
    const storesCatalogV1ProductProducts_universal_d_ProductType: typeof ProductType;
    type storesCatalogV1ProductProducts_universal_d_NumericPropertyRange = NumericPropertyRange;
    type storesCatalogV1ProductProducts_universal_d_Stock = Stock;
    type storesCatalogV1ProductProducts_universal_d_InventoryStatus = InventoryStatus;
    const storesCatalogV1ProductProducts_universal_d_InventoryStatus: typeof InventoryStatus;
    type storesCatalogV1ProductProducts_universal_d_PriceData = PriceData;
    type storesCatalogV1ProductProducts_universal_d_FormattedPrice = FormattedPrice;
    type storesCatalogV1ProductProducts_universal_d_CostAndProfitData = CostAndProfitData;
    type storesCatalogV1ProductProducts_universal_d_PricePerUnitData = PricePerUnitData;
    type storesCatalogV1ProductProducts_universal_d_MeasurementUnit = MeasurementUnit;
    const storesCatalogV1ProductProducts_universal_d_MeasurementUnit: typeof MeasurementUnit;
    type storesCatalogV1ProductProducts_universal_d_AdditionalInfoSection = AdditionalInfoSection;
    type storesCatalogV1ProductProducts_universal_d_Ribbon = Ribbon;
    type storesCatalogV1ProductProducts_universal_d_Media = Media;
    type storesCatalogV1ProductProducts_universal_d_MediaItem = MediaItem;
    type storesCatalogV1ProductProducts_universal_d_MediaItemItemOneOf = MediaItemItemOneOf;
    type storesCatalogV1ProductProducts_universal_d_MediaItemUrlAndSize = MediaItemUrlAndSize;
    type storesCatalogV1ProductProducts_universal_d_MediaItemType = MediaItemType;
    const storesCatalogV1ProductProducts_universal_d_MediaItemType: typeof MediaItemType;
    type storesCatalogV1ProductProducts_universal_d_MediaItemVideo = MediaItemVideo;
    type storesCatalogV1ProductProducts_universal_d_CustomTextField = CustomTextField;
    type storesCatalogV1ProductProducts_universal_d_ProductOption = ProductOption;
    type storesCatalogV1ProductProducts_universal_d_OptionType = OptionType;
    const storesCatalogV1ProductProducts_universal_d_OptionType: typeof OptionType;
    type storesCatalogV1ProductProducts_universal_d_Choice = Choice;
    type storesCatalogV1ProductProducts_universal_d_PageUrl = PageUrl;
    type storesCatalogV1ProductProducts_universal_d_Discount = Discount;
    type storesCatalogV1ProductProducts_universal_d_DiscountType = DiscountType;
    const storesCatalogV1ProductProducts_universal_d_DiscountType: typeof DiscountType;
    type storesCatalogV1ProductProducts_universal_d_Variant = Variant;
    type storesCatalogV1ProductProducts_universal_d_VariantDataWithNoStock = VariantDataWithNoStock;
    type storesCatalogV1ProductProducts_universal_d_VariantStock = VariantStock;
    type storesCatalogV1ProductProducts_universal_d_SeoSchema = SeoSchema;
    type storesCatalogV1ProductProducts_universal_d_Keyword = Keyword;
    type storesCatalogV1ProductProducts_universal_d_Tag = Tag;
    type storesCatalogV1ProductProducts_universal_d_Settings = Settings;
    type storesCatalogV1ProductProducts_universal_d_SecuredMedia = SecuredMedia;
    type storesCatalogV1ProductProducts_universal_d_FileType = FileType;
    const storesCatalogV1ProductProducts_universal_d_FileType: typeof FileType;
    type storesCatalogV1ProductProducts_universal_d_CreateProductRequest = CreateProductRequest;
    type storesCatalogV1ProductProducts_universal_d_CreateProductResponse = CreateProductResponse;
    type storesCatalogV1ProductProducts_universal_d_CreateProductPlatformizedRequest = CreateProductPlatformizedRequest;
    type storesCatalogV1ProductProducts_universal_d_CreateProductPlatformizedResponse = CreateProductPlatformizedResponse;
    type storesCatalogV1ProductProducts_universal_d_CreateDigitalProductRequest = CreateDigitalProductRequest;
    type storesCatalogV1ProductProducts_universal_d_CreateDigitalProductResponse = CreateDigitalProductResponse;
    type storesCatalogV1ProductProducts_universal_d_UpdateProductRequest = UpdateProductRequest;
    type storesCatalogV1ProductProducts_universal_d_UpdateProductResponse = UpdateProductResponse;
    type storesCatalogV1ProductProducts_universal_d_UpdateProductPlatformizedRequest = UpdateProductPlatformizedRequest;
    type storesCatalogV1ProductProducts_universal_d_UpdateProductPlatformizedResponse = UpdateProductPlatformizedResponse;
    type storesCatalogV1ProductProducts_universal_d_DeleteProductRequest = DeleteProductRequest;
    type storesCatalogV1ProductProducts_universal_d_DeleteProductResponse = DeleteProductResponse;
    type storesCatalogV1ProductProducts_universal_d_DeleteProductPlatformizedRequest = DeleteProductPlatformizedRequest;
    type storesCatalogV1ProductProducts_universal_d_DeleteProductPlatformizedResponse = DeleteProductPlatformizedResponse;
    type storesCatalogV1ProductProducts_universal_d_BulkDeleteProductsRequest = BulkDeleteProductsRequest;
    type storesCatalogV1ProductProducts_universal_d_BulkDeleteProductsResponse = BulkDeleteProductsResponse;
    type storesCatalogV1ProductProducts_universal_d_UpdateVariantsRequest = UpdateVariantsRequest;
    type storesCatalogV1ProductProducts_universal_d_VariantOverride = VariantOverride;
    type storesCatalogV1ProductProducts_universal_d_UpdateVariantsResponse = UpdateVariantsResponse;
    type storesCatalogV1ProductProducts_universal_d_ResetAllVariantDataRequest = ResetAllVariantDataRequest;
    type storesCatalogV1ProductProducts_universal_d_ResetAllVariantDataResponse = ResetAllVariantDataResponse;
    type storesCatalogV1ProductProducts_universal_d_AddProductsToCollectionRequest = AddProductsToCollectionRequest;
    type storesCatalogV1ProductProducts_universal_d_AddProductsToCollectionResponse = AddProductsToCollectionResponse;
    type storesCatalogV1ProductProducts_universal_d_RemoveProductsFromCollectionRequest = RemoveProductsFromCollectionRequest;
    type storesCatalogV1ProductProducts_universal_d_RemoveProductsFromCollectionResponse = RemoveProductsFromCollectionResponse;
    type storesCatalogV1ProductProducts_universal_d_AddProductMediaRequest = AddProductMediaRequest;
    type storesCatalogV1ProductProducts_universal_d_MediaDataForWrite = MediaDataForWrite;
    type storesCatalogV1ProductProducts_universal_d_MediaDataForWriteMediaSourceOneOf = MediaDataForWriteMediaSourceOneOf;
    type storesCatalogV1ProductProducts_universal_d_OptionAndChoice = OptionAndChoice;
    type storesCatalogV1ProductProducts_universal_d_AddProductMediaResponse = AddProductMediaResponse;
    type storesCatalogV1ProductProducts_universal_d_RemoveProductMediaRequest = RemoveProductMediaRequest;
    type storesCatalogV1ProductProducts_universal_d_RemoveProductMediaResponse = RemoveProductMediaResponse;
    type storesCatalogV1ProductProducts_universal_d_AddProductMediaToChoicesRequest = AddProductMediaToChoicesRequest;
    type storesCatalogV1ProductProducts_universal_d_MediaAssignmentToChoice = MediaAssignmentToChoice;
    type storesCatalogV1ProductProducts_universal_d_AddProductMediaToChoicesResponse = AddProductMediaToChoicesResponse;
    type storesCatalogV1ProductProducts_universal_d_RemoveProductMediaFromChoicesRequest = RemoveProductMediaFromChoicesRequest;
    type storesCatalogV1ProductProducts_universal_d_RemoveProductMediaFromChoicesResponse = RemoveProductMediaFromChoicesResponse;
    type storesCatalogV1ProductProducts_universal_d_DeleteProductOptionsRequest = DeleteProductOptionsRequest;
    type storesCatalogV1ProductProducts_universal_d_DeleteProductOptionsResponse = DeleteProductOptionsResponse;
    type storesCatalogV1ProductProducts_universal_d_SetCustomFieldsRequest = SetCustomFieldsRequest;
    type storesCatalogV1ProductProducts_universal_d_SetCustomFieldsResponse = SetCustomFieldsResponse;
    type storesCatalogV1ProductProducts_universal_d_RemoveCustomFieldsRequest = RemoveCustomFieldsRequest;
    type storesCatalogV1ProductProducts_universal_d_RemoveCustomFieldsResponse = RemoveCustomFieldsResponse;
    type storesCatalogV1ProductProducts_universal_d_RemoveProductBrandRequest = RemoveProductBrandRequest;
    type storesCatalogV1ProductProducts_universal_d_RemoveProductBrandResponse = RemoveProductBrandResponse;
    type storesCatalogV1ProductProducts_universal_d_BulkSetCustomFieldsRequest = BulkSetCustomFieldsRequest;
    type storesCatalogV1ProductProducts_universal_d_BulkSetCustomFieldsResponse = BulkSetCustomFieldsResponse;
    type storesCatalogV1ProductProducts_universal_d_BulkRemoveCustomFieldsRequest = BulkRemoveCustomFieldsRequest;
    type storesCatalogV1ProductProducts_universal_d_BulkRemoveCustomFieldsResponse = BulkRemoveCustomFieldsResponse;
    type storesCatalogV1ProductProducts_universal_d_CreateCollectionRequest = CreateCollectionRequest;
    type storesCatalogV1ProductProducts_universal_d_Collection = Collection;
    type storesCatalogV1ProductProducts_universal_d_CreateCollectionResponse = CreateCollectionResponse;
    type storesCatalogV1ProductProducts_universal_d_UpdateCollectionRequest = UpdateCollectionRequest;
    type storesCatalogV1ProductProducts_universal_d_UpdateCollectionResponse = UpdateCollectionResponse;
    type storesCatalogV1ProductProducts_universal_d_DeleteCollectionRequest = DeleteCollectionRequest;
    type storesCatalogV1ProductProducts_universal_d_DeleteCollectionResponse = DeleteCollectionResponse;
    type storesCatalogV1ProductProducts_universal_d_RemoveProductRibbonRequest = RemoveProductRibbonRequest;
    type storesCatalogV1ProductProducts_universal_d_RemoveProductRibbonResponse = RemoveProductRibbonResponse;
    type storesCatalogV1ProductProducts_universal_d_BulkUpdateProductsRequest = BulkUpdateProductsRequest;
    type storesCatalogV1ProductProducts_universal_d_SetValue = SetValue;
    type storesCatalogV1ProductProducts_universal_d_SetValueValueOneOf = SetValueValueOneOf;
    type storesCatalogV1ProductProducts_universal_d_BulkUpdateProductsResponse = BulkUpdateProductsResponse;
    type storesCatalogV1ProductProducts_universal_d_BulkProductResult = BulkProductResult;
    type storesCatalogV1ProductProducts_universal_d_ItemMetadata = ItemMetadata;
    type storesCatalogV1ProductProducts_universal_d_ApplicationError = ApplicationError;
    type storesCatalogV1ProductProducts_universal_d_BulkActionMetadata = BulkActionMetadata;
    type storesCatalogV1ProductProducts_universal_d_BulkUpdateProductsByFilterSyncRequest = BulkUpdateProductsByFilterSyncRequest;
    type storesCatalogV1ProductProducts_universal_d_BulkUpdateProductsByFilterSyncResponse = BulkUpdateProductsByFilterSyncResponse;
    type storesCatalogV1ProductProducts_universal_d_AllowedProductsCountLimitExceededErrorData = AllowedProductsCountLimitExceededErrorData;
    type storesCatalogV1ProductProducts_universal_d_BulkAdjustProductPropertiesRequest = BulkAdjustProductPropertiesRequest;
    type storesCatalogV1ProductProducts_universal_d_AdjustValue = AdjustValue;
    type storesCatalogV1ProductProducts_universal_d_AdjustValueValueOneOf = AdjustValueValueOneOf;
    type storesCatalogV1ProductProducts_universal_d_PropertyAdjustmentData = PropertyAdjustmentData;
    type storesCatalogV1ProductProducts_universal_d_PropertyAdjustmentDataByOneOf = PropertyAdjustmentDataByOneOf;
    type storesCatalogV1ProductProducts_universal_d_PercentageData = PercentageData;
    type storesCatalogV1ProductProducts_universal_d_BulkAdjustProductPropertiesResponse = BulkAdjustProductPropertiesResponse;
    type storesCatalogV1ProductProducts_universal_d_BulkAdjustProductPropertiesByFilterSyncRequest = BulkAdjustProductPropertiesByFilterSyncRequest;
    type storesCatalogV1ProductProducts_universal_d_BulkAdjustProductPropertiesByFilterSyncResponse = BulkAdjustProductPropertiesByFilterSyncResponse;
    type storesCatalogV1ProductProducts_universal_d_ReCloneStoreRequest = ReCloneStoreRequest;
    type storesCatalogV1ProductProducts_universal_d_ReCloneStoreResponse = ReCloneStoreResponse;
    type storesCatalogV1ProductProducts_universal_d_V1CreateProductPlatformizedRequest = V1CreateProductPlatformizedRequest;
    type storesCatalogV1ProductProducts_universal_d_V1CreateProductPlatformizedResponse = V1CreateProductPlatformizedResponse;
    type storesCatalogV1ProductProducts_universal_d_V1UpdateProductPlatformizedRequest = V1UpdateProductPlatformizedRequest;
    type storesCatalogV1ProductProducts_universal_d_V1UpdateProductPlatformizedResponse = V1UpdateProductPlatformizedResponse;
    type storesCatalogV1ProductProducts_universal_d_V1DeleteProductPlatformizedRequest = V1DeleteProductPlatformizedRequest;
    type storesCatalogV1ProductProducts_universal_d_V1DeleteProductPlatformizedResponse = V1DeleteProductPlatformizedResponse;
    type storesCatalogV1ProductProducts_universal_d_ProductCreated = ProductCreated;
    type storesCatalogV1ProductProducts_universal_d_Version = Version;
    const storesCatalogV1ProductProducts_universal_d_Version: typeof Version;
    type storesCatalogV1ProductProducts_universal_d_ProductChanged = ProductChanged;
    type storesCatalogV1ProductProducts_universal_d_ProductDeleted = ProductDeleted;
    type storesCatalogV1ProductProducts_universal_d_CollectionCreated = CollectionCreated;
    type storesCatalogV1ProductProducts_universal_d_CollectionChanged = CollectionChanged;
    type storesCatalogV1ProductProducts_universal_d_CollectionDeleted = CollectionDeleted;
    type storesCatalogV1ProductProducts_universal_d_VariantsChanged = VariantsChanged;
    type storesCatalogV1ProductProducts_universal_d_VariantChanged = VariantChanged;
    type storesCatalogV1ProductProducts_universal_d_QueryProductsRequest = QueryProductsRequest;
    type storesCatalogV1ProductProducts_universal_d_Query = Query;
    type storesCatalogV1ProductProducts_universal_d_Paging = Paging;
    type storesCatalogV1ProductProducts_universal_d_QueryProductsResponse = QueryProductsResponse;
    type storesCatalogV1ProductProducts_universal_d_PagingMetadata = PagingMetadata;
    type storesCatalogV1ProductProducts_universal_d_QueryProductsPlatformizedRequest = QueryProductsPlatformizedRequest;
    type storesCatalogV1ProductProducts_universal_d_PlatformQuery = PlatformQuery;
    type storesCatalogV1ProductProducts_universal_d_PlatformQueryPagingMethodOneOf = PlatformQueryPagingMethodOneOf;
    type storesCatalogV1ProductProducts_universal_d_Sorting = Sorting;
    type storesCatalogV1ProductProducts_universal_d_SortOrder = SortOrder;
    const storesCatalogV1ProductProducts_universal_d_SortOrder: typeof SortOrder;
    type storesCatalogV1ProductProducts_universal_d_PlatformPaging = PlatformPaging;
    type storesCatalogV1ProductProducts_universal_d_CursorPaging = CursorPaging;
    type storesCatalogV1ProductProducts_universal_d_QueryProductsPlatformizedResponse = QueryProductsPlatformizedResponse;
    type storesCatalogV1ProductProducts_universal_d_PlatformPagingMetadata = PlatformPagingMetadata;
    type storesCatalogV1ProductProducts_universal_d_Cursors = Cursors;
    type storesCatalogV1ProductProducts_universal_d_QueryProductsWithBigPageLimitRequest = QueryProductsWithBigPageLimitRequest;
    type storesCatalogV1ProductProducts_universal_d_QueryWithBigPageLimit = QueryWithBigPageLimit;
    type storesCatalogV1ProductProducts_universal_d_PagingWithBigLimit = PagingWithBigLimit;
    type storesCatalogV1ProductProducts_universal_d_GetProductsRequest = GetProductsRequest;
    type storesCatalogV1ProductProducts_universal_d_GetProductsResponse = GetProductsResponse;
    type storesCatalogV1ProductProducts_universal_d_GetProductRequest = GetProductRequest;
    type storesCatalogV1ProductProducts_universal_d_GetProductResponse = GetProductResponse;
    type storesCatalogV1ProductProducts_universal_d_GetProductPlatformizedRequest = GetProductPlatformizedRequest;
    type storesCatalogV1ProductProducts_universal_d_GetProductPlatformizedResponse = GetProductPlatformizedResponse;
    type storesCatalogV1ProductProducts_universal_d_QueryCollectionsRequest = QueryCollectionsRequest;
    type storesCatalogV1ProductProducts_universal_d_QueryCollectionsResponse = QueryCollectionsResponse;
    type storesCatalogV1ProductProducts_universal_d_QueryCollectionsPlatformizedRequest = QueryCollectionsPlatformizedRequest;
    type storesCatalogV1ProductProducts_universal_d_QueryCollectionsPlatformizedResponse = QueryCollectionsPlatformizedResponse;
    type storesCatalogV1ProductProducts_universal_d_GetCollectionRequest = GetCollectionRequest;
    type storesCatalogV1ProductProducts_universal_d_GetCollectionResponse = GetCollectionResponse;
    type storesCatalogV1ProductProducts_universal_d_GetCollectionBySlugRequest = GetCollectionBySlugRequest;
    type storesCatalogV1ProductProducts_universal_d_GetCollectionBySlugResponse = GetCollectionBySlugResponse;
    type storesCatalogV1ProductProducts_universal_d_ProductOptionsAvailabilityRequest = ProductOptionsAvailabilityRequest;
    type storesCatalogV1ProductProducts_universal_d_ProductOptionsAvailabilityResponse = ProductOptionsAvailabilityResponse;
    type storesCatalogV1ProductProducts_universal_d_VariantData = VariantData;
    type storesCatalogV1ProductProducts_universal_d_QueryProductVariantsRequest = QueryProductVariantsRequest;
    type storesCatalogV1ProductProducts_universal_d_QueryProductVariantsResponse = QueryProductVariantsResponse;
    type storesCatalogV1ProductProducts_universal_d_QueryStoreVariantsRequest = QueryStoreVariantsRequest;
    type storesCatalogV1ProductProducts_universal_d_QueryStoreVariantsResponse = QueryStoreVariantsResponse;
    type storesCatalogV1ProductProducts_universal_d_StoreVariant = StoreVariant;
    type storesCatalogV1ProductProducts_universal_d_PlatformMedia = PlatformMedia;
    type storesCatalogV1ProductProducts_universal_d_PlatformMediaMediaOneOf = PlatformMediaMediaOneOf;
    type storesCatalogV1ProductProducts_universal_d_FocalPoint = FocalPoint;
    type storesCatalogV1ProductProducts_universal_d_VideoResolution = VideoResolution;
    type storesCatalogV1ProductProducts_universal_d_PreorderInfo = PreorderInfo;
    type storesCatalogV1ProductProducts_universal_d_QueryStoreVariantsWithBigLimitRequest = QueryStoreVariantsWithBigLimitRequest;
    type storesCatalogV1ProductProducts_universal_d_UnlimitedPlatformQuery = UnlimitedPlatformQuery;
    type storesCatalogV1ProductProducts_universal_d_UnlimitedPlatformQueryPagingMethodOneOf = UnlimitedPlatformQueryPagingMethodOneOf;
    type storesCatalogV1ProductProducts_universal_d_UnlimitedPlatformPaging = UnlimitedPlatformPaging;
    type storesCatalogV1ProductProducts_universal_d_UnlimitedPlatformCursorPaging = UnlimitedPlatformCursorPaging;
    type storesCatalogV1ProductProducts_universal_d_GetStoreVariantRequest = GetStoreVariantRequest;
    type storesCatalogV1ProductProducts_universal_d_GetStoreVariantResponse = GetStoreVariantResponse;
    type storesCatalogV1ProductProducts_universal_d_QueryCustomFieldsRequest = QueryCustomFieldsRequest;
    type storesCatalogV1ProductProducts_universal_d_QueryCustomFieldsResponse = QueryCustomFieldsResponse;
    type storesCatalogV1ProductProducts_universal_d_BulkQueryCustomFieldsRequest = BulkQueryCustomFieldsRequest;
    type storesCatalogV1ProductProducts_universal_d_BulkQueryCustomFieldsResponse = BulkQueryCustomFieldsResponse;
    type storesCatalogV1ProductProducts_universal_d_CustomFieldsContainer = CustomFieldsContainer;
    type storesCatalogV1ProductProducts_universal_d_AggregateProductsRequest = AggregateProductsRequest;
    type storesCatalogV1ProductProducts_universal_d_AggregateProductsResponse = AggregateProductsResponse;
    type storesCatalogV1ProductProducts_universal_d_MessageEnvelope = MessageEnvelope;
    type storesCatalogV1ProductProducts_universal_d_IdentificationData = IdentificationData;
    type storesCatalogV1ProductProducts_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
    type storesCatalogV1ProductProducts_universal_d_WebhookIdentityType = WebhookIdentityType;
    const storesCatalogV1ProductProducts_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
    const storesCatalogV1ProductProducts_universal_d_createProduct: typeof createProduct;
    type storesCatalogV1ProductProducts_universal_d_CreateDigitalProductOptions = CreateDigitalProductOptions;
    const storesCatalogV1ProductProducts_universal_d_updateProduct: typeof updateProduct;
    type storesCatalogV1ProductProducts_universal_d_UpdateProduct = UpdateProduct;
    type storesCatalogV1ProductProducts_universal_d_UpdateProductPlatformizedProduct = UpdateProductPlatformizedProduct;
    const storesCatalogV1ProductProducts_universal_d_deleteProduct: typeof deleteProduct;
    const storesCatalogV1ProductProducts_universal_d_updateProductVariants: typeof updateProductVariants;
    const storesCatalogV1ProductProducts_universal_d_resetAllProductVariantData: typeof resetAllProductVariantData;
    const storesCatalogV1ProductProducts_universal_d_addProductsToCollection: typeof addProductsToCollection;
    const storesCatalogV1ProductProducts_universal_d_removeProductsFromCollection: typeof removeProductsFromCollection;
    const storesCatalogV1ProductProducts_universal_d_addProductMedia: typeof addProductMedia;
    const storesCatalogV1ProductProducts_universal_d_removeProductMedia: typeof removeProductMedia;
    const storesCatalogV1ProductProducts_universal_d_addProductMediaToChoices: typeof addProductMediaToChoices;
    const storesCatalogV1ProductProducts_universal_d_removeProductMediaFromChoices: typeof removeProductMediaFromChoices;
    const storesCatalogV1ProductProducts_universal_d_deleteProductOptions: typeof deleteProductOptions;
    type storesCatalogV1ProductProducts_universal_d_SetCustomFieldsOptions = SetCustomFieldsOptions;
    type storesCatalogV1ProductProducts_universal_d_RemoveCustomFieldsOptions = RemoveCustomFieldsOptions;
    const storesCatalogV1ProductProducts_universal_d_removeBrand: typeof removeBrand;
    type storesCatalogV1ProductProducts_universal_d_BulkSetCustomFieldsOptions = BulkSetCustomFieldsOptions;
    type storesCatalogV1ProductProducts_universal_d_BulkRemoveCustomFieldsOptions = BulkRemoveCustomFieldsOptions;
    const storesCatalogV1ProductProducts_universal_d_createCollection: typeof createCollection;
    const storesCatalogV1ProductProducts_universal_d_updateCollection: typeof updateCollection;
    type storesCatalogV1ProductProducts_universal_d_UpdateCollection = UpdateCollection;
    const storesCatalogV1ProductProducts_universal_d_deleteCollection: typeof deleteCollection;
    const storesCatalogV1ProductProducts_universal_d_removeRibbon: typeof removeRibbon;
    const storesCatalogV1ProductProducts_universal_d_bulkUpdateProductsProperty: typeof bulkUpdateProductsProperty;
    type storesCatalogV1ProductProducts_universal_d_BulkUpdateProductsByFilterSyncOptions = BulkUpdateProductsByFilterSyncOptions;
    const storesCatalogV1ProductProducts_universal_d_bulkAdjustProductProperty: typeof bulkAdjustProductProperty;
    type storesCatalogV1ProductProducts_universal_d_BulkAdjustProductPropertiesByFilterSyncOptions = BulkAdjustProductPropertiesByFilterSyncOptions;
    type storesCatalogV1ProductProducts_universal_d_ReCloneStoreOptions = ReCloneStoreOptions;
    type storesCatalogV1ProductProducts_universal_d_WriteProxyUpdateProductPlatformizedProduct = WriteProxyUpdateProductPlatformizedProduct;
    type storesCatalogV1ProductProducts_universal_d_QueryProductsNonPlatformizedOptions = QueryProductsNonPlatformizedOptions;
    const storesCatalogV1ProductProducts_universal_d_queryProducts: typeof queryProducts;
    type storesCatalogV1ProductProducts_universal_d_ProductsQueryResult = ProductsQueryResult;
    type storesCatalogV1ProductProducts_universal_d_ProductsQueryBuilder = ProductsQueryBuilder;
    type storesCatalogV1ProductProducts_universal_d_QueryProductsWithBigPageLimitOptions = QueryProductsWithBigPageLimitOptions;
    const storesCatalogV1ProductProducts_universal_d_getProduct: typeof getProduct;
    type storesCatalogV1ProductProducts_universal_d_GetProductOptions = GetProductOptions;
    type storesCatalogV1ProductProducts_universal_d_GetProductPlatformizedOptions = GetProductPlatformizedOptions;
    type storesCatalogV1ProductProducts_universal_d_QueryCollectionsOptions = QueryCollectionsOptions;
    type storesCatalogV1ProductProducts_universal_d_GetCollectionOptions = GetCollectionOptions;
    const storesCatalogV1ProductProducts_universal_d_getCollectionBySlug: typeof getCollectionBySlug;
    const storesCatalogV1ProductProducts_universal_d_getProductOptionsAvailability: typeof getProductOptionsAvailability;
    const storesCatalogV1ProductProducts_universal_d_queryProductVariants: typeof queryProductVariants;
    type storesCatalogV1ProductProducts_universal_d_QueryProductVariantsOptions = QueryProductVariantsOptions;
    const storesCatalogV1ProductProducts_universal_d_queryStoreVariants: typeof queryStoreVariants;
    type storesCatalogV1ProductProducts_universal_d_QueryStoreVariantsOptions = QueryStoreVariantsOptions;
    type storesCatalogV1ProductProducts_universal_d_QueryStoreVariantsWithBigLimitOptions = QueryStoreVariantsWithBigLimitOptions;
    const storesCatalogV1ProductProducts_universal_d_getStoreVariant: typeof getStoreVariant;
    type storesCatalogV1ProductProducts_universal_d_AggregateProductsOptions = AggregateProductsOptions;
    namespace storesCatalogV1ProductProducts_universal_d {
        export { storesCatalogV1ProductProducts_universal_d_Product as Product, storesCatalogV1ProductProducts_universal_d_ProductType as ProductType, storesCatalogV1ProductProducts_universal_d_NumericPropertyRange as NumericPropertyRange, storesCatalogV1ProductProducts_universal_d_Stock as Stock, storesCatalogV1ProductProducts_universal_d_InventoryStatus as InventoryStatus, storesCatalogV1ProductProducts_universal_d_PriceData as PriceData, storesCatalogV1ProductProducts_universal_d_FormattedPrice as FormattedPrice, storesCatalogV1ProductProducts_universal_d_CostAndProfitData as CostAndProfitData, storesCatalogV1ProductProducts_universal_d_PricePerUnitData as PricePerUnitData, storesCatalogV1ProductProducts_universal_d_MeasurementUnit as MeasurementUnit, storesCatalogV1ProductProducts_universal_d_AdditionalInfoSection as AdditionalInfoSection, storesCatalogV1ProductProducts_universal_d_Ribbon as Ribbon, storesCatalogV1ProductProducts_universal_d_Media as Media, storesCatalogV1ProductProducts_universal_d_MediaItem as MediaItem, storesCatalogV1ProductProducts_universal_d_MediaItemItemOneOf as MediaItemItemOneOf, storesCatalogV1ProductProducts_universal_d_MediaItemUrlAndSize as MediaItemUrlAndSize, storesCatalogV1ProductProducts_universal_d_MediaItemType as MediaItemType, storesCatalogV1ProductProducts_universal_d_MediaItemVideo as MediaItemVideo, storesCatalogV1ProductProducts_universal_d_CustomTextField as CustomTextField, storesCatalogV1ProductProducts_universal_d_ProductOption as ProductOption, storesCatalogV1ProductProducts_universal_d_OptionType as OptionType, storesCatalogV1ProductProducts_universal_d_Choice as Choice, storesCatalogV1ProductProducts_universal_d_PageUrl as PageUrl, storesCatalogV1ProductProducts_universal_d_Discount as Discount, storesCatalogV1ProductProducts_universal_d_DiscountType as DiscountType, storesCatalogV1ProductProducts_universal_d_Variant as Variant, storesCatalogV1ProductProducts_universal_d_VariantDataWithNoStock as VariantDataWithNoStock, storesCatalogV1ProductProducts_universal_d_VariantStock as VariantStock, storesCatalogV1ProductProducts_universal_d_SeoSchema as SeoSchema, storesCatalogV1ProductProducts_universal_d_Keyword as Keyword, storesCatalogV1ProductProducts_universal_d_Tag as Tag, storesCatalogV1ProductProducts_universal_d_Settings as Settings, storesCatalogV1ProductProducts_universal_d_SecuredMedia as SecuredMedia, storesCatalogV1ProductProducts_universal_d_FileType as FileType, storesCatalogV1ProductProducts_universal_d_CreateProductRequest as CreateProductRequest, storesCatalogV1ProductProducts_universal_d_CreateProductResponse as CreateProductResponse, storesCatalogV1ProductProducts_universal_d_CreateProductPlatformizedRequest as CreateProductPlatformizedRequest, storesCatalogV1ProductProducts_universal_d_CreateProductPlatformizedResponse as CreateProductPlatformizedResponse, storesCatalogV1ProductProducts_universal_d_CreateDigitalProductRequest as CreateDigitalProductRequest, storesCatalogV1ProductProducts_universal_d_CreateDigitalProductResponse as CreateDigitalProductResponse, storesCatalogV1ProductProducts_universal_d_UpdateProductRequest as UpdateProductRequest, storesCatalogV1ProductProducts_universal_d_UpdateProductResponse as UpdateProductResponse, storesCatalogV1ProductProducts_universal_d_UpdateProductPlatformizedRequest as UpdateProductPlatformizedRequest, storesCatalogV1ProductProducts_universal_d_UpdateProductPlatformizedResponse as UpdateProductPlatformizedResponse, storesCatalogV1ProductProducts_universal_d_DeleteProductRequest as DeleteProductRequest, storesCatalogV1ProductProducts_universal_d_DeleteProductResponse as DeleteProductResponse, storesCatalogV1ProductProducts_universal_d_DeleteProductPlatformizedRequest as DeleteProductPlatformizedRequest, storesCatalogV1ProductProducts_universal_d_DeleteProductPlatformizedResponse as DeleteProductPlatformizedResponse, storesCatalogV1ProductProducts_universal_d_BulkDeleteProductsRequest as BulkDeleteProductsRequest, storesCatalogV1ProductProducts_universal_d_BulkDeleteProductsResponse as BulkDeleteProductsResponse, storesCatalogV1ProductProducts_universal_d_UpdateVariantsRequest as UpdateVariantsRequest, storesCatalogV1ProductProducts_universal_d_VariantOverride as VariantOverride, storesCatalogV1ProductProducts_universal_d_UpdateVariantsResponse as UpdateVariantsResponse, storesCatalogV1ProductProducts_universal_d_ResetAllVariantDataRequest as ResetAllVariantDataRequest, storesCatalogV1ProductProducts_universal_d_ResetAllVariantDataResponse as ResetAllVariantDataResponse, storesCatalogV1ProductProducts_universal_d_AddProductsToCollectionRequest as AddProductsToCollectionRequest, storesCatalogV1ProductProducts_universal_d_AddProductsToCollectionResponse as AddProductsToCollectionResponse, storesCatalogV1ProductProducts_universal_d_RemoveProductsFromCollectionRequest as RemoveProductsFromCollectionRequest, storesCatalogV1ProductProducts_universal_d_RemoveProductsFromCollectionResponse as RemoveProductsFromCollectionResponse, storesCatalogV1ProductProducts_universal_d_AddProductMediaRequest as AddProductMediaRequest, storesCatalogV1ProductProducts_universal_d_MediaDataForWrite as MediaDataForWrite, storesCatalogV1ProductProducts_universal_d_MediaDataForWriteMediaSourceOneOf as MediaDataForWriteMediaSourceOneOf, storesCatalogV1ProductProducts_universal_d_OptionAndChoice as OptionAndChoice, storesCatalogV1ProductProducts_universal_d_AddProductMediaResponse as AddProductMediaResponse, storesCatalogV1ProductProducts_universal_d_RemoveProductMediaRequest as RemoveProductMediaRequest, storesCatalogV1ProductProducts_universal_d_RemoveProductMediaResponse as RemoveProductMediaResponse, storesCatalogV1ProductProducts_universal_d_AddProductMediaToChoicesRequest as AddProductMediaToChoicesRequest, storesCatalogV1ProductProducts_universal_d_MediaAssignmentToChoice as MediaAssignmentToChoice, storesCatalogV1ProductProducts_universal_d_AddProductMediaToChoicesResponse as AddProductMediaToChoicesResponse, storesCatalogV1ProductProducts_universal_d_RemoveProductMediaFromChoicesRequest as RemoveProductMediaFromChoicesRequest, storesCatalogV1ProductProducts_universal_d_RemoveProductMediaFromChoicesResponse as RemoveProductMediaFromChoicesResponse, storesCatalogV1ProductProducts_universal_d_DeleteProductOptionsRequest as DeleteProductOptionsRequest, storesCatalogV1ProductProducts_universal_d_DeleteProductOptionsResponse as DeleteProductOptionsResponse, storesCatalogV1ProductProducts_universal_d_SetCustomFieldsRequest as SetCustomFieldsRequest, storesCatalogV1ProductProducts_universal_d_SetCustomFieldsResponse as SetCustomFieldsResponse, storesCatalogV1ProductProducts_universal_d_RemoveCustomFieldsRequest as RemoveCustomFieldsRequest, storesCatalogV1ProductProducts_universal_d_RemoveCustomFieldsResponse as RemoveCustomFieldsResponse, storesCatalogV1ProductProducts_universal_d_RemoveProductBrandRequest as RemoveProductBrandRequest, storesCatalogV1ProductProducts_universal_d_RemoveProductBrandResponse as RemoveProductBrandResponse, storesCatalogV1ProductProducts_universal_d_BulkSetCustomFieldsRequest as BulkSetCustomFieldsRequest, storesCatalogV1ProductProducts_universal_d_BulkSetCustomFieldsResponse as BulkSetCustomFieldsResponse, storesCatalogV1ProductProducts_universal_d_BulkRemoveCustomFieldsRequest as BulkRemoveCustomFieldsRequest, storesCatalogV1ProductProducts_universal_d_BulkRemoveCustomFieldsResponse as BulkRemoveCustomFieldsResponse, storesCatalogV1ProductProducts_universal_d_CreateCollectionRequest as CreateCollectionRequest, storesCatalogV1ProductProducts_universal_d_Collection as Collection, storesCatalogV1ProductProducts_universal_d_CreateCollectionResponse as CreateCollectionResponse, storesCatalogV1ProductProducts_universal_d_UpdateCollectionRequest as UpdateCollectionRequest, storesCatalogV1ProductProducts_universal_d_UpdateCollectionResponse as UpdateCollectionResponse, storesCatalogV1ProductProducts_universal_d_DeleteCollectionRequest as DeleteCollectionRequest, storesCatalogV1ProductProducts_universal_d_DeleteCollectionResponse as DeleteCollectionResponse, storesCatalogV1ProductProducts_universal_d_RemoveProductRibbonRequest as RemoveProductRibbonRequest, storesCatalogV1ProductProducts_universal_d_RemoveProductRibbonResponse as RemoveProductRibbonResponse, storesCatalogV1ProductProducts_universal_d_BulkUpdateProductsRequest as BulkUpdateProductsRequest, storesCatalogV1ProductProducts_universal_d_SetValue as SetValue, storesCatalogV1ProductProducts_universal_d_SetValueValueOneOf as SetValueValueOneOf, storesCatalogV1ProductProducts_universal_d_BulkUpdateProductsResponse as BulkUpdateProductsResponse, storesCatalogV1ProductProducts_universal_d_BulkProductResult as BulkProductResult, storesCatalogV1ProductProducts_universal_d_ItemMetadata as ItemMetadata, storesCatalogV1ProductProducts_universal_d_ApplicationError as ApplicationError, storesCatalogV1ProductProducts_universal_d_BulkActionMetadata as BulkActionMetadata, storesCatalogV1ProductProducts_universal_d_BulkUpdateProductsByFilterSyncRequest as BulkUpdateProductsByFilterSyncRequest, storesCatalogV1ProductProducts_universal_d_BulkUpdateProductsByFilterSyncResponse as BulkUpdateProductsByFilterSyncResponse, storesCatalogV1ProductProducts_universal_d_AllowedProductsCountLimitExceededErrorData as AllowedProductsCountLimitExceededErrorData, storesCatalogV1ProductProducts_universal_d_BulkAdjustProductPropertiesRequest as BulkAdjustProductPropertiesRequest, storesCatalogV1ProductProducts_universal_d_AdjustValue as AdjustValue, storesCatalogV1ProductProducts_universal_d_AdjustValueValueOneOf as AdjustValueValueOneOf, storesCatalogV1ProductProducts_universal_d_PropertyAdjustmentData as PropertyAdjustmentData, storesCatalogV1ProductProducts_universal_d_PropertyAdjustmentDataByOneOf as PropertyAdjustmentDataByOneOf, storesCatalogV1ProductProducts_universal_d_PercentageData as PercentageData, storesCatalogV1ProductProducts_universal_d_BulkAdjustProductPropertiesResponse as BulkAdjustProductPropertiesResponse, storesCatalogV1ProductProducts_universal_d_BulkAdjustProductPropertiesByFilterSyncRequest as BulkAdjustProductPropertiesByFilterSyncRequest, storesCatalogV1ProductProducts_universal_d_BulkAdjustProductPropertiesByFilterSyncResponse as BulkAdjustProductPropertiesByFilterSyncResponse, storesCatalogV1ProductProducts_universal_d_ReCloneStoreRequest as ReCloneStoreRequest, storesCatalogV1ProductProducts_universal_d_ReCloneStoreResponse as ReCloneStoreResponse, storesCatalogV1ProductProducts_universal_d_V1CreateProductPlatformizedRequest as V1CreateProductPlatformizedRequest, storesCatalogV1ProductProducts_universal_d_V1CreateProductPlatformizedResponse as V1CreateProductPlatformizedResponse, storesCatalogV1ProductProducts_universal_d_V1UpdateProductPlatformizedRequest as V1UpdateProductPlatformizedRequest, storesCatalogV1ProductProducts_universal_d_V1UpdateProductPlatformizedResponse as V1UpdateProductPlatformizedResponse, storesCatalogV1ProductProducts_universal_d_V1DeleteProductPlatformizedRequest as V1DeleteProductPlatformizedRequest, storesCatalogV1ProductProducts_universal_d_V1DeleteProductPlatformizedResponse as V1DeleteProductPlatformizedResponse, storesCatalogV1ProductProducts_universal_d_ProductCreated as ProductCreated, storesCatalogV1ProductProducts_universal_d_Version as Version, storesCatalogV1ProductProducts_universal_d_ProductChanged as ProductChanged, storesCatalogV1ProductProducts_universal_d_ProductDeleted as ProductDeleted, storesCatalogV1ProductProducts_universal_d_CollectionCreated as CollectionCreated, storesCatalogV1ProductProducts_universal_d_CollectionChanged as CollectionChanged, storesCatalogV1ProductProducts_universal_d_CollectionDeleted as CollectionDeleted, storesCatalogV1ProductProducts_universal_d_VariantsChanged as VariantsChanged, storesCatalogV1ProductProducts_universal_d_VariantChanged as VariantChanged, storesCatalogV1ProductProducts_universal_d_QueryProductsRequest as QueryProductsRequest, storesCatalogV1ProductProducts_universal_d_Query as Query, storesCatalogV1ProductProducts_universal_d_Paging as Paging, storesCatalogV1ProductProducts_universal_d_QueryProductsResponse as QueryProductsResponse, storesCatalogV1ProductProducts_universal_d_PagingMetadata as PagingMetadata, storesCatalogV1ProductProducts_universal_d_QueryProductsPlatformizedRequest as QueryProductsPlatformizedRequest, storesCatalogV1ProductProducts_universal_d_PlatformQuery as PlatformQuery, storesCatalogV1ProductProducts_universal_d_PlatformQueryPagingMethodOneOf as PlatformQueryPagingMethodOneOf, storesCatalogV1ProductProducts_universal_d_Sorting as Sorting, storesCatalogV1ProductProducts_universal_d_SortOrder as SortOrder, storesCatalogV1ProductProducts_universal_d_PlatformPaging as PlatformPaging, storesCatalogV1ProductProducts_universal_d_CursorPaging as CursorPaging, storesCatalogV1ProductProducts_universal_d_QueryProductsPlatformizedResponse as QueryProductsPlatformizedResponse, storesCatalogV1ProductProducts_universal_d_PlatformPagingMetadata as PlatformPagingMetadata, storesCatalogV1ProductProducts_universal_d_Cursors as Cursors, storesCatalogV1ProductProducts_universal_d_QueryProductsWithBigPageLimitRequest as QueryProductsWithBigPageLimitRequest, storesCatalogV1ProductProducts_universal_d_QueryWithBigPageLimit as QueryWithBigPageLimit, storesCatalogV1ProductProducts_universal_d_PagingWithBigLimit as PagingWithBigLimit, storesCatalogV1ProductProducts_universal_d_GetProductsRequest as GetProductsRequest, storesCatalogV1ProductProducts_universal_d_GetProductsResponse as GetProductsResponse, storesCatalogV1ProductProducts_universal_d_GetProductRequest as GetProductRequest, storesCatalogV1ProductProducts_universal_d_GetProductResponse as GetProductResponse, storesCatalogV1ProductProducts_universal_d_GetProductPlatformizedRequest as GetProductPlatformizedRequest, storesCatalogV1ProductProducts_universal_d_GetProductPlatformizedResponse as GetProductPlatformizedResponse, storesCatalogV1ProductProducts_universal_d_QueryCollectionsRequest as QueryCollectionsRequest, storesCatalogV1ProductProducts_universal_d_QueryCollectionsResponse as QueryCollectionsResponse, storesCatalogV1ProductProducts_universal_d_QueryCollectionsPlatformizedRequest as QueryCollectionsPlatformizedRequest, storesCatalogV1ProductProducts_universal_d_QueryCollectionsPlatformizedResponse as QueryCollectionsPlatformizedResponse, storesCatalogV1ProductProducts_universal_d_GetCollectionRequest as GetCollectionRequest, storesCatalogV1ProductProducts_universal_d_GetCollectionResponse as GetCollectionResponse, storesCatalogV1ProductProducts_universal_d_GetCollectionBySlugRequest as GetCollectionBySlugRequest, storesCatalogV1ProductProducts_universal_d_GetCollectionBySlugResponse as GetCollectionBySlugResponse, storesCatalogV1ProductProducts_universal_d_ProductOptionsAvailabilityRequest as ProductOptionsAvailabilityRequest, storesCatalogV1ProductProducts_universal_d_ProductOptionsAvailabilityResponse as ProductOptionsAvailabilityResponse, storesCatalogV1ProductProducts_universal_d_VariantData as VariantData, storesCatalogV1ProductProducts_universal_d_QueryProductVariantsRequest as QueryProductVariantsRequest, storesCatalogV1ProductProducts_universal_d_QueryProductVariantsResponse as QueryProductVariantsResponse, storesCatalogV1ProductProducts_universal_d_QueryStoreVariantsRequest as QueryStoreVariantsRequest, storesCatalogV1ProductProducts_universal_d_QueryStoreVariantsResponse as QueryStoreVariantsResponse, storesCatalogV1ProductProducts_universal_d_StoreVariant as StoreVariant, storesCatalogV1ProductProducts_universal_d_PlatformMedia as PlatformMedia, storesCatalogV1ProductProducts_universal_d_PlatformMediaMediaOneOf as PlatformMediaMediaOneOf, storesCatalogV1ProductProducts_universal_d_FocalPoint as FocalPoint, storesCatalogV1ProductProducts_universal_d_VideoResolution as VideoResolution, storesCatalogV1ProductProducts_universal_d_PreorderInfo as PreorderInfo, storesCatalogV1ProductProducts_universal_d_QueryStoreVariantsWithBigLimitRequest as QueryStoreVariantsWithBigLimitRequest, storesCatalogV1ProductProducts_universal_d_UnlimitedPlatformQuery as UnlimitedPlatformQuery, storesCatalogV1ProductProducts_universal_d_UnlimitedPlatformQueryPagingMethodOneOf as UnlimitedPlatformQueryPagingMethodOneOf, storesCatalogV1ProductProducts_universal_d_UnlimitedPlatformPaging as UnlimitedPlatformPaging, storesCatalogV1ProductProducts_universal_d_UnlimitedPlatformCursorPaging as UnlimitedPlatformCursorPaging, storesCatalogV1ProductProducts_universal_d_GetStoreVariantRequest as GetStoreVariantRequest, storesCatalogV1ProductProducts_universal_d_GetStoreVariantResponse as GetStoreVariantResponse, storesCatalogV1ProductProducts_universal_d_QueryCustomFieldsRequest as QueryCustomFieldsRequest, storesCatalogV1ProductProducts_universal_d_QueryCustomFieldsResponse as QueryCustomFieldsResponse, storesCatalogV1ProductProducts_universal_d_BulkQueryCustomFieldsRequest as BulkQueryCustomFieldsRequest, storesCatalogV1ProductProducts_universal_d_BulkQueryCustomFieldsResponse as BulkQueryCustomFieldsResponse, storesCatalogV1ProductProducts_universal_d_CustomFieldsContainer as CustomFieldsContainer, storesCatalogV1ProductProducts_universal_d_AggregateProductsRequest as AggregateProductsRequest, storesCatalogV1ProductProducts_universal_d_AggregateProductsResponse as AggregateProductsResponse, storesCatalogV1ProductProducts_universal_d_MessageEnvelope as MessageEnvelope, storesCatalogV1ProductProducts_universal_d_IdentificationData as IdentificationData, storesCatalogV1ProductProducts_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf, storesCatalogV1ProductProducts_universal_d_WebhookIdentityType as WebhookIdentityType, storesCatalogV1ProductProducts_universal_d_createProduct as createProduct, storesCatalogV1ProductProducts_universal_d_CreateDigitalProductOptions as CreateDigitalProductOptions, storesCatalogV1ProductProducts_universal_d_updateProduct as updateProduct, storesCatalogV1ProductProducts_universal_d_UpdateProduct as UpdateProduct, storesCatalogV1ProductProducts_universal_d_UpdateProductPlatformizedProduct as UpdateProductPlatformizedProduct, storesCatalogV1ProductProducts_universal_d_deleteProduct as deleteProduct, storesCatalogV1ProductProducts_universal_d_updateProductVariants as updateProductVariants, storesCatalogV1ProductProducts_universal_d_resetAllProductVariantData as resetAllProductVariantData, storesCatalogV1ProductProducts_universal_d_addProductsToCollection as addProductsToCollection, storesCatalogV1ProductProducts_universal_d_removeProductsFromCollection as removeProductsFromCollection, storesCatalogV1ProductProducts_universal_d_addProductMedia as addProductMedia, storesCatalogV1ProductProducts_universal_d_removeProductMedia as removeProductMedia, storesCatalogV1ProductProducts_universal_d_addProductMediaToChoices as addProductMediaToChoices, storesCatalogV1ProductProducts_universal_d_removeProductMediaFromChoices as removeProductMediaFromChoices, storesCatalogV1ProductProducts_universal_d_deleteProductOptions as deleteProductOptions, storesCatalogV1ProductProducts_universal_d_SetCustomFieldsOptions as SetCustomFieldsOptions, storesCatalogV1ProductProducts_universal_d_RemoveCustomFieldsOptions as RemoveCustomFieldsOptions, storesCatalogV1ProductProducts_universal_d_removeBrand as removeBrand, storesCatalogV1ProductProducts_universal_d_BulkSetCustomFieldsOptions as BulkSetCustomFieldsOptions, storesCatalogV1ProductProducts_universal_d_BulkRemoveCustomFieldsOptions as BulkRemoveCustomFieldsOptions, storesCatalogV1ProductProducts_universal_d_createCollection as createCollection, storesCatalogV1ProductProducts_universal_d_updateCollection as updateCollection, storesCatalogV1ProductProducts_universal_d_UpdateCollection as UpdateCollection, storesCatalogV1ProductProducts_universal_d_deleteCollection as deleteCollection, storesCatalogV1ProductProducts_universal_d_removeRibbon as removeRibbon, storesCatalogV1ProductProducts_universal_d_bulkUpdateProductsProperty as bulkUpdateProductsProperty, storesCatalogV1ProductProducts_universal_d_BulkUpdateProductsByFilterSyncOptions as BulkUpdateProductsByFilterSyncOptions, storesCatalogV1ProductProducts_universal_d_bulkAdjustProductProperty as bulkAdjustProductProperty, storesCatalogV1ProductProducts_universal_d_BulkAdjustProductPropertiesByFilterSyncOptions as BulkAdjustProductPropertiesByFilterSyncOptions, storesCatalogV1ProductProducts_universal_d_ReCloneStoreOptions as ReCloneStoreOptions, storesCatalogV1ProductProducts_universal_d_WriteProxyUpdateProductPlatformizedProduct as WriteProxyUpdateProductPlatformizedProduct, storesCatalogV1ProductProducts_universal_d_QueryProductsNonPlatformizedOptions as QueryProductsNonPlatformizedOptions, storesCatalogV1ProductProducts_universal_d_queryProducts as queryProducts, storesCatalogV1ProductProducts_universal_d_ProductsQueryResult as ProductsQueryResult, storesCatalogV1ProductProducts_universal_d_ProductsQueryBuilder as ProductsQueryBuilder, storesCatalogV1ProductProducts_universal_d_QueryProductsWithBigPageLimitOptions as QueryProductsWithBigPageLimitOptions, storesCatalogV1ProductProducts_universal_d_getProduct as getProduct, storesCatalogV1ProductProducts_universal_d_GetProductOptions as GetProductOptions, storesCatalogV1ProductProducts_universal_d_GetProductPlatformizedOptions as GetProductPlatformizedOptions, storesCatalogV1ProductProducts_universal_d_QueryCollectionsOptions as QueryCollectionsOptions, storesCatalogV1ProductProducts_universal_d_GetCollectionOptions as GetCollectionOptions, storesCatalogV1ProductProducts_universal_d_getCollectionBySlug as getCollectionBySlug, storesCatalogV1ProductProducts_universal_d_getProductOptionsAvailability as getProductOptionsAvailability, storesCatalogV1ProductProducts_universal_d_queryProductVariants as queryProductVariants, storesCatalogV1ProductProducts_universal_d_QueryProductVariantsOptions as QueryProductVariantsOptions, storesCatalogV1ProductProducts_universal_d_queryStoreVariants as queryStoreVariants, storesCatalogV1ProductProducts_universal_d_QueryStoreVariantsOptions as QueryStoreVariantsOptions, storesCatalogV1ProductProducts_universal_d_QueryStoreVariantsWithBigLimitOptions as QueryStoreVariantsWithBigLimitOptions, storesCatalogV1ProductProducts_universal_d_getStoreVariant as getStoreVariant, storesCatalogV1ProductProducts_universal_d_AggregateProductsOptions as AggregateProductsOptions, };
    }
    export { storesV2InventoryInventory_universal_d as inventory, storesCatalogV1ProductProducts_universal_d as products };
}
