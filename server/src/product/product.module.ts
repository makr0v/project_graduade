import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { GroupEntity, GroupItemEntity, ProductEntity } from '../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, GroupEntity, GroupItemEntity]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
