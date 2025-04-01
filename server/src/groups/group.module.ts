import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupEntity, GroupItemEntity, ProductEntity } from '../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, GroupEntity, GroupItemEntity]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
