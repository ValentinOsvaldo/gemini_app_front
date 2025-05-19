<script setup lang="ts">
import ChatSidebar from '../components/ChatSidebar.vue';
</script>

<template>
  <div class="flex flex-row h-screen">
    <ChatSidebar />
    <RouterView />
  </div>
</template>
