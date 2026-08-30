/// <reference path="..\masterPage\masterPage.d.ts" />
type PageElementsMap = MasterPageElementsMap & {
	"#successPopupLightboxController1": $w.AppController;
	"#lightbox1": $w.HiddenCollapsedElement;
	"#successPopup1": $w.IFrame;
	"#page1": $w.Page;
}