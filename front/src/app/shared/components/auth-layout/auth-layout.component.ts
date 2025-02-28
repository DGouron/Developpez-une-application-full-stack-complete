import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-auth-layout",
	templateUrl: "./auth-layout.component.html",
	styles: [],
})
export class AuthLayoutComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit(): void {}

	goToHome(): void {
		this.router.navigate(["/"]);
	}
}
