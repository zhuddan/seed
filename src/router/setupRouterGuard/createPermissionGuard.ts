import type { Router } from 'vue-router';

import { getCacheToken } from '@/utils/cache';

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    if (getCacheToken()) {
      if (!userStore.user) {
        try {
          await userStore.getInfo();
          next();
        }
        catch (error) {
          next();
        }
      }
      else {
        next();
      }
    }
    else {
      next();
    }
  });
}