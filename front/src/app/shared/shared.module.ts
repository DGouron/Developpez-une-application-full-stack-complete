import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DesignSystemModule } from "../design-system/design-system.module";
import { ArticleCardComponent } from "./components/article-card/article-card.component";
import { AuthLayoutComponent } from "./components/auth-layout/auth-layout.component";
import { HeaderComponent } from "./components/header/header.component";
import { ProtectedLayoutComponent } from "./components/protected-layout/protected-layout.component";
import { ThemeCardComponent } from "./components/theme-card/theme-card.component";

@NgModule({
	declarations: [
		AuthLayoutComponent,
		ProtectedLayoutComponent,
		HeaderComponent,
		ArticleCardComponent,
	],
	imports: [CommonModule, RouterModule, DesignSystemModule, ThemeCardComponent],
	exports: [
		CommonModule,
		AuthLayoutComponent,
		ProtectedLayoutComponent,
		HeaderComponent,
		ArticleCardComponent,
		ThemeCardComponent,
	],
})
export class SharedModule {}
