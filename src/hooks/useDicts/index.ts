import type { FormatOptions } from '@/utils/helpers/format';

import { type MaybeRefOrGetter, computed, reactive, toRaw, toRefs } from 'vue';

export type DictTypes =
| 'sys_yes_or_no' // '系统是否'
;

export interface OriginDictData {
  // value
  id?: string;
  dictCode?: number;
  dictValue?: string;
  // label
  dictLabel?: string;
  // name
  dictType?: string;
  // other
  cssClass?: string;
  listClass?: string;
  isDefault?: string;
  status?: string;

  // other label
  title?: string;
  name?: string;
  label?: string;
  // other value
  value?: string | number;
  code?: string | number;
  key?: string | number;
  //
  remark?: string;
}

export interface DictData {
  value: string;
  label: string;
  raw?: Partial<OriginDictData>;
}

function loadDict(dictType: string) {
  return request.get<{ data: OriginDictData[] }>({
    url: `/system/dict/data/type/${dictType}`,
  });
}

interface UseDictsOptions {
  isLazy?: boolean;
  labelField?: keyof OriginDictData;
  valueField?: keyof OriginDictData;
}
type DictsLoadingKey<DT extends DictTypes> = `${DT}_loading`;
export type DictsRecord<DT extends DictTypes> = Record<DT, DictData[]>;
type DictsLoadingRecord<DT extends DictTypes> = Record<
  DictsLoadingKey<DT>,
  boolean
>;

function useDictFormatter<DT extends DictTypes = DictTypes>(
  dictsData: DictsRecord<DT>,
) {
  const defaultFormatDictOptions: FormatOptions<DictData> = {
    labelField: 'label',
    valueField: 'value',
  };

  function formatDictSync(
    dictKey: DT,
    value: string,
    options: FormatOptions<DictData> & { isRaw: true }
  ): Partial<DictData>;
  function formatDictSync(
    dictKey: DT,
    value: [string],
    options: FormatOptions<DictData> & { isRaw: true }
  ): Partial<DictData>;
  function formatDictSync(
    dictKey: DT,
    value: string[],
    options: FormatOptions<DictData> & { isRaw: true }
  ): Partial<DictData>[];
  function formatDictSync(
    dictKey: DT,
    value: string | string[],
    options?: FormatOptions<DictData>
  ): string;
  function formatDictSync(
    dictKey: DT,
    value: string | string[],
    options: FormatOptions<DictData> = {},
  ): string | Partial<DictData> | Partial<DictData>[] {
    return toRaw(format<DictData>(dictsData[dictKey], value, {
      ...options,
      ...defaultFormatDictOptions,
    }));
  }

  function formatDictComputed(
    dictKey: DT,
    value: MaybeRefOrGetter<string>,
    options: FormatOptions<DictData> & { isRaw: true }
  ): Partial<DictData>;
  function formatDictComputed(
    dictKey: DT,
    value: MaybeRefOrGetter<[string]>,
    options: FormatOptions<DictData> & { isRaw: true }
  ): Partial<DictData>;
  function formatDictComputed(
    dictKey: DT,
    value: MaybeRefOrGetter<string[]>,
    options: FormatOptions<DictData> & { isRaw: true }
  ): Partial<DictData>[];
  function formatDictComputed(
    dictKey: DT,
    value: MaybeRefOrGetter<string> | MaybeRefOrGetter<string[]>,
    options?: FormatOptions<DictData>
  ): string;
  function formatDictComputed(
    dictKey: DT,
    value: MaybeRefOrGetter<string> | MaybeRefOrGetter<string[]>,
    options: FormatOptions<DictData> = {},
  ): string | Partial<DictData> | Partial<DictData>[] {
    const result = computed(() =>
      format<DictData>(dictsData[dictKey], toValue(value), {
        ...options,
        ...defaultFormatDictOptions,
      }),
    );
    return result;
  }

  return {
    formatDictSync,
    formatDictComputed,
  };
}

/**
 * 字典
 * @param dictTypes
 * @param options
 */
export function useDicts<DT extends DictTypes = DictTypes>(
  dictTypes: DT[],
  options: UseDictsOptions = {},
  cb?: (
    dictsData: DictsRecord<DT>,
    dictsLoading: DictsLoadingRecord<DT>,
  ) => void,
) {
  const dictsData = reactive({} as DictsRecord<DT>) as DictsRecord<DT>;
  const dictsLoading = reactive(
    {} as DictsLoadingRecord<DT>,
  ) as DictsLoadingRecord<DT>;
  const { formatDictSync, formatDictComputed } = useDictFormatter(dictsData);

  const isLazy = options.isLazy == undefined ? false : options.isLazy;
  const labelField = options.labelField || 'dictLabel';
  const valueField = options.valueField || 'dictValue';

  function initializeDict(dt: DT) {
    dictsData[dt] = [];
    dictsLoading[`${dt}_loading`] = true;
  }

  function loadDictItem(dt: DT) {
    if (!dt) return;
    return loadDict(dt)
      .then((res) => {
        const result = res.data.map<DictData>((e) => {
          return {
            raw: e,
            label: `${e[labelField]!}`,
            value: `${e[valueField]!}`,
          };
        });
        dictsData[dt] = result;

        if (__DEV__) {
          if (!result.length) {

          }
        }
      })
      .catch((error) => {
        console.error(`Error loading dict: ${dt}`, error);
        dictsData[dt] = [];
      })
      .finally(() => {
        dictsLoading[`${dt}_loading`] = false;
      });
  }

  function loadDictData(maybeDictTypeList: DT | DT[]) {
    const dicts = Array.isArray(maybeDictTypeList)
      ? maybeDictTypeList
      : [maybeDictTypeList];
    return Promise.all(dicts.map(e => loadDictItem(e))).then((res) => {
      cb?.(toRaw(dictsData), toRaw(dictsLoading));
      return res;
    });
  }

  function init() {
    dictTypes.forEach(initializeDict);
    if (!isLazy) getDictData();
  }

  function getDictData() {
    return loadDictData(dictTypes);
  }

  init();

  return {
    dictsData,
    dictsLoading,
    ...toRefs(dictsLoading),
    ...toRefs(dictsData),
    formatDictSync,
    formatDictComputed,
    //
    getDictData,
  };
}
