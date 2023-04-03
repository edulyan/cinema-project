import { ICinema } from "./cinema";
import { ISession } from "./session";

export interface IRoom {
  id: string;
  number: number;
  cinema: ICinema;
  sessions: ISession[];
}
