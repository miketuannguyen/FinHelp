import Helpers from './helpers';

/** Application messages */
const MESSAGES = {
    SUCCESS: {
        SUCCESS: 'success',
    },
    ERROR: {
        /** "404 Not Found" error message */
        ERR_RESOURCE_NOT_FOUND: 'err_resource_not_found',
        /** "500 Internal Server Error" error message */
        ERR_INTERNAL_SERVER_ERROR: 'err_internal_server_error',
        ERR_NO_DATA: 'err_no_data',
        ERR_VALIDATION: 'err_validation',
        ERR_LOGIN: 'err_login'
    },
} as const;

Helpers.deepFreeze(MESSAGES);
export default MESSAGES;
