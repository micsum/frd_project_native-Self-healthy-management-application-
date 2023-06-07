import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { print } from 'listening-on';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  app.enableCors();
  await app.listen(3000);
=======
  let port = 3000;
  await app.listen(port);
  print(port);
>>>>>>> 2c549ed4cb950f1f0e1b278e68852d31efa22c72
}
bootstrap();
