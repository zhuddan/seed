import type { App } from 'vue';

type $GlobalProperties = {
  [P in `$${string}`]: any;
};

const globalProperties: $GlobalProperties = {
  $app_name: '哈哈哈',
};

export type AppGlobalProperties = typeof globalProperties;
/**
 * app 全局属性
 */
export const appGlobalProperties = {
  install(app: App) {
    /**
     * @see "../../types/vue.d.ts"
     */
    for (const key in globalProperties) {
      if (globalProperties.hasOwnProperty(key)) {
        const element = globalProperties[key as keyof AppGlobalProperties];
        app.config.globalProperties[key] = element;
      }
    }
    return app;
  },
};