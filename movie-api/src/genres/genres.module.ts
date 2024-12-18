// src/genres/genres.module.ts
import { Module } from '@nestjs/common'; // Importa o decorador Module do NestJS, usado para definir módulos
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa o TypeOrmModule para usar o TypeORM dentro do NestJS
import { GenresService } from './genres.service'; // Importa o serviço GenresService que contém a lógica de negócio
import { GenresController } from './genres.controller'; // Importa o controlador GenresController que gerencia as rotas
import { Genre } from './genre'; // Importa a entidade Genre, que representa a tabela de gêneros na base de dados

@Module({
  imports: [TypeOrmModule.forFeature([Genre])], // Injeta a entidade Genre para ser usada no serviço (permite que o TypeORM acesse a tabela "genres")
  providers: [GenresService], // Declara o serviço GenresService para ser utilizado no módulo
  controllers: [GenresController], // Declara o controlador GenresController para gerenciar as rotas
})
export class GenresModule {} // Exporta o módulo GenresModule, que agrupa os componentes de gêneros
