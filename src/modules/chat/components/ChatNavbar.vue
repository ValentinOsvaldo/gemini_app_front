<template>
  <header>
    <nav class="flex items-center justify-between mx-auto px-4">
      <div class="flex flex-row items-center gap-4">
        <Transition name="fade">
          <UButton
            icon="i-lucide-menu"
            variant="ghost"
            color="neutral"
            size="xl"
            class="rounded-full"
            @click="toggleSidebar"
            v-if="!openSidebar"
          />
        </Transition>
        <h2
          class="font-medium text-xl bg-gradient-to-br from-red-500 to-purple-500 bg-clip-text text-transparent"
        >
          Gemini
        </h2>
      </div>

      <div class="flex items-center gap-4">
        <ColorModeButton />

        <UDropdownMenu :items="items" :content="{ align: 'start' }">
          <UAvatar size="xl" :alt="authStore.user?.name" />
        </UDropdownMenu>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { DropdownMenuItem } from '@nuxt/ui';
import { useAuthStore } from '@/modules/auth/store/auth.store';
import { useRouter } from 'vue-router';
import { useSidebar } from '../composition/useSidebar';
import ColorModeButton from '@/modules/shared/components/ColorModeButton.vue';

const authStore = useAuthStore();
const router = useRouter();
const { toggleSidebar, openSidebar } = useSidebar();

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
