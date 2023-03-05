import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AppFormGroup } from '../utils';

export default class UserValidator {
    /** Constructor */
    constructor(private _translate$: TranslateService) {}

    /**
     * Get login form group
     */
    public getLoginForm() {
        const form = new AppFormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });

        form.controlValidationMessages = {
            username: {
                required: this._translate$.instant('validation.required', {
                    item: this._translate$.instant('label.username') as string
                }) as string
            },
            password: {
                required: this._translate$.instant('validation.required', {
                    item: this._translate$.instant('label.password') as string
                }) as string
            }
        };

        return form;
    }
}
