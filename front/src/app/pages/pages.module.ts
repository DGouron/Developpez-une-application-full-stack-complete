import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DesignSystemModule } from "../design-system/design-system.module";
import { SharedModule } from "../shared/shared.module";
import { AccountComponent } from "./account/account.component";
import { ArticlesComponent } from "./articles/articles.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
	declarations: [
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		ArticlesComponent,
		AccountComponent,
	],
	imports: [SharedModule, RouterModule, DesignSystemModule],
	exports: [
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		ArticlesComponent,
		AccountComponent,
	],
})
export class PagesModule {}
