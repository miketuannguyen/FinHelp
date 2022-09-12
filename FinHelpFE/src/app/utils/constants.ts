import Helpers from './helpers';

/** Application constants */
const CONSTANTS = {
    DEFAULT_LANG: 'en',
    /** Error message CSS class */
    ERROR_MESSAGE_CLASS: 'error-message',
} as const;
Helpers.deepFreeze(CONSTANTS);

/** Application routes */
const ROUTES = {
    AUTH: {
        LOGIN: 'auth/login',
    },
} as const;
Helpers.deepFreeze(ROUTES);

export { CONSTANTS, ROUTES };
