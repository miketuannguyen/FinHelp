import { AutoMap } from '@automapper/classes';
import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('m_users')
export default class UserEntity {
    @PrimaryColumn({ type: 'varchar', length: 20 })
    @AutoMap()
        username: string;

    @Column({ type: 'varchar', length: 64 })
    @AutoMap()
        password: string;

    @Column({ type: 'tinyint' })
    @AutoMap()
        is_active: number;

    @CreateDateColumn({ type: 'datetime' })
    @AutoMap()
        created_date: string;

    @UpdateDateColumn({ type: 'datetime' })
    @AutoMap()
        updated_date: string;
}
