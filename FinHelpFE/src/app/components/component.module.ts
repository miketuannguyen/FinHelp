import { NgModule } from '@angular/core';
import { SharedModule } from '../includes/shared.module';
import { AppToastComponent } from './app-toast/app-toast.component';
import { FormInputWrapperComponent } from './form-input-wrapper/form-input-wrapper.component';

@NgModule({
    declarations: [AppToastComponent, FormInputWrapperComponent],
    imports: [SharedModule],
    exports: [AppToastComponent, FormInputWrapperComponent],
})
export class ComponentModule {}
