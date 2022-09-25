import { Request, Response } from 'express';
import { AuthenticatedRequest } from 'utils/types';
import { APIResponse, CONSTANTS, Decorators, Helpers, MESSAGES } from '../../utils';
import UserService from './user.service';
import UserValidator from './user.validator';

export default class UserController {
    /**
     * Login user
     * @param req - `username` and `password` are required
     * @param res - access token
     */
    @Decorators.API
    public static async login(req: Request<unknown, unknown, {
        username: string,
        password: string
    }>, res: Response) {
        const errors = UserValidator.validate(UserValidator.loginSchema, req.body);
        if (!Helpers.isEmptyObject(errors)) {
            return res.status(CONSTANTS.HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json(APIResponse.error(MESSAGES.ERROR.ERR_VALIDATION, errors));
        }

        const { username, password } = req.body;
        const accessToken = await UserService.login(username, password);
        if (!Helpers.isNotBlank(accessToken)) {
            return res.status(CONSTANTS.HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json(APIResponse.error(MESSAGES.ERROR.ERR_LOGIN));
        }
        return res.status(CONSTANTS.HTTP_STATUS_CODES.SUCCESS.OK).json(APIResponse.success(MESSAGES.SUCCESS.SUCCESS, { access_token: accessToken }));
    }

    /**
     * Get user profile
     * @param req - Authenticated request
     * @param res - User data
     */
    @Decorators.API
    public static getProfile(req: AuthenticatedRequest, res: Response) {
        return res.status(CONSTANTS.HTTP_STATUS_CODES.SUCCESS.OK).json(APIResponse.success(MESSAGES.SUCCESS.SUCCESS, req.userPayload));
    }
}
