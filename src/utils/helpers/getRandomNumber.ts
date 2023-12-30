/**
 * 获取随机数 一个参数时 最小值为0
 * @param minOrMinRange
 * @param max
 */
export function getRandomNumber(minOrMinRange: number, max?: number): number {
  if (max === undefined) {
    // 仅传递一个参数，范围为 0 到 minOrMinRange
    return Math.floor(Math.random() * (minOrMinRange + 1));
  }
  else {
    // 传递两个参数，范围为 minOrMinRange 到 max
    return Math.floor(Math.random() * (max - minOrMinRange + 1)) + minOrMinRange;
  }
}
