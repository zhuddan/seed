import './assets/styles/index.scss';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';

import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

function initApp() {
  const app = createApp(App);
  app.use(createPinia());
  app.use(router);
  app.use(globalProperties);
  app.use(ElementPlus);
  app.mount('#app');
}

initApp();

