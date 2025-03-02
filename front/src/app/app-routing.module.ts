import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { AccountComponent } from "./pages/account/account.component";
import { ArticlesComponent } from "./pages/articles/articles.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";

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
		path: "account",
		component: AccountComponent,
		canActivate: [AuthGuard],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
