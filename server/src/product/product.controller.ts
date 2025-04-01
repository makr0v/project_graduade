import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductService } from './product.service';
import {
  FindProductsListContract,
  FindProductContract,
  ProductsContract,
  FindProductBySlugContract,
} from './contracts';

@ApiTags(ProductsContract.path)
@Controller(ProductsContract.path)
export class ProductController {
  constructor(private readonly groupService: ProductService) {}

  @Get(FindProductBySlugContract.path)
  async findOneBySlug(
    @Param() params: FindProductBySlugContract.RequestParams,
  ): Promise<FindProductBySlugContract.ResponseBody> {
    return this.groupService.findOneBySlug(params);
  }

  @Get(FindProductContract.path)
  async findOneById(
    @Param() params: FindProductContract.RequestParams,
  ): Promise<FindProductContract.ResponseBody> {
    return this.groupService.findOneById(params);
  }

  @Get(FindProductsListContract.path)
  async findMany(
    @Query() query: FindProductsListContract.RequestQuery,
  ): Promise<FindProductsListContract.ResponseBody> {
    return this.groupService.findMany(query);
  }
}
