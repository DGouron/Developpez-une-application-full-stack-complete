import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
	selector: "app-protected-layout",
	templateUrl: "./protected-layout.component.html",
	styleUrls: [],
})
export class ProtectedLayoutComponent implements OnInit {
	menuOpen = false;

	constructor(
		private authService: AuthService,
		private router: Router,
	) {}

	ngOnInit(): void {
		// Vérifier si l'utilisateur est authentifié en utilisant la méthode asynchrone
		this.authService.isAuthenticatedAsync().subscribe((isAuthenticated) => {
			if (!isAuthenticated) {
				this.router.navigate(["/"]);
			}
		});
	}

	toggleMenu(): void {
		this.menuOpen = !this.menuOpen;
		// Ici, vous pouvez ajouter la logique pour afficher un menu latéral ou un dropdown
		console.log("Menu toggled:", this.menuOpen);
	}

	logout(): void {
		this.authService.logout();
		// La redirection est déjà gérée dans le service AuthService
	}
}
