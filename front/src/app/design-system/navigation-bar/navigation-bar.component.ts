import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

export interface NavLink {
	path: string;
	label: string;
}

@Component({
	selector: "app-navigation-bar",
	templateUrl: "./navigation-bar.component.html",
	styleUrls: ["./navigation-bar.component.css"],
})
export class NavigationBarComponent implements OnInit {
	@Input() links: NavLink[] = [
		{ path: "/articles", label: "Articles" },
		{ path: "/themes", label: "Thèmes" },
	];

	constructor(private router: Router) {}

	ngOnInit(): void {}

	isActive(path: string): boolean {
		return this.router.url === path;
	}
}
