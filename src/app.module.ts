// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './common/config/database-config';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { RolesModule } from './roles/roles.module';
import { AllExceptionsFilter, LoggerService, ValidationExceptionFilter } from './common/errors';
import { APP_FILTER } from '@nestjs/core';
import { envValidationSchema } from './common/config/joi-validation';


@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidationSchema,
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService,
    }),
    ProductsModule,
    CommonModule,
    AuthModule,
    UsersModule,
    OrderModule,
    RolesModule,
  ],
  providers: [
    LoggerService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
  ],
  exports: [LoggerService],
})
export class AppModule {}
