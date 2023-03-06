import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagRepository } from 'src/repository/tag.repository';

@Module({
    controllers: [TagController],
    providers: [TagService, TagRepository],
})
export class TagModule {}
