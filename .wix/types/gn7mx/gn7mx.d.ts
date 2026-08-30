/// <reference path="..\masterPage\masterPage.d.ts" />
type PageElementsMap = MasterPageElementsMap & {
	"#section1": $w.Section;
	"#htmlAdmin": $w.HtmlComponent;
	"#page1": $w.Page;
}