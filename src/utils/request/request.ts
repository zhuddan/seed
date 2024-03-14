import type { AxiosRequestConfig, Canceler } from 'axios';

import { ContentTypeEnum, HttpRequest, type HttpRequestConfig, HttpRequestMethodsEnum } from './HttpRequest';

import axios, { AxiosError } from 'axios';

interface CustomHeaders {
  /**
   * @description 是否需要token
   */
  withToken?: boolean;
  /**
  * @description 返回原生响应 AxiosResponse<T> 默认false
  */
  isReturnNativeResponse?: boolean;
  /**
  * @description 忽略重复请求。第一个请求未完成时进行第二个请求，第一个会被被取消
  *              参考 axios 取消请求 https://axios-http.com/zh/docs/cancellation
  */
  ignoreRepeatRequest?: boolean;
  /**
   * get 请求加时间戳
   */
  withTimestamp?: boolean;
  /**
   * 下载文件名称
   */
  filename?: string;
};
interface NativeResponseHeaders {
  isReturnNativeResponse: true;
};

const tokenKey = 'Authorization';
const tokenKeyScheme = 'Bearer';
const cancelMap = new Map<string, Canceler>();

export const request = new HttpRequest<CustomHeaders, NativeResponseHeaders>({
  baseURL: APP_API_URL,
  timeout: 2000,
  headers: {
    'Content-Type': ContentTypeEnum.JSON,
    withToken: false,
    ignoreRepeatRequest: true,
    isReturnNativeResponse: false,
  },
},
{
  request(config) {
    /**
     * token
     */
    if (config.headers?.withToken === true) {
      const token = getCacheToken();
      config.headers[tokenKey] = `${tokenKeyScheme} ${token}`;
    }
    /**
     * 添加时间戳到 get 请求
     */
    if (config.method?.toUpperCase() == HttpRequestMethodsEnum.GET) {
      config.params = { _t: `${Date.now()}`, ...config.params };
    }
    /**
     * 忽略重复请求。第一个请求未完成时进行第二个请求，第一个会被被取消
     */
    if (config.headers?.ignoreRepeatRequest) {
      const key = generateKey({ ...config });
      const cancelToken = new axios.CancelToken(c => cancelInterceptor(key, c));
      config.cancelToken = cancelToken;
    }
    return config;
  },

  requestError() {

  },
  response(_response) {
    cancelMap.delete(generateKey(_response.config));

    const config = _response.config as HttpRequestConfig<CustomHeaders>;
    if (config.headers?.isReturnNativeResponse) {
      return _response;
    }
    const responseData = _response.data as ResponseResult<object>;

    if (responseData.code === 200)
      return responseData as any;
    const e = new Error(getSystemErrorMessage(responseData.code));
    console.log(e);
    console.log(config.url);

    throw e;
  },
  responseError(error) {
    if (error.config)
      cancelMap.delete(generateKey(error.config));

    if (error instanceof AxiosError) {
      const m = getAxiosErrorErrorMessage(error.code);
      console.log('🤖 request 错误', m);
      throw new Error(m);
    }
    throw error;
  },
});

export function removeAllPenddingRequest() {
  for (const [, value] of cancelMap) {
    value?.('remove all pendding request');
  }
}

function cancelInterceptor(key: string, canceler: Canceler) {
  if (cancelMap.has(key)) {
    cancelMap.get(key)?.('cancel repeat request');
  }
  cancelMap.set(key, canceler);
}

function generateKey(config: AxiosRequestConfig) {
  const { url, method, params = {}, data = {} } = config;
  return `${url}-${method}-${JSON.stringify(method === 'get' ? params : data)}`;
}

function getAxiosErrorErrorMessage(code?: string): string {
  switch (code) {
    case 'ERR_BAD_OPTION_VALUE':
      return '选项设置了错误的值';
    case 'ERR_BAD_OPTION':
      return '无效的或不支持的选项';
    case 'ECONNABORTED':
      return '网络连接被中断，通常因为请求超时';
    case 'ETIMEDOUT':
      return '操作超时';
    case 'ERR_NETWORK':
      return '网络错误';
    case 'ERR_FR_TOO_MANY_REDIRECTS':
      return '请求被重定向了太多次，可能导致无限循环';
    case 'ERR_DEPRECATED':
      return '使用了已被废弃的函数或方法';
    case 'ERR_BAD_RESPONSE':
      return '从服务器接收到无效或错误的响应';
    case 'ERR_BAD_REQUEST':
      return '发送的请求格式错误或无效';
    case 'ERR_CANCELED':
      return '请求已经被取消';
    case 'ERR_NOT_SUPPORT':
      return '使用的某个功能或方法不被支持';
    case 'ERR_INVALID_URL':
      return '提供的URL无效';
    default:
      return '未知错误';
  }
}

function getSystemErrorMessage(status: number) {
  switch (status) {
    case 400:
      return '错误请求，服务器无法理解请求的格式';
    case 401:
      return '无效的会话，或者会话已过期，请重新登录。';
    case 403:
      return '当前操作没有权限';
    case 404:
      return '服务器无法根据客户端的请求找到资源';
    case 405:
      return '网络请求错误,请求方法未允许!';
    case 408:
      return '网络请求超时!';
    case 500:
      return '服务器内部错误，无法完成请求';
    case 502:
      return '网关错误';
    case 503:
      return '服务器目前无法使用（由于超载或停机维护）';
    case 504:
      return '网络超时!';
    case 505:
      return 'http版本不支持该请求!';
    default:
      return '未知错误';
  }
}