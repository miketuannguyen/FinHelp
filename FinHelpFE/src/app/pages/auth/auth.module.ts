import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/includes/shared.module';
import { UserService } from 'src/app/services';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
];

@NgModule({
    declarations: [LoginComponent],
    imports: [RouterModule.forChild(routes), SharedModule, RouterModule],
    providers: [UserService],
})
export class AuthModule {}
