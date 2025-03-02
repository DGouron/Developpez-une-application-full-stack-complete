import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AccountButtonComponent } from "./account-button/account-button.component";
import { ButtonComponent } from "./button/button.component";
import { InputComponent } from "./input/input.component";
import { MenuButtonComponent } from "./menu-button/menu-button.component";
import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";

@NgModule({
	declarations: [
		InputComponent,
		ButtonComponent,
		NavigationBarComponent,
		MenuButtonComponent,
		AccountButtonComponent,
	],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
	exports: [
		InputComponent,
		ButtonComponent,
		NavigationBarComponent,
		MenuButtonComponent,
		AccountButtonComponent,
	],
})
export class DesignSystemModule {}
