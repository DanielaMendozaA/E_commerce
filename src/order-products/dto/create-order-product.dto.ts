import { IsInt, Min, Max, IsString } from 'class-validator';

export class CreateOrderProductDto {
    @IsString()
    orderId: string;

    @IsString()
    productId: string;
}
