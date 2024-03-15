import { URL, fileURLToPath } from 'node:url';

import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite';
import VueDevTools from 'vite-plugin-vue-devtools';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // const isBuild = command === 'build';
  return {
    plugins: [
      vue(),
      vueJsx(),
      VueDevTools(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
          {
            '@vueuse/router': [
              'useRouteHash',
              'useRouteParams',
              'useRouteQuery',
            ],
          },
        ],
        dts: 'src/types/auto-imports.d.ts',
        dirs: [
          'src/hooks',
          'src/store',
          'src/utils',
        ],
        eslintrc: {
          enabled: false, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
      // svg
      Icons({
        compiler: 'vue3',
        scale: 1,
        /**
         * 如果下载了 @iconify/json 就不用了
         */
        // autoInstall: true,
        customCollections: {
          icon: FileSystemIconLoader('src/assets/icons/'),
        },
      }),
      Components({
        resolvers: [
          IconsResolver({
            customCollections: [
              'icon',
            ],
          }),
        ],
        dirs: ['src/components'],
        dts: 'src/types/components.d.ts',
      }),
      dynamicImportVars({
        include: ['~icons/*'],
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
      exclude: [...configDefaults.exclude],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  };
});
