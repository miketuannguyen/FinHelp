import { BaseValidator } from '../../includes';
import Joi = require('joi');

export default class TagValidator extends BaseValidator {
    public static createSchema = Joi.object<{
        name: string;
    }>({
        name: Joi.string().required().messages({
            'any.required': 'required',
            'string.base': 'required',
            'string.empty': 'required'
        }),
    }).options({
        abortEarly: false,
    });
}
