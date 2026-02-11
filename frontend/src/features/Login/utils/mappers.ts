import type { CreateUserRespose, LoginUserResponse } from "../api/dtos/user.dto";
import type { AuthSession, User } from "../api/models/user.model";
import type { UserMapper } from "../types/user.mapper.type";

export const mapUserDto = (
  dto: CreateUserRespose
): User => ({
  username: dto.Username,
  fullName: dto.FullName,
  email: dto.Email,
  passwordChangedAt: dto.PasswordChangedAt
    ? new Date(dto.PasswordChangedAt)
    : undefined,
  createdAt: new Date(dto.CreatedAt),
});

export const mapSessionDto = (
  dto: LoginUserResponse
): AuthSession => ({
  sessionId: dto.SessionId,
  accessToken: dto.AccessToken,
  accessTokenExpiresAt: new Date(dto.AccessTokenExpiresAt),
  refreshToken: dto.RefreshToken,
  refreshTokenExpiresAt: new Date(dto.RefreshTokenExpiresAt),
  user: mapUserDto(dto.User),
});

const mappers: UserMapper = {
  user: {
    transformUser: mapUserDto,
    transformSession: mapSessionDto,
  }
}

export default mappers;