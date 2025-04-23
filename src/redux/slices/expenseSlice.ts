import { createSlice } from "@reduxjs/toolkit";
import { getUserAction } from "../action/user.action";
import { createExpenseAction, getExpensesAction } from "../action/expense.action";

const initialState = {
  loading: false,
  expenses: [],
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExpensesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getExpensesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expenses = (action.payload as any) ?? [];
    });
    builder.addCase(getExpensesAction.rejected, (state) => {
      state.loading = false;
      state.expenses = [];
    });
    builder.addCase(createExpenseAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createExpenseAction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createExpenseAction.rejected, (state) => {
      state.loading = false;
    });
  },
});
