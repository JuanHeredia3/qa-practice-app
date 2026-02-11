export interface CreateUserRequest {
  Username: string;
  Password: string;
  FullName: string;
  Email: string;
}

export interface CreateUserRespose {
  Username: string;
  FullName: string;
  Email: string;
  PasswordChangedAt: string | null;
  CreatedAt: string;
}

export interface LoginUserRequest {
  Username: string;
  Password: string;
}

export interface LoginUserResponse {
  SessionId: string;
  AccessToken: string;
  AccessTokenExpiresAt: string;
  RefreshToken: string;
  RefreshTokenExpiresAt: string;
  User: CreateUserRespose;
}