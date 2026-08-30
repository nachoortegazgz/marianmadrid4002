/// <reference path="..\masterPage\masterPage.d.ts" />
type PageElementsMap = MasterPageElementsMap & {
	"#blog1": $w.IFrame;
	"#page1": $w.Page;
	"#section1": $w.Section;
}