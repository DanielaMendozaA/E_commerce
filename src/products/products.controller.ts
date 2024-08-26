import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Query, Inject } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IProductService } from './interfaces/product-service.interface';

@Controller('products')
@UseGuards(JwtGuard, RolesGuard)
export class ProductsController {
  constructor(@Inject('IProductService')private readonly productsService: IProductService) {}

  @Post()
  @Roles('admin')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Roles('admin', 'reg_user')
  findAll( @Query() paginationDto: PaginationDto) {
    console.log(paginationDto);
    return this.productsService.findAll(paginationDto);
  }

  @Get(':id')
  @Roles('admin', 'reg_user')
  findOne(@Param('term', ParseUUIDPipe) term: string) {
    return this.productsService.findOne(term);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update( id, updateProductDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove( id);
  }
}
