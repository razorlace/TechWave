// src/genres/dto/create-genre.dto.ts
import { IsString, IsNotEmpty } from 'class-validator'; // Importa decoradores do class-validator para validação dos dados

// Classe DTO (Data Transfer Object) usada para criar um novo gênero
export class CreateGenreDto {
  // Decorador para garantir que o valor da propriedade seja uma string
  @IsString() 
  // Garantir que o valor da propriedade não seja vazio
  @IsNotEmpty() 
  name: string; // Propriedade que define o nome do gênero
}
