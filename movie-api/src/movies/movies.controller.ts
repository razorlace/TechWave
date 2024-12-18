// src/movies/movies.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common'; // Importa os decoradores do NestJS para definir rotas HTTP
import { MoviesService } from './movies.service'; // Importa o serviço que contém a lógica de negócios de filmes
import { CreateMovieDto } from './dto/create-movie.dto'; // Importa o DTO (Data Transfer Object) para a criação de filmes
import { ValidationPipe } from '@nestjs/common'; // Importa o ValidationPipe para validar os dados recebidos
import { ApiTags, ApiOperation } from '@nestjs/swagger'; // Importa os decoradores do Swagger para documentação da API

@ApiTags('Movies') // Definindo a tag para o Swagger para agrupar as rotas da API sob "Movies"
@Controller('movies') // Define que todas as rotas abaixo serão acessíveis via '/movies'
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {} // Injeção de dependência do MoviesService

  @Get() // Define que esse método trata requisições GET para o caminho '/movies'
  @ApiOperation({ summary: 'List all movies with optional pagination' }) // Descrição da operação para Swagger
  listMovies(@Query('page') page: number = 1, @Query('limit') limit: number = 10) { // Obtém parâmetros de consulta (page e limit) com valores padrão
    return this.moviesService.listMovies(page, limit); // Chama o método do serviço para listar filmes com paginação
  }

  @Post() // Define que esse método trata requisições POST para o caminho '/movies'
  @ApiOperation({ summary: 'Add a new movie to the database' }) // Descrição da operação para Swagger
  addMovie(@Body() createMovieDto: CreateMovieDto) { // Recebe os dados do filme a ser criado no corpo da requisição
    return this.moviesService.addMovie(createMovieDto); // Chama o método do serviço para adicionar o filme
  }

  @Put(':id') // Define que esse método trata requisições PUT para '/movies/:id' (atualização de filme pelo ID)
  @ApiOperation({ summary: 'Update movie details' }) // Descrição da operação para Swagger
  updateMovie(@Param('id') id: number, @Body(new ValidationPipe()) body: CreateMovieDto) { // Recebe o ID do filme na URL e os dados para atualização no corpo da requisição, validando o corpo
    return this.moviesService.updateMovie(id, body); // Chama o método do serviço para atualizar os detalhes do filme
  }

  @Delete(':id') // Define que esse método trata requisições DELETE para '/movies/:id' (deleção de filme)
  @ApiOperation({ summary: 'Delete a specific movie' }) // Descrição da operação para Swagger
  deleteMovie(@Param('id') id: number) { // Recebe o ID do filme na URL para ser deletado
    return this.moviesService.deleteMovie(id); // Chama o método do serviço para deletar o filme
  }

  @Get('search') // Define que esse método trata requisições GET para '/movies/search' (busca de filmes)
  @ApiOperation({ summary: 'Search movies by title or genre' }) // Descrição da operação para Swagger
  searchMovies(@Query('q') query: string) { // Recebe um parâmetro de consulta 'q' para pesquisar filmes
    return this.moviesService.searchMovies(query); // Chama o método do serviço para buscar filmes pelo título ou gênero
  }
}
