import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { CommonModule } from 'src/common/common.module';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [
    CommonModule,
    RolesModule,
    UsersModule,
    TypeOrmModule.forFeature([Order, Product])],
  controllers: [OrderController],
  providers: [{
    provide: 'IOrderService',
    useClass: OrderService
  }],
  exports: [TypeOrmModule]
})
export class OrderModule {}
