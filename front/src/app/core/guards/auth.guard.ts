import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable, catchError, map, of, switchMap, take, tap } from "rxjs";
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
		// Force a check of authentication status
		return this.authService.isAuthenticated$.pipe(
			take(1),
			switchMap((isAuthenticated) => {
				// If already authenticated, allow access
				if (isAuthenticated) {
					return of(true);
				}

				// Otherwise, try to refresh authentication status
				return this.authService.refreshAuthStatus().pipe(
					map((isAuthenticated) => {
						if (isAuthenticated) {
							return true;
						}
						// Redirect to login if not authenticated
						return this.router.createUrlTree(["/login"]);
					}),
					catchError(() => {
						// In case of error, redirect to login
						return of(this.router.createUrlTree(["/login"]));
					}),
				);
			}),
		);
	}
}
