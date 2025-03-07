import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";

@Component({
	selector: "app-articles",
	templateUrl: "./articles.component.html",
	styles: [],
})
export class ArticlesComponent implements OnInit {
	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		// Future initialization code can go here
	}

	logout(): void {
		this.authService.logout();
	}

	/**
	 * Generates a date in the past by subtracting a number of days from the current date
	 * @param daysAgo Number of days to subtract
	 * @returns Date in the past
	 */
	getDate(daysAgo: number): Date {
		const date = new Date();
		date.setDate(date.getDate() - daysAgo);
		return date;
	}

	createArticle(): void {
		console.log("Créer un article");
	}
}
