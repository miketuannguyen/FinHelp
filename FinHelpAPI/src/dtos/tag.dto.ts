import { AutoMap } from '@automapper/classes';

export default class TagDTO {
    @AutoMap() id: number;
    @AutoMap() username: string;
    @AutoMap() name: string;
    @AutoMap() desc: string;
    @AutoMap() is_deleted: 0 | 1;
    @AutoMap() created_date: string;
    @AutoMap() updated_date: string;
}
