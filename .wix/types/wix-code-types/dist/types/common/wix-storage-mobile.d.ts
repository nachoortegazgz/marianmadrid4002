/**
 * The wix-storage-mobile module contains functionality for the persistent
 *  storage of key/value data.
 * 	[Read more](https://www.wix.com/corvid/reference/wix-storage-mobile.html#)
 */
declare module 'wix-storage-mobile' {
    /**
     * Used for local storage of data.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-storage-mobile.html#local)
     */
    const local: StorageMobile;
    /**
     * Used for memory storage of data.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-storage-mobile.html#memory)
     */
    const memory: StorageMobile;
    /**
     * Used for storing local, or memory key/value data.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-storage-mobile.StorageMobile.html#)
     */
    interface StorageMobile {
        /**
         * Removes **all** items from local, or memory storage.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-storage-mobile.StorageMobile.html#clear)
         */
        clear(): void;
        /**
         * Gets an item from local or memory storage.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-storage-mobile.StorageMobile.html#getItem)
         */
        getItem(key: string): Promise<string>;
        /**
         * Removes an item from local or memory storage.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-storage-mobile.StorageMobile.html#removeItem)
         */
        removeItem(key: string): void;
        /**
         * Stores an item in local or memory storage.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-storage-mobile.StorageMobile.html#setItem)
         */
        setItem(key: string, value: string | number | string[]): Promise<void>;
    }
}
