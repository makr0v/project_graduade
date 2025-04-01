import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { GroupEntity, ProductEntity } from '../entities';
import {
  FindGroupBySlugContract,
  FindGroupContract,
  FindGroupsListContract,
} from './contracts';
import { formPaginationMetadata, getPaginationInfo } from '../utils';
import { ApiGroupDTO, ApiGroupProductDTO } from './dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  async findOneBySlug(
    params: FindGroupBySlugContract.RequestParams,
    query: FindGroupBySlugContract.RequestQuery,
  ): Promise<FindGroupBySlugContract.ResponseBody> {
    const group = await this.groupRepository.findOne({
      where: {
        slug: params.groupSlug,
        variant: query.variant,
      },
      relations: {
        items: {
          product: true,
        },
      },
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return GroupService.mapGroup(group);
  }

  async findOneById(
    params: FindGroupContract.RequestParams,
    query: FindGroupContract.RequestQuery,
  ): Promise<FindGroupContract.ResponseBody> {
    const group = await this.groupRepository.findOne({
      where: {
        id: params.groupId,
        variant: query.variant,
      },
      relations: {
        items: {
          product: true,
        },
      },
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return GroupService.mapGroup(group);
  }

  async findMany(
    query: FindGroupsListContract.RequestQuery,
  ): Promise<FindGroupsListContract.ResponseBody> {
    const pagination = getPaginationInfo(query);

    const groups = await this.groupRepository.find({
      take: query.take,
      skip: query.skip,
      where: {
        variant: query.variant,
      },
      order: {
        createdAt: 'desc',
      },
      relations: {
        items: {
          product: true,
        },
      },
    });

    return {
      groups: groups.map(GroupService.mapGroup),
      pagination: formPaginationMetadata(pagination, groups.length),
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace GroupService {
  const mapGroupProduct = (product: ProductEntity): ApiGroupProductDTO => {
    return {
      id: product.id,
      slug: product.slug,
      image: product.image,
      name: product.name,
      description: product.description,
      care: product.care,
      price: product.price,
      discount: product.discount,
      material: product.material,
      season: product.season,
      sizes: product.sizes,
      colors: product.colors,
      age: product.age,
    };
  };
  export const mapGroup = (group: GroupEntity): ApiGroupDTO => {
    return {
      id: group.id,
      name: group.name,
      description: group.description,
      image: group.image,
      slug: group.slug,
      variant: group.variant,
      products: group.items.map(({ product }) => mapGroupProduct(product)),
    };
  };
}
