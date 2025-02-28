import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
	selector: "app-input",
	templateUrl: "./input.component.html",
	styles: [],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true,
		},
	],
})
export class InputComponent implements ControlValueAccessor {
	@Input() label = "";
	@Input() type = "text";
	@Input() id = "";
	@Input() placeholder = "";
	@Input() required = false;
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
		const target = event.target as HTMLInputElement;
		this.value = target.value;
		this.onChange(this.value);
		this.onTouched();
	}
}
