import type { RouteRecordRaw } from 'vue-router';
import { isUnauthenticatedGuard } from '../guards/is-unauthenticated.guard';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    beforeEnter: [isUnauthenticatedGuard],
    component: () => import('@/modules/auth/views/LoginView.vue'),
  },
];
