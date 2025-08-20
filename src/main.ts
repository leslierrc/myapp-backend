import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'; // Asegúrate de tener express importado

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Accede al objeto Express subyacente
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.disable('etag'); // ✅ Desactiva ETag

  app.enableCors();

  await app.listen(3000);
}
bootstrap();