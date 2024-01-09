import type { UserModel } from '../model/user';

import { request } from '@/utils/request';
/**
 * 用户列表
 */
export function listUser(params?: ListQuery<UserModel>) {
  /**
         * dev bug test
         */
  // const errorNumber = Math.random();
  // if (errorNumber > .5) {
  //   return Promise.reject(new Error(errorNumber.toFixed(2)));
  // }
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
