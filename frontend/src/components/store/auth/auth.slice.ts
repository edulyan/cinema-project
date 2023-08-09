import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./auth.actions";
import { IAuthInitialState } from "./auth.type";

const initialState: IAuthInitialState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoggedIn = false;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoggedIn = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoggedIn = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
    });
  },
});
