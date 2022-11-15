import { Injectable } from '@nestjs/common';
import UserEntity from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    /** Constructor */
    constructor(private _dataSource: DataSource) {
        super(UserEntity, _dataSource.createEntityManager());
    }
}
