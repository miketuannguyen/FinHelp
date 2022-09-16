import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('m_users')
export default class UserEntity {
    @PrimaryColumn({ type: 'varchar', length: 20 }) username: string;

    @Column({ type: 'varchar', length: 64 }) password: string;

    @Column({ type: 'tinyint' }) is_active: number;

    @CreateDateColumn({ type: 'datetime' }) created_date: string;

    @UpdateDateColumn({ type: 'datetime' }) updated_date: string;
}
