import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppToastService } from './app-toast.service';

@Component({
    selector: 'app-toast',
    templateUrl: './app-toast.component.html',
    styleUrls: ['./app-toast.component.scss'],
})
export class AppToastComponent {
    /** Constructor */
    constructor(public toast$: AppToastService, public translate: TranslateService) {}

    /**
     * Get toast Bootstrap class
     */
    public getToastClass(toastType: 'SUCCESS' | 'ERROR' | 'INFO') {
        if (toastType === 'SUCCESS') return 'bg-success text-light';
        if (toastType === 'ERROR') return 'bg-danger text-light';
        return 'bg-primary text-light';
    }
}
