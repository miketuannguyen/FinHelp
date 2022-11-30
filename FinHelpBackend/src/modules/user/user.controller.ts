import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { BaseController } from 'src/includes';
import { AuthenticatedRequest } from 'src/utils/types';
import ROUTES from '../routes';
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
            this._logger.error('getProfile', e);
            const errRes = APIResponse.error(MESSAGES.ERROR.ERR_INTERNAL_SERVER_ERROR);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errRes);
        }
    }
}
