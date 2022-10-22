import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppToastService } from 'src/app/components/app-toast/app-toast.service';
import PageComponent from 'src/app/includes/page.component';
import UserValidator from 'src/app/includes/user.validator';
import { UserService } from 'src/app/services';
import { UserEntity } from 'src/entities';
import { Md5 } from 'ts-md5';
import { saveAuthStateAction } from './../../../store/auth/auth.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends PageComponent {
    public validator = new UserValidator(this._translate);
    public form = this.validator.buildLoginForm();
    public currentUser: UserEntity & { access_token: string } = {
        ...new UserEntity(),
        access_token: '',
    };

    /** Constructor */
    constructor(private _translate: TranslateService, private _user$: UserService, private _toast$: AppToastService, private store: Store, private _router: Router) {
        super();
    }

    /**
     * On form submitted
     */
    public onSubmit() {
        this.validator.clearErrorMessages();
        const isValid = this.validator.validate(this.form, this.validator.getLoginErrorMessages());
        if (!isValid || !this.Helpers.isString(this.form.value.username) || !this.Helpers.isString(this.form.value.password)) return;

        this._user$.login(this.form.value.username, Md5.hashStr(this.form.value.password)).subscribe((result) => {
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

            this.store.dispatch(saveAuthStateAction({ payload: result.data }));

            void this._router.navigate([this.ROUTES.DASHBOARD]);
        });
    }
}
