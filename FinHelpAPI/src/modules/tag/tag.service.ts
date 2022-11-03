import { TagEntity } from '../../entities';
import { TagDTO } from '../../dtos';
import { Helpers, mapper } from '../../utils';
import TagRepository from './tag.repository';
import UserRepository from '../../modules/user/user.repository';

export default class TagService {
    /**
     * Create tag of user
     * @param username - `m_users.username`
     * @param tag - tag data
     */
    public static async createTagOfUser(username: string, tag: TagDTO) {
        if (!Helpers.isString(username)) return null;

        const user = await UserRepository.getInstance().findOneBy({ username });
        if (!user) return null;

        const tagEntity = mapper.map(tag, TagDTO, TagEntity);
        tagEntity.username = username;
        return await TagRepository.getInstance().save(tagEntity);
    }
}
