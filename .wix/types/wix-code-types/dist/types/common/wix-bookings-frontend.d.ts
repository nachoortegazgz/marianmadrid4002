/**
 * The wix-bookings-frontend module contains functionality for working with
 *  bookings from client-side code.
 * 	[Read more](https://www.wix.com/corvid/reference/wix-bookings-frontend.html#)
 */
declare module 'wix-bookings-frontend' {
    /**
     * **Deprecated.**
     * Checkout Booking has been replaced with [Create Booking](https://dev.wix.com/docs/sdk/backend-modules/bookings/bookings/create-booking) and Wix eCommerce's [Create Checkout](https://dev.wix.com/docs/sdk/backend-modules/ecom/checkout/create-checkout) SDK methods and will be removed on March 31, 2026.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-bookings-frontend.html#checkoutBooking)
     */
    function checkoutBooking(bookingInfo: BookingInfo, options?: PaymentOptions): Promise<BookingResult>;
    /**
     * **Deprecated.**
     * Get Checkout Options will be removed on March 31, 2026. By default, no replacement is needed as the eCommerce purchase flow handles payment options automatically. However, [eCommerce SDK APIs](https://dev.wix.com/docs/sdk/backend-modules/ecom/introduction) are available for custom payment flow implementations. See the [End-to-End Booking Flows](https://dev.wix.com/docs/sdk/backend-modules/bookings/end-to-end-booking-flows) for complete implementation examples.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-bookings-frontend.html#getCheckoutOptions)
     */
    function getCheckoutOptions(checkoutOptionOptions: CheckoutOptionOptions): Promise<CheckoutMethod>;
    /**
     * **Deprecated.**
     * Get Service Availability has been replaced with [Time Slots](https://dev.wix.com/docs/sdk/backend-modules/bookings/time-slots/introduction) SDK methods and will be removed on March 31, 2026. Depending on your [service type](https://dev.wix.com/docs/sdk/backend-modules/bookings/services/about-service-types), use the appropriate Time Slots API to replace it. See the [End-to-End Booking Flows](https://dev.wix.com/docs/sdk/backend-modules/bookings/end-to-end-booking-flows) for implementation examples.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-bookings-frontend.html#getServiceAvailability)
     */
    function getServiceAvailability(serviceId: string, options?: AvailabilityOptions): Promise<ServiceAvailability>;
    /**
     * An object that contains address information.
     */
    type Address = {
        /**
         * Full text address comprised of street name and number, city, subdivision, country, and postal code.
         */
        formatted: string;
        /**
         * Address coordinates.
         */
        location: AddressCoordinates;
        /**
         * Address street address.
         */
        streetAddress: StreetAddress;
        /**
         * Address city.
         */
        city: string;
        /**
         * Address subdivision, state, prefecture, or province.
         */
        subdivision: string;
        /**
         * Address country.
         */
        country: string;
        /**
         * Address postal code.
         */
        postalCode: string;
    };
    /**
     * An object that contains the geographic coordinates of the address.
     */
    type AddressCoordinates = {
        /**
         * Address latitude.
         */
        latitude: number;
        /**
         * Address longitude.
         */
        longitude: number;
    };
    /**
     * An object used when calling getServiceAvailability() ([SDK](https://dev.wix.com/docs/sdk/frontend-modules/bookings/get-service-availability) | [Velo](https://dev.wix.com/docs/velo/apis/wix-bookings-frontend/get-service-availability))
     *  containing options for which slots should be returned.
     */
    type AvailabilityOptions = {
        /**
         * Start date and time of the slots
         *  to be returned. Defaults to the current date and time.
         */
        startDateTime?: Date;
        /**
         * End date and time of the slots to
         *  be returned. Defaults to one week from `startDateTime`, which is one week
         *  from the current date and time if `startDateTime` is also omitted.
         */
        endDateTime?: Date;
    };
    /**
     * An object used when calling checkoutBooking() ([SDK](https://dev.wix.com/docs/sdk/frontend-modules/bookings/checkout-booking) | [Velo](https://dev.wix.com/docs/velo/apis/wix-bookings-frontend/checkout-booking))
     *  containing information about the slot to be booked.
     */
    type BookingInfo = {
        /**
         * The slot to be booked.
         */
        slot: Slot;
        /**
         * List of form field values required to book the session.
         */
        formFields: FormField[];
        /**
         * Number of spots to book.  Default: `1`
         */
        numberOfSpots?: number;
    };
    /**
     * An object representing the result of a call to checkoutBooking() ([SDK](https://dev.wix.com/docs/sdk/frontend-modules/bookings/checkout-booking) | [Velo](https://dev.wix.com/docs/velo/apis/wix-bookings-frontend/checkout-booking)).
     */
    type BookingResult = {
        /**
         * ID of the booking that was checked out.
         */
        bookingId: string;
        /**
         * Status of the booking that was checked out.
         *  One of:
         *
         *  + `"Confirmed"`: Payment was successful or payment is to be done offline.
         *  + `"Pending Payment"`: Payment is pending.
         *  + `"Terminated"`: Payment failed or was cancelled.
         */
        status: string;
    };
    /**
     * An object describing the business location.
     */
    type BusinessLocation = {
        /**
         * Business location ID.
         */
        id: string;
        /**
         * Business location name.
         */
        name: string;
        /**
         * Business location description.
         */
        description: string;
        /**
         * An object describing the address.
         */
        address: Address;
    };
    /**
     * An object returned after calling getCheckoutOptions() ([SDK](https://dev.wix.com/docs/sdk/frontend-modules/bookings/get-checkout-options) | [Velo](https://dev.wix.com/docs/velo/apis/wix-bookings-frontend/get-checkout-options))
     *  containing information about the available payment options for the service and the logged-in user.
     */
    type CheckoutMethod = {
        /**
         * Available checkout methods.
         */
        options: CheckoutMethodOption[];
    };
    /**
     * An object returned after calling getCheckoutOptions() ([SDK](https://dev.wix.com/docs/sdk/frontend-modules/bookings/get-checkout-options) | [Velo](https://dev.wix.com/docs/velo/apis/wix-bookings-frontend/get-checkout-options))
     *  containing information about the available payment options for the service and the logged-in user.
     */
    type CheckoutMethodOption = {
        /**
         * Type of the available payment option. Valid options are:
         *
         *  + `"wixPay_Online"`: For online collections.
         *  + `"wixPay_Offline"`: For offline collections.
         *  + `"package"`: For a package-type pricing plan.
         *  + `"membership"`: For a membership-type pricing plan.
         */
        type: string;
        /**
         * Name of the plan package or membership. For booking with pricing plans only.
         */
        planName?: string;
        /**
         * Order ID of the plan package or membership. For booking with pricing plans only.
         */
        planOrderId?: string;
        /**
         * ID of the benefit provided by the plan package. For booking with package-type pricing plans only.
         */
        benefitId?: string;
        /**
         * Number of sessions remaining in the plan package. For booking with package-type pricing plans only.
         */
        remainingCredits?: number;
        /**
         * Number of sessions initially provided with the plan package.  For booking with package-type pricing plans only.
         */
        totalCredits?: number;
        /**
         * Date by which the plan package or membership expires. For booking with pricing plans only.
         */
        planExpiration?: Date;
    };
    /**
     * An object used to request checkout options for the service. Currently, you can request the checkout options using the ID of a slot.
     */
    type CheckoutOptionOptions = {
        /**
         * Unique slot identifier.
         */
        slotId: string;
        /**
         * Member ID ([SDK](https://dev.wix.com/docs/sdk/frontend-modules/members/introduction) | [Velo](https://dev.wix.com/docs/velo/apis/wix-members-v2/members/introduction)) for the customer making the booking. Used for retrieving valid payment plans for the customer for the selected slot.
         */
        userId: string;
    };
    /**
     * An object that defines a booking window for limiting when a member can book a slot. For example,
     *  you can prevent members from booking a service too far in advance, because perhaps the service might
     *  be discontinued by then. Or, you can prevent members from booking a service right before it starts, as
     *  this would make it hard to schedule resources.
     */
    type Constraints = {
        /**
         * Date from which a member is allowed to book a slot.
         */
        bookableFrom: Date;
        /**
         * Date until which a member is allowed to book a slot.
         */
        bookableUntil: Date;
    };
    /**
     * An object used when calling checkoutBooking() ([SDK](https://dev.wix.com/docs/sdk/frontend-modules/bookings/checkout-booking) | [Velo](https://dev.wix.com/docs/velo/apis/wix-bookings-frontend/checkout-booking))
     *  containing values for form fields required to book the session.
     */
    type FormField = {
        /**
         * ID of the form field from the **form** property in the **Booking/Services** collection.
         */
        _id: string;
        /**
         * Form field value.
         */
        value: string;
    };
    /**
     * The location where a service is offered.
     */
    type Location = {
        /**
         * Location type. Valid options are:
         * - `"OWNER_BUSINESS"`: The business address set by the merchant. This type is set when choosing **Business Address** in the Service Details page of a site's dashboard, and populates the `businessLocation` object.
         * - `"OWNER_CUSTOM"`: A custom address set by the merchant. This type is set when choosing **Custom Location** in the Service Details page of a site's dashboard, and populates the `locationText` property.
         * - `"CUSTOM"`: An address set for the individual booking, usually chosen by the customer and entered in the booking form.
         */
        type: string;
        /**
         * Text describing the location.
         */
        locationText: string;
        /**
         * An object describing the business location.
         */
        businessLocation: BusinessLocation;
    };
    /**
     * An object used when calling checkoutBooking() ([SDK](https://dev.wix.com/docs/sdk/frontend-modules/bookings/checkout-booking) | [Velo](https://dev.wix.com/docs/velo/apis/wix-bookings-frontend/checkout-booking))
     *  containing details about the pricing plan used to pay for the booking.
     */
    type PaidPlan = {
        /**
         * Order ID of the plan package or membership. For booking with pricing plans only.
         */
        planOrderId?: string;
        /**
         * ID of the benefit provided by the plan package. For booking with package-type pricing plans only.
         */
        benefitId?: string;
    };
    /**
     * An object used when calling checkoutBooking() ([SDK](https://dev.wix.com/docs/sdk/frontend-modules/bookings/checkout-booking) | [Velo](https://dev.wix.com/docs/velo/apis/wix-bookings-frontend/checkout-booking))
     *  containing information about the payment options.
     */
    type PaymentOptions = {
        /**
         * Type of payment. Valid options are:
         *
         *   + `"wixPay_Online"`: For online collections.
         *   + `"wixPay_Offline"`: For offline collections.
         *   + `"package"`: For a package-type pricing plan.
         *   + `"membership"`: For a membership-type pricing plan.
         */
        paymentType: string;
        /**
         * A coupon code to be used with the payment.
         */
        couponCode?: string;
        /**
         * Information about the pricing plan used to pay for the booking.
         */
        paidPlan?: PaidPlan;
    };
    /**
     * An object returned from [`getServiceAvailability()`](#getServiceAvailability)
     *  containing the available bookings slots.
     */
    type ServiceAvailability = {
        /**
         * List of the available slots.
         *
         * Max: 500 slots
         */
        slots: Slot[];
    };
    /**
     * An object representing a booking slot.
     */
    type Slot = {
        /**
         * Unique slot identifier.
         */
        _id: string;
        /**
         * Starting date and time of the slot.
         */
        startDateTime: Date;
        /**
         * Ending date and time of the slot.
         */
        endDateTime: Date;
        /**
         * ID of the service that the slot belongs to.
         */
        serviceId: string;
        /**
         * Maximum number of participants that can book the service for this slot.
         */
        capacity: number;
        /**
         * Number of remaining spots that can be booked for the slot.
         */
        remainingSpots: number;
        /**
         * ID of the slot's staff member.
         */
        staffMemberId: string;
        /**
         * The location where this slot is offered.
         */
        location: Location;
        /**
         * Whether the slot can be booked right now, meaning today's date is within the booking window defined by `constraints`. Not available for courses.
         */
        bookable: boolean;
        /**
         * The dates between which the slot can be booked. The constraints define the booking window. The booking window prevents site members from booking way in advance or just right before the slot starts. Not available for courses.
         */
        constraints: Constraints;
    };
    /**
     * An object representing information about the street name and street number of an address.
     */
    type StreetAddress = {
        /**
         * Address street name.
         */
        name: string;
        /**
         * Address street number.
         */
        number: string;
    };
}
