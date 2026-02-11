import type { CreateUserRequest, LoginUserRequest } from "../api/dtos/user.dto";
import type { AuthSession, User } from "../api/models/user.model";
import type { IUserRepository } from "../types/user.repository.type";
import type { UserMapper } from "../types/user.mapper.type";

export class UserManager {
  private repository: IUserRepository;
  private mappers: UserMapper;

  constructor(repository: IUserRepository, mappers: UserMapper) {
    this.repository = repository;
    this.mappers = mappers;
  }

  async createUser(createUserRequest: CreateUserRequest): Promise<User> {
    const user = await this.repository.createUser(createUserRequest);
    return this.mappers.user.transformUser(user);
  }

  async loginUser(loginUserRequest: LoginUserRequest): Promise<AuthSession> {
    const session = await this.repository.loginUser(loginUserRequest);
    return this.mappers.user.transformSession(session);
  }
}