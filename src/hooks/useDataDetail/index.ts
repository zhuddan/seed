import { mergeDeep } from '@/utils/helpers';

import { useQuery } from '../useQuery';
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
import { type Ref, computed, nextTick, ref } from 'vue';

interface UseDataDetailQuery {
  [key: string]: number;
}

type _UseDataDetailQuery = UseDataDetailQuery | undefined;
/**
 * @description 根据 query.id 获取详情
 * @param fetch 详情接口
 * @param useDataDetailOption
 */
export function useDataDetail<T extends Recordable = Recordable>(
  fetch: PromiseFn<number, ResponseData<T>>,
  useDataDetailOption?: {
    /**
     * 立即执行
     */
    immediate?: boolean;
    /**
     * 默认id debug only
     */
    defaultId?: number;
    /**
     * 请求完成时
     */
    onComplete?: (dataRef: Ref<T>, responseData: T) => void;
    /**
     * 结合 refresh-view 加载数据时候 是否被动触发下列动画 是否设置loading 为 true
     */
    loadDataWithoutRefresher?: boolean;
    /**
     * idKey 默认string
     */
    idKey?: string;
  },
) {
  const option = mergeDeep({
    immediate: true,
    loadDataWithRefresher: false,
    idKey: 'id',
  }, (useDataDetailOption || {}));

  const data: Ref<T> = ref({}) as Ref<T>;
  const loading = ref(false);
  const idKey = option.idKey!;
  const isEmpty = computed(() => {
    return !Object.keys(data.value).length && !loading.value;
  });

  let queryOption: _UseDataDetailQuery = undefined;

  if (__DEV__) {
    if (option.defaultId != undefined) {
      queryOption = {
        [idKey]: option.defaultId,
      };
    }
  }
  const query = useQuery<UseDataDetailQuery>(queryOption, false);
  const id = computed(() => query.value[idKey]);

  async function getData() {
    if (query.value[idKey] == undefined) {
      if (!option.loadDataWithoutRefresher) {
        await nextTick();
        loading.value = false;
      }
      // console.warn(`[useDataDetail] onLoad options.${idKey} is undefined`);
      console.warn(`[useDataDetail] onLoad options.${idKey} is undefined`);
      uni.stopPullDownRefresh();
      return Promise.resolve();
    }
    option.loadDataWithoutRefresher && (loading.value = true);
    return fetch(query.value[idKey]).then((res) => {
      if (res.data && Object.keys(res.data).length) {
        data.value = res.data;
      }
      option.onComplete?.(data, res.data || {});
    }).finally(() => {
      loading.value = false;
      uni.stopPullDownRefresh();
    });
  }

  onLoad(() => {
    if (option.immediate) {
      getData();
    }
  });

  onPullDownRefresh(() => {
    getData();
  });

  return {
    getData,
    isEmpty,
    data,
    loading,
    id,
  };
}