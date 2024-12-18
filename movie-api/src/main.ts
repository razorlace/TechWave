import { NestFactory } from '@nestjs/core'; // Importa o NestFactory que é utilizado para criar a instância da aplicação NestJS
import { AppModule } from './app.module'; // Importa o módulo principal da aplicação que contém todos os controllers e providers
import { ValidationPipe } from '@nestjs/common'; // Importa o ValidationPipe para validação dos dados de entrada
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Importa módulos necessários para configuração do Swagger, uma ferramenta para documentação da API

// Função assíncrona para inicializar o servidor
async function bootstrap() {
  // Cria a aplicação NestJS, passando o módulo raiz (AppModule)
  const app = await NestFactory.create(AppModule);

  // Configura a documentação do Swagger da API
  const config = new DocumentBuilder() // Cria uma configuração para o Swagger
    .setTitle('Movie API') // Define o título da documentação da API
    .setDescription('API for managing movies and genres') // Descrição da API
    .setVersion('1.0') // Define a versão da API
    .build(); // Conclui a configuração do Swagger

  // Cria a documentação Swagger com a configuração acima
  const document = SwaggerModule.createDocument(app, config);

  // Disponibiliza a documentação da API na rota "/api"
  SwaggerModule.setup('api', app, document);

  // Habilita a validação global de entrada de dados na aplicação utilizando o ValidationPipe
  app.useGlobalPipes(new ValidationPipe()); // Este Pipe aplica a validação em todos os requests automaticamente

  // Inicia o servidor na porta definida pela variável de ambiente PORT ou na porta 3000 caso a variável não exista
  await app.listen(process.env.PORT ?? 3000);
}

// Chama a função bootstrap para inicializar a aplicação
bootstrap();
