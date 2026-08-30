/// <reference path="..\masterPage\masterPage.d.ts" />
type PageElementsMap = MasterPageElementsMap & {
	"#section1": $w.Section;
	"#html1": $w.HtmlComponent;
	"#page1": $w.Page;
}