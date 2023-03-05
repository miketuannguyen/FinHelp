import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAuthState } from 'src/app/store/auth/auth.selectors';
import { UserEntity } from 'src/app/entities';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    public curUser = new UserEntity();

    private _authStateSub = new Subscription();

    /** Constructor */
    constructor(private store: Store) {}

    /** @returns */
    ngOnInit() {
        const authStateObs = this.store.select(selectAuthState);
        this._authStateSub = authStateObs.subscribe((authState) => {
            if (authState?.current_user) {
                this.curUser = authState.current_user;
            }
        });
    }

    /** @returns */
    ngOnDestroy() {
        this._authStateSub.unsubscribe();
    }
}
