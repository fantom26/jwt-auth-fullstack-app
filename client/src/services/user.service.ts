import { IUser } from "utils/declarations";

import { $api } from "./axios.service";

export class UsersService {
  static getUsers() {
    return $api.get<IUser[]>("/users");
  }
}
