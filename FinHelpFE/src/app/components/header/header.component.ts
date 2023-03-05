import { Component } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import BaseComponent from 'src/app/includes/base.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent {
    /** Constructor */
    constructor(private readonly _offcanvasService: NgbOffcanvas) {
        super();
    }

    /**
     * Show sidebar
     */
    public showSidebar() {
        this._offcanvasService.open(SidebarComponent);
    }
}
