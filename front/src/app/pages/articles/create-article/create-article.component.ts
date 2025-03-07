import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AppConfig } from "../../../core/config/app.config";
import { DesignSystemModule } from "../../../design-system/design-system.module";
import { SharedModule } from "../../../shared/shared.module";

interface Theme {
	id: string;
	title: string;
}

/**
 * Component for creating new articles
 */
@Component({
	selector: "app-create-article",
	templateUrl: "./create-article.component.html",
	standalone: true,
	imports: [
		SharedModule,
		ReactiveFormsModule,
		CommonModule,
		DesignSystemModule,
	],
})
export class CreateArticleComponent implements OnInit {
	articleForm: FormGroup;
	themes: Theme[] = [];
	isLoading = false;

	constructor(
		private fb: FormBuilder,
		private http: HttpClient,
		private router: Router,
	) {
		this.articleForm = this.fb.group({
			themeId: ["", Validators.required],
			title: ["", Validators.required],
			content: ["", Validators.required],
		});
	}

	ngOnInit(): void {
		this.loadThemes();
	}

	loadThemes(): void {
		this.http.get<Theme[]>(`${AppConfig.apiUrl}/themes`).subscribe({
			next: (themes) => {
				this.themes = themes;
			},
			error: (error) => {
				console.error("Error loading themes:", error);
			},
		});
	}

	onSubmit(): void {
		if (this.articleForm.valid) {
			this.isLoading = true;
			this.http
				.post(`${AppConfig.apiUrl}/articles`, this.articleForm.value)
				.subscribe({
					next: () => {
						this.isLoading = false;
						this.router.navigate(["/articles"]);
					},
					error: (error) => {
						this.isLoading = false;
						console.error("Error creating article:", error);
					},
				});
		}
	}

	goBack(): void {
		this.router.navigate(["/articles"]);
	}
}
