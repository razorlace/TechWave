// src/movies/movies.module.ts
import { Module } from '@nestjs/common'; // Importa o decorador para definir um módulo no NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa o módulo TypeOrm para integração com o banco de dados
import { MoviesService } from './movies.service'; // Importa o serviço responsável pela lógica de filmes
import { MoviesController } from './movies.controller'; // Importa o controlador responsável pelo gerenciamento de filmes
import { Movie } from './movie'; // Importa a entidade 'Movie', que representa a tabela de filmes no banco
import { Genre } from '../genres/genre'; // Importa a entidade 'Genre' para gerenciar as categorias dos filmes

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre])], // Registra as entidades 'Movie' e 'Genre' para serem usadas no módulo, disponibilizando os repositórios dessas entidades
  providers: [MoviesService], // Registra o 'MoviesService' como fornecedor do NestJS, para ser injetado em outros componentes
  controllers: [MoviesController], // Registra o 'MoviesController' para expor as APIs relacionadas aos filmes
})
export class MoviesModule {}
