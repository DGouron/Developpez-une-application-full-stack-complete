import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DesignSystemModule } from "../design-system/design-system.module";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
	declarations: [HomeComponent, LoginComponent, RegisterComponent],
	imports: [SharedModule, RouterModule, DesignSystemModule],
	exports: [HomeComponent, LoginComponent, RegisterComponent],
})
export class PagesModule {}
