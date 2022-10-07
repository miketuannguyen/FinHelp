import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppToastService } from 'src/app/component/app-toast/app-toast.service';
import PageComponent from 'src/app/includes/page.component';
import UserValidator from 'src/app/includes/user.validator';
import { UserService } from 'src/app/services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends PageComponent {
    public validator = new UserValidator(this._translate);
    public form = this.validator.buildLoginForm();

    /** Constructor */
    constructor(private _translate: TranslateService, private _user$: UserService, private _toast$: AppToastService) {
        super();
    }

    /**
     * On form submitted
     */
    public async onSubmit() {
        this.validator.clearErrorMessages();
        const isValid = this.validator.validate(this.form, this.validator.getLoginErrorMessages());
        if (!isValid || !this.Helpers.isNotBlank(this.form.value.username) || !this.Helpers.isNotBlank(this.form.value.password)) return;

        const result = await this._user$.login(this.form.value.username, this.form.value.password);
        if (!result.isSuccess || !result.data) {
            if (result.errors) {
                const errors = this.validator.getErrorMessagesFromValidationErrors(result.errors, this.validator.getLoginErrorMessages());
                this.validator.showErrorMessagesUnderControls(errors);
                return;
            }

            const errMsg = this._translate.instant(`message.${result.message}`) as string;
            this._toast$.error(errMsg);
            return;
        }
        const successMsg = this._translate.instant('message.success') as string;
        this._toast$.success(successMsg);
    }
}
