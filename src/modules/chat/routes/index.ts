import { isAuthenticatedGuard } from '@/modules/auth/guards/is-authenticated.guard';
import type { RouteRecordRaw } from 'vue-router';

export const chatRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    beforeEnter: [isAuthenticatedGuard],
    redirect: { name: 'new-chat' },
    component: () => import('@/modules/chat/layouts/ChatLayout.vue'),
    children: [
      {
        path: '/',
        name: 'new-chat',
        component: () => import('@/modules/chat/views/NewChatView.vue'),
      },
      {
        path: '/:chatId',
        name: 'chat',
        component: () => import('@/modules/chat/views/ChatView.vue'),
      },
    ],
  },
];
