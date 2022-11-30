import { Injectable } from '@nestjs/common';
import { TagEntity } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TagRepository extends Repository<TagEntity> {
    /** Constructor */
    constructor(private readonly _dataSource: DataSource) {
        super(TagEntity, _dataSource.createEntityManager());
    }
}
