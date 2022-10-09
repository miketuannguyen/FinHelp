import Helpers from './helpers';

export default class APIResponse<T> {
    /** Request is successful or not */
    public isSuccess = false;
    /** Response message */
    public message = '';
    /** Response data */
    public data?: T;
    /** Validation error */
    public errors?: { [key: string]: string };

    /**
     * Create a successful response
     * @param message - successful response message from API
     * @param data - response data
     */
    public static success<T>(message: string, data?: T) {
        const res = new APIResponse();
        res.isSuccess = true;
        res.message = message;
        res.data = data;
        return res;
    }

    /**
     * Create an error response
     * @param message - error response message from API
     * @param data - error data
     * @param errors - validation errors
     */
    public static error<T = null>(message: string, data?: T, errors?: { [key: string]: string }) {
        const res = new APIResponse<T>();
        res.isSuccess = false;
        res.message = message;
        res.data = data;
        res.errors = errors;
        return res;
    }

    /**
     * Check if an variable is an API response
     * @param obj - any variable
     * @param typeGuard - guard that obj has `data` property and `data` has type `T`
     * @returns `obj` is `APIResponse` or not
     */
    public static is<T = any>(obj: any, typeGuard?: (data: any) => data is T): obj is APIResponse<T> {
        if (typeof obj !== 'object') return false;
        if (!Helpers.hasProperty(obj, 'message') || !Helpers.isNotBlank(obj['message'])) return false;
        if (typeGuard && !typeGuard(obj['data'])) return false;
        return true;
    }
}