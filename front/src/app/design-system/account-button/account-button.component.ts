import { Component, EventEmitter, Output } from "@angular/core";

@Component({
	selector: "app-account-button",
	templateUrl: "./account-button.component.html",
	styleUrls: [],
})
export class AccountButtonComponent {
	@Output() buttonClick = new EventEmitter<void>();

	onClick(): void {
		this.buttonClick.emit();
	}
}
