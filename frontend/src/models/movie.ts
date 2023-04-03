import { ISchedule } from "./schedule";

export interface IMovie {
  id: string;
  title: string;
  description: string;
  director: string[];
  year: number;
  slug: string;
  ageRating: AgeRating;
  duration: string;
  image?: string;
  trailer?: string;
  countries: Country[];
  genre: Genre[];
  actors: string[];
  schedule: ISchedule[];
  createdDate: Date;
  updatedDate: Date;
}

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
