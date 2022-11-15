/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CONSTANTS } from 'src/utils';
import { createLogger, format, transports, Logger } from 'winston';
const { combine, timestamp, prettyPrint } = format;

/** Application logger */
export default class AppLogger extends ConsoleLogger {
    private _winstonLogger: Logger;

    /** Constructor */
    constructor(private _className: string) {
        super();
        this._winstonLogger = createLogger({
            format: combine(timestamp(), prettyPrint()),
            transports: [
                new transports.File({
                    filename: path.join(CONSTANTS.APP_LOG_FOLDER_NAME, `/${this._className}.log`),
                }),
            ],
        });
    }

    /**
     * Create `logs/app.log` folder if not exist
     */
    public static initAppLogFolder() {
        if (!fs.existsSync(CONSTANTS.APP_LOG_FOLDER_NAME)) {
            fs.mkdirSync(CONSTANTS.APP_LOG_FOLDER_NAME);
        }
    }

    /**
     * Info logging
     *
     * The level of this in console is `LOG`
     */
    public info(message: string, ...optionalParams: any[]) {
        const fullMessage = `[${this._className}] ${message}`;
        this._winstonLogger.info(fullMessage, ...optionalParams);
        super.log(fullMessage);
    }

    /**
     * Warn logging
     */
    public warn(message: string, ...optionalParams: any[]) {
        const fullMessage = `[${this._className}] ${message}`;
        this._winstonLogger.warn(fullMessage, ...optionalParams);
        super.warn(fullMessage);
    }

    /**
     * Error logging
     */
    public error(methodName: string, error: any, ...optionalParams: any[]) {
        const methodIdentifier = `[${this._className}.${methodName}]`;
        this._winstonLogger.error(methodIdentifier, error, ...optionalParams);
        super.error(`${methodIdentifier} ${error}`);
    }
}
