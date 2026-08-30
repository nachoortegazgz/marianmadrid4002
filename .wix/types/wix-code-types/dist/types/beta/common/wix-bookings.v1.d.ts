declare module "wix-bookings.v1" {
  interface Resource {
      /**
       * Resource ID.
       * @readonly
       */
      _id?: string | null;
      /** Resource name. */
      name?: string | null;
      /** Resource email address. */
      email?: string | null;
      /** Resource phone number. */
      phone?: string | null;
      /** Resource description. */
      description?: string | null;
      /**
       * @internal
       * @internal
       * @deprecated
       */
      tag?: string | null;
      /** Resource tags. Tags are used to identify, group, and filter the different types of resources. For example, 'staff' or 'room'. */
      tags?: string[] | null;
      /** Resource images. */
      images?: string[];
      /**
       * @internal
       * @internal
       * @deprecated
       */
      schedules?: Schedule[];
      /**
       * List of IDs of schedules owned by this resource.
       * @readonly
       */
      scheduleIds?: string[] | null;
      /**
       * Resource status.
       *
       * One of:
       * - `"CREATED"` Default status.
       * - `"DELETED"` The resource was deleted.
       * - `"UPDATED"` The resource was updated.
       *
       * @readonly
       */
      status?: ResourceStatus;
      /**
       * Wix user ID, if the resource is associated with the Wix user.
       * A staff member resource can be associated with a Wix user via assignment of a permissions role in the business manager.
       * @readonly
       */
      wixUserId?: string | null;
      /**
       * The ID of the Resource Group that this resource belongs to. This is an optional field as not every resource is part of a group.
       * @internal
       */
      groupId?: string | null;
      /**
       * This field determines how to resolve the working hours of this resource. Defaults to `true` if was not set by the client.
       * When set to `true` then working hours (including location information) can be found in the sessions of a schedule that is connected to this resource.
       * If `false`, then the working hours are not specified as sessions of a connected schedule. Instead this resource is then by definition full-time available (7 x 24).
       * @internal
       */
      hasWorkingHoursSchedule?: boolean | null;
      /**
       * True if the resource is available in all locations, false if the resource is available only in a specific business location. Empty if `has_working_hours_schedule` is true.
       * Information on the location(s) can then be found in the sessions of one of the connected schedules.
       * @internal
       */
      availableInAllLocations?: boolean | null;
      /**
       * Information about business location connected to the resource. Should be empty if `available_in_all_locations` is true or if no business location exists in OS.
       * @internal
       */
      businessLocation?: BusinessLocation;
      /**
       * This schedule contains the sessions in which this resource is booked.
       * Equals to the first element of `schedules` array.
       * @internal
       * @readonly
       */
      eventsSchedule?: Schedule;
      /**
       * The type of of the resource. Currently this field is only filled for staff and will contain the ID as configured in the
       * BOOKINGS_RESOURCE_TYPES component of the Bookings app.
       * @internal
       * @readonly
       */
      type?: string | null;
  }
  interface Schedule {
      /** Schedule ID. */
      _id?: string;
      /** ID of the schedule's owner entity. This may be a resource ID or a service ID. */
      scheduleOwnerId?: string | null;
      /**
       * Start time of the first session in the schedule.
       * @internal
       * @readonly
       */
      firstSessionStart?: Date;
      /**
       * End time of the last session in the schedule.
       * @internal
       * @readonly
       */
      lastSessionEnd?: Date;
      /**
       * Schedule's time zone in [Area/Location](https://en.wikipedia.org/wiki/Tz_database) format. Read-only.
       * Derived from the Wix Business time zone.
       * @readonly
       */
      timeZone?: string | null;
      /**
       * @internal
       * @internal
       * @deprecated
       */
      intervals?: RecurringInterval[];
      /** Default title for the schedule's sessions. Maximum length: 6000 characters. */
      title?: string | null;
      /**
       * __Deprecated.__
       * Tags for grouping schedules. These tags are the default tags for the schedule's sessions.
       * The Wix Bookings app uses the following predefined tags to set schedule type: `"INDIVIDUAL"`, `"GROUP"`, and `"COURSE"`. Once the schedule type is set using these tags, you cannot update it. In addition to the app's tags, you can create and update your own tags.
       * @deprecated
       */
      tags?: string[] | null;
      /** Default location for the schedule's sessions. */
      location?: Location;
      /** Maximum number of participants that can be added to the schedule's sessions. Must be at most `1` for schedule whose availability is affected by another schedule. For example, appointment schedules of the Wix Bookings app. */
      capacity?: number | null;
      /**
       * @internal
       * @internal
       * @deprecated
       */
      rate?: Rate;
      /**
       * @internal
       * @internal
       * @deprecated
       */
      availability?: Availability;
      /**
       * Number of participants registered to sessions in this schedule, calculated as the sum of the party sizes.
       * @readonly
       */
      totalNumberOfParticipants?: number;
      /**
       * *Partial list** of participants which are registered to sessions in this schedule.
       * Participants who are registered in the schedule are automatically registered to any session that is created for the schedule.
       * To retrieve the full list of schedule participants please use the [Query Extended Bookings API](https://dev.wix.com/api/rest/wix-bookings/bookings-reader-v2/query-extended-bookings).
       * @readonly
       */
      participants?: Participant[];
      /**
       * @internal
       * @internal
       * @deprecated
       */
      externalCalendarOverrides?: ExternalCalendarOverrides;
      /**
       * Schedule status.
       *
       * One of:
       * - `"CREATED"`
       * - `"CANCELLED"`
       *
       * Default: `"CREATED"`
       * @readonly
       */
      status?: ScheduleStatus;
      /**
       * Schedule creation date.
       * @readonly
       */
      created?: Date;
      /**
       * Schedule last update date.
       * @readonly
       */
      updated?: Date;
      /**
       * Schedule version number, updated each time the schedule is updated.
       * @readonly
       */
      version?: number;
      /**
       * The schedule version, updated each time the schedule or the schedule participants are updated.
       * @internal
       * @readonly
       */
      versions?: Version;
      /**
       * Fields which were inherited from the Business Info page under Settings in the Dashboard.
       * @readonly
       */
      inheritedFields?: string[];
      /**
       * @internal
       * @internal
       * @deprecated
       */
      conferenceProvider?: ConferenceProvider;
      /**
       * A conference created for the schedule. This is used when a participant is added to a schedule.
       * @deprecated
       */
      calendarConference?: CalendarConference;
      /**
       * The name of the schedule owner. It may be a resource name or a service name. Optional.
       * @internal
       */
      scheduleOwnerName?: string | null;
      /**
       * The user id of the schedule owner. Optional.
       * Currently, in Bookings system, it would be present when the schedule is owned by a staff resource and the resource is connected to a user.
       * NOT IMPLEMENTED. YET.
       * @internal
       * @readonly
       */
      scheduleOwnerUserId?: string | null;
  }
  interface RecurringInterval {
      /**
       * The recurring interval identifier.
       * @readonly
       */
      _id?: string;
      /** The start time of the recurring interval. Required. */
      start?: Date;
      /** The end time of the recurring interval. Optional. Empty value indicates that there is no end time. */
      end?: Date;
      /** The interval rules. The day, hour and minutes the interval is recurring. */
      interval?: Interval;
      /** The frequency of the interval. Optional. The default is frequency with the default repetition. */
      frequency?: Frequency;
      /** Specifies the list of linked schedules and the way this link affects the corresponding schedules' availability. Can be calculated from the schedule or overridden on the recurring interval. */
      affectedSchedules?: LinkedSchedule[];
      /** The type of recurring interval. */
      intervalType?: RecurringIntervalType;
  }
  interface Interval {
      /** The day the interval accrue. Optional. The default is the day of the recurring interval's start time. */
      daysOfWeek?: Day;
      /** The hour of the day the interval accrue. must be consistent with the Interval start time. Options. The default is 0. minimum: 0, maximum: 23. */
      hourOfDay?: number | null;
      /** The minutes of hour the interval accrue. must be consistent with the Interval end time. Options. The default is 0. minimum: 0, maximum: 59. */
      minuteOfHour?: number | null;
      /** The duration of the interval in minutes. Required. Part of the session end time calculation. */
      duration?: number;
  }
  enum Day {
      /** Undefined. */
      UNDEFINED = "UNDEFINED",
      /** Monday. */
      MON = "MON",
      /** Tuesday. */
      TUE = "TUE",
      /** Wednesday. */
      WED = "WED",
      /** Thursday. */
      THU = "THU",
      /** Friday. */
      FRI = "FRI",
      /** Saturday. */
      SAT = "SAT",
      /** Sunday. */
      SUN = "SUN"
  }
  interface Frequency {
      /** The frequency of the recurrence in weeks. i.e. when this value is 4, the interval occurs every 4 weeks. Optional. The default is 1. minimum: 1, maximum: 52. */
      repetition?: number | null;
  }
  interface LinkedSchedule {
      /** Schedule ID. */
      scheduleId?: string;
      /**
       * Sets this schedule's availability for the duration of the linked schedule's sessions.  Default is `"BUSY"`.
       * If set to `"BUSY"`, this schedule cannot have any available slots during the linked schedule's sessions.
       * If set to `"FREE"`, this schedule can have available slots during the linked schedule's sessions.
       */
      transparency?: Transparency;
      /**
       * Owner ID, of the linked schedule.
       * @readonly
       */
      scheduleOwnerId?: string;
      /**
       * The name of the linked schedule owner. It may be a resource name or a service name. Optional.
       * This field is inherited from the schedule identified by scheduleId above.
       * @internal
       * @readonly
       */
      scheduleOwnerName?: string | null;
      /**
       * The user id of the linked schedule owner. Optional.
       * This field is inherited from the schedule identified by scheduleId above.
       * NOT IMPLEMENTED. YET.
       * @internal
       * @readonly
       */
      scheduleOwnerUserId?: string | null;
  }
  enum Transparency {
      UNDEFINED = "UNDEFINED",
      /** The schedule can have available slots during the session. */
      FREE = "FREE",
      /** The schedule cannot have available slots during the session. Default value. */
      BUSY = "BUSY"
  }
  enum RecurringIntervalType {
      /** The default value. Sessions for this interval will be of type EVENT. */
      UNDEFINED = "UNDEFINED",
      /** A recurring interval of events */
      EVENT = "EVENT",
      /** Deprecated */
      TIME_AVAILABILITY = "TIME_AVAILABILITY",
      /** A recurring interval for availability */
      AVAILABILITY = "AVAILABILITY"
  }
  interface Location {
      /**
       * Location type.
       * One of:
       * - `"OWNER_BUSINESS"` The business address as set in the site’s general settings.
       * - `"OWNER_CUSTOM"` The address as set when creating the service.
       * - `"CUSTOM"` The address set for the individual session.
       */
      locationType?: LocationType;
      /**
       * Free text address used when locationType is `OWNER_CUSTOM`.
       * @deprecated
       */
      address?: string | null;
      /** Custom address, used when locationType is `"OWNER_CUSTOM"`. Might be used when locationType is `"CUSTOM"` in case the owner sets a custom address for the session which is different from the default. */
      customAddress?: Address;
      /**
       * The Wix Business location formatted address.
       * Valid when `locationType` is `OWNER_BUSINESS`. Defaults to the business's location.
       * To retrieve the full location data please use the [Locations API](https://dev.wix.com/api/rest/business-info/locations).
       * @internal
       */
      businessLocation?: LocationsLocation;
  }
  enum LocationType {
      UNDEFINED = "UNDEFINED",
      OWNER_BUSINESS = "OWNER_BUSINESS",
      OWNER_CUSTOM = "OWNER_CUSTOM",
      CUSTOM = "CUSTOM"
  }
  /** Physical address */
  interface Address extends AddressStreetOneOf {
      /** Street name, number and apartment number. */
      streetAddress?: StreetAddress;
      /** Main address line, usually street and number, as free text. */
      addressLine?: string | null;
      /** Country code. */
      country?: string | null;
      /** Subdivision. Usually state, region, prefecture or province code, according to [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2). */
      subdivision?: string | null;
      /** City name. */
      city?: string | null;
      /** Zip/postal code. */
      postalCode?: string | null;
      /** Free text providing more detailed address info. Usually contains Apt, Suite, and Floor. */
      addressLine2?: string | null;
      /** A string containing the full address of this location. */
      formattedAddress?: string | null;
      /** Free text to help find the address. */
      hint?: string | null;
      /** Coordinates of the physical address. */
      geocode?: AddressLocation;
      /** Country full name. */
      countryFullname?: string | null;
      /** Multi-level subdivisions from top to bottom. */
      subdivisions?: Subdivision[];
  }
  /** @oneof */
  interface AddressStreetOneOf {
      /** Street name, number and apartment number. */
      streetAddress?: StreetAddress;
      /** Main address line, usually street and number, as free text. */
      addressLine?: string | null;
  }
  interface StreetAddress {
      /** Street number. */
      number?: string;
      /** Street name. */
      name?: string;
      /** Apartment number. */
      apt?: string;
  }
  interface AddressLocation {
      /** Address latitude. */
      latitude?: number | null;
      /** Address longitude. */
      longitude?: number | null;
  }
  interface Subdivision {
      /** Subdivision code. Usually state, region, prefecture or province code, according to [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2). */
      code?: string;
      /** Subdivision full name. */
      name?: string;
  }
  interface LocationsLocation {
      /**
       * Location ID.
       * @readonly
       */
      _id?: string | null;
      /** Location name. */
      name?: string;
      /** Location description. */
      description?: string | null;
      /**
       * Whether this is the default location. There can only be one default location per site. The default location can't be archived.
       * @readonly
       */
      default?: boolean;
      /**
       * Location status. Defaults to `ACTIVE`.
       * __Notes:__
       * - [Archiving a location](https://dev.wix.com/api/rest/business-info/locations/archive-location)
       * doesn't affect the location's status.
       * - `INACTIVE` status is currently not supported.
       */
      status?: LocationStatus;
      /**
       * Location type.
       *
       * **Note:** Currently not supported.
       * @deprecated
       */
      locationType?: LocationsLocationType;
      /** Fax number. */
      fax?: string | null;
      /** Timezone in `America/New_York` format. */
      timeZone?: string | null;
      /** Email address. */
      email?: string | null;
      /** Phone number. */
      phone?: string | null;
      /** Address. */
      address?: LocationsAddress;
      /**
       * Business schedule. Array of weekly recurring time periods when the location is open for business. Limited to 100 time periods.
       *
       * __Note:__ Not supported by Wix Bookings.
       */
      businessSchedule?: BusinessSchedule;
      /**
       * Revision number, which increments by 1 each time the location is updated.
       * To prevent conflicting changes, the existing revision must be used when updating a location.
       */
      revision?: string | null;
      /**
       * Whether the location is archived. Archived locations can't be updated.
       * __Note:__ [Archiving a location](https://dev.wix.com/api/rest/business-info/locations/archive-location)
       * doesn't affect its `status`.
       * @readonly
       */
      archived?: boolean;
      /** Location types. */
      locationTypes?: LocationsLocationType[];
  }
  /** For future use */
  enum LocationStatus {
      ACTIVE = "ACTIVE",
      INACTIVE = "INACTIVE"
  }
  /** For future use */
  enum LocationsLocationType {
      UNKNOWN = "UNKNOWN",
      BRANCH = "BRANCH",
      OFFICES = "OFFICES",
      RECEPTION = "RECEPTION",
      HEADQUARTERS = "HEADQUARTERS",
      INVENTORY = "INVENTORY"
  }
  interface LocationsAddress {
      /** 2-letter country code in an [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. */
      country?: string | null;
      /** Code for a subdivision (such as state, prefecture, or province) in [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) format. */
      subdivision?: string | null;
      /** City name. */
      city?: string | null;
      /** Postal or zip code. */
      postalCode?: string | null;
      /** Street address. Includes street name, number, and apartment number in separate fields. */
      streetAddress?: LocationsStreetAddress;
      /** Full address of the location. */
      formatted?: string | null;
      /** Geographic coordinates of location. */
      location?: LocationsAddressLocation;
  }
  /** Street address. Includes street name, number, and apartment number in separate fields. */
  interface LocationsStreetAddress {
      /** Street number. */
      number?: string;
      /** Street name. */
      name?: string;
      /** Apartment number. */
      apt?: string;
  }
  /** Address Geolocation */
  interface LocationsAddressLocation {
      /** Latitude of the location. Must be between -90 and 90. */
      latitude?: number | null;
      /** Longitude of the location. Must be between -180 and 180. */
      longitude?: number | null;
  }
  /** Business schedule. Regular and exceptional time periods when the business is open or the service is available. */
  interface BusinessSchedule {
      /** Weekly recurring time periods when the business is regularly open or the service is available. Limited to 100 time periods. */
      periods?: TimePeriod[];
      /** Exceptions to the business's regular hours. The business can be open or closed during the exception. */
      specialHourPeriod?: SpecialHourPeriod[];
  }
  /** Weekly recurring time periods when the business is regularly open or the service is available. */
  interface TimePeriod {
      /** Day of the week the period starts on. */
      openDay?: DayOfWeek;
      /**
       * Time the period starts in 24-hour [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) extended format. Valid values are `00:00` to `24:00`, where `24:00` represents
       * midnight at the end of the specified day.
       */
      openTime?: string;
      /** Day of the week the period ends on. */
      closeDay?: DayOfWeek;
      /**
       * Time the period ends in 24-hour [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) extended format. Valid values are `00:00` to `24:00`, where `24:00` represents
       * midnight at the end of the specified day.
       *
       * __Note:__ If `openDay` and `closeDay` specify the same day of the week `closeTime` must be later than `openTime`.
       */
      closeTime?: string;
  }
  /** Enumerates the days of the week. */
  enum DayOfWeek {
      MONDAY = "MONDAY",
      TUESDAY = "TUESDAY",
      WEDNESDAY = "WEDNESDAY",
      THURSDAY = "THURSDAY",
      FRIDAY = "FRIDAY",
      SATURDAY = "SATURDAY",
      SUNDAY = "SUNDAY"
  }
  /** Exception to the business's regular hours. The business can be open or closed during the exception. */
  interface SpecialHourPeriod {
      /** Start date and time of the exception in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format and [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time). */
      startDate?: string;
      /** End date and time of the exception in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format and [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time). */
      endDate?: string;
      /**
       * Whether the business is closed (or the service is not available) during the exception.
       *
       * Default: `true`.
       */
      isClosed?: boolean;
      /** Additional info about the exception. For example, "We close earlier on New Year's Eve." */
      comment?: string;
  }
  interface Rate {
      /**
       * Mapping between a named price option, for example, adult or child prices, and the price, currency, and down payment amount.
       * When present in an update request, the `default_varied_price` is ignored to support backward compatibility.
       */
      labeledPriceOptions?: Record<string, Price>;
      /**
       * Textual price information used when **Price Per Session** is set to **Custom Price** in the app's service details page.
       * When present in an update request, the `default_varied_price` is ignored to support backward compatibility.
       */
      priceText?: string | null;
      /**
       * Default service price. Always vailable when a service has
       * [variants](https://dev.wix.com/api/rest/wix-bookings/service-options-and-variants/introduction).
       * Sometimes also available for services without variants.
       * Ignored in [updates to a service](https://dev.wix.com/api/rest/wix-bookings/services/service/update-service),
       * when either `labeled_price_options` or `price_text` is also specified.
       * @internal
       */
      defaultVariedPrice?: Price;
  }
  interface Price {
      /** Required payment amount. */
      amount?: string;
      /** Currency in which the amount is quoted. */
      currency?: string;
      /** Amount of a down payment or deposit as part of the transaction. */
      downPayAmount?: string;
  }
  /**
   * <!-- Needs updating when recurrence has been tested
   * Schedule's availability calculation is executed by the schedule's available intervals and this additional information.
   * Schedule's available intervals are recurring intervals (defined in the schedule) minus sessions that has no more spots for bookings (including time between_slots), or schedule's sessions with open spots for bookings.-->
   */
  interface Availability {
      /** Date and time the schedule starts to be available for booking. */
      start?: Date;
      /** Date and time the schedule stops being available for booking. No value indicates no end time. */
      end?: Date;
      /** Other schedules that impact the availability calculation. Relevant only when there are availability constraints. */
      linkedSchedules?: LinkedSchedule[];
      /** Constraints for calculating the schedule's availability. */
      constraints?: AvailabilityConstraints;
      /**
       * Not supported yet.
       * A list of possible locations for the session when `use_default_location` is set to `false`. Slots are generated for each location. Only one of the possible locations can be chosen by the customer.
       *
       * **NOTE**: When using the `locations` parameter, the default location is not automatically included in the list.
       * @internal
       */
      locations?: Location[];
      /**
       * Not supported yet.
       * Whether the schedule's slots are only available at the schedule's default location, as set in `schedule.location`. If set to `false`, the `locations` array is used to set the possible locations of the schedule's sessions.
       * Default is `true`.
       * @internal
       */
      useDefaultLocation?: boolean | null;
  }
  /** Describes how to calculate the specific slots that are available for booking. */
  interface AvailabilityConstraints {
      /**
       * A list of duration options for slots, in minutes. Minimum value for a duration is 1.
       * The availability calculation generates slots with these durations, where there is no conflict with existing sessions or other availability constraints.
       */
      slotDurations?: number[];
      /**
       * The number of minutes between the `end` of one slot, and the `start` of the next.
       * Minimum value is 0, maximum value is 120.
       */
      timeBetweenSlots?: number;
      /**
       * Specify how to split the slots in intervals of minutes.
       * This value indicates the time between available slots' start time. e.g., from 5 minute slots (3:00, 3:05, 3:15) and 1 hour slots (3:00, 4:00, 5:00).
       * Optional. The default is the first duration in slot_durations field.
       * Deprecated. Use the `split_slots_interval.value_in_minutes`.
       * @deprecated
       */
      splitInterval?: number | null;
      /**
       * An object defining the time between available slots' start times.  For example, a slot with slots_split_interval=5 can start every 5 minutes. The default is the slot duration.
       * @readonly
       */
      slotsSplitInterval?: SplitInterval;
  }
  /** The time between available slots' start times. For example, For 5 minute slots, 3:00, 3:05, 3:15 etc. For 1 hour slots, 3:00, 4:00, 5:00 etc. */
  interface SplitInterval {
      /**
       * Whether the slot duration is used as the split interval value.
       * If `same_as_duration` is `true`, the `value_in_minutes` is the sum of the first duration in
       * `schedule.availabilityConstraints.SlotDurations` field, and `schedule.availabilityConstraints.TimeBetweenSlots` field.
       */
      sameAsDuration?: boolean | null;
      /** Number of minutes between available slots' start times when `same_as_duration` is `false`. */
      valueInMinutes?: number | null;
  }
  interface Participant {
      /** Participant ID. Currently represents the booking.id. */
      _id?: string;
      /** Contact ID. */
      contactId?: string | null;
      /** Participant's name. */
      name?: string | null;
      /** Participant's phone number. */
      phone?: string | null;
      /** Participant's email address. */
      email?: string | null;
      /** Group or party size. The number of people attending. Defaults to 0. Maximum is 250. */
      partySize?: number;
      /**
       * Approval status for the participant.
       * <!-- Commented out untill updateParticipant is exposed Generally the same status as the booking, unless updated using the `updateParticipant()` API. Defaults to `"UNDEFINED"`.-->
       */
      approvalStatus?: ApprovalStatus;
      /**
       * Whether the participant was inherited from the schedule, as opposed to being booked directly to the session.
       * @readonly
       */
      inherited?: boolean;
  }
  enum ApprovalStatus {
      /** Default. */
      UNDEFINED = "UNDEFINED",
      /** Pending business approval. */
      PENDING = "PENDING",
      /** Approved by the business. */
      APPROVED = "APPROVED",
      /** Declined by the business. */
      DECLINED = "DECLINED"
  }
  interface ExternalCalendarOverrides {
      /** Synced title of the external calendar event. */
      title?: string | null;
      /** Synced description of the external calendar event. */
      description?: string | null;
  }
  enum ScheduleStatus {
      UNDEFINED = "UNDEFINED",
      /** The default value when the schedule is created. */
      CREATED = "CREATED",
      /** The schedule has been canceled. */
      CANCELLED = "CANCELLED"
  }
  interface Version {
      /** Schedule version number, updated each time the schedule is updated. */
      scheduleVersion?: number | null;
      /** Participants version number, updated each time the schedule participants are updated. */
      participantsVersion?: number | null;
  }
  interface ConferenceProvider {
      /** Conferencing provider ID */
      providerId?: string;
  }
  interface CalendarConference {
      /**
       * @internal
       * @internal */
      _id?: string;
      /**
       * @internal
       * @internal */
      externalId?: string;
      /**
       * A generated id for the conference entity - Base62($providerId$accountOwnerId$conferenceId)
       * @internal
       */
      conferenceId?: string | null;
      /**
       * @internal
       * @internal */
      providerId?: string;
      /** URL used by the host to start the conference. */
      hostUrl?: string;
      /** URL used by a guest to join the conference. */
      guestUrl?: string;
      /**
       * @internal
       * @internal */
      password?: string | null;
      /**
       * @internal
       * @internal */
      description?: string | null;
      /**
       * @internal
       * @internal */
      conferenceType?: ConferenceType;
      /**
       * @internal
       * @internal */
      accountOwnerId?: string | null;
  }
  enum ConferenceType {
      UNDEFINED = "UNDEFINED",
      /** API-generated online meeting. */
      ONLINE_MEETING_PROVIDER = "ONLINE_MEETING_PROVIDER",
      /** User-defined meeting. */
      CUSTOM = "CUSTOM"
  }
  enum ResourceStatus {
      UNDEFINED = "UNDEFINED",
      /** Default status. */
      CREATED = "CREATED",
      /** The resource was deleted. */
      DELETED = "DELETED",
      /** The resource was updated. */
      UPDATED = "UPDATED"
  }
  interface BusinessLocation {
      /** The ID of the business location. Has to be non-empty */
      locationId?: string;
  }
  interface ListResourcesRequest {
      query?: Query;
  }
  interface Query {
      /**
       * Filter object in the following format:
       * `"filter" : {
       * "fieldName1": "value1",
       * "fieldName2":{"$operator":"value2"}
       * }`
       * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
       */
      filter?: any;
      /**
       * Sort object in the following format:
       * `[{"fieldName":"sortField1","order":"ASC"},{"fieldName":"sortField2","order":"DESC"}]`
       */
      sort?: Sorting[];
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
      /** Array of projected fields. A list of specific field names to return. If `fieldsets` are also specified, the union of `fieldsets` and `fields` is returned. */
      fields?: string[];
      /** Array of named, predefined sets of projected fields. A array of predefined named sets of fields to be returned. Specifying multiple `fieldsets` will return the union of fields from all sets. If `fields` are also specified, the union of `fieldsets` and `fields` is returned. */
      fieldsets?: string[];
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
  interface Paging {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface ListResourcesResponse {
      /** List of resources matching the query object. */
      resources?: Resource[];
      /** @deprecated */
      metadata?: QueryMetaData;
      pagingMetadata?: PagingMetadataV2;
  }
  interface QueryMetaData {
      items?: number;
      offset?: number;
      totalCount?: number;
  }
  interface PagingMetadataV2 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
      total?: number | null;
      /** Flag that indicates the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
      cursors?: Cursors;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface Cursors {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface QueryResourcesRequest {
      query?: QueryV2;
      /**
       * Whether to include resources with non-empty group in response. False by default.
       * @internal
       */
      includeResourcesWithGroups?: boolean;
  }
  interface QueryV2 extends QueryV2PagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
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
      /** Array of projected fields. A list of specific field names to return. If `fieldsets` are also specified, the union of `fieldsets` and `fields` is returned. */
      fields?: string[];
      /** Array of named, predefined sets of projected fields. A array of predefined named sets of fields to be returned. Specifying multiple `fieldsets` will return the union of fields from all sets. If `fields` are also specified, the union of `fieldsets` and `fields` is returned. */
      fieldsets?: string[];
  }
  /** @oneof */
  interface QueryV2PagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
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
  interface QueryResourcesResponse {
      /** List of resources matching the query object. */
      resources?: Resource[];
      pagingMetadata?: PagingMetadataV2;
  }
  interface GetBusinessResourceRequest {
  }
  interface GetBusinessResourceResponse {
      /** The business resource. */
      resource?: Resource;
  }
  interface CreateResourceRequest {
      /** Resource to create. */
      resource: Resource;
      /**
       * List of schedules to be assigned for the created resource. Currently only a single schedule is allowed.
       * If provided, any schedules in the resource entity will be ignored.
       */
      schedules?: Schedule[];
  }
  interface CreateResourceResponse {
      /** Created resource. */
      resource?: Resource;
  }
  interface ResourceNotification {
      /**
       * Updated resource entity.
       * 'resource.schedules' is deprecated and will not be returned. Please use 'resource.scheduleIds' instead.
       */
      resource?: Resource;
      /** Event type. */
      event?: Event$1;
  }
  enum Event$1 {
      UNDEFINED = "UNDEFINED",
      Updated = "Updated",
      Deleted = "Deleted",
      Created = "Created",
      Schedule_Updated = "Schedule_Updated"
  }
  interface BatchCreateResourceRequest {
      /** List of resource entities to create. */
      resources?: Resource[];
      /** Optional. If provided, the resources field is ignored. */
      batchedResources?: CreateResourceRequest[];
  }
  interface BatchCreateResourceResponse {
      /** List of the created resources. */
      resources?: Resource[];
  }
  interface UpdateResourceRequest {
      /** Resource to update. */
      resource?: Resource;
      /**
       * Field mask of fields to update.
       * @internal
       */
      fieldMask?: string[];
      /**
       * Actions to perform on the resources schedules. Can contain schedules to create, update, and cancel.
       * Either the 'schedules' or 'schedule_actions' should be specified but not both. If both are provided, the schedules in the resource entity is ignored.
       * @internal
       */
      scheduleActions?: BatchRequest;
  }
  interface BatchRequest {
      /** Create multiple schedules. */
      createRequests?: CreateScheduleRequest[];
      /** Update multiple schedules. Not Supported yet. */
      updateRequests?: UpdateScheduleRequest[];
      /**
       * Cancel multiple schedules.
       * The given schedules move to a CANCELLED status which means that all sessions up until
       * the cancellation point in time are kept, while removing all following sessions.
       */
      cancelRequests?: CancelScheduleRequest[];
  }
  /** schedule */
  interface CreateScheduleRequest {
      /** Schedule. */
      schedule?: Schedule;
      /**
       * Optional. Idempotency key.
       * @internal
       */
      idempotencyKey?: string | null;
  }
  interface UpdateScheduleRequest {
      /** Schedule. */
      schedule?: Schedule;
      /**
       * Field mask of fields to update.
       * @internal
       */
      fieldMask?: string[];
      /** Optional. Defaults to false. In case of updated intervals' start time, this field indicates whether to align those interval's time exceptions. */
      alignTimeExceptions?: boolean;
      /**
       * Deprecated, use participant_notification.
       * @deprecated
       */
      notifyParticipants?: boolean;
      /** Whether to notify participants about the change, and an optional custom message. */
      participantNotification?: ParticipantNotification;
  }
  interface ParticipantNotification {
      /**
       * Whether to send the message about the changes to the customer.
       *
       * Default: `false`
       */
      notifyParticipants?: boolean;
      /** Custom message to send to the participants about the changes to the booking. */
      message?: string | null;
  }
  interface CancelScheduleRequest {
      /** Schedule ID. */
      scheduleId?: string;
      /** Time to cancel the sessions from. Optional. If this field is empty, all of this schedule's sessions will be canceled. */
      from?: Date;
      /** Whether to preserve future sessions with reservations. Defaults to false. */
      preserveFutureSessionsWithParticipants?: boolean;
      /**
       * Deprecated, use participant_notification
       * @deprecated
       */
      notifyParticipants?: boolean;
      /** Whether to notify participants about the change, and an optional custom message. */
      participantNotification?: ParticipantNotification;
  }
  interface UpdateResourceResponse {
      /** Updated resource. */
      resource?: Resource;
      /** Updated schedules. */
      schedules?: BatchResponse;
  }
  interface BatchResponse {
      /** Created schedules. */
      created?: Schedule[];
      /** Updated schedules. */
      updated?: Schedule[];
      /** Cancelled schedules. */
      cancelled?: Schedule[];
  }
  interface ResourceUpdateScheduleRequest {
      /** Resource ID to update. */
      resourceId: string | null;
      /**
       * Fieldmask for schedule
       * @internal
       */
      fieldmask?: string[];
      /** Schedule to update. */
      schedule?: Schedule;
  }
  interface UpdateScheduleResponse {
      /** Updated schedule. */
      schedule?: Schedule;
  }
  interface DeleteResourceRequest {
      /** ID of the resource to delete. */
      _id: string;
  }
  interface DeleteResourceResponse {
      /** Deleted resource ID. */
      _id?: string;
  }
  interface BatchDeleteResourceRequest {
      /** List of resource IDs to delete. */
      ids: string[];
  }
  interface BatchDeleteResourceResponse {
  }
  interface LinkResourceToUserRequest {
      /** The id of the resource to link. */
      resourceId: string | null;
      /** The id of Wix user to link. */
      userId: string | null;
      /**
       * The email address of the Wix user to link. This field is only intended for internal as it is needed to proxy the request to StaffMembersService.
       * @internal
       */
      userEmail?: string | null;
  }
  interface LinkResourceToUserResponse {
      /** The updated resource. */
      resource?: Resource;
  }
  interface UnLinkResourceFromOwnerRequest {
      /** The id of the resource to unlink. */
      resourceId: string | null;
  }
  interface UnLinkResourceFromOwnerResponse {
      /** The updated resource. */
      resource?: Resource;
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
   * @internal
   * @internal
   * @permissionId BOOKINGS.RESOURCES_READ
   * @deprecated
   */
  function list(options?: ListOptions): Promise<ListResourcesResponse>;
  interface ListOptions {
      query?: Query;
  }
  /**
   * Creates a query to retrieve extended resource information.
   *
   * The `queryResources()` function builds a query to retrieve a catalog of resources, including resources' related  schedules and slugs, and returns a [`ResourceQueryBuilder`](#) object. The returned object contains the query definition, which is typically used to run the query using the [`find()`](#) function.
   *
   * The `ResourceQueryBuilder` functions enable you to run, filter, and control which results a query returns.
   *
   * Typically, you build a query using the `queryResources()` function, refine the query by chaining `ResourceQueryBuilder` functions, and then execute the query by chaining the `find()` function.
   *
   * The query runs with the following defaults that you can override:
   * - [`skip`](#): `0`
   * - [`limit`](#): `50`
   *
   * The following query builder functions are supported for `queryResources()`. For a full description of the `Resources` object, see the object returned for the [`items`](#) array in [`ResourceQueryResult`](#).
   * @internal
   * @permissionId BOOKINGS.RESOURCES_READ
   */
  function queryResources(options?: QueryResourcesOptions): Promise<QueryResourcesResponse>;
  interface QueryResourcesOptions {
      query?: QueryV2;
      /**
       * Whether to include resources with non-empty group in response. False by default.
       * @internal
       */
      includeResourcesWithGroups?: boolean;
  }
  /**
   * Returns the Business Resource.
   *
   * This endpoint is only implemented in the Resources V2 proxy.
   * When called for a site that is not rolled out to V2 an error is returned.
   * @internal
   * @documentationMaturity preview
   * @permissionId BOOKINGS.RESOURCES_READ
   */
  function getBusinessResource(): Promise<GetBusinessResourceResponse>;
  /**
   * Creates a resource.
   *
   *
   * The `createResource()` function returns a Promise that resolves to the created resource.
   * Bookings resources are created with a schedule. The schedule determines the resource's availability by the business's default working hours.
   *
   * When creating a resource using `createResource()`, get the business resource's schedule ID and include it in the `schedules` object. The default hours can bee found in the Dashboard under **Settings** in the **Bookings** section, on the **Appointment hours** page.
   *
   *
   * > **Notes:**
   * >- The Wix Bookings app shows default business hours on the **Staff** page in the dashboard.
   * >- A resource can have one schedule only.
   * >- You can have up to 135 active resources and an additional 135 deleted resources.
   * @param resource - Resource to create.
   * @public
   * @requiredField options.schedules.availability.start
   * @requiredField options.schedules.intervals.start
   * @requiredField resource
   * @requiredField resource.name
   * @param options - Options for assigning a schedule to a resource.
   * @permissionId BOOKINGS.MANAGE_RESOURCES
   * @adminMethod
   * @returns Created resource.
   */
  function createResource(resource: Resource, options?: CreateResourceOptions): Promise<Resource>;
  interface CreateResourceOptions {
      /**
       * List of schedules to be assigned for the created resource. Currently only a single schedule is allowed.
       * If provided, any schedules in the resource entity will be ignored.
       */
      schedules?: Schedule[];
  }
  /**
   * Creates multiple resources with corresponding schedules.
   * @internal
   * @documentationMaturity preview
   * @permissionId BOOKINGS.MANAGE_RESOURCES
   * @adminMethod
   */
  function batchCreate$1(options?: BatchCreateOptions$1): Promise<BatchCreateResourceResponse>;
  interface BatchCreateOptions$1 {
      /** List of resource entities to create. */
      resources?: Resource[];
      /** Optional. If provided, the resources field is ignored. */
      batchedResources?: CreateResourceRequest[];
  }
  /**
   * Updates a resource.
   *
   *
   * The `updateResource()` function returns a Promise that resolves when a resource is updated. Use this function to update all bookings resource information except for the resource's schedule. To update a resource's schedule use [`updateSchedule()`](#updateschedule).
   *
   *
   * >**Note:**
   * > When updating a resource you cannot change the system tags used by the Wix Bookings app. Tags used by the app have the values `"business"` and `"staff"`.
   * @param _id - Resource ID.
   * @public
   * @requiredField _id
   * @requiredField resource
   * @param resource - Resource to update.
   * @permissionId BOOKINGS.MANAGE_RESOURCES
   * @adminMethod
   * @returns Updated resource.
   */
  function updateResource(_id: string | null, resource: UpdateResource, options?: UpdateResourceOptions): Promise<Resource>;
  interface UpdateResource {
      /**
       * Resource ID.
       * @readonly
       */
      _id?: string | null;
      /** Resource name. */
      name?: string | null;
      /** Resource email address. */
      email?: string | null;
      /** Resource phone number. */
      phone?: string | null;
      /** Resource description. */
      description?: string | null;
      /**
       * @internal
       * @deprecated
       */
      tag?: string | null;
      /** Resource tags. Tags are used to identify, group, and filter the different types of resources. For example, 'staff' or 'room'. */
      tags?: string[] | null;
      /** Resource images. */
      images?: string[];
      /**
       * @internal
       * @deprecated
       */
      schedules?: Schedule[];
      /**
       * List of IDs of schedules owned by this resource.
       * @readonly
       */
      scheduleIds?: string[] | null;
      /**
       * Resource status.
       *
       * One of:
       * - `"CREATED"` Default status.
       * - `"DELETED"` The resource was deleted.
       * - `"UPDATED"` The resource was updated.
       *
       * @readonly
       */
      status?: ResourceStatus;
      /**
       * Wix user ID, if the resource is associated with the Wix user.
       * A staff member resource can be associated with a Wix user via assignment of a permissions role in the business manager.
       * @readonly
       */
      wixUserId?: string | null;
      /**
       * The ID of the Resource Group that this resource belongs to. This is an optional field as not every resource is part of a group.
       * @internal
       */
      groupId?: string | null;
      /**
       * This field determines how to resolve the working hours of this resource. Defaults to `true` if was not set by the client.
       * When set to `true` then working hours (including location information) can be found in the sessions of a schedule that is connected to this resource.
       * If `false`, then the working hours are not specified as sessions of a connected schedule. Instead this resource is then by definition full-time available (7 x 24).
       * @internal
       */
      hasWorkingHoursSchedule?: boolean | null;
      /**
       * True if the resource is available in all locations, false if the resource is available only in a specific business location. Empty if `has_working_hours_schedule` is true.
       * Information on the location(s) can then be found in the sessions of one of the connected schedules.
       * @internal
       */
      availableInAllLocations?: boolean | null;
      /**
       * Information about business location connected to the resource. Should be empty if `available_in_all_locations` is true or if no business location exists in OS.
       * @internal
       */
      businessLocation?: BusinessLocation;
      /**
       * This schedule contains the sessions in which this resource is booked.
       * Equals to the first element of `schedules` array.
       * @internal
       * @readonly
       */
      eventsSchedule?: Schedule;
      /**
       * The type of of the resource. Currently this field is only filled for staff and will contain the ID as configured in the
       * BOOKINGS_RESOURCE_TYPES component of the Bookings app.
       * @internal
       * @readonly
       */
      type?: string | null;
  }
  interface UpdateResourceOptions {
      /**
       * @internal
       * @internal
       */
      fieldMask?: string[];
      /**
       * Actions to perform on the resources schedules. Can contain schedules to create, update, and cancel.
       * Either the 'schedules' or 'schedule_actions' should be specified but not both. If both are provided, the schedules in the resource entity is ignored.
       * @internal
       */
      scheduleActions?: BatchRequest;
  }
  /**
   * Updates a resource's schedule.
   *
   *
   * The `updateSchedule()` function returns a Promise that resolves when a resource's schedule has been updated. Use this function to update the bookings resource's schedule. To update other resource details use [`updateResource()`](#updateresource).
   *
   * > **Notes:**
   * >- A resource can have one schedule only.
   * >- When updating a resource's schedule you cannot change the system tags used by the Wix Bookings app. Tags used by the app have the values `"INDIVIDUAL"`, `"GROUP"`, and `"COURSE"`.
   * @param resourceId - Resource ID to update.
   * @param schedule - Schedule to update.
   * @public
   * @requiredField resourceId
   * @requiredField schedule
   * @requiredField schedule._id
   * @permissionId BOOKINGS.MANAGE_RESOURCES
   * @adminMethod
   */
  function updateSchedule(resourceId: string | null, schedule: Schedule, options?: UpdateScheduleOptions): Promise<UpdateScheduleResponse>;
  interface UpdateScheduleOptions {
      /**
       * @internal
       * @internal
       */
      fieldmask?: string[];
  }
  /**
   * Deletes a resource.
   *
   * The `deleteResource()` function returns a Promise that is resolved when a resource is deleted.
   *
   *
   * Deleting a resource updates its status to `DELETED`.
   *
   * You cannot delete a resource if it has booked sessions.
   *
   *
   * >**Notes:**
   * >- The Bookings app automatically creates a resource with a name and tag of value `"business"`. This resource is used for the business's schedule and working hours and cannot be deleted.
   * >- You can have up to 135 active resources and an additional 135 deleted resources.
   * @param _id - ID of the resource to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId BOOKINGS.MANAGE_RESOURCES
   * @adminMethod
   */
  function deleteResource(_id: string): Promise<DeleteResourceResponse>;
  /** @param ids - List of resource IDs to delete.
   * @internal
   * @documentationMaturity preview
   * @requiredField ids
   * @permissionId BOOKINGS.MANAGE_RESOURCES
   * @adminMethod
   */
  function batchDelete(ids: string[]): Promise<void>;
  /**
   * Links a resource to a Wix user.
   * The user will be assigned with the `Bookings Staff Member` role, via the `SitePoliciesManagement.AssignPolicies` API.
   *
   * Preconditions:
   * - The resource must not be linked to a user, or an active invite.
   * - The user must be a site contributor
   * - The user must not be linked to another resource.
   *
   * Note:
   * The site owner may be linked to a resource, but will not be assigned with the 'Bookings Staff Member' role.
   * @param resourceId - The id of the resource to link.
   * @param userId - The id of Wix user to link.
   * @internal
   * @documentationMaturity preview
   * @requiredField resourceId
   * @requiredField userId
   * @permissionId BOOKINGS.MANAGE_RESOURCES
   * @adminMethod
   */
  function linkResourceToUser(resourceId: string | null, userId: string | null, options?: LinkResourceToUserOptions): Promise<LinkResourceToUserResponse>;
  interface LinkResourceToUserOptions {
      /**
       * The email address of the Wix user to link. This field is only intended for internal as it is needed to proxy the request to StaffMembersService.
       * @internal
       */
      userEmail?: string | null;
  }
  /**
   * Unlink a resource from the site owner.
   * @param resourceId - The id of the resource to unlink.
   * @internal
   * @documentationMaturity preview
   * @requiredField resourceId
   * @permissionId BOOKINGS.MANAGE_RESOURCES
   * @adminMethod
   */
  function unLinkResourceFromOwner(resourceId: string | null): Promise<UnLinkResourceFromOwnerResponse>;
  
  type bookingsCatalogV1Resource_universal_d_Resource = Resource;
  type bookingsCatalogV1Resource_universal_d_Schedule = Schedule;
  type bookingsCatalogV1Resource_universal_d_RecurringInterval = RecurringInterval;
  type bookingsCatalogV1Resource_universal_d_Interval = Interval;
  type bookingsCatalogV1Resource_universal_d_Day = Day;
  const bookingsCatalogV1Resource_universal_d_Day: typeof Day;
  type bookingsCatalogV1Resource_universal_d_Frequency = Frequency;
  type bookingsCatalogV1Resource_universal_d_LinkedSchedule = LinkedSchedule;
  type bookingsCatalogV1Resource_universal_d_Transparency = Transparency;
  const bookingsCatalogV1Resource_universal_d_Transparency: typeof Transparency;
  type bookingsCatalogV1Resource_universal_d_RecurringIntervalType = RecurringIntervalType;
  const bookingsCatalogV1Resource_universal_d_RecurringIntervalType: typeof RecurringIntervalType;
  type bookingsCatalogV1Resource_universal_d_Location = Location;
  type bookingsCatalogV1Resource_universal_d_LocationType = LocationType;
  const bookingsCatalogV1Resource_universal_d_LocationType: typeof LocationType;
  type bookingsCatalogV1Resource_universal_d_Address = Address;
  type bookingsCatalogV1Resource_universal_d_AddressStreetOneOf = AddressStreetOneOf;
  type bookingsCatalogV1Resource_universal_d_StreetAddress = StreetAddress;
  type bookingsCatalogV1Resource_universal_d_AddressLocation = AddressLocation;
  type bookingsCatalogV1Resource_universal_d_Subdivision = Subdivision;
  type bookingsCatalogV1Resource_universal_d_LocationsLocation = LocationsLocation;
  type bookingsCatalogV1Resource_universal_d_LocationStatus = LocationStatus;
  const bookingsCatalogV1Resource_universal_d_LocationStatus: typeof LocationStatus;
  type bookingsCatalogV1Resource_universal_d_LocationsLocationType = LocationsLocationType;
  const bookingsCatalogV1Resource_universal_d_LocationsLocationType: typeof LocationsLocationType;
  type bookingsCatalogV1Resource_universal_d_LocationsAddress = LocationsAddress;
  type bookingsCatalogV1Resource_universal_d_LocationsStreetAddress = LocationsStreetAddress;
  type bookingsCatalogV1Resource_universal_d_LocationsAddressLocation = LocationsAddressLocation;
  type bookingsCatalogV1Resource_universal_d_BusinessSchedule = BusinessSchedule;
  type bookingsCatalogV1Resource_universal_d_TimePeriod = TimePeriod;
  type bookingsCatalogV1Resource_universal_d_DayOfWeek = DayOfWeek;
  const bookingsCatalogV1Resource_universal_d_DayOfWeek: typeof DayOfWeek;
  type bookingsCatalogV1Resource_universal_d_SpecialHourPeriod = SpecialHourPeriod;
  type bookingsCatalogV1Resource_universal_d_Rate = Rate;
  type bookingsCatalogV1Resource_universal_d_Price = Price;
  type bookingsCatalogV1Resource_universal_d_Availability = Availability;
  type bookingsCatalogV1Resource_universal_d_AvailabilityConstraints = AvailabilityConstraints;
  type bookingsCatalogV1Resource_universal_d_SplitInterval = SplitInterval;
  type bookingsCatalogV1Resource_universal_d_Participant = Participant;
  type bookingsCatalogV1Resource_universal_d_ApprovalStatus = ApprovalStatus;
  const bookingsCatalogV1Resource_universal_d_ApprovalStatus: typeof ApprovalStatus;
  type bookingsCatalogV1Resource_universal_d_ExternalCalendarOverrides = ExternalCalendarOverrides;
  type bookingsCatalogV1Resource_universal_d_ScheduleStatus = ScheduleStatus;
  const bookingsCatalogV1Resource_universal_d_ScheduleStatus: typeof ScheduleStatus;
  type bookingsCatalogV1Resource_universal_d_Version = Version;
  type bookingsCatalogV1Resource_universal_d_ConferenceProvider = ConferenceProvider;
  type bookingsCatalogV1Resource_universal_d_CalendarConference = CalendarConference;
  type bookingsCatalogV1Resource_universal_d_ConferenceType = ConferenceType;
  const bookingsCatalogV1Resource_universal_d_ConferenceType: typeof ConferenceType;
  type bookingsCatalogV1Resource_universal_d_ResourceStatus = ResourceStatus;
  const bookingsCatalogV1Resource_universal_d_ResourceStatus: typeof ResourceStatus;
  type bookingsCatalogV1Resource_universal_d_BusinessLocation = BusinessLocation;
  type bookingsCatalogV1Resource_universal_d_ListResourcesRequest = ListResourcesRequest;
  type bookingsCatalogV1Resource_universal_d_Query = Query;
  type bookingsCatalogV1Resource_universal_d_Sorting = Sorting;
  type bookingsCatalogV1Resource_universal_d_SortOrder = SortOrder;
  const bookingsCatalogV1Resource_universal_d_SortOrder: typeof SortOrder;
  type bookingsCatalogV1Resource_universal_d_Paging = Paging;
  type bookingsCatalogV1Resource_universal_d_ListResourcesResponse = ListResourcesResponse;
  type bookingsCatalogV1Resource_universal_d_QueryMetaData = QueryMetaData;
  type bookingsCatalogV1Resource_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type bookingsCatalogV1Resource_universal_d_Cursors = Cursors;
  type bookingsCatalogV1Resource_universal_d_QueryResourcesRequest = QueryResourcesRequest;
  type bookingsCatalogV1Resource_universal_d_QueryV2 = QueryV2;
  type bookingsCatalogV1Resource_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
  type bookingsCatalogV1Resource_universal_d_CursorPaging = CursorPaging;
  type bookingsCatalogV1Resource_universal_d_QueryResourcesResponse = QueryResourcesResponse;
  type bookingsCatalogV1Resource_universal_d_GetBusinessResourceRequest = GetBusinessResourceRequest;
  type bookingsCatalogV1Resource_universal_d_GetBusinessResourceResponse = GetBusinessResourceResponse;
  type bookingsCatalogV1Resource_universal_d_CreateResourceRequest = CreateResourceRequest;
  type bookingsCatalogV1Resource_universal_d_CreateResourceResponse = CreateResourceResponse;
  type bookingsCatalogV1Resource_universal_d_ResourceNotification = ResourceNotification;
  type bookingsCatalogV1Resource_universal_d_BatchCreateResourceRequest = BatchCreateResourceRequest;
  type bookingsCatalogV1Resource_universal_d_BatchCreateResourceResponse = BatchCreateResourceResponse;
  type bookingsCatalogV1Resource_universal_d_UpdateResourceRequest = UpdateResourceRequest;
  type bookingsCatalogV1Resource_universal_d_BatchRequest = BatchRequest;
  type bookingsCatalogV1Resource_universal_d_CreateScheduleRequest = CreateScheduleRequest;
  type bookingsCatalogV1Resource_universal_d_UpdateScheduleRequest = UpdateScheduleRequest;
  type bookingsCatalogV1Resource_universal_d_ParticipantNotification = ParticipantNotification;
  type bookingsCatalogV1Resource_universal_d_CancelScheduleRequest = CancelScheduleRequest;
  type bookingsCatalogV1Resource_universal_d_UpdateResourceResponse = UpdateResourceResponse;
  type bookingsCatalogV1Resource_universal_d_BatchResponse = BatchResponse;
  type bookingsCatalogV1Resource_universal_d_ResourceUpdateScheduleRequest = ResourceUpdateScheduleRequest;
  type bookingsCatalogV1Resource_universal_d_UpdateScheduleResponse = UpdateScheduleResponse;
  type bookingsCatalogV1Resource_universal_d_DeleteResourceRequest = DeleteResourceRequest;
  type bookingsCatalogV1Resource_universal_d_DeleteResourceResponse = DeleteResourceResponse;
  type bookingsCatalogV1Resource_universal_d_BatchDeleteResourceRequest = BatchDeleteResourceRequest;
  type bookingsCatalogV1Resource_universal_d_BatchDeleteResourceResponse = BatchDeleteResourceResponse;
  type bookingsCatalogV1Resource_universal_d_LinkResourceToUserRequest = LinkResourceToUserRequest;
  type bookingsCatalogV1Resource_universal_d_LinkResourceToUserResponse = LinkResourceToUserResponse;
  type bookingsCatalogV1Resource_universal_d_UnLinkResourceFromOwnerRequest = UnLinkResourceFromOwnerRequest;
  type bookingsCatalogV1Resource_universal_d_UnLinkResourceFromOwnerResponse = UnLinkResourceFromOwnerResponse;
  const bookingsCatalogV1Resource_universal_d_list: typeof list;
  type bookingsCatalogV1Resource_universal_d_ListOptions = ListOptions;
  const bookingsCatalogV1Resource_universal_d_queryResources: typeof queryResources;
  type bookingsCatalogV1Resource_universal_d_QueryResourcesOptions = QueryResourcesOptions;
  const bookingsCatalogV1Resource_universal_d_getBusinessResource: typeof getBusinessResource;
  const bookingsCatalogV1Resource_universal_d_createResource: typeof createResource;
  type bookingsCatalogV1Resource_universal_d_CreateResourceOptions = CreateResourceOptions;
  const bookingsCatalogV1Resource_universal_d_updateResource: typeof updateResource;
  type bookingsCatalogV1Resource_universal_d_UpdateResource = UpdateResource;
  type bookingsCatalogV1Resource_universal_d_UpdateResourceOptions = UpdateResourceOptions;
  const bookingsCatalogV1Resource_universal_d_updateSchedule: typeof updateSchedule;
  type bookingsCatalogV1Resource_universal_d_UpdateScheduleOptions = UpdateScheduleOptions;
  const bookingsCatalogV1Resource_universal_d_deleteResource: typeof deleteResource;
  const bookingsCatalogV1Resource_universal_d_batchDelete: typeof batchDelete;
  const bookingsCatalogV1Resource_universal_d_linkResourceToUser: typeof linkResourceToUser;
  type bookingsCatalogV1Resource_universal_d_LinkResourceToUserOptions = LinkResourceToUserOptions;
  const bookingsCatalogV1Resource_universal_d_unLinkResourceFromOwner: typeof unLinkResourceFromOwner;
  namespace bookingsCatalogV1Resource_universal_d {
    export {
      bookingsCatalogV1Resource_universal_d_Resource as Resource,
      bookingsCatalogV1Resource_universal_d_Schedule as Schedule,
      bookingsCatalogV1Resource_universal_d_RecurringInterval as RecurringInterval,
      bookingsCatalogV1Resource_universal_d_Interval as Interval,
      bookingsCatalogV1Resource_universal_d_Day as Day,
      bookingsCatalogV1Resource_universal_d_Frequency as Frequency,
      bookingsCatalogV1Resource_universal_d_LinkedSchedule as LinkedSchedule,
      bookingsCatalogV1Resource_universal_d_Transparency as Transparency,
      bookingsCatalogV1Resource_universal_d_RecurringIntervalType as RecurringIntervalType,
      bookingsCatalogV1Resource_universal_d_Location as Location,
      bookingsCatalogV1Resource_universal_d_LocationType as LocationType,
      bookingsCatalogV1Resource_universal_d_Address as Address,
      bookingsCatalogV1Resource_universal_d_AddressStreetOneOf as AddressStreetOneOf,
      bookingsCatalogV1Resource_universal_d_StreetAddress as StreetAddress,
      bookingsCatalogV1Resource_universal_d_AddressLocation as AddressLocation,
      bookingsCatalogV1Resource_universal_d_Subdivision as Subdivision,
      bookingsCatalogV1Resource_universal_d_LocationsLocation as LocationsLocation,
      bookingsCatalogV1Resource_universal_d_LocationStatus as LocationStatus,
      bookingsCatalogV1Resource_universal_d_LocationsLocationType as LocationsLocationType,
      bookingsCatalogV1Resource_universal_d_LocationsAddress as LocationsAddress,
      bookingsCatalogV1Resource_universal_d_LocationsStreetAddress as LocationsStreetAddress,
      bookingsCatalogV1Resource_universal_d_LocationsAddressLocation as LocationsAddressLocation,
      bookingsCatalogV1Resource_universal_d_BusinessSchedule as BusinessSchedule,
      bookingsCatalogV1Resource_universal_d_TimePeriod as TimePeriod,
      bookingsCatalogV1Resource_universal_d_DayOfWeek as DayOfWeek,
      bookingsCatalogV1Resource_universal_d_SpecialHourPeriod as SpecialHourPeriod,
      bookingsCatalogV1Resource_universal_d_Rate as Rate,
      bookingsCatalogV1Resource_universal_d_Price as Price,
      bookingsCatalogV1Resource_universal_d_Availability as Availability,
      bookingsCatalogV1Resource_universal_d_AvailabilityConstraints as AvailabilityConstraints,
      bookingsCatalogV1Resource_universal_d_SplitInterval as SplitInterval,
      bookingsCatalogV1Resource_universal_d_Participant as Participant,
      bookingsCatalogV1Resource_universal_d_ApprovalStatus as ApprovalStatus,
      bookingsCatalogV1Resource_universal_d_ExternalCalendarOverrides as ExternalCalendarOverrides,
      bookingsCatalogV1Resource_universal_d_ScheduleStatus as ScheduleStatus,
      bookingsCatalogV1Resource_universal_d_Version as Version,
      bookingsCatalogV1Resource_universal_d_ConferenceProvider as ConferenceProvider,
      bookingsCatalogV1Resource_universal_d_CalendarConference as CalendarConference,
      bookingsCatalogV1Resource_universal_d_ConferenceType as ConferenceType,
      bookingsCatalogV1Resource_universal_d_ResourceStatus as ResourceStatus,
      bookingsCatalogV1Resource_universal_d_BusinessLocation as BusinessLocation,
      bookingsCatalogV1Resource_universal_d_ListResourcesRequest as ListResourcesRequest,
      bookingsCatalogV1Resource_universal_d_Query as Query,
      bookingsCatalogV1Resource_universal_d_Sorting as Sorting,
      bookingsCatalogV1Resource_universal_d_SortOrder as SortOrder,
      bookingsCatalogV1Resource_universal_d_Paging as Paging,
      bookingsCatalogV1Resource_universal_d_ListResourcesResponse as ListResourcesResponse,
      bookingsCatalogV1Resource_universal_d_QueryMetaData as QueryMetaData,
      bookingsCatalogV1Resource_universal_d_PagingMetadataV2 as PagingMetadataV2,
      bookingsCatalogV1Resource_universal_d_Cursors as Cursors,
      bookingsCatalogV1Resource_universal_d_QueryResourcesRequest as QueryResourcesRequest,
      bookingsCatalogV1Resource_universal_d_QueryV2 as QueryV2,
      bookingsCatalogV1Resource_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf,
      bookingsCatalogV1Resource_universal_d_CursorPaging as CursorPaging,
      bookingsCatalogV1Resource_universal_d_QueryResourcesResponse as QueryResourcesResponse,
      bookingsCatalogV1Resource_universal_d_GetBusinessResourceRequest as GetBusinessResourceRequest,
      bookingsCatalogV1Resource_universal_d_GetBusinessResourceResponse as GetBusinessResourceResponse,
      bookingsCatalogV1Resource_universal_d_CreateResourceRequest as CreateResourceRequest,
      bookingsCatalogV1Resource_universal_d_CreateResourceResponse as CreateResourceResponse,
      bookingsCatalogV1Resource_universal_d_ResourceNotification as ResourceNotification,
      Event$1 as Event,
      bookingsCatalogV1Resource_universal_d_BatchCreateResourceRequest as BatchCreateResourceRequest,
      bookingsCatalogV1Resource_universal_d_BatchCreateResourceResponse as BatchCreateResourceResponse,
      bookingsCatalogV1Resource_universal_d_UpdateResourceRequest as UpdateResourceRequest,
      bookingsCatalogV1Resource_universal_d_BatchRequest as BatchRequest,
      bookingsCatalogV1Resource_universal_d_CreateScheduleRequest as CreateScheduleRequest,
      bookingsCatalogV1Resource_universal_d_UpdateScheduleRequest as UpdateScheduleRequest,
      bookingsCatalogV1Resource_universal_d_ParticipantNotification as ParticipantNotification,
      bookingsCatalogV1Resource_universal_d_CancelScheduleRequest as CancelScheduleRequest,
      bookingsCatalogV1Resource_universal_d_UpdateResourceResponse as UpdateResourceResponse,
      bookingsCatalogV1Resource_universal_d_BatchResponse as BatchResponse,
      bookingsCatalogV1Resource_universal_d_ResourceUpdateScheduleRequest as ResourceUpdateScheduleRequest,
      bookingsCatalogV1Resource_universal_d_UpdateScheduleResponse as UpdateScheduleResponse,
      bookingsCatalogV1Resource_universal_d_DeleteResourceRequest as DeleteResourceRequest,
      bookingsCatalogV1Resource_universal_d_DeleteResourceResponse as DeleteResourceResponse,
      bookingsCatalogV1Resource_universal_d_BatchDeleteResourceRequest as BatchDeleteResourceRequest,
      bookingsCatalogV1Resource_universal_d_BatchDeleteResourceResponse as BatchDeleteResourceResponse,
      bookingsCatalogV1Resource_universal_d_LinkResourceToUserRequest as LinkResourceToUserRequest,
      bookingsCatalogV1Resource_universal_d_LinkResourceToUserResponse as LinkResourceToUserResponse,
      bookingsCatalogV1Resource_universal_d_UnLinkResourceFromOwnerRequest as UnLinkResourceFromOwnerRequest,
      bookingsCatalogV1Resource_universal_d_UnLinkResourceFromOwnerResponse as UnLinkResourceFromOwnerResponse,
      MessageEnvelope$1 as MessageEnvelope,
      IdentificationData$1 as IdentificationData,
      IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf,
      WebhookIdentityType$1 as WebhookIdentityType,
      bookingsCatalogV1Resource_universal_d_list as list,
      bookingsCatalogV1Resource_universal_d_ListOptions as ListOptions,
      bookingsCatalogV1Resource_universal_d_queryResources as queryResources,
      bookingsCatalogV1Resource_universal_d_QueryResourcesOptions as QueryResourcesOptions,
      bookingsCatalogV1Resource_universal_d_getBusinessResource as getBusinessResource,
      bookingsCatalogV1Resource_universal_d_createResource as createResource,
      bookingsCatalogV1Resource_universal_d_CreateResourceOptions as CreateResourceOptions,
      batchCreate$1 as batchCreate,
      BatchCreateOptions$1 as BatchCreateOptions,
      bookingsCatalogV1Resource_universal_d_updateResource as updateResource,
      bookingsCatalogV1Resource_universal_d_UpdateResource as UpdateResource,
      bookingsCatalogV1Resource_universal_d_UpdateResourceOptions as UpdateResourceOptions,
      bookingsCatalogV1Resource_universal_d_updateSchedule as updateSchedule,
      bookingsCatalogV1Resource_universal_d_UpdateScheduleOptions as UpdateScheduleOptions,
      bookingsCatalogV1Resource_universal_d_deleteResource as deleteResource,
      bookingsCatalogV1Resource_universal_d_batchDelete as batchDelete,
      bookingsCatalogV1Resource_universal_d_linkResourceToUser as linkResourceToUser,
      bookingsCatalogV1Resource_universal_d_LinkResourceToUserOptions as LinkResourceToUserOptions,
      bookingsCatalogV1Resource_universal_d_unLinkResourceFromOwner as unLinkResourceFromOwner,
    };
  }
  
  /** Categories are used to group multiple services together. A service must be associated with a category in order to be exposed in the Wix Bookings UI. */
  interface Category {
      /**
       * Category ID.
       * @readonly
       */
      _id?: string | null;
      /** Category name. */
      name?: string | null;
      /**
       * @internal
       * @internal
       * @internal
       */
      customProperties?: Record<string, string>;
      /**
       * @internal
       * @internal
       * @readonly
       */
      status?: Status;
      /**
       * @internal
       * @internal */
      sortOrder?: number | null;
  }
  enum Status {
      /** The category was created. */
      CREATED = "CREATED",
      /** The category was deleted. */
      DELETED = "DELETED"
  }
  interface ListCategoryRequest {
      /** Category IDs. */
      categoryIds?: string[];
      /**
       * @internal
       * @internal */
      includeDeleted?: boolean | null;
  }
  interface ListCategoryResponse {
      /** Category information. */
      categories?: Category[];
  }
  /** An event sent every time a category entity is changed. */
  interface CategoryNotification {
      category?: Category;
      event?: Event;
  }
  enum Event {
      Updated = "Updated",
      Deleted = "Deleted",
      Created = "Created"
  }
  interface CreateCategoryRequest {
      /** Category information. */
      category: Category;
  }
  interface CreateCategoryResponse {
      /** Category information. */
      category?: Category;
  }
  interface BatchCreateCategoryRequest {
      /** Category information. */
      categories?: Category[];
  }
  interface BatchCreateCategoryResponse {
      /** Category information. */
      categories?: Category[];
  }
  interface UpdateCategoryRequest {
      category: Category;
  }
  interface UpdateCategoryResponse {
      /** The updated category. */
      category?: Category;
  }
  interface DeleteCategoryRequest {
      /** Category ID. */
      _id: string | null;
      /** Cascade delete all the services in this category. Defaults to false (when false, the services will still exist but will not be accessible in the dashboard). */
      deleteServices?: boolean | null;
  }
  interface DeleteCategoryResponse {
      /** Deleted Category ID. */
      _id?: string | null;
  }
  interface BatchDeleteCategoryRequest {
      /** Category ID. */
      ids?: string[] | null;
  }
  interface BatchDeleteCategoryResponse {
  }
  interface BatchUpdateCategoryRequest {
      /** List of categories to be updated. */
      categories?: Category[];
      /**
       * Field mask of fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  interface BatchUpdateCategoryResponse {
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
   * Lists all categories.
   * @public
   * @documentationMaturity preview
   * @permissionId BOOKINGS.CATEGORIES_READ
   */
  function listCategories(options?: ListCategoriesOptions): Promise<ListCategoryResponse>;
  interface ListCategoriesOptions {
      /** Category IDs. */
      categoryIds?: string[];
      /** @internal */
      includeDeleted?: boolean | null;
  }
  /**
   * Creates a new category.
   * @param category - Category information.
   * @public
   * @documentationMaturity preview
   * @requiredField category
   * @requiredField category.name
   * @permissionId BOOKINGS.MANAGE_CATEGORIES
   * @adminMethod
   * @returns Category information.
   */
  function createCategory(category: Category): Promise<Category>;
  /**
   * Creates multiple new categories.
   * @internal
   * @documentationMaturity preview
   * @permissionId BOOKINGS.MANAGE_CATEGORIES
   * @adminMethod
   */
  function batchCreate(options?: BatchCreateOptions): Promise<BatchCreateCategoryResponse>;
  interface BatchCreateOptions {
      /** Category information. */
      categories?: Category[];
  }
  /**
   * Updates an existing category.
   * @param _id - Category ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField category
   * @requiredField category.name
   * @permissionId BOOKINGS.MANAGE_CATEGORIES
   * @adminMethod
   */
  function updateCategory(_id: string | null, category: UpdateCategory): Promise<UpdateCategoryResponse>;
  interface UpdateCategory {
      /**
       * Category ID.
       * @readonly
       */
      _id?: string | null;
      /** Category name. */
      name?: string | null;
      /**
       * @internal
       * @internal
       */
      customProperties?: Record<string, string>;
      /**
       * @internal
       * @readonly
       */
      status?: Status;
      /** @internal */
      sortOrder?: number | null;
  }
  /**
   * Deletes a category.
   * When deleting a category, you have the option to delete all the associated services within this category using the `deleteServices` field in the request.
   * @param _id - Category ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId BOOKINGS.MANAGE_CATEGORIES
   * @adminMethod
   */
  function deleteCategory(_id: string | null, options?: DeleteCategoryOptions): Promise<DeleteCategoryResponse>;
  interface DeleteCategoryOptions {
      /** Cascade delete all the services in this category. Defaults to false (when false, the services will still exist but will not be accessible in the dashboard). */
      deleteServices?: boolean | null;
  }
  /**
   * Updates multiple categories.
   * @internal
   * @documentationMaturity preview
   * @requiredField options.categories._id
   * @permissionId BOOKINGS.MANAGE_CATEGORIES
   * @adminMethod
   */
  function batchUpdate(options?: BatchUpdateOptions): Promise<void>;
  interface BatchUpdateOptions {
      /** List of categories to be updated. */
      categories?: Category[];
      /**
       * Field mask of fields to update.
       * @internal
       */
      fieldMask?: string[];
  }
  
  type bookingsV1Category_universal_d_Category = Category;
  type bookingsV1Category_universal_d_Status = Status;
  const bookingsV1Category_universal_d_Status: typeof Status;
  type bookingsV1Category_universal_d_ListCategoryRequest = ListCategoryRequest;
  type bookingsV1Category_universal_d_ListCategoryResponse = ListCategoryResponse;
  type bookingsV1Category_universal_d_CategoryNotification = CategoryNotification;
  type bookingsV1Category_universal_d_Event = Event;
  const bookingsV1Category_universal_d_Event: typeof Event;
  type bookingsV1Category_universal_d_CreateCategoryRequest = CreateCategoryRequest;
  type bookingsV1Category_universal_d_CreateCategoryResponse = CreateCategoryResponse;
  type bookingsV1Category_universal_d_BatchCreateCategoryRequest = BatchCreateCategoryRequest;
  type bookingsV1Category_universal_d_BatchCreateCategoryResponse = BatchCreateCategoryResponse;
  type bookingsV1Category_universal_d_UpdateCategoryRequest = UpdateCategoryRequest;
  type bookingsV1Category_universal_d_UpdateCategoryResponse = UpdateCategoryResponse;
  type bookingsV1Category_universal_d_DeleteCategoryRequest = DeleteCategoryRequest;
  type bookingsV1Category_universal_d_DeleteCategoryResponse = DeleteCategoryResponse;
  type bookingsV1Category_universal_d_BatchDeleteCategoryRequest = BatchDeleteCategoryRequest;
  type bookingsV1Category_universal_d_BatchDeleteCategoryResponse = BatchDeleteCategoryResponse;
  type bookingsV1Category_universal_d_BatchUpdateCategoryRequest = BatchUpdateCategoryRequest;
  type bookingsV1Category_universal_d_BatchUpdateCategoryResponse = BatchUpdateCategoryResponse;
  type bookingsV1Category_universal_d_MessageEnvelope = MessageEnvelope;
  type bookingsV1Category_universal_d_IdentificationData = IdentificationData;
  type bookingsV1Category_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type bookingsV1Category_universal_d_WebhookIdentityType = WebhookIdentityType;
  const bookingsV1Category_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const bookingsV1Category_universal_d_listCategories: typeof listCategories;
  type bookingsV1Category_universal_d_ListCategoriesOptions = ListCategoriesOptions;
  const bookingsV1Category_universal_d_createCategory: typeof createCategory;
  const bookingsV1Category_universal_d_batchCreate: typeof batchCreate;
  type bookingsV1Category_universal_d_BatchCreateOptions = BatchCreateOptions;
  const bookingsV1Category_universal_d_updateCategory: typeof updateCategory;
  type bookingsV1Category_universal_d_UpdateCategory = UpdateCategory;
  const bookingsV1Category_universal_d_deleteCategory: typeof deleteCategory;
  type bookingsV1Category_universal_d_DeleteCategoryOptions = DeleteCategoryOptions;
  const bookingsV1Category_universal_d_batchUpdate: typeof batchUpdate;
  type bookingsV1Category_universal_d_BatchUpdateOptions = BatchUpdateOptions;
  namespace bookingsV1Category_universal_d {
    export {
      bookingsV1Category_universal_d_Category as Category,
      bookingsV1Category_universal_d_Status as Status,
      bookingsV1Category_universal_d_ListCategoryRequest as ListCategoryRequest,
      bookingsV1Category_universal_d_ListCategoryResponse as ListCategoryResponse,
      bookingsV1Category_universal_d_CategoryNotification as CategoryNotification,
      bookingsV1Category_universal_d_Event as Event,
      bookingsV1Category_universal_d_CreateCategoryRequest as CreateCategoryRequest,
      bookingsV1Category_universal_d_CreateCategoryResponse as CreateCategoryResponse,
      bookingsV1Category_universal_d_BatchCreateCategoryRequest as BatchCreateCategoryRequest,
      bookingsV1Category_universal_d_BatchCreateCategoryResponse as BatchCreateCategoryResponse,
      bookingsV1Category_universal_d_UpdateCategoryRequest as UpdateCategoryRequest,
      bookingsV1Category_universal_d_UpdateCategoryResponse as UpdateCategoryResponse,
      bookingsV1Category_universal_d_DeleteCategoryRequest as DeleteCategoryRequest,
      bookingsV1Category_universal_d_DeleteCategoryResponse as DeleteCategoryResponse,
      bookingsV1Category_universal_d_BatchDeleteCategoryRequest as BatchDeleteCategoryRequest,
      bookingsV1Category_universal_d_BatchDeleteCategoryResponse as BatchDeleteCategoryResponse,
      bookingsV1Category_universal_d_BatchUpdateCategoryRequest as BatchUpdateCategoryRequest,
      bookingsV1Category_universal_d_BatchUpdateCategoryResponse as BatchUpdateCategoryResponse,
      bookingsV1Category_universal_d_MessageEnvelope as MessageEnvelope,
      bookingsV1Category_universal_d_IdentificationData as IdentificationData,
      bookingsV1Category_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      bookingsV1Category_universal_d_WebhookIdentityType as WebhookIdentityType,
      bookingsV1Category_universal_d_listCategories as listCategories,
      bookingsV1Category_universal_d_ListCategoriesOptions as ListCategoriesOptions,
      bookingsV1Category_universal_d_createCategory as createCategory,
      bookingsV1Category_universal_d_batchCreate as batchCreate,
      bookingsV1Category_universal_d_BatchCreateOptions as BatchCreateOptions,
      bookingsV1Category_universal_d_updateCategory as updateCategory,
      bookingsV1Category_universal_d_UpdateCategory as UpdateCategory,
      bookingsV1Category_universal_d_deleteCategory as deleteCategory,
      bookingsV1Category_universal_d_DeleteCategoryOptions as DeleteCategoryOptions,
      bookingsV1Category_universal_d_batchUpdate as batchUpdate,
      bookingsV1Category_universal_d_BatchUpdateOptions as BatchUpdateOptions,
    };
  }
  
  export { bookingsV1Category_universal_d as categories, bookingsCatalogV1Resource_universal_d as resources };
}
