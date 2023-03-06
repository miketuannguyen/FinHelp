import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TagEntity from './tag.entity';
import UserEntity from './user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, TagEntity])],
    exports: [TypeOrmModule],
})
export class EntityModule {}
