import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    slug?: string;

    @IsPositive()
    @IsOptional()
    @IsInt()
    stock?: number;

    @IsString({ each: true })
    @IsArray()
    sizes: string[];
    
    @IsIn(['man', 'woman', 'unisex', 'kid'])
    gender: string;



}
