import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, HttpException } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
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

      if (!response.headersSent) {
        response.status(status).json({
          statusCode: status,
          error: 'Bad Request',
          message: formattedErrors,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
      } else {
        console.error('Headers already sent for request', request.url);
      }
    } else {
      if (!response.headersSent) {
        response.status(status).json({
          ...exceptionResponse,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
      } else {
        console.error('Headers already sent for request', request.url);
      }
    }
  }
}

