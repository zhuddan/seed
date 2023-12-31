import type { App } from 'vue';

import { baseRoutes } from './routes/baseRoutes';
import { setupRouterGuard } from './setupRouterGuard';

import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: baseRoutes,
});

export function setupRouter(app: App) {
  app.use(router);
}

setupRouterGuard(router);

export default router;
