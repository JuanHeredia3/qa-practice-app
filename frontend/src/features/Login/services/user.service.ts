import type { CreateUserRequest, CreateUserRespose, LoginUserRequest, LoginUserResponse } from "../types/user.dto";
import type { AxiosInstance, AxiosResponse } from "axios";

export class UserService {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api
  }

  async createUser(createUserRequest: CreateUserRequest): Promise<AxiosResponse> {
    const response = await this.api.post<CreateUserRespose>('/users', createUserRequest);
    return response;
  }

  async loginUser(loginUserRequest: LoginUserRequest): Promise<AxiosResponse> {
    const response = await this.api.post<LoginUserResponse>('/users/login', loginUserRequest);
    return response;
  }
}