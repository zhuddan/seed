import { mergeDeep } from '@/utils/helpers';

import { type Ref, computed, nextTick, ref } from 'vue';

// type UseDataDetailQuery = {
//   [key: string]: number;
// } | undefined;
/**
 * @description 根据 query.id 获取详情
 * @param fetch 详情接口
 * @param options
 */
export function useDataDetail<T extends object = object>(
  fetch: (maybeId: numeric) => Promise<ResponseData<T>>,

  options?: {
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
  }, (options || {}));

  const data: Ref<T> = ref({}) as Ref<T>;
  const loading = ref(false);
  const idKey = option.idKey!;
  const isEmpty = computed(() => {
    return !Object.keys(data.value).length && !loading.value;
  });
  const route = useRoute();

  const id = computed(() => {
    const id = route.query[idKey] as numeric;
    if (!id && option.defaultId != undefined) {
      return option.defaultId;
    }
    return id;
  });

  async function getData() {
    if (id.value == undefined) {
      if (!option.loadDataWithoutRefresher) {
        await nextTick();
        loading.value = false;
      }
      // console.warn(`[useDataDetail] onLoad options.${idKey} is undefined`);
      console.warn(`[useDataDetail] onLoad options.${idKey} is undefined`);
      return Promise.resolve();
    }
    option.loadDataWithoutRefresher && (loading.value = true);
    return fetch(id.value).then((res) => {
      if (res.data && Object.keys(res.data).length) {
        data.value = res.data;
      }
      option.onComplete?.(data, res.data || {});
    }).finally(() => {
      loading.value = false;
    });
  }

  return {
    getData,
    isEmpty,
    data,
    loading,
    id,
  };
}