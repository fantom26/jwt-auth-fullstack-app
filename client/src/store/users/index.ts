import { makeAutoObservable } from "mobx";
import { UsersService } from "services";
import { RootStore } from "store";
import { IUser } from "utils/declarations";

export class UsersStore {
  users = [] as IUser[];

  root: RootStore;

  isLoading = false;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  setUsers(users: IUser[]) {
    this.users = users;
  }

  setIsLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async getUsers() {
    this.setIsLoading(true);
    try {
      const response = await UsersService.getUsers();
      this.setUsers(response.data);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
}
