import type { App } from 'vue';

/**
 *  限制所有 vue 实例属性
 */
type GlobalProperties = {
  [P in `$${string}`]: any;
} & {
  [P in `__${Uppercase<string>}`]: any;
} & {
  [P in `${Uppercase<string>}`]: any;
};

const globalProperties: GlobalProperties = {
  __DEV__,
  APP_TITLE,
  APP_API_URL,
  APP_STATIC_URL,
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