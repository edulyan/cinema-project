import { Movie } from '../movie/entity/movie.entity';

export interface IRoomSeat {
  row: number;
  column: number;
  sold: boolean;
  price: number;
}

export interface IAddRoomCinema {
  cinemaId: string;
  roomId: string;
}

export interface IPopularFilm {
  movie: Movie;
  soldTickets: number;
}
