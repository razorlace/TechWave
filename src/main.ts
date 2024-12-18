import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Registra o Swagger
  const config = new DocumentBuilder()
    .setTitle('Movie API')
    .setDescription('API for managing movies and genres')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Habilitar validação global
  app.useGlobalPipes(new ValidationPipe());

  
  // Inicia o servidor
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
