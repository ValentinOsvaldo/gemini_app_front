<template>
  <aside class="w-full max-w-[300px] bg-elevated p-2 min-h-screen overflow-hidden flex flex-col">
    <div class="grid gap-2 mt-2 overflow-auto">
      <UButton
        variant="ghost"
        :class="[
          'rounded-full',
          {
            'text-muted': disabledNewChat,
          },
        ]"
        icon="i-lucide-plus"
        as="RouterLink"
        :to="{ name: 'new-chat' }"
        size="lg"
        :disabled="disabledNewChat"
      >
        New chat
      </UButton>

      <!-- <span class="text-muted font-medium">Chats</span> -->

      <div class="flex flex-col overflow-x-hidden overflow-y-auto">
        <UTooltip v-for="chat in chatsQuery.data.value" :key="chat.id" :text="chat.title">
          <UButton
            size="lg"
            variant="ghost"
            class="justify-start rounded-full text-muted"
            color="primary"
            block
            as="RouterLink"
            :to="`/${chat.id}`"
            active-variant="soft"
          >
            {{ chat.title }}
          </UButton>
        </UTooltip>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { getChatsActions } from '../actions/get-chats';

const router = useRoute();
const chatsQuery = useQuery({
  queryKey: ['chats'],
  queryFn: getChatsActions,
});

const disabledNewChat = computed(() => router.path === '/');
</script>
