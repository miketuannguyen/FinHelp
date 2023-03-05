import { saveAuthStateAction } from './auth.actions';
import { createReducer, on } from '@ngrx/store';
import { UserEntity } from 'src/app/entities';

export type AuthState = {
    /** Current login user, `null` if there is no login user */
    current_user: (UserEntity & { access_token: string }) | null;
};

export const initialAuthState: AuthState = {
    current_user: null
};

export const authReducer = createReducer(
    initialAuthState,
    on(
        saveAuthStateAction,
        (state, action): AuthState => ({
            ...state,
            current_user: { ...action.payload }
        })
    )
);
