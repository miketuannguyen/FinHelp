import { createFeatureSelector } from '@ngrx/store';
import { UserEntity } from 'src/app/entities';

export const selectAuthState = createFeatureSelector<{ current_user: UserEntity & { access_token: string } }>('auth');
