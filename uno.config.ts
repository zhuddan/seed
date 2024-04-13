import presetRemToPx from '@unocss/preset-rem-to-px';
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
export default defineConfig({
  theme: {
    colors: {
      primary: '#ff9800',
      secondary: '#f50057',
    },
  },
  shortcuts: [
    ['container', 'px-10'],
    ['btn', 'bg-primary h-32 border-0 border-rd-8 text-#fff cursor-pointer hover:opacity-60 disabled:opacity-50 disabled:cursor-default'],
    [
      'input',
      'h-32 px-10 box-border border-rd-4 border-width-1 border-color-red outline-none border-solid',
    ],
    {
    },
  ],
  presets: [
    presetRemToPx({
      baseFontSize: 4,
    }),
    presetUno({

    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose m-auto text-left'.split(' '),

});
