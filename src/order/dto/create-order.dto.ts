import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateOrderDto {

    @IsString()
    userId: string;

    @IsNumber()
    @IsPositive()
    totalPrice: number;

    @IsArray()
    @IsInt({ each: true })
    productId: string[];
}
