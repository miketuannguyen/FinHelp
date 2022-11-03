import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('d_tags')
export default class TagEntity {
    @PrimaryGeneratedColumn()
    @AutoMap()
        id: number;

    @Column({ type: 'varchar', length: 20 })
    @AutoMap()
        username: string;

    @Column({ type: 'varchar', length: 255 })
    @AutoMap()
        name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    @AutoMap()
        desc: string;

    @Column({ type: 'tinyint', default: 0 })
    @AutoMap()
        is_deleted: 0 | 1;

    @CreateDateColumn({ type: 'datetime' })
    @AutoMap()
        created_date: string;

    @UpdateDateColumn({ type: 'datetime' })
    @AutoMap()
        updated_date: string;
}
