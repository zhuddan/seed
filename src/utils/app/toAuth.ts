import { useRouter } from '@/hooks';
import { debounce, logger } from '@/utils/helpers';

import { removeCacheToken } from '../cache';

export const toAuth = debounce(() => {
  const router = useRouter();
  removeCacheToken();
  logger.error('登录过期/需要重新授权');
  const t = getCurrentPages();
  const pageName = t?.[t.length - 1].route || '';
  if (pageName.includes('/pages/auth')) return;
  router.replace({
    url: '/pages/auth/index',
  });
}, 500);