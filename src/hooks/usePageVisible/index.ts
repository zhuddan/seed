import { useRouter } from '../useRouter';
import { onHide, onShow } from '@dcloudio/uni-app';
import { nextTick, ref, watch } from 'vue';

// 初始化

export function usePageVisible(onRouteVisibleChange?: (visible: boolean, last?: boolean) => void) {
  const router = useRouter({}, false);
  /**
   * 是否真删除
   */
  const pageVisible = ref(false);
  const appVisible = ref(true);
  /**
   * 是否是页面路由触发的页面隐藏
   */
  const routeVisible = ref(false);

  uni.onAppShow(() => {
    appVisible.value = true;
  });

  uni.onAppHide(() => {
    appVisible.value = false;
  });

  onShow(() => {
    pageVisible.value = true;
    routeVisible.value = true;
  });
  onHide(() => {
    pageVisible.value = false;
    nextTick(() => {
      const isCurrentPath = router.path == router.getCurrentPage()?.route;
      // 假隐藏
      if (isCurrentPath) {
        console.log('fake hide');
      }
      else {
        console.log('real hide');
        routeVisible.value = false;
      }
    });
  });

  watch(routeVisible, (visible, _visible) => {
    if (visible !== _visible) {
      onRouteVisibleChange?.(visible, _visible);
    }
  }, {
    immediate: true,
  });
  return {
    routeVisible,
    pageVisible,
    appVisible,
  };
}