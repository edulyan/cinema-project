import { ParsedUrlQuery } from "querystring";
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

export interface ICinemaParam extends ParsedUrlQuery {
  slug: CinemaSlug;
}

export interface IGetCinemaRes {
  cinema: ICinema;
}

export enum CinemaSlug {
  SERPUKHOVSKAYA = "serpukhovskaya",
  TAGANSKAYA = "taganskaya",
  LUBYANKA = "lubyanka",
}

export interface ICinemaListPage {
  cinemas: ICinema[];
}
