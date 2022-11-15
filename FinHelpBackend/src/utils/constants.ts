import Helpers from './helpers';

/** Application constants */
const CONSTANTS = {
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
