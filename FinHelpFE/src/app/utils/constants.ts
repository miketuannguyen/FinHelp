import Helpers from './helpers';

/** Application constants */
const CONSTANTS = {
    DEFAULT_LANG: 'en',
    /** Error message CSS class */
    ERROR_MESSAGE_CLASS: 'error-message',
    /** Default internal server error message */
    ERR_INTERNAL_SERVER_ERROR: 'err_internal_server_error',
    /** `localStorage` key name of access token */
    LS_ACCESS_TOKEN_KEY: 'finhelp_access_token',
} as const;
Helpers.deepFreeze(CONSTANTS);

/** Application routes */
const ROUTES = {
    AUTH: {
        LOGIN: 'auth/login',
    },
    DASHBOARD: '',
} as const;
Helpers.deepFreeze(ROUTES);

/** API routes */
const API_ROUTES = {
    AUTH: {
        LOGIN: 'auth/login',
    },
    USER: {
        GET_PROFILE: 'user/profile',
    },
} as const;
Helpers.deepFreeze(API_ROUTES);

export { CONSTANTS, ROUTES, API_ROUTES };
