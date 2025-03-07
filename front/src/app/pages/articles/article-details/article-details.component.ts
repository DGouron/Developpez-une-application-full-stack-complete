import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppConfig } from "../../../core/config/app.config";
import { CoreDesignSystemModule } from "../../../design-system/core-design-system.module";
import { CommentFormComponent } from "../../../shared/components/comment-form/comment-form.component";
import { SharedModule } from "../../../shared/shared.module";

interface Article {
	id: string;
	title: string;
	content: string;
	authorName: string;
	themeTitle: string;
	createdAt: string;
	updatedAt: string;
}

/**
 * Article details page component
 */
@Component({
	selector: "app-article-details",
	standalone: true,
	imports: [
		CommonModule,
		SharedModule,
		CoreDesignSystemModule,
		CommentFormComponent,
	],
	templateUrl: "./article-details.component.html",
})
export class ArticleDetailsComponent implements OnInit {
	article: Article | null = null;
	isLoading = true;
	errorMessage = "";

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private http: HttpClient,
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			const id = params["id"];
			if (id) {
				this.loadArticle(id);
			} else {
				this.errorMessage = "Article ID is missing";
				this.isLoading = false;
			}
		});
	}

	loadArticle(id: string): void {
		this.isLoading = true;
		this.http.get<Article>(`${AppConfig.apiUrl}/articles/${id}`).subscribe({
			next: (article) => {
				this.article = article;
				this.isLoading = false;
			},
			error: (error) => {
				console.error("Error loading article:", error);
				this.errorMessage = "Impossible de charger l'article";
				this.isLoading = false;
			},
		});
	}

	goBack(): void {
		this.router.navigate(["/articles"]);
	}

	onCommentAdded(): void {
		// Rechargement des commentaires ou de l'article si nécessaire
		// Pour l'instant, on ne fait rien car nous n'avons pas encore implémenté l'affichage des commentaires
	}
}
