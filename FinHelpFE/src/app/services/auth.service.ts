import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UserEntity } from 'src/app/entities';
import { APIResponse, API_ROUTES, BaseHTTPClient, CONSTANTS } from '../utils';
import { HTTPOptions } from '../utils/http';

@Injectable({
    providedIn: 'root'
})
export default class AuthService {
    /** Constructor */
    constructor(private _http: BaseHTTPClient) {}

    /**
     * Login user
     * @param username - username
     * @param password - password
     * @returns user payload (no password) with access token
     */
    public login(username: string, password: string): Observable<APIResponse<(UserEntity & { access_token: string }) | undefined>> {
        const opts = new HTTPOptions();
        opts.useAccessToken = false;
        return this._http.post<(UserEntity & { access_token: string }) | undefined>(API_ROUTES.AUTH.LOGIN, { username, password }, opts).pipe(
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
