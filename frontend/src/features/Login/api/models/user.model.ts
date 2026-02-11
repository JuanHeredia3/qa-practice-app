export interface User {
  username: string;
  fullName: string;
  email: string;
  passwordChangedAt?: Date;
  createdAt: Date;
}

export interface AuthSession {
  sessionId: string;
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  user: User;
}
