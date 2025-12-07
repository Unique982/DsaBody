import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../types/types";

import API from "@/lib/http";
import { AppDispatch } from "../store";
import { ICourse, ICourseInitialState } from "./courseSlice.type";

const initialState: ICourseInitialState = {
  courses: [],
  singleCourse: null,
  status: Status.LOADING,
};

const courseSlice = createSlice({
  name: "courseSlice",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setCourses(state, action: PayloadAction<ICourse[]>) {
      state.courses = action.payload;
    },
    setSingleCourse(state, action: PayloadAction<ICourse>) {
      state.singleCourse = action.payload;
    },
  },
});

export const { setStatus, setCourses, setSingleCourse } = courseSlice.actions;
export default courseSlice.reducer;

export function fetchCourses() {
  return async function fetchCoursesThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get("/courses");
      dispatch(setCourses(response.data));
      dispatch(setStatus(Status.SUCCESS));
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchSingleCourse(id: string) {
  return async function fetchSingleCourseThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get(`/courses/${id}`);
      dispatch(setSingleCourse(response.data));
      dispatch(setStatus(Status.SUCCESS));
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function addCourse(data: ICourse) {
  return async function addCourseThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/courses", data);
      dispatch(fetchCourses());
      dispatch(setStatus(Status.SUCCESS));
      return { success: true, course: response.data };
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: err.message || "Failed to add course" };
    }
  };
}

export function updateCourse(id: string, data: ICourse) {
  return async function updateCourseThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.put(`/courses/${id}`, data);
      dispatch(fetchCourses());
      dispatch(setStatus(Status.SUCCESS));
      return { success: true, course: response.data };
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      return {
        success: false,
        message: err.message || "Failed to update course",
      };
    }
  };
}

export function deleteCourse(id: string) {
  return async function deleteCourseThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      await API.delete(`/courses/${id}`);
      dispatch(fetchCourses());
      dispatch(setStatus(Status.SUCCESS));
      return { success: true };
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      return {
        success: false,
        message: err.message || "Failed to delete course",
      };
    }
  };
}
