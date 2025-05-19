<template>
  <aside class="w-full max-w-[300px] bg-elevated p-2 min-h-screen overflow-hidden flex flex-col">
    <div class="grid gap-2 mt-2 overflow-auto">
      <UButton
        variant="ghost"
        class="rounded-full"
        icon="i-lucide-plus"
        as="RouterLink"
        :to="{ name: 'new-chat' }"
        size="lg"
      >
        Nuevo chat
      </UButton>

      <span class="text-muted font-medium">Chats</span>

      <div class="flex flex-col overflow-x-hidden overflow-y-auto">
        <UTooltip
          v-for="(_, index) in Array.from({ length: 20 })"
          :key="index"
          :text="`Chat ${index + 1}`"
        >
          <UButton
            size="lg"
            variant="ghost"
            class="justify-start rounded-full text-muted"
            color="primary"
            block
            as="RouterLink"
            :to="`/${index + 1}`"
            active-variant="soft"
          >
            Chat {{ index + 1 }}
          </UButton>
        </UTooltip>
      </div>
    </div>
  </aside>
</template>
