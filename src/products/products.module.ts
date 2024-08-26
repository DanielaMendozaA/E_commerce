import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { LoggerModule } from 'src/common/errors/services/logger.module';

@Module({
  imports: [
    LoggerModule,
    RolesModule,
    UsersModule,
    TypeOrmModule.forFeature([ Product])
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
