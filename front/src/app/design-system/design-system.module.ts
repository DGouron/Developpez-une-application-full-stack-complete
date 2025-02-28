import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "./button/button.component";
import { InputComponent } from "./input/input.component";

@NgModule({
	declarations: [InputComponent, ButtonComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	exports: [InputComponent, ButtonComponent],
})
export class DesignSystemModule {}
