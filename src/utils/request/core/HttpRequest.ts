import type { HttpHandlers, HttpRequestOption, HttpRequestOptionWithoutMethod, isReturnNativeResponseHttpRequestOption } from './types';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { HttpRequestDeduplicator } from './HttpRequestDeduplicator';
import { HttpRequestError } from './HttpRequestError';
import { HttpRequestHeadersContentTypeEnum, HttpRequestMethodsEnum } from './types';

import { getErrorMessageByCode, getErrorMessageByStatus } from '.';

import axios, { isAxiosError } from 'axios';
import { merge } from 'lodash-es';
import Qs from 'qs';

export class HttpRequest {
  /**
   * @description axios 实例
   */
  private axiosInstance: AxiosInstance;
  /**
   * @description 参数
   */
  private options: HttpRequestOption;
  /**
   * @description 处理方法
   */
  requestCallbacks: HttpHandlers;
  /**
   * @description 取消重复请求
   */
  requestDeduplicator = new HttpRequestDeduplicator();
  constructor(options: HttpRequestOption, requestHandlers: HttpHandlers = {}) {
    this.requestCallbacks = requestHandlers;
    this.axiosInstance = axios.create({
      ...options,
    });
    this.options = options;
    this.setupInterceptors();
  }

  private getOptions(config: InternalAxiosRequestConfig) {
    return merge({ ...this.options }, { ...config });
  }

  /**
   * @description 请求拦截器 https://axios-http.com/zh/docs/interceptors
   */
  private setupInterceptors() {
    // 是否忽略请求
    const addIgnoreCancelTokenInterceptor = (config: InternalAxiosRequestConfig) => {
      const options = this.getOptions(config);
      // 如果不忽略重复请求则 addPending
      if (!options.ignoreRepeatRequest)
        this.requestDeduplicator.addPending(config);
      return config;
    };
    this.axiosInstance.interceptors.request.use(addIgnoreCancelTokenInterceptor);

    // 添加 token
    const addTokenInterceptor = (config: InternalAxiosRequestConfig) => {
      const options = this.getOptions(config);
      if (options.withToken === true) {
        const token = this.requestCallbacks?.getToken?.();
        if (token) {
          config.headers[`${options?.tokenKey}`] = options.authenticationScheme
            ? `${this.options.authenticationScheme} ${token}`
            : token;
        }
        // DEBUG.log(`[HTTP REQUEST] TOKEN ==> ${this.options.authenticationScheme} ${token}`);
      }
      return config;
    };
    this.axiosInstance.interceptors.request.use(addTokenInterceptor);

    // 添加时间戳到 get 请求
    const addJoinTimeInterceptor = (config: InternalAxiosRequestConfig) => {
      if (config.method?.toUpperCase() == HttpRequestMethodsEnum.GET) {
        const options = this.getOptions(config);
        if (options.joinTime === true) {
          config.params = {
            _t: `${Date.now()}`,
            ...config.params,
          };
        }
      }

      return config;
    };

    this.axiosInstance.interceptors.request.use(addJoinTimeInterceptor);

    const handleBaseResponse = (axiosResponse: AxiosResponse) => {
      // 删除重复请求
      axiosResponse && this.requestDeduplicator.removePending(axiosResponse.config);
      return axiosResponse;
    };

    this.axiosInstance.interceptors.response.use(handleBaseResponse, (error: AxiosError) => {
      const { response, code } = error;
      // 处理错误
      let errMessage = '';
      // 如果 response?.status 则根据状态码翻译错误信息
      if (response?.status)
        errMessage = getErrorMessageByStatus(response.status);
      else
      // 否则根据 axios 的错误代码进行翻译（标准的Node.js和网络错误代码）
      // 参考 https://github.com/axios/axios/blob/v1.x/lib/core/AxiosError.js#L58
        errMessage = getErrorMessageByCode(code);
      error.message = errMessage; // 覆盖 AxiosError 错误信息
      return Promise.reject(error);
    });
  }

  private transformResponse<T extends AnyObject = AnyObject>(response: AxiosResponse<ResponseResult<T>>) {
    // 处理服务器返回的数据
    const { config, data } = response;
    const options = this.getOptions(config);
    // 是否返回原生数据 包含 headers status 等信息
    if (options.isReturnNativeResponse) {
      return response;
    }
    else {
      // 根据 服务器自定义状态码返回
      // 如果 code!=200 返回自定义错误
      if (typeof data === 'object' && (data as ResponseResult)?.code != 200) {
        const msg = getErrorMessageByStatus((data as ResponseResult)?.code);
        throw new HttpRequestError((data as ResponseResult).msg || msg, (data as ResponseResult).code);
      }
      else {
        return data;
      }
    }
  }

  // 检查 token 是否过期
  static isTokenExpired(e: Error | AxiosError | HttpRequestError) {
    return HttpRequestError.isHttpRequestError(e) && e.status === 401;
  }

  // 文件上传
  uploadFile<T extends AnyObject = AnyObject>(config: AxiosRequestConfig, params: Record<string, any>) {
    const formData = new window.FormData();
    const customFilename = params.name || 'file';

    if (params.filename)
      formData.append(customFilename, params.file, params.filename);
    else
      formData.append(customFilename, params.file);

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
        ignoreCancelToken: true,
      },
    });
  }

  // 格式化 formdata
  formatFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];

    if (
      contentType !== HttpRequestHeadersContentTypeEnum.FORM_URLENCODED
      || config.data && typeof config.data == 'object' && Object.keys(config.data.length)
      || config.method?.toUpperCase() === HttpRequestMethodsEnum.GET
    )
      return config;

    return {
      ...config,
      data: Qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  // 如果 返回 原生响应 则 => Promise<AxiosResponse<Result<T>>>
  // 否则 => Promise<Result<T>>
  get<T extends AnyObject = AnyObject>(config: isReturnNativeResponseHttpRequestOption): Promise<AxiosResponse<ResponseResult<T>>>;
  get<T extends AnyObject = AnyObject>(config: HttpRequestOptionWithoutMethod): Promise<ResponseResult<T>>;
  get<T extends AnyObject = AnyObject>(config: HttpRequestOptionWithoutMethod): Promise<ResponseResult<T> | AxiosResponse<ResponseResult<T>>> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T extends AnyObject = AnyObject>(config: isReturnNativeResponseHttpRequestOption): Promise<AxiosResponse<ResponseResult<T>>>;
  post<T extends AnyObject = AnyObject>(config: HttpRequestOptionWithoutMethod): Promise<ResponseResult<T>>;
  post<T extends AnyObject = AnyObject>(config: HttpRequestOptionWithoutMethod): Promise<ResponseResult<T> | AxiosResponse<ResponseResult<T>>> {
    return this.request({ ...config, method: 'POST' });
  }

  put<T extends AnyObject = AnyObject>(config: isReturnNativeResponseHttpRequestOption): Promise<AxiosResponse<ResponseResult<T>>>;
  put<T extends AnyObject = AnyObject>(config: HttpRequestOptionWithoutMethod): Promise<ResponseResult<T>>;
  put<T extends AnyObject = AnyObject>(config: HttpRequestOptionWithoutMethod): Promise<ResponseResult<T> | AxiosResponse<ResponseResult<T>>> {
    return this.request({ ...config, method: 'PUT' });
  }

  delete<T extends AnyObject = AnyObject>(config: isReturnNativeResponseHttpRequestOption): Promise<AxiosResponse<ResponseResult<T>>>;
  delete<T extends AnyObject = AnyObject>(config: HttpRequestOptionWithoutMethod): Promise<ResponseResult<T>>;
  delete<T extends AnyObject = AnyObject>(config: HttpRequestOptionWithoutMethod): Promise<ResponseResult<T> | AxiosResponse<ResponseResult<T>>> {
    return this.request({ ...config, method: 'DELETE' });
  }

  request<T extends AnyObject = AnyObject>(config: isReturnNativeResponseHttpRequestOption): Promise<AxiosResponse<ResponseResult<T>>>;
  request<T extends AnyObject = AnyObject>(config: HttpRequestOption): Promise<ResponseResult<T>>;
  request<T extends AnyObject = AnyObject>(config: HttpRequestOption): Promise<ResponseResult<T> | AxiosResponse<ResponseResult<T>>> {
    config = this.formatFormData(config);
    return this.axiosInstance.request(config)
      .then((res) => {
        return this.transformResponse(res);
      }).catch((e: Error | AxiosError | HttpRequestError) => {
        // 所有错误的最终处理
        // 重复请求不报错
        if (isAxiosError(e) && e.code == 'ERR_CANCELED') {
          console.warn('请求已经被取消');
        }
        else {
          // 是否登录过期
          if (HttpRequest.isTokenExpired(e))
            this.requestCallbacks?.onTokenExpired?.();
          else
            this.requestCallbacks.onError?.(e.message);
        }
        throw e; // 注意这里，我们直接抛出错误，不需要调用 reject
      });
  }
}
