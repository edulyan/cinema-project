import { IMovie } from "./movie";
import { IRoomSeat, ISession } from "./session";
import { IUser } from "./user";

export interface ITicket {
  id: string;
  seats: IRoomSeat;
  buyer: IUser;
  movie: IMovie;
  session: ISession;
  createdDate: Date;
  updatedDate: Date;
}

export interface IBuyTicketReq {
  sessionId: string;
  seats: IRoomSeat[];
}
