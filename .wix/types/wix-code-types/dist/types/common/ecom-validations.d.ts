/**
 * The eCommerce Validations Service Plugin.
 * 	[Read more](https://www.wix.com/corvid/reference/ecom-validations.html#)
 */
declare module 'ecom-validations' {
    /**
     * Retrieves the configuration of your Validations service plugin.
     * 	[Read more](https://www.wix.com/corvid/reference/ecom-validations.html#getConfig)
     */
    function getConfig(): Promise<ValidationsConfigResponse>;
    /**
     * Retrieves any validation violations in a site visitor's cart or checkout.
     * 	[Read more](https://www.wix.com/corvid/reference/ecom-validations.html#getValidationViolations)
     */
    function getValidationViolations(options: Options, context: Context): Promise<GetValidationViolationsResponse>;
    type AddressDetails = {
        /**
         * 2-letter country code in [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format.
         */
        country: string;
        /**
         * Code for a subdivision, such as state, prefecture, or province, in [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) format.
         */
        subdivision?: string;
        /**
         * City name.
         */
        city: string;
        /**
         * Postal or zip code.
         */
        postalCode: string;
        /**
         * Street address object, with street number and name in separate properties.
         */
        streetAddress?: StreetAddressInfo;
        /**
         * Main address line, usually street and number.
         */
        addressLine: string;
        /**
         * Detailed address information, such as apartment, suite, or floor in free text.
         */
        addressLine2?: string;
    };
    type Amount = {
        /**
         * Amount.
         */
        amount: string;
    };
    type AmountMerchant = {
        /**
         * Amount.
         */
        amount: string;
    };
    type AmountRule = {
        /**
         * Amount.
         */
        amount: string;
    };
    type ApplicableLineItems = {
        /**
         * Line items that the delivery solution applies to. Max: 300 items. Each ID must be between 1 and 100 characters.
         */
        lineItemIds: string[];
    };
    type AppliedDiscount = {
        /**
         * Discount type.
         * Supported values: `GLOBAL`, `SPECIFIC_ITEMS`, `SHIPPING`.
         */
        discountType: string;
        /**
         * IDs of the line items the discount applies to.
         */
        lineItemIds: string[];
        /**
         * Coupon details.
         */
        coupon?: Coupon;
        /**
         * Merchant discount.
         */
        merchantDiscount?: MerchantDiscount;
        /**
         * Discount rule.
         */
        discountRule?: DiscountRule;
    };
    type BillingInfo = {
        /**
         * Address.
         */
        address: AddressDetails;
        /**
         * Contact details.
         */
        contactDetails: ContactDetails;
    };
    type BuyerDetails = {
        /**
         * Buyer's email address.
         */
        email: string;
        /**
         * Contact ID if one exists.
         */
        contactId: string;
    };
    type Carrier = {
        /**
         * Carrier app ID.
         */
        appId: string;
        /**
         * Unique code that acts as an ID for a shipping rate. For example, `"usps_std_overnight"`.
         *
         * Max: 250 characters
         */
        code: string;
    };
    type CatalogReference = {
        /**
         * Catalog item ID. For example, `productId` for Wix Stores or `eventId` for Wix Events.
         */
        catalogItemId: string;
        /**
         * ID of the Wix Catalog app. For example, the Wix Stores `appId`.
         */
        appId: string;
        /**
         * Additional info in `key:value` form.
         * For example, a size medium red t-shirt's options property would hold something like this:
         * + {"Size": "M", "Color": "Red"}
         */
        options: any;
    };
    type ContactDetails = {
        /**
         * Buyer's first name.
         */
        firstName: string;
        /**
         * Buyer's last name.
         */
        lastName: string;
        /**
         * Buyer's phone number.
         */
        phone: string;
        /**
         * Company name.
         */
        company?: string;
        /**
         * Tax information (for Brazil only). If `vatId.id` is provided, `vatId.type` must also be set.
         */
        vatId?: VatId;
    };
    type Context = {
        /**
         * [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) 3-letter currency code representing the currency used in the request sent from Wix. The response should be returned in the same currency.
         */
        currency: string;
        /**
         * The identity that describes the identity that triggered this request.
         */
        identity: Identity;
        /**
         * An array of languages in which the response should be returned. Languages are strings in concatenated [ISO 639-1: 2 Alpha language-code](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) and [ISO 3166-1: 2 Alpha country-code](https://en.wikipedia.org/wiki/ISO_3166-1) format, such as "en-US".
         */
        languages: string[];
        /**
         * A unique identifier of the request. You may print this ID to your logs to help with future debugging and easier correlation with Wix's logs.
         */
        requestId: string;
    };
    type Coupon = {
        /**
         * Coupon ID.
         */
        _id: string;
        /**
         * Coupon code.
         */
        code: string;
        /**
         * Coupon name.
         */
        name: string;
        /**
         * Coupon value.
         */
        amount: Amount;
    };
    type CustomFields = {
        /**
         * List of custom fields.
         */
        fields: Field[];
    };
    type DeliveryAllocation = {
        /**
         * The delivery option's carrier details. Can include multiple carriers if the delivery option is a combination of multiple carriers.
         */
        deliveryCarrier: Carrier;
        /**
         * The delivery region relevant for this delivery solution.
         */
        deliveryRegion: Region;
        /**
         * Line items this delivery solution applies to, when the delivery solution is partially supplied.
         */
        applicableLineItems: ApplicableLineItems;
    };
    type DeliveryTimeSlot = {
        /**
         * Starting time of the delivery time slot.
         */
        from: Date;
        /**
         * Ending time of the delivery time slot.
         */
        to: Date;
    };
    type Description = {
        /**
         * Subscription option description.
         */
        original: string;
        /**
         * Translated subscription option description.
         */
        translated: string;
    };
    type DiscountRule = {
        /**
         * Discount rule ID.
         */
        _id: string;
        /**
         * Discount rule name.
         */
        name: NameRule;
        /**
         * Discount value.
         */
        amount: AmountRule;
    };
    type ExternalReference = {
        /**
         * ID of the app associated with the purchase flow.
         * For example, the Wix Pay Links app ID.
         */
        appId: string;
        /**
         * Reference to an external resource ID. Used to link the purchase flow to a specific entity in an external system.
         * For example, a Wix Pay Link ID.
         *
         * Min: 1 character
         * Max: 100 characters
         */
        resourceId?: string;
    };
    type Field = {
        /**
         * Custom field value.
         */
        value: Value;
        /**
         * Custom field title.
         */
        title: string;
        /**
         * Translated custom field title.
         */
        translatedTitle: string;
    };
    type GetValidationViolationsResponse = {
        /**
         * List of validation violations.
         */
        violations: Violation[];
    };
    type Identity = {
        /**
         * Type of identity that triggered the request. Possible values are:
         * + `UNKNOWN`
         * + `ANONYMOUS_VISITOR`
         * + `MEMBER`
         * + `WIX_USER`
         * + `APP`
         */
        identityType: string;
        /**
         * ID of a site visitor who has not logged in to the site. Only provided if `identityType` is `ANONYMOUS_VISITOR`.
         */
        anonymousVisitorId?: string;
        /**
         * ID of a site visitor who has logged in to the site. Only provided if `identityType` is `MEMBER`.
         */
        memberId?: string;
        /**
         * ID of a Wix user (site owner, contributor, etc.). Only provided if `identityType` is `WIX_USER`.
         */
        wixUserId?: string;
        /**
         * ID of an app. Only provided if `identityType` is `APP`.
         */
        appId?: string;
    };
    type ItemTaxFullDetails = {
        /**
         * The portion of the total amount of this estimate that was taxable.
         */
        taxableAmount: MultiCurrencyPrice;
        /**
         * Calculated tax, based on `taxableAmount`.
         */
        totalTax: MultiCurrencyPrice;
        /**
         * Whether the price already includes tax.
         */
        isTaxIncluded: boolean;
        /**
         * A detailed description of all the tax authorities applied on this item. Max: 1000 items
         */
        taxBreakdown: TaxBreakdown[];
    };
    type ItemType = {
        /**
         * Preset item type.
         * Supported values:
         * + `"UNRECOGNISED"`
         * + `"PHYSICAL"`
         * + `"DIGITAL"`
         * + `"GIFT_CARD"`
         * + `"SERVICE"`
         */
        preset?: string;
        /**
         * Custom item type.
         */
        custom?: string;
    };
    type LineItem = {
        /**
         * Line item ID.
         */
        _id: string;
        /**
         * Item quantity.
         *
         * Min: `0`
         * Max: `100000`
         */
        quantity: number;
        /**
         * Catalog and item reference. Includes IDs for the item and the catalog it came from, as well as further optional info.
         */
        catalogReference: CatalogReference;
        /**
         * Product name.
         * For example,
         * + Stores: `product.name`
         * + Bookings: `service.info.name`
         * + Events: `ticket.name`
         */
        productName: ProductName;
        /**
         * Price of the item after catalog-defined discount and line item discounts.
         */
        price: MultiCurrencyPrice;
        /**
         * Physical properties of the item. When relevant, contains information such as SKU, item weight, and shippability.
         */
        physicalProperties: PhysicalProperties;
        /**
         * Item type.
         */
        itemType: ItemType;
        /**
         * [Subscription option](https://support.wix.com/en/article/wix-stores-selling-product-subscriptions) information. A subscription is a product that is sold on a recurring basis.
         */
        subscriptionOptionInfo: SubscriptionOptionInfo;
        /**
         * Price breakdown for this line item.
         */
        pricesBreakdown: LineItemPricesData;
    };
    type LineItemPricesData = {
        /**
         * Total price after discounts and after tax.
         */
        totalPriceAfterTax: MultiCurrencyPrice;
        /**
         * Total price after discounts, and before tax.
         */
        totalPriceBeforeTax: MultiCurrencyPrice;
        /**
         * Tax details.
         */
        taxDetails: ItemTaxFullDetails;
        /**
         * Total discount applied for the line item.
         */
        totalDiscount: MultiCurrencyPrice;
        /**
         * Catalog price after catalog-defined discount and automatic discounts.
         */
        price: MultiCurrencyPrice;
        /**
         * Item price before automatic discounts, coupons, and global discounts, but after the catalog-defined discount.
         * Default: `price` when not provided.
         */
        priceBeforeDiscounts: MultiCurrencyPrice;
        /**
         * Total price after catalog-defined discount and automatic discounts, taking line item's quantity into account.
         */
        lineItemPrice: MultiCurrencyPrice;
        /**
         * Item price before all discounts.
         * Default: `price` when not provided.
         */
        fullPrice: MultiCurrencyPrice;
    };
    type LineItemViolation = {
        /**
         * Where on the checkout and cart page the violation belonging to a specific line item will be displayed.
         *
         * Supported values:
         * + `"LINE_ITEM_DEFAULT"`: The default location on a checkout and cart page where a line item violation will be displayed. See image in the [introduction](https://www.wix.com/velo/reference/spis/wix-ecom/ecom-validations/introduction).
         */
        name: string;
        /**
         * ID of the line item containing the violation.
         */
        _id: string;
    };
    type MerchantDiscount = {
        /**
         * Discount value.
         */
        amount: AmountMerchant;
    };
    type MultiCurrencyPrice = {
        /**
         * Amount.
         */
        amount: string;
        /**
         * Converted amount.
         */
        convertedAmount: string;
        /**
         * Amount formatted with currency symbol.
         */
        formattedAmount: string;
        /**
         * Converted amount formatted with currency symbol.
         */
        formattedConvertedAmount: string;
    };
    type NameRule = {
        /**
         * Original discount rule name (in the site's default language).
         */
        original: string;
        /**
         * Translated discount rule name according to the buyer's language.
         * Default: `original` when not provided.
         */
        translated: string;
    };
    type Options = {
        /**
         * Information about the source of the request.
         */
        sourceInfo: SourceInfo;
        /**
         * Information to validate.
         */
        validationInfo: ValidationInfo;
        /**
         * Custom field data.
         * [Extended fields](https://dev.wix.com/docs/build-apps/develop-your-app/extensions/backend-extensions/schema-plugins/about-schema-plugin-extensions) must be configured in the app dashboard before they can be accessed with API calls.
         */
        extendedFields?: any;
    };
    type Other = {
        /**
         * Where on the checkout and cart page the violation will be displayed.
         *
         * Supported values:
         * + `"OTHER_DEFAULT"`: The default location on a checkout and cart page where a general (other) violation will be displayed. See image in the [introduction](https://www.wix.com/velo/reference/spis/wix-ecom/ecom-validations/introduction).
         */
        name: string;
    };
    type PhysicalProperties = {
        /**
         * Line item weight. Measurement unit (KG or LB) is taken from `order.weightUnit`.
         */
        weight: number;
        /**
         * Stock keeping unit. Learn more about [SKUs](https://www.wix.com/encyclopedia/definition/stock-keeping-unit-sku).
         */
        sku: string;
        /**
         * Whether this line item is shippable.
         */
        shippable: boolean;
    };
    type PriceSummary = {
        /**
         * Subtotal of all line items, before discounts and before tax.
         */
        subtotal: MultiCurrencyPrice;
        /**
         * Total shipping price, before discounts and before tax.
         */
        shipping: MultiCurrencyPrice;
        /**
         * Total tax.
         */
        tax: MultiCurrencyPrice;
        /**
         * Total calculated discount value.
         */
        discount: MultiCurrencyPrice;
        /**
         * Total price after discounts, gift cards, and tax.
         */
        total: MultiCurrencyPrice;
        /**
         * Total additional fees price before tax.
         */
        additionalFees: MultiCurrencyPrice;
    };
    type ProductName = {
        /**
         * Original item name in site's default language.
         *
         * Min: 1 character
         * Max: 80 characters
         */
        original: string;
        /**
         * Optional. Translated item name according to buyer language.
         *
         * Default: `original`
         * Min: 1 character
         * Max: 200 characters
         */
        translated: string;
    };
    type Region = {
        /**
         * Delivery region ID.
         */
        _id: string;
        /**
         * Delivery region name.
         *
         * Max: 100 characters
         */
        name: string;
    };
    type SelectedCarrierServiceOption = {
        /**
         * Unique identifier of selected option. For example, `"usps_std_overnight"`.
         *
         * Max: 100 characters
         */
        code: string;
        /**
         * Title of the option, such as USPS Standard Overnight Delivery (in the requested locale).
         * For example, "Standard" or "First-Class Package International".
         *
         * Max: 250 characters
         */
        title: string;
        /**
         * Shipping costs.
         */
        cost: SelectedCarrierServiceOptionPrices;
        /**
         * Delivery solution allocations to different delivery carriers and delivery regions. Max: 300 items
         */
        deliveryAllocations?: DeliveryAllocation[];
        /**
         * Whether the delivery solution is partial and doesn't apply to all items.
         */
        partial?: boolean;
        /**
         * Expected delivery time slot.
         */
        deliveryTimeSlot?: DeliveryTimeSlot;
    };
    type SelectedCarrierServiceOptionPrices = {
        /**
         * Total shipping price, after discount and after tax.
         */
        totalPriceAfterTax: MultiCurrencyPrice;
        /**
         * Total price of shipping after discounts (when relevant), and before tax.
         */
        totalPriceBeforeTax: MultiCurrencyPrice;
        /**
         * Tax details.
         */
        taxDetails: ItemTaxFullDetails;
        /**
         * Shipping discount before tax.
         */
        totalDiscount: MultiCurrencyPrice;
        /**
         * Shipping price before discount and before tax.
         */
        price: MultiCurrencyPrice;
    };
    type ShippingAddress = {
        /**
         * Address.
         */
        address: AddressDetails;
        /**
         * Contact details.
         */
        contactDetails: ContactDetails;
    };
    type ShippingInfo = {
        /**
         * Selected shipping option out of the options allowed for the `region`.
         */
        selectedCarrierServiceOption: SelectedCarrierServiceOption;
    };
    type SourceInfo = {
        /**
         * Source of the request.
         *
         * Supported values:
         * + `"CART"`
         * + `"CHECKOUT"`
         * + `"OTHER"`
         */
        source: string;
        /**
         * Persistent ID that correlates between the various eCommerce elements: cart, checkout, and order.
         */
        purchaseFlowId: string;
    };
    type StreetAddressInfo = {
        /**
         * Street number.
         */
        number: string;
        /**
         * Street name.
         */
        name: string;
    };
    type SubscriptionOptionInfo = {
        /**
         * Subscription option settings.
         */
        subscriptionSettings: SubscriptionSettings;
        /**
         * Subscription option title.
         */
        title: Title;
        /**
         * Subscription option description.
         */
        description: Description;
    };
    type SubscriptionSettings = {
        /**
         * Frequency of recurring payments.
         *
         * Supported values:
         *  - `"DAY"`
         *  - `"WEEK"`
         *  - `"MONTH"`
         *  - `"YEAR"`
         */
        frequency: string;
        /**
         * Whether subscription is renewed automatically at the end of each period.
         */
        autoRenewal: boolean;
        /**
         * Number of billing cycles before subscription ends. Ignored if `autoRenewal` is `true`.
         */
        billingCycles: number;
    };
    type Target = {
        /**
         * General (other) violation.
         */
        other?: Other;
        /**
         * Specific line item violation.
         */
        lineItem?: LineItemViolation;
    };
    type TaxBreakdown = {
        /**
         * The name of the jurisdiction to which this tax detail applies. For example, "New York" or "Quebec".
         *
         * Max: 200 characters
         */
        jurisdiction: string;
        /**
         * The amount of this line item price that was considered nontaxable.
         */
        nonTaxableAmount: MultiCurrencyPrice;
        /**
         * The rate at which this tax detail was calculated. For example, `0.1000` signifies 10% tax and `2.0000` signifies 200% tax.
         */
        rate: string;
        /**
         * The amount of tax estimated for this line item.
         */
        taxAmount: MultiCurrencyPrice;
        /**
         * The taxable amount of this line item.
         */
        taxableAmount: MultiCurrencyPrice;
        /**
         * The type of tax that was calculated. Depends on the jurisdiction's tax laws. For example, "Sales Tax", "Income Tax", "Value Added Tax".
         *
         * Max: 200 characters
         */
        taxType: string;
        /**
         * The name of the tax against which this tax amount was calculated. For example, "NY State Sales Tax", "Quebec GST".
         *
         * Max: 200 characters
         */
        taxName: string;
        /**
         * The type of the jurisdiction in which this tax detail applies.
         *
         * Supported values:
         * + `"UNDEFINED"`
         * + `"COUNTRY"`
         * + `"STATE"`
         * + `"COUNTY"`
         * + `"CITY"`
         * + `"SPECIAL"`
         */
        jurisdictionType: string;
    };
    type Title = {
        /**
         * Subscription option name.
         */
        original: string;
        /**
         * Translated subscription option name.
         */
        translated: string;
    };
    type ValidationInfo = {
        /**
         * Buyer details.
         */
        buyerDetails: BuyerDetails;
        /**
         * Line items. Max: `300`
         */
        lineItems: LineItem[];
        /**
         * Applied gift card details.
         */
        giftCard: giftCard;
        /**
         * Weight measurement unit.
         *
         * Supported values:
         * + `"UNSPECIFIED_WEIGHT_UNIT"`
         * + `"KG"`
         * + `"LB"`
         * Default: Site's weight unit
         */
        weightUnit: string;
        /**
         * Price summary.
         */
        priceSummary: PriceSummary;
        /**
         * Billing information.
         */
        billingInfo: BillingInfo;
        /**
         * Shipping address and contact details.
         */
        shippingAddress: ShippingAddress;
        /**
         * Shipping information.
         */
        shippingInfo: ShippingInfo;
        /**
         * Custom fields.
         */
        customFields: CustomFields;
        /**
         * Applied discounts.
         *
         * Max: 320 discounts
         */
        appliedDiscounts: AppliedDiscount[];
        /**
         * References to an external app and resource associated with this checkout. Used for integration and tracking across different platforms.
         */
        externalReference?: ExternalReference;
        /**
         * The site's default currency, in three-letter [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
         * This represents the base currency configured for the site and remains constant regardless of the customer's currency selection.
         */
        currency?: string;
        /**
         * The currency [selected by the customer](https://support.wix.com/en/article/multicurrency-an-overview) during the purchase flow, in three-letter [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
         * This reflects the customer's preferred display currency and may differ from the site's default currency.
         * When no specific currency is selected by the customer, this matches the `currency` property.
         */
        conversionCurrency?: string;
        /**
         * The currency used for payment, in three-letter [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
         * This is determined by the customer's selected currency and the site's supported payment currencies.
         * If the customer's selected currency is supported for payment, this matches the `conversionCurrency` property. If not supported, this falls back to the `currency` property.
         */
        paymentCurrency?: string;
    };
    type ValidationsConfigResponse = {
        /**
         * Whether to validate the cart page in addition to the checkout page.
         *
         * Default: `false`
         */
        validateInCart: boolean;
    };
    type Value = {
        /**
         * A null value. Supported value:
         * + `"NULL_VALUE"`
         */
        nullValue?: string;
        /**
         * A number value.
         */
        numberValue?: string;
        /**
         * A string value.
         */
        stringValue?: string;
        /**
         * A boolean value.
         */
        boolValue?: string;
        /**
         * A structured value.
         */
        structValue?: any;
        /**
         * A repeated `value`.
         */
        listValue?: Value[];
    };
    type VatId = {
        /**
         * Buyer's tax ID.
         */
        _id: string;
        /**
         * VAT tax type.
         *
         * Supported values:
         *  - `"CPF"`: for individual tax payers
         *  - `"CNPJ"`: for corporations
         */
        type: string;
    };
    type Violation = {
        /**
         * Severity of the violation. The violations are shown on the cart and checkout pages. A warning is displayed as yellow, and allows a site visitor to proceed with caution. An error is displayed as red, and doesn't allow a site visitor to proceed with the eCommerce flow.
         *
         * Supported values:
         * + `"WARNING"`
         * + `"ERROR"`
         */
        severity: string;
        /**
         * Target location on a checkout or cart page where the violation will be displayed.
         */
        target: Target;
        /**
         * Violation description. Can include rich text. HTTP or HTTPS links in the following format are allowed only in the format explained in the method description.
         */
        description: string;
    };
    type giftCard = {
        /**
         * **Deprecated.** Gift card ID.
         */
        _id?: string;
        /**
         * Gift card obfuscated code.
         */
        obfuscatedCode: string;
        /**
         * App ID of the gift card provider.
         */
        appId: string;
        /**
         * Gift card value.
         */
        amount: MultiCurrencyPrice;
    };
}
