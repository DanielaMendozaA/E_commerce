import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto{
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
    limit?: number
  
  @IsOptional()
  // @IsPositive()
  @Type(() => Number) // Es opcional si tenemos enableImplicitConvesions: true en los global pipes
  @Min(0)
    offset?: number

}