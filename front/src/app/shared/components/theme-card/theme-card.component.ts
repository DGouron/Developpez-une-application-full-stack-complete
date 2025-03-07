import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AppConfig } from "../../../core/config/app.config";
import { CoreDesignSystemModule } from "../../../design-system/core-design-system.module";

/**
 * Theme card component displaying theme information and subscription status
 */
@Component({
	selector: "app-theme-card",
	standalone: true,
	imports: [CommonModule, CoreDesignSystemModule],
	templateUrl: "./theme-card.component.html",
})
export class ThemeCardComponent {
	@Input() title!: string;
	@Input() description!: string;
	@Input() themeId!: number;
	@Input() isSubscribed = false;
	/**
	 * Indicates if the component is used in account page context
	 * If true, shows "Se désabonner" button when subscribed
	 * If false, shows disabled "Déjà abonné" button when subscribed
	 */
	@Input() isAccountContext = false;
	@Output() unsubscribe = new EventEmitter<void>();

	constructor(private http: HttpClient) {}

	onSubscribe(): void {
		this.http
			.post(`${AppConfig.apiUrl}/subscriptions`, { themeId: this.themeId })
			.subscribe({
				next: () => {
					this.isSubscribed = true;
				},
				error: (error) => {
					console.error("Error subscribing to theme:", error);
				},
			});
	}

	onUnsubscribe(): void {
		this.unsubscribe.emit();
	}
}
