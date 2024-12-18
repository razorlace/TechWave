// src/genres/genres.controller.ts
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common'; // Importa os decoradores do NestJS para gerenciar as rotas HTTP
import { GenresService } from './genres.service'; // Importa o serviço GenresService, que contém a lógica de negócio
import { CreateGenreDto } from './dto/create-genre.dto'; // Importa o DTO que define o formato do corpo de uma requisição para criação de um gênero
import { ApiTags, ApiOperation } from '@nestjs/swagger'; // Importa o Swagger para documentação da API

@ApiTags('Genres') // Define o grupo de tags da API para "Genres", organizando a documentação
@Controller('genres') // Define a rota base para este controlador
export class GenresController {
  constructor(private readonly genresService: GenresService) {} // Injeta o serviço GenresService no controlador

  // Método GET para listar todos os gêneros
  @Get()
  @ApiOperation({ summary: 'List all genres in the database' }) // Descreve a operação no Swagger
  listGenres() {
    return this.genresService.listGenres(); // Chama o método do serviço que lista todos os gêneros
  }

  // Método POST para adicionar um novo gênero
  @Post()
  @ApiOperation({ summary: 'Add a new genre to the database' }) // Descreve a operação no Swagger
  addGenre(@Body() body: CreateGenreDto) { // Recebe os dados no corpo da requisição, utilizando o DTO
    return this.genresService.addGenre(body.name); // Chama o serviço para criar o gênero passando o nome recebido
  }

  // Método DELETE para excluir um gênero pelo ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific genre' }) // Descreve a operação no Swagger
  deleteGenre(@Param('id') id: string) { // Extrai o ID da URL usando o parâmetro :id
    return this.genresService.deleteGenre(+id); // Chama o serviço para deletar o gênero utilizando o ID
  }
}
