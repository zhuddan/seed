import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export function getArgv() {
  const argv = yargs(hideBin(process.argv))
    .option('env', {
      // alias: 'e',
      describe: '环境变量',
      type: 'string', // 参数类型为字符串
    })
    .option('project', {
      // alias: 'p',
      describe: '项目名称',
      type: 'array', // 参数类型为数字
      string: true,
    })
    .argv;
  return argv;
}
