import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GroupService } from './group.service';
import {
  FindGroupContract,
  FindGroupBySlugContract,
  FindGroupsListContract,
  GroupsContract,
} from './contracts';

@ApiTags(GroupsContract.path)
@Controller(GroupsContract.path)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get(FindGroupBySlugContract.path)
  async findOneBySlug(
    @Param() params: FindGroupBySlugContract.RequestParams,
    @Query() query: FindGroupBySlugContract.RequestQuery,
  ): Promise<FindGroupBySlugContract.ResponseBody> {
    return this.groupService.findOneBySlug(params, query);
  }

  @Get(FindGroupContract.path)
  async findOneById(
    @Param() params: FindGroupContract.RequestParams,
    @Query() query: FindGroupContract.RequestQuery,
  ): Promise<FindGroupContract.ResponseBody> {
    return this.groupService.findOneById(params, query);
  }

  @Get(FindGroupsListContract.path)
  async findMany(
    @Query() query: FindGroupsListContract.RequestQuery,
  ): Promise<FindGroupsListContract.ResponseBody> {
    return this.groupService.findMany(query);
  }
}
