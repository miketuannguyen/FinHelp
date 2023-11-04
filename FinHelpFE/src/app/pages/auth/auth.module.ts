import { ROUTES } from 'src/app/utils';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/includes/shared.module';
import { UserService } from 'src/app/services';
import { LoginComponent } from './login/login.component';
import { ComponentModule } from 'src/app/components/component.module';

const routes: Routes = [
    {
        path: ROUTES.AUTH.LOGIN,
        component: LoginComponent
    }
];

@NgModule({
    declarations: [LoginComponent],
    imports: [RouterModule.forChild(routes), SharedModule, ComponentModule],
    providers: [UserService]
})
export class AuthModule {}
