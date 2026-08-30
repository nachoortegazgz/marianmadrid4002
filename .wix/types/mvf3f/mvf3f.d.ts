/// <reference path="..\masterPage\masterPage.d.ts" />
type PageElementsMap = MasterPageElementsMap & {
	"#section1": $w.Section;
	"#htmlOnlyStaff": $w.HtmlComponent;
	"#page1": $w.Page;
}