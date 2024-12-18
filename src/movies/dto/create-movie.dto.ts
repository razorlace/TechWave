import { IsString, IsDate, IsArray, ArrayMinSize, IsNotEmpty } from 'class-validator';
import { Genre } from '../../genres/genre'
import { Type } from 'class-transformer';
export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @Type(() => Date) // Faz a transformação automática
    @IsDate()
    releaseDate: Date;
  
    @IsArray()
    @IsNotEmpty()
    genres: Genre[];
}
