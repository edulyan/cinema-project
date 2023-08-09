import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/createMovie.dto';
import { Movie } from './entity/movie.entity';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async getAll(options?: FindManyOptions<Movie>) {
    return await this.movieRepository.find(options);
  }

  async getById(id: string, options?: FindManyOptions<Movie>) {
    return await this.movieRepository.findOne({
      where: { id: id },
      ...options,
    });
  }

  async getBySlug(slug: string, options?: FindManyOptions<Movie>) {
    return await this.movieRepository.findOne({
      where: { slug: slug },
      ...options,
    });
  }

  async create(dto: DeepPartial<Movie>) {
    const newMovie = this.movieRepository.create(dto);

    return await this.movieRepository.save(newMovie);
  }

  async save(entity: Movie) {
    return await this.movieRepository.save(entity);
  }

  async update(id: string, imgVert: string) {
    return await this.movieRepository.update(id, { imgVert });
  }

  async delete(id: string) {
    return await this.movieRepository.delete(id);
  }
}
