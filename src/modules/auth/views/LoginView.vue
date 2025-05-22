<template>
  <div class="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
    <header class="flex items-end justify-end w-full">
      <ColorModeButton />
    </header>

    <form
      class="flex-1 flex flex-col justify-center w-full max-w-xl gap-4"
      @submit.prevent="onLogin"
    >
      <h1 class="text-6xl font-medium text-center">VueMini</h1>
      <UInput placeholder="Email" type="email" size="xl" v-model="email" ref="emailInputRef" />
      <UInput
        v-model="password"
        placeholder="Password"
        :type="show ? 'text' : 'password'"
        :ui="{ trailing: 'pe-1' }"
        ref="passwordInputRef"
        size="xl"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="xl"
            :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="show ? 'Hide password' : 'Show password'"
            :aria-pressed="show"
            aria-controls="password"
            @click="show = !show"
          />
        </template>
      </UInput>

      <UButton block type="submit"> Login </UButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../store/auth.store';
import ColorModeButton from '@/modules/shared/components/ColorModeButton.vue';

const authStore = useAuthStore();
const toast = useToast();

const show = ref(false);
const email = ref('');
const password = ref('');
const emailInputRef = ref();
const passwordInputRef = ref();

const onLogin = async () => {
  if (email.value.trim().length === 0) {
    return emailInputRef.value?.inputRef.focus();
  }

  if (password.value.trim().length === 0) {
    return passwordInputRef.value?.inputRef.focus();
  }

  const ok = await authStore.login(email.value, password.value);

  if (!ok) {
    toast.add({
      title: 'Login failed',
      description: 'Invalid email or password',
      color: 'error',
    });
  }
};
</script>
