import { Repository } from 'typeorm';
import { MySQLDatabase } from '../../database';
import { TagEntity } from '../../entities';

export default class TagRepository {
    private static _instance: Repository<TagEntity>;

    /** Constructor */
    private constructor() {}

    /**
     * Get instance
     */
    public static getInstance() {
        if (!this._instance) {
            this._instance = MySQLDatabase.getManager().getRepository(TagEntity).extend({});
        }
        return this._instance;
    }
}
