import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-menu-button",
	templateUrl: "./menu-button.component.html",
	styleUrls: ["./menu-button.component.css"],
})
export class MenuButtonComponent {
	isMenuOpen = false;

	constructor(private router: Router) {}

	toggleMenu(): void {
		this.isMenuOpen = !this.isMenuOpen;
	}

	closeMenu(): void {
		this.isMenuOpen = false;
	}

	onLogout(): void {
		this.closeMenu();
	}

	goToAccount(): void {
		this.router.navigate(["/account"]);
		this.closeMenu();
	}
}
