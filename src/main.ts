import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalPipesConfig } from './common/config/globla-pipes.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  globalPipesConfig(app);
   
  await app.listen(3000);
}
bootstrap();
