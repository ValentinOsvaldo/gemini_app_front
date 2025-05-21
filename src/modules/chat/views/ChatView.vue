<template>
  <div v-if="messagesQuery.isFetching.value" class="flex items-center justify-center h-screen">
    <div class="animate-spin">
      <UIcon name="i-lucide-loader" class="size-10" />
    </div>
  </div>
  <div class="flex flex-col flex-1 overflow-auto" v-else>
    <section class="flex items-center flex-col gap-2 flex-1 overflow-auto" ref="chatContainer">
      <div class="max-w-4xl w-full mx-auto p-4">
        <ChatMessage
          v-for="message in messagesQuery.data.value"
          :key="message.id"
          v-bind="message"
        />

        <ChatMessage v-for="(message, index) in localMessages" :key="index" v-bind="message" />

        <TypingIndicator v-if="messageMutation.isPending.value" />
      </div>
    </section>
    <div class="max-w-4xl w-full mx-auto p-4">
      <ChatTextarea @submit="onPrompt" :pending="messageMutation.isPending.value" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { AxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/vue-query';
import ChatMessage from '../components/ChatMessage.vue';
import ChatTextarea from '../components/ChatTextarea.vue';
import { getMessagesById } from '../actions/get-messages-by-id';
import {
  generatePromptById,
  type GeneratePromptResponse,
} from '../actions/generate-prompt-by-chat';
import { From, type Message } from '../interfaces/message.interface';
import TypingIndicator from '../components/TypingIndicator.vue';

const route = useRoute();
const chatId = computed(() => route.params.chatId as string);
const chatContainer = ref<HTMLElement | null>(null);
const localMessages = ref<Omit<Message, 'id'>[]>([]);

const messagesQuery = useQuery({
  queryKey: ['messages', chatId],
  queryFn: () => getMessagesById(chatId.value),
});

const messageMutation = useMutation<GeneratePromptResponse, AxiosError, string>({
  mutationFn: (prompt) => generatePromptById(chatId.value, prompt),
});

const onPrompt = async (prompt: string) => {
  try {
    localMessages.value.push({
      content: prompt,
      type: From.USER,
    });

    const { text } = await messageMutation.mutateAsync(prompt);

    localMessages.value.push({
      content: text,
      type: From.AI,
    });
  } catch (error) {
    console.error(error);
  }
};

watch(
  () => messagesQuery.data.value,
  async () => {
    await nextTick(); // espera a que DOM se actualice
    chatContainer.value?.scrollTo({
      top: chatContainer.value.scrollHeight,
      behavior: 'auto',
    });
  },
);

watch(localMessages, async () => {
  await nextTick();
  chatContainer.value?.scrollTo({
    top: chatContainer.value.scrollHeight,
    behavior: 'smooth',
  });
});
</script>
