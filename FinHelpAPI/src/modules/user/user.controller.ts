import { Request, Response } from 'express';
import { MySQLDatabase } from '../../database';
import { UserEntity } from '../../entities';
import { APIResponse, AppLogger, CONSTANTS, MESSAGES } from '../../utils';

export default class UserController {
    /**
     * Get user list
     * @param _ - request
     * @param  res - response
     * @returns user list
     */
    public static async getList(_: Request, res: Response) {
        try {
            const userList = await MySQLDatabase.getManager().find(UserEntity);
            return res.status(CONSTANTS.HTTP_STATUS_CODES.SUCCESS.OK).json(new APIResponse(MESSAGES.SUCCESS.SUCCESS, userList));
        } catch (e) {
            AppLogger.error(this.getList.name, e);
            return res
                .status(CONSTANTS.HTTP_STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR)
                .json(new APIResponse(MESSAGES.ERROR.ERR_INTERNAL_SERVER_ERROR));
        }
    }
}
