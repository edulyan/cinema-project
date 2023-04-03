import { IRoom } from "./room";
import { ISchedule } from "./schedule";

export interface ICinema {
  id: string;
  name: string;
  address: string;
  subway: string[];
  slug: CinemaSlug;
  rooms: IRoom[];
  schedule: ISchedule[];
}

export enum CinemaSlug {
  SERPUKHOVSKAYA = "serpukhovskaya",
  TAGANSKAYA = "taganskaya",
  LUBYANKA = "lubyanka",
}
