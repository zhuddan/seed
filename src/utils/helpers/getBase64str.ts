/**
 * 获取base64
 * @param base64
 */
export function getBase64str(base64: string) {
  return base64.replace(/(\r\n)|(\n)|(\r)/g, '');
}