import { IUser } from "./auth.type";

export type IGroup = {
  id:number
  name: string;
  users: Array<IUser>;
};
