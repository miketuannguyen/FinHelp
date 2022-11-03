import { createMap } from '@automapper/core';
import { TagEntity, UserEntity } from '../entities';
import { mapper } from '../utils';
import TagDTO from './tag.dto';
import UserDTO from './user.dto';

export { default as TagDTO } from './tag.dto';
export { default as UserDTO } from './user.dto';

/**
 * Initialize mapper
 */
export const initMapper = () => {
    createMap(mapper, UserEntity, UserDTO);
    createMap(mapper, UserDTO, UserEntity);
    createMap(mapper, TagEntity, TagDTO);
    createMap(mapper, TagDTO, TagEntity);
};
