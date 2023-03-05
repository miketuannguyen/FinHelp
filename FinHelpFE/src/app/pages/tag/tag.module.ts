import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentModule } from 'src/app/components/component.module';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/includes/shared.module';
import { MainLayoutComponent } from 'src/app/layout/main-layout/main-layout.component';
import { ROUTES } from 'src/app/utils';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagSaveComponent } from './tag-save/tag-save.component';

const routes: Routes = [
    {
        path: ROUTES.TAG.MODULE,
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: ROUTES.TAG.LIST,
                component: TagListComponent
            }
        ]
    }
];

@NgModule({
    declarations: [TagListComponent, TagSaveComponent],
    imports: [RouterModule.forChild(routes), SharedModule, ComponentModule]
})
export class TagModule {}
