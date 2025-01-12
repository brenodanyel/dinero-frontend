import './assets/main.css';

import uiPlugin from '@nuxt/ui/vue-plugin';
import { createApp } from 'vue';
import { router } from './router';

import App from './App.vue';

const app = createApp(App);

app.use(uiPlugin);
app.use(router);

app.mount('#app');
