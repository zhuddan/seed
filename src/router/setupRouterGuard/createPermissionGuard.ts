import type { Router } from 'vue-router';

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    if (getCacheToken()) {
      if (!userStore.user) {
        await userStore.getInfo();
      }
    }
    next();
  });
}