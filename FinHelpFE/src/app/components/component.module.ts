import { NgModule } from '@angular/core';
import { SharedModule } from '../includes/shared.module';
import { AppToastComponent } from './app-toast/app-toast.component';
import { FormInputWrapperComponent } from './form-input-wrapper/form-input-wrapper.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MSmartTableComponent } from './smart-table/smart-table.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
    declarations: [AppToastComponent, FormInputWrapperComponent, HeaderComponent, SidebarComponent, MSmartTableComponent, ConfirmModalComponent],
    imports: [SharedModule],
    exports: [AppToastComponent, FormInputWrapperComponent, HeaderComponent, SidebarComponent, MSmartTableComponent, ConfirmModalComponent]
})
export class ComponentModule {}
