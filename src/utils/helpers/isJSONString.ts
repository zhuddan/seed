/**
 * 判断一个字符串是否是 json 字符串
 * @param str
 */
export function isJSONString(str: string): boolean {
  try {
    if (/^[0-9]+$/.test(str)) return false;
    JSON.parse(str);
    return true;
  }
  catch (error) {
    return false;
  }
}
