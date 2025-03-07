import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
	providedIn: "root",
})
export class AuthGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private router: Router,
	) {}

	canActivate():
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		// Utilisation de la méthode asynchrone pour attendre le résultat
		// de la vérification d'authentification
		return this.authService.isAuthenticatedAsync().pipe(
			map((isAuthenticated) => {
				if (isAuthenticated) {
					return true;
				}

				// Redirection vers la page d'accueil si non authentifié
				return this.router.createUrlTree(["/"]);
			}),
		);
	}
}
