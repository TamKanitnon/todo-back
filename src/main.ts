import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: ['http://147.50.231.83', 'http://127.0.0.1:4200'] });
  await app.listen(3000);
}
bootstrap();
