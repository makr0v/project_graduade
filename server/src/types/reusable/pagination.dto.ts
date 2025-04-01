import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDTO {
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @Max(100)
  take: number;
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip: number;
}
export class PaginatedQueryDTO extends PaginationDTO {}

export class PaginationMetadataDTO {
  page: number;
  items_count: number;
}
export class PaginatedResponseDTO {
  pagination: PaginationMetadataDTO;
}
