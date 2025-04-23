import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpRequest } from "../../config/axios";
import { IUser } from "../../types/auth.type";

export const getUserAction = createAsyncThunk("get_user", async () => {
  const user: Array<IUser> = (await httpRequest.get(`users`)).data;
  return user;
});
