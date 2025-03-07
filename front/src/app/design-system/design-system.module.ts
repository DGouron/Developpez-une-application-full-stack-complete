import { NgModule } from "@angular/core";
import { CoreDesignSystemModule } from "./core-design-system.module";
import { TextareaComponent } from "./textarea/textarea.component";

@NgModule({
	declarations: [TextareaComponent],
	imports: [CoreDesignSystemModule],
	exports: [CoreDesignSystemModule, TextareaComponent],
})
export class DesignSystemModule {}
