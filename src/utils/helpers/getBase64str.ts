/**
 * 获取base64
 * 微信小程序会自动添加 \r\n 等奇怪的字符串 需要过滤
 * @param base64
 */
export function getBase64str(base64: string) {
  return base64.replace(/(\r\n)|(\n)|(\r)/g, '');
}