import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('d_ies')
export default class IEEntity {
    public static AMOUNT_MIN = 1000;
    public static AMOUNT_MAX = 9999999999;

    @PrimaryGeneratedColumn()
    @AutoMap()
        id: number;

    @Column({ type: 'varchar', length: 20 })
    @AutoMap()
        username: string;

    @Column({ type: 'decimal', precision: 10, scale: 1 })
    @AutoMap()
        amount: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    @AutoMap()
        desc: string;

    @Column({ type: 'tinyint', default: 1 })
    @AutoMap()
        is_expense: 0 | 1;

    @Column({ type: 'date' })
    @AutoMap()
        transaction_date: string;

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
