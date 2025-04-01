import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { GroupDTO, ProductDTO } from '../../entities';

export class ApiGroupProductDTO extends OmitType(ProductDTO, [
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {}

export class ApiGroupDTO extends OmitType(GroupDTO, [
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {
  @ApiProperty({ type: ApiGroupProductDTO })
  products: ApiGroupProductDTO[];
}
export class ApiGroupCreateDTO extends OmitType(ApiGroupDTO, [
  'id',
  'products',
]) {}
export class ApiGroupUpdateDTO extends PartialType(ApiGroupCreateDTO) {}
