import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/createMovie.dto';
import { Movie } from './entity/movie.entity';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectRepository(Movie) private movieRepositroy: Repository<Movie>,
  ) {}

  async getAll() {
    return await this.movieRepositroy.find();
  }

  async getById(id: string) {
    return await this.movieRepositroy.findOne({ where: { id: id } });
  }

  async create(dto: CreateMovieDto) {
    const newMovie = this.movieRepositroy.create(dto);

    return await this.movieRepositroy.save(newMovie);
  }

  async save(entity: Movie) {
    return await this.movieRepositroy.save(entity);
  }

  async delete(id: string) {
    return await this.movieRepositroy.delete(id);
  }
}
