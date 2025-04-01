import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { BaseDomainDTO } from '../../types';
import { Product, ProductColors } from './product.interface';

export class ProductDTO extends BaseDomainDTO implements Product {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  age: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  care: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  colors: ProductColors;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  discount: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  material: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  season: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @IsString()
  sizes: string[];
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  slug: string;
}
