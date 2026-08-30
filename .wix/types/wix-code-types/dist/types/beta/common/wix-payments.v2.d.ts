declare module "wix-payments.v2" {
  interface OnboardingAvailability {
      /**
       * ID of this entity
       * @readonly
       */
      _id?: string;
      /** Information about CBD specific flow. Will have DECLINED status if user is not in United States */
      cbdFlow?: CbdFlow;
      /** Information about all restricted goods user might sell. */
      restrictedGoodsFlow?: RestrictedGoodsFlow;
      /** Information about services Wix Partner sells. */
      partnerFlow?: PartnerFlow;
      /**
       * True, only if Wix Payments available to user due to the way account was created. False otherwise.
       * @readonly
       */
      wixPaymentsAvailable?: boolean;
  }
  interface CbdFlow {
      /**
       * Current status of CBD flow.
       * DECLINED - User does not sell CBD (or at least we do not know about it). Any payment service provider can be connected.
       * POSSIBLE - User possibly sells CBD and we should ask for confirmation. User still can connect Wix Payments.
       * CONFIRMED - User confirmed to sell CBD and now we should ask to complete attestation form. Only CBD providers can be connected. User can't connect Wix Payments.
       */
      status?: Status$2;
      /** Information about completion of attestation form. Include date of signing. */
      attestationInfo?: AttestationInfo;
  }
  enum Status$2 {
      UNDEFINED = "UNDEFINED",
      DECLINED = "DECLINED",
      POSSIBLE = "POSSIBLE",
      CONFIRMED = "CONFIRMED"
  }
  interface AttestationInfo {
      /**
       * Date of signing attestation form (only if status is CONFIRMED)
       * @readonly
       */
      attestationFormSignedDate?: Date | null;
      /** True, if attestation form was signed. False otherwise. */
      formSigned?: boolean | null;
  }
  interface RestrictedGoodsFlow {
      /**
       * Current status of Restricted Goods flow.
       * DECLINED - User confirmed that they don't sell any restricted goods. User may connect Wix Payments.
       * CONFIRMED - User confirmed that they do sell restricted goods. User can't connect Wix Payments.
       */
      status?: RestrictedGoodsFlowStatus;
      /** Contains detailed list of which restricted categories user sell. */
      categories?: RestrictedGoodsCategory[];
  }
  enum RestrictedGoodsFlowStatus {
      UNDEFINED = "UNDEFINED",
      DECLINED = "DECLINED",
      CONFIRMED = "CONFIRMED"
  }
  enum RestrictedGoodsCategory {
      UNDEFINED = "UNDEFINED",
      TOBACCO_ALCOHOL = "TOBACCO_ALCOHOL",
      FIREARMS_WEAPONS = "FIREARMS_WEAPONS",
      ADULT = "ADULT",
      MEDICAL = "MEDICAL",
      FINANCIAL = "FINANCIAL",
      TRAVEL_AGENCIES = "TRAVEL_AGENCIES",
      GAMBLING_LOTTERIES_SKILL_GAMES = "GAMBLING_LOTTERIES_SKILL_GAMES",
      BINARY_OPTIONS_CRYPTOCURRENCIES = "BINARY_OPTIONS_CRYPTOCURRENCIES",
      MARKETPLACES = "MARKETPLACES",
      OTHER = "OTHER",
      CBD = "CBD",
      TOBACCO_E_CIGARETTES = "TOBACCO_E_CIGARETTES",
      ALCOHOL = "ALCOHOL",
      NUTRACEUTICALS = "NUTRACEUTICALS"
  }
  interface PartnerFlow {
      /**
       * Current status of Partner flow.
       * DECLINED - User sells only approved services and may connect Wix Payments.
       * CONFIRMED - User sells not approved services and can't connect Wix Payments.
       */
      status?: PartnerFlowStatus;
  }
  enum PartnerFlowStatus {
      UNDEFINED = "UNDEFINED",
      DECLINED = "DECLINED",
      CONFIRMED = "CONFIRMED"
  }
  interface GetOnboardingAvailabilityRequest {
  }
  interface GetOnboardingAvailabilityResponse {
      /** Current state of onboarding availability for the merchant. */
      onboardingAvailability?: OnboardingAvailability;
  }
  interface UpdateCbdFlowRequest {
      /** New state of CBD flow for merchant. */
      cbdFlow?: CbdFlow;
  }
  interface UpdateCbdFlowResponse {
      /** Current state of onboarding availability for the merchant. */
      onboardingAvailability?: OnboardingAvailability;
  }
  interface UpdateRestrictedGoodsFlowRequest {
      /** New state of restricted goods flow for merchant. */
      restrictedGoods?: RestrictedGoodsFlow;
  }
  interface UpdateRestrictedGoodsFlowResponse {
      /** Current state of onboarding availability for the merchant. */
      onboardingAvailability?: OnboardingAvailability;
  }
  interface UpdatePartnerFlowRequest {
      /** New state of partner flow for merchant. */
      partnerFlow?: PartnerFlow;
  }
  interface UpdatePartnerFlowResponse {
      /** Current state of onboarding availability for the merchant. */
      onboardingAvailability?: OnboardingAvailability;
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
      restoreInfo?: RestoreInfo$2;
  }
  interface RestoreInfo$2 {
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
       * WIP - This property will hold both names and values of the updated fields of the entity.
       * For more details please see [adr](https://docs.google.com/document/d/1PdqsOM20Ph2HAkmx8zvUnzzk3Sekp3BR9h34wSvsRnI/edit#heading=h.phlw87mh2imx) or [issue](https://github.com/wix-private/nile-tracker/issues/363)
       * @internal
       */
      modifiedFields?: Record<string, any>;
  }
  interface EntityDeletedEvent$3 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
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
  /**
   * Fetch current state of onboarding availability for meta site.
   * @public
   * @documentationMaturity preview
   * @permissionId CASHIER.ONBOARDING_AVAILABILITY_READ
   * @adminMethod
   */
  function getOnboardingAvailability(): Promise<GetOnboardingAvailabilityResponse>;
  /**
   * Update current state of CBD flow for meta site.
   * @public
   * @documentationMaturity preview
   * @permissionId CASHIER.ONBOARDING_AVAILABILITY_UPDATE_CBD_FLOW
   * @adminMethod
   */
  function updateCbdFlow(options?: UpdateCbdFlowOptions): Promise<UpdateCbdFlowResponse>;
  interface UpdateCbdFlowOptions {
      /** New state of CBD flow for merchant. */
      cbdFlow?: CbdFlow;
  }
  /**
   * Update current state of Restricted Goods flow for meta site.
   * @public
   * @documentationMaturity preview
   * @permissionId CASHIER.ONBOARDING_AVAILABILITY_UPDATE_RG_FLOW
   * @adminMethod
   */
  function updateRestrictedGoodsFlow(options?: UpdateRestrictedGoodsFlowOptions): Promise<UpdateRestrictedGoodsFlowResponse>;
  interface UpdateRestrictedGoodsFlowOptions {
      /** New state of restricted goods flow for merchant. */
      restrictedGoods?: RestrictedGoodsFlow;
  }
  /**
   * Update current state of partner flow for meta site.
   * @public
   * @documentationMaturity preview
   * @permissionId CASHIER.ONBOARDING_AVAILABILITY_UPDATE_PARTNER_FLOW
   * @adminMethod
   */
  function updatePartnerFlow(options?: UpdatePartnerFlowOptions): Promise<UpdatePartnerFlowResponse>;
  interface UpdatePartnerFlowOptions {
      /** New state of partner flow for merchant. */
      partnerFlow?: PartnerFlow;
  }
  
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_OnboardingAvailability = OnboardingAvailability;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_CbdFlow = CbdFlow;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_AttestationInfo = AttestationInfo;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_RestrictedGoodsFlow = RestrictedGoodsFlow;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_RestrictedGoodsFlowStatus = RestrictedGoodsFlowStatus;
  const cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_RestrictedGoodsFlowStatus: typeof RestrictedGoodsFlowStatus;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_RestrictedGoodsCategory = RestrictedGoodsCategory;
  const cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_RestrictedGoodsCategory: typeof RestrictedGoodsCategory;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_PartnerFlow = PartnerFlow;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_PartnerFlowStatus = PartnerFlowStatus;
  const cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_PartnerFlowStatus: typeof PartnerFlowStatus;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_GetOnboardingAvailabilityRequest = GetOnboardingAvailabilityRequest;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_GetOnboardingAvailabilityResponse = GetOnboardingAvailabilityResponse;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdateCbdFlowRequest = UpdateCbdFlowRequest;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdateCbdFlowResponse = UpdateCbdFlowResponse;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdateRestrictedGoodsFlowRequest = UpdateRestrictedGoodsFlowRequest;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdateRestrictedGoodsFlowResponse = UpdateRestrictedGoodsFlowResponse;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdatePartnerFlowRequest = UpdatePartnerFlowRequest;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdatePartnerFlowResponse = UpdatePartnerFlowResponse;
  const cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_getOnboardingAvailability: typeof getOnboardingAvailability;
  const cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_updateCbdFlow: typeof updateCbdFlow;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdateCbdFlowOptions = UpdateCbdFlowOptions;
  const cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_updateRestrictedGoodsFlow: typeof updateRestrictedGoodsFlow;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdateRestrictedGoodsFlowOptions = UpdateRestrictedGoodsFlowOptions;
  const cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_updatePartnerFlow: typeof updatePartnerFlow;
  type cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdatePartnerFlowOptions = UpdatePartnerFlowOptions;
  namespace cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d {
    export {
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_OnboardingAvailability as OnboardingAvailability,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_CbdFlow as CbdFlow,
      Status$2 as Status,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_AttestationInfo as AttestationInfo,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_RestrictedGoodsFlow as RestrictedGoodsFlow,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_RestrictedGoodsFlowStatus as RestrictedGoodsFlowStatus,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_RestrictedGoodsCategory as RestrictedGoodsCategory,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_PartnerFlow as PartnerFlow,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_PartnerFlowStatus as PartnerFlowStatus,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_GetOnboardingAvailabilityRequest as GetOnboardingAvailabilityRequest,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_GetOnboardingAvailabilityResponse as GetOnboardingAvailabilityResponse,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdateCbdFlowRequest as UpdateCbdFlowRequest,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdateCbdFlowResponse as UpdateCbdFlowResponse,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdateRestrictedGoodsFlowRequest as UpdateRestrictedGoodsFlowRequest,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdateRestrictedGoodsFlowResponse as UpdateRestrictedGoodsFlowResponse,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdatePartnerFlowRequest as UpdatePartnerFlowRequest,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdatePartnerFlowResponse as UpdatePartnerFlowResponse,
      DomainEvent$3 as DomainEvent,
      DomainEventBodyOneOf$3 as DomainEventBodyOneOf,
      EntityCreatedEvent$3 as EntityCreatedEvent,
      RestoreInfo$2 as RestoreInfo,
      EntityUpdatedEvent$3 as EntityUpdatedEvent,
      EntityDeletedEvent$3 as EntityDeletedEvent,
      ActionEvent$3 as ActionEvent,
      MessageEnvelope$3 as MessageEnvelope,
      IdentificationData$3 as IdentificationData,
      IdentificationDataIdOneOf$3 as IdentificationDataIdOneOf,
      WebhookIdentityType$3 as WebhookIdentityType,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_getOnboardingAvailability as getOnboardingAvailability,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_updateCbdFlow as updateCbdFlow,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdateCbdFlowOptions as UpdateCbdFlowOptions,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_updateRestrictedGoodsFlow as updateRestrictedGoodsFlow,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdateRestrictedGoodsFlowOptions as UpdateRestrictedGoodsFlowOptions,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_updatePartnerFlow as updatePartnerFlow,
      cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d_UpdatePartnerFlowOptions as UpdatePartnerFlowOptions,
    };
  }
  
  /**
   * todo
   * A charge is a record of an attempt of
   * to move money from a customer to a merchant.
   * Read more about charges in this [article](<https://dev.wix.com/docs/rest/business-management/payments/charges/introduction>).
   */
  interface Charge extends ChargeNextActionOneOf {
      /** A browser should issue an HTTP GET request and render the result. */
      getMethodRedirect?: GetMethodRedirect;
      /** A browser should issue an HTTP POST request and render the result. */
      postMethodRedirect?: PostMethodRedirect;
      /** A browser should display a barcode / barcode url to continue payment. */
      barcodeDisplay?: BarcodeDisplay;
      /** A client should interact with card reader. */
      cardReaderInteraction?: CardReaderInteraction;
      /** A browser should show a QR code to continue payment. */
      qrCodeDisplay?: QrCodeDisplay;
      /**
       * A browser should display an iframe with web page.
       * Redirect shouldn't be performed as it's designed to be embedded into checkout page.
       */
      webPageDisplay?: WebPageDisplay;
      payPalSdkInteraction?: PayPalSdkInteraction;
      /**
       * Charge ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the charge is updated.
       * Ignored when creating a charge.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the charge was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the charge was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Merchant's account connection ID. */
      accountConnectionId?: string | null;
      /** PaymentIntent which was used to create the charge if it exists. */
      paymentIntentId?: string | null;
      /** Payment agreement which was used to create the charge if it exists. */
      paymentAgreementId?: string | null;
      /**
       * Status of the charge.
       * Read more about statuses in this [article](<https://dev.wix.com/docs/rest/business-management/payments/charges/introduction#lifecycle-of-a-charge>). // todo
       * @readonly
       */
      status?: Status$1;
      /**
       * Details about charge status.
       * @readonly
       */
      statusInfo?: StatusInfo$1;
      /**
       * Authorization amount of the charge in base units.
       * E.g. "12.95".
       */
      authorizationAmount?: string | null;
      /** Currency of the charge. */
      currency?: string | null;
      /**
       * Amount of the application fee in base units.
       * E.g. "12.95".
       * Application fee is the fee that the platform charges for the transaction.
       * Application fee is part of the amount represented by line items total amount + additional charges.
       */
      applicationFee?: string | null;
      /** Order line items. */
      items?: Item[];
      /** Additional charges to the order - e.g., tax, shipping or discount. */
      additionalCharges?: AdditionalCharges;
      /** Timestamp on which event/delivery/ect. happens and order is considered fulfilled */
      fulfillmentDate?: Date | null;
      /** Complete description that appears on the customers' statements. */
      statementDescriptor?: string | null;
      /** Billing information. */
      billingInfo?: Address;
      /** Shipping information. */
      shippingInfo?: Address;
      /** Payment method data that is used to create this charge. */
      paymentMethod?: PaymentMethod$1;
      /**
       * Payment method information enriched with data from the payment provider.
       * @readonly
       */
      paymentMethodInfo?: PaymentMethodInfo;
      /** Request charge to be made using strong customer authentication e.g. 3-D Secure. */
      scaRequested?: boolean | null;
      /**
       * Indicates if the charge is off-session.
       * Off-session charges are charges that are initiated by the merchant on behalf of the customer
       * e.g. charging a customer for a late fee or an incidental for a car rental
       * or automatically e.g. subscription renewal.
       */
      offSession?: boolean | null;
      /** Indicates if the charge is a mail order/telephone order (MOTO). */
      moto?: boolean | null;
      /** Indicates if the charge is an unscheduled merchant initiated payment. */
      unscheduledMit?: boolean | null;
      /**
       * Indicates that you intend to make future payments with payment method used in this charge.
       * If it’s set to true than payment agreement will be created after charge succeeds.
       */
      setupFutureUsages?: boolean | null;
      /**
       * Redirect URLs for different payment outcomes. PSP-hosted payment pages use these URLs to redirect
       * the buyer back to the merchant’s site.
       */
      returnUrls?: ReturnUrls;
      /** Payment information for the risk evaluation score. */
      riskData?: RiskData;
      /** Buyer information used to notify buyer about payment and to store payment credentials on file. */
      buyerInfo?: BuyerInfo;
      /** Indicates that capture shouldn't be performed automatically immediately after successful authorization. */
      delayedCapture?: boolean | null;
      /**
       * Amount that was already captured.
       * E.g. "12.95".
       * @readonly
       */
      capturedAmount?: string | null;
      /** Number of installments. */
      installment?: number | null;
      /** Data Extensions. */
      extendedFields?: ExtendedFields$2;
  }
  /** @oneof */
  interface ChargeNextActionOneOf {
      /** A browser should issue an HTTP GET request and render the result. */
      getMethodRedirect?: GetMethodRedirect;
      /** A browser should issue an HTTP POST request and render the result. */
      postMethodRedirect?: PostMethodRedirect;
      /** A browser should display a barcode / barcode url to continue payment. */
      barcodeDisplay?: BarcodeDisplay;
      /** A client should interact with card reader. */
      cardReaderInteraction?: CardReaderInteraction;
      /** A browser should show a QR code to continue payment. */
      qrCodeDisplay?: QrCodeDisplay;
      /**
       * A browser should display an iframe with web page.
       * Redirect shouldn't be performed as it's designed to be embedded into checkout page.
       */
      webPageDisplay?: WebPageDisplay;
      payPalSdkInteraction?: PayPalSdkInteraction;
  }
  /** Full contact details for an address */
  interface FullAddressContactDetails {
      /** Contact's first name. */
      firstName?: string | null;
      /** Contact's last name. */
      lastName?: string | null;
      /**
       * Contact's full name.
       * @internal
       */
      fullName?: string | null;
      /** Contact's phone number. */
      phone?: string | null;
      /** Contact's company name. */
      company?: string | null;
      /** Email associated with the address. */
      email?: string | null;
      /** Tax info. Currently usable only in Brazil. */
      vatId?: VatId;
  }
  interface VatId {
      /** Customer's tax ID. */
      _id?: string;
      /**
       * Tax type.
       *
       * Supported values:
       * + `CPF`: for individual tax payers
       * + `CNPJ`: for corporations
       */
      type?: VatType;
  }
  /** tax info types */
  enum VatType {
      UNSPECIFIED = "UNSPECIFIED",
      /** CPF - for individual tax payers. */
      CPF = "CPF",
      /** CNPJ - for corporations */
      CNPJ = "CNPJ"
  }
  /**
   * A common address format to use if you plan to store addresses in your service
   * todo: remove unused fields from decomposition and remove validations
   * Physical address
   */
  interface CommonAddress extends CommonAddressStreetOneOf {
      /** Street name and number. */
      streetAddress?: StreetAddress;
      /** Main address line, usually street and number as free text. */
      addressLine1?: string | null;
      /** Country code. */
      country?: string | null;
      /** Subdivision. Usually a state, region, prefecture, or province code, according to [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2). */
      subdivision?: string | null;
      /** City name. */
      city?: string | null;
      /** Zip/postal code. */
      postalCode?: string | null;
      /** Free text providing more detailed address info. Usually contains Apt, Suite, and Floor. */
      addressLine2?: string | null;
      /**
       * A string containing the full address of this location.
       * @internal
       */
      formatted?: string | null;
      /**
       * Coordinates of the physical address.
       * @internal
       */
      location?: AddressLocation;
      /**
       * Country full name.
       * @internal
       */
      countryFullname?: string | null;
      /**
       * Subdivision full name.
       * @internal
       */
      subdivisionFullname?: string | null;
      /**
       * Multi-level subdivisions from top to bottom.
       * @internal
       */
      subdivisions?: Subdivision[];
  }
  /** @oneof */
  interface CommonAddressStreetOneOf {
      /** Street name and number. */
      streetAddress?: StreetAddress;
      /** Main address line, usually street and number as free text. */
      addressLine?: string | null;
  }
  interface StreetAddress {
      /** Street number. */
      number?: string;
      /** Street name. */
      name?: string;
      /**
       * Apartment number.
       * @internal
       */
      apt?: string;
      /**
       * Optional address line 1
       * @internal
       */
      formattedAddressLine?: string | null;
  }
  interface AddressLocation {
      /** Address latitude. */
      latitude?: number | null;
      /** Address longitude. */
      longitude?: number | null;
  }
  interface Subdivision {
      /** Short subdivision code. */
      code?: string;
      /** Subdivision full name. */
      name?: string;
      /**
       * Subdivision level
       * @internal
       */
      type?: SubdivisionType;
      /**
       * Free text description of subdivision type.
       * @internal
       */
      typeInfo?: string | null;
  }
  enum SubdivisionType {
      UNKNOWN_SUBDIVISION_TYPE = "UNKNOWN_SUBDIVISION_TYPE",
      /** State */
      ADMINISTRATIVE_AREA_LEVEL_1 = "ADMINISTRATIVE_AREA_LEVEL_1",
      /** County */
      ADMINISTRATIVE_AREA_LEVEL_2 = "ADMINISTRATIVE_AREA_LEVEL_2",
      /** City/town */
      ADMINISTRATIVE_AREA_LEVEL_3 = "ADMINISTRATIVE_AREA_LEVEL_3",
      /** Neighborhood/quarter */
      ADMINISTRATIVE_AREA_LEVEL_4 = "ADMINISTRATIVE_AREA_LEVEL_4",
      /** Street/block */
      ADMINISTRATIVE_AREA_LEVEL_5 = "ADMINISTRATIVE_AREA_LEVEL_5",
      /** ADMINISTRATIVE_AREA_LEVEL_0. Indicates the national political entity, and is typically the highest order type returned by the Geocoder. */
      COUNTRY = "COUNTRY"
  }
  interface CardPayment {
      /** the card number token */
      numberToken?: string;
      /** the month of the card expiration date */
      expiryMonth?: number;
      /** the full year of the card expiration date */
      expiryYear?: number;
      /** the cardholder name printed on the card */
      holderName?: string | null;
      /** the CVV/CVC/CID token */
      securityCodeToken?: string | null;
  }
  interface CardReaderPayment {
      /** the location ID */
      locationId?: string | null;
      /** the terminal ID */
      terminalId?: string | null;
      /** the service ID */
      serviceId?: string | null;
      /**
       * whether create intent only or complete transaction (use this flag only if you know what it means)
       * @deprecated whether create intent only or complete transaction (use this flag only if you know what it means)
       * @targetRemovalDate 2025-06-01
       */
      createIntentOnly?: boolean | null;
  }
  interface IDealPayment {
      /** the code of the issuing bank */
      issuingBank?: string;
  }
  interface ApplePayPayment {
      /**
       * the payment token
       * [!] This field is only used during charge creation and is not a part of the charge object.
       */
      token?: string;
  }
  interface PayPalPayment {
      payPalToken?: string | null;
      useExpressCheckout?: boolean | null;
  }
  interface GooglePayPayment {
      /**
       * the payment token
       * [!] This field is only used during charge creation and is not a part of the charge object.
       */
      token?: string;
  }
  interface SavedCardPayment {
      /** id of previously saved Payment Method */
      savedPaymentMethodId?: string;
      /** the CVV/CVC/CID token */
      securityCodeToken?: string | null;
  }
  interface CardInfo$1 {
      /**
       * Card last 4 digits.
       * @readonly
       */
      lastFourDigits?: string | null;
      /**
       * Card BIN (Bank Identification Number). It's the first 4-8 digits of a card number.
       * @readonly
       */
      bin?: string | null;
      /** Card expiration month. */
      expirationMonth?: number | null;
      /** Card expiration year. */
      expirationYear?: number | null;
      /** Card holder's full name specified on the card. */
      cardholderName?: string | null;
      /**
       * Card brand.
       * *INTERNAL* as it's not platformized yet.
       * @internal
       * @readonly
       */
      brand?: CardBrand$1;
      /** Reference to transaction on network's side associated with this charge. */
      networkReference?: NetworkReference;
  }
  enum CardBrand$1 {
      UNKNOWN_CARD_BRAND = "UNKNOWN_CARD_BRAND",
      AMEX = "AMEX",
      DANKORT = "DANKORT",
      DINERS = "DINERS",
      DISCOVER = "DISCOVER",
      ISRACARD = "ISRACARD",
      JCB = "JCB",
      MAESTRO = "MAESTRO",
      MASTERCARD = "MASTERCARD",
      UNIONPAY = "UNIONPAY",
      VISA = "VISA",
      RUPAY = "RUPAY"
  }
  interface NetworkReference {
      /** Transaction ID assigned by a card scheme (Trace ID for Mastercard or Transaction ID for Visa). */
      networkTransactionId?: string | null;
      /** Transaction ID assigned by 3D Secure 2 directory server. */
      dsTransactionId?: string | null;
  }
  interface CardReaderInfo {
      /** Location ID. */
      locationId?: string | null;
      /** Terminal ID. */
      terminalId?: string | null;
      /** Service ID. */
      serviceId?: string | null;
  }
  interface BankInfo {
      issuingBank?: string | null;
  }
  interface AccountInfo {
      /**
       * The email of an Account used by Payment Method
       * @readonly
       */
      email?: string | null;
  }
  interface CofInfo {
      /** Tokens that are used to reference a payment agreement in external payment provider. */
      providerToken?: string | null;
  }
  interface FormField {
      name?: string;
      value?: string;
  }
  enum Status$1 {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      STARTING = "STARTING",
      NEEDS_ACTION = "NEEDS_ACTION",
      PENDING = "PENDING",
      AUTHORIZED = "AUTHORIZED",
      PARTIALLY_CAPTURED = "PARTIALLY_CAPTURED",
      CAPTURED = "CAPTURED",
      VOIDED = "VOIDED",
      FAILED = "FAILED"
  }
  interface StatusInfo$1 {
      /**
       * Reason code.
       * [Read more about reason codes.](https://dev.wix.com/docs/rest/api-reference/payment-provider-spi/reason-codes)
       */
      code?: string | null;
      /** Free-text description. */
      description?: string | null;
  }
  interface Item {
      /** Item ID. */
      _id?: string | null;
      /**
       * Item name.
       * @readonly
       */
      name?: string | null;
      /** Item quantity. */
      quantity?: number | null;
      /** Item price. */
      price?: string | null;
      /** Item description. */
      description?: string | null;
      /** Item weight in KG. */
      weightInKg?: number | null;
      /** Is item a tangible product. */
      tangible?: boolean | null;
  }
  interface AdditionalCharges {
      tax?: string | null;
      shipping?: string | null;
      discount?: string | null;
  }
  interface Address {
      contactDetails?: FullAddressContactDetails;
      address?: CommonAddress;
  }
  /**
   * Payment method options
   * todo: consider PaymentSource name
   */
  interface PaymentMethod$1 extends PaymentMethodPaymentMethodOneOf {
      /** payment with a card online */
      card?: CardPayment;
      /** payment with a card at a POS */
      cardReader?: CardReaderPayment;
      /** the iDEAL payment system */
      ideal?: IDealPayment;
      /** the Apple Pay digital wallet */
      applePay?: ApplePayPayment;
      /** the PayPal digital wallet */
      payPal?: PayPalPayment;
      /** Google Pay */
      googlePay?: GooglePayPayment;
      /** payment with a card using saved card */
      savedCard?: SavedCardPayment;
      /** Payment method type id. */
      typeId?: string;
  }
  /** @oneof */
  interface PaymentMethodPaymentMethodOneOf {
      /** payment with a card online */
      card?: CardPayment;
      /** payment with a card at a POS */
      cardReader?: CardReaderPayment;
      /** the iDEAL payment system */
      ideal?: IDealPayment;
      /** the Apple Pay digital wallet */
      applePay?: ApplePayPayment;
      /** the PayPal digital wallet */
      payPal?: PayPalPayment;
      /** Google Pay */
      googlePay?: GooglePayPayment;
      /** payment with a card using saved card */
      savedCard?: SavedCardPayment;
  }
  interface PaymentMethodInfo {
      /** Payment method type id. */
      typeId?: string;
      /** Card payment information. */
      cardInfo?: CardInfo$1;
      /** POS card reader payment information. */
      cardReaderInfo?: CardReaderInfo;
      /** Information for bank-based payment methods like iDEAL. */
      bankInfo?: BankInfo;
      /** The details of an account. */
      accountInfo?: AccountInfo;
      /**
       * Credentials on file information for the payment method.
       * @internal
       * @readonly
       */
      cofInfo?: CofInfo;
  }
  interface ReturnUrls {
      /** todo: what to do with non-web urls? */
      successUrl?: string | null;
      errorUrl?: string | null;
      pendingUrl?: string | null;
  }
  interface RiskData {
      userAgent?: string | null;
      referrerHeader?: string | null;
      acceptHeader?: string | null;
      ipAddress?: string | null;
      deviceFingerprint?: string | null;
      riskProviderData?: Record<string, string>;
  }
  interface BuyerInfo {
      contactId?: string | null;
      siteMemberId?: string | null;
      userId?: string | null;
      buyerLanguage?: string | null;
  }
  interface GetMethodRedirect {
      url?: string;
  }
  interface PostMethodRedirect {
      url?: string;
      fields?: FormField[];
  }
  interface BarcodeDisplay {
      barcode?: string | null;
      barcodeUrl?: string | null;
      expirationDate?: Date | null;
      billingEmail?: string | null;
  }
  interface CardReaderInteraction {
      readerToken?: string | null;
  }
  interface QrCodeDisplay {
      payload?: string | null;
      expirationDate?: Date | null;
  }
  interface WebPageDisplay {
      url?: string | null;
      expirationDate?: Date | null;
  }
  interface PayPalSdkInteraction {
      payPalOrderId?: string | null;
  }
  interface ExtendedFields$2 {
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
  interface CreateChargeRequest {
      charge: Charge;
  }
  interface CreateChargeResponse {
      charge?: Charge;
  }
  interface GetChargeRequest {
      chargeId: string;
      /**
       * List of heeded fields that will be returned.
       * You should have additional permission in order to get them as described in RequestedFields documentation.
       */
      fields?: RequestedFields$1[];
  }
  enum RequestedFields$1 {
      /** Default value. This value is unused. */
      UNKNOWN_REQUESTED_FIELD = "UNKNOWN_REQUESTED_FIELD",
      SENSITIVE_INFO = "SENSITIVE_INFO"
  }
  interface GetChargeResponse {
      charge?: Charge;
  }
  interface QueryChargesRequest {
      query?: CursorQuery$1;
      /**
       * List of heeded fields that will be returned.
       * You should have additional permission in order to get them as described in RequestedFields documentation.
       */
      fields?: RequestedFields$1[];
  }
  interface CursorQuery$1 extends CursorQueryPagingMethodOneOf$1 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$2;
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
      sort?: Sorting$1[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$1 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$2;
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
  interface CursorPaging$2 {
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
  interface QueryChargesResponse {
      charges?: Charge[];
      pagingMetadata?: CursorPagingMetadata$2;
  }
  interface CursorPagingMetadata$2 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      cursors?: Cursors$2;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$2 {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface VoidChargeRequest {
      chargeId: string;
  }
  interface VoidChargeResponse {
      charge?: Charge;
  }
  interface CaptureChargeRequest {
      chargeId: string;
      amount?: string | null;
      capturedAmount?: string | null;
  }
  interface CaptureChargeResponse {
      charge?: Charge;
  }
  interface UpdateExtendedFieldsRequest$1 {
      /** ID of the entity to update. */
      _id: string;
      /** Identifier for the app whose extended fields are being updated. */
      namespace: string;
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData: Record<string, any> | null;
  }
  interface UpdateExtendedFieldsResponse$1 {
      charge?: Charge;
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
      /** Event timestamp. */
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
  }
  interface EntityDeletedEvent$2 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
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
  /** @internal
   * @documentationMaturity preview
   * @requiredField charge
   * @permissionId PAYMENTS.CHARGE_CREATE
   * @adminMethod
   */
  function createCharge(charge: Charge): Promise<Charge>;
  /** @internal
   * @documentationMaturity preview
   * @requiredField chargeId
   * @permissionId PAYMENTS.CHARGE_READ
   * @adminMethod
   */
  function getCharge(chargeId: string, options?: GetChargeOptions): Promise<Charge>;
  interface GetChargeOptions {
      /**
       * List of heeded fields that will be returned.
       * You should have additional permission in order to get them as described in RequestedFields documentation.
       */
      fields?: RequestedFields$1[];
  }
  /** @internal
   * @documentationMaturity preview
   * @permissionId PAYMENTS.CHARGE_READ
   * @adminMethod
   */
  function queryCharges(options?: QueryChargesOptions): ChargesQueryBuilder;
  interface QueryChargesOptions {
      /**
       * List of heeded fields that will be returned.
       * You should have additional permission in order to get them as described in RequestedFields documentation.
       */
      fields?: RequestedFields$1[] | undefined;
  }
  interface QueryCursorResult$1 {
      cursors: Cursors$2;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ChargesQueryResult extends QueryCursorResult$1 {
      items: Charge[];
      query: ChargesQueryBuilder;
      next: () => Promise<ChargesQueryResult>;
      prev: () => Promise<ChargesQueryResult>;
  }
  interface ChargesQueryBuilder {
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ChargesQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ChargesQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ChargesQueryResult>;
  }
  /**
   * todo: should it be here ???
   * @internal
   * @documentationMaturity preview
   * @requiredField chargeId
   * @permissionId PAYMENTS.CHARGE_VOID
   * @adminMethod
   */
  function voidCharge(chargeId: string): Promise<VoidChargeResponse>;
  /** @internal
   * @documentationMaturity preview
   * @requiredField chargeId
   * @permissionId PAYMENTS.CHARGE_CAPTURE
   * @adminMethod
   */
  function captureCharge(chargeId: string, options?: CaptureChargeOptions): Promise<CaptureChargeResponse>;
  interface CaptureChargeOptions {
      amount?: string | null;
      capturedAmount?: string | null;
  }
  /** @param _id - ID of the entity to update.
   * @param namespace - Identifier for the app whose extended fields are being updated.
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField namespace
   * @requiredField options
   * @requiredField options.namespaceData
   * @permissionId PAYMENTS.CHARGE_UPDATE
   * @adminMethod
   */
  function updateExtendedFields$1(_id: string, namespace: string, options: UpdateExtendedFieldsOptions$1): Promise<UpdateExtendedFieldsResponse$1>;
  interface UpdateExtendedFieldsOptions$1 {
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData: Record<string, any> | null;
  }
  
  type paymentsChargesV1Charge_universal_d_Charge = Charge;
  type paymentsChargesV1Charge_universal_d_ChargeNextActionOneOf = ChargeNextActionOneOf;
  type paymentsChargesV1Charge_universal_d_FullAddressContactDetails = FullAddressContactDetails;
  type paymentsChargesV1Charge_universal_d_VatId = VatId;
  type paymentsChargesV1Charge_universal_d_VatType = VatType;
  const paymentsChargesV1Charge_universal_d_VatType: typeof VatType;
  type paymentsChargesV1Charge_universal_d_CommonAddress = CommonAddress;
  type paymentsChargesV1Charge_universal_d_CommonAddressStreetOneOf = CommonAddressStreetOneOf;
  type paymentsChargesV1Charge_universal_d_StreetAddress = StreetAddress;
  type paymentsChargesV1Charge_universal_d_AddressLocation = AddressLocation;
  type paymentsChargesV1Charge_universal_d_Subdivision = Subdivision;
  type paymentsChargesV1Charge_universal_d_SubdivisionType = SubdivisionType;
  const paymentsChargesV1Charge_universal_d_SubdivisionType: typeof SubdivisionType;
  type paymentsChargesV1Charge_universal_d_CardPayment = CardPayment;
  type paymentsChargesV1Charge_universal_d_CardReaderPayment = CardReaderPayment;
  type paymentsChargesV1Charge_universal_d_IDealPayment = IDealPayment;
  type paymentsChargesV1Charge_universal_d_ApplePayPayment = ApplePayPayment;
  type paymentsChargesV1Charge_universal_d_PayPalPayment = PayPalPayment;
  type paymentsChargesV1Charge_universal_d_GooglePayPayment = GooglePayPayment;
  type paymentsChargesV1Charge_universal_d_SavedCardPayment = SavedCardPayment;
  type paymentsChargesV1Charge_universal_d_NetworkReference = NetworkReference;
  type paymentsChargesV1Charge_universal_d_CardReaderInfo = CardReaderInfo;
  type paymentsChargesV1Charge_universal_d_BankInfo = BankInfo;
  type paymentsChargesV1Charge_universal_d_AccountInfo = AccountInfo;
  type paymentsChargesV1Charge_universal_d_CofInfo = CofInfo;
  type paymentsChargesV1Charge_universal_d_FormField = FormField;
  type paymentsChargesV1Charge_universal_d_Item = Item;
  type paymentsChargesV1Charge_universal_d_AdditionalCharges = AdditionalCharges;
  type paymentsChargesV1Charge_universal_d_Address = Address;
  type paymentsChargesV1Charge_universal_d_PaymentMethodPaymentMethodOneOf = PaymentMethodPaymentMethodOneOf;
  type paymentsChargesV1Charge_universal_d_PaymentMethodInfo = PaymentMethodInfo;
  type paymentsChargesV1Charge_universal_d_ReturnUrls = ReturnUrls;
  type paymentsChargesV1Charge_universal_d_RiskData = RiskData;
  type paymentsChargesV1Charge_universal_d_BuyerInfo = BuyerInfo;
  type paymentsChargesV1Charge_universal_d_GetMethodRedirect = GetMethodRedirect;
  type paymentsChargesV1Charge_universal_d_PostMethodRedirect = PostMethodRedirect;
  type paymentsChargesV1Charge_universal_d_BarcodeDisplay = BarcodeDisplay;
  type paymentsChargesV1Charge_universal_d_CardReaderInteraction = CardReaderInteraction;
  type paymentsChargesV1Charge_universal_d_QrCodeDisplay = QrCodeDisplay;
  type paymentsChargesV1Charge_universal_d_WebPageDisplay = WebPageDisplay;
  type paymentsChargesV1Charge_universal_d_PayPalSdkInteraction = PayPalSdkInteraction;
  type paymentsChargesV1Charge_universal_d_CreateChargeRequest = CreateChargeRequest;
  type paymentsChargesV1Charge_universal_d_CreateChargeResponse = CreateChargeResponse;
  type paymentsChargesV1Charge_universal_d_GetChargeRequest = GetChargeRequest;
  type paymentsChargesV1Charge_universal_d_GetChargeResponse = GetChargeResponse;
  type paymentsChargesV1Charge_universal_d_QueryChargesRequest = QueryChargesRequest;
  type paymentsChargesV1Charge_universal_d_QueryChargesResponse = QueryChargesResponse;
  type paymentsChargesV1Charge_universal_d_VoidChargeRequest = VoidChargeRequest;
  type paymentsChargesV1Charge_universal_d_VoidChargeResponse = VoidChargeResponse;
  type paymentsChargesV1Charge_universal_d_CaptureChargeRequest = CaptureChargeRequest;
  type paymentsChargesV1Charge_universal_d_CaptureChargeResponse = CaptureChargeResponse;
  const paymentsChargesV1Charge_universal_d_createCharge: typeof createCharge;
  const paymentsChargesV1Charge_universal_d_getCharge: typeof getCharge;
  type paymentsChargesV1Charge_universal_d_GetChargeOptions = GetChargeOptions;
  const paymentsChargesV1Charge_universal_d_queryCharges: typeof queryCharges;
  type paymentsChargesV1Charge_universal_d_QueryChargesOptions = QueryChargesOptions;
  type paymentsChargesV1Charge_universal_d_ChargesQueryResult = ChargesQueryResult;
  type paymentsChargesV1Charge_universal_d_ChargesQueryBuilder = ChargesQueryBuilder;
  const paymentsChargesV1Charge_universal_d_voidCharge: typeof voidCharge;
  const paymentsChargesV1Charge_universal_d_captureCharge: typeof captureCharge;
  type paymentsChargesV1Charge_universal_d_CaptureChargeOptions = CaptureChargeOptions;
  namespace paymentsChargesV1Charge_universal_d {
    export {
      paymentsChargesV1Charge_universal_d_Charge as Charge,
      paymentsChargesV1Charge_universal_d_ChargeNextActionOneOf as ChargeNextActionOneOf,
      paymentsChargesV1Charge_universal_d_FullAddressContactDetails as FullAddressContactDetails,
      paymentsChargesV1Charge_universal_d_VatId as VatId,
      paymentsChargesV1Charge_universal_d_VatType as VatType,
      paymentsChargesV1Charge_universal_d_CommonAddress as CommonAddress,
      paymentsChargesV1Charge_universal_d_CommonAddressStreetOneOf as CommonAddressStreetOneOf,
      paymentsChargesV1Charge_universal_d_StreetAddress as StreetAddress,
      paymentsChargesV1Charge_universal_d_AddressLocation as AddressLocation,
      paymentsChargesV1Charge_universal_d_Subdivision as Subdivision,
      paymentsChargesV1Charge_universal_d_SubdivisionType as SubdivisionType,
      paymentsChargesV1Charge_universal_d_CardPayment as CardPayment,
      paymentsChargesV1Charge_universal_d_CardReaderPayment as CardReaderPayment,
      paymentsChargesV1Charge_universal_d_IDealPayment as IDealPayment,
      paymentsChargesV1Charge_universal_d_ApplePayPayment as ApplePayPayment,
      paymentsChargesV1Charge_universal_d_PayPalPayment as PayPalPayment,
      paymentsChargesV1Charge_universal_d_GooglePayPayment as GooglePayPayment,
      paymentsChargesV1Charge_universal_d_SavedCardPayment as SavedCardPayment,
      CardInfo$1 as CardInfo,
      CardBrand$1 as CardBrand,
      paymentsChargesV1Charge_universal_d_NetworkReference as NetworkReference,
      paymentsChargesV1Charge_universal_d_CardReaderInfo as CardReaderInfo,
      paymentsChargesV1Charge_universal_d_BankInfo as BankInfo,
      paymentsChargesV1Charge_universal_d_AccountInfo as AccountInfo,
      paymentsChargesV1Charge_universal_d_CofInfo as CofInfo,
      paymentsChargesV1Charge_universal_d_FormField as FormField,
      Status$1 as Status,
      StatusInfo$1 as StatusInfo,
      paymentsChargesV1Charge_universal_d_Item as Item,
      paymentsChargesV1Charge_universal_d_AdditionalCharges as AdditionalCharges,
      paymentsChargesV1Charge_universal_d_Address as Address,
      PaymentMethod$1 as PaymentMethod,
      paymentsChargesV1Charge_universal_d_PaymentMethodPaymentMethodOneOf as PaymentMethodPaymentMethodOneOf,
      paymentsChargesV1Charge_universal_d_PaymentMethodInfo as PaymentMethodInfo,
      paymentsChargesV1Charge_universal_d_ReturnUrls as ReturnUrls,
      paymentsChargesV1Charge_universal_d_RiskData as RiskData,
      paymentsChargesV1Charge_universal_d_BuyerInfo as BuyerInfo,
      paymentsChargesV1Charge_universal_d_GetMethodRedirect as GetMethodRedirect,
      paymentsChargesV1Charge_universal_d_PostMethodRedirect as PostMethodRedirect,
      paymentsChargesV1Charge_universal_d_BarcodeDisplay as BarcodeDisplay,
      paymentsChargesV1Charge_universal_d_CardReaderInteraction as CardReaderInteraction,
      paymentsChargesV1Charge_universal_d_QrCodeDisplay as QrCodeDisplay,
      paymentsChargesV1Charge_universal_d_WebPageDisplay as WebPageDisplay,
      paymentsChargesV1Charge_universal_d_PayPalSdkInteraction as PayPalSdkInteraction,
      ExtendedFields$2 as ExtendedFields,
      paymentsChargesV1Charge_universal_d_CreateChargeRequest as CreateChargeRequest,
      paymentsChargesV1Charge_universal_d_CreateChargeResponse as CreateChargeResponse,
      paymentsChargesV1Charge_universal_d_GetChargeRequest as GetChargeRequest,
      RequestedFields$1 as RequestedFields,
      paymentsChargesV1Charge_universal_d_GetChargeResponse as GetChargeResponse,
      paymentsChargesV1Charge_universal_d_QueryChargesRequest as QueryChargesRequest,
      CursorQuery$1 as CursorQuery,
      CursorQueryPagingMethodOneOf$1 as CursorQueryPagingMethodOneOf,
      Sorting$1 as Sorting,
      SortOrder$1 as SortOrder,
      CursorPaging$2 as CursorPaging,
      paymentsChargesV1Charge_universal_d_QueryChargesResponse as QueryChargesResponse,
      CursorPagingMetadata$2 as CursorPagingMetadata,
      Cursors$2 as Cursors,
      paymentsChargesV1Charge_universal_d_VoidChargeRequest as VoidChargeRequest,
      paymentsChargesV1Charge_universal_d_VoidChargeResponse as VoidChargeResponse,
      paymentsChargesV1Charge_universal_d_CaptureChargeRequest as CaptureChargeRequest,
      paymentsChargesV1Charge_universal_d_CaptureChargeResponse as CaptureChargeResponse,
      UpdateExtendedFieldsRequest$1 as UpdateExtendedFieldsRequest,
      UpdateExtendedFieldsResponse$1 as UpdateExtendedFieldsResponse,
      DomainEvent$2 as DomainEvent,
      DomainEventBodyOneOf$2 as DomainEventBodyOneOf,
      EntityCreatedEvent$2 as EntityCreatedEvent,
      EntityUpdatedEvent$2 as EntityUpdatedEvent,
      EntityDeletedEvent$2 as EntityDeletedEvent,
      ActionEvent$2 as ActionEvent,
      MessageEnvelope$2 as MessageEnvelope,
      IdentificationData$2 as IdentificationData,
      IdentificationDataIdOneOf$2 as IdentificationDataIdOneOf,
      WebhookIdentityType$2 as WebhookIdentityType,
      paymentsChargesV1Charge_universal_d_createCharge as createCharge,
      paymentsChargesV1Charge_universal_d_getCharge as getCharge,
      paymentsChargesV1Charge_universal_d_GetChargeOptions as GetChargeOptions,
      paymentsChargesV1Charge_universal_d_queryCharges as queryCharges,
      paymentsChargesV1Charge_universal_d_QueryChargesOptions as QueryChargesOptions,
      paymentsChargesV1Charge_universal_d_ChargesQueryResult as ChargesQueryResult,
      paymentsChargesV1Charge_universal_d_ChargesQueryBuilder as ChargesQueryBuilder,
      paymentsChargesV1Charge_universal_d_voidCharge as voidCharge,
      paymentsChargesV1Charge_universal_d_captureCharge as captureCharge,
      paymentsChargesV1Charge_universal_d_CaptureChargeOptions as CaptureChargeOptions,
      updateExtendedFields$1 as updateExtendedFields,
      UpdateExtendedFieldsOptions$1 as UpdateExtendedFieldsOptions,
    };
  }
  
  /** Provider platform event */
  interface ProviderPlatformEvent extends ProviderPlatformEventResourceOneOf {
      /** Refund event data. */
      refund?: RefundEvent;
      /** Transaction event data. */
      transaction?: TransactionEvent;
      /** Capture event data */
      capture?: CaptureEvent;
      /** Void event data */
      void?: VoidEvent;
      /**
       * This field is ignored, do not send it.
       * @deprecated
       */
      pluginId?: string;
  }
  /** @oneof */
  interface ProviderPlatformEventResourceOneOf {
      /** Refund event data. */
      refund?: RefundEvent;
      /** Transaction event data. */
      transaction?: TransactionEvent;
      /** Capture event data */
      capture?: CaptureEvent;
      /** Void event data */
      void?: VoidEvent;
  }
  interface RefundEvent {
      /** Wix transaction ID. */
      wixTransactionId?: string;
      /** PSP refund ID. */
      pluginRefundId?: string;
      /** Wix [reason code](https://dev.wix.com/api/rest/all-apis/provider-platform/reason-codes#all-apis_provider-platform_reason-codes_refund-declined) indicating a failed request. */
      reasonCode?: number;
      /** Refunded amount. */
      amount?: string;
      /** Wix refund ID. This field is only required when a merchant initiates a refund from the Wix dashboard. */
      wixRefundId?: string | null;
      /** PSP-specific error code. */
      errorCode?: string | null;
      /** PSP-specific error message. */
      errorMessage?: string | null;
  }
  interface TransactionEvent {
      /** Wix transaction ID. */
      wixTransactionId?: string;
      /** PSP transaction ID. */
      pluginTransactionId?: string;
      /** Wix [reason code](https://dev.wix.com/api/rest/all-apis/provider-platform/reason-codes) indicating a failed or pending request. */
      reasonCode?: number;
      /** PSP-specific error code. */
      errorCode?: string | null;
      /** PSP-specific error message. */
      errorMessage?: string | null;
      /** Token data for stored payment method. */
      credentialsOnFile?: CredentialsOnFile;
      /** Details of actual customer's card, obtained from a Funding PAN as opposed to a Device PAN. */
      cardDetails?: CardDetails;
  }
  interface CredentialsOnFile extends CredentialsOnFileInfoOneOf {
      /** Network token data. */
      cardReference?: CardReference;
      /** Provider generated token data. */
      paymentMethodReference?: PaymentMethodReference;
  }
  /** @oneof */
  interface CredentialsOnFileInfoOneOf {
      /** Network token data. */
      cardReference?: CardReference;
      /** Provider generated token data. */
      paymentMethodReference?: PaymentMethodReference;
  }
  interface CardReference {
      /** Network token. */
      networkTransactionId?: string;
      /** Directory Server transaction ID */
      dsTransactionId?: string | null;
  }
  interface PaymentMethodReference {
      /** Payment method token created by the PSP. */
      token?: string;
  }
  interface CardDetails {
      /** Issuer (business) identification number. First 6 or 8 digits of the card's number. */
      bin?: string | null;
      /** Last 4 digits of the card's number. */
      lastFour?: string | null;
  }
  interface CaptureEvent {
      /** Wix transaction ID. */
      wixTransactionId?: string;
      /** Wix [reason code](https://dev.wix.com/docs/rest/business-management/payments/service-plugins/payment-service-provider-service-plugin/reason-codes#capture-declined) indicating request's status. */
      reasonCode?: number;
      /** Capture amount. */
      amount?: string;
      /** PSP-specific error code. */
      errorCode?: string | null;
      /** PSP-specific error message. */
      errorMessage?: string | null;
  }
  interface VoidEvent {
      /** Wix transaction ID. */
      wixTransactionId?: string;
      /** PSP void ID. */
      reasonCode?: number;
      /** Voided amount. */
      amount?: string;
      /** PSP-specific error code. */
      errorCode?: string | null;
      /** PSP-specific error message. */
      errorMessage?: string | null;
  }
  /** Submit event request */
  interface SubmitEventRequest {
      /** Event data. */
      event: ProviderPlatformEvent;
  }
  /** Submit event response */
  interface SubmitEventResponse {
  }
  /**
   * This Wix API is used by a Payment Service Provider (PSP) to send webhooks about payment and refund states to Wix.
   *
   * Calls to this endpoint must include a `User-Agent` header with the name of the PSP and the integration version in this format: `{PSP}/{version}`.
   * PSP's create their own version numbers.
   *
   * > You cannot try out this endpoint because an `Authorization` header value has to be obtained
   * > with the OAuth 2.0 client credentials flow for a specific scope.
   * > So please ignore the **Authorization** section below as well as the **Try It Out** button.
   * @param event - Event data.
   * @public
   * @documentationMaturity preview
   * @requiredField event
   * @permissionId CASHIER.GET_ACCESS
   * @adminMethod
   * @returns Submit event response
   */
  function submitEvent(event: ProviderPlatformEvent): Promise<void>;
  
  type paymentsPspV1ProviderPlatformEvent_universal_d_ProviderPlatformEvent = ProviderPlatformEvent;
  type paymentsPspV1ProviderPlatformEvent_universal_d_ProviderPlatformEventResourceOneOf = ProviderPlatformEventResourceOneOf;
  type paymentsPspV1ProviderPlatformEvent_universal_d_RefundEvent = RefundEvent;
  type paymentsPspV1ProviderPlatformEvent_universal_d_TransactionEvent = TransactionEvent;
  type paymentsPspV1ProviderPlatformEvent_universal_d_CredentialsOnFile = CredentialsOnFile;
  type paymentsPspV1ProviderPlatformEvent_universal_d_CredentialsOnFileInfoOneOf = CredentialsOnFileInfoOneOf;
  type paymentsPspV1ProviderPlatformEvent_universal_d_CardReference = CardReference;
  type paymentsPspV1ProviderPlatformEvent_universal_d_PaymentMethodReference = PaymentMethodReference;
  type paymentsPspV1ProviderPlatformEvent_universal_d_CardDetails = CardDetails;
  type paymentsPspV1ProviderPlatformEvent_universal_d_CaptureEvent = CaptureEvent;
  type paymentsPspV1ProviderPlatformEvent_universal_d_VoidEvent = VoidEvent;
  type paymentsPspV1ProviderPlatformEvent_universal_d_SubmitEventRequest = SubmitEventRequest;
  type paymentsPspV1ProviderPlatformEvent_universal_d_SubmitEventResponse = SubmitEventResponse;
  const paymentsPspV1ProviderPlatformEvent_universal_d_submitEvent: typeof submitEvent;
  namespace paymentsPspV1ProviderPlatformEvent_universal_d {
    export {
      paymentsPspV1ProviderPlatformEvent_universal_d_ProviderPlatformEvent as ProviderPlatformEvent,
      paymentsPspV1ProviderPlatformEvent_universal_d_ProviderPlatformEventResourceOneOf as ProviderPlatformEventResourceOneOf,
      paymentsPspV1ProviderPlatformEvent_universal_d_RefundEvent as RefundEvent,
      paymentsPspV1ProviderPlatformEvent_universal_d_TransactionEvent as TransactionEvent,
      paymentsPspV1ProviderPlatformEvent_universal_d_CredentialsOnFile as CredentialsOnFile,
      paymentsPspV1ProviderPlatformEvent_universal_d_CredentialsOnFileInfoOneOf as CredentialsOnFileInfoOneOf,
      paymentsPspV1ProviderPlatformEvent_universal_d_CardReference as CardReference,
      paymentsPspV1ProviderPlatformEvent_universal_d_PaymentMethodReference as PaymentMethodReference,
      paymentsPspV1ProviderPlatformEvent_universal_d_CardDetails as CardDetails,
      paymentsPspV1ProviderPlatformEvent_universal_d_CaptureEvent as CaptureEvent,
      paymentsPspV1ProviderPlatformEvent_universal_d_VoidEvent as VoidEvent,
      paymentsPspV1ProviderPlatformEvent_universal_d_SubmitEventRequest as SubmitEventRequest,
      paymentsPspV1ProviderPlatformEvent_universal_d_SubmitEventResponse as SubmitEventResponse,
      paymentsPspV1ProviderPlatformEvent_universal_d_submitEvent as submitEvent,
    };
  }
  
  /**
   * A refund a record of an attempt of
   * returning funds for a charge from a merchant to a buyer who has made a purchase.
   * Read more about refunds in this [article](<https://dev.wix.com/docs/rest/business-management/payments/refunds/introduction>).
   */
  interface Refund {
      /**
       * Refund ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the refund is updated.
       *
       * Ignored when creating a refund.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the refund was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the refund was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Data Extensions */
      extendedFields?: ExtendedFields$1;
      /** ID of charge for which the funds are returned by this refund. */
      chargeId?: string | null;
      /** Currency of refund, should be the same as currency of charge. */
      currency?: string | null;
      /**
       * Amount of refund in base units, what's returned to the buyer.
       * E.g. "12.95".
       */
      amount?: string | null;
      /**
       * Application fee returned to merchant from Wix.
       * In base units, e.g. "12.95".
       * Not present when no application fee was returned.
       * @readonly
       */
      returnedApplicationFee?: string | null;
      /**
       * Processing fee returned to merchant from provider.
       * In base units, e.g. "12.95".
       * Applicable only to Wix Payments provider.
       * Not present when no processing fee was returned.
       * @readonly
       */
      returnedProcessingFee?: string | null;
      /**
       * True when refund returns all funds for a charge.
       * @readonly
       */
      full?: boolean | null;
      /**
       * Status of the refund.
       * Read more about statuses in this [article](<https://dev.wix.com/docs/rest/business-management/payments/refunds/introduction#lifecycle-of-a-refund>).
       * @readonly
       */
      status?: Status;
      /**
       * ID of the refund on the PSP side.
       * @readonly
       */
      providerRefundId?: string | null;
      /**
       * _INTERNAL_
       * Who initiated this refund.
       * @internal
       */
      initiator?: Initiator;
      /** Reason why this refund was issued. */
      reason?: string | null;
      /**
       * Details about refund status.
       * Mostly used with statuses `FAILED` and `REVERSED`.
       * @readonly
       */
      statusInfo?: StatusInfo;
      /**
       * Acquirer Reference Number.
       * @readonly
       */
      acquirerReferenceNumber?: string | null;
      /** Optional free-text note about this refund. */
      note?: string | null;
  }
  interface ExtendedFields$1 {
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
  enum Status {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      /**
       * Initial status for all refunds.
       * Provisional, refund should be in this status for less than a minute.
       */
      STARTING = "STARTING",
      /** Status right after STARTED for asynchronous refunds. */
      PENDING = "PENDING",
      /**
       * Refund was successful.
       * Can transition to REVERSED in corner cases.
       */
      SUCCEEDED = "SUCCEEDED",
      /** Regular error, terminal status. */
      FAILED = "FAILED",
      /**
       * Either refund reversal
       * or any other error that comes after success, terminal status.
       */
      REVERSED = "REVERSED"
  }
  enum Initiator {
      UNKNOWN_INITIATOR = "UNKNOWN_INITIATOR",
      WIX = "WIX",
      API = "API",
      PROVIDER = "PROVIDER"
  }
  interface StatusInfo {
      /**
       * Reason code.
       * [Read more about reason codes.](https://dev.wix.com/docs/rest/api-reference/payment-provider-spi/reason-codes)
       */
      code?: string;
      /** Free-text description. */
      description?: string | null;
  }
  interface InternalSyncRefundRequest {
      /** Refund ID. */
      refundId?: string | null;
      /** ID of the refund on the PSP side. */
      providerRefundId?: string | null;
      /** ID of charge for which the funds are returned by this refund. */
      chargeId?: string | null;
      /**
       * Status of the refund.
       * Read more about statuses in this [article](<https://dev.wix.com/docs/rest/business-management/payments/refunds/introduction#lifecycle-of-a-refund>).
       */
      status?: Status;
      /**
       * Status code.
       * [Read more about reason codes.](https://dev.wix.com/docs/rest/api-reference/payment-provider-spi/reason-codes)
       */
      statusCode?: string | null;
      /** Currency of refund, should be the same as currency of charge. */
      currency?: string | null;
      /**
       * Amount of refund in base units, what's returned to the buyer.
       * E.g. "12.95".
       */
      amount?: string | null;
      /**
       * Application fee returned to merchant from Wix.
       * Having this as a separate field since Refund.returned_application_fee is readOnly.
       */
      returnedApplicationFee?: string | null;
      /** Reason why this refund was issued. */
      reason?: string | null;
      /** Optional free-text note about this refund. */
      note?: string | null;
  }
  interface InternalSyncRefundResponse {
      /** Created/updated refund. */
      refund?: Refund;
  }
  interface CreateRefundRequest {
      /** Refund to be created. */
      refund: Refund;
      /**
       * _INTERNAL_
       * True means processing fee for the refunded charge should be returned to the merchant.
       * Applies only to Wix Payments charges.
       * `PAYMENTS.REFUND_RETURN_PROCESSING_FEE` permission is required.
       * @internal
       */
      returnProcessingFee?: boolean | null;
      /**
       * Optional parameter used to prevent unintended refunds.
       * Used to check previously refunded amount according to the client
       * against the amount from server perspective.
       * If they don't match, error with code `PREVIOUSLY_REFUNDED_AMOUNT_MISMATCH` is returned.
       *
       * Read more about preventing unintended refunds in this
       * [article](<https://dev.wix.com/docs/rest/business-management/payments/refunds/introduction#preventing-unintended-refunds>).
       */
      previouslyRefundedAmount?: string | null;
  }
  interface CreateRefundResponse {
      /** The created refund. */
      refund?: Refund;
  }
  interface GetRefundRequest {
      /** ID of the refund to retrieve. */
      refundId: string;
  }
  interface GetRefundResponse {
      /** The requested refund. */
      refund?: Refund;
  }
  interface QueryRefundsRequest {
      /** WQL expression. */
      query?: CursorQuery;
  }
  interface CursorQuery extends CursorQueryPagingMethodOneOf {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$1;
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
      cursorPaging?: CursorPaging$1;
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
  interface CursorPaging$1 {
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
  interface QueryRefundsResponse {
      /** List of refunds. */
      refunds?: Refund[];
      /** Paging metadata */
      pagingMetadata?: CursorPagingMetadata$1;
  }
  interface CursorPagingMetadata$1 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      cursors?: Cursors$1;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$1 {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface UpdateExtendedFieldsRequest {
      /** ID of the entity to update. */
      _id: string;
      /** Identifier for the app whose extended fields are being updated. */
      namespace: string;
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData: Record<string, any> | null;
  }
  interface UpdateExtendedFieldsResponse {
      /** Updated refund. */
      refund?: Refund;
  }
  interface GetRefundabilityRequest {
      /** ID of the charge for which refundability will be calculated. */
      chargeId: string;
  }
  interface GetRefundabilityResponse {
      /** Refundability for the charge. */
      refundability?: Refundability;
  }
  /**
   * Internal notes:
   *
   * Instead of separate Refundability and PartialRefundability, we provide min and max refund amount.
   * If only full refund is possible, min_refund_amount = max_refund_amount = charge amount.
   */
  interface Refundability extends RefundabilityDetailsOneOf {
      /** When charge is refundable, specifies what amounts are allowed for refund. */
      refundOptions?: RefundOptions;
      /** When charge is not refundable, specifies why refund is not allowed. */
      rejection?: Rejection;
      /** Whether the caller is allowed to refund the charge. */
      refundable?: boolean;
      /** Currency of the charge. */
      currency?: string | null;
      /**
       * Sum of amounts of `SUCCEEDED` refunds for this charge in base units, e.g. "6.47".
       * Used to prevent unintended refunds, read more in this
       * [article](<https://dev.wix.com/docs/rest/business-management/payments/refunds/introduction#preventing-unintended-refunds>).
       */
      previouslyRefundedAmount?: string | null;
  }
  /** @oneof */
  interface RefundabilityDetailsOneOf {
      /** When charge is refundable, specifies what amounts are allowed for refund. */
      refundOptions?: RefundOptions;
      /** When charge is not refundable, specifies why refund is not allowed. */
      rejection?: Rejection;
  }
  interface RefundOptions {
      /** Minimum amount allowed to be refunded in base units, e.g. "0.50". */
      minRefundAmount?: string | null;
      /** Maximum amount allowed to be refunded in base units, e.g. "12.95". */
      maxRefundAmount?: string | null;
  }
  interface Rejection {
      /**
       * Following reasons are possible:
       * - `CHARGE_REFUNDED` — charge is already fully refunded.
       * - `CHARGE_REFUND_IN_PROGRESS` — another refund was initiated for this charge
       * and is waiting for confirmation from the provider.
       * - `CHARGE_DISPUTED` — charge was disputed.
       * - `CHARGE_REFUND_PERIOD_ENDED` — charge is too old to be refunded.
       * - `CHARGE_UNPAID` — charge is unpaid.
       * - `PROVIDER_DOWN` — PSP is temporarily down.
       * - `PROVIDER_NOT_SUPPORTED` — provider doesn't support refunds at the moment,
       * charge is in the wrong state,
       * or we don't have required information for this transaction.
       * - `PAYMENT_METHOD_NOT_SUPPORTED` — payment method of a charge doesn't support refunds.
       * - `MERCHANT_ACCOUNT_NOT_SUPPORTED` — merchant account doesn't support refunds at the moment.
       * - `MERCHANT_BALANCE_INSUFFICIENT` — merchant doesn't have enough balance to issue a refund for this charge.
       * - `NOT_AUTHORIZED` — logged in merchant has no permission to refund this charge.
       */
      reason?: RejectionReason;
  }
  enum RejectionReason {
      UNKNOWN_REJECTION_REASON = "UNKNOWN_REJECTION_REASON",
      /** Charge is already fully refunded. */
      CHARGE_REFUNDED = "CHARGE_REFUNDED",
      /** Another refund was initiated for this charge and is waiting for confirmation from the provider. */
      CHARGE_REFUND_IN_PROGRESS = "CHARGE_REFUND_IN_PROGRESS",
      /** Charge was disputed. */
      CHARGE_DISPUTED = "CHARGE_DISPUTED",
      /** Charge is too old to be refunded. */
      CHARGE_REFUND_PERIOD_ENDED = "CHARGE_REFUND_PERIOD_ENDED",
      /** Charge is unpaid. */
      CHARGE_UNPAID = "CHARGE_UNPAID",
      /** PSP is temporarily down. */
      PROVIDER_DOWN = "PROVIDER_DOWN",
      /**
       * Provider doesn't support refunds at the moment, transaction in a wrong state or we don't
       * have required information for this transaction.
       */
      PROVIDER_NOT_SUPPORTED = "PROVIDER_NOT_SUPPORTED",
      /** Payment method of a charge doesn't support refunds. */
      PAYMENT_METHOD_NOT_SUPPORTED = "PAYMENT_METHOD_NOT_SUPPORTED",
      /** Merchant account doesn't support refunds at the moment. */
      MERCHANT_ACCOUNT_NOT_SUPPORTED = "MERCHANT_ACCOUNT_NOT_SUPPORTED",
      /** Merchant doesn't have enough balance to issue a refund for this charge. */
      MERCHANT_BALANCE_INSUFFICIENT = "MERCHANT_BALANCE_INSUFFICIENT",
      /** Logged in merchant has no permission to refund this charge. */
      NOT_AUTHORIZED = "NOT_AUTHORIZED"
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
   * Creates a refund.
   * Refunding process starts immediately after refund entity is created.
   *
   * If amount and currency are not specified,
   * refund is created for full charge amount.
   * If amount is specified, you also need to specify currency,
   * and it should be the same as charge currency.
   *
   * The call blocks until refund status transitions from `STARTING`.
   * Read more about refund statuses in this
   * [article](<https://dev.wix.com/docs/rest/business-management/payments/refunds/introduction#lifecycle-of-a-refund>).
   * @param refund - Refund to be created.
   * @public
   * @documentationMaturity preview
   * @requiredField refund
   * @requiredField refund.chargeId
   * @permissionId PAYMENTS.REFUND_CREATE
   * @adminMethod
   * @returns The created refund.
   */
  function createRefund(refund: Refund, options?: CreateRefundOptions): Promise<Refund>;
  interface CreateRefundOptions {
      /**
       * _INTERNAL_
       * True means processing fee for the refunded charge should be returned to the merchant.
       * Applies only to Wix Payments charges.
       * `PAYMENTS.REFUND_RETURN_PROCESSING_FEE` permission is required.
       * @internal
       */
      returnProcessingFee?: boolean | null;
      /**
       * Optional parameter used to prevent unintended refunds.
       * Used to check previously refunded amount according to the client
       * against the amount from server perspective.
       * If they don't match, error with code `PREVIOUSLY_REFUNDED_AMOUNT_MISMATCH` is returned.
       *
       * Read more about preventing unintended refunds in this
       * [article](<https://dev.wix.com/docs/rest/business-management/payments/refunds/introduction#preventing-unintended-refunds>).
       */
      previouslyRefundedAmount?: string | null;
  }
  /**
   * Retrieves a refund.
   * @param refundId - ID of the refund to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField refundId
   * @permissionId PAYMENTS.REFUND_READ
   * @adminMethod
   * @returns The requested refund.
   */
  function getRefund(refundId: string): Promise<Refund>;
  /**
   * Retrieves a list of refunds, given the provided [paging, filtering, and sorting][1].
   *
   * Up to 1,000 Refunds can be returned per request.
   *
   * To learn how to query refunds, see [API Query Language][2].
   *
   * [1]: https://dev.wix.com/api/rest/getting-started/sorting-and-paging
   * [2]: https://dev.wix.com/api/rest/getting-started/api-query-language
   * @public
   * @documentationMaturity preview
   * @permissionId PAYMENTS.REFUND_READ
   * @adminMethod
   */
  function queryRefunds(): RefundsQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors$1;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface RefundsQueryResult extends QueryCursorResult {
      items: Refund[];
      query: RefundsQueryBuilder;
      next: () => Promise<RefundsQueryResult>;
      prev: () => Promise<RefundsQueryResult>;
  }
  interface RefundsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'chargeId', value: any) => RefundsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'chargeId', value: any) => RefundsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_createdDate'>) => RefundsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_createdDate'>) => RefundsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => RefundsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => RefundsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<RefundsQueryResult>;
  }
  /**
   * Updates extended fields of a refund without incrementing revision.
   * @param _id - ID of the entity to update.
   * @param namespace - Identifier for the app whose extended fields are being updated.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField namespace
   * @requiredField options
   * @requiredField options.namespaceData
   * @permissionId PAYMENTS.REFUND_UPDATE
   * @adminMethod
   */
  function updateExtendedFields(_id: string, namespace: string, options: UpdateExtendedFieldsOptions): Promise<UpdateExtendedFieldsResponse>;
  interface UpdateExtendedFieldsOptions {
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData: Record<string, any> | null;
  }
  /**
   * Calculates refundability for a charge.
   *
   * Read more about refundability in this
   * [article](<https://dev.wix.com/docs/rest/business-management/payments/refunds/introduction#refundability>).
   * @param chargeId - ID of the charge for which refundability will be calculated.
   * @public
   * @documentationMaturity preview
   * @requiredField chargeId
   * @permissionId PAYMENTS.REFUND_GET_REFUNDABILITY
   * @adminMethod
   */
  function getRefundability(chargeId: string): Promise<GetRefundabilityResponse>;
  
  type paymentsRefundsV1Refund_universal_d_Refund = Refund;
  type paymentsRefundsV1Refund_universal_d_Status = Status;
  const paymentsRefundsV1Refund_universal_d_Status: typeof Status;
  type paymentsRefundsV1Refund_universal_d_Initiator = Initiator;
  const paymentsRefundsV1Refund_universal_d_Initiator: typeof Initiator;
  type paymentsRefundsV1Refund_universal_d_StatusInfo = StatusInfo;
  type paymentsRefundsV1Refund_universal_d_InternalSyncRefundRequest = InternalSyncRefundRequest;
  type paymentsRefundsV1Refund_universal_d_InternalSyncRefundResponse = InternalSyncRefundResponse;
  type paymentsRefundsV1Refund_universal_d_CreateRefundRequest = CreateRefundRequest;
  type paymentsRefundsV1Refund_universal_d_CreateRefundResponse = CreateRefundResponse;
  type paymentsRefundsV1Refund_universal_d_GetRefundRequest = GetRefundRequest;
  type paymentsRefundsV1Refund_universal_d_GetRefundResponse = GetRefundResponse;
  type paymentsRefundsV1Refund_universal_d_QueryRefundsRequest = QueryRefundsRequest;
  type paymentsRefundsV1Refund_universal_d_CursorQuery = CursorQuery;
  type paymentsRefundsV1Refund_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type paymentsRefundsV1Refund_universal_d_Sorting = Sorting;
  type paymentsRefundsV1Refund_universal_d_SortOrder = SortOrder;
  const paymentsRefundsV1Refund_universal_d_SortOrder: typeof SortOrder;
  type paymentsRefundsV1Refund_universal_d_QueryRefundsResponse = QueryRefundsResponse;
  type paymentsRefundsV1Refund_universal_d_UpdateExtendedFieldsRequest = UpdateExtendedFieldsRequest;
  type paymentsRefundsV1Refund_universal_d_UpdateExtendedFieldsResponse = UpdateExtendedFieldsResponse;
  type paymentsRefundsV1Refund_universal_d_GetRefundabilityRequest = GetRefundabilityRequest;
  type paymentsRefundsV1Refund_universal_d_GetRefundabilityResponse = GetRefundabilityResponse;
  type paymentsRefundsV1Refund_universal_d_Refundability = Refundability;
  type paymentsRefundsV1Refund_universal_d_RefundabilityDetailsOneOf = RefundabilityDetailsOneOf;
  type paymentsRefundsV1Refund_universal_d_RefundOptions = RefundOptions;
  type paymentsRefundsV1Refund_universal_d_Rejection = Rejection;
  type paymentsRefundsV1Refund_universal_d_RejectionReason = RejectionReason;
  const paymentsRefundsV1Refund_universal_d_RejectionReason: typeof RejectionReason;
  const paymentsRefundsV1Refund_universal_d_createRefund: typeof createRefund;
  type paymentsRefundsV1Refund_universal_d_CreateRefundOptions = CreateRefundOptions;
  const paymentsRefundsV1Refund_universal_d_getRefund: typeof getRefund;
  const paymentsRefundsV1Refund_universal_d_queryRefunds: typeof queryRefunds;
  type paymentsRefundsV1Refund_universal_d_RefundsQueryResult = RefundsQueryResult;
  type paymentsRefundsV1Refund_universal_d_RefundsQueryBuilder = RefundsQueryBuilder;
  const paymentsRefundsV1Refund_universal_d_updateExtendedFields: typeof updateExtendedFields;
  type paymentsRefundsV1Refund_universal_d_UpdateExtendedFieldsOptions = UpdateExtendedFieldsOptions;
  const paymentsRefundsV1Refund_universal_d_getRefundability: typeof getRefundability;
  namespace paymentsRefundsV1Refund_universal_d {
    export {
      paymentsRefundsV1Refund_universal_d_Refund as Refund,
      ExtendedFields$1 as ExtendedFields,
      paymentsRefundsV1Refund_universal_d_Status as Status,
      paymentsRefundsV1Refund_universal_d_Initiator as Initiator,
      paymentsRefundsV1Refund_universal_d_StatusInfo as StatusInfo,
      paymentsRefundsV1Refund_universal_d_InternalSyncRefundRequest as InternalSyncRefundRequest,
      paymentsRefundsV1Refund_universal_d_InternalSyncRefundResponse as InternalSyncRefundResponse,
      paymentsRefundsV1Refund_universal_d_CreateRefundRequest as CreateRefundRequest,
      paymentsRefundsV1Refund_universal_d_CreateRefundResponse as CreateRefundResponse,
      paymentsRefundsV1Refund_universal_d_GetRefundRequest as GetRefundRequest,
      paymentsRefundsV1Refund_universal_d_GetRefundResponse as GetRefundResponse,
      paymentsRefundsV1Refund_universal_d_QueryRefundsRequest as QueryRefundsRequest,
      paymentsRefundsV1Refund_universal_d_CursorQuery as CursorQuery,
      paymentsRefundsV1Refund_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      paymentsRefundsV1Refund_universal_d_Sorting as Sorting,
      paymentsRefundsV1Refund_universal_d_SortOrder as SortOrder,
      CursorPaging$1 as CursorPaging,
      paymentsRefundsV1Refund_universal_d_QueryRefundsResponse as QueryRefundsResponse,
      CursorPagingMetadata$1 as CursorPagingMetadata,
      Cursors$1 as Cursors,
      paymentsRefundsV1Refund_universal_d_UpdateExtendedFieldsRequest as UpdateExtendedFieldsRequest,
      paymentsRefundsV1Refund_universal_d_UpdateExtendedFieldsResponse as UpdateExtendedFieldsResponse,
      paymentsRefundsV1Refund_universal_d_GetRefundabilityRequest as GetRefundabilityRequest,
      paymentsRefundsV1Refund_universal_d_GetRefundabilityResponse as GetRefundabilityResponse,
      paymentsRefundsV1Refund_universal_d_Refundability as Refundability,
      paymentsRefundsV1Refund_universal_d_RefundabilityDetailsOneOf as RefundabilityDetailsOneOf,
      paymentsRefundsV1Refund_universal_d_RefundOptions as RefundOptions,
      paymentsRefundsV1Refund_universal_d_Rejection as Rejection,
      paymentsRefundsV1Refund_universal_d_RejectionReason as RejectionReason,
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
      paymentsRefundsV1Refund_universal_d_createRefund as createRefund,
      paymentsRefundsV1Refund_universal_d_CreateRefundOptions as CreateRefundOptions,
      paymentsRefundsV1Refund_universal_d_getRefund as getRefund,
      paymentsRefundsV1Refund_universal_d_queryRefunds as queryRefunds,
      paymentsRefundsV1Refund_universal_d_RefundsQueryResult as RefundsQueryResult,
      paymentsRefundsV1Refund_universal_d_RefundsQueryBuilder as RefundsQueryBuilder,
      paymentsRefundsV1Refund_universal_d_updateExtendedFields as updateExtendedFields,
      paymentsRefundsV1Refund_universal_d_UpdateExtendedFieldsOptions as UpdateExtendedFieldsOptions,
      paymentsRefundsV1Refund_universal_d_getRefundability as getRefundability,
    };
  }
  
  interface SavedPaymentMethod {
      /**
       * Unique identifier of a saved payment method.
       * @readonly
       */
      _id?: string | null;
      /**
       * Represents the current state of a saved payment method. Each time saved payment method is modified, its `revision` changes. For an update operation to succeed, you MUST pass the latest revision.
       * @readonly
       */
      revision?: string | null;
      /**
       * SavedPaymentMethod creation time.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * SavedPaymentMethod last update time.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Saved payment method owner's member ID. */
      siteMemberId?: string | null;
      /**
       * Defines whether this payment method is primary for the member. Member can only have at most one primary saved payment method.
       * @readonly
       */
      primary?: boolean;
      /** Payment method details. */
      paymentMethod?: PaymentMethod;
      /**
       * Defines whether this payment method can be used by the merchant for making unscheduled payments.
       * Even if it's set to `false` payment method still can be used for scheduled payments e.g. subscription renewal without the buyer being present.
       */
      merchantUseAllowed?: boolean | null;
      /**
       * Saved payment method sensitive information.
       * @readonly
       */
      sensitiveInfo?: SensitiveInfo;
      /** Data Extensions */
      extendedFields?: ExtendedFields;
  }
  interface CardInfo {
      /**
       * Credit card's last 4 digits.
       * @readonly
       */
      lastFourDigits?: string | null;
      /**
       * Credit card's BIN (Bank Identification Number). It's first 4-6 digits of card's number.
       * @readonly
       */
      bin?: string | null;
      /** Credit card's expiration month. */
      expirationMonth?: number | null;
      /** Credit card's expiration year. */
      expirationYear?: number | null;
      /** Card holder's full name specified on the card. */
      cardholderName?: string | null;
      /**
       * INTERNAL* Card brand.
       * @internal
       * @readonly
       */
      brand?: CardBrand;
  }
  enum CardBrand {
      UNKNOWN_CARD_BRAND = "UNKNOWN_CARD_BRAND",
      AMEX = "AMEX",
      DANKORT = "DANKORT",
      DINERS = "DINERS",
      DISCOVER = "DISCOVER",
      ISRACARD = "ISRACARD",
      JCB = "JCB",
      MAESTRO = "MAESTRO",
      MASTERCARD = "MASTERCARD",
      UNIONPAY = "UNIONPAY",
      VISA = "VISA",
      RUPAY = "RUPAY"
  }
  interface PaymentMethod {
      /** Legacy payment method type ID. Supported values are `creditCard`, `payPal`. */
      typeId?: string;
      /**
       * Payment method type ID.
       * @readonly
       */
      paymentMethodTypeId?: string;
      /**
       * Payment method brand ID.
       * @readonly
       */
      paymentMethodBrandId?: string | null;
      /** Details of credit card. */
      cardInfo?: CardInfo;
  }
  interface SensitiveInfo {
      /** Sensitive details of credit card like card token. */
      cardSensitiveInfo?: CardSensitiveInfo;
  }
  interface CardSensitiveInfo {
      /** Persistent token of credit card tokenized by Wix. */
      persistentToken?: string | null;
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
  interface FindSavedCreditCardRequest {
      /** temporary card token */
      temporaryCardToken?: string;
      /** site member id */
      siteMemberId?: string;
      /** expiration month */
      expirationMonth?: number;
      /** expiration year */
      expirationYear?: number;
  }
  interface FindSavedCreditCardResponse {
      /** saved payment method id */
      savedPaymentMethodId?: string | null;
  }
  interface UpsertSavedPaymentMethodRequest {
      /** Saved payment method. */
      savedPaymentMethod: SavedPaymentMethod;
      /** Temporary token of credit card tokenized by Wix. This token is used to create a persistent token */
      temporaryCardToken: string | null;
  }
  interface UpsertSavedPaymentMethodResponse {
      /** Saved payment method. */
      savedPaymentMethod?: SavedPaymentMethod;
  }
  interface GetSavedPaymentMethodRequest {
      /** Unique identifier of a saved payment method. */
      savedPaymentMethodId: string;
      /**
       * List of heeded fields that will be returned.
       * You should have additional permission in order to get them as described in HidedFields documentation.
       */
      fields?: RequestedFields[];
  }
  enum RequestedFields {
      /** Default value. This value is unused. */
      UNKNOWN_REQUESTED_FIELD = "UNKNOWN_REQUESTED_FIELD",
      SENSITIVE_INFO = "SENSITIVE_INFO"
  }
  interface GetSavedPaymentMethodResponse {
      /** Saved payment method. */
      savedPaymentMethod?: SavedPaymentMethod;
  }
  interface DeleteSavedPaymentMethodRequest {
      /** Unique identifier of a saved payment method. */
      savedPaymentMethodId: string;
  }
  interface DeleteSavedPaymentMethodResponse {
  }
  interface ListSavedPaymentMethodsRequest {
      /**
       * Site member that owns saved payment methods.
       * Pass `me` to list saved payment method of the current site member.
       */
      siteMemberId?: string | null;
      /** Payment method type id. Supported values are `creditCard`, `payPal`. */
      paymentMethodTypeId?: string | null;
      /**
       * Defines whether this payment method can be used by the merchant for making unscheduled payments.
       * Even if it's set to `false` payment method still can be used for scheduled payments e.g. subscription renewal without the buyer being present.
       */
      merchantUseAllowed?: boolean | null;
      /**
       * List of requested fields that will be returned.
       * Supported values:
       * SENSITIVE_INFO - Sensitive information of a SavedPaymentMethod like credit card tokens that's needed to process payments with it.
       * In order to receive it you should have `PAYMENTS.SAVED_PAYMENT_METHOD_READ_SENSITIVE_INFO` permission
       */
      fields?: RequestedFields[];
      /**
       * Paging for limit the response size.
       * If no paging provider default response limit 100 will be used.
       */
      paging?: CursorPaging;
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
  interface ListSavedPaymentMethodsResponse {
      /** List of saved payment methods. */
      savedPaymentMethods?: SavedPaymentMethod[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata;
  }
  interface CursorPagingMetadata {
      /** Number of items returned in the response. */
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
  }
  interface Cursors {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface UpdateSavedPaymentMethodRequest {
      /** Saved payment method to update. */
      savedPaymentMethod?: SavedPaymentMethod;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateSavedPaymentMethodResponse {
      /** Updated saved payment method. */
      savedPaymentMethod?: SavedPaymentMethod;
  }
  interface MarkSavedPaymentMethodPrimaryRequest {
      /** Unique identifier of a saved payment method. */
      savedPaymentMethodId: string;
  }
  interface MarkSavedPaymentMethodPrimaryResponse {
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
   * Creates a new SavedPaymentMethod or updates existing one if SavedPaymentMethod already exists for the same site member.
   * To check uniqueness SavedPaymentMethods are compared by credit card expiration year/month, last four digits and bin.
   * If sensitiveInfo.cardSensitiveInfo.temporaryToken was passed than service will eventually create a persi from it.
   * @param savedPaymentMethod - Saved payment method.
   * @public
   * @documentationMaturity preview
   * @requiredField options
   * @requiredField options.temporaryCardToken
   * @requiredField savedPaymentMethod
   * @requiredField savedPaymentMethod.paymentMethod
   * @requiredField savedPaymentMethod.paymentMethod.cardInfo.expirationMonth
   * @requiredField savedPaymentMethod.paymentMethod.cardInfo.expirationYear
   * @requiredField savedPaymentMethod.paymentMethod.typeId
   * @permissionId PAYMENTS.SAVED_PAYMENT_METHOD_UPSERT
   * @permissionId PAYMENTS.SAVED_PAYMENT_METHOD_UPSERT_WITH_MEMBER_ID
   * @adminMethod
   */
  function upsertSavedPaymentMethod(savedPaymentMethod: SavedPaymentMethod, options: UpsertSavedPaymentMethodOptions): Promise<UpsertSavedPaymentMethodResponse>;
  interface UpsertSavedPaymentMethodOptions {
      /** Temporary token of credit card tokenized by Wix. This token is used to create a persistent token */
      temporaryCardToken: string | null;
  }
  /**
   * Returns SavedPaymentMethod by ID.
   * @param savedPaymentMethodId - Unique identifier of a saved payment method.
   * @public
   * @documentationMaturity preview
   * @requiredField savedPaymentMethodId
   * @permissionId PAYMENTS.SAVED_PAYMENT_METHOD_READ
   * @permissionId PAYMENTS.SAVED_PAYMENT_METHOD_READ_SENSITIVE_INFO
   * @adminMethod
   * @returns Saved payment method.
   */
  function getSavedPaymentMethod(savedPaymentMethodId: string, options?: GetSavedPaymentMethodOptions): Promise<SavedPaymentMethod>;
  interface GetSavedPaymentMethodOptions {
      /**
       * List of heeded fields that will be returned.
       * You should have additional permission in order to get them as described in HidedFields documentation.
       */
      fields?: RequestedFields[];
  }
  /**
   * Deletes SavedPaymentMethod by ID.
   * @param savedPaymentMethodId - Unique identifier of a saved payment method.
   * @public
   * @documentationMaturity preview
   * @requiredField savedPaymentMethodId
   * @permissionId PAYMENTS.SAVED_PAYMENT_METHOD_DELETE
   * @adminMethod
   */
  function deleteSavedPaymentMethod(savedPaymentMethodId: string): Promise<void>;
  /**
   * Lists SavedPaymentMethods ordered by update date descending.
   * @public
   * @documentationMaturity preview
   * @permissionId PAYMENTS.SAVED_PAYMENT_METHOD_READ
   * @permissionId PAYMENTS.SAVED_PAYMENT_METHOD_READ_SENSITIVE_INFO
   * @adminMethod
   */
  function listSavedPaymentMethods(options?: ListSavedPaymentMethodsOptions): Promise<ListSavedPaymentMethodsResponse>;
  interface ListSavedPaymentMethodsOptions {
      /**
       * Site member that owns saved payment methods.
       * Pass `me` to list saved payment method of the current site member.
       */
      siteMemberId?: string | null;
      /** Payment method type id. Supported values are `creditCard`, `payPal`. */
      paymentMethodTypeId?: string | null;
      /**
       * Defines whether this payment method can be used by the merchant for making unscheduled payments.
       * Even if it's set to `false` payment method still can be used for scheduled payments e.g. subscription renewal without the buyer being present.
       */
      merchantUseAllowed?: boolean | null;
      /**
       * List of requested fields that will be returned.
       * Supported values:
       * SENSITIVE_INFO - Sensitive information of a SavedPaymentMethod like credit card tokens that's needed to process payments with it.
       * In order to receive it you should have `PAYMENTS.SAVED_PAYMENT_METHOD_READ_SENSITIVE_INFO` permission
       */
      fields?: RequestedFields[];
      /**
       * Paging for limit the response size.
       * If no paging provider default response limit 100 will be used.
       */
      paging?: CursorPaging;
  }
  /**
   * Updates SavedPaymentMethod. Only fields listed in field_mask are updated.
   * @param _id - Unique identifier of a saved payment method.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField options.savedPaymentMethod.revision
   * @permissionId PAYMENTS.SAVED_PAYMENT_METHOD_UPDATE
   * @adminMethod
   * @returns Updated saved payment method.
   */
  function updateSavedPaymentMethod(_id: string | null, options?: UpdateSavedPaymentMethodOptions): Promise<SavedPaymentMethod>;
  interface UpdateSavedPaymentMethodOptions {
      savedPaymentMethod: {
          /**
           * Unique identifier of a saved payment method.
           * @readonly
           */
          _id?: string | null;
          /**
           * Represents the current state of a saved payment method. Each time saved payment method is modified, its `revision` changes. For an update operation to succeed, you MUST pass the latest revision.
           * @readonly
           */
          revision?: string | null;
          /**
           * SavedPaymentMethod creation time.
           * @readonly
           */
          _createdDate?: Date | null;
          /**
           * SavedPaymentMethod last update time.
           * @readonly
           */
          _updatedDate?: Date | null;
          /** Saved payment method owner's member ID. */
          siteMemberId?: string | null;
          /**
           * Defines whether this payment method is primary for the member. Member can only have at most one primary saved payment method.
           * @readonly
           */
          primary?: boolean;
          /** Payment method details. */
          paymentMethod?: PaymentMethod;
          /**
           * Defines whether this payment method can be used by the merchant for making unscheduled payments.
           * Even if it's set to `false` payment method still can be used for scheduled payments e.g. subscription renewal without the buyer being present.
           */
          merchantUseAllowed?: boolean | null;
          /**
           * Saved payment method sensitive information.
           * @readonly
           */
          sensitiveInfo?: SensitiveInfo;
          /** Data Extensions */
          extendedFields?: ExtendedFields;
      };
      /**
       * Explicit list of fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Marks SavedPaymentMethod as primary for site member who's the owner of this SavedPaymentMethod.
   * Primary SavedPaymentMethod is selected by default during the checkout.
   * For every site member there can be at most one primary SavedPaymentMethod,
   * so when one SavedPaymentMethod is marked as primary previous one is automatically unmarked.
   * @param savedPaymentMethodId - Unique identifier of a saved payment method.
   * @public
   * @documentationMaturity preview
   * @requiredField savedPaymentMethodId
   * @permissionId PAYMENTS.SAVED_PAYMENT_METHOD_MARK_PRIMARY
   * @adminMethod
   */
  function markSavedPaymentMethodPrimary(savedPaymentMethodId: string): Promise<void>;
  
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_SavedPaymentMethod = SavedPaymentMethod;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_CardInfo = CardInfo;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_CardBrand = CardBrand;
  const paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_CardBrand: typeof CardBrand;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_PaymentMethod = PaymentMethod;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_SensitiveInfo = SensitiveInfo;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_CardSensitiveInfo = CardSensitiveInfo;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_ExtendedFields = ExtendedFields;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_FindSavedCreditCardRequest = FindSavedCreditCardRequest;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_FindSavedCreditCardResponse = FindSavedCreditCardResponse;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_UpsertSavedPaymentMethodRequest = UpsertSavedPaymentMethodRequest;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_UpsertSavedPaymentMethodResponse = UpsertSavedPaymentMethodResponse;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_GetSavedPaymentMethodRequest = GetSavedPaymentMethodRequest;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_RequestedFields = RequestedFields;
  const paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_RequestedFields: typeof RequestedFields;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_GetSavedPaymentMethodResponse = GetSavedPaymentMethodResponse;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_DeleteSavedPaymentMethodRequest = DeleteSavedPaymentMethodRequest;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_DeleteSavedPaymentMethodResponse = DeleteSavedPaymentMethodResponse;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_ListSavedPaymentMethodsRequest = ListSavedPaymentMethodsRequest;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_CursorPaging = CursorPaging;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_ListSavedPaymentMethodsResponse = ListSavedPaymentMethodsResponse;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_Cursors = Cursors;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_UpdateSavedPaymentMethodRequest = UpdateSavedPaymentMethodRequest;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_UpdateSavedPaymentMethodResponse = UpdateSavedPaymentMethodResponse;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_MarkSavedPaymentMethodPrimaryRequest = MarkSavedPaymentMethodPrimaryRequest;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_MarkSavedPaymentMethodPrimaryResponse = MarkSavedPaymentMethodPrimaryResponse;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_DomainEvent = DomainEvent;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_RestoreInfo = RestoreInfo;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_ActionEvent = ActionEvent;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_MessageEnvelope = MessageEnvelope;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_IdentificationData = IdentificationData;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_WebhookIdentityType = WebhookIdentityType;
  const paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_upsertSavedPaymentMethod: typeof upsertSavedPaymentMethod;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_UpsertSavedPaymentMethodOptions = UpsertSavedPaymentMethodOptions;
  const paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_getSavedPaymentMethod: typeof getSavedPaymentMethod;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_GetSavedPaymentMethodOptions = GetSavedPaymentMethodOptions;
  const paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_deleteSavedPaymentMethod: typeof deleteSavedPaymentMethod;
  const paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_listSavedPaymentMethods: typeof listSavedPaymentMethods;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_ListSavedPaymentMethodsOptions = ListSavedPaymentMethodsOptions;
  const paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_updateSavedPaymentMethod: typeof updateSavedPaymentMethod;
  type paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_UpdateSavedPaymentMethodOptions = UpdateSavedPaymentMethodOptions;
  const paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_markSavedPaymentMethodPrimary: typeof markSavedPaymentMethodPrimary;
  namespace paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d {
    export {
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_SavedPaymentMethod as SavedPaymentMethod,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_CardInfo as CardInfo,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_CardBrand as CardBrand,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_PaymentMethod as PaymentMethod,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_SensitiveInfo as SensitiveInfo,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_CardSensitiveInfo as CardSensitiveInfo,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_ExtendedFields as ExtendedFields,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_FindSavedCreditCardRequest as FindSavedCreditCardRequest,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_FindSavedCreditCardResponse as FindSavedCreditCardResponse,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_UpsertSavedPaymentMethodRequest as UpsertSavedPaymentMethodRequest,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_UpsertSavedPaymentMethodResponse as UpsertSavedPaymentMethodResponse,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_GetSavedPaymentMethodRequest as GetSavedPaymentMethodRequest,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_RequestedFields as RequestedFields,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_GetSavedPaymentMethodResponse as GetSavedPaymentMethodResponse,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_DeleteSavedPaymentMethodRequest as DeleteSavedPaymentMethodRequest,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_DeleteSavedPaymentMethodResponse as DeleteSavedPaymentMethodResponse,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_ListSavedPaymentMethodsRequest as ListSavedPaymentMethodsRequest,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_CursorPaging as CursorPaging,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_ListSavedPaymentMethodsResponse as ListSavedPaymentMethodsResponse,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_Cursors as Cursors,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_UpdateSavedPaymentMethodRequest as UpdateSavedPaymentMethodRequest,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_UpdateSavedPaymentMethodResponse as UpdateSavedPaymentMethodResponse,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_MarkSavedPaymentMethodPrimaryRequest as MarkSavedPaymentMethodPrimaryRequest,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_MarkSavedPaymentMethodPrimaryResponse as MarkSavedPaymentMethodPrimaryResponse,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_DomainEvent as DomainEvent,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_RestoreInfo as RestoreInfo,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_ActionEvent as ActionEvent,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_MessageEnvelope as MessageEnvelope,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_IdentificationData as IdentificationData,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_WebhookIdentityType as WebhookIdentityType,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_upsertSavedPaymentMethod as upsertSavedPaymentMethod,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_UpsertSavedPaymentMethodOptions as UpsertSavedPaymentMethodOptions,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_getSavedPaymentMethod as getSavedPaymentMethod,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_GetSavedPaymentMethodOptions as GetSavedPaymentMethodOptions,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_deleteSavedPaymentMethod as deleteSavedPaymentMethod,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_listSavedPaymentMethods as listSavedPaymentMethods,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_ListSavedPaymentMethodsOptions as ListSavedPaymentMethodsOptions,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_updateSavedPaymentMethod as updateSavedPaymentMethod,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_UpdateSavedPaymentMethodOptions as UpdateSavedPaymentMethodOptions,
      paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d_markSavedPaymentMethodPrimary as markSavedPaymentMethodPrimary,
    };
  }
  
  /** A way to pay online or offline for goods or services offered by a specific site. */
  interface SitePaymentMethodType {
      /** ID */
      _id?: string;
      /**
       * Id the payment method type used to have in our system. It is used in provider spi communication.
       * For some payment method types it is human readable i.e. payPal, creditCard, bit etc.
       * For others i.e. hosted pages, it is GUID
       */
      legacyId?: string | null;
      /** localized according to the caller locale */
      displayName?: string | null;
      /** localized according to the caller locale */
      description?: string | null;
      /** features supported for this payment method type */
      features?: Features;
      /** the configuration for the merchant flow i.e. accept payments */
      merchantFlow?: MerchantFlow;
      /** the configuration for the buyer flow i.e. checkout */
      buyerFlow?: BuyerFlow;
      /**
       * indicates that this entity is for the payment brand representation only
       * payment brands are not visible in payment method type search
       * and are used only for supported brands indication for the payment method type
       */
      brandOnly?: boolean;
      /**
       * indicates that this payment method type comes from Velo integration
       * @internal
       */
      velo?: boolean;
      /**
       * Indicates that payment method type can be used to pay only in person. Like current payment method type cash, pos, cardReader and posCash
       * PSP type of payment method type can not be used in person
       */
      inPerson?: boolean;
      /** The duration after which the transaction will be marked as expired */
      transactionExpirationDelayInSeconds?: number | null;
  }
  interface Features {
      /** indicates that this payment method type can be used in express flow */
      expressFlow?: ExpressFlow;
      /** indicates that this payment method type can be used in regular flow */
      regularFlow?: RegularFlow;
      /** indicates that disputes are supported for this payment method type */
      disputes?: Disputes;
      /** indicates that installments are supported for this payment method type */
      installments?: Installments;
      /** indicates that refunds are supported for this payment method type */
      refunds?: Refunds;
      /** indicates that auth capture flow is supported for this payment method type */
      authCapture?: AuthCapture;
      /** indicates that the regular (Wix) tokenization mechanism can be configured for this payment method type */
      regularTokenization?: RegularTokenization;
      /** indicates that the custom (provider specific etc.) tokenization mechanism can be configured for this payment method type */
      customTokenization?: CustomTokenization;
      /** indicates that the next action mechanism can be configured for this payment method type */
      nextAction?: NextAction;
      /** indicates that the credential on file feature is supported for this payment method type */
      credentialOnFile?: CredentialOnFile;
      /** indicates that Mail Order/Telephone Order is supported for this payment method type */
      moto?: Moto;
      /** indicates that promotional messages are supported for this payment method type */
      promotionalMessages?: PromotionalMessages;
  }
  interface IFrame {
      /** supported */
      supported?: boolean;
  }
  interface NewTab {
      /** supported */
      supported?: boolean;
  }
  interface FullPageRedirect {
      /** supported */
      supported?: boolean;
  }
  interface Barcode {
      /** supported */
      supported?: boolean;
  }
  interface QrCode {
      /** supported */
      supported?: boolean;
  }
  interface ExpressFlow {
      /** supported */
      supported?: boolean;
  }
  interface RegularFlow {
      /** supported */
      supported?: boolean;
  }
  interface Disputes {
      /** supported */
      supported?: boolean;
  }
  interface Installments {
      /**
       * supported
       * if value is true property max_installment_limit is required otherwise it should be ignored
       */
      supported?: boolean;
      /** countries for which installments can be enabled */
      allowedCountries?: string[];
      /** max number of installments that can be configured by provider */
      maxInstallmentLimit?: number | null;
  }
  interface Refunds {
      /**
       * supported
       * if value is true property max_refundability_period_in_days is required otherwise it should be ignored
       */
      supported?: boolean;
      /** refundability period */
      maxRefundabilityPeriodInDays?: number | null;
  }
  interface AuthCapture {
      /**
       * supported
       * if value is true property max_capture_period_in_days is required otherwise it should be ignored
       */
      supported?: boolean;
      /** capture period */
      maxCapturePeriodInDays?: number | null;
  }
  interface RegularTokenization {
      /** supported */
      supported?: boolean;
  }
  interface CustomTokenization {
      /** supported */
      supported?: boolean;
  }
  interface NextAction {
      /** show next payment action in iframe */
      iframe?: IFrame;
      /** show next payment action in the new tab */
      newTab?: NewTab;
      /** show next payment action as the full page redirect */
      fullPageRedirect?: FullPageRedirect;
      /** show next payment action as barcode scan */
      barcode?: Barcode;
      /** show next payment action as QR code scan */
      qrCode?: QrCode;
  }
  interface CredentialOnFile {
      /** supported */
      supported?: boolean;
  }
  interface Moto {
      /** supported */
      supported?: boolean;
  }
  interface PromotionalMessages {
      /** supported */
      supported?: boolean;
  }
  interface MerchantFlow {
      /** icons for the accept payments according to the caller locale */
      icons?: Icon[];
      /**
       * This field corresponds to the relative order of payment type for the merchant
       * an item with less field value has higher priority than an item with greater field value
       */
      priority?: number;
      /** indicates whether the payment method type is promoted */
      promoted?: boolean;
      /**
       * Indicates that the merchant cannot manage it. examples: cash. it is created by default.
       * there is also the case of the pm's created by verticals for their needs.
       * eventually we want to remove such a possibility
       * The payment method types which are not displayed to the merchant on accept payments page. It means that merchant cannot intentionally connect this payment method type.
       * This flag cannot be true for psp_managed payment method types.
       */
      hidden?: boolean;
  }
  /**
   * Example url:
   * http://images-wixmp-6613fa290e8c1ac70a0297b6.wixmp.com/payment-methods/{domain}/{extension}/{id}.{extension}
   */
  interface Icon {
      /** WixMedia object with the id and url of the icon */
      image?: string;
      /**
       * clients can attach multiple icons and assign custom tag to them
       * in order to use them in specific flows
       */
      tag?: string | null;
      /** image extension */
      format?: Format;
  }
  enum Format {
      UNKNOWN_FORMAT = "UNKNOWN_FORMAT",
      SVG = "SVG",
      PNG = "PNG"
  }
  interface BuyerFlow {
      /** icons for the checkout according to the caller locale */
      icons?: Icon[];
      /**
       * This field corresponds to the relative order of payment type for the buyer
       * an item with less field value has higher priority than an item with greater field value
       */
      priority?: number;
      /**
       * For buyer flow, indicates that the method is not displayed to buyer on checkout page.
       * This property is required for payment method types like POS or Tap to Pay.
       */
      hidden?: boolean;
  }
  interface GetSitePaymentMethodTypeRequest {
      /** SitePaymentMethodType ID */
      sitePaymentMethodTypeId: string;
      /** If provided - explicitly indicates the language, for which the data should be localized. */
      language?: string | null;
      /**
       * Indicates the country in the context of which the data should be returned.
       * There are the country-specific properties as well as the localization mechanism involves country.
       */
      country?: string | null;
  }
  interface GetSitePaymentMethodTypeResponse {
      /** The requested SitePaymentMethodType. */
      sitePaymentMethodType?: SitePaymentMethodType;
  }
  interface ListSitePaymentMethodTypesRequest {
      /**
       * Return only the records having their `id` or `legacyId` matching any of the IDs passed.
       * If not provided, all records are returned.
       */
      ids?: string[];
      /** If provided - explicitly indicates the language, for which the data should be localized. */
      language?: string | null;
      /**
       * Indicates the country in the context of which the data should be returned.
       * There are the country-specific properties as well as the localization mechanism involves country.
       */
      country?: string | null;
  }
  interface ListSitePaymentMethodTypesResponse {
      /** List of SitePaymentMethodTypes. */
      sitePaymentMethodTypes?: SitePaymentMethodType[];
  }
  /**
   * Retrieves a SitePaymentMethodType.
   * @param sitePaymentMethodTypeId - SitePaymentMethodType ID
   * @internal
   * @documentationMaturity preview
   * @requiredField sitePaymentMethodTypeId
   * @permissionId PAYMENTS.SITE_PAYMENT_METHOD_TYPE_READ
   * @returns The requested SitePaymentMethodType.
   */
  function getSitePaymentMethodType(sitePaymentMethodTypeId: string, options?: GetSitePaymentMethodTypeOptions): Promise<SitePaymentMethodType>;
  interface GetSitePaymentMethodTypeOptions {
      /** If provided - explicitly indicates the language, for which the data should be localized. */
      language?: string | null;
      /**
       * Indicates the country in the context of which the data should be returned.
       * There are the country-specific properties as well as the localization mechanism involves country.
       */
      country?: string | null;
  }
  /**
   * Retrieves a list of SitePaymentMethodTypes. Never returns more than 200 records.
   * @internal
   * @documentationMaturity preview
   * @permissionId PAYMENTS.SITE_PAYMENT_METHOD_TYPE_READ
   */
  function listSitePaymentMethodTypes(options?: ListSitePaymentMethodTypesOptions): Promise<ListSitePaymentMethodTypesResponse>;
  interface ListSitePaymentMethodTypesOptions {
      /**
       * Return only the records having their `id` or `legacyId` matching any of the IDs passed.
       * If not provided, all records are returned.
       */
      ids?: string[];
      /** If provided - explicitly indicates the language, for which the data should be localized. */
      language?: string | null;
      /**
       * Indicates the country in the context of which the data should be returned.
       * There are the country-specific properties as well as the localization mechanism involves country.
       */
      country?: string | null;
  }
  
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_SitePaymentMethodType = SitePaymentMethodType;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Features = Features;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_IFrame = IFrame;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_NewTab = NewTab;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_FullPageRedirect = FullPageRedirect;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Barcode = Barcode;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_QrCode = QrCode;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_ExpressFlow = ExpressFlow;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_RegularFlow = RegularFlow;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Disputes = Disputes;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Installments = Installments;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Refunds = Refunds;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_AuthCapture = AuthCapture;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_RegularTokenization = RegularTokenization;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_CustomTokenization = CustomTokenization;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_NextAction = NextAction;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_CredentialOnFile = CredentialOnFile;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Moto = Moto;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_PromotionalMessages = PromotionalMessages;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_MerchantFlow = MerchantFlow;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Icon = Icon;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Format = Format;
  const paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Format: typeof Format;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_BuyerFlow = BuyerFlow;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_GetSitePaymentMethodTypeRequest = GetSitePaymentMethodTypeRequest;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_GetSitePaymentMethodTypeResponse = GetSitePaymentMethodTypeResponse;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_ListSitePaymentMethodTypesRequest = ListSitePaymentMethodTypesRequest;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_ListSitePaymentMethodTypesResponse = ListSitePaymentMethodTypesResponse;
  const paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_getSitePaymentMethodType: typeof getSitePaymentMethodType;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_GetSitePaymentMethodTypeOptions = GetSitePaymentMethodTypeOptions;
  const paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_listSitePaymentMethodTypes: typeof listSitePaymentMethodTypes;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_ListSitePaymentMethodTypesOptions = ListSitePaymentMethodTypesOptions;
  namespace paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d {
    export {
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_SitePaymentMethodType as SitePaymentMethodType,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Features as Features,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_IFrame as IFrame,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_NewTab as NewTab,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_FullPageRedirect as FullPageRedirect,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Barcode as Barcode,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_QrCode as QrCode,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_ExpressFlow as ExpressFlow,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_RegularFlow as RegularFlow,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Disputes as Disputes,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Installments as Installments,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Refunds as Refunds,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_AuthCapture as AuthCapture,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_RegularTokenization as RegularTokenization,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_CustomTokenization as CustomTokenization,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_NextAction as NextAction,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_CredentialOnFile as CredentialOnFile,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Moto as Moto,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_PromotionalMessages as PromotionalMessages,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_MerchantFlow as MerchantFlow,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Icon as Icon,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Format as Format,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_BuyerFlow as BuyerFlow,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_GetSitePaymentMethodTypeRequest as GetSitePaymentMethodTypeRequest,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_GetSitePaymentMethodTypeResponse as GetSitePaymentMethodTypeResponse,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_ListSitePaymentMethodTypesRequest as ListSitePaymentMethodTypesRequest,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_ListSitePaymentMethodTypesResponse as ListSitePaymentMethodTypesResponse,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_getSitePaymentMethodType as getSitePaymentMethodType,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_GetSitePaymentMethodTypeOptions as GetSitePaymentMethodTypeOptions,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_listSitePaymentMethodTypes as listSitePaymentMethodTypes,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_ListSitePaymentMethodTypesOptions as ListSitePaymentMethodTypesOptions,
    };
  }
  
  export { paymentsChargesV1Charge_universal_d as charges, cashierOnboardingAvailabilityV1OnboardingAvailability_universal_d as onboardingAvailability, paymentsPspV1ProviderPlatformEvent_universal_d as pspCallbacks, paymentsRefundsV1Refund_universal_d as refunds, paymentsSavedPaymentMethodsV1SavedPaymentMethod_universal_d as savedPaymentMethods, paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d as sitePaymentMethodTypes };
}
