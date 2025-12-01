import { Status } from "../../types/types";

export interface IUser {
  first_name: string | null;
  last_name: string | null;
  password: string | null;
  email: string | null;
  confirm_password?: string | null;
  token: string | null;
}
export interface ILoginUser {
  email: string;
  password: string;
}

export interface IInitialState {
  user: IUser;
  status: Status;
}
