import { IsInt, IsNotEmpty, IsDate } from 'class-validator';

import { BaseDomain } from './base-domain.interface';

export class BaseDomainDTO implements BaseDomain {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
  @IsNotEmpty()
  @IsDate()
  deletedAt: Date;
}
