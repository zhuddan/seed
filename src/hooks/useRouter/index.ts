import { Router } from '@/utils/app';
import { logger } from '@/utils/helpers';

import { useQuery } from '../useQuery';
import { onLoad } from '@dcloudio/uni-app';
import { nextTick, reactive } from 'vue';

/**
 * 路由 hooks
 */
export function useRouter<T extends AnyObject = AnyObject>(defaultValue: T = {} as T, debugMsg = true) {
  logger.info('[useRouter]');
  const query = useQuery<T>(defaultValue, debugMsg);
  const router = reactive(new Router<T>());
  router.init();
  onLoad(() => {
    router.setQuery((query.value || {}) as T);
    router.setPath(router.getCurrentPage()?.route || '');
    nextTick(() => {
      router.runReady((query.value || {}) as T);
    });
  });
  return router;
}
