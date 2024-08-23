import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, InternalServerErrorException } from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(InternalServerErrorException)
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : 500;

    const clientIp = request.headers['x-forwarded-for'] || request.socket.remoteAddress;

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: (exception as any).message || exception,
      stack: (exception as any).stack,
      clientIp: clientIp,
    };

    // Log the error details to the file
    this.logger.error(JSON.stringify(errorResponse));


    // Pass the error to the default error handler
    response.status(status).send(exception?.response);
  }
}
