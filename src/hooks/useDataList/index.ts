import type { ComputedRef, MaybeRefOrGetter } from 'vue';

import { sleep } from '@/utils/helpers';

import { isEqual } from 'lodash-es';

export function useDataList<T extends AnyObject>(
  fetch: (params: ListQuery<T>) => Promise<ResponseList<T>>,
  options: {
    /**
     * 分页参数 默认 { pageNum: 1, pageSize: 20 }
     */
    pageParams?: Partial<ListParamsBase>;
    /**
     *  搜索过滤 默认 ()=>({})
     */
    filter?: MaybeRefOrGetter<Partial<T>> | ComputedRef<Partial<T>>;
  } = {},
) {
  const {
    pageParams = {
      pageNum: 1,
      pageSize: 20,
    },
    filter = () => ({}),
  } = options;
  /**
   * 分页参数
   */
  const paramsRef = ref(pageParams) as Ref<ListParamsBase>;
  /**
   * 查询参数
   */
  const params = computed(() => {
    console.log(toValue(filter));
    return {
      ...paramsRef.value,
      ...toValue(filter),
    } as ListParamsWrapper<T>;
  });
  /**
   * 数据总长度
   */
  const total = ref(0);
  /**
   * 列表数据
   */
  const list = ref<T[]>([]) as Ref<T[]>;

  /**
   * 是否加载 van-list loading
   */
  const listLoading = ref(false);
  /**
   * 数据加载loading 用于拦截重复的请求
   */
  const loading = ref(false);
  /**
   * 是否完成
   */
  const finished = ref(false);
  /**
   * 是否错误
   */
  const error = ref(false);
  /**
   * 是否空数据
   */
  const empty = computed(() => !list.value.length);
  /**
   * 错误信息
   */
  const errorMessage = ref('');
  /**
   * 是否刷新，仅用于不是用户手动下拉触发的刷新，如果使用 refreshing 会导致 van-pull-refresh 触发动画
   */
  const isFresh = ref(true);
  /**
   * 是否刷新 用户下拉刷新动作 van-pull-refresh
   */
  const refreshing = ref(false);
  /**
   * 禁止刷新
   */
  const enablePullRefresh = computed(() => {
    return !listLoading.value;
  });

  async function getData() {
    loading.value = true;
    /**
     * __DEV 测试
     */
    await sleep(1200);
    console.log('pageNum', paramsRef.value.pageNum);
    console.log('pageSize', paramsRef.value.pageSize);
    console.log('error.value', error.value);
    console.log(params.value);
    fetch(params.value)
      .then((res) => {
        const nextListValue: T[] = isFresh.value
          ? [...res.rows]
          : [...toRaw(list.value), ...res.rows];

        if (!isEqual(nextListValue, list.value)) {
          list.value = [...nextListValue];
        }

        total.value = res.total;
        finished.value = list.value.length >= total.value;
        if (!finished.value) {
          paramsRef.value.pageNum += 1;
        }
        if (refreshing.value) {
          refreshing.value = false;
          isFresh.value = false;
        }
        listLoading.value = false;
        loading.value = false;
      }).catch((e) => {
        errorMessage.value = `请求失败[${e.message}],点击重新加载` || '未知错误';
        error.value = true;
        listLoading.value = false;
        loading.value = false;
        if (refreshing.value) {
          refreshing.value = false;
          isFresh.value = false;
          list.value = [];
          finished.value = true;
        }
      });
  };

  /**
   * 用户手动触发下拉刷新
   */
  function onRefresh() {
    isFresh.value = true;
    listLoading.value = true;
    error.value = false;
    finished.value = false;
    paramsRef.value.pageNum = 1;
    return getData();
  };

  /**
   * 搜索
   */
  function onSearch() {
    isFresh.value = true;
    listLoading.value = true;
    error.value = false;
    finished.value = false;
    paramsRef.value.pageNum = 1;
    return getData();
  }

  /**
   * 查询
   */
  function getList() {
    /**
     * loading
     */
    if (loading.value) {
      return Promise.resolve();
    }

    /**
     * 如果刷新的话 设置 pageNum = 1
     */
    if (isFresh.value) {
      paramsRef.value.pageNum = 1;
      return getData();
    }

    /**
     * 错误时候 重新请求
     */
    if (error.value) {
      return getData();
    }
    /**
     * 没有更多数据的话拦截
     */
    if (finished.value) {
      return Promise.resolve('finished');
    }

    paramsRef.value.pageNum++;
    return getData();
  }

  return {
    list,
    listLoading,
    finished,
    error,
    isFresh,
    refreshing,
    errorMessage,
    enablePullRefresh,
    empty,
    getList,
    onRefresh,
    onSearch,
  };
}