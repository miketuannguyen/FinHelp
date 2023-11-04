import { AutoMap } from '@automapper/classes';

export class IETagDTO {
    @AutoMap() ie_id: number;
    @AutoMap() tag_id: number;
    @AutoMap() created_date: string;
    @AutoMap() updated_date: string;
}
