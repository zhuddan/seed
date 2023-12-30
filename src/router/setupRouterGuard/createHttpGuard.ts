import type { Router } from 'vue-router';

import { request } from '@/utils/request';

export function createHttpGuard(router: Router) {
  const { removeAllHttpPending } = { removeAllHttpPending: true };

  router.beforeEach(async () => {
    if (removeAllHttpPending)
      request.requestDeduplicator.removeAllPending();

    return true;
  });
}