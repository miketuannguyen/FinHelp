import { Component, Input } from '@angular/core';
import BaseComponent from 'src/app/includes/base.component';

@Component({
    selector: 'app-form-input-wrapper',
    templateUrl: './form-input-wrapper.component.html'
})
export class FormInputWrapperComponent extends BaseComponent {
    /** Input label */
    @Input() label = '';

    /** Id of the child input to add to the `for` property of label */
    @Input() for = '';

    /** CSS class of the child input, `form-label` by default */
    @Input() className = 'form-label';

    /** Error message of the child input */
    @Input() public errorMessage?: string;

    /** Constructor */
    constructor() {
        super();
    }
}
