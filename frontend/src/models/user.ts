import { ITicket } from "./ticket";

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  tickets: ITicket[];
  createdDate: Date;
  updatedDate: Date;
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  GHOST = "ghost",
}

export interface ILogin {
  email: string;
  passwordHash: string;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}

export interface ILogInRes {
  access_token: string;
}

export interface IRegisterRes {
  email: string;
}
