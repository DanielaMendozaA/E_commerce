import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { validate as isUUID } from 'uuid';



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

  async findAll(paginationDto : PaginationDto) {
    try {
      const { limit = 10, offset = 0} = paginationDto
      const products = await this.prodcuctRepository.find({
        take: limit,
        skip: offset
      });
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

  async findOne(term: string) {
   try {
      // const product = await this.prodcuctRepository.findOne({ where: {id}});
      // const product = await this.prodcuctRepository.findOneBy({id});
      let product: Product

      if( isUUID(term)){
        product = await this.prodcuctRepository.findOneBy({id: term})
      }else{
        const queryBuilder = this.prodcuctRepository.createQueryBuilder()
        product = await queryBuilder
        .where(`UPPER(title) =:title or slug =:slug`, {
          title: term,
          slug: term
        }).getOne();

      }

      if (!product) 
          throw new BadRequestException(`Product with term ${term} found`)
        
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
