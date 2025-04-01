import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { ProductDTO } from '../../entities';
import { ApiGroupDTO } from '../../groups/dto';

export class ApiProductGroupDTO extends OmitType(ApiGroupDTO, ['products']) {}
export class ApiProductDTO extends OmitType(ProductDTO, [
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {
  @ApiProperty({ type: [ApiProductGroupDTO] })
  groups: ApiProductGroupDTO[];
}
export class ApiProductCreateDTO extends OmitType(ApiProductDTO, [
  'id',
  'groups',
]) {}
export class ApiProductUpdateDTO extends PartialType(ApiProductCreateDTO) {}
