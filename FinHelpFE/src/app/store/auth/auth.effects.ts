import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { CONSTANTS, Helpers } from 'src/app/utils';
import { UserEntity } from 'src/app/entities';
import { AuthActionTypes } from './auth.actions';

@Injectable()
export class AuthEffects {
    /** Set access token to `localStorage` when `AuthActionTypes.SAVE` action is dispatched */
    public saveAccessToken = createEffect(
        () =>
            this.actions.pipe(
                ofType(AuthActionTypes.SAVE),
                tap<{ payload: UserEntity & { access_token: string } }>((value) => {
                    if (Helpers.isString(value?.payload?.access_token)) {
                        localStorage.setItem(CONSTANTS.LS_ACCESS_TOKEN_KEY, value.payload.access_token);
                    }
                })
            ),
        { dispatch: false }
    );

    /** Constructor */
    constructor(private actions: Actions) {}
}
