export function clearConsole() {
  // ANSI 转义码用于清空控制台
  process.stdout.write('\x1Bc');
}
