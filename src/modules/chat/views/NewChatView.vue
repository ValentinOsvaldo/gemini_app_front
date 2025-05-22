<template>
  <div class="flex flex-col max-w-4xl w-full h-full mx-auto">
    <section class="flex-1 flex items-center justify-center" v-if="localMessages.length === 0">
      <h2 class="text-4xl font-medium">
        <span class="bg-gradient-to-br from-red-500 to-purple-500 bg-clip-text text-transparent">
          Hello {{ username }}
        </span>
      </h2>
    </section>

    <section class="max-w-4xl w-full mx-auto p-4 flex-1" v-else>
      <ChatMessage v-for="(message, index) in localMessages" :key="index" v-bind="message" />

      <TypingIndicator v-if="newChatMutation.isPending.value" />
    </section>

    <ChatTextarea @submit="onSubmit" :pending="newChatMutation.isPending.value" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { AxiosError } from 'axios';
import ChatMessage from '../components/ChatMessage.vue';
import ChatTextarea from '../components/ChatTextarea.vue';
import { createChatAction, type NewChatResponse } from '../actions/create-chat.action';
import { useAuthStore } from '@/modules/auth/store/auth.store';
import { From, type Message } from '../interfaces/message.interface';
import TypingIndicator from '../components/TypingIndicator.vue';

const router = useRouter();
const queryClient = useQueryClient();
const authStore = useAuthStore();
const localMessages = ref<Omit<Message, 'id'>[]>([]);
const newChatMutation = useMutation<NewChatResponse, AxiosError, string>({
  mutationFn: (prompt) => createChatAction(prompt),
});

const username = computed(() => authStore.user?.name.split(' ')[0]);

const onSubmit = async (prompt: string) => {
  localMessages.value.push({
    content: prompt,
    type: From.USER,
  });

  const { chat_id, text } = await newChatMutation.mutateAsync(prompt);

  localMessages.value.push({
    content: text,
    type: From.AI,
  });

  router.push(`/${chat_id}`);

  queryClient.invalidateQueries({
    queryKey: ['chats'],
  });
};
</script>
