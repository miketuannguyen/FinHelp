import { UserDTO } from '../../dtos/';
import { UserEntity } from '../../entities';
import { CONSTANTS, Helpers, mapper } from '../../utils';
import UserRepository from './user.repository';
import jwt = require('jsonwebtoken');

export default class UserService {
    /**
     * Login user
     * @param username - `m_users.username`
     * @param password - `m_users.password`
     * @returns user entity
     */
    public static async login(username: string, password: string): Promise<(UserDTO & { access_token: string }) | null> {
        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (!Helpers.isString(secret)) return null;

        const user = await UserRepository.findByUsername(username);
        if (Helpers.isEmptyObject(user)) return null;
        if (user?.password !== password) return null;

        const userDTO = mapper.map(user, UserEntity, UserDTO);

        // jwt need userDTO to be plain object
        const accessToken = jwt.sign({ ...userDTO }, secret, { expiresIn: CONSTANTS.ACCESS_TOKEN_EXPIRED_TIME });

        return { ...userDTO, access_token: accessToken };
    }

    /**
     * Find user by username
     * @param username - `m_users.username`
     */
    public static async findByUsername(username: string) {
        if (!Helpers.isString(username)) return null;

        const user = await UserRepository.findByUsername(username);
        if (Helpers.isEmptyObject(user)) return null;

        return mapper.map(user, UserEntity, UserDTO);
    }
}
