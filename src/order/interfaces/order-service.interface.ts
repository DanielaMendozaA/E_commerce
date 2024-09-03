import { PaginationDto } from "src/common/dto/pagination.dto";
import { CreateOrderDto } from "../dto/create-order.dto";
import { Order } from "../entities/order.entity";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { UpdateResponse } from "src/common/interfaces/update-response.interface";

export interface IOrderService {
  create(createorderDto: CreateOrderDto): Promise<Order>;
  findAll(paginationDto: PaginationDto): Promise<Order[]>;
  findOne(term: string): Promise<Order>;
  update(id: string, updateOrderDto: UpdateOrderDto): Promise<UpdateResponse>;
  remove(id: string): Promise<{ status: string, message: string }>;
}