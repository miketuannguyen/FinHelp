import { NgModule } from '@angular/core';
import { SharedModule } from '../includes/shared.module';
import { AppToastComponent } from './app-toast/app-toast.component';

@NgModule({
    declarations: [AppToastComponent],
    imports: [SharedModule],
    exports: [AppToastComponent],
})
export class ComponentModule {}
