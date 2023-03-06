import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { ValidationException } from 'src/exceptions';
import { Helpers } from 'src/utils';

@Injectable()
export class ValidationPipe implements PipeTransform {
    /** Constructor */
    constructor(private schema: ObjectSchema) {}

    /**
     * Validate request body
     */
    public transform(body: any, metadata: ArgumentMetadata) {
        const errors = Helpers.validate(this.schema, body);
        if (!Helpers.isEmptyObject(errors)) {
            throw new ValidationException(errors);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return body;
    }
}
