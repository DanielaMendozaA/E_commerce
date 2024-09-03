import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { LoggerService } from 'src/common/errors';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly logger: LoggerService,
        private readonly handleDBExceptions: ExceptionHandlerService

    ) {}

    async create(createOrderDto: CreateOrderDto) {
        try {
            const order = this.orderRepository.create(createOrderDto);
            await this.orderRepository.save(order);
            return order
            
        } catch (error) {
            this.logger.error(error)
            this.handleDBExceptions.handleDBExceptions(error)
        }
    }

    async findAll(paginationDto: PaginationDto) {
        try {
            const { limit = 10, offset = 0} = paginationDto
            const orders = await this.orderRepository.find({
                take: limit,
                skip: offset
            });
            return orders
            
        } catch (error) {
            this.logger.error(error)
            this.handleDBExceptions.handleDBExceptions(error)
        }
    }

    async remove(id: string) {
        try {
            const result = await this.orderRepository.delete(id);

            if (result.affected === 0) {
                throw new NotFoundException('Order not found');
            }
        } catch (error) {
            this.logger.error(error)
            this.handleDBExceptions.handleDBExceptions(error)
        }
    }

    async findOne(id: string) {
        try {
            const order = await this.orderRepository.findOne({where: {id}});
            if (!order) {
                throw new NotFoundException('Order not found');
            }
            return order
        } catch (error) {
            this.logger.error(error)
            this.handleDBExceptions.handleDBExceptions(error)
        }

    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {
        try {
            const order = await this.orderRepository.preload({
                id: id,
                ...updateOrderDto
            });
            if (!order) {
                throw new NotFoundException('Order not found');
            }
            return await this.orderRepository.update(id, order);
        } catch (error) {
            this.logger.error(error)
            this.handleDBExceptions.handleDBExceptions(error)
        }
    }


}
