import { createSlice } from "@reduxjs/toolkit";
import { getAllTeachers } from "./operations";

const initialState = {
  teachers: [],
  isLoading: false,
};

export const teachersSlice = createSlice({
  name: "teachers",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getAllTeachers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTeachers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.teachers = payload;
      })
      .addCase(getAllTeachers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const teachersReducer = teachersSlice.reducer;
