import type { App } from 'vue';

// import { bg, text } from '@/utils/helpers/logger';

// // import { appConfig } from './projectConfig';

// function getCurrentVersion() {
//   const now = new Date();
//   const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 获取月份并确保两位数
//   const date = now.getDate().toString().padStart(2, '0'); // 获取日期并确保两位数
//   const hours = now.getHours().toString().padStart(2, '0'); // 获取小时并确保两位数
//   const minutes = now.getMinutes().toString().padStart(2, '0'); // 获取分钟并确保两位数
//   const currentTime = `${month}${date}.${hours}${minutes}`;
//   return currentTime;
// }

/**
 * 项目信息
 */
export const appEnvLog = {
  install(app: App) {
    // const appCnName = appConfig.name;

    return app;
  },

};