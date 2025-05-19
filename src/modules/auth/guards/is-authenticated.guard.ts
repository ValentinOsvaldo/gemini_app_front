import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const isAuthenticatedGuard = async (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const token = localStorage.getItem('token');

  if (!token) return next({ name: 'login' });
  if (token && token.length === 0) return next({ name: 'login' });

  return next();
};
