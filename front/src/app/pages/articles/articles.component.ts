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
}
