import { ParsedUrlQuery } from "querystring";
import { ISchedule } from "./schedule";
import { ITicket } from "./ticket";
import { IUser } from "./user";

export interface IMovie {
  id: string;
  title: string;
  description: string;
  director: string[];
  year: number;
  slug: string;
  ageRating: AgeRating;
  duration: number;
  image?: string;
  imgVert?: string;
  trailer?: string;
  countries: Country[];
  genre: Genre[];
  actors: string[];
  votes: IVote[];
  schedule: ISchedule[];
  tickets: ITicket[];
  createdDate: Date;
  updatedDate: Date;
}

export interface IVote {
  id: string;
  user: IUser;
  movie: IMovie;
  createdDate: Date;
}

export interface IMovieParam extends ParsedUrlQuery {
  slug: string;
}

export interface IGetMoviesReq {
  orderBy: FindOptionsOrderValue | null;
  take: string;
}

export interface IGetMoviesRes {
  movies: IMovie[];
  length?: number;
}

export interface IGetMovieRes {
  movie: IMovie;
}

export type FindOptionsOrderValue = "ASC" | "DESC" | "asc" | "desc";

export enum AgeRating {
  G = "0+",
  PG = "6+",
  PG13 = "12+",
  R = "16+",
  NC17 = "18+",
}
export enum Genre {
  ACTION = "боевик",
  COMEDY = "комедия",
  DRAMA = "драма",
  FANTASY = "фэнтэзи",
  HORROR = "ужасы",
  ROMANCE = "мелодрама",
  THRILLER = "триллер",
  FANTASTIQUE = "фантастика",
  WESTERN = "вестерн",
  DETECTIVE = "детектив",
}

export enum Country {
  RUSSIA = "Россия",
  USA = "США",
  USSR = "СССР",
  FRANCE = "Франция",
  ITALY = "Италия",
  SPAIN = "Испания",
  UK = "Великобритания",
  GERMANY = "Германия",
  SOUTHKOREA = "Южная Корея",
  JAPAN = "Япония",
  AUSTRALIA = "Австралия",
  AUSTRIA = "Австрия",
  BELGIUM = "Бельгия",
  BRASIL = "Бразилия",
  HONGKONG = "Гонконг",
  GREECE = "Греция",
  EGYPT = "Египет",
  ISRAEL = "Израиль",
  INDIA = "Индия",
  CANADA = "Канада",
  CHINA = "Китай",
  LIECHTENSTEIN = "Лихтенштейн",
  NETHERLANDS = "Нидерланды",
  NORWAY = "Норвегия",
  UAE = "ОАЭ",
  POLAND = "Польша",
  PORTUGAL = "Португалия",
  THAILAND = "Таиланд",
  TURKEY = "Турция",
  UKRAINE = "Украина",
  PHILIPPINES = "Филиппины",
  SWEDEN = "Швеция",
  SWITZERLAND = "Швейцария",
  SOUTHAFRICA = "ЮАР",
}
