import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthLayoutComponent } from "./components/auth-layout/auth-layout.component";

@NgModule({
	declarations: [AuthLayoutComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [CommonModule, ReactiveFormsModule, AuthLayoutComponent],
})
export class SharedModule {}
