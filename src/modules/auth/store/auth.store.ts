import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { AuthStatus, type User } from '../interfaces';
import { AuthService } from '../services/auth.service';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref(useStorage<string | null>('token', null));
  const authStatus = ref<AuthStatus>(AuthStatus.Authenticating);

  const login = async (email: string, password: string) => {
    try {
      authStatus.value = AuthStatus.Authenticating;

      const data = await AuthService.login(email, password);

      user.value = data.user;
      token.value = data.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch (error) {
      console.error(error);
      return logout();
    }
  };

  const refreshToken = async () => {
    try {
      authStatus.value = AuthStatus.Authenticating;

      const data = await AuthService.refreshToken();

      if (!data.ok) throw new Error(data.message);

      user.value = data.user;
      token.value = data.token;
      authStatus.value = AuthStatus.Authenticated;
    } catch {
      return logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');

    user.value = null;
    token.value = null;
    authStatus.value = AuthStatus.Unauthenticated;

    return false;
  };

  return {
    authStatus,
    token,
    user,

    login,
    logout,
    refreshToken,
  };
});
