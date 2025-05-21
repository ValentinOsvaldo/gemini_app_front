<template>
  <div class="flex items-center w-full max-w-3/4 justify-start mr-auto">
    <div class="my-4 px-4 py-2 bg-muted rounded-full text-white flex gap-1">
      <span class="animate-bounce delay-0">.</span>
      <span class="animate-bounce delay-200">.</span>
      <span class="animate-bounce delay-400">.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// No necesitas lógica aquí, es solo presentación
</script>

<style scoped>
@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.animate-bounce {
  display: inline-block;
  animation: bounce 1.4s infinite ease-in-out both;
}

.delay-0 {
  animation-delay: 0s;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-400 {
  animation-delay: 0.4s;
}
</style>
