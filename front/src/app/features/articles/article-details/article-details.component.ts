import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppConfig } from "../../../core/config/app.config";
import { CoreDesignSystemModule } from "../../../design-system/core-design-system.module";
import { CommentCardComponent } from "../../../shared/components/comment-card/comment-card.component";
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

interface Comment {
	id: number;
	content: string;
	createdAt: string;
	updatedAt: string;
	userId: number;
	userName: string;
	articleId: number;
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
		CommentCardComponent,
	],
	templateUrl: "./article-details.component.html",
})
export class ArticleDetailsComponent implements OnInit {
	article: Article | null = null;
	isLoading = true;
	isLoadingComments = false;
	errorMessage = "";
	comments: Comment[] = [];

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
				// Chargement des commentaires une fois que l'article est chargé
				this.loadComments(id);
			},
			error: (error) => {
				console.error("Error loading article:", error);
				this.errorMessage = "Impossible de charger l'article";
				this.isLoading = false;
			},
		});
	}

	loadComments(articleId: string): void {
		this.isLoadingComments = true;
		this.http
			.get<Comment[]>(`${AppConfig.apiUrl}/comments/article/${articleId}`)
			.subscribe({
				next: (comments) => {
					this.comments = comments;
					this.isLoadingComments = false;
				},
				error: (error) => {
					console.error("Error loading comments:", error);
					this.isLoadingComments = false;
				},
			});
	}

	goBack(): void {
		this.router.navigate(["/articles"]);
	}

	onCommentAdded(): void {
		// Recharger les commentaires après l'ajout d'un nouveau commentaire
		if (this.article) {
			this.loadComments(this.article.id);
		}
	}
}
