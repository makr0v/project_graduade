import { ApiProperty } from '@nestjs/swagger';

import { PaginatedQueryDTO, PaginatedResponseDTO } from '../../types';
import { ApiProductDTO } from '../dto';
import { ProductDTO } from '../../entities';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FindProductsListContract {
  export const path = ``;

  export class RequestQuery extends PaginatedQueryDTO {}

  export class ResponseBody extends PaginatedResponseDTO {
    @ApiProperty({ type: [ProductDTO] })
    products: ApiProductDTO[];
  }
}
