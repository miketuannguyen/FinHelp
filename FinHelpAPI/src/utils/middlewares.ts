import { UserDTO } from '../dtos';
import { NextFunction, Response } from 'express';
import jwt = require('jsonwebtoken');
import APIResponse from './api-response';
import CONSTANTS from './constants';
import Helpers from './helpers';
import MESSAGES from './messages';
import { AuthenticatedRequest } from './types';

export default class Middlewares {
    /**
     * Authenticate middleware
     *
     * Verify access token in request headers
     */
    public static authenticate() {
        return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
            try {
                const { access_token: accessToken } = req.headers;
                if (!Helpers.isNotBlank(accessToken)) {
                    return res.status(CONSTANTS.HTTP_STATUS_CODES.CLIENT_ERROR.UNAUTHORIZED).json(APIResponse.error(MESSAGES.ERROR.ERR_UNAUTHORIZED));
                }

                const secret = process.env.ACCESS_TOKEN_SECRET;
                if (!Helpers.isNotBlank(secret)) {
                    return res
                        .status(CONSTANTS.HTTP_STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR)
                        .json(APIResponse.error(MESSAGES.ERROR.ERR_INTERNAL_SERVER_ERROR));
                }

                const payload = jwt.verify(accessToken, secret);
                if (!UserDTO.is(payload)) {
                    return res.status(CONSTANTS.HTTP_STATUS_CODES.CLIENT_ERROR.UNAUTHORIZED).json(APIResponse.error(MESSAGES.ERROR.ERR_UNAUTHORIZED));
                }

                req.userPayload = payload;

                next();
            } catch (e) {
                return res.status(CONSTANTS.HTTP_STATUS_CODES.CLIENT_ERROR.UNAUTHORIZED).json(APIResponse.error(MESSAGES.ERROR.ERR_UNAUTHORIZED));
            }
        };
    }
}
