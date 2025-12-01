import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../types/types";
import { IInitialState } from "./authSlices.type";

const initialState: IInitialState = {
  user: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    token: "",
  },
  status: Status.LOADING,
};
const authSlices = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});
export const { setStatus } = authSlices.actions;
export default authSlices.reducer;
