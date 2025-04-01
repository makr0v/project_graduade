import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { GroupVariant } from '../../entities';
import { ApiGroupDTO } from '../dto';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FindGroupBySlugContract {
  export const path = `slug/:groupSlug`;

  export class RequestParams {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    groupSlug: string;
  }
  export class RequestQuery {
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(GroupVariant)
    variant: GroupVariant;
  }

  export class ResponseBody extends ApiGroupDTO {}
}
