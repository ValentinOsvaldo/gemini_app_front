<template>
  <div
    :class="[
      'flex flex-col w-full mb-4',
      {
        'items-end': type === From.USER,
        'items-start w-full': type === From.AI,
      },
    ]"
  >
    <div
      :class="['flex flex-col prose dark:prose-invert text-left w-full max-w-4/5 flex-1']"
      v-html="contentToHTML"
      v-if="type === From.AI"
    ></div>

    <div v-else class="bg-accented rounded-xl overflow-x-hidden max-w-3/4">
      <div class="whitespace-pre-wrap px-4 py-2">
        {{ content }}
      </div>
    </div>
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
