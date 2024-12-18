// src/movies/movies.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'; // Importa os decorators e exceções do NestJS
import { Movie } from './movie'; // Importa o modelo Movie que é a entidade correspondente à tabela do banco de dados
import { CreateMovieDto } from './dto/create-movie.dto'; // Importa o Data Transfer Object (DTO) para criação de filmes
import { InjectRepository } from '@nestjs/typeorm'; // Importa o decorador para injetar o repositório do TypeORM
import { Repository } from 'typeorm'; // Importa o repositório do TypeORM para realizar operações CRUD no banco de dados

@Injectable() // Torna a classe 'MoviesService' disponível para injeção de dependências
export class MoviesService {
  constructor(
    @InjectRepository(Movie) // Injeta o repositório do tipo Movie, que fornece as operações para manipular filmes no banco
    private readonly movieRepository: Repository<Movie>, 
  ) {}

  // Método para listar filmes com paginação
  async listMovies(page: number, limit: number): Promise<Movie[]> {
    const [movies, total] = await this.movieRepository.findAndCount({
      skip: (page - 1) * limit,  // Calcula o offset com base no número da página
      take: limit,               // Define o limite de filmes a serem retornados
    });

    return movies;  // Retorna a lista de filmes com a paginação aplicada
  }

  // Método para adicionar um novo filme
  async addMovie(createMovieDto: CreateMovieDto) {
    const movie = this.movieRepository.create(createMovieDto); // Cria um novo objeto filme a partir do DTO
    return this.movieRepository.save(movie); // Salva o filme no banco de dados
  }

  // Método para atualizar os dados de um filme existente
  async updateMovie(id: number, createMovieDto: CreateMovieDto) {
    const movie = await this.movieRepository.findOne({ where: { id } }); // Busca o filme pelo ID
    if (!movie) {
      throw new NotFoundException('Movie not found'); // Lança uma exceção caso o filme não seja encontrado
    }
    Object.assign(movie, createMovieDto); // Atualiza as propriedades do filme com as informações do DTO
    return this.movieRepository.save(movie); // Salva as alterações no banco de dados
  }

  // Método para excluir um filme pelo ID
  async deleteMovie(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id } }); // Busca o filme pelo ID
    if (!movie) {
      throw new NotFoundException('Movie not found'); // Lança uma exceção caso o filme não seja encontrado
    }
    return this.movieRepository.remove(movie); // Remove o filme do banco de dados
  }

  // Método para buscar filmes por título ou gênero
  async searchMovies(query: string) {
    return this.movieRepository
      .createQueryBuilder('movie')  // Cria um builder para uma consulta personalizada
      .where('movie.title LIKE :query', { query: `%${query}%` }) // Busca filmes pelo título que contenham a query
      .orWhere('movie.genres LIKE :query', { query: `%${query}%` }) // Ou busca filmes pelos gêneros que contenham a query
      .getMany(); // Executa a consulta e retorna os filmes encontrados
  }
}
