import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './movie';
import { Genre } from '../genres/genre';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre])],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
