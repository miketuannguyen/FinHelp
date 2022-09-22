import Joi = require('joi');
import { Helpers } from '../utils';

export default class BaseValidator {
    /**
     * Validate object data with schema
     * @param schema - `Joi` schema
     * @param data - object data
     * @returns key - error message object, `null` if there is no error
     */
    public static validate<T extends { [key: string]: any }>(schema: Joi.ObjectSchema<T>, data: T) {
        const validationResult = schema.validate(data);
        if (!validationResult.error) return undefined;

        const errors: { [k: string]: string } = {};
        validationResult.error.details.forEach((errItem) => {
            if (errItem.context && Helpers.isNotBlank(errItem.context.key)) errors[errItem.context.key] = errItem.message;
        });
        return errors;
    }
}
