import type { User } from './user.interface';

export interface RefreshTokenSuccess {
  ok: true;
  token: string;
  user: User;
}

export interface RefreshTokenError {
  ok: false;
  message: string;
}
