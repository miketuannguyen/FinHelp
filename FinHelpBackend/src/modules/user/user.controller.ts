import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { TagDTO, UserDTO } from 'src/dtos';
import { BaseController } from 'src/includes';
import { ValidationPipe } from 'src/pipes';
import { APIListResponse, APIResponse, Helpers, MESSAGES } from 'src/utils';
import { AuthenticatedRequest, CommonSearchQuery } from 'src/utils/types';
import ROUTES from '../routes';
import * as TagSchemas from '../tag/tag.schemas';
import { TagService } from '../tag/tag.service';
import { UserService } from './user.service';

@Controller(ROUTES.USER.MODULE)
export class UserController extends BaseController {
    /** Constructor */
    constructor(private readonly _userService: UserService, private readonly _tagService: TagService) {
        super();
    }

    /**
     * Get user profile
     * @param req - Authenticated request
     * @param res - User data
     */
    @Get(ROUTES.USER.PROFILE)
    public async getProfile(@Req() req: AuthenticatedRequest, @Res() res: Response<APIResponse<UserDTO | undefined>>) {
        try {
            const profile = await this._userService.findByUsername(req.userPayload.username);
            if (!profile) {
                const unauthorizedErrRes = APIResponse.error(MESSAGES.ERROR.ERR_UNAUTHORIZED);
                return res.status(HttpStatus.UNAUTHORIZED).json(unauthorizedErrRes);
            }

            const successRes = APIResponse.success(MESSAGES.SUCCESS.SUCCESS, profile);
            return res.status(HttpStatus.OK).json(successRes);
        } catch (e) {
            this._logger.error(this.getProfile.name, e);
            const errRes = APIResponse.error(MESSAGES.ERROR.ERR_INTERNAL_SERVER_ERROR);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errRes);
        }
    }

    /**
     * Get tag list of user
     * @param req - authenticated request
     * @param res - tag DTO list
     * @param query - get tag list having name and desc LIKE `keyword`
     */
    @Get(ROUTES.TAG.MODULE)
    public async getTagListOfUser(
        @Req() req: AuthenticatedRequest,
        @Res() res: Response<APIListResponse<TagDTO>>,
        @Query() query: CommonSearchQuery
    ) {
        try {
            const total = await this._tagService.getTotalOfUser(req.userPayload.username, query);
            let list: TagDTO[] = [];
            if (total > 0) {
                list = await this._tagService.getListOfUser(req.userPayload.username, query);
                if (!Helpers.isFilledArray(list)) {
                    const errRes = APIListResponse.error(MESSAGES.ERROR.ERR_INTERNAL_SERVER_ERROR);
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errRes);
                }
            }

            const successRes = APIListResponse.success<TagDTO>(MESSAGES.SUCCESS.SUCCESS, list, total);
            return res.status(HttpStatus.OK).json(successRes);
        } catch (e) {
            this._logger.error(this.getTagListOfUser.name, e);
            const errRes = APIListResponse.error(MESSAGES.ERROR.ERR_INTERNAL_SERVER_ERROR);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errRes);
        }
    }

    /**
     * Get tag of user
     * @param id - tag id
     * @param req - authenticated request
     * @param res - tag DTO
     */
    @Get(`${ROUTES.TAG.MODULE}/:id`)
    public async getTagOfUser(
        @Param('id') id: number,
        @Req() req: AuthenticatedRequest,
        @Res() res: Response<APIResponse<TagDTO | undefined>>
    ) {
        try {
            const tag = await this._tagService.getById(id);
            if (!tag) {
                const errRes = APIResponse.error(MESSAGES.ERROR.ERR_NOT_FOUND);
                return res.status(HttpStatus.BAD_REQUEST).json(errRes);
            }
            if (tag.username !== req.userPayload.username) {
                const errRes = APIResponse.error(MESSAGES.ERROR.ERR_BAD_REQUEST);
                return res.status(HttpStatus.BAD_REQUEST).json(errRes);
            }

            const successRes = APIResponse.success<TagDTO>(MESSAGES.SUCCESS.SUCCESS, tag);
            return res.status(HttpStatus.OK).json(successRes);
        } catch (e) {
            this._logger.error(this.getTagOfUser.name, e);
            const errRes = APIResponse.error(MESSAGES.ERROR.ERR_INTERNAL_SERVER_ERROR);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errRes);
        }
    }

    /**
     * Create tag of user
     * @param req - authenticated request
     * @param res - created tag DTO
     * @param body - tag data
     */
    @Post(ROUTES.TAG.MODULE)
    @UsePipes(new ValidationPipe(TagSchemas.saveSchema))
    public async createTagOfUser(
        @Req() req: AuthenticatedRequest,
        @Res() res: Response<APIResponse<TagDTO | undefined>>,
        @Body() body: {
            name: string;
            desc: string;
        }
    ) {
        try {
            const tag = new TagDTO();
            tag.username = req.userPayload.username;
            tag.name = body.name;
            tag.desc = body.desc;

            const newTag = await this._tagService.createTag(tag);
            if (Helpers.isEmptyObject(newTag)) {
                const errRes = APIResponse.error<undefined>(MESSAGES.ERROR.ERR_INTERNAL_SERVER_ERROR);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errRes);
            }

            const successRes = APIResponse.success<TagDTO | undefined>(MESSAGES.SUCCESS.SUCCESS, newTag);
            return res.status(HttpStatus.OK).json(successRes);
        } catch (e) {
            this._logger.error(this.createTagOfUser.name, e);
            const errRes = APIResponse.error(MESSAGES.ERROR.ERR_INTERNAL_SERVER_ERROR);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errRes);
        }
    }

    /**
     * Update tag of user
     * @param id - tag id
     * @param body - tag data
     * @param req - authenticated request contains tag data
     * @param res - newly updated tag DTO
     */
    @Put(`${ROUTES.TAG.MODULE}/:id`)
    // @UsePipes(new ValidationPipe(TagSchemas.saveSchema))
    public async updateTagOfUser(
        @Param('id') id: number,
        @Body(new ValidationPipe(TagSchemas.saveSchema)) body: {
            name: string;
            desc: string;
        },
        @Req() req: AuthenticatedRequest,
        @Res() res: Response<APIResponse<TagDTO | undefined>>
    ) {
        try {
            const tag = await this._tagService.getById(id);
            if (!tag) {
                const errRes = APIResponse.error(MESSAGES.ERROR.ERR_NOT_FOUND);
                return res.status(HttpStatus.BAD_REQUEST).json(errRes);
            }
            if (tag.username !== req.userPayload.username) {
                const errRes = APIResponse.error(MESSAGES.ERROR.ERR_BAD_REQUEST);
                return res.status(HttpStatus.BAD_REQUEST).json(errRes);
            }

            tag.name = body.name;
            tag.desc = body.desc;

            const updatedTag = await this._tagService.updateTag(tag);
            if (!updatedTag) {
                const errRes = APIResponse.error<undefined>(MESSAGES.ERROR.ERR_INTERNAL_SERVER_ERROR);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errRes);
            }

            const successRes = APIResponse.success<TagDTO | undefined>(MESSAGES.SUCCESS.SUCCESS, updatedTag);
            return res.status(HttpStatus.OK).json(successRes);
        } catch (e) {
            this._logger.error(this.updateTagOfUser.name, e);
            const errRes = APIResponse.error(MESSAGES.ERROR.ERR_INTERNAL_SERVER_ERROR);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errRes);
        }
    }

    /**
     * Soft delete tag of user
     * @param id - tag id
     * @param req - authenticated request
     * @param res - success / fail
     */
    @Delete(`${ROUTES.TAG.MODULE}/:id`)
    public async deleteTagOfUser(
        @Param('id') id: number,
        @Req() req: AuthenticatedRequest,
        @Res() res: Response<APIResponse<TagDTO | undefined>>
    ) {
        try {
            const tag = await this._tagService.getById(id);
            if (!tag) {
                const errRes = APIResponse.error(MESSAGES.ERROR.ERR_NOT_FOUND);
                return res.status(HttpStatus.BAD_REQUEST).json(errRes);
            }
            if (tag.username !== req.userPayload.username) {
                const errRes = APIResponse.error(MESSAGES.ERROR.ERR_BAD_REQUEST);
                return res.status(HttpStatus.BAD_REQUEST).json(errRes);
            }

            const isSuccess = await this._tagService.deleteById(id);
            if (!isSuccess) {
                const errRes = APIResponse.error(MESSAGES.ERROR.ERR_INTERNAL_SERVER_ERROR);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errRes);
            }

            const successRes = APIResponse.success<TagDTO | undefined>(MESSAGES.SUCCESS.SUCCESS);
            return res.status(HttpStatus.OK).json(successRes);
        } catch (e) {
            this._logger.error(this.deleteTagOfUser.name, e);
            const errRes = APIResponse.error(MESSAGES.ERROR.ERR_INTERNAL_SERVER_ERROR);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errRes);
        }
    }
}
