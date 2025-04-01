import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { ApiProductDTO } from '../dto';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FindProductBySlugContract {
  export const path = `/slug/:productSlug`;

  export class RequestParams {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    productSlug: string;
  }

  export class ResponseBody extends ApiProductDTO {}
}
