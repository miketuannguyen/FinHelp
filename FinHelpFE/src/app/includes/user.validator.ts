import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import BaseValidator from './base.validator';

export default class UserValidator extends BaseValidator {
    /** Constructor */
    constructor(private _translate: TranslateService) {
        super();
    }

    /**
     * Build login form group
     */
    public buildLoginForm() {
        return new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    /**
     * Get login error messages based on rules of form controls
     */
    public getLoginErrorMessages() {
        return {
            username: {
                required: this._translate.instant('validation.required', {
                    item: this._translate.instant('label.username') as string,
                }) as string,
            },
            password: {
                required: this._translate.instant('validation.required', {
                    item: this._translate.instant('label.password') as string,
                }) as string,
            },
        };
    }
}
