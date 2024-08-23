<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
# Ecommerce API


import { IsString, IsInt } from 'class-validator';
import { IntersectionType } from '@nestjs/mapped-types';

class CreateProductDto {
  @IsString()
  name: string;

  @IsInt()
  price: number;
}

class AdditionalInfo {
  @IsString()
  description: string;
}

class CategoryInfo {
  @IsString()
  category: string;
}

export class ProductWithFullInfoDto extends IntersectionType(
  IntersectionType(CreateProductDto, AdditionalInfo),
  CategoryInfo,
) {}