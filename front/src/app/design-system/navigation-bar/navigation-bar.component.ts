import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Link } from "../../core/models/link.model";
import { AuthService } from "../../core/services/auth.service";

/**
 * Interface for navigation links with path and label
 */
export interface NavLink {
	path: string;
	label: string;
}

@Component({
	selector: "app-navigation-bar",
	templateUrl: "./navigation-bar.component.html",
	styleUrls: [],
})
export class NavigationBarComponent {
	@Input() links: NavLink[] = [];
	@Output() logoutEvent = new EventEmitter<void>();

	constructor(
		private router: Router,
		private authService: AuthService,
	) {}

	isActive(path: string): boolean {
		return this.router.url === path;
	}

	logout(): void {
		this.authService.logout();
		this.logoutEvent.emit();
	}
}
