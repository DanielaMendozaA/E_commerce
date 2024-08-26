import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { LoggerService } from "./logger.service";

@Injectable()
export class ExceptionHandlerService{
    constructor(
        private readonly logger: LoggerService
    ){}

    handleDBExceptions(error: any): void {
        this.logger.error(error);

        if (error.code === '23505') 
          throw new BadRequestException(error.detail);
      
        if (error.code === '22P02')
          throw new BadRequestException('Invalid input data');
      
        if (error.code === '23503')
          throw new BadRequestException('Foreign key constraint violation');
      
        if (error.code === '23502')
          throw new BadRequestException('Not null constraint violation');
      
        if (error.code === '23514')
          throw new BadRequestException('Check constraint violation');
      
        if (error.code === '23501')
          throw new BadRequestException('Unique constraint violation');
      
        if (error.code === '23504')
          throw new BadRequestException('Exclusion constraint violation');
      
        if (error.code === '23506')
          throw new BadRequestException('Primary key constraint violation');
      
        if (error.code === '23507')
          throw new BadRequestException('Foreign key constraint violation');
      
        if (error.code === '22001')
          throw new BadRequestException('String value too long');
      
        if (error.code === '22003')
          throw new BadRequestException('Numeric value out of range');
      
        if (error.code === '22012')
          throw new BadRequestException('Division by zero');
      
        this.logger.error(error);
        throw new InternalServerErrorException('Unexpected error, check server logs');
      }
}