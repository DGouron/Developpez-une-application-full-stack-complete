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
		// Check if user is already authenticated during initialization
		this.checkAuthStatus();
	}

	/**
	 * Authenticates a user with their email and password
	 * @param email User's email
	 * @param password User's password
	 * @returns Observable of AuthResponse containing token and userId
	 */
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

	/**
	 * Registers a new user
	 * @param name User's name
	 * @param email User's email
	 * @param password User's password
	 * @returns Observable of AuthResponse containing token and userId
	 */
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

	/**
	 * Logs out the current user by making a request to remove the cookie
	 * and updating the authentication state
	 */
	logout(): void {
		this.http
			.post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
			.subscribe({
				next: () => {
					this.isAuthenticatedSubject.next(false);
					this.authStatusChecked = true;
					this.router.navigate(["/"]);
				},
				error: () => {
					// Even if the request fails, we log out the user on the client side
					this.isAuthenticatedSubject.next(false);
					this.authStatusChecked = true;
					this.router.navigate(["/"]);
				},
			});
	}

	/**
	 * Checks if the user is authenticated by calling a secure API endpoint
	 * @returns Observable<boolean> indicating authentication status
	 */
	checkAuthStatus(): Observable<boolean> {
		// If we've already checked the auth status and the user is authenticated,
		// we can return the current state without calling the API again
		if (this.authStatusChecked) {
			return of(this.isAuthenticatedSubject.getValue());
		}

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

	/**
	 * Synchronously checks the current authentication state
	 * @returns boolean indicating if the user is currently authenticated
	 */
	isAuthenticated(): boolean {
		return this.isAuthenticatedSubject.getValue();
	}

	/**
	 * Asynchronously checks the authentication status (useful for Guards)
	 * @returns Observable<boolean> of the authentication status
	 */
	isAuthenticatedAsync(): Observable<boolean> {
		return this.checkAuthStatus();
	}
}
