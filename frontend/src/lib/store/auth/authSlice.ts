import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../types/types";
import {
  IInitialState,
  ILoginUser,
  IRegsiterData,
  IUser,
} from "./authSlices.type";
import API from "@/lib/http";
import { AppDispatch } from "../store";

const initialState: IInitialState = {
  user: {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
    token: "",
    role: "",
    id: null,
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
    setUser(state: IInitialState, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = initialState.user;
      localStorage.removeItem("token");
    },
  },
});
export const { setStatus, setUser, logout } = authSlices.actions;
export default authSlices.reducer;

// login
export function userLogin(data: ILoginUser) {
  return async function userLoginThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/login", data);
      if (response.status === 200) {
        const { token, user } = response.data;
        dispatch(
          setUser({
            firstname: user.first_name || "",
            lastname: user.last_name || "",
            email: user.email,
            token: token,
            role: user.role,
            id: user.id,
            password: "",
          })
        );
        localStorage.setItem("token", token);
        dispatch(setStatus(Status.SUCCESS));
        return { success: true, user };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data?.message || "Failed" };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const message =
        err.response?.data?.message ||
        err.message ||
        err.response?.data?.errors ||
        "Something went wrong";
      return { success: false, message };
    }
  };
}

//  register
export function userRegister(data: IRegsiterData) {
  return async function userRegisterThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("auth/register", data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        if (response.data.data) {
          dispatch(setUser(response.data.data));
        }
        return { success: true };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data?.message || "Failed" };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const message =
        err.response?.data?.message ||
        err.message ||
        err.response?.data?.errors ||
        "Something went wrong";
      return { success: false, message };
    }
  };
}
