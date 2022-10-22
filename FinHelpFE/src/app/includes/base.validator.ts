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
     * Get full error messages from validation errors
     * @param errors - validation errors responded from API
     * @param messages - all error messages of controls
     */
    public getErrorMessagesFromValidationErrors(
        errors: { [key: string]: string },
        messages: {
            [key: string]: {
                [key: string]: string;
            };
        }
    ) {
        const result: { [key: string]: string } = {};
        const errorEntries = Object.entries(errors);
        for (const [errKey, errMsgKey] of errorEntries) {
            if (messages[errKey] && Helpers.isString(messages[errKey][errMsgKey])) {
                result[errKey] = messages[errKey][errMsgKey];
            }
        }
        return result;
    }

    /**
     * Show error message under controls
     * @param errors - error message of each control
     */
    public showErrorMessagesUnderControls<TControlNames extends { [k: string]: any } = { [k: string]: any }>(errors: {
        [K in keyof TControlNames]?: string | undefined;
    }) {
        if (Helpers.isEmptyObject(errors)) return;

        for (const controlName in errors) {
            if (Object.prototype.hasOwnProperty.call(errors, controlName)) {
                const errMsg = errors[controlName];
                if (!Helpers.isString(errMsg)) continue;

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
        const errors = this.getErrorsOfForm(form, messages);
        if (!Helpers.isEmptyObject(errors)) this.showErrorMessagesUnderControls(errors);

        return form.valid;
    }

    /**
     * Clear error messages on screens
     */
    public clearErrorMessages() {
        document.querySelectorAll(`p.${CONSTANTS.ERROR_MESSAGE_CLASS}`).forEach((node) => node.remove());
    }
}
