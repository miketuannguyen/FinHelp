import { Injectable } from '@nestjs/common';
import { TagDTO } from 'src/dtos';
import { TagEntity } from 'src/entities';
import { BaseService } from 'src/includes';
import { TagRepository } from 'src/repository/tag.repository';
import { Helpers, mapper } from 'src/utils';

@Injectable()
export class TagService extends BaseService {
    /** Constructor */
    constructor(private readonly _tagRepo: TagRepository) {
        super();
    }

    /**
     * Get tag list of user
     * @param username - `m_users.username`
     */
    public async getListOfUser(
        username: string,
        searchParams?: {
            keyword?: string,
        },
    ): Promise<TagDTO[] | null> {
        if (!Helpers.isString(username)) return null;

        const query = this._tagRepo
            .createQueryBuilder('d_tags')
            .where('d_tags.username = :username AND d_tags.is_deleted = 0', { username });

        if (Helpers.isString(searchParams?.keyword)) {
            const queryParams = {
                keyword: `%${searchParams.keyword}%`
            };
            query.andWhere('d_tags.name LIKE :keyword OR d_tags.desc LIKE :keyword', queryParams);
        }

        const tagEntityList = await query.getMany();
        if (!Helpers.isFilledArray(tagEntityList)) return null;

        return tagEntityList.map((tag) => mapper.map(tag, TagEntity, TagDTO));
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
    public async createTag(tag: TagDTO): Promise<TagDTO | null> {
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
    public async updateTag(tag: Pick<TagDTO, 'id' | 'name' | 'desc'>): Promise<TagDTO | null> {
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
}
