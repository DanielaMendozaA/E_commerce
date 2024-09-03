import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { LoggerService } from 'src/common/errors';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';

@Injectable()
export class OrderProductsService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private readonly logger: LoggerService,
        private readonly handleDBExceptions: ExceptionHandlerService
    ) { }

    async addProductToOrder(createOrderProductDto: CreateOrderProductDto) {
        try {
            const { orderId, productId } = createOrderProductDto
            const order = await this.orderRepository.findOne({
                where: { id: orderId },
                relations: ['products', 'user']
            }
            )
            if (order.status !== 'active')
                throw new BadRequestException('Order is not active')

            const product = await this.productRepository.findOne({ where: { id: productId } })

            if (order && product) {
                order.products.push(product)
                await this.orderRepository.save(order)
            }

            throw new NotFoundException('Order or Product not found')


        } catch (error) {
            this.logger.error(error)
            this.handleDBExceptions.handleDBExceptions(error)

        }


    }

    async removeProductFromOrder(orderId: string, productId: string): Promise<Order> {
        try {
            const order = await this.orderRepository.findOne(
                { where: { id: orderId }, relations: ['products'] }
            );

            if (order) {
                order.products = order.products.filter(product => product.id !== productId);
                return this.orderRepository.save(order);
            }

            throw new NotFoundException('Order not found');
        } catch (error) {
            this.logger.error(error);
            this.handleDBExceptions.handleDBExceptions(error);
        }
    }

}
