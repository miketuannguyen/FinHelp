import { BaseValidator } from '../../includes';
import Joi = require('joi');

export default class UserValidator extends BaseValidator {
    public static loginSchema = Joi.object<{
        username: string;
        password: string;
    }>({
        username: Joi.required().messages({ 'any.required': 'validation.required' }),
        password: Joi.required().messages({ 'any.required': 'validation.required' }),
    }).options({
        abortEarly: false,
    });
}
