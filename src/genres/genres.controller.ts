// src/genres/genres.controller.ts
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @ApiOperation({ summary: 'List all genres in the database' })
  listGenres() {
    return this.genresService.listGenres();
  }

  @Post()
  @ApiOperation({ summary: 'Add a new genre to the database' })
  addGenre(@Body() body: CreateGenreDto) {
    return this.genresService.addGenre(body.name);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific genre' })
  deleteGenre(@Param('id') id: string) {
    return this.genresService.deleteGenre(+id);
  }
}
