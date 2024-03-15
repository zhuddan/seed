import './assets/styles/index.scss';

import App from './App.vue';
import { say } from './directive';
import router from './router';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

function initApp() {
  const app = createApp(App);
  app.use(createPinia());
  app.use(router);
  app.use(appGlobalProperties);

  // 使 v-focus 在所有组件中都可用
  app.directive('say', say);

  app.mount('#app');
}

initApp();

