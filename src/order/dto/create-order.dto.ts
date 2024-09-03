import { IsArray, IsEnum, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { OrderStatus } from "./order-status-enum";

export class CreateOrderDto {

    @IsString()
    userId: string;

    @IsNumber()
    @IsPositive()
    totalPrice: number;

    @IsArray()
    @IsInt({ each: true })
    productId: string[];

    @IsEnum(OrderStatus)
    @IsOptional()
    status?: OrderStatus = OrderStatus.ACTIVE;
}
