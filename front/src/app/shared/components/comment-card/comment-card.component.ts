import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

/**
 * Comment card component for displaying user comments
 */
@Component({
	selector: "app-comment-card",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./comment-card.component.html",
})
export class CommentCardComponent {
	@Input() userName = "";
	@Input() content = "";
}
