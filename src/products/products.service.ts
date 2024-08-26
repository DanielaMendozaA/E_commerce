import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { validate as isUUID } from 'uuid';
import { LoggerService } from 'src/common/errors';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';
import { IProductService } from './interfaces/product-service.interface';



@Injectable()
export class ProductsService implements IProductService {
  constructor(
      @InjectRepository(Product)
      private readonly prodcuctRepository: Repository<Product>,
      private readonly logger: LoggerService,
      private readonly handleDBExceptions: ExceptionHandlerService
    ){}



  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.prodcuctRepository.create(createProductDto);
      await this.prodcuctRepository.save(product);
      return product
    } catch (error) {
      this.logger.error(error)
      this.handleDBExceptions.handleDBExceptions(error)
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
      this.logger.error(error)
      this.handleDBExceptions.handleDBExceptions(error)
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
      this.logger.error(error);
      if (error instanceof BadRequestException) {
        throw this.handleDBExceptions.handleDBExceptions(error)
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
      this.logger.error(error)
      this.handleDBExceptions.handleDBExceptions(error)
    
   }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.prodcuctRepository.findOne({ where: { id } });
      if (!product) {
        throw new BadRequestException('Product not found');
      }
      
      await this.prodcuctRepository.update(id, updateProductDto);
      return { status: 'success', message: 'Product updated successfully' };
      
    } catch (error) {
      this.logger.error(error)
      this.handleDBExceptions.handleDBExceptions(error)
      
    }
  }

}
