import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { GroupVariant } from '../../entities';
import { ApiGroupDTO } from '../dto';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FindGroupContract {
  export const path = `:groupId`;

  export class RequestParams {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    groupId: number;
  }
  export class RequestQuery {
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(GroupVariant)
    variant: GroupVariant;
  }

  export class ResponseBody extends ApiGroupDTO {}
}
