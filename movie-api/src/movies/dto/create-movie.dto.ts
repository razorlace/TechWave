// src/movies/dto/create-movie.dto.ts
import { IsString, IsDate, IsArray, ArrayMinSize, IsNotEmpty } from 'class-validator'; // Importa decoradores para validação dos campos
import { Genre } from '../../genres/genre'; // Importa o modelo Genre para associar gêneros aos filmes
import { Type } from 'class-transformer'; // Para transformação de dados, por exemplo, conversão de string para Date

export class CreateMovieDto {
  @IsString() // Valida se o valor é uma string
  @IsNotEmpty() // Garante que o campo não está vazio
  title: string; // O título do filme deve ser uma string não vazia
  
  @IsString() // Valida se o valor é uma string
  @IsNotEmpty() // Garante que o campo não está vazio
  description: string; // A descrição do filme deve ser uma string não vazia

  @Type(() => Date) // Transforma automaticamente o valor para o tipo Date
  @IsDate() // Valida se o valor é uma data
  releaseDate: Date; // A data de lançamento deve ser uma instância válida de Date

  @IsArray() // Valida se o valor é um array
  @IsNotEmpty() // Garante que o campo não está vazio
  genres: Genre[]; // A lista de gêneros relacionados ao filme deve ser um array não vazio de objetos Genre
}
