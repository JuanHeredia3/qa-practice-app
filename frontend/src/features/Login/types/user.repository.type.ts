import type { CreateUserRequest, CreateUserRespose, LoginUserRequest, LoginUserResponse } from "../api/dtos/user.dto";

export interface IUserRepository {
  createUser(createUserRequest: CreateUserRequest): Promise<CreateUserRespose>;
  loginUser(loginUserRequest: LoginUserRequest): Promise<LoginUserResponse>;
}