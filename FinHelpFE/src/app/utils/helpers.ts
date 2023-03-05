import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

export default class Helpers {
    /**
     * Make all properties of an object immutable including nested objects
     * @param obj - this can contain nested objects
     * @returns a readonly version of `obj`
     */
    public static deepFreeze<T extends { [key: string]: any }>(obj: T) {
        Object.keys(obj).forEach((prop) => {
            if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) {
                Helpers.deepFreeze(obj[prop]);
            }
        });
        return Object.freeze(obj);
    }

    /**
     * Check if array contains element or not
     * @param arr - any variable
     */
    public static isFilledArray(arr: any): arr is any[] {
        return Array.isArray(arr) && arr.length > 0;
    }

    /**
     * Check if a variable is a filled string or not
     * @param str - any variable
     */
    public static isString(str: any): str is string {
        return str !== null && typeof str === 'string' && str.trim().length > 0;
    }

    /**
     * Check if object is empty or null or undefined
     * @param obj - any variable
     * @returns object is empty or null or undefined
     */
    public static isEmptyObject(obj: any) {
        if (obj === null) return true;
        if (typeof obj === 'undefined') return true;
        if (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            Object.keys(obj).length === 0 &&
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            obj.constructor === Object
        )
            return true;
        return false;
    }

    /**
     * Check if function is async or not
     * @param obj - any function
     * @returns - function is async or not
     */
    public static isAsync(obj: Function) {
        return obj.constructor.name === 'AsyncFunction';
    }

    /**
     * Show app loading layout
     */
    public static showLoading() {
        const appLoadingLayer = document.getElementById('appLoadingLayer');
        if (appLoadingLayer) appLoadingLayer.style.display = '';

        const appLoading = document.getElementById('appLoading');
        if (appLoading) appLoading.style.display = '';
    }

    /**
     * Hide app loading layout
     */
    public static hideLoading() {
        const appLoadingLayer = document.getElementById('appLoadingLayer');
        if (appLoadingLayer) appLoadingLayer.style.display = 'none';

        const appLoading = document.getElementById('appLoading');
        if (appLoading) appLoading.style.display = 'none';
    }

    /**
     * Check if an object has `key` or not
     * @param obj - any variable
     * @param propName - property name
     * @returns - `obj` has `propName` or not
     */
    public static hasProperty(obj: any, propName: string): obj is { [k: string]: any } {
        return obj !== null && typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, propName);
    }

    /**
     * Get access token
     */
    public static getAccessToken() {
        // can't use CONSTANTS here because CONSTANTS needs Helpers to be initialized first
        return localStorage.getItem('finhelp_access_token');
    }

    /**
     * Remove access token
     */
    public static removeAccessToken() {
        // can't use CONSTANTS here because CONSTANTS needs Helpers to be initialized first
        return localStorage.removeItem('finhelp_access_token');
    }

    /**
     * Get common options to open modal
     * @param customOpts - custom options, added to the common options
     * @returns common options (added `customOpts`)
     */
    public static getOpenModalCommonOptions(customOpts?: NgbModalOptions) {
        const commonOpts: NgbModalOptions = {
            centered: true,
            size: 'lg',
            backdrop: 'static',
            keyboard: false
        };

        if (customOpts) {
            Object.assign(commonOpts, customOpts);
        }

        return commonOpts;
    }
}
