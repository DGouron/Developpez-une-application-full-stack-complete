import { Component } from "@angular/core";

@Component({
	selector: "app-menu-button",
	templateUrl: "./menu-button.component.html",
	styleUrls: ["./menu-button.component.css"],
})
export class MenuButtonComponent {
	isMenuOpen = false;

	toggleMenu(): void {
		this.isMenuOpen = !this.isMenuOpen;
	}

	closeMenu(): void {
		this.isMenuOpen = false;
	}

	onLogout(): void {
		this.closeMenu();
	}
}
