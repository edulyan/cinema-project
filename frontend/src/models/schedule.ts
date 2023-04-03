import { ICinema } from "./cinema";
import { IMovie } from "./movie";
import { ISession } from "./session";

export interface ISchedule {
  id: string;
  date: Date;
  cinema: ICinema;
  movie: IMovie;
  sessions: ISession[];
}
