import { Response } from 'express';
import { TagDTO } from '../../dtos';
import { APIResponse, CONSTANTS, Decorators, Helpers, MESSAGES } from '../../utils';
import { AuthenticatedRequest } from '../../utils/types';
import TagService from './tag.service';
import TagValidator from './tag.validator';

export default class TagController {
    /**
     * Create tag of user
     * @param req - `TagDTO` without `username`, `created_date`, `updated_date`
     * @param res - `TagEntity`
     */
    @Decorators.API
    public static async createTagOfUser(req: AuthenticatedRequest<unknown, unknown, TagDTO>, res: Response<APIResponse<TagDTO | undefined>>) {
        const errors = TagValidator.validate(TagValidator.createSchema, req.body);
        if (!Helpers.isEmptyObject(errors)) {
            return res.status(CONSTANTS.HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json(APIResponse.error(MESSAGES.ERROR.ERR_VALIDATION, undefined, errors));
        }
        const tag = await TagService.createTagOfUser(req.userPayload.username, req.body);
        if (!tag) {
            return res.status(CONSTANTS.HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json(APIResponse.error(MESSAGES.ERROR.ERR_CREATE));
        }
        return res.status(CONSTANTS.HTTP_STATUS_CODES.SUCCESS.OK).json(APIResponse.success(MESSAGES.SUCCESS.SUCCESS, tag));
    }
}
