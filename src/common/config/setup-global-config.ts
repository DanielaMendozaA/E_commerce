import { INestApplication, ValidationPipe } from "@nestjs/common";

import { AllExceptionsFilter, ValidationExceptionFilter } from "../errors";

export const setupGlobalConfig = (app: INestApplication<any>) => {
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        stopAtFirstError: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true
        }
    }));
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalFilters(new ValidationExceptionFilter());

}