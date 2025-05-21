<template>
  <div class="flex flex-col flex-1 overflow-auto">
    <section class="flex items-center flex-col gap-2 flex-1 overflow-auto">
      <div class="max-w-4xl w-full mx-auto p-4">
        <ChatMessage
          v-for="message in messagesQuery.data.value"
          :key="message.id"
          v-bind="message"
        />
      </div>
    </section>
    <div class="max-w-4xl w-full mx-auto p-4">
      <ChatTextarea />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import ChatTextarea from '../components/ChatTextarea.vue';
import { useRoute } from 'vue-router';
import { getMessagesById } from '../actions/get-messages-by-id';
import ChatMessage from '../components/ChatMessage.vue';

const route = useRoute();
const chatId = route.params.chatId as string;

const messagesQuery = useQuery({
  queryKey: ['messages', { id: chatId }],
  queryFn: () => getMessagesById(chatId),
});

// const messageMutation = useMutation({});
</script>
