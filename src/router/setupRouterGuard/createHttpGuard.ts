import type { Router } from 'vue-router';

export function createHttpGuard(router: Router) {
  const { removeAllHttpPending } = { removeAllHttpPending: false };
  router.beforeEach(async () => {
    if (removeAllHttpPending)
      removeAllPenddingRequest();
    return true;
  });
}