<template>
  <aside
    :class="[
      'w-full bg-elevated min-h-screen overflow-hidden flex flex-col transition-all duration-300 fixed lg:relative z-50',
      {
        'max-w-[300px] p-2': openSidebar,
        'max-w-0': !openSidebar,
      },
    ]"
  >
    <div class="py-3 px-2">
      <UButton
        icon="i-lucide-menu"
        variant="ghost"
        color="neutral"
        size="xl"
        class="rounded-full"
        @click="toggleSidebar"
      />
    </div>
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
        <template v-if="chatsQuery.isLoading.value">
          <USkeleton
            class="w-full h-16 mb-2"
            v-for="(_, index) in Array.from({ length: 30 })"
            :key="index"
          />
        </template>

        <UButton
          v-for="chat in chatsQuery.data.value"
          :key="chat.id"
          size="lg"
          variant="ghost"
          :class="[
            'justify-between rounded-full',
            {
              'text-muted': chat.id !== route.params.chatId,
            },
          ]"
          color="primary"
          block
          @click="router.push({ name: 'chat', params: { chatId: chat.id } })"
          v-else
        >
          <span class="truncate">
            {{ chat.title }}
          </span>

          <template #trailing>
            <UDropdownMenu
              :items="[
                {
                  label: 'Delete',
                  icon: 'i-lucide-trash-2',
                  onSelect(ev) {
                    ev.stopPropagation();
                    handleDeleteChat(chat.id);
                  },
                },
              ]"
            >
              <UButton
                icon="i-lucide-ellipsis-vertical"
                variant="ghost"
                color="neutral"
                :disabled="deleteChatMutation.isPending.value"
                @click.stop
              />
            </UDropdownMenu>
          </template>
        </UButton>
      </div>
    </div>
  </aside>
  <Teleport to="body">
    <transition name="fade">
      <div
        class="fixed bg-black/25 backdrop-blur-xs lg:hidden z-40 inset-0"
        @click="toggleSidebar"
        v-show="openSidebar"
      ></div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { getChatsActions } from '../actions/get-chats';
import { deleteChatAction } from '../actions/delete-chat.action';
import { useSidebar } from '../composition/useSidebar';

const router = useRouter();
const route = useRoute();
const { openSidebar, toggleSidebar } = useSidebar();

const toast = useToast();

const chatsQuery = useQuery({
  queryKey: ['chats'],
  queryFn: getChatsActions,
});

const deleteChatMutation = useMutation({
  mutationFn: (chatId: string) => deleteChatAction(chatId),
});

const handleDeleteChat = (chatId: string) => {
  deleteChatMutation.mutate(chatId, {
    onSuccess: () => {
      chatsQuery.refetch();

      router.push({
        name: 'new-chat',
      });
    },
    onError: () => {
      toast.add({
        title: 'Error deleting chat',
        description: 'An error occurred while deleting the chat.',
        color: 'error',
      });
    },
  });
};

const disabledNewChat = computed(() => route.path === '/');
</script>
