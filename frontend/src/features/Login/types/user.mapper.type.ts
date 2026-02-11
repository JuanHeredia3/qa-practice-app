import type { CreateUserRespose, LoginUserResponse } from "../api/dtos/user.dto"
import type { AuthSession, User } from "../api/models/user.model"

export type UserMapper = {
  user: {
    transformUser: (dto: CreateUserRespose) => User;
    transformSession: (dto: LoginUserResponse) => AuthSession;
  }
}