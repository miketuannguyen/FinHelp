import { BadRequestException } from '@nestjs/common';

export class ValidationException extends BadRequestException {
    /**
     * Construct a new validation exception
     * @param errors - validation errors
     */
    constructor(public errors: { [key: string]: string }) {
        super(errors);
    }
}
