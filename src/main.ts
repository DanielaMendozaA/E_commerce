import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupGlobalConfig } from './common/config/setup-global-config';
import RoleSeed from './dabase/seeds/role.seed';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  const logger = new Logger('Boosstrap');
  const roleSeed = new RoleSeed();
  const configService = new ConfigService();
  const executeSeed = configService.get<string>('EXECUTE_SEEDS')
  if(executeSeed === "true"){
    logger.log('Seeding roles');
    await roleSeed.run(dataSource);
    logger.log('Roles seeded');
  }
  app.setGlobalPrefix('api/v1');

  setupGlobalConfig(app);
   
  await app.listen(3000);
}
bootstrap();
