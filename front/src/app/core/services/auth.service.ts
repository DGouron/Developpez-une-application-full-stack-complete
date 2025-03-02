import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
	BehaviorSubject,
	Observable,
	catchError,
	firstValueFrom,
	map,
	of,
	tap,
} from "rxjs";
import { AppConfig } from "../config/app.config";

interface AuthResponse {
	token: string;
	userId: string;
}

interface UserInfo {
	id: string;
	name: string;
	email: string;
}

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private readonly apiUrl = `${AppConfig.apiUrl}/auth`;
	private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
	private authStatusChecked = false;

	isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

	constructor(
		private http: HttpClient,
		private router: Router,
	) {
		// Vérifie si l'utilisateur est déjà authentifié lors de l'initialisation
		this.checkAuthStatus();
	}

	login(email: string, password: string): Observable<AuthResponse> {
		return this.http
			.post<AuthResponse>(
				`${this.apiUrl}/login`,
				{ email, password },
				{ withCredentials: true },
			)
			.pipe(
				tap(() => {
					this.isAuthenticatedSubject.next(true);
					this.authStatusChecked = true;
				}),
			);
	}

	register(
		name: string,
		email: string,
		password: string,
	): Observable<AuthResponse> {
		return this.http
			.post<AuthResponse>(
				`${this.apiUrl}/register`,
				{ name, email, password },
				{ withCredentials: true },
			)
			.pipe(
				tap(() => {
					this.isAuthenticatedSubject.next(true);
					this.authStatusChecked = true;
				}),
			);
	}

	logout(): void {
		// Appel au backend pour supprimer le cookie
		this.http
			.post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
			.subscribe({
				next: () => {
					this.isAuthenticatedSubject.next(false);
					this.authStatusChecked = true;
					this.router.navigate(["/"]);
				},
				error: () => {
					// Même en cas d'erreur, on déconnecte l'utilisateur côté client
					this.isAuthenticatedSubject.next(false);
					this.authStatusChecked = true;
					this.router.navigate(["/"]);
				},
			});
	}

	// Vérifie si l'utilisateur est authentifié en appelant une API sécurisée
	checkAuthStatus(): Observable<boolean> {
		// Si nous avons déjà vérifié le statut d'auth et que l'utilisateur est authentifié,
		// nous pouvons renvoyer l'état actuel sans appeler l'API à nouveau
		if (this.authStatusChecked) {
			return of(this.isAuthenticatedSubject.getValue());
		}

		// Sinon, nous appelons l'API pour vérifier l'authentification
		return this.http
			.get<UserInfo>(`${this.apiUrl}/me`, { withCredentials: true })
			.pipe(
				map(() => {
					this.isAuthenticatedSubject.next(true);
					this.authStatusChecked = true;
					return true;
				}),
				catchError(() => {
					this.isAuthenticatedSubject.next(false);
					this.authStatusChecked = true;
					return of(false);
				}),
			);
	}

	// Méthode synchrone pour vérifier rapidement l'état d'authentification
	isAuthenticated(): boolean {
		return this.isAuthenticatedSubject.getValue();
	}

	// Méthode asynchrone pour vérifier l'authentification (utile pour les Guards)
	isAuthenticatedAsync(): Observable<boolean> {
		return this.checkAuthStatus();
	}
}
