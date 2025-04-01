import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PaginatedQueryDTO, PaginatedResponseDTO } from '../../types';
import { GroupVariant } from '../../entities';
import { ApiGroupDTO } from '../dto';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FindGroupsListContract {
  export const path = ``;

  export class RequestQuery extends PaginatedQueryDTO {
    @IsNotEmpty()
    @IsEnum(GroupVariant)
    variant: GroupVariant;
  }

  export class ResponseBody extends PaginatedResponseDTO {
    @ApiProperty({ type: [ApiGroupDTO] })
    groups: ApiGroupDTO[];
  }
}
