import { createMap } from '@automapper/core';
import { UserDTO } from '../../dtos/';
import { UserEntity } from '../../entities';
import { Helpers, mapper } from '../../utils';
import UserRepository from './user.repository';

export default class UserService {
    /**
     * Login user
     * @param username - `m_users.username`
     * @param password - `m_users.password`
     * @returns user entity
     */
    public static async login(username: string, password: string) {
        const user = await UserRepository.findByUsername(username);
        if (Helpers.isEmptyObject(user)) return null;
        if (user?.password !== password) return null;

        createMap(mapper, UserEntity, UserDTO);
        return mapper.map(user, UserEntity, UserDTO);
    }
}
