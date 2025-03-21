import { Component, Input } from "@angular/core";
import { TemplateRef } from "@angular/core";

export interface SheetFooterItem {
	template: TemplateRef<unknown>;
}

@Component({
	selector: "app-sheet",
	templateUrl: "./sheet.component.html",
	styleUrls: [],
})
export class SheetComponent {
	@Input() footerItems: SheetFooterItem[] = [];
}
