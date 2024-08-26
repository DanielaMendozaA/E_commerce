import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomUnauthorizedException extends HttpException {
  constructor(message: string) {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'Unauthorized',
        message,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}