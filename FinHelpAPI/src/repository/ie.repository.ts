import { Injectable } from '@nestjs/common';
import { IEEntity } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class IERepository extends Repository<IEEntity> {
    /** Constructor */
    constructor(private readonly _dataSource: DataSource) {
        super(IEEntity, _dataSource.createEntityManager());
    }
}
