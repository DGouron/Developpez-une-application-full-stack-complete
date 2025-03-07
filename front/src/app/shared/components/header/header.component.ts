import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { NavLink } from "src/app/design-system/navigation-bar/navigation-bar.component";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
	@Input() navLinks: NavLink[] = [
		{ path: "/articles", label: "Articles" },
		{ path: "/themes", label: "Thèmes" },
	];

	@Output() menuClick = new EventEmitter<void>();

	constructor(private router: Router) {}

	onMenuClick(): void {
		this.menuClick.emit();
	}

	goToAccount(): void {
		this.router.navigate(["/account"]);
	}
}
