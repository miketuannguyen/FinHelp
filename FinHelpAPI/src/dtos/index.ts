import { createMap } from '@automapper/core';

import { TagEntity, UserEntity, IEEntity, IETagEntity } from 'src/entities';
import { mapper } from 'src/utils/mapper';

import { TagDTO } from './tag.dto';
import { UserDTO } from './user.dto';
import { IEDTO } from './ie.dto';
import { IETagDTO } from './ie_tag.dto';

export * from './tag.dto';
export * from './user.dto';
export * from './ie.dto';
export * from './ie_tag.dto';

/**
 * Initialize mapper
 */
export const initMapper = () => {
    createMap(mapper, UserEntity, UserDTO);
    createMap(mapper, UserDTO, UserEntity);

    createMap(mapper, TagEntity, TagDTO);
    createMap(mapper, TagDTO, TagEntity);

    createMap(mapper, IEEntity, IEDTO);
    createMap(mapper, IEDTO, IEEntity);

    createMap(mapper, IETagEntity, IETagDTO);
    createMap(mapper, IETagDTO, IETagEntity);
};
