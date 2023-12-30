/**
 * 是否是二维数组
 * @param arr
 */
export function is2DArray<T>(arr: T | T[][]): arr is T[][] {
  if (!Array.isArray(arr))
    return false;

  if (!arr.length)
    return false;

  for (const subArray of arr) {
    if (!Array.isArray(subArray))
      return false;
  }

  return true;
}
