// src/movies/movie.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Unique } from 'typeorm'; // Importa as funcionalidades do TypeORM para a definição da entidade
import { Genre } from '../genres/genre'; // Importa a entidade Genre (associação entre filmes e gêneros)

@Entity() // Define que esta classe será uma entidade mapeada para uma tabela no banco de dados
@Unique(['title']) // Garantir que o título do filme seja único na tabela (não pode haver filmes com o mesmo título)
export class Movie {
  @PrimaryGeneratedColumn() // Define a coluna de ID como chave primária autoincrementada
  id: number;

  @Column() // Define uma coluna no banco de dados para armazenar o título do filme
  title: string;

  @Column() // Define uma coluna no banco de dados para armazenar a descrição do filme
  description: string;

  @Column() // Define uma coluna no banco de dados para armazenar a data de lançamento do filme
  releaseDate: Date;

  @ManyToMany(() => Genre, (genre) => genre.movies, { cascade: true }) // Relacionamento "muitos para muitos" entre filmes e gêneros
  @JoinTable() // Cria a tabela de junção entre filmes e gêneros
  genres: Genre[]; // Coluna que armazenará uma lista de gêneros relacionados a esse filme
}
