import { ContentTypeEnum } from './HttpRequest';
import { request } from './request';

import { merge } from 'lodash-es';

function transformRequest(params?: object) {
  if (!isObject(params)) return '';
  let result = '';
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    const part = `${encodeURIComponent(propName)}=`;
    if (value !== null && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== 'undefined') {
            const params = `${propName}[${key}]`;
            const subPart = `${encodeURIComponent(params)}=`;
            result += `${subPart + encodeURIComponent(value[key])}&`;
          }
        }
      }
      else {
        result += `${part + encodeURIComponent(value)}&`;
      }
    }
  }
  return result;
}

export function download(config: Parameters<typeof request.request>[0]) {
  const c = merge(config, {
    transformRequest: [
      (params: object) => {
        return transformRequest(params);
      },
    ],
    responseType: 'blob',
    headers: {
      isReturnNativeResponse: true as const,
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });
  return request.request({ ...c });
}