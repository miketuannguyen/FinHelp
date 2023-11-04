import { Module } from '@nestjs/common';
import { IERepository } from 'src/repository';
import { IEService } from './ie.service';

@Module({
    providers: [IEService, IERepository]
})
export class IEModule {}
