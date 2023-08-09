import { IAuthInitialState } from "../components/store/auth/auth.type";
import { useTypedSelector } from "./useTypedSelector";

export const useAuth = (): IAuthInitialState => {
  return useTypedSelector((state) => state.auth);
};
