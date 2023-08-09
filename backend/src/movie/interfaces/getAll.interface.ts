import { FindOptionsOrderValue } from 'typeorm';
import { Movie } from '../entity/movie.entity';

export interface IGetAllRes {
  movies: Movie[];
  length?: number;
}

export interface IGetAllReq {
  orderBy: FindOptionsOrderValue;
  take: string;
}
