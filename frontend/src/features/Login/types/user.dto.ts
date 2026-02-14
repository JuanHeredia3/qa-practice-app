export interface CreateUserRequest {
  full_name: string;
  email: string;
  username: string;
  password: string;
}

export interface CreateUserRespose {
  username: string;
  full_name: string;
  email: string;
  password_changed_at: string | null;
  created_at: string;
}

export interface LoginUserRequest {
  username: string;
  password: string;
}

export interface LoginUserResponse {
  session_id: string;
  access_token: string;
  access_token_expires_at: string;
  refresh_token: string;
  refresh_token_expires_at: string;
  user: CreateUserRespose;
}