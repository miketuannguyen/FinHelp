import { Injectable } from '@nestjs/common';
import { TagDTO } from 'src/dtos';
import { TagEntity } from 'src/entities';
import { BaseService } from 'src/includes';
import { TagRepository } from 'src/repository';
import { CONSTANTS, Helpers, mapper } from 'src/utils';
import { CommonSearchQuery } from 'src/utils/types';

@Injectable()
export class TagService extends BaseService {
    /** Constructor */
    constructor(private readonly _tagRepo: TagRepository) {
        super();
    }

    /**
     * Get tag list of user
     * @param username - `m_users.username`
     * @param params - search params
     */
    public async getListOfUser(
        username: string,
        params?: CommonSearchQuery
    ): Promise<TagDTO[] | null> {
        if (!Helpers.isString(username)) return null;

        const query = this._tagRepo
            .createQueryBuilder('d_tags')
            .where('d_tags.username = :username AND d_tags.is_deleted = 0', { username });

        if (Helpers.isString(params?.keyword)) {
            const keyword = String(params?.keyword);
            const queryParams = {
                keyword: `%${keyword}%`
            };
            query.andWhere('d_tags.name LIKE :keyword OR d_tags.desc LIKE :keyword', queryParams);
        }

        if (params?.page > 0) {
            const page = Number(params?.page);
            const skip = (page - 1) * CONSTANTS.ITEM_COUNT_PER_PAGE;
            query.skip(skip).take(CONSTANTS.ITEM_COUNT_PER_PAGE);
        }

        const tagEntityList = await query.getMany();
        if (!Helpers.isFilledArray(tagEntityList)) return [];

        return tagEntityList.map((tag) => mapper.map(tag, TagEntity, TagDTO));
    }

    /**
     * Get tag total number of user
     * @param username - `m_users.username`
     * @param params - search params
     */
    public async getTotalOfUser(
        username: string,
        params?: {
            keyword?: string
        }
    ): Promise<number> {
        if (!Helpers.isString(username)) return 0;

        const query = this._tagRepo
            .createQueryBuilder('d_tags')
            .where('d_tags.username = :username AND d_tags.is_deleted = 0', { username });

        if (Helpers.isString(params?.keyword)) {
            const keyword = String(params?.keyword);
            const queryParams = {
                keyword: `%${keyword}%`
            };
            query.andWhere('d_tags.name LIKE :keyword OR d_tags.desc LIKE :keyword', queryParams);
        }

        return query.getCount();
    }

    /**
     * Get tag by tag id
     * @param id - `d_tags.id`
     */
    public async getById(id: number): Promise<TagDTO | null> {
        if (!(id > 0)) return null;

        const tag = await this._tagRepo.findOneBy({ id });
        if (!tag) return null;

        return mapper.map(tag, TagEntity, TagDTO);
    }

    /**
     * Create tag
     * @param tag - tag DTO
     * @returns newly created tag
     */
    public async create(tag: TagDTO): Promise<TagDTO | null> {
        if (Helpers.isEmptyObject(tag)) return null;

        const tagEntity = mapper.map(tag, TagDTO, TagEntity);

        await this._tagRepo.save(tagEntity);

        return mapper.map(tagEntity, TagEntity, TagDTO);
    }

    /**
     * Update tag
     * @param tag - only name and desc are able to be updated
     * @returns newly updated tag
     */
    public async update(tag: Pick<TagDTO, 'id' | 'name' | 'desc'>): Promise<TagDTO | null> {
        if (Helpers.isEmptyObject(tag) || !(tag.id > 0)) return null;

        const tagEntity = await this.getById(tag.id);
        if (!tagEntity) return null;

        tagEntity.name = tag.name;
        tagEntity.desc = tag.desc;

        await this._tagRepo.save(tagEntity);

        return mapper.map(tagEntity, TagEntity, TagDTO);
    }

    /**
     * Soft delete tag
     * @param id - `d_tags.id`
     * @returns success / fail
     */
    public async deleteById(id: number): Promise<boolean> {
        if (!(id > 0)) return false;

        const tagEntity = await this.getById(id);
        if (!tagEntity) return false;

        tagEntity.is_deleted = 1;

        await this._tagRepo.save(tagEntity);

        return true;
    }

    /**
     * Get tag list by tag id list
     * @param idList - tag id list
     * @returns tag list, `null` if error
     */
    public async getByIdList(idList: number[]): Promise<TagDTO[] | null> {
        if (!Helpers.isFilledArray(idList)) return null;

        const query = this._tagRepo
            .createQueryBuilder('d_tags')
            .whereInIds(idList)
            .andWhere('d_tags.is_deleted = 0');

        const tagEntityList = await query.getMany();
        if (!Helpers.isFilledArray(tagEntityList)) return [];

        return tagEntityList.map((tag) => mapper.map(tag, TagEntity, TagDTO));
    }
}
