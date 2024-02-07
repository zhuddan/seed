import type { App } from 'vue';

/**
 * app 全局属性
 *
 */
export const globalProperties = {

  install(app: App) {
    /**
     * @see "../../types/vue.d.ts"
     */
    app.config.globalProperties.$app_name = 'seed';
    return app;
  },
};