import type { GenModel } from '../model/gen';

/**
 * 代码生成列表
 */
export async function listGen(params?: ListQuery<GenModel>) {
  // await sleep(2e3);
  // if (global) {
  //   throw new Error('haha');
  // }
  return request.get<ResponseList<GenModel>>({
    url: '/tool/gen/list',
    params,
  }).then((res) => {
    // res.rows = [];
    // res.total = 0;
    return res;
  });
}
/**
 * 新增代码生成
 */
export function addGen(data: GenModel) {
  return request.post({
    url: '/tool/gen',
    data,
  });
}
/**
 * 更新代码生成
 */
export function updateGen(data: GenModel) {
  return request.put({
    url: '/tool/gen',
    data,
  });
}
/**
 * 代码生成详情
 */
export function getGen(id: number) {
  return request.get<ResponseData<AnyObject>>({
    url: `/tool/gen/preview/${id}`,
  });
}
/**
 * 删除代码生成
 */
export function delGen(id: number) {
  return request.delete<ResponseData<GenModel>>({
    url: `/tool/gen/${id}`,
  });
}
