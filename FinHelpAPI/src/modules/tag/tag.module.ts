import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagRepository } from 'src/repository';

@Module({
    providers: [TagService, TagRepository]
})
export class TagModule {}
