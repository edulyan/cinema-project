import { ISession } from "./session";
import { IUser } from "./user";

export interface ITicket {
  id: string;
  buyer: IUser;
  session: ISession;
}
