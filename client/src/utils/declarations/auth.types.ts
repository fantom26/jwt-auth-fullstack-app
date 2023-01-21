import { IUser } from "./user.types";

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: IUser;
};
