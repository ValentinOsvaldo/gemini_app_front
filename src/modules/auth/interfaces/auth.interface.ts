import type { User } from './user.interface';

export interface AuthResponse {
  token: string;
  user: User;
}

export enum AuthStatus {
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated',
  Authenticating = 'authenticating',
}
