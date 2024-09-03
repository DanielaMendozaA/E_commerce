import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { Product } from "../entities/product.entity";
import { UpdateResponse } from "../../common/interfaces/update-response.interface";

export interface IProductService {
  create(createProductDto: CreateProductDto): Promise<Product>;
  findAll(paginationDto: PaginationDto): Promise<Product[]>;
  findOne(term: string): Promise<Product>;
  update(id: string, updateProductDto: UpdateProductDto): Promise<UpdateResponse>;
  remove(id: string): Promise<{ status: string, message: string }>;
}