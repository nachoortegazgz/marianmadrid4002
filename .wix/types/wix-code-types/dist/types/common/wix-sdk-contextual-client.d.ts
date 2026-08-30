type Primitive = number | string | boolean | bigint | symbol | null | undefined;
type Tags = Record<string, Primitive>;
type Context = Record<string, unknown>;
type Contexts = Record<string, Context | undefined>;
interface SpanContextData {
    traceId: string;
    spanId: string;
}
interface Span {
    spanContext(): SpanContextData;
    end(): void;
}
interface ManualSpan {
    end(): void;
    fail(error: unknown): void;
}
interface SpanOptions {
    name: string;
    tags?: Tags;
}
interface EndSpanOptions {
    name: string;
}
interface Breadcrumb {
    type?: string;
    category?: string;
    message: string;
    level?: "info" | "warning" | "error";
    data?: Record<string, unknown>;
}
interface CaptureContext {
    level?: "info" | "warning" | "error";
    tags?: Tags;
    contexts?: Contexts;
}
interface MonitoringClient {
    /**
     * Captures an exception event and sends it to Sentry.
     * @param error The error to capture
     * @param captureContext Optional additional data to attach to the Sentry e vent.
     */
    captureException(error: unknown, captureContext?: CaptureContext): void;
    /**
     * Captures a message event and sends it to Sentry.
     * @param message The message to capture
     * @param captureContext Define the level of the message or pass in additional data to attach to the message.
     */
    captureMessage(message: string, captureContext?: CaptureContext): void;
    /**
     * Wraps a function with a span and finishes the span after the function is done. The created span is the active span and will be used as parent by other spans created inside the function, as long as the function is executed while the scope is active.
     * @param spanOptions The options for the span
     * @param callback The function to wrap with a span
     * @returns The return value of the callback
     */
    startSpan<T>(spanOptions: SpanOptions, callback: (span: Span | undefined) => T): T;
    /**
     * Starts a manual span. The span needs to be finished manually by either calling end() or fail() using the returned span object or by calling endSpanManual().
     * @param spanOptions The options for the span
     * @returns A span object that allows to end the span successfully or fail it.
     */
    startSpanManual(spanOptions: SpanOptions): ManualSpan;
    /**
     * Ends a manual span and sends it to Sentry. Spans can be ended using a MonitoringClient instance which wasn't necessarily used to start the span.
     * Calling this method will end the last span with the same name that was started using startSpanManual() and will ignore the others.
     * @param spanOptions The options for the span
     */
    endSpanManual(spanOptions: EndSpanOptions): void;
    /**
     * Records a new breadcrumb which will be attached to future events.
     * Breadcrumbs will be added to subsequent events to provide more context on user's actions prior to an error or crash.
     * @param breadcrumb The breadcrumb to record.
     */
    addBreadcrumb(breadcrumb: Breadcrumb): void;
}
interface PlatformShowErrorProps {
    message?: string;
    action?: {
        text: string;
        onClick: () => void;
    };
    requestId?: string | null;
}
type PlatformShowError = (props: PlatformShowErrorProps) => void;
declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- It has to be an `interface` so that it can be merged.
    interface SymbolConstructor {
        readonly observable: symbol;
    }
}
type Host<Environment = unknown> = {
    channel?: {
        observeState(callback: (props: unknown, environment: Environment) => unknown): {
            disconnect: () => void;
        } | Promise<{
            disconnect: () => void;
        }>;
    };
    environment?: Environment;
    /**
     * Optional name of the environment, use for logging
     */
    name?: string;
    /**
     * Optional bast url to use for API requests, for example `www.wixapis.com`
     */
    apiBaseUrl?: string;
    /**
     * Optional function to get a monitoring client
     */
    getMonitoringClient?: () => MonitoringClient;
    /**
     * Optional function to display an error notification to the user.
     * Can be used to show a toast, modal, or any other UI element
     * that informs the user about an error that occurred.
     */
    showError?: PlatformShowError;
    /**
     * Possible data to be provided by every host, for cross cutting concerns
     * like internationalization, billing, etc.
     */
    essentials?: {
        /**
         * The language of the currently viewed session
         */
        language?: string;
        /**
         * The locale of the currently viewed session
         */
        locale?: string;
        /**
         * The timezone of the currently viewed session
         */
        timezone?: string;
        /**
         * Any headers that should be passed through to the API requests
         */
        passThroughHeaders?: Record<string, string>;
    };
};
declare global {
    interface ContextualClient {
    }
}
declare global {
    /**
     * A global interface to set the exposure toggle for the SDK.
     * @example
     * ```ts
     * declare global {
     *  interface SDKExposureToggle {
     *    alpha: true;
     *  }
     * }
     */
    interface SDKExposureToggle {
    }
}
declare global {
    /**
     * A global interface to set the type mode for the SDK.
     * @example
     * ```ts
     * declare global {
     *  interface SDKTypeMode {
     *    strict: true;
     *  }
     * }
     */
    interface SDKTypeMode {
    }
}
declare global {
    interface ContextualClient {
        host: Host;
    }
}
export { Host };
