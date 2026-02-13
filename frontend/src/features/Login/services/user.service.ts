import type { CreateUserRequest, CreateUserRespose, LoginUserRequest, LoginUserResponse } from "../api/dtos/user.dto";
import type { AxiosInstance } from "axios";

export class UserService {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api
  }

  async createUser(createUserRequest: CreateUserRequest): Promise<CreateUserRespose> {
    const reponse = await this.api.post<CreateUserRespose>('/users', createUserRequest);
    return reponse.data
  }

  async loginUser(loginUserRequest: LoginUserRequest): Promise<LoginUserResponse> {
    const reponse = await this.api.post<LoginUserResponse>('/users/login', loginUserRequest);
    return reponse.data
  }
}