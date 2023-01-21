import axios, { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import { AuthService } from "services";
import { RootStore } from "store";
import { REACT_APP_BASE_URL } from "utils/constants";
import { AuthResponse, IUser } from "utils/declarations";

export class AuthStore {
  user = {} as IUser;

  isAuth = false;

  isLoading = false;

  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setIsLoading(bool: boolean) {
    this.isLoading = bool;
  }

  login(response: AxiosResponse<AuthResponse>) {
    localStorage.setItem("token", response.data.accessToken);
    this.setAuth(true);
    this.setUser(response.data.user);
  }

  registration(response: AxiosResponse<AuthResponse>) {
    localStorage.setItem("token", response.data.accessToken);
    this.setAuth(true);
    this.setUser(response.data.user);
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
      this.root.usersStore.setUsers([] as IUser[]);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setIsLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${REACT_APP_BASE_URL}/refresh`, { withCredentials: true });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
}
