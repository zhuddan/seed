import './assets/styles/index.scss';

import App from './App.vue';
import { globalComponents } from './components';
import router from './router';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

function initApp() {
  const app = createApp(App);
  app.use(createPinia());
  app.use(router);
  app.use(globalComponents);
  app.mount('#app');
}

initApp();

// 26
