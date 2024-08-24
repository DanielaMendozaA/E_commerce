import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { InterceptorsModule } from './interceptors/interceptors.module';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
  imports: [
    InterceptorsModule
  ],
  exports: [
    InterceptorsModule
  ]
})
export class CommonModule {}
