declare module "wix-notifications.v2" {
  interface Public_notification {
      /** id */
      _id?: string | null;
  }
  interface PublicNotifyRequest extends PublicNotifyRequestRecipientsFilterOneOf, PublicNotifyRequestActionTargetOneOf {
      /** Send to site contributors */
      toSiteContributors?: ToSiteContributors;
      /** Send to contacts */
      toContacts?: ToContacts;
      /** Send to topic subscribers */
      toTopicsSubscribers?: ToTopicsSubscribers;
      /** an open url as an action target */
      targetUrl?: string | null;
      /** target_dashboard_page */
      targetDashboardPage?: DashboardPages;
      /** The title of the notification */
      title?: string | null;
      /** The body of the notification */
      body?: string | null;
      /** The Action of the notification */
      action?: string | null;
      /** The channel to which send the notification */
      channels?: Channel[];
  }
  /** @oneof */
  interface PublicNotifyRequestRecipientsFilterOneOf {
      /** Send to site contributors */
      toSiteContributors?: ToSiteContributors;
      /** Send to contacts */
      toContacts?: ToContacts;
      /** Send to topic subscribers */
      toTopicsSubscribers?: ToTopicsSubscribers;
  }
  /** @oneof */
  interface PublicNotifyRequestActionTargetOneOf {
      /** an open url as an action target */
      targetUrl?: string | null;
      /** target_dashboard_page */
      targetDashboardPage?: DashboardPages;
  }
  interface ToSiteContributors {
      /** with_role */
      withRole?: Role;
  }
  enum Role {
      /** All contributors with any role */
      All_Contributors = "All_Contributors",
      /** Only the owner */
      Owner = "Owner"
  }
  interface ToContacts {
      /** contact_ids */
      contactIds?: string[];
  }
  interface ToTopicsSubscribers {
      /** topics */
      topics?: string[];
      /** excluded_contact_ids */
      excludedContactIds?: string[];
  }
  enum Channel {
      /** No Default Channel - need to expilicitly decide on channel */
      Undefined = "Undefined",
      /** The widget inside Wix */
      Dashboard = "Dashboard",
      /** Mobile push to WixApp */
      Mobile = "Mobile",
      /** Browser push to the active browser (Chrome/Safari only) */
      Browser = "Browser"
  }
  enum DashboardPages {
      Undefined_Page = "Undefined_Page",
      /** goes to business manager home */
      Home = "Home"
  }
  interface Empty {
  }
  /**
   * This endpoint allows you to send notifications
   * @param body - The body of the notification
   * @param channels - The channel to which send the notification
   * @public
   * @documentationMaturity preview
   * @requiredField body
   * @requiredField channels
   * @adminMethod
   */
  function notify(body: string | null, channels: Channel[], options?: NotifyOptions): Promise<void>;
  interface NotifyOptions extends PublicNotifyRequestRecipientsFilterOneOf, PublicNotifyRequestActionTargetOneOf {
      /** Send to site contributors */
      toSiteContributors?: ToSiteContributors;
      /** Send to contacts */
      toContacts?: ToContacts;
      /** Send to topic subscribers */
      toTopicsSubscribers?: ToTopicsSubscribers;
      /** The title of the notification */
      title?: string | null;
      /** The Action of the notification */
      action?: string | null;
      /** an open url as an action target */
      targetUrl?: string | null;
      /** target_dashboard_page */
      targetDashboardPage?: DashboardPages;
  }
  
  type pingNotificationsV1PublicNotification_universal_d_Public_notification = Public_notification;
  type pingNotificationsV1PublicNotification_universal_d_PublicNotifyRequest = PublicNotifyRequest;
  type pingNotificationsV1PublicNotification_universal_d_PublicNotifyRequestRecipientsFilterOneOf = PublicNotifyRequestRecipientsFilterOneOf;
  type pingNotificationsV1PublicNotification_universal_d_PublicNotifyRequestActionTargetOneOf = PublicNotifyRequestActionTargetOneOf;
  type pingNotificationsV1PublicNotification_universal_d_ToSiteContributors = ToSiteContributors;
  type pingNotificationsV1PublicNotification_universal_d_Role = Role;
  const pingNotificationsV1PublicNotification_universal_d_Role: typeof Role;
  type pingNotificationsV1PublicNotification_universal_d_ToContacts = ToContacts;
  type pingNotificationsV1PublicNotification_universal_d_ToTopicsSubscribers = ToTopicsSubscribers;
  type pingNotificationsV1PublicNotification_universal_d_Channel = Channel;
  const pingNotificationsV1PublicNotification_universal_d_Channel: typeof Channel;
  type pingNotificationsV1PublicNotification_universal_d_DashboardPages = DashboardPages;
  const pingNotificationsV1PublicNotification_universal_d_DashboardPages: typeof DashboardPages;
  type pingNotificationsV1PublicNotification_universal_d_Empty = Empty;
  const pingNotificationsV1PublicNotification_universal_d_notify: typeof notify;
  type pingNotificationsV1PublicNotification_universal_d_NotifyOptions = NotifyOptions;
  namespace pingNotificationsV1PublicNotification_universal_d {
    export {
      pingNotificationsV1PublicNotification_universal_d_Public_notification as Public_notification,
      pingNotificationsV1PublicNotification_universal_d_PublicNotifyRequest as PublicNotifyRequest,
      pingNotificationsV1PublicNotification_universal_d_PublicNotifyRequestRecipientsFilterOneOf as PublicNotifyRequestRecipientsFilterOneOf,
      pingNotificationsV1PublicNotification_universal_d_PublicNotifyRequestActionTargetOneOf as PublicNotifyRequestActionTargetOneOf,
      pingNotificationsV1PublicNotification_universal_d_ToSiteContributors as ToSiteContributors,
      pingNotificationsV1PublicNotification_universal_d_Role as Role,
      pingNotificationsV1PublicNotification_universal_d_ToContacts as ToContacts,
      pingNotificationsV1PublicNotification_universal_d_ToTopicsSubscribers as ToTopicsSubscribers,
      pingNotificationsV1PublicNotification_universal_d_Channel as Channel,
      pingNotificationsV1PublicNotification_universal_d_DashboardPages as DashboardPages,
      pingNotificationsV1PublicNotification_universal_d_Empty as Empty,
      pingNotificationsV1PublicNotification_universal_d_notify as notify,
      pingNotificationsV1PublicNotification_universal_d_NotifyOptions as NotifyOptions,
    };
  }
  
  export { pingNotificationsV1PublicNotification_universal_d as notifications };
}
