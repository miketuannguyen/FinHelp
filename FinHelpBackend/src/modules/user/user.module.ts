import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/repository';
import { TagService } from '../tag/tag.service';
import { TagRepository } from 'src/repository/tag.repository';

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository, TagService, TagRepository],
})
export class UserModule {}
