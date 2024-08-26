import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerService } from '../../services/logger.service';


@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    if (Array.isArray(exceptionResponse.message)) {
      const formattedErrors = exceptionResponse.message.map((error: string) => {
        const [field, ...rest] = error.split(' ');

        const fieldError: string = field.replace(/"/g, '');
        return {
          field: fieldError.toLowerCase(),
          error: rest.join(' ')
        };
      });

      const errorResponse = {
        statusCode: status,
        error: 'Bad Request',
        message: formattedErrors,
        timestamp: new Date().toISOString(),
        path: request.url,
      };

      // Log the error details to the file using LoggerService
      this.logger.error(JSON.stringify(errorResponse));

      if (!response.headersSent) {
        response.status(status).json(errorResponse);
      } else {
        console.error('Headers already sent for request', request.url);
      }
    } else {
      const errorResponse = {
        ...exceptionResponse,
        timestamp: new Date().toISOString(),
        path: request.url,
      };

      // Log the error details to the file using LoggerService
      this.logger.error(JSON.stringify(errorResponse));

      if (!response.headersSent) {
        response.status(status).json(errorResponse);
      } else {
        console.error('Headers already sent for request', request.url);
      }
    }
  }
}