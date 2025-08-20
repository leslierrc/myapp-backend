import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Desactivar ETag (opcional)
  app.getHttpAdapter().getInstance().disable('etag');

  // Lista de orígenes permitidos
  const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://myapp-frontend-bvc5.vercel.app',
  
  ];

  // Habilitar CORS
  app.enableCors({
    origin: (origin, callback) => {
      // Si no hay origen (ej: llamadas curl o Postman), permitir
      if (!origin) return callback(null, true);

      // Verificar si el origen está en la lista permitida
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`CORS bloqueado para origen: ${origin}`);
        callback(new Error('No permitido por CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Importante si usas cookies o JWT en headers
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Servidor corriendo en puerto ${port}`);
  console.log(`📦 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS habilitado para: ${allowedOrigins.join(', ')}`);
}
bootstrap();