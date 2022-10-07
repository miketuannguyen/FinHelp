import Helpers from './helpers';

/** Application constants */
const CONSTANTS = {
    DEFAULT_LANG: 'en',
    /** Error message CSS class */
    ERROR_MESSAGE_CLASS: 'error-message',
    /** Default internal server error message */
    ERR_INTERNAL_SERVER_ERROR: 'err_internal_server_error',
} as const;
Helpers.deepFreeze(CONSTANTS);

/** Application routes */
const ROUTES = {
    AUTH: {
        LOGIN: 'auth/login',
    },
} as const;
Helpers.deepFreeze(ROUTES);

/** API routes */
const API_ROUTES = {
    USER: {
        LOGIN: 'user/login',
    },
} as const;
Helpers.deepFreeze(API_ROUTES);

export { CONSTANTS, ROUTES, API_ROUTES };
