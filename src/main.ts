import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupGlobalConfig } from './common/config/setup-global-config';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './common/services/logger.service';
import RoleSeed from './dabase/seeds/role.seed';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  const logger = app.get(LoggerService); // Obtén la instancia de LoggerService

  const roleSeed = new RoleSeed();



  const configService = app.get(ConfigService); // Usa app.get para obtener ConfigService


  const executeSeedString = configService.get<string>('EXECUTE_SEEDS');


  logger.log('Execute seeds string: ' + executeSeedString + typeof executeSeedString);

  const executeSeed = JSON.parse(executeSeedString);

  logger.log('Starting application');
  logger.log('Execute seeds: ' + executeSeed + typeof (executeSeed));


  if (executeSeed === true) {
    logger.log('Seeding roles');
    await roleSeed.run(dataSource);
    logger.log('Roles seeded');
  }else{
    logger.log('Sedder not executed');
  }

  app.setGlobalPrefix('api/v1');
  setupGlobalConfig(app, logger); // Pasa la instancia de LoggerService

  await app.listen(3000);
  console.log('Application is listening on port 3000');
}

bootstrap();