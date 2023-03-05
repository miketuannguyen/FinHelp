import { NgModule } from '@angular/core';
import { SharedModule } from '../includes/shared.module';
import { ComponentModule } from './../components/component.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
    declarations: [MainLayoutComponent],
    imports: [SharedModule, ComponentModule],
    exports: [MainLayoutComponent],
})
export class LayoutModule {}
