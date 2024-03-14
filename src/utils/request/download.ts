import type { HttpRequestConfig } from './HttpRequest';

import { request } from './request';

import { saveAs } from 'file-saver';

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

function isBlob(data: any): data is Blob {
  return data instanceof Blob;
}

export function download(config: HttpRequestConfig<any>) {
  function getHeaderFileName(headers: Record<string, any>) {
    const headersFileNameKey = [
      'file-name',
      'download-filename',
      'File-Name',
      'FileName',
      'Filename',
    ];
    headersFileNameKey.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(headers, key)) {
        if (headers[key])
          return `${headers[key]}`;
      }
    });
    return '';
  }
  return request
    .request({
      ...config,
      transformRequest: [
        (params) => {
          return transformRequest(params);
        },
      ],
      responseType: 'blob',
      headers: {
        isReturnNativeResponse: true,
      },
    })
    .then(async (res) => {
      const data = res.data as unknown as Blob;
      const filename = config.headers?.filename;
      if (isBlob(res.data)) {
        if (res.data?.type && !filename) {
          saveAs(res.data as unknown as Blob);
        }
        else {
          const urlList = config.url?.split('/');
          const extList = config.url?.split('.');
          const urlFileName = urlList && urlList?.length >= 0 ? urlList[urlList?.length - 1] : '';
          const ext = extList && extList?.length >= 0 ? extList[extList?.length - 1] : '';
          const _filename = filename || getHeaderFileName(config.headers || {}) || urlFileName || `${Date.now()}.${ext}`;
          saveAs(res.data, decodeURI(decodeURI(_filename)));
        }
      }
      else {
        const resText = await data.text();
        const rspObj = JSON.parse(resText);
        const e = new Error(rspObj.msg, rspObj.code || 500); // 在同步代码中抛出错误
        throw e;
      }
    });
}