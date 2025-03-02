import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DesignSystemModule } from "../design-system/design-system.module";
import { AuthLayoutComponent } from "./components/auth-layout/auth-layout.component";
import { HeaderComponent } from "./components/header/header.component";
import { ProtectedLayoutComponent } from "./components/protected-layout/protected-layout.component";

@NgModule({
	declarations: [
		AuthLayoutComponent,
		ProtectedLayoutComponent,
		HeaderComponent,
	],
	imports: [CommonModule, ReactiveFormsModule, DesignSystemModule],
	exports: [
		CommonModule,
		ReactiveFormsModule,
		AuthLayoutComponent,
		ProtectedLayoutComponent,
		HeaderComponent,
	],
})
export class SharedModule {}
