<template>
  <div
    :class="[
      'flex items-center',
      {
        'justify-end': from === From.USER,
        'justify-start': from === From.AI,
      },
    ]"
  >
    <div
      :class="[
        'flex items-center px-2 py-2 rounded-xl',
        {
          'bg-primary text-white': from === From.USER,
          'bg-default text-white': from === From.AI,
        },
      ]"
    >
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { From } from '../interfaces/message.interface';

interface Props {
  from: From;
  message: string;
}

defineProps<Props>();
</script>
