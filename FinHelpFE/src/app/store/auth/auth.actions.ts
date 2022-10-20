import { createAction, props } from '@ngrx/store';
import { UserEntity } from 'src/entities';

export enum AuthActionTypes {
    SAVE = '[Auth] SAVE',
}

export const saveAuthStateAction = createAction(AuthActionTypes.SAVE, props<{ payload: UserEntity & { access_token: string } }>());
