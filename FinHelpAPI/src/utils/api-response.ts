import MESSAGES from './messages';
import { ValueOf } from './types';

export default class APIResponse<T> {
    /** Response message */
    public message: ValueOf<typeof MESSAGES.SUCCESS> | ValueOf<typeof MESSAGES.ERROR> = MESSAGES.SUCCESS.SUCCESS;
    /** Response data */
    public data?: T;
    /** Validation error */
    public errors?: { [key: string]: string };

    /**
     * Create a successful response
     * @param message - successful response message, `MESSAGES.SUCCESS.SUCCESS` by default
     * @param data - response data
     */
    public static success<T>(message: ValueOf<typeof MESSAGES.SUCCESS> = MESSAGES.SUCCESS.SUCCESS, data?: T) {
        const res = new APIResponse<T>();
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
    public static error<T = null>(message: ValueOf<typeof MESSAGES.ERROR>, data?: T, errors?: { [key: string]: string }) {
        const res = new APIResponse<T>();
        res.message = message;
        res.data = data;
        res.errors = errors;
        return res;
    }
}
