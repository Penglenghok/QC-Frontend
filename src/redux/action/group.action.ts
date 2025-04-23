import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpRequest } from "../../config/axios";
import { IGroup } from "../../types/group.type";

export const getGroupAction = createAsyncThunk(
  "get_group",
  async (userId: number) => {
    const groups: Array<IGroup> = (
      await httpRequest.get(`groups/user/${userId}`)
    ).data;
    return groups;
  }
);

export const createGroupAction = createAsyncThunk(
  "create_group",
  async (payload: IGroup, thunkAPI) => {
    await httpRequest.post(`groups`, payload);
    thunkAPI.dispatch(getGroupAction(payload.users[0].id));
  }
);
