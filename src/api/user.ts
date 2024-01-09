import type { UserModel } from '../model/user';

/**
 * 用户列表
 */
export async function listUser(params?: ListQuery<UserModel>) {
  return request.get<ResponseList<UserModel>>({
    url: '/system/user/list',
    params,
  });
}
/**
 * 新增用户
 */
export function addUser(data: UserModel) {
  return request.post({
    url: '/system/user',
    data,
  });
}
/**
 * 更新用户
 */
export function updateUser(data: UserModel) {
  return request.put({
    url: '/system/user',
    data,
  });
}
/**
 * 用户详情
 */
export function getUser(id: number) {
  return request.get<ResponseData<UserModel>>({
    url: `/system/user/${id}`,
  });
}
/**
 * 删除用户
 */
export function delUser(id: number) {
  return request.delete<ResponseData<UserModel>>({
    url: `/system/user/${id}`,
  });
}
