/**
 * **Deprecated.**
 * 	[Read more](https://www.wix.com/corvid/reference/wix-chat-backend.html#)
 */
declare module 'wix-chat-backend' {
    /**
     * **Deprecated.**
     *  This method is deprecated and has been replaced with the equivalent [`sendMessage()`](https://dev.wix.com/docs/sdk/backend-modules/inbox/messages/send-message) method in the [Wix JavaScript SDK](https://dev.wix.com/docs/sdk/articles/get-started/about-the-wix-java-script-sdk).
     * 	[Read more](https://www.wix.com/corvid/reference/wix-chat-backend.html#sendMessage)
     */
    function sendMessage(messageInfo: MessageInfo): Promise<void>;
    /**
     * An object representing a chat message to be sent.
     */
    type MessageInfo = {
        /**
         * The content of the message.
         */
        messageText: string;
        /**
         * The ID of the channel to send the message to. Currently only IDs of business channels are supported.
         */
        channelId: string;
        /**
         * An object representing additional contextual message information included in a chat message. The site visitor does not see the metadata.
         */
        metadata?: any;
        /**
         * Indicates whether the message is sent from the visitor to the business. If `sendAsVisitor` is `true`, the message is sent from the site visitor to the business. If `sendAsVisitor` is `undefined` or `false`, the message is sent from the business to the site visitor. The default is `undefined`.
         */
        sendAsVisitor?: boolean;
    };
    /**
     * **Deprecated.**
     * 	[Read more](https://www.wix.com/corvid/reference/wix-chat-backend.Events.html#)
     */
    interface Events {
        /**
         * **Deprecated.**
         * This event is deprecated. For site development and building apps with [Blocks](https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/wix-blocks/about-wix-blocks), use the following Velo Inbox Events instead:
         * - [`onMessageSentToBusiness()`](https://dev.wix.com/docs/velo/events-service-plugins/inbox/events/on-message-sent-to-business)
         * - [`onMessageSentToParticipant()`](https://dev.wix.com/docs/velo/events-service-plugins/inbox/events/on-message-sent-to-participant)
         *
         * Learn how to [migrate your wix-chat-backend events](https://dev.wix.com/docs/velo/apis/wix-chat-backend/migration-guide).
         *
         * An event that fires when a chat message is sent to or from the business.
         * 	[Read more](https://www.wix.com/corvid/reference/wix-chat-backend.Events.html#onMessage)
         */
        onMessage(event: Events.SendMessageEvent): void;
    }
    /**
     * **Deprecated.**
     * 	[Read more](https://www.wix.com/corvid/reference/wix-chat-backend.Events.html#)
     */
    namespace Events {
        /**
         * The content of a chat message.
         */
        type MessagePayload = {
            /**
             * Text of the chat message.
             */
            text: string;
        };
        /**
         * An object representing a chat message that was sent.
         */
        type SendMessageEvent = {
            /**
             * ID of the channel on which the message was sent.
             */
            channelId: string;
            /**
             * Direction of the message.
             * One of the following:
             *
             *  + `"VisitorToBusiness"`: From a site visitor to the business.
             *  + `"BusinessToVisitor"`: From the business to a site visitor.
             */
            direction: string;
            /**
             * Type of message. Currently only `TEXT` is supported.
             */
            type: string;
            /**
             * First 250 characters of the chat message. Currently only text is included in the summary.
             */
            summary: string;
            /**
             * The sender's member ID. For a message sent from the site's business, the site owner's member ID.
             */
            participantId: string;
            /**
             * Date and time the message was sent.
             */
            createdAt: Date;
            /**
             * Content of the message.
             * Currently only content of type text is included in the `payload`.
             */
            payload: Events.MessagePayload;
            /**
             * An object representing additional contextual message information included in a chat message. The site visitor does not see the metadata.
             */
            metadata?: any;
        };
    }
}
