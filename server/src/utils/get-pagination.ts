import { PaginationDTO, PaginationMetadataDTO } from '../types';

export const getPaginationInfo = (pagination?: PaginationDTO) => {
  const hasPagination =
    pagination &&
    ('skip' as keyof PaginationDTO) in pagination &&
    ('take' as keyof PaginationDTO) in pagination;
  const take = hasPagination ? pagination.take : undefined;
  const skip = hasPagination ? pagination.skip * pagination.skip : undefined;

  return {
    take: take || undefined,
    skip: skip || 0,
  };
};
export type PaginationInfo = ReturnType<typeof getPaginationInfo>;

export const formPaginationMetadata = (
  paginationInfo: PaginationInfo,
  itemsCount: number,
): PaginationMetadataDTO => {
  return {
    page: Math.ceil(paginationInfo.skip / paginationInfo.take) || 0,
    items_count: itemsCount,
  };
};
