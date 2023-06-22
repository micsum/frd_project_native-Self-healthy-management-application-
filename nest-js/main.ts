import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { print } from 'listening-on';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  let port = 3000;
  await app.listen(port);
  print(port);
}
bootstrap();
