<script setup lang="ts">
import { getUser } from '@/api/user';

const {
  errorMessage,
  error,
  pullRefreshLoading,
  data,
  getData,
} = useDataDetail(getUser);
</script>

<template>
  <div>
    <van-pull-refresh
      v-model="pullRefreshLoading"
      success-text="刷新成功"
      @refresh="getData"
    >
      <div
        :style="{
          'min-height': 'calc(var(--app-content-height) - 20px',
        }"
      >
        <van-empty v-if="error && !pullRefreshLoading" image="error" :description="errorMessage"></van-empty>
        <pre>
          <code>{{ data }}</code>
        </pre>
      </div>
    </van-pull-refresh>
  </div>
</template>

<style lang="scss">
</style>