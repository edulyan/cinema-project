import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/createMovie.dto';
import { Movie } from './entity/movie.entity';
import { MovieRepository } from './movie.repository';
import { FileService } from '../file/file.service';
import { FileType } from '../common/enums';
import { IGetAllReq, IGetAllRes } from './interfaces/getAll.interface';
import { Schedule } from '../schedule/entity/schedule.entity';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly fileService: FileService,
  ) {}

  async getAll(dto?: IGetAllReq): Promise<IGetAllRes> {
    try {
      const movies = await this.movieRepository.getAll({
        order: { createdDate: dto.orderBy },
        take: Number(dto.take),
        relations: ['votes'],
      });

      return { movies, length: movies.length };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getFeatureMovies(): Promise<Movie[]> {
    try {
      const movies = await this.movieRepository.getAll({
        where: { isFeature: false },
        relations: ['votes'],
      });

      movies.sort((a: Movie, b: Movie) => b.votes.length - a.votes.length);

      return movies;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(id: string): Promise<Movie> {
    const foundMovie = await this.movieRepository.getById(id, {
      relations: [
        'schedule.cinema',
        'schedule.movie',
        'schedule.sessions.room',
      ],
    });

    if (!foundMovie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    return foundMovie;
  }

  async getBySlug(slug: string): Promise<Movie> {
    const movie = await this.movieRepository.getBySlug(slug, {
      relations: ['schedule', 'tickets'],
    });

    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    return movie;
  }

  async getMovieSchedulesByDate(id: string, date: Date): Promise<Schedule[]> {
    const movie = await this.getById(id);

    date = new Date(date);

    const schedules = movie.schedule.filter(
      (schedule: Schedule) =>
        schedule.date.toLocaleDateString() === date.toLocaleDateString(),
    );

    return schedules;
  }

  async create(
    dto: CreateMovieDto,
    image: string,
    trailer: string,
  ): Promise<Movie> {
    try {
      const imagePath = this.fileService.createFile(FileType.IMAGE, image);
      const trailerPath = this.fileService.createFile(
        FileType.TRAILER,
        trailer,
      );
      return await this.movieRepository.create({
        ...dto,
        image: imagePath,
        trailer: trailerPath,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addImgVert(id: string, imgVert: string): Promise<boolean> {
    try {
      const imgVetPath = this.fileService.createFile(FileType.IMGVERT, imgVert);

      await this.movieRepository.update(id, imgVetPath);

      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<boolean> {
    const movie = await this.getById(id);

    await this.movieRepository.delete(movie.id);
    this.fileService.deleteFile(movie.image);
    this.fileService.deleteFile(movie.trailer);

    return true;
  }
}
