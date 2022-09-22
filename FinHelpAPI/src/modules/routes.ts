import { Helpers } from '../utils';

/** API routes */
const ROUTES = {
    USER: {
        MODULE: '/user',
        LOGIN: '/login',
    },
} as const;
Helpers.deepFreeze(ROUTES);

export default ROUTES;
