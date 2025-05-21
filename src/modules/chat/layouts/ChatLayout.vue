<template>
  <div class="flex flex-row h-screen">
    <ChatSidebar />

    <main class="flex flex-col w-full mx-auto p-4">
      <ChatNavbar />
      <router-view v-slot="{ Component, route }">
        <transition>
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import ChatNavbar from '../components/ChatNavbar.vue';
import ChatSidebar from '../components/ChatSidebar.vue';
</script>
