import type { HttpRequestConfig, HttpRequestConfigWithoutMethod, HttpRequestInterceptors } from './types';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, Canceler, InternalAxiosRequestConfig } from 'axios';

import { HttpRequestHeadersContentTypeEnum, HttpRequestMethodsEnum } from './types';

import axios from 'axios';
import { merge } from 'lodash-es';
import Qs from 'qs';

const cancelMap = new Map<string, Canceler>();

export class HttpRequestV2<T extends object, IsReturnNativeResponse extends T = T> {
  /**
   * @description axios 实例
   */
  private axiosInstance: AxiosInstance;
  /**
   * @description 参数
   */
  private baseConfig: HttpRequestConfig<T>;
  /**
   * @description 取消重复请求
   */
  constructor(options: HttpRequestConfig<T>, interceptors?: HttpRequestInterceptors<T>) {
    this.baseConfig = {
      ...options,
    };

    this.axiosInstance = axios.create(this.baseConfig);

    const {
      request,
      response,
      requestError,
      responseError,
    } = interceptors || {};

    this.axiosInstance.interceptors.request.use(async (config) => {
      const _config = merge(this.baseConfig, config);
      const value = await (request?.(_config) || _config) ;
      return value as InternalAxiosRequestConfig;
    }, requestError);

    this.axiosInstance.interceptors.response.use((data) => {
      return (response?.(data) || data);
    }, (error) => {
      return responseError?.(error) || Promise.reject(error);
    });
  }

  // 文件上传
  uploadFile<T extends AnyObject = AnyObject>(config: AxiosRequestConfig, params: Record<string, any>) {
    const formData = new window.FormData();
    const customFilename = params.name || 'file';

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename);
    }
    else {
      formData.append(customFilename, params.file);
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }
        formData.append(key, params.data![key]);
      });
    }

    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': HttpRequestHeadersContentTypeEnum.FORM_DATA,
      },
    });
  }

  // 格式化 formdata
  formatFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.baseConfig.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];
    if (
      contentType !== HttpRequestHeadersContentTypeEnum.FORM_URLENCODED
      || config.data && typeof config.data == 'object' && Object.keys(config.data.length)
      || config.method?.toUpperCase() === HttpRequestMethodsEnum.GET
    ) {
      return config as HttpRequestConfig<T>;
    }
    return {
      ...config,
      data: Qs.stringify(config.data, { arrayFormat: 'brackets' }),
    } as HttpRequestConfig<T>;
  }

  removeAllPenddingRequest() {
    for (const [, value] of cancelMap) {
      value?.('remove all pendding request');
    }
  }

  get<U extends object>(config: HttpRequestConfigWithoutMethod<T>): Promise<ResponseResult<U>>;
  get<U extends object>(config: HttpRequestConfigWithoutMethod<IsReturnNativeResponse>): Promise<AxiosResponse<ResponseResult<U>>>;
  get<U extends object>(config: HttpRequestConfigWithoutMethod<T>): Promise<AxiosResponse<ResponseResult<U>> | ResponseResult<U>> {
    return this.request({ ...config, method: 'get' });
  }

  post<U extends object>(config: HttpRequestConfigWithoutMethod<T>): Promise<ResponseResult<U>>;
  post<U extends object>(config: HttpRequestConfigWithoutMethod<IsReturnNativeResponse>): Promise<AxiosResponse<ResponseResult<U>>>;
  post<U extends object>(config: HttpRequestConfigWithoutMethod<T>): Promise<AxiosResponse<ResponseResult<U>> | ResponseResult<U>> {
    return this.request({ ...config, method: 'post' });
  }

  put<U extends object>(config: HttpRequestConfigWithoutMethod<T>): Promise<ResponseResult<U>>;
  put<U extends object>(config: HttpRequestConfigWithoutMethod<IsReturnNativeResponse>): Promise<AxiosResponse<ResponseResult<U>>>;
  put<U extends object>(config: HttpRequestConfigWithoutMethod<T>): Promise<AxiosResponse<ResponseResult<U>> | ResponseResult<U>> {
    return this.request({ ...config, method: 'put' });
  }

  delete<U extends object>(config: HttpRequestConfigWithoutMethod<T>): Promise<ResponseResult<U>>;
  delete<U extends object>(config: HttpRequestConfigWithoutMethod<IsReturnNativeResponse>): Promise<AxiosResponse<ResponseResult<U>>>;
  delete<U extends object>(config: HttpRequestConfigWithoutMethod<T>): Promise<AxiosResponse<ResponseResult<U>> | ResponseResult<U>> {
    return this.request({ ...config, method: 'delete' });
  }

  request<U extends object>(config: HttpRequestConfig<T>): Promise<ResponseResult<U>>;
  request<U extends object>(config: HttpRequestConfigWithoutMethod<IsReturnNativeResponse>): Promise<AxiosResponse<ResponseResult<U>>>;
  request<U extends object>(config: HttpRequestConfig<T>): Promise<ResponseResult<U> | AxiosResponse<ResponseResult<U>>> {
    const _config = merge(this.baseConfig, this.formatFormData(config));
    const c = {
      ..._config,
    };
    return this.axiosInstance.request(c);
  }
}
