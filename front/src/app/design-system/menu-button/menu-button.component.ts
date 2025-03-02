import { Component, EventEmitter, Output } from "@angular/core";

@Component({
	selector: "app-menu-button",
	templateUrl: "./menu-button.component.html",
	styleUrls: ["./menu-button.component.css"],
})
export class MenuButtonComponent {
	@Output() menuClick = new EventEmitter<void>();

	onMenuClick(): void {
		this.menuClick.emit();
	}
}
