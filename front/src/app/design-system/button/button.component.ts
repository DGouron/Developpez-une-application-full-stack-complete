import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-button",
	templateUrl: "./button.component.html",
	styles: [],
})
export class ButtonComponent {
	@Input() type: "button" | "submit" | "reset" = "button";
	@Input() variant: "submit" | "outline" | "inline" = "submit";
	@Input() disabled = false;
	@Input() isLoading = false;
	@Input() fullWidth = false;
	@Output() buttonClick = new EventEmitter<void>();

	onClick(event: Event): void {
		if (!this.disabled && !this.isLoading) {
			this.buttonClick.emit();
		}
	}

	get variantClasses(): string {
		if (this.variant === "outline") {
			return "bg-white text-black border-black border-2 rounded-lg hover:bg-gray-100";
		}

		if (this.variant === "inline") {
			return "bg-transparent text-inline-red font-bold border-0 hover:underline p-0 h-auto text-[14px]";
		}

		return "bg-[#7B68EE] rounded-lg text-white font-bold hover:bg-[#6A5ACD]";
	}

	get sizeClasses(): string {
		return this.fullWidth ? "w-full" : "w-auto";
	}

	get baseClasses(): string {
		if (this.variant === "inline") {
			return "transition-colors duration-200 ease-in-out flex items-center justify-center disabled:bg-disabled disabled:cursor-not-allowed";
		}

		return "h-10 px-4 rounded-lg text-base transition-colors duration-200 ease-in-out flex items-center justify-center disabled:bg-disabled disabled:cursor-not-allowed";
	}
}
