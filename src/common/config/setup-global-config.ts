import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter, LoggerService, ValidationExceptionFilter } from '../errors';


export const setupGlobalConfig = (app: INestApplication<any>, logger: LoggerService) => {
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    stopAtFirstError: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));
  app.useGlobalFilters(new AllExceptionsFilter(logger));
  app.useGlobalFilters(new ValidationExceptionFilter(logger));
};