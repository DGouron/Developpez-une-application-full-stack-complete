import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { AppConfig } from "../config/app.config";

interface AuthResponse {
	token: string;
	userId: string;
}

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private readonly apiUrl = `${AppConfig.apiUrl}/auth`;
	private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

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
					this.router.navigate(["/"]);
				},
				error: () => {
					// Même en cas d'erreur, on déconnecte l'utilisateur côté client
					this.isAuthenticatedSubject.next(false);
					this.router.navigate(["/"]);
				},
			});
	}

	// Vérifie si l'utilisateur est authentifié en appelant une API sécurisée
	checkAuthStatus(): void {
		this.http.get(`${this.apiUrl}/me`, { withCredentials: true }).subscribe({
			next: () => {
				this.isAuthenticatedSubject.next(true);
			},
			error: () => {
				this.isAuthenticatedSubject.next(false);
			},
		});
	}

	isAuthenticated(): boolean {
		return this.isAuthenticatedSubject.getValue();
	}
}
