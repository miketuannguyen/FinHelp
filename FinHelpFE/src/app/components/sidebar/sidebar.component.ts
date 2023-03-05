import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserEntity } from 'src/app/entities';
import BaseComponent from 'src/app/includes/base.component';
import { selectAuthState } from 'src/app/store/auth/auth.selectors';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseComponent implements OnInit, OnDestroy {
    public routePathList: string[] = [];

    /** Current login user */
    public currentUser: UserEntity & { access_token: string } = {
        ...new UserEntity(),
        access_token: ''
    };

    private _authStateSub = new Subscription();

    /** Constructor */
    constructor(private readonly store: Store, private readonly _router: Router, public readonly activeOffCanvas: NgbActiveOffcanvas) {
        super();
    }

    /** @returns */
    ngOnInit() {
        const authStateObs = this.store.select(selectAuthState);
        this._authStateSub = authStateObs.subscribe((authState) => {
            if (authState?.current_user) {
                this.currentUser = authState.current_user;
            }
        });

        const url = this._router.url;
        if (this.helpers.isString(url)) {
            // the first path splitted from url is always blank
            this.routePathList = url.split('/').slice(1) || [];
        }

        this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.routePathList = event.url.split('/').slice(1) || [];
            }
        });
    }

    /** @returns */
    ngOnDestroy() {
        this._authStateSub.unsubscribe();
    }

    /**
     * Navigate to pages by `route`
     * @param route - page url
     */
    public navigate(route: string) {
        void this._router.navigate([route]);
        this.activeOffCanvas.close();
    }
}
