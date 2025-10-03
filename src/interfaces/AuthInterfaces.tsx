export interface LoginRequest {
  userName: string;
  passwordHash: string;
}

export interface LoginResponse {
  token: string;
  userId?: number;
  fullName?: string;
  role?: string;
}