import { Component, Input } from '@angular/core';
import BaseComponent from 'src/app/includes/base.component';

@Component({
    selector: 'app-form-input-wrapper',
    templateUrl: './form-input-wrapper.component.html',
    styleUrls: ['./form-input-wrapper.component.scss'],
})
export class FormInputWrapperComponent extends BaseComponent {
    /** Input label */
    @Input() label = '';

    /** Id of the child input to add to the `for` property of label */
    @Input() for = '';

    /** CSS class of the child input, `form-label` by default */
    @Input() class = 'form-label';

    /** Error message of the child input */
    @Input() public errorMessage?: string;

    /** Constructor */
    constructor() {
        super();
    }
}
