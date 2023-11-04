import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AppFormGroup } from '../utils';
import { BaseValidator } from './base.validator';
import { inject } from '@angular/core';

export default class TagValidator extends BaseValidator {
    public readonly NAME_MIN_LENGTH = 3;
    public readonly NAME_MAX_LENGTH = 100;

    private _translate$ = inject(TranslateService);

    /** Constructor */
    constructor() {
        super();
    }

    /**
     * Get creating tag form group
     */
    public getCreatingTagForm() {
        const form = new AppFormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
            desc: new FormControl('')
        });

        form.controlValidationMessages = {
            name: {
                required: String(
                    this._translate$.instant('validation.required', {
                        item: String(this._translate$.instant('label.name'))
                    })
                ),
                minlength: String(
                    this._translate$.instant('validation.minlength', {
                        num: this.NAME_MIN_LENGTH
                    })
                ),
                maxlength: String(
                    this._translate$.instant('validation.maxlength', {
                        num: this.NAME_MAX_LENGTH
                    })
                )
            }
        };

        return form;
    }
}
