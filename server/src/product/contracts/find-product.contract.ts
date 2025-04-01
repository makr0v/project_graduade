import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { ApiProductDTO } from '../dto';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FindProductContract {
  export const path = `:productId`;

  export class RequestParams {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    productId: number;
  }

  export class ResponseBody extends ApiProductDTO {}
}
