import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UserEntity } from 'src/entities';
import { APIResponse, API_ROUTES, BaseHTTPClient, CONSTANTS } from '../utils';

@Injectable({
    providedIn: 'root',
})
export default class UserService {
    /** Constructor */
    constructor(private _http: BaseHTTPClient) {}

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
