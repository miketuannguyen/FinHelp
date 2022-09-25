import { createMap } from '@automapper/core';
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
    public static async login(username: string, password: string) {
        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (!Helpers.isNotBlank(secret)) return '';

        const user = await UserRepository.findByUsername(username);
        if (Helpers.isEmptyObject(user)) return null;
        if (user?.password !== password) return null;

        createMap(mapper, UserEntity, UserDTO);
        const userDTO = mapper.map(user, UserEntity, UserDTO);

        // jwt need userDTO to be plain object
        return jwt.sign({ ...userDTO }, secret, { expiresIn: CONSTANTS.ACCESS_TOKEN_EXPIRED_TIME });
    }
}
