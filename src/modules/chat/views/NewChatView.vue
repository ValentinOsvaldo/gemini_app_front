<template>
  <main class="flex flex-col w-full mx-auto p-4">
    <ChatNavbar />
    <div class="flex flex-col max-w-4xl w-full h-full mx-auto">
      <section class="flex-1 flex items-center justify-center">
        <h2 class="text-4xl">Hola Rero</h2>
      </section>
      <form
        @submit.prevent="onSubmit"
        class="w-full overflow-hidden rounded-xl border border-neutral-600"
      >
        <UTextarea
          autoresize
          variant="none"
          placeholder="Ask something to gemini"
          class="w-full p-2"
          v-model="prompt"
          @keydown.enter="handleKeydown"
        />

        <div class="flex items-center justify-end px-3 py-1.5">
          <UTooltip text="Send">
            <UButton
              icon="i-lucide-send-horizontal"
              class="rounded-full p-3"
              size="lg"
              color="neutral"
              variant="ghost"
              @click="onSubmit"
            />
          </UTooltip>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChatNavbar from '../components/ChatNavbar.vue';

const prompt = ref('');

const onSubmit = () => {
  if (prompt.value.trim() === '') return;

  console.log(prompt.value);

  prompt.value = '';
};

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    if (event.shiftKey) {
      // Shift + Enter: permite salto de línea
      return;
    } else {
      // Solo Enter: evita salto de línea y envía
      event.preventDefault();
      onSubmit();
    }
  }
}
</script>
