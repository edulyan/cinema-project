import { ILogin, ILogInRes, IRegister, IRegisterRes } from "@/models/user";
import { AuthService } from "@/services/auth.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk<IRegisterRes, IRegister>(
  "auth/register",
  async (dto, thunkApi) => {
    try {
      return await AuthService.signUp(dto);
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk<ILogInRes, ILogin>(
  "auth/login",
  async (dto, thunkApi) => {
    try {
      return await AuthService.signIn(dto);
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});
