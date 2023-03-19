import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/createMovie.dto';
import { Movie } from './entity/movie.entity';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async getAll(): Promise<Movie[]> {
    try {
      return await this.movieRepository.getAll();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(id: string): Promise<Movie> {
    const foundMovie = await this.movieRepository.getById(id);

    if (!foundMovie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    return foundMovie;
  }

  async create(dto: CreateMovieDto): Promise<Movie> {
    try {
      return await this.movieRepository.create(dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<boolean> {
    (await this.getById(id)) || false;

    await this.movieRepository.delete(id);

    return true;
  }
}
