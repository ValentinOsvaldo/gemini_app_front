<template>
  <div
    :class="[
      'flex items-center w-full max-w-3/4',
      {
        'justify-end ml-auto': type === From.USER,
        'justify-start mr-auto': type === From.AI,
      },
    ]"
  >
    <div
      :class="[
        'my-4',
        {
          'bg-accented text-white px-4 py-2 rounded-full': type === From.USER,
          'text-white prose dark:prose-invert': type === From.AI,
        },
      ]"
      v-html="contentToHTML"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';
import { From } from '../interfaces/message.interface';

interface Props {
  type: From;
  content: string;
}

const props = defineProps<Props>();

const md = new MarkdownIt();
const contentToHTML = computed(() => md.render(props.content));
</script>
