import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/includes/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    {
        path: '**',
        pathMatch: 'full',
        component: NotFoundComponent,
    },
];

@NgModule({
    declarations: [NotFoundComponent],
    imports: [RouterModule.forChild(routes), SharedModule],
})
export class AppCommonModule {}
