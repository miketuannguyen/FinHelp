import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import IEEntity from './ie.entity';
import IETagEntity from './ie_tag.entity';
import TagEntity from './tag.entity';
import UserEntity from './user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, TagEntity, IEEntity, IETagEntity])],
    exports: [TypeOrmModule]
})
export class EntityModule {}
