import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpRequest } from "../../config/axios";
import {
  decodeToken,
  getToken,
  isTokenExpired,
  removeToken,
  storeToken,
} from "../../services/auth.service";
import { Credentials, IUser, userResponse } from "../../types/auth.type";

export const loginAction = createAsyncThunk(
  "login",
  async (credential: Credentials) => {
    const user: userResponse = (
      await httpRequest.post("auth/login", credential)
    ).data;
    storeToken(user.token);
    return user;
  }
);

export const registerAction = createAsyncThunk(
  "register",
  async (payload: IUser) => {
    await httpRequest.post("auth/register", payload);
  }
);

export const logoutAction = createAsyncThunk("logout", () => {
  removeToken();
  return "";
});

export const checkAuthenticationAction = createAsyncThunk("check_auth", () => {
  const token = getToken();
  if (token) {
    if (!isTokenExpired(token)) {
      const payload: any = decodeToken(token);
      const user: IUser = {
        id: payload.id,
        email: payload.email,
        first_name: payload.first_name,
        last_name: payload.last_name,
      };
      return user;
    } else {
      removeToken();
      return {};
    }
  }
  return {};
});
