import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppConfig } from "../../../core/config/app.config";
import { DesignSystemModule } from "../../../design-system/design-system.module";

/**
 * Comment form component for submitting comments on articles
 */
@Component({
	selector: "app-comment-form",
	standalone: true,
	imports: [CommonModule, FormsModule, DesignSystemModule],
	templateUrl: "./comment-form.component.html",
})
export class CommentFormComponent {
	@Input() articleId!: number;
	@Output() commentAdded = new EventEmitter<void>();

	commentContent = "";
	isSubmitting = false;
	errorMessage = "";

	constructor(private http: HttpClient) {}

	submitComment(): void {
		if (!this.commentContent.trim()) {
			return;
		}

		this.isSubmitting = true;
		this.errorMessage = "";

		this.http
			.post(`${AppConfig.apiUrl}/comments`, {
				content: this.commentContent,
				articleId: this.articleId,
			})
			.subscribe({
				next: () => {
					this.commentContent = "";
					this.isSubmitting = false;
					this.commentAdded.emit();
				},
				error: (error) => {
					console.error("Error submitting comment:", error);
					this.errorMessage = "Impossible d'envoyer le commentaire";
					this.isSubmitting = false;
				},
			});
	}
}
