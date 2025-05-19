import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../store/auth.store';
import { AuthStatus } from '../interfaces';

export const isUnauthenticatedGuard = async (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

  await authStore.refreshToken();

  return authStore.authStatus === AuthStatus.Unauthenticated ? next() : next({ name: 'home' });
};
