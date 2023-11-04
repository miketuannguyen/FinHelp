import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentModule } from 'src/app/components/component.module';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/includes/shared.module';
import { MainLayoutComponent } from 'src/app/layout/main-layout/main-layout.component';
import { UserService } from 'src/app/services';
import { ROUTES } from 'src/app/utils';
import { IEListComponent } from './ie-list/ie-list.component';
import { IESaveComponent } from './ie-save/ie-save.component';

const routes: Routes = [
    {
        path: ROUTES.I_E.MODULE,
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: ROUTES.I_E.LIST,
                component: IEListComponent
            },
            {
                path: ROUTES.I_E.CREATE,
                component: IESaveComponent
            }
        ]
    }
];

@NgModule({
    declarations: [IEListComponent, IESaveComponent],
    imports: [RouterModule.forChild(routes), SharedModule, ComponentModule, DirectiveModule],
    providers: [UserService]
})
export class IEModule {}
