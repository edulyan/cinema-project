import axios from "axios";
import Cookies from "js-cookie";
import { ILogin, ILogInRes, IRegister, IRegisterRes } from "../models/user";

const AUTH_PORT = "http://localhost:3033/auth";

export const AuthService = {
  async signIn(authDto: ILogin) {
    const res = await axios.post<ILogInRes>(
      `${AUTH_PORT}/login`,
      {
        email: authDto.email,
        password: authDto.passwordHash,
      },
      { withCredentials: true }
    );

    if (res.data.access_token) {
      Cookies.set("access_token", res.data.access_token);
    }

    return res.data;
  },

  async signUp(authDto: IRegister) {
    const res = await axios.post<IRegisterRes>(
      `${AUTH_PORT}/register`,
      authDto
    );

    return res.data;
  },

  async logout() {
    const res = await axios.post("auth/logout", {}, { withCredentials: true });

    // Cookies.remove("access_token");

    return res;
  },
};
