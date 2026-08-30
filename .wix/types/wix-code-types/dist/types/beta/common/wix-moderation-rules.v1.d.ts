declare module "wix-moderation-rules.v1" {
  interface Rule {
      /**
       * Rule ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the rule is updated. To prevent conflicting changes, the existing revision must be used when updating a rule.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time when the rule was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time when the rule was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** The app and entity which the rule belongs to. For example, `comments/{BLOG_APP_ID}`. */
      namespace?: string;
      /** Rule name. */
      name?: string;
      /** Audience to which the rule applies. */
      audience?: Audience;
      /**
       * A condition that triggers the rule.
       *
       * **Note:** If you need to have several triggers for the same namespace, create separate rules.
       */
      trigger?: Trigger;
      /** List of site members or groups to whom the rule doesn't apply. */
      exemptions?: Exemptions;
      /** What action should be taken after the rule is triggered. */
      action?: Action;
      /** Whether the rule is enabled. */
      enabled?: boolean;
      /**
       * Custom field data for the rule object.
       *
       * **Note:** You must configure extended fields using schema plugin extensions in your app's dashboard before you can access the extended fields with API calls.
       */
      extendedFields?: ExtendedFields;
  }
  interface Audience extends AudienceOptionsOneOf {
      /**
       * Options for new members.
       *
       * **Note:** This object is relevant only when `type` is `NEW_MEMBERS`.
       */
      newMembersOptions?: NewMembersOptions;
      /** Audience type. */
      type?: AudienceType;
  }
  /** @oneof */
  interface AudienceOptionsOneOf {
      /**
       * Options for new members.
       *
       * **Note:** This object is relevant only when `type` is `NEW_MEMBERS`.
       */
      newMembersOptions?: NewMembersOptions;
  }
  enum AudienceType {
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      VISITORS = "VISITORS",
      MEMBERS = "MEMBERS",
      MEMBERS_AND_VISITORS = "MEMBERS_AND_VISITORS",
      NEW_MEMBERS = "NEW_MEMBERS"
  }
  interface NewMembersOptions {
      /** For how many hours the member is new. */
      durationInHours?: number | null;
  }
  interface Trigger extends TriggerOptionsOneOf {
      /** Options for the patterns trigger. */
      patternsOptions?: Patterns;
      /**
       * Keyword Presets
       *
       * Not implemented yet
       * @internal
       */
      keywordPresetsOptions?: KeywordPresets;
      /** Options for the content features trigger. */
      contentFeaturesOptions?: ContentFeatures;
      /** Options for the atrributes trigger. You can only have 1 attribute per rule. */
      attributeOptions?: TriggerAttribute;
      /** Trigger type. */
      type?: TriggerType;
  }
  /** @oneof */
  interface TriggerOptionsOneOf {
      /** Options for the patterns trigger. */
      patternsOptions?: Patterns;
      /**
       * Keyword Presets
       *
       * Not implemented yet
       * @internal
       */
      keywordPresetsOptions?: KeywordPresets;
      /** Options for the content features trigger. */
      contentFeaturesOptions?: ContentFeatures;
      /** Options for the atrributes trigger. You can only have 1 attribute per rule. */
      attributeOptions?: TriggerAttribute;
  }
  enum Preset {
      UNKNOWN_PRESET = "UNKNOWN_PRESET",
      PROFANITY = "PROFANITY",
      SLURS = "SLURS",
      NUDITY = "NUDITY"
  }
  enum TriggerType {
      /** Unknown trigger type. */
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      /** The trigger is a specific word or phrase. You can specify additional options in the `patternsOptions` object. */
      PATTERNS = "PATTERNS",
      KEYWORD_PRESETS = "KEYWORD_PRESETS",
      /** The rule is triggered when non-textual features, such as videos, images, links, and attachments, exist in the content. You can specify additional options in the `contentFeaturesOptions` object. */
      CONTENT_FEATURES = "CONTENT_FEATURES",
      /** A custom trigger based on an attribute and its value. For example, if you'd like to check all reviews with a low rating, then `name` would be `rating`, and `values` would be `[1, 2]`. You can specify additional options in the `patternsOptions` object. */
      ATTRIBUTE = "ATTRIBUTE",
      /** There is no specific trigger. The rule is triggered whenever new content is created or existing content is updated, with no other conditions required. */
      ALWAYS = "ALWAYS",
      /** The trigger checks content using a prompt algorithm. */
      SMART = "SMART"
  }
  interface Patterns {
      /**
       * List of words that can trigger a rule. The `*` wildcard can be used to match a partial word. For example:
       * - `spam`: Matches only "spam"
       * - `spam*`: Matches "spam", "spammer", "spammy"
       * - `*spam`: Matches "antispam", "multispam"
       * - `sp*m`: Matches "spim", "spam", "spum"
       */
      words?: string[];
      /** [Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions). */
      expressions?: string[];
  }
  interface KeywordPresets {
      /** Presets */
      presets?: Preset[];
  }
  interface ContentFeatures {
      /** Whether the content contains videos. */
      videos?: boolean;
      /** Whether the content contains images. */
      images?: boolean;
      /** Whether the content contains links. */
      links?: boolean;
      /** Whether the content contains attachments or files. */
      attachments?: boolean;
  }
  interface TriggerAttribute {
      /** Attribute name. */
      name?: string;
      /** Attribute values. */
      values?: string[];
  }
  interface Exemptions {
      /** List of member groups. */
      memberGroups?: string[];
      /** List of member IDs. */
      memberIds?: string[];
  }
  interface Action {
      /** Action type. */
      type?: Type;
  }
  enum Type {
      UNKNOWN_TYPE = "UNKNOWN_TYPE",
      /** Reject the content without any further review. */
      REJECT = "REJECT",
      /** Send the content for manual review. */
      NEEDS_MANUAL_APPROVAL = "NEEDS_MANUAL_APPROVAL"
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
  interface CreateRuleRequest {
      /** Rule info. */
      rule: Rule;
  }
  interface CreateRuleResponse {
      /** Created rule. */
      rule?: Rule;
  }
  interface GetRuleRequest {
      /** Rule ID. */
      ruleId: string;
  }
  interface GetRuleResponse {
      /** Requested rule. */
      rule?: Rule;
  }
  interface UpdateRuleRequest {
      /** Rule to update. */
      rule: Rule;
      /**
       * Set of specific fields to update. Other fields not included in the object are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateRuleResponse {
      /** Updated rule. */
      rule?: Rule;
  }
  interface DeleteRuleRequest {
      /** ID of the rule to delete. */
      ruleId: string;
  }
  interface DeleteRuleResponse {
  }
  interface QueryRulesRequest {
      /** Query options. See [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language) for more details. */
      query?: CursorQuery;
  }
  interface CursorQuery extends CursorQueryPagingMethodOneOf {
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
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
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
  interface CursorPaging {
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
  interface QueryRulesResponse {
      /** List of rules. */
      rules?: Rule[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata;
  }
  interface CursorPagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
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
  interface CheckContentRequest {
      /** Namespace value. */
      namespace?: string;
      /** Content to check. */
      content?: ModerationContent;
  }
  /** Content that can be moderated */
  interface ModerationContent extends ModerationContentContentOneOf {
      /**
       * Content is in the rich content format.
       *
       * **Note:** Only applicable when `trigger`` is the `CONTENT_FEATURES` and `PATTERNS` type.
       */
      richContent?: RichContent;
      /**
       * Content is plain text.
       *
       * **Note:** Only applicable when `trigger`` is the `PATTERNS` type.
       */
      plainText?: string | null;
      /**
       * Content attributes. For example, if you'd like to check all reviews with a low rating, then `name` would be `rating`, and `values` would be `[1, 2]`.
       *
       * **Note:** Only applicable when `trigger`` is the `ATTRIBUTE` type.
       */
      attributes?: Attribute[];
      /**
       * Ability to override member id.
       * If not provided will be automatically resolved if possible
       *
       * Not Implemented
       * @internal
       */
      memberId?: string | null;
      /**
       * Ability to override member groups.
       * If not provided will be automatically resolved if possible
       *
       * Not Implemented
       * @internal
       */
      memberGroups?: string[] | null;
  }
  /** @oneof */
  interface ModerationContentContentOneOf {
      /**
       * Content is in the rich content format.
       *
       * **Note:** Only applicable when `trigger`` is the `CONTENT_FEATURES` and `PATTERNS` type.
       */
      richContent?: RichContent;
      /**
       * Content is plain text.
       *
       * **Note:** Only applicable when `trigger`` is the `PATTERNS` type.
       */
      plainText?: string | null;
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
      /** Data for a caption node. */
      captionData?: CaptionData;
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
      /** Data for a caption node. */
      captionData?: CaptionData;
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
      AUDIO = "AUDIO",
      CAPTION = "CAPTION"
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
      type?: ButtonDataType;
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
  enum ButtonDataType {
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
      /**
       * Use `sizeInKb` instead.
       * @deprecated
       */
      size?: number | null;
      /** Settings for PDF files. */
      pdfSettings?: PDFSettings;
      /** File MIME type. */
      mimeType?: string | null;
      /** File path. */
      path?: string | null;
      /** File size in KB. */
      sizeInKb?: string | null;
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
      /**
       * Deprecated: use Caption node instead.
       * @deprecated
       */
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
      /** List start number. */
      start?: number | null;
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
  interface CaptionData {
      textStyle?: TextStyle;
  }
  interface Metadata {
      /** Schema version. */
      version?: number;
      /**
       * When the object was created.
       * @readonly
       * @deprecated
       */
      createdTimestamp?: Date | null;
      /**
       * When the object was most recently updated.
       * @deprecated
       */
      updatedTimestamp?: Date | null;
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
  /** Attribute */
  interface Attribute {
      /** Attribute Name */
      name?: string;
      /** Attribute Value */
      value?: string;
  }
  interface CheckContentResponse {
      /** Rule violation details. */
      violations?: Violation[];
  }
  interface Violation {
      /** Rule ID. */
      ruleId?: string;
      /** Action to take. */
      action?: Action;
  }
  interface SubmitContentCheckRequest {
      /** Namespace */
      namespace: string;
      /** Content */
      content: ModerationContent;
      /** Unique identifier of the content entity being referenced. */
      contentEntityId: string;
      /** Identifies the specific revision of the content entity being referenced. */
      contentRevision?: string | null;
  }
  interface SubmitContentCheckResponse {
  }
  /** ContentViolationReport encapsulates information about violations found in the content during a content check operation. */
  interface ContentViolationReport {
      /** Namespace */
      namespace?: string;
      /** Unique identifier of the content entity being referenced. */
      contentEntityId?: string;
      /** Violations */
      violations?: Violation[];
      /** Identifies the specific revision of the content entity being referenced. */
      contentRevision?: string | null;
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
   * Creates a rule.
   * You can create up to 20 rules per namespace.
   * @param rule - Rule info.
   * @public
   * @documentationMaturity preview
   * @requiredField rule
   * @requiredField rule.action
   * @requiredField rule.audience
   * @requiredField rule.namespace
   * @requiredField rule.trigger
   * @permissionId MODERATION.RULE_CREATE
   * @adminMethod
   * @returns Created rule.
   */
  function createRule(rule: Rule): Promise<Rule>;
  /**
   * Retrieves a rule by ID.
   * @param ruleId - Rule ID.
   * @public
   * @documentationMaturity preview
   * @requiredField ruleId
   * @permissionId MODERATION.RULE_READ
   * @adminMethod
   * @returns Requested rule.
   */
  function getRule(ruleId: string): Promise<Rule>;
  /**
   * Updates a rule.
   *
   * Each time the rule is updated, revision increments by 1. The existing revision must be included when updating the rule. This ensures you're working with the latest rule and prevents unintended overwrites.
   * @param _id - Rule ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField rule
   * @requiredField rule.revision
   * @permissionId MODERATION.RULE_UPDATE
   * @adminMethod
   * @returns Updated rule.
   */
  function updateRule(_id: string | null, rule: UpdateRule, options?: UpdateRuleOptions): Promise<Rule>;
  interface UpdateRule {
      /**
       * Rule ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the rule is updated. To prevent conflicting changes, the existing revision must be used when updating a rule.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time when the rule was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time when the rule was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** The app and entity which the rule belongs to. For example, `comments/{BLOG_APP_ID}`. */
      namespace?: string;
      /** Rule name. */
      name?: string;
      /** Audience to which the rule applies. */
      audience?: Audience;
      /**
       * A condition that triggers the rule.
       *
       * **Note:** If you need to have several triggers for the same namespace, create separate rules.
       */
      trigger?: Trigger;
      /** List of site members or groups to whom the rule doesn't apply. */
      exemptions?: Exemptions;
      /** What action should be taken after the rule is triggered. */
      action?: Action;
      /** Whether the rule is enabled. */
      enabled?: boolean;
      /**
       * Custom field data for the rule object.
       *
       * **Note:** You must configure extended fields using schema plugin extensions in your app's dashboard before you can access the extended fields with API calls.
       */
      extendedFields?: ExtendedFields;
  }
  interface UpdateRuleOptions {
      /**
       * Set of specific fields to update. Other fields not included in the object are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Permanently deletes a rule.
   * @param ruleId - ID of the rule to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField ruleId
   * @permissionId MODERATION.RULE_DELETE
   * @adminMethod
   */
  function deleteRule(ruleId: string): Promise<void>;
  /**
   * Retrieves a list of rules, given the provided paging, filtering, and sorting.
   *
   * - `createdDate` is sorted in `ASC` order
   * - `paging.limit` is `100`
   * - `paging.offset` is `0`
   *
   * Up to 1,000 rules can be returned per request.
   *
   * For field support for filters and sorting, see [Rules: Supported Filters and Sorting](https://dev.wix.com/docs/rest/crm/community/moderation-rules/filter-and-sort). To learn about working with *Query* endpoints, see [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language).
   * @public
   * @documentationMaturity preview
   * @permissionId MODERATION.RULE_READ
   * @adminMethod
   */
  function queryRules(): RulesQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface RulesQueryResult extends QueryCursorResult {
      items: Rule[];
      query: RulesQueryBuilder;
      next: () => Promise<RulesQueryResult>;
      prev: () => Promise<RulesQueryResult>;
  }
  interface RulesQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'namespace' | 'enabled', value: any) => RulesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'namespace' | 'enabled', value: any) => RulesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => RulesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => RulesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => RulesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => RulesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_createdDate' | '_updatedDate', value: any[]) => RulesQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'namespace', value: any) => RulesQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_createdDate' | '_updatedDate', value: boolean) => RulesQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_createdDate' | '_updatedDate'>) => RulesQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_createdDate' | '_updatedDate'>) => RulesQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => RulesQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => RulesQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<RulesQueryResult>;
  }
  /**
   * Checks the submitted content for any conditions that might trigger a rule, and then returns actions to take if the rule is triggered.
   * @public
   * @documentationMaturity preview
   * @permissionId MODERATION.RULE_CHECK_CONTENT
   * @adminMethod
   */
  function checkContent(options?: CheckContentOptions): Promise<CheckContentResponse>;
  interface CheckContentOptions {
      /** Namespace value. */
      namespace?: string;
      /** Content to check. */
      content?: ModerationContent;
  }
  /**
   * `SubmitContentCheck` initiates an asynchronous content check by queuing the provided content for processing.
   * This method triggers the application of active rules to the provided content, asynchronously scanning it for conditions that might trigger a violation.
   * Once the check is complete, it produces a ContentViolationReport event containing any violations found.
   * This asynchronous approach allows for non-blocking processing, suitable for scenarios where immediate responses are not required.
   * @param namespace - Namespace
   * @internal
   * @documentationMaturity preview
   * @requiredField namespace
   * @requiredField options.content
   * @requiredField options.contentEntityId
   * @permissionId MODERATION.RULE_CHECK_CONTENT
   * @adminMethod
   */
  function submitContentCheck(namespace: string, options?: SubmitContentCheckOptions): Promise<void>;
  interface SubmitContentCheckOptions {
      /** Content */
      content: ModerationContent;
      /** Unique identifier of the content entity being referenced. */
      contentEntityId: string;
      /** Identifies the specific revision of the content entity being referenced. */
      contentRevision?: string | null;
  }
  
  export { Action, ActionEvent, Alignment, AnchorData, AppEmbedData, AppEmbedDataAppDataOneOf, AppType, Attribute, Audience, AudienceOptionsOneOf, AudienceType, AudioData, Background, BackgroundBackgroundOneOf, BackgroundType, BlockquoteData, BookingData, Border, BorderColors, BulletedListData, ButtonData, ButtonDataType, CaptionData, CellStyle, CheckContentOptions, CheckContentRequest, CheckContentResponse, CodeBlockData, CollapsibleListData, ColorData, Colors, ContentFeatures, ContentViolationReport, CreateRuleRequest, CreateRuleResponse, Crop, CursorPaging, CursorPagingMetadata, CursorQuery, CursorQueryPagingMethodOneOf, Cursors, Decoration, DecorationDataOneOf, DecorationType, DeleteRuleRequest, DeleteRuleResponse, Design, Dimensions, Direction, DividerData, DocumentStyle, DomainEvent, DomainEventBodyOneOf, EmbedData, EntityCreatedEvent, EntityDeletedEvent, EntityUpdatedEvent, EventData, Exemptions, ExtendedFields, FileData, FileSource, FileSourceDataOneOf, FontSizeData, FontType, GIF, GIFData, GalleryData, GalleryOptions, GetRuleRequest, GetRuleResponse, Gradient, HTMLData, HTMLDataDataOneOf, HeadingData, Height, IdentificationData, IdentificationDataIdOneOf, Image, ImageData, InitialExpandedItems, Item, ItemDataOneOf, ItemStyle, KeywordPresets, Layout, LayoutType, LineStyle, Link, LinkData, LinkDataOneOf, LinkPreviewData, ListValue, MapData, MapSettings, MapType, Media, MentionData, MessageEnvelope, Metadata, ModerationContent, ModerationContentContentOneOf, NewMembersOptions, Node, NodeDataOneOf, NodeStyle, NodeType, NullValue, Oembed, Option, OptionDesign, OptionLayout, OrderedListData, Orientation, PDFSettings, ParagraphData, Patterns, Permissions, PlaybackOptions, PluginContainerData, PluginContainerDataAlignment, PluginContainerDataWidth, PluginContainerDataWidthDataOneOf, Poll, PollData, PollDataLayout, PollDesign, PollLayout, PollLayoutDirection, PollLayoutType, Preset, QueryRulesRequest, QueryRulesResponse, Rel, RestoreInfo, RichContent, Rule, RulesQueryBuilder, RulesQueryResult, Settings, SortOrder, Sorting, Source, Spoiler, SpoilerData, Styles, SubmitContentCheckOptions, SubmitContentCheckRequest, SubmitContentCheckResponse, TableCellData, TableData, Target, TextAlignment, TextData, TextNodeStyle, TextStyle, Thumbnails, ThumbnailsAlignment, Trigger, TriggerAttribute, TriggerOptionsOneOf, TriggerType, Type, UpdateRule, UpdateRuleOptions, UpdateRuleRequest, UpdateRuleResponse, VerticalAlignment, Video, VideoData, ViewMode, ViewRole, Violation, VoteRole, WebhookIdentityType, Width, WidthType, checkContent, createRule, deleteRule, getRule, queryRules, submitContentCheck, updateRule };
}
