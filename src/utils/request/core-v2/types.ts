import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpRequestInterceptors<T extends object> {
  request?: (value: HttpRequestConfig<T>) => HttpRequestConfig<T> | Promise<HttpRequestConfig<T>>;
  requestError?: (error: any) => (Promise<any> | any);
  response?: ((value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>) | null | undefined;
  responseError?: (error: any) => (Promise<any> | any);
}

// type Merge<A, B> = {
//   [K in keyof (A & B)]: K extends keyof B
//     ? B[K]
//     : K extends keyof A
//       ? A[K]
//       : never
// };

export interface HttpRequestConfig<T extends object> extends AxiosRequestConfig {
  headers?: AxiosRequestConfig['headers'] & Partial<T>;
}

export type HttpRequestConfigWithoutMethod<T extends object> = Omit<HttpRequestConfig<T>, 'method'>;

/**
 * @description 请求方法
 */
export enum HttpRequestMethodsEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description headers ContentType
 */
export enum HttpRequestHeadersContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

