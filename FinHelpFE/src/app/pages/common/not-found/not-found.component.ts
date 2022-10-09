import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
    /** Constructor */
    constructor(private _router: Router) {}

    /**
     * Back to Homepage
     */
    backToHomepage() {
        void this._router.navigate(['/']);
    }
}
