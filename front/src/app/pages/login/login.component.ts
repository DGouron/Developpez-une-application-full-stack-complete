import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

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
		private authService: AuthService,
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

			const email = this.loginForm.value.email;
			const password = this.loginForm.value.password;

			this.authService.login(email, password).subscribe({
				next: () => {
					this.isLoading = false;
					// Rediriger vers la page des articles après connexion
					this.router.navigate(["/articles"]);
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
