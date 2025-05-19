import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ui from '@nuxt/ui/vue-plugin';
import { VueQueryPlugin } from '@tanstack/vue-query';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.use(ui);

app.mount('#app');
