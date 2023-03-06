import * as Joi from 'joi';

export const saveSchema = Joi.object<{
    name: string;
}>({
    name: Joi.string().min(3).max(100).required().messages({
        'any.required': 'required',
        'string.base': 'required',
        'string.empty': 'required',
        'string.min': 'minlength',
        'string.max': 'maxlength'
    })
}).options({
    abortEarly: false
}).unknown(true);
