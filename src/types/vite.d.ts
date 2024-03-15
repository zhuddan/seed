/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_PORT: number;
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_STATIC_URL: string;
}

/**
 * 是否开发模式
 */
declare const __DEV__: boolean;
/**
 * 项目标题
 */
declare const APP_TITLE: string;
/**
 * api地址
 */
declare const APP_API_URL: string;
/**
 * 静态资源地址
 */
declare const APP_STATIC_URL: string;