import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ValidationException } from 'src/exceptions';
import { APIResponse, MESSAGES } from 'src/utils';

/**
 * Response '400 Bad Request' on validation errors
 */
@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
    /**
     * Response '400 Bad Request' on validation errors
     */
    catch(exception: ValidationException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const errRes = APIResponse.error(MESSAGES.ERROR.ERR_VALIDATION, undefined, exception.errors);
        res.status(HttpStatus.BAD_REQUEST).json(errRes);
    }
}
