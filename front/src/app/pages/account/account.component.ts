import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";

@Component({
	selector: "app-account",
	templateUrl: "./account.component.html",
	styleUrls: ["./account.component.css"],
})
export class AccountComponent implements OnInit {
	profileForm: FormGroup;
	isLoading = false;
	showPassword = false;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
	) {
		this.profileForm = this.fb.group({
			username: ["", Validators.required],
			email: ["", [Validators.required, Validators.email]],
			password: ["", Validators.required],
		});
	}

	ngOnInit(): void {
		// TODO: Charger les données de l'utilisateur quand l'API sera prête
	}

	togglePassword(): void {
		this.showPassword = !this.showPassword;
	}

	onSubmit(): void {
		if (this.profileForm.valid) {
			this.isLoading = true;
			// TODO: Implémenter la mise à jour du profil quand l'API sera prête
			console.log("Données du formulaire:", this.profileForm.value);
			this.isLoading = false;
		}
	}

	logout(): void {
		this.authService.logout();
	}
}
