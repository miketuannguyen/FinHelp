import { createAction, props } from '@ngrx/store';
import { UserEntity } from 'src/entities';

export enum AuthActionTypes {
    LOGIN = '[Auth] LOGIN',
}

export const loginAction = createAction(AuthActionTypes.LOGIN, props<{ payload: UserEntity & { access_token: string } }>());
