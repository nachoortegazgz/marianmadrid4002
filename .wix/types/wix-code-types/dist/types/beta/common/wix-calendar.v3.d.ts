declare module "wix-calendar.v3" {
  /**
   * An event is a scheduled entry on a calendar that includes details like timing,
   * location, and participants. Each event is associated with
   * a [schedule](https://dev.wix.com/docs/rest/business-management/calendar/schedules-v3/introduction),
   * from which it may [inherit default values](https://dev.wix.com/docs/rest/business-management/calendar/default-values).
   * Events can either be standalone, part of a recurring series, or define a
   * recurrence pattern. You can also specify whether events block time on the
   * schedule or allow other events to be scheduled concurrently.
   */
  interface Event$1 {
      /**
       * Event ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * ID of the [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction)
       * the event belongs to.
       * After creating an event, you can't assign it to a different schedule.
       */
      scheduleId?: string | null;
      /**
       * ID of the external schedule the event belongs to.
       *
       * For example, if the event belongs to a Bookings staff member, identical to the ID of the [resource](https://dev.wix.com/docs/sdk/backend-modules/bookings/resources/introduction). If the schedule belongs to a Bookings service, identical to the ID of the [service](https://dev.wix.com/docs/sdk/backend-modules/bookings/services/setup).
       * @readonly
       */
      externalScheduleId?: string | null;
      /**
       * Schedule name.
       * @readonly
       */
      scheduleName?: string | null;
      /**
       * Event type. You can set the event type but you can't update it.
       *
       * Supported values:
       * + `DEFAULT`: A standard event that's not further specified.
       * + `WORKING_HOURS`: The event adds working hours to a schedule. By default not returned in [queryEvents()](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/query-events).
       *
       * Additional supported values, if Wix Bookings is installed:
       * + `APPOINTMENT`: Bookings appointment event.
       * + `CLASS`: Bookings class event.
       * + `COURSE`: Bookings course event.
       */
      type?: string | null;
      /**
       * Event status.
       *
       * Supported values:
       * + `CONFIRMED`: Event is scheduled to happen or has happened.
       * + `CANCELLED`: Event has been canceled.
       *
       * Default: `CONFIRMED`
       * @readonly
       */
      status?: Status$4;
      /**
       * Event title.
       *
       * Min: 1 character
       * Max: 200 characters
       */
      title?: string | null;
      /** Information about when the event starts. */
      start?: ZonedDate$2;
      /**
       * Information about when the event ends.
       *
       * Maximum allowed date: Year 2100, or up to 100 years from the event's start date (whichever comes first).
       */
      end?: ZonedDate$2;
      /**
       * Information about when the event starts adjusted to the `timeZone` of the
       * business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties)
       * or a different `timeZone` you provide in the call's request.
       * @readonly
       */
      adjustedStart?: ZonedDate$2;
      /**
       * Information about when the event ends adjusted to the `timeZone` of the
       * business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties)
       * or a different `timeZone` you provide in the call's request.
       * @readonly
       */
      adjustedEnd?: ZonedDate$2;
      /**
       * Time zone the event is associated with in
       * [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database).
       * Only regional time zones and UTC are supported.
       * For example, `America/New_York` or `UTC`.
       *
       * Default: `timeZone` of the [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction).
       */
      timeZone?: string | null;
      /**
       * Information about whether the event is a single occurrence or part of a
       * recurring series.
       *
       * Supported values:
       * + `NONE`: The event occurs only once and doesn't repeat.
       * + `MASTER`: Defines the recurrence pattern for a series of recurring events.
       * + `INSTANCE`: A specific occurrence of a recurring event. You can't create an event with `{"recurrenceType": "INSTANCE"}`, instead it's automatically generated based on the recurrence rule. If you update an `INSTANCE` event, `recurrenceType` automatically changes to `EXCEPTION`.
       * + `EXCEPTION`: A modified instance of a recurring event that differs from the recurrence pattern. For example, an event with a different time or location. You can't create an `EXCEPTION` event directly, instead it's set automatically when you update an `INSTANCE` event.
       *
       * Default: `NONE`
       * @readonly
       */
      recurrenceType?: RecurrenceType$1;
      /**
       * Recurrence pattern for a series of events. This field is required when
       * creating a `MASTER` event and isn't available for non-recurring events.
       * You can't update the recurrence rule for `INSTANCE` or `EXCEPTION` events.
       *
       * For example, an event that repeats every second Monday until January 7, 2026,
       * at 8:00 AM has the following `recurrenceRule`:
       * - `frequency = WEEKLY`
       * - `interval = 2`
       * - `days = [MONDAY]`
       * - `until = 20260107T08:00:00Z`
       */
      recurrenceRule?: RecurrenceRule$1;
      /**
       * ID of the `MASTER` event the event belongs to. Available only for `INSTANCE`
       * and `EXCEPTION` events.
       * @readonly
       */
      recurringEventId?: string | null;
      /**
       * Specifies whether the event blocks time in the schedule it belongs to.
       *
       * Supported values:
       * + `OPAQUE`:  The schedule is blocked during the event, preventing other events that involve the same entities (for example, Booking staff members) from being scheduled at the same time.
       * + `TRANSPARENT`: The schedule remains open during the event, allowing other events to be scheduled concurrently.
       *
       * Default: `OPAQUE`
       */
      transparency?: Transparency$1;
      /**
       * Event location.
       *
       * Default: `defaultLocation` of the [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction) the event belongs to
       */
      location?: Location$2;
      /**
       * List of [Wix Bookings resources](https://dev.wix.com/docs/sdk/backend-modules/bookings/resources/introduction)
       * affected by the event. This could include, for example, the
       * [Wix Bookings staff member](https://dev.wix.com/docs/sdk/backend-modules/bookings/staff-members/introduction)
       * providing the service or the room where the appointment takes place.
       *
       * Max: 100 resources
       */
      resources?: Resource$1[];
      /**
       * Maximum number of participants who can participate in the event.
       *
       * Default: `defaultCapacity` of the [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction) the event belongs to.
       */
      totalCapacity?: number | null;
      /**
       * Number of participants who can still be added to the event.
       * @readonly
       */
      remainingCapacity?: number | null;
      /**
       * Information about the event's participants.
       * Returned only if explicitly requested. For more details, see the [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions#retrieve-personal-information).
       * @readonly
       */
      participants?: Participants$1;
      /**
       * Information about the event's online conferencing.
       * Returned only if explicitly requested. For more details, see the [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions#retrieve-personal-information).
       *
       * Default: `defaultConferencingDetails` of the [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction) the event belongs to.
       */
      conferencingDetails?: ConferencingDetails$2;
      /**
       * Additional notes about the event.
       * Returned only if explicitly requested. For more details, see the [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions#retrieve-personal-information).
       *
       * Min: 1 character
       * Max: 5000 characters
       */
      notes?: string | null;
      /**
       * List of fields whose values are inherited.
       * + For single-occurrence events, values are inherited from the [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction).
       * + For `INSTANCE` and `EXCEPTION` events, values are inherited from the related `MASTER` event.
       * @readonly
       */
      inheritedFields?: Field$1[];
      /**
       * ID of the app that owns the event. Identical to `appId` of the
       * [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction)
       * to which the event belongs.
       * @readonly
       */
      appId?: string | null;
      /**
       * List of permissions associated with the event. Refer to the
       * [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions#roles)
       * for more information.
       * @readonly
       */
      permissions?: Permission$2[];
      /** Extensions enabling applications or users to save custom data related to the event. */
      extendedFields?: ExtendedFields$3;
      /**
       * Revision number, which increments each time the event is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the event.
       * Ignored when creating an event.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date the event was created in `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date the event was last updated in `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  enum Status$4 {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      /** Event is scheduled to happen or has happened. */
      CONFIRMED = "CONFIRMED",
      /** DEPRECATED! AND WILL BE REMOVED SOON */
      PENDING_CONFIRMATION = "PENDING_CONFIRMATION",
      /** Event has been canceled. */
      CANCELLED = "CANCELLED"
  }
  /** A date time with a time zone, having the UTC offset and date determined by the server. */
  interface ZonedDate$2 {
      /**
       * Local date time in [ISO-8601 format](https://en.wikipedia.org/wiki/ISO_8601).
       * For example, `2024-01-30T13:30:00`.
       * Wix Calendar APIs ignore seconds.
       */
      localDate?: string | null;
      /**
       * Time zone in
       * [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database).
       * For example, `America/New_York`.
       * @readonly
       */
      timeZone?: string | null;
      /**
       * UTC date time in [ISO-8601 format](https://en.wikipedia.org/wiki/ISO_8601).
       * For example, `2024-01-30T13:30:00`.
       * Not available for adjusted date fields.
       * @readonly
       */
      utcDate?: Date | null;
  }
  enum RecurrenceType$1 {
      UNKNOWN_RECURRENCE_TYPE = "UNKNOWN_RECURRENCE_TYPE",
      /** The event occurs only once and doesn't repeat. */
      NONE = "NONE",
      /** Defines the recurrence pattern for a series of recurring events. */
      MASTER = "MASTER",
      /** A specific occurrence of a recurring event. You can't create an event with `{"recurrenceType": "INSTANCE"}`, instead it's automatically generated based on the recurrence rule. If you update an `INSTANCE` event, `recurrenceType` automatically changes to `EXCEPTION`. */
      INSTANCE = "INSTANCE",
      /** A modified instance of a recurring event that differs from the recurrence pattern. For example, an event with a different time or location. You can't create an `EXCEPTION` event directly, instead it's set automatically when you update an `INSTANCE` event. */
      EXCEPTION = "EXCEPTION"
  }
  interface RecurrenceRule$1 {
      /**
       * Frequency how often the event repeats. Works together with `interval`.
       *
       * Supported values:
       * + `WEEKLY`: The event's recurrence pattern is based on weeks.
       */
      frequency?: Frequency$1;
      /**
       * Interval how often the event repeats. Works together with `frequency`.
       * For example, `frequency` set to `WEEKLY`  and `interval` set to `2` means
       * the event repeats every 2 weeks.
       *
       * Min: `1`
       * Max: `4`
       * Default: `1`
       */
      interval?: number | null;
      /**
       * Days of the week when the recurring event takes place.
       * Currently, only a single day is supported.
       *
       * Min: 1 day
       * Max: 1 day
       */
      days?: Day$1[];
      /**
       * Date until when the event repeats.
       * If not specified, the event repeats forever.
       */
      until?: ZonedDate$2;
      /**
       * Date until when the event repeats
       * adjusted to the `timeZone` of the business
       * [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties)
       * or a different `timeZone` you provide in the call's request.
       * @readonly
       */
      adjustedUntil?: ZonedDate$2;
  }
  enum Frequency$1 {
      UNKNOWN_FREQUENCY = "UNKNOWN_FREQUENCY",
      /** The event's recurrence pattern is based on weeks. */
      WEEKLY = "WEEKLY"
  }
  enum Day$1 {
      /** The recurring event takes place on Mondays. */
      MONDAY = "MONDAY",
      /** The recurring event takes place on Tuesdays. */
      TUESDAY = "TUESDAY",
      /** The recurring event takes place on Wednesday. */
      WEDNESDAY = "WEDNESDAY",
      /** The recurring event takes place on Thursdays. */
      THURSDAY = "THURSDAY",
      /** The recurring event takes place on Fridays. */
      FRIDAY = "FRIDAY",
      /** The recurring event takes place on Saturdays. */
      SATURDAY = "SATURDAY",
      /** The recurring event takes place on Sundays. */
      SUNDAY = "SUNDAY"
  }
  enum Transparency$1 {
      UNKNOWN_TRANSPARENCY = "UNKNOWN_TRANSPARENCY",
      /** The schedule is blocked during the event, preventing other events that involve the same entities (for example, Booking staff members) from being scheduled at the same time. */
      OPAQUE = "OPAQUE",
      /** The schedule remains open during the event, allowing other events to be scheduled concurrently. */
      TRANSPARENT = "TRANSPARENT"
  }
  interface Location$2 {
      /**
       * [Location](https://dev.wix.com/docs/rest/business-management/locations/location-object)
       * ID. Available only for `BUSINESS` locations.
       */
      _id?: string | null;
      /**
       * Location type.
       *
       * Supported values:
       * + `BUSINESS`: The event is held at a business location.
       * + `CUSTOMER`: The event is held at the customer's location, such as their home or office.
       * + `CUSTOM`: The event is held at an address or venue not tied to the business or customer.
       */
      type?: LocationType$2;
      /**
       * Location name. For `BUSINESS` locations, it's identical to the
       * [location](https://dev.wix.com/docs/rest/business-management/locations/location-object)
       * `name`.
       *
       * Min: 1 character
       * Max: 150 characters
       */
      name?: string | null;
      /**
       * Location address. For `BUSINESS` locations, it's identical to the
       * [location](https://dev.wix.com/docs/rest/business-management/locations/location-object)'s
       * `formattedAddress`.
       */
      address?: string | null;
  }
  enum LocationType$2 {
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      /** The event is held at a business location. */
      BUSINESS = "BUSINESS",
      /** The event is held at the customer's location, such as their home or office. */
      CUSTOMER = "CUSTOMER",
      /** The event is held at an address or venue not tied to the business or customer. */
      CUSTOM = "CUSTOM"
  }
  interface Resource$1 {
      /** Resource ID. */
      _id?: string | null;
      /**
       * Resource name.
       * @readonly
       */
      name?: string | null;
      /**
       * Resource type.
       * @readonly
       */
      type?: string | null;
      /**
       * ID of the resource's [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction).
       * @internal
       * @readonly
       */
      scheduleId?: string | null;
      /**
       * Specifies whether the event blocks time in the resource's schedule.
       *
       * Supported values:
       * + `OPAQUE`: The schedule is blocked during the event, preventing other events that involve the same resource from being scheduled at the same time.
       * + `TRANSPARENT`: The schedule remains open during the event, allowing other events to be scheduled concurrently.
       *
       * Default: `OPAQUE`.
       */
      transparency?: Transparency$1;
      /**
       * Permission role associated with the resource. Refer to the
       * [permissions article](https://dev.wix.com/docs/rest/business-management/calendar/permissions#roles)
       * for more information.
       */
      permissionRole?: Role$2;
  }
  enum Role$2 {
      UNKNOWN_ROLE = "UNKNOWN_ROLE",
      /** Full read and write access. */
      WRITER = "WRITER",
      /** Full read access, write access limited to `event.notes`. */
      COMMENTER = "COMMENTER"
  }
  interface Participants$1 {
      /**
       * Total number of participants.
       *
       * Min: `0`
       */
      total?: number | null;
      /**
       * Full or partial list of the participants.
       *
       * Max: 50 participants
       */
      list?: Participant$2[];
      /**
       * Whether there are more participants for the event than listed.
       *
       * + `false`: The list includes all participants.
       * + `true`: The list doesn't include all participants.
       */
      hasMore?: boolean | null;
      /**
       * Participant's status.
       *
       * Supported values:
       * + `CONFIRMED`: All participants are confirmed.
       * + `PENDING_CONFIRMATION`: At least one participant isn't confirmed yet.
       */
      status?: ParticipantsStatus$1;
  }
  interface Participant$2 {
      /**
       * Participant name.
       *
       * Min: 1 character
       * Max: 200 characters
       */
      name?: string | null;
      /** Participant's phone number. */
      phone?: string | null;
      /** Participant's email address. */
      email?: string | null;
      /**
       * [Contact](https://dev.wix.com/docs/sdk/backend-modules/crm/contacts/introduction)
       * ID of the participant.
       */
      contactId?: string | null;
  }
  enum ParticipantsStatus$1 {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      /** All participants are confirmed. */
      CONFIRMED = "CONFIRMED",
      /** At least one participant isn't confirmed yet. */
      PENDING_CONFIRMATION = "PENDING_CONFIRMATION"
  }
  interface ConferencingDetails$2 {
      /** Conference type. For example, `Zoom`. */
      type?: Type$2;
      /**
       * URL used by the host to start the conference.
       *
       * Min: 1 character
       * Max: 2000 characters
       */
      hostUrl?: string | null;
      /**
       * URL used by a guest to join the conference.
       *
       * Min: 1 character
       * Max: 2000 characters
       */
      guestUrl?: string | null;
      /**
       * Conference password.
       *
       * Min: 1 character
       * Max: 100 characters
       */
      password?: string | null;
      /**
       * Conference description.
       *
       * Min: 1 character
       * Max: 200 characters
       * @internal
       */
      description?: string | null;
      /**
       * Conference ID in an external system.
       *
       * Min: 1 character
       * Max: 150 characters
       */
      externalId?: string | null;
  }
  enum Type$2 {
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      ZOOM = "ZOOM",
      CUSTOM = "CUSTOM"
  }
  enum Field$1 {
      UNKNOWN_FIELD = "UNKNOWN_FIELD",
      /** `title` is inherited from the schedule or `MASTER` event. */
      TITLE = "TITLE",
      /** `timeZone` is inherited from the schedule or `MASTER` event. */
      TIME_ZONE = "TIME_ZONE",
      /** `start` and `end` are inherited from the `MASTER` event. */
      TIME = "TIME",
      /** `location` is inherited from the schedule or `MASTER` event. */
      LOCATION = "LOCATION",
      /** `resources` is inherited from the `MASTER` event. */
      RESOURCES = "RESOURCES",
      /** `capacity` is inherited from the schedule or `MASTER` event. */
      CAPACITY = "CAPACITY",
      /** `participants` is inherited from the `MASTER` event. */
      PARTICIPANTS = "PARTICIPANTS",
      /** `conferencingDetails` is inherited from the schedule or `MASTER` event. */
      CONFERENCING_DETAILS = "CONFERENCING_DETAILS"
  }
  interface Permission$2 {
      /**
       * [Wix user](https://dev.wix.com/docs/build-apps/develop-your-app/access/about-identities#wix-users)
       * granted the permission.
       */
      identity?: IdentificationData$4;
      /**
       * Permission role.
       *
       * Supported values:
       * + `WRITER`: Full read and write access.
       * + `COMMENTER`: Full read access, write access limited to `event.notes`.
       */
      role?: Role$2;
  }
  interface IdentificationData$4 extends IdentificationDataIdOneOf$4 {
      /**
       * ID of a Wix user. For example, the site owner or a
       * [site collaborator](https://support.wix.com/en/article/inviting-people-to-contribute-to-your-site).
       */
      wixUserId?: string;
      /**
       * @internal
       * @readonly
       */
      identityType?: IdentityType$2;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$4 {
      /**
       * ID of a Wix user. For example, the site owner or a
       * [site collaborator](https://support.wix.com/en/article/inviting-people-to-contribute-to-your-site).
       */
      wixUserId?: string;
  }
  enum IdentityType$2 {
      UNKNOWN = "UNKNOWN",
      WIX_USER = "WIX_USER"
  }
  interface ExtendedFields$3 {
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
  interface FixSCHED38956Request {
      metaSiteId?: string;
      /**
       * Whether to run in safe, dry run mode, and only print logs without applying any changes.
       * Default to `true`!.
       */
      dryRun?: boolean | null;
  }
  interface FixSCHED38956Response {
      dryRun?: boolean | null;
      affectedEventCount?: number | null;
      fixedEventCount?: number | null;
  }
  interface GetEventRequest {
      /**
       * ID of the event to retrieve.
       *
       * Min: 36 characters
       * Max: 250 characters
       */
      eventId: string | null;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
      /**
       * Information about which fields containing personal data to return. Refer to the
       * [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions)
       * for more information.
       *
       * Supported values:
       * + `PI_FIELDS`: Returns all fields with personal data. Your app must have `Read Calendars - Including PI` or `Manage Calendars` permission scope.
       * + `OWN_PI_FIELDS`: Returns only fields containing your own personal data.
       *
       * Max: 1 field
       * Default: No personal data is returned.
       */
      fields?: RequestedFields$1[];
      /**
       * Whether to return consistent response.
       * Please consult with us at #bookings-calendar-platform if you think your case requires consistent reads.
       * @internal
       */
      consistent?: boolean | null;
  }
  enum RequestedFields$1 {
      UNKNOWN_REQUESTED_FIELDS = "UNKNOWN_REQUESTED_FIELDS",
      /** Returns all fields with personal data. Your app must have `Read Calendars - Including PI` or `Manage Calendars` permission scope. */
      PI_FIELDS = "PI_FIELDS",
      /** Returns only fields containing your own personal data. */
      OWN_PI_FIELDS = "OWN_PI_FIELDS"
  }
  interface GetEventResponse {
      /** Retrieved event. */
      event?: Event$1;
  }
  interface ListEventsRequest {
      /**
       * IDs of the events to retrieve.
       *
       * Min: 1 event ID
       * Min: 100 event IDs
       */
      eventIds: string[];
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/rest/business-management/site-properties/properties/get-site-properties).
       */
      timeZone?: string | null;
      /**
       * Information about which fields containing personal data to return. Refer to the
       * [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions)
       * for more information.
       *
       * Supported values:
       * + `PI_FIELDS`: Returns all fields with personal data. Your app must have `Read Calendars - Including PI` or `Manage Calendars` permission scope.
       * + `OWN_PI_FIELDS`: Returns only fields containing your own personal data.
       *
       * Max: 1 field
       * Default: No personal data is returned.
       */
      fields?: RequestedFields$1[];
      /**
       * Whether to return consistent response.
       * Please consult with us at #bookings-calendar-platform if you think your case requires consistent reads.
       * @internal
       */
      consistent?: boolean | null;
  }
  interface ListEventsResponse {
      /** Retrieved events matching the provided IDs. */
      events?: Event$1[];
  }
  interface QueryEventsRequest {
      /**
       * Local start date and time from which events are returned in
       * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format. For example,
       * `2024-01-30T13:30:00`.
       *
       * Events that start before the `fromLocalDate` but end after it are included in
       * the results. Must be earlier than `toLocalDate` unless the sort order is
       * descending.
       */
      fromLocalDate?: string | null;
      /**
       * Local end date and time up to which events are returned in
       * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format. For example,
       * `2024-01-30T13:30:00`.
       *
       * Events that start before `toLocalDate` but end after it are included in the
       * results. Must be later than `fromLocalDate` unless the sort order is
       * descending.
       */
      toLocalDate?: string | null;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for `fromLocalDate`, `toLocalDate`, and for calculating `adjustedStart` and
       * `adjustedEnd`. For example, `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/rest/business-management/site-properties/properties/get-site-properties).
       */
      timeZone?: string | null;
      /** Query containing filters and paging. */
      query?: CursorQuery$2;
      /**
       * Filters events based on their `recurrenceType`.
       *
       * Max: 5 recurrence types can be specified.
       * Default: Events with `recurrenceType` of `NONE`, `INSTANCE`, and `EXCEPTION` are returned.
       */
      recurrenceType?: RecurrenceType$1[];
      /**
       * Information about which fields containing personal data to return. Refer to the
       * [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions)
       * for more information.
       *
       * Supported values:
       * + `PI_FIELDS`: Returns all fields with personal data. Your app must have `Read Calendars - Including PI` or `Manage Calendars` permission scope.
       * + `OWN_PI_FIELDS`: Returns only fields containing your own personal data.
       *
       * Max: 1 field
       * Default: No personal data is returned.
       */
      fields?: RequestedFields$1[];
      /**
       * Whether to return consistent response.
       * Please consult with us at #bookings-calendar-platform if you think your case requires consistent reads.
       * @internal
       */
      consistent?: boolean | null;
  }
  /** TODO Diverge */
  interface CursorQuery$2 extends CursorQueryPagingMethodOneOf$2 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter`. */
      cursorPaging?: CommonCursorPaging;
      /**
       * Filter object.
       * See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language)
       * for more information.
       *
       * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`.
       *
       * For a detailed list of supported filters, see Supported Filters.
       */
      filter?: Record<string, any> | null;
      /**
       * Whether to sort events by their start date in ascending order or by their end date in descending order.
       * Default is start ascending.
       */
      sort?: Sorting[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$2 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter`. */
      cursorPaging?: CommonCursorPaging;
  }
  /** TODO Diverge */
  interface Sorting {
      /**
       * The field to sort by.
       * Either `start` or `end`.
       * Default is `start`.
       */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder;
  }
  enum SortOrder {
      ASC = "ASC",
      DESC = "DESC"
  }
  /** TODO Diverge */
  interface CommonCursorPaging {
      /**
       * Number of events to return.
       * Defaults to `50`. Maximum `1000`.
       */
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
  interface QueryEventsResponse {
      /** Retrieved events matching the provided query. */
      events?: Event$1[];
      /** Paging metadata. */
      pagingMetadata?: CommonCursorPagingMetadata;
  }
  /** TODO Diverge */
  interface CommonCursorPagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Use these cursor to paginate between results. [Read more](https://dev.wix.com/api/rest/getting-started/api-query-language#getting-started_api-query-language_cursor-paging). */
      cursors?: CommonCursors;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface CommonCursors {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
  }
  interface ListRecurringEventInstancesHistoryRequest {
      /**
       * The ID of the recurring event.
       * Required, unless `cursorPaging` is provided.
       */
      recurringEventId?: string | null;
      /**
       * The revision of the recurring event.
       * Required, unless `cursorPaging` is provided.
       */
      revision?: string | null;
      /**
       * Inclusive start date for which events are returned, in ISO-8601 format.
       * Events that begin at or after the `fromDate` are included in the results.
       * Required, unless `cursorPaging` is provided.
       */
      fromDate?: Date | null;
      /**
       * Exclusive end date for which events are returned, in ISO-8601 format.
       * Events that begin before the `toDate` are included in the results.
       * Required, unless `cursorPaging` is provided.
       */
      toDate?: Date | null;
      /** Optional cursor pointing to the next page of events. */
      cursorPaging?: CommonCursorPaging;
  }
  interface ListRecurringEventInstancesHistoryResponse {
      /** The recurring event instances. */
      recurringEventInstances?: Event$1[];
      /** Paging metadata. */
      pagingMetadata?: CommonCursorPagingMetadata;
  }
  interface CreateEventRequest {
      /** Event to create. */
      event: Event$1;
      /**
       * Optional list of fields to create or override.
       *
       * For example, to set empty values for fields that would otherwise be inherited from the schedule.
       * @internal
       */
      fieldmask?: string[];
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
      /**
       * Idempotency key guaranteeing that you don't create the same event more
       * than once.
       */
      idempotencyKey?: string | null;
  }
  interface CreateEventResponse {
      /** Created event. */
      event?: Event$1;
  }
  interface BulkCreateEventRequest {
      /** Events to create. */
      events: MaskedEvent[];
      /**
       * Whether to return created events.
       *
       * Default: `false`.
       */
      returnEntity?: boolean | null;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
  }
  interface MaskedEvent {
      /** Event to create. */
      event?: Event$1;
      /**
       * Optional list of fields to create or override.
       *
       * For example, to set empty values for fields that would otherwise be inherited from the schedule.
       * @internal
       */
      fieldmask?: string[];
  }
  interface BulkCreateEventResponse {
      /** The result for each event, containing the event and whether the action was successful. */
      results?: BulkEventResult[];
      /** Total successes and failures. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkEventResult {
      /** Whether the requested action was successful. */
      itemMetadata?: ItemMetadata;
      /** The event. */
      item?: Event$1;
  }
  interface ItemMetadata {
      /**
       * Event ID.
       * Should always be available, unless it's impossible (for example, when failing to create an event).
       */
      _id?: string | null;
      /** Index of the item within the request array, for correlation between request and response items. */
      originalIndex?: number;
      /**
       * Whether the requested action was successful for this event.
       * When `false`, the `error` field is populated.
       */
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
      /** Number of events that were successfully processed. */
      totalSuccesses?: number;
      /** Number of events that couldn't be processed. */
      totalFailures?: number;
  }
  interface UpdateEventRequest {
      /** Event to update. */
      event: Event$1;
      /**
       * Optional list of fields to update or override.
       *
       * For example, to set empty values for fields that would otherwise be inherited from the schedule.
       * @internal
       */
      fieldmask?: string[];
      /**
       * Information about whether participants of the updated event are notified and
       * the message they receive.
       */
      participantNotification?: ParticipantNotification$1;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
  }
  interface ParticipantNotification$1 {
      /**
       * Whether to notify the participants about changes made to the schedule or event.
       *
       * Default: `false`
       */
      notifyParticipants?: boolean | null;
      /**
       * Message to send.
       *
       * Min: 1 character
       * Max: 5000 characters
       */
      message?: string | null;
      /**
       * Optional additional metadata.
       * Limits: max keys: `10`, max key length: `64`, max value length: `1000`.
       * @internal
       */
      metadata?: Record<string, string>;
  }
  interface UpdateEventResponse {
      /** Updated event. */
      event?: Event$1;
  }
  /** `PRIVATE` until we'll have standard events metadata from Infra. */
  interface EventUpdatedWithMetadata {
      /** The updated event. */
      event?: Event$1;
      /**
       * Information about whether participants of the updated event are notified and
       * the message they receive.
       */
      participantNotification?: ParticipantNotification$1;
      /**
       * Temporary! will be replaced by diff very soon.
       * @internal
       * @deprecated
       */
      previousEvent?: Event$1;
  }
  interface BulkUpdateEventRequest {
      /**
       * Events to update.
       *
       * Min: 1 event
       * Max: 50 events
       */
      events: BulkUpdateEventRequestMaskedEvent[];
      /**
       * Whether to return the updated events.
       *
       * Default: `false`
       */
      returnEntity?: boolean | null;
      /**
       * Information about whether participants of the updated event are notified and
       * the message they receive.
       */
      participantNotification?: ParticipantNotification$1;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
  }
  interface BulkUpdateEventRequestMaskedEvent {
      /** Event to update. */
      event?: Event$1;
      /**
       * Optional list of fields to update or override.
       *
       * For example, to set empty values for fields that would otherwise be inherited from the schedule.
       * @internal
       */
      fieldmask?: string[];
  }
  interface BulkUpdateEventResponse {
      /** The result for each event, containing the event and whether the action was successful. */
      results?: BulkEventResult[];
      /** Total successes and failures. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface UpdateEventParticipantsRequest {
      /**
       * ID of the event to update.
       *
       * Min: 36 characters
       * Max: 250 characters
       */
      eventId?: string | null;
      /** The participants to update. */
      participants?: Participants$1;
  }
  interface UpdateEventParticipantsResponse {
      /** Updated event. */
      event?: Event$1;
  }
  interface RestoreEventDefaultsRequest {
      /** ID of the event for which to restore default values. */
      eventId: string | null;
      /**
       * Fields for which to restore default values.
       *
       * `TIME` restores default values for `start` and `end`.
       *
       * Min: 1 field
       */
      fields: Field$1[];
      /**
       * Information about whether participants of the updated event are notified and
       * the message they receive.
       */
      participantNotification?: ParticipantNotification$1;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
  }
  interface RestoreEventDefaultsResponse {
      /** Updated event. */
      event?: Event$1;
  }
  interface SplitRecurringEventRequest {
      /** ID of the `MASTER` event to split. */
      recurringEventId: string | null;
      /**
       * Local date and time at which the `MASTER` event is split in
       * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format. For example,
       * `2025-03-11T09:00:00`.
       * Must be a future date that's after the `start` date of the next `INSTANCE` or
       * `EXCEPTION` event in the series. Additionally, there must be another
       * `INSTANCE` or `EXCEPTION` event following this next event, as the changes
       * wouldn't affect any event without a subsequent occurrence.
       */
      splitLocalDate: string | null;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
  }
  interface SplitRecurringEventResponse {
      /** Original `MASTER` event that was shortened. */
      updatedRecurringEventEndingBeforeSplit?: Event$1;
      /** New `MASTER` event starting with the first event after the split date. */
      newRecurringEventStartingFromSplit?: Event$1;
  }
  interface RecurringEventSplit {
      /** Original `MASTER` event that was shortened. */
      updatedRecurringEventEndingBeforeSplit?: Event$1;
      /** New `MASTER` event starting with the first event after the split date. */
      newRecurringEventStartingFromSplit?: Event$1;
  }
  interface CancelEventRequest {
      /** ID of the event to cancel. */
      eventId: string | null;
      /**
       * Information about whether participants of the canceled event are notified and
       * the message they receive.
       */
      participantNotification?: ParticipantNotification$1;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
  }
  interface CancelEventResponse {
      /** Canceled event. */
      event?: Event$1;
  }
  interface EventCancelled {
      /** Canceled event. */
      event?: Event$1;
      /**
       * Information about whether participants of the canceled event are notified and
       * the message they receive.
       * @internal
       */
      participantNotification?: ParticipantNotification$1;
  }
  interface BulkCancelEventRequest {
      /** IDs of the events to cancel. */
      eventIds: string[];
      /**
       * Whether to return the canceled events.
       *
       * Default: `false`
       */
      returnEntity?: boolean | null;
      /**
       * Information about whether participants of the canceled events are notified and
       * the message they receive.
       */
      participantNotification?: ParticipantNotification$1;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
  }
  interface BulkCancelEventResponse {
      /** The result for each event, containing the event and whether the action was successful. */
      results?: BulkEventResult[];
      /** Total successes and failures. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface DomainEvent$4 extends DomainEventBodyOneOf$4 {
      createdEvent?: EntityCreatedEvent$4;
      updatedEvent?: EntityUpdatedEvent$4;
      deletedEvent?: EntityDeletedEvent$4;
      actionEvent?: ActionEvent$4;
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
  interface DomainEventBodyOneOf$4 {
      createdEvent?: EntityCreatedEvent$4;
      updatedEvent?: EntityUpdatedEvent$4;
      deletedEvent?: EntityDeletedEvent$4;
      actionEvent?: ActionEvent$4;
  }
  interface EntityCreatedEvent$4 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$4;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$4 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$4 {
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
  interface EntityDeletedEvent$4 {
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
  interface ActionEvent$4 {
      bodyAsJson?: string;
  }
  interface MessageEnvelope$4 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: WebhooksIdentificationData$2;
      /** Stringify payload. */
      data?: string;
  }
  interface WebhooksIdentificationData$2 extends WebhooksIdentificationDataIdOneOf$2 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$4;
  }
  /** @oneof */
  interface WebhooksIdentificationDataIdOneOf$2 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$4 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /** Encapsulates all details written to the Greyhound topic when a site's properties are updated. */
  interface SitePropertiesNotification$2 {
      /** The site ID for which this update notification applies. */
      metasiteId?: string;
      /** The actual update event. */
      event?: SitePropertiesEvent$2;
      /** A convenience set of mappings from the MetaSite ID to its constituent services. */
      translations?: Translation$2[];
      /** Context of the notification */
      changeContext?: ChangeContext$2;
  }
  /** The actual update event for a particular notification. */
  interface SitePropertiesEvent$2 {
      /** Version of the site's properties represented by this update. */
      version?: number;
      /**
       * Set of properties that were updated - corresponds to the fields in "properties".
       * @internal
       */
      fields?: string[];
      /** Updated properties. */
      properties?: Properties$2;
  }
  interface Properties$2 {
      /** Site categories. */
      categories?: Categories$2;
      /** Site locale. */
      locale?: Locale$2;
      /**
       * Site language.
       *
       * Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format.
       */
      language?: string | null;
      /**
       * Site currency format used to bill customers.
       *
       * Three-letter currency code in [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
       */
      paymentCurrency?: string | null;
      /** Timezone in `America/New_York` format. */
      timeZone?: string | null;
      /** Email address. */
      email?: string | null;
      /** Phone number. */
      phone?: string | null;
      /** Fax number. */
      fax?: string | null;
      /** Address. */
      address?: Address$2;
      /** Site display name. */
      siteDisplayName?: string | null;
      /** Business name. */
      businessName?: string | null;
      /** Path to the site's logo in Wix Media (without Wix Media base URL). */
      logo?: string | null;
      /** Site description. */
      description?: string | null;
      /**
       * Business schedule. Regular and exceptional time periods when the business is open or the service is available.
       *
       * __Note:__ Not supported by Wix Bookings.
       */
      businessSchedule?: BusinessSchedule$2;
      /** Supported languages of a site and the primary language. */
      multilingual?: Multilingual$2;
      /** Cookie policy the Wix user defined for their site (before the site visitor interacts with/limits it). */
      consentPolicy?: ConsentPolicy$2;
      /**
       * Supported values: `FITNESS SERVICE`, `RESTAURANT`, `BLOG`, `STORE`, `EVENT`, `UNKNOWN`.
       *
       * Site business type.
       */
      businessConfig?: string | null;
      /** External site URL that uses Wix as its headless business solution. */
      externalSiteUrl?: string | null;
      /** Track clicks analytics. */
      trackClicksAnalytics?: boolean;
  }
  interface Categories$2 {
      /** Primary site category. */
      primary?: string;
      /** Secondary site category. */
      secondary?: string[];
      /** Business Term Id */
      businessTermId?: string | null;
  }
  interface Locale$2 {
      /** Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. */
      languageCode?: string;
      /** Two-letter country code in [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) format. */
      country?: string;
  }
  interface Address$2 {
      /** Street name. */
      street?: string;
      /** City name. */
      city?: string;
      /** Two-letter country code in an [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. */
      country?: string;
      /** State. */
      state?: string;
      /** Zip or postal code. */
      zip?: string;
      /** Extra information to be displayed in the address. */
      hint?: AddressHint$2;
      /** Whether this address represents a physical location. */
      isPhysical?: boolean;
      /** Google-formatted version of this address. */
      googleFormattedAddress?: string;
      /** Street number. */
      streetNumber?: string;
      /** Apartment number. */
      apartmentNumber?: string;
      /** Geographic coordinates of location. */
      coordinates?: GeoCoordinates$2;
  }
  /**
   * Extra information on displayed addresses.
   * This is used for display purposes. Used to add additional data about the address, such as "In the passage".
   * Free text. In addition, the user can state where to display the additional description - before, after, or instead of the address string.
   */
  interface AddressHint$2 {
      /** Extra text displayed next to, or instead of, the actual address. */
      text?: string;
      /** Where the extra text should be displayed. */
      placement?: PlacementType$2;
  }
  /** Where the extra text should be displayed: before, after or instead of the actual address. */
  enum PlacementType$2 {
      BEFORE = "BEFORE",
      AFTER = "AFTER",
      REPLACE = "REPLACE"
  }
  /** Geocoordinates for a particular address. */
  interface GeoCoordinates$2 {
      /** Latitude of the location. Must be between -90 and 90. */
      latitude?: number;
      /** Longitude of the location. Must be between -180 and 180. */
      longitude?: number;
  }
  /** Business schedule. Regular and exceptional time periods when the business is open or the service is available. */
  interface BusinessSchedule$2 {
      /** Weekly recurring time periods when the business is regularly open or the service is available. Limited to 100 time periods. */
      periods?: TimePeriod$2[];
      /** Exceptions to the business's regular hours. The business can be open or closed during the exception. */
      specialHourPeriod?: SpecialHourPeriod$2[];
  }
  /** Weekly recurring time periods when the business is regularly open or the service is available. */
  interface TimePeriod$2 {
      /** Day of the week the period starts on. */
      openDay?: DayOfWeek$2;
      /**
       * Time the period starts in 24-hour [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) extended format. Valid values are `00:00` to `24:00`, where `24:00` represents
       * midnight at the end of the specified day.
       */
      openTime?: string;
      /** Day of the week the period ends on. */
      closeDay?: DayOfWeek$2;
      /**
       * Time the period ends in 24-hour [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) extended format. Valid values are `00:00` to `24:00`, where `24:00` represents
       * midnight at the end of the specified day.
       *
       * __Note:__ If `openDay` and `closeDay` specify the same day of the week `closeTime` must be later than `openTime`.
       */
      closeTime?: string;
  }
  /** Enumerates the days of the week. */
  enum DayOfWeek$2 {
      MONDAY = "MONDAY",
      TUESDAY = "TUESDAY",
      WEDNESDAY = "WEDNESDAY",
      THURSDAY = "THURSDAY",
      FRIDAY = "FRIDAY",
      SATURDAY = "SATURDAY",
      SUNDAY = "SUNDAY"
  }
  /** Exception to the business's regular hours. The business can be open or closed during the exception. */
  interface SpecialHourPeriod$2 {
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
  interface Multilingual$2 {
      /** Supported languages list. */
      supportedLanguages?: SupportedLanguage$2[];
      /** Whether to redirect to user language. */
      autoRedirect?: boolean;
  }
  interface SupportedLanguage$2 {
      /** Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. */
      languageCode?: string;
      /** Locale. */
      locale?: Locale$2;
      /** Whether the supported language is the primary language for the site. */
      isPrimary?: boolean;
      /** Language icon. */
      countryCode?: string;
      /** How the language will be resolved. For internal use. */
      resolutionMethod?: ResolutionMethod$2;
  }
  enum ResolutionMethod$2 {
      QUERY_PARAM = "QUERY_PARAM",
      SUBDOMAIN = "SUBDOMAIN",
      SUBDIRECTORY = "SUBDIRECTORY"
  }
  interface ConsentPolicy$2 {
      /** Whether the site uses cookies that are essential to site operation. */
      essential?: boolean | null;
      /** Whether the site uses cookies that affect site performance and other functional measurements. */
      functional?: boolean | null;
      /** Whether the site uses cookies that collect analytics about how the site is used (in order to improve it). */
      analytics?: boolean | null;
      /** Whether the site uses cookies that collect information allowing better customization of the experience for a current visitor. */
      advertising?: boolean | null;
      /** CCPA compliance flag. */
      dataToThirdParty?: boolean | null;
  }
  /** A single mapping from the MetaSite ID to a particular service. */
  interface Translation$2 {
      /** The service type. */
      serviceType?: string;
      /** The application definition ID; this only applies to services of type ThirdPartyApps. */
      appDefId?: string;
      /** The instance ID of the service. */
      instanceId?: string;
  }
  interface ChangeContext$2 extends ChangeContextPayloadOneOf$2 {
      /** Properties were updated. */
      propertiesChange?: PropertiesChange$2;
      /** Default properties were created on site creation. */
      siteCreated?: V4SiteCreated$2;
      /** Properties were cloned on site cloning. */
      siteCloned?: SiteCloned$2;
  }
  /** @oneof */
  interface ChangeContextPayloadOneOf$2 {
      /** Properties were updated. */
      propertiesChange?: PropertiesChange$2;
      /** Default properties were created on site creation. */
      siteCreated?: V4SiteCreated$2;
      /** Properties were cloned on site cloning. */
      siteCloned?: SiteCloned$2;
  }
  interface PropertiesChange$2 {
  }
  interface V4SiteCreated$2 {
      /** Origin template site id. */
      originTemplateId?: string | null;
  }
  interface SiteCloned$2 {
      /** Origin site id. */
      originMetaSiteId?: string;
  }
  interface Empty$4 {
  }
  interface ListEventsByContactIdRequest {
      /**
       * ID of the [contact](https://dev.wix.com/docs/rest/crm/members-contacts/contacts/contacts/contact-v4/contact-object)
       * to retrieve events for. Required, unless you provide `cursorPaging`.
       */
      contactId: string | null;
      /**
       * Local start date and time from which events are returned in
       * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format. For example,
       * `2024-01-30T13:30:00`. Required if `cursorPaging` isn't provided.
       *
       * Events that start before the `fromLocalDate` but end after it are included in
       * the results. Must be earlier than `toLocalDate`.
       */
      fromLocalDate?: string | null;
      /**
       * Local end date and time up to which events are returned in
       * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format. For example,
       * `2024-01-30T13:30:00`. Can't be more than a full year after
       * `2024-01-30T13:30:00`. Required if `cursorPaging` isn't provided.
       *
       * Events that start before `toLocalDate` but end after it are included in the
       * results. Must be later than `fromLocalDate`.
       */
      toLocalDate?: string | null;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for `fromLocalDate`, `toLocalDate`, and for calculating `adjustedStart` and
       * `adjustedEnd`. For example, `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/rest/business-management/site-properties/properties/get-site-properties).
       */
      timeZone?: string | null;
      /**
       * [App ID](https://dev.wix.com/docs/rest/articles/getting-started/wix-business-solutions)
       * to filter events by.
       */
      appId?: string | null;
      /** Cursor to retrieve the next page of the results. */
      cursorPaging?: CursorPaging$2;
  }
  /** TODO Diverge */
  interface CursorPaging$2 {
      /**
       * Number of events to return.
       * Defaults to `50`. Maximum `100`.
       */
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
  interface ListEventsByContactIdResponse {
      /** Retrieved events. */
      events?: Event$1[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata$2;
  }
  /** TODO Diverge */
  interface CursorPagingMetadata$2 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Use these cursor to paginate between results. [Read more](https://dev.wix.com/api/rest/getting-started/api-query-language#getting-started_api-query-language_cursor-paging). */
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
  }
  interface ListEventsByMemberIdRequest {
      /**
       * ID of the [member](https://dev.wix.com/docs/rest/crm/members-contacts/members/members/member-object)
       * to retrieve events for. Required, unless you provide `cursorPaging`.
       * Provide `me` to retrieve events for the currently logged-in member.
       * You must have the `Read Calendars - Including PI`
       * [permission scope](https://dev.wix.com/docs/build-apps/develop-your-app/access/authorization/configure-permissions-for-your-app)
       * to retrieve events for members who aren't the currently logged in member.
       */
      memberId: string | null;
      /**
       * Local start date and time from which events are returned in
       * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format. For example,
       * `2024-01-30T13:30:00`. Required if neither `cursorPaging` is provided nor a non-empty `eventIds` array.
       *
       * Events that start before the `fromLocalDate` but end after it are included in
       * the results. Must be earlier than `toLocalDate`.
       */
      fromLocalDate?: string | null;
      /**
       * Local end date and time up to which events are returned in
       * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format. For example,
       * `2024-01-30T13:30:00`. Can't be more than a full year after
       * `fromLocalDate`. Required if neither `cursorPaging` is provided nor a non-empty `eventIds` array.
       *
       * Events that start before `toLocalDate` but end after it are included in the
       * results. Must be later than `fromLocalDate`.
       */
      toLocalDate?: string | null;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for `fromLocalDate`, `toLocalDate`, and for calculating `adjustedStart` and
       * `adjustedEnd`. For example, `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/rest/business-management/site-properties/properties/get-site-properties).
       */
      timeZone?: string | null;
      /**
       * [App ID](https://dev.wix.com/docs/rest/articles/getting-started/wix-business-solutions)
       * to filter events by.
       */
      appId?: string | null;
      /** Cursor to retrieve the next page of the results. */
      cursorPaging?: CursorPaging$2;
      /**
       * IDs of the events to retrieve.
       * If you provide a list of IDs, all other filters are ignored.
       *
       * Max: 100 `eventId`s
       */
      eventIds?: string[];
  }
  interface ListEventsByMemberIdResponse {
      /** Retrieved events. */
      events?: Event$1[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata$2;
  }
  /**
   * Retrieves an event.
   * @param eventId - ID of the event to retrieve.
   *
   * Min: 36 characters
   * Max: 250 characters
   * @public
   * @documentationMaturity preview
   * @requiredField eventId
   * @permissionId CALENDAR.EVENT_READ
   * @permissionId CALENDAR.EVENT_READ_PI
   * @returns Retrieved event.
   */
  function getEvent(eventId: string | null, options?: GetEventOptions): Promise<Event$1>;
  interface GetEventOptions {
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
      /**
       * Information about which fields containing personal data to return. Refer to the
       * [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions)
       * for more information.
       *
       * Supported values:
       * + `PI_FIELDS`: Returns all fields with personal data. Your app must have `Read Calendars - Including PI` or `Manage Calendars` permission scope.
       * + `OWN_PI_FIELDS`: Returns only fields containing your own personal data.
       *
       * Max: 1 field
       * Default: No personal data is returned.
       */
      fields?: RequestedFields$1[];
      /**
       * Whether to return consistent response.
       * Please consult with us at #bookings-calendar-platform if you think your case requires consistent reads.
       * @internal
       */
      consistent?: boolean | null;
  }
  /**
   * Retrieves a list of events by their IDs.
   * @param eventIds - IDs of the events to retrieve.
   *
   * Min: 1 event ID
   * Min: 100 event IDs
   * @public
   * @documentationMaturity preview
   * @requiredField eventIds
   * @permissionId CALENDAR.EVENT_READ
   * @permissionId CALENDAR.EVENT_READ_PI
   */
  function listEvents(eventIds: string[], options?: ListEventsOptions): Promise<ListEventsResponse>;
  interface ListEventsOptions {
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/rest/business-management/site-properties/properties/get-site-properties).
       */
      timeZone?: string | null;
      /**
       * Information about which fields containing personal data to return. Refer to the
       * [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions)
       * for more information.
       *
       * Supported values:
       * + `PI_FIELDS`: Returns all fields with personal data. Your app must have `Read Calendars - Including PI` or `Manage Calendars` permission scope.
       * + `OWN_PI_FIELDS`: Returns only fields containing your own personal data.
       *
       * Max: 1 field
       * Default: No personal data is returned.
       */
      fields?: RequestedFields$1[];
      /**
       * Whether to return consistent response.
       * Please consult with us at #bookings-calendar-platform if you think your case requires consistent reads.
       * @internal
       */
      consistent?: boolean | null;
  }
  /**
   * Creates a query to retrieve a list of events.
   *
   * The `queryEvents()` function builds a query to retrieve a list of events and returns an `EventsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is typically used to run the query using the [find()](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/events-query-builder/find) function.
   *
   * You can refine the query by chaining `EventsQueryBuilder` functions onto the query. `EventsQueryBuilder` functions enable you to sort, filter, and control the results that `queryEvents()` returns.
   *
   * `queryEvents()` runs with the following `EventsQueryBuilder` default that you can override:
   *
   * + `limit` is `50`.
   * + Sorted by `event.start` in ascending order.
   *
   * The functions that are chained to `queryEvents()` are applied in the order they are called.
   *
   * The following `EventsQueryBuilder` functions are supported for the `queryEvents()` function. For a full description of the events object, see the object returned for the [items](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/events-query-result/items) property in `EventsQueryResult`.
   *
   * @public
   * @documentationMaturity preview
   * @permissionId CALENDAR.EVENT_READ
   * @permissionId CALENDAR.EVENT_READ_PI
   */
  function queryEvents(options?: QueryEventsOptions): EventsQueryBuilder;
  interface QueryEventsOptions {
      /**
       * Local start date and time from which events are returned in
       * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format. For example,
       * `2024-01-30T13:30:00`.
       *
       * Events that start before the `fromLocalDate` but end after it are included in
       * the results. Must be earlier than `toLocalDate` unless the sort order is
       * descending.
       */
      fromLocalDate?: string | null | undefined;
      /**
       * Local end date and time up to which events are returned in
       * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format. For example,
       * `2024-01-30T13:30:00`.
       *
       * Events that start before `toLocalDate` but end after it are included in the
       * results. Must be later than `fromLocalDate` unless the sort order is
       * descending.
       */
      toLocalDate?: string | null | undefined;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for `fromLocalDate`, `toLocalDate`, and for calculating `adjustedStart` and
       * `adjustedEnd`. For example, `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/rest/business-management/site-properties/properties/get-site-properties).
       */
      timeZone?: string | null | undefined;
      /**
       * Filters events based on their `recurrenceType`.
       *
       * Max: 5 recurrence types can be specified.
       * Default: Events with `recurrenceType` of `NONE`, `INSTANCE`, and `EXCEPTION` are returned.
       */
      recurrenceType?: RecurrenceType$1[] | undefined;
      /**
       * Information about which fields containing personal data to return. Refer to the
       * [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions)
       * for more information.
       *
       * Supported values:
       * + `PI_FIELDS`: Returns all fields with personal data. Your app must have `Read Calendars - Including PI` or `Manage Calendars` permission scope.
       * + `OWN_PI_FIELDS`: Returns only fields containing your own personal data.
       *
       * Max: 1 field
       * Default: No personal data is returned.
       */
      fields?: RequestedFields$1[] | undefined;
      /**
       * Whether to return consistent response.
       * Please consult with us at #bookings-calendar-platform if you think your case requires consistent reads.
       * @internal
       */
      consistent?: boolean | null | undefined;
  }
  interface QueryCursorResult$2 {
      cursors: CommonCursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface EventsQueryResult extends QueryCursorResult$2 {
      items: Event$1[];
      query: EventsQueryBuilder;
      next: () => Promise<EventsQueryResult>;
      prev: () => Promise<EventsQueryResult>;
  }
  interface EventsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'scheduleId' | 'externalScheduleId' | 'type' | 'recurringEventId' | 'transparency' | 'location.id' | 'location.type' | 'totalCapacity' | 'remainingCapacity' | 'participants.total' | 'appId', value: any) => EventsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: 'totalCapacity' | 'remainingCapacity' | 'participants.total', value: any) => EventsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: 'totalCapacity' | 'remainingCapacity' | 'participants.total', value: any) => EventsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: 'totalCapacity' | 'remainingCapacity' | 'participants.total', value: any) => EventsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: 'totalCapacity' | 'remainingCapacity' | 'participants.total', value: any) => EventsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: 'totalCapacity' | 'remainingCapacity' | 'participants.total', value: any) => EventsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'scheduleId' | 'externalScheduleId' | 'type' | 'recurringEventId' | 'location.id' | 'location.type' | 'appId', value: any) => EventsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'location' | 'totalCapacity' | 'conferencingDetails', value: boolean) => EventsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => EventsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => EventsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<EventsQueryResult>;
  }
  /**
   * Creates an event.
   *
   *
   * If you provide `recurrenceRule`, an event with `{"recurrenceType": "MASTER"}` is created. Then, you can't set `start.localDate` to a past date, though the time can be earlier on the same day. You can, however, create single-occurrence events for past dates.
   *
   * You can't create an event with `recurrenceType` set to `INSTANCE` or `EXCEPTION`. `INSTANCE` events are generated automatically based on the recurrence rule in the relevant `MASTER` event. `EXCEPTION` events are automatically created when you [update](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/update-event) an `INSTANCE` event, which changes its `recurrenceType` to `EXCEPTION`.
   * @param event - Event to create.
   * @public
   * @documentationMaturity preview
   * @requiredField event
   * @requiredField event.conferencingDetails.guestUrl
   * @requiredField event.conferencingDetails.hostUrl
   * @requiredField event.conferencingDetails.type
   * @requiredField event.end
   * @requiredField event.end.localDate
   * @requiredField event.location.type
   * @requiredField event.participants.list.name
   * @requiredField event.recurrenceRule.days
   * @requiredField event.recurrenceRule.frequency
   * @requiredField event.recurrenceRule.until.localDate
   * @requiredField event.resources._id
   * @requiredField event.scheduleId
   * @requiredField event.start
   * @requiredField event.start.localDate
   * @permissionId CALENDAR.EVENT_CREATE_OWN
   * @permissionId CALENDAR.EVENT_CREATE
   * @adminMethod
   * @returns Created event.
   */
  function createEvent(event: Event$1, options?: CreateEventOptions): Promise<Event$1>;
  interface CreateEventOptions {
      /**
       * Optional list of fields to create or override.
       *
       * For example, to set empty values for fields that would otherwise be inherited from the schedule.
       * @internal
       */
      fieldmask?: string[];
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
      /**
       * Idempotency key guaranteeing that you don't create the same event more
       * than once.
       */
      idempotencyKey?: string | null;
  }
  /**
   * Creates multiple events in bulk.
   *
   *
   * If you provide `recurrenceRule`, an event with `{"recurrenceType": "MASTER"}` is
   * created. Then, you can't set `start.localDate` to a past date, though the time can be
   * earlier on the same day. You can, however, create single-occurrence events for
   * past dates.
   *
   * You can't create an event with `recurrenceType` set to `INSTANCE` or `EXCEPTION`.
   * `INSTANCE` events are generated automatically based on the recurrence rule in the
   * relevant `MASTER` event. `EXCEPTION` events are automatically created when you
   * [update](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/update-event)
   * an `INSTANCE` event, which changes its `recurrenceType` to `EXCEPTION`.
   * @param events - Events to create.
   * @public
   * @documentationMaturity preview
   * @requiredField events
   * @requiredField events.event
   * @requiredField events.event.conferencingDetails.guestUrl
   * @requiredField events.event.conferencingDetails.hostUrl
   * @requiredField events.event.conferencingDetails.type
   * @requiredField events.event.end
   * @requiredField events.event.end.localDate
   * @requiredField events.event.location.type
   * @requiredField events.event.participants.list.name
   * @requiredField events.event.recurrenceRule.days
   * @requiredField events.event.recurrenceRule.frequency
   * @requiredField events.event.recurrenceRule.until.localDate
   * @requiredField events.event.resources._id
   * @requiredField events.event.scheduleId
   * @requiredField events.event.start
   * @requiredField events.event.start.localDate
   * @permissionId CALENDAR.EVENT_CREATE_OWN
   * @permissionId CALENDAR.EVENT_CREATE
   * @adminMethod
   */
  function bulkCreateEvent(events: MaskedEvent[], options?: BulkCreateEventOptions): Promise<BulkCreateEventResponse>;
  interface BulkCreateEventOptions {
      /**
       * Whether to return created events.
       *
       * Default: `false`.
       */
      returnEntity?: boolean | null;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
  }
  /**
   * Updates an event.
   *
   *
   * When updating an event with `{"recurrenceType": "INSTANCE"}`, the
   * `recurrenceType` automatically changes to `EXCEPTION`.
   *
   * When updating an event with `{"recurrenceType": "MASTER"}`:
   * + Past `INSTANCE` and `EXCEPTION` events remain unchanged.
   * + For future `INSTANCE` events, all relevant fields are updated.
   * + For future `EXCEPTION` events, only changes to the `inheritedFields` are
   * applied, while other fields remain unchanged.
   * @param _id - Event ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField event
   * @requiredField event.conferencingDetails.guestUrl
   * @requiredField event.conferencingDetails.hostUrl
   * @requiredField event.conferencingDetails.type
   * @requiredField event.end.localDate
   * @requiredField event.location.type
   * @requiredField event.participants.list.name
   * @requiredField event.recurrenceRule.days
   * @requiredField event.recurrenceRule.frequency
   * @requiredField event.recurrenceRule.until.localDate
   * @requiredField event.resources._id
   * @requiredField event.revision
   * @requiredField event.start.localDate
   * @permissionId CALENDAR.EVENT_UPDATE_OWN
   * @permissionId CALENDAR.EVENT_UPDATE
   * @adminMethod
   * @returns Updated event.
   */
  function updateEvent(_id: string | null, event: UpdateEvent, options?: UpdateEventOptions): Promise<Event$1>;
  interface UpdateEvent {
      /**
       * Event ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * ID of the [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction)
       * the event belongs to.
       * After creating an event, you can't assign it to a different schedule.
       */
      scheduleId?: string | null;
      /**
       * ID of the external schedule the event belongs to.
       *
       * For example, if the event belongs to a Bookings staff member, identical to the ID of the [resource](https://dev.wix.com/docs/sdk/backend-modules/bookings/resources/introduction). If the schedule belongs to a Bookings service, identical to the ID of the [service](https://dev.wix.com/docs/sdk/backend-modules/bookings/services/setup).
       * @readonly
       */
      externalScheduleId?: string | null;
      /**
       * Schedule name.
       * @readonly
       */
      scheduleName?: string | null;
      /**
       * Event type. You can set the event type but you can't update it.
       *
       * Supported values:
       * + `DEFAULT`: A standard event that's not further specified.
       * + `WORKING_HOURS`: The event adds working hours to a schedule. By default not returned in [queryEvents()](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/query-events).
       *
       * Additional supported values, if Wix Bookings is installed:
       * + `APPOINTMENT`: Bookings appointment event.
       * + `CLASS`: Bookings class event.
       * + `COURSE`: Bookings course event.
       */
      type?: string | null;
      /**
       * Event status.
       *
       * Supported values:
       * + `CONFIRMED`: Event is scheduled to happen or has happened.
       * + `CANCELLED`: Event has been canceled.
       *
       * Default: `CONFIRMED`
       * @readonly
       */
      status?: Status$4;
      /**
       * Event title.
       *
       * Min: 1 character
       * Max: 200 characters
       */
      title?: string | null;
      /** Information about when the event starts. */
      start?: ZonedDate$2;
      /**
       * Information about when the event ends.
       *
       * Maximum allowed date: Year 2100, or up to 100 years from the event's start date (whichever comes first).
       */
      end?: ZonedDate$2;
      /**
       * Information about when the event starts adjusted to the `timeZone` of the
       * business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties)
       * or a different `timeZone` you provide in the call's request.
       * @readonly
       */
      adjustedStart?: ZonedDate$2;
      /**
       * Information about when the event ends adjusted to the `timeZone` of the
       * business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties)
       * or a different `timeZone` you provide in the call's request.
       * @readonly
       */
      adjustedEnd?: ZonedDate$2;
      /**
       * Time zone the event is associated with in
       * [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database).
       * Only regional time zones and UTC are supported.
       * For example, `America/New_York` or `UTC`.
       *
       * Default: `timeZone` of the [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction).
       */
      timeZone?: string | null;
      /**
       * Information about whether the event is a single occurrence or part of a
       * recurring series.
       *
       * Supported values:
       * + `NONE`: The event occurs only once and doesn't repeat.
       * + `MASTER`: Defines the recurrence pattern for a series of recurring events.
       * + `INSTANCE`: A specific occurrence of a recurring event. You can't create an event with `{"recurrenceType": "INSTANCE"}`, instead it's automatically generated based on the recurrence rule. If you update an `INSTANCE` event, `recurrenceType` automatically changes to `EXCEPTION`.
       * + `EXCEPTION`: A modified instance of a recurring event that differs from the recurrence pattern. For example, an event with a different time or location. You can't create an `EXCEPTION` event directly, instead it's set automatically when you update an `INSTANCE` event.
       *
       * Default: `NONE`
       * @readonly
       */
      recurrenceType?: RecurrenceType$1;
      /**
       * Recurrence pattern for a series of events. This field is required when
       * creating a `MASTER` event and isn't available for non-recurring events.
       * You can't update the recurrence rule for `INSTANCE` or `EXCEPTION` events.
       *
       * For example, an event that repeats every second Monday until January 7, 2026,
       * at 8:00 AM has the following `recurrenceRule`:
       * - `frequency = WEEKLY`
       * - `interval = 2`
       * - `days = [MONDAY]`
       * - `until = 20260107T08:00:00Z`
       */
      recurrenceRule?: RecurrenceRule$1;
      /**
       * ID of the `MASTER` event the event belongs to. Available only for `INSTANCE`
       * and `EXCEPTION` events.
       * @readonly
       */
      recurringEventId?: string | null;
      /**
       * Specifies whether the event blocks time in the schedule it belongs to.
       *
       * Supported values:
       * + `OPAQUE`:  The schedule is blocked during the event, preventing other events that involve the same entities (for example, Booking staff members) from being scheduled at the same time.
       * + `TRANSPARENT`: The schedule remains open during the event, allowing other events to be scheduled concurrently.
       *
       * Default: `OPAQUE`
       */
      transparency?: Transparency$1;
      /**
       * Event location.
       *
       * Default: `defaultLocation` of the [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction) the event belongs to
       */
      location?: Location$2;
      /**
       * List of [Wix Bookings resources](https://dev.wix.com/docs/sdk/backend-modules/bookings/resources/introduction)
       * affected by the event. This could include, for example, the
       * [Wix Bookings staff member](https://dev.wix.com/docs/sdk/backend-modules/bookings/staff-members/introduction)
       * providing the service or the room where the appointment takes place.
       *
       * Max: 100 resources
       */
      resources?: Resource$1[];
      /**
       * Maximum number of participants who can participate in the event.
       *
       * Default: `defaultCapacity` of the [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction) the event belongs to.
       */
      totalCapacity?: number | null;
      /**
       * Number of participants who can still be added to the event.
       * @readonly
       */
      remainingCapacity?: number | null;
      /**
       * Information about the event's participants.
       * Returned only if explicitly requested. For more details, see the [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions#retrieve-personal-information).
       * @readonly
       */
      participants?: Participants$1;
      /**
       * Information about the event's online conferencing.
       * Returned only if explicitly requested. For more details, see the [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions#retrieve-personal-information).
       *
       * Default: `defaultConferencingDetails` of the [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction) the event belongs to.
       */
      conferencingDetails?: ConferencingDetails$2;
      /**
       * Additional notes about the event.
       * Returned only if explicitly requested. For more details, see the [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions#retrieve-personal-information).
       *
       * Min: 1 character
       * Max: 5000 characters
       */
      notes?: string | null;
      /**
       * List of fields whose values are inherited.
       * + For single-occurrence events, values are inherited from the [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction).
       * + For `INSTANCE` and `EXCEPTION` events, values are inherited from the related `MASTER` event.
       * @readonly
       */
      inheritedFields?: Field$1[];
      /**
       * ID of the app that owns the event. Identical to `appId` of the
       * [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction)
       * to which the event belongs.
       * @readonly
       */
      appId?: string | null;
      /**
       * List of permissions associated with the event. Refer to the
       * [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions#roles)
       * for more information.
       * @readonly
       */
      permissions?: Permission$2[];
      /** Extensions enabling applications or users to save custom data related to the event. */
      extendedFields?: ExtendedFields$3;
      /**
       * Revision number, which increments each time the event is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the event.
       * Ignored when creating an event.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date the event was created in `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date the event was last updated in `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  interface UpdateEventOptions {
      /**
       * Optional list of fields to update or override.
       *
       * For example, to set empty values for fields that would otherwise be inherited from the schedule.
       * @internal
       */
      fieldmask?: string[];
      /**
       * Information about whether participants of the updated event are notified and
       * the message they receive.
       */
      participantNotification?: ParticipantNotification$1;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
  }
  /**
   * Updates multiple events in bulk.
   *
   *
   * When updating an event with `{"recurrenceType": "INSTANCE"}`, the
   * `recurrenceType` automatically changes to `EXCEPTION`.
   *
   * When updating an event with `{"recurrenceType": "MASTER"}`:
   * + Past `INSTANCE` and `EXCEPTION` events remain unchanged.
   * + For future `INSTANCE` events, all relevant fields are updated.
   * + For future `EXCEPTION` events, only changes to the `inheritedFields` are
   * applied, while other fields remain unchanged.
   * @param events - Events to update.
   *
   * Min: 1 event
   * Max: 50 events
   * @public
   * @documentationMaturity preview
   * @requiredField events
   * @requiredField events.event
   * @requiredField events.event._id
   * @requiredField events.event.conferencingDetails.guestUrl
   * @requiredField events.event.conferencingDetails.hostUrl
   * @requiredField events.event.conferencingDetails.type
   * @requiredField events.event.end.localDate
   * @requiredField events.event.location.type
   * @requiredField events.event.participants.list.name
   * @requiredField events.event.recurrenceRule.days
   * @requiredField events.event.recurrenceRule.frequency
   * @requiredField events.event.recurrenceRule.until.localDate
   * @requiredField events.event.resources._id
   * @requiredField events.event.revision
   * @requiredField events.event.start.localDate
   * @permissionId CALENDAR.EVENT_UPDATE_OWN
   * @permissionId CALENDAR.EVENT_UPDATE
   * @adminMethod
   */
  function bulkUpdateEvent(events: BulkUpdateEventRequestMaskedEvent[], options?: BulkUpdateEventOptions): Promise<BulkUpdateEventResponse>;
  interface BulkUpdateEventOptions {
      /**
       * Whether to return the updated events.
       *
       * Default: `false`
       */
      returnEntity?: boolean | null;
      /**
       * Information about whether participants of the updated event are notified and
       * the message they receive.
       */
      participantNotification?: ParticipantNotification$1;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
  }
  /**
   * Restores the event's default values from the relevant schedule or `MASTER`
   * event.
   *
   *
   * You must provide `fields` to specify which `inheritedFields` are restored.
   *
   * For example, if you've created an event that takes place in a non-default
   * location with a custom title and capacity, but you want to reset only title
   * and capacity to default values without affecting the location, provide the
   * event ID and set `fields` to `["TITLE", "CAPACITY"]`.
   *
   * Refer to the [default values article](https://dev.wix.com/docs/sdk/backend-modules/calendar/default-values)
   * for more information.
   * @param eventId - ID of the event for which to restore default values.
   * @param fields - Fields for which to restore default values.
   *
   * `TIME` restores default values for `start` and `end`.
   *
   * Min: 1 field
   * @public
   * @documentationMaturity preview
   * @requiredField eventId
   * @requiredField fields
   * @permissionId CALENDAR.EVENT_UPDATE_OWN
   * @permissionId CALENDAR.EVENT_UPDATE
   * @adminMethod
   */
  function restoreEventDefaults(eventId: string | null, fields: Field$1[], options?: RestoreEventDefaultsOptions): Promise<RestoreEventDefaultsResponse>;
  interface RestoreEventDefaultsOptions {
      /**
       * Information about whether participants of the updated event are notified and
       * the message they receive.
       */
      participantNotification?: ParticipantNotification$1;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
  }
  /**
   * Splits a recurring `MASTER` event into 2 separate `MASTER` events.
   *
   *
   * You must provide a `splitLocalDate` that's in the future and after the `start`
   * date of the next `INSTANCE` or `EXCEPTION` event in the series. Additionally,
   * there must be another `INSTANCE` or `EXCEPTION` event following this next event,
   * as the changes wouldn't affect any event without a subsequent occurrence.
   *
   * If you want to modify a `MASTER` event with the changes already applying to
   * the very next event, use
   * [updateEvent()](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/update-event)
   * instead, as this preserves past events and only modifies future events.
   *
   * The main consequences are:
   * - **The original `MASTER` event is shortened**. Its `recurrenceRule.until.localDate`
   * is updated to `end.localDate` of the latest `INSTANCE` or `EXCEPTION`
   * event starting before `splitLocalDate`. If an `INSTANCE` or `EXCEPTION` event
   * starts before but ends after `splitLocalDate`, `until.localDate` is set
   * to value that's later than `splitLocalDate`.
   * - **A new `MASTER` event is created**, starting from the first event that
   * begins after `splitLocalDate`.
   * - **Existing `INSTANCE` and `EXCEPTION` events that occur after the split are updated**.
   * Their `recurringEventId` is set to the ID of the newly created `MASTER` event.
   * @param recurringEventId - ID of the `MASTER` event to split.
   * @param splitLocalDate - Local date and time at which the `MASTER` event is split in
   * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format. For example,
   * `2025-03-11T09:00:00`.
   * Must be a future date that's after the `start` date of the next `INSTANCE` or
   * `EXCEPTION` event in the series. Additionally, there must be another
   * `INSTANCE` or `EXCEPTION` event following this next event, as the changes
   * wouldn't affect any event without a subsequent occurrence.
   * @public
   * @documentationMaturity preview
   * @requiredField recurringEventId
   * @requiredField splitLocalDate
   * @permissionId CALENDAR.EVENT_UPDATE_OWN
   * @permissionId CALENDAR.EVENT_UPDATE
   * @adminMethod
   */
  function splitRecurringEvent(recurringEventId: string | null, splitLocalDate: string | null, options?: SplitRecurringEventOptions): Promise<SplitRecurringEventResponse>;
  interface SplitRecurringEventOptions {
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
  }
  /**
   * Cancels an event.
   * @param eventId - ID of the event to cancel.
   * @public
   * @documentationMaturity preview
   * @requiredField eventId
   * @permissionId CALENDAR.EVENT_CANCEL_OWN
   * @permissionId CALENDAR.EVENT_CANCEL
   * @adminMethod
   */
  function cancelEvent(eventId: string | null, options?: CancelEventOptions): Promise<CancelEventResponse>;
  interface CancelEventOptions {
      /**
       * Information about whether participants of the canceled event are notified and
       * the message they receive.
       */
      participantNotification?: ParticipantNotification$1;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
  }
  /**
   * Cancels multiple events in bulk.
   * @param eventIds - IDs of the events to cancel.
   * @public
   * @documentationMaturity preview
   * @requiredField eventIds
   * @permissionId CALENDAR.EVENT_CANCEL_OWN
   * @permissionId CALENDAR.EVENT_CANCEL
   * @adminMethod
   */
  function bulkCancelEvent(eventIds: string[], options?: BulkCancelEventOptions): Promise<BulkCancelEventResponse>;
  interface BulkCancelEventOptions {
      /**
       * Whether to return the canceled events.
       *
       * Default: `false`
       */
      returnEntity?: boolean | null;
      /**
       * Information about whether participants of the canceled events are notified and
       * the message they receive.
       */
      participantNotification?: ParticipantNotification$1;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for calculating `adjustedStart` and `adjustedEnd`. For example,
       * `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       */
      timeZone?: string | null;
  }
  /**
   * Retrieves a list of events filtered by the participant's
   * [contact](https://dev.wix.com/docs/sdk/backend-modules/crm/contacts/introduction)
   * ID.
   *
   *
   * You can't set `toLocalDate` to a value that's more than a full year after
   * `fromLocalDate`.
   * @param contactId - ID of the [contact](https://dev.wix.com/docs/rest/crm/members-contacts/contacts/contacts/contact-v4/contact-object)
   * to retrieve events for. Required, unless you provide `cursorPaging`.
   * @public
   * @documentationMaturity preview
   * @requiredField contactId
   * @permissionId CALENDAR.EVENT_READ_PI
   * @adminMethod
   */
  function listEventsByContactId(contactId: string | null, options?: ListEventsByContactIdOptions): Promise<ListEventsByContactIdResponse>;
  interface ListEventsByContactIdOptions {
      /**
       * Local start date and time from which events are returned in
       * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format. For example,
       * `2024-01-30T13:30:00`. Required if `cursorPaging` isn't provided.
       *
       * Events that start before the `fromLocalDate` but end after it are included in
       * the results. Must be earlier than `toLocalDate`.
       */
      fromLocalDate?: string | null;
      /**
       * Local end date and time up to which events are returned in
       * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format. For example,
       * `2024-01-30T13:30:00`. Can't be more than a full year after
       * `2024-01-30T13:30:00`. Required if `cursorPaging` isn't provided.
       *
       * Events that start before `toLocalDate` but end after it are included in the
       * results. Must be later than `fromLocalDate`.
       */
      toLocalDate?: string | null;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for `fromLocalDate`, `toLocalDate`, and for calculating `adjustedStart` and
       * `adjustedEnd`. For example, `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/rest/business-management/site-properties/properties/get-site-properties).
       */
      timeZone?: string | null;
      /**
       * [App ID](https://dev.wix.com/docs/rest/articles/getting-started/wix-business-solutions)
       * to filter events by.
       */
      appId?: string | null;
      /** Cursor to retrieve the next page of the results. */
      cursorPaging?: CursorPaging$2;
  }
  /**
   * Retrieves a list of events filtered by the participant's
   * [member](https://dev.wix.com/docs/sdk/backend-modules/members/members/introduction)
   * ID.
   *
   *
   * You can't set `toLocalDate` to a value that's more than a full year after
   * `fromLocalDate`.
   * @param memberId - ID of the [member](https://dev.wix.com/docs/rest/crm/members-contacts/members/members/member-object)
   * to retrieve events for. Required, unless you provide `cursorPaging`.
   * Provide `me` to retrieve events for the currently logged-in member.
   * You must have the `Read Calendars - Including PI`
   * [permission scope](https://dev.wix.com/docs/build-apps/develop-your-app/access/authorization/configure-permissions-for-your-app)
   * to retrieve events for members who aren't the currently logged in member.
   * @public
   * @documentationMaturity preview
   * @requiredField memberId
   * @permissionId CALENDAR.EVENT_READ
   * @permissionId CALENDAR.EVENT_READ_PI
   */
  function listEventsByMemberId(memberId: string | null, options?: ListEventsByMemberIdOptions): Promise<ListEventsByMemberIdResponse>;
  interface ListEventsByMemberIdOptions {
      /**
       * Local start date and time from which events are returned in
       * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format. For example,
       * `2024-01-30T13:30:00`. Required if neither `cursorPaging` is provided nor a non-empty `eventIds` array.
       *
       * Events that start before the `fromLocalDate` but end after it are included in
       * the results. Must be earlier than `toLocalDate`.
       */
      fromLocalDate?: string | null;
      /**
       * Local end date and time up to which events are returned in
       * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format. For example,
       * `2024-01-30T13:30:00`. Can't be more than a full year after
       * `fromLocalDate`. Required if neither `cursorPaging` is provided nor a non-empty `eventIds` array.
       *
       * Events that start before `toLocalDate` but end after it are included in the
       * results. Must be later than `fromLocalDate`.
       */
      toLocalDate?: string | null;
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database)
       * for `fromLocalDate`, `toLocalDate`, and for calculating `adjustedStart` and
       * `adjustedEnd`. For example, `America/New_York` or `UTC`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/rest/business-management/site-properties/properties/get-site-properties).
       */
      timeZone?: string | null;
      /**
       * [App ID](https://dev.wix.com/docs/rest/articles/getting-started/wix-business-solutions)
       * to filter events by.
       */
      appId?: string | null;
      /** Cursor to retrieve the next page of the results. */
      cursorPaging?: CursorPaging$2;
      /**
       * IDs of the events to retrieve.
       * If you provide a list of IDs, all other filters are ignored.
       *
       * Max: 100 `eventId`s
       */
      eventIds?: string[];
  }
  
  type calendarV3Event_universal_d_FixSCHED38956Request = FixSCHED38956Request;
  type calendarV3Event_universal_d_FixSCHED38956Response = FixSCHED38956Response;
  type calendarV3Event_universal_d_GetEventRequest = GetEventRequest;
  type calendarV3Event_universal_d_GetEventResponse = GetEventResponse;
  type calendarV3Event_universal_d_ListEventsRequest = ListEventsRequest;
  type calendarV3Event_universal_d_ListEventsResponse = ListEventsResponse;
  type calendarV3Event_universal_d_QueryEventsRequest = QueryEventsRequest;
  type calendarV3Event_universal_d_Sorting = Sorting;
  type calendarV3Event_universal_d_SortOrder = SortOrder;
  const calendarV3Event_universal_d_SortOrder: typeof SortOrder;
  type calendarV3Event_universal_d_CommonCursorPaging = CommonCursorPaging;
  type calendarV3Event_universal_d_QueryEventsResponse = QueryEventsResponse;
  type calendarV3Event_universal_d_CommonCursorPagingMetadata = CommonCursorPagingMetadata;
  type calendarV3Event_universal_d_CommonCursors = CommonCursors;
  type calendarV3Event_universal_d_ListRecurringEventInstancesHistoryRequest = ListRecurringEventInstancesHistoryRequest;
  type calendarV3Event_universal_d_ListRecurringEventInstancesHistoryResponse = ListRecurringEventInstancesHistoryResponse;
  type calendarV3Event_universal_d_CreateEventRequest = CreateEventRequest;
  type calendarV3Event_universal_d_CreateEventResponse = CreateEventResponse;
  type calendarV3Event_universal_d_BulkCreateEventRequest = BulkCreateEventRequest;
  type calendarV3Event_universal_d_MaskedEvent = MaskedEvent;
  type calendarV3Event_universal_d_BulkCreateEventResponse = BulkCreateEventResponse;
  type calendarV3Event_universal_d_BulkEventResult = BulkEventResult;
  type calendarV3Event_universal_d_ItemMetadata = ItemMetadata;
  type calendarV3Event_universal_d_ApplicationError = ApplicationError;
  type calendarV3Event_universal_d_BulkActionMetadata = BulkActionMetadata;
  type calendarV3Event_universal_d_UpdateEventRequest = UpdateEventRequest;
  type calendarV3Event_universal_d_UpdateEventResponse = UpdateEventResponse;
  type calendarV3Event_universal_d_EventUpdatedWithMetadata = EventUpdatedWithMetadata;
  type calendarV3Event_universal_d_BulkUpdateEventRequest = BulkUpdateEventRequest;
  type calendarV3Event_universal_d_BulkUpdateEventRequestMaskedEvent = BulkUpdateEventRequestMaskedEvent;
  type calendarV3Event_universal_d_BulkUpdateEventResponse = BulkUpdateEventResponse;
  type calendarV3Event_universal_d_UpdateEventParticipantsRequest = UpdateEventParticipantsRequest;
  type calendarV3Event_universal_d_UpdateEventParticipantsResponse = UpdateEventParticipantsResponse;
  type calendarV3Event_universal_d_RestoreEventDefaultsRequest = RestoreEventDefaultsRequest;
  type calendarV3Event_universal_d_RestoreEventDefaultsResponse = RestoreEventDefaultsResponse;
  type calendarV3Event_universal_d_SplitRecurringEventRequest = SplitRecurringEventRequest;
  type calendarV3Event_universal_d_SplitRecurringEventResponse = SplitRecurringEventResponse;
  type calendarV3Event_universal_d_RecurringEventSplit = RecurringEventSplit;
  type calendarV3Event_universal_d_CancelEventRequest = CancelEventRequest;
  type calendarV3Event_universal_d_CancelEventResponse = CancelEventResponse;
  type calendarV3Event_universal_d_EventCancelled = EventCancelled;
  type calendarV3Event_universal_d_BulkCancelEventRequest = BulkCancelEventRequest;
  type calendarV3Event_universal_d_BulkCancelEventResponse = BulkCancelEventResponse;
  type calendarV3Event_universal_d_ListEventsByContactIdRequest = ListEventsByContactIdRequest;
  type calendarV3Event_universal_d_ListEventsByContactIdResponse = ListEventsByContactIdResponse;
  type calendarV3Event_universal_d_ListEventsByMemberIdRequest = ListEventsByMemberIdRequest;
  type calendarV3Event_universal_d_ListEventsByMemberIdResponse = ListEventsByMemberIdResponse;
  const calendarV3Event_universal_d_getEvent: typeof getEvent;
  type calendarV3Event_universal_d_GetEventOptions = GetEventOptions;
  const calendarV3Event_universal_d_listEvents: typeof listEvents;
  type calendarV3Event_universal_d_ListEventsOptions = ListEventsOptions;
  const calendarV3Event_universal_d_queryEvents: typeof queryEvents;
  type calendarV3Event_universal_d_QueryEventsOptions = QueryEventsOptions;
  type calendarV3Event_universal_d_EventsQueryResult = EventsQueryResult;
  type calendarV3Event_universal_d_EventsQueryBuilder = EventsQueryBuilder;
  const calendarV3Event_universal_d_createEvent: typeof createEvent;
  type calendarV3Event_universal_d_CreateEventOptions = CreateEventOptions;
  const calendarV3Event_universal_d_bulkCreateEvent: typeof bulkCreateEvent;
  type calendarV3Event_universal_d_BulkCreateEventOptions = BulkCreateEventOptions;
  const calendarV3Event_universal_d_updateEvent: typeof updateEvent;
  type calendarV3Event_universal_d_UpdateEvent = UpdateEvent;
  type calendarV3Event_universal_d_UpdateEventOptions = UpdateEventOptions;
  const calendarV3Event_universal_d_bulkUpdateEvent: typeof bulkUpdateEvent;
  type calendarV3Event_universal_d_BulkUpdateEventOptions = BulkUpdateEventOptions;
  const calendarV3Event_universal_d_restoreEventDefaults: typeof restoreEventDefaults;
  type calendarV3Event_universal_d_RestoreEventDefaultsOptions = RestoreEventDefaultsOptions;
  const calendarV3Event_universal_d_splitRecurringEvent: typeof splitRecurringEvent;
  type calendarV3Event_universal_d_SplitRecurringEventOptions = SplitRecurringEventOptions;
  const calendarV3Event_universal_d_cancelEvent: typeof cancelEvent;
  type calendarV3Event_universal_d_CancelEventOptions = CancelEventOptions;
  const calendarV3Event_universal_d_bulkCancelEvent: typeof bulkCancelEvent;
  type calendarV3Event_universal_d_BulkCancelEventOptions = BulkCancelEventOptions;
  const calendarV3Event_universal_d_listEventsByContactId: typeof listEventsByContactId;
  type calendarV3Event_universal_d_ListEventsByContactIdOptions = ListEventsByContactIdOptions;
  const calendarV3Event_universal_d_listEventsByMemberId: typeof listEventsByMemberId;
  type calendarV3Event_universal_d_ListEventsByMemberIdOptions = ListEventsByMemberIdOptions;
  namespace calendarV3Event_universal_d {
    export {
      Event$1 as Event,
      Status$4 as Status,
      ZonedDate$2 as ZonedDate,
      RecurrenceType$1 as RecurrenceType,
      RecurrenceRule$1 as RecurrenceRule,
      Frequency$1 as Frequency,
      Day$1 as Day,
      Transparency$1 as Transparency,
      Location$2 as Location,
      LocationType$2 as LocationType,
      Resource$1 as Resource,
      Role$2 as Role,
      Participants$1 as Participants,
      Participant$2 as Participant,
      ParticipantsStatus$1 as ParticipantsStatus,
      ConferencingDetails$2 as ConferencingDetails,
      Type$2 as Type,
      Field$1 as Field,
      Permission$2 as Permission,
      IdentificationData$4 as IdentificationData,
      IdentificationDataIdOneOf$4 as IdentificationDataIdOneOf,
      IdentityType$2 as IdentityType,
      ExtendedFields$3 as ExtendedFields,
      calendarV3Event_universal_d_FixSCHED38956Request as FixSCHED38956Request,
      calendarV3Event_universal_d_FixSCHED38956Response as FixSCHED38956Response,
      calendarV3Event_universal_d_GetEventRequest as GetEventRequest,
      RequestedFields$1 as RequestedFields,
      calendarV3Event_universal_d_GetEventResponse as GetEventResponse,
      calendarV3Event_universal_d_ListEventsRequest as ListEventsRequest,
      calendarV3Event_universal_d_ListEventsResponse as ListEventsResponse,
      calendarV3Event_universal_d_QueryEventsRequest as QueryEventsRequest,
      CursorQuery$2 as CursorQuery,
      CursorQueryPagingMethodOneOf$2 as CursorQueryPagingMethodOneOf,
      calendarV3Event_universal_d_Sorting as Sorting,
      calendarV3Event_universal_d_SortOrder as SortOrder,
      calendarV3Event_universal_d_CommonCursorPaging as CommonCursorPaging,
      calendarV3Event_universal_d_QueryEventsResponse as QueryEventsResponse,
      calendarV3Event_universal_d_CommonCursorPagingMetadata as CommonCursorPagingMetadata,
      calendarV3Event_universal_d_CommonCursors as CommonCursors,
      calendarV3Event_universal_d_ListRecurringEventInstancesHistoryRequest as ListRecurringEventInstancesHistoryRequest,
      calendarV3Event_universal_d_ListRecurringEventInstancesHistoryResponse as ListRecurringEventInstancesHistoryResponse,
      calendarV3Event_universal_d_CreateEventRequest as CreateEventRequest,
      calendarV3Event_universal_d_CreateEventResponse as CreateEventResponse,
      calendarV3Event_universal_d_BulkCreateEventRequest as BulkCreateEventRequest,
      calendarV3Event_universal_d_MaskedEvent as MaskedEvent,
      calendarV3Event_universal_d_BulkCreateEventResponse as BulkCreateEventResponse,
      calendarV3Event_universal_d_BulkEventResult as BulkEventResult,
      calendarV3Event_universal_d_ItemMetadata as ItemMetadata,
      calendarV3Event_universal_d_ApplicationError as ApplicationError,
      calendarV3Event_universal_d_BulkActionMetadata as BulkActionMetadata,
      calendarV3Event_universal_d_UpdateEventRequest as UpdateEventRequest,
      ParticipantNotification$1 as ParticipantNotification,
      calendarV3Event_universal_d_UpdateEventResponse as UpdateEventResponse,
      calendarV3Event_universal_d_EventUpdatedWithMetadata as EventUpdatedWithMetadata,
      calendarV3Event_universal_d_BulkUpdateEventRequest as BulkUpdateEventRequest,
      calendarV3Event_universal_d_BulkUpdateEventRequestMaskedEvent as BulkUpdateEventRequestMaskedEvent,
      calendarV3Event_universal_d_BulkUpdateEventResponse as BulkUpdateEventResponse,
      calendarV3Event_universal_d_UpdateEventParticipantsRequest as UpdateEventParticipantsRequest,
      calendarV3Event_universal_d_UpdateEventParticipantsResponse as UpdateEventParticipantsResponse,
      calendarV3Event_universal_d_RestoreEventDefaultsRequest as RestoreEventDefaultsRequest,
      calendarV3Event_universal_d_RestoreEventDefaultsResponse as RestoreEventDefaultsResponse,
      calendarV3Event_universal_d_SplitRecurringEventRequest as SplitRecurringEventRequest,
      calendarV3Event_universal_d_SplitRecurringEventResponse as SplitRecurringEventResponse,
      calendarV3Event_universal_d_RecurringEventSplit as RecurringEventSplit,
      calendarV3Event_universal_d_CancelEventRequest as CancelEventRequest,
      calendarV3Event_universal_d_CancelEventResponse as CancelEventResponse,
      calendarV3Event_universal_d_EventCancelled as EventCancelled,
      calendarV3Event_universal_d_BulkCancelEventRequest as BulkCancelEventRequest,
      calendarV3Event_universal_d_BulkCancelEventResponse as BulkCancelEventResponse,
      DomainEvent$4 as DomainEvent,
      DomainEventBodyOneOf$4 as DomainEventBodyOneOf,
      EntityCreatedEvent$4 as EntityCreatedEvent,
      RestoreInfo$4 as RestoreInfo,
      EntityUpdatedEvent$4 as EntityUpdatedEvent,
      EntityDeletedEvent$4 as EntityDeletedEvent,
      ActionEvent$4 as ActionEvent,
      MessageEnvelope$4 as MessageEnvelope,
      WebhooksIdentificationData$2 as WebhooksIdentificationData,
      WebhooksIdentificationDataIdOneOf$2 as WebhooksIdentificationDataIdOneOf,
      WebhookIdentityType$4 as WebhookIdentityType,
      SitePropertiesNotification$2 as SitePropertiesNotification,
      SitePropertiesEvent$2 as SitePropertiesEvent,
      Properties$2 as Properties,
      Categories$2 as Categories,
      Locale$2 as Locale,
      Address$2 as Address,
      AddressHint$2 as AddressHint,
      PlacementType$2 as PlacementType,
      GeoCoordinates$2 as GeoCoordinates,
      BusinessSchedule$2 as BusinessSchedule,
      TimePeriod$2 as TimePeriod,
      DayOfWeek$2 as DayOfWeek,
      SpecialHourPeriod$2 as SpecialHourPeriod,
      Multilingual$2 as Multilingual,
      SupportedLanguage$2 as SupportedLanguage,
      ResolutionMethod$2 as ResolutionMethod,
      ConsentPolicy$2 as ConsentPolicy,
      Translation$2 as Translation,
      ChangeContext$2 as ChangeContext,
      ChangeContextPayloadOneOf$2 as ChangeContextPayloadOneOf,
      PropertiesChange$2 as PropertiesChange,
      V4SiteCreated$2 as V4SiteCreated,
      SiteCloned$2 as SiteCloned,
      Empty$4 as Empty,
      calendarV3Event_universal_d_ListEventsByContactIdRequest as ListEventsByContactIdRequest,
      CursorPaging$2 as CursorPaging,
      calendarV3Event_universal_d_ListEventsByContactIdResponse as ListEventsByContactIdResponse,
      CursorPagingMetadata$2 as CursorPagingMetadata,
      Cursors$2 as Cursors,
      calendarV3Event_universal_d_ListEventsByMemberIdRequest as ListEventsByMemberIdRequest,
      calendarV3Event_universal_d_ListEventsByMemberIdResponse as ListEventsByMemberIdResponse,
      calendarV3Event_universal_d_getEvent as getEvent,
      calendarV3Event_universal_d_GetEventOptions as GetEventOptions,
      calendarV3Event_universal_d_listEvents as listEvents,
      calendarV3Event_universal_d_ListEventsOptions as ListEventsOptions,
      calendarV3Event_universal_d_queryEvents as queryEvents,
      calendarV3Event_universal_d_QueryEventsOptions as QueryEventsOptions,
      calendarV3Event_universal_d_EventsQueryResult as EventsQueryResult,
      calendarV3Event_universal_d_EventsQueryBuilder as EventsQueryBuilder,
      calendarV3Event_universal_d_createEvent as createEvent,
      calendarV3Event_universal_d_CreateEventOptions as CreateEventOptions,
      calendarV3Event_universal_d_bulkCreateEvent as bulkCreateEvent,
      calendarV3Event_universal_d_BulkCreateEventOptions as BulkCreateEventOptions,
      calendarV3Event_universal_d_updateEvent as updateEvent,
      calendarV3Event_universal_d_UpdateEvent as UpdateEvent,
      calendarV3Event_universal_d_UpdateEventOptions as UpdateEventOptions,
      calendarV3Event_universal_d_bulkUpdateEvent as bulkUpdateEvent,
      calendarV3Event_universal_d_BulkUpdateEventOptions as BulkUpdateEventOptions,
      calendarV3Event_universal_d_restoreEventDefaults as restoreEventDefaults,
      calendarV3Event_universal_d_RestoreEventDefaultsOptions as RestoreEventDefaultsOptions,
      calendarV3Event_universal_d_splitRecurringEvent as splitRecurringEvent,
      calendarV3Event_universal_d_SplitRecurringEventOptions as SplitRecurringEventOptions,
      calendarV3Event_universal_d_cancelEvent as cancelEvent,
      calendarV3Event_universal_d_CancelEventOptions as CancelEventOptions,
      calendarV3Event_universal_d_bulkCancelEvent as bulkCancelEvent,
      calendarV3Event_universal_d_BulkCancelEventOptions as BulkCancelEventOptions,
      calendarV3Event_universal_d_listEventsByContactId as listEventsByContactId,
      calendarV3Event_universal_d_ListEventsByContactIdOptions as ListEventsByContactIdOptions,
      calendarV3Event_universal_d_listEventsByMemberId as listEventsByMemberId,
      calendarV3Event_universal_d_ListEventsByMemberIdOptions as ListEventsByMemberIdOptions,
    };
  }
  
  /**
   * The `eventsView` object gives you details about how far into the future you can
   * easily get a complete picture of a calendar. Subscribing to the event view
   * webhooks lets you keep track of a calendar's single-occurrence, `EXCEPTION`, and
   * `INSTANCE` events at least one year into the future.
   */
  interface EventsView {
      /**
       * End date of the event view in `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      endDate?: Date | null;
      /**
       * Number of days from now until the event view ends.
       * @readonly
       */
      futureDurationInDays?: number | null;
  }
  interface EventsViewProjectionUpdated extends EventsViewProjectionUpdatedTypeOneOf {
      /**
       * Available when there is a change to an event in the current event view, including when:
       * + An event is created within the view.
       * + An existing event is updated, unless its start time moves outside the view. Then, `eventRemoved` is returned.
       * + An event previously outside the view is rescheduled to fall within it.
       * + The view is extended, bringing an event into scope.
       */
      eventAddedOrUpdated?: EventAddedOrUpdated;
      /**
       * Available when an event has been removed from the current view, including
       * when:
       * + An event within the view is deleted.
       * + An event within the view is rescheduled so that its start time falls outside the view.
       */
      eventRemoved?: EventRemoved;
      /**
       * ID of the app that owns the event. Identical to `appId` of the
       * [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction)
       * to which the event belongs.
       */
      appId?: string | null;
  }
  /** @oneof */
  interface EventsViewProjectionUpdatedTypeOneOf {
      /**
       * Available when there is a change to an event in the current event view, including when:
       * + An event is created within the view.
       * + An existing event is updated, unless its start time moves outside the view. Then, `eventRemoved` is returned.
       * + An event previously outside the view is rescheduled to fall within it.
       * + The view is extended, bringing an event into scope.
       */
      eventAddedOrUpdated?: EventAddedOrUpdated;
      /**
       * Available when an event has been removed from the current view, including
       * when:
       * + An event within the view is deleted.
       * + An event within the view is rescheduled so that its start time falls outside the view.
       */
      eventRemoved?: EventRemoved;
  }
  interface EventAddedOrUpdated {
      /** Event that was added or updated. */
      event?: Event;
      /**
       * Event’s original version before an update. Available only when an event is
       * updated. Not available when a new event is created or an existing event falls
       * into the view because the view is extended.
       */
      previousEvent?: Event;
  }
  /**
   * An event is a scheduled entry on a calendar that includes details like timing,
   * location, and participants. Each event is associated with
   * a [schedule](https://dev.wix.com/docs/rest/business-management/calendar/schedules-v3/introduction),
   * from which it may [inherit default values](https://dev.wix.com/docs/rest/business-management/calendar/default-values).
   * Events can either be standalone, part of a recurring series, or define a
   * recurrence pattern. You can also specify whether events block time on the
   * schedule or allow other events to be scheduled concurrently.
   */
  interface Event {
      /**
       * Event ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * ID of the [schedule](https://dev.wix.com/docs/rest/business-management/calendar/schedules-v3/schedule-object)
       * the event belongs to.
       * After creating an event, you can't assign it to a different schedule.
       */
      scheduleId?: string | null;
      /**
       * ID of the external schedule the event belongs to.
       *
       * For example, if the event belongs to a Bookings staff member, identical to
       * the ID of the [resource](https://dev.wix.com/docs/rest/business-solutions/bookings/staff-members-and-resources/resource-v2/resource-object).
       * If the schedule belongs to a Bookings service,
       * identical to the ID of the [service](https://dev.wix.com/docs/rest/business-solutions/bookings/services/services-v2/service-object).
       * @readonly
       */
      externalScheduleId?: string | null;
      /**
       * Schedule name.
       * @readonly
       */
      scheduleName?: string | null;
      /**
       * Event type. You can set the event type but you can't update it.
       *
       * Supported values:
       * + `DEFAULT`: A standard event that's not further specified.
       * + `WORKING_HOURS`: The event adds working hours to a schedule. By default not returned in [Query Events](https://dev.wix.com/docs/rest/business-management/calendar/events-v3/query-events).
       *
       * Additional supported values, if Wix Bookings is installed:
       * + `APPOINTMENT`: Bookings appointment event.
       * + `CLASS`: Bookings class event.
       * + `COURSE`: Bookings course event.
       */
      type?: string | null;
      /**
       * Event status.
       *
       * Supported values:
       * + `CONFIRMED`: Event is scheduled to happen or has happened.
       * + `CANCELLED`: Event has been canceled.
       *
       * Default: `CONFIRMED`
       * @readonly
       */
      status?: Status$3;
      /**
       * Event title.
       *
       * Min: 1 character
       * Max: 200 characters
       */
      title?: string | null;
      /** Information about when the event starts. */
      start?: ZonedDate$1;
      /**
       * Information about when the event ends.
       *
       * Maximum allowed date: Year 2100, or up to 100 years from the event's start date (whichever comes first).
       */
      end?: ZonedDate$1;
      /**
       * Information about when the event starts adjusted to the `timeZone` of the
       * business [site properties](https://dev.wix.com/docs/rest/business-management/site-properties/properties/properties-object)
       * or a different `timeZone` you provide in the call's request.
       * @readonly
       */
      adjustedStart?: ZonedDate$1;
      /**
       * Information about when the event ends adjusted to the `timeZone` of the
       * business [site properties](https://dev.wix.com/docs/rest/business-management/site-properties/properties/properties-object)
       * or a different `timeZone` you provide in the call's request.
       * @readonly
       */
      adjustedEnd?: ZonedDate$1;
      /**
       * Time zone the event is associated with in
       * [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database).
       * Only regional time zones and UTC are supported.
       * For example, `America/New_York` or `UTC`.
       *
       * Default: `timeZone` of the [schedule](https://dev.wix.com/docs/rest/business-management/calendar/schedules-v3/schedule-object).
       */
      timeZone?: string | null;
      /**
       * Information about whether the event is a single occurrence or part of a
       * recurring series.
       *
       * Supported values:
       * + `NONE`: The event occurs only once and doesn't repeat.
       * + `MASTER`: Defines the recurrence pattern for a series of recurring events.
       * + `INSTANCE`: A specific occurrence of a recurring event. You can't create an event with `{"recurrenceType": "INSTANCE"}`, instead it's automatically generated based on the recurrence rule. If you update an `INSTANCE` event, `recurrenceType` automatically changes to `EXCEPTION`.
       * + `EXCEPTION`: A modified instance of a recurring event that differs from the recurrence pattern. For example, an event with a different time or location. You can't create an `EXCEPTION` event directly, instead it's set automatically when you update an `INSTANCE` event.
       *
       * Default: `NONE`
       * @readonly
       */
      recurrenceType?: RecurrenceType;
      /**
       * Recurrence pattern for a series of events. This field is required when
       * creating a `MASTER` event and isn't available for non-recurring events.
       * You can't update the recurrence rule for `INSTANCE` or `EXCEPTION` events.
       *
       * For example, an event that repeats every second Monday until January 7, 2026,
       * at 8:00 AM has the following `recurrenceRule`:
       * - `frequency = WEEKLY`
       * - `interval = 2`
       * - `days = [MONDAY]`
       * - `until = 20260107T08:00:00Z`
       */
      recurrenceRule?: RecurrenceRule;
      /**
       * ID of the `MASTER` event the event belongs to. Available only for `INSTANCE`
       * and `EXCEPTION` events.
       * @readonly
       */
      recurringEventId?: string | null;
      /**
       * Specifies whether the event blocks time in the schedule it belongs to.
       *
       * Supported values:
       * + `OPAQUE`:  The schedule is blocked during the event, preventing other events that involve the same entities (for example, Booking staff members) from being scheduled at the same time.
       * + `TRANSPARENT`: The schedule remains open during the event, allowing other events to be scheduled concurrently.
       *
       * Default: `OPAQUE`
       */
      transparency?: Transparency;
      /**
       * Event location.
       *
       * Default: `defaultLocation` of the [schedule](https://dev.wix.com/docs/rest/business-management/calendar/schedules-v3/schedule-object) the event belongs to
       */
      location?: Location$1;
      /**
       * List of [Wix Bookings resources](https://dev.wix.com/docs/rest/business-solutions/bookings/staff-members-and-resources/resource-v2/resource-object)
       * affected by the event. This could include, for example, the
       * [Wix Bookings staff member](https://dev.wix.com/docs/rest/business-solutions/bookings/staff-members-and-resources/staff-member-v1/staff-member-object)
       * providing the service or the room where the appointment takes place.
       *
       * Max: 100 resources
       */
      resources?: Resource[];
      /**
       * Maximum number of participants who can participate in the event.
       *
       * Default: `defaultCapacity` of the [schedule](https://dev.wix.com/docs/rest/business-management/calendar/schedules-v3/schedule-object) the event belongs to
       */
      totalCapacity?: number | null;
      /**
       * Number of participants who can still be added to the event.
       * @readonly
       */
      remainingCapacity?: number | null;
      /**
       * Information about the event's participants.
       * Returned only if explicitly requested. For more details, see the [permissions article](https://dev.wix.com/docs/rest/business-management/calendar/permissions#retrieve-personal-information).
       * @readonly
       */
      participants?: Participants;
      /**
       * Information about the event's online conferencing.
       * Returned only if explicitly requested. For more details, see the [permissions article](https://dev.wix.com/docs/rest/business-management/calendar/permissions#retrieve-personal-information).
       *
       * Default: `defaultConferencingDetails` of the [schedule](https://dev.wix.com/docs/rest/business-management/calendar/schedules-v3/schedule-object) the event belongs to
       */
      conferencingDetails?: ConferencingDetails$1;
      /**
       * Additional notes about the event.
       * Returned only if explicitly requested. For more details, see the [permissions article](https://dev.wix.com/docs/rest/business-management/calendar/permissions#retrieve-personal-information).
       *
       * Min: 1 character
       * Max: 5000 characters
       */
      notes?: string | null;
      /**
       * List of fields whose values are inherited.
       * + For single-occurrence events, values are inherited from the [schedule](https://dev.wix.com/docs/rest/business-management/calendar/schedules-v3/schedule-object).
       * + For `INSTANCE` and `EXCEPTION` events, values are inherited from the related `MASTER` event.
       * @readonly
       */
      inheritedFields?: Field[];
      /**
       * ID of the app that owns the event. Identical to `appId` of the
       * [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction)
       * to which the event belongs.
       * @readonly
       */
      appId?: string | null;
      /**
       * List of permissions associated with the event. Refer to the
       * [permissions article](https://dev.wix.com/docs/rest/business-management/calendar/permissions#roles)
       * for more information.
       * @readonly
       */
      permissions?: Permission$1[];
      /** Extensions enabling applications or users to save custom data related to the event. */
      extendedFields?: ExtendedFields$2;
      /**
       * Revision number, which increments each time the event is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the event.
       * Ignored when creating an event.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date the event was created in `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date the event was last updated in `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  enum Status$3 {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      /** Event is scheduled to happen or has happened. */
      CONFIRMED = "CONFIRMED",
      /** DEPRECATED! AND WILL BE REMOVED SOON */
      PENDING_CONFIRMATION = "PENDING_CONFIRMATION",
      /** Event has been canceled. */
      CANCELLED = "CANCELLED"
  }
  /** A date time with a time zone, having the UTC offset and date determined by the server. */
  interface ZonedDate$1 {
      /**
       * Local date time in [ISO-8601 format](https://en.wikipedia.org/wiki/ISO_8601).
       * For example, `2024-01-30T13:30:00`.
       * Wix Calendar APIs ignore seconds.
       */
      localDate?: string | null;
      /**
       * Time zone in
       * [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database).
       * For example, `America/New_York`.
       * @readonly
       */
      timeZone?: string | null;
      /**
       * UTC date time in [ISO-8601 format](https://en.wikipedia.org/wiki/ISO_8601).
       * For example, `2024-01-30T13:30:00`.
       * Not available for adjusted date fields.
       * @readonly
       */
      utcDate?: Date | null;
  }
  enum RecurrenceType {
      UNKNOWN_RECURRENCE_TYPE = "UNKNOWN_RECURRENCE_TYPE",
      /** The event occurs only once and doesn't repeat. */
      NONE = "NONE",
      /** Defines the recurrence pattern for a series of recurring events. */
      MASTER = "MASTER",
      /** A specific occurrence of a recurring event. You can't create an event with `{"recurrenceType": "INSTANCE"}`, instead it's automatically generated based on the recurrence rule. If you update an `INSTANCE` event, `recurrenceType` automatically changes to `EXCEPTION`. */
      INSTANCE = "INSTANCE",
      /** A modified instance of a recurring event that differs from the recurrence pattern. For example, an event with a different time or location. You can't create an `EXCEPTION` event directly, instead it's set automatically when you update an `INSTANCE` event. */
      EXCEPTION = "EXCEPTION"
  }
  interface RecurrenceRule {
      /**
       * Frequency how often the event repeats. Works together with `interval`.
       *
       * Supported values:
       * + `WEEKLY`: The event's recurrence pattern is based on weeks.
       */
      frequency?: Frequency;
      /**
       * Interval how often the event repeats. Works together with `frequency`.
       * For example, `frequency` set to `WEEKLY`  and `interval` set to `2` means
       * the event repeats every 2 weeks.
       *
       * Min: `1`
       * Max: `4`
       * Default: `1`
       */
      interval?: number | null;
      /**
       * Days of the week when the recurring event takes place.
       * Currently, only a single day is supported.
       *
       * Min: 1 day
       * Max: 1 day
       */
      days?: Day[];
      /**
       * Date until when the event repeats.
       * If not specified, the event repeats forever.
       */
      until?: ZonedDate$1;
      /**
       * Date until when the event repeats
       * adjusted to the `timeZone` of the business
       * [site properties](https://dev.wix.com/docs/rest/business-management/site-properties/properties/properties-object)
       * or a different `timeZone` you provide in the call's request.
       * @readonly
       */
      adjustedUntil?: ZonedDate$1;
  }
  enum Frequency {
      UNKNOWN_FREQUENCY = "UNKNOWN_FREQUENCY",
      /** The event's recurrence pattern is based on weeks. */
      WEEKLY = "WEEKLY"
  }
  enum Day {
      /** The recurring event takes place on Mondays. */
      MONDAY = "MONDAY",
      /** The recurring event takes place on Tuesdays. */
      TUESDAY = "TUESDAY",
      /** The recurring event takes place on Wednesday. */
      WEDNESDAY = "WEDNESDAY",
      /** The recurring event takes place on Thursdays. */
      THURSDAY = "THURSDAY",
      /** The recurring event takes place on Fridays. */
      FRIDAY = "FRIDAY",
      /** The recurring event takes place on Saturdays. */
      SATURDAY = "SATURDAY",
      /** The recurring event takes place on Sundays. */
      SUNDAY = "SUNDAY"
  }
  enum Transparency {
      UNKNOWN_TRANSPARENCY = "UNKNOWN_TRANSPARENCY",
      /** The schedule is blocked during the event, preventing other events that involve the same entities (for example, Booking staff members) from being scheduled at the same time. */
      OPAQUE = "OPAQUE",
      /** The schedule remains open during the event, allowing other events to be scheduled concurrently. */
      TRANSPARENT = "TRANSPARENT"
  }
  interface Location$1 {
      /**
       * [Location](https://dev.wix.com/docs/rest/business-management/locations/location-object)
       * ID. Available only for `BUSINESS` locations.
       */
      _id?: string | null;
      /**
       * Location type.
       *
       * Supported values:
       * + `BUSINESS`: The event is held at a business location.
       * + `CUSTOMER`: The event is held at the customer's location, such as their home or office.
       * + `CUSTOM`: The event is held at an address or venue not tied to the business or customer.
       */
      type?: LocationType$1;
      /**
       * Location name. For `BUSINESS` locations, it's identical to the
       * [location](https://dev.wix.com/docs/rest/business-management/locations/location-object)
       * `name`.
       *
       * Min: 1 character
       * Max: 150 characters
       */
      name?: string | null;
      /**
       * Location address. For `BUSINESS` locations, it's identical to the
       * [location](https://dev.wix.com/docs/rest/business-management/locations/location-object)'s
       * `formattedAddress`.
       */
      address?: string | null;
  }
  enum LocationType$1 {
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      /** The event is held at a business location. */
      BUSINESS = "BUSINESS",
      /** The event is held at the customer's location, such as their home or office. */
      CUSTOMER = "CUSTOMER",
      /** The event is held at an address or venue not tied to the business or customer. */
      CUSTOM = "CUSTOM"
  }
  interface Resource {
      /** Resource ID. */
      _id?: string | null;
      /**
       * Resource name.
       * @readonly
       */
      name?: string | null;
      /**
       * Resource type.
       * @readonly
       */
      type?: string | null;
      /**
       * ID of the resource's [schedule](https://dev.wix.com/docs/rest/business-management/calendar/schedules-v3/schedule-object).
       * @internal
       * @readonly
       */
      scheduleId?: string | null;
      /**
       * Specifies whether the event blocks time in the resource's schedule.
       *
       * Supported values:
       * + `OPAQUE`: The schedule is blocked during the event, preventing other events that involve the same resource from being scheduled at the same time.
       * + `TRANSPARENT`: The schedule remains open during the event, allowing other events to be scheduled concurrently.
       *
       * Default: `OPAQUE`.
       */
      transparency?: Transparency;
      /**
       * Permission role associated with the resource. Refer to the
       * [permissions article](https://dev.wix.com/docs/rest/business-management/calendar/permissions#roles)
       * for more information.
       */
      permissionRole?: Role$1;
  }
  enum Role$1 {
      UNKNOWN_ROLE = "UNKNOWN_ROLE",
      /** Full read and write access. */
      WRITER = "WRITER",
      /** Full read access, write access limited to `event.notes`. */
      COMMENTER = "COMMENTER"
  }
  interface Participants {
      /**
       * Total number of participants.
       *
       * Min: `0`
       */
      total?: number | null;
      /**
       * Full or partial list of the participants.
       *
       * Max: 50 participants
       */
      list?: Participant$1[];
      /**
       * Whether there are more participants for the event than listed.
       *
       * + `false`: The list includes all participants.
       * + `true`: The list doesn't include all participants.
       */
      hasMore?: boolean | null;
      /**
       * Participant's status.
       *
       * Supported values:
       * + `CONFIRMED`: All participants are confirmed.
       * + `PENDING_CONFIRMATION`: At least one participant isn't confirmed yet.
       */
      status?: ParticipantsStatus;
  }
  interface Participant$1 {
      /**
       * Participant name.
       *
       * Min: 1 character
       * Max: 200 characters
       */
      name?: string | null;
      /** Participant's phone number. */
      phone?: string | null;
      /** Participant's email address. */
      email?: string | null;
      /**
       * [Contact](https://dev.wix.com/docs/rest/crm/members-contacts/contacts/contacts/contact-v4/contact-object)
       * ID of the participant.
       */
      contactId?: string | null;
  }
  enum ParticipantsStatus {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      /** All participants are confirmed. */
      CONFIRMED = "CONFIRMED",
      /** At least one participant isn't confirmed yet. */
      PENDING_CONFIRMATION = "PENDING_CONFIRMATION"
  }
  interface ConferencingDetails$1 {
      /** Conference type. For example, `Zoom`. */
      type?: Type$1;
      /**
       * URL used by the host to start the conference.
       *
       * Min: 1 character
       * Max: 2000 characters
       */
      hostUrl?: string | null;
      /**
       * URL used by a guest to join the conference.
       *
       * Min: 1 character
       * Max: 2000 characters
       */
      guestUrl?: string | null;
      /**
       * Conference password.
       *
       * Min: 1 character
       * Max: 100 characters
       */
      password?: string | null;
      /**
       * Conference description.
       *
       * Min: 1 character
       * Max: 200 characters
       * @internal
       */
      description?: string | null;
      /**
       * Conference ID in an external system.
       *
       * Min: 1 character
       * Max: 150 characters
       */
      externalId?: string | null;
  }
  enum Type$1 {
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      ZOOM = "ZOOM",
      CUSTOM = "CUSTOM"
  }
  enum Field {
      UNKNOWN_FIELD = "UNKNOWN_FIELD",
      /** `title` is inherited from the schedule or `MASTER` event. */
      TITLE = "TITLE",
      /** `timeZone` is inherited from the schedule or `MASTER` event. */
      TIME_ZONE = "TIME_ZONE",
      /** `start` and `end` are inherited from the `MASTER` event. */
      TIME = "TIME",
      /** `location` is inherited from the schedule or `MASTER` event. */
      LOCATION = "LOCATION",
      /** `resources` is inherited from the `MASTER` event. */
      RESOURCES = "RESOURCES",
      /** `capacity` is inherited from the schedule or `MASTER` event. */
      CAPACITY = "CAPACITY",
      /** `participants` is inherited from the `MASTER` event. */
      PARTICIPANTS = "PARTICIPANTS",
      /** `conferencingDetails` is inherited from the schedule or `MASTER` event. */
      CONFERENCING_DETAILS = "CONFERENCING_DETAILS"
  }
  interface Permission$1 {
      /**
       * [Wix user](https://dev.wix.com/docs/build-apps/develop-your-app/access/about-identities#wix-users)
       * granted the permission.
       */
      identity?: IdentificationData$3;
      /**
       * Permission role.
       *
       * Supported values:
       * + `WRITER`: Full read and write access.
       * + `COMMENTER`: Full read access, write access limited to `event.notes`.
       */
      role?: Role$1;
  }
  interface IdentificationData$3 extends IdentificationDataIdOneOf$3 {
      /**
       * ID of a Wix user. For example, the site owner or a
       * [site collaborator](https://support.wix.com/en/article/inviting-people-to-contribute-to-your-site).
       */
      wixUserId?: string;
      /**
       * @internal
       * @readonly
       */
      identityType?: IdentityType$1;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$3 {
      /**
       * ID of a Wix user. For example, the site owner or a
       * [site collaborator](https://support.wix.com/en/article/inviting-people-to-contribute-to-your-site).
       */
      wixUserId?: string;
  }
  enum IdentityType$1 {
      UNKNOWN = "UNKNOWN",
      WIX_USER = "WIX_USER"
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
  interface EventRemoved {
      /** Event that was removed from the current view. */
      event?: Event;
  }
  interface EventsViewExtended {
      /**
       * Extended date of the events view in `YYYY-MM-DDTHH:MM:SSZ`
       * format.
       */
      extendedEndDate?: Date | null;
  }
  interface GetEventsViewRequest {
  }
  interface GetEventsViewResponse {
      /** Retrieved event view. */
      eventsView?: EventsView;
  }
  interface ExtendEventsViewRequest {
      /**
       * Number of days from now until the event view ends.
       * Must be greater than the current value.
       */
      futureDurationInDays?: number | null;
  }
  interface ExtendEventsViewResponse {
      /** Udated event view. */
      eventsView?: EventsView;
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
      restoreInfo?: RestoreInfo$3;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$3 {
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
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface EntityDeletedEvent$3 {
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
  interface ActionEvent$3 {
      bodyAsJson?: string;
  }
  interface Empty$3 {
  }
  interface MessageEnvelope$3 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: WebhooksIdentificationData$1;
      /** Stringify payload. */
      data?: string;
  }
  interface WebhooksIdentificationData$1 extends WebhooksIdentificationDataIdOneOf$1 {
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
  interface WebhooksIdentificationDataIdOneOf$1 {
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
   * Doesn’t return details about events within the view. You can use
   * [queryEvents()](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/query-events),
   * providing `eventsView.endDate` as `toLocalDate` to retrieve the
   * events.
   * @public
   * @documentationMaturity preview
   * @permissionId CALENDAR.EVENT_VIEW_READ
   * @adminMethod
   */
  function getEventsView(): Promise<GetEventsViewResponse>;
  
  type calendarV3EventsView_universal_d_EventsView = EventsView;
  type calendarV3EventsView_universal_d_EventsViewProjectionUpdated = EventsViewProjectionUpdated;
  type calendarV3EventsView_universal_d_EventsViewProjectionUpdatedTypeOneOf = EventsViewProjectionUpdatedTypeOneOf;
  type calendarV3EventsView_universal_d_EventAddedOrUpdated = EventAddedOrUpdated;
  type calendarV3EventsView_universal_d_Event = Event;
  type calendarV3EventsView_universal_d_RecurrenceType = RecurrenceType;
  const calendarV3EventsView_universal_d_RecurrenceType: typeof RecurrenceType;
  type calendarV3EventsView_universal_d_RecurrenceRule = RecurrenceRule;
  type calendarV3EventsView_universal_d_Frequency = Frequency;
  const calendarV3EventsView_universal_d_Frequency: typeof Frequency;
  type calendarV3EventsView_universal_d_Day = Day;
  const calendarV3EventsView_universal_d_Day: typeof Day;
  type calendarV3EventsView_universal_d_Transparency = Transparency;
  const calendarV3EventsView_universal_d_Transparency: typeof Transparency;
  type calendarV3EventsView_universal_d_Resource = Resource;
  type calendarV3EventsView_universal_d_Participants = Participants;
  type calendarV3EventsView_universal_d_ParticipantsStatus = ParticipantsStatus;
  const calendarV3EventsView_universal_d_ParticipantsStatus: typeof ParticipantsStatus;
  type calendarV3EventsView_universal_d_Field = Field;
  const calendarV3EventsView_universal_d_Field: typeof Field;
  type calendarV3EventsView_universal_d_EventRemoved = EventRemoved;
  type calendarV3EventsView_universal_d_EventsViewExtended = EventsViewExtended;
  type calendarV3EventsView_universal_d_GetEventsViewRequest = GetEventsViewRequest;
  type calendarV3EventsView_universal_d_GetEventsViewResponse = GetEventsViewResponse;
  type calendarV3EventsView_universal_d_ExtendEventsViewRequest = ExtendEventsViewRequest;
  type calendarV3EventsView_universal_d_ExtendEventsViewResponse = ExtendEventsViewResponse;
  const calendarV3EventsView_universal_d_getEventsView: typeof getEventsView;
  namespace calendarV3EventsView_universal_d {
    export {
      calendarV3EventsView_universal_d_EventsView as EventsView,
      calendarV3EventsView_universal_d_EventsViewProjectionUpdated as EventsViewProjectionUpdated,
      calendarV3EventsView_universal_d_EventsViewProjectionUpdatedTypeOneOf as EventsViewProjectionUpdatedTypeOneOf,
      calendarV3EventsView_universal_d_EventAddedOrUpdated as EventAddedOrUpdated,
      calendarV3EventsView_universal_d_Event as Event,
      Status$3 as Status,
      ZonedDate$1 as ZonedDate,
      calendarV3EventsView_universal_d_RecurrenceType as RecurrenceType,
      calendarV3EventsView_universal_d_RecurrenceRule as RecurrenceRule,
      calendarV3EventsView_universal_d_Frequency as Frequency,
      calendarV3EventsView_universal_d_Day as Day,
      calendarV3EventsView_universal_d_Transparency as Transparency,
      Location$1 as Location,
      LocationType$1 as LocationType,
      calendarV3EventsView_universal_d_Resource as Resource,
      Role$1 as Role,
      calendarV3EventsView_universal_d_Participants as Participants,
      Participant$1 as Participant,
      calendarV3EventsView_universal_d_ParticipantsStatus as ParticipantsStatus,
      ConferencingDetails$1 as ConferencingDetails,
      Type$1 as Type,
      calendarV3EventsView_universal_d_Field as Field,
      Permission$1 as Permission,
      IdentificationData$3 as IdentificationData,
      IdentificationDataIdOneOf$3 as IdentificationDataIdOneOf,
      IdentityType$1 as IdentityType,
      ExtendedFields$2 as ExtendedFields,
      calendarV3EventsView_universal_d_EventRemoved as EventRemoved,
      calendarV3EventsView_universal_d_EventsViewExtended as EventsViewExtended,
      calendarV3EventsView_universal_d_GetEventsViewRequest as GetEventsViewRequest,
      calendarV3EventsView_universal_d_GetEventsViewResponse as GetEventsViewResponse,
      calendarV3EventsView_universal_d_ExtendEventsViewRequest as ExtendEventsViewRequest,
      calendarV3EventsView_universal_d_ExtendEventsViewResponse as ExtendEventsViewResponse,
      DomainEvent$3 as DomainEvent,
      DomainEventBodyOneOf$3 as DomainEventBodyOneOf,
      EntityCreatedEvent$3 as EntityCreatedEvent,
      RestoreInfo$3 as RestoreInfo,
      EntityUpdatedEvent$3 as EntityUpdatedEvent,
      EntityDeletedEvent$3 as EntityDeletedEvent,
      ActionEvent$3 as ActionEvent,
      Empty$3 as Empty,
      MessageEnvelope$3 as MessageEnvelope,
      WebhooksIdentificationData$1 as WebhooksIdentificationData,
      WebhooksIdentificationDataIdOneOf$1 as WebhooksIdentificationDataIdOneOf,
      WebhookIdentityType$3 as WebhookIdentityType,
      calendarV3EventsView_universal_d_getEventsView as getEventsView,
    };
  }
  
  /**
   * The `participation` object represents the relationship between a participant and
   * an [event](https://dev.wix.com/docs/rest/business-management/calendar/events-v3/event-object)
   * or [schedule](https://dev.wix.com/docs/rest/business-management/calendar/schedules-v3/schedule-object).
   * It includes details about the participant, whether the participation status is confirmed or
   * pending, which app owns the relevant event or schedule, and allows for custom data extensions.
   */
  interface Participation extends ParticipationParticipatedItemOneOf {
      /**
       * ID of the [schedule](https://dev.wix.com/docs/rest/business-management/calendar/schedules-v3/schedule-object)
       * associated with the participation.
       */
      scheduleId?: string | null;
      /**
       * ID of the [event](https://dev.wix.com/docs/rest/business-management/calendar/events-v3/event-object)
       * associated with the participation.
       */
      eventId?: string | null;
      /**
       * Participation ID.
       * @readonly
       */
      _id?: string | null;
      /** External ID. */
      externalId?: string | null;
      /** Information about the participant. */
      participant?: Participant;
      /**
       * Party size of the group or `1` for individuals.
       *
       * Min: `1`
       * Max: `1000`
       */
      partySize?: number | null;
      /**
       * Status of the party's participation in the event. Depending on your
       * implementation, confirmation may be handled by the business owner or the customer.
       *
       * Supported values:
       * + `CONFIRMED`: The party's participation is confirmed. For example, the business owner has confirmed a [booking](https://dev.wix.com/docs/rest/business-solutions/bookings/about-wix-bookings).
       * + `PENDING_CONFIRMATION`: The party's participation is awaiting confirmation. For example, the business owner still needs to approve the [booking](https://dev.wix.com/docs/rest/business-solutions/bookings/about-wix-bookings).
       *
       * Default: `CONFIRMED`
       */
      status?: Status$2;
      /**
       * ID of the app that owns the participation `object`. Identical to `appId` of the
       * [schedule](https://dev.wix.com/docs/rest/business-management/calendar/schedules-v3/schedule-object)
       * that the related
       * [event](https://dev.wix.com/docs/rest/business-management/calendar/events-v3/event-object)
       * belongs to.
       * @readonly
       */
      appId?: string | null;
      /**
       * Revision number, which increments by 1 each time the participation is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the participation.
       * Ignored when creating a participation.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date the participation was created in `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date the participation was updated in `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Extensions enabling applications or users to save custom data related to the participation. */
      extendedFields?: ExtendedFields$1;
  }
  /** @oneof */
  interface ParticipationParticipatedItemOneOf {
      /**
       * ID of the [schedule](https://dev.wix.com/docs/rest/business-management/calendar/schedules-v3/schedule-object)
       * associated with the participation.
       */
      scheduleId?: string | null;
      /**
       * ID of the [event](https://dev.wix.com/docs/rest/business-management/calendar/events-v3/event-object)
       * associated with the participation.
       */
      eventId?: string | null;
  }
  interface Participant {
      /**
       * Participant name.
       *
       * Min: 1 character
       * Max: 200 characters
       */
      name?: string | null;
      /** Participant's phone number. */
      phone?: string | null;
      /** Participant's email address. */
      email?: string | null;
      /**
       * [Contact](https://dev.wix.com/docs/sdk/backend-modules/crm/contacts/introduction)
       * ID of the participant.
       */
      contactId?: string | null;
  }
  enum Status$2 {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      /** The party's participation is confirmed. For example, the business owner has confirmed a [booking](https://dev.wix.com/docs/rest/business-solutions/bookings/about-wix-bookings). */
      CONFIRMED = "CONFIRMED",
      /** The party's participation is awaiting confirmation. For example, the business owner still needs to approve the [booking](https://dev.wix.com/docs/rest/business-solutions/bookings/about-wix-bookings). */
      PENDING_CONFIRMATION = "PENDING_CONFIRMATION"
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
  interface GetParticipationRequest {
      /** ID of the `participation` object to retrieve. */
      participationId: string | null;
  }
  interface GetParticipationResponse {
      /** Retrieved `participation` object. */
      participation?: Participation;
  }
  interface QueryParticipationsRequest {
      /** Query containing filters and paging. */
      query?: CursorQuery$1;
  }
  interface CursorQuery$1 extends CursorQueryPagingMethodOneOf$1 {
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
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$1 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$1;
  }
  interface CursorPaging$1 {
      /** Number of participations to load. */
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
  interface QueryParticipationsResponse {
      /** Retrieved `participation` objects matching the provided query. */
      participations?: Participation[];
      /** Paging metadata. */
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
  interface CreateParticipationRequest {
      /** `participation` object to create. */
      participation: Participation;
      /**
       * Idempotency key guaranteeing that you don't create the same `participation`
       * object more than once.
       */
      idempotencyKey?: string | null;
  }
  interface CreateParticipationResponse {
      /** Created `participation` object. */
      participation?: Participation;
  }
  interface UpdateParticipationRequest {
      /** `participation` object to update. */
      participation: Participation;
      /**
       * Optional field mask of fields to update.
       * @internal
       */
      fieldmask?: string[];
  }
  interface UpdateParticipationResponse {
      /** Updated `participation` object. */
      participation?: Participation;
  }
  interface ParticipationUpdatedWithMetadata {
      /** The updated participation. */
      participation?: Participation;
      /**
       * Temporary! will be replaced by diff very soon.
       * @internal
       * @deprecated
       */
      previousParticipation?: Participation;
  }
  interface DeleteParticipationRequest {
      /** ID of `participation` object to delete. */
      participationId: string | null;
  }
  interface DeleteParticipationResponse {
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
  interface Empty$2 {
  }
  interface SumParticipationsPartySizeByScheduleIdRequest {
      /** The schedule IDs. */
      scheduleIds?: string[] | null;
  }
  interface SumParticipationsPartySizeByScheduleIdResponse {
      /** The sum of party size by schedule ID. */
      partySizeSumByScheduleId?: PartySizeSumByScheduleId[];
  }
  interface PartySizeSumByScheduleId {
      /** The ID of the schedule. */
      scheduleId?: string | null;
      /** The sum of the participations party size. */
      partySizeSum?: number | null;
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
   * Retrieves a `participation` object.
   * @param participationId - ID of the `participation` object to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField participationId
   * @permissionId CALENDAR.PARTICIPATION_READ
   * @adminMethod
   * @returns Retrieved `participation` object.
   */
  function getParticipation(participationId: string | null): Promise<Participation>;
  /**
   * Creates a query to retrieve a list of participations.
   *
   * The `queryParticipations()` function builds a query to retrieve a list of participations and returns a `ParticipationsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is typically used to run the query using the [find()](https://dev.wix.com/docs/sdk/backend-modules/calendar/participations/participations-query-builder/find) function.
   *
   * You can refine the query by chaining `ParticipationsQueryBuilder` functions onto the query. `ParticipationsQueryBuilder` functions enable you to sort, filter, and control the results that `queryParticipations()` returns.
   *
   * `queryParticipations()` runs with the following `ParticipationsQueryBuilder` default that you can override:
   *
   * + `limit` is `50`.
   * + Sorted by `createdDate` in ascending order.
   *
   * The functions that are chained to `queryParticipations()` are applied in the order they are called.
   *
   * The following `ParticipationsQueryBuilder` functions are supported for the `queryParticipations()` function. For a full description of the participations object, see the object returned for the [items](https://dev.wix.com/docs/sdk/backend-modules/calendar/participations/participations-query-result/items) property in `ParticipationsQueryResult`.
   *
   * @public
   * @documentationMaturity preview
   * @permissionId CALENDAR.PARTICIPATION_READ
   * @adminMethod
   */
  function queryParticipations(): ParticipationsQueryBuilder;
  interface QueryCursorResult$1 {
      cursors: Cursors$1;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ParticipationsQueryResult extends QueryCursorResult$1 {
      items: Participation[];
      query: ParticipationsQueryBuilder;
      next: () => Promise<ParticipationsQueryResult>;
      prev: () => Promise<ParticipationsQueryResult>;
  }
  interface ParticipationsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'scheduleId' | 'eventId' | 'externalId', value: any) => ParticipationsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'scheduleId' | 'eventId' | '_id' | 'externalId', value: any) => ParticipationsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ParticipationsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ParticipationsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ParticipationsQueryResult>;
  }
  /**
   * Creates a `participation` object for a schedule or event.
   * @param participation - `participation` object to create.
   * @public
   * @documentationMaturity preview
   * @requiredField participation
   * @requiredField participation.participant
   * @requiredField participation.participant.name
   * @requiredField participation.partySize
   * @permissionId CALENDAR.PARTICIPATION_CREATE
   * @adminMethod
   * @returns Created `participation` object.
   */
  function createParticipation(participation: Participation, options?: CreateParticipationOptions): Promise<Participation>;
  interface CreateParticipationOptions {
      /**
       * Idempotency key guaranteeing that you don't create the same `participation`
       * object more than once.
       */
      idempotencyKey?: string | null;
  }
  /**
   * Updates a `participation` object.
   * @param _id - Participation ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField participation
   * @requiredField participation.revision
   * @permissionId CALENDAR.PARTICIPATION_UPDATE
   * @adminMethod
   * @returns Updated `participation` object.
   */
  function updateParticipation(_id: string | null, participation: UpdateParticipation, options?: UpdateParticipationOptions): Promise<Participation>;
  interface UpdateParticipation {
      /**
       * ID of the [schedule](https://dev.wix.com/docs/rest/business-management/calendar/schedules-v3/schedule-object)
       * associated with the participation.
       */
      scheduleId?: string | null;
      /**
       * ID of the [event](https://dev.wix.com/docs/rest/business-management/calendar/events-v3/event-object)
       * associated with the participation.
       */
      eventId?: string | null;
      /**
       * Participation ID.
       * @readonly
       */
      _id?: string | null;
      /** External ID. */
      externalId?: string | null;
      /** Information about the participant. */
      participant?: Participant;
      /**
       * Party size of the group or `1` for individuals.
       *
       * Min: `1`
       * Max: `1000`
       */
      partySize?: number | null;
      /**
       * Status of the party's participation in the event. Depending on your
       * implementation, confirmation may be handled by the business owner or the customer.
       *
       * Supported values:
       * + `CONFIRMED`: The party's participation is confirmed. For example, the business owner has confirmed a [booking](https://dev.wix.com/docs/rest/business-solutions/bookings/about-wix-bookings).
       * + `PENDING_CONFIRMATION`: The party's participation is awaiting confirmation. For example, the business owner still needs to approve the [booking](https://dev.wix.com/docs/rest/business-solutions/bookings/about-wix-bookings).
       *
       * Default: `CONFIRMED`
       */
      status?: Status$2;
      /**
       * ID of the app that owns the participation `object`. Identical to `appId` of the
       * [schedule](https://dev.wix.com/docs/rest/business-management/calendar/schedules-v3/schedule-object)
       * that the related
       * [event](https://dev.wix.com/docs/rest/business-management/calendar/events-v3/event-object)
       * belongs to.
       * @readonly
       */
      appId?: string | null;
      /**
       * Revision number, which increments by 1 each time the participation is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the participation.
       * Ignored when creating a participation.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date the participation was created in `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date the participation was updated in `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Extensions enabling applications or users to save custom data related to the participation. */
      extendedFields?: ExtendedFields$1;
  }
  interface UpdateParticipationOptions {
      /**
       * Optional field mask of fields to update.
       * @internal
       */
      fieldmask?: string[];
  }
  /**
   * Deletes a `participation` object.
   * @param participationId - ID of `participation` object to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField participationId
   * @permissionId CALENDAR.PARTICIPATION_DELETE
   * @adminMethod
   */
  function deleteParticipation(participationId: string | null): Promise<void>;
  
  type calendarV3Participation_universal_d_Participation = Participation;
  type calendarV3Participation_universal_d_ParticipationParticipatedItemOneOf = ParticipationParticipatedItemOneOf;
  type calendarV3Participation_universal_d_Participant = Participant;
  type calendarV3Participation_universal_d_GetParticipationRequest = GetParticipationRequest;
  type calendarV3Participation_universal_d_GetParticipationResponse = GetParticipationResponse;
  type calendarV3Participation_universal_d_QueryParticipationsRequest = QueryParticipationsRequest;
  type calendarV3Participation_universal_d_QueryParticipationsResponse = QueryParticipationsResponse;
  type calendarV3Participation_universal_d_CreateParticipationRequest = CreateParticipationRequest;
  type calendarV3Participation_universal_d_CreateParticipationResponse = CreateParticipationResponse;
  type calendarV3Participation_universal_d_UpdateParticipationRequest = UpdateParticipationRequest;
  type calendarV3Participation_universal_d_UpdateParticipationResponse = UpdateParticipationResponse;
  type calendarV3Participation_universal_d_ParticipationUpdatedWithMetadata = ParticipationUpdatedWithMetadata;
  type calendarV3Participation_universal_d_DeleteParticipationRequest = DeleteParticipationRequest;
  type calendarV3Participation_universal_d_DeleteParticipationResponse = DeleteParticipationResponse;
  type calendarV3Participation_universal_d_SumParticipationsPartySizeByScheduleIdRequest = SumParticipationsPartySizeByScheduleIdRequest;
  type calendarV3Participation_universal_d_SumParticipationsPartySizeByScheduleIdResponse = SumParticipationsPartySizeByScheduleIdResponse;
  type calendarV3Participation_universal_d_PartySizeSumByScheduleId = PartySizeSumByScheduleId;
  const calendarV3Participation_universal_d_getParticipation: typeof getParticipation;
  const calendarV3Participation_universal_d_queryParticipations: typeof queryParticipations;
  type calendarV3Participation_universal_d_ParticipationsQueryResult = ParticipationsQueryResult;
  type calendarV3Participation_universal_d_ParticipationsQueryBuilder = ParticipationsQueryBuilder;
  const calendarV3Participation_universal_d_createParticipation: typeof createParticipation;
  type calendarV3Participation_universal_d_CreateParticipationOptions = CreateParticipationOptions;
  const calendarV3Participation_universal_d_updateParticipation: typeof updateParticipation;
  type calendarV3Participation_universal_d_UpdateParticipation = UpdateParticipation;
  type calendarV3Participation_universal_d_UpdateParticipationOptions = UpdateParticipationOptions;
  const calendarV3Participation_universal_d_deleteParticipation: typeof deleteParticipation;
  namespace calendarV3Participation_universal_d {
    export {
      calendarV3Participation_universal_d_Participation as Participation,
      calendarV3Participation_universal_d_ParticipationParticipatedItemOneOf as ParticipationParticipatedItemOneOf,
      calendarV3Participation_universal_d_Participant as Participant,
      Status$2 as Status,
      ExtendedFields$1 as ExtendedFields,
      calendarV3Participation_universal_d_GetParticipationRequest as GetParticipationRequest,
      calendarV3Participation_universal_d_GetParticipationResponse as GetParticipationResponse,
      calendarV3Participation_universal_d_QueryParticipationsRequest as QueryParticipationsRequest,
      CursorQuery$1 as CursorQuery,
      CursorQueryPagingMethodOneOf$1 as CursorQueryPagingMethodOneOf,
      CursorPaging$1 as CursorPaging,
      calendarV3Participation_universal_d_QueryParticipationsResponse as QueryParticipationsResponse,
      CursorPagingMetadata$1 as CursorPagingMetadata,
      Cursors$1 as Cursors,
      calendarV3Participation_universal_d_CreateParticipationRequest as CreateParticipationRequest,
      calendarV3Participation_universal_d_CreateParticipationResponse as CreateParticipationResponse,
      calendarV3Participation_universal_d_UpdateParticipationRequest as UpdateParticipationRequest,
      calendarV3Participation_universal_d_UpdateParticipationResponse as UpdateParticipationResponse,
      calendarV3Participation_universal_d_ParticipationUpdatedWithMetadata as ParticipationUpdatedWithMetadata,
      calendarV3Participation_universal_d_DeleteParticipationRequest as DeleteParticipationRequest,
      calendarV3Participation_universal_d_DeleteParticipationResponse as DeleteParticipationResponse,
      DomainEvent$2 as DomainEvent,
      DomainEventBodyOneOf$2 as DomainEventBodyOneOf,
      EntityCreatedEvent$2 as EntityCreatedEvent,
      RestoreInfo$2 as RestoreInfo,
      EntityUpdatedEvent$2 as EntityUpdatedEvent,
      EntityDeletedEvent$2 as EntityDeletedEvent,
      ActionEvent$2 as ActionEvent,
      Empty$2 as Empty,
      calendarV3Participation_universal_d_SumParticipationsPartySizeByScheduleIdRequest as SumParticipationsPartySizeByScheduleIdRequest,
      calendarV3Participation_universal_d_SumParticipationsPartySizeByScheduleIdResponse as SumParticipationsPartySizeByScheduleIdResponse,
      calendarV3Participation_universal_d_PartySizeSumByScheduleId as PartySizeSumByScheduleId,
      MessageEnvelope$2 as MessageEnvelope,
      IdentificationData$2 as IdentificationData,
      IdentificationDataIdOneOf$2 as IdentificationDataIdOneOf,
      WebhookIdentityType$2 as WebhookIdentityType,
      calendarV3Participation_universal_d_getParticipation as getParticipation,
      calendarV3Participation_universal_d_queryParticipations as queryParticipations,
      calendarV3Participation_universal_d_ParticipationsQueryResult as ParticipationsQueryResult,
      calendarV3Participation_universal_d_ParticipationsQueryBuilder as ParticipationsQueryBuilder,
      calendarV3Participation_universal_d_createParticipation as createParticipation,
      calendarV3Participation_universal_d_CreateParticipationOptions as CreateParticipationOptions,
      calendarV3Participation_universal_d_updateParticipation as updateParticipation,
      calendarV3Participation_universal_d_UpdateParticipation as UpdateParticipation,
      calendarV3Participation_universal_d_UpdateParticipationOptions as UpdateParticipationOptions,
      calendarV3Participation_universal_d_deleteParticipation as deleteParticipation,
    };
  }
  
  /**
   * A collection of [events](https://dev.wix.com/docs/rest/business-management/calendar/events-v3/event-object)
   * associated with a specific entity, such as a
   * [Bookings service](https://dev.wix.com/docs/rest/business-solutions/bookings/services/services-v2/service-object),
   * or [Bookings resource](https://dev.wix.com/docs/rest/business-solutions/bookings/staff-members-and-resources/resource-v2/resource-object).
   * Schedules can also serve as templates for the events they manage, setting
   * default values like a default location.
   */
  interface Schedule {
      /**
       * Schedule ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * External ID. You can't update the external ID.
       *
       * If the schedule belongs to a Bookings staff member, identical to the ID of
       * the [resource](https://dev.wix.com/docs/sdk/backend-modules/bookings/resources/introduction).
       * If the schedule belongs to a Bookings service, identical to the ID of
       * the [service](https://dev.wix.com/docs/sdk/backend-modules/bookings/services/setup).
       */
      externalId?: string | null;
      /**
       * Schedule name.
       *
       * Min: 1 character
       * Max: 200 characters
       */
      name?: string | null;
      /**
       * Schedule status.
       *
       * Supported values:
       * - `ACTIVE`: You can add events to the schedule or update its fields.
       * - `CANCELLED`: You can't add events to the schedule or update its fields.
       *
       * Default: `ACTIVE`
       * @readonly
       */
      status?: Status$1;
      /**
       * Time zone the schedule is associated with in
       * [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database).
       * For example, `America/New_York`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       *
       * Min: 1 character
       * Max: 150 characters
       */
      timeZone?: string | null;
      /**
       * Whether the schedule's `timeZone` is automatically synced from
       * `timeZone` of the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       *
       * Default: `true`
       */
      businessTimeZoneEnabled?: boolean | null;
      /**
       * Default `title` for [events](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/introduction)
       * that are added to the schedule.
       *
       * Min: 1 character
       * Max: 200 characters
       */
      defaultTitle?: string | null;
      /**
       * Default `location` for [events](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/introduction)
       * that are added to the schedule.
       */
      defaultLocation?: Location;
      /**
       * Default `totalCapacity` for [events](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/introduction)
       * that are added to the schedule.
       *
       * Min: `0`
       */
      defaultCapacity?: number | null;
      /**
       * Default `conferencingDetails` for [events](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/introduction)
       * that are added to the schedule.
       * Returned only if explicitly requested. For more details, see the [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions#retrieve-personal-information).
       */
      defaultConferencingDetails?: ConferencingDetails;
      /**
       * ID of the app that's associated with the schedule. You can't update `appId`.
       * If you want to create a schedule and ensure its associated events appear
       * in the [Bookings calendar](https://support.wix.com/en/article/wix-bookings-about-the-wix-booking-calendar),
       * you must provide the Wix Bookings app ID
       * `13d21c63-b5ec-5912-8397-c3a5ddb27a97`.
       */
      appId?: string | null;
      /**
       * List of permissions associated with the schedule. Refer to the
       * [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions#roles)
       * for more information.
       *
       * Max: 1 permission
       */
      permissions?: Permission[];
      /** Extensions enabling applications or users to save custom data related to the schedule. */
      extendedFields?: ExtendedFields;
      /**
       * Revision number, which increments by 1 each time the schedule is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the schedule.
       * Ignored when creating a schedule.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date the schedule was created in `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date the schedule was last updated in `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  enum Status$1 {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      /** You can add events to the schedule or update its fields. */
      ACTIVE = "ACTIVE",
      /** You can't add events to the schedule or update its fields. */
      CANCELLED = "CANCELLED"
  }
  interface Location {
      /**
       * [Location](https://dev.wix.com/docs/sdk/backend-modules/business-tools/locations/introduction)
       * ID. Available only for `BUSINESS` locations.
       */
      _id?: string | null;
      /**
       * Location type.
       *
       * Supported values:
       * + `BUSINESS`: The event is held at a business location.
       * + `CUSTOMER`: The event is held at the customer's location, such as their home or office.
       * + `CUSTOM`: The event is held at an address or venue not tied to the business or customer.
       */
      type?: LocationType;
      /**
       * Location name. For `BUSINESS` locations, it's identical to the
       * [location](https://dev.wix.com/docs/sdk/backend-modules/business-tools/locations/introduction)
       * `name`.
       *
       * Min: 1 character
       * Max: 150 characters
       */
      name?: string | null;
      /**
       * Location address. For `BUSINESS` locations, it's identical to the
       * [location](https://dev.wix.com/docs/rest/business-management/locations/location-object)'s
       * `formattedAddress`.
       */
      address?: string | null;
  }
  enum LocationType {
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      /** The event is held at a business location. */
      BUSINESS = "BUSINESS",
      /** The event is held at the customer's location, such as their home or office. */
      CUSTOMER = "CUSTOMER",
      /** The event is held at an address or venue not tied to the business or customer. */
      CUSTOM = "CUSTOM"
  }
  interface ConferencingDetails {
      /** Conference type. For example, `Zoom`. */
      type?: Type;
      /**
       * URL used by the host to start the conference.
       *
       * Min: 1 character
       * Max: 2000 characters
       */
      hostUrl?: string | null;
      /**
       * URL used by a guest to join the conference.
       *
       * Min: 1 character
       * Max: 2000 characters
       */
      guestUrl?: string | null;
      /**
       * Conference password.
       *
       * Min: 1 character
       * Max: 100 characters
       */
      password?: string | null;
      /**
       * Conference description.
       *
       * Min: 1 character
       * Max: 200 characters
       * @internal
       */
      description?: string | null;
      /**
       * Conference ID in an external system.
       *
       * Min: 1 character
       * Max: 150 characters
       */
      externalId?: string | null;
  }
  enum Type {
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      ZOOM = "ZOOM",
      CUSTOM = "CUSTOM"
  }
  interface Permission {
      /**
       * [Wix user](https://dev.wix.com/docs/build-apps/develop-your-app/access/about-identities#wix-users)
       * granted the permission.
       */
      identity?: IdentificationData$1;
      /**
       * Permission role.
       *
       * Supported values:
       * + `WRITER`: Full read and write access.
       * + `COMMENTER`: Full read access, write access limited to `event.notes`.
       */
      role?: Role;
  }
  interface IdentificationData$1 extends IdentificationDataIdOneOf$1 {
      /**
       * ID of a Wix user. For example, the site owner or a
       * [site collaborator](https://support.wix.com/en/article/inviting-people-to-contribute-to-your-site).
       */
      wixUserId?: string;
      /**
       * @internal
       * @readonly
       */
      identityType?: IdentityType;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$1 {
      /**
       * ID of a Wix user. For example, the site owner or a
       * [site collaborator](https://support.wix.com/en/article/inviting-people-to-contribute-to-your-site).
       */
      wixUserId?: string;
  }
  enum IdentityType {
      UNKNOWN = "UNKNOWN",
      WIX_USER = "WIX_USER"
  }
  enum Role {
      UNKNOWN_ROLE = "UNKNOWN_ROLE",
      /** Full read and write access. */
      WRITER = "WRITER",
      /** Full read access, write access limited to `event.notes`. */
      COMMENTER = "COMMENTER"
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
  interface GetScheduleRequest {
      /** ID of the schedule to retrieve. */
      scheduleId: string | null;
      /**
       * Information about which fields containing personal data to return. Refer to the
       * [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions)
       * for more information.
       *
       * Supported values:
       * + `PI_FIELDS`: Returns all fields with personal data. Your app must have `Read Calendars - Including PI` or `Manage Calendars` permission scope.
       * + `OWN_PI_FIELDS`: Returns only fields containing your own personal data.
       *
       * Max: 1 field
       * Default: No personal data is returned.
       */
      fields?: RequestedFields[];
  }
  enum RequestedFields {
      UNKNOWN_REQUESTED_FIELDS = "UNKNOWN_REQUESTED_FIELDS",
      /** Returns all fields with personal data. Your app must have `Read Calendars - Including PI` or `Manage Calendars` permission scope. */
      PI_FIELDS = "PI_FIELDS",
      /** Returns only fields containing your own personal data. */
      OWN_PI_FIELDS = "OWN_PI_FIELDS"
  }
  interface GetScheduleResponse {
      /** Retrieved schedule. */
      schedule?: Schedule;
  }
  interface QuerySchedulesRequest {
      /** Query containing filters and paging. */
      query?: CursorQuery;
      /**
       * Information about which fields containing personal data to return. Refer to the
       * [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions)
       * for more information.
       *
       * Supported values:
       * + `PI_FIELDS`: Returns all fields with personal data. Your app must have `Read Calendars - Including PI` or `Manage Calendars` permission scope.
       * + `OWN_PI_FIELDS`: Returns only fields containing your own personal data.
       *
       * Max: 1 field
       * Default: No personal data is returned.
       */
      fields?: RequestedFields[];
      /**
       * Whether to return consistent response.
       * Please consult with us at #bookings-calendar-platform if you think your case requires consistent reads.
       * @internal
       */
      consistent?: boolean | null;
  }
  /** TODO Diverge */
  interface CursorQuery extends CursorQueryPagingMethodOneOf {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter`. */
      cursorPaging?: CursorPaging;
      /**
       * Filter object.
       * See [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language)
       * for more information.
       *
       * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`.
       *
       * For a detailed list of supported filters, see Supported Filters.
       */
      filter?: Record<string, any> | null;
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter`. */
      cursorPaging?: CursorPaging;
  }
  /** TODO Diverge */
  interface CursorPaging {
      /**
       * Number of schedules to return.
       *
       * Min: `1`
       * Max: `100`
       * Default: `50`
       */
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
  interface QuerySchedulesResponse {
      /** Retrieved schedules matching the provided query. */
      schedules?: Schedule[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata;
  }
  /** TODO Diverge */
  interface CursorPagingMetadata {
      /** Number of schedules returned in the current page of the response. */
      count?: number | null;
      /** Use these cursor to paginate between results. [Read more](https://dev.wix.com/api/rest/getting-started/api-query-language#getting-started_api-query-language_cursor-paging). */
      cursors?: Cursors;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface CreateScheduleRequest {
      /** Schedule to create. */
      schedule: Schedule;
      /**
       * Idempotency key guaranteeing that you don't create the same schedule more
       * than once.
       */
      idempotencyKey?: string | null;
  }
  interface CreateScheduleResponse {
      /** Created schedule. */
      schedule?: Schedule;
  }
  interface UpdateScheduleRequest {
      /** Schedule to update. */
      schedule: Schedule;
      /**
       * Optional list of fields to update.
       * @internal
       */
      fieldmask?: string[];
      /**
       * Information about whether participants of the schedule's updated events are
       * notified and the message they receive.
       */
      participantNotification?: ParticipantNotification;
  }
  interface ParticipantNotification {
      /**
       * Whether to notify the participants about changes made to the schedule or event.
       *
       * Default: `false`
       */
      notifyParticipants?: boolean | null;
      /**
       * Message to send.
       *
       * Min: 1 character
       * Max: 5000 characters
       */
      message?: string | null;
      /**
       * Optional additional metadata.
       * Limits: max keys: `10`, max key length: `64`, max value length: `1000`.
       * @internal
       */
      metadata?: Record<string, string>;
  }
  interface UpdateScheduleResponse {
      /** Updated schedule. */
      schedule?: Schedule;
  }
  /** `PRIVATE` until we'll have standard events metadata from Infra. */
  interface ScheduleUpdatedWithMetadata {
      /** The updated schedule. */
      schedule?: Schedule;
      /** Whether to notify participants regarding the changes. */
      participantNotification?: ParticipantNotification;
      /**
       * Temporary! will be replaced by diff very soon.
       * @internal
       * @deprecated
       */
      previousSchedule?: Schedule;
  }
  interface CloneScheduleRequest {
      /** ID of the schedule to clone. */
      scheduleId?: string | null;
      /** Fields to override in the cloned schedule. */
      schedule?: Schedule;
      /**
       * Optional fields to override.
       * For example, to set empty values for fields that would otherwise be cloned.
       * @internal
       */
      fieldmask?: string[];
  }
  interface CloneScheduleResponse {
      /** Cloned schedule. */
      schedule?: Schedule;
  }
  interface ScheduleCloned {
      /** New cloned schedule. */
      schedule?: Schedule;
      /** The clone trigger. */
      trigger?: Trigger;
      /** The original Meta Site ID if different. */
      originalMetaSiteId?: string | null;
      /** The original schedule ID if different. */
      originalScheduleId?: string | null;
  }
  enum Trigger {
      UNKNOWN_TRIGGER = "UNKNOWN_TRIGGER",
      /** Schedule cloned using the `CloneSchedule` API. */
      SCHEDULE_CLONED = "SCHEDULE_CLONED",
      /** Site duplicated from the same account. */
      SITE_DUPLICATED_FROM_SAME_ACCOUNT = "SITE_DUPLICATED_FROM_SAME_ACCOUNT",
      /** Site duplicated from a different account. */
      SITE_DUPLICATED_FROM_DIFFERENT_ACCOUNT = "SITE_DUPLICATED_FROM_DIFFERENT_ACCOUNT",
      /** Site created from template. */
      SITE_CREATED_FROM_TEMPLATE = "SITE_CREATED_FROM_TEMPLATE",
      /** Other. */
      OTHER = "OTHER"
  }
  interface CancelScheduleRequest {
      /** ID of the schedule to cancel. */
      scheduleId: string | null;
      /**
       * Whether to preserve future events with participants.
       * Default: `false`.
       */
      preserveFutureEventsWithParticipants?: boolean | null;
      /**
       * Information about whether participants of the schedule's updated events are
       * notified and the message they receive.
       */
      participantNotification?: ParticipantNotification;
  }
  interface CancelScheduleResponse {
      /** Canceled schedule. */
      schedule?: Schedule;
  }
  interface ScheduleCancelled {
      /** Canceled schedule. */
      schedule?: Schedule;
      /** Whether future events with participants were preserved. */
      preserveFutureEventsWithParticipants?: boolean | null;
      /**
       * Whether to notify participants regarding the changes.
       * `PRIVATE` until we'll have standard events metadata from Infra.
       * @internal
       */
      participantNotification?: ParticipantNotification;
  }
  interface MetaSiteSpecialEvent extends MetaSiteSpecialEventPayloadOneOf {
      /** Emitted on a meta site creation. */
      siteCreated?: SiteCreated;
      /** Emitted on a meta site transfer completion. */
      siteTransferred?: SiteTransferred;
      /** Emitted on a meta site deletion. */
      siteDeleted?: SiteDeleted;
      /** Emitted on a meta site restoration. */
      siteUndeleted?: SiteUndeleted;
      /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
      sitePublished?: SitePublished;
      /** Emitted on a meta site unpublish. */
      siteUnpublished?: SiteUnpublished;
      /** Emitted when meta site is marked as template. */
      siteMarkedAsTemplate?: SiteMarkedAsTemplate;
      /** Emitted when meta site is marked as a WixSite. */
      siteMarkedAsWixSite?: SiteMarkedAsWixSite;
      /** Emitted when an application is provisioned (installed). */
      serviceProvisioned?: ServiceProvisioned;
      /** Emitted when an application is removed (uninstalled). */
      serviceRemoved?: ServiceRemoved;
      /** Emitted when meta site name (URL slug) is changed. */
      siteRenamedPayload?: SiteRenamed;
      /** Emitted when meta site was permanently deleted. */
      hardDeleted?: SiteHardDeleted;
      /** Emitted on a namespace change. */
      namespaceChanged?: NamespaceChanged;
      /** Emitted when Studio is attached. */
      studioAssigned?: StudioAssigned;
      /** Emitted when Studio is detached. */
      studioUnassigned?: StudioUnassigned;
      /** A meta site id. */
      metaSiteId?: string;
      /** A meta site version. Monotonically increasing. */
      version?: string;
      /** A timestamp of the event. */
      timestamp?: string;
      /**
       * TODO(meta-site): Change validation once validations are disabled for consumers
       * More context: https://wix.slack.com/archives/C0UHEBPFT/p1720957844413149 and https://wix.slack.com/archives/CFWKX325T/p1728892152855659
       */
      assets?: Asset[];
  }
  /** @oneof */
  interface MetaSiteSpecialEventPayloadOneOf {
      /** Emitted on a meta site creation. */
      siteCreated?: SiteCreated;
      /** Emitted on a meta site transfer completion. */
      siteTransferred?: SiteTransferred;
      /** Emitted on a meta site deletion. */
      siteDeleted?: SiteDeleted;
      /** Emitted on a meta site restoration. */
      siteUndeleted?: SiteUndeleted;
      /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
      sitePublished?: SitePublished;
      /** Emitted on a meta site unpublish. */
      siteUnpublished?: SiteUnpublished;
      /** Emitted when meta site is marked as template. */
      siteMarkedAsTemplate?: SiteMarkedAsTemplate;
      /** Emitted when meta site is marked as a WixSite. */
      siteMarkedAsWixSite?: SiteMarkedAsWixSite;
      /** Emitted when an application is provisioned (installed). */
      serviceProvisioned?: ServiceProvisioned;
      /** Emitted when an application is removed (uninstalled). */
      serviceRemoved?: ServiceRemoved;
      /** Emitted when meta site name (URL slug) is changed. */
      siteRenamedPayload?: SiteRenamed;
      /** Emitted when meta site was permanently deleted. */
      hardDeleted?: SiteHardDeleted;
      /** Emitted on a namespace change. */
      namespaceChanged?: NamespaceChanged;
      /** Emitted when Studio is attached. */
      studioAssigned?: StudioAssigned;
      /** Emitted when Studio is detached. */
      studioUnassigned?: StudioUnassigned;
  }
  interface Asset {
      /** An application definition id (app_id in dev-center). For legacy reasons may be UUID or a string (from Java Enum). */
      appDefId?: string;
      /** An instance id. For legacy reasons may be UUID or a string. */
      instanceId?: string;
      /** An application state. */
      state?: State;
  }
  enum State {
      UNKNOWN = "UNKNOWN",
      ENABLED = "ENABLED",
      DISABLED = "DISABLED",
      PENDING = "PENDING",
      DEMO = "DEMO"
  }
  interface SiteCreated {
      /** A template identifier (empty if not created from a template). */
      originTemplateId?: string;
      /** An account id of the owner. */
      ownerId?: string;
      /** A context in which meta site was created. */
      context?: SiteCreatedContext;
      /**
       * A meta site id from which this site was created.
       *
       * In case of a creation from a template it's a template id.
       * In case of a site duplication ("Save As" in dashboard or duplicate in UM) it's an id of a source site.
       */
      originMetaSiteId?: string | null;
      /** A meta site name (URL slug). */
      siteName?: string;
      /** A namespace. */
      namespace?: Namespace;
  }
  enum SiteCreatedContext {
      /** A valid option, we don't expose all reasons why site might be created. */
      OTHER = "OTHER",
      /** A meta site was created from template. */
      FROM_TEMPLATE = "FROM_TEMPLATE",
      /** A meta site was created by copying of the transfferred meta site. */
      DUPLICATE_BY_SITE_TRANSFER = "DUPLICATE_BY_SITE_TRANSFER",
      /** A copy of existing meta site. */
      DUPLICATE = "DUPLICATE",
      /** A meta site was created as a transfferred site (copy of the original), old flow, should die soon. */
      OLD_SITE_TRANSFER = "OLD_SITE_TRANSFER",
      /** deprecated A meta site was created for Flash editor. */
      FLASH = "FLASH"
  }
  enum Namespace {
      UNKNOWN_NAMESPACE = "UNKNOWN_NAMESPACE",
      /** Default namespace for UGC sites. MetaSites with this namespace will be shown in a user's site list by default. */
      WIX = "WIX",
      /** ShoutOut stand alone product. These are siteless (no actual Wix site, no HtmlWeb). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      SHOUT_OUT = "SHOUT_OUT",
      /** MetaSites created by the Albums product, they appear as part of the Albums app. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      ALBUMS = "ALBUMS",
      /** Part of the WixStores migration flow, a user tries to migrate and gets this site to view and if the user likes it then stores removes this namespace and deletes the old site with the old stores. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      WIX_STORES_TEST_DRIVE = "WIX_STORES_TEST_DRIVE",
      /** Hotels standalone (siteless). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      HOTELS = "HOTELS",
      /** Clubs siteless MetaSites, a club without a wix website. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      CLUBS = "CLUBS",
      /** A partially created ADI website. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      ONBOARDING_DRAFT = "ONBOARDING_DRAFT",
      /** AppBuilder for AppStudio / shmite (c). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      DEV_SITE = "DEV_SITE",
      /** LogoMaker websites offered to the user after logo purchase. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      LOGOS = "LOGOS",
      /** VideoMaker websites offered to the user after video purchase. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      VIDEO_MAKER = "VIDEO_MAKER",
      /** MetaSites with this namespace will *not* be shown in a user's site list by default. */
      PARTNER_DASHBOARD = "PARTNER_DASHBOARD",
      /** MetaSites with this namespace will *not* be shown in a user's site list by default. */
      DEV_CENTER_COMPANY = "DEV_CENTER_COMPANY",
      /**
       * A draft created by HTML editor on open. Upon "first save" it will be moved to be of WIX domain.
       *
       * Meta site with this namespace will *not* be shown in a user's site list by default.
       */
      HTML_DRAFT = "HTML_DRAFT",
      /**
       * the user-journey for Fitness users who want to start from managing their business instead of designing their website.
       * Will be accessible from Site List and will not have a website app.
       * Once the user attaches a site, the site will become a regular wixsite.
       */
      SITELESS_BUSINESS = "SITELESS_BUSINESS",
      /** Belongs to "strategic products" company. Supports new product in the creator's economy space. */
      CREATOR_ECONOMY = "CREATOR_ECONOMY",
      /** It is to be used in the Business First efforts. */
      DASHBOARD_FIRST = "DASHBOARD_FIRST",
      /** Bookings business flow with no site. */
      ANYWHERE = "ANYWHERE",
      /** Namespace for Headless Backoffice with no editor */
      HEADLESS = "HEADLESS",
      /**
       * Namespace for master site that will exist in parent account that will be referenced by subaccounts
       * The site will be used for account level CSM feature for enterprise
       */
      ACCOUNT_MASTER_CMS = "ACCOUNT_MASTER_CMS",
      /** Rise.ai Siteless account management for Gift Cards and Store Credit. */
      RISE = "RISE",
      /**
       * As part of the branded app new funnel, users now can create a meta site that will be branded app first.
       * There's a blank site behind the scene but it's blank).
       * The Mobile company will be the owner of this namespace.
       */
      BRANDED_FIRST = "BRANDED_FIRST",
      /** Nownia.com Siteless account management for Ai Scheduling Assistant. */
      NOWNIA = "NOWNIA",
      /**
       * UGC Templates are templates that are created by users for personal use and to sale to other users.
       * The Partners company owns this namespace.
       */
      UGC_TEMPLATE = "UGC_TEMPLATE",
      /** Codux Headless Sites */
      CODUX = "CODUX",
      /** Bobb - AI Design Creator. */
      MEDIA_DESIGN_CREATOR = "MEDIA_DESIGN_CREATOR"
  }
  /** Site transferred to another user. */
  interface SiteTransferred {
      /** A previous owner id (user that transfers meta site). */
      oldOwnerId?: string;
      /** A new owner id (user that accepts meta site). */
      newOwnerId?: string;
  }
  /** Soft deletion of the meta site. Could be restored. */
  interface SiteDeleted {
      /** A deletion context. */
      deleteContext?: DeleteContext;
  }
  interface DeleteContext {
      /** When the meta site was deleted. */
      dateDeleted?: Date | null;
      /** A status. */
      deleteStatus?: DeleteStatus;
      /** A reason (flow). */
      deleteOrigin?: string;
      /** A service that deleted it. */
      initiatorId?: string | null;
  }
  enum DeleteStatus {
      UNKNOWN = "UNKNOWN",
      TRASH = "TRASH",
      DELETED = "DELETED",
      PENDING_PURGE = "PENDING_PURGE"
  }
  /** Restoration of the meta site. */
  interface SiteUndeleted {
  }
  /** First publish of a meta site. Or subsequent publish after unpublish. */
  interface SitePublished {
  }
  interface SiteUnpublished {
      /** A list of URLs previously associated with the meta site. */
      urls?: string[];
  }
  interface SiteMarkedAsTemplate {
  }
  interface SiteMarkedAsWixSite {
  }
  interface ServiceProvisioned {
      /** Either UUID or EmbeddedServiceType. */
      appDefId?: string;
      /** Not only UUID. Something here could be something weird. */
      instanceId?: string;
      /** An instance id from which this instance is originated. */
      originInstanceId?: string;
      /** A version. */
      version?: string | null;
      /** The origin meta site id */
      originMetaSiteId?: string | null;
  }
  interface ServiceRemoved {
      /** Either UUID or EmbeddedServiceType. */
      appDefId?: string;
      /** Not only UUID. Something here could be something weird. */
      instanceId?: string;
      /** A version. */
      version?: string | null;
  }
  /** Rename of the site. Meaning, free public url has been changed as well. */
  interface SiteRenamed {
      /** A new meta site name (URL slug). */
      newSiteName?: string;
      /** A previous meta site name (URL slug). */
      oldSiteName?: string;
  }
  /**
   * Hard deletion of the meta site.
   *
   * Could not be restored. Therefore it's desirable to cleanup data.
   */
  interface SiteHardDeleted {
      /** A deletion context. */
      deleteContext?: DeleteContext;
  }
  interface NamespaceChanged {
      /** A previous namespace. */
      oldNamespace?: Namespace;
      /** A new namespace. */
      newNamespace?: Namespace;
  }
  /** Assigned Studio editor */
  interface StudioAssigned {
  }
  /** Unassigned Studio editor */
  interface StudioUnassigned {
  }
  interface Empty$1 {
  }
  /** Encapsulates all details written to the Greyhound topic when a site's properties are updated. */
  interface SitePropertiesNotification$1 {
      /** The site ID for which this update notification applies. */
      metasiteId?: string;
      /** The actual update event. */
      event?: SitePropertiesEvent$1;
      /** A convenience set of mappings from the MetaSite ID to its constituent services. */
      translations?: Translation$1[];
      /** Context of the notification */
      changeContext?: ChangeContext$1;
  }
  /** The actual update event for a particular notification. */
  interface SitePropertiesEvent$1 {
      /** Version of the site's properties represented by this update. */
      version?: number;
      /**
       * Set of properties that were updated - corresponds to the fields in "properties".
       * @internal
       */
      fields?: string[];
      /** Updated properties. */
      properties?: Properties$1;
  }
  interface Properties$1 {
      /** Site categories. */
      categories?: Categories$1;
      /** Site locale. */
      locale?: Locale$1;
      /**
       * Site language.
       *
       * Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format.
       */
      language?: string | null;
      /**
       * Site currency format used to bill customers.
       *
       * Three-letter currency code in [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
       */
      paymentCurrency?: string | null;
      /** Timezone in `America/New_York` format. */
      timeZone?: string | null;
      /** Email address. */
      email?: string | null;
      /** Phone number. */
      phone?: string | null;
      /** Fax number. */
      fax?: string | null;
      /** Address. */
      address?: Address$1;
      /** Site display name. */
      siteDisplayName?: string | null;
      /** Business name. */
      businessName?: string | null;
      /** Path to the site's logo in Wix Media (without Wix Media base URL). */
      logo?: string | null;
      /** Site description. */
      description?: string | null;
      /**
       * Business schedule. Regular and exceptional time periods when the business is open or the service is available.
       *
       * __Note:__ Not supported by Wix Bookings.
       */
      businessSchedule?: BusinessSchedule$1;
      /** Supported languages of a site and the primary language. */
      multilingual?: Multilingual$1;
      /** Cookie policy the Wix user defined for their site (before the site visitor interacts with/limits it). */
      consentPolicy?: ConsentPolicy$1;
      /**
       * Supported values: `FITNESS SERVICE`, `RESTAURANT`, `BLOG`, `STORE`, `EVENT`, `UNKNOWN`.
       *
       * Site business type.
       */
      businessConfig?: string | null;
      /** External site URL that uses Wix as its headless business solution. */
      externalSiteUrl?: string | null;
      /** Track clicks analytics. */
      trackClicksAnalytics?: boolean;
  }
  interface Categories$1 {
      /** Primary site category. */
      primary?: string;
      /** Secondary site category. */
      secondary?: string[];
      /** Business Term Id */
      businessTermId?: string | null;
  }
  interface Locale$1 {
      /** Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. */
      languageCode?: string;
      /** Two-letter country code in [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) format. */
      country?: string;
  }
  interface Address$1 {
      /** Street name. */
      street?: string;
      /** City name. */
      city?: string;
      /** Two-letter country code in an [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. */
      country?: string;
      /** State. */
      state?: string;
      /** Zip or postal code. */
      zip?: string;
      /** Extra information to be displayed in the address. */
      hint?: AddressHint$1;
      /** Whether this address represents a physical location. */
      isPhysical?: boolean;
      /** Google-formatted version of this address. */
      googleFormattedAddress?: string;
      /** Street number. */
      streetNumber?: string;
      /** Apartment number. */
      apartmentNumber?: string;
      /** Geographic coordinates of location. */
      coordinates?: GeoCoordinates$1;
  }
  /**
   * Extra information on displayed addresses.
   * This is used for display purposes. Used to add additional data about the address, such as "In the passage".
   * Free text. In addition, the user can state where to display the additional description - before, after, or instead of the address string.
   */
  interface AddressHint$1 {
      /** Extra text displayed next to, or instead of, the actual address. */
      text?: string;
      /** Where the extra text should be displayed. */
      placement?: PlacementType$1;
  }
  /** Where the extra text should be displayed: before, after or instead of the actual address. */
  enum PlacementType$1 {
      BEFORE = "BEFORE",
      AFTER = "AFTER",
      REPLACE = "REPLACE"
  }
  /** Geocoordinates for a particular address. */
  interface GeoCoordinates$1 {
      /** Latitude of the location. Must be between -90 and 90. */
      latitude?: number;
      /** Longitude of the location. Must be between -180 and 180. */
      longitude?: number;
  }
  /** Business schedule. Regular and exceptional time periods when the business is open or the service is available. */
  interface BusinessSchedule$1 {
      /** Weekly recurring time periods when the business is regularly open or the service is available. Limited to 100 time periods. */
      periods?: TimePeriod$1[];
      /** Exceptions to the business's regular hours. The business can be open or closed during the exception. */
      specialHourPeriod?: SpecialHourPeriod$1[];
  }
  /** Weekly recurring time periods when the business is regularly open or the service is available. */
  interface TimePeriod$1 {
      /** Day of the week the period starts on. */
      openDay?: DayOfWeek$1;
      /**
       * Time the period starts in 24-hour [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) extended format. Valid values are `00:00` to `24:00`, where `24:00` represents
       * midnight at the end of the specified day.
       */
      openTime?: string;
      /** Day of the week the period ends on. */
      closeDay?: DayOfWeek$1;
      /**
       * Time the period ends in 24-hour [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) extended format. Valid values are `00:00` to `24:00`, where `24:00` represents
       * midnight at the end of the specified day.
       *
       * __Note:__ If `openDay` and `closeDay` specify the same day of the week `closeTime` must be later than `openTime`.
       */
      closeTime?: string;
  }
  /** Enumerates the days of the week. */
  enum DayOfWeek$1 {
      MONDAY = "MONDAY",
      TUESDAY = "TUESDAY",
      WEDNESDAY = "WEDNESDAY",
      THURSDAY = "THURSDAY",
      FRIDAY = "FRIDAY",
      SATURDAY = "SATURDAY",
      SUNDAY = "SUNDAY"
  }
  /** Exception to the business's regular hours. The business can be open or closed during the exception. */
  interface SpecialHourPeriod$1 {
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
  interface Multilingual$1 {
      /** Supported languages list. */
      supportedLanguages?: SupportedLanguage$1[];
      /** Whether to redirect to user language. */
      autoRedirect?: boolean;
  }
  interface SupportedLanguage$1 {
      /** Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. */
      languageCode?: string;
      /** Locale. */
      locale?: Locale$1;
      /** Whether the supported language is the primary language for the site. */
      isPrimary?: boolean;
      /** Language icon. */
      countryCode?: string;
      /** How the language will be resolved. For internal use. */
      resolutionMethod?: ResolutionMethod$1;
  }
  enum ResolutionMethod$1 {
      QUERY_PARAM = "QUERY_PARAM",
      SUBDOMAIN = "SUBDOMAIN",
      SUBDIRECTORY = "SUBDIRECTORY"
  }
  interface ConsentPolicy$1 {
      /** Whether the site uses cookies that are essential to site operation. */
      essential?: boolean | null;
      /** Whether the site uses cookies that affect site performance and other functional measurements. */
      functional?: boolean | null;
      /** Whether the site uses cookies that collect analytics about how the site is used (in order to improve it). */
      analytics?: boolean | null;
      /** Whether the site uses cookies that collect information allowing better customization of the experience for a current visitor. */
      advertising?: boolean | null;
      /** CCPA compliance flag. */
      dataToThirdParty?: boolean | null;
  }
  /** A single mapping from the MetaSite ID to a particular service. */
  interface Translation$1 {
      /** The service type. */
      serviceType?: string;
      /** The application definition ID; this only applies to services of type ThirdPartyApps. */
      appDefId?: string;
      /** The instance ID of the service. */
      instanceId?: string;
  }
  interface ChangeContext$1 extends ChangeContextPayloadOneOf$1 {
      /** Properties were updated. */
      propertiesChange?: PropertiesChange$1;
      /** Default properties were created on site creation. */
      siteCreated?: V4SiteCreated$1;
      /** Properties were cloned on site cloning. */
      siteCloned?: SiteCloned$1;
  }
  /** @oneof */
  interface ChangeContextPayloadOneOf$1 {
      /** Properties were updated. */
      propertiesChange?: PropertiesChange$1;
      /** Default properties were created on site creation. */
      siteCreated?: V4SiteCreated$1;
      /** Properties were cloned on site cloning. */
      siteCloned?: SiteCloned$1;
  }
  interface PropertiesChange$1 {
  }
  interface V4SiteCreated$1 {
      /** Origin template site id. */
      originTemplateId?: string | null;
  }
  interface SiteCloned$1 {
      /** Origin site id. */
      originMetaSiteId?: string;
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
      identity?: WebhooksIdentificationData;
      /** Stringify payload. */
      data?: string;
  }
  interface WebhooksIdentificationData extends WebhooksIdentificationDataIdOneOf {
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
  interface WebhooksIdentificationDataIdOneOf {
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
   * Retrieves a schedule.
   * @param scheduleId - ID of the schedule to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField scheduleId
   * @permissionId CALENDAR.SCHEDULE_READ
   * @permissionId CALENDAR.SCHEDULE_READ_PI
   * @returns Retrieved schedule.
   */
  function getSchedule(scheduleId: string | null, options?: GetScheduleOptions): Promise<Schedule>;
  interface GetScheduleOptions {
      /**
       * Information about which fields containing personal data to return. Refer to the
       * [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions)
       * for more information.
       *
       * Supported values:
       * + `PI_FIELDS`: Returns all fields with personal data. Your app must have `Read Calendars - Including PI` or `Manage Calendars` permission scope.
       * + `OWN_PI_FIELDS`: Returns only fields containing your own personal data.
       *
       * Max: 1 field
       * Default: No personal data is returned.
       */
      fields?: RequestedFields[];
  }
  /**
   * Creates a query to retrieve a list of schedules.
   *
   * The `querySchedules()` function builds a query to retrieve a list of tip settings and returns a `SchedulesQueryBuilder` object.
   *
   * The returned object contains the query definition, which is typically used to run the query using the [find()](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/schedules-query-builder/find) function.
   *
   * You can refine the query by chaining `SchedulesQueryBuilder` functions onto the query. `SchedulesQueryBuilder` functions enable you to sort, filter, and control the results that `querySchedules()` returns.
   *
   * `querySchedules()` runs with the following `SchedulesQueryBuilder` default that you can override:
   *
   * + `limit` is `50`.
   * + Sorted by `id` in ascending order.
   *
   * The functions that are chained to `querySchedules()` are applied in the order they are called. For example, if you apply `ascending("status")` and then `ascending("externalId")`, the results are sorted first by the `"status"`, and then, if there are multiple results with the same `"status"`, the items are sorted by `"externalId"`.
   *
   * The following `SchedulesQueryBuilder` functions are supported for the `querySchedules()` function. For a full description of the tip settings object, see the object returned for the [items](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/schedules-query-result/items) property in `SchedulesQueryResult`.
   * @public
   * @documentationMaturity preview
   * @permissionId CALENDAR.SCHEDULE_READ
   * @permissionId CALENDAR.SCHEDULE_READ_PI
   */
  function querySchedules(options?: QuerySchedulesOptions): SchedulesQueryBuilder;
  interface QuerySchedulesOptions {
      /**
       * Information about which fields containing personal data to return. Refer to the
       * [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions)
       * for more information.
       *
       * Supported values:
       * + `PI_FIELDS`: Returns all fields with personal data. Your app must have `Read Calendars - Including PI` or `Manage Calendars` permission scope.
       * + `OWN_PI_FIELDS`: Returns only fields containing your own personal data.
       *
       * Max: 1 field
       * Default: No personal data is returned.
       */
      fields?: RequestedFields[] | undefined;
      /**
       * Whether to return consistent response.
       * Please consult with us at #bookings-calendar-platform if you think your case requires consistent reads.
       * @internal
       */
      consistent?: boolean | null | undefined;
  }
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface SchedulesQueryResult extends QueryCursorResult {
      items: Schedule[];
      query: SchedulesQueryBuilder;
      next: () => Promise<SchedulesQueryResult>;
      prev: () => Promise<SchedulesQueryResult>;
  }
  interface SchedulesQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | 'externalId' | 'status' | 'appId', value: any) => SchedulesQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'externalId' | 'status' | 'appId', value: any) => SchedulesQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => SchedulesQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => SchedulesQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<SchedulesQueryResult>;
  }
  /**
   * Creates a schedule.
   *
   *
   * If you want the schedule's events to appear in the
   * [Bookings calendar](https://support.wix.com/en/article/wix-bookings-about-the-wix-booking-calendar),
   * you must set `appId` to the ID of the Wix Bookings app by providing
   * `{"appId": "13d21c63-b5ec-5912-8397-c3a5ddb27a97"}`.
   * @param schedule - Schedule to create.
   * @public
   * @documentationMaturity preview
   * @requiredField schedule
   * @requiredField schedule.defaultConferencingDetails.guestUrl
   * @requiredField schedule.defaultConferencingDetails.hostUrl
   * @requiredField schedule.defaultConferencingDetails.type
   * @requiredField schedule.defaultLocation.type
   * @permissionId CALENDAR.SCHEDULE_CREATE
   * @adminMethod
   * @returns Created schedule.
   */
  function createSchedule(schedule: Schedule, options?: CreateScheduleOptions): Promise<Schedule>;
  interface CreateScheduleOptions {
      /**
       * Idempotency key guaranteeing that you don't create the same schedule more
       * than once.
       */
      idempotencyKey?: string | null;
  }
  /**
   * Updates a schedule.
   *
   *
   * Each time the schedule is updated,
   * `revision` increments by 1.
   * The current `revision` must be passed when updating the schedule.
   * This ensures you're working with the latest schedule
   * and prevents unintended overwrites.
   * @param _id - Schedule ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField schedule
   * @requiredField schedule.revision
   * @permissionId CALENDAR.SCHEDULE_UPDATE
   * @adminMethod
   * @returns Updated schedule.
   */
  function updateSchedule(_id: string | null, schedule: UpdateSchedule, options?: UpdateScheduleOptions): Promise<Schedule>;
  interface UpdateSchedule {
      /**
       * Schedule ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * External ID. You can't update the external ID.
       *
       * If the schedule belongs to a Bookings staff member, identical to the ID of
       * the [resource](https://dev.wix.com/docs/sdk/backend-modules/bookings/resources/introduction).
       * If the schedule belongs to a Bookings service, identical to the ID of
       * the [service](https://dev.wix.com/docs/sdk/backend-modules/bookings/services/setup).
       */
      externalId?: string | null;
      /**
       * Schedule name.
       *
       * Min: 1 character
       * Max: 200 characters
       */
      name?: string | null;
      /**
       * Schedule status.
       *
       * Supported values:
       * - `ACTIVE`: You can add events to the schedule or update its fields.
       * - `CANCELLED`: You can't add events to the schedule or update its fields.
       *
       * Default: `ACTIVE`
       * @readonly
       */
      status?: Status$1;
      /**
       * Time zone the schedule is associated with in
       * [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database).
       * For example, `America/New_York`.
       *
       * Default: `timeZone` specified in the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       *
       * Min: 1 character
       * Max: 150 characters
       */
      timeZone?: string | null;
      /**
       * Whether the schedule's `timeZone` is automatically synced from
       * `timeZone` of the business [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties).
       *
       * Default: `true`
       */
      businessTimeZoneEnabled?: boolean | null;
      /**
       * Default `title` for [events](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/introduction)
       * that are added to the schedule.
       *
       * Min: 1 character
       * Max: 200 characters
       */
      defaultTitle?: string | null;
      /**
       * Default `location` for [events](https://dev.wix.com/docs/rest/business-management/calendar/events-v3/event-object)
       * that are added to the schedule.
       */
      defaultLocation?: Location;
      /**
       * Default `totalCapacity` for [events](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/introduction)
       * that are added to the schedule.
       *
       * Min: `0`
       */
      defaultCapacity?: number | null;
      /**
       * Default `conferencingDetails` for [events](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/introduction)
       * that are added to the schedule.
       * Returned only if explicitly requested. For more details, see the [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions#retrieve-personal-information).
       */
      defaultConferencingDetails?: ConferencingDetails;
      /**
       * ID of the app that's associated with the schedule. You can't update `appId`.
       * If you want to create a schedule and ensure its associated events appear
       * in the [Bookings calendar](https://support.wix.com/en/article/wix-bookings-about-the-wix-booking-calendar),
       * you must provide the Wix Bookings app ID
       * `13d21c63-b5ec-5912-8397-c3a5ddb27a97`.
       */
      appId?: string | null;
      /**
       * List of permissions associated with the schedule. Refer to the
       * [permissions article](https://dev.wix.com/docs/sdk/backend-modules/calendar/permissions#roles)
       * for more information.
       *
       * Max: 1 permission
       */
      permissions?: Permission[];
      /** Extensions enabling applications or users to save custom data related to the schedule. */
      extendedFields?: ExtendedFields;
      /**
       * Revision number, which increments by 1 each time the schedule is updated.
       * To prevent conflicting changes, the current revision must be passed when updating the schedule.
       * Ignored when creating a schedule.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date the schedule was created in `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date the schedule was last updated in `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * @readonly
       */
      _updatedDate?: Date | null;
  }
  interface UpdateScheduleOptions {
      /**
       * Optional list of fields to update.
       * @internal
       */
      fieldmask?: string[];
      /**
       * Information about whether participants of the schedule's updated events are
       * notified and the message they receive.
       */
      participantNotification?: ParticipantNotification;
  }
  /**
   * Sets a schedule's `status` to `CANCELLED`.
   *
   *
   * Also cancels future events belonging to the schedule.
   *
   * Once a schedule is marked as `CANCELLED`, you can't reactivate it, update it,
   * or assign new events.
   * @param scheduleId - ID of the schedule to cancel.
   * @public
   * @documentationMaturity preview
   * @requiredField scheduleId
   * @permissionId CALENDAR.SCHEDULE_CANCEL
   * @adminMethod
   */
  function cancelSchedule(scheduleId: string | null, options?: CancelScheduleOptions): Promise<CancelScheduleResponse>;
  interface CancelScheduleOptions {
      /**
       * Whether to preserve future events with participants.
       * Default: `false`.
       */
      preserveFutureEventsWithParticipants?: boolean | null;
      /**
       * Information about whether participants of the schedule's updated events are
       * notified and the message they receive.
       */
      participantNotification?: ParticipantNotification;
  }
  
  type calendarV3Schedule_universal_d_Schedule = Schedule;
  type calendarV3Schedule_universal_d_Location = Location;
  type calendarV3Schedule_universal_d_LocationType = LocationType;
  const calendarV3Schedule_universal_d_LocationType: typeof LocationType;
  type calendarV3Schedule_universal_d_ConferencingDetails = ConferencingDetails;
  type calendarV3Schedule_universal_d_Type = Type;
  const calendarV3Schedule_universal_d_Type: typeof Type;
  type calendarV3Schedule_universal_d_Permission = Permission;
  type calendarV3Schedule_universal_d_IdentityType = IdentityType;
  const calendarV3Schedule_universal_d_IdentityType: typeof IdentityType;
  type calendarV3Schedule_universal_d_Role = Role;
  const calendarV3Schedule_universal_d_Role: typeof Role;
  type calendarV3Schedule_universal_d_ExtendedFields = ExtendedFields;
  type calendarV3Schedule_universal_d_GetScheduleRequest = GetScheduleRequest;
  type calendarV3Schedule_universal_d_RequestedFields = RequestedFields;
  const calendarV3Schedule_universal_d_RequestedFields: typeof RequestedFields;
  type calendarV3Schedule_universal_d_GetScheduleResponse = GetScheduleResponse;
  type calendarV3Schedule_universal_d_QuerySchedulesRequest = QuerySchedulesRequest;
  type calendarV3Schedule_universal_d_CursorQuery = CursorQuery;
  type calendarV3Schedule_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type calendarV3Schedule_universal_d_CursorPaging = CursorPaging;
  type calendarV3Schedule_universal_d_QuerySchedulesResponse = QuerySchedulesResponse;
  type calendarV3Schedule_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type calendarV3Schedule_universal_d_Cursors = Cursors;
  type calendarV3Schedule_universal_d_CreateScheduleRequest = CreateScheduleRequest;
  type calendarV3Schedule_universal_d_CreateScheduleResponse = CreateScheduleResponse;
  type calendarV3Schedule_universal_d_UpdateScheduleRequest = UpdateScheduleRequest;
  type calendarV3Schedule_universal_d_ParticipantNotification = ParticipantNotification;
  type calendarV3Schedule_universal_d_UpdateScheduleResponse = UpdateScheduleResponse;
  type calendarV3Schedule_universal_d_ScheduleUpdatedWithMetadata = ScheduleUpdatedWithMetadata;
  type calendarV3Schedule_universal_d_CloneScheduleRequest = CloneScheduleRequest;
  type calendarV3Schedule_universal_d_CloneScheduleResponse = CloneScheduleResponse;
  type calendarV3Schedule_universal_d_ScheduleCloned = ScheduleCloned;
  type calendarV3Schedule_universal_d_Trigger = Trigger;
  const calendarV3Schedule_universal_d_Trigger: typeof Trigger;
  type calendarV3Schedule_universal_d_CancelScheduleRequest = CancelScheduleRequest;
  type calendarV3Schedule_universal_d_CancelScheduleResponse = CancelScheduleResponse;
  type calendarV3Schedule_universal_d_ScheduleCancelled = ScheduleCancelled;
  type calendarV3Schedule_universal_d_MetaSiteSpecialEvent = MetaSiteSpecialEvent;
  type calendarV3Schedule_universal_d_MetaSiteSpecialEventPayloadOneOf = MetaSiteSpecialEventPayloadOneOf;
  type calendarV3Schedule_universal_d_Asset = Asset;
  type calendarV3Schedule_universal_d_State = State;
  const calendarV3Schedule_universal_d_State: typeof State;
  type calendarV3Schedule_universal_d_SiteCreated = SiteCreated;
  type calendarV3Schedule_universal_d_SiteCreatedContext = SiteCreatedContext;
  const calendarV3Schedule_universal_d_SiteCreatedContext: typeof SiteCreatedContext;
  type calendarV3Schedule_universal_d_Namespace = Namespace;
  const calendarV3Schedule_universal_d_Namespace: typeof Namespace;
  type calendarV3Schedule_universal_d_SiteTransferred = SiteTransferred;
  type calendarV3Schedule_universal_d_SiteDeleted = SiteDeleted;
  type calendarV3Schedule_universal_d_DeleteContext = DeleteContext;
  type calendarV3Schedule_universal_d_DeleteStatus = DeleteStatus;
  const calendarV3Schedule_universal_d_DeleteStatus: typeof DeleteStatus;
  type calendarV3Schedule_universal_d_SiteUndeleted = SiteUndeleted;
  type calendarV3Schedule_universal_d_SitePublished = SitePublished;
  type calendarV3Schedule_universal_d_SiteUnpublished = SiteUnpublished;
  type calendarV3Schedule_universal_d_SiteMarkedAsTemplate = SiteMarkedAsTemplate;
  type calendarV3Schedule_universal_d_SiteMarkedAsWixSite = SiteMarkedAsWixSite;
  type calendarV3Schedule_universal_d_ServiceProvisioned = ServiceProvisioned;
  type calendarV3Schedule_universal_d_ServiceRemoved = ServiceRemoved;
  type calendarV3Schedule_universal_d_SiteRenamed = SiteRenamed;
  type calendarV3Schedule_universal_d_SiteHardDeleted = SiteHardDeleted;
  type calendarV3Schedule_universal_d_NamespaceChanged = NamespaceChanged;
  type calendarV3Schedule_universal_d_StudioAssigned = StudioAssigned;
  type calendarV3Schedule_universal_d_StudioUnassigned = StudioUnassigned;
  type calendarV3Schedule_universal_d_WebhooksIdentificationData = WebhooksIdentificationData;
  type calendarV3Schedule_universal_d_WebhooksIdentificationDataIdOneOf = WebhooksIdentificationDataIdOneOf;
  const calendarV3Schedule_universal_d_getSchedule: typeof getSchedule;
  type calendarV3Schedule_universal_d_GetScheduleOptions = GetScheduleOptions;
  const calendarV3Schedule_universal_d_querySchedules: typeof querySchedules;
  type calendarV3Schedule_universal_d_QuerySchedulesOptions = QuerySchedulesOptions;
  type calendarV3Schedule_universal_d_SchedulesQueryResult = SchedulesQueryResult;
  type calendarV3Schedule_universal_d_SchedulesQueryBuilder = SchedulesQueryBuilder;
  const calendarV3Schedule_universal_d_createSchedule: typeof createSchedule;
  type calendarV3Schedule_universal_d_CreateScheduleOptions = CreateScheduleOptions;
  const calendarV3Schedule_universal_d_updateSchedule: typeof updateSchedule;
  type calendarV3Schedule_universal_d_UpdateSchedule = UpdateSchedule;
  type calendarV3Schedule_universal_d_UpdateScheduleOptions = UpdateScheduleOptions;
  const calendarV3Schedule_universal_d_cancelSchedule: typeof cancelSchedule;
  type calendarV3Schedule_universal_d_CancelScheduleOptions = CancelScheduleOptions;
  namespace calendarV3Schedule_universal_d {
    export {
      calendarV3Schedule_universal_d_Schedule as Schedule,
      Status$1 as Status,
      calendarV3Schedule_universal_d_Location as Location,
      calendarV3Schedule_universal_d_LocationType as LocationType,
      calendarV3Schedule_universal_d_ConferencingDetails as ConferencingDetails,
      calendarV3Schedule_universal_d_Type as Type,
      calendarV3Schedule_universal_d_Permission as Permission,
      IdentificationData$1 as IdentificationData,
      IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf,
      calendarV3Schedule_universal_d_IdentityType as IdentityType,
      calendarV3Schedule_universal_d_Role as Role,
      calendarV3Schedule_universal_d_ExtendedFields as ExtendedFields,
      calendarV3Schedule_universal_d_GetScheduleRequest as GetScheduleRequest,
      calendarV3Schedule_universal_d_RequestedFields as RequestedFields,
      calendarV3Schedule_universal_d_GetScheduleResponse as GetScheduleResponse,
      calendarV3Schedule_universal_d_QuerySchedulesRequest as QuerySchedulesRequest,
      calendarV3Schedule_universal_d_CursorQuery as CursorQuery,
      calendarV3Schedule_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      calendarV3Schedule_universal_d_CursorPaging as CursorPaging,
      calendarV3Schedule_universal_d_QuerySchedulesResponse as QuerySchedulesResponse,
      calendarV3Schedule_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      calendarV3Schedule_universal_d_Cursors as Cursors,
      calendarV3Schedule_universal_d_CreateScheduleRequest as CreateScheduleRequest,
      calendarV3Schedule_universal_d_CreateScheduleResponse as CreateScheduleResponse,
      calendarV3Schedule_universal_d_UpdateScheduleRequest as UpdateScheduleRequest,
      calendarV3Schedule_universal_d_ParticipantNotification as ParticipantNotification,
      calendarV3Schedule_universal_d_UpdateScheduleResponse as UpdateScheduleResponse,
      calendarV3Schedule_universal_d_ScheduleUpdatedWithMetadata as ScheduleUpdatedWithMetadata,
      calendarV3Schedule_universal_d_CloneScheduleRequest as CloneScheduleRequest,
      calendarV3Schedule_universal_d_CloneScheduleResponse as CloneScheduleResponse,
      calendarV3Schedule_universal_d_ScheduleCloned as ScheduleCloned,
      calendarV3Schedule_universal_d_Trigger as Trigger,
      calendarV3Schedule_universal_d_CancelScheduleRequest as CancelScheduleRequest,
      calendarV3Schedule_universal_d_CancelScheduleResponse as CancelScheduleResponse,
      calendarV3Schedule_universal_d_ScheduleCancelled as ScheduleCancelled,
      calendarV3Schedule_universal_d_MetaSiteSpecialEvent as MetaSiteSpecialEvent,
      calendarV3Schedule_universal_d_MetaSiteSpecialEventPayloadOneOf as MetaSiteSpecialEventPayloadOneOf,
      calendarV3Schedule_universal_d_Asset as Asset,
      calendarV3Schedule_universal_d_State as State,
      calendarV3Schedule_universal_d_SiteCreated as SiteCreated,
      calendarV3Schedule_universal_d_SiteCreatedContext as SiteCreatedContext,
      calendarV3Schedule_universal_d_Namespace as Namespace,
      calendarV3Schedule_universal_d_SiteTransferred as SiteTransferred,
      calendarV3Schedule_universal_d_SiteDeleted as SiteDeleted,
      calendarV3Schedule_universal_d_DeleteContext as DeleteContext,
      calendarV3Schedule_universal_d_DeleteStatus as DeleteStatus,
      calendarV3Schedule_universal_d_SiteUndeleted as SiteUndeleted,
      calendarV3Schedule_universal_d_SitePublished as SitePublished,
      calendarV3Schedule_universal_d_SiteUnpublished as SiteUnpublished,
      calendarV3Schedule_universal_d_SiteMarkedAsTemplate as SiteMarkedAsTemplate,
      calendarV3Schedule_universal_d_SiteMarkedAsWixSite as SiteMarkedAsWixSite,
      calendarV3Schedule_universal_d_ServiceProvisioned as ServiceProvisioned,
      calendarV3Schedule_universal_d_ServiceRemoved as ServiceRemoved,
      calendarV3Schedule_universal_d_SiteRenamed as SiteRenamed,
      calendarV3Schedule_universal_d_SiteHardDeleted as SiteHardDeleted,
      calendarV3Schedule_universal_d_NamespaceChanged as NamespaceChanged,
      calendarV3Schedule_universal_d_StudioAssigned as StudioAssigned,
      calendarV3Schedule_universal_d_StudioUnassigned as StudioUnassigned,
      Empty$1 as Empty,
      SitePropertiesNotification$1 as SitePropertiesNotification,
      SitePropertiesEvent$1 as SitePropertiesEvent,
      Properties$1 as Properties,
      Categories$1 as Categories,
      Locale$1 as Locale,
      Address$1 as Address,
      AddressHint$1 as AddressHint,
      PlacementType$1 as PlacementType,
      GeoCoordinates$1 as GeoCoordinates,
      BusinessSchedule$1 as BusinessSchedule,
      TimePeriod$1 as TimePeriod,
      DayOfWeek$1 as DayOfWeek,
      SpecialHourPeriod$1 as SpecialHourPeriod,
      Multilingual$1 as Multilingual,
      SupportedLanguage$1 as SupportedLanguage,
      ResolutionMethod$1 as ResolutionMethod,
      ConsentPolicy$1 as ConsentPolicy,
      Translation$1 as Translation,
      ChangeContext$1 as ChangeContext,
      ChangeContextPayloadOneOf$1 as ChangeContextPayloadOneOf,
      PropertiesChange$1 as PropertiesChange,
      V4SiteCreated$1 as V4SiteCreated,
      SiteCloned$1 as SiteCloned,
      DomainEvent$1 as DomainEvent,
      DomainEventBodyOneOf$1 as DomainEventBodyOneOf,
      EntityCreatedEvent$1 as EntityCreatedEvent,
      RestoreInfo$1 as RestoreInfo,
      EntityUpdatedEvent$1 as EntityUpdatedEvent,
      EntityDeletedEvent$1 as EntityDeletedEvent,
      ActionEvent$1 as ActionEvent,
      MessageEnvelope$1 as MessageEnvelope,
      calendarV3Schedule_universal_d_WebhooksIdentificationData as WebhooksIdentificationData,
      calendarV3Schedule_universal_d_WebhooksIdentificationDataIdOneOf as WebhooksIdentificationDataIdOneOf,
      WebhookIdentityType$1 as WebhookIdentityType,
      calendarV3Schedule_universal_d_getSchedule as getSchedule,
      calendarV3Schedule_universal_d_GetScheduleOptions as GetScheduleOptions,
      calendarV3Schedule_universal_d_querySchedules as querySchedules,
      calendarV3Schedule_universal_d_QuerySchedulesOptions as QuerySchedulesOptions,
      calendarV3Schedule_universal_d_SchedulesQueryResult as SchedulesQueryResult,
      calendarV3Schedule_universal_d_SchedulesQueryBuilder as SchedulesQueryBuilder,
      calendarV3Schedule_universal_d_createSchedule as createSchedule,
      calendarV3Schedule_universal_d_CreateScheduleOptions as CreateScheduleOptions,
      calendarV3Schedule_universal_d_updateSchedule as updateSchedule,
      calendarV3Schedule_universal_d_UpdateSchedule as UpdateSchedule,
      calendarV3Schedule_universal_d_UpdateScheduleOptions as UpdateScheduleOptions,
      calendarV3Schedule_universal_d_cancelSchedule as cancelSchedule,
      calendarV3Schedule_universal_d_CancelScheduleOptions as CancelScheduleOptions,
    };
  }
  
  /**
   * Information about the start and end dates of the first and last
   * [events](https://dev.wix.com/docs/rest/business-management/calendar/events-v3/introduction)
   * that belong to a [schedule](https://dev.wix.com/docs/rest/business-management/calendar/schedules-v3/introduction)
   * and whether any events follow an unlimited repetition pattern.
   */
  interface ScheduleTimeFrame {
      /**
       * ID of the [schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction)
       * to which the time frame belongs.
       * @readonly
       */
      _id?: string | null;
      /**
       * Information about the presence of recurring events within the schedule.
       *
       * Supported values:
       * + `NONE`: No [events](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/introduction) are scheduled within the schedule.
       * + `FINITE`: All recurring events within the schedule have a defined end date, or there are no recurring events.
       * + `INFINITE`: At least one recurring event within the schedule has no end date, meaning it follows an unlimited repetition pattern.
       * @readonly
       */
      status?: Status;
      /**
       * Start date of the first [event](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/introduction)
       * within the schedule. Identical to `event.start.localDate`. Available only if
       * `status` is set to `FINITE` or `INFINITE`.
       * @readonly
       */
      firstEventStartDate?: ZonedDate;
      /**
       * End date of the last [event](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/introduction)
       * belonging to the schedule. Identical to `event.end.localDate`. Available only if
       * `status` is set to `FINITE`.
       * @readonly
       */
      lastEventEndDate?: ZonedDate;
      /**
       * Start date of the first [event](https://dev.wix.com/docs/rest/business-management/calendar/events-v3/event-object)
       * belonging to the schedule, adjusted to `timeZone` of the
       * [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties)
       * or the `timeZone` specified in the request.
       * Identical to `event.adjustedStart.localDate`.
       * @readonly
       */
      adjustedFirstEventStartDate?: ZonedDate;
      /**
       * End date of the last [event](https://dev.wix.com/docs/sdk/backend-modules/calendar/events/introduction)
       * belonging to the schedule, adjusted to `timeZone` of the
       * [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties)
       * or the `timeZone` specified in the request.
       * Identical to `event.adjustedEnd.localDate`.
       * @readonly
       */
      adjustedLastEventEndDate?: ZonedDate;
      /**
       * Revision number, which increments by 1 each time the schedule time frame is updated.
       * @readonly
       */
      revision?: string | null;
  }
  enum Status {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      /** No [events](https://dev.wix.com/docs/rest/business-management/calendar/events-v3/event-object) that belong to the schedule. */
      NONE = "NONE",
      /** There are no recurring events or all recurring events belonging to the schedule have a defined end date. */
      FINITE = "FINITE",
      /** At least one recurring event belonging to the schedule has an unlimited repetition pattern (no end date). */
      INFINITE = "INFINITE"
  }
  /** A date time with a time zone, having the UTC offset and date determined by the server. */
  interface ZonedDate {
      /**
       * Local date time in [ISO-8601 format](https://en.wikipedia.org/wiki/ISO_8601).
       * For example, `2024-01-30T13:30:00`.
       * Wix Calendar APIs ignore seconds.
       */
      localDate?: string | null;
      /**
       * Time zone in
       * [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database).
       * For example, `America/New_York`.
       * @readonly
       */
      timeZone?: string | null;
      /**
       * UTC date time in [ISO-8601 format](https://en.wikipedia.org/wiki/ISO_8601).
       * For example, `2024-01-30T13:30:00`.
       * Not available for adjusted date fields.
       * @readonly
       */
      utcDate?: Date | null;
  }
  interface ScheduleTimeFrameUpdatedWithMetadata {
      /** Updated schedule time frame. */
      scheduleTimeFrame?: ScheduleTimeFrame;
      /**
       * Temporary! will be replaced by diff very soon.
       * @internal
       * @deprecated
       */
      previousScheduleTimeFrame?: ScheduleTimeFrame;
  }
  interface GetScheduleTimeFrameRequest {
      /**
       * [Schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction)
       * ID for which to retrieve the schedule time frame.
       */
      _id: string | null;
      /**
       * Time zone for adjusting the times of the returned schedule time frame.
       *
       * Default: `timeZone` of the [site properties](https://dev.wix.com/docs/rest/business-management/site-properties/properties/properties-object)
       */
      timeZone?: string | null;
      /**
       * Whether to return consistent response.
       * Please consult with us at #bookings-calendar-platform if you think your case requires consistent reads.
       * @internal
       */
      consistent?: boolean | null;
  }
  interface GetScheduleTimeFrameResponse {
      /** Retrieved schedule time frame. */
      scheduleTimeFrame?: ScheduleTimeFrame;
  }
  interface ListScheduleTimeFramesRequest {
      /**
       * IDs of the schedules for which to retrieve schedule time frames.
       *
       * Min: 1 schedule ID
       * Max: 100 schedule IDs
       */
      ids: string[];
      /**
       * Time zone for adjusting the times of the returned schedule time frames.
       *
       * Default: `timeZone` of the [site properties](https://dev.wix.com/docs/rest/business-management/site-properties/properties/properties-object)
       */
      timeZone?: string | null;
  }
  interface ListScheduleTimeFramesResponse {
      /** Retrieved schedule time frames. */
      scheduleTimeFrames?: ScheduleTimeFrame[];
  }
  /** Encapsulates all details written to the Greyhound topic when a site's properties are updated. */
  interface SitePropertiesNotification {
      /** The site ID for which this update notification applies. */
      metasiteId?: string;
      /** The actual update event. */
      event?: SitePropertiesEvent;
      /** A convenience set of mappings from the MetaSite ID to its constituent services. */
      translations?: Translation[];
      /** Context of the notification */
      changeContext?: ChangeContext;
  }
  /** The actual update event for a particular notification. */
  interface SitePropertiesEvent {
      /** Version of the site's properties represented by this update. */
      version?: number;
      /**
       * Set of properties that were updated - corresponds to the fields in "properties".
       * @internal
       */
      fields?: string[];
      /** Updated properties. */
      properties?: Properties;
  }
  interface Properties {
      /** Site categories. */
      categories?: Categories;
      /** Site locale. */
      locale?: Locale;
      /**
       * Site language.
       *
       * Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format.
       */
      language?: string | null;
      /**
       * Site currency format used to bill customers.
       *
       * Three-letter currency code in [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
       */
      paymentCurrency?: string | null;
      /** Timezone in `America/New_York` format. */
      timeZone?: string | null;
      /** Email address. */
      email?: string | null;
      /** Phone number. */
      phone?: string | null;
      /** Fax number. */
      fax?: string | null;
      /** Address. */
      address?: Address;
      /** Site display name. */
      siteDisplayName?: string | null;
      /** Business name. */
      businessName?: string | null;
      /** Path to the site's logo in Wix Media (without Wix Media base URL). */
      logo?: string | null;
      /** Site description. */
      description?: string | null;
      /**
       * Business schedule. Regular and exceptional time periods when the business is open or the service is available.
       *
       * __Note:__ Not supported by Wix Bookings.
       */
      businessSchedule?: BusinessSchedule;
      /** Supported languages of a site and the primary language. */
      multilingual?: Multilingual;
      /** Cookie policy the Wix user defined for their site (before the site visitor interacts with/limits it). */
      consentPolicy?: ConsentPolicy;
      /**
       * Supported values: `FITNESS SERVICE`, `RESTAURANT`, `BLOG`, `STORE`, `EVENT`, `UNKNOWN`.
       *
       * Site business type.
       */
      businessConfig?: string | null;
      /** External site URL that uses Wix as its headless business solution. */
      externalSiteUrl?: string | null;
      /** Track clicks analytics. */
      trackClicksAnalytics?: boolean;
  }
  interface Categories {
      /** Primary site category. */
      primary?: string;
      /** Secondary site category. */
      secondary?: string[];
      /** Business Term Id */
      businessTermId?: string | null;
  }
  interface Locale {
      /** Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. */
      languageCode?: string;
      /** Two-letter country code in [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) format. */
      country?: string;
  }
  interface Address {
      /** Street name. */
      street?: string;
      /** City name. */
      city?: string;
      /** Two-letter country code in an [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. */
      country?: string;
      /** State. */
      state?: string;
      /** Zip or postal code. */
      zip?: string;
      /** Extra information to be displayed in the address. */
      hint?: AddressHint;
      /** Whether this address represents a physical location. */
      isPhysical?: boolean;
      /** Google-formatted version of this address. */
      googleFormattedAddress?: string;
      /** Street number. */
      streetNumber?: string;
      /** Apartment number. */
      apartmentNumber?: string;
      /** Geographic coordinates of location. */
      coordinates?: GeoCoordinates;
  }
  /**
   * Extra information on displayed addresses.
   * This is used for display purposes. Used to add additional data about the address, such as "In the passage".
   * Free text. In addition, the user can state where to display the additional description - before, after, or instead of the address string.
   */
  interface AddressHint {
      /** Extra text displayed next to, or instead of, the actual address. */
      text?: string;
      /** Where the extra text should be displayed. */
      placement?: PlacementType;
  }
  /** Where the extra text should be displayed: before, after or instead of the actual address. */
  enum PlacementType {
      BEFORE = "BEFORE",
      AFTER = "AFTER",
      REPLACE = "REPLACE"
  }
  /** Geocoordinates for a particular address. */
  interface GeoCoordinates {
      /** Latitude of the location. Must be between -90 and 90. */
      latitude?: number;
      /** Longitude of the location. Must be between -180 and 180. */
      longitude?: number;
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
  interface Multilingual {
      /** Supported languages list. */
      supportedLanguages?: SupportedLanguage[];
      /** Whether to redirect to user language. */
      autoRedirect?: boolean;
  }
  interface SupportedLanguage {
      /** Two-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. */
      languageCode?: string;
      /** Locale. */
      locale?: Locale;
      /** Whether the supported language is the primary language for the site. */
      isPrimary?: boolean;
      /** Language icon. */
      countryCode?: string;
      /** How the language will be resolved. For internal use. */
      resolutionMethod?: ResolutionMethod;
  }
  enum ResolutionMethod {
      QUERY_PARAM = "QUERY_PARAM",
      SUBDOMAIN = "SUBDOMAIN",
      SUBDIRECTORY = "SUBDIRECTORY"
  }
  interface ConsentPolicy {
      /** Whether the site uses cookies that are essential to site operation. */
      essential?: boolean | null;
      /** Whether the site uses cookies that affect site performance and other functional measurements. */
      functional?: boolean | null;
      /** Whether the site uses cookies that collect analytics about how the site is used (in order to improve it). */
      analytics?: boolean | null;
      /** Whether the site uses cookies that collect information allowing better customization of the experience for a current visitor. */
      advertising?: boolean | null;
      /** CCPA compliance flag. */
      dataToThirdParty?: boolean | null;
  }
  /** A single mapping from the MetaSite ID to a particular service. */
  interface Translation {
      /** The service type. */
      serviceType?: string;
      /** The application definition ID; this only applies to services of type ThirdPartyApps. */
      appDefId?: string;
      /** The instance ID of the service. */
      instanceId?: string;
  }
  interface ChangeContext extends ChangeContextPayloadOneOf {
      /** Properties were updated. */
      propertiesChange?: PropertiesChange;
      /** Default properties were created on site creation. */
      siteCreated?: V4SiteCreated;
      /** Properties were cloned on site cloning. */
      siteCloned?: SiteCloned;
  }
  /** @oneof */
  interface ChangeContextPayloadOneOf {
      /** Properties were updated. */
      propertiesChange?: PropertiesChange;
      /** Default properties were created on site creation. */
      siteCreated?: V4SiteCreated;
      /** Properties were cloned on site cloning. */
      siteCloned?: SiteCloned;
  }
  interface PropertiesChange {
  }
  interface V4SiteCreated {
      /** Origin template site id. */
      originTemplateId?: string | null;
  }
  interface SiteCloned {
      /** Origin site id. */
      originMetaSiteId?: string;
  }
  interface Empty {
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
   * Retrieves a schedule time frame by schedule ID.
   * @param _id - [Schedule](https://dev.wix.com/docs/sdk/backend-modules/calendar/schedules/introduction)
   * ID for which to retrieve the schedule time frame.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @permissionId CALENDAR.SCHEDULE_READ
   * @returns Retrieved schedule time frame.
   */
  function getScheduleTimeFrame(_id: string | null, options?: GetScheduleTimeFrameOptions): Promise<ScheduleTimeFrame>;
  interface GetScheduleTimeFrameOptions {
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database) for adjusting the times of the returned schedule time frame. For example, `America/New_York` or `UTC`.
       *
       * Default: `timeZone` of the [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties)
       */
      timeZone?: string | null;
      /**
       * Whether to return consistent response.
       * Please consult with us at #bookings-calendar-platform if you think your case requires consistent reads.
       * @internal
       */
      consistent?: boolean | null;
  }
  /**
   * Retrieves a list of schedule time frames by schedule IDs.
   *
   *
   * Sorted by schedule ID in ascending order.
   * @param ids - IDs of the schedules for which to retrieve schedule time frames.
   *
   * Min: 1 schedule ID
   * Max: 100 schedule IDs
   * @public
   * @documentationMaturity preview
   * @requiredField ids
   * @permissionId CALENDAR.SCHEDULE_READ
   */
  function listScheduleTimeFrames(ids: string[], options?: ListScheduleTimeFramesOptions): Promise<ListScheduleTimeFramesResponse>;
  interface ListScheduleTimeFramesOptions {
      /**
       * Time zone in [IANA tz database format](https://en.wikipedia.org/wiki/Tz_database) for adjusting the times of the returned schedule time frame. For example, `America/New_York` or `UTC`.
       *
       * Default: `timeZone` of the [site properties](https://dev.wix.com/docs/sdk/backend-modules/business-tools/site-properties/get-site-properties)
       */
      timeZone?: string | null;
  }
  
  type calendarV3ScheduleTimeFrame_universal_d_ScheduleTimeFrame = ScheduleTimeFrame;
  type calendarV3ScheduleTimeFrame_universal_d_Status = Status;
  const calendarV3ScheduleTimeFrame_universal_d_Status: typeof Status;
  type calendarV3ScheduleTimeFrame_universal_d_ZonedDate = ZonedDate;
  type calendarV3ScheduleTimeFrame_universal_d_ScheduleTimeFrameUpdatedWithMetadata = ScheduleTimeFrameUpdatedWithMetadata;
  type calendarV3ScheduleTimeFrame_universal_d_GetScheduleTimeFrameRequest = GetScheduleTimeFrameRequest;
  type calendarV3ScheduleTimeFrame_universal_d_GetScheduleTimeFrameResponse = GetScheduleTimeFrameResponse;
  type calendarV3ScheduleTimeFrame_universal_d_ListScheduleTimeFramesRequest = ListScheduleTimeFramesRequest;
  type calendarV3ScheduleTimeFrame_universal_d_ListScheduleTimeFramesResponse = ListScheduleTimeFramesResponse;
  type calendarV3ScheduleTimeFrame_universal_d_SitePropertiesNotification = SitePropertiesNotification;
  type calendarV3ScheduleTimeFrame_universal_d_SitePropertiesEvent = SitePropertiesEvent;
  type calendarV3ScheduleTimeFrame_universal_d_Properties = Properties;
  type calendarV3ScheduleTimeFrame_universal_d_Categories = Categories;
  type calendarV3ScheduleTimeFrame_universal_d_Locale = Locale;
  type calendarV3ScheduleTimeFrame_universal_d_Address = Address;
  type calendarV3ScheduleTimeFrame_universal_d_AddressHint = AddressHint;
  type calendarV3ScheduleTimeFrame_universal_d_PlacementType = PlacementType;
  const calendarV3ScheduleTimeFrame_universal_d_PlacementType: typeof PlacementType;
  type calendarV3ScheduleTimeFrame_universal_d_GeoCoordinates = GeoCoordinates;
  type calendarV3ScheduleTimeFrame_universal_d_BusinessSchedule = BusinessSchedule;
  type calendarV3ScheduleTimeFrame_universal_d_TimePeriod = TimePeriod;
  type calendarV3ScheduleTimeFrame_universal_d_DayOfWeek = DayOfWeek;
  const calendarV3ScheduleTimeFrame_universal_d_DayOfWeek: typeof DayOfWeek;
  type calendarV3ScheduleTimeFrame_universal_d_SpecialHourPeriod = SpecialHourPeriod;
  type calendarV3ScheduleTimeFrame_universal_d_Multilingual = Multilingual;
  type calendarV3ScheduleTimeFrame_universal_d_SupportedLanguage = SupportedLanguage;
  type calendarV3ScheduleTimeFrame_universal_d_ResolutionMethod = ResolutionMethod;
  const calendarV3ScheduleTimeFrame_universal_d_ResolutionMethod: typeof ResolutionMethod;
  type calendarV3ScheduleTimeFrame_universal_d_ConsentPolicy = ConsentPolicy;
  type calendarV3ScheduleTimeFrame_universal_d_Translation = Translation;
  type calendarV3ScheduleTimeFrame_universal_d_ChangeContext = ChangeContext;
  type calendarV3ScheduleTimeFrame_universal_d_ChangeContextPayloadOneOf = ChangeContextPayloadOneOf;
  type calendarV3ScheduleTimeFrame_universal_d_PropertiesChange = PropertiesChange;
  type calendarV3ScheduleTimeFrame_universal_d_V4SiteCreated = V4SiteCreated;
  type calendarV3ScheduleTimeFrame_universal_d_SiteCloned = SiteCloned;
  type calendarV3ScheduleTimeFrame_universal_d_Empty = Empty;
  type calendarV3ScheduleTimeFrame_universal_d_DomainEvent = DomainEvent;
  type calendarV3ScheduleTimeFrame_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type calendarV3ScheduleTimeFrame_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type calendarV3ScheduleTimeFrame_universal_d_RestoreInfo = RestoreInfo;
  type calendarV3ScheduleTimeFrame_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type calendarV3ScheduleTimeFrame_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type calendarV3ScheduleTimeFrame_universal_d_ActionEvent = ActionEvent;
  type calendarV3ScheduleTimeFrame_universal_d_MessageEnvelope = MessageEnvelope;
  type calendarV3ScheduleTimeFrame_universal_d_IdentificationData = IdentificationData;
  type calendarV3ScheduleTimeFrame_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type calendarV3ScheduleTimeFrame_universal_d_WebhookIdentityType = WebhookIdentityType;
  const calendarV3ScheduleTimeFrame_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const calendarV3ScheduleTimeFrame_universal_d_getScheduleTimeFrame: typeof getScheduleTimeFrame;
  type calendarV3ScheduleTimeFrame_universal_d_GetScheduleTimeFrameOptions = GetScheduleTimeFrameOptions;
  const calendarV3ScheduleTimeFrame_universal_d_listScheduleTimeFrames: typeof listScheduleTimeFrames;
  type calendarV3ScheduleTimeFrame_universal_d_ListScheduleTimeFramesOptions = ListScheduleTimeFramesOptions;
  namespace calendarV3ScheduleTimeFrame_universal_d {
    export {
      calendarV3ScheduleTimeFrame_universal_d_ScheduleTimeFrame as ScheduleTimeFrame,
      calendarV3ScheduleTimeFrame_universal_d_Status as Status,
      calendarV3ScheduleTimeFrame_universal_d_ZonedDate as ZonedDate,
      calendarV3ScheduleTimeFrame_universal_d_ScheduleTimeFrameUpdatedWithMetadata as ScheduleTimeFrameUpdatedWithMetadata,
      calendarV3ScheduleTimeFrame_universal_d_GetScheduleTimeFrameRequest as GetScheduleTimeFrameRequest,
      calendarV3ScheduleTimeFrame_universal_d_GetScheduleTimeFrameResponse as GetScheduleTimeFrameResponse,
      calendarV3ScheduleTimeFrame_universal_d_ListScheduleTimeFramesRequest as ListScheduleTimeFramesRequest,
      calendarV3ScheduleTimeFrame_universal_d_ListScheduleTimeFramesResponse as ListScheduleTimeFramesResponse,
      calendarV3ScheduleTimeFrame_universal_d_SitePropertiesNotification as SitePropertiesNotification,
      calendarV3ScheduleTimeFrame_universal_d_SitePropertiesEvent as SitePropertiesEvent,
      calendarV3ScheduleTimeFrame_universal_d_Properties as Properties,
      calendarV3ScheduleTimeFrame_universal_d_Categories as Categories,
      calendarV3ScheduleTimeFrame_universal_d_Locale as Locale,
      calendarV3ScheduleTimeFrame_universal_d_Address as Address,
      calendarV3ScheduleTimeFrame_universal_d_AddressHint as AddressHint,
      calendarV3ScheduleTimeFrame_universal_d_PlacementType as PlacementType,
      calendarV3ScheduleTimeFrame_universal_d_GeoCoordinates as GeoCoordinates,
      calendarV3ScheduleTimeFrame_universal_d_BusinessSchedule as BusinessSchedule,
      calendarV3ScheduleTimeFrame_universal_d_TimePeriod as TimePeriod,
      calendarV3ScheduleTimeFrame_universal_d_DayOfWeek as DayOfWeek,
      calendarV3ScheduleTimeFrame_universal_d_SpecialHourPeriod as SpecialHourPeriod,
      calendarV3ScheduleTimeFrame_universal_d_Multilingual as Multilingual,
      calendarV3ScheduleTimeFrame_universal_d_SupportedLanguage as SupportedLanguage,
      calendarV3ScheduleTimeFrame_universal_d_ResolutionMethod as ResolutionMethod,
      calendarV3ScheduleTimeFrame_universal_d_ConsentPolicy as ConsentPolicy,
      calendarV3ScheduleTimeFrame_universal_d_Translation as Translation,
      calendarV3ScheduleTimeFrame_universal_d_ChangeContext as ChangeContext,
      calendarV3ScheduleTimeFrame_universal_d_ChangeContextPayloadOneOf as ChangeContextPayloadOneOf,
      calendarV3ScheduleTimeFrame_universal_d_PropertiesChange as PropertiesChange,
      calendarV3ScheduleTimeFrame_universal_d_V4SiteCreated as V4SiteCreated,
      calendarV3ScheduleTimeFrame_universal_d_SiteCloned as SiteCloned,
      calendarV3ScheduleTimeFrame_universal_d_Empty as Empty,
      calendarV3ScheduleTimeFrame_universal_d_DomainEvent as DomainEvent,
      calendarV3ScheduleTimeFrame_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      calendarV3ScheduleTimeFrame_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      calendarV3ScheduleTimeFrame_universal_d_RestoreInfo as RestoreInfo,
      calendarV3ScheduleTimeFrame_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      calendarV3ScheduleTimeFrame_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      calendarV3ScheduleTimeFrame_universal_d_ActionEvent as ActionEvent,
      calendarV3ScheduleTimeFrame_universal_d_MessageEnvelope as MessageEnvelope,
      calendarV3ScheduleTimeFrame_universal_d_IdentificationData as IdentificationData,
      calendarV3ScheduleTimeFrame_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      calendarV3ScheduleTimeFrame_universal_d_WebhookIdentityType as WebhookIdentityType,
      calendarV3ScheduleTimeFrame_universal_d_getScheduleTimeFrame as getScheduleTimeFrame,
      calendarV3ScheduleTimeFrame_universal_d_GetScheduleTimeFrameOptions as GetScheduleTimeFrameOptions,
      calendarV3ScheduleTimeFrame_universal_d_listScheduleTimeFrames as listScheduleTimeFrames,
      calendarV3ScheduleTimeFrame_universal_d_ListScheduleTimeFramesOptions as ListScheduleTimeFramesOptions,
    };
  }
  
  export { calendarV3EventsView_universal_d as eventViews, calendarV3Event_universal_d as events, calendarV3Participation_universal_d as participations, calendarV3ScheduleTimeFrame_universal_d as scheduleTimeFrames, calendarV3Schedule_universal_d as schedules };
}
