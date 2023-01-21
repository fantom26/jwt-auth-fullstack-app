import { AuthResponse } from "utils/declarations";
import { LoginSchema, RegisterSchema } from "utils/schemas";

import { $api } from "./axios.service";

export class AuthService {
  static login(data: LoginSchema) {
    return $api.post<AuthResponse>("/login", { email: data.email, password: data.password });
  }

  static registration(data: RegisterSchema) {
    return $api.post<AuthResponse>("/registration", { email: data.email, password: data.password, firstName: data.firstName, lastName: data.lastName });
  }

  static logout(): Promise<void> {
    return $api.post("/logout");
  }
}
