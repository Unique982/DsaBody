import { Status } from "../../types/types";

export interface IUser {
  firstname: string | null;
  lastname: string | null;
  password: string | null;
  email: string | null;
  confirm_password?: string | null;
  token: string | null;
  role?: string | null;
  id: string | null;
}
export interface IRegsiterData {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  confirm_password?: string;
}
export interface ILoginUser {
  email: string;
  password: string;
}

export interface IInitialState {
  user: IUser;
  status: Status;
}
