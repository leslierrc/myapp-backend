import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Accede al servidor HTTP subyacente (Express) para desactivar ETag
  const httpAdapter = app.getHttpAdapter();
  const expressApp = httpAdapter.getInstance();
  expressApp.disable('etag'); // Desactiva ETag (opcional, mejora caché en algunos casos)

  // ✅ Habilita CORS para que tu frontend en Vercel pueda hacer peticiones
  app.enableCors({
    origin: ['https://myapp-frontend-bvc5.vercel.app'],// ← Cambia por tu URL real
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si usas cookies o auth con credenciales
  });

  // ✅ Usa el puerto asignado por Render (process.env.PORT)
  const port = process.env.PORT || 3000;

  await app.listen(port);

  // ✅ Mensaje de consola útil
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📦 Entorno: ${process.env.NODE_ENV || 'development'}`);
}
bootstrap();