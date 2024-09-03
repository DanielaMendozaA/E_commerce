import { Order } from "src/order/entities/order.entity";
import { CreateOrderProductDto } from "../dto/create-order-product.dto";

export interface IOrderProductService {
    addProductToOrder(createOrderProductDto: CreateOrderProductDto): Promise<void>;
    removeProductFromOrder(orderId: string, productId: string): Promise<Order>;
}