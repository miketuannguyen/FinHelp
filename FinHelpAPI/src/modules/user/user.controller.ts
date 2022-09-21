import { Request, Response } from 'express';
import { MySQLDatabase } from '../../database';
import { UserEntity } from '../../entities';
import { APIResponse, CONSTANTS, Decorators, MESSAGES } from '../../utils';

export default class UserController {
    /**
     * Get user list
     * @param _ - request
     * @param  res - response
     * @returns user list
     */
    @Decorators.API
    public static async getList(_: Request, res: Response) {
        const userList = await MySQLDatabase.getManager().find(UserEntity);
        return res.status(CONSTANTS.HTTP_STATUS_CODES.SUCCESS.OK).json(new APIResponse(MESSAGES.SUCCESS.SUCCESS, userList));
    }
}
