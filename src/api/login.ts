import type { UserInfo } from '@/model/user';

import { request } from '@/utils/request';

interface Data {
  access_token: string;
  expires_in: number;
}
// 获取验证码
export function getCodeImg() {
  return request.get<{ img: string; uuid: string }>(
    {
      url: '/code',
    },
  );
}

export function login(username: string, password: string, code: string, uuid: string) {
  // 登录方法
  return request.post<ResponseData<Data>>({
    url: '/auth/login',
    data: {
      username,
      password,
      code,
      uuid,
    },
  });
}

// 获取用户详细信息
export function getInfo() {
  return request.get<UserInfo>({
    url: '/system/user/getInfo',
    headers: {
      withToken: true,
    },
  });
}
