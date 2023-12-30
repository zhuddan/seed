import './assets/main.css';

import App from './App.vue';
import router from './router';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.config.globalProperties.test = 'test';

app.mount('#app');

