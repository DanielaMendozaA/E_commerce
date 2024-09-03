import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject } from '@nestjs/common';
import { OrderProductsService } from './order-products.service';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IOrderProductService } from './interfaces/order-product-service.interface';

@Controller('order-products')
@UseGuards(JwtGuard, RolesGuard)
export class OrderProductsController {
  constructor(
    @Inject('IOrderProductService')private readonly orderProductService: IOrderProductService
  ) {}

  @Post()
  async addProductToOrder(@Body() createOrderProductDto: CreateOrderProductDto) {
    return this.orderProductService.addProductToOrder(createOrderProductDto);
  }

  @Delete(':orderId/products/:productId')
  async removeProductFromOrder(
    @Param('orderId') orderId: string,
    @Param('productId') productId: string,
  ) {
    return this.orderProductService.removeProductFromOrder(orderId, productId);
  }

}
