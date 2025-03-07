import { Component, Input } from "@angular/core";

@Component({
	selector: "app-article-card",
	templateUrl: "./article-card.component.html",
	styleUrls: ["./article-card.component.css"],
})
export class ArticleCardComponent {
	@Input() title = "";
	@Input() createdAt: Date = new Date();
	@Input() author = "";
	@Input() content = "";

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
}
