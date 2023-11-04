import { Injectable } from '@nestjs/common';
import { IETagEntity } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class IETagRepository extends Repository<IETagEntity> {
    /** Constructor */
    constructor(private readonly _dataSource: DataSource) {
        super(IETagEntity, _dataSource.createEntityManager());
    }
}
