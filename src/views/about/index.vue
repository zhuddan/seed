<script setup lang="ts">
import type { MaybeRefOrGetter } from 'vue';

import { listOperlog } from '@/api/operlog';
import { sleep } from '@/utils/helpers';

import { isEqual } from 'lodash-es';

function useDataList<T extends AnyObject>(
  fetch: (params: ListQuery<T>) => Promise<ResponseList<T>>,
  options: {
    /**
     * 分页参数 默认 { pageNum: 1, pageSize: 10 }
     */
    pageParams?: Partial<ListParamsBase>;
    /**
   *  搜索过滤 默认 ()=>({})
   */
    filter?: MaybeRefOrGetter<Partial<T>> | ComputedRef<Partial<T>>;
    /**
     *  是否监听 filter 自动进行刷新 默认false
     */
    // immediate?: boolean;
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
  const pageParamsRef = ref(pageParams) as Ref<ListParamsBase>;
  /**
   * 查询参数
   */
  const params = computed(() => {
    return {
      ...pageParamsRef.value,
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
   * 是否加载
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
   * 错误信息
   */
  const errorMessage = ref('');
  /**
   * 是否刷新
   */
  const refreshing = ref(false);

  /**
   * 禁止刷新
   */
  const enablePullRefresh = computed(() => {
    /**
     * 没有数据且报错了 即第一次请求就报错了
     */
    return !((list.value.length == 0) && error.value);
  });
  async function onLoad() {
    /**
     * __DEV 测试
     */
    await sleep();
    fetch({
      ...params.value,
    }).then((res) => {
      if (refreshing.value) {
        refreshing.value = false;
      }

      const nextListValue: T[] = refreshing.value ? [
        ...res.rows,
      ] : [
        ...list.value,
        ...res.rows,
      ];

      if (!isEqual(nextListValue, list.value)) {
        list.value = [...nextListValue];
      }
      total.value = res.total;
      finished.value = list.value.length >= total.value;
      if (!finished.value) {
        pageParamsRef.value.pageNum += 1;
      }
      loading.value = false;
    }).catch((e) => {
      errorMessage.value = `请求失败[${e.message}],点击重新加载` || '未知错误';
      error.value = true;
      loading.value = false;
    });
  };

  function onRefresh() {
    finished.value = false;
    pageParamsRef.value.pageNum = 1;
    loading.value = true;
    onLoad();
  };

  return {
    list,
    loading,
    finished,
    error,
    refreshing,
    errorMessage,
    enablePullRefresh,
    onRefresh,
    onLoad,
  };
}

const {
  list,
  loading,
  finished,
  error,
  refreshing,
  errorMessage,
  enablePullRefresh,
  onRefresh,
  onLoad,
} = useDataList(listOperlog);
</script>

<template>
  <div style="height2: var(--app-content-height);">
    <van-pull-refresh
      v-model="refreshing"
      finished-text="finished-text"
      loading-text="loadingxxx"
      :disabled="!enablePullRefresh"
      @refresh="onRefresh"
    >
      <van-list
        v-model:loading="loading"
        v-model:error="error"
        :finished="finished"
        finished-text="没有更多了"
        :error-text="errorMessage"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item.operId"
          :title="item.title"
          label="描述信息"
          :value="item.operId"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped>

</style>