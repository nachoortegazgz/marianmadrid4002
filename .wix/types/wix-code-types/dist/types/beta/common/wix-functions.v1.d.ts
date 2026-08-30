declare module "wix-functions.v1" {
  interface FunctionShop {
      /**
       * Id of the shop
       * @readonly
       */
      _id?: string | null;
      /** List of shops */
      shops?: Shop[];
  }
  interface GetPriceResponseOption {
      price?: number | null;
      name?: string | null;
  }
  enum SelectOneOfThree {
      FIRST = "FIRST",
      SECOND = "SECOND",
      THIRD = "THIRD"
  }
  interface FunctionsShopPriceSpiConfig {
      uriConfig?: SpiBaseUri;
      /** function shop id */
      functionShopId?: string | null;
      /** Namespace */
      namespace?: Namespace;
      /** Repeated namespace case */
      namespaces?: Namespace[];
  }
  interface SpiBaseUri {
      /**
       * Base URI where the methods are called. Wix appends the path to the `baseUri`.
       * For example, to call the Get Shipping Rates method at `https://my-shipping-provider.com/v1/getRates`, the base URI you provide here is `https://my-shipping-provider.com/`.
       */
      baseUri?: string;
      /** Alternate, custom URIs to replace the default URIs for specific service plugin methods. */
      alternativeUris?: AlternativeUri[];
  }
  interface AlternativeUri {
      /**
       * Name of the method to create a custom URI for.
       *
       * For `methodName`, use the name of the method in PascalCase.
       * For example, for Get Shipping Rates use `GetShippingRates`.
       */
      methodName?: string;
      /**
       * Custom URI that Wix uses to call your server for this method. The path-suffix documented in the method will not be appended to this URI.
       * Must be a secured endpoint beginning with `https://`. For example, `https://www.my-shipping-provider.com/my-shipping-rates`.
       */
      absoluteUri?: string;
  }
  interface Namespace {
      /** Namespace name */
      name?: string | null;
      /** Additional function shop id */
      functionShopId?: string | null;
  }
  interface Shop {
      /** Name of the shop */
      name?: string | null;
      /** Price of the shop */
      price?: number | null;
      /** Checked or not */
      checked?: boolean | null;
      /** Get price response option */
      option?: GetPriceResponseOption;
      /** Get price response options */
      options?: GetPriceResponseOption[];
      /** Select one of three */
      selectOneOfThree?: SelectOneOfThree;
      /**
       * Extension id which send the call
       * @readonly
       */
      extensionId?: string | null;
      /** Component configuration */
      configuration?: FunctionsShopPriceSpiConfig;
  }
  interface GetFunctionShopRequest {
      /** Description of value */
      _id: string;
  }
  interface GetFunctionShopResponse {
      /** Description of value */
      functionShop?: FunctionShop;
  }
  /** @param _id - Description of value
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId FUNCTIONS.FUNCTIONS_SHOP_READ
   * @adminMethod
   * @returns Description of value
   */
  function getFunctionShop(_id: string): Promise<FunctionShop>;
  
  type functionsFunctionsshopV1Functionshop_universal_d_FunctionShop = FunctionShop;
  type functionsFunctionsshopV1Functionshop_universal_d_GetPriceResponseOption = GetPriceResponseOption;
  type functionsFunctionsshopV1Functionshop_universal_d_SelectOneOfThree = SelectOneOfThree;
  const functionsFunctionsshopV1Functionshop_universal_d_SelectOneOfThree: typeof SelectOneOfThree;
  type functionsFunctionsshopV1Functionshop_universal_d_FunctionsShopPriceSpiConfig = FunctionsShopPriceSpiConfig;
  type functionsFunctionsshopV1Functionshop_universal_d_SpiBaseUri = SpiBaseUri;
  type functionsFunctionsshopV1Functionshop_universal_d_AlternativeUri = AlternativeUri;
  type functionsFunctionsshopV1Functionshop_universal_d_Namespace = Namespace;
  type functionsFunctionsshopV1Functionshop_universal_d_Shop = Shop;
  type functionsFunctionsshopV1Functionshop_universal_d_GetFunctionShopRequest = GetFunctionShopRequest;
  type functionsFunctionsshopV1Functionshop_universal_d_GetFunctionShopResponse = GetFunctionShopResponse;
  const functionsFunctionsshopV1Functionshop_universal_d_getFunctionShop: typeof getFunctionShop;
  namespace functionsFunctionsshopV1Functionshop_universal_d {
    export {
      functionsFunctionsshopV1Functionshop_universal_d_FunctionShop as FunctionShop,
      functionsFunctionsshopV1Functionshop_universal_d_GetPriceResponseOption as GetPriceResponseOption,
      functionsFunctionsshopV1Functionshop_universal_d_SelectOneOfThree as SelectOneOfThree,
      functionsFunctionsshopV1Functionshop_universal_d_FunctionsShopPriceSpiConfig as FunctionsShopPriceSpiConfig,
      functionsFunctionsshopV1Functionshop_universal_d_SpiBaseUri as SpiBaseUri,
      functionsFunctionsshopV1Functionshop_universal_d_AlternativeUri as AlternativeUri,
      functionsFunctionsshopV1Functionshop_universal_d_Namespace as Namespace,
      functionsFunctionsshopV1Functionshop_universal_d_Shop as Shop,
      functionsFunctionsshopV1Functionshop_universal_d_GetFunctionShopRequest as GetFunctionShopRequest,
      functionsFunctionsshopV1Functionshop_universal_d_GetFunctionShopResponse as GetFunctionShopResponse,
      functionsFunctionsshopV1Functionshop_universal_d_getFunctionShop as getFunctionShop,
    };
  }
  
  export { functionsFunctionsshopV1Functionshop_universal_d as functionShop };
}
