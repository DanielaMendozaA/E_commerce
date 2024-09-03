import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';


@Module({
  imports: [
    CommonModule,
    RolesModule,
    UsersModule,
    TypeOrmModule.forFeature([ Product])
  ],
  controllers: [ProductsController],
  providers: [
    
    {
    provide: 'IProductService',
    useClass: ProductsService
  }],
  exports: [TypeOrmModule]
})
export class ProductsModule {}
