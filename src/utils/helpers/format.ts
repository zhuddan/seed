export interface FormatOptions<T extends object> {
  /**
   *  label 字段
   */
  labelField?: keyof T;
  /**
   * value 字段
   */
  valueField?: keyof T;
  /**
   * 是否返回原始数据
   */
  isRaw?: boolean;
  /**
   * 分隔符
   */
  symbol?: string;
}

/**
 * @description 格式化字典数据 从一个对象列表中 找到一个值或多个值和对象列表中的对象的值匹配的值(默认匹配对象的value)
 * @param arr
 * @param value
 * @param options
 * @example
 */
export function format<T extends object, U extends keyof T = keyof T>(
  arr: T[],
  value: T[U],
  options: FormatOptions<T> & { isRaw: true }
): Partial<T>;
export function format<T extends object, U extends keyof T = keyof T>(
  arr: T[],
  value: T[U][],
  options: FormatOptions<T> & { isRaw: true }
): Partial<T>[];
export function format<T extends object, U extends keyof T = keyof T>(
  arr: T[],
  value: T[U] | T[U][],
  options?: FormatOptions<T>
): string;
export function format<T extends object, U extends keyof T = keyof T>(
  arr: T[],
  value: T[U] | T[U][],
  options: FormatOptions<T> = {},
) {
  const valueList = Array.isArray(value) ? value : [value];
  const labelField = (options?.labelField || 'label') as keyof T;
  const valueField = (options?.valueField || 'value') as keyof T;

  const symbol = options?.symbol || '/';
  const isRaw = options?.isRaw || false;
  const isValueArray = !Array.isArray(value);

  const resultList = valueList.map((valueItem) => {
    const result = arr.find(it => it[valueField] == valueItem) || {};
    return result as Partial<T>;
  });
  if (isRaw) return isValueArray ? resultList[0] : resultList;

  return resultList.map(e => e[labelField]).join(symbol);
}
