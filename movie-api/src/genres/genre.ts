// src/genres/genre.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'; // Importa as funções do TypeORM para definir a entidade
import { Movie } from '../movies/movie'; // Importa a entidade Movie, que representa filmes na base de dados

@Entity() // Decorador que marca a classe como uma entidade do TypeORM
export class Genre {
  @PrimaryGeneratedColumn() // Define a chave primária com um valor gerado automaticamente
  id: number;

  @Column({ unique: true }) // Define a coluna 'name' como única, garantindo que o nome do gênero não se repita
  name: string;

  // Relacionamento Many-to-Many com a entidade Movie, ou seja, um gênero pode estar relacionado a vários filmes
  @ManyToMany(() => Movie, (movie) => movie.genres)
  movies: Movie[]; // Armazena a lista de filmes associados ao gênero
}
