declare module "wix-multilingual.v2" {
    /**
     * A translatable content is a unit of content to translate.
     *
     * Use [Machine Translate](/machine-translation/machine-translate) to translate a single unit of translatable content, or [Bulk Machine Translate](/machine-translation/bulk-machine-translate)
     * to translate many.
     */
    interface TranslatableContent extends TranslatableContentContentOneOf {
        /** Plain text. */
        plainTextContent?: string;
        /** HTML-encoded. */
        htmlContent?: string;
        /** Rich content. */
        richContent?: RichContent;
        /** Translatable content ID. The ID should be unique to this content and doesn't need to match the ID used by any other service. */
        _id?: string | null;
        /** Format of the translatable content. */
        format?: Format;
    }
    /** @oneof */
    interface TranslatableContentContentOneOf {
        /** Plain text. */
        plainTextContent?: string;
        /** HTML-encoded. */
        htmlContent?: string;
        /** Rich content. */
        richContent?: RichContent;
    }
    enum Format {
        /** Unspecified format. Is automatically rejected. */
        UNKNOWN_FORMAT = "UNKNOWN_FORMAT",
        /** Plain text content. */
        PLAIN_TEXT = "PLAIN_TEXT",
        /** HTML content. */
        HTML = "HTML",
        /** Rich Content. */
        RICH = "RICH"
    }
    interface RichContent {
        /** Node objects representing a rich content document. */
        nodes?: Node[];
        /** Object metadata. */
        metadata?: Metadata;
        /** Global styling for header, paragraph, block quote, and code block nodes in the object. */
        documentStyle?: DocumentStyle;
    }
    interface Node extends NodeDataOneOf {
        /** Data for a button node. */
        buttonData?: ButtonData;
        /** Data for a code block node. */
        codeBlockData?: CodeBlockData;
        /** Data for a divider node. */
        dividerData?: DividerData;
        /** Data for a file node. */
        fileData?: FileData;
        /** Data for a gallery node. */
        galleryData?: GalleryData;
        /** Data for a GIF node. */
        gifData?: GIFData;
        /** Data for a heading node. */
        headingData?: HeadingData;
        /** Data for an embedded HTML node. */
        htmlData?: HTMLData;
        /** Data for an image node. */
        imageData?: ImageData;
        /** Data for a link preview node. */
        linkPreviewData?: LinkPreviewData;
        /** Data for a map node. */
        mapData?: MapData;
        /** Data for a paragraph node. */
        paragraphData?: ParagraphData;
        /** Data for a poll node. */
        pollData?: PollData;
        /** Data for a text node. Used to apply decorations to text. */
        textData?: TextData;
        /** Data for an app embed node. */
        appEmbedData?: AppEmbedData;
        /** Data for a video node. */
        videoData?: VideoData;
        /** Data for an oEmbed node. */
        embedData?: EmbedData;
        /** Data for a collapsible list node. */
        collapsibleListData?: CollapsibleListData;
        /** Data for a table node. */
        tableData?: TableData;
        /** Data for a table cell node. */
        tableCellData?: TableCellData;
        /** Data for a custom external node. */
        externalData?: Record<string, any> | null;
        /** Data for an audio node. */
        audioData?: AudioData;
        /** Data for an ordered list node. */
        orderedListData?: OrderedListData;
        /** Data for a bulleted list node. */
        bulletedListData?: BulletedListData;
        /** Data for a block quote node. */
        blockquoteData?: BlockquoteData;
        /** Node type. Use `APP_EMBED` for nodes that embed content from other Wix apps. Use `EMBED` to embed content in [oEmbed](https://oembed.com/) format. */
        type?: NodeType;
        /** Node ID. */
        _id?: string;
        /** A list of child nodes. */
        nodes?: Node[];
        /** Padding and background color styling for the node. */
        style?: NodeStyle;
    }
    /** @oneof */
    interface NodeDataOneOf {
        /** Data for a button node. */
        buttonData?: ButtonData;
        /** Data for a code block node. */
        codeBlockData?: CodeBlockData;
        /** Data for a divider node. */
        dividerData?: DividerData;
        /** Data for a file node. */
        fileData?: FileData;
        /** Data for a gallery node. */
        galleryData?: GalleryData;
        /** Data for a GIF node. */
        gifData?: GIFData;
        /** Data for a heading node. */
        headingData?: HeadingData;
        /** Data for an embedded HTML node. */
        htmlData?: HTMLData;
        /** Data for an image node. */
        imageData?: ImageData;
        /** Data for a link preview node. */
        linkPreviewData?: LinkPreviewData;
        /** Data for a map node. */
        mapData?: MapData;
        /** Data for a paragraph node. */
        paragraphData?: ParagraphData;
        /** Data for a poll node. */
        pollData?: PollData;
        /** Data for a text node. Used to apply decorations to text. */
        textData?: TextData;
        /** Data for an app embed node. */
        appEmbedData?: AppEmbedData;
        /** Data for a video node. */
        videoData?: VideoData;
        /** Data for an oEmbed node. */
        embedData?: EmbedData;
        /** Data for a collapsible list node. */
        collapsibleListData?: CollapsibleListData;
        /** Data for a table node. */
        tableData?: TableData;
        /** Data for a table cell node. */
        tableCellData?: TableCellData;
        /** Data for a custom external node. */
        externalData?: Record<string, any> | null;
        /** Data for an audio node. */
        audioData?: AudioData;
        /** Data for an ordered list node. */
        orderedListData?: OrderedListData;
        /** Data for a bulleted list node. */
        bulletedListData?: BulletedListData;
        /** Data for a block quote node. */
        blockquoteData?: BlockquoteData;
    }
    enum NodeType {
        PARAGRAPH = "PARAGRAPH",
        TEXT = "TEXT",
        HEADING = "HEADING",
        BULLETED_LIST = "BULLETED_LIST",
        ORDERED_LIST = "ORDERED_LIST",
        LIST_ITEM = "LIST_ITEM",
        BLOCKQUOTE = "BLOCKQUOTE",
        CODE_BLOCK = "CODE_BLOCK",
        VIDEO = "VIDEO",
        DIVIDER = "DIVIDER",
        FILE = "FILE",
        GALLERY = "GALLERY",
        GIF = "GIF",
        HTML = "HTML",
        IMAGE = "IMAGE",
        LINK_PREVIEW = "LINK_PREVIEW",
        MAP = "MAP",
        POLL = "POLL",
        APP_EMBED = "APP_EMBED",
        BUTTON = "BUTTON",
        COLLAPSIBLE_LIST = "COLLAPSIBLE_LIST",
        TABLE = "TABLE",
        EMBED = "EMBED",
        COLLAPSIBLE_ITEM = "COLLAPSIBLE_ITEM",
        COLLAPSIBLE_ITEM_TITLE = "COLLAPSIBLE_ITEM_TITLE",
        COLLAPSIBLE_ITEM_BODY = "COLLAPSIBLE_ITEM_BODY",
        TABLE_CELL = "TABLE_CELL",
        TABLE_ROW = "TABLE_ROW",
        EXTERNAL = "EXTERNAL",
        AUDIO = "AUDIO"
    }
    interface NodeStyle {
        /** The top padding value in pixels. */
        paddingTop?: string | null;
        /** The bottom padding value in pixels. */
        paddingBottom?: string | null;
        /** The background color as a hexadecimal value. */
        backgroundColor?: string | null;
    }
    interface ButtonData {
        /** Styling for the button's container. */
        containerData?: PluginContainerData;
        /** The button type. */
        type?: Type;
        /** Styling for the button. */
        styles?: Styles;
        /** The text to display on the button. */
        text?: string | null;
        /** Button link details. */
        link?: Link;
    }
    interface Border {
        /** Border width in pixels. */
        width?: number | null;
        /** Border radius in pixels. */
        radius?: number | null;
    }
    interface Colors {
        /** The text color as a hexadecimal value. */
        text?: string | null;
        /** The border color as a hexadecimal value. */
        border?: string | null;
        /** The background color as a hexadecimal value. */
        background?: string | null;
    }
    interface PluginContainerData {
        /** The width of the node when it's displayed. */
        width?: PluginContainerDataWidth;
        /** The node's alignment within its container. */
        alignment?: PluginContainerDataAlignment;
        /** Spoiler cover settings for the node. */
        spoiler?: Spoiler;
        /** The height of the node when it's displayed. */
        height?: Height;
        /** Sets whether text should wrap around this node when it's displayed. If `textWrap` is `false`, the node takes up the width of its container. Defaults to `true` for all node types except 'DIVIVDER' where it defaults to `false`. */
        textWrap?: boolean | null;
    }
    enum WidthType {
        /** Width matches the content width */
        CONTENT = "CONTENT",
        /** Small Width */
        SMALL = "SMALL",
        /** Width will match the original asset width */
        ORIGINAL = "ORIGINAL",
        /** coast-to-coast display */
        FULL_WIDTH = "FULL_WIDTH"
    }
    interface PluginContainerDataWidth extends PluginContainerDataWidthDataOneOf {
        /**
         * One of the following predefined width options:
         * `CONTENT`: The width of the container matches the content width.
         * `SMALL`: A small width.
         * `ORIGINAL`: For `imageData` containers only. The width of the container matches the original image width.
         * `FULL_WIDTH`: For `imageData` containers only. The image container takes up the full width of the screen.
         */
        size?: WidthType;
        /** A custom width value in pixels. */
        custom?: string | null;
    }
    /** @oneof */
    interface PluginContainerDataWidthDataOneOf {
        /**
         * One of the following predefined width options:
         * `CONTENT`: The width of the container matches the content width.
         * `SMALL`: A small width.
         * `ORIGINAL`: For `imageData` containers only. The width of the container matches the original image width.
         * `FULL_WIDTH`: For `imageData` containers only. The image container takes up the full width of the screen.
         */
        size?: WidthType;
        /** A custom width value in pixels. */
        custom?: string | null;
    }
    enum PluginContainerDataAlignment {
        /** Center Alignment */
        CENTER = "CENTER",
        /** Left Alignment */
        LEFT = "LEFT",
        /** Right Alignment */
        RIGHT = "RIGHT"
    }
    interface Spoiler {
        /** Sets whether the spoiler cover is enabled for this node. Defaults to `false`. */
        enabled?: boolean | null;
        /** The description displayed on top of the spoiler cover. */
        description?: string | null;
        /** The text for the button used to remove the spoiler cover. */
        buttonText?: string | null;
    }
    interface Height {
        /** A custom height value in pixels. */
        custom?: string | null;
    }
    enum Type {
        /** Regular link button */
        LINK = "LINK",
        /** Triggers custom action that is defined in plugin configuration by the consumer */
        ACTION = "ACTION"
    }
    interface Styles {
        /** Border attributes. */
        border?: Border;
        /** Color attributes. */
        colors?: Colors;
    }
    interface Link extends LinkDataOneOf {
        /** The absolute URL for the linked document. */
        url?: string;
        /** The target node's ID. Used for linking to another node in this object. */
        anchor?: string;
        /**
         * he HTML `target` attribute value for the link. This property defines where the linked document opens as follows:
         * `SELF` - Default. Opens the linked document in the same frame as the link.
         * `BLANK` - Opens the linked document in a new browser tab or window.
         * `PARENT` - Opens the linked document in the link's parent frame.
         * `TOP` - Opens the linked document in the full body of the link's browser tab or window.
         */
        target?: Target;
        /** The HTML `rel` attribute value for the link. This object specifies the relationship between the current document and the linked document. */
        rel?: Rel;
        /** A serialized object used for a custom or external link panel. */
        customData?: string | null;
    }
    /** @oneof */
    interface LinkDataOneOf {
        /** The absolute URL for the linked document. */
        url?: string;
        /** The target node's ID. Used for linking to another node in this object. */
        anchor?: string;
    }
    enum Target {
        /** Opens the linked document in the same frame as it was clicked (this is default) */
        SELF = "SELF",
        /** Opens the linked document in a new window or tab */
        BLANK = "BLANK",
        /** Opens the linked document in the parent frame */
        PARENT = "PARENT",
        /** Opens the linked document in the full body of the window */
        TOP = "TOP"
    }
    interface Rel {
        /** Indicates to search engine crawlers not to follow the link. Defaults to `false`. */
        nofollow?: boolean | null;
        /** Indicates to search engine crawlers that the link is a paid placement such as sponsored content or an advertisement. Defaults to `false`. */
        sponsored?: boolean | null;
        /** Indicates that this link is user-generated content and isn't necessarily trusted or endorsed by the page’s author. For example, a link in a fourm post. Defaults to `false`. */
        ugc?: boolean | null;
        /** Indicates that this link protect referral information from being passed to the target website. */
        noreferrer?: boolean | null;
    }
    interface CodeBlockData {
        /** Styling for the code block's text. */
        textStyle?: TextStyle;
    }
    interface TextStyle {
        /** Text alignment. Defaults to `AUTO`. */
        textAlignment?: TextAlignment;
        /** A CSS `line-height` value for the text expressed as a ratio relative to the font size. For example, if the font size is 20px, a `lineHeight` value of `'1.5'`` results in a line height of 30px. */
        lineHeight?: string | null;
    }
    enum TextAlignment {
        /** browser default, eqivalent to `initial` */
        AUTO = "AUTO",
        /** Left align */
        LEFT = "LEFT",
        /** Right align */
        RIGHT = "RIGHT",
        /** Center align */
        CENTER = "CENTER",
        /** Text is spaced to line up its left and right edges to the left and right edges of the line box, except for the last line */
        JUSTIFY = "JUSTIFY"
    }
    interface DividerData {
        /** Styling for the divider's container. */
        containerData?: PluginContainerData;
        /** Divider line style. */
        lineStyle?: LineStyle;
        /** Divider width. */
        width?: Width;
        /** Divider alignment. */
        alignment?: Alignment;
    }
    enum LineStyle {
        /** Single Line */
        SINGLE = "SINGLE",
        /** Double Line */
        DOUBLE = "DOUBLE",
        /** Dashed Line */
        DASHED = "DASHED",
        /** Dotted Line */
        DOTTED = "DOTTED"
    }
    enum Width {
        /** Large line */
        LARGE = "LARGE",
        /** Medium line */
        MEDIUM = "MEDIUM",
        /** Small line */
        SMALL = "SMALL"
    }
    enum Alignment {
        /** Center alignment */
        CENTER = "CENTER",
        /** Left alignment */
        LEFT = "LEFT",
        /** Right alignment */
        RIGHT = "RIGHT"
    }
    interface FileData {
        /** Styling for the file's container. */
        containerData?: PluginContainerData;
        /** The source for the file's data. */
        src?: FileSource;
        /** File name. */
        name?: string | null;
        /** File type. */
        type?: string | null;
        /** File size in KB. */
        size?: number | null;
        /** Settings for PDF files. */
        pdfSettings?: PDFSettings;
        /** File MIME type. */
        mimeType?: string | null;
        /** File path. */
        path?: string | null;
    }
    enum ViewMode {
        /** No PDF view */
        NONE = "NONE",
        /** Full PDF view */
        FULL = "FULL",
        /** Mini PDF view */
        MINI = "MINI"
    }
    interface FileSource extends FileSourceDataOneOf {
        /** The absolute URL for the file's source. */
        url?: string | null;
        /**
         * Custom ID. Use `id` instead.
         * @deprecated
         */
        custom?: string | null;
        /** An ID that's resolved to a URL by a resolver function. */
        _id?: string | null;
        /** Indicates whether the file's source is private. Defaults to `false`. */
        private?: boolean | null;
    }
    /** @oneof */
    interface FileSourceDataOneOf {
        /** The absolute URL for the file's source. */
        url?: string | null;
        /**
         * Custom ID. Use `id` instead.
         * @deprecated
         */
        custom?: string | null;
        /** An ID that's resolved to a URL by a resolver function. */
        _id?: string | null;
    }
    interface PDFSettings {
        /**
         * PDF view mode. One of the following:
         * `NONE` : The PDF isn't displayed.
         * `FULL` : A full page view of the PDF is displayed.
         * `MINI` : A mini view of the PDF is displayed.
         */
        viewMode?: ViewMode;
        /** Sets whether the PDF download button is disabled. Defaults to `false`. */
        disableDownload?: boolean | null;
        /** Sets whether the PDF print button is disabled. Defaults to `false`. */
        disablePrint?: boolean | null;
    }
    interface GalleryData {
        /** Styling for the gallery's container. */
        containerData?: PluginContainerData;
        /** The items in the gallery. */
        items?: Item[];
        /** Options for defining the gallery's appearance. */
        options?: GalleryOptions;
        /** Sets whether the gallery's expand button is disabled. Defaults to `false`. */
        disableExpand?: boolean | null;
        /** Sets whether the gallery's download button is disabled. Defaults to `false`. */
        disableDownload?: boolean | null;
    }
    interface Media {
        /** The source for the media's data. */
        src?: FileSource;
        /** Media width in pixels. */
        width?: number | null;
        /** Media height in pixels. */
        height?: number | null;
        /** Media duration in seconds. Only relevant for audio and video files. */
        duration?: number | null;
    }
    interface Image {
        /** Image file details. */
        media?: Media;
        /** Link details for images that are links. */
        link?: Link;
    }
    interface Video {
        /** Video file details. */
        media?: Media;
        /** Video thumbnail file details. */
        thumbnail?: Media;
    }
    interface Item extends ItemDataOneOf {
        /** An image item. */
        image?: Image;
        /** A video item. */
        video?: Video;
        /** Item title. */
        title?: string | null;
        /** Item's alternative text. */
        altText?: string | null;
    }
    /** @oneof */
    interface ItemDataOneOf {
        /** An image item. */
        image?: Image;
        /** A video item. */
        video?: Video;
    }
    interface GalleryOptions {
        /** Gallery layout. */
        layout?: Layout;
        /** Styling for gallery items. */
        item?: ItemStyle;
        /** Styling for gallery thumbnail images. */
        thumbnails?: Thumbnails;
    }
    enum LayoutType {
        /** Collage type */
        COLLAGE = "COLLAGE",
        /** Masonry type */
        MASONRY = "MASONRY",
        /** Grid type */
        GRID = "GRID",
        /** Thumbnail type */
        THUMBNAIL = "THUMBNAIL",
        /** Slider type */
        SLIDER = "SLIDER",
        /** Slideshow type */
        SLIDESHOW = "SLIDESHOW",
        /** Panorama type */
        PANORAMA = "PANORAMA",
        /** Column type */
        COLUMN = "COLUMN",
        /** Magic type */
        MAGIC = "MAGIC",
        /** Fullsize images type */
        FULLSIZE = "FULLSIZE"
    }
    enum Orientation {
        /** Rows Orientation */
        ROWS = "ROWS",
        /** Columns Orientation */
        COLUMNS = "COLUMNS"
    }
    enum Crop {
        /** Crop to fill */
        FILL = "FILL",
        /** Crop to fit */
        FIT = "FIT"
    }
    enum ThumbnailsAlignment {
        /** Top alignment */
        TOP = "TOP",
        /** Right alignment */
        RIGHT = "RIGHT",
        /** Bottom alignment */
        BOTTOM = "BOTTOM",
        /** Left alignment */
        LEFT = "LEFT",
        /** No thumbnail */
        NONE = "NONE"
    }
    interface Layout {
        /** Gallery layout type. */
        type?: LayoutType;
        /** Sets whether horizontal scroll is enabled. Defaults to `true` unless the layout `type` is set to `GRID` or `COLLAGE`. */
        horizontalScroll?: boolean | null;
        /** Gallery orientation. */
        orientation?: Orientation;
        /** The number of columns to display on full size screens. */
        numberOfColumns?: number | null;
        /** The number of columns to display on mobile screens. */
        mobileNumberOfColumns?: number | null;
    }
    interface ItemStyle {
        /** Desirable dimension for each item in pixels (behvaior changes according to gallery type) */
        targetSize?: number | null;
        /** Item ratio */
        ratio?: number | null;
        /** Sets how item images are cropped. */
        crop?: Crop;
        /** The spacing between items in pixels. */
        spacing?: number | null;
    }
    interface Thumbnails {
        /** Thumbnail alignment. */
        placement?: ThumbnailsAlignment;
        /** Spacing between thumbnails in pixels. */
        spacing?: number | null;
    }
    interface GIFData {
        /** Styling for the GIF's container. */
        containerData?: PluginContainerData;
        /** The source of the full size GIF. */
        original?: GIF;
        /** The source of the downsized GIF. */
        downsized?: GIF;
        /** Height in pixels. */
        height?: number;
        /** Width in pixels. */
        width?: number;
    }
    interface GIF {
        /** GIF format URL. */
        gif?: string | null;
        /** MP4 format URL. */
        mp4?: string | null;
        /** Thumbnail URL. */
        still?: string | null;
    }
    interface HeadingData {
        /** Heading level from 1-6. */
        level?: number;
        /** Styling for the heading text. */
        textStyle?: TextStyle;
        /** Indentation level from 1-4. */
        indentation?: number | null;
    }
    interface HTMLData extends HTMLDataDataOneOf {
        /** The URL for the HTML code for the node. */
        url?: string;
        /** The HTML code for the node. */
        html?: string;
        /**
         * Whether this is an AdSense element. Use `source` instead.
         * @deprecated
         */
        isAdsense?: boolean | null;
        /** Styling for the HTML node's container. */
        containerData?: PluginContainerData;
        /** The type of HTML code. */
        source?: Source;
    }
    /** @oneof */
    interface HTMLDataDataOneOf {
        /** The URL for the HTML code for the node. */
        url?: string;
        /** The HTML code for the node. */
        html?: string;
        /**
         * Whether this is an AdSense element. Use `source` instead.
         * @deprecated
         */
        isAdsense?: boolean | null;
    }
    enum Source {
        HTML = "HTML",
        ADSENSE = "ADSENSE"
    }
    interface ImageData {
        /** Styling for the image's container. */
        containerData?: PluginContainerData;
        /** Image file details. */
        image?: Media;
        /** Link details for images that are links. */
        link?: Link;
        /** Sets whether the image expands to full screen when clicked. Defaults to `false`. */
        disableExpand?: boolean | null;
        /** Image's alternative text. */
        altText?: string | null;
        /** Image caption. */
        caption?: string | null;
        /** Sets whether the image's download button is disabled. Defaults to `false`. */
        disableDownload?: boolean | null;
    }
    interface LinkPreviewData {
        /** Styling for the link preview's container. */
        containerData?: PluginContainerData;
        /** Link details. */
        link?: Link;
        /** Preview title. */
        title?: string | null;
        /** Preview thumbnail URL. */
        thumbnailUrl?: string | null;
        /** Preview description. */
        description?: string | null;
        /** The preview content as HTML. */
        html?: string | null;
    }
    interface MapData {
        /** Styling for the map's container. */
        containerData?: PluginContainerData;
        /** Map settings. */
        mapSettings?: MapSettings;
    }
    interface MapSettings {
        /** The address to display on the map. */
        address?: string | null;
        /** Sets whether the map is draggable. */
        draggable?: boolean | null;
        /** Sets whether the location marker is visible. */
        marker?: boolean | null;
        /** Sets whether street view control is enabled. */
        streetViewControl?: boolean | null;
        /** Sets whether zoom control is enabled. */
        zoomControl?: boolean | null;
        /** Location latitude. */
        lat?: number | null;
        /** Location longitude. */
        lng?: number | null;
        /** Location name. */
        locationName?: string | null;
        /** Sets whether view mode control is enabled. */
        viewModeControl?: boolean | null;
        /** Initial zoom value. */
        initialZoom?: number | null;
        /** Map type. `HYBRID` is a combination of the `ROADMAP` and `SATELLITE` map types. */
        mapType?: MapType;
    }
    enum MapType {
        /** Roadmap map type */
        ROADMAP = "ROADMAP",
        /** Satellite map type */
        SATELITE = "SATELITE",
        /** Hybrid map type */
        HYBRID = "HYBRID",
        /** Terrain map type */
        TERRAIN = "TERRAIN"
    }
    interface ParagraphData {
        /** Styling for the paragraph text. */
        textStyle?: TextStyle;
        /** Indentation level from 1-4. */
        indentation?: number | null;
        /** Paragraph level */
        level?: number | null;
    }
    interface PollData {
        /** Styling for the poll's container. */
        containerData?: PluginContainerData;
        /** Poll data. */
        poll?: Poll;
        /** Layout settings for the poll and voting options. */
        layout?: PollDataLayout;
        /** Styling for the poll and voting options. */
        design?: Design;
    }
    enum ViewRole {
        /** Only Poll creator can view the results */
        CREATOR = "CREATOR",
        /** Anyone who voted can see the results */
        VOTERS = "VOTERS",
        /** Anyone can see the results, even if one didn't vote */
        EVERYONE = "EVERYONE"
    }
    enum VoteRole {
        /** Logged in member */
        SITE_MEMBERS = "SITE_MEMBERS",
        /** Anyone */
        ALL = "ALL"
    }
    interface Permissions {
        /** Sets who can view the poll results. */
        view?: ViewRole;
        /** Sets who can vote. */
        vote?: VoteRole;
        /** Sets whether one voter can vote multiple times. Defaults to `false`. */
        allowMultipleVotes?: boolean | null;
    }
    interface Option {
        /** Option ID. */
        _id?: string | null;
        /** Option title. */
        title?: string | null;
        /** The image displayed with the option. */
        image?: Media;
    }
    interface Settings {
        /** Permissions settings for voting. */
        permissions?: Permissions;
        /** Sets whether voters are displayed in the vote results. Defaults to `true`. */
        showVoters?: boolean | null;
        /** Sets whether the vote count is displayed. Defaults to `true`. */
        showVotesCount?: boolean | null;
    }
    enum PollLayoutType {
        /** List */
        LIST = "LIST",
        /** Grid */
        GRID = "GRID"
    }
    enum PollLayoutDirection {
        /** Left-to-right */
        LTR = "LTR",
        /** Right-to-left */
        RTL = "RTL"
    }
    interface PollLayout {
        /** The layout for displaying the voting options. */
        type?: PollLayoutType;
        /** The direction of the text displayed in the voting options. Text can be displayed either right-to-left or left-to-right. */
        direction?: PollLayoutDirection;
        /** Sets whether to display the main poll image. Defaults to `false`. */
        enableImage?: boolean | null;
    }
    interface OptionLayout {
        /** Sets whether to display option images. Defaults to `false`. */
        enableImage?: boolean | null;
    }
    enum BackgroundType {
        /** Color background type */
        COLOR = "COLOR",
        /** Image background type */
        IMAGE = "IMAGE",
        /** Gradiant background type */
        GRADIENT = "GRADIENT"
    }
    interface Gradient {
        /** The gradient angle in degrees. */
        angle?: number | null;
        /** The start color as a hexademical value. */
        startColor?: string | null;
        /** The end color as a hexademical value. */
        lastColor?: string | null;
    }
    interface Background extends BackgroundBackgroundOneOf {
        /** The background color as a hexademical value. */
        color?: string | null;
        /** An image to use for the background. */
        image?: Media;
        /** Details for a gradient background. */
        gradient?: Gradient;
        /** Background type. For each option, include the relevant details. */
        type?: BackgroundType;
    }
    /** @oneof */
    interface BackgroundBackgroundOneOf {
        /** The background color as a hexademical value. */
        color?: string | null;
        /** An image to use for the background. */
        image?: Media;
        /** Details for a gradient background. */
        gradient?: Gradient;
    }
    interface PollDesign {
        /** Background styling. */
        background?: Background;
        /** Border radius in pixels. */
        borderRadius?: number | null;
    }
    interface OptionDesign {
        /** Border radius in pixels. */
        borderRadius?: number | null;
    }
    interface Poll {
        /** Poll ID. */
        _id?: string | null;
        /** Poll title. */
        title?: string | null;
        /** Poll creator ID. */
        creatorId?: string | null;
        /** Main poll image. */
        image?: Media;
        /** Voting options. */
        options?: Option[];
        /** The poll's permissions and display settings. */
        settings?: Settings;
    }
    interface PollDataLayout {
        /** Poll layout settings. */
        poll?: PollLayout;
        /** Voting otpions layout settings. */
        options?: OptionLayout;
    }
    interface Design {
        /** Styling for the poll. */
        poll?: PollDesign;
        /** Styling for voting options. */
        options?: OptionDesign;
    }
    interface TextData {
        /** The text to apply decorations to. */
        text?: string;
        /** The decorations to apply. */
        decorations?: Decoration[];
    }
    /** Adds appearence changes to text */
    interface Decoration extends DecorationDataOneOf {
        /** Data for an anchor link decoration. */
        anchorData?: AnchorData;
        /** Data for a color decoration. */
        colorData?: ColorData;
        /** Data for an external link decoration. */
        linkData?: LinkData;
        /** Data for a mention decoration. */
        mentionData?: MentionData;
        /** Data for a font size decoration. */
        fontSizeData?: FontSizeData;
        /** Font weight for a bold decoration. */
        fontWeightValue?: number | null;
        /** Data for an italic decoration. Defaults to `true`. */
        italicData?: boolean | null;
        /** Data for an underline decoration. Defaults to `true`. */
        underlineData?: boolean | null;
        /** Data for a spoiler decoration. */
        spoilerData?: SpoilerData;
        /** The type of decoration to apply. */
        type?: DecorationType;
    }
    /** @oneof */
    interface DecorationDataOneOf {
        /** Data for an anchor link decoration. */
        anchorData?: AnchorData;
        /** Data for a color decoration. */
        colorData?: ColorData;
        /** Data for an external link decoration. */
        linkData?: LinkData;
        /** Data for a mention decoration. */
        mentionData?: MentionData;
        /** Data for a font size decoration. */
        fontSizeData?: FontSizeData;
        /** Font weight for a bold decoration. */
        fontWeightValue?: number | null;
        /** Data for an italic decoration. Defaults to `true`. */
        italicData?: boolean | null;
        /** Data for an underline decoration. Defaults to `true`. */
        underlineData?: boolean | null;
        /** Data for a spoiler decoration. */
        spoilerData?: SpoilerData;
    }
    enum DecorationType {
        BOLD = "BOLD",
        ITALIC = "ITALIC",
        UNDERLINE = "UNDERLINE",
        SPOILER = "SPOILER",
        ANCHOR = "ANCHOR",
        MENTION = "MENTION",
        LINK = "LINK",
        COLOR = "COLOR",
        FONT_SIZE = "FONT_SIZE",
        EXTERNAL = "EXTERNAL"
    }
    interface AnchorData {
        /** The target node's ID. */
        anchor?: string;
    }
    interface ColorData {
        /** The text's background color as a hexadecimal value. */
        background?: string | null;
        /** The text's foreground color as a hexadecimal value. */
        foreground?: string | null;
    }
    interface LinkData {
        /** Link details. */
        link?: Link;
    }
    interface MentionData {
        /** The mentioned user's name. */
        name?: string;
        /** The version of the user's name that appears after the `@` character in the mention. */
        slug?: string;
        /** Mentioned user's ID. */
        _id?: string | null;
    }
    interface FontSizeData {
        /** The units used for the font size. */
        unit?: FontType;
        /** Font size value. */
        value?: number | null;
    }
    enum FontType {
        PX = "PX",
        EM = "EM"
    }
    interface SpoilerData {
        /** Spoiler ID. */
        _id?: string | null;
    }
    interface AppEmbedData extends AppEmbedDataAppDataOneOf {
        /** Data for embedded Wix Bookings content. */
        bookingData?: BookingData;
        /** Data for embedded Wix Events content. */
        eventData?: EventData;
        /** The type of Wix App content being embedded. */
        type?: AppType;
        /** The ID of the embedded content. */
        itemId?: string | null;
        /** The name of the embedded content. */
        name?: string | null;
        /**
         * Deprecated: Use `image` instead.
         * @deprecated
         */
        imageSrc?: string | null;
        /** The URL for the embedded content. */
        url?: string | null;
        /** An image for the embedded content. */
        image?: Media;
    }
    /** @oneof */
    interface AppEmbedDataAppDataOneOf {
        /** Data for embedded Wix Bookings content. */
        bookingData?: BookingData;
        /** Data for embedded Wix Events content. */
        eventData?: EventData;
    }
    enum AppType {
        PRODUCT = "PRODUCT",
        EVENT = "EVENT",
        BOOKING = "BOOKING"
    }
    interface BookingData {
        /** Booking duration in minutes. */
        durations?: string | null;
    }
    interface EventData {
        /** Event schedule. */
        scheduling?: string | null;
        /** Event location. */
        location?: string | null;
    }
    interface VideoData {
        /** Styling for the video's container. */
        containerData?: PluginContainerData;
        /** Video details. */
        video?: Media;
        /** Video thumbnail details. */
        thumbnail?: Media;
        /** Sets whether the video's download button is disabled. Defaults to `false`. */
        disableDownload?: boolean | null;
        /** Video title. */
        title?: string | null;
        /** Video options. */
        options?: PlaybackOptions;
    }
    interface PlaybackOptions {
        /** Sets whether the media will automatically start playing. */
        autoPlay?: boolean | null;
        /** Sets whether media's will be looped. */
        playInLoop?: boolean | null;
        /** Sets whether media's controls will be shown. */
        showControls?: boolean | null;
    }
    interface EmbedData {
        /** Styling for the oEmbed node's container. */
        containerData?: PluginContainerData;
        /** An [oEmbed](https://www.oembed.com) object. */
        oembed?: Oembed;
        /** Origin asset source. */
        src?: string | null;
    }
    interface Oembed {
        /** The resource type. */
        type?: string | null;
        /** The width of the resource specified in the `url` property in pixels. */
        width?: number | null;
        /** The height of the resource specified in the `url` property in pixels. */
        height?: number | null;
        /** Resource title. */
        title?: string | null;
        /** The source URL for the resource. */
        url?: string | null;
        /** HTML for embedding a video player. The HTML should have no padding or margins. */
        html?: string | null;
        /** The name of the author or owner of the resource. */
        authorName?: string | null;
        /** The URL for the author or owner of the resource. */
        authorUrl?: string | null;
        /** The name of the resource provider. */
        providerName?: string | null;
        /** The URL for the resource provider. */
        providerUrl?: string | null;
        /** The URL for a thumbnail image for the resource. If this property is defined, `thumbnailWidth` and `thumbnailHeight` must also be defined. */
        thumbnailUrl?: string | null;
        /** The width of the resource's thumbnail image. If this property is defined, `thumbnailUrl` and `thumbnailHeight` must also be defined. */
        thumbnailWidth?: string | null;
        /** The height of the resource's thumbnail image. If this property is defined, `thumbnailUrl` and `thumbnailWidth`must also be defined. */
        thumbnailHeight?: string | null;
        /** The URL for an embedded viedo. */
        videoUrl?: string | null;
        /** The oEmbed version number.  This value must be `1.0`. */
        version?: string | null;
    }
    interface CollapsibleListData {
        /** Styling for the collapsible list's container. */
        containerData?: PluginContainerData;
        /** If `true`, only one item can be expanded at a time. Defaults to `false`. */
        expandOnlyOne?: boolean | null;
        /** Sets which items are expanded when the page loads. */
        initialExpandedItems?: InitialExpandedItems;
        /** The direction of the text in the list. Either left-to-right or right-to-left. */
        direction?: Direction;
        /** If `true`, The collapsible item will appear in search results as an FAQ. */
        isQapageData?: boolean | null;
    }
    enum InitialExpandedItems {
        /** First item will be expended initally */
        FIRST = "FIRST",
        /** All items will expended initally */
        ALL = "ALL",
        /** All items collapsed initally */
        NONE = "NONE"
    }
    enum Direction {
        /** Left-to-right */
        LTR = "LTR",
        /** Right-to-left */
        RTL = "RTL"
    }
    interface TableData {
        /** Styling for the table's container. */
        containerData?: PluginContainerData;
        /** The table's dimensions. */
        dimensions?: Dimensions;
        /**
         * Deprecated: Use `rowHeader` and `columnHeader` instead.
         * @deprecated
         */
        header?: boolean | null;
        /** Sets whether the table's first row is a header. Defaults to `false`. */
        rowHeader?: boolean | null;
        /** Sets whether the table's first column is a header. Defaults to `false`. */
        columnHeader?: boolean | null;
    }
    interface Dimensions {
        /** An array representing relative width of each column in relation to the other columns. */
        colsWidthRatio?: number[];
        /** An array representing the height of each row in pixels. */
        rowsHeight?: number[];
        /** An array representing the minimum width of each column in pixels. */
        colsMinWidth?: number[];
    }
    interface TableCellData {
        /** Styling for the cell's background color and text alignment. */
        cellStyle?: CellStyle;
        /** The cell's border colors. */
        borderColors?: BorderColors;
    }
    enum VerticalAlignment {
        /** Top alignment */
        TOP = "TOP",
        /** Middle alignment */
        MIDDLE = "MIDDLE",
        /** Bottom alignment */
        BOTTOM = "BOTTOM"
    }
    interface CellStyle {
        /** Vertical alignment for the cell's text. */
        verticalAlignment?: VerticalAlignment;
        /** Cell background color as a hexadecimal value. */
        backgroundColor?: string | null;
    }
    interface BorderColors {
        /** Left border color as a hexadecimal value. */
        left?: string | null;
        /** Right border color as a hexadecimal value. */
        right?: string | null;
        /** Top border color as a hexadecimal value. */
        top?: string | null;
        /** Bottom border color as a hexadecimal value. */
        bottom?: string | null;
    }
    /**
     * `NullValue` is a singleton enumeration to represent the null value for the
     * `Value` type union.
     *
     * The JSON representation for `NullValue` is JSON `null`.
     */
    enum NullValue {
        /** Null value. */
        NULL_VALUE = "NULL_VALUE"
    }
    /**
     * `ListValue` is a wrapper around a repeated field of values.
     *
     * The JSON representation for `ListValue` is JSON array.
     */
    interface ListValue {
        /** Repeated field of dynamically typed values. */
        values?: any[];
    }
    interface AudioData {
        /** Styling for the audio node's container. */
        containerData?: PluginContainerData;
        /** Audio file details. */
        audio?: Media;
        /** Sets whether the audio node's download button is disabled. Defaults to `false`. */
        disableDownload?: boolean | null;
        /** Cover image. */
        coverImage?: Media;
        /** Track name. */
        name?: string | null;
        /** Author name. */
        authorName?: string | null;
        /** An HTML version of the audio node. */
        html?: string | null;
    }
    interface OrderedListData {
        /** Indentation level from 0-4. */
        indentation?: number;
        /** Offset level from 0-4. */
        offset?: number | null;
    }
    interface BulletedListData {
        /** Indentation level from 0-4. */
        indentation?: number;
        /** Offset level from 0-4. */
        offset?: number | null;
    }
    interface BlockquoteData {
        /** Indentation level from 1-4. */
        indentation?: number;
    }
    interface Metadata {
        /** Schema version. */
        version?: number;
        /**
         * When the object was created.
         * @readonly
         * @deprecated
         */
        createdTimestamp?: Date;
        /**
         * When the object was most recently updated.
         * @deprecated
         */
        updatedTimestamp?: Date;
        /** Object ID. */
        _id?: string | null;
    }
    interface DocumentStyle {
        /** Styling for H1 nodes. */
        headerOne?: TextNodeStyle;
        /** Styling for H2 nodes. */
        headerTwo?: TextNodeStyle;
        /** Styling for H3 nodes. */
        headerThree?: TextNodeStyle;
        /** Styling for H4 nodes. */
        headerFour?: TextNodeStyle;
        /** Styling for H5 nodes. */
        headerFive?: TextNodeStyle;
        /** Styling for H6 nodes. */
        headerSix?: TextNodeStyle;
        /** Styling for paragraph nodes. */
        paragraph?: TextNodeStyle;
        /** Styling for block quote nodes. */
        blockquote?: TextNodeStyle;
        /** Styling for code block nodes. */
        codeBlock?: TextNodeStyle;
    }
    interface TextNodeStyle {
        /** The decorations to apply to the node. */
        decorations?: Decoration[];
        /** Padding and background color for the node. */
        nodeStyle?: NodeStyle;
        /** Line height for text in the node. */
        lineHeight?: string | null;
    }
    interface MachineTranslateRequest {
        /** Language of the source text to translate. */
        sourceLanguage: SupportedLanguage;
        /** Language to translate text into. */
        targetLanguage: SupportedLanguage;
        /** The content to translate. */
        contentToTranslate: TranslatableContent;
    }
    enum SupportedLanguage {
        /** Undefined Language */
        UNDEFINED_SUPPORTED_LANGUAGE = "UNDEFINED_SUPPORTED_LANGUAGE",
        /** Afrikaans */
        AF = "AF",
        /** Albanian */
        SQ = "SQ",
        /** Amharic */
        AM = "AM",
        /** Arabic */
        AR = "AR",
        /** Armenian */
        HY = "HY",
        /** Assamese */
        AS = "AS",
        /** Aymara */
        AY = "AY",
        /** Azerbaijani */
        AZ = "AZ",
        /** Bambara */
        BM = "BM",
        /** Basque */
        EU = "EU",
        /** Belarusian */
        BE = "BE",
        /** Bengali */
        BN = "BN",
        /** Bhojpuri */
        BHO = "BHO",
        /** Bosnian */
        BS = "BS",
        /** Bulgarian */
        BG = "BG",
        /** Catalan */
        CA = "CA",
        /** Cebuano */
        CEB = "CEB",
        /** Chinese (Simplified) */
        ZH_CN = "ZH_CN",
        /** Chinese (Traditional) */
        ZH_TW = "ZH_TW",
        /** Chinese (Simplified) */
        ZH = "ZH",
        /** Corsican */
        CO = "CO",
        /** Croatian */
        HR = "HR",
        /** Czech */
        CS = "CS",
        /** Danish */
        DA = "DA",
        /** Dhivehi */
        DV = "DV",
        /** Dogri */
        DOI = "DOI",
        /** Dutch */
        NL = "NL",
        /** English */
        EN = "EN",
        /** Esperanto */
        EO = "EO",
        /** Estonian */
        ET = "ET",
        /** Ewe */
        EE = "EE",
        /** Filipino (Tagalog) */
        FIL = "FIL",
        /** Finnish */
        FI = "FI",
        /** French */
        FR = "FR",
        /** Frisian */
        FY = "FY",
        /** Galician */
        GL = "GL",
        /** Georgian */
        KA = "KA",
        /** German */
        DE = "DE",
        /** Greek */
        EL = "EL",
        /** Guarani */
        GN = "GN",
        /** Gujarati */
        GU = "GU",
        /** Haitian Creole */
        HT = "HT",
        /** Hausa */
        HA = "HA",
        /** Hawaiian */
        HAW = "HAW",
        /** Hebrew */
        HE = "HE",
        /** Hindi */
        HI = "HI",
        /** Hmong */
        HMN = "HMN",
        /** Hungarian */
        HU = "HU",
        /** Icelandic */
        IS = "IS",
        /** Igbo */
        IG = "IG",
        /** Ilocano */
        ILO = "ILO",
        /** Indonesian */
        ID = "ID",
        /** Irish */
        GA = "GA",
        /** Italian */
        IT = "IT",
        /** Japanese */
        JA = "JA",
        /** Javanese */
        JW = "JW",
        /** Kannada */
        KN = "KN",
        /** Kazakh */
        KK = "KK",
        /** Khmer */
        KM = "KM",
        /** Kinyarwanda */
        RW = "RW",
        /** Konkani */
        GOM = "GOM",
        /** Korean */
        KO = "KO",
        /** Krio */
        KRI = "KRI",
        /** Kurdish */
        KU = "KU",
        /** Kurdish (Sorani) */
        CKB = "CKB",
        /** Kyrgyz */
        KY = "KY",
        /** Lao */
        LO = "LO",
        /** Latin */
        LA = "LA",
        /** Latvian */
        LV = "LV",
        /** Lingala */
        LN = "LN",
        /** Lithuanian */
        LT = "LT",
        /** Luganda */
        LG = "LG",
        /** Luxembourgish */
        LB = "LB",
        /** Macedonian */
        MK = "MK",
        /** Maithili */
        MAI = "MAI",
        /** Malagasy */
        MG = "MG",
        /** Malay */
        MS = "MS",
        /** Malayalam */
        ML = "ML",
        /** Maltese */
        MT = "MT",
        /** Maori */
        MI = "MI",
        /** Marathi */
        MR = "MR",
        /** Mriteilon (Manipuri) */
        MNI_MTEI = "MNI_MTEI",
        /** Mizo */
        LUS = "LUS",
        /** Mongolian */
        MN = "MN",
        /** Myanmar (Burmese) */
        MY = "MY",
        /** Nepali */
        NE = "NE",
        /** Norwegian */
        NO = "NO",
        /** Nyanja (Chichewa) */
        NY = "NY",
        /** Odia (Oriya) */
        OR = "OR",
        /** Oromo */
        OM = "OM",
        /** Pashto */
        PS = "PS",
        /** Persian */
        FA = "FA",
        /** Polish */
        PL = "PL",
        /** Portuguese (Portugal, Brazil) */
        PT = "PT",
        /** Punjabi */
        PA = "PA",
        /** Quechua */
        QU = "QU",
        /** Romanian */
        RO = "RO",
        /** Russian */
        RU = "RU",
        /** Samoan */
        SM = "SM",
        /** Sanskrit */
        SA = "SA",
        /** Scots Gaelic */
        GD = "GD",
        /** Sepedi */
        NSO = "NSO",
        /** Serbian */
        SR = "SR",
        /** Sesotho */
        ST = "ST",
        /** Shona */
        SN = "SN",
        /** Sindhi */
        SD = "SD",
        /** Sinhala (Sinhalese) */
        SI = "SI",
        /** Slovak */
        SK = "SK",
        /** Slovenian */
        SL = "SL",
        /** Somali */
        SO = "SO",
        /** Spanish */
        ES = "ES",
        /** Sundanese */
        SU = "SU",
        /** Swahili */
        SW = "SW",
        /** Swedish */
        SV = "SV",
        /** Tagalog (Filipino) */
        TL = "TL",
        /** Tajik */
        TG = "TG",
        /** Tamil */
        TA = "TA",
        /** Tatar */
        TT = "TT",
        /** Telugu */
        TE = "TE",
        /** Thai */
        TH = "TH",
        /** Tigrinya */
        TI = "TI",
        /** Tsonga */
        TS = "TS",
        /** Turkish */
        TR = "TR",
        /** Turkmen */
        TK = "TK",
        /** Twi (Akan) */
        AK = "AK",
        /** Ukrainian */
        UK = "UK",
        /** Urdu */
        UR = "UR",
        /** Uyghur */
        UG = "UG",
        /** Uzbek */
        UZ = "UZ",
        /** Vietnamese */
        VI = "VI",
        /** Welsh */
        CY = "CY",
        /** Xhosa */
        XH = "XH",
        /** Yiddish */
        YI = "YI",
        /** Yoruba */
        YO = "YO",
        /** Zulu */
        ZU = "ZU"
    }
    interface MachineTranslateResponse {
        /** The translated content. */
        translatedContent?: TranslatableContent;
    }
    interface NotEnoughCreditsError {
        /** The number of credits required to translate the content in the request. */
        creditsRequired?: number;
    }
    interface TextTooLongError {
        /** The maximum length of text that can be translated. */
        maxLength?: number;
        /** The actual length of the text that was sent for translation. */
        actualLength?: number;
    }
    interface UnknownFormatError {
    }
    interface BulkMachineTranslateRequest {
        /** Language of the source text to translate. */
        sourceLanguage: SupportedLanguage;
        /** Language to translate text into. */
        targetLanguage: SupportedLanguage;
        /** The content to translate. */
        contentToTranslate?: TranslatableContent[];
    }
    interface BulkMachineTranslateResponse {
        /** List of results for each item in the bulk request. */
        results?: BulkTranslateResult[];
        /** Metadata for the overall bulk action, including success and failure counts. */
        bulkActionMetadata?: BulkActionMetadata;
    }
    interface BulkTranslateResult {
        /** Metadata for the individual item in the request. */
        itemMetadata?: ItemMetadata;
        /** The translated content. */
        item?: TranslatableContent;
    }
    interface ItemMetadata {
        /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
        _id?: string | null;
        /** Index of the item within the request array. Allows for correlation between request and response items. */
        originalIndex?: number;
        /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
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
        /** Number of items that were successfully processed. */
        totalSuccesses?: number;
        /** Number of items that couldn't be processed. */
        totalFailures?: number;
        /** Number of failures without details because detailed failure threshold was exceeded. */
        undetailedFailures?: number;
    }
    /**
     * Translates the text of a translatable unit of content from one supported language to another.
     *
     * The `translatedContent` object returns with the same `id` used for `contentToTranslate.id` but the text within the
     * content fields is replaced with the translated text. Note that Wix does not overwrite the original content object.
     * To retrieve the translated content later, make sure to store it separately.
     *
     * Only text content is translated, even if the content is `htmlContent` or `richContent`. Note that [collapsible text](https://support.wix.com/en/article/adding-and-setting-up-collapsible-text)
     * cannot be translated using this method.
     *
     * The translatable content must not exceed 5,000 characters. If this limit is exceeded, the method returns a `TEXT_TOO_LONG` error.
     * For `richContent`, the 5,000-character limit applies separately to each node in `richContent.nodes`.
     * The total translatable content may be more than 5,000 characters as long as no individual node surpasses this limit.
     * If any node exceeds 5,000 characters, the entire request fails.
     *
     * Each site has a [word credit](/machine-translation/introduction#terminology) balance, starting at 3,000 words.
     * Each successful translation request reduces the word credits by the number of words in `contentToTranslate`.
     * If the site does not have sufficient word credits to translate all of the text in the request, the request fails
     * with a `NOT_ENOUGH_CREDITS` error. Additional credits can be [purchased through the Dashboard](https://support.wix.com/en/article/wix-multilingual-auto-translating-your-site?tabs=Dashboard-5#purchasing-translation-packages).
     *
     * To translate up to 1,000 `translatableContent` units at once, use [Bulk Machine Translate](/machine-translation/bulk-machine-translate).
     * @param sourceLanguage - Language of the source text to translate.
     * @public
     * @documentationMaturity preview
     * @requiredField options
     * @requiredField options.contentToTranslate
     * @requiredField options.targetLanguage
     * @requiredField sourceLanguage
     * @applicableIdentity VISITOR
     */
    function machineTranslate(sourceLanguage: SupportedLanguage, options: MachineTranslateOptions): Promise<MachineTranslateResponse>;
    interface MachineTranslateOptions {
        /** Language to translate text into. */
        targetLanguage: SupportedLanguage;
        /** The content to translate. */
        contentToTranslate: TranslatableContent;
    }
    /**
     * Translates the text of multiple units of translatable content from one supported language to another.
     *
     * Each translated content item in the `results` array returns with the same `id` as the corresponding `contentToTranslate.id`, but with the text in the
     * content fields replaced with the translated text. Note that Wix does not overwrite the original content source,
     * to retrieve the translated content later, make sure to store it separately.
     *
     * Only text content is translated, even if the content is `htmlContent` or `richContent`. Note that [collapsible text](https://support.wix.com/en/article/adding-and-setting-up-collapsible-text)
     * cannot be translated using this method.
     *
     * Each unit of translatable content must not exceed 5,000 characters. If this limit is exceeded, the method returns a `TEXT_TOO_LONG` error.
     * For `richContent`, the 5,000-character limit applies separately to each node in `richContent.nodes`.
     * The total request may exceed 5,000 characters as long as no individual node surpasses this limit.
     * If any node exceeds 5,000 characters, then the request fails for that specific `contentToTranslate` item and the error details for that
     * error are returned in `itemMetadata`. Even if some translations fail due to the character limit,
     * the machine translation for other items will succeed if they are under the character limit.
     *
     * Each site has a [word credit](/machine-translation/introduction#terminology) balance, starting at 3,000 words.
     * Each successful translation request reduces the word credits by the number of words included in `contentToTranslate`.
     * If the site does not have sufficient word credits to complete the translation, then the entire request fails
     * with a `NOT_ENOUGH_CREDITS` error. Additional credits can be [purchased through the Dashboard](https://support.wix.com/en/article/wix-multilingual-auto-translating-your-site?tabs=Dashboard-5#purchasing-translation-packages).
     *
     * To translate a single unit of `translatableContent`, use [Machine Translate](/machine-translation/machine-translate).
     * @param sourceLanguage - Language of the source text to translate.
     * @public
     * @documentationMaturity preview
     * @requiredField options.targetLanguage
     * @requiredField sourceLanguage
     * @applicableIdentity VISITOR
     */
    function bulkMachineTranslate(sourceLanguage: SupportedLanguage, options?: BulkMachineTranslateOptions): Promise<BulkMachineTranslateResponse>;
    interface BulkMachineTranslateOptions {
        /** Language to translate text into. */
        targetLanguage: SupportedLanguage;
        /** The content to translate. */
        contentToTranslate?: TranslatableContent[];
    }
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TranslatableContent = TranslatableContent;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TranslatableContentContentOneOf = TranslatableContentContentOneOf;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Format = Format;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Format: typeof Format;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_RichContent = RichContent;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Node = Node;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_NodeDataOneOf = NodeDataOneOf;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_NodeType = NodeType;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_NodeType: typeof NodeType;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_NodeStyle = NodeStyle;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ButtonData = ButtonData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Border = Border;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Colors = Colors;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PluginContainerData = PluginContainerData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_WidthType = WidthType;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_WidthType: typeof WidthType;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PluginContainerDataWidth = PluginContainerDataWidth;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PluginContainerDataWidthDataOneOf = PluginContainerDataWidthDataOneOf;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PluginContainerDataAlignment = PluginContainerDataAlignment;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PluginContainerDataAlignment: typeof PluginContainerDataAlignment;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Spoiler = Spoiler;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Height = Height;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Type = Type;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Type: typeof Type;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Styles = Styles;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Link = Link;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_LinkDataOneOf = LinkDataOneOf;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Target = Target;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Target: typeof Target;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Rel = Rel;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_CodeBlockData = CodeBlockData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TextStyle = TextStyle;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TextAlignment = TextAlignment;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TextAlignment: typeof TextAlignment;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_DividerData = DividerData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_LineStyle = LineStyle;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_LineStyle: typeof LineStyle;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Width = Width;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Width: typeof Width;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Alignment = Alignment;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Alignment: typeof Alignment;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_FileData = FileData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ViewMode = ViewMode;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ViewMode: typeof ViewMode;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_FileSource = FileSource;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_FileSourceDataOneOf = FileSourceDataOneOf;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PDFSettings = PDFSettings;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_GalleryData = GalleryData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Media = Media;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Image = Image;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Video = Video;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Item = Item;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ItemDataOneOf = ItemDataOneOf;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_GalleryOptions = GalleryOptions;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_LayoutType = LayoutType;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_LayoutType: typeof LayoutType;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Orientation = Orientation;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Orientation: typeof Orientation;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Crop = Crop;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Crop: typeof Crop;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ThumbnailsAlignment = ThumbnailsAlignment;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ThumbnailsAlignment: typeof ThumbnailsAlignment;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Layout = Layout;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ItemStyle = ItemStyle;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Thumbnails = Thumbnails;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_GIFData = GIFData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_GIF = GIF;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_HeadingData = HeadingData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_HTMLData = HTMLData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_HTMLDataDataOneOf = HTMLDataDataOneOf;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Source = Source;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Source: typeof Source;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ImageData = ImageData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_LinkPreviewData = LinkPreviewData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_MapData = MapData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_MapSettings = MapSettings;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_MapType = MapType;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_MapType: typeof MapType;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ParagraphData = ParagraphData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PollData = PollData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ViewRole = ViewRole;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ViewRole: typeof ViewRole;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_VoteRole = VoteRole;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_VoteRole: typeof VoteRole;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Permissions = Permissions;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Option = Option;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Settings = Settings;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PollLayoutType = PollLayoutType;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PollLayoutType: typeof PollLayoutType;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PollLayoutDirection = PollLayoutDirection;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PollLayoutDirection: typeof PollLayoutDirection;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PollLayout = PollLayout;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_OptionLayout = OptionLayout;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BackgroundType = BackgroundType;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BackgroundType: typeof BackgroundType;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Gradient = Gradient;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Background = Background;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BackgroundBackgroundOneOf = BackgroundBackgroundOneOf;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PollDesign = PollDesign;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_OptionDesign = OptionDesign;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Poll = Poll;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PollDataLayout = PollDataLayout;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Design = Design;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TextData = TextData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Decoration = Decoration;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_DecorationDataOneOf = DecorationDataOneOf;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_DecorationType = DecorationType;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_DecorationType: typeof DecorationType;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_AnchorData = AnchorData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ColorData = ColorData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_LinkData = LinkData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_MentionData = MentionData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_FontSizeData = FontSizeData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_FontType = FontType;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_FontType: typeof FontType;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_SpoilerData = SpoilerData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_AppEmbedData = AppEmbedData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_AppEmbedDataAppDataOneOf = AppEmbedDataAppDataOneOf;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_AppType = AppType;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_AppType: typeof AppType;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BookingData = BookingData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_EventData = EventData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_VideoData = VideoData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PlaybackOptions = PlaybackOptions;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_EmbedData = EmbedData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Oembed = Oembed;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_CollapsibleListData = CollapsibleListData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_InitialExpandedItems = InitialExpandedItems;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_InitialExpandedItems: typeof InitialExpandedItems;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Direction = Direction;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Direction: typeof Direction;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TableData = TableData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Dimensions = Dimensions;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TableCellData = TableCellData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_VerticalAlignment = VerticalAlignment;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_VerticalAlignment: typeof VerticalAlignment;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_CellStyle = CellStyle;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BorderColors = BorderColors;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_NullValue = NullValue;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_NullValue: typeof NullValue;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ListValue = ListValue;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_AudioData = AudioData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_OrderedListData = OrderedListData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BulletedListData = BulletedListData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BlockquoteData = BlockquoteData;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Metadata = Metadata;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_DocumentStyle = DocumentStyle;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TextNodeStyle = TextNodeStyle;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_MachineTranslateRequest = MachineTranslateRequest;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_SupportedLanguage = SupportedLanguage;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_SupportedLanguage: typeof SupportedLanguage;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_MachineTranslateResponse = MachineTranslateResponse;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_NotEnoughCreditsError = NotEnoughCreditsError;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TextTooLongError = TextTooLongError;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_UnknownFormatError = UnknownFormatError;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BulkMachineTranslateRequest = BulkMachineTranslateRequest;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BulkMachineTranslateResponse = BulkMachineTranslateResponse;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BulkTranslateResult = BulkTranslateResult;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ItemMetadata = ItemMetadata;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ApplicationError = ApplicationError;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BulkActionMetadata = BulkActionMetadata;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_machineTranslate: typeof machineTranslate;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_MachineTranslateOptions = MachineTranslateOptions;
    const multilingualMachineV3TranslatableContentMachineTranslation_universal_d_bulkMachineTranslate: typeof bulkMachineTranslate;
    type multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BulkMachineTranslateOptions = BulkMachineTranslateOptions;
    namespace multilingualMachineV3TranslatableContentMachineTranslation_universal_d {
        export { multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TranslatableContent as TranslatableContent, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TranslatableContentContentOneOf as TranslatableContentContentOneOf, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Format as Format, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_RichContent as RichContent, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Node as Node, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_NodeDataOneOf as NodeDataOneOf, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_NodeType as NodeType, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_NodeStyle as NodeStyle, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ButtonData as ButtonData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Border as Border, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Colors as Colors, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PluginContainerData as PluginContainerData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_WidthType as WidthType, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PluginContainerDataWidth as PluginContainerDataWidth, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PluginContainerDataWidthDataOneOf as PluginContainerDataWidthDataOneOf, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PluginContainerDataAlignment as PluginContainerDataAlignment, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Spoiler as Spoiler, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Height as Height, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Type as Type, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Styles as Styles, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Link as Link, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_LinkDataOneOf as LinkDataOneOf, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Target as Target, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Rel as Rel, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_CodeBlockData as CodeBlockData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TextStyle as TextStyle, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TextAlignment as TextAlignment, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_DividerData as DividerData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_LineStyle as LineStyle, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Width as Width, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Alignment as Alignment, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_FileData as FileData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ViewMode as ViewMode, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_FileSource as FileSource, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_FileSourceDataOneOf as FileSourceDataOneOf, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PDFSettings as PDFSettings, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_GalleryData as GalleryData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Media as Media, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Image as Image, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Video as Video, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Item as Item, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ItemDataOneOf as ItemDataOneOf, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_GalleryOptions as GalleryOptions, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_LayoutType as LayoutType, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Orientation as Orientation, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Crop as Crop, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ThumbnailsAlignment as ThumbnailsAlignment, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Layout as Layout, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ItemStyle as ItemStyle, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Thumbnails as Thumbnails, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_GIFData as GIFData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_GIF as GIF, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_HeadingData as HeadingData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_HTMLData as HTMLData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_HTMLDataDataOneOf as HTMLDataDataOneOf, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Source as Source, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ImageData as ImageData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_LinkPreviewData as LinkPreviewData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_MapData as MapData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_MapSettings as MapSettings, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_MapType as MapType, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ParagraphData as ParagraphData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PollData as PollData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ViewRole as ViewRole, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_VoteRole as VoteRole, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Permissions as Permissions, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Option as Option, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Settings as Settings, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PollLayoutType as PollLayoutType, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PollLayoutDirection as PollLayoutDirection, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PollLayout as PollLayout, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_OptionLayout as OptionLayout, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BackgroundType as BackgroundType, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Gradient as Gradient, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Background as Background, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BackgroundBackgroundOneOf as BackgroundBackgroundOneOf, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PollDesign as PollDesign, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_OptionDesign as OptionDesign, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Poll as Poll, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PollDataLayout as PollDataLayout, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Design as Design, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TextData as TextData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Decoration as Decoration, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_DecorationDataOneOf as DecorationDataOneOf, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_DecorationType as DecorationType, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_AnchorData as AnchorData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ColorData as ColorData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_LinkData as LinkData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_MentionData as MentionData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_FontSizeData as FontSizeData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_FontType as FontType, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_SpoilerData as SpoilerData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_AppEmbedData as AppEmbedData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_AppEmbedDataAppDataOneOf as AppEmbedDataAppDataOneOf, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_AppType as AppType, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BookingData as BookingData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_EventData as EventData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_VideoData as VideoData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_PlaybackOptions as PlaybackOptions, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_EmbedData as EmbedData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Oembed as Oembed, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_CollapsibleListData as CollapsibleListData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_InitialExpandedItems as InitialExpandedItems, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Direction as Direction, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TableData as TableData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Dimensions as Dimensions, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TableCellData as TableCellData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_VerticalAlignment as VerticalAlignment, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_CellStyle as CellStyle, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BorderColors as BorderColors, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_NullValue as NullValue, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ListValue as ListValue, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_AudioData as AudioData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_OrderedListData as OrderedListData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BulletedListData as BulletedListData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BlockquoteData as BlockquoteData, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_Metadata as Metadata, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_DocumentStyle as DocumentStyle, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TextNodeStyle as TextNodeStyle, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_MachineTranslateRequest as MachineTranslateRequest, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_SupportedLanguage as SupportedLanguage, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_MachineTranslateResponse as MachineTranslateResponse, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_NotEnoughCreditsError as NotEnoughCreditsError, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_TextTooLongError as TextTooLongError, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_UnknownFormatError as UnknownFormatError, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BulkMachineTranslateRequest as BulkMachineTranslateRequest, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BulkMachineTranslateResponse as BulkMachineTranslateResponse, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BulkTranslateResult as BulkTranslateResult, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ItemMetadata as ItemMetadata, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_ApplicationError as ApplicationError, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BulkActionMetadata as BulkActionMetadata, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_machineTranslate as machineTranslate, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_MachineTranslateOptions as MachineTranslateOptions, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_bulkMachineTranslate as bulkMachineTranslate, multilingualMachineV3TranslatableContentMachineTranslation_universal_d_BulkMachineTranslateOptions as BulkMachineTranslateOptions, };
    }
    export { multilingualMachineV3TranslatableContentMachineTranslation_universal_d as machineTranslation };
}
