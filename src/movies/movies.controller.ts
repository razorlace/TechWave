import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'List all movies with optional pagination' })
  listMovies(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.moviesService.listMovies(page, limit);
  }

  @Post()
  @ApiOperation({ summary: 'Add a new movie to the database' })
  addMovie(@Body() createMovieDto: CreateMovieDto) {
    
    return this.moviesService.addMovie(createMovieDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update movie details' })
  updateMovie(@Param('id') id: number, @Body(new ValidationPipe()) body: CreateMovieDto) {
    return this.moviesService.updateMovie(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific movie' })
  deleteMovie(@Param('id') id: number) {
    return this.moviesService.deleteMovie(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search movies by title or genre' })
  searchMovies(@Query('q') query: string) {
    return this.moviesService.searchMovies(query);
  }
}
