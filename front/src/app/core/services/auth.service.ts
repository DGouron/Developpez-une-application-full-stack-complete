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

interface User {
	id: string;
	name: string;
	email: string;
}

interface AuthResponse {
	token: string;
	userId: string;
}

interface ProfileUpdateRequest {
	username: string;
	email: string;
	password?: string;
}

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private readonly apiUrl = `${AppConfig.apiUrl}/auth`;
	private currentUserSubject = new BehaviorSubject<User | null>(null);
	private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
	private authStatusChecked = false;

	currentUser$ = this.currentUserSubject.asObservable();
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
					this.checkAuthStatus();
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
					this.checkAuthStatus();
				}),
			);
	}

	/**
	 * Updates the user's profile
	 * @param data ProfileUpdateRequest containing the new username, email, and password
	 * @returns Observable of User containing the updated user information
	 */
	updateProfile(data: ProfileUpdateRequest): Observable<User> {
		return this.http
			.post<User>(`${this.apiUrl}/profile`, data, { withCredentials: true })
			.pipe(
				tap((user) => {
					this.currentUserSubject.next(user);
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
					this.currentUserSubject.next(null);
					this.isAuthenticatedSubject.next(false);
					this.authStatusChecked = true;
					this.router.navigate(["/"]);
				},
				error: () => {
					// Even if the request fails, we log out the user on the client side
					this.currentUserSubject.next(null);
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
	checkAuthStatus(): void {
		this.http
			.get<User>(`${this.apiUrl}/profile`, { withCredentials: true })
			.subscribe({
				next: (user) => {
					this.currentUserSubject.next(user);
					this.isAuthenticatedSubject.next(true);
					this.authStatusChecked = true;
				},
				error: () => {
					this.currentUserSubject.next(null);
					this.isAuthenticatedSubject.next(false);
					this.authStatusChecked = true;
					this.router.navigate(["/login"]);
				},
			});
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
		return this.currentUser$.pipe(map((user) => user !== null));
	}
}
