import type { UniLoadMoreProps } from '@uni-helper/uni-ui-types';
import type { Ref } from 'vue';

import { isSameArray, mergeDeep } from '@/utils/helpers';

import { usePageVisible } from '../usePageVisible';
import { useRouter } from '../useRouter';
import { onHide, onShow } from '@dcloudio/uni-app';
import { computed, nextTick, ref, toRaw, watch } from 'vue';

export type RuoyiSort<T extends AnyObject = AnyObject> = T & {
  orderByColumn?: string;
  isAsc?: string;
};

interface UseDataListOption<T extends Recordable = Recordable, R = T> {
  /**
   * 分页参数 默认 { pageNum: 1, pageSize: 10 }
   */
  pageParams?: Partial<ListParamsBase>;
  /**
   *  搜索过滤 默认 ()=>({})
   */
  filter?: () => Partial<RuoyiSort<T>>;
  /**
   *  格式化数据 默认 item =>item
   */
  formater?: (item: T) => R;
  /**
   *  格式化数据 默认 item =>item
   */
  formaterList?: (item: T[]) => R[];
  /**
   *  是否监听 filter 自动进行刷新 默认false
   */
  isWatch?: boolean;
  /**
   * (evt: "change", args_0: T[]) => void)
   */
  emit?: (e: 'change', args_0: R[], total: number) => void;
  /**
   * 是否页面 show 时 刷新
   */
  refreshOnPageShow?: boolean;
}
/**
 * @description 分页列表 只支持 ruoyi 列表接口 {PromiseFn<ListQuery<T>, ResponseList<T>>}
 * @export
 * @template T
 * @template R
 * @param {PromiseFn<ListQuery<T>, ResponseList<T>>} fetch 搜索接口
 * @param {UseDataListOption<T, R>} options 参数
 * @returns {{ params: any; status: any; isFresh: any; list: any; isError: any; getList: () => void; onFresh: () => void; }}
 */
export function useDataList<T extends object = object, R = T>(
  fetch: PromiseFn<ListQuery<T>, ResponseList<T>>,
  options?: UseDataListOption<T, R>,
) {
  const router = useRouter({}, false);
  /**
   *  默认true
   */
  const refreshOnPageShow = options?.refreshOnPageShow === undefined ? true : options?.refreshOnPageShow;

  const pageParams = mergeDeep({ pageNum: 1, pageSize: 10 }, options?.pageParams || ({ }));
  /**
   *  过滤条件
   */
  const filter = options?.filter || (() => ({}) as MaybeRef<Partial<RuoyiSort<T>>>);
  /**
   * 格式化 谨慎使用!
   */
  const formater = options?.formater;
  /**
   * 格式化列表
   */
  const formaterList = options?.formaterList;
  /**
   * 时间戳
   */
  const timestamp = ref(Date.now());
  /**
   * 是否监听
   */
  const isWatch = options?.isWatch == undefined ? true : options?.isWatch;
  /**
   * emit
   */
  const emit = options?.emit;
  /**
   *  过滤参数
   */
  const filterParams = computed(filter);
  /**
   * 总条数
   */
  const total = ref(0);
  /**
   * 列表参数
   */
  const listParams = ref(pageParams) as Ref<ListParamsWrapper<T>>;
  /**
   * 数据列表
   */
  const list: Ref<R[]> = ref([]);
  /**
   * list
   */
  const status = ref<UniLoadMoreProps['status']>();
  const isFresh = ref(true);
  /**
   * 用户下拉刷新
   */
  const refresherTriggered = ref(false);
  const isError = ref(false);
  const pageShow = ref<boolean>();
  const statusVisible = ref(false);

  function updateStatusVisible() {
    const _statusVisible = !refresherTriggered.value && ((status.value === 'noMore' && total.value > 0)) && !isError.value;
    console.log(statusVisible.value, _statusVisible, status.value);
    console.log(!refresherTriggered.value, status.value === 'noMore', total.value > 0, !isError.value);
    if (statusVisible.value != _statusVisible) {
      statusVisible.value = _statusVisible;
    }
  }

  function getList() {
    if (status.value == 'loading')
      return Promise.resolve();

    if (isFresh.value) {
      listParams.value.pageNum = 1;
      return getData(listParams.value);
    }
    if (status.value == 'noMore')
      return Promise.resolve();

    listParams.value.pageNum++;
    return getData(listParams.value);
  }

  function updateStatus(total: number, list: (T | R)[]) {
    const current = listParams.value.pageSize * (listParams.value.pageNum - 1) + list.length;
    const isOver = current >= total;
    status.value = isOver ? 'noMore' : 'more';
  }

  function handleResponse(res: ResponseList<T>) {
    const _list = (formaterList ? formaterList(res.rows) : res.rows) as T[];
    const formaterRows = (formater ? _list.map(formater) : _list) as R[];
    total.value = res.total;
    timestamp.value = Date.now();

    const newListList = isFresh.value ? [...formaterRows] : [...toRaw(list.value), ...formaterRows];
    const isSame = isSameArray(newListList, toRaw(list.value));

    if (isFresh.value) {
      isFresh.value = false;
    }
    if (!isSame) {
      list.value = [...newListList];
    }
    emit?.('change', list.value, res.total);
    updateStatus(total.value, formaterRows);
  }

  function getData(query: ListParamsWrapper<T>) {
    isError.value = false;
    status.value = 'loading';

    return fetch({
      ...query,
      ...filterParams.value,
    })
      .then((res) => {
        handleResponse(res);
      }).catch((error) => {
        if (__DEV__) {
          console.log('[useDataList error]: ');
          console.log(error);
        }
        status.value = 'noMore';
        isError.value = true;
      }).finally(() => {
        isFresh.value = false;
        refresherTriggered.value = false;
        updateStatusVisible();
      });
  }

  function onFresh() {
    isFresh.value = true;
    return getList();
  }

  function onPageShowFresh() {
    const listLength = list.value.length;
    isFresh.value = true;
    if (listLength <= listParams.value.pageNum) {
      console.log('$$ onPageShowFresh normal');
      return getList();
    }
    else {
      if (status.value == 'loading')
        return Promise.resolve();

      isError.value = false;
      const query = {
        pageSize: Math.ceil(listLength / listParams.value.pageSize) * listParams.value.pageSize,
        pageNum: 1,
      } as ListParamsWrapper<T>;
      console.log('$$ onPageShowFresh hack');
      return getData(query);
    }
  }

  function watchFilterParams() {
    if (isWatch) onFresh();
  }

  /**
   * 点击底部
   */
  function loadMore() {
    if (isError.value) {
      if (list.value.length && status.value !== 'noMore')
        return getList();
      else
        return onFresh();
    }
    else {
      return getList();
    }
  }
  /** 自定义下拉刷新被触发时触发 */
  function refresherrefresh() {
    refresherTriggered.value = true;
    return onFresh();
  }

  onShow(() => {
    pageShow.value = true;
  });

  onHide(() => {
    nextTick(() => {
      const isCurrentPath = router.path == router.getCurrentPage()?.route;
      // 假隐藏
      if (isCurrentPath) {
        console.log('fake hide');
      }
      else {
        console.log('real hide');
        pageShow.value = false;
      }
    });
  });

  usePageVisible((visible) => {
    if (visible && refreshOnPageShow) {
      console.log('usePageVisible onPageShowFresh');
      onPageShowFresh();
    }
  });

  watch(filterParams, watchFilterParams, { deep: true });

  router.ready(() => {
    if (!refreshOnPageShow) {
      console.log('router.ready');
      onPageShowFresh();
    }
  });

  return {
    params: listParams,
    status,
    isFresh,
    list,
    isError,
    refresherTriggered,
    statusVisible,
    total,
    timestamp,
    loadMore,
    updateStatus,
    getList,
    onFresh,
    refresherrefresh,
  };
}
