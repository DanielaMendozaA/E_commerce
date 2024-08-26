import { Module } from '@nestjs/common';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { ExceptionHandlerService } from './services/exception-handler.service';
import { LoggerService } from './errors';

@Module({
  providers: [ExceptionHandlerService, LoggerService],
  imports: [
    InterceptorsModule
  ],
  exports: [
    InterceptorsModule,
    ExceptionHandlerService,
    LoggerService
  ]
})
export class CommonModule {}
