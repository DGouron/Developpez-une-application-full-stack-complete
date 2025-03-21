import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppConfig } from "../../core/config/app.config";
import { AuthService } from "../../core/services/auth.service";

interface User {
	id: string;
	name: string;
	email: string;
}

interface Subscription {
	id: number;
	themeId: number;
	themeTitle: string;
	themeDescription: string;
	createdAt: string;
	updatedAt: string;
}

@Component({
	selector: "app-account",
	templateUrl: "./account.component.html",
	styleUrls: [],
	standalone: false,
})
export class AccountComponent implements OnInit {
	profileForm: FormGroup;
	isLoading = false;
	showPassword = false;
	errorMessage = "";
	subscriptions: Subscription[] = [];
	isLoadingSubscriptions = false;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private http: HttpClient,
	) {
		this.profileForm = this.fb.group({
			username: ["", Validators.required],
			email: ["", [Validators.required, Validators.email]],
			password: [""],
		});
	}

	ngOnInit(): void {
		// Charger les données de l'utilisateur
		this.authService.currentUser$.subscribe((user: User | null) => {
			if (user) {
				this.profileForm.patchValue({
					username: user.name,
					email: user.email,
				});
				this.loadSubscriptions();
			}
		});
	}

	loadSubscriptions(): void {
		this.isLoadingSubscriptions = true;
		this.http
			.get<Subscription[]>(`${AppConfig.apiUrl}/subscriptions`)
			.subscribe({
				next: (subscriptions) => {
					this.subscriptions = subscriptions;
					this.isLoadingSubscriptions = false;
				},
				error: (error) => {
					console.error("Error loading subscriptions:", error);
					this.isLoadingSubscriptions = false;
				},
			});
	}

	unsubscribe(themeId: number): void {
		// Trouver l'abonnement par l'ID du thème
		const subscription = this.subscriptions.find(
			(sub) => sub.themeId === themeId,
		);

		if (subscription) {
			this.http
				.delete(`${AppConfig.apiUrl}/subscriptions/${subscription.id}`)
				.subscribe({
					next: () => {
						this.subscriptions = this.subscriptions.filter(
							(sub) => sub.themeId !== themeId,
						);
					},
					error: (error) => {
						console.error("Error unsubscribing:", error);
					},
				});
		} else {
			console.error("Subscription not found for theme ID:", themeId);
		}
	}

	togglePassword(): void {
		this.showPassword = !this.showPassword;
	}

	onSubmit(): void {
		if (this.profileForm.valid) {
			this.isLoading = true;
			this.errorMessage = "";

			const formData = {
				username: this.profileForm.value.username,
				email: this.profileForm.value.email,
				password: this.profileForm.value.password || undefined,
			};

			this.authService.updateProfile(formData).subscribe({
				next: () => {
					this.isLoading = false;
					this.profileForm.patchValue({ password: "" });
				},
				error: (error: HttpErrorResponse) => {
					this.isLoading = false;
					if (error.status === 401) {
						this.errorMessage =
							"Vous n'êtes pas autorisé à effectuer cette action";
					} else if (error.error?.message) {
						this.errorMessage = error.error.message;
					} else {
						this.errorMessage =
							"Une erreur est survenue lors de la mise à jour du profil";
					}
				},
			});
		}
	}

	logout(): void {
		this.authService.logout();
	}
}
