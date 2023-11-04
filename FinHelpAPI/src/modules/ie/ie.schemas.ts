import * as Joi from 'joi';
import { IEEntity } from 'src/entities';

export const saveSchema = Joi.object<{
    amount: number;
    transaction_date: string;
    tag_id_list: number[];
}>({
    amount: Joi.number().min(IEEntity.AMOUNT_MIN).max(IEEntity.AMOUNT_MAX).required().messages({
        'any.required': 'required',
        'number.base': 'required',
        'number.min': 'min',
        'number.max': 'max'
    }),
    transaction_date: Joi.string().isoDate().required().messages({
        'any.required': 'required',
        'string.empty': 'required',
        'string.isoDate': 'required',
        'date.base': 'required'
    }),
    tag_id_list: Joi.array().required().items(Joi.number().required().min(1)).min(1).messages({
        'any.required': 'required',
        'array.base': 'required',
        'array.min': 'required',
        'array.includesRequiredUnknowns': 'required'
    })
}).options({
    abortEarly: false
}).unknown(true);
