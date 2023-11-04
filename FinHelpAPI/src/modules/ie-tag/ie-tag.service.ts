import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/includes';
import { IETagRepository } from 'src/repository';

@Injectable()
export class IETagService extends BaseService {
    /** Constructor */
    constructor(private readonly _ieTagRepo: IETagRepository) {
        super();
    }
}
