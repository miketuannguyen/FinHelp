import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import PageComponent from 'src/app/includes/page.component';
import UserValidator from 'src/app/includes/user.validator';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends PageComponent {
    public validator = new UserValidator(this._translate);
    public form = this.validator.buildLoginForm();

    /** Constructor */
    constructor(private _translate: TranslateService) {
        super();
    }

    /**
     * On form submitted
     */
    public onSubmit() {
        this.validator.validate(this.form, this.validator.getLoginErrorMessages());
    }
}
