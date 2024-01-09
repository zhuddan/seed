export function useDataDetail<T, Q extends numeric = number>(
  fetch: ((params: Q) => Promise<ResponseData<T>>),
  options: {
    name?: string;
    immediate?: boolean;
  } = {},
) {
  const { name = 'id', immediate = true } = options;
  const query = useRouteQuery(name, null, { transform: Number }) as Ref<Q>;
  const data = ref({}) as Ref<T>;
  const error = ref(false);
  const errorMessage = ref('');
  const pullRefreshLoading = ref(false);
  const loading = ref(false);
  async function getData() {
    if (query.value && !loading.value) {
      loading.value = true;
      try {
        data.value = (await fetch(query.value)).data;
        error.value = false;
      }
      catch (e: any) {
        error.value = true;
        errorMessage.value = (e?.message != null && e?.message != 'null' && e?.message != undefined)
          ? e?.message
          : '出现错误！';
      }
      finally {
        pullRefreshLoading.value = false;
        loading.value = false;
      }
    }
  }

  watch(query, getData, { immediate });

  return {
    query,
    data,
    errorMessage,
    error,
    pullRefreshLoading,
    getData,
  };
}