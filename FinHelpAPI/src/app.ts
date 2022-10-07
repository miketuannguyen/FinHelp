import * as express from 'express';
import * as expressWinston from 'express-winston';
import * as winston from 'winston';
import * as cors from 'cors';
import { ROUTES, userRouter } from './modules';
import { APIResponse, CONSTANTS, MESSAGES } from './utils';

// ========== [START] Application setups [START] ==========
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:4200'],
    })
);
app.use(
    expressWinston.logger({
        level: 'info',
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.json()),
        meta: false, // optional: control whether you want to log the meta data about the request (default to true)
        msg: 'HTTP {{req.method}} {{res.statusCode}} {{res.responseTime}}ms {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: () => false, // optional: allows to skip some log messages based on request and/or response
    })
);
// ========== [START] Application setups [START] ==========

// ========== [START] Routes handlers [START] ==========
app.use(ROUTES.USER.MODULE, userRouter);

// The final request handler to handle all requests having undefined routes
app.use((_, res) => res.status(CONSTANTS.HTTP_STATUS_CODES.CLIENT_ERROR.NOT_FOUND).json(APIResponse.error(MESSAGES.ERROR.ERR_RESOURCE_NOT_FOUND)));
// ========== [END] Routes handlers [END] ==========

export default app;
