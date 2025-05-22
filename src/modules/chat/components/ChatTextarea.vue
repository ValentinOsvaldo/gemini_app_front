<template>
  <form
    class="w-full overflow-hidden rounded-xl border border-neutral-600"
    @submit.prevent="$emit('submit', prompt)"
  >
    <UTextarea
      autoresize
      variant="none"
      placeholder="Ask something to gemini"
      class="w-full p-2"
      v-model="prompt"
      :maxrows="5"
      @keydown.enter="onPressEnter"
    />

    <div class="flex items-center justify-end px-3 py-1.5">
      <UTooltip text="Send">
        <UButton
          icon="i-lucide-send-horizontal"
          class="rounded-full p-3"
          size="lg"
          color="neutral"
          variant="ghost"
          :disabled="prompt.length === 0 || pending"
          @click="$emit('submit', prompt)"
        />
      </UTooltip>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Props {
  pending: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'submit', prompt: string): void;
}>();

const prompt = ref('');

const onPressEnter = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    if (event.shiftKey) {
      return;
    } else {
      event.preventDefault();
      if (prompt.value.trim().length === 0 || props.pending) return;
      emit('submit', prompt.value);

      prompt.value = '';
    }
  }
};
</script>
