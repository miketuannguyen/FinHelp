import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Helpers, ROUTES } from 'src/app/utils';
import { UserService } from '../services';
import { saveAuthStateAction } from '../store/auth/auth.actions';

@Injectable({
    providedIn: 'root',
})
export default class AuthGuard implements CanActivate {
    /** Constructor */
    constructor(private _user$: UserService, private _router: Router, private store: Store) {}

    /**
     * Check if current user was authenticated or not
     *
     * If user was authenticated, proceed to components
     *
     * If user was not authenticated, navigate to login and clear access token
     * @returns
     */
    canActivate(): Observable<boolean | UrlTree> | boolean {
        const accessToken = Helpers.getAccessToken();
        if (!Helpers.isString(accessToken)) {
            void this._router.navigate([ROUTES.AUTH.LOGIN]);
            return false;
        }

        return this._user$.getProfile().pipe(
            tap((response) => {
                if (response.isSuccess && response.data) {
                    const payload = {
                        ...response.data,
                        access_token: accessToken,
                    };
                    this.store.dispatch(saveAuthStateAction({ payload }));
                }
            }),
            map((response) => {
                if (!response.isSuccess || !response.data) {
                    void this._router.navigate([ROUTES.AUTH.LOGIN]);
                    Helpers.removeAccessToken();
                    return false;
                }
                return true;
            }),
            catchError(() => {
                void this._router.navigate([ROUTES.AUTH.LOGIN]);
                Helpers.removeAccessToken();
                return of(false);
            })
        );
    }
}
