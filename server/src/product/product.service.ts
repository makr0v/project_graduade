import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { GroupEntity, ProductEntity } from '../entities';
import {
  FindProductBySlugContract,
  FindProductContract,
  FindProductsListContract,
} from './contracts';
import { formPaginationMetadata, getPaginationInfo } from '../utils';
import { ApiProductDTO } from './dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findOneBySlug(
    params: FindProductBySlugContract.RequestParams,
  ): Promise<FindProductBySlugContract.ResponseBody> {
    const product = await this.productRepository.findOne({
      where: {
        slug: params.productSlug,
      },
      relations: {
        items: {
          group: true,
        },
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return ProductService.mapProduct(product);
  }

  async findOneById(
    params: FindProductContract.RequestParams,
  ): Promise<FindProductContract.ResponseBody> {
    const product = await this.productRepository.findOne({
      where: {
        id: params.productId,
      },
      relations: {
        items: {
          group: true,
        },
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return ProductService.mapProduct(product as any);
  }

  async findMany(
    query: FindProductsListContract.RequestQuery,
  ): Promise<FindProductsListContract.ResponseBody> {
    const pagination = getPaginationInfo(query);

    const products = await this.productRepository.find({
      take: query.take,
      skip: query.skip,
      order: {
        createdAt: 'desc',
      },
      relations: {
        items: {
          product: true,
          group: true,
        },
      },
    });

    return {
      products: products.map((product) => ProductService.mapProduct(product)),
      pagination: formPaginationMetadata(pagination, products.length),
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ProductService {
  export const mapProductGroup = (group: GroupEntity) => {
    return {
      id: group.id,
      slug: group.slug,
      name: group.name,
      variant: group.variant,
      description: group.description,
      image: group.image,
    };
  };
  export const mapProduct = (product: ProductEntity): ApiProductDTO => {
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
      groups: product.items.map(({ group }) => mapProductGroup(group)),
    };
  };
}
