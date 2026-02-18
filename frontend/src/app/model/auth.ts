export interface User {
  id: number;
  user: string;
  role: 'USER' | 'ADMIN';
}

export interface LoginResponse {
  token: string;
  user: User;
}