// src/genres/genres.service.ts
import { Injectable } from '@nestjs/common'; // Importa o decorador Injectable para injetar o serviço em outros lugares
import { InjectRepository } from '@nestjs/typeorm'; // Importa o decorador para injetar o repositório de uma entidade
import { Repository } from 'typeorm'; // Importa o Repository do TypeORM para interagir com a base de dados
import { Genre } from './genre'; // Importa o modelo Genre

@Injectable() // Torna o serviço disponível para injeção em outros componentes
export class GenresService {
  constructor(@InjectRepository(Genre) private genreRepo: Repository<Genre>) {}

  // Função para listar todos os gêneros
  async listGenres(): Promise<Genre[]> {
    return this.genreRepo.find(); // Usa o repositório para encontrar e retornar todos os gêneros da base de dados
  }

  // Função para adicionar um novo gênero
  async addGenre(name: string): Promise<Genre> {
    const genre = this.genreRepo.create({ name }); // Cria uma nova instância do gênero com o nome passado
    return this.genreRepo.save(genre); // Salva o novo gênero na base de dados
  }

  // Função para deletar um gênero pela ID
  async deleteGenre(id: number): Promise<void> {
    await this.genreRepo.delete(id); // Deleta o gênero da base de dados utilizando a ID fornecida
  }
}
