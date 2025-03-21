import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DesignSystemModule } from "../design-system/design-system.module";
import { SharedModule } from "../shared/shared.module";
import { AccountComponent } from "./account/account.component";
import { ArticlesComponent } from "./articles/articles.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ThemesComponent } from "./themes/themes.component";

@NgModule({
	declarations: [
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		ArticlesComponent,
		AccountComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		DesignSystemModule,
		SharedModule,
		ThemesComponent,
	],
	exports: [
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		ArticlesComponent,
		AccountComponent,
		ThemesComponent,
	],
})
export class PagesModule {}
