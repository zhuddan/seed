export function numberToChinese(num: number): string {
  const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const unit = ['', '十', '百', '千'];

  if (num < 0) {
    return `负${numberToChinese(-num)}`;
  }
  else if (num < 10) {
    return chineseNumbers[num];
  }
  else {
    let result = '';
    let unitIndex = 0;
    let hasZero = false; // 标记是否需要添加零

    while (num > 0) {
      const remainder = num % 10;
      if (remainder > 0) {
        if (hasZero) {
          result = chineseNumbers[0] + result; // 添加零
          hasZero = false;
        }
        result = chineseNumbers[remainder] + unit[unitIndex] + result;
      }
      else {
        hasZero = true;
      }
      num = Math.floor(num / 10);
      unitIndex++;
    }

    // 去掉末尾的零
    while (result.endsWith('零')) {
      result = result.slice(0, -1);
    }

    // 处理以 "一十" 开头的情况
    if (result.startsWith('一十')) {
      result = result.substring(1);
    }

    return result;
  }
}
