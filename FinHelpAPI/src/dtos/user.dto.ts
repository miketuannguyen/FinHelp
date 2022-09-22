import { AutoMap } from '@automapper/classes';

export default class UserDTO {
    @AutoMap() username: string;
    @AutoMap() is_active: number;
    @AutoMap() created_date: string;
    @AutoMap() updated_date: string;
}
