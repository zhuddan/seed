export function getErrorMessageByCode(code?: string): string {
  switch (code) {
    case 'ERR_BAD_OPTION_VALUE':
      return '选项设置了错误的值';
    case 'ERR_BAD_OPTION':
      return '无效的或不支持的选项';
    case 'ECONNABORTED':
      return '网络连接被中断，通常因为请求超时';
    case 'ETIMEDOUT':
      return '操作超时';
    case 'ERR_NETWORK':
      return '网络错误';
    case 'ERR_FR_TOO_MANY_REDIRECTS':
      return '请求被重定向了太多次，可能导致无限循环';
    case 'ERR_DEPRECATED':
      return '使用了已被废弃的函数或方法';
    case 'ERR_BAD_RESPONSE':
      return '从服务器接收到无效或错误的响应';
    case 'ERR_BAD_REQUEST':
      return '发送的请求格式错误或无效';
    case 'ERR_CANCELED':
      return '请求已经被取消';
    case 'ERR_NOT_SUPPORT':
      return '使用的某个功能或方法不被支持';
    case 'ERR_INVALID_URL':
      return '提供的URL无效';
    default:
      return '未知错误';
  }
}

export function getErrorMessageByStatus(status: number) {
  switch (status) {
    case 400:
      return '错误请求，服务器无法理解请求的格式';
    case 401:
      return '未授权，请求要求用户的身份认证';
    case 403:
      return '禁止访问';
    case 404:
      return '服务器无法根据客户端的请求找到资源';
    case 405:
      return '网络请求错误,请求方法未允许!';
    case 408:
      return '网络请求超时!';
    case 500:
      return '服务器内部错误，无法完成请求';
    case 502:
      return '网关错误';
    case 503:
      return '服务器目前无法使用（由于超载或停机维护）';
    case 504:
      return '网络超时!';
    case 505:
      return 'http版本不支持该请求!';
    default:
      return '未知错误';
  }
}