<template>
  <header>
    <nav class="flex items-center justify-between container mx-auto px-4 py-2">
      <h2>Gemini</h2>

      <UDropdownMenu :items="items" :content="{ align: 'start' }">
        <UAvatar size="xl" :alt="authStore.user?.name" />
      </UDropdownMenu>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { DropdownMenuItem } from '@nuxt/ui';
import { useAuthStore } from '@/modules/auth/store/auth.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Logout',
    icon: 'i-lucide-log-out',
    onSelect() {
      router.push({
        name: 'login',
      });
      authStore.logout();
    },
  },
]);
</script>
