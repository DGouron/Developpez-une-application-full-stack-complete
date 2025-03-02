import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
	selector: "app-account",
	templateUrl: "./account.component.html",
	styleUrls: ["./account.component.css"],
})
export class AccountComponent implements OnInit {
	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		// Vérifier l'état d'authentification
		this.authService.checkAuthStatus();
	}

	logout(): void {
		this.authService.logout();
	}
}
