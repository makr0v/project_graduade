import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

import { ProductModule } from './product';
import { GroupModule } from './groups';
import { validateClass } from './utils';
import { ConfigSchema } from './config.schema';
import { GroupEntity, GroupItemEntity, ProductEntity } from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate: validateClass(ConfigSchema),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigSchema>) => ({
        type: 'postgres',
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        database: configService.get('DATABASE_NAME'),
        entities: [ProductEntity, GroupEntity, GroupItemEntity],
        synchronize: true,
      }),
    }),
    ProductModule,
    GroupModule,
  ],
})
export class AppModule {}
