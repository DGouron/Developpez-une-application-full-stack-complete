import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AppConfig } from "../../core/config/app.config";
import { ThemeCardComponent } from "../../shared/components/theme-card/theme-card.component";
import { SharedModule } from "../../shared/shared.module";

interface Theme {
	id: number;
	title: string;
	description: string;
}

interface Subscription {
	id: number;
	themeId: number;
	themeTitle: string;
	themeDescription: string;
	createdAt: string;
	updatedAt: string;
}

/**
 * Themes page component displaying available themes and user's subscriptions
 */
@Component({
	selector: "app-themes",
	standalone: true,
	imports: [CommonModule, ThemeCardComponent, SharedModule],
	templateUrl: "./themes.component.html",
})
export class ThemesComponent implements OnInit {
	themes: Theme[] = [];
	subscriptions: Subscription[] = [];
	isLoading = false;

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.loadThemesAndSubscriptions();
	}

	loadThemesAndSubscriptions(): void {
		this.isLoading = true;

		// Load both themes and subscriptions in parallel
		Promise.all([
			this.http.get<Theme[]>(`${AppConfig.apiUrl}/themes`).toPromise(),
			this.http
				.get<Subscription[]>(`${AppConfig.apiUrl}/subscriptions`)
				.toPromise(),
		])
			.then(([themes, subscriptions]) => {
				this.themes = themes || [];
				this.subscriptions = subscriptions || [];
				this.isLoading = false;
			})
			.catch((error) => {
				console.error("Error loading themes and subscriptions:", error);
				this.isLoading = false;
			});
	}

	isSubscribed(themeId: number): boolean {
		return this.subscriptions.some((sub) => sub.themeId === themeId);
	}
}
