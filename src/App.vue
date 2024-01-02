<script lang="ts" setup>
import Layout from '@/layout/index.vue';

import { Locale } from 'vant';
import zhCN from 'vant/es/locale/lang/zh-CN';

Locale.use('zh-CN', zhCN);
</script>

<template>
  <van-config-provider
    :theme-vars="{

    }"
  >
    <Layout />
  </van-config-provider>
</template>
