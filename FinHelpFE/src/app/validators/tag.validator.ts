import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AppFormGroup } from '../utils';

export default class TagValidator {
    public static readonly NAME_MIN_LENGTH = 3;
    public static readonly NAME_MAX_LENGTH = 100;

    /** Constructor */
    constructor(private _translate$: TranslateService) {}

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
                        num: TagValidator.NAME_MIN_LENGTH
                    })
                ),
                maxlength: String(
                    this._translate$.instant('validation.maxlength', {
                        num: TagValidator.NAME_MAX_LENGTH
                    })
                )
            }
        };

        return form;
    }
}
