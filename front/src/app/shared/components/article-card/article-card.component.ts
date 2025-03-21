import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-article-card",
	templateUrl: "./article-card.component.html",
	styles: [],
})
export class ArticleCardComponent {
	@Input() title = "";
	@Input() createdAt: Date = new Date();
	@Input() author = "";
	@Input() content = "";
	@Input() id = "";

	constructor(private router: Router) {}

	capitalizeFirstLetter(text: string): string {
		if (!text) return "";
		return text.charAt(0).toUpperCase() + text.slice(1);
	}

	formatDate(date: Date): string {
		return date.toLocaleDateString("fr-FR", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}

	goToDetails(): void {
		if (this.id) {
			this.router.navigate(["/articles/details", this.id]);
		}
	}
}
