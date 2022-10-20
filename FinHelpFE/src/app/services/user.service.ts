import { HTTPOptions } from './../utils/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of } from 'rxjs';
import { UserEntity } from 'src/entities';
import { APIResponse, API_ROUTES, BaseHTTPClient, CONSTANTS } from '../utils';

@Injectable({
    providedIn: 'root',
})
export default class UserService {
    /** Constructor */
    constructor(private _http: BaseHTTPClient, private store: Store) {}

    /**
     * Login user
     * @param username - username
     * @param password - password
     * @returns user payload (no password) with access token
     */
    public login(username: string, password: string): Observable<APIResponse<(UserEntity & { access_token: string }) | undefined>> {
        const opts = new HTTPOptions();
        opts.useAccessToken = false;
        return this._http.post<(UserEntity & { access_token: string }) | undefined>(API_ROUTES.USER.LOGIN, { username, password }, opts).pipe(
            map((response) => {
                if (!response.body || !response.body.data) return APIResponse.error(CONSTANTS.ERR_INTERNAL_SERVER_ERROR);
                return APIResponse.success(response.body.message, response.body.data);
            }),
            catchError((err) => {
                if (APIResponse.is(err)) {
                    return of(APIResponse.error(err.message, undefined, err.errors));
                }
                return of(APIResponse.error(CONSTANTS.ERR_INTERNAL_SERVER_ERROR));
            })
        );
    }

    /**
     * Get access token
     */
    public getAccessToken() {
        return localStorage.getItem('access_token') || '';
    }

    /**
     * Get user profile
     */
    public getProfile(): Observable<APIResponse<UserEntity | undefined>> {
        return this._http.get<UserEntity | undefined>(API_ROUTES.USER.GET_PROFILE).pipe(
            map((response) => {
                if (!response.body || !response.body.data) return APIResponse.error(CONSTANTS.ERR_INTERNAL_SERVER_ERROR);
                return APIResponse.success(response.body.message, response.body.data);
            }),
            catchError((err) => {
                if (APIResponse.is(err)) {
                    return of(APIResponse.error(err.message, undefined, err.errors));
                }
                return of(APIResponse.error(CONSTANTS.ERR_INTERNAL_SERVER_ERROR));
            })
        );
    }
}
