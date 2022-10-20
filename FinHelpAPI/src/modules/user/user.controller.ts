import { UserDTO } from 'dtos';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from 'utils/types';
import { APIResponse, CONSTANTS, Decorators, Helpers, MESSAGES } from '../../utils';
import UserService from './user.service';
import UserValidator from './user.validator';

export default class UserController {
    /**
     * Login user
     * @param req - `username` and `password` are required
     * @param res - user DTO with access token
     */
    @Decorators.API
    public static async login(req: Request<unknown, unknown, {
        username: string,
        password: string
    }>, res: Response<APIResponse<(UserDTO & { access_token: string }) | undefined>>) {
        const errors = UserValidator.validate(UserValidator.loginSchema, req.body);
        if (!Helpers.isEmptyObject(errors)) {
            return res.status(CONSTANTS.HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json(APIResponse.error(MESSAGES.ERROR.ERR_VALIDATION, undefined, errors));
        }

        const { username, password } = req.body;
        const loginRes = await UserService.login(username, password);
        if (!loginRes) {
            return res.status(CONSTANTS.HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json(APIResponse.error(MESSAGES.ERROR.ERR_LOGIN));
        }
        return res.status(CONSTANTS.HTTP_STATUS_CODES.SUCCESS.OK).json(APIResponse.success(MESSAGES.SUCCESS.SUCCESS, loginRes));
    }

    /**
     * Get user profile
     * @param req - Authenticated request
     * @param res - User data
     */
    @Decorators.API
    public static async getProfile(req: AuthenticatedRequest, res: Response) {
        const profile = await UserService.findByUsername(req.userPayload.username);
        if (!profile) {
            return res.status(CONSTANTS.HTTP_STATUS_CODES.CLIENT_ERROR.UNAUTHORIZED).json(APIResponse.error(MESSAGES.ERROR.ERR_UNAUTHORIZED));
        }
        return res.status(CONSTANTS.HTTP_STATUS_CODES.SUCCESS.OK).json(APIResponse.success(MESSAGES.SUCCESS.SUCCESS, profile));
    }
}
