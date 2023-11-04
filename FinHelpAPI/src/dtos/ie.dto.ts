import { AutoMap } from '@automapper/classes';

export class IEDTO {
    @AutoMap() id: number;
    @AutoMap() username: string;
    @AutoMap() amount: number;
    @AutoMap() desc: string;
    @AutoMap() is_expense: 0 | 1;
    @AutoMap() transaction_date: string;
    @AutoMap() is_deleted: 0 | 1;
    @AutoMap() created_date: string;
    @AutoMap() updated_date: string;
}

export class CreateIEReqBody {
    @AutoMap() amount: number;
    @AutoMap() desc: string;
    @AutoMap() is_expense?: 0 | 1;
    @AutoMap() transaction_date: string;
    tag_id_list: number[];
}

export class CreateIEDTO extends IEDTO {
    tag_id_list: number[];
}
