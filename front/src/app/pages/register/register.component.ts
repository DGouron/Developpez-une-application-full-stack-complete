import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	ValidationErrors,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styles: [],
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	errorMessage = "";
	isLoading = false;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private http: HttpClient,
	) {
		this.registerForm = this.fb.group({
			name: ["", Validators.required],
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required, this.passwordValidator]],
		});
	}

	ngOnInit(): void {}

	// Méthode pour vérifier si un champ est invalide
	isFieldInvalid(fieldName: string): boolean {
		const field = this.registerForm.get(fieldName);
		return field ? field.invalid && field.touched : false;
	}

	// Méthode pour obtenir le message d'erreur pour l'email
	getEmailErrorMessage(): string {
		const emailControl = this.registerForm.get("email");
		if (emailControl?.errors && "required" in emailControl.errors) {
			return "Ce champ est requis";
		}
		if (emailControl?.errors && "email" in emailControl.errors) {
			return "Veuillez entrer une adresse e-mail valide";
		}
		return "";
	}

	// Méthode pour obtenir le message d'erreur pour un champ
	getErrorMessage(fieldName: string): string {
		const field = this.registerForm.get(fieldName);
		if (field?.errors && "required" in field.errors) {
			return "Ce champ est requis";
		}
		return "";
	}

	// Méthode pour obtenir le message d'erreur pour le mot de passe
	getPasswordErrorMessage(): string {
		const passwordControl = this.registerForm.get("password");
		if (passwordControl?.errors) {
			if ("passwordRequirements" in passwordControl.errors) {
				return "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial";
			}
			if ("required" in passwordControl.errors) {
				return "Ce champ est requis";
			}
		}
		return "";
	}

	// Validateur personnalisé pour le mot de passe
	passwordValidator(control: AbstractControl): ValidationErrors | null {
		const value = control.value;

		if (!value) {
			return null;
		}

		const hasMinLength = value.length >= 8;
		const hasNumber = /[0-9]/.test(value);
		const hasLowerCase = /[a-z]/.test(value);
		const hasUpperCase = /[A-Z]/.test(value);
		const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

		const passwordValid =
			hasMinLength &&
			hasNumber &&
			hasLowerCase &&
			hasUpperCase &&
			hasSpecialChar;

		return passwordValid
			? null
			: {
					passwordRequirements: {
						hasMinLength,
						hasNumber,
						hasLowerCase,
						hasUpperCase,
						hasSpecialChar,
					},
				};
	}

	onSubmit(): void {
		if (this.registerForm.valid) {
			this.isLoading = true;
			this.errorMessage = "";

			const userData = {
				name: this.registerForm.value.name,
				email: this.registerForm.value.email,
				password: this.registerForm.value.password,
			};

			this.http
				.post("http://localhost:3002/api/auth/register", userData)
				.subscribe({
					next: () => {
						// Si l'inscription réussit, connecter l'utilisateur
						this.loginUser(userData.email, userData.password);
					},
					error: (error: HttpErrorResponse) => {
						this.isLoading = false;
						if (error.error?.message) {
							this.errorMessage = error.error.message;
						} else {
							this.errorMessage =
								"Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
						}
					},
				});
		}
	}

	loginUser(email: string, password: string): void {
		const credentials = {
			email: email,
			password: password,
		};

		this.http
			.post("http://localhost:3002/api/auth/login", credentials)
			.subscribe({
				next: (response) => {
					this.isLoading = false;
					// Rediriger l'utilisateur vers la page principale après connexion
					this.router.navigate(["/"]);
				},
				error: (error: HttpErrorResponse) => {
					this.isLoading = false;
					if (error.error?.message) {
						this.errorMessage = `Inscription réussie mais échec de connexion : ${error.error.message}`;
					} else {
						this.errorMessage =
							"Inscription réussie mais échec de connexion. Veuillez vous connecter manuellement.";
					}
				},
			});
	}
}
