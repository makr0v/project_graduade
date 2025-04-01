import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { BaseDomainDTO } from '../../types';
import { Group, GroupVariant } from './group.interface';

export class GroupDTO extends BaseDomainDTO implements Group {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  slug: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(GroupVariant)
  variant: GroupVariant;
}
