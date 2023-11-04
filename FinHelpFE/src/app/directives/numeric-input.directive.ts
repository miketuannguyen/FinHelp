import { Directive, ElementRef, HostListener } from '@angular/core';
import { Helpers } from '../utils';

@Directive({
    selector: 'input[appNumericInput]'
})
export class NumericInputDirective {
    /** Constructor */
    constructor(private _el: ElementRef) {}

    /**
     * When input changed
     * @param event - input event
     */
    @HostListener('input', ['$event'])
    public onChange(event: InputEvent) {
        this._removeNonNumericChar(event);
    }

    /**
     * When data is pasted to input
     * @param event - input event
     */
    @HostListener('paste', ['$event'])
    public onPaste(event: InputEvent) {
        const element = this._el.nativeElement as HTMLInputElement;
        element.value = '';

        this._removeNonNumericChar(event);
    }

    /**
     * When input is blurred
     * @param event - focus event
     */
    @HostListener('blur', ['$event'])
    public onBlur(event: FocusEvent) {
        this._removeNonNumericChar(event);
        const element = this._el.nativeElement as HTMLInputElement;
        if (Helpers.isString(element.value)) {
            element.value = Helpers.formatNumber(Number(element.value));
        }
    }

    /**
     * When input is focused
     * @param event - focus event
     */
    @HostListener('focus', ['$event'])
    public onFocus(event: FocusEvent) {
        this._removeNonNumericChar(event);
    }

    /**
     * Remove non-numeric characters from input value by replacing with empty string
     */
    private _removeNonNumericChar(event: UIEvent) {
        const element = this._el.nativeElement as HTMLInputElement;
        const initialValue = element.value;
        element.value = initialValue.replace(/[^0-9.-]*/g, '');
        if (initialValue !== element.value) {
            event.stopPropagation();
        }
    }
}
