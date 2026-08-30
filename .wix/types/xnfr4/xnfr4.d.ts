/// <reference path="..\masterPage\masterPage.d.ts" />
type PageElementsMap = MasterPageElementsMap & {
	"#section1": $w.Section;
	"#htmlWidgetCustomService": $w.HtmlComponent;
	"#page1": $w.Page;
}