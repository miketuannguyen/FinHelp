import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { APIResponse, API_ROUTES, BaseHTTPClient, CONSTANTS } from '../utils';

@Injectable({
    providedIn: 'root',
})
export default class UserService {
    /** Constructor */
    constructor(private _http: BaseHTTPClient) {}

    /**
     * Login user
     * @param username - username
     * @param password - password
     * @returns access token
     */
    public async login(username: string, password: string) {
        try {
            const observable = this._http.post<{ access_token: string }>(API_ROUTES.USER.LOGIN, { username, password });
            const { body } = await firstValueFrom(observable);
            if (!body) return APIResponse.error(CONSTANTS.ERR_INTERNAL_SERVER_ERROR);
            return APIResponse.success(body.message, body.data);
        } catch (err) {
            if (APIResponse.is(err)) {
                return APIResponse.error(err.message, err.data, err.errors);
            }
            return APIResponse.error(CONSTANTS.ERR_INTERNAL_SERVER_ERROR);
        }
    }
}
