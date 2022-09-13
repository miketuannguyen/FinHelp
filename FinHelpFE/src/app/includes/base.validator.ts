import { FormControl, FormGroup } from '@angular/forms';
import { CONSTANTS, Helpers } from '../utils';

export default class BaseValidator {
    /**
     * Get error message of controls of form
     * @param form - `FormGroup` instance
     * @param messages - all error messages of controls in form
     * @returns each control has 1 error message, `null` if no error
     */
    public getErrorsOfForm<TControlNames extends { [k: string]: any }>(
        form: FormGroup<{
            [C in keyof TControlNames]: FormControl<any>;
        }>,
        messages: {
            [K in keyof TControlNames]: {
                [key: string]: string;
            };
        }
    ) {
        if (form.valid) return {} as { [K in keyof TControlNames]?: string };

        const errors: { [K in keyof TControlNames]?: string } = {};
        for (const controlName in form.controls) {
            if (Object.prototype.hasOwnProperty.call(form.controls, controlName)) {
                const control = form.controls[controlName];
                if (control.valid || !control.errors) continue;

                const controlMessages = messages[controlName];

                const controlErrorKeyList = Object.keys(control.errors);
                if (Helpers.isFilledArray(controlErrorKeyList)) {
                    const firstErrorKey = controlErrorKeyList[0];
                    errors[controlName] = controlMessages[firstErrorKey];
                }
            }
        }
        return errors;
    }

    /**
     * Show error message under controls
     * @param errors - error message of each control
     */
    public showErrorMessageUnderControls<TControlNames extends { [k: string]: any }>(errors: {
        [K in keyof TControlNames]?: string | undefined;
    }) {
        for (const controlName in errors) {
            if (Object.prototype.hasOwnProperty.call(errors, controlName)) {
                const errMsg = errors[controlName];
                if (!Helpers.isNotBlank(errMsg)) continue;

                const controlInput = document.querySelector(`[formcontrolname=${controlName}]`);
                const errMsgNode = document.createElement('p');
                errMsgNode.className = CONSTANTS.ERROR_MESSAGE_CLASS;
                errMsgNode.innerHTML = errMsg;
                controlInput?.parentNode?.appendChild(errMsgNode);
            }
        }
    }

    /**
     * Show error message under controls according to validity of form
     * @param form - `FormGroup` instance
     * @param messages - all error messages of controls in form
     * @returns form is valid or not
     */
    public validate<TControlNames extends { [k: string]: any }>(
        form: FormGroup<{
            [C in keyof TControlNames]: FormControl<any>;
        }>,
        messages: {
            [K in keyof TControlNames]: {
                [key: string]: string;
            };
        }
    ) {
        document.querySelectorAll(`p.${CONSTANTS.ERROR_MESSAGE_CLASS}`).forEach((node) => node.remove());

        const errors = this.getErrorsOfForm(form, messages);
        if (!Helpers.isEmptyObject(errors)) this.showErrorMessageUnderControls(errors);

        return form.valid;
    }
}
