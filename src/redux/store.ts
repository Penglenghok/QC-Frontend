// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

import { groupSlice } from "./slices/groupSlice";
import { IUser } from "../types/auth.type";
import { IGroup } from "../types/group.type";
import { userSlice } from "./slices/userSlice";
import { expenseSlice } from "./slices/expenseSlice";

export interface IReducers {
  auth: {
    loading: boolean;
    user: IUser;
  };
  group: {
    loading: boolean;
    groups: Array<IGroup>;
  };
  user: {
    loading: boolean;
    users: Array<IUser>;
  };
  expense: {
    loading: boolean;
    expenses: any[];
  };
}

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    group: groupSlice.reducer,
    user: userSlice.reducer,
    expense: expenseSlice.reducer,
  },
});
