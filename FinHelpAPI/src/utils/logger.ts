import * as path from 'path';
import * as fs from 'fs';
import { createLogger, format, transports, Logger } from 'winston';
import CONSTANTS from './constants';
const { combine, timestamp, prettyPrint } = format;

export default class AppLogger {
    private static _logger: Logger;

    /** Constructor */
    private constructor() {}

    /**
     * Create `logs/app.log` folder if not exist
     */
    public static initAppLogFolder() {
        if (!fs.existsSync(CONSTANTS.APP_LOG_FOLDER_NAME)) {
            fs.mkdirSync(CONSTANTS.APP_LOG_FOLDER_NAME);
        }
    }

    /**
     * Get application logger, directly log to `app.log`
     */
    public static getInstance() {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!this._logger) {
            this._logger = createLogger({
                level: 'info',
                format: combine(timestamp(), prettyPrint()),
                transports: [
                    new transports.File({
                        filename: path.join(CONSTANTS.APP_LOG_FOLDER_NAME, '/app.log'),
                    }),
                ],
            });
        }
        return this._logger;
    }

    /**
     * Log info
     * @param message - log message
     * @param meta - log params
     */
    public static info(message: string, ...meta: any[]) {
        if (process.env.ENVIRONMENT === CONSTANTS.ENVIRONMENTS.DEV) {
            // eslint-disable-next-line no-console, @typescript-eslint/no-unsafe-argument
            console.log(message, ...meta);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        AppLogger.getInstance().info(message, ...meta);
    }

    /**
     * Log error
     * @param message - log message
     * @param meta - log params
     */
    public static error(message: string, ...meta: any[]) {
        if (process.env.ENVIRONMENT === CONSTANTS.ENVIRONMENTS.DEV) {
            // eslint-disable-next-line no-console, @typescript-eslint/no-unsafe-argument
            console.log(message, ...meta);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        AppLogger.getInstance().error(message, ...meta);
    }
}
