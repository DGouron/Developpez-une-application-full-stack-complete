import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
	selector: "app-textarea",
	templateUrl: "./textarea.component.html",
	styles: [],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextareaComponent),
			multi: true,
		},
	],
})
export class TextareaComponent implements ControlValueAccessor {
	@Input() label = "";
	@Input() id = "";
	@Input() placeholder = "";
	@Input() required = false;
	@Input() rows = 6;
	@Input() isInvalid: boolean | undefined = false;
	@Input() errorMessage = "";

	value = "";
	disabled = false;

	onChange: (value: string) => void = () => {};
	onTouched: () => void = () => {};

	writeValue(value: string): void {
		this.value = value;
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	onInputChange(event: Event): void {
		const target = event.target as HTMLTextAreaElement;
		this.value = target.value;
		this.onChange(this.value);
		this.onTouched();
	}
}
