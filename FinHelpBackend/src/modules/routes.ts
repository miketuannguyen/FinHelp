import { Helpers } from 'src/utils';

const ROUTES = {
    AUTH: {
        MODULE: 'auth',
        LOGIN: 'login',
    },
    USER: {
        MODULE: 'user',
        PROFILE: 'profile',
    },
    TAG: {
        MODULE: 'tag',
    },
} as const;
Helpers.deepFreeze(ROUTES);

export default ROUTES;
