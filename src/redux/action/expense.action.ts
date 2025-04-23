import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpRequest } from "../../config/axios";

export const getExpensesAction = createAsyncThunk(
  "get_expense",
  async (group_id: string) => {
    const response = await httpRequest.get(`expenses/group/${group_id}`);
    return response.data;
  }
);

export const createExpenseAction = createAsyncThunk(
  "create_expense",
  async (payload: any, thunkApi) => {
    await httpRequest.post("expenses", payload);
    thunkApi.dispatch(getExpensesAction(payload.group.id));
  }
);
