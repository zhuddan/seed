// vite.config.ts
import { URL, fileURLToPath } from "node:url";

// script/generatedIconType.ts
import fs from "fs";
import path from "path";
import chokidar from "file:///E:/project/zd/seed/node_modules/.pnpm/chokidar@3.5.3/node_modules/chokidar/index.js";
var __vite_injected_original_dirname = "E:\\project\\zd\\seed\\script";
function generatedIconType(isBuild) {
  if (isBuild)
    return;
  const iconsDir = path.resolve(__vite_injected_original_dirname, "../src/assets/icons");
  let iconTypes = [];
  function getIconTypeByPath(_path, rootName = "") {
    const array = fs.readdirSync(_path);
    for (let index = 0; index < array.length; index++) {
      const svg = array[index];
      const childPath = path.resolve(_path, svg);
      const stats = fs.statSync(childPath);
      const _icon = [rootName, svg].filter((it) => it != "").join("-");
      const icon = _icon.endsWith(".svg") ? _icon.slice(0, _icon.length - 4) : _icon;
      if (stats.isDirectory())
        getIconTypeByPath(childPath, `${_icon}`);
      else
        iconTypes.push(`${icon}`);
    }
  }
  function write() {
    iconTypes = [];
    getIconTypeByPath(iconsDir);
    const str = `// Generated IconType...
// cspell:disable
declare type SvgIconType = ${iconTypes.map((e) => `'${e}'`).join(" | ")};`;
    fs.writeFileSync(path.resolve(__vite_injected_original_dirname, "../types", "icon-type.d.ts"), str);
  }
  const watcher = chokidar.watch(iconsDir);
  watcher.on("all", write);
  write();
}

// vite.config.ts
import vue from "file:///E:/project/zd/seed/node_modules/.pnpm/@vitejs+plugin-vue@5.0.1_vite@5.0.10_vue@3.4.3/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///E:/project/zd/seed/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.0.10_vue@3.4.3/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import AutoImport from "file:///E:/project/zd/seed/node_modules/.pnpm/unplugin-auto-import@0.17.3/node_modules/unplugin-auto-import/dist/vite.js";
import { defineConfig, loadEnv } from "file:///E:/project/zd/seed/node_modules/.pnpm/vite@5.0.10_@types+node@18.19.4_sass@1.69.6/node_modules/vite/dist/node/index.js";
import { createSvgIconsPlugin } from "file:///E:/project/zd/seed/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.0.10/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { configDefaults } from "file:///E:/project/zd/seed/node_modules/.pnpm/vitest@1.1.0_@types+node@18.19.4_jsdom@23.0.1_sass@1.69.6/node_modules/vitest/dist/config.js";
var __vite_injected_original_import_meta_url = "file:///E:/project/zd/seed/vite.config.ts";
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isBuild = command === "build";
  return {
    plugins: [
      vue(),
      vueJsx(),
      generatedIconType(isBuild),
      AutoImport({
        include: [
          /\.[tj]sx?$/,
          // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/
          // .vue
        ],
        imports: [
          "vue",
          "vue-router",
          {
            "@/store": [
              "useAppStore",
              "usePermissionStore",
              "useUserStore"
            ]
          }
        ],
        dts: "./types/auto-imports.d.ts",
        eslintrc: {
          enabled: false,
          // Default `false`
          filepath: "./.eslintrc-auto-import.json",
          // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true
          // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      }),
      // svg
      createSvgIconsPlugin({
        iconDirs: [fileURLToPath(new URL("./src/assets/icons", __vite_injected_original_import_meta_url))],
        svgoOptions: isBuild,
        // default
        symbolId: "icon-[dir]-[name]"
      })
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    server: {
      port: Number(env.VITE_APP_PORT),
      host: true
    },
    define: {
      __DEV__: `${command !== "build"}`,
      APP_TITLE: JSON.stringify(env.VITE_APP_TITLE),
      APP_API_URL: JSON.stringify(env.VITE_APP_API_URL),
      APP_STATIC_URL: JSON.stringify(env.VITE_APP_STATIC_URL)
    },
    /**
     * test
     */
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/*"],
      root: fileURLToPath(new URL("./", __vite_injected_original_import_meta_url))
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic2NyaXB0L2dlbmVyYXRlZEljb25UeXBlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxccHJvamVjdFxcXFx6ZFxcXFxzZWVkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXHpkXFxcXHNlZWRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3Byb2plY3QvemQvc2VlZC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IFVSTCwgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJztcblxuaW1wb3J0IHsgZ2VuZXJhdGVkSWNvblR5cGUgfSBmcm9tICcuL3NjcmlwdC9nZW5lcmF0ZWRJY29uVHlwZSc7XG5cbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCc7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnO1xuaW1wb3J0IHsgY29uZmlnRGVmYXVsdHMgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpO1xuICBjb25zdCBpc0J1aWxkID0gY29tbWFuZCA9PT0gJ2J1aWxkJztcbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoKSxcbiAgICAgIHZ1ZUpzeCgpLFxuICAgICAgZ2VuZXJhdGVkSWNvblR5cGUoaXNCdWlsZCksXG4gICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIC9cXC5bdGpdc3g/JC8sIC8vIC50cywgLnRzeCwgLmpzLCAuanN4XG4gICAgICAgICAgL1xcLnZ1ZSQvLFxuICAgICAgICAgIC9cXC52dWVcXD92dWUvLCAvLyAudnVlXG4gICAgICAgIF0sXG4gICAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgICAndnVlJyxcbiAgICAgICAgICAndnVlLXJvdXRlcicsXG4gICAgICAgICAge1xuICAgICAgICAgICAgJ0Avc3RvcmUnOiBbXG4gICAgICAgICAgICAgICd1c2VBcHBTdG9yZScsXG4gICAgICAgICAgICAgICd1c2VQZXJtaXNzaW9uU3RvcmUnLFxuICAgICAgICAgICAgICAndXNlVXNlclN0b3JlJyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgZHRzOiAnLi90eXBlcy9hdXRvLWltcG9ydHMuZC50cycsXG4gICAgICAgIGVzbGludHJjOiB7XG4gICAgICAgICAgZW5hYmxlZDogZmFsc2UsIC8vIERlZmF1bHQgYGZhbHNlYFxuICAgICAgICAgIGZpbGVwYXRoOiAnLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbicsIC8vIERlZmF1bHQgYC4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb25gXG4gICAgICAgICAgZ2xvYmFsc1Byb3BWYWx1ZTogdHJ1ZSwgLy8gRGVmYXVsdCBgdHJ1ZWAsICh0cnVlIHwgZmFsc2UgfCAncmVhZG9ubHknIHwgJ3JlYWRhYmxlJyB8ICd3cml0YWJsZScgfCAnd3JpdGVhYmxlJylcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgLy8gc3ZnXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAgIGljb25EaXJzOiBbZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9hc3NldHMvaWNvbnMnLCBpbXBvcnQubWV0YS51cmwpKV0sXG4gICAgICAgIHN2Z29PcHRpb25zOiBpc0J1aWxkLFxuICAgICAgICAvLyBkZWZhdWx0XG4gICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuICAgICAgfSksXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IE51bWJlcihlbnYuVklURV9BUFBfUE9SVCksXG4gICAgICBob3N0OiB0cnVlLFxuICAgIH0sXG4gICAgZGVmaW5lOiB7XG4gICAgICBfX0RFVl9fOiBgJHtjb21tYW5kICE9PSAnYnVpbGQnfWAsXG4gICAgICBBUFBfVElUTEU6IEpTT04uc3RyaW5naWZ5KGVudi5WSVRFX0FQUF9USVRMRSksXG4gICAgICBBUFBfQVBJX1VSTDogSlNPTi5zdHJpbmdpZnkoZW52LlZJVEVfQVBQX0FQSV9VUkwpLFxuICAgICAgQVBQX1NUQVRJQ19VUkw6IEpTT04uc3RyaW5naWZ5KGVudi5WSVRFX0FQUF9TVEFUSUNfVVJMKSxcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIHRlc3RcbiAgICAgKi9cbiAgICB0ZXN0OiB7XG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgICAgIGV4Y2x1ZGU6IFsuLi5jb25maWdEZWZhdWx0cy5leGNsdWRlLCAnZTJlLyonXSxcbiAgICAgIHJvb3Q6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi8nLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICB9LFxuICB9O1xufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXHByb2plY3RcXFxcemRcXFxcc2VlZFxcXFxzY3JpcHRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHByb2plY3RcXFxcemRcXFxcc2VlZFxcXFxzY3JpcHRcXFxcZ2VuZXJhdGVkSWNvblR5cGUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3Byb2plY3QvemQvc2VlZC9zY3JpcHQvZ2VuZXJhdGVkSWNvblR5cGUudHNcIjtpbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbmltcG9ydCBjaG9raWRhciBmcm9tICdjaG9raWRhcic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVkSWNvblR5cGUoaXNCdWlsZDogYm9vbGVhbikge1xyXG4gIGlmIChpc0J1aWxkKSByZXR1cm47XHJcbiAgY29uc3QgaWNvbnNEaXIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vc3JjL2Fzc2V0cy9pY29ucycpO1xyXG4gIGxldCBpY29uVHlwZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gIGZ1bmN0aW9uIGdldEljb25UeXBlQnlQYXRoKF9wYXRoOiBzdHJpbmcsIHJvb3ROYW1lID0gJycpIHtcclxuICAgIGNvbnN0IGFycmF5ID0gZnMucmVhZGRpclN5bmMoX3BhdGgpO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBjb25zdCBzdmcgPSBhcnJheVtpbmRleF07XHJcbiAgICAgIGNvbnN0IGNoaWxkUGF0aCA9IHBhdGgucmVzb2x2ZShfcGF0aCwgc3ZnKTtcclxuICAgICAgY29uc3Qgc3RhdHMgPSBmcy5zdGF0U3luYyhjaGlsZFBhdGgpO1xyXG4gICAgICBjb25zdCBfaWNvbiA9IFtyb290TmFtZSwgc3ZnXS5maWx0ZXIoaXQgPT4gaXQgIT0gJycpLmpvaW4oJy0nKTtcclxuICAgICAgY29uc3QgaWNvbiA9IF9pY29uLmVuZHNXaXRoKCcuc3ZnJykgPyBfaWNvbi5zbGljZSgwLCBfaWNvbi5sZW5ndGggLSA0KSA6IF9pY29uO1xyXG4gICAgICBpZiAoc3RhdHMuaXNEaXJlY3RvcnkoKSlcclxuICAgICAgICBnZXRJY29uVHlwZUJ5UGF0aChjaGlsZFBhdGgsIGAke19pY29ufWApO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgaWNvblR5cGVzLnB1c2goYCR7aWNvbn1gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHdyaXRlKCkge1xyXG4gICAgaWNvblR5cGVzID0gW107XHJcbiAgICBnZXRJY29uVHlwZUJ5UGF0aChpY29uc0Rpcik7XHJcbiAgICBjb25zdCBzdHIgPSBgLy8gR2VuZXJhdGVkIEljb25UeXBlLi4uXHJcbi8vIGNzcGVsbDpkaXNhYmxlXHJcbmRlY2xhcmUgdHlwZSBTdmdJY29uVHlwZSA9ICR7aWNvblR5cGVzLm1hcChlID0+IGAnJHtlfSdgKS5qb2luKCcgfCAnKX07YDtcclxuICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL3R5cGVzJywgJ2ljb24tdHlwZS5kLnRzJyksIHN0cik7XHJcbiAgfVxyXG5cclxuICBjb25zdCB3YXRjaGVyID0gY2hva2lkYXIud2F0Y2goaWNvbnNEaXIpO1xyXG4gIHdhdGNoZXIub24oJ2FsbCcsIHdyaXRlKTtcclxuICB3cml0ZSgpO1xyXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFnUCxTQUFTLEtBQUsscUJBQXFCOzs7QUNBQSxPQUFPLFFBQVE7QUFDbFMsT0FBTyxVQUFVO0FBRWpCLE9BQU8sY0FBYztBQUhyQixJQUFNLG1DQUFtQztBQUtsQyxTQUFTLGtCQUFrQixTQUFrQjtBQUNsRCxNQUFJO0FBQVM7QUFDYixRQUFNLFdBQVcsS0FBSyxRQUFRLGtDQUFXLHFCQUFxQjtBQUM5RCxNQUFJLFlBQXNCLENBQUM7QUFFM0IsV0FBUyxrQkFBa0IsT0FBZSxXQUFXLElBQUk7QUFDdkQsVUFBTSxRQUFRLEdBQUcsWUFBWSxLQUFLO0FBQ2xDLGFBQVMsUUFBUSxHQUFHLFFBQVEsTUFBTSxRQUFRLFNBQVM7QUFDakQsWUFBTSxNQUFNLE1BQU0sS0FBSztBQUN2QixZQUFNLFlBQVksS0FBSyxRQUFRLE9BQU8sR0FBRztBQUN6QyxZQUFNLFFBQVEsR0FBRyxTQUFTLFNBQVM7QUFDbkMsWUFBTSxRQUFRLENBQUMsVUFBVSxHQUFHLEVBQUUsT0FBTyxRQUFNLE1BQU0sRUFBRSxFQUFFLEtBQUssR0FBRztBQUM3RCxZQUFNLE9BQU8sTUFBTSxTQUFTLE1BQU0sSUFBSSxNQUFNLE1BQU0sR0FBRyxNQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3pFLFVBQUksTUFBTSxZQUFZO0FBQ3BCLDBCQUFrQixXQUFXLEdBQUcsS0FBSyxFQUFFO0FBQUE7QUFFdkMsa0JBQVUsS0FBSyxHQUFHLElBQUksRUFBRTtBQUFBLElBQzVCO0FBQUEsRUFDRjtBQUVBLFdBQVMsUUFBUTtBQUNmLGdCQUFZLENBQUM7QUFDYixzQkFBa0IsUUFBUTtBQUMxQixVQUFNLE1BQU07QUFBQTtBQUFBLDZCQUVhLFVBQVUsSUFBSSxPQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxLQUFLLENBQUM7QUFDakUsT0FBRyxjQUFjLEtBQUssUUFBUSxrQ0FBVyxZQUFZLGdCQUFnQixHQUFHLEdBQUc7QUFBQSxFQUM3RTtBQUVBLFFBQU0sVUFBVSxTQUFTLE1BQU0sUUFBUTtBQUN2QyxVQUFRLEdBQUcsT0FBTyxLQUFLO0FBQ3ZCLFFBQU07QUFDUjs7O0FEakNBLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxjQUFjLGVBQWU7QUFDdEMsU0FBUyw0QkFBNEI7QUFDckMsU0FBUyxzQkFBc0I7QUFUb0gsSUFBTSwyQ0FBMkM7QUFXcE0sSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUNqRCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFDM0MsUUFBTSxVQUFVLFlBQVk7QUFDNUIsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1Asa0JBQWtCLE9BQU87QUFBQSxNQUN6QixXQUFXO0FBQUEsUUFDVCxTQUFTO0FBQUEsVUFDUDtBQUFBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQTtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFNBQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxZQUNFLFdBQVc7QUFBQSxjQUNUO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLEtBQUs7QUFBQSxRQUNMLFVBQVU7QUFBQSxVQUNSLFNBQVM7QUFBQTtBQUFBLFVBQ1QsVUFBVTtBQUFBO0FBQUEsVUFDVixrQkFBa0I7QUFBQTtBQUFBLFFBQ3BCO0FBQUEsTUFDRixDQUFDO0FBQUE7QUFBQSxNQUVELHFCQUFxQjtBQUFBLFFBQ25CLFVBQVUsQ0FBQyxjQUFjLElBQUksSUFBSSxzQkFBc0Isd0NBQWUsQ0FBQyxDQUFDO0FBQUEsUUFDeEUsYUFBYTtBQUFBO0FBQUEsUUFFYixVQUFVO0FBQUEsTUFDWixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxNQUN0RDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU0sT0FBTyxJQUFJLGFBQWE7QUFBQSxNQUM5QixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sU0FBUyxHQUFHLFlBQVksT0FBTztBQUFBLE1BQy9CLFdBQVcsS0FBSyxVQUFVLElBQUksY0FBYztBQUFBLE1BQzVDLGFBQWEsS0FBSyxVQUFVLElBQUksZ0JBQWdCO0FBQUEsTUFDaEQsZ0JBQWdCLEtBQUssVUFBVSxJQUFJLG1CQUFtQjtBQUFBLElBQ3hEO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFJQSxNQUFNO0FBQUEsTUFDSixhQUFhO0FBQUEsTUFDYixTQUFTLENBQUMsR0FBRyxlQUFlLFNBQVMsT0FBTztBQUFBLE1BQzVDLE1BQU0sY0FBYyxJQUFJLElBQUksTUFBTSx3Q0FBZSxDQUFDO0FBQUEsSUFDcEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
