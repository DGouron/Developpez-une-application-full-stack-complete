import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AccountButtonComponent } from "./account-button/account-button.component";
import { ButtonComponent } from "./button/button.component";
import { InputComponent } from "./input/input.component";
import { MenuButtonComponent } from "./menu-button/menu-button.component";
import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { SheetComponent } from "./sheet/sheet.component";

@NgModule({
	declarations: [
		InputComponent,
		ButtonComponent,
		MenuButtonComponent,
		AccountButtonComponent,
		SheetComponent,
		NavigationBarComponent,
	],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
	exports: [
		CommonModule,
		RouterModule,
		InputComponent,
		ButtonComponent,
		MenuButtonComponent,
		AccountButtonComponent,
		SheetComponent,
		NavigationBarComponent,
	],
})
export class CoreDesignSystemModule {}
