import { Module } from '@nestjs/common';
import { IERepository, TagRepository, UserRepository } from 'src/repository';
import { IEService } from '../ie/ie.service';
import { TagService } from '../tag/tag.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository, TagService, TagRepository, IEService, IERepository]
})
export class UserModule {}
