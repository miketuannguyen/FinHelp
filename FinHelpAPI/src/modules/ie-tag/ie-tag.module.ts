import { Module } from '@nestjs/common';
import { IETagRepository } from 'src/repository';
import { IETagService } from './ie-tag.service';

@Module({
    providers: [IETagService, IETagRepository]
})
export class IETagModule {}
