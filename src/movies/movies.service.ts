// src/movies/movies.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './movie';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async listMovies(page: number, limit: number): Promise<Movie[]> {
    const [movies, total] = await this.movieRepository.findAndCount({
      skip: (page - 1) * limit,  
      take: limit,              
    });

    return movies;  
  }

  async addMovie(createMovieDto: CreateMovieDto) {
    const movie = this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(movie);
  }

  async updateMovie(id: number, createMovieDto: CreateMovieDto) {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    Object.assign(movie, createMovieDto);
    return this.movieRepository.save(movie);
  }

  async deleteMovie(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return this.movieRepository.remove(movie);
  }

  async searchMovies(query: string) {
    return this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.title LIKE :query', { query: `%${query}%` })
      .orWhere('movie.genres LIKE :query', { query: `%${query}%` })
      .getMany();
  }
}
