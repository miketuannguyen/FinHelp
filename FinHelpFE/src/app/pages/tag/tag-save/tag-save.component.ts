import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AppToastService } from 'src/app/components/app-toast/app-toast.service';
import { TagEntity } from 'src/app/entities';
import BaseComponent from 'src/app/includes/base.component';
import { UserService } from 'src/app/services';
import TagValidator from 'src/app/validators/tag.validator';

@Component({
    selector: 'app-tag-save',
    templateUrl: './tag-save.component.html'
})
export class TagSaveComponent extends BaseComponent implements OnInit {
    public validator = new TagValidator();
    public form = this.validator.getCreatingTagForm();

    public item = new TagEntity();

    @Output() finishSaving = new EventEmitter<TagEntity>();

    /** Constructor */
    constructor(public activeModal: NgbActiveModal, private _translate$: TranslateService, private user$: UserService, private _toast$: AppToastService) {
        super();
    }

    /** @returns */
    ngOnInit() {
        if (this.item.id > 0) {
            this.form.controls.name.setValue(this.item.name);
            this.form.controls.desc.setValue(this.item.desc || '');
        }
    }

    /**
     * On form submitted
     */
    public onSubmit() {
        this.form.clearControlErrorMessages();
        if (!this.form.valid || !this.helpers.isString(this.form.value.name)) {
            this.form.setControlErrorMessages();
            return;
        }

        if (this.item.id <= 0) {
            this.user$.createTagOfUser(this.form.value.name || '', this.form.value.desc || '').subscribe((result) => {
                if (!result.isSuccess || !result.data) {
                    if (result.errors) {
                        this.form.setErrorMessagesFromValidationErrors(result.errors);
                        return;
                    }

                    const errMsg = String(this._translate$.instant(`message.${result.message}`));
                    this._toast$.error(errMsg);
                    return;
                }

                this.item = result.data;
                this._toast$.success(String(this._translate$.instant('message.success')));

                this.finishSaving.emit(this.item);
                this.activeModal.close();
            });
            return;
        }

        this.user$.updateTagOfUser(this.item.id, this.form.value.name || '', this.form.value.desc || '').subscribe((result) => {
            if (!result.isSuccess || !result.data) {
                if (result.errors) {
                    this.form.setErrorMessagesFromValidationErrors(result.errors);
                    return;
                }

                const errMsg = String(this._translate$.instant(`message.${result.message}`));
                this._toast$.error(errMsg);
                return;
            }

            this.item = result.data;
            this._toast$.success(String(this._translate$.instant('message.success')));

            this.finishSaving.emit(this.item);
            this.activeModal.close();
        });
    }

    /**
     * On modal is closed
     */
    public onClose() {
        if (this.form.dirty) {
            this._toast$.error('Form is dirty');
        }
        this.activeModal.close();
    }
}
