import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable,Unique  } from 'typeorm';
import { Genre } from '../genres/genre';

@Entity()
@Unique(['title'])
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  releaseDate: Date;

  @ManyToMany(() => Genre, (genre) => genre.movies, { cascade: true })
  @JoinTable() // Cria a tabela de junção entre filmes e gêneros
  genres: Genre[];
}
