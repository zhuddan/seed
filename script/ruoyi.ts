import fs from 'fs';
import path from 'path';

import ejs from 'ejs';

interface GenerateOptions {
  businessName: string;
  className: string;
  rootName: string;
}

function toUpperCamelCase(input: string): string {
  // 首先将字符串按照空格或下划线拆分为单词数组
  const words = input.split(/[\s_]+/);

  // 将每个单词的首字母转换为大写，其余字母保持不变
  const upperCamelWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

  // 将转换后的单词数组连接起来
  const upperCamelCaseString = upperCamelWords.join('');

  return upperCamelCaseString;
}

function camelToHyphen(str: string): string {
  // 使用正则表达式将大写字母和小写字母之间插入一个减号，并将字符串全部转换为小写
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const generateCode = (options: GenerateOptions) => {
  const { businessName, className, rootName } = options;
  const functionName = toUpperCamelCase(className);
  const modelName = `${toUpperCamelCase(className)}Model`;
  const fileName = `${camelToHyphen(className)}`;
  const ejsData = {
    businessName,
    className,
    modelName,
    fileName,
    functionName,
    rootName,
  };

  const apiTemplate = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'ruoyi-api.ejs')).toString(), {});
  const modelTemplate = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'ruoyi-model.ejs')).toString(), {});

  const apiCode = apiTemplate(ejsData);
  const modelCode = modelTemplate(ejsData);

  const srcPath = path.resolve(__dirname, '..', 'src/renderer/src');

  const targetDirApi = path.resolve(srcPath, 'api');
  const targetFileApi = path.resolve(targetDirApi, `${fileName}.ts`);

  fs.mkdirSync(targetDirApi, { recursive: true });
  fs.writeFileSync(targetFileApi, apiCode);

  const targetDirModel = path.resolve(srcPath, 'model');
  const targetFileModel = path.resolve(targetDirModel, `${fileName}.ts`);

  fs.mkdirSync(targetDirModel, { recursive: true });
  fs.writeFileSync(targetFileModel, modelCode);

  // const apiMain = path.resolve(apiPath, 'main.ts');
  // const data = fs.readFileSync(apiMain).toString();

  // const i = data.indexOf(`export * from './api/${fileName}';`);
  // if (i == -1) {
  //   const index1 = data.indexOf('// model');
  //   const result = insertString(data, `export * from './api/${fileName}';\n`, index1);
  //   const result2 = `${result}\nexport * from './model/${fileName}';\n`;
  //   fs.writeFileSync(apiMain, result2);
  // }
  // else {
  // }
};

// Example usage
generateCode({
  rootName: 'system',
  className: 'orderWeight',
  businessName: '生猪过磅',
});