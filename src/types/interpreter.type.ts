import { User } from "./user.type";

export interface InterpreterEntry {
  id: string;
  text: string;
  language: string;
  origin: User;
}

export type InterpreterHistory = InterpreterEntry[];
