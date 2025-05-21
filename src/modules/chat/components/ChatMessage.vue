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
      class="gemini-content"
      :class="[
        'px-2 py-2 rounded-xl',
        {
          'bg-primary text-white': type === From.USER,
          'text-white': type === From.AI,
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

<style>
/* Esto podría necesitar !important si prose tiene mayor especificidad,
   pero la mejor práctica es configurar el plugin o usar clases directamente en `pre` */
.gemini-content pre {
  background-color: #f1f3f4; /* Fondo para modo claro */
  color: #3c4043; /* Texto para modo claro */
  border-radius: 0.75rem; /* rounded-xl */
  padding: 1rem;
  overflow-x: auto; /* Desplazamiento horizontal */
  font-family: 'Fira Code', 'SFMono-Regular', 'Menlo', 'monospace';
  font-size: 0.875rem; /* text-sm */
  line-height: 1.5;
}

/* Modo oscuro */
html.dark .gemini-content pre {
  background-color: #202124; /* Fondo para modo oscuro */
  color: #e8eaed; /* Texto para modo oscuro */
}

/* Estilos para código inline (<code>) */
.gemini-content code {
  background-color: #e8e8e8; /* Fondo para modo claro */
  color: #3c4043;
  padding: 0.2em 0.4em;
  border-radius: 0.375rem; /* rounded-md */
  font-weight: normal;
}

html.dark .gemini-content code {
  background-color: #303134; /* Fondo para modo oscuro */
  color: #e8eaed;
}

/* Ajustes para listas si prose no los cubre a tu gusto */
.gemini-content ul {
  list-style-type: disc;
  margin-left: 1.5em; /* ml-6 */
  padding-left: 0;
}

.gemini-content li {
  margin-bottom: 0.5em; /* mb-2 */
}

.gemini-content strong {
  font-weight: 600; /* semibold */
  color: inherit; /* Para que herede el color del texto principal */
}
</style>
