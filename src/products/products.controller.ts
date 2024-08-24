import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('products')
@UseGuards(JwtGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles('admin')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Roles('admin', 'reg_user')
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update( id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove( id);
  }
}
