import { authRoutes } from '@/modules/auth/routes';
import { useAuthStore } from '@/modules/auth/store/auth.store';
import { chatRoutes } from '@/modules/chat/routes';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authRoutes, ...chatRoutes],
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  // Esperamos a que el estado de autenticación se estabilice
  if (auth.authStatus === 'authenticating') {
    await auth.refreshToken(); // o espera a que termine
  }

  const isAuthenticated = auth.authStatus === 'authenticated';

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login' });
  }

  if (to.meta.requiresGuest && isAuthenticated) {
    return next({ name: 'home' });
  }

  return next();
});

export default router;
