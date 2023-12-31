import { URL, fileURLToPath } from 'node:url';

import { generatedIconType } from './script/generatedIconType';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig, loadEnv } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { configDefaults } from 'vitest/config';
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isBuild = command === 'build';
  return {
    plugins: [
      vue(),
      vueJsx(),
      generatedIconType(isBuild),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        imports: [
          'vue',
          'vue-router',
          {
            '@/store': [
              'useAppStore',
              'usePermissionStore',
              'useUserStore',
            ],
          },
        ],
        dts: './types/auto-imports.d.ts',
        eslintrc: {
          enabled: false, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
      // svg
      createSvgIconsPlugin({
        iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
        svgoOptions: isBuild,
        // default
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: Number(env.VITE_APP_PORT),
      host: true,
    },
    define: {
      __DEV__: `${command !== 'build'}`,
      APP_TITLE: JSON.stringify(env.VITE_APP_TITLE),
      APP_API_URL: JSON.stringify(env.VITE_APP_API_URL),
      APP_STATIC_URL: JSON.stringify(env.VITE_APP_STATIC_URL),
    },
    /**
     * test
     */
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      // browser: {
      //   enabled: true,
      //   name: 'chrome', // browser name is required
      // },
    },
  };
});
