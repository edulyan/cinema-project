import { IRoom } from "./room";
import { ITicket } from "./ticket";

export interface ISession {
  id: string;
  startTime: Date;
  endTime: Date;
  room_seats: IRoomSeat[];
  room: IRoom;
  tickets: ITicket[];
}

export interface IRoomSeat {
  row: number;
  column: number;
  sold: boolean;
  price: number;
}
