import type { UserInfo } from '@/model/user';

// 获取验证码
export function getCodeImg() {
  return request.get<ResponseResult<{ img: string; uuid: string }>>(
    {
      url: '/captchaImage',
      withToken: false,
    },
  );
}

// 登录方法
export function login(username: string, password: string, code: string, uuid: string) {
  return request.post<ResponseResult<{ token: string }>>(
    {
      url: '/login',
      data: {
        username,
        password,
        code,
        uuid,
      },
      withToken: false,
    },
  );
}

// 获取用户详细信息
export function getInfo() {
  return request.get<ResponseResult<UserInfo>>({
    url: '/getInfo',
  });
}
