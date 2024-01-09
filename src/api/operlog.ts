import type { OperlogModel } from '../model/operlog';

/**
 * 日志列表
 */
export function listOperlog(params?: ListQuery<OperlogModel>) {
  return request.get<ResponseList<OperlogModel>>({
    url: '/monitor/operlog/list',
    params,
  });
}
/**
 * 新增日志
 */
export function addOperlog(data: OperlogModel) {
  return request.post({
    url: '/monitor/operlog',
    data,
  });
}
/**
 * 更新日志
 */
export function updateOperlog(data: OperlogModel) {
  return request.put({
    url: '/monitor/operlog',
    data,
  });
}
/**
 * 日志详情
 */
export function getOperlog(id: number) {
  return request.get<ResponseData<OperlogModel>>({
    url: `/monitor/operlog/${id}`,
  });
}
/**
 * 删除日志
 */
export function delOperlog(id: number) {
  return request.delete<ResponseData<OperlogModel>>({
    url: `/monitor/operlog/${id}`,
  });
}
