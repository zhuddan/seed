/**
 * 随机四位数验证码
 */
export function generateRandomCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}