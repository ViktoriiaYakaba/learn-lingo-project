import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import { registerUser, logInUser, logOut } from "./operations";

const initialState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getCurrentUser: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      email: payload.email,
      isAuth: true,
    }),
    },
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.userId = payload.uid;
        state.login = payload.displayName;
        state.email = payload.email;
        state.isAuth = true;
        state.error = null;
        toast.success(`Glad to see you!`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.error = payload;
        toast.info(`error: ${payload}`);
      })
  .addCase(logInUser.fulfilled, (state, { payload }) => {
        state.userId = payload.uid;
        state.login = payload.displayName;
        state.email = payload.email;
        state.isAuth = true;
        state.error = null;

        toast.success("Glad to see you again!");
      })
      .addCase(logInUser.rejected, (state, { payload }) => {
        state.error = payload;
        toast.error(`error ! ${payload}`);
      })
      .addCase(logOut.fulfilled, (state) => {
        state.userId = null;
        state.login = null;
        state.email = null;
        state.isAuth = false;
        toast.success(`See you soon` );
      })
});

export const authReducer = authSlice.reducer;
export const { getCurrentUser } = authSlice.actions;
