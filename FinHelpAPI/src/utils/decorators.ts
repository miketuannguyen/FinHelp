import { Request, Response } from 'express';
import APIResponse from './api-response';
import CONSTANTS from './constants';
import Helpers from './helpers';
import AppLogger from './logger';
import MESSAGES from './messages';

export default class Decorators {
    /**
     * Wrap API handler in a `try` `catch` block
     *
     * When an error is thrown, log error and response internal server error
     */
    public static API(
        target: Function,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<(req: Request, res: Response) => Promise<Response> | Response>
    ) {
        if (!descriptor.value) return;

        const className = target.name;
        const methodName = propertyKey;
        const fn = descriptor.value;

        descriptor.value = Helpers.isAsync(fn)
            ? async (req, res) => {
                try {
                    return (await fn.apply(this, [req, res])) as Promise<Response>;
                } catch (error) {
                    AppLogger.error(`${className}.${methodName}`, error);
                    return res
                        .status(CONSTANTS.HTTP_STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR)
                        .json(APIResponse.error(MESSAGES.ERROR.ERR_INTERNAL_SERVER_ERROR));
                }
            }
            : (req, res) => {
                try {
                    return fn.apply(this, [req, res]) as Response;
                } catch (error) {
                    AppLogger.error(`${className}.${methodName}`, error);
                    return res
                        .status(CONSTANTS.HTTP_STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR)
                        .json(APIResponse.error(MESSAGES.ERROR.ERR_INTERNAL_SERVER_ERROR));
                }
            };
    }

    /**
     * Wrap function in a `try` `catch` block
     *
     * When an error is thrown, return `exceptionResult`
     */
    public static TryCatchWrapper<T>(exceptionResult: T) {
        return (target: Function, propertyKey: string, descriptor: TypedPropertyDescriptor<(...params: any[]) => Promise<T> | T>) => {
            if (!descriptor.value) return;
            const fn = descriptor.value;

            descriptor.value = Helpers.isAsync(fn)
                ? async (...params: any[]) => {
                    try {
                        return (await fn.apply(this, params)) as Promise<T>;
                    } catch (error) {
                        return exceptionResult;
                    }
                }
                : (...params: any[]) => {
                    try {
                        return fn.apply(this, params) as T;
                    } catch (error) {
                        return exceptionResult;
                    }
                };
        };
    }
}
