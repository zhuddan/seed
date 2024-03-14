import { HttpRequest } from '../HttpRequest';

const h = new HttpRequest<{
  /**
   * @description 是否需要token
   */
  withToken?: boolean;
  /**
  * @description 返回原生响应 AxiosResponse<T> 默认false
  */
  isReturnNativeResponse?: boolean;
  /**
  * @description 是否 忽略重复请求 默认true（即相同的请求在第一个请求完成之前，其他请求都会被取消）
  *              结合 RequestDeduplicator 实现
  *              参考 axios 取消请求 https://axios-http.com/zh/docs/cancellation
  */
  ignoreRepeatRequest?: boolean;
},
 {
   isReturnNativeResponse: true;
 }>({

 });

const data = await h.post<{ name: string }>({
  headers: {
    isReturnNativeResponse: true,
  },
});
data.data;
const data2 = await h.get<{ name: string }>({
  headers: {
  },
});
data2.name;

// get = this.createRequest('get');
// post = this.createRequest('post');
// put = this.createRequest('put');
// delete = this.createRequest('delete');

// createRequest(method: string) {
//   const _request = this.request;
//   function request<U>(config: HttpRequestConfigWithoutMethod<IsReturnNativeResponse>): Promise<AxiosResponse<ResponseResult<U>>>;
//   function request<U>(config: HttpRequestConfigWithoutMethod<T>): Promise<ResponseResult<U>>;
//   function request<U>(config: HttpRequestConfigWithoutMethod<T>): Promise<AxiosResponse<ResponseResult<U>> | ResponseResult<U>> {
//     return _request({ ...config, method });
//   }
//   return request;
// }