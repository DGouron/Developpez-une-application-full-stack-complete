import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { AccountComponent } from "./features/account/account.component";
import { ArticleDetailsComponent } from "./features/articles/article-details/article-details.component";
import { ArticlesComponent } from "./features/articles/articles.component";
import { CreateArticleComponent } from "./features/articles/create-article/create-article.component";
import { HomeComponent } from "./features/home/home.component";
import { LoginComponent } from "./features/login/login.component";
import { RegisterComponent } from "./features/register/register.component";
import { ThemesComponent } from "./features/themes/themes.component";

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
	{ path: "", component: HomeComponent },
	{ path: "login", component: LoginComponent },
	{ path: "register", component: RegisterComponent },
	{
		path: "articles",
		component: ArticlesComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "articles/create",
		component: CreateArticleComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "articles/details/:id",
		component: ArticleDetailsComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "account",
		component: AccountComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "themes",
		component: ThemesComponent,
		canActivate: [AuthGuard],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
