import { createMap } from '@automapper/core';
import { UserEntity } from '../entities';
import { mapper } from '../utils';
import UserDTO from './user.dto';

export { default as UserDTO } from './user.dto';

/**
 * Initialize mapper
 */
export const initMapper = () => {
    createMap(mapper, UserEntity, UserDTO);
};
