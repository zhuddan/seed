import type { App } from 'vue';

// import * as colorConfig from '../const';
// import { addPrefixUrl } from '@/utils/helpers';

/**
 * app 全局属性 包括样式颜色 (COLOR) 请求地址 静态资源地址等
 *
 */
export const globalProperties = {

  install(app: App) {
    // for (const key in colorConfig) {
    //   if (Object.prototype.hasOwnProperty.call(colorConfig, key)) {
    //     app.config.globalProperties[key] = (colorConfig as AnyObject)[key] as string;
    //   }
    // }

    // app.config.globalProperties.API_URL = API_URL;
    // app.config.globalProperties.STATIC_URL = STATIC_URL;
    // app.config.globalProperties.FILE_URL = FILE_URL;
    // // app.config.globalProperties.WAP_URL = WAP_URL;
    // /**
    //  * @description 上传文件成功后返回的链接添加前缀
    //  */
    // app.config.globalProperties.$addPrefixUrl = addPrefixUrl;
    // app.config.globalProperties.$formatPrice = formatPrice;

    return app;
  },
};