<template>
  <div class="flex flex-col max-w-4xl w-full h-full mx-auto">
    <section class="flex-1 flex items-center justify-center">
      <h2 class="text-4xl font-medium">
        Hello
        <span class="bg-gradient-to-br from-red-500 to-purple-500 bg-clip-text text-transparent">
          {{ username }}
        </span>
      </h2>
    </section>

    <ChatTextarea @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/modules/auth/store/auth.store';
import ChatTextarea from '../components/ChatTextarea.vue';

const authStore = useAuthStore();
const username = computed(() => authStore.user?.name.split(' ')[0]);

const onSubmit = (prompt: string) => {
  console.log(prompt);
};
</script>
