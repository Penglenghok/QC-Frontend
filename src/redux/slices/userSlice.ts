import { createSlice } from "@reduxjs/toolkit";
import { getUserAction } from "../action/user.action";

const initialState = {
  loading: false,
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.users = (action.payload as any) ?? [];
    });
    builder.addCase(getUserAction.rejected, (state) => {
      state.loading = false;
      state.users = [];
    });
  },
});
