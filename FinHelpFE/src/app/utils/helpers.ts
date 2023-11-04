import { NgbDate, NgbDateStruct, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';

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

    /**
     * Convert `Date` to `NgbDate`
     * @param date - a `Date` instance
     * @returns `NgbDate` instance
     */
    public static convertDateToNgbDate(date: Date): NgbDate {
        return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }

    /**
     * Convert `NgbDate` to `Date`
     * @param date - a `NgbDate` instance
     * @returns `Date` instance
     */
    public static convertNgbDateToDate(date: NgbDateStruct): Date {
        const result = new Date();
        result.setDate(date.day);
        result.setMonth(date.month - 1);
        result.setFullYear(date.year);
        return result;
    }

    /**
     * Get the string which is the formatted number
     * @param num - any number
     * @returns formatted number
     */
    static formatNumber(num: number): string {
        if (!num) return '0';
        const _moneyAmount = parseFloat(`${num}`);
        return new Intl.NumberFormat('en-US').format(_moneyAmount);
    }

    /**
     * Check if `value` is not null and not undefined
     * @returns `true` if `value` is not null and not undefined
     */
    static isDefined<T>(value: T | null | undefined): value is T {
        return value !== null && typeof value !== 'undefined';
    }

    /**
     * Format date
     * @param date - date input
     * @param toFormat - the designated format
     * @returns formatted date string
     */
    static formatDate(date: Date | string | number, toFormat = 'DD/MM/YYYY') {
        return dayjs(date).format(toFormat);
    }
}
