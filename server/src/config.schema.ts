import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class ConfigSchema {
  @IsNotEmpty()
  @IsString()
  DATABASE_NAME: string;
  @IsNotEmpty()
  @IsString()
  DATABASE_HOST: string;
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(65535)
  DATABASE_PORT: number;
  @IsNotEmpty()
  @IsString()
  DATABASE_USERNAME: string;
  @IsNotEmpty()
  @IsString()
  DATABASE_PASSWORD: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(65535)
  SERVER_PORT: number;
}
