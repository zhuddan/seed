import { router } from '@/router';

import { HttpRequest, HttpRequestHeadersContentTypeEnum } from './core';

import { getCacheToken } from '../cache';
import Qs from 'qs';

export const httpRequest = new HttpRequest({
  // AxiosRequestConfig
  baseURL: APP_API_URL,
  timeout: 2000,
  headers: {
    'Content-Type': HttpRequestHeadersContentTypeEnum.JSON,
  },
  paramsSerializer(params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },

  // HttpRequestOption
  withToken: true,
  joinTime: true,
  ignoreRepeatRequest: true,
  tokenKey: 'Authorization',
  authenticationScheme: 'Bearer',
}, {
  // onError: showErrorMessage,
  getToken: () => getCacheToken(),
  onTokenExpired: () => {
    const uerStore = useUserStore();
    uerStore.logout().then(() => {
      router.replace('/');
    });
  },
});
