import { IsInt, IsNotEmpty } from 'class-validator';

import { BaseDomainDTO } from '../../types';
import { GroupItem } from './group-item.interface';

export class GroupItemDTO extends BaseDomainDTO implements GroupItem {
  @IsNotEmpty()
  @IsInt()
  product_id: number;
  @IsNotEmpty()
  @IsInt()
  group_id: number;
}
