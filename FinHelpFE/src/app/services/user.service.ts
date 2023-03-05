import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UserEntity } from 'src/app/entities';
import TagEntity from '../entities/tag.entity';
import { APIResponse, API_ROUTES, BaseHTTPClient, CONSTANTS, ListResponse } from '../utils';
import { CommonSearchQuery } from '../utils/types';

@Injectable({
    providedIn: 'root'
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

    /**
     * Get tag list of user
     * @param queries - search queries
     */
    public getTagListOfUser(queries?: CommonSearchQuery): Observable<APIResponse<ListResponse<TagEntity>>> {
        return this._http.get<ListResponse<TagEntity>>(API_ROUTES.USER.GET_TAG_LIST, queries).pipe(
            map((response) => {
                if (!response.body || !response.body.data) return APIResponse.error(CONSTANTS.ERR_INTERNAL_SERVER_ERROR, new ListResponse<TagEntity>());
                return APIResponse.success(response.body.message, response.body.data);
            }),
            catchError((err) => {
                if (APIResponse.is(err)) {
                    return of(APIResponse.error(err.message, new ListResponse<TagEntity>()));
                }
                return of(APIResponse.error(CONSTANTS.ERR_INTERNAL_SERVER_ERROR, new ListResponse<TagEntity>()));
            })
        );
    }

    /**
     * Create tag of current user
     * @param name - tag name
     * @param desc - tag description
     */
    public createTagOfUser(name: string, desc: string): Observable<APIResponse<TagEntity | null>> {
        return this._http.post<TagEntity>(API_ROUTES.USER.CREATE_TAG, { name, desc }).pipe(
            map((response) => {
                if (!response.body || !response.body.data) return APIResponse.error(CONSTANTS.ERR_INTERNAL_SERVER_ERROR, null);
                return APIResponse.success(response.body.message, response.body.data);
            }),
            catchError((err) => {
                if (APIResponse.is(err)) {
                    return of(APIResponse.error(err.message, null, err.errors));
                }
                return of(APIResponse.error(CONSTANTS.ERR_INTERNAL_SERVER_ERROR, null));
            })
        );
    }

    /**
     * Update tag of current user
     * @param id - tag id
     * @param desc - tag description
     * @param name - tag name
     */
    public updateTagOfUser(id: number, name: string, desc: string): Observable<APIResponse<TagEntity | null>> {
        const apiRoute = API_ROUTES.USER.UPDATE_TAG.replace(':id', `${id}`);
        return this._http.put<TagEntity>(apiRoute, { name, desc }).pipe(
            map((response) => {
                if (!response.body || !response.body.data) return APIResponse.error(CONSTANTS.ERR_INTERNAL_SERVER_ERROR, null);
                return APIResponse.success(response.body.message, response.body.data);
            }),
            catchError((err) => {
                if (APIResponse.is(err)) {
                    return of(APIResponse.error(err.message, null, err.errors));
                }
                return of(APIResponse.error(CONSTANTS.ERR_INTERNAL_SERVER_ERROR, null));
            })
        );
    }

    /**
     * Delete tag of current user
     * @param id - tag id
     */
    public deleteTagOfUser(id: number): Observable<APIResponse<null>> {
        const apiRoute = API_ROUTES.USER.DELETE_TAG.replace(':id', `${id}`);
        return this._http.delete<null>(apiRoute).pipe(
            map((response) => {
                if (!response.body) return APIResponse.error(CONSTANTS.ERR_INTERNAL_SERVER_ERROR, null);
                return APIResponse.success(response.body.message, null);
            }),
            catchError((err) => {
                if (APIResponse.is(err)) {
                    return of(APIResponse.error(err.message, null, err.errors));
                }
                return of(APIResponse.error(CONSTANTS.ERR_INTERNAL_SERVER_ERROR, null));
            })
        );
    }
}
