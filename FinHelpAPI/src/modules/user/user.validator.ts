import { BaseValidator } from '../../includes';
import Joi = require('joi');

export default class UserValidator extends BaseValidator {
    public static loginSchema = Joi.object<{
        username: string;
        password: string;
    }>({
        username: Joi.string().messages({ 'string.base': 'required', 'string.empty': 'required' }),
        password: Joi.string().messages({ 'string.base': 'required', 'string.empty': 'required' }),
    }).options({
        abortEarly: false,
    });
}
