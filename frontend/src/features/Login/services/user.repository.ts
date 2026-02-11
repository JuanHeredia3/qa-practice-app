import type { AxiosInstance } from "axios";
import type { IUserRepository } from "../types/user.repository.type";
import type { CreateUserRequest, CreateUserRespose, LoginUserRequest, LoginUserResponse } from "../api/dtos/user.dto";

export class UserRepository implements IUserRepository {
  readonly api;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async createUser(createUserRequest: CreateUserRequest): Promise<CreateUserRespose> {
    const reponse = await this.api.post<CreateUserRespose>('/users', createUserRequest);
    return reponse.data
  }

  async loginUser(loginUserRequest: LoginUserRequest): Promise<LoginUserResponse> {
    const reponse = await this.api.post<LoginUserResponse>('/users', loginUserRequest);
    return reponse.data
  }
}