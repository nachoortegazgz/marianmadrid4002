/**
 * Hooks that can be added to wix-data operations.
 * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#)
 */
declare module 'wix-data-hooks' {
    import wixData from 'wix-data';
    /**
     * A hook triggered after an aggregation operation.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#afterAggregate)
     */
    function afterAggregate(item: any, context: HookContext): Promise<any> & any;
    /**
     * A hook that is triggered after a `count()` operation.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#afterCount)
     */
    function afterCount(count: number, context: HookContext): Promise<number> & number;
    /**
     * A hook triggered after a distinct query operation.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#afterDistinct)
     */
    function afterDistinct(value: any, context: HookContext): Promise<any> & any;
    /**
     * A hook that is triggered after a `get()` operation.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#afterGet)
     */
    function afterGet(item: any, context: HookContext): Promise<any> & any;
    /**
     * A hook that is triggered after an `insert()` operation.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#afterInsert)
     */
    function afterInsert(item: any, context: HookContext): Promise<any> & any;
    /**
     * A hook that is triggered after a `find` operation, for each of the items in the query results.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#afterQuery)
     */
    function afterQuery(item: any, context: HookContext): Promise<any> & any;
    /**
     * A hook that is triggered after a `remove()` operation.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#afterRemove)
     */
    function afterRemove(item: any, context: HookContext): Promise<any> & any;
    /**
     * A hook that is triggered after an `update()` operation.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#afterUpdate)
     */
    function afterUpdate(item: any, context: UpdateHookContext): Promise<any> & any;
    /**
     * A hook triggered before an aggregation operation.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#beforeAggregate)
     */
    function beforeAggregate(aggregate: wixData.WixDataAggregate, context: HookContext): Promise<wixData.WixDataAggregate> & wixData.WixDataAggregate;
    /**
     * A hook that is triggered before a `count()` operation.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#beforeCount)
     */
    function beforeCount(query: wixData.WixDataQuery, context: HookContext): Promise<wixData.WixDataQuery> & wixData.WixDataQuery;
    /**
     * A hook triggered before a distinct query operation.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#beforeDistinct)
     */
    function beforeDistinct(distinct: wixData.WixDataDistinct, context: HookContext): Promise<wixData.WixDataDistinct> & wixData.WixDataDistinct;
    /**
     * A hook that is triggered before a `get()` operation.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#beforeGet)
     */
    function beforeGet(itemId: string, context: HookContext): Promise<string> & string;
    /**
     * A hook that is triggered before an `insert()` operation.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#beforeInsert)
     */
    function beforeInsert(item: any, context: HookContext): Promise<any> & any;
    /**
     * A hook that is triggered before a `find()` operation.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#beforeQuery)
     */
    function beforeQuery(query: wixData.WixDataQuery, context: HookContext): Promise<wixData.WixDataQuery> & wixData.WixDataQuery;
    /**
     * A hook that is called before a `remove()` operation.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#beforeRemove)
     */
    function beforeRemove(itemId: string, context: UpdateHookContext): Promise<string> & string;
    /**
     * A hook that is triggered before an `update()` operation.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#beforeUpdate)
     */
    function beforeUpdate(item: any, context: UpdateHookContext): Promise<any> & any;
    /**
     * A hook that is triggered on any error or rejected Promise from any of the wix-data operations.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-data-hooks.html#onFailure)
     */
    function onFailure(error: Error, context: HookContext): Promise<any>;
    /**
     * An object that contains contextual information about the hook being called.
     */
    type HookContext = {
        /**
         * The ID of the collection the hook affects.
         */
        collectionName: string;
        /**
         * The current site user ID. If no user is logged in to the site it may be null.
         */
        userId: string;
        /**
         * The permissions role of the current user. Possibilities are: `anonymous`, `siteMember`, and `siteOwner`.
         */
        userRole: string;
    };
    /**
     * An object that contains contextual information when calling the `beforeUpdate()`, `beforeRemove()`, or `afterUpdate()` hooks.
     */
    type UpdateHookContext = {
        /**
         * The ID of the collection the hook affects.
         */
        collectionName: string;
        /**
         * The current site user ID. If no user is logged in to the site it may be null.
         */
        userId: string;
        /**
         * The permissions role of the current user. Possibilities are: `anonymous`, `siteMember`, and `siteOwner`.
         */
        userRole: string;
        /**
         * The item stored in the database collection before an update or delete operation.
         */
        currentItem: any;
    };
}
