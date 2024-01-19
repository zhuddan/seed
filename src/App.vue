<script lang="ts" setup>
import Layout from '@/layout/index.vue';

import { type ConfigProviderThemeVars, Locale } from 'vant';
import zhCN from 'vant/es/locale/lang/zh-CN';

Locale.use('zh-CN', zhCN);
const themeVars: ConfigProviderThemeVars = {
  // cellFontSize: `${25}px`,
};
</script>

<template>
  <van-config-provider
    :theme-vars="themeVars"
  >
    <Layout />
  </van-config-provider>
</template>
