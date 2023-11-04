import { AutoMap } from '@automapper/classes';
import { CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('d_ie_tags')
@Index(['ie_id', 'tag_id'], { unique: true })
export default class IETagEntity {
    @PrimaryColumn()
    @AutoMap()
        ie_id: number;

    @PrimaryColumn()
    @AutoMap()
        tag_id: number;

    @CreateDateColumn({ type: 'datetime' })
    @AutoMap()
        created_date: string;

    @UpdateDateColumn({ type: 'datetime' })
    @AutoMap()
        updated_date: string;
}
