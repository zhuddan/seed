import type { Router } from 'vue-router';

export function createHttpGuard(router: Router) {
  const { removeAllHttpPending } = { removeAllHttpPending: true };

  router.beforeEach(async () => {
    if (removeAllHttpPending)
      request.requestDeduplicator.removeAllPending();

    return true;
  });
}