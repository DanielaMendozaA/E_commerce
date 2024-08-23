import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';


@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService')

  constructor(
      @InjectRepository(Product)
      private readonly prodcuctRepository: Repository<Product>
    ){}



  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.prodcuctRepository.create(createProductDto);
      await this.prodcuctRepository.save(product);
      return product
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async findAll() {
    try {
      const products = await this.prodcuctRepository.find();
      return products
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async remove(id: string) {
    try {
      const product = await this.prodcuctRepository.findOne({ where: { id } });
      if (!product) {
        throw new BadRequestException('Product not found');
      }
      
      await this.prodcuctRepository.remove(product);
      return { status: 'success', message: 'Product removed successfully' };
      
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred while removing the product');
    }
  }

  async findOne(id: string) {
   try {
      // const product = await this.prodcuctRepository.findOne({ where: {id}});
      const product = await this.prodcuctRepository.findOneBy({id});
      if (!product) 
          throw new BadRequestException('Product not found')
        
        return product
   } catch (error) {
     this.handleDBExceptions(error)
    
   }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }


  private handleDBExceptions(error: any){
    if (error.code === '23505') 
      throw new BadRequestException(error.detail);

    if(error.code === '22P02')
      throw new BadRequestException('Invalid input data');

    if(error.code === '23503')
      throw new BadRequestException('Foreign key constraint violation');
    
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}
