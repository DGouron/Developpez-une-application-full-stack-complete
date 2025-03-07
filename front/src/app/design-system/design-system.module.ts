import { NgModule } from "@angular/core";
import { CoreDesignSystemModule } from "./core-design-system.module";

@NgModule({
	imports: [CoreDesignSystemModule],
	exports: [CoreDesignSystemModule],
})
export class DesignSystemModule {}
