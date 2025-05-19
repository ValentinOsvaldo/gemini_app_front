import { AxiosError } from 'axios';
import { vueMiniApi } from '@/api';
import type { AuthResponse, RefreshTokenError, RefreshTokenSuccess } from '../interfaces';

export class AuthService {
  static async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await vueMiniApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    return data;
  }

  static async refreshToken(): Promise<RefreshTokenSuccess | RefreshTokenError> {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return {
          ok: false,
          message: 'No token found',
        };
      }

      if (token && token.length === 0) {
        return {
          ok: false,
          message: 'No token found',
        };
      }

      const { data } = await vueMiniApi.get<AuthResponse>('/auth/refresh');

      return {
        token: data.token,
        user: data.user,
        ok: true,
      };
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        return {
          ok: false,
          message: error.response?.data.message || 'Error refreshing token',
        };
      }

      return {
        ok: false,
        message: 'Error refreshing token',
      };
    }
  }
}
