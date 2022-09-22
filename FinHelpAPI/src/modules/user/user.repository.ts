import { MySQLDatabase } from '../../database';
import { UserEntity } from '../../entities';

export default class UserRepository {
    /**
     * Find user by username
     * @param username - `m_users.username`
     * @returns `m_users` instance
     */
    public static async findByUsername(username: string) {
        const repo = MySQLDatabase.getManager().getRepository(UserEntity);
        return repo.findOneBy({ username });
    }
}
