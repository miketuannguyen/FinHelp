import { FormArray, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AppFormGroup } from '../utils';
import { BaseValidator } from './base.validator';
import { inject } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export default class IEValidator extends BaseValidator {
    public readonly DESC_MIN_LENGTH = 6;
    public readonly DESC_MAX_LENGTH = 255;

    public readonly AMOUNT_MIN = 1000;

    private _translate$ = inject(TranslateService);

    /** Constructor */
    constructor() {
        super();
    }

    /**
     * Get creating ie form group
     */
    public getCreatingIEForm() {
        const amountLbl = String(this._translate$.instant('label.amount'));

        const form = new AppFormGroup({
            amount: new FormControl(0, [Validators.required, Validators.min(this.AMOUNT_MIN), Validators.max(this.DECIMAL_10_MAX)]),
            desc: new FormControl('', [Validators.minLength(this.DESC_MIN_LENGTH), Validators.maxLength(this.DESC_MAX_LENGTH)]),
            is_expense: new FormControl(false),
            transaction_date: new FormControl<NgbDateStruct | null>(null, [Validators.required]),
            tag_id_list: new FormControl<number[]>([], [Validators.required])
        });

        form.controlValidationMessages = {
            amount: {
                required: String(
                    this._translate$.instant('validation.required', {
                        item: String(this._translate$.instant('label.name'))
                    })
                ),
                min: String(
                    this._translate$.instant('validation.min', {
                        name: amountLbl,
                        num: this.AMOUNT_MIN
                    })
                ),
                max: String(
                    this._translate$.instant('validation.max', {
                        name: amountLbl,
                        num: this.DECIMAL_10_MAX
                    })
                )
            },
            desc: {
                minlength: String(
                    this._translate$.instant('validation.minlength', {
                        num: this.DESC_MIN_LENGTH
                    })
                ),
                maxlength: String(
                    this._translate$.instant('validation.maxlength', {
                        num: this.DESC_MAX_LENGTH
                    })
                )
            },
            transaction_date: {
                required: String(
                    this._translate$.instant('validation.required', {
                        item: String(this._translate$.instant('label.name'))
                    })
                )
            }
        };

        return form;
    }
}
