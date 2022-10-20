import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/includes/shared.module';
import { ROUTES } from 'src/app/utils';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: ROUTES.DASHBOARD,
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    declarations: [DashboardComponent],
    imports: [RouterModule.forChild(routes), SharedModule],
})
export class DashboardModule {}
