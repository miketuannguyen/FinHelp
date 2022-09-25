import Helpers from './helpers';

/** Application constants */
const CONSTANTS = {
    /** HTTP status codes */
    HTTP_STATUS_CODES: {
        SUCCESS: {
            OK: 200,
            CREATED: 201,
            NO_CONTENT: 204,
        },
        CLIENT_ERROR: {
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
        },
        SERVER_ERROR: {
            INTERNAL_SERVER_ERROR: 500,
        },
    },
    APP_LOG_FOLDER_NAME: 'logs',
    ENVIRONMENTS: {
        DEV: 'DEV',
        STAG: 'STAG',
        PROD: 'PROD',
    },
    /** 10 years */
    ACCESS_TOKEN_EXPIRED_TIME: 315360000,
} as const;
Helpers.deepFreeze(CONSTANTS);

export default CONSTANTS;
