import { createSlice } from "@reduxjs/toolkit";
import { createGroupAction, getGroupAction } from "../action/group.action";

const initialState = {
  loading: false,
  groups: [],
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGroupAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGroupAction.fulfilled, (state, action) => {
      state.loading = false;
      state.groups = (action.payload as any) ?? [];
    });
    builder.addCase(getGroupAction.rejected, (state) => {
      state.loading = false;
      state.groups = [];
    });
    builder.addCase(createGroupAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createGroupAction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createGroupAction.rejected, (state) => {
      state.loading = false;
    });
  },
});
