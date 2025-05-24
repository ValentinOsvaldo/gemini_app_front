<template>
  <UToaster>
    <UApp>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
      <VueQueryDevtools button-position="bottom-left" />
    </UApp>
  </UToaster>
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useAuthStore } from './modules/auth/store/auth.store';
import { AuthStatus } from './modules/auth/interfaces';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

authStore.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatus.Authenticating) {
      authStore.refreshToken();

      return;
    }

    if (route.path.includes('/login') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'home' });
      return;
    }

    if (state.authStatus === AuthStatus.Unauthenticated) {
      router.replace({ name: 'login' });
      return;
    }
  },
  {
    immediate: true,
  },
);
</script>
