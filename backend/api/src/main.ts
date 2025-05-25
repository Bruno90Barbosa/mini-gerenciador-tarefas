/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();*/

// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Adicione o ValidationPipe globalmente para que os DTOs funcionem
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove automaticamente propriedades que não estão definidas no DTO
      forbidNonWhitelisted: true, // Lança um erro se houver propriedades que não estão no DTO
      transform: true, // Transforma o payload recebido para a instância do DTO (útil para tipos e conversões)
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permite os métodos HTTP.
    credentials: true, // Permite o envio de cookies, cabeçalhos de autorização, etc.
  });

  await app.listen(3000);
}
bootstrap();
