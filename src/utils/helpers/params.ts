/**
 *  获取?后面的参数
 * @param url
 */
export function getParams(url?: string) {
  const _url = url || window.location.href;
  const [, search] = _url.split('?');
  if (search && search.length) {
    const paramsList = search.split('&');
    const params: Record<string, any> = {};
    paramsList.forEach((e) => {
      const [key, value] = e.split('=');
      if (value != undefined && value != '') params[key] = value;
    });
    return params;
  }
  return {};
}

/**
 * 封装带?参数的url
 * @param baseUrl url
 * @param params
 * @returns {string}
 */
export function setParams(baseUrl: string, params: Record<string, any>): string {
  if (!Object.keys(params).length) return baseUrl;
  let parameters = '';
  for (const key in params) parameters += `${key}=${encodeURIComponent(params[key])}&`;

  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}
