import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { AgeRating, Country, Genre } from '../../common/enums';

export class CreateMovieDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsString()
  director?: string[];

  @IsNumber()
  year?: number;

  @IsString()
  slug?: string;

  @IsEnum(AgeRating)
  ageRating?: AgeRating;

  @IsString()
  duration?: number;

  @IsEnum(Country)
  countries?: Country[];

  @IsEnum(Genre)
  genre?: Genre[];

  @IsArray()
  actors?: string[];
}
