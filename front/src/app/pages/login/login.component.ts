import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styles: [],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	errorMessage = "";
	isLoading = false;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private http: HttpClient,
	) {
		this.loginForm = this.fb.group({
			email: ["", Validators.required],
			password: ["", Validators.required],
		});
	}

	ngOnInit(): void {}

	// Méthode pour vérifier si un champ est invalide
	isFieldInvalid(fieldName: string): boolean {
		const field = this.loginForm.get(fieldName);
		return field ? field.invalid && field.touched : false;
	}

	// Méthode pour obtenir le message d'erreur pour un champ
	getErrorMessage(fieldName: string): string {
		const field = this.loginForm.get(fieldName);
		if (field?.errors && "required" in field.errors) {
			return "Ce champ est requis";
		}
		return "";
	}

	onSubmit(): void {
		if (this.loginForm.valid) {
			this.isLoading = true;
			this.errorMessage = "";

			const credentials = {
				email: this.loginForm.value.email,
				password: this.loginForm.value.password,
			};

			this.http
				.post("http://localhost:3002/api/auth/login", credentials)
				.subscribe({
					next: (response) => {
						this.isLoading = false;
						// Ici, vous pourriez stocker le token d'authentification
						// et rediriger l'utilisateur vers la page principale
						this.router.navigate(["/"]);
					},
					error: (error: HttpErrorResponse) => {
						this.isLoading = false;
						if (error.error?.message) {
							this.errorMessage = error.error.message;
						} else {
							this.errorMessage =
								"Une erreur est survenue lors de la connexion. Veuillez réessayer.";
						}
					},
				});
		}
	}
}
