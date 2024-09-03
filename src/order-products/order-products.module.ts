import { Module } from '@nestjs/common';
import { OrderProductsService } from './order-products.service';
import { OrderProductsController } from './order-products.controller';
import { OrderModule } from 'src/order/order.module';
import { ProductsModule } from 'src/products/products.module';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';


@Module({
  controllers: [OrderProductsController],
  providers: [{
    provide: 'IOrderProductService',
    useClass: OrderProductsService
  }],
  imports: [OrderModule, ProductsModule, CommonModule, UsersModule, RolesModule]
})
export class OrderProductsModule {}
