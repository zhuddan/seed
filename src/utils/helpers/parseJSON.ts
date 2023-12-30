import { isJSONString } from './isJSONString';

export function parseJSON(value: any): any {
  if (typeof value == 'string' && isJSONString(value)) {
    value = JSON.parse(value);
    return parseJSON(value);
  }
  return value;
}
