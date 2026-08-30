declare module "wix-ecom.v2" {
    interface CurrencyRate {
    }
    interface ListCurrenciesRequest {
    }
    interface ListCurrenciesResponse {
        /** Supported currencies. */
        currencies?: Currency[];
    }
    interface Currency {
        /** A 3-letter [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217) currency code. */
        code?: string;
        /** Currency symbol. */
        symbol?: string;
    }
    interface ConvertCurrencyRequest {
        /** Amounts to convert. */
        amounts?: DecimalValue[];
        /** Original currency to convert from as a 3-letter [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217) code. The `from` currency code must exist in the array returned by the [`listCurrencies()`](#listcurrencies) function. */
        from: string;
        /** Target currency to convert to as a 3-letter [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217) code. The `to` currency code must exist in the array returned by the [`listCurrencies()`](#listcurrencies) function. */
        to: string;
    }
    interface DecimalValue {
        /** The value without decimal points. For example, the number `10.95` becomes `1095`. */
        value?: string;
        /** Decimal places to apply. For example, the number of decimal places for `10.95`  is `2`. */
        decimalPlaces?: number;
    }
    interface ConvertCurrencyResponse {
        /** Converted amounts. */
        amounts?: DecimalValue[];
        /** Date and time the conversion rate was last updated. */
        rateTimestamp?: Date;
    }
    interface ConversionRateRequest {
        /** Original currency to get the rate for as a 3-letter [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217) code. The `from` currency code must exist in the array returned by the [`listCurrencies()`](#listcurrencies) function. */
        from: string;
        /** Target currency to get the rate for as a 3-letter [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217) code. The `to` currency code must exist in the array returned by the [`listCurrencies()`](#listcurrencies) function. */
        to: string;
    }
    interface ConversionRateResponse {
        /** Conversion rate between 2 currencies. */
        rate?: DecimalValue;
        /** Date and time the conversion rate was last updated. */
        rateTimestamp?: Date;
    }
    /**
     * Returns an array of currencies. The array lists all currencies for which Wix supports conversion and their symbols.
     * @public
     * @permissionScope Manage Currencies
     * @permissionScopeId SCOPE.DC-CURRENCY-CONVERTER.MANAGE-CURRENCIES
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @applicableIdentity APP
     * @adminMethod
     */
    function listCurrencies(): Promise<ListCurrenciesResponse>;
    /**
     * Returns an array of amounts converted from the original (`from`) currency to the target (`to`) currency and the timestamp for the conversion rate used.
     *
     *
     * Use the `convertCurrency()` function to convert an array of one or more amounts between two currencies. The `convertCurrency()` function returns an array of converted amounts and the timestamp for the conversion rate used.
     *
     * > **Note**:  The currency codes used must exist in the array of supported currencies returned by the [`listCurrencies()`](#listcurrencies) function.
     *
     * @param amounts - Amounts to convert.
     * @public
     * @requiredField amounts
     * @requiredField identifiers
     * @requiredField identifiers.from
     * @requiredField identifiers.to
     * @param identifiers - Identifying details needed to determine which currency rate to convert. The combination of the `from` and `to` properties together comprise the unique ID.
     * @param options - Options to use when converting currency.
     * @permissionScope Manage Currencies
     * @permissionScopeId SCOPE.DC-CURRENCY-CONVERTER.MANAGE-CURRENCIES
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @applicableIdentity APP
     * @adminMethod
     */
    function convertCurrency(identifiers: ConvertCurrencyIdentifiers, amounts: DecimalValue[]): Promise<ConvertCurrencyResponse>;
    interface ConvertCurrencyIdentifiers {
        /** Original currency to convert from as a 3-letter [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217) code. The `from` currency code must exist in the array returned by the [`listCurrencies()`](#listcurrencies) function. */
        from: string;
        /** Target currency to convert to as a 3-letter [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217) code.  The `to` currency code must exist in the array returned by the [`listCurrencies()`](#listcurrencies) function. */
        to: string;
    }
    /**
     * Returns the conversion rate between 2 currencies.
     * @public
     * @requiredField identifiers
     * @requiredField identifiers.from
     * @requiredField identifiers.to
     * @param identifiers - Identifying details needed to get the conversion rate. The combination of the `from` and `to` properties together comprise the unique ID.
     * @permissionScope Manage Currencies
     * @permissionScopeId SCOPE.DC-CURRENCY-CONVERTER.MANAGE-CURRENCIES
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @applicableIdentity APP
     * @adminMethod
     */
    function getConversionRate(identifiers: GetConversionRateIdentifiers): Promise<ConversionRateResponse>;
    interface GetConversionRateIdentifiers {
        /** Original currency to get the rate for as a 3-letter [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217) code. The `from` currency code must exist in the array returned by the [`listCurrencies()`](#listcurrencies) function. */
        from: string;
        /** Target currency to get the rate for as a 3-letter [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217) code. The `to` currency code must exist in the array returned by the [`listCurrencies()`](#listcurrencies) function. */
        to: string;
    }
    type ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_CurrencyRate = CurrencyRate;
    type ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_ListCurrenciesRequest = ListCurrenciesRequest;
    type ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_ListCurrenciesResponse = ListCurrenciesResponse;
    type ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_Currency = Currency;
    type ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_ConvertCurrencyRequest = ConvertCurrencyRequest;
    type ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_DecimalValue = DecimalValue;
    type ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_ConvertCurrencyResponse = ConvertCurrencyResponse;
    type ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_ConversionRateRequest = ConversionRateRequest;
    type ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_ConversionRateResponse = ConversionRateResponse;
    const ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_listCurrencies: typeof listCurrencies;
    const ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_convertCurrency: typeof convertCurrency;
    type ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_ConvertCurrencyIdentifiers = ConvertCurrencyIdentifiers;
    const ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_getConversionRate: typeof getConversionRate;
    type ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_GetConversionRateIdentifiers = GetConversionRateIdentifiers;
    namespace ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d {
        export { ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_CurrencyRate as CurrencyRate, ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_ListCurrenciesRequest as ListCurrenciesRequest, ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_ListCurrenciesResponse as ListCurrenciesResponse, ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_Currency as Currency, ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_ConvertCurrencyRequest as ConvertCurrencyRequest, ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_DecimalValue as DecimalValue, ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_ConvertCurrencyResponse as ConvertCurrencyResponse, ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_ConversionRateRequest as ConversionRateRequest, ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_ConversionRateResponse as ConversionRateResponse, ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_listCurrencies as listCurrencies, ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_convertCurrency as convertCurrency, ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_ConvertCurrencyIdentifiers as ConvertCurrencyIdentifiers, ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_getConversionRate as getConversionRate, ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d_GetConversionRateIdentifiers as GetConversionRateIdentifiers, };
    }
    export { ecommerceCurrencyConverterV1CurrencyRateCurrencies_universal_d as currencies };
}
