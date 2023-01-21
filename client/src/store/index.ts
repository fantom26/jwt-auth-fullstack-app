import { AuthStore } from "./auth";
import { UsersStore } from "./users";

export class RootStore {
  authStore: AuthStore;

  usersStore: UsersStore;

  constructor() {
    this.usersStore = new UsersStore(this);
    this.authStore = new AuthStore(this);
  }
}
