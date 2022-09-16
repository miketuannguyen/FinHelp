import MESSAGES from './messages';
import { ValueOf } from './types';

export default class APIResponse<T = undefined> {
    public message: ValueOf<typeof MESSAGES.SUCCESS> | ValueOf<typeof MESSAGES.ERROR> = MESSAGES.SUCCESS.SUCCESS;
    public data?: T;

    /**
     * Constructor
     * @param message - response message, `MESSAGES.SUCCESS.SUCCESS` by default
     * @param data - response data
     */
    constructor(message: ValueOf<typeof MESSAGES.SUCCESS> | ValueOf<typeof MESSAGES.ERROR> = MESSAGES.SUCCESS.SUCCESS, data?: T) {
        this.message = message;
        this.data = data;
    }
}
