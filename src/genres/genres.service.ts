import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre';

@Injectable()
export class GenresService {
  constructor(@InjectRepository(Genre) private genreRepo: Repository<Genre>) {}

  async listGenres(): Promise<Genre[]> {
    return this.genreRepo.find();
  }

  async addGenre(name: string): Promise<Genre> {
    const genre = this.genreRepo.create({ name });
    return this.genreRepo.save(genre);
  }

  async deleteGenre(id: number): Promise<void> {
    await this.genreRepo.delete(id);
  }
}
