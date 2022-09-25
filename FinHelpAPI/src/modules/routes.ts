import { Helpers } from '../utils';

/** API routes */
const ROUTES = {
    USER: {
        MODULE: '/user',
        LOGIN: '/login',
        PROFILE: '/profile',
    },
} as const;
Helpers.deepFreeze(ROUTES);

export default ROUTES;
