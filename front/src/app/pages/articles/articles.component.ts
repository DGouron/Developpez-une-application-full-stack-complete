import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppConfig } from "../../core/config/app.config";

interface Article {
	id: string;
	title: string;
	content: string;
	author: {
		name: string;
	};
	createdAt: string;
}

@Component({
	selector: "app-articles",
	templateUrl: "./articles.component.html",
	styles: [],
})
export class ArticlesComponent implements OnInit {
	articles: (Article & { createdAtDate: Date })[] = [];
	isLoading = false;

	constructor(
		private router: Router,
		private http: HttpClient,
	) {}

	ngOnInit(): void {
		this.loadArticles();
	}

	loadArticles(): void {
		this.isLoading = true;
		this.http.get<Article[]>(`${AppConfig.apiUrl}/articles`).subscribe({
			next: (articles) => {
				this.articles = articles.map((article) => ({
					...article,
					createdAtDate: new Date(article.createdAt),
				}));
				this.isLoading = false;
			},
			error: (error) => {
				console.error("Error loading articles:", error);
				this.isLoading = false;
			},
		});
	}

	logout(): void {
		// Future implementation needed
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
		this.router.navigate(["/articles/create"]);
	}
}
